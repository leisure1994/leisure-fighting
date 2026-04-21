-- RegionGen.lua
-- 天道引擎 · 程序化区域生成系统（PCG）完全体
-- 职责：噪声地形、生物群系、带回溯 WFC、CA 平滑、Poisson Disk、Tiled 导出

RegionGen = RegionGen or {}

-- ========================================================================
-- 常量定义
-- ========================================================================
local PERLIN_PERM = {}
local PERLIN_INITED = false
local PERLIN_PSIZE = 256

-- 生物群系
RegionGen.BIOME = {
    NONE   = 0,
    FOREST = 1,
    DESERT = 2,
    SNOW   = 3,
    SWAMP  = 4,
    PLAIN  = 5,
    MOUNTAIN = 6,
    JUNGLE = 7,
    VOLCANO = 8,
    OCEAN  = 9,
}

-- 地块类型
RegionGen.TILE = {
    EMPTY      = 0,
    WALL       = 1,
    DOOR       = 2,
    ROAD       = 3,
    GRASS      = 4,
    WATER      = 5,
    TREE       = 6,
    ORE        = 7,
    SAND       = 8,
    SNOW_GROUND = 9,
    SWAMP_GROUND = 10,
    LAVA       = 11,
    ICE        = 12,
    FLOOR_STONE = 13,
    FLOOR_WOOD  = 14,
    WALL_BRICK  = 15,
    WALL_ROCK   = 16,
    ROOF        = 17,
    BRIDGE      = 18,
    FENCE       = 19,
}

-- WFC Tile 名称常量
RegionGen.WFC_TILE = {
    GRASS      = "grass",
    FOREST     = "forest",
    WATER      = "water",
    SAND       = "sand",
    SNOW       = "snow",
    SWAMP      = "swamp",
    MOUNTAIN   = "mountain",
    ROAD_H     = "road_h",
    ROAD_V     = "road_v",
    ROAD_X     = "road_x",
    WALL_TOP   = "wall_top",
    WALL_MID   = "wall_mid",
    WALL_BOT   = "wall_bot",
    FLOOR      = "floor",
    DOOR       = "door",
    ROOF       = "roof",
    BRIDGE_H   = "bridge_h",
    BRIDGE_V   = "bridge_v",
    LAVA       = "lava",
    ICE        = "ice",
}

-- ========================================================================
-- 内部工具函数
-- ========================================================================
local function InitPermutation(seed)
    seed = seed or 0
    math.randomseed(seed)
    local perm = {}
    for i = 0, PERLIN_PSIZE - 1 do
        perm[i] = i
    end
    for i = PERLIN_PSIZE - 1, 1, -1 do
        local j = math.random(0, i)
        perm[i], perm[j] = perm[j], perm[i]
    end
    for i = 0, PERLIN_PSIZE - 1 do
        perm[i + PERLIN_PSIZE] = perm[i]
    end
    PERLIN_PERM = perm
    PERLIN_INITED = true
end

local function EnsurePerm(seed)
    if not PERLIN_INITED then
        InitPermutation(seed or 0)
    end
end

local function Fade(t)
    return t * t * t * (t * (t * 6 - 15) + 10)
end

local function Lerp(a, b, t)
    return a + (b - a) * t
end

local function Grad2D(hash, x, y)
    local h = hash % 4
    if h == 0 then return x + y end
    if h == 1 then return -x + y end
    if h == 2 then return x - y end
    return -x - y
end

local function Grad3D(hash, x, y, z)
    local h = hash % 16
    local u = h < 8 and x or y
    local v = h < 4 and y or (h == 12 or h == 14) and x or z
    return ((h % 2 == 0) and u or -u) + ((h % 4 < 2) and v or -v)
end

local function Noise2D(x, y, seed)
    EnsurePerm(seed or 0)
    local X = math.floor(x) % PERLIN_PSIZE
    local Y = math.floor(y) % PERLIN_PSIZE
    local xf = x - math.floor(x)
    local yf = y - math.floor(y)
    local u = Fade(xf)
    local v = Fade(yf)
    local p = PERLIN_PERM
    local A = p[X] + Y
    local B = p[X + 1] + Y
    return Lerp(
        Lerp(Grad2D(p[A], xf, yf), Grad2D(p[B], xf - 1, yf), u),
        Lerp(Grad2D(p[A + 1], xf, yf - 1), Grad2D(p[B + 1], xf - 1, yf - 1), u),
        v
    )
end

local function Noise3D(x, y, z, seed)
    EnsurePerm(seed or 0)
    local X = math.floor(x) % PERLIN_PSIZE
    local Y = math.floor(y) % PERLIN_PSIZE
    local Z = math.floor(z) % PERLIN_PSIZE
    local xf = x - math.floor(x)
    local yf = y - math.floor(y)
    local zf = z - math.floor(z)
    local u, v, w = Fade(xf), Fade(yf), Fade(zf)
    local p = PERLIN_PERM
    local A = p[X] + Y
    local AA = p[A] + Z
    local AB = p[A + 1] + Z
    local B = p[X + 1] + Y
    local BA = p[B] + Z
    local BB = p[B + 1] + Z
    return Lerp(
        Lerp(Lerp(Grad3D(p[AA], xf, yf, zf), Grad3D(p[BA], xf - 1, yf, zf), u),
             Lerp(Grad3D(p[AB], xf, yf - 1, zf), Grad3D(p[BB], xf - 1, yf - 1, zf), u), v),
        Lerp(Lerp(Grad3D(p[AA + 1], xf, yf, zf - 1), Grad3D(p[BA + 1], xf - 1, yf, zf - 1), u),
             Lerp(Grad3D(p[AB + 1], xf, yf - 1, zf - 1), Grad3D(p[BB + 1], xf - 1, yf - 1, zf - 1), u), v),
        w
    )
end

-- ========================================================================
-- 公共噪声函数
-- ========================================================================
function RegionGen.Perlin2D(x, y, seed)
    return Noise2D(x, y, seed)
end

function RegionGen.Perlin3D(x, y, z, seed)
    return Noise3D(x, y, z, seed)
end

function RegionGen.FBM2D(x, y, seed, octaves, persistence, lacunarity)
    octaves = octaves or 4
    persistence = persistence or 0.5
    lacunarity = lacunarity or 2.0
    local total = 0
    local frequency = 1
    local amplitude = 1
    local maxValue = 0
    for i = 1, octaves do
        total = total + RegionGen.Perlin2D(x * frequency, y * frequency, seed + i * 137) * amplitude
        maxValue = maxValue + amplitude
        amplitude = amplitude * persistence
        frequency = frequency * lacunarity
    end
    local n = total / maxValue
    return (n + 1) * 0.5
end

function RegionGen.FBM3D(x, y, z, seed, octaves, persistence, lacunarity)
    octaves = octaves or 4
    persistence = persistence or 0.5
    lacunarity = lacunarity or 2.0
    local total = 0
    local frequency = 1
    local amplitude = 1
    local maxValue = 0
    for i = 1, octaves do
        total = total + RegionGen.Perlin3D(x * frequency, y * frequency, z * frequency, seed + i * 137) * amplitude
        maxValue = maxValue + amplitude
        amplitude = amplitude * persistence
        frequency = frequency * lacunarity
    end
    local n = total / maxValue
    return (n + 1) * 0.5
end

-- ========================================================================
-- 高度图与地形生成
-- ========================================================================
function RegionGen.GenerateHeightmap(seed, width, height, islandFactor)
    width = width or 64
    height = height or 64
    islandFactor = islandFactor or 0.4
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            local n = RegionGen.FBM2D(x / 32.0, y / 32.0, seed, 5, 0.5, 2.0)
            local dx = (x - width / 2) / (width / 2)
            local dy = (y - height / 2) / (height / 2)
            local dist = math.sqrt(dx * dx + dy * dy)
            n = n * (1.0 - dist * islandFactor)
            n = math.max(0, math.min(1, n))
            map[y][x] = math.floor(n * 255)
        end
    end
    return map
end

function RegionGen.GenerateTemperatureMap(seed, width, height)
    width = width or 64
    height = height or 64
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            local lat = math.abs(y - height / 2) / (height / 2)
            local noise = RegionGen.FBM2D(x / 40.0, y / 40.0, seed + 7, 4, 0.5, 2.0)
            local temp = noise * (1.0 - lat * 0.6) * 255
            map[y][x] = math.floor(math.max(0, math.min(255, temp)))
        end
    end
    return map
end

function RegionGen.GenerateMoistureMap(seed, width, height)
    width = width or 64
    height = height or 64
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            local noise = RegionGen.FBM2D(x / 35.0, y / 35.0, seed + 13, 4, 0.5, 2.0)
            map[y][x] = math.floor(noise * 255)
        end
    end
    return map
end

function RegionGen.GenerateBiomeMap(seed, width, height)
    width = width or 64
    height = height or 64
    local heightmap = RegionGen.GenerateHeightmap(seed, width, height)
    local tempmap = RegionGen.GenerateTemperatureMap(seed, width, height)
    local moistmap = RegionGen.GenerateMoistureMap(seed, width, height)
    local biomemap = {}
    for y = 1, height do
        biomemap[y] = {}
        for x = 1, width do
            local h = heightmap[y][x]
            local t = tempmap[y][x]
            local m = moistmap[y][x]
            local biome = RegionGen.BIOME.PLAIN
            if h < 25 then
                biome = RegionGen.BIOME.OCEAN
            elseif h > 210 then
                biome = RegionGen.BIOME.SNOW
            elseif t > 210 and m < 60 then
                biome = RegionGen.BIOME.DESERT
            elseif t > 190 and m > 180 then
                biome = RegionGen.BIOME.JUNGLE
            elseif t < 50 and m > 150 then
                biome = RegionGen.BIOME.SNOW
            elseif m > 190 and h < 110 and t > 80 then
                biome = RegionGen.BIOME.SWAMP
            elseif m > 140 and t > 80 and t < 180 then
                biome = RegionGen.BIOME.FOREST
            elseif h > 160 then
                biome = RegionGen.BIOME.MOUNTAIN
            end
            biomemap[y][x] = biome
        end
    end
    return biomemap, heightmap, tempmap, moistmap
end

-- ========================================================================
-- 细胞自动机（CA）平滑 —— 多规则集支持
-- ========================================================================
local function CountMatchingNeighbors(map, x, y, matchingFunc)
    local count = 0
    local h = #map
    local w = #map[1]
    for dy = -1, 1 do
        for dx = -1, 1 do
            if not (dx == 0 and dy == 0) then
                local nx, ny = x + dx, y + dy
                if nx < 1 or nx > w or ny < 1 or ny > h then
                    count = count + 1
                elseif matchingFunc(map[ny][nx]) then
                    count = count + 1
                end
            end
        end
    end
    return count
end

function RegionGen.CellularAutomata(map, iterations, birthLimit, survivalLimit, wallVal)
    iterations = iterations or 4
    birthLimit = birthLimit or 5
    survivalLimit = survivalLimit or 4
    wallVal = wallVal or 1
    local h = #map
    local w = #map[1]
    local isWall = function(v) return v == wallVal end
    for iter = 1, iterations do
        local newMap = {}
        for y = 1, h do
            newMap[y] = {}
            for x = 1, w do
                local neighbors = CountMatchingNeighbors(map, x, y, isWall)
                if map[y][x] == wallVal then
                    newMap[y][x] = (neighbors >= survivalLimit) and wallVal or 0
                else
                    newMap[y][x] = (neighbors >= birthLimit) and wallVal or 0
                end
            end
        end
        map = newMap
    end
    return map
end

--- 多规则集 CA：支持 'cave', 'smooth', 'erosion', ' consolidation'
function RegionGen.CellularAutomataAdvanced(map, ruleSet, iterations)
    ruleSet = ruleSet or "cave"
    iterations = iterations or 4
    local h = #map
    local w = #map[1]
    local birth, survive, matchFunc
    if ruleSet == "cave" then
        birth = 6; survive = 4
        matchFunc = function(v) return v > 0 end
    elseif ruleSet == "smooth" then
        birth = 5; survive = 4
        matchFunc = function(v) return v > 0 end
    elseif ruleSet == "erosion" then
        birth = 3; survive = 6
        matchFunc = function(v) return v > 0 end
    elseif ruleSet == "consolidation" then
        birth = 5; survive = 2
        matchFunc = function(v) return v > 0 end
    elseif ruleSet == "maze" then
        birth = 1; survive = 5
        matchFunc = function(v) return v > 0 end
    else
        birth = 5; survive = 4
        matchFunc = function(v) return v > 0 end
    end
    for iter = 1, iterations do
        local newMap = {}
        for y = 1, h do
            newMap[y] = {}
            for x = 1, w do
                local neighbors = CountMatchingNeighbors(map, x, y, matchFunc)
                local isWall = matchFunc(map[y][x])
                if isWall then
                    newMap[y][x] = (neighbors >= survive) and map[y][x] or 0
                else
                    newMap[y][x] = (neighbors >= birth) and 1 or 0
                end
            end
        end
        map = newMap
    end
    return map
end

-- ========================================================================
-- Poisson Disk 采样（更稳定版本）
-- ========================================================================
local function DistSq(x1, y1, x2, y2)
    local dx, dy = x1 - x2, y1 - y2
    return dx * dx + dy * dy
end

function RegionGen.PoissonDisk(width, height, minDist, maxAttempts)
    minDist = minDist or 10
    maxAttempts = maxAttempts or 30
    local cellSize = minDist / math.sqrt(2)
    local gridW = math.ceil(width / cellSize)
    local gridH = math.ceil(height / cellSize)
    local grid = {}
    for gy = 1, gridH do
        grid[gy] = {}
        for gx = 1, gridW do
            grid[gy][gx] = nil
        end
    end
    local points = {}
    local active = {}

    local firstX = math.random() * width
    local firstY = math.random() * height
    table.insert(points, {x = firstX, y = firstY})
    table.insert(active, 1)
    local gx = math.min(gridW, math.max(1, math.floor(firstX / cellSize) + 1))
    local gy = math.min(gridH, math.max(1, math.floor(firstY / cellSize) + 1))
    grid[gy][gx] = 1

    while #active > 0 do
        local idx = math.random(1, #active)
        local pointIdx = active[idx]
        local px, py = points[pointIdx].x, points[pointIdx].y
        local found = false
        for i = 1, maxAttempts do
            local angle = math.random() * math.pi * 2
            local dist = minDist + math.random() * minDist
            local nx = px + math.cos(angle) * dist
            local ny = py + math.sin(angle) * dist
            if nx >= 0 and nx <= width and ny >= 0 and ny <= height then
                local ngx = math.min(gridW, math.max(1, math.floor(nx / cellSize) + 1))
                local ngy = math.min(gridH, math.max(1, math.floor(ny / cellSize) + 1))
                local ok = true
                for dy = -2, 2 do
                    for dx = -2, 2 do
                        local cgx, cgy = ngx + dx, ngy + dy
                        if cgx >= 1 and cgx <= gridW and cgy >= 1 and cgy <= gridH then
                            local neighborIdx = grid[cgy][cgx]
                            if neighborIdx then
                                if DistSq(nx, ny, points[neighborIdx].x, points[neighborIdx].y) < minDist * minDist then
                                    ok = false
                                    break
                                end
                            end
                        end
                    end
                    if not ok then break end
                end
                if ok then
                    table.insert(points, {x = nx, y = ny})
                    local newIdx = #points
                    grid[ngy][ngx] = newIdx
                    table.insert(active, newIdx)
                    found = true
                    break
                end
            end
        end
        if not found then
            table.remove(active, idx)
        end
    end
    return points
end

-- ========================================================================
-- 丰富的 WFC Tile 定义库
-- ========================================================================
RegionGen.WFC_TILESET_DEFAULT = nil

local function CreateTile(name, weight, allowUp, allowDown, allowLeft, allowRight, tileId)
    return {
        name = name,
        weight = weight or 1,
        allow = {
            allowUp or {},
            allowDown or {},
            allowLeft or {},
            allowRight or {}
        },
        tileId = tileId or RegionGen.TILE.GRASS
    }
end

function RegionGen.GetDefaultTiles()
    if RegionGen.WFC_TILESET_DEFAULT then
        return RegionGen.WFC_TILESET_DEFAULT
    end
    local t = RegionGen.WFC_TILE
    local tiles = {}
    local function Add(tile) table.insert(tiles, tile) end

    -- 草地
    Add(CreateTile(t.GRASS, 10,
        {t.GRASS, t.FOREST, t.ROAD_H, t.ROAD_V, t.ROAD_X, t.WALL_BOT, t.FLOOR, t.BRIDGE_H, t.BRIDGE_V},
        {t.GRASS, t.FOREST, t.ROAD_H, t.ROAD_V, t.ROAD_X, t.WALL_TOP, t.FLOOR, t.BRIDGE_H, t.BRIDGE_V},
        {t.GRASS, t.FOREST, t.ROAD_H, t.ROAD_V, t.ROAD_X, t.WALL_BOT, t.WALL_TOP, t.WALL_MID, t.FLOOR, t.BRIDGE_H, t.BRIDGE_V},
        {t.GRASS, t.FOREST, t.ROAD_H, t.ROAD_V, t.ROAD_X, t.WALL_BOT, t.WALL_TOP, t.WALL_MID, t.FLOOR, t.BRIDGE_H, t.BRIDGE_V},
        RegionGen.TILE.GRASS))

    -- 森林
    Add(CreateTile(t.FOREST, 5,
        {t.FOREST, t.GRASS, t.ROAD_H, t.ROAD_V, t.ROAD_X},
        {t.FOREST, t.GRASS, t.ROAD_H, t.ROAD_V, t.ROAD_X},
        {t.FOREST, t.GRASS, t.ROAD_H, t.ROAD_V, t.ROAD_X},
        {t.FOREST, t.GRASS, t.ROAD_H, t.ROAD_V, t.ROAD_X},
        RegionGen.TILE.TREE))

    -- 水域
    Add(CreateTile(t.WATER, 6,
        {t.WATER, t.SAND, t.BRIDGE_H, t.ICE},
        {t.WATER, t.SAND, t.BRIDGE_H, t.ICE},
        {t.WATER, t.SAND, t.BRIDGE_V, t.ICE},
        {t.WATER, t.SAND, t.BRIDGE_V, t.ICE},
        RegionGen.TILE.WATER))

    -- 沙滩
    Add(CreateTile(t.SAND, 4,
        {t.SAND, t.WATER, t.GRASS, t.DESERT},
        {t.SAND, t.WATER, t.GRASS, t.DESERT},
        {t.SAND, t.WATER, t.GRASS, t.DESERT},
        {t.SAND, t.WATER, t.GRASS, t.DESERT},
        RegionGen.TILE.SAND))

    -- 雪地
    Add(CreateTile(t.SNOW, 4,
        {t.SNOW, t.ICE, t.MOUNTAIN, t.ROAD_H, t.ROAD_V},
        {t.SNOW, t.ICE, t.MOUNTAIN, t.ROAD_H, t.ROAD_V},
        {t.SNOW, t.ICE, t.MOUNTAIN, t.ROAD_H, t.ROAD_V},
        {t.SNOW, t.ICE, t.MOUNTAIN, t.ROAD_H, t.ROAD_V},
        RegionGen.TILE.SNOW_GROUND))

    -- 沼泽
    Add(CreateTile(t.SWAMP, 3,
        {t.SWAMP, t.GRASS, t.WATER, t.ROAD_H, t.ROAD_V},
        {t.SWAMP, t.GRASS, t.WATER, t.ROAD_H, t.ROAD_V},
        {t.SWAMP, t.GRASS, t.WATER, t.ROAD_H, t.ROAD_V},
        {t.SWAMP, t.GRASS, t.WATER, t.ROAD_H, t.ROAD_V},
        RegionGen.TILE.SWAMP_GROUND))

    -- 山脉
    Add(CreateTile(t.MOUNTAIN, 3,
        {t.MOUNTAIN, t.SNOW, t.GRASS},
        {t.MOUNTAIN, t.SNOW, t.GRASS},
        {t.MOUNTAIN, t.SNOW, t.GRASS},
        {t.MOUNTAIN, t.SNOW, t.GRASS},
        RegionGen.TILE.WALL_ROCK))

    -- 道路 水平
    Add(CreateTile(t.ROAD_H, 2,
        {t.GRASS, t.FOREST, t.SNOW, t.SWAMP, t.WALL_BOT, t.FLOOR},
        {t.GRASS, t.FOREST, t.SNOW, t.SWAMP, t.WALL_TOP, t.FLOOR},
        {t.ROAD_H, t.ROAD_X, t.ROAD_V, t.BRIDGE_H},
        {t.ROAD_H, t.ROAD_X, t.ROAD_V, t.BRIDGE_H},
        RegionGen.TILE.ROAD))

    -- 道路 垂直
    Add(CreateTile(t.ROAD_V, 2,
        {t.ROAD_V, t.ROAD_X, t.ROAD_H, t.BRIDGE_V},
        {t.ROAD_V, t.ROAD_X, t.ROAD_H, t.BRIDGE_V},
        {t.GRASS, t.FOREST, t.SNOW, t.SWAMP, t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.FLOOR},
        {t.GRASS, t.FOREST, t.SNOW, t.SWAMP, t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.FLOOR},
        RegionGen.TILE.ROAD))

    -- 道路 交叉
    Add(CreateTile(t.ROAD_X, 1,
        {t.ROAD_V, t.ROAD_X, t.ROAD_H},
        {t.ROAD_V, t.ROAD_X, t.ROAD_H},
        {t.ROAD_H, t.ROAD_X, t.ROAD_V},
        {t.ROAD_H, t.ROAD_X, t.ROAD_V},
        RegionGen.TILE.ROAD))

    -- 墙 顶部
    Add(CreateTile(t.WALL_TOP, 2,
        {t.ROOF, t.WALL_TOP},
        {t.WALL_MID, t.WALL_BOT, t.DOOR, t.GRASS, t.FLOOR, t.ROAD_H, t.ROAD_V},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        RegionGen.TILE.WALL))

    -- 墙 中部
    Add(CreateTile(t.WALL_MID, 2,
        {t.WALL_TOP, t.WALL_MID},
        {t.WALL_MID, t.WALL_BOT, t.DOOR, t.FLOOR},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        RegionGen.TILE.WALL))

    -- 墙 底部
    Add(CreateTile(t.WALL_BOT, 2,
        {t.WALL_MID, t.WALL_TOP},
        {t.FLOOR, t.GRASS, t.ROAD_H, t.ROAD_V},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        {t.WALL_TOP, t.WALL_MID, t.WALL_BOT, t.DOOR, t.ROOF},
        RegionGen.TILE.WALL))

    -- 地板
    Add(CreateTile(t.FLOOR, 4,
        {t.FLOOR, t.WALL_BOT, t.DOOR},
        {t.FLOOR, t.WALL_TOP, t.DOOR},
        {t.FLOOR, t.WALL_BOT, t.WALL_MID, t.WALL_TOP, t.DOOR},
        {t.FLOOR, t.WALL_BOT, t.WALL_MID, t.WALL_TOP, t.DOOR},
        RegionGen.TILE.FLOOR_STONE))

    -- 门
    Add(CreateTile(t.DOOR, 1,
        {t.WALL_TOP, t.WALL_MID, t.FLOOR, t.ROOF},
        {t.WALL_BOT, t.FLOOR, t.GRASS, t.ROAD_H, t.ROAD_V},
        {t.WALL_BOT, t.WALL_MID, t.WALL_TOP, t.DOOR, t.FLOOR},
        {t.WALL_BOT, t.WALL_MID, t.WALL_TOP, t.DOOR, t.FLOOR},
        RegionGen.TILE.DOOR))

    -- 屋顶
    Add(CreateTile(t.ROOF, 3,
        {t.ROOF, t.WALL_TOP},
        {t.WALL_TOP, t.ROOF},
        {t.ROOF, t.WALL_TOP},
        {t.ROOF, t.WALL_TOP},
        RegionGen.TILE.ROOF))

    -- 桥 水平
    Add(CreateTile(t.BRIDGE_H, 1,
        {t.WATER},
        {t.WATER},
        {t.BRIDGE_H, t.GRASS, t.ROAD_H},
        {t.BRIDGE_H, t.GRASS, t.ROAD_H},
        RegionGen.TILE.BRIDGE))

    -- 桥 垂直
    Add(CreateTile(t.BRIDGE_V, 1,
        {t.BRIDGE_V, t.GRASS, t.ROAD_V},
        {t.BRIDGE_V, t.GRASS, t.ROAD_V},
        {t.WATER},
        {t.WATER},
        RegionGen.TILE.BRIDGE))

    -- 岩浆
    Add(CreateTile(t.LAVA, 2,
        {t.LAVA, t.MOUNTAIN, t.WALL_ROCK},
        {t.LAVA, t.MOUNTAIN, t.WALL_ROCK},
        {t.LAVA, t.MOUNTAIN, t.WALL_ROCK},
        {t.LAVA, t.MOUNTAIN, t.WALL_ROCK},
        RegionGen.TILE.LAVA))

    -- 冰
    Add(CreateTile(t.ICE, 2,
        {t.ICE, t.SNOW, t.WATER},
        {t.ICE, t.SNOW, t.WATER},
        {t.ICE, t.SNOW, t.WATER},
        {t.ICE, t.SNOW, t.WATER},
        RegionGen.TILE.ICE))

    RegionGen.WFC_TILESET_DEFAULT = tiles
    return tiles
end

-- ========================================================================
-- 高级 WFC（波函数坍缩）—— 带回溯与带权熵
-- ========================================================================
local function CloneSet(set)
    local copy = {}
    for i = 1, #set do copy[i] = set[i] end
    return copy
end

local function BuildTileLookup(tiles)
    local lookup = {}
    for i = 1, #tiles do
        lookup[tiles[i].name] = tiles[i]
    end
    return lookup
end

local function CanAdjoin(tiles, tileLookup, a, b, dir)
    local ta = tileLookup[a]
    local tb = tileLookup[b]
    if not ta or not tb then return false end
    local opposite = {2, 1, 4, 3}
    local allowedA = false
    for _, v in ipairs(ta.allow[dir] or {}) do if v == b then allowedA = true; break end end
    local allowedB = false
    for _, v in ipairs(tb.allow[opposite[dir]] or {}) do if v == a then allowedB = true; break end end
    return allowedA and allowedB
end

--- 带权 Shannon 熵（越小的 weight 分布越混乱，熵越高）
local function CalcEntropy(options, tileLookup)
    local totalWeight = 0
    for i = 1, #options do
        local t = tileLookup[options[i]]
        totalWeight = totalWeight + (t and t.weight or 1)
    end
    if totalWeight == 0 then return 0 end
    local entropy = 0
    for i = 1, #options do
        local t = tileLookup[options[i]]
        local w = (t and t.weight or 1)
        if w > 0 then
            local p = w / totalWeight
            entropy = entropy - p * math.log(p)
        end
    end
    -- 加入微小噪声避免完全相同的熵值
    return entropy + math.random() * 0.0001
end

--- 按权重随机选择
local function WeightedRandomChoice(options, tileLookup)
    local total = 0
    for i = 1, #options do
        local t = tileLookup[options[i]]
        total = total + (t and t.weight or 1)
    end
    local roll = math.random() * total
    local accum = 0
    for i = 1, #options do
        local t = tileLookup[options[i]]
        local w = (t and t.weight or 1)
        accum = accum + w
        if roll <= accum then return options[i] end
    end
    return options[#options]
end

function RegionGen.WFC(tiles, width, height, maxBacktracks, seed)
    if seed then math.randomseed(seed) end
    width = width or 16
    height = height or 16
    maxBacktracks = maxBacktracks or 50
    local tileLookup = BuildTileLookup(tiles)
    local allNames = {}
    for i = 1, #tiles do allNames[i] = tiles[i].name end

    -- wave[y][x] = {candidates}
    local wave = {}
    for y = 1, height do
        wave[y] = {}
        for x = 1, width do
            wave[y][x] = CloneSet(allNames)
        end
    end

    local stack = {}
    local history = {}

    local function CopyWave()
        local copy = {}
        for y = 1, height do
            copy[y] = {}
            for x = 1, width do
                copy[y][x] = CloneSet(wave[y][x])
            end
        end
        return copy
    end

    local function RestoreWave(snapshot)
        for y = 1, height do
            for x = 1, width do
                wave[y][x] = CloneSet(snapshot[y][x])
            end
        end
    end

    local function Propagate(sx, sy)
        table.insert(stack, {x = sx, y = sy})
        while #stack > 0 do
            local cell = table.remove(stack)
            local cx, cy = cell.x, cell.y
            local options = wave[cy][cx]
            if #options == 0 then return false end
            local dirs = {{dx=0, dy=-1, d=1}, {dx=0, dy=1, d=2}, {dx=-1, dy=0, d=3}, {dx=1, dy=0, d=4}}
            for _, dirInfo in ipairs(dirs) do
                local nx, ny = cx + dirInfo.dx, cy + dirInfo.dy
                if nx >= 1 and nx <= width and ny >= 1 and ny <= height then
                    local neighborOptions = wave[ny][nx]
                    local changed = false
                    for i = #neighborOptions, 1, -1 do
                        local candidate = neighborOptions[i]
                        local possible = false
                        for j = 1, #options do
                            if CanAdjoin(tiles, tileLookup, options[j], candidate, dirInfo.d) then
                                possible = true
                                break
                            end
                        end
                        if not possible then
                            table.remove(neighborOptions, i)
                            changed = true
                        end
                    end
                    if changed then
                        if #neighborOptions == 0 then return false end
                        table.insert(stack, {x = nx, y = ny})
                    end
                end
            end
        end
        return true
    end

    local function Observe()
        local minEntropy = math.huge
        local candidates = {}
        for y = 1, height do
            for x = 1, width do
                local opts = wave[y][x]
                if #opts > 1 then
                    local e = CalcEntropy(opts, tileLookup)
                    if e < minEntropy then
                        minEntropy = e
                        candidates = {{x = x, y = y}}
                    elseif math.abs(e - minEntropy) < 0.00001 then
                        table.insert(candidates, {x = x, y = y})
                    end
                end
            end
        end
        if #candidates == 0 then return true end
        local pick = candidates[math.random(1, #candidates)]
        local opts = wave[pick.y][pick.x]
        local chosen = WeightedRandomChoice(opts, tileLookup)
        wave[pick.y][pick.x] = {chosen}
        return Propagate(pick.x, pick.y)
    end

    local function IsFullyCollapsed()
        for y = 1, height do
            for x = 1, width do
                if #wave[y][x] ~= 1 then return false end
            end
        end
        return true
    end

    local backtracks = 0
    while not IsFullyCollapsed() do
        local snap = CopyWave()
        local ok = Observe()
        if not ok then
            backtracks = backtracks + 1
            if backtracks > maxBacktracks then
                return nil, "WFC 在最大回溯次数内无法求解"
            end
            RestoreWave(snap)
            -- 强制对一个熵最小格子做不同选择
            local minEntropy = math.huge
            local forcedCandidates = {}
            for y = 1, height do
                for x = 1, width do
                    local opts = wave[y][x]
                    if #opts > 1 then
                        local e = CalcEntropy(opts, tileLookup)
                        if e < minEntropy then
                            minEntropy = e
                            forcedCandidates = {{x=x, y=y}}
                        elseif math.abs(e - minEntropy) < 0.00001 then
                            table.insert(forcedCandidates, {x=x, y=y})
                        end
                    end
                end
            end
            if #forcedCandidates == 0 then
                return nil, "WFC 无法继续回溯"
            end
            local pick = forcedCandidates[math.random(1, #forcedCandidates)]
            local opts = wave[pick.y][pick.x]
            if #opts >= 2 then
                -- 禁用上次选中的，换一个
                local bad = WeightedRandomChoice(opts, tileLookup)
                local filtered = {}
                for i = 1, #opts do
                    if opts[i] ~= bad then table.insert(filtered, opts[i]) end
                end
                if #filtered == 0 then filtered = opts end
                wave[pick.y][pick.x] = filtered
                if not Propagate(pick.x, pick.y) then
                    return nil, "WFC 强制选择后传播失败"
                end
            end
        end
    end

    local result = {}
    for y = 1, height do
        result[y] = {}
        for x = 1, width do
            if #wave[y][x] == 0 then
                return nil, "WFC 最终存在空单元"
            end
            result[y][x] = wave[y][x][1]
        end
    end
    return result
end

-- ========================================================================
-- WFC 结果转 TileID 矩阵
-- ========================================================================
function RegionGen.WFCResultToTileMap(result, tiles)
    local lookup = BuildTileLookup(tiles or RegionGen.GetDefaultTiles())
    local tileMap = {}
    for y = 1, #result do
        tileMap[y] = {}
        for x = 1, #result[y] do
            local t = lookup[result[y][x]]
            tileMap[y][x] = t and t.tileId or RegionGen.TILE.GRASS
        end
    end
    return tileMap
end

-- ========================================================================
-- 资源点布置
-- ========================================================================
function RegionGen.PlaceResources(heightmap, biomemap, layout)
    local h = #biomemap
    local w = #biomemap[1]
    local result = layout or {}
    if not layout then
        for y = 1, h do
            result[y] = {}
            for x = 1, w do
                result[y][x] = {tile = RegionGen.TILE.GRASS, resource = nil}
            end
        end
    end
    for y = 1, h do
        for x = 1, w do
            local biome = biomemap[y][x]
            local alt = heightmap[y][x]
            local tile = RegionGen.TILE.GRASS
            local res = nil
            if alt < 25 then
                tile = RegionGen.TILE.WATER
            elseif biome == RegionGen.BIOME.DESERT then
                tile = RegionGen.TILE.SAND
                if math.random() < 0.05 then res = "cactus" end
            elseif biome == RegionGen.BIOME.SNOW then
                tile = RegionGen.TILE.SNOW_GROUND
                if math.random() < 0.08 then res = "snow_rock" end
            elseif biome == RegionGen.BIOME.SWAMP then
                tile = RegionGen.TILE.SWAMP_GROUND
                if math.random() < 0.1 then res = "swamp_reed" end
            elseif biome == RegionGen.BIOME.FOREST then
                tile = RegionGen.TILE.GRASS
                if math.random() < 0.3 then res = "tree" end
            elseif biome == RegionGen.BIOME.JUNGLE then
                tile = RegionGen.TILE.GRASS
                if math.random() < 0.4 then res = "jungle_tree" end
            elseif biome == RegionGen.BIOME.MOUNTAIN then
                tile = RegionGen.TILE.WALL_ROCK
                if math.random() < 0.1 then res = "ore" end
            elseif biome == RegionGen.BIOME.VOLCANO then
                tile = RegionGen.TILE.LAVA
                if math.random() < 0.05 then res = "fire_crystal" end
            elseif biome == RegionGen.BIOME.OCEAN then
                tile = RegionGen.TILE.WATER
                if math.random() < 0.02 then res = "fish" end
            else
                tile = RegionGen.TILE.GRASS
                if math.random() < 0.08 then res = "bush" end
            end
            if alt > 180 and math.random() < 0.15 then
                res = "ore"
            end
            result[y][x] = {tile = tile, resource = res}
        end
    end
    return result
end

-- ========================================================================
-- Tiled JSON 导出 / 导入（增强，支持多图层）
-- ========================================================================
function RegionGen.ExportTiled(regionData)
    regionData = regionData or {}
    local w = regionData.width or (regionData.layout and #regionData.layout[1]) or 32
    local h = regionData.height or (regionData.layout and #regionData.layout) or 32
    local layers = regionData.layers or {}
    if #layers == 0 and regionData.layout then
        local data = {}
        for y = 1, h do
            for x = 1, w do
                local val = regionData.layout[y] and regionData.layout[y][x]
                if type(val) == "table" then
                    table.insert(data, val.tile or 0)
                else
                    table.insert(data, val or 0)
                end
            end
        end
        table.insert(layers, {name = "ground", width = w, height = h, data = data, visible = true, opacity = 1})
    end
    local tiled = {
        width = w,
        height = h,
        tilewidth = 32,
        tileheight = 32,
        orientation = "orthogonal",
        renderorder = "right-down",
        layers = {},
        tilesets = {{firstgid = 1, name = "tao_tiles", tilewidth = 32, tileheight = 32, spacing = 0, margin = 0}},
        properties = {
            seed = regionData.seed or 0,
            generatedAt = regionData.generatedAt or os.time(),
            version = "1.0"
        }
    }
    for i = 1, #layers do
        local lyr = layers[i]
        local jsonLayer = {
            name = lyr.name or ("layer_" .. i),
            width = lyr.width or w,
            height = lyr.height or h,
            data = lyr.data or {},
            visible = lyr.visible ~= false,
            opacity = lyr.opacity or 1,
            type = "tilelayer",
            x = 0, y = 0
        }
        table.insert(tiled.layers, jsonLayer)
    end
    if SimpleEncode then
        return SimpleEncode(tiled)
    else
        local function Serialize(val, indent)
            indent = indent or 0
            local pad = string.rep("  ", indent)
            local t = type(val)
            if t == "number" or t == "boolean" then
                return tostring(val)
            elseif t == "string" then
                return '"' .. val:gsub('\\', '\\\\'):gsub('"', '\\"'):gsub("\n", "\\n") .. '"'
            elseif t == "table" then
                if #val > 0 and next(val, #val) == nil then
                    local items = {}
                    for _, v in ipairs(val) do
                        table.insert(items, Serialize(v, indent + 1))
                    end
                    return "[\n" .. pad .. "  " .. table.concat(items, ",\n" .. pad .. "  ") .. "\n" .. pad .. "]"
                else
                    local items = {}
                    for k, v in pairs(val) do
                        table.insert(items, pad .. "  " .. Serialize(tostring(k), 0) .. ": " .. Serialize(v, indent + 1))
                    end
                    return "{\n" .. table.concat(items, ",\n") .. "\n" .. pad .. "}"
                end
            else
                return "null"
            end
        end
        return Serialize(tiled)
    end
end

function RegionGen.ImportTiled(jsonStr)
    local data
    if SimpleDecode then
        local ok, decoded = pcall(SimpleDecode, jsonStr)
        if ok then data = decoded else data = {} end
    else
        data = {}
    end
    if not data then return nil end
    local w = data.width or 32
    local h = data.height or 32
    local layersData = {}
    if data.layers then
        for i = 1, #data.layers do
            local lyr = data.layers[i]
            local flat = lyr.data or {}
            local layout = {}
            for y = 1, h do
                layout[y] = {}
                for x = 1, w do
                    local idx = (y - 1) * w + x
                    layout[y][x] = flat[idx] or 0
                end
            end
            layersData[lyr.name or ("layer_" .. i)] = {
                width = lyr.width or w,
                height = lyr.height or h,
                layout = layout,
                visible = lyr.visible,
                opacity = lyr.opacity
            }
        end
    end
    return {
        width = w,
        height = h,
        layers = layersData,
        seed = (data.properties and data.properties.seed) or 0,
        generatedAt = (data.properties and data.properties.generatedAt) or 0
    }
end

-- ========================================================================
-- 调试可视化辅助
-- ========================================================================
function RegionGen.ToASCII(layout)
    local symbols = {
        [0]=".", [1]="#", [2]="+", [3]="=",
        [4]="\"", [5]="~", [6]="T", [7]="o",
        [8]="*", [9]="s", [10]="%", [11]="!",
        [12]="I", [13]="_", [14]="-", [15]="B",
        [16]="R", [17]="^", [18]="|", [19]="f"
    }
    local lines = {}
    for y = 1, #layout do
        local line = {}
        for x = 1, #layout[y] do
            local val = layout[y][x]
            if type(val) == "table" then val = val.tile or 0 end
            table.insert(line, symbols[val] or "?")
        end
        table.insert(lines, table.concat(line))
    end
    return table.concat(lines, "\n")
end

function RegionGen.PrintLayout(layout)
    print(RegionGen.ToASCII(layout))
end

-- ========================================================================
-- BSP 房间布局生成（经典 Roguelike）
-- ========================================================================
function RegionGen.GenerateLayout(seed, width, height)
    width = width or 32
    height = height or 32
    math.randomseed(seed)
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            map[y][x] = RegionGen.TILE.WALL
        end
    end
    local rooms = {}
    local roomCount = math.random(4, 8)
    for i = 1, roomCount do
        local rw = math.random(4, 10)
        local rh = math.random(4, 10)
        local rx = math.random(2, width - rw - 1)
        local ry = math.random(2, height - rh - 1)
        local overlap = false
        for _, r in ipairs(rooms) do
            if rx < r.x + r.w + 2 and rx + rw + 2 > r.x and
               ry < r.y + r.h + 2 and ry + rh + 2 > r.y then
                overlap = true
                break
            end
        end
        if not overlap then
            table.insert(rooms, {x=rx, y=ry, w=rw, h=rh, cx=math.floor(rx+rw/2), cy=math.floor(ry+rh/2)})
            for y = ry, ry + rh - 1 do
                for x = rx, rx + rw - 1 do
                    map[y][x] = RegionGen.TILE.EMPTY
                end
            end
        end
    end
    -- 连接房间
    for i = 1, #rooms - 1 do
        local r1 = rooms[i]
        local r2 = rooms[i + 1]
        local cx1, cy1 = r1.cx, r1.cy
        local cx2, cy2 = r2.cx, r2.cy
        if math.random() < 0.5 then
            local x = cx1
            while x ~= cx2 do
                if map[cy1][x] == RegionGen.TILE.WALL then map[cy1][x] = RegionGen.TILE.ROAD end
                x = x + (x < cx2 and 1 or -1)
            end
            local y = cy1
            while y ~= cy2 do
                if map[y][cx2] == RegionGen.TILE.WALL then map[y][cx2] = RegionGen.TILE.ROAD end
                y = y + (y < cy2 and 1 or -1)
            end
        else
            local y = cy1
            while y ~= cy2 do
                if map[y][cx1] == RegionGen.TILE.WALL then map[y][cx1] = RegionGen.TILE.ROAD end
                y = y + (y < cy2 and 1 or -1)
            end
            local x = cx1
            while x ~= cx2 do
                if map[cy2][x] == RegionGen.TILE.WALL then map[cy2][x] = RegionGen.TILE.ROAD end
                x = x + (x < cx2 and 1 or -1)
            end
        end
    end
    -- 强制边缘墙
    for y = 1, height do
        map[y][1] = RegionGen.TILE.WALL
        map[y][width] = RegionGen.TILE.WALL
    end
    for x = 1, width do
        map[1][x] = RegionGen.TILE.WALL
        map[height][x] = RegionGen.TILE.WALL
    end
    -- 门
    for _, r in ipairs(rooms) do
        for attempt = 1, 4 do
            local side = math.random(1, 4)
            local dx, dy = r.cx, r.cy
            if side == 1 then dy = r.y
            elseif side == 2 then dy = r.y + r.h - 1
            elseif side == 3 then dx = r.x
            else dx = r.x + r.w - 1
            end
            if dy >= 2 and dy <= height - 1 and dx >= 2 and dx <= width - 1 then
                map[dy][dx] = RegionGen.TILE.DOOR
                break
            end
        end
    end
    return map, rooms
end

function RegionGen.PlaceBuilding(heightmap, layout, buildingSize)
    buildingSize = buildingSize or 6
    local width = #layout[1]
    local height = #layout
    local candidates = {}
    for y = 2, height - buildingSize - 1 do
        for x = 2, width - buildingSize - 1 do
            local flat = true
            local avgHeight = 0
            for by = 0, buildingSize - 1 do
                for bx = 0, buildingSize - 1 do
                    if layout[y + by][x + bx] ~= RegionGen.TILE.EMPTY then
                        flat = false
                        break
                    end
                    avgHeight = avgHeight + heightmap[y + by][x + bx]
                end
                if not flat then break end
            end
            if flat then
                avgHeight = avgHeight / (buildingSize * buildingSize)
                table.insert(candidates, {x = x, y = y, h = avgHeight})
            end
        end
    end
    if #candidates == 0 then return nil end
    table.sort(candidates, function(a, b) return math.abs(a.h - 128) < math.abs(b.h - 128) end)
    return candidates[1]
end

-- ========================================================================
-- 自动生成全区域快捷函数
-- ========================================================================
function RegionGen.GenerateOverworld(seed, width, height)
    seed = seed or math.random(1, 1000000)
    local biomemap, heightmap, tempmap, moistmap = RegionGen.GenerateBiomeMap(seed, width, height)
    local resources = RegionGen.PlaceResources(heightmap, biomemap)
    local wfcTiles = RegionGen.GetDefaultTiles()
    local wfcResult, err = RegionGen.WFC(wfcTiles, math.floor(width / 4), math.floor(height / 4), 50, seed)
    return {
        type = "overworld",
        seed = seed,
        width = width,
        height = height,
        biomemap = biomemap,
        heightmap = heightmap,
        tempmap = tempmap,
        moistmap = moistmap,
        resources = resources,
        wfcPreview = wfcResult,
        generatedAt = os.time()
    }
end

function RegionGen.GenerateDungeon(seed, width, height)
    seed = seed or math.random(1, 1000000)
    local layout, rooms = RegionGen.GenerateLayout(seed, width, height)
    -- 对墙壁区域执行 CA 平滑
    local caMap = {}
    for y = 1, height do
        caMap[y] = {}
        for x = 1, width do
            caMap[y][x] = (layout[y][x] == RegionGen.TILE.WALL) and 1 or 0
        end
    end
    caMap = RegionGen.CellularAutomataAdvanced(caMap, "cave", 2)
    for y = 1, height do
        for x = 1, width do
            if caMap[y][x] == 1 then
                layout[y][x] = RegionGen.TILE.WALL
            elseif layout[y][x] == RegionGen.TILE.WALL then
                layout[y][x] = RegionGen.TILE.EMPTY
            end
        end
    end
    return {
        type = "dungeon",
        seed = seed,
        width = width,
        height = height,
        layout = layout,
        rooms = rooms,
        generatedAt = os.time()
    }
end

function RegionGen.GenerateInterior(seed, width, height)
    seed = seed or math.random(1, 1000000)
    math.randomseed(seed)
    local layout = {}
    for y = 1, height do
        layout[y] = {}
        for x = 1, width do
            layout[y][x] = RegionGen.TILE.FLOOR_STONE
        end
    end
    -- 外墙
    for y = 1, height do
        layout[y][1] = RegionGen.TILE.WALL_BRICK
        layout[y][width] = RegionGen.TILE.WALL_BRICK
    end
    for x = 1, width do
        layout[1][x] = RegionGen.TILE.WALL_BRICK
        layout[height][x] = RegionGen.TILE.WALL_BRICK
    end
    -- 内部分隔墙
    local wallCount = math.random(1, 3)
    for i = 1, wallCount do
        if math.random() < 0.5 then
            local wx = math.random(3, width - 2)
            for y = 2, height - 1 do
                if math.random() > 0.15 then
                    layout[y][wx] = RegionGen.TILE.WALL_BRICK
                else
                    layout[y][wx] = RegionGen.TILE.DOOR
                end
            end
        else
            local wy = math.random(3, height - 2)
            for x = 2, width - 1 do
                if math.random() > 0.15 then
                    layout[wy][x] = RegionGen.TILE.WALL_BRICK
                else
                    layout[wy][x] = RegionGen.TILE.DOOR
                end
            end
        end
    end
    return {
        type = "interior",
        seed = seed,
        width = width,
        height = height,
        layout = layout,
        generatedAt = os.time()
    }
end

-- ========================================================================
-- 迷宫生成（递归回溯算法）
-- ========================================================================
function RegionGen.GenerateMaze(seed, width, height)
    seed = seed or math.random(1, 1000000)
    math.randomseed(seed)
    width = width or 21
    height = height or 21
    if width % 2 == 0 then width = width + 1 end
    if height % 2 == 0 then height = height + 1 end
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            map[y][x] = RegionGen.TILE.WALL
        end
    end
    local function Carve(cx, cy)
        map[cy][cx] = RegionGen.TILE.EMPTY
        local dirs = {{0,-2},{0,2},{-2,0},{2,0}}
        -- Fisher-Yates shuffle
        for i = #dirs, 2, -1 do
            local j = math.random(1, i)
            dirs[i], dirs[j] = dirs[j], dirs[i]
        end
        for _, d in ipairs(dirs) do
            local nx, ny = cx + d[1], cy + d[2]
            if nx > 1 and nx < width and ny > 1 and ny < height and map[ny][nx] == RegionGen.TILE.WALL then
                map[cy + d[2]/2][cx + d[1]/2] = RegionGen.TILE.EMPTY
                Carve(nx, ny)
            end
        end
    end
    Carve(2, 2)
    -- 入口出口
    map[2][1] = RegionGen.TILE.DOOR
    map[height - 1][width] = RegionGen.TILE.DOOR
    return map
end

-- ========================================================================
-- BSP 递归地牢（更复杂的房间分割与连接）
-- ========================================================================
function RegionGen.GenerateBSPDungeon(seed, width, height, minRoomSize)
    seed = seed or math.random(1, 1000000)
    math.randomseed(seed)
    width = width or 64
    height = height or 64
    minRoomSize = minRoomSize or 8
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            map[y][x] = RegionGen.TILE.WALL
        end
    end
    local leafs = {}
    local function Split(region)
        if region.w <= minRoomSize * 2 or region.h <= minRoomSize * 2 then
            table.insert(leafs, region)
            return
        end
        if math.random() < 0.5 and region.w >= region.h then
            -- 垂直切
            local splitAt = math.random(minRoomSize, region.w - minRoomSize)
            Split({x = region.x, y = region.y, w = splitAt, h = region.h})
            Split({x = region.x + splitAt, y = region.y, w = region.w - splitAt, h = region.h})
        else
            -- 水平切
            local splitAt = math.random(minRoomSize, region.h - minRoomSize)
            Split({x = region.x, y = region.y, w = region.w, h = splitAt})
            Split({x = region.x, y = region.y + splitAt, w = region.w, h = region.h - splitAt})
        end
    end
    Split({x = 1, y = 1, w = width - 1, h = height - 1})
    local rooms = {}
    for _, leaf in ipairs(leafs) do
        local rw = math.random(minRoomSize - 2, leaf.w - 2)
        local rh = math.random(minRoomSize - 2, leaf.h - 2)
        local rx = leaf.x + math.random(1, leaf.w - rw - 1)
        local ry = leaf.y + math.random(1, leaf.h - rh - 1)
        for y = ry, ry + rh - 1 do
            for x = rx, rx + rw - 1 do
                map[y][x] = RegionGen.TILE.EMPTY
            end
        end
        table.insert(rooms, {x = rx, y = ry, w = rw, h = rh, cx = math.floor(rx + rw / 2), cy = math.floor(ry + rh / 2)})
    end
    -- 连接相邻叶子房间（简化：按顺序连接）
    for i = 1, #rooms - 1 do
        local r1 = rooms[i]
        local r2 = rooms[i + 1]
        local cx1, cy1 = r1.cx, r1.cy
        local cx2, cy2 = r2.cx, r2.cy
        -- L 形走廊
        local x = cx1
        while x ~= cx2 do
            if map[cy1][x] == RegionGen.TILE.WALL then map[cy1][x] = RegionGen.TILE.ROAD end
            x = x + (x < cx2 and 1 or -1)
        end
        local y = cy1
        while y ~= cy2 do
            if map[y][cx2] == RegionGen.TILE.WALL then map[y][cx2] = RegionGen.TILE.ROAD end
            y = y + (y < cy2 and 1 or -1)
        end
    end
    return map, rooms, leafs
end

-- ========================================================================
-- 河流雕刻（基于梯度下降）
-- ========================================================================
function RegionGen.CarveRivers(heightmap, layout, riverCount)
    local h = #heightmap
    local w = #heightmap[1]
    riverCount = riverCount or 3
    math.randomseed(os.time())
    for r = 1, riverCount do
        local x = math.random(2, w - 1)
        local y = math.random(2, h - 1)
        local steps = 0
        while steps < w * h do
            steps = steps + 1
            layout[y][x] = RegionGen.TILE.WATER
            -- 找周围最低的邻居
            local bestH = heightmap[y][x]
            local bestX, bestY = x, y
            local dirs = {{0,-1},{0,1},{-1,0},{1,0},{-1,-1},{1,-1},{-1,1},{1,1}}
            for _, d in ipairs(dirs) do
                local nx, ny = x + d[1], y + d[2]
                if nx >= 1 and nx <= w and ny >= 1 and ny <= h then
                    if heightmap[ny][nx] < bestH then
                        bestH = heightmap[ny][nx]
                        bestX, bestY = nx, ny
                    end
                end
            end
            if bestX == x and bestY == y then break end
            x, y = bestX, bestY
            if heightmap[y][x] < 10 then break end -- 到达海洋
        end
    end
    return layout
end

-- ========================================================================
-- 道路网生成（基于 MST 的简化版）
-- ========================================================================
function RegionGen.GenerateRoadNetwork(width, height, cityCount, seed)
    seed = seed or math.random(1, 1000000)
    math.randomseed(seed)
    width = width or 64
    height = height or 64
    cityCount = cityCount or 6
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            map[y][x] = RegionGen.TILE.GRASS
        end
    end
    local cities = RegionGen.PoissonDisk(width, height, 12, 30)
    if #cities > cityCount then
        local trimmed = {}
        for i = 1, cityCount do trimmed[i] = cities[i] end
        cities = trimmed
    end
    -- 简单 MST：每个新城市连到已连接集合中最近的
    local connected = {1}
    local edges = {}
    while #connected < #cities do
        local bestDist = math.huge
        local bestFrom, bestTo = nil, nil
        for _, ci in ipairs(connected) do
            for j = 1, #cities do
                local found = false
                for _, v in ipairs(connected) do if v == j then found = true; break end end
                if not found then
                    local c1 = cities[ci]
                    local c2 = cities[j]
                    local dist = math.sqrt((c1.x - c2.x)^2 + (c1.y - c2.y)^2)
                    if dist < bestDist then
                        bestDist = dist
                        bestFrom = ci
                        bestTo = j
                    end
                end
            end
        end
        if bestFrom and bestTo then
            table.insert(edges, {from = cities[bestFrom], to = cities[bestTo]})
            table.insert(connected, bestTo)
        else
            break
        end
    end
    -- 画道路
    for _, e in ipairs(edges) do
        local x = math.floor(e.from.x)
        local y = math.floor(e.from.y)
        local tx = math.floor(e.to.x)
        local ty = math.floor(e.to.y)
        while x ~= tx do
            if y >= 1 and y <= height and x >= 1 and x <= width then
                map[y][x] = RegionGen.TILE.ROAD
            end
            x = x + (x < tx and 1 or -1)
        end
        while y ~= ty do
            if y >= 1 and y <= height and x >= 1 and x <= width then
                map[y][x] = RegionGen.TILE.ROAD
            end
            y = y + (y < ty and 1 or -1)
        end
        -- 城市标记
        if ty >= 1 and ty <= height and tx >= 1 and tx <= width then
            map[ty][tx] = RegionGen.TILE.EMPTY
        end
    end
    return map, cities, edges
end

-- ========================================================================
-- Voronoi 图（简化版，用于生物群系边界细化）
-- ========================================================================
function RegionGen.GenerateVoronoiMap(seed, width, height, pointCount)
    seed = seed or math.random(1, 1000000)
    math.randomseed(seed)
    width = width or 64
    height = height or 64
    pointCount = pointCount or 8
    local points = {}
    for i = 1, pointCount do
        points[i] = {x = math.random(1, width), y = math.random(1, height), biome = math.random(1, 5)}
    end
    local map = {}
    for y = 1, height do
        map[y] = {}
        for x = 1, width do
            local bestDist = math.huge
            local bestBiome = 1
            for _, p in ipairs(points) do
                local dist = (x - p.x)^2 + (y - p.y)^2
                if dist < bestDist then
                    bestDist = dist
                    bestBiome = p.biome
                end
            end
            map[y][x] = bestBiome
        end
    end
    return map, points
end

-- ========================================================================
-- A* 寻路
-- ========================================================================
function RegionGen.AStar(layout, startX, startY, goalX, goalY, passableFunc)
    passableFunc = passableFunc or function(tile)
        return tile == RegionGen.TILE.EMPTY or tile == RegionGen.TILE.ROAD or tile == RegionGen.TILE.DOOR or tile == RegionGen.TILE.GRASS
    end
    local h = #layout
    local w = #layout[1]
    local function Heuristic(x1, y1, x2, y2)
        return math.abs(x1 - x2) + math.abs(y1 - y2)
    end
    local openSet = {}
    local openLookup = {}
    local closedSet = {}
    local cameFrom = {}
    local gScore = {}
    local fScore = {}
    local function Key(x, y) return y * 10000 + x end
    local startKey = Key(startX, startY)
    gScore[startKey] = 0
    fScore[startKey] = Heuristic(startX, startY, goalX, goalY)
    table.insert(openSet, {x = startX, y = startY, f = fScore[startKey], key = startKey})
    openLookup[startKey] = true
    while #openSet > 0 do
        -- 找 f 最小的
        local bestIdx = 1
        for i = 2, #openSet do
            if openSet[i].f < openSet[bestIdx].f then bestIdx = i end
        end
        local current = table.remove(openSet, bestIdx)
        openLookup[current.key] = nil
        if current.x == goalX and current.y == goalY then
            local path = {}
            local k = current.key
            while k do
                local cx = math.floor(k % 10000)
                local cy = math.floor(k / 10000)
                table.insert(path, 1, {x = cx, y = cy})
                k = cameFrom[k]
            end
            return path
        end
        closedSet[current.key] = true
        local dirs = {{0,-1},{0,1},{-1,0},{1,0}}
        for _, d in ipairs(dirs) do
            local nx, ny = current.x + d[1], current.y + d[2]
            if nx >= 1 and nx <= w and ny >= 1 and ny <= h then
                local nKey = Key(nx, ny)
                local tile = layout[ny][nx]
                if type(tile) == "table" then tile = tile.tile or 0 end
                if passableFunc(tile) and not closedSet[nKey] then
                    local tentativeG = (gScore[current.key] or 0) + 1
                    if not gScore[nKey] or tentativeG < gScore[nKey] then
                        cameFrom[nKey] = current.key
                        gScore[nKey] = tentativeG
                        fScore[nKey] = tentativeG + Heuristic(nx, ny, goalX, goalY)
                        if not openLookup[nKey] then
                            table.insert(openSet, {x = nx, y = ny, f = fScore[nKey], key = nKey})
                            openLookup[nKey] = true
                        end
                    end
                end
            end
        end
    end
    return nil -- 无路
end

-- ========================================================================
-- 泛洪填充（Flood Fill）
-- ========================================================================
function RegionGen.FloodFill(layout, startX, startY, targetVal, replacementVal)
    local h = #layout
    local w = #layout[1]
    local function GetVal(x, y)
        local v = layout[y][x]
        if type(v) == "table" then return v.tile or 0 end
        return v
    end
    local startVal = GetVal(startX, startY)
    if startVal == replacementVal then return layout end
    targetVal = targetVal or startVal
    local stack = {{startX, startY}}
    local visited = {}
    while #stack > 0 do
        local cx, cy = unpack(table.remove(stack))
        local key = cy * 10000 + cx
        if not visited[key] then
            visited[key] = true
            if GetVal(cx, cy) == targetVal then
                if type(layout[cy][cx]) == "table" then
                    layout[cy][cx].tile = replacementVal
                else
                    layout[cy][cx] = replacementVal
                end
                local dirs = {{0,-1},{0,1},{-1,0},{1,0}}
                for _, d in ipairs(dirs) do
                    local nx, ny = cx + d[1], cy + d[2]
                    if nx >= 1 and nx <= w and ny >= 1 and ny <= h then
                        table.insert(stack, {nx, ny})
                    end
                end
            end
        end
    end
    return layout
end

-- ========================================================================
-- 连通区域标记
-- ========================================================================
function RegionGen.LabelConnectedComponents(layout, passableFunc)
    passableFunc = passableFunc or function(v) return v == RegionGen.TILE.EMPTY or v == RegionGen.TILE.ROAD or v == RegionGen.TILE.DOOR end
    local h = #layout
    local w = #layout[1]
    local labels = {}
    for y = 1, h do
        labels[y] = {}
        for x = 1, w do
            labels[y][x] = 0
        end
    end
    local currentLabel = 0
    for y = 1, h do
        for x = 1, w do
            local v = layout[y][x]
            if type(v) == "table" then v = v.tile or 0 end
            if labels[y][x] == 0 and passableFunc(v) then
                currentLabel = currentLabel + 1
                local stack = {{x, y}}
                while #stack > 0 do
                    local cx, cy = unpack(table.remove(stack))
                    if labels[cy][cx] == 0 then
                        labels[cy][cx] = currentLabel
                        local dirs = {{0,-1},{0,1},{-1,0},{1,0}}
                        for _, d in ipairs(dirs) do
                            local nx, ny = cx + d[1], cy + d[2]
                            if nx >= 1 and nx <= w and ny >= 1 and ny <= h then
                                local nv = layout[ny][nx]
                                if type(nv) == "table" then nv = nv.tile or 0 end
                                if labels[ny][nx] == 0 and passableFunc(nv) then
                                    table.insert(stack, {nx, ny})
                                end
                            end
                        end
                    end
                end
            end
        end
    end
    return labels, currentLabel
end

-- ========================================================================
-- 距离变换（到最近墙壁的距离）
-- ========================================================================
function RegionGen.DistanceTransform(layout, wallVal)
    wallVal = wallVal or RegionGen.TILE.WALL
    local h = #layout
    local w = #layout[1]
    local dt = {}
    for y = 1, h do
        dt[y] = {}
        for x = 1, w do
            local v = layout[y][x]
            if type(v) == "table" then v = v.tile or 0 end
            dt[y][x] = (v == wallVal) and 0 or math.huge
        end
    end
    local changed = true
    while changed do
        changed = false
        for y = 1, h do
            for x = 1, w do
                if dt[y][x] > 0 then
                    local minNeighbor = dt[y][x]
                    for dy = -1, 1 do
                        for dx = -1, 1 do
                            if not (dx == 0 and dy == 0) then
                                local nx, ny = x + dx, y + dy
                                if nx >= 1 and nx <= w and ny >= 1 and ny <= h then
                                    if dt[ny][nx] + 1 < minNeighbor then
                                        minNeighbor = dt[ny][nx] + 1
                                    end
                                end
                            end
                        end
                    end
                    if minNeighbor < dt[y][x] then
                        dt[y][x] = minNeighbor
                        changed = true
                    end
                end
            end
        end
    end
    return dt
end

-- ========================================================================
-- 导出为 CSV（用于数据分析）
-- ========================================================================
function RegionGen.ExportCSV(layout)
    local lines = {}
    for y = 1, #layout do
        local cells = {}
        for x = 1, #layout[y] do
            local v = layout[y][x]
            if type(v) == "table" then v = v.tile or 0 end
            table.insert(cells, tostring(v))
        end
        table.insert(lines, table.concat(cells, ","))
    end
    return table.concat(lines, "\n")
end

-- ========================================================================
-- 从 CSV 导入
-- ========================================================================
function RegionGen.ImportCSV(csvStr)
    local layout = {}
    for line in csvStr:gmatch("([^\r\n]+)") do
        local row = {}
        for cell in line:gmatch("([^,]+)") do
            table.insert(row, tonumber(cell) or 0)
        end
        table.insert(layout, row)
    end
    return layout
end

-- ========================================================================
-- 获取地图统计信息
-- ========================================================================
function RegionGen.AnalyzeMap(layout)
    local stats = {counts = {}, total = 0, width = 0, height = 0}
    local h = #layout
    local w = h > 0 and #layout[1] or 0
    stats.height = h
    stats.width = w
    for y = 1, h do
        for x = 1, w do
            local v = layout[y][x]
            if type(v) == "table" then v = v.tile or 0 end
            stats.counts[v] = (stats.counts[v] or 0) + 1
            stats.total = stats.total + 1
        end
    end
    return stats
end

-- ========================================================================
-- 降雨模拟（简单水文侵蚀）
-- ========================================================================
function RegionGen.SimulateRainfall(heightmap, iterations)
    local h = #heightmap
    local w = #heightmap[1]
    local water = {}
    for y = 1, h do
        water[y] = {}
        for x = 1, w do
            water[y][x] = 1
        end
    end
    for iter = 1, (iterations or 10) do
        local newWater = {}
        for y = 1, h do
            newWater[y] = {}
            for x = 1, w do
                newWater[y][x] = water[y][x] + 1
            end
        end
        for y = 2, h - 1 do
            for x = 2, w - 1 do
                local lowestX, lowestY = x, y
                local lowestH = heightmap[y][x]
                for dy = -1, 1 do
                    for dx = -1, 1 do
                        if not (dx == 0 and dy == 0) then
                            local nx, ny = x + dx, y + dy
                            local eh = heightmap[ny][nx] - water[ny][nx] * 0.1
                            if eh < lowestH then
                                lowestH = eh
                                lowestX, lowestY = nx, ny
                            end
                        end
                    end
                end
                if lowestX ~= x or lowestY ~= y then
                    local flow = math.min(water[y][x] * 0.2, newWater[y][x])
                    newWater[y][x] = newWater[y][x] - flow
                    newWater[lowestY][lowestX] = newWater[lowestY][lowestX] + flow
                end
            end
        end
        water = newWater
    end
    return water
end

-- ========================================================================
-- 侵蚀模拟（热侵蚀）
-- ========================================================================
function RegionGen.ThermalErosion(heightmap, talusAngle, iterations)
    talusAngle = talusAngle or 4
    iterations = iterations or 5
    local h = #heightmap
    local w = #heightmap[1]
    local result = {}
    for y = 1, h do
        result[y] = {}
        for x = 1, w do
            result[y][x] = heightmap[y][x]
        end
    end
    for iter = 1, iterations do
        for y = 2, h - 1 do
            for x = 2, w - 1 do
                local maxDiff = 0
                local maxX, maxY = x, y
                for dy = -1, 1 do
                    for dx = -1, 1 do
                        if not (dx == 0 and dy == 0) then
                            local nx, ny = x + dx, y + dy
                            local diff = result[y][x] - result[ny][nx]
                            if diff > maxDiff then
                                maxDiff = diff
                                maxX, maxY = nx, ny
                            end
                        end
                    end
                end
                if maxDiff > talusAngle then
                    local amount = (maxDiff - talusAngle) * 0.5
                    result[y][x] = result[y][x] - amount
                    result[maxY][maxX] = result[maxY][maxX] + amount
                end
            end
        end
    end
    return result
end

-- ========================================================================
-- 温度混合（根据纬度和海拔调整）
-- ========================================================================
function RegionGen.BlendTemperature(tempmap, heightmap)
    local h = #tempmap
    local w = #tempmap[1]
    local blended = {}
    for y = 1, h do
        blended[y] = {}
        for x = 1, w do
            local base = tempmap[y][x]
            local alt = heightmap[y][x]
            local altitudePenalty = (alt / 255) * 60
            local lat = math.abs(y - h / 2) / (h / 2)
            local latPenalty = lat * 40
            blended[y][x] = math.floor(math.max(0, base - altitudePenalty - latPenalty))
        end
    end
    return blended
end

-- ========================================================================
-- 获取区域的边界框（从 layout 中提取非空区域）
-- ========================================================================
function RegionGen.GetBoundingBox(layout, emptyVal)
    emptyVal = emptyVal or RegionGen.TILE.EMPTY
    local h = #layout
    local w = h > 0 and #layout[1] or 0
    local minX, minY = w + 1, h + 1
    local maxX, maxY = 0, 0
    for y = 1, h do
        for x = 1, w do
            local v = layout[y][x]
            if type(v) == "table" then v = v.tile or 0 end
            if v ~= emptyVal then
                if x < minX then minX = x end
                if y < minY then minY = y end
                if x > maxX then maxX = x end
                if y > maxY then maxY = y end
            end
        end
    end
    if maxX == 0 then return nil end
    return {x = minX, y = minY, w = maxX - minX + 1, h = maxY - minY + 1}
end

-- ========================================================================
-- 缓存与持久化
-- ========================================================================
RegionGen.savedRegions = RegionGen.savedRegions or {}

function RegionGen.SaveRegion(regionId, regionData)
    regionData.savedAt = (GetWorldTime and GetWorldTime()) or os.time()
    RegionGen.savedRegions[regionId] = regionData
    if sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            db:exec([[CREATE TABLE IF NOT EXISTS regions (region_id TEXT PRIMARY KEY, data TEXT, saved_at INTEGER);]])
            local stmt = db:prepare("INSERT OR REPLACE INTO regions (region_id, data, saved_at) VALUES (?, ?, ?)")
            if stmt and SimpleEncode then
                stmt:bind_values(regionId, SimpleEncode(regionData), regionData.savedAt)
                stmt:step()
                stmt:finalize()
            end
            db:close()
        end
    end
end

function RegionGen.LoadRegion(regionId)
    if RegionGen.savedRegions[regionId] then
        return RegionGen.savedRegions[regionId]
    end
    if sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local sql = "SELECT * FROM regions WHERE region_id = '" .. tostring(regionId) .. "'"
            for row in db:nrows(sql) do
                local ok, decoded = pcall(function() return SimpleDecode(row.data) end)
                if ok and decoded then
                    RegionGen.savedRegions[regionId] = decoded
                    db:close()
                    return decoded
                end
            end
            db:close()
        end
    end
    return nil
end

function RegionGen.GenerateAndSave(regionId, seed, layoutW, layoutH, heightW, heightH, buildingSize)
    seed = seed or math.random(1, 100000)
    local layout, rooms = RegionGen.GenerateLayout(seed, layoutW, layoutH)
    local height = RegionGen.GenerateHeightmap(seed + 1, heightW, heightH)
    local buildingPos = RegionGen.PlaceBuilding(height, layout, buildingSize)
    local regionData = {
        id = regionId,
        seed = seed,
        layout = layout,
        height = height,
        rooms = rooms,
        buildingPos = buildingPos,
        generatedAt = (GetWorldTime and GetWorldTime()) or os.time()
    }
    RegionGen.SaveRegion(regionId, regionData)
    return regionData
end
