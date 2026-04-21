-- UrhoX Extra Effects - UI RadialGroup 径向按钮组

local UIRadialGroup = {}
UIRadialGroup.__index = UIRadialGroup

--- 创建径向按钮组
-- @param root UIElement 根元素
-- @param cache ResourceCache
-- @return UIRadialGroup
function UIRadialGroup.Create(root, cache)
    local self = setmetatable({}, UIRadialGroup)
    self.root = root:CreateChild("BorderImage")
    self.root:SetPosition(IntVector2(20, 120))
    self.root:SetSize(IntVector2(300, 100))
    self.root:SetColor(Color(1.0, 0.66, 0.0))

    local title = self.root:CreateChild("Text")
    title:SetFont(cache:GetResource("Font", "Fonts/Anonymous Pro.ttf"), 12)
    title:SetText("Radial Group")
    title:SetColor(Color(0.0, 0.4, 0.7))
    title:SetPosition(IntVector2(5, 5))
    self.titleText = title

    self.buttons = {}
    self.selectedIndex = -1
    self.onToggled = nil -- function(index, selected)

    return self
end

--- 添加径向按钮
-- @param label string 按钮文本
function UIRadialGroup:AddButton(label)
    local index = #self.buttons + 1
    local y = 25 + (index - 1) * 20

    local check = self.root:CreateChild("CheckBox")
    check:SetPosition(IntVector2(10, y))
    check:SetSize(IntVector2(16, 16))
    check:SetColor(Color(0.0, 0.8, 0.8))

    local text = self.root:CreateChild("Text")
    text:SetPosition(IntVector2(30, y))
    text:SetFont(self.titleText:GetFont(), 10)
    text:SetText(label)
    text:SetColor(Color(0.0, 0.4, 0.7))

    local btn = { checkbox = check, text = text, index = index }
    table.insert(self.buttons, btn)

    check:SubscribeToEvent("Toggled", function(eventType, eventData)
        local checked = eventData["Checked"]:GetBool()
        if checked then
            self.selectedIndex = index
            -- 取消其他选中
            for _, b in ipairs(self.buttons) do
                if b.index ~= index then
                    b.checkbox:SetChecked(false)
                end
            end
        elseif self.selectedIndex == index then
            self.selectedIndex = -1
        end
        if self.onToggled then
            self.onToggled(index, checked)
        end
    end)
end

--- 设置选中项
-- @param index number
function UIRadialGroup:SetSelected(index)
    for i, b in ipairs(self.buttons) do
        b.checkbox:SetChecked(i == index)
    end
    self.selectedIndex = index
end

return UIRadialGroup
