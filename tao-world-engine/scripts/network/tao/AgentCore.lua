-- AgentCore.lua
-- 天道引擎 · NPC Agent 状态机与决策核心（完全体）
-- 职责：管理 NPC 的 FSM 状态流转、HTN 任务分解、Utility AI 选优、感知记忆、社会模拟、日程作息、LLM 交互与容错恢复
-- 版本：v2.0 完全体

AgentCore = AgentCore or {}

------------------------------------------------------------------------
-- 一、核心数据仓库
------------------------------------------------------------------------

--- NPC Agent 实例表：npcId -> agentState
AgentCore.agents = AgentCore.agents or {}

--- NPC 日程作息表：npcId -> scheduleDefinition
AgentCore.schedules = AgentCore.schedules or {}

--- 对话上下文内存：npcId -> { with, lastMsg, turnCount, lastTime, inkState }
AgentCore.dialogMemory = AgentCore.dialogMemory or {}

--- NPC 社交关系网：npcId -> { targetId -> score }
AgentCore.relationships = AgentCore.relationships or {}

--- 感知缓存：npcId -> { timestamp, sight={}, hearing={}, smell={}, taste={}, touch={}, entities, events, items, threats }
AgentCore.perceptions = AgentCore.perceptions or {}

--- Utility 得分缓存：npcId -> { actionKey -> score }
AgentCore.utilityCache = AgentCore.utilityCache or {}

--- 刺激阈值注册表：npcId -> { combat=0, insult=0, wealthDelta=0, ... }
AgentCore.stimulusRegistry = AgentCore.stimulusRegistry or {}

--- 上次思考时间表：npcId -> worldTime
AgentCore.lastThinkTimes = AgentCore.lastThinkTimes or {}

--- Fallback 重试计数器：npcId -> { count, lastFailTime }
AgentCore.fallbackAttempts = AgentCore.fallbackAttempts or {}

--- 全局 FSM 状态计时器辅助
AgentCore.stateTimers = AgentCore.stateTimers or {}

--- FSM 状态历史：npcId -> { states={}, maxDepth=20 }
AgentCore.stateHistories = AgentCore.stateHistories or {}

--- 伴侣系统：npcId -> { partnerId, status, proposalTime, weddingTime }
AgentCore.romances = AgentCore.romances or {}

--- 师徒系统：npcId -> { mentorId, students={}, skillProgress={}, graduationDate }
AgentCore.mentorships = AgentCore.mentorships or {}

--- 派系系统：npcId -> { factionId, loyalty=0, rank="member", secrets={}, coupPlans={} }
AgentCore.factions = AgentCore.factions or {}

--- 声望网络：npcId -> { fame=0, infamy=0, fameSources={}, infamySources{} }
AgentCore.reputations = AgentCore.reputations or {}

--- 情绪状态机：npcId -> { currentMood, intensity, moodHistory={}, lastShiftTime }
AgentCore.moods = AgentCore.moods or {}

--- 长期目标规划：npcId -> { goals={}, activeGoalId }
AgentCore.lifeGoals = AgentCore.lifeGoals or {}

--- 经济行为账本：npcId -> { inventoryValue, lastProductionTime, priceBeliefs={}, investments={} }
AgentCore.economy = AgentCore.economy or {}

--- 战斗AI缓存：npcId -> { comboQueue={}, retreatCheckedAt, preferredTarget }
AgentCore.combatCache = AgentCore.combatCache or {}

--- 谣言接收缓存：npcId -> { rumors={}, lastGossipTime }
AgentCore.gossipCache = AgentCore.gossipCache or {}

------------------------------------------------------------------------
-- 二、常量与枚举
------------------------------------------------------------------------

--- 扩充后的 NPC 状态枚举（16+）
AgentCore.STATE = {
    IDLE = "idle",
    THINKING = "thinking",
    EXECUTING = "executing",
    WAITING = "waiting",
    COMBAT = "combat",
    DEAD = "dead",
    PATROL = "patrol",
    SLEEP = "sleep",
    FEAR = "fear",
    TRADING = "trading",
    LEADING = "leading",
    DYING = "dying",
    ROMANCE = "romance",
    COURTSHIP = "courtship",
    MENTOR = "mentor",
    STUDENT = "student",
    POLITICS = "politics",
    BETRAYAL = "betrayal"
}

--- 状态中文名映射（用于日志与调试）
AgentCore.STATE_NAME = {
    idle = "空闲", thinking = "思考", executing = "执行", waiting = "等待",
    combat = "战斗", dead = "死亡", patrol = "巡逻", sleep = "睡眠",
    fear = "恐惧", trading = "交易", leading = "引导", dying = "濒死",
    romance = "浪漫", courtship = "求爱", mentor = "教导", student = "求学",
    politics = "政治", betrayal = "背叛"
}

--- Utility 需求维度权重默认值（10+ 维度）
AgentCore.UTILITY_WEIGHTS = {
    hunger = 1.0,
    safety = 1.2,
    social = 0.8,
    wealth = 0.6,
    prestige = 0.7,
    romance = 0.5,
    curiosity = 0.4,
    loyalty = 0.9,
    revenge = 0.3,
    faith = 0.4
}

--- 情绪枚举
AgentCore.MOOD = {
    CALM = "calm",
    ANGRY = "angry",
    HAPPY = "happy",
    SAD = "sad",
    ANXIOUS = "anxious",
    EXCITED = "excited",
    BORED = "bored",
    SUSPICIOUS = "suspicious",
    ROMANTIC = "romantic",
    CONFIDENT = "confident"
}

--- 情绪对语气的影响系数
AgentCore.MOOD_SPEECH_MODIFIER = {
    calm = { speed = 1.0, aggression = 0.0, warmth = 0.5 },
    angry = { speed = 1.3, aggression = 0.8, warmth = -0.5 },
    happy = { speed = 1.1, aggression = -0.3, warmth = 0.8 },
    sad = { speed = 0.8, aggression = -0.2, warmth = 0.3 },
    anxious = { speed = 1.2, aggression = 0.2, warmth = 0.0 },
    excited = { speed = 1.3, aggression = 0.1, warmth = 0.6 },
    bored = { speed = 0.7, aggression = -0.1, warmth = -0.3 },
    suspicious = { speed = 0.9, aggression = 0.3, warmth = -0.4 },
    romantic = { speed = 0.9, aggression = -0.5, warmth = 1.0 },
    confident = { speed = 1.0, aggression = 0.2, warmth = 0.4 }
}

--- 感官到记忆宫殿房间的映射
AgentCore.SENSE_ROOM_MAP = {
    sight = "光明殿",
    hearing = "回声廊",
    smell = "芳香阁",
    taste = "五味堂",
    touch = "触觉岩",
    threat = "阴影室",
    social = "关系镜厅",
    item = "契约厅",
    positive_relation = "恩情殿",
    negative_relation = "阴影室",
    gossip = "流言井",
    goal = "天命阁",
    economy = "金算盘",
    combat = "血战壕"
}

--- 默认识别范围
AgentCore.DEFAULT_VISUAL_RANGE = 400
AgentCore.DEFAULT_HEARING_RANGE = 600
AgentCore.DEFAULT_SMELL_RANGE = 200

--- 默认最大笔记数量（对话上下文）
AgentCore.MAX_DIALOG_TURNS = 20

--- 刺激衰减系数（每秒衰减）
AgentCore.STIMULUS_DECAY = 0.05

--- 思考间隔基准值
AgentCore.BASE_THINK_INTERVAL = 10

--- 最小思考间隔（被攻击时）
AgentCore.MIN_THINK_INTERVAL = 1.5

--- 最大思考间隔（平静时）
AgentCore.MAX_THINK_INTERVAL = 60

--- Fallback 最大重试次数（增强到 5 次）
AgentCore.MAX_FALLBACK_RETRIES = 5

--- 动作到 Utility 需求映射（增强版，覆盖 10 维度）
AgentCore.ACTION_NEEDS = {
    move_to = { hunger = 0.1, safety = 0.3, social = 0.2, wealth = 0.1, prestige = 0.1, romance = 0.1, curiosity = 0.2, loyalty = 0, revenge = 0, faith = 0 },
    speak = { hunger = 0, safety = 0, social = 1.0, wealth = 0, prestige = 0.3, romance = 0.4, curiosity = 0.1, loyalty = 0.2, revenge = 0.1, faith = 0.1 },
    trade_initiate = { hunger = 0, safety = 0, social = 0.4, wealth = 1.0, prestige = 0.1, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    invite_party = { hunger = 0, safety = 0.2, social = 0.9, wealth = 0, prestige = 0.2, romance = 0.1, curiosity = 0.1, loyalty = 0.3, revenge = 0, faith = 0 },
    lead_to = { hunger = 0, safety = 0.1, social = 0.5, wealth = 0.1, prestige = 0.3, romance = 0, curiosity = 0, loyalty = 0.2, revenge = 0, faith = 0 },
    engage_combat = { hunger = 0, safety = -0.3, social = 0, wealth = 0.1, prestige = 1.0, romance = 0, curiosity = 0, loyalty = 0.2, revenge = 0.9, faith = 0.1 },
    setup_stall = { hunger = 0, safety = 0, social = 0.3, wealth = 1.0, prestige = 0.1, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    cast_spell = { hunger = 0, safety = 0.4, social = 0, wealth = 0, prestige = 0.5, romance = 0, curiosity = 0.3, loyalty = 0, revenge = 0.2, faith = 0.4 },
    wait_for = { hunger = 0, safety = 0.2, social = 0, wealth = 0, prestige = 0, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    use_item = { hunger = 0.5, safety = 0.4, social = 0, wealth = 0, prestige = 0, romance = 0.1, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    gather = { hunger = 0.2, safety = 0.1, social = 0, wealth = 0.8, prestige = 0, romance = 0, curiosity = 0.1, loyalty = 0, revenge = 0, faith = 0 },
    craft = { hunger = 0, safety = 0.1, social = 0, wealth = 0.7, prestige = 0.2, romance = 0, curiosity = 0.2, loyalty = 0, revenge = 0, faith = 0 },
    rest = { hunger = 0, safety = 0.8, social = 0, wealth = 0, prestige = 0, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0.1 },
    flee = { hunger = 0, safety = 1.0, social = 0, wealth = -0.1, prestige = -0.2, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    taunt = { hunger = 0, safety = -0.2, social = 0.6, wealth = 0, prestige = 0.4, romance = 0, curiosity = 0, loyalty = 0, revenge = 0.5, faith = 0 },
    bribe = { hunger = 0, safety = 0.3, social = 0.4, wealth = 0.9, prestige = 0.1, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    propose = { hunger = 0, safety = 0, social = 0.8, wealth = 0, prestige = 0.3, romance = 1.0, curiosity = 0, loyalty = 0.4, revenge = 0, faith = 0.2 },
    teach = { hunger = 0, safety = 0, social = 0.6, wealth = 0, prestige = 0.5, romance = 0, curiosity = 0.3, loyalty = 0.5, revenge = 0, faith = 0.1 },
    learn = { hunger = 0, safety = 0, social = 0.4, wealth = 0, prestige = 0.2, romance = 0, curiosity = 1.0, loyalty = 0.3, revenge = 0, faith = 0.1 },
    produce = { hunger = 0, safety = 0.1, social = 0, wealth = 0.9, prestige = 0.1, romance = 0, curiosity = 0.1, loyalty = 0, revenge = 0, faith = 0 },
    consume = { hunger = 0.8, safety = 0.1, social = 0.1, wealth = -0.2, prestige = 0, romance = 0, curiosity = 0, loyalty = 0, revenge = 0, faith = 0 },
    invest = { hunger = 0, safety = 0, social = 0.2, wealth = 0.9, prestige = 0.2, romance = 0, curiosity = 0.2, loyalty = 0, revenge = 0, faith = 0 }
}

--- 默认派系配置
AgentCore.DEFAULT_FACTION_ID = "neutral"

--- 默认生活目标里程碑模板
AgentCore.LIFE_GOAL_TEMPLATES = {
    merchant = {
        { name = "积累第一桶金", condition = "wealth >= 1000" },
        { name = "开设第一家店", condition = "has_shop = true" },
        { name = "成为商会领袖", condition = "prestige >= 80" }
    },
    warrior = {
        { name = "赢得第一场战斗", condition = "combat_wins >= 1" },
        { name = "击败强者", condition = "defeated_boss = true" },
        { name = "获得传奇武器", condition = "has_legendary_weapon = true" }
    },
    scholar = {
        { name = "掌握基本知识", condition = "skills_learned >= 3" },
        { name = "撰写著作", condition = "has_written_book = true" },
        { name = "建立学院", condition = "has_academy = true" }
    },
    lover = {
        { name = "找到意中人", condition = "romance_partner ~= nil" },
        { name = "结为夫妻", condition = "is_married = true" },
        { name = "建立家庭", condition = "has_children >= 1" }
    }
}

------------------------------------------------------------------------
-- 三、FSM 状态机（Enter / Update / Exit 钩子 + 历史记录）
------------------------------------------------------------------------

AgentCore.FSM = {
    Enter = {},
    Update = {},
    Exit = {}
}

--- 记录状态历史
function AgentCore.RecordStateHistory(npcId, oldState, newState)
    AgentCore.stateHistories[npcId] = AgentCore.stateHistories[npcId] or { states = {}, maxDepth = 20 }
    local hist = AgentCore.stateHistories[npcId]
    table.insert(hist.states, {
        from = oldState,
        to = newState,
        time = GetWorldTime()
    })
    while #hist.states > hist.maxDepth do
        table.remove(hist.states, 1)
    end
end

--- 状态回溯：返回上一个有意义的状态
function AgentCore.RevertState(npcId)
    local hist = AgentCore.stateHistories[npcId]
    if not hist or #hist.states == 0 then return nil end
    local last = hist.states[#hist.states]
    return last.from
end

--- 状态切换辅助函数（增强版，带历史记录）
function AgentCore.TransitionState(npcId, newState)
    local agent = AgentCore.agents[npcId]
    if not agent then return end
    local oldState = agent.state
    if oldState == newState then return end

    -- 调用旧状态 Exit
    if AgentCore.FSM.Exit[oldState] then
        AgentCore.FSM.Exit[oldState](npcId, agent)
    end

    -- 记录历史
    AgentCore.RecordStateHistory(npcId, oldState, newState)

    agent.prevState = oldState
    agent.state = newState
    agent.stateEnterTime = GetWorldTime()

    -- 调用新状态 Enter
    if AgentCore.FSM.Enter[newState] then
        AgentCore.FSM.Enter[newState](npcId, agent)
    end

    EventLog.Append({
        type = "npc_state_change",
        actor = npcId,
        desc = string.format("%s -> %s", AgentCore.STATE_NAME[oldState] or oldState, AgentCore.STATE_NAME[newState] or newState),
        loc = agent.config and agent.config.loc or nil
    })
end

-- IDLE 状态
AgentCore.FSM.Enter[AgentCore.STATE.IDLE] = function(npcId, agent)
    agent.timer = 0
    if _G.NpcStopMovement then NpcStopMovement(npcId) end
end
AgentCore.FSM.Update[AgentCore.STATE.IDLE] = function(npcId, agent, dt)
    local scheduleState = AgentCore.GetScheduledState(npcId)
    if scheduleState and scheduleState ~= AgentCore.STATE.IDLE and scheduleState ~= agent.state then
        AgentCore.TransitionState(npcId, scheduleState)
        return
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.IDLE] = function(npcId, agent)
    -- 无需清理
end

-- THINKING 状态
AgentCore.FSM.Enter[AgentCore.STATE.THINKING] = function(npcId, agent)
    agent.thinkStartTime = GetWorldTime()
end
AgentCore.FSM.Update[AgentCore.STATE.THINKING] = function(npcId, agent, dt)
    local now = GetWorldTime()
    if agent.thinkStartTime and (now - agent.thinkStartTime) > 45 then
        agent.state = AgentCore.STATE.IDLE
        EventLog.Append({ type = "npc_think_timeout", actor = npcId, desc = "LLM 思考超时" })
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.THINKING] = function(npcId, agent)
    agent.thinkStartTime = nil
end

-- EXECUTING 状态
AgentCore.FSM.Enter[AgentCore.STATE.EXECUTING] = function(npcId, agent)
    agent.timer = 0
end
AgentCore.FSM.Update[AgentCore.STATE.EXECUTING] = function(npcId, agent, dt)
    local step = agent.plan[agent.planIndex]
    if step then
        local done = AgentCore.ExecuteStep(npcId, step, dt)
        if done then
            agent.planIndex = agent.planIndex + 1
            if agent.planIndex > #agent.plan then
                agent.plan = {}
                agent.planIndex = 1
                AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
            end
        end
    else
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.EXECUTING] = function(npcId, agent)
    -- 保留计划状态，下次续行
end

-- WAITING 状态
AgentCore.FSM.Enter[AgentCore.STATE.WAITING] = function(npcId, agent)
    agent.timer = agent.timer or 5
end
AgentCore.FSM.Update[AgentCore.STATE.WAITING] = function(npcId, agent, dt)
    agent.timer = agent.timer - dt
    if agent.timer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.EXECUTING)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.WAITING] = function(npcId, agent)
    agent.timer = 0
end

-- COMBAT 战斗状态
AgentCore.FSM.Enter[AgentCore.STATE.COMBAT] = function(npcId, agent)
    agent.combatStartTime = GetWorldTime()
    agent.combatTarget = agent.combatTarget or nil
    AgentCore.RegisterStimulus(npcId, "combat", 1.0)
    AgentCore.SelectCombatTarget(npcId)
    AgentCore.PlanCombatCombo(npcId)
end
AgentCore.FSM.Update[AgentCore.STATE.COMBAT] = function(npcId, agent, dt)
    if agent.combatTarget then
        local targetDead = false
        if _G.IsNpcDead then targetDead = IsNpcDead(agent.combatTarget) end
        if _G.IsPlayerDead then targetDead = targetDead or IsPlayerDead(agent.combatTarget) end
        if targetDead then
            agent.combatTarget = nil
            AgentCore.OnCombatVictory(npcId)
            AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
            return
        end
    else
        AgentCore.SelectCombatTarget(npcId)
        if not agent.combatTarget then
            AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
            return
        end
    end
    -- 战斗AI：每2秒重新评估是否撤退
    local cache = AgentCore.combatCache[npcId] or {}
    local now = GetWorldTime()
    if not cache.retreatCheckedAt or (now - cache.retreatCheckedAt) >= 2 then
        cache.retreatCheckedAt = now
        AgentCore.combatCache[npcId] = cache
        if AgentCore.ShouldRetreat(npcId) then
            AgentCore.TransitionState(npcId, AgentCore.STATE.FEAR)
            return
        end
    end
    -- 执行连击队列中的下一个动作
    AgentCore.ExecuteCombatTick(npcId, dt)
    -- 战斗超时
    if agent.combatStartTime and (GetWorldTime() - agent.combatStartTime) > 120 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.FEAR)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.COMBAT] = function(npcId, agent)
    agent.combatStartTime = nil
    local cache = AgentCore.combatCache[npcId] or {}
    cache.comboQueue = {}
    AgentCore.combatCache[npcId] = cache
end

-- DEAD 死亡状态
AgentCore.FSM.Enter[AgentCore.STATE.DEAD] = function(npcId, agent)
    agent.plan = {}
    agent.planIndex = 1
    if _G.NpcEnterDeadState then NpcEnterDeadState(npcId) end
end
AgentCore.FSM.Update[AgentCore.STATE.DEAD] = function(npcId, agent, dt)
    -- 死亡后不再更新
end
AgentCore.FSM.Exit[AgentCore.STATE.DEAD] = function(npcId, agent)
    -- 通常不会退出
end

-- PATROL 巡逻状态
AgentCore.FSM.Enter[AgentCore.STATE.PATROL] = function(npcId, agent)
    agent.patrolIndex = 1
    agent.patrolWaypoints = agent.config and agent.config.patrolWaypoints or {}
    if #agent.patrolWaypoints > 0 and _G.NpcMoveTo then
        NpcMoveTo(npcId, agent.patrolWaypoints[1])
    end
end
AgentCore.FSM.Update[AgentCore.STATE.PATROL] = function(npcId, agent, dt)
    local waypoints = agent.patrolWaypoints or {}
    if #waypoints == 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
        return
    end
    if _G.NpcHasArrived and NpcHasArrived(npcId) then
        agent.patrolIndex = agent.patrolIndex + 1
        if agent.patrolIndex > #waypoints then
            agent.patrolIndex = 1
        end
        NpcMoveTo(npcId, waypoints[agent.patrolIndex])
    end
    local percepts = AgentCore.perceptions[npcId]
    if percepts and percepts.threats and #percepts.threats > 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.FEAR)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.PATROL] = function(npcId, agent)
    agent.patrolWaypoints = nil
    agent.patrolIndex = nil
end

-- SLEEP 睡眠状态
AgentCore.FSM.Enter[AgentCore.STATE.SLEEP] = function(npcId, agent)
    if _G.NpcStopMovement then NpcStopMovement(npcId) end
    if _G.SetNpcAnimation then SetNpcAnimation(npcId, "sleep") end
end
AgentCore.FSM.Update[AgentCore.STATE.SLEEP] = function(npcId, agent, dt)
    local percepts = AgentCore.perceptions[npcId]
    if percepts and percepts.threats and #percepts.threats > 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.FEAR)
        return
    end
    local scheduleState = AgentCore.GetScheduledState(npcId)
    if scheduleState and scheduleState ~= AgentCore.STATE.SLEEP then
        AgentCore.TransitionState(npcId, scheduleState)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.SLEEP] = function(npcId, agent)
    if _G.SetNpcAnimation then SetNpcAnimation(npcId, "idle") end
end

-- FEAR 恐惧状态
AgentCore.FSM.Enter[AgentCore.STATE.FEAR] = function(npcId, agent)
    local hideLoc = agent.config and agent.config.hideLoc or agent.homeLoc
    if hideLoc and _G.NpcMoveTo then
        NpcMoveTo(npcId, hideLoc)
    end
end
AgentCore.FSM.Update[AgentCore.STATE.FEAR] = function(npcId, agent, dt)
    local percepts = AgentCore.perceptions[npcId]
    local noThreat = (not percepts) or (not percepts.threats) or (#percepts.threats == 0)
    if noThreat then
        if _G.NpcHasArrived and NpcHasArrived(npcId) then
            AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
        end
    end
    agent.timer = (agent.timer or 30) - dt
    if agent.timer <= 0 then
        agent.timer = 0
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.FEAR] = function(npcId, agent)
    agent.timer = 0
end

-- TRADING 交易状态
AgentCore.FSM.Enter[AgentCore.STATE.TRADING] = function(npcId, agent)
    agent.tradeTarget = agent.pendingTradeTarget or nil
    agent.tradeTimer = 60
end
AgentCore.FSM.Update[AgentCore.STATE.TRADING] = function(npcId, agent, dt)
    agent.tradeTimer = agent.tradeTimer - dt
    if agent.tradeTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.TRADING] = function(npcId, agent)
    agent.tradeTarget = nil
    agent.pendingTradeTarget = nil
    if _G.NpcCloseTradeWindow then NpcCloseTradeWindow(npcId) end
end

-- LEADING 引导状态
AgentCore.FSM.Enter[AgentCore.STATE.LEADING] = function(npcId, agent)
    agent.leadTarget = agent.pendingLeadDestination or nil
    if agent.leadTarget and _G.NpcLeadTo then
        NpcLeadTo(npcId, agent.leadTarget)
    end
end
AgentCore.FSM.Update[AgentCore.STATE.LEADING] = function(npcId, agent, dt)
    if _G.NpcHasArrived and NpcHasArrived(npcId) then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
        return
    end
    agent.timer = (agent.timer or 120) - dt
    if agent.timer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.LEADING] = function(npcId, agent)
    agent.leadTarget = nil
    agent.pendingLeadDestination = nil
end

-- DYING 濒死状态
AgentCore.FSM.Enter[AgentCore.STATE.DYING] = function(npcId, agent)
    agent.dyingTimer = 10
    if _G.SetNpcAnimation then SetNpcAnimation(npcId, "dying") end
end
AgentCore.FSM.Update[AgentCore.STATE.DYING] = function(npcId, agent, dt)
    agent.dyingTimer = agent.dyingTimer - dt
    if agent.dyingTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.DEAD)
        return
    end
    local percepts = AgentCore.perceptions[npcId]
    if percepts and percepts.healers and #percepts.healers > 0 then
        if _G.GetNpcHp and _G.GetNpcMaxHp then
            if GetNpcHp(npcId) > GetNpcMaxHp(npcId) * 0.1 then
                AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
            end
        end
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.DYING] = function(npcId, agent)
    agent.dyingTimer = nil
end

-- ROMANCE 浪漫状态
AgentCore.FSM.Enter[AgentCore.STATE.ROMANCE] = function(npcId, agent)
    agent.romanceTimer = 30
    if _G.NpcStopMovement then NpcStopMovement(npcId) end
    AgentCore.SetMood(npcId, AgentCore.MOOD.ROMANTIC, 0.7)
end
AgentCore.FSM.Update[AgentCore.STATE.ROMANCE] = function(npcId, agent, dt)
    agent.romanceTimer = (agent.romanceTimer or 30) - dt
    if agent.romanceTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
    -- 若伴侣不在附近则中断
    local romance = AgentCore.romances[npcId]
    if romance and romance.partnerId then
        local partnerNear = AgentCore.IsTargetInRange(npcId, romance.partnerId, 300)
        if not partnerNear then
            AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
        end
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.ROMANCE] = function(npcId, agent)
    agent.romanceTimer = nil
end

-- COURTSHIP 求爱状态
AgentCore.FSM.Enter[AgentCore.STATE.COURTSHIP] = function(npcId, agent)
    agent.courtshipTimer = 60
    agent.courtshipAttempts = (agent.courtshipAttempts or 0) + 1
end
AgentCore.FSM.Update[AgentCore.STATE.COURTSHIP] = function(npcId, agent, dt)
    agent.courtshipTimer = (agent.courtshipTimer or 60) - dt
    if agent.courtshipTimer <= 0 then
        -- 求爱超时，回到 IDLE
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
    -- 每10秒尝试发送一次求爱话语
    if math.floor(agent.courtshipTimer) % 10 == 0 then
        local romance = AgentCore.romances[npcId]
        if romance and romance.partnerId then
            if _G.ServerBroadcastNpcSpeech then
                ServerBroadcastNpcSpeech(npcId, AgentCore.GetCourtshipSpeech(npcId, romance.partnerId))
            end
        end
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.COURTSHIP] = function(npcId, agent)
    agent.courtshipTimer = nil
end

-- MENTOR 教导状态
AgentCore.FSM.Enter[AgentCore.STATE.MENTOR] = function(npcId, agent)
    agent.mentorTimer = 120
    local mentorship = AgentCore.mentorships[npcId]
    if mentorship and mentorship.students then
        for _, sid in ipairs(mentorship.students) do
            if _G.ServerBroadcastNpcSpeech then
                ServerBroadcastNpcSpeech(npcId, "认真听讲，" .. sid .. "。")
            end
        end
    end
end
AgentCore.FSM.Update[AgentCore.STATE.MENTOR] = function(npcId, agent, dt)
    agent.mentorTimer = (agent.mentorTimer or 120) - dt
    if agent.mentorTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
    -- 模拟教学进度增长
    local mentorship = AgentCore.mentorships[npcId]
    if mentorship and mentorship.students then
        for _, sid in ipairs(mentorship.students) do
            local skill = agent.mentorSkill or "通用技艺"
            AgentCore.AdvanceStudentSkill(sid, skill, dt * 0.5)
        end
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.MENTOR] = function(npcId, agent)
    agent.mentorTimer = nil
    agent.mentorSkill = nil
end

-- STUDENT 求学状态
AgentCore.FSM.Enter[AgentCore.STATE.STUDENT] = function(npcId, agent)
    agent.studentTimer = 120
    local mentorship = AgentCore.mentorships[npcId]
    if mentorship and mentorship.mentorId then
        if _G.ServerBroadcastNpcSpeech then
            ServerBroadcastNpcSpeech(npcId, "弟子拜见 " .. mentorship.mentorId .. "。")
        end
    end
end
AgentCore.FSM.Update[AgentCore.STATE.STUDENT] = function(npcId, agent, dt)
    agent.studentTimer = (agent.studentTimer or 120) - dt
    if agent.studentTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.STUDENT] = function(npcId, agent)
    agent.studentTimer = nil
end

-- POLITICS 政治状态
AgentCore.FSM.Enter[AgentCore.STATE.POLITICS] = function(npcId, agent)
    agent.politicsTimer = 90
    local faction = AgentCore.factions[npcId]
    if faction then
        EventLog.Append({
            type = "npc_politics_enter",
            actor = npcId,
            desc = "进入派系政治活动， faction=" .. faction.factionId,
            loc = agent.config and agent.config.loc or nil
        })
    end
end
AgentCore.FSM.Update[AgentCore.STATE.POLITICS] = function(npcId, agent, dt)
    agent.politicsTimer = (agent.politicsTimer or 90) - dt
    if agent.politicsTimer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
    -- 政治活动中偶然触发联盟计划
    if math.random() < 0.02 then
        AgentCore.EvaluatePoliticalAlliance(npcId)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.POLITICS] = function(npcId, agent)
    agent.politicsTimer = nil
end

-- BETRAYAL 背叛状态
AgentCore.FSM.Enter[AgentCore.STATE.BETRAYAL] = function(npcId, agent)
    agent.betrayalTimer = 60
    AgentCore.SetMood(npcId, AgentCore.MOOD.ANGRY, 0.9)
    EventLog.Append({
        type = "npc_betrayal",
        actor = npcId,
        desc = "踏入背叛之路",
        loc = agent.config and agent.config.loc or nil
    })
end
AgentCore.FSM.Update[AgentCore.STATE.BETRAYAL] = function(npcId, agent, dt)
    agent.betrayalTimer = (agent.betrayalTimer or 60) - dt
    if agent.betrayalTimer <= 0 then
        -- 执行预谋的背叛动作
        AgentCore.ExecuteBetrayal(npcId)
        AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
    end
end
AgentCore.FSM.Exit[AgentCore.STATE.BETRAYAL] = function(npcId, agent)
    agent.betrayalTimer = nil
end

------------------------------------------------------------------------
-- 四、HTN（层次任务网络）分解器
------------------------------------------------------------------------

AgentCore.HTNPlanner = AgentCore.HTNPlanner or {}

--- HTN 复合任务库
AgentCore.HTNPlanner.library = {
    ["招待客人"] = {
        {
            name = "标准招待",
            preconditions = { { "has_location", "客厅" }, { "has_food", true } },
            effects = { { "guest_satisfied", true }, { "prestige_delta", 2 } },
            subtasks = {
                { action = "move_to", target = "客厅" },
                { action = "speak", content = "欢迎光临，请随我来。" },
                { action = "use_item", item_id = "food_tray", target = "${guest}" },
                { action = "trade_initiate", target_player = "${guest}" },
                { action = "lead_to", destination = "客房" }
            }
        },
        {
            name = "简单招待",
            preconditions = { { "has_location", "客厅" } },
            effects = { { "guest_satisfied", true } },
            subtasks = {
                { action = "move_to", target = "客厅" },
                { action = "speak", content = "欢迎，请自便。" },
                { action = "wait_for", timeout = 30 }
            }
        }
    },
    ["复仇"] = {
        {
            name = "直接复仇",
            preconditions = { { "has_enemy", "${enemy}" }, { "revenge_motive", true } },
            effects = { { "enemy_harmed", true }, { "revenge_satisfied", true }, { "infamy_delta", 5 } },
            subtasks = {
                { action = "move_to", target = "${enemy_last_loc}" },
                { action = "speak", content = "你欠我的，该还了。" },
                { action = "engage_combat", target = "${enemy}" },
                { action = "wait_for", timeout = 10 }
            }
        },
        {
            name = "间接复仇",
            preconditions = { { "has_enemy", "${enemy}" }, { "wealth", ">=", 100 } },
            effects = { { "enemy_social_harmed", true }, { "revenge_satisfied", true }, { "wealth_delta", -50 } },
            subtasks = {
                { action = "speak", content = "我会让你身败名裂。" },
                { action = "bribe", target = "${influencer}", gold_amount = 50 },
                { action = "wait_for", timeout = 20 }
            }
        }
    },
    ["追求"] = {
        {
            name = "浪漫追求",
            preconditions = { { "has_crush", "${target}" }, { "romance_need", ">=", 60 } },
            effects = { { "romance_progress", "+20" }, { "prestige_delta", 1 } },
            subtasks = {
                { action = "move_to", target = "${target_loc}" },
                { action = "speak", content = "你今天格外动人。" },
                { action = "propose", target = "${target}" },
                { action = "wait_for", timeout = 15 }
            }
        },
        {
            name = "礼物追求",
            preconditions = { { "has_crush", "${target}" }, { "has_item", "${gift}" } },
            effects = { { "romance_progress", "+30" }, { "relationship_delta", 10 } },
            subtasks = {
                { action = "move_to", target = "${target_loc}" },
                { action = "speak", content = "这是我的心意。" },
                { action = "use_item", item_id = "${gift}", target = "${target}" },
                { action = "wait_for", timeout = 10 }
            }
        }
    },
    ["教学"] = {
        {
            name = "正式授课",
            preconditions = { { "has_students" }, { "has_skill", "${skill}" } },
            effects = { { "student_progress", "+15" }, { "prestige_delta", 3 }, { "wealth_delta", 10 } },
            subtasks = {
                { action = "move_to", target = "教室" },
                { action = "speak", content = "今日讲授 ${skill}。" },
                { action = "teach", skill = "${skill}", students = "${students}" },
                { action = "wait_for", timeout = 60 }
            }
        },
        {
            name = "单独辅导",
            preconditions = { { "has_student", "${student}" }, { "has_skill", "${skill}" } },
            effects = { { "student_progress", "+25" }, { "loyalty_delta", 5 } },
            subtasks = {
                { action = "move_to", target = "${student_loc}" },
                { action = "speak", content = "我来指点你一二。" },
                { action = "teach", skill = "${skill}", student = "${student}" },
                { action = "wait_for", timeout = 30 }
            }
        }
    },
    ["政治联盟"] = {
        {
            name = "正式结盟",
            preconditions = { { "faction_rank", ">=", "officer" }, { "target_faction", "${target_faction}" } },
            effects = { { "alliance_formed", true }, { "faction_prestige", "+10" } },
            subtasks = {
                { action = "move_to", target = "议会厅" },
                { action = "speak", content = "愿与对方缔结盟约。" },
                { action = "wait_for", timeout = 20 },
                { action = "speak", content = "盟约已成。" }
            }
        },
        {
            name = "秘密结盟",
            preconditions = { { "faction_rank", ">=", "member" }, { "secrecy", true } },
            effects = { { "secret_alliance", true }, { "loyalty_delta", -5 } },
            subtasks = {
                { action = "move_to", target = "暗巷" },
                { action = "speak", content = "此事不可外传。" },
                { action = "wait_for", timeout = 10 }
            }
        }
    },
    ["商业经营"] = {
        {
            name = "开店营业",
            preconditions = { { "has_shop", true }, { "has_goods", true } },
            effects = { { "wealth_delta", "+variable" }, { "prestige_delta", 1 } },
            subtasks = {
                { action = "move_to", target = "集市" },
                { action = "setup_stall", goods_list = "${goods}" },
                { action = "speak", content = "来看一看，瞧一瞧！" },
                { action = "wait_for", timeout = 300 }
            }
        },
        {
            name = "采购补货",
            preconditions = { { "has_gold", ">=", 50 } },
            effects = { { "inventory_value", "+" }, { "wealth_delta", -50 } },
            subtasks = {
                { action = "move_to", target = "批发市场" },
                { action = "trade_initiate", target_player = "${supplier}" },
                { action = "wait_for", timeout = 30 }
            }
        }
    },
    ["探险"] = {
        {
            name = "野外探险",
            preconditions = { { "has_tool", "${tool}" }, { "curiosity", ">=", 40 } },
            effects = { { "discovery_chance", 0.3 }, { "prestige_delta", 2 }, { "wealth_delta", "+variable" } },
            subtasks = {
                { action = "move_to", target = "${wilderness_loc}" },
                { action = "gather", resource_id = "${resource_id}", tool_id = "${tool}", amount = 5 },
                { action = "speak", content = "这里果然有好东西。" },
                { action = "move_to", target = "${home}" }
            }
        },
        {
            name = "遗迹探险",
            preconditions = { { "has_tool", "${tool}" }, { "prestige", ">=", 30 }, { "curiosity", ">=", 60 } },
            effects = { { "discovery_chance", 0.5 }, { "prestige_delta", 5 }, { "wealth_delta", "+variable" } },
            subtasks = {
                { action = "move_to", target = "${ruin_loc}" },
                { action = "gather", resource_id = "artifact", tool_id = "${tool}", amount = 1 },
                { action = "speak", content = "历史的痕迹……" },
                { action = "move_to", target = "${home}" }
            }
        }
    },
    ["防御"] = {
        {
            name = "阵地防御",
            preconditions = { { "threat_detected", true }, { "has_home", true } },
            effects = { { "safety_delta", 10 }, { "prestige_delta", 2 } },
            subtasks = {
                { action = "move_to", target = "${home}" },
                { action = "speak", content = "不许再靠近！" },
                { action = "engage_combat", target = "${nearest_threat}" },
                { action = "wait_for", timeout = 30 }
            }
        },
        {
            name = "警戒巡逻",
            preconditions = { { "has_post", true } },
            effects = { { "safety_delta", 5 } },
            subtasks = {
                { action = "move_to", target = "${post_waypoint_1}" },
                { action = "wait_for", timeout = 10 },
                { action = "move_to", target = "${post_waypoint_2}" },
                { action = "wait_for", timeout = 10 }
            }
        }
    },
    ["偷窃"] = {
        {
            name = "潜入偷窃",
            preconditions = { { "target_has_item", "${item}" }, { "safety", "<=", 40 }, { "wealth", "<=", 30 } },
            effects = { { "wealth_delta", "+variable" }, { "infamy_delta", 10 }, { "relationship_delta", -20 } },
            subtasks = {
                { action = "move_to", target = "${target_loc}" },
                { action = "wait_for", timeout = 5 },
                { action = "speak", content = "（看起来漫不经心）" },
                { action = "move_to", target = "${hide_loc}" }
            }
        },
        {
            name = "扒窃",
            preconditions = { { "target_nearby", true }, { "stealth_skill", ">=", 20 } },
            effects = { { "wealth_delta", "+variable" }, { "infamy_delta", 5 } },
            subtasks = {
                { action = "move_to", target = "${target}" },
                { action = "speak", content = "借过一下。" },
                { action = "move_to", target = "${crowd}" }
            }
        }
    },
    ["仪式"] = {
        {
            name = "公开仪式",
            preconditions = { { "has_location", "祭坛" }, { "faith", ">=", 30 } },
            effects = { { "faith_delta", 5 }, { "prestige_delta", 3 }, { "social_delta", 5 } },
            subtasks = {
                { action = "move_to", target = "祭坛" },
                { action = "speak", content = "诸位，今日举行大典。" },
                { action = "wait_for", timeout = 60 },
                { action = "speak", content = "仪式已成，天佑众生。" }
            }
        },
        {
            name = "私下祈祷",
            preconditions = { { "has_location", "静室" } },
            effects = { { "faith_delta", 3 }, { "safety_delta", 2 } },
            subtasks = {
                { action = "move_to", target = "静室" },
                { action = "wait_for", timeout = 30 },
                { action = "speak", content = "（低声祈祷）" }
            }
        }
    }
}

--- 替换 HTN 子任务中的模板变量
function AgentCore.HTNPlanner.SubstituteVars(subtask, vars)
    vars = vars or {}
    local result = {}
    for k, v in pairs(subtask) do
        if type(v) == "string" then
            result[k] = v:gsub("%${([%w_]+)}", function(key)
                return tostring(vars[key] or v)
            end)
        elseif type(v) == "table" then
            result[k] = {}
            for kk, vv in pairs(v) do
                if type(vv) == "string" then
                    result[k][kk] = vv:gsub("%${([%w_]+)}", function(key)
                        return tostring(vars[key] or vv)
                    end)
                else
                    result[k][kk] = vv
                end
            end
        else
            result[k] = v
        end
    end
    return result
end

--- 检查前置条件（增强版）
function AgentCore.HTNPlanner.CheckPreconditions(npcId, method, vars)
    if not method.preconditions then return true end
    local agent = AgentCore.agents[npcId]
    local needs = AgentCore.GetNpcNeeds(npcId)
    for _, pre in ipairs(method.preconditions) do
        local condType = pre[1]
        if condType == "has_location" then
            local targetLoc = pre[2]
            if agent and agent.config and agent.config.loc ~= targetLoc then
                -- 可分解，返回 true
            end
        elseif condType == "has_tool" then
            local toolId = AgentCore.HTNPlanner.SubstituteVars({x=pre[2]}, vars).x
            if _G.NpcHasItem and not NpcHasItem(npcId, toolId, 1) then
                return false
            end
        elseif condType == "has_food" then
            if pre[2] == true and _G.NpcHasItem and not NpcHasItem(npcId, "food", 1) then
                return false
            end
        elseif condType == "has_enemy" then
            local enemyId = AgentCore.HTNPlanner.SubstituteVars({x=pre[2]}, vars).x
            if AgentCore.GetRelationship(npcId, enemyId) > -30 then
                return false
            end
        elseif condType == "revenge_motive" then
            if (needs.revenge or 0) < 40 then
                return false
            end
        elseif condType == "has_crush" then
            local crushId = AgentCore.HTNPlanner.SubstituteVars({x=pre[2]}, vars).x
            if AgentCore.GetRelationship(npcId, crushId) < 30 then
                return false
            end
        elseif condType == "romance_need" then
            local threshold = pre[3] or 50
            if (needs.romance or 0) < threshold then
                return false
            end
        elseif condType == "has_students" then
            local mentorship = AgentCore.mentorships[npcId]
            if not mentorship or not mentorship.students or #mentorship.students == 0 then
                return false
            end
        elseif condType == "has_student" then
            local studentId = AgentCore.HTNPlanner.SubstituteVars({x=pre[2]}, vars).x
            local mentorship = AgentCore.mentorships[npcId]
            if not mentorship or not mentorship.students then
                return false
            end
            local found = false
            for _, s in ipairs(mentorship.students) do
                if s == studentId then found = true; break end
            end
            if not found then return false end
        elseif condType == "faction_rank" then
            local neededRank = pre[3] or "member"
            local faction = AgentCore.factions[npcId]
            if not faction then return false end
            local rankValue = { member = 1, officer = 2, leader = 3 }
            if (rankValue[faction.rank] or 0) < (rankValue[neededRank] or 0) then
                return false
            end
        elseif condType == "wealth" then
            local op = pre[2] or ">="
            local threshold = pre[3] or 0
            local val = needs.wealth or 0
            if op == ">=" and val < threshold then return false end
            if op == "<=" and val > threshold then return false end
        elseif condType == "curiosity" then
            local threshold = pre[3] or 0
            if (needs.curiosity or 0) < threshold then return false end
        elseif condType == "prestige" then
            local threshold = pre[3] or 0
            if (needs.prestige or 0) < threshold then return false end
        elseif condType == "faith" then
            local threshold = pre[3] or 0
            if (needs.faith or 0) < threshold then return false end
        elseif condType == "safety" then
            local op = pre[2] or ">="
            local threshold = pre[3] or 0
            local val = needs.safety or 0
            if op == ">=" and val < threshold then return false end
            if op == "<=" and val > threshold then return false end
        elseif condType == "stealth_skill" then
            local threshold = pre[3] or 0
            local skill = agent and agent.config and agent.config.stealth_skill or 0
            if skill < threshold then return false end
        elseif condType == "threat_detected" then
            local percepts = AgentCore.perceptions[npcId]
            if not percepts or not percepts.threats or #percepts.threats == 0 then
                return false
            end
        elseif condType == "has_home" then
            if not agent or not agent.homeLoc or agent.homeLoc == "" then
                return false
            end
        elseif condType == "has_post" then
            local posts = agent and agent.config and agent.config.patrolWaypoints
            if not posts or #posts == 0 then return false end
        elseif condType == "target_nearby" then
            local targetId = vars.target
            if not targetId or not AgentCore.IsTargetInRange(npcId, targetId, 200) then
                return false
            end
        end
    end
    return true
end

--- 将复合任务分解为原子任务列表
function AgentCore.HTNPlanner.Decompose(npcId, compoundTaskName, vars)
    vars = vars or {}
    local methods = AgentCore.HTNPlanner.library[compoundTaskName]
    if not methods then
        return false, "未知复合任务: " .. compoundTaskName
    end
    for _, method in ipairs(methods) do
        if AgentCore.HTNPlanner.CheckPreconditions(npcId, method, vars) then
            local plan = {}
            for _, sub in ipairs(method.subtasks) do
                local substituted = AgentCore.HTNPlanner.SubstituteVars(sub, vars)
                table.insert(plan, substituted)
            end
            return true, plan
        end
    end
    return false, "没有满足前置条件的分解方法"
end

--- 递归展开计划：若计划中存在复合任务 action，则继续分解
function AgentCore.HTNPlanner.ExpandPlan(npcId, plan)
    local expanded = {}
    for _, step in ipairs(plan) do
        if step.action and AgentCore.HTNPlanner.library[step.action] then
            local ok, subPlan = AgentCore.HTNPlanner.Decompose(npcId, step.action, step.vars or {})
            if ok then
                for _, s in ipairs(subPlan) do
                    table.insert(expanded, s)
                end
            else
                -- 记录失败并尝试 replan
                EventLog.Append({
                    type = "htn_decompose_failed",
                    actor = npcId,
                    desc = "HTN 分解失败: " .. tostring(step.action) .. "，尝试 replan",
                    raw = step
                })
                local replanned = AgentCore.HTNPlanner.TryReplan(npcId, step)
                for _, s in ipairs(replanned) do
                    table.insert(expanded, s)
                end
            end
        else
            table.insert(expanded, step)
        end
    end
    return expanded
end

--- 任务失败时的 replan 机制
function AgentCore.HTNPlanner.TryReplan(npcId, failedStep)
    local agent = AgentCore.agents[npcId]
    local needs = AgentCore.GetNpcNeeds(npcId)
    local fallbackPlan = {}
    -- 根据失败步骤的类型选择备用计划
    local action = failedStep.action or ""
    if action == "招待客人" then
        table.insert(fallbackPlan, { action = "speak", content = "抱歉，今日不便招待。" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 10 })
    elseif action == "复仇" then
        table.insert(fallbackPlan, { action = "speak", content = "这笔账，我记下了。" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 5 })
        -- 将复仇需求写入长期目标
        AgentCore.AddLifeGoal(npcId, "revenge_" .. tostring(failedStep.vars and failedStep.vars.enemy or "unknown"), {
            summary = "复仇",
            milestones = { { name = "找到仇人", done = false }, { name = "实施复仇", done = false } }
        })
    elseif action == "追求" then
        table.insert(fallbackPlan, { action = "speak", content = "看来时机未到……" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 10 })
    elseif action == "教学" then
        table.insert(fallbackPlan, { action = "speak", content = "今日授课取消，各自复习。" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 10 })
    elseif action == "政治联盟" then
        table.insert(fallbackPlan, { action = "speak", content = "结盟之事，容后再议。" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 10 })
    elseif action == "商业经营" then
        table.insert(fallbackPlan, { action = "speak", content = "今日不开张。" })
        table.insert(fallbackPlan, { action = "move_to", target = agent and agent.homeLoc or "家" })
    elseif action == "探险" then
        table.insert(fallbackPlan, { action = "speak", content = "探险取消，安全第一。" })
        table.insert(fallbackPlan, { action = "move_to", target = agent and agent.homeLoc or "家" })
    elseif action == "防御" then
        table.insert(fallbackPlan, { action = "flee", direction = agent and agent.homeLoc or "安全区", distance = 500 })
    elseif action == "偷窃" then
        table.insert(fallbackPlan, { action = "flee", direction = agent and agent.homeLoc or "暗巷", distance = 300 })
        table.insert(fallbackPlan, { action = "speak", content = "（迅速离开）" })
    elseif action == "仪式" then
        table.insert(fallbackPlan, { action = "speak", content = "仪式延后进行。" })
        table.insert(fallbackPlan, { action = "wait_for", timeout = 20 })
    else
        table.insert(fallbackPlan, { action = "wait_for", timeout = 5 })
    end
    return fallbackPlan
end

--- 手动触发 Replan（供外部调用）
function AgentCore.ReplanCurrentTask(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent or not agent.plan then return end
    local currentStep = agent.plan[agent.planIndex]
    if not currentStep then
        agent.plan = {}
        agent.planIndex = 1
        return
    end
    local replanned = AgentCore.HTNPlanner.TryReplan(npcId, currentStep)
    -- 用 replan 结果替换当前及后续步骤
    local newPlan = {}
    for i = 1, agent.planIndex - 1 do
        table.insert(newPlan, agent.plan[i])
    end
    for _, s in ipairs(replanned) do
        table.insert(newPlan, s)
    end
    agent.plan = newPlan
    agent.planIndex = agent.planIndex
end

------------------------------------------------------------------------
-- 五、Utility AI 选择器（增强版）
------------------------------------------------------------------------

--- 获取 NPC 当前需求值（10+ 维度）
function AgentCore.GetNpcNeeds(npcId)
    local needs = {
        hunger = 50, safety = 50, social = 50, wealth = 50, prestige = 50,
        romance = 50, curiosity = 50, loyalty = 50, revenge = 50, faith = 50
    }
    if _G.GetNpcHunger then needs.hunger = GetNpcHunger(npcId) or 50 end
    if _G.GetNpcSafety then needs.safety = GetNpcSafety(npcId) or 50 end
    if _G.GetNpcSocial then needs.social = GetNpcSocial(npcId) or 50 end
    if _G.GetNpcWealth then needs.wealth = GetNpcWealth(npcId) or 50 end
    if _G.GetNpcPrestige then needs.prestige = GetNpcPrestige(npcId) or 50 end
    if _G.GetNpcRomance then needs.romance = GetNpcRomance(npcId) or 50 end
    if _G.GetNpcCuriosity then needs.curiosity = GetNpcCuriosity(npcId) or 50 end
    if _G.GetNpcLoyalty then needs.loyalty = GetNpcLoyalty(npcId) or 50 end
    if _G.GetNpcRevenge then needs.revenge = GetNpcRevenge(npcId) or 50 end
    if _G.GetNpcFaith then needs.faith = GetNpcFaith(npcId) or 50 end

    local agent = AgentCore.agents[npcId]
    if agent and agent.config then
        for k, _ in pairs(needs) do
            needs[k] = needs[k] or agent.config[k] or 50
        end
    end
    return needs
end

--- 基于人格特质动态调整权重
function AgentCore.GetDynamicWeights(npcId)
    local base = {}
    for k, v in pairs(AgentCore.UTILITY_WEIGHTS) do
        base[k] = v
    end
    local agent = AgentCore.agents[npcId]
    if not agent or not agent.config then return base end
    local personality = agent.config.personality or "neutral"

    -- 不同人格的权重偏移
    local modifiers = {
        aggressive = { safety = -0.2, revenge = 0.4, prestige = 0.2 },
        friendly = { social = 0.3, romance = 0.2, loyalty = 0.2 },
        greedy = { wealth = 0.4, prestige = 0.1 },
        curious = { curiosity = 0.5, romance = 0.1 },
        pious = { faith = 0.5, safety = 0.1 },
        cautious = { safety = 0.3, revenge = -0.2 },
        romantic = { romance = 0.6, social = 0.2 },
        loyal = { loyalty = 0.5, revenge = -0.1 }
    }
    local mod = modifiers[personality] or {}
    for k, delta in pairs(mod) do
        base[k] = (base[k] or 1.0) + delta
        if base[k] < 0.1 then base[k] = 0.1 end
    end

    -- 情绪对权重的临时影响
    local mood = AgentCore.GetCurrentMood(npcId)
    if mood == AgentCore.MOOD.ANGRY then
        base.revenge = base.revenge + 0.3
        base.safety = base.safety - 0.1
    elseif mood == AgentCore.MOOD.ANXIOUS then
        base.safety = base.safety + 0.3
        base.social = base.social - 0.1
    elseif mood == AgentCore.MOOD.ROMANTIC then
        base.romance = base.romance + 0.4
        base.social = base.social + 0.1
    elseif mood == AgentCore.MOOD.SUSPICIOUS then
        base.loyalty = base.loyalty - 0.2
        base.safety = base.safety + 0.2
    end

    return base
end

--- 计算单个候选动作的 Utility 得分（带动态权重）
function AgentCore.CalculateUtility(npcId, actionDef)
    local needs = AgentCore.GetNpcNeeds(npcId)
    local weights = AgentCore.GetDynamicWeights(npcId)
    local actionNeeds = AgentCore.ACTION_NEEDS[actionDef.action]
    if not actionNeeds then return 0 end

    local score = 0
    for needKey, sensitivity in pairs(actionNeeds) do
        local needValue = needs[needKey] or 50
        score = score + (needValue / 100) * sensitivity * (weights[needKey] or 1.0)
    end

    -- 随机扰动（防止所有 NPC 行为完全一致）
    local agent = AgentCore.agents[npcId]
    local noise = 0.1
    if agent and agent.config and agent.config.utilityNoise then
        noise = agent.config.utilityNoise
    end
    score = score + (math.random() - 0.5) * noise

    -- 派系忠诚对动作选择的修正
    local faction = AgentCore.factions[npcId]
    if faction and actionDef.faction_aligned then
        score = score + (faction.loyalty / 100) * 0.2
    end

    -- 情绪对特定动作的微调
    local mood = AgentCore.GetCurrentMood(npcId)
    if mood == AgentCore.MOOD.ANGRY and actionDef.action == "engage_combat" then
        score = score + 0.15
    end
    if mood == AgentCore.MOOD.BORED and actionDef.action == "move_to" then
        score = score + 0.1
    end

    return score
end

--- 多目标权衡函数：Pareto 前沿筛选 + 加权求和
function AgentCore.SelectBestAction(npcId, candidates)
    if type(candidates) ~= "table" or #candidates == 0 then return nil end
    local needs = AgentCore.GetNpcNeeds(npcId)
    local weights = AgentCore.GetDynamicWeights(npcId)

    -- 计算每个候选在所有维度上的向量
    local scored = {}
    for _, cand in ipairs(candidates) do
        local vec = {}
        local actionNeeds = AgentCore.ACTION_NEEDS[cand.action]
        if actionNeeds then
            for needKey, sensitivity in pairs(actionNeeds) do
                local needValue = needs[needKey] or 50
                vec[needKey] = (needValue / 100) * sensitivity * (weights[needKey] or 1.0)
            end
        end
        local total = 0
        for _, v in pairs(vec) do
            total = total + v
        end
        table.insert(scored, { cand = cand, score = total, vec = vec })
        AgentCore.utilityCache[npcId] = AgentCore.utilityCache[npcId] or {}
        AgentCore.utilityCache[npcId][cand.action or "?"] = total
    end

    -- Pareto 前沿筛选（可选，提升多样性）
    local pareto = {}
    for i, a in ipairs(scored) do
        local dominated = false
        for j, b in ipairs(scored) do
            if i ~= j then
                local allBetterOrEqual = true
                local atLeastOneBetter = false
                for k, _ in pairs(a.vec) do
                    if (b.vec[k] or 0) < (a.vec[k] or 0) - 0.001 then
                        allBetterOrEqual = false
                        break
                    end
                    if (b.vec[k] or 0) > (a.vec[k] or 0) + 0.001 then
                        atLeastOneBetter = true
                    end
                end
                if allBetterOrEqual and atLeastOneBetter then
                    dominated = true
                    break
                end
            end
        end
        if not dominated then
            table.insert(pareto, a)
        end
    end

    -- 从 Pareto 前沿中选加权总分最高者
    local best = nil
    local bestScore = -999999
    for _, entry in ipairs(pareto) do
        if entry.score > bestScore then
            bestScore = entry.score
            best = entry.cand
        end
    end
    -- 若 Pareto 为空则回退到全部候选
    if not best and #scored > 0 then
        best = scored[1].cand
        bestScore = scored[1].score
    end
    return best, bestScore
end

--- 获取 Utility 缓存快照
function AgentCore.GetUtilitySnapshot(npcId)
    return AgentCore.utilityCache[npcId] or {}
end

--- 根据当前需求生成候选动作列表（智能预筛）
function AgentCore.GenerateCandidates(npcId)
    local needs = AgentCore.GetNpcNeeds(npcId)
    local candidates = {}
    local allActions = {
        { action = "move_to" },
        { action = "speak" },
        { action = "trade_initiate" },
        { action = "invite_party" },
        { action = "lead_to" },
        { action = "engage_combat" },
        { action = "setup_stall" },
        { action = "cast_spell" },
        { action = "wait_for" },
        { action = "use_item" },
        { action = "gather" },
        { action = "craft" },
        { action = "rest" },
        { action = "flee" },
        { action = "taunt" },
        { action = "bribe" },
        { action = "propose" },
        { action = "teach" },
        { action = "learn" },
        { action = "produce" },
        { action = "consume" },
        { action = "invest" }
    }

    -- 预筛：若安全需求极低，剔除战斗；若饥饿极低，剔除进食
    for _, cand in ipairs(allActions) do
        local actionNeeds = AgentCore.ACTION_NEEDS[cand.action]
        local keep = true
        if actionNeeds then
            if needs.safety < 10 and cand.action == "engage_combat" then keep = false end
            if needs.hunger < 10 and cand.action == "consume" then keep = false end
            if needs.wealth < 10 and cand.action == "invest" then keep = false end
            if needs.social < 10 and cand.action == "speak" then keep = false end
        end
        if keep then
            table.insert(candidates, cand)
        end
    end
    return candidates
end

------------------------------------------------------------------------
-- 六、社会模拟系统
------------------------------------------------------------------------

--- 初始化婚姻/伴侣状态
function AgentCore.InitRomance(npcId)
    AgentCore.romances[npcId] = {
        partnerId = nil,
        status = "single",
        proposalTime = 0,
        weddingTime = 0,
        affection = {}
    }
end

--- 获取伴侣信息
function AgentCore.GetRomance(npcId)
    if not AgentCore.romances[npcId] then
        AgentCore.InitRomance(npcId)
    end
    return AgentCore.romances[npcId]
end

--- 求婚
function AgentCore.Propose(npcId, targetId)
    local romance = AgentCore.GetRomance(npcId)
    if romance.status ~= "single" then return false, "已有伴侣" end
    local targetRomance = AgentCore.GetRomance(targetId)
    if targetRomance.status ~= "single" then return false, "对方已有伴侣" end
    local rel = AgentCore.GetRelationship(npcId, targetId)
    if rel < 30 then return false, "关系不够亲密" end

    romance.status = "proposed"
    romance.partnerId = targetId
    romance.proposalTime = GetWorldTime()
    targetRomance.status = "courted"
    targetRomance.partnerId = npcId

    EventLog.Append({
        type = "romance_propose",
        actor = npcId,
        target = targetId,
        desc = npcId .. " 向 " .. targetId .. " 求婚",
        loc = AgentCore.agents[npcId] and AgentCore.agents[npcId].config and AgentCore.agents[npcId].config.loc or nil
    })
    Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.sight, {
        content = "向 " .. targetId .. " 求婚",
        weight = 0.9,
        tags = { "romance", "proposal" }
    })
    return true, "求婚成功"
end

--- 接受求婚
function AgentCore.AcceptProposal(targetId, npcId)
    local romance = AgentCore.GetRomance(targetId)
    if romance.status ~= "courted" or romance.partnerId ~= npcId then
        return false, "无有效求婚"
    end
    romance.status = "married"
    romance.weddingTime = GetWorldTime()
    local proposerRomance = AgentCore.GetRomance(npcId)
    proposerRomance.status = "married"
    proposerRomance.weddingTime = GetWorldTime()

    EventLog.Append({
        type = "romance_wedding",
        actor = npcId,
        target = targetId,
        desc = npcId .. " 与 " .. targetId .. " 结为夫妻",
        loc = AgentCore.agents[npcId] and AgentCore.agents[npcId].config and AgentCore.agents[npcId].config.loc or nil
    })
    Mempalace.Add(npcId, "恩情殿", {
        content = "与 " .. targetId .. " 结为夫妻",
        weight = 1.0,
        tags = { "romance", "wedding", "positive" }
    })
    return true, "婚礼完成"
end

--- 离婚
function AgentCore.Divorce(npcId, reason)
    local romance = AgentCore.GetRomance(npcId)
    if romance.status ~= "married" then return false, "未婚" end
    local partnerId = romance.partnerId
    romance.status = "divorced"
    romance.partnerId = nil
    romance.weddingTime = 0
    if partnerId then
        local partnerRomance = AgentCore.GetRomance(partnerId)
        partnerRomance.status = "divorced"
        partnerRomance.partnerId = nil
        partnerRomance.weddingTime = 0
        AgentCore.UpdateRelationship(npcId, partnerId, -50)
    end

    EventLog.Append({
        type = "romance_divorce",
        actor = npcId,
        target = partnerId,
        desc = npcId .. " 与 " .. tostring(partnerId) .. " 离婚。原因：" .. tostring(reason or "感情破裂"),
        loc = AgentCore.agents[npcId] and AgentCore.agents[npcId].config and AgentCore.agents[npcId].config.loc or nil
    })
    Mempalace.Add(npcId, "阴影室", {
        content = "与 " .. tostring(partnerId) .. " 离婚",
        weight = 0.8,
        tags = { "romance", "divorce", "negative" }
    })
    return true, "离婚完成"
end

--- 初始化师徒状态
function AgentCore.InitMentorship(npcId)
    AgentCore.mentorships[npcId] = {
        mentorId = nil,
        students = {},
        skillProgress = {},
        graduationDate = 0,
        taughtSkills = {}
    }
end

--- 获取师徒信息
function AgentCore.GetMentorship(npcId)
    if not AgentCore.mentorships[npcId] then
        AgentCore.InitMentorship(npcId)
    end
    return AgentCore.mentorships[npcId]
end

--- 拜师
function AgentCore.BecomeStudent(npcId, mentorId)
    local ms = AgentCore.GetMentorship(npcId)
    if ms.mentorId then return false, "已有师父" end
    local mentorMs = AgentCore.GetMentorship(mentorId)
    table.insert(mentorMs.students, npcId)
    ms.mentorId = mentorId
    ms.skillProgress = {}
    EventLog.Append({
        type = "mentorship_start",
        actor = npcId,
        target = mentorId,
        desc = npcId .. " 拜 " .. mentorId .. " 为师"
    })
    Mempalace.Add(npcId, "恩情殿", {
        content = "拜 " .. mentorId .. " 为师",
        weight = 0.8,
        tags = { "mentorship", "positive" }
    })
    return true, "拜师成功"
end

--- 教授技能
function AgentCore.TeachSkill(mentorId, studentId, skillName)
    local mentorMs = AgentCore.GetMentorship(mentorId)
    local found = false
    for _, s in ipairs(mentorMs.students) do
        if s == studentId then found = true; break end
    end
    if not found then return false, "非本门弟子" end
    mentorMs.taughtSkills[skillName] = true
    local studentMs = AgentCore.GetMentorship(studentId)
    studentMs.skillProgress[skillName] = studentMs.skillProgress[skillName] or 0
    EventLog.Append({
        type = "mentorship_teach",
        actor = mentorId,
        target = studentId,
        desc = mentorId .. " 教授 " .. studentId .. " 技能：" .. skillName
    })
    return true, "授课记录已更新"
end

--- 增长学生技能进度
function AgentCore.AdvanceStudentSkill(studentId, skillName, delta)
    local ms = AgentCore.GetMentorship(studentId)
    ms.skillProgress[skillName] = (ms.skillProgress[skillName] or 0) + delta
    if ms.skillProgress[skillName] >= 100 then
        ms.skillProgress[skillName] = 100
        AgentCore.GraduateStudent(studentId, skillName)
    end
end

--- 出师
function AgentCore.GraduateStudent(studentId, skillName)
    local ms = AgentCore.GetMentorship(studentId)
    local mentorId = ms.mentorId
    if not mentorId then return false end
    EventLog.Append({
        type = "mentorship_graduate",
        actor = studentId,
        target = mentorId,
        desc = studentId .. " 从 " .. mentorId .. " 处出师，掌握 " .. skillName
    })
    Mempalace.Add(studentId, "恩情殿", {
        content = "从 " .. mentorId .. " 出师，掌握 " .. skillName,
        weight = 0.9,
        tags = { "mentorship", "graduation", "positive" }
    })
    -- 提升师徒关系
    AgentCore.UpdateRelationship(studentId, mentorId, 20)
    --  Optionally remove from active students
    local mentorMs = AgentCore.GetMentorship(mentorId)
    local newStudents = {}
    for _, s in ipairs(mentorMs.students) do
        if s ~= studentId then table.insert(newStudents, s) end
    end
    mentorMs.students = newStudents
    ms.graduationDate = GetWorldTime()
    return true, "出师完成"
end

--- 离开师门
function AgentCore.LeaveMentor(studentId)
    local ms = AgentCore.GetMentorship(studentId)
    local mentorId = ms.mentorId
    if not mentorId then return false, "无师父" end
    local mentorMs = AgentCore.GetMentorship(mentorId)
    local newStudents = {}
    for _, s in ipairs(mentorMs.students) do
        if s ~= studentId then table.insert(newStudents, s) end
    end
    mentorMs.students = newStudents
    ms.mentorId = nil
    ms.skillProgress = {}
    EventLog.Append({
        type = "mentorship_leave",
        actor = studentId,
        target = mentorId,
        desc = studentId .. " 离开师门 " .. mentorId
    })
    return true, "已离开师门"
end

--- 初始化派系状态
function AgentCore.InitFaction(npcId, factionId)
    AgentCore.factions[npcId] = {
        factionId = factionId or AgentCore.DEFAULT_FACTION_ID,
        loyalty = 50,
        rank = "member",
        secrets = {},
        coupPlans = {},
        lastBetrayalCheck = 0
    }
end

--- 获取派系信息
function AgentCore.GetFaction(npcId)
    if not AgentCore.factions[npcId] then
        AgentCore.InitFaction(npcId)
    end
    return AgentCore.factions[npcId]
end

--- 设置派系忠诚度
function AgentCore.SetFactionLoyalty(npcId, value)
    local faction = AgentCore.GetFaction(npcId)
    faction.loyalty = math.max(0, math.min(100, value))
end

--- 背叛检测（基于关系、需求、外部诱惑）
function AgentCore.DetectBetrayal(npcId)
    local faction = AgentCore.GetFaction(npcId)
    local needs = AgentCore.GetNpcNeeds(npcId)
    local now = GetWorldTime()
    if faction.lastBetrayalCheck and (now - faction.lastBetrayalCheck) < 60 then
        return false
    end
    faction.lastBetrayalCheck = now

    local betrayalScore = 0
    if faction.loyalty < 30 then betrayalScore = betrayalScore + 20 end
    if needs.revenge > 70 and faction.loyalty < 60 then betrayalScore = betrayalScore + 15 end
    if needs.wealth < 20 and faction.loyalty < 50 then betrayalScore = betrayalScore + 10 end

    -- 搜索敌对派系是否在招揽
    local percepts = AgentCore.perceptions[npcId]
    if percepts and percepts.entities then
        for _, ent in ipairs(percepts.entities) do
            local otherFaction = AgentCore.factions[ent.id]
            if otherFaction and otherFaction.factionId ~= faction.factionId then
                local rel = AgentCore.GetRelationship(npcId, ent.id)
                if rel > 30 then
                    betrayalScore = betrayalScore + 15
                end
            end
        end
    end

    if betrayalScore >= 40 then
        EventLog.Append({
            type = "faction_betrayal_detected",
            actor = npcId,
            desc = "背叛风险高（得分 " .. betrayalScore .. "）",
            loc = AgentCore.agents[npcId] and AgentCore.agents[npcId].config and AgentCore.agents[npcId].config.loc or nil
        })
        return true, betrayalScore
    end
    return false, betrayalScore
end

--- 策划政变
function AgentCore.PlanCoup(npcId, targetLeaderId)
    local faction = AgentCore.GetFaction(npcId)
    table.insert(faction.coupPlans, {
        target = targetLeaderId,
        plannedAt = GetWorldTime(),
        stage = "planning"
    })
    EventLog.Append({
        type = "faction_coup_plan",
        actor = npcId,
        target = targetLeaderId,
        desc = npcId .. " 正在策划针对 " .. targetLeaderId .. " 的行动"
    })
    Mempalace.Add(npcId, "阴影室", {
        content = "策划政变，目标是 " .. targetLeaderId,
        weight = 0.85,
        tags = { "faction", "betrayal", "secret" }
    })
end

--- 执行预谋的背叛
function AgentCore.ExecuteBetrayal(npcId)
    local faction = AgentCore.GetFaction(npcId)
    if #faction.coupPlans > 0 then
        local plan = faction.coupPlans[1]
        EventLog.Append({
            type = "faction_betrayal_execute",
            actor = npcId,
            target = plan.target,
            desc = npcId .. " 对 " .. plan.target .. " 实施了背叛"
        })
        AgentCore.UpdateRelationship(npcId, plan.target, -80)
        AgentCore.UpdateReputation(npcId, "infamy", 20, "背叛 " .. plan.target)
        table.remove(faction.coupPlans, 1)
    else
        -- 随机降低对派系成员的关系
        for otherId, otherFaction in pairs(AgentCore.factions) do
            if otherFaction.factionId == faction.factionId and otherId ~= npcId then
                AgentCore.UpdateRelationship(npcId, otherId, -20)
            end
        end
    end
end

--- 评估政治联盟
function AgentCore.EvaluatePoliticalAlliance(npcId)
    local faction = AgentCore.GetFaction(npcId)
    local bestAlly = nil
    local bestScore = -999
    for otherId, otherFaction in pairs(AgentCore.factions) do
        if otherFaction.factionId ~= faction.factionId then
            local rel = AgentCore.GetRelationship(npcId, otherId)
            if rel > bestScore then
                bestScore = rel
                bestAlly = otherId
            end
        end
    end
    if bestAlly and bestScore > 20 then
        EventLog.Append({
            type = "political_alliance_eval",
            actor = npcId,
            target = bestAlly,
            desc = "评估与 " .. bestAlly .. " 的联盟可能性（亲密度 " .. bestScore .. "）"
        })
    end
end

--- 初始化声望
function AgentCore.InitReputation(npcId)
    AgentCore.reputations[npcId] = {
        fame = 0,
        infamy = 0,
        fameSources = {},
        infamySources = {}
    }
end

--- 获取声望
function AgentCore.GetReputation(npcId)
    if not AgentCore.reputations[npcId] then
        AgentCore.InitReputation(npcId)
    end
    return AgentCore.reputations[npcId]
end

--- 更新声望
function AgentCore.UpdateReputation(npcId, repType, delta, source)
    local rep = AgentCore.GetReputation(npcId)
    if repType == "fame" then
        rep.fame = math.max(0, rep.fame + delta)
        table.insert(rep.fameSources, { t = GetWorldTime(), delta = delta, source = source or "" })
    elseif repType == "infamy" then
        rep.infamy = math.max(0, rep.infamy + delta)
        table.insert(rep.infamySources, { t = GetWorldTime(), delta = delta, source = source or "" })
    end
    Mempalace.Add(npcId, "关系镜厅", {
        content = repType .. " 变化 " .. delta .. "（" .. tostring(source or "未知") .. "）",
        weight = 0.5 + math.abs(delta) / 100,
        tags = { "reputation", repType }
    })
end

--- 获取求爱话语
function AgentCore.GetCourtshipSpeech(npcId, targetId)
    local speeches = {
        "你是我见过的最美好的人。",
        "愿我的世界里有你。",
        "每次见到你，我的心便会悸动。",
        "可否与我共度余生？"
    }
    local mood = AgentCore.GetCurrentMood(npcId)
    if mood == AgentCore.MOOD.ROMANTIC then
        table.insert(speeches, "在这满天星光下，我只属于你。")
    end
    if mood == AgentCore.MOOD.CONFIDENT then
        table.insert(speeches, "我相信我们是最般配的一对。")
    end
    return speeches[math.random(1, #speeches)]
end

------------------------------------------------------------------------
-- 七、感知与记忆（五感 + 谣言 + LifeGoal）
------------------------------------------------------------------------

--- 五感感知：将不同感官信息写入不同记忆房间
function AgentCore.Perceive(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent then return nil end

    local visualRange = agent.config and agent.config.visual_range or AgentCore.DEFAULT_VISUAL_RANGE
    local hearingRange = agent.config and agent.config.hearing_range or AgentCore.DEFAULT_HEARING_RANGE
    local smellRange = agent.config and agent.config.smell_range or AgentCore.DEFAULT_SMELL_RANGE

    local perceived = {
        timestamp = GetWorldTime(),
        sight = {},
        hearing = {},
        smell = {},
        taste = {},
        touch = {},
        entities = {},
        events = {},
        items = {},
        threats = {},
        healers = {}
    }

    -- sight：视觉范围内玩家和 NPC
    if _G.GetPlayersInRange then
        local players = GetPlayersInRange(npcId, visualRange)
        if type(players) == "table" then
            for _, pid in ipairs(players) do
                table.insert(perceived.sight, { type = "player", id = pid })
                table.insert(perceived.entities, { type = "player", id = pid })
                if _G.GetPlayerReputation and GetPlayerReputation(pid) then
                    local rep = GetPlayerReputation(pid)
                    if rep < -50 then
                        table.insert(perceived.threats, { type = "player", id = pid, reason = "hostile" })
                    end
                end
                if _G.IsPlayerHealing and IsPlayerHealing(pid) then
                    table.insert(perceived.healers, { type = "player", id = pid })
                end
            end
        end
    end

    if _G.GetNpcsInRange then
        local npcs = GetNpcsInRange(npcId, visualRange)
        if type(npcs) == "table" then
            for _, nid in ipairs(npcs) do
                if nid ~= npcId then
                    table.insert(perceived.sight, { type = "npc", id = nid })
                    table.insert(perceived.entities, { type = "npc", id = nid })
                    local rel = AgentCore.GetRelationship(npcId, nid)
                    if rel and rel < -30 then
                        table.insert(perceived.threats, { type = "npc", id = nid, reason = "hostile" })
                    end
                    if _G.IsNpcHealing and IsNpcHealing(nid) then
                        table.insert(perceived.healers, { type = "npc", id = nid })
                    end
                end
            end
        end
    end

    -- hearing：听觉范围更大，包含 speech
    if _G.GetSpeechInRange then
        local speeches = GetSpeechInRange(npcId, hearingRange)
        if type(speeches) == "table" then
            for _, sp in ipairs(speeches) do
                table.insert(perceived.hearing, { speaker = sp.speaker, content = sp.content })
                -- 谣言/八卦提取
                AgentCore.ExtractGossip(npcId, sp.speaker, sp.content)
            end
        end
    end

    -- smell：气味来源
    if _G.GetSmellsInRange then
        local smells = GetSmellsInRange(npcId, smellRange)
        if type(smells) == "table" then
            for _, sm in ipairs(smells) do
                table.insert(perceived.smell, { source = sm.source, scent = sm.scent })
            end
        end
    end

    -- taste：食物/水源附近
    if agent.config and agent.config.loc and agent.config.loc:find("餐馆") then
        table.insert(perceived.taste, { loc = agent.config.loc, note = "食物香气弥漫" })
    end

    -- touch：环境触感（寒冷、炎热等）
    if _G.GetWeatherAt then
        local weather = GetWeatherAt(agent.config and agent.config.loc or "")
        if weather then
            table.insert(perceived.touch, { weather = weather, sensation = weather.temperature or "适中" })
        end
    end

    -- 地面物品
    if _G.GetItemsInRange then
        local items = GetItemsInRange(npcId, visualRange)
        if type(items) == "table" then
            for _, itemId in ipairs(items) do
                table.insert(perceived.items, { id = itemId })
            end
        end
    end

    -- 最近事件
    local recent = EventLog.ByLocation(agent.config and agent.config.loc or "", 3)
    if type(recent) == "table" then
        for _, ev in ipairs(recent) do
            table.insert(perceived.events, ev)
        end
    end

    AgentCore.perceptions[npcId] = perceived

    -- 写入 Mempalace 不同房间
    if #perceived.threats > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.threat, {
            content = "视觉感知到 " .. #perceived.threats .. " 个威胁",
            weight = 0.8 + (#perceived.threats * 0.05),
            tags = { "perception", "threat", "sight" }
        })
    end
    if #perceived.sight > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.sight, {
            content = "看到 " .. #perceived.sight .. " 个 nearby 生物",
            weight = 0.4,
            tags = { "perception", "sight" }
        })
    end
    if #perceived.hearing > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.hearing, {
            content = "听到 " .. #perceived.hearing .. " 段话语",
            weight = 0.35,
            tags = { "perception", "hearing" }
        })
    end
    if #perceived.smell > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.smell, {
            content = "闻到 " .. #perceived.smell .. " 种气味",
            weight = 0.25,
            tags = { "perception", "smell" }
        })
    end
    if #perceived.taste > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.taste, {
            content = "尝到/嗅到食物气息",
            weight = 0.3,
            tags = { "perception", "taste" }
        })
    end
    if #perceived.touch > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.touch, {
            content = "感受到环境温度：" .. tostring(perceived.touch[1].sensation),
            weight = 0.2,
            tags = { "perception", "touch" }
        })
    end
    if #perceived.items > 0 then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.item, {
            content = "发现 " .. #perceived.items .. " 个附近物品",
            weight = 0.3,
            tags = { "perception", "item" }
        })
    end

    return perceived
end

--- 从他人 speech 中提取谣言/八卦并写入 Mempalace
function AgentCore.ExtractGossip(npcId, speakerId, content)
    if type(content) ~= "string" then return end
    local gossipKeywords = {
        "喜欢", "讨厌", "恨", "爱", "结婚", "离婚", "杀", "死", "宝藏", "秘密", "阴谋", "背叛", "谋反", "财富"
    }
    local isGossip = false
    for _, kw in ipairs(gossipKeywords) do
        if content:find(kw) then
            isGossip = true
            break
        end
    end
    if isGossip then
        Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.gossip, {
            content = "从 " .. tostring(speakerId) .. " 听到：" .. content,
            weight = 0.5,
            tags = { "gossip", "hearing" },
            source = speakerId
        })
        -- 记录到 gossip 缓存
        AgentCore.gossipCache[npcId] = AgentCore.gossipCache[npcId] or { rumors = {}, lastGossipTime = 0 }
        table.insert(AgentCore.gossipCache[npcId].rumors, {
            speaker = speakerId,
            content = content,
            time = GetWorldTime()
        })
        AgentCore.gossipCache[npcId].lastGossipTime = GetWorldTime()
    end
end

--- 获取谣言缓存摘要
function AgentCore.GetGossipSummary(npcId, n)
    n = n or 5
    local cache = AgentCore.gossipCache[npcId]
    if not cache or not cache.rumors then return {} end
    local results = {}
    for i = #cache.rumors, math.max(1, #cache.rumors - n + 1), -1 do
        table.insert(results, cache.rumors[i])
    end
    return results
end

--- 初始化 LifeGoal
function AgentCore.InitLifeGoals(npcId)
    AgentCore.lifeGoals[npcId] = {
        goals = {},
        activeGoalId = nil
    }
end

--- 添加 LifeGoal
function AgentCore.AddLifeGoal(npcId, goalId, goalDef)
    if not AgentCore.lifeGoals[npcId] then
        AgentCore.InitLifeGoals(npcId)
    end
    local lg = AgentCore.lifeGoals[npcId]
    goalDef.id = goalId
    goalDef.milestones = goalDef.milestones or {}
    for _, m in ipairs(goalDef.milestones) do
        m.done = m.done or false
    end
    goalDef.createdAt = GetWorldTime()
    goalDef.priority = goalDef.priority or 1
    lg.goals[goalId] = goalDef
    if not lg.activeGoalId then
        lg.activeGoalId = goalId
    end
    Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.goal, {
        content = "立下目标：" .. goalDef.summary,
        weight = 0.7,
        tags = { "lifegoal", "plan" }
    })
end

--- 完成里程碑
function AgentCore.CompleteMilestone(npcId, goalId, milestoneName)
    local lg = AgentCore.lifeGoals[npcId]
    if not lg or not lg.goals[goalId] then return false end
    local goal = lg.goals[goalId]
    for _, m in ipairs(goal.milestones) do
        if m.name == milestoneName and not m.done then
            m.done = true
            m.doneAt = GetWorldTime()
            EventLog.Append({
                type = "lifegoal_milestone",
                actor = npcId,
                desc = "达成里程碑：" .. milestoneName .. "（目标：" .. goal.summary .. "）"
            })
            Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.goal, {
                content = "达成里程碑：" .. milestoneName,
                weight = 0.85,
                tags = { "lifegoal", "milestone", "achievement" }
            })
            return true
        end
    end
    return false
end

--- 检查目标是否全部完成
function AgentCore.IsLifeGoalComplete(npcId, goalId)
    local lg = AgentCore.lifeGoals[npcId]
    if not lg or not lg.goals[goalId] then return false end
    for _, m in ipairs(lg.goals[goalId].milestones) do
        if not m.done then return false end
    end
    return true
end

--- 获取 LifeGoal Prompt 摘要
function AgentCore.GetLifeGoalPrompt(npcId)
    local lg = AgentCore.lifeGoals[npcId]
    if not lg or not lg.activeGoalId then return "" end
    local goal = lg.goals[lg.activeGoalId]
    if not goal then return "" end
    local lines = { "【人生目标】" .. goal.summary }
    for _, m in ipairs(goal.milestones) do
        local mark = m.done and "✓" or "○"
        table.insert(lines, string.format("  %s %s", mark, m.name))
    end
    return table.concat(lines, "\n")
end

------------------------------------------------------------------------
-- 八、对话与叙事（InkRuntime + 持久化 + 情绪状态机）
------------------------------------------------------------------------

--- 初始化情绪状态
function AgentCore.InitMood(npcId)
    AgentCore.moods[npcId] = {
        currentMood = AgentCore.MOOD.CALM,
        intensity = 0.5,
        moodHistory = {},
        lastShiftTime = GetWorldTime()
    }
end

--- 获取当前情绪
function AgentCore.GetCurrentMood(npcId)
    if not AgentCore.moods[npcId] then
        AgentCore.InitMood(npcId)
    end
    return AgentCore.moods[npcId].currentMood
end

--- 设置情绪
function AgentCore.SetMood(npcId, moodName, intensity)
    if not AgentCore.moods[npcId] then
        AgentCore.InitMood(npcId)
    end
    local m = AgentCore.moods[npcId]
    intensity = math.max(0, math.min(1, intensity or 0.5))
    if m.currentMood ~= moodName then
        table.insert(m.moodHistory, {
            from = m.currentMood,
            to = moodName,
            time = GetWorldTime()
        })
        while #m.moodHistory > 20 do
            table.remove(m.moodHistory, 1)
        end
    end
    m.currentMood = moodName
    m.intensity = intensity
    m.lastShiftTime = GetWorldTime()
end

--- 情绪自然衰减
function AgentCore.DecayMood(npcId, dt)
    local m = AgentCore.moods[npcId]
    if not m then return end
    m.intensity = math.max(0, m.intensity - dt * 0.02)
    if m.intensity <= 0.1 and m.currentMood ~= AgentCore.MOOD.CALM then
        AgentCore.SetMood(npcId, AgentCore.MOOD.CALM, 0.1)
    end
end

--- 情绪影响动作选择的辅助函数
function AgentCore.GetMoodActionModifier(npcId, actionName)
    local mood = AgentCore.GetCurrentMood(npcId)
    local modifier = AgentCore.MOOD_SPEECH_MODIFIER[mood] or { speed = 1.0, aggression = 0, warmth = 0 }
    local mul = 1.0
    if actionName == "speak" then
        -- 由外部语音系统读取 warmth / aggression 调整语气
    elseif actionName == "engage_combat" and modifier.aggression > 0.5 then
        mul = 1.2
    elseif actionName == "flee" and modifier.aggression < -0.2 then
        mul = 1.1
    end
    return mul, modifier
end

--- 开启或更新对话上下文（增强持久化）
function AgentCore.DialogMemory(npcId, withTarget, lastMsg)
    AgentCore.dialogMemory[npcId] = AgentCore.dialogMemory[npcId] or {}
    local mem = AgentCore.dialogMemory[npcId]

    if withTarget then mem.with = withTarget end
    if lastMsg then
        mem.messages = mem.messages or {}
        table.insert(mem.messages, {
            speaker = npcId,
            content = lastMsg,
            time = GetWorldTime()
        })
        mem.lastMsg = lastMsg
        mem.turnCount = (mem.turnCount or 0) + 1
        mem.lastTime = GetWorldTime()
    end

    -- 溢出保护：保留最近 MAX_DIALOG_TURNS 条
    if mem.messages and #mem.messages > AgentCore.MAX_DIALOG_TURNS then
        local trimmed = {}
        for i = #mem.messages - AgentCore.MAX_DIALOG_TURNS + 1, #mem.messages do
            table.insert(trimmed, mem.messages[i])
        end
        mem.messages = trimmed
    end

    return mem
end

--- 结束对话上下文
function AgentCore.EndDialog(npcId)
    AgentCore.dialogMemory[npcId] = nil
end

--- 获取对话上下文摘要（用于 prompt）
function AgentCore.GetDialogPrompt(npcId)
    local mem = AgentCore.dialogMemory[npcId]
    if not mem or not mem.with then return "" end
    local lines = { string.format("当前正与 %s 对话。", mem.with) }
    if mem.messages then
        local startIdx = math.max(1, #mem.messages - 4)
        for i = startIdx, #mem.messages do
            local m = mem.messages[i]
            table.insert(lines, string.format("  %s: %s", m.speaker or "?", m.content or ""))
        end
    end
    table.insert(lines, string.format("（第 %d 轮，情绪：%s）", mem.turnCount or 0, AgentCore.GetCurrentMood(npcId)))
    return table.concat(lines, "\n")

end

--- 集成 InkRuntime.lua 的对话树调用
function AgentCore.StartInkDialog(npcId, storyName, knotName)
    if not _G.InkRuntime or not InkRuntime.StartStory then
        return false, "InkRuntime 未加载"
    end
    local mem = AgentCore.dialogMemory[npcId]
    if not mem then
        AgentCore.DialogMemory(npcId, "player")
        mem = AgentCore.dialogMemory[npcId]
    end
    mem.inkState = mem.inkState or {}
    mem.inkState.storyName = storyName
    mem.inkState.knotName = knotName
    mem.inkState.inkVariables = mem.inkState.inkVariables or {}
    -- 将 NPC 情绪、关系值注入 Ink 变量
    mem.inkState.inkVariables.npcMood = AgentCore.GetCurrentMood(npcId)
    mem.inkState.inkVariables.npcRomance = AgentCore.GetRelationship(npcId, mem.with or "player")
    return true, "Ink 对话已启动"
end

--- 推进 Ink 对话一步
function AgentCore.AdvanceInkDialog(npcId, choiceIndex)
    local mem = AgentCore.dialogMemory[npcId]
    if not mem or not mem.inkState then return nil end
    if not _G.InkRuntime or not InkRuntime.Continue then return nil end

    -- 注入当前变量
    if mem.inkState.inkVariables then
        for k, v in pairs(mem.inkState.inkVariables) do
            if InkRuntime.SetVariable then
                InkRuntime.SetVariable(mem.inkState.storyName, k, v)
            end
        end
    end

    local result = nil
    if choiceIndex and choiceIndex > 0 then
        if InkRuntime.ChooseChoiceIndex then
            result = InkRuntime.ChooseChoiceIndex(mem.inkState.storyName, choiceIndex)
        end
    else
        result = InkRuntime.Continue(mem.inkState.storyName)
    end

    -- 保存返回的变量变更
    if result and result.variables and InkRuntime.GetVariables then
        mem.inkState.inkVariables = InkRuntime.GetVariables(mem.inkState.storyName)
    end

    return result
end

--- 获取 Ink 对话当前文本与选项（用于 UI 展示）
function AgentCore.GetInkDialogState(npcId)
    local mem = AgentCore.dialogMemory[npcId]
    if not mem or not mem.inkState then return nil end
    if not _G.InkRuntime or not InkRuntime.GetCurrentText then return nil end
    return {
        text = InkRuntime.GetCurrentText(mem.inkState.storyName),
        choices = InkRuntime.GetCurrentChoices and InkRuntime.GetCurrentChoices(mem.inkState.storyName) or {},
        variables = mem.inkState.inkVariables or {}
    }
end

--- 结束 Ink 对话并持久化状态
function AgentCore.EndInkDialog(npcId)
    local mem = AgentCore.dialogMemory[npcId]
    if not mem then return end
    -- 将 inkState 持久化到 Mempalace，保留下次唤醒
    if mem.inkState then
        Mempalace.Add(npcId, "回声廊", {
            content = "保存 Ink 对话状态：" .. tostring(mem.inkState.storyName) .. " / " .. tostring(mem.inkState.knotName),
            weight = 0.4,
            tags = { "ink", "dialog", "persistent" },
            data = mem.inkState
        })
    end
    mem.inkState = nil
end

------------------------------------------------------------------------
-- 九、战斗与经济
------------------------------------------------------------------------

--- 初始化经济账本
function AgentCore.InitEconomy(npcId)
    AgentCore.economy[npcId] = {
        inventoryValue = 0,
        lastProductionTime = 0,
        priceBeliefs = {},
        investments = {},
        tradeHistory = {},
        productionHistory = {}
    }
end

--- 获取经济账本
function AgentCore.GetEconomy(npcId)
    if not AgentCore.economy[npcId] then
        AgentCore.InitEconomy(npcId)
    end
    return AgentCore.economy[npcId]
end

--- 生产行为
function AgentCore.Produce(npcId, productId, quantity, quality)
    local eco = AgentCore.GetEconomy(npcId)
    quantity = quantity or 1
    quality = quality or 1
    local value = quantity * quality * 10
    eco.inventoryValue = eco.inventoryValue + value
    eco.lastProductionTime = GetWorldTime()
    table.insert(eco.productionHistory, {
        product = productId,
        quantity = quantity,
        quality = quality,
        time = GetWorldTime(),
        value = value
    })
    EventLog.Append({
        type = "economy_produce",
        actor = npcId,
        desc = "生产 " .. productId .. " x" .. quantity,
        data = { value = value }
    })
    Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.economy, {
        content = "生产了 " .. productId .. "，总价值 " .. value,
        weight = 0.4,
        tags = { "economy", "production" }
    })
end

--- 消费行为
function AgentCore.Consume(npcId, itemId, quantity)
    local eco = AgentCore.GetEconomy(npcId)
    quantity = quantity or 1
    local price = eco.priceBeliefs[itemId] or 10
    local cost = quantity * price
    eco.inventoryValue = math.max(0, eco.inventoryValue - cost)
    table.insert(eco.tradeHistory, {
        type = "consume",
        item = itemId,
        quantity = quantity,
        cost = cost,
        time = GetWorldTime()
    })
    EventLog.Append({
        type = "economy_consume",
        actor = npcId,
        desc = "消费 " .. itemId .. " x" .. quantity .. "，花费 " .. cost
    })
end

--- 定价行为
function AgentCore.SetPrice(npcId, itemId, price)
    local eco = AgentCore.GetEconomy(npcId)
    eco.priceBeliefs[itemId] = math.max(1, price)
    -- 根据市场供需微调
    local supply = 10 -- 可由外部传入
    local demand = 8
    if supply > demand then
        eco.priceBeliefs[itemId] = eco.priceBeliefs[itemId] * 0.95
    elseif demand > supply then
        eco.priceBeliefs[itemId] = eco.priceBeliefs[itemId] * 1.05
    end
end

--- 投资行为
function AgentCore.Invest(npcId, targetId, goldAmount)
    local eco = AgentCore.GetEconomy(npcId)
    goldAmount = goldAmount or 0
    if goldAmount <= 0 then return false end
    eco.investments[targetId] = eco.investments[targetId] or { total = 0, history = {} }
    eco.investments[targetId].total = eco.investments[targetId].total + goldAmount
    table.insert(eco.investments[targetId].history, {
        amount = goldAmount,
        time = GetWorldTime()
    })
    EventLog.Append({
        type = "economy_invest",
        actor = npcId,
        target = targetId,
        desc = "向 " .. targetId .. " 投资 " .. goldAmount .. " 金"
    })
    Mempalace.Add(npcId, AgentCore.SENSE_ROOM_MAP.economy, {
        content = "投资 " .. targetId .. " " .. goldAmount .. " 金",
        weight = 0.5,
        tags = { "economy", "investment" }
    })
    return true
end

--- 战斗AI：目标选择
function AgentCore.SelectCombatTarget(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent then return nil end
    local bestTarget = nil
    local bestScore = -999999
    local percepts = AgentCore.perceptions[npcId]
    if not percepts or not percepts.threats then return nil end
    for _, th in ipairs(percepts.threats) do
        local score = 0
        local rel = AgentCore.GetRelationship(npcId, th.id)
        score = score - rel -- 关系越差越优先
        -- 血量低的优先
        if _G.GetNpcHp then
            local hp = GetNpcHp(th.id) or 100
            score = score + (100 - hp) * 0.5
        end
        -- 距离近的优先（如果有距离函数）
        if _G.GetDistanceBetween then
            local dist = GetDistanceBetween(npcId, th.id) or 999
            score = score - dist * 0.1
        end
        if score > bestScore then
            bestScore = score
            bestTarget = th.id
        end
    end
    agent.combatTarget = bestTarget
    local cache = AgentCore.combatCache[npcId] or {}
    cache.preferredTarget = bestTarget
    AgentCore.combatCache[npcId] = cache
    return bestTarget
end

--- 战斗AI：撤退逻辑
function AgentCore.ShouldRetreat(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent then return false end
    if _G.GetNpcHp and _G.GetNpcMaxHp then
        local hp = GetNpcHp(npcId) or 100
        local maxHp = GetNpcMaxHp(npcId) or 100
        if hp < maxHp * 0.2 then
            return true
        end
    end
    local threats = AgentCore.perceptions[npcId] and AgentCore.perceptions[npcId].threats or {}
    if #threats >= 3 then
        return true
    end
    -- 恐惧情绪提高撤退概率
    local mood = AgentCore.GetCurrentMood(npcId)
    if mood == AgentCore.MOOD.ANXIOUS and #threats >= 1 then
        return math.random() < 0.3
    end
    return false
end

--- 战斗AI：连击规划
function AgentCore.PlanCombatCombo(npcId)
    local combos = {
        { "engage_combat", "cast_spell", "taunt" },
        { "engage_combat", "use_item", "flee" },
        { "cast_spell", "cast_spell", "engage_combat" },
        { "taunt", "engage_combat", "cast_spell" }
    }
    local idx = math.random(1, #combos)
    local cache = AgentCore.combatCache[npcId] or {}
    cache.comboQueue = {}
    for _, action in ipairs(combos[idx]) do
        table.insert(cache.comboQueue, { action = action, target = cache.preferredTarget })
    end
    AgentCore.combatCache[npcId] = cache
end

--- 执行战斗Tick（执行连击队列）
function AgentCore.ExecuteCombatTick(npcId, dt)
    local cache = AgentCore.combatCache[npcId]
    if not cache or not cache.comboQueue or #cache.comboQueue == 0 then
        AgentCore.PlanCombatCombo(npcId)
        cache = AgentCore.combatCache[npcId]
    end
    local nextAction = cache.comboQueue[1]
    if nextAction then
        AgentCore.ExecuteStep(npcId, nextAction, dt)
        table.remove(cache.comboQueue, 1)
    end
end

--- 战斗胜利回调
function AgentCore.OnCombatVictory(npcId)
    AgentCore.UpdateReputation(npcId, "fame", 5, "战斗胜利")
    local cache = AgentCore.combatCache[npcId] or {}
    cache.comboQueue = {}
    AgentCore.combatCache[npcId] = cache
    AgentCore.SetMood(npcId, AgentCore.MOOD.CONFIDENT, 0.6)
    EventLog.Append({
        type = "combat_victory",
        actor = npcId,
        desc = "战斗胜利"
    })
end

--- 距离检测辅助
function AgentCore.IsTargetInRange(npcId, targetId, range)
    if _G.GetDistanceBetween then
        return (GetDistanceBetween(npcId, targetId) or 9999) <= range
    end
    return false
end

------------------------------------------------------------------------
-- 十、JSON 解析增强与 5 次 Fallback
------------------------------------------------------------------------

--- 增强版：从杂乱字符串中提取 JSON 对象，支持 XML/YAML/markdown 混合内容
function AgentCore.ExtractJson(str)
    if type(str) ~= "string" then return nil end
    str = str:gsub("\r\n", "\n")

    -- 去除 XML 标签包裹
    str = str:gsub("<[%w_%-:]-.-</[%w_%-:]-", "")
    -- 去除 YAML frontmatter
    str = str:gsub("^%-%-%-\n.-\n%-%-%-\n", "")

    -- 策略1：直接解析
    local parsed = SimpleDecode(str)
    if parsed and type(parsed) == "table" then return parsed end

    -- 策略2：提取 ```json ... ``` 代码块
    local codeBlock = str:match("```json\n(.-)\n```") or str:match("```lua\n(.-)\n```") or str:match("```(.-)```")
    if codeBlock then
        parsed = SimpleDecode(codeBlock)
        if parsed and type(parsed) == "table" then return parsed end
    end

    -- 策略3：寻找第一个 { 和最后一个 } 之间的内容（支持嵌套）
    local startIdx = str:find("{")
    if not startIdx then return nil end
    local depth = 0
    local endIdx = startIdx
    for i = startIdx, #str do
        local c = str:sub(i, i)
        if c == "{" then depth = depth + 1
        elseif c == "}" then depth = depth - 1
        end
        if depth == 0 then
            endIdx = i
            break
        end
    end
    if depth > 0 then
        endIdx = #str
        while depth > 0 do
            str = str .. "}"
            depth = depth - 1
        end
    end
    local jsonStr = str:sub(startIdx, endIdx)
    parsed = SimpleDecode(jsonStr)
    if parsed and type(parsed) == "table" then return parsed end

    -- 策略4：去除 markdown 强调符号后再次尝试
    local cleaned = jsonStr:gsub("%*%*(.-)%*%*", "%1")
    cleaned = cleaned:gsub("%*(.-)%*", "%1")
    cleaned = cleaned:gsub("`(.-)`", "%1")
    parsed = SimpleDecode(cleaned)
    if parsed and type(parsed) == "table" then return parsed end

    -- 策略5：简单容错修复
    local fixed = cleaned:gsub(",(",")", "%1")
    fixed = fixed:gsub("'([%w_]+)':", "\"%1\":")
    fixed = fixed:gsub(":'(.-)'", ":\"%1\"")
    fixed = fixed:gsub(",\s*}", "}")
    fixed = fixed:gsub(",\s*]", "]")
    parsed = SimpleDecode(fixed)
    if parsed and type(parsed) == "table" then return parsed end

    return nil
end

--- 构建越来越严格的 system prompt（支持 5 次 fallback）
function AgentCore.BuildFallbackSystemPrompt(attempt)
    local base = "你是天道引擎的 NPC Agent 决策核心。"
    local strictRules = {
        "请严格输出 JSON 格式，包含 thought 和 plan 两个字段。",
        "plan 是动作数组，每个动作必须包含 action 字段。",
        "可用动作: move_to, speak, trade_initiate, invite_party, lead_to, engage_combat, setup_stall, cast_spell, wait_for, use_item, gather, craft, rest, flee, taunt, bribe, propose, teach, learn, produce, consume, invest",
        "不要输出任何解释性文字，只输出 JSON。"
    }
    if attempt >= 2 then
        table.insert(strictRules, "JSON 必须在一行内完成，不要换行。")
    end
    if attempt >= 3 then
        table.insert(strictRules, "只输出最精简的 JSON，格式示例:{\"thought\":\"...\",\"plan\":[{\"action\":\"speak\",\"content\":\"...\"}]}")
    end
    if attempt >= 4 then
        table.insert(strictRules, "禁止 markdown 代码块，禁止 XML 标签，禁止 YAML 前缀。")
    end
    if attempt >= 5 then
        table.insert(strictRules, "只输出 ASCII 字符，禁止中文标点，键名用英文小写。")
        base = "You are an NPC decision core. Output raw JSON only. No explanation."
    end
    return base .. table.concat(strictRules, "\n")
end

--- 处理 LLM 响应，含 fallback 逻辑（增强到 5 次）
function AgentCore.ProcessLlmResponse(npcId, responseStr, playerConnection, attempt)
    attempt = attempt or 1
    local agent = AgentCore.agents[npcId]
    if not agent then return end

    local parsed = AgentCore.ExtractJson(responseStr)
    if parsed and parsed.plan and type(parsed.plan) == "table" then
        local ok, validPlan = Validator.ValidatePlan(npcId, parsed.plan)
        if ok and #validPlan > 0 then
            local expanded = AgentCore.HTNPlanner.ExpandPlan(npcId, validPlan)
            agent.plan = expanded
            agent.planIndex = 1
            AgentCore.TransitionState(npcId, AgentCore.STATE.EXECUTING)
            agent.lastThink = GetWorldTime()
            AgentCore.lastThinkTimes[npcId] = agent.lastThink
            AgentCore.fallbackAttempts[npcId] = { count = 0, lastFailTime = 0 }

            EventLog.Append({
                type = "npc_strategy",
                actor = npcId,
                desc = parsed.thought or "（无思考摘要）",
                loc = agent.config and agent.config.loc or nil
            })

            if _G.ServerBroadcastNpcThought then
                ServerBroadcastNpcThought(npcId, parsed.thought)
            end
            return
        end
    end

    if attempt < AgentCore.MAX_FALLBACK_RETRIES then
        AgentCore.fallbackAttempts[npcId] = { count = attempt, lastFailTime = GetWorldTime() }
        AgentCore.RequestStrategy(npcId, playerConnection, attempt + 1)
    else
        agent.plan = { { action = "wait_for", timeout = 5 } }
        agent.planIndex = 1
        AgentCore.TransitionState(npcId, AgentCore.STATE.EXECUTING)
        agent.lastThink = GetWorldTime()
        EventLog.Append({
            type = "npc_strategy_fallback_exhausted",
            actor = npcId,
            desc = "LLM 解析失败已达最大重试次数（" .. AgentCore.MAX_FALLBACK_RETRIES .. " 次）"
        })
    end
end

------------------------------------------------------------------------
-- 十一、LLM 请求与 Prompt 构建
------------------------------------------------------------------------

--- 请求 LLM 生成策略（支持 fallback 重试）
function AgentCore.RequestStrategy(npcId, playerConnection, attempt)
    attempt = attempt or 1
    local agent = AgentCore.agents[npcId]
    if not agent then return end

    AgentCore.TransitionState(npcId, AgentCore.STATE.THINKING)

    local prompt = AgentCore.BuildStrategyPrompt(npcId)
    local sysPrompt = AgentCore.BuildFallbackSystemPrompt(attempt)

    local messages = {
        { role = "system", content = sysPrompt },
        { role = "user", content = prompt }
    }

    local function onResponse(responseStr)
        AgentCore.ProcessLlmResponse(npcId, responseStr, playerConnection, attempt)
    end

    if playerConnection and _G.Router and Router.HasPlayerKey and Router.HasPlayerKey(playerConnection) then
        if _G.TaoCallWithPlayerFallback then
            TaoCallWithPlayerFallback(messages, "deepseek_chat", playerConnection, onResponse)
        else
            TaoCall(messages, "deepseek_chat", onResponse)
        end
    else
        if _G.TaoCall then
            TaoCall(messages, "deepseek_chat", onResponse)
        end
    end
end

--- 构建策略 Prompt（完全体扩展版）
function AgentCore.BuildStrategyPrompt(npcId)
    local agent = AgentCore.agents[npcId]
    local memoryText = Mempalace.ToPrompt(npcId, 5)
    local recentEvents = EventLog.ToPromptText(8)
    local dialogCtx = AgentCore.GetDialogPrompt(npcId)
    local needs = AgentCore.GetNpcNeeds(npcId)
    local scheduleState, scheduleLoc = AgentCore.GetScheduledState(npcId)
    local perceived = AgentCore.perceptions[npcId] or {}
    local lifeGoalText = AgentCore.GetLifeGoalPrompt(npcId)
    local moodText = "情绪：" .. AgentCore.GetCurrentMood(npcId)
    local romanceText = ""
    local r = AgentCore.GetRomance(npcId)
    if r and r.status then
        romanceText = string.format("婚姻状态：%s，伴侣：%s", r.status, r.partnerId or "无")
    end
    local factionText = ""
    local f = AgentCore.GetFaction(npcId)
    if f then
        factionText = string.format("派系：%s，忠诚：%d，职位：%s", f.factionId, f.loyalty, f.rank)
    end
    local repText = ""
    local rep = AgentCore.GetReputation(npcId)
    if rep then
        repText = string.format("声望： fame=%d，infamy=%d", rep.fame, rep.infamy)
    end

    local scheduleText = "无固定日程"
    if scheduleState then
        scheduleText = string.format("当前日程: %s @ %s", scheduleState, scheduleLoc or "?")
    end

    local perceptText = ""
    if perceived.sight and #perceived.sight > 0 then
        perceptText = perceptText .. string.format("看到: %d 个。", #perceived.sight)
    end
    if perceived.hearing and #perceived.hearing > 0 then
        perceptText = perceptText .. string.format("听到: %d 段话。", #perceived.hearing)
    end
    if perceived.threats and #perceived.threats > 0 then
        perceptText = perceptText .. string.format("威胁: %d 个。", #perceived.threats)
    end
    if perceived.items and #perceived.items > 0 then
        perceptText = perceptText .. string.format("附近物品: %d 个。", #perceived.items)
    end
    if perceptText == "" then perceptText = "周围很安静。" end

    local prompt = string.format([[
【角色设定】
姓名: %s
身份: %s
Personality: %s
当前状态: %s
HOME: %s

%s
%s
%s
%s
%s

【当前需求】
饥饿: %d | 安全: %d | 社交: %d | 财富: %d | 声望: %d | 浪漫: %d | 好奇: %d | 忠诚: %d | 复仇: %d | 信仰: %d

【日程信息】
%s

【记忆宫殿】
%s

【最近事件】
%s

【感知摘要】
%s

%s

%s

请基于以上信息，为 %s 制定下一步行动计划。输出 JSON 格式如下：
{
  "thought": "简要思考过程",
  "plan": [
    {"action":"move_to","target":"玩家V","distance":100},
    {"action":"speak","content":"你好，旅行者。"}
  ]
}
]], npcId, agent.role, agent.personality, agent.state, agent.homeLoc or "无",
        moodText, romanceText, factionText, repText, lifeGoalText,
        needs.hunger or 50, needs.safety or 50, needs.social or 50, needs.wealth or 50, needs.prestige or 50,
        needs.romance or 50, needs.curiosity or 50, needs.loyalty or 50, needs.revenge or 50, needs.faith or 50,
        scheduleText, memoryText, recentEvents, perceptText,
        (dialogCtx ~= "" and "【对话上下文】\n" .. dialogCtx or ""),
        (AgentCore.GetGossipSummary(npcId, 3) and #AgentCore.GetGossipSummary(npcId, 3) > 0 and "【最近听到的流言】\n" or ""),
        npcId)

    return prompt
end

------------------------------------------------------------------------
-- 十二、动作执行（扩展版）
------------------------------------------------------------------------

--- 执行单个动作步骤
function AgentCore.ExecuteStep(npcId, step, dt)
    if not step or not step.action then return true end
    local action = step.action
    local agent = AgentCore.agents[npcId]

    -- 前置条件统一检查
    local ok, err = Validator.CheckPrecondition(npcId, step)
    if not ok then
        EventLog.Append({
            type = "action_precondition_failed",
            actor = npcId,
            desc = err,
            raw = step
        })
        return true
    end

    -- 资源校验统一检查
    local ok2, err2 = Validator.ValidateResources(npcId, step)
    if not ok2 then
        EventLog.Append({
            type = "action_resource_failed",
            actor = npcId,
            desc = err2,
            raw = step
        })
        return true
    end

    if action == "move_to" then
        if _G.NpcMoveTo then
            NpcMoveTo(npcId, step.target, step.distance or 100)
        end
        return true
    end

    if action == "speak" then
        local content = step.content or "..."
        -- 应用情绪语气修饰
        local _, modifier = AgentCore.GetMoodActionModifier(npcId, "speak")
        if modifier and modifier.warmth < -0.3 then
            content = content .. "（语气冰冷）"
        elseif modifier and modifier.warmth > 0.5 then
            content = content .. "（语气温柔）"
        end
        if _G.ServerBroadcastNpcSpeech then
            ServerBroadcastNpcSpeech(npcId, content)
        end
        if step.target then
            AgentCore.DialogMemory(npcId, step.target, content)
        end
        return true
    end

    if action == "trade_initiate" then
        agent.pendingTradeTarget = step.target_player
        AgentCore.TransitionState(npcId, AgentCore.STATE.TRADING)
        if _G.InitiateTrade then
            InitiateTrade(npcId, step.target_player, step.offer_items)
        end
        return true
    end

    if action == "invite_party" then
        if _G.SendPartyInvite then
            SendPartyInvite(npcId, step.target_player, step.dungeon_id)
        end
        return true
    end

    if action == "lead_to" then
        agent.pendingLeadDestination = step.destination
        AgentCore.TransitionState(npcId, AgentCore.STATE.LEADING)
        if _G.NpcLeadTo then
            NpcLeadTo(npcId, step.destination)
        end
        return true
    end

    if action == "engage_combat" then
        agent.combatTarget = step.target
        AgentCore.TransitionState(npcId, AgentCore.STATE.COMBAT)
        if _G.NpcEnterCombat then
            NpcEnterCombat(npcId, step.target, step.skill_set)
        end
        return true
    end

    if action == "cast_spell" then
        if _G.NpcCastSpell then
            NpcCastSpell(npcId, step.spell_id, step.target)
        end
        return true
    end

    if action == "setup_stall" then
        if _G.NpcSetupStall then
            NpcSetupStall(npcId, step.goods_list)
        end
        return true
    end

    if action == "wait_for" then
        AgentCore.TransitionState(npcId, AgentCore.STATE.WAITING)
        agent.timer = step.timeout or 5
        return false
    end

    if action == "use_item" then
        if _G.NpcUseItem then
            NpcUseItem(npcId, step.item_id, step.target, step.count or 1)
        end
        return true
    end

    if action == "gather" then
        if _G.NpcGather then
            NpcGather(npcId, step.resource_id, step.tool_id, step.amount or 1)
        end
        return true
    end

    if action == "craft" then
        if _G.NpcCraft then
            NpcCraft(npcId, step.recipe_id, step.workbench_loc, step.materials)
        end
        return true
    end

    if action == "rest" then
        AgentCore.TransitionState(npcId, AgentCore.STATE.SLEEP)
        if step.location and _G.NpcMoveTo then
            NpcMoveTo(npcId, step.location)
        end
        return true
    end

    if action == "flee" then
        AgentCore.TransitionState(npcId, AgentCore.STATE.FEAR)
        if step.direction and _G.NpcMoveTo then
            local dest = step.hide_loc or step.direction
            NpcMoveTo(npcId, dest, step.distance or 500)
        end
        return true
    end

    if action == "taunt" then
        local content = step.content or "来啊！"
        if _G.ServerBroadcastNpcSpeech then
            ServerBroadcastNpcSpeech(npcId, content)
        end
        return true
    end

    if action == "bribe" then
        if _G.NpcBribe then
            NpcBribe(npcId, step.target, step.gold_amount, step.item_id)
        end
        AgentCore.UpdateRelationship(npcId, step.target, 5)
        return true
    end

    if action == "propose" then
        local target = step.target
        if target then
            AgentCore.Propose(npcId, target)
            AgentCore.TransitionState(npcId, AgentCore.STATE.COURTSHIP)
        end
        return true
    end

    if action == "teach" then
        local students = step.students
        if type(students) == "string" then students = { students } end
        if step.student then students = { step.student } end
        if students then
            for _, sid in ipairs(students) do
                AgentCore.TeachSkill(npcId, sid, step.skill or "通用技艺")
            end
            AgentCore.TransitionState(npcId, AgentCore.STATE.MENTOR)
        end
        return true
    end

    if action == "learn" then
        local mentorId = step.mentor
        if mentorId then
            AgentCore.BecomeStudent(npcId, mentorId)
            AgentCore.TransitionState(npcId, AgentCore.STATE.STUDENT)
        end
        return true
    end

    if action == "produce" then
        AgentCore.Produce(npcId, step.product_id, step.quantity, step.quality)
        return true
    end

    if action == "consume" then
        AgentCore.Consume(npcId, step.item_id, step.quantity)
        return true
    end

    if action == "invest" then
        AgentCore.Invest(npcId, step.target, step.gold_amount)
        return true
    end

    -- 未知动作默认完成
    return true
end

------------------------------------------------------------------------
-- 十三、Tick 与调度
------------------------------------------------------------------------

--- 单步 Tick（核心驱动循环）
function AgentCore.Tick(npcId, dt)
    local agent = AgentCore.agents[npcId]
    if not agent then return end
    if agent.state == AgentCore.STATE.DEAD then return end

    -- 刺激衰减
    AgentCore.DecayStimulus(npcId, dt)
    -- 情绪衰减
    AgentCore.DecayMood(npcId, dt)

    -- 感知更新
    local perceptInterval = agent.config and agent.config.perceptInterval or 2.0
    agent.perceptTimer = (agent.perceptTimer or 0) + dt
    if agent.perceptTimer >= perceptInterval then
        AgentCore.Perceive(npcId)
        agent.perceptTimer = 0
    end

    -- 背叛检测（低频）
    local betrayalTimer = agent.betrayalCheckTimer or 0
    betrayalTimer = betrayalTimer + dt
    if betrayalTimer >= 30 then
        betrayalTimer = 0
        local willBetray, score = AgentCore.DetectBetrayal(npcId)
        if willBetray then
            AgentCore.TransitionState(npcId, AgentCore.STATE.BETRAYAL)
        end
    end
    agent.betrayalCheckTimer = betrayalTimer

    -- 思考触发
    if agent.state == AgentCore.STATE.IDLE or agent.state == AgentCore.STATE.PATROL or agent.state == AgentCore.STATE.SLEEP then
        if AgentCore.ShouldThink(npcId) then
            AgentCore.RequestStrategy(npcId)
            return
        end
    end

    -- 状态机 Update
    if AgentCore.FSM.Update[agent.state] then
        AgentCore.FSM.Update[agent.state](npcId, agent, dt)
    end
end

--- 更新等待状态计时器（保留旧版 API 兼容）
function AgentCore.UpdateWait(npcId, dt, conditionMet)
    local agent = AgentCore.agents[npcId]
    if not agent or agent.state ~= AgentCore.STATE.WAITING then return end

    agent.timer = agent.timer - dt
    if conditionMet or agent.timer <= 0 then
        AgentCore.TransitionState(npcId, AgentCore.STATE.EXECUTING)
        agent.planIndex = agent.planIndex + 1
        if agent.planIndex > #agent.plan then
            agent.plan = {}
            agent.planIndex = 1
            AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
        end
    end
end

--- 批量 Tick 所有 Agent
function AgentCore.TickAll(dt)
    for npcId, _ in pairs(AgentCore.agents) do
        AgentCore.Tick(npcId, dt)
    end
end

------------------------------------------------------------------------
-- 十四、原有并扩展的公共 API
------------------------------------------------------------------------

--- 初始化 NPC Agent（增强版）
function AgentCore.Init(npcId, config)
    config = config or {}
    AgentCore.agents[npcId] = {
        id = npcId,
        state = AgentCore.STATE.IDLE,
        plan = {},
        planIndex = 1,
        timer = 0,
        lastThink = 0,
        thinkInterval = config.thinkInterval or AgentCore.BASE_THINK_INTERVAL,
        personality = config.personality or "neutral",
        role = config.role or "commoner",
        homeLoc = config.homeLoc or "",
        config = config,
        prevState = nil,
        stateEnterTime = 0,
        perceptTimer = 0,
        betrayalCheckTimer = 0,
        courtshipAttempts = 0
    }
    AgentCore.stimulusRegistry[npcId] = {}
    AgentCore.fallbackAttempts[npcId] = { count = 0, lastFailTime = 0 }
    AgentCore.InitRomance(npcId)
    AgentCore.InitMentorship(npcId)
    AgentCore.InitFaction(npcId, config.factionId)
    AgentCore.InitReputation(npcId)
    AgentCore.InitMood(npcId)
    AgentCore.InitLifeGoals(npcId)
    AgentCore.InitEconomy(npcId)
    AgentCore.combatCache[npcId] = {}
    AgentCore.gossipCache[npcId] = { rumors = {}, lastGossipTime = 0 }
end

--- 广播函数（由 Server.lua 实现或外部接管）
function BroadcastNpcSpeech(npcId, content)
    if _G.ServerBroadcastNpcSpeech then
        ServerBroadcastNpcSpeech(npcId, content)
    end
end

function BroadcastNpcThought(npcId, thought)
    if _G.ServerBroadcastNpcThought then
        ServerBroadcastNpcThought(npcId, thought)
    end
end

------------------------------------------------------------------------
-- 十五、日程/作息系统
------------------------------------------------------------------------

--- 为 NPC 设置 24 小时制作息表
function AgentCore.Schedule(npcId, scheduleDef)
    if not scheduleDef or type(scheduleDef) ~= "table" then
        scheduleDef = {}
    end
    AgentCore.schedules[npcId] = scheduleDef
end

--- 根据当前世界时间获取 NPC 应处的日程状态
function AgentCore.GetScheduledState(npcId)
    local schedule = AgentCore.schedules[npcId]
    if not schedule then return nil end

    local hour = 0
    if _G.GetWorldHour then
        hour = GetWorldHour() or 0
    else
        local t = GetWorldTime() or 0
        hour = (t % 86400) / 3600
    end

    for _, entry in ipairs(schedule) do
        local s = entry.start or 0
        local f = entry.finish or 24
        if s <= f then
            if hour >= s and hour < f then
                return entry.state, entry.loc
            end
        else
            if hour >= s or hour < f then
                return entry.state, entry.loc
            end
        end
    end
    return nil
end

--- 检查当前是否处于指定日程状态
function AgentCore.IsInScheduledState(npcId, stateName)
    local s = AgentCore.GetScheduledState(npcId)
    return s == stateName
end

------------------------------------------------------------------------
-- 十六、社交关系管理
------------------------------------------------------------------------

--- 获取两个实体之间的关系值（默认 0）
function AgentCore.GetRelationship(npcId, targetId)
    if not AgentCore.relationships[npcId] then return 0 end
    return AgentCore.relationships[npcId][targetId] or 0
end

--- 更新社交关系（规范化到 [-100,100]），并同步到 Mempalace
function AgentCore.UpdateRelationship(npcId, targetId, delta)
    AgentCore.relationships[npcId] = AgentCore.relationships[npcId] or {}
    local oldVal = AgentCore.relationships[npcId][targetId] or 0
    local newVal = oldVal + delta
    if newVal > 100 then newVal = 100 end
    if newVal < -100 then newVal = -100 end
    AgentCore.relationships[npcId][targetId] = newVal

    local room = newVal >= 0 and AgentCore.SENSE_ROOM_MAP.positive_relation or AgentCore.SENSE_ROOM_MAP.negative_relation
    local desc = string.format("对 %s 的关系从 %d 变为 %d（变化 %+d）", targetId, oldVal, newVal, delta)
    Mempalace.Add(npcId, room, {
        content = desc,
        weight = math.abs(newVal) / 100 + 0.3,
        tags = { "relationship", room == AgentCore.SENSE_ROOM_MAP.positive_relation and "positive" or "negative" }
    })

    AgentCore.relationships[targetId] = AgentCore.relationships[targetId] or {}
    local oldReverse = AgentCore.relationships[targetId][npcId] or 0
    local newReverse = oldReverse + delta * 0.3
    if newReverse > 100 then newReverse = 100 end
    if newReverse < -100 then newReverse = -100 end
    AgentCore.relationships[targetId][npcId] = newReverse

    return newVal
end

--- 批量调整多个目标的关系
function AgentCore.UpdateRelationships(npcId, deltas)
    if type(deltas) ~= "table" then return end
    for targetId, delta in pairs(deltas) do
        AgentCore.UpdateRelationship(npcId, targetId, delta)
    end
end

------------------------------------------------------------------------
-- 十七、刺激与思考调度
------------------------------------------------------------------------

--- 注册刺激值（范围 0~1）
function AgentCore.RegisterStimulus(npcId, stimType, intensity)
    AgentCore.stimulusRegistry[npcId] = AgentCore.stimulusRegistry[npcId] or {}
    local reg = AgentCore.stimulusRegistry[npcId]
    reg[stimType] = math.max(reg[stimType] or 0, intensity)
end

--- 刺激衰减
function AgentCore.DecayStimulus(npcId, dt)
    local reg = AgentCore.stimulusRegistry[npcId]
    if not reg then return end
    for k, v in pairs(reg) do
        reg[k] = math.max(0, v - AgentCore.STIMULUS_DECAY * dt)
        if reg[k] <= 0.001 then reg[k] = nil end
    end
end

--- 是否应该触发思考（基于刺激阈值动态计算）
function AgentCore.ShouldThink(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent then return false end
    if agent.state == AgentCore.STATE.THINKING then return false end
    if agent.state == AgentCore.STATE.DEAD then return false end

    local now = GetWorldTime()
    local lastThink = agent.lastThink or 0
    local interval = agent.thinkInterval or AgentCore.BASE_THINK_INTERVAL

    local reg = AgentCore.stimulusRegistry[npcId] or {}
    local stimSum = 0
    for _, v in pairs(reg) do stimSum = stimSum + v end

    local adjusted = interval * (1 - math.min(stimSum, 0.9))
    adjusted = math.max(adjusted, AgentCore.MIN_THINK_INTERVAL)
    adjusted = math.min(adjusted, AgentCore.MAX_THINK_INTERVAL)

    if agent.state == AgentCore.STATE.DYING then
        adjusted = AgentCore.MIN_THINK_INTERVAL
    end
    if agent.state == AgentCore.STATE.TRADING then
        adjusted = math.max(adjusted, 20)
    end

    return (now - lastThink) >= adjusted
end

------------------------------------------------------------------------
-- 十八、辅助工具
------------------------------------------------------------------------

--- 设置 Agent 配置项（运行时动态调整）
function AgentCore.SetConfig(npcId, key, value)
    local agent = AgentCore.agents[npcId]
    if agent then
        agent.config = agent.config or {}
        agent.config[key] = value
    end
end

--- 获取 Agent 配置项
function AgentCore.GetConfig(npcId, key, defaultValue)
    local agent = AgentCore.agents[npcId]
    if agent and agent.config then
        return agent.config[key] ~= nil and agent.config[key] or defaultValue
    end
    return defaultValue
end

--- 强制重置 Agent 到 IDLE（用于异常恢复）
function AgentCore.ResetToIdle(npcId)
    local agent = AgentCore.agents[npcId]
    if not agent then return end
    agent.plan = {}
    agent.planIndex = 1
    agent.timer = 0
    AgentCore.TransitionState(npcId, AgentCore.STATE.IDLE)
end

--- 销毁 Agent（释放内存）
function AgentCore.Destroy(npcId)
    AgentCore.agents[npcId] = nil
    AgentCore.schedules[npcId] = nil
    AgentCore.dialogMemory[npcId] = nil
    AgentCore.relationships[npcId] = nil
    AgentCore.perceptions[npcId] = nil
    AgentCore.utilityCache[npcId] = nil
    AgentCore.stimulusRegistry[npcId] = nil
    AgentCore.lastThinkTimes[npcId] = nil
    AgentCore.fallbackAttempts[npcId] = nil
    AgentCore.stateHistories[npcId] = nil
    AgentCore.romances[npcId] = nil
    AgentCore.mentorships[npcId] = nil
    AgentCore.factions[npcId] = nil
    AgentCore.reputations[npcId] = nil
    AgentCore.moods[npcId] = nil
    AgentCore.lifeGoals[npcId] = nil
    AgentCore.economy[npcId] = nil
    AgentCore.combatCache[npcId] = nil
    AgentCore.gossipCache[npcId] = nil
end

--- 注册新的 HTN 复合任务
function AgentCore.RegisterHtnTask(taskName, methods)
    AgentCore.HTNPlanner.library[taskName] = methods
end

--- 获取状态历史
function AgentCore.GetStateHistory(npcId)
    local hist = AgentCore.stateHistories[npcId]
    if not hist then return {} end
    return hist.states
end

return AgentCore
