-- =========================================
-- 天道引擎试用版 - 记忆宫殿演示
-- =========================================

-- 简化的语义哈希函数
local function simple_hash(text)
    local hash = 0
    for i = 1, #text do
        hash = (hash * 31 + string.byte(text, i)) % 1000000007
    end
    return hash
end

-- 64维向量（简化版用8维演示）
local function text_to_vector(text)
    local vec = {}
    local keywords = {
        "玩家", "战斗", "对话", "任务", "物品",
        "敌人", "朋友", "地点", "时间", "情绪"
    }
    for i = 1, 8 do
        local keyword = keywords[i] or "其他"
        local count = 0
        for _ in string.gmatch(text, keyword) do
            count = count + 1
        end
        vec[i] = count + math.random() * 0.1
    end
    return vec
end

-- 余弦相似度
local function cosine_similarity(v1, v2)
    local dot = 0
    local norm1 = 0
    local norm2 = 0
    for i = 1, #v1 do
        dot = dot + v1[i] * v2[i]
        norm1 = norm1 + v1[i] * v1[i]
        norm2 = norm2 + v2[i] * v2[i]
    end
    return dot / (math.sqrt(norm1) * math.sqrt(norm2))
end

-- 记忆宫殿演示
local MempalaceDemo = {}

function MempalaceDemo:new(name)
    local obj = {
        name = name,
        rooms = {},
        memories = {}
    }
    setmetatable(obj, self)
    self.__index = self
    return obj
end

function MempalaceDemo:add_room(room_name)
    self.rooms[room_name] = {
        memories = {},
        created_at = os.time()
    }
    print(string.format("🏛️ 创建房间: %s", room_name))
end

function MempalaceDemo:add_memory(room_name, desc, sentiment)
    if not self.rooms[room_name] then
        self:add_room(room_name)
    end
    
    local memory = {
        id = #self.memories + 1,
        desc = desc,
        sentiment = sentiment or 0,
        vector = text_to_vector(desc),
        created_at = os.time(),
        weight = 1.0
    }
    
    table.insert(self.rooms[room_name].memories, memory)
    table.insert(self.memories, memory)
    
    print(string.format("📝 添加记忆 [%s]: %s (情感:%.1f)", room_name, desc, sentiment))
end

function MempalaceDemo:query_similar(query_text, top_k)
    top_k = top_k or 3
    local query_vec = text_to_vector(query_text)
    
    local results = {}
    for _, mem in ipairs(self.memories) do
        local similarity = cosine_similarity(query_vec, mem.vector)
        table.insert(results, {
            memory = mem,
            similarity = similarity
        })
    end
    
    -- 排序
    table.sort(results, function(a, b) return a.similarity > b.similarity end)
    
    print(string.format("\n🔍 查询: \"%s\"", query_text))
    print("相关记忆:")
    for i = 1, math.min(top_k, #results) do
        local r = results[i]
        print(string.format("  %d. [%.2f] %s", i, r.similarity, r.memory.desc))
    end
    
    return results
end

-- 演示运行
print("=" .. string.rep("=", 50))
print("🏛️ 天道引擎试用版 - 记忆宫殿演示")
print("=" .. string.rep("=", 50))
print()

-- 创建NPC记忆宫殿
local npc_palace = MempalaceDemo:new("NPC_杰克")

-- 添加记忆
npc_palace:add_memory("事件厅", "玩家在集市羞辱了杰克", -0.8)
npc_palace:add_memory("事件厅", "杰克在酒馆喝得烂醉", -0.3)
npc_palace:add_memory("人物厅", "杰克对玩家产生了怨恨", -0.9)
npc_palace:add_memory("事件厅", "杰克完成了一个危险的任务", 0.6)
npc_palace:add_memory("人物厅", "杰克和玩家曾经是朋友", 0.4)

print()

-- 查询演示
npc_palace:query_similar("玩家和杰克的冲突", 3)
print()
npc_palace:query_similar("杰克的情绪", 3)

print()
print("=" .. string.rep("=", 50))
print("✅ 演示完成")
print("完整版包含64维向量、时间衰减、硬锁等高级功能")
print("购买完整版请联系: 飞书 用户161224")
print("=" .. string.rep("=", 50))
