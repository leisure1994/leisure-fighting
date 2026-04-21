-- UIManager.lua
-- UI 窗口管理器：打开/关闭/堆叠面板、焦点管理、延迟销毁

local UI_MANAGER = {}
UI_MANAGER.__index = UI_MANAGER

--- 已注册的窗口类表：name -> class
local registeredWindows = {}

--- 当前活跃的窗口实例表：name -> instance
local activeWindows = {}

--- 已打开窗口名称列表（用于顺序和焦点管理）
local openedWindowNames = {}

--- 待关闭窗口名称队列（延迟到下一帧销毁）
local closeQueue = {}

--- 创建新的 UI 管理器实例
-- @return table UIManager 实例
function UI_MANAGER.New()
    local self = setmetatable({}, UI_MANAGER)

    SubscribeToEvent("OpenWindow", function(eventType, eventData)
        self:HandleOpenWindow(eventData)
    end)

    SubscribeToEvent("CloseWindow", function(eventType, eventData)
        self:HandleCloseWindow(eventData)
    end)

    SubscribeToEvent("CloseAllWindows", function(eventType, eventData)
        self:HandleCloseAllWindows()
    end)

    SubscribeToEvent("Update", function(eventType, eventData)
        self:HandleUpdate()
    end)

    return self
end

--- 注册窗口类
-- @param name string 窗口名称
-- @param windowClass table 窗口类（需包含 Create/Dispose 等可选方法）
function UI_MANAGER:RegisterWindow(name, windowClass)
    registeredWindows[name] = windowClass
    DebugLogger:Info("UIManager", "Registered window: " .. name)
end

--- 检查指定窗口是否已打开
-- @param windowName string 窗口名称
-- @return boolean 是否打开
function UI_MANAGER:IsWindowOpen(windowName)
    return activeWindows[windowName] ~= nil
end

--- 检查是否有任何窗口处于打开状态
-- @return boolean 是否有窗口打开
function UI_MANAGER:IsAnyWindowOpened()
    return #openedWindowNames > 0
end

--- 获取指定窗口实例
-- @param windowName string 窗口名称
-- @return table|nil 窗口实例
function UI_MANAGER:GetWindow(windowName)
    return activeWindows[windowName]
end

--- 获取当前最顶层窗口名称
-- @return string|nil 顶层窗口名
function UI_MANAGER:GetTopWindowName()
    return openedWindowNames[#openedWindowNames]
end

--- 打开窗口
-- @param name string 窗口名称
-- @param data table|VariantMap 传入窗口的初始化数据（可选）
function UI_MANAGER:OpenWindow(name, data)
    local eventData = VariantMap()
    eventData:SetString("Name", name)
    if data then
        for k, v in pairs(data) do
            if type(k) == "string" then
                eventData[k] = v
            end
        end
    end
    SendEvent("OpenWindow", eventData)
end

--- 关闭窗口
-- @param name string 窗口名称
function UI_MANAGER:CloseWindow(name)
    local eventData = VariantMap()
    eventData:SetString("Name", name)
    SendEvent("CloseWindow", eventData)
end

--- 关闭所有窗口
function UI_MANAGER:CloseAllWindows()
    SendEvent("CloseAllWindows", VariantMap())
end

--- 处理打开窗口事件
-- @param eventData VariantMap 事件数据
function UI_MANAGER:HandleOpenWindow(eventData)
    local windowName = eventData:GetString("Name")
    if not windowName or windowName == "" then
        DebugLogger:Error("UIManager", "OpenWindow event missing Name")
        return
    end

    local closePrevious = false
    if eventData.Contains then
        closePrevious = eventData:GetBool("ClosePrevious")
    else
        closePrevious = eventData["ClosePrevious"] == true
    end

    if activeWindows[windowName] then
        DebugLogger:Warning("UIManager", "Window '" .. windowName .. "' already opened!")
        if closePrevious then
            self:InternalCloseWindow(windowName)
        else
            return
        end
    end

    local windowClass = registeredWindows[windowName]
    if not windowClass then
        DebugLogger:Error("UIManager", "Failed to open window '" .. windowName .. "', not registered!")
        return
    end

    DebugLogger:Info("UIManager", "Opening window: " .. windowName)

    local instance = {}
    setmetatable(instance, { __index = windowClass })
    instance.data = {}
    if eventData then
        for k, v in pairs(eventData) do
            instance.data[k] = v
        end
    end

    if instance.Init then
        instance:Init()
    end
    if instance.Create then
        instance:Create()
    end

    activeWindows[windowName] = instance
    table.insert(openedWindowNames, windowName)
end

--- 处理关闭窗口事件
-- @param eventData VariantMap 事件数据
function UI_MANAGER:HandleCloseWindow(eventData)
    local windowName = eventData:GetString("Name")
    if windowName and windowName ~= "" then
        table.insert(closeQueue, windowName)
    end
end

--- 处理关闭所有窗口事件
function UI_MANAGER:HandleCloseAllWindows()
    DebugLogger:Info("UIManager", "Closing all windows")
    for _, name in ipairs(openedWindowNames) do
        table.insert(closeQueue, name)
    end
    openedWindowNames = {}
end

--- 内部关闭窗口（立即执行销毁）
-- @param windowName string 窗口名称
function UI_MANAGER:InternalCloseWindow(windowName)
    local instance = activeWindows[windowName]
    if not instance then
        return
    end

    DebugLogger:Info("UIManager", "Closing window: " .. windowName)

    if instance.Dispose then
        instance:Dispose()
    end

    activeWindows[windowName] = nil

    for i = #openedWindowNames, 1, -1 do
        if openedWindowNames[i] == windowName then
            table.remove(openedWindowNames, i)
            break
        end
    end

    local eventData = VariantMap()
    eventData:SetString("Name", windowName)
    SendEvent("WindowClosed", eventData)
end

--- 每帧更新，处理延迟关闭队列
function UI_MANAGER:HandleUpdate()
    if #closeQueue > 0 then
        for _, name in ipairs(closeQueue) do
            self:InternalCloseWindow(name)
        end
        closeQueue = {}
    end
end

--- BaseWindow 原型
-- 所有自定义 UI 窗口建议继承此原型
BaseWindow = {}
BaseWindow.__index = BaseWindow

--- 创建新的 BaseWindow 实例
-- @return table BaseWindow 实例
function BaseWindow.New()
    local self = setmetatable({}, BaseWindow)
    self.overlay = nil
    self.data = {}
    return self
end

--- 初始化窗口（子类可覆盖）
function BaseWindow:Init()
    DebugLogger:Info("BaseWindow", "Init called")
end

--- 设置窗口数据
-- @param data table 窗口数据
function BaseWindow:SetData(data)
    self.data = data or {}
end

--- 创建半透明背景遮罩 Sprite
-- @return UIElement Sprite 遮罩
function BaseWindow:CreateOverlay()
    if self.overlay then
        self.overlay:Remove()
        self.overlay = nil
    end

    if not ui then
        return nil
    end

    local cache = cache
    self.overlay = ui:GetRoot():CreateChild("Sprite")
    self.overlay:SetEnabled(true)
    self.overlay:SetPosition(0, 0)

    local tex = nil
    if cache then
        tex = cache:GetResource("Texture2D", "Textures/Transparent.png")
    end
    if tex then
        self.overlay:SetTexture(tex)
    end

    local w, h = 1280, 720
    if graphics then
        w = graphics:GetWidth()
        h = graphics:GetHeight()
    end
    if ui then
        local scale = ui:GetScale()
        if scale > 0 then
            w = math.floor(w / scale)
            h = math.floor(h / scale)
        end
    end

    self.overlay:SetFixedWidth(w)
    self.overlay:SetFixedHeight(h)
    self.overlay:SetBlendMode(BLEND_ALPHA)

    SubscribeToEvent("VideoSettingsChanged", function(eventType, eventData)
        if not self.overlay then
            return
        end
        local newW, newH = 1280, 720
        if graphics then
            newW = graphics:GetWidth()
            newH = graphics:GetHeight()
        end
        if ui then
            local s = ui:GetScale()
            if s > 0 then
                newW = math.floor(newW / s)
                newH = math.floor(newH / s)
            end
        end
        self.overlay:SetFixedWidth(newW)
        self.overlay:SetFixedHeight(newH)
    end)

    return self.overlay
end

--- 销毁窗口（子类可覆盖）
function BaseWindow:Dispose()
    if self.overlay then
        self.overlay:Remove()
        self.overlay = nil
    end
    DebugLogger:Info("BaseWindow", "Disposed")
end

--- 全局单例
WindowManager = UI_MANAGER.New()

return UI_MANAGER
