--- RibbonTrail 丝带拖尾示例模块
-- 提取自官方示例 44_RibbonTrailDemo，演示 FaceCamera 与 Bone 两种拖尾效果。
--
-- @module SampleRibbonTrail

local M = {}

--- 盒子节点 1
M.boxNode1 = nil

--- 盒子节点 2
M.boxNode2 = nil

--- 忍者动画控制器
M.ninjaAnimCtrl = nil

--- 剑拖尾组件
M.swordTrail = nil

--- 时间步累积
M.timeStepSum = 0.0

--- 拖尾开始时间
M.SWORD_TRAIL_START = 0.2

--- 拖尾结束时间
M.SWORD_TRAIL_END = 0.46

--- 构建 RibbonTrail 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateRibbonTrailScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(100.0, 1.0, 100.0)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true
    light.shadowBias = BiasParameters(0.00005, 0.5)
    light.shadowCascade = CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8)

    -- 盒子 1（1 列拖尾）
    M.boxNode1 = scene:CreateChild("Box1")
    local box1 = M.boxNode1:CreateComponent("StaticModel")
    box1.model = cache:GetResource("Model", "Models/Box.mdl")
    box1.castShadows = true
    local boxTrail1 = M.boxNode1:CreateComponent("RibbonTrail")
    boxTrail1.material = cache:GetResource("Material", "Materials/RibbonTrail.xml")
    boxTrail1.startColor = Color(1.0, 0.5, 0.0, 1.0)
    boxTrail1.endColor = Color(1.0, 1.0, 0.0, 0.0)
    boxTrail1.width = 0.5
    boxTrail1.updateInvisible = true

    -- 盒子 2（4 列拖尾）
    M.boxNode2 = scene:CreateChild("Box2")
    local box2 = M.boxNode2:CreateComponent("StaticModel")
    box2.model = cache:GetResource("Model", "Models/Box.mdl")
    box2.castShadows = true
    local boxTrail2 = M.boxNode2:CreateComponent("RibbonTrail")
    boxTrail2.material = cache:GetResource("Material", "Materials/RibbonTrail.xml")
    boxTrail2.startColor = Color(1.0, 0.5, 0.0, 1.0)
    boxTrail2.endColor = Color(1.0, 1.0, 0.0, 0.0)
    boxTrail2.width = 0.5
    boxTrail2.tailColumn = 4
    boxTrail2.updateInvisible = true

    -- 忍者骨骼动画
    local ninjaNode = scene:CreateChild("Ninja")
    ninjaNode.position = Vector3(5.0, 0.0, 0.0)
    ninjaNode.rotation = Quaternion(0.0, 180.0, 0.0)
    local ninja = ninjaNode:CreateComponent("AnimatedModel")
    ninja.model = cache:GetResource("Model", "Models/NinjaSnowWar/Ninja.mdl")
    ninja.material = cache:GetResource("Material", "Materials/NinjaSnowWar/Ninja.xml")
    ninja.castShadows = true

    M.ninjaAnimCtrl = ninjaNode:CreateComponent("AnimationController")
    M.ninjaAnimCtrl:PlayExclusive("Models/NinjaSnowWar/Ninja_Attack3.ani", 0, true, 0.0)

    -- 剑尖拖尾
    local swordTip = ninjaNode:GetChild("Joint29", true)
    M.swordTrail = swordTip:CreateComponent("RibbonTrail")
    M.swordTrail.trailType = TT_BONE
    M.swordTrail.material = cache:GetResource("Material", "Materials/SlashTrail.xml")
    M.swordTrail.lifetime = 0.22
    M.swordTrail.startColor = Color(1.0, 1.0, 1.0, 0.75)
    M.swordTrail.endColor = Color(0.2, 0.5, 1.0, 0.0)
    M.swordTrail.tailColumn = 4
    M.swordTrail.updateInvisible = true
    M.swordTrail.emitting = false

    -- 3D 文字说明
    local textNode1 = scene:CreateChild("BoxText1")
    textNode1.position = Vector3(-1.0, 2.0, 0.0)
    local text1 = textNode1:CreateComponent("Text3D")
    text1.text = "Face Camera Trail (4 Column)"
    text1:SetFont(cache:GetResource("Font", "Fonts/BlueHighway.sdf"), 24)

    local textNode2 = scene:CreateChild("BoxText2")
    textNode2.position = Vector3(-6.0, 2.0, 0.0)
    local text2 = textNode2:CreateComponent("Text3D")
    text2.text = "Face Camera Trail (1 Column)"
    text2:SetFont(cache:GetResource("Font", "Fonts/BlueHighway.sdf"), 24)

    local textNode3 = scene:CreateChild("NinjaText")
    textNode3.position = Vector3(4.0, 2.5, 0.0)
    local text3 = textNode3:CreateComponent("Text3D")
    text3.text = "Bone Trail (4 Column)"
    text3:SetFont(cache:GetResource("Font", "Fonts/BlueHighway.sdf"), 24)

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        camNode:CreateComponent("Camera")
        camNode.position = Vector3(0.0, 2.0, -14.0)
        return camNode
    end
    return nil
end

--- RibbonTrail 场景更新
-- @param timeStep number
function M.UpdateRibbonTrailScene(timeStep)
    M.timeStepSum = M.timeStepSum + timeStep

    M.boxNode1:SetTransform(
        Vector3(-4.0 + 3.0 * math.cos(100.0 * M.timeStepSum), 0.5, -2.0 * math.cos(400.0 * M.timeStepSum)),
        Quaternion()
    )
    M.boxNode2:SetTransform(
        Vector3(0.0 + 3.0 * math.cos(100.0 * M.timeStepSum), 0.5, -2.0 * math.cos(400.0 * M.timeStepSum)),
        Quaternion()
    )

    if M.ninjaAnimCtrl ~= nil and M.swordTrail ~= nil then
        local animState = M.ninjaAnimCtrl:GetAnimationState("Models/NinjaSnowWar/Ninja_Attack3.ani")
        if animState ~= nil then
            local swordAnimTime = animState.time
            if not M.swordTrail.emitting and swordAnimTime > M.SWORD_TRAIL_START and swordAnimTime < M.SWORD_TRAIL_END then
                M.swordTrail.emitting = true
            elseif M.swordTrail.emitting and swordAnimTime >= M.SWORD_TRAIL_END then
                M.swordTrail.emitting = false
            end
        end
    end
end

return M
