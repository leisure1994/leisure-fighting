--- Navigation 导航网格示例模块
-- 提取自官方示例 15_Navigation，演示 NavigationMesh、Detour 寻路、流式加载与调试几何体绘制。
--
-- @module SampleNavigation

local M = {}

--- 流式加载距离
M.STREAMING_DISTANCE = 2

--- 目标位置
M.endPos = Vector3.ZERO

--- 当前路径点列表
M.currentPath = {}

--- Jack 节点
M.jackNode = nil

--- 是否启用流式加载
M.useStreaming = false

--- 导航瓦片数据缓存
M.navigationTilesData = {}

--- 导航瓦片索引缓存
M.navigationTilesIdx = {}

--- 已添加的瓦片索引
M.addedTiles = {}

--- 构建导航场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateNavigationScene(scene, createCamera)
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

    -- 蘑菇障碍物
    for _ = 1, 100 do
        local node = scene:CreateChild("Mushroom")
        node.position = Vector3(
            math.random() * 90.0 - 45.0,
            0.0,
            math.random() * 90.0 - 45.0
        )
        node.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
        node:SetScale(2.0 + math.random() * 0.5)
        local obj = node:CreateComponent("StaticModel")
        obj.model = cache:GetResource("Model", "Models/Mushroom.mdl")
        obj.material = cache:GetResource("Material", "Materials/Mushroom.xml")
        obj.castShadows = true
    end

    -- 盒子障碍物
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

    -- Jack
    M.jackNode = scene:CreateChild("Jack")
    M.jackNode.position = Vector3(-5.0, 0.0, 20.0)
    local am = M.jackNode:CreateComponent("AnimatedModel")
    am.model = cache:GetResource("Model", "Models/Jack.mdl")
    am.material = cache:GetResource("Material", "Materials/Jack.xml")
    am.castShadows = true

    -- NavigationMesh
    local navMesh = scene:CreateComponent("NavigationMesh")
    navMesh.tileSize = 32
    scene:CreateComponent("Navigable")
    navMesh.padding = Vector3(0.0, 10.0, 0.0)
    navMesh:Build()

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 50.0, 0.0)
        return camNode
    end
    return nil
end

--- 射线检测
-- @param maxDistance number
-- @return Vector3|nil hitPos
-- @return Drawable|nil hitDrawable
function M.Raycast(maxDistance)
    local pos = ui.cursorPosition
    if not ui.cursor.visible or ui:GetElementAt(pos, true) ~= nil then
        return nil, nil
    end
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

--- 设置目标点或瞬移
function M.SetPathPoint()
    local hitPos, hitDrawable = M.Raycast(250.0)
    local navMesh = scene:GetComponent("NavigationMesh")
    if hitPos ~= nil and navMesh ~= nil then
        local pathPos = navMesh:FindNearestPoint(hitPos, Vector3(1.0, 1.0, 1.0))
        if input:GetQualifierDown(QUAL_SHIFT) then
            M.currentPath = {}
            M.jackNode:LookAt(Vector3(pathPos.x, M.jackNode.position.y, pathPos.z), Vector3(0, 1, 0))
            M.jackNode.position = pathPos
        else
            M.endPos = pathPos
            M.currentPath = navMesh:FindPath(M.jackNode.position, M.endPos)
        end
    end
end

--- 添加或移除障碍物
function M.AddOrRemoveObject()
    if M.useStreaming then return end
    local hitPos, hitDrawable = M.Raycast(250.0)
    local navMesh = scene:GetComponent("NavigationMesh")
    if hitPos ~= nil and hitDrawable ~= nil and navMesh ~= nil then
        local updateBox = BoundingBox()
        local hitNode = hitDrawable.node
        if hitNode.name == "Mushroom" then
            updateBox = hitDrawable.worldBoundingBox
            hitNode:Remove()
        else
            local newNode = scene:CreateChild("Mushroom")
            newNode.position = hitPos
            newNode.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
            newNode:SetScale(2.0 + math.random() * 0.5)
            local obj = newNode:CreateComponent("StaticModel")
            obj.model = cache:GetResource("Model", "Models/Mushroom.mdl")
            obj.material = cache:GetResource("Material", "Materials/Mushroom.xml")
            obj.castShadows = true
            updateBox = obj.worldBoundingBox
        end
        navMesh:Build(updateBox)
        if #M.currentPath > 0 then
            M.currentPath = navMesh:FindPath(M.jackNode.position, M.endPos)
        end
    end
end

--- 沿路径移动 Jack
-- @param timeStep number
function M.FollowPath(timeStep)
    if #M.currentPath > 0 then
        local nextWaypoint = M.currentPath[1]
        local move = 5.0 * timeStep
        local distance = (M.jackNode.position - nextWaypoint):Length()
        if move > distance then move = distance end
        M.jackNode:LookAt(nextWaypoint, Vector3(0, 1, 0))
        M.jackNode:Translate(Vector3(0, 0, 1) * move)
        if distance < 0.1 then
            table.remove(M.currentPath, 1)
        end
    end
end

--- 切换流式加载
-- @param enabled boolean
function M.ToggleStreaming(enabled)
    local navMesh = scene:GetComponent("NavigationMesh")
    if navMesh == nil then return end
    if enabled then
        local maxTiles = (2 * M.STREAMING_DISTANCE + 1) * (2 * M.STREAMING_DISTANCE + 1)
        local boundingBox = navMesh.boundingBox
        M.SaveNavigationData()
        navMesh:Allocate(boundingBox, maxTiles)
    else
        navMesh:Build()
    end
end

--- 保存导航数据
function M.SaveNavigationData()
    local navMesh = scene:GetComponent("NavigationMesh")
    if navMesh == nil then return end
    M.navigationTilesData = {}
    M.navigationTilesIdx = {}
    M.addedTiles = {}
    local numTiles = navMesh.numTiles
    for z = 0, numTiles.y - 1 do
        for x = 0, numTiles.x - 1 do
            local idx = IntVector2(x, z)
            table.insert(M.navigationTilesData, navMesh:GetTileData(idx))
            table.insert(M.navigationTilesIdx, idx)
        end
    end
end

--- 更新流式加载的瓦片
function M.UpdateStreaming()
    local navMesh = scene:GetComponent("NavigationMesh")
    if navMesh == nil then return end
    local jackTile = navMesh:GetTileIndex(M.jackNode.worldPosition)
    local beginTile = IntVector2(
        math.max(0, jackTile.x - M.STREAMING_DISTANCE),
        math.max(0, jackTile.y - M.STREAMING_DISTANCE)
    )
    local endTile = IntVector2(
        math.min(jackTile.x + M.STREAMING_DISTANCE, navMesh.numTiles.x - 1),
        math.min(jackTile.y + M.STREAMING_DISTANCE, navMesh.numTiles.y - 1)
    )

    -- 移除不再需要的瓦片
    local i = 1
    while i <= #M.addedTiles do
        local tile = M.addedTiles[i]
        if tile.x >= beginTile.x and tile.x <= endTile.x and tile.y >= beginTile.y and tile.y <= endTile.y then
            i = i + 1
        else
            table.remove(M.addedTiles, i)
            navMesh:RemoveTile(tile)
        end
    end

    -- 添加需要的瓦片
    for z = beginTile.y, endTile.y do
        for x = beginTile.x, endTile.x do
            local idx = IntVector2(x, z)
            if not navMesh:HasTile(idx) then
                for k, storedIdx in ipairs(M.navigationTilesIdx) do
                    if storedIdx.x == idx.x and storedIdx.y == idx.y then
                        table.insert(M.addedTiles, idx)
                        navMesh:AddTile(M.navigationTilesData[k])
                        break
                    end
                end
            end
        end
    end
end

return M
