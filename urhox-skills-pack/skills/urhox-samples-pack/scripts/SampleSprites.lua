--- Sprites 示例模块
-- 提取自官方示例 03_Sprites，演示通过 Sprite 组件批量渲染带缩放与透明渐变的 2D 图标。
--
-- @module SampleSprites

local M = {}

--- 默认精灵数量
M.NUM_SPRITES = 100

--- 构建 2D 精灵场景
-- @param scene Scene
-- @param count number 精灵数量
function M.CreateSpritesScene(scene, count)
    count = count or M.NUM_SPRITES
    scene:CreateComponent("Octree")

    local cameraNode = scene:CreateChild("Camera")
    cameraNode.position = Vector3(0.0, 0.0, -10.0)
    local camera = cameraNode:CreateComponent("Camera")
    camera.orthographic = true
    camera.orthoSize = graphics.height * 0.01
    camera.zoom = 1.2 * math.min(graphics.width / 1280.0, graphics.height / 800.0)

    local texture = cache:GetResource("Texture2D", "Textures/UrhoIcon.png")
    if texture == nil then return end

    for _ = 1, count do
        local spriteNode = scene:CreateChild("Sprite")
        spriteNode.position = Vector3(
            math.random() * 12.0 - 6.0,
            math.random() * 7.4 - 3.7,
            0.0
        )
        local sprite = spriteNode:CreateComponent("Sprite2D")
        sprite.sprite = cache:GetResource("Sprite2D", "Urho2D/Aster.png")
        spriteNode:SetScale(0.5 + math.random() * 1.0)
        spriteNode:SetDeepEnabled(true)

        -- 通过 Lua 逻辑模拟简单的透明度/位置动画
        spriteNode.vars["SpriteSpeed"] = Variant(Vector3(
            (math.random() - 0.5) * 3.0,
            (math.random() - 0.5) * 3.0,
            0.0
        ))
    end
end

--- 更新所有精灵的位置
-- @param timeStep number
function M.UpdateSprites(timeStep)
    local children = scene:GetChildren(false)
    for _, node in ipairs(children) do
        if node.name == "Sprite" then
            local speedVar = node.vars["SpriteSpeed"]
            if speedVar ~= nil then
                local speed = speedVar:GetVector3()
                node:Translate(speed * timeStep)
                local pos = node.position
                if pos.x < -6.0 or pos.x > 6.0 then
                    speed.x = -speed.x
                end
                if pos.y < -3.7 or pos.y > 3.7 then
                    speed.y = -speed.y
                end
                node.vars["SpriteSpeed"] = Variant(speed)
            end
        end
    end
end

return M
