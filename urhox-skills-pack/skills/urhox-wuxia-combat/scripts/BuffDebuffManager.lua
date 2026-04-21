-- BuffDebuffManager.lua
-- 武侠战斗 Buff/Debuff 管理器
-- 处理中毒、内伤、点穴、气血沸腾、护体真气等武侠特有的状态效果

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local STATUS_TYPE_BUFF = "buff"
local STATUS_TYPE_DEBUFF = "debuff"
local STATUS_TYPE_NEUTRAL = "neutral"

local TICK_MODE_SECONDS = "seconds"
local TICK_MODE_FRAMES = "frames"

-- 内置武侠状态效果 ID
local BUFF_ID_QI_SHIELD = "buff_qi_shield"           -- 护体真气：减伤
local BUFF_ID_BLOOD_BOIL = "buff_blood_boil"         -- 气血沸腾：加攻
local BUFF_ID_MEDITATION = "buff_meditation"         -- 打坐调息：回内力
local BUFF_ID_IRON_BODY = "buff_iron_body"           -- 金刚不坏：霸体
local DEBUFF_ID_POISON = "debuff_poison"             -- 中毒：持续扣血
local DEBUFF_ID_INTERNAL_INJURY = "debuff_internal"  -- 内伤：减攻减防
local DEBUFF_ID_ACUPRESSURE = "debuff_acupressure"   -- 点穴：定身/沉默
local DEBUFF_ID_SLOW = "debuff_slow"                 -- 迟缓：减速

-- ============================================================================
-- StatusEffect 数据结构
-- ============================================================================

local function CreateStatusEffect(id, name, statusType, duration, tickInterval)
    return {
        id = id,
        name = name or id,
        statusType = statusType or STATUS_TYPE_NEUTRAL,
        duration = duration or 5.0,
        remaining = duration or 5.0,
        tickInterval = tickInterval or 1.0,
        tickTimer = 0.0,
        stacks = 1,
        maxStacks = 1,
        params = {},      -- 自定义参数
        onApply = nil,    -- function(owner, effect)
        onTick = nil,     -- function(owner, effect)
        onRemove = nil,   -- function(owner, effect)
        source = nil,     -- 施加者
    }
end

-- ============================================================================
-- BuffDebuffManager 类
-- ============================================================================

local BuffDebuffManager = {}
BuffDebuffManager.__index = BuffDebuffManager

--- 创建 Buff/Debuff 管理器
-- @param owner table 所属战斗单元
-- @return BuffDebuffManager
function BuffDebuffManager.New(owner)
    local self = setmetatable({}, BuffDebuffManager)
    self.owner = owner
    self.effects = {}        -- 当前生效的效果列表
    self.effectDict = {}     -- key = effectId, value = effect
    self.definitions = {}    -- 效果定义库
    self.onEffectApply = nil
    self.onEffectRemove = nil
    self.onEffectTick = nil
    self:_RegisterDefaults()
    return self
end

--- 注册默认武侠状态效果定义
function BuffDebuffManager:_RegisterDefaults()
    -- 护体真气：减少 20% 受到的伤害
    self.definitions[BUFF_ID_QI_SHIELD] = {
        name = "护体真气",
        statusType = STATUS_TYPE_BUFF,
        maxStacks = 3,
        params = { damageReduction = 0.20 },
        onApply = function(owner, effect)
            if owner and type(owner.SetVar) == "function" then
                owner:SetVar("HasQiShield", true)
            end
        end,
        onRemove = function(owner, effect)
            if owner and type(owner.SetVar) == "function" then
                owner:SetVar("HasQiShield", false)
            end
        end,
    }

    -- 气血沸腾：攻击力提升 15%
    self.definitions[BUFF_ID_BLOOD_BOIL] = {
        name = "气血沸腾",
        statusType = STATUS_TYPE_BUFF,
        maxStacks = 5,
        params = { attackBonus = 0.15 },
    }

    -- 打坐调息：每秒回复 5 点内力
    self.definitions[BUFF_ID_MEDITATION] = {
        name = "调息",
        statusType = STATUS_TYPE_BUFF,
        maxStacks = 1,
        tickInterval = 1.0,
        params = { internalForceRegen = 5.0 },
        onTick = function(owner, effect)
            if owner and owner.internalForce ~= nil and owner.maxInternalForce ~= nil then
                local regen = effect.params.internalForceRegen or 5.0
                owner.internalForce = math.min(owner.maxInternalForce, owner.internalForce + regen)
            end
        end,
    }

    -- 金刚不坏：获得霸体状态
    self.definitions[BUFF_ID_IRON_BODY] = {
        name = "金刚不坏",
        statusType = STATUS_TYPE_BUFF,
        maxStacks = 1,
        onApply = function(owner, effect)
            if owner and owner.wuxiaFSM then
                owner.wuxiaFSM:EnableSuperArmor()
            end
        end,
        onRemove = function(owner, effect)
            if owner and owner.wuxiaFSM then
                owner.wuxiaFSM:DisableSuperArmor()
            end
        end,
    }

    -- 中毒：每秒损失 3 点生命，可叠加
    self.definitions[DEBUFF_ID_POISON] = {
        name = "中毒",
        statusType = STATUS_TYPE_DEBUFF,
        maxStacks = 10,
        tickInterval = 1.0,
        params = { damagePerTick = 3.0 },
        onTick = function(owner, effect)
            if owner and owner.health ~= nil then
                local dmg = (effect.params.damagePerTick or 3.0) * effect.stacks
                owner.health = math.max(0.0, owner.health - dmg)
            end
        end,
    }

    -- 内伤：攻击力和防御力降低 10%
    self.definitions[DEBUFF_ID_INTERNAL_INJURY] = {
        name = "内伤",
        statusType = STATUS_TYPE_DEBUFF,
        maxStacks = 5,
        params = { attackPenalty = 0.10, defensePenalty = 0.10 },
    }

    -- 点穴：无法移动和攻击（定身+沉默）
    self.definitions[DEBUFF_ID_ACUPRESSURE] = {
        name = "点穴",
        statusType = STATUS_TYPE_DEBUFF,
        maxStacks = 1,
        onApply = function(owner, effect)
            if owner and type(owner.SetVar) == "function" then
                owner:SetVar("Silenced", true)
                owner:SetVar("Rooted", true)
            end
        end,
        onRemove = function(owner, effect)
            if owner and type(owner.SetVar) == "function" then
                owner:SetVar("Silenced", false)
                owner:SetVar("Rooted", false)
            end
        end,
    }

    -- 迟缓：移动速度降低 30%
    self.definitions[DEBUFF_ID_SLOW] = {
        name = "迟缓",
        statusType = STATUS_TYPE_DEBUFF,
        maxStacks = 3,
        params = { speedReduction = 0.30 },
    }
end

--- 注册自定义状态效果定义
-- @param id string
-- @param definition table
function BuffDebuffManager:RegisterDefinition(id, definition)
    self.definitions[id] = Utils.DeepCopy(definition)
end

--- 对 owner 施加一个状态效果
-- @param effectId string 效果定义 ID
-- @param source any 施加者
-- @param duration number|nil 持续时间（覆盖默认值）
-- @param stacks number|nil 初始层数
-- @return boolean 是否成功施加
function BuffDebuffManager:Apply(effectId, source, duration, stacks)
    local def = self.definitions[effectId]
    if not def then
        return false
    end

    stacks = stacks or 1
    duration = duration or def.defaultDuration or 5.0

    local existing = self.effectDict[effectId]
    if existing then
        -- 刷新持续时间
        existing.remaining = duration
        -- 叠加层数
        local maxStacks = def.maxStacks or 1
        existing.stacks = math.min(maxStacks, existing.stacks + stacks)
        return true
    end

    local effect = CreateStatusEffect(effectId, def.name, def.statusType, duration, def.tickInterval)
    effect.stacks = stacks
    effect.params = Utils.DeepCopy(def.params or {})
    effect.onApply = def.onApply
    effect.onTick = def.onTick
    effect.onRemove = def.onRemove
    effect.source = source

    if type(effect.onApply) == "function" then
        effect.onApply(self.owner, effect)
    end

    table.insert(self.effects, effect)
    self.effectDict[effectId] = effect

    if type(self.onEffectApply) == "function" then
        self.onEffectApply(self.owner, effect)
    end

    return true
end

--- 移除指定状态效果
-- @param effectId string
function BuffDebuffManager:Remove(effectId)
    local effect = self.effectDict[effectId]
    if not effect then
        return
    end

    if type(effect.onRemove) == "function" then
        effect.onRemove(self.owner, effect)
    end

    self.effectDict[effectId] = nil
    for i, e in ipairs(self.effects) do
        if e == effect then
            table.remove(self.effects, i)
            break
        end
    end

    if type(self.onEffectRemove) == "function" then
        self.onEffectRemove(self.owner, effect)
    end
end

--- 检查是否拥有指定效果
-- @param effectId string
-- @return boolean
function BuffDebuffManager:Has(effectId)
    return self.effectDict[effectId] ~= nil
end

--- 获取效果的当前层数
-- @param effectId string
-- @return number
function BuffDebuffManager:GetStacks(effectId)
    local effect = self.effectDict[effectId]
    return effect and effect.stacks or 0
end

--- 获取所有当前效果的快照
-- @return table
function BuffDebuffManager:GetAllEffects()
    return Utils.DeepCopy(self.effects)
end

--- 计算属性修正值（供战斗结算调用）
-- @param baseAttr string 属性名，如 "attack", "defense", "moveSpeed"
-- @param baseValue number 基础值
-- @return number 修正后的值
function BuffDebuffManager:ModifyAttribute(baseAttr, baseValue)
    local multiplier = 1.0
    local flatBonus = 0.0

    for _, effect in ipairs(self.effects) do
        local def = self.definitions[effect.id]
        if not def then
            goto continue
        end

        local params = effect.params or {}
        local stacks = effect.stacks

        if baseAttr == "attack" then
            if params.attackBonus then
                multiplier = multiplier + (params.attackBonus * stacks)
            end
            if params.attackPenalty then
                multiplier = multiplier - (params.attackPenalty * stacks)
            end
        elseif baseAttr == "defense" then
            if params.defenseBonus then
                multiplier = multiplier + (params.defenseBonus * stacks)
            end
            if params.defensePenalty then
                multiplier = multiplier - (params.defensePenalty * stacks)
            end
        elseif baseAttr == "moveSpeed" then
            if params.speedReduction then
                multiplier = multiplier - (params.speedReduction * stacks)
            end
            if params.speedBonus then
                multiplier = multiplier + (params.speedBonus * stacks)
            end
        elseif baseAttr == "damageTaken" then
            if params.damageReduction then
                multiplier = multiplier - (params.damageReduction * stacks)
            end
            if params.damageAmplify then
                multiplier = multiplier + (params.damageAmplify * stacks)
            end
        end
        ::continue::
    end

    multiplier = math.max(0.0, multiplier)
    return baseValue * multiplier + flatBonus
end

--- 更新所有状态效果
-- @param dt number
function BuffDebuffManager:Update(dt)
    local i = 1
    while i <= #self.effects do
        local effect = self.effects[i]
        effect.remaining = effect.remaining - dt

        -- tick 处理
        if effect.tickInterval and effect.tickInterval > 0.0 then
            effect.tickTimer = effect.tickTimer + dt
            if effect.tickTimer >= effect.tickInterval then
                effect.tickTimer = effect.tickTimer - effect.tickInterval
                if type(effect.onTick) == "function" then
                    effect.onTick(self.owner, effect)
                end
                if type(self.onEffectTick) == "function" then
                    self.onEffectTick(self.owner, effect)
                end
            end
        end

        -- 到期移除
        if effect.remaining <= 0.0 then
            self:Remove(effect.id)
        else
            i = i + 1
        end
    end
end

--- 清除所有状态效果
-- @param statusType string|nil 仅清除指定类型（buff/debuff/neutral）
function BuffDebuffManager:ClearAll(statusType)
    local toRemove = {}
    for _, effect in ipairs(self.effects) do
        if not statusType or effect.statusType == statusType then
            table.insert(toRemove, effect.id)
        end
    end
    for _, id in ipairs(toRemove) do
        self:Remove(id)
    end
end

--- 驱散 debuff（如使用解药、运功疗伤）
function BuffDebuffManager:DispelDebuffs()
    self:ClearAll(STATUS_TYPE_DEBUFF)
end

M.BuffDebuffManager = BuffDebuffManager
M.STATUS_TYPE_BUFF = STATUS_TYPE_BUFF
M.STATUS_TYPE_DEBUFF = STATUS_TYPE_DEBUFF
M.STATUS_TYPE_NEUTRAL = STATUS_TYPE_NEUTRAL
M.BUFF_ID_QI_SHIELD = BUFF_ID_QI_SHIELD
M.BUFF_ID_BLOOD_BOIL = BUFF_ID_BLOOD_BOIL
M.BUFF_ID_MEDITATION = BUFF_ID_MEDITATION
M.BUFF_ID_IRON_BODY = BUFF_ID_IRON_BODY
M.DEBUFF_ID_POISON = DEBUFF_ID_POISON
M.DEBUFF_ID_INTERNAL_INJURY = DEBUFF_ID_INTERNAL_INJURY
M.DEBUFF_ID_ACUPRESSURE = DEBUFF_ID_ACUPRESSURE
M.DEBUFF_ID_SLOW = DEBUFF_ID_SLOW

return M
