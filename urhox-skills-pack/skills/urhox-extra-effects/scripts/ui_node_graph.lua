-- UrhoX Extra Effects - UI NodeGraph 简易节点图连线

local UINodeGraph = {}
UINodeGraph.__index = UINodeGraph

--- 创建节点图容器
-- @param root UIElement
-- @return UINodeGraph
function UINodeGraph.Create(root)
    local self = setmetatable({}, UINodeGraph)
    self.root = root:CreateChild("BorderImage")
    self.root:SetSize(IntVector2(800, 600))
    self.root:SetColor(Color(0.15, 0.15, 0.15, 0.9))

    self.nodes = {}
    self.connections = {} -- { fromNode=node, toNode=node, line=UIElement }
    self.dragNode = nil
    self.dragOffset = IntVector2.ZERO

    self.root:SubscribeToEvent("DragMove", function(eventType, eventData)
        if self.dragNode then
            local cursorPos = root:GetCursor():GetPosition()
            local localPos = self.root:ScreenToElement(cursorPos)
            self.dragNode:SetPosition(localPos - self.dragOffset)
            self:UpdateConnections()
        end
    end)

    self.root:SubscribeToEvent("DragEnd", function(eventType, eventData)
        self.dragNode = nil
    end)

    return self
end

--- 添加节点
-- @param title string 节点标题
-- @param pos IntVector2 初始位置
-- @param size IntVector2 节点尺寸
-- @return UIElement 节点容器
function UINodeGraph:AddNode(title, pos, size)
    local node = self.root:CreateChild("BorderImage")
    node:SetPosition(pos)
    node:SetSize(size)
    node:SetColor(Color(0.3, 0.3, 0.4, 1.0))

    local header = node:CreateChild("BorderImage")
    header:SetSize(IntVector2(size.x, 24))
    header:SetColor(Color(0.4, 0.5, 0.6, 1.0))

    local htext = header:CreateChild("Text")
    htext:SetAlignment(HA_CENTER, VA_CENTER)
    htext:SetFont("Fonts/Anonymous Pro.ttf", 10)
    htext:SetText(title)

    -- 拖拽头部移动节点
    header:SubscribeToEvent("DragBegin", function(eventType, eventData)
        local cursorPos = self.root:GetCursor():GetPosition()
        local nodePos = node:GetScreenPosition()
        self.dragNode = node
        self.dragOffset = cursorPos - nodePos
    end)

    local nodeData = { element = node, inputs = {}, outputs = {} }
    table.insert(self.nodes, nodeData)
    return nodeData
end

--- 在节点上添加输入/输出端口
-- @param nodeData table AddNode 返回值
-- @param isInput boolean
-- @param label string
-- @param yOffset number
function UINodeGraph:AddPort(nodeData, isInput, label, yOffset)
    local port = nodeData.element:CreateChild("BorderImage")
    local size = nodeData.element:GetSize()
    local px = isInput and 4 or (size.x - 14)
    port:SetPosition(IntVector2(px, 30 + yOffset))
    port:SetSize(IntVector2(10, 10))
    port:SetColor(isInput and Color(0.2, 0.8, 0.2) or Color(0.8, 0.8, 0.2))

    local text = nodeData.element:CreateChild("Text")
    text:SetPosition(IntVector2(isInput and 18 or (px - 60), 28 + yOffset))
    text:SetFont("Fonts/Anonymous Pro.ttf", 9)
    text:SetText(label)

    local t = { element = port, label = label }
    if isInput then
        table.insert(nodeData.inputs, t)
    else
        table.insert(nodeData.outputs, t)
    end
    return t
end

--- 连接两个端口
-- @param outPort table 输出端口
-- @param inPort table 输入端口
function UINodeGraph:ConnectPorts(outPort, inPort)
    local line = self.root:CreateChild("BorderImage")
    line:SetSize(IntVector2(2, 2))
    line:SetColor(Color(0.9, 0.9, 0.9))
    table.insert(self.connections, {
        fromPort = outPort,
        toPort = inPort,
        line = line
    })
    self:UpdateConnections()
end

--- 更新所有连线的位置和旋转
function UINodeGraph:UpdateConnections()
    for _, conn in ipairs(self.connections) do
        local p1 = conn.fromPort.element:GetScreenPosition() + IntVector2(5, 5)
        local p2 = conn.toPort.element:GetScreenPosition() + IntVector2(5, 5)
        local lp1 = self.root:ScreenToElement(p1)
        local lp2 = self.root:ScreenToElement(p2)
        local dx = lp2.x - lp1.x
        local dy = lp2.y - lp1.y
        local len = math.sqrt(dx * dx + dy * dy)
        if len > 0.01 then
            conn.line:SetPosition(lp1)
            conn.line:SetSize(IntVector2(len, 2))
            local rot = math.atan2(dy, dx) * 180.0 / 3.14159265
            conn.line:SetRotation(rot)
        end
    end
end

return UINodeGraph
