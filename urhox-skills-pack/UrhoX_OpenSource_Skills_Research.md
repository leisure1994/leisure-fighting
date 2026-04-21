# UrhoX 开源技能调研报告：战斗 / 经济 / 社交 / 程序化地图

> 调研目标：基于 UrhoX（Urho3D）引擎生态，寻找可解决以下四类问题的开源项目/技能/算法库，并给出可直接落地的整合建议。
>
> 调研日期：2026-04-11  
> 引擎版本适配：Urho3D / UrhoX / rbfx（Lua 脚本层通用）

---

## 一、战斗系统 │ ★★★☆☆ 基础已有，武侠特化需开发

### 1.1 UrhoX 自身基础
Urho3D 官方自带的 `NinjaSnowWar` 示例已包含最基础的**投掷物弹道 + 受击判定 + 血量扣减**。这相当于“战斗系统 0.5 版”，可直接复用其 `Projectile` 与 `Health` 逻辑。

### 1.2 开源状态机（连招/硬直/霸体的核心骨架）
| 项目 | 语言 | 地址 | 核心能力 | 集成难度 |
|---|---|---|---|---|
| **lua-state-machine** | Lua | https://github.com/kyleconroy/lua-state-machine | 杰ake Gordon 经典 FSM 的 Lua 移植。支持状态切换限制 `from/to`、进入/离开回调。极适合管理“Idle -> 起手 -> 连击段1 -> 连击段2 -> 收招 -> 硬直”的武侠连招。 | ⭐（单文件，直接拖入 `scripts/`） |
| **Lua_FSM** | Lua | https://github.com/SouthBegonia/Lua_FSM | 面向对象的 FSM，带 `CheckEntryCondition` 进入条件检查。可方便地实现“仅在地面才可起跳/仅在非受击态才可格挡”。 | ⭐⭐ |
| **lua-fsm (recih)** | Lua | https://github.com/recih/lua-fsm | 功能最完整，支持异步/条件守卫/错误处理。适合复杂武侠流派（如“受击中 20% 概率触发反击”，或“内力不足时自动切到普攻”）。 | ⭐⭐ |

### 1.3 武侠特化建议（UrhoX 移植方案）
武侠战斗区别于 ARPG 的关键在于**“状态资源博弈”**：
1. **身法态**：闪避、跳跃、格挡、受身（需 FSM 管理）。
2. **气劲态**：轻/重/蓄力攻击的连招窗口（可用 `lua-state-machine` 的事件队列 + 输入缓冲实现）。
3. **霸体/硬直**：给状态附加 `priority` 字段，高优先级打断低优先级。参考 `Lua_FSM` 的条件检查。
4. **受击反馈**：复用 `NinjaSnowWar` 的 `RigidBody` 物理脉冲 + `Animation` 受击动画触发。
5. **Hitbox 管理**：Urho3D 的 `Trigger` 碰撞体做技能范围判定；Lua 层维护当前帧活跃的 `ActiveHitbox` 列表，防止同一招式多段伤害重复结算。

### 1.4 推荐落地方案
- **直接采用 `lua-state-machine`** 作为武侠连招骨架（足够轻量、成熟）。
- 在其之上封装一层 `WuxiaCombatFSM`：
  - 状态：`idle` / `light_1` / `light_2` / `light_3` / `heavy_charge` / `heavy_release` / `block` / `dodge` / `hit_stun` / `knockdown`
  - 属性：每个状态挂 `canBeInterruptedBy = {"heavy_release", "knockdown"}` 实现霸体。

---

## 二、经济系统 │ ★★★☆☆ 框架已有，配方表需设计

### 2.1 开源配方/制作系统参考
| 项目 | 语言/平台 | 地址 | 核心能力 | 可借鉴之处 |
|---|---|---|---|---|
| **eco_crafting** | Lua / FiveM | https://github.com/Ekhion76/eco_crafting | 工业级制作系统。支持：配方表、熟练度等级、劳动力消耗、工具分类、成功率、副产品(sideProducts)、蓝图解锁、黑白名单(job限制)。 | 配方 JSON/表结构设计非常完整，可直接迁移到武侠炼丹/锻造。 |
| **esx_minecraft_crafting** | Lua / FiveM | https://github.com/kasuganosoras/esx_minecraft_crafting | 3×3 网格配方（Minecraft 风格），支持固定布局的制作。 | 若你的武侠经济要类似“放置药材到丹炉格子”玩法，这是最佳参考。 |
| **helix-crafting** | Lua / GMod | https://github.com/ZeMysticalTaco/helix-crafting | 极简配方结构：输入材料 + 工具(不消耗) = 输出产物。 | 适合快速原型；可作为最小可行配方系统(MVP)。 |

### 2.2 eco_crafting 配方结构解析（可直接复用的表结构）
```lua
Config.recipes = {
    {
        name = "iron_sword",          -- 产物 ID
        ingredients = {               -- 消耗材料
            { name = "iron_ore", amount = 3, remove = true },
            { name = "hammer",   amount = 1, remove = false }, -- 工具，不消耗
        },
        labor = 5,                    -- 制作耗时/劳动力
        chance = 85,                  -- 成功率(%)
        proficiency = 300,            -- 所需熟练度
        sideProducts = {              -- 副产品
            { name = "slag", amount = 1, chance = 40 },
        },
        whitelist = { "blacksmith" }, -- 门派/职业限制
    }
}
```

### 2.3 武侠经济系统落地方案
建议按 **"五艺体系"** 设计配方表：
| 技艺 | 产出 | 工作台 | 备注 |
|---|---|---|---|
| **锻造** | 武器、护甲、暗器 | 铁砧/熔炉 | 需要矿石 + 木炭 + 锻造锤（工具） |
| **炼丹** | 回血丹、内力丹、毒药 | 丹炉 | 采用 3×3 网格放置更贴合“君臣佐使”配药逻辑 |
| **织造** | 时装、披风、行囊扩容 | 织机 | 可引入丝绸、兽皮等原材料 |
| **烹饪** | 属性增益食物、酒水 | 灶台/篝火 | 产出带时效 Buff |
| **书画** | 武功残页临摹、藏宝图 | 书案 | 可作为技能书/任务道具来源 |

### 2.4 对 UrhoX 的集成建议
- **纯表驱动**：配方数据写在 Lua 表（或 JSON）里，UrhoX Lua 脚本 `require` 后直接在服务端校验。
- **事件化制作流程**：
  1. 客户端发起 `CraftRequest(recipeId, workstationId)`
  2. 服务端 `EconomicManager` 校验材料/熟练度/职业 → 扣减材料 → 进入 `crafting_progress`
  3. 进度完成后发 `CraftResult` 回客户端，附带产物和副产品。
- **持久化**：熟练度与背包数据存 `SQLite`（Urho3D 内置支持）或外部 Redis/DB。

---

## 三、多人社交 │ ★★★★☆ MMO 五大系统已有

### 3.1 UrhoX/rbfx 网络层现状
Urho3D 原生的网络基于 **SLikeNet**（前 RakNet），已封装好：
- `Network` 子系统：`Connect` / `Disconnect` / `CreateServer`
- `Connection` 对象：远程过程调用（RPC）+ 场景复制（Scene Replication）
- `NetworkPriority` 组件：控制场景节点同步频率

rbfx 分支在此基础上做了扩展，社区更活跃，API 基本兼容。

### 3.2 开源 MMO 后端/社交架构参考
| 项目 | 语言 | 地址 | 核心能力 | 与 UrhoX 的配合方式 |
|---|---|---|---|---|
| **NoahGameFrame (NF)** | C++ / Lua | https://github.com/ketoo/NoahGameFrame | 分布式 MMO 服务器引擎，含 Actor 模型、网络库、Lua 脚本热更。 | 可作为 UrhoX 游戏的**独立后端**。UrhoX 客户端用 SLikeNet/自定义协议连接 NF，处理大厅、聊天、公会、组队等大型社交逻辑。 |
| **mmo-rpg (0xVector)** | TypeScript | https://github.com/0xVector/mmo-rpg | 极简浏览器 MMORPG，含 WebSocket 连接管理、同屏刷怪、挂机踢人。 | 学习其**房间/区服管理**与**断线重连**思路，可移植到 UrhoX 服务端脚本。 |
| **Mudlet (客户端参考)** | C++ / Lua | https://www.mudlet.org/ | 高度脚本化的 MUD 客户端，含 GMCP 协议、GUI 包分发、聊天触发器。 | 若你计划做**文字+图形混合**的武侠 MUD，可借鉴其触发器/聊天协议设计。 |

### 3.3 “MMO 五大系统”开源实现思路
通常 MMO 社交五大系统指：**聊天、好友、组队、公会、交易**。以下是基于 UrhoX + 开源组件的实现建议：

| 系统 | 开源参考/实现思路 | 落地建议 |
|---|---|---|
| **聊天** | SLikeNet 的 `MessageID` + 自定义 `ChatMessage` 结构。 | 服务端维护频道列表（世界、门派、队伍、私聊），按 `ZoneID` 或 `GuildID` 广播。 |
| **好友** | 可集成轻量社交后端 **GreenWall** (WoW 公会聊天桥接理念)，或直接在 NF 的 MySQL/Redis 中存 `friend_pairs` 表。 | 双向验证请求 + 在线状态推送（利用 Connection 的心跳）。 |
| **组队** | NF 的 `TeamModule` 有现成 Lua 示例。 | 队长 ID 作为 key，队员列表同步给所有队员；共享击杀经验时由服务端统一结算。 |
| **公会** | NF 的 `GuildModule` / 或 NoahGameFrame 的 `BigMap` 区服架构。 | 公会数据持久化到数据库；公会聊天单独一个广播组。 |
| **交易** | 参考 `eco_crafting` 的物品校验逻辑。 | 双锁机制：A 发起交易 -> B 确认 -> 双方同时锁定物品 -> 服务端原子性交换 -> 通知结果。 |

### 3.4 推荐架构
- **小服（百人左右）**：直接用 UrhoX 自带的 `Network + Server.lua` 处理全部社交逻辑，SQLite 做数据持久化。
- **大服（千人以上）**：将 UrhoX 作为**场景服（战斗+渲染）**，社交/账号/经济走 **NoahGameFrame** 的独立进程，通过 TCP/Protobuf 通信。

---

## 四、程序化地图 │ ★★★★☆ WFC / Perlin / CA 三算法

### 4.1 开源算法库梳理

#### WFC（波函数坍缩）
| 项目 | 语言 | 地址 | 核心能力 | 集成难度 |
|---|---|---|---|---|
| **wfc-lua** | Lua | https://github.com/k-guo/wfc-lua | 纯 Lua 实现的 WFC，支持 Overlapping 模型，可生成无缝纹理/地图块。 | ⭐⭐⭐（算法本身较重，但无需编译） |
| **WaveFunctionCollapse** | C# | https://github.com/mxgmn/WaveFunctionCollapse | WFC 鼻祖项目，含 SimpleTiledModel（适合 Tile 地图）和 OverlappedModel。 | ⭐⭐⭐⭐（需将 C# 逻辑转写成 Lua 或 C++ 插件） |
| **bad-wfc** | Lua | https://github.com/davidbird2d/bad-wfc | 极简 WFC 教学实现，代码短、可读性强。 | ⭐⭐（适合学习后自行裁剪到 UrhoX 场景生成） |

#### Perlin Noise（地形/资源分布）
| 项目 | 语言 | 地址 | 核心能力 | 集成难度 |
|---|---|---|---|---|
| **Urho3D Terrain Demo** | C++ / Lua | 随引擎自带 | Urho3D 官方地形示例，直接使用 `Image` 的 Perlin Noise 生成高度图（Heightmap）。 | ⭐（引擎自带，直接复用） |
| **simplex-noise.lua** | Lua | 多个 Lua gist/仓库 | 纯 Lua Simplex/Perlin 噪声实现，支持多八度叠加、可设定种子。 | ⭐⭐ |

#### Cellular Automata（洞穴/地宫生成）
| 项目 | 语言 | 地址 | 核心能力 | 集成难度 |
|---|---|---|---|---|
| **caverns-lua** | Lua | 多个开源 gist | 经典的“4-5规则”洞穴生成（出生规则 B678/S345678 或自定义）。代码通常 <100 行。 | ⭐（极易移植） |
| **Urho3D Roguelike 示例** | C++ / Lua | 社区论坛/教程 | 在 Urho3D 论坛有数篇 CA 洞穴 + 寻路网格生成的教程。 | ⭐⭐ |

### 4.2 三算法的武侠场景分工建议

| 算法 | 负责的场景层级 | 武侠世界观映射 |
|---|---|---|
| **Perlin Noise** | 大世界地形骨架 | 五岳山脉、江湖河流、门派驻地选址。生成高度图后，在 UrhoX 中作为 `Terrain` 或自定义 Mesh。 |
| **WFC** | 城镇/村落/地宫 Tile 布局 | 用 Simple Tiled Model 定义“民居-街道-广场-围墙”等图块，生成随机城镇或迷宫房间连接。 |
| **Cellular Automata** | 洞穴/古墓/密道内部结构 | 生成有机洞穴后再做“人工修剪”（清零小孤岛、打通主通路），适配武侠寻宝/闭关场景。 |

### 4.3 推荐落地方案（UrhoX 集成链路）
```
大世界生成流程：
Step 1: Perlin Noise (多八度) -> Heightmap (128x128 / 256x256)
Step 2: 根据高度和湿度阈值 ->  biome 表（平地=城镇/农田，山地=矿洞/门派，水域=渡口）
Step 3: 在平地 biome 上运行 WFC (SimpleTiledModel) -> 生成随机城镇/村庄布局
Step 4: 在山地 biome 上运行 CA -> 生成洞穴/地宫结构
Step 5: UrhoX 服务端将生成后的 Tile 数据序列化，同步给客户端做场景 instantiate
```

### 4.4 关键性能提示
- **WFC 在服务器预生成**：WFC 的运行时开销较大，建议作为**离线工具**或**服务端启动时**预生成，生成结果（`Tilemap JSON`）持久化到文件。
- **Perlin Noise 实时 streaming**：对于超大世界，可采用区块（Chunk）方式，根据玩家坐标实时计算并懒加载高度图。
- **CA 后处理不可少**：CA 容易生成孤岛，需要一次 Flood-Fill 找出最大连通区域，修剪其余部分。

---

## 五、总结与技能打包建议

基于以上调研，若你要将这四大系统做成可复用的 **UrhoX TapTap Skill** 包，建议拆分为 4 个独立 Skill：

| Skill 名称 | 覆盖问题 | 推荐依赖的开源项目 |
|---|---|---|
| `urhox-wuxia-combat` | 武侠战斗（FSM + 连招 + 受击） | `lua-state-machine` + `NinjaSnowWar` 物理判定思路 |
| `urhox-economy-crafting` | 经济/配方/制作 | `eco_crafting` 配方表结构 + `esx_minecraft_crafting` 网格配方 |
| `urhox-mmo-social` | 聊天/好友/组队/公会/交易 | `NoahGameFrame` 后端架构 + SLikeNet 广播机制 |
| `urhox-procedural-world` | WFC / Perlin / CA 程序化地图 | `wfc-lua` / `bad-wfc` + 官方 Terrain Demo + `caverns-lua` |

### 下一步行动
1. **若需要现成 Lua 脚本**：可先取 `lua-state-machine`（单文件）+ `eco_crafting` 的配方表结构，直接嵌入 UrhoX 的 `scripts/` 目录。
2. **若需要服务端架构**：部署 NoahGameFrame 作为独立后端，UrhoX 场景服通过 Protobuf 与 NF 通信。
3. **若需要地图生成演示**：先用官方 `Terrain` 示例跑通 Perlin Heightmap，再逐步集成 WFC 城镇与 CA 洞穴。
