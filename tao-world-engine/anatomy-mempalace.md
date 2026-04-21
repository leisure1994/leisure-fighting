# Mempalace.lua 解剖报告

> 文件：`tao-world-engine/scripts/network/tao/Mempalace.lua`  
> 规模：8,374 行 / ~309 KB  
> 生成时间：2026-04-13

---

## 1. 模块职责（一句话）

**Mempalace 为每个实体（world / npc / player / faction / region）维护一座可漫游、可检索、可压缩、可持久化的空间化记忆宫殿，融合向量语义、时间衰减、硬锁一致性、毒素免疫与版本控制。**

---

## 2. 公共 API 清单（30+ 最关键函数）

| 函数 | 作用 |
|------|------|
| `Mempalace.Get(entityId, palaceType)` | 懒加载并返回宫殿实例，自动应用房间模板。 |
| `Mempalace.Add(entityId, roomName, entry)` | 向房间插入记忆条目，自动补全字段、毒素检测、硬锁校验、建索引、版本记录、溢出保护。 |
| `Mempalace.RemoveEntryById(entityId, entryId)` | 按 UUID 删除条目并清理索引和版本。 |
| `Mempalace.UpdateEntryById(entityId, entryId, fields)` | 按 UUID 更新字段，描述变更时自动重算向量。 |
| `Mempalace.EffectiveWeight(entry, current_t)` | 基于指数衰减计算条目在当前时刻的有效权重（支持 half_life ≤ 0 的永不过期）。 |
| `Mempalace.CreateRoom(entityId, roomName, properties)` | 动态创建新房间并配置半衰期/优先级/可压缩性。 |
| `Mempalace.DestroyRoom(entityId, roomName, force)` | 删除房间，受保护房间需 force。 |
| `Mempalace.RenameRoom(entityId, oldName, newName)` | 重命名房间并迁移所有条目。 |
| `Mempalace.QuerySimilar(entityId, queryVector, topN)` | 跨所有房间按向量余弦相似度 × 有效权重检索最相关记忆。 |
| `Mempalace.QueryByTag(entityId, tag, roomName)` | 按标签检索，可限定房间。 |
| `Mempalace.QueryBySource(entityId, sourceId)` | 按来源 ID 检索。 |
| `Mempalace.QueryByTarget(entityId, targetId)` | 按 target/related_entity 检索。 |
| `Mempalace.RegisterHardLock(factId, desc, source, confidence, targetEntityId, targetRoom)` | 注册全局硬锁事实（高权重、不可被压缩/归档覆盖）。 |
| `Mempalace.UnregisterHardLock(factId)` | 注销硬锁。 |
| `Mempalace.ApplyHardLocksToPalace(entityId, targetRoom)` | 将硬锁注入到目标宫殿房间。 |
| `Mempalace.CompressRoom(entityId, roomName)` | 按 (target + sentiment 桶) 聚类，将低差异条目合并为摘要条目。 |
| `Mempalace.ArchiveOld(entityId, days)` | 将超过天数且权重低于阈值的老旧条目移入归档表。 |
| `Mempalace.RestoreFromArchive(entityId, roomName)` | 从归档恢复记忆回活跃宫殿。 |
| `Mempalace.Save(entityId)` | 将活跃记忆、归档记忆及全部扩展元数据写入 SQLite (`tao_world.db`)。 |
| `Mempalace.Load(entityId)` | 从 SQLite 恢复活跃记忆、归档记忆及扩展元数据。 |
| `Mempalace.SaveAll()` / `LoadAll()` | 批量保存/加载所有内存中的宫殿。 |
| `Mempalace.TextToVector(text)` | 基于 2-gram~4-gram 随机投影生成 64 维语义向量并 L2 归一化。 |
| `Mempalace.BuildIndexes(entityId)` | 重建日期/类型/来源/情感四重索引。 |
| `Mempalace.AddToIndexes(entityId, roomName, entry)` | 将单条记忆加入四重索引。 |
| `Mempalace.RemoveFromIndexes(entityId, entryId)` | 从四重索引中移除条目。 |
| `Mempalace.RecordVersion(entityId, entryId, action, oldData, newData)` | 记录条目的 create/update/delete 版本历史。 |
| `Mempalace.ScanForToxin(entityId, entry)` / `RejectInjection(...)` | 抗体系统：检测并标记有害记忆注入。 |
| `Mempalace.ToPrompt(entityId, maxItemsPerRoom, sceneType)` | 将宫殿记忆按场景类型渲染为 LLM Prompt 文本。 |
| `Mempalace.MergePalace(sourceEntityId, targetEntityId, mergeMode)` | 合并两座宫殿。 |
| `Mempalace.PurgeEntity(entityId, fromDisk)` | 彻底清空实体记忆（含磁盘）。 |
| `Mempalace.Dump(entityId, includeArchive)` | 输出宫殿结构用于调试。 |
| `Mempalace.DiagnosePalace(entityId)` / `FixPalace(entityId)` | 诊断并自动修复宫殿异常（丢 ID、空向量、坏权重等）。 |

> 实际文件包含 **300+** 个公共函数，覆盖批量操作、社交图谱、情绪曲线、日记生成、谣言传播、视觉记忆、决策追踪、人格快照等子系统。

---

## 3. 核心数据结构

### 3.1 宫殿（Palace）
```lua
Mempalace.palaces[entityId] = {
    entityId = "uuid",
    type     = "npc",          -- world | npc | player | faction | region
    createdAt = <timestamp>,
    rooms    = {},              -- roomName -> [entry, ...]
    metadata = {
        lastAccessed    = <timestamp>,
        accessCount     = 0,
        lastConsolidated= 0,
        customProperties= {}
    }
}
```

### 3.2 记忆条目（Entry）
```lua
entry = {
    id          = <uuid>,           -- 自动 GenerateUUID
    desc        = <string>,         -- 原始描述文本
    born_t      = <timestamp>,      -- 创建时间（GetWorldTime）
    weight      = 1.0,              -- 基础权重
    half_life   = 30,               -- 半衰期（天），-1 表示永不过期
    tags        = {},               -- 字符串数组
    sentiment   = 0,                -- [-1, 1] 情感极性
    intensity   = 0.5,              -- [0, 1] 强度
    source      = "",               -- 来源 ID
    confidence  = 1.0,              -- [0, 1] 置信度
    vector      = {64 维},          -- 语义向量（TextToVector）
    target      = "",               -- 关联实体
    -- 扩展字段：type, related_entity, compressed_from, etc.
}
```

### 3.3 归档（Archives）
```lua
Mempalace.archives[entityId][roomName] = { entry, ... }
```
被 `ArchiveOld` 移出的低权重老旧记忆存放于此，可通过 `RestoreFromArchive` 恢复。

### 3.4 索引体系（Indexes）
四重全局索引，以 `entityId` 为一级键：
- `Mempalace.indexDate[entityId][dateStr][entryId] = {room, entryId}`
- `Mempalace.indexType[entityId][typeKey][entryId] = {room, entryId}`
- `Mempalace.indexSource[entityId][sourceKey][entryId] = {room, entryId}`
- `Mempalace.indexSentiment[entityId][sentBucket][entryId] = {room, entryId}`

### 3.5 硬锁（Hard Locks）
```lua
Mempalace.globalHardLocks[factId] = {
    desc = <string>,
    source = <string>,
    confidence = 1.0,
    targetEntityId = <entityId>,
    targetRoom = <roomName>,
    registeredAt = <timestamp>
}
```
硬锁条目享有 `HARD_LOCK_BASE_WEIGHT = 20` 的超高权重，默认不会被压缩或归档。

### 3.6 其他全局扩展结构
| 结构 | 用途 |
|------|------|
| `wakeWords` | 唤醒词注册表，支持跨实体快速加载记忆 |
| `personaSnapshots` | 人格快照历史（最多 20 个） |
| `immunePatterns` | 毒素/注入攻击的抗体模式库 |
| `decisionLog` | 决策追踪（最多 200 条） |
| `versions` | 每个 entry 的版本链（最多 50 个版本） |
| `visualMemories` | 视觉记忆库（图片路径 + 描述 + 向量） |
| `gossipRegistry` | 谣言传播注册表与频道 |
| `consolidationReports` | 自动巩固调度产生的报告 |

---

## 4. 状态机 / 数据流

### 4.1 Add（写入记忆）
```
调用者提供 {desc, ...}
    ↓
[字段补全] → born_t / id / weight / half_life / tags / sentiment / intensity
             / source / confidence / vector (TextToVector)
    ↓
[毒素检测] ScanForToxin → 若命中：confidence *= 0.5，tags += "toxic_rejected"
    ↓
[硬锁校验] CheckAgainstKnownFacts → 若矛盾：confidence *= 0.5，tags += "hardlock_conflict"
    ↓
[插入房间] table.insert(palace.rooms[roomName], entry)
    ↓
[建立索引] AddToIndexes(date/type/source/sentiment)
    ↓
[版本记录] RecordVersion("create", nil, entry)
    ↓
[溢出保护] 若 room 长度 > MAX_ROOM_SIZE(500)，循环移除最旧非 hard_lock 条目
```

### 4.2 Index（索引维护）
```
BuildIndexes(entityId)
  清空该 entityId 在四重索引中的全部记录
  遍历所有 room → 所有 entry → AddToIndexes

AddToIndexes(entityId, roomName, entry)
  dateStr  = format_timestamp_to_date(born_t)
  typeKey  = entry.type or "general"
  sourceKey= entry.source or "unknown"
  sentBucket = floor(sentiment * 10)
  写入 indexDate / indexType / indexSource / indexSentiment

RemoveFromIndexes(entityId, entryId)
  在四重索引中删除对应 entryId
```

### 4.3 Query（检索记忆）
#### 向量相似检索（QuerySimilar）
```
接收 queryVector（64 维）
  遍历 palace 所有 room 的所有 entry
  计算 cosine_similarity(entry.vector, queryVector)
  score = sim * (1 + EffectiveWeight(entry, current_t))
  按 score 降序排序，返回 topN（默认 10）
```

#### 索引精确检索（QueryByIndex）
```
根据 indexType（date/type/source/sentiment）+ key
  直接查对应索引表 → 反查 room → 返回 entries
```

### 4.4 Compress（房间压缩）
```
CompressRoom(entityId, roomName)
  Step 1: 按 (target + "#" + sentiment桶) 分组
  Step 2: 组内条目 >= COMPRESSION_MIN_GROUP_SIZE(3) 则聚合
           计算平均情感、总权重、时间跨度、合并来源
           生成摘要描述（保留最多 5 个原始片段前缀）
           创建新的 summaryEntry（tags += {"compressed","summary"}）
           原条目 RecordVersion("delete") + RemoveFromIndexes
           新摘要 RecordVersion("create")
  Step 3: 未达阈值的组保留原条目
  Step 4: palace.rooms[roomName] = newRoom
```

### 4.5 Archive（归档）
```
ArchiveOld(entityId, days)
  cutoff = current_t - days * ONE_DAY
  遍历每个 room
    若 entry 满足：age > days 且 EffectiveWeight < 0.3 且非 hard_lock
      → 移入 Mempalace.archives[entityId][roomName]
    否则保留在活跃 room
```

### 4.6 Save / Load（SQLite 持久化）
#### Save
```
sqlite3.open("tao_world.db")
  CREATE TABLE IF NOT EXISTS mempalace
  DELETE FROM mempalace WHERE entity_id = ?
  INSERT 活跃记忆（entity_id, room_name, entry_data(JSON), born_t, weight）
  
  CREATE TABLE IF NOT EXISTS mempalace_archive
  DELETE FROM mempalace_archive WHERE entity_id = ?
  INSERT 归档记忆
  
  CREATE TABLE IF NOT EXISTS mempalace_meta
  INSERT OR REPLACE 元数据（hard_locks, wake_words, persona_snapshots,
     immune_patterns, decision_log, version_log, indexes, visual_memories,
     gossip_registry, scheduler_last_run, consolidation_reports）
  全部使用 SimpleEncode 进行 JSON 序列化
db:close()
```

#### Load
```
sqlite3.open("tao_world.db")
  SELECT * FROM mempalace WHERE entity_id = '...'
    SimpleDecode(entry_data) 反序列化
    为缺失字段补默认值（id / vector / sentiment 等）
    插入 palace.rooms[roomName]
  
  SELECT * FROM mempalace_archive → 恢复 archives
  
  SELECT * FROM mempalace_meta → SimpleDecode 各扩展结构并 merge 到全局表
db:close()
```

---

## 5. 外部依赖

| 依赖 | 用途 | 出现位置 | 容错处理 |
|------|------|----------|----------|
| `sqlite3` | SQLite 数据库操作（Save/Load/Purge） | `Save`, `Load`, `SaveAll`, `LoadAll`, `PurgeEntity`, `FallbackSaveAll`(反向分支) | 若 `sqlite3 == nil` 则打印调试信息并直接返回；已有 `FallbackSaveAll` / `FallbackLoadAll` 使用 JSON 文件降级。 |
| `SimpleEncode` | 将 Lua 表序列化为 JSON 字符串 | `Save`, `ExportMemories`, `ExportAllToJSON`, `meta` 序列化等处 | 若失败默认返回 `"{}"`。 |
| `SimpleDecode` | 将 JSON 字符串反序列化为 Lua 表 | `Load`, `ImportMemories`, `meta` 反序列化等处 | 失败时回退为按字符串构造默认 entry 表。 |
| `GetWorldTime` | 获取当前世界时间戳（秒级） | `Add`, `Save`, `CompressRoom`, `ArchiveOld`, `EffectiveWeight` 等几乎所有时间相关逻辑 | 代码中高频调用，**无 nil 检查**。 |
| `GenerateUUID` | 生成全局唯一 ID | `Add`, `CompressRoom`, `Save`, `Load`, `CreateRoom`, `RecordVersion`, `visualMemories` 等 | 代码中高频调用，**无 nil 检查**。 |
| `bit` | `bit.band` 用于字符串哈希加速 | `string_hash`（TextToVector 的依赖） | 已有 fallback：若 `bit == nil` 则使用 `% 2147483647`。 |
| `EventLog` | 事件日志联动（重大变更同步记录） | `LogToEventLog`, `SyncWithEventLog`, `BuildEventLogPrompt`, `TraceDecisionOutcome`, `TraceSourceChain` | 全部使用 `if EventLog and EventLog.xxx then ... end` 的防御式调用。 |
| `TAO_DEBUG` | 调试打印开关 | 分布于 Add、DestroyRoom、QuerySimilar、Save、Load 等 | 使用 `if TAO_DEBUG then print(...) end`，nil 视为 false，安全。 |

---

## 6. 可迁移性评估（OpenClaw Skill 环境）

### 6.1 必须原封不动保留的代码
以下模块直接决定记忆宫殿的行为一致性与语义完整性，任何改动都会导致记忆失真或数据损坏，建议完整迁移：

1. **Entry 结构定义与字段补全逻辑**（`Add` 函数中的自动字段填充、默认值计算）。
2. **TextToVector 语义哈希算法**（2-gram~4-gram 随机投影 + L2 归一化 + `string_hash`）。这是向量检索的数学核心。
3. **EffectiveWeight 指数衰减公式**（`weight * 0.5^(days / half_life)`）。时间记忆的核心经济学。
4. **CompressRoom 聚类与摘要逻辑**（分组键 `(target + sentiment桶)`、摘要描述模板、权重合并策略）。
5. **ArchiveOld 的筛选条件**（`age > days && effWeight < 0.3 && !hard_lock`）。
6. **Hard Lock 的权重注入与保护规则**（`HARD_LOCK_BASE_WEIGHT = 20`、压缩/归档中的豁免逻辑）。
7. **Save / Load 的 SQL 表结构**（`mempalace`、`mempalace_archive`、`mempalace_meta` 的字段名与索引名）。这是数据持久化的 schema 契约。
8. **四重索引的数据结构**（`indexDate`/`indexType`/`indexSource`/`indexSentiment` 的嵌套字典形态）。
9. **ROOM_TEMPLATES 与 ROOM_PROPERTIES**（五种宫殿类型对应的 40 个房间名及其半衰期/优先级/可压缩性配置）。这是“空间化”的语义骨架。
10. **版本控制、毒素免疫、人格快照、决策追踪等扩展子系统的数据结构与操作逻辑**（至少保留数据结构和 CRUD 函数，以确保与现有 palace 数据的向后兼容）。

### 6.2 需要为 OpenClaw Skill 环境做适配的代码

| 适配点 | 现状 | 建议适配方案 |
|--------|------|--------------|
| **`sqlite3` 全局库** | 依赖宿主环境注入 `sqlite3` 模块直接打开 `tao_world.db` | OpenClaw Skill 运行时通常不自带 `sqlite3`。建议：① 优先将 `Save`/`Load` 改造为**基于文件系统的 JSON persistence**（调用 `FallbackSaveAll`/`FallbackLoadAll` 的逻辑并扩展为正式路径）；② 若需保留 SQLite，必须在 Skill 初始化时检测 `sqlite3` 可用性并给出降级提示。 |
| **`GetWorldTime` 全局函数** | 直接调用，无 nil 检查 | 在 Skill 环境中替换为 `os.time()` 封装，或在模块顶部注入：`Mempalace._getTime = GetWorldTime or os.time`。 |
| **`GenerateUUID` 全局函数** | 直接调用，无 nil 检查 | 提供内联的 UUID v4 生成器作为 fallback：`local function generate_uuid() ... end`，并在模块初始化时绑定。 |
| **`bit` 库** | 用于 `string_hash` 中的 `bit.band` | 已有 `% 2147483647` fallback，可直接保留，无需改动；若追求确定性，可移除 `bit` 分支以消除对 LuaJIT 的依赖。 |
| **文件 I/O 路径** | `tao_world.db` 和 `mempalace_*.json` 使用相对路径 | 必须改为基于 Skill `workspace` 目录的**绝对路径**，例如通过环境变量或 Skill 上下文获取 `root/.openclaw/workspace/tao-world-engine/`。 |
| **`EventLog` 耦合** | 多处进行事件日志联动 | 已具备防御式 nil 检查，可直接保留；若 Skill 环境不提供 `EventLog`，相关功能会自动静默失效，不影响核心记忆流程。 |
| **`TAO_DEBUG` 标志** | 用于局部打印 | 建议映射为 Skill 级别的 `debug` 配置开关（如从 `ctx.config` 读取），保持向后兼容。 |
| **Lua 协程 / 运行时特性** | 使用标准 Lua 5.1/LuaJIT 语法 | 代码本身无协程、无复杂元表，**与 OpenClaw 的 Lua 环境（若支持）基本兼容**。若 OpenClaw 使用纯 Python/JavaScript Skill 运行时，则需**完整重写翻译层**——这是最大迁移风险点。 |

### 6.3 迁移建议总结
- **最小可行迁移（MVP）**：保留全部 Lua 源码，仅替换 `GetWorldTime` → `os.time()`、`GenerateUUID` → 内联实现、`sqlite3` → Fallback JSON 文件持久化、路径改为绝对路径。这样可在不修改任何算法和数据结构的前提下跑通。
- **完整迁移**：若目标环境不是 Lua（例如 Python/JS Skill），需要将上述“必须保留的代码”完整翻译，并确保 JSON schema 与 SQLite schema 完全一致，以便兼容已有的 `tao_world.db` 数据。

---
*报告完成。本文件可直接用于 OpenClaw Skill 的 Mempalace 封装设计参考。*
