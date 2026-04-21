--- Water 水面反射示例模块
-- 提取自官方示例 23_Water，演示大规模水面渲染、反射摄像机与高度图地形。
--
-- @module SampleWater

local M = {}

--- 反射摄像机节点
M.reflectionCameraNode = nil

--- 水面节点
M.waterNode = nil

--- 水面数学平面
M.waterPlane = nil

--- 水面裁剪平面
M.waterClipPlane = nil

--- 构建水面场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateWaterScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")
    scene:CreateComponent("DebugRenderer")

    -- Zone
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = Color(0.15, 0.15, 0.15)
    zone.fogColor = Color(1.0, 1.0, 1.0)
    zone.fogStart = 500.0
    zone.fogEnd = 750.0

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.3, -0.5, 0.425)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true
    light.shadowBias = BiasParameters(0.00025, 0.5)
    light.shadowCascade = CascadeParameters(10.0, 50.0, 200.0, 0.0, 0.8)
    light.specularIntensity = 0.5
    light.color = Color(1.2, 1.2, 1.2)

    -- 天空盒
    local skyNode = scene:CreateChild("Sky")
    skyNode:SetScale(500.0)
    local skybox = skyNode:CreateComponent("Skybox")
    skybox.model = cache:GetResource("Model", "Models/Box.mdl")
    skybox.material = cache:GetResource("Material", "Materials/Skybox.xml")

    -- 地形
    local terrainNode = scene:CreateChild("Terrain")
    terrainNode.position = Vector3(0.0, 0.0, 0.0)
    local terrain = terrainNode:CreateComponent("Terrain")
    terrain.patchSize = 64
    terrain.spacing = Vector3(2.0, 0.5, 2.0)
    terrain.smoothing = true
    terrain.heightMap = cache:GetResource("Image", "Textures/HeightMap.png")
    terrain.material = cache:GetResource("Material", "Materials/Terrain.xml")
    terrain.occluder = true

    -- 随机盒子
    local NUM_OBJECTS = 1000
    local boxModel = cache:GetResource("Model", "Models/Box.mdl")
    local boxMat = cache:GetResource("Material", "Materials/Stone.xml")
    if boxModel ~= nil and boxMat ~= nil then
        for _ = 1, NUM_OBJECTS do
            local objectNode = scene:CreateChild("Box")
            local px = math.random() * 2000.0 - 1000.0
            local pz = math.random() * 2000.0 - 1000.0
            local py = terrain:GetHeight(Vector3(px, 0.0, pz)) + 2.25
            objectNode.position = Vector3(px, py, pz)
            local normal = terrain:GetNormal(Vector3(px, 0.0, pz))
            objectNode.rotation = Quaternion(Vector3(0.0, 1.0, 0.0), normal)
            objectNode:SetScale(5.0)
            local obj = objectNode:CreateComponent("StaticModel")
            obj.model = boxModel
            obj.material = boxMat
            obj.castShadows = true
        end
    end

    -- 水面
    M.waterNode = scene:CreateChild("Water")
    M.waterNode.scale = Vector3(2048.0, 1.0, 2048.0)
    M.waterNode.position = Vector3(0.0, 5.0, 0.0)
    local water = M.waterNode:CreateComponent("StaticModel")
    water.model = cache:GetResource("Model", "Models/Plane.mdl")
    water.material = cache:GetResource("Material", "Materials/Water.xml")
    water.viewMask = 0x80000000

    -- 主摄像机
    local camNode = Node()
    local camera = camNode:CreateComponent("Camera")
    camera.farClip = 750.0
    camNode.position = Vector3(0.0, 7.0, -20.0)

    -- 反射平面计算
    M.waterPlane = Plane(M.waterNode.worldRotation * Vector3(0.0, 1.0, 0.0), M.waterNode.worldPosition)
    M.waterClipPlane = Plane(M.waterNode.worldRotation * Vector3(0.0, 1.0, 0.0), M.waterNode.worldPosition - Vector3(0.0, 0.1, 0.0))

    -- 反射摄像机
    M.reflectionCameraNode = camNode:CreateChild()
    local reflectionCamera = M.reflectionCameraNode:CreateComponent("Camera")
    reflectionCamera.farClip = 750.0
    reflectionCamera.viewMask = 0x7fffffff
    reflectionCamera.autoAspectRatio = false
    reflectionCamera.useReflection = true
    reflectionCamera.reflectionPlane = M.waterPlane
    reflectionCamera.useClipping = true
    reflectionCamera.clipPlane = M.waterClipPlane
    reflectionCamera.aspectRatio = graphics.width / graphics.height

    -- RTT 纹理与材质绑定
    local texSize = 1024
    local renderTexture = Texture2D()
    renderTexture:SetSize(texSize, texSize, Graphics.GetRGBFormat(), TEXTURE_RENDERTARGET)
    renderTexture.filterMode = FILTER_BILINEAR
    local surface = renderTexture.renderSurface
    local rttViewport = Viewport(scene, reflectionCamera)
    surface.viewports[0] = rttViewport
    local waterMat = cache:GetResource("Material", "Materials/Water.xml")
    waterMat.textures[0] = renderTexture

    return camNode
end

--- 响应分辨率变化，更新反射摄像机的宽高比
function M.UpdateReflectionAspect()
    if M.reflectionCameraNode ~= nil then
        local reflectionCamera = M.reflectionCameraNode:GetComponent("Camera")
        reflectionCamera.aspectRatio = graphics.width / graphics.height
    end
end

return M
