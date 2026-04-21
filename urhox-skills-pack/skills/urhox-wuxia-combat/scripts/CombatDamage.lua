-- CombatDamage.lua
-- 武侠战斗伤害结算与受击反馈模块
-- 处理伤害公式、属性克制、硬直/击退/霸体判定、暴击与闪避

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local DAMAGE_TYPE_PHYSICAL = "physical"
local DAMAGE_TYPE_INTERNAL = "internal"
local DAMAGE_TYPE_POISON = "poison"
local DAMAGE_TYPE_TRUE = "true"

local REACTION_NONE = "none"
local REACTION_HIT_STUN = "hit_stun"
local REACTION_KNOCKBACK = "knockback"
local REACTION_KNOCKDOWN = "knockdown"
local REACTION_LAUNCH = "launch"

local ELEMENT_NONE = "none"
local ELEMENT_FIRE = "fire"
local ELEMENT_ICE = "ice"
local ELEMENT_THUNDER = "thunder"

-- ============================================================================
-- DamageCalculator 伤害计算器
-- ============================================================================

local DamageCalculator = {}
DamageCalculator.__index = DamageCalculator

--- 创建伤害计算器
-- @return DamageCalculator
function DamageCalculator.New()
    local self = setmetatable({}, DamageCalculator)
    self.critMultiplier = 1.5
    self.blockReduction = 0.5
    self.defenseFactor = 100.0
    self.elementMatrix = {
        [ELEMENT_FIRE]  = { [ELEMENT_ICE] = 1.2, [ELEMENT_THUNDER] = 0.9 },
        [ELEMENT_ICE]   = { [ELEMENT_THUNDER] = 1.2, [ELEMENT_FIRE] = 0.9 },
        [ELEMENT_THUNDER] = { [ELEMENT_FIRE] = 1.2, [ELEMENT_ICE] = 0.9 },
    }
    return self
end

--- 计算最终伤害
-- @param attacker CombatAttributes 攻击者属性
-- @param defender CombatAttributes 防御者属性
-- @param baseDamage number 基础伤害值
-- @param damageType string 伤害类型
-- @param element string|nil 元素属性
-- @return table { finalDamage, isCrit, isDodged, reaction }
function DamageCalculator:Calculate(attacker, defender, baseDamage, damageType, element)
    attacker = attacker or {}
    defender = defender or {}
    baseDamage = baseDamage or 0.0
    damageType = damageType or DAMAGE_TYPE_PHYSICAL
    element = element or ELEMENT_NONE

    -- 提取属性（不存在则默认0）
    local atk = attacker.attack or 0.0
    local critRate = attacker.critRate or 0.0
    local critDmg = attacker.critDamage or self.critMultiplier
    local def = defender.defense or 0.0
    local dodgeRate = defender.dodgeRate or 0.0
    local resistance = defender.resistance or 0.0

    -- 闪避判定
    local isDodged = false
    if dodgeRate > 0.0 then
        isDodged = math.random() < dodgeRate
    end
    if isDodged then
        return { finalDamage = 0.0, isCrit = false, isDodged = true, reaction = REACTION_NONE }
    end

    -- 基础伤害
    local finalDamage = baseDamage + atk

    -- 防御减伤（真实伤害跳过）
    if damageType ~= DAMAGE_TYPE_TRUE then
        local reduction = def / (def + self.defenseFactor)
        finalDamage = finalDamage * (1.0 - reduction)
    end

    -- 内伤/毒素的特殊倍率
    if damageType == DAMAGE_TYPE_INTERNAL then
        finalDamage = finalDamage * 1.2 -- 内功破防
    elseif damageType == DAMAGE_TYPE_POISON then
        finalDamage = finalDamage * 0.8 -- 毒素被抗性削弱
        local poisonRes = defender.poisonResistance or 0.0
        finalDamage = finalDamage * (1.0 - poisonRes)
    end

    -- 元素克制
    if element ~= ELEMENT_NONE and self.elementMatrix[element] then
        local defenderElement = defender.element or ELEMENT_NONE
        local multiplier = self.elementMatrix[element][defenderElement] or 1.0
        finalDamage = finalDamage * multiplier
    end

    -- 暴击判定
    local isCrit = false
    if critRate > 0.0 then
        isCrit = math.random() < critRate
    end
    if isCrit then
        finalDamage = finalDamage * critDmg
    end

    -- 抗性最终削减（通用）
    finalDamage = finalDamage * (1.0 - resistance)

    -- 保底伤害
    if finalDamage < 1.0 and damageType ~= DAMAGE_TYPE_TRUE then
        finalDamage = 1.0
    end

    return {
        finalDamage = math.floor(finalDamage + 0.5),
        isCrit = isCrit,
        isDodged = false,
        reaction = REACTION_HIT_STUN,
    }
end

--- 设置元素克制矩阵
-- @param matrix table
function DamageCalculator:SetElementMatrix(matrix)
    self.elementMatrix = matrix
end

M.DamageCalculator = DamageCalculator
M.DAMAGE_TYPE_PHYSICAL = DAMAGE_TYPE_PHYSICAL
M.DAMAGE_TYPE_INTERNAL = DAMAGE_TYPE_INTERNAL
M.DAMAGE_TYPE_POISON = DAMAGE_TYPE_POISON
M.DAMAGE_TYPE_TRUE = DAMAGE_TYPE_TRUE
M.REACTION_NONE = REACTION_NONE
M.REACTION_HIT_STUN = REACTION_HIT_STUN
M.REACTION_KNOCKBACK = REACTION_KNOCKBACK
M.REACTION_KNOCKDOWN = REACTION_KNOCKDOWN
M.REACTION_LAUNCH = REACTION_LAUNCH
M.ELEMENT_NONE = ELEMENT_NONE
M.ELEMENT_FIRE = ELEMENT_FIRE
M.ELEMENT_ICE = ELEMENT_ICE
M.ELEMENT_THUNDER = ELEMENT_THUNDER

-- ============================================================================
-- CombatDealer 战斗结算执行器
-- ============================================================================

local CombatDealer = {}
CombatDealer.__index = CombatDealer

--- 创建战斗结算执行器
-- @param hitboxManager HitboxManager
-- @param fsm WuxiaStateMachine（可选，用于触发受击打断）
-- @return CombatDealer
function CombatDealer.New(hitboxManager, fsm)
    local self = setmetatable({}, CombatDealer)
    self.damageCalculator = DamageCalculator.New()
    self.hitboxManager = hitboxManager
    self.fsm = fsm
    self.onHit = nil
    self.onKill = nil
    self.onDodge = nil
    self.onBlock = nil
    self.worldUp = { x = 0.0, y = 1.0, z = 0.0 }
    return self
end

--- 执行一次命中结算
-- @param hitbox table 命中框
-- @param hurtbox table 受击框
-- @param damageEvent table
function CombatDealer:ApplyHit(hitbox, hurtbox, damageEvent)
    if not hurtbox or not hurtbox.node then
        return
    end
    local target = hurtbox.node
    local attacker = hitbox.owner

    local baseDamage = damageEvent.baseDamage or 10.0
    local damageType = damageEvent.damageType or DAMAGE_TYPE_PHYSICAL
    local element = damageEvent.element or ELEMENT_NONE
    local interruptLevel = damageEvent.interruptLevel or 15
    local reaction = damageEvent.reaction or REACTION_HIT_STUN
    local knockbackForce = damageEvent.knockbackForce or 0.0
    local blockable = (damageEvent.blockable ~= false)
    local critEnabled = (damageEvent.canCrit ~= false)

    -- 获取攻防属性（若节点挂载了 CombatAttributes 组件/表）
    local attackerAttrs = self:_ExtractAttributes(attacker)
    local defenderAttrs = self:_ExtractAttributes(target)

    if not critEnabled then
        attackerAttrs.critRate = 0.0
    end

    local result = self.damageCalculator:Calculate(attackerAttrs, defenderAttrs, baseDamage, damageType, element)

    if result.isDodged then
        self:TriggerDodgeEffect(target)
        if type(self.onDodge) == "function" then
            self.onDodge(attacker, target, damageEvent)
        end
        return
    end

    -- 扣除血量（若节点有 health / maxHealth 字段）
    self:_ApplyDamageToHealth(target, result.finalDamage)

    -- 受击反馈判定：击退方向与力道
    if reaction ~= REACTION_NONE and knockbackForce > 0.0 then
        local dir = self:_CalcKnockbackDir(attacker, target, reaction)
        self:_ApplyKnockback(target, dir, knockbackForce, reaction)
    end

    -- 触发被击者的状态机打断
    local fsm = self:_ExtractFSM(target)
    if fsm then
        local hitEvent = {
            attacker = attacker,
            damage = result.finalDamage,
            damageType = damageType,
            interruptLevel = interruptLevel,
            knockdown = (reaction == REACTION_KNOCKDOWN or reaction == REACTION_LAUNCH),
            blockable = blockable,
            reaction = reaction,
        }
        fsm:TakeHit(hitEvent)
    end

    -- 命中特效与回调
    self:TriggerHitEffect(target, reaction, result.isCrit)
    if type(self.onHit) == "function" then
        self.onHit(attacker, target, result, damageEvent)
    end

    -- 击杀判定
    if self:_IsDead(target) and type(self.onKill) == "function" then
        self.onKill(attacker, target, damageEvent)
    end
end

--- 尝试从节点提取战斗属性表
-- @param node any
-- @return table
function CombatDealer:_ExtractAttributes(node)
    if not node then
        return {}
    end
    if node.combatAttrs then
        return node.combatAttrs
    end
    if type(node.GetVar) == "function" then
        local attrs = node:GetVar("CombatAttributes")
        if type(attrs) == "table" then
            return attrs
        end
    end
    return {}
end

--- 尝试从节点提取状态机
-- @param node any
-- @return WuxiaStateMachine|nil
function CombatDealer:_ExtractFSM(node)
    if not node then
        return nil
    end
    if node.wuxiaFSM then
        return node.wuxiaFSM
    end
    if type(node.GetVar) == "function" then
        local fsm = node:GetVar("WuxiaFSM")
        if fsm then
            return fsm
        end
    end
    return nil
end

--- 对目标应用伤害
-- @param node any
-- @param damage number
function CombatDealer:_ApplyDamageToHealth(node, damage)
    if not node then
        return
    end
    local hp = node.health
    if hp == nil then
        return
    end
    node.health = math.max(0.0, hp - damage)
end

--- 检查目标是否已死亡
-- @param node any
-- @return boolean
function CombatDealer:_IsDead(node)
    if not node then
        return false
    end
    local hp = node.health
    local maxHp = node.maxHealth
    if hp ~= nil and maxHp ~= nil then
        return hp <= 0.0
    end
    return false
end

--- 计算击退方向
-- @param attacker any
-- @param target any
-- @param reaction string
-- @return table 方向向量
function CombatDealer:_CalcKnockbackDir(attacker, target, reaction)
    local targetPos = Utils.GetNodeWorldPosition(target)
    local attackerPos = Utils.GetNodeWorldPosition(attacker)
    local dir = Utils.Vec3Sub(targetPos, attackerPos)
    dir.y = 0.0
    dir = Utils.Vec3Normalize(dir)

    if reaction == REACTION_LAUNCH then
        dir.y = 1.0
        dir = Utils.Vec3Normalize(dir)
    elseif reaction == REACTION_KNOCKDOWN then
        dir.y = -0.2
        dir = Utils.Vec3Normalize(dir)
    end
    return dir
end

--- 应用物理击退效果
-- @param target any
-- @param dir table
-- @param force number
-- @param reaction string
function CombatDealer:_ApplyKnockback(target, dir, force, reaction)
    if not target then
        return
    end
    local impulse = Utils.Vec3Scale(dir, force)
    Utils.ApplyImpulseSafe(target, impulse)

    -- 播放对应动画
    if reaction == REACTION_HIT_STUN then
        Utils.PlayAnimationSafe(target, "anim_hit_stun", false)
    elseif reaction == REACTION_KNOCKBACK then
        Utils.PlayAnimationSafe(target, "anim_knockback", false)
    elseif reaction == REACTION_KNOCKDOWN then
        Utils.PlayAnimationSafe(target, "anim_knockdown", false)
    elseif reaction == REACTION_LAUNCH then
        Utils.PlayAnimationSafe(target, "anim_launch", false)
    end
end

--- 触发闪避特效（占位，实际项目中换为粒子/音效）
-- @param target any
function CombatDealer:TriggerDodgeEffect(target)
    if target and type(target.GetName) == "function" then
        -- print("[DODGE] " .. target:GetName() .. " 闪避了攻击！")
    end
end

--- 触发命中特效
-- @param target any
-- @param reaction string
-- @param isCrit boolean
function CombatDealer:TriggerHitEffect(target, reaction, isCrit)
    if target and type(target.GetName) == "function" then
        -- 实际项目中可在此处触发血溅、音效、屏幕震动等
    end
end

--- 设置命中回调
-- @param callback function(attacker, target, result, damageEvent)
function CombatDealer:SetOnHit(callback)
    self.onHit = callback
end

--- 设置击杀回调
-- @param callback function(attacker, target, damageEvent)
function CombatDealer:SetOnKill(callback)
    self.onKill = callback
end

--- 设置闪避回调
-- @param callback function(attacker, target, damageEvent)
function CombatDealer:SetOnDodge(callback)
    self.onDodge = callback
end

--- 启动自动命中检测（应在 Update 中调用）
-- @param dt number
function CombatDealer:Update(dt)
    if not self.hitboxManager then
        return
    end
    local function onHitCallback(hitbox, hurtbox, damageEvent)
        self:ApplyHit(hitbox, hurtbox, damageEvent)
    end
    self.hitboxManager:Update(dt, onHitCallback)
end

M.CombatDealer = CombatDealer

-- ============================================================================
-- CombatAttributes 战斗属性快速构建器
-- ============================================================================

--- 快速构建一套战斗属性表
-- @param opts table 可选字段覆盖
-- @return table
function M.CreateAttributes(opts)
    opts = opts or {}
    return {
        attack = opts.attack or 10.0,
        defense = opts.defense or 5.0,
        maxHealth = opts.maxHealth or 100.0,
        health = opts.health or (opts.maxHealth or 100.0),
        critRate = opts.critRate or 0.05,
        critDamage = opts.critDamage or 1.5,
        dodgeRate = opts.dodgeRate or 0.02,
        resistance = opts.resistance or 0.0,
        poisonResistance = opts.poisonResistance or 0.0,
        element = opts.element or ELEMENT_NONE,
    }
end

return M
