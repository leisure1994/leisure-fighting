-- main.lua
-- UrhoX 项目模板入口
-- 展示如何初始化 ConfigManager、LevelManager、UIManager、ModLoader 和 DebugLogger

--- 应用名称
local APP_NAME = "UrhoX Project Template"

--- 默认启动的关卡名称
local DEFAULT_START_LEVEL = "MainMenu"

--- 初始化日志系统
function InitLogger()
    DebugLogger:SetLogLevel(0) -- DEBUG 级别
    DebugLogger:SetConsoleOutput(true)
    DebugLogger:Info("Main", APP_NAME .. " starting...")
end

--- 初始化配置系统
function InitConfig()
    -- ConfigManager 在加载时已经自动尝试读取 Data/Config/config.json
    -- 这里可以写入一些默认配置项
    if not ConfigManager:Has("game", "LoadMods") then
        ConfigManager:Set("game", "LoadMods", true)
    end
    if not ConfigManager:Has("game", "Language") then
        ConfigManager:Set("game", "Language", "zh")
    end
    if not ConfigManager:Has("video", "Fullscreen") then
        ConfigManager:Set("video", "Fullscreen", false)
    end
    if not ConfigManager:Has("video", "VSync") then
        ConfigManager:Set("video", "VSync", true)
    end
    if not ConfigManager:Has("audio", "MasterVolume") then
        ConfigManager:Set("audio", "MasterVolume", 1.0)
    end

    ConfigManager:Save()
    DebugLogger:Info("Main", "ConfigManager initialized")
end

--- 初始化关卡管理器并注册示例关卡
function InitLevels()
    -- 注册主菜单关卡
    local MainMenuLevel = {}
    setmetatable(MainMenuLevel, { __index = BaseLevel })

    --- 初始化主菜单场景
    -- @param data table 切换数据
    function MainMenuLevel:Init(data)
        DebugLogger:Info("MainMenuLevel", "Initializing main menu")
        -- 示例：创建一个简单的 Zone 和相机
        if not self.scene then
            self.scene = Scene()
        end
        self:InitViewports({ 0 })
    end

    --- 主菜单每帧更新
    -- @param timeStep number 时间步长
    function MainMenuLevel:Update(timeStep)
        -- 主菜单逻辑
    end

    LevelManager:RegisterLevel("MainMenu", MainMenuLevel)

    -- 注册游戏关卡
    local GameLevel = {}
    setmetatable(GameLevel, { __index = BaseLevel })

    --- 初始化游戏场景
    -- @param data table 切换数据
    function GameLevel:Init(data)
        DebugLogger:Info("GameLevel", "Initializing game level")
        if not self.scene then
            self.scene = Scene()
        end
        self:InitViewports({ 0 })
    end

    --- 游戏关卡每帧更新
    -- @param timeStep number 时间步长
    function GameLevel:Update(timeStep)
        -- 游戏主逻辑
    end

    LevelManager:RegisterLevel("Game", GameLevel)

    DebugLogger:Info("Main", "Levels registered")
end

--- 初始化 UI 管理器并注册示例窗口
function InitUI()
    -- 注册示例设置窗口
    local SettingsWindow = {}
    setmetatable(SettingsWindow, { __index = BaseWindow })

    --- 创建设置窗口 UI
    function SettingsWindow:Create()
        local overlay = self:CreateOverlay()
        DebugLogger:Info("SettingsWindow", "Create UI here")
        -- 示例：可在此使用 ui:GetRoot() 或 overlay 创建按钮、文本等
    end

    WindowManager:RegisterWindow("SettingsWindow", SettingsWindow)

    -- 注册示例暂停窗口
    local PauseWindow = {}
    setmetatable(PauseWindow, { __index = BaseWindow })

    --- 创建暂停窗口 UI
    function PauseWindow:Create()
        local overlay = self:CreateOverlay()
        DebugLogger:Info("PauseWindow", "Create UI here")
    end

    WindowManager:RegisterWindow("PauseWindow", PauseWindow)

    DebugLogger:Info("Main", "UI windows registered")
end

--- 初始化 Mod 加载器
function InitMods()
    local loadMods = ConfigManager:GetBool("game", "LoadMods", true)
    ModLoader:SetEnabled(loadMods)
    if loadMods then
        ModLoader:LoadAllMods()
    end
    DebugLogger:Info("Main", "ModLoader initialized")
end

--- 初始化全局事件监听
function InitGlobalEvents()
    SubscribeToEvent("LevelChangingStarted", function(eventType, eventData)
        local from = eventData:GetString("From")
        local to = eventData:GetString("To")
        DebugLogger:Info("Global", "Level changing started: " .. from .. " -> " .. to)
    end)

    SubscribeToEvent("LevelChangingFinished", function(eventType, eventData)
        local from = eventData:GetString("From")
        local to = eventData:GetString("To")
        DebugLogger:Info("Global", "Level changing finished: " .. from .. " -> " .. to)
    end)

    SubscribeToEvent("WindowClosed", function(eventType, eventData)
        local name = eventData:GetString("Name")
        DebugLogger:Info("Global", "Window closed: " .. name)
    end)

    SubscribeToEvent("ModsLoaded", function(eventType, eventData)
        local mods = eventData:GetVariantVector("Mods")
        DebugLogger:Info("Global", "Mods loaded count: " .. tostring(mods:Size()))
    end)

    -- 示例：按下 ESC 打开暂停窗口（如果引擎的 Input 子系统可用）
    SubscribeToEvent("KeyDown", function(eventType, eventData)
        local key = eventData:GetInt("Key")
        if key == KEY_ESCAPE then
            if WindowManager:IsWindowOpen("PauseWindow") then
                WindowManager:CloseWindow("PauseWindow")
            else
                WindowManager:OpenWindow("PauseWindow")
            end
        end
    end)
end

--- 应用主入口
function Start()
    InitLogger()
    InitConfig()
    InitLevels()
    InitUI()
    InitMods()
    InitGlobalEvents()

    -- 启动默认关卡
    LevelManager:ChangeLevel(DEFAULT_START_LEVEL)

    DebugLogger:Info("Main", APP_NAME .. " started successfully")
end

--- 应用退出前调用
function Stop()
    ConfigManager:Save()
    DebugLogger:Info("Main", APP_NAME .. " stopping...")
end

-- 立即执行启动
Start()
