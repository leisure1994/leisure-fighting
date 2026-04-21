-- SamplePhysics2D.lua
-- 2D 物理世界、刚体、碰撞形状创建
-- 对应原版示例：27_Physics2D、32_Urho2DConstraints

local Utils = require("SampleUtils")
local M = {}

--- 初始化 2D 物理世界
-- @param scene Scene 场景实例
function M.InitPhysicsWorld2D(scene)
    scene:CreateComponent("Octree")
    scene:CreateComponent("DebugRenderer")
    scene:CreateComponent("PhysicsWorld2D")
end

--- 创建 2D 正交摄像机（与 Sample2D 一致）
-- @param scene Scene 场景实例
-- @return Node 摄像机节点
function M.CreateCamera2D(scene)
    local camNode = scene:CreateChild("Camera")
    camNode.position = Vector3(0.0, 0.0, -10.0)
    local camera = camNode:CreateComponent("Camera")
    camera.orthographic = true
    camera.orthoSize = graphics.height * PIXEL_SIZE
    camera.zoom = 1.2 * math.min(graphics.width / 1280.0, graphics.height / 800.0)
    return camNode
end

--- 创建静态地面（2D）
-- @param scene Scene 场景实例
-- @param width number 地面宽度
-- @param y number 地面 Y 坐标
-- @param spritePath string 可选精灵路径
-- @return Node 地面节点
function M.CreateGround2D(scene, width, y, spritePath)
    local node = scene:CreateChild("Ground")
    node.position = Vector3(0.0, y or -3.0, 0.0)
    node:SetScale(width or 200.0, 1.0, 0.0)

    local body = node:CreateComponent("RigidBody2D")
    if spritePath then
        local sprite = cache:GetResource("Sprite2D", spritePath)
        local ss = node:CreateComponent("StaticSprite2D")
        ss.sprite = sprite
    end

    local shape = node:CreateComponent("CollisionBox2D")
    shape.size = Vector2(0.32, 0.32)
    shape.friction = 0.5
    return node
end

--- 创建动态物理箱子（2D）
-- @param scene Scene 场景实例
-- @param pos Vector3 位置
-- @param spritePath string 精灵路径
-- @param boxSize Vector2 碰撞盒尺寸
-- @return Node 箱子节点
function M.CreatePhysicsBox2D(scene, pos, spritePath, boxSize)
    local node = scene:CreateChild("RigidBody2D")
    node.position = pos or Vector3.ZERO
    local body = node:CreateComponent("RigidBody2D")
    body.bodyType = BT_DYNAMIC

    local sprite = cache:GetResource("Sprite2D", spritePath or "Urho2D/Box.png")
    local ss = node:CreateComponent("StaticSprite2D")
    ss.sprite = sprite

    local shape = node:CreateComponent("CollisionBox2D")
    shape.size = boxSize or Vector2(0.32, 0.32)
    shape.density = 1.0
    shape.friction = 0.5
    shape.restitution = 0.1
    return node
end

--- 创建动态物理球（2D）
-- @param scene Scene 场景实例
-- @param pos Vector3 位置
-- @param spritePath string 精灵路径
-- @param radius number 碰撞圆半径
-- @return Node 球节点
function M.CreatePhysicsBall2D(scene, pos, spritePath, radius)
    local node = scene:CreateChild("RigidBody2D")
    node.position = pos or Vector3.ZERO
    local body = node:CreateComponent("RigidBody2D")
    body.bodyType = BT_DYNAMIC

    local sprite = cache:GetResource("Sprite2D", spritePath or "Urho2D/Ball.png")
    local ss = node:CreateComponent("StaticSprite2D")
    ss.sprite = sprite

    local shape = node:CreateComponent("CollisionCircle2D")
    shape.radius = radius or 0.16
    shape.density = 1.0
    shape.friction = 0.5
    shape.restitution = 0.1
    return node
end

--- 批量生成下落的 2D 物理对象（箱子和球交替）
-- @param scene Scene 场景实例
-- @param count number 数量（默认 100）
function M.SpawnFallingObjects2D(scene, count)
    local c = count or 100
    for i = 1, c do
        local x = math.random() * 0.2 - 0.1
        local y = 5.0 + i * 0.4
        local pos = Vector3(x, y, 0.0)
        if i % 2 == 0 then
            M.CreatePhysicsBox2D(scene, pos, "Urho2D/Box.png", Vector2(0.32, 0.32))
        else
            M.CreatePhysicsBall2D(scene, pos, "Urho2D/Ball.png", 0.16)
        end
    end
end

--- 绘制 2D 物理调试几何体
-- @param scene Scene 场景实例
function M.DrawPhysics2DDebug(scene)
    local pw = scene:GetComponent("PhysicsWorld2D")
    if pw then pw:DrawDebugGeometry() end
end

return M
