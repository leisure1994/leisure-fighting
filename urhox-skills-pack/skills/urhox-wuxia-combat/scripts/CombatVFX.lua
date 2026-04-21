-- CombatVFX.lua
-- 武侠战斗视觉特效管理器
-- 管理命中特效（血溅、火花、元素效果）、技能轨迹、受击反馈粒子等

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量与默认资源路径
-- ============================================================================

local VFX_TYPE_HIT_SPARK = "hit_spark"
local VFX_TYPE_BLOOD_SPRAY = "blood_spray"
local VFX_TYPE_BLOCK_SPARK = "block_spark"
local VFX_TYPE_DODGE_GHOST = "dodge_ghost"
local VFX_TYPE_ELEMENT_FIRE = "element_fire"
local VFX_TYPE_ELEMENT_ICE = "element_ice"
local VFX_TYPE_ELEMENT_THUNDER = "element_thunder"
local VFX_TYPE_DUST_KICKUP = "dust_kickup"
local VFX_TYPE_WEAPON_TRAIL = "weapon_trail"
local VFX_TYPE_QI_AURA = "qi_aura"

-- ============================================================================
-- VFXManager 类
-- ============================================================================

local VFXManager = {}
VFXManager.__index = VFXManager

--- 创建视觉特效管理器
-- @param sceneRoot any 场景根节点，用于挂载特效实例
-- @return VFXManager
function VFXManager.New(sceneRoot)
    local self = setmetatable({}, VFXManager)
    self.sceneRoot = sceneRoot
    self.effectPool = {}        -- 特效对象池
    self.activeEffects = {}     -- 当前活跃的特效
    self.effectDefinitions = {} -- 特效定义表
    self:_RegisterDefaults()
    return self
end

--- 注册默认特效定义
function VFXManager:_RegisterDefaults()
    self.effectDefinitions[VFX_TYPE_HIT_SPARK] = {
        prefab = "VFX/HitSpark",
        lifetime = 0.3,
        scale = 1.0,
        color = { r = 1.0, g = 1.0, b = 0.8, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_BLOOD_SPRAY] = {
        prefab = "VFX/BloodSpray",
        lifetime = 0.5,
        scale = 1.0,
        color = { r = 0.8, g = 0.1, b = 0.1, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_BLOCK_SPARK] = {
        prefab = "VFX/BlockSpark",
        lifetime = 0.25,
        scale = 1.0,
        color = { r = 0.9, g = 0.9, b = 1.0, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_DODGE_GHOST] = {
        prefab = "VFX/DodgeGhost",
        lifetime = 0.4,
        scale = 1.0,
        color = { r = 0.5, g = 0.8, b = 1.0, a = 0.6 },
    }
    self.effectDefinitions[VFX_TYPE_ELEMENT_FIRE] = {
        prefab = "VFX/FireBurst",
        lifetime = 0.6,
        scale = 1.2,
        color = { r = 1.0, g = 0.4, b = 0.1, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_ELEMENT_ICE] = {
        prefab = "VFX/IceShards",
        lifetime = 0.6,
        scale = 1.2,
        color = { r = 0.6, g = 0.9, b = 1.0, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_ELEMENT_THUNDER] = {
        prefab = "VFX/ThunderBolt",
        lifetime = 0.35,
        scale = 1.2,
        color = { r = 1.0, g = 1.0, b = 0.2, a = 1.0 },
    }
    self.effectDefinitions[VFX_TYPE_DUST_KICKUP] = {
        prefab = "VFX/DustKickup",
        lifetime = 0.8,
        scale = 1.0,
        color = { r = 0.7, g = 0.6, b = 0.5, a = 0.8 },
    }
    self.effectDefinitions[VFX_TYPE_WEAPON_TRAIL] = {
        prefab = "VFX/WeaponTrail",
        lifetime = 0.2,
        scale = 1.0,
        color = { r = 1.0, g = 1.0, b = 1.0, a = 0.7 },
    }
    self.effectDefinitions[VFX_TYPE_QI_AURA] = {
        prefab = "VFX/QiAura",
        lifetime = 2.0,
        scale = 1.5,
        color = { r = 0.2, g = 0.8, b = 1.0, a = 0.5 },
        loop = true,
    }
end

--- 注册自定义特效定义
-- @param vfxType string
-- @param definition table { prefab, lifetime, scale, color, loop }
function VFXManager:RegisterEffect(vfxType, definition)
    self.effectDefinitions[vfxType] = Utils.DeepCopy(definition)
end

--- 内部：从对象池获取特效实例
-- @param vfxType string
-- @return table 特效实例封装
function VFXManager:_AcquireEffect(vfxType)
    local pool = self.effectPool[vfxType]
    if pool and #pool > 0 then
        return table.remove(pool)
    end
    -- 无法实际加载 prefab 时，返回一个轻量占位对象
    return {
        vfxType = vfxType,
        node = nil,
        active = false,
        timer = 0.0,
        definition = self.effectDefinitions[vfxType],
    }
end

--- 内部：回收特效实例到对象池
-- @param effect table
function VFXManager:_ReleaseEffect(effect)
    if not effect then
        return
    end
    local vfxType = effect.vfxType
    if not self.effectPool[vfxType] then
        self.effectPool[vfxType] = {}
    end
    effect.active = false
    effect.timer = 0.0
    if effect.node and type(effect.node.SetEnabled) == "function" then
        effect.node:SetEnabled(false)
    end
    table.insert(self.effectPool[vfxType], effect)
end

--- 播放特效
-- @param vfxType string 特效类型
-- @param pos table {x,y,z} 世界坐标
-- @param rot table|nil {x,y,z} 旋转角度
-- @param scale number|nil 缩放
-- @param color table|nil {r,g,b,a}
-- @return number effectHandle 特效句柄
function VFXManager:Play(vfxType, pos, rot, scale, color)
    local def = self.effectDefinitions[vfxType]
    if not def then
        return -1
    end

    local effect = self:_AcquireEffect(vfxType)
    effect.active = true
    effect.timer = 0.0
    effect.pos = { x = pos.x or 0.0, y = pos.y or 0.0, z = pos.z or 0.0 }
    effect.rot = rot or { x = 0.0, y = 0.0, z = 0.0 }
    effect.scale = scale or def.scale or 1.0
    effect.color = color or def.color or { r = 1.0, g = 1.0, b = 1.0, a = 1.0 }

    -- 若有实际节点，设置transform
    if effect.node then
        if type(effect.node.SetEnabled) == "function" then
            effect.node:SetEnabled(true)
        end
        if type(effect.node.SetPosition) == "function" then
            effect.node:SetPosition(effect.pos)
        end
    end

    local handle = #self.activeEffects + 1
    self.activeEffects[handle] = effect
    return handle
end

--- 停止指定特效
-- @param handle number
function VFXManager:Stop(handle)
    local effect = self.activeEffects[handle]
    if effect then
        self:_ReleaseEffect(effect)
        self.activeEffects[handle] = nil
    end
end

--- 在角色身上播放持续特效（如气功护体）
-- @param vfxType string
-- @param targetNode any 目标节点
-- @param offset table|nil {x,y,z}
-- @param attach boolean|nil 是否跟随节点移动
-- @return number handle
function VFXManager:PlayOnNode(vfxType, targetNode, offset, attach)
    local pos = Utils.GetNodeWorldPosition(targetNode)
    offset = offset or { x = 0.0, y = 0.0, z = 0.0 }
    pos = Utils.Vec3Add(pos, offset)
    local handle = self:Play(vfxType, pos)
    local effect = self.activeEffects[handle]
    if effect then
        effect.targetNode = targetNode
        effect.attachOffset = offset
        effect.attach = attach ~= false
    end
    return handle
end

--- 更新所有特效
-- @param dt number
function VFXManager:Update(dt)
    for handle, effect in pairs(self.activeEffects) do
        if not effect.active then
            goto continue
        end

        effect.timer = effect.timer + dt
        local def = effect.definition
        local lifetime = def and def.lifetime or 0.5

        -- 跟随目标节点
        if effect.attach and effect.targetNode then
            local pos = Utils.GetNodeWorldPosition(effect.targetNode)
            if pos then
                effect.pos = Utils.Vec3Add(pos, effect.attachOffset or { x = 0.0, y = 0.0, z = 0.0 })
                if effect.node and type(effect.node.SetPosition) == "function" then
                    effect.node:SetPosition(effect.pos)
                end
            end
        end

        -- 超时销毁（非循环特效）
        if effect.timer >= lifetime and not (def and def.loop) then
            self:_ReleaseEffect(effect)
            self.activeEffects[handle] = nil
        end
        ::continue::
    end
end

--- 清除所有活跃特效
function VFXManager:ClearAll()
    for handle, effect in pairs(self.activeEffects) do
        self:_ReleaseEffect(effect)
    end
    self.activeEffects = {}
end

--- 战斗中命中时的一站式演出调用
-- @param attacker any 攻击者节点
-- @param target any 受击者节点
-- @param damageEvent table 伤害事件
-- @param result table 伤害结果
function VFXManager:OnCombatHit(attacker, target, damageEvent, result)
    if not target then
        return
    end

    local targetPos = Utils.GetNodeWorldPosition(target)
    if not targetPos then
        return
    end
    local hitPos = {
        x = targetPos.x,
        y = targetPos.y + 1.0,
        z = targetPos.z,
    }

    -- 基础命中火花
    self:Play(VFX_TYPE_HIT_SPARK, hitPos)

    -- 元素特效
    local element = damageEvent.element
    if element then
        if element == "fire" then
            self:Play(VFX_TYPE_ELEMENT_FIRE, hitPos)
        elseif element == "ice" then
            self:Play(VFX_TYPE_ELEMENT_ICE, hitPos)
        elseif element == "thunder" then
            self:Play(VFX_TYPE_ELEMENT_THUNDER, hitPos)
        end
    end

    -- 暴击额外特效
    if result and result.isCrit then
        self:Play(VFX_TYPE_QI_AURA, hitPos, nil, 2.0)
    end

    -- 受击反应对应特效
    local reaction = damageEvent.reaction
    if reaction == "knockback" or reaction == "knockdown" or reaction == "launch" then
        self:Play(VFX_TYPE_DUST_KICKUP, { x = targetPos.x, y = targetPos.y, z = targetPos.z })
    end
end

--- 格挡成功特效
-- @param blocker any 格挡者节点
function VFXManager:OnBlockSuccess(blocker)
    local pos = Utils.GetNodeWorldPosition(blocker)
    if pos then
        self:Play(VFX_TYPE_BLOCK_SPARK, { x = pos.x, y = pos.y + 1.2, z = pos.z })
    end
end

--- 闪避特效
-- @param dodger any 闪避者节点
function VFXManager:OnDodge(dodger)
    local pos = Utils.GetNodeWorldPosition(dodger)
    if pos then
        self:Play(VFX_TYPE_DODGE_GHOST, { x = pos.x, y = pos.y + 0.5, z = pos.z })
    end
end

--- 武器轨迹
-- @param owner any 持武器者节点
-- @param startPos table
-- @param endPos table
function VFXManager:WeaponTrail(owner, startPos, endPos)
    local midPos = {
        x = (startPos.x + endPos.x) * 0.5,
        y = (startPos.y + endPos.y) * 0.5,
        z = (startPos.z + endPos.z) * 0.5,
    }
    self:Play(VFX_TYPE_WEAPON_TRAIL, midPos)
end

M.VFXManager = VFXManager
M.VFX_TYPE_HIT_SPARK = VFX_TYPE_HIT_SPARK
M.VFX_TYPE_BLOOD_SPRAY = VFX_TYPE_BLOOD_SPRAY
M.VFX_TYPE_BLOCK_SPARK = VFX_TYPE_BLOCK_SPARK
M.VFX_TYPE_DODGE_GHOST = VFX_TYPE_DODGE_GHOST
M.VFX_TYPE_ELEMENT_FIRE = VFX_TYPE_ELEMENT_FIRE
M.VFX_TYPE_ELEMENT_ICE = VFX_TYPE_ELEMENT_ICE
M.VFX_TYPE_ELEMENT_THUNDER = VFX_TYPE_ELEMENT_THUNDER
M.VFX_TYPE_DUST_KICKUP = VFX_TYPE_DUST_KICKUP
M.VFX_TYPE_WEAPON_TRAIL = VFX_TYPE_WEAPON_TRAIL
M.VFX_TYPE_QI_AURA = VFX_TYPE_QI_AURA

return M
