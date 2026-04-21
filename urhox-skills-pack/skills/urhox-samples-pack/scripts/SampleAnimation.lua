--- 3D 场景动画模块
-- 提取自官方示例 05_AnimatingScene，提供 Zone + 批量旋转物体 + Rotator 脚本对象的封装。
--
-- @module SampleAnimation

local M = {}

--- Rotator 组件表（用于在 Update 中批量更新）
local ROTATORS = {}

--- 清空 Rotator 记录
function M.ClearRotators()
    ROTATORS = {}
end

--- 创建一个自动旋转的脚本对象并绑定到节点
-- 在 Lua 层我们通过 vars 存储旋转速度，在独立 Update 循环中统一处理。
-- @param node Node 目标节点
-- @param speed Vector3 每秒旋转角度
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

--- 创建动画场景（与 05_AnimatingScene 对应）
-- @param scene Scene
-- @param count number 对象数量，默认 2000
-- @param createCamera boolean 是否创建摄像机，默认 true
-- @return Node|nil cameraNode
function M.CreateAnimatingScene(scene, count, createCamera)
    count = count or 2000
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
        local cameraNode = scene:CreateChild("Camera")
        local camera = cameraNode:CreateComponent("Camera")
        camera.farClip = 100.0
        local light = cameraNode:CreateComponent("Light")
        light.lightType = LIGHT_POINT
        light.range = 30.0
        return cameraNode
    end
    return nil
end

return M
