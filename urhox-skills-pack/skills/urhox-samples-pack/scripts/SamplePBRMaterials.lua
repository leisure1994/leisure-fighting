--- PBRMaterials 物理材质示例模块
-- 提取自官方示例 42_PBRMaterials，演示加载基于物理渲染的场景、并通过滑动条实时调整 Roughness / Metallic / Ambient。
--
-- @module SamplePBRMaterials

local M = {}

--- 动态材质引用
M.dynamicMaterial = nil

--- Roughness 标签
M.roughnessLabel = nil

--- Metallic 标签
M.metallicLabel = nil

--- Ambient 标签
M.ambientLabel = nil

--- Zone 引用
M.zone = nil

--- 构建 PBR 场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreatePBRScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- 加载编辑器保存的场景
    scene:LoadXML(cache:GetFile("Scenes/PBRExample.xml"))

    local sphereNode = scene:GetChild("SphereWithDynamicMat")
    if sphereNode ~= nil then
        local staticModel = sphereNode:GetComponent("StaticModel")
        if staticModel ~= nil then
            M.dynamicMaterial = staticModel.materials[0]
        end
    end

    local zoneNode = scene:GetChild("Zone")
    if zoneNode ~= nil then
        M.zone = zoneNode:GetComponent("Zone")
    end

    if createCamera then
        local camNode = scene:CreateChild("Camera")
        camNode:CreateComponent("Camera")
        if sphereNode ~= nil then
            camNode.position = sphereNode.position + Vector3(2.0, 2.0, 2.0)
            camNode:LookAt(sphereNode.position)
        end
        return camNode
    end
    return nil
end

--- 创建 PBR 调控 UI
function M.CreatePBRUI()
    local style = cache:GetResource("XMLFile", "UI/DefaultStyle.xml")
    ui.root.defaultStyle = style

    local font = cache:GetResource("Font", "Fonts/Anonymous Pro.ttf")

    M.roughnessLabel = ui.root:CreateChild("Text")
    M.roughnessLabel:SetFont(font, 15)
    M.roughnessLabel:SetPosition(370, 50)
    M.roughnessLabel.textEffect = TE_SHADOW

    M.metallicLabel = ui.root:CreateChild("Text")
    M.metallicLabel:SetFont(font, 15)
    M.metallicLabel:SetPosition(370, 100)
    M.metallicLabel.textEffect = TE_SHADOW

    M.ambientLabel = ui.root:CreateChild("Text")
    M.ambientLabel:SetFont(font, 15)
    M.ambientLabel:SetPosition(370, 150)
    M.ambientLabel.textEffect = TE_SHADOW

    -- Roughness 滑动条
    local roughnessSlider = ui.root:CreateChild("Slider")
    roughnessSlider:SetStyleAuto()
    roughnessSlider:SetPosition(50, 50)
    roughnessSlider:SetSize(300, 20)
    roughnessSlider.range = 1.0
    roughnessSlider.value = 0.5
    SubscribeToEvent(roughnessSlider, "SliderChanged", function(eventType, eventData)
        local val = eventData["Value"]:GetFloat()
        if M.dynamicMaterial ~= nil then
            M.dynamicMaterial.shaderParameters["Roughness"] = Variant(val)
        end
        if M.roughnessLabel ~= nil then
            M.roughnessLabel.text = "Roughness: " .. tostring(val)
        end
    end)

    -- Metallic 滑动条
    local metallicSlider = ui.root:CreateChild("Slider")
    metallicSlider:SetStyleAuto()
    metallicSlider:SetPosition(50, 100)
    metallicSlider:SetSize(300, 20)
    metallicSlider.range = 1.0
    metallicSlider.value = 0.5
    SubscribeToEvent(metallicSlider, "SliderChanged", function(eventType, eventData)
        local val = eventData["Value"]:GetFloat()
        if M.dynamicMaterial ~= nil then
            M.dynamicMaterial.shaderParameters["Metallic"] = Variant(val)
        end
        if M.metallicLabel ~= nil then
            M.metallicLabel.text = "Metallic: " .. tostring(val)
        end
    end)

    -- Ambient HDR 滑动条
    local ambientSlider = ui.root:CreateChild("Slider")
    ambientSlider:SetStyleAuto()
    ambientSlider:SetPosition(50, 150)
    ambientSlider:SetSize(300, 20)
    ambientSlider.range = 10.0
    ambientSlider.value = (M.zone ~= nil) and M.zone.ambientColor.a or 1.0
    SubscribeToEvent(ambientSlider, "SliderChanged", function(eventType, eventData)
        local val = eventData["Value"]:GetFloat()
        if M.zone ~= nil then
            M.zone.ambientColor = Color(0.0, 0.0, 0.0, val)
        end
        if M.ambientLabel ~= nil then
            local a = (M.zone ~= nil) and M.zone.ambientColor.a or val
            M.ambientLabel.text = "Ambient HDR Scale: " .. tostring(a)
        end
    end)
end

--- 设置 PBR 视口与后处理
-- @param frontCameraNode Node
function M.SetupPBRViewport(frontCameraNode)
    renderer.hdrRendering = true
    local viewport = Viewport(scene, frontCameraNode:GetComponent("Camera"))
    renderer.viewports[0] = viewport

    local effectRenderPath = viewport.renderPath:Clone()
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/FXAA2.xml"))
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/GammaCorrection.xml"))
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/Tonemap.xml"))
    effectRenderPath:Append(cache:GetResource("XMLFile", "PostProcess/AutoExposure.xml"))
    viewport.renderPath = effectRenderPath
end

return M
