--- MultipleViewports 多视口示例模块
-- 提取自官方示例 09_MultipleViewports，演示前后双摄像机以及 Bloom/FXAA 后处理切换。
--
-- @module SampleMultipleViewports

local M = {}

--- 后视摄像机节点
M.rearCameraNode = nil

--- 构建多视口场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil 返回主摄像机节点
function M.CreateMultipleViewportsScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")
    scene:CreateComponent("DebugRenderer")

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(100.0, 1.0, 100.0)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

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

    -- 蘑菇
    local mushModel = cache:GetResource("Model", "Models/Mushroom.mdl")
    local mushMat = cache:GetResource("Material", "Materials/Mushroom.xml")
    if mushModel ~= nil and mushMat ~= nil then
        for _ = 1, 240 do
            local node = scene:CreateChild("Mushroom")
            node.position = Vector3(
                math.random() * 90.0 - 45.0,
                0.0,
                math.random() * 90.0 - 45.0
            )
            node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
            node:SetScale(0.5 + math.random() * 2.0)
            local obj = node:CreateComponent("StaticModel")
            obj.model = mushModel
            obj.material = mushMat
            obj.castShadows = true
        end
    end

    -- 盒子（大盒子设为遮挡体）
    for _ = 1, 20 do
        local node = scene:CreateChild("Box")
        local size = 1.0 + math.random() * 10.0
        node.position = Vector3(
            math.random() * 80.0 - 40.0,
            size * 0.5,
            math.random() * 80.0 - 40.0
        )
        node:SetScale(size)
        local obj = node:CreateComponent("StaticModel")
        obj.model = cache:GetResource("Model", "Models/Box.mdl")
        obj.material = cache:GetResource("Material", "Materials/Stone.xml")
        obj.castShadows = true
        if size >= 3.0 then
            obj.occluder = true
        end
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 5.0, 0.0)

        -- 后视摄像机
        M.rearCameraNode = camNode:CreateChild("RearCamera")
        M.rearCameraNode:Rotate(Quaternion(180.0, Vector3(0, 1, 0)))
        local rearCamera = M.rearCameraNode:CreateComponent("Camera")
        rearCamera.farClip = 300.0
        rearCamera.viewOverrideFlags = VO_DISABLE_OCCLUSION
        return camNode
    end
    return nil
end

--- 设置前后两个视口及后处理
-- @param scene Scene
-- @param frontCameraNode Node 主摄像机
function M.SetupViewports(scene, frontCameraNode)
    renderer.numViewports = 2

    local viewport = Viewport(scene, frontCameraNode:GetComponent("Camera"))
    renderer.viewports[0] = viewport

    local effectRenderPath = viewport.renderPath:Clone()
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/Bloom.xml"))
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/FXAA2.xml"))
    effectRenderPath.shaderParameters["BloomMix"] = Variant(Vector2(0.9, 0.6))
    effectRenderPath:SetEnabled("Bloom", false)
    effectRenderPath:SetEnabled("FXAA2", false)
    viewport.renderPath = effectRenderPath

    local rearViewport = Viewport(
        scene,
        M.rearCameraNode:GetComponent("Camera"),
        IntRect(graphics.width * 2 // 3, 32, graphics.width - 32, graphics.height // 3)
    )
    renderer.viewports[1] = rearViewport
end

--- 切换 Bloom 效果
function M.ToggleBloom()
    local viewport = renderer.viewports[0]
    if viewport ~= nil then
        viewport.renderPath:ToggleEnabled("Bloom")
    end
end

--- 切换 FXAA 效果
function M.ToggleFXAA()
    local viewport = renderer.viewports[0]
    if viewport ~= nil then
        viewport.renderPath:ToggleEnabled("FXAA2")
    end
end

return M
