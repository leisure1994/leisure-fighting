-- ModLoader.lua
-- Lua Mod 热加载：从指定目录自动发现并执行 Lua 脚本

local MOD_LOADER = {}
MOD_LOADER.__index = MOD_LOADER

--- 默认 Mod 目录
local DEFAULT_MOD_DIR = "Data/Mods/"

--- 当前 Mod 目录
local modDirectory = DEFAULT_MOD_DIR

--- 已加载的 Mod 信息表：fileName -> { name=..., path=..., mtime=... }
local loadedMods = {}

--- 是否启用 Mod 加载
local modsEnabled = true

--- 扫描目录获取所有 Lua 文件
-- @param dir string 目录路径
-- @return table 文件名列表
local function ScanLuaMods(dir)
    local result = {}
    local fs = fileSystem
    if not fs then
        DebugLogger:Warning("ModLoader", "FileSystem not available, cannot scan mods")
        return result
    end

    local files = fs:ScanDir(dir, "*.lua", SCAN_FILES, false)
    for i = 0, files:Size() - 1 do
        table.insert(result, files[i])
    end

    -- 扫描一级子目录中的 .lua 文件
    local dirs = fs:ScanDir(dir, "*", SCAN_DIRS, false)
    for i = 0, dirs:Size() - 1 do
        local subDir = dirs[i]
        if subDir ~= "." and subDir ~= ".." then
            local subFiles = fs:ScanDir(dir .. subDir .. "/", "*.lua", SCAN_FILES, false)
            for j = 0, subFiles:Size() - 1 do
                table.insert(result, subDir .. "/" .. subFiles[j])
            end
        end
    end

    return result
end

--- 获取文件最后修改时间
-- @param path string 文件路径
-- @return number 修改时间戳（秒）
local function GetFileMTime(path)
    local fs = fileSystem
    if not fs then
        return 0
    end
    return fs:GetLastModifiedTime(path)
end

--- 提取脚本名（去掉扩展名），用于构造 Start/Stop 函数名
-- @param fileName string 文件名
-- @return string 脚本名
local function ExtractScriptName(fileName)
    local name = fileName
    local extPos = string.find(name, "%.lua$")
    if extPos then
        name = string.sub(name, 1, extPos - 1)
    end
    -- 替换路径分隔符为下划线，保证函数名合法
    name = string.gsub(name, "[/\\]", "_")
    return name
end

--- 构造全局 Start 函数名
-- @param scriptName string 脚本名
-- @return string 函数名
local function GetStartFunctionName(scriptName)
    return scriptName .. "Start"
end

--- 构造全局 Stop 函数名
-- @param scriptName string 脚本名
-- @return string 函数名
local function GetStopFunctionName(scriptName)
    return scriptName .. "Stop"
end

--- 执行 Mod 脚本文件
-- @param path string 资源路径（如 "Mods/xxx.lua"）
-- @param scriptName string 脚本名
-- @return boolean 是否成功
local function ExecuteModFile(path, scriptName)
    local luaScript = luaScript
    if luaScript and luaScript.ExecuteFile then
        local ok = luaScript:ExecuteFile(path)
        if ok then
            DebugLogger:Info("ModLoader", "Executed mod file: " .. path)
            return true
        else
            DebugLogger:Error("ModLoader", "Failed to execute mod file: " .. path)
            return false
        end
    end

    -- 降级方案：尝试 dofile（如果路径可映射为本地文件）
    local localPath = fileSystem and fileSystem:GetProgramDir() .. path
    if localPath then
        local ok, err = pcall(dofile, localPath)
        if ok then
            DebugLogger:Info("ModLoader", "Loaded mod via dofile: " .. localPath)
            return true
        else
            DebugLogger:Error("ModLoader", "Failed to dofile mod: " .. tostring(err))
            return false
        end
    end

    return false
end

--- 调用 Mod 的 Start 函数
-- @param scriptName string 脚本名
local function CallModStart(scriptName)
    local funcName = GetStartFunctionName(scriptName)
    local func = _G[funcName]
    if type(func) == "function" then
        local ok, err = pcall(func)
        if ok then
            DebugLogger:Info("ModLoader", "Called " .. funcName .. "()")
        else
            DebugLogger:Error("ModLoader", "Error in " .. funcName .. ": " .. tostring(err))
        end
    else
        DebugLogger:Warning("ModLoader", "Start function not found: " .. funcName)
    end
end

--- 调用 Mod 的 Stop 函数
-- @param scriptName string 脚本名
local function CallModStop(scriptName)
    local funcName = GetStopFunctionName(scriptName)
    local func = _G[funcName]
    if type(func) == "function" then
        local ok, err = pcall(func)
        if ok then
            DebugLogger:Info("ModLoader", "Called " .. funcName .. "()")
        else
            DebugLogger:Error("ModLoader", "Error in " .. funcName .. ": " .. tostring(err))
        end
    end
end

--- 创建新的 ModLoader 实例
-- @return table ModLoader 实例
function MOD_LOADER.New()
    local self = setmetatable({}, MOD_LOADER)
    modsEnabled = true
    loadedMods = {}

    SubscribeToEvent("ReloadMods", function(eventType, eventData)
        self:ReloadMods()
    end)

    SubscribeToEvent("FileChanged", function(eventType, eventData)
        self:HandleFileChanged(eventData)
    end)

    self:LoadAllMods()
    return self
end

--- 设置 Mod 扫描目录
-- @param path string 目录路径
function MOD_LOADER:SetModDirectory(path)
    modDirectory = path
    if string.sub(modDirectory, -1) ~= "/" then
        modDirectory = modDirectory .. "/"
    end
    DebugLogger:Info("ModLoader", "Mod directory set to: " .. modDirectory)
end

--- 获取 Mod 扫描目录
-- @return string 目录路径
function MOD_LOADER:GetModDirectory()
    return modDirectory
end

--- 加载指定 Mod
-- @param fileName string 文件名
-- @return boolean 是否成功
function MOD_LOADER:LoadMod(fileName)
    local scriptName = ExtractScriptName(fileName)
    local path = "Mods/" .. fileName
    local fullPath = modDirectory .. fileName

    local mtime = GetFileMTime(fullPath)
    local ok = ExecuteModFile(path, scriptName)
    if ok then
        CallModStart(scriptName)
        loadedMods[fileName] = {
            name = scriptName,
            path = path,
            mtime = mtime
        }
        return true
    end
    return false
end

--- 卸载指定 Mod
-- @param fileName string 文件名
function MOD_LOADER:UnloadMod(fileName)
    local modInfo = loadedMods[fileName]
    if not modInfo then
        return
    end

    DebugLogger:Info("ModLoader", "Unloading mod: " .. fileName)
    CallModStop(modInfo.name)
    loadedMods[fileName] = nil
end

--- 加载所有 Mod
function MOD_LOADER:LoadAllMods()
    if not modsEnabled then
        DebugLogger:Info("ModLoader", "Mod loading is disabled")
        return
    end

    local files = ScanLuaMods(modDirectory)
    DebugLogger:Info("ModLoader", "Total LUA mods found: " .. tostring(#files))

    for _, fileName in ipairs(files) do
        self:LoadMod(fileName)
    end

    self:NotifyModsLoaded()
end

--- 重新加载所有 Mod
function MOD_LOADER:ReloadMods()
    if not modsEnabled then
        return
    end

    DebugLogger:Info("ModLoader", "Reloading all mods")

    -- 先 Stop 所有已加载的 Mod
    for fileName, modInfo in pairs(loadedMods) do
        CallModStop(modInfo.name)
    end

    loadedMods = {}
    self:LoadAllMods()
end

--- 获取已加载的 Mod 列表
-- @return table Mod 列表
function MOD_LOADER:GetLoadedMods()
    local result = {}
    for fileName, modInfo in pairs(loadedMods) do
        table.insert(result, {
            fileName = fileName,
            name = modInfo.name,
            path = modInfo.path
        })
    end
    return result
end

--- 广播 Mod 已加载事件
function MOD_LOADER:NotifyModsLoaded()
    local eventData = VariantMap()
    local list = VariantVector()
    for fileName, _ in pairs(loadedMods) do
        list:Push(String(fileName))
    end
    eventData:SetVariantVector("Mods", list)
    SendEvent("ModsLoaded", eventData)

    DebugLogger:Info("ModLoader", "ModsLoaded event sent, count=" .. tostring(#list))
end

--- 处理文件变更事件（热重载）
-- @param eventData VariantMap 事件数据
function MOD_LOADER:HandleFileChanged(eventData)
    if not modsEnabled then
        return
    end

    local resourceName = ""
    if eventData.GetString then
        resourceName = eventData:GetString("ResourceName")
    else
        resourceName = eventData["ResourceName"] or ""
    end

    if not string.find(resourceName, "%.lua$") then
        return
    end

    -- 仅处理 Mods 目录下的变更
    if not string.find(resourceName, "^Mods/") then
        return
    end

    local fileName = string.sub(resourceName, 6) -- 去掉 "Mods/"
    local modInfo = loadedMods[fileName]

    if modInfo then
        DebugLogger:Info("ModLoader", "Reloading mod: " .. fileName)
        self:UnloadMod(fileName)
        self:LoadMod(fileName)
    else
        -- 新文件被添加
        DebugLogger:Info("ModLoader", "Detected new mod: " .. fileName)
        self:LoadMod(fileName)
    end

    self:NotifyModsLoaded()
end

--- 设置是否启用 Mod 加载
-- @param enabled boolean 是否启用
function MOD_LOADER:SetEnabled(enabled)
    modsEnabled = enabled
end

--- 是否启用了 Mod 加载
-- @return boolean 是否启用
function MOD_LOADER:IsEnabled()
    return modsEnabled
end

--- 全局单例
ModLoader = MOD_LOADER.New()

return MOD_LOADER
