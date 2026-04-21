-- SkillDatabase.lua
-- 武侠技能数据库
-- 包含普攻、重击、特殊技、闪避、格挡等动作的预设配置，可直接扩展更多门派招式

local Utils = require("scripts/CombatUtils")
local Damage = require("scripts/CombatDamage")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local SKILL_ID_LIGHT_1 = "light_1"
local SKILL_ID_LIGHT_2 = "light_2"
local SKILL_ID_LIGHT_3 = "light_3"
local SKILL_ID_HEAVY_1 = "heavy_1"
local SKILL_ID_SPECIAL_DRAGON_PALM = "special_dragon_palm"
local SKILL_ID_DODGE = "dodge"
local SKILL_ID_BLOCK = "block"
local SKILL_ID_PARRY = "parry"

-- ============================================================================
-- 默认技能库
-- ============================================================================

local DEFAULT_SKILLS = {
    [SKILL_ID_LIGHT_1] = {
        id = SKILL_ID_LIGHT_1,
        name = "平砍",
        nameEn = "Light Attack 1",
        description = "最基础的剑招/掌法，起手快，伤害一般",
        animation = "anim_light_1",
        stateName = "light_1",
        totalFrames = 20,
        startupFrames = 6,
        activeFrames = 6,
        recoveryFrames = 8,
        comboWindowOpenFrame = 10,
        comboWindowCloseFrame = 16,
        cancelable = false,
        hitboxList = {
            {
                shape = "fan",
                offset = { x = 0.0, y = 1.0, z = 1.2 },
                params = { radius = 2.0, angleSpan = 90.0, yawOffset = 0.0 },
                lifetime = 0.15,
                maxHits = 3,
            },
        },
        damageEvent = {
            baseDamage = 12.0,
            damageType = Damage.DAMAGE_TYPE_PHYSICAL,
            interruptLevel = 15,
            reaction = Damage.REACTION_HIT_STUN,
            knockbackForce = 3.0,
            blockable = true,
            canCrit = true,
        },
        cooldown = 0.0,
        cost = { stamina = 5.0 },
        priority = 15,
    },
    [SKILL_ID_LIGHT_2] = {
        id = SKILL_ID_LIGHT_2,
        name = "连斩",
        nameEn = "Light Attack 2",
        description = "第二段轻攻击，范围略广",
        animation = "anim_light_2",
        stateName = "light_2",
        totalFrames = 22,
        startupFrames = 5,
        activeFrames = 8,
        recoveryFrames = 9,
        comboWindowOpenFrame = 12,
        comboWindowCloseFrame = 18,
        cancelable = false,
        hitboxList = {
            {
                shape = "fan",
                offset = { x = 0.0, y = 1.0, z = 1.3 },
                params = { radius = 2.2, angleSpan = 100.0, yawOffset = 0.0 },
                lifetime = 0.18,
                maxHits = 4,
            },
        },
        damageEvent = {
            baseDamage = 15.0,
            damageType = Damage.DAMAGE_TYPE_PHYSICAL,
            interruptLevel = 15,
            reaction = Damage.REACTION_HIT_STUN,
            knockbackForce = 4.0,
            blockable = true,
            canCrit = true,
        },
        cooldown = 0.0,
        cost = { stamina = 6.0 },
        priority = 15,
    },
    [SKILL_ID_LIGHT_3] = {
        id = SKILL_ID_LIGHT_3,
        name = "收招",
        nameEn = "Light Attack 3",
        description = "三段轻攻击终结技，伤害最高但收招硬直大",
        animation = "anim_light_3",
        stateName = "light_3",
        totalFrames = 30,
        startupFrames = 6,
        activeFrames = 10,
        recoveryFrames = 14,
        comboWindowOpenFrame = 0, -- 终结技不开放连招窗口
        comboWindowCloseFrame = 0,
        cancelable = false,
        hitboxList = {
            {
                shape = "box",
                offset = { x = 0.0, y = 1.0, z = 1.5 },
                params = { halfSize = { x = 0.8, y = 1.0, z = 1.2 }, yawOffset = 0.0 },
                lifetime = 0.22,
                maxHits = 5,
            },
        },
        damageEvent = {
            baseDamage = 28.0,
            damageType = Damage.DAMAGE_TYPE_PHYSICAL,
            interruptLevel = 20,
            reaction = Damage.REACTION_KNOCKBACK,
            knockbackForce = 8.0,
            blockable = true,
            canCrit = true,
        },
        cooldown = 0.0,
        cost = { stamina = 10.0 },
        priority = 15,
    },
    [SKILL_ID_HEAVY_1] = {
        id = SKILL_ID_HEAVY_1,
        name = "重劈",
        nameEn = "Heavy Attack",
        description = "蓄力重击，前摇大但破防能力强，可打断轻攻击",
        animation = "anim_heavy_1",
        stateName = "heavy_1",
        totalFrames = 45,
        startupFrames = 18,
        activeFrames = 10,
        recoveryFrames = 17,
        comboWindowOpenFrame = 32,
        comboWindowCloseFrame = 40,
        cancelable = false,
        hitboxList = {
            {
                shape = "box",
                offset = { x = 0.0, y = 1.0, z = 1.8 },
                params = { halfSize = { x = 1.0, y = 1.2, z = 1.8 }, yawOffset = 0.0 },
                lifetime = 0.25,
                maxHits = 4,
            },
        },
        damageEvent = {
            baseDamage = 45.0,
            damageType = Damage.DAMAGE_TYPE_PHYSICAL,
            interruptLevel = 30,
            reaction = Damage.REACTION_KNOCKBACK,
            knockbackForce = 12.0,
            blockable = true,
            canCrit = true,
        },
        cooldown = 1.5,
        cost = { stamina = 20.0 },
        priority = 25,
        superArmorStartup = true, -- 蓄力期间带霸体
    },
    [SKILL_ID_SPECIAL_DRAGON_PALM] = {
        id = SKILL_ID_SPECIAL_DRAGON_PALM,
        name = "降龙掌",
        nameEn = "Dragon Palm",
        description = "绝世掌法，范围巨大，带火属性伤害与击飞",
        animation = "anim_special_dragon_palm",
        stateName = "special",
        totalFrames = 60,
        startupFrames = 20,
        activeFrames = 15,
        recoveryFrames = 25,
        comboWindowOpenFrame = 0,
        comboWindowCloseFrame = 0,
        cancelable = false,
        hitboxList = {
            {
                shape = "sphere",
                offset = { x = 0.0, y = 1.2, z = 3.0 },
                params = { radius = 3.5 },
                lifetime = 0.35,
                maxHits = 8,
            },
            {
                shape = "line",
                offset = { x = 0.0, y = 1.0, z = 1.0 },
                params = { length = 5.0, thickness = 1.5, yawOffset = 0.0 },
                lifetime = 0.35,
                maxHits = 4,
            },
        },
        damageEvent = {
            baseDamage = 80.0,
            damageType = Damage.DAMAGE_TYPE_INTERNAL,
            element = Damage.ELEMENT_FIRE,
            interruptLevel = 50,
            reaction = Damage.REACTION_LAUNCH,
            knockbackForce = 18.0,
            blockable = false,
            canCrit = true,
        },
        cooldown = 8.0,
        cost = { stamina = 30.0, internalForce = 50.0 },
        priority = 35,
        superArmorStartup = true,
    },
    [SKILL_ID_DODGE] = {
        id = SKILL_ID_DODGE,
        name = "翻滚闪避",
        nameEn = "Dodge Roll",
        description = "向指定方向翻滚，翻滚中无敌",
        animation = "anim_dodge",
        stateName = "dodge",
        totalFrames = 24,
        startupFrames = 2,
        activeFrames = 16,
        recoveryFrames = 6,
        comboWindowOpenFrame = 0,
        comboWindowCloseFrame = 0,
        cancelable = true, -- 闪避可取消收招
        hitboxList = {},
        damageEvent = nil,
        cooldown = 0.8,
        cost = { stamina = 8.0 },
        priority = 5,
        invincible = true,
    },
    [SKILL_ID_BLOCK] = {
        id = SKILL_ID_BLOCK,
        name = "格挡",
        nameEn = "Block",
        description = "举剑/架掌防御，减少来自正面的伤害并触发霸体",
        animation = "anim_block",
        stateName = "block",
        totalFrames = 9999, -- 按住时保持
        startupFrames = 4,
        activeFrames = 9999,
        recoveryFrames = 8,
        comboWindowOpenFrame = 0,
        comboWindowCloseFrame = 0,
        cancelable = true,
        hitboxList = {},
        damageEvent = nil,
        cooldown = 0.0,
        cost = { stamina = 1.0 }, -- 每帧消耗可在外部 stamina drain 中实现
        priority = 10,
        superArmorStartup = true,
    },
    [SKILL_ID_PARRY] = {
        id = SKILL_ID_PARRY,
        name = "弹反",
        nameEn = "Parry",
        description = "在格挡后的极短时间内弹反，可打断对方并造成大硬直",
        animation = "anim_parry",
        stateName = "parry",
        totalFrames = 18,
        startupFrames = 2,
        activeFrames = 4,
        recoveryFrames = 12,
        comboWindowOpenFrame = 0,
        comboWindowCloseFrame = 0,
        cancelable = false,
        hitboxList = {
            {
                shape = "fan",
                offset = { x = 0.0, y = 1.0, z = 1.5 },
                params = { radius = 2.5, angleSpan = 120.0, yawOffset = 0.0 },
                lifetime = 0.12,
                maxHits = 3,
            },
        },
        damageEvent = {
            baseDamage = 5.0,
            damageType = Damage.DAMAGE_TYPE_TRUE,
            interruptLevel = 100,
            reaction = Damage.REACTION_HIT_STUN,
            knockbackForce = 0.0,
            blockable = false,
            canCrit = false,
        },
        cooldown = 1.2,
        cost = { stamina = 12.0 },
        priority = 10,
    },
}

-- ============================================================================
-- SkillDatabase 类
-- ============================================================================

local SkillDatabase = {}
SkillDatabase.__index = SkillDatabase

--- 创建技能数据库
-- @return SkillDatabase
function SkillDatabase.New()
    local self = setmetatable({}, SkillDatabase)
    self.skills = Utils.DeepCopy(DEFAULT_SKILLS)
    self.cooldowns = {} -- key = ownerId_skillId, value = remainTime
    return self
end

--- 注册新技能（或覆盖已有）
-- @param skillConfig table
function SkillDatabase:RegisterSkill(skillConfig)
    if not skillConfig or not skillConfig.id then
        return
    end
    self.skills[skillConfig.id] = Utils.DeepCopy(skillConfig)
end

--- 获取技能配置
-- @param skillId string
-- @return table|nil
function SkillDatabase:GetSkill(skillId)
    return self.skills[skillId]
end

--- 检查技能是否处于冷却中
-- @param ownerId string|number
-- @param skillId string
-- @return boolean
function SkillDatabase:IsOnCooldown(ownerId, skillId)
    local key = tostring(ownerId) .. "_" .. skillId
    local remain = self.cooldowns[key] or 0.0
    return remain > 0.0
end

--- 获取技能剩余冷却时间
-- @param ownerId string|number
-- @param skillId string
-- @return number
function SkillDatabase:GetCooldownRemain(ownerId, skillId)
    local key = tostring(ownerId) .. "_" .. skillId
    return self.cooldowns[key] or 0.0
end

--- 启动技能冷却
-- @param ownerId string|number
-- @param skillId string
function SkillDatabase:StartCooldown(ownerId, skillId)
    local skill = self.skills[skillId]
    if not skill then
        return
    end
    local cd = skill.cooldown or 0.0
    if cd <= 0.0 then
        return
    end
    local key = tostring(ownerId) .. "_" .. skillId
    self.cooldowns[key] = cd
end

--- 更新所有冷却计时
-- @param dt number
function SkillDatabase:Update(dt)
    for key, remain in pairs(self.cooldowns) do
        remain = remain - dt
        if remain <= 0.0 then
            self.cooldowns[key] = nil
        else
            self.cooldowns[key] = remain
        end
    end
end

--- 检查释放者是否有足够资源（体力、内力等）
-- @param owner table 通常是一个有 stamina/internalForce 字段的节点/组件
-- @param skillId string
-- @return boolean, string|nil
function SkillDatabase:CanAfford(owner, skillId)
    local skill = self.skills[skillId]
    if not skill then
        return false, "skill_not_found"
    end
    local cost = skill.cost or {}
    if cost.stamina then
        local current = (owner.stamina or 0.0)
        if current < cost.stamina then
            return false, "not_enough_stamina"
        end
    end
    if cost.internalForce then
        local current = (owner.internalForce or 0.0)
        if current < cost.internalForce then
            return false, "not_enough_internal_force"
        end
    end
    return true, nil
end

--- 扣除释放资源
-- @param owner table
-- @param skillId string
function SkillDatabase:ConsumeCost(owner, skillId)
    local skill = self.skills[skillId]
    if not skill then
        return
    end
    local cost = skill.cost or {}
    if cost.stamina and owner.stamina ~= nil then
        owner.stamina = math.max(0.0, owner.stamina - cost.stamina)
    end
    if cost.internalForce and owner.internalForce ~= nil then
        owner.internalForce = math.max(0.0, owner.internalForce - cost.internalForce)
    end
end

--- 获取所有技能ID列表
-- @return table
function SkillDatabase:GetAllSkillIds()
    local ids = {}
    for id, _ in pairs(self.skills) do
        table.insert(ids, id)
    end
    return ids
end

M.SkillDatabase = SkillDatabase
M.SKILL_ID_LIGHT_1 = SKILL_ID_LIGHT_1
M.SKILL_ID_LIGHT_2 = SKILL_ID_LIGHT_2
M.SKILL_ID_LIGHT_3 = SKILL_ID_LIGHT_3
M.SKILL_ID_HEAVY_1 = SKILL_ID_HEAVY_1
M.SKILL_ID_SPECIAL_DRAGON_PALM = SKILL_ID_SPECIAL_DRAGON_PALM
M.SKILL_ID_DODGE = SKILL_ID_DODGE
M.SKILL_ID_BLOCK = SKILL_ID_BLOCK
M.SKILL_ID_PARRY = SKILL_ID_PARRY

return M
