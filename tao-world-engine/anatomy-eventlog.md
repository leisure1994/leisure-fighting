# EventLog.lua 解剖报告

> 文件：`scripts/network/tao/EventLog.lua`  
> 规模：约 81 KB / 2,186 行  
> 版本：生产级扩展版

---

## 1. 模块职责一句话定义

**EventLog 是天道引擎的事件溯源基础设施：负责以时间轴为主线、分支与因果链为骨架，记录世界推衍的全量事件日志，并提供追加、查询、回放、持久化、统计分析与 Prompt 组装能力。**

---

## 2. 公共 API 清单

API 按功能域划分为 9 组。所有函数均挂载在全局表 `EventLog` 上。

| 功能域 | 函数名 | 职责简述 |
|--------|--------|----------|
| **核心追加与查询** | `Append(entry)` | 追加单条事件；自动补全 `id/t/branch_id/cause_id/effect_ids/actors/data` |
| | `Recent(n, filterType, branchId)` | 取最近 N 条（支持类型/分支过滤） |
| | `ByActor(actorId, n, branchId)` | 按主 actor / target / actors 列表关联查询 |
| | `ByLocation(loc, n, branchId)` | 按地点查询 |
| **高级查询** | `ByTimeRange(tMin, tMax, branchId)` | 时间区间查询；**自动合并内存 + SQLite 结果并去重** |
| | `ByActors(actorIds, n, branchId)` | 多 actor OR 查询 |
| | `ByLocations(locs, n, branchId)` | 多地点 OR 查询 |
| | `CombinedQuery(params)` | 组合过滤（actors OR + locs OR + types OR + 时间范围 AND） |
| | `FindById(eventId, branchId)` | 先内存后磁盘按 UUID 查找 |
| **因果链追踪** | `LinkEvents(causeId, effectId)` | 手动建立双向因果关联 |
| | `TraceCauses(eventId, depth)` | 向上回溯原因链 |
| | `TraceEffects(eventId, depth)` | 向下追踪影响链（BFS） |
| | `GetCauseTree(eventId, depth)` | 获取双向因果树 `{center, causes, effects}` |
| **时间线分支** | `CreateBranch(branchId, parentBranch, desc)` | 注册新分支（默认父分支为 `main`） |
| | `GetBranches()` | 列出所有分支元信息 |
| | `MergeBranch(sourceBranch, targetBranch)` | 将源分支事件合并到目标分支（含 SQLite UPDATE） |
| | `PruneBranch(branchId, fromDisk)` | 删除某分支下全部事件（内存 + SQLite） |
| **图查询** | `QueryGraph(centerActor, depth, branchId)` | 以 actor 为中心的参与事件子图（节点+边） |
| | `BuildActorGraph(actorId, depth, branchId)` | 基于共同事件构建 actor 关系网络 |
| **统计摘要** | `GetWorldSummary(days, branchId)` | 世界活跃度统计（类型、地点、actor、小时分布） |
| | `GetActorSummary(actorId, days, branchId)` | 单 actor 行为摘要 |
| | `GetLocationSummary(loc, days, branchId)` | 单地点事件摘要 |
| **Prompt 组装** | `ToPromptText(n, branchId)` | 输出简洁时间线文本供 LLM Prompt 使用 |
| | `ToPromptTextWithCauses(n, causeDepth, branchId)` | 带因果链的 Prompt 文本 |
| **持久化管理** | `FlushToDisk(n)` | 将内存中最老 N 条刷入 SQLite |
| | `LoadRange(tMin, tMax, branchId)` | 从 SQLite 加载指定时间区间事件 |
| | `ArchiveOld(days, branchId)` | 将超过 N 天的事件移入归档表 `event_log_archive` |
| | `PurgeOld(days, branchId)` | 永久删除超期事件（内存 + 主表 + 归档表） |
| | `CountEntries(branchId)` | 统计内存 + 磁盘总条数 |
| | `Dump(n, branchId)` | 导出纯文本调试日志 |
| | `RebuildLinksFromDisk()` | 重启后从磁盘恢复内存中事件的 `cause_id` |
| **高级分析**<br>（原 AgentCore 移入） | `ClusterEvents(timeWindow, branchId)` | 基于时间+地点聚类 |
| | `GetHotClusters(n, timeWindow, branchId)` | 取最活跃聚类 Top N |
| | `MineBehaviorPatterns(actorId, nGramSize, branchId)` | N-gram 行为序列挖掘 |
| | `GetTopBehaviorPatterns(...)` | 最常见行为模式 Top N |
| | `AnalyzeFactionNetwork(branchId)` | 派系社会网络近似推断（注释说明需要 `AgentCore.factions`） |
| | `AnalyzeEconomicTrends(days, branchId)` | 生产/消费/投资趋势 |
| | `AnalyzeCombatStats(days, branchId)` | 战斗统计与热点 |
| | `AnalyzeDialogSentiment(actorId, days, branchId)` | 对话情绪分析（简单关键词规则） |
| | `PredictNextEvents(actorId, branchId)` | 基于 2-gram 预测下一事件类型 |
| | `DetectAnomalies(actorId, branchId)` | 异常行为检测（ burst / 异常地点 / 罕见类型） |
| | `GetActorConsistencyScore(actorId, branchId)` | 行为一致性评分（熵近似） |
| | `GetLocationRiskRating(loc, days, branchId)` | 地点风险评级 |
| | `ExtrapolateTrend(data, futureTime)` | 线性趋势外推 |
| | `TimeSeriesAggregate(params)` | 按天/小时粒度的时间序列聚合 |
| | `CrossAnalysis(params)` | actor × location × type 多维度交叉分析 |
| | `CalculateEventImpact(eventId)` | 单条事件影响力得分（0~100） |
| | `TrackNpcLifecycle(npcId)` | NPC 全生命周期追踪 |
| | `GetWorldMood(days, branchId)` | 世界整体情绪倾向 |
| | `GetFactionRivalries(branchId)` | 派系敌对强度表 |
| | `GetWealthDistribution(days, branchId)` | 财富分布 + 基尼系数估算 |
| | `GetEventVelocity(...)` | 事件发生率（事件/小时） |
| | `GetSuspiciousActors(n, days, branchId)` | 基于异常聚合的可疑人物列表 |
| | `BuildLocationHeatmap(...)` | 地点热度图数据 |
| | `CompareActors(actorA, actorB, days, branchId)` | 两 actor 特征对比 |
| | `GetEventPeakHours(...)` | 事件高峰时段 |
| | `SummarizeBranchDiff(branchA, branchB, days)` | 两分支事件差异对比 |
| | `GetInfluentialActors(...)` | 影响力最高 actor Top N |
| | `GetRelationshipDynamics(...)` | 两 actor 关系动力学时间线 |
| | `GetNarrativeArc(actorId, days, branchId)` | 为 actor 生成叙事五段式弧线 |

---

## 3. 事件结构定义

在 `EventLog.Append(entry)` 中，事件表会被规范化。一个完整的事件对象包含以下字段：

```lua
{
  id           = string,   -- UUID（自动生成）
  t            = number,   -- 时间戳（秒，默认 GetWorldTime()）
  type         = string,   -- 事件类型（如 "combat", "economy_produce"）
  actor        = string,   -- 主触发者（可选）
  target       = string,   -- 作用目标（可选）
  loc          = string,   -- 发生地点（可选）
  desc         = string,   -- 文本描述（调用方至少应提供）
  branch_id    = string,   -- 时间线分支，默认 "main"
  cause_id     = string,   -- 原因事件 UUID，默认 ""
  effect_ids   = {string}, -- 后续影响事件 UUID 列表，默认 {}
  actors       = {string}, -- 多 actor 列表（兼容群体事件），默认 {}
  data         = table     -- 冗余保留原始 entry 的引用，用于兼容与扩展字段存放
}
```

**设计要点**
- `cause_id` / `effect_ids` 构成**显式因果链**，而非仅靠时间顺序隐式推断。
- `branch_id` 支持**多时间线/平行世界**的事件隔离与合并。
- `data` 字段允许调用方存放任意业务负载（如 `value`, `weapon`, `factionId`），使 EventLog 不对业务模型做强约束。

---

## 4. 溯源与回放流程图（文字版）

### 4.1 事件写入流程

```
调用方生成业务事件
       │
       ▼
EventLog.Append(entry)
       │
       ├─ 自动补全字段 (id, t, branch_id, cause_id, effect_ids, actors, data)
       │
       ▼
  插入 EventLog.entries（内存队列尾部）
       │
       ├─ 若 #entries > maxMemoryEntries (10000)
       │   └── EventLog.FlushToDisk(flushBatchSize=2000)
       │       ├─ SimpleEncode(entry) → JSON
       │       ├─ sqlite3 INSERT OR REPLACE INTO event_log(...)
       │       └─ 从内存头部移除已刷盘条目
       │
       ▼
   可选：TAO_DEBUG 输出日志
```

### 4.2 事件回放（查询）流程

以 `ByTimeRange` 为例（这是跨内存与磁盘回放的典型入口）：

```
调用方请求时间区间 [tMin, tMax]
       │
       ▼
EventLog.ByTimeRange(tMin, tMax, branchId)
       │
       ├─ 遍历 EventLog.entries（内存）
       │   └─ 匹配 branch_id & 时间范围 → 放入结果集 A
       │
       ├─ 若 sqlite3 可用
       │   └─ EventLog.LoadRange(tMin, tMax, branchId)
       │       ├─ SELECT * FROM event_log WHERE t >= ? AND t <= ?
       │       ├─ SimpleDecode(row.data) → Lua table
       │       └─ 结果集 B
       │
       ├─ 合并 A + B
       ├─ 按 id 去重（内存条目覆盖磁盘条目）
       └─ 按 t ASC 排序后返回
```

### 4.3 因果链重建流程

```
服务器重启 / 冷启动
       │
       ▼
EventLog.RebuildLinksFromDisk()
       │
       ├─ SELECT id, cause_id FROM event_log WHERE cause_id != ''
       ├─ 遍历内存中的 EventLog.entries
       │   └─ 若内存条目 id 匹配磁盘 cause_id 记录，则恢复 e.cause_id
       └─ 返回修复链接数
```

### 4.4 关于"快照"

**重要结论：EventLog.lua 本身不包含状态快照（Snapshot）机制。**

该模块的"回放"粒度是**事件级重放**（将历史事件重新读取并交由上层消费），而非**状态快照恢复**。如果系统需要基于 EventLog 重建某个子系统（如 AgentCore 或 Mempalace）的完整状态，标准做法是：

1. 由消费者（Mempalace / AgentCore）调用 `ByTimeRange(0, now)` 或 `LoadRange(...)` 拉取全部历史事件；
2. 消费者在本地按顺序应用每一条事件，逐步重建自己的内部状态表；
3. 若需要提升启动速度，消费者需自行实现周期性状态快照（如将重建后的状态表序列化到文件），EventLog 只负责提供原始事件流。

---

## 5. 持久化策略（sqlite / 文件 / 内存）

### 5.1 三层存储架构

| 层级 | 载体 | 容量策略 | 生命周期 |
|------|------|----------|----------|
| **内存热数据** | `EventLog.entries`（Lua 表，尾部追加） | 上限 `maxMemoryEntries = 10000` 条；溢出时自动刷盘最老 `flushBatchSize = 2000` 条 | 进程存活期间 |
| **磁盘主库** | SQLite 文件 `tao_world.db`，表 `event_log` | 长期保留；可通过 `ArchiveOld/PurgeOld` 定期清理 | 持久文件 |
| **磁盘归档** | SQLite 同文件，表 `event_log_archive` | 由 `ArchiveOld` 将超过阈值天数的事件从主表移入 | 持久文件，可被 `PurgeOld` 删除 |

### 5.2 数据库 Schema

```sql
CREATE TABLE IF NOT EXISTS event_log (
    id TEXT PRIMARY KEY,
    t INTEGER,
    type TEXT,
    actor TEXT,
    target TEXT,
    loc TEXT,
    branch_id TEXT,
    cause_id TEXT,
    data TEXT          -- 完整事件的 JSON 文本
);
CREATE INDEX idx_event_t       ON event_log(t);
CREATE INDEX idx_event_actor   ON event_log(actor);
CREATE INDEX idx_event_type    ON event_log(type);
CREATE INDEX idx_event_branch  ON event_log(branch_id);
CREATE INDEX idx_event_cause   ON event_log(cause_id);
```

归档表 `event_log_archive` 字段与主表完全一致，无额外索引定义（代码里未创建）。

### 5.3 序列化/反序列化

- **序列化**：`SimpleEncode(entry)`（定义在 `scripts/network/Shared.lua:1072`）将 Lua 表编码为 JSON 字符串，存入 `data` 列。
- **反序列化**：`SimpleDecode(row.data)`（定义在 `scripts/network/Shared.lua:1130`）将 JSON 还原为 Lua 表；若解码失败，则降级为直接用行数据组装基础字段。
- 其他列（`id/t/type/actor/...`）作为冗余提取字段，便于直接 SQL 查询与索引过滤，减少不必要的 JSON 解码开销。

### 5.4 运维接口

- **`FlushToDisk(n)`**：手动将内存中最老 N 条强制落盘。
- **`ArchiveOld(days)`**：将超过 N 天的旧事件移入归档表，释放主表查询压力。
- **`PurgeOld(days)`**：彻底清除超期事件（内存、主表、归档表三重清理）。
- **`RebuildLinksFromDisk()`**：冷启动后重建内存事件的因果链接。

---

## 6. 与其他子系统的耦合分析

### 6.1 与 AgentCore 的关系

**耦合点 1：历史代码迁移**
- 文件注释明确说明：大量高级分析函数是**从 AgentCore 移入并扩展**的（`高级分析模块（从 AgentCore 移入并扩展）`）。这意味着 EventLog 曾经作为 AgentCore 的子模块存在，后来被提升为独立的基础设施层，从而导致 AgentCore 的分析能力被**下放到 EventLog**。

**耦合点 2：运行时数据依赖**
- `AnalyzeFactionNetwork` 的注释中提到："需要 AgentCore.factions 数据，这里通过事件推断近似派系关系"。虽然函数实现上尝试仅依赖 `event.data.factionId` 进行推断，但注释暴露了设计上的耦合意图——在拥有 AgentCore  factions 数据时，分析结果会更准确。

**耦合点 3：事件驱动状态更新**
- AgentCore 是主要的**事件生产者**：NPC 的出生、死亡、战斗、对话、经济行为等都会通过 `EventLog.Append()` 写入日志。
- AgentCore 同时也是**事件消费者**：通过 `Recent`、`ByActor`、`ToPromptText` 读取近期事件，用于生成 LLM Prompt 或更新 NPC 行为状态。

### 6.2 与 Mempalace 的关系

- **无直接代码层面的 import 或函数调用**。EventLog.lua 中没有任何对 `Mempalace` 的显式引用。
- **间接耦合通过 `_G.WorldTime` 和时间语义**：`GetWorldTime()` 优先读取全局 `_G.WorldTime`，这与 Mempalace 所在的世界时间系统共享同一时钟源。
- **逻辑耦合**：Mempalace（空间化记忆宫殿）需要记录"谁在哪里做了什么"。如果 Mempalace 要追踪空间-时间事件，它会通过 `EventLog.Append({actor=npcId, loc=roomId, type="mempalace_move", ...})` 写入事件；再通过 `ByLocation`、`QueryGraph` 等接口回放，以重建某地点的历史状态。EventLog 提供的是**公共事件总线**角色。

### 6.3 依赖的外部全局

| 全局/外部符号 | 来源 | 用途 | 耦合强度 |
|---------------|------|------|----------|
| `sqlite3` | LuaSQLite3（外置 C 库） | SQLite 打开/查询/写入 | **强**（无则大量功能失效） |
| `SimpleEncode` / `SimpleDecode` | `scripts/network/Shared.lua` | 事件序列化 | **强** |
| `_G.WorldTime` | 外部世界时间管理 | 时间戳生成 | 中 |
| `TAO_DEBUG` | 外部调试开关 | 调试输出 | 弱 |
| `GenerateUUID` | 本文件内定义 | UUID 生成 | 无（自包含） |

**结论**：EventLog 是一个**被动基础设施层**——它不主动调用 AgentCore 或 Mempalace，而是作为它们的**事件总线 + 历史数据库**。上游系统通过 `Append` 写入，通过各类 `Query/Recent/ToPromptText` 读出并自行更新状态。

---

## 7. 可迁移性评估

### 7.1 优势（迁移友好）

1. **纯 Lua 实现**：不含 UrhoX 引擎特有的 API（如 `Network`、`Scene`、`Node`），对运行时环境要求低。
2. **逻辑自包含**：除 `SimpleEncode/Decode` 和 `sqlite3` 外，所有核心逻辑（UUID、深拷贝、查询算法）均在本文件内完成。
3. **单一入口表**：所有 API 挂载于 `EventLog` 一张表上，便于封装为 Lua 模块或 Class 实例。
4. **分析函数丰富**：移入的 AgentCore 分析模块（情绪、战斗、经济、派系等）已经事件化，迁移后可直接用于 Prompt 生成或数据报表。

### 7.2 需适配点

| 适配项 | 说明 | 建议方案 |
|--------|------|----------|
| **SQLite 库** | 依赖全局 `sqlite3`（lsqlite3） | OpenClaw Skill 环境中需确认是否内置；若未内置，需引入 LuaRocks 的 `lsqlite3complete`，或提供 mock 适配层将 `FlushToDisk` 改为写入 JSONL 文件。 |
| **JSON 编解码** | 依赖 `SimpleEncode/Decode`（`Shared.lua`） | 在 Skill 环境中替换为 `cjson.encode/decode` 或 `vim.json`（若可用），或随文件一起拷贝 `Shared.lua` 的对应函数。 |
| **存储路径** | 硬编码数据库名 `"tao_world.db"` | 需在迁移时改为可配置路径（如通过 `EventLog.dbPath`），否则在多 Skill 并发时会互相覆盖。 |
| **全局单例** | `EventLog.entries` 和 `EventLog.branchRegistry` 是全局状态 | 若 Skill 需要支持多实例（多世界/多服务器），应将其重构为 `EventLog:new()` 实例模式，或至少通过 `worldId` 给表名加前缀。 |
| **时间源** | `GetWorldTime()` 依赖 `_G.WorldTime` | 在 Skill 环境中可直接回退到 `os.time()`（已有兜底逻辑），无需改动；若需要游戏内逻辑时间，可注入自定义函数。 |
| **分析模块的语义耦合** | 部分函数（如 `AnalyzeFactionNetwork`）期望事件 `data` 带有特定字段 | 这属于**数据契约**而非代码耦合，只要业务层写入事件时遵循契约即可正常运行。 |

### 7.3 迁移建议（封装为 OpenClaw Skill）

- **保留原文件 verbatim**：作为核心库文件完整保留到 Skill 的 `scripts/` 目录，保证代码量不缩水。
- **提供包装层**：在 Skill 的入口脚本中做三件事：
  1. 设置 `EventLog.dbPath = <skill_workdir>/tao_world.db`；
  2. 替换 `SimpleEncode/SimpleDecode` 为环境内可用的 JSON 库；
  3. 按需暴露高级分析函数到 Skill 的 tool 接口（如 `eventlog_recent`、`eventlog_query_graph`、`eventlog_to_prompt`）。
- **关于快照**：由于 EventLog 本身无快照，建议在 Skill 的文档中说明：若需快速恢复 AgentCore/Mempalace 状态，需由消费者自行维护状态快照，EventLog 仅负责提供事件回放源。

---

## 附录：关键常量

```lua
EventLog.maxMemoryEntries = 10000   -- 内存队列上限
EventLog.flushBatchSize   = 2000    -- 单次刷盘批次
EventLog.DEFAULT_BRANCH   = "main"  -- 默认时间线分支
```
