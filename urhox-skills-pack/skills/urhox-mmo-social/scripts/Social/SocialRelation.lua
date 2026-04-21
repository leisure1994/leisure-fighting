-- SocialRelation.lua
-- ============================================================================
-- 社交关系系统 (Social Relation System)
-- ============================================================================
-- 功能：
--   1. 黑名单 / 仇人 / 关注 / 粉丝
--   2. 师徒系统（拜师、收徒、出师、传承）
--   3. 亲密关系（挚友、情侣、结拜）
--   4. 仇人追踪（击杀记录、复仇标记）
--   5. 玩家推荐（按等级、在线、亲密度推荐）
--   6. 称号 / 社交标签
-- ============================================================================

local SocialRelation = {
    relations = {},        -- [playerId] = { [targetId] = { type = "enemy", ... } }
    masterApprentice = {}, -- [playerId] = { master = nil, apprentices = {} }
    intimacyRelations = {},-- ["a|b"] = { type = "sworn", level = 1, ... }
    killRecords = {},      -- [playerId] = { { victimId = x, time = t }, ... }
    playerTags = {},       -- [playerId] = { "江湖新秀", ... }
    playerTitle = {},      -- [playerId] = currentDisplayTitle
    dbFileName = "SocialRelationDB",
    ctx = nil
}

local RELATION_TYPES = {
    enemy   = { label = "仇人",   maxCount = 50, mutual = false },
    follow  = { label = "关注",   maxCount = 100, mutual = false },
    fan     = { label = "粉丝",   maxCount = 0,  mutual = false }, -- 被动关系，无上限
    sworn   = { label = "结拜",   maxCount = 10, mutual = true },
    couple  = { label = "情侣",   maxCount = 1,  mutual = true },
    mentor  = { label = "师徒",   maxCount = 0,  mutual = true }, -- 由师徒表单独管理
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function SocialRelation:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("SocialAddRelation")
        net:RegisterRemoteEvent("SocialRemoveRelation")
        net:RegisterRemoteEvent("SocialRequestMentor")
        net:RegisterRemoteEvent("SocialAcceptMentor")
        net:RegisterRemoteEvent("SocialLeaveMentor")
        net:RegisterRemoteEvent("SocialSetIntimacy")
        net:RegisterRemoteEvent("SocialBreakIntimacy")
        net:RegisterRemoteEvent("SocialRecommend")
        net:RegisterRemoteEvent("SocialSetTitle")
        net:RegisterRemoteEvent("SocialReportKill")

        SubscribeToEvent("SocialAddRelation", function(et, ed) self:HandleAddRelation(ed) end)
        SubscribeToEvent("SocialRemoveRelation", function(et, ed) self:HandleRemoveRelation(ed) end)
        SubscribeToEvent("SocialRequestMentor", function(et, ed) self:HandleRequestMentor(ed) end)
        SubscribeToEvent("SocialAcceptMentor", function(et, ed) self:HandleAcceptMentor(ed) end)
        SubscribeToEvent("SocialLeaveMentor", function(et, ed) self:HandleLeaveMentor(ed) end)
        SubscribeToEvent("SocialSetIntimacy", function(et, ed) self:HandleSetIntimacy(ed) end)
        SubscribeToEvent("SocialBreakIntimacy", function(et, ed) self:HandleBreakIntimacy(ed) end)
        SubscribeToEvent("SocialRecommend", function(et, ed) self:HandleRecommend(ed) end)
        SubscribeToEvent("SocialSetTitle", function(et, ed) self:HandleSetTitle(ed) end)
        SubscribeToEvent("SocialReportKill", function(et, ed) self:HandleReportKill(ed) end)
    else
        SubscribeToEvent("SocialRelationSync", function(et, ed) self:HandleRelationSync(ed) end)
        SubscribeToEvent("SocialMentorSync", function(et, ed) self:HandleMentorSync(ed) end)
        SubscribeToEvent("SocialIntimacySync", function(et, ed) self:HandleIntimacySync(ed) end)
        SubscribeToEvent("SocialNotify", function(et, ed) self:HandleNotify(ed) end)
    end
end

function SocialRelation:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.relations = data.relations or {}
        self.masterApprentice = data.masterApprentice or {}
        self.intimacyRelations = data.intimacyRelations or {}
        self.killRecords = data.killRecords or {}
        self.playerTags = data.playerTags or {}
        self.playerTitle = data.playerTitle or {}
    end
end

function SocialRelation:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        relations = self.relations,
        masterApprentice = self.masterApprentice,
        intimacyRelations = self.intimacyRelations,
        killRecords = self.killRecords,
        playerTags = self.playerTags,
        playerTitle = self.playerTitle
    })
end

-- ----------------------------------------------------------------------------
-- 基础关系操作
-- ----------------------------------------------------------------------------

function SocialRelation:GetRelations(playerId)
    if not self.relations[playerId] then
        self.relations[playerId] = {}
    end
    return self.relations[playerId]
end

function SocialRelation:GetRelation(playerId, targetId)
    local pr = self:GetRelations(playerId)
    return pr[targetId]
end

function SocialRelation:SetRelation(playerId, targetId, relType, extra)
    local cfg = RELATION_TYPES[relType]
    if not cfg then return false, "无效的关系类型" end

    -- 上限检查
    if cfg.maxCount > 0 then
        local current = self:CountRelationsByType(playerId, relType)
        if current >= cfg.maxCount then
            return false, "该关系类型已达上限"
        end
    end

    local pr = self:GetRelations(playerId)
    pr[targetId] = {
        type = relType,
        time = GetTimestampSec(),
        extra = extra or {}
    }

    -- 双向关系处理
    if cfg.mutual and relType ~= "mentor" then
        local pairKey = self:MakePairKey(playerId, targetId)
        self.intimacyRelations[pairKey] = {
            type = relType,
            level = 1,
            exp = 0,
            createTime = GetTimestampSec(),
            milestone = {}
        }
    end

    return true
end

function SocialRelation:RemoveRelation(playerId, targetId)
    local pr = self:GetRelations(playerId)
    if not pr[targetId] then return false end
    local relType = pr[targetId].type
    pr[targetId] = nil

    local cfg = RELATION_TYPES[relType]
    if cfg and cfg.mutual and relType ~= "mentor" then
        local pairKey = self:MakePairKey(playerId, targetId)
        self.intimacyRelations[pairKey] = nil
        -- 同时移除对方的关系标记
        local tr = self.relations[targetId]
        if tr and tr[playerId] and tr[playerId].type == relType then
            tr[playerId] = nil
        end
    end
    return true
end

function SocialRelation:CountRelationsByType(playerId, relType)
    local pr = self:GetRelations(playerId)
    local count = 0
    for _, r in pairs(pr) do
        if r.type == relType then count = count + 1 end
    end
    return count
end

function SocialRelation:GetRelationListByType(playerId, relType)
    local pr = self:GetRelations(playerId)
    local result = {}
    for tid, r in pairs(pr) do
        if r.type == relType then
            table.insert(result, { targetId = tid, data = r })
        end
    end
    return result
end

function SocialRelation:MakePairKey(a, b)
    if a < b then return a .. "|" .. b end
    return b .. "|" .. a
end

-- ----------------------------------------------------------------------------
-- 师徒系统
-- ----------------------------------------------------------------------------

function SocialRelation:GetMentorData(playerId)
    if not self.masterApprentice[playerId] then
        self.masterApprentice[playerId] = { master = nil, apprentices = {}, graduationCount = 0 }
    end
    return self.masterApprentice[playerId]
end

function SocialRelation:HasMaster(playerId)
    local md = self:GetMentorData(playerId)
    return md.master ~= nil
end

function SocialRelation:GetMaster(playerId)
    local md = self:GetMentorData(playerId)
    return md.master
end

function SocialRelation:GetApprentices(playerId)
    local md = self:GetMentorData(playerId)
    return md.apprentices
end

function SocialRelation:CanTakeApprentice(masterId)
    local md = self:GetMentorData(masterId)
    return #md.apprentices < self.ctx.config.maxMasterApprentices
end

function SocialRelation:RequestMentor(apprenticeId, masterId)
    if apprenticeId == masterId then return false, "不能拜自己为师" end
    if self:HasMaster(apprenticeId) then return false, "已有师父" end
    if not self:CanTakeApprentice(masterId) then return false, "对方徒弟已满" end
    -- 写入待处理请求（在 master 的 apprentices 中使用 pending 标记）
    local mmd = self:GetMentorData(masterId)
    for _, app in ipairs(mmd.apprentices) do
        if app.playerId == apprenticeId and app.status == "pending" then
            return false, "已发送拜师请求"
        end
    end
    table.insert(mmd.apprentices, { playerId = apprenticeId, status = "pending", joinTime = 0 })
    return true
end

function SocialRelation:AcceptMentor(masterId, apprenticeId)
    local mmd = self:GetMentorData(masterId)
    local found = false
    for _, app in ipairs(mmd.apprentices) do
        if app.playerId == apprenticeId and app.status == "pending" then
            app.status = "active"
            app.joinTime = GetTimestampSec()
            found = true
            break
        end
    end
    if not found then return false, "没有待处理的拜师请求" end

    local amd = self:GetMentorData(apprenticeId)
    amd.master = { playerId = masterId, joinTime = GetTimestampSec() }

    -- 写入关系表
    self:SetRelation(masterId, apprenticeId, "mentor", {})
    self:SetRelation(apprenticeId, masterId, "mentor", {})

    return true
end

function SocialRelation:LeaveMentor(apprenticeId)
    local amd = self:GetMentorData(apprenticeId)
    if not amd.master then return false, "没有师父" end
    local masterId = amd.master.playerId
    amd.master = nil

    local mmd = self:GetMentorData(masterId)
    for i = #mmd.apprentices, 1, -1 do
        if mmd.apprentices[i].playerId == apprenticeId then
            table.remove(mmd.apprentices, i)
            break
        end
    end

    self:RemoveRelation(masterId, apprenticeId)
    self:RemoveRelation(apprenticeId, masterId)
    return true
end

function SocialRelation:GraduateApprentice(masterId, apprenticeId)
    local mmd = self:GetMentorData(masterId)
    for i = #mmd.apprentices, 1, -1 do
        local app = mmd.apprentices[i]
        if app.playerId == apprenticeId and app.status == "active" then
            table.remove(mmd.apprentices, i)
            mmd.graduationCount = (mmd.graduationCount or 0) + 1
            break
        end
    end
    local amd = self:GetMentorData(apprenticeId)
    if amd.master and amd.master.playerId == masterId then
        amd.master = nil
        amd.graduationCount = (amd.graduationCount or 0) + 1
    end
    self:RemoveRelation(masterId, apprenticeId)
    self:RemoveRelation(apprenticeId, masterId)
    return true
end

-- ----------------------------------------------------------------------------
-- 亲密关系
-- ----------------------------------------------------------------------------

function SocialRelation:GetIntimacyRelation(a, b)
    local key = self:MakePairKey(a, b)
    return self.intimacyRelations[key]
end

function SocialRelation:SetIntimacyType(a, b, relType)
    if relType ~= "sworn" and relType ~= "couple" then
        return false, "不支持的亲密关系类型"
    end
    if self:GetIntimacyRelation(a, b) then
        return false, "已存在亲密关系"
    end
    local key = self:MakePairKey(a, b)
    self.intimacyRelations[key] = {
        type = relType,
        level = 1,
        exp = 0,
        createTime = GetTimestampSec(),
        milestone = {}
    }
    self:SetRelation(a, b, relType, {})
    self:SetRelation(b, a, relType, {})
    return true
end

function SocialRelation:BreakIntimacy(a, b)
    local key = self:MakePairKey(a, b)
    if not self.intimacyRelations[key] then return false, "不存在亲密关系" end
    self.intimacyRelations[key] = nil
    self:RemoveRelation(a, b)
    self:RemoveRelation(b, a)
    return true
end

function SocialRelation:AddIntimacyExp(a, b, delta)
    local key = self:MakePairKey(a, b)
    local rel = self.intimacyRelations[key]
    if not rel then return false end
    rel.exp = (rel.exp or 0) + delta
    -- 简单的升级规则：每 1000 点升一级
    local newLevel = math.floor(rel.exp / 1000) + 1
    if newLevel > rel.level then
        rel.level = newLevel
        -- 记录里程碑
        table.insert(rel.milestone, { level = newLevel, time = GetTimestampSec() })
        return true, "levelup"
    end
    return true, "exp_added"
end

-- ----------------------------------------------------------------------------
-- 仇人 / 击杀记录
-- ----------------------------------------------------------------------------

function SocialRelation:RecordKill(killerId, victimId)
    if not self.killRecords[killerId] then
        self.killRecords[killerId] = {}
    end
    table.insert(self.killRecords[killerId], {
        victimId = victimId,
        time = GetTimestampSec()
    })
    -- 自动添加仇人关系
    self:SetRelation(victimId, killerId, "enemy", { killTime = GetTimestampSec() })
    -- 保留最近100条
    if #self.killRecords[killerId] > 100 then
        table.remove(self.killRecords[killerId], 1)
    end
end

function Chat:SendSystemMessage(text, targetId)
    local vm = VariantMap()
    vm["Channel"] = "system"
    vm["SenderId"] = "SYSTEM"
    vm["SenderName"] = "系统"
    vm["Text"] = text
    vm["Time"] = GetTimestampSec()
    vm["Type"] = "system"
    if targetId then
        self.ctx:SendToPlayer(targetId, "ChatChannelMessage", vm)
    else
        self.ctx:BroadcastRemoteEvent("ChatChannelMessage", vm)
    end
end

function SocialRelation:GetKillRecords(killerId)
    return self.killRecords[killerId] or {}
end

function SocialRelation:GetRecentKillCount(killerId, victimId, withinSec)
    local records = self.killRecords[killerId] or {}
    local now = GetTimestampSec()
    local count = 0
    for _, r in ipairs(records) do
        if r.victimId == victimId and (now - r.time) <= withinSec then
            count = count + 1
        end
    end
    return count
end

-- ----------------------------------------------------------------------------
-- 称号 / 标签
-- ----------------------------------------------------------------------------

function SocialRelation:GetTags(playerId)
    if not self.playerTags[playerId] then
        self.playerTags[playerId] = {}
    end
    return self.playerTags[playerId]
end

function SocialRelation:AddTag(playerId, tag)
    local tags = self:GetTags(playerId)
    for _, t in ipairs(tags) do
        if t == tag then return false end
    end
    table.insert(tags, tag)
    return true
end

function SocialRelation:RemoveTag(playerId, tag)
    local tags = self:GetTags(playerId)
    for i = #tags, 1, -1 do
        if tags[i] == tag then
            table.remove(tags, i)
            return true
        end
    end
    return false
end

function SocialRelation:SetTitle(playerId, title)
    self.playerTitle[playerId] = title or ""
end

function SocialRelation:GetTitle(playerId)
    return self.playerTitle[playerId] or ""
end

-- ----------------------------------------------------------------------------
-- 推荐系统
-- ----------------------------------------------------------------------------

function SocialRelation:GetRecommendations(requesterId, count)
    count = count or 5
    local candidates = {}
    local reqLevel = 0
    local p = self.ctx.players[requesterId]
    if p then reqLevel = p.level or 0 end

    for pid, pdata in pairs(self.ctx.players) do
        if pid ~= requesterId and pdata.online then
            -- 排除已是好友的
            local friendMod = self.ctx:GetModule("Friend")
            local isFriend = false
            if friendMod then
                isFriend = friendMod:AreFriends(requesterId, pid)
            end
            -- 排除已有双向关系的
            local hasRelation = (self:GetRelation(requesterId, pid) ~= nil)
            if not isFriend and not hasRelation then
                local levelDiff = math.abs((pdata.level or 0) - reqLevel)
                table.insert(candidates, { playerId = pid, levelDiff = levelDiff, level = pdata.level or 0 })
            end
        end
    end

    table.sort(candidates, function(a, b)
        if a.levelDiff == b.levelDiff then
            return a.level > b.level
        end
        return a.levelDiff < b.levelDiff
    end)

    local result = {}
    for i = 1, math.min(count, #candidates) do
        local c = candidates[i]
        table.insert(result, {
            playerId = c.playerId,
            nickname = self.ctx:GetPlayerNickname(c.playerId),
            level = c.level,
            reason = "等级相近"
        })
    end
    return result
end

-- ----------------------------------------------------------------------------
-- 同步协议
-- ----------------------------------------------------------------------------

function SocialRelation:SyncAllToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    self:SyncRelationsToPlayer(playerId)
    self:SyncMentorToPlayer(playerId)
    self:SyncIntimacyToPlayer(playerId)
end

function SocialRelation:SyncRelationsToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    local pr = self:GetRelations(playerId)
    local list = {}
    for tid, r in pairs(pr) do
        table.insert(list, {
            targetId = tid,
            type = r.type,
            time = r.time,
            nickname = self.ctx:GetPlayerNickname(tid)
        })
    end
    local vm = VariantMap()
    vm["Payload"] = self:SerializeRelationList(list)
    self.ctx:SendToPlayer(playerId, "SocialRelationSync", vm)
end

function SocialRelation:SyncMentorToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    local md = self:GetMentorData(playerId)
    local vm = VariantMap()
    vm["MasterId"] = md.master and md.master.playerId or ""
    vm["GraduationCount"] = md.graduationCount or 0
    local appStr = ""
    for _, app in ipairs(md.apprentices) do
        local part = app.playerId .. ":" .. app.status .. ":" .. app.joinTime
        if #appStr > 0 then appStr = appStr .. ";" end
        appStr = appStr .. part
    end
    vm["Apprentices"] = appStr
    self.ctx:SendToPlayer(playerId, "SocialMentorSync", vm)
end

function SocialRelation:SyncIntimacyToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    local list = {}
    for key, rel in pairs(self.intimacyRelations) do
        if string.find(key, playerId .. "|") == 1 or string.find(key, "|" .. playerId) then
            local a, b = string.match(key, "^([^|]+)|([^|]+)$")
            local partnerId = (a == playerId) and b or a
            table.insert(list, {
                partnerId = partnerId,
                type = rel.type,
                level = rel.level,
                exp = rel.exp,
                createTime = rel.createTime
            })
        end
    end
    local vm = VariantMap()
    vm["Payload"] = self:SerializeIntimacyList(list)
    self.ctx:SendToPlayer(playerId, "SocialIntimacySync", vm)
end

function SocialRelation:SerializeRelationList(list)
    local parts = {}
    for _, r in ipairs(list) do
        local line = string.format("%s=%s=%d=%s", r.targetId, r.type, r.time, r.nickname)
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

function SocialRelation:SerializeIntimacyList(list)
    local parts = {}
    for _, r in ipairs(list) do
        local line = string.format("%s=%s=%d=%d=%d", r.partnerId, r.type, r.level, r.exp, r.createTime)
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function SocialRelation:HandleAddRelation(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local relType = eventData["RelType"]:GetString()
    if not playerId or not targetId or not relType then return end
    local ok, err = self:SetRelation(playerId, targetId, relType, {})
    if ok then
        self:SyncRelationsToPlayer(playerId)
        self.ctx:NotifyPlayer(playerId, "success", "关系设置成功。")
    else
        self.ctx:NotifyPlayer(playerId, "error", err or "操作失败。")
    end
end

function SocialRelation:HandleRemoveRelation(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end
    local ok = self:RemoveRelation(playerId, targetId)
    if ok then
        self:SyncRelationsToPlayer(playerId)
        self.ctx:NotifyPlayer(playerId, "info", "已解除关系。")
    end
end

function SocialRelation:HandleRequestMentor(eventData)
    local connection = eventData["Connection"]
    local apprenticeId = self.ctx:GetPlayerIdByConnection(connection)
    local masterId = eventData["MasterId"]:GetString()
    if not apprenticeId or not masterId then return end
    local ok, err = self:RequestMentor(apprenticeId, masterId)
    if ok then
        self.ctx:NotifyPlayer(apprenticeId, "info", "拜师请求已发送。")
        if self.ctx:IsOnline(masterId) then
            local vm = VariantMap()
            vm["Type"] = "mentor_request"
            vm["ApprenticeId"] = apprenticeId
            vm["ApprenticeName"] = self.ctx:GetPlayerNickname(apprenticeId)
            self.ctx:SendToPlayer(masterId, "SocialNotify", vm)
        end
    else
        self.ctx:NotifyPlayer(apprenticeId, "error", err or "请求失败。")
    end
end

function SocialRelation:HandleAcceptMentor(eventData)
    local connection = eventData["Connection"]
    local masterId = self.ctx:GetPlayerIdByConnection(connection)
    local apprenticeId = eventData["ApprenticeId"]:GetString()
    if not masterId or not apprenticeId then return end
    local ok, err = self:AcceptMentor(masterId, apprenticeId)
    if ok then
        self:SyncMentorToPlayer(masterId)
        if self.ctx:IsOnline(apprenticeId) then
            self:SyncMentorToPlayer(apprenticeId)
            self.ctx:NotifyPlayer(apprenticeId, "success", "拜师成功！")
        end
        self.ctx:NotifyPlayer(masterId, "success", "已收 " .. self.ctx:GetPlayerNickname(apprenticeId) .. " 为徒。")
    else
        self.ctx:NotifyPlayer(masterId, "error", err or "操作失败。")
    end
end

function SocialRelation:HandleLeaveMentor(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local ok, err = self:LeaveMentor(playerId)
    if ok then
        self:SyncMentorToPlayer(playerId)
        self.ctx:NotifyPlayer(playerId, "info", "已出师/叛师。")
    else
        self.ctx:NotifyPlayer(playerId, "error", err or "操作失败。")
    end
end

function SocialRelation:HandleSetIntimacy(eventData)
    local connection = eventData["Connection"]
    local a = self.ctx:GetPlayerIdByConnection(connection)
    local b = eventData["TargetId"]:GetString()
    local relType = eventData["RelType"]:GetString()
    if not a or not b or not relType then return end
    local ok, err = self:SetIntimacyType(a, b, relType)
    if ok then
        self:SetRelation(a, b, relType, {})
        self:SetRelation(b, a, relType, {})
        self:SyncIntimacyToPlayer(a)
        if self.ctx:IsOnline(b) then self:SyncIntimacyToPlayer(b) end
        self.ctx:NotifyPlayer(a, "success", "亲密关系建立成功。")
    else
        self.ctx:NotifyPlayer(a, "error", err or "操作失败。")
    end
end

function SocialRelation:HandleBreakIntimacy(eventData)
    local connection = eventData["Connection"]
    local a = self.ctx:GetPlayerIdByConnection(connection)
    local b = eventData["TargetId"]:GetString()
    if not a or not b then return end
    local ok, err = self:BreakIntimacy(a, b)
    if ok then
        self:SyncIntimacyToPlayer(a)
        if self.ctx:IsOnline(b) then self:SyncIntimacyToPlayer(b) end
        self.ctx:NotifyPlayer(a, "info", "已解除亲密关系。")
    else
        self.ctx:NotifyPlayer(a, "error", err or "操作失败。")
    end
end

function SocialRelation:HandleRecommend(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local count = eventData["Count"] and eventData["Count"]:GetInt() or 5
    if not playerId then return end
    local list = self:GetRecommendations(playerId, count)
    local vm = VariantMap()
    vm["Payload"] = self:SerializeRecommendList(list)
    self.ctx:SendToPlayer(playerId, "SocialRecommendSync", vm)
end

function SocialRelation:SerializeRecommendList(list)
    local parts = {}
    for _, r in ipairs(list) do
        local line = string.format("%s=%s=%d=%s", r.playerId, r.nickname, r.level, r.reason)
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

function SocialRelation:HandleSetTitle(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local title = eventData["Title"]:GetString()
    if not playerId then return end
    self:SetTitle(playerId, title)
    self.ctx:NotifyPlayer(playerId, "success", "称号已更新。")
end

function SocialRelation:HandleReportKill(eventData)
    local killerId = eventData["KillerId"]:GetString()
    local victimId = eventData["VictimId"]:GetString()
    if not killerId or not victimId then return end
    self:RecordKill(killerId, victimId)
end

-- ----------------------------------------------------------------------------
-- 客户端事件处理
-- ----------------------------------------------------------------------------

function SocialRelation:HandleRelationSync(eventData)
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or ""
    print("[SocialRelation] Relations synced. payload=" .. #payload)
end

function SocialRelation:HandleMentorSync(eventData)
    local masterId = eventData["MasterId"]:GetString()
    print("[SocialRelation] Mentor synced. master=" .. masterId)
end

function SocialRelation:HandleIntimacySync(eventData)
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or ""
    print("[SocialRelation] Intimacy synced. payload=" .. #payload)
end

function SocialRelation:HandleNotify(eventData)
    local ntype = eventData["Type"]:GetString()
    print("[SocialRelation] Notify: type=" .. ntype)
end

-- ----------------------------------------------------------------------------
-- 上下线回调
-- ----------------------------------------------------------------------------

function SocialRelation:OnPlayerOnline(playerId)
    if not IsServer() then return end
    self:SyncAllToPlayer(playerId)
end

function SocialRelation:OnPlayerOffline(playerId)
    -- no-op
end

return SocialRelation
