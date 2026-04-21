--- Ragdolls 布娃娃示例模块
-- 提取自官方示例 13_Ragdolls，演示物理碰撞检测、刚体触发器以及布娃娃骨骼系统的程序化生成。
--
-- @module SampleRagdolls

local M = {}

--- 构建 Ragdolls 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateRagdollsScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")
    scene:CreateComponent("PhysicsWorld")
    scene:CreateComponent("DebugRenderer")

    -- Zone
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = Color(0.15, 0.15, 0.15)
    zone.fogColor = Color(0.5, 0.5, 0.7)
    zone.fogStart = 100.0
    zone.fogEnd = 300.0

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true
    light.shadowBias = BiasParameters(0.00025, 0.5)
    light.shadowCascade = CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8)

    -- 地面物理
    local floorNode = scene:CreateChild("Floor")
    floorNode.position = Vector3(0.0, -0.5, 0.0)
    floorNode.scale = Vector3(500.0, 1.0, 500.0)
    local floorObj = floorNode:CreateComponent("StaticModel")
    floorObj.model = cache:GetResource("Model", "Models/Box.mdl")
    floorObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")
    local floorBody = floorNode:CreateComponent("RigidBody")
    floorBody.rollingFriction = 0.15
    local floorShape = floorNode:CreateComponent("CollisionShape")
    floorShape:SetBox(Vector3(1, 1, 1))

    -- Jack 模型（带触发器）
    local jackModel = cache:GetResource("Model", "Models/Jack.mdl")
    local jackMat = cache:GetResource("Material", "Materials/Jack.xml")
    if jackModel ~= nil and jackMat ~= nil then
        for z = -1, 1 do
            for x = -4, 4 do
                local modelNode = scene:CreateChild("Jack")
                modelNode.position = Vector3(x * 5.0, 0.0, z * 5.0)
                modelNode.rotation = Quaternion(0.0, 180.0, 0.0)
                local modelObj = modelNode:CreateComponent("AnimatedModel")
                modelObj.model = jackModel
                modelObj.material = jackMat
                modelObj.castShadows = true
                modelObj.updateInvisible = true

                local body = modelNode:CreateComponent("RigidBody")
                body.trigger = true
                local shape = modelNode:CreateComponent("CollisionShape")
                shape:SetCapsule(0.7, 2.0, Vector3(0.0, 1.0, 0.0))
            end
        end
    end

    if createCamera then
        local camNode = Node()
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 5.0, -20.0)
        return camNode
    end
    return nil
end

--- 发射一个物理球体
-- @param scene Scene
-- @param spawnPos Vector3
-- @param direction Vector3
function M.SpawnObject(scene, spawnPos, direction)
    local boxNode = scene:CreateChild("Sphere")
    boxNode.position = spawnPos
    boxNode.rotation = Quaternion(direction:Normalized(), Vector3(0, 0, 1))
    boxNode:SetScale(0.25)
    local boxObj = boxNode:CreateComponent("StaticModel")
    boxObj.model = cache:GetResource("Model", "Models/Sphere.mdl")
    boxObj.material = cache:GetResource("Material", "Materials/StoneSmall.xml")
    boxObj.castShadows = true

    local body = boxNode:CreateComponent("RigidBody")
    body.mass = 1.0
    body.rollingFriction = 0.15
    local shape = boxNode:CreateComponent("CollisionShape")
    shape:SetSphere(1.0)

    local OBJECT_VELOCITY = 10.0
    body.linearVelocity = direction:Normalized() * OBJECT_VELOCITY + Vector3(0.0, 2.5, 0.0)
end

--- 为指定 Jack 节点创建布娃娃
-- @param node Node 受击的 Jack 节点
function M.CreateRagdoll(node)
    if node == nil then return end
    node:RemoveComponent("RigidBody")
    node:RemoveComponent("CollisionShape")

    local bones = {
        {"Bip01_Pelvis", SHAPE_BOX, Vector3(0.3, 0.2, 0.25), Vector3(0, 0, 0), Quaternion()},
        {"Bip01_Spine1", SHAPE_BOX, Vector3(0.35, 0.2, 0.3), Vector3(0.15, 0, 0), Quaternion()},
        {"Bip01_L_Thigh", SHAPE_CAPSULE, Vector3(0.175, 0.45, 0.175), Vector3(0.25, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_R_Thigh", SHAPE_CAPSULE, Vector3(0.175, 0.45, 0.175), Vector3(0.25, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_L_Calf", SHAPE_CAPSULE, Vector3(0.15, 0.55, 0.15), Vector3(0.25, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_R_Calf", SHAPE_CAPSULE, Vector3(0.15, 0.55, 0.15), Vector3(0.25, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_Head", SHAPE_BOX, Vector3(0.2, 0.2, 0.2), Vector3(0.1, 0, 0), Quaternion()},
        {"Bip01_L_UpperArm", SHAPE_CAPSULE, Vector3(0.15, 0.35, 0.15), Vector3(0.1, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_R_UpperArm", SHAPE_CAPSULE, Vector3(0.15, 0.35, 0.15), Vector3(0.1, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_L_Forearm", SHAPE_CAPSULE, Vector3(0.125, 0.4, 0.125), Vector3(0.2, 0, 0), Quaternion(0, 0, 90)},
        {"Bip01_R_Forearm", SHAPE_CAPSULE, Vector3(0.125, 0.4, 0.125), Vector3(0.2, 0, 0), Quaternion(0, 0, 90)},
    }

    for _, bone in ipairs(bones) do
        local boneNode = node:GetChild(bone[1], true)
        if boneNode ~= nil then
            local body = boneNode:CreateComponent("RigidBody")
            body.mass = 1.0
            body.linearDamping = 0.05
            body.angularDamping = 0.85
            body.linearRestThreshold = 1.5
            body.angularRestThreshold = 2.5
            local shape = boneNode:CreateComponent("CollisionShape")
            if bone[2] == SHAPE_BOX then
                shape:SetBox(bone[3], bone[4], bone[5])
            else
                shape:SetCapsule(bone[3].x, bone[3].y, bone[4], bone[5])
            end
        end
    end

    local constraints = {
        {"Bip01_L_Thigh", "Bip01_Pelvis", CONSTRAINT_CONETWIST, Vector3(0, 0, -1), Vector3(0, 0, 1), Vector2(45, 45), Vector2(0, 0), true},
        {"Bip01_R_Thigh", "Bip01_Pelvis", CONSTRAINT_CONETWIST, Vector3(0, 0, -1), Vector3(0, 0, 1), Vector2(45, 45), Vector2(0, 0), true},
        {"Bip01_L_Calf", "Bip01_L_Thigh", CONSTRAINT_HINGE, Vector3(0, 0, -1), Vector3(0, 0, -1), Vector2(90, 0), Vector2(0, 0), true},
        {"Bip01_R_Calf", "Bip01_R_Thigh", CONSTRAINT_HINGE, Vector3(0, 0, -1), Vector3(0, 0, -1), Vector2(90, 0), Vector2(0, 0), true},
        {"Bip01_Spine1", "Bip01_Pelvis", CONSTRAINT_HINGE, Vector3(0, 0, 1), Vector3(0, 0, 1), Vector2(45, 0), Vector2(-10, 0), true},
        {"Bip01_Head", "Bip01_Spine1", CONSTRAINT_CONETWIST, Vector3(-1, 0, 0), Vector3(-1, 0, 0), Vector2(0, 30), Vector2(0, 0), true},
        {"Bip01_L_UpperArm", "Bip01_Spine1", CONSTRAINT_CONETWIST, Vector3(0, -1, 0), Vector3(0, 1, 0), Vector2(45, 45), Vector2(0, 0), false},
        {"Bip01_R_UpperArm", "Bip01_Spine1", CONSTRAINT_CONETWIST, Vector3(0, -1, 0), Vector3(0, 1, 0), Vector2(45, 45), Vector2(0, 0), false},
        {"Bip01_L_Forearm", "Bip01_L_UpperArm", CONSTRAINT_HINGE, Vector3(0, 0, -1), Vector3(0, 0, -1), Vector2(90, 0), Vector2(0, 0), true},
        {"Bip01_R_Forearm", "Bip01_R_UpperArm", CONSTRAINT_HINGE, Vector3(0, 0, -1), Vector3(0, 0, -1), Vector2(90, 0), Vector2(0, 0), true},
    }

    for _, con in ipairs(constraints) do
        local boneNode = node:GetChild(con[1], true)
        local parentNode = node:GetChild(con[2], true)
        if boneNode ~= nil and parentNode ~= nil then
            local constraint = boneNode:CreateComponent("Constraint")
            constraint.constraintType = con[3]
            constraint.disableCollision = con[8]
            constraint.otherBody = parentNode:GetComponent("RigidBody")
            constraint.worldPosition = boneNode.worldPosition
            constraint.axis = con[4]
            constraint.otherAxis = con[5]
            constraint.highLimit = con[6]
            constraint.lowLimit = con[7]
        end
    end

    local model = node:GetComponent("AnimatedModel")
    if model ~= nil then
        local skeleton = model.skeleton
        for i = 0, skeleton.numBones - 1 do
            skeleton:GetBone(i).animated = false
        end
    end
end

return M
