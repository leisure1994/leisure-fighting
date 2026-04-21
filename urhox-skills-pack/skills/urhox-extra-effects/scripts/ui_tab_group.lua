-- UrhoX Extra Effects - UI TabGroup 标签页组件

local UITabGroup = {}
UITabGroup.__index = UITabGroup

--- 创建标签页组
-- @param root UIElement 根元素
-- @return UITabGroup
function UITabGroup.Create(root)
    local self = setmetatable({}, UITabGroup)
    self.root = root:CreateChild("BorderImage")
    self.root:SetPosition(IntVector2(450, 120))
    self.root:SetSize(IntVector2(300, 180))
    self.root:SetColor(Color(0, 0, 0, 0))

    self.tabs = {}
    self.activeIndex = 1
    self.onSelected = nil -- function(index)

    return self
end

--- 添加标签页
-- @param label string 标签文本
-- @param tabSize IntVector2 标签头尺寸
-- @param bodySize IntVector2 内容区尺寸
function UITabGroup:AddTab(label, tabSize, bodySize)
    local index = #self.tabs + 1
    local x = 10 + (index - 1) * (tabSize.x + 5)
    local y = 10

    local header = self.root:CreateChild("Button")
    header:SetPosition(IntVector2(x, y))
    header:SetSize(tabSize)
    header:SetColor(Color(0.3, 0.7, 0.3))

    local htext = header:CreateChild("Text")
    htext:SetAlignment(HA_CENTER, VA_CENTER)
    htext:SetFont("Fonts/Anonymous Pro.ttf", 10)
    htext:SetText(label)
    htext:SetColor(Color(0.9, 0.9, 0.0))

    local body = self.root:CreateChild("BorderImage")
    body:SetPosition(IntVector2(10, y + tabSize.y + 2))
    body:SetSize(bodySize)
    body:SetColor(Color(0.3, 0.7, 0.3))
    body:SetVisible(index == 1)

    local tab = { header = header, body = body, index = index, label = label }
    table.insert(self.tabs, tab)

    header:SubscribeToEvent("Released", function(eventType, eventData)
        self:SetActive(index)
    end)

    return body -- 返回内容区供外部继续添加子元素
end

--- 切换活动标签
-- @param index number
function UITabGroup:SetActive(index)
    for i, t in ipairs(self.tabs) do
        t.body:SetVisible(i == index)
        t.header:SetColor(i == index and Color(0.5, 0.9, 0.5) or Color(0.3, 0.7, 0.3))
    end
    self.activeIndex = index
    if self.onSelected then
        self.onSelected(index)
    end
end

return UITabGroup
