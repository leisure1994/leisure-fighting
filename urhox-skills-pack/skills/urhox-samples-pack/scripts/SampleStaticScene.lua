--- 静态 3D 场景示例模块
-- 提取自官方示例 04_StaticScene，包含 Octree、地面、方向光、批量蘑菇实例、摄像机的完整创建流程。
--
-- @module SampleStaticScene

local M = {}

--- 默认平面尺寸
M.PLANE_SIZE = 100.0

--- 默认物体数量
M.NUM_OBJECTS = 200

--- 构建完整的静态 3D 场景
-- @param scene Scene
-- @param createCamera boolean 是否创建摄像机
-- @return Node|nil cameraNode
function M.CreateStaticScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(M.PLANE_SIZE, 1.0, M.PLANE_SIZE)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL

    -- 随机蘑菇
    local model = cache:GetResource("Model", "Models/Mushroom.mdl")
    local material = cache:GetResource("Material", "Materials/Mushroom.xml")
    if model ~= nil and material ~= nil then
        for _ = 1, M.NUM_OBJECTS do
            local node = scene:CreateChild("Mushroom")
            node.position = Vector3(
                math.random() * 90.0 - 45.0,
                0.0,
                math.random() * 90.0 - 45.0
            )
            node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
            node:SetScale(0.5 + math.random() * 2.0)
            local obj = node:CreateComponent("StaticModel")
            obj.model = model
            obj.material = material
        end
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        camNode:CreateComponent("Camera")
        camNode.position = Vector3(0.0, 5.0, 0.0)
        return camNode
    end
    return nil
end

return M
