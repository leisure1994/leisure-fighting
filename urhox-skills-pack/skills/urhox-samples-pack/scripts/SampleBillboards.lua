--- Billboards 公告板示例模块
-- 提取自官方示例 07_Billboards，演示 Billboards、ParticleEmitter 与天空盒的组合使用。
--
-- @module SampleBillboards

local M = {}

--- 默认蘑菇数量
M.NUM_MUSHROOMS = 240

--- 构建 Billboards 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateBillboardsScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(100.0, 1.0, 100.0)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 方向光 + 阴影
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true
    light.shadowBias = BiasParameters(0.00025, 0.5)
    light.shadowCascade = CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8)

    -- 天空盒
    local skyNode = scene:CreateChild("Sky")
    skyNode:SetScale(500.0)
    local skybox = skyNode:CreateComponent("Skybox")
    skybox.model = cache:GetResource("Model", "Models/Box.mdl")
    skybox.material = cache:GetResource("Material", "Materials/Skybox.xml")

    -- 随机蘑菇（公告板树冠）
    local mushroomModel = cache:GetResource("Model", "Models/Mushroom.mdl")
    local mushroomMat = cache:GetResource("Material", "Materials/Mushroom.xml")
    if mushroomModel ~= nil and mushroomMat ~= nil then
        for _ = 1, M.NUM_MUSHROOMS do
            local node = scene:CreateChild("Mushroom")
            node.position = Vector3(
                math.random() * 90.0 - 45.0,
                0.0,
                math.random() * 90.0 - 45.0
            )
            node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
            node:SetScale(0.5 + math.random() * 2.0)
            local obj = node:CreateComponent("StaticModel")
            obj.model = mushroomModel
            obj.material = mushroomMat
            obj.castShadows = true
        end
    end

    -- 烟雾粒子
    local particleNode = scene:CreateChild("Smoke")
    particleNode.position = Vector3(0.0, 3.0, 0.0)
    local particleEmitter = particleNode:CreateComponent("ParticleEmitter")
    particleEmitter.effect = cache:GetResource("ParticleEffect", "Particle/Smoke.xml")

    -- 广告牌星星（通过 BillboardSet）
    local bbNode = scene:CreateChild("Billboards")
    bbNode.position = Vector3(0.0, 5.0, 0.0)
    local bbSet = bbNode:CreateComponent("BillboardSet")
    bbSet.numBillboards = 100
    bbSet.material = cache:GetResource("Material", "Materials/Jack.xml")
    bbSet.relative = true
    for i = 0, bbSet.numBillboards - 1 do
        local bb = bbSet:GetBillboard(i)
        bb.position = Vector3(
            math.random() * 20.0 - 10.0,
            math.random() * 20.0 - 10.0,
            math.random() * 20.0 - 10.0
        )
        bb.size = Vector2(0.5 + math.random() * 0.5, 0.5 + math.random() * 0.5)
        bb.color = Color(1.0, 1.0, 1.0, 0.5 + math.random() * 0.5)
        bb.enabled = true
    end
    bbSet:Commit()

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 5.0, 0.0)
        return camNode
    end
    return nil
end

return M
