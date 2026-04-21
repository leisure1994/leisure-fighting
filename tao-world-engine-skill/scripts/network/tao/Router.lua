-- Router.lua
-- 天道引擎 · API 路由 + 玩家 Key 代理（重度扩展版）
-- 职责：智能选择模型、故障降级、玩家私有 API 代理、并发控制、速率限制、缓存、流式、
--       健康评分、智能路由、指数退避重试、在线学习、请求流水线批处理、成本预算控制、
--       遥测 API、玩家多 Key 轮询、WebSocket 流式框架

Router = Router or {}

-- ═══════════════════════════════════════════════════════════════════════════
-- 常量定义
-- ═══════════════════════════════════════════════════════════════════════════

local MAX_QUEUE_LENGTH = 100
local DEFAULT_CACHE_TTL = 60
local HEALTH_FAILURE_THRESHOLD = 3
local HEALTH_COOLDOWN_SECONDS = 60
local SCORE_LATENCY_WEIGHT = 0.4
local SCORE_SUCCESS_WEIGHT = 0.4
local SCORE_EFFICIENCY_WEIGHT = 0.2
local SCORE_LATENCY_REFERENCE_MS = 5000
local SCORE_EFFICIENCY_REFERENCE_TOKENS_PER_MS = 0.1
local RETRY_MAX_ATTEMPTS = 3
local RETRY_BASE_DELAY_MS = 500
local RETRY_MAX_DELAY_MS = 8000
local RETRY_JITTER_RATIO = 0.25
local PIPELINE_WINDOW_SECONDS = 0.05
local PIPELINE_MAX_BATCH_SIZE = 8
local LEARNING_EWMA_ALPHA = 0.3
local LEARNING_MIN_SAMPLES = 5
local BUDGET_DAILY_LIMIT_DEFAULT = 1000000000 -- 默认几乎无限（按 token 计）
local BUDGET_MONTHLY_LIMIT_DEFAULT = 10000000000
local WS_RECONNECT_BASE_DELAY = 1.0
local WS_RECONNECT_MAX_DELAY = 30.0
local WS_RECONNECT_MAX_ATTEMPTS = 5
local HISTOGRAM_BUCKETS = { 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000 }
local STREAM_TIMEOUT_SECONDS = 300
local BUDGET_PRICE_PER_1K_TOKENS = {
    ["deepseek-reasoner"] = 0.008,
    ["deepseek-chat"]     = 0.001,
    ["doubao-pro-32k"]    = 0.0008,
    ["moonshot-v1-8k"]    = 0.006,
    ["moonshot-v1-32k"]   = 0.012,
    ["moonshot-v1-128k"]  = 0.024,
    ["gpt-4o"]            = 0.03,
    ["gpt-4o-mini"]       = 0.0006,
}

-- ═══════════════════════════════════════════════════════════════════════════
-- 默认 API 池（可被外部配置覆盖）
-- ═══════════════════════════════════════════════════════════════════════════

TAO_API_POOL = TAO_API_POOL or {
    deepseek_reasoner = {
        provider = "deepseek",
        url      = "https://api.deepseek.com/chat/completions",
        model    = "deepseek-reasoner",
        use_for  = "世界推衍、势力战争、主线分叉",
        cost     = "高质低频",
        timeout  = 120,
        max_concurrent = 2,
        rpm      = 10,
    },
    deepseek_chat = {
        provider = "deepseek",
        url      = "https://api.deepseek.com/chat/completions",
        model    = "deepseek-chat",
        use_for  = "NPC 策略规划、动态事件分支、逻辑推理",
        cost     = "平衡主力",
        timeout  = 60,
        max_concurrent = 3,
        rpm      = 30,
    },
    doubao = {
        provider = "doubao",
        url      = "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
        model    = "doubao-pro-32k",
        use_for  = "NPC 对话、任务文本、lore 生成、文本润色",
        cost     = "中文优化",
        timeout  = 60,
        max_concurrent = 4,
        rpm      = 60,
    },
    kimi = {
        provider = "kimi",
        url      = "https://api.moonshot.cn/v1/chat/completions",
        model    = "moonshot-v1-8k",
        use_for  = "主模型故障时降级、高频兜底",
        cost     = "最便宜",
        timeout  = 60,
        max_concurrent = 5,
        rpm      = 100,
    }
}

-- 模型上下文窗口配置（字符数近似，按中文环境保守估计）
local MODEL_CONTEXT_LIMITS = {
    ["deepseek-reasoner"] = 60000,
    ["deepseek-chat"]     = 60000,
    ["doubao-pro-32k"]    = 28000,
    ["moonshot-v1-8k"]    = 6000,
    ["moonshot-v1-32k"]   = 28000,
    ["moonshot-v1-128k"]  = 100000,
    ["gpt-4o"]            = 120000,
    ["gpt-4o-mini"]       = 120000,
    ["default"]           = 4000,
}

-- 厂商公共 Key（应在 Server 加载前注入）
API_KEYS = API_KEYS or {}

-- ═══════════════════════════════════════════════════════════════════════════
-- 内部状态初始化
-- ═══════════════════════════════════════════════════════════════════════════

--- 获取当前时间（优先 GetSystemTime，否则 os.clock）
-- @return number 当前时间（秒）
local function NOW()
    if _G.GetSystemTime then
        return GetSystemTime()
    end
    return os.clock()
end

--- 玩家私有 Key 内存缓存：connection -> { provider = { keys={}, index=1 }, ... }
Router.playerKeys = Router.playerKeys or {}

--- 按 provider 的请求队列：provider -> { activeCount=0, maxConcurrent=N, queue={...} }
Router.RequestQueue = Router.RequestQueue or {}

--- 按 provider 的 Token Bucket 速率限制器
Router.RateLimiters = Router.RateLimiters or {}

--- 响应缓存：hash -> { response=..., expireAt=... }
Router.Cache = Router.Cache or {}

--- 基础统计信息：provider -> { requests, successes, failures, totalLatencyMs, totalTokens }
Router.Stats = Router.Stats or {}

--- 健康状态：provider -> { consecutiveFailures=0, isDown=false, lastCheckTime=0 }
Router.Health = Router.Health or {}

--- 活跃 HTTP 请求引用：requestId -> { http=..., cfg=..., startTime=... }
Router.ActiveRequests = Router.ActiveRequests or {}

--- 流式调用跟踪表：streamId -> { connection=..., cfg=..., buffer=..., done=false }
Router.StreamSessions = Router.StreamSessions or {}

--- 精细健康模型：provider -> HealthModel
Router.HealthModel = Router.HealthModel or {}

--- 在线学习表：taskType -> provider -> LearningRecord
Router.Learning = Router.Learning or {}

--- 请求流水线批处理缓冲区：provider -> { jobs={}, timerScheduled=false }
Router.BatchBuffer = Router.BatchBuffer or {}

--- 成本预算控制器：connectionId -> BudgetState
Router.Budgets = Router.Budgets or {}

--- 全局预算状态
Router.GlobalBudget = Router.GlobalBudget or {
    dailySpent = 0,
    monthlySpent = 0,
    lastResetDay = 0,
    lastResetMonth = 0,
    dailyLimit = BUDGET_DAILY_LIMIT_DEFAULT,
    monthlyLimit = BUDGET_MONTHLY_LIMIT_DEFAULT,
}

--- WebSocket 连接池：wsId -> WebSocketState
Router.WebSockets = Router.WebSockets or {}

local REQUEST_ID_COUNTER = 0
local STREAM_ID_COUNTER = 0
local WS_ID_COUNTER = 0

-- ═══════════════════════════════════════════════════════════════════════════
-- 数学与工具辅助函数
-- ═══════════════════════════════════════════════════════════════════════════

--- 将数值限制在 [minVal, maxVal] 区间
-- @param v number 输入值
-- @param minVal number 最小值
-- @param maxVal number 最大值
-- @return number 限制后的值
local function CLAMP(v, minVal, maxVal)
    if v < minVal then return minVal end
    if v > maxVal then return maxVal end
    return v
end

--- 计算以 2 为底的指数退避延迟
-- @param attempt number 当前重试次数（从 0 开始）
-- @param baseMs number 基础延迟（毫秒）
-- @param maxMs number 最大延迟（毫秒）
-- @param jitterRatio number 抖动比例
-- @return number 延迟（秒）
local function COMPUTE_BACKOFF(attempt, baseMs, maxMs, jitterRatio)
    local delayMs = baseMs * math.pow(2, attempt)
    if delayMs > maxMs then delayMs = maxMs end
    local jitter = delayMs * jitterRatio * (math.random() * 2 - 1)
    delayMs = delayMs + jitter
    if delayMs < 0 then delayMs = 0 end
    return delayMs / 1000.0
end

--- 生成一个 UUID（简化版，基于随机数）
-- @return string UUID 字符串
local function GENERATE_UUID()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return string.gsub(template, "[xy]", function(c)
        local v = (c == "x") and math.random(0, 15) or math.random(8, 11)
        return string.format("%x", v)
    end)
end

--- 深拷贝一张表
-- @param t table 输入表
-- @param seen table|nil 已拷贝引用
-- @return table 深拷贝结果
local function DEEP_COPY(t, seen)
    if type(t) ~= "table" then return t end
    seen = seen or {}
    if seen[t] then return seen[t] end
    local copy = {}
    seen[t] = copy
    for k, v in pairs(t) do
        copy[DEEP_COPY(k, seen)] = DEEP_COPY(v, seen)
    end
    return copy
end

--- 计算字符串的 UTF-8 长度（若全局不存在则按字节长度）
-- @param s string 输入字符串
-- @return number 长度
local function UTF8_LEN(s)
    if _G.Utf8Length then
        return Utf8Length(s)
    end
    return #s
end

--- 截断字符串保留前 maxChars 个 UTF-8 字符（若全局不存在则简单截断）
-- @param s string 输入字符串
-- @param maxChars number 最大字符数
-- @return string 截断后的字符串
local function UTF8_TRUNCATE(s, maxChars)
    if _G.Utf8Truncate then
        return Utf8Truncate(s, maxChars)
    end
    if #s <= maxChars then return s end
    return s:sub(1, maxChars)
end

--- 计算延迟落在哪个直方图桶中
-- @param latencyMs number 延迟毫秒值
-- @return number 桶索引
local function HISTOGRAM_BUCKET_INDEX(latencyMs)
    for i, threshold in ipairs(HISTOGRAM_BUCKETS) do
        if latencyMs <= threshold then return i end
    end
    return #HISTOGRAM_BUCKETS + 1
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 初始化队列与速率限制器
-- ═══════════════════════════════════════════════════════════════════════════

--- 初始化指定 provider 的并发队列与速率限制器
-- @param provider string 厂商名称
function Router.InitProviderState(provider)
    local maxConcurrent = 2
    local rpm = 10
    for _, cfg in pairs(TAO_API_POOL) do
        if cfg.provider == provider then
            if cfg.max_concurrent and cfg.max_concurrent > maxConcurrent then
                maxConcurrent = cfg.max_concurrent
            end
            if cfg.rpm and cfg.rpm > rpm then
                rpm = cfg.rpm
            end
        end
    end

    if not Router.RequestQueue[provider] then
        Router.RequestQueue[provider] = {
            activeCount = 0,
            maxConcurrent = maxConcurrent,
            queue = {}
        }
    end

    if not Router.RateLimiters[provider] then
        Router.RateLimiters[provider] = {
            tokens = rpm,
            capacity = rpm,
            refillRate = rpm / 60.0,
            lastRefill = NOW()
        }
    end

    if not Router.Stats[provider] then
        Router.Stats[provider] = {
            requests = 0,
            successes = 0,
            failures = 0,
            totalLatencyMs = 0,
            totalTokens = 0,
        }
    end

    if not Router.Health[provider] then
        Router.Health[provider] = {
            consecutiveFailures = 0,
            isDown = false,
            lastCheckTime = NOW(),
        }
    end

    if not Router.HealthModel[provider] then
        Router.HealthModel[provider] = {
            avgLatencyMs = 0,
            successRate = 1.0,
            tokenEfficiency = 0,
            compositeScore = 1.0,
            latencyHistogram = {},
            errorCodeCounts = {},
            lastLatenciesRing = {},
            lastLatenciesIndex = 1,
            lastLatenciesSize = 100,
            successWindowRing = {},
            successWindowIndex = 1,
            successWindowSize = 100,
        }
        for _ = 1, #HISTOGRAM_BUCKETS + 1 do
            table.insert(Router.HealthModel[provider].latencyHistogram, 0)
        end
    end

    if not Router.BatchBuffer[provider] then
        Router.BatchBuffer[provider] = {
            jobs = {},
            timerScheduled = false,
        }
    end

    if not Router.Learning[provider] then
        Router.Learning[provider] = {}
    end
end

-- 预初始化已知 provider
for _, cfg in pairs(TAO_API_POOL) do
    Router.InitProviderState(cfg.provider)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- Token Bucket 速率限制
-- ═══════════════════════════════════════════════════════════════════════════

--- 补充 Token Bucket 中的令牌
-- @param limiter table 速率限制器表
local function RefillTokens(limiter)
    local now = NOW()
    local elapsed = now - limiter.lastRefill
    if elapsed > 0 then
        limiter.tokens = math.min(limiter.capacity, limiter.tokens + elapsed * limiter.refillRate)
        limiter.lastRefill = now
    end
end

--- 尝试从指定 provider 的 bucket 中消费一个 token
-- @param provider string 厂商名称
-- @return boolean 是否消费成功
function Router.ConsumeToken(provider)
    local limiter = Router.RateLimiters[provider]
    if not limiter then return false end
    RefillTokens(limiter)
    if limiter.tokens >= 1.0 then
        limiter.tokens = limiter.tokens - 1.0
        return true
    end
    return false
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 健康检查（基础版 + 精细版）
-- ═══════════════════════════════════════════════════════════════════════════

--- 更新某个 provider 的基础健康状态
-- @param provider string 厂商名称
-- @param success boolean 本次请求是否成功
function Router.UpdateHealth(provider, success)
    local health = Router.Health[provider]
    if not health then return end
    if success then
        health.consecutiveFailures = 0
        if health.isDown then
            health.isDown = false
            print("[Router.Health] Provider 恢复上线: " .. provider)
        end
    else
        health.consecutiveFailures = health.consecutiveFailures + 1
        if health.consecutiveFailures >= HEALTH_FAILURE_THRESHOLD and not health.isDown then
            health.isDown = true
            print("[Router.Health] Provider 标记为 down（连续 " .. health.consecutiveFailures .. " 次失败）: " .. provider)
        end
    end
    health.lastCheckTime = NOW()
end

--- 执行一次健康检查，尝试将 down 的 provider 恢复
function Router.HealthCheck()
    local now = NOW()
    for provider, health in pairs(Router.Health) do
        if health.isDown then
            if now - health.lastCheckTime >= HEALTH_COOLDOWN_SECONDS then
                health.isDown = false
                health.consecutiveFailures = 0
                print("[Router.HealthCheck] Provider 冷却结束，重新尝试: " .. provider)
            end
        end
    end
end

--- 获取当前存活且非 down 的 provider 列表
-- @return table provider 名称数组
function Router.GetHealthyProviders()
    local result = {}
    for provider, health in pairs(Router.Health) do
        if not health.isDown then
            table.insert(result, provider)
        end
    end
    return result
end

--- 更新精细健康模型（延迟直方图、成功率窗口、token 效率）
-- @param provider string 厂商名称
-- @param success boolean 是否成功
-- @param latencyMs number 延迟毫秒
-- @param estimatedTokens number 估算 token 数
-- @param errorCode string|nil 错误码或 HTTP 状态码字符串
function Router.UpdateHealthModel(provider, success, latencyMs, estimatedTokens, errorCode)
    local model = Router.HealthModel[provider]
    if not model then return end

    latencyMs = latencyMs or 0
    estimatedTokens = estimatedTokens or 0

    -- 更新成功率滑动窗口
    model.successWindowRing[model.successWindowIndex] = success and 1 or 0
    model.successWindowIndex = model.successWindowIndex + 1
    if model.successWindowIndex > model.successWindowSize then
        model.successWindowIndex = 1
    end
    local successSum = 0
    for _, v in ipairs(model.successWindowRing) do
        successSum = successSum + v
    end
    model.successRate = successSum / math.max(1, #model.successWindowRing)

    -- 更新延迟 EWMA 与直方图
    if success and latencyMs > 0 then
        if model.avgLatencyMs == 0 then
            model.avgLatencyMs = latencyMs
        else
            model.avgLatencyMs = model.avgLatencyMs * (1 - 0.2) + latencyMs * 0.2
        end

        -- 延迟环形缓冲区（用于计算 p99 近似）
        model.lastLatenciesRing[model.lastLatenciesIndex] = latencyMs
        model.lastLatenciesIndex = model.lastLatenciesIndex + 1
        if model.lastLatenciesIndex > model.lastLatenciesSize then
            model.lastLatenciesIndex = 1
        end

        -- 直方图
        local bkt = HISTOGRAM_BUCKET_INDEX(latencyMs)
        model.latencyHistogram[bkt] = (model.latencyHistogram[bkt] or 0) + 1

        -- Token 效率（tokens / ms）
        if latencyMs > 0 then
            local eff = estimatedTokens / latencyMs
            if model.tokenEfficiency == 0 then
                model.tokenEfficiency = eff
            else
                model.tokenEfficiency = model.tokenEfficiency * (1 - 0.2) + eff * 0.2
            end
        end
    end

    -- 错误码统计
    if not success and errorCode then
        local codeStr = tostring(errorCode)
        model.errorCodeCounts[codeStr] = (model.errorCodeCounts[codeStr] or 0) + 1
    end

    -- 计算综合评分
    local latencyScore = 1.0 - CLAMP(model.avgLatencyMs / SCORE_LATENCY_REFERENCE_MS, 0, 1)
    local efficiencyScore = CLAMP(model.tokenEfficiency / SCORE_EFFICIENCY_REFERENCE_TOKENS_PER_MS, 0, 1)
    model.compositeScore = SCORE_LATENCY_WEIGHT * latencyScore
                             + SCORE_SUCCESS_WEIGHT * model.successRate
                             + SCORE_EFFICIENCY_WEIGHT * efficiencyScore
end

--- 获取 provider 的精细健康模型快照
-- @param provider string 厂商名称
-- @return table 健康模型副本
function Router.GetHealthModel(provider)
    local model = Router.HealthModel[provider]
    if not model then return nil end
    return DEEP_COPY(model)
end

--- 获取 provider 的综合评分
-- @param provider string 厂商名称
-- @return number 评分（0~1）
function Router.GetCompositeScore(provider)
    local model = Router.HealthModel[provider]
    if not model then return 0 end
    return model.compositeScore
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 统计信息
-- ═══════════════════════════════════════════════════════════════════════════

--- 记录一次 LLM 请求的结果到统计表
-- @param provider string 厂商名称
-- @param success boolean 是否成功
-- @param latencyMs number 请求耗时（毫秒）
-- @param estimatedTokens number 估算的 token 消耗数
function Router.RecordStats(provider, success, latencyMs, estimatedTokens)
    local stats = Router.Stats[provider]
    if not stats then return end
    stats.requests = stats.requests + 1
    if success then
        stats.successes = stats.successes + 1
        stats.totalLatencyMs = stats.totalLatencyMs + (latencyMs or 0)
        stats.totalTokens = stats.totalTokens + (estimatedTokens or 0)
    else
        stats.failures = stats.failures + 1
    end
end

--- 获取指定 provider 的平均延迟
-- @param provider string 厂商名称
-- @return number 平均延迟（毫秒），无记录返回 0
function Router.GetAverageLatency(provider)
    local stats = Router.Stats[provider]
    if not stats or stats.successes == 0 then return 0 end
    return stats.totalLatencyMs / stats.successes
end

--- 获取指定 provider 的平均 token 消耗
-- @param provider string 厂商名称
-- @return number 平均 token 数，无记录返回 0
function Router.GetAverageTokens(provider)
    local stats = Router.Stats[provider]
    if not stats or stats.successes == 0 then return 0 end
    return stats.totalTokens / stats.successes
end

--- 打印当前所有 provider 的统计摘要
function Router.PrintStatsSummary()
    print("[Router.Stats] ========== API 使用统计 ==========")
    for provider, stats in pairs(Router.Stats) do
        local avgLatency = stats.successes > 0 and (stats.totalLatencyMs / stats.successes) or 0
        local avgTokens = stats.successes > 0 and (stats.totalTokens / stats.successes) or 0
        local score = Router.GetCompositeScore(provider)
        print(string.format("  %-12s | 总请求:%4d | 成功:%4d | 失败:%4d | 平均延迟:%7.1fms | 平均Token:%6.1f | 评分:%.3f",
            provider, stats.requests, stats.successes, stats.failures, avgLatency, avgTokens, score))
    end
    print("[Router.Stats] =================================")
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 缓存机制
-- ═══════════════════════════════════════════════════════════════════════════

--- 清理过期的缓存条目
function Router.CleanupCache()
    local now = NOW()
    local expired = {}
    for hash, entry in pairs(Router.Cache) do
        if now >= entry.expireAt then
            table.insert(expired, hash)
        end
    end
    for _, hash in ipairs(expired) do
        Router.Cache[hash] = nil
    end
end

--- 计算 prompt 的缓存哈希
-- @param provider string 厂商名称
-- @param model string 模型名
-- @param messages table 消息数组
-- @return string 哈希值
function Router.HashPrompt(provider, model, messages)
    local parts = { provider, model }
    for _, msg in ipairs(messages or {}) do
        table.insert(parts, (msg.role or "") .. ":" .. (msg.content or ""))
    end
    local raw = table.concat(parts, "|")
    local hash = 5381
    for i = 1, #raw do
        hash = ((hash << 5) + hash) + raw:byte(i)
    end
    return tostring(hash)
end

--- 将响应存入缓存（60 秒有效期）
-- @param hash string prompt 的哈希值
-- @param response string API 响应内容
function Router.CacheResponse(hash, response)
    local now = NOW()
    Router.Cache[hash] = {
        response = response,
        expireAt = now + DEFAULT_CACHE_TTL
    }
end

--- 从缓存中获取响应
-- @param hash string prompt 的哈希值
-- @return string|nil 缓存的响应内容，未命中返回 nil
function Router.GetCachedResponse(hash)
    Router.CleanupCache()
    local entry = Router.Cache[hash]
    if entry then
        return entry.response
    end
    return nil
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 上下文窗口管理
-- ═══════════════════════════════════════════════════════════════════════════

--- 估算单条消息占用的近似字符数
-- @param msg table 含 role 和 content 的消息
-- @return number 字符数
function Router.EstimateMessageLength(msg)
    if type(msg) ~= "table" then return 0 end
    local len = 0
    if msg.role then len = len + UTF8_LEN(msg.role) end
    if msg.content then len = len + UTF8_LEN(msg.content) end
    if msg.name then len = len + UTF8_LEN(msg.name) end
    return len + 8
end

--- 按模型上下文限制裁剪 messages 数组
-- 策略：优先保留 system 消息和末尾的 user 消息，必要时裁剪旧的非 system 消息。
-- @param model string 模型名称
-- @param messages table 消息数组
-- @return table 裁剪后的消息数组
function Router.TrimMessagesByModel(model, messages)
    local limit = MODEL_CONTEXT_LIMITS[model] or MODEL_CONTEXT_LIMITS["default"]
    local total = 0
    for _, msg in ipairs(messages or {}) do
        total = total + Router.EstimateMessageLength(msg)
    end
    if total <= limit then
        return messages
    end

    local systemMsgs = {}
    local otherMsgs = {}
    for _, msg in ipairs(messages or {}) do
        if msg.role == "system" then
            table.insert(systemMsgs, msg)
        else
            table.insert(otherMsgs, msg)
        end
    end

    local systemLen = 0
    for _, msg in ipairs(systemMsgs) do
        systemLen = systemLen + Router.EstimateMessageLength(msg)
    end

    local budget = limit - systemLen
    if budget < 0 then
        budget = limit
        systemMsgs = {}
        systemLen = 0
    end

    local keptOthers = {}
    local current = 0
    for i = #otherMsgs, 1, -1 do
        local len = Router.EstimateMessageLength(otherMsgs[i])
        if current + len <= budget then
            table.insert(keptOthers, 1, otherMsgs[i])
            current = current + len
        else
            break
        end
    end

    local result = {}
    for _, msg in ipairs(systemMsgs) do
        table.insert(result, msg)
    end
    for _, msg in ipairs(keptOthers) do
        table.insert(result, msg)
    end

    return result
end

--- 构建标准 OpenAI 格式请求体（含上下文裁剪）
-- @param model string 模型名称
-- @param messages table 消息数组
-- @param temperature number|nil 温度参数
-- @param stream boolean|nil 是否开启流式
-- @return string JSON 格式的请求体
function Router.BuildRequestBody(model, messages, temperature, stream)
    temperature = temperature or 0.7
    local trimmed = Router.TrimMessagesByModel(model, messages)
    local body = {
        model = model,
        messages = trimmed,
        temperature = temperature,
        response_format = { type = "json_object" }
    }
    if stream then
        body.stream = true
    end
    return SimpleEncode(body)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 在线学习系统
-- ═══════════════════════════════════════════════════════════════════════════

--- 获取或创建某个任务类型与 provider 的学习记录
-- @param taskType string 任务类型标识
-- @param provider string 厂商名称
-- @return table 学习记录
local function GetLearningRecord(taskType, provider)
    if not Router.Learning[taskType] then
        Router.Learning[taskType] = {}
    end
    if not Router.Learning[taskType][provider] then
        Router.Learning[taskType][provider] = {
            avgLatencyMs = 0,
            successRate = 1.0,
            tokenEfficiency = 0,
            samples = 0,
        }
    end
    return Router.Learning[taskType][provider]
end

--- 记录一次任务完成之后的学习数据
-- @param taskType string 任务类型
-- @param provider string 厂商名称
-- @param success boolean 是否成功
-- @param latencyMs number 延迟
-- @param estimatedTokens number 估算 token
function Router.Learn(taskType, provider, success, latencyMs, estimatedTokens)
    local rec = GetLearningRecord(taskType, provider)
    rec.samples = rec.samples + 1

    local alpha = LEARNING_EWMA_ALPHA
    if rec.samples == 1 then
        rec.avgLatencyMs = latencyMs or 0
        rec.successRate = success and 1.0 or 0.0
        if (latencyMs or 0) > 0 then
            rec.tokenEfficiency = (estimatedTokens or 0) / latencyMs
        else
            rec.tokenEfficiency = 0
        end
    else
        rec.successRate = rec.successRate * (1 - alpha) + (success and 1.0 or 0.0) * alpha
        if success then
            rec.avgLatencyMs = rec.avgLatencyMs * (1 - alpha) + (latencyMs or 0) * alpha
            if (latencyMs or 0) > 0 then
                local eff = (estimatedTokens or 0) / latencyMs
                rec.tokenEfficiency = rec.tokenEfficiency * (1 - alpha) + eff * alpha
            end
        end
    end
end

--- 获取学习记录中的任务-Provider 评分
-- @param taskType string 任务类型
-- @param provider string 厂商名称
-- @return number 评分（0~1）
function Router.GetLearningScore(taskType, provider)
    local rec = GetLearningRecord(taskType, provider)
    if rec.samples < LEARNING_MIN_SAMPLES then
        return 0.5 -- 样本不足时返回中性分
    end
    local latencyScore = 1.0 - CLAMP(rec.avgLatencyMs / SCORE_LATENCY_REFERENCE_MS, 0, 1)
    local efficiencyScore = CLAMP(rec.tokenEfficiency / SCORE_EFFICIENCY_REFERENCE_TOKENS_PER_MS, 0, 1)
    return SCORE_LATENCY_WEIGHT * latencyScore
         + SCORE_SUCCESS_WEIGHT * rec.successRate
         + SCORE_EFFICIENCY_WEIGHT * efficiencyScore
end

--- 返回学习表副本（用于遥测）
-- @return table 学习表副本
function Router.GetLearningTable()
    return DEEP_COPY(Router.Learning)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 智能路由（基于评分 + 在线学习）
-- ═══════════════════════════════════════════════════════════════════════════

--- 根据任务画像选择最合适的 API 配置
-- 综合健康评分与在线学习评分进行加权选择。
-- @param taskProfile string 任务画像名称，如 "deepseek_chat"
-- @param taskType string|nil 可选的细粒度任务类型，用于在线学习
-- @return table API 配置表
function Router.Route(taskProfile, taskType)
    taskProfile = taskProfile or "deepseek_chat"
    taskType = taskType or taskProfile
    local primaryCfg = TAO_API_POOL[taskProfile]
    if not primaryCfg then
        primaryCfg = TAO_API_POOL.kimi or TAO_API_POOL.deepseek_chat
    end

    local candidates = {}
    for name, cfg in pairs(TAO_API_POOL) do
        local health = Router.Health[cfg.provider]
        if health and not health.isDown then
            local healthScore = Router.GetCompositeScore(cfg.provider)
            local learnScore = Router.GetLearningScore(taskType, cfg.provider)
            -- 健康评分占 70%，学习评分占 30%
            local finalScore = healthScore * 0.7 + learnScore * 0.3
            table.insert(candidates, {
                name = name,
                cfg = cfg,
                score = finalScore,
            })
        end
    end

    if #candidates == 0 then
        -- 全部 down，强制返回主选（死马当活马医）
        print("[Router.Route] 警告：所有 provider 被标记为 down，强制使用主配置")
        return primaryCfg
    end

    -- 按评分降序排序
    table.sort(candidates, function(a, b) return a.score > b.score end)

    -- 如果主选在前三名内，仍优先使用主选（保持确定性）
    for i = 1, math.min(3, #candidates) do
        if candidates[i].cfg.provider == primaryCfg.provider
           and candidates[i].cfg.model == primaryCfg.model then
            return primaryCfg
        end
    end

    -- 否则选择评分最高的候选
    local best = candidates[1]
    if best.cfg.provider ~= primaryCfg.provider or best.cfg.model ~= primaryCfg.model then
        print(string.format("[Router.Route] 主选 %s/%s 评分较低，智能切换至 %s/%s（评分 %.3f）",
            primaryCfg.provider, primaryCfg.model, best.cfg.provider, best.cfg.model, best.score))
    end
    return best.cfg
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 成本预算控制
-- ═══════════════════════════════════════════════════════════════════════════

--- 重置每日/每月预算计数器
function Router.CheckBudgetReset()
    local now = os.date("*t")
    local gb = Router.GlobalBudget

    if gb.lastResetDay ~= now.yday then
        gb.dailySpent = 0
        gb.lastResetDay = now.yday
    end
    if gb.lastResetMonth ~= now.month then
        gb.monthlySpent = 0
        gb.lastResetMonth = now.month
    end

    for connId, budget in pairs(Router.Budgets) do
        if budget.lastResetDay ~= now.yday then
            budget.dailySpent = 0
            budget.lastResetDay = now.yday
        end
        if budget.lastResetMonth ~= now.month then
            budget.monthlySpent = 0
            budget.lastResetMonth = now.month
        end
    end
end

--- 设置全局预算限制
-- @param dailyLimit number 每日上限（按估算 token 数）
-- @param monthlyLimit number 每月上限
function Router.SetGlobalBudget(dailyLimit, monthlyLimit)
    Router.GlobalBudget.dailyLimit = dailyLimit or BUDGET_DAILY_LIMIT_DEFAULT
    Router.GlobalBudget.monthlyLimit = monthlyLimit or BUDGET_MONTHLY_LIMIT_DEFAULT
end

--- 设置指定连接的预算限制
-- @param connectionId string|number 连接标识
-- @param dailyLimit number 每日上限
-- @param monthlyLimit number 每月上限
function Router.SetConnectionBudget(connectionId, dailyLimit, monthlyLimit)
    local now = os.date("*t")
    if not Router.Budgets[connectionId] then
        Router.Budgets[connectionId] = {
            dailySpent = 0,
            monthlySpent = 0,
            lastResetDay = now.yday,
            lastResetMonth = now.month,
            dailyLimit = dailyLimit or BUDGET_DAILY_LIMIT_DEFAULT,
            monthlyLimit = monthlyLimit or BUDGET_MONTHLY_LIMIT_DEFAULT,
        }
    else
        Router.Budgets[connectionId].dailyLimit = dailyLimit or Router.Budgets[connectionId].dailyLimit
        Router.Budgets[connectionId].monthlyLimit = monthlyLimit or Router.Budgets[connectionId].monthlyLimit
    end
end

--- 估算一次请求的成本（以虚拟 token 为计量单位）
-- @param model string 模型名
-- @param estimatedTokens number 估算 token 数
-- @return number 成本值
local function EstimateCost(model, estimatedTokens)
    local price = BUDGET_PRICE_PER_1K_TOKENS[model] or 0.001
    return estimatedTokens * price
end

--- 检查预算是否允许执行此次请求
-- @param connection any 连接对象（用于获取 connectionId）
-- @param model string 模型名
-- @param estimatedTokens number 估算 token 数
-- @return boolean 是否允许
-- @return string|nil 拒绝原因
function Router.CheckBudget(connection, model, estimatedTokens)
    Router.CheckBudgetReset()
    local cost = EstimateCost(model, estimatedTokens)

    local gb = Router.GlobalBudget
    if gb.dailySpent + cost > gb.dailyLimit then
        return false, "全局日度预算已超支"
    end
    if gb.monthlySpent + cost > gb.monthlyLimit then
        return false, "全局月度预算已超支"
    end

    local connId = tostring(connection)
    local cb = Router.Budgets[connId]
    if cb then
        if cb.dailySpent + cost > cb.dailyLimit then
            return false, "连接日度预算已超支"
        end
        if cb.monthlySpent + cost > cb.monthlyLimit then
            return false, "连接月度预算已超支"
        end
    end

    return true, nil
end

--- 记录实际花费到预算系统
-- @param connection any 连接对象
-- @param model string 模型名
-- @param estimatedTokens number 估算 token 数
function Router.ConsumeBudget(connection, model, estimatedTokens)
    Router.CheckBudgetReset()
    local cost = EstimateCost(model, estimatedTokens)
    Router.GlobalBudget.dailySpent = Router.GlobalBudget.dailySpent + cost
    Router.GlobalBudget.monthlySpent = Router.GlobalBudget.monthlySpent + cost

    local connId = tostring(connection)
    if Router.Budgets[connId] then
        Router.Budgets[connId].dailySpent = Router.Budgets[connId].dailySpent + cost
        Router.Budgets[connId].monthlySpent = Router.Budgets[connId].monthlySpent + cost
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 请求流水线批处理（Pipeline / Batch）
-- ═══════════════════════════════════════════════════════════════════════════

--- 判断一个任务是否适合被批量处理
-- @param job table 任务对象
-- @return boolean
local function IsBatchable(job)
    if job.stream then return false end
    if job.useCache == false then return false end
    if not job.isPublic then return false end
    if not job.messages or #job.messages == 0 then return false end
    -- 只批处理单条 user 消息且不含 system 的简短请求
    local hasSystem = false
    local userCount = 0
    for _, m in ipairs(job.messages) do
        if m.role == "system" then hasSystem = true end
        if m.role == "user" then userCount = userCount + 1 end
    end
    if hasSystem then return false end
    if userCount ~= 1 then return false end
    return true
end

--- 构建合并后的批量消息体
-- @param jobs table 任务数组
-- @param model string 模型名
-- @param temperature number 温度
-- @return string JSON 请求体
local function BuildBatchBody(jobs, model, temperature)
    temperature = temperature or 0.7
    local parts = {}
    table.insert(parts, { role = "system", content = "你将依次回答以下多个问题，每个回答前用 [编号] 标记，编号从 1 开始。" })
    for i, job in ipairs(jobs) do
        for _, m in ipairs(job.messages) do
            if m.role == "user" then
                local content = "[" .. i .. "] " .. (m.content or "")
                table.insert(parts, { role = "user", content = content })
            end
        end
    end
    local body = {
        model = model,
        messages = parts,
        temperature = temperature,
        response_format = { type = "json_object" }
    }
    return SimpleEncode(body)
end

--- 解析批量响应并将结果分发给各个任务
-- @param rawResponse string 原始响应文本
-- @param jobs table 任务数组
local function DistributeBatchResponse(rawResponse, jobs)
    -- 尝试提取 [1]...[2]... 格式
    local results = {}
    local pattern = "%[(%d+)%]%s*(.-)(?=\n\n\[|%[$)"
    -- 简单实现：按行分割提取
    local currentIdx = nil
    local currentText = {}
    for line in rawResponse:gmatch("[^\r\n]*") do
        local idx = line:match("^%[(%d+)%]%s*(.*)$")
        if idx then
            if currentIdx then
                results[tonumber(currentIdx)] = table.concat(currentText, "\n")
            end
            currentIdx = idx
            currentText = { idx ~= "1" and line:match("^%[%d+%]%s*(.*)$") or line }
            if not currentText[1] then currentText = { "" } end
        elseif currentIdx then
            table.insert(currentText, line)
        end
    end
    if currentIdx then
        results[tonumber(currentIdx)] = table.concat(currentText, "\n")
    end

    for i, job in ipairs(jobs) do
        local text = results[i]
        if not text or text == "" then
            text = rawResponse
        end
        if job.onSuccess then
            job.onSuccess(text)
        end
    end
end

--- 执行批量 flush
-- @param provider string 厂商名称
function Router.FlushBatch(provider)
    local buffer = Router.BatchBuffer[provider]
    if not buffer or #buffer.jobs == 0 then
        buffer.timerScheduled = false
        return
    end

    local jobs = buffer.jobs
    buffer.jobs = {}
    buffer.timerScheduled = false

    -- 取第一个 job 的 cfg 作为代表
    local cfg = jobs[1].cfg
    local key = jobs[1].key
    local body = BuildBatchBody(jobs, cfg.model, jobs[1].temperature)

    local reqId = "req_" .. tostring(REQUEST_ID_COUNTER + 1)
    REQUEST_ID_COUNTER = REQUEST_ID_COUNTER + 1
    local startTime = NOW()
    local estimatedTokens = math.floor(UTF8_LEN(body) / 3)

    local http = nil
    if _G.network then
        if network.MakeHttpRequest then
            http = network:MakeHttpRequest()
        elseif network.CreateHTTP then
            http = network:CreateHTTP()
        end
    end

    if not http then
        for _, job in ipairs(jobs) do
            Router.RecordStats(provider, false, 0, 0)
            Router.UpdateHealth(provider, false)
            Router.UpdateHealthModel(provider, false, 0, 0, "no_http")
            if job.taskType then Router.Learn(job.taskType, provider, false, 0, 0) end
            if job.onError then job.onError("批量 HTTPRequest 对象创建失败") end
        end
        return
    end

    http:SetMethod(HTTP_POST)
    http:SetUrl(cfg.url)
    http:AddHeader("Content-Type", "application/json")
    http:AddHeader("Authorization", "Bearer " .. key)
    if cfg.timeout and cfg.timeout > 0 then
        if http.SetTimeout then
            http:SetTimeout(cfg.timeout)
        elseif http.SetConnectTimeout then
            http:SetConnectTimeout(cfg.timeout)
        end
    end
    http:SetPostData(body)

    Router.ActiveRequests[reqId] = {
        http = http,
        cfg = cfg,
        job = { provider = provider, isBatch = true, jobs = jobs },
        startTime = startTime,
    }

    SubscribeToEvent(http, "RequestFinished", function(eventType, eventData)
        local status = 0
        local response = ""
        if eventData["Status"] then status = eventData["Status"]:GetInt() end
        if eventData["Body"] then response = eventData["Body"]:GetString() end
        local latencyMs = (NOW() - startTime) * 1000
        local success = (status == 200)

        Router.ActiveRequests[reqId] = nil
        Router.RecordStats(provider, success, latencyMs, estimatedTokens)
        Router.UpdateHealth(provider, success)
        Router.UpdateHealthModel(provider, success, latencyMs, estimatedTokens, tostring(status))

        if success then
            DistributeBatchResponse(response, jobs)
        else
            for _, job in ipairs(jobs) do
                if job.taskType then Router.Learn(job.taskType, provider, false, latencyMs, estimatedTokens) end
                if job.onError then job.onError("批量 HTTP " .. status .. ": " .. response) end
            end
        end
        Router.FinishRequest(provider)
    end)

    local ok, err = pcall(function() http:Send() end)
    if not ok then
        Router.ActiveRequests[reqId] = nil
        Router.RecordStats(provider, false, 0, 0)
        Router.UpdateHealth(provider, false)
        Router.UpdateHealthModel(provider, false, 0, 0, "send_exception")
        for _, job in ipairs(jobs) do
            if job.taskType then Router.Learn(job.taskType, provider, false, 0, 0) end
            if job.onError then job.onError("批量 HTTP 发送异常: " .. tostring(err)) end
        end
        Router.FinishRequest(provider)
    end
end

--- 将适合批处理的任务加入缓冲区，否则直接入队
-- @param job table 任务对象
local function EnqueueBatchOrDirect(job)
    if not IsBatchable(job) then
        Router.EnqueueOrExecute(job)
        return
    end

    local provider = job.provider
    Router.InitProviderState(provider)
    local buffer = Router.BatchBuffer[provider]
    table.insert(buffer.jobs, job)

    if #buffer.jobs >= PIPELINE_MAX_BATCH_SIZE then
        Router.FlushBatch(provider)
        return
    end

    if not buffer.timerScheduled then
        buffer.timerScheduled = true
        if _G.Delay then
            Delay(PIPELINE_WINDOW_SECONDS, function()
                Router.FlushBatch(provider)
            end)
        else
            -- 无 Delay 函数时立即 flush（退化）
            Router.FlushBatch(provider)
        end
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 请求队列与并发控制
-- ═══════════════════════════════════════════════════════════════════════════

--- 处理指定 provider 的等待队列，尽可能发起新的请求
-- @param provider string 厂商名称
function Router.ProcessQueue(provider)
    local q = Router.RequestQueue[provider]
    if not q then return end

    while q.activeCount < q.maxConcurrent and #q.queue > 0 do
        local job = table.remove(q.queue, 1)
        q.activeCount = q.activeCount + 1
        Router.ExecuteHttpJob(job)
    end
end

--- 将 HTTP 任务入队或直接执行（视并发情况而定）
-- @param job table 任务对象
function Router.EnqueueOrExecute(job)
    local provider = job.provider
    Router.InitProviderState(provider)
    local q = Router.RequestQueue[provider]

    if q.activeCount < q.maxConcurrent then
        q.activeCount = q.activeCount + 1
        Router.ExecuteHttpJob(job)
    else
        table.insert(q.queue, job)
        if #q.queue > MAX_QUEUE_LENGTH then
            local dropped = table.remove(q.queue, 1)
            if dropped.onError then
                dropped.onError("请求队列已满，任务被丢弃")
            end
        end
    end
end

--- 完成任务后减少活跃计数并继续处理队列
-- @param provider string 厂商名称
function Router.FinishRequest(provider)
    local q = Router.RequestQueue[provider]
    if q then
        q.activeCount = math.max(0, q.activeCount - 1)
    end
    Router.ProcessQueue(provider)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- HTTP 执行层（UrhoX 风格）
-- ═══════════════════════════════════════════════════════════════════════════

--- 估算 token 数（粗略字符数 / 3）
-- @param bodyStr string 请求体字符串
-- @return number 估算 token 数
local function EstimateTokens(bodyStr)
    if type(bodyStr) ~= "string" then return 0 end
    return math.floor(UTF8_LEN(bodyStr) / 3)
end

--- 内部辅助：在任务失败时触发重试逻辑
-- @param job table 原始任务
-- @param errMsg string 错误信息
local function HandleJobRetry(job, errMsg)
    job.retryCount = (job.retryCount or 0) + 1
    if job.retryCount <= RETRY_MAX_ATTEMPTS then
        local delaySec = COMPUTE_BACKOFF(job.retryCount - 1, RETRY_BASE_DELAY_MS, RETRY_MAX_DELAY_MS, RETRY_JITTER_RATIO)
        print(string.format("[Router.Retry] provider=%s 任务失败，第 %d 次重试，延迟 %.3f 秒：%s",
            job.provider, job.retryCount, delaySec, errMsg or ""))
        if _G.Delay then
            Delay(delaySec, function()
                -- 重试时重新路由选择 provider
                local newCfg = Router.Route(job.taskProfile or "deepseek_chat", job.taskType)
                job.provider = newCfg.provider
                job.cfg = newCfg
                if job.isPublic then
                    local newKey = API_KEYS[newCfg.provider]
                    if newKey then job.key = newKey end
                else
                    local newPlayerKey = Router.GetPlayerKey(job.connection, newCfg.provider)
                    if newPlayerKey then job.key = newPlayerKey end
                end
                Router.EnqueueOrExecute(job)
            end)
        else
            Router.EnqueueOrExecute(job)
        end
    else
        print("[Router.Retry] 任务重试次数耗尽：" .. (errMsg or "unknown"))
        if job.onError then job.onError(errMsg or "重试次数耗尽") end
    end
end

--- 执行一个 HTTP 请求任务（内部使用）
-- @param job table 含 cfg, messages, key, onSuccess, onError, useCache 等字段
function Router.ExecuteHttpJob(job)
    local provider = job.provider
    local cfg = job.cfg
    local key = job.key

    -- 预算检查（仅公共 Key 且未标记跳过预算）
    if job.isPublic and job.skipBudget ~= true then
        local bodyForEstimate = Router.BuildRequestBody(cfg.model, job.messages, job.temperature, job.stream)
        local estimatedTokens = EstimateTokens(bodyForEstimate)
        local allowed, reason = Router.CheckBudget(job.connection, cfg.model, estimatedTokens)
        if not allowed then
            Router.FinishRequest(provider)
            print("[Router.Budget] 拒绝请求：" .. reason)
            if job.onError then job.onError("预算限制：" .. reason) end
            return
        end
    end

    -- 速率限制检查（仅公共 Key 队列做硬限制）
    if job.isPublic and not Router.ConsumeToken(provider) then
        local q = Router.RequestQueue[provider]
        table.insert(q.queue, 1, job)
        q.activeCount = math.max(0, q.activeCount - 1)
        if _G.Delay then
            Delay(0.5, function() Router.ProcessQueue(provider) end)
        end
        return
    end

    REQUEST_ID_COUNTER = REQUEST_ID_COUNTER + 1
    local reqId = "req_" .. REQUEST_ID_COUNTER
    local startTime = NOW()
    local body = Router.BuildRequestBody(cfg.model, job.messages, job.temperature, job.stream)
    local estimatedTokens = EstimateTokens(body)

    -- 预算扣减
    if job.isPublic and job.skipBudget ~= true then
        Router.ConsumeBudget(job.connection, cfg.model, estimatedTokens)
    end

    -- 尝试使用缓存
    if job.useCache ~= false then
        local hash = Router.HashPrompt(provider, cfg.model, job.messages)
        local cached = Router.GetCachedResponse(hash)
        if cached then
            Router.RecordStats(provider, true, 0, 0)
            Router.UpdateHealthModel(provider, true, 0, 0, nil)
            if job.taskType then Router.Learn(job.taskType, provider, true, 0, 0) end
            Router.FinishRequest(provider)
            if job.onSuccess then job.onSuccess(cached) end
            return
        end
        job.cacheHash = hash
    end

    -- 创建 HTTPRequest（UrhoX 原生方式）
    local http = nil
    if _G.network then
        if network.MakeHttpRequest then
            http = network:MakeHttpRequest()
        elseif network.CreateHTTP then
            http = network.CreateHTTP()
        end
    end

    if not http then
        Router.RecordStats(provider, false, 0, 0)
        Router.UpdateHealth(provider, false)
        Router.UpdateHealthModel(provider, false, 0, 0, "no_http")
        if job.taskType then Router.Learn(job.taskType, provider, false, 0, 0) end
        Router.FinishRequest(provider)
        HandleJobRetry(job, "HTTPRequest 对象创建失败")
        return
    end

    http:SetMethod(HTTP_POST)
    http:SetUrl(cfg.url)
    http:AddHeader("Content-Type", "application/json")
    http:AddHeader("Authorization", "Bearer " .. key)

    if cfg.timeout and cfg.timeout > 0 then
        if http.SetTimeout then
            http:SetTimeout(cfg.timeout)
        elseif http.SetConnectTimeout then
            http:SetConnectTimeout(cfg.timeout)
        end
    end

    http:SetPostData(body)

    Router.ActiveRequests[reqId] = {
        http = http,
        cfg = cfg,
        job = job,
        startTime = startTime,
    }

    SubscribeToEvent(http, "RequestFinished", function(eventType, eventData)
        local status = 0
        local response = ""
        if eventData["Status"] then
            status = eventData["Status"]:GetInt()
        end
        if eventData["Body"] then
            response = eventData["Body"]:GetString()
        end

        local latencyMs = (NOW() - startTime) * 1000
        local success = (status == 200)
        local errorCode = success and nil or tostring(status)

        Router.ActiveRequests[reqId] = nil
        Router.RecordStats(provider, success, latencyMs, estimatedTokens)
        Router.UpdateHealth(provider, success)
        Router.UpdateHealthModel(provider, success, latencyMs, estimatedTokens, errorCode)
        if job.taskType then
            Router.Learn(job.taskType, provider, success, latencyMs, estimatedTokens)
        end

        if success then
            Router.FinishRequest(provider)
            if job.cacheHash then
                Router.CacheResponse(job.cacheHash, response)
            end
            if job.onSuccess then job.onSuccess(response) end
        else
            Router.FinishRequest(provider)
            HandleJobRetry(job, "HTTP " .. status .. ": " .. response)
        end
    end)

    local ok, err = pcall(function() http:Send() end)
    if not ok then
        Router.ActiveRequests[reqId] = nil
        Router.RecordStats(provider, false, 0, 0)
        Router.UpdateHealth(provider, false)
        Router.UpdateHealthModel(provider, false, 0, 0, "send_exception")
        if job.taskType then Router.Learn(job.taskType, provider, false, 0, 0) end
        Router.FinishRequest(provider)
        HandleJobRetry(job, "HTTP 发送异常: " .. tostring(err))
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 基础 HTTP 调用封装
-- ═══════════════════════════════════════════════════════════════════════════

--- 发起一次基础 HTTP 调用（自动走队列、缓存、速率限制、健康检查）
-- @param cfg table API 配置
-- @param messages table 消息数组
-- @param onSuccess function|nil 成功回调
-- @param onError function|nil 失败回调
function Router.HttpCall(cfg, messages, onSuccess, onError)
    local key = API_KEYS[cfg.provider]
    if not key or key == "" then
        if onError then onError("缺少公共 API Key: " .. cfg.provider) end
        return
    end

    local job = {
        provider = cfg.provider,
        cfg = cfg,
        messages = messages,
        key = key,
        onSuccess = onSuccess,
        onError = onError,
        isPublic = true,
        useCache = true,
        temperature = nil,
        stream = false,
        taskProfile = nil,
        taskType = "generic",
        connection = nil,
        retryCount = 0,
        skipBudget = false,
    }
    EnqueueBatchOrDirect(job)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 玩家 Key 增强（多 Key 轮询）
-- ═══════════════════════════════════════════════════════════════════════════

--- 绑定玩家的通用 API Key（自动检测 provider）
-- @param connection Connection 玩家连接对象
-- @param encryptedKey string 经 RSA 加密后的 Key
-- @return boolean 是否绑定成功
function Router.SetPlayerKey(connection, encryptedKey)
    local decrypted = ""
    if _G.RSADecrypt and _G.SERVER_PRIVATE_KEY then
        decrypted = RSADecrypt(encryptedKey, SERVER_PRIVATE_KEY)
    else
        decrypted = encryptedKey
    end

    if decrypted and string.len(decrypted) > 10 then
        if not Router.playerKeys[connection] then
            Router.playerKeys[connection] = {}
        end
        Router.playerKeys[connection]["auto"] = {
            keys = { decrypted },
            index = 1,
        }
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_ACCEPTED, true)
        return true
    else
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_REJECTED, true)
        return false
    end
end

--- 为指定玩家绑定某个特定 provider 的 API Key
-- @param connection Connection 玩家连接对象
-- @param provider string 厂商名称，如 "deepseek"
-- @param encryptedKey string 经 RSA 加密后的 Key
-- @return boolean 是否绑定成功
function Router.SetPlayerProviderKey(connection, provider, encryptedKey)
    provider = provider or "auto"
    local decrypted = ""
    if _G.RSADecrypt and _G.SERVER_PRIVATE_KEY then
        decrypted = RSADecrypt(encryptedKey, SERVER_PRIVATE_KEY)
    else
        decrypted = encryptedKey
    end

    if decrypted and string.len(decrypted) > 10 then
        if not Router.playerKeys[connection] then
            Router.playerKeys[connection] = {}
        end
        if not Router.playerKeys[connection][provider] then
            Router.playerKeys[connection][provider] = { keys = {}, index = 1 }
        end
        table.insert(Router.playerKeys[connection][provider].keys, decrypted)
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_ACCEPTED, true, provider)
        return true
    else
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_REJECTED, true, provider)
        return false
    end
end

--- 清理某玩家的所有私有 Key（断线即焚）
-- @param connection Connection 玩家连接对象
function Router.ClearPlayerKey(connection)
    Router.playerKeys[connection] = nil
end

--- 检查某玩家是否有指定 provider 的 Key
-- @param connection Connection 玩家连接对象
-- @param provider string|nil 厂商名称，nil 则检查任意 Key
-- @return boolean
function Router.HasPlayerKey(connection, provider)
    local pk = Router.playerKeys[connection]
    if not pk then return false end
    if provider then
        local entry = pk[provider]
        if entry and type(entry) == "table" and #entry.keys > 0 then
            return true
        end
        -- 兼容旧版 fallback 到 auto
        if provider ~= "auto" then
            local autoEntry = pk["auto"]
            if autoEntry and type(autoEntry) == "table" and #autoEntry.keys > 0 then
                return true
            end
        end
        return false
    end
    for _, entry in pairs(pk) do
        if type(entry) == "table" and #entry.keys > 0 then
            return true
        end
    end
    return false
end

--- 获取玩家某个 provider 的 Key，若不存在则返回 nil；多 Key 时自动轮询
-- @param connection Connection 玩家连接对象
-- @param provider string 厂商名称
-- @return string|nil
function Router.GetPlayerKey(connection, provider)
    local pk = Router.playerKeys[connection]
    if not pk then return nil end

    local function rotateAndGet(entry)
        if not entry or type(entry) ~= "table" then return nil end
        local keys = entry.keys
        if not keys or #keys == 0 then return nil end
        local idx = entry.index or 1
        local key = keys[idx]
        entry.index = (idx % #keys) + 1
        return key
    end

    local key = rotateAndGet(pk[provider])
    if key then return key end
    if provider ~= "auto" then
        return rotateAndGet(pk["auto"])
    end
    return nil
end

--- 获取玩家某个 provider 绑定的所有 Key 列表
-- @param connection Connection 玩家连接对象
-- @param provider string 厂商名称
-- @return table Key 数组
function Router.GetPlayerKeyList(connection, provider)
    local pk = Router.playerKeys[connection]
    if not pk then return {} end
    provider = provider or "auto"
    local entry = pk[provider]
    if entry and type(entry) == "table" then
        return DEEP_COPY(entry.keys)
    end
    return {}
end

-- ═══════════════════════════════════════════════════════════════════════════
-- TaoCall 与 TaoCallWithPlayerFallback
-- ═══════════════════════════════════════════════════════════════════════════

--- 带故障降级的 TaoCall（使用公共 API 池）
-- @param messages table 消息数组
-- @param taskProfile string 任务画像
-- @param onSuccess function 成功回调
-- @param onError function|nil 失败回调
function TaoCall(messages, taskProfile, onSuccess, onError)
    local cfg = Router.Route(taskProfile)

    local function onResponse(response)
        local ok = (response:find("{") or response:find("%["))
        if ok then
            if onSuccess then onSuccess(response) end
        else
            if onSuccess then
                onSuccess('{\"action\":\"speak\",\"content\":\"天道响应异常，正在切换备用通道。\"}')
            end
        end
    end

    local function onErr(err)
        if onError then onError(err) end
    end

    Router.HttpCall(cfg, messages, onResponse, onErr)
end

--- 使用玩家私有 Key 发起调用，失败后再 fallback 到公共池
-- @param messages table 消息数组
-- @param taskProfile string 任务画像
-- @param connection Connection 玩家连接对象
-- @param onSuccess function 成功回调
function TaoCallWithPlayerFallback(messages, taskProfile, connection, onSuccess)
    local cfg = Router.Route(taskProfile)
    local playerKey = Router.GetPlayerKey(connection, cfg.provider)

    if playerKey and string.len(playerKey) > 10 then
        local job = {
            provider = cfg.provider,
            cfg = cfg,
            messages = messages,
            key = playerKey,
            onSuccess = function(response)
                local ok = (response:find("{") or response:find("%["))
                if ok then
                    if onSuccess then onSuccess(response) end
                else
                    TaoCall(messages, taskProfile, onSuccess)
                end
            end,
            onError = function(err)
                TaoCall(messages, taskProfile, onSuccess)
            end,
            isPublic = false,
            useCache = false,
            temperature = nil,
            stream = false,
            taskProfile = taskProfile,
            taskType = taskProfile,
            connection = connection,
            retryCount = 0,
            skipBudget = true,
        }
        Router.EnqueueOrExecute(job)
        return
    end

    TaoCall(messages, taskProfile, onSuccess)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- WebSocket 流式支持框架
-- ═══════════════════════════════════════════════════════════════════════════

--- 创建一个 WebSocket 连接记录（模拟/真实统一接口）
-- @param url string WebSocket URL
-- @param headers table|nil 额外请求头
-- @param onOpen function|nil 连接打开回调
-- @param onMessage function|nil 收到消息回调 function(msg:string, isBinary:boolean)
-- @param onClose function|nil 关闭回调 function(code:number, reason:string)
-- @param onError function|nil 错误回调 function(err:string)
-- @return string wsId
function Router.WSConnect(url, headers, onOpen, onMessage, onClose, onError)
    WS_ID_COUNTER = WS_ID_COUNTER + 1
    local wsId = "ws_" .. WS_ID_COUNTER

    Router.WebSockets[wsId] = {
        url = url,
        headers = headers or {},
        state = "connecting",
        reconnectCount = 0,
        buffer = {},
        onOpen = onOpen,
        onMessage = onMessage,
        onClose = onClose,
        onError = onError,
        createdAt = NOW(),
        lastActivity = NOW(),
    }

    -- 若引擎提供原生 WebSocket 则使用；否则保留接口由调用方桥接
    if _G.WebSocket and WebSocket.Connect then
        local ok, wsObj = pcall(function()
            return WebSocket.Connect(url, headers)
        end)
        if ok and wsObj then
            Router.WebSockets[wsId].native = wsObj
            Router.WebSockets[wsId].state = "open"
            if onOpen then onOpen(wsId) end

            -- 假设原生对象支持消息/关闭回调注册
            if wsObj.OnMessage then
                wsObj:OnMessage(function(msg, bin)
                    Router.WebSockets[wsId].lastActivity = NOW()
                    if onMessage then onMessage(msg, bin) end
                end)
            end
            if wsObj.OnClose then
                wsObj:OnClose(function(code, reason)
                    Router.WebSockets[wsId].state = "closed"
                    if onClose then onClose(code, reason) end
                end)
            end
            if wsObj.OnError then
                wsObj:OnError(function(err)
                    Router.WebSockets[wsId].state = "error"
                    if onError then onError(err) end
                end)
            end
        else
            Router.WebSockets[wsId].state = "error"
            if onError then onError("WebSocket 原生连接失败") end
        end
    else
        -- 无原生支持时 state 保持 connecting，由外部轮询使用
        print("[Router.WS] 当前引擎无原生 WebSocket，保留模拟接口：" .. wsId)
    end

    return wsId
end

--- 通过 WebSocket 发送数据
-- @param wsId string WebSocket 标识
-- @param data string 数据
-- @return boolean 是否发送成功
function Router.WSSend(wsId, data)
    local ws = Router.WebSockets[wsId]
    if not ws then return false end
    if ws.native and ws.native.Send then
        local ok = pcall(function() ws.native:Send(data) end)
        if ok then
            ws.lastActivity = NOW()
            return true
        end
    end
    -- fallback：将数据写入缓冲区，供轮询读取
    table.insert(ws.buffer, data)
    ws.lastActivity = NOW()
    return true
end

--- 关闭 WebSocket 连接
-- @param wsId string WebSocket 标识
function Router.WSClose(wsId)
    local ws = Router.WebSockets[wsId]
    if not ws then return end
    if ws.native and ws.native.Close then
        pcall(function() ws.native:Close() end)
    end
    ws.state = "closed"
    Router.WebSockets[wsId] = nil
end

--- 获取 WebSocket 状态
-- @param wsId string WebSocket 标识
-- @return string 状态字符串
function Router.WSGetState(wsId)
    local ws = Router.WebSockets[wsId]
    if not ws then return "unknown" end
    return ws.state
end

--- 清理过期的 WebSocket 连接
function Router.CleanupWebSockets()
    local now = NOW()
    local expired = {}
    for id, ws in pairs(Router.WebSockets) do
        if ws.state == "closed" or (now - ws.lastActivity > STREAM_TIMEOUT_SECONDS) then
            table.insert(expired, id)
        end
    end
    for _, id in ipairs(expired) do
        Router.WSClose(id)
        Router.WebSockets[id] = nil
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 流式响应预留接口（基于 HTTP 模拟 + WebSocket 框架兼容）
-- ═══════════════════════════════════════════════════════════════════════════

--- 发起一次流式调用（优先尝试 WebSocket 框架，否则 HTTP 模拟）
-- streamId 由调用方管理，客户端通过 C2S_STREAM_POLL 轮询获取 chunk。
-- @param messages table 消息数组
-- @param taskProfile string 任务画像
-- @param connection Connection 玩家连接对象
-- @param onChunk function(chunkStr) 收到内容块时的回调
-- @param onDone function(fullResponse) 完成时的回调
-- @return string streamId
function Router.StreamCall(messages, taskProfile, connection, onChunk, onDone)
    STREAM_ID_COUNTER = STREAM_ID_COUNTER + 1
    local streamId = "stream_" .. STREAM_ID_COUNTER

    local chunks = {}
    local buffer = ""
    local done = false

    Router.StreamSessions[streamId] = {
        connection = connection,
        cfg = Router.Route(taskProfile),
        chunks = chunks,
        buffer = buffer,
        done = done,
        onChunk = onChunk,
        onDone = onDone,
        createdAt = NOW(),
        wsId = nil,
    }

    -- 模拟流式：先一次性获取完整响应，然后拆分成多个 chunk
    local function simulateStreaming(fullText)
        local chunkSize = 16
        local pos = 1
        local function emitNext()
            if done then return end
            local remaining = UTF8_LEN(fullText) - pos + 1
            if remaining <= 0 then
                done = true
                Router.StreamSessions[streamId].done = true
                if onDone then onDone(fullText) end
                return
            end
            local chunk = UTF8_TRUNCATE(fullText:sub(pos), chunkSize)
            pos = pos + #chunk
            table.insert(chunks, chunk)
            Router.StreamSessions[streamId].buffer = table.concat(chunks)
            if onChunk then onChunk(chunk) end
            if _G.Delay then
                Delay(0.05, emitNext)
            else
                emitNext()
            end
        end
        emitNext()
    end

    local function onResponse(fullText)
        simulateStreaming(fullText)
    end

    local playerKey = Router.GetPlayerKey(connection, Router.Route(taskProfile).provider)
    if playerKey and string.len(playerKey) > 10 then
        TaoCallWithPlayerFallback(messages, taskProfile, connection, onResponse)
    else
        TaoCall(messages, taskProfile, onResponse)
    end

    return streamId
end

--- 处理客户端的流式轮询请求（由 Server.lua 调用）
-- @param streamId string 流会话 ID
-- @param connection Connection 玩家连接对象
function Router.HandleStreamPoll(streamId, connection)
    local session = Router.StreamSessions[streamId]
    if not session then
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_DONE, true, streamId, "")
        return
    end

    if session.connection ~= connection then
        return
    end

    local now = NOW()
    if now - session.createdAt > STREAM_TIMEOUT_SECONDS then
        Router.StreamSessions[streamId] = nil
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_DONE, true, streamId, "")
        return
    end

    local currentBuffer = session.buffer or ""
    connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_CHUNK, true, streamId, currentBuffer)

    if session.done then
        Router.StreamSessions[streamId] = nil
        connection:SendRemoteEvent(TAO_REMOTE_EVENTS.S2C_STREAM_DONE, true, streamId, currentBuffer)
    end
end

--- 清理所有过期的流式会话
function Router.CleanupStreams()
    local now = NOW()
    local expired = {}
    for id, session in pairs(Router.StreamSessions) do
        if now - session.createdAt > STREAM_TIMEOUT_SECONDS then
            table.insert(expired, id)
        end
    end
    for _, id in ipairs(expired) do
        Router.StreamSessions[id] = nil
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 遥测 API
-- ═══════════════════════════════════════════════════════════════════════════

--- 获取指定 provider 的延迟直方图
-- @param provider string 厂商名称
-- @return table { buckets={...}, counts={...}, p50=..., p95=..., p99=... }
function Router.GetLatencyHistogram(provider)
    local model = Router.HealthModel[provider]
    if not model then return nil end

    local total = 0
    for _, c in ipairs(model.latencyHistogram) do
        total = total + c
    end

    local function percentile(p)
        if total == 0 then return 0 end
        local target = math.ceil(total * p)
        local accum = 0
        for i, c in ipairs(model.latencyHistogram) do
            accum = accum + c
            if accum >= target then
                if i <= #HISTOGRAM_BUCKETS then
                    return HISTOGRAM_BUCKETS[i]
                else
                    return HISTOGRAM_BUCKETS[#HISTOGRAM_BUCKETS] * 2
                end
            end
        end
        return 0
    end

    return {
        buckets = DEEP_COPY(HISTOGRAM_BUCKETS),
        counts = DEEP_COPY(model.latencyHistogram),
        totalSamples = total,
        p50 = percentile(0.5),
        p95 = percentile(0.95),
        p99 = percentile(0.99),
    }
end

--- 获取指定 provider 的错误码分类统计
-- @param provider string 厂商名称
-- @return table { code=count, ... }
function Router.GetErrorBreakdown(provider)
    local model = Router.HealthModel[provider]
    if not model then return {} end
    return DEEP_COPY(model.errorCodeCounts)
end

--- 获取所有 provider 的对比数据
-- @return table 按 provider 分组的对比表
function Router.CompareProviders()
    local result = {}
    for provider, stats in pairs(Router.Stats) do
        local model = Router.HealthModel[provider] or {}
        local avgLatency = stats.successes > 0 and (stats.totalLatencyMs / stats.successes) or 0
        local avgTokens = stats.successes > 0 and (stats.totalTokens / stats.successes) or 0
        local hist = Router.GetLatencyHistogram(provider)
        table.insert(result, {
            provider = provider,
            requests = stats.requests,
            successes = stats.successes,
            failures = stats.failures,
            avgLatencyMs = avgLatency,
            avgTokens = avgTokens,
            compositeScore = model.compositeScore or 0,
            successRate = model.successRate or 0,
            tokenEfficiency = model.tokenEfficiency or 0,
            latencyHistogram = hist,
            errorBreakdown = Router.GetErrorBreakdown(provider),
        })
    end
    table.sort(result, function(a, b) return a.compositeScore > b.compositeScore end)
    return result
end

--- 获取完整遥测快照（JSON 字符串）
-- @return string JSON 字符串
function Router.GetTelemetrySnapshot()
    local payload = {
        providers = Router.CompareProviders(),
        learning = Router.GetLearningTable(),
        globalBudget = {
            dailySpent = Router.GlobalBudget.dailySpent,
            monthlySpent = Router.GlobalBudget.monthlySpent,
            dailyLimit = Router.GlobalBudget.dailyLimit,
            monthlyLimit = Router.GlobalBudget.monthlyLimit,
        },
        activeRequests = REQUEST_ID_COUNTER,
        activeStreams = STREAM_ID_COUNTER,
        activeWebSockets = 0,
        timestamp = NOW(),
    }
    for _ in pairs(Router.WebSockets) do
        payload.activeWebSockets = payload.activeWebSockets + 1
    end
    return SimpleEncode(payload)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 外部工具函数
-- ═══════════════════════════════════════════════════════════════════════════

--- 取消并清理所有由该 connection 发起的活跃请求和流式会话
-- @param connection Connection 玩家连接对象
function Router.CleanupConnection(connection)
    for reqId, req in pairs(Router.ActiveRequests) do
        if req.job and req.job.connection == connection then
            if req.http and req.http.Cancel then
                req.http:Cancel()
            end
            Router.ActiveRequests[reqId] = nil
        end
    end
    for streamId, session in pairs(Router.StreamSessions) do
        if session.connection == connection then
            Router.StreamSessions[streamId] = nil
        end
    end
end
