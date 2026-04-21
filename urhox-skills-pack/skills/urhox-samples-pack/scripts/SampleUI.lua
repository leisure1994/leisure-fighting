-- SampleUI.lua
-- UI 窗口、按钮、滚动条、拖拽、事件订阅
-- 对应原版示例：02_HelloGUI、37_UIDrag、38_SceneAndUILoad

local Utils = require("SampleUtils")
local M = {}

--- 创建标准的带标题栏的 Window
-- @param title string 窗口标题
-- @param width number 最小宽度
-- @return Window 窗口对象
function M.CreateWindow(title, width)
    Utils.LoadDefaultUIStyle()
    local window = Window()
    ui.root:AddChild(window)
    window.minWidth = width or 384
    window:SetLayout(LM_VERTICAL, 6, IntRect(6, 6, 6, 6))
    window:SetAlignment(HA_CENTER, VA_CENTER)
    window.name = "Window"

    local titleBar = UIElement()
    titleBar:SetMinSize(0, 24)
    titleBar.verticalAlignment = VA_TOP
    titleBar.layoutMode = LM_HORIZONTAL

    local windowTitle = Text()
    windowTitle.name = "WindowTitle"
    windowTitle.text = title or "Hello GUI!"

    local closeButton = Button()
    closeButton.name = "CloseButton"

    titleBar:AddChild(windowTitle)
    titleBar:AddChild(closeButton)
    window:AddChild(titleBar)

    window:SetStyleAuto()
    windowTitle:SetStyleAuto()
    closeButton.style = "CloseButton"

    return window, closeButton
end

--- 在指定父元素下创建 CheckBox + Button + LineEdit 的示例组合
-- @param parent UIElement 父元素
function M.CreateBasicControls(parent)
    local checkBox = CheckBox()
    checkBox.name = "CheckBox"

    local button = Button()
    button.name = "Button"
    button.minHeight = 24

    local lineEdit = LineEdit()
    lineEdit.name = "LineEdit"
    lineEdit.minHeight = 24

    parent:AddChild(checkBox)
    parent:AddChild(button)
    parent:AddChild(lineEdit)

    checkBox:SetStyleAuto()
    button:SetStyleAuto()
    lineEdit:SetStyleAuto()
end

--- 创建一个可拖拽的带 Tooltip 的图片按钮
-- @param texturePath string 纹理路径
-- @param size IntVector2 尺寸
-- @param pos IntVector2 位置
-- @param tooltipText string Tooltip 内容
-- @return Button 按钮对象
function M.CreateDraggableImage(texturePath, size, pos, tooltipText)
    Utils.LoadDefaultUIStyle()
    local btn = ui.root:CreateChild("Button", "Fish")
    btn.texture = cache:GetResource("Texture2D", texturePath)
    btn.blendMode = BLEND_ADD
    btn:SetSize(size.x, size.y)
    btn:SetPosition(pos.x, pos.y)

    local tt = btn:CreateChild("ToolTip")
    tt.position = IntVector2(btn.width + 5, btn.width / 2)
    local holder = tt:CreateChild("BorderImage")
    holder:SetStyle("ToolTipBorderImage")
    local ttt = holder:CreateChild("Text")
    ttt:SetStyle("ToolTipText")
    ttt.text = tooltipText or "Drag me!"

    return btn
end

--- 绑定标准的拖拽事件处理器
-- @param element UIElement 可拖拽元素
-- @param onDragBegin function(eventType, eventData) 拖拽开始回调
-- @param onDragMove function(eventType, eventData) 拖拽中回调
-- @param onDragEnd function(eventType, eventData) 拖拽结束回调
function M.BindDragEvents(element, onDragBegin, onDragMove, onDragEnd)
    if onDragBegin then SubscribeToEvent(element, "DragBegin", onDragBegin) end
    if onDragMove then SubscribeToEvent(element, "DragMove", onDragMove) end
    if onDragEnd then SubscribeToEvent(element, "DragEnd", onDragEnd) end
end

--- 创建音量滑动条（带标签）
-- @param parent UIElement 父元素
-- @param label string 标签文字
-- @param y number Y 坐标
-- @param initialValue number 初始值 0-1
-- @return Slider 滑动条对象
function M.CreateVolumeSlider(parent, label, y, initialValue)
    return Utils.CreateSlider(parent, label, y, 200)
end

--- 创建一排按钮（聊天界面风格）
-- @param names table 按钮名称数组
-- @param widths table 宽度数组
-- @return UIElement 按钮容器
function M.CreateButtonRow(names, widths)
    local container = ui.root:CreateChild("UIElement")
    container:SetFixedSize(graphics.width, 20)
    container:SetPosition(0, graphics.height - 20)
    container.layoutMode = LM_HORIZONTAL

    for i, name in ipairs(names) do
        Utils.CreateButton(container, name, widths and widths[i] or 80, 20)
    end
    return container
end

--- 切换指定 Tag 的 UI 元素可见性
-- @param tag string Tag 名称
function M.ToggleElementsByTag(tag)
    local elements = ui.root:GetChildrenWithTag(tag)
    for i = 0, elements:Size() - 1 do
        local e = elements[i]
        e.visible = not e.visible
    end
end

--- 创建光标（30_UIDrag 风格）
-- @return Cursor 光标对象
function M.CreateCursor()
    Utils.LoadDefaultUIStyle()
    local cursor = Cursor()
    cursor:SetStyleAuto()
    ui.cursor = cursor
    cursor:SetPosition(graphics.width / 2, graphics.height / 2)
    return cursor
end

return M
