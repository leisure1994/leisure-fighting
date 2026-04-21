# urhox-procedural-world

> 一套面向 urhox（Urho3D / rbfx）引擎的完整程序化世界生成技能。整合 **Wave Function Collapse（WFC）** 建筑布局、**Perlin / fBm 噪声地形**、**Cellular Automata 洞穴**、**多维生物群系混合**以及 **Tiled JSON 桥接** 五大子系统，提供纯 Lua 算法层与引擎桥接层，可直接生成并导出可用于生产环境的 Tiled 地图数据。

---

## 1. 技能简介

在游戏开发中，手动搭建大世界地图既耗时又难以保证多样性与可复玩性。程序化内容生成（Procedural Content Generation, PCG）通过算法在运行时将有限的规则扩展为无限的变化，是解决这一问题的核心手段。`urhox-procedural-world` 正是为 urhox 引擎量身打造的 PCG 技能套件，它将五种在行业与独立游戏界被广泛验证的算法封装为可直接调用的 Lua 模块，并通过统一的 `main.lua` 入口演示如何把它们组合成一张有机的、分层的完整世界地图。

### 1.1 五大子系统概览

1. **NoiseTerrain（噪声地形）**
   - 内置纯 Lua 实现的 **2D / 3D Perlin Noise** 与 **Fractional Brownian Motion（fBm）**。
   - 支持 Domain Warping（域翘曲）、Ridged Noise（山脊噪声）、Terrace（阶梯化）等高级后处理。
   - 提供 `to_image`、`generate_mesh_heights`、`colorize_heightmap` 等桥接函数，可直接产出 urho Image 或自定义 Mesh 高度顶点。

2. **WFCGenerator（波函数坍缩）**
   - 基于 **mxgmn/WaveFunctionCollapse** 原版的 `Simple Tiled Model` 思路实现。
   - 纯 Lua 约束求解器：通过 `socket` 相等规则自动构建瓦片邻接表，配合 Shannon 熵驱动的观测（Observation）与传播（Propagation）循环。
   - 支持加权随机坍缩、回退（Backtrack）、周期性边界，以及从示例地图提取 Pattern 的简化 Overlapping Model 辅助函数。

3. **CaveGenerator（元胞自动机洞穴）**
   - 参考 **Sebastian Lague** 的经典 Cellular Automata 洞穴教程实现。
   - 流程：随机填充 → 平滑迭代（4-5 规则） → 区域识别（Flood Fill） → 剔除过小房间与墙体 → 边缘图邻近房间隧道连接。
   - 产出完整的 `WALL / FLOOR` 二维地图与房间列表，并支持直接转换为 tile id 网格。

4. **BiomeSystem（生物群系系统）**
   - 采用 **温度 / 湿度 / 海拔 / 特殊噪声** 四个维度对世界进行采样。
   - 基于 Fitness（适配度）函数为每个像素计算最佳匹配生物群系，并生成平滑的权重混合图（Weight Map）。
   - 内置 8 种预设生物群系（海洋、沙滩、草原、森林、沙漠、山地、雪原、火山），支持 Voronoi 锐化边界以产生更硬朗的生态过渡带。

5. **TilemapBridge（Tiled JSON 桥接器）**
   - 不依赖任何外部 JSON 库，内置完整的 JSON Encoder 与轻量级 Parser。
   - 支持 Tiled 1.10+ 标准格式的 `tilelayer`、`objectgroup`、`tileset` 构建与导出。
   - 提供 `flatten_2d / unflatten_1d` 辅助函数，处理 Lua 2D 数组与 Tiled 行优先 1D `data` 数组之间的互转。

### 1.2 设计哲学

- **纯算法层 + 可选桥接层**：所有核心模块均不依赖 urho 特定 API（除 `_G.Image` 等可选桥接外），因此也可以在标准 Lua 5.1/5.2/5.3/JIT 环境中离线跑图生成管线。
- **确定性（Deterministic）**：所有模块均支持 `seed` 参数，只要种子相同，输出结果完全一致，便于服务器/客户端同步或版本回滚。
- **教学级代码**：保留了大量中文注释与分阶段函数划分，适合作为 WFC、CA、Perlin fBm 等算法的入门教材直接阅读。

---

## 2. 适用场景

| 场景 | 说明 |
|------|------|
| **开放世界 RPG / MMO** | 需要大规模、可复玩的地表与地下城组合；利用不同的 seed 为每个服务器/副本生成独特版图。 |
| **Roguelike / Roguelite** | 每一局都重新生成地图：用 CA 生成洞穴房间，用 WFC 生成城镇布局，用 Biome 决定资源分布。 |
| **生存沙盒** | 噪声地形决定海拔与河流，生物群系决定植被与气候，洞穴系统提供矿产与地下探索空间。 |
| **关卡原型验证** | 策划无需等待美术手动摆图，通过调整 seed 和参数即可在数秒内产出大量地图变体进行白盒测试。 |
| **Tiled 工作流接入** | 生成结果直接保存为 `.json`，策划可在 Tiled Editor 中二次编辑、添加事件点、调整碰撞。 |

---

## 3. 触发关键词

在与 AI 对话时，以下关键词可用于提示或检索本技能：

- `urhox procedural world`
- `程序化地图生成`、`程序生成地形`
- `WFC`、`Wave Function Collapse`、`波函数坍缩`
- `Perlin Noise`、`Simplex Noise`、`fBm 地形`
- `Cellular Automata`、`元胞自动机`、`洞穴生成`
- `Biome System`、`生物群系`、`生态混合`
- `Tiled JSON`、`地图导出`、`tilemap bridge`
- `urho3d terrain`、`rbfx 程序化世界`

---

## 4. 安装方式

### 4.1 目录结构要求

将本技能解压（或放置）到 OpenClaw 的技能目录下，最终路径如下：

```
<workspace>/urhox-skills-pack/skills/urhox-procedural-world/
├── game.json
├── SKILL.md
└── scripts/
    ├── main.lua
    ├── NoiseTerrain.lua
    ├── WFCGenerator.lua
    ├── CaveGenerator.lua
    ├── BiomeSystem.lua
    └── TilemapBridge.lua
```

> **注意**：`game.json` 中的 `entry` 字段已指向 `scripts/main.lua`，确保 Lua 模块加载路径正确。

### 4.2 引擎兼容性

- **urhox (Urho3D / rbfx)**: >= 1.8.0
- **Lua 版本**: 5.1 / 5.2 / 5.3 / LuaJIT（使用标准库 `math`、`table`、`string`、`io`）
- **外部依赖**: 无（JSON 编码/解析为内置实现，不依赖 `dkjson` 或 `cjson`）

### 4.3 运行方式

在 urhox 的 Lua 环境中执行：

```lua
dofile("scripts/main.lua")
```

或在标准 Lua 命令行中测试（不依赖 urho API 的部分均可正常执行）：

```bash
cd urhox-procedural-world
lua scripts/main.lua
```

---

## 5. 系统架构图（文字版）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         urhox-procedural-world                               │
│                    （程序化世界生成总控与数据流）                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
             ▼                        ▼                        ▼
   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
   │  NoiseTerrain   │     │   BiomeSystem   │     │  CaveGenerator  │
   │  (Perlin + fBm) │     │ (Temp/Humid/Ele)│     │(Cellular Autom) │
   └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
            │                       │                       │
            │  heightmap            │  biomeMap             │  caveMap
            │  colormap             │  weightMap            │  rooms
            │                       │                       │
            └───────────────┬───────┴───────┬───────────────┘
                            │               │
                            ▼               ▼
                   ┌─────────────────┐
                   │   WFCGenerator  │
                   │ (Wave Function  │
                   │   Collapse )    │
                   └────────┬────────┘
                            │
                            │ wfcTileMap
                            ▼
                   ┌─────────────────┐
                   │  TilemapBridge  │
                   │ (Tiled JSON     │
                   │  Encoder/IO )   │
                   └────────┬────────┘
                            │
                            ▼
                      procedural_world_output.json
```

### 5.1 数据流说明

1. **阶段 1**：`NoiseTerrain` 以 `seed` 为输入，生成 128×128 的 `heightmap` 与基于海拔的 `colormap`。
2. **阶段 2**：`BiomeSystem` 使用独立的噪声偏移采样温度、湿度、海拔、特殊值，计算每个格子的最佳生物群系，生成 `biomeTileMap`。
3. **阶段 3**：`CaveGenerator` 在减半分辨率（64×64）的网格上运行 CA，生成地下洞穴层 `caveMap`，并记录所有连通房间。
4. **阶段 4**：`WFCGenerator` 以道路/房屋/草地/城墙等瓦片的 `socket` 约束为规则，在 32×32 的城镇范围内求解布局，输出 `wfcTileMap`。
5. **阶段 5**：`main.lua` 将上述四层数据按照逻辑合并（例如在山地/火山区显示洞穴入口，在地图中央用 WFC 结果覆盖地表），最终交给 `TilemapBridge` 编码为 Tiled JSON 并写入文件。

---

## 6. 核心 API 文档

以下 API 文档按照模块逐一展开，包含函数签名、参数说明、返回值与典型调用示例。

---

### 6.1 NoiseTerrain

噪声地形模块，提供从底层 Perlin 到高层 Heightmap/Mesh/Colormap 的完整链路。

#### 6.1.1 `NoiseTerrain.perlin2d(x, y, perm)`
- **说明**：计算 2D Perlin 噪声值（范围约 [-1, 1]）。
- **参数**：
  - `x` (number): 世界 X 坐标（可为浮点）。
  - `y` (number): 世界 Y 坐标。
  - `perm` (table): 512 长度的置换表，由 `build_permutation(seed)` 生成。
- **返回**：`number`

#### 6.1.2 `NoiseTerrain.perlin3d(x, y, z, perm)`
- **说明**：计算 3D Perlin 噪声值，适用于立体云、洞穴密度等三维场景。
- **参数**：增加 `z` (number)。
- **返回**：`number`

#### 6.1.3 `NoiseTerrain.fbm2d(x, y, config)` / `fbm3d(x, y, z, config)`
- **说明**：分形布朗运动，叠加多层 Perlin 噪声以产生更丰富的细节。
- **config 字段**：
  - `octaves` (int): 八度数，默认 4。
  - `lacunarity` (number): 频率倍数，默认 2.0。
  - `gain` (number): 振幅衰减，默认 0.5。
  - `scale` (number): 初始频率缩放，默认 1.0。
  - `seed` (int): 随机种子，默认 1337。
- **返回**：`number`（已归一化到约 [-1, 1]）

#### 6.1.4 `NoiseTerrain.domain_warp2d(x, y, config)`
- **说明**：域翘曲后处理，通过额外的噪声层扭曲采样坐标，可产生河流、峡谷等更自然的地貌。
- **config 特殊字段**：
  - `warpScale` (number): 翘曲采样比例。
  - `warpAmp` (number): 翘曲强度。

#### 6.1.5 `NoiseTerrain.generate_heightmap(width, height, config)`
- **说明**：生成纯 Lua 二维高度表。
- **返回**：`table[y][x] = number`（0..1 范围，若配置 `normalize = true`）
- **config 特殊字段**：
  - `ridged` (bool): 启用 Ridge Noise。
  - `terraceSteps` (int): 阶梯化阶数。
  - `domainWarp` (bool): 启用 Domain Warping。
  - `normalize` (bool): 将结果映射到 [0, 1]。

#### 6.1.6 `NoiseTerrain.to_image(heightmap, imageOrCreate)`
- **说明**：将高度图写入 urho `Image` 对象（R 通道灰度）。
- **参数**：
  - `heightmap` (table): 2D 数组。
  - `imageOrCreate` (Image|nil): 若提供则复用，否则尝试调用全局 `Image:new()`。
- **返回**：`Image`

#### 6.1.7 `NoiseTerrain.generate_mesh_heights(width, depth, spacing, config)`
- **说明**：生成可用于自定义 TerrainPatch / Mesh 的顶点高度列表。
- **返回**：`verts` (table), `width`, `depth`
- **verts 元素结构**：`{ x=..., y=..., z=..., height=... }`

#### 6.1.8 `NoiseTerrain.colorize_heightmap(heightmap, colors)`
- **说明**：基于高度阈值快速生成颜色图（水、沙、草、岩、雪）。
- **colors 结构示例**：
  ```lua
  { water={0.1,0.3,0.6}, sand={0.9,0.8,0.5}, grass={0.2,0.7,0.2}, rock={0.5,0.5,0.5}, snow={1,1,1} }
  ```
- **返回**：`table[y][x] = {r,g,b}`

---

### 6.2 WFCGenerator

波函数坍缩模块，用于生成满足局部约束的瓦片地图（典型应用：城镇道路、遗迹房间、迷宫走廊）。

#### 6.2.1 `WFCGenerator.new(config)`
- **说明**：创建一个新的 WFC 求解器实例。
- **config 字段**：
  - `width`, `height` (int): 输出网格尺寸，默认 32×32。
  - `periodicOutput` (bool): 输出是否周期性边界，默认 `false`。
  - `backtrack` (bool): 遇到矛盾时是否回溯，默认 `true`。
  - `maxBacktracks` (int): 最大回溯深度，默认 1000。
  - `seed` (int): 随机种子。

#### 6.2.2 `:add_tile(tileDef)`
- **说明**：向求解器注册一个瓦片定义。
- **tileDef 字段**：
  - `id` (string): 唯一标识。
  - `sockets` (table): `{ up="...", right="...", down="...", left="..." }`，相同字符串代表可拼接。
  - `weight` (number): 加权概率，默认 1.0。
  - `data` (any): 自定义数据（如 `tileId`）。

#### 6.2.3 `:build_adjacency()`
- **说明**：根据所有已注册 tile 的 socket 相等规则，自动构建四维（上/右/下/左）邻接矩阵。
- **注意**：通常由 `:generate()` 内部自动调用，无需手动调用。

#### 6.2.4 `:generate()`
- **说明**：运行完整的 WFC 观测-传播循环，直到所有格子坍缩或达到最大尝试次数。
- **返回**：`true`（成功）
- **异常**：若产生不可解决的矛盾且回溯耗尽，会 `error`。

#### 6.2.5 `:get_output()`
- **说明**：获取输出 grid，每个元素为对应的 tile 定义对象（或 `nil`）。
- **返回**：`table[y][x] = tileDef|nil`

#### 6.2.6 `:get_output_ids()`
- **说明**：获取输出 grid，每个元素为 tile 在 `self.tiles` 中的 1-based 索引（-1 表示未坍缩）。
- **返回**：`table[y][x] = int`

#### 6.2.7 `WFCGenerator.extract_patterns(sampleMap, N, periodic)`
- **说明**：从示例二维地图中提取所有唯一的 N×N Pattern（简化 Overlapping Model 的前期步骤）。
- **返回**：`table`（Pattern 数组）

---

### 6.3 CaveGenerator

元胞自动机洞穴生成模块，适合地下城、洞穴、裂谷等自然洞的生成。

#### 6.3.1 `CaveGenerator.new(config)`
- **说明**：创建生成器实例。
- **config 字段**：
  - `width`, `height` (int): 网格尺寸，默认 80×50。
  - `seed` (int): 随机种子。
  - `randomFillPercent` (int): 初始随机填充为墙的概率（0~100），默认 48。
  - `smoothIterations` (int): 平滑迭代次数，默认 5。
  - `neighborWallLimit` (int): 4-5 规则阈值（>=此值变墙），默认 4。
  - `roomThresholdSize` / `wallThresholdSize` (int): 房间/墙块区域最小保留面积，默认 50。
  - `connectRooms` (bool): 是否连接孤立房间，默认 `true`。
  - `extraCorridorWidth` (int): 隧道宽度半径，默认 0（1 格宽）。

#### 6.3.2 `:generate()`
- **说明**：执行完整生成流程。
- **返回**：`map` (table), `rooms` (table)
  - `map[y][x]`: `CaveGenerator.WALL(1)` 或 `CaveGenerator.FLOOR(0)`
  - `rooms`: 按面积降序排列的连通房间列表，每个房间为 tile 坐标数组。

#### 6.3.3 `:find_spawn_point()`
- **说明**：返回最大房间的质心坐标，适合作为玩家出生点。
- **返回**：`x, y`

#### 6.3.4 `:to_tilemap(wallId, floorId)`
- **说明**：将 WALL/FLOOR 转为自定义 tile id 网格。
- **返回**：`table[y][x] = int`

---

### 6.4 BiomeSystem

多维生物群系混合模块，用于决定世界表面每一块区域属于哪种生态环境。

#### 6.4.1 `BiomeSystem.new(config)`
- **说明**：创建生物群系系统实例。
- **config 字段**：
  - `seed` (int): 噪声种子。
  - `width`, `height` (int): 地图尺寸。
  - `temperature`, `humidity`, `elevation`, `special` (table): 各自包含 `scale`、`octaves`、`gain`、`lacunarity`。
  - `blendWidth` (number): 边界混合宽度，默认 0.05。

#### 6.4.2 `:add_biome(def)`
- **说明**：注册一个生物群系定义。
- **def 字段示例**：
  ```lua
  {
      id = "forest", name = "森林",
      temperature = { min = 0.2, max = 0.6, weight = 1.0 },
      humidity    = { min = 0.5, max = 1.0, weight = 1.0 },
      elevation   = { min = 0.35, max = 0.7, weight = 1.0 },
      color = { r = 0.05, g = 0.5, b = 0.1 },
      tileId = 4, vegetationDensity = 0.8
  }
  ```

#### 6.4.3 `:generate(options)`
- **说明**：遍历整个网格，计算每个坐标的最优生物群系与权重分布。
- **返回**：`result` 表，包含：
  - `biomeMap[y][x]`: 最优生物群系对象。
  - `weightMap[y][x]`: `{ [biomeId] = normalizedWeight, ... }`。
  - `detailMap[y][x]`: `{ temperature, humidity, elevation, special, bestScore }`。

#### 6.4.4 `:generate_color_map(result)`
- **说明**：根据权重混合各生物群系颜色，生成可视化颜色图。
- **返回**：`table[y][x] = {r,g,b}`

#### 6.4.5 `:generate_tile_map(result)`
- **说明**：提取最优生物群系的 `tileId`，生成用于 TilemapBridge 的 2D 瓦片网格。
- **返回**：`table[y][x] = int`

#### 6.4.6 `:voronoi_sharpen(result, strength)`
- **说明**：对权重图做幂运算放大差异，使边界更硬朗（类似 Voronoi 效果）。
- **参数**：`strength` (number) 默认 1.0；越大边界越清晰。

#### 6.4.7 `BiomeSystem.presets()`
- **说明**：返回内置的 8 种生物群系预设定义数组，可直接 `add_biome`。
- **返回**：`table`

---

### 6.5 TilemapBridge

Tiled JSON 桥接模块，负责将 Lua 数据组装成 Tiled 兼容 JSON 并读写文件。

#### 6.5.1 `TilemapBridge.new(config)`
- **说明**：创建桥接器。
- **config 字段**：
  - `tileWidth`, `tileHeight` (int): 瓦片尺寸，默认 32。
  - `mapWidth`, `mapHeight` (int): 地图格子数，默认 64×64。
  - `orientation` (string): `"orthogonal"` 或 `"isometric"`。
  - `renderOrder` (string): 默认 `"right-down"`。

#### 6.5.2 `:add_tileset(ts)`
- **说明**：添加 tileset 描述。
- **ts 字段**：`firstgid`, `image`, `imagewidth`, `imageheight`, `tilecount`, `tilewidth`, `tileheight`, `columns`, `name`, 等。

#### 6.5.3 `:add_tile_layer(name, data, opacity, visible)`
- **说明**：添加 tilelayer。
- **参数**：`data` (table) 必须是行优先的 1D 数组，瓦片 id 通常 >= 1（0 表示空）。
- **返回**：`layer` 表

#### 6.5.4 `:add_object_layer(name, objects, opacity, visible)`
- **说明**：添加对象层，用于放置出生点、碰撞框、事件触发区等。
- **objects** 为对象数组，每个对象应包含 `x`, `y`, `width`, `height` 等字段。

#### 6.5.5 `:flatten_2d(map2d, firstgid)` / `:unflatten_1d(data, width, height, firstgid)`
- **说明**：Lua 2D 数组与 Tiled `data` 1D 数组之间的互转；`firstgid` 默认 1。

#### 6.5.6 `:export_string()`
- **说明**：将当前地图编码为 JSON 字符串。
- **返回**：`string`

#### 6.5.7 `:save(path)`
- **说明**：优先尝试使用 urho FileSystem 写入，否则 fallback 到标准 Lua `io.open`。
- **返回**：`bool`（是否成功）

#### 6.5.8 `TilemapBridge.load(path)`
- **说明**：从文件读取 JSON 并解析为 Lua table，再包装为 `TilemapBridge` 实例。
- **返回**：`TilemapBridge|nil`

#### 6.5.9 `TilemapBridge.from_layers(layerMap, tileWidth, tileHeight, tilesetImage)`
- **说明**：批量从多个 2D 层表快速构建桥接器。
- **参数**：`layerMap` = `{ layerName = 2Dgrid, ... }`
- **返回**：`TilemapBridge`

---

## 7. 完整代码示例

以下列出本技能全部 6 个 Lua 脚本的完整源码。每个文件均可直接复制使用，所有中文注释均已保留，便于二次开发与教学参考。

### 7.1 NoiseTerrain.lua

```lua
-- NoiseTerrain.lua
-- 程序化噪声地形生成器 for urhox (Urho3D/rbfx)
-- 内置 2D/3D Perlin Noise + Fractional Brownian Motion (fBm)
-- 提供纯 Lua 算法层 + 可选的 urhox Terrain/Image 桥接
--
-- 开源参考:
--   * RossKlein/Tiled-Perlin-Noise (Python/NumPy 分块渲染)
--   * max1220/lua-perlin (Lua 2D Perlin)
--   * Stefan Gustavson GLSL noise (维基经典实现)
--   * lumijiez/perlinsim (生物群系+树的结合)

local NoiseTerrain = {}
NoiseTerrain.__index = NoiseTerrain

-- ============================================================================
--  1) Internal Permutation Table (Perlin Noise Core)
-- ============================================================================
local function seed_random(seed)
    -- Linear Congruential Generator for deterministic noise permutation
    local a, c, m = 1103515245, 12345, 2^31
    local z = seed or 0
    return function()
        z = (a * z + c) % m
        return z / m
    end
end

local function build_permutation(seed)
    local p = {}
    for i = 0, 255 do p[i] = i end
    local rng = seed_random(seed)
    for i = 255, 1, -1 do
        local j = math.floor(rng() * (i + 1))
        p[i], p[j] = p[j], p[i]
    end
    local perm = {}
    for i = 0, 511 do perm[i] = p[i % 256] end
    return perm
end

-- Gradient vectors for 2D (8 directions like original Perlin optimization)
local grad2 = {
    {1,1}, {-1,1}, {1,-1}, {-1,-1},
    {1,0}, {-1,0}, {1,0}, {-1,0},
    {0,1}, {0,-1}, {0,1}, {0,-1}
}

-- 3D gradients (classic 12 edges of a cube)
local grad3 = {
    {1,1,0}, {-1,1,0}, {1,-1,0}, {-1,-1,0},
    {1,0,1}, {-1,0,1}, {1,0,-1}, {-1,0,-1},
    {0,1,1}, {0,-1,1}, {0,1,-1}, {0,-1,-1}
}

-- Fade function: 6t^5 - 15t^4 + 10t^3
local function fade(t)
    return t * t * t * (t * (t * 6 - 15) + 10)
end

local function lerp(a, b, t)
    return a + (b - a) * t
end

-- ============================================================================
--  2) 2D Perlin Noise
-- ============================================================================
function NoiseTerrain.perlin2d(x, y, perm)
    local X = math.floor(x) & 255
    local Y = math.floor(y) & 255
    x = x - math.floor(x)
    y = y - math.floor(y)
    local u = fade(x)
    local v = fade(y)

    local A  = perm[X] + Y
    local AA = perm[A]
    local AB = perm[A + 1]
    local B  = perm[X + 1] + Y
    local BA = perm[B]
    local BB = perm[B + 1]

    local function dot2(hash, dx, dy)
        local g = grad2[(hash % 12) + 1] -- Lua 1-based
        return dx * g[1] + dy * g[2]
    end

    return lerp(
        lerp(dot2(AA, x, y),     dot2(BA, x - 1, y),     u),
        lerp(dot2(AB, x, y - 1), dot2(BB, x - 1, y - 1), u),
        v
    )
end

-- ============================================================================
--  3) 3D Perlin Noise
-- ============================================================================
function NoiseTerrain.perlin3d(x, y, z, perm)
    local X = math.floor(x) & 255
    local Y = math.floor(y) & 255
    local Z = math.floor(z) & 255
    x = x - math.floor(x)
    y = y - math.floor(y)
    z = z - math.floor(z)
    local u = fade(x)
    local v = fade(y)
    local w = fade(z)

    local A   = perm[X] + Y
    local AA  = perm[A] + Z
    local AB  = perm[A + 1] + Z
    local B   = perm[X + 1] + Y
    local BA  = perm[B] + Z
    local BB  = perm[B + 1] + Z

    local function dot3(hash, dx, dy, dz)
        local g = grad3[(hash % 12) + 1]
        return dx * g[1] + dy * g[2] + dz * g[3]
    end

    return lerp(
        lerp(
            lerp(dot3(AA, x, y, z),     dot3(BA, x - 1, y, z),     u),
            lerp(dot3(AB, x, y - 1, z), dot3(BB, x - 1, y - 1, z), u),
            v
        ),
        lerp(
            lerp(dot3(AA + 1, x, y, z - 1),     dot3(BA + 1, x - 1, y, z - 1),     u),
            lerp(dot3(AB + 1, x, y - 1, z - 1), dot3(BB + 1, x - 1, y - 1, z - 1), u),
            v
        ),
        w
    )
end

-- ============================================================================
--  4) Fractal Brownian Motion (fBm)
-- ============================================================================
function NoiseTerrain.fbm2d(x, y, config)
    config = config or {}
    local octaves   = config.octaves or 4
    local lacunarity= config.lacunarity or 2.0
    local gain      = config.gain or 0.5
    local scale     = config.scale or 1.0
    local seed      = config.seed or 1337
    local perm      = build_permutation(seed)

    local total = 0
    local amplitude = 1
    local frequency = scale
    local maxValue = 0

    for i = 1, octaves do
        total = total + NoiseTerrain.perlin2d(x * frequency, y * frequency, perm) * amplitude
        maxValue = maxValue + amplitude
        amplitude = amplitude * gain
        frequency = frequency * lacunarity
    end

    return total / maxValue
end

function NoiseTerrain.fbm3d(x, y, z, config)
    config = config or {}
    local octaves   = config.octaves or 4
    local lacunarity= config.lacunarity or 2.0
    local gain      = config.gain or 0.5
    local scale     = config.scale or 1.0
    local seed      = config.seed or 1337
    local perm      = build_permutation(seed)

    local total = 0
    local amplitude = 1
    local frequency = scale
    local maxValue = 0

    for i = 1, octaves do
        total = total + NoiseTerrain.perlin3d(x * frequency, y * frequency, z * frequency, perm) * amplitude
        maxValue = maxValue + amplitude
        amplitude = amplitude * gain
        frequency = frequency * lacunarity
    end

    return total / maxValue
end

-- ============================================================================
--  5) Domain Warping ( for more interesting terrain )
-- ============================================================================
function NoiseTerrain.domain_warp2d(x, y, config)
    config = config or {}
    local warpScale = config.warpScale or 0.5
    local warpAmp   = config.warpAmp or 4.0
    local seed      = config.seed or 1337
    local perm      = build_permutation(seed)

    local qx = NoiseTerrain.perlin2d(x + 0.0, y + 0.0, perm)
    local qy = NoiseTerrain.perlin2d(x + 5.2, y + 1.3, perm)

    local rx = NoiseTerrain.perlin2d(x + warpScale * qx + 1.7, y + warpScale * qy + 9.2, perm)
    local ry = NoiseTerrain.perlin2d(x + warpScale * qx + 8.3, y + warpScale * qy + 2.8, perm)

    local wx = x + warpAmp * rx
    local wy = y + warpAmp * ry

    return NoiseTerrain.fbm2d(wx, wy, config)
end

-- ============================================================================
--  6) Erosion / Ridge / Terrace Post-Processing (optional height transforms)
-- ============================================================================
function NoiseTerrain.ridge_noise(value, config)
    config = config or {}
    local offset = config.ridgeOffset or 1.0
    return offset - math.abs(value)
end

-- (typo fixed below with compatibility wrapper)
function NoiseTerrain.terrace(value, steps)
    steps = steps or 8
    local t = math.floor(value * steps) / steps
    return t
end

-- ============================================================================
--  7) Heightmap Generation ( pure Lua 2D array )
-- ============================================================================
function NoiseTerrain.generate_heightmap(width, height, config)
    config = config or {}
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            local nx = (x - 1) / width
            local ny = (y - 1) / height
            local h = NoiseTerrain.fbm2d(nx, ny, config)

            -- optional ridged terrain
            if config.ridged then
                h = NoiseTerrain.ridge_noise(h, config)
            end
            -- optional terrace
            if config.terraceSteps then
                h = NoiseTerrain.terrace(h, config.terraceSteps)
            end
            -- optional domain warp
            if config.domainWarp then
                h = NoiseTerrain.domain_warp2d(nx, ny, config)
            end

            -- normalize to 0..1 if ridged might shift range
            if config.normalize then
                h = (h + 1) * 0.5
                if h < 0 then h = 0 end
                if h > 1 then h = 1 end
            end

            map[y][x] = h
        end
    end
    return map
end

-- ============================================================================
--  8) urhox Image / Texture Bridge
-- ============================================================================
function NoiseTerrain.to_image(heightmap, imageOrCreate)
    local width = #heightmap[1]
    local height = #heightmap

    local Image = _G.Image or (_G.Urho3D and _G.Urho3D.Image)
    local img = imageOrCreate
    if not img and Image then
        img = Image:new()
        img:SetSize(width, height, 1, 4) -- 4 components (RGBA)
    end

    if not img then
        error("NoiseTerrain.to_image: no Image class available and no imageOrCreate provided.")
    end

    for y = 0, height - 1 do
        for x = 0, width - 1 do
            local v = heightmap[y + 1][x + 1]
            local c = math.floor(v * 255)
            if c < 0 then c = 0 end
            if c > 255 then c = 255 end
            img:SetPixel(x, y, Color(c / 255.0, c / 255.0, c / 255.0, 1.0))
        end
    end

    return img
end

-- ============================================================================
--  9) Terrain Shape Helper (返回顶点网格高度值，用于自定义 Mesh/TerrainPatch)
-- ============================================================================
function NoiseTerrain.generate_mesh_heights(width, depth, spacing, config)
    config = config or {}
    local verts = {}
    for z = 0, depth - 1 do
        for x = 0, width - 1 do
            local nx = x * spacing
            local nz = z * spacing
            local h = NoiseTerrain.fbm2d(nx, nz, config)
            if config.heightMultiplier then
                h = h * config.heightMultiplier
            end
            table.insert(verts, { x = x, y = h, z = z, height = h })
        end
    end
    return verts, width, depth
end

-- ============================================================================
-- 10) Color Map from Height / Slope (简易的生物群系前着色)
-- ============================================================================
function NoiseTerrain.colorize_heightmap(heightmap, colors)
    colors = colors or {
        water = {0.1, 0.3, 0.6},
        sand  = {0.9, 0.8, 0.5},
        grass = {0.2, 0.7, 0.2},
        rock  = {0.5, 0.5, 0.5},
        snow  = {1.0, 1.0, 1.0}
    }
    local width = #heightmap[1]
    local height = #heightmap
    local cmap = {}
    for y = 1, height do
        cmap[y] = {}
        for x = 1, width do
            local h = heightmap[y][x]
            local c
            if h < 0.25 then c = colors.water
            elseif h < 0.35 then c = colors.sand
            elseif h < 0.65 then c = colors.grass
            elseif h < 0.85 then c = colors.rock
            else c = colors.snow end
            cmap[y][x] = c
        end
    end
    return cmap
end

return NoiseTerrain
```

### 7.2 WFCGenerator.lua

```lua
-- WFCGenerator.lua
-- 基于 Wave Function Collapse (波函数坍缩) 的 2D 瓦片地图生成器
-- 适配 urhox Lua 环境，纯算法实现，不依赖特定引擎 API（除可选 Tilemap 桥接）
--
-- 开源参考:
--   * mxgmn/WaveFunctionCollapse (原始算法原型，C#)
--   * keijiro/WaveFunctionCollapse (Unity/C# 实现)
--   * mathiscode/wfc-godot (Godot 4 适配)
--   * selfsame/harmony (基于约束的 WFC Lua 简化实现)

local WFCGenerator = {}
WFCGenerator.__index = WFCGenerator

-- ============================================================================
-- 1) Utility: 2D Grid Helpers
-- ============================================================================
local function new_grid(w, h, default)
    local g = {}
    for y = 1, h do
        g[y] = {}
        for x = 1, w do
            g[y][x] = default and (type(default) == "table" and {} or default) or nil
        end
    end
    return g
end

local function copy_list(t)
    local c = {}
    for i, v in ipairs(t) do c[i] = v end
    return c
end

local function set_size(s)
    local n = 0
    for _ in pairs(s) do n = n + 1 end
    return n
end

local DIRS = {
    { name = "up",    dx =  0, dy = -1, opp = 2 },
    { name = "right", dx =  1, dy =  0, opp = 3 },
    { name = "down",  dx =  0, dy =  1, opp = 0 },
    { name = "left",  dx = -1, dy =  0, opp = 1 },
}

function WFCGenerator.new(config)
    config = config or {}
    local self = setmetatable({}, WFCGenerator)
    self.width  = config.width or 32
    self.height = config.height or 32
    self.periodicInput = config.periodicInput ~= false
    self.periodicOutput = config.periodicOutput == true
    self.backtrack = config.backtrack ~= false
    self.maxBacktracks = config.maxBacktracks or 1000
    self.seed = config.seed or os.time()
    math.randomseed(self.seed)

    self.tiles = {}
    self.tileCount = 0
    self.adjacency = {}
    self.compatibility = {}

    self.wave = nil
    self.entropy = nil
    self.stack = {}
    return self
end

function WFCGenerator:add_tile(tile)
    table.insert(self.tiles, tile)
    self.tileCount = self.tileCount + 1
    tile.index = self.tileCount
    tile.weight = tile.weight or 1.0
    if not tile.sockets then tile.sockets = {} end
    return tile.index
end

function WFCGenerator:build_adjacency()
    for d = 1, 4 do
        self.adjacency[d] = {}
        for i = 1, self.tileCount do
            self.adjacency[d][i] = {}
            for j = 1, self.tileCount do
                self.adjacency[d][i][j] = false
            end
        end
    end

    for i = 1, self.tileCount do
        local ti = self.tiles[i]
        for j = 1, self.tileCount do
            local tj = self.tiles[j]
            for d = 1, 4 do
                local dir = DIRS[d]
                local opp = DIRS[dir.opp + 1]
                if ti.sockets[dir.name] and tj.sockets[opp.name] then
                    if ti.sockets[dir.name] == tj.sockets[opp.name] then
                        self.adjacency[d][i][j] = true
                    end
                end
            end
        end
    end
end

function WFCGenerator:precompute_compatibility()
    self.compatibility = {}
    for d = 1, 4 do
        self.compatibility[d] = {}
        for t = 1, self.tileCount do
            local count = 0
            for u = 1, self.tileCount do
                if self.adjacency[d][t][u] then count = count + 1 end
            end
            self.compatibility[d][t] = count
        end
    end
end

function WFCGenerator:initialize_wave()
    self.wave = new_grid(self.width, self.height)
    self.entropy = new_grid(self.width, self.height, 0)
    for y = 1, self.height do
        for x = 1, self.width do
            local possible = {}
            for t = 1, self.tileCount do possible[t] = true end
            self.wave[y][x] = possible
        end
    end
    self:recompute_all_entropy()
end

function WFCGenerator:recompute_all_entropy()
    for y = 1, self.height do
        for x = 1, self.width do
            self.entropy[y][x] = self:compute_entropy(x, y)
        end
    end
end

function WFCGenerator:compute_entropy(x, y)
    local possible = self.wave[y][x]
    local count = 0
    local weightSum = 0
    local weightLogSum = 0
    for t = 1, self.tileCount do
        if possible[t] then
            local w = self.tiles[t].weight
            count = count + 1
            weightSum = weightSum + w
            weightLogSum = weightLogSum + w * math.log(w)
        end
    end
    if count == 0 then return -1 end
    if count == 1 then return 0 end
    local ent = math.log(weightSum) - (weightLogSum / weightSum)
    ent = ent + math.random() * 0.0001
    return ent
end

function WFCGenerator:observe()
    local minEnt = math.huge
    local candidates = {}
    for y = 1, self.height do
        for x = 1, self.width do
            local ent = self.entropy[y][x]
            if ent > 0 and ent < minEnt then
                minEnt = ent
                candidates = { {x = x, y = y} }
            elseif ent > 0 and math.abs(ent - minEnt) < 0.00001 then
                table.insert(candidates, {x = x, y = y})
            end
        end
    end
    if #candidates == 0 then return true end

    local cell = candidates[math.random(1, #candidates)]
    local cx, cy = cell.x, cell.y
    local possible = self.wave[cy][cx]

    local weightSum = 0
    for t = 1, self.tileCount do
        if possible[t] then weightSum = weightSum + self.tiles[t].weight end
    end
    if weightSum <= 0 then return false end

    local r = math.random() * weightSum
    local chosen = nil
    for t = 1, self.tileCount do
        if possible[t] then
            r = r - self.tiles[t].weight
            if r <= 0 then chosen = t; break end
        end
    end
    if not chosen then chosen = self.tileCount end

    if self.backtrack then
        table.insert(self.stack, { x = cx, y = cy, wave = self:copy_wave(), entropy = self:copy_entropy() })
    end

    for t = 1, self.tileCount do possible[t] = (t == chosen) end
    self.entropy[cy][cx] = 0

    local ok = self:propagate(cx, cy)
    if not ok then return false end

    if self.backtrack and #self.stack > self.maxBacktracks then
        table.remove(self.stack, 1)
    end
    return nil
end

function WFCGenerator:copy_wave()
    local c = new_grid(self.width, self.height)
    for y = 1, self.height do
        for x = 1, self.width do
            local s = {}
            for t = 1, self.tileCount do s[t] = self.wave[y][x][t] end
            c[y][x] = s
        end
    end
    return c
end

function WFCGenerator:copy_entropy()
    local c = new_grid(self.width, self.height, 0)
    for y = 1, self.height do
        for x = 1, self.width do
            c[y][x] = self.entropy[y][x]
        end
    end
    return c
end

function WFCGenerator:restore_state(snapshot)
    self.wave = snapshot.wave
    self.entropy = snapshot.entropy
end

function WFCGenerator:propagate(startX, startY)
    local queue = {}
    table.insert(queue, {x = startX, y = startY})
    local head = 1
    while head <= #queue do
        local cur = queue[head]
        head = head + 1
        local cx, cy = cur.x, cur.y
        for d = 1, 4 do
            local dir = DIRS[d]
            local nx = cx + dir.dx
            local ny = cy + dir.dy
            if self.periodicOutput then
                nx = ((nx - 1) % self.width) + 1
                ny = ((ny - 1) % self.height) + 1
            elseif nx < 1 or nx > self.width or ny < 1 or ny > self.height then
                goto next_dir
            end
            local currentPossible = self.wave[cy][cx]
            local neighborPossible = self.wave[ny][nx]
            local changed = false
            for nt = 1, self.tileCount do
                if neighborPossible[nt] then
                    local allowed = false
                    for ct = 1, self.tileCount do
                        if currentPossible[ct] and self.adjacency[d][ct][nt] then
                            allowed = true; break
                        end
                    end
                    if not allowed then
                        neighborPossible[nt] = false
                        changed = true
                    end
                end
            end
            if changed then
                local ent = self:compute_entropy(nx, ny)
                if ent < 0 then return false end
                self.entropy[ny][nx] = ent
                table.insert(queue, {x = nx, y = ny})
            end
            ::next_dir::
        end
    end
    return true
end

function WFCGenerator:generate()
    if self.tileCount == 0 then error("WFCGenerator: no tiles defined. Call add_tile() first.") end
    if not self.adjacency[1] then self:build_adjacency() end
    self:precompute_compatibility()
    self:initialize_wave()
    local attempts = 0
    local maxAttempts = self.maxBacktracks * 2 + 1000
    while true do
        attempts = attempts + 1
        if attempts > maxAttempts then error("WFCGenerator: generation failed after max attempts.") end
        local result = self:observe()
        if result == true then return true
        elseif result == false then
            if self.backtrack and #self.stack > 0 then
                local snapshot = table.remove(self.stack)
                self:restore_state(snapshot)
            else
                error("WFCGenerator: contradiction encountered and backtracking disabled or exhausted.")
            end
        end
    end
end

function WFCGenerator:get_output()
    local out = new_grid(self.width, self.height)
    for y = 1, self.height do
        for x = 1, self.width do
            local possible = self.wave[y][x]
            local chosen = nil
            for t = 1, self.tileCount do
                if possible[t] then chosen = self.tiles[t]; break end
            end
            out[y][x] = chosen
        end
    end
    return out
end

function WFCGenerator:get_output_ids()
    local out = new_grid(self.width, self.height, -1)
    for y = 1, self.height do
        for x = 1, self.width do
            local possible = self.wave[y][x]
            for t = 1, self.tileCount do
                if possible[t] then out[y][x] = t; break end
            end
        end
    end
    return out
end

function WFCGenerator.extract_patterns(sampleMap, N, periodic)
    N = N or 2
    periodic = periodic ~= false
    local patterns = {}
    local patternHash = {}
    local h = #sampleMap
    local w = #sampleMap[1]
    for y = 1, h do
        for x = 1, w do
            local pat = {}
            local str = ""
            for dy = 0, N - 1 do
                local row = {}
                for dx = 0, N - 1 do
                    local sx = x + dx
                    local sy = y + dy
                    if periodic then
                        sx = ((sx - 1) % w) + 1
                        sy = ((sy - 1) % h) + 1
                    end
                    local v = -1
                    if sx >= 1 and sx <= w and sy >= 1 and sy <= h then v = sampleMap[sy][sx] end
                    row[dx + 1] = v
                    str = str .. tostring(v) .. ","
                end
                pat[dy + 1] = row
            end
            if not patternHash[str] then
                patternHash[str] = true
                table.insert(patterns, pat)
            end
        end
    end
    return patterns
end

function WFCGenerator.patterns_to_tiles(patterns)
    local tiles = {}
    for i, pat in ipairs(patterns) do
        local tile = {
            id = "pat_" .. i,
            data = { pattern = pat },
            sockets = {}
        }
        table.insert(tiles, tile)
    end
    return tiles
end

return WFCGenerator
```

### 7.3 CaveGenerator.lua

```lua
-- CaveGenerator.lua
-- 基于 Cellular Automata (元胞自动机) 的洞穴/地下城生成器
-- 支持随机初始化、平滑迭代、房间隔离、隧道连接、多楼层
--
-- 开源参考:
--   * Sebastian Lague - Procedural Cave Generation (Unity/C#，元胞自动机经典教程)
--   * abitawake/Godot Cellular Automata Caves (Godot 4 GDScript 实现)
--   * LeoMarques101/ProceduralCaveGeneration (Open Tibia Lua 洞穴生成)
--   * bronsonzgeb/Procedural-Generation-With-Cellular-Automata (Unity 实现+可交互演示)

local CaveGenerator = {}
CaveGenerator.__index = CaveGenerator

CaveGenerator.WALL  = 1
CaveGenerator.FLOOR = 0

function CaveGenerator.new(config)
    config = config or {}
    local self = setmetatable({}, CaveGenerator)
    self.width  = config.width or 80
    self.height = config.height or 50
    self.seed   = config.seed or os.time()
    self.randomFillPercent = config.randomFillPercent or 48
    self.smoothIterations  = config.smoothIterations or 5
    self.wallThresholdSize = config.wallThresholdSize or 50
    self.roomThresholdSize = config.roomThresholdSize or 50
    self.neighborWallLimit = config.neighborWallLimit or 4
    self.borderSize        = config.borderSize or 1
    self.connectRooms      = config.connectRooms ~= false
    self.carveTunnels      = config.carveTunnels ~= false
    self.extraCorridorWidth= config.extraCorridorWidth or 0
    math.randomseed(self.seed)
    self.map = {}
    self.rooms = {}
    return self
end

function CaveGenerator:random_fill()
    for y = 1, self.height do
        self.map[y] = {}
        for x = 1, self.width do
            if x <= self.borderSize or x > self.width - self.borderSize
               or y <= self.borderSize or y > self.height - self.borderSize then
                self.map[y][x] = CaveGenerator.WALL
            else
                self.map[y][x] = (math.random(0, 100) < self.randomFillPercent)
                                   and CaveGenerator.WALL or CaveGenerator.FLOOR
            end
        end
    end
    self.rooms = {}
end

function CaveGenerator:smooth_map()
    local newMap = {}
    for y = 1, self.height do
        newMap[y] = {}
        for x = 1, self.width do
            local neighborWalls = self:get_neighbor_wall_count(x, y)
            if neighborWalls > self.neighborWallLimit then
                newMap[y][x] = CaveGenerator.WALL
            elseif neighborWalls < self.neighborWallLimit then
                newMap[y][x] = CaveGenerator.FLOOR
            else
                newMap[y][x] = self.map[y][x]
            end
        end
    end
    self.map = newMap
end

function CaveGenerator:get_neighbor_wall_count(x, y)
    local count = 0
    for dy = -1, 1 do
        for dx = -1, 1 do
            if dx == 0 and dy == 0 then goto continue end
            local nx, ny = x + dx, y + dy
            if nx < 1 or nx > self.width or ny < 1 or ny > self.height then
                count = count + 1
            elseif self.map[ny][nx] == CaveGenerator.WALL then
                count = count + 1
            end
            ::continue::
        end
    end
    return count
end

function CaveGenerator:get_regions(tileType)
    local regions = {}
    local visited = {}
    for y = 1, self.height do
        visited[y] = {}
        for x = 1, self.width do
            visited[y][x] = false
        end
    end
    for y = 1, self.height do
        for x = 1, self.width do
            if not visited[y][x] and self.map[y][x] == tileType then
                local region = self:flood_fill(x, y, tileType, visited)
                table.insert(regions, region)
            end
        end
    end
    return regions
end

function CaveGenerator:flood_fill(startX, startY, tileType, visited)
    local region = {}
    local stack = { {x = startX, y = startY} }
    visited[startY][startX] = true
    while #stack > 0 do
        local cell = table.remove(stack)
        table.insert(region, cell)
        for dy = -1, 1 do
            for dx = -1, 1 do
                if math.abs(dx) + math.abs(dy) ~= 1 then goto continue end
                local nx, ny = cell.x + dx, cell.y + dy
                if nx >= 1 and nx <= self.width and ny >= 1 and ny <= self.height then
                    if not visited[ny][nx] and self.map[ny][nx] == tileType then
                        visited[ny][nx] = true
                        table.insert(stack, {x = nx, y = ny})
                    end
                end
                ::continue::
            end
        end
    end
    return region
end

function CaveGenerator:process_map()
    local wallRegions = self:get_regions(CaveGenerator.WALL)
    for _, region in ipairs(wallRegions) do
        if #region < self.wallThresholdSize then
            for _, cell in ipairs(region) do
                self.map[cell.y][cell.x] = CaveGenerator.FLOOR
            end
        end
    end
    local roomRegions = self:get_regions(CaveGenerator.FLOOR)
    local survivingRooms = {}
    for _, region in ipairs(roomRegions) do
        if #region >= self.roomThresholdSize then
            table.insert(survivingRooms, region)
        else
            for _, cell in ipairs(region) do
                self.map[cell.y][cell.x] = CaveGenerator.WALL
            end
        end
    end
    table.sort(survivingRooms, function(a, b) return #a > #b end)
    self.rooms = survivingRooms
end

function CaveGenerator:connect_closest_rooms()
    if #self.rooms <= 1 then return end
    for _, room in ipairs(self.rooms) do
        room.edgeTiles = self:get_edge_tiles(room)
        room.connected = false
    end
    local roomA = self.rooms[1]
    while true do
        local bestDistance = math.huge
        local bestTileA, bestTileB = nil, nil
        local bestRoomA, bestRoomB = nil, nil
        for _, roomB in ipairs(self.rooms) do
            if roomA == roomB then goto skip end
            if roomB.connected then goto skip end
            for _, tileA in ipairs(roomA.edgeTiles) do
                for _, tileB in ipairs(roomB.edgeTiles) do
                    local dx = tileA.x - tileB.x
                    local dy = tileA.y - tileB.y
                    local dist = dx * dx + dy * dy
                    if dist < bestDistance then
                        bestDistance = dist
                        bestTileA = tileA
                        bestTileB = tileB
                        bestRoomA = roomA
                        bestRoomB = roomB
                    end
                end
            end
            ::skip::
        end
        if bestRoomA and bestRoomB then
            self:create_tunnel(bestTileA, bestTileB)
            bestRoomA.connected = true
            bestRoomB.connected = true
            roomA = bestRoomB
        else
            break
        end
    end
    for i = 2, #self.rooms do
        if not self.rooms[i].connected then
            self:create_tunnel(self.rooms[1].edgeTiles[1], self.rooms[i].edgeTiles[1])
            self.rooms[i].connected = true
        end
    end
end

function CaveGenerator:get_edge_tiles(room)
    local edges = {}
    for _, tile in ipairs(room) do
        for dy = -1, 1 do
            for dx = -1, 1 do
                if dx == 0 and dy == 0 then goto continue end
                local nx, ny = tile.x + dx, tile.y + dy
                if nx >= 1 and nx <= self.width and ny >= 1 and ny <= self.height then
                    if self.map[ny][nx] == CaveGenerator.WALL then
                        table.insert(edges, tile)
                        goto next_tile
                    end
                end
                ::continue::
            end
        end
        ::next_tile::
    end
    return edges
end

function CaveGenerator:create_tunnel(tileA, tileB)
    local x, y = tileA.x, tileA.y
    local targetX, targetY = tileB.x, tileB.y
    while x ~= targetX or y ~= targetY do
        if math.random() < 0.5 then
            if x ~= targetX then x = x + (targetX > x and 1 or -1) end
        else
            if y ~= targetY then y = y + (targetY > y and 1 or -1) end
        end
        self:carve_circle(x, y, self.extraCorridorWidth)
    end
end

function CaveGenerator:carve_circle(cx, cy, radius)
    radius = radius or 0
    for y = cy - radius, cy + radius do
        for x = cx - radius, cx + radius do
            if (x - cx)^2 + (y - cy)^2 <= radius^2 + 0.5 then
                if x >= 1 and x <= self.width and y >= 1 and y <= self.height then
                    self.map[y][x] = CaveGenerator.FLOOR
                end
            end
        end
    end
end

function CaveGenerator:generate()
    self:random_fill()
    for i = 1, self.smoothIterations do self:smooth_map() end
    self:process_map()
    if self.connectRooms then self:connect_closest_rooms() end
    return self.map, self.rooms
end

function CaveGenerator:find_spawn_point()
    if #self.rooms == 0 then return math.floor(self.width / 2), math.floor(self.height / 2) end
    local mainRoom = self.rooms[1]
    local cx, cy = 0, 0
    for _, t in ipairs(mainRoom) do cx = cx + t.x; cy = cy + t.y end
    return math.floor(cx / #mainRoom), math.floor(cy / #mainRoom)
end

function CaveGenerator:to_tilemap(wallId, floorId)
    wallId = wallId or 1
    floorId = floorId or 0
    local tiles = {}
    for y = 1, self.height do
        tiles[y] = {}
        for x = 1, self.width do
            tiles[y][x] = (self.map[y][x] == CaveGenerator.WALL) and wallId or floorId
        end
    end
    return tiles
end

return CaveGenerator
```

### 7.4 BiomeSystem.lua

```lua
-- BiomeSystem.lua
-- 生物群系系统 for urhox (Urho3D/rbfx)
-- 基于温度/湿度/海拔/特殊噪声的多维生物群系混合与过渡
-- 提供纯 Lua 算法层 + 可选的材质/植被/音效绑定
--
-- 开源参考:
--   * neki-dev/gen-biome (TypeScript 2D 生物群系生成库)
--   * gegamongy/BiomeGenerator (着色器 biome weight system)
--   * lumijiez/perlinsim (Java Processing - 树分布、雪地高山等)
--   * Cubitect/cubiomes (Minecraft 生物群系生成算法解析)

local BiomeSystem = {}
BiomeSystem.__index = BiomeSystem

local function fade(t)  return t * t * t * (t * (t * 6 - 15) + 10) end
local function lerp(a,b,t) return a + (b - a) * t end

local Grad2 = { {1,1},{-1,1},{1,-1},{-1,-1},{1,0},{-1,0},{0,1},{0,-1} }

local function build_perm(seed)
    local p, rng = {}, (function()
        local a, c, m, z = 1103515245, 12345, 2^31, seed or 0
        return function()
            z = (a * z + c) % m
            return z / m
        end
    end)()
    for i = 0, 255 do p[i] = i end
    for i = 255, 1, -1 do
        local j = math.floor(rng() * (i + 1))
        p[i], p[j] = p[j], p[i]
    end
    local perm = {}
    for i = 0, 511 do perm[i] = p[i % 256] end
    return perm
end

local function dot2(hash, x, y, perm)
    local g = Grad2[(hash % 8) + 1]
    return x * g[1] + y * g[2]
end

local function perlin2d(x, y, perm)
    local X = math.floor(x) & 255
    local Y = math.floor(y) & 255
    x, y = x - math.floor(x), y - math.floor(y)
    local u, v = fade(x), fade(y)
    local A  = perm[X] + Y
    local AA, AB = perm[A], perm[A + 1]
    local B  = perm[X + 1] + Y
    local BA, BB = perm[B], perm[B + 1]
    return lerp(
        lerp(dot2(AA, x, y, perm), dot2(BA, x - 1, y, perm), u),
        lerp(dot2(AB, x, y - 1, perm), dot2(BB, x - 1, y - 1, perm), u),
        v
    )
end

local function fbm2d(x, y, perm, octaves, gain, lacunarity)
    octaves = octaves or 4; gain = gain or 0.5; lacunarity = lacunarity or 2.0
    local total, amp, freq, maxv = 0, 1, 1, 0
    for i = 1, octaves do
        total = total + perlin2d(x * freq, y * freq, perm) * amp
        maxv = maxv + amp
        amp = amp * gain
        freq = freq * lacunarity
    end
    return total / maxv
end

function BiomeSystem.new(config)
    config = config or {}
    local self = setmetatable({}, BiomeSystem)
    self.seed = config.seed or 1337
    self.width = config.width or 256
    self.height = config.height or 256
    self.tempConfig  = config.temperature or { scale = 2.0, octaves = 4, gain = 0.5, lacunarity = 2.0 }
    self.humidConfig = config.humidity    or { scale = 2.5, octaves = 4, gain = 0.5, lacunarity = 2.0 }
    self.elevConfig  = config.elevation   or { scale = 1.0, octaves = 6, gain = 0.5, lacunarity = 2.0 }
    self.specConfig  = config.special     or { scale = 4.0, octaves = 3, gain = 0.5, lacunarity = 2.0 }
    self.blendWidth = config.blendWidth or 0.05
    self.biomes = {}
    self.perm = build_perm(self.seed)
    return self
end

function BiomeSystem:add_biome(def)
    table.insert(self.biomes, def)
end

function BiomeSystem:sample_dimensions(wx, wy)
    local t  = (fbm2d(wx, wy, self.perm, self.tempConfig.octaves,  self.tempConfig.gain,  self.tempConfig.lacunarity)  * 0.5 + 0.5)
    local h  = (fbm2d(wx + 1000, wy + 1000, self.perm, self.humidConfig.octaves, self.humidConfig.gain, self.humidConfig.lacunarity) * 0.5 + 0.5)
    local e  = (fbm2d(wx + 2000, wy, self.perm, self.elevConfig.octaves,  self.elevConfig.gain,  self.elevConfig.lacunarity)  * 0.5 + 0.5)
    local s  = (fbm2d(wx, wy + 2000, self.perm, self.specConfig.octaves,  self.specConfig.gain,  self.specConfig.lacunarity)  * 0.5 + 0.5)

    t = (t - 0.5) * self.tempConfig.scale + 0.5
    h = (h - 0.5) * self.humidConfig.scale + 0.5
    e = (e - 0.5) * self.elevConfig.scale  + 0.5
    s = (s - 0.5) * self.specConfig.scale  + 0.5

    local function clamp01(v) if v < 0 then return 0 elseif v > 1 then return 1 else return v end end
    return clamp01(t), clamp01(h), clamp01(e), clamp01(s)
end

local function fitness(value, range)
    if not range then return 1.0 end
    local min = range.min or 0.0
    local max = range.max or 1.0
    local weight = range.weight or 1.0
    if value < min or value > max then return 0.0 end
    local width = 0.05
    local f = 1.0
    if value < min + width then f = (value - min) / width
    elseif value > max - width then f = (max - value) / width end
    return math.max(0, math.min(1, f)) * weight
end

function BiomeSystem:compute_fitness(biome, temp, humid, elev, special)
    local ft = fitness(temp,  biome.temperature)
    local fh = fitness(humid, biome.humidity)
    local fe = fitness(elev,  biome.elevation)
    local fs = fitness(special,biome.special)
    return ft * fh * fe * fs
end

function BiomeSystem:generate(options)
    options = options or {}
    local w = options.width or self.width
    local h = options.height or self.height
    local biomeMap = {}
    local weightMap = {}
    local detailMap = {}
    for y = 1, h do
        biomeMap[y] = {}
        weightMap[y] = {}
        detailMap[y] = {}
        for x = 1, w do
            local nx = x / w
            local ny = y / h
            local temp, humid, elev, special = self:sample_dimensions(nx, ny)
            local bestBiome, bestScore = nil, -1
            local weights = {}
            local totalWeight = 0
            for _, biome in ipairs(self.biomes) do
                local score = self:compute_fitness(biome, temp, humid, elev, special)
                weights[biome.id] = score
                totalWeight = totalWeight + score
                if score > bestScore then bestScore = score; bestBiome = biome end
            end
            if totalWeight > 0 then
                for k, v in pairs(weights) do weights[k] = v / totalWeight end
            else
                if #self.biomes > 0 then
                    weights[self.biomes[1].id] = 1.0
                    bestBiome = self.biomes[1]
                    bestScore = 1.0
                end
            end
            biomeMap[y][x] = bestBiome
            weightMap[y][x] = weights
            detailMap[y][x] = { temperature = temp, humidity = humid, elevation = elev, special = special, bestScore = bestScore }
        end
    end
    return { biomeMap = biomeMap, weightMap = weightMap, detailMap = detailMap, width = w, height = h }
end

function BiomeSystem:generate_color_map(result)
    local cmap = {}
    for y = 1, result.height do
        cmap[y] = {}
        for x = 1, result.width do
            local r, g, b = 0, 0, 0
            local weights = result.weightMap[y][x]
            for _, biome in ipairs(self.biomes) do
                local w = weights[biome.id] or 0
                local c = biome.color or { r = 1, g = 1, b = 1 }
                r = r + c.r * w; g = g + c.g * w; b = b + c.b * w
            end
            cmap[y][x] = { r = math.min(1, math.max(0, r)), g = math.min(1, math.max(0, g)), b = math.min(1, math.max(0, b)) }
        end
    end
    return cmap
end

function BiomeSystem:generate_tile_map(result)
    local tmap = {}
    for y = 1, result.height do
        tmap[y] = {}
        for x = 1, result.width do
            local biome = result.biomeMap[y][x]
            tmap[y][x] = biome and (biome.tileId or 0) or 0
        end
    end
    return tmap
end

function BiomeSystem:voronoi_sharpen(result, strength)
    strength = strength or 1.0
    local newBiomeMap = {}
    for y = 1, result.height do
        newBiomeMap[y] = {}
        for x = 1, result.width do
            local weights = result.weightMap[y][x]
            local bestId, bestW = nil, -1
            for _, biome in ipairs(self.biomes) do
                local w = (weights[biome.id] or 0) ^ strength
                if w > bestW then bestW = w; bestId = biome.id end
            end
            for _, b in ipairs(self.biomes) do
                if b.id == bestId then newBiomeMap[y][x] = b; break end
            end
        end
    end
    result.biomeMap = newBiomeMap
    return result
end

function BiomeSystem.presets()
    return {
        { id = "ocean", name = "海洋", temperature = { min = 0.0, max = 1.0 }, humidity = { min = 0.0, max = 1.0 }, elevation = { min = 0.0, max = 0.25 }, color = { r = 0.1, g = 0.3, b = 0.6 }, tileId = 1, vegetationDensity = 0.0 },
        { id = "beach", name = "沙滩", temperature = { min = 0.3, max = 1.0 }, humidity = { min = 0.0, max = 1.0 }, elevation = { min = 0.25, max = 0.32 }, color = { r = 0.9, g = 0.8, b = 0.5 }, tileId = 2, vegetationDensity = 0.0 },
        { id = "grassland", name = "草原", temperature = { min = 0.3, max = 0.7 }, humidity = { min = 0.2, max = 0.6 }, elevation = { min = 0.32, max = 0.65 }, color = { r = 0.2, g = 0.7, b = 0.2 }, tileId = 3, vegetationDensity = 0.3 },
        { id = "forest", name = "森林", temperature = { min = 0.2, max = 0.6 }, humidity = { min = 0.5, max = 1.0 }, elevation = { min = 0.35, max = 0.7 }, color = { r = 0.05, g = 0.5, b = 0.1 }, tileId = 4, vegetationDensity = 0.8 },
        { id = "desert", name = "沙漠", temperature = { min = 0.6, max = 1.0 }, humidity = { min = 0.0, max = 0.3 }, elevation = { min = 0.3, max = 0.6 }, color = { r = 0.9, g = 0.7, b = 0.3 }, tileId = 5, vegetationDensity = 0.05 },
        { id = "mountain", name = "山地", temperature = { min = 0.0, max = 1.0 }, humidity = { min = 0.0, max = 1.0 }, elevation = { min = 0.65, max = 0.85 }, color = { r = 0.5, g = 0.5, b = 0.5 }, tileId = 6, vegetationDensity = 0.1 },
        { id = "snow", name = "雪原", temperature = { min = 0.0, max = 0.3 }, humidity = { min = 0.0, max = 1.0 }, elevation = { min = 0.75, max = 1.0 }, color = { r = 1.0, g = 1.0, b = 1.0 }, tileId = 7, vegetationDensity = 0.0 },
        { id = "volcano", name = "火山", temperature = { min = 0.7, max = 1.0 }, humidity = { min = 0.0, max = 0.4 }, elevation = { min = 0.7, max = 1.0 }, special = { min = 0.6, max = 1.0 }, color = { r = 0.3, g = 0.1, b = 0.1 }, tileId = 8, vegetationDensity = 0.0 }
    }
end

return BiomeSystem
```

### 7.5 TilemapBridge.lua

```lua
-- TilemapBridge.lua
-- Tiled Map Editor JSON 格式桥接器 for urhox (Urho3D/rbfx)
-- 支持导出/导入 Tiled 的 Orthogonal/Isometric 地图，layer + tileset 基础信息
--
-- 开源参考:
--   * mapeditor/tiled (官方项目，JSON 格式规范)
--   * baylej/tmx (C TMX 解析库)
--   * kikito/middleclass (Lua OOP 风格参考)

local TilemapBridge = {}
TilemapBridge.__index = TilemapBridge

function TilemapBridge.new(config)
    config = config or {}
    local self = setmetatable({}, TilemapBridge)
    self.tileWidth  = config.tileWidth or 32
    self.tileHeight = config.tileHeight or 32
    self.mapWidth   = config.mapWidth or 64
    self.mapHeight  = config.mapHeight or 64
    self.orientation= config.orientation or "orthogonal"
    self.renderOrder= config.renderOrder or "right-down"
    self.nextLayerId= 2
    self.nextObjectId= 1
    self.tilesets   = config.tilesets or {}
    self.layers     = config.layers or {}
    self.properties = config.properties or {}
    return self
end

function TilemapBridge:add_tileset(ts)
    ts.firstgid = ts.firstgid or 1
    ts.tilewidth = ts.tilewidth or self.tileWidth
    ts.tileheight = ts.tileheight or self.tileHeight
    ts.spacing = ts.spacing or 0
    ts.margin = ts.margin or 0
    ts.columns = ts.columns or 1
    ts.image = ts.image or ""
    ts.imagewidth = ts.imagewidth or ts.tilewidth
    ts.imageheight = ts.imageheight or ts.tileheight
    if not ts.tiles then ts.tiles = {} end
    table.insert(self.tilesets, ts)
end

function TilemapBridge:add_tile_layer(name, data, opacity, visible)
    opacity = opacity or 1.0
    visible = visible ~= false
    local layer = {
        data = data or {},
        height = self.mapHeight,
        width = self.mapWidth,
        id = self.nextLayerId,
        name = name or ("Layer " .. self.nextLayerId),
        opacity = opacity,
        type = "tilelayer",
        visible = visible,
        x = 0, y = 0
    }
    self.nextLayerId = self.nextLayerId + 1
    table.insert(self.layers, layer)
    return layer
end

function TilemapBridge:add_object_layer(name, objects, opacity, visible)
    opacity = opacity or 1.0
    visible = visible ~= false
    local layer = {
        draworder = "topdown",
        id = self.nextLayerId,
        name = name or ("Object Layer " .. self.nextLayerId),
        objects = objects or {},
        opacity = opacity,
        type = "objectgroup",
        visible = visible,
        x = 0, y = 0
    }
    self.nextLayerId = self.nextLayerId + 1
    table.insert(self.layers, layer)
    return layer
end

function TilemapBridge:flatten_2d(map2d, firstgid)
    firstgid = firstgid or 1
    local data = {}
    for y = 1, self.mapHeight do
        for x = 1, self.mapWidth do
            local v = 0
            if map2d[y] and map2d[y][x] then
                v = map2d[y][x]
                if v == 0 then v = 0 else v = v + firstgid - 1 end
            end
            table.insert(data, v)
        end
    end
    return data
end

function TilemapBridge:unflatten_1d(data, width, height, firstgid)
    firstgid = firstgid or 1
    local map2d = {}
    for y = 1, height do
        map2d[y] = {}
        for x = 1, width do
            local idx = (y - 1) * width + x
            local v = data[idx] or 0
            if v == 0 then map2d[y][x] = 0 else map2d[y][x] = v - firstgid + 1 end
        end
    end
    return map2d
end

function TilemapBridge:build_json()
    return {
        compressionlevel = -1,
        height = self.mapHeight, width = self.mapWidth,
        tileheight = self.tileHeight, tilewidth = self.tileWidth,
        orientation = self.orientation, renderorder = self.renderOrder,
        infinite = false,
        nextlayerid = self.nextLayerId,
        nextobjectid = self.nextObjectId,
        layers = self.layers, tilesets = self.tilesets,
        type = "map", version = "1.10", tiledversion = "1.10.2",
        properties = self.properties
    }
end

function TilemapBridge:encode_json(value, indent)
    indent = indent or 0
    local pad = string.rep("  ", indent)
    local t = type(value)
    if t == "nil" then return "null" end
    if t == "boolean" then return tostring(value) end
    if t == "number" then
        if value == math.floor(value) then return tostring(math.floor(value)) end
        return tostring(value)
    end
    if t == "string" then
        return '"' .. value:gsub('\\', '\\\\'):gsub('"', '\\"'):gsub('\n', '\\n'):gsub('\r', '\\r'):gsub('\t', '\\t') .. '"'
    end
    if t == "table" then
        local isArray = true
        local n = 0
        for k, _ in pairs(value) do
            n = n + 1
            if type(k) ~= "number" or k <= 0 or math.floor(k) ~= k then isArray = false; break end
        end
        if isArray and n == #value then
            local parts = {}
            for _, v in ipairs(value) do table.insert(parts, self:encode_json(v, indent + 1)) end
            if #parts == 0 then return "[]" end
            return "[\n" .. pad .. "  " .. table.concat(parts, ",\n" .. pad .. "  ") .. "\n" .. pad .. "]"
        else
            local parts = {}
            local keys = {}
            for k in pairs(value) do table.insert(keys, k) end
            table.sort(keys, function(a, b)
                local ta, tb = type(a), type(b)
                if ta == tb then return a < b end
                return ta < tb
            end)
            for _, k in ipairs(keys) do
                local v = value[k]
                local keystr = (type(k) == "string") and ('"' .. k .. '"') or tostring(k)
                table.insert(parts, pad .. "  " .. keystr .. ": " .. self:encode_json(v, indent + 1))
            end
            if #parts == 0 then return "{}" end
            return "{\n" .. table.concat(parts, ",\n") .. "\n" .. pad .. "}"
        end
    end
    return "null"
end

function TilemapBridge:export_string()
    return self:encode_json(self:build_json())
end

function TilemapBridge.import_table(jsonTable)
    local bridge = TilemapBridge.new({
        tileWidth = jsonTable.tilewidth or 32,
        tileHeight = jsonTable.tileheight or 32,
        mapWidth = jsonTable.width or 64,
        mapHeight = jsonTable.height or 64,
        orientation = jsonTable.orientation or "orthogonal",
        renderOrder = jsonTable.renderorder or "right-down",
        nextLayerId = jsonTable.nextlayerid or 2,
        nextObjectId = jsonTable.nextobjectid or 1,
        tilesets = jsonTable.tilesets or {},
        layers = jsonTable.layers or {},
        properties = jsonTable.properties or {}
    })
    return bridge
end

function TilemapBridge:save(path)
    local str = self:export_string()
    local fs = _G.fileSystem or (_G.Urho3D and _G.Urho3D.fileSystem)
    if fs then
        local file = fs:OpenFile(path, _G.FILE_WRITE)
        if file then file:WriteString(str); file:Close(); return true end
    end
    local f = io.open(path, "w")
    if f then f:write(str); f:close(); return true end
    return false
end

function TilemapBridge.load(path)
    local fs = _G.fileSystem or (_G.Urho3D and _G.Urho3D.fileSystem)
    local content = nil
    if fs then
        local file = fs:OpenFile(path, _G.FILE_READ)
        if file then content = file:ReadString(); file:Close() end
    else
        local f = io.open(path, "r")
        if f then content = f:read("*a"); f:close() end
    end
    if not content then return nil end
    local json = nil
    local ok, err = pcall(function()
        local func = load("return " .. content:gsub('"', '"'))
        if func then json = func() end
    end)
    if not ok or not json then json = TilemapBridge._parse_json(content) end
    if json then return TilemapBridge.import_table(json) end
    return nil
end

function TilemapBridge._parse_json(str)
    local pos = 1
    local len = #str
    local function skip_ws()
        while pos <= len do
            local c = str:sub(pos, pos)
            if c == " " or c == "\t" or c == "\n" or c == "\r" then pos = pos + 1
            elseif c == "/" and str:sub(pos + 1, pos + 1) == "/" then
                while pos <= len and str:sub(pos, pos) ~= "\n" do pos = pos + 1 end
            else break end
        end
    end
    local function parse_value()
        skip_ws()
        local c = str:sub(pos, pos)
        if c == '"' then return parse_string()
        elseif c == "{" then return parse_object()
        elseif c == "[" then return parse_array()
        elseif c == "t" then pos = pos + 4; return true
        elseif c == "f" then pos = pos + 5; return false
        elseif c == "n" then pos = pos + 4; return nil
        else return parse_number() end
    end
    local function parse_string()
        pos = pos + 1
        local res = ""
        while pos <= len do
            local c = str:sub(pos, pos)
            if c == '"' then pos = pos + 1; return res end
            if c == "\\" then
                pos = pos + 1
                local esc = str:sub(pos, pos)
                if esc == "n" then res = res .. "\n"
                elseif esc == "r" then res = res .. "\r"
                elseif esc == "t" then res = res .. "\t"
                else res = res .. esc end
                pos = pos + 1
            else res = res .. c; pos = pos + 1 end
        end
        return res
    end
    local function parse_number()
        local start = pos
        while pos <= len do
            local c = str:sub(pos, pos)
            if c:match("[%-%d%.eE%+]") then pos = pos + 1 else break end
        end
        return tonumber(str:sub(start, pos - 1))
    end
    local function parse_array()
        pos = pos + 1
        local arr = {}
        skip_ws()
        if str:sub(pos, pos) == "]" then pos = pos + 1; return arr end
        while true do
            table.insert(arr, parse_value())
            skip_ws()
            local c = str:sub(pos, pos)
            pos = pos + 1
            if c == "]" then return arr end
        end
    end
    local function parse_object()
        pos = pos + 1
        local obj = {}
        skip_ws()
        if str:sub(pos, pos) == "}" then pos = pos + 1; return obj end
        while true do
            local key = parse_string()
            skip_ws()
            pos = pos + 1
            obj[key] = parse_value()
            skip_ws()
            local c = str:sub(pos, pos)
            pos = pos + 1
            if c == "}" then return obj end
        end
    end
    return parse_value()
end

function TilemapBridge.from_layers(layerMap, tileWidth, tileHeight, tilesetImage)
    local firstLayer = nil
    local mapW, mapH = 64, 64
    for _, grid in pairs(layerMap) do mapH = #grid; mapW = #grid[1]; firstLayer = grid; break end
    local bridge = TilemapBridge.new({ tileWidth = tileWidth or 32, tileHeight = tileHeight or 32, mapWidth = mapW, mapHeight = mapH })
    if tilesetImage then
        bridge:add_tileset({ columns = 1, firstgid = 1, image = tilesetImage, imagewidth = tileWidth or 32, imageheight = tileHeight or 32, margin = 0, name = "auto_tileset", spacing = 0, tilecount = 256, tileheight = tileHeight or 32, tilewidth = tileWidth or 32 })
    end
    for name, grid in pairs(layerMap) do
        local data = bridge:flatten_2d(grid, 1)
        bridge:add_tile_layer(name, data, 1.0, true)
    end
    return bridge
end

return TilemapBridge
```

### 7.6 main.lua

```lua
-- main.lua
-- urhox-procedural-world 技能入口与综合演示
-- 展示如何组合 NoiseTerrain / WFCGenerator / CaveGenerator / BiomeSystem / TilemapBridge
-- 生成一张混合了生物群系、噪声地形、洞穴和 WFC 建筑布局的完整地图，并导出为 Tiled JSON。

print("[urhox-procedural-world] initializing...")

-- 加载子模块 (要求这些文件与 main.lua 同目录)
local NoiseTerrain = require("NoiseTerrain")
local WFCGenerator = require("WFCGenerator")
local CaveGenerator= require("CaveGenerator")
local BiomeSystem  = require("BiomeSystem")
local TilemapBridge= require("TilemapBridge")

-- =============================================================================
-- 1) 配置参数区
-- =============================================================================
local CONFIG = {
    seed = 42,
    mapWidth = 128,
    mapHeight = 128,
    tileSize = 32,
    outputPath = "procedural_world_output.json",

    -- 噪声地形参数
    terrain = {
        scale = 3.0,
        octaves = 5,
        gain = 0.5,
        lacunarity = 2.0,
        heightMultiplier = 12.0,
        normalize = true,
        domainWarp = false
    },

    -- 生物群系参数
    biome = {
        temperature = { scale = 2.0, octaves = 4 },
        humidity    = { scale = 2.5, octaves = 4 },
        elevation   = { scale = 1.0, octaves = 6 },
        special     = { scale = 4.0, octaves = 3 },
        blendWidth  = 0.08
    },

    -- 洞穴参数
    cave = {
        randomFillPercent = 45,
        smoothIterations = 4,
        roomThresholdSize = 40,
        wallThresholdSize = 40,
        neighborWallLimit = 4,
        connectRooms = true,
        extraCorridorWidth = 0
    },

    -- WFC 建筑布局参数
    wfc = {
        width = 32,
        height = 32,
        backtrack = true,
        maxBacktracks = 2000
    }
}

math.randomseed(CONFIG.seed)

-- =============================================================================
-- 2) 生成：噪声高程图 (Heightmap)
-- =============================================================================
print("[Phase 1] Generating Noise Terrain...")
local heightmap = NoiseTerrain.generate_heightmap(CONFIG.mapWidth, CONFIG.mapHeight, {
    seed = CONFIG.seed,
    scale = CONFIG.terrain.scale,
    octaves = CONFIG.terrain.octaves,
    gain = CONFIG.terrain.gain,
    lacunarity = CONFIG.terrain.lacunarity,
    normalize = CONFIG.terrain.normalize,
    domainWarp = CONFIG.terrain.domainWarp
})

-- 将高度图缩放到实际游戏高度
for y = 1, CONFIG.mapHeight do
    for x = 1, CONFIG.mapWidth do
        heightmap[y][x] = heightmap[y][x] * CONFIG.terrain.heightMultiplier
    end
end
local colormap = NoiseTerrain.colorize_heightmap(heightmap, {
    water = {0.12, 0.35, 0.65},
    sand  = {0.92, 0.85, 0.55},
    grass = {0.22, 0.72, 0.22},
    rock  = {0.55, 0.52, 0.50},
    snow  = {0.98, 0.98, 1.00}
})

-- =============================================================================
-- 3) 生成：生物群系分布图
-- =============================================================================
print("[Phase 2] Generating Biome Map...")
local bioSys = BiomeSystem.new({
    seed = CONFIG.seed + 1,
    width = CONFIG.mapWidth,
    height = CONFIG.mapHeight,
    temperature  = CONFIG.biome.temperature,
    humidity     = CONFIG.biome.humidity,
    elevation    = CONFIG.biome.elevation,
    special      = CONFIG.biome.special,
    blendWidth   = CONFIG.biome.blendWidth
})

for _, preset in ipairs(BiomeSystem.presets()) do
    bioSys:add_biome(preset)
end

local biomeResult = bioSys:generate({ width = CONFIG.mapWidth, height = CONFIG.mapHeight })
bioSys:voronoi_sharpen(biomeResult, 1.2)
local biomeTileMap = bioSys:generate_tile_map(biomeResult)

-- =============================================================================
-- 4) 生成：洞穴层 (地下层，可被叠加到海拔较低的平原区域)
-- =============================================================================
print("[Phase 3] Generating Cave Layer...")
local caveGen = CaveGenerator.new({
    width = math.floor(CONFIG.mapWidth / 2),
    height = math.floor(CONFIG.mapHeight / 2),
    seed = CONFIG.seed + 2,
    randomFillPercent = CONFIG.cave.randomFillPercent,
    smoothIterations = CONFIG.cave.smoothIterations,
    roomThresholdSize = CONFIG.cave.roomThresholdSize,
    wallThresholdSize = CONFIG.cave.wallThresholdSize,
    neighborWallLimit = CONFIG.cave.neighborWallLimit,
    connectRooms = CONFIG.cave.connectRooms,
    extraCorridorWidth = CONFIG.cave.extraCorridorWidth
})
local caveMap = caveGen:generate()

-- =============================================================================
-- 5) 生成：WFC 建筑/城镇布局层
-- =============================================================================
print("[Phase 4] Generating WFC Settlement Layout...")
local wfc = WFCGenerator.new({
    width = CONFIG.wfc.width,
    height = CONFIG.wfc.height,
    seed = CONFIG.seed + 3,
    backtrack = CONFIG.wfc.backtrack,
    maxBacktracks = CONFIG.wfc.maxBacktracks
})

local roadH = { id = "road_h", sockets = { up = "0", down = "0", left = "R", right = "R" }, weight = 3.0, data = { tileId = 10 } }
local roadV = { id = "road_v", sockets = { up = "R", down = "R", left = "0", right = "0" }, weight = 3.0, data = { tileId = 11 } }
local roadX = { id = "road_x", sockets = { up = "R", down = "R", left = "R", right = "R" }, weight = 1.0, data = { tileId = 12 } }
local house = { id = "house", sockets = { up = "0", down = "0", left = "0", right = "0" }, weight = 2.0, data = { tileId = 20 } }
local grass = { id = "grass", sockets = { up = "0", down = "0", left = "0", right = "0" }, weight = 5.0, data = { tileId = 30 } }
local wall  = { id = "wall",  sockets = { up = "W", down = "W", left = "W", right = "W" }, weight = 1.0, data = { tileId = 40 } }

wfc:add_tile(roadH)
wfc:add_tile(roadV)
wfc:add_tile(roadX)
wfc:add_tile(house)
wfc:add_tile(grass)
wfc:add_tile(wall)

local wfcOk, wfcErr = pcall(function() wfc:generate() end)
local wfcTileMap = {}
if wfcOk then
    wfcTileMap = wfc:get_output_ids()
    print("[Phase 4] WFC generation succeeded.")
else
    print("[Phase 4] WFC generation failed: " .. tostring(wfcErr))
    for y = 1, CONFIG.wfc.height do
        wfcTileMap[y] = {}
        for x = 1, CONFIG.wfc.width do
            wfcTileMap[y][x] = 30
        end
    end
end

-- =============================================================================
-- 6) 合并多层到最终世界地图
-- =============================================================================
print("[Phase 5] Merging layers into final world map...")

local finalSurface = {}
local finalWfcLayer = {}
local finalCaveLayer = {}
local finalHeightLayer = {}

local wfcOffsetX = math.floor(CONFIG.mapWidth / 2) - math.floor(CONFIG.wfc.width / 2)
local wfcOffsetY = math.floor(CONFIG.mapHeight / 2) - math.floor(CONFIG.wfc.height / 2)

for y = 1, CONFIG.mapHeight do
    finalSurface[y] = {}
    finalWfcLayer[y] = {}
    finalCaveLayer[y] = {}
    finalHeightLayer[y] = {}
    for x = 1, CONFIG.mapWidth do
        local biomeId = biomeTileMap[y][x] or 0
        finalSurface[y][x] = biomeId

        local wx = x - wfcOffsetX
        local wy = y - wfcOffsetY
        if wx >= 1 and wx <= CONFIG.wfc.width and wy >= 1 and wy <= CONFIG.wfc.height then
            local wfcId = wfcTileMap[wy] and wfcTileMap[wy][wx] or 0
            if wfcId ~= 0 and wfcId ~= 30 then
                finalWfcLayer[y][x] = wfcId
            else
                finalWfcLayer[y][x] = 0
            end
        else
            finalWfcLayer[y][x] = 0
        end

        local cx = math.floor((x - 1) / 2) + 1
        local cy = math.floor((y - 1) / 2) + 1
        if cx >= 1 and cx <= caveGen.width and cy >= 1 and cy <= caveGen.height then
            local caveCell = caveMap[cy][cx]
            if biomeId == 6 or biomeId == 8 then
                finalCaveLayer[y][x] = (caveCell == CaveGenerator.FLOOR) and 50 or 0
            else
                finalCaveLayer[y][x] = 0
            end
        else
            finalCaveLayer[y][x] = 0
        end

        local h = heightmap[y][x]
        local hId = 0
        if h < 2 then hId = 1
        elseif h < 5 then hId = 2
        elseif h < 8 then hId = 3
        else hId = 4 end
        finalHeightLayer[y][x] = hId
    end
end

-- =============================================================================
-- 7) 导出为 Tiled JSON (兼容 Tiled 1.10+)
-- =============================================================================
print("[Phase 6] Exporting to Tiled JSON: " .. CONFIG.outputPath)

local bridge = TilemapBridge.new({
    tileWidth = CONFIG.tileSize,
    tileHeight = CONFIG.tileSize,
    mapWidth = CONFIG.mapWidth,
    mapHeight = CONFIG.mapHeight,
    orientation = "orthogonal",
    renderOrder = "right-down"
})

bridge:add_tileset({
    columns = 8,
    firstgid = 1,
    image = "assets/tileset_procedural.png",
    imagewidth = 256,
    imageheight = 256,
    margin = 0,
    name = "procedural_tileset",
    spacing = 0,
    tilecount = 64,
    tileheight = CONFIG.tileSize,
    tilewidth = CONFIG.tileSize
})

bridge:add_tile_layer("Biome_Surface",   bridge:flatten_2d(finalSurface, 1),   1.0, true)
bridge:add_tile_layer("Height_Category", bridge:flatten_2d(finalHeightLayer, 1), 0.5, true)
bridge:add_tile_layer("WFC_Settlement",  bridge:flatten_2d(finalWfcLayer, 1),  1.0, true)
bridge:add_tile_layer("Cave_Entries",    bridge:flatten_2d(finalCaveLayer, 1), 1.0, true)

local spawnX, spawnY = caveGen:find_spawn_point()
bridge:add_object_layer("Meta", {
    {
        id = 1, name = "PlayerSpawn", type = "",
        x = (spawnX + wfcOffsetX) * CONFIG.tileSize,
        y = (spawnY + wfcOffsetY) * CONFIG.tileSize,
        width = CONFIG.tileSize, height = CONFIG.tileSize,
        rotation = 0, visible = true
    }
})

local saved = bridge:save(CONFIG.outputPath)
if saved then
    print("[SUCCESS] World exported to " .. CONFIG.outputPath)
else
    print("[WARN] Could not save via filesystem. JSON string follows (first 500 chars):")
    local s = bridge:export_string()
    print(s:sub(1, 500) .. "...")
end

-- =============================================================================
-- 8) 输出统计摘要
-- =============================================================================
print("\n===== urhox-procedural-world generation summary =====")
print("Map size: " .. CONFIG.mapWidth .. "x" .. CONFIG.mapHeight)
print("Seed: " .. CONFIG.seed)
print("Biome types: " .. #BiomeSystem.presets())
print("Cave regions: " .. #caveGen.rooms)
print("WFC grid: " .. CONFIG.wfc.width .. "x" .. CONFIG.wfc.height)
print("Output: " .. CONFIG.outputPath)
print("=======================================================\n")

return {
    heightmap = heightmap,
    colormap = colormap,
    biomeResult = biomeResult,
    caveMap = caveMap,
    caveRooms = caveGen.rooms,
    wfcMap = wfcTileMap,
    layers = {
        surface = finalSurface,
        wfc = finalWfcLayer,
        cave = finalCaveLayer,
        height = finalHeightLayer
    },
    bridge = bridge,
    config = CONFIG
}
```

---

## 8. 开源参考与延伸阅读

以下为本技能在算法设计、代码结构与工程实践中参考或受益的开源项目与社区资源。它们覆盖了 WFC、Perlin Noise、Cellular Automata、Tiled 等核心技术栈，适合作为进一步深度学习的入口。

### 8.1 Wave Function Collapse (WFC)

- **mxgmn/WaveFunctionCollapse** (GitHub)
  - C# 原始算法实现，包含 Simple Tiled Model 与 Overlapping Model。
  - 是学习 WFC 概念、Pattern 提取、回溯策略的首选参考。
  - https://github.com/mxgmn/WaveFunctionCollapse

- **keijiro/WaveFunctionCollapse** (GitHub)
  - Unity / C# 版本，针对游戏引擎场景做了大量优化与示例。
  - 展示了如何在实时渲染环境中集成 WFC 生成结果。

- **mathiscode/wfc-godot** (GitHub)
  - Godot 4 的 WFC 插件，包含可视化编辑器与 TileSet 集成思路。
  - 对理解 "socket" 与 Godot TileMap 的映射关系非常有帮助。

### 8.2 Perlin / Simplex Noise & 地形生成

- **WesOfX/perlin-noise** (GitHub)
  - 简洁的 C++ Perlin Noise 参考实现，包含 `Generator` 与 `Noise` 两个类。
  - 代码量小、注释清晰，非常适合对照理解 fBm 参数（frequency、octaves、persistence）。
  - https://github.com/WesOfX/perlin-noise

- **lumijiez/perlinsim** (GitHub)
  - Java Processing 项目，将 Perlin 噪声与生物群系、树木分布、河流网络结合。
  - 对 "噪声 → 生态 → 植被" 的完整链路提供了直观的可视化参考。

- **techiew/PerlinNoiseTerrain** (GitHub)
  - C++ / OpenGL 的 3D 漫游地形 demo，展示了 Perlin → Mesh → 实时渲染的端到端流程。

### 8.3 Cellular Automata (洞穴生成)

- **Sebastian Lague - Procedural Cave Generation** (YouTube + GitHub)
  - 元胞自动机洞穴生成的经典可视化教程，涵盖了平滑规则、区域分析、房间隧道连接。
  - 本技能中 `CaveGenerator` 的区域连接与隧道算法直接受益于该教程的思路。

- **abitawake / Procedural generation with Godot: Creating caves with Cellular Automata**
  - Godot 4 GDScript 实现的 CA 洞穴，展示了如何在 TileMap 节点上直接渲染结果。
  - 文章对 "randomFillPercent / smoothIterations / neighborWallLimit" 等参数的调优有详细说明。

- **LeoMarques101/ProceduralCaveGeneration** (GitHub)
  - Open Tibia (2D MMORPG) 的 Lua 洞穴生成脚本，包含杠杆触发、地图风格切换等实际生产案例。
  - https://github.com/LeoMarques101/ProceduralCaveGeneration

### 8.4 Biome & Ecology Systems

- **neki-dev/gen-biome** (GitHub)
  - TypeScript 编写的 2D 生物群系生成库，支持温度-湿度-海拔三维空间中的平滑过渡。
  - 其权重混合与边界锐化（sharpen）策略与本技能中的 `voronoi_sharpen` 思路相近。

- **Cubitect/cubiomes** (GitHub)
  - Minecraft 生物群系算法的 C 语言解析实现。
  - 虽然 Minecraft 使用的是 Layered Voronoi + Perlin 的混合方案，但其 "噪声层 → 群系 ID" 的查表思想对大型世界生成很有启发。

### 8.5 Tiled Map Editor & JSON 格式

- **mapeditor/tiled** (GitHub)
  - 官方 Tiled 编辑器与 TMX/JSON 格式规范维护者。
  - 文档中的 "JSON Map Format" 章节是 `TilemapBridge` 编码器设计的唯一权威依据。
  - https://github.com/mapeditor/tiled

- **baylej/tmx** (GitHub)
  - C 语言 TMX 解析库，展示了 Tiled XML/JSON 中 layer、tileset、object、property 的内存模型。
  - 对理解 `firstgid`、`tilecount`、`columns` 等字段的物理意义很有帮助。

---

> **结语**
> `urhox-procedural-world` 不是五个独立脚本的简单堆砌，而是一个围绕 "种子确定性 → 多层生成 → 统一导出" 构建的完整技能。你可以把 `main.lua` 当作起点，在理解数据流后逐步替换自己的 tile 资源、调整生物群系规则、扩展 WFC 的 tile 库，最终打造出独一无二的程序化世界。希望你能在 tinkering 的过程中找到 PCG 的无限乐趣。