-- UrhoX Extra Effects - UI DrawTool 画板工具

local UIDrawTool = {}
UIDrawTool.__index = UIDrawTool

--- 创建画板
-- @param root UIElement
-- @param cache ResourceCache
-- @param size IntVector2 画板尺寸
-- @return UIDrawTool
function UIDrawTool.Create(root, cache, size)
    local self = setmetatable({}, UIDrawTool)
    self.container = root:CreateChild("BorderImage")
    self.container:SetSize(size)
    self.container:SetColor(Color(0.2, 0.2, 0.2))

    self.title = self.container:CreateChild("Text")
    self.title:SetPosition(IntVector2(5, 5))
    self.title:SetFont("Fonts/Anonymous Pro.ttf", 10)
    self.title:SetText("Draw Tool (drag to draw)")

    -- 使用 Sprite 作为画布
    self.canvas = self.container:CreateChild("Sprite")
    self.canvas:SetPosition(IntVector2(0, 20))
    self.canvas:SetSize(IntVector2(size.x, size.y - 20))

    -- 创建空白纹理作为画板
    self.image = Image:new()
    self.image:SetSize(size.x, size.y - 20, 4)
    self.image:Clear(Color(0.2, 0.2, 0.2, 1.0))

    self.texture = Texture2D:new()
    self.texture:SetSize(size.x, size.y - 20, Graphics:GetRGBAFormat())
    self.texture:SetData(self.image)
    self.canvas:SetTexture(self.texture)

    self.drawing = false
    self.brushColor = Color(0.8, 0.95, 0.2, 1.0)
    self.brushSize = 2
    self.lastPos = nil

    self.container:SubscribeToEvent("DragMove", function(eventType, eventData)
        local pos = eventData["X"]:GetInt(), eventData["Y"]:GetInt()
        -- 转换为画布本地坐标
        local dx = eventData["Deltas"]:GetIntVector2().x
        local dy = eventData["Deltas"]:GetIntVector2().y
        self:OnDrag(dx, dy)
    end)

    return self
end

--- 设置画板屏幕位置
-- @param pos IntVector2
function UIDrawTool:SetPosition(pos)
    self.container:SetPosition(pos)
end

--- 设置画笔颜色
-- @param color Color
function UIDrawTool:SetBrushColor(color)
    self.brushColor = color
end

--- 设置画笔粗细
-- @param size number
function UIDrawTool:SetBrushSize(size)
    self.brushSize = size
end

--- 处理拖拽绘制
-- @param dx number
-- @param dy number
function UIDrawTool:OnDrag(dx, dy)
    local ui = self.container:GetRoot()
    local cursor = ui:GetCursor()
    if not cursor then
        return
    end
    local pos = cursor:GetPosition()
    local localPos = self.canvas:ScreenToElement(pos)
    local x = localPos.x
    local y = localPos.y

    local w = self.canvas:GetWidth()
    local h = self.canvas:GetHeight()
    if x < 0 or y < 0 or x >= w or y >= h then
        return
    end

    self:DrawPoint(x, y)
    if self.lastPos then
        self:DrawLine(self.lastPos.x, self.lastPos.y, x, y)
    end
    self.lastPos = { x = x, y = y }

    self.texture:SetData(self.image)
end

function UIDrawTool:DrawPoint(cx, cy)
    local half = math.floor(self.brushSize / 2)
    for ox = -half, half do
        for oy = -half, half do
            local px = cx + ox
            local py = cy + oy
            if px >= 0 and py >= 0 and px < self.canvas:GetWidth() and py < self.canvas:GetHeight() then
                self.image:SetPixel(px, py, self.brushColor)
            end
        end
    end
end

function UIDrawTool:DrawLine(x0, y0, x1, y1)
    local dx = math.abs(x1 - x0)
    local dy = math.abs(y1 - y0)
    local sx = x0 < x1 and 1 or -1
    local sy = y0 < y1 and 1 or -1
    local err = dx - dy

    while true do
        self:DrawPoint(x0, y0)
        if x0 == x1 and y0 == y1 then
            break
        end
        local e2 = 2 * err
        if e2 > -dy then
            err = err - dy
            x0 = x0 + sx
        end
        if e2 < dx then
            err = err + dx
            y0 = y0 + sy
        end
    end
end

--- 清空画板
function UIDrawTool:Clear()
    self.image:Clear(Color(0.2, 0.2, 0.2, 1.0))
    self.texture:SetData(self.image)
end

return UIDrawTool
