--- RenderToTexture 渲染到纹理示例模块
-- 提取自官方示例 10_RenderToTexture，演示双场景、程序化创建 RTT 材质及视图绑定。
--
-- @module SampleRenderToTexture

local M = {}

--- RTT 场景
M.rttScene = nil

--- RTT 摄像机节点
M.rttCameraNode = nil

--- Rotator 记录
local ROTATORS = {}

--- 清空 Rotator
function M.ClearRotators()
    ROTATORS = {}
end

--- 添加 Rotator
-- @param node Node
-- @param speed Vector3
function M.AddRotator(node, speed)
    if node == nil then return end
    node.vars["RotatorSpeed"] = Variant(speed)
    table.insert(ROTATORS, node)
end

--- 更新所有 Rotator
-- @param timeStep number
function M.UpdateRotators(timeStep)
    for _, node in ipairs(ROTATORS) do
        local speedVar = node.vars["RotatorSpeed"]
        if speedVar ~= nil then
            local speed = speedVar:GetVector3()
            node:Rotate(Quaternion(speed.x * timeStep, speed.y * timeStep, speed.z * timeStep))
        end
    end
end

--- 构建渲染到纹理场景
function M.CreateRenderToTextureScene()
    -- RTT 场景
    M.rttScene = Scene()
    M.rttScene:CreateComponent("Octree")

    local zoneNode = M.rttScene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = Color(0.05, 0.1, 0.15)
    zone.fogColor = Color(0.1, 0.2, 0.3)
    zone.fogStart = 10.0
    zone.fogEnd = 100.0

    for _ = 1, 2000 do
        local boxNode = M.rttScene:CreateChild("Box")
        boxNode.position = Vector3(
            math.random() * 200.0 - 100.0,
            math.random() * 200.0 - 100.0,
            math.random() * 200.0 - 100.0
        )
        boxNode.rotation = Quaternion(
            math.random() * 360.0,
            math.random() * 360.0,
            math.random() * 360.0
        )
        local obj = boxNode:CreateComponent("StaticModel")
        obj.model = cache:GetResource("Model", "Models/Box.mdl")
        obj.material = cache:GetResource("Material", "Materials/Stone.xml")
        M.AddRotator(boxNode, Vector3(10.0, 20.0, 30.0))
    end

    M.rttCameraNode = M.rttScene:CreateChild("Camera")
    local camera = M.rttCameraNode:CreateComponent("Camera")
    camera.farClip = 100.0
    local light = M.rttCameraNode:CreateComponent("Light")
    light.lightType = LIGHT_POINT
    light.range = 30.0

    -- 主场景
    local mainScene = Scene()
    mainScene:CreateComponent("Octree")

    local mainZoneNode = mainScene:CreateChild("Zone")
    local mainZone = mainZoneNode:CreateComponent("Zone")
    mainZone.boundingBox = BoundingBox(-1000.0, 1000.0)
    mainZone.ambientColor = Color(0.1, 0.1, 0.1)
    mainZone.fogStart = 100.0
    mainZone.fogEnd = 300.0

    -- 地板
    for y = -5, 5 do
        for x = -5, 5 do
            local tile = mainScene:CreateChild("FloorTile")
            tile.position = Vector3(x * 20.5, -0.5, y * 20.5)
            tile.scale = Vector3(20.0, 1.0, 20.0)
            local tileObj = tile:CreateComponent("StaticModel")
            tileObj.model = cache:GetResource("Model", "Models/Box.mdl")
            tileObj.material = cache:GetResource("Material", "Materials/Stone.xml")
        end
    end

    -- 屏幕
    local boxNode = mainScene:CreateChild("ScreenBox")
    boxNode.position = Vector3(0.0, 10.0, 0.0)
    boxNode.scale = Vector3(21.0, 16.0, 0.5)
    local boxObj = boxNode:CreateComponent("StaticModel")
    boxObj.model = cache:GetResource("Model", "Models/Box.mdl")
    boxObj.material = cache:GetResource("Material", "Materials/Stone.xml")

    local screenNode = mainScene:CreateChild("Screen")
    screenNode.position = Vector3(0.0, 10.0, -0.27)
    screenNode.rotation = Quaternion(-90.0, 0.0, 0.0)
    screenNode.scale = Vector3(20.0, 0.0, 15.0)
    local screenObj = screenNode:CreateComponent("StaticModel")
    screenObj.model = cache:GetResource("Model", "Models/Plane.mdl")

    local renderTexture = Texture2D()
    renderTexture:SetSize(1024, 768, Graphics.GetRGBFormat(), TEXTURE_RENDERTARGET)
    renderTexture.filterMode = FILTER_BILINEAR

    local renderMaterial = Material()
    renderMaterial:SetTechnique(0, cache:GetResource("Technique", "Techniques/DiffUnlit.xml"))
    renderMaterial.textures[0] = renderTexture -- TU_DIFFUSE = 0
    renderMaterial.depthBias = BiasParameters(-0.001, 0.0)
    screenObj.material = renderMaterial

    local surface = renderTexture.renderSurface
    local rttViewport = Viewport(M.rttScene, M.rttCameraNode:GetComponent("Camera"))
    surface.viewports[0] = rttViewport

    -- 主摄像机
    local camNode = mainScene:CreateChild("Camera")
    local mainCamera = camNode:CreateComponent("Camera")
    mainCamera.farClip = 300.0
    camNode.position = Vector3(0.0, 7.0, -30.0)

    return mainScene, camNode
end

return M
