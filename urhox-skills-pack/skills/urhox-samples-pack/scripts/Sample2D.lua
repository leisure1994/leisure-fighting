-- Sample2D.lua
-- 2D 精灵创建、摄像机控制、动画播放
-- 对应原版示例：24_Urho2DSprite、25_Urho2DParticle、28_Urho2DTileMap

local Utils = require("SampleUtils")
local M = {}

local SPRITES = {} -- 受控 2D 精灵列表

--- 创建 2D 正交摄像机
-- @param scene Scene 场景实例
-- @param zoom number 初始缩放（默认 1.0）
-- @return Node 摄像机节点
function M.CreateCamera2D(scene, zoom)
    local camNode = scene:CreateChild("Camera")
    camNode.position = Vector3(0.0, 0.0, -10.0)
    local camera = camNode:CreateComponent("Camera")
    camera.orthographic = true
    camera.orthoSize = graphics.height * PIXEL_SIZE
    if zoom then camera.zoom = zoom end
    return camNode
end

--- 在场景中创建一大片随机分布的 2D 精灵
-- @param scene Scene 场景实例
-- @param count number 数量（默认 200）
-- @param spritePath string Sprite2D 资源路径
function M.SpawnSprites(scene, count, spritePath)
    local path = spritePath or "Urho2D/Aster.png"
    local sprite = cache:GetResource("Sprite2D", path)
    if sprite == nil then return end

    local halfW = graphics.width * PIXEL_SIZE * 0.5
    local halfH = graphics.height * PIXEL_SIZE * 0.5
    local c = count or 200

    for i = 1, c do
        local node = scene:CreateChild("StaticSprite2D")
        node.position = Vector3(math.random() * halfW * 2.0 - halfW, math.random() * halfH * 2.0 - halfH, 0.0)

        local ss = node:CreateComponent("StaticSprite2D")
        ss.color = Color(math.random(), math.random(), math.random(), 1.0)
        ss.blendMode = BLEND_ALPHA
        ss.sprite = sprite

        local moveSpeed = Vector3(math.random() * 4.0 - 2.0, math.random() * 4.0 - 2.0, 0.0)
        local rotateSpeed = math.random() * 180.0 - 90.0
        table.insert(SPRITES, { node = node, moveSpeed = moveSpeed, rotateSpeed = rotateSpeed, halfW = halfW, halfH = halfH })
    end
end

--- 创建单个 2D 精灵
-- @param scene Scene 场景实例
-- @param pos Vector3 位置
-- @param spritePath string Sprite2D 路径
-- @param color Color 颜色
-- @return Node 精灵节点
function M.CreateSprite(scene, pos, spritePath, color)
    local sprite = cache:GetResource("Sprite2D", spritePath)
    if sprite == nil then return nil end
    local node = scene:CreateChild("StaticSprite2D")
    node.position = pos or Vector3.ZERO
    local ss = node:CreateComponent("StaticSprite2D")
    ss.sprite = sprite
    ss.color = color or Color.WHITE
    ss.blendMode = BLEND_ALPHA
    return node
end

--- 创建动画精灵（AnimatedSprite2D，支持 Spriter/SCML 动画）
-- @param scene Scene 场景实例
-- @param pos Vector3 位置
-- @param animSetPath string AnimationSet2D 路径
-- @param animName string 默认动画名
-- @return Node 精灵节点
function M.CreateAnimatedSprite(scene, pos, animSetPath, animName)
    local animSet = cache:GetResource("AnimationSet2D", animSetPath)
    if animSet == nil then return nil end
    local node = scene:CreateChild("AnimatedSprite2D")
    node.position = pos or Vector3.ZERO
    local as = node:CreateComponent("AnimatedSprite2D")
    as.animationSet = animSet
    if animName then as.animation = animName end
    return node
end

--- 更新所有受控精灵的位置与旋转（边界反弹）
-- 需在外部 Update 事件中调用
-- @param timeStep number 时间步长
function M.UpdateSprites(timeStep)
    for _, s in ipairs(SPRITES) do
        local pos = s.node.position + s.moveSpeed * timeStep
        if pos.x < -s.halfW or pos.x > s.halfW then
            pos.x = s.node.position.x
            s.moveSpeed.x = -s.moveSpeed.x
        end
        if pos.y < -s.halfH or pos.y > s.halfH then
            pos.y = s.node.position.y
            s.moveSpeed.y = -s.moveSpeed.y
        end
        s.node.position = pos
        s.node:Roll(s.rotateSpeed * timeStep)
    end
end

--- 2D 摄像机移动（上下左右平移，PageUp/PageDown 缩放）
-- @param camNode Node 摄像机节点
-- @param timeStep number 时间步长
-- @param moveSpeed number 移动速度
function M.MoveCamera2D(camNode, timeStep, moveSpeed)
    if ui.focusElement ~= nil then return end
    local speed = moveSpeed or 4.0
    if input:GetKeyDown(KEY_W) then camNode:Translate(Vector3.UP * speed * timeStep) end
    if input:GetKeyDown(KEY_S) then camNode:Translate(Vector3.DOWN * speed * timeStep) end
    if input:GetKeyDown(KEY_A) then camNode:Translate(Vector3.LEFT * speed * timeStep) end
    if input:GetKeyDown(KEY_D) then camNode:Translate(Vector3.RIGHT * speed * timeStep) end

    local camera = camNode:GetComponent("Camera")
    if input:GetKeyDown(KEY_PAGEUP) then camera.zoom = camera.zoom * 1.01 end
    if input:GetKeyDown(KEY_PAGEDOWN) then camera.zoom = camera.zoom * 0.99 end
end

--- 清空受控精灵列表
function M.ClearSprites()
    SPRITES = {}
end

return M
