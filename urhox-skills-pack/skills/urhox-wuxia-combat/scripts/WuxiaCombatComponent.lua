-- WuxiaCombatComponent.lua
-- 武侠战斗统一组件
-- 将 FSM、ComboBuffer、HitboxManager、CombatDamage、SkillDatabase、BuffDebuff、
-- MartialStyle、CombatCamera、CombatVFX、CombatSFX 等模块整合为一个可直接挂载到
-- 角色身上的高阶战斗组件。

local Utils = require("scripts/CombatUtils")
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

local M = {}

-- ============================================================================
-- WuxiaCombatComponent 类
-- ============================================================================

local WuxiaCombatComponent = {}
WuxiaCombatComponent.__index = WuxiaCombatComponent

--- 创建战斗组件
-- @param owner table 所属节点/实体
-- @param config table 可选配置
-- @return WuxiaCombatComponent
function WuxiaCombatComponent.New(owner, config)
    local self = setmetatable({}, WuxiaCombatComponent)
    config = config or {}
    self.owner = owner

    -- 核心子系统
    self.fsm = WuxiaFSM.WuxiaStateMachine.New(owner)
    self.comboBuffer = ComboBuffer.ComboBuffer.New()
    self.hitboxManager = HitboxManager.HitboxManager.New(owner)
    self.combatDealer = CombatDamage.CombatDealer.New(self.hitboxManager, self.fsm)
    self.skillDB = SkillDatabase.SkillDatabase.New()
    self.buffMgr = BuffDebuffManager.BuffDebuffManager.New(owner)
    self.martialStyle = MartialStyle.MartialStyle.New(config.martialStyleId or "none")

    -- 演出子系统（可选）
    self.combatVFX = config.vfxManager or nil
    self.combatSFX = config.sfxManager or nil
    self.combatCamera = config.cameraController or nil

    -- 基础属性
    self.stamina = config.stamina or 100.0
    self.maxStamina = config.maxStamina or 100.0
    self.internalForce = config.internalForce or 100.0
    self.maxInternalForce = config.maxInternalForce or 100.0
    self.staminaRegen = config.staminaRegen or 10.0
    self.internalForceRegen = config.internalForceRegen or 5.0

    -- 战斗属性
    self.combatAttrs = CombatDamage.CreateAttributes(config.attributes or {})
    self.combatAttrs = self.combatAttrs or {}
    owner.combatAttrs = self.combatAttrs
    owner.wuxiaFSM = self.fsm

    -- 回调/事件
    self.onHit = nil
    self.onKill = nil
    self.onDodge = nil
    self.onBlock = nil
    self.onParry = nil
    self.onStateChange = nil

    -- 内部状态
    self._blockInputHeld = false
    self._invincible = false

    -- 注册命中回调链
    self.combatDealer:SetOnHit(function(attacker, target, result, damageEvent)
        self:_HandleOnHit(attacker, target, result, damageEvent)
    end)
    self.combatDealer:SetOnKill(function(attacker, target, damageEvent)
        self:_HandleOnKill(attacker, target, damageEvent)
    end)
    self.combatDealer:SetOnDodge(function(attacker, target, damageEvent)
        self:_HandleOnDodge(attacker, target, damageEvent)
    end)

    -- 注册 FSM 状态变化回调
    self.fsm.onStateChange = function(oldStateName, newStateName)
        if type(self.onStateChange) == "function" then
            self.onStateChange(oldStateName, newStateName)
        end
        self:_OnFSMStateChange(oldStateName, newStateName)
    end

    -- 注册连招缓冲区回调
    self.comboBuffer.onCombo = function(skillId)
        self:_ExecuteSkill(skillId)
    end

    return self
end

--- 设置门派武学风格
-- @param styleId string
function WuxiaCombatComponent:SetMartialStyle(styleId)
    self.martialStyle = MartialStyle.MartialStyle.New(styleId)
end

--- 设置演出子系统
function WuxiaCombatComponent:SetVFX(vfxManager)
    self.combatVFX = vfxManager
end
function WuxiaCombatComponent:SetSFX(sfxManager)
    self.combatSFX = sfxManager
end
function WuxiaCombatComponent:SetCamera(cameraController)
    self.combatCamera = cameraController
end

--- 给该组件添加一个技能的 hitbox 配置
-- @param skillId string
-- @param hitboxList table
function WuxiaCombatComponent:RegisterSkillHitbox(skillId, hitboxList)
    local skill = self.skillDB:GetSkill(skillId)
    if not skill then
        return
    end

    -- 应用门派修正
    local modified = self.martialStyle:ModifySkill(skill)
    hitboxList = hitboxList or modified.hitboxList
    if not hitboxList then
        return
    end

    for _, hbConfig in ipairs(hitboxList) do
        self.hitboxManager:CreateHitbox(skillId, {
            shape = hbConfig.shape,
            offset = hbConfig.offset,
            params = hbConfig.params,
            owner = self.owner,
            lifetime = hbConfig.lifetime or 0.15,
            maxHits = hbConfig.maxHits or 1,
            damageEvent = modified.damageEvent,
        })
    end
end

--- 执行技能：扣除资源、启动冷却、应用门派修正后触发 FSM
-- @param skillId string
function WuxiaCombatComponent:_ExecuteSkill(skillId)
    local skill = self.skillDB:GetSkill(skillId)
    if not skill then
        return
    end

    -- 应用门派修正
    local modified = self.martialStyle:ModifySkill(skill)

    -- 冷却与资源检查
    if self.skillDB:IsOnCooldown(self.owner, skillId) then
        return
    end
    local canAfford, reason = self.skillDB:CanAfford(self, skillId)
    if not canAfford then
        return
    end

    -- 格挡和闪避可以打断前摇/收招
    local canCancel = (skillId == SkillDatabase.SKILL_ID_DODGE
                       or skillId == SkillDatabase.SKILL_ID_BLOCK
                       or skillId == SkillDatabase.SKILL_ID_PARRY)

    if not canCancel and not self.fsm:CanTransition(skillId) then
        return
    end

    -- 扣除消耗
    self.skillDB:ConsumeCost(self, skillId)
    self.skillDB:StartCooldown(self.owner, skillId)

    -- 触发 FSM
    self.fsm:TransitionTo(modified.stateName or skillId, {
        duration = modified.totalFrames / 60.0,
        startup = modified.startupFrames / 60.0,
        active = modified.activeFrames / 60.0,
        recovery = modified.recoveryFrames / 60.0,
        canComboAt = modified.comboWindowOpenFrame / 60.0,
        comboWindowEnd = modified.comboWindowCloseFrame / 60.0,
        superArmor = modified.superArmorStartup,
        invincible = modified.invincible,
        cancelable = modified.cancelable,
        animation = modified.animation,
        onActiveStart = function()
            self:ActivateHitboxes(skillId)
        end,
        onActiveEnd = function()
            self:DeactivateHitboxes(skillId)
        end,
        onRecoveryEnd = function()
            self:DeactivateHitboxes(skillId)
        end,
    })

    -- 无敌帧处理
    if modified.invincible then
        self._invincible = true
    end

    -- 音效
    if self.combatSFX then
        self.combatSFX:OnWhoosh()
    end
end

--- 激活某技能对应的命中框
-- @param skillId string
function WuxiaCombatComponent:ActivateHitboxes(skillId)
    self.hitboxManager:ActivateHitboxesForSkill(skillId)
end

--- 关闭某技能对应的命中框
-- @param skillId string
function WuxiaCombatComponent:DeactivateHitboxes(skillId)
    self.hitboxManager:DeactivateHitboxesForSkill(skillId)
end

--- 命中回调处理
function WuxiaCombatComponent:_HandleOnHit(attacker, target, result, damageEvent)
    -- 触发 VFX / SFX / Camera
    if self.combatVFX then
        self.combatVFX:OnCombatHit(attacker, target, damageEvent, result)
    end
    if self.combatSFX then
        self.combatSFX:OnCombatHit(damageEvent, result)
    end
    if self.combatCamera then
        local hitLevel = "light"
        if result.isCrit then
            hitLevel = "critical"
        elseif damageEvent.reaction == "knockback" or damageEvent.reaction == "knockdown" then
            hitLevel = "heavy"
        end
        self.combatCamera:OnCombatHit(hitLevel, damageEvent.reaction)
    end

    -- 门派被动：五毒教中毒
    local attackerStyle = nil
    if attacker and attacker.wuxiaCombat then
        attackerStyle = attacker.wuxiaCombat.martialStyle
        if attackerStyle and attackerStyle.styleId == MartialStyle.STYLE_WTMO then
            for _, p in ipairs(attackerStyle:GetPassives() or {}) do
                if p.type == "poison_on_hit" and target then
                    local targetBuffMgr = target.wuxiaCombat and target.wuxiaCombat.buffMgr
                    if targetBuffMgr then
                        targetBuffMgr:Apply(BuffDebuffManager.DEBUFF_ID_POISON, attacker, 5.0, p.value or 1.0)
                    end
                end
            end
        end
    end

    if type(self.onHit) == "function" then
        self.onHit(attacker, target, result, damageEvent)
    end
end

--- 击杀回调处理
function WuxiaCombatComponent:_HandleOnKill(attacker, target, damageEvent)
    if type(self.onKill) == "function" then
        self.onKill(attacker, target, damageEvent)
    end
end

--- 闪避回调处理
function WuxiaCombatComponent:_HandleOnDodge(attacker, target, damageEvent)
    if self.combatVFX then
        self.combatVFX:OnDodge(target)
    end
    if self.combatSFX then
        self.combatSFX:OnDodge()
    end
    if type(self.onDodge) == "function" then
        self.onDodge(attacker, target, damageEvent)
    end
end

--- FSM 状态变化内部处理
function WuxiaCombatComponent:_OnFSMStateChange(oldStateName, newStateName)
    -- 离开无敌状态
    if oldStateName == "dodge" then
        self._invincible = false
    end

    -- 格挡资源消耗：按帧扣体力（简化版）
    if newStateName == "block" then
        self._blockStaminaDrain = 2.0 -- 每秒
    else
        self._blockStaminaDrain = 0.0
    end

    -- 状态切回 idle 时清空输入缓冲
    if newStateName == "idle" then
        self.comboBuffer:Clear()
    end
end

--- 玩家/AI 输入接口：轻攻击
function WuxiaCombatComponent:InputLightAttack()
    self.comboBuffer:PushLight()
end

--- 玩家/AI 输入接口：重攻击
function WuxiaCombatComponent:InputHeavyAttack()
    self.comboBuffer:PushHeavy()
end

--- 玩家/AI 输入接口：闪避
function WuxiaCombatComponent:InputDodge()
    self.comboBuffer:PushDodge()
end

--- 玩家/AI 输入接口：格挡（按住）
function WuxiaCombatComponent:InputBlockHold()
    self._blockInputHeld = true
    if self.fsm:Is("idle") or self.fsm:Is("block") then
        self.comboBuffer:PushBlock()
    end
end

--- 玩家/AI 输入接口：格挡（松开）
function WuxiaCombatComponent:InputBlockRelease()
    self._blockInputHeld = false
    if self.fsm:Is("block") then
        self.fsm:TransitionTo("idle")
    end
end

--- 玩家/AI 输入接口：弹反
function WuxiaCombatComponent:InputParry()
    self.comboBuffer:PushParry()
end

--- 对 owner 施加 Buff/Debuff
function WuxiaCombatComponent:ApplyBuff(effectId, source, duration, stacks)
    self.buffMgr:Apply(effectId, source, duration, stacks)
end

--- 移除 Buff/Debuff
function WuxiaCombatComponent:RemoveBuff(effectId)
    self.buffMgr:Remove(effectId)
end

--- 检查是否无敌
-- @return boolean
function WuxiaCombatComponent:IsInvincible()
    return self.fsm.invincible or self._invincible
end

--- 检查是否霸体
-- @return boolean
function WuxiaCombatComponent:IsSuperArmor()
    return self.fsm.superArmor
end

--- 受击入口（被外部调用）
-- @param hitEvent table
function WuxiaCombatComponent:TakeHit(hitEvent)
    if self:IsInvincible() then
        if self.combatSFX then
            self.combatSFX:OnDodge()
        end
        return
    end

    -- BuffDebuff 减伤
    local dmgMultiplier = 1.0
    if self.buffMgr then
        dmgMultiplier = self.buffMgr:ModifyAttribute("damageTaken", 1.0)
    end
    if hitEvent.damage then
        hitEvent.damage = hitEvent.damage * dmgMultiplier
    end

    -- 格挡减伤
    if self.fsm:Is("block") and hitEvent.blockable ~= false then
        local blockReduction = 0.5
        -- 武当被动反伤
        local passives = self.martialStyle:GetPassives()
        for _, p in ipairs(passives) do
            if p.type == "block_damage_reflect" then
                if hitEvent.attacker and hitEvent.attacker.wuxiaCombat then
                    local reflectDmg = (hitEvent.damage or 0.0) * p.value
                    hitEvent.attacker.health = (hitEvent.attacker.health or 100.0) - reflectDmg
                end
            end
        end

        hitEvent.damage = (hitEvent.damage or 0.0) * (1.0 - blockReduction)
        self.stamina = math.max(0.0, self.stamina - (hitEvent.damage or 0.0) * 0.3)
        if self.combatVFX then
            self.combatVFX:OnBlockSuccess(self.owner)
        end
        if self.combatSFX then
            self.combatSFX:OnBlockSuccess()
        end
        if type(self.onBlock) == "function" then
            self.onBlock(hitEvent)
        end
        return
    end

    -- 弹反判定窗口
    if self.fsm:Is("parry") and hitEvent.blockable ~= false then
        if self.combatSFX then
            self.combatSFX:OnParrySuccess()
        end
        if type(self.onParry) == "function" then
            self.onParry(hitEvent)
        end
        -- 弹反成功：无视此次伤害并给攻击者造成大硬直
        if hitEvent.attacker and hitEvent.attacker.wuxiaCombat then
            hitEvent.attacker.wuxiaCombat.fsm:TransitionTo("hit_stun", { duration = 1.0 })
        end
        return
    end

    self.fsm:TakeHit(hitEvent)
end

--- 更新战斗组件（应在 Update 中调用）
-- @param dt number
function WuxiaCombatComponent:Update(dt)
    -- 子系统更新
    self.fsm:Update(dt)
    self.comboBuffer:Update(dt, self.fsm)
    self.skillDB:Update(dt)
    self.buffMgr:Update(dt)

    -- 体力和内力回复
    if self.stamina and self.maxStamina then
        local regen = self.staminaRegen or 0.0
        if self._blockStaminaDrain > 0.0 then
            regen = regen - self._blockStaminaDrain
        end
        self.stamina = math.min(self.maxStamina, self.stamina + regen * dt)
    end
    if self.internalForce and self.maxInternalForce then
        self.internalForce = math.min(self.maxInternalForce, self.internalForce + (self.internalForceRegen or 0.0) * dt)
    end

    -- 保持格挡状态
    if self._blockInputHeld and self.fsm:Is("idle") then
        self.comboBuffer:PushBlock()
    end

    -- 命中检测
    self.combatDealer:Update(dt)
end

M.WuxiaCombatComponent = WuxiaCombatComponent

return M
