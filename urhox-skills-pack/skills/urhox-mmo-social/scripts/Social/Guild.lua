-- Guild.lua
-- ============================================================================
-- 公会系统 (Guild System)
-- ============================================================================
-- 功能：
--   1. 创建 / 解散公会（消耗货币）
--   2. 入会申请 / 审批 / 邀请 / 退出 / 踢出
--   3. 职位升降（会长、副会长、精英、普通）
--   4. 公会公告、公会名自定义
--   5. 捐献、公会升级、公会资金
--   6. 公会日志与事件追踪
--   7. 公会聊天频道
-- ============================================================================

local Guild = {
    guilds = {},             -- [guildId] = guildData
    playerGuildMap = {},     -- [playerId] = guildId
    nameToGuildId = {},      -- [guildName] = guildId
    dbFileName = "GuildDB",
    ctx = nil
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function Guild:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("GuildCreate")
        net:RegisterRemoteEvent("GuildApply")
        net:RegisterRemoteEvent("GuildHandleApplication")
        net:RegisterRemoteEvent("GuildInvite")
        net:RegisterRemoteEvent("GuildInviteAccept")
        net:RegisterRemoteEvent("GuildLeave")
        net:RegisterRemoteEvent("GuildKick")
        net:RegisterRemoteEvent("GuildPromote")
        net:RegisterRemoteEvent("GuildDemote")
        net:RegisterRemoteEvent("GuildDonate")
        net:RegisterRemoteEvent("GuildUpgrade")
        net:RegisterRemoteEvent("GuildSetNotice")
        net:RegisterRemoteEvent("GuildSetRankName")
        net:RegisterRemoteEvent("GuildTransferLeader")
        net:RegisterRemoteEvent("GuildChat")
        net:RegisterRemoteEvent("GuildKickInactive")

        SubscribeToEvent("GuildCreate", function(et, ed) self:HandleGuildCreate(ed) end)
        SubscribeToEvent("GuildApply", function(et, ed) self:HandleGuildApply(ed) end)
        SubscribeToEvent("GuildHandleApplication", function(et, ed) self:HandleGuildHandleApplication(ed) end)
        SubscribeToEvent("GuildInvite", function(et, ed) self:HandleGuildInvite(ed) end)
        SubscribeToEvent("GuildInviteAccept", function(et, ed) self:HandleGuildInviteAccept(ed) end)
        SubscribeToEvent("GuildLeave", function(et, ed) self:HandleGuildLeave(ed) end)
        SubscribeToEvent("GuildKick", function(et, ed) self:HandleGuildKick(ed) end)
        SubscribeToEvent("GuildPromote", function(et, ed) self:HandleGuildPromote(ed) end)
        SubscribeToEvent("GuildDemote", function(et, ed) self:HandleGuildDemote(ed) end)
        SubscribeToEvent("GuildDonate", function(et, ed) self:HandleGuildDonate(ed) end)
        SubscribeToEvent("GuildUpgrade", function(et, ed) self:HandleGuildUpgrade(ed) end)
        SubscribeToEvent("GuildSetNotice", function(et, ed) self:HandleGuildSetNotice(ed) end)
        SubscribeToEvent("GuildSetRankName", function(et, ed) self:HandleGuildSetRankName(ed) end)
        SubscribeToEvent("GuildTransferLeader", function(et, ed) self:HandleGuildTransferLeader(ed) end)
        SubscribeToEvent("GuildChat", function(et, ed) self:HandleGuildChat(ed) end)
        SubscribeToEvent("GuildKickInactive", function(et, ed) self:HandleGuildKickInactive(ed) end)
    else
        SubscribeToEvent("GuildInfoSync", function(et, ed) self:HandleGuildInfoSync(ed) end)
        SubscribeToEvent("GuildMemberSync", function(et, ed) self:HandleGuildMemberSync(ed) end)
        SubscribeToEvent("GuildApplicationSync", function(et, ed) self:HandleGuildApplicationSync(ed) end)
        SubscribeToEvent("GuildNotify", function(et, ed) self:HandleGuildNotify(ed) end)
        SubscribeToEvent("GuildChat", function(et, ed) self:HandleGuildChatClient(ed) end)
    end
end

function Guild:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.guilds = data.guilds or {}
        self.playerGuildMap = data.playerGuildMap or {}
        self.nameToGuildId = data.nameToGuildId or {}
    end
    -- 重建 nameToGuildId 防止不一致
    self.nameToGuildId = {}
    for gid, gdata in pairs(self.guilds) do
        self.nameToGuildId[gdata.name] = gid
    end
end

function Guild:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        guilds = self.guilds,
        playerGuildMap = self.playerGuildMap,
        nameToGuildId = self.nameToGuildId
    })
end

-- ----------------------------------------------------------------------------
-- 辅助函数
-- ----------------------------------------------------------------------------

function Guild:GetGuildById(guildId)
    return self.guilds[guildId]
end

function Guild:GetGuildByPlayer(playerId)
    local gid = self.playerGuildMap[playerId]
    if gid then return self.guilds[gid] end
    return nil
end

function Guild:GetMemberCount(guild)
    local c = 0
    for _, _ in pairs(guild.members) do c = c + 1 end
    return c
end

function Guild:GetMaxMembersByLevel(level)
    return self.ctx.config.maxGuildSize + (level - 1) * 10
end

function Guild:GetRankWeight(rank)
    local weights = { leader = 100, officer = 80, elite = 60, member = 40, recruit = 20 }
    return weights[rank] or 0
end

function Guild:GetNextExpForLevel(level)
    return math.floor(1000 * math.pow(1.5, level - 1))
end

function Guild:CanManageRank(actorId, targetId, guild)
    if not guild then return false end
    local actor = guild.members[actorId]
    local target = guild.members[targetId]
    if not actor or not target then return false end
    if actorId == targetId then return false end
    if guild.leaderId == actorId then return true end
    if actor.rank == "officer" and self:GetRankWeight(target.rank) < self:GetRankWeight(actor.rank) then
        return true
    end
    return false
end

function Guild:AddEventLog(guild, eventType, message)
    table.insert(guild.eventLog, {
        type = eventType,
        msg = message,
        time = GetTimestampSec()
    })
    if #guild.eventLog > 200 then table.remove(guild.eventLog, 1) end
end

-- ----------------------------------------------------------------------------
-- 核心操作
-- ----------------------------------------------------------------------------

function Guild:CreateGuild(playerId, guildName)
    if self.playerGuildMap[playerId] then
        self.ctx:NotifyPlayer(playerId, "error", "您已加入公会，无法创建。")
        return nil
    end
    if self.nameToGuildId[guildName] then
        self.ctx:NotifyPlayer(playerId, "error", "该公会名称已被占用。")
        return nil
    end
    if not guildName or #guildName < 2 or #guildName > 20 then
        self.ctx:NotifyPlayer(playerId, "error", "公会名称长度需在 2-20 之间。")
        return nil
    end

    -- 此处应扣除货币，由调用方或外部经济系统处理
    local gid = GenerateUUID()
    local now = GetTimestampSec()
    self.guilds[gid] = {
        guildId = gid,
        name = guildName,
        leaderId = playerId,
        level = 1,
        exp = 0,
        notice = "欢迎加入 " .. guildName,
        fund = 0,
        maxMembers = self:GetMaxMembersByLevel(1),
        members = {
            [playerId] = { rank = "leader", contribution = 0, joinTime = now, lastLogin = now }
        },
        applications = {},
        invites = {},
        eventLog = {},
        rankNames = { leader = "会长", officer = "副会长", elite = "精英", member = "成员", recruit = "新人" },
        createdTime = now
    }
    self.playerGuildMap[playerId] = gid
    self.nameToGuildId[guildName] = gid
    self:AddEventLog(self.guilds[gid], "create", playerId .. " 创建了公会")
    self.ctx:NotifyPlayer(playerId, "success", "公会 " .. guildName .. " 创建成功！")
    self:SyncGuildInfoToAllMembers(gid)
    return self.guilds[gid]
end

function Guild:DisbandGuild(guildId, actorId)
    local guild = self.guilds[guildId]
    if not guild then return end
    if guild.leaderId ~= actorId then
        self.ctx:NotifyPlayer(actorId, "error", "只有会长可以解散公会。")
        return
    end
    for pid, _ in pairs(guild.members) do
        self.playerGuildMap[pid] = nil
        if self.ctx:IsOnline(pid) then
            local nd = VariantMap()
            nd["GuildId"] = guildId
            nd["Reason"] = "disbanded"
            self.ctx:SendToPlayer(pid, "GuildDisbandNotify", nd)
        end
    end
    self.nameToGuildId[guild.name] = nil
    self.guilds[guildId] = nil
    self.ctx:NotifyPlayer(actorId, "info", "公会已解散。")
end

function Guild:LeaveGuild(playerId)
    local guild = self:GetGuildByPlayer(playerId)
    if not guild then return end
    if guild.leaderId == playerId then
        self.ctx:NotifyPlayer(playerId, "error", "会长必须先转让职位或解散公会。")
        return
    end
    guild.members[playerId] = nil
    self.playerGuildMap[playerId] = nil
    self:AddEventLog(guild, "leave", playerId .. " 离开了公会")
    self.ctx:NotifyPlayer(playerId, "info", "您已退出公会。")
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:KickMember(guild, actorId, targetId)
    if not self:CanManageRank(actorId, targetId, guild) then
        self.ctx:NotifyPlayer(actorId, "error", "权限不足。")
        return
    end
    if not guild.members[targetId] then
        self.ctx:NotifyPlayer(actorId, "error", "目标不在公会中。")
        return
    end
    guild.members[targetId] = nil
    self.playerGuildMap[targetId] = nil
    self:AddEventLog(guild, "kick", targetId .. " 被 " .. actorId .. " 踢出公会")
    self.ctx:NotifyPlayer(actorId, "info", "成员已移除。")
    if self.ctx:IsOnline(targetId) then
        self.ctx:NotifyPlayer(targetId, "info", "您已被移出公会。")
    end
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:Promote(guild, actorId, targetId)
    if not self:CanManageRank(actorId, targetId, guild) then
        self.ctx:NotifyPlayer(actorId, "error", "权限不足。")
        return
    end
    local ranks = { "recruit", "member", "elite", "officer" }
    local m = guild.members[targetId]
    if not m then return end
    local current = m.rank
    local nextRank = nil
    for i, r in ipairs(ranks) do
        if r == current and i < #ranks then nextRank = ranks[i+1]; break end
    end
    if not nextRank then
        self.ctx:NotifyPlayer(actorId, "error", "无法再晋升。")
        return
    end
    m.rank = nextRank
    self:AddEventLog(guild, "promote", targetId .. " 被晋升为 " .. (guild.rankNames[nextRank] or nextRank))
    self.ctx:NotifyPlayer(actorId, "info", "晋升成功。")
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:Demote(guild, actorId, targetId)
    if not self:CanManageRank(actorId, targetId, guild) then
        self.ctx:NotifyPlayer(actorId, "error", "权限不足。")
        return
    end
    local ranks = { "officer", "elite", "member", "recruit" }
    local m = guild.members[targetId]
    if not m then return end
    local current = m.rank
    local nextRank = nil
    for i, r in ipairs(ranks) do
        if r == current and i < #ranks then nextRank = ranks[i+1]; break end
    end
    if not nextRank then
        self.ctx:NotifyPlayer(actorId, "error", "无法再降级。")
        return
    end
    m.rank = nextRank
    self:AddEventLog(guild, "demote", targetId .. " 被降职为 " .. (guild.rankNames[nextRank] or nextRank))
    self.ctx:NotifyPlayer(actorId, "info", "降职成功。")
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:TransferLeader(guild, actorId, targetId)
    if guild.leaderId ~= actorId then
        self.ctx:NotifyPlayer(actorId, "error", "只有会长可以转让。")
        return
    end
    if not guild.members[targetId] then
        self.ctx:NotifyPlayer(actorId, "error", "目标不在公会中。")
        return
    end
    guild.members[actorId].rank = "member"
    guild.members[targetId].rank = "leader"
    guild.leaderId = targetId
    self:AddEventLog(guild, "transfer", "会长职位转让给 " .. targetId)
    self.ctx:NotifyPlayer(actorId, "info", "会长已转让。")
    self.ctx:NotifyPlayer(targetId, "info", "您已成为新会长。")
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function Guild:HandleGuildCreate(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local name = eventData["GuildName"]:GetString()
    if not playerId or not name then return end
    self:CreateGuild(playerId, name)
end

function Guild:HandleGuildApply(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local guildId = eventData["GuildId"]:GetString()
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    if not playerId or not guildId then return end
    if self.playerGuildMap[playerId] then
        self.ctx:NotifyPlayer(playerId, "error", "您已加入公会。")
        return
    end
    local guild = self.guilds[guildId]
    if not guild then return end
    if self:GetMemberCount(guild) >= guild.maxMembers then
        self.ctx:NotifyPlayer(playerId, "error", "该公会人数已满。")
        return
    end
    guild.applications[playerId] = { applyTime = GetTimestampSec(), message = msg, status = "pending" }
    self.ctx:NotifyPlayer(playerId, "success", "申请已提交。")
    -- 通知有审批权限的在线成员
    for pid, mdata in pairs(guild.members) do
        if (mdata.rank == "leader" or mdata.rank == "officer") and self.ctx:IsOnline(pid) then
            local nd = VariantMap()
            nd["Type"] = "new_application"
            nd["ApplicantId"] = playerId
            nd["ApplicantName"] = self.ctx:GetPlayerNickname(playerId)
            self.ctx:SendToPlayer(pid, "GuildNotify", nd)
        end
    end
end

function Guild:HandleGuildHandleApplication(eventData)
    local connection = eventData["Connection"]
    local actorId = self.ctx:GetPlayerIdByConnection(connection)
    local guildId = eventData["GuildId"]:GetString()
    local applicantId = eventData["ApplicantId"]:GetString()
    local approved = eventData["Approved"]:GetBool()
    if not actorId or not guildId or not applicantId then return end

    local guild = self.guilds[guildId]
    if not guild then return end
    local actor = guild.members[actorId]
    if not actor or (actor.rank ~= "leader" and actor.rank ~= "officer") then
        self.ctx:NotifyPlayer(actorId, "error", "权限不足。")
        return
    end
    local app = guild.applications[applicantId]
    if not app or app.status ~= "pending" then
        self.ctx:NotifyPlayer(actorId, "error", "申请不存在。")
        return
    end
    if approved then
        if self.playerGuildMap[applicantId] then
            self.ctx:NotifyPlayer(actorId, "error", "该玩家已加入其他公会。")
            app.status = "rejected"
            return
        end
        if self:GetMemberCount(guild) >= guild.maxMembers then
            self.ctx:NotifyPlayer(actorId, "error", "公会人数已满。")
            return
        end
        app.status = "accepted"
        guild.members[applicantId] = { rank = "recruit", contribution = 0, joinTime = GetTimestampSec(), lastLogin = GetTimestampSec() }
        self.playerGuildMap[applicantId] = guildId
        self:AddEventLog(guild, "join", applicantId .. " 加入公会")
        self.ctx:NotifyPlayer(applicantId, "success", "您已成功加入公会 " .. guild.name)
        self:SyncGuildInfoToAllMembers(guildId)
    else
        app.status = "rejected"
        if self.ctx:IsOnline(applicantId) then
            self.ctx:NotifyPlayer(applicantId, "info", "您的入公申请被拒绝。")
        end
        self.ctx:NotifyPlayer(actorId, "info", "已拒绝申请。")
    end
    guild.applications[applicantId] = nil
end

function Guild:HandleGuildInvite(eventData)
    local connection = eventData["Connection"]
    local actorId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not actorId or not targetId then return end
    local guild = self:GetGuildByPlayer(actorId)
    if not guild then return end
    local actor = guild.members[actorId]
    if not actor or (actor.rank ~= "leader" and actor.rank ~= "officer") then
        self.ctx:NotifyPlayer(actorId, "error", "只有会长/副会长可以邀请。")
        return
    end
    if self:GetMemberCount(guild) >= guild.maxMembers then
        self.ctx:NotifyPlayer(actorId, "error", "公会人数已满。")
        return
    end
    if self.playerGuildMap[targetId] then
        self.ctx:NotifyPlayer(actorId, "error", "对方已加入公会。")
        return
    end
    guild.invites[targetId] = { inviteTime = GetTimestampSec() }
    if self.ctx:IsOnline(targetId) then
        local nd = VariantMap()
        nd["GuildId"] = guild.guildId
        nd["GuildName"] = guild.name
        nd["InviterName"] = self.ctx:GetPlayerNickname(actorId)
        self.ctx:SendToPlayer(targetId, "GuildInviteNotify", nd)
    end
    self.ctx:NotifyPlayer(actorId, "success", "邀请已发送。")
end

function Guild:HandleGuildInviteAccept(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local guildId = eventData["GuildId"]:GetString()
    if not playerId or not guildId then return end
    local guild = self.guilds[guildId]
    if not guild or not guild.invites[playerId] then
        self.ctx:NotifyPlayer(playerId, "error", "邀请不存在。")
        return
    end
    if self.playerGuildMap[playerId] then
        self.ctx:NotifyPlayer(playerId, "error", "您已加入公会。")
        return
    end
    if self:GetMemberCount(guild) >= guild.maxMembers then
        self.ctx:NotifyPlayer(playerId, "error", "公会人数已满。")
        return
    end
    guild.invites[playerId] = nil
    guild.members[playerId] = { rank = "recruit", contribution = 0, joinTime = GetTimestampSec(), lastLogin = GetTimestampSec() }
    self.playerGuildMap[playerId] = guildId
    self:AddEventLog(guild, "join", playerId .. " 通过邀请加入")
    self.ctx:NotifyPlayer(playerId, "success", "欢迎加入 " .. guild.name)
    self:SyncGuildInfoToAllMembers(guildId)
end

function Guild:HandleGuildLeave(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    self:LeaveGuild(playerId)
end

function Guild:HandleGuildKick(eventData)
    local connection = eventData["Connection"]
    local actorId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not actorId or not targetId then return end
    local guild = self:GetGuildByPlayer(actorId)
    if guild then
        self:KickMember(guild, actorId, targetId)
    end
end

function Guild:HandleGuildPromote(eventData)
    local connection = eventData["Connection"]
    local actorId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not actorId or not targetId then return end
    local guild = self:GetGuildByPlayer(actorId)
    if guild then self:Promote(guild, actorId, targetId) end
end

function Guild:HandleGuildDemote(eventData)
    local connection = eventData["Connection"]
    local actorId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not actorId or not targetId then return end
    local guild = self:GetGuildByPlayer(actorId)
    if guild then self:Demote(guild, actorId, targetId) end
end

function Guild:HandleGuildDonate(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local amount = eventData["Amount"]:GetInt()
    if not playerId or not amount or amount <= 0 then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild then return end
    -- 这里应由外部经济系统扣除玩家货币，成功后回调本函数
    -- 在示例中直接加资金和贡献
    guild.fund = guild.fund + amount
    local m = guild.members[playerId]
    if m then m.contribution = (m.contribution or 0) + amount end
    self:AddEventLog(guild, "donate", playerId .. " 捐献了 " .. amount)
    self.ctx:NotifyPlayer(playerId, "success", "捐献成功，公会资金 +" .. amount)
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:HandleGuildUpgrade(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild then return end
    if guild.leaderId ~= playerId then
        self.ctx:NotifyPlayer(playerId, "error", "只有会长可以升级公会。")
        return
    end
    local needExp = self:GetNextExpForLevel(guild.level)
    if guild.exp < needExp then
        self.ctx:NotifyPlayer(playerId, "error", "公会经验不足。")
        return
    end
    -- 同时需要消耗资金
    local needFund = guild.level * 5000
    if guild.fund < needFund then
        self.ctx:NotifyPlayer(playerId, "error", "公会资金不足。")
        return
    end
    guild.exp = guild.exp - needExp
    guild.fund = guild.fund - needFund
    guild.level = guild.level + 1
    guild.maxMembers = self:GetMaxMembersByLevel(guild.level)
    self:AddEventLog(guild, "upgrade", "公会升级至 Lv." .. guild.level)
    self.ctx:NotifyPlayer(playerId, "success", "公会升级成功！当前等级：" .. guild.level)
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:HandleGuildSetNotice(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local notice = eventData["Notice"]:GetString()
    if not playerId or not notice then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild then return end
    local m = guild.members[playerId]
    if not m or (m.rank ~= "leader" and m.rank ~= "officer") then
        self.ctx:NotifyPlayer(playerId, "error", "权限不足。")
        return
    end
    guild.notice = notice
    self.ctx:NotifyPlayer(playerId, "success", "公告已更新。")
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:HandleGuildSetRankName(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local rankKey = eventData["RankKey"]:GetString()
    local rankName = eventData["RankName"]:GetString()
    if not playerId or not rankKey or not rankName then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild or guild.leaderId ~= playerId then
        self.ctx:NotifyPlayer(playerId, "error", "只有会长可以修改职位名。")
        return
    end
    guild.rankNames[rankKey] = rankName
    self:SyncGuildInfoToAllMembers(guild.guildId)
end

function Guild:HandleGuildTransferLeader(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end
    local guild = self:GetGuildByPlayer(playerId)
    if guild then self:TransferLeader(guild, playerId, targetId) end
end

function Guild:HandleGuildChat(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local text = eventData["Text"]:GetString()
    if not playerId or not text then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild then return end
    local nd = VariantMap()
    nd["SenderId"] = playerId
    nd["SenderName"] = self.ctx:GetPlayerNickname(playerId)
    nd["Text"] = text
    for pid, _ in pairs(guild.members) do
        if self.ctx:IsOnline(pid) then
            self.ctx:SendToPlayer(pid, "GuildChat", nd)
        end
    end
end

function Guild:HandleGuildKickInactive(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local guild = self:GetGuildByPlayer(playerId)
    if not guild or guild.leaderId ~= playerId then
        self.ctx:NotifyPlayer(playerId, "error", "只有会长可以清理。")
        return
    end
    local now = GetTimestampSec()
    local days = 7
    local threshold = days * 86400
    local kicked = {}
    for pid, mdata in pairs(guild.members) do
        if pid ~= playerId and (now - (mdata.lastLogin or 0)) > threshold then
            table.insert(kicked, pid)
        end
    end
    for _, pid in ipairs(kicked) do
        guild.members[pid] = nil
        self.playerGuildMap[pid] = nil
    end
    if #kicked > 0 then
        self:AddEventLog(guild, "kick", "会长清理了 " .. #kicked .. " 名 inactive 成员")
        self:SyncGuildInfoToAllMembers(guild.guildId)
        self.ctx:NotifyPlayer(playerId, "info", "已清理 " .. #kicked .. " 名 inactive 成员。")
    else
        self.ctx:NotifyPlayer(playerId, "info", "暂无需要清理的成员。")
    end
end

-- ----------------------------------------------------------------------------
-- 同步协议
-- ----------------------------------------------------------------------------

function Guild:SyncGuildInfoToAllMembers(guildId)
    local guild = self.guilds[guildId]
    if not guild then return end
    local payload = VariantMap()
    payload["GuildId"] = guild.guildId
    payload["Name"] = guild.name
    payload["LeaderId"] = guild.leaderId
    payload["Level"] = guild.level
    payload["Exp"] = guild.exp
    payload["NextExp"] = self:GetNextExpForLevel(guild.level)
    payload["Fund"] = guild.fund
    payload["MaxMembers"] = guild.maxMembers
    payload["Notice"] = guild.notice
    payload["CreatedTime"] = guild.createdTime
    payload["RankNames"] = SerializeTable(guild.rankNames)

    -- members 序列化
    local memParts = {}
    for pid, mdata in pairs(guild.members) do
        table.insert(memParts, string.format("%s=%s=%d=%d=%d",
            pid, mdata.rank, mdata.contribution, mdata.joinTime, mdata.lastLogin))
    end
    payload["Members"] = table.concat(memParts, "|")

    -- applications 仅同步给会长和副会长
    local appParts = {}
    for pid, adata in pairs(guild.applications) do
        table.insert(appParts, string.format("%s=%s=%s=%d",
            pid, adata.status, adata.message, adata.applyTime))
    end
    payload["ApplicationsRaw"] = table.concat(appParts, "|")

    for pid, _ in pairs(guild.members) do
        if self.ctx:IsOnline(pid) then
            self.ctx:SendToPlayer(pid, "GuildInfoSync", payload)
        end
    end
end

-- ----------------------------------------------------------------------------
-- 客户端事件处理
-- ----------------------------------------------------------------------------

function Guild:HandleGuildInfoSync(eventData)
    print("[Guild] Client received GuildInfoSync")
end

function Guild:HandleGuildMemberSync(eventData)
    print("[Guild] Client received GuildMemberSync")
end

function Guild:HandleGuildApplicationSync(eventData)
    print("[Guild] Client received GuildApplicationSync")
end

function Guild:HandleGuildNotify(eventData)
    print("[Guild] Client received GuildNotify")
end

function Guild:HandleGuildChatClient(eventData)
    print("[Guild] Client received GuildChat")
end

return Guild
