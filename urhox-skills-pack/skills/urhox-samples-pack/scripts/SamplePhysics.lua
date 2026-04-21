-- SamplePhysics.lua
-- 3D 物理世界、刚体创建、碰撞形状生成，以及场景存取
-- 对应原版示例：11_Physics、12_PhysicsStressTest、13_Ragdolls

local Utils = require("SampleUtils")
local M = {}

--- 初始化 PhysicsWorld 和 DebugRenderer（调用一次）
-- @param scene Scene 场景实例
function M.InitPhysicsWorld(scene)
    scene:CreateComponent("Octree")
    scene:CreateComponent("PhysicsWorld")
    scene:CreateComponent("DebugRenderer")
end

--- 创建静态地面（带 RigidBody + CollisionShape）
-- @param scene Scene 场景实例
-- @param size Vector3 地面尺寸
-- @param y number 地面 Y 坐标
-- @return Node 地面节点
function M.CreatePhysicsFloor(scene, size, y)
    local node = scene:CreateChild("Floor")
    node.position = Vector3(0.0, (y or 0.0) - 0.5, 0.0)
    node:SetScale(size or Vector3(1000.0, 1.0, 1000.0))

    local sm = node:CreateComponent("StaticModel")
    sm.model = cache:GetResource("Model", "Models/Box.mdl")
    sm.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    local body = node:CreateComponent("RigidBody")
    local shape = node:CreateComponent("CollisionShape")
    shape:SetBox(Vector3.ONE)
    return node
end

--- 创建一个动态的物理箱子
-- @param scene Scene 场景实例
-- @param pos Vector3 位置
-- @param scale Vector3 缩放
-- @param mass number 质量
-- @param materialPath string 材质路径
-- @return Node 箱子节点
function M.CreatePhysicsBox(scene, pos, scale, mass, materialPath)
    local node = scene:CreateChild("PhysicsBox")
    node.position = pos or Vector3.ZERO
    if scale then node:SetScale(scale) end

    local sm = node:CreateComponent("StaticModel")
    sm.model = cache:GetResource("Model", "Models/Box.mdl")
    sm.material = cache:GetResource("Material", materialPath or "Materials/StoneEnvMapSmall.xml")
    sm.castShadows = true

    local body = node:CreateComponent("RigidBody")
    body.mass = mass or 1.0
    body.friction = 0.75

    local shape = node:CreateComponent("CollisionShape")
    shape:SetBox(Vector3.ONE)
    return node
end

--- 批量生成金字塔物理箱子（12_PhysicsStressTest 核心玩法）
-- @param scene Scene 场景实例
-- @param height number 金字塔高度（默认 8）
function M.SpawnPyramidBoxes(scene, height)
    local h = height or 8
    for y = 0, h - 1 do
        for x = -y, y do
            local pos = Vector3(x, -y + h, 0.0)
            M.CreatePhysicsBox(scene, pos, nil, 1.0, "Materials/StoneEnvMapSmall.xml")
        end
    end
end

--- 从摄像机位置"发射"一个物理箱子（左键射击玩具）
-- @param scene Scene 场景实例
-- @param camNode Node 摄像机节点
-- @param velocity number 初始速度
function M.ShootPhysicsBox(scene, camNode, velocity)
    local node = scene:CreateChild("SmallBox")
    node.position = camNode.position
    node.rotation = camNode.rotation
    node:SetScale(0.25)

    local sm = node:CreateComponent("StaticModel")
    sm.model = cache:GetResource("Model", "Models/Box.mdl")
    sm.material = cache:GetResource("Material", "Materials/StoneEnvMapSmall.xml")
    sm.castShadows = true

    local body = node:CreateComponent("RigidBody")
    body.mass = 0.25
    body.friction = 0.75

    local shape = node:CreateComponent("CollisionShape")
    shape:SetBox(Vector3.ONE)

    local OBJECT_VELOCITY = velocity or 10.0
    body.linearVelocity = camNode.rotation * Vector3(0.0, 0.25, 1.0) * OBJECT_VELOCITY
end

--- 创建天空盒（11_Physics 中的天空盒）
-- @param scene Scene 场景实例
function M.CreateSkybox(scene)
    local skyNode = scene:CreateChild("Sky")
    skyNode:SetScale(500.0)
    local skybox = skyNode:CreateComponent("Skybox")
    skybox.model = cache:GetResource("Model", "Models/Box.mdl")
    skybox.material = cache:GetResource("Material", "Materials/Skybox.xml")
    return skyNode
end

--- 保存场景到 XML 文件
-- @param scene Scene 场景实例
-- @param filePath string 相对路径（基于程序目录）
function M.SaveScene(scene, filePath)
    local saveFile = File(fileSystem.programDir .. filePath, FILE_WRITE)
    scene:SaveXML(saveFile)
end

--- 从 XML 文件加载场景
-- @param scene Scene 场景实例
-- @param filePath string 相对路径
function M.LoadScene(scene, filePath)
    local loadFile = File(fileSystem.programDir .. filePath, FILE_READ)
    scene:LoadXML(loadFile)
end

--- 切换物理调试几何体绘制
-- @param scene Scene 场景实例
-- @param enabled boolean 是否启用
function M.DrawPhysicsDebug(scene, enabled)
    if enabled then
        local pw = scene:GetComponent("PhysicsWorld")
        if pw then pw:DrawDebugGeometry(true) end
    end
end

--- 创建布娃娃（Ragdoll）系统
-- 需要在模型节点上挂载多个 RigidBody + CollisionShape，并设置约束。
-- 这里提供一键为 Jack 模型创建完整布娃娃的函数。
-- @param jackNode Node 拥有 AnimatedModel 的 Jack 节点
function M.CreateRagdoll(jackNode)
    local bodyParts = {
        { name = "Bip01_Pelvis",     type = "Box",    size = Vector3(0.3, 0.15, 0.2),   mass = 2.0,    pos = Vector3(0, 0, 0),      rot = Quaternion.IDENTITY },
        { name = "Bip01_Spine1",     type = "Box",    size = Vector3(0.35, 0.2, 0.25),  mass = 2.0,    pos = Vector3(0, 0.15, 0),   rot = Quaternion.IDENTITY },
        { name = "Bip01_L_UpperArm", type = "Box",    size = Vector3(0.12, 0.35, 0.12), mass = 1.0,    pos = Vector3(-0.35, 0.0, 0), rot = Quaternion(0, 0, -90) },
        { name = "Bip01_R_UpperArm", type = "Box",    size = Vector3(0.12, 0.35, 0.12), mass = 1.0,    pos = Vector3(0.35, 0.0, 0),  rot = Quaternion(0, 0, 90) },
        { name = "Bip01_L_ForeArm",  type = "Box",    size = Vector3(0.1, 0.3, 0.1),    mass = 1.0,    pos = Vector3(-0.35, -0.35, 0), rot = Quaternion(0, 0, -90) },
        { name = "Bip01_R_ForeArm",  type = "Box",    size = Vector3(0.1, 0.3, 0.1),    mass = 1.0,    pos = Vector3(0.35, -0.35, 0),  rot = Quaternion(0, 0, 90) },
        { name = "Bip01_L_Thigh",    type = "Box",    size = Vector3(0.15, 0.45, 0.15), mass = 1.5,    pos = Vector3(-0.1, -0.25, 0), rot = Quaternion(0, 0, -90) },
        { name = "Bip01_R_Thigh",    type = "Box",    size = Vector3(0.15, 0.45, 0.15), mass = 1.5,    pos = Vector3(0.1, -0.25, 0),  rot = Quaternion(0, 0, 90) },
        { name = "Bip01_L_Calf",     type = "Box",    size = Vector3(0.12, 0.4, 0.12),  mass = 1.5,    pos = Vector3(-0.1, -0.7, 0),  rot = Quaternion(0, 0, -90) },
        { name = "Bip01_R_Calf",     type = "Box",    size = Vector3(0.12, 0.4, 0.12),  mass = 1.5,    pos = Vector3(0.1, -0.7, 0),   rot = Quaternion(0, 0, 90) },
        { name = "Bip01_Head",       type = "Sphere", size = Vector3(0.15, 0.15, 0.15), mass = 1.0,    pos = Vector3(0, 0.35, 0),     rot = Quaternion.IDENTITY },
    }

    for _, part in ipairs(bodyParts) do
        local boneNode = jackNode:GetChild(part.name, true)
        if boneNode ~= nil then
            local shapeNode = boneNode:CreateChild(part.name .. "_Shape")
            shapeNode.position = part.pos
            shapeNode.rotation = part.rot

            local body = shapeNode:CreateComponent("RigidBody")
            body.mass = part.mass
            body.linearDamping = 0.5
            body.angularDamping = 0.5
            body.friction = 0.5

            local shape = shapeNode:CreateComponent("CollisionShape")
            if part.type == "Box" then
                shape:SetBox(part.size)
            else
                shape:SetSphere(part.size.x)
            end
        end
    end
end

return M
