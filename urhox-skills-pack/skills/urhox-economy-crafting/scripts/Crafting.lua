-- Crafting.lua
-- urhox-economy-crafting 制作/合成系统
-- 参考：simplecrafting_lib（Minetest 网格无关合成）、ox_inventory crafting、lewark/inv.lua 配方格式
-- 特性：无网格形状无关配方、 crafting station 限制、制作时间、副产品返回、批量合成

local M = {}

-- ============================================================================
-- 工具函数
-- ============================================================================
local function DeepCopy(t)
    local copy = {}
    for k, v in pairs(t) do
        if type(v) == "table" then
            copy[k] = DeepCopy(v)
        else
            copy[k] = v
        end
    end
    return copy
end

local function TableEqual(a, b)
    if a == b then return true end
    if type(a) ~= "table" or type(b) ~= "table" then return false end
    for k, v in pairs(a) do
        if type(v) == "table" then
            if not TableEqual(b[k], v) then return false end
        else
            if b[k] ~= v then return false end
        end
    end
    for k, v in pairs(b) do
        if a[k] == nil then return false end
    end
    return true
end

-- ============================================================================
-- Recipe 配方定义
-- ============================================================================

local Recipe = {}
Recipe.__index = Recipe

--- 创建配方
-- @param opts table
--   recipeId: string 配方唯一ID
--   output: {itemId, quantity, metadata}
--   ingredients: {{itemId, quantity, metadata?}, ...}
--   craftTime: number (默认 0)
--   station: string|nil 限定制作台（如 "forge","alchemy"）
--   returns: {{itemId, quantity}, ...} 副产品
--   skillLevel: number 所需技能等级（可选）
-- @return Recipe
function Recipe.New(opts)
    local self = setmetatable({}, Recipe)
    self.recipeId = opts.recipeId or ("recipe_" .. tostring(math.random(100000)))
    self.output = DeepCopy(opts.output) or { itemId = "unknown", quantity = 1 }
    self.ingredients = DeepCopy(opts.ingredients) or {}
    self.craftTime = opts.craftTime or 0.0
    self.station = opts.station or nil
    self.returns = DeepCopy(opts.returns) or {}
    self.skillLevel = opts.skillLevel or 0
    return self
end

M.Recipe = Recipe

-- ============================================================================
-- CraftingEngine 合成引擎
-- ============================================================================

local CraftingEngine = {}
CraftingEngine.__index = CraftingEngine

--- 创建合成引擎
-- @param inventory Inventory|nil 绑定的背包实例（可选，后续每次传入也可以）
-- @return CraftingEngine
function CraftingEngine.New(inventory)
    local self = setmetatable({}, CraftingEngine)
    self.recipes = {}        -- [recipeId] = Recipe
    self.recipeList = {}     -- 有序列表，用于遍历
    self.inventory = inventory or nil
    self.listeners = { onCraftStart = {}, onCraftFinish = {}, onCraftFail = {} }
    self.activeCrafts = {}   -- 异步制作队列：[{recipe, progress, inventoryRef}]
    return self
end

function CraftingEngine:On(event, callback)
    if self.listeners[event] then
        table.insert(self.listeners[event], callback)
    end
end

function CraftingEngine:_Emit(event, ...)
    local list = self.listeners[event]
    if not list then return end
    for i = 1, #list do
        list[i](self, ...)
    end
end

--- 注册配方
function CraftingEngine:RegisterRecipe(recipe)
    if not recipe or not recipe.recipeId then
        error("CraftingEngine:RegisterRecipe: recipe must have recipeId")
    end
    self.recipes[recipe.recipeId] = recipe
    -- 更新列表：去重追加
    local found = false
    for _, r in ipairs(self.recipeList) do
        if r.recipeId == recipe.recipeId then found = true; break end
    end
    if not found then
        table.insert(self.recipeList, recipe)
    end
end

--- 取消注册
function CraftingEngine:UnregisterRecipe(recipeId)
    self.recipes[recipeId] = nil
    for i = #self.recipeList, 1, -1 do
        if self.recipeList[i].recipeId == recipeId then
            table.remove(self.recipeList, i)
            break
        end
    end
end

--- 获取所有已注册配方（只读副本）
function CraftingEngine:GetAllRecipes()
    return DeepCopy(self.recipeList)
end

--- 按制作台分类获取配方
function CraftingEngine:GetRecipesByStation(station)
    local result = {}
    for _, r in ipairs(self.recipeList) do
        if (not station and not r.station) or (r.station == station) then
            table.insert(result, DeepCopy(r))
        end
    end
    return result
end

--- 检查背包是否能满足某配方的原料需求
-- @param recipe Recipe|recipeId|string
-- @param inventory Inventory|nil 若构造时未绑定，则必须传入
-- @param station string|nil 当前所处制作台，用于额外校验
-- @return boolean
function CraftingEngine:CanCraft(recipe, inventory, station)
    if type(recipe) == "string" then
        recipe = self.recipes[recipe]
    end
    if not recipe then return false end
    local inv = inventory or self.inventory
    if not inv then return false end

    -- 制作台校验
    if recipe.station and recipe.station ~= "" then
        if station ~= recipe.station then return false end
    end

    for _, ing in ipairs(recipe.ingredients) do
        if not inv:HasItem(ing.itemId, ing.quantity, ing.metadata) then
            return false
        end
    end
    return true
end

--- 获取当前可制作的配方列表
function CraftingEngine:GetAvailableRecipes(inventory, station)
    local inv = inventory or self.inventory
    local out = {}
    for _, r in ipairs(self.recipeList) do
        if self:CanCraft(r, inv, station) then
            table.insert(out, DeepCopy(r))
        end
    end
    return out
end

--- 执行一次制作（立即模式，不耗时）
-- @param recipe Recipe|string
-- @param inventory Inventory|nil
-- @param station string|nil
-- @return boolean, string|table
function CraftingEngine:Craft(recipe, inventory, station)
    if type(recipe) == "string" then
        recipe = self.recipes[recipe]
    end
    if not recipe then return false, "recipe_not_found" end
    local inv = inventory or self.inventory
    if not inv then return false, "no_inventory" end
    if not self:CanCraft(recipe, inv, station) then
        return false, "insufficient_ingredients_or_wrong_station"
    end

    self:_Emit("onCraftStart", recipe, inv)

    -- 扣除原料
    for _, ing in ipairs(recipe.ingredients) do
        local removed, remain = inv:RemoveItem(ing.itemId, ing.quantity, ing.metadata)
        if remain > 0 then
            -- 严重错误，原料扣除失败但前面判断已通过
            return false, "inventory_deduction_failed"
        end
    end

    -- 生成产物（先尝试堆叠进入库存，溢出则…暂由库存 onOverflow 处理）
    local out = recipe.output
    inv:AddItem(out.itemId, out.quantity, out.metadata)

    -- 返回副产品
    for _, ret in ipairs(recipe.returns) do
        inv:AddItem(ret.itemId, ret.quantity, ret.metadata)
    end

    self:_Emit("onCraftFinish", recipe, inv)
    return true, DeepCopy(out)
end

--- 开始一次异步制作（用于带有制作时间的配方）
-- @param recipe Recipe|string
-- @param inventory Inventory|nil
-- @param station string|nil
-- @return string|nil craftHandle
function CraftingEngine:StartCraft(recipe, inventory, station)
    if type(recipe) == "string" then
        recipe = self.recipes[recipe]
    end
    if not recipe then return nil end
    local inv = inventory or self.inventory
    if not self:CanCraft(recipe, inv, station) then return nil end

    -- 先扣除原料放入"制作中"隔离（简化实现：直接扣除）
    for _, ing in ipairs(recipe.ingredients) do
        inv:RemoveItem(ing.itemId, ing.quantity, ing.metadata)
    end

    local handle = tostring(math.random(1000000)) .. "_" .. tostring(os.clock())
    table.insert(self.activeCrafts, {
        handle = handle,
        recipe = recipe,
        progress = 0.0,
        inventory = inv,
        station = station,
    })
    self:_Emit("onCraftStart", recipe, inv, handle)
    return handle
end

--- 更新所有异步制作的进度（应在游戏主循环每帧调用）
-- @param dt number
function CraftingEngine:Update(dt)
    local i = 1
    while i <= #self.activeCrafts do
        local craft = self.activeCrafts[i]
        craft.progress = craft.progress + dt
        if craft.progress >= craft.recipe.craftTime then
            -- 完成
            local recipe = craft.recipe
            local inv = craft.inventory
            local out = recipe.output
            inv:AddItem(out.itemId, out.quantity, out.metadata)
            for _, ret in ipairs(recipe.returns) do
                inv:AddItem(ret.itemId, ret.quantity, ret.metadata)
            end
            self:_Emit("onCraftFinish", recipe, inv, craft.handle)
            table.remove(self.activeCrafts, i)
        else
            i = i + 1
        end
    end
end

--- 获取某个异步制作的进度 0~1
function CraftingEngine:GetCraftProgress(handle)
    for _, craft in ipairs(self.activeCrafts) do
        if craft.handle == handle then
            local p = craft.progress / math.max(0.0001, craft.recipe.craftTime)
            return math.min(1.0, math.max(0.0, p))
        end
    end
    return nil
end

--- 取消异步制作（返还原料）
function CraftingEngine:CancelCraft(handle)
    for i = #self.activeCrafts, 1, -1 do
        local craft = self.activeCrafts[i]
        if craft.handle == handle then
            local recipe = craft.recipe
            local inv = craft.inventory
            for _, ing in ipairs(recipe.ingredients) do
                inv:AddItem(ing.itemId, ing.quantity, ing.metadata)
            end
            self:_Emit("onCraftFail", recipe, inv, handle, "cancelled")
            table.remove(self.activeCrafts, i)
            return true
        end
    end
    return false
end

--- 批量合成（连续执行多次 Craft，直到库存不足或达到指定次数）
-- @param recipe Recipe|string
-- @param inventory Inventory|nil
-- @param station string|nil
-- @param maxCount number|nil 最大次数，nil 则尽可能多
-- @return number 实际成功次数
-- @return table 产物汇总 { [itemId] = totalQty }
function CraftingEngine:CraftBatch(recipe, inventory, station, maxCount)
    if type(recipe) == "string" then
        recipe = self.recipes[recipe]
    end
    if not recipe then return 0, {} end
    local inv = inventory or self.inventory
    local count = 0
    local totalYield = {}
    local limit = maxCount or 9999
    for _ = 1, limit do
        if not self:CanCraft(recipe, inv, station) then break end
        local ok, out = self:Craft(recipe, inv, station)
        if ok and out then
            count = count + 1
            totalYield[out.itemId] = (totalYield[out.itemId] or 0) + (out.quantity or 1)
        else
            break
        end
    end
    return count, totalYield
end

M.CraftingEngine = CraftingEngine
M.New = CraftingEngine.New

return M
