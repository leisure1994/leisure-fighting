-- UrhoX LightProbe 光照探针管理器
-- 基于 lumak-lightprobe 的 SH 系数核心逻辑改写的纯 Lua 实现

local LightProbeManager = {}
LightProbeManager.__index = LightProbeManager

-- 数学常量
local C0  = 0.282095
local C1  = 0.488603
local C2  = 1.092548
local C3  = 0.315392
local C33 = 0.315392 * 3.0
local C4  = 0.546274
local FOUR_PI = 12.5663706143592
local FIXED_IMAGE_SIZE = 32
local EPSILON = 0.00001

--- 计算二维向量叉积的绝对值
-- @param a Vector2
-- @param b Vector2
-- @return number
local function CrossProduct2D(a, b)
    return math.abs(a.x * b.y - a.y * b.x)
end

--- 计算重心坐标
-- @param v0 Vector2
-- @param v1 Vector2
-- @param v2 Vector2
-- @param vp Vector2
-- @return Vector3
local function Barycentric(v0, v1, v2, vp)
    local e0 = v0 - vp
    local e1 = v1 - vp
    local e2 = v2 - vp
    local area = CrossProduct2D(v1 - v0, v2 - v0)
    if area > EPSILON then
        local a0 = CrossProduct2D(e1, e2) / area
        local a1 = CrossProduct2D(e2, e0) / area
        local a2 = CrossProduct2D(e0, e1) / area
        return Vector3(a0, a1, a2)
    end
    return Vector3(1, 1, 1)
end

--- 判断重心坐标是否在三角形内
-- @param bary Vector3
-- @return boolean
local function BaryInsideTriangle(bary)
    return (bary.x + bary.y + bary.z) < (1.0 + EPSILON)
end

--- 根据法线获取 Cubemap 面索引（0=+X, 1=-X, 2=+Y, 3=-Y, 4=+Z, 5=-Z）
-- @param normal Vector3
-- @return number
local function GetCubefaceFromNormal(normal)
    local faces = {
        Vector3.RIGHT,
        Vector3.LEFT,
        Vector3.UP,
        Vector3.DOWN,
        Vector3.FORWARD,
        Vector3.BACK
    }
    for i = 1, 6 do
        if normal:DotProduct(faces[i]) > 1.0 - 0.001 then
            return i - 1
        end
    end
    return 0
end

--- 更新 SH 系数
-- @param vcol Vector3 颜色值
-- @param v Vector3 单位方向向量
-- @param coeffVec table 系数数组（长度为9，每个元素为 Vector3）
local function UpdateCoeffs(vcol, v, coeffVec)
    coeffVec[1] = coeffVec[1] + vcol * C0
    coeffVec[2] = coeffVec[2] + vcol * (C1 * v.y)
    coeffVec[3] = coeffVec[3] + vcol * (C1 * v.z)
    coeffVec[4] = coeffVec[4] + vcol * (C1 * v.x)
    coeffVec[5] = coeffVec[5] + vcol * (C2 * v.x * v.y)
    coeffVec[6] = coeffVec[6] + vcol * (C2 * v.y * v.z)
    coeffVec[7] = coeffVec[7] + vcol * (C33 * v.z * v.z - C3)
    coeffVec[8] = coeffVec[8] + vcol * (C2 * v.x * v.z)
    coeffVec[9] = coeffVec[9] + vcol * (C4 * (v.x * v.x - v.y * v.y))
end

--- 获取 Cubemap 某个面的图像
-- @param cache ResourceCache
-- @param basePath string Cubemap 基础路径
-- @param faceIdx number 面索引 0-5
-- @return Image
local function GetCubemapFaceImage(cache, basePath, faceIdx)
    local suffixes = { "PosX", "NegX", "PosY", "NegY", "PosZ", "NegZ" }
    local path = basePath .. "_" .. suffixes[faceIdx + 1] .. ".png"
    return cache:GetResource("Image", path)
end

--- 创建一个新的光照探针管理器
-- @param scene Scene
-- @return LightProbeManager
function LightProbeManager.Create(scene)
    local self = setmetatable({}, LightProbeManager)
    self.scene = scene
    self.probes = {}      -- 探针列表 { node=Node, coeffs=table }
    self.sphericalDataCache = nil  -- 静态几何采样缓存
    self.captureQueue = {} -- 捕获任务队列
    self.captureState = 0  -- 0=idle, 1-6=capturing faces
    self.worldPreScaler = 100.0
    return self
end

--- 设置单位立方体几何数据，用于球面采样
-- @param cache ResourceCache
-- @return boolean
function LightProbeManager:SetupUnitBoxGeom(cache)
    if self.sphericalDataCache and #self.sphericalDataCache > 0 then
        return true
    end

    local model = cache:GetResource("Model", "Models/Box.mdl")
    if not model then
        return false
    end

    local geometry = model:GetGeometry(0, 0)
    local vbuffer = geometry:GetVertexBuffer(0)
    local ibuffer = geometry:GetIndexBuffer()

    local elementMask = vbuffer:GetElementMask()
    local vertexSize = vbuffer:GetVertexSize()
    local numVertices = vbuffer:GetVertexCount()

    local geomData = {}
    local indexBuff = {}

    -- 读取顶点数据（Lua 绑定通常提供 GetVertexData 或 Lock/Unlock 接口）
    -- 注意：Urho3D Lua 绑定中 VertexBuffer 可能没有 Lock 方法。
    -- 这里使用 Model 的通用查询接口，若不可用则退化为标准 Box UV 映射。
    -- 为了兼容性，我们用硬编码的 6 个面（每个面 2 个三角形）作为后备方案。

    -- 后备方案：标准立方体的面定义（PosX, NegX, PosY, NegY, PosZ, NegZ）
    -- 每个面 4 个顶点，2 个三角形
    local boxFaces = {
        -- PosX (Right)
        {
            { pos = Vector3( 0.5, -0.5,  0.5), normal = Vector3.RIGHT, uv = Vector2(0,1) },
            { pos = Vector3( 0.5,  0.5,  0.5), normal = Vector3.RIGHT, uv = Vector2(0,0) },
            { pos = Vector3( 0.5,  0.5, -0.5), normal = Vector3.RIGHT, uv = Vector2(1,0) },
            { pos = Vector3( 0.5, -0.5, -0.5), normal = Vector3.RIGHT, uv = Vector2(1,1) },
        },
        -- NegX (Left)
        {
            { pos = Vector3(-0.5, -0.5, -0.5), normal = Vector3.LEFT, uv = Vector2(0,1) },
            { pos = Vector3(-0.5,  0.5, -0.5), normal = Vector3.LEFT, uv = Vector2(0,0) },
            { pos = Vector3(-0.5,  0.5,  0.5), normal = Vector3.LEFT, uv = Vector2(1,0) },
            { pos = Vector3(-0.5, -0.5,  0.5), normal = Vector3.LEFT, uv = Vector2(1,1) },
        },
        -- PosY (Up)
        {
            { pos = Vector3(-0.5,  0.5,  0.5), normal = Vector3.UP, uv = Vector2(0,1) },
            { pos = Vector3(-0.5,  0.5, -0.5), normal = Vector3.UP, uv = Vector2(0,0) },
            { pos = Vector3( 0.5,  0.5, -0.5), normal = Vector3.UP, uv = Vector2(1,0) },
            { pos = Vector3( 0.5,  0.5,  0.5), normal = Vector3.UP, uv = Vector2(1,1) },
        },
        -- NegY (Down)
        {
            { pos = Vector3(-0.5, -0.5, -0.5), normal = Vector3.DOWN, uv = Vector2(0,1) },
            { pos = Vector3(-0.5, -0.5,  0.5), normal = Vector3.DOWN, uv = Vector2(0,0) },
            { pos = Vector3( 0.5, -0.5,  0.5), normal = Vector3.DOWN, uv = Vector2(1,0) },
            { pos = Vector3( 0.5, -0.5, -0.5), normal = Vector3.DOWN, uv = Vector2(1,1) },
        },
        -- PosZ (Forward)
        {
            { pos = Vector3(-0.5, -0.5,  0.5), normal = Vector3.FORWARD, uv = Vector2(0,1) },
            { pos = Vector3(-0.5,  0.5,  0.5), normal = Vector3.FORWARD, uv = Vector2(0,0) },
            { pos = Vector3( 0.5,  0.5,  0.5), normal = Vector3.FORWARD, uv = Vector2(1,0) },
            { pos = Vector3( 0.5, -0.5,  0.5), normal = Vector3.FORWARD, uv = Vector2(1,1) },
        },
        -- NegZ (Back)
        {
            { pos = Vector3( 0.5, -0.5, -0.5), normal = Vector3.BACK, uv = Vector2(0,1) },
            { pos = Vector3( 0.5,  0.5, -0.5), normal = Vector3.BACK, uv = Vector2(0,0) },
            { pos = Vector3(-0.5,  0.5, -0.5), normal = Vector3.BACK, uv = Vector2(1,0) },
            { pos = Vector3(-0.5, -0.5, -0.5), normal = Vector3.BACK, uv = Vector2(1,1) },
        },
    }

    self.sphericalDataCache = {}
    local texSize = FIXED_IMAGE_SIZE
    local texSizeInvX = 1.0 / texSize
    local texSizeInvY = 1.0 / texSize

    for faceIdx = 1, 6 do
        local face = boxFaces[faceIdx]
        -- 两个三角形: 0-1-2 和 0-2-3
        local tris = { {0,1,2}, {0,2,3} }
        for _, tri in ipairs(tris) do
            local i0, i1, i2 = tri[1], tri[2], tri[3]
            local v0 = face[i0].pos
            local v1 = face[i1].pos
            local v2 = face[i2].pos
            local n0 = face[i0].normal
            local uv0 = face[i0].uv
            local uv1 = face[i1].uv
            local uv2 = face[i2].uv

            local xMin = math.min(uv0.x, uv1.x, uv2.x)
            local xMax = math.max(uv0.x, uv1.x, uv2.x)
            local yMin = math.min(uv0.y, uv1.y, uv2.y)
            local yMax = math.max(uv0.y, uv1.y, uv2.y)

            local pixMinX = math.max(math.floor(xMin * texSize) - 1, 0)
            local pixMaxX = math.min(math.ceil(xMax * texSize) + 1, texSize - 1)
            local pixMinY = math.max(math.floor(yMin * texSize) - 1, 0)
            local pixMaxY = math.min(math.ceil(yMax * texSize) + 1, texSize - 1)

            local faceName = faceIdx - 1

            for x = pixMinX, pixMaxX do
                for y = pixMinY, pixMaxY do
                    local bary = Barycentric(uv0, uv1, uv2, Vector2(x * texSizeInvX, y * texSizeInvY))
                    if BaryInsideTriangle(bary) then
                        local normal = (bary.x * v0 + bary.y * v1 + bary.z * v2):Normalized()
                        table.insert(self.sphericalDataCache, {
                            x = x,
                            y = y,
                            face = faceName,
                            normal = normal
                        })
                    end
                end
            end
        end
    end

    return true
end

--- 计算一组 Cubemap 图像的 SH 系数
-- @param cubeImages table 长度为6的 Image 数组
-- @return table 长度为9的 Vector3 数组
function LightProbeManager:CalculateSH(cubeImages)
    if not self.sphericalDataCache or #self.sphericalDataCache == 0 then
        return nil
    end

    local coeffVec = {}
    for i = 1, 9 do
        coeffVec[i] = Vector3(0, 0, 0)
    end

    for _, sd in ipairs(self.sphericalDataCache) do
        local faceIdx = sd.face + 1 -- Lua 1-based
        local img = cubeImages[faceIdx]
        if img then
            local pixel = img:GetPixel(sd.x, sd.y)
            local vcol = Vector3(pixel.r, pixel.g, pixel.b)
            UpdateCoeffs(vcol, sd.normal, coeffVec)
        end
    end

    local factor = FOUR_PI / #self.sphericalDataCache
    for i = 1, 9 do
        coeffVec[i] = coeffVec[i] * factor
    end

    return coeffVec
end

--- 从 XML 加载已有 Cubemap
-- @param cache ResourceCache
-- @param xmlPath string Cubemap XML 路径
-- @return TextureCube
function LightProbeManager:LoadCubemap(cache, xmlPath)
    return cache:GetResource("TextureCube", xmlPath)
end

--- 从 PNG 文件列表加载 Cubemap 的 6 个面图像
-- @param cache ResourceCache
-- @param basePath string 基础路径（不含 _PosX.png 后缀）
-- @return table Image 数组（6个面）
function LightProbeManager:LoadCubemapImages(cache, basePath)
    local images = {}
    for i = 0, 5 do
        local img = GetCubemapFaceImage(cache, basePath, i)
        if not img then
            return nil
        end
        table.insert(images, img)
    end
    return images
end

--- 手动捕获场景 Cubemap（创建临时 Camera + Viewport）
-- @param position Vector3 探针位置
-- @param size number 图像尺寸，默认 32
-- @param onComplete function(images) 完成回调，传入6张 Image
function LightProbeManager:CaptureCubemap(position, size, onComplete)
    size = size or FIXED_IMAGE_SIZE
    self.capturePosition = position
    self.captureSize = size
    self.captureImages = {}
    self.captureCallback = onComplete
    self.captureState = 1

    local renderer = self.scene:GetApplication():GetSubsystem("Renderer")
    -- 若无法获取 Renderer，回退到直接完成
    if not renderer then
        self.captureState = 0
        if onComplete then onComplete({}) end
        return
    end

    -- 保存原始视图用于复制 RenderPath
    local origViewport = renderer:GetViewport(0)
    local renderPath = nil
    if origViewport then
        renderPath = origViewport:GetRenderPath()
    end

    -- 创建临时 Camera 节点
    self.captureCamNode = self.scene:CreateChild("__LightProbeCam")
    self.captureCamNode:SetWorldPosition(position)
    local camera = self.captureCamNode:CreateComponent("Camera")
    camera:SetFov(90.0)
    camera:SetNearClip(0.0001)
    camera:SetAspectRatio(1.0)

    -- 创建临时渲染纹理
    self.captureRenderTex = Texture2D:new()
    self.captureRenderTex:SetSize(size, size, Graphics:GetRGBAFormat(), TEXTURE_RENDERTARGET)
    local surface = self.captureRenderTex:GetRenderSurface()

    -- 创建视口
    local viewport = Viewport:new(self.scene, camera)
    if renderPath then
        viewport:SetRenderPath(renderPath)
    end
    surface:SetViewport(0, viewport)
    surface:SetUpdateMode(SURFACE_UPDATEALWAYS)

    self.captureCamera = camera
    self.captureViewport = viewport
    self.captureSurface = surface
    self.captureRenderer = renderer

    -- 订阅事件，分6帧完成
    self.scene:GetApplication():SubscribeToEvent("Update", function(eventType, eventData)
        self:HandleCaptureUpdate(eventType, eventData)
    end)
end

--- 每帧处理 Cubemap 捕获
-- @param eventType StringHash
-- @param eventData VariantMap
function LightProbeManager:HandleCaptureUpdate(eventType, eventData)
    if self.captureState < 1 or self.captureState > 6 then
        return
    end

    local face = self.captureState - 1
    local rot = Quaternion.IDENTITY
    if face == 0 then rot = Quaternion(0, 90, 0)
    elseif face == 1 then rot = Quaternion(0, -90, 0)
    elseif face == 2 then rot = Quaternion(-90, 0, 0)
    elseif face == 3 then rot = Quaternion(90, 0, 0)
    elseif face == 4 then rot = Quaternion(0, 0, 0)
    elseif face == 5 then rot = Quaternion(0, 180, 0)
    end

    self.captureCamNode:SetWorldRotation(rot)

    -- 等待一帧渲染后读取像素
    -- 由于 SURFACE_UPDATEALWAYS，本帧结束时已经渲染完成
    -- 我们在下一帧开始时保存上一帧的结果，所以在 state 进入下一面之前保存
    if face > 0 then
        local prevFace = face - 1
        local img = self.captureRenderTex:GetImage()
        if img then
            self.captureImages[prevFace + 1] = img
        end
    end

    self.captureState = self.captureState + 1

    if self.captureState > 6 then
        -- 保存最后一面
        local img = self.captureRenderTex:GetImage()
        if img then
            self.captureImages[6] = img
        end

        -- 清理临时资源
        self.captureCamNode:Remove()
        self.captureCamNode = nil
        self.captureRenderTex = nil
        self.captureCamera = nil
        self.captureViewport = nil
        self.captureSurface = nil

        self.captureState = 0
        if self.captureCallback then
            self.captureCallback(self.captureImages)
            self.captureCallback = nil
        end

        -- 取消事件订阅。由于匿名函数无法直接 Unsubscribe，
        -- 这里通过将 captureState 置 0 避免再次执行。
    end
end

--- 在场景中放置一个光照探针节点
-- @param position Vector3 探针位置
-- @param name string 可选节点名
-- @return Node 探针节点
function LightProbeManager:PlaceProbe(position, name)
    local node = self.scene:CreateChild(name or "LightProbe")
    node:SetWorldPosition(position)
    return node
end

--- 为节点生成 SH 系数（基于已有 Cubemap 图像）
-- @param node Node 探针节点
-- @param cubeImages table 6张 Image
function LightProbeManager:GenerateProbeSH(node, cubeImages)
    local coeffs = self:CalculateSH(cubeImages)
    if coeffs then
        self.probes[node] = { node = node, coeffs = coeffs }
    end
end

--- 为节点生成 SH 系数（基于 Cubemap 基础路径）
-- @param node Node 探针节点
-- @param cache ResourceCache
-- @param basePath string Cubemap 基础路径
function LightProbeManager:GenerateProbeSHFromPath(node, cache, basePath)
    local images = self:LoadCubemapImages(cache, basePath)
    if images then
        self:GenerateProbeSH(node, images)
    end
end

--- 获取指定节点的 SH 系数
-- @param node Node 探针节点
-- @return table 长度为9的 Vector3 数组，若不存在返回 nil
function LightProbeManager:GetProbeSH(node)
    local probe = self.probes[node]
    if probe then
        return probe.coeffs
    end
    return nil
end

--- 将 SH 系数应用到材质的自定义 shader 参数
-- @param material Material
-- @param coeffs table 长度为9的 Vector3 数组
-- @param prefix string Uniform 前缀，默认 "SH"
function LightProbeManager:ApplySHToMaterial(material, coeffs, prefix)
    prefix = prefix or "SH"
    for i = 1, 9 do
        local c = coeffs[i]
        material:SetShaderParameter(prefix .. tostring(i - 1), Vector4(c.x, c.y, c.z, 1.0))
    end
end

--- 设置对象的材质为支持光照探针的着色器（需要外部提供 Technique）
-- @param staticModel StaticModel
-- @param techniquePath string Technique 资源路径
-- @param cache ResourceCache
function LightProbeManager:SetProbeTechnique(staticModel, techniquePath, cache)
    local mat = staticModel:GetMaterial()
    if not mat then
        mat = Material:new()
        staticModel:SetMaterial(mat)
    end
    local tech = cache:GetResource("Technique", techniquePath)
    if tech then
        mat:SetTechnique(0, tech)
    end
end

--- 混合多个探针的 SH 系数（基于距离权重）
-- @param position Vector3 查询位置
-- @return table 混合后的长度为9的 Vector3 数组
function LightProbeManager:BlendProbesAt(position)
    if #self.probes == 0 then
        return nil
    end

    -- 收集所有探针及其距离
    local list = {}
    for _, probe in pairs(self.probes) do
        local dist = (probe.node:GetWorldPosition() - position):Length()
        table.insert(list, { probe = probe, dist = dist })
    end

    -- 按距离排序，取最近4个
    table.sort(list, function(a, b) return a.dist < b.dist end)

    local count = math.min(4, #list)
    local totalWeight = 0.0
    for i = 1, count do
        local d = list[i].dist
        -- 防止除零，使用 1/(d+epsilon)
        list[i].weight = 1.0 / (d + 0.001)
        totalWeight = totalWeight + list[i].weight
    end

    local result = {}
    for i = 1, 9 do
        result[i] = Vector3(0, 0, 0)
    end

    for i = 1, count do
        local w = list[i].weight / totalWeight
        local coeffs = list[i].probe.coeffs
        for j = 1, 9 do
            result[j] = result[j] + coeffs[j] * w
        end
    end

    return result
end

--- 将当前所有探针的 SH 数据写入一张 1D 纹理图像（供 GPU 查找）
-- @param outputPath string 输出 PNG 路径
function LightProbeManager:WriteSHTableImage(outputPath)
    local probeList = {}
    for _, probe in pairs(self.probes) do
        table.insert(probeList, probe)
    end

    if #probeList == 0 then
        return false
    end

    local width = 1
    while width < #probeList * 9 do
        width = width * 2
    end

    local image = Image:new()
    image:SetSize(width, 1, 4)

    for i = 1, #probeList do
        local coeffs = probeList[i].coeffs
        for j = 1, 9 do
            local c = coeffs[j]
            -- 归一化到 [0,1]：c * 0.1 + 0.5
            local r = math.min(math.max(c.x * 0.1 + 0.5, 0.0), 1.0)
            local g = math.min(math.max(c.y * 0.1 + 0.5, 0.0), 1.0)
            local b = math.min(math.max(c.z * 0.1 + 0.5, 0.0), 1.0)
            image:SetPixel((i - 1) * 9 + (j - 1), 0, Color(r, g, b, 1.0))
        end
    end

    image:SavePNG(outputPath)
    return true
end

--- 将世界坐标编码为 Color（可用于 GI 位置查找）
-- @param wpos Vector3
-- @return Vector4
function LightProbeManager:WorldPositionToColor(wpos)
    local wpos4 = Vector4(wpos.x, wpos.y, wpos.z, 1.0) * (1.0 / self.worldPreScaler)
    local convColor = Vector4(wpos4.x, wpos4.y, wpos4.z, wpos4.w)
    local incrFactor = 0

    while math.abs(convColor.x) > 1.0 or math.abs(convColor.y) > 1.0 or math.abs(convColor.z) > 1.0 do
        if incrFactor + 5 > 255 then
            return Vector4(1.0, 0.0, 0.0, 1.0)
        end
        incrFactor = incrFactor + 5
        convColor = wpos4 * (1.0 - (incrFactor - 1.0) / 255.0)
    end

    if incrFactor == 0 then
        convColor.w = 1.0
    else
        convColor.w = 1.0 - (incrFactor - 1.0) / 255.0
    end

    return convColor
end

--- 获取当前探针数量
-- @return number
function LightProbeManager:GetProbeCount()
    local count = 0
    for _ in pairs(self.probes) do count = count + 1 end
    return count
end

--- 移除探针
-- @param node Node 探针节点
function LightProbeManager:RemoveProbe(node)
    self.probes[node] = nil
    node:Remove()
end

--- 清空所有探针
function LightProbeManager:ClearProbes()
    for node, _ in pairs(self.probes) do
        node:Remove()
    end
    self.probes = {}
end

return LightProbeManager
