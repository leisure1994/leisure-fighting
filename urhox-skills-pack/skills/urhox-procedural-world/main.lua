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

-- 使用预设生物群系
for _, preset in ipairs(BiomeSystem.presets()) do
    bioSys:add_biome(preset)
end

local biomeResult = bioSys:generate({ width = CONFIG.mapWidth, height = CONFIG.mapHeight })
-- 可选：锐化边界
bioSys:voronoi_sharpen(biomeResult, 1.2)

-- 提取生物群系 tile id
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
-- caveMap: WALL=1, FLOOR=0

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

-- 定义简单的城镇拼贴 tile 约束
-- socket 规则：相同字符可以拼接
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
    -- fallback: fill with grass
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

-- 最终 tile 定义 (用于 Tiled 导出)
-- 0 = 空
-- 层1：Biome (基础地表)
-- 层2：Cave (地下覆盖，仅在山地区域少量显示) 这里简化为独立层
-- 层3：WFC Settlement (嵌入到草原/沙漠等平坦区域)
-- 层4：Heightmap 颜色 (object layer 存生成元数据，实际像素层我们这里只用 tile 模拟)

-- 合并逻辑：
--   最终地表 = biome tile
--   如果在地图中心一块矩形区域 ( representing a town site )，用 WFC 结果覆盖
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

        -- WFC overlay
        local wx = x - wfcOffsetX
        local wy = y - wfcOffsetY
        if wx >= 1 and wx <= CONFIG.wfc.width and wy >= 1 and wy <= CONFIG.wfc.height then
            local wfcId = wfcTileMap[wy] and wfcTileMap[wy][wx] or 0
            if wfcId ~= 0 and wfcId ~= 30 then -- 30 is grass, skip if same as biome
                finalWfcLayer[y][x] = wfcId
            else
                finalWfcLayer[y][x] = 0
            end
        else
            finalWfcLayer[y][x] = 0
        end

        -- Cave overlay (scale cave up to map size, 2x)
        local cx = math.floor((x - 1) / 2) + 1
        local cy = math.floor((y - 1) / 2) + 1
        if cx >= 1 and cx <= caveGen.width and cy >= 1 and cy <= caveGen.height then
            local caveCell = caveMap[cy][cx]
            -- 仅在某些生物群系下显示洞穴入口（如山地）
            if biomeId == 6 or biomeId == 8 then -- mountain / volcano
                finalCaveLayer[y][x] = (caveCell == CaveGenerator.FLOOR) and 50 or 0 -- 50 = cave floor tile
            else
                finalCaveLayer[y][x] = 0
            end
        else
            finalCaveLayer[y][x] = 0
        end

        -- Heightmap: 编码为 tile id 类别
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

-- 添加一个通用 tileset (用户可替换为实际资源)
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

-- 生成元数据 object layer
local spawnX, spawnY = caveGen:find_spawn_point()
bridge:add_object_layer("Meta", {
    {
        id = 1,
        name = "PlayerSpawn",
        type = "",
        x = (spawnX + wfcOffsetX) * CONFIG.tileSize,
        y = (spawnY + wfcOffsetY) * CONFIG.tileSize,
        width = CONFIG.tileSize,
        height = CONFIG.tileSize,
        rotation = 0,
        visible = true
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

-- 返回结果供 urhox Lua 脚本环境进一步使用
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
