# AgentCore.lua 解剖报告

> 文件：`scripts/network/tao/AgentCore.lua`  
> 体量：约 124 KB / 3444 行  
> 版本：天道引擎 v2.0 完全体

---

## 1. 模块职责一句话定义

**AgentCore 是 NPC Agent 的“灵魂容器”——统筹 FSM 状态流转、HTN 任务分解、Utility AI 选优、五感记忆写入、社会关系网、经济/战斗/政治行为、以及通过 LLM 完成的 ReAct 式决策循环，并具备 5 级 fallback 容错恢复机制。**

---

## 2. 公共 API 清单

### 2.1 生命周期管理

| 函数 | 说明 |
|------|------|
| `AgentCore.Init(npcId, config)` | 初始化一个 Agent 实例，注册所有子系统内存（社交、情绪、经济、师徒、派系等） |
| `AgentCore.Destroy(npcId)` | 彻底释放该 Agent 的全部内存索引 |
| `AgentCore.ResetToIdle(npcId)` | 强制清空计划、回归 `IDLE`（异常恢复） |
| `AgentCore.Tick(npcId, dt)` | 单步核心驱动：感知衰减 → 感知刷新 → 背叛检测 → 思考触发 → FSM Update |
| `AgentCore.TickAll(dt)` | 遍历所有已注册 Agent 执行 Tick |

### 2.2 FSM 与状态切换

| 函数 | 说明 |
|------|------|
| `AgentCore.TransitionState(npcId, newState)` | 带历史记录的状态切换（自动触发 Enter/Exit 钩子） |
| `AgentCore.RevertState(npcId)` | 基于状态历史栈回溯到上一个状态 |
| `AgentCore.GetStateHistory(npcId)` | 获取最近 20 条状态流转记录 |

### 2.3 感知与记忆

| 函数 | 说明 |
|------|------|
| `AgentCore.Perceive(npcId)` | 执行五感扫描（视/听/嗅/味/触），并将结果写入 **Mempalace** 各房间 |
| `AgentCore.RegisterStimulus(npcId, stimType, intensity)` | 注册外部刺激（战斗、侮辱等），用于动态压缩思考间隔 |
| `AgentCore.DecayStimulus(npcId, dt)` | 刺激值按时间衰减 |
| `AgentCore.ShouldThink(npcId)` | 基于刺激强度和上一次思考时间，判断是否应触发 LLM 决策 |
| `AgentCore.ExtractGossip(npcId, speakerId, content)` | 从他人对话中提取八卦并写入 **Mempalace「流言井」** |
| `AgentCore.GetGossipSummary(npcId, n)` | 返回最近 n 条谣言摘要 |

### 2.4 决策 request / prompt / fallback

| 函数 | 说明 |
|------|------|
| `AgentCore.RequestStrategy(npcId, playerConnection, attempt)` | 进入 `THINKING` 状态，组装 prompt 并请求 LLM；支持 fallback 重试 |
| `AgentCore.BuildStrategyPrompt(npcId)` | 构建完全体 prompt（记忆宫殿 + 最近事件 + 感知 + 需求 + 社交/派系/声望/目标） |
| `AgentCore.BuildFallbackSystemPrompt(attempt)` | 根据重试次数递进式加压，要求输出裸 JSON |
| `AgentCore.ProcessLlmResponse(npcId, responseStr, playerConnection, attempt)` | 解析 LLM 返回，验证计划，失败则递归 fallback（最多 5 次） |
| `AgentCore.ExtractJson(str)` | 5 层策略的 JSON 提取器（直接解析、代码块、首尾括号、markdown 清洗、语法修复） |

### 2.5 HTN 任务分解

| 函数 | 说明 |
|------|------|
| `AgentCore.HTNPlanner.Decompose(npcId, compoundTaskName, vars)` | 将复合任务按前置条件匹配分解为原子任务列表 |
| `AgentCore.HTNPlanner.ExpandPlan(npcId, plan)` | 递归展开计划，遇到复合任务继续分解 |
| `AgentCore.HTNPlanner.TryReplan(npcId, failedStep)` | 单步失败时的备用计划生成 |
| `AgentCore.ReplanCurrentTask(npcId)` | 外部手动触发 replan，替换当前及后续步骤 |
| `AgentCore.RegisterHtnTask(taskName, methods)` | 动态注册新的 HTN 复合任务 |

### 2.6 Utility AI

| 函数 | 说明 |
|------|------|
| `AgentCore.GetNpcNeeds(npcId)` | 读取 10 维度需求值（饥饿/安全/社交/财富/声望/浪漫/好奇/忠诚/复仇/信仰） |
| `AgentCore.GetDynamicWeights(npcId)` | 基于人格特质与情绪动态调整需求权重 |
| `AgentCore.CalculateUtility(npcId, actionDef)` | 计算单一动作的 Utility 得分 |
| `AgentCore.SelectBestAction(npcId, candidates)` | Pareto 前沿筛选 + 加权求和，选出最优动作 |
| `AgentCore.GenerateCandidates(npcId)` | 依据当前需求水平预筛候选动作 |
| `AgentCore.GetUtilitySnapshot(npcId)` | 获取当前 Utility 缓存快照 |

### 2.7 社会模拟（伴侣/师徒/派系/声望）

| 函数 | 说明 |
|------|------|
| `AgentCore.InitRomance / GetRomance(npcId)` | 伴侣系统初始化和读取 |
| `AgentCore.Propose(npcId, targetId)` | 求婚，写入 Mempalace |
| `AgentCore.AcceptProposal(targetId, npcId)` | 接受求婚，状态变为 married |
| `AgentCore.Divorce(npcId, reason)` | 离婚，关系值暴跌，写入阴影室 |
| `AgentCore.InitMentorship / GetMentorship(npcId)` | 师徒系统 |
| `AgentCore.BecomeStudent(npcId, mentorId)` | 拜师 |
| `AgentCore.TeachSkill(mentorId, studentId, skillName)` | 记录授课 |
| `AgentCore.AdvanceStudentSkill(studentId, skillName, delta)` | 增长学生技能进度，满 100 自动出师 |
| `AgentCore.GraduateStudent(studentId, skillName)` | 出师仪式，提升师徒关系 |
| `AgentCore.LeaveMentor(studentId)` | 叛出师门 |
| `AgentCore.InitFaction / GetFaction(npcId)` | 派系系统 |
| `AgentCore.SetFactionLoyalty(npcId, value)` | 设置忠诚度 |
| `AgentCore.DetectBetrayal(npcId)` | 背叛风险评估，基于忠诚/需求/外部诱惑 |
| `AgentCore.PlanCoup(npcId, targetLeaderId)` | 记录政变计划到派系数据与阴影室 |
| `AgentCore.ExecuteBetrayal(npcId)` | 执行背叛/政变，修改关系与声望 |
| `AgentCore.EvaluatePoliticalAlliance(npcId)` | 评估跨派系联盟可能性 |
| `AgentCore.InitReputation / GetReputation / UpdateReputation` | 声望管理（fame / infamy 双轨） |
| `AgentCore.GetRelationship(npcId, targetId)` | 读取关系值 |
| `AgentCore.UpdateRelationship(npcId, targetId, delta)` | 更新双向关系，同步写入 Mempalace 恩情殿/阴影室 |
| `AgentCore.UpdateRelationships(npcId, deltas)` | 批量更新关系 |

### 2.8 情绪与对话

| 函数 | 说明 |
|------|------|
| `AgentCore.InitMood / GetCurrentMood / SetMood(npcId, moodName, intensity)` | 情绪状态机 |
| `AgentCore.DecayMood(npcId, dt)` | 情绪自然衰减 |
| `AgentCore.GetMoodActionModifier(npcId, actionName)` | 情绪对动作执行的修饰系数，主要用于语气调整 |
| `AgentCore.DialogMemory(npcId, withTarget, lastMsg)` | 维护对话上下文（最近 20 轮），含时间戳 |
| `AgentCore.EndDialog(npcId)` | 清空对话内存 |
| `AgentCore.GetDialogPrompt(npcId)` | 生成对话上下文摘要，供 prompt 使用 |
| `AgentCore.StartInkDialog(npcId, storyName, knotName)` | 启动 Ink 叙事树，注入 NPC 情绪与关系变量 |
| `AgentCore.AdvanceInkDialog(npcId, choiceIndex)` | 推进 Ink 对话一步 |
| `AgentCore.GetInkDialogState(npcId)` | 获取当前 Ink 文本与选项（UI 展示用） |
| `AgentCore.EndInkDialog(npcId)` | 将 Ink 状态持久化到 Mempalace「回声廊」 |

### 2.9 经济与战斗

| 函数 | 说明 |
|------|------|
| `AgentCore.InitEconomy / GetEconomy(npcId)` | 经济账本（库存价值、定价信念、投资记录） |
| `AgentCore.Produce(npcId, productId, quantity, quality)` | 生产行为，写入 Mempalace「金算盘」 |
| `AgentCore.Consume(npcId, itemId, quantity)` | 消费行为 |
| `AgentCore.SetPrice(npcId, itemId, price)` | 设定售价，按供需自动微调 |
| `AgentCore.Invest(npcId, targetId, goldAmount)` | 投资行为，写入金算盘 |
| `AgentCore.SelectCombatTarget(npcId)` | 基于关系值、血量、距离评分选择战斗目标 |
| `AgentCore.ShouldRetreat(npcId)` | 撤退判定（血量/威胁数/情绪） |
| `AgentCore.PlanCombatCombo(npcId)` | 随机生成 3 段连击队列 |
| `AgentCore.ExecuteCombatTick(npcId, dt)` | 每 tick 执行连击队列中的下一个动作 |
| `AgentCore.OnCombatVictory(npcId)` | 战斗胜利回调，提升 fame 与自信情绪 |

### 2.10 日程作息

| 函数 | 说明 |
|------|------|
| `AgentCore.Schedule(npcId, scheduleDef)` | 设置 24h 作息表 |
| `AgentCore.GetScheduledState(npcId)` | 根据当前世界小时返回应处状态与地点 |
| `AgentCore.IsInScheduledState(npcId, stateName)` | 检查是否处于指定日程 |

### 2.11 长期目标（LifeGoal）

| 函数 | 说明 |
|------|------|
| `AgentCore.InitLifeGoals / AddLifeGoal` | 初始化与添加人生目标 |
| `AgentCore.CompleteMilestone(npcId, goalId, milestoneName)` | 完成里程碑，写入 Mempalace「天命阁」 |
| `AgentCore.IsLifeGoalComplete(npcId, goalId)` | 检查目标是否全部完成 |
| `AgentCore.GetLifeGoalPrompt(npcId)` | 生成目标摘要供 prompt 使用 |

### 2.12 执行与工具

| 函数 | 说明 |
|------|------|
| `AgentCore.ExecuteStep(npcId, step, dt)` | 原子动作的统一入口，含前置条件与资源校验，对接 22 种动作 |
| `AgentCore.IsTargetInRange(npcId, targetId, range)` | 距离检测辅助 |
| `AgentCore.SetConfig / GetConfig` | 运行时动态读写 Agent 配置 |

---

## 3. NPC Agent 内部状态机

AgentCore 维护一个显式 FSM（Finite State Machine），支持 **Enter / Update / Exit** 三段式钩子，并记录 **最近 20 条状态历史**。

### 3.1 状态枚举（18 种）

```lua
IDLE        -- 空闲（可被日程打断）
THINKING    -- 正在向 LLM 请求策略（含 45s 超时保护）
EXECUTING   -- 按 plan 逐步执行动作
WAITING     -- 等待（wait_for 动作触发的子状态）
COMBAT      -- 战斗中（连击队列 + 每 2s 撤退评估）
DEAD        -- 死亡，Tick 直接短路
PATROL      -- 巡逻（按路点循环移动）
SLEEP       -- 睡眠（可被威胁打断为 FEAR）
FEAR        -- 恐惧/逃跑（向 hideLoc 移动）
TRADING     -- 交易中（60s 超时）
LEADING     -- 引导/带路（向目的地移动）
DYING       -- 濒死（10s 后转 DEAD，可被治疗者挽救）
ROMANCE     -- 浪漫互动（与伴侣共处）
COURTSHIP   -- 求爱（定时发送情话）
MENTOR      -- 教导（定时增长学生技能）
STUDENT     -- 求学（定时向师父问候）
POLITICS    -- 政治活动（偶尔评估联盟）
BETRAYAL    -- 背叛（倒计时结束后执行政变）
```

### 3.2 状态切换的流程

```
调用 AgentCore.TransitionState(npcId, newState)
    │
    ├── 触发旧状态 Exit 钩子
    ├── 写入 stateHistories（最多保留 20 条）
    ├── 更新 agent.state / prevState / stateEnterTime
    ├── 触发新状态 Enter 钩子
    └── EventLog.Append({type="npc_state_change", ...})
```

### 3.3 关键状态的行为

- **IDLE / PATROL / SLEEP**：允许被 `ShouldThink()` 打断，从而进入 `THINKING`。
- **THINKING**：若 45 秒未收到 LLM 返回，自动切回 IDLE。
- **EXECUTING**：顺序消费 `agent.plan` 数组。当前 step 完成后 `planIndex++`，全部完成后回归 IDLE。
- **WAITING**：作为 `wait_for` 动作的子状态，计时结束后自动切回 EXECUTING 继续下一条。
- **COMBAT**：120 秒超时自动撤退；目标死亡则触发 `OnCombatVictory`。

---

## 4. 决策循环流程图（文字版）

AgentCore 的决策链路本质上是 **ReAct（Reason + Act）** 在游戏 tick 中的落地实现，同时融合了 **HTN 分解** 与 **Utility 选优** 作为本地保底逻辑。

```
┌──────────────────────────────────────────────────────────────────┐
│                          每帧 Tick                               │
│  AgentCore.Tick(npcId, dt)                                       │
└──────────────────────────────────────────────────────────────────┘
                               │
                               ▼
            ┌──────────────────┴──────────────────┐
            │  1. 生理/心理衰减                     │
            │     DecayStimulus + DecayMood        │
            └───────────────────────────────────────┘
                               │
                               ▼
            ┌──────────────────┴──────────────────┐
            │  2. 感知刷新（低频，默认每 2s）       │
            │     Perceive() → 写入 Mempalace      │
            └───────────────────────────────────────┘
                               │
                               ▼
            ┌──────────────────┴──────────────────┐
            │  3. 背叛检测（低频，每 30s）          │
            │     DetectBetrayal() → 可能切 BETRAYAL│
            └───────────────────────────────────────┘
                               │
                               ▼
            ┌──────────────────┴──────────────────┐
            │  4. 思考触发判定                     │
            │     ShouldThink()?                   │
            │     基于 thinkInterval - 刺激压缩    │
            └───────────────────────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │ 是                        │ 否
                 ▼                           ▼
    ┌────────────────────────┐    ┌────────────────────────┐
    │ RequestStrategy()      │    │ 执行当前 FSM.Update    │
    │ 进入 THINKING 状态      │    │ (EXECUTING / COMBAT 等)│
    └────────────────────────┘    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ BuildStrategyPrompt()  │  ← 读取 Mempalace.ToPrompt(5)
    │ 组装完全体 Prompt       │  ← 读取 EventLog.ToPromptText(8)
    │ (角色+需求+日程+感知    │  ← 读取感知缓存、对话上下文
    │  +记忆+事件+目标+情绪)  │  ← 读取社交/派系/声望/谣言
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ 发送 LLM 请求           │
    │ 若 playerConnection 有效 │
    │ 且 Router.HasPlayerKey   │
    │ → TaoCallWithPlayerFallback│
    │ 否则 → TaoCall()        │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ ProcessLlmResponse()   │
    │ 提取 JSON (最多 5 次 fallback)│
    │ 解析出 thought + plan   │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ Validator.ValidatePlan()│
    │ 校验动作合法性          │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ HTNPlanner.ExpandPlan() │
    │ 递归分解复合任务        │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ agent.plan = expanded   │
    │ agent.planIndex = 1     │
    │ TransitionState(EXECUTING)│
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ EventLog.Append({       │
    │   type="npc_strategy",  │
    │   desc=thought })       │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ (可选)广播思考摘要      │
    │ ServerBroadcastNpcThought│
    └────────────────────────┘

─────────────────────────────────────────────────────────────────────
                         执行阶段（下一帧及后续帧）
─────────────────────────────────────────────────────────────────────

    ┌────────────────────────┐
    │ FSM.Update[EXECUTING]  │
    └────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │ ExecuteStep(npcId, step)│
    │ 22 种原子动作的统一入口  │
    │ 含前置条件+资源校验      │
    └────────────────────────┘
                 │
       ┌─────────┴─────────┐
       │                   │
       ▼                   ▼
  立即完成动作          状态型动作
(move_to, speak,    (wait_for → WAITING
 trade_initiate,     engage_combat → COMBAT
 etc.)               rest → SLEEP, etc.)
       │                   │
       ▼                   ▼
 planIndex++         状态机内部计时/条件
       │            满足后切回 EXECUTING
       │                   │
       └─────────┬─────────┘
                 ▼
        所有 step 执行完毕
                 │
                 ▼
    TransitionState(IDLE)
                 │
                 ▼
    下一次 ShouldThink() 触发
    重新进入 LLM ReAct 循环

─────────────────────────────────────────────────────────────────────
                              反思阶段（隐式）
─────────────────────────────────────────────────────────────────────

反射并非一个独立的“Reflect”函数，而是通过以下机制实现闭环：

1. 事件溯源：所有状态切换、战斗结果、交易、背叛、政治行为都会
   EventLog.Append()，成为下一次 BuildStrategyPrompt 的输入。

2. 记忆宫殿：感知、关系变动、人生目标、绯闻、Ink 状态均通过
   Mempalace.Add() 写入不同房间，构成 Agent 的“长期记忆背景噪声”。

3. 情绪反馈：战斗胜利提升自信（CONFIDENT），濒死触发恐惧（FEAR），
   背叛触发愤怒（ANGRY）。这些情绪在下一次 Utility 计算和 Prompt
   构建中改变权重与语气。

4. Fallback 自省：当 LLM 返回格式错误时，ProcessLlmResponse 会
   递归重试，并在每次重试中使用更严格的 system prompt（BuildFallbackSystemPrompt），
   这实际上是一种“对 LLM 行为的自适应约束”。
```

---

## 5. 与其他子系统（宫殿/轮回/天眼）的耦合分析

### 5.1 宫殿 —— Mempalace（空间化记忆系统）

**耦合强度：极高**

AgentCore 将 Mempalace 视为 NPC 的“海马体”，所有能产生叙事价值的感知与事件都会调用 `Mempalace.Add()`。

- **写入房间映射**：`AgentCore.SENSE_ROOM_MAP` 显式定义了感官 → 房间的对照表：
  - `sight` → **光明殿**
  - `hearing` → **回声廊**
  - `smell` → **芳香阁**
  - `taste` → **五味堂**
  - `touch` → **触觉岩**
  - `threat` → **阴影室**
  - `social/positive_relation` → **恩情殿**
  - `negative_relation` → **阴影室**
  - `gossip` → **流言井**
  - `goal` → **天命阁**
  - `economy` → **金算盘**
  - `combat` → **血战壕**
- **读取接口**：`BuildStrategyPrompt` 中调用 `Mempalace.ToPrompt(npcId, 5)`，将最近 5 条高权重记忆注入 LLM prompt。
- **持久化**：Ink 对话状态、`gossipCache`、关系变动、经济行为、出师/结婚/离婚等重大人生事件均写入宫殿。
- **风险**：如果迁移时没有 Mempalace，将失去 NPC 的“记忆连续性”，prompt 中也会缺失大量上下文；需要替换为一套 key-value 或向量记忆接口。

### 5.2 轮回 —— EventLog（事件溯源日志）

**耦合强度：高**

EventLog 是 AgentCore 的“世界广播器”与“近期记忆缓存”。

- **写入点**：
  - 所有状态切换 (`npc_state_change`)
  - LLM 决策 (`npc_strategy`)
  - Fallback 失败 (`npc_strategy_fallback_exhausted`)
  - HTN 分解失败 (`htn_decompose_failed`)
  - 战斗 (`combat_victory`)
  - 经济 (`economy_produce/consume/invest`)
  - 婚恋 (`romance_propose/wedding/divorce`)
  - 师徒 (`mentorship_start/teach/graduate/leave`)
  - 派系 (`faction_betrayal_detected/coup_plan/betrayal_execute`)
  - 政治评估 (`political_alliance_eval`)
  - 动作前置条件/资源校验失败
- **读取点**：
  - `BuildStrategyPrompt` 调用 `EventLog.ToPromptText(8)` 获取最近 8 条事件摘要。
  - `Perceive()` 调用 `EventLog.ByLocation(loc, 3)` 获取地点近期事件，写入感知缓存。
- **风险**：EventLog 提供的是一种“公共时间线”视角，与 Mempalace 的“个人空间记忆”互补。迁移时需要提供一个带位置过滤和最近 N 条读取能力的日志服务。

### 5.3 天眼 —— Router（LLM 请求路由与玩家私有 API）

**耦合强度：中等**

天眼子系统（ Router + TaoCall ）是 AgentCore 与外部大模型之间的“网关”。

- **调用位置**：仅出现在 `RequestStrategy(npcId, playerConnection, attempt)` 中。
- **逻辑分支**：
  1. 若 `playerConnection` 非空，且 `Router.HasPlayerKey(playerConnection)` 返回 true，则使用玩家自己的 API Key 进行调用：`TaoCallWithPlayerFallback(messages, "deepseek_chat", playerConnection, onResponse)`。
  2. 否则使用公共（或服务器预设）API Key：`TaoCall(messages, "deepseek_chat", onResponse)`。
- **作用**：实现“玩家自带 Key”的隐私/成本分离模式。
- **风险**：迁移时需要替换 `TaoCall` / `TaoCallWithPlayerFallback` / `Router.HasPlayerKey` 为新的 LLM 客户端封装。这部分接口集中，替换成本低。

### 5.4 其他外部依赖

- **Validator**：`ProcessLlmResponse` 与 `ExecuteStep` 均调用 `Validator.ValidatePlan` / `Validator.CheckPrecondition` / `Validator.ValidateResources`。这是一个强耦合的校验层。
- **InkRuntime**：对话子系统通过 `_G.InkRuntime` 调用。如果不需要 Ink 叙事树，可整体剥离。
- **大量引擎全局函数**：`_G.NpcMoveTo`、`_G.ServerBroadcastNpcSpeech`、`_G.GetNpcHp` 等。这些构成了与游戏引擎（UrhoX）的“毛细血管级”耦合。

---

## 6. 可迁移性评估

### 6.1 整体 verdict

| 维度 | 评分 | 说明 |
|------|------|------|
| **单体可迁移性** | ⭐⭐ （低） | 124 KB 的巨型单体文件，与引擎全局函数、Mempalace、EventLog 深度交织。 |
| **算法/逻辑可迁移性** | ⭐⭐⭐⭐ （中高） | FSM、HTN、Utility AI、ReAct prompt 的设计是清晰且通用的。 |
| **接口可迁移性** | ⭐⭐⭐ （中） | 与 Router 的交互点单一；与 Mempalace/EventLog 的交互点遍布全文件，需要大量替换。 |

### 6.2 迁移路径建议

若要将 AgentCore 移植到另一引擎或项目，建议按以下优先级拆解：

1. **抽象引擎驱动层（最高优先级）**
   将所有 `_G.NpcMoveTo`、`_G.GetNpcHp`、`_G.ServerBroadcastNpcSpeech` 等全局调用收敛为一个 `NpcDriver` 接口。AgentCore 只持有 driver 引用，不再直接访问全局。

2. **拆分社会模拟子系统**
   将 Romance、Mentorship、Faction、Reputation、Economy、LifeGoal 分别拆成独立模块（如 `AgentSocial.lua`、`AgentEconomy.lua`），由 AgentCore 持有代理对象。这些子系统的代码量已具备独立价值。

3. **替换记忆与日志后端**
   定义 `IMemoryBackend` 和 `IEventLogBackend` 接口：
   - `IMemoryBackend:Add(npcId, room, note)` / `ToPrompt(npcId, n)`
   - `IEventLogBackend:Append(evt)` / `ToPromptText(n)` / `ByLocation(loc, n)`
   这样 Mempalace 和 EventLog 就可以被替换为 SQLite、Redis、向量数据库等任何实现。

4. **剥离 Ink 运行时（可选）**
   如果目标项目不需要 Ink 叙事树，可直接删除 `StartInkDialog`、`AdvanceInkDialog`、`GetInkDialogState`、`EndInkDialog` 四个函数及其调用，不影响核心 AI。

5. ** Prompt 与 LLM 解耦**
   将 `BuildStrategyPrompt`、`BuildFallbackSystemPrompt`、`RequestStrategy`、`ProcessLlmResponse` 抽成一个 `AgentLlmAdapter` 模块。这样更换模型厂商（从 DeepSeek 到 GPT-4/Claude）时只需改这一处。

6. **HTN 库独立化**
   `HTNPlanner` 已经高度自包含，仅依赖 `AgentCore.GetNpcNeeds` 和 `AgentCore.agents`。可以很容易地打包为一个通用的 Lua HTN 库。

### 6.3 不可迁移的部分

- **具体动作实现（`ExecuteStep` 中的 22 个 `if action == "..."`）**：这些代码直接映射到天道引擎的 C++ 脚本绑定。迁移时必须逐条对照新引擎的 API 重写或屏蔽。
- **感知函数调用（`GetPlayersInRange`、`GetSpeechInRange` 等）**：依赖引擎的 AOI（兴趣区域）和语音广播系统。新引擎若没有现成的五感系统，需要重新实现感知管线。

---

## 7. 关键代码量统计（估算）

| 子系统 | 大致行数 | 占比 |
|--------|---------|------|
| 核心数据仓库 + 常量枚举 | ~250 | 7% |
| FSM 状态机（18 状态） | ~900 | 26% |
| HTN 任务分解器 | ~650 | 19% |
| Utility AI | ~250 | 7% |
| 社会模拟（婚恋师徒派系声望） | ~700 | 20% |
| 感知/记忆/对话/情绪 | ~500 | 15% |
| 经济/战斗 | ~350 | 10% |
| LLM/Fallback/Tick/公共 API | ~450 | 13% |

> 注：占比之和略超 100%，因为部分功能存在交叉（如战斗中既有 FSM 也有经济/社会写入）。

---

*报告生成完毕。*
