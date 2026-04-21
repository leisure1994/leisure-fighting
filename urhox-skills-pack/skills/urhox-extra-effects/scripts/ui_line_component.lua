-- UrhoX Extra Effects - UI LineComponent 2D 线条绘制

local UILineComponent = {}
UILineComponent.__index = UILineComponent

--- 创建 2D 折线（使用多个旋转的 BorderImage 模拟）
-- @param root UIElement
-- @return UILineComponent
function UILineComponent.Create(root)
    local self = setmetatable({}, UILineComponent)
    self.root = root
    self.segments = {}
    return self
end

--- 绘制直线
-- @param points table IntVector2 数组（至少两个点）
-- @param color Color
-- @param thickness number 线宽
function UILineComponent:DrawPolyline(points, color, thickness)
    self:Clear()
    if #points < 2 then
        return
    end
    thickness = thickness or 2.0

    for i = 1, #points - 1 do
        local p1 = points[i]
        local p2 = points[i + 1]
        local dx = p2.x - p1.x
        local dy = p2.y - p1.y
        local len = math.sqrt(dx * dx + dy * dy)
        if len > 0.001 then
            local seg = self.root:CreateChild("BorderImage")
            seg:SetPosition(IntVector2(p1.x, p1.y + thickness * 0.5))
            seg:SetSize(IntVector2(len, thickness))
            seg:SetColor(color)
            -- 旋转对齐
            local angle = math.atan2(dy, dx) * 180.0 / 3.14159265
            seg:SetRotation(angle)
            table.insert(self.segments, seg)
        end
    end
end

--- 绘制二次贝塞尔曲线
-- @param p0 IntVector2
-- @param p1 IntVector2 控制点
-- @param p2 IntVector2
-- @param color Color
-- @param thickness number
-- @param segments number 分段数
function UILineComponent:DrawBezier(p0, p1, p2, color, thickness, segments)
    self:Clear()
    segments = segments or 20
    local pts = {}
    for i = 0, segments do
        local t = i / segments
        local u = 1.0 - t
        local x = u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x
        local y = u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
        table.insert(pts, IntVector2(math.floor(x + 0.5), math.floor(y + 0.5)))
    end
    self:DrawPolyline(pts, color, thickness)
end

--- 清除所有线段
function UILineComponent:Clear()
    for _, seg in ipairs(self.segments) do
        seg:Remove()
    end
    self.segments = {}
end

return UILineComponent
