# 开源工具链详细接入指南

> 天道的推衍不只有 LLM。以下项目填补了 LLM 的短板：成本高、响应慢、幻觉不可控。

---

## 一、向量检索：Mempalace 的记忆搜索引擎

### 1.1 sqlite-vss（首选 · 塔防/RPG 规模）

**特点**
- 纯 SQLite 扩展，零额外部署
- 支持持久化存储，重启后记忆不丢
- 几百到几万条记忆完全够用

**Lua 接入示例**

```lua
-- 创建向量表（服务端启动时执行一次）
db:exec([[ 
    CREATE VIRTUAL TABLE IF NOT EXISTS mempalace_vectors USING vss0(
        embedding(1024)
    );
]])

function InsertVectorMemory(entity_id, room, desc)
    local emb = CallEmbeddingAPI(desc)  -- bge-large-zh or kimi embedding
    db:exec(string.format(
        "INSERT INTO mempalace_vectors (entity_id, room, desc, embedding) " ..
        "VALUES ('%s', '%s', '%s', '%s')",
        entity_id, room, desc, VectorToJSON(emb)
    ))
end

function RetrieveRelevantMemories(entity_id, query, k)
    local q_emb = CallEmbeddingAPI(query)
    return db:exec(string.format([[
        SELECT desc, distance 
        FROM mempalace_vectors 
        WHERE entity_id = '%s'
        ORDER BY vss_distance(embedding, '%s')
        LIMIT %d
    ]], entity_id, VectorToJSON(q_emb), k or 5))
end
```

### 1.2 hnswlib（大型 MMO · 毫秒级）

**特点**
- 纯 C++ 头文件库，编译进 UrhoX
- 不支持持久化，需自行做 checkpoint

**集成方式**
```cpp
// 在 UrhoX 服务端注册 Lua 绑定
#include "hnswlib/hnswlib.h"

hnswlib::L2Space space(1024);
hnswlib::HierarchicalNSW<float>* alg = new hnswlib::HierarchicalNSW<float>(
    &space, 100000, 16, 200
);
```

### 1.3 faiss（百万级记忆池）

**特点**
- Facebook 出品，支持 GPU 加速
- 适合 NPC 记忆池 >10 万的大型_persistent world_

---

## 二、文法生成：Tracery

### 2.1 为什么选择 Tracery

| 指标 | Tracery | 纯 LLM |
|------|---------|--------|
| 延迟 | < 1ms | 500ms-3s |
| 成本 | 0 | 按 token 计费 |
| 可控性 | 100% 受 JSON 文法约束 | 需要复杂 prompt |
| 创意 | 有限组合 | 几乎无限 |

### 2.2 Lua 移植实现

```lua
local Tracery = {}

function Tracery.Expand(symbol, grammar)
    local rule = grammar[symbol]
    if not rule then return symbol end
    local text = rule[math.random(1, #rule)]
    return text:gsub("#(%w+)#", function(sym) return Tracery.Expand(sym, grammar) end)
end

return Tracery
```

### 2.3 游戏内应用场景

```lua
local itemGrammar = {
    origin = "#prefix# #material# #weapon#",
    prefix = {"生锈的","发光的","诅咒的","传奇的"},
    material = {"铁","玄钢","水晶","骨质"},
    weapon = {"长剑","短刀","法杖","拳套"}
}
-- 输出：发光的玄钢长剑
```

---

## 三、叙事脚本：Ink

### 3.1 Ink 的核心价值

**"Ink 保底线，LLM 生上限。"**

主线剧情、关键分支、感情转折点——这些设计师用 Ink 精确控制，因为它们必须：
- 不触发玩家 NTR 感
- 符合角色弧线
- 满足审计与合规

支线、动态事件、NPC 闲聊——交给 LLM 实时生长。

### 3.2 Ink JSON 结构（Lua Runtime 需要解析的部分）

```json
{
  "inkVersion": 21,
  "root": [
    ["^你好，旅行者。", "\n", ["ev", {"->?":".^.c","c":true}, "out", "\/ev", "end"], null ],
    { "listDefs": {} }
  ]
}
```

### 3.3 最小 Lua Ink Runtime

```lua
local Ink = {}

function Ink.Load(json)
    local story = cjson.decode(json)
    return {
        root = story.root[1],
        current = 1,
        choices = {}
    }
end

function Ink.Continue(story)
    local line = story.root[story.current]
    if type(line) == "string" and line:sub(1,1) == "^" then
        story.current = story.current + 1
        return line:sub(2)
    end
    story.current = story.current + 1
    return nil
end

return Ink
```

> _RUNTIME 只需要支持 `Continue()` 和 `ChooseChoiceIndex()`，即可跑通 80% 的 Ink 故事。_

---

## 四、程序化地图：Wave Function Collapse

### 4.1 与 LLM 的分工

```
LLM（天道）              WFC（地道）
  │                        │
  ├─ 提出区域风格 ───────┤
  ├─ 设定主题图块 ───────┤
  │                        ├─ 生成整体图块布局
  │                        ├─ 保证局部一致性
  ├─ 润色关键房间描述 ◄──┤
```

### 4.2 集成路径

1. 找 `mxgmn/WaveFunctionCollapse` 的 C++ fork（如 `selfsame/WFC` 的 C++ 分支）
2. 编译为静态/动态库
3. 在 UrhoX 中注册 Lua 绑定：`GenerateWFC(sampleTiles, width, height)`
4. 传入图块字典 + 权重约束，获得 2D 图块矩阵

### 4.3 与 FastNoiseLite 的组合拳

```lua
-- Step 1: FastNoiseLite 生成宏观地形
local heightMap = FastNoiseLite.GetNoiseMap(seed, worldW, worldH)

-- Step 2: WFC 生成建筑内部图块
local buildingTiles = WFC.Generate({"wall","floor","door","window"}, 32, 32)

-- Step 3: 将建筑放置到 heightMap 的平坦区域
local buildingPos = FindFlatArea(heightMap, 32, 32)
```

---

## 五、寻路：Recast + Detour

UrhoX 本身已集成 NavMesh 生成和 Detour 寻路。天道引擎中的 NPC 动作底层直接复用。

```lua
-- AgentCore.lua 中
function MoveTo(npc, targetPos, distance)
    local navMesh = scene:GetComponent(" NavigationMesh")
    local path = navMesh:FindPath(npc.position, targetPos)
    npc:SetPath(path)
    npc.state = "moving"
end
```

---

## 六、关系网络图

不需要 Neo4j。用 Lua 邻接表即可。

```lua
world.relationships = {
    ["杰克"] = { ["V"] = -80, ["李四"] = +40 },
    ["V"] = { ["杰克"] = -30, ["商会"] = +60 },
    ["商会"] = { ["V"] = +10, ["黑市"] = -90 }
}

-- 查找仇恨链：杰克 → V → 商会
function FindRelationshipPath(from, to, visited)
    visited = visited or {}
    if from == to then return {to} end
    if visited[from] then return nil end
    visited[from] = true
    
    for neighbor, weight in pairs(world.relationships[from] or {}) do
        local path = FindRelationshipPath(neighbor, to, visited)
        if path then
            table.insert(path, 1, from)
            return path
        end
    end
    return nil
end
```

---

## 七、接入检查清单

- [ ] sqlite-vss 扩展已编译或已放置在 UrhoX 可加载路径
- [ ] Tracery Lua 文件已放入 `scripts/tao/PCG/`
- [ ] （可选）Ink JSON runtime 已放入 `scripts/tao/PCG/`
- [ ] WFC C++ 库已编译并与 UrhoX 链接
- [ ] FastNoiseLite 头文件已添加到项目 include 路径
- [ ] 图块样本（tileset）已准备好供 WFC 使用
