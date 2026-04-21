-- main.lua
-- urhox-economy-crafting
-- UrhoX 经济+制作系统统一入口
-- 整合 Inventory、Crafting、Economy、LootTable 四大子系统，提供工厂方法与示例场景

local InventoryMod = require("scripts/Inventory")
local CraftingMod = require("scripts/Crafting")
local EconomyMod = require("scripts/Economy")
local LootMod = require("scripts/LootTable")

local M = {}

-- ============================================================================
-- 子模块暴露
-- ============================================================================
M.Inventory = InventoryMod
M.Crafting = CraftingMod
M.Economy = EconomyMod
M.LootTable = LootMod

-- ============================================================================
-- 快速工厂方法
-- ============================================================================

--- 创建新库存
-- @param opts table {slots=40, maxWeight=100, itemRegistry=ItemRegistry}
-- @return Inventory
function M.CreateInventory(opts)
    return InventoryMod.Inventory.New(opts)
end

--- 创建新物品注册表
function M.CreateItemRegistry()
    return InventoryMod.ItemRegistry.New()
end

--- 创建合成引擎
-- @param inventory Inventory|nil
function M.CreateCraftingEngine(inventory)
    return CraftingMod.CraftingEngine.New(inventory)
end

--- 创建配方
-- @param opts table 配方参数
function M.CreateRecipe(opts)
    return CraftingMod.Recipe.New(opts)
end

--- 创建经济引擎
function M.CreateEconomyEngine()
    return EconomyMod.EconomyEngine.New()
end

--- 创建掉落表
-- @param name string
-- @param mode string "all"|"one_of"|"guaranteed"
function M.CreateLootTable(name, mode)
    return LootMod.LootTable.New(name, mode)
end

--- 创建掉落条目
function M.CreateLootEntry(opts)
    return LootMod.LootEntry.New(opts)
end

-- ============================================================================
-- 高级封装：完整的玩家经济单元 (PlayerEconomyUnit)
-- ============================================================================

local PlayerEconomyUnit = {}
PlayerEconomyUnit.__index = PlayerEconomyUnit

--- 创建玩家经济单元（背包 + 制作 + 交易权限）
-- 这是一个“ batteries included ”的高层封装，适合直接挂载到玩家节点或 NPC
-- @param opts table
function PlayerEconomyUnit.New(opts)
    local self = setmetatable({}, PlayerEconomyUnit)
    opts = opts or {}
    self.playerId = opts.playerId or "player_" .. tostring(math.random(100000))
    self.registry = opts.itemRegistry or M.CreateItemRegistry()
    self.inventory = M.CreateInventory({
        slots = opts.slots or 40,
        maxWeight = opts.maxWeight or 200.0,
        itemRegistry = self.registry,
    })
    self.crafting = M.CreateCraftingEngine(self.inventory)
    self.money = opts.startingMoney or 0.0
    self.tradeListeners = {}
    return self
end

--- 为库存注册物品定义
function PlayerEconomyUnit:RegisterItem(itemId, def)
    self.registry:Register(itemId, def)
end

--- 给玩家增加金钱
function PlayerEconomyUnit:AddMoney(amount)
    if amount <= 0 then return false end
    self.money = self.money + amount
    return true
end

--- 扣除金钱
function PlayerEconomyUnit:SpendMoney(amount)
    if amount <= 0 then return true end
    if self.money >= amount then
        self.money = self.money - amount
        return true
    end
    return false
end

--- 以单价从 NPC/系统购买物品（通过经济引擎获取 NPC 报价）
function PlayerEconomyUnit:BuyItem(itemId, quantity, unitPrice)
    quantity = quantity or 1
    local totalCost = unitPrice * quantity
    if not self:SpendMoney(totalCost) then return false, "insufficient_funds" end
    local added, overflow = self.inventory:AddItem(itemId, quantity)
    if overflow > 0 then
        -- 退款溢出部分
        local refund = unitPrice * overflow
        self:AddMoney(refund)
    end
    return added > 0, "purchased"
end

--- 以单价出售物品给 NPC/系统
function PlayerEconomyUnit:SellItem(itemId, quantity, unitPrice)
    quantity = quantity or 1
    local removed, remain = self.inventory:RemoveItem(itemId, quantity)
    if removed > 0 then
        local income = unitPrice * removed
        self:AddMoney(income)
    end
    return removed > 0, removed, remain
end

--- 注册配方到玩家的个人制作引擎
function PlayerEconomyUnit:RegisterRecipe(recipe)
    self.crafting:RegisterRecipe(recipe)
end

--- 尝试立即制作
function PlayerEconomyUnit:Craft(recipeId, station)
    return self.crafting:Craft(recipeId, nil, station)
end

--- 更新异步制作进度（在主循环调用）
function PlayerEconomyUnit:UpdateCrafting(dt)
    self.crafting:Update(dt)
end

M.PlayerEconomyUnit = PlayerEconomyUnit
M.CreatePlayerEconomyUnit = PlayerEconomyUnit.New

-- ============================================================================
-- 示例数据：武侠 RPG 风格物品、配方、掉落表
-- ============================================================================

function M.SetupDemoWuxiaData(registry, craftingEngine, economyEngine)
    -- 注册基础资源
    local items = {
        ["iron_ore"] = { name = "铁矿石", maxStack = 99, weight = 2.0, category = "material" },
        ["wood"] = { name = "木材", maxStack = 99, weight = 1.0, category = "material" },
        ["herb"] = { name = "草药", maxStack = 99, weight = 0.5, category = "material" },
        ["leather"] = { name = "兽皮", maxStack = 99, weight = 1.5, category = "material" },
        ["spirit_stone"] = { name = "灵石", maxStack = 999, weight = 0.1, category = "currency" },
        ["iron_ingot"] = { name = "铁锭", maxStack = 99, weight = 1.8, category = "material" },
        ["steel_blade"] = { name = "钢剑", maxStack = 1, weight = 8.0, category = "weapon" },
        ["health_pill"] = { name = "回气丹", maxStack = 50, weight = 0.2, category = "consumable" },
        ["light_armor"] = { name = "轻甲", maxStack = 1, weight = 12.0, category = "armor" },
        ["qi_manual"] = { name = "内功心法", maxStack = 1, weight = 0.5, category = "book" },
    }
    for id, def in pairs(items) do
        registry:Register(id, def)
    end

    -- 注册配方
    if craftingEngine then
        craftingEngine:RegisterRecipe(M.CreateRecipe({
            recipeId = "smelt_iron",
            output = { itemId = "iron_ingot", quantity = 1 },
            ingredients = { { itemId = "iron_ore", quantity = 2 } },
            craftTime = 2.0,
            station = "forge",
            returns = {},
        }))
        craftingEngine:RegisterRecipe(M.CreateRecipe({
            recipeId = "craft_steel_blade",
            output = { itemId = "steel_blade", quantity = 1 },
            ingredients = {
                { itemId = "iron_ingot", quantity = 3 },
                { itemId = "wood", quantity = 1 },
            },
            craftTime = 5.0,
            station = "forge",
        }))
        craftingEngine:RegisterRecipe(M.CreateRecipe({
            recipeId = "brew_health_pill",
            output = { itemId = "health_pill", quantity = 3 },
            ingredients = {
                { itemId = "herb", quantity = 2 },
            },
            craftTime = 3.0,
            station = "alchemy",
            returns = { { itemId = "herb", quantity = 1 } }, -- 炼制失败（副产品）返还 1
        }))
        craftingEngine:RegisterRecipe(M.CreateRecipe({
            recipeId = "sew_light_armor",
            output = { itemId = "light_armor", quantity = 1 },
            ingredients = {
                { itemId = "leather", quantity = 5 },
                { itemId = "iron_ingot", quantity = 1 },
            },
            craftTime = 4.0,
            station = "workbench",
        }))
    end

    -- 注册经济条目
    if economyEngine then
        economyEngine:RegisterItem("iron_ore", { basePrice = 10, volatility = 0.03 })
        economyEngine:RegisterItem("iron_ingot", { basePrice = 25, volatility = 0.04 })
        economyEngine:RegisterItem("steel_blade", { basePrice = 150, volatility = 0.08 })
        economyEngine:RegisterItem("health_pill", { basePrice = 30, volatility = 0.05 })
        economyEngine:RegisterItem("light_armor", { basePrice = 200, volatility = 0.06 })
        economyEngine:RegisterItem("spirit_stone", { basePrice = 1, volatility = 0.01, minPrice = 1, maxPrice = 5 })
    end
end

-- ============================================================================
-- 示例：完整构建一个带装备的武侠角色
-- ============================================================================

function M.CreateDemoWuxiaCharacter()
    local unit = M.CreatePlayerEconomyUnit({
        slots = 40,
        maxWeight = 300.0,
        startingMoney = 5000.0,
    })

    local economy = M.CreateEconomyEngine()
    M.SetupDemoWuxiaData(unit.registry, unit.crafting, economy)

    -- 初始装备
    unit.inventory:AddItem("iron_ore", 20)
    unit.inventory:AddItem("wood", 10)
    unit.inventory:AddItem("herb", 15)
    unit.inventory:AddItem("leather", 10)
    unit.inventory:AddItem("spirit_stone", 500)

    return unit, economy
end

-- ============================================================================
-- 示例：怪物掉落表
-- ============================================================================

function M.CreateDemoWuxiaLootTables()
    -- 普通山贼掉落
    local banditLoot = M.CreateLootTable("bandit_loot", "all")
    banditLoot:AddEntry({ itemId = "spirit_stone", weight = 1, minQty = 5, maxQty = 15, chance = 1.0 })
    banditLoot:AddEntry({ itemId = "herb", weight = 1, minQty = 1, maxQty = 3, chance = 0.6 })
    banditLoot:AddEntry({ itemId = "leather", weight = 1, minQty = 1, maxQty = 2, chance = 0.4 })

    -- 小头目掉落（one_of 稀有物品 + 保底铜币）
    local eliteLoot = M.CreateLootTable("elite_loot", "one_of")
    eliteLoot:AddEntry({ itemId = "steel_blade", weight = 1, minQty = 1, maxQty = 1, chance = 0.3 })
    eliteLoot:AddEntry({ itemId = "light_armor", weight = 1, minQty = 1, maxQty = 1, chance = 0.3 })
    eliteLoot:AddEntry({ itemId = "qi_manual", weight = 2, minQty = 1, maxQty = 1, chance = 0.4 })

    -- 嵌套组合：精英必定掉落一部分普通物品 + 一份稀有 one_of
    local combined = M.CreateLootTable("combined_elite", "guaranteed")
    combined:AddEntry({ itemId = "spirit_stone", weight = 1, minQty = 30, maxQty = 50, chance = 1.0 })
    combined:AddEntry({ itemId = "leather", weight = 1, minQty = 2, maxQty = 5, chance = 0.8 })
    combined:AddEntry({ itemId = "rare_drop", weight = 1, minQty = 1, maxQty = 1, chance = 1.0, isNestedTable = true })
    combined:RegisterSubTable("rare_drop", eliteLoot)

    return banditLoot, eliteLoot, combined
end

-- ============================================================================
-- 运行自检测试（控制台输出）
-- ============================================================================

function M.RunSelfTest()
    print("=== urhox-economy-crafting Self Test ===")

    local unit, economy = M.CreateDemoWuxiaCharacter()
    print(string.format("创建角色，初始金钱: %.0f", unit.money))

    -- 测试库存
    local ironCount = unit.inventory:GetItemCount("iron_ore")
    print(string.format("铁矿石数量: %d", ironCount))

    -- 测试制作
    unit:Craft("craft_steel_blade", "forge")
    print(string.format("尝试在 forge 制作钢剑（未满足）: %s", tostring(unit.inventory:HasItem("steel_blade", 1))))
    -- 先冶炼铁锭
    unit:Craft("smelt_iron", "forge")
    unit:Craft("smelt_iron", "forge")
    unit:Craft("smelt_iron", "forge")
    -- 再制作剑
    local ok = unit:Craft("craft_steel_blade", "forge")
    print(string.format("冶炼后制作钢剑成功: %s", tostring(ok)))

    -- 测试经济价格
    economy:UpdatePrices(1.0)
    local priceBlade = economy:GetPrice("steel_blade")
    print(string.format("钢剑当前市场价格: %.2f", priceBlade or 0))

    -- 测试交易
    unit:SellItem("steel_blade", 1, priceBlade)
    print(string.format("出售后金钱: %.2f", unit.money))

    -- 测试掉落
    local _, _, combined = M.CreateDemoWuxiaLootTables()
    local drops = combined:Roll({ level = 10, tags = {"boss"} })
    print("精英怪物掉落:")
    for _, d in ipairs(drops) do
        print(string.format("  %s x%d", d.itemId, d.quantity))
    end

    print("=== Self Test Complete ===")
end

return M
