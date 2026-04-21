-- Inventory.lua
-- urhox-economy-crafting 背包/库存系统
-- 基于开源库存方案（lewark/inv.lua、ox_inventory、FaerieDataSystem）综合设计
-- 提供：槽位管理、重量计算、物品元数据、堆叠拆分、事件回调

local M = {}

-- ============================================================================
-- 常量与默认配置
-- ============================================================================
local DEFAULT_MAX_STACK = 64
local DEFAULT_SLOT_COUNT = 40

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

local function DefaultItemDef()
    return {
        maxStack = DEFAULT_MAX_STACK,
        weight = 0.0,
        name = "Unknown",
        category = "misc",
        canStack = true,
    }
end

-- ============================================================================
-- ItemRegistry 物品定义注册表（全局或局部可复用）
-- ============================================================================

local ItemRegistry = {}
ItemRegistry.__index = ItemRegistry

--- 创建物品注册表
-- @return ItemRegistry
function ItemRegistry.New()
    local self = setmetatable({}, ItemRegistry)
    self.defs = {}
    return self
end

--- 注册/覆盖物品定义
-- @param itemId string 唯一物品标识
-- @param def table 定义表 {name, maxStack, weight, category, canStack}
function ItemRegistry:Register(itemId, def)
    if type(itemId) ~= "string" or itemId == "" then
        error("ItemRegistry:Register: itemId must be non-empty string")
    end
    self.defs[itemId] = self.defs[itemId] or {}
    for k, v in pairs(def) do
        self.defs[itemId][k] = v
    end
    -- 补全默认值
    self.defs[itemId].maxStack = self.defs[itemId].maxStack or DEFAULT_MAX_STACK
    self.defs[itemId].weight = self.defs[itemId].weight or 0.0
    self.defs[itemId].canStack = self.defs[itemId].canStack ~= false
end

--- 获取物品定义（只读副本）
-- @param itemId string
-- @return table|nil
function ItemRegistry:GetDef(itemId)
    local d = self.defs[itemId]
    if not d then return nil end
    local copy = {}
    for k, v in pairs(d) do copy[k] = v end
    return copy
end

--- 判断物品是否已注册
function ItemRegistry:Has(itemId)
    return self.defs[itemId] ~= nil
end

M.ItemRegistry = ItemRegistry

-- ============================================================================
-- Inventory 库存实例
-- ============================================================================

local Inventory = {}
Inventory.__index = Inventory

--- 创建一个新的库存实例
-- @param opts table 可选配置 {slots=槽位数, maxWeight=最大负重, itemRegistry=物品注册表}
-- @return Inventory
function Inventory.New(opts)
    opts = opts or {}
    local self = setmetatable({}, Inventory)
    self.slots = opts.slots or DEFAULT_SLOT_COUNT
    self.maxWeight = opts.maxWeight or math.huge
    self.itemRegistry = opts.itemRegistry or ItemRegistry.New()
    self.contents = {} -- [slotIndex] = {itemId, quantity, metadata, durability}
    self.listeners = { onChanged = {}, onOverflow = {}, onWeightChanged = {} }
    self._cacheWeight = 0.0
    return self
end

--- 绑定事件监听器
-- @param event string "onChanged" | "onOverflow" | "onWeightChanged"
-- @param callback function
function Inventory:On(event, callback)
    if self.listeners[event] then
        table.insert(self.listeners[event], callback)
    end
end

function Inventory:_Emit(event, ...)
    local list = self.listeners[event]
    if not list then return end
    for i = 1, #list do
        list[i](self, ...)
    end
end

function Inventory:_RecalcWeight()
    local total = 0.0
    for i = 1, self.slots do
        local slot = self.contents[i]
        if slot then
            local def = self.itemRegistry:GetDef(slot.itemId)
            local w = def and def.weight or 0.0
            total = total + w * slot.quantity
        end
    end
    if math.abs(total - self._cacheWeight) > 0.0001 then
        self._cacheWeight = total
        self:_Emit("onWeightChanged", total, self.maxWeight)
    end
end

--- 获取指定槽位内容
-- @param slotIndex number
-- @return table|nil
function Inventory:GetSlot(slotIndex)
    if slotIndex < 1 or slotIndex > self.slots then return nil end
    local s = self.contents[slotIndex]
    if not s then return nil end
    return DeepCopy(s)
end

--- 设置槽位（低级接口，谨慎使用）
function Inventory:SetSlot(slotIndex, item)
    if slotIndex < 1 or slotIndex > self.slots then return false end
    self.contents[slotIndex] = item and DeepCopy(item) or nil
    self:_RecalcWeight()
    self:_Emit("onChanged", slotIndex)
    return true
end

--- 查找第一个空槽
-- @return number|nil
function Inventory:FindEmptySlot()
    for i = 1, self.slots do
        if not self.contents[i] then
            return i
        end
    end
    return nil
end

--- 查找可继续堆叠的槽位
-- @param itemId string
-- @param metadata table|nil 若传入则仅匹配完全相同 metadata 的槽位
-- @return table 槽位索引数组
function Inventory:FindStackableSlots(itemId, metadata)
    local def = self.itemRegistry:GetDef(itemId)
    if not def or not def.canStack then return {} end
    local maxStack = def.maxStack
    local result = {}
    for i = 1, self.slots do
        local slot = self.contents[i]
        if slot and slot.itemId == itemId and slot.quantity < maxStack then
            local metaMatch = true
            if metadata then
                if not slot.metadata then metaMatch = false
                else
                    for k, v in pairs(metadata) do
                        if slot.metadata[k] ~= v then metaMatch = false; break end
                    end
                end
            end
            if metaMatch then
                table.insert(result, i)
            end
        end
    end
    return result
end

--- 计算添加某物品后增加的重量
function Inventory:_PredictWeight(itemId, quantity)
    local def = self.itemRegistry:GetDef(itemId)
    local w = def and def.weight or 0.0
    return w * quantity
end

--- 添加物品到库存（自动堆叠）
-- @param itemId string
-- @param quantity number
-- @param metadata table|nil
-- @return number 实际加入数量
-- @return number 溢出数量
function Inventory:AddItem(itemId, quantity, metadata)
    if quantity <= 0 then return 0, 0 end
    local def = self.itemRegistry:GetDef(itemId)
    if not def then
        -- 未注册物品尝试直接放入（使用默认值）
        self.itemRegistry:Register(itemId, { name = itemId })
        def = self.itemRegistry:GetDef(itemId)
    end
    local remaining = quantity
    local added = 0

    -- 优先堆叠
    if def.canStack then
        local stackables = self:FindStackableSlots(itemId, metadata)
        for _, slotIdx in ipairs(stackables) do
            if remaining <= 0 then break end
            local slot = self.contents[slotIdx]
            local space = def.maxStack - slot.quantity
            if space > 0 then
                local toAdd = math.min(space, remaining)
                local wAdd = self:_PredictWeight(itemId, toAdd)
                if (self._cacheWeight + wAdd) <= self.maxWeight + 0.0001 then
                    slot.quantity = slot.quantity + toAdd
                    remaining = remaining - toAdd
                    added = added + toAdd
                else
                    break -- 超重，停止
                end
            end
        end
    end

    -- 再找空槽放置
    while remaining > 0 do
        local emptySlot = self:FindEmptySlot()
        if not emptySlot then break end
        local toAdd = def.canStack and math.min(def.maxStack, remaining) or 1
        toAdd = math.min(toAdd, remaining)
        local wAdd = self:_PredictWeight(itemId, toAdd)
        if (self._cacheWeight + wAdd) > self.maxWeight + 0.0001 then
            break
        end
        self.contents[emptySlot] = {
            itemId = itemId,
            quantity = toAdd,
            metadata = metadata and DeepCopy(metadata) or nil,
        }
        remaining = remaining - toAdd
        added = added + toAdd
        if not def.canStack then
            -- 不可堆叠物品每个占一个槽
            if remaining > 0 then
                -- 继续找下一个空槽
            end
        end
    end

    if added > 0 then
        self:_RecalcWeight()
        self:_Emit("onChanged")
    end
    if remaining > 0 then
        self:_Emit("onOverflow", itemId, remaining, metadata)
    end
    return added, remaining
end

--- 从库存中移除指定数量的物品（不指定槽位则按最先找到移除）
-- @param itemId string
-- @param quantity number
-- @param metadata table|nil 若指定则仅移除匹配 metadata 的物品
-- @return number 实际移除数量
-- @return number 剩余应移除数量
function Inventory:RemoveItem(itemId, quantity, metadata)
    if quantity <= 0 then return 0, 0 end
    local toRemove = quantity
    local removed = 0
    for i = 1, self.slots do
        local slot = self.contents[i]
        if slot and slot.itemId == itemId then
            local metaMatch = true
            if metadata then
                if not slot.metadata then metaMatch = false
                else
                    for k, v in pairs(metadata) do
                        if slot.metadata[k] ~= v then metaMatch = false; break end
                    end
                end
            end
            if metaMatch then
                local take = math.min(slot.quantity, toRemove)
                slot.quantity = slot.quantity - take
                toRemove = toRemove - take
                removed = removed + take
                if slot.quantity <= 0 then
                    self.contents[i] = nil
                end
                if toRemove <= 0 then break end
            end
        end
    end
    if removed > 0 then
        self:_RecalcWeight()
        self:_Emit("onChanged")
    end
    return removed, toRemove
end

--- 检查库存中是否有足够数量（匹配 metadata 可选）
function Inventory:HasItem(itemId, quantity, metadata)
    if quantity <= 0 then return true end
    local total = 0
    for i = 1, self.slots do
        local slot = self.contents[i]
        if slot and slot.itemId == itemId then
            local metaMatch = true
            if metadata then
                if not slot.metadata then metaMatch = false
                else
                    for k, v in pairs(metadata) do
                        if slot.metadata[k] ~= v then metaMatch = false; break end
                    end
                end
            end
            if metaMatch then
                total = total + slot.quantity
                if total >= quantity then return true end
            end
        end
    end
    return false
end

--- 获取某物品在库存中的总数量
function Inventory:GetItemCount(itemId, metadata)
    local total = 0
    for i = 1, self.slots do
        local slot = self.contents[i]
        if slot and slot.itemId == itemId then
            local metaMatch = true
            if metadata then
                if not slot.metadata then metaMatch = false
                else
                    for k, v in pairs(metadata) do
                        if slot.metadata[k] ~= v then metaMatch = false; break end
                    end
                end
            end
            if metaMatch then
                total = total + slot.quantity
            end
        end
    end
    return total
end

--- 交换两个槽位的内容
function Inventory:SwapSlots(slotA, slotB)
    if slotA < 1 or slotA > self.slots or slotB < 1 or slotB > self.slots then
        return false
    end
    local temp = self.contents[slotA]
    self.contents[slotA] = self.contents[slotB]
    self.contents[slotB] = temp
    self:_RecalcWeight()
    self:_Emit("onChanged", slotA, slotB)
    return true
end

--- 拆分槽位堆叠
-- @param fromSlot number 源槽位
-- @param amount number 拆分数量
-- @param toSlot number|nil 目标槽位，nil 则自动找空槽
-- @return boolean
function Inventory:SplitStack(fromSlot, amount, toSlot)
    if fromSlot < 1 or fromSlot > self.slots or amount <= 0 then return false end
    local src = self.contents[fromSlot]
    if not src or src.quantity <= amount then return false end
    if not toSlot then
        toSlot = self:FindEmptySlot()
    end
    if not toSlot or toSlot < 1 or toSlot > self.slots or self.contents[toSlot] then
        return false
    end
    src.quantity = src.quantity - amount
    self.contents[toSlot] = DeepCopy(src)
    self.contents[toSlot].quantity = amount
    self:_RecalcWeight()
    self:_Emit("onChanged", fromSlot, toSlot)
    return true
end

--- 合并两个槽位（仅在 ItemId 与 metadata 匹配且未超堆叠上限时）
function Inventory:MergeSlots(fromSlot, toSlot)
    if fromSlot < 1 or fromSlot > self.slots or toSlot < 1 or toSlot > self.slots then
        return false
    end
    local a = self.contents[fromSlot]
    local b = self.contents[toSlot]
    if not a or not b then return false end
    if a.itemId ~= b.itemId then return false end
    -- metadata 粗略匹配
    if (a.metadata == nil) ~= (b.metadata == nil) then return false end
    if a.metadata and b.metadata then
        for k, v in pairs(a.metadata) do
            if b.metadata[k] ~= v then return false end
        end
        for k, v in pairs(b.metadata) do
            if a.metadata[k] ~= v then return false end
        end
    end
    local def = self.itemRegistry:GetDef(a.itemId)
    if not def or not def.canStack then return false end
    local space = def.maxStack - b.quantity
    if space <= 0 then return false end
    local move = math.min(space, a.quantity)
    b.quantity = b.quantity + move
    a.quantity = a.quantity - move
    if a.quantity <= 0 then self.contents[fromSlot] = nil end
    self:_RecalcWeight()
    self:_Emit("onChanged", fromSlot, toSlot)
    return true
end

--- 获取已使用槽位数
function Inventory:GetUsedSlots()
    local count = 0
    for i = 1, self.slots do
        if self.contents[i] then count = count + 1 end
    end
    return count
end

--- 获取当前总重量
function Inventory:GetTotalWeight()
    return self._cacheWeight
end

--- 获取剩余负重
function Inventory:GetRemainingWeight()
    return math.max(0, self.maxWeight - self._cacheWeight)
end

--- 丢弃整个槽位
function Inventory:ClearSlot(slotIndex)
    if slotIndex < 1 or slotIndex > self.slots then return nil end
    local old = self.contents[slotIndex]
    self.contents[slotIndex] = nil
    if old then
        self:_RecalcWeight()
        self:_Emit("onChanged", slotIndex)
    end
    return old and DeepCopy(old) or nil
end

--- 序列化为纯 Lua table
function Inventory:Serialize()
    local data = {
        slots = self.slots,
        maxWeight = self.maxWeight,
        contents = {},
    }
    for i = 1, self.slots do
        if self.contents[i] then
            data.contents[tostring(i)] = DeepCopy(self.contents[i])
        end
    end
    return data
end

--- 从序列化表恢复
function Inventory:Deserialize(data)
    self.slots = data.slots or self.slots
    self.maxWeight = data.maxWeight or self.maxWeight
    self.contents = {}
    for k, v in pairs(data.contents or {}) do
        local idx = tonumber(k)
        if idx then
            self.contents[idx] = DeepCopy(v)
        end
    end
    self:_RecalcWeight()
    self:_Emit("onChanged")
end

M.Inventory = Inventory

-- 兼容旧式 require 调用：直接访问类
M.New = Inventory.New

return M
