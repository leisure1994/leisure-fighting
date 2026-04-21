-- TaoOpenClawAdapter.lua
-- 天道引擎 · OpenClaw 环境适配层
-- 职责：在非 UrhoX 环境（如 OpenClaw 子代理 / 纯 Lua 解释器）中注入缺失的全局依赖
-- 原则：不修改原始核心代码，只提供兼容桩；代码量只增不减。

-- ═══════════════════════════════════════════════════════════════════════════
-- 一、TAO_DEBUG
-- ═══════════════════════════════════════════════════════════════════════════
TAO_DEBUG = TAO_DEBUG or false

-- ═══════════════════════════════════════════════════════════════════════════
-- 二、SimpleEncode / SimpleDecode（JSON 序列化适配）
-- ═══════════════════════════════════════════════════════════════════════════
local jsonEncoderAvailable = false
local jsonLib = nil

-- 尝试探测环境中已有的 JSON 库
if type(cjson) == "table" and cjson.encode then
    jsonLib = cjson
    jsonEncoderAvailable = true
elseif type(json) == "table" and json.encode then
    jsonLib = json
    jsonEncoderAvailable = true
elseif type(_G["dkjson"]) == "table" and _G["dkjson"].encode then
    jsonLib = _G["dkjson"]
    jsonEncoderAvailable = true
end

-- 若已有原生 JSON 库，直接映射
if jsonEncoderAvailable then
    SimpleEncode = SimpleEncode or function(val)
        local ok, result = pcall(jsonLib.encode, val)
        if ok then return result end
        return nil
    end
    SimpleDecode = SimpleDecode or function(str)
        if type(str) ~= "string" then return nil end
        local ok, result = pcall(jsonLib.decode, str)
        if ok then return result end
        return nil
    end
else
    -- 纯 Lua fallback：极简 JSON 编解码（仅支持天道引擎中常见的表结构）
    -- 注意：这是为了在没有 cjson/dkjson 的环境中保证 Mempalace Save/Load 不崩溃
    SimpleEncode = SimpleEncode or function(val)
        local t = type(val)
        if t == "nil" then return "null" end
        if t == "boolean" then return val and "true" or "false" end
        if t == "number" then return tostring(val) end
        if t == "string" then
            local out = '"' .. val:gsub('\\', '\\\\'):gsub('"', '\\"'):gsub('\n', '\\n'):gsub('\r', '\\r'):gsub('\t', '\\t') .. '"'
            return out
        end
        if t == "table" then
            local isArray = true
            local count = 0
            for k, _ in pairs(val) do
                count = count + 1
                if type(k) ~= "number" or k < 1 or k ~= math.floor(k) then
                    isArray = false
                    break
                end
            end
            if count == 0 then isArray = true end
            local parts = {}
            if isArray then
                for i = 1, count do
                    parts[i] = SimpleEncode(val[i])
                end
                return "[" .. table.concat(parts, ",") .. "]"
            else
                local i = 1
                for k, v in pairs(val) do
                    parts[i] = SimpleEncode(tostring(k)) .. ":" .. SimpleEncode(v)
                    i = i + 1
                end
                return "{" .. table.concat(parts, ",") .. "}"
            end
        end
        return "null"
    end

    SimpleDecode = SimpleDecode or function(str)
        if type(str) ~= "string" then return nil end
        str = str:gsub("^%s*", ""):gsub("%s*$", "")
        if str == "" or str == "null" then return nil end
        if str == "true" then return true end
        if str == "false" then return false end
        if str:match('^"(.-)"$') then
            return str:match('^"(.-)"$'):gsub('\\"', '"'):gsub('\\\\', '\\'):gsub('\\n', '\n'):gsub('\\r', '\r'):gsub('\\t', '\t')
        end
        local num = tonumber(str)
        if num then return num end

        -- 简单表解析（不处理嵌套字符串中的逗号/花括号）
        if str:sub(1, 1) == "{" then
            local out = {}
            local inner = str:sub(2, -2)
            local pos = 1
            while pos <= #inner do
                local keyStart, keyEnd = inner:find('"([^"]*)"%s*:', pos)
                if not keyStart then
                    keyStart, keyEnd = inner:find('(%w+)%s*:', pos)
                end
                if not keyStart then break end
                local key = inner:sub(keyStart, keyEnd):match('"?(.-)"?%s*:$')
                pos = keyEnd + 1
                local valStart = pos
                local depth = 0
                local inString = false
                while pos <= #inner do
                    local ch = inner:sub(pos, pos)
                    if ch == '"' and inner:sub(pos - 1, pos - 1) ~= "\\" then
                        inString = not inString
                    elseif not inString then
                        if ch == "{" or ch == "[" then
                            depth = depth + 1
                        elseif ch == "}" or ch == "]" then
                            depth = depth - 1
                        elseif ch == "," and depth == 0 then
                            break
                        end
                    end
                    pos = pos + 1
                end
                local valStr = inner:sub(valStart, pos - 1):gsub("^%s*", ""):gsub("%s*$", "")
                out[key] = SimpleDecode(valStr)
                if inner:sub(pos, pos) == "," then pos = pos + 1 end
            end
            return out
        elseif str:sub(1, 1) == "[" then
            local out = {}
            local inner = str:sub(2, -2)
            local pos = 1
            local idx = 1
            while pos <= #inner do
                local valStart = pos
                local depth = 0
                local inString = false
                while pos <= #inner do
                    local ch = inner:sub(pos, pos)
                    if ch == '"' and inner:sub(pos - 1, pos - 1) ~= "\\" then
                        inString = not inString
                    elseif not inString then
                        if ch == "{" or ch == "[" then
                            depth = depth + 1
                        elseif ch == "}" or ch == "]" then
                            depth = depth - 1
                        elseif ch == "," and depth == 0 then
                            break
                        end
                    end
                    pos = pos + 1
                end
                local valStr = inner:sub(valStart, pos - 1):gsub("^%s*", ""):gsub("%s*$", "")
                out[idx] = SimpleDecode(valStr)
                idx = idx + 1
                if inner:sub(pos, pos) == "," then pos = pos + 1 end
            end
            return out
        end
        return nil
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 三、GetWorldTime（时间源适配）
-- ═══════════════════════════════════════════════════════════════════════════
GetWorldTime = GetWorldTime or function()
    return os.time()
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 四、GenerateUUID（UUID v4 适配）
-- ═══════════════════════════════════════════════════════════════════════════
GenerateUUID = GenerateUUID or function()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return template:gsub("[xy]", function(c)
        local v = (c == "x") and math.random(0, 15) or math.random(8, 11)
        return string.format("%x", v)
    end)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 五、bit（位运算适配）
-- ═══════════════════════════════════════════════════════════════════════════
if type(bit) ~= "table" then
    bit = {}
    bit.band = function(a, b)
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
    bit.bor = function(a, b)
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
    bit.bxor = function(a, b)
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
    bit.lshift = function(a, b)
        return a * (2 ^ b)
    end
    bit.rshift = function(a, b)
        return math.floor(a / (2 ^ b))
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 六、EventLog（空表存根，避免 nil 引用）
-- ═══════════════════════════════════════════════════════════════════════════
EventLog = EventLog or {}
EventLog.Append = EventLog.Append or function(...) end
EventLog.GetRecent = EventLog.GetRecent or function(...) return {} end
EventLog.GetAtLocation = EventLog.GetAtLocation or function(...) return {} end
EventLog.GetForSubject = EventLog.GetForSubject or function(...) return {} end

-- ═══════════════════════════════════════════════════════════════════════════
-- 七、sqlite3 纯 Lua JSON Shim
-- 说明：让 Mempalace.Save / Load 等函数在缺少 LuaSQLite3 的环境中仍能正常运行。
--       所有数据持久化到单个 JSON 文件（tao_world_db.json），schema 保持兼容。
-- ═══════════════════════════════════════════════════════════════════════════
local _taoDbCache = nil
local _taoDbPath = "tao_world_db.json"

local function _taoDbLoadCache()
    local f = io.open(_taoDbPath, "r")
    if f then
        local content = f:read("*a")
        f:close()
        local data = SimpleDecode(content)
        if type(data) == "table" then
            _taoDbCache = data
            return
        end
    end
    _taoDbCache = {
        mempalace = {},
        mempalace_archive = {},
        mempalace_meta = {}
    }
end

local function _taoDbSaveCache()
    local f = io.open(_taoDbPath, "w")
    if not f then return end
    f:write(SimpleEncode(_taoDbCache))
    f:close()
end

local _taoStmtMeta = {}
function _taoStmtMeta:bind_values(...)
    self._bound = {...}
end
function _taoStmtMeta:step()
    if not self._sql then return end
    local sql = self._sql
    local bound = self._bound or {}

    if sql:find("DELETE FROM mempalace WHERE entity_id = %?") then
        local entityId = bound[1]
        if entityId then
            _taoDbCache.mempalace[entityId] = nil
        end
    elseif sql:find("INSERT INTO mempalace") then
        local entityId = bound[1]
        local roomName = bound[2]
        local entryData = bound[3]
        local born_t = bound[4]
        local weight = bound[5]
        if not _taoDbCache.mempalace[entityId] then
            _taoDbCache.mempalace[entityId] = {}
        end
        table.insert(_taoDbCache.mempalace[entityId], {
            entity_id = entityId,
            room_name = roomName,
            entry_data = entryData,
            born_t = born_t or 0,
            weight = weight or 1.0
        })
    elseif sql:find("DELETE FROM mempalace_archive WHERE entity_id = %?") then
        local entityId = bound[1]
        if entityId then
            _taoDbCache.mempalace_archive[entityId] = nil
        end
    elseif sql:find("INSERT INTO mempalace_archive") then
        local entityId = bound[1]
        local roomName = bound[2]
        local entryData = bound[3]
        local born_t = bound[4]
        local weight = bound[5]
        if not _taoDbCache.mempalace_archive[entityId] then
            _taoDbCache.mempalace_archive[entityId] = {}
        end
        table.insert(_taoDbCache.mempalace_archive[entityId], {
            entity_id = entityId,
            room_name = roomName,
            entry_data = entryData,
            born_t = born_t or 0,
            weight = weight or 1.0
        })
    elseif sql:find("INSERT OR REPLACE INTO mempalace_meta") then
        local entityId = bound[1]
        _taoDbCache.mempalace_meta[entityId] = {
            entity_id = entityId,
            hard_locks = bound[2],
            wake_words = bound[3],
            persona_snapshots = bound[4],
            immune_patterns = bound[5],
            decision_log = bound[6],
            version_log = bound[7],
            indexes = bound[8],
            visual_memories = bound[9],
            gossip_registry = bound[10],
            scheduler_last_run = bound[11],
            consolidation_reports = bound[12]
        }
    end
    _taoDbSaveCache()
end

function _taoStmtMeta:reset()
    self._bound = {}
end
function _taoStmtMeta:finalize()
    self._bound = nil
    self._sql = nil
end

local _taoDbMeta = {}
function _taoDbMeta:exec(sql)
    -- Mempalace 只使用 CREATE TABLE / CREATE INDEX，无需真正执行
    if TAO_DEBUG then print("[sqlite3-shim] exec:", sql:sub(1, 50)) end
end

function _taoDbMeta:prepare(sql)
    local stmt = {}
    stmt._sql = sql:gsub("%%%?", "?") -- normalize
    setmetatable(stmt, {__index = _taoStmtMeta})
    return stmt
end

function _taoDbMeta:nrows(sql)
    _taoDbLoadCache()
    local rows = {}
    if sql:find("FROM mempalace WHERE entity_id = '") then
        local entityId = sql:match("entity_id = '([^']+)'")
        if entityId and _taoDbCache.mempalace[entityId] then
            for _, r in ipairs(_taoDbCache.mempalace[entityId]) do
                table.insert(rows, r)
            end
        end
    elseif sql:find("FROM mempalace_archive WHERE entity_id = '") then
        local entityId = sql:match("entity_id = '([^']+)'")
        if entityId and _taoDbCache.mempalace_archive[entityId] then
            for _, r in ipairs(_taoDbCache.mempalace_archive[entityId]) do
                table.insert(rows, r)
            end
        end
    elseif sql:find("FROM mempalace_meta WHERE entity_id = '") then
        local entityId = sql:match("entity_id = '([^']+)'")
        if entityId and _taoDbCache.mempalace_meta[entityId] then
            table.insert(rows, _taoDbCache.mempalace_meta[entityId])
        end
    elseif sql:find("SELECT DISTINCT entity_id FROM mempalace") then
        local seen = {}
        for entityId, _ in pairs(_taoDbCache.mempalace) do
            if not seen[entityId] then
                seen[entityId] = true
                table.insert(rows, {entity_id = entityId})
            end
        end
        for entityId, _ in pairs(_taoDbCache.mempalace_archive) do
            if not seen[entityId] then
                seen[entityId] = true
                table.insert(rows, {entity_id = entityId})
            end
        end
    elseif sql:find("FROM mempalace ") and sql:find("WHERE ") then
        -- 通用 fallback：把所有 mempalace 数据展平
        for entityId, list in pairs(_taoDbCache.mempalace) do
            for _, r in ipairs(list) do
                table.insert(rows, r)
            end
        end
    end
    local i = 0
    return function()
        i = i + 1
        return rows[i]
    end
end

function _taoDbMeta:close()
    _taoDbSaveCache()
end

if type(sqlite3) ~= "table" then
    sqlite3 = {}
    sqlite3.open = function(path)
        if TAO_DEBUG then print("[sqlite3-shim] open:", path) end
        _taoDbLoadCache()
        local db = {}
        setmetatable(db, {__index = _taoDbMeta})
        return db
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 八、UrhoX 引擎专属函数空桩（防止 AgentCore 等模块加载时崩溃）
-- ═══════════════════════════════════════════════════════════════════════════
SubscribeToEvent = SubscribeToEvent or function(...) end
UnsubscribeFromEvent = UnsubscribeFromEvent or function(...) end
SendEvent = SendEvent or function(...) end
VariantMap = VariantMap or function() return {} end
Vector3 = Vector3 or function(x, y, z) return {x = x or 0, y = y or 0, z = z or 0} end
IntVector2 = IntVector2 or function(x, y) return {x = x or 0, y = y or 0} end
Quaternion = Quaternion or function() return {} end
Color = Color or function(r, g, b, a) return {r = r or 1, g = g or 1, b = b or 1, a = a or 1} end
Rect = Rect or function() return {} end
StringHash = StringHash or function(s) return s end

-- ═══════════════════════════════════════════════════════════════════════════
-- 九、场景 / 网络 / 物理 / 资源 / UI 空桩
-- ═══════════════════════════════════════════════════════════════════════════
_sceneCtx = {}
Node = Node or {
    CreateChild = function(...) return Node end,
    RemoveChild = function(...) end,
    SetPosition = function(...) end,
    GetPosition = function(...) return Vector3() end,
    CreateComponent = function(...) return {} end,
    GetComponent = function(...) return {} end,
}
Scene = Scene or {
    CreateChild = function(...) return Node end,
    GetChild = function(...) return Node end,
    InstantiateXML = function(...) return Node end,
}
Connection = Connection or {
    SendMessage = function(...) end,
    SendRemoteEvent = function(...) end,
}
Network = Network or {
    GetServerConnection = function(...) return Connection end,
}
ResourceCache = ResourceCache or {
    GetResource = function(...) return {} end,
}
Renderer = Renderer or {
    GetViewport = function(...) return {} end,
}
Viewport = Viewport or {
    GetScene = function(...) return Scene end,
    GetCamera = function(...) return {} end,
}
Camera = Camera or {
    WorldToScreenPoint = function(...) return Vector3() end,
}
PhysicsWorld = PhysicsWorld or {
    RaycastSingle = function(...) return nil end,
}
Input = Input or {
    GetMousePosition = function(...) return IntVector2() end,
    GetKeyDown = function(...) return false end,
    GetTouch = function(...) return {} end,
}
Graphics = Graphics or {
    GetWidth = function(...) return 1920 end,
    GetHeight = function(...) return 1080 end,
}
UI = UI or {
    GetRoot = function(...) return {} end,
    LoadLayout = function(...) return {} end,
}
Text = Text or {
    SetText = function(...) end,
    SetPosition = function(...) end,
}
LineEdit = LineEdit or {
    GetText = function(...) return "" end,
}
Button = Button or {
    SetPressed = function(...) end,
}
Text3D = Text3D or {
    SetText = function(...) end,
    SetPosition = function(...) end,
}
ParticleEmitter = ParticleEmitter or {
    SetEmitting = function(...) end,
}
AnimatedModel = AnimatedModel or {
    Play = function(...) end,
}
StaticModel = StaticModel or {
    SetModel = function(...) end,
}
RigidBody = RigidBody or {
    ApplyImpulse = function(...) end,
}
CollisionShape = CollisionShape or {
    SetBox = function(...) end,
}
Navigable = Navigable or function() return {} end
NavigationMesh = NavigationMesh or {
    FindPath = function(...) return {} end,
}
Octree = Octree or function() return {} end
DebugRenderer = DebugRenderer or {
    AddLine = function(...) end,
}
SoundSource = SoundSource or {
    Play = function(...) end,
}
FileSystem = FileSystem or {
    CreateDir = function(...) end,
    FileExists = function(...) return false end,
}
Log = Log or {
    Write = function(...) end,
}
Time = Time or {
    GetTimeStep = function(...) return 0.016 end,
}
Engine = Engine or {
    Exit = function(...) end,
}
XMLFile = XMLFile or function() return {} end
JSONFile = JSONFile or function() return {} end
_luaFileRead = function(path)
    local f = io.open(path, "r")
    if not f then return nil end
    local c = f:read("*a")
    f:close()
    return c
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 十、打印适配完成日志（仅在 TAO_DEBUG 时可见）
-- ═══════════════════════════════════════════════════════════════════════════
if TAO_DEBUG then
    print("[TaoOpenClawAdapter] 适配层加载完成。环境依赖已注入。")
end
