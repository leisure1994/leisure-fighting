-- main.lua
-- ---------------------------------------------------------------------------
-- urhox-mmo-social 入口脚本
-- 完整的多人社交系统服务器/客户端统一入口
-- ---------------------------------------------------------------------------
-- 设计参考：
--   1. NoahGameFrame (NF) - 分布式 MMO 服务端框架，Lua 插件化设计
--   2. Squick - 基于 NF 的 C++/Lua 高性能游戏服务端，内置 Guild/Party/Chat
--   3. OpenCoreMMO / The Forgotten Server (TFS+) - C++/Lua MMORPG 模拟器
--      提供完整的 Guild、Party、Chats、Royal Mail、Vip List 实现
-- ---------------------------------------------------------------------------

print("[urhox-mmo-social] Initializing MMO Social System...")

-- =================== 基础工具函数 ===================

function IsServer()
    local network = GetSubsystem("Network")
    return network:IsServerRunning()
end

function IsClient()
    local network = GetSubsystem("Network")
    return network:GetServerConnection() ~= nil
end

function IsHeadless()
    local engine = GetSubsystem("Engine")
    return engine:IsHeadless()
end

function GetNetwork()
    return GetSubsystem("Network")
end

function GetTime()
    return GetSubsystem("Time")
end

function GetFileSystem()
    return GetSubsystem("FileSystem")
end

-- =================== Lua Table 持久化工具 ===================

function SerializeTable(tbl, indent)
    indent = indent or 0
    if type(tbl) ~= "table" then
        error("SerializeTable expects a table")
    end
    local lines = {}
    local prefix = string.rep("  ", indent)
    table.insert(lines, "{")
    for k, v in pairs(tbl) do
        local line = prefix .. "  "
        if type(k) == "string" and k:match("^[a-zA-Z_][a-zA-Z0-9_]*$") then
            line = line .. k .. " = "
        elseif type(k) == "number" then
            line = line .. "[" .. tostring(k) .. "] = "
        elseif type(k) == "boolean" then
            line = line .. "[" .. tostring(k) .. "] = "
        else
            line = line .. "[" .. string.format("%q", tostring(k)) .. "] = "
        end

        if type(v) == "table" then
            line = line .. SerializeTable(v, indent + 1)
        elseif type(v) == "string" then
            line = line .. string.format("%q", v)
        elseif type(v) == "boolean" then
            line = line .. tostring(v)
        elseif type(v) == "number" then
            if v == math.huge then
                line = line .. "math.huge"
            elseif v == -math.huge then
                line = line .. "-math.huge"
            else
                line = line .. tostring(v)
            end
        else
            line = line .. "nil"
        end
        table.insert(lines, line .. ",")
    end
    table.insert(lines, prefix .. "}")
    return table.concat(lines, "\n")
end

function SaveTable(path, tbl)
    local file = File:new(path, FILE_WRITE)
    if not file then return false end
    if file:IsOpen() then
        file:WriteString("return " .. SerializeTable(tbl))
        file:Close()
        return true
    end
    return false
end

function LoadTable(path)
    local file = File:new(path, FILE_READ)
    if not file then return nil end
    if file:IsOpen() then
        local content = file:ReadString()
        file:Close()
        if content and #content > 0 then
            local f, err = loadstring(content)
            if f then
                local ok, result = pcall(f)
                if ok and type(result) == "table" then
                    return result
                end
            end
        end
    end
    return nil
end

function DeepCopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for k, v in next, orig, nil do
            copy[DeepCopy(k)] = DeepCopy(v)
        end
        setmetatable(copy, DeepCopy(getmetatable(orig)))
    else
        copy = orig
    end
    return copy
end

function Clamp(val, min, max)
    return math.max(min, math.min(max, val))
end

function GenerateUUID()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return string.gsub(template, "[xy]", function(c)
        local v = (c == "x") and math.random(0, 0xf) or math.random(8, 0xb)
        return string.format("%x", v)
    end)
end

function GetTimestampSec()
    local time = os.time()
    return time
end

-- =================== 社交全局上下文 ===================

SocialContext = {
    config = {
        dbDir = "Data/SocialDB/",
        autoSaveIntervalSec = 300,
        maxPartySize = 5,
        maxGuildSize = 50,
        maxFriends = 100,
        maxMailCount = 200,
        mailExpiryDays = 30,
        chatCooldownMs = 500,
        guildCreationCost = 10000,
        maxMasterApprentices = 3,
        maxFactionSize = 100,
    },
    players = {},          -- playerId -> { connection, nickname, level, online, lastLogin }
    connectionMap = {},    -- Connection pointer string -> playerId (server only)
    nextSaveTime = 0,
    modules = {}
}

function SocialContext:RegisterModule(name, moduleInstance)
    self.modules[name] = moduleInstance
    print("[SocialContext] Module registered: " .. name)
end

function SocialContext:GetModule(name)
    return self.modules[name]
end

function SocialContext:GetDbPath(name)
    local fs = GetFileSystem()
    local path = fs:GetProgramDir() .. self.config.dbDir
    fs:CreateDir(path)
    return path .. name .. ".lua"
end

function SocialContext:GetPlayerIdByConnection(connection)
    if not connection then return nil end
    local connStr = tostring(connection)
    return self.connectionMap[connStr]
end

function SocialContext:GetConnectionByPlayerId(playerId)
    local p = self.players[playerId]
    if p then return p.connection end
    return nil
end

function SocialContext:GetPlayerData(playerId)
    return self.players[playerId]
end

function SocialContext:GetPlayerNickname(playerId)
    local p = self.players[playerId]
    if p then return p.nickname or playerId end
    return playerId
end

function SocialContext:IsOnline(playerId)
    local p = self.players[playerId]
    return p ~= nil and p.online == true
end

function SocialContext:BroadcastRemoteEvent(eventName, data)
    local net = GetNetwork()
    net:BroadcastRemoteEvent(eventName, true, data)
end

function SocialContext:SendToPlayer(playerId, eventName, data)
    local conn = self:GetConnectionByPlayerId(playerId)
    if conn then
        conn:SendRemoteEvent(eventName, true, data)
    end
end

function SocialContext:BroadcastToPlayers(playerIdList, eventName, data)
    local net = GetNetwork()
    for _, pid in ipairs(playerIdList) do
        local conn = self:GetConnectionByPlayerId(pid)
        if conn then
            conn:SendRemoteEvent(eventName, true, data)
        end
    end
end

function SocialContext:NotifyPlayer(playerId, messageType, text)
    local data = VariantMap()
    data["Type"] = tostring(messageType)
    data["Text"] = tostring(text)
    self:SendToPlayer(playerId, "SocialSystemNotify", data)
end

-- =================== 认证与连接处理 ===================

function HandleClientConnected(eventType, eventData)
    if not IsServer() then return end
    local connection = eventData["Connection"]
    if not connection then return end
    local connStr = tostring(connection)
    print("[SocialContext] Client connected: " .. connStr)
    -- 等待客户端发送 PlayerAuth 事件进行注册
end

function HandleClientDisconnected(eventType, eventData)
    if not IsServer() then return end
    local connection = eventData["Connection"]
    if not connection then return end
    local connStr = tostring(connection)
    local playerId = SocialContext.connectionMap[connStr]
    if playerId then
        print("[SocialContext] Player disconnected: " .. playerId)
        local p = SocialContext.players[playerId]
        if p then
            p.online = false
            p.connection = nil
            p.lastLogout = GetTimestampSec()
        end
        SocialContext.connectionMap[connStr] = nil
        -- 广播下线状态
        for name, mod in pairs(SocialContext.modules) do
            if type(mod.OnPlayerOffline) == "function" then
                mod:OnPlayerOffline(playerId)
            end
        end
    end
end

function HandlePlayerAuthRequest(eventType, eventData)
    if not IsServer() then return end
    local connection = eventData["Connection"]
    if not connection then return end
    local playerId = eventData["PlayerId"]:GetString()
    local nickname = eventData["Nickname"]:GetString()
    local level = eventData["Level"]:GetInt()
    if not playerId or #playerId == 0 then
        playerId = GenerateUUID()
    end
    if not nickname or #nickname == 0 then
        nickname = "Player_" .. playerId:sub(1, 6)
    end

    local connStr = tostring(connection)
    SocialContext.connectionMap[connStr] = playerId

    local existing = SocialContext.players[playerId]
    if existing then
        existing.connection = connection
        existing.online = true
        existing.nickname = nickname
        existing.level = level
        existing.lastLogin = GetTimestampSec()
    else
        SocialContext.players[playerId] = {
            connection = connection,
            playerId = playerId,
            nickname = nickname,
            level = level,
            online = true,
            lastLogin = GetTimestampSec(),
            lastLogout = 0,
            ip = connection:GetAddress()
        }
    end

    print("[SocialContext] Player authenticated: " .. playerId .. " [" .. nickname .. "]")

    -- 通知客户端认证成功
    local ack = VariantMap()
    ack["PlayerId"] = playerId
    ack["Nickname"] = nickname
    connection:SendRemoteEvent("PlayerAuthAck", true, ack)

    -- 通知各模块玩家上线
    for name, mod in pairs(SocialContext.modules) do
        if type(mod.OnPlayerOnline) == "function" then
            mod:OnPlayerOnline(playerId)
        end
    end
end

function InitAuthSystem()
    local net = GetNetwork()
    net:RegisterRemoteEvent("PlayerAuthRequest")
    SubscribeToEvent("PlayerAuthRequest", HandlePlayerAuthRequest)
    SubscribeToEvent("ClientConnected", HandleClientConnected)
    SubscribeToEvent("ClientDisconnected", HandleClientDisconnected)
end

-- =================== 自动保存 ===================

function HandleUpdate(eventType, eventData)
    local time = GetSubsystem("Time")
    local now = time:GetElapsedTime()
    if now >= SocialContext.nextSaveTime then
        SocialContext.nextSaveTime = now + SocialContext.config.autoSaveIntervalSec
        for name, mod in pairs(SocialContext.modules) do
            if type(mod.Save) == "function" then
                mod:Save()
            end
        end
        print("[SocialContext] Auto-save complete.")
    end
end

function InitAutoSave()
    local time = GetSubsystem("Time")
    if time then
        SocialContext.nextSaveTime = time:GetElapsedTime() + SocialContext.config.autoSaveIntervalSec
        SubscribeToEvent("Update", HandleUpdate)
    end
end

-- =================== 模块加载 ===================

local function LoadSocialModules()
    local Guild = require("Social/Guild")
    local Friend = require("Social/Friend")
    local Party = require("Social/Party")
    local Chat = require("Social/Chat")
    local Mail = require("Social/Mail")
    local SocialRelation = require("Social/SocialRelation")

    SocialContext:RegisterModule("Guild", Guild)
    SocialContext:RegisterModule("Friend", Friend)
    SocialContext:RegisterModule("Party", Party)
    SocialContext:RegisterModule("Chat", Chat)
    SocialContext:RegisterModule("Mail", Mail)
    SocialContext:RegisterModule("SocialRelation", SocialRelation)

    Guild:Init(SocialContext)
    Friend:Init(SocialContext)
    Party:Init(SocialContext)
    Chat:Init(SocialContext)
    Mail:Init(SocialContext)
    SocialRelation:Init(SocialContext)
end

-- =================== 入口 ===================

function Start()
    math.randomseed(os.time())
    InitAuthSystem()
    LoadSocialModules()
    InitAutoSave()

    print("[urhox-mmo-social] All systems initialized. Running as " .. (IsServer() and "SERVER" or (IsClient() and "CLIENT" or "SINGLEPLAYER")))

    -- 示例：为单机/本地测试环境创建一些模拟数据（仅限开发调试）
    if not IsServer() and not IsClient() then
        print("[urhox-mmo-social] Note: Running in single-player mode. Social features are stubbed locally.")
    end
end

function Stop()
    print("[urhox-mmo-social] Shutting down...")
    for name, mod in pairs(SocialContext.modules) do
        if type(mod.Save) == "function" then
            mod:Save()
        end
    end
end
