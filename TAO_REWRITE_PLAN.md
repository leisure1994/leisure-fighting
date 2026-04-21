# Tao World Engine 重构计划

## 目标
将 tao-world-engine 从 2300+ 行骨架代码扩充为可直接投入生产的完整代码库（目标 1w+ 行），适配 TapTap 制造 Skill 规范。

## 模块分配

### 子代理 A (存储层)
- `scripts/network/tao/Mempalace.lua` 目标 1500+ 行
- `scripts/network/tao/EventLog.lua` 目标 600+ 行
- 要求：宫殿体系（world/npc/player/faction/region）、向量检索（余弦相似度实现）、记忆压缩/归档、Prompt组装、因果链追踪。

### 子代理 B (AI 核心层)
- `scripts/network/tao/AgentCore.lua` 目标 1200+ 行
- `scripts/network/tao/Validator.lua` 目标 600+ 行
- 要求：完整 FSM、HTN 分解器、Utility AI、感知系统、日程作息、ReAct 动作执行、丰富规则引擎。

### 子代理 C (网络/通信层)
- `scripts/network/tao/Router.lua` 目标 800+ 行
- `scripts/network/Client.lua` 目标 500+ 行
- `scripts/network/Shared.lua` 目标 300+ 行
- 要求：请求队列、速率限制、Token 统计、延迟监控、UrhoX HTTP 正确绑定方式、远程事件完整注册。

### 子代理 D (PCG 层)
- `scripts/network/tao/RegionGen.lua` 目标 800+ 行
- `scripts/network/tao/Tracery.lua` 目标 400+ 行
- `scripts/network/tao/InkRuntime.lua` 目标 500+ 行（新增）
- 要求：完整 WFC、细胞自动机、Poisson Disk、更真实的噪声、生物群系、Ink 运行时基础。

### 主代理 (整合层)
- `scripts/main.lua` 目标 400+ 行
- `scripts/network/Server.lua` 目标 800+ 行
- 更新 `SKILL.md` 与目录结构一致
- 最终打包 `tao-world-engine.zip`

## 编码规范
1. 使用 `network:MakeHttpRequest` 而非 `network:CreateHTTP`（UrhoX 兼容写法以 HTTPRequest 对象 + SubscribeToEvent("RequestFinished") 模式为准）
2. JSON 序列化使用 `SimpleEncode/SimpleDecode`，禁止 `require("cjson")`
3. SQLite 使用全局 `sqlite3`，操作时要检查存在性
4. 所有模块都要有 `Module = Module or {}` 的防重复加载保护
5. 函数必须写中文 LuaDoc 注释
6. 常量使用全大写下划线命名
7. 矩阵/二维数组用 `table[y][x]` 的 row-major 形式
8. Tracery 语法严格兼容原始 GalaxyKate 规范

## 接口契约
- `Mempalace.ToPrompt(entityId, maxItemsPerRoom)` 返回 string
- `Mempalace.CheckTriggers(entityId)` 返回 table of strings
- `AgentCore.TickAll(dt)` 无返回值
- `Router.HttpCall(cfg, messages, onSuccess, onError)` 标准回调
- `Validator.ValidatePlan(npcId, plan)` 返回 ok, validPlan
- `RegionGen.GenerateAndSave(regionId, seed, ...)` 返回 regionData
- `Tracery.Flatten(startRule, grammar)` 返回 string
- `TaoCall(messages, taskProfile, onSuccess)` 全局函数

