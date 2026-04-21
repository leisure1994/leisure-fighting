-- =========================================
-- 天道引擎试用版 - API路由演示
-- =========================================

local RouterDemo = {}

function RouterDemo:new()
    local obj = {
        providers = {},
        stats = {}
    }
    setmetatable(obj, self)
    self.__index = self
    return obj
end

function RouterDemo:add_provider(name, config)
    self.providers[name] = {
        url = config.url,
        model = config.model,
        latency = config.latency or 1000,
        success_rate = config.success_rate or 0.95,
        cost_per_1k = config.cost_per_1k or 0.01
    }
    self.stats[name] = {
        calls = 0,
        failures = 0,
        total_latency = 0
    }
    print(string.format("🔗 添加API: %s (%s)", name, config.model))
end

function RouterDemo:calculate_score(provider_name)
    local p = self.providers[provider_name]
    local s = self.stats[provider_name]
    
    -- 成功率评分 (0-1)
    local success_score = p.success_rate
    
    -- 延迟评分 (越低越好)
    local avg_latency = s.calls > 0 and s.total_latency / s.calls or p.latency
    local latency_score = math.max(0, 1 - avg_latency / 5000)
    
    -- 成本评分 (越低越好)
    local cost_score = math.max(0, 1 - p.cost_per_1k / 0.1)
    
    -- 综合评分
    local score = success_score * 0.5 + latency_score * 0.3 + cost_score * 0.2
    return score
end

function RouterDemo:route(task_type)
    print(string.format("\n📡 路由任务: %s", task_type))
    
    local best_provider = nil
    local best_score = -1
    
    for name, _ in pairs(self.providers) do
        local score = self:calculate_score(name)
        print(string.format("  %s 评分: %.2f", name, score))
        if score > best_score then
            best_score = score
            best_provider = name
        end
    end
    
    print(string.format("✅ 选择: %s (评分:%.2f)", best_provider, best_score))
    
    -- 模拟调用
    self.stats[best_provider].calls = self.stats[best_provider].calls + 1
    local latency = self.providers[best_provider].latency * (0.8 + math.random() * 0.4)
    self.stats[best_provider].total_latency = self.stats[best_provider].total_latency + latency
    
    return best_provider
end

-- 演示运行
print("=" .. string.rep("=", 50))
print("🔀 天道引擎试用版 - API路由演示")
print("=" .. string.rep("=", 50))
print()

local router = RouterDemo:new()

-- 添加API
router:add_provider("deepseek", {
    url = "https://api.deepseek.com",
    model = "deepseek-chat",
    latency = 800,
    success_rate = 0.98,
    cost_per_1k = 0.002
})

router:add_provider("doubao", {
    url = "https://ark.volces.com",
    model = "doubao-pro-32k",
    latency = 500,
    success_rate = 0.95,
    cost_per_1k = 0.005
})

router:add_provider("kimi", {
    url = "https://api.moonshot.cn",
    model = "moonshot-v1-8k",
    latency = 600,
    success_rate = 0.97,
    cost_per_1k = 0.006
})

print()

-- 模拟路由
for i = 1, 5 do
    router:route("世界推衍")
end

print()
print("=" .. string.rep("=", 50))
print("✅ 演示完成")
print("完整版包含在线学习、故障降级、预算控制等高级功能")
print("购买完整版请联系: 飞书 用户161224")
print("=" .. string.rep("=", 50))
