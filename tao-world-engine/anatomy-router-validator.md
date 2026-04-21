# Router.lua & Validator.lua 解剖报告

> 分析对象：`tao-world-engine/scripts/network/tao/Router.lua`（~79 KB）与 `Validator.lua`（~109 KB）  
> 分析日期：2026-04-13

---

## 一、模块职责一句话定义

- **Router.lua**：天道引擎的 **LLM API 智能路由中枢**，负责多厂商模型选择、故障降级、玩家私有 API Key 代理、并发/速率/缓存/预算/流式/遥测的全链路 HTTP 调度。
- **Validator.lua**：天道引擎的 **状态变更防火墙（ValidateGuard）**，负责校验 NPC/玩家/世界/物品/势力/建筑等全品类状态变更与动作前置条件，通过硬锁事实、预言软锁定、时序一致性、资源充足性、世界图合法性等多层规则防止 LLM 幻觉污染游戏状态。

---

## 二、Router 公共 API + 路由策略说明

### 2.1 核心公共 API 一览

| 类别 | 函数签名 | 作用 |
|------|----------|------|
| **初始化** | `Router.InitProviderState(provider)` | 为指定厂商创建并发队列、Token Bucket 速率限制器、统计表、健康模型、批处理缓冲区等。 |
| **智能路由** | `Router.Route(taskProfile, taskType)` | 根据健康评分 + 在线学习评分，为任务选择最优 API 配置。 |
| **预算控制** | `Router.SetGlobalBudget(daily, monthly)` / `Router.SetConnectionBudget(connId, ...)` / `Router.CheckBudget(conn, model, tokens)` / `Router.ConsumeBudget(conn, model, tokens)` | 全局/连接级日度/月度 token 成本预算限制与扣减。 |
| **队列调度** | `Router.EnqueueOrExecute(job)` / `Router.ProcessQueue(provider)` / `Router.FinishRequest(provider)` | 按 provider 维度的并发队列（maxConcurrent）与主动拉取执行。 |
| **缓存** | `Router.CacheResponse(hash, response)` / `Router.GetCachedResponse(hash)` / `Router.HashPrompt(...)` | 60 秒 TTL 的响应缓存，基于 prompt 内容哈希。 |
| **上下文裁剪** | `Router.TrimMessagesByModel(model, messages)` / `Router.BuildRequestBody(model, messages, temp, stream)` | 按模型上下文限制裁剪历史消息，输出标准 OpenAI 格式 JSON 请求体。 |
| **健康/统计** | `Router.UpdateHealthModel(provider, success, latencyMs, estimatedTokens, errorCode)` / `Router.GetCompositeScore(provider)` / `Router.GetLatencyHistogram(provider)` / `Router.GetErrorBreakdown(provider)` / `Router.CompareProviders()` / `Router.GetTelemetrySnapshot()` | 细粒度健康评分、延迟直方图、错误码分类、provider 对比、遥测快照。 |
| **在线学习** | `Router.Learn(taskType, provider, success, latencyMs, estimatedTokens)` / `Router.GetLearningScore(taskType, provider)` / `Router.GetLearningTable()` | 按任务类型记录 EWMA 成功率/延迟/token 效率，用于路由加权。 |
| **批处理** | `Router.FlushBatch(provider)` | 将缓冲区内适合合并的短请求打包成一个多问题请求批量发送。 |
| **玩家 Key** | `Router.SetPlayerKey(conn, encryptedKey)` / `Router.SetPlayerProviderKey(conn, provider, encryptedKey)` / `Router.GetPlayerKey(conn, provider)` / `Router.HasPlayerKey(conn, provider)` / `Router.GetPlayerKeyList(conn, provider)` / `Router.ClearPlayerKey(conn)` | 玩家私有 API Key 的 RSA 解密（若环境支持）、多 Key 轮询、断线即焚。 |
| **WebSocket** | `Router.WSConnect(url, headers, ...)` / `Router.WSSend(wsId, data)` / `Router.WSClose(wsId)` / `Router.WSGetState(wsId)` / `Router.CleanupWebSockets()` | WebSocket 连接池（原生支持 + 模拟回退）。 |
| **流式调用** | `Router.StreamCall(messages, taskProfile, connection, onChunk, onDone)` / `Router.HandleStreamPoll(streamId, connection)` / `Router.CleanupStreams()` | 模拟流式（完整响应拆 chunk）+ 客户端轮询机制。 |
| **便捷封装** | `TaoCall(messages, taskProfile, onSuccess, onError)` | 公共池一键调用，若返回不含 JSON 则兜底。 |
| **便捷封装** | `TaoCallWithPlayerFallback(messages, taskProfile, connection, onSuccess)` | 先尝试玩家私有 Key，失败后再 fallback 到公共池。 |
| **清理** | `Router.CleanupConnection(connection)` | 断线时取消该连接所有活跃请求与流式会话。 |

### 2.2 智能路由策略详解

1. **默认 API 池（`TAO_API_POOL`）**
   - `deepseek_reasoner`：`deepseek-reasoner`，高质低频，负责世界推衍、势力战争、主线分叉。
   - `deepseek_chat`：`deepseek-chat`，平衡主力，负责 NPC 策略规划、动态事件分支、逻辑推理。
   - `doubao`：`doubao-pro-32k`，中文优化，负责 NPC 对话、任务文本、lore 生成、文本润色。
   - `kimi`：`moonshot-v1-8k`，最便宜，主模型故障时兜底。

2. **评分体系**
   - **健康评分（`compositeScore`，0~1）**：
     - latencyScore（40%）：参考延迟 5000ms，越低分越高。
     - successRate（40%）：100 次滑动窗口成功率。
     - efficiencyScore（20%）：token/ms，参考值 0.1。
   - **学习评分（`learningScore`，0~1）**：同维度的 EWMA，按 `taskType`（如 `world_derivation`、`npc_dialogue`）统计；样本不足 5 时返回中性 0.5。
   - **最终评分**：`finalScore = healthScore * 0.7 + learnScore * 0.3`。

3. **选择逻辑（`Router.Route`）**
   - 只从 `not health.isDown` 的存活 provider 中候选。
   - 按 `finalScore` 降序排序。
   - **确定性保持**：若主选（`taskProfile` 对应配置）在前 3 名内，仍强制使用主选，避免过度震荡；否则切到评分最高的候选。

4. **上下文裁剪策略**
   - 按 `MODEL_CONTEXT_LIMITS`（如 doubao-pro-32k 为 28000 字符）进行裁剪。
   - **优先保留 system 消息 + 末尾的 user/assistant 消息**，旧的非 system 消息从头部丢弃。

---

## 三、Validator 公共 API + 校验规则说明

### 3.1 核心公共 API 一览

| 类别 | 函数签名 | 作用 |
|------|----------|------|
| **世界图** | `Validator.RegisterWorldNode(loc, def, layer)` / `Validator.ConnectWorldNodes(a, b, cost, layer)` / `Validator.IsValidLocation(loc, layer)` / `Validator.HasValidPath(from, to, maxDepth, layer)` / `Validator.IsValidCrossLayerPortal(fromLoc, toLoc, fromLayer, toLayer)` | 支持 surface/underground/sky 三图层，BFS 路径校验，跨层传送点校验。 |
| **硬锁/软锁** | `Validator.SetHardLock(category, id, value)` / `Validator.IsHardLocked(category, id)` / `Validator.ClearHardLock(category, id)` | 硬锁事实（不可死亡、位置不可变、时间线锚点等）。 |
| | `Validator.RegisterSoftLock(lockType, id, lockData)` / `Validator.IsSoftLocked(lockType, id)` / `Validator.ClearSoftLock(lockType, id)` / `Validator.CheckSoftLockConflict(c)` | 预言软锁定（未来死亡、未来战争、未来选举等），允许提前拒绝矛盾变更。 |
| **审计日志** | `Validator.CreateAuditEntry(...)` / `Validator.GetRecentAudits(count, filterCategory)` / `Validator.ClearAuditLog()` / `Validator.ExportAudits(format)` | 每条校验/拒绝行为自动写入审计日志，上限 10000 条。 |
| **单条/批量状态变更校验** | `Validator.ValidateSingleChange(c)` / `Validator.ValidateChanges(changes)` / `Validator.BatchValidateChanges(changes)` | `FIELD_RULES` 值域校验 + `_ValidateByTargetType` 细分逻辑 + 时序/软锁校验。 |
| **批量快速校验** | `Validator.BatchValidate(npcId, changes)` | 高频 tick 专用，返回通过数量与详情数组。 |
| **动作前置条件** | `Validator.CheckPrecondition(npcId, action)` / `Validator.ValidateAction(npcId, action)` | 检查动作结构完整、必填字段、状态距离资源等可行性。 |
| **资源校验** | `Validator.ValidateResources(npcId, action)` | 在 precondition 基础上进一步检查金币/物品/背包/声望/钥匙等是否真实持有。 |
| **时序一致性** | `Validator.ValidateTimeline(changes)` / `Validator._CheckTimelineSingle(c)` | 防止已死复活、季节逆序、节日开始日晚于结束日、已结束拍卖重新激活等。 |
| **冲突检测与消解** | `Validator.FindConflicts(changes)` / `Validator.ResolveConflicts(changes)` | 检测同一 target+field 的重复定义，支持 `sum`/`max`/`min`/`concat`/`append_array` 合并策略，默认按来源优先级 + 时间戳覆盖。 |
| **计划校验** | `Validator.ValidatePlan(npcId, plan)` | 逐条校验计划步骤的 precondition + resource + timeline，过滤非法步骤，返回合法子计划。 |
| **区域/地点** | `Validator.ValidateRegion(regionData)` / `Validator.ValidateLocation(locName, fromLoc, layer)` | 区域基本数据与世界图路径双重校验。 |
| **周期性事件** | `Validator.IsFestivalDay(dayNumber, festivalName)` / `Validator.DayToSeason(dayNumber)` / `Validator.ValidateFestivalEvent(eventData)` / `Validator.ValidatePeriodicTrigger(triggerData, currentDay)` | 季节推算（每 90 天一个季节）、节日重叠校验、周期触发器。 |
| **快速辅助** | `Validator.ValidatePlayerOnline(pid)` / `Validator.ValidateGoldTransfer(...)` / `Validator.ValidateItemTransfer(...)` / `Validator.ValidateNpcState(...)` / `Validator.ValidateCrossLayerMove(...)` / `Validator.ValidateGuildPermission(...)` / `Validator.ValidateMailReadable(...)` / `Validator.ValidateBidIncrement(...)` / `Validator.ValidateDungeonPartySize(...)` / `Validator.ValidateAchievementUnlock(...)` | 针对常见高频操作的快速校验入口。 |

### 3.2 校验规则分层说明

Validator 的防御体系共分为 **7 层**，任何一层不通过都会拒绝变更并写入审计日志：

#### 层 1：字段规则（`FIELD_RULES`）
- 按 `target_type`（`npc`/`player`/`world`/`item`/`faction`/`region`/`romance`/`mentor`/`faction_war`/`region_event`/`guild`/`auction`/`mail`/`vote`/`build`）定义每个合法字段的 `type`/`min`/`max`/`minLen`/`maxLen`/`enum`。
- 例：`npc.hp` 必须在 `[0, 999999999]`；`world.season` 只能是 `spring/summer/autumn/winter`。

#### 层 2：细分目标类型校验（`_ValidateXxxChange`）
- **数值范围**：如 `relationship` ∈ `[-100, 100]`，`gold` 不能为负数。
- **硬锁拦截**：
  - `immortalNpcs`：该 NPC 不能被设为死亡或 HP ≤ 0。
  - `fixedLocations`：该 NPC 位置不可变更。
  - `confirmedDeaths`：已死亡 NPC 不能移动、升级、变更状态（除了保持 dead）。
  - `confirmedRomances`：已锁定婚姻的 NPC/玩家不能再婚。
  - `confirmedPolitics`：政治锁定的师徒关系不可变更。
  - `confirmedBuilds`：已确认建筑不可变更核心属性。
- **世界图存在性**：`location` 变更必须存在于对应图层的世界图中。
- **外部实体存在性**：如 `GuildExists`、`NPCExists`（若全局函数存在）。
- **等级约束**：师傅等级必须 ≥ `minLevelForMentor`（默认 50），进入副本等级必须 ≥ `minLevelForDungeon`（默认 10）。

#### 层 3：动作前置条件（`ACTION_PRECONDITIONS` + `CheckPrecondition`）
- **结构检查**：动作必须含必填字段（如 `move_to` 必须有 `target`）。
- **状态约束**：死亡 NPC 不能移动、说话、交易、战斗、摆摊、采集、建造、拜师。
- **距离约束**：交易 ≤ 300，说话 ≤ 500，战斗 ≤ 800，师徒 ≤ 500，婚恋 ≤ 300，建造 ≤ 600。
- **在线与存在**：交易/组队目标玩家必须在线；战斗/嘲讽/求婚目标必须存在且未死亡。
- **友方保护**：不能攻击友方目标（同 faction 或 relationship > 30）。
- **技能与蓝量**：施法需要 `mana_cost` 足够，且蓝量百分比 ≥ `minManaPercentForCast`（5%），技能不能在冷却中。
- **疲劳与背包**：采集时疲劳 ≤ `maxFatigueForGather`（90）；交易时对方背包必须有足够空位。
- **金币检查**：贿赂、拍卖出价、捐献、分手补偿等必须有足够金币。

#### 层 4：资源校验（`ValidateResources`）
- 更细化的资源可行性检查，覆盖：交易、组队、贿赂、制造、建造、求婚、接受求婚、分手、拜师、出师、公会捐献、投票、战争动员、拍卖发布、拍卖竞拍、邮件发送、副本进入、成就领取。
- 例：制造时检查 `NpcHasItem` 是否持有配方材料，且背包有足够空间接收产物；拍卖发布时检查 `NpcHasItem` 持有该物品。

#### 层 5：时序一致性（`ValidateTimeline`）
- 防止 LLM 产生“时间倒流”幻觉：
  - 已确认死亡不能再出生。
  - 季节必须按 `春→夏→秋→冬` 顺序推进。
  - 节日开始日不能晚于结束日；战争结束日不能早于开始日。
  - 已读邮件不能变未读；已结束拍卖不能重新激活。
  - 已完成的建筑不能再回退进度。
  - 时间线锚点（`timelineAnchors`）不可修改；已确认事件（`confirmedEvents`）不可修改。

#### 层 6：预言软锁定（`SoftLock`）
- 允许策划/剧情系统提前注册“未来必须发生/不能违背”的剧情锚点：
  - `futureDeaths`：预言死亡的 NPC 不可恢复生命或变更为非死亡状态。
  - `futureEvents`：预言的事件类型不可改变。
  - `futureWars`：预言战争的宣战方和战争目标不可改变。
  - `futureElections`：选举已被锁定。
  - `futureFestivals`：区域节日已被锁定，不可取消。

#### 层 7：冲突检测与消解（`FindConflicts` / `ResolveConflicts`）
- 检测同一 `target_type:target:field` 的重复定义。
- 支持 `merge_strategy`：
  - `sum` / `max` / `min`：数值聚合。
  - `concat`：字符串拼接。
  - `append_array`：表合并。
  - 默认：**来源优先级**（`hard_lock > player > npc > system > 其他`）+ 时间戳最新胜。
- 消解后还会再次跑 `ValidateTimeline`，不通过的变更被过滤掉。

---

## 四、故障降级与重试机制

### 4.1 Router 层面的降级与重试

| 机制 | 参数/行为 | 说明 |
|------|-----------|------|
| **基础健康熔断** | `HEALTH_FAILURE_THRESHOLD = 3`，`HEALTH_COOLDOWN_SECONDS = 60` | 连续失败 3 次后标记 `isDown = true`，60 秒冷却期满后自动恢复。 |
| **指数退避重试** | `RETRY_MAX_ATTEMPTS = 3`，`RETRY_BASE_DELAY_MS = 500`，`RETRY_MAX_DELAY_MS = 8000`，`RETRY_JITTER_RATIO = 0.25` | 延迟 = `500 * 2^attempt` ms，带 ±25% jitter，上限 8s。 |
| **重试动态重路由** | `HandleJobRetry` | 每次重试都会重新调用 `Router.Route()`，可能把请求切到另一个更健康的 provider。 |
| **预算超限保护** | `CheckBudget` 拒绝 | 若全局/连接日度或月度预算超限，立即拒绝不进入队列。 |
| **队列溢出保护** | `MAX_QUEUE_LENGTH = 100` | 队列超过 100 时，最早的请求被丢弃并回调 `onError`。 |
| **HTTP 异常兜底** | `TaoCall` | 若响应不含 `{` 或 `[`，强制返回兜底 JSON：`{"action":"speak","content":"天道响应异常，正在切换备用通道。"}`。 |
| **玩家 Key Fallback** | `TaoCallWithPlayerFallback` | 玩家私有 Key 调用失败后，自动回退到公共 API 池。 |

### 4.2 Validator 层面的降级

- Validator 内部大量使用了“**防御性回退**”：所有对 `_G` 全局查询函数的调用都包装在局部 lambda 中，若函数不存在则返回**最宽容的默认值**。例如：
  - `GetNpcGold` 不存在 → 返回 `0`（若校验需金币可能失败，但不会崩溃）。
  - `GetDistanceToPlayer` 不存在 → 返回 `true`（跳过距离检查，不阻塞）。
  - `PlayerOnline` 不存在 → 视为在线。
- 这意味着 **Validator 可以在没有完整游戏运行时“软着陆”**：大部分检查仍然有效（字段规则、硬锁、时序、软锁），而依赖运行时的检查（距离、在线、物品持有）会自然放宽。

---

## 五、外部 API Key / 配置依赖

### 5.1 Router 依赖

| 依赖项 | 类型 | 说明 |
|--------|------|------|
| `TAO_API_POOL` | 全局表（可覆盖） | 默认配置了 DeepSeek、豆包、Kimi 的 URL、模型、并发、RPM。 |
| `API_KEYS` | 全局表 | 厂商公共 Key 池，如 `API_KEYS.deepseek = "sk-xxx"`。 |
| `TAO_REMOTE_EVENTS` | 全局常量 | 网络事件枚举（`S2C_API_KEY_ACCEPTED`、`S2C_STREAM_CHUNK` 等），用于向客户端发送 Key 确认/流式数据。 |
| `SimpleEncode` | 全局函数 | JSON 编码函数（UrhoX 风格）。 |
| `GetSystemTime` / `os.clock` | 全局函数 | 获取当前时间，优先引擎实现，否则 Lua 标准库。 |
| `RSADecrypt` + `SERVER_PRIVATE_KEY` | 可选全局 | 若存在，则对玩家上传的 Key 进行 RSA 解密；否则明文处理。 |
| **UrhoX 网络层** | 引擎 API | `network:MakeHttpRequest()` / `network:CreateHTTP()`、`HTTP_POST`、`http:SetUrl`/`AddHeader`/`SetPostData`/`Send`、`SubscribeToEvent(http, "RequestFinished", callback)`、`Delay(seconds, callback)`。 |
| `Utf8Length` / `Utf8Truncate` | 可选全局 | UTF-8 字符串长度与截断，否则退化为字节操作。 |

### 5.2 Validator 依赖

Validator 主要依赖 **`_G` 上的大量游戏状态查询函数**。关键函数列表如下（若不存在则使用内部回退默认值）：

- **实体存在**：`NPCExists`、`PlayerOnline`
- **状态查询**：`GetNpcState`、`GetPlayerLevel`、`GetNpcLevel`、`GetNpcFaction`、`GetNpcRelationship`、`GetNpcPoliticalStance`、`GetNpcRomanceCount`、`GetNpcMentorCount`、`GetNpcApprenticeCount`、`GetNpcMentor`
- **资源/经济**：`GetNpcGold`、`GetPlayerGold`、`NpcHasItem`、`PlayerHasItem`、`GetNpcBackpackFreeSlots`、`GetPlayerBackpackFreeSlots`
- **战斗/技能**：`GetNpcMp`、`GetNpcMaxMp`、`IsSpellOnCooldown`、`GetNpcFatigue`
- **空间/距离**：`GetDistanceToPlayer`、`GetDistanceToNpc`、`GetDistanceToLocation`、`ResourceNodeExists`
- **副本/队伍**：`DungeonAvailable`、`GetPlayerDungeonPrestige`、`GetDungeonPrestigeReq`、`GetPartySize`、`GetPartyMaxSize`、`GetNpcPartySize`、`GetNpcPartyMaxSize`、`GetPlayerDungeonKeyCount`
- **公会/势力**：`GuildExists`、`GetGuildLeader`、`GetPlayerGuild`、`GetGuildWealth`、`GetGuildMemberCount`、`GetFactionManpower`、`GetFactionMaxManpower`、`GetFactionResource`、`GetNpcInfluence`
- **拍卖/邮件/建筑**：`GetAuctionStatus`、`GetAuctionCurrentBid`、`GetMailAttachmentCount`、`GetMailRecipient`、`MailExists`、`IsMailRead`、`GetBuildProgress`、`GetBuildSkillReq`、`GetNpcBuildSkill`
- **配方/蓝图**：`RecipeExists`、`GetRecipeMaterials`、`GetRecipeResultCount`、`GetRecipeBatchLimit`、`BlueprintExists`
- **成就/事件/季节**：`HasAchievementUnlocked`、`HasClaimedAchievementReward`、`GetCurrentSeason`、`IsRegionEventActive`、`GetRegionEventEndDay`、`GetWarStartDay`、`GetFestivalRange`
- **日志**：`EventLog.Append`

---

## 六、可迁移性评估

### 6.1 Router.lua 可迁移性：★★★☆☆（中等偏上）

- **纯 Lua 的核心逻辑占比高**：路由评分、预算控制、在线学习、缓存、队列调度、健康模型、遥测等均为纯表操作，迁移成本低。
- **强耦合点**：
  1. **HTTP 执行层**：`ExecuteHttpJob` 和 `FlushBatch` 深度依赖 UrhoX 的 `network:MakeHttpRequest` / `SubscribeToEvent` 事件模型。迁移到新引擎时必须重写约 150 行带有引擎回调的 HTTP 发送代码。
  2. **Delay 函数**：批处理窗口、指数退避重试都依赖 `_G.Delay`；若缺失则退化为立即执行（功能降级）。
  3. **网络事件**：向客户端发送 Key 确认/流式 chunk 依赖 `connection:SendRemoteEvent` 和 `TAO_REMOTE_EVENTS`。
- **已做的兼容性设计**：
  - WebSocket 提供了“原生支持 / 纯 Lua 模拟”双模式，已降低了对引擎原生 WebSocket 的强依赖。
  - 流式调用在引擎不支持 SSE/WebSocket 时，采用“完整响应拆 chunk + 客户端轮询”的降级方案。
- **迁移建议**：把 HTTP 请求与事件订阅抽象成可注入的 `HttpClient` 接口，即可完全解耦。

### 6.2 Validator.lua 可迁移性：★★★★☆（较高）

- **几乎纯 Lua**：除 `_G` 查询函数外，无引擎专属 API 调用。
- **防御性回退设计极佳**：所有游戏运行时查询函数都被局部 lambda 包装，并给出了合理的默认值（如距离函数缺失时返回 `true`，背包函数缺失时返回最大容量）。这意味着：
  - 在新项目早期没有完整的经济/社交/战斗系统时，Validator 仍能对字段规则、硬锁、时序、软锁进行严格校验，而对暂时不存在的系统自然放宽。
- **世界图完全自包含**：`worldGraph` 是模块内的 Lua 表，注册和校验不依赖外部文件或引擎导航网格。
- **迁移建议**：
  - 只需在新引擎中逐步注册对应的全局查询函数（如 `NPCExists`、`GetNpcGold`），Validator 的校验能力就会随项目成长自动增强。
  - `FIELD_RULES` 和 `ACTION_PRECONDITIONS` 结构清晰，扩展新 target_type 或新动作类型非常方便。

---

## 七、总结

- **Router** 是一座“带智能大脑的交通枢纽”：不仅会把 LLM 请求分发到 DeepSeek / 豆包 / Kimi，还会根据历史成功率、延迟、token 效率自动换线；同时为玩家提供了“自带 API Key”的隐私通道，以及预算、缓存、批处理、遥测等生产级设施。
- **Validator** 是一道“多层纵深防御工事”：从最基础的字段类型检查，到硬锁事实、动作可行性、资源充足性、时序一致性、预言软锁定、冲突消解，层层拦截 LLM 的幻觉输出；并且它对引擎的依赖极其松散，几乎可以做到“即插即用”。
