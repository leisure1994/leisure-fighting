-- Chat.lua
-- ============================================================================
-- 聊天系统 (Chat System)
-- ============================================================================
-- 功能：
--   1. 世界频道 / 区域频道 / 公会频道 / 队伍频道 / 私聊
--   2. 聊天历史记录与分页查询
--   3. 发言频率限制 (CD) 与 敏感词过滤
--   4. 喇叭 / 公告 / 系统消息
--   5. 聊天室 / 频道订阅机制
--   6. 消息持久化到本地日志（可选）
-- ============================================================================

local Chat = {
    -- 玩家订阅的频道
    playerChannels = {},      -- [playerId] = { channelName = subTime, ... }
    -- 频道历史消息
    channelHistory = {},      -- [channelName] = { {senderId, senderName, text, time, type}, ... }
    -- 私聊会话历史
    privateHistory = {},      -- ["a|b"] = { messages } (按字典序拼接)
    -- 最后发言时间（用于CD）
    lastSpeakTime = {},       -- [playerId] = timestampMs
    -- 禁言列表
    mutedPlayers = {},        -- [playerId] = { until = timestamp, reason = string }
    -- GM / 管理员列表
    gmList = {},              -- [playerId] = gmLevel
    dbFileName = "ChatDB",
    ctx = nil
}

-- 频道配置
local CHANNEL_CONFIG = {
    world   = { maxHistory = 200, cdMs = 1000,  persist = true,  minLevel = 1,  broadcast = true },
    area    = { maxHistory = 100, cdMs = 1000,  persist = false, minLevel = 1,  broadcast = false },
    guild   = { maxHistory = 100, cdMs = 500,   persist = true,  minLevel = 1,  broadcast = false },
    party   = { maxHistory = 100, cdMs = 500,   persist = false, minLevel = 1,  broadcast = false },
    system  = { maxHistory = 50,  cdMs = 0,     persist = true,  minLevel = 999, broadcast = true },
    horn    = { maxHistory = 50,  cdMs = 10000, persist = true,  minLevel = 1,  broadcast = true },
    whisper = { maxHistory = 100, cdMs = 500,   persist = true,  minLevel = 1,  broadcast = false },
}

-- 简单的敏感词库（可外部扩展）
local BAD_WORDS = {
    "外挂", "作弊", "骗子", "木马", "病毒", "钓鱼", "盗号",
    "傻逼", "草泥马", "法轮功", "台独", "港独", "疆独"
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function Chat:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("ChatSendChannel")
        net:RegisterRemoteEvent("ChatSendWhisper")
        net:RegisterRemoteEvent("ChatJoinChannel")
        net:RegisterRemoteEvent("ChatLeaveChannel")
        net:RegisterRemoteEvent("ChatRequestHistory")
        net:RegisterRemoteEvent("ChatHorn")
        net:RegisterRemoteEvent("ChatMutePlayer")     -- GM指令
        net:RegisterRemoteEvent("ChatUnmutePlayer")   -- GM指令
        net:RegisterRemoteEvent("ChatAnnounce")       -- GM指令

        SubscribeToEvent("ChatSendChannel", function(et, ed) self:HandleChatSendChannel(ed) end)
        SubscribeToEvent("ChatSendWhisper", function(et, ed) self:HandleChatSendWhisper(ed) end)
        SubscribeToEvent("ChatJoinChannel", function(et, ed) self:HandleChatJoinChannel(ed) end)
        SubscribeToEvent("ChatLeaveChannel", function(et, ed) self:HandleChatLeaveChannel(ed) end)
        SubscribeToEvent("ChatRequestHistory", function(et, ed) self:HandleChatRequestHistory(ed) end)
        SubscribeToEvent("ChatHorn", function(et, ed) self:HandleChatHorn(ed) end)
        SubscribeToEvent("ChatMutePlayer", function(et, ed) self:HandleChatMutePlayer(ed) end)
        SubscribeToEvent("ChatUnmutePlayer", function(et, ed) self:HandleChatUnmutePlayer(ed) end)
        SubscribeToEvent("ChatAnnounce", function(et, ed) self:HandleChatAnnounce(ed) end)
    else
        SubscribeToEvent("ChatChannelMessage", function(et, ed) self:HandleChatChannelMessageClient(ed) end)
        SubscribeToEvent("ChatWhisper", function(et, ed) self:HandleChatWhisperClient(ed) end)
        SubscribeToEvent("ChatHorn", function(et, ed) self:HandleChatHornClient(ed) end)
        SubscribeToEvent("ChatAnnounce", function(et, ed) self:HandleChatAnnounceClient(ed) end)
        SubscribeToEvent("ChatHistorySync", function(et, ed) self:HandleChatHistorySync(ed) end)
        SubscribeToEvent("ChatMuted", function(et, ed) self:HandleChatMuted(ed) end)
    end
end

function Chat:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.playerChannels = data.playerChannels or {}
        self.channelHistory = data.channelHistory or {}
        self.privateHistory = data.privateHistory or {}
        self.mutedPlayers = data.mutedPlayers or {}
        self.gmList = data.gmList or {}
    end
    -- 保证 world / system 频道记录表存在
    if not self.channelHistory["world"] then self.channelHistory["world"] = {} end
    if not self.channelHistory["system"] then self.channelHistory["system"] = {} end
    if not self.channelHistory["horn"] then self.channelHistory["horn"] = {} end
end

function Chat:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        playerChannels = self.playerChannels,
        channelHistory = self.channelHistory,
        privateHistory = self.privateHistory,
        mutedPlayers = self.mutedPlayers,
        gmList = self.gmList
    })
end

-- ----------------------------------------------------------------------------
-- 玩家上下线
-- ----------------------------------------------------------------------------

function Chat:OnPlayerOnline(playerId)
    if not IsServer() then return end
    -- 自动加入世界频道和系统频道
    self:JoinChannel(playerId, "world")
    self:JoinChannel(playerId, "system")
    -- 如果有公会，自动加入公会频道；如果有队伍，自动加入队伍频道
    local guildMod = self.ctx:GetModule("Guild")
    if guildMod then
        local guildId = guildMod:GetGuildIdByPlayer(playerId)
        if guildId then
            self:JoinChannel(playerId, "guild:" .. guildId)
        end
    end
    local partyMod = self.ctx:GetModule("Party")
    if partyMod then
        local partyId = partyMod:GetPartyIdByPlayer(playerId)
        if partyId then
            self:JoinChannel(playerId, "party:" .. partyId)
        end
    end
    -- 发送历史记录（最近50条世界 + 最近20条系统）
    self:SendHistoryToPlayer(playerId, "world", 50)
    self:SendHistoryToPlayer(playerId, "system", 20)
end

function Chat:OnPlayerOffline(playerId)
    if not IsServer() then return end
    -- 清空该玩家的在线频道订阅（但保留持久化数据，如要长期订阅可不移除）
    local subs = self.playerChannels[playerId]
    if subs then
        -- 只保留 whisper 的会话记录，其他全部清除
        local newSubs = {}
        for ch, t in pairs(subs) do
            if ch:sub(1, 8) == "whisper:" then
                newSubs[ch] = t
            end
        end
        self.playerChannels[playerId] = newSubs
    end
end

-- ----------------------------------------------------------------------------
-- 频道管理
-- ----------------------------------------------------------------------------

function Chat:JoinChannel(playerId, channelName)
    if not self.playerChannels[playerId] then
        self.playerChannels[playerId] = {}
    end
    self.playerChannels[playerId][channelName] = GetTimestampSec()
end

function Chat:LeaveChannel(playerId, channelName)
    local subs = self.playerChannels[playerId]
    if subs then
        subs[channelName] = nil
    end
end

function Chat:IsSubscribed(playerId, channelName)
    local subs = self.playerChannels[playerId]
    return subs ~= nil and subs[channelName] ~= nil
end

function Chat:GetSubscribers(channelName)
    local list = {}
    for pid, subs in pairs(self.playerChannels) do
        if subs[channelName] and self.ctx:IsOnline(pid) then
            table.insert(list, pid)
        end
    end
    return list
end

-- ----------------------------------------------------------------------------
-- 禁言 / GM 检测
-- ----------------------------------------------------------------------------

function Chat:IsMuted(playerId)
    local info = self.mutedPlayers[playerId]
    if not info then return false end
    if GetTimestampSec() >= info.until then
        self.mutedPlayers[playerId] = nil
        return false
    end
    return true, info.reason, info.until
end

function Chat:IsGM(playerId)
    return self.gmList[playerId] ~= nil
end

function Chat:GetGMLevel(playerId)
    return self.gmList[playerId] or 0
end

function Chat:SetGM(playerId, level)
    self.gmList[playerId] = level
end

-- ----------------------------------------------------------------------------
-- 敏感词过滤
-- ----------------------------------------------------------------------------

function Chat:FilterText(text)
    local filtered = text
    for _, word in ipairs(BAD_WORDS) do
        local replacement = string.rep("*", #word)
        filtered = string.gsub(filtered, word, replacement)
    end
    return filtered
end

-- ----------------------------------------------------------------------------
-- 核心发送逻辑
-- ----------------------------------------------------------------------------

function Chat:SendChannelMessage(senderId, channelName, text, msgType)
    msgType = msgType or "text"
    if not text or #text == 0 then return false end

    local cfg = CHANNEL_CONFIG[channelName] or CHANNEL_CONFIG["world"]
    if cfg.broadcast and not self.ctx:IsOnline(senderId) and not self:IsGM(senderId) then
        return false
    end

    -- CD检查（非GM）
    if cfg.cdMs > 0 and not self:IsGM(senderId) then
        local last = self.lastSpeakTime[senderId] or 0
        local nowMs = GetTimestampSec() * 1000
        if nowMs - last < cfg.cdMs then
            self.ctx:NotifyPlayer(senderId, "error", "发言过于频繁，请稍后再试。")
            return false
        end
        self.lastSpeakTime[senderId] = nowMs
    end

    -- 禁言检查（非GM）
    if not self:IsGM(senderId) then
        local muted, reason, untilTime = self:IsMuted(senderId)
        if muted then
            local vm = VariantMap()
            vm["Reason"] = reason or "违规发言"
            vm["Until"] = untilTime or 0
            self.ctx:SendToPlayer(senderId, "ChatMuted", vm)
            return false
        end
    end

    -- 过滤
    local filteredText = self:FilterText(text)

    local senderName = self.ctx:GetPlayerNickname(senderId)
    local entry = {
        senderId = senderId,
        senderName = senderName,
        text = filteredText,
        time = GetTimestampSec(),
        type = msgType
    }

    -- 存入历史
    if cfg.persist then
        if not self.channelHistory[channelName] then
            self.channelHistory[channelName] = {}
        end
        table.insert(self.channelHistory[channelName], entry)
        if #self.channelHistory[channelName] > cfg.maxHistory then
            table.remove(self.channelHistory[channelName], 1)
        end
    end

    -- 构造广播包
    local vm = VariantMap()
    vm["Channel"] = channelName
    vm["SenderId"] = senderId
    vm["SenderName"] = senderName
    vm["Text"] = filteredText
    vm["Time"] = entry.time
    vm["Type"] = msgType

    -- 广播策略
    if channelName == "world" or channelName == "system" or channelName == "horn" then
        self.ctx:BroadcastRemoteEvent("ChatChannelMessage", vm)
    else
        local subs = self:GetSubscribers(channelName)
        self.ctx:BroadcastToPlayers(subs, "ChatChannelMessage", vm)
    end

    return true
end

function Chat:SendWhisper(senderId, targetId, text)
    if not senderId or not targetId or senderId == targetId then return false end
    if not text or #text == 0 then return false end

    local muted = self:IsMuted(senderId)
    if muted and not self:IsGM(senderId) then
        self.ctx:NotifyPlayer(senderId, "error", "您当前处于禁言状态。")
        return false
    end

    local friendMod = self.ctx:GetModule("Friend")
    if friendMod then
        -- 如果被对方拉黑，无法私聊
        if friendMod:IsBlocked(targetId, senderId) then
            self.ctx:NotifyPlayer(senderId, "error", "无法向对方发送私信。")
            return false
        end
    end

    local filteredText = self:FilterText(text)
    local sessionKey = self:MakePrivateSessionKey(senderId, targetId)
    if not self.privateHistory[sessionKey] then
        self.privateHistory[sessionKey] = {}
    end
    local entry = {
        senderId = senderId,
        senderName = self.ctx:GetPlayerNickname(senderId),
        text = filteredText,
        time = GetTimestampSec()
    }
    table.insert(self.privateHistory[sessionKey], entry)
    if #self.privateHistory[sessionKey] > 200 then
        table.remove(self.privateHistory[sessionKey], 1)
    end

    local vm = VariantMap()
    vm["SenderId"] = senderId
    vm["SenderName"] = entry.senderName
    vm["TargetId"] = targetId
    vm["Text"] = filteredText
    vm["Time"] = entry.time

    self.ctx:SendToPlayer(senderId, "ChatWhisper", vm)
    if self.ctx:IsOnline(targetId) then
        self.ctx:SendToPlayer(targetId, "ChatWhisper", vm)
    end
    return true
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

function Chat:SendAnnounce(text, durationSec)
    local vm = VariantMap()
    vm["Text"] = text
    vm["Duration"] = durationSec or 5
    self.ctx:BroadcastRemoteEvent("ChatAnnounce", vm)
end

function Chat:SendHorn(senderId, text)
    local muted = self:IsMuted(senderId)
    if muted and not self:IsGM(senderId) then
        self.ctx:NotifyPlayer(senderId, "error", "您当前处于禁言状态。")
        return false
    end
    local filteredText = self:FilterText(text)
    local vm = VariantMap()
    vm["SenderId"] = senderId
    vm["SenderName"] = self.ctx:GetPlayerNickname(senderId)
    vm["Text"] = filteredText
    vm["Time"] = GetTimestampSec()
    self.ctx:BroadcastRemoteEvent("ChatHorn", vm)

    -- 存入历史
    local entry = {
        senderId = senderId,
        senderName = vm["SenderName"],
        text = filteredText,
        time = vm["Time"],
        type = "horn"
    }
    if not self.channelHistory["horn"] then self.channelHistory["horn"] = {} end
    table.insert(self.channelHistory["horn"], entry)
    if #self.channelHistory["horn"] > CHANNEL_CONFIG.horn.maxHistory then
        table.remove(self.channelHistory["horn"], 1)
    end
    return true
end

function Chat:MakePrivateSessionKey(a, b)
    if a < b then return a .. "|" .. b end
    return b .. "|" .. a
end

-- ----------------------------------------------------------------------------
-- 历史记录查询与同步
-- ----------------------------------------------------------------------------

function Chat:SendHistoryToPlayer(playerId, channelName, limit, beforeTime)
    local history = self.channelHistory[channelName] or {}
    limit = limit or 50
    local result = {}
    for i = #history, 1, -1 do
        local entry = history[i]
        if not beforeTime or entry.time < beforeTime then
            table.insert(result, 1, entry)
            if #result >= limit then break end
        end
    end
    self:SyncHistoryToPlayer(playerId, channelName, result)
end

function Chat:SendPrivateHistoryToPlayer(playerId, targetId, limit)
    local sessionKey = self:MakePrivateSessionKey(playerId, targetId)
    local history = self.privateHistory[sessionKey] or {}
    limit = limit or 50
    local startIdx = math.max(1, #history - limit + 1)
    local result = {}
    for i = startIdx, #history do
        table.insert(result, history[i])
    end
    self:SyncHistoryToPlayer(playerId, "whisper:" .. targetId, result)
end

function Chat:SyncHistoryToPlayer(playerId, channelName, messages)
    if not self.ctx:IsOnline(playerId) then return end
    -- 分片发送，每次最多 20 条
    local chunkSize = 20
    local total = #messages
    local chunks = math.ceil(total / chunkSize)
    if chunks == 0 then
        local vm = VariantMap()
        vm["Channel"] = channelName
        vm["Total"] = 0
        vm["Index"] = 0
        self.ctx:SendToPlayer(playerId, "ChatHistorySync", vm)
        return
    end
    for i = 1, chunks do
        local vm = VariantMap()
        vm["Channel"] = channelName
        vm["Total"] = total
        vm["Index"] = i
        local sub = {}
        local startIdx = (i - 1) * chunkSize + 1
        local endIdx = math.min(i * chunkSize, total)
        for j = startIdx, endIdx do
            table.insert(sub, messages[j])
        end
        vm["Payload"] = self:SerializeMessageList(sub)
        self.ctx:SendToPlayer(playerId, "ChatHistorySync", vm)
    end
end

function Chat:SerializeMessageList(list)
    local parts = {}
    for _, m in ipairs(list) do
        local line = string.format("%s=%s=%s=%d=%s",
            m.senderId or "",
            m.senderName or "",
            m.text or "",
            m.time or 0,
            m.type or "text"
        )
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function Chat:HandleChatSendChannel(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local channel = eventData["Channel"]:GetString()
    local text = eventData["Text"]:GetString()
    local msgType = eventData["MsgType"] and eventData["MsgType"]:GetString() or "text"
    if not playerId or not channel or not text then return end

    -- 只允许发言自己订阅的频道（world/system除外，订阅会自动加入）
    if not self:IsSubscribed(playerId, channel) then
        self.ctx:NotifyPlayer(playerId, "error", "未加入该频道。")
        return
    end

    self:SendChannelMessage(playerId, channel, text, msgType)
end

function Chat:HandleChatSendWhisper(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local text = eventData["Text"]:GetString()
    if not playerId or not targetId or not text then return end
    self:SendWhisper(playerId, targetId, text)
end

function Chat:HandleChatJoinChannel(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local channel = eventData["Channel"]:GetString()
    if not playerId or not channel then return end
    self:JoinChannel(playerId, channel)
    self.ctx:NotifyPlayer(playerId, "info", "已加入频道: " .. channel)
end

function Chat:HandleChatLeaveChannel(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local channel = eventData["Channel"]:GetString()
    if not playerId or not channel then return end
    self:LeaveChannel(playerId, channel)
    self.ctx:NotifyPlayer(playerId, "info", "已离开频道: " .. channel)
end

function Chat:HandleChatRequestHistory(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local channel = eventData["Channel"]:GetString()
    local limit = eventData["Limit"] and eventData["Limit"]:GetInt() or 50
    local beforeTime = eventData["BeforeTime"] and eventData["BeforeTime"]:GetInt() or nil
    if not playerId or not channel then return end

    if channel:sub(1, 8) == "whisper:" then
        local targetId = channel:sub(9)
        self:SendPrivateHistoryToPlayer(playerId, targetId, limit)
    else
        self:SendHistoryToPlayer(playerId, channel, limit, beforeTime)
    end
end

function Chat:HandleChatHorn(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local text = eventData["Text"]:GetString()
    if not playerId or not text then return end
    self:SendHorn(playerId, text)
end

function Chat:HandleChatMutePlayer(eventData)
    local connection = eventData["Connection"]
    local gmId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local durationSec = eventData["Duration"]:GetInt()
    local reason = eventData["Reason"]:GetString()
    if not gmId or not targetId then return end
    if self:GetGMLevel(gmId) < 1 then
        self.ctx:NotifyPlayer(gmId, "error", "权限不足。")
        return
    end
    self.mutedPlayers[targetId] = {
        until = GetTimestampSec() + durationSec,
        reason = reason or "违规发言",
        operator = gmId
    }
    self.ctx:NotifyPlayer(gmId, "success", "已对玩家 " .. targetId .. " 禁言 " .. durationSec .. " 秒。")
    if self.ctx:IsOnline(targetId) then
        self.ctx:NotifyPlayer(targetId, "error", "您已被禁言，原因：" .. (reason or "违规发言"))
    end
end

function Chat:HandleChatUnmutePlayer(eventData)
    local connection = eventData["Connection"]
    local gmId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    if not gmId or not targetId then return end
    if self:GetGMLevel(gmId) < 1 then
        self.ctx:NotifyPlayer(gmId, "error", "权限不足。")
        return
    end
    self.mutedPlayers[targetId] = nil
    self.ctx:NotifyPlayer(gmId, "success", "已解除对玩家 " .. targetId .. " 的禁言。")
    if self.ctx:IsOnline(targetId) then
        self.ctx:NotifyPlayer(targetId, "info", "您的禁言已解除。")
    end
end

function Chat:HandleChatAnnounce(eventData)
    local connection = eventData["Connection"]
    local gmId = self.ctx:GetPlayerIdByConnection(connection)
    local text = eventData["Text"]:GetString()
    local duration = eventData["Duration"] and eventData["Duration"]:GetInt() or 5
    if not gmId or not text then return end
    if self:GetGMLevel(gmId) < 1 then
        self.ctx:NotifyPlayer(gmId, "error", "权限不足。")
        return
    end
    self:SendAnnounce(text, duration)
end

-- ----------------------------------------------------------------------------
-- 客户端事件处理（供 UI 接入）
-- ----------------------------------------------------------------------------

function Chat:HandleChatChannelMessageClient(eventData)
    local channel = eventData["Channel"]:GetString()
    local sender = eventData["SenderName"]:GetString()
    local text = eventData["Text"]:GetString()
    print("[Chat] [" .. channel .. "] " .. sender .. ": " .. text)
end

function Chat:HandleChatWhisperClient(eventData)
    local sender = eventData["SenderName"]:GetString()
    local text = eventData["Text"]:GetString()
    print("[Chat] [Whisper] " .. sender .. " -> 您: " .. text)
end

function Chat:HandleChatHornClient(eventData)
    local sender = eventData["SenderName"]:GetString()
    local text = eventData["Text"]:GetString()
    print("[Chat] [Horn] " .. sender .. ": " .. text)
end

function Chat:HandleChatAnnounceClient(eventData)
    local text = eventData["Text"]:GetString()
    local duration = eventData["Duration"]:GetInt()
    print("[Chat] [Announce] " .. text .. " (duration=" .. duration .. "s)")
end

function Chat:HandleChatHistorySync(eventData)
    local channel = eventData["Channel"]:GetString()
    local total = eventData["Total"]:GetInt()
    local index = eventData["Index"]:GetInt()
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or ""
    print("[Chat] HistorySync channel=" .. channel .. " chunk=" .. index .. "/" .. math.max(1, math.ceil(total / 20)) .. " payload=" .. #payload)
end

function Chat:HandleChatMuted(eventData)
    local reason = eventData["Reason"]:GetString()
    local untilTime = eventData["Until"]:GetInt()
    print("[Chat] 您已被禁言。原因：" .. reason .. " 解禁时间：" .. untilTime)
end

-- ----------------------------------------------------------------------------
-- 供外部调用的便捷接口
-- ----------------------------------------------------------------------------

function Chat:SendGuildMessage(guildId, senderId, text)
    if not guildId or not senderId or not text then return false end
    return self:SendChannelMessage(senderId, "guild:" .. guildId, text, "text")
end

function Chat:SendPartyMessage(partyId, senderId, text)
    if not partyId or not senderId or not text then return false end
    return self:SendChannelMessage(senderId, "party:" .. partyId, text, "text")
end

function Chat:BroadcastSystem(text)
    self:SendSystemMessage(text, nil)
end

return Chat
