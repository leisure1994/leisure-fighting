--- LightAnimation 属性动画示例模块
-- 提取自官方示例 30_LightAnimation，演示 ValueAnimation 对光源颜色、位置及 UI 元素的动画控制。
--
-- @module SampleLightAnimation

local M = {}

--- 默认物体数量
M.NUM_OBJECTS = 200

--- 构建属性动画场景
-- @param scene Scene
-- @param createCamera boolean
-- @return Node|nil
function M.CreateLightAnimationScene(scene, createCamera)
    createCamera = createCamera ~= false
    scene:CreateComponent("Octree")

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(100.0, 1.0, 100.0)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 点光源
    local lightNode = scene:CreateChild("PointLight")
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_POINT
    light.range = 10.0

    -- 颜色动画
    local colorAnimation = ValueAnimation()
    colorAnimation:SetKeyFrame(0.0, Variant(Color(1.0, 1.0, 1.0, 1.0)))
    colorAnimation:SetKeyFrame(1.0, Variant(Color(1.0, 0.0, 0.0, 1.0)))
    colorAnimation:SetKeyFrame(2.0, Variant(Color(1.0, 1.0, 0.0, 1.0)))
    colorAnimation:SetKeyFrame(3.0, Variant(Color(0.0, 1.0, 0.0, 1.0)))
    colorAnimation:SetKeyFrame(4.0, Variant(Color(1.0, 1.0, 1.0, 1.0)))
    lightNode:SetAttributeAnimation("Color", colorAnimation)

    -- 位置动画（样条插值）
    local posAnimation = ValueAnimation()
    posAnimation.interpolationMethod = IM_SPLINE
    posAnimation.splineTension = 0.7
    posAnimation:SetKeyFrame(0.0, Variant(Vector3(-30.0, 5.0, -30.0)))
    posAnimation:SetKeyFrame(1.0, Variant(Vector3(30.0, 5.0, -30.0)))
    posAnimation:SetKeyFrame(2.0, Variant(Vector3(30.0, 5.0, 30.0)))
    posAnimation:SetKeyFrame(3.0, Variant(Vector3(-30.0, 5.0, 30.0)))
    posAnimation:SetKeyFrame(4.0, Variant(Vector3(-30.0, 5.0, -30.0)))
    lightNode:SetAttributeAnimation("Position", posAnimation)

    -- 随机蘑菇
    local mushModel = cache:GetResource("Model", "Models/Mushroom.mdl")
    local mushMat = cache:GetResource("Material", "Materials/Mushroom.xml")
    if mushModel ~= nil and mushMat ~= nil then
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
            obj.model = mushModel
            obj.material = mushMat
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

--- 创建动画 UI（需要在 UI root 可用后调用）
function M.CreateAnimatingUI()
    local font = cache:GetResource("Font", "Fonts/Anonymous Pro.ttf")

    local text = ui.root:CreateChild("Text", "animatingText")
    if text ~= nil then
        text:SetFont(font, 15)
        text.horizontalAlignment = HA_CENTER
        text.verticalAlignment = VA_CENTER
        text:SetPosition(0, ui.root.height / 4 + 20)

        local textAnimation = ValueAnimation()
        textAnimation:SetKeyFrame(0.0, Variant("WHITE"))
        textAnimation:SetKeyFrame(1.0, Variant("RED"))
        textAnimation:SetKeyFrame(2.0, Variant("YELLOW"))
        textAnimation:SetKeyFrame(3.0, Variant("GREEN"))
        textAnimation:SetKeyFrame(4.0, Variant("WHITE"))
        text:SetAttributeAnimation("Text", textAnimation)
    end

    local sprite = ui.root:CreateChild("Sprite", "animatingSprite")
    if sprite ~= nil then
        sprite:SetPosition(8, 8)
        sprite:SetSize(64, 64)
        local spriteAnimation = ValueAnimation()
        spriteAnimation:SetKeyFrame(0.0, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/1.png")))
        spriteAnimation:SetKeyFrame(0.1, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/2.png")))
        spriteAnimation:SetKeyFrame(0.2, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/3.png")))
        spriteAnimation:SetKeyFrame(0.3, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/4.png")))
        spriteAnimation:SetKeyFrame(0.4, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/5.png")))
        spriteAnimation:SetKeyFrame(0.5, Variant(ResourceRef("Texture2D", "Urho2D/GoldIcon/1.png")))
        sprite:SetAttributeAnimation("Texture", spriteAnimation)
    end
end

return M
