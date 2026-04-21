-- Friend.lua
-- ============================================================================
-- 好友系统 (Friend System)
-- ============================================================================
-- 功能：
--   1. 添加 / 删除好友
--   2. 好友请求的发送、接受、拒绝
--   3. 好友分组与备注
--   4. 亲密度与最近互动时间
--   5. 在线状态同步
--   6. 黑名单 (Block List)
-- ============================================================================

local Friend = {
    friendships = {},      -- [playerId] = { [targetId] = friendData }
    blocks = {},           -- [playerId] = { [targetId] = true }
    playerGroups = {},     -- [playerId] = { "默认", "战友", ... }
    dbFileName = "FriendDB",
    ctx = nil
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function Friend:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("FriendRequest")
        net:RegisterRemoteEvent("FriendAccept")
        net:RegisterRemoteEvent("FriendReject")
        net:RegisterRemoteEvent("FriendRemove")
        net:RegisterRemoteEvent("FriendSetGroup")
        net:RegisterRemoteEvent("FriendSetNote")
        net:RegisterRemoteEvent("FriendInteract")
        net:RegisterRemoteEvent("FriendBlock")
        net:RegisterRemoteEvent("FriendUnblock")

        SubscribeToEvent("FriendRequest", function(et, ed) self:HandleFriendRequest(ed) end)
        SubscribeToEvent("FriendAccept", function(et, ed) self:HandleFriendAccept(ed) end)
        SubscribeToEvent("FriendReject", function(et, ed) self:HandleFriendReject(ed) end)
        SubscribeToEvent("FriendRemove", function(et, ed) self:HandleFriendRemove(ed) end)
        SubscribeToEvent("FriendSetGroup", function(et, ed) self:HandleFriendSetGroup(ed) end)
        SubscribeToEvent("FriendSetNote", function(et, ed) self:HandleFriendSetNote(ed) end)
        SubscribeToEvent("FriendInteract", function(et, ed) self:HandleFriendInteract(ed) end)
        SubscribeToEvent("FriendBlock", function(et, ed) self:HandleFriendBlock(ed) end)
        SubscribeToEvent("FriendUnblock", function(et, ed) self:HandleFriendUnblock(ed) end)
    else
        -- 客户端仅监听同步事件
        SubscribeToEvent("FriendListSync", function(et, ed) self:HandleFriendListSync(ed) end)
        SubscribeToEvent("FriendNotify", function(et, ed) self:HandleFriendNotify(ed) end)
    end
end

function Friend:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.friendships = data.friendships or {}
        self.blocks = data.blocks or {}
        self.playerGroups = data.playerGroups or {}
    end
    -- 确保默认分组存在
    for pid, _ in pairs(self.friendships) do
        if not self.playerGroups[pid] then
            self.playerGroups[pid] = { [1] = "默认" }
        end
    end
end

function Friend:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        friendships = self.friendships,
        blocks = self.blocks,
        playerGroups = self.playerGroups
    })
end

-- ----------------------------------------------------------------------------
-- 玩家上下线回调
-- ----------------------------------------------------------------------------

function Friend:OnPlayerOnline(playerId)
    if not IsServer() then return end
    self:SyncFriendListToPlayer(playerId)
    self:BroadcastOnlineStatus(playerId, true)
end

function Friend:OnPlayerOffline(playerId)
    if not IsServer() then return end
    self:BroadcastOnlineStatus(playerId, false)
end

function Friend:BroadcastOnlineStatus(playerId, isOnline)
    local list = self.friendships[playerId] or {}
    for fid, _ in pairs(list) do
        if self.ctx:IsOnline(fid) then
            local data = VariantMap()
            data["FriendId"] = playerId
            data["Online"] = isOnline
            data["LastLogout"] = isOnline and 0 or (self.ctx.players[playerId] and self.ctx.players[playerId].lastLogout or 0)
            self.ctx:SendToPlayer(fid, "FriendOnlineStatus", data)
        end
    end
end

-- ----------------------------------------------------------------------------
-- 核心数据操作
-- ----------------------------------------------------------------------------

function Friend:GetFriendData(playerId, targetId)
    local pf = self.friendships[playerId]
    if pf then return pf[targetId] end
    return nil
end

function Friend:AreFriends(a, b)
    local f = self:GetFriendData(a, b)
    return f ~= nil and f.status == "friend"
end

function Friend:GetFriendCount(playerId)
    local pf = self.friendships[playerId]
    if not pf then return 0 end
    local count = 0
    for _, d in pairs(pf) do
        if d.status == "friend" then count = count + 1 end
    end
    return count
end

function Friend:GetAllFriends(playerId)
    local result = {}
    local pf = self.friendships[playerId] or {}
    for fid, data in pairs(pf) do
        if data.status == "friend" then
            table.insert(result, { friendId = fid, data = data })
        end
    end
    table.sort(result, function(a, b) return (a.data.intimacy or 0) > (b.data.intimacy or 0) end)
    return result
end

function Friend:IsBlocked(playerId, targetId)
    local pb = self.blocks[playerId]
    return pb ~= nil and pb[targetId] == true
end

function Friend:AddDefaultGroupIfMissing(playerId, groupName)
    local groups = self.playerGroups[playerId]
    if not groups then
        groups = { [1] = "默认" }
        self.playerGroups[playerId] = groups
    end
    local found = false
    for _, g in ipairs(groups) do
        if g == groupName then found = true; break end
    end
    if not found then
        table.insert(groups, groupName)
    end
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function Friend:HandleFriendRequest(eventData)
    local connection = eventData["Connection"]
    local senderId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    if not senderId or not targetId or senderId == targetId then return end

    -- 检查上限
    if self:GetFriendCount(senderId) >= self.ctx.config.maxFriends then
        self.ctx:NotifyPlayer(senderId, "error", "您的好友数量已达上限。")
        return
    end

    -- 检查是否已被对方拉黑
    if self:IsBlocked(targetId, senderId) then
        self.ctx:NotifyPlayer(senderId, "error", "无法发送好友请求。")
        return
    end

    -- 检查是否已是好友
    if self:AreFriends(senderId, targetId) then
        self.ctx:NotifyPlayer(senderId, "info", "对方已经是您的好友。")
        return
    end

    -- 检查是否已有待处理请求
    local existing = self:GetFriendData(targetId, senderId)
    if existing and existing.status == "pending_in" then
        -- 实际上 target 视角的 pending_in 就是 sender 发出的请求
        -- 如果 sender 此时又发一次，相当于重复发送
        self.ctx:NotifyPlayer(senderId, "info", "已存在待处理的好友请求。")
        return
    end

    -- 写入数据
    if not self.friendships[senderId] then self.friendships[senderId] = {} end
    if not self.friendships[targetId] then self.friendships[targetId] = {} end

    local now = GetTimestampSec()
    self.friendships[senderId][targetId] = {
        status = "pending_out",
        group = "默认",
        note = "",
        intimacy = 0,
        addTime = now,
        lastInteract = now,
        requestMsg = msg
    }
    self.friendships[targetId][senderId] = {
        status = "pending_in",
        group = "默认",
        note = "",
        intimacy = 0,
        addTime = now,
        lastInteract = now,
        requestMsg = msg
    }

    self:AddDefaultGroupIfMissing(senderId, "默认")
    self:AddDefaultGroupIfMissing(targetId, "默认")

    -- 通知双方
    self:SyncFriendEntry(senderId, targetId)
    self:SyncFriendEntry(targetId, senderId)

    -- 向目标推送通知
    if self.ctx:IsOnline(targetId) then
        local nd = VariantMap()
        nd["Type"] = "request"
        nd["SenderId"] = senderId
        nd["SenderName"] = self.ctx:GetPlayerNickname(senderId)
        nd["Message"] = msg
        self.ctx:SendToPlayer(targetId, "FriendNotify", nd)
    end

    self.ctx:NotifyPlayer(senderId, "success", "好友请求已发送。")
end

function Friend:HandleFriendAccept(eventData)
    local connection = eventData["Connection"]
    local accepterId = self.ctx:GetPlayerIdByConnection(connection)
    local senderId = eventData["SenderId"]:GetString()
    if not accepterId or not senderId then return end

    local aData = self:GetFriendData(accepterId, senderId)
    local sData = self:GetFriendData(senderId, accepterId)
    if not aData or aData.status ~= "pending_in" then
        self.ctx:NotifyPlayer(accepterId, "error", "没有可接受的好友请求。")
        return
    end

    local now = GetTimestampSec()
    aData.status = "friend"
    aData.lastInteract = now
    sData.status = "friend"
    sData.lastInteract = now

    self:SyncFriendEntry(accepterId, senderId)
    self:SyncFriendEntry(senderId, accepterId)

    -- 通知
    self.ctx:NotifyPlayer(accepterId, "success", "已添加好友：" .. self.ctx:GetPlayerNickname(senderId))
    if self.ctx:IsOnline(senderId) then
        self.ctx:NotifyPlayer(senderId, "success", "" .. self.ctx:GetPlayerNickname(accepterId) .. " 接受了您的好友请求。")
    end
end

function Friend:HandleFriendReject(eventData)
    local connection = eventData["Connection"]
    local rejecterId = self.ctx:GetPlayerIdByConnection(connection)
    local senderId = eventData["SenderId"]:GetString()
    if not rejecterId or not senderId then return end

    local rData = self:GetFriendData(rejecterId, senderId)
    if not rData or rData.status ~= "pending_in" then
        self.ctx:NotifyPlayer(rejecterId, "error", "没有可拒绝的请求。")
        return
    end

    -- 删除记录
    self.friendships[rejecterId][senderId] = nil
    self.friendships[senderId][rejecterId] = nil

    self:SyncFriendListToPlayer(rejecterId)
    if self.ctx:IsOnline(senderId) then
        self:SyncFriendListToPlayer(senderId)
        self.ctx:NotifyPlayer(senderId, "info", self.ctx:GetPlayerNickname(rejecterId) .. " 拒绝了您的好友请求。")
    end

    self.ctx:NotifyPlayer(rejecterId, "info", "已拒绝好友请求。")
end

function Friend:HandleFriendRemove(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end

    local pf = self.friendships[playerId]
    if pf and pf[targetId] then
        pf[targetId] = nil
        self:SyncFriendListToPlayer(playerId)
    end
    local tf = self.friendships[targetId]
    if tf and tf[playerId] then
        tf[playerId] = nil
        if self.ctx:IsOnline(targetId) then
            self:SyncFriendListToPlayer(targetId)
        end
    end

    self.ctx:NotifyPlayer(playerId, "info", "已删除好友。")
    if self.ctx:IsOnline(targetId) then
        self.ctx:NotifyPlayer(targetId, "info", self.ctx:GetPlayerNickname(playerId) .. " 将您从好友列表移除。")
    end
end

function Friend:HandleFriendSetGroup(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local groupName = eventData["Group"]:GetString()
    if not playerId or not targetId or not groupName or #groupName == 0 then return end

    local data = self:GetFriendData(playerId, targetId)
    if data and data.status == "friend" then
        data.group = groupName
        self:AddDefaultGroupIfMissing(playerId, groupName)
        self:SyncFriendEntry(playerId, targetId)
    end
end

function Friend:HandleFriendSetNote(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local note = eventData["Note"]:GetString()
    if not playerId or not targetId then return end

    local data = self:GetFriendData(playerId, targetId)
    if data and data.status == "friend" then
        data.note = note or ""
        self:SyncFriendEntry(playerId, targetId)
    end
end

function Friend:HandleFriendInteract(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local delta = eventData["Delta"]:GetInt()
    if not playerId or not targetId then return end

    local data = self:GetFriendData(playerId, targetId)
    if data and data.status == "friend" then
        data.intimacy = (data.intimacy or 0) + delta
        data.lastInteract = GetTimestampSec()
        self:SyncFriendEntry(playerId, targetId)
    end
    local reverse = self:GetFriendData(targetId, playerId)
    if reverse and reverse.status == "friend" then
        reverse.intimacy = (reverse.intimacy or 0) + delta
        reverse.lastInteract = GetTimestampSec()
        if self.ctx:IsOnline(targetId) then
            self:SyncFriendEntry(targetId, playerId)
        end
    end
end

function Friend:HandleFriendBlock(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end

    if not self.blocks[playerId] then self.blocks[playerId] = {} end
    self.blocks[playerId][targetId] = true

    -- 拉黑后如果存在好友关系则删除
    local pf = self.friendships[playerId]
    if pf and pf[targetId] then
        pf[targetId] = nil
    end
    local tf = self.friendships[targetId]
    if tf and tf[playerId] then
        tf[playerId] = nil
    end

    self:SyncFriendListToPlayer(playerId)
    self.ctx:NotifyPlayer(playerId, "info", "已拉黑玩家。")
end

function Friend:HandleFriendUnblock(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not playerId or not targetId then return end
    local pb = self.blocks[playerId]
    if pb then
        pb[targetId] = nil
    end
    self:SyncFriendListToPlayer(playerId)
    self.ctx:NotifyPlayer(playerId, "info", "已解除拉黑。")
end

-- ----------------------------------------------------------------------------
-- 同步协议 (Server -> Client)
-- ----------------------------------------------------------------------------

function Friend:SyncFriendListToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    local pf = self.friendships[playerId] or {}
    local list = {}
    for fid, data in pairs(pf) do
        table.insert(list, {
            friendId = fid,
            nickname = self.ctx:GetPlayerNickname(fid),
            status = data.status,
            group = data.group,
            note = data.note,
            intimacy = data.intimacy or 0,
            addTime = data.addTime or 0,
            lastInteract = data.lastInteract or 0,
            online = self.ctx:IsOnline(fid),
            lastLogout = self.ctx.players[fid] and self.ctx.players[fid].lastLogout or 0
        })
    end

    -- 序列化为多个字段（为了兼容 VariantMap 而不使用复杂嵌套）
    -- 这里我们分片发送：每次最多 30 人
    local chunkSize = 30
    local total = #list
    local chunks = math.ceil(total / chunkSize)
    if chunks == 0 then
        local data = VariantMap()
        data["Total"] = 0
        data["Index"] = 0
        self.ctx:SendToPlayer(playerId, "FriendListSync", data)
        return
    end

    for i = 1, chunks do
        local data = VariantMap()
        data["Total"] = total
        data["Index"] = i
        local sub = {}
        local startIdx = (i - 1) * chunkSize + 1
        local endIdx = math.min(i * chunkSize, total)
        for j = startIdx, endIdx do
            table.insert(sub, list[j])
        end
        -- 将子列表序列化为字符串（简化版键值对），再反序列化回客户端
        -- 由于 VariantMap 不直接支持数组，这里我们通过 JSON-like 字符串传输
        data["Payload"] = SerializeLuaListToString(sub)
        self.ctx:SendToPlayer(playerId, "FriendListSync", data)
    end
end

function Friend:SyncFriendEntry(playerId, targetId)
    if not self.ctx:IsOnline(playerId) then return end
    local data = self:GetFriendData(playerId, targetId)
    if not data then
        -- 已删除，发送空标记
        local vm = VariantMap()
        vm["FriendId"] = targetId
        vm["Exists"] = false
        self.ctx:SendToPlayer(playerId, "FriendEntrySync", vm)
        return
    end
    local vm = VariantMap()
    vm["FriendId"] = targetId
    vm["Exists"] = true
    vm["Nickname"] = self.ctx:GetPlayerNickname(targetId)
    vm["Status"] = data.status
    vm["Group"] = data.group or "默认"
    vm["Note"] = data.note or ""
    vm["Intimacy"] = data.intimacy or 0
    vm["AddTime"] = data.addTime or 0
    vm["LastInteract"] = data.lastInteract or 0
    vm["Online"] = self.ctx:IsOnline(targetId)
    vm["LastLogout"] = self.ctx.players[targetId] and self.ctx.players[targetId].lastLogout or 0
    self.ctx:SendToPlayer(playerId, "FriendEntrySync", vm)
end

-- 客户端事件处理（供 UI 层接入）
function Friend:HandleFriendListSync(eventData)
    -- 客户端收到后可转发给 UI 管理器
    local total = eventData["Total"]:GetInt()
    local index = eventData["Index"]:GetInt()
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or ""
    print("[Friend] Client received friend list chunk " .. index .. "/" .. math.max(1, math.ceil(total / 30)) .. " payload size=" .. #payload)
    -- 这里可触发 UI 事件，例如：VariantMap()["FriendListUpdated"] ...
end

function Friend:HandleFriendNotify(eventData)
    local ntype = eventData["Type"]:GetString()
    local senderId = eventData["SenderId"] and eventData["SenderId"]:GetString() or ""
    local senderName = eventData["SenderName"] and eventData["SenderName"]:GetString() or ""
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    print("[Friend] Client notify: type=" .. ntype .. " from=" .. senderName .. " msg=" .. msg)
end

-- ----------------------------------------------------------------------------
-- 工具：将 Lua 列表序列化为等号分隔字符串
-- ----------------------------------------------------------------------------

function SerializeLuaListToString(list)
    -- 简易序列化: 每条记录用 | 分隔，字段用 ; 分隔
    -- 客户端应具备对应的反序列化逻辑
    local parts = {}
    for _, entry in ipairs(list) do
        local line = string.format("%s=%s=%s=%s=%s=%d=%d=%d=%s=%d",
            entry.friendId,
            entry.nickname or "",
            entry.status,
            entry.group or "默认",
            entry.note or "",
            entry.intimacy or 0,
            entry.addTime or 0,
            entry.lastInteract or 0,
            entry.online and "1" or "0",
            entry.lastLogout or 0
        )
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

return Friend
