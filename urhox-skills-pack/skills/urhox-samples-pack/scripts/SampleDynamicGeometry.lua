--- DynamicGeometry 动态几何示例模块
-- 提取自官方示例 34_DynamicGeometry，演示运行时顶点数据修改与程序化创建 Model。
--
-- @module SampleDynamicGeometry

local M = {}

--- 是否启用动画
M.animate = true

--- 动画时间
M.animTime = 0.0

--- 原始顶点数据（VectorBuffer）
M.originalVertexData = nil

--- 正在动画化的顶点缓冲区列表
M.animatingBuffers = {}

--- 原始顶点位置列表
M.originalVertices = {}

--- 重复顶点映射表
M.vertexDuplicates = {}

--- 构建动态几何场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateDynamicGeometryScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- Zone
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.fogColor = Color(0.2, 0.2, 0.2)
    zone.fogStart = 200.0
    zone.fogEnd = 300.0

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(-0.6, -1.0, -0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.color = Color(0.4, 1.0, 0.4)
    light.specularIntensity = 1.5

    -- 原始模型与顶点
    local originalModel = cache:GetResource("Model", "Models/Box.mdl")
    if originalModel == nil then return nil end
    local buffer = originalModel:GetGeometry(0, 0).vertexBuffers[0]
    M.originalVertexData = buffer:GetData()
    local numVertices = buffer.vertexCount
    local vertexSize = buffer.vertexSize
    for i = 0, numVertices - 1 do
        M.originalVertexData:Seek(i * vertexSize)
        table.insert(M.originalVertices, M.originalVertexData:ReadVector3())
    end

    -- 查找重复顶点
    for i = 1, #M.originalVertices do
        M.vertexDuplicates[i] = i
        for j = 1, i - 1 do
            if M.originalVertices[i]:Equals(M.originalVertices[j]) then
                M.vertexDuplicates[i] = j
                break
            end
        end
    end

    -- 克隆并创建 3x3 动画模型网格
    for y = -1, 1 do
        for x = -1, 1 do
            local node = scene:CreateChild("Object")
            node.position = Vector3(x * 2.0, 0.0, y * 2.0)
            local obj = node:CreateComponent("StaticModel")
            local cloneModel = originalModel:Clone()
            obj.model = cloneModel
            table.insert(M.animatingBuffers, cloneModel:GetGeometry(0, 0).vertexBuffers[0])
        end
    end

    -- 从零创建金字塔模型
    do
        local numVertices = 18
        local vertexData = {
            0.0, 0.5, 0.0,   0.0, 0.0, 0.0,
            0.5, -0.5, 0.5,   0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
            0.0, 0.5, 0.0,   0.0, 0.0, 0.0,
            -0.5, -0.5, 0.5,  0.0, 0.0, 0.0,
            0.5, -0.5, 0.5,   0.0, 0.0, 0.0,
            0.0, 0.5, 0.0,   0.0, 0.0, 0.0,
            -0.5, -0.5, -0.5, 0.0, 0.0, 0.0,
            -0.5, -0.5, 0.5,  0.0, 0.0, 0.0,
            0.0, 0.5, 0.0,   0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
            -0.5, -0.5, -0.5, 0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
            0.5, -0.5, 0.5,   0.0, 0.0, 0.0,
            -0.5, -0.5, 0.5,  0.0, 0.0, 0.0,
            0.5, -0.5, -0.5,  0.0, 0.0, 0.0,
            -0.5, -0.5, 0.5,  0.0, 0.0, 0.0,
            -0.5, -0.5, -0.5, 0.0, 0.0, 0.0,
        }
        local indexData = {
            0, 1, 2, 3, 4, 5, 6, 7, 8,
            9, 10, 11, 12, 13, 14, 15, 16, 17
        }

        for i = 0, numVertices - 1, 3 do
            local idx = i * 6
            local v1 = Vector3(vertexData[idx + 1], vertexData[idx + 2], vertexData[idx + 3])
            local v2 = Vector3(vertexData[idx + 7], vertexData[idx + 8], vertexData[idx + 9])
            local v3 = Vector3(vertexData[idx + 13], vertexData[idx + 14], vertexData[idx + 15])
            local edge1 = v1 - v2
            local edge2 = v1 - v3
            local normal = edge1:CrossProduct(edge2):Normalized()
            for j = 0, 2 do
                vertexData[idx + 4 + j * 6] = normal.x
                vertexData[idx + 5 + j * 6] = normal.y
                vertexData[idx + 6 + j * 6] = normal.z
            end
        end

        local fromScratchModel = Model()
        local vb = VertexBuffer()
        local ib = IndexBuffer()
        local geom = Geometry()

        vb.shadowed = true
        local elements = {}
        table.insert(elements, VertexElement(TYPE_VECTOR3, SEM_POSITION))
        table.insert(elements, VertexElement(TYPE_VECTOR3, SEM_NORMAL))
        vb:SetSize(numVertices, elements)
        local temp = VectorBuffer()
        for i = 1, numVertices * 6 do
            temp:WriteFloat(vertexData[i])
        end
        vb:SetData(temp)

        ib.shadowed = true
        ib:SetSize(numVertices, false)
        temp:Clear()
        for i = 1, numVertices do
            temp:WriteU16(indexData[i])
        end
        ib:SetData(temp)

        geom:SetVertexBuffer(0, vb)
        geom:SetIndexBuffer(ib)
        geom:SetDrawRange(TRIANGLE_LIST, 0, numVertices)

        fromScratchModel.numGeometries = 1
        fromScratchModel:SetGeometry(0, 0, geom)
        fromScratchModel.boundingBox = BoundingBox(Vector3(-0.5, -0.5, -0.5), Vector3(0.5, 0.5, 0.5))

        local vertexBuffers = { vb }
        local indexBuffers = { ib }
        local morphRangeStarts = { 0 }
        local morphRangeCounts = { 0 }
        fromScratchModel:SetVertexBuffers(vertexBuffers, morphRangeStarts, morphRangeCounts)
        fromScratchModel:SetIndexBuffers(indexBuffers)

        local node = scene:CreateChild("FromScratchObject")
        node.position = Vector3(0.0, 3.0, 0.0)
        local obj = node:CreateComponent("StaticModel")
        obj.model = fromScratchModel
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        local camera = camNode:CreateComponent("Camera")
        camera.farClip = 300.0
        camNode.position = Vector3(0.0, 2.0, -20.0)
        return camNode
    end
    return nil
end

--- 动画更新顶点数据
-- @param timeStep number
function M.AnimateObjects(timeStep)
    M.animTime = M.animTime + timeStep * 100.0
    for i, buffer in ipairs(M.animatingBuffers) do
        local startPhase = M.animTime + (i - 1) * 30.0
        local numVertices = buffer.vertexCount
        local vertexSize = buffer.vertexSize
        local newData = VectorBuffer()
        for j = 0, numVertices - 1 do
            local phase = startPhase + M.vertexDuplicates[j + 1] * 10.0
            local src = M.originalVertices[j + 1]
            local dest = Vector3(
                src.x * (1.0 + 0.1 * math.sin(phase)),
                src.y * (1.0 + 0.1 * math.sin(phase + 60.0)),
                src.z * (1.0 + 0.1 * math.sin(phase + 120.0))
            )
            newData:WriteVector3(dest)
            M.originalVertexData:Seek(j * vertexSize + 12)
            local k = 12
            while k < vertexSize do
                newData:WriteFloat(M.originalVertexData:ReadFloat())
                k = k + 4
            end
        end
        buffer:SetData(newData)
    end
end

return M
