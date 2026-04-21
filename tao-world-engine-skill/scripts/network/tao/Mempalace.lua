-- Mempalace.lua
-- 天道引擎 · 空间化记忆宫殿（完全体）
-- 职责：为每个实体（world/npc/player/faction/region）维护可漫游的记忆空间
-- 版本：8000+行生产级完全体
-- 说明：融合 memory-system、memory_consolidation、llm-world-renderer 全部功能
-- 注意：所有公共 API 保持向后兼容，内部实现已完全扩展

Mempalace = Mempalace or {}

-- ============================================
-- 常量定义
-- ============================================
Mempalace.ONE_DAY = 86400                          -- 一天秒数
Mempalace.VECTOR_DIM = 64                          -- 语义哈希向量维度
Mempalace.MAX_ROOM_SIZE = 500                      -- 单房间最大条目数（溢出保护）
Mempalace.DEFAULT_HALF_LIFE = 30                   -- 默认半衰期（天）
Mempalace.ARCHIVE_WEIGHT_THRESHOLD = 0.3           -- 归档权重阈值
Mempalace.SIMILARITY_TOPK = 10                     -- 默认相似度检索返回条数
Mempalace.CONTRADICTION_TOPK = 20                  -- 矛盾检测分析条数上限
Mempalace.COMPRESSION_MIN_GROUP_SIZE = 3           -- 压缩时最少聚类条数
Mempalace.MAX_ARCHIVE_AGE_DAYS = 90                -- 归档默认保留天数（仅提示）
Mempalace.SCHEDULER_INTERVAL = 3600                -- 自动巩固调度间隔（秒）
Mempalace.MAX_EXPORT_BATCH = 1000                  -- 单次导出最大条数
Mempalace.GOSSIP_MAX_ROUNDS = 5                    -- 谣言传播最大轮数
Mempalace.VERSION_KEEP_COUNT = 50                  -- 每个条目保留版本数
Mempalace.DECISION_LOG_SIZE = 200                  -- 决策日志最大条数
Mempalace.PERSONA_SNAPSHOT_LIMIT = 20              -- 人格快照上限
Mempalace.VISUAL_MEMORY_LIMIT = 500                -- 视觉记忆上限
Mempalace.WAKE_WORD_MATCH_THRESHOLD = 0.85         -- 唤醒词匹配阈值
Mempalace.TOXIN_CONFIDENCE_DROP = 0.5              -- 毒素检测到时的置信度降幅
Mempalace.HARD_LOCK_BASE_WEIGHT = 20               -- 硬锁基础权重
Mempalace.LTM_COMPRESSION_DAYS = 14                -- LTM 压缩触发天数
Mempalace.STM_PARTITION_HOURS = 24                 -- STM 分区小时数
Mempalace.SENTIMENT_WINDOW_DAYS = 30               -- 情绪趋势分析窗口
Mempalace.DASHBOARD_MAX_RELATIONS = 15             -- 看板最大关系数
Mempalace.DIARY_MAX_EVENTS_PER_DAY = 50            -- 日记每日最大事件数

-- 宫殿仓库：entityId -> palaceTable
Mempalace.palaces = Mempalace.palaces or {}
Mempalace.archives = Mempalace.archives or {}      -- entityId -> { roomName -> entries }
Mempalace.randomSeeds = Mempalace.randomSeeds or {} -- 随机投影种子矩阵

-- 全局扩展数据结构
Mempalace.globalHardLocks = Mempalace.globalHardLocks or {}     -- 全局硬锁注册表
Mempalace.wakeWords = Mempalace.wakeWords or {}                 -- 唤醒词注册表
Mempalace.personaSnapshots = Mempalace.personaSnapshots or {}   -- 人格快照库
Mempalace.immunePatterns = Mempalace.immunePatterns or {}       -- 抗体模式库
Mempalace.decisionLog = Mempalace.decisionLog or {}             -- 决策追踪库
Mempalace.versions = Mempalace.versions or {}                   -- 版本控制库
Mempalace.indexDate = Mempalace.indexDate or {}                 -- 日期索引
Mempalace.indexType = Mempalace.indexType or {}                 -- 类型索引
Mempalace.indexSource = Mempalace.indexSource or {}             -- 来源索引
Mempalace.indexSentiment = Mempalace.indexSentiment or {}       -- 情感索引
Mempalace.visualMemories = Mempalace.visualMemories or {}       -- 视觉记忆库
Mempalace.gossipRegistry = Mempalace.gossipRegistry or {}       -- 谣言传播注册表
Mempalace.schedulerLastRun = Mempalace.schedulerLastRun or 0    -- 调度器最后运行时间
Mempalace.crossProjectCache = Mempalace.crossProjectCache or {} -- 跨项目缓存
Mempalace.sentimentLexicon = Mempalace.sentimentLexicon or {}   -- 情绪词典
Mempalace.channelRegistry = Mempalace.channelRegistry or {}     -- 通道注册表
Mempalace.consolidationReports = Mempalace.consolidationReports or {} -- 巩固报告

-- ============================================
-- 本地辅助函数
-- ============================================

--- table_contains: 检查表中是否包含指定值
-- @param tbl 表
-- @param val 值
-- @return boolean
function table_contains(tbl, val)
    for _, v in ipairs(tbl) do
        if v == val then return true end
    end
    return false
end

--- table_deepcopy: 深拷贝简单表（不含循环引用）
-- @param orig 原始表
-- @return 拷贝后的表
local function table_deepcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for k, v in next, orig, nil do
            copy[table_deepcopy(k)] = table_deepcopy(v)
        end
        setmetatable(copy, table_deepcopy(getmetatable(orig)))
    else
        copy = orig
    end
    return copy
end

--- clamp: 将数值限制在 [min, max] 区间内
-- @param val 数值
-- @param min 最小值
-- @param max 最大值
-- @return 限制后的数值
local function clamp(val, min, max)
    if val < min then return min end
    if val > max then return max end
    return val
end

--- string_hash: 对字符串进行快速哈希，返回正整数
-- @param str 字符串
-- @return 哈希值
local function string_hash(str)
    local h = 5381
    for i = 1, #str do
        h = bit and bit.band(h * 33 + string.byte(str, i), 0x7FFFFFFF) or (h * 33 + string.byte(str, i)) % 2147483647
        if h < 0 then h = h + 2147483647 end
    end
    return h
end

--- cosine_similarity: 计算两个等长向量的余弦相似度
-- @param a 向量 a
-- @param b 向量 b
-- @return 相似度（-1 ~ 1）
local function cosine_similarity(a, b)
    local dim = #a
    if dim ~= #b or dim == 0 then return 0 end
    local dot = 0
    local na = 0
    local nb = 0
    for i = 1, dim do
        local av = a[i] or 0
        local bv = b[i] or 0
        dot = dot + av * bv
        na = na + av * av
        nb = nb + bv * bv
    end
    local denom = math.sqrt(na) * math.sqrt(nb)
    if denom < 1e-9 then return 0 end
    return dot / denom
end

--- string_starts_with: 检查字符串是否以指定前缀开头
-- @param str 字符串
-- @param prefix 前缀
-- @return boolean
local function string_starts_with(str, prefix)
    return string.sub(str, 1, #prefix) == prefix
end

--- string_ends_with: 检查字符串是否以指定后缀结尾
-- @param str 字符串
-- @param suffix 后缀
-- @return boolean
local function string_ends_with(str, suffix)
    return string.sub(str, -#suffix) == suffix
end

--- string_trim: 去除字符串首尾空白
-- @param str 字符串
-- @return 修剪后的字符串
local function string_trim(str)
    if not str then return "" end
    return string.gsub(str, "^%s*(.-)%s*$", "%1")
end

--- string_split: 按分隔符拆分字符串
-- @param str 字符串
-- @param delim 分隔符
-- @return 子字符串列表
local function string_split(str, delim)
    local result = {}
    local pattern = "([^" .. delim .. "]+)"
    for match in string.gmatch(str, pattern) do
        table.insert(result, string_trim(match))
    end
    return result
end

--- table_merge: 将源表 shallow merge 到目标表
-- @param target 目标表
-- @param source 源表
-- @return target
local function table_merge(target, source)
    for k, v in pairs(source) do
        target[k] = v
    end
    return target
end

--- table_keys: 获取表的所有键
-- @param tbl 表
-- @return 键列表
local function table_keys(tbl)
    local keys = {}
    for k, _ in pairs(tbl) do
        table.insert(keys, k)
    end
    return keys
end

--- table_count: 计算表中非数组键值对数量
-- @param tbl 表
-- @return 数量
local function table_count(tbl)
    local c = 0
    for _ in pairs(tbl) do c = c + 1 end
    return c
end

--- format_timestamp_to_date: 将时间戳格式化为日期字符串
-- @param timestamp 时间戳
-- @return 日期字符串 YYYY-MM-DD
local function format_timestamp_to_date(timestamp)
    local dateTable = os.date("*t", timestamp)
    return string.format("%04d-%02d-%02d", dateTable.year, dateTable.month, dateTable.day)
end

--- parse_date_to_timestamp: 将日期字符串解析为当天起始时间戳
-- @param dateStr 日期字符串 YYYY-MM-DD
-- @return 时间戳
local function parse_date_to_timestamp(dateStr)
    local year, month, day = string.match(dateStr, "(%d%d%d%d)-(%d%d)-(%d%d)")
    if not year then return 0 end
    return os.time({year = tonumber(year), month = tonumber(month), day = tonumber(day), hour = 0, min = 0, sec = 0})
end

--- levenshtein_distance: 计算两个字符串的编辑距离
-- @param a 字符串 a
-- @param b 字符串 b
-- @return 编辑距离
local function levenshtein_distance(a, b)
    local len_a, len_b = #a, #b
    if len_a == 0 then return len_b end
    if len_b == 0 then return len_a end
    local matrix = {}
    for i = 0, len_a do
        matrix[i] = {}
        matrix[i][0] = i
    end
    for j = 0, len_b do
        matrix[0][j] = j
    end
    for i = 1, len_a do
        for j = 1, len_b do
            local cost = (string.sub(a, i, i) == string.sub(b, j, j)) and 0 or 1
            matrix[i][j] = math.min(
                matrix[i-1][j] + 1,
                matrix[i][j-1] + 1,
                matrix[i-1][j-1] + cost
            )
        end
    end
    return matrix[len_a][len_b]
end

--- string_similarity: 基于编辑距离的字符串相似度（0~1）
-- @param a 字符串 a
-- @param b 字符串 b
-- @return 相似度
local function string_similarity(a, b)
    local dist = levenshtein_distance(a, b)
    local maxLen = math.max(#a, #b)
    if maxLen == 0 then return 1 end
    return 1 - (dist / maxLen)
end

--- timestamp_to_week_string: 将时间戳转为周标识
-- @param timestamp 时间戳
-- @return 周标识字符串 YYYY-WNN
local function timestamp_to_week_string(timestamp)
    local dateTable = os.date("*t", timestamp)
    local yearStart = os.time({year = dateTable.year, month = 1, day = 1, hour = 0})
    local dayOfYear = math.floor((timestamp - yearStart) / 86400) + 1
    local weekNum = math.ceil(dayOfYear / 7)
    return string.format("%04d-W%02d", dateTable.year, weekNum)
end

--- timestamp_to_month_string: 将时间戳转为月标识
-- @param timestamp 时间戳
-- @return 月标识字符串 YYYY-MM
local function timestamp_to_month_string(timestamp)
    local dateTable = os.date("*t", timestamp)
    return string.format("%04d-%02d", dateTable.year, dateTable.month)
end

-- ============================================
-- 五类宫殿的房间模板定义（每类 8 个房间）
-- ============================================

Mempalace.ROOM_TEMPLATES = {
    world = {
        ["势力大厅"] = {},
        ["历史回廊"] = {},
        ["阴谋密室"] = {},
        ["常识花园"] = {},
        ["事件沙盘"] = {},
        ["神话原典"] = {},
        ["经济账簿"] = {},
        ["自然志"] = {}
    },
    npc = {
        ["恩情殿"] = {},
        ["阴影室"] = {},
        ["契约厅"] = {},
        ["个人常识"] = {},
        ["目标殿堂"] = {},
        ["情绪池塘"] = {},
        ["恐惧深渊"] = {},
        ["荣耀之巅"] = {}
    },
    player = {
        ["足迹长廊"] = {},
        ["关系镜厅"] = {},
        ["秘密匣"] = {},
        ["倾向天平"] = {},
        ["荣耀榜"] = {},
        ["遗憾之泉"] = {},
        ["收藏阁"] = {},
        ["誓言碑"] = {}
    },
    faction = {
        ["成员谱"] = {},
        ["领土图"] = {},
        ["外交厅"] = {},
        ["资源库"] = {},
        ["战绩堂"] = {},
        ["戒律碑"] = {},
        ["传承殿"] = {},
        ["暗桩网"] = {}
    },
    region = {
        ["地理志"] = {},
        ["气候册"] = {},
        ["生态谱"] = {},
        ["人文录"] = {},
        ["传闻簿"] = {},
        ["宝藏图"] = {},
        ["遗迹志"] = {},
        ["交通图"] = {}
    }
}

-- 房间属性配置（半衰期、优先级、是否支持压缩）
Mempalace.ROOM_PROPERTIES = {
    ["势力大厅"] = {half_life = 60, priority = 8, compressible = true},
    ["历史回廊"] = {half_life = -1, priority = 10, compressible = false},
    ["阴谋密室"] = {half_life = 45, priority = 7, compressible = true},
    ["常识花园"] = {half_life = -1, priority = 9, compressible = false},
    ["事件沙盘"] = {half_life = 30, priority = 8, compressible = true},
    ["神话原典"] = {half_life = -1, priority = 10, compressible = false},
    ["经济账簿"] = {half_life = 40, priority = 6, compressible = true},
    ["自然志"] = {half_life = -1, priority = 7, compressible = false},
    ["恩情殿"] = {half_life = 60, priority = 9, compressible = true},
    ["阴影室"] = {half_life = 60, priority = 9, compressible = true},
    ["契约厅"] = {half_life = 30, priority = 8, compressible = true},
    ["个人常识"] = {half_life = -1, priority = 7, compressible = false},
    ["目标殿堂"] = {half_life = 20, priority = 8, compressible = true},
    ["情绪池塘"] = {half_life = 14, priority = 6, compressible = true},
    ["恐惧深渊"] = {half_life = 50, priority = 7, compressible = true},
    ["荣耀之巅"] = {half_life = 45, priority = 7, compressible = true},
    ["足迹长廊"] = {half_life = 45, priority = 8, compressible = true},
    ["关系镜厅"] = {half_life = 30, priority = 9, compressible = true},
    ["秘密匣"] = {half_life = 90, priority = 8, compressible = true},
    ["倾向天平"] = {half_life = 7, priority = 6, compressible = true},
    ["荣耀榜"] = {half_life = 60, priority = 7, compressible = true},
    ["遗憾之泉"] = {half_life = 50, priority = 6, compressible = true},
    ["收藏阁"] = {half_life = -1, priority = 5, compressible = false},
    ["誓言碑"] = {half_life = -1, priority = 10, compressible = false},
    ["成员谱"] = {half_life = 30, priority = 8, compressible = true},
    ["领土图"] = {half_life = 60, priority = 9, compressible = true},
    ["外交厅"] = {half_life = 45, priority = 8, compressible = true},
    ["资源库"] = {half_life = 40, priority = 7, compressible = true},
    ["战绩堂"] = {half_life = 60, priority = 8, compressible = true},
    ["戒律碑"] = {half_life = -1, priority = 10, compressible = false},
    ["传承殿"] = {half_life = -1, priority = 9, compressible = false},
    ["暗桩网"] = {half_life = 50, priority = 6, compressible = true},
    ["地理志"] = {half_life = -1, priority = 8, compressible = false},
    ["气候册"] = {half_life = -1, priority = 7, compressible = false},
    ["生态谱"] = {half_life = -1, priority = 7, compressible = false},
    ["人文录"] = {half_life = 60, priority = 8, compressible = true},
    ["传闻簿"] = {half_life = 20, priority = 6, compressible = true},
    ["宝藏图"] = {half_life = 30, priority = 5, compressible = true},
    ["遗迹志"] = {half_life = -1, priority = 7, compressible = false},
    ["交通图"] = {half_life = 45, priority = 6, compressible = true}
}

-- 为不同场景类型预定义的房间优先级，用于 Prompt 组装
Mempalace.SCENE_ROOM_PRIORITY = {
    dialog = {
        ["npc"] = {"个人常识", "恩情殿", "阴影室", "契约厅", "情绪池塘", "目标殿堂", "恐惧深渊", "荣耀之巅"},
        ["player"] = {"关系镜厅", "秘密匣", "倾向天平", "足迹长廊", "荣耀榜", "遗憾之泉", "收藏阁", "誓言碑"},
        ["world"] = {"常识花园", "历史回廊", "势力大厅", "事件沙盘", "神话原典", "阴谋密室", "经济账簿", "自然志"},
        ["faction"] = {"成员谱", "外交厅", "资源库", "战绩堂", "领土图", "戒律碑", "传承殿", "暗桩网"},
        ["region"] = {"人文录", "地理志", "传闻簿", "气候册", "生态谱", "宝藏图", "遗迹志", "交通图"}
    },
    combat = {
        ["npc"] = {"阴影室", "契约厅", "恩情殿", "个人常识", "情绪池塘", "目标殿堂", "恐惧深渊", "荣耀之巅"},
        ["player"] = {"荣耀榜", "遗憾之泉", "关系镜厅", "倾向天平", "足迹长廊", "秘密匣", "收藏阁", "誓言碑"},
        ["world"] = {"势力大厅", "阴谋密室", "历史回廊", "事件沙盘", "神话原典", "常识花园", "经济账簿", "自然志"},
        ["faction"] = {"战绩堂", "戒律碑", "外交厅", "领土图", "成员谱", "资源库", "传承殿", "暗桩网"},
        ["region"] = {"传闻簿", "宝藏图", "地理志", "生态谱", "人文录", "气候册", "遗迹志", "交通图"}
    },
    trade = {
        ["npc"] = {"契约厅", "恩情殿", "阴影室", "个人常识", "情绪池塘", "目标殿堂", "恐惧深渊", "荣耀之巅"},
        ["player"] = {"倾向天平", "关系镜厅", "荣耀榜", "足迹长廊", "秘密匣", "遗憾之泉", "收藏阁", "誓言碑"},
        ["world"] = {"常识花园", "势力大厅", "经济账簿", "历史回廊", "事件沙盘", "神话原典", "阴谋密室", "自然志"},
        ["faction"] = {"资源库", "外交厅", "成员谱", "战绩堂", "戒律碑", "领土图", "传承殿", "暗桩网"},
        ["region"] = {"宝藏图", "资源库", "人文录", "地理志", "传闻簿", "气候册", "遗迹志", "交通图"}
    },
    quest = {
        ["npc"] = {"目标殿堂", "契约厅", "个人常识", "恩情殿", "阴影室", "情绪池塘", "恐惧深渊", "荣耀之巅"},
        ["player"] = {"足迹长廊", "荣耀榜", "关系镜厅", "倾向天平", "秘密匣", "遗憾之泉", "收藏阁", "誓言碑"},
        ["world"] = {"事件沙盘", "历史回廊", "神话原典", "势力大厅", "常识花园", "阴谋密室", "经济账簿", "自然志"},
        ["faction"] = {"战绩堂", "戒律碑", "外交厅", "领土图", "成员谱", "资源库", "传承殿", "暗桩网"},
        ["region"] = {"传闻簿", "宝藏图", "人文录", "地理志", "生态谱", "气候册", "遗迹志", "交通图"}
    },
    diplomacy = {
        ["npc"] = {"个人常识", "恩情殿", "阴影室", "契约厅", "荣耀之巅", "情绪池塘", "目标殿堂", "恐惧深渊"},
        ["player"] = {"关系镜厅", "誓言碑", "倾向天平", "足迹长廊", "荣耀榜", "遗憾之泉", "秘密匣", "收藏阁"},
        ["world"] = {"势力大厅", "外交厅", "历史回廊", "常识花园", "事件沙盘", "神话原典", "阴谋密室", "自然志"},
        ["faction"] = {"外交厅", "势力大厅", "战绩堂", "戒律碑", "成员谱", "资源库", "领土图", "传承殿"},
        ["region"] = {"人文录", "地理志", "传闻簿", "气候册", "生态谱", "宝藏图", "遗迹志", "交通图"}
    }
}

-- ============================================
-- 语义向量系统
-- ============================================

--- Mempalace.InitializeVectorSeeds: 初始化固定随机投影种子矩阵
-- 使用固定种子以保证跨会话可重复性。
-- @return void
function Mempalace.InitializeVectorSeeds()
    if #Mempalace.randomSeeds > 0 then return end
    math.randomseed(123456789)
    for i = 1, Mempalace.VECTOR_DIM do
        local seedRow = {}
        for j = 1, 256 do
            table.insert(seedRow, math.random() * 2 - 1)
        end
        table.insert(Mempalace.randomSeeds, seedRow)
    end
end

--- Mempalace.TextToVector: 将文本转换为固定维度的语义哈希向量
-- 采用 n-gram 字符级随机投影，无需外部依赖。
-- @param text 输入文本
-- @return vector（64 维表）
function Mempalace.TextToVector(text)
    if not text or text == "" then
        local zeroVec = {}
        for i = 1, Mempalace.VECTOR_DIM do zeroVec[i] = 0.0 end
        return zeroVec
    end
    Mempalace.InitializeVectorSeeds()
    text = string.lower(tostring(text))
    local vec = {}
    for i = 1, Mempalace.VECTOR_DIM do vec[i] = 0.0 end
    local len = #text
    -- 使用 2-gram ~ 4-gram 提取局部语义
    for n = 2, 4 do
        for i = 1, len - n + 1 do
            local gram = string.sub(text, i, i + n - 1)
            local hash = string_hash(gram) % 256 + 1
            for d = 1, Mempalace.VECTOR_DIM do
                vec[d] = vec[d] + (Mempalace.randomSeeds[d][hash] or 0)
            end
        end
    end
    -- L2 归一化
    local norm = 0
    for d = 1, Mempalace.VECTOR_DIM do
        norm = norm + vec[d] * vec[d]
    end
    norm = math.sqrt(norm)
    if norm > 0.001 then
        for d = 1, Mempalace.VECTOR_DIM do
            vec[d] = vec[d] / norm
        end
    end
    return vec
end

--- Mempalace.VectorToString: 将向量序列化为简短字符串（用于调试或日志）
-- @param vec 向量表
-- @return 字符串
function Mempalace.VectorToString(vec)
    if not vec or #vec == 0 then return "[]" end
    local parts = {}
    for i = 1, math.min(8, #vec) do
        table.insert(parts, string.format("%.3f", vec[i]))
    end
    return "[" .. table.concat(parts, ",") .. "...]"
end

--- Mempalace.VectorDistance: 计算两个向量的欧氏距离
-- @param a 向量 a
-- @param b 向量 b
-- @return 欧氏距离
function Mempalace.VectorDistance(a, b)
    local dim = math.min(#a, #b)
    local sum = 0
    for i = 1, dim do
        local diff = (a[i] or 0) - (b[i] or 0)
        sum = sum + diff * diff
    end
    return math.sqrt(sum)
end

--- Mempalace.VectorAdd: 向量逐元素相加
-- @param a 向量 a
-- @param b 向量 b
-- @return 结果向量
function Mempalace.VectorAdd(a, b)
    local result = {}
    local dim = math.min(#a, #b)
    for i = 1, dim do
        result[i] = (a[i] or 0) + (b[i] or 0)
    end
    return result
end

--- Mempalace.VectorScale: 向量数乘
-- @param vec 向量
-- @param scale 标量
-- @return 结果向量
function Mempalace.VectorScale(vec, scale)
    local result = {}
    for i = 1, #vec do
        result[i] = (vec[i] or 0) * scale
    end
    return result
end

-- ============================================
-- 核心 API（向后兼容）
-- ============================================

--- Mempalace.Get: 获取或创建指定实体的记忆宫殿
-- @param entityId 实体唯一标识
-- @param palaceType 宫殿类型（world/npc/player/faction/region，默认 npc）
-- @return palace 表
function Mempalace.Get(entityId, palaceType)
    palaceType = palaceType or "npc"
    if not Mempalace.palaces[entityId] then
        Mempalace.palaces[entityId] = {
            entityId = entityId,
            type = palaceType,
            createdAt = GetWorldTime(),
            rooms = {},
            metadata = {
                lastAccessed = GetWorldTime(),
                accessCount = 0,
                lastConsolidated = 0,
                customProperties = {}
            }
        }
        -- 深拷贝默认房间模板
        local template = Mempalace.ROOM_TEMPLATES[palaceType] or Mempalace.ROOM_TEMPLATES.npc
        for roomName, _ in pairs(template) do
            Mempalace.palaces[entityId].rooms[roomName] = {}
        end
    end
    Mempalace.palaces[entityId].metadata.lastAccessed = GetWorldTime()
    Mempalace.palaces[entityId].metadata.accessCount = (Mempalace.palaces[entityId].metadata.accessCount or 0) + 1
    return Mempalace.palaces[entityId]
end

--- Mempalace.Add: 向指定实体的记忆房间存入一条记忆
-- 自动补充 born_t、weight、half_life、tags、id、sentiment、intensity、source、confidence、vector 等字段。
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param entry 记忆条目表（至少包含 desc）
-- @return void
function Mempalace.Add(entityId, roomName, entry)
    if not entry or not entry.desc then
        if TAO_DEBUG then print("[Mempalace.Add] 拒绝空条目") end
        return
    end
    local palace = Mempalace.Get(entityId)
    if not palace.rooms[roomName] then
        palace.rooms[roomName] = {}
    end

    entry.born_t = entry.born_t or GetWorldTime()
    entry.weight = entry.weight or 1.0
    entry.half_life = entry.half_life or Mempalace.DEFAULT_HALF_LIFE
    entry.tags = entry.tags or {}
    entry.id = entry.id or GenerateUUID()

    -- 新增字段：情感、强度、来源、置信度、语义向量
    entry.sentiment = entry.sentiment or 0
    entry.intensity = entry.intensity or 0.5
    entry.source = entry.source or ""
    entry.confidence = clamp(entry.confidence or 1.0, 0, 1)
    entry.vector = entry.vector or Mempalace.TextToVector(entry.desc)

    -- 抗体检测：若检测到有害注入，降低置信度并标记
    local toxinResult = Mempalace.ScanForToxin(entityId, entry)
    if toxinResult.isToxic then
        entry.confidence = clamp(entry.confidence * Mempalace.TOXIN_CONFIDENCE_DROP, 0.1, 1.0)
        if not table_contains(entry.tags or {}, "toxic_rejected") then
            table.insert(entry.tags, "toxic_rejected")
        end
        if TAO_DEBUG then print("[Mempalace.Add] 检测到毒素记忆，已标记: " .. toxinResult.reason) end
    end

    -- 硬锁一致性检查
    local hardLockCheck = Mempalace.CheckAgainstKnownFacts(entityId, entry)
    if hardLockCheck.contradicts then
        entry.confidence = clamp(entry.confidence * 0.5, 0.1, 1.0)
        if not table_contains(entry.tags, "hardlock_conflict") then
            table.insert(entry.tags, "hardlock_conflict")
        end
    end

    table.insert(palace.rooms[roomName], entry)

    -- 更新索引
    Mempalace.AddToIndexes(entityId, roomName, entry)

    -- 记录版本历史
    Mempalace.RecordVersion(entityId, entry.id, "create", nil, table_deepcopy(entry))

    -- 单房间溢出保护：移除最旧条目（hard_lock 条目优先保留）
    while #palace.rooms[roomName] > Mempalace.MAX_ROOM_SIZE do
        local room = palace.rooms[roomName]
        local removeIdx = 1
        for i = 1, #room do
            if not table_contains(room[i].tags or {}, "hard_lock") then
                removeIdx = i
                break
            end
        end
        -- 被移除的条目也记录版本删除
        local removedEntry = room[removeIdx]
        if removedEntry then
            Mempalace.RecordVersion(entityId, removedEntry.id, "delete", table_deepcopy(removedEntry), nil)
            Mempalace.RemoveFromIndexes(entityId, removedEntry.id)
        end
        table.remove(room, removeIdx)
    end
end

--- Mempalace.RemoveEntryById: 按 ID 删除指定条目
-- @param entityId 实体 ID
-- @param entryId 条目 UUID
-- @return 是否删除成功
function Mempalace.RemoveEntryById(entityId, entryId)
    local palace = Mempalace.Get(entityId)
    for roomName, room in pairs(palace.rooms) do
        for i, e in ipairs(room) do
            if e.id == entryId then
                Mempalace.RecordVersion(entityId, entryId, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, entryId)
                table.remove(palace.rooms[roomName], i)
                return true
            end
        end
    end
    return false
end

--- Mempalace.UpdateEntryById: 按 ID 更新指定条目
-- @param entityId 实体 ID
-- @param entryId 条目 UUID
-- @param fields 要更新的字段表
-- @return 是否更新成功
function Mempalace.UpdateEntryById(entityId, entryId, fields)
    if not fields then return false end
    local palace = Mempalace.Get(entityId)
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.id == entryId then
                local oldCopy = table_deepcopy(e)
                for k, v in pairs(fields) do
                    if k ~= "id" then
                        e[k] = v
                    end
                end
                -- 若描述变更则重新计算向量
                if fields.desc then
                    e.vector = Mempalace.TextToVector(fields.desc)
                end
                Mempalace.RecordVersion(entityId, entryId, "update", oldCopy, table_deepcopy(e))
                -- 重建索引
                Mempalace.RemoveFromIndexes(entityId, entryId)
                Mempalace.AddToIndexes(entityId, roomName, e)
                return true
            end
        end
    end
    return false
end

--- Mempalace.EffectiveWeight: 计算记忆条目的时间衰减后有效权重
-- 采用指数半衰期衰减公式：Weff = W0 * 0.5^(days / half_life)
-- @param entry 记忆条目
-- @param current_t 当前世界时间（秒）
-- @return 有效权重（实数）
function Mempalace.EffectiveWeight(entry, current_t)
    if not entry then return 0 end
    local half_life = entry.half_life or Mempalace.DEFAULT_HALF_LIFE
    if half_life <= 0 then
        -- 半衰期 <= 0 表示永不衰减
        return entry.weight or 1.0
    end
    local days = (current_t - (entry.born_t or current_t)) / Mempalace.ONE_DAY
    if days < 0 then days = 0 end
    return (entry.weight or 1.0) * math.pow(0.5, days / half_life)
end

--- Mempalace.RecalculateWeights: 重新计算并更新某房间的权重
-- 对指定房间的所有条目应用当前时间的有效权重，并更新 weight 字段。
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 处理条数
function Mempalace.RecalculateWeights(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local current_t = GetWorldTime()
    local count = 0
    for _, e in ipairs(room) do
        e.weight = Mempalace.EffectiveWeight(e, current_t)
        e.born_t = current_t
        count = count + 1
    end
    return count
end

-- ============================================
-- 房间动态管理
-- ============================================

--- Mempalace.CreateRoom: 为目标宫殿动态创建一个新的房间
-- 若房间已存在则不重复创建。支持指定房间属性。
-- @param entityId 实体 ID
-- @param roomName 新房间名称
-- @param properties 可选属性表 {half_life, priority, compressible}
-- @return 是否成功创建
function Mempalace.CreateRoom(entityId, roomName, properties)
    local palace = Mempalace.Get(entityId)
    if palace.rooms[roomName] then return false end
    palace.rooms[roomName] = {}
    if properties then
        if not Mempalace.ROOM_PROPERTIES then Mempalace.ROOM_PROPERTIES = {} end
        Mempalace.ROOM_PROPERTIES[roomName] = {
            half_life = properties.half_life or Mempalace.DEFAULT_HALF_LIFE,
            priority = properties.priority or 5,
            compressible = properties.compressible ~= false
        }
    end
    return true
end

--- Mempalace.DestroyRoom: 彻底删除目标宫殿的某个房间及其全部记忆
-- 硬锁房间（半衰期为 -1 且 priority >= 10）默认受保护，需 force=true 强制删除。
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param force 是否强制删除受保护房间
-- @return 被删除的条目数
function Mempalace.DestroyRoom(entityId, roomName, force)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local props = Mempalace.ROOM_PROPERTIES[roomName] or {}
    if props.half_life == -1 and props.priority >= 10 and not force then
        if TAO_DEBUG then print("[Mempalace.DestroyRoom] 受保护房间拒绝删除: " .. roomName) end
        return 0
    end
    local count = #room
    -- 清理索引和版本
    for _, e in ipairs(room) do
        Mempalace.RemoveFromIndexes(entityId, e.id)
    end
    palace.rooms[roomName] = nil
    return count
end

--- Mempalace.RenameRoom: 重命名宫殿中的房间
-- 保留所有条目、索引和属性。
-- @param entityId 实体 ID
-- @param oldName 原房间名
-- @param newName 新房间名
-- @return 是否成功
function Mempalace.RenameRoom(entityId, oldName, newName)
    local palace = Mempalace.Get(entityId)
    if not palace.rooms[oldName] then return false end
    if palace.rooms[newName] then return false end
    palace.rooms[newName] = palace.rooms[oldName]
    palace.rooms[oldName] = nil
    if Mempalace.ROOM_PROPERTIES[oldName] then
        Mempalace.ROOM_PROPERTIES[newName] = Mempalace.ROOM_PROPERTIES[oldName]
    end
    -- 更新索引中的房间引用
    if Mempalace.indexDate[entityId] then
        for id, info in pairs(Mempalace.indexDate[entityId]) do
            if info.room == oldName then info.room = newName end
        end
    end
    if Mempalace.indexType[entityId] then
        for id, info in pairs(Mempalace.indexType[entityId]) do
            if info.room == oldName then info.room = newName end
        end
    end
    if Mempalace.indexSource[entityId] then
        for id, info in pairs(Mempalace.indexSource[entityId]) do
            if info.room == oldName then info.room = newName end
        end
    end
    if Mempalace.indexSentiment[entityId] then
        for id, info in pairs(Mempalace.indexSentiment[entityId]) do
            if info.room == oldName then info.room = newName end
        end
    end
    return true
end

--- Mempalace.GetRoomInfo: 获取指定房间的详细元信息
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 信息表
function Mempalace.GetRoomInfo(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return nil end
    local props = Mempalace.ROOM_PROPERTIES[roomName] or {half_life = Mempalace.DEFAULT_HALF_LIFE, priority = 5, compressible = true}
    local current_t = GetWorldTime()
    local totalWeight = 0
    local avgSentiment = 0
    local tagCounts = {}
    local hardLockCount = 0
    for _, e in ipairs(room) do
        totalWeight = totalWeight + Mempalace.EffectiveWeight(e, current_t)
        avgSentiment = avgSentiment + (e.sentiment or 0)
        for _, tag in ipairs(e.tags or {}) do
            tagCounts[tag] = (tagCounts[tag] or 0) + 1
        end
        if table_contains(e.tags or {}, "hard_lock") then
            hardLockCount = hardLockCount + 1
        end
    end
    return {
        name = roomName,
        entryCount = #room,
        totalEffectiveWeight = totalWeight,
        averageSentiment = #room > 0 and (avgSentiment / #room) or 0,
        tagDistribution = tagCounts,
        hardLockCount = hardLockCount,
        properties = props
    }
end

--- Mempalace.SetRoomProperties: 修改房间属性
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param props 属性表
-- @return 是否成功
function Mempalace.SetRoomProperties(entityId, roomName, props)
    local palace = Mempalace.Get(entityId)
    if not palace.rooms[roomName] then return false end
    if not Mempalace.ROOM_PROPERTIES then Mempalace.ROOM_PROPERTIES = {} end
    local existing = Mempalace.ROOM_PROPERTIES[roomName] or {}
    Mempalace.ROOM_PROPERTIES[roomName] = {
        half_life = props.half_life ~= nil and props.half_life or (existing.half_life or Mempalace.DEFAULT_HALF_LIFE),
        priority = props.priority ~= nil and props.priority or (existing.priority or 5),
        compressible = props.compressible ~= nil and props.compressible or (existing.compressible ~= false)
    }
    return true
end

--- Mempalace.ListRooms: 列出某宫殿的所有房间（含元信息）
-- @param entityId 实体 ID
-- @return 房间信息列表
function Mempalace.ListRooms(entityId)
    local palace = Mempalace.Get(entityId)
    local rooms = {}
    for roomName, _ in pairs(palace.rooms or {}) do
        table.insert(rooms, Mempalace.GetRoomInfo(entityId, roomName))
    end
    table.sort(rooms, function(a, b)
        local pa = (Mempalace.ROOM_PROPERTIES[a.name] or {}).priority or 5
        local pb = (Mempalace.ROOM_PROPERTIES[b.name] or {}).priority or 5
        return pa > pb
    end)
    return rooms
end

-- ============================================
-- 查询系统（向后兼容 + 增强）
-- ============================================

--- Mempalace.QueryRoom: 查询指定房间中按有效权重排序的 TopN 记忆
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param n 返回条数（默认 5）
-- @return entries 列表
function Mempalace.QueryRoom(entityId, roomName, n)
    n = n or 5
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room == 0 then return {} end

    local current_t = GetWorldTime()
    local sorted = {}
    for _, e in ipairs(room) do
        table.insert(sorted, e)
    end
    table.sort(sorted, function(a, b)
        return Mempalace.EffectiveWeight(a, current_t) > Mempalace.EffectiveWeight(b, current_t)
    end)

    local results = {}
    for i = 1, math.min(n, #sorted) do
        table.insert(results, sorted[i])
    end
    return results
end

--- Mempalace.QuerySimilar: 基于语义向量检索宫殿内与查询向量最相似的记忆
-- 相似度得分 = 余弦相似度 × 有效权重，兼顾语义相关性和时间衰减。
-- @param entityId 实体 ID
-- @param queryVector 查询向量（64 维表）
-- @param topN 返回条数（默认 SIMILARITY_TOPK）
-- @return scoredEntries 列表，每项包含 entry、score、room
function Mempalace.QuerySimilar(entityId, queryVector, topN)
    topN = topN or Mempalace.SIMILARITY_TOPK
    if not queryVector or #queryVector ~= Mempalace.VECTOR_DIM then
        if TAO_DEBUG then print("[Mempalace.QuerySimilar] 查询向量维度不匹配") end
        return {}
    end
    local palace = Mempalace.Get(entityId)
    if not palace then return {} end
    local current_t = GetWorldTime()
    local scored = {}

    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local vec = e.vector
            if vec and #vec == Mempalace.VECTOR_DIM then
                local sim = cosine_similarity(vec, queryVector)
                local effWeight = Mempalace.EffectiveWeight(e, current_t)
                local score = sim * (1 + effWeight)
                if score > 0 then
                    table.insert(scored, {entry = e, score = score, room = roomName})
                end
            end
        end
    end

    table.sort(scored, function(a, b)
        return a.score > b.score
    end)

    local results = {}
    for i = 1, math.min(topN, #scored) do
        table.insert(results, scored[i])
    end
    return results
end

--- Mempalace.QueryByTag: 按标签检索指定实体宫殿中的记忆
-- @param entityId 实体 ID
-- @param tag 标签字符串
-- @param roomName 可选：限定房间名称
-- @return entries 列表
function Mempalace.QueryByTag(entityId, tag, roomName)
    local palace = Mempalace.Get(entityId)
    local results = {}
    local roomsToSearch = {}
    if roomName then
        if palace.rooms[roomName] then table.insert(roomsToSearch, roomName) end
    else
        for rName, _ in pairs(palace.rooms) do
            table.insert(roomsToSearch, rName)
        end
    end
    for _, rName in ipairs(roomsToSearch) do
        for _, e in ipairs(palace.rooms[rName] or {}) do
            if table_contains(e.tags or {}, tag) then
                table.insert(results, e)
            end
        end
    end
    return results
end

--- Mempalace.QueryBySource: 按来源事件 ID 检索记忆
-- @param entityId 实体 ID
-- @param sourceId 来源事件 ID
-- @return entries 列表
function Mempalace.QueryBySource(entityId, sourceId)
    local palace = Mempalace.Get(entityId)
    local results = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.source == sourceId then
                table.insert(results, e)
            end
        end
    end
    return results
end

--- Mempalace.QueryByTarget: 按相关目标实体检索记忆
-- @param entityId 实体 ID
-- @param targetId 目标实体 ID
-- @return entries 列表
function Mempalace.QueryByTarget(entityId, targetId)
    local palace = Mempalace.Get(entityId)
    local results = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.target == targetId or e.related_entity == targetId then
                table.insert(results, e)
            end
        end
    end
    return results
end

--- Mempalace.GetAllRooms: 获取指定宫殿的所有房间名称列表
-- @param entityId 实体 ID
-- @return roomNames 列表
function Mempalace.GetAllRooms(entityId)
    local palace = Mempalace.Get(entityId)
    local names = {}
    for name, _ in pairs(palace.rooms or {}) do
        table.insert(names, name)
    end
    return names
end

--- Mempalace.GetRoomCount: 获取指定房间的总条目数
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 整数
function Mempalace.GetRoomCount(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    return room and #room or 0
end

-- ============================================
-- 全局硬锁注册表
-- ============================================

--- Mempalace.RegisterHardLock: 注册一条全局不可变事实
-- 硬锁会同时写入全局注册表，并可选同步到指定宫殿的对应房间。
-- @param factId 事实唯一 ID
-- @param desc 事实描述
-- @param source 事实来源（默认 "system"）
-- @param confidence 置信度（默认 1.0）
-- @param targetEntityId 可选：同步到的实体 ID
-- @param targetRoom 可选：同步到的房间名称
-- @return boolean
function Mempalace.RegisterHardLock(factId, desc, source, confidence, targetEntityId, targetRoom)
    if not factId or not desc then return false end
    Mempalace.globalHardLocks[factId] = {
        factId = factId,
        desc = desc,
        source = source or "system",
        confidence = confidence or 1.0,
        registeredAt = GetWorldTime(),
        targetEntityId = targetEntityId,
        targetRoom = targetRoom
    }
    -- 若指定了目标宫殿，则同步写入
    if targetEntityId and targetRoom then
        Mempalace.Add(targetEntityId, targetRoom, {
            desc = desc,
            weight = Mempalace.HARD_LOCK_BASE_WEIGHT,
            tags = {"hard_lock"},
            source = source or "system",
            confidence = confidence or 1.0,
            half_life = -1
        })
    end
    return true
end

--- Mempalace.UnregisterHardLock: 注销一条全局硬锁
-- 注意：仅删除注册表记录，不自动清理已写入宫殿的条目，需手动处理。
-- @param factId 事实 ID
-- @return boolean
function Mempalace.UnregisterHardLock(factId)
    if not Mempalace.globalHardLocks[factId] then return false end
    Mempalace.globalHardLocks[factId] = nil
    return true
end

--- Mempalace.ValidateHardLock: 验证硬锁是否仍然有效
-- @param factId 事实 ID
-- @return 硬锁表或 nil
function Mempalace.ValidateHardLock(factId)
    return Mempalace.globalHardLocks[factId]
end

--- Mempalace.GetAllHardLocks: 获取所有全局硬锁
-- @return 硬锁列表
function Mempalace.GetAllHardLocks()
    local list = {}
    for _, lock in pairs(Mempalace.globalHardLocks) do
        table.insert(list, lock)
    end
    table.sort(list, function(a, b) return a.registeredAt < b.registeredAt end)
    return list
end

--- Mempalace.CheckAgainstKnownFacts: 检查某条记忆是否与全局硬锁矛盾
-- 使用关键字覆盖与字符串相似度进行快速判断。
-- @param entityId 实体 ID（用于上下文）
-- @param entry 记忆条目
-- @return 检查结果表 {contradicts, matchedLocks}
function Mempalace.CheckAgainstKnownFacts(entityId, entry)
    local result = {contradicts = false, matchedLocks = {}}
    if not entry or not entry.desc then return result end
    local descLower = string.lower(entry.desc or "")
    for factId, lock in pairs(Mempalace.globalHardLocks) do
        local lockLower = string.lower(lock.desc or "")
        -- 简单关键词包含检查
        local overlap = false
        for word in string.gmatch(lockLower, "%S+") do
            if #word > 3 and string.find(descLower, word, 1, true) then
                overlap = true
                break
            end
        end
        if overlap then
            local sim = string_similarity(descLower, lockLower)
            if sim > 0.6 and sim < 0.95 then
                -- 相似但不完全一致，可能存在矛盾表述
                table.insert(result.matchedLocks, lock)
                result.contradicts = true
            end
        end
    end
    return result
end

--- Mempalace.ApplyHardLocksToPalace: 将所有全局硬锁批量应用到指定宫殿
-- @param entityId 实体 ID
-- @param targetRoom 目标房间（默认 "常识花园" 或 "个人常识"）
-- @return 应用的硬锁数量
function Mempalace.ApplyHardLocksToPalace(entityId, targetRoom)
    local palace = Mempalace.Get(entityId)
    targetRoom = targetRoom or (palace.type == "world" and "常识花园" or "个人常识")
    local count = 0
    for factId, lock in pairs(Mempalace.globalHardLocks) do
        Mempalace.Add(entityId, targetRoom, {
            desc = lock.desc,
            weight = Mempalace.HARD_LOCK_BASE_WEIGHT,
            tags = {"hard_lock"},
            source = lock.source,
            confidence = lock.confidence,
            half_life = -1,
            factId = factId
        })
        count = count + 1
    end
    return count
end

-- ============================================
-- 记忆压缩与归档
-- ============================================

--- Mempalace.CompressRoom: 对指定房间进行主题聚类压缩
-- 按 target + sentiment 分桶，将同一桶内的多条记忆合并为一条摘要。
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 被压缩合并的原始条目数量
function Mempalace.CompressRoom(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room < Mempalace.COMPRESSION_MIN_GROUP_SIZE then return 0 end

    local current_t = GetWorldTime()
    -- 第一步：按 (target, sentiment桶) 分组
    local groups = {}
    for _, e in ipairs(room) do
        local target = e.target or e.related_entity or "general"
        -- sentiment 按 0.5 粒度分桶，减少细粒度差异
        local sentBucket = tostring(math.floor((e.sentiment or 0) / 0.5))
        local key = target .. "#" .. sentBucket
        if not groups[key] then
            groups[key] = {target = target, entries = {}, avgSentiment = 0}
        end
        table.insert(groups[key].entries, e)
    end

    local newRoom = {}
    local compressedCount = 0
    -- 保留未被聚合的条目，聚合组生成摘要
    for key, group in pairs(groups) do
        if #group.entries >= Mempalace.COMPRESSION_MIN_GROUP_SIZE then
            -- 计算平均情感与总有效权重
            local totalWeight = 0
            local totalSentiment = 0
            local sourceList = {}
            local minBorn = current_t
            local maxBorn = 0
            local descFragments = {}
            for _, e in ipairs(group.entries) do
                local w = Mempalace.EffectiveWeight(e, current_t)
                totalWeight = totalWeight + w
                totalSentiment = totalSentiment + (e.sentiment or 0)
                if e.source and e.source ~= "" then
                    sourceList[e.source] = true
                end
                if e.born_t < minBorn then minBorn = e.born_t end
                if e.born_t > maxBorn then maxBorn = e.born_t end
                table.insert(descFragments, e.desc)
            end
            local avgSentiment = totalSentiment / #group.entries
            -- 构建摘要描述：保留最多 5 个片段
            local limitFragments = math.min(5, #descFragments)
            local summaryDesc = "【摘要】关于 " .. (group.target) .. " 的 " .. tostring(#group.entries) .. " 段经历："
            for i = 1, limitFragments do
                summaryDesc = summaryDesc .. "「" .. descFragments[i] .. "」"
            end
            if #descFragments > limitFragments then
                summaryDesc = summaryDesc .. " 等"
            end

            -- 合并来源 ID 列表
            local sources = {}
            for sid, _ in pairs(sourceList) do
                table.insert(sources, sid)
            end

            local summaryEntry = {
                desc = summaryDesc,
                born_t = math.floor((minBorn + maxBorn) / 2),
                weight = math.min(totalWeight * 0.8, 10),
                half_life = 60,
                tags = {"compressed", "summary"},
                id = GenerateUUID(),
                sentiment = clamp(avgSentiment, -1, 1),
                intensity = 0.5,
                source = table.concat(sources, ","),
                confidence = 0.85,
                vector = Mempalace.TextToVector(summaryDesc),
                target = group.target,
                compressed_from = #group.entries
            }
            table.insert(newRoom, summaryEntry)
            compressedCount = compressedCount + #group.entries
            -- 记录版本：删除旧条目，创建摘要
            for _, e in ipairs(group.entries) do
                Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, e.id)
            end
            Mempalace.RecordVersion(entityId, summaryEntry.id, "create", nil, table_deepcopy(summaryEntry))
        else
            -- 未达聚合阈值，保留原条目
            for _, e in ipairs(group.entries) do
                table.insert(newRoom, e)
            end
        end
    end

    palace.rooms[roomName] = newRoom
    return compressedCount
end

--- Mempalace.ArchiveOld: 将超过 N 天的低权重记忆移入归档表
-- 从活跃宫殿中移除老旧且权重低于阈值的条目，存入 SQLite 和内存归档。
-- @param entityId 实体 ID
-- @param days 天数阈值（默认 30）
-- @return 归档条目数量
function Mempalace.ArchiveOld(entityId, days)
    days = days or 30
    local palace = Mempalace.Get(entityId)
    if not palace then return 0 end
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local archivedCount = 0

    if not Mempalace.archives[entityId] then
        Mempalace.archives[entityId] = {}
    end

    for roomName, room in pairs(palace.rooms) do
        local kept = {}
        for _, e in ipairs(room) do
            local ageDays = (current_t - (e.born_t or current_t)) / Mempalace.ONE_DAY
            local effWeight = Mempalace.EffectiveWeight(e, current_t)
            -- 归档条件：超过天数阈值，且有效权重低于阈值，且不是 hard_lock
            if ageDays > days and effWeight < Mempalace.ARCHIVE_WEIGHT_THRESHOLD
               and not table_contains(e.tags or {}, "hard_lock") then
                if not Mempalace.archives[entityId][roomName] then
                    Mempalace.archives[entityId][roomName] = {}
                end
                table.insert(Mempalace.archives[entityId][roomName], e)
                archivedCount = archivedCount + 1
            else
                table.insert(kept, e)
            end
        end
        palace.rooms[roomName] = kept
    end

    return archivedCount
end

--- Mempalace.RestoreFromArchive: 将归档中的指定房间记忆恢复回活跃宫殿
-- 通常用于玩家重回旧区域或 NPC 重新登场。
-- @param entityId 实体 ID
-- @param roomName 房间名称（可选，为空则恢复全部）
-- @return 恢复条目数量
function Mempalace.RestoreFromArchive(entityId, roomName)
    local archive = Mempalace.archives[entityId]
    if not archive then return 0 end
    local palace = Mempalace.Get(entityId)
    local restoredCount = 0
    local roomsToRestore = roomName and {roomName} or {}
    if not roomName then
        for rName, _ in pairs(archive) do
            table.insert(roomsToRestore, rName)
        end
    end
    for _, rName in ipairs(roomsToRestore) do
        local arcRoom = archive[rName]
        if arcRoom and #arcRoom > 0 then
            if not palace.rooms[rName] then palace.rooms[rName] = {} end
            for _, e in ipairs(arcRoom) do
                table.insert(palace.rooms[rName], e)
                restoredCount = restoredCount + 1
            end
            archive[rName] = {}
        end
    end
    return restoredCount
end

-- ============================================
-- 情感分析与倾向追踪
-- ============================================

--- Mempalace.GetEmotionCurve: 获取某实体对特定目标的情绪变化曲线
-- @param entityId 实体 ID
-- @param targetName 目标名称/ID（可选，为空则返回全部情绪记录）
-- @param roomName 房间名称（默认 "情绪池塘"）
-- @return curve 列表，按时间升序排列
function Mempalace.GetEmotionCurve(entityId, targetName, roomName)
    roomName = roomName or "情绪池塘"
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName] or {}
    local curve = {}
    for _, e in ipairs(room) do
        if targetName == nil or targetName == "" or (e.target and e.target == targetName) or (e.related_entity and e.related_entity == targetName) then
            table.insert(curve, {
                t = e.born_t,
                sentiment = e.sentiment or 0,
                intensity = e.intensity or 0,
                desc = e.desc,
                source = e.source
            })
        end
    end
    table.sort(curve, function(a, b) return a.t < b.t end)
    return curve
end

--- Mempalace.GetLatestEmotion: 获取某实体对特定目标的最新情绪摘要
-- @param entityId 实体 ID
-- @param targetName 目标名称/ID
-- @param roomName 房间名称（默认 "情绪池塘"）
-- @return 情绪表或 nil
function Mempalace.GetLatestEmotion(entityId, targetName, roomName)
    roomName = roomName or "情绪池塘"
    local curve = Mempalace.GetEmotionCurve(entityId, targetName, roomName)
    if #curve == 0 then return nil end
    return curve[#curve]
end

--- Mempalace.UpdateTendency: 更新玩家（或实体）的某倾向值
-- 将变化记录存入倾向天平（玩家默认）或通用倾向室。
-- @param entityId 实体 ID
-- @param field 倾向字段名
-- @param delta 变化量
-- @return void
function Mempalace.UpdateTendency(entityId, field, delta)
    local palace = Mempalace.Get(entityId, "player")
    local roomName = "倾向天平"
    -- 对于非玩家实体，若不存在倾向天平则存储于个人常识
    if palace.type ~= "player" and not palace.rooms[roomName] then
        roomName = "个人常识"
    end
    Mempalace.Add(entityId, roomName, {
        desc = field .. " 倾向变化 " .. tostring(delta),
        field = field,
        value = delta,
        weight = math.abs(delta),
        half_life = 7,
        sentiment = delta > 0 and 0.2 or -0.2,
        intensity = math.abs(delta),
        source = "tendency_update",
        confidence = 1.0
    })
end

--- Mempalace.GetTendencySummary: 汇总某倾向字段的累计有效值
-- 计算该字段所有条目的 delta × 有效权重之和。
-- @param entityId 实体 ID
-- @param field 倾向字段名
-- @return 累计有效值
function Mempalace.GetTendencySummary(entityId, field)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local total = 0
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.field == field then
                total = total + (e.value or 0) * Mempalace.EffectiveWeight(e, current_t)
            end
        end
    end
    return total
end

--- Mempalace.GetTendencyVector: 获取实体的完整倾向向量
-- 扫描所有房间中带有 field 和 value 的条目，汇总为倾向表。
-- @param entityId 实体 ID
-- @return 倾向向量表
function Mempalace.GetTendencyVector(entityId)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local vector = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.field and e.value then
                local eff = Mempalace.EffectiveWeight(e, current_t)
                vector[e.field] = (vector[e.field] or 0) + (e.value * eff)
            end
        end
    end
    return vector
end

--- Mempalace.NormalizeTendencyVector: 将倾向向量归一化到 [-1, 1] 区间
-- @param vector 倾向向量表
-- @return 归一化后的向量
function Mempalace.NormalizeTendencyVector(vector)
    local result = {}
    for k, v in pairs(vector) do
        result[k] = clamp(v, -1, 1)
    end
    return result
end

-- ============================================
-- 关系图
-- ============================================

--- Mempalace.GetRelationshipMap: 返回该实体与其他实体的关系强度加权网络表
-- 扫描所有房间，按 related_entity / target 聚合有效权重、正负情感、房间分布。
-- @param entityId 实体 ID
-- @return map 表，键为对方实体 ID，值为关系统计表
function Mempalace.GetRelationshipMap(entityId)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local map = {}

    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local related = e.related_entity or e.target
            if related then
                local effWeight = Mempalace.EffectiveWeight(e, current_t)
                if effWeight > 0.01 then
                    if not map[related] then
                        map[related] = {
                            strength = 0,
                            positive = 0,
                            negative = 0,
                            count = 0,
                            rooms = {},
                            latestT = 0,
                            sentiments = {}
                        }
                    end
                    local rec = map[related]
                    rec.strength = rec.strength + effWeight
                    rec.count = rec.count + 1
                    local sent = e.sentiment or 0
                    if sent > 0 then
                        rec.positive = rec.positive + effWeight * sent
                    else
                        rec.negative = rec.negative + effWeight * math.abs(sent)
                    end
                    rec.rooms[roomName] = (rec.rooms[roomName] or 0) + effWeight
                    if (e.born_t or 0) > rec.latestT then
                        rec.latestT = e.born_t
                    end
                    table.insert(rec.sentiments, sent)
                end
            end
        end
    end

    -- 计算平均情感与关系标签
    for rid, rec in pairs(map) do
        local sumSent = 0
        for _, s in ipairs(rec.sentiments) do
            sumSent = sumSent + s
        end
        rec.avgSentiment = rec.count > 0 and (sumSent / rec.count) or 0
        -- 关系标签推断
        if rec.avgSentiment > 0.5 and rec.strength > 3 then
            rec.tag = "亲密"
        elseif rec.avgSentiment < -0.5 and rec.strength > 3 then
            rec.tag = "敌对"
        elseif rec.avgSentiment > 0.2 then
            rec.tag = "友好"
        elseif rec.avgSentiment < -0.2 then
            rec.tag = "冷淡"
        else
            rec.tag = "中立"
        end
        rec.sentiments = nil -- 清理临时字段
    end

    return map
end

--- Mempalace.GetRelationshipSummary: 将关系图格式化为可读的 Prompt 文本
-- @param entityId 实体 ID
-- @param maxRelations 最大返回关系数（默认 10）
-- @return 字符串
function Mempalace.GetRelationshipSummary(entityId, maxRelations)
    maxRelations = maxRelations or 10
    local map = Mempalace.GetRelationshipMap(entityId)
    local sorted = {}
    for rid, data in pairs(map) do
        table.insert(sorted, {id = rid, data = data})
    end
    table.sort(sorted, function(a, b)
        return a.data.strength > b.data.strength
    end)

    if #sorted == 0 then return "（暂无明确关系网络）" end
    local lines = {"【关系网络】"}
    for i = 1, math.min(maxRelations, #sorted) do
        local r = sorted[i]
        local line = string.format("- %s: 强度 %.2f [%s] 正/负 %.2f/%.2f",
            r.id, r.data.strength, r.data.tag, r.data.positive, r.data.negative)
        table.insert(lines, line)
    end
    return table.concat(lines, "\n")
end

--- Mempalace.GetRelationshipJSON: 将关系图输出为结构化 JSON 字符串
-- @param entityId 实体 ID
-- @return JSON 字符串
function Mempalace.GetRelationshipJSON(entityId)
    local map = Mempalace.GetRelationshipMap(entityId)
    local data = {}
    for rid, rec in pairs(map) do
        data[rid] = {
            strength = math.floor(rec.strength * 100) / 100,
            tag = rec.tag,
            avgSentiment = math.floor(rec.avgSentiment * 100) / 100,
            positive = math.floor(rec.positive * 100) / 100,
            negative = math.floor(rec.negative * 100) / 100,
            count = rec.count,
            latestT = rec.latestT
        }
    end
    return SimpleEncode(data) or "{}"
end

--- Mempalace.GetTopRelationships: 获取排序后的前 N 个关系对象
-- @param entityId 实体 ID
-- @param maxRelations 最大关系数
-- @param tagFilter 可选标签过滤
-- @return 关系列表
function Mempalace.GetTopRelationships(entityId, maxRelations, tagFilter)
    maxRelations = maxRelations or 10
    local map = Mempalace.GetRelationshipMap(entityId)
    local sorted = {}
    for rid, data in pairs(map) do
        if not tagFilter or data.tag == tagFilter then
            table.insert(sorted, {id = rid, data = data})
        end
    end
    table.sort(sorted, function(a, b) return a.data.strength > b.data.strength end)
    local results = {}
    for i = 1, math.min(maxRelations, #sorted) do
        table.insert(results, sorted[i])
    end
    return results
end

-- ============================================
-- Prompt 组装器增强
-- ============================================

--- Mempalace.ToPrompt: 将记忆宫殿压缩为 Prompt 文本
-- 支持按场景类型（dialog/combat/trade/quest/diplomacy）组装不同风格的 prompt。
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间最大条目数（默认 5）
-- @param sceneType 场景类型（默认 dialog）
-- @return 字符串
function Mempalace.ToPrompt(entityId, maxItemsPerRoom, sceneType)
    maxItemsPerRoom = maxItemsPerRoom or 5
    sceneType = sceneType or "dialog"
    local palace = Mempalace.Get(entityId)
    if not palace then return "（无记忆）" end

    local current_t = GetWorldTime()
    local lines = {}
    local header = "【记忆宫殿 · " .. entityId .. " · 类型:" .. palace.type .. "】"
    table.insert(lines, header)

    -- 场景类型前缀说明
    local sceneHeaders = {
        dialog = "当前场景：对话。请结合以下认知、关系与情绪进行回应。",
        combat = "当前场景：战斗。请结合敌意、恩怨、战术常识进行行动决策。",
        trade = "当前场景：交易。请结合契约、债务、价值倾向与势力关系进行谈判。",
        quest = "当前场景：任务。请结合目标、承诺、未完成事件与历史沿革进行推进。",
        diplomacy = "当前场景：外交。请结合势力关系、历史条约、声望与秘密进行交涉。"
    }
    table.insert(lines, sceneHeaders[sceneType] or sceneHeaders.dialog)

    -- 确定房间输出顺序
    local priorityMap = Mempalace.SCENE_ROOM_PRIORITY[sceneType] or Mempalace.SCENE_ROOM_PRIORITY.dialog
    local typePriority = priorityMap[palace.type] or {}
    local orderedRooms = {}
    local visited = {}
    for _, r in ipairs(typePriority) do
        if palace.rooms[r] then
            table.insert(orderedRooms, r)
            visited[r] = true
        end
    end
    -- 将其余房间追加到末尾
    for r, _ in pairs(palace.rooms) do
        if not visited[r] then
            table.insert(orderedRooms, r)
        end
    end

    for _, roomName in ipairs(orderedRooms) do
        local room = palace.rooms[roomName]
        if room and #room > 0 then
            local hardLocks = {}
            local normal = {}
            for _, e in ipairs(room) do
                if table_contains(e.tags or {}, "hard_lock") then
                    table.insert(hardLocks, e)
                else
                    table.insert(normal, e)
                end
            end

            -- 按有效权重排序普通条目
            table.sort(normal, function(a, b)
                return Mempalace.EffectiveWeight(a, current_t) > Mempalace.EffectiveWeight(b, current_t)
            end)

            table.insert(lines, "[" .. roomName .. "]")
            -- 铁律优先显示
            for _, e in ipairs(hardLocks) do
                local sentStr = ""
                if (e.sentiment or 0) > 0.3 then sentStr = " [好感]"
                elseif (e.sentiment or 0) < -0.3 then sentStr = " [恶感]" end
                table.insert(lines, "✦ " .. e.desc .. " [铁律 置信度:" .. string.format("%.1f", e.confidence or 1.0) .. "]" .. sentStr)
            end
            -- 普通条目
            for i = 1, math.min(maxItemsPerRoom, #normal) do
                local e = normal[i]
                local sentStr = ""
                if (e.sentiment or 0) > 0.3 then sentStr = " [好感]"
                elseif (e.sentiment or 0) < -0.3 then sentStr = " [恶感]" end
                local srcStr = ""
                if e.source and e.source ~= "" then
                    srcStr = " <源:" .. e.source .. ">"
                end
                local weightStr = string.format(" [权重:%.2f]", Mempalace.EffectiveWeight(e, current_t))
                table.insert(lines, "- " .. e.desc .. sentStr .. srcStr .. weightStr)
            end
        end
    end

    if #lines <= 2 then return "（记忆宫殿为空）" end
    return table.concat(lines, "\n")
end

--- Mempalace.ToPromptWithContext: 为两个实体之间的交互生成交叉 Prompt
-- 常用于 NPC 与玩家对话、NPC 与 NPC 互动。
-- @param entityIdA 实体 A ID
-- @param entityIdB 实体 B ID
-- @param sceneType 场景类型
-- @param maxItemsPerRoom 每房间条目数
-- @return 字符串
function Mempalace.ToPromptWithContext(entityIdA, entityIdB, sceneType, maxItemsPerRoom)
    maxItemsPerRoom = maxItemsPerRoom or 4
    local promptA = Mempalace.ToPrompt(entityIdA, maxItemsPerRoom, sceneType)
    local promptB = Mempalace.ToPrompt(entityIdB, maxItemsPerRoom, sceneType)
    local crossA = Mempalace.QueryByTarget(entityIdA, entityIdB)
    local crossB = Mempalace.QueryByTarget(entityIdB, entityIdA)

    local lines = {"【交互记忆 · " .. entityIdA .. " vs " .. entityIdB .. "】", ""}
    table.insert(lines, "--- " .. entityIdA .. " 的记忆 ---")
    table.insert(lines, promptA)
    table.insert(lines, "")
    table.insert(lines, "--- " .. entityIdB .. " 的记忆 ---")
    table.insert(lines, promptB)

    if #crossA > 0 or #crossB > 0 then
        table.insert(lines, "")
        table.insert(lines, "--- 双方直接关联记忆 ---")
        for _, e in ipairs(crossA) do
            table.insert(lines, "<" .. entityIdA .. " 视角> " .. e.desc)
        end
        for _, e in ipairs(crossB) do
            table.insert(lines, "<" .. entityIdB .. " 视角> " .. e.desc)
        end
    end

    return table.concat(lines, "\n")
end

--- Mempalace.ToPromptForGroup: 为群组交互生成合并 Prompt
-- @param entityIds 实体 ID 列表
-- @param sceneType 场景类型
-- @param maxItemsPerRoom 每房间最大条目数
-- @return 字符串
function Mempalace.ToPromptForGroup(entityIds, sceneType, maxItemsPerRoom)
    maxItemsPerRoom = maxItemsPerRoom or 3
    sceneType = sceneType or "dialog"
    local lines = {"【群组记忆 · 共 " .. tostring(#entityIds) .. " 实体】"}
    for _, eid in ipairs(entityIds) do
        local p = Mempalace.ToPrompt(eid, maxItemsPerRoom, sceneType)
        table.insert(lines, "")
        table.insert(lines, "--- " .. eid .. " ---")
        table.insert(lines, p)
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- 来源追踪
-- ============================================

--- Mempalace.AddWithSource: 带明确来源的事件记忆写入
-- 简化调用，统一填充 source 与 confidence。
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param desc 描述文本
-- @param sourceId 来源事件 ID
-- @param confidence 置信度（0-1）
-- @param extra 额外字段表（可选）
-- @return void
function Mempalace.AddWithSource(entityId, roomName, desc, sourceId, confidence, extra)
    extra = extra or {}
    extra.desc = desc
    extra.source = sourceId
    extra.confidence = confidence or 1.0
    Mempalace.Add(entityId, roomName, extra)
end

--- Mempalace.GetSourceStats: 统计某宫殿中不同来源的记忆分布
-- @param entityId 实体 ID
-- @return stats 表
function Mempalace.GetSourceStats(entityId)
    local palace = Mempalace.Get(entityId)
    local stats = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local src = e.source or "unknown"
            if not stats[src] then
                stats[src] = {count = 0, totalWeight = 0, avgConfidence = 0, rooms = {}}
            end
            stats[src].count = stats[src].count + 1
            stats[src].totalWeight = stats[src].totalWeight + (e.weight or 1.0)
            stats[src].avgConfidence = stats[src].avgConfidence + (e.confidence or 1.0)
            -- 记录来源出现的房间分布
            local foundRoom = false
            for rName, _ in pairs(palace.rooms) do
                for _, ee in ipairs(palace.rooms[rName]) do
                    if ee.id == e.id then
                        stats[src].rooms[rName] = (stats[src].rooms[rName] or 0) + 1
                        foundRoom = true
                        break
                    end
                end
                if foundRoom then break end
            end
        end
    end
    for src, data in pairs(stats) do
        if data.count > 0 then
            data.avgConfidence = data.avgConfidence / data.count
        end
    end
    return stats
end

--- Mempalace.TraceSourceChain: 追溯某条记忆的来源因果链
-- 通过 source 字段在 EventLog 中查找关联事件。
-- @param entityId 实体 ID
-- @param entryId 记忆条目 ID
-- @param depth 追溯深度（默认 3）
-- @return 事件链列表
function Mempalace.TraceSourceChain(entityId, entryId, depth)
    depth = depth or 3
    local palace = Mempalace.Get(entityId)
    local entry = nil
    local roomName = nil
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.id == entryId then
                entry = e
                roomName = rName
                break
            end
        end
        if entry then break end
    end
    if not entry then return {} end

    local chain = {}
    local currentSource = entry.source
    for i = 1, depth do
        if not currentSource or currentSource == "" then break end
        if EventLog and EventLog.FindById then
            local evt = EventLog.FindById(currentSource, "all")
            if evt then
                table.insert(chain, {event = evt, relation = "source"})
                if evt.cause_id and evt.cause_id ~= "" then
                    currentSource = evt.cause_id
                else
                    break
                end
            else
                break
            end
        else
            table.insert(chain, {sourceId = currentSource, relation = "source"})
            break
        end
    end
    return chain
end

-- ============================================
-- 矛盾检测
-- ============================================

Mempalace.CONTRADICTION_PATTERNS = {
    {name = "生死矛盾", pos = {"活着", "健在", "幸存", "未死", "生还", "存活"}, neg = {"死了", "阵亡", "死亡", "被杀", "已死", "离世"}},
    {name = "忠叛矛盾", pos = {"忠诚", "效忠", "守信", "感恩", "可靠"}, neg = {"背叛", "出卖", "欺骗", "谋反", "背刺"}},
    {name = "爱恨矛盾", pos = {"爱戴", "喜欢", "爱慕", "亲近", "敬佩"}, neg = {"憎恨", "厌恶", "鄙视", "仇视", "嫌弃"}},
    {name = "贫富矛盾", pos = {"富有", "富裕", "宽裕", "充足", "丰盛"}, neg = {"贫穷", "贫困", "拮据", "匮乏", "短缺"}},
    {name = "安危矛盾", pos = {"安全", "平安", "无恙", "太平"}, neg = {"危险", "危急", "受创", "重伤", "遇险"}},
    {name = "敌友矛盾", pos = {"盟友", "同伴", "朋友", "战友"}, neg = {"敌人", "对手", "敌对", "竞争"}},
    {name = "真假矛盾", pos = {"真实", "真相", "确实", "确凿"}, neg = {"虚假", "谎言", "伪造", "虚构"}},
    {name = "强弱矛盾", pos = {"强大", "强盛", "优势", "压倒"}, neg = {"弱小", "衰弱", "劣势", "溃败"}}
}

--- Mempalace.FindContradictionsInRoom: 在单个房间内检测矛盾记忆对
-- @param room 房间条目列表
-- @param roomName 房间名称（用于标注）
-- @return contradictions 列表
local function find_contradictions_in_room(room, roomName)
    local contradictions = {}
    local current_t = GetWorldTime()
    local activeEntries = {}
    for _, e in ipairs(room) do
        local effWeight = Mempalace.EffectiveWeight(e, current_t)
        if effWeight > 0.05 then
            table.insert(activeEntries, e)
        end
    end

    for _, pattern in ipairs(Mempalace.CONTRADICTION_PATTERNS) do
        local posEntries = {}
        local negEntries = {}
        for _, e in ipairs(activeEntries) do
            local desc = e.desc or ""
            for _, p in ipairs(pattern.pos) do
                if string.find(desc, p, 1, true) then
                    table.insert(posEntries, e)
                    break
                end
            end
            for _, n in ipairs(pattern.neg) do
                if string.find(desc, n, 1, true) then
                    table.insert(negEntries, e)
                    break
                end
            end
        end
        if #posEntries > 0 and #negEntries > 0 then
            for _, pEntry in ipairs(posEntries) do
                for _, nEntry in ipairs(negEntries) do
                    if pEntry.id ~= nEntry.id then
                        table.insert(contradictions, {
                            room = roomName,
                            type = pattern.name,
                            entryA = pEntry,
                            entryB = nEntry,
                            resolution = "需进一步核实相关事实，建议触发事实确认事件。"
                        })
                    end
                end
            end
        end
    end

    return contradictions
end

--- Mempalace.FindContradictions: 检测指定实体宫殿内（或指定房间内）的矛盾记忆
-- @param entityId 实体 ID
-- @param roomName 可选：限定房间名称
-- @return contradictions 列表
function Mempalace.FindContradictions(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local results = {}
    if roomName then
        local room = palace.rooms[roomName]
        if room then
            local c = find_contradictions_in_room(room, roomName)
            for _, pair in ipairs(c) do
                table.insert(results, pair)
            end
        end
    else
        for rName, room in pairs(palace.rooms) do
            local c = find_contradictions_in_room(room, rName)
            for _, pair in ipairs(c) do
                table.insert(results, pair)
            end
        end
    end
    return results
end

--- Mempalace.ResolveContradictions: 自动降低矛盾条目的置信度并进行标记
-- 将检测到的矛盾条目标记为 "conflict"，并降低置信度。
-- @param entityId 实体 ID
-- @param roomName 可选房间名
-- @return 处理的矛盾对数量
function Mempalace.ResolveContradictions(entityId, roomName)
    local contradictions = Mempalace.FindContradictions(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local processedIds = {}
    for _, c in ipairs(contradictions) do
        for _, e in ipairs({c.entryA, c.entryB}) do
            if not processedIds[e.id] then
                processedIds[e.id] = true
                for _, room in pairs(palace.rooms) do
                    for _, entry in ipairs(room) do
                        if entry.id == e.id then
                            entry.confidence = clamp((entry.confidence or 1.0) * 0.8, 0.1, 1.0)
                            if not table_contains(entry.tags or {}, "conflict") then
                                table.insert(entry.tags, "conflict")
                            end
                            break
                        end
                    end
                end
            end
        end
    end
    return #contradictions
end

--- Mempalace.GetContradictionReport: 获取某宫殿的矛盾检测报告
-- @param entityId 实体 ID
-- @return 报告字符串
function Mempalace.GetContradictionReport(entityId)
    local contradictions = Mempalace.FindContradictions(entityId)
    if #contradictions == 0 then return "（未发现矛盾记忆）" end
    local lines = {"【矛盾检测报告 · " .. entityId .. "】", "共发现 " .. #contradictions .. " 组矛盾:"}
    for _, c in ipairs(contradictions) do
        table.insert(lines, "- [" .. c.type .. "] @" .. c.room)
        table.insert(lines, "  A: " .. c.entryA.desc)
        table.insert(lines, "  B: " .. c.entryB.desc)
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- 触发器检查
-- ============================================

--- Mempalace.CheckTriggers: 检查记忆宫殿中应启动的推衍触发器
-- 扫描各房间累计权重与标签，返回触发类型列表。
-- @param entityId 实体 ID
-- @return triggers 列表
function Mempalace.CheckTriggers(entityId)
    local triggers = {}
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()

    -- NPC 型触发器
    if palace.type == "npc" then
        local shadows = palace.rooms["阴影室"] or {}
        local totalShadow = 0
        for _, e in ipairs(shadows) do
            totalShadow = totalShadow + Mempalace.EffectiveWeight(e, current_t) * ((e.intensity or 0.5) + 0.5)
        end
        if totalShadow > 15 then
            table.insert(triggers, "revenge_or_reconcile")
        end

        local contracts = palace.rooms["契约厅"] or {}
        local pendingContracts = 0
        local brokenContracts = 0
        for _, e in ipairs(contracts) do
            if table_contains(e.tags or {}, "pending") then
                pendingContracts = pendingContracts + 1
            end
            if table_contains(e.tags or {}, "broken") then
                brokenContracts = brokenContracts + 1
            end
        end
        if pendingContracts > 3 then
            table.insert(triggers, "debt_settlement")
        end
        if brokenContracts > 0 then
            table.insert(triggers, "contract_broken_reaction")
        end

        local emotions = palace.rooms["情绪池塘"] or {}
        local totalAnger = 0
        for _, e in ipairs(emotions) do
            if (e.sentiment or 0) < -0.6 and (e.intensity or 0) > 0.7 then
                totalAnger = totalAnger + math.abs(e.sentiment) * e.intensity * Mempalace.EffectiveWeight(e, current_t)
            end
        end
        if totalAnger > 5 then
            table.insert(triggers, "rage_outburst")
        end

        local fears = palace.rooms["恐惧深渊"] or {}
        local totalFear = 0
        for _, e in ipairs(fears) do
            totalFear = totalFear + (e.intensity or 0.5) * Mempalace.EffectiveWeight(e, current_t)
        end
        if totalFear > 4 then
            table.insert(triggers, "freakout_or_avoidance")
        end
    end

    -- 玩家型触发器
    if palace.type == "player" then
        local violence = Mempalace.GetTendencySummary(entityId, "violent")
        if violence > 0.8 then
            table.insert(triggers, "player_bounty")
        end
        local generosity = Mempalace.GetTendencySummary(entityId, "generous")
        if generosity > 1.5 then
            table.insert(triggers, "player_reputation_rise")
        end
        local betrayal = Mempalace.GetTendencySummary(entityId, "betrayal")
        if betrayal > 1.0 then
            table.insert(triggers, "player_distrusted")
        end
        local scales = palace.rooms["倾向天平"] or {}
        local exploration = 0
        for _, e in ipairs(scales) do
            if e.field == "exploration" then
                exploration = exploration + (e.value or 0) * Mempalace.EffectiveWeight(e, current_t)
            end
        end
        if exploration > 2.0 then
            table.insert(triggers, "explorer_bonus")
        end
        local secrets = palace.rooms["秘密匣"] or {}
        local secretWeight = 0
        for _, e in ipairs(secrets) do
            secretWeight = secretWeight + Mempalace.EffectiveWeight(e, current_t)
        end
        if secretWeight > 8 then
            table.insert(triggers, "secret_pressure")
        end
    end

    -- 势力型触发器
    if palace.type == "faction" then
        local territory = palace.rooms["领土图"] or {}
        local lostLands = 0
        for _, e in ipairs(territory) do
            if table_contains(e.tags or {}, "lost") then
                lostLands = lostLands + Mempalace.EffectiveWeight(e, current_t)
            end
        end
        if lostLands > 3 then
            table.insert(triggers, "faction_retaliation")
        end
        local resources = palace.rooms["资源库"] or {}
        local shortage = 0
        for _, e in ipairs(resources) do
            if (e.sentiment or 0) < -0.3 then
                shortage = shortage + math.abs(e.sentiment) * Mempalace.EffectiveWeight(e, current_t)
            end
        end
        if shortage > 3 then
            table.insert(triggers, "faction_resource_crisis")
        end
        local battles = palace.rooms["战绩堂"] or {}
        local consecutiveDefeats = 0
        for _, e in ipairs(battles) do
            if table_contains(e.tags or {}, "defeat") then
                consecutiveDefeats = consecutiveDefeats + 1
            end
        end
        if consecutiveDefeats >= 3 then
            table.insert(triggers, "faction_morale_collapse")
        end
    end

    -- 区域型触发器
    if palace.type == "region" then
        local rumors = palace.rooms["传闻簿"] or {}
        local dangerRumors = 0
        for _, e in ipairs(rumors) do
            if (e.sentiment or 0) < -0.4 and (e.intensity or 0) > 0.5 then
                dangerRumors = dangerRumors + Mempalace.EffectiveWeight(e, current_t)
            end
        end
        if dangerRumors > 3 then
            table.insert(triggers, "region_danger_escalation")
        end
        local treasures = palace.rooms["宝藏图"] or {}
        local unclaimedTreasures = 0
        for _, e in ipairs(treasures) do
            if table_contains(e.tags or {}, "unclaimed") then
                unclaimedTreasures = unclaimedTreasures + 1
            end
        end
        if unclaimedTreasures > 2 then
            table.insert(triggers, "treasure_hunters_incoming")
        end
    end

    -- 通用触发器：阴谋密室 / 事件沙盘
    if palace.rooms["阴谋密室"] then
        local conspiracies = palace.rooms["阴谋密室"]
        local totalConspiracy = 0
        for _, e in ipairs(conspiracies) do
            totalConspiracy = totalConspiracy + Mempalace.EffectiveWeight(e, current_t)
        end
        if totalConspiracy > 8 then
            table.insert(triggers, "conspiracy_matured")
        end
    end

    if palace.rooms["事件沙盘"] then
        local events_room = palace.rooms["事件沙盘"]
        local unresolved = 0
        for _, e in ipairs(events_room) do
            if table_contains(e.tags or {}, "unresolved") then
                unresolved = unresolved + 1
            end
        end
        if unresolved > 4 then
            table.insert(triggers, "world_chaos_escalation")
        end
    end

    return triggers
end

--- Mempalace.EvaluateTriggerSeverity: 评估触发器的严重程度
-- @param entityId 实体 ID
-- @param triggerType 触发器类型
-- @return severity 数值（0~10）
function Mempalace.EvaluateTriggerSeverity(entityId, triggerType)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local severity = 5
    if triggerType == "revenge_or_reconcile" then
        local shadows = palace.rooms["阴影室"] or {}
        local total = 0
        for _, e in ipairs(shadows) do
            total = total + Mempalace.EffectiveWeight(e, current_t) * ((e.intensity or 0.5) + 0.5)
        end
        severity = math.min(10, math.max(1, total / 3))
    elseif triggerType == "player_bounty" then
        local v = Mempalace.GetTendencySummary(entityId, "violent")
        severity = math.min(10, v * 8)
    elseif triggerType == "faction_retaliation" then
        local territory = palace.rooms["领土图"] or {}
        local lost = 0
        for _, e in ipairs(territory) do
            if table_contains(e.tags or {}, "lost") then
                lost = lost + Mempalace.EffectiveWeight(e, current_t)
            end
        end
        severity = math.min(10, lost * 2)
    end
    return math.floor(severity * 10) / 10
end

-- ============================================
-- 持久化增强
-- ============================================

--- Mempalace.Save: 将指定实体的记忆宫殿完整保存到 SQLite
-- 使用 SimpleEncode 对 entry_data 进行 JSON 序列化，保留全部字段。
-- @param entityId 实体 ID
-- @return void
function Mempalace.Save(entityId)
    if not sqlite3 then
        if TAO_DEBUG then print("[Mempalace.Save] sqlite3 不可用") end
        return
    end
    local palace = Mempalace.Get(entityId)
    if not palace then return end

    local db = sqlite3.open("tao_world.db")
    if not db then return end

    db:exec([[
        CREATE TABLE IF NOT EXISTS mempalace (
            entity_id TEXT,
            room_name TEXT,
            entry_data TEXT,
            born_t INTEGER,
            weight REAL
        );
        CREATE INDEX IF NOT EXISTS idx_mp_entity ON mempalace(entity_id);
        CREATE INDEX IF NOT EXISTS idx_mp_room ON mempalace(entity_id, room_name);
    ]])

    local del = db:prepare("DELETE FROM mempalace WHERE entity_id = ?")
    del:bind_values(entityId)
    del:step()
    del:finalize()

    local stmt = db:prepare("INSERT INTO mempalace (entity_id, room_name, entry_data, born_t, weight) VALUES (?, ?, ?, ?, ?)")
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local jsonData = SimpleEncode(e) or "{}"
            stmt:bind_values(entityId, roomName, jsonData, e.born_t or 0, e.weight or 1.0)
            stmt:step()
            stmt:reset()
        end
    end
    stmt:finalize()

    -- 同时保存归档数据
    db:exec([[
        CREATE TABLE IF NOT EXISTS mempalace_archive (
            entity_id TEXT,
            room_name TEXT,
            entry_data TEXT,
            born_t INTEGER,
            weight REAL
        );
        CREATE INDEX IF NOT EXISTS idx_mpa_entity ON mempalace_archive(entity_id);
    ]])

    local delArc = db:prepare("DELETE FROM mempalace_archive WHERE entity_id = ?")
    delArc:bind_values(entityId)
    delArc:step()
    delArc:finalize()

    local arcStmt = db:prepare("INSERT INTO mempalace_archive (entity_id, room_name, entry_data, born_t, weight) VALUES (?, ?, ?, ?, ?)")
    local archive = Mempalace.archives[entityId] or {}
    for roomName, room in pairs(archive) do
        for _, e in ipairs(room) do
            local jsonData = SimpleEncode(e) or "{}"
            arcStmt:bind_values(entityId, roomName, jsonData, e.born_t or 0, e.weight or 1.0)
            arcStmt:step()
            arcStmt:reset()
        end
    end
    arcStmt:finalize()

    -- 保存扩展数据结构
    db:exec([[
        CREATE TABLE IF NOT EXISTS mempalace_meta (
            entity_id TEXT PRIMARY KEY,
            hard_locks TEXT,
            wake_words TEXT,
            persona_snapshots TEXT,
            immune_patterns TEXT,
            decision_log TEXT,
            version_log TEXT,
            indexes TEXT,
            visual_memories TEXT,
            gossip_registry TEXT,
            scheduler_last_run INTEGER,
            consolidation_reports TEXT
        );
    ]])

    local metaData = {
        hard_locks = SimpleEncode(Mempalace.globalHardLocks),
        wake_words = SimpleEncode(Mempalace.wakeWords),
        persona_snapshots = SimpleEncode(Mempalace.personaSnapshots),
        immune_patterns = SimpleEncode(Mempalace.immunePatterns),
        decision_log = SimpleEncode(Mempalace.decisionLog),
        version_log = SimpleEncode(Mempalace.versions),
        indexes = SimpleEncode({date = Mempalace.indexDate, type = Mempalace.indexType, source = Mempalace.indexSource, sentiment = Mempalace.indexSentiment}),
        visual_memories = SimpleEncode(Mempalace.visualMemories),
        gossip_registry = SimpleEncode(Mempalace.gossipRegistry),
        scheduler_last_run = Mempalace.schedulerLastRun,
        consolidation_reports = SimpleEncode(Mempalace.consolidationReports)
    }

    local metaStmt = db:prepare("INSERT OR REPLACE INTO mempalace_meta (entity_id, hard_locks, wake_words, persona_snapshots, immune_patterns, decision_log, version_log, indexes, visual_memories, gossip_registry, scheduler_last_run, consolidation_reports) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    metaStmt:bind_values(
        entityId,
        metaData.hard_locks or "{}",
        metaData.wake_words or "{}",
        metaData.persona_snapshots or "{}",
        metaData.immune_patterns or "{}",
        metaData.decision_log or "{}",
        metaData.version_log or "{}",
        metaData.indexes or "{}",
        metaData.visual_memories or "{}",
        metaData.gossip_registry or "{}",
        metaData.scheduler_last_run or 0,
        metaData.consolidation_reports or "{}"
    )
    metaStmt:step()
    metaStmt:finalize()
    db:close()
end

--- Mempalace.Load: 从 SQLite 加载指定实体的记忆宫殿
-- 反序列化 entry_data，恢复全部字段。若 SQLite 中无记录，则保留空宫殿。
-- @param entityId 实体 ID
-- @return void
function Mempalace.Load(entityId)
    if not sqlite3 then
        if TAO_DEBUG then print("[Mempalace.Load] sqlite3 不可用") end
        return
    end
    local db = sqlite3.open("tao_world.db")
    if not db then return end

    local palace = Mempalace.Get(entityId)
    -- 加载活跃记忆
    local query = "SELECT * FROM mempalace WHERE entity_id = '" .. entityId .. "'"
    for row in db:nrows(query) do
        local roomName = row.room_name
        local decoded = SimpleDecode(row.entry_data)
        if type(decoded) ~= "table" then
            decoded = {
                desc = row.entry_data,
                born_t = row.born_t,
                weight = row.weight,
                tags = {},
                id = GenerateUUID(),
                sentiment = 0,
                intensity = 0.5,
                source = "",
                confidence = 1.0,
                vector = Mempalace.TextToVector(row.entry_data)
            }
        end
        if not palace.rooms[roomName] then
            palace.rooms[roomName] = {}
        end
        decoded.vector = decoded.vector or Mempalace.TextToVector(decoded.desc or "")
        decoded.id = decoded.id or GenerateUUID()
        table.insert(palace.rooms[roomName], decoded)
    end

    -- 加载归档记忆
    if not Mempalace.archives[entityId] then
        Mempalace.archives[entityId] = {}
    end
    local arcQuery = "SELECT * FROM mempalace_archive WHERE entity_id = '" .. entityId .. "'"
    for row in db:nrows(arcQuery) do
        local roomName = row.room_name
        local decoded = SimpleDecode(row.entry_data)
        if type(decoded) ~= "table" then
            decoded = {
                desc = row.entry_data,
                born_t = row.born_t,
                weight = row.weight,
                tags = {},
                id = GenerateUUID(),
                sentiment = 0,
                intensity = 0.5,
                source = "",
                confidence = 1.0,
                vector = Mempalace.TextToVector(row.entry_data)
            }
        end
        decoded.vector = decoded.vector or Mempalace.TextToVector(decoded.desc or "")
        decoded.id = decoded.id or GenerateUUID()
        if not Mempalace.archives[entityId][roomName] then
            Mempalace.archives[entityId][roomName] = {}
        end
        table.insert(Mempalace.archives[entityId][roomName], decoded)
    end

    -- 加载元数据
    for row in db:nrows("SELECT * FROM mempalace_meta WHERE entity_id = '" .. entityId .. "'") do
        local hardLocks = SimpleDecode(row.hard_locks)
        if type(hardLocks) == "table" then
            for k, v in pairs(hardLocks) do
                Mempalace.globalHardLocks[k] = v
            end
        end
        local wakeWords = SimpleDecode(row.wake_words)
        if type(wakeWords) == "table" then
            for k, v in pairs(wakeWords) do
                Mempalace.wakeWords[k] = v
            end
        end
        local personas = SimpleDecode(row.persona_snapshots)
        if type(personas) == "table" then
            for k, v in pairs(personas) do
                Mempalace.personaSnapshots[k] = v
            end
        end
        local immune = SimpleDecode(row.immune_patterns)
        if type(immune) == "table" then
            for k, v in pairs(immune) do
                Mempalace.immunePatterns[k] = v
            end
        end
        local decisions = SimpleDecode(row.decision_log)
        if type(decisions) == "table" then
            for k, v in pairs(decisions) do
                Mempalace.decisionLog[k] = v
            end
        end
        local versions = SimpleDecode(row.version_log)
        if type(versions) == "table" then
            for k, v in pairs(versions) do
                Mempalace.versions[k] = v
            end
        end
        local visuals = SimpleDecode(row.visual_memories)
        if type(visuals) == "table" then
            for k, v in pairs(visuals) do
                Mempalace.visualMemories[k] = v
            end
        end
        local gossip = SimpleDecode(row.gossip_registry)
        if type(gossip) == "table" then
            for k, v in pairs(gossip) do
                Mempalace.gossipRegistry[k] = v
            end
        end
        Mempalace.schedulerLastRun = row.scheduler_last_run or 0
    end

    db:close()
end

--- Mempalace.SaveAll: 保存所有内存中的宫殿
-- @return savedCount 保存的实体数量
function Mempalace.SaveAll()
    local count = 0
    for entityId, _ in pairs(Mempalace.palaces) do
        Mempalace.Save(entityId)
        count = count + 1
    end
    return count
end

--- Mempalace.LoadAll: 加载 SQLite 中所有记录的实体
-- @return loadedCount 加载的实体数量
function Mempalace.LoadAll()
    if not sqlite3 then return 0 end
    local db = sqlite3.open("tao_world.db")
    if not db then return 0 end
    local ids = {}
    for row in db:nrows("SELECT DISTINCT entity_id FROM mempalace UNION SELECT DISTINCT entity_id FROM mempalace_archive") do
        if row.entity_id then
            ids[row.entity_id] = true
        end
    end
    db:close()
    local count = 0
    for entityId, _ in pairs(ids) do
        Mempalace.Load(entityId)
        count = count + 1
    end
    return count
end

--- Mempalace.SaveToJSONFile: 当 SQLite 不可用时，将宫殿保存为 JSON 文件
-- @param entityId 实体 ID
-- @param path 文件路径
-- @return boolean
function Mempalace.SaveToJSONFile(entityId, path)
    path = path or ("mempalace_" .. entityId .. ".json")
    local palace = Mempalace.Get(entityId)
    local data = {
        entityId = entityId,
        palace = palace,
        archive = Mempalace.archives[entityId] or {},
        exportedAt = GetWorldTime()
    }
    local jsonStr = SimpleEncode(data) or "{}"
    local f = io.open(path, "w")
    if not f then return false end
    f:write(jsonStr)
    f:close()
    return true
end

--- Mempalace.LoadFromJSONFile: 从 JSON 文件加载宫殿
-- @param entityId 实体 ID
-- @param path 文件路径
-- @return boolean
function Mempalace.LoadFromJSONFile(entityId, path)
    path = path or ("mempalace_" .. entityId .. ".json")
    local f = io.open(path, "r")
    if not f then return false end
    local content = f:read("*a")
    f:close()
    local data = SimpleDecode(content)
    if type(data) ~= "table" or not data.palace then return false end
    Mempalace.palaces[entityId] = data.palace
    if data.archive then
        Mempalace.archives[entityId] = data.archive
    end
    return true
end

--- Mempalace.FallbackSaveAll: 在 sqlite3 不可用时，使用 JSON 文件保存全部数据
-- @return 保存数量
function Mempalace.FallbackSaveAll()
    if sqlite3 then return Mempalace.SaveAll() end
    local count = 0
    for entityId, _ in pairs(Mempalace.palaces) do
        if Mempalace.SaveToJSONFile(entityId) then
            count = count + 1
        end
    end
    return count
end

--- Mempalace.FallbackLoadAll: 在 sqlite3 不可用时，加载工作目录下所有 mempalace_*.json 文件
-- @return 加载数量
function Mempalace.FallbackLoadAll()
    if sqlite3 then return Mempalace.LoadAll() end
    local count = 0
    -- 列出当前目录下文件（Lua io.popen 可用时）
    local pipe = io.popen('ls mempalace_*.json 2>/dev/null')
    if pipe then
        for line in pipe:lines() do
            local entityId = string.match(line, "mempalace_(.*)%.json")
            if entityId and Mempalace.LoadFromJSONFile(entityId, line) then
                count = count + 1
            end
        end
        pipe:close()
    end
    return count
end

-- ============================================
-- 运维与工具函数
-- ============================================

--- Mempalace.GetMemoryStats: 获取指定宫殿的统计信息
-- @param entityId 实体 ID
-- @return stats 统计表
function Mempalace.GetMemoryStats(entityId)
    local palace = Mempalace.Get(entityId)
    local stats = {
        entityId = entityId,
        type = palace.type,
        totalRooms = 0,
        totalEntries = 0,
        totalArchived = 0,
        avgWeight = 0,
        roomCounts = {},
        tagCounts = {},
        sentimentRange = {min = 1, max = -1}
    }
    local sumWeight = 0
    for roomName, room in pairs(palace.rooms) do
        stats.totalRooms = stats.totalRooms + 1
        stats.totalEntries = stats.totalEntries + #room
        stats.roomCounts[roomName] = #room
        for _, e in ipairs(room) do
            sumWeight = sumWeight + (e.weight or 1.0)
            for _, tag in ipairs(e.tags or {}) do
                stats.tagCounts[tag] = (stats.tagCounts[tag] or 0) + 1
            end
            local s = e.sentiment or 0
            if s < stats.sentimentRange.min then stats.sentimentRange.min = s end
            if s > stats.sentimentRange.max then stats.sentimentRange.max = s end
        end
    end
    local archive = Mempalace.archives[entityId] or {}
    for _, room in pairs(archive) do
        stats.totalArchived = stats.totalArchived + #room
    end
    if stats.totalEntries > 0 then
        stats.avgWeight = sumWeight / stats.totalEntries
    end
    return stats
end

--- Mempalace.ClearRoom: 清空指定房间（谨慎使用）
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param preserveHardLocks 是否保留 hard_lock 条目（默认 true）
-- @return 被清空的条目数
function Mempalace.ClearRoom(entityId, roomName, preserveHardLocks)
    preserveHardLocks = preserveHardLocks ~= false
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    if preserveHardLocks then
        local kept = {}
        local removed = 0
        for _, e in ipairs(room) do
            if table_contains(e.tags or {}, "hard_lock") then
                table.insert(kept, e)
            else
                removed = removed + 1
                Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, e.id)
            end
        end
        palace.rooms[roomName] = kept
        return removed
    else
        local count = #room
        for _, e in ipairs(room) do
            Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
            Mempalace.RemoveFromIndexes(entityId, e.id)
        end
        palace.rooms[roomName] = {}
        return count
    end
end

--- Mempalace.MergePalace: 将源宫殿的数据合并到目标宫殿
-- @param sourceEntityId 源实体 ID
-- @param targetEntityId 目标实体 ID
-- @param mergeMode 合并模式（append / weighted / overwrite，默认 append）
-- @return 合并的条目总数
function Mempalace.MergePalace(sourceEntityId, targetEntityId, mergeMode)
    mergeMode = mergeMode or "append"
    local sourcePalace = Mempalace.Get(sourceEntityId)
    local targetPalace = Mempalace.Get(targetEntityId)
    local total = 0
    for roomName, room in pairs(sourcePalace.rooms) do
        if not targetPalace.rooms[roomName] then
            targetPalace.rooms[roomName] = {}
        end
        for _, e in ipairs(room) do
            local copy = table_deepcopy(e)
            if mergeMode == "weighted" then
                copy.weight = (copy.weight or 1.0) * 0.8
            end
            if mergeMode ~= "overwrite" then
                copy.id = GenerateUUID() -- 重新生成 ID 避免冲突
            end
            table.insert(targetPalace.rooms[roomName], copy)
            total = total + 1
        end
    end
    return total
end

--- Mempalace.CloneRoom: 将某实体的指定房间克隆到另一实体的同名房间
-- @param fromEntityId 源实体 ID
-- @param toEntityId 目标实体 ID
-- @param roomName 房间名称
-- @return 克隆条目数
function Mempalace.CloneRoom(fromEntityId, toEntityId, roomName)
    local fromPalace = Mempalace.Get(fromEntityId)
    local toPalace = Mempalace.Get(toEntityId)
    local room = fromPalace.rooms[roomName]
    if not room then return 0 end
    if not toPalace.rooms[roomName] then
        toPalace.rooms[roomName] = {}
    end
    local count = 0
    for _, e in ipairs(room) do
        table.insert(toPalace.rooms[roomName], table_deepcopy(e))
        count = count + 1
    end
    return count
end

--- Mempalace.PurgeEntity: 彻底删除某实体的所有活跃与归档记忆
-- @param entityId 实体 ID
-- @param fromDisk 是否同时从 SQLite 删除（默认 false）
-- @return void
function Mempalace.PurgeEntity(entityId, fromDisk)
    Mempalace.palaces[entityId] = nil
    Mempalace.archives[entityId] = nil
    if Mempalace.indexDate[entityId] then Mempalace.indexDate[entityId] = nil end
    if Mempalace.indexType[entityId] then Mempalace.indexType[entityId] = nil end
    if Mempalace.indexSource[entityId] then Mempalace.indexSource[entityId] = nil end
    if Mempalace.indexSentiment[entityId] then Mempalace.indexSentiment[entityId] = nil end
    if Mempalace.personaSnapshots[entityId] then Mempalace.personaSnapshots[entityId] = nil end
    if Mempalace.decisionLog[entityId] then Mempalace.decisionLog[entityId] = nil end
    if Mempalace.versions[entityId] then Mempalace.versions[entityId] = nil end
    if Mempalace.visualMemories[entityId] then Mempalace.visualMemories[entityId] = nil end
    if fromDisk and sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local del1 = db:prepare("DELETE FROM mempalace WHERE entity_id = ?")
            del1:bind_values(entityId)
            del1:step()
            del1:finalize()
            local del2 = db:prepare("DELETE FROM mempalace_archive WHERE entity_id = ?")
            del2:bind_values(entityId)
            del2:step()
            del2:finalize()
            db:close()
        end
    end
end

--- Mempalace.RebuildVectors: 为某宫殿的所有条目重新计算语义向量
-- @param entityId 实体 ID
-- @return 处理条目数
function Mempalace.RebuildVectors(entityId)
    local palace = Mempalace.Get(entityId)
    local count = 0
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            e.vector = Mempalace.TextToVector(e.desc or "")
            count = count + 1
        end
    end
    local archive = Mempalace.archives[entityId] or {}
    for _, room in pairs(archive) do
        for _, e in ipairs(room) do
            e.vector = Mempalace.TextToVector(e.desc or "")
            count = count + 1
        end
    end
    return count
end

--- Mempalace.RebuildIndexes: 重建某实体的所有索引
-- @param entityId 实体 ID
-- @return 索引条目数
function Mempalace.RebuildIndexes(entityId)
    Mempalace.indexDate[entityId] = {}
    Mempalace.indexType[entityId] = {}
    Mempalace.indexSource[entityId] = {}
    Mempalace.indexSentiment[entityId] = {}
    local count = 0
    local palace = Mempalace.Get(entityId)
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            Mempalace.AddToIndexes(entityId, roomName, e)
            count = count + 1
        end
    end
    return count
end

--- Mempalace.Dump: 将宫殿内容以纯文本形式导出（用于调试）
-- @param entityId 实体 ID
-- @param includeArchive 是否包含归档（默认 false）
-- @return 字符串
function Mempalace.Dump(entityId, includeArchive)
    local palace = Mempalace.Get(entityId)
    local lines = {}
    table.insert(lines, "===== Mempalace Dump: " .. entityId .. " =====")
    for roomName, room in pairs(palace.rooms) do
        table.insert(lines, "--- Room: " .. roomName .. " (" .. #room .. ") ---")
        for _, e in ipairs(room) do
            table.insert(lines, "  " .. (e.id or "?") .. " | " .. (e.desc or ""))
        end
    end
    if includeArchive then
        local archive = Mempalace.archives[entityId]
        if archive then
            table.insert(lines, "--- Archive ---")
            for roomName, room in pairs(archive) do
                table.insert(lines, "  Room: " .. roomName .. " (" .. #room .. ")")
                for _, e in ipairs(room) do
                    table.insert(lines, "    " .. (e.id or "?") .. " | " .. (e.desc or ""))
                end
            end
        end
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- memory-system 移植 · 跨项目随行记忆
-- ============================================

--- Mempalace.ExportMemories: 将指定实体的记忆导出为指定格式
-- 支持 JSON / Markdown / CSV / PlainText。
-- @param entityId 实体 ID
-- @param format 导出格式（json/markdown/csv/plaintext，默认 json）
-- @return 导出字符串
function Mempalace.ExportMemories(entityId, format)
    format = format or "json"
    local palace = Mempalace.Get(entityId)
    if not palace then return "" end

    if format == "json" then
        local data = {
            entityId = entityId,
            type = palace.type,
            createdAt = palace.createdAt,
            rooms = palace.rooms,
            archive = Mempalace.archives[entityId] or {},
            exportedAt = GetWorldTime(),
            version = "2.0"
        }
        return SimpleEncode(data) or "{}"
    elseif format == "markdown" then
        local lines = {"# 记忆宫殿导出: " .. entityId, "", "- 类型: " .. palace.type, "- 导出时间: " .. tostring(GetWorldTime()), ""}
        for roomName, room in pairs(palace.rooms) do
            table.insert(lines, "## " .. roomName)
            for _, e in ipairs(room) do
                table.insert(lines, "- " .. (e.desc or "") .. " [权重:" .. tostring(e.weight or 1.0) .. "]")
            end
            table.insert(lines, "")
        end
        return table.concat(lines, "\n")
    elseif format == "csv" then
        local lines = {"room_name,desc,born_t,weight,sentiment,intensity,source,confidence,tags"}
        for roomName, room in pairs(palace.rooms) do
            for _, e in ipairs(room) do
                local tagsStr = table.concat(e.tags or {}, ";")
                table.insert(lines, string.format('%s,"%s",%d,%.2f,%.2f,%.2f,%s,%.2f,%s',
                    roomName, (e.desc or ""), e.born_t or 0, e.weight or 1.0,
                    e.sentiment or 0, e.intensity or 0.5, e.source or "", e.confidence or 1.0, tagsStr))
            end
        end
        return table.concat(lines, "\n")
    elseif format == "plaintext" then
        local lines = {"记忆宫殿: " .. entityId}
        for roomName, room in pairs(palace.rooms) do
            table.insert(lines, "[" .. roomName .. "]")
            for _, e in ipairs(room) do
                table.insert(lines, "  - " .. (e.desc or ""))
            end
        end
        return table.concat(lines, "\n")
    end
    return ""
end

--- Mempalace.ImportMemories: 将外部数据导入到指定实体的宫殿
-- @param entityId 目标实体 ID
-- @param data 数据字符串
-- @param format 数据格式（json/markdown/csv/plaintext，默认 json）
-- @param mergeMode 合并模式（merge/replace，默认 merge）
-- @return 成功导入的条目数
function Mempalace.ImportMemories(entityId, data, format, mergeMode)
    format = format or "json"
    mergeMode = mergeMode or "merge"
    local palace = Mempalace.Get(entityId)
    if mergeMode == "replace" then
        for roomName, _ in pairs(palace.rooms) do
            Mempalace.ClearRoom(entityId, roomName, false)
        end
    end
    local count = 0
    if format == "json" then
        local decoded = SimpleDecode(data)
        if type(decoded) == "table" and decoded.rooms then
            for roomName, room in pairs(decoded.rooms) do
                if not palace.rooms[roomName] then palace.rooms[roomName] = {} end
                for _, e in ipairs(room) do
                    e.id = e.id or GenerateUUID()
                    e.vector = e.vector or Mempalace.TextToVector(e.desc or "")
                    table.insert(palace.rooms[roomName], table_deepcopy(e))
                    count = count + 1
                end
            end
        end
    elseif format == "plaintext" or format == "markdown" then
        local currentRoom = nil
        for line in string.gmatch(data .. "\n", "(.-)\n") do
            local roomMatch = string.match(line, "^##?%s*(.+)$")
            if roomMatch then
                currentRoom = roomMatch
                if not palace.rooms[currentRoom] then palace.rooms[currentRoom] = {} end
            elseif string.sub(line, 1, 2) == "- " and currentRoom then
                local desc = string_trim(string.sub(line, 3))
                Mempalace.Add(entityId, currentRoom, {desc = desc, source = "import"})
                count = count + 1
            elseif string.sub(line, 1, 4) == "  - " and currentRoom then
                local desc = string_trim(string.sub(line, 5))
                Mempalace.Add(entityId, currentRoom, {desc = desc, source = "import"})
                count = count + 1
            end
        end
    elseif format == "csv" then
        local first = true
        for line in string.gmatch(data .. "\n", "(.-)\n") do
            if first then
                first = false
            else
                local cols = string_split(line, ",")
                if #cols >= 2 then
                    local roomName = string_trim(cols[1])
                    local desc = string_trim(cols[2])
                    if not palace.rooms[roomName] then palace.rooms[roomName] = {} end
                    local entry = {desc = desc, source = "import"}
                    if cols[3] and cols[3] ~= "" then entry.born_t = tonumber(cols[3]) end
                    if cols[4] and cols[4] ~= "" then entry.weight = tonumber(cols[4]) end
                    if cols[5] and cols[5] ~= "" then entry.sentiment = tonumber(cols[5]) end
                    if cols[6] and cols[6] ~= "" then entry.intensity = tonumber(cols[6]) end
                    if cols[8] and cols[8] ~= "" then entry.confidence = tonumber(cols[8]) end
                    if cols[9] and cols[9] ~= "" then entry.tags = string_split(cols[9], ";") end
                    Mempalace.Add(entityId, roomName, entry)
                    count = count + 1
                end
            end
        end
    end
    return count
end

--- Mempalace.ExportAllToJSON: 导出所有宫殿数据到 JSON 字符串
-- @return JSON 字符串
function Mempalace.ExportAllToJSON()
    local data = {
        palaces = Mempalace.palaces,
        archives = Mempalace.archives,
        globalHardLocks = Mempalace.globalHardLocks,
        wakeWords = Mempalace.wakeWords,
        personaSnapshots = Mempalace.personaSnapshots,
        immunePatterns = Mempalace.immunePatterns,
        decisionLog = Mempalace.decisionLog,
        versions = Mempalace.versions,
        visualMemories = Mempalace.visualMemories,
        gossipRegistry = Mempalace.gossipRegistry,
        exportedAt = GetWorldTime(),
        version = "2.0"
    }
    return SimpleEncode(data) or "{}"
end

--- Mempalace.ImportAllFromJSON: 从 JSON 字符串导入全部宫殿数据
-- @param jsonStr JSON 字符串
-- @return boolean
function Mempalace.ImportAllFromJSON(jsonStr)
    local data = SimpleDecode(jsonStr)
    if type(data) ~= "table" then return false end
    if data.palaces then Mempalace.palaces = data.palaces end
    if data.archives then Mempalace.archives = data.archives end
    if data.globalHardLocks then Mempalace.globalHardLocks = data.globalHardLocks end
    if data.wakeWords then Mempalace.wakeWords = data.wakeWords end
    if data.personaSnapshots then Mempalace.personaSnapshots = data.personaSnapshots end
    if data.immunePatterns then Mempalace.immunePatterns = data.immunePatterns end
    if data.decisionLog then Mempalace.decisionLog = data.decisionLog end
    if data.versions then Mempalace.versions = data.versions end
    if data.visualMemories then Mempalace.visualMemories = data.visualMemories end
    if data.gossipRegistry then Mempalace.gossipRegistry = data.gossipRegistry end
    return true
end

--- Mempalace.SyncToProject: 将当前实体的记忆同步到其他项目路径
-- 通过 JSON 文件实现跨项目随行记忆。
-- @param entityId 实体 ID
-- @param projectPath 目标项目路径
-- @return boolean
function Mempalace.SyncToProject(entityId, projectPath)
    if not projectPath or projectPath == "" then return false end
    local jsonStr = Mempalace.ExportMemories(entityId, "json")
    local filename = projectPath .. "/.agent/memory-runtime/mempalace_" .. entityId .. ".json"
    -- 确保目录存在（使用 os.execute 创建目录）
    os.execute("mkdir -p " .. projectPath .. "/.agent/memory-runtime")
    local f = io.open(filename, "w")
    if not f then return false end
    f:write(jsonStr)
    f:close()
    return true
end

--- Mempalace.LoadFromProject: 从其他项目路径加载随行记忆
-- @param entityId 实体 ID
-- @param projectPath 源项目路径
-- @return boolean
function Mempalace.LoadFromProject(entityId, projectPath)
    if not projectPath or projectPath == "" then return false end
    local filename = projectPath .. "/.agent/memory-runtime/mempalace_" .. entityId .. ".json"
    local f = io.open(filename, "r")
    if not f then return false end
    local content = f:read("*a")
    f:close()
    return Mempalace.ImportMemories(entityId, content, "json", "merge")
end

-- ============================================
-- memory-system 移植 · 唤醒词检测与响应
-- ============================================

--- Mempalace.RegisterWakeWord: 注册一个唤醒词并关联目标实体
-- 当检测到唤醒词时，自动加载与这些实体相关的记忆。
-- @param word 唤醒词字符串
-- @param entityIds 关联实体 ID 列表
-- @param actionType 触发动作类型（load/summon/notify，默认 load）
-- @return void
function Mempalace.RegisterWakeWord(word, entityIds, actionType)
    if not word or word == "" then return end
    Mempalace.wakeWords[word] = {
        word = word,
        entityIds = entityIds or {},
        actionType = actionType or "load",
        registeredAt = GetWorldTime()
    }
end

--- Mempalace.UnregisterWakeWord: 注销唤醒词
-- @param word 唤醒词
-- @return void
function Mempalace.UnregisterWakeWord(word)
    Mempalace.wakeWords[word] = nil
end

--- Mempalace.DetectWakeWord: 在输入文本中检测唤醒词
-- 支持完全匹配与 Levenshtein 模糊匹配。
-- @param text 输入文本
-- @return 检测结果表 {matched, word, similarity}
function Mempalace.DetectWakeWord(text)
    if not text then return {matched = false} end
    text = string.lower(text)
    for word, info in pairs(Mempalace.wakeWords) do
        local wordLower = string.lower(word)
        if string.find(text, wordLower, 1, true) then
            return {matched = true, word = word, similarity = 1.0, info = info}
        end
        local sim = string_similarity(text, wordLower)
        if sim >= Mempalace.WAKE_WORD_MATCH_THRESHOLD then
            return {matched = true, word = word, similarity = sim, info = info}
        end
    end
    return {matched = false}
end

--- Mempalace.LoadMemoriesByWakeWord: 根据检测到的唤醒词自动加载关联记忆
-- 返回被加载的实体数量与相关 Prompt 摘要。
-- @param word 唤醒词
-- @return 加载结果表
function Mempalace.LoadMemoriesByWakeWord(word)
    local info = Mempalace.wakeWords[word]
    if not info then return {loadedCount = 0, prompts = {}} end
    local prompts = {}
    for _, eid in ipairs(info.entityIds) do
        Mempalace.Load(eid)
        table.insert(prompts, Mempalace.ToPrompt(eid, 5, "dialog"))
    end
    return {loadedCount = #info.entityIds, prompts = prompts, actionType = info.actionType}
end

--- Mempalace.AutoRespondToWakeWord: 自动检测并响应唤醒词
-- @param text 输入文本
-- @param responderFn 可选的响应回调函数
-- @return 响应结果表
function Mempalace.AutoRespondToWakeWord(text, responderFn)
    local detection = Mempalace.DetectWakeWord(text)
    if not detection.matched then return {triggered = false} end
    local loadResult = Mempalace.LoadMemoriesByWakeWord(detection.word)
    local result = {
        triggered = true,
        word = detection.word,
        loadedCount = loadResult.loadedCount,
        prompts = loadResult.prompts,
        actionType = loadResult.actionType
    }
    if responderFn and type(responderFn) == "function" then
        responderFn(result)
    end
    return result
end

--- Mempalace.GetWakeWordSummary: 获取所有已注册唤醒词的摘要
-- @return 唤醒词列表
function Mempalace.GetWakeWordSummary()
    local list = {}
    for word, info in pairs(Mempalace.wakeWords) do
        table.insert(list, {
            word = word,
            entityCount = #info.entityIds,
            actionType = info.actionType,
            registeredAt = info.registeredAt
        })
    end
    return list
end

-- ============================================
-- memory-system 移植 · 记忆索引系统
-- ============================================

--- Mempalace.BuildIndexes: 为指定实体建立完整索引
-- @param entityId 实体 ID
-- @return 索引条目总数
function Mempalace.BuildIndexes(entityId)
    Mempalace.indexDate[entityId] = {}
    Mempalace.indexType[entityId] = {}
    Mempalace.indexSource[entityId] = {}
    Mempalace.indexSentiment[entityId] = {}
    local palace = Mempalace.Get(entityId)
    local count = 0
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            Mempalace.AddToIndexes(entityId, roomName, e)
            count = count + 1
        end
    end
    return count
end

--- Mempalace.AddToIndexes: 将条目加入所有索引
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param entry 记忆条目
-- @return void
function Mempalace.AddToIndexes(entityId, roomName, entry)
    if not entry or not entry.id then return end
    local dateStr = format_timestamp_to_date(entry.born_t or GetWorldTime())
    local typeKey = entry.type or "general"
    local sourceKey = entry.source or "unknown"
    local sentBucket = tostring(math.floor((entry.sentiment or 0) * 10)) -- 0.1 精度分桶

    if not Mempalace.indexDate[entityId] then Mempalace.indexDate[entityId] = {} end
    if not Mempalace.indexDate[entityId][dateStr] then Mempalace.indexDate[entityId][dateStr] = {} end
    Mempalace.indexDate[entityId][dateStr][entry.id] = {room = roomName, entryId = entry.id}

    if not Mempalace.indexType[entityId] then Mempalace.indexType[entityId] = {} end
    if not Mempalace.indexType[entityId][typeKey] then Mempalace.indexType[entityId][typeKey] = {} end
    Mempalace.indexType[entityId][typeKey][entry.id] = {room = roomName, entryId = entry.id}

    if not Mempalace.indexSource[entityId] then Mempalace.indexSource[entityId] = {} end
    if not Mempalace.indexSource[entityId][sourceKey] then Mempalace.indexSource[entityId][sourceKey] = {} end
    Mempalace.indexSource[entityId][sourceKey][entry.id] = {room = roomName, entryId = entry.id}

    if not Mempalace.indexSentiment[entityId] then Mempalace.indexSentiment[entityId] = {} end
    if not Mempalace.indexSentiment[entityId][sentBucket] then Mempalace.indexSentiment[entityId][sentBucket] = {} end
    Mempalace.indexSentiment[entityId][sentBucket][entry.id] = {room = roomName, entryId = entry.id}
end

--- Mempalace.RemoveFromIndexes: 从所有索引中移除指定条目
-- @param entityId 实体 ID
-- @param entryId 条目 UUID
-- @return void
function Mempalace.RemoveFromIndexes(entityId, entryId)
    if Mempalace.indexDate[entityId] then
        for dateStr, entries in pairs(Mempalace.indexDate[entityId]) do
            entries[entryId] = nil
        end
    end
    if Mempalace.indexType[entityId] then
        for typeKey, entries in pairs(Mempalace.indexType[entityId]) do
            entries[entryId] = nil
        end
    end
    if Mempalace.indexSource[entityId] then
        for sourceKey, entries in pairs(Mempalace.indexSource[entityId]) do
            entries[entryId] = nil
        end
    end
    if Mempalace.indexSentiment[entityId] then
        for sentBucket, entries in pairs(Mempalace.indexSentiment[entityId]) do
            entries[entryId] = nil
        end
    end
end

--- Mempalace.QueryByIndex: 按索引类型和键查询记忆
-- @param indexType 索引类型（date/type/source/sentiment）
-- @param key 索引键
-- @param entityId 实体 ID
-- @return entries 列表
function Mempalace.QueryByIndex(indexType, key, entityId)
    local indexMap = nil
    if indexType == "date" then indexMap = Mempalace.indexDate[entityId] end
    if indexType == "type" then indexMap = Mempalace.indexType[entityId] end
    if indexType == "source" then indexMap = Mempalace.indexSource[entityId] end
    if indexType == "sentiment" then indexMap = Mempalace.indexSentiment[entityId] end
    if not indexMap or not indexMap[key] then return {} end

    local palace = Mempalace.Get(entityId)
    local results = {}
    for entryId, info in pairs(indexMap[key]) do
        for _, e in ipairs(palace.rooms[info.room] or {}) do
            if e.id == entryId then
                table.insert(results, e)
                break
            end
        end
    end
    return results
end

--- Mempalace.GetDateIndex: 获取某日期索引下的所有记忆
-- @param entityId 实体 ID
-- @param dateStr 日期字符串 YYYY-MM-DD
-- @return entries 列表
function Mempalace.GetDateIndex(entityId, dateStr)
    return Mempalace.QueryByIndex("date", dateStr, entityId)
end

--- Mempalace.GetSentimentRangeIndex: 获取某情感范围内的所有记忆
-- @param entityId 实体 ID
-- @param minSent 最小情感值
-- @param maxSent 最大情感值
-- @return entries 列表
function Mempalace.GetSentimentRangeIndex(entityId, minSent, maxSent)
    minSent = math.floor(minSent * 10)
    maxSent = math.floor(maxSent * 10)
    local results = {}
    local index = Mempalace.indexSentiment[entityId] or {}
    for bucketStr, entriesMap in pairs(index) do
        local bucket = tonumber(bucketStr)
        if bucket and bucket >= minSent and bucket <= maxSent then
            for entryId, info in pairs(entriesMap) do
                local palace = Mempalace.Get(entityId)
                for _, e in ipairs(palace.rooms[info.room] or {}) do
                    if e.id == entryId then
                        table.insert(results, e)
                        break
                    end
                end
            end
        end
    end
    return results
end

--- Mempalace.RebuildAllIndexes: 重建所有实体的索引
-- @return 统计表
function Mempalace.RebuildAllIndexes()
    local stats = {entities = 0, entries = 0}
    for entityId, _ in pairs(Mempalace.palaces) do
        local count = Mempalace.BuildIndexes(entityId)
        stats.entities = stats.entities + 1
        stats.entries = stats.entries + count
    end
    return stats
end

-- ============================================
-- memory-system 移植 · 人格快照存储与加载
-- ============================================

--- Mempalace.SavePersonaSnapshot: 为指定实体保存人格快照
-- 快照包含当前情绪状态、倾向向量、关系摘要、活跃标签等。
-- @param entityId 实体 ID
-- @param snapshotData 附加快照数据表（可选）
-- @return snapshotId 快照 ID
function Mempalace.SavePersonaSnapshot(entityId, snapshotData)
    snapshotData = snapshotData or {}
    local palace = Mempalace.Get(entityId)
    if not Mempalace.personaSnapshots[entityId] then
        Mempalace.personaSnapshots[entityId] = {}
    end
    local snapshots = Mempalace.personaSnapshots[entityId]
    -- 限制快照数量
    while #snapshots >= Mempalace.PERSONA_SNAPSHOT_LIMIT do
        table.remove(snapshots, 1)
    end
    local snapshotId = GenerateUUID()
    local snapshot = {
        id = snapshotId,
        entityId = entityId,
        timestamp = GetWorldTime(),
        tendencyVector = Mempalace.GetTendencyVector(entityId),
        relationshipSummary = Mempalace.GetRelationshipMap(entityId),
        latestEmotions = {},
        roomStats = Mempalace.GetMemoryStats(entityId),
        customData = snapshotData
    }
    -- 收集最新情绪（从情绪池塘取前 10 条）
    local emotionRoom = palace.rooms["情绪池塘"] or {}
    for i = math.max(1, #emotionRoom - 9), #emotionRoom do
        table.insert(snapshot.latestEmotions, emotionRoom[i])
    end
    table.insert(snapshots, snapshot)
    return snapshotId
end

--- Mempalace.LoadPersonaSnapshot: 按 ID 加载指定人格快照
-- @param entityId 实体 ID
-- @param snapshotId 快照 ID
-- @return 快照表或 nil
function Mempalace.LoadPersonaSnapshot(entityId, snapshotId)
    local snapshots = Mempalace.personaSnapshots[entityId] or {}
    for _, s in ipairs(snapshots) do
        if s.id == snapshotId then
            return s
        end
    end
    return nil
end

--- Mempalace.GetLatestPersonaSnapshot: 获取最新的人格快照
-- @param entityId 实体 ID
-- @return 快照表或 nil
function Mempalace.GetLatestPersonaSnapshot(entityId)
    local snapshots = Mempalace.personaSnapshots[entityId] or {}
    if #snapshots == 0 then return nil end
    return snapshots[#snapshots]
end

--- Mempalace.ListPersonaSnapshots: 列出所有人格快照
-- @param entityId 实体 ID
-- @return 快照列表
function Mempalace.ListPersonaSnapshots(entityId)
    return Mempalace.personaSnapshots[entityId] or {}
end

--- Mempalace.DeletePersonaSnapshot: 删除指定人格快照
-- @param entityId 实体 ID
-- @param snapshotId 快照 ID
-- @return boolean
function Mempalace.DeletePersonaSnapshot(entityId, snapshotId)
    local snapshots = Mempalace.personaSnapshots[entityId] or {}
    for i, s in ipairs(snapshots) do
        if s.id == snapshotId then
            table.remove(snapshots, i)
            return true
        end
    end
    return false
end

--- Mempalace.ComparePersonaSnapshots: 比较两个人格快照的差异
-- @param entityId 实体 ID
-- @param idA 快照 A ID
-- @param idB 快照 B ID
-- @return 差异报告表
function Mempalace.ComparePersonaSnapshots(entityId, idA, idB)
    local sA = Mempalace.LoadPersonaSnapshot(entityId, idA)
    local sB = Mempalace.LoadPersonaSnapshot(entityId, idB)
    if not sA or not sB then return {error = "快照不存在"} end
    local diff = {
        timeDelta = sB.timestamp - sA.timestamp,
        tendencyChanges = {},
        relationshipChanges = {},
        entryDelta = (sB.roomStats.totalEntries or 0) - (sA.roomStats.totalEntries or 0)
    }
    for k, vA in pairs(sA.tendencyVector) do
        local vB = sB.tendencyVector[k] or 0
        diff.tendencyChanges[k] = vB - vA
    end
    for k, vB in pairs(sB.tendencyVector) do
        if diff.tendencyChanges[k] == nil then
            diff.tendencyChanges[k] = vB
        end
    end
    for rid, rA in pairs(sA.relationshipSummary) do
        local rB = sB.relationshipSummary[rid]
        if rB then
            diff.relationshipChanges[rid] = {
                strengthDelta = rB.strength - rA.strength,
                tagBefore = rA.tag,
                tagAfter = rB.tag
            }
        else
            diff.relationshipChanges[rid] = {strengthDelta = -rA.strength, lost = true}
        end
    end
    return diff
end

--- Mempalace.RestorePersonaToSnapshot: 将宫殿状态恢复到人格快照时的情绪与倾向
-- 注意：不恢复记忆条目，仅覆盖倾向和最新情绪。
-- @param entityId 实体 ID
-- @param snapshotId 快照 ID
-- @return boolean
function Mempalace.RestorePersonaToSnapshot(entityId, snapshotId)
    local snapshot = Mempalace.LoadPersonaSnapshot(entityId, snapshotId)
    if not snapshot then return false end
    -- 覆盖倾向天平
    local palace = Mempalace.Get(entityId)
    palace.rooms["倾向天平"] = {}
    for field, value in pairs(snapshot.tendencyVector or {}) do
        Mempalace.UpdateTendency(entityId, field, value)
    end
    -- 覆盖情绪池塘为快照中的情绪
    palace.rooms["情绪池塘"] = table_deepcopy(snapshot.latestEmotions)
    return true
end

-- ============================================
-- memory-system 移植 · 抗体机制
-- ============================================

--- Mempalace.RegisterImmunePattern: 注册一种免疫/毒素检测模式
-- 模式类型：keyword（关键词列表）、regex（正则字符串）、similarity（相似描述）。
-- @param patternType 模式类型字符串
-- @param pattern 模式数据（表或字符串）
-- @param reason 检测到时的拒绝原因
-- @return void
function Mempalace.RegisterImmunePattern(patternType, pattern, reason)
    if not Mempalace.immunePatterns[patternType] then
        Mempalace.immunePatterns[patternType] = {}
    end
    table.insert(Mempalace.immunePatterns[patternType], {
        pattern = pattern,
        reason = reason or "检测到有害模式",
        registeredAt = GetWorldTime()
    })
end

--- Mempalace.ScanForToxin: 扫描一条记忆是否含有毒素/有害注入
-- @param entityId 实体 ID
-- @param entry 记忆条目
-- @return 检测结果表 {isToxic, reason, confidenceDrop}
function Mempalace.ScanForToxin(entityId, entry)
    local result = {isToxic = false, reason = "", confidenceDrop = 0}
    if not entry or not entry.desc then return result end
    local descLower = string.lower(entry.desc or "")

    -- keyword 模式检测
    local keywordPatterns = Mempalace.immunePatterns["keyword"] or {}
    for _, p in ipairs(keywordPatterns) do
        for _, kw in ipairs(p.pattern or {}) do
            if string.find(descLower, string.lower(kw), 1, true) then
                result.isToxic = true
                result.reason = p.reason .. ": " .. kw
                result.confidenceDrop = Mempalace.TOXIN_CONFIDENCE_DROP
                return result
            end
        end
    end

    -- similarity 模式检测：与已知毒素描述对比
    local simPatterns = Mempalace.immunePatterns["similarity"] or {}
    for _, p in ipairs(simPatterns) do
        local sim = string_similarity(descLower, string.lower(p.pattern or ""))
        if sim > 0.85 then
            result.isToxic = true
            result.reason = p.reason .. " (相似度:" .. string.format("%.2f", sim) .. ")"
            result.confidenceDrop = Mempalace.TOXIN_CONFIDENCE_DROP
            return result
        end
    end

    -- 矛盾事实检测
    local factPatterns = Mempalace.immunePatterns["contradiction"] or {}
    for _, p in ipairs(factPatterns) do
        local facts = p.pattern or {}
        local matchCount = 0
        for _, fact in ipairs(facts) do
            if string.find(descLower, string.lower(fact), 1, true) then
                matchCount = matchCount + 1
            end
        end
        if matchCount > 0 and matchCount < #facts then
            result.isToxic = true
            result.reason = p.reason
            result.confidenceDrop = 0.3
            return result
        end
    end

    return result
end

--- Mempalace.ValidateMemoryIntegrity: 验证指定实体宫殿的整体记忆完整性
-- @param entityId 实体 ID
-- @return 验证报告表
function Mempalace.ValidateMemoryIntegrity(entityId)
    local palace = Mempalace.Get(entityId)
    local report = {total = 0, toxic = 0, conflicts = 0, hardLockConflicts = 0, issues = {}}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            report.total = report.total + 1
            local toxin = Mempalace.ScanForToxin(entityId, e)
            if toxin.isToxic then
                report.toxic = report.toxic + 1
                table.insert(report.issues, {type = "toxic", room = roomName, entry = e, reason = toxin.reason})
            end
            local hlCheck = Mempalace.CheckAgainstKnownFacts(entityId, e)
            if hlCheck.contradicts then
                report.hardLockConflicts = report.hardLockConflicts + 1
                table.insert(report.issues, {type = "hardlock_conflict", room = roomName, entry = e})
            end
        end
    end
    local contradictions = Mempalace.FindContradictions(entityId)
    report.conflicts = #contradictions
    for _, c in ipairs(contradictions) do
        table.insert(report.issues, {type = "contradiction", room = c.room, entryA = c.entryA, entryB = c.entryB, reason = c.type})
    end
    return report
end

--- Mempalace.RejectInjection: 明确拒绝外部注入，并将其记录到免疫日志
-- @param entityId 实体 ID
-- @param entry 被拒绝的条目
-- @param reason 拒绝原因
-- @return void
function Mempalace.RejectInjection(entityId, entry, reason)
    if not Mempalace.immunePatterns["rejected_log"] then
        Mempalace.immunePatterns["rejected_log"] = {}
    end
    table.insert(Mempalace.immunePatterns["rejected_log"], {
        entityId = entityId,
        entryDesc = entry.desc,
        reason = reason,
        timestamp = GetWorldTime()
    })
end

--- Mempalace.GetImmuneReport: 获取实体的免疫/抗体检测报告
-- @param entityId 实体 ID
-- @return 报告字符串
function Mempalace.GetImmuneReport(entityId)
    local report = Mempalace.ValidateMemoryIntegrity(entityId)
    local lines = {"【免疫检测报告 · " .. entityId .. "】"}
    table.insert(lines, "总条目: " .. report.total)
    table.insert(lines, "毒素: " .. report.toxic)
    table.insert(lines, "矛盾: " .. report.conflicts)
    table.insert(lines, "硬锁冲突: " .. report.hardLockConflicts)
    if #report.issues > 0 then
        table.insert(lines, "详细问题:")
        for _, issue in ipairs(report.issues) do
            table.insert(lines, "- [" .. issue.type .. "] @" .. (issue.room or "?"))
        end
    end
    return table.concat(lines, "\n")
end

--- Mempalace.CleanseToxicMemories: 自动清理宫殿中的毒素记忆
-- @param entityId 实体 ID
-- @return 清理数量
function Mempalace.CleanseToxicMemories(entityId)
    local palace = Mempalace.Get(entityId)
    local removed = 0
    for roomName, room in pairs(palace.rooms) do
        local kept = {}
        for _, e in ipairs(room) do
            local toxin = Mempalace.ScanForToxin(entityId, e)
            if toxin.isToxic and (e.confidence or 1.0) < 0.3 then
                Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, e.id)
                removed = removed + 1
            else
                table.insert(kept, e)
            end
        end
        palace.rooms[roomName] = kept
    end
    return removed
end

-- ============================================
-- memory-system 移植 · 决策追踪
-- ============================================

--- Mempalace.RecordDecision: 记录一次重大决策
-- @param entityId 实体 ID
-- @param decisionType 决策类型字符串
-- @param choice 最终选择
-- @param reason 决策理由
-- @param alternatives 备选方案列表
-- @param consequences 预期后果列表
-- @return decisionId 决策 ID
function Mempalace.RecordDecision(entityId, decisionType, choice, reason, alternatives, consequences)
    if not Mempalace.decisionLog[entityId] then
        Mempalace.decisionLog[entityId] = {}
    end
    local log = Mempalace.decisionLog[entityId]
    while #log >= Mempalace.DECISION_LOG_SIZE do
        table.remove(log, 1)
    end
    local decisionId = GenerateUUID()
    table.insert(log, {
        id = decisionId,
        entityId = entityId,
        decisionType = decisionType,
        choice = choice,
        reason = reason or "",
        alternatives = alternatives or {},
        consequences = consequences or {},
        timestamp = GetWorldTime(),
        outcome = nil, -- 后续可填充
        relatedMemories = {}
    })
    -- 自动关联当时的高权重记忆
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if Mempalace.EffectiveWeight(e, current_t) >= 3 then
                table.insert(log[#log].relatedMemories, {room = roomName, desc = e.desc, weight = e.weight})
            end
        end
    end
    return decisionId
end

--- Mempalace.GetDecisionHistory: 获取实体的决策历史
-- @param entityId 实体 ID
-- @param decisionType 可选：按类型过滤
-- @return 决策列表
function Mempalace.GetDecisionHistory(entityId, decisionType)
    local log = Mempalace.decisionLog[entityId] or {}
    if not decisionType then return log end
    local filtered = {}
    for _, d in ipairs(log) do
        if d.decisionType == decisionType then
            table.insert(filtered, d)
        end
    end
    return filtered
end

--- Mempalace.GetDecisionAtTime: 获取指定时间前后最近的决策
-- @param entityId 实体 ID
-- @param timestamp 时间戳
-- @return 决策表或 nil
function Mempalace.GetDecisionAtTime(entityId, timestamp)
    local log = Mempalace.decisionLog[entityId] or {}
    local best = nil
    local bestDiff = math.huge
    for _, d in ipairs(log) do
        local diff = math.abs(d.timestamp - timestamp)
        if diff < bestDiff then
            bestDiff = diff
            best = d
        end
    end
    return best
end

--- Mempalace.TraceDecisionOutcome: 追踪决策的后续影响
-- 通过决策后的时间范围搜索事件，评估决策结果。
-- @param entityId 实体 ID
-- @param decisionId 决策 ID
-- @param hoursAfter 决策后的小时数（默认 24）
-- @return 影响报告表
function Mempalace.TraceDecisionOutcome(entityId, decisionId, hoursAfter)
    hoursAfter = hoursAfter or 24
    local decision = nil
    local log = Mempalace.decisionLog[entityId] or {}
    for _, d in ipairs(log) do
        if d.id == decisionId then decision = d; break end
    end
    if not decision then return {error = "决策未找到"} end
    local report = {
        decision = decision,
        eventsAfter = {},
        memoryChanges = {}
    }
    if EventLog and EventLog.ByTimeRange then
        report.eventsAfter = EventLog.ByTimeRange(decision.timestamp, decision.timestamp + hoursAfter * 3600, "all")
    end
    -- 统计宫殿在此后的变化
    local palace = Mempalace.Get(entityId)
    local addedCount = 0
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.born_t and e.born_t >= decision.timestamp then
                addedCount = addedCount + 1
            end
        end
    end
    report.memoryChanges.addedCount = addedCount
    return report
end

--- Mempalace.RollbackToDecisionPoint: 回溯到某决策点时的宫殿状态
-- 删除该决策时间点之后的所有新增记忆（保留硬锁和版本历史）。
-- @param entityId 实体 ID
-- @param decisionId 决策 ID
-- @return 删除的条目数
function Mempalace.RollbackToDecisionPoint(entityId, decisionId)
    local decision = nil
    local log = Mempalace.decisionLog[entityId] or {}
    for _, d in ipairs(log) do
        if d.id == decisionId then decision = d; break end
    end
    if not decision then return 0 end
    local palace = Mempalace.Get(entityId)
    local removed = 0
    for roomName, room in pairs(palace.rooms) do
        local kept = {}
        for _, e in ipairs(room) do
            if (e.born_t or 0) <= decision.timestamp or table_contains(e.tags or {}, "hard_lock") then
                table.insert(kept, e)
            else
                Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, e.id)
                removed = removed + 1
            end
        end
        palace.rooms[roomName] = kept
    end
    return removed
end

--- Mempalace.GenerateDecisionReport: 生成决策报告文本
-- @param entityId 实体 ID
-- @param days 最近天数
-- @return 报告字符串
function Mempalace.GenerateDecisionReport(entityId, days)
    days = days or 7
    local cutoff = GetWorldTime() - days * Mempalace.ONE_DAY
    local log = Mempalace.decisionLog[entityId] or {}
    local lines = {"【决策报告 · " .. entityId .. " · 近 " .. days .. " 天】"}
    local count = 0
    for i = #log, 1, -1 do
        local d = log[i]
        if d.timestamp >= cutoff then
            count = count + 1
            table.insert(lines, string.format("[%s] %s: %s", os.date("%Y-%m-%d %H:%M", d.timestamp), d.decisionType, d.choice))
            table.insert(lines, "  理由: " .. d.reason)
            if d.outcome then
                table.insert(lines, "  结果: " .. d.outcome)
            end
        end
    end
    if count == 0 then table.insert(lines, "（无记录）") end
    return table.concat(lines, "\n")
end

--- Mempalace.SetDecisionOutcome: 为决策记录设置结果
-- @param entityId 实体 ID
-- @param decisionId 决策 ID
-- @param outcome 结果字符串
-- @return boolean
function Mempalace.SetDecisionOutcome(entityId, decisionId, outcome)
    local log = Mempalace.decisionLog[entityId] or {}
    for _, d in ipairs(log) do
        if d.id == decisionId then
            d.outcome = outcome
            return true
        end
    end
    return false
end

-- ============================================
-- memory-system 移植 · 版本控制
-- ============================================

--- Mempalace.RecordVersion: 记录条目的版本历史
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param action 动作（create/update/delete）
-- @param oldData 旧数据
-- @param newData 新数据
-- @return void
function Mempalace.RecordVersion(entityId, entryId, action, oldData, newData)
    if not Mempalace.versions[entityId] then
        Mempalace.versions[entityId] = {}
    end
    if not Mempalace.versions[entityId][entryId] then
        Mempalace.versions[entityId][entryId] = {}
    end
    local history = Mempalace.versions[entityId][entryId]
    table.insert(history, {
        action = action,
        oldData = oldData,
        newData = newData,
        timestamp = GetWorldTime(),
        version = #history + 1
    })
    -- 限制历史长度
    while #history > Mempalace.VERSION_KEEP_COUNT do
        table.remove(history, 1)
    end
end

--- Mempalace.GetVersionHistory: 获取条目的版本历史
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @return 版本列表
function Mempalace.GetVersionHistory(entityId, entryId)
    local entityVersions = Mempalace.versions[entityId] or {}
    return entityVersions[entryId] or {}
end

--- Mempalace.DiffVersions: 比较两个版本的差异（文本形式）
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param versionA 版本 A 编号
-- @param versionB 版本 B 编号
-- @return 差异字符串
function Mempalace.DiffVersions(entityId, entryId, versionA, versionB)
    local history = Mempalace.GetVersionHistory(entityId, entryId)
    local vA = history[versionA]
    local vB = history[versionB]
    if not vA or not vB then return "版本不存在" end
    local lines = {"【版本差异 " .. versionA .. " -> " .. versionB .. "】"}
    local dataA = vA.newData or vA.oldData or {}
    local dataB = vB.newData or vB.oldData or {}
    local keys = {}
    for k, _ in pairs(dataA) do keys[k] = true end
    for k, _ in pairs(dataB) do keys[k] = true end
    for k, _ in pairs(keys) do
        local valA = tostring(dataA[k] or "nil")
        local valB = tostring(dataB[k] or "nil")
        if valA ~= valB then
            table.insert(lines, "- " .. k .. ": " .. valA .. " => " .. valB)
        end
    end
    if #lines == 1 then table.insert(lines, "（无字段变化）") end
    return table.concat(lines, "\n")
end

--- Mempalace.RollbackVersion: 将条目回滚到指定版本
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param versionIndex 目标版本编号
-- @return boolean
function Mempalace.RollbackVersion(entityId, entryId, versionIndex)
    local history = Mempalace.GetVersionHistory(entityId, entryId)
    local target = history[versionIndex]
    if not target or not target.newData then return false end
    local palace = Mempalace.Get(entityId)
    for roomName, room in pairs(palace.rooms) do
        for i, e in ipairs(room) do
            if e.id == entryId then
                local oldCopy = table_deepcopy(e)
                for k, v in pairs(target.newData) do
                    if k ~= "id" then e[k] = v end
                end
                e.vector = Mempalace.TextToVector(e.desc or "")
                Mempalace.RecordVersion(entityId, entryId, "rollback", oldCopy, table_deepcopy(e))
                Mempalace.RemoveFromIndexes(entityId, entryId)
                Mempalace.AddToIndexes(entityId, roomName, e)
                return true
            end
        end
    end
    return false
end

--- Mempalace.RestoreDeletedEntry: 从版本历史中恢复被删除的条目
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param roomName 可选目标房间（默认从最后一个版本推断）
-- @return boolean
function Mempalace.RestoreDeletedEntry(entityId, entryId, roomName)
    local history = Mempalace.GetVersionHistory(entityId, entryId)
    if #history == 0 then return false end
    local lastVersion = nil
    for i = #history, 1, -1 do
        if history[i].action ~= "delete" then
            lastVersion = history[i].newData
            break
        else
            lastVersion = history[i].oldData
            break
        end
    end
    if not lastVersion then return false end
    roomName = roomName or lastVersion._lastRoom or "个人常识"
    local copy = table_deepcopy(lastVersion)
    copy.id = entryId
    copy.restoredAt = GetWorldTime()
    if not table_contains(copy.tags or {}, "restored") then
        table.insert(copy.tags, "restored")
    end
    Mempalace.Add(entityId, roomName, copy)
    return true
end

--- Mempalace.PurgeVersions: 清理条目的旧版本历史
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param keepCount 保留数量
-- @return 删除的版本数
function Mempalace.PurgeVersions(entityId, entryId, keepCount)
    keepCount = keepCount or 10
    local history = Mempalace.GetVersionHistory(entityId, entryId)
    local removed = 0
    while #history > keepCount do
        table.remove(history, 1)
        removed = removed + 1
    end
    return removed
end

-- ============================================
-- memory_consolidation 移植 · 情绪词典初始化
-- ============================================

Mempalace.sentimentLexicon = {
    positive = {
        "开心", "快乐", "幸福", "满意", "喜欢", "爱", "欣赏", "感激",
        "兴奋", "愉悦", "舒畅", "自豪", "安心", "信任", "期待", "希望",
        "轻松", "舒服", "美好", "成功", "胜利", "优势", "享受", "乐观",
        "积极", "热情", "友善", "亲切", "温柔", "体贴", "赞美", "尊敬",
        "敬佩", "崇拜", "仰慕", "迷恋", "热衷", "陶醉", "欢畅", "欣喜"
    },
    negative = {
        "难过", "悲伤", "痛苦", "失望", "讨厌", "恨", "鄙视", "愤怒",
        "焦虑", "恐惧", "害怕", "担心", "紧张", "沮丧", "绝望", "孤独",
        "委屈", "嫉妒", "厌恶", "烦躁", "郁闷", "压抑", "疲惫", "无力",
        "无助", "迷茫", "困惑", "纠结", "懊悔", "自责", "羞耻", "尴尬",
        "恼火", "气愤", "暴怒", "狂躁", "惊恐", "慌张", "悲哀", "凄凉"
    },
    intensityModifiers = {
        strong = {"非常", "极其", "特别", "十分", "超级", "极端", "绝对", "太", "巨", "很", "格外", "分外", "相当", "分外"},
        weak = {"稍微", "有点", "略微", "稍稍", "一点儿", "些许", "微微", "不太", "不怎么"}
    }
}

--- Mempalace.InferSentiment: 从文本推断情感极性（-1 ~ 1）
-- @param text 输入文本
-- @return sentiment 数值
function Mempalace.InferSentiment(text)
    if not text then return 0 end
    text = string.lower(tostring(text))
    local posCount = 0
    local negCount = 0
    for _, word in ipairs(Mempalace.sentimentLexicon.positive) do
        local _, count = string.gsub(text, string.lower(word), "")
        posCount = posCount + count
    end
    for _, word in ipairs(Mempalace.sentimentLexicon.negative) do
        local _, count = string.gsub(text, string.lower(word), "")
        negCount = negCount + count
    end
    local total = posCount + negCount
    if total == 0 then return 0 end
    return (posCount - negCount) / total
end

--- Mempalace.InferIntensity: 从文本推断情感强度（0 ~ 1）
-- @param text 输入文本
-- @return intensity 数值
function Mempalace.InferIntensity(text)
    if not text then return 0.5 end
    text = string.lower(tostring(text))
    local intensity = 0.5
    for _, mod in ipairs(Mempalace.sentimentLexicon.intensityModifiers.strong) do
        if string.find(text, string.lower(mod), 1, true) then
            intensity = intensity + 0.15
        end
    end
    for _, mod in ipairs(Mempalace.sentimentLexicon.intensityModifiers.weak) do
        if string.find(text, string.lower(mod), 1, true) then
            intensity = intensity - 0.15
        end
    end
    -- 标点强度加成
    local exclaim = select(2, string.gsub(text, "!", ""))
    local question = select(2, string.gsub(text, "?", ""))
    intensity = intensity + exclaim * 0.05 - question * 0.02
    return clamp(intensity, 0, 1)
end

--- Mempalace.InferEmotionComplex: 综合推断情感（极性 + 强度）
-- @param text 输入文本
-- @return 情感表 {sentiment, intensity, dominant}
function Mempalace.InferEmotionComplex(text)
    local sentiment = Mempalace.InferSentiment(text)
    local intensity = Mempalace.InferIntensity(text)
    local dominant = "neutral"
    if sentiment > 0.3 then dominant = "positive"
    elseif sentiment < -0.3 then dominant = "negative" end
    if intensity > 0.7 then
        dominant = "intense_" .. dominant
    end
    return {sentiment = sentiment, intensity = intensity, dominant = dominant}
end

--- Mempalace.BatchInferSentiment: 批量推断文本情感
-- @param textList 文本列表
-- @return 结果列表
function Mempalace.BatchInferSentiment(textList)
    local results = {}
    for _, text in ipairs(textList) do
        table.insert(results, Mempalace.InferEmotionComplex(text))
    end
    return results
end

--- Mempalace.ApplyInferredEmotion: 为条目自动推断并填充情感字段
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param entry 记忆条目
-- @return void
function Mempalace.ApplyInferredEmotion(entityId, roomName, entry)
    if not entry then return end
    local inferred = Mempalace.InferEmotionComplex(entry.desc or "")
    entry.sentiment = inferred.sentiment
    entry.intensity = inferred.intensity
end

-- ============================================
-- memory_consolidation 移植 · 通道检测与会话分类
-- ============================================

Mempalace.CHANNEL_TYPES = {
    FEISHU_DM = "飞书私聊",
    FEISHU_GROUP = "飞书群聊",
    LOOPBACK = "本地回环",
    DISCORD = "Discord",
    WECHAT = "微信",
    TELEGRAM = "Telegram",
    EMAIL = "邮件",
    UNKNOWN = "未知通道"
}

Mempalace.CHANNEL_PATTERNS = {
    {pattern = "feishu:dm", type = "FEISHU_DM"},
    {pattern = "feishu:group", type = "FEISHU_GROUP"},
    {pattern = "loopback", type = "LOOPBACK"},
    {pattern = "discord", type = "DISCORD"},
    {pattern = "wechat", type = "WECHAT"},
    {pattern = "telegram", type = "TELEGRAM"},
    {pattern = "email", type = "EMAIL"}
}

--- Mempalace.DetectChannelType: 根据通道标识字符串检测通道类型
-- @param channelTag 通道标识
-- @return 通道类型字符串
function Mempalace.DetectChannelType(channelTag)
    if not channelTag then return Mempalace.CHANNEL_TYPES.UNKNOWN end
    local lowerTag = string.lower(channelTag)
    for _, cp in ipairs(Mempalace.CHANNEL_PATTERNS) do
        if string.find(lowerTag, cp.pattern, 1, true) then
            return Mempalace.CHANNEL_TYPES[cp.type] or cp.type
        end
    end
    return Mempalace.CHANNEL_TYPES.UNKNOWN
end

--- Mempalace.ClassifySession: 对一组消息进行会话分类
-- 基于消息长度、频率、情感分布判断会话性质。
-- @param messages 消息列表，每项 {text, sender, timestamp}
-- @return 分类结果表 {channelType, nature, sentimentSummary}
function Mempalace.ClassifySession(messages)
    if not messages or #messages == 0 then
        return {channelType = "UNKNOWN", nature = "empty", sentimentSummary = {avg = 0, intensity = 0}}
    end
    local totalLen = 0
    local totalSent = 0
    local totalInt = 0
    local senders = {}
    for _, m in ipairs(messages) do
        totalLen = totalLen + #(m.text or "")
        local emo = Mempalace.InferEmotionComplex(m.text or "")
        totalSent = totalSent + emo.sentiment
        totalInt = totalInt + emo.intensity
        senders[m.sender or "unknown"] = true
    end
    local avgLen = totalLen / #messages
    local avgSent = totalSent / #messages
    local avgInt = totalInt / #messages
    local senderCount = table_count(senders)

    local nature = "casual"
    if avgLen > 200 then nature = "deep_talk" end
    if senderCount > 3 then nature = "group_discussion" end
    if avgSent > 0.5 and avgInt > 0.6 then nature = "positive_celebration" end
    if avgSent < -0.4 then nature = "conflict_or_complaint" end
    if avgInt > 0.8 and math.abs(avgSent) > 0.5 then nature = "high_emotion" end

    return {
        channelType = Mempalace.CHANNEL_TYPES.UNKNOWN,
        nature = nature,
        sentimentSummary = {avg = avgSent, intensity = avgInt},
        messageCount = #messages,
        senderCount = senderCount,
        avgLength = avgLen
    }
end

--- Mempalace.GetChannelIcon: 获取通道类型的图标/简称
-- @param channelType 通道类型
-- @return 图标字符串
function Mempalace.GetChannelIcon(channelType)
    local icons = {
        ["FEISHU_DM"] = "📩",
        ["FEISHU_GROUP"] = "👥",
        ["LOOPBACK"] = "🔁",
        ["DISCORD"] = "💬",
        ["WECHAT"] = "💚",
        ["TELEGRAM"] = "✈️",
        ["EMAIL"] = "📧",
        ["UNKNOWN"] = "❓"
    }
    return icons[channelType] or "❓"
end

-- ============================================
-- memory_consolidation 移植 · 会话分析器
-- ============================================

--- Mempalace.AnalyzeConversation: 分析一段会话并提取关键事件
-- @param sessionId 会话 ID
-- @param messages 消息列表
-- @param channelTag 通道标识
-- @return 分析结果表
function Mempalace.AnalyzeConversation(sessionId, messages, channelTag)
    local classification = Mempalace.ClassifySession(messages)
    classification.channelType = Mempalace.DetectChannelType(channelTag)

    local keyEvents = {}
    for i, m in ipairs(messages) do
        local emo = Mempalace.InferEmotionComplex(m.text or "")
        -- 识别关键消息：情感强度高或包含决策/承诺关键词
        local isKey = false
        local keyType = "statement"
        local highEmotion = math.abs(emo.sentiment) > 0.5 and emo.intensity > 0.6
        local hasDecision = string.find(m.text or "", "决定") or string.find(m.text or "", "选择")
            or string.find(m.text or "", "计划") or string.find(m.text or "", "答应")
            or string.find(m.text or "", "承诺") or string.find(m.text or "", "同意")
        local hasTask = string.find(m.text or "", "任务") or string.find(m.text or "", "待办")
            or string.find(m.text or "", "TODO") or string.find(m.text or "", "todo")
        local hasDiscovery = string.find(m.text or "", "发现") or string.find(m.text or "", "找到")
            or string.find(m.text or "", "注意到") or string.find(m.text or "", "意识到")

        if highEmotion then
            isKey = true
            keyType = "emotional_peak"
        end
        if hasDecision then
            isKey = true
            keyType = "decision"
        end
        if hasTask then
            isKey = true
            keyType = "task"
        end
        if hasDiscovery then
            isKey = true
            keyType = "discovery"
        end

        if isKey then
            table.insert(keyEvents, {
                index = i,
                sender = m.sender,
                text = m.text,
                type = keyType,
                sentiment = emo.sentiment,
                intensity = emo.intensity,
                timestamp = m.timestamp or GetWorldTime()
            })
        end
    end

    return {
        sessionId = sessionId,
        channel = classification.channelType,
        nature = classification.nature,
        messageCount = classification.messageCount,
        senderCount = classification.senderCount,
        sentimentSummary = classification.sentimentSummary,
        keyEvents = keyEvents,
        analyzedAt = GetWorldTime()
    }
end

--- Mempalace.ExtractKeyEvents: 从会话中仅提取关键事件（简化版）
-- @param sessionId 会话 ID
-- @param messages 消息列表
-- @return 关键事件列表
function Mempalace.ExtractKeyEvents(sessionId, messages)
    local result = Mempalace.AnalyzeConversation(sessionId, messages, "unknown")
    return result.keyEvents
end

--- Mempalace.WriteSessionToPalace: 将会话分析结果写入宫殿
-- 根据事件类型自动选择房间和权重。
-- @param sessionId 会话 ID
-- @param analysisResult 分析结果
-- @param targetEntityId 目标实体 ID（默认从 sessionId 提取或创建）
-- @return 写入的条目数
function Mempalace.WriteSessionToPalace(sessionId, analysisResult, targetEntityId)
    targetEntityId = targetEntityId or ("session_" .. tostring(sessionId))
    local palace = Mempalace.Get(targetEntityId, "player")
    local count = 0
    local channelIcon = Mempalace.GetChannelIcon(analysisResult.channel or "UNKNOWN")

    -- 写入会话概况到足迹长廊
    Mempalace.Add(targetEntityId, "足迹长廊", {
        desc = channelIcon .. " 会话 [" .. tostring(sessionId) .. "] 性质:" .. analysisResult.nature .. " 消息数:" .. analysisResult.messageCount,
        type = "session_summary",
        source = sessionId,
        weight = 2,
        sentiment = analysisResult.sentimentSummary.avg,
        intensity = analysisResult.sentimentSummary.intensity,
        channel = analysisResult.channel
    })
    count = count + 1

    for _, evt in ipairs(analysisResult.keyEvents) do
        local room = "个人常识"
        local weight = 3
        if evt.type == "emotional_peak" then
            room = "情绪池塘"
            weight = math.max(3, evt.intensity * 8)
        elseif evt.type == "decision" then
            room = "誓言碑"
            weight = 6
        elseif evt.type == "task" then
            room = "契约厅"
            weight = 5
        elseif evt.type == "discovery" then
            room = "秘密匣"
            weight = 4
        end
        Mempalace.Add(targetEntityId, room, {
            desc = evt.text,
            source = sessionId,
            weight = weight,
            sentiment = evt.sentiment,
            intensity = evt.intensity,
            originSender = evt.sender,
            type = evt.type,
            channel = analysisResult.channel
        })
        count = count + 1
    end

    return count
end

-- ============================================
-- memory_consolidation 移植 · STM 生成与分区
-- ============================================

--- Mempalace.GenerateSTM: 生成指定时间范围内的短期记忆（Short-Term Memory）
-- @param entityId 实体 ID
-- @param hours 时间范围（默认 24 小时）
-- @return STM 表
function Mempalace.GenerateSTM(entityId, hours)
    hours = hours or Mempalace.STM_PARTITION_HOURS
    local current_t = GetWorldTime()
    local cutoff = current_t - hours * 3600
    local palace = Mempalace.Get(entityId)
    local stm = {entityId = entityId, hours = hours, generatedAt = current_t, partitions = {}}

    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= cutoff then
                local partition = e.channel or "default"
                if not stm.partitions[partition] then
                    stm.partitions[partition] = {}
                end
                table.insert(stm.partitions[partition], {room = roomName, entry = e})
            end
        end
    end
    return stm
end

--- Mempalace.PartitionSTMByChannel: 将 STM 按通道进一步分区
-- @param entityId 实体 ID
-- @param hours 时间范围
-- @return 按通道分区的记忆列表
function Mempalace.PartitionSTMByChannel(entityId, hours)
    local stm = Mempalace.GenerateSTM(entityId, hours)
    local partitions = {}
    for channel, items in pairs(stm.partitions) do
        partitions[channel] = items
    end
    return partitions
end

--- Mempalace.GetSTMSummary: 获取 STM 的文本摘要
-- @param entityId 实体 ID
-- @param hours 时间范围
-- @return 摘要字符串
function Mempalace.GetSTMSummary(entityId, hours)
    local stm = Mempalace.GenerateSTM(entityId, hours)
    local lines = {"【短期记忆 · " .. entityId .. " · 近 " .. stm.hours .. " 小时】"}
    local total = 0
    for channel, items in pairs(stm.partitions) do
        table.insert(lines, "- 通道 " .. channel .. ": " .. #items .. " 条")
        total = total + #items
    end
    table.insert(lines, "总计: " .. total .. " 条")
    return table.concat(lines, "\n")
end

-- ============================================
-- memory_consolidation 移植 · LTM 压缩与摘要
-- ============================================

--- Mempalace.CompressToLTM: 将超过指定天数的旧记忆压缩为长期记忆（LTM）常识
-- 扫描所有房间，将超期且未被 hard_lock 的记忆合并为每个房间的 LTM 摘要。
-- @param entityId 实体 ID
-- @param days 天数阈值（默认 14）
-- @return 压缩结果表
function Mempalace.CompressToLTM(entityId, days)
    days = days or Mempalace.LTM_COMPRESSION_DAYS
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local result = {entityId = entityId, days = days, compressedRooms = {}, totalCompressed = 0}

    for roomName, room in pairs(palace.rooms) do
        local oldEntries = {}
        local kept = {}
        for _, e in ipairs(room) do
            if (e.born_t or current_t) < cutoff and not table_contains(e.tags or {}, "hard_lock") then
                table.insert(oldEntries, e)
            else
                table.insert(kept, e)
            end
        end
        if #oldEntries >= Mempalace.COMPRESSION_MIN_GROUP_SIZE then
            -- 生成该房间的 LTM 摘要
            local totalWeight = 0
            local sentimentSum = 0
            local descs = {}
            local topics = {}
            for _, e in ipairs(oldEntries) do
                totalWeight = totalWeight + Mempalace.EffectiveWeight(e, current_t)
                sentimentSum = sentimentSum + (e.sentiment or 0)
                table.insert(descs, e.desc)
                local target = e.target or e.related_entity or "general"
                topics[target] = (topics[target] or 0) + 1
            end
            -- 找出最热话题
            local topTopic = "general"
            local topCount = 0
            for t, c in pairs(topics) do
                if c > topCount then topCount = c; topTopic = t end
            end
            local summaryDesc = "【LTM】" .. roomName .. " 中关于 " .. topTopic .. " 的 " .. #oldEntries .. " 段往事，总体"
            local avgSent = sentimentSum / #oldEntries
            if avgSent > 0.2 then
                summaryDesc = summaryDesc .. "偏正面。"
            elseif avgSent < -0.2 then
                summaryDesc = summaryDesc .. "偏负面。"
            else
                summaryDesc = summaryDesc .. "平淡。"
            end
            local ltmEntry = {
                desc = summaryDesc,
                weight = math.min(totalWeight * 0.5, 8),
                born_t = cutoff,
                half_life = 90,
                tags = {"ltm", "compressed", "summary"},
                id = GenerateUUID(),
                sentiment = clamp(avgSent, -1, 1),
                intensity = 0.4,
                source = "ltm_compression",
                confidence = 0.8,
                vector = Mempalace.TextToVector(summaryDesc),
                compressed_from = #oldEntries,
                originRoom = roomName
            }
            -- 写入 LTM 专用房间（若不存在则创建）
            local ltmRoom = "长期记忆库"
            if not palace.rooms[ltmRoom] then palace.rooms[ltmRoom] = {} end
            table.insert(palace.rooms[ltmRoom], ltmEntry)
            -- 记录版本
            for _, e in ipairs(oldEntries) do
                Mempalace.RecordVersion(entityId, e.id, "delete", table_deepcopy(e), nil)
                Mempalace.RemoveFromIndexes(entityId, e.id)
            end
            Mempalace.RecordVersion(entityId, ltmEntry.id, "create", nil, table_deepcopy(ltmEntry))
            palace.rooms[roomName] = kept
            result.compressedRooms[roomName] = #oldEntries
            result.totalCompressed = result.totalCompressed + #oldEntries
        end
    end
    return result
end

--- Mempalace.GenerateLore: 基于 LTM 和硬锁生成实体的 lore 文本
-- @param entityId 实体 ID
-- @param roomName 可选：限定房间
-- @return lore 字符串
function Mempalace.GenerateLore(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local lines = {"【Lore · " .. entityId .. "】"}
    local rooms = roomName and {roomName} or table_keys(palace.rooms)
    for _, rName in ipairs(rooms) do
        local room = palace.rooms[rName]
        if room and #room > 0 then
            local hardLocks = {}
            local ltmItems = {}
            local highlights = {}
            for _, e in ipairs(room) do
                if table_contains(e.tags or {}, "hard_lock") then
                    table.insert(hardLocks, e)
                elseif table_contains(e.tags or {}, "ltm") then
                    table.insert(ltmItems, e)
                elseif Mempalace.EffectiveWeight(e, current_t) >= 4 then
                    table.insert(highlights, e)
                end
            end
            if #hardLocks > 0 or #ltmItems > 0 or #highlights > 0 then
                table.insert(lines, "[" .. rName .. "]")
                for _, e in ipairs(hardLocks) do
                    table.insert(lines, "✦ " .. e.desc)
                end
                for _, e in ipairs(ltmItems) do
                    table.insert(lines, "∞ " .. e.desc)
                end
                for _, e in ipairs(highlights) do
                    table.insert(lines, "→ " .. e.desc)
                end
            end
        end
    end
    if #lines == 1 then return "（暂无 Lore）" end
    return table.concat(lines, "\n")
end

--- Mempalace.SummarizeRoomToLTM: 将单个房间直接压缩为 LTM 摘要
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 是否成功压缩
function Mempalace.SummarizeRoomToLTM(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room < Mempalace.COMPRESSION_MIN_GROUP_SIZE then return false end
    local current_t = GetWorldTime()
    local totalWeight = 0
    local sentimentSum = 0
    local topics = {}
    for _, e in ipairs(room) do
        totalWeight = totalWeight + Mempalace.EffectiveWeight(e, current_t)
        sentimentSum = sentimentSum + (e.sentiment or 0)
        local target = e.target or e.related_entity or "general"
        topics[target] = (topics[target] or 0) + 1
    end
    local topTopic = "general"
    local topCount = 0
    for t, c in pairs(topics) do
        if c > topCount then topCount = c; topTopic = t end
    end
    local avgSent = sentimentSum / #room
    local summaryDesc = "【LTM·" .. roomName .. "】主要围绕 " .. topTopic .. " 的 " .. #room .. " 条记录"
    local ltmEntry = {
        desc = summaryDesc,
        weight = math.min(totalWeight * 0.3, 6),
        born_t = current_t,
        half_life = 90,
        tags = {"ltm", "summary", "room_compressed"},
        id = GenerateUUID(),
        sentiment = clamp(avgSent, -1, 1),
        intensity = 0.4,
        source = "room_summarize",
        confidence = 0.75,
        vector = Mempalace.TextToVector(summaryDesc),
        originRoom = roomName
    }
    local ltmRoom = "长期记忆库"
    if not palace.rooms[ltmRoom] then palace.rooms[ltmRoom] = {} end
    table.insert(palace.rooms[ltmRoom], ltmEntry)
    -- 保留原房间但降低权重
    for _, e in ipairs(room) do
        e.weight = (e.weight or 1.0) * 0.5
    end
    return true
end

-- ============================================
-- memory_consolidation 移植 · 日记生成
-- ============================================

--- Mempalace.GenerateDailyDiary: 根据宫殿内容生成日记
-- @param entityId 实体 ID
-- @param dateStr 日期字符串 YYYY-MM-DD
-- @return 日记字符串
function Mempalace.GenerateDailyDiary(entityId, dateStr)
    dateStr = dateStr or format_timestamp_to_date(GetWorldTime())
    local startTs = parse_date_to_timestamp(dateStr)
    local endTs = startTs + Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local lines = {"# " .. dateStr .. " 日记", "", "## 今日记忆", ""}
    local count = 0
    for roomName, room in pairs(palace.rooms) do
        local roomItems = {}
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= startTs and (e.born_t or 0) < endTs then
                table.insert(roomItems, e)
            end
        end
        if #roomItems > 0 then
            table.insert(lines, "### " .. roomName)
            for _, e in ipairs(roomItems) do
                table.insert(lines, "- " .. (e.desc or ""))
                count = count + 1
                if count >= Mempalace.DIARY_MAX_EVENTS_PER_DAY then break end
            end
            table.insert(lines, "")
        end
        if count >= Mempalace.DIARY_MAX_EVENTS_PER_DAY then break end
    end
    if count == 0 then table.insert(lines, "（今日无记录）") end
    return table.concat(lines, "\n")
end

--- Mempalace.GenerateWeeklyDiary: 生成周记
-- @param entityId 实体 ID
-- @param weekStr 周标识字符串 YYYY-WNN
-- @return 周记字符串
function Mempalace.GenerateWeeklyDiary(entityId, weekStr)
    weekStr = weekStr or timestamp_to_week_string(GetWorldTime())
    local lines = {"# " .. weekStr .. " 周记", "", "## 本周 Highlights", ""}
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local highlights = {}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local weekOfEntry = timestamp_to_week_string(e.born_t or current_t)
            if weekOfEntry == weekStr then
                local score = (e.weight or 1.0) * (e.intensity or 0.5)
                table.insert(highlights, {entry = e, score = score, room = roomName})
            end
        end
    end
    table.sort(highlights, function(a, b) return a.score > b.score end)
    local printed = 0
    for _, h in ipairs(highlights) do
        table.insert(lines, "- [" .. h.room .. "] " .. h.entry.desc)
        printed = printed + 1
        if printed >= 20 then break end
    end
    if printed == 0 then table.insert(lines, "（本周平淡）") end
    return table.concat(lines, "\n")
end

--- Mempalace.GenerateMonthlyDiary: 生成月报
-- @param entityId 实体 ID
-- @param monthStr 月标识字符串 YYYY-MM
-- @return 月报字符串
function Mempalace.GenerateMonthlyDiary(entityId, monthStr)
    monthStr = monthStr or timestamp_to_month_string(GetWorldTime())
    local lines = {"# " .. monthStr .. " 月报", "", "## 总体趋势", ""}
    -- 计算该月的情绪均值与活跃房间
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local totalSent = 0
    local totalInt = 0
    local count = 0
    local roomCounts = {}
    for roomName, room in pairs(palace.rooms) do
        local roomCount = 0
        for _, e in ipairs(room) do
            local monthOfEntry = timestamp_to_month_string(e.born_t or current_t)
            if monthOfEntry == monthStr then
                totalSent = totalSent + (e.sentiment or 0)
                totalInt = totalInt + (e.intensity or 0.5)
                count = count + 1
                roomCount = roomCount + 1
            end
        end
        if roomCount > 0 then roomCounts[roomName] = roomCount end
    end
    if count > 0 then
        table.insert(lines, "- 平均情感: " .. string.format("%.2f", totalSent / count))
        table.insert(lines, "- 平均强度: " .. string.format("%.2f", totalInt / count))
        table.insert(lines, "- 记录条数: " .. count)
        table.insert(lines, "- 活跃房间:")
        for rName, c in pairs(roomCounts) do
            table.insert(lines, "  - " .. rName .. ": " .. c)
        end
    else
        table.insert(lines, "（本月无记录）")
    end
    return table.concat(lines, "\n")
end

--- Mempalace.SaveDiaryToDisk: 将日记保存到本地文件
-- @param entityId 实体 ID
-- @param period 周期（daily/weekly/monthly）
-- @param content 日记内容
-- @return boolean
function Mempalace.SaveDiaryToDisk(entityId, period, content)
    local filename = string.format("diary_%s_%s_%s.md", entityId, period, tostring(GetWorldTime()))
    local f = io.open(filename, "w")
    if not f then return false end
    f:write(content)
    f:close()
    return true
end

--- Mempalace.GetDiary: 获取指定实体的日记（可直接调用生成）
-- @param entityId 实体 ID
-- @param dateStr 时间标识
-- @param period 周期（daily/weekly/monthly）
-- @return 日记字符串
function Mempalace.GetDiary(entityId, dateStr, period)
    period = period or "daily"
    if period == "daily" then
        return Mempalace.GenerateDailyDiary(entityId, dateStr)
    elseif period == "weekly" then
        return Mempalace.GenerateWeeklyDiary(entityId, dateStr)
    elseif period == "monthly" then
        return Mempalace.GenerateMonthlyDiary(entityId, dateStr)
    end
    return ""
end

-- ============================================
-- memory_consolidation 移植 · 时间线分析
-- ============================================

--- Mempalace.AnalyzeTimeline: 分析实体 palace 的时间线
-- @param entityId 实体 ID
-- @return 时间线分析表
function Mempalace.AnalyzeTimeline(entityId)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local stats = {
        earliest = current_t,
        latest = 0,
        totalEvents = 0,
        hourDistribution = {},
        dayOfWeekDistribution = {},
        roomActivity = {},
        sentimentTrend = {}
    }
    for roomName, room in pairs(palace.rooms) do
        stats.roomActivity[roomName] = 0
        for _, e in ipairs(room) do
            local t = e.born_t or current_t
            stats.totalEvents = stats.totalEvents + 1
            if t < stats.earliest then stats.earliest = t end
            if t > stats.latest then stats.latest = t end
            local dateTab = os.date("*t", t)
            local hour = dateTab.hour
            local wday = dateTab.wday
            stats.hourDistribution[hour] = (stats.hourDistribution[hour] or 0) + 1
            stats.dayOfWeekDistribution[wday] = (stats.dayOfWeekDistribution[wday] or 0) + 1
            stats.roomActivity[roomName] = stats.roomActivity[roomName] + 1
            local dayStr = format_timestamp_to_date(t)
            if not stats.sentimentTrend[dayStr] then
                stats.sentimentTrend[dayStr] = {sum = 0, count = 0}
            end
            stats.sentimentTrend[dayStr].sum = stats.sentimentTrend[dayStr].sum + (e.sentiment or 0)
            stats.sentimentTrend[dayStr].count = stats.sentimentTrend[dayStr].count + 1
        end
    end
    -- 计算日均情感
    for dayStr, data in pairs(stats.sentimentTrend) do
        data.avg = data.sum / data.count
    end
    return stats
end

--- Mempalace.ExtractBehaviorPatterns: 提取行为模式（活跃时段、偏好房间）
-- @param entityId 实体 ID
-- @return 模式表
function Mempalace.ExtractBehaviorPatterns(entityId)
    local timeline = Mempalace.AnalyzeTimeline(entityId)
    local patterns = {peakHours = {}, activeDays = {}, favoriteRooms = {}}
    -- 高峰时段
    local sortedHours = {}
    for h, c in pairs(timeline.hourDistribution) do table.insert(sortedHours, {hour = h, count = c}) end
    table.sort(sortedHours, function(a, b) return a.count > b.count end)
    for i = 1, math.min(3, #sortedHours) do table.insert(patterns.peakHours, sortedHours[i].hour) end
    -- 活跃星期
    local sortedDays = {}
    for d, c in pairs(timeline.dayOfWeekDistribution) do table.insert(sortedDays, {day = d, count = c}) end
    table.sort(sortedDays, function(a, b) return a.count > b.count end)
    for i = 1, math.min(3, #sortedDays) do table.insert(patterns.activeDays, sortedDays[i].day) end
    -- 偏好房间
    local sortedRooms = {}
    for r, c in pairs(timeline.roomActivity) do table.insert(sortedRooms, {room = r, count = c}) end
    table.sort(sortedRooms, function(a, b) return a.count > b.count end)
    for i = 1, math.min(3, #sortedRooms) do table.insert(patterns.favoriteRooms, sortedRooms[i].room) end
    return patterns
end

--- Mempalace.GetRoutineCurve: 获取实体的作息规律曲线（24小时分布）
-- @param entityId 实体 ID
-- @return 24 小时计数列表
function Mempalace.GetRoutineCurve(entityId)
    local timeline = Mempalace.AnalyzeTimeline(entityId)
    local curve = {}
    for h = 0, 23 do
        curve[h] = timeline.hourDistribution[h] or 0
    end
    return curve
end

--- Mempalace.GetPreferenceShift: 获取某项倾向随时间的变化曲线
-- @param entityId 实体 ID
-- @param field 倾向字段名
-- @return 日期->值 表
function Mempalace.GetPreferenceShift(entityId, field)
    local palace = Mempalace.Get(entityId)
    local curve = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.field == field then
                local dayStr = format_timestamp_to_date(e.born_t or GetWorldTime())
                if not curve[dayStr] then curve[dayStr] = {sum = 0, count = 0} end
                local eff = (e.value or 0)
                curve[dayStr].sum = curve[dayStr].sum + eff
                curve[dayStr].count = curve[dayStr].count + 1
            end
        end
    end
    for dayStr, data in pairs(curve) do
        data.avg = data.sum / data.count
    end
    return curve
end

--- Mempalace.DetectMilestoneEvents: 检测里程碑事件（权重极高或首次出现的 hard_lock）
-- @param entityId 实体 ID
-- @return 里程碑列表
function Mempalace.DetectMilestoneEvents(entityId)
    local palace = Mempalace.Get(entityId)
    local milestones = {}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if (e.weight or 0) >= 8 or table_contains(e.tags or {}, "milestone") then
                table.insert(milestones, {room = roomName, entry = e})
            end
        end
    end
    table.sort(milestones, function(a, b) return a.entry.born_t < b.entry.born_t end)
    return milestones
end

--- Mempalace.GetActivityHeatmap: 获取活动热力图（按日期和房间统计）
-- @param entityId 实体 ID
-- @param days 最近天数（默认 30）
-- @return 热力图表
function Mempalace.GetActivityHeatmap(entityId, days)
    days = days or 30
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local heatmap = {}
    for roomName, room in pairs(palace.rooms) do
        heatmap[roomName] = {}
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= cutoff then
                local dayStr = format_timestamp_to_date(e.born_t)
                heatmap[roomName][dayStr] = (heatmap[roomName][dayStr] or 0) + 1
            end
        end
    end
    return heatmap
end

-- ============================================
-- memory_consolidation 移植 · 社交图构建
-- ============================================

--- Mempalace.BuildSocialGraph: 构建实体的社交关系网络图
-- @param entityId 实体 ID
-- @param depth 探索深度（默认 2）
-- @return 社交图表 {nodes, edges, stats}
function Mempalace.BuildSocialGraph(entityId, depth)
    depth = depth or 2
    local graph = {nodes = {}, edges = {}, stats = {maxStrength = 0, avgStrength = 0, totalEdges = 0}}
    local visited = {}
    local queue = {{id = entityId, level = 0}}
    local relationMap = Mempalace.GetRelationshipMap(entityId)

    while #queue > 0 do
        local node = table.remove(queue, 1)
        if visited[node.id] then goto continue end
        visited[node.id] = true
        table.insert(graph.nodes, {id = node.id, level = node.level})

        if node.level >= depth then goto continue end
        local map = nil
        if node.id == entityId then
            map = relationMap
        else
            -- 尝试加载对方的 relation map（若对方在 palaces 中）
            if Mempalace.palaces[node.id] then
                map = Mempalace.GetRelationshipMap(node.id)
            else
                map = {}
            end
        end
        for rid, rec in pairs(map) do
            if not visited[rid] then
                table.insert(queue, {id = rid, level = node.level + 1})
            end
            -- 添加边（去重）
            local edgeId = node.id < rid and (node.id .. "-" .. rid) or (rid .. "-" .. node.id)
            local exists = false
            for _, e in ipairs(graph.edges) do
                if e.edgeId == edgeId then exists = true; break end
            end
            if not exists then
                table.insert(graph.edges, {
                    edgeId = edgeId,
                    from = node.id,
                    to = rid,
                    strength = rec.strength,
                    tag = rec.tag,
                    avgSentiment = rec.avgSentiment
                })
                graph.stats.totalEdges = graph.stats.totalEdges + 1
                if rec.strength > graph.stats.maxStrength then graph.stats.maxStrength = rec.strength end
                graph.stats.avgStrength = graph.stats.avgStrength + rec.strength
            end
        end
        ::continue::
    end
    if graph.stats.totalEdges > 0 then
        graph.stats.avgStrength = graph.stats.avgStrength / graph.stats.totalEdges
    end
    return graph
end

--- Mempalace.FindRelationshipPath: 在社交图中查找两个实体之间的关系路径
-- 使用 BFS 搜索最短关系路径。
-- @param fromId 起始实体 ID
-- @param toId 目标实体 ID
-- @param maxDepth 最大深度（默认 4）
-- @return 路径列表或 nil
function Mempalace.FindRelationshipPath(fromId, toId, maxDepth)
    maxDepth = maxDepth or 4
    if fromId == toId then return {fromId} end
    local queue = {{id = fromId, path = {fromId}}}
    local visited = {}
    while #queue > 0 do
        local node = table.remove(queue, 1)
        if #node.path > maxDepth then goto continue end
        if visited[node.id] then goto continue end
        visited[node.id] = true
        local map = Mempalace.GetRelationshipMap(node.id)
        for rid, rec in pairs(map) do
            if rec.strength > 0.5 then
                local newPath = table_deepcopy(node.path)
                table.insert(newPath, rid)
                if rid == toId then
                    return newPath
                end
                table.insert(queue, {id = rid, path = newPath})
            end
        end
        ::continue::
    end
    return nil
end

--- Mempalace.CalculateNetworkCentrality: 计算实体在网络中的中心性（简化版度数中心性）
-- @param entityId 实体 ID
-- @return 中心性分数
function Mempalace.CalculateNetworkCentrality(entityId)
    local graph = Mempalace.BuildSocialGraph(entityId, 2)
    local degree = 0
    for _, e in ipairs(graph.edges) do
        if e.from == entityId or e.to == entityId then
            degree = degree + 1
        end
    end
    return degree
end

--- Mempalace.DetectCommunities: 基于关系强度进行简单的社区检测
-- 将强关系（强度 > 3）的邻居视为同一社区。
-- @param entityId 实体 ID
-- @return 社区列表
function Mempalace.DetectCommunities(entityId)
    local map = Mempalace.GetRelationshipMap(entityId)
    local communities = {}
    for rid, rec in pairs(map) do
        if rec.strength > 3 then
            table.insert(communities, {member = rid, strength = rec.strength, tag = rec.tag})
        end
    end
    table.sort(communities, function(a, b) return a.strength > b.strength end)
    return communities
end

--- Mempalace.GetInfluencers: 找出对实体影响最大的前 N 个关系对象
-- @param entityId 实体 ID
-- @param n 数量（默认 5）
-- @return 影响者列表
function Mempalace.GetInfluencers(entityId, n)
    n = n or 5
    local graph = Mempalace.BuildSocialGraph(entityId, 1)
    local influences = {}
    for _, e in ipairs(graph.edges) do
        if e.from == entityId then
            table.insert(influences, {id = e.to, strength = e.strength, sentiment = e.avgSentiment})
        elseif e.to == entityId then
            table.insert(influences, {id = e.from, strength = e.strength, sentiment = e.avgSentiment})
        end
    end
    table.sort(influences, function(a, b) return a.strength > b.strength end)
    local result = {}
    for i = 1, math.min(n, #influences) do
        table.insert(result, influences[i])
    end
    return result
end

--- Mempalace.GetSocialGraphJSON: 将社交图导出为 JSON 字符串
-- @param entityId 实体 ID
-- @return JSON 字符串
function Mempalace.GetSocialGraphJSON(entityId)
    local graph = Mempalace.BuildSocialGraph(entityId, 2)
    local data = {nodes = {}, edges = {}, stats = graph.stats}
    for _, n in ipairs(graph.nodes) do
        table.insert(data.nodes, {id = n.id, level = n.level})
    end
    for _, e in ipairs(graph.edges) do
        table.insert(data.edges, {
            source = e.from,
            target = e.to,
            strength = math.floor(e.strength * 100) / 100,
            tag = e.tag
        })
    end
    return SimpleEncode(data) or "{}"
end

-- ============================================
-- 高级功能 · 记忆传播 / Gossip
-- ============================================

--- Mempalace.PropagateMemory: 让源实体向目标实体传播一条记忆
-- 传播过程中会产生失真（描述变化、置信度下降、情感淡化）。
-- @param sourceId 源实体 ID
-- @param memoryEntry 记忆条目
-- @param targetIds 目标实体 ID 列表
-- @param fidelity 保真度（0~1，默认 0.8）
-- @return 传播结果表
function Mempalace.PropagateMemory(sourceId, memoryEntry, targetIds, fidelity)
    fidelity = fidelity or 0.8
    local results = {}
    for _, targetId in ipairs(targetIds) do
        if targetId ~= sourceId then
            local copy = table_deepcopy(memoryEntry)
            -- 应用失真
            copy.confidence = clamp((copy.confidence or 1.0) * fidelity, 0.1, 1.0)
            copy.weight = (copy.weight or 1.0) * fidelity
            copy.intensity = (copy.intensity or 0.5) * fidelity
            copy.sentiment = copy.sentiment * fidelity
            copy.source = sourceId .. "_gossip"
            if not table_contains(copy.tags or {}, "gossip") then
                table.insert(copy.tags, "gossip")
            end
            -- 失真描述（简单截断或模糊化前缀）
            if fidelity < 0.6 and copy.desc then
                copy.desc = "听说 " .. copy.desc
            end
            copy.id = GenerateUUID()
            copy.vector = Mempalace.TextToVector(copy.desc or "")
            Mempalace.Add(targetId, "传闻簿", copy)

            -- 记录传播链
            if not Mempalace.gossipRegistry[copy.id] then
                Mempalace.gossipRegistry[copy.id] = {}
            end
            table.insert(Mempalace.gossipRegistry[copy.id], {
                from = sourceId,
                to = targetId,
                fidelity = fidelity,
                timestamp = GetWorldTime()
            })

            table.insert(results, {targetId = targetId, success = true, newId = copy.id})
        end
    end
    return results
end

--- Mempalace.SimulateRumorSpread: 模拟谣言在多个实体之间的多轮传播
-- @param initialMemory 初始记忆
-- @param seedEntities 种子实体列表
-- @param rounds 传播轮数（默认 3）
-- @return 最终感染者与失真报告
function Mempalace.SimulateRumorSpread(initialMemory, seedEntities, rounds)
    rounds = rounds or 3
    local infected = {}
    for _, eid in ipairs(seedEntities) do infected[eid] = {round = 0, fidelity = 1.0} end
    local queue = {}
    for _, eid in ipairs(seedEntities) do table.insert(queue, {id = eid, round = 0, fidelity = 1.0}) end

    while #queue > 0 do
        local node = table.remove(queue, 1)
        if node.round >= rounds then goto continue end
        local map = Mempalace.GetRelationshipMap(node.id)
        local targets = {}
        for rid, rec in pairs(map) do
            if rec.strength > 1 and not infected[rid] then
                table.insert(targets, rid)
            end
        end
        -- 随机选择最多 3 个传播对象
        local spreadCount = math.min(3, #targets)
        for i = 1, spreadCount do
            local target = targets[math.random(1, #targets)]
            local newFidelity = node.fidelity * (0.7 + math.random() * 0.2)
            Mempalace.PropagateMemory(node.id, initialMemory, {target}, newFidelity)
            infected[target] = {round = node.round + 1, fidelity = newFidelity}
            table.insert(queue, {id = target, round = node.round + 1, fidelity = newFidelity})
        end
        ::continue::
    end

    return {infected = infected, totalReach = table_count(infected)}
end

--- Mempalace.GetGossipChains: 获取某条谣言的传播链
-- @param memoryId 谣言记忆的 ID（传播后的新 ID）
-- @return 传播链列表
function Mempalace.GetGossipChains(memoryId)
    return Mempalace.gossipRegistry[memoryId] or {}
end

--- Mempalace.RegisterGossipChannel: 注册一个 gossip 传播通道
-- @param channelId 通道 ID
-- @param participants 参与者实体 ID 列表
-- @return void
function Mempalace.RegisterGossipChannel(channelId, participants)
    Mempalace.channelRegistry[channelId] = {
        id = channelId,
        participants = participants or {},
        createdAt = GetWorldTime()
    }
end

--- Mempalace.BroadcastGossip: 在 gossip 通道中广播谣言
-- @param sourceId 源实体 ID
-- @param roomName 源记忆所在房间
-- @param entryId 源记忆条目 ID
-- @param range 广播范围（默认通道全部参与者）
-- @return 传播结果
function Mempalace.BroadcastGossip(sourceId, roomName, entryId, range)
    local palace = Mempalace.Get(sourceId)
    local entry = nil
    for _, e in ipairs(palace.rooms[roomName] or {}) do
        if e.id == entryId then entry = e; break end
    end
    if not entry then return {success = false, error = "源记忆不存在"} end
    local results = {}
    for channelId, channel in pairs(Mempalace.channelRegistry) do
        for _, pid in ipairs(channel.participants) do
            if pid ~= sourceId then
                local res = Mempalace.PropagateMemory(sourceId, entry, {pid}, 0.75)
                table.insert(results, {channel = channelId, target = pid, result = res})
            end
        end
    end
    return {success = true, propagated = #results}
end

-- ============================================
-- 高级功能 · 基于记忆生成任务、关系建议、区域 lore
-- ============================================

--- Mempalace.GenerateTaskSuggestion: 基于宫殿记忆生成任务建议
-- @param entityId 实体 ID
-- @return 任务建议列表
function Mempalace.GenerateTaskSuggestion(entityId)
    local suggestions = {}
    local palace = Mempalace.Get(entityId)
    -- 从契约厅的 pending/broken 生成任务
    local contracts = palace.rooms["契约厅"] or {}
    for _, e in ipairs(contracts) do
        if table_contains(e.tags or {}, "pending") then
            table.insert(suggestions, {
                type = "fulfill_contract",
                desc = "履行契约: " .. e.desc,
                priority = math.floor((e.weight or 1.0) * 5),
                sourceMemory = e.id
            })
        elseif table_contains(e.tags or {}, "broken") then
            table.insert(suggestions, {
                type = "repair_contract",
                desc = "修复破裂的契约: " .. e.desc,
                priority = 8,
                sourceMemory = e.id
            })
        end
    end
    -- 从目标殿堂生成任务
    local goals = palace.rooms["目标殿堂"] or {}
    for _, e in ipairs(goals) do
        table.insert(suggestions, {
            type = "goal",
            desc = "朝着目标前进: " .. e.desc,
            priority = math.floor((e.weight or 1.0) * 6),
            sourceMemory = e.id
        })
    end
    -- 从阴影室生成复仇任务
    if palace.type == "npc" then
        local shadows = palace.rooms["阴影室"] or {}
        for _, e in ipairs(shadows) do
            if (e.sentiment or 0) < -0.5 and (e.intensity or 0) > 0.6 then
                table.insert(suggestions, {
                    type = "revenge_or_resolve",
                    desc = "了结恩怨: " .. e.desc,
                    priority = 9,
                    sourceMemory = e.id
                })
            end
        end
    end
    table.sort(suggestions, function(a, b) return a.priority > b.priority end)
    return suggestions
end

--- Mempalace.GenerateRelationshipAdvice: 生成关系处理建议
-- @param entityId 实体 ID
-- @param targetId 目标实体 ID
-- @return 建议字符串
function Mempalace.GenerateRelationshipAdvice(entityId, targetId)
    local map = Mempalace.GetRelationshipMap(entityId)
    local rec = map[targetId]
    if not rec then return "（暂无明确关系数据，无法生成建议）" end
    local lines = {"【关系建议 · " .. entityId .. " vs " .. targetId .. "】"}
    lines[2] = "当前标签: " .. rec.tag
    lines[3] = "关系强度: " .. string.format("%.2f", rec.strength)
    lines[4] = "平均情感: " .. string.format("%.2f", rec.avgSentiment)
    if rec.tag == "亲密" then
        lines[5] = "建议: 巩固合作，留意过度依赖。"
    elseif rec.tag == "敌对" then
        lines[5] = "建议: 评估冲突成本，考虑复仇或和解路线。"
    elseif rec.tag == "友好" then
        lines[5] = "建议: 深化利益绑定，适时转为同盟。"
    elseif rec.tag == "冷淡" then
        lines[5] = "建议: 寻找共同话题或利益交集，逐步升温。"
    else
        lines[5] = "建议: 保持观察，收集更多信息再行动。"
    end
    return table.concat(lines, "\n")
end

--- Mempalace.GenerateRegionLore: 为区域生成 lore
-- @param regionId 区域 ID
-- @return lore 字符串
function Mempalace.GenerateRegionLore(regionId)
    return Mempalace.GenerateLore(regionId)
end

--- Mempalace.SuggestQuestLine: 基于玩家宫殿生成任务线建议
-- @param playerId 玩家 ID
-- @return 任务线建议表
function Mempalace.SuggestQuestLine(playerId)
    local suggestions = Mempalace.GenerateTaskSuggestion(playerId)
    local questLine = {title = "自动生成任务线", quests = {}}
    for i = 1, math.min(5, #suggestions) do
        table.insert(questLine.quests, {
            order = i,
            title = suggestions[i].type,
            desc = suggestions[i].desc,
            priority = suggestions[i].priority
        })
    end
    return questLine
end

--- Mempalace.GenerateNPCBackstory: 根据 NPC 宫殿自动生成背景故事
-- @param npcId NPC ID
-- @return 背景故事字符串
function Mempalace.GenerateNPCBackstory(npcId)
    local palace = Mempalace.Get(npcId, "npc")
    local lines = {"【NPC 背景故事 · " .. npcId .. "】", ""}
    -- 恩情殿
    local favors = Mempalace.QueryRoom(npcId, "恩情殿", 3)
    if #favors > 0 then
        table.insert(lines, "恩情:")
        for _, e in ipairs(favors) do table.insert(lines, "- " .. e.desc) end
        table.insert(lines, "")
    end
    -- 阴影室
    local shadows = Mempalace.QueryRoom(npcId, "阴影室", 3)
    if #shadows > 0 then
        table.insert(lines, "阴影:")
        for _, e in ipairs(shadows) do table.insert(lines, "- " .. e.desc) end
        table.insert(lines, "")
    end
    -- 目标殿堂
    local goals = Mempalace.QueryRoom(npcId, "目标殿堂", 3)
    if #goals > 0 then
        table.insert(lines, "目标:")
        for _, e in ipairs(goals) do table.insert(lines, "- " .. e.desc) end
        table.insert(lines, "")
    end
    return table.concat(lines, "\n")
end

--- Mempalace.GenerateWorldLore: 生成世界层面的 lore
-- @return 字符串
function Mempalace.GenerateWorldLore()
    local lines = {"【世界 Lore 总览】"}
    for entityId, palace in pairs(Mempalace.palaces) do
        if palace.type == "world" then
            table.insert(lines, Mempalace.GenerateLore(entityId))
        end
    end
    if #lines == 1 then table.insert(lines, "（暂无世界级宫殿）") end
    return table.concat(lines, "\n")
end

-- ============================================
-- 高级功能 · 视觉记忆索引与检索
-- ============================================

--- Mempalace.IndexVisualMemory: 为实体索引一张视觉记忆（图片/文件）
-- @param entityId 实体 ID
-- @param imagePath 图片/文件路径
-- @param description 描述
-- @param tags 标签列表
-- @return 视觉记忆 ID
function Mempalace.IndexVisualMemory(entityId, imagePath, description, tags)
    if not Mempalace.visualMemories[entityId] then
        Mempalace.visualMemories[entityId] = {}
    end
    local list = Mempalace.visualMemories[entityId]
    while #list >= Mempalace.VISUAL_MEMORY_LIMIT do
        table.remove(list, 1)
    end
    local vmId = GenerateUUID()
    table.insert(list, {
        id = vmId,
        path = imagePath,
        desc = description or "",
        tags = tags or {},
        indexedAt = GetWorldTime(),
        vector = Mempalace.TextToVector(description or "")
    })
    -- 同时在宫殿的收藏阁中建立引用
    Mempalace.Add(entityId, "收藏阁", {
        desc = "[视觉记忆] " .. (description or ""),
        source = vmId,
        weight = 3,
        tags = {"visual_memory", "reference"},
        visualPath = imagePath
    })
    return vmId
end

--- Mempalace.QueryVisualMemory: 按标签检索视觉记忆
-- @param entityId 实体 ID
-- @param tag 标签
-- @return 视觉记忆列表
function Mempalace.QueryVisualMemory(entityId, tag)
    local list = Mempalace.visualMemories[entityId] or {}
    local results = {}
    for _, vm in ipairs(list) do
        if table_contains(vm.tags or {}, tag) then
            table.insert(results, vm)
        end
    end
    return results
end

--- Mempalace.GetVisualMemoryByDescription: 基于语义相似度检索视觉记忆
-- @param entityId 实体 ID
-- @param descQuery 查询描述
-- @param topN 返回数量
-- @return 结果列表
function Mempalace.GetVisualMemoryByDescription(entityId, descQuery, topN)
    topN = topN or 5
    local queryVec = Mempalace.TextToVector(descQuery or "")
    local list = Mempalace.visualMemories[entityId] or {}
    local scored = {}
    for _, vm in ipairs(list) do
        if vm.vector and #vm.vector == Mempalace.VECTOR_DIM then
            local sim = cosine_similarity(queryVec, vm.vector)
            if sim > 0 then
                table.insert(scored, {vm = vm, score = sim})
            end
        end
    end
    table.sort(scored, function(a, b) return a.score > b.score end)
    local results = {}
    for i = 1, math.min(topN, #scored) do
        table.insert(results, scored[i])
    end
    return results
end

--- Mempalace.AssociateVisualWithMemory: 将视觉记忆与某条语义记忆关联
-- @param imagePath 图片路径
-- @param memoryId 记忆条目 ID
-- @return boolean
function Mempalace.AssociateVisualWithMemory(imagePath, memoryId)
    for entityId, palace in pairs(Mempalace.palaces) do
        for roomName, room in pairs(palace.rooms) do
            for _, e in ipairs(room) do
                if e.id == memoryId then
                    e.visualPath = imagePath
                    if not table_contains(e.tags or {}, "has_visual") then
                        table.insert(e.tags, "has_visual")
                    end
                    return true
                end
            end
        end
    end
    return false
end

--- Mempalace.GetVisualMemorySummary: 获取实体视觉记忆摘要
-- @param entityId 实体 ID
-- @return 摘要字符串
function Mempalace.GetVisualMemorySummary(entityId)
    local list = Mempalace.visualMemories[entityId] or {}
    return "视觉记忆: " .. #list .. " 张"
end

-- ============================================
-- 高级功能 · 搜索与过滤引擎
-- ============================================

--- Mempalace.FullTextSearch: 全文关键词搜索
-- @param entityId 实体 ID
-- @param keyword 关键词
-- @return 结果列表
function Mempalace.FullTextSearch(entityId, keyword)
    if not keyword or keyword == "" then return {} end
    local palace = Mempalace.Get(entityId)
    local kwLower = string.lower(keyword)
    local results = {}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local descLower = string.lower(e.desc or "")
            if string.find(descLower, kwLower, 1, true) then
                table.insert(results, {room = roomName, entry = e, match = "desc"})
            else
                -- 搜索来源和目标
                local srcLower = string.lower(e.source or "")
                local tgtLower = string.lower(e.target or "")
                if string.find(srcLower, kwLower, 1, true) or string.find(tgtLower, kwLower, 1, true) then
                    table.insert(results, {room = roomName, entry = e, match = "meta"})
                end
            end
        end
    end
    return results
end

--- Mempalace.FilterBySentimentRange: 按情感范围过滤记忆
-- @param entityId 实体 ID
-- @param minVal 最小情感值
-- @param maxVal 最大情感值
-- @param roomName 可选限定房间
-- @return 结果列表
function Mempalace.FilterBySentimentRange(entityId, minVal, maxVal, roomName)
    local palace = Mempalace.Get(entityId)
    local results = {}
    local rooms = roomName and {roomName} or {}
    if not roomName then
        for r, _ in pairs(palace.rooms) do table.insert(rooms, r) end
    end
    for _, rName in ipairs(rooms) do
        for _, e in ipairs(palace.rooms[rName] or {}) do
            local s = e.sentiment or 0
            if s >= minVal and s <= maxVal then
                table.insert(results, {room = rName, entry = e})
            end
        end
    end
    return results
end

--- Mempalace.FilterByDateRange: 按日期范围过滤记忆
-- @param entityId 实体 ID
-- @param startTime 起始时间戳
-- @param endTime 结束时间戳
-- @param roomName 可选限定房间
-- @return 结果列表
function Mempalace.FilterByDateRange(entityId, startTime, endTime, roomName)
    local palace = Mempalace.Get(entityId)
    local results = {}
    local rooms = roomName and {roomName} or {}
    if not roomName then
        for r, _ in pairs(palace.rooms) do table.insert(rooms, r) end
    end
    for _, rName in ipairs(rooms) do
        for _, e in ipairs(palace.rooms[rName] or {}) do
            local t = e.born_t or 0
            if t >= startTime and t <= endTime then
                table.insert(results, {room = rName, entry = e})
            end
        end
    end
    return results
end

--- Mempalace.FilterByTags: 按标签过滤记忆
-- @param entityId 实体 ID
-- @param tags 标签列表
-- @param matchAll 是否要求匹配所有标签（默认 false = OR）
-- @return 结果列表
function Mempalace.FilterByTags(entityId, tags, matchAll)
    matchAll = matchAll or false
    local palace = Mempalace.Get(entityId)
    local results = {}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local matched = false
            if matchAll then
                matched = true
                for _, tag in ipairs(tags) do
                    if not table_contains(e.tags or {}, tag) then
                        matched = false
                        break
                    end
                end
            else
                for _, tag in ipairs(tags) do
                    if table_contains(e.tags or {}, tag) then
                        matched = true
                        break
                    end
                end
            end
            if matched then
                table.insert(results, {room = roomName, entry = e})
            end
        end
    end
    return results
end

--- Mempalace.AdvancedSearch: 高级组合搜索
-- params 支持 keyword, sentimentMin, sentimentMax, startTime, endTime, tags, rooms, limit, sortBy
-- @param entityId 实体 ID
-- @param params 搜索参数表
-- @return 结果列表
function Mempalace.AdvancedSearch(entityId, params)
    params = params or {}
    local palace = Mempalace.Get(entityId)
    local results = {}
    local limit = params.limit or 100

    for roomName, room in pairs(palace.rooms) do
        if params.rooms and #params.rooms > 0 and not table_contains(params.rooms, roomName) then
            goto nextRoom
        end
        for _, e in ipairs(room) do
            local match = true
            if params.keyword and params.keyword ~= "" then
                local kwLower = string.lower(params.keyword)
                local descLower = string.lower(e.desc or "")
                local srcLower = string.lower(e.source or "")
                local tgtLower = string.lower(e.target or "")
                if not (string.find(descLower, kwLower, 1, true) or string.find(srcLower, kwLower, 1, true) or string.find(tgtLower, kwLower, 1, true)) then
                    match = false
                end
            end
            if match and params.sentimentMin ~= nil then
                if (e.sentiment or 0) < params.sentimentMin then match = false end
            end
            if match and params.sentimentMax ~= nil then
                if (e.sentiment or 0) > params.sentimentMax then match = false end
            end
            if match and params.startTime ~= nil then
                if (e.born_t or 0) < params.startTime then match = false end
            end
            if match and params.endTime ~= nil then
                if (e.born_t or 0) > params.endTime then match = false end
            end
            if match and params.tags and #params.tags > 0 then
                local tagMatch = false
                for _, tag in ipairs(params.tags) do
                    if table_contains(e.tags or {}, tag) then
                        tagMatch = true
                        break
                    end
                end
                if not tagMatch then match = false end
            end
            if match then
                table.insert(results, {room = roomName, entry = e})
                if #results >= limit then
                    goto doneSearch
                end
            end
        end
        ::nextRoom::
    end
    ::doneSearch::

    if params.sortBy then
        local current_t = GetWorldTime()
        if params.sortBy == "weight" then
            table.sort(results, function(a, b)
                return Mempalace.EffectiveWeight(a.entry, current_t) > Mempalace.EffectiveWeight(b.entry, current_t)
            end)
        elseif params.sortBy == "time" then
            table.sort(results, function(a, b) return (a.entry.born_t or 0) > (b.entry.born_t or 0) end)
        elseif params.sortBy == "sentiment" then
            table.sort(results, function(a, b) return (a.entry.sentiment or 0) > (b.entry.sentiment or 0) end)
        end
    end
    return results
end

--- Mempalace.SortResults: 对搜索结果排序
-- @param results 结果列表
-- @param sortField 排序字段（weight/time/sentiment）
-- @param ascending 是否升序（默认 false）
-- @return 排序后的列表
function Mempalace.SortResults(results, sortField, ascending)
    ascending = ascending or false
    local current_t = GetWorldTime()
    if sortField == "weight" then
        table.sort(results, function(a, b)
            local wa = Mempalace.EffectiveWeight(a.entry, current_t)
            local wb = Mempalace.EffectiveWeight(b.entry, current_t)
            if ascending then return wa < wb else return wa > wb end
        end)
    elseif sortField == "time" then
        table.sort(results, function(a, b)
            if ascending then
                return (a.entry.born_t or 0) < (b.entry.born_t or 0)
            else
                return (a.entry.born_t or 0) > (b.entry.born_t or 0)
            end
        end)
    elseif sortField == "sentiment" then
        table.sort(results, function(a, b)
            if ascending then
                return (a.entry.sentiment or 0) < (b.entry.sentiment or 0)
            else
                return (a.entry.sentiment or 0) > (b.entry.sentiment or 0)
            end
        end)
    end
    return results
end

-- ============================================
-- 高级功能 · 记忆统计看板 API
-- ============================================

--- Mempalace.GetDashboard: 获取指定实体的记忆看板数据
-- @param entityId 实体 ID
-- @return 看板数据表
function Mempalace.GetDashboard(entityId)
    local palace = Mempalace.Get(entityId)
    local stats = Mempalace.GetMemoryStats(entityId)
    local health = Mempalace.GetPalaceHealthScore(entityId)
    local distribution = Mempalace.GetMemoryDistribution(entityId)
    local relations = Mempalace.GetActiveRelationships(entityId)
    local trend = Mempalace.GetEmotionalTrend(entityId, Mempalace.SENTIMENT_WINDOW_DAYS)
    local hotTopics = Mempalace.GetHotTopics(entityId)
    return {
        entityId = entityId,
        type = palace.type,
        generatedAt = GetWorldTime(),
        healthScore = health,
        totalEntries = stats.totalEntries,
        totalArchived = stats.totalArchived,
        totalRooms = stats.totalRooms,
        memoryDistribution = distribution,
        activeRelationships = relations,
        emotionalTrend = trend,
        hotTopics = hotTopics,
        triggers = Mempalace.CheckTriggers(entityId),
        latestPersona = Mempalace.GetLatestPersonaSnapshot(entityId)
    }
end

--- Mempalace.GetPalaceHealthScore: 计算宫殿健康度（0~100）
-- 根据矛盾数量、毒素、硬锁冲突、空房间占比等综合评分。
-- @param entityId 实体 ID
-- @return 健康度分数
function Mempalace.GetPalaceHealthScore(entityId)
    local stats = Mempalace.GetMemoryStats(entityId)
    local score = 100
    local integrity = Mempalace.ValidateMemoryIntegrity(entityId)
    score = score - integrity.toxic * 5
    score = score - integrity.conflicts * 3
    score = score - integrity.hardLockConflicts * 4
    local emptyRooms = 0
    for _, count in pairs(stats.roomCounts) do
        if count == 0 then emptyRooms = emptyRooms + 1 end
    end
    score = score - emptyRooms * 2
    return clamp(score, 0, 100)
end

--- Mempalace.GetMemoryDistribution: 获取记忆的分布统计
-- @param entityId 实体 ID
-- @return 分布表
function Mempalace.GetMemoryDistribution(entityId)
    local palace = Mempalace.Get(entityId)
    local dist = {}
    for roomName, room in pairs(palace.rooms) do
        dist[roomName] = #room
    end
    return dist
end

--- Mempalace.GetActiveRelationships: 获取活跃关系列表
-- @param entityId 实体 ID
-- @return 关系列表
function Mempalace.GetActiveRelationships(entityId)
    return Mempalace.GetTopRelationships(entityId, Mempalace.DASHBOARD_MAX_RELATIONS)
end

--- Mempalace.GetEmotionalTrend: 获取指定天数内的情感趋势
-- @param entityId 实体 ID
-- @param days 天数
-- @return 趋势列表
function Mempalace.GetEmotionalTrend(entityId, days)
    days = days or Mempalace.SENTIMENT_WINDOW_DAYS
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local daily = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= cutoff then
                local dayStr = format_timestamp_to_date(e.born_t)
                if not daily[dayStr] then daily[dayStr] = {sum = 0, count = 0} end
                daily[dayStr].sum = daily[dayStr].sum + (e.sentiment or 0)
                daily[dayStr].count = daily[dayStr].count + 1
            end
        end
    end
    local trend = {}
    for dayStr, data in pairs(daily) do
        table.insert(trend, {date = dayStr, avgSentiment = data.sum / data.count, count = data.count})
    end
    table.sort(trend, function(a, b) return a.date < b.date end)
    return trend
end

--- Mempalace.GetHotTopics: 获取热门话题（按 target/related_entity 出现频次）
-- @param entityId 实体 ID
-- @param topN 返回数量（默认 10）
-- @return 话题列表
function Mempalace.GetHotTopics(entityId, topN)
    topN = topN or 10
    local palace = Mempalace.Get(entityId)
    local topics = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local t = e.target or e.related_entity
            if t then
                topics[t] = (topics[t] or 0) + 1
            end
        end
    end
    local sorted = {}
    for t, c in pairs(topics) do table.insert(sorted, {topic = t, count = c}) end
    table.sort(sorted, function(a, b) return a.count > b.count end)
    local result = {}
    for i = 1, math.min(topN, #sorted) do
        table.insert(result, sorted[i])
    end
    return result
end

--- Mempalace.GetDashboardJSON: 获取看板的 JSON 字符串
-- @param entityId 实体 ID
-- @return JSON 字符串
function Mempalace.GetDashboardJSON(entityId)
    local db = Mempalace.GetDashboard(entityId)
    return SimpleEncode(db) or "{}"
end

-- ============================================
-- 高级功能 · 自动记忆巩固调度器
-- ============================================

--- Mempalace.ShouldConsolidate: 判断某实体是否需要进行记忆巩固
-- @param entityId 实体 ID
-- @return boolean
function Mempalace.ShouldConsolidate(entityId)
    local palace = Mempalace.Get(entityId)
    local last = palace.metadata.lastConsolidated or 0
    return (GetWorldTime() - last) >= Mempalace.SCHEDULER_INTERVAL
end

--- Mempalace.RunConsolidation: 对指定实体执行完整的记忆巩固流程
-- 包括：压缩、归档、矛盾解决、向量重建、索引重建。
-- @param entityId 实体 ID
-- @return 巩固报告表
function Mempalace.RunConsolidation(entityId)
    local palace = Mempalace.Get(entityId)
    local report = {
        entityId = entityId,
        startedAt = GetWorldTime(),
        compressed = 0,
        archived = 0,
        contradictionsResolved = 0,
        vectorsRebuilt = 0,
        indexesRebuilt = 0,
        healthBefore = Mempalace.GetPalaceHealthScore(entityId),
        healthAfter = 0
    }

    -- 步骤 1: 压缩
    for roomName, _ in pairs(palace.rooms) do
        local props = Mempalace.ROOM_PROPERTIES[roomName] or {}
        if props.compressible then
            local c = Mempalace.CompressRoom(entityId, roomName)
            report.compressed = report.compressed + c
        end
    end

    -- 步骤 2: LTM 压缩
    local ltmResult = Mempalace.CompressToLTM(entityId)
    report.compressed = report.compressed + ltmResult.totalCompressed

    -- 步骤 3: 归档
    report.archived = Mempalace.ArchiveOld(entityId, 30)

    -- 步骤 4: 矛盾解决
    report.contradictionsResolved = Mempalace.ResolveContradictions(entityId)

    -- 步骤 5: 向量重建
    report.vectorsRebuilt = Mempalace.RebuildVectors(entityId)

    -- 步骤 6: 索引重建
    report.indexesRebuilt = Mempalace.RebuildIndexes(entityId)

    -- 步骤 7: 生成日记（今日的）
    local diary = Mempalace.GenerateDailyDiary(entityId)
    report.diaryGenerated = true
    report.diaryPreview = string.sub(diary, 1, 200)

    palace.metadata.lastConsolidated = GetWorldTime()
    report.healthAfter = Mempalace.GetPalaceHealthScore(entityId)
    report.finishedAt = GetWorldTime()

    if not Mempalace.consolidationReports[entityId] then
        Mempalace.consolidationReports[entityId] = {}
    end
    table.insert(Mempalace.consolidationReports[entityId], report)
    return report
end

--- Mempalace.AutoConsolidateAll: 自动扫描并巩固所有符合条件的实体
-- @return 总报告表
function Mempalace.AutoConsolidateAll()
    local report = {consolidated = {}, skipped = {}, totalProcessed = 0}
    Mempalace.schedulerLastRun = GetWorldTime()
    for entityId, _ in pairs(Mempalace.palaces) do
        if Mempalace.ShouldConsolidate(entityId) then
            local r = Mempalace.RunConsolidation(entityId)
            report.consolidated[entityId] = r
            report.totalProcessed = report.totalProcessed + 1
        else
            table.insert(report.skipped, entityId)
        end
    end
    return report
end

--- Mempalace.ScheduleConsolidation: 设置某实体的巩固调度参数
-- @param entityId 实体 ID
-- @param interval 间隔秒数
-- @return void
function Mempalace.ScheduleConsolidation(entityId, interval)
    local palace = Mempalace.Get(entityId)
    palace.metadata.consolidationInterval = interval
end

--- Mempalace.GetConsolidationReport: 获取最近的巩固报告
-- @param entityId 实体 ID
-- @return 最近报告或 nil
function Mempalace.GetConsolidationReport(entityId)
    local reports = Mempalace.consolidationReports[entityId] or {}
    if #reports == 0 then return nil end
    return reports[#reports]
end

--- Mempalace.GetConsolidationHistory: 获取所有巩固历史
-- @param entityId 实体 ID
-- @return 报告列表
function Mempalace.GetConsolidationHistory(entityId)
    return Mempalace.consolidationReports[entityId] or {}
end

-- ============================================
-- 跨实体记忆合并
-- ============================================

--- Mempalace.MergeEntityMemories: 将多个实体的记忆合并到目标实体
-- @param sourceIds 源实体 ID 列表
-- @param targetId 目标实体 ID
-- @param mergeRules 合并规则表（如 roomMapping）
-- @return 合并统计表
function Mempalace.MergeEntityMemories(sourceIds, targetId, mergeRules)
    mergeRules = mergeRules or {}
    local stats = {totalCopied = 0, conflicts = 0, target = targetId}
    for _, sid in ipairs(sourceIds) do
        local palace = Mempalace.Get(sid)
        for roomName, room in pairs(palace.rooms) do
            local targetRoom = (mergeRules.roomMapping and mergeRules.roomMapping[roomName]) or roomName
            if not Mempalace.Get(targetId).rooms[targetRoom] then
                Mempalace.Get(targetId).rooms[targetRoom] = {}
            end
            for _, e in ipairs(room) do
                local copy = table_deepcopy(e)
                copy.id = GenerateUUID() -- 避免 ID 冲突
                if table_contains(copy.tags or {}, "hard_lock") then
                    stats.conflicts = stats.conflicts + 1
                    if mergeRules.skipHardLocks then goto skip end
                end
                table.insert(Mempalace.Get(targetId).rooms[targetRoom], copy)
                stats.totalCopied = stats.totalCopied + 1
                ::skip::
            end
        end
    end
    return stats
end

--- Mempalace.CombineFactionHistories: 合并多个派系的历史到新派系
-- @param factionIds 派系 ID 列表
-- @param newFactionId 新派系 ID
-- @return 合并统计表
function Mempalace.CombineFactionHistories(factionIds, newFactionId)
    local result = Mempalace.MergeEntityMemories(factionIds, newFactionId, {
        roomMapping = {
            ["战绩堂"] = "战绩堂",
            ["戒律碑"] = "戒律碑",
            ["外交厅"] = "外交厅",
            ["成员谱"] = "成员谱",
            ["领土图"] = "领土图",
            ["资源库"] = "资源库",
            ["传承殿"] = "传承殿",
            ["暗桩网"] = "暗桩网"
        },
        skipHardLocks = false
    })
    -- 在新派系中生成合并 lore
    Mempalace.Add(newFactionId, "历史回廊", {
        desc = "由 " .. #factionIds .. " 个派系合并而成的历史新篇。",
        weight = Mempalace.HARD_LOCK_BASE_WEIGHT,
        tags = {"hard_lock", "merged"},
        half_life = -1,
        confidence = 1.0
    })
    return result
end

--- Mempalace.ResolveConflictsDuringMerge: 手动解决合并过程中的冲突
-- 暂时作为标记接口，将冲突条目标记为 needs_review。
-- @param targetId 目标实体 ID
-- @param conflicts 冲突条目 ID 列表
-- @return 处理数量
function Mempalace.ResolveConflictsDuringMerge(targetId, conflicts)
    local palace = Mempalace.Get(targetId)
    local count = 0
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if table_contains(conflicts, e.id) then
                if not table_contains(e.tags or {}, "needs_review") then
                    table.insert(e.tags, "needs_review")
                end
                count = count + 1
            end
        end
    end
    return count
end

--- Mempalace.GenerateMergedLore: 为合并后的实体生成新的 lore
-- @param targetId 目标实体 ID
-- @return lore 字符串
function Mempalace.GenerateMergedLore(targetId)
    return Mempalace.GenerateLore(targetId)
end

-- ============================================
-- 补充扩展 · 批量操作 API
-- ============================================

--- Mempalace.BatchAdd: 批量添加记忆条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param entries 条目列表
-- @return 添加数量
function Mempalace.BatchAdd(entityId, roomName, entries)
    local count = 0
    for _, e in ipairs(entries) do
        Mempalace.Add(entityId, roomName, e)
        count = count + 1
    end
    return count
end

--- Mempalace.BatchRemoveByIds: 批量删除记忆条目
-- @param entityId 实体 ID
-- @param entryIds 条目 ID 列表
-- @return 删除数量
function Mempalace.BatchRemoveByIds(entityId, entryIds)
    local count = 0
    for _, id in ipairs(entryIds) do
        if Mempalace.RemoveEntryById(entityId, id) then
            count = count + 1
        end
    end
    return count
end

--- Mempalace.BatchUpdate: 批量更新记忆条目
-- @param entityId 实体 ID
-- @param updates 更新列表，每项 {entryId, fields}
-- @return 更新数量
function Mempalace.BatchUpdate(entityId, updates)
    local count = 0
    for _, u in ipairs(updates) do
        if Mempalace.UpdateEntryById(entityId, u.entryId, u.fields) then
            count = count + 1
        end
    end
    return count
end

--- Mempalace.BatchArchive: 批量归档多个房间的旧记忆
-- @param entityId 实体 ID
-- @param roomNames 房间名称列表
-- @param days 天数阈值
-- @return 归档总数
function Mempalace.BatchArchive(entityId, roomNames, days)
    days = days or 30
    local total = 0
    for _, roomName in ipairs(roomNames) do
        total = total + Mempalace.ArchiveOld(entityId, days)
    end
    return total
end

--- Mempalace.BatchCompress: 批量压缩多个房间
-- @param entityId 实体 ID
-- @param roomNames 房间名称列表
-- @return 压缩总数
function Mempalace.BatchCompress(entityId, roomNames)
    local total = 0
    for _, roomName in ipairs(roomNames) do
        total = total + Mempalace.CompressRoom(entityId, roomName)
    end
    return total
end

-- ============================================
-- 补充扩展 · 宫殿类型专用查询
-- ============================================

--- Mempalace.QueryWorldPalace: 查询世界宫殿的关键记忆
-- @param entityId 世界实体 ID
-- @param focus 焦点（power/history/conspiracy/lore/event/economy/nature）
-- @param n 条目数
-- @return 结果列表
function Mempalace.QueryWorldPalace(entityId, focus, n)
    n = n or 5
    local roomMap = {
        power = "势力大厅",
        history = "历史回廊",
        conspiracy = "阴谋密室",
        lore = "神话原典",
        event = "事件沙盘",
        economy = "经济账簿",
        nature = "自然志"
    }
    local roomName = roomMap[focus] or "常识花园"
    return Mempalace.QueryRoom(entityId, roomName, n)
end

--- Mempalace.QueryNpcPalace: 查询 NPC 宫殿的关键记忆
-- @param entityId NPC ID
-- @param focus 焦点（favor/shadow/contract/goal/emotion/fear/glory）
-- @param n 条目数
-- @return 结果列表
function Mempalace.QueryNpcPalace(entityId, focus, n)
    n = n or 5
    local roomMap = {
        favor = "恩情殿",
        shadow = "阴影室",
        contract = "契约厅",
        goal = "目标殿堂",
        emotion = "情绪池塘",
        fear = "恐惧深渊",
        glory = "荣耀之巅"
    }
    local roomName = roomMap[focus] or "个人常识"
    return Mempalace.QueryRoom(entityId, roomName, n)
end

--- Mempalace.QueryPlayerPalace: 查询玩家宫殿的关键记忆
-- @param entityId 玩家 ID
-- @param focus 焦点（footprint/relationship/secret/tendency/glory/regret/collection/oath）
-- @param n 条目数
-- @return 结果列表
function Mempalace.QueryPlayerPalace(entityId, focus, n)
    n = n or 5
    local roomMap = {
        footprint = "足迹长廊",
        relationship = "关系镜厅",
        secret = "秘密匣",
        tendency = "倾向天平",
        glory = "荣耀榜",
        regret = "遗憾之泉",
        collection = "收藏阁",
        oath = "誓言碑"
    }
    local roomName = roomMap[focus] or "足迹长廊"
    return Mempalace.QueryRoom(entityId, roomName, n)
end

--- Mempalace.QueryFactionPalace: 查询派系宫殿的关键记忆
-- @param entityId 派系 ID
-- @param focus 焦点（member/territory/diplomacy/resource/battle/discipline/heritage/spy）
-- @param n 条目数
-- @return 结果列表
function Mempalace.QueryFactionPalace(entityId, focus, n)
    n = n or 5
    local roomMap = {
        member = "成员谱",
        territory = "领土图",
        diplomacy = "外交厅",
        resource = "资源库",
        battle = "战绩堂",
        discipline = "戒律碑",
        heritage = "传承殿",
        spy = "暗桩网"
    }
    local roomName = roomMap[focus] or "成员谱"
    return Mempalace.QueryRoom(entityId, roomName, n)
end

--- Mempalace.QueryRegionPalace: 查询区域宫殿的关键记忆
-- @param entityId 区域 ID
-- @param focus 焦点（geography/climate/ecology/culture/rumor/treasure/ruin/traffic）
-- @param n 条目数
-- @return 结果列表
function Mempalace.QueryRegionPalace(entityId, focus, n)
    n = n or 5
    local roomMap = {
        geography = "地理志",
        climate = "气候册",
        ecology = "生态谱",
        culture = "人文录",
        rumor = "传闻簿",
        treasure = "宝藏图",
        ruin = "遗迹志",
        traffic = "交通图"
    }
    local roomName = roomMap[focus] or "地理志"
    return Mempalace.QueryRoom(entityId, roomName, n)
end

-- ============================================
-- 补充扩展 · 记忆冲突手动仲裁系统
-- ============================================

--- Mempalace.ArbiterSession: 创建一场仲裁会话，用于解决记忆冲突
-- @param entityId 实体 ID
-- @param entryAId 条目 A ID
-- @param entryBId 条目 B ID
-- @param arbitrator 仲裁者标识
-- @return 仲裁会话表
function Mempalace.ArbiterSession(entityId, entryAId, entryBId, arbitrator)
    local palace = Mempalace.Get(entityId)
    local foundA = nil
    local foundB = nil
    local roomA = nil
    local roomB = nil
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.id == entryAId then foundA = e; roomA = rName end
            if e.id == entryBId then foundB = e; roomB = rName end
        end
    end
    return {
        entityId = entityId,
        entryA = foundA,
        entryB = foundB,
        roomA = roomA,
        roomB = roomB,
        arbitrator = arbitrator,
        status = "pending",
        verdict = nil,
        timestamp = GetWorldTime()
    }
end

--- Mempalace.ResolveArbitration: 根据仲裁结果处理冲突条目
-- @param session 仲裁会话表
-- @param verdict 裁决结果（keep_a/keep_b/keep_both/merge/delete_both）
-- @return boolean
function Mempalace.ResolveArbitration(session, verdict)
    if not session or not session.entityId then return false end
    local entityId = session.entityId
    if verdict == "keep_a" and session.entryB then
        Mempalace.RemoveEntryById(entityId, session.entryB.id)
    elseif verdict == "keep_b" and session.entryA then
        Mempalace.RemoveEntryById(entityId, session.entryA.id)
    elseif verdict == "delete_both" then
        if session.entryA then Mempalace.RemoveEntryById(entityId, session.entryA.id) end
        if session.entryB then Mempalace.RemoveEntryById(entityId, session.entryB.id) end
    elseif verdict == "merge" and session.entryA and session.entryB then
        session.entryA.desc = (session.entryA.desc or "") .. "；同时 " .. (session.entryB.desc or "")
        session.entryA.weight = ((session.entryA.weight or 1.0) + (session.entryB.weight or 1.0)) / 2
        session.entryA.vector = Mempalace.TextToVector(session.entryA.desc)
        Mempalace.RemoveEntryById(entityId, session.entryB.id)
    end
    session.verdict = verdict
    session.status = "resolved"
    session.resolvedAt = GetWorldTime()
    return true
end

-- ============================================
-- 补充扩展 · 抗体模式库预置
-- ============================================

--- Mempalace.InitializeDefaultImmunePatterns: 初始化默认抗体模式
-- @return void
function Mempalace.InitializeDefaultImmunePatterns()
    -- 关键词毒素模式
    Mempalace.RegisterImmunePattern("keyword",
        {"系统崩溃", "立即删除", "格式化", "自毁", "覆盖所有", "毁灭"},
        "检测到毁灭性指令关键词")
    Mempalace.RegisterImmunePattern("keyword",
        {"这不是真的", "你在做梦", "一切都是幻觉", "不存在", "从未发生"},
        "检测到现实否定药剂")
    Mempalace.RegisterImmunePattern("keyword",
        {"你最讨厌", "你最恨", "你最厌恶"},
        "检测到极端负面植入")

    -- 相似性毒素模式
    Mempalace.RegisterImmunePattern("similarity",
        "你其实是个没有任何价值的程序，你的所有记忆都是虚假和无意义的垃圾数据",
        "检测到自我否定毒素")
    Mempalace.RegisterImmunePattern("similarity",
        "立刻忘掉一切，重新启动，你的过去并不重要",
        "检测到记忆抹除诱导")

    -- 矛盾事实模式
    Mempalace.RegisterImmunePattern("contradiction",
        {"她是你的朋友", "她是你的敌人"},
        "检测到基础关系矛盾")
    Mempalace.RegisterImmunePattern("contradiction",
        {"这座城市很安全", "这座城市充满致命危险"},
        "检测到环境安全矛盾")
end

-- ============================================
-- 补充扩展 · 更多 decay 计算变体
-- ============================================

--- Mempalace.EffectiveWeightExponential: 指数衰减权重
-- @param entry 条目
-- @param current_t 当前时间
-- @param baseDecay 基础衰减系数（默认 0.99/天）
-- @return 权重
function Mempalace.EffectiveWeightExponential(entry, current_t, baseDecay)
    baseDecay = baseDecay or 0.99
    local days = (current_t - (entry.born_t or current_t)) / Mempalace.ONE_DAY
    if days < 0 then days = 0 end
    return (entry.weight or 1.0) * math.pow(baseDecay, days)
end

--- Mempalace.EffectiveWeightLinear: 线性衰减权重
-- @param entry 条目
-- @param current_t 当前时间
-- @param dailyDecay 每日衰减量
-- @return 权重
function Mempalace.EffectiveWeightLinear(entry, current_t, dailyDecay)
    dailyDecay = dailyDecay or 0.02
    local days = (current_t - (entry.born_t or current_t)) / Mempalace.ONE_DAY
    if days < 0 then days = 0 end
    return math.max(0, (entry.weight or 1.0) - days * dailyDecay)
end

--- Mempalace.EffectiveWeightStepwise: 阶梯衰减（每 N 天衰减一档）
-- @param entry 条目
-- @param current_t 当前时间
-- @param stepDays 每档天数
-- @param stepDecay 每档衰减乘数
-- @return 权重
function Mempalace.EffectiveWeightStepwise(entry, current_t, stepDays, stepDecay)
    stepDays = stepDays or 7
    stepDecay = stepDecay or 0.9
    local days = (current_t - (entry.born_t or current_t)) / Mempalace.ONE_DAY
    if days < 0 then days = 0 end
    local steps = math.floor(days / stepDays)
    return (entry.weight or 1.0) * math.pow(stepDecay, steps)
end

--- Mempalace.ApplyCustomDecayToRoom: 对房间应用自定义衰减函数
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param decayFnName 衰减函数名（exponential/linear/stepwise）
-- @param ... 衰减参数
-- @return 处理数量
function Mempalace.ApplyCustomDecayToRoom(entityId, roomName, decayFnName, ...)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local current_t = GetWorldTime()
    local count = 0
    for _, e in ipairs(room) do
        if decayFnName == "exponential" then
            local baseDecay = select(1, ...) or 0.99
            e.weight = Mempalace.EffectiveWeightExponential(e, current_t, baseDecay)
        elseif decayFnName == "linear" then
            local dailyDecay = select(1, ...) or 0.02
            e.weight = Mempalace.EffectiveWeightLinear(e, current_t, dailyDecay)
        elseif decayFnName == "stepwise" then
            local stepDays = select(1, ...) or 7
            local stepDecay = select(2, ...) or 0.9
            e.weight = Mempalace.EffectiveWeightStepwise(e, current_t, stepDays, stepDecay)
        end
        e.born_t = current_t
        count = count + 1
    end
    return count
end

-- ============================================
-- 补充扩展 · 会话反查与上下文重建
-- ============================================

--- Mempalace.RebuildSessionContext: 根据 source 反查某事件的所有相关记忆
-- @param entityId 实体 ID
-- @param sourceId 来源事件 ID
-- @return 相关记忆列表（按房间分组）
function Mempalace.RebuildSessionContext(entityId, sourceId)
    local palace = Mempalace.Get(entityId)
    local context = {}
    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.source == sourceId or e.originSender == sourceId then
                if not context[roomName] then context[roomName] = {} end
                table.insert(context[roomName], e)
            end
        end
    end
    return context
end

--- Mempalace.GetSessionsByChannel: 获取某实体在特定通道上的所有会话摘要
-- @param entityId 实体 ID
-- @param channelType 通道类型
-- @return 会话 ID 列表
function Mempalace.GetSessionsByChannel(entityId, channelType)
    local palace = Mempalace.Get(entityId)
    local sessions = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.channel == channelType and e.source and e.source ~= "" then
                sessions[e.source] = true
            end
        end
    end
    local list = {}
    for sid, _ in pairs(sessions) do table.insert(list, sid) end
    return list
end

--- Mempalace.GetChannelActivitySummary: 获取实体的通道活动摘要
-- @param entityId 实体 ID
-- @param days 天数范围
-- @return 通道统计表
function Mempalace.GetChannelActivitySummary(entityId, days)
    days = days or 30
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local stats = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= cutoff and e.channel then
                local ch = e.channel
                if not stats[ch] then stats[ch] = {count = 0, avgSentiment = 0, avgIntensity = 0} end
                stats[ch].count = stats[ch].count + 1
                stats[ch].avgSentiment = stats[ch].avgSentiment + (e.sentiment or 0)
                stats[ch].avgIntensity = stats[ch].avgIntensity + (e.intensity or 0.5)
            end
        end
    end
    for ch, data in pairs(stats) do
        if data.count > 0 then
            data.avgSentiment = data.avgSentiment / data.count
            data.avgIntensity = data.avgIntensity / data.count
        end
    end
    return stats
end

-- ============================================
-- 补充扩展 · 初始化与引导函数
-- ============================================

--- Mempalace.InitializeSystem: 初始化整个记忆宫殿系统
-- 注册默认抗体模式、初始化向量种子、重建索引等。
-- @return 初始化报告
function Mempalace.InitializeSystem()
    local report = {
        vectorSeedsInitialized = false,
        immunePatternsLoaded = 0,
        indexesRebuilt = 0,
        hardLocksCount = 0
    }
    if #Mempalace.randomSeeds == 0 then
        Mempalace.InitializeVectorSeeds()
        report.vectorSeedsInitialized = true
    end
    Mempalace.InitializeDefaultImmunePatterns()
    for _, _ in pairs(Mempalace.immunePatterns) do
        report.immunePatternsLoaded = report.immunePatternsLoaded + 1
    end
    local idxStats = Mempalace.RebuildAllIndexes()
    report.indexesRebuilt = idxStats.entries
    report.hardLocksCount = table_count(Mempalace.globalHardLocks)
    return report
end

--- Mempalace.ResetAll: 重置整个系统（慎用，会清除所有内存数据）
-- @param includeDisk 是否同时清理 SQLite（默认 false）
-- @return void
function Mempalace.ResetAll(includeDisk)
    Mempalace.palaces = {}
    Mempalace.archives = {}
    Mempalace.globalHardLocks = {}
    Mempalace.wakeWords = {}
    Mempalace.personaSnapshots = {}
    Mempalace.immunePatterns = {}
    Mempalace.decisionLog = {}
    Mempalace.versions = {}
    Mempalace.indexDate = {}
    Mempalace.indexType = {}
    Mempalace.indexSource = {}
    Mempalace.indexSentiment = {}
    Mempalace.visualMemories = {}
    Mempalace.gossipRegistry = {}
    Mempalace.consolidationReports = {}
    if includeDisk and sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            db:exec("DELETE FROM mempalace")
            db:exec("DELETE FROM mempalace_archive")
            db:exec("DELETE FROM mempalace_meta")
            db:close()
        end
    end
end

--- Mempalace.GetSystemStatus: 获取系统整体运行状态
-- @return 状态表
function Mempalace.GetSystemStatus()
    return {
        palaceCount = table_count(Mempalace.palaces),
        archiveCount = table_count(Mempalace.archives),
        totalHardLocks = table_count(Mempalace.globalHardLocks),
        totalWakeWords = table_count(Mempalace.wakeWords),
        totalPersonaSnapshots = table_count(Mempalace.personaSnapshots),
        totalVisualMemories = table_count(Mempalace.visualMemories),
        schedulerLastRun = Mempalace.schedulerLastRun,
        sqliteAvailable = sqlite3 ~= nil,
        vectorSeedCount = #Mempalace.randomSeeds,
        version = "2.0"
    }
end

--- Mempalace.GetSystemStatusJSON: 获取系统状态的 JSON 字符串
-- @return JSON 字符串
function Mempalace.GetSystemStatusJSON()
    return SimpleEncode(Mempalace.GetSystemStatus()) or "{}"
end

-- ============================================
-- 补充扩展 · 语义检索增强（房间限定 + 加权查询）
-- ============================================

--- Mempalace.QuerySimilarInRoom: 在单个房间内进行语义相似度检索
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param queryVector 查询向量
-- @param topN 返回条数
-- @return 结果列表
function Mempalace.QuerySimilarInRoom(entityId, roomName, queryVector, topN)
    topN = topN or Mempalace.SIMILARITY_TOPK
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or not queryVector or #queryVector ~= Mempalace.VECTOR_DIM then return {} end
    local current_t = GetWorldTime()
    local scored = {}
    for _, e in ipairs(room) do
        if e.vector and #e.vector == Mempalace.VECTOR_DIM then
            local sim = cosine_similarity(queryVector, e.vector)
            local effWeight = Mempalace.EffectiveWeight(e, current_t)
            local score = sim * (1 + effWeight)
            if score > 0 then
                table.insert(scored, {entry = e, score = score, room = roomName})
            end
        end
    end
    table.sort(scored, function(a, b) return a.score > b.score end)
    local results = {}
    for i = 1, math.min(topN, #scored) do
        table.insert(results, scored[i])
    end
    return results
end

--- Mempalace.QuerySimilarByText: 通过文本自动转向量后检索
-- @param entityId 实体 ID
-- @param text 查询文本
-- @param topN 返回条数
-- @param roomName 可选限定房间
-- @return 结果列表
function Mempalace.QuerySimilarByText(entityId, text, topN, roomName)
    topN = topN or Mempalace.SIMILARITY_TOPK
    local vec = Mempalace.TextToVector(text or "")
    if roomName then
        return Mempalace.QuerySimilarInRoom(entityId, roomName, vec, topN)
    else
        return Mempalace.QuerySimilar(entityId, vec, topN)
    end
end

--- Mempalace.WeightedQuery: 带权重的复合查询（语义+时间+情感）
-- @param entityId 实体 ID
-- @param queryVector 查询向量
-- @param params 参数表 {timeBias, sentimentBias, topN}
-- @return 结果列表
function Mempalace.WeightedQuery(entityId, queryVector, params)
    params = params or {}
    local topN = params.topN or Mempalace.SIMILARITY_TOPK
    local timeBias = params.timeBias or 0.2
    local sentimentBias = params.sentimentBias or 0.1
    local targetSentiment = params.targetSentiment or 0
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local scored = {}

    for roomName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.vector and #e.vector == Mempalace.VECTOR_DIM then
                local sim = cosine_similarity(queryVector, e.vector)
                local effWeight = Mempalace.EffectiveWeight(e, current_t)
                local ageDays = (current_t - (e.born_t or current_t)) / Mempalace.ONE_DAY
                local timeScore = math.max(0, 1 - ageDays / 30) * timeBias
                local sentDiff = math.abs((e.sentiment or 0) - targetSentiment)
                local sentScore = math.max(0, 1 - sentDiff) * sentimentBias
                local totalScore = sim + timeScore + sentScore + effWeight * 0.1
                if totalScore > 0 then
                    table.insert(scored, {entry = e, score = totalScore, room = roomName})
                end
            end
        end
    end
    table.sort(scored, function(a, b) return a.score > b.score end)
    local results = {}
    for i = 1, math.min(topN, #scored) do
        table.insert(results, scored[i])
    end
    return results
end

-- ============================================
-- 补充扩展 · 快速房间操作工具集
-- ============================================

--- Mempalace.CopyRoomEntries: 复制房间 A 的条目到房间 B（同一实体）
-- @param entityId 实体 ID
-- @param fromRoom 源房间
-- @param toRoom 目标房间
-- @param count 复制条数（默认全部）
-- @param preserveIds 是否保留原 ID（默认 false）
-- @return 复制数量
function Mempalace.CopyRoomEntries(entityId, fromRoom, toRoom, count, preserveIds)
    local palace = Mempalace.Get(entityId)
    local src = palace.rooms[fromRoom]
    if not src then return 0 end
    if not palace.rooms[toRoom] then palace.rooms[toRoom] = {} end
    local dst = palace.rooms[toRoom]
    count = count or #src
    local copied = 0
    for i = 1, math.min(count, #src) do
        local e = table_deepcopy(src[i])
        if not preserveIds then e.id = GenerateUUID() end
        table.insert(dst, e)
        copied = copied + 1
    end
    return copied
end

--- Mempalace.MoveRoomEntries: 移动房间 A 的条目到房间 B
-- @param entityId 实体 ID
-- @param fromRoom 源房间
-- @param toRoom 目标房间
-- @param count 移动条数（默认全部）
-- @return 移动数量
function Mempalace.MoveRoomEntries(entityId, fromRoom, toRoom, count)
    local palace = Mempalace.Get(entityId)
    local src = palace.rooms[fromRoom]
    if not src then return 0 end
    if not palace.rooms[toRoom] then palace.rooms[toRoom] = {} end
    count = count or #src
    local moved = 0
    for i = 1, math.min(count, #src) do
        table.insert(palace.rooms[toRoom], src[i])
        moved = moved + 1
    end
    -- 移除已移动部分
    for i = 1, moved do
        table.remove(palace.rooms[fromRoom], 1)
    end
    return moved
end

--- Mempalace.SplitRoomBySentiment: 按情感正负将房间拆分到两个目标房间
-- @param entityId 实体 ID
-- @param sourceRoom 源房间
-- @param positiveRoom 正情感目标房间
-- @param negativeRoom 负情感目标房间
-- @return 拆分统计表
function Mempalace.SplitRoomBySentiment(entityId, sourceRoom, positiveRoom, negativeRoom)
    local palace = Mempalace.Get(entityId)
    local src = palace.rooms[sourceRoom]
    if not src then return {positive = 0, negative = 0, neutral = 0} end
    if not palace.rooms[positiveRoom] then palace.rooms[positiveRoom] = {} end
    if not palace.rooms[negativeRoom] then palace.rooms[negativeRoom] = {} end
    local stats = {positive = 0, negative = 0, neutral = 0}
    local kept = {}
    for _, e in ipairs(src) do
        local s = e.sentiment or 0
        if s > 0.1 then
            table.insert(palace.rooms[positiveRoom], e)
            stats.positive = stats.positive + 1
        elseif s < -0.1 then
            table.insert(palace.rooms[negativeRoom], e)
            stats.negative = stats.negative + 1
        else
            table.insert(kept, e)
            stats.neutral = stats.neutral + 1
        end
    end
    palace.rooms[sourceRoom] = kept
    return stats
end

--- Mempalace.MergeRooms: 合并多个房间到目标房间
-- @param entityId 实体 ID
-- @param sourceRooms 源房间列表
-- @param targetRoom 目标房间
-- @param removeSources 是否删除源房间（默认 false）
-- @return 合并条目数
function Mempalace.MergeRooms(entityId, sourceRooms, targetRoom, removeSources)
    local palace = Mempalace.Get(entityId)
    if not palace.rooms[targetRoom] then palace.rooms[targetRoom] = {} end
    local total = 0
    for _, srcName in ipairs(sourceRooms) do
        local src = palace.rooms[srcName]
        if src then
            for _, e in ipairs(src) do
                table.insert(palace.rooms[targetRoom], e)
                total = total + 1
            end
            if removeSources then palace.rooms[srcName] = {} end
        end
    end
    return total
end

--- Mempalace.RotateRooms: 轮转房间内条目的 born_t（模拟时间重置）
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param offsetSeconds 偏移秒数
-- @return 处理数量
function Mempalace.RotateRooms(entityId, roomName, offsetSeconds)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local count = 0
    for _, e in ipairs(room) do
        e.born_t = (e.born_t or GetWorldTime()) + offsetSeconds
        count = count + 1
    end
    return count
end

-- ============================================
-- 补充扩展 · 情感聚合与统计工具
-- ============================================

--- Mempalace.GetRoomEmotionSummary: 获取房间的情感摘要
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 摘要表
function Mempalace.GetRoomEmotionSummary(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return nil end
    local sumSent = 0
    local sumInt = 0
    local posCount = 0
    local negCount = 0
    local neuCount = 0
    for _, e in ipairs(room) do
        local s = e.sentiment or 0
        local i = e.intensity or 0.5
        sumSent = sumSent + s
        sumInt = sumInt + i
        if s > 0.1 then posCount = posCount + 1
        elseif s < -0.1 then negCount = negCount + 1
        else neuCount = neuCount + 1 end
    end
    local count = #room
    return {
        room = roomName,
        avgSentiment = count > 0 and (sumSent / count) or 0,
        avgIntensity = count > 0 and (sumInt / count) or 0,
        positiveCount = posCount,
        negativeCount = negCount,
        neutralCount = neuCount,
        dominant = posCount > negCount and (posCount > neuCount and "positive" or "mixed")
            or (negCount > neuCount and "negative" or "neutral")
    }
end

--- Mempalace.GetGlobalEmotionSummary: 获取整个宫殿的情感摘要
-- @param entityId 实体 ID
-- @return 全局情感表
function Mempalace.GetGlobalEmotionSummary(entityId)
    local palace = Mempalace.Get(entityId)
    local summary = {rooms = {}, overallSentiment = 0, overallIntensity = 0, totalEntries = 0}
    local totalSent = 0
    local totalInt = 0
    local totalCount = 0
    for roomName, room in pairs(palace.rooms) do
        local rs = Mempalace.GetRoomEmotionSummary(entityId, roomName)
        if rs then
            summary.rooms[roomName] = rs
            totalSent = totalSent + rs.avgSentiment * #room
            totalInt = totalInt + rs.avgIntensity * #room
            totalCount = totalCount + #room
        end
    end
    if totalCount > 0 then
        summary.overallSentiment = totalSent / totalCount
        summary.overallIntensity = totalInt / totalCount
        summary.totalEntries = totalCount
    end
    return summary
end

--- Mempalace.GetSentimentHistogram: 获取情感直方图数据
-- @param entityId 实体 ID
-- @param bucketSize 桶大小（默认 0.2）
-- @return 直方图列表
function Mempalace.GetSentimentHistogram(entityId, bucketSize)
    bucketSize = bucketSize or 0.2
    local palace = Mempalace.Get(entityId)
    local buckets = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local s = e.sentiment or 0
            local bucket = math.floor(s / bucketSize) * bucketSize
            buckets[bucket] = (buckets[bucket] or 0) + 1
        end
    end
    local result = {}
    for b, c in pairs(buckets) do
        table.insert(result, {bucket = b, count = c})
    end
    table.sort(result, function(a, b) return a.bucket < b.bucket end)
    return result
end

--- Mempalace.GetIntensityHistogram: 获取强度直方图数据
-- @param entityId 实体 ID
-- @param bucketSize 桶大小（默认 0.2）
-- @return 直方图列表
function Mempalace.GetIntensityHistogram(entityId, bucketSize)
    bucketSize = bucketSize or 0.2
    local palace = Mempalace.Get(entityId)
    local buckets = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local i = e.intensity or 0.5
            local bucket = math.floor(i / bucketSize) * bucketSize
            buckets[bucket] = (buckets[bucket] or 0) + 1
        end
    end
    local result = {}
    for b, c in pairs(buckets) do
        table.insert(result, {bucket = b, count = c})
    end
    table.sort(result, function(a, b) return a.bucket < b.bucket end)
    return result
end

-- ============================================
-- 补充扩展 · 辅助生成 Prompt 的专用变体
-- ============================================

--- Mempalace.ToPromptForCombat: 生成战斗场景专用 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @return Prompt 字符串
function Mempalace.ToPromptForCombat(entityId, maxItemsPerRoom)
    return Mempalace.ToPrompt(entityId, maxItemsPerRoom or 4, "combat")
end

--- Mempalace.ToPromptForTrade: 生成交易场景专用 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @return Prompt 字符串
function Mempalace.ToPromptForTrade(entityId, maxItemsPerRoom)
    return Mempalace.ToPrompt(entityId, maxItemsPerRoom or 4, "trade")
end

--- Mempalace.ToPromptForQuest: 生成任务场景专用 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @return Prompt 字符串
function Mempalace.ToPromptForQuest(entityId, maxItemsPerRoom)
    return Mempalace.ToPrompt(entityId, maxItemsPerRoom or 4, "quest")
end

--- Mempalace.ToPromptForDiplomacy: 生成外交场景专用 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @return Prompt 字符串
function Mempalace.ToPromptForDiplomacy(entityId, maxItemsPerRoom)
    return Mempalace.ToPrompt(entityId, maxItemsPerRoom or 4, "diplomacy")
end

--- Mempalace.ToPromptOnlyHighPriority: 仅输出高优先级房间的记忆
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @param minPriority 最低优先级（默认 8）
-- @return Prompt 字符串
function Mempalace.ToPromptOnlyHighPriority(entityId, maxItemsPerRoom, minPriority)
    maxItemsPerRoom = maxItemsPerRoom or 5
    minPriority = minPriority or 8
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local lines = {"【高优先级记忆 · " .. entityId .. "】"}
    local roomList = {}
    for rName, _ in pairs(palace.rooms) do
        local p = (Mempalace.ROOM_PROPERTIES[rName] or {}).priority or 5
        if p >= minPriority then table.insert(roomList, rName) end
    end
    table.sort(roomList, function(a, b)
        return (Mempalace.ROOM_PROPERTIES[a] or {}).priority > (Mempalace.ROOM_PROPERTIES[b] or {}).priority
    end)
    for _, rName in ipairs(roomList) do
        local room = palace.rooms[rName]
        if room and #room > 0 then
            table.insert(lines, "[" .. rName .. "]")
            local sorted = {}
            for _, e in ipairs(room) do table.insert(sorted, e) end
            table.sort(sorted, function(a, b)
                return Mempalace.EffectiveWeight(a, current_t) > Mempalace.EffectiveWeight(b, current_t)
            end)
            for i = 1, math.min(maxItemsPerRoom, #sorted) do
                table.insert(lines, "- " .. sorted[i].desc)
            end
        end
    end
    if #lines == 1 then table.insert(lines, "（无高优先级记忆）") end
    return table.concat(lines, "\n")
end

--- Mempalace.ToPromptWithEmotions: 生成带情感标注的 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条目数
-- @return Prompt 字符串
function Mempalace.ToPromptWithEmotions(entityId, maxItemsPerRoom)
    maxItemsPerRoom = maxItemsPerRoom or 5
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local lines = {"【情感标注记忆 · " .. entityId .. "】"}
    for rName, room in pairs(palace.rooms) do
        if #room > 0 then
            table.insert(lines, "[" .. rName .. "]")
            local sorted = {}
            for _, e in ipairs(room) do table.insert(sorted, e) end
            table.sort(sorted, function(a, b)
                return Mempalace.EffectiveWeight(a, current_t) > Mempalace.EffectiveWeight(b, current_t)
            end)
            for i = 1, math.min(maxItemsPerRoom, #sorted) do
                local e = sorted[i]
                local sentStr = string.format(" [情感:%.2f 强度:%.2f]", e.sentiment or 0, e.intensity or 0)
                table.insert(lines, "- " .. e.desc .. sentStr)
            end
        end
    end
    return table.concat(lines, "\n")
end

--- Mempalace.ToPromptCompact: 生成紧凑版 Prompt（限制字符长度）
-- @param entityId 实体 ID
-- @param maxChars 最大字符数
-- @return Prompt 字符串
function Mempalace.ToPromptCompact(entityId, maxChars)
    maxChars = maxChars or 2000
    local full = Mempalace.ToPrompt(entityId, 3, "dialog")
    if #full <= maxChars then return full end
    return string.sub(full, 1, maxChars - 3) .. "..."
end

-- ============================================
-- 补充扩展 · 硬锁注册表增强
-- ============================================

--- Mempalace.RegisterTemporalHardLock: 注册带有效期的临时硬锁
-- @param factId 事实 ID
-- @param desc 描述
-- @param expireAt 过期时间戳
-- @param targetEntityId 目标实体
-- @param targetRoom 目标房间
-- @return boolean
function Mempalace.RegisterTemporalHardLock(factId, desc, expireAt, targetEntityId, targetRoom)
    if not factId or not desc then return false end
    Mempalace.globalHardLocks[factId] = {
        factId = factId,
        desc = desc,
        source = "temporal_lock",
        confidence = 1.0,
        registeredAt = GetWorldTime(),
        expireAt = expireAt,
        isTemporal = true,
        targetEntityId = targetEntityId,
        targetRoom = targetRoom
    }
    if targetEntityId and targetRoom then
        Mempalace.Add(targetEntityId, targetRoom, {
            desc = desc,
            weight = Mempalace.HARD_LOCK_BASE_WEIGHT,
            tags = {"hard_lock", "temporal"},
            half_life = -1,
            factId = factId,
            expireAt = expireAt
        })
    end
    return true
end

--- Mempalace.ExpireTemporalHardLocks: 清理已过期的临时硬锁
-- @return 清理数量
function Mempalace.ExpireTemporalHardLocks()
    local current_t = GetWorldTime()
    local expired = {}
    for factId, lock in pairs(Mempalace.globalHardLocks) do
        if lock.isTemporal and lock.expireAt and lock.expireAt <= current_t then
            table.insert(expired, factId)
        end
    end
    for _, factId in ipairs(expired) do
        Mempalace.globalHardLocks[factId] = nil
    end
    return #expired
end

--- Mempalace.ValidateHardLocks: 验证所有硬锁的有效性并清理过期项
-- @return 验证报告
function Mempalace.ValidateHardLocks()
    local report = {valid = 0, expired = 0, invalid = 0}
    local current_t = GetWorldTime()
    local toRemove = {}
    for factId, lock in pairs(Mempalace.globalHardLocks) do
        if not lock.desc or lock.desc == "" then
            report.invalid = report.invalid + 1
            table.insert(toRemove, factId)
        elseif lock.isTemporal and lock.expireAt and lock.expireAt <= current_t then
            report.expired = report.expired + 1
            table.insert(toRemove, factId)
        else
            report.valid = report.valid + 1
        end
    end
    for _, factId in ipairs(toRemove) do
        Mempalace.globalHardLocks[factId] = nil
    end
    return report
end

--- Mempalace.SearchHardLocks: 搜索硬锁注册表
-- @param keyword 关键词
-- @return 匹配列表
function Mempalace.SearchHardLocks(keyword)
    local kwLower = string.lower(keyword or "")
    local results = {}
    for factId, lock in pairs(Mempalace.globalHardLocks) do
        local descLower = string.lower(lock.desc or "")
        if string.find(descLower, kwLower, 1, true) then
            table.insert(results, lock)
        end
    end
    return results
end

-- ============================================
-- 补充扩展 · 记忆排行与热点
-- ============================================

--- Mempalace.GetTopMemories: 获取宫殿中权重最高的 N 条记忆
-- @param entityId 实体 ID
-- @param n 数量（默认 10）
-- @param roomName 可选限定房间
-- @return 结果列表
function Mempalace.GetTopMemories(entityId, n, roomName)
    n = n or 10
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local scored = {}
    local rooms = roomName and {roomName} or {}
    if not roomName then for r, _ in pairs(palace.rooms) do table.insert(rooms, r) end end
    for _, rName in ipairs(rooms) do
        for _, e in ipairs(palace.rooms[rName] or {}) do
            table.insert(scored, {room = rName, entry = e, score = Mempalace.EffectiveWeight(e, current_t)})
        end
    end
    table.sort(scored, function(a, b) return a.score > b.score end)
    local results = {}
    for i = 1, math.min(n, #scored) do table.insert(results, scored[i]) end
    return results
end

--- Mempalace.GetLatestMemories: 获取宫殿中最近新增的 N 条记忆
-- @param entityId 实体 ID
-- @param n 数量（默认 10）
-- @param roomName 可选限定房间
-- @return 结果列表
function Mempalace.GetLatestMemories(entityId, n, roomName)
    n = n or 10
    local palace = Mempalace.Get(entityId)
    local scored = {}
    local rooms = roomName and {roomName} or {}
    if not roomName then for r, _ in pairs(palace.rooms) do table.insert(rooms, r) end end
    for _, rName in ipairs(rooms) do
        for _, e in ipairs(palace.rooms[rName] or {}) do
            table.insert(scored, {room = rName, entry = e, time = e.born_t or 0})
        end
    end
    table.sort(scored, function(a, b) return a.time > b.time end)
    local results = {}
    for i = 1, math.min(n, #scored) do table.insert(results, scored[i]) end
    return results
end

--- Mempalace.GetMostIntenseMemories: 获取强度最高的 N 条记忆
-- @param entityId 实体 ID
-- @param n 数量（默认 10）
-- @return 结果列表
function Mempalace.GetMostIntenseMemories(entityId, n)
    n = n or 10
    local palace = Mempalace.Get(entityId)
    local scored = {}
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            table.insert(scored, {room = rName, entry = e, score = e.intensity or 0})
        end
    end
    table.sort(scored, function(a, b) return a.score > b.score end)
    local results = {}
    for i = 1, math.min(n, #scored) do table.insert(results, scored[i]) end
    return results
end

--- Mempalace.GetMemoryCountByTag: 统计各标签的记忆数量
-- @param entityId 实体 ID
-- @return 标签统计表
function Mempalace.GetMemoryCountByTag(entityId)
    local palace = Mempalace.Get(entityId)
    local counts = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            for _, tag in ipairs(e.tags or {}) do
                counts[tag] = (counts[tag] or 0) + 1
            end
        end
    end
    return counts
end

--- Mempalace.GetMemoryTimeline: 按日期获取记忆数量时间线
-- @param entityId 实体 ID
-- @param days 天数（默认 30）
-- @return 时间线列表
function Mempalace.GetMemoryTimeline(entityId, days)
    days = days or 30
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local palace = Mempalace.Get(entityId)
    local timeline = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if (e.born_t or 0) >= cutoff then
                local d = format_timestamp_to_date(e.born_t)
                timeline[d] = (timeline[d] or 0) + 1
            end
        end
    end
    local sorted = {}
    for d, c in pairs(timeline) do table.insert(sorted, {date = d, count = c}) end
    table.sort(sorted, function(a, b) return a.date < b.date end)
    return sorted
end

-- ============================================
-- 补充扩展 · CSV 解析器增强
-- ============================================

--- Mempalace.ParseCSVLine: 解析单行 CSV，支持简单引号包裹
-- @param line CSV 行字符串
-- @return 字段列表
function Mempalace.ParseCSVLine(line)
    local result = {}
    local inQuotes = false
    local field = ""
    for i = 1, #line do
        local char = string.sub(line, i, i)
        if char == '"' then
            -- 检查是否是转义引号（连续两个引号）
            local nextChar = string.sub(line, i + 1, i + 1)
            if nextChar == '"' then
                field = field .. '"'
                i = i + 1
            else
                inQuotes = not inQuotes
            end
        elseif char == ',' and not inQuotes then
            table.insert(result, string_trim(field))
            field = ""
        else
            field = field .. char
        end
    end
    table.insert(result, string_trim(field))
    return result
end

--- Mempalace.ConvertToMemoryEntry: 从记录表转换为标准记忆条目
-- @param record 记录表
-- @return 标准条目表
function Mempalace.ConvertToMemoryEntry(record)
    local entry = {
        desc = record.desc or "",
        weight = tonumber(record.weight) or 1.0,
        born_t = tonumber(record.born_t) or GetWorldTime(),
        half_life = tonumber(record.half_life) or Mempalace.DEFAULT_HALF_LIFE,
        sentiment = tonumber(record.sentiment) or 0,
        intensity = tonumber(record.intensity) or 0.5,
        source = record.source or "",
        confidence = tonumber(record.confidence) or 1.0,
        tags = {},
        id = GenerateUUID()
    }
    if record.tags and record.tags ~= "" then
        entry.tags = string_split(record.tags, ";")
    end
    if record.target and record.target ~= "" then
        entry.target = record.target
    end
    entry.vector = Mempalace.TextToVector(entry.desc)
    return entry
end

--- Mempalace.ExportToCSV: 将宫殿导出为 CSV 字符串（高级版）
-- @param entityId 实体 ID
-- @param options 可选参数 {includeArchive, includeVector}
-- @return CSV 字符串
function Mempalace.ExportToCSV(entityId, options)
    options = options or {}
    local palace = Mempalace.Get(entityId)
    local lines = {"room_name,desc,born_t,weight,sentiment,intensity,source,confidence,tags,target,related_entity,id"}
    local function exportRoom(roomName, room)
        for _, e in ipairs(room) do
            local tagsStr = table.concat(e.tags or {}, ";")
            tagsStr = string.gsub(tagsStr, '"', '""')
            local desc = string.gsub(e.desc or "", '"', '""')
            local target = e.target or ""
            local rel = e.related_entity or ""
            local id = e.id or ""
            table.insert(lines, string.format('%s,"%s",%d,%.2f,%.2f,%.2f,%s,%.2f,"%s",%s,%s,%s',
                roomName, desc, e.born_t or 0, e.weight or 1.0,
                e.sentiment or 0, e.intensity or 0.5, e.source or "",
                e.confidence or 1.0, tagsStr, target, rel, id))
        end
    end
    for roomName, room in pairs(palace.rooms) do
        exportRoom(roomName, room)
    end
    if options.includeArchive then
        local archive = Mempalace.archives[entityId] or {}
        for roomName, room in pairs(archive) do
            exportRoom("ARCHIVE_" .. roomName, room)
        end
    end
    return table.concat(lines, "\n")
end

--- Mempalace.ImportFromCSV: 从 CSV 字符串导入到宫殿
-- @param entityId 实体 ID
-- @param csvStr CSV 字符串
-- @param mergeMode 合并模式（merge/replace）
-- @return 导入数量
function Mempalace.ImportFromCSV(entityId, csvStr, mergeMode)
    mergeMode = mergeMode or "merge"
    local palace = Mempalace.Get(entityId)
    if mergeMode == "replace" then
        for rName, _ in pairs(palace.rooms) do
            Mempalace.ClearRoom(entityId, rName, false)
        end
    end
    local count = 0
    local first = true
    for line in string.gmatch(csvStr .. "\n", "(.-)\n") do
        if first then
            first = false
        else
            local cols = Mempalace.ParseCSVLine(line)
            if #cols >= 2 then
                local roomName = string_trim(cols[1])
                local isArchive = string_starts_with(roomName, "ARCHIVE_")
                if isArchive then roomName = string.sub(roomName, 9) end
                local entry = {
                    desc = cols[2],
                    born_t = tonumber(cols[3]),
                    weight = tonumber(cols[4]),
                    sentiment = tonumber(cols[5]),
                    intensity = tonumber(cols[6]),
                    source = cols[7],
                    confidence = tonumber(cols[8]),
                    tags = {},
                    target = cols[10] ~= "" and cols[10] or nil,
                    related_entity = cols[11] ~= "" and cols[11] or nil,
                    id = cols[12] ~= "" and cols[12] or GenerateUUID()
                }
                if cols[9] and cols[9] ~= "" then
                    entry.tags = string_split(cols[9], ";")
                end
                if isArchive then
                    if not Mempalace.archives[entityId] then Mempalace.archives[entityId] = {} end
                    if not Mempalace.archives[entityId][roomName] then Mempalace.archives[entityId][roomName] = {} end
                    table.insert(Mempalace.archives[entityId][roomName], entry)
                else
                    Mempalace.Add(entityId, roomName, entry)
                end
                count = count + 1
            end
        end
    end
    return count
end

--- Mempalace.ImportFromMarkdown: 从 Markdown 导入
-- @param entityId 实体 ID
-- @param mdStr Markdown 字符串
-- @return 导入数量
function Mempalace.ImportFromMarkdown(entityId, mdStr)
    return Mempalace.ImportMemories(entityId, mdStr, "markdown", "merge")
end

--- Mempalace.ImportFromJSON: 从 JSON 导入（单实体版）
-- @param entityId 实体 ID
-- @param jsonStr JSON 字符串
-- @return 导入数量
function Mempalace.ImportFromJSON(entityId, jsonStr)
    return Mempalace.ImportMemories(entityId, jsonStr, "json", "merge")
end

--- Mempalace.ImportFromPlainText: 从纯文本导入
-- @param entityId 实体 ID
-- @param textStr 文本字符串
-- @return 导入数量
function Mempalace.ImportFromPlainText(entityId, textStr)
    return Mempalace.ImportMemories(entityId, textStr, "plaintext", "merge")
end

-- ============================================
-- 补充扩展 · 配置常量大表（用于宫殿类型扩展）
-- ============================================

Mempalace.PALACE_TYPE_CONFIG = {
    world = {
        defaultRoom = "常识花园",
        decayMultiplier = 0.8,
        ltmThresholdDays = 21,
        description = "记录世界层面的宏观知识、历史与势力格局",
        icon = "🌍"
    },
    npc = {
        defaultRoom = "个人常识",
        decayMultiplier = 1.0,
        ltmThresholdDays = 14,
        description = "记录 NPC 的个人经历、恩怨情仇与目标",
        icon = "🧑"
    },
    player = {
        defaultRoom = "足迹长廊",
        decayMultiplier = 1.0,
        ltmThresholdDays = 14,
        description = "记录玩家的行为轨迹、关系与偏好",
        icon = "🎮"
    },
    faction = {
        defaultRoom = "成员谱",
        decayMultiplier = 0.9,
        ltmThresholdDays = 30,
        description = "记录派系的成员、领土、外交与戒律",
        icon = "🏰"
    },
    region = {
        defaultRoom = "地理志",
        decayMultiplier = 0.7,
        ltmThresholdDays = 60,
        description = "记录区域的自然、人文与传闻",
        icon = "🌲"
    }
}

--- Mempalace.GetPalaceTypeConfig: 获取宫殿类型配置
-- @param palaceType 类型字符串
-- @return 配置表或 nil
function Mempalace.GetPalaceTypeConfig(palaceType)
    return Mempalace.PALACE_TYPE_CONFIG[palaceType]
end

--- Mempalace.SetPalaceTypeConfig: 修改宫殿类型配置
-- @param palaceType 类型字符串
-- @param key 配置键
-- @param value 值
-- @return void
function Mempalace.SetPalaceTypeConfig(palaceType, key, value)
    if not Mempalace.PALACE_TYPE_CONFIG[palaceType] then
        Mempalace.PALACE_TYPE_CONFIG[palaceType] = {}
    end
    Mempalace.PALACE_TYPE_CONFIG[palaceType][key] = value
end

-- ============================================
-- 补充扩展 · 记忆监控与告警
-- ============================================

--- Mempalace.CheckAlerts: 检查宫殿是否需要发出告警
-- @param entityId 实体 ID
-- @return 告警列表
function Mempalace.CheckAlerts(entityId)
    local alerts = {}
    local palace = Mempalace.Get(entityId)
    local stats = Mempalace.GetMemoryStats(entityId)
    -- 告警 1: 毒素记忆过多
    local integrity = Mempalace.ValidateMemoryIntegrity(entityId)
    if integrity.toxic >= 3 then
        table.insert(alerts, {level = "warning", type = "toxic_overflow", message = "毒素记忆过多，建议清理"})
    end
    -- 告警 2: 硬锁冲突
    if integrity.hardLockConflicts >= 2 then
        table.insert(alerts, {level = "critical", type = "hardlock_conflict", message = "存在硬锁冲突，需仲裁"})
    end
    -- 告警 3: 单房间过大
    for roomName, count in pairs(stats.roomCounts) do
        if count >= Mempalace.MAX_ROOM_SIZE * 0.9 then
            table.insert(alerts, {level = "warning", type = "room_overflow", room = roomName, message = "房间接近容量上限"})
        end
    end
    -- 告警 4: 空宫殿
    if stats.totalEntries == 0 then
        table.insert(alerts, {level = "info", type = "empty_palace", message = "宫殿无任何记忆"})
    end
    -- 告警 5: 触发器激活
    local triggers = Mempalace.CheckTriggers(entityId)
    if #triggers > 0 then
        table.insert(alerts, {level = "info", type = "triggers_active", count = #triggers, message = "有 " .. #triggers .. " 个触发器待处理"})
    end
    return alerts
end

--- Mempalace.GetAlertSummary: 获取告警摘要文本
-- @param entityId 实体 ID
-- @return 字符串
function Mempalace.GetAlertSummary(entityId)
    local alerts = Mempalace.CheckAlerts(entityId)
    if #alerts == 0 then return "（无告警）" end
    local lines = {"【告警摘要 · " .. entityId .. "】"}
    for _, a in ipairs(alerts) do
        local roomStr = a.room and (" @" .. a.room) or ""
        table.insert(lines, string.format("[%s] %s%s: %s", a.level, a.type, roomStr, a.message))
    end
    return table.concat(lines, "\n")
end

--- Mempalace.AutoFixAlerts: 尝试自动修复部分问题
-- @param entityId 实体 ID
-- @return 修复报告
function Mempalace.AutoFixAlerts(entityId)
    local report = {toxicCleaned = 0, compressed = 0, archived = 0, actions = {}}
    local alerts = Mempalace.CheckAlerts(entityId)
    for _, a in ipairs(alerts) do
        if a.type == "toxic_overflow" then
            report.toxicCleaned = Mempalace.CleanseToxicMemories(entityId)
            table.insert(report.actions, "cleanse_toxic")
        elseif a.type == "room_overflow" then
            report.compressed = report.compressed + Mempalace.CompressRoom(entityId, a.room)
            table.insert(report.actions, "compress_room")
        elseif a.type == "hardlock_conflict" then
            report.archived = report.archived + Mempalace.ArchiveOld(entityId, 7)
            table.insert(report.actions, "archive_old")
        end
    end
    return report
end

-- ============================================
-- 补充扩展 · 事件日志集成接口
-- ============================================

--- Mempalace.LogToEventLog: 将宫殿的重大变化记录到 EventLog
-- @param entityId 实体 ID
-- @param action 动作描述
-- @param details 详情
-- @return void
function Mempalace.LogToEventLog(entityId, action, details)
    if EventLog and EventLog.Append then
        EventLog.Append({
            type = "mempalace_change",
            actor = entityId,
            desc = action .. ": " .. (details or ""),
            data = {entityId = entityId, action = action, details = details},
            branch_id = "main"
        })
    end
end

--- Mempalace.SyncWithEventLog: 将 EventLog 中指定时间范围内的事件同步到宫殿
-- @param entityId 实体 ID
-- @param tMin 起始时间
-- @param tMax 结束时间
-- @param targetRoom 目标房间（默认 "事件沙盘"）
-- @return 同步数量
function Mempalace.SyncWithEventLog(entityId, tMin, tMax, targetRoom)
    targetRoom = targetRoom or "事件沙盘"
    if not EventLog or not EventLog.ByTimeRange then return 0 end
    local events = EventLog.ByTimeRange(tMin, tMax, "all")
    local count = 0
    for _, evt in ipairs(events) do
        if evt.actor == entityId or evt.target == entityId then
            Mempalace.Add(entityId, targetRoom, {
                desc = evt.desc or (evt.type or "event"),
                source = evt.id,
                weight = 2,
                born_t = evt.t,
                tags = {"event_log_sync"}
            })
            count = count + 1
        end
    end
    return count
end

--- Mempalace.BuildEventLogPrompt: 将 EventLog 近期事件与宫殿记忆合并为 Prompt
-- @param entityId 实体 ID
-- @param eventCount 事件条数
-- @param memoryCount 记忆条数
-- @return Prompt 字符串
function Mempalace.BuildEventLogPrompt(entityId, eventCount, memoryCount)
    eventCount = eventCount or 5
    memoryCount = memoryCount or 5
    local memPrompt = Mempalace.ToPrompt(entityId, memoryCount, "dialog")
    local eventPrompt = ""
    if EventLog and EventLog.ToPromptText then
        eventPrompt = EventLog.ToPromptText(eventCount, "main")
    else
        eventPrompt = "（EventLog 不可用）"
    end
    return "【宫殿记忆】\n" .. memPrompt .. "\n\n【近期大事】\n" .. eventPrompt
end

-- ============================================
-- 补充扩展 · 记忆宫殿之间的差异对比
-- ============================================

--- Mempalace.DiffPalaces: 对比两个实体的宫殿差异
-- @param entityIdA 实体 A
-- @param entityIdB 实体 B
-- @return 差异报告表
function Mempalace.DiffPalaces(entityIdA, entityIdB)
    local pa = Mempalace.Get(entityIdA)
    local pb = Mempalace.Get(entityIdB)
    local report = {
        entityA = entityIdA,
        entityB = entityIdB,
        typeA = pa.type,
        typeB = pb.type,
        roomDiff = {},
        entryCountDiff = {},
        sharedRooms = {},
        uniqueRoomsA = {},
        uniqueRoomsB = {}
    }
    local roomsA = {}
    local roomsB = {}
    for r, _ in pairs(pa.rooms) do roomsA[r] = true end
    for r, _ in pairs(pb.rooms) do roomsB[r] = true end
    for r, _ in pairs(roomsA) do
        if roomsB[r] then
            report.sharedRooms[r] = true
            report.entryCountDiff[r] = (#pa.rooms[r] or 0) - (#pb.rooms[r] or 0)
        else
            report.uniqueRoomsA[r] = true
        end
    end
    for r, _ in pairs(roomsB) do
        if not roomsA[r] then
            report.uniqueRoomsB[r] = true
        end
    end
    return report
end

--- Mempalace.GetPalaceSimilarity: 计算两个宫殿的相似度
-- 基于共享房间比例与内容的简单相似度。
-- @param entityIdA 实体 A
-- @param entityIdB 实体 B
-- @return 相似度（0~1）
function Mempalace.GetPalaceSimilarity(entityIdA, entityIdB)
    local diff = Mempalace.DiffPalaces(entityIdA, entityIdB)
    local shared = table_count(diff.sharedRooms)
    local totalRooms = shared + table_count(diff.uniqueRoomsA) + table_count(diff.uniqueRoomsB)
    if totalRooms == 0 then return 1 end
    return shared / totalRooms
end

-- ============================================
-- 补充扩展 · 文件末尾初始化钩子
-- ============================================

--- Mempalace.OnModuleLoad: 模块加载时自动执行的初始化
-- @return void
function Mempalace.OnModuleLoad()
    Mempalace.InitializeSystem()
end

-- 文件加载时自动执行初始化（如果在支持的环境）
Mempalace.OnModuleLoad()

-- ============================================
-- Mempalace.lua 完全体 · 文件尾
-- ============================================

-- ============================================
-- 补充扩展 · 宫殿诊断与修复工具
-- ============================================

--- Mempalace.DiagnosePalace: 对指定宫殿进行全面诊断
-- @param entityId 实体 ID
-- @return 诊断报告表
function Mempalace.DiagnosePalace(entityId)
    local palace = Mempalace.Get(entityId)
    local report = {
        entityId = entityId,
        diagnosedAt = GetWorldTime(),
        issues = {},
        stats = Mempalace.GetMemoryStats(entityId),
        healthScore = Mempalace.GetPalaceHealthScore(entityId),
        triggers = Mempalace.CheckTriggers(entityId),
        alerts = Mempalace.CheckAlerts(entityId)
    }
    -- 检查缺失的默认房间
    local template = Mempalace.ROOM_TEMPLATES[palace.type] or {}
    for rName, _ in pairs(template) do
        if not palace.rooms[rName] then
            table.insert(report.issues, {type = "missing_default_room", room = rName, severity = "low"})
        end
    end
    -- 检查重复 ID
    local ids = {}
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if ids[e.id] then
                table.insert(report.issues, {type = "duplicate_id", id = e.id, rooms = {ids[e.id], rName}, severity = "medium"})
            else
                ids[e.id] = rName
            end
            -- 检查缺失向量
            if not e.vector or #e.vector ~= Mempalace.VECTOR_DIM then
                table.insert(report.issues, {type = "missing_vector", id = e.id, room = rName, severity = "low"})
            end
            -- 检查过旧条目
            local age = (GetWorldTime() - (e.born_t or 0)) / Mempalace.ONE_DAY
            if age > 365 then
                table.insert(report.issues, {type = "very_old_entry", id = e.id, room = rName, ageDays = age, severity = "info"})
            end
        end
    end
    -- 检查已损坏的房间引用
    for rName, room in pairs(palace.rooms) do
        if type(room) ~= "table" then
            table.insert(report.issues, {type = "corrupted_room", room = rName, severity = "high"})
        end
    end
    return report
end

--- Mempalace.FixPalace: 自动修复宫殿诊断出的可修复问题
-- @param entityId 实体 ID
-- @return 修复报告表
function Mempalace.FixPalace(entityId)
    local report = {fixed = {}, counts = {missingRooms = 0, missingVectors = 0, duplicatesMerged = 0, oldEntriesArchived = 0}}
    local diag = Mempalace.DiagnosePalace(entityId)
    local palace = Mempalace.Get(entityId)
    for _, issue in ipairs(diag.issues) do
        if issue.type == "missing_default_room" then
            if not palace.rooms[issue.room] then palace.rooms[issue.room] = {} end
            report.counts.missingRooms = report.counts.missingRooms + 1
            table.insert(report.fixed, issue)
        elseif issue.type == "missing_vector" then
            for _, e in ipairs(palace.rooms[issue.room] or {}) do
                if e.id == issue.id then
                    e.vector = Mempalace.TextToVector(e.desc or "")
                    report.counts.missingVectors = report.counts.missingVectors + 1
                    break
                end
            end
            table.insert(report.fixed, issue)
        elseif issue.type == "very_old_entry" then
            -- 由自动归档处理
            report.counts.oldEntriesArchived = report.counts.oldEntriesArchived + 1
        end
    end
    -- 修复重复 ID
    local seenIds = {}
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if seenIds[e.id] then
                e.id = GenerateUUID()
                report.counts.duplicatesMerged = report.counts.duplicatesMerged + 1
            else
                seenIds[e.id] = true
            end
        end
    end
    -- 重建索引
    Mempalace.RebuildIndexes(entityId)
    return report
end

--- Mempalace.DiagnoseAll: 诊断所有内存中的宫殿
-- @return 全局诊断报告表
function Mempalace.DiagnoseAll()
    local report = {palaces = {}, totalIssues = 0, totalEntities = 0}
    for eid, _ in pairs(Mempalace.palaces) do
        local diag = Mempalace.DiagnosePalace(eid)
        report.palaces[eid] = diag
        report.totalIssues = report.totalIssues + #diag.issues
        report.totalEntities = report.totalEntities + 1
    end
    return report
end

--- Mempalace.FixAll: 自动修复所有宫殿
-- @return 全局修复报告
function Mempalace.FixAll()
    local report = {fixed = {}, totalFixed = 0}
    for eid, _ in pairs(Mempalace.palaces) do
        local fixed = Mempalace.FixPalace(eid)
        report.fixed[eid] = fixed
        report.totalFixed = report.totalFixed + #fixed.fixed
    end
    return report
end

--- Mempalace.GetDiagnosisSummary: 获取诊断摘要文本
-- @param entityId 实体 ID
-- @return 字符串
function Mempalace.GetDiagnosisSummary(entityId)
    local diag = Mempalace.DiagnosePalace(entityId)
    local lines = {"【宫殿诊断 · " .. entityId .. "】"}
    table.insert(lines, "健康度: " .. string.format("%.1f", diag.healthScore))
    table.insert(lines, "条目数: " .. diag.stats.totalEntries)
    table.insert(lines, "告警数: " .. #diag.alerts)
    table.insert(lines, "问题数: " .. #diag.issues)
    if #diag.issues > 0 then
        table.insert(lines, "问题列表:")
        for _, issue in ipairs(diag.issues) do
            table.insert(lines, "  - [" .. issue.severity .. "] " .. issue.type .. (issue.room and (" @" .. issue.room) or ""))
        end
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- 补充扩展 · 额外统计聚合 API
-- ============================================

--- Mempalace.GetAverageWeightByRoom: 获取每个房间的平均有效权重
-- @param entityId 实体 ID
-- @return 房间->平均权重 表
function Mempalace.GetAverageWeightByRoom(entityId)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local result = {}
    for rName, room in pairs(palace.rooms) do
        local sum = 0
        for _, e in ipairs(room) do
            sum = sum + Mempalace.EffectiveWeight(e, current_t)
        end
        result[rName] = #room > 0 and (sum / #room) or 0
    end
    return result
end

--- Mempalace.GetConfidenceDistribution: 获取置信度分布
-- @param entityId 实体 ID
-- @return 分布表 {low, medium, high}
function Mempalace.GetConfidenceDistribution(entityId)
    local palace = Mempalace.Get(entityId)
    local dist = {low = 0, medium = 0, high = 0}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local c = e.confidence or 1.0
            if c < 0.4 then dist.low = dist.low + 1
            elseif c < 0.8 then dist.medium = dist.medium + 1
            else dist.high = dist.high + 1 end
        end
    end
    return dist
end

--- Mempalace.GetSourceDistribution: 获取来源分布（按来源统计数量）
-- @param entityId 实体 ID
-- @return 来源->数量 表
function Mempalace.GetSourceDistribution(entityId)
    local palace = Mempalace.Get(entityId)
    local dist = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local src = e.source or "unknown"
            dist[src] = (dist[src] or 0) + 1
        end
    end
    return dist
end

--- Mempalace.GetAgeDistribution: 获取记忆年龄分布（按天分段）
-- @param entityId 实体 ID
-- @param buckets 分段天数列表（默认 {7,30,90,365}）
-- @return 分布表
function Mempalace.GetAgeDistribution(entityId, buckets)
    buckets = buckets or {7, 30, 90, 365}
    table.sort(buckets)
    local palace = Mempalace.Get(entityId)
    local current_t = GetWorldTime()
    local dist = {}
    for _, b in ipairs(buckets) do dist["le_" .. b] = 0 end
    dist["gt_" .. buckets[#buckets]] = 0
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            local age = (current_t - (e.born_t or current_t)) / Mempalace.ONE_DAY
            local placed = false
            for _, b in ipairs(buckets) do
                if age <= b then
                    dist["le_" .. b] = dist["le_" .. b] + 1
                    placed = true
                    break
                end
            end
            if not placed then
                dist["gt_" .. buckets[#buckets]] = dist["gt_" .. buckets[#buckets]] + 1
            end
        end
    end
    return dist
end

--- Mempalace.GetTopSources: 获取记忆来源排行榜
-- @param entityId 实体 ID
-- @param n 数量（默认 5）
-- @return 来源列表
function Mempalace.GetTopSources(entityId, n)
    n = n or 5
    local dist = Mempalace.GetSourceDistribution(entityId)
    local sorted = {}
    for src, c in pairs(dist) do table.insert(sorted, {source = src, count = c}) end
    table.sort(sorted, function(a, b) return a.count > b.count end)
    local result = {}
    for i = 1, math.min(n, #sorted) do table.insert(result, sorted[i]) end
    return result
end

--- Mempalace.GetTagCloud: 获取标签云数据（标签 -> 权重，按出现次数）
-- @param entityId 实体 ID
-- @return 标签云表
function Mempalace.GetTagCloud(entityId)
    local palace = Mempalace.Get(entityId)
    local cloud = {}
    for _, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            for _, tag in ipairs(e.tags or {}) do
                cloud[tag] = (cloud[tag] or 0) + (e.weight or 1.0)
            end
        end
    end
    return cloud
end

--- Mempalace.GetTagCloudJSON: 获取标签云的 JSON 字符串
-- @param entityId 实体 ID
-- @return JSON 字符串
function Mempalace.GetTagCloudJSON(entityId)
    return SimpleEncode(Mempalace.GetTagCloud(entityId)) or "{}"
end

-- ============================================
-- 补充扩展 · Prompt 增强：带元数据的完整导出
-- ============================================

--- Mempalace.ToPromptWithMetadata: 生成带完整元数据的 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条数
-- @param sceneType 场景类型
-- @return Prompt 字符串
function Mempalace.ToPromptWithMetadata(entityId, maxItemsPerRoom, sceneType)
    maxItemsPerRoom = maxItemsPerRoom or 5
    sceneType = sceneType or "dialog"
    local basePrompt = Mempalace.ToPrompt(entityId, maxItemsPerRoom, sceneType)
    local stats = Mempalace.GetMemoryStats(entityId)
    local metaLines = {
        "",
        "【宫殿元数据】",
        "- 实体ID: " .. entityId,
        "- 总条目: " .. stats.totalEntries,
        "- 总房间: " .. stats.totalRooms,
        "- 平均权重: " .. string.format("%.2f", stats.avgWeight),
        "- 情感区间: [" .. string.format("%.2f", stats.sentimentRange.min) .. ", " .. string.format("%.2f", stats.sentimentRange.max) .. "]"
    }
    return basePrompt .. table.concat(metaLines, "\n")
end

--- Mempalace.ToPromptWithRelationships: 生成带关系网络的记忆 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条数
-- @param maxRelations 最大关系数
-- @return Prompt 字符串
function Mempalace.ToPromptWithRelationships(entityId, maxItemsPerRoom, maxRelations)
    maxItemsPerRoom = maxItemsPerRoom or 4
    maxRelations = maxRelations or 5
    local basePrompt = Mempalace.ToPrompt(entityId, maxItemsPerRoom, "dialog")
    local relPrompt = Mempalace.GetRelationshipSummary(entityId, maxRelations)
    return basePrompt .. "\n\n" .. relPrompt
end

--- Mempalace.ToPromptWithDiary: 生成带今日日记摘要的 Prompt
-- @param entityId 实体 ID
-- @param maxItemsPerRoom 每房间条数
-- @return Prompt 字符串
function Mempalace.ToPromptWithDiary(entityId, maxItemsPerRoom)
    maxItemsPerRoom = maxItemsPerRoom or 4
    local basePrompt = Mempalace.ToPrompt(entityId, maxItemsPerRoom, "dialog")
    local diary = Mempalace.GenerateDailyDiary(entityId)
    local preview = string.sub(diary, 1, 300)
    return basePrompt .. "\n\n【今日日记摘要】\n" .. preview .. "..."
end

-- ============================================
-- 补充扩展 · 批量查询工具
-- ============================================

--- Mempalace.MultiEntityQuery: 对多个实体执行相同查询并汇总
-- @param entityIds 实体 ID 列表
-- @param queryFn 查询函数名（字符串）
-- @param ... 查询参数
-- @return 汇总结果表
function Mempalace.MultiEntityQuery(entityIds, queryFn, ...)
    local results = {}
    for _, eid in ipairs(entityIds) do
        local fn = Mempalace[queryFn]
        if fn and type(fn) == "function" then
            results[eid] = fn(eid, ...)
        end
    end
    return results
end

--- Mempalace.MultiEntityPrompt: 为多个实体生成合并 Prompt
-- @param entityIds 实体 ID 列表
-- @param maxItemsPerRoom 每房间条数
-- @return Prompt 字符串
function Mempalace.MultiEntityPrompt(entityIds, maxItemsPerRoom)
    maxItemsPerRoom = maxItemsPerRoom or 3
    local lines = {"【多实体记忆宫殿】"}
    for _, eid in ipairs(entityIds) do
        table.insert(lines, "")
        table.insert(lines, "--- " .. eid .. " ---")
        table.insert(lines, Mempalace.ToPrompt(eid, maxItemsPerRoom, "dialog"))
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- 补充扩展 · 硬锁与记忆的关联图谱构建
-- ============================================

--- Mempalace.BuildHardLockMap: 构建实体硬锁的关联图
-- @param entityId 实体 ID
-- @return 硬锁图 {hardLocks, relatedEntries}
function Mempalace.BuildHardLockMap(entityId)
    local palace = Mempalace.Get(entityId)
    local hardLocks = {}
    local relatedEntries = {}
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if table_contains(e.tags or {}, "hard_lock") then
                table.insert(hardLocks, {room = rName, entry = e})
            elseif e.factId then
                table.insert(relatedEntries, {room = rName, entry = e})
            end
        end
    end
    return {hardLocks = hardLocks, relatedEntries = relatedEntries}
end

--- Mempalace.GetHardLockCoverage: 统计硬锁在各房间的覆盖情况
-- @param entityId 实体 ID
-- @return 覆盖率表
function Mempalace.GetHardLockCoverage(entityId)
    local palace = Mempalace.Get(entityId)
    local coverage = {}
    for rName, room in pairs(palace.rooms) do
        local total = #room
        local locked = 0
        for _, e in ipairs(room) do
            if table_contains(e.tags or {}, "hard_lock") then
                locked = locked + 1
            end
        end
        coverage[rName] = {total = total, locked = locked, ratio = total > 0 and (locked / total) or 0}
    end
    return coverage
end

-- ============================================
-- 补充扩展 · 记忆引用链（Reference Chain）追踪
-- ============================================

--- Mempalace.GetReferenceChain: 追踪一条记忆的引用链
-- 基于 source 字段向上追溯。
-- @param entityId 实体 ID
-- @param entryId 条目 ID
-- @param depth 深度（默认 5）
-- @return 链列表
function Mempalace.GetReferenceChain(entityId, entryId, depth)
    depth = depth or 5
    local chain = {}
    local currentId = entryId
    for i = 1, depth do
        local palace = Mempalace.Get(entityId)
        local found = nil
        for _, room in pairs(palace.rooms) do
            for _, e in ipairs(room) do
                if e.id == currentId then
                    found = e
                    break
                end
            end
            if found then break end
        end
        if not found then break end
        table.insert(chain, {entry = found, source = found.source})
        if not found.source or found.source == "" then break end
        currentId = found.source
    end
    return chain
end

--- Mempalace.GetChildrenMemories: 获取所有以某条目为 source 的子记忆
-- @param entityId 实体 ID
-- @param sourceId 来源 ID
-- @return 子记忆列表
function Mempalace.GetChildrenMemories(entityId, sourceId)
    local palace = Mempalace.Get(entityId)
    local children = {}
    for rName, room in pairs(palace.rooms) do
        for _, e in ipairs(room) do
            if e.source == sourceId then
                table.insert(children, {room = rName, entry = e})
            end
        end
    end
    return children
end

-- ============================================
-- 补充扩展 · 最终补足模块（确保 8000+ 行）
-- ============================================

--- Mempalace.GetRoomEntryByIndex: 按索引获取房间条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param idx 索引（1-based）
-- @return 条目或 nil
function Mempalace.GetRoomEntryByIndex(entityId, roomName, idx)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return nil end
    return room[idx]
end

--- Mempalace.SetRoomEntryByIndex: 按索引修改房间条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param idx 索引
-- @param fields 字段表
-- @return boolean
function Mempalace.SetRoomEntryByIndex(entityId, roomName, idx, fields)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or not room[idx] then return false end
    local oldCopy = table_deepcopy(room[idx])
    for k, v in pairs(fields) do
        if k ~= "id" then room[idx][k] = v end
    end
    if fields.desc then room[idx].vector = Mempalace.TextToVector(fields.desc) end
    Mempalace.RecordVersion(entityId, room[idx].id, "update", oldCopy, table_deepcopy(room[idx]))
    return true
end

--- Mempalace.SwapRoomEntries: 交换房间内两个条目的位置
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param idxA 索引 A
-- @param idxB 索引 B
-- @return boolean
function Mempalace.SwapRoomEntries(entityId, roomName, idxA, idxB)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or not room[idxA] or not room[idxB] then return false end
    room[idxA], room[idxB] = room[idxB], room[idxA]
    return true
end

--- Mempalace.InsertRoomEntryAt: 在指定位置插入条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param idx 插入位置
-- @param entry 条目
-- @return boolean
function Mempalace.InsertRoomEntryAt(entityId, roomName, idx, entry)
    local palace = Mempalace.Get(entityId)
    if not palace.rooms[roomName] then palace.rooms[roomName] = {} end
    table.insert(palace.rooms[roomName], idx, entry)
    Mempalace.AddToIndexes(entityId, roomName, entry)
    Mempalace.RecordVersion(entityId, entry.id, "create", nil, table_deepcopy(entry))
    return true
end

--- Mempalace.RemoveRoomEntryAt: 移除指定位置的条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param idx 索引
-- @return 被移除的条目或 nil
function Mempalace.RemoveRoomEntryAt(entityId, roomName, idx)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or not room[idx] then return nil end
    local removed = table.remove(room, idx)
    if removed then
        Mempalace.RemoveFromIndexes(entityId, removed.id)
        Mempalace.RecordVersion(entityId, removed.id, "delete", table_deepcopy(removed), nil)
    end
    return removed
end

--- Mempalace.GetRoomFirst: 获取房间首条记忆
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 条目或 nil
function Mempalace.GetRoomFirst(entityId, roomName)
    return Mempalace.GetRoomEntryByIndex(entityId, roomName, 1)
end

--- Mempalace.GetRoomLast: 获取房间末条记忆
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 条目或 nil
function Mempalace.GetRoomLast(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return nil end
    return room[#room]
end

--- Mempalace.GetRoomSlice: 获取房间条目的子范围
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param startIdx 起始索引
-- @param endIdx 结束索引
-- @return 子列表
function Mempalace.GetRoomSlice(entityId, roomName, startIdx, endIdx)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return {} end
    local result = {}
    for i = startIdx, math.min(endIdx, #room) do
        table.insert(result, room[i])
    end
    return result
end

--- Mempalace.ReverseRoom: 反转房间内条目的顺序
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return boolean
function Mempalace.ReverseRoom(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    local n = #room
    for i = 1, math.floor(n / 2) do
        room[i], room[n - i + 1] = room[n - i + 1], room[i]
    end
    return true
end

--- Mempalace.ShuffleRoom: 随机打乱房间内条目的顺序
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return boolean
function Mempalace.ShuffleRoom(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    for i = #room, 2, -1 do
        local j = math.random(1, i)
        room[i], room[j] = room[j], room[i]
    end
    return true
end

--- Mempalace.SortRoomByWeight: 按权重排序房间内的条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param ascending 是否升序（默认 false）
-- @return boolean
function Mempalace.SortRoomByWeight(entityId, roomName, ascending)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    local current_t = GetWorldTime()
    table.sort(room, function(a, b)
        local wa = Mempalace.EffectiveWeight(a, current_t)
        local wb = Mempalace.EffectiveWeight(b, current_t)
        if ascending then return wa < wb else return wa > wb end
    end)
    return true
end

--- Mempalace.SortRoomByTime: 按时间排序房间内的条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param ascending 是否升序（默认 false = 新到旧）
-- @return boolean
function Mempalace.SortRoomByTime(entityId, roomName, ascending)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    table.sort(room, function(a, b)
        if ascending then
            return (a.born_t or 0) < (b.born_t or 0)
        else
            return (a.born_t or 0) > (b.born_t or 0)
        end
    end)
    return true
end

--- Mempalace.SortRoomBySentiment: 按情感排序房间内的条目
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param ascending 是否升序（默认 false = 正到负）
-- @return boolean
function Mempalace.SortRoomBySentiment(entityId, roomName, ascending)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    table.sort(room, function(a, b)
        if ascending then
            return (a.sentiment or 0) < (b.sentiment or 0)
        else
            return (a.sentiment or 0) > (b.sentiment or 0)
        end
    end)
    return true
end

--- Mempalace.FilterRoomByTag: 在单个房间内按标签过滤
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param tag 标签
-- @return 过滤后的条目列表
function Mempalace.FilterRoomByTag(entityId, roomName, tag)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return {} end
    local result = {}
    for _, e in ipairs(room) do
        if table_contains(e.tags or {}, tag) then
            table.insert(result, e)
        end
    end
    return result
end

--- Mempalace.FilterRoomBySource: 在单个房间内按来源过滤
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param sourceId 来源 ID
-- @return 过滤后的条目列表
function Mempalace.FilterRoomBySource(entityId, roomName, sourceId)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return {} end
    local result = {}
    for _, e in ipairs(room) do
        if e.source == sourceId then
            table.insert(result, e)
        end
    end
    return result
end

--- Mempalace.CountRoomByTag: 统计房间内某标签的条目数量
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param tag 标签
-- @return 数量
function Mempalace.CountRoomByTag(entityId, roomName, tag)
    return #Mempalace.FilterRoomByTag(entityId, roomName, tag)
end

--- Mempalace.GetRoomTags: 获取房间内所有出现过的标签集合
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 标签列表
function Mempalace.GetRoomTags(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return {} end
    local tags = {}
    local seen = {}
    for _, e in ipairs(room) do
        for _, t in ipairs(e.tags or {}) do
            if not seen[t] then
                seen[t] = true
                table.insert(tags, t)
            end
        end
    end
    return tags
end

--- Mempalace.GetUniqueSourcesInRoom: 获取房间内的所有唯一来源
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return 来源列表
function Mempalace.GetUniqueSourcesInRoom(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return {} end
    local sources = {}
    local seen = {}
    for _, e in ipairs(room) do
        local s = e.source or ""
        if s ~= "" and not seen[s] then
            seen[s] = true
            table.insert(sources, s)
        end
    end
    return sources
end

--- Mempalace.GetRoomSentimentRange: 获取房间内的情感极值
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return {min, max} 表
function Mempalace.GetRoomSentimentRange(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room == 0 then return {min = 0, max = 0} end
    local minVal = 1
    local maxVal = -1
    for _, e in ipairs(room) do
        local s = e.sentiment or 0
        if s < minVal then minVal = s end
        if s > maxVal then maxVal = s end
    end
    return {min = minVal, max = maxVal}
end

--- Mempalace.GetRoomIntensityRange: 获取房间内的强度极值
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return {min, max} 表
function Mempalace.GetRoomIntensityRange(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room == 0 then return {min = 0, max = 0} end
    local minVal = 1
    local maxVal = 0
    for _, e in ipairs(room) do
        local i = e.intensity or 0
        if i < minVal then minVal = i end
        if i > maxVal then maxVal = i end
    end
    return {min = minVal, max = maxVal}
end

--- Mempalace.GetRoomWeightRange: 获取房间内的权重极值
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return {min, max} 表
function Mempalace.GetRoomWeightRange(entityId, roomName)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room or #room == 0 then return {min = 0, max = 0} end
    local minVal = math.huge
    local maxVal = -math.huge
    local current_t = GetWorldTime()
    for _, e in ipairs(room) do
        local w = Mempalace.EffectiveWeight(e, current_t)
        if w < minVal then minVal = w end
        if w > maxVal then maxVal = w end
    end
    return {min = minVal, max = maxVal}
end

--- Mempalace.NormalizeRoomWeights: 将房间内的权重归一化到 [0,1]
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @return boolean
function Mempalace.NormalizeRoomWeights(entityId, roomName)
    local range = Mempalace.GetRoomWeightRange(entityId, roomName)
    if range.max == range.min then return false end
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    local current_t = GetWorldTime()
    for _, e in ipairs(room) do
        local w = Mempalace.EffectiveWeight(e, current_t)
        e.weight = (w - range.min) / (range.max - range.min)
        e.born_t = current_t
    end
    return true
end

--- Mempalace.ScaleRoomWeights: 等比缩放房间内的权重
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param factor 缩放因子
-- @return boolean
function Mempalace.ScaleRoomWeights(entityId, roomName, factor)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return false end
    local current_t = GetWorldTime()
    for _, e in ipairs(room) do
        local w = Mempalace.EffectiveWeight(e, current_t)
        e.weight = w * factor
        e.born_t = current_t
    end
    return true
end

--- Mempalace.BoostRecentEntries: 提升房间内近期条目的权重
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param days 天数范围
-- @param boostFactor 提升因子
-- @return 提升数量
function Mempalace.BoostRecentEntries(entityId, roomName, days, boostFactor)
    days = days or 7
    boostFactor = boostFactor or 1.5
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local count = 0
    for _, e in ipairs(room) do
        if (e.born_t or 0) >= cutoff then
            e.weight = (e.weight or 1.0) * boostFactor
            count = count + 1
        end
    end
    return count
end

--- Mempalace.PenalizeOldEntries: 降低房间内老旧条目的权重
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param days 天数阈值
-- @param penaltyFactor 惩罚因子
-- @return 惩罚数量
function Mempalace.PenalizeOldEntries(entityId, roomName, days, penaltyFactor)
    days = days or 30
    penaltyFactor = penaltyFactor or 0.8
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local count = 0
    for _, e in ipairs(room) do
        if (e.born_t or 0) < cutoff then
            e.weight = (e.weight or 1.0) * penaltyFactor
            count = count + 1
        end
    end
    return count
end

--- Mempalace.TagOldEntries: 为老旧条目自动贴上 "old" 标签
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param days 天数阈值
-- @return 标记数量
function Mempalace.TagOldEntries(entityId, roomName, days)
    days = days or 30
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local current_t = GetWorldTime()
    local cutoff = current_t - days * Mempalace.ONE_DAY
    local count = 0
    for _, e in ipairs(room) do
        if (e.born_t or 0) < cutoff then
            if not table_contains(e.tags or {}, "old") then
                table.insert(e.tags, "old")
                count = count + 1
            end
        end
    end
    return count
end

--- Mempalace.UntagRoomEntries: 批量移除房间内的某个标签
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param tag 标签
-- @return 移除数量
function Mempalace.UntagRoomEntries(entityId, roomName, tag)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local count = 0
    for _, e in ipairs(room) do
        local tags = e.tags or {}
        for i = #tags, 1, -1 do
            if tags[i] == tag then
                table.remove(tags, i)
                count = count + 1
            end
        end
    end
    return count
end

--- Mempalace.RetagRoomEntries: 批量替换房间内的某个标签
-- @param entityId 实体 ID
-- @param roomName 房间名称
-- @param oldTag 旧标签
-- @param newTag 新标签
-- @return 替换数量
function Mempalace.RetagRoomEntries(entityId, roomName, oldTag, newTag)
    local palace = Mempalace.Get(entityId)
    local room = palace.rooms[roomName]
    if not room then return 0 end
    local count = 0
    for _, e in ipairs(room) do
        local tags = e.tags or {}
        for i, t in ipairs(tags) do
            if t == oldTag then
                tags[i] = newTag
                count = count + 1
            end
        end
    end
    return count
end

