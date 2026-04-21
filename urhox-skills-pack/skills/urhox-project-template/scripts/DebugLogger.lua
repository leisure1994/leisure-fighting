-- DebugLogger.lua
-- 日志分级与调试辅助工具

local DEBUG_LOGGER = {}
DEBUG_LOGGER.__index = DEBUG_LOGGER

--- 日志级别常量
local LOG_LEVEL_DEBUG = 0
local LOG_LEVEL_INFO  = 1
local LOG_LEVEL_WARN  = 2
local LOG_LEVEL_ERROR = 3

--- 当前日志级别阈值
local currentLogLevel = LOG_LEVEL_DEBUG

--- 是否启用控制台输出
local consoleOutput = true

--- 创建一个空的 DebugLogger 实例
-- @return table DebugLogger 实例
function DEBUG_LOGGER.New()
    local self = setmetatable({}, DEBUG_LOGGER)
    return self
end

--- 设置日志级别阈值
-- @param level number 日志级别（0=DEBUG, 1=INFO, 2=WARN, 3=ERROR）
function DEBUG_LOGGER:SetLogLevel(level)
    currentLogLevel = level
end

--- 获取当前日志级别
-- @return number 当前日志级别
function DEBUG_LOGGER:GetLogLevel()
    return currentLogLevel
end

--- 设置是否输出到控制台
-- @param enabled boolean 是否启用
function DEBUG_LOGGER:SetConsoleOutput(enabled)
    consoleOutput = enabled
end

--- 内部日志输出函数
-- @param level number 日志级别
-- @param tag string 日志标签
-- @param message string 日志内容
local function WriteLog(level, tag, message)
    if level < currentLogLevel then
        return
    end

    local prefix = ""
    if level == LOG_LEVEL_DEBUG then
        prefix = "[DEBUG]"
    elseif level == LOG_LEVEL_INFO then
        prefix = "[INFO]"
    elseif level == LOG_LEVEL_WARN then
        prefix = "[WARN]"
    elseif level == LOG_LEVEL_ERROR then
        prefix = "[ERROR]"
    end

    local timeStr = ""
    if os and os.date then
        timeStr = os.date("%Y-%m-%d %H:%M:%S") .. " "
    end

    local fullMessage = timeStr .. prefix .. " [" .. tostring(tag) .. "] " .. tostring(message)

    if consoleOutput then
        if log and log.Write then
            if level == LOG_LEVEL_DEBUG then
                log:Write(LOG_DEBUG, fullMessage)
            elseif level == LOG_LEVEL_INFO then
                log:Write(LOG_INFO, fullMessage)
            elseif level == LOG_LEVEL_WARN then
                log:Write(LOG_WARNING, fullMessage)
            else
                log:Write(LOG_ERROR, fullMessage)
            end
        else
            print(fullMessage)
        end
    end
end

--- 输出 DEBUG 级别日志
-- @param tag string 标签
-- @param message string 内容
function DEBUG_LOGGER:Debug(tag, message)
    WriteLog(LOG_LEVEL_DEBUG, tag, message)
end

--- 输出 INFO 级别日志
-- @param tag string 标签
-- @param message string 内容
function DEBUG_LOGGER:Info(tag, message)
    WriteLog(LOG_LEVEL_INFO, tag, message)
end

--- 输出 WARNING 级别日志
-- @param tag string 标签
-- @param message string 内容
function DEBUG_LOGGER:Warning(tag, message)
    WriteLog(LOG_LEVEL_WARN, tag, message)
end

--- 输出 ERROR 级别日志
-- @param tag string 标签
-- @param message string 内容
function DEBUG_LOGGER:Error(tag, message)
    WriteLog(LOG_LEVEL_ERROR, tag, message)
end

--- 断言：条件为假时输出错误日志并抛出错误
-- @param condition boolean 断言条件
-- @param message string 错误信息
function DEBUG_LOGGER:Assert(condition, message)
    if not condition then
        local msg = "ASSERT FAILED: " .. tostring(message or "unknown")
        self:Error("Assert", msg)
        error(msg, 2)
    end
end

--- 递归打印 Lua 表的内容
-- @param tbl table 要打印的表
-- @param indent number 当前缩进层级（内部使用）
-- @param visited table 已访问表（防止循环引用）
function DEBUG_LOGGER:DumpTable(tbl, indent, visited)
    indent = indent or 0
    visited = visited or {}
    local prefix = string.rep("  ", indent)

    if type(tbl) ~= "table" then
        self:Debug("Dump", prefix .. tostring(tbl))
        return
    end

    if visited[tbl] then
        self:Debug("Dump", prefix .. "<circular reference>")
        return
    end
    visited[tbl] = true

    for k, v in pairs(tbl) do
        local keyStr = tostring(k)
        if type(v) == "table" then
            self:Debug("Dump", prefix .. keyStr .. " = {")
            self:DumpTable(v, indent + 1, visited)
            self:Debug("Dump", prefix .. "}")
        elseif type(v) == "string" then
            self:Debug("Dump", prefix .. keyStr .. " = \"" .. v .. "\"")
        else
            self:Debug("Dump", prefix .. keyStr .. " = " .. tostring(v))
        end
    end
end

--- 打印调用栈
-- @param maxDepth number 最大深度（默认 16）
function DEBUG_LOGGER:DumpStack(maxDepth)
    maxDepth = maxDepth or 16
    self:Info("Stack", "----- call stack begin -----")
    for i = 2, maxDepth do
        local info = debug.getinfo(i, "Sln")
        if not info then
            break
        end
        local line = string.format("  #%d %s:%d in %s", i - 1, info.short_src or "?", info.currentline or 0, info.name or "?")
        self:Info("Stack", line)
    end
    self:Info("Stack", "----- call stack end -----")
end

--- 格式化字符串（类似 string.format 的安全封装）
-- @param fmt string 格式字符串
-- @param ... any 参数
-- @return string 格式化结果
function DEBUG_LOGGER:Format(fmt, ...)
    local ok, result = pcall(string.format, fmt, ...)
    if ok then
        return result
    end
    return "Format error: " .. tostring(result)
end

--- 全局单例
DebugLogger = DEBUG_LOGGER.New()

return DEBUG_LOGGER
