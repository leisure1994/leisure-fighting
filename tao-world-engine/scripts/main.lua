-- main.lua
-- 天道引擎 · 入口脚本（生产级）
-- 职责：按正确顺序加载各模块、命令行解析、日志系统、健康检查、热重载

-- ═══════════════════════════════════════════════════════════
-- 一、全局配置默认值
-- ═══════════════════════════════════════════════════════════
TAO_VERSION = "v1.2.0"
TAO_BUILD_DATE = "2026-04-11"

API_KEYS = API_KEYS or {
    deepseek = os.getenv("DEEPSEEK_API_KEY") or "sk-your-deepseek-key",
    doubao   = os.getenv("DOUBAO_API_KEY") or "Bearer your-doubao-key",
    kimi     = os.getenv("KIMI_API_KEY") or "sk-your-kimi-key"
}

TAO_CONFIG_DEFAULTS = {
    deepseek_reasoner = {
        url   = "https://api.deepseek.com/chat/completions",
        model = "deepseek-reasoner",
        timeout = 60,
        maxRetries = 2,
        rpmLimit = 20
    },
    deepseek_chat = {
        url   = "https://api.deepseek.com/chat/completions",
        model = "deepseek-chat",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 50
    },
    doubao = {
        url   = "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
        model = "doubao-pro-32k",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 100
    },
    kimi = {
        url   = "https://api.moonshot.cn/v1/chat/completions",
        model = "moonshot-v1-8k",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 60
    }
}

SERVER_PRIVATE_KEY = SERVER_PRIVATE_KEY or ""
SERVER_PUBLIC_KEY  = SERVER_PUBLIC_KEY or ""

TAO_DEBUG = TAO_DEBUG or false

TAO_WORLD_CONFIG = TAO_WORLD_CONFIG or {
    worldSeed = 42,
    regionSize = { w = 64, h = 64 },
    autoSaveInterval = 300,
    mempalaceArchiveDays = 30,
    maxConcurrentDerivations = 3,
    npcBatchSize = 20,
    enableVectorSearch = false
}

-- ═══════════════════════════════════════════════════════════
-- 二、命令行参数解析
-- ═══════════════════════════════════════════════════════════
TaoCLI = TaoCLI or {}
TaoCLI.args = TaoCLI.args or {}

function TaoCLI.ParseArgs(rawArgs)
    rawArgs = rawArgs or arg or {}
    local parsed = {
        mode = "auto",
        seed = nil,
        debug = false,
        config = nil,
        logLevel = "INFO",
        logFile = nil,
        noHealthCheck = false,
        hotReload = true,
        dumpConfig = false,
        help = false,
    }
    local i = 1
    while i <= #rawArgs do
        local a = rawArgs[i]
        if a == "--server" then
            parsed.mode = "server"
        elseif a == "--client" then
            parsed.mode = "client"
        elseif a == "--debug" then
            parsed.debug = true
        elseif a == "--seed" then
            i = i + 1
            if i <= #rawArgs then parsed.seed = tonumber(rawArgs[i]) end
        elseif a:match("^--seed=%d+$") then
            parsed.seed = tonumber(a:match("^--seed=(%d+)$"))
        elseif a == "--config" then
            i = i + 1
            if i <= #rawArgs then parsed.config = rawArgs[i] end
        elseif a:match("^--config=.*$") then
            parsed.config = a:match("^--config=(.*)$")
        elseif a == "--log-level" then
            i = i + 1
            if i <= #rawArgs then parsed.logLevel = rawArgs[i]:upper() end
        elseif a:match("^--log%-level=.*$") then
            parsed.logLevel = a:match("^--log%-level=(.*)$"):upper()
        elseif a == "--log-file" then
            i = i + 1
            if i <= #rawArgs then parsed.logFile = rawArgs[i] end
        elseif a:match("^--log%-file=.*$") then
            parsed.logFile = a:match("^--log%-file=(.*)$")
        elseif a == "--no-health-check" then
            parsed.noHealthCheck = true
        elseif a == "--no-hot-reload" then
            parsed.hotReload = false
        elseif a == "--dump-config" then
            parsed.dumpConfig = true
        elseif a == "--help" or a == "-h" then
            parsed.help = true
        end
        i = i + 1
    end
    -- 环境变量覆盖
    if os.getenv("TAO_MODE") then parsed.mode = os.getenv("TAO_MODE") end
    if os.getenv("TAO_DEBUG") == "1" then parsed.debug = true end
    if os.getenv("TAO_SEED") then parsed.seed = tonumber(os.getenv("TAO_SEED")) end
    if os.getenv("TAO_CONFIG_PATH") then parsed.config = os.getenv("TAO_CONFIG_PATH") end
    if os.getenv("TAO_LOG_LEVEL") then parsed.logLevel = os.getenv("TAO_LOG_LEVEL"):upper() end
    TaoCLI.args = parsed
    return parsed
end

function TaoCLI.PrintHelp()
    print([[天道引擎 Tao World Engine 命令行参数:
  --server              强制以服务端模式启动
  --client              强制以客户端模式启动
  --seed=N              设置世界随机种子
  --config=PATH         指定配置文件路径
  --debug               开启调试模式
  --log-level=LEVEL     日志级别: DEBUG, INFO, WARN, ERROR (默认 INFO)
  --log-file=PATH       日志文件路径
  --no-health-check     跳过启动前健康检查
  --no-hot-reload       禁用热重载
  --dump-config         启动后打印完整配置并退出
  --help, -h            显示此帮助
环境变量:
  TAO_MODE, TAO_DEBUG, TAO_SEED, TAO_CONFIG_PATH, TAO_LOG_LEVEL
]])
end

-- ═══════════════════════════════════════════════════════════
-- 三、日志分级系统
-- ═══════════════════════════════════════════════════════════
TaoLogger = TaoLogger or {}
TaoLogger.levels = {DEBUG = 1, INFO = 2, WARN = 3, ERROR = 4}
TaoLogger.currentLevel = TaoLogger.levels.INFO
TaoLogger.fileHandle = nil
TaoLogger.filePath = nil

function TaoLogger.Init(levelStr, filePath)
    levelStr = levelStr or "INFO"
    TaoLogger.currentLevel = TaoLogger.levels[levelStr] or TaoLogger.levels.INFO
    if filePath then
        TaoLogger.filePath = filePath
        TaoLogger.fileHandle = io.open(filePath, "a")
        if TaoLogger.fileHandle then
            TaoLogger.fileHandle:write(string.format("\n========== TaoWorld Log Started at %s ==========\n", os.date("%Y-%m-%d %H:%M:%S")))
            TaoLogger.fileHandle:flush()
        end
    end
end

function TaoLogger.Close()
    if TaoLogger.fileHandle then
        TaoLogger.fileHandle:close()
        TaoLogger.fileHandle = nil
    end
end

function TaoLogger.Log(level, message, context)
    local lvlNum = TaoLogger.levels[level] or TaoLogger.levels.INFO
    if lvlNum < TaoLogger.currentLevel then return end
    context = context or {}
    local timestamp = os.date("%Y-%m-%d %H:%M:%S")
    local line = string.format("[%s] [%s] %s", timestamp, level, tostring(message))
    if next(context) then
        line = line .. " | context: " .. SimpleEncode(context)
    end
    print(line)
    if TaoLogger.fileHandle then
        TaoLogger.fileHandle:write(line .. "\n")
        TaoLogger.fileHandle:flush()
    end
end

function TaoLogger.Debug(msg, ctx) TaoLogger.Log("DEBUG", msg, ctx) end
function TaoLogger.Info(msg, ctx)  TaoLogger.Log("INFO", msg, ctx) end
function TaoLogger.Warn(msg, ctx)  TaoLogger.Log("WARN", msg, ctx) end
function TaoLogger.Error(msg, ctx) TaoLogger.Log("ERROR", msg, ctx) end

-- ═══════════════════════════════════════════════════════════
-- 四、配置注入的多种来源优先级（CLI > 环境变量 > 配置文件 > 默认值）
-- ═══════════════════════════════════════════════════════════
function TaoLoadConfigFromFile(path)
    if not path then return nil end
    local fh = io.open(path, "r")
    if not fh then return nil, "无法打开配置文件: " .. path end
    local content = fh:read("*a")
    fh:close()
    if SimpleDecode then
        local ok, cfg = pcall(SimpleDecode, content)
        if ok and type(cfg) == "table" then return cfg end
    end
    -- 极简键值对解析 fallback
    local cfg = {}
    for line in content:gmatch("([^\r\n]+)") do
        local k, v = line:match("^%s*([^#%s=]+)%s*=%s*(.-)%s*$")
        if k and v then
            local num = tonumber(v)
            if num then
                cfg[k] = num
            elseif v == "true" then
                cfg[k] = true
            elseif v == "false" then
                cfg[k] = false
            else
                cfg[k] = v
            end
        end
    end
    return cfg
end

function TaoApplyConfigDefaults()
    local cli = TaoCLI.args
    -- 1. 默认值
    TAO_CONFIG = DeepCopy(TAO_CONFIG_DEFAULTS)
    TAO_WORLD_CONFIG = TAO_WORLD_CONFIG or {
        worldSeed = 42,
        regionSize = { w = 64, h = 64 },
        autoSaveInterval = 300,
        mempalaceArchiveDays = 30,
        maxConcurrentDerivations = 3,
        npcBatchSize = 20,
        enableVectorSearch = false
    }
    -- 2. 配置文件
    if cli.config then
        local fileCfg, err = TaoLoadConfigFromFile(cli.config)
        if fileCfg then
            for k, v in pairs(fileCfg) do
                if k:match("^deepseek_") or k:match("^doubao$") or k:match("^kimi$") then
                    if type(v) == "table" then
                        TAO_CONFIG[k] = MergeTables(TAO_CONFIG[k] or {}, v)
                    end
                else
                    TAO_WORLD_CONFIG[k] = v
                end
            end
            TaoLogger.Info("已加载配置文件", {path = cli.config})
        else
            TaoLogger.Warn("配置文件加载失败", {error = err})
        end
    end
    -- 3. CLI 覆盖
    if cli.seed then
        TAO_WORLD_CONFIG.worldSeed = cli.seed
    end
    if cli.debug ~= nil then
        TAO_DEBUG = cli.debug
    end
    if cli.logFile then
        TaoLogger.Init(cli.logLevel, cli.logFile)
    else
        TaoLogger.Init(cli.logLevel)
    end
end

-- ═══════════════════════════════════════════════════════════
-- 五、启动前健康检查
-- ═══════════════════════════════════════════════════════════
function TaoHealthCheck()
    local results = {}
    local allOk = true

    -- 1. 检查文件路径可写
    local testFile = ".tao_write_test"
    local fh = io.open(testFile, "w")
    if fh then
        fh:write("ok")
        fh:close()
        os.remove(testFile)
        results.fileWrite = {ok = true}
    else
        results.fileWrite = {ok = false, error = "当前目录不可写"}
        allOk = false
    end

    -- 2. 检查网络可用性（简单 DNS 解析模拟）
    local hasNetwork = false
    if os.execute("curl -s --max-time 2 http://api.deepseek.com > /dev/null 2>&1") == 0 then
        hasNetwork = true
    elseif os.execute("ping -c 1 -W 2 8.8.8.8 > /dev/null 2>&1") == 0 then
        hasNetwork = true
    end
    results.network = {ok = hasNetwork, error = hasNetwork and nil or "网络不可达（请检查外网连接）"}
    if not hasNetwork then allOk = false end

    -- 3. 检查模块文件是否存在
    local requiredFiles = {
        "scripts/network/Shared.lua",
        "scripts/network/tao/Tracery.lua",
        "scripts/network/tao/RegionGen.lua",
    }
    for _, path in ipairs(requiredFiles) do
        local testFh = io.open(path, "r")
        if testFh then
            testFh:close()
        else
            results.modules = results.modules or {}
            results.modules[path] = false
            allOk = false
        end
    end

    -- 4. 检查随机数
    math.randomseed(os.time())
    local r1, r2 = math.random(), math.random()
    results.random = {ok = (r1 ~= r2), error = "随机数发生器异常"}

    return allOk, results
end

-- ═══════════════════════════════════════════════════════════
-- 六、全局异常捕获
-- ═══════════════════════════════════════════════════════════
function TaoSafeCall(name, func, ...)
    local ok, result = pcall(func, ...)
    if not ok then
        TaoLogger.Error("函数执行异常: " .. tostring(name), {error = tostring(result)})
        return nil, result
    end
    return result, nil
end

function TaoSetGlobalExceptionHandler()
    -- Lua 本身没有全局异常处理器，我们在关键路径使用 pcall
    -- 此函数作为占位，可用于绑定到特定引擎事件
    TaoLogger.Info("全局异常处理机制已注册")
end

-- ═══════════════════════════════════════════════════════════
-- 七、模块加载系统
-- ═══════════════════════════════════════════════════════════
TAO_MODULE_GRAPH = {
    { name = "Shared",        path = "scripts/network/Shared.lua",        deps = {} },
    { name = "Router",        path = "scripts/network/tao/Router.lua",        deps = {"Shared"} },
    { name = "Validator",     path = "scripts/network/tao/Validator.lua",     deps = {"Shared"} },
    { name = "EventLog",      path = "scripts/network/tao/EventLog.lua",      deps = {"Shared"} },
    { name = "Mempalace",     path = "scripts/network/tao/Mempalace.lua",     deps = {"Shared","EventLog"} },
    { name = "AgentCore",     path = "scripts/network/tao/AgentCore.lua",     deps = {"Shared","Mempalace","EventLog","Validator"} },
    { name = "RegionGen",     path = "scripts/network/tao/RegionGen.lua",     deps = {"Shared"} },
    { name = "Tracery",       path = "scripts/network/tao/Tracery.lua",       deps = {"Shared"} },
    { name = "InkRuntime",    path = "scripts/network/tao/InkRuntime.lua",    deps = {"Shared"} },
    { name = "Server",        path = "scripts/network/Server.lua",            deps = {"Shared","Router","Validator","EventLog","Mempalace","AgentCore","RegionGen","Tracery"} },
    { name = "Client",        path = "scripts/network/Client.lua",            deps = {"Shared"} }
}

TAO_LOADED_MODULES = TAO_LOADED_MODULES or {}
TAO_LOAD_ERRORS = TAO_LOAD_ERRORS or {}

local function LoadModule(entry)
    if TAO_LOADED_MODULES[entry.name] then return true end
    for _, depName in ipairs(entry.deps) do
        local depEntry = nil
        for _, m in ipairs(TAO_MODULE_GRAPH) do
            if m.name == depName then depEntry = m; break end
        end
        if depEntry then
            local ok, err = pcall(LoadModule, depEntry)
            if not ok then
                TAO_LOAD_ERRORS[entry.name] = "依赖加载失败: " .. depName .. " -> " .. tostring(err)
                TaoLogger.Error(TAO_LOAD_ERRORS[entry.name])
                return false
            end
        end
    end
    TaoLogger.Info("加载模块: " .. entry.path)
    local ok, err = pcall(dofile, entry.path)
    if not ok then
        TAO_LOAD_ERRORS[entry.name] = tostring(err)
        TaoLogger.Error("模块加载失败: " .. entry.name, {error = tostring(err)})
        return false
    end
    TAO_LOADED_MODULES[entry.name] = true
    return true
end

function LoadAllTaoModules()
    local successCount = 0
    for _, entry in ipairs(TAO_MODULE_GRAPH) do
        if LoadModule(entry) then successCount = successCount + 1 end
    end
    TaoLogger.Info(string.format("模块加载完成: %d/%d", successCount, #TAO_MODULE_GRAPH))
    return successCount == #TAO_MODULE_GRAPH
end

-- ═══════════════════════════════════════════════════════════
-- 八、热重载支持（带状态迁移保护）
-- ═══════════════════════════════════════════════════════════
TaoHotReload = TaoHotReload or {}
TaoHotReload.stateSnapshots = TaoHotReload.stateSnapshots or {}
TaoHotReload.hooks = TaoHotReload.hooks or {}

function TaoHotReload.RegisterHook(moduleName, beforeUnload, afterLoad)
    TaoHotReload.hooks[moduleName] = {
        beforeUnload = beforeUnload,
        afterLoad = afterLoad
    }
end

function TaoHotReload.SaveState(moduleName)
    local state = {}
    if moduleName == "Mempalace" and _G.Mempalace then
        state.entities = DeepCopy(Mempalace.entities or {})
    elseif moduleName == "AgentCore" and _G.AgentCore then
        state.agents = DeepCopy(AgentCore.agents or {})
    elseif moduleName == "Server" and _G.ServerTao then
        state.worldData = DeepCopy(ServerTao.worldData or {})
    end
    TaoHotReload.stateSnapshots[moduleName] = state
    return state
end

function TaoHotReload.RestoreState(moduleName)
    local state = TaoHotReload.stateSnapshots[moduleName]
    if not state then return end
    if moduleName == "Mempalace" and _G.Mempalace then
        Mempalace.entities = MergeTables(Mempalace.entities or {}, state.entities or {})
    elseif moduleName == "AgentCore" and _G.AgentCore then
        AgentCore.agents = MergeTables(AgentCore.agents or {}, state.agents or {})
    elseif moduleName == "Server" and _G.ServerTao then
        ServerTao.worldData = MergeTables(ServerTao.worldData or {}, state.worldData or {})
    end
    TaoHotReload.stateSnapshots[moduleName] = nil
end

function ReloadTaoModule(moduleName, skipStateMigration)
    if not TAO_DEBUG then
        TaoLogger.Warn("热重载仅在 TAO_DEBUG=true 时可用")
        return false
    end
    for _, entry in ipairs(TAO_MODULE_GRAPH) do
        if entry.name == moduleName then
            local hook = TaoHotReload.hooks[moduleName]
            if hook and hook.beforeUnload then
                pcall(hook.beforeUnload)
            end
            if not skipStateMigration then
                TaoHotReload.SaveState(moduleName)
            end
            TaoLogger.Info("热重载模块: " .. moduleName)
            _G.package = _G.package or {}
            _G.package.loaded[entry.path] = nil
            local ok, err = pcall(dofile, entry.path)
            if ok then
                if not skipStateMigration then
                    TaoHotReload.RestoreState(moduleName)
                end
                if hook and hook.afterLoad then
                    pcall(hook.afterLoad)
                end
                TaoLogger.Info("热重载成功: " .. moduleName)
                return true
            else
                TaoLogger.Error("热重载失败: " .. moduleName, {error = tostring(err)})
                return false
            end
        end
    end
    TaoLogger.Warn("未知模块: " .. moduleName)
    return false
end

function ReloadAllTaoModules()
    if not TAO_DEBUG then
        TaoLogger.Warn("热重载仅在 TAO_DEBUG=true 时可用")
        return false
    end
    local results = {}
    for _, entry in ipairs(TAO_MODULE_GRAPH) do
        results[entry.name] = ReloadTaoModule(entry.name)
    end
    return results
end

-- ═══════════════════════════════════════════════════════════
-- 九、性能监控
-- ═══════════════════════════════════════════════════════════
TAO_PERF = TAO_PERF or {}

function TaoPerfBegin(name)
    TAO_PERF[name] = TAO_PERF[name] or { calls = 0, totalMs = 0, maxMs = 0 }
    TAO_PERF[name]._start = os.clock()
end

function TaoPerfEnd(name)
    local rec = TAO_PERF[name]
    if not rec or not rec._start then return end
    local elapsed = (os.clock() - rec._start) * 1000
    rec.calls = rec.calls + 1
    rec.totalMs = rec.totalMs + elapsed
    if elapsed > rec.maxMs then rec.maxMs = elapsed end
    rec._start = nil
end

function TaoPerfReport()
    local lines = {"[TaoPerf 报告]"}
    for name, rec in pairs(TAO_PERF) do
        local avg = rec.totalMs / math.max(1, rec.calls)
        table.insert(lines, string.format("  %s: calls=%d avg=%.2fms max=%.2fms total=%.2fms",
            name, rec.calls, avg, rec.maxMs, rec.totalMs))
    end
    return table.concat(lines, "\n")
end

-- ═══════════════════════════════════════════════════════════
-- 十、启动入口
-- ═══════════════════════════════════════════════════════════
function StartTaoWorld()
    print("========================================")
    print("  天道引擎 · Tao World Engine")
    print("  " .. TAO_VERSION .. " (" .. TAO_BUILD_DATE .. ")")
    print("========================================")

    local cli = TaoCLI.ParseArgs(arg)
    if cli.help then
        TaoCLI.PrintHelp()
        return true
    end

    TaoApplyConfigDefaults()
    TaoLogger.Info("天道引擎启动中...", {mode = cli.mode, debug = TAO_DEBUG, seed = TAO_WORLD_CONFIG.worldSeed})

    if not cli.noHealthCheck then
        TaoLogger.Info("执行启动前健康检查...")
        local healthy, checkResults = TaoSafeCall("HealthCheck", TaoHealthCheck)
        if healthy then
            for k, v in pairs(checkResults) do
                if not v.ok then
                    TaoLogger.Warn("健康检查未通过: " .. k, {error = v.error})
                end
            end
            if not healthy then
                TaoLogger.Warn("部分健康检查失败，但继续启动")
            else
                TaoLogger.Info("健康检查通过")
            end
        else
            TaoLogger.Warn("健康检查执行失败")
        end
    end

    if cli.dumpConfig then
        print("===== 当前完整配置 =====")
        print("TAO_CONFIG = " .. SimpleEncode(TAO_CONFIG))
        print("TAO_WORLD_CONFIG = " .. SimpleEncode(TAO_WORLD_CONFIG))
        return true
    end

    TaoSetGlobalExceptionHandler()

    local allOk = LoadAllTaoModules()
    if not allOk then
        TaoLogger.Error("致命错误：部分模块加载失败，天道引擎无法启动")
        for name, err in pairs(TAO_LOAD_ERRORS) do
            print("  - " .. name .. ": " .. err)
        end
        return false
    end

    -- 确定运行模式
    local isServer = false
    if cli.mode == "server" then
        isServer = true
    elseif cli.mode == "client" then
        isServer = false
    elseif network then
        isServer = network:IsServer()
    end

    if isServer then
        TaoLogger.Info("以服务端模式启动")
        if _G.ServerTao then
            TaoSafeCall("ServerTao.Init", ServerTao.Init)
            TaoSafeCall("ServerTao.LoadWorld", ServerTao.LoadWorld)
            TaoSafeCall("ServerTao.LoadMempalaceAll", ServerTao.LoadMempalaceAll)
            TaoSafeCall("ServerTao.StartAutoSave", ServerTao.StartAutoSave)
        end
        local startRegion = RegionGen.GenerateLayout(TAO_WORLD_CONFIG.worldSeed,
            TAO_WORLD_CONFIG.regionSize.w, TAO_WORLD_CONFIG.regionSize.h)
        RegionGen.SaveRegion("start_region", startRegion)
        TaoLogger.Info("起始区域已生成并保存")
        if _G.SPAWN_TEST_NPCS and SPAWN_TEST_NPCS == true then
            SpawnTestNpcs()
        end
        TaoLogger.Info("服务端天道系统启动完成")
    else
        TaoLogger.Info("以客户端模式启动")
        if _G.ClientTao then
            TaoSafeCall("ClientTao.Init", ClientTao.Init)
            if SubscribeToEvent then
                SubscribeToEvent("Update", function(eventType, eventData)
                    local dt = 0.016
                    if eventData and eventData["TimeStep"] then
                        dt = eventData["TimeStep"]:GetFloat()
                    end
                    ClientTao.Update(dt)
                end)
            end
        end
        TaoLogger.Info("客户端天道系统启动完成")
    end

    return true
end

-- ═══════════════════════════════════════════════════════════
-- 十一、测试 NPC 注册
-- ═══════════════════════════════════════════════════════════
function SpawnTestNpcs()
    if not _G.AgentCore then return end
    local npcs = {
        {id = "npc_jack", role = "商人", personality = "cunning", interval = 15, home = "集市东门", faction = "商会"},
        {id = "npc_elara", role = "法师", personality = "mysterious", interval = 20, home = "法师塔", faction = "法师会"},
        {id = "npc_guard_tom", role = "卫兵", personality = "stern", interval = 10, home = "城门", faction = "城卫队"},
    }
    for _, n in ipairs(npcs) do
        local ok = pcall(function()
            AgentCore.Init(n.id, {
                role = n.role,
                personality = n.personality,
                thinkInterval = n.interval,
                homeLoc = n.home,
                faction = n.faction
            })
        end)
        if not ok then
            TaoLogger.Warn("测试 NPC 注册失败", {id = n.id})
        end
    end
    TaoLogger.Info("测试 NPC 已注册")
end

-- ═══════════════════════════════════════════════════════════
-- 十二、便捷全局 API
-- ═══════════════════════════════════════════════════════════
function QueueWorldDerivation(eventType, data)
    if network and network:IsServer() and _G.ServerTao and ServerTao.worldDerivationQueue then
        table.insert(ServerTao.worldDerivationQueue, {
            eventType = eventType,
            data = data,
            queuedAt = (GetWorldTime and GetWorldTime()) or os.time()
        })
    elseif network then
        network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_PLAYER_WORLD_INTERACTION, true,
            eventType, SimpleEncode(data or {}))
    end
end

function RequestNpcStrategy(npcId, connection)
    if network and network:IsServer() then
        if _G.AgentCore and AgentCore.agents and AgentCore.agents[npcId] then
            AgentCore.RequestStrategy(npcId, connection)
        end
    elseif network then
        network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_REQUEST_NPC_DIALOG, true, npcId)
    end
end

function GenerateRegion_Layout(seed, w, h)
    TaoPerfBegin("GenerateRegion_Layout")
    local result = RegionGen.GenerateLayout(seed, w, h)
    TaoPerfEnd("GenerateRegion_Layout")
    return result
end

function GenerateRegion_Heightmap(seed, w, h)
    TaoPerfBegin("GenerateRegion_Heightmap")
    local result = RegionGen.GenerateHeightmap(seed, w, h)
    TaoPerfEnd("GenerateRegion_Heightmap")
    return result
end

function PlaceBuildingInRegion(heightmap, layout, size)
    return RegionGen.PlaceBuilding(heightmap, layout, size)
end

function SaveRegion(regionId, regionData)
    return RegionGen.SaveRegion(regionId, regionData)
end

function LoadRegion(regionId)
    return RegionGen.LoadRegion(regionId)
end

function TraceryFlatten(rule, grammar)
    return Tracery.Flatten(rule, grammar)
end

function GenerateItemName(prefixPool, materialPool, weaponPool)
    return Tracery.GenerateItemName(prefixPool, materialPool, weaponPool)
end

function LoadInkStory(scriptOrName)
    if _G.InkRuntime then return InkRuntime.LoadStory(scriptOrName) end
    return nil
end

function ContinueInkStory(story)
    if _G.InkRuntime then return InkRuntime.Continue(story) end
    return nil
end

function ChooseInkChoice(story, index)
    if _G.InkRuntime then return InkRuntime.ChooseChoiceIndex(story, index) end
    return nil
end

function SetHardLock(category, id, value)
    if _G.Validator then Validator.SetHardLock(category, id, value) end
end

function SaveTaoWorld()
    if network and network:IsServer() and _G.ServerTao then
        TaoPerfBegin("SaveTaoWorld")
        ServerTao.SaveWorld()
        TaoPerfEnd("SaveTaoWorld")
    end
end

function LoadTaoWorld()
    if network and network:IsServer() and _G.ServerTao then
        TaoPerfBegin("LoadTaoWorld")
        ServerTao.LoadWorld()
        ServerTao.LoadMempalaceAll()
        TaoPerfEnd("LoadTaoWorld")
    end
end

function QueryMempalace(entityId, roomName, n)
    if _G.Mempalace then return Mempalace.QueryRoom(entityId, roomName, n or 5) end
    return nil
end

function AddMemory(entityId, roomName, entry)
    if _G.Mempalace then Mempalace.Add(entityId, roomName, entry) end
end

function GetRelationshipMap(entityId)
    if _G.Mempalace then return Mempalace.GetRelationshipMap(entityId) end
    return nil
end

-- ═══════════════════════════════════════════════════════════
-- 十三、内存与资源监控
-- ═══════════════════════════════════════════════════════════
function TaoGetMemoryUsage()
    if collectgarbage then
        return collectgarbage("count")
    end
    return 0
end

function TaoLogMemorySnapshot(label)
    label = label or "memory"
    local kb = TaoGetMemoryUsage()
    TaoLogger.Info("内存快照 " .. label, {kb = kb})
    return kb
end

-- ═══════════════════════════════════════════════════════════
-- 十四、配置校验
-- ═══════════════════════════════════════════════════════════
function TaoValidateConfig(cfg, schema)
    cfg = cfg or TAO_WORLD_CONFIG
    schema = schema or {
        worldSeed = "number",
        regionSize = "table",
        autoSaveInterval = "number",
        mempalaceArchiveDays = "number",
        maxConcurrentDerivations = "number",
        npcBatchSize = "number",
        enableVectorSearch = "boolean"
    }
    local errors = {}
    for key, expectedType in pairs(schema) do
        local actualType = type(cfg[key])
        if actualType ~= expectedType then
            table.insert(errors, key .. " 期望类型 " .. expectedType .. "，实际为 " .. actualType)
        end
    end
    return #errors == 0, errors
end

-- ═══════════════════════════════════════════════════════════
-- 十五、模块差异检测（热重载辅助）
-- ═══════════════════════════════════════════════════════════
function TaoDiffModuleStates(moduleName, oldState, newState)
    if not oldState or not newState then return nil, "状态为空" end
    local diff = {}
    for k, v in pairs(newState) do
        if oldState[k] == nil then
            diff[k] = {type = "added", value = v}
        elseif type(v) == "table" and type(oldState[k]) == "table" then
            local subDiff = TaoDiffModuleStates(moduleName .. "." .. k, oldState[k], v)
            if subDiff and next(subDiff) then diff[k] = subDiff end
        elseif v ~= oldState[k] then
            diff[k] = {type = "changed", old = oldState[k], new = v}
        end
    end
    for k, v in pairs(oldState) do
        if newState[k] == nil then
            diff[k] = {type = "removed", value = v}
        end
    end
    return diff
end

-- ═══════════════════════════════════════════════════════════
-- 十六、信号处理辅助（纯 Lua 占位，可接入引擎钩子）
-- ═══════════════════════════════════════════════════════════
function TaoRegisterShutdownHook(func)
    TaoShutdownHooks = TaoShutdownHooks or {}
    table.insert(TaoShutdownHooks, func)
end

function TaoRunShutdownHooks()
    TaoShutdownHooks = TaoShutdownHooks or {}
    for _, hook in ipairs(TaoShutdownHooks) do
        pcall(hook)
    end
    TaoLogger.Close()
end

-- ═══════════════════════════════════════════════════════════
-- 十七、守护模式辅助
-- ═══════════════════════════════════════════════════════════
function TaoDaemonize()
    if os.execute then
        os.execute("disown")
    end
    TaoLogger.Info("守护模式已激活")
end

-- ═══════════════════════════════════════════════════════════
-- 十八、自动启动
-- ═══════════════════════════════════════════════════════════
local ok, err = pcall(StartTaoWorld)
if not ok then
    print("[FATAL] 天道引擎启动失败: " .. tostring(err))
    if TaoLogger.Error then
        TaoLogger.Error("天道引擎启动失败", {error = tostring(err)})
    end
end
