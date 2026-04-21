-- CombatCamera.lua
-- 武侠战斗镜头控制器
-- 负责命中时的屏幕震动、hit-stop（顿帧）、慢镜头、镜头追踪等战斗演出效果

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- CombatCamera 类
-- ============================================================================

local CombatCamera = {}
CombatCamera.__index = CombatCamera

--- 创建战斗镜头控制器
-- @param cameraNode any 引擎中的相机节点（可选，若未传入则仅计算偏移供外部应用）-- @return CombatCamera
function CombatCamera.New(cameraNode)
    local self = setmetatable({}, CombatCamera)
    self.cameraNode = cameraNode or nil
    self.basePos = { x = 0.0, y = 0.0, z = 0.0 }
    self.baseFov = 60.0
    self.shakeIntensity = 0.0
    self.shakeDecay = 5.0
    self.shakeFrequency = 30.0
    self.shakeTime = 0.0
    self.hitStopFrames = 0
    self.hitStopRemaining = 0.0
    self.slowMotionScale = 1.0
    self.slowMotionRecoverSpeed = 2.0
    self.isInHitStop = false
    self.trackingTarget = nil
    self.trackingWeight = 0.0
    self.trackingOffset = { x = 0.0, y = 2.0, z = 5.0 }
    self.trauma = 0.0
    self.maxShakeOffset = { x = 0.5, y = 0.3, z = 0.2 }
    self.seedX = math.random() * 1000.0
    self.seedY = math.random() * 1000.0
    self.seedZ = math.random() * 1000.0
    return self
end

--- 设置基础相机参数
-- @param pos table {x,y,z}
-- @param fov number
function CombatCamera:SetBase(pos, fov)
    self.basePos = { x = pos.x or 0.0, y = pos.y or 0.0, z = pos.z or 0.0 }
    self.baseFov = fov or 60.0
end

--- 添加屏幕震动（创伤值 0.0-1.0）
-- @param trauma number
function CombatCamera:AddShake(trauma)
    self.trauma = math.min(1.0, self.trauma + Utils.Clamp(trauma, 0.0, 1.0))
end

--- 触发一次指定强度的震动
-- @param intensity number 震动强度（米）
-- @param decay number 衰减速度
-- @param frequency number 频率
function CombatCamera:Shake(intensity, decay, frequency)
    self.shakeIntensity = intensity or 0.3
    self.shakeDecay = decay or 5.0
    self.shakeFrequency = frequency or 30.0
    self.shakeTime = 0.0
end

--- 触发 hit-stop（战斗命中顿帧）
-- @param duration number 顿帧持续时间（秒）
-- @param scale number 顿帧期间时间缩放（默认0.05）
function CombatCamera:HitStop(duration, scale)
    self.hitStopRemaining = duration or 0.05
    self.hitStopFrames = self.hitStopRemaining
    self.isInHitStop = true
    self.slowMotionScale = scale or 0.05
end

--- 触发慢镜头
-- @param targetScale number 目标时间缩放
-- @param duration number 持续时间
-- @param recoverSpeed number 恢复速度
function CombatCamera:SlowMotion(targetScale, duration, recoverSpeed)
    self.slowMotionScale = targetScale or 0.3
    self.slowMotionRecoverSpeed = recoverSpeed or 1.0
    -- 外部应在 duration 后调用 RecoverSlowMotion
end

--- 恢复时间流速
function CombatCamera:RecoverSlowMotion()
    self.slowMotionScale = 1.0
end

--- 设置追踪目标
-- @param targetNode any
-- @param weight number 0.0-1.0 追踪权重
-- @param offset table {x,y,z}
function CombatCamera:SetTracking(targetNode, weight, offset)
    self.trackingTarget = targetNode
    self.trackingWeight = weight or 0.5
    self.trackingOffset = offset or { x = 0.0, y = 2.0, z = 5.0 }
end

--- 内部：柏林噪音式随机（简化版）
local function Noise1D(t, seed)
    local x = t + seed
    return math.sin(x) * math.sin(x * 2.3 + seed) * math.sin(x * 4.7 + seed)
end

--- 计算当前震动偏移
-- @param dt number
-- @return table {x,y,z}
function CombatCamera:_CalcShakeOffset(dt)
    if self.trauma <= 0.001 and self.shakeIntensity <= 0.001 then
        return { x = 0.0, y = 0.0, z = 0.0 }
    end

    self.shakeTime = self.shakeTime + dt
    local traumaShake = self.trauma * self.trauma * self.trauma
    local totalIntensity = self.shakeIntensity + traumaShake

    local nx = Noise1D(self.shakeTime * self.shakeFrequency, self.seedX)
    local ny = Noise1D(self.shakeTime * self.shakeFrequency, self.seedY)
    local nz = Noise1D(self.shakeTime * self.shakeFrequency, self.seedZ)

    local ox = nx * self.maxShakeOffset.x * totalIntensity
    local oy = ny * self.maxShakeOffset.y * totalIntensity
    local oz = nz * self.maxShakeOffset.z * totalIntensity

    -- 衰减
    self.trauma = math.max(0.0, self.trauma - dt * self.shakeDecay * 0.5)
    self.shakeIntensity = math.max(0.0, self.shakeIntensity - dt * self.shakeDecay)

    return { x = ox, y = oy, z = oz }
end

--- 计算追踪目标位置
-- @return table|nil
function CombatCamera:_CalcTrackingPos()
    if not self.trackingTarget then
        return nil
    end
    local targetPos = Utils.GetNodeWorldPosition(self.trackingTarget)
    if not targetPos then
        return nil
    end
    return {
        x = targetPos.x + self.trackingOffset.x,
        y = targetPos.y + self.trackingOffset.y,
        z = targetPos.z + self.trackingOffset.z,
    }
end

--- 获取当前应应用的时间缩放
-- @return number
function CombatCamera:GetTimeScale()
    return self.slowMotionScale
end

--- 更新相机（应在 Update 中调用）
-- @param dt number 真实时间步长
function CombatCamera:Update(dt)
    -- hit-stop 处理
    if self.isInHitStop then
        self.hitStopRemaining = self.hitStopRemaining - dt
        if self.hitStopRemaining <= 0.0 then
            self.isInHitStop = false
            self.slowMotionScale = 1.0
        else
            return -- 顿帧期间不更新相机位置
        end
    end

    -- 慢镜头恢复
    if self.slowMotionScale < 1.0 and not self.isInHitStop then
        self.slowMotionScale = math.min(1.0, self.slowMotionScale + dt * self.slowMotionRecoverSpeed)
    end

    if not self.cameraNode then
        return
    end

    local shakeOffset = self:_CalcShakeOffset(dt)
    local trackingPos = self:_CalcTrackingPos()

    local finalPos = {
        x = self.basePos.x + shakeOffset.x,
        y = self.basePos.y + shakeOffset.y,
        z = self.basePos.z + shakeOffset.z,
    }

    if trackingPos then
        finalPos.x = Utils.Lerp(finalPos.x, trackingPos.x, self.trackingWeight)
        finalPos.y = Utils.Lerp(finalPos.y, trackingPos.y, self.trackingWeight)
        finalPos.z = Utils.Lerp(finalPos.z, trackingPos.z, self.trackingWeight)
    end

    -- 安全设置位置
    if type(self.cameraNode.SetPosition) == "function" then
        self.cameraNode:SetPosition(finalPos)
    elseif type(self.cameraNode.set_position) == "function" then
        self.cameraNode:set_position(finalPos)
    end
end

--- 战斗中命中时的一站式演出调用
-- @param hitLevel string "light" | "heavy" | "critical" | "special"
-- @param reaction string 受击反应类型
function CombatCamera:OnCombatHit(hitLevel, reaction)
    hitLevel = hitLevel or "light"
    reaction = reaction or "hit_stun"

    local shakeTrauma = 0.1
    local hitStopDuration = 0.02

    if hitLevel == "light" then
        shakeTrauma = 0.08
        hitStopDuration = 0.015
    elseif hitLevel == "heavy" then
        shakeTrauma = 0.25
        hitStopDuration = 0.04
    elseif hitLevel == "critical" then
        shakeTrauma = 0.4
        hitStopDuration = 0.06
    elseif hitLevel == "special" then
        shakeTrauma = 0.55
        hitStopDuration = 0.08
    end

    if reaction == "knockdown" or reaction == "launch" then
        shakeTrauma = shakeTrauma * 1.3
        hitStopDuration = hitStopDuration * 1.2
    end

    self:AddShake(shakeTrauma)
    self:HitStop(hitStopDuration, 0.05)
end

M.CombatCamera = CombatCamera

return M
