-- ConfigManager.lua
-- 基于 Urho3D Empty Project 的 ConfigManager 改写的纯 Lua 配置管理器
-- 支持 JSON 持久化、分层 Section、类型安全读取

local CONFIG_MANAGER = {}
CONFIG_MANAGER.__index = CONFIG_MANAGER

--- 默认配置文件路径
local DEFAULT_CONFIG_FILE = "Data/Config/config.json"

--- 是否区分大小写
local CASE_SENSITIVE = false

--- 当参数不存在时是否自动保存默认值
local SAVE_DEFAULT_PARAMETERS = true

--- 内部配置表：section -> { parameter -> value }
local configMap = {}

--- 当前使用的配置文件名
local currentFileName = DEFAULT_CONFIG_FILE

--- 将字符串键转换为统一大小写（当不区分大小时）
-- @param key string 原始键
-- @return string 处理后的键
local function NormalizeKey(key)
    if CASE_SENSITIVE then
        return key
    end
    return string.lower(tostring(key))
end

--- 分割段落路径，例如 "audio.master" -> {"audio", "master"}
-- @param section string 段落路径
-- @return table 分割后的路径表
local function SplitSection(section)
    local result = {}
    local s = tostring(section or "")
    for part in string.gmatch(s, "[^./]+") do
        table.insert(result, NormalizeKey(part))
    end
    return result
end

--- 获取或创建子配置表
-- @param section string 段落路径
-- @param create boolean 不存在时是否创建
-- @return table|nil 配置子表
local function GetSectionMap(section, create)
    local parts = SplitSection(section)
    if #parts == 0 then
        return configMap
    end

    local current = configMap
    for _, part in ipairs(parts) do
        if current[part] == nil then
            if create then
                current[part] = {}
            else
                return nil
            end
        elseif type(current[part]) ~= "table" then
            return nil
        end
        current = current[part]
    end
    return current
end

--- 新建 ConfigManager 实例
-- @param fileName string 配置文件路径（可选）
-- @param caseSensitive boolean 是否区分大小写（可选）
-- @param saveDefaultParams boolean 是否自动保存默认值（可选）
-- @return table ConfigManager 实例
function CONFIG_MANAGER.New(fileName, caseSensitive, saveDefaultParams)
    local self = setmetatable({}, CONFIG_MANAGER)
    currentFileName = fileName or DEFAULT_CONFIG_FILE
    CASE_SENSITIVE = caseSensitive or false
    SAVE_DEFAULT_PARAMETERS = (saveDefaultParams ~= false)
    self:Load(currentFileName)
    return self
end

--- 检查配置项是否存在
-- @param section string 段落名
-- @param parameter string 参数名
-- @return boolean 是否存在
function CONFIG_MANAGER:Has(section, parameter)
    local map = GetSectionMap(section, false)
    if map == nil then
        return false
    end
    return map[NormalizeKey(parameter)] ~= nil
end

--- 设置配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param value any 配置值（支持 string/number/boolean/table）
function CONFIG_MANAGER:Set(section, parameter, value)
    local map = GetSectionMap(section, true)
    map[NormalizeKey(parameter)] = value
end

--- 通用获取配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue any 默认值
-- @return any 配置值或默认值
function CONFIG_MANAGER:Get(section, parameter, defaultValue)
    local map = GetSectionMap(section, false)
    if map == nil then
        if SAVE_DEFAULT_PARAMETERS then
            self:Set(section, parameter, defaultValue)
        end
        return defaultValue
    end
    local key = NormalizeKey(parameter)
    if map[key] == nil then
        if SAVE_DEFAULT_PARAMETERS then
            self:Set(section, parameter, defaultValue)
        end
        return defaultValue
    end
    return map[key]
end

--- 获取字符串配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue string 默认值
-- @return string 配置值
function CONFIG_MANAGER:GetString(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "string" then
        return value
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, tostring(defaultValue or ""))
    end
    return tostring(defaultValue or "")
end

--- 获取整数配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue number 默认值
-- @return number 配置值
function CONFIG_MANAGER:GetInt(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue or 0)
    if type(value) == "number" then
        return math.floor(value)
    end
    if type(value) == "string" then
        local n = tonumber(value)
        if n then
            return math.floor(n)
        end
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or 0)
    end
    return defaultValue or 0
end

--- 获取无符号整数配置值（截断为整数）
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue number 默认值
-- @return number 配置值
function CONFIG_MANAGER:GetUInt(section, parameter, defaultValue)
    local value = self:GetInt(section, parameter, defaultValue or 0)
    if value < 0 then
        value = 0
    end
    return math.floor(value)
end

--- 获取布尔配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue boolean 默认值
-- @return boolean 配置值
function CONFIG_MANAGER:GetBool(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue or false)
    if type(value) == "boolean" then
        return value
    end
    if type(value) == "string" then
        local v = string.lower(value)
        if v == "true" or v == "1" or v == "yes" or v == "on" then
            return true
        elseif v == "false" or v == "0" or v == "no" or v == "off" then
            return false
        end
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or false)
    end
    return defaultValue or false
end

--- 获取浮点配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue number 默认值
-- @return number 配置值
function CONFIG_MANAGER:GetFloat(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue or 0.0)
    if type(value) == "number" then
        return value
    end
    if type(value) == "string" then
        local n = tonumber(value)
        if n then
            return n
        end
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or 0.0)
    end
    return defaultValue or 0.0
end

--- 辅助：将字符串解析为数字表
-- @param str string 输入字符串，如 "1 2"
-- @return table|nil 数字表
local function ParseNumberList(str)
    local result = {}
    for num in string.gmatch(tostring(str), "[^%s,]+") do
        local n = tonumber(num)
        if n then
            table.insert(result, n)
        end
    end
    if #result > 0 then
        return result
    end
    return nil
end

--- 获取 Vector2 配置值（兼容字符串形式）
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值，如 {x=0, y=0}
-- @return table Vector2 表
function CONFIG_MANAGER:GetVector2(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.x ~= nil and value.y ~= nil then
        return { x = value.x, y = value.y }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 2 then
        return { x = nums[1], y = nums[2] }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { x = 0, y = 0 })
    end
    return defaultValue or { x = 0, y = 0 }
end

--- 获取 Vector3 配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值
-- @return table Vector3 表
function CONFIG_MANAGER:GetVector3(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.x ~= nil and value.y ~= nil and value.z ~= nil then
        return { x = value.x, y = value.y, z = value.z }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 3 then
        return { x = nums[1], y = nums[2], z = nums[3] }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { x = 0, y = 0, z = 0 })
    end
    return defaultValue or { x = 0, y = 0, z = 0 }
end

--- 获取 Vector4 配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值
-- @return table Vector4 表
function CONFIG_MANAGER:GetVector4(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.x ~= nil and value.y ~= nil and value.z ~= nil and value.w ~= nil then
        return { x = value.x, y = value.y, z = value.z, w = value.w }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 4 then
        return { x = nums[1], y = nums[2], z = nums[3], w = nums[4] }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { x = 0, y = 0, z = 0, w = 0 })
    end
    return defaultValue or { x = 0, y = 0, z = 0, w = 0 }
end

--- 获取 Color 配置值（RGBA）
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值
-- @return table Color 表
function CONFIG_MANAGER:GetColor(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.r ~= nil and value.g ~= nil and value.b ~= nil then
        return {
            r = value.r,
            g = value.g,
            b = value.b,
            a = value.a or 1.0
        }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 3 then
        return { r = nums[1], g = nums[2], b = nums[3], a = nums[4] or 1.0 }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { r = 1, g = 1, b = 1, a = 1 })
    end
    return defaultValue or { r = 1, g = 1, b = 1, a = 1 }
end

--- 获取 IntRect 配置值（left top right bottom）
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值
-- @return table IntRect 表
function CONFIG_MANAGER:GetIntRect(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.left ~= nil then
        return {
            left = value.left,
            top = value.top,
            right = value.right,
            bottom = value.bottom
        }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 4 then
        return { left = nums[1], top = nums[2], right = nums[3], bottom = nums[4] }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { left = 0, top = 0, right = 0, bottom = 0 })
    end
    return defaultValue or { left = 0, top = 0, right = 0, bottom = 0 }
end

--- 获取 IntVector2 配置值
-- @param section string 段落名
-- @param parameter string 参数名
-- @param defaultValue table 默认值
-- @return table IntVector2 表
function CONFIG_MANAGER:GetIntVector2(section, parameter, defaultValue)
    local value = self:Get(section, parameter, defaultValue)
    if type(value) == "table" and value.x ~= nil and value.y ~= nil then
        return { x = value.x, y = value.y }
    end
    local nums = ParseNumberList(tostring(value))
    if nums and #nums >= 2 then
        return { x = nums[1], y = nums[2] }
    end
    if SAVE_DEFAULT_PARAMETERS then
        self:Set(section, parameter, defaultValue or { x = 0, y = 0 })
    end
    return defaultValue or { x = 0, y = 0 }
end

--- 清空所有配置
function CONFIG_MANAGER:Clear()
    configMap = {}
end

--- 从 JSON 文件加载配置
-- @param fileName string 配置文件路径（可选）
-- @param overwriteExisting boolean 是否覆盖已有配置（默认为 true）
-- @return boolean 是否加载成功
function CONFIG_MANAGER:Load(fileName, overwriteExisting)
    fileName = fileName or currentFileName
    overwriteExisting = (overwriteExisting ~= false)

    local fs = fileSystem
    if not fs or not fs:FileExists(fileName) then
        return false
    end

    local file = File()
    if not file:Open(fileName, FILE_READ) then
        return false
    end

    local content = file:ReadString()
    file:close()

    local ok, data = pcall(function()
        return json.decode(content)
    end)

    if not ok or type(data) ~= "table" then
        return false
    end

    if overwriteExisting then
        configMap = {}
    end

    for section, params in pairs(data) do
        if type(params) == "table" then
            local map = GetSectionMap(section, true)
            for key, val in pairs(params) do
                map[NormalizeKey(key)] = val
            end
        end
    end

    currentFileName = fileName
    return true
end

--- 递归将配置表扁平化为可 JSON 序列化的表
-- @param map table 配置表
-- @return table 可序列化表
local function FlattenMap(map)
    local result = {}
    for k, v in pairs(map) do
        if type(v) == "table" then
            local isValueTable = false
            for _, __ in pairs(v) do
                isValueTable = true
                break
            end
            if isValueTable then
                result[k] = v
            else
                result[k] = {}
            end
        else
            result[k] = v
        end
    end
    return result
end

--- 保存配置到 JSON 文件
-- @param fileName string 配置文件路径（可选）
-- @param smartSave boolean 是否合并已有文件（默认为 true）
-- @return boolean 是否保存成功
function CONFIG_MANAGER:Save(fileName, smartSave)
    fileName = fileName or currentFileName
    smartSave = (smartSave ~= false)

    local output = {}

    if smartSave then
        local fs = fileSystem
        if fs and fs:FileExists(fileName) then
            local file = File()
            if file:Open(fileName, FILE_READ) then
                local content = file:ReadString()
                file:close()
                local ok, data = pcall(function()
                    return json.decode(content)
                end)
                if ok and type(data) == "table" then
                    output = data
                end
            end
        end
    end

    for section, params in pairs(configMap) do
        if type(params) == "table" then
            output[section] = FlattenMap(params)
        end
    end

    local file = File()
    if not file:Open(fileName, FILE_WRITE) then
        return false
    end

    local ok, encoded = pcall(function()
        return json.encode(output, { indent = true })
    end)

    if ok and encoded then
        file:WriteString(encoded)
    end
    file:close()

    return true
end

--- 全局单例实例（脚本加载时自动初始化）
ConfigManager = CONFIG_MANAGER.New()

return CONFIG_MANAGER
