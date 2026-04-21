-- LevelManager.lua
-- 关卡/场景管理器：切换场景、加载进度、异步加载、淡入淡出过渡

local LEVEL_MANAGER = {}
LEVEL_MANAGER.__index = LEVEL_MANAGER

--- 最大淡入淡出时间（秒）
local MAX_FADE_TIME = 0.3

--- 淡入淡出状态枚举
local FADE_STATUS_IDLE        = -1
local FADE_STATUS_PREPARE_OUT = 0
local FADE_STATUS_FADE_OUT    = 1
local FADE_STATUS_RELEASE_OLD = 2
local FADE_STATUS_CREATE_NEW  = 3
local FADE_STATUS_FADE_IN     = 4
local FADE_STATUS_FINISH      = 5

--- 已注册的关卡类表
local registeredLevels = {}

--- 当前关卡实例
local currentLevelInstance = nil

--- 关卡切换队列
local levelQueue = {}

--- 切换事件数据
local switchData = {}

--- 当前关卡名称
local currentLevelName = "NONE"

--- 上一个关卡名称
local previousLevelName = "NONE"

--- 淡出遮罩 UI 元素
local fadeWindow = nil

--- 当前淡出时间
local fadeTime = 0.0

--- 当前淡出状态
local fadeStatus = FADE_STATUS_IDLE

--- 场景管理器引用
local sceneMgr = nil

--- 创建全屏黑色淡入淡出遮罩窗口
-- @return UIElement 遮罩窗口
local function CreateFadeLayer()
    if fadeWindow then
        fadeWindow:Remove()
        fadeWindow = nil
    end

    local ui = ui
    local graphics = graphics
    if not ui or not graphics then
        return nil
    end

    fadeWindow = ui:GetRoot():CreateChild("Window")
    fadeWindow:SetFixedWidth(graphics:GetWidth())
    fadeWindow:SetFixedHeight(graphics:GetHeight())
    fadeWindow:SetLayoutMode(LM_FREE)
    fadeWindow:SetAlignment(HA_CENTER, VA_CENTER)
    fadeWindow:SetColor(Color(0.0, 0.0, 0.0, 1.0))
    fadeWindow:BringToFront()
    fadeWindow:SetPriority(1000)
    return fadeWindow
end

--- 发送关卡事件
-- @param eventName string 事件名
-- @param from string 源关卡
-- @param to string 目标关卡
local function SendLevelEvent(eventName, from, to)
    local eventData = VariantMap()
    eventData["From"] = from or previousLevelName
    eventData["To"] = to or currentLevelName
    SendEvent(eventName, eventData)
end

--- 创建新的关卡管理器实例
-- @return table LevelManager 实例
function LEVEL_MANAGER.New()
    local self = setmetatable({}, LEVEL_MANAGER)

    SubscribeToEvent("SetLevel", function(eventType, eventData)
        self:HandleSetLevelQueue(eventData)
    end)

    SubscribeToEvent("Update", function(eventType, eventData)
        self:HandleUpdate(eventData)
    end)

    if ui then
        ui:GetRoot():RemoveAllChildren()
    end

    return self
end

--- 注册关卡类
-- @param name string 关卡名称
-- @param levelClass table 关卡类（需包含 Init/Dispose/Update 等可选方法）
function LEVEL_MANAGER:RegisterLevel(name, levelClass)
    registeredLevels[name] = levelClass
    DebugLogger:Info("LevelManager", "Registered level: " .. name)
end

--- 获取当前关卡名称
-- @return string 当前关卡名
function LEVEL_MANAGER:GetCurrentLevel()
    return currentLevelName
end

--- 获取上一个关卡名称
-- @return string 上一个关卡名
function LEVEL_MANAGER:GetPreviousLevel()
    return previousLevelName
end

--- 获取当前关卡实例
-- @return table|nil 当前关卡实例
function LEVEL_MANAGER:GetCurrentLevelInstance()
    return currentLevelInstance
end

--- 处理关卡切换请求事件
-- @param eventData VariantMap 事件数据
function LEVEL_MANAGER:HandleSetLevelQueue(eventData)
    local name = eventData:GetString("Name")
    if not name or name == "" then
        DebugLogger:Error("LevelManager", "Failed to push level to queue, level name empty!")
        return
    end

    if #levelQueue == 0 then
        fadeStatus = FADE_STATUS_PREPARE_OUT
    end

    table.insert(levelQueue, name)
    switchData = {}
    for k, v in pairs(eventData) do
        switchData[k] = v
    end
end

--- 发起关卡切换
-- @param name string 目标关卡名
-- @param data table|VariantMap 附加数据（可选）
function LEVEL_MANAGER:ChangeLevel(name, data)
    local eventData = VariantMap()
    eventData:SetString("Name", name)
    if data then
        for k, v in pairs(data) do
            if type(k) == "string" then
                eventData[k] = v
            end
        end
    end
    SendEvent("SetLevel", eventData)
end

--- 销毁当前关卡实例
local function DisposeCurrentLevel()
    if currentLevelInstance and currentLevelInstance.Dispose then
        currentLevelInstance:Dispose()
    end
    currentLevelInstance = nil
end

--- 创建新关卡实例
-- @param name string 关卡名称
-- @return boolean 是否成功
local function CreateLevel(name)
    local levelClass = registeredLevels[name]
    if not levelClass then
        DebugLogger:Error("LevelManager", "Level '" .. name .. "' doesn't exist! Moving to 'MainMenu'")
        local eventData = VariantMap()
        eventData:SetString("Name", "MainMenu")
        eventData:SetString("Message", "LEVEL_NOT_EXIST : " .. name)
        SendEvent("SetLevel", eventData)
        return false
    end

    local instance = {}
    setmetatable(instance, { __index = levelClass })

    previousLevelName = currentLevelName
    currentLevelName = name

    if instance.Init then
        instance:Init(switchData)
    end

    currentLevelInstance = instance
    DebugLogger:Info("LevelManager", "Created level: " .. name)
    return true
end

--- 更新淡入淡出与关卡切换逻辑
-- @param eventData VariantMap Update 事件数据
function LEVEL_MANAGER:HandleUpdate(eventData)
    if fadeStatus == FADE_STATUS_IDLE then
        return
    end

    local timeStep = eventData:GetFloat("TimeStep")
    fadeTime = fadeTime - timeStep

    -- 准备淡出
    if fadeStatus == FADE_STATUS_PREPARE_OUT then
        SendLevelEvent("LevelChangingStarted", currentLevelName, levelQueue[1])

        if not currentLevelInstance then
            fadeStatus = FADE_STATUS_CREATE_NEW
            return
        end

        CreateFadeLayer()
        if fadeWindow then
            fadeWindow:SetOpacity(0.0)
        end
        fadeTime = MAX_FADE_TIME
        fadeStatus = FADE_STATUS_FADE_OUT
        return
    end

    -- 淡出中
    if fadeStatus == FADE_STATUS_FADE_OUT then
        if fadeWindow then
            fadeWindow:SetFocus(true)
            fadeWindow:SetOpacity(1.0 - fadeTime / MAX_FADE_TIME)
        end

        if fadeTime <= 0.0 then
            fadeStatus = FADE_STATUS_RELEASE_OLD
            SendEvent("LevelBeforeDestroy", VariantMap())
        end
        return
    end

    -- 释放旧关卡
    if fadeStatus == FADE_STATUS_RELEASE_OLD then
        DisposeCurrentLevel()
        fadeStatus = FADE_STATUS_CREATE_NEW
        SendEvent("CloseAllWindows", VariantMap())
        return
    end

    -- 创建新关卡
    if fadeStatus == FADE_STATUS_CREATE_NEW then
        local ok = CreateLevel(levelQueue[1])
        if not ok then
            table.remove(levelQueue, 1)
            fadeStatus = FADE_STATUS_IDLE
            return
        end

        CreateFadeLayer()
        if fadeWindow then
            fadeWindow:SetOpacity(1.0)
        end
        fadeTime = MAX_FADE_TIME
        fadeStatus = FADE_STATUS_FADE_IN

        SendLevelEvent("LevelChangingInProgress", previousLevelName, currentLevelName)
        return
    end

    -- 淡入中
    if fadeStatus == FADE_STATUS_FADE_IN then
        if fadeWindow then
            fadeWindow:SetFocus(true)
            fadeWindow:SetOpacity(fadeTime / MAX_FADE_TIME)
        end

        if fadeTime <= 0.0 then
            fadeStatus = FADE_STATUS_FINISH
        end
        return
    end

    -- 完成切换
    if fadeStatus == FADE_STATUS_FINISH then
        if fadeWindow then
            fadeWindow:Remove()
            fadeWindow = nil
        end

        SendLevelEvent("LevelChangingFinished", previousLevelName, currentLevelName)

        local loadedEvent = VariantMap()
        loadedEvent:SetString("Name", levelQueue[1])
        SendEvent("LevelLoaded", loadedEvent)

        table.remove(levelQueue, 1)

        if cache then
            cache:ReleaseAllResources(false)
        end

        if #levelQueue > 0 then
            fadeStatus = FADE_STATUS_PREPARE_OUT
        else
            fadeStatus = FADE_STATUS_IDLE
        end
        return
    end
end

---  BaseLevel 原型
-- 所有自定义关卡建议继承此原型
BaseLevel = {}
BaseLevel.__index = BaseLevel

--- 创建新的 BaseLevel 实例
-- @return table BaseLevel 实例
function BaseLevel.New()
    local self = setmetatable({}, BaseLevel)
    self.scene = nil
    self.viewports = {}
    self.cameras = {}
    self.data = {}
    return self
end

--- 初始化关卡（子类可覆盖）
-- @param data table 切换时传入的数据
function BaseLevel:Init(data)
    self.data = data or {}
    DebugLogger:Info("BaseLevel", "Init called")
end

--- 运行关卡（启用场景更新）
function BaseLevel:Run()
    if self.scene then
        self.scene:SetUpdateEnabled(true)
    end
end

--- 暂停关卡（禁用场景更新）
function BaseLevel:Pause()
    if self.scene then
        self.scene:SetUpdateEnabled(false)
    end
end

--- 销毁关卡（子类可覆盖，但务必调用基类）
function BaseLevel:Dispose()
    if self.scene then
        self.scene:SetUpdateEnabled(false)
        self.scene:Clear()
        self.scene:Remove()
        self.scene = nil
    end

    self.viewports = {}
    self.cameras = {}

    if ui then
        ui:GetRoot():RemoveAllChildren()
    end
    DebugLogger:Info("BaseLevel", "Disposed")
end

--- 定义分屏视口矩形（支持 1-8 人）
-- @param count number 分屏数量
-- @return table IntRect 表数组
function BaseLevel:InitRects(count)
    local g = graphics
    if not g then
        return {}
    end

    local w = g:GetWidth()
    local h = g:GetHeight()
    local rects = {}

    if count == 1 then
        rects = { { left = 0, top = 0, right = w, bottom = h } }
    elseif count == 2 then
        rects = {
            { left = 0, top = 0, right = w / 2, bottom = h },
            { left = w / 2, top = 0, right = w, bottom = h }
        }
    elseif count == 3 then
        rects = {
            { left = 0, top = 0, right = w / 2, bottom = h / 2 },
            { left = w / 2, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w, bottom = h }
        }
    elseif count == 4 then
        rects = {
            { left = 0, top = 0, right = w / 2, bottom = h / 2 },
            { left = w / 2, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w / 2, bottom = h },
            { left = w / 2, top = h / 2, right = w, bottom = h }
        }
    elseif count == 5 then
        rects = {
            { left = 0, top = 0, right = w / 2, bottom = h / 2 },
            { left = w / 2, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w / 3, bottom = h },
            { left = w / 3, top = h / 2, right = w * 2 / 3, bottom = h },
            { left = w * 2 / 3, top = h / 2, right = w, bottom = h }
        }
    elseif count == 6 then
        rects = {
            { left = 0, top = 0, right = w / 3, bottom = h / 2 },
            { left = w / 3, top = 0, right = w * 2 / 3, bottom = h / 2 },
            { left = w * 2 / 3, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w / 3, bottom = h },
            { left = w / 3, top = h / 2, right = w * 2 / 3, bottom = h },
            { left = w * 2 / 3, top = h / 2, right = w, bottom = h }
        }
    elseif count == 7 then
        rects = {
            { left = 0, top = 0, right = w / 3, bottom = h / 2 },
            { left = w / 3, top = 0, right = w * 2 / 3, bottom = h / 2 },
            { left = w * 2 / 3, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w / 4, bottom = h },
            { left = w / 4, top = h / 2, right = w / 2, bottom = h },
            { left = w / 2, top = h / 2, right = w * 3 / 4, bottom = h },
            { left = w * 3 / 4, top = h / 2, right = w, bottom = h }
        }
    elseif count == 8 then
        rects = {
            { left = 0, top = 0, right = w / 4, bottom = h / 2 },
            { left = w / 4, top = 0, right = w / 2, bottom = h / 2 },
            { left = w / 2, top = 0, right = w * 3 / 4, bottom = h / 2 },
            { left = w * 3 / 4, top = 0, right = w, bottom = h / 2 },
            { left = 0, top = h / 2, right = w / 4, bottom = h },
            { left = w / 4, top = h / 2, right = w / 2, bottom = h },
            { left = w / 2, top = h / 2, right = w * 3 / 4, bottom = h },
            { left = w * 3 / 4, top = h / 2, right = w, bottom = h }
        }
    end

    return rects
end

--- 创建单个相机与视口
-- @param index number 玩家索引
-- @param totalCount number 总分屏数
-- @param controllerIndex number 控制器索引
function BaseLevel:CreateSingleCamera(index, totalCount, controllerIndex)
    if not self.scene then
        return
    end
    local renderer = renderer
    if not renderer then
        return
    end

    local rects = self:InitRects(totalCount)
    local rect = rects[index + 1]
    if not rect then
        return
    end

    local cameraNode = self.scene:CreateChild("Camera", LOCAL)
    cameraNode.position = Vector3(0, 1, 0)
    local camera = cameraNode:CreateComponent("Camera", LOCAL)
    camera:SetFarClip(1000.0)
    camera:SetNearClip(0.1)
    local fov = GetGlobalVar("CameraFov"):GetFloat()
    if fov <= 0 then
        fov = 80.0
    end
    camera:SetFov(fov)
    cameraNode:CreateComponent("SoundListener")

    if audio then
        audio:SetListener(cameraNode:GetComponent("SoundListener"))
    end

    local viewport = Viewport(self.scene, camera, IntRect(rect.left, rect.top, rect.right, rect.bottom))
    renderer:SetViewport(index, viewport)

    local cache = cache
    if cache then
        viewport:SetRenderPath(cache:GetResource("XMLFile", "RenderPaths/ForwardDepth.xml"))
    end

    self.viewports[controllerIndex] = viewport
    self.cameras[controllerIndex] = cameraNode
end

--- 初始化分屏视口
-- @param playerIndexes table 玩家索引数组
function BaseLevel:InitViewports(playerIndexes)
    local renderer = renderer
    if not renderer or not self.scene then
        return
    end

    renderer:SetNumViewports(#playerIndexes)
    self.viewports = {}
    self.cameras = {}

    for i = 1, #playerIndexes do
        self:CreateSingleCamera(i - 1, #playerIndexes, playerIndexes[i])
    end
end

--- 全局单例
LevelManager = LEVEL_MANAGER.New()

return LEVEL_MANAGER
