--- 自动旋转场景示例模块
-- 提取自官方示例 05_AnimatingScene，基于 Zone + 批量自转 Box + 摄像机附带点光源。
--
-- @module SampleAnimatingScene

local M = {}

--- 默认对象数量
M.NUM_OBJECTS = 2000

--- 当前注册的 Rotator 节点列表
local ROTATORS = {}

--- 清空 Rotator 记录
function M.ClearRotators()
    ROTATORS = {}
end

--- 为节点添加 Rotator 行为
-- @param node Node
-- @param speed Vector3 旋转速度（度/秒）
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

--- 创建动画场景
-- @param scene Scene
-- @param count number
-- @param createCamera boolean
-- @return Node|nil
function M.CreateAnimatingScene(scene, count, createCamera)
    count = count or M.NUM_OBJECTS
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- Zone
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = Color(0.05, 0.1, 0.15)
    zone.fogColor = Color(0.1, 0.2, 0.3)
    zone.fogStart = 10.0
    zone.fogEnd = 100.0

    local model = cache:GetResource("Model", "Models/Box.mdl")
    local material = cache:GetResource("Material", "Materials/Stone.xml")
    if model ~= nil and material ~= nil then
        for _ = 1, count do
            local boxNode = scene:CreateChild("Box")
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
            local boxObj = boxNode:CreateComponent("StaticModel")
            boxObj.model = model
            boxObj.material = material
            M.AddRotator(boxNode, Vector3(10.0, 20.0, 30.0))
        end
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 100.0
        local light = camNode:CreateComponent("Light")
        light.lightType = LIGHT_POINT
        light.range = 30.0
        return camNode
    end
    return nil
end

return M
