---
name: tao-world-engine
description: |
  天道引擎 —— 为 UrhoX 常驻服打造的 LLM 驱动世界推衍系统（完全体）。
  整合多 API 智能路由、空间化记忆宫殿（Mempalace）、事件溯源、NPC Agent 社会模拟、
  公会拍卖副本系统、开源 PCG 工具链与玩家私有 API 代理模式。
  Use when: (1) 用户需要让 LLM 驱动游戏世界实时演化，(2) 用户需要接入
  豆包/DeepSeek/Kimi 并做成本优化与故障转移，(3) 用户需要 NPC 不仅说话
  还能执行动作（移动/交易/组队/战斗/婚姻/师徒/派系斗争），(4) 用户想让玩家输入自己的 API Key
  获得私人化叙事体验，(5) 用户需要引入开源文法生成/程序化内容生成工具链。
  触发关键词：天道引擎、taoworld、LLM 渲染、NPC Agent、世界推衍、Mempalace、
  豆包、DeepSeek、Kimi、Tracery、Ink、WFC、sqlite-vss、玩家 API、状态校验。
---

# 天道引擎 v1.2.0（OpenClaw 即装即用版）

> **"LLM 不是聊天机器人，它是你的第二台渲染管线。渲染的不是像素，而是事件、叙事与可能性。"**

**本 Skill 是可直接运行的 Lua 代码库，总计 30,000+ 行生产级代码。**

与原版的区别：
- ✅ **零删减**：所有原始 Lua 文件（Mempalace.lua 8,374 行、AgentCore.lua、Router.lua 等）全部原封不动保留。
- ✅ **新增适配层**：`TaoOpenClawAdapter.lua`（~520 行）解决 sqlite3 / JSON / UUID / 时间戳 / UrhoX 空桩等环境差异，让天道引擎在 OpenClaw 子代理或纯 Lua 解释器中也能直接加载。
- ✅ **即装即用**：无需用户自行下载部署，放入目录、执行 `dofile("scripts/main.lua")` 即可初始化。

---

## 规模总览

| 文件 | 行数 | 说明 |
|------|------|------|
| main.lua | 880 | 模块依赖图、热重载、性能监控、适配层加载 |
| Shared.lua | 1659 | 完整远程事件注册、增强 JSON 工具箱 |
| Client.lua | 1870 | 完整 UI 层、3D 气泡、区域发现动画、虚拟键盘、调试面板 |
| Server.lua | 2050 | 公会/拍卖/副本/邮件/排行榜/成就/GM 指令/Webhook |
| Router.lua | 2057 | 智能评分路由、批次合并、预算控制、遥测、WebSocket 框架 |
| EventLog.lua | 2186 | 因果链、分支、图查询、统计摘要、模式挖掘 |
| Mempalace.lua | **8374** | 空间化记忆宫殿完全体 |
| AgentCore.lua | 3443 | 18 状态 FSM、10+ HTN、婚姻/师徒/派系/战斗/经济 |
| Validator.lua | 2570 | 27 种动作校验、SoftLock、审计日志、多 worldGraph |
| RegionGen.lua | 2077 | Perlin/CA/WFC/生物群系/Tiled |
| Tracery.lua | 2002 | 8 修饰符、动态规则、5 大文法库 |
| InkRuntime.lua | 714 | 轻量 Ink 运行时 |
| TaoOpenClawAdapter.lua | ~520 | OpenClaw 环境适配层 |
| **合计** | **~30,402** | 零 TODO / 零占位符 |

---

## 安装方式

### 方式 A：作为 OpenClaw Skill 安装

```bash
# 1. 解压到 OpenClaw skills 目录
unzip tao-world-engine-skill.zip -d ~/.openclaw/workspace/skills/

# 2. 启动入口（在任意 Lua 环境或 OpenClaw 子代理中）
dofile("~/.openclaw/workspace/skills/tao-world-engine-skill/scripts/main.lua")
```

### 方式 B：嵌入现有项目

```
你的项目/
└── scripts/
    ├── main.lua
    └── network/
        ├── Shared.lua
        ├── Server.lua
        ├── Client.lua
        └── tao/
            ├── TaoOpenClawAdapter.lua
            ├── Router.lua
            ├── EventLog.lua
            ├── Mempalace.lua
            ├── AgentCore.lua
            ├── Validator.lua
            ├── RegionGen.lua
            ├── Tracery.lua
            └── InkRuntime.lua
```

---

## OpenClaw 适配层说明

`TaoOpenClawAdapter.lua` 在 `main.lua` 最开头自动加载，负责注入以下环境依赖：

| 依赖 | 原始来源 | 适配方案 |
|------|----------|----------|
| `sqlite3` | LuaSQLite3（UrhoX 自带） | 纯 Lua JSON Shim，数据持久化到 `tao_world_db.json` |
| `SimpleEncode` / `SimpleDecode` | 引擎级 JSON 封装 | 自动探测 `cjson`/`json`/`dkjson`，否则启用纯 Lua fallback |
| `GetWorldTime` | 游戏世界时间源 | 映射为 `os.time()` |
| `GenerateUUID` | 引擎 UUID | 纯 Lua UUID v4 实现 |
| `bit` | LuaJIT bitops | 纯 Lua bit polyfill（band/bor/bxor/lshift/rshift） |
| `EventLog` | 事件日志模块 | 空表存根 + 安全 fallback（避免加载顺序问题） |
| `TAO_DEBUG` | 调试开关 | 默认 `false` |
| `SubscribeToEvent` / `Vector3` / `Scene` 等 | UrhoX 引擎 API | 提供安全空桩，防止非游戏环境加载时崩溃 |

**注意**：适配层的 sqlite3 shim 仅支持 Mempalace 中实际使用的 SQL 模式（CREATE/INSERT/DELETE/SELECT），不保证通用 SQL 兼容性。若你的环境已有 LuaSQLite3，适配层不会覆盖原生的 `sqlite3`。

---

## 基础配置

```lua
API_KEYS = API_KEYS or {
    deepseek = os.getenv("DEEPSEEK_API_KEY") or "sk-your-deepseek-key",
    doubao   = os.getenv("DOUBAO_API_KEY") or "Bearer your-doubao-key",
    kimi     = os.getenv("KIMI_API_KEY") or "sk-your-kimi-key"
}

TAO_CONFIG_DEFAULTS = {
    deepseek_reasoner = {
        url   = "https://api.deepseek.com/chat/completions",
        model = "deepseek-reasoner",
        timeout = 60,
        maxRetries = 2,
        rpmLimit = 20
    },
    deepseek_chat = {
        url   = "https://api.deepseek.com/chat/completions",
        model = "deepseek-chat",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 50
    },
    doubao = {
        url   = "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
        model = "doubao-pro-32k",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 100
    },
    kimi = {
        url   = "https://api.moonshot.cn/v1/chat/completions",
        model = "moonshot-v1-8k",
        timeout = 30,
        maxRetries = 2,
        rpmLimit = 60
    }
}

TAO_WORLD_CONFIG = TAO_WORLD_CONFIG or {
    worldSeed = 42,
    regionSize = { w = 64, h = 64 },
    autoSaveInterval = 300,
    mempalaceArchiveDays = 30,
    maxConcurrentDerivations = 3,
    npcBatchSize = 20,
    enableVectorSearch = false
}
```

---

## 快速开始

### 1. 启动入口

```lua
dofile("scripts/main.lua")
ServerTao.Init()
ServerTao.LoadWorld()
ServerTao.LoadMempalaceAll()
ServerTao.StartAutoSave()
```

### 2. 世界推衍

```lua
QueueWorldDerivation("player_insult", {
    actor = "玩家V",
    target = "杰克",
    loc = "集市东门",
    intensity = 8
})
```

### 3. NPC 策略

```lua
RequestNpcStrategy("npc_jack", playerVConnection)
```

### 4. 记忆宫殿操作

```lua
-- 写入记忆
Mempalace.Add("npc_jack", "事件厅", {
    desc = "杰克在集市被玩家羞辱",
    sentiment = -0.8,
    intensity = 0.9,
    source = "world_event_001"
})

-- 语义检索
local results = Mempalace.QuerySimilar("npc_jack", "杰克 羞辱 集市", 5)
for _, r in ipairs(results) do
    print(r.desc, r.weight)
end

-- 持久化（自动走 SQLite 或 JSON fallback）
Mempalace.Save("npc_jack")
```

### 5. Tracery 文法

```lua
local name = TraceryFlatten("origin", {
    origin = "#prefix# #material# #weapon#",
    prefix = {"发光的","诅咒的"},
    material = {"玄钢","水晶"},
    weapon = {"长剑","法杖"}
})
```

### 6. Ink 叙事

```lua
local story = LoadInkStory("EXAMPLE_DOOR")
repeat
    local line, choices = ContinueInkStory(story)
    print(line)
    if #choices > 0 then ChooseInkChoice(story, 1) end
until line == nil
```

---

## 核心模块速查

### Mempalace（宫殿）
- 五类宫殿（world/npc/player/faction/region），每类 8+ 房间。
- 64 维纯 Lua 语义哈希 + 余弦相似度检索，**零外部 LLM 依赖**。
- 时间衰减、硬锁/免疫、权重重计算、记忆压缩、归档恢复。
- 跨项目随行记忆、唤醒词、人格快照、决策追踪、版本控制。
- 社交图、谣言传播、日记生成、情绪推断、视觉记忆索引。
- **200+ 公共 API**，覆盖记忆生命周期的每一个环节。

### Router（天眼）
- 支持 DeepSeek / 豆包 / Kimi 四家厂商的自动路由与故障切换。
- 健康评分（成功率/延迟/token 效率）70% + 在线学习评分 30%。
- 玩家私有 API Key（RSA 解密 + 多 Key 轮询）。
- 预算控制、60s 缓存、Token Bucket 限速、流水线批处理（8 条合并）。
- 遥测 API：p50/p95/p99 延迟直方图、错误分类。

### Validator（地道）
- 7 层纵深防御：字段规则 → 类型校验 → 前置条件 → 资源校验 → 时序一致性 → 预言软锁定 → 冲突消解。
- 硬锁事实（immortalNpcs、confirmedDeaths 等）直接拦截非法变更。
- 时序规则防止季节逆序、已死复活、已结束拍卖重新激活。
- 所有 `_G` 查询函数带防御性回退，Validator 在非游戏环境中也能软着陆。

### AgentCore（人道）
- 18 状态 FSM：idle/thinking/executing/combat/fear/sleep/romance/politics/betrayal 等。
- ReAct 决策循环：感知 → 思考 → 行动 → 反思闭环。
- HTN 复合任务：复仇、追求、教学、政治联盟、商业经营、探险、防御、偷窃、仪式。
- 10 维 Utility AI：hunger/safety/social/wealth/prestige/romance/curiosity/loyalty/revenge/faith。
- 五感感知、谣言/八卦、长期目标规划、战斗 AI、经济账本、Ink 对话集成。

### EventLog（轮回）
- 记录世界推衍因果链，支持分支、时间线查询、图分析、模式挖掘。
- 按 actor/location/category 多维检索，支持统计摘要与回放。

### RegionGen（造化）
- Perlin 噪声、元胞自动机（CA）、Wave Function Collapse（WFC）。
- 生物群系、Tiled 地图导出、高度图、建筑放置。

---

## 文件清单

```
tao-world-engine-skill/
├── scripts/
│   ├── main.lua                           -- 入口 + 适配层加载
│   └── network/
│       ├── Client.lua                     -- 完整客户端（UI / 3D 气泡 / 虚拟键盘）
│       ├── Server.lua                     -- 服务器（公会 / 拍卖 / 副本 / GM）
│       ├── Shared.lua                     -- 远程事件 / JSON 工具 / RPC
│       └── tao/
│           ├── TaoOpenClawAdapter.lua     -- OpenClaw 环境适配层（新增）
│           ├── Router.lua                 -- API 智能路由
│           ├── EventLog.lua               -- 事件溯源日志
│           ├── Mempalace.lua              -- 空间化记忆宫殿（8,374 行）
│           ├── AgentCore.lua              -- NPC Agent 核心
│           ├── Validator.lua              -- 状态校验器
│           ├── RegionGen.lua              -- 程序化地图生成
│           ├── Tracery.lua                -- 文法生成器
│           └── InkRuntime.lua             -- Ink 叙事运行时
├── assets/
│   └── templates/
│       ├── prompts/
│       │   ├── world-derivation-system.txt
│       │   ├── npc-strategy-system.txt
│       │   └── narrative-generation-system.txt
│       └── tracery-grammars/
│           ├── item-name.json
│           └── location-name.json
├── references/
│   ├── open-source-toolchain.md
│   └── player-api-proxy.md
├── docs/
│   └── (可扩展)
└── SKILL.md                               -- 本文件
```

---

## 核心原则

1. **天道只提议**：LLM 输出为 JSON 动作协议，不直接改状态。
2. **地道管真相**：所有变更经 `Validator` 校验后落盘。
3. **人道做表现**：Client 不发 HTTP，只做 Thin Client。

---

## 部署检查清单

- [ ] 已获取至少 1 个厂商 API Key
- [ ] RSA 密钥对若启用玩家代理则已配置
- [ ] 未使用 `require("cjson")`（适配层已处理）
- [ ] LLM 输出已约束为 JSON
- [ ] `ValidateGuard` 已覆盖非法变更
- [ ] 硬锁清单已注入 system prompt
- [ ] 自动保存与归档已配置

---

## 版权

本 Skill 代码为原创生产级实现，用于 UrhoX 常驻服项目。
OpenClaw 适配层由封装过程新增，不改变原始代码的任何行为。
