-- MartialStyle.lua
-- 武侠门派武学风格系统
-- 为不同门派（少林、武当、峨眉等）提供独特的战斗机制、招式加成与专属技能

local Utils = require("scripts/CombatUtils")
local SkillDatabase = require("scripts/SkillDatabase")
local Damage = require("scripts/CombatDamage")

local M = {}

-- ============================================================================
-- 常量定义：预设门派
-- ============================================================================

local STYLE_SHAOLIN = "shaolin"      -- 少林：高防御、霸体、拳掌
local STYLE_WUDANG = "wudang"        -- 武当：均衡、反伤、太极
local STYLE_EMEI = "emei"            -- 峨眉：速攻、连击、剑法
local STYLE_WTMO = "wudumo"          -- 五毒魔教：毒伤、控制、诡谲
local STYLE_HUASHAN = "huashan"      -- 华山：暴击、气劲、剑宗
local STYLE_XIAOYAO = "xiaoyao"      -- 逍遥：灵动、闪避、内力深厚

-- ============================================================================
-- MartialStyle 类
-- ============================================================================

local MartialStyle = {}
MartialStyle.__index = MartialStyle

--- 创建武学风格配置
-- @param styleId string 门派ID
-- @return MartialStyle
function MartialStyle.New(styleId)
    local self = setmetatable({}, MartialStyle)
    self.styleId = styleId or "none"
    self.name = "无门派"
    self.nameEn = "None"
    self.description = ""
    self.passives = {}          -- 被动效果列表
    self.skillModifiers = {}    -- 技能修正器 key = skillId
    self.uniqueSkills = {}      -- 专属技能配置表
    self:_InitByStyleId(styleId)
    return self
end

--- 根据门派 ID 初始化
function MartialStyle:_InitByStyleId(styleId)
    if styleId == STYLE_SHAOLIN then
        self.name = "少林"
        self.nameEn = "Shaolin"
        self.description = "金钟罩铁布衫，近身肉搏以拳掌见长，霸体招式众多。"
        self.passives = {
            { type = "damage_reduction", value = 0.15 },
            { type = "super_armor_bonus", value = 0.2 },
            { type = "stamina_regen", value = 1.2 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_HEAVY_1] = {
                damageMultiplier = 1.2,
                knockbackForceBonus = 5.0,
                superArmorStartup = true,
            },
        }
        self.uniqueSkills = {
            "special_lion_roar", "special_arhat_palm"
        }

    elseif styleId == STYLE_WUDANG then
        self.name = "武当"
        self.nameEn = "Wudang"
        self.description = "以柔克刚，后发先至，擅长格挡反击与内力续航。"
        self.passives = {
            { type = "block_damage_reflect", value = 0.2 },
            { type = "internal_force_regen", value = 2.0 },
            { type = "parry_window_bonus", value = 0.1 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_BLOCK] = {
                staminaCostReduction = 0.5,
            },
            [SkillDatabase.SKILL_ID_PARRY] = {
                damageMultiplier = 1.5,
            },
        }
        self.uniqueSkills = {
            "special_taichi_push", "special_sword_qi"
        }

    elseif styleId == STYLE_EMEI then
        self.name = "峨眉"
        self.nameEn = "Emei"
        self.description = "剑法轻灵，连招迅捷，女性弟子居多。"
        self.passives = {
            { type = "attack_speed", value = 0.15 },
            { type = "combo_window_bonus", value = 0.1 },
            { type = "crit_rate", value = 0.08 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_LIGHT_1] = { damageMultiplier = 1.1 },
            [SkillDatabase.SKILL_ID_LIGHT_2] = { damageMultiplier = 1.1 },
            [SkillDatabase.SKILL_ID_LIGHT_3] = { damageMultiplier = 1.15, hitboxScale = 1.1 },
        }
        self.uniqueSkills = {
            "special_emei_sword_dance", "special_jade_needle"
        }

    elseif styleId == STYLE_WTMO then
        self.name = "五毒魔教"
        self.nameEn = "Five Poisons"
        self.description = "以毒攻敌，控制对手，招式阴险毒辣。"
        self.passives = {
            { type = "poison_on_hit", value = 3.0 }, -- 每次命中附加中毒层数
            { type = "debuff_duration_bonus", value = 0.3 },
            { type = "health_leech", value = 0.05 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_SPECIAL_DRAGON_PALM] = {
                damageType = Damage.DAMAGE_TYPE_POISON,
                element = nil,
                reaction = Damage.REACTION_HIT_STUN,
            },
        }
        self.uniqueSkills = {
            "special_poison_mist", "special_scorpion_sting"
        }

    elseif styleId == STYLE_HUASHAN then
        self.name = "华山"
        self.nameEn = "Huashan"
        self.description = "剑气纵横，一击必杀，暴击与气劲伤害惊人。"
        self.passives = {
            { type = "crit_damage", value = 0.3 },
            { type = "internal_damage_bonus", value = 0.2 },
            { type = "heavy_attack_speed", value = 0.1 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_HEAVY_1] = {
                damageMultiplier = 1.3,
                canLaunch = true,
            },
            [SkillDatabase.SKILL_ID_SPECIAL_DRAGON_PALM] = {
                element = Damage.ELEMENT_THUNDER,
            },
        }
        self.uniqueSkills = {
            "special_solitary_sword", "special_qi_burst"
        }

    elseif styleId == STYLE_XIAOYAO then
        self.name = "逍遥"
        self.nameEn = "Xiaoyao"
        self.description = "身法飘逸，闪避极高，内力深厚可支撑持久战。"
        self.passives = {
            { type = "dodge_rate", value = 0.1 },
            { type = "move_speed", value = 0.15 },
            { type = "internal_force_max", value = 50.0 },
        }
        self.skillModifiers = {
            [SkillDatabase.SKILL_ID_DODGE] = {
                cooldownReduction = 0.3,
                invincibleExtension = 0.1,
            },
        }
        self.uniqueSkills = {
            "special_northern_darkness", "special_lingbo_weibu"
        }
    end
end

--- 获取被动效果列表
-- @return table
function MartialStyle:GetPassives()
    return Utils.DeepCopy(self.passives)
end

--- 获取某技能的修正参数
-- @param skillId string
-- @return table|nil
function MartialStyle:GetSkillModifier(skillId)
    return self.skillModifiers[skillId] and Utils.DeepCopy(self.skillModifiers[skillId]) or nil
end

--- 应用修正到技能配置（创建副本）
-- @param skillConfig table 原始技能配置
-- @return table 修正后的副本
function MartialStyle:ModifySkill(skillConfig)
    local modified = Utils.DeepCopy(skillConfig)
    local mod = self.skillModifiers[skillConfig.id]
    if not mod then
        return modified
    end

    if mod.damageMultiplier and modified.damageEvent then
        modified.damageEvent.baseDamage = (modified.damageEvent.baseDamage or 0.0) * mod.damageMultiplier
    end
    if mod.knockbackForceBonus and modified.damageEvent then
        modified.damageEvent.knockbackForce = (modified.damageEvent.knockbackForce or 0.0) + mod.knockbackForceBonus
    end
    if mod.superArmorStartup ~= nil then
        modified.superArmorStartup = mod.superArmorStartup
    end
    if mod.staminaCostReduction and modified.cost then
        modified.cost.stamina = (modified.cost.stamina or 0.0) * (1.0 - mod.staminaCostReduction)
    end
    if mod.cooldownReduction and modified.cooldown then
        modified.cooldown = modified.cooldown * (1.0 - mod.cooldownReduction)
    end
    if mod.damageType and modified.damageEvent then
        modified.damageEvent.damageType = mod.damageType
    end
    if mod.element and modified.damageEvent then
        modified.damageEvent.element = mod.element
    end
    if mod.reaction and modified.damageEvent then
        modified.damageEvent.reaction = mod.reaction
    end
    if mod.hitboxScale and modified.hitboxList then
        for _, hb in ipairs(modified.hitboxList) do
            if hb.params then
                for k, v in pairs(hb.params) do
                    if type(v) == "number" then
                        hb.params[k] = v * mod.hitboxScale
                    end
                end
            end
        end
    end
    return modified
end

--- 获取专属技能ID列表
-- @return table
function MartialStyle:GetUniqueSkills()
    return Utils.DeepCopy(self.uniqueSkills)
end

--- 是否拥有某专属技能
-- @param skillId string
-- @return boolean
function MartialStyle:HasUniqueSkill(skillId)
    for _, id in ipairs(self.uniqueSkills) do
        if id == skillId then
            return true
        end
    end
    return false
end

M.MartialStyle = MartialStyle
M.STYLE_SHAOLIN = STYLE_SHAOLIN
M.STYLE_WUDANG = STYLE_WUDANG
M.STYLE_EMEI = STYLE_EMEI
M.STYLE_WTMO = STYLE_WTMO
M.STYLE_HUASHAN = STYLE_HUASHAN
M.STYLE_XIAOYAO = STYLE_XIAOYAO

return M
