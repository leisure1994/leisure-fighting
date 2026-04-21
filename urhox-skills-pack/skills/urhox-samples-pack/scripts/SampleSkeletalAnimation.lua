-- SampleSkeletalAnimation.lua
-- 骨骼动画模型加载与播放
-- 对应原版示例：06_SkeletalAnimation

local Utils = require("SampleUtils")
local M = {}

--- 创建一个带骨骼动画的 Jack 模型（包含 AnimationController）
-- @param scene Scene 场景实例
-- @param pos Vector3 初始位置
-- @param scale number 缩放系数
-- @return Node Jack 节点
function M.CreateAnimatedJack(scene, pos, scale)
    local node = scene:CreateChild("Jack")
    node.position = pos or Vector3.ZERO
    if scale then node:SetScale(scale) end

    local model = node:CreateComponent("AnimatedModel")
    model.model = cache:GetResource("Model", "Models/Jack.mdl")
    model.material = cache:GetResource("Material", "Materials/Jack.xml")
    model.castShadows = true

    local animCtrl = node:CreateComponent("AnimationController")
    return node, animCtrl
end

--- 播放指定的骨骼动画
-- @param animCtrl AnimationController 动画控制器
-- @param animName string 动画资源路径，如 "Models/Jack_Walk.ani"
-- @param layer number 动画层
-- @param looped boolean 是否循环
-- @param fadeTime number 淡入时间
function M.PlayAnimation(animCtrl, animName, layer, looped, fadeTime)
    animCtrl:Play(animName, layer or 0, looped or true, fadeTime or 0.1)
end

--- 停止指定动画
-- @param animCtrl AnimationController 动画控制器
-- @param animName string 动画资源路径
-- @param fadeTime number 淡出时间
function M.StopAnimation(animCtrl, animName, fadeTime)
    animCtrl:Stop(animName, fadeTime or 0.5)
end

--- 设置动画播放速度
-- @param animCtrl AnimationController 动画控制器
-- @param animName string 动画资源路径
-- @param speed number 速度倍率
function M.SetAnimationSpeed(animCtrl, animName, speed)
    animCtrl:SetSpeed(animName, speed)
end

--- 创建多个行走的 Jack（演示实例化骨骼动画）
-- @param scene Scene 场景实例
-- @param count number 数量
-- @param radius number 分布半径
function M.SpawnWalkingJacks(scene, count, radius)
    local r = radius or 20.0
    for i = 1, count do
        local angle = (i / count) * math.pi * 2.0
        local pos = Vector3(math.cos(angle) * r, 0.0, math.sin(angle) * r)
        local node, animCtrl = M.CreateAnimatedJack(scene, pos, 1.0)
        M.PlayAnimation(animCtrl, "Models/Jack_Walk.ani", 0, true, 0.1)
    end
end

return M
