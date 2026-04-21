-- Shared.lua
-- 天道引擎 · 网络共享层 + 远程事件注册表 + JSON 工具箱 + RPC + 消息队列 + 分片 + 压缩
-- 职责：注册所有 Client <-> Server 远程事件、序列化、消息队列、RPC、压缩、握手

-- ═══════════════════════════════════════════════════════════════════════════
-- 网络事件分类常量
-- ═══════════════════════════════════════════════════════════════════════════
TAO_EVENT_CATEGORY = {
    SYSTEM          = 0x01,
    DERIVATION      = 0x02,
    NPC             = 0x03,
    REGION          = 0x04,
    TRADE           = 0x05,
    PARTY           = 0x06,
    STATE_SYNC      = 0x07,
    DEBUG           = 0x08,
    KEY_PROXY       = 0x09,
    MEMPALACE       = 0x0A,
}

TAO_REMOTE_EVENTS = {
    -- Client -> Server
    C2S_SET_PLAYER_API_KEY      = "SetPlayerAPIKey",
    C2S_SET_PROVIDER_API_KEY    = "SetProviderAPIKey",
    C2S_REQUEST_NPC_DIALOG      = "RequestNpcDialog",
    C2S_PLAYER_WORLD_INTERACTION = "PlayerWorldInteraction",
    C2S_REQUEST_REGION_INFO     = "RequestRegionInfo",
    C2S_TRADE_REQUEST           = "TradeRequest",
    C2S_TRADE_ACCEPT            = "TradeAccept",
    C2S_TRADE_CANCEL            = "TradeCancel",
    C2S_PARTY_INVITE            = "PartyInvite",
    C2S_PARTY_ACCEPT            = "PartyAccept",
    C2S_PARTY_LEAVE             = "PartyLeave",
    C2S_STREAM_POLL             = "StreamPoll",
    C2S_DEBUG_QUERY             = "DebugQuery",
    C2S_RPC_CALL                = "RpcCall",
    C2S_HANDSHAKE               = "Handshake",
    C2S_HEARTBEAT               = "Heartbeat",
    C2S_FRAGMENT                = "Fragment",

    -- Server -> Client
    S2C_TAO_NARRATIVE           = "TaoNarrative",
    S2C_NPC_ACTION_BUBBLE       = "NpcActionBubble",
    S2C_API_KEY_ACCEPTED        = "ApiKeyAccepted",
    S2C_API_KEY_REJECTED        = "ApiKeyRejected",
    S2C_PROVIDER_KEY_ACCEPTED   = "ProviderKeyAccepted",
    S2C_PROVIDER_KEY_REJECTED   = "ProviderKeyRejected",
    S2C_REGION_DISCOVERY        = "RegionDiscovery",
    S2C_REGION_UPDATE           = "RegionUpdate",
    S2C_WORLD_STATE_UPDATE      = "WorldStateUpdate",
    S2C_WORLD_STATE_DELTA       = "WorldStateDelta",
    S2C_NPC_STRATEGY_RESULT     = "NpcStrategyResult",
    S2C_NPC_EMOTION_UPDATE      = "NpcEmotionUpdate",
    S2C_TRADE_OFFER             = "TradeOffer",
    S2C_TRADE_RESULT            = "TradeResult",
    S2C_PARTY_UPDATE            = "PartyUpdate",
    S2C_STREAM_CHUNK            = "StreamChunk",
    S2C_STREAM_DONE             = "StreamDone",
    S2C_DEBUG_RESPONSE          = "DebugResponse",
    S2C_SYSTEM_MESSAGE          = "SystemMessage",
    S2C_RPC_RESPONSE            = "RpcResponse",
    S2C_HANDSHAKE_ACK           = "HandshakeAck",
    S2C_HEARTBEAT_ACK           = "HeartbeatAck",
    S2C_FRAGMENT_ACK            = "FragmentAck",
}

-- ═══════════════════════════════════════════════════════════════════════════
-- 错误码定义
-- ═══════════════════════════════════════════════════════════════════════════
TAO_ERROR_CODES = {
    OK                      = 0,
    UNKNOWN_ERROR           = 1000,
    JSON_ENCODE_FAILED      = 1001,
    JSON_DECODE_FAILED      = 1002,
    RPC_TIMEOUT             = 1003,
    RPC_NO_HANDLER          = 1004,
    NETWORK_UNREACHABLE     = 1005,
    AUTH_FAILED             = 1006,
    VERSION_MISMATCH        = 1007,
    PACKET_TOO_LARGE        = 1008,
    FRAGMENT_LOST           = 1009,
    COMPRESSION_FAILED      = 1010,
    DECOMPRESSION_FAILED    = 1011,
    INVALID_PARAMS          = 1012,
    SERVER_BUSY             = 1013,
    MODULE_NOT_LOADED       = 1014,
}

TAO_ERROR_NAMES = {}
for name, code in pairs(TAO_ERROR_CODES) do
    TAO_ERROR_NAMES[code] = name
end

function TaoErrorString(code)
    return TAO_ERROR_NAMES[code] or ("UNKNOWN_" .. tostring(code))
end

function TaoMakeError(code, message, extra)
    return {
        code = code or TAO_ERROR_CODES.UNKNOWN_ERROR,
        message = message or TaoErrorString(code),
        extra = extra or {},
        timestamp = os.time()
    }
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 远程事件注册
-- ═══════════════════════════════════════════════════════════════════════════
function RegisterTaoRemoteEvents()
    local events = {
        TAO_REMOTE_EVENTS.C2S_SET_PLAYER_API_KEY,
        TAO_REMOTE_EVENTS.C2S_SET_PROVIDER_API_KEY,
        TAO_REMOTE_EVENTS.C2S_REQUEST_NPC_DIALOG,
        TAO_REMOTE_EVENTS.C2S_PLAYER_WORLD_INTERACTION,
        TAO_REMOTE_EVENTS.C2S_REQUEST_REGION_INFO,
        TAO_REMOTE_EVENTS.C2S_TRADE_REQUEST,
        TAO_REMOTE_EVENTS.C2S_TRADE_ACCEPT,
        TAO_REMOTE_EVENTS.C2S_TRADE_CANCEL,
        TAO_REMOTE_EVENTS.C2S_PARTY_INVITE,
        TAO_REMOTE_EVENTS.C2S_PARTY_ACCEPT,
        TAO_REMOTE_EVENTS.C2S_PARTY_LEAVE,
        TAO_REMOTE_EVENTS.C2S_STREAM_POLL,
        TAO_REMOTE_EVENTS.C2S_DEBUG_QUERY,
        TAO_REMOTE_EVENTS.C2S_RPC_CALL,
        TAO_REMOTE_EVENTS.C2S_HANDSHAKE,
        TAO_REMOTE_EVENTS.C2S_HEARTBEAT,
        TAO_REMOTE_EVENTS.C2S_FRAGMENT,
        TAO_REMOTE_EVENTS.S2C_TAO_NARRATIVE,
        TAO_REMOTE_EVENTS.S2C_WORLD_STATE_UPDATE,
        TAO_REMOTE_EVENTS.S2C_WORLD_STATE_DELTA,
        TAO_REMOTE_EVENTS.S2C_NPC_ACTION_BUBBLE,
        TAO_REMOTE_EVENTS.S2C_NPC_STRATEGY_RESULT,
        TAO_REMOTE_EVENTS.S2C_NPC_EMOTION_UPDATE,
        TAO_REMOTE_EVENTS.S2C_API_KEY_ACCEPTED,
        TAO_REMOTE_EVENTS.S2C_API_KEY_REJECTED,
        TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_ACCEPTED,
        TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_REJECTED,
        TAO_REMOTE_EVENTS.S2C_SYSTEM_MESSAGE,
        TAO_REMOTE_EVENTS.S2C_REGION_DISCOVERY,
        TAO_REMOTE_EVENTS.S2C_REGION_UPDATE,
        TAO_REMOTE_EVENTS.S2C_TRADE_OFFER,
        TAO_REMOTE_EVENTS.S2C_TRADE_RESULT,
        TAO_REMOTE_EVENTS.S2C_PARTY_UPDATE,
        TAO_REMOTE_EVENTS.S2C_STREAM_CHUNK,
        TAO_REMOTE_EVENTS.S2C_STREAM_DONE,
        TAO_REMOTE_EVENTS.S2C_DEBUG_RESPONSE,
        TAO_REMOTE_EVENTS.S2C_RPC_RESPONSE,
        TAO_REMOTE_EVENTS.S2C_HANDSHAKE_ACK,
        TAO_REMOTE_EVENTS.S2C_HEARTBEAT_ACK,
        TAO_REMOTE_EVENTS.S2C_FRAGMENT_ACK,
    }
    if network then
        for _, evt in ipairs(events) do
            pcall(function() network:RegisterRemoteEvent(evt) end)
        end
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 类型辅助函数
-- ═══════════════════════════════════════════════════════════════════════════
function IsArray(t)
    if type(t) ~= "table" then return false end
    local maxIndex = 0
    local count = 0
    for k, _ in pairs(t) do
        if type(k) ~= "number" or k <= 0 or math.floor(k) ~= k then
            return false
        end
        if k > maxIndex then maxIndex = k end
        count = count + 1
    end
    return maxIndex == count
end

function IsEmptyTable(t)
    return type(t) == "table" and next(t) == nil
end

function DeepCopy(value, seen)
    seen = seen or {}
    local t = type(value)
    if t ~= "table" then return value end
    if seen[value] then return seen[value] end
    local copy = {}
    seen[value] = copy
    for k, v in pairs(value) do
        copy[DeepCopy(k, seen)] = DeepCopy(v, seen)
    end
    return copy
end

function MergeTables(base, override)
    local result = DeepCopy(base or {})
    if type(override) == "table" then
        for k, v in pairs(override) do
            if type(result[k]) == "table" and type(v) == "table" and not IsArray(v) then
                result[k] = MergeTables(result[k], v)
            else
                result[k] = DeepCopy(v)
            end
        end
    end
    return result
end

function TableKeys(t)
    local keys = {}
    for k, _ in pairs(t) do table.insert(keys, k) end
    return keys
end

function TableValues(t)
    local values = {}
    for _, v in pairs(t) do table.insert(values, v) end
    return values
end

function Clamp(val, min, max)
    return math.max(min, math.min(max, val))
end

function Lerp(a, b, t)
    return a + (b - a) * t
end

function Sign(x)
    return x > 0 and 1 or (x < 0 and -1 or 0)
end

function Round(x)
    return math.floor(x + 0.5)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- Unicode 工具
-- ═══════════════════════════════════════════════════════════════════════════
function Utf8Length(str)
    if type(str) ~= "string" then return 0 end
    local len = 0
    for _ in str:gmatch("[%z\1-\127\194-\244][\128-\191]*") do
        len = len + 1
    end
    return len
end

function Utf8Truncate(str, maxLen)
    if type(str) ~= "string" then return "" end
    if Utf8Length(str) <= maxLen then return str end
    local result = {}
    local count = 0
    for char in str:gmatch("[%z\1-\127\194-\244][\128-\191]*") do
        if count >= maxLen then break end
        table.insert(result, char)
        count = count + 1
    end
    return table.concat(result)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 位运算工具（Lua 5.1 兼容）
-- ═══════════════════════════════════════════════════════════════════════════
BitOps = BitOps or {}

function BitOps.And(a, b)
    local result = 0
    local bitval = 1
    while a > 0 and b > 0 do
        if a % 2 == 1 and b % 2 == 1 then
            result = result + bitval
        end
        bitval = bitval * 2
        a = math.floor(a / 2)
        b = math.floor(b / 2)
    end
    return result
end

function BitOps.Or(a, b)
    local result = 0
    local bitval = 1
    while a > 0 or b > 0 do
        if a % 2 == 1 or b % 2 == 1 then
            result = result + bitval
        end
        bitval = bitval * 2
        a = math.floor(a / 2)
        b = math.floor(b / 2)
    end
    return result
end

function BitOps.Xor(a, b)
    local result = 0
    local bitval = 1
    while a > 0 or b > 0 do
        if a % 2 ~= b % 2 then
            result = result + bitval
        end
        bitval = bitval * 2
        a = math.floor(a / 2)
        b = math.floor(b / 2)
    end
    return result
end

function BitOps.Not(a)
    return -1 - a
end

function BitOps.LShift(a, n)
    return a * (2 ^ n)
end

function BitOps.RShift(a, n)
    return math.floor(a / (2 ^ n))
end

function BitOps.ToBytes(val, byteCount)
    byteCount = byteCount or 4
    local bytes = {}
    for i = 1, byteCount do
        bytes[i] = BitOps.And(val, 0xFF)
        val = BitOps.RShift(val, 8)
    end
    return bytes
end

function BitOps.FromBytes(bytes)
    local val = 0
    for i = #bytes, 1, -1 do
        val = BitOps.LShift(val, 8) + bytes[i]
    end
    return val
end

-- ═══════════════════════════════════════════════════════════════════════════
-- UUID 生成（简单版，足够用于网络分片标识）
-- ═══════════════════════════════════════════════════════════════════════════
function GenerateUUID()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return template:gsub("[xy]", function(c)
        local v = (c == "x") and math.random(0, 0xF) or math.random(8, 0xB)
        return string.format("%x", v)
    end)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 颜色 / 向量序列化辅助
-- ═══════════════════════════════════════════════════════════════════════════
function SerializeColor(r, g, b, a)
    a = a or 255
    return string.format("#%02X%02X%02X%02X",
        Clamp(math.floor(r), 0, 255),
        Clamp(math.floor(g), 0, 255),
        Clamp(math.floor(b), 0, 255),
        Clamp(math.floor(a), 0, 255))
end

function DeserializeColor(hex)
    if type(hex) ~= "string" then return nil end
    hex = hex:gsub("#", "")
    if #hex == 6 then
        return tonumber(hex:sub(1,2), 16), tonumber(hex:sub(3,4), 16), tonumber(hex:sub(5,6), 16), 255
    elseif #hex == 8 then
        return tonumber(hex:sub(1,2), 16), tonumber(hex:sub(3,4), 16), tonumber(hex:sub(5,6), 16), tonumber(hex:sub(7,8), 16)
    end
    return nil
end

function SerializeVector2(x, y)
    return string.format("%.4f,%.4f", x or 0, y or 0)
end

function DeserializeVector2(str)
    if type(str) ~= "string" then return 0, 0 end
    local x, y = str:match("^([%d%-%.]+),([%d%-%.]+)$")
    return tonumber(x) or 0, tonumber(y) or 0
end

function SerializeVector3(x, y, z)
    return string.format("%.4f,%.4f,%.4f", x or 0, y or 0, z or 0)
end

function DeserializeVector3(str)
    if type(str) ~= "string" then return 0, 0, 0 end
    local x, y, z = str:match("^([%d%-%.]+),([%d%-%.]+),([%d%-%.]+)$")
    return tonumber(x) or 0, tonumber(y) or 0, tonumber(z) or 0
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 压缩 / 解压（RLE + 简单 LZ77）
-- ═══════════════════════════════════════════════════════════════════════════
Compression = Compression or {}

function Compression.RLECompress(data)
    if type(data) ~= "string" then return nil, "输入必须是字符串" end
    local result = {}
    local i = 1
    local n = #data
    while i <= n do
        local count = 1
        local c = data:sub(i, i)
        while i + count <= n and data:sub(i + count, i + count) == c and count < 255 do
            count = count + 1
        end
        if count >= 4 then
            table.insert(result, "\0")
            table.insert(result, string.char(count))
            table.insert(result, c)
            i = i + count
        else
            table.insert(result, c)
            i = i + 1
        end
    end
    return table.concat(result)
end

function Compression.RLEDecompress(data)
    if type(data) ~= "string" then return nil, "输入必须是字符串" end
    local result = {}
    local i = 1
    local n = #data
    while i <= n do
        local c = data:sub(i, i)
        if c == "\0" and i + 2 <= n then
            local count = data:byte(i + 1)
            local ch = data:sub(i + 2, i + 2)
            table.insert(result, string.rep(ch, count))
            i = i + 3
        else
            table.insert(result, c)
            i = i + 1
        end
    end
    return table.concat(result)
end

function Compression.LZ77Compress(data, windowSize)
    if type(data) ~= "string" then return nil, "输入必须是字符串" end
    windowSize = windowSize or 256
    local result = {}
    local i = 1
    local n = #data
    while i <= n do
        local bestLen = 0
        local bestDist = 0
        local windowStart = math.max(1, i - windowSize)
        for j = windowStart, i - 1 do
            local len = 0
            while i + len <= n and data:sub(j + len, j + len) == data:sub(i + len, i + len) and len < 255 do
                len = len + 1
            end
            if len > bestLen then
                bestLen = len
                bestDist = i - j
            end
        end
        if bestLen >= 4 then
            table.insert(result, "\0")
            table.insert(result, string.char(bestDist))
            table.insert(result, string.char(bestLen))
            table.insert(result, data:sub(i + bestLen, i + bestLen))
            i = i + bestLen + 1
        else
            table.insert(result, data:sub(i, i))
            i = i + 1
        end
    end
    return table.concat(result)
end

function Compression.LZ77Decompress(data)
    if type(data) ~= "string" then return nil, "输入必须是字符串" end
    local result = {}
    local i = 1
    local n = #data
    while i <= n do
        local c = data:sub(i, i)
        if c == "\0" and i + 3 <= n then
            local dist = data:byte(i + 1)
            local len = data:byte(i + 2)
            local nextChar = data:sub(i + 3, i + 3)
            local startPos = #result - dist + 1
            for k = 1, len do
                local idx = startPos + ((k - 1) % dist)
                table.insert(result, result[idx])
            end
            table.insert(result, nextChar)
            i = i + 4
        else
            table.insert(result, c)
            i = i + 1
        end
    end
    return table.concat(result)
end

function Compression.Compress(data, useLZ77)
    useLZ77 = useLZ77 or false
    local compressed, err
    if useLZ77 then
        compressed, err = Compression.LZ77Compress(data)
    else
        compressed, err = Compression.RLECompress(data)
    end
    if not compressed then return nil, err end
    if #compressed < #data then
        return compressed, (useLZ77 and "lz77" or "rle")
    else
        return data, "none"
    end
end

function Compression.Decompress(data, method)
    method = method or "rle"
    if method == "none" or method == "" then return data end
    if method == "rle" then return Compression.RLEDecompress(data) end
    if method == "lz77" then return Compression.LZ77Decompress(data) end
    return nil, "未知压缩方法: " .. tostring(method)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 包分片 / 重组
-- ═══════════════════════════════════════════════════════════════════════════
PacketFragmenter = PacketFragmenter or {}
PacketFragmenter.pendingPackets = PacketFragmenter.pendingPackets or {}
PacketFragmenter.maxFragmentSize = 1200  -- 小于 MTU

function PacketFragmenter.Fragment(packetId, data, maxSize)
    maxSize = maxSize or PacketFragmenter.maxFragmentSize
    if type(data) ~= "string" then return nil, "数据必须是字符串" end
    if #data <= maxSize then
        return {{id = packetId, index = 1, total = 1, payload = data}}
    end
    local fragments = {}
    local total = math.ceil(#data / maxSize)
    for i = 1, total do
        local startPos = (i - 1) * maxSize + 1
        local endPos = math.min(i * maxSize, #data)
        table.insert(fragments, {
            id = packetId,
            index = i,
            total = total,
            payload = data:sub(startPos, endPos)
        })
    end
    return fragments
end

function PacketFragmenter.Reassemble(fragment)
    if not fragment or not fragment.id then return nil, "无效分片" end
    local pending = PacketFragmenter.pendingPackets[fragment.id]
    if not pending then
        pending = {
            total = fragment.total,
            received = 0,
            parts = {},
            timestamp = os.time()
        }
        PacketFragmenter.pendingPackets[fragment.id] = pending
    end
    if pending.parts[fragment.index] then
        return nil, "重复分片"
    end
    pending.parts[fragment.index] = fragment.payload
    pending.received = pending.received + 1
    if pending.received >= pending.total then
        local assembled = {}
        for i = 1, pending.total do
            table.insert(assembled, pending.parts[i])
        end
        PacketFragmenter.pendingPackets[fragment.id] = nil
        return table.concat(assembled)
    end
    return nil, "等待更多分片"
end

function PacketFragmenter.CleanupExpired(maxAge)
    maxAge = maxAge or 30
    local now = os.time()
    local expired = {}
    for id, pending in pairs(PacketFragmenter.pendingPackets) do
        if now - pending.timestamp > maxAge then
            table.insert(expired, id)
        end
    end
    for _, id in ipairs(expired) do
        PacketFragmenter.pendingPackets[id] = nil
    end
    return #expired
end

-- ═══════════════════════════════════════════════════════════════════════════
-- RPC 调用封装
-- ═══════════════════════════════════════════════════════════════════════════
TaoRPC = TaoRPC or {}
TaoRPC.callIdCounter = TaoRPC.callIdCounter or 0
TaoRPC.pendingCalls = TaoRPC.pendingCalls or {}
TaoRPC.handlers = TaoRPC.handlers or {}
TaoRPC.defaultTimeout = 10
TaoRPC.maxRetries = 2

function TaoRPC.RegisterHandler(methodName, handlerFunc)
    TaoRPC.handlers[methodName] = handlerFunc
end

function TaoRPC.UnregisterHandler(methodName)
    TaoRPC.handlers[methodName] = nil
end

function TaoRPC.GenerateCallId()
    TaoRPC.callIdCounter = TaoRPC.callIdCounter + 1
    return tostring(TaoRPC.callIdCounter) .. "_" .. tostring(os.time())
end

function TaoRPC.Call(methodName, params, targetConnection, timeout)
    timeout = timeout or TaoRPC.defaultTimeout
    local callId = TaoRPC.GenerateCallId()
    local payload = {
        callId = callId,
        method = methodName,
        params = params or {},
        timestamp = os.time()
    }
    local encoded = SimpleEncode(payload)
    local pending = {
        callId = callId,
        method = methodName,
        startTime = os.time(),
        timeout = timeout,
        retries = 0,
        callback = nil,
        result = nil,
        done = false
    }
    TaoRPC.pendingCalls[callId] = pending

    local function SendRpc()
        if network then
            if targetConnection then
                targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_RPC_CALL, true, encoded)
            else
                network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_RPC_CALL, true, encoded)
            end
        end
    end
    SendRpc()

    return {
        callId = callId,
        Wait = function(self, waitTimeout)
            waitTimeout = waitTimeout or timeout
            local start = os.time()
            while not pending.done do
                if os.time() - start > waitTimeout then
                    TaoRPC.pendingCalls[callId] = nil
                    return nil, TaoMakeError(TAO_ERROR_CODES.RPC_TIMEOUT, "RPC 调用超时: " .. methodName)
                end
                -- 在 UrhoX 中这里应该是帧更新，纯 Lua 无法真正阻塞，返回 nil 指示调用中
                return nil, TaoMakeError(TAO_ERROR_CODES.RPC_TIMEOUT, "非阻塞 RPC，请使用回调")
            end
            return pending.result, pending.error
        end,
        OnResponse = function(self, callback)
            pending.callback = callback
        end
    }
end

function TaoRPC.HandleCall(payloadStr, senderConnection)
    local payload, err = SimpleDecode(payloadStr)
    if not payload then
        return TaoRPC.SendResponse(nil, nil, TaoMakeError(TAO_ERROR_CODES.JSON_DECODE_FAILED, err), senderConnection)
    end
    local method = payload.method
    local handler = TaoRPC.handlers[method]
    if not handler then
        return TaoRPC.SendResponse(payload.callId, nil, TaoMakeError(TAO_ERROR_CODES.RPC_NO_HANDLER, "无此方法: " .. tostring(method)), senderConnection)
    end
    local ok, resultOrErr = pcall(handler, payload.params, senderConnection)
    if not ok then
        return TaoRPC.SendResponse(payload.callId, nil, TaoMakeError(TAO_ERROR_CODES.UNKNOWN_ERROR, resultOrErr), senderConnection)
    end
    if type(resultOrErr) == "table" and resultOrErr.code then
        -- 返回的是错误对象
        return TaoRPC.SendResponse(payload.callId, nil, resultOrErr, senderConnection)
    end
    return TaoRPC.SendResponse(payload.callId, resultOrErr, nil, senderConnection)
end

function TaoRPC.SendResponse(callId, result, errorObj, targetConnection)
    local payload = {
        callId = callId,
        result = result,
        error = errorObj,
        timestamp = os.time()
    }
    local encoded = SimpleEncode(payload)
    if network then
        if targetConnection then
            targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_RPC_RESPONSE, true, encoded)
        else
            network:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_RPC_RESPONSE, true, encoded)
        end
    end
end

function TaoRPC.HandleResponse(payloadStr)
    local payload, err = SimpleDecode(payloadStr)
    if not payload then return end
    local pending = TaoRPC.pendingCalls[payload.callId]
    if not pending then return end
    pending.done = true
    pending.result = payload.result
    pending.error = payload.error
    if pending.callback then
        pending.callback(payload.result, payload.error)
    end
    TaoRPC.pendingCalls[payload.callId] = nil
end

function TaoRPC.CleanupExpiredCalls()
    local now = os.time()
    local expired = {}
    for callId, pending in pairs(TaoRPC.pendingCalls) do
        if now - pending.startTime > pending.timeout then
            table.insert(expired, callId)
            if pending.callback then
                pending.callback(nil, TaoMakeError(TAO_ERROR_CODES.RPC_TIMEOUT, "RPC 调用超时: " .. pending.method))
            end
        end
    end
    for _, callId in ipairs(expired) do
        TaoRPC.pendingCalls[callId] = nil
    end
    return #expired
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 消息队列（MessageQueue）支持优先级和超时
-- ═══════════════════════════════════════════════════════════════════════════
MessageQueue = {}
MessageQueue.__index = MessageQueue

function MessageQueue.New(name)
    local mq = setmetatable({}, MessageQueue)
    mq.name = name or "default"
    mq.items = {}
    mq.sequence = 0
    mq.processedCount = 0
    mq.droppedCount = 0
    return mq
end

function MessageQueue:Enqueue(payload, priority, ttl)
    priority = priority or 0
    ttl = ttl or 300
    self.sequence = self.sequence + 1
    local item = {
        id = self.name .. "_" .. self.sequence,
        payload = payload,
        priority = priority,
        enqueueTime = os.time(),
        ttl = ttl,
        retries = 0
    }
    table.insert(self.items, item)
    -- 按优先级降序排序
    table.sort(self.items, function(a, b)
        if a.priority ~= b.priority then
            return a.priority > b.priority
        else
            return a.sequence < b.sequence
        end
    end)
    return item.id
end

function MessageQueue:Dequeue()
    self:CleanupExpired()
    if #self.items == 0 then return nil end
    local item = table.remove(self.items, 1)
    self.processedCount = self.processedCount + 1
    return item.payload, item
end

function MessageQueue:Peek()
    self:CleanupExpired()
    if #self.items == 0 then return nil end
    return self.items[1].payload, self.items[1]
end

function MessageQueue:RemoveById(id)
    for i = 1, #self.items do
        if self.items[i].id == id then
            table.remove(self.items, i)
            return true
        end
    end
    return false
end

function MessageQueue:CleanupExpired()
    local now = os.time()
    local removed = 0
    local i = 1
    while i <= #self.items do
        if now - self.items[i].enqueueTime > self.items[i].ttl then
            table.remove(self.items, i)
            removed = removed + 1
        else
            i = i + 1
        end
    end
    self.droppedCount = self.droppedCount + removed
    return removed
end

function MessageQueue:GetCount()
    self:CleanupExpired()
    return #self.items
end

function MessageQueue:Clear()
    self.items = {}
end

function MessageQueue:GetStats()
    return {
        name = self.name,
        pending = self:GetCount(),
        processed = self.processedCount,
        dropped = self.droppedCount,
        total = self.sequence
    }
end

-- 全局消息队列管理器
MessageQueueManager = MessageQueueManager or {}
MessageQueueManager.queues = MessageQueueManager.queues or {}

function MessageQueueManager.GetQueue(name)
    if not MessageQueueManager.queues[name] then
        MessageQueueManager.queues[name] = MessageQueue.New(name)
    end
    return MessageQueueManager.queues[name]
end

function MessageQueueManager.RemoveQueue(name)
    MessageQueueManager.queues[name] = nil
end

function MessageQueueManager.GetAllStats()
    local stats = {}
    for name, mq in pairs(MessageQueueManager.queues) do
        stats[name] = mq:GetStats()
    end
    return stats
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 握手协议（连接认证、版本校验）
-- ═══════════════════════════════════════════════════════════════════════════
Handshake = Handshake or {}
Handshake.VERSION = "1.2.0"
Handshake.pendingHandshakes = Handshake.pendingHandshakes or {}
Handshake.authenticatedPeers = Handshake.authenticatedPeers or {}
Handshake.timeout = 10

function Handshake.GenerateChallenge()
    local chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    local result = {}
    for i = 1, 16 do
        local idx = math.random(1, #chars)
        table.insert(result, chars:sub(idx, idx))
    end
    return table.concat(result)
end

function Handshake.BuildHello(clientVersion, authToken, extra)
    return {
        version = clientVersion or Handshake.VERSION,
        authToken = authToken or "",
        challenge = Handshake.GenerateChallenge(),
        timestamp = os.time(),
        extra = extra or {}
    }
end

function Handshake.ValidateHello(hello)
    if not hello or not hello.version then
        return false, TaoMakeError(TAO_ERROR_CODES.INVALID_PARAMS, "缺少版本号")
    end
    local majorServer = Handshake.VERSION:match("^(%d+)")
    local majorClient = hello.version:match("^(%d+)")
    if majorServer ~= majorClient then
        return false, TaoMakeError(TAO_ERROR_CODES.VERSION_MISMATCH, "主版本不匹配: server=" .. Handshake.VERSION .. " client=" .. hello.version)
    end
    if not hello.authToken or hello.authToken == "" then
        return false, TaoMakeError(TAO_ERROR_CODES.AUTH_FAILED, "缺少认证令牌")
    end
    -- 实际项目中这里应校验 token 签名
    return true, nil
end

function Handshake.SendHello(targetConnection)
    local hello = Handshake.BuildHello()
    local encoded = SimpleEncode(hello)
    if network then
        if targetConnection then
            targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_HANDSHAKE, true, encoded)
        else
            network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_HANDSHAKE, true, encoded)
        end
    end
    return hello.challenge
end

function Handshake.SendAck(success, errorObj, challengeResponse, targetConnection)
    local ack = {
        success = success,
        error = errorObj,
        challengeResponse = challengeResponse or "",
        serverVersion = Handshake.VERSION,
        timestamp = os.time()
    }
    local encoded = SimpleEncode(ack)
    if network then
        if targetConnection then
            targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_HANDSHAKE_ACK, true, encoded)
        else
            network:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_HANDSHAKE_ACK, true, encoded)
        end
    end
end

function Handshake.MarkPeerAuthenticated(peerId)
    Handshake.authenticatedPeers[peerId] = os.time()
end

function Handshake.IsPeerAuthenticated(peerId)
    return Handshake.authenticatedPeers[peerId] ~= nil
end

function Handshake.DropPeer(peerId)
    Handshake.authenticatedPeers[peerId] = nil
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 心跳检测、断线识别辅助函数
-- ═══════════════════════════════════════════════════════════════════════════
HeartbeatMonitor = HeartbeatMonitor or {}
HeartbeatMonitor.peers = HeartbeatMonitor.peers or {}
HeartbeatMonitor.interval = 5
HeartbeatMonitor.timeout = 15

function HeartbeatMonitor.RegisterPeer(peerId)
    HeartbeatMonitor.peers[peerId] = {
        lastReceived = os.time(),
        lastSent = os.time(),
        missedCount = 0,
        connected = true
    }
end

function HeartbeatMonitor.UnregisterPeer(peerId)
    HeartbeatMonitor.peers[peerId] = nil
end

function HeartbeatMonitor.RecordReceived(peerId)
    local p = HeartbeatMonitor.peers[peerId]
    if p then
        p.lastReceived = os.time()
        p.missedCount = 0
        p.connected = true
    end
end

function HeartbeatMonitor.RecordSent(peerId)
    local p = HeartbeatMonitor.peers[peerId]
    if p then
        p.lastSent = os.time()
    end
end

function HeartbeatMonitor.SendHeartbeat(targetConnection)
    local payload = {timestamp = os.time(), ping = 0}
    local encoded = SimpleEncode(payload)
    if network then
        if targetConnection then
            targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_HEARTBEAT, true, encoded)
        else
            network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_HEARTBEAT, true, encoded)
        end
    end
end

function HeartbeatMonitor.SendHeartbeatAck(targetConnection, receivedAt)
    local payload = {timestamp = os.time(), receivedAt = receivedAt or os.time()}
    local encoded = SimpleEncode(payload)
    if network then
        if targetConnection then
            targetConnection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_HEARTBEAT_ACK, true, encoded)
        else
            network:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_HEARTBEAT_ACK, true, encoded)
        end
    end
end

function HeartbeatMonitor.CheckAll()
    local now = os.time()
    local disconnected = {}
    for peerId, p in pairs(HeartbeatMonitor.peers) do
        if now - p.lastReceived > HeartbeatMonitor.timeout then
            p.missedCount = p.missedCount + 1
            if p.missedCount >= 3 then
                p.connected = false
                table.insert(disconnected, peerId)
            end
        end
    end
    return disconnected
end

function HeartbeatMonitor.IsConnected(peerId)
    local p = HeartbeatMonitor.peers[peerId]
    return p and p.connected
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 统一错误处理封装
-- ═══════════════════════════════════════════════════════════════════════════
ErrorHandler = ErrorHandler or {}
ErrorHandler.loggers = ErrorHandler.loggers or {}

function ErrorHandler.RegisterLogger(category, loggerFunc)
    ErrorHandler.loggers[category] = loggerFunc
end

function ErrorHandler.Handle(err, category, context)
    category = category or "default"
    context = context or {}
    local report = {
        category = category,
        error = err,
        context = context,
        time = os.time()
    }
    local logger = ErrorHandler.loggers[category] or ErrorHandler.loggers["default"]
    if logger then
        pcall(function() logger(report) end)
    end
    -- 打印到控制台兜底
    print("[ErrorHandler] " .. tostring(category) .. ": " .. tostring(err.message or err))
    return report
end

function ErrorHandler.SafeCall(func, ...)
    local ok, result = pcall(func, ...)
    if not ok then
        return nil, TaoMakeError(TAO_ERROR_CODES.UNKNOWN_ERROR, tostring(result))
    end
    return result, nil
end

-- ═══════════════════════════════════════════════════════════════════════════
-- JSON 序列化（增强版）
-- ═══════════════════════════════════════════════════════════════════════════
function SimpleEncode(value, seen)
    seen = seen or {}
    local t = type(value)
    if t == "number" then
        if value ~= value then return "null" end
        local inf = 1 / 0
        if value == inf or value == -inf then return "null" end
        return tostring(value)
    elseif t == "boolean" then
        return value and "true" or "false"
    elseif t == "string" then
        return "\"" .. value:gsub("\\", "\\\\")
                           :gsub("\"", "\\\"")
                           :gsub("\b", "\\b")
                           :gsub("\f", "\\f")
                           :gsub("\n", "\\n")
                           :gsub("\r", "\\r")
                           :gsub("\t", "\\t")
                           :gsub("[%z\1-\31]", function(c)
                               return string.format("\\u%04x", string.byte(c))
                           end) .. "\""
    elseif t == "table" then
        if seen[value] then return "null" end
        seen[value] = true
        local nextPair = next(value)
        if nextPair == nil then return "{}" end
        local isArr = IsArray(value)
        if isArr then
            local items = {}
            for _, v in ipairs(value) do
                table.insert(items, SimpleEncode(v, seen))
            end
            return "[" .. table.concat(items, ",") .. "]"
        else
            local items = {}
            for k, v in pairs(value) do
                local keyStr
                if type(k) == "string" then
                    keyStr = "\"" .. k:gsub("\\", "\\\\"):gsub("\"", "\\\"") .. "\""
                elseif type(k) == "number" then
                    keyStr = "\"" .. tostring(k) .. "\""
                else
                    keyStr = "\"" .. tostring(k) .. "\""
                end
                table.insert(items, keyStr .. ":" .. SimpleEncode(v, seen))
            end
            return "{" .. table.concat(items, ",") .. "}"
        end
    elseif t == "nil" then
        return "null"
    else
        return "null"
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- JSON 解析（增强版）
-- ═══════════════════════════════════════════════════════════════════════════
function SimpleDecode(str)
    if type(str) ~= "string" or str == "" then
        return nil, "输入为空或非字符串"
    end
    if _G.JSONValue then
        local ok, json = pcall(function()
            local jv = JSONValue()
            if jv:FromString(str) then
                return JsonValueToLua(jv)
            end
            return nil
        end)
        if ok and json ~= nil then return json end
    end
    local result, pos = ParseJsonValue(str, 1)
    if result == nil then
        return nil, pos or "JSON 解析失败"
    end
    pos = SkipWhitespace(str, pos)
    if pos <= #str then
        return nil, "JSON 末尾存在多余字符"
    end
    return result
end

function JsonValueToLua(jv)
    if not jv then return nil end
    if jv:IsObject() then
        local t = {}
        local keys = jv:GetMemberNames()
        for _, k in ipairs(keys) do
            t[k] = JsonValueToLua(jv:Get(k))
        end
        return t
    elseif jv:IsArray() then
        local t = {}
        for i = 0, jv:GetSize() - 1 do
            table.insert(t, JsonValueToLua(jv:Get(i)))
        end
        return t
    elseif jv:IsString() then
        return jv:GetString()
    elseif jv:IsBool() then
        return jv:GetBool()
    elseif jv:IsInt() then
        return jv:GetInt()
    elseif jv:IsUInt() then
        return jv:GetUInt()
    elseif jv:IsDouble() then
        return jv:GetDouble()
    elseif jv:IsNull() then
        return nil
    else
        return nil
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 纯 Lua JSON 回退解析器
-- ═══════════════════════════════════════════════════════════════════════════
function SkipWhitespace(str, pos)
    while pos <= #str do
        local c = str:sub(pos, pos)
        if c == " " or c == "\t" or c == "\n" or c == "\r" then
            pos = pos + 1
        else
            break
        end
    end
    return pos
end

function ParseString(str, pos)
    if str:sub(pos, pos) ~= "\"" then
        return nil, pos, "字符串必须以双引号开始"
    end
    pos = pos + 1
    local result = {}
    while pos <= #str do
        local c = str:sub(pos, pos)
        if c == "\"" then
            pos = pos + 1
            return table.concat(result), pos
        elseif c == "\\" then
            pos = pos + 1
            if pos > #str then return nil, pos, "字符串转义不完整" end
            local ec = str:sub(pos, pos)
            if ec == "\"" then table.insert(result, "\"")
            elseif ec == "\\" then table.insert(result, "\\")
            elseif ec == "/" then table.insert(result, "/")
            elseif ec == "b" then table.insert(result, "\b")
            elseif ec == "f" then table.insert(result, "\f")
            elseif ec == "n" then table.insert(result, "\n")
            elseif ec == "r" then table.insert(result, "\r")
            elseif ec == "t" then table.insert(result, "\t")
            elseif ec == "u" then
                if pos + 4 > #str then return nil, pos, "Unicode 转义不完整" end
                local hex = str:sub(pos + 1, pos + 4)
                local code = tonumber(hex, 16)
                if not code then return nil, pos, "非法 Unicode 转义" end
                if code < 128 then
                    table.insert(result, string.char(code))
                elseif code < 2048 then
                    table.insert(result, string.char(192 + math.floor(code / 64), 128 + (code % 64)))
                elseif code < 55296 or code > 57343 then
                    table.insert(result, string.char(224 + math.floor(code / 4096),
                                                      128 + math.floor((code % 4096) / 64),
                                                      128 + (code % 64)))
                else
                    table.insert(result, "?")
                end
                pos = pos + 4
            else
                table.insert(result, ec)
            end
            pos = pos + 1
        else
            if c:byte() < 32 then
                return nil, pos, "字符串中包含非法控制字符"
            end
            table.insert(result, c)
            pos = pos + 1
        end
    end
    return nil, pos, "字符串未闭合"
end

function ParseNumber(str, pos)
    local startPos = pos
    local c = str:sub(pos, pos)
    if c == "-" then pos = pos + 1 end
    if pos > #str then return nil, startPos, "数字格式错误" end
    if str:sub(pos, pos) == "0" then
        pos = pos + 1
    elseif str:sub(pos, pos):match("[1-9]") then
        while pos <= #str and str:sub(pos, pos):match("%d") do
            pos = pos + 1
        end
    else
        return nil, startPos, "数字格式错误"
    end
    if pos <= #str and str:sub(pos, pos) == "." then
        pos = pos + 1
        if pos > #str or not str:sub(pos, pos):match("%d") then
            return nil, startPos, "数字小数部分格式错误"
        end
        while pos <= #str and str:sub(pos, pos):match("%d") do
            pos = pos + 1
        end
    end
    if pos <= #str and (str:sub(pos, pos) == "e" or str:sub(pos, pos) == "E") then
        pos = pos + 1
        if pos <= #str and (str:sub(pos, pos) == "+" or str:sub(pos, pos) == "-") then
            pos = pos + 1
        end
        if pos > #str or not str:sub(pos, pos):match("%d") then
            return nil, startPos, "数字指数部分格式错误"
        end
        while pos <= #str and str:sub(pos, pos):match("%d") do
            pos = pos + 1
        end
    end
    local numStr = str:sub(startPos, pos - 1)
    local num = tonumber(numStr)
    if num == nil then
        return nil, startPos, "无法解析数字"
    end
    return num, pos
end

ParseJsonValue = function(str, pos)
    pos = SkipWhitespace(str, pos)
    if pos > #str then
        return nil, pos, "JSON 输入在值预期位置结束"
    end
    local c = str:sub(pos, pos)
    if c == "{" then
        return ParseObject(str, pos)
    elseif c == "[" then
        return ParseArray(str, pos)
    elseif c == "\"" then
        return ParseString(str, pos)
    elseif str:sub(pos, pos + 3) == "true" then
        return true, pos + 4
    elseif str:sub(pos, pos + 4) == "false" then
        return false, pos + 5
    elseif str:sub(pos, pos + 3) == "null" then
        return nil, pos + 4
    elseif c == "-" or c:match("%d") then
        return ParseNumber(str, pos)
    else
        return nil, pos, "JSON 值起始字符非法: " .. c
    end
end

function ParseObject(str, pos)
    if str:sub(pos, pos) ~= "{" then
        return nil, pos, "对象必须以 { 开始"
    end
    pos = pos + 1
    local obj = {}
    pos = SkipWhitespace(str, pos)
    if str:sub(pos, pos) == "}" then
        return obj, pos + 1
    end
    while true do
        pos = SkipWhitespace(str, pos)
        if str:sub(pos, pos) ~= "\"" then
            return nil, pos, "对象键必须是字符串"
        end
        local key
        key, pos = ParseString(str, pos)
        if key == nil then return nil, pos, "对象键解析失败" end
        pos = SkipWhitespace(str, pos)
        if str:sub(pos, pos) ~= ":" then
            return nil, pos, "对象键值对缺少冒号"
        end
        pos = pos + 1
        local val
        val, pos = ParseJsonValue(str, pos)
        if val == nil then return nil, pos, "对象值解析失败" end
        obj[key] = val
        pos = SkipWhitespace(str, pos)
        local c = str:sub(pos, pos)
        if c == "," then
            pos = pos + 1
        elseif c == "}" then
            pos = pos + 1
            return obj, pos
        else
            return nil, pos, "对象解析遇到非法字符"
        end
    end
end

function ParseArray(str, pos)
    if str:sub(pos, pos) ~= "[" then
        return nil, pos, "数组必须以 [ 开始"
    end
    pos = pos + 1
    local arr = {}
    pos = SkipWhitespace(str, pos)
    if str:sub(pos, pos) == "]" then
        return arr, pos + 1
    end
    while true do
        local val
        val, pos = ParseJsonValue(str, pos)
        if val == nil then return nil, pos, "数组元素解析失败" end
        table.insert(arr, val)
        pos = SkipWhitespace(str, pos)
        local c = str:sub(pos, pos)
        if c == "," then
            pos = pos + 1
        elseif c == "]" then
            pos = pos + 1
            return arr, pos
        else
            return nil, pos, "数组解析遇到非法字符"
        end
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 哈希与校验和辅助
-- ═══════════════════════════════════════════════════════════════════════════
function FNV1aHash(str)
    if type(str) ~= "string" then str = tostring(str) end
    local hash = 2166136261
    for i = 1, #str do
        hash = BitOps.Xor(hash, str:byte(i))
        hash = hash * 16777619
        -- 模拟 32 位溢出
        hash = hash % 4294967296
    end
    return hash
end

function SimpleCRC32(str)
    if type(str) ~= "string" then str = tostring(str) end
    local crc_table = {}
    for i = 0, 255 do
        local crc = i
        for _ = 1, 8 do
            if BitOps.And(crc, 1) ~= 0 then
                crc = BitOps.Xor(BitOps.RShift(crc, 1), 0xEDB88320)
            else
                crc = BitOps.RShift(crc, 1)
            end
        end
        crc_table[i] = crc
    end
    local crc = 0xFFFFFFFF
    for i = 1, #str do
        local byte = str:byte(i)
        local idx = BitOps.Xor(BitOps.And(crc, 0xFF), byte)
        crc = BitOps.Xor(crc_table[idx], BitOps.RShift(crc, 8))
    end
    return BitOps.Xor(crc, 0xFFFFFFFF)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- URL 编码 / 解码
-- ═══════════════════════════════════════════════════════════════════════════
function UrlEncode(str)
    if type(str) ~= "string" then return "" end
    return str:gsub("([^%w%-%.%_%~])", function(c)
        return string.format("%%%02X", string.byte(c))
    end)
end

function UrlDecode(str)
    if type(str) ~= "string" then return "" end
    return str:gsub("%%(%x%x)", function(h)
        return string.char(tonumber(h, 16))
    end)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- Base64-like 编码（简单版，无填充标准兼容但足够内部使用）
-- ═══════════════════════════════════════════════════════════════════════════
local B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
function Base64Encode(data)
    if type(data) ~= "string" then data = tostring(data) end
    local result = {}
    local padding = 0
    for i = 1, #data, 3 do
        local a, b, c = data:byte(i, i + 2)
        b = b or 0
        c = c or 0
        local buffer = BitOps.LShift(a, 16) + BitOps.LShift(b, 8) + c
        table.insert(result, B64_CHARS:sub(BitOps.RShift(BitOps.And(buffer, 0xFC0000), 18) + 1, BitOps.RShift(BitOps.And(buffer, 0xFC0000), 18) + 1))
        table.insert(result, B64_CHARS:sub(BitOps.RShift(BitOps.And(buffer, 0x03F000), 12) + 1, BitOps.RShift(BitOps.And(buffer, 0x03F000), 12) + 1))
        if i + 1 <= #data then
            table.insert(result, B64_CHARS:sub(BitOps.RShift(BitOps.And(buffer, 0x000FC0), 6) + 1, BitOps.RShift(BitOps.And(buffer, 0x000FC0), 6) + 1))
        else
            table.insert(result, "=")
            padding = padding + 1
        end
        if i + 2 <= #data then
            table.insert(result, B64_CHARS:sub(BitOps.And(buffer, 0x00003F) + 1, BitOps.And(buffer, 0x00003F) + 1))
        else
            table.insert(result, "=")
            padding = padding + 1
        end
    end
    return table.concat(result)
end

function Base64Decode(data)
    if type(data) ~= "string" then return nil end
    local decodeMap = {}
    for i = 1, #B64_CHARS do
        decodeMap[B64_CHARS:sub(i, i)] = i - 1
    end
    local result = {}
    for i = 1, #data, 4 do
        local c1 = decodeMap[data:sub(i, i)] or 0
        local c2 = decodeMap[data:sub(i + 1, i + 1)] or 0
        local c3 = decodeMap[data:sub(i + 2, i + 2)] or 0
        local c4 = decodeMap[data:sub(i + 3, i + 3)] or 0
        local buffer = BitOps.LShift(c1, 18) + BitOps.LShift(c2, 12) + BitOps.LShift(c3, 6) + c4
        table.insert(result, string.char(BitOps.RShift(BitOps.And(buffer, 0xFF0000), 16)))
        if data:sub(i + 2, i + 2) ~= "=" then
            table.insert(result, string.char(BitOps.RShift(BitOps.And(buffer, 0x00FF00), 8)))
        end
        if data:sub(i + 3, i + 3) ~= "=" then
            table.insert(result, string.char(BitOps.And(buffer, 0x0000FF)))
        end
    end
    return table.concat(result)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 字符串增强工具
-- ═══════════════════════════════════════════════════════════════════════════
function StringSplit(str, delimiter)
    delimiter = delimiter or ","
    local result = {}
    for match in (str .. delimiter):gmatch("(.-)" .. delimiter) do
        table.insert(result, match)
    end
    return result
end

function StringJoin(arr, delimiter)
    delimiter = delimiter or ","
    return table.concat(arr, delimiter)
end

function StringPadLeft(str, length, padChar)
    padChar = padChar or " "
    str = tostring(str)
    while #str < length do
        str = padChar .. str
    end
    return str
end

function StringPadRight(str, length, padChar)
    padChar = padChar or " "
    str = tostring(str)
    while #str < length do
        str = str .. padChar
    end
    return str
end

function ToHexString(bytes)
    local hex = {}
    for i = 1, #bytes do
        table.insert(hex, string.format("%02X", bytes:byte(i)))
    end
    return table.concat(hex)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 表差分 / 补丁（用于状态快照对比）
-- ═══════════════════════════════════════════════════════════════════════════
function TableDiff(oldTable, newTable)
    local diff = {added = {}, removed = {}, changed = {}}
    for k, v in pairs(newTable) do
        if oldTable[k] == nil then
            diff.added[k] = DeepCopy(v)
        elseif type(v) == "table" and type(oldTable[k]) == "table" then
            local subDiff = TableDiff(oldTable[k], v)
            if next(subDiff.added) or next(subDiff.removed) or next(subDiff.changed) then
                diff.changed[k] = subDiff
            end
        elseif v ~= oldTable[k] then
            diff.changed[k] = DeepCopy(v)
        end
    end
    for k, v in pairs(oldTable) do
        if newTable[k] == nil then
            diff.removed[k] = DeepCopy(v)
        end
    end
    return diff
end

function TablePatch(baseTable, diff)
    local result = DeepCopy(baseTable)
    for k, v in pairs(diff.added or {}) do
        result[k] = DeepCopy(v)
    end
    for k, _ in pairs(diff.removed or {}) do
        result[k] = nil
    end
    for k, v in pairs(diff.changed or {}) do
        if type(v) == "table" and v.added and v.removed and v.changed then
            result[k] = TablePatch(result[k] or {}, v)
        else
            result[k] = DeepCopy(v)
        end
    end
    return result
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 网络包编解码辅助（头部 + 标志位）
-- ═══════════════════════════════════════════════════════════════════════════
PacketCodec = PacketCodec or {}

function PacketCodec.EncodeHeader(flags, payloadLength, sequenceId)
    flags = flags or 0
    payloadLength = payloadLength or 0
    sequenceId = sequenceId or 0
    local bytes = {}
    -- 4 bytes magic
    bytes[1] = 0x54; bytes[2] = 0x41; bytes[3] = 0x4F; bytes[4] = 0x01
    -- 1 byte flags
    bytes[5] = BitOps.And(flags, 0xFF)
    -- 4 bytes length
    local lenBytes = BitOps.ToBytes(payloadLength, 4)
    for i = 1, 4 do bytes[5 + i] = lenBytes[i] end
    -- 4 bytes sequence
    local seqBytes = BitOps.ToBytes(sequenceId, 4)
    for i = 1, 4 do bytes[9 + i] = seqBytes[i] end
    return bytes
end

function PacketCodec.DecodeHeader(bytes)
    if #bytes < 13 then return nil, "头部不足 13 字节" end
    local magic = string.char(bytes[1], bytes[2], bytes[3], bytes[4])
    if magic ~= "TAO\1" then return nil, "Magic 不匹配" end
    local flags = bytes[5]
    local lenBytes = {bytes[6], bytes[7], bytes[8], bytes[9]}
    local seqBytes = {bytes[10], bytes[11], bytes[12], bytes[13]}
    return {
        flags = flags,
        payloadLength = BitOps.FromBytes(lenBytes),
        sequenceId = BitOps.FromBytes(seqBytes)
    }
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 限流器（Token Bucket 简化版）
-- ═══════════════════════════════════════════════════════════════════════════
RateLimiter = RateLimiter or {}
RateLimiter.buckets = RateLimiter.buckets or {}

function RateLimiter.CreateBucket(name, rate, capacity)
    RateLimiter.buckets[name] = {
        tokens = capacity,
        rate = rate,
        capacity = capacity,
        lastTime = os.time()
    }
end

function RateLimiter.Consume(name, tokens)
    local bucket = RateLimiter.buckets[name]
    if not bucket then return true end
    local now = os.time()
    local elapsed = now - bucket.lastTime
    bucket.tokens = math.min(bucket.capacity, bucket.tokens + elapsed * bucket.rate)
    bucket.lastTime = now
    if bucket.tokens >= tokens then
        bucket.tokens = bucket.tokens - tokens
        return true
    end
    return false
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 全局暴露
-- ═══════════════════════════════════════════════════════════════════════════
_G.ParseJsonValue = ParseJsonValue
_G.SkipWhitespace = SkipWhitespace
