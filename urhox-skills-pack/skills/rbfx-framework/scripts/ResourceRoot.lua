-- ResourceRoot.lua
-- 模拟 rbfx ResourceRoot.ini 机制的资源根路径管理器
-- 支持多路径别名查找、从可执行目录向上搜索、运行时动态管理

--- 默认的 ResourceRoot.ini 文件名
local DEFAULT_INI_NAME = "ResourceRoot.ini"

--- 最大向上搜索深度
local DEFAULT_MAX_SEARCH_DEPTH = 8

--- 路径分隔符（Windows 为 \\，其他为 /）
local PATH_SEPARATOR = package.config:sub(1, 1)

--- 资源根路径管理器
local ResourceRoot = {
    --- 别名到路径的映射表
    aliases = {},
    --- 别名顺序表（保持插入/加载顺序）
    order = {},
    --- 当前基准目录（用于解析相对路径）
    baseDir = "",
    --- 是否已初始化
    initialized = false
}

--- 去除字符串首尾空白
-- @param s string 源字符串
-- @return string 去除空白后的字符串
local function trim(s)
    return (s:gsub("^%s*(.-)%s*$", "%1"))
end

--- 将路径中的分隔符统一为当前系统风格
-- @param path string 原始路径
-- @return string 标准化后的路径
local function normalizePath(path)
    if PATH_SEPARATOR == "\\" then
        path = path:gsub("/", "\\")
    else
        path = path:gsub("\\", "/")
    end
    -- 去除末尾分隔符
    path = path:gsub(PATH_SEPARATOR .. "+$", "")
    return path
end

--- 拼接两个路径片段
-- @param left string 左路径
-- @param right string 右路径
-- @return string 拼接后的路径
local function joinPath(left, right)
    left = normalizePath(left)
    right = normalizePath(right)
    if right:sub(1, 1) == PATH_SEPARATOR or right:match("^[a-zA-Z]:") then
        return right
    end
    if left == "" then
        return right
    end
    return left .. PATH_SEPARATOR .. right
end

--- 检查文件是否存在（纯 Lua，不依赖引擎）
-- @param path string 文件路径
-- @return boolean 是否存在
local function fileExists(path)
    local f = io.open(path, "r")
    if f then
        f:close()
        return true
    end
    return false
end

--- 获取文件所在目录
-- @param path string 文件路径
-- @return string 目录路径
local function getDirectory(path)
    path = normalizePath(path)
    local idx = path:match(".*()[" .. PATH_SEPARATOR:gsub("\\", "\\\\") .. "]")
    if idx then
        return path:sub(1, idx - 1)
    end
    return "."
end

--- 获取当前工作目录
-- @return string 当前工作目录
local function getCurrentDir()
    local p = io.popen("cd")
    if p then
        local dir = p:read("*l")
        p:close()
        return normalizePath(dir or ".")
    end
    return "."
end

--- 初始化 ResourceRoot 管理器
-- @param baseDir string|nil 基准目录，默认为当前工作目录
function ResourceRoot:Initialize(baseDir)
    self.baseDir = normalizePath(baseDir or getCurrentDir())
    self.aliases = {}
    self.order = {}
    self.initialized = true
end

--- 清空所有已注册的别名
function ResourceRoot:Clear()
    self.aliases = {}
    self.order = {}
end

--- 添加一个资源根别名
-- rbfx 引擎搜索资源时按从后到前的顺序检查别名对应的路径
-- @param alias string 别名（如 CoreData, Data, Cache）
-- @param path string 相对或绝对路径
function ResourceRoot:AddAlias(alias, path)
    if not self.initialized then
        self:Initialize()
    end
    alias = trim(alias)
    path = trim(path)
    if alias == "" or path == "" then
        return
    end

    -- 若已存在，移除旧记录以保持新增的排在后面（后入后出，与 rbfx 一致）
    if self.aliases[alias] ~= nil then
        for i, a in ipairs(self.order) do
            if a == alias then
                table.remove(self.order, i)
                break
            end
        end
    end

    local absPath = path
    -- 如果是相对路径，基于 baseDir 解析
    if path:sub(1, 1) ~= PATH_SEPARATOR and not path:match("^[a-zA-Z]:") then
        absPath = joinPath(self.baseDir, path)
    end

    self.aliases[alias] = {
        alias = alias,
        rawPath = path,
        absolutePath = normalizePath(absPath)
    }
    table.insert(self.order, alias)
end

--- 移除指定别名
-- @param alias string 别名
function ResourceRoot:RemoveAlias(alias)
    alias = trim(alias)
    if self.aliases[alias] == nil then
        return
    end
    self.aliases[alias] = nil
    for i, a in ipairs(self.order) do
        if a == alias then
            table.remove(self.order, i)
            break
        end
    end
end

--- 获取指定别名的原始路径（相对路径形式）
-- @param alias string 别名
-- @return string|nil 原始路径，若不存在返回 nil
function ResourceRoot:GetAliasPath(alias)
    alias = trim(alias)
    local entry = self.aliases[alias]
    if entry then
        return entry.rawPath
    end
    return nil
end

--- 获取指定别名的绝对路径
-- @param alias string 别名
-- @return string|nil 绝对路径，若不存在返回 nil
function ResourceRoot:GetAliasAbsolutePath(alias)
    alias = trim(alias)
    local entry = self.aliases[alias]
    if entry then
        return entry.absolutePath
    end
    return nil
end

--- 获取所有已注册别名列表（按加载/添加顺序）
-- @return table 别名名称数组
function ResourceRoot:GetAllAliases()
    local result = {}
    for _, alias in ipairs(self.order) do
        table.insert(result, alias)
    end
    return result
end

--- 获取所有别名的绝对路径数组（按顺序）
-- @return table 绝对路径数组
function ResourceRoot:GetAllPaths()
    local result = {}
    for _, alias in ipairs(self.order) do
        local entry = self.aliases[alias]
        if entry then
            table.insert(result, entry.absolutePath)
        end
    end
    return result
end

--- 生成适用于 EP_RESOURCE_PREFIX_PATHS 的字符串
-- 路径以分号分隔，包含 baseDir 和所有别名路径
-- @return string 资源前缀路径字符串
function ResourceRoot:GetPrefixPaths()
    if not self.initialized then
        self:Initialize()
    end
    local parts = { self.baseDir }
    for _, alias in ipairs(self.order) do
        local entry = self.aliases[alias]
        if entry then
            table.insert(parts, entry.absolutePath)
        end
    end
    return table.concat(parts, ";")
end

--- 解析一个相对路径，在所有别名路径中查找第一个存在的绝对路径
-- 搜索顺序与 rbfx 一致：从最后添加的别名到最先添加的别名
-- @param relativePath string 相对路径（如 Scenes/Scene.xml）
-- @return string|nil 第一个存在的绝对路径，都不存在返回 nil
function ResourceRoot:Resolve(relativePath)
    if not self.initialized then
        self:Initialize()
    end
    relativePath = trim(relativePath)
    -- 若已是绝对路径，直接检查
    if relativePath:sub(1, 1) == PATH_SEPARATOR or relativePath:match("^[a-zA-Z]:") then
        if fileExists(relativePath) then
            return normalizePath(relativePath)
        end
        return nil
    end

    -- 从后往前搜索（rbfx 约定：后添加的别名优先）
    for i = #self.order, 1, -1 do
        local alias = self.order[i]
        local entry = self.aliases[alias]
        if entry then
            local fullPath = joinPath(entry.absolutePath, relativePath)
            if fileExists(fullPath) then
                return normalizePath(fullPath)
            end
        end
    end

    -- 最后检查 baseDir
    local basePath = joinPath(self.baseDir, relativePath)
    if fileExists(basePath) then
        return normalizePath(basePath)
    end
    return nil
end

--- 解析相对路径并返回所有可能的绝对路径候选（用于调试或自定义搜索逻辑）
-- @param relativePath string 相对路径
-- @return table 候选绝对路径数组（从后到前的顺序）
function ResourceRoot:ResolveAllCandidates(relativePath)
    if not self.initialized then
        self:Initialize()
    end
    relativePath = trim(relativePath)
    local candidates = {}
    for i = #self.order, 1, -1 do
        local alias = self.order[i]
        local entry = self.aliases[alias]
        if entry then
            table.insert(candidates, joinPath(entry.absolutePath, relativePath))
        end
    end
    table.insert(candidates, joinPath(self.baseDir, relativePath))
    return candidates
end

--- 加载 ResourceRoot.ini 文件
-- @param iniPath string ini 文件路径
-- @return boolean 是否加载成功
function ResourceRoot:Load(iniPath)
    if not self.initialized then
        self:Initialize()
    end
    iniPath = trim(iniPath)
    if not fileExists(iniPath) then
        return false
    end

    self.baseDir = getDirectory(iniPath)
    self:Clear()

    local f = io.open(iniPath, "r")
    if not f then
        return false
    end

    for line in f:lines() do
        line = trim(line)
        -- 跳过空行和注释
        if line ~= "" and line:sub(1, 1) ~= "#" then
            local alias, path = line:match("^([^=]+)=(.+)$")
            if alias and path then
                self:AddAlias(trim(alias), trim(path))
            end
        end
    end
    f:close()
    return true
end

--- 从指定目录开始向上搜索 ResourceRoot.ini
-- @param startDir string 起始目录
-- @param maxDepth number|nil 最大搜索深度，默认为 8
-- @return string|nil 找到的 ini 文件路径，未找到返回 nil
function ResourceRoot:FindIni(startDir, maxDepth)
    startDir = normalizePath(startDir or self.baseDir)
    maxDepth = maxDepth or DEFAULT_MAX_SEARCH_DEPTH
    local currentDir = startDir

    for _ = 1, maxDepth do
        local candidate = joinPath(currentDir, DEFAULT_INI_NAME)
        if fileExists(candidate) then
            return candidate
        end
        local parentDir = getDirectory(currentDir)
        if parentDir == currentDir or parentDir == "" then
            break
        end
        currentDir = parentDir
    end
    return nil
end

--- 从可执行文件目录开始向上搜索并自动加载 ResourceRoot.ini
-- @param executableDir string 可执行文件所在目录
-- @param maxDepth number|nil 最大搜索深度
-- @return boolean 是否成功加载
function ResourceRoot:AutoLoad(executableDir, maxDepth)
    if not self.initialized then
        self:Initialize(executableDir)
    end
    local iniPath = self:FindIni(executableDir, maxDepth)
    if iniPath then
        return self:Load(iniPath)
    end
    return false
end

--- 添加默认别名配置（适用于没有 ini 文件时的快速启动）
-- 默认顺序：CoreData -> Data -> Cache
-- @param coreDataPath string CoreData 路径
-- @param dataPath string Data 路径
-- @param cachePath string Cache 路径
function ResourceRoot:SetDefaults(coreDataPath, dataPath, cachePath)
    if not self.initialized then
        self:Initialize()
    end
    self:Clear()
    self:AddAlias("CoreData", coreDataPath or "CoreData")
    self:AddAlias("Data", dataPath or "Data")
    self:AddAlias("Cache", cachePath or "Cache")
end

--- 检查指定相对路径是否在任意别名目录下存在
-- @param relativePath string 相对路径
-- @return boolean 是否存在
function ResourceRoot:Exists(relativePath)
    return self:Resolve(relativePath) ~= nil
end

--- 将当前所有别名配置导出为 ini 格式字符串
-- @return string ini 格式内容
function ResourceRoot:ExportIni()
    local lines = {
        "# ResourceRoot.ini generated by ResourceRoot.lua",
        "# Format: alias=relative/path",
        "# When the engine is looking for a resource, it will check the paths from last to first.",
        ""
    }
    for _, alias in ipairs(self.order) do
        local entry = self.aliases[alias]
        if entry then
            table.insert(lines, entry.alias .. "=" .. entry.rawPath)
        end
    end
    return table.concat(lines, "\n")
end

--- 保存当前配置到 ini 文件
-- @param iniPath string 目标文件路径
-- @return boolean 是否保存成功
function ResourceRoot:Save(iniPath)
    iniPath = trim(iniPath)
    local content = self:ExportIni()
    local f, err = io.open(iniPath, "w")
    if not f then
        return false
    end
    f:write(content)
    f:write("\n")
    f:close()
    return true
end

--- 打印当前状态到控制台（用于调试）
function ResourceRoot:Dump()
    print("[ResourceRoot] baseDir: " .. self.baseDir)
    print("[ResourceRoot] aliases (search order: last -> first):")
    for i = #self.order, 1, -1 do
        local alias = self.order[i]
        local entry = self.aliases[alias]
        if entry then
            print(string.format("  [%d] %s = %s (abs: %s)", i, entry.alias, entry.rawPath, entry.absolutePath))
        end
    end
end

return ResourceRoot
