--- Urho2D 粒子示例模块
-- 提取自官方示例 25_Urho2DParticle，演示在 2D 正交场景中创建粒子发射器并通过鼠标移动控制粒子位置。
--
-- @module SampleUrho2DParticle

local M = {}

--- 粒子根节点
M.particleNode = nil

--- 构建 2D 粒子场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateUrho2DParticleScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        camNode.position = Vector3(0.0, 0.0, -10.0)
        local camera = camNode:CreateComponent("Camera")
        camera.orthographic = true
        camera.orthoSize = graphics.height * 0.01
        camera.zoom = 1.2 * math.min(graphics.width / 1280.0, graphics.height / 800.0)
    end

    local sunEffect = cache:GetResource("ParticleEffect2D", "Urho2D/sun.pex")
    if sunEffect ~= nil then
        M.particleNode = scene:CreateChild("ParticleEmitter2D")
        local emitter = M.particleNode:CreateComponent("ParticleEmitter2D")
        emitter.effect = sunEffect
    end

    local greenSpiralEffect = cache:GetResource("ParticleEffect2D", "Urho2D/greenspiral.pex")
    if greenSpiralEffect ~= nil then
        local greenSpiralNode = scene:CreateChild("GreenSpiral")
        local greenSpiralEmitter = greenSpiralNode:CreateComponent("ParticleEmitter2D")
        greenSpiralEmitter.effect = greenSpiralEffect
    end

    return scene:GetChild("Camera")
end

--- 处理鼠标/触摸移动事件，移动主粒子到对应世界坐标
-- @param eventData VariantMap 事件数据
function M.HandleMouseMove(eventData)
    if M.particleNode == nil then return end
    local x = eventData["X"]:GetI32()
    local y = eventData["Y"]:GetI32()
    local camNode = scene:GetChild("Camera")
    if camNode == nil then return end
    local camera = camNode:GetComponent("Camera")
    M.particleNode.position = camera:ScreenToWorldPoint(Vector3(x / graphics.width, y / graphics.height, 10.0))
end

return M
