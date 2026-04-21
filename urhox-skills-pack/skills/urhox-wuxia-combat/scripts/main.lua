-- main.lua
-- UrhoX 武侠战斗系统入口文件
-- 本文件提供系统初始化、高阶 API 封装以及常见集成示例。
-- 实际项目中，推荐直接挂载 WuxiaCombatComponent 到角色实体上，
-- 并在 Update 中调用其 Update 方法。

--[[
    ============================================================================
    模块引入
    ============================================================================
--]]

local CombatUtils = require("scripts/CombatUtils")
local WuxiaFSM = require("scripts/WuxiaFSM")
local ComboBuffer = require("scripts/ComboBuffer")
local HitboxManager = require("scripts/HitboxManager")
local CombatDamage = require("scripts/CombatDamage")
local SkillDatabase = require("scripts/SkillDatabase")
local BuffDebuffManager = require("scripts/BuffDebuffManager")
local MartialStyle = require("scripts/MartialStyle")
local CombatCamera = require("scripts/CombatCamera")
local CombatVFX = require("scripts/CombatVFX")
local CombatSFX = require("scripts/CombatSFX")
local EnemyAIController = require("scripts/EnemyAIController")
local WuxiaCombatComponent = require("scripts/WuxiaCombatComponent")

--[[
    ============================================================================
    全局模块导出
    ============================================================================
--]]

local M = {}

-- 核心子系统
M.CombatUtils = CombatUtils
M.WuxiaFSM = WuxiaFSM
M.ComboBuffer = ComboBuffer
M.HitboxManager = HitboxManager
M.CombatDamage = CombatDamage
M.SkillDatabase = SkillDatabase
M.BuffDebuffManager = BuffDebuffManager
M.MartialStyle = MartialStyle

-- 演出子系统
M.CombatCamera = CombatCamera
M.CombatVFX = CombatVFX
M.CombatSFX = CombatSFX

-- AI 与统一组件
M.EnemyAIController = EnemyAIController
M.WuxiaCombatComponent = WuxiaCombatComponent

-- ============================================================================
-- 便捷常量：受击反应
-- ============================================================================
M.REACTION_HIT_STUN = CombatDamage.REACTION_HIT_STUN
M.REACTION_KNOCKBACK = CombatDamage.REACTION_KNOCKBACK
M.REACTION_KNOCKDOWN = CombatDamage.REACTION_KNOCKDOWN
M.REACTION_LAUNCH = CombatDamage.REACTION_LAUNCH

-- ============================================================================
-- 便捷常量：伤害类型
-- ============================================================================
M.DAMAGE_TYPE_PHYSICAL = CombatDamage.DAMAGE_TYPE_PHYSICAL
M.DAMAGE_TYPE_INTERNAL = CombatDamage.DAMAGE_TYPE_INTERNAL
M.DAMAGE_TYPE_TRUE = CombatDamage.DAMAGE_TYPE_TRUE
M.DAMAGE_TYPE_POISON = CombatDamage.DAMAGE_TYPE_POISON

-- ============================================================================
-- 便捷常量：元素类型
-- ============================================================================
M.ELEMENT_FIRE = CombatDamage.ELEMENT_FIRE
M.ELEMENT_ICE = CombatDamage.ELEMENT_ICE
M.ELEMENT_THUNDER = CombatDamage.ELEMENT_THUNDER

-- ============================================================================
-- 便捷常量：门派
-- ============================================================================
M.STYLE_SHAOLIN = MartialStyle.STYLE_SHAOLIN
M.STYLE_WUDANG = MartialStyle.STYLE_WUDANG
M.STYLE_EMEI = MartialStyle.STYLE_EMEI
M.STYLE_WTMO = MartialStyle.STYLE_WTMO
M.STYLE_HUASHAN = MartialStyle.STYLE_HUASHAN
M.STYLE_XIAOYAO = MartialStyle.STYLE_XIAOYAO

-- ============================================================================
-- 便捷常量：Buff/Debuff ID
-- ============================================================================
M.BUFF_ID_QI_SHIELD = BuffDebuffManager.BUFF_ID_QI_SHIELD
M.BUFF_ID_BLOOD_BOIL = BuffDebuffManager.BUFF_ID_BLOOD_BOIL
M.BUFF_ID_MEDITATION = BuffDebuffManager.BUFF_ID_MEDITATION
M.BUFF_ID_IRON_BODY = BuffDebuffManager.BUFF_ID_IRON_BODY
M.DEBUFF_ID_POISON = BuffDebuffManager.DEBUFF_ID_POISON
M.DEBUFF_ID_INTERNAL_INJURY = BuffDebuffManager.DEBUFF_ID_INTERNAL_INJURY
M.DEBUFF_ID_ACUPRESSURE = BuffDebuffManager.DEBUFF_ID_ACUPRESSURE
M.DEBUFF_ID_SLOW = BuffDebuffManager.DEBUFF_ID_SLOW

-- ============================================================================
-- 便捷常量：VFX 类型
-- ============================================================================
M.VFX_TYPE_HIT_SPARK = CombatVFX.VFX_TYPE_HIT_SPARK
M.VFX_TYPE_BLOOD_SPRAY = CombatVFX.VFX_TYPE_BLOOD_SPRAY
M.VFX_TYPE_BLOCK_SPARK = CombatVFX.VFX_TYPE_BLOCK_SPARK
M.VFX_TYPE_DODGE_GHOST = CombatVFX.VFX_TYPE_DODGE_GHOST
M.VFX_TYPE_ELEMENT_FIRE = CombatVFX.VFX_TYPE_ELEMENT_FIRE
M.VFX_TYPE_ELEMENT_ICE = CombatVFX.VFX_TYPE_ELEMENT_ICE
M.VFX_TYPE_ELEMENT_THUNDER = CombatVFX.VFX_TYPE_ELEMENT_THUNDER
M.VFX_TYPE_DUST_KICKUP = CombatVFX.VFX_TYPE_DUST_KICKUP
M.VFX_TYPE_WEAPON_TRAIL = CombatVFX.VFX_TYPE_WEAPON_TRAIL
M.VFX_TYPE_QI_AURA = CombatVFX.VFX_TYPE_QI_AURA

-- ============================================================================
-- 便捷工厂函数：创建完整战斗角色
-- ============================================================================

--- 快速创建一名武侠战斗角色
-- @param owner table 角色节点/实体
-- @param config table 配置参数
-- @return WuxiaCombatComponent, EnemyAIController|nil
function M.CreateCombatant(owner, config)
    config = config or {}
    local combat = WuxiaCombatComponent.New(owner, config)

    -- 默认注册所有预设技能的 hitbox
    local allSkillIds = combat.skillDB:GetAllSkillIds()
    for _, skillId in ipairs(allSkillIds) do
        combat:RegisterSkillHitbox(skillId)
    end

    local ai = nil
    if config.isEnemy or config.enableAI then
        ai = EnemyAIController.New(owner, combat)
        if config.patrolWaypoints then
            ai:SetPatrolWaypoints(config.patrolWaypoints)
        end
        if config.target then
            ai:SetTarget(config.target)
        end
    end

    -- 将 combat 引用挂载到 owner，方便其他模块访问
    owner.wuxiaCombat = combat
    owner.aiController = ai

    return combat, ai
end

-- ============================================================================
-- 便捷工厂函数：创建战斗场景全局管理器（相机、VFX、SFX）
-- ============================================================================

--- 快速创建场景级演出管理器
-- @param sceneRoot any 场景根节点
-- @param cameraNode any 相机节点（可选）
-- @param audioEngine any 音频引擎（可选）
-- @return table { camera, vfx, sfx }
function M.CreateSceneManagers(sceneRoot, cameraNode, audioEngine)
    return {
        camera = CombatCamera.CombatCamera.New(cameraNode),
        vfx = CombatVFX.VFXManager.New(sceneRoot),
        sfx = CombatSFX.SFXManager.New(audioEngine),
    }
end

-- ============================================================================
-- 便捷函数：绑定场景管理器到角色
-- ============================================================================

--- 将场景级 VFX/SFX/Camera 绑定到角色战斗组件
-- @param combat WuxiaCombatComponent
-- @param sceneManagers table { camera, vfx, sfx }
function M.BindSceneManagers(combat, sceneManagers)
    if not combat or not sceneManagers then
        return
    end
    combat:SetCamera(sceneManagers.camera)
    combat:SetVFX(sceneManagers.vfx)
    combat:SetSFX(sceneManagers.sfx)
end

-- ============================================================================
-- 便捷函数：创建简单的玩家输入映射
-- ============================================================================

--- 将标准输入绑定到玩家战斗组件（外部可按需调用）
-- @param combat WuxiaCombatComponent
-- @param input table { light, heavy, dodge, block, parry } 布尔表
function M.ProcessPlayerInput(combat, input)
    if not combat then
        return
    end
    if input.light then
        combat:InputLightAttack()
    end
    if input.heavy then
        combat:InputHeavyAttack()
    end
    if input.dodge then
        combat:InputDodge()
    end
    if input.block then
        combat:InputBlockHold()
    else
        combat:InputBlockRelease()
    end
    if input.parry then
        combat:InputParry()
    end
end

-- ============================================================================
-- 便捷函数：全局 Update 封装示例
-- ============================================================================

--- 示例：在场景 Update 中调用此函数更新所有战斗相关内容
-- @param dt number
-- @param combatants table WuxiaCombatComponent 列表
-- @param sceneManagers table { camera, vfx, sfx }
function M.UpdateCombatFrame(dt, combatants, sceneManagers)
    -- 应用时间缩放
    local timeScale = 1.0
    if sceneManagers and sceneManagers.camera then
        timeScale = sceneManagers.camera:GetTimeScale()
    end
    local scaledDt = dt * timeScale

    -- 更新所有角色
    for _, combat in ipairs(combatants or {}) do
        combat:Update(scaledDt)
        if combat.owner and combat.owner.aiController then
            combat.owner.aiController:Update(scaledDt)
        end
    end

    -- 更新场景管理器
    if sceneManagers then
        if sceneManagers.camera then
            sceneManagers.camera:Update(dt) -- camera 通常用真实 dt
        end
        if sceneManagers.vfx then
            sceneManagers.vfx:Update(scaledDt)
        end
    end
end

return M
