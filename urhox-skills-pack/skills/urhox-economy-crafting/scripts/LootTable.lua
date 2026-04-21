-- LootTable.lua
-- urhox-economy-crafting 掉落表系统
-- 参考：GrimoireDevelopmentKit LootTable (C#)、Lootables RPG Loot Tables、ORK Framework Loot
-- 特性：加权抽取、嵌套子表、数量区间、条件过滤、多种掉落模式 (all / one_of / guaranteed)

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

local function BinarySearch(weights, roll)
    local lo, hi = 1, #weights
    while lo <= hi do
        local mid = math.floor((lo + hi) / 2)
        if weights[mid] < roll then
            lo = mid + 1
        else
            hi = mid - 1
        end
    end
    return lo
end

-- ============================================================================
-- LootEntry 单个掉落条目
-- ============================================================================

local LootEntry = {}
LootEntry.__index = LootEntry

--- 创建掉落条目
-- @param opts table
--   itemId: string 物品ID（或子表的 tableId）
--   weight: number 权重（默认1）
--   minQty: number 最小数量（默认1）
--   maxQty: number 最大数量（默认1）
--   chance: number 独立掉落概率 0~1（默认1）
--   conditions: table 条件过滤器 {minLevel=1, maxLevel=99, tags={"boss"}}
--   isNestedTable: boolean 为 true 时 itemId 代表子 LootTable 的引用
function LootEntry.New(opts)
    local self = setmetatable({}, LootEntry)
    self.itemId = opts.itemId or "unknown"
    self.weight = opts.weight or 1
    self.minQty = opts.minQty or 1
    self.maxQty = opts.maxQty or 1
    self.chance = opts.chance or 1.0
    self.conditions = DeepCopy(opts.conditions or {})
    self.isNestedTable = opts.isNestedTable or false
    return self
end

M.LootEntry = LootEntry

-- ============================================================================
-- LootTable 掉落表
-- ============================================================================

local LootTable = {}
LootTable.__index = LootTable

--- 创建掉落表
-- @param name string 表名（用作标识）
-- @param mode string "all" | "one_of" | "guaranteed"
--   all = 逐个独立判定 each entry.chance
--   one_of = 只从通过 chance 判定后的条目中按 weight 选出一条
--   guaranteed = 无视 chance，全部掉落
function LootTable.New(name, mode)
    local self = setmetatable({}, LootTable)
    self.name = name or "loot_table"
    self.mode = mode or "all"
    self.entries = {}
    self.subTables = {} -- [tableId] = LootTable，用于嵌套引用
    return self
end

--- 添加掉落条目
function LootTable:AddEntry(opts)
    local entry = LootEntry.New(opts)
    table.insert(self.entries, entry)
    return entry
end

--- 注册子表（用于嵌套）
function LootTable:RegisterSubTable(tableId, subTable)
    self.subTables[tableId] = subTable
end

--- 检查条件是否满足
function LootTable:_CheckConditions(entry, context)
    if not entry.conditions then return true end
    local ctx = context or {}
    if entry.conditions.minLevel and (ctx.level or 1) < entry.conditions.minLevel then
        return false
    end
    if entry.conditions.maxLevel and (ctx.level or 999) > entry.conditions.maxLevel then
        return false
    end
    if entry.conditions.tags and ctx.tags then
        local hasTag = false
        for _, t in ipairs(entry.conditions.tags) do
            for _, ct in ipairs(ctx.tags) do
                if t == ct then hasTag = true; break end
            end
            if hasTag then break end
        end
        if not hasTag then return false end
    end
    if entry.conditions.customFn and type(entry.conditions.customFn) == "function" then
        return entry.conditions.customFn(ctx)
    end
    return true
end

--- 内部：按 chance 过滤并计算 one_of 权重
function LootTable:_PrepareWeightedPool(context)
    local pool = {}
    local weights = {}
    local total = 0
    for _, entry in ipairs(self.entries) do
        if self:_CheckConditions(entry, context) then
            local roll = math.random()
            if roll <= entry.chance then
                table.insert(pool, entry)
                total = total + entry.weight
                table.insert(weights, total)
            end
        end
    end
    return pool, weights, total
end

--- 对单个条目生成掉落结果
function LootTable:_ResolveEntry(entry, context)
    local qty = entry.minQty
    if entry.maxQty > entry.minQty then
        qty = math.random(entry.minQty, entry.maxQty)
    end
    if entry.isNestedTable then
        local sub = self.subTables[entry.itemId]
        if sub then
            local nested = sub:Roll(context)
            -- 将嵌套结果乘以 qty（默认不乘，若需要多次子表抽取可循环）
            local multiplied = {}
            for _ = 1, qty do
                for _, drop in ipairs(nested) do
                    table.insert(multiplied, DeepCopy(drop))
                end
            end
            return multiplied
        else
            return {}
        end
    else
        return { { itemId = entry.itemId, quantity = qty } }
    end
end

--- 执行一次掉落抽取
-- @param context table 可选上下文 {level, tags, luck, ...}
-- @return table 结果数组 {{itemId, quantity}, ...}
function LootTable:Roll(context)
    context = context or {}
    local result = {}

    if self.mode == "guaranteed" then
        for _, entry in ipairs(self.entries) do
            if self:_CheckConditions(entry, context) then
                local drops = self:_ResolveEntry(entry, context)
                for _, d in ipairs(drops) do
                    table.insert(result, d)
                end
            end
        end
    elseif self.mode == "one_of" then
        local pool, weights, total = self:_PrepareWeightedPool(context)
        if #pool > 0 and total > 0 then
            local roll = math.random(1, total)
            local idx = BinarySearch(weights, roll)
            local entry = pool[idx]
            if entry then
                local drops = self:_ResolveEntry(entry, context)
                for _, d in ipairs(drops) do
                    table.insert(result, d)
                end
            end
        end
    else -- "all"
        for _, entry in ipairs(self.entries) do
            if self:_CheckConditions(entry, context) then
                local roll = math.random()
                if roll <= entry.chance then
                    local drops = self:_ResolveEntry(entry, context)
                    for _, d in ipairs(drops) do
                        table.insert(result, d)
                    end
                end
            end
        end
    end

    -- 合并相同 itemId 的结果（可选，默认合并）
    local merged = {}
    for _, d in ipairs(result) do
        merged[d.itemId] = (merged[d.itemId] or 0) + d.quantity
    end
    local final = {}
    for itemId, qty in pairs(merged) do
        table.insert(final, { itemId = itemId, quantity = qty })
    end
    return final
end

--- 多次抽取并汇总
-- @param count number 抽取次数
-- @param context table
-- @return table 汇总结果 {{itemId, quantity}, ...}
function LootTable:RollMultiple(count, context)
    local aggregated = {}
    for _ = 1, count do
        local drops = self:Roll(context)
        for _, d in ipairs(drops) do
            aggregated[d.itemId] = (aggregated[d.itemId] or 0) + d.quantity
        end
    end
    local final = {}
    for itemId, qty in pairs(aggregated) do
        table.insert(final, { itemId = itemId, quantity = qty })
    end
    return final
end

--- 调试：以文本方式展示掉落概率分布
function LootTable:ToProbabilityMap(context)
    context = context or {}
    local lines = {}
    table.insert(lines, "LootTable: " .. self.name .. " [" .. self.mode .. "]")
    if self.mode == "one_of" then
        local pool, weights, total = self:_PrepareWeightedPool(context)
        table.insert(lines, "Total Weight: " .. tostring(total))
        for i, entry in ipairs(pool) do
            local p = entry.weight / math.max(1, total)
            local pct = math.floor(p * 10000) / 100
            table.insert(lines, string.format("  %s: %.2f%% (%d weight)", entry.itemId, pct, entry.weight))
        end
    else
        for _, entry in ipairs(self.entries) do
            local pass = self:_CheckConditions(entry, context)
            local status = pass and "OK" or "BLOCKED"
            table.insert(lines, string.format("  %s: chance=%.2f, weight=%d [%s]", entry.itemId, entry.chance, entry.weight, status))
        end
    end
    return table.concat(lines, "\n")
end

M.LootTable = LootTable
M.New = LootTable.New

return M
