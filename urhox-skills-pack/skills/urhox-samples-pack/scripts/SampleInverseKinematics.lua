--- InverseKinematics 反向动力学示例模块
-- 提取自官方示例 45_InverseKinematics，演示 IKSolver + IKEffector 实现斜坡上的足部自适应。
--
-- @module SampleInverseKinematics

local M = {}

--- Jack 动画控制器
M.jackAnimCtrl = nil

--- 摄像机旋转节点
M.cameraRotateNode = nil

--- 地板节点
M.floorNode = nil

--- 左脚节点
M.leftFoot = nil

--- 右脚节点
M.rightFoot = nil

--- Jack 根节点
M.jackNode = nil

--- 左脚效应器
M.leftEffector = nil

--- 右脚效应器
M.rightEffector = nil

--- IK 求解器
M.solver = nil

--- 地板俯仰角
M.floorPitch = 0.0

--- 地板翻滚角
M.floorRoll = 0.0

--- 是否绘制调试几何体
M.drawDebug = false

--- 构建 IK 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateInverseKinematicsScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")
    scene:CreateComponent("DebugRenderer")
    scene:CreateComponent("PhysicsWorld")

    -- 地板
    M.floorNode = scene:CreateChild("Plane")
    M.floorNode.scale = Vector3(50.0, 1.0, 50.0)
    local planeObj = M.floorNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")
    M.floorNode:CreateComponent("RigidBody")
    local col = M.floorNode:CreateComponent("CollisionShape")
    col:SetBox(Vector3(1, 0, 1))

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true
    light.shadowBias = BiasParameters(0.00005, 0.5)
    light.shadowCascade = CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8)

    -- Jack
    M.jackNode = scene:CreateChild("Jack")
    M.jackNode.rotation = Quaternion(0.0, 270.0, 0.0)
    local jack = M.jackNode:CreateComponent("AnimatedModel")
    jack.model = cache:GetResource("Model", "Models/Jack.mdl")
    jack.material = cache:GetResource("Material", "Materials/Jack.xml")
    jack.castShadows = true

    M.jackAnimCtrl = M.jackNode:CreateComponent("AnimationController")
    M.jackAnimCtrl:PlayExclusive("Models/Jack_Walk.ani", 0, true, 0.0)

    -- 脚部效应器
    M.leftFoot = M.jackNode:GetChild("Bip01_L_Foot", true)
    M.rightFoot = M.jackNode:GetChild("Bip01_R_Foot", true)
    M.leftEffector = M.leftFoot:CreateComponent("IKEffector")
    M.rightEffector = M.rightFoot:CreateComponent("IKEffector")
    M.leftEffector.chainLength = 2
    M.rightEffector.chainLength = 2

    -- IK 求解器
    local spine = M.jackNode:GetChild("Bip01_Spine", true)
    M.solver = spine:CreateComponent("IKSolver")
    -- 枚举值可能存在不同绑定名称，使用最可能正确的常量；若绑定未暴露，默认 0 通常对应 TWO_BONE
    local function safeEnum(name, default)
        local v = _G[name]
        if v ~= nil then return v else return default end
    end
    M.solver.algorithm = safeEnum("IKAlgorithm.TWO_BONE", 0)
    M.solver.AUTO_SOLVE = false
    M.solver.UPDATE_ORIGINAL_POSE = true

    if createCamera then
        M.cameraRotateNode = scene:CreateChild("CameraRotate")
        local camNode = M.cameraRotateNode:CreateChild("Camera")
        camNode:CreateComponent("Camera")
        camNode.position = Vector3(0.0, 0.0, -4.0)
        M.cameraRotateNode.position = Vector3(0.0, 0.4, 0.0)
        return camNode
    end
    return nil
end

--- 更新摄像机与地板角度
-- @param timeStep number
-- @param yaw number
-- @param pitch number
function M.UpdateCameraAndFloor(timeStep, yaw, pitch)
    if ui.focusElement ~= nil then return end
    local MOUSE_SENSITIVITY = 0.1

    if input:GetMouseButtonDown(MOUSEB_LEFT) then
        local mouseMove = input.mouseMove
        yaw = yaw + MOUSE_SENSITIVITY * mouseMove.x
        pitch = pitch + MOUSE_SENSITIVITY * mouseMove.y
        pitch = Clamp(pitch, -90.0, 90.0)
    end

    if input:GetMouseButtonDown(MOUSEB_RIGHT) then
        local mouseMoveInt = input.mouseMove
        -- 旋转鼠标的 2D 移动以匹配地板轴向
        local mdx = mouseMoveInt.y
        local mdy = -mouseMoveInt.x
        local rx = -math.cos(yaw) * mdx + math.sin(yaw) * mdy
        local ry = math.sin(yaw) * mdx + math.cos(yaw) * mdy
        M.floorPitch = M.floorPitch + MOUSE_SENSITIVITY * rx
        M.floorPitch = Clamp(M.floorPitch, -90.0, 90.0)
        M.floorRoll = M.floorRoll + MOUSE_SENSITIVITY * ry
    end

    if input:GetKeyPress(KEY_SPACE) then
        M.floorPitch = 0.0
        M.floorRoll = 0.0
    end
    if input:GetKeyPress(KEY_D) then
        M.drawDebug = not M.drawDebug
    end

    if M.cameraRotateNode ~= nil then
        M.cameraRotateNode.rotation = Quaternion(pitch, yaw, 0.0)
    end
    if M.floorNode ~= nil then
        M.floorNode.rotation = Quaternion(M.floorPitch, 0.0, M.floorRoll)
    end
    return yaw, pitch
end

--- 在 SceneDrawableUpdateFinished 中执行 IK 解算
function M.SolveIK()
    if M.leftFoot == nil or M.rightFoot == nil or M.solver == nil then return end

    local leftFootPosition = M.leftFoot.worldPosition
    local rightFootPosition = M.rightFoot.worldPosition
    local physicsWorld = scene:GetComponent("PhysicsWorld")
    if physicsWorld == nil then return end

    -- 左脚射線
    local result = physicsWorld:RaycastSingle(Ray(leftFootPosition + Vector3(0, 1, 0), Vector3(0, -1, 0)), 2)
    if result.body ~= nil then
        result = physicsWorld:RaycastSingle(Ray(leftFootPosition + result.normal, -result.normal), 2)
        local footOffset = M.leftFoot.worldPosition.y - M.jackNode.worldPosition.y
        M.leftEffector.targetPosition = result.position + result.normal * footOffset
        M.leftFoot:Rotate(Quaternion(Vector3(0, 1, 0), result.normal), TS_WORLD)
    end

    -- 右脚射線
    result = physicsWorld:RaycastSingle(Ray(rightFootPosition + Vector3(0, 1, 0), Vector3(0, -1, 0)), 2)
    if result.body ~= nil then
        result = physicsWorld:RaycastSingle(Ray(rightFootPosition + result.normal, -result.normal), 2)
        local footOffset = M.rightFoot.worldPosition.y - M.jackNode.worldPosition.y
        M.rightEffector.targetPosition = result.position + result.normal * footOffset
        M.rightFoot:Rotate(Quaternion(Vector3(0, 1, 0), result.normal), TS_WORLD)
    end

    M.solver:Solve()
end

return M
