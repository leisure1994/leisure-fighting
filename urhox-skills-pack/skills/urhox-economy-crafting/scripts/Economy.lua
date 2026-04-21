-- Economy.lua
-- urhox-economy-crafting 经济/交易/价格系统
-- 参考：Virtual Economic Theory (Gamasutra)、Measuring Inflation within Virtual Economies (ICAART 2021)
-- 实现：供需驱动的动态价格、买卖订单簿、交易历史、全局市场快照

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

local function Clamp(v, min, max)
    return math.max(min, math.min(max, v))
end

-- ============================================================================
-- MarketItem 市场交易品定义
-- ============================================================================

local MarketItem = {}
MarketItem.__index = MarketItem

--- 创建市场交易品
-- @param opts table
--   itemId: string
--   basePrice: number 基础参考价格
--   volatility: number 价格波动系数（默认 0.05）
--   minPrice: number 最低价格（默认 basePrice * 0.2）
--   maxPrice: number 最高价格（默认 basePrice * 5.0）
--   elasticity: number 需求弹性（默认 1.0）
function MarketItem.New(opts)
    local self = setmetatable({}, MarketItem)
    self.itemId = opts.itemId
    self.basePrice = opts.basePrice or 1.0
    self.currentPrice = opts.basePrice or 1.0
    self.supply = opts.supply or 0
    self.demand = opts.demand or 0
    self.volatility = opts.volatility or 0.05
    self.minPrice = opts.minPrice or (self.basePrice * 0.2)
    self.maxPrice = opts.maxPrice or (self.basePrice * 5.0)
    self.elasticity = opts.elasticity or 1.0
    self.history = {} -- {timestamp, price, volume}
    return self
end

M.MarketItem = MarketItem

-- ============================================================================
-- EconomyEngine 经济引擎
-- ============================================================================

local EconomyEngine = {}
EconomyEngine.__index = EconomyEngine

function EconomyEngine.New()
    local self = setmetatable({}, EconomyEngine)
    self.items = {}          -- [itemId] = MarketItem
    self.buyOrders = {}      -- {itemId, buyerId, quantity, unitPrice, timestamp}
    self.sellOrders = {}     -- {itemId, sellerId, quantity, unitPrice, timestamp}
    self.transactions = {}   -- 全局交易记录
    self.listeners = { onPriceUpdate = {}, onTransaction = {}, onOrderMatched = {} }
    self.timeScale = 1.0     -- 时间缩放，调快/调慢经济演化
    self.globalInflation = 0.0
    return self
end

function EconomyEngine:On(event, callback)
    if self.listeners[event] then
        table.insert(self.listeners[event], callback)
    end
end

function EconomyEngine:_Emit(event, ...)
    local list = self.listeners[event]
    if not list then return end
    for i = 1, #list do
        list[i](self, ...)
    end
end

--- 注册交易品
function EconomyEngine:RegisterItem(itemId, opts)
    opts = opts or {}
    opts.itemId = itemId
    self.items[itemId] = MarketItem.New(opts)
end

--- 获取交易品信息
function EconomyEngine:GetItem(itemId)
    local mi = self.items[itemId]
    if not mi then return nil end
    return {
        itemId = mi.itemId,
        basePrice = mi.basePrice,
        currentPrice = mi.currentPrice,
        supply = mi.supply,
        demand = mi.demand,
        minPrice = mi.minPrice,
        maxPrice = mi.maxPrice,
    }
end

--- 获取当前价格（支持通货膨胀加成）
function EconomyEngine:GetPrice(itemId)
    local mi = self.items[itemId]
    if not mi then return nil end
    local price = mi.currentPrice * (1.0 + self.globalInflation)
    return Clamp(price, mi.minPrice, mi.maxPrice)
end

--- 记录供需变化
-- @param itemId string
-- @param deltaSupply number 供应变化（正数增加供应）
-- @param deltaDemand number 需求变化（正数增加需求）
function EconomyEngine:ShiftSupplyDemand(itemId, deltaSupply, deltaDemand)
    local mi = self.items[itemId]
    if not mi then return end
    mi.supply = mi.supply + (deltaSupply or 0)
    mi.demand = mi.demand + (deltaDemand or 0)
    -- 防止极端值
    mi.supply = Clamp(mi.supply, -10000, 10000)
    mi.demand = Clamp(mi.demand, -10000, 10000)
end

--- 提交一次交易记录并驱动价格更新
-- @param itemId string
-- @param quantity number 成交数量
-- @param unitPrice number 实际成交价
-- @param buyerId string|nil
-- @param sellerId string|nil
function EconomyEngine:RecordTransaction(itemId, quantity, unitPrice, buyerId, sellerId)
    local mi = self.items[itemId]
    if not mi then return false end
    quantity = math.max(0, quantity)
    if quantity <= 0 then return false end

    table.insert(self.transactions, {
        itemId = itemId,
        quantity = quantity,
        unitPrice = unitPrice,
        buyerId = buyerId,
        sellerId = sellerId,
        timestamp = os.time(),
    })

    -- 供需微调：买入增加需求、减少供应；卖出反之
    self:ShiftSupplyDemand(itemId, -quantity * 0.1, quantity * 0.1)

    self:_Emit("onTransaction", itemId, quantity, unitPrice, buyerId, sellerId)
    return true
end

--- 模拟 NPC / 系统对市场的干预（如系统回收、NPC 批量采购）
function EconomyEngine:InjectLiquidity(itemId, quantity, isBuy)
    local mi = self.items[itemId]
    if not mi then return end
    if isBuy then
        -- 系统买入 = 增加需求
        mi.demand = mi.demand + quantity
    else
        -- 系统卖出 = 增加供应
        mi.supply = mi.supply + quantity
    end
end

--- 更新价格（应在固定时间间隔调用，如每游戏日/每小时）
-- @param dt number 经过的时间（相对游戏内时间单位）
function EconomyEngine:UpdatePrices(dt)
    dt = dt or 1.0
    for _, mi in pairs(self.items) do
        local imbalance = mi.demand - mi.supply
        -- 价格波动公式：
        -- price *= 1 + (imbalance * volatility * dt * 0.01)
        local changeRate = imbalance * mi.volatility * dt * 0.01 * self.timeScale
        -- 弹性阻尼：越偏离 basePrice，回归力越强
        local deviation = (mi.currentPrice - mi.basePrice) / math.max(0.01, mi.basePrice)
        local restoreForce = -deviation * 0.05 * dt * mi.elasticity
        local totalRate = changeRate + restoreForce
        mi.currentPrice = mi.currentPrice * (1.0 + totalRate)
        mi.currentPrice = Clamp(mi.currentPrice, mi.minPrice, mi.maxPrice)

        -- 供需自然衰减（市场遗忘）
        mi.supply = mi.supply * (1.0 - 0.02 * dt)
        mi.demand = mi.demand * (1.0 - 0.02 * dt)

        -- 记录历史价格
        table.insert(mi.history, {
            timestamp = os.time(),
            price = mi.currentPrice * (1.0 + self.globalInflation),
            supply = mi.supply,
            demand = mi.demand,
        })
        if #mi.history > 1000 then
            table.remove(mi.history, 1)
        end

        self:_Emit("onPriceUpdate", mi.itemId, mi.currentPrice)
    end
end

--- 设置全球通胀率
function EconomyEngine:SetGlobalInflation(rate)
    self.globalInflation = Clamp(rate or 0.0, -0.5, 2.0)
end

-- ============================================================================
-- 简化版订单簿（Buy/Sell Orders）
-- ============================================================================

--- 发布求购订单
-- @return string orderId
function EconomyEngine:PlaceBuyOrder(itemId, buyerId, quantity, unitPrice)
    local id = (buyerId or "anon") .. "_buy_" .. itemId .. "_" .. tostring(os.time()) .. "_" .. tostring(math.random(100000))
    table.insert(self.buyOrders, {
        orderId = id,
        itemId = itemId,
        buyerId = buyerId,
        quantity = quantity,
        unitPrice = unitPrice,
        timestamp = os.time(),
    })
    return id
end

--- 发布出售订单
function EconomyEngine:PlaceSellOrder(itemId, sellerId, quantity, unitPrice)
    local id = (sellerId or "anon") .. "_sell_" .. itemId .. "_" .. tostring(os.time()) .. "_" .. tostring(math.random(100000))
    table.insert(self.sellOrders, {
        orderId = id,
        itemId = itemId,
        sellerId = sellerId,
        quantity = quantity,
        unitPrice = unitPrice,
        timestamp = os.time(),
    })
    return id
end

--- 取消订单
function EconomyEngine:CancelOrder(orderId)
    for i = #self.buyOrders, 1, -1 do
        if self.buyOrders[i].orderId == orderId then
            table.remove(self.buyOrders, i)
            return true
        end
    end
    for i = #self.sellOrders, 1, -1 do
        if self.sellOrders[i].orderId == orderId then
            table.remove(self.sellOrders, i)
            return true
        end
    end
    return false
end

--- 撮合订单（撮合所有可匹配的买卖单）
-- @return table matches { {buyOrder, sellOrder, tradeQty, tradePrice} }
function EconomyEngine:FulfillOrders()
    local matches = {}
    -- 对每个 itemId 分别撮合
    local buysByItem = {}
    local sellsByItem = {}
    for _, o in ipairs(self.buyOrders) do
        buysByItem[o.itemId] = buysByItem[o.itemId] or {}
        table.insert(buysByItem[o.itemId], o)
    end
    for _, o in ipairs(self.sellOrders) do
        sellsByItem[o.itemId] = sellsByItem[o.itemId] or {}
        table.insert(sellsByItem[o.itemId], o)
    end

    for itemId, buyList in pairs(buysByItem) do
        local sellList = sellsByItem[itemId]
        if sellList then
            -- 买方按出价降序，卖方按要价升序
            table.sort(buyList, function(a, b) return a.unitPrice > b.unitPrice end)
            table.sort(sellList, function(a, b) return a.unitPrice < b.unitPrice end)

            local bi, si = 1, 1
            while bi <= #buyList and si <= #sellList do
                local buy = buyList[bi]
                local sell = sellList[si]
                if buy.unitPrice >= sell.unitPrice then
                    local tradeQty = math.min(buy.quantity, sell.quantity)
                    local tradePrice = (buy.unitPrice + sell.unitPrice) / 2.0
                    table.insert(matches, {
                        buyOrder = buy,
                        sellOrder = sell,
                        tradeQty = tradeQty,
                        tradePrice = tradePrice,
                        itemId = itemId,
                    })
                    self:RecordTransaction(itemId, tradeQty, tradePrice, buy.buyerId, sell.sellerId)
                    self:_Emit("onOrderMatched", buy, sell, tradeQty, tradePrice)
                    buy.quantity = buy.quantity - tradeQty
                    sell.quantity = sell.quantity - tradeQty
                    if buy.quantity <= 0 then bi = bi + 1 end
                    if sell.quantity <= 0 then si = si + 1 end
                else
                    break
                end
            end
        end
    end

    -- 清理已完成的订单
    local function prune(list)
        for i = #list, 1, -1 do
            if list[i].quantity <= 0 then
                table.remove(list, i)
            end
        end
    end
    prune(self.buyOrders)
    prune(self.sellOrders)

    return matches
end

--- 获取某物品的订单簿快照
function EconomyEngine:GetOrderBook(itemId)
    local buys = {}
    local sells = {}
    for _, o in ipairs(self.buyOrders) do
        if o.itemId == itemId then table.insert(buys, DeepCopy(o)) end
    end
    for _, o in ipairs(self.sellOrders) do
        if o.itemId == itemId then table.insert(sells, DeepCopy(o)) end
    end
    return { buys = buys, sells = sells }
end

--- 获取市场全景
function EconomyEngine:GetMarketSnapshot()
    local snapshot = {}
    for itemId, mi in pairs(self.items) do
        table.insert(snapshot, {
            itemId = itemId,
            basePrice = mi.basePrice,
            currentPrice = self:GetPrice(itemId),
            supply = mi.supply,
            demand = mi.demand,
        })
    end
    -- 按 currentPrice 排序
    table.sort(snapshot, function(a, b) return a.currentPrice < b.currentPrice end)
    return snapshot
end

--- 获取某物品最新 N 条历史价格
function EconomyEngine:GetPriceHistory(itemId, limit)
    local mi = self.items[itemId]
    if not mi then return {} end
    local n = limit or 100
    local startIdx = math.max(1, #mi.history - n + 1)
    local out = {}
    for i = startIdx, #mi.history do
        table.insert(out, DeepCopy(mi.history[i]))
    end
    return out
end

--- NPC 估价：基于当前价格与市场深度给出收购/出售报价
-- 添加一个 spread（买卖差价）
function EconomyEngine:GetNPCQuotes(itemId)
    local price = self:GetPrice(itemId)
    if not price then return nil end
    local spread = price * 0.1
    return {
        buyPrice = price - spread,   -- NPC 收购价
        sellPrice = price + spread,  -- NPC 出售价
    }
end

M.EconomyEngine = EconomyEngine
M.New = EconomyEngine.New

return M
