# UrhoX 经济+制作系统（urhox-economy-crafting）

UrhoX 引擎专用的完整经济/制作/库存/掉落一体化解决方案。本技能整合了来自多个成熟开源项目的实践经验，面向 RPG、武侠、生存、MMO 等高复杂度游戏类型，提供可直接挂载到玩家节点或 NPC 节点上的高层封装，真正做到 **开箱即用**。涵盖背包槽位系统、重量限制、无网格配方制作、异步 craft 进度、动态供需价格、加权掉落表、嵌套子表、条件过滤等高级特性。

---

## 目录

1. [核心特性](#核心特性)
2. [适用场景与触发关键词](#适用场景与触发关键词)
3. [安装方式](#安装方式)
4. [系统架构图（文字版）](#系统架构图文字版)
5. [开源参考调研](#开源参考调研)
6. [快速开始](#快速开始)
7. [子系统详解](#子系统详解)
   - [Inventory 背包库存](#inventory-背包库存)
   - [Crafting 制作合成](#crafting-制作合成)
   - [Economy 经济交易](#economy-经济交易)
   - [LootTable 掉落表](#loottable-掉落表)
8. [API 文档](#api-文档)
9. [完整代码示例](#完整代码示例)
10. [最佳实践与 FAQ](#最佳实践与-faq)
11. [版本记录](#版本记录)

---

## 核心特性

### Inventory 背包库存
- **槽位管理**：支持任意数量的格子，独立存储每个格子的 `itemId`、`quantity`、`metadata`。
- **重量系统**：可设定 `maxWeight`，每次增减自动重算总重，超重的物品会被拒绝放入并触发 `onOverflow` 事件。
- **堆叠与拆分**：支持 `maxStack`、`canStack` 配置；提供 `SplitStack`、`MergeSlots` 方法。
- **元数据物品**：同一 `itemId` 可携带不同 `metadata`（如附魔、耐久、品质），系统会自动区分是否可堆叠。
- **事件驱动**：`onChanged`（任意槽位变化）、`onOverflow`（放不下或超重）、`onWeightChanged`（重量变更）。
- **序列化/反序列化**：完整支持存档读写，可配合 `uhrox-save-system` 持久化玩家数据。

### Crafting 制作合成
- **无网格配方**：受 `simplecrafting_lib` 启发，配方只看原料种类与数量，无需关心摆放形状，更适合 RPG/武侠风格。
- **制作站限制**：通过 `station` 字段限定只能在特定工作台/铁匠铺/炼丹炉执行。
- **异步制作**：支持带 `craftTime` 的进度条制作，引擎提供 `StartCraft`、`Update`、`GetCraftProgress`。
- **副产品返回**：配料中的燃料、容器可通过 `returns` 在制作完成后返回给玩家。
- **批量合成**：`CraftBatch` 一键连续制作直到原料耗尽。

### Economy 经济交易
- **动态价格模型**：基于供需差（`demand - supply`）与波动性（`volatility`）实时调整价格，并引入弹性回归力，避免价格无限偏离。
- **全球通胀参数**：通过 `SetGlobalInflation` 模拟货币贬值或紧缩。
- **简化订单簿**：支持 `PlaceBuyOrder` / `PlaceSellOrder` / `FulfillOrders`，可在玩家之间或玩家与系统之间撮合交易。
- **NPC 报价**：`GetNPCQuotes` 基于市场价自动生成带买卖差价（spread）的收购价与出售价。
- **市场价格历史**：每条价格变动都被记录，可用于 UI 折线图展示。

### LootTable 掉落表
- **加权抽取**：受 `GrimoireDevelopmentKit` 与 `Lootables` 启发，使用累积权重+二分查找实现高效 `Roll`。
- **多模式掉落**：`all`（每项独立判定）、`one_of`（稀有物品单选）、`guaranteed`（必掉全部）。
- **数量区间**：`minQty ~ maxQty` 随机生成掉落数量。
- **条件过滤**：可基于玩家等级、怪物标签、自定义函数进行过滤。
- **嵌套子表**：支持将一个 `LootTable` 注册为另一个表的子表，实现多层稀有度结构（普通→精英→传说）。

---

## 适用场景与触发关键词

**适用场景**：
- 武侠/修仙 RPG 中的炼丹、锻造、缝纫系统
- 生存类游戏（如饥荒、方舟风格）的资源采集与合成
- MMO 中的玩家交易行、摆摊、拍卖行
- Roguelike 的怪物掉落与宝箱奖励
- 任何需要背包+制作+交易+掉落的 UrhoX 项目

**触发关键词**：
- `urhox`、`economy`、`crafting`、`inventory`、`loot`、`trading`、`market`、`recipe`、`背包`、`合成`、`掉落表`、`交易行`、`配方`、`经济系统`、`制作系统`

---

## 安装方式

1. 将本技能文件夹（`urhox-economy-crafting/`）放入你的 UrhoX 项目 `Skills/` 或 `Scripts/` 目录下。
2. 在引擎启动脚本或 `main.lua` 中引入：
   ```lua
   local Econ = require("skills/urhox-economy-crafting/scripts/main")
   ```
3. 按需调用工厂方法（见下节）。无需额外依赖，纯 Lua 实现。

---

## 系统架构图（文字版）

```
┌─────────────────────────────────────────────────────────────────┐
│                    PlayerEconomyUnit                            │
│  (玩家/NPC 经济单元：封装了背包+制作+交易权限的高层对象)           │
└──────────────────┬──────────────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┬──────────────┐
    ▼              ▼              ▼              ▼
┌────────+  ┌──────────+  ┌──────────+  ┌──────────+
│Inventory │  │ Crafting │  │ Economy  │  │LootTable │
│背包系统   │  │ 制作引擎  │  │ 交易市场  │  │ 掉落表   │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │             │
     ▼             ▼             ▼             ▼
┌──────────+  ┌──────────+  ┌──────────+  ┌──────────+
│ItemRegistry│  │ Recipe   │  │MarketItem│  │LootEntry │
│物品定义库  │  │ 配方定义  │  │ 交易品   │  │ 掉落条目  │
└───────────┘  └──────────┘  └──────────┘  └──────────┘

数据流示例（杀怪→掉落→进背包→制作→卖市场）：

  Monster Kill
       │
       ▼
  LootTable:Roll() ──► Inventory:AddItem() ──► Crafting:Craft()
       │                                              │
       │                                              ▼
       │                                   Economy:RecordTransaction()
       │                                              │
       └──────────────────────────────────────────────┘
```

---

## 开源参考调研

本技能在设计与实现过程中，深度参考并整合了以下 5 个开源项目与技术方案的优点：

### 1. lewark/inv.lua（CC:Tweaked 库存管理系统）
- **项目地址**：`https://github.com/lewark/inv.lua`
- **核心贡献**：提供了 Minecraft ComputerCraft 生态下最成熟的 Lua 库存管理方案。包括：
  - 基于有线网络（wired modem）的多箱子统一视图；
  - 配方以 JSON 配置化，支持冶炼炉、工作台等外部机器；
  - `tags`（矿物词典）匹配，使原料可互相替代。
- **在本技能中的体现**：
  - `Inventory.lua` 的槽位-物品-数量三元组数据结构；
  - `Crafting.lua` 的配方 `ingredients` / `output` / `returns` 字段设计；
  - 未来可扩展 OreDictionary / Tag 替代原料机制（当前版本预留了 metadata 接口）。

### 2. simplecrafting_lib（Minetest 无网格合成库）
- **项目地址**：`https://github.com/minetest-mods/simplecrafting_lib`
- **核心贡献**：彻底抛弃了 Minecraft/Minetest 传统的 3×3 形状敏感合成网格，提出 **shapeless crafting**（形状无关合成）概念。
- **在本技能中的体现**：
  - `Crafting.lua` 的配方只需要 `ingredients` 列表，无需记录任何网格坐标；
  - 支持 `returns` 副产品返回（如岩浆桶冶炼黑曜石后返还空桶）；
  - 支持 `station` 工作台类型（`table`、`furnace`、`alchemy` 等）。

### 3. ox_inventory / QC-Crafting（FiveM/RedM  crafting 实践）
- **项目地址**：`https://github.com/overextended/ox_inventory`
- **核心贡献**：现代 GTA/FiveM 服务器中最流行的 slot-based inventory， crafting 完全通过 Lua table 配置，支持进度条、制作动画、多工作站。
- **在本技能中的体现**：
  - `Inventory.lua` 支持 `metadata`（物品耐久、品质、序列号）；
  - `Crafting.lua` 的异步 `StartCraft` + `Update(dt)` 模式，天然适配 FiveM 风格的进度条 UI；
  - 制作台（`station`）与配方绑定的设计思路。

### 4. GrimoireDevelopmentKit / Lootables（RPG 掉落表框架）
- **项目地址**（参考博客与 StackExchange 讨论）：`https://gamedev.stackexchange.com/questions/140979/modern-loot-table-concepts`
- **核心贡献**：展示了现代商业化 MMO 常用的 **累积权重+二分查找** 掉落算法，以及嵌套列表（`LootTableList`）结构。
- **在本技能中的体现**：
  - `LootTable.lua` 的 `one_of` 模式采用累积权重表，`Roll` 时使用 `BinarySearch` 将时间复杂度降到 O(log n)；
  - 引入 `chance` 独立概率（每个条目先判定是否进入候选池），再执行 `weight` 加权抽取；
  - 支持嵌套子表 `RegisterSubTable`。

### 5. Virtual Economic Theory: How MMOs Really Work（Gamasutra 经典文章）
- **参考来源**：Game Developer (原 Gamasutra) 虚拟经济系列
- **核心贡献**：系统阐述了 MMO 经济中的时间价值、机会成本、供需曲线、通胀控制、市场深度等理论。
- **在本技能中的体现**：
  - `Economy.lua` 的价格波动公式融合了供需差与弹性回归力；
  - `globalInflation` 参数模拟央行货币政策；
  - `InjectLiquidity` 用于系统回收与放水；
  - 订单簿的撮合逻辑遵循标准经济学中的“买方按出价降序、卖方按要价升序”规则。

---

## 快速开始

### 步骤 1：引入主模块

```lua
local Econ = require("skills/urhox-economy-crafting/scripts/main")
```

### 步骤 2：创建玩家经济单元

```lua
local player = Econ.CreatePlayerEconomyUnit({
    slots = 48,
    maxWeight = 350.0,
    startingMoney = 2000.0,
})
```

### 步骤 3：注册物品与配方

```lua
-- 注册一把剑
player:RegisterItem("iron_sword", {
    name = "铁剑",
    maxStack = 1,
    weight = 6.0,
    category = "weapon",
})

-- 注册配方
player:RegisterRecipe(Econ.CreateRecipe({
    recipeId = "make_iron_sword",
    output = { itemId = "iron_sword", quantity = 1 },
    ingredients = {
        { itemId = "iron_ingot", quantity = 4 },
        { itemId = "wood", quantity = 2 },
    },
    craftTime = 3.0,
    station = "forge",
}))
```

### 步骤 4：执行制作

```lua
-- 立即制作（原料足够且身处 forge 时返回 true）
local ok, product = player:Craft("make_iron_sword", "forge")
if ok then
    print("成功制作出: " .. product.itemId)
end
```

### 步骤 5：创建掉落表并抽取

```lua
local loot = Econ.CreateLootTable("goblin_loot", "all")
loot:AddEntry({ itemId = "spirit_stone", minQty = 1, maxQty = 5, chance = 1.0 })
loot:AddEntry({ itemId = "iron_ingot", minQty = 1, maxQty = 2, chance = 0.4 })

local drops = loot:Roll({ level = 5 })
for _, d in ipairs(drops) do
    player.inventory:AddItem(d.itemId, d.quantity)
end
```

---

## 子系统详解

### Inventory 背包库存

#### 设计哲学
`Inventory` 是一个纯数据驱动的槽位集合，不依赖 UrhoX 的任何渲染或节点系统，因此可以放在服务端运行，也可以放在客户端做本地预览。每个槽位独立存在，通过 `contents[slotIndex]` 存取。

#### 重量计算
重量采用 **实时缓存+事件驱动重算** 策略：每次 `AddItem`、`RemoveItem`、`SetSlot`、`ClearSlot`、`SwapSlots` 都会触发 `_RecalcWeight`，将当前所有槽位重量求和并缓存到 `_cacheWeight`。这样 `GetTotalWeight` 是 O(1) 查询。

#### 元数据匹配规则
`FindStackableSlots`、`HasItem`、`RemoveItem` 均支持传入 `metadata` 进行精确匹配。匹配规则为：传入的 `metadata` 中每一个 `key-value` 都与槽位中对应值一致，即视为匹配。没有传入 `metadata` 时则只看 `itemId`。

#### 事件回调签名
```lua
inventory:On("onChanged", function(inv, slotA, slotB)
    -- slotA/slotB 在批量变化时可能为 nil
end)

inventory:On("onOverflow", function(inv, itemId, remainder, metadata)
    -- remainder 是未能放入的数量
end)

inventory:On("onWeightChanged", function(inv, currentWeight, maxWeight)
end)
```

---

### Crafting 制作合成

#### 设计哲学
配方系统采用 **Shapeless（形状无关）** 设计，只要背包中有足够数量的指定原料即可触发制作。非常适合武侠/修仙题材中的炼丹、锻造、烹饪等不需要“拼图”的场景。

#### 两种制作模式
1. **立即模式** `Craft`:
   扣除原料、立即产出，适合 `craftTime == 0` 的配方。
2. **异步模式** `StartCraft` + `Update(dt)`:
   先扣除原料，进入制作队列，每帧推进进度，完成后产出。支持 `CancelCraft` 取消并返还原料。

#### 配方站（Station）
`station` 字段为可选字符串。若配方指定了 `station = "forge"`，则只有在当前 `station` 参数也为 `"forge"` 时才能制作。未指定 `station` 的配方则在任何地方都可制作。

#### 副产品（Returns）
`returns` 数组在制作完成后通过 `inventory:AddItem` 返还给玩家。典型用途：
- 炼丹炉燃烧后返还空容器；
- 魔法附魔后返还未用完的卷轴。

---

### Economy 经济交易

#### 设计哲学
经济的本质不是价格本身，而是 **供需关系**。本经济引擎参考了 EVE Online 与 MMO 虚拟经济理论，使用轻量化的供需差模型来驱动价格波动。

#### 核心价格公式
`currentPrice` 的更新发生在 `UpdatePrices(dt)` 中：

```
imbalance = demand - supply
changeRate = imbalance * volatility * dt * 0.01 * timeScale
deviation = (currentPrice - basePrice) / basePrice
restoreForce = -deviation * 0.05 * dt * elasticity
currentPrice = currentPrice * (1.0 + changeRate + restoreForce)
currentPrice = clamp(currentPrice, minPrice, maxPrice)
```

- `imbalance` 越大，价格波动越快；
- `deviation` 使价格始终有回归 `basePrice` 的趋势，避免单边极端；
- `globalInflation` 在最后获取价格时才乘上去，模拟全局货币购买力变化。

#### 订单簿撮合逻辑
`FulfillOrders` 会对每个 `itemId` 分别处理：
1. 将买单按 `unitPrice` **降序** 排列；
2. 将卖单按 `unitPrice` **升序** 排列；
3. 只要最高买价 ≥ 最低卖价，就成交；
4. 成交价取两者均价，数量取最小值；
5. 成交后自动调用 `RecordTransaction`，驱动供需变化，进而影响下一次 `UpdatePrices`。

---

### LootTable 掉落表

#### 设计哲学
掉落系统参考了商业化 RPG 的 Lootables 与 GrimoireDevelopmentKit，强调 **可读性、可扩展性、高性能**。通过将权重预处理为累积数组，并在 Roll 时使用二分查找，即使面对上百条掉落条目也能保持微秒级响应。

#### 三种掉落模式对比

| 模式 | 行为描述 | 适用场景 |
|------|---------|---------|
| `all` | 每个条目独立判定 `chance`，通过的都会掉落 | 普通小怪的一般掉落 |
| `one_of` | 所有通过 `chance` 的条目进入候选池，按 `weight` 抽取唯一一个 | 稀有装备、Boss 专属 |
| `guaranteed` | 所有满足条件的条目 100% 掉落，无视 `chance` | 首杀奖励、任务必掉 |

#### 嵌套子表
你可以将多个 `LootTable` 组合成树状结构：

```lua
local rareTable = Econ.CreateLootTable("rare_gear", "one_of")
rareTable:AddEntry({ itemId = "legendary_sword", weight = 1 })
rareTable:AddEntry({ itemId = "epic_armor", weight = 2 })

local bossTable = Econ.CreateLootTable("boss_loot", "guaranteed")
bossTable:AddEntry({ itemId = "gold", minQty = 100, maxQty = 200 })
bossTable:AddEntry({ itemId = "rare_pool", isNestedTable = true })
bossTable:RegisterSubTable("rare_pool", rareTable)
```

这样每次击杀 Boss 都会稳定掉落金币，并额外从 `rare_gear` 中按权重抽取一件装备。

---

## API 文档

### InventoryMod（`scripts/Inventory.lua`）

#### `InventoryMod.ItemRegistry.New()` → `ItemRegistry`
创建物品定义注册表。

#### `ItemRegistry:Register(itemId, def)`
注册或更新物品定义。`def` 字段：
- `name` (string): 显示名称
- `maxStack` (number): 最大堆叠，默认 64
- `weight` (number): 单件重量，默认 0
- `category` (string): 分类
- `canStack` (boolean): 是否可堆叠，默认 true

#### `ItemRegistry:GetDef(itemId)` → `table|nil`
返回物品定义的浅拷贝。

#### `ItemRegistry:Has(itemId)` → `boolean`

#### `InventoryMod.Inventory.New(opts)` → `Inventory`
`opts` 可选字段：
- `slots` (number): 槽位数，默认 40
- `maxWeight` (number): 最大负重，默认无穷大
- `itemRegistry` (ItemRegistry): 外部注册表实例

#### `Inventory:AddItem(itemId, quantity, metadata)` → `added, overflow`
自动堆叠/找空槽放置。`overflow` 为未能放入的数量（触发 `onOverflow`）。

#### `Inventory:RemoveItem(itemId, quantity, metadata)` → `removed, remain`

#### `Inventory:HasItem(itemId, quantity, metadata)` → `boolean`

#### `Inventory:GetItemCount(itemId, metadata)` → `number`

#### `Inventory:GetSlot(index)` → `table|nil`
返回深拷贝后的槽位数据。

#### `Inventory:SetSlot(index, item)` → `boolean`
低级直接写入。

#### `Inventory:FindEmptySlot()` → `number|nil`

#### `Inventory:SwapSlots(a, b)` → `boolean`

#### `Inventory:SplitStack(fromSlot, amount, toSlot)` → `boolean`
`toSlot` 为 nil 时自动找空槽。

#### `Inventory:MergeSlots(fromSlot, toSlot)` → `boolean`
ItemId 与 metadata 完全一致且未超堆叠上限时合并。

#### `Inventory:ClearSlot(index)` → `oldItem|nil`

#### `Inventory:GetTotalWeight()` → `number`

#### `Inventory:GetRemainingWeight()` → `number`

#### `Inventory:Serialize()` → `table`

#### `Inventory:Deserialize(data)`

---

### CraftingMod（`scripts/Crafting.lua`）

#### `CraftingMod.Recipe.New(opts)` → `Recipe`
`opts` 字段：
- `recipeId` (string)
- `output` = `{ itemId, quantity, metadata? }`
- `ingredients` = `{ { itemId, quantity, metadata? }, ... }`
- `craftTime` (number): 秒
- `station` (string|nil)
- `returns` = `{ { itemId, quantity }, ... }`
- `skillLevel` (number)

#### `CraftingMod.CraftingEngine.New(inventory)` → `CraftingEngine`

#### `CraftingEngine:RegisterRecipe(recipe)`

#### `CraftingEngine:UnregisterRecipe(recipeId)`

#### `CraftingEngine:GetAllRecipes()` → `table`

#### `CraftingEngine:GetRecipesByStation(station)` → `table`

#### `CraftingEngine:CanCraft(recipe, inventory, station)` → `boolean`

#### `CraftingEngine:GetAvailableRecipes(inventory, station)` → `table`

#### `CraftingEngine:Craft(recipe, inventory, station)` → `boolean, output|reason`

#### `CraftingEngine:StartCraft(recipe, inventory, station)` → `handle|nil`
返回异步制作句柄。

#### `CraftingEngine:Update(dt)`
应在主循环调用。

#### `CraftingEngine:GetCraftProgress(handle)` → `number|nil`
返回 0~1 的进度值。

#### `CraftingEngine:CancelCraft(handle)` → `boolean`
取消并返还原料。

#### `CraftingEngine:CraftBatch(recipe, inventory, station, maxCount)` → `count, totalYield`
`totalYield` 为 `{ [itemId] = quantity }` 的汇总表。

---

### EconomyMod（`scripts/Economy.lua`）

#### `EconomyMod.EconomyEngine.New()` → `EconomyEngine`

#### `EconomyEngine:RegisterItem(itemId, opts)`
`opts` 字段：`basePrice`、`volatility`、`minPrice`、`maxPrice`、`elasticity`。

#### `EconomyEngine:GetItem(itemId)` → `table|nil`

#### `EconomyEngine:GetPrice(itemId)` → `number|nil`
已包含 `globalInflation` 加成。

#### `EconomyEngine:ShiftSupplyDemand(itemId, deltaSupply, deltaDemand)`
直接修改供需值。

#### `EconomyEngine:RecordTransaction(itemId, quantity, unitPrice, buyerId, sellerId)` → `boolean`

#### `EconomyEngine:InjectLiquidity(itemId, quantity, isBuy)`
系统级放水/回收。

#### `EconomyEngine:UpdatePrices(dt)`

#### `EconomyEngine:SetGlobalInflation(rate)`

#### `EconomyEngine:PlaceBuyOrder(itemId, buyerId, quantity, unitPrice)` → `orderId`

#### `EconomyEngine:PlaceSellOrder(itemId, sellerId, quantity, unitPrice)` → `orderId`

#### `EconomyEngine:CancelOrder(orderId)` → `boolean`

#### `EconomyEngine:FulfillOrders()` → `matches`
返回撮合结果数组。

#### `EconomyEngine:GetOrderBook(itemId)` → `{ buys={}, sells={} }`

#### `EconomyEngine:GetMarketSnapshot()` → `table`
按 `currentPrice` 排序的市场全景数组。

#### `EconomyEngine:GetPriceHistory(itemId, limit)` → `table`

#### `EconomyEngine:GetNPCQuotes(itemId)` → `{ buyPrice, sellPrice }|nil`

---

### LootMod（`scripts/LootTable.lua`）

#### `LootMod.LootEntry.New(opts)` → `LootEntry`
`opts` 字段：
- `itemId` (string)
- `weight` (number, 默认 1)
- `minQty` / `maxQty`
- `chance` (0~1)
- `conditions` (table)
- `isNestedTable` (boolean)

#### `LootMod.LootTable.New(name, mode)` → `LootTable`
`mode` 为 `"all"`、`"one_of"`、`"guaranteed"`。

#### `LootTable:AddEntry(opts)` → `LootEntry`

#### `LootTable:RegisterSubTable(tableId, subTable)`

#### `LootTable:Roll(context)` → `{ {itemId, quantity}, ... }`

#### `LootTable:RollMultiple(count, context)` → `{ {itemId, quantity}, ... }`

#### `LootTable:ToProbabilityMap(context)` → `string`
调试用的文本表示。

---

## 完整代码示例

### 示例 1：武侠铁匠铺（完整背包+制作+交易）

```lua
local Econ = require("skills/urhox-economy-crafting/scripts/main")

-- 创建玩家
local hero = Econ.CreatePlayerEconomyUnit({
    slots = 40,
    maxWeight = 300,
    startingMoney = 1000,
})

-- 注册物品
hero:RegisterItem("iron_ore", { name = "铁矿石", maxStack = 99, weight = 2.0 })
hero:RegisterItem("iron_ingot", { name = "铁锭", maxStack = 99, weight = 1.8 })
hero:RegisterItem("steel_sword", { name = "精钢剑", maxStack = 1, weight = 7.0 })

-- 注册配方
hero:RegisterRecipe(Econ.CreateRecipe({
    recipeId = "smelt",
    output = { itemId = "iron_ingot", quantity = 1 },
    ingredients = { { itemId = "iron_ore", quantity = 2 } },
    craftTime = 2,
    station = "forge",
}))

hero:RegisterRecipe(Econ.CreateRecipe({
    recipeId = "forge_sword",
    output = { itemId = "steel_sword", quantity = 1 },
    ingredients = {
        { itemId = "iron_ingot", quantity = 4 },
    },
    craftTime = 5,
    station = "forge",
}))

-- 给予初始资源
hero.inventory:AddItem("iron_ore", 20)

-- 在 forge 处冶炼
local ok1 = hero:Craft("smelt", "forge")
local ok2 = hero:Craft("smelt", "forge")
local ok3 = hero:Craft("smelt", "forge")
local ok4 = hero:Craft("forge_sword", "forge")
print("造剑成功?", ok4)

-- 建立市场经济
local market = Econ.CreateEconomyEngine()
market:RegisterItem("steel_sword", { basePrice = 200, volatility = 0.05 })
market:UpdatePrices(1.0)

local price = market:GetPrice("steel_sword")
hero:SellItem("steel_sword", 1, price)
print("卖剑后金钱:", hero.money)
```

### 示例 2：异步炼丹系统（带进度条）

```lua
local Econ = require("skills/urhox-economy-crafting/scripts/main")
local hero = Econ.CreatePlayerEconomyUnit({ slots = 30, maxWeight = 100 })
hero:RegisterItem("herb", { name = "草药", maxStack = 99, weight = 0.2 })
hero:RegisterItem("elixir", { name = "筑基丹", maxStack = 20, weight = 0.1 })

hero:RegisterRecipe(Econ.CreateRecipe({
    recipeId = "make_elixir",
    output = { itemId = "elixir", quantity = 1 },
    ingredients = { { itemId = "herb", quantity = 3 } },
    craftTime = 10.0,
    station = "alchemy",
}))

hero.inventory:AddItem("herb", 12)

-- 开始异步炼丹
local handle = hero.crafting:StartCraft("make_elixir", nil, "alchemy")

-- 在 Update 循环中推进
function Update(dt)
    hero:UpdateCrafting(dt)
    if handle then
        local p = hero.crafting:GetCraftProgress(handle)
        if p then
            print("炼丹进度:", math.floor(p * 100) .. "%")
        else
            print("炼丹完成！")
            handle = nil
        end
    end
end
```

### 示例 3：动态玩家交易行（挂单撮合）

```lua
local Econ = require("skills/urhox-economy-crafting/scripts/main")
local market = Econ.CreateEconomyEngine()
market:RegisterItem("iron_ingot", { basePrice = 50, volatility = 0.03 })

-- 玩家 A 想低价收购
market:PlaceBuyOrder("iron_ingot", "player_A", 10, 45)

-- 玩家 B 想高价出售
market:PlaceSellOrder("iron_ingot", "player_B", 5, 55)
-- 无法撮合（45 < 55）

-- 玩家 C 平价出售
market:PlaceSellOrder("iron_ingot", "player_C", 8, 44)
-- 可以撮合：A 出价 45 >= C 要价 44

local matches = market:FulfillOrders()
for _, m in ipairs(matches) do
    print(string.format(
        "%s 从 %s 买入 %d 个 %s，单价 %.1f",
        m.buyOrder.buyerId, m.sellOrder.sellerId,
        m.tradeQty, m.itemId, m.tradePrice
    ))
end
-- 价格会因交易记录而微涨
market:UpdatePrices(1.0)
```

### 示例 4：多层嵌套 Boss 掉落

```lua
local Econ = require("skills/urhox-economy-crafting/scripts/main")

-- 传说装备池
local legendary = Econ.CreateLootTable("legendary", "one_of")
legendary:AddEntry({ itemId = "dragon_slayer", weight = 1 })
legendary:AddEntry({ itemId = "phoenix_plate", weight = 1 })
legendary:AddEntry({ itemId = "titan_shield", weight = 1 })

-- 精英装备池
local epic = Econ.CreateLootTable("epic", "one_of")
epic:AddEntry({ itemId = "rare_ring", weight = 3 })
epic:AddEntry({ itemId = "magic_amulet", weight = 2 })
epic:AddEntry({ itemId = "legendary_pool", weight = 1, isNestedTable = true })
epic:RegisterSubTable("legendary_pool", legendary)

-- 世界 Boss 必掉金币 + 精英池抽取
local worldBoss = Econ.CreateLootTable("world_boss", "guaranteed")
worldBoss:AddEntry({ itemId = "gold", minQty = 500, maxQty = 1000 })
worldBoss:AddEntry({ itemId = "epic_pool", weight = 1, isNestedTable = true })
worldBoss:RegisterSubTable("epic_pool", epic)

local drops = worldBoss:Roll({ level = 50, tags = {"raid"} })
for _, d in ipairs(drops) do
    print(d.itemId, "x", d.quantity)
end
```

---

## 最佳实践与 FAQ

### Q1: 如何在 UrhoX 的 `Update(dt)` 中同时更新多个玩家的 crafting？

**A**: 维护一个玩家数组，在主循环统一调用：
```lua
for _, p in ipairs(activePlayers) do
    p:UpdateCrafting(dt)
end
```

### Q2: 我想让某些物品不可堆叠但允许携带多个（如武器装备），怎么办？

**A**: 在 `ItemRegistry` 中将 `canStack` 设为 `false`、`maxStack` 保持为 `1`。每次 `AddItem` 会自动占用新槽位。

### Q3: 经济引擎的价格会不会无限上涨？

**A**: 不会。价格波动公式中包含 **弹性回归力**（`restoreForce`），价格偏离 `basePrice` 越远，回归趋势越强；此外还有 `minPrice` / `maxPrice` 硬边界。

### Q4: 是否需要随机种子？

**A**: `LootTable.lua` 使用标准 `math.random()`，建议在游戏启动时调用 `math.randomseed(os.time())` 以保证随机性。

### Q5: 物品注册表应该在全局共享还是每个玩家一份？

**A**: **强烈建议共享**。将同一个 `ItemRegistry` 实例传给所有玩家和 NPC 的 `Inventory`，这样可以统一管理所有物品定义，后续修改也只需改一处。

### Q6: 如何与 UI 层（如 NanoVG）对接？

**A**: 这是一个纯数据层技能。你可以：
- 遍历 `inventory.contents` 绘制格子；
- 监听 `onWeightChanged` 更新负重条；
- 通过 `crafting:GetCraftProgress(handle)` 绘制进度条；
- 通过 `economy:GetPriceHistory(itemId, 50)` 绘制 K 线图。

### Q7: 掉落表的 `conditions` 支持哪些字段？

**A**: 内置支持 `minLevel`、`maxLevel`、`tags`（数组交集判定），以及 `customFn`（传入任意函数做复杂判定）。

---

## 版本记录

### v1.0.0
- 初始发布
- 集成 Inventory、Crafting、Economy、LootTable 四大子系统
- 提供 `PlayerEconomyUnit` 高层封装
- 内置武侠 RPG 示例数据（`SetupDemoWuxiaData`、`CreateDemoWuxiaCharacter`、`CreateDemoWuxiaLootTables`）
- 提供 `RunSelfTest` 自检测试

---

**设计理念**：代码即文档。所有 Lua 源文件均配有详细中文注释，API 参数、返回值、异常处理一目了然。若在使用过程中发现任何 bug 或有功能扩展需求，欢迎在项目 issue 区反馈。
