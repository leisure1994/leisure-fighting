-- Party.lua
-- ============================================================================
-- 组队系统 (Party System)
-- ============================================================================
-- 功能：
--   1. 创建 / 解散队伍
--   2. 邀请 / 申请入队 / 踢出 / 转让队长
--   3. 队员准备状态、离线保护
--   4. 掉落分配模式 (自由拾取 / 轮流拾取 / 队长分配)
--   5. 经验共享系数接口
--   6. 队内消息广播
-- ============================================================================

local Party = {
    parties = {},            -- [partyId] = partyData
    playerPartyMap = {},     -- [playerId] = partyId
    offlineTimers = {},      -- [playerId] = { offlineAt = t, partyId = id }
    dbFileName = "PartyDB",
    ctx = nil
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function Party:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("PartyCreate")
        net:RegisterRemoteEvent("PartyInvite")
        net:RegisterRemoteEvent("PartyInviteAccept")
        net:RegisterRemoteEvent("PartyInviteReject")
        net:RegisterRemoteEvent("PartyLeave")
        net:RegisterRemoteEvent("PartyKick")
        net:RegisterRemoteEvent("PartyTransferLeader")
        net:RegisterRemoteEvent("PartySetLootMode")
        net:RegisterRemoteEvent("PartySetReady")
        net:RegisterRemoteEvent("PartyDisband")
        net:RegisterRemoteEvent("PartySummon")
        net:RegisterRemoteEvent("PartyMessage")

        SubscribeToEvent("PartyCreate", function(et, ed) self:HandlePartyCreate(ed) end)
        SubscribeToEvent("PartyInvite", function(et, ed) self:HandlePartyInvite(ed) end)
        SubscribeToEvent("PartyInviteAccept", function(et, ed) self:HandlePartyInviteAccept(ed) end)
        SubscribeToEvent("PartyInviteReject", function(et, ed) self:HandlePartyInviteReject(ed) end)
        SubscribeToEvent("PartyLeave", function(et, ed) self:HandlePartyLeave(ed) end)
        SubscribeToEvent("PartyKick", function(et, ed) self:HandlePartyKick(ed) end)
        SubscribeToEvent("PartyTransferLeader", function(et, ed) self:HandlePartyTransferLeader(ed) end)
        SubscribeToEvent("PartySetLootMode", function(et, ed) self:HandlePartySetLootMode(ed) end)
        SubscribeToEvent("PartySetReady", function(et, ed) self:HandlePartySetReady(ed) end)
        SubscribeToEvent("PartyDisband", function(et, ed) self:HandlePartyDisband(ed) end)
        SubscribeToEvent("PartySummon", function(et, ed) self:HandlePartySummon(ed) end)
        SubscribeToEvent("PartyMessage", function(et, ed) self:HandlePartyMessage(ed) end)

        -- 注册 Update 以处理离线超时
        SubscribeToEvent("Update", function(et, ed) self:HandleUpdate(ed) end)
    else
        SubscribeToEvent("PartyUpdate", function(et, ed) self:HandlePartyUpdate(ed) end)
        SubscribeToEvent("PartyInviteNotify", function(et, ed) self:HandlePartyInviteNotify(ed) end)
        SubscribeToEvent("PartyMemberUpdate", function(et, ed) self:HandlePartyMemberUpdate(ed) end)
        SubscribeToEvent("PartyDisbandNotify", function(et, ed) self:HandlePartyDisbandNotify(ed) end)
        SubscribeToEvent("PartyMessage", function(et, ed) self:HandlePartyMessageClient(ed) end)
    end
end

function Party:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.parties = data.parties or {}
        -- 清空运行时在线状态，需要重建
        self.playerPartyMap = {}
        for pid, pmap in pairs(data.playerPartyMap or {}) do
            self.playerPartyMap[pid] = pmap
        end
    end
end

function Party:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        parties = self.parties,
        playerPartyMap = self.playerPartyMap
    })
end

-- ----------------------------------------------------------------------------
-- 运行时辅助
-- ----------------------------------------------------------------------------

function Party:GetPartyById(partyId)
    return self.parties[partyId]
end

function Party:GetPartyIdByPlayer(playerId)
    return self.playerPartyMap[playerId]
end

function Party:GetPartyByPlayer(playerId)
    local pid = self.playerPartyMap[playerId]
    if pid then return self.parties[pid] end
    return nil
end

function Party:IsLeader(playerId, party)
    if not party then party = self:GetPartyByPlayer(playerId) end
    return party ~= nil and party.leaderId == playerId
end

function Party:GetMemberCount(party)
    local count = 0
    for _, _ in pairs(party.members) do count = count + 1 end
    return count
end

function Party:GetOnlineMembers(party)
    local list = {}
    for pid, _ in pairs(party.members) do
        if self.ctx:IsOnline(pid) then table.insert(list, pid) end
    end
    return list
end

function Party:BroadcastToParty(party, eventName, data, excludeId)
    for pid, _ in pairs(party.members) do
        if pid ~= excludeId and self.ctx:IsOnline(pid) then
            self.ctx:SendToPlayer(pid, eventName, data)
        end
    end
end

-- ----------------------------------------------------------------------------
-- 离线保护
-- ----------------------------------------------------------------------------

function Party:OnPlayerOffline(playerId)
    if not IsServer() then return end
    local partyId = self.playerPartyMap[playerId]
    if partyId then
        self.offlineTimers[playerId] = {
            offlineAt = GetTimestampSec(),
            partyId = partyId
        }
        local party = self.parties[partyId]
        if party then
            party.members[playerId].online = false
            self:SyncPartyToMembers(party, playerId)
        end
    end
end

function Party:OnPlayerOnline(playerId)
    if not IsServer() then return end
    local partyId = self.playerPartyMap[playerId]
    if partyId then
        self.offlineTimers[playerId] = nil
        local party = self.parties[partyId]
        if party and party.members[playerId] then
            party.members[playerId].online = true
            self:SyncPartyToMembers(party, nil)
        end
    end
end

function Party:HandleUpdate(eventData)
    local now = GetTimestampSec()
    local timeoutSec = 60
    local toRemove = {}
    for pid, info in pairs(self.offlineTimers) do
        if now - info.offlineAt >= timeoutSec then
            table.insert(toRemove, pid)
        end
    end
    for _, pid in ipairs(toRemove) do
        self.offlineTimers[pid] = nil
        self:ForceLeaveParty(pid, "offline_timeout")
    end
end

-- ----------------------------------------------------------------------------
-- 核心操作
-- ----------------------------------------------------------------------------

function Party:CreateParty(leaderId)
    if self:GetPartyByPlayer(leaderId) then
        self.ctx:NotifyPlayer(leaderId, "error", "您已在队伍中。")
        return nil
    end
    local partyId = GenerateUUID()
    local now = GetTimestampSec()
    self.parties[partyId] = {
        partyId = partyId,
        leaderId = leaderId,
        members = {
            [leaderId] = {
                role = "leader",
                joinTime = now,
                ready = true,
                online = true
            }
        },
        settings = {
            lootMode = "free_for_all",
            autoAccept = false,
            targetInstanceId = ""
        },
        invites = {},
        createdTime = now,
        roundRobinIndex = 0,
        chatLog = {}
    }
    self.playerPartyMap[leaderId] = partyId
    self.ctx:NotifyPlayer(leaderId, "success", "队伍创建成功。")
    self:SyncPartyToMembers(self.parties[partyId], nil)
    return self.parties[partyId]
end

function Party:DisbandParty(partyId, reason)
    local party = self.parties[partyId]
    if not party then return end
    for pid, _ in pairs(party.members) do
        self.playerPartyMap[pid] = nil
    end
    for pid, _ in pairs(party.invites) do
        if self.ctx:IsOnline(pid) then
            local nd = VariantMap()
            nd["PartyId"] = partyId
            nd["Reason"] = reason or "disbanded"
            self.ctx:SendToPlayer(pid, "PartyDisbandNotify", nd)
        end
    end
    self.parties[partyId] = nil
end

function Party:ForceLeaveParty(playerId, reason)
    local partyId = self.playerPartyMap[playerId]
    if not partyId then return end
    local party = self.parties[partyId]
    if not party then return end

    party.members[playerId] = nil
    self.playerPartyMap[playerId] = nil

    self.ctx:NotifyPlayer(playerId, "info", "您已离开队伍。")

    local remains = self:GetMemberCount(party)
    if remains == 0 then
        self:DisbandParty(partyId, "empty")
    else
        if party.leaderId == playerId then
            local newLeader = nil
            local earliest = math.huge
            for pid, mdata in pairs(party.members) do
                if mdata.joinTime < earliest then
                    earliest = mdata.joinTime
                    newLeader = pid
                end
            end
            if newLeader then
                party.leaderId = newLeader
                party.members[newLeader].role = "leader"
                self.ctx:NotifyPlayer(newLeader, "info", "您已成为新队长。")
            end
        end
        self:SyncPartyToMembers(party, nil)
    end
end

function Party:AddMember(partyId, playerId)
    local party = self.parties[partyId]
    if not party then return false end
    if self:GetMemberCount(party) >= self.ctx.config.maxPartySize then
        self.ctx:NotifyPlayer(playerId, "error", "队伍已满。")
        return false
    end
    local now = GetTimestampSec()
    party.members[playerId] = {
        role = "member",
        joinTime = now,
        ready = true,
        online = self.ctx:IsOnline(playerId)
    }
    party.invites[playerId] = nil
    self.playerPartyMap[playerId] = partyId
    self.ctx:NotifyPlayer(playerId, "success", "您已加入队伍。")
    self:SyncPartyToMembers(party, nil)
    return true
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function Party:HandlePartyCreate(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    self:CreateParty(playerId)
end

function Party:HandlePartyInvite(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId or playerId == targetId then return end

    local party = self:GetPartyByPlayer(playerId)
    if not party then
        self.ctx:NotifyPlayer(playerId, "error", "您不在任何队伍中。")
        return
    end
    if not self:IsLeader(playerId, party) then
        self.ctx:NotifyPlayer(playerId, "error", "只有队长可以邀请。")
        return
    end
    if self:GetMemberCount(party) >= self.ctx.config.maxPartySize then
        self.ctx:NotifyPlayer(playerId, "error", "队伍人数已达上限。")
        return
    end
    if self:GetPartyByPlayer(targetId) then
        self.ctx:NotifyPlayer(playerId, "error", "对方已在队伍中。")
        return
    end

    party.invites[targetId] = { inviteTime = GetTimestampSec() }

    if self.ctx:IsOnline(targetId) then
        local nd = VariantMap()
        nd["PartyId"] = party.partyId
        nd["LeaderId"] = party.leaderId
        nd["LeaderName"] = self.ctx:GetPlayerNickname(party.leaderId)
        self.ctx:SendToPlayer(targetId, "PartyInviteNotify", nd)
    end
    self.ctx:NotifyPlayer(playerId, "success", "邀请已发送。")
end

function Party:HandlePartyInviteAccept(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local partyId = eventData["PartyId"]:GetString()
    if not playerId or not partyId then return end

    local party = self.parties[partyId]
    if not party or not party.invites[playerId] then
        self.ctx:NotifyPlayer(playerId, "error", "邀请不存在或已过期。")
        return
    end
    self:AddMember(partyId, playerId)
end

function Party:HandlePartyInviteReject(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local partyId = eventData["PartyId"]:GetString()
    if not playerId or not partyId then return end
    local party = self.parties[partyId]
    if party and party.invites[playerId] then
        party.invites[playerId] = nil
        if self.ctx:IsOnline(party.leaderId) then
            self.ctx:NotifyPlayer(party.leaderId, "info", self.ctx:GetPlayerNickname(playerId) .. " 拒绝了队伍邀请。")
        end
    end
end

function Party:HandlePartyLeave(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    self:ForceLeaveParty(playerId, "leave")
end

function Party:HandlePartyKick(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end

    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    if not self:IsLeader(playerId, party) then
        self.ctx:NotifyPlayer(playerId, "error", "只有队长可以踢人。")
        return
    end
    if not party.members[targetId] then
        self.ctx:NotifyPlayer(playerId, "error", "目标不在队伍中。")
        return
    end

    self:ForceLeaveParty(targetId, "kicked")
    if self.ctx:IsOnline(targetId) then
        self.ctx:NotifyPlayer(targetId, "info", "您已被移出队伍。")
    end
    self.ctx:NotifyPlayer(playerId, "info", "已将 " .. self.ctx:GetPlayerNickname(targetId) .. " 移出队伍。")
end

function Party:HandlePartyTransferLeader(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end

    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    if party.leaderId ~= playerId then
        self.ctx:NotifyPlayer(playerId, "error", "只有队长可以转让。")
        return
    end
    if not party.members[targetId] then
        self.ctx:NotifyPlayer(playerId, "error", "目标不在队伍中。")
        return
    end

    party.members[playerId].role = "member"
    party.members[targetId].role = "leader"
    party.leaderId = targetId

    self.ctx:NotifyPlayer(playerId, "info", "队长已转让给 " .. self.ctx:GetPlayerNickname(targetId))
    self.ctx:NotifyPlayer(targetId, "info", "您已成为队长。")
    self:SyncPartyToMembers(party, nil)
end

function Party:HandlePartySetLootMode(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local mode = eventData["Mode"]:GetString()
    if not playerId or not mode then return end
    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    if not self:IsLeader(playerId, party) then
        self.ctx:NotifyPlayer(playerId, "error", "权限不足。")
        return
    end
    local validModes = { free_for_all = true, round_robin = true, master = true }
    if not validModes[mode] then return end
    party.settings.lootMode = mode
    self:BroadcastToParty(party, "PartyUpdate", self:BuildPartyPayload(party))
    self.ctx:NotifyPlayer(playerId, "info", "分配模式已设置为 " .. mode)
end

function Party:HandlePartySetReady(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local ready = eventData["Ready"]:GetBool()
    if not playerId then return end
    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    local m = party.members[playerId]
    if m then
        m.ready = ready
        self:SyncPartyToMembers(party, nil)
    end
end

function Party:HandlePartyDisband(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    if not self:IsLeader(playerId, party) then
        self.ctx:NotifyPlayer(playerId, "error", "只有队长可以解散队伍。")
        return
    end
    self:DisbandParty(party.partyId, "leader_disband")
    self.ctx:NotifyPlayer(playerId, "info", "队伍已解散。")
end

function Party:HandlePartySummon(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local party = self:GetPartyByPlayer(playerId)
    if not party then return end
    if not self:IsLeader(playerId, party) then
        self.ctx:NotifyPlayer(playerId, "error", "只有队长可以召集。")
        return
    end
    local nd = VariantMap()
    nd["SummonerId"] = playerId
    nd["SummonerName"] = self.ctx:GetPlayerNickname(playerId)
    self:BroadcastToParty(party, "PartySummon", nd, playerId)
    self.ctx:NotifyPlayer(playerId, "info", "召集令已发出。")
end

function Party:HandlePartyMessage(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local text = eventData["Text"]:GetString()
    if not playerId or not text or #text == 0 then return end
    local party = self:GetPartyByPlayer(playerId)
    if not party then return end

    table.insert(party.chatLog, {
        senderId = playerId,
        senderName = self.ctx:GetPlayerNickname(playerId),
        text = text,
        time = GetTimestampSec()
    })
    if #party.chatLog > 100 then table.remove(party.chatLog, 1) end

    local nd = VariantMap()
    nd["SenderId"] = playerId
    nd["SenderName"] = self.ctx:GetPlayerNickname(playerId)
    nd["Text"] = text
    self:BroadcastToParty(party, "PartyMessage", nd)
end

-- ----------------------------------------------------------------------------
-- 同步协议
-- ----------------------------------------------------------------------------

function Party:BuildPartyPayload(party)
    local data = VariantMap()
    data["PartyId"] = party.partyId
    data["LeaderId"] = party.leaderId
    data["LootMode"] = party.settings.lootMode
    data["AutoAccept"] = party.settings.autoAccept
    data["CreatedTime"] = party.createdTime

    local memParts = {}
    for pid, mdata in pairs(party.members) do
        local line = string.format("%s=%s=%s=%s=%s",
            pid,
            mdata.role,
            tostring(mdata.ready and "1" or "0"),
            tostring(mdata.online and "1" or "0"),
            tostring(mdata.joinTime)
        )
        table.insert(memParts, line)
    end
    data["Members"] = table.concat(memParts, "|")

    local invParts = {}
    for pid, _ in pairs(party.invites) do
        table.insert(invParts, pid)
    end
    data["Invites"] = table.concat(invParts, ",")
    return data
end

function Party:SyncPartyToMembers(party, excludeId)
    local payload = self:BuildPartyPayload(party)
    self:BroadcastToParty(party, "PartyUpdate", payload, excludeId)
end

-- ----------------------------------------------------------------------------
-- 客户端事件处理（占位，供 UI 接入）
-- ----------------------------------------------------------------------------

function Party:HandlePartyUpdate(eventData)
    print("[Party] Client received PartyUpdate")
end

function Party:HandlePartyInviteNotify(eventData)
    print("[Party] Client received PartyInviteNotify")
end

function Party:HandlePartyMemberUpdate(eventData)
    print("[Party] Client received PartyMemberUpdate")
end

function Party:HandlePartyDisbandNotify(eventData)
    print("[Party] Client received PartyDisbandNotify")
end

function Party:HandlePartyMessageClient(eventData)
    print("[Party] Client received PartyMessage")
end

-- ----------------------------------------------------------------------------
-- 对外接口（供战斗/掉落系统调用）
-- ----------------------------------------------------------------------------

function Party:GetSharedExpMultiplier(partyId)
    local party = self.parties[partyId]
    if not party then return 1.0 end
    local onlineCount = 0
    for pid, m in pairs(party.members) do
        if self.ctx:IsOnline(pid) then onlineCount = onlineCount + 1 end
    end
    local base = 1.0 + (Clamp(onlineCount, 1, 5) - 1) * 0.05
    return base
end

function Party:GetLootOwnerForDrop(partyId, dropSeed)
    local party = self.parties[partyId]
    if not party then return nil end
    local mode = party.settings.lootMode
    if mode == "free_for_all" then
        return nil
    elseif mode == "master" then
        return party.leaderId
    elseif mode == "round_robin" then
        local list = {}
        for pid, _ in pairs(party.members) do
            table.insert(list, pid)
        end
        if #list == 0 then return nil end
        party.roundRobinIndex = (party.roundRobinIndex or 0) + 1
        if party.roundRobinIndex > #list then party.roundRobinIndex = 1 end
        return list[party.roundRobinIndex]
    end
    return nil
end

return Party
