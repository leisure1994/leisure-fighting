--- Decals 贴花示例模块
-- 提取自官方示例 08_Decals，演示射线检测并在命中处动态添加 Decal。
--
-- @module SampleDecals

local M = {}

--- 默认蘑菇数量
M.NUM_MUSHROOMS = 240

--- 默认盒子数量
M.NUM_BOXES = 20

--- 默认变异体数量
M.NUM_MUTANTS = 20

--- 构建 Decals 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateDecalsScene(scene, createCamera)
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
            obj.model = mushModel
            obj.material = mushMat
            obj.castShadows = true
        end
    end

    -- 随机盒子（大盒子设为遮挡体）
    for _ = 1, M.NUM_BOXES do
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

    -- 动画模型
    local mutantModel = cache:GetResource("Model", "Models/Mutant/Mutant.mdl")
    local mutantMat = cache:GetResource("Material", "Models/Mutant/Materials/mutant_M.xml")
    if mutantModel ~= nil and mutantMat ~= nil then
        for _ = 1, M.NUM_MUTANTS do
            local node = scene:CreateChild("Mutant")
            node.position = Vector3(
                math.random() * 90.0 - 45.0,
                0.0,
                math.random() * 90.0 - 45.0
            )
            node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
            node:SetScale(0.5 + math.random() * 2.0)
            local obj = node:CreateComponent("AnimatedModel")
            obj.model = mutantModel
            obj.material = mutantMat
            obj.castShadows = true
            local animCtrl = node:CreateComponent("AnimationController")
            animCtrl:PlayExclusive("Models/Mutant/Mutant_Idle0.ani", 0, true, 0.0)
        end
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 5.0, 0.0)
        return camNode
    end
    return nil
end

--- 执行射线检测并返回命中结果
-- @param maxDistance number
-- @return Vector3|nil hitPos
-- @return Drawable|nil hitDrawable
function M.Raycast(maxDistance)
    local pos = ui.cursorPosition
    if not ui.cursor.visible then return nil, nil end
    if ui:GetElementAt(pos, true) ~= nil then return nil, nil end
    local camNode = scene:GetChild("Camera")
    if camNode == nil then return nil, nil end
    local camera = camNode:GetComponent("Camera")
    local ray = camera:GetScreenRay(pos.x / graphics.width, pos.y / graphics.height)
    local result = scene.octree:RaycastSingle(ray, RAY_TRIANGLE, maxDistance, DrawableTypes.Geometry)
    if result.drawable ~= nil then
        return result.position, result.drawable
    end
    return nil, nil
end

--- 在光标位置喷涂贴花
function M.PaintDecal()
    local hitPos, hitDrawable = M.Raycast(250.0)
    if hitDrawable ~= nil then
        local targetNode = hitDrawable.node
        local decal = targetNode:GetComponent("DecalSet")
        if decal == nil then
            decal = targetNode:CreateComponent("DecalSet")
            decal.material = cache:GetResource("Material", "Materials/UrhoDecal.xml")
        end
        local camNode = scene:GetChild("Camera")
        local rot = Quaternion()
        if camNode ~= nil then rot = camNode.rotation end
        decal:AddDecal(hitDrawable, hitPos, rot, 0.5, 1.0, 1.0, Vector2(0, 0), Vector2(1, 1))
    end
end

return M
