-- HitboxManager.lua
-- 武侠战斗碰撞框管理器
-- 基于开源 Hitbox/Hurtbox 理论，支持技能范围生成、多段攻击、命中去重、友军伤害过滤

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local HITBOX_SHAPE_SPHERE = "sphere"
local HITBOX_SHAPE_BOX = "box"
local HITBOX_SHAPE_FAN = "fan"
local HITBOX_SHAPE_LINE = "line"
local HURTBOX_LAYER_PLAYER = 1
local HURTBOX_LAYER_ENEMY = 2
local HURTBOX_LAYER_NEUTRAL = 4
local DEFAULT_HITBOX_LIFETIME = 0.15
local DEFAULT_HIT_INTERVAL = 0.1

-- ============================================================================
-- Hitbox 数据结构
-- ============================================================================

--- 构建 Hitbox 数据
-- @param id string 唯一标识
-- @param owner any 释放者节点
-- @param shape string 形状类型
-- @param center table 中心位置 {x,y,z}
-- @param params table 形状参数（半径/长宽高/角度/长度）
-- @param damageEvent table 命中时触发的事件表
-- @param lifetime number 持续时间
-- @param maxHits number 最大命中目标数
-- @param hitLayers table 可命中的伤害层掩码
-- @return table
local function CreateHitboxData(id, owner, shape, center, params, damageEvent, lifetime, maxHits, hitLayers)
    return {
        id = id,
        owner = owner,
        shape = shape,
        center = center,
        params = params,
        damageEvent = damageEvent,
        bornTime = 0.0,
        lifetime = lifetime or DEFAULT_HITBOX_LIFETIME,
        active = true,
        maxHits = maxHits or math.huge,
        hitLayers = hitLayers or { HURTBOX_LAYER_ENEMY },
        alreadyHit = {},
        hitInterval = DEFAULT_HIT_INTERVAL,
        lastHitTime = -math.huge,
        multiHit = false,
    }
end

-- ============================================================================
-- HitboxManager 类
-- ============================================================================

local HitboxManager = {}
HitboxManager.__index = HitboxManager

--- 创建碰撞框管理器
-- @return HitboxManager
function HitboxManager.New()
    local self = setmetatable({}, HitboxManager)
    self.hitboxes = {}
    self.hurtboxes = {}
    self.globalTime = 0.0
    self.debugDraw = false
    return self
end

--- 注册一个角色的 Hurtbox（受击框）
-- @param targetNode Node 目标节点
-- @param radius number 受击半径
-- @param layer number 所属层（友军/敌人/中立）
-- @param offset table|nil 相对节点的偏移 {x,y,z}
-- @return string hurtboxId
function HitboxManager:RegisterHurtbox(targetNode, radius, layer, offset)
    radius = radius or 0.5
    layer = layer or HURTBOX_LAYER_ENEMY
    offset = offset or { x = 0.0, y = 0.0, z = 0.0 }
    local hurtboxId = Utils.GenerateUUID()
    self.hurtboxes[hurtboxId] = {
        id = hurtboxId,
        node = targetNode,
        radius = radius,
        layer = layer,
        offset = offset,
        active = true,
    }
    return hurtboxId
end

--- 注销 Hurtbox
-- @param hurtboxId string
function HitboxManager:UnregisterHurtbox(hurtboxId)
    self.hurtboxes[hurtboxId] = nil
end

--- 设置 Hurtbox 激活状态
-- @param hurtboxId string
-- @param active boolean
function HitboxManager:SetHurtboxActive(hurtboxId, active)
    local hurtbox = self.hurtboxes[hurtboxId]
    if hurtbox then
        hurtbox.active = active
    end
end

--- 更新 Hurtbox 位置（若节点已移动）
-- @param hurtboxId string
-- @param newOffset table
function HitboxManager:UpdateHurtboxOffset(hurtboxId, newOffset)
    local hurtbox = self.hurtboxes[hurtboxId]
    if hurtbox then
        hurtbox.offset = newOffset
    end
end

--- 生成球形 Hitbox（如拳掌气劲）
-- @param owner any 释放者节点
-- @param center table {x,y,z}
-- @param radius number
-- @param damageEvent table
-- @param lifetime number
-- @param maxHits number
-- @return string hitboxId
function HitboxManager:SpawnSphereHitbox(owner, center, radius, damageEvent, lifetime, maxHits)
    local id = Utils.GenerateUUID()
    local hitbox = CreateHitboxData(id, owner, HITBOX_SHAPE_SPHERE, center, { radius = radius }, damageEvent, lifetime, maxHits)
    hitbox.bornTime = self.globalTime
    table.insert(self.hitboxes, hitbox)
    return id
end

--- 生成矩形 Hitbox（如剑气横扫）
-- @param owner any
-- @param center table
-- @param halfSize table {x,y,z}
-- @param yaw number 朝向角度（度）
-- @param damageEvent table
-- @param lifetime number
-- @param maxHits number
-- @return string hitboxId
function HitboxManager:SpawnBoxHitbox(owner, center, halfSize, yaw, damageEvent, lifetime, maxHits)
    local id = Utils.GenerateUUID()
    local hitbox = CreateHitboxData(id, owner, HITBOX_SHAPE_BOX, center, { halfSize = halfSize, yaw = yaw or 0.0 }, damageEvent, lifetime, maxHits)
    hitbox.bornTime = self.globalTime
    table.insert(self.hitboxes, hitbox)
    return id
end

--- 生成扇形 Hitbox（如旋风腿、横扫千军）
-- @param owner any
-- @param center table
-- @param radius number
-- @param angleSpan number 扇形张角（度）
-- @param yaw number 朝向角度（度）
-- @param damageEvent table
-- @param lifetime number
-- @param maxHits number
-- @return string hitboxId
function HitboxManager:SpawnFanHitbox(owner, center, radius, angleSpan, yaw, damageEvent, lifetime, maxHits)
    local id = Utils.GenerateUUID()
    local hitbox = CreateHitboxData(id, owner, HITBOX_SHAPE_FAN, center, { radius = radius, angleSpan = angleSpan, yaw = yaw or 0.0 }, damageEvent, lifetime, maxHits)
    hitbox.bornTime = self.globalTime
    table.insert(self.hitboxes, hitbox)
    return id
end

--- 生成直线/射线 Hitbox（如枪突刺、剑气直刺）
-- @param owner any
-- @param startPos table
-- @param direction table 单位方向向量 {x,y,z}
-- @param length number
-- @param thickness number
-- @param damageEvent table
-- @param lifetime number
-- @param maxHits number
-- @return string hitboxId
function HitboxManager:SpawnLineHitbox(owner, startPos, direction, length, thickness, damageEvent, lifetime, maxHits)
    local id = Utils.GenerateUUID()
    local dir = Utils.Vec3Normalize(direction)
    local hitbox = CreateHitboxData(id, owner, HITBOX_SHAPE_LINE, startPos, { direction = dir, length = length, thickness = thickness }, damageEvent, lifetime, maxHits)
    hitbox.bornTime = self.globalTime
    table.insert(self.hitboxes, hitbox)
    return id
end

--- 设置 Hitbox 多段命中
-- @param hitboxId string
-- @param interval number 命中间隔
function HitboxManager:SetHitboxMultiHit(hitboxId, interval)
    for _, hitbox in ipairs(self.hitboxes) do
        if hitbox.id == hitboxId then
            hitbox.multiHit = true
            hitbox.hitInterval = interval or DEFAULT_HIT_INTERVAL
            break
        end
    end
end

--- 立即销毁指定 Hitbox
-- @param hitboxId string
function HitboxManager:DespawnHitbox(hitboxId)
    for i = #self.hitboxes, 1, -1 do
        if self.hitboxes[i].id == hitboxId then
            table.remove(self.hitboxes, i)
            break
        end
    end
end

--- 检查目标层是否在命中层列表中
-- @param hitbox table
-- @param targetLayer number
-- @return boolean
function HitboxManager:_CanHitLayer(hitbox, targetLayer)
    for _, layer in ipairs(hitbox.hitLayers) do
        if layer == targetLayer then
            return true
        end
    end
    return false
end

--- 检查球形碰撞
-- @param hitbox table
-- @param hurtbox table
-- @return boolean
function HitboxManager:_CheckSphere(hitbox, hurtbox)
    local targetPos = Utils.GetNodeWorldPosition(hurtbox.node)
    targetPos = Utils.Vec3Add(targetPos, hurtbox.offset)
    local dist = Utils.Vec3Length(Utils.Vec3Sub(hitbox.center, targetPos))
    return dist <= (hitbox.params.radius + hurtbox.radius)
end

--- 检查矩形（OBB）碰撞（简化版，忽略Y轴旋转仅处理水平面Yaw）
-- @param hitbox table
-- @param hurtbox table
-- @return boolean
function HitboxManager:_CheckBox(hitbox, hurtbox)
    local targetPos = Utils.GetNodeWorldPosition(hurtbox.node)
    targetPos = Utils.Vec3Add(targetPos, hurtbox.offset)
    local dx = targetPos.x - hitbox.center.x
    local dz = targetPos.z - hitbox.center.z
    local yawRad = math.rad(hitbox.params.yaw or 0.0)
    local cos = math.cos(-yawRad)
    local sin = math.sin(-yawRad)
    local localX = dx * cos - dz * sin
    local localZ = dx * sin + dz * cos
    local halfX = hitbox.params.halfSize.x or 0.5
    local halfZ = hitbox.params.halfSize.z or 0.5
    local halfY = hitbox.params.halfSize.y or 0.5
    if math.abs(localX) <= halfX + hurtbox.radius and math.abs(localZ) <= halfZ + hurtbox.radius then
        local dy = targetPos.y - hitbox.center.y
        if math.abs(dy) <= halfY + hurtbox.radius then
            return true
        end
    end
    return false
end

--- 检查扇形碰撞
-- @param hitbox table
-- @param hurtbox table
-- @return boolean
function HitboxManager:_CheckFan(hitbox, hurtbox)
    local targetPos = Utils.GetNodeWorldPosition(hurtbox.node)
    targetPos = Utils.Vec3Add(targetPos, hurtbox.offset)
    local toTarget = Utils.Vec3Sub(targetPos, hitbox.center)
    local dist = math.sqrt(toTarget.x * toTarget.x + toTarget.z * toTarget.z)
    if dist > hitbox.params.radius + hurtbox.radius then
        return false
    end
    local yawRad = math.rad(hitbox.params.yaw or 0.0)
    local forwardX = math.sin(yawRad)
    local forwardZ = math.cos(yawRad)
    local dot = toTarget.x * forwardX + toTarget.z * forwardZ
    local angle = math.acos(Utils.Clamp(dot / (dist + EPSILON), -1.0, 1.0)) * (180.0 / math.pi)
    return angle <= (hitbox.params.angleSpan * 0.5)
end

--- 检查线段/圆柱碰撞
-- @param hitbox table
-- @param hurtbox table
-- @return boolean
function HitboxManager:_CheckLine(hitbox, hurtbox)
    local targetPos = Utils.GetNodeWorldPosition(hurtbox.node)
    targetPos = Utils.Vec3Add(targetPos, hurtbox.offset)
    local startPos = hitbox.center
    local dir = hitbox.params.direction
    local length = hitbox.params.length
    local thickness = hitbox.params.thickness

    -- 计算到线段最近点的距离
    local toTarget = Utils.Vec3Sub(targetPos, startPos)
    local t = Utils.Vec3Dot(toTarget, dir)
    t = Utils.Clamp(t, 0.0, length)
    local closest = Utils.Vec3Add(startPos, Utils.Vec3Scale(dir, t))
    local dist = Utils.Vec3Length(Utils.Vec3Sub(targetPos, closest))
    return dist <= thickness + hurtbox.radius
end

--- 碰撞检测分发
-- @param hitbox table
-- @param hurtbox table
-- @return boolean
function HitboxManager:_CheckCollision(hitbox, hurtbox)
    if hitbox.shape == HITBOX_SHAPE_SPHERE then
        return self:_CheckSphere(hitbox, hurtbox)
    elseif hitbox.shape == HITBOX_SHAPE_BOX then
        return self:_CheckBox(hitbox, hurtbox)
    elseif hitbox.shape == HITBOX_SHAPE_FAN then
        return self:_CheckFan(hitbox, hurtbox)
    elseif hitbox.shape == HITBOX_SHAPE_LINE then
        return self:_CheckLine(hitbox, hurtbox)
    end
    return false
end

--- 更新所有 Hitbox 与 Hurtbox 的碰撞检测
-- @param dt number
-- @param onHit function|nil 命中回调函数签名：function(hitbox, hurtbox, damageEvent)
function HitboxManager:Update(dt, onHit)
    self.globalTime = self.globalTime + dt

    -- 清理过期的 hitbox
    for i = #self.hitboxes, 1, -1 do
        local hitbox = self.hitboxes[i]
        if (self.globalTime - hitbox.bornTime) >= hitbox.lifetime then
            table.remove(self.hitboxes, i)
        end
    end

    -- 检测碰撞
    for _, hitbox in ipairs(self.hitboxes) do
        if not hitbox.active then
            goto continue_hitbox
        end

        local hitCountThisFrame = 0
        for _, hurtbox in pairs(self.hurtboxes) do
            if not hurtbox.active then
                goto continue_hurtbox
            end
            if hurtbox.node == hitbox.owner then
                goto continue_hurtbox -- 不命中自己
            end
            if not self:_CanHitLayer(hitbox, hurtbox.layer) then
                goto continue_hurtbox
            end

            local hurtboxKey = tostring(hurtbox.id)
            local lastHitAt = hitbox.alreadyHit[hurtboxKey] or -math.huge
            if not hitbox.multiHit and lastHitAt >= 0.0 then
                goto continue_hurtbox
            end
            if hitbox.multiHit and (self.globalTime - lastHitAt) < hitbox.hitInterval then
                goto continue_hurtbox
            end

            if self:_CheckCollision(hitbox, hurtbox) then
                hitbox.alreadyHit[hurtboxKey] = self.globalTime
                if type(onHit) == "function" then
                    onHit(hitbox, hurtbox, hitbox.damageEvent)
                end
                hitCountThisFrame = hitCountThisFrame + 1
                if hitCountThisFrame >= hitbox.maxHits then
                    break
                end
            end
            ::continue_hurtbox::
        end
        ::continue_hitbox::
    end
end

--- 清除所有 Hitbox（场景切换/战斗结束时使用）
function HitboxManager:ClearHitboxes()
    self.hitboxes = {}
end

--- 清除所有 Hurtbox
function HitboxManager:ClearHurtboxes()
    self.hurtboxes = {}
end

--- 设置调试绘制
-- @param enabled boolean
function HitboxManager:SetDebugDraw(enabled)
    self.debugDraw = enabled
end

M.HitboxManager = HitboxManager
M.HITBOX_SHAPE_SPHERE = HITBOX_SHAPE_SPHERE
M.HITBOX_SHAPE_BOX = HITBOX_SHAPE_BOX
M.HITBOX_SHAPE_FAN = HITBOX_SHAPE_FAN
M.HITBOX_SHAPE_LINE = HITBOX_SHAPE_LINE
M.HURTBOX_LAYER_PLAYER = HURTBOX_LAYER_PLAYER
M.HURTBOX_LAYER_ENEMY = HURTBOX_LAYER_ENEMY
M.HURTBOX_LAYER_NEUTRAL = HURTBOX_LAYER_NEUTRAL

return M
