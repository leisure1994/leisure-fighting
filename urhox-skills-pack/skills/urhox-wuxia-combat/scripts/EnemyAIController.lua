-- EnemyAIController.lua
-- 武侠敌人 AI 控制器
-- 基于简单行为树思路，实现巡逻、警戒、追击、攻击、受击反应等基本战斗 AI

local Utils = require("scripts/CombatUtils")
local ComboBuffer = require("scripts/ComboBuffer")
local SkillDB = require("scripts/SkillDatabase")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local AI_STATE_IDLE = "idle"
local AI_STATE_PATROL = "patrol"
local AI_STATE_ALERT = "alert"
local AI_STATE_CHASE = "chase"
local AI_STATE_ATTACK = "attack"
local AI_STATE_HIT_REACT = "hit_react"
local AI_STATE_DEAD = "dead"

local AI_LIGHT_ATTACK_DISTANCE = 2.5
local AI_HEAVY_ATTACK_DISTANCE = 2.0
local AI_DODGE_DISTANCE = 1.5
local AI_CHASE_SPEED = 3.5
local AI_PATROL_SPEED = 1.2

-- ============================================================================
-- EnemyAIController 类
-- ============================================================================

local EnemyAIController = {}
EnemyAIController.__index = EnemyAIController

--- 创建敌人 AI 控制器
-- @param owner table 敌人节点/实体
-- @param combatComponent WuxiaCombatComponent 战斗组件
-- @return EnemyAIController
function EnemyAIController.New(owner, combatComponent)
    local self = setmetatable({}, EnemyAIController)
    self.owner = owner
    self.combat = combatComponent
    self.state = AI_STATE_IDLE
    self.stateTimer = 0.0
    self.attackCooldown = 0.0
    self.dodgeCooldown = 0.0
    self.blockDuration = 0.0
    self.target = nil
    self.patrolWaypoints = {}
    self.currentWaypointIndex = 1
    self.detectionRadius = 8.0
    self.attackRadius = 2.5
    self.loseInterestRadius = 15.0
    self.aggressive = true
    self.canDodge = true
    self.canBlock = true
    self.canParry = false
    self.lastTargetPos = { x = 0.0, y = 0.0, z = 0.0 }
    self.hitReactTimer = 0.0
    self.hitReactDuration = 0.3
    self.nextActionRoll = math.random()
    self.actionRollInterval = 0.5
    self.actionRollTimer = 0.0
    self.randomOffset = { x = 0.0, z = 0.0 }
    return self
end

--- 设置巡逻路径点
-- @param waypoints table { {x,y,z}, ... }
function EnemyAIController:SetPatrolWaypoints(waypoints)
    self.patrolWaypoints = waypoints or {}
    self.currentWaypointIndex = 1
end

--- 设置索敌目标（通常是玩家）
-- @param targetNode any
function EnemyAIController:SetTarget(targetNode)
    self.target = targetNode
end

--- 获取到目标的距离（水平面）
-- @return number
function EnemyAIController:_DistanceToTarget()
    if not self.target then
        return math.huge
    end
    local myPos = Utils.GetNodeWorldPosition(self.owner)
    local targetPos = Utils.GetNodeWorldPosition(self.target)
    if not myPos or not targetPos then
        return math.huge
    end
    local dx = targetPos.x - myPos.x
    local dz = targetPos.z - myPos.z
    return math.sqrt(dx * dx + dz * dz)
end

--- 获取到目标的方向向量（水平面归一化）
-- @return table
function EnemyAIController:_DirToTarget()
    if not self.target then
        return { x = 0.0, y = 0.0, z = 1.0 }
    end
    local myPos = Utils.GetNodeWorldPosition(self.owner)
    local targetPos = Utils.GetNodeWorldPosition(self.target)
    local dx = targetPos.x - myPos.x
    local dz = targetPos.z - myPos.z
    local dist = math.sqrt(dx * dx + dz * dz)
    if dist < 0.001 then
        return { x = 0.0, y = 0.0, z = 1.0 }
    end
    return { x = dx / dist, y = 0.0, z = dz / dist }
end

--- 面向目标
function EnemyAIController:_FaceTarget()
    if not self.target then
        return
    end
    local dir = self:_DirToTarget()
    local yaw = math.atan2(dir.x, dir.z)
    if self.owner and type(self.owner.SetRotation) == "function" then
        self.owner:SetRotation({ x = 0.0, y = yaw * (180.0 / math.pi), z = 0.0 })
    elseif self.owner and type(self.owner.SetYaw) == "function" then
        self.owner:SetYaw(yaw)
    end
end

--- 向指定方向移动
-- @param dir table {x,y,z}
-- @param speed number
function EnemyAIController:_Move(dir, speed)
    if not self.owner then
        return
    end
    local dt = 1.0 / 60.0 -- 由外部 Update 保证调用频率，这里仅作示例
    -- 实际位移由外部物理/移动系统处理
    if type(self.owner.SetVelocity) == "function" then
        self.owner:SetVelocity({ x = dir.x * speed, y = 0.0, z = dir.z * speed })
    elseif type(self.owner.ApplyMovement) == "function" then
        self.owner:ApplyMovement(dir, speed)
    end
end

--- 停止移动
function EnemyAIController:_Stop()
    if self.owner and type(self.owner.SetVelocity) == "function" then
        self.owner:SetVelocity({ x = 0.0, y = 0.0, z = 0.0 })
    end
end

--- 尝试触发轻攻击
function EnemyAIController:_TryLightAttack()
    if not self.combat or not self.combat.comboBuffer then
        return false
    end
    self.combat.comboBuffer:PushLight()
    return true
end

--- 尝试触发重攻击
function EnemyAIController:_TryHeavyAttack()
    if not self.combat or not self.combat.comboBuffer then
        return false
    end
    self.combat.comboBuffer:PushHeavy()
    return true
end

--- 尝试触发闪避
function EnemyAIController:_TryDodge()
    if not self.combat or not self.combat.comboBuffer then
        return false
    end
    -- 向侧面或后方闪避
    local dir = self:_DirToTarget()
    local dodgeDir = { x = -dir.z, y = 0.0, z = dir.x } -- 侧闪
    if math.random() < 0.3 then
        dodgeDir = { x = -dir.x, y = 0.0, z = -dir.z } -- 后闪
    end
    self.combat.comboBuffer:PushDodge()
    return true
end

--- 尝试触发格挡
function EnemyAIController:_TryBlock()
    if not self.combat or not self.combat.comboBuffer then
        return false
    end
    self.combat.comboBuffer:PushBlock()
    self.blockDuration = 1.0
    return true
end

--- 尝试触发弹反
function EnemyAIController:_TryParry()
    if not self.combat or not self.combat.comboBuffer then
        return false
    end
    self.combat.comboBuffer:PushParry()
    return true
end

--- 进入状态
-- @param newState string
function EnemyAIController:_EnterState(newState)
    self.state = newState
    self.stateTimer = 0.0
    if newState == AI_STATE_HIT_REACT then
        self:_Stop()
    elseif newState == AI_STATE_DEAD then
        self:_Stop()
    end
end

--- 更新 Idle 状态
function EnemyAIController:_UpdateIdle(dt)
    if #self.patrolWaypoints > 0 then
        self:_EnterState(AI_STATE_PATROL)
        return
    end
    if self.target and self:_DistanceToTarget() <= self.detectionRadius then
        self:_EnterState(AI_STATE_ALERT)
        return
    end
end

--- 更新 Patrol 状态
function EnemyAIController:_UpdatePatrol(dt)
    if self.target and self:_DistanceToTarget() <= self.detectionRadius then
        self:_EnterState(AI_STATE_ALERT)
        return
    end
    if #self.patrolWaypoints == 0 then
        self:_EnterState(AI_STATE_IDLE)
        return
    end

    local wp = self.patrolWaypoints[self.currentWaypointIndex]
    local myPos = Utils.GetNodeWorldPosition(self.owner)
    local dx = wp.x - myPos.x
    local dz = wp.z - myPos.z
    local dist = math.sqrt(dx * dx + dz * dz)

    if dist < 0.5 then
        self.currentWaypointIndex = self.currentWaypointIndex + 1
        if self.currentWaypointIndex > #self.patrolWaypoints then
            self.currentWaypointIndex = 1
        end
    else
        local dir = { x = dx / dist, y = 0.0, z = dz / dist }
        self:_Move(dir, AI_PATROL_SPEED)
    end
end

--- 更新 Alert 状态
function EnemyAIController:_UpdateAlert(dt)
    self:_FaceTarget()
    self:_Stop()
    if self.stateTimer > 0.3 then
        if self.aggressive then
            self:_EnterState(AI_STATE_CHASE)
        else
            self:_EnterState(AI_STATE_IDLE)
        end
    end
    if self.target and self:_DistanceToTarget() > self.loseInterestRadius then
        self:_EnterState(AI_STATE_IDLE)
    end
end

--- 更新 Chase 状态
function EnemyAIController:_UpdateChase(dt)
    if not self.target then
        self:_EnterState(AI_STATE_IDLE)
        return
    end
    local dist = self:_DistanceToTarget()
    if dist > self.loseInterestRadius then
        self:_EnterState(AI_STATE_IDLE)
        return
    end
    if dist <= self.attackRadius then
        self:_EnterState(AI_STATE_ATTACK)
        return
    end

    local dir = self:_DirToTarget()
    self:_FaceTarget()
    self:_Move(dir, AI_CHASE_SPEED)
end

--- 更新 Attack 状态
function EnemyAIController:_UpdateAttack(dt)
    if not self.target then
        self:_EnterState(AI_STATE_IDLE)
        return
    end

    local dist = self:_DistanceToTarget()
    if dist > self.attackRadius + 1.0 then
        self:_EnterState(AI_STATE_CHASE)
        return
    end

    self:_FaceTarget()
    self:_Stop()

    -- 行为随机决策
    self.actionRollTimer = self.actionRollTimer + dt
    if self.actionRollTimer >= self.actionRollInterval then
        self.actionRollTimer = 0.0
        self.nextActionRoll = math.random()
    end

    -- 冷却递减
    self.attackCooldown = math.max(0.0, self.attackCooldown - dt)
    self.dodgeCooldown = math.max(0.0, self.dodgeCooldown - dt)
    self.blockDuration = math.max(0.0, self.blockDuration - dt)

    -- 格挡中则维持
    if self.combat and self.combat.fsm and self.combat.fsm:Is("block") then
        if self.blockDuration <= 0.0 then
            -- 通过输入释放格挡键（模拟松开）
            if self.combat.fsm["force_idle"] then
                self.combat.fsm:force_idle()
            end
        end
        return
    end

    -- 受击优先级最高
    if self.combat and self.combat.fsm then
        local fsm = self.combat.fsm
        if fsm:Is("hit_stun") or fsm:Is("knockdown") then
            self:_EnterState(AI_STATE_HIT_REACT)
            return
        end
    end

    -- 若玩家正在攻击且距离很近，尝试闪避或格挡
    if dist <= AI_DODGE_DISTANCE and self.dodgeCooldown <= 0.0 then
        if self.canDodge and self.nextActionRoll < 0.25 then
            self:_TryDodge()
            self.dodgeCooldown = 1.5
            return
        elseif self.canBlock and self.nextActionRoll < 0.5 then
            self:_TryBlock()
            return
        end
    end

    -- 攻击决策
    if self.attackCooldown <= 0.0 then
        if dist <= AI_HEAVY_ATTACK_DISTANCE and self.nextActionRoll < 0.35 then
            self:_TryHeavyAttack()
            self.attackCooldown = 1.2
        elseif dist <= AI_LIGHT_ATTACK_DISTANCE then
            self:_TryLightAttack()
            self.attackCooldown = 0.6
        end
    end
end

--- 更新 HitReact 状态
function EnemyAIController:_UpdateHitReact(dt)
    self.hitReactTimer = self.hitReactTimer + dt
    if self.combat and self.combat.fsm then
        local fsm = self.combat.fsm
        if fsm:Is("idle") or fsm:Is("block") then
            self:_EnterState(AI_STATE_CHASE)
            return
        end
        if fsm:Is("dodge") then
            self:_EnterState(AI_STATE_ATTACK)
            return
        end
    end
    if self.hitReactTimer >= self.hitReactDuration then
        self:_EnterState(AI_STATE_CHASE)
    end
end

--- 更新 Dead 状态
function EnemyAIController:_UpdateDead(dt)
    self:_Stop()
end

--- 外部通知受击（用于打断当前 AI 状态）
function EnemyAIController:OnHitTaken()
    if self.state ~= AI_STATE_DEAD then
        self:_EnterState(AI_STATE_HIT_REACT)
        self.hitReactTimer = 0.0
    end
end

--- 外部通知死亡
function EnemyAIController:OnDeath()
    self:_EnterState(AI_STATE_DEAD)
end

--- 更新 AI（应在 Update 中调用）
-- @param dt number
function EnemyAIController:Update(dt)
    self.stateTimer = self.stateTimer + dt

    -- 死亡检测
    if self.owner and self.owner.health ~= nil and self.owner.health <= 0.0 and self.state ~= AI_STATE_DEAD then
        self:OnDeath()
    end

    if self.state == AI_STATE_IDLE then
        self:_UpdateIdle(dt)
    elseif self.state == AI_STATE_PATROL then
        self:_UpdatePatrol(dt)
    elseif self.state == AI_STATE_ALERT then
        self:_UpdateAlert(dt)
    elseif self.state == AI_STATE_CHASE then
        self:_UpdateChase(dt)
    elseif self.state == AI_STATE_ATTACK then
        self:_UpdateAttack(dt)
    elseif self.state == AI_STATE_HIT_REACT then
        self:_UpdateHitReact(dt)
    elseif self.state == AI_STATE_DEAD then
        self:_UpdateDead(dt)
    end
end

--- 获取当前 AI 状态
-- @return string
function EnemyAIController:GetState()
    return self.state
end

--- 获取调试信息
-- @return table
function EnemyAIController:GetDebugInfo()
    return {
        state = self.state,
        stateTimer = self.stateTimer,
        attackCooldown = self.attackCooldown,
        distanceToTarget = self:_DistanceToTarget(),
    }
end

M.EnemyAIController = EnemyAIController
M.AI_STATE_IDLE = AI_STATE_IDLE
M.AI_STATE_PATROL = AI_STATE_PATROL
M.AI_STATE_ALERT = AI_STATE_ALERT
M.AI_STATE_CHASE = AI_STATE_CHASE
M.AI_STATE_ATTACK = AI_STATE_ATTACK
M.AI_STATE_HIT_REACT = AI_STATE_HIT_REACT
M.AI_STATE_DEAD = AI_STATE_DEAD

return M
