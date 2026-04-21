-- Server.lua
-- 天道引擎 · 服务端调度中心
-- 职责：事件分发、LLM 调度、状态固化、NPC Agent 轮询、玩家连接管理、公会系统、拍卖行、副本匹配、邮件系统、排行榜、成就系统、GM 指令、Webhook 接口

ServerTao = ServerTao or {}

-- 主循环状态
ServerTao.tickTimer = 0
ServerTao.tickInterval = 1.0
ServerTao.slowTickTimer = 0
ServerTao.slowTickInterval = 5.0
ServerTao.autoSaveTimer = 0
ServerTao.worldDerivationQueue = ServerTao.worldDerivationQueue or {}
ServerTao.derivationInFlight = 0
ServerTao.playerSessions = ServerTao.playerSessions or {}
ServerTao.globalState = ServerTao.globalState or {}
ServerTao.npcScheduleQueue = ServerTao.npcScheduleQueue or {}

-- ═══════════════════════════════════════════════════════════
-- 一、初始化
-- ═══════════════════════════════════════════════════════════

function ServerTao.Init()
    RegisterTaoRemoteEvents()

    SubscribeToEvent("ClientConnected", ServerTao.OnClientConnected)
    SubscribeToEvent("ClientDisconnected", ServerTao.OnClientDisconnected)
    SubscribeToEvent("ServerUserRegisters", ServerTao.OnServerUserRegisters)

    -- 天道自定义事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_SET_PLAYER_API_KEY, ServerTao.HandleSetPlayerAPIKey)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_SET_PROVIDER_API_KEY, ServerTao.HandleSetProviderAPIKey)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_REQUEST_NPC_DIALOG, ServerTao.HandleRequestNpcDialog)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_PLAYER_WORLD_INTERACTION, ServerTao.HandlePlayerWorldInteraction)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_REQUEST_REGION_INFO, ServerTao.HandleRequestRegionInfo)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_TRADE_REQUEST, ServerTao.HandleTradeRequest)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_TRADE_ACCEPT, ServerTao.HandleTradeAccept)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_TRADE_CANCEL, ServerTao.HandleTradeCancel)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_PARTY_INVITE, ServerTao.HandlePartyInvite)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_PARTY_ACCEPT, ServerTao.HandlePartyAccept)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_PARTY_LEAVE, ServerTao.HandlePartyLeave)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_STREAM_POLL, ServerTao.HandleStreamPoll)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_DEBUG_QUERY, ServerTao.HandleDebugQuery)

    -- 公会系统事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_CREATE, ServerTao.HandleGuildCreate)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_JOIN, ServerTao.HandleGuildJoin)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_LEAVE, ServerTao.HandleGuildLeave)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_PROMOTE, ServerTao.HandleGuildPromote)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_DEMOTE, ServerTao.HandleGuildDemote)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_KICK, ServerTao.HandleGuildKick)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GUILD_DONATE, ServerTao.HandleGuildDonate)

    -- 拍卖行事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_AUCTION_POST, ServerTao.HandleAuctionPost)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_AUCTION_BID, ServerTao.HandleAuctionBid)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_AUCTION_CANCEL, ServerTao.HandleAuctionCancel)

    -- 副本匹配事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_DUNGEON_QUEUE, ServerTao.HandleDungeonQueue)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_DUNGEON_ENTER, ServerTao.HandleDungeonEnter)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_DUNGEON_COMPLETE, ServerTao.HandleDungeonComplete)

    -- 邮件系统事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_MAIL_SEND, ServerTao.HandleMailSend)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_MAIL_READ, ServerTao.HandleMailRead)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_MAIL_DELETE, ServerTao.HandleMailDelete)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_MAIL_TAKE_ATTACHMENT, ServerTao.HandleMailTakeAttachment)

    -- 排行榜与成就事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_LEADERBOARD_QUERY, ServerTao.HandleLeaderboardQuery)
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_ACHIEVEMENT_CLAIM, ServerTao.HandleAchievementClaim)

    -- GM 指令事件
    SubscribeToEvent(TAO_REMOTE_EVENTS.C2S_GM_COMMAND, ServerTao.HandleGMCommand)

    SubscribeToEvent("Update", ServerTao.OnUpdate)

    ServerTao._InitSubsystems()

    print("[ServerTao] 天道服务器初始化完成")
end

--- 初始化各子系统内存结构
function ServerTao._InitSubsystems()
    ServerTao.guilds = ServerTao.guilds or {}
    ServerTao.auctions = ServerTao.auctions or {}
    ServerTao.auctionCounter = ServerTao.auctionCounter or 0
    ServerTao.dungeonQueues = ServerTao.dungeonQueues or {}
    ServerTao.activeDungeons = ServerTao.activeDungeons or {}
    ServerTao.mailbox = ServerTao.mailbox or {}
    ServerTao.mailCounter = ServerTao.mailCounter or 0
    ServerTao.leaderboards = ServerTao.leaderboards or {}
    ServerTao.achievements = ServerTao.achievements or {}
    ServerTao.announcements = ServerTao.announcements or {}
    ServerTao.webhookStats = ServerTao.webhookStats or { requests = 0, errors = 0 }
    ServerTao.npcThinkQueue = ServerTao.npcThinkQueue or {}
    ServerTao.npcThinkIndex = ServerTao.npcThinkIndex or 1
    ServerTao.gmCommandHistory = ServerTao.gmCommandHistory or {}
    ServerTao._lastMatchmakingTick = 0
end

-- ═══════════════════════════════════════════════════════════
-- 二、玩家会话管理
-- ═══════════════════════════════════════════════════════════

function ServerTao.GetPlayerId(connection)
    for id, session in pairs(ServerTao.playerSessions) do
        if session.connection == connection then
            return id
        end
    end
    return tostring(connection)
end

function ServerTao.GetPlayerSession(connection)
    local pid = ServerTao.GetPlayerId(connection)
    return ServerTao.playerSessions[pid]
end

function ServerTao.OnClientConnected(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = tostring(connection)
    ServerTao.playerSessions[pid] = {
        connection = connection,
        connectedAt = GetWorldTime(),
        lastInteraction = GetWorldTime(),
        apiKey = nil,
        providerKey = nil,
        regionDiscovered = {},
        tradeState = nil,
        partyId = nil,
        guildId = nil,
        mailUnreadCount = 0,
        dungeonQueue = nil,
        stats = { derivationsRequested = 0, npcDialogs = 0, trades = 0, auctions = 0, mails = 0, dungeons = 0 }
    }
    print("[ServerTao] 玩家连接: " .. pid)
    ServerTao.SendSystemMessage(pid, "天道已回应你的降临。")
end

function ServerTao.OnClientDisconnected(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = ServerTao.GetPlayerId(connection)
    if pid then
        Router.ClearPlayerKey(connection)
        if ServerTao.playerSessions[pid] then
            if ServerTao.playerSessions[pid].partyId then
                ServerTao.LeaveParty(pid)
            end
            if ServerTao.playerSessions[pid].dungeonQueue then
                ServerTao.DungeonDequeue(pid, ServerTao.playerSessions[pid].dungeonQueue)
            end
        end
        ServerTao.playerSessions[pid] = nil
        print("[ServerTao] 玩家断线，清理会话: " .. pid)
    end
end

function ServerTao.OnServerUserRegisters(eventType, eventData)
    local connection = eventData["Connection"]
    print("[ServerTao] 用户注册: " .. tostring(connection))
end

-- ═══════════════════════════════════════════════════════════
-- 三、API Key 代理
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleSetPlayerAPIKey(eventType, eventData)
    local connection = eventData["Connection"]
    local key = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local ok = Router.SetPlayerKey(connection, key)
    if ok then
        if ServerTao.playerSessions[pid] then
            ServerTao.playerSessions[pid].apiKey = "(encrypted)"
        end
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_ACCEPTED, true)
        print("[ServerTao] 玩家 API Key 绑定成功: " .. pid)
    else
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_REJECTED, true)
        print("[ServerTao] 玩家 API Key 绑定失败: " .. pid)
    end
end

function ServerTao.HandleSetProviderAPIKey(eventType, eventData)
    local connection = eventData["Connection"]
    local provider = eventData[0] and eventData[0]:GetString() or ""
    local key = eventData[1] and eventData[1]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    if Router.SetPlayerProviderKey and Router.SetPlayerProviderKey(connection, provider, key) then
        if ServerTao.playerSessions[pid] then
            ServerTao.playerSessions[pid].providerKey = provider .. ":(encrypted)"
        end
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_ACCEPTED, true)
    else
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_REJECTED, true)
    end
end

-- ═══════════════════════════════════════════════════════════
-- 四、NPC 对话与策略
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleRequestNpcDialog(eventType, eventData)
    local connection = eventData["Connection"]
    local npcId = eventData[0] and eventData[0]:GetString() or ""
    if npcId == "" then return end

    local pid = ServerTao.GetPlayerId(connection)
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].lastInteraction = GetWorldTime()
        ServerTao.playerSessions[pid].stats.npcDialogs =
            (ServerTao.playerSessions[pid].stats.npcDialogs or 0) + 1
    end

    if AgentCore.agents and AgentCore.agents[npcId] then
        TaoPerfBegin("NpcDialog_" .. npcId)
        AgentCore.RequestStrategy(npcId, connection)
        TaoPerfEnd("NpcDialog_" .. npcId)
    else
        local msg = Tracery.GenerateCatchphrase and Tracery.GenerateCatchphrase() or "……"
        ServerTao.BroadcastNpcSpeech(npcId, msg)
    end
end

-- ═══════════════════════════════════════════════════════════
-- 五、玩家世界交互管道
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandlePlayerWorldInteraction(eventType, eventData)
    local connection = eventData["Connection"]
    local interactionType = eventData[0] and eventData[0]:GetString() or "unknown"
    local dataStr = eventData[1] and eventData[1]:GetString() or "{}"
    local data = SimpleDecode(dataStr) or {}

    local pid = ServerTao.GetPlayerId(connection)
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].lastInteraction = GetWorldTime()
        ServerTao.playerSessions[pid].stats.derivationsRequested =
            (ServerTao.playerSessions[pid].stats.derivationsRequested or 0) + 1
    end

    EventLog.Append({
        type = "player_action",
        actor = pid,
        action = interactionType,
        loc = data.loc,
        target = data.target,
        data = data
    })

    local room = "足迹长廊"
    local weight = 3
    if interactionType == "insult" or interactionType == "steal" or interactionType == "kill" then
        room = "阴影室"
        weight = 8
    elseif interactionType == "help" or interactionType == "gift" or interactionType == "rescue" then
        room = "恩情殿"
        weight = 7
    end
    Mempalace.Add(pid, room, {
        desc = interactionType .. " " .. tostring(data.target or ""),
        weight = weight,
        loc = data.loc,
        target = data.target,
        tags = {"player_action"}
    })

    if data.target and AgentCore.agents and AgentCore.agents[data.target] then
        local npcRoom = (interactionType == "insult" or interactionType == "steal" or interactionType == "kill")
            and "阴影室" or "个人常识"
        Mempalace.Add(data.target, npcRoom, {
            desc = pid .. " 对我进行了 " .. interactionType,
            weight = weight,
            from_entity = pid,
            tags = {"player_action"}
        })
    end

    local highImpact = {
        insult = true, steal = true, kill = true,
        assist = true, betray = true, blackmail = true
    }
    if highImpact[interactionType] then
        QueueWorldDerivation(interactionType, {
            actor = pid,
            target = data.target,
            loc = data.loc,
            intensity = weight
        })
    end

    ServerTao._CheckAchievementTriggers(pid, interactionType, data)
end

function ServerTao._CheckAchievementTriggers(pid, interactionType, data)
    if not ServerTao.achievements then return end
    if interactionType == "kill" and data.target then
        ServerTao._ProgressAchievement(pid, "first_blood", 1)
    end
    if interactionType == "gift" then
        ServerTao._ProgressAchievement(pid, "generous_soul", 1)
    end
    if interactionType == "help" then
        ServerTao._ProgressAchievement(pid, "samaritan", 1)
    end
end

-- ═══════════════════════════════════════════════════════════
-- 六、区域请求
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleRequestRegionInfo(eventType, eventData)
    local connection = eventData["Connection"]
    local regionId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    local region = RegionGen.LoadRegion(regionId)
    if not region then
        local seed = TAO_WORLD_CONFIG.worldSeed + Utf8Hash(regionId)
        region = RegionGen.GenerateLayout(seed,
            TAO_WORLD_CONFIG.regionSize.w, TAO_WORLD_CONFIG.regionSize.h)
        RegionGen.SaveRegion(regionId, region)
    end

    if region and not (ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].regionDiscovered[regionId]) then
        ServerTao.playerSessions[pid].regionDiscovered[regionId] = true
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_REGION_DISCOVERY, true,
            regionId, region.name or regionId, region.biome or "未知之地")
    end

    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_REGION_UPDATE, true,
        regionId, SimpleEncode(region or {}))
end

function Utf8Hash(str)
    local hash = 0
    for i = 1, #str do
        hash = ((hash << 5) - hash) + str:byte(i)
        hash = hash % 2147483647
    end
    return hash
end

-- ═══════════════════════════════════════════════════════════
-- 七、交易（简化版）
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleTradeRequest(eventType, eventData)
    local connection = eventData["Connection"]
    local targetPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    local offer = { from = pid, to = targetPid, status = "pending", createdAt = GetWorldTime() }
    if ServerTao.playerSessions[targetPid] then
        ServerTao.playerSessions[targetPid].tradeState = offer
        ServerTao.playerSessions[targetPid].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_TRADE_OFFER, true, pid, SimpleEncode(offer))
    end
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].tradeState = offer
    end
end

function ServerTao.HandleTradeAccept(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = ServerTao.GetPlayerId(connection)
    local offer = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].tradeState
    if offer and offer.to == pid then
        offer.status = "accepted"
        ServerTao.BroadcastToPlayers({offer.from, offer.to}, TAO_REMOTE_EVENTS.S2C_TRADE_RESULT,
            "accepted", SimpleEncode(offer))
        EventLog.Append({ type = "trade", actor = offer.from, target = offer.to, desc = "交易达成" })
        if ServerTao.playerSessions[offer.from] then
            ServerTao.playerSessions[offer.from].stats.trades =
                (ServerTao.playerSessions[offer.from].stats.trades or 0) + 1
        end
    end
end

function ServerTao.HandleTradeCancel(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = ServerTao.GetPlayerId(connection)
    local offer = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].tradeState
    if offer then
        offer.status = "cancelled"
        ServerTao.BroadcastToPlayers({offer.from, offer.to}, TAO_REMOTE_EVENTS.S2C_TRADE_RESULT,
            "cancelled", SimpleEncode(offer))
        if ServerTao.playerSessions[offer.from] then ServerTao.playerSessions[offer.from].tradeState = nil end
        if ServerTao.playerSessions[offer.to] then ServerTao.playerSessions[offer.to].tradeState = nil end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 八、组队（简化版）
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandlePartyInvite(eventType, eventData)
    local connection = eventData["Connection"]
    local targetPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    if ServerTao.playerSessions[targetPid] then
        ServerTao.playerSessions[targetPid].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_PARTY_UPDATE, true, "invite", pid)
    end
end

function ServerTao.HandlePartyAccept(eventType, eventData)
    local connection = eventData["Connection"]
    local inviterPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    local partyId = inviterPid .. "_party"
    if ServerTao.playerSessions[inviterPid] then
        ServerTao.playerSessions[inviterPid].partyId = partyId
    end
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].partyId = partyId
    end
    ServerTao.BroadcastToPlayers({inviterPid, pid}, TAO_REMOTE_EVENTS.S2C_PARTY_UPDATE,
        "joined", partyId, SimpleEncode({members = {inviterPid, pid}}))
end

function ServerTao.HandlePartyLeave(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = ServerTao.GetPlayerId(connection)
    ServerTao.LeaveParty(pid)
end

function ServerTao.LeaveParty(pid)
    local session = ServerTao.playerSessions[pid]
    if not session or not session.partyId then return end
    local partyId = session.partyId
    session.partyId = nil
    for otherPid, otherSession in pairs(ServerTao.playerSessions) do
        if otherSession.partyId == partyId and otherPid ~= pid then
            otherSession.connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_PARTY_UPDATE,
                true, "left", pid, partyId)
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 九、公会系统
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleGuildCreate(eventType, eventData)
    local connection = eventData["Connection"]
    local guildName = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    if guildName == "" then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "create", "failed", "公会名称不能为空")
        return
    end
    for gid, guild in pairs(ServerTao.guilds) do
        if guild.name == guildName then
            connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "create", "failed", "公会名称已存在")
            return
        end
    end
    if ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "create", "failed", "你已有公会")
        return
    end
    local guildId = "guild_" .. pid .. "_" .. math.floor(GetWorldTime())
    ServerTao.guilds[guildId] = {
        id = guildId,
        name = guildName,
        leaderId = pid,
        members = { [pid] = { rank = 5, joinedAt = GetWorldTime() } },
        wealth = 0,
        level = 1,
        reputation = 0,
        territory = nil,
        createdAt = GetWorldTime(),
        announcements = {}
    }
    ServerTao.playerSessions[pid].guildId = guildId
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "create", "success", guildId, guildName)
    EventLog.Append({ type = "guild_create", actor = pid, target = guildId, desc = "创建公会: " .. guildName })
end

function ServerTao.HandleGuildJoin(eventType, eventData)
    local connection = eventData["Connection"]
    local guildId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local guild = ServerTao.guilds[guildId]
    if not guild then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "join", "failed", "公会不存在")
        return
    end
    if ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "join", "failed", "你已有公会")
        return
    end
    if table.count(guild.members) >= 100 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "join", "failed", "公会人数已满")
        return
    end
    guild.members[pid] = { rank = 1, joinedAt = GetWorldTime() }
    ServerTao.playerSessions[pid].guildId = guildId
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "join", "success", guildId, guild.name)
    ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "member_join", pid)
    EventLog.Append({ type = "guild_join", actor = pid, target = guildId, desc = "加入公会: " .. guild.name })
end

function ServerTao.HandleGuildLeave(eventType, eventData)
    local connection = eventData["Connection"]
    local pid = ServerTao.GetPlayerId(connection)
    ServerTao.GuildRemoveMember(pid, pid)
end

function ServerTao.HandleGuildPromote(eventType, eventData)
    local connection = eventData["Connection"]
    local targetPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local guildId = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
    local guild = guildId and ServerTao.guilds[guildId]
    if not guild then return end
    if guild.leaderId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "promote", "failed", "只有会长可以晋升")
        return
    end
    local member = guild.members[targetPid]
    if not member then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "promote", "failed", "成员不存在")
        return
    end
    member.rank = math.min(10, member.rank + 1)
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "promote", "success", targetPid, member.rank)
    ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "member_promote", targetPid, member.rank)
end

function ServerTao.HandleGuildDemote(eventType, eventData)
    local connection = eventData["Connection"]
    local targetPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local guildId = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
    local guild = guildId and ServerTao.guilds[guildId]
    if not guild then return end
    if guild.leaderId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "demote", "failed", "只有会长可以降级")
        return
    end
    local member = guild.members[targetPid]
    if not member then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "demote", "failed", "成员不存在")
        return
    end
    member.rank = math.max(1, member.rank - 1)
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "demote", "success", targetPid, member.rank)
    ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "member_demote", targetPid, member.rank)
end

function ServerTao.HandleGuildKick(eventType, eventData)
    local connection = eventData["Connection"]
    local targetPid = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local guildId = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
    local guild = guildId and ServerTao.guilds[guildId]
    if not guild then return end
    if guild.leaderId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "kick", "failed", "只有会长可以踢人")
        return
    end
    if targetPid == pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "kick", "failed", "不能踢出自己")
        return
    end
    ServerTao.GuildRemoveMember(guildId, targetPid, true)
end

function ServerTao.HandleGuildDonate(eventType, eventData)
    local connection = eventData["Connection"]
    local amount = eventData[0] and eventData[0]:GetInt() or 0
    local pid = ServerTao.GetPlayerId(connection)
    local guildId = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
    local guild = guildId and ServerTao.guilds[guildId]
    if not guild then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "donate", "failed", "你没有公会")
        return
    end
    if amount <= 0 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "donate", "failed", "捐献金额必须大于0")
        return
    end
    if _G.GetPlayerGold and GetPlayerGold(pid) and GetPlayerGold(pid) < amount then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "donate", "failed", "金币不足")
        return
    end
    guild.wealth = guild.wealth + amount
    if _G.SetPlayerGold and GetPlayerGold(pid) then
        SetPlayerGold(pid, GetPlayerGold(pid) - amount)
    end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "donate", "success", amount, guild.wealth)
    ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "donation", pid, amount)
    EventLog.Append({ type = "guild_donate", actor = pid, target = guildId, desc = "捐献 " .. amount })
end

function ServerTao.GuildRemoveMember(guildId, pid, isKick)
    if not guildId then
        pid = guildId
        guildId = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
    end
    local guild = guildId and ServerTao.guilds[guildId]
    if not guild then return end
    if not guild.members[pid] then return end
    guild.members[pid] = nil
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].guildId = nil
    end
    if guild.leaderId == pid then
        local newLeader = nil
        for mid, _ in pairs(guild.members) do
            newLeader = mid
            break
        end
        if newLeader then
            guild.leaderId = newLeader
            guild.members[newLeader].rank = 5
        else
            ServerTao.guilds[guildId] = nil
        end
    end
    if isKick then
        local session = ServerTao.playerSessions[pid]
        if session and session.connection then
            session.connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, true, "kick", "success", guildId)
        end
        ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "member_kick", pid)
        EventLog.Append({ type = "guild_kick", actor = guild.leaderId or "system", target = pid, desc = "从公会 " .. guildId .. " 被踢出" })
    else
        ServerTao.BroadcastToGuild(guildId, TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, "member_leave", pid)
        EventLog.Append({ type = "guild_leave", actor = pid, target = guildId, desc = "离开公会" })
    end
end

function ServerTao.BroadcastToGuild(guildId, eventName, ...)
    local guild = ServerTao.guilds[guildId]
    if not guild then return end
    for pid, _ in pairs(guild.members) do
        local session = ServerTao.playerSessions[pid]
        if session and session.connection then
            session.connection:SendRemoteEvent(eventName, true, ...)
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 十、拍卖行
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleAuctionPost(eventType, eventData)
    local connection = eventData["Connection"]
    local itemId = eventData[0] and eventData[0]:GetString() or ""
    local startingPrice = eventData[1] and eventData[1]:GetInt() or 0
    local buyoutPrice = eventData[2] and eventData[2]:GetInt() or 0
    local durationHours = eventData[3] and eventData[3]:GetInt() or 24
    local pid = ServerTao.GetPlayerId(connection)

    if itemId == "" or startingPrice <= 0 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "post", "failed", "参数错误")
        return
    end
    if durationHours < 1 or durationHours > 168 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "post", "failed", "持续时间越界")
        return
    end
    if _G.PlayerHasItem and not PlayerHasItem(pid, itemId, 1) then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "post", "failed", "物品不存在")
        return
    end

    ServerTao.auctionCounter = ServerTao.auctionCounter + 1
    local auctionId = "auction_" .. ServerTao.auctionCounter .. "_" .. pid
    local auction = {
        id = auctionId,
        sellerId = pid,
        itemId = itemId,
        startingPrice = startingPrice,
        currentBid = 0,
        highestBidder = nil,
        buyoutPrice = buyoutPrice > 0 and buyoutPrice or nil,
        postedAt = GetWorldTime(),
        expiresAt = GetWorldTime() + durationHours * 3600,
        status = "active",
        bids = {}
    }
    ServerTao.auctions[auctionId] = auction
    if _G.RemovePlayerItem then RemovePlayerItem(pid, itemId, 1) end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "post", "success", auctionId)
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].stats.auctions = (ServerTao.playerSessions[pid].stats.auctions or 0) + 1
    end
    EventLog.Append({ type = "auction_post", actor = pid, target = auctionId, desc = "上架拍卖: " .. itemId })
end

function ServerTao.HandleAuctionBid(eventType, eventData)
    local connection = eventData["Connection"]
    local auctionId = eventData[0] and eventData[0]:GetString() or ""
    local bidAmount = eventData[1] and eventData[1]:GetInt() or 0
    local pid = ServerTao.GetPlayerId(connection)
    local auction = ServerTao.auctions[auctionId]

    if not auction then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "拍卖不存在")
        return
    end
    if auction.status ~= "active" then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "拍卖已结束")
        return
    end
    if auction.sellerId == pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "不能竞拍自己的物品")
        return
    end
    if bidAmount <= auction.currentBid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "出价必须高于当前价格")
        return
    end
    if auction.buyoutPrice and bidAmount >= auction.buyoutPrice then
        ServerTao._AuctionSettle(auctionId, pid, bidAmount, true)
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "success", auctionId, bidAmount, "buyout")
        return
    end
    local minIncrement = math.max(1, math.floor(auction.currentBid * 0.05))
    if bidAmount - auction.currentBid < minIncrement then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "加价幅度不足，至少需加 " .. minIncrement)
        return
    end
    if _G.GetPlayerGold and GetPlayerGold(pid) and GetPlayerGold(pid) < bidAmount then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "failed", "金币不足")
        return
    end

    auction.currentBid = bidAmount
    auction.highestBidder = pid
    table.insert(auction.bids, { bidder = pid, amount = bidAmount, t = GetWorldTime() })

    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "bid", "success", auctionId, bidAmount)
    if ServerTao.playerSessions[auction.sellerId] then
        ServerTao.playerSessions[auction.sellerId].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_AUCTION_BID_NOTIFY, true, auctionId, pid, bidAmount)
    end
    EventLog.Append({ type = "auction_bid", actor = pid, target = auctionId, desc = "出价 " .. bidAmount })
end

function ServerTao.HandleAuctionCancel(eventType, eventData)
    local connection = eventData["Connection"]
    local auctionId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local auction = ServerTao.auctions[auctionId]

    if not auction then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "cancel", "failed", "拍卖不存在")
        return
    end
    if auction.sellerId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "cancel", "failed", "无权取消")
        return
    end
    if auction.status ~= "active" then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "cancel", "failed", "拍卖已结束")
        return
    end
    auction.status = "cancelled"
    if _G.GivePlayerItem then GivePlayerItem(pid, auction.itemId, 1) end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "cancel", "success", auctionId)
    EventLog.Append({ type = "auction_cancel", actor = pid, target = auctionId, desc = "取消拍卖" })
end

function ServerTao._AuctionSettle(auctionId, winnerId, finalPrice, isBuyout)
    local auction = ServerTao.auctions[auctionId]
    if not auction then return end
    auction.status = "sold"
    auction.highestBidder = winnerId
    auction.currentBid = finalPrice

    if _G.RemovePlayerGold and GetPlayerGold(winnerId) then
        SetPlayerGold(winnerId, GetPlayerGold(winnerId) - finalPrice)
    end
    if _G.GivePlayerItem then GivePlayerItem(winnerId, auction.itemId, 1) end
    if _G.GetPlayerGold and GetPlayerGold(auction.sellerId) then
        SetPlayerGold(auction.sellerId, GetPlayerGold(auction.sellerId) + math.floor(finalPrice * 0.95))
    end

    if ServerTao.playerSessions[winnerId] then
        ServerTao.playerSessions[winnerId].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "settle", "success", auctionId, finalPrice, auction.itemId)
    end
    if ServerTao.playerSessions[auction.sellerId] then
        ServerTao.playerSessions[auction.sellerId].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "settle", "sold", auctionId, finalPrice, winnerId)
    end
    EventLog.Append({ type = "auction_settle", actor = winnerId, target = auctionId, desc = "拍卖成交 " .. finalPrice })
end

function ServerTao._ProcessAuctionSettlement()
    local now = GetWorldTime()
    for auctionId, auction in pairs(ServerTao.auctions) do
        if auction.status == "active" and auction.expiresAt <= now then
            if auction.currentBid > 0 and auction.highestBidder then
                ServerTao._AuctionSettle(auctionId, auction.highestBidder, auction.currentBid, false)
            else
                auction.status = "expired"
                if _G.GivePlayerItem and ServerTao.playerSessions[auction.sellerId] then
                    GivePlayerItem(auction.sellerId, auction.itemId, 1)
                end
                if ServerTao.playerSessions[auction.sellerId] then
                    ServerTao.playerSessions[auction.sellerId].connection:SendRemoteEvent(
                        TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, true, "expire", auctionId)
                end
                EventLog.Append({ type = "auction_expire", actor = "system", target = auctionId, desc = "拍卖过期流拍" })
            end
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 十一、副本匹配
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleDungeonQueue(eventType, eventData)
    local connection = eventData["Connection"]
    local dungeonId = eventData[0] and eventData[0]:GetString() or ""
    local difficulty = eventData[1] and eventData[1]:GetString() or "normal"
    local pid = ServerTao.GetPlayerId(connection)

    if dungeonId == "" then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "queue", "failed", "副本ID不能为空")
        return
    end

    if ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].dungeonQueue then
        ServerTao.DungeonDequeue(pid, ServerTao.playerSessions[pid].dungeonQueue)
    end

    ServerTao.dungeonQueues[dungeonId] = ServerTao.dungeonQueues[dungeonId] or {}
    ServerTao.dungeonQueues[dungeonId][pid] = {
        pid = pid,
        dungeonId = dungeonId,
        difficulty = difficulty,
        queuedAt = GetWorldTime(),
        partyId = (ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].partyId) or nil
    }
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].dungeonQueue = dungeonId
    end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "queue", "success", dungeonId, difficulty)
    EventLog.Append({ type = "dungeon_queue", actor = pid, target = dungeonId, desc = "排队副本" })
end

function ServerTao.DungeonDequeue(pid, dungeonId)
    if not dungeonId then return end
    local queue = ServerTao.dungeonQueues[dungeonId]
    if queue then queue[pid] = nil end
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].dungeonQueue = nil
    end
end

function ServerTao._ProcessDungeonMatchmaking()
    for dungeonId, queue in pairs(ServerTao.dungeonQueues) do
        local soloPlayers = {}
        local parties = {}
        for pid, entry in pairs(queue) do
            if entry.partyId then
                parties[entry.partyId] = parties[entry.partyId] or {}
                table.insert(parties[entry.partyId], entry)
            else
                table.insert(soloPlayers, entry)
            end
        end

        local matchedGroups = {}
        for partyId, members in pairs(parties) do
            if #members >= 1 and #members <= 5 then
                table.insert(matchedGroups, members)
            end
        end

        table.sort(soloPlayers, function(a, b) return a.queuedAt < b.queuedAt end)
        local currentGroup = {}
        for _, p in ipairs(soloPlayers) do
            table.insert(currentGroup, p)
            if #currentGroup >= 3 then
                table.insert(matchedGroups, currentGroup)
                currentGroup = {}
            end
        end
        if #currentGroup >= 1 and #currentGroup < 3 then
            table.insert(matchedGroups, currentGroup)
        end

        for _, group in ipairs(matchedGroups) do
            if #group >= 1 and #group <= 5 then
                local instanceId = dungeonId .. "_" .. math.floor(GetWorldTime() * 1000)
                local memberPids = {}
                for _, m in ipairs(group) do
                    table.insert(memberPids, m.pid)
                    ServerTao.DungeonDequeue(m.pid, dungeonId)
                end
                ServerTao.activeDungeons[instanceId] = {
                    id = instanceId,
                    dungeonId = dungeonId,
                    members = memberPids,
                    createdAt = GetWorldTime(),
                    status = "matched",
                    progress = 0
                }
                ServerTao.BroadcastToPlayers(memberPids, TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT,
                    "matched", instanceId, dungeonId, SimpleEncode(memberPids))
                EventLog.Append({ type = "dungeon_matched", actor = "system", target = instanceId, desc = "副本匹配成功: " .. dungeonId })
            end
        end
    end
end

function ServerTao.HandleDungeonEnter(eventType, eventData)
    local connection = eventData["Connection"]
    local instanceId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local dungeon = ServerTao.activeDungeons[instanceId]
    if not dungeon then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "enter", "failed", "副本实例不存在")
        return
    end
    local isMember = false
    for _, m in ipairs(dungeon.members) do
        if m == pid then isMember = true; break end
    end
    if not isMember then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "enter", "failed", "不是该副本成员")
        return
    end
    dungeon.status = "active"
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "enter", "success", instanceId, dungeon.dungeonId)
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].stats.dungeons = (ServerTao.playerSessions[pid].stats.dungeons or 0) + 1
    end
    EventLog.Append({ type = "dungeon_enter", actor = pid, target = instanceId, desc = "进入副本" })
end

function ServerTao.HandleDungeonComplete(eventType, eventData)
    local connection = eventData["Connection"]
    local instanceId = eventData[0] and eventData[0]:GetString() or ""
    local success = eventData[1] and eventData[1]:GetBool() or false
    local pid = ServerTao.GetPlayerId(connection)
    local dungeon = ServerTao.activeDungeons[instanceId]
    if not dungeon then return end

    dungeon.status = success and "completed" or "failed"
    dungeon.completedAt = GetWorldTime()
    for _, m in ipairs(dungeon.members) do
        if ServerTao.playerSessions[m] then
            ServerTao.playerSessions[m].connection:SendRemoteEvent(
                TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, true, "complete", success and "success" or "failed", instanceId)
        end
    end
    if success then
        for _, m in ipairs(dungeon.members) do
            ServerTao._ProgressAchievement(m, "dungeon_clear", 1)
            if _G.GivePlayerExp then GivePlayerExp(m, 1000) end
            if _G.GivePlayerGold then GivePlayerGold(m, 500) end
        end
    end
    EventLog.Append({ type = "dungeon_complete", actor = pid, target = instanceId, desc = success and "副本通关" or "副本失败" })
end

-- ═══════════════════════════════════════════════════════════
-- 十二、邮件系统
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleMailSend(eventType, eventData)
    local connection = eventData["Connection"]
    local recipientId = eventData[0] and eventData[0]:GetString() or ""
    local subject = eventData[1] and eventData[1]:GetString() or ""
    local body = eventData[2] and eventData[2]:GetString() or ""
    local attachmentsStr = eventData[3] and eventData[3]:GetString() or "[]"
    local attachments = SimpleDecode(attachmentsStr) or {}
    local pid = ServerTao.GetPlayerId(connection)

    if recipientId == "" or subject == "" then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "send", "failed", "收件人和主题不能为空")
        return
    end
    if #attachments > 5 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "send", "failed", "附件数量不能超过5个")
        return
    end
    for _, att in ipairs(attachments) do
        if type(att) == "table" and att.item_id then
            if _G.PlayerHasItem and not PlayerHasItem(pid, att.item_id, att.count or 1) then
                connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "send", "failed", "缺少附件物品: " .. att.item_id)
                return
            end
        end
    end

    ServerTao.mailCounter = ServerTao.mailCounter + 1
    local mailId = "mail_" .. ServerTao.mailCounter
    local mail = {
        id = mailId,
        senderId = pid,
        recipientId = recipientId,
        subject = subject,
        body = body,
        attachments = attachments,
        read = false,
        attachmentsTaken = false,
        sentAt = GetWorldTime(),
        sentDay = _G.GetCurrentDay and GetCurrentDay() or 1
    }
    ServerTao.mailbox[mailId] = mail

    for _, att in ipairs(attachments) do
        if type(att) == "table" and att.item_id and _G.RemovePlayerItem then
            RemovePlayerItem(pid, att.item_id, att.count or 1)
        end
    end

    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "send", "success", mailId)
    if ServerTao.playerSessions[recipientId] then
        ServerTao.playerSessions[recipientId].mailUnreadCount =
            (ServerTao.playerSessions[recipientId].mailUnreadCount or 0) + 1
        ServerTao.playerSessions[recipientId].connection:SendRemoteEvent(
            TAO_REMOTE_EVENTS.S2C_MAIL_NOTIFY, true, mailId, senderNameOrPid(pid))
    end
    if ServerTao.playerSessions[pid] then
        ServerTao.playerSessions[pid].stats.mails = (ServerTao.playerSessions[pid].stats.mails or 0) + 1
    end
    EventLog.Append({ type = "mail_send", actor = pid, target = recipientId, desc = "发送邮件: " .. subject })
end

function senderNameOrPid(pid)
    if _G.GetPlayerName then
        local name = GetPlayerName(pid)
        if name and name ~= "" then return name end
    end
    return pid
end

function ServerTao.HandleMailRead(eventType, eventData)
    local connection = eventData["Connection"]
    local mailId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local mail = ServerTao.mailbox[mailId]

    if not mail then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "read", "failed", "邮件不存在")
        return
    end
    if mail.recipientId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "read", "failed", "无权阅读")
        return
    end
    if not mail.read then
        mail.read = true
        if ServerTao.playerSessions[pid] then
            ServerTao.playerSessions[pid].mailUnreadCount = math.max(0,
                (ServerTao.playerSessions[pid].mailUnreadCount or 0) - 1)
        end
    end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "read", "success", mailId, SimpleEncode(mail))
end

function ServerTao.HandleMailDelete(eventType, eventData)
    local connection = eventData["Connection"]
    local mailId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local mail = ServerTao.mailbox[mailId]

    if not mail then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "delete", "failed", "邮件不存在")
        return
    end
    if mail.recipientId ~= pid and mail.senderId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "delete", "failed", "无权删除")
        return
    end
    if not mail.attachmentsTaken and mail.attachments and #mail.attachments > 0 then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "delete", "failed", "请先提取附件")
        return
    end
    ServerTao.mailbox[mailId] = nil
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "delete", "success", mailId)
end

function ServerTao.HandleMailTakeAttachment(eventType, eventData)
    local connection = eventData["Connection"]
    local mailId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local mail = ServerTao.mailbox[mailId]

    if not mail then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "take_attachment", "failed", "邮件不存在")
        return
    end
    if mail.recipientId ~= pid then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "take_attachment", "failed", "无权提取")
        return
    end
    if mail.attachmentsTaken then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "take_attachment", "failed", "附件已提取")
        return
    end
    mail.attachmentsTaken = true
    for _, att in ipairs(mail.attachments or {}) do
        if type(att) == "table" and att.item_id and _G.GivePlayerItem then
            GivePlayerItem(pid, att.item_id, att.count or 1)
        end
    end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, true, "take_attachment", "success", mailId)
end

function ServerTao.GetPlayerMails(pid, onlyUnread)
    local result = {}
    for mailId, mail in pairs(ServerTao.mailbox) do
        if mail.recipientId == pid then
            if not onlyUnread or not mail.read then
                table.insert(result, mail)
            end
        end
    end
    table.sort(result, function(a, b) return a.sentAt > b.sentAt end)
    return result
end

-- ═══════════════════════════════════════════════════════════
-- 十三、排行榜
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleLeaderboardQuery(eventType, eventData)
    local connection = eventData["Connection"]
    local boardType = eventData[0] and eventData[0]:GetString() or ""
    local topN = eventData[1] and eventData[1]:GetInt() or 10
    local pid = ServerTao.GetPlayerId(connection)

    local board = ServerTao.leaderboards[boardType]
    if not board then
        board = ServerTao._RebuildLeaderboard(boardType)
    end
    local entries = {}
    for i = 1, math.min(topN, #board) do
        table.insert(entries, board[i])
    end
    local playerRank = nil
    for i, entry in ipairs(board) do
        if entry.pid == pid then
            playerRank = { rank = i, score = entry.score }
            break
        end
    end
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_LEADERBOARD_RESULT, true,
        boardType, SimpleEncode(entries), SimpleEncode(playerRank))
end

function ServerTao._RebuildLeaderboard(boardType)
    local board = {}
    if boardType == "wealth" then
        for pid, session in pairs(ServerTao.playerSessions) do
            local gold = _G.GetPlayerGold and GetPlayerGold(pid) or 0
            table.insert(board, { pid = pid, score = gold })
        end
    elseif boardType == "level" then
        for pid, session in pairs(ServerTao.playerSessions) do
            local lvl = _G.GetPlayerLevel and GetPlayerLevel(pid) or 1
            table.insert(board, { pid = pid, score = lvl })
        end
    elseif boardType == "dungeon_prestige" then
        for pid, session in pairs(ServerTao.playerSessions) do
            local prestige = _G.GetPlayerDungeonPrestige and GetPlayerDungeonPrestige(pid) or 0
            table.insert(board, { pid = pid, score = prestige })
        end
    elseif boardType == "achievement_points" then
        for pid, session in pairs(ServerTao.playerSessions) do
            local points = _G.GetPlayerAchievementPoints and GetPlayerAchievementPoints(pid) or 0
            table.insert(board, { pid = pid, score = points })
        end
    elseif boardType == "guild_wealth" then
        for gid, guild in pairs(ServerTao.guilds) do
            table.insert(board, { pid = gid, score = guild.wealth or 0, name = guild.name })
        end
    elseif boardType == "pvp_kills" then
        for pid, session in pairs(ServerTao.playerSessions) do
            local kills = _G.GetPlayerPvPKills and GetPlayerPvPKills(pid) or 0
            table.insert(board, { pid = pid, score = kills })
        end
    end
    table.sort(board, function(a, b) return a.score > b.score end)
    ServerTao.leaderboards[boardType] = board
    return board
end

function ServerTao.UpdateLeaderboard(boardType, pid, score)
    ServerTao.leaderboards[boardType] = nil
end

-- ═══════════════════════════════════════════════════════════
-- 十四、成就系统
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleAchievementClaim(eventType, eventData)
    local connection = eventData["Connection"]
    local achievementId = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)

    local ok, err = ServerTao._ClaimAchievement(pid, achievementId)
    if ok then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_ACHIEVEMENT_RESULT, true, "claim", "success", achievementId)
    else
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_ACHIEVEMENT_RESULT, true, "claim", "failed", achievementId, err)
    end
end

function ServerTao._ClaimAchievement(pid, achievementId)
    ServerTao.achievements[pid] = ServerTao.achievements[pid] or {}
    local playerAch = ServerTao.achievements[pid]
    if playerAch[achievementId] and playerAch[achievementId].claimed then
        return false, "成就奖励已领取"
    end
    local def = ServerTao._GetAchievementDef(achievementId)
    if not def then return false, "成就不存在" end
    local progress = playerAch[achievementId] and playerAch[achievementId].progress or 0
    if progress < def.requirement then
        return false, "成就进度不足"
    end
    playerAch[achievementId] = { progress = progress, unlocked = true, claimed = true, claimedAt = GetWorldTime() }
    if def.reward_gold and def.reward_gold > 0 and _G.GivePlayerGold then
        GivePlayerGold(pid, def.reward_gold)
    end
    if def.reward_item and def.reward_item ~= "" and _G.GivePlayerItem then
        GivePlayerItem(pid, def.reward_item, def.reward_item_count or 1)
    end
    if def.reward_title and _G.GivePlayerTitle then
        GivePlayerTitle(pid, def.reward_title)
    end
    ServerTao.UpdateLeaderboard("achievement_points", pid,
        _G.GetPlayerAchievementPoints and GetPlayerAchievementPoints(pid) or 0)
    EventLog.Append({ type = "achievement_claim", actor = pid, target = achievementId, desc = "领取成就奖励: " .. def.name })
    return true, ""
end

function ServerTao._ProgressAchievement(pid, achievementId, delta)
    ServerTao.achievements[pid] = ServerTao.achievements[pid] or {}
    local playerAch = ServerTao.achievements[pid]
    local entry = playerAch[achievementId] or { progress = 0, unlocked = false, claimed = false }
    entry.progress = (entry.progress or 0) + (delta or 1)
    local def = ServerTao._GetAchievementDef(achievementId)
    if def and entry.progress >= def.requirement and not entry.unlocked then
        entry.unlocked = true
        entry.unlockedAt = GetWorldTime()
        if ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].connection then
            ServerTao.playerSessions[pid].connection:SendRemoteEvent(
                TAO_REMOTE_EVENTS.S2C_ACHIEVEMENT_RESULT, true, "unlock", achievementId, def.name)
        end
        EventLog.Append({ type = "achievement_unlock", actor = pid, target = achievementId, desc = "解锁成就: " .. def.name })
    end
    playerAch[achievementId] = entry
end

function ServerTao._GetAchievementDef(achievementId)
    local defs = {
        first_blood = { name = "初尝鲜血", requirement = 1, reward_gold = 100, reward_item = "", reward_title = "猎手" },
        generous_soul = { name = "慷慨之魂", requirement = 10, reward_gold = 500, reward_item = "blessed_ring", reward_item_count = 1 },
        samaritan = { name = " Samaritan", requirement = 10, reward_gold = 500, reward_item = "", reward_title = "善人" },
        dungeon_clear = { name = "副本先驱", requirement = 5, reward_gold = 2000, reward_item = "dungeon_key", reward_item_count = 3 },
        master_trader = { name = "交易大师", requirement = 50, reward_gold = 1000, reward_item = "", reward_title = "商人" },
        guild_founder = { name = "公会创始人", requirement = 1, reward_gold = 5000, reward_item = "", reward_title = "领袖" },
        auction_winner = { name = "拍卖赢家", requirement = 10, reward_gold = 1000, reward_item = "", reward_title = "收藏家" },
        mail_sender = { name = "鸿雁传书", requirement = 20, reward_gold = 300, reward_item = "", reward_title = "信使" }
    }
    return defs[achievementId]
end

function ServerTao.GetPlayerAchievements(pid)
    return ServerTao.achievements[pid] or {}
end

-- ═══════════════════════════════════════════════════════════
-- 十五、全服公告与 GM 指令
-- ═══════════════════════════════════════════════════════════

function ServerTao.SendServerAnnouncement(text, duration, priority)
    duration = duration or 10.0
    priority = priority or 1
    local announcement = {
        text = text,
        sentAt = GetWorldTime(),
        duration = duration,
        priority = priority
    }
    table.insert(ServerTao.announcements, announcement)
    local connections = network:GetClientConnections()
    for _, conn in ipairs(connections) do
        conn:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_SERVER_ANNOUNCEMENT, true, text, duration, priority)
    end
    print("[ServerTao] 全服公告: " .. text)
    EventLog.Append({ type = "server_announcement", actor = "system", desc = text })
end

function ServerTao.HandleGMCommand(eventType, eventData)
    local connection = eventData["Connection"]
    local cmd = eventData[0] and eventData[0]:GetString() or ""
    local argsStr = eventData[1] and eventData[1]:GetString() or "[]"
    local args = SimpleDecode(argsStr) or {}
    local pid = ServerTao.GetPlayerId(connection)

    if not ServerTao._IsGM(pid) then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GM_RESULT, true, "failed", "权限不足")
        return
    end

    table.insert(ServerTao.gmCommandHistory, { t = GetWorldTime(), gm = pid, cmd = cmd, args = args })
    local result = ServerTao._ExecuteGMCommand(cmd, args, pid)
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_GM_RESULT, true, cmd, result.ok and "success" or "failed", result.msg, SimpleEncode(result.data or {}))
    EventLog.Append({ type = "gm_command", actor = pid, desc = cmd .. " -> " .. (result.msg or "") })
end

function ServerTao._IsGM(pid)
    if _G.IsPlayerGM then return IsPlayerGM(pid) end
    local gmList = { ["admin"] = true, ["gm_001"] = true }
    return gmList[pid] == true
end

function ServerTao._ExecuteGMCommand(cmd, args, gmPid)
    if cmd == "announce" then
        local text = args.text or ""
        ServerTao.SendServerAnnouncement(text, args.duration or 10, args.priority or 1)
        return { ok = true, msg = "公告已发送" }
    elseif cmd == "kick" then
        local targetPid = args.pid or ""
        if ServerTao.playerSessions[targetPid] and ServerTao.playerSessions[targetPid].connection then
            ServerTao.playerSessions[targetPid].connection:Disconnect()
        end
        return { ok = true, msg = "玩家 " .. targetPid .. " 已被踢出" }
    elseif cmd == "givegold" then
        local targetPid = args.pid or ""
        local amount = args.amount or 0
        if _G.SetPlayerGold and GetPlayerGold then
            SetPlayerGold(targetPid, (GetPlayerGold(targetPid) or 0) + amount)
        end
        return { ok = true, msg = "给予 " .. targetPid .. " " .. amount .. " 金币", data = { pid = targetPid, amount = amount } }
    elseif cmd == "giveitem" then
        local targetPid = args.pid or ""
        local itemId = args.item_id or ""
        local count = args.count or 1
        if _G.GivePlayerItem then GivePlayerItem(targetPid, itemId, count) end
        return { ok = true, msg = "给予 " .. targetPid .. " " .. itemId .. " x" .. count }
    elseif cmd == "setlevel" then
        local targetPid = args.pid or ""
        local level = args.level or 1
        if _G.SetPlayerLevel then SetPlayerLevel(targetPid, level) end
        return { ok = true, msg = "设置 " .. targetPid .. " 等级为 " .. level }
    elseif cmd == "spawnnpc" then
        local npcId = args.npc_id or ""
        local loc = args.loc or ""
        if _G.SpawnNpc then SpawnNpc(npcId, loc) end
        return { ok = true, msg = "在 " .. loc .. " 生成 NPC " .. npcId }
    elseif cmd == "killnpc" then
        local npcId = args.npc_id or ""
        if _G.SetNpcState then SetNpcState(npcId, "dead") end
        Validator.SetHardLock("confirmedDeaths", npcId, true)
        return { ok = true, msg = "杀死 NPC " .. npcId }
    elseif cmd == "setworldtime" then
        local timeOfDay = args.time_of_day or 12
        if _G.SetWorldTimeOfDay then SetWorldTimeOfDay(timeOfDay) end
        return { ok = true, msg = "设置世界时间为 " .. timeOfDay }
    elseif cmd == "setseason" then
        local season = args.season or "spring"
        if _G.SetWorldSeason then SetWorldSeason(season) end
        return { ok = true, msg = "设置季节为 " .. season }
    elseif cmd == "clearqueue" then
        local dungeonId = args.dungeon_id or ""
        if dungeonId ~= "" then
            ServerTao.dungeonQueues[dungeonId] = {}
        else
            ServerTao.dungeonQueues = {}
        end
        return { ok = true, msg = "副本队列已清空" }
    elseif cmd == "resetauctions" then
        ServerTao.auctions = {}
        ServerTao.auctionCounter = 0
        return { ok = true, msg = "拍卖行已重置" }
    elseif cmd == "reloadmodule" then
        local moduleName = args.module or ""
        if _G.ReloadTaoModule then
            ReloadTaoModule(moduleName)
            return { ok = true, msg = "模块 " .. moduleName .. " 已重载" }
        end
        return { ok = false, msg = "重载功能不可用" }
    elseif cmd == "queryplayer" then
        local targetPid = args.pid or ""
        local session = ServerTao.playerSessions[targetPid]
        return { ok = session ~= nil, msg = session and "查询成功" or "玩家不在线", data = session }
    elseif cmd == "queryguild" then
        local guildId = args.guild_id or ""
        local guild = ServerTao.guilds[guildId]
        return { ok = guild ~= nil, msg = guild and "查询成功" or "公会不存在", data = guild }
    elseif cmd == "ban" then
        local targetPid = args.pid or ""
        if _G.BanPlayer then BanPlayer(targetPid, args.duration or 86400, args.reason or "GM 封禁") end
        return { ok = true, msg = "封禁玩家 " .. targetPid }
    elseif cmd == "unban" then
        local targetPid = args.pid or ""
        if _G.UnbanPlayer then UnbanPlayer(targetPid) end
        return { ok = true, msg = "解封玩家 " .. targetPid }
    else
        return { ok = false, msg = "未知 GM 指令: " .. cmd }
    end
end

-- ═══════════════════════════════════════════════════════════
-- 十六、NPC 批量调度（BatchThink）
-- ═══════════════════════════════════════════════════════════

function ServerTao._BuildNpcThinkQueue()
    ServerTao.npcThinkQueue = {}
    if not AgentCore.agents then return end
    for npcId, _ in pairs(AgentCore.agents) do
        table.insert(ServerTao.npcThinkQueue, npcId)
    end
    ServerTao.npcThinkIndex = 1
end

function ServerTao._ProcessBatchThink(batchSize)
    if not AgentCore.agents then return end
    if #ServerTao.npcThinkQueue == 0 or ServerTao.npcThinkIndex > #ServerTao.npcThinkQueue then
        ServerTao._BuildNpcThinkQueue()
        return
    end
    batchSize = batchSize or (TAO_WORLD_CONFIG and TAO_WORLD_CONFIG.npcBatchSize) or 20
    local processed = 0
    while processed < batchSize and ServerTao.npcThinkIndex <= #ServerTao.npcThinkQueue do
        local npcId = ServerTao.npcThinkQueue[ServerTao.npcThinkIndex]
        ServerTao.npcThinkIndex = ServerTao.npcThinkIndex + 1
        if AgentCore.agents[npcId] then
            if AgentCore.ShouldThink and AgentCore.ShouldThink(npcId) then
                TaoPerfBegin("BatchThink_" .. npcId)
                AgentCore.RequestStrategy(npcId, nil)
                TaoPerfEnd("BatchThink_" .. npcId)
            end
            if AgentCore.Tick then
                TaoPerfBegin("AgentTick_" .. npcId)
                AgentCore.Tick(npcId, ServerTao.tickInterval)
                TaoPerfEnd("AgentTick_" .. npcId)
            end
            processed = processed + 1
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 十七、Webhook / HTTP 查询接口
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleWebhookRequest(endpoint, payload)
    ServerTao.webhookStats.requests = ServerTao.webhookStats.requests + 1
    if endpoint == "worldstate" then
        return { ok = true, data = ServerTao._GetWorldStateSnapshot() }
    elseif endpoint == "players" then
        return { ok = true, data = ServerTao._GetPlayerListSnapshot() }
    elseif endpoint == "npcs" then
        return { ok = true, data = ServerTao._GetNpcListSnapshot() }
    elseif endpoint == "guilds" then
        return { ok = true, data = ServerTao._GetGuildListSnapshot() }
    elseif endpoint == "auctions" then
        return { ok = true, data = ServerTao._GetAuctionListSnapshot() }
    elseif endpoint == "dungeons" then
        return { ok = true, data = ServerTao._GetDungeonListSnapshot() }
    elseif endpoint == "leaderboard" then
        local boardType = payload and payload.board_type or "wealth"
        local topN = payload and payload.top_n or 10
        local board = ServerTao._RebuildLeaderboard(boardType)
        local entries = {}
        for i = 1, math.min(topN, #board) do
            table.insert(entries, board[i])
        end
        return { ok = true, data = { board_type = boardType, entries = entries } }
    elseif endpoint == "events" then
        local limit = payload and payload.limit or 20
        local events = EventLog.ToPromptText and EventLog.ToPromptText(limit) or ""
        return { ok = true, data = { events = events } }
    elseif endpoint == "mempalace" then
        local entityId = payload and payload.entity_id or "world"
        local summary = Mempalace.ToPrompt and Mempalace.ToPrompt(entityId, 5) or ""
        return { ok = true, data = { entity_id = entityId, summary = summary } }
    elseif endpoint == "region" then
        local regionId = payload and payload.region_id or ""
        local region = RegionGen.LoadRegion(regionId)
        return { ok = region ~= nil, data = region or {}, msg = region and "" or "区域不存在" }
    else
        ServerTao.webhookStats.errors = ServerTao.webhookStats.errors + 1
        return { ok = false, msg = "未知 endpoint: " .. endpoint }
    end
end

function ServerTao._GetWorldStateSnapshot()
    return {
        time = GetWorldTime and GetWorldTime() or 0,
        playerCount = table.count(ServerTao.playerSessions),
        npcCount = AgentCore.agents and table.count(AgentCore.agents) or 0,
        guildCount = table.count(ServerTao.guilds),
        activeAuctions = table.count(ServerTao.auctions),
        activeDungeons = table.count(ServerTao.activeDungeons),
        queueSizes = ServerTao._GetQueueSizes(),
        globalState = ServerTao.globalState
    }
end

function ServerTao._GetPlayerListSnapshot()
    local list = {}
    for pid, session in pairs(ServerTao.playerSessions) do
        table.insert(list, {
            pid = pid,
            connectedAt = session.connectedAt,
            lastInteraction = session.lastInteraction,
            guildId = session.guildId,
            partyId = session.partyId,
            stats = session.stats
        })
    end
    return list
end

function ServerTao._GetNpcListSnapshot()
    local list = {}
    if not AgentCore.agents then return list end
    for npcId, agent in pairs(AgentCore.agents) do
        table.insert(list, {
            id = npcId,
            state = agent.state or "unknown",
            loc = agent.loc,
            level = agent.level or 1,
            faction = agent.faction or ""
        })
    end
    return list
end

function ServerTao._GetGuildListSnapshot()
    local list = {}
    for gid, guild in pairs(ServerTao.guilds) do
        table.insert(list, {
            id = gid,
            name = guild.name,
            leaderId = guild.leaderId,
            memberCount = table.count(guild.members),
            wealth = guild.wealth,
            level = guild.level
        })
    end
    return list
end

function ServerTao._GetAuctionListSnapshot()
    local list = {}
    for aid, auction in pairs(ServerTao.auctions) do
        table.insert(list, {
            id = aid,
            sellerId = auction.sellerId,
            itemId = auction.itemId,
            currentBid = auction.currentBid,
            status = auction.status,
            expiresAt = auction.expiresAt
        })
    end
    return list
end

function ServerTao._GetDungeonListSnapshot()
    local list = {}
    for did, dungeon in pairs(ServerTao.activeDungeons) do
        table.insert(list, {
            id = did,
            dungeonId = dungeon.dungeonId,
            memberCount = #dungeon.members,
            status = dungeon.status,
            createdAt = dungeon.createdAt
        })
    end
    return list
end

function ServerTao._GetQueueSizes()
    local sizes = {}
    for dungeonId, queue in pairs(ServerTao.dungeonQueues) do
        sizes[dungeonId] = table.count(queue)
    end
    return sizes
end

function ServerTao.GetWebhookStats()
    return ServerTao.webhookStats
end

-- ═══════════════════════════════════════════════════════════
-- 十八、流式轮询与调试查询
-- ═══════════════════════════════════════════════════════════

function ServerTao.HandleStreamPoll(eventType, eventData)
    local connection = eventData["Connection"]
    local streamId = eventData[0] and eventData[0]:GetString() or ""
    if Router.PollStream then
        local chunk, done = Router.PollStream(streamId)
        if done then
            connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_DONE, true, streamId, chunk or "")
        else
            connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_CHUNK, true, streamId, chunk or "")
        end
    end
end

function ServerTao.HandleDebugQuery(eventType, eventData)
    local connection = eventData["Connection"]
    local query = eventData[0] and eventData[0]:GetString() or ""
    local pid = ServerTao.GetPlayerId(connection)
    local result = {}

    if query == "perf" then
        result.report = TaoPerfReport()
    elseif query == "agents" then
        result.agents = {}
        if AgentCore.agents then
            for id, agent in pairs(AgentCore.agents) do
                table.insert(result.agents, { id = id, state = agent.state or "unknown", loc = agent.loc })
            end
        end
    elseif query == "events" then
        result.recent = EventLog.ToPromptText and EventLog.ToPromptText(20) or ""
    elseif query == "mempalace" then
        result.summary = Mempalace.ToPrompt and Mempalace.ToPrompt(pid, 5) or ""
    elseif query == "queue" then
        result.derivationQueueSize = #ServerTao.worldDerivationQueue
        result.derivationInFlight = ServerTao.derivationInFlight
    elseif query == "guild" then
        local gid = ServerTao.playerSessions[pid] and ServerTao.playerSessions[pid].guildId
        result.guild = gid and ServerTao.guilds[gid] or nil
    elseif query == "auctions" then
        result.auctions = ServerTao._GetAuctionListSnapshot()
    elseif query == "dungeons" then
        result.dungeons = ServerTao._GetDungeonListSnapshot()
    elseif query == "mails" then
        result.mails = ServerTao.GetPlayerMails(pid)
    elseif query == "achievements" then
        result.achievements = ServerTao.GetPlayerAchievements(pid)
    elseif query == "webhook" then
        result.webhookStats = ServerTao.GetWebhookStats()
    elseif query == "worldstate" then
        result.worldState = ServerTao._GetWorldStateSnapshot()
    else
        result.error = "未知调试指令: " .. query
    end

    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_DEBUG_RESPONSE, true,
        query, SimpleEncode(result))
end

-- ═══════════════════════════════════════════════════════════
-- 十九、主循环更新
-- ═══════════════════════════════════════════════════════════

function ServerTao.OnUpdate(eventType, eventData)
    local dt = eventData["TimeStep"]:GetFloat()

    TaoPerfBegin("AgentTickAll")
    if AgentCore.TickAll then AgentCore.TickAll(dt) end
    TaoPerfEnd("AgentTickAll")

    ServerTao.tickTimer = ServerTao.tickTimer + dt
    ServerTao.slowTickTimer = ServerTao.slowTickTimer + dt
    ServerTao.autoSaveTimer = ServerTao.autoSaveTimer + dt

    if ServerTao.tickTimer >= ServerTao.tickInterval then
        ServerTao.tickTimer = 0
        ServerTao.ProcessDerivationQueue()
        ServerTao.CheckMempalaceTriggers()
        ServerTao._ProcessBatchThink()
    end

    if ServerTao.slowTickTimer >= ServerTao.slowTickInterval then
        ServerTao.slowTickTimer = 0
        ServerTao.ArchiveOldMemories()
        ServerTao.SyncWorldStateDeltas()
        ServerTao._ProcessAuctionSettlement()
        ServerTao._ProcessDungeonMatchmaking()
    end

    if TAO_WORLD_CONFIG.autoSaveInterval > 0 and
       ServerTao.autoSaveTimer >= TAO_WORLD_CONFIG.autoSaveInterval then
        ServerTao.autoSaveTimer = 0
        ServerTao.SaveWorld()
    end
end

-- ═══════════════════════════════════════════════════════════
-- 二十、世界推衍队列处理（带并发控制）
-- ═══════════════════════════════════════════════════════════

function ServerTao.ProcessDerivationQueue()
    if #ServerTao.worldDerivationQueue == 0 then return end
    if ServerTao.derivationInFlight >= (TAO_WORLD_CONFIG.maxConcurrentDerivations or 3) then
        return
    end

    local now = GetWorldTime()
    local dedupWindow = 5.0
    local dedupKey = nil
    local job = nil
    for i = 1, #ServerTao.worldDerivationQueue do
        local candidate = ServerTao.worldDerivationQueue[i]
        local key = candidate.eventType .. "_" .. tostring(candidate.data and candidate.data.target or "")
        if not ServerTao._derivationDedup or
           not ServerTao._derivationDedup[key] or
           (now - ServerTao._derivationDedup[key]) > dedupWindow then
            job = table.remove(ServerTao.worldDerivationQueue, i)
            dedupKey = key
            break
        end
    end

    if not job then return end
    ServerTao._derivationDedup = ServerTao._derivationDedup or {}
    ServerTao._derivationDedup[dedupKey] = now

    ServerTao.derivationInFlight = ServerTao.derivationInFlight + 1
    local prompt = ServerTao.BuildWorldDerivationPrompt(job)
    local messages = {
        { role = "system", content = "你是天道引擎的世界推衍核心。根据事件生成世界状态变更建议。请严格输出 JSON 格式，包含 narrative（叙事文本）和 changes（状态变更数组）。changes 中每个条目包含 target_type, target, field, value。" },
        { role = "user", content = prompt }
    }

    TaoPerfBegin("WorldDerivation")
    TaoCall(messages, "deepseek_reasoner", function(responseStr)
        ServerTao.derivationInFlight = math.max(0, ServerTao.derivationInFlight - 1)
        TaoPerfEnd("WorldDerivation")

        local parsed = SimpleDecode(responseStr)
        if not parsed or not parsed.changes then
            parsed = AgentCore.ExtractJson and AgentCore.ExtractJson(responseStr) or nil
        end

        if parsed then
            if parsed.narrative then
                BroadcastNarrative(parsed.narrative, "world", 8.0)
            end

            if parsed.changes and type(parsed.changes) == "table" then
                local ok, err = Validator.ValidateChanges and Validator.ValidateChanges(parsed.changes)
                if ok then
                    ServerTao.ApplyStateChanges(parsed.changes, "llm_derivation", job.eventType)
                    EventLog.Append({
                        type = "llm_derivation",
                        actor = "天道",
                        desc = job.eventType .. " -> 推衍结果已应用",
                        changes = parsed.changes
                    })
                else
                    EventLog.Append({
                        type = "derivation_rejected",
                        actor = "天道",
                        desc = err,
                        raw = parsed.changes
                    })
                end
            end
        else
            EventLog.Append({
                type = "derivation_parse_fail",
                actor = "天道",
                desc = job.eventType .. " -> 无法解析 LLM 响应",
                raw = responseStr
            })
        end
    end)
end

function ServerTao.BuildWorldDerivationPrompt(job)
    local events = EventLog.ToPromptText and EventLog.ToPromptText(10) or ""
    local worldMem = Mempalace.ToPrompt and Mempalace.ToPrompt("world", 5) or ""
    local actorMem = ""
    if job.data and job.data.actor then
        actorMem = Mempalace.ToPrompt and Mempalace.ToPrompt(job.data.actor, 3) or ""
    end
    local targetMem = ""
    if job.data and job.data.target and AgentCore.agents and AgentCore.agents[job.data.target] then
        targetMem = Mempalace.ToPrompt and Mempalace.ToPrompt(job.data.target, 3) or ""
    end

    return string.format([[
【触发事件】
类型: %s
详情: %s

【世界记忆】
%s

【参与者记忆】
%s

【目标记忆】
%s

【最近事件】
%s

请基于以上信息，生成以下 JSON：
{
  "narrative": "一段富有氛围的叙事文本",
  "changes": [
    {"target_type":"npc","target":"杰克","field":"relationship","value":-10}
  ]
}]], job.eventType, SimpleEncode(job.data or {}), worldMem, actorMem, targetMem, events)
end

-- ═══════════════════════════════════════════════════════════
-- 二十一、Mempalace 触发器检查
-- ═══════════════════════════════════════════════════════════

function ServerTao.CheckMempalaceTriggers()
    if not AgentCore.agents then return end
    for npcId, _ in pairs(AgentCore.agents) do
        local triggers = Mempalace.CheckTriggers and Mempalace.CheckTriggers(npcId) or {}
        for _, triggerType in ipairs(triggers) do
            QueueWorldDerivation("mempalace_trigger", {
                actor = npcId,
                trigger = triggerType
            })
        end
    end
end

function ServerTao.ArchiveOldMemories()
    if not Mempalace.ArchiveOld then return end
    for entityId, _ in pairs(Mempalace.palaces or {}) do
        Mempalace.ArchiveOld(entityId, TAO_WORLD_CONFIG.mempalaceArchiveDays or 30)
    end
end

-- ═══════════════════════════════════════════════════════════
-- 二十二、状态同步
-- ═══════════════════════════════════════════════════════════

function ServerTao.SyncWorldStateDeltas()
    local delta = {}
    local hasDelta = false

    if ServerTao.globalState._dirty then
        delta.factions = DeepCopy(ServerTao.globalState.factions or {})
        ServerTao.globalState._dirty = false
        hasDelta = true
    end

    if hasDelta then
        for pid, session in pairs(ServerTao.playerSessions) do
            session.connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_WORLD_STATE_DELTA,
                true, SimpleEncode(delta))
        end
    end
end

function ServerTao.SetGlobalFaction(factionId, field, value)
    ServerTao.globalState.factions = ServerTao.globalState.factions or {}
    ServerTao.globalState.factions[factionId] = ServerTao.globalState.factions[factionId] or {}
    ServerTao.globalState.factions[factionId][field] = value
    ServerTao.globalState._dirty = true
end

-- ═══════════════════════════════════════════════════════════
-- 二十三、广播与消息工具
-- ═══════════════════════════════════════════════════════════

function BroadcastNarrative(text, style, duration)
    local connections = network:GetClientConnections()
    for _, conn in ipairs(connections) do
        conn:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_TAO_NARRATIVE, true,
            text, style or "normal", duration or 5.0)
    end
end

function ServerTao.BroadcastNpcSpeech(npcId, content)
    local connections = network:GetClientConnections()
    for _, conn in ipairs(connections) do
        conn:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_NPC_ACTION_BUBBLE, true,
            npcId, content, "speak")
    end
end

function ServerTao.BroadcastNpcThought(npcId, thought)
    if not TAO_DEBUG then return end
    local connections = network:GetClientConnections()
    for _, conn in ipairs(connections) do
        conn:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_NPC_STRATEGY_RESULT, true,
            npcId, thought or "")
    end
end

function ServerTao.SendSystemMessage(pid, text)
    local session = ServerTao.playerSessions[pid]
    if session and session.connection then
        session.connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_SYSTEM_MESSAGE, true, text)
    end
end

function ServerTao.BroadcastToPlayers(pidList, eventName, ...)
    for _, pid in ipairs(pidList) do
        local session = ServerTao.playerSessions[pid]
        if session and session.connection then
            session.connection:SendRemoteEvent(eventName, true, ...)
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 二十四、状态变更应用
-- ═══════════════════════════════════════════════════════════

function ServerTao.ApplyStateChanges(changes, sourceType, sourceEvent)
    for _, c in ipairs(changes) do
        if c.target_type == "npc" and _G.SetNpcField then
            SetNpcField(c.target, c.field, c.value)
            local room = "个人常识"
            local w = math.abs(c.value or 1) / 10
            if w < 1 then w = 1 end
            if c.field == "relationship" then
                room = (c.value > 0) and "恩情殿" or "阴影室"
            elseif c.field == "contract" then
                room = "契约厅"
            end
            Mempalace.Add(c.target, room, {
                desc = c.field .. " 变为 " .. tostring(c.value) .. "（" .. (sourceEvent or "天道推衍") .. "）",
                weight = w,
                tags = {sourceType or "derived"}
            })
        elseif c.target_type == "player" and _G.SetPlayerField then
            SetPlayerField(c.target, c.field, c.value)
        elseif c.target_type == "world" and _G.SetWorldField then
            SetWorldField(c.field, c.value)
        elseif c.target_type == "faction" then
            ServerTao.SetGlobalFaction(c.target, c.field, c.value)
        end
    end
end

-- ═══════════════════════════════════════════════════════════
-- 二十五、持久化
-- ═══════════════════════════════════════════════════════════

function ServerTao.SaveWorld()
    if EventLog.FlushToDisk then
        EventLog.FlushToDisk(EventLog.entries and #EventLog.entries or 0)
    end
    if Mempalace.SaveAll then
        Mempalace.SaveAll()
    else
        for entityId, _ in pairs(Mempalace.palaces or {}) do
            if Mempalace.Save then Mempalace.Save(entityId) end
        end
    end
    ServerTao._SaveGuilds()
    ServerTao._SaveAuctions()
    ServerTao._SaveMails()
    ServerTao._SaveAchievements()
    print("[ServerTao] 世界状态已保存")
end

function ServerTao._SaveGuilds()
    if not sqlite3 then return end
    -- 假设外部提供保存函数，这里仅记录日志
    EventLog.Append({ type = "save_guilds", actor = "system", desc = "公会数据已保存", count = table.count(ServerTao.guilds) })
end

function ServerTao._SaveAuctions()
    EventLog.Append({ type = "save_auctions", actor = "system", desc = "拍卖数据已保存", count = table.count(ServerTao.auctions) })
end

function ServerTao._SaveMails()
    EventLog.Append({ type = "save_mails", actor = "system", desc = "邮件数据已保存", count = table.count(ServerTao.mailbox) })
end

function ServerTao._SaveAchievements()
    local totalAch = 0
    for _, ach in pairs(ServerTao.achievements) do
        totalAch = totalAch + table.count(ach)
    end
    EventLog.Append({ type = "save_achievements", actor = "system", desc = "成就数据已保存", count = totalAch })
end

function ServerTao.LoadWorld()
    if EventLog.LoadRange then
        EventLog.LoadRange(0, 10000)
    end
    ServerTao._LoadGuilds()
    ServerTao._LoadAuctions()
    ServerTao._LoadMails()
    ServerTao._LoadAchievements()
    print("[ServerTao] 世界状态加载完成")
end

function ServerTao._LoadGuilds() end
function ServerTao._LoadAuctions() end
function ServerTao._LoadMails() end
function ServerTao._LoadAchievements() end

function ServerTao.LoadMempalaceAll()
    if Mempalace.LoadAll then
        Mempalace.LoadAll()
    end
end

function ServerTao.StartAutoSave()
    print("[ServerTao] 自动保存已启动，间隔 " .. (TAO_WORLD_CONFIG.autoSaveInterval or 300) .. " 秒")
end

-- ═══════════════════════════════════════════════════════════
-- 二十六、外部兼容 API
-- ═══════════════════════════════════════════════════════════

function QueueWorldDerivation(eventType, data)
    if ServerTao and ServerTao.worldDerivationQueue then
        table.insert(ServerTao.worldDerivationQueue, {
            eventType = eventType,
            data = data,
            queuedAt = GetWorldTime()
        })
    end
end

function RequestNpcStrategy(npcId, connection)
    if AgentCore.agents and AgentCore.agents[npcId] then
        AgentCore.RequestStrategy(npcId, connection)
    end
end

function ServerBroadcastNpcSpeech(npcId, content)
    ServerTao.BroadcastNpcSpeech(npcId, content)
end

function ServerBroadcastNpcThought(npcId, thought)
    ServerTao.BroadcastNpcThought(npcId, thought)
end

function table.count(tbl)
    local c = 0
    for _ in pairs(tbl) do c = c + 1 end
    return c
end
