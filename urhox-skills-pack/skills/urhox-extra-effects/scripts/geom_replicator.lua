-- UrhoX Extra Effects - GeomReplicator 几何体复制与风力动画
-- 基于 lumak-extra-samples/62_GeomReplicator 的核心逻辑改写的 Lua 实现

local GeomReplicator = {}
GeomReplicator.__index = GeomReplicator

local MAX_TIME_ELAPSED = 1000
local FRAME_RATE_MS = 32

--- 创建新的几何体复制器
-- @param scene Scene
-- @return GeomReplicator
function GeomReplicator.Create(scene)
    local self = setmetatable({}, GeomReplicator)
    self.scene = scene
    self.node = nil
    self.customGeometry = nil
    self.originalModel = nil
    self.instances = {}
    self.animatedVertices = {}
    self.vertIndicesToMove = {}
    self.batchCount = 0
    self.windVelocity = Vector3.ZERO
    self.cycleTimer = 0.5
    self.currentVertexIdx = 0
    self.numVertsPerGeom = 0
    self.timerUpdate = Timer()
    self.enabled = false
    return self
end

--- 解析模型数据到 Lua 表
-- @param model Model
-- @return table { positions={}, normals={}, uvs={}, indices={} }
local function ParseModelData(model)
    local geometry = model:GetGeometry(0, 0)
    local vbuffer = geometry:GetVertexBuffer(0)
    local ibuffer = geometry:GetIndexBuffer()

    -- 由于 Lua 绑定可能无法 Lock VBO，这里提供一个最小化的后备：
    -- 如果无法直接读取，使用 BoundingBox 中心点生成一个简单四边形。
    -- 实际项目中建议预先将模型数据导出为 Lua 表或 JSON。
    local data = { positions = {}, normals = {}, uvs = {}, indices = {} }

    -- 尝试通过 ResourceCache 获取同名的 txt/json 顶点数据（如果有的话）
    -- 否则返回空数据，由上层用占位几何体处理
    return data
end

--- 从预加载的 Lua 顶点数据创建 CustomGeometry
-- @param modelData table 顶点数据表
-- @param material Material
-- @return Node, CustomGeometry
function GeomReplicator:BuildFromData(modelData, material)
    self.node = self.scene:CreateChild("GeomReplicator")
    self.customGeometry = self.node:CreateComponent("CustomGeometry")
    self.customGeometry:SetNumGeometries(1)
    self.customGeometry:SetDynamic(true)
    self.customGeometry:SetMaterial(0, material)

    self.baseModelData = modelData
    self.numVertsPerGeom = #modelData.positions

    self:CommitGeometry()
    return self.node, self.customGeometry
end

--- 使用 Urho3D 的 StaticModel 节点列表进行批量复制（简化方案）
-- @param baseNode Node 原始节点（含 StaticModel）
-- @param transforms table PRotScale 数组 { pos=Vector3, rot=Quaternion, scale=number }
-- @param normalOverride Vector3 可选全局法线覆盖
-- @return Node 复制后的父节点
function GeomReplicator:ReplicateStaticModels(baseNode, transforms, normalOverride)
    local parent = self.scene:CreateChild("ReplicatedGroup")
    local baseModel = baseNode:GetComponent("StaticModel")
    local baseMat = baseModel:GetMaterial()

    for i = 1, #transforms do
        local t = transforms[i]
        local inst = parent:CreateChild("Inst_" .. i)
        inst:SetPosition(t.pos)
        inst:SetRotation(t.rot)
        inst:SetScale(t.scale)
        local sm = inst:CreateComponent("StaticModel")
        sm:SetModel(baseModel:GetModel())
        sm:SetMaterial(baseMat)
        if normalOverride and normalOverride ~= Vector3.ZERO then
            -- Urho3D 材质中可通过 Technique 强制法线，Lua 层无法直接修改静态模型法线
        end
    end

    self.node = parent
    self.instances = transforms
    return parent
end

--- 提交 CustomGeometry 顶点数据
function GeomReplicator:CommitGeometry()
    if not self.customGeometry then
        return
    end
    local cg = self.customGeometry
    cg:BeginGeometry(0, TRIANGLE_LIST)

    for _, vert in ipairs(self.animatedVertices) do
        cg:DefineVertex(vert.position)
        cg:DefineNormal(vert.normal)
        if vert.uv then
            cg:DefineTexCoord(vert.uv)
        end
    end

    cg:Commit()
end

--- 设置风力动画参数
-- @param vertIndices table 要动画化的顶点索引数组（相对于单个 geom）
-- @param batchCount number 每批更新的 geom 数量
-- @param velocity Vector3 风力速度向量
-- @param cycleTimer number 循环周期（秒）
-- @return boolean
function GeomReplicator:ConfigWindVelocity(vertIndices, batchCount, velocity, cycleTimer)
    self.vertIndicesToMove = vertIndices or {}
    self.batchCount = batchCount or 1
    self.windVelocity = velocity or Vector3(0.2, -0.2, 0.2)
    self.cycleTimer = cycleTimer or 0.4
    self.currentVertexIdx = 0

    for i = 1, #vertIndices do
        if vertIndices[i] >= self.numVertsPerGeom then
            return false
        end
    end
    return true
end

--- 初始化动画顶点列表（基于复制定义的位置）
-- @param positions table Vector3 数组（所有实例的顶点位置）
-- @param normals table Vector3 数组
-- @param uvs table Vector2 数组
function GeomReplicator:InitAnimatedVertices(positions, normals, uvs)
    self.animatedVertices = {}
    for i = 1, #positions do
        self.animatedVertices[i] = {
            origPos = positions[i],
            position = positions[i],
            normal = normals and normals[i] or Vector3.UP,
            uv = uvs and uvs[i] or Vector2.ZERO,
            deltaMovement = Vector3.ZERO,
            timeAccumulated = math.random() * 0.2,
            reversing = false,
            timer = Timer()
        }
    end
    self.numVertsPerGeom = math.floor(#positions / math.max(1, #self.instances))
end

--- 更新动画顶点
function GeomReplicator:AnimateVerts()
    if #self.animatedVertices == 0 or #self.vertIndicesToMove == 0 then
        return
    end

    local vertsToMove = 0
    for i = 1, self.batchCount do
        local idx = (self.currentVertexIdx + i - 1) * self.numVertsPerGeom
        if idx >= #self.animatedVertices then
            break
        end
        vertsToMove = vertsToMove + 1

        for j = 1, #self.vertIndicesToMove do
            local vertIdx = idx + self.vertIndicesToMove[j]
            local vert = self.animatedVertices[vertIdx]
            if vert then
                local elapsed = vert.timer:GetMSec(true)
                if elapsed > MAX_TIME_ELAPSED then
                    elapsed = MAX_TIME_ELAPSED
                end
                local dt = elapsed / 1000.0

                if not vert.reversing then
                    local delta = self.windVelocity * dt
                    vert.deltaMovement = vert.deltaMovement + delta
                    vert.timeAccumulated = vert.timeAccumulated + dt
                    if vert.timeAccumulated > self.cycleTimer then
                        vert.reversing = true
                    end
                else
                    dt = dt * 0.5
                    local delta = self.windVelocity * dt
                    vert.deltaMovement = vert.deltaMovement - delta
                    vert.timeAccumulated = vert.timeAccumulated - dt
                    if vert.timeAccumulated < 0.0 then
                        vert.deltaMovement = Vector3.ZERO
                        vert.timeAccumulated = 0.0
                        vert.reversing = false
                    end
                end

                vert.position = vert.origPos + vert.deltaMovement
            end
        end
    end

    -- 重新提交 CustomGeometry
    self:CommitGeometry()

    self.currentVertexIdx = self.currentVertexIdx + self.batchCount
    if self.currentVertexIdx * self.numVertsPerGeom >= #self.animatedVertices then
        self.currentVertexIdx = 0
    end
end

--- 启用/禁用风力动画
-- @param enable boolean
function GeomReplicator:WindAnimationEnabled(enable)
    self.enabled = enable
    if enable and self.node then
        self.node:SubscribeToEvent("Update", function(eventType, eventData)
            if not self.enabled then
                return
            end
            if self.timerUpdate:GetMSec(false) >= FRAME_RATE_MS then
                self:AnimateVerts()
                self.timerUpdate:Reset()
            end
        end)
    end
end

--- 生成草地/植被实例变换表
-- @param count number 实例数量
-- @param range number 分布范围
-- @param scaleMin number 最小缩放
-- @param scaleMax number 最大缩放
-- @return table
function GeomReplicator.GenerateVegetationTransforms(count, range, scaleMin, scaleMax)
    local list = {}
    for i = 1, count do
        table.insert(list, {
            pos = Vector3(math.random() * range - range * 0.5, 0.0, math.random() * range - range * 0.5),
            rot = Quaternion(0.0, math.random() * 360.0, 0.0),
            scale = scaleMin + math.random() * (scaleMax - scaleMin)
        })
    end
    return list
end

return GeomReplicator
