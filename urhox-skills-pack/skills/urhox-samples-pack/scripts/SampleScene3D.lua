--- 3D 静态场景快速构建模块
-- 提取自官方示例 04_StaticScene，提供 Octree、地面、方向光、批量模型实例、摄像机的一站式创建。
--
-- @module SampleScene3D

local M = {}

--- 默认地面尺寸
M.DEFAULT_PLANE_SIZE = 100.0

--- 默认物体数量
M.DEFAULT_NUM_OBJECTS = 200

--- 创建基础 3D 场景（Octree + Zone + Light + Ground + Objects）
-- @param scene Scene 已有的 Scene 对象
-- @param createCamera boolean 是否自动创建摄像机节点
-- @return Node|nil 若 createCamera 为 true 则返回 cameraNode，否则返回 nil
function M.CreateBaseScene(scene, createCamera)
    scene:CreateComponent("Octree")

    -- 平面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(M.DEFAULT_PLANE_SIZE, 1.0, M.DEFAULT_PLANE_SIZE)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL

    if createCamera then
        local cameraNode = scene:CreateChild("Camera")
        cameraNode:CreateComponent("Camera")
        cameraNode.position = Vector3(0.0, 5.0, 0.0)
        return cameraNode
    end
    return nil
end

--- 在场景中批量创建随机分布的模型
-- @param scene Scene
-- @param count number 数量，默认 DEFAULT_NUM_OBJECTS
-- @param modelPath string 模型资源路径
-- @param materialPath string 材质资源路径
-- @param range number 分布范围的一半，默认 45.0
-- @param minScale number 最小缩放，默认 0.5
-- @param maxScale number 最大缩放，默认 2.5
function M.SpawnRandomObjects(scene, count, modelPath, materialPath, range, minScale, maxScale)
    count = count or M.DEFAULT_NUM_OBJECTS
    range = range or 45.0
    minScale = minScale or 0.5
    maxScale = maxScale or 2.5
    modelPath = modelPath or "Models/Mushroom.mdl"
    materialPath = materialPath or "Materials/Mushroom.xml"
    local model = cache:GetResource("Model", modelPath)
    local material = cache:GetResource("Material", materialPath)
    if model == nil or material == nil then return end
    for _ = 1, count do
        local node = scene:CreateChild("Object")
        node.position = Vector3(
            math.random() * (range * 2.0) - range,
            0.0,
            math.random() * (range * 2.0) - range
        )
        node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
        node:SetScale(minScale + math.random() * (maxScale - minScale))
        local obj = node:CreateComponent("StaticModel")
        obj.model = model
        obj.material = material
    end
end

--- 创建带雾效的 Zone
-- @param scene Scene
-- @param ambientColor Color
-- @param fogColor Color
-- @param fogStart number
-- @param fogEnd number
function M.CreateZone(scene, ambientColor, fogColor, fogStart, fogEnd)
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = ambientColor or Color(0.05, 0.1, 0.15)
    zone.fogColor = fogColor or Color(0.1, 0.2, 0.3)
    zone.fogStart = fogStart or 10.0
    zone.fogEnd = fogEnd or 100.0
end

return M
