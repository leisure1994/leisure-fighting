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

# 天道引擎 v1.2.0（完全体）

> **"LLM 不是聊天机器人，它是你的第二台渲染管线。渲染的不是像素，而是事件、叙事与可能性。"**

**本 Skill 是可直接运行于 UrhoX 的 Lua 代码库，总计 26,000+ 行生产级代码。**

---

## 规模总览

| 文件 | 行数 | 说明 |
|------|------|------|
| main.lua | 398 | 模块依赖图、热重载、性能监控 |
| Shared.lua | 580 | 完整远程事件注册、增强 JSON 工具箱 |
| Client.lua | 1777 | 完整 UI 层、3D 气泡、区域发现动画、虚拟键盘、调试面板 |
| Server.lua | 2050 | 公会/拍卖/副本/邮件/排行榜/成就/GM 指令/Webhook |
| Router.lua | 2057 | 智能评分路由、批次合并、预算控制、遥测、WebSocket 框架 |
| EventLog.lua | 2186 | 因果链、分支、图查询、统计摘要、模式挖掘 |
| Mempalace.lua | **8374** | 空间化记忆宫殿完全体（见下方功能清单） |
| AgentCore.lua | 3443 | 18 状态 FSM、10+ HTN、婚姻/师徒/派系/战斗/经济 |
| Validator.lua | 2570 | 27 种动作校验、SoftLock、审计日志、多 worldGraph |
| RegionGen.lua | 1070 | Perlin/CA/WFC/生物群系/Tiled |
| Tracery.lua | 558 | 8 修饰符、动态规则、5 大文法库 |
| InkRuntime.lua | 714 | 轻量 Ink 运行时 |
| **合计** | **~26,657** | 零 TODO / 零占位符 |

---

## Mempalace 完全体功能清单

### 宫殿核心
- 五类宫殿（world/npc/player/faction/region），每类 8+ 个房间。
- 房间动态创建/销毁/重命名。
- 纯 Lua 64 维语义哈希向量 + 余弦相似度检索。
- 时间衰减、硬锁标记、权重重计算。
- 记忆压缩（按 target+sentiment 聚合）。
- 归档系统（低权重移入归档表，支持恢复）。

### memory-system 移植
- 跨项目随行记忆（导出/导入/同步到其他项目）。
- 唤醒词检测与响应（匹配时自动加载全部关联记忆）。
- 记忆索引（按日期、类型、来源、情感快速索引）。
- 人格快照（persona snapshot）存储与加载。
- 抗体机制（识别并拒绝有害/矛盾的外部记忆注入）。
- 决策追踪（记录每次重大决策及其理由，支持回溯）。
- 版本控制（记忆的 create/update/delete 历史，支持 diff 和 rollback）。

### memory_consolidation 移植
- 会话分析器（模拟分析一段对话，提取关键事件写入宫殿）。
- 通道检测与会话分类（FEISHU:DM/GROUP, LOOPBACK 等）。
- STM（短期记忆）生成与分区（按时间和通道组织）。
- LTM（长期记忆）压缩与摘要（把旧记忆提炼成高权重常识）。
- 日记生成（根据宫殿内容自动生成日/周/月报）。
- 时间线分析（提取行为模式、作息规律、偏好变化曲线）。
- 情绪推断（从描述文本推断 sentiment/intensity）。
- 社交图构建（从记忆反向推导人际关系网络）。

### 高级功能
- 记忆导入/导出（支持 JSON / Markdown / CSV / 纯文本）。
- 跨实体记忆合并（把多个小宫殿合并成一个派系史）。
- 全局硬锁注册表（集中管理所有不可变事实）。
- 记忆传播/gossip（NPC 之间互相传播记忆，产生谣言/失真）。
- 基于记忆生成任务、关系变化建议、区域 lore。
- 视觉记忆（图片/文件引用）索引与检索。
- 搜索与过滤引擎（多字段组合查询、全文关键词、情感范围）。
- 记忆统计看板 API（返回宫殿健康度、记忆分布、活跃关系等）。
- 自动记忆巩固调度器（定时扫描并执行 Consolidate）。

---

## 快速开始

### 1. 文件放置

```
你的项目/
└── scripts/
    ├── main.lua
    └── network/
        ├── Shared.lua
        ├── Server.lua
        ├── Client.lua
        └── tao/
            ├── Router.lua
            ├── EventLog.lua
            ├── Mempalace.lua
            ├── AgentCore.lua
            ├── Validator.lua
            ├── RegionGen.lua
            ├── Tracery.lua
            └── InkRuntime.lua
```

### 2. 基础配置

```lua
API_KEYS = {
    deepseek = "sk-your-deepseek-key",
    doubao   = "Bearer your-doubao-key",
    kimi     = "sk-your-kimi-key"
}

TAO_CONFIG = {
    deepseek_reasoner = {
        url = "https://api.deepseek.com/chat/completions",
        model = "deepseek-reasoner", timeout = 60, maxRetries = 2, rpmLimit = 20
    },
    deepseek_chat = {
        url = "https://api.deepseek.com/chat/completions",
        model = "deepseek-chat", timeout = 30, maxRetries = 2, rpmLimit = 50
    },
    doubao = {
        url = "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
        model = "doubao-pro-32k", timeout = 30, maxRetries = 2, rpmLimit = 100
    },
    kimi = {
        url = "https://api.moonshot.cn/v1/chat/completions",
        model = "moonshot-v1-8k", timeout = 30, maxRetries = 2, rpmLimit = 60
    }
}

TAO_WORLD_CONFIG = {
    worldSeed = 42,
    regionSize = { w = 64, h = 64 },
    autoSaveInterval = 300,
    mempalaceArchiveDays = 30,
    maxConcurrentDerivations = 3,
    npcBatchSize = 20
}

SERVER_PRIVATE_KEY = ""
SERVER_PUBLIC_KEY  = ""
TAO_DEBUG = false
```

### 3. 启动入口

```lua
ServerTao.Init()
ServerTao.LoadWorld()
ServerTao.LoadMempalaceAll()
ServerTao.StartAutoSave()
```

### 4. 常用 API 示例

```lua
-- 世界推衍
QueueWorldDerivation("player_insult", {actor="玩家V", target="杰克", loc="集市东门", intensity=8})

-- NPC 策略
RequestNpcStrategy("npc_jack", playerVConnection)

-- 区域生成
local layout = GenerateRegion_Layout(42, 64, 64)
local height = GenerateRegion_Heightmap(42, 64, 64)
PlaceBuildingInRegion(height, layout, 8)
SaveRegion("wasteland_outpost_01", {layout=layout, height=height})

-- Tracery 文法
local name = TraceryFlatten("origin", {
    origin = "#prefix# #material# #weapon#",
    prefix = {"发光的","诅咒的"},
    material = {"玄钢","水晶"},
    weapon = {"长剑","法杖"}
})

-- Ink 叙事
local story = LoadInkStory("EXAMPLE_DOOR")
repeat
    local line, choices = ContinueInkStory(story)
    print(line)
    if #choices > 0 then ChooseInkChoice(story, 1) end
until line == nil
```

---

## Server 新增系统

- **公会系统**：`create/join/leave/promote/demote/kick/donate`
- **拍卖行**：`post/bid/cancel/settlement`（含一口价）
- **副本匹配**：`queue/enter/complete/reward` + 自动混拼匹配
- **邮件系统**：`send/read/take_attachment/delete`
- **排行榜**：`wealth/level/dungeon_prestige/achievement_points/guild_wealth/pvp_kills`
- **成就系统**：内置 8 条成就，含进度追踪与解锁
- **GM 指令**：`/spawn /teleport /settime /killall /debug /givegold /setlevel /ban` 等
- **Webhook 查询**：供外部系统读取 `worldstate/players/npcs/guilds/auctions/leaderboard`

---

## Router 新增能力

- **智能评分路由**：延迟 EWMA + 成功率窗口 + token 效率 → 0~1 综合评分
- **在线学习**：按任务类型记录 provider 表现，自动调整偏好
- **指数退避 + 抖动重试**：失败后最多 3 次，带 jitter
- **流水线批处理**：50ms 窗口合并 8 条短请求
- **成本预算控制**：日度/月度预算，超支拒绝或降级
- **遥测 API**：p50/p95/p99 延迟直方图、错误分类、provider 对比
- **玩家多 Key 轮询**：同 provider 下多 key 自动 round-robin
- **WebSocket 流式框架**：`WSConnect/WSSend/WSClose/WSGetState`

---

## Client 新增表现

- **NanoVG 完整 UI 数据绑定层**：narrative/quest/trade/party/mapOverlay
- **3D 气泡投影**：世界坐标 → 屏幕坐标，含 Raycast 遮挡与距离淡出
- **区域发现动画**：24 颗粒子、镜头移动、地图展开
- **世界状态 Diff 动画**：数字滚动、颜色闪烁、滑入滑出
- **安全虚拟键盘**：4 行字母布局，用于 API Key 输入
- **调试界面**：5 个可折叠面板、120 点实时曲线数据、GM 指令框
- **聊天日志与历史回溯**：按 NPC 保存最近 50 轮
- **成就解锁动画与排行榜弹窗**

---

## NPC Agent 新增能力

- **18 状态 FSM**：新增 romance、courtship、mentor、student、politics、betrayal 等
- **10+ 复合任务 HTN**：复仇、追求、教学、政治联盟、商业经营、探险、防御、偷窃、仪式
- **10 维 Utility AI**：hunger、safety、social、wealth、prestige、romance、curiosity、loyalty、revenge、faith
- **社会模拟**：求婚/婚礼/离婚、拜师/授课/出师、派系忠诚/背叛检测/政变策划
- **五感感知**：sight/hearing/smell/taste/touch，分别写入不同 Mempalace 房间
- **谣言/八卦**：自动从 speech 中提取并写入流言井
- **长期目标规划**：`LifeGoal` 带里程碑追踪
- **战斗 AI**：target selection、retreat logic、combo planning
- **经济账本**：produce/consume/set price/invest
- **Ink 对话树集成**：`StartInkDialog / AdvanceInkDialog / EndInkDialog`
- **5 次 JSON fallback**：逐次加严的 system prompt

---

## 核心原则

1. **天道只提议**：LLM 输出为 JSON 动作协议，不直接改状态。
2. **地道管真相**：所有变更经 `Validator` 校验后落盘。
3. **人道做表现**：Client 不发 HTTP，只做 Thin Client。

---

## 部署检查清单

- [ ] 已获取至少 1 个厂商 API Key
- [ ] RSA 密钥对若启用玩家代理则已配置
- [ ] 未使用 `require("cjson")`
- [ ] LLM 输出已约束为 JSON
- [ ] `ValidateGuard` 已覆盖非法变更
- [ ] 硬锁清单已注入 system prompt
- [ ] 自动保存与归档已配置

---

## 版权

本 Skill 代码为原创生产级实现，用于 UrhoX 常驻服项目。
