--- HelloGUI 示例模块
-- 提取自官方示例 02_HelloGUI，演示如何通过代码构造 UI 元素（按钮、滑动条、文本）。
--
-- @module SampleHelloGUI

local M = {}

--- 按钮默认宽度
M.BUTTON_WIDTH = 120

--- 按钮默认高度
M.BUTTON_HEIGHT = 40

--- 创建带文本的按钮
-- @param x number 横坐标
-- @param y number 纵坐标
-- @param xSize number 宽度
-- @param ySize number 高度
-- @param text string 显示文本
-- @return Button
function M.CreateButton(x, y, xSize, ySize, text)
    local font = cache:GetResource("Font", "Fonts/Anonymous Pro.ttf")
    local button = ui.root:CreateChild("Button")
    button:SetStyleAuto()
    button:SetPosition(x, y)
    button:SetSize(xSize, ySize)
    local buttonText = button:CreateChild("Text")
    buttonText:SetAlignment(HA_CENTER, VA_CENTER)
    buttonText:SetFont(font, 12)
    buttonText.text = text
    return button
end

--- 创建带文本的滑动条
-- @param x number
-- @param y number
-- @param xSize number
-- @param ySize number
-- @param text string 标签文本
-- @return Slider
function M.CreateSlider(x, y, xSize, ySize, text)
    local font = cache:GetResource("Font", "Fonts/Anonymous Pro.ttf")
    local sliderText = ui.root:CreateChild("Text")
    sliderText:SetPosition(x, y)
    sliderText:SetFont(font, 12)
    sliderText.text = text
    local slider = ui.root:CreateChild("Slider")
    slider:SetStyleAuto()
    slider:SetPosition(x, y + 20)
    slider:SetSize(xSize, ySize)
    slider.range = 1.0
    return slider
end

--- 构建 HelloGUI 场景中的 UI
function M.CreateHelloUI()
    local uiStyle = cache:GetResource("XMLFile", "UI/DefaultStyle.xml")
    ui.root.defaultStyle = uiStyle

    -- 按钮
    local names = { "Hello", "Urho3D", "Sample" }
    for i, name in ipairs(names) do
        local button = M.CreateButton((i - 1) * 140 + 20, 20, M.BUTTON_WIDTH, M.BUTTON_HEIGHT, name)
        SubscribeToEvent(button, "Released", function(eventType, eventData)
            local window = ui.root:CreateChild("Window")
            window:SetMinSize(384, 192)
            window:SetAlignment(HA_CENTER, VA_CENTER)
            window:SetPosition(0, 0)
            window:SetStyleAuto()
            local titleText = window:CreateChild("Text")
            titleText:SetAlignment(HA_CENTER, VA_CENTER)
            titleText:SetPosition(0, -40)
            titleText:SetFont(cache:GetResource("Font", "Fonts/Anonymous Pro.ttf"), 24)
            titleText.text = "Hello " .. name .. "!"
            local button1 = M.CreateButton(0, 0, M.BUTTON_WIDTH, M.BUTTON_HEIGHT, "Close")
            button1:SetAlignment(HA_CENTER, VA_CENTER)
            button1:SetPosition(0, 40)
            SubscribeToEvent(button1, "Released", function()
                window:Remove()
            end)
        end)
    end

    -- 滑动条
    local slider = M.CreateSlider(20, 100, 200, 20, "Window Opacity")
    slider.value = ui.root.opacity
    SubscribeToEvent(slider, "SliderChanged", function(eventType, eventData)
        local newOpacity = eventData["Value"]:GetFloat()
        ui.root.opacity = newOpacity
    end)

    -- 指令文本
    local instructionText = ui.root:CreateChild("Text")
    instructionText.text = "Click buttons to open windows. Drag the window title bar to move."
    instructionText:SetFont(cache:GetResource("Font", "Fonts/Anonymous Pro.ttf"), 12)
    instructionText.horizontalAlignment = HA_CENTER
    instructionText.verticalAlignment = VA_CENTER
    instructionText:SetPosition(0, ui.root.height / 4)
end

return M
