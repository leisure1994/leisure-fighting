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

-- ============================================================================
-- 1) Internal Noise Helpers (simplified Perlin for independence)
-- ============================================================================
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
    local X = math.floor(x) % 256
    local Y = math.floor(y) % 256
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
    octaves = octaves or 4
    gain = gain or 0.5
    lacunarity = lacunarity or 2.0
    local total, amp, freq, maxv = 0, 1, 1, 0
    for i = 1, octaves do
        total = total + perlin2d(x * freq, y * freq, perm) * amp
        maxv = maxv + amp
        amp = amp * gain
        freq = freq * lacunarity
    end
    return total / maxv
end

-- ============================================================================
-- 2) Biome Definition
-- ============================================================================
--[[
Biome 结构:
{
    id = "grassland",
    name = "草原",
    -- 条件范围 (0..1)
    temperature = { min = 0.3, max = 0.7, weight = 1.0 },
    humidity    = { min = 0.2, max = 0.6, weight = 1.0 },
    elevation   = { min = 0.0, max = 0.5, weight = 1.0 },
    special     = { min = 0.0, max = 1.0, weight = 1.0 }, -- 特殊噪声，例如魔法污染

    -- 视觉/数据绑定
    color       = { r = 0.2, g = 0.7, b = 0.2 },
    tileId      = 3,
    textures    = { ground = "grass.jpg", tree = "oak.mdl" },
    vegetationDensity = 0.4,
    waterLevel  = 0.2,

    -- 自定义数据
    data = {}
}
]]

function BiomeSystem.new(config)
    config = config or {}
    local self = setmetatable({}, BiomeSystem)
    self.seed = config.seed or 1337
    self.width = config.width or 256
    self.height = config.height or 256

    -- noise configs for each dimension
    self.tempConfig  = config.temperature or { scale = 2.0, octaves = 4, gain = 0.5, lacunarity = 2.0 }
    self.humidConfig = config.humidity    or { scale = 2.5, octaves = 4, gain = 0.5, lacunarity = 2.0 }
    self.elevConfig  = config.elevation   or { scale = 1.0, octaves = 6, gain = 0.5, lacunarity = 2.0 }
    self.specConfig  = config.special     or { scale = 4.0, octaves = 3, gain = 0.5, lacunarity = 2.0 }

    -- blending edge width (0 = sharp, 0.1 = smooth)
    self.blendWidth = config.blendWidth or 0.05

    self.biomes = {}
    self.perm = build_perm(self.seed)
    return self
end

function BiomeSystem:add_biome(def)
    table.insert(self.biomes, def)
end

-- ============================================================================
-- 3) Sample noise dimensions at world coordinates
-- ============================================================================
function BiomeSystem:sample_dimensions(wx, wy)
    local t  = (fbm2d(wx, wy, self.perm, self.tempConfig.octaves,
                      self.tempConfig.gain, self.tempConfig.lacunarity) * 0.5 + 0.5)
    local h  = (fbm2d(wx + 1000, wy + 1000, self.perm, self.humidConfig.octaves,
                      self.humidConfig.gain, self.humidConfig.lacunarity) * 0.5 + 0.5)
    local e  = (fbm2d(wx + 2000, wy, self.perm, self.elevConfig.octaves,
                      self.elevConfig.gain, self.elevConfig.lacunarity) * 0.5 + 0.5)
    local s  = (fbm2d(wx, wy + 2000, self.perm, self.specConfig.octaves,
                      self.specConfig.gain, self.specConfig.lacunarity) * 0.5 + 0.5)

    -- apply scale adjustments (freq-like post-scale)
    t = (t - 0.5) * self.tempConfig.scale + 0.5
    h = (h - 0.5) * self.humidConfig.scale + 0.5
    e = (e - 0.5) * self.elevConfig.scale  + 0.5
    s = (s - 0.5) * self.specConfig.scale  + 0.5

    -- clamp
    local function clamp01(v)
        if v < 0 then return 0 elseif v > 1 then return 1 else return v end
    end
    return clamp01(t), clamp01(h), clamp01(e), clamp01(s)
end

-- ============================================================================
-- 4) Biome Fitness Function (how well a point matches a biome)
-- ============================================================================
local function fitness(value, range)
    if not range then return 1.0 end
    local min = range.min or 0.0
    local max = range.max or 1.0
    local weight = range.weight or 1.0
    if value < min or value > max then return 0.0 end

    -- apply smooth blend near edges
    local width = 0.05
    local f = 1.0
    if value < min + width then
        f = (value - min) / width
    elseif value > max - width then
        f = (max - value) / width
    end
    return math.max(0, math.min(1, f)) * weight
end

function BiomeSystem:compute_fitness(biome, temp, humid, elev, special)
    local ft = fitness(temp,  biome.temperature)
    local fh = fitness(humid, biome.humidity)
    local fe = fitness(elev,  biome.elevation)
    local fs = fitness(special,biome.special)
    return ft * fh * fe * fs
end

-- ============================================================================
-- 5) Generate Biome Map
-- ============================================================================
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

            -- compute fitness for all biomes
            local bestBiome = nil
            local bestScore = -1
            local weights = {}
            local totalWeight = 0

            for _, biome in ipairs(self.biomes) do
                local score = self:compute_fitness(biome, temp, humid, elev, special)
                weights[biome.id] = score
                totalWeight = totalWeight + score
                if score > bestScore then
                    bestScore = score
                    bestBiome = biome
                end
            end

            -- normalize weights for blending
            if totalWeight > 0 then
                for k, v in pairs(weights) do
                    weights[k] = v / totalWeight
                end
            else
                -- fallback to first biome if no match
                if #self.biomes > 0 then
                    weights[self.biomes[1].id] = 1.0
                    bestBiome = self.biomes[1]
                    bestScore = 1.0
                end
            end

            biomeMap[y][x] = bestBiome
            weightMap[y][x] = weights
            detailMap[y][x] = {
                temperature = temp,
                humidity = humid,
                elevation = elev,
                special = special,
                bestScore = bestScore
            }
        end
    end

    return {
        biomeMap = biomeMap,
        weightMap = weightMap,
        detailMap = detailMap,
        width = w,
        height = h
    }
end

-- ============================================================================
-- 6) Color Blending (weighted average of biome colors)
-- ============================================================================
function BiomeSystem:generate_color_map(result)
    local cmap = {}
    local biomeMap = result.biomeMap
    local weightMap = result.weightMap
    for y = 1, result.height do
        cmap[y] = {}
        for x = 1, result.width do
            local r, g, b = 0, 0, 0
            local weights = weightMap[y][x]
            for _, biome in ipairs(self.biomes) do
                local w = weights[biome.id] or 0
                local c = biome.color or { r = 1, g = 1, b = 1 }
                r = r + c.r * w
                g = g + c.g * w
                b = b + c.b * w
            end
            cmap[y][x] = { r = math.min(1, math.max(0, r)),
                           g = math.min(1, math.max(0, g)),
                           b = math.min(1, math.max(0, b)) }
        end
    end
    return cmap
end

-- ============================================================================
-- 7) Tile ID Map (for tile-based rendering / WFC integration)
-- ============================================================================
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

-- ============================================================================
-- 8) Voronoi-style Biome Boundary (optional post effect for sharper regions)
-- ============================================================================
function BiomeSystem:voronoi_sharpen(result, strength)
    strength = strength or 1.0
    local newBiomeMap = {}
    for y = 1, result.height do
        newBiomeMap[y] = {}
        for x = 1, result.width do
            local weights = result.weightMap[y][x]
            local bestId = nil
            local bestW = -1
            for _, biome in ipairs(self.biomes) do
                local w = (weights[biome.id] or 0) ^ strength
                if w > bestW then
                    bestW = w
                    bestId = biome.id
                end
            end
            -- find biome object by id
            for _, b in ipairs(self.biomes) do
                if b.id == bestId then
                    newBiomeMap[y][x] = b
                    break
                end
            end
        end
    end
    result.biomeMap = newBiomeMap
    return result
end

-- ============================================================================
-- 9) Prebuilt Biome Presets
-- ============================================================================
function BiomeSystem.presets()
    return {
        {
            id = "ocean", name = "海洋",
            temperature = { min = 0.0, max = 1.0 },
            humidity    = { min = 0.0, max = 1.0 },
            elevation   = { min = 0.0, max = 0.25 },
            color = { r = 0.1, g = 0.3, b = 0.6 },
            tileId = 1, vegetationDensity = 0.0
        },
        {
            id = "beach", name = "沙滩",
            temperature = { min = 0.3, max = 1.0 },
            humidity    = { min = 0.0, max = 1.0 },
            elevation   = { min = 0.25, max = 0.32 },
            color = { r = 0.9, g = 0.8, b = 0.5 },
            tileId = 2, vegetationDensity = 0.0
        },
        {
            id = "grassland", name = "草原",
            temperature = { min = 0.3, max = 0.7 },
            humidity    = { min = 0.2, max = 0.6 },
            elevation   = { min = 0.32, max = 0.65 },
            color = { r = 0.2, g = 0.7, b = 0.2 },
            tileId = 3, vegetationDensity = 0.3
        },
        {
            id = "forest", name = "森林",
            temperature = { min = 0.2, max = 0.6 },
            humidity    = { min = 0.5, max = 1.0 },
            elevation   = { min = 0.35, max = 0.7 },
            color = { r = 0.05, g = 0.5, b = 0.1 },
            tileId = 4, vegetationDensity = 0.8
        },
        {
            id = "desert", name = "沙漠",
            temperature = { min = 0.6, max = 1.0 },
            humidity    = { min = 0.0, max = 0.3 },
            elevation   = { min = 0.3, max = 0.6 },
            color = { r = 0.9, g = 0.7, b = 0.3 },
            tileId = 5, vegetationDensity = 0.05
        },
        {
            id = "mountain", name = "山地",
            temperature = { min = 0.0, max = 1.0 },
            humidity    = { min = 0.0, max = 1.0 },
            elevation   = { min = 0.65, max = 0.85 },
            color = { r = 0.5, g = 0.5, b = 0.5 },
            tileId = 6, vegetationDensity = 0.1
        },
        {
            id = "snow", name = "雪原",
            temperature = { min = 0.0, max = 0.3 },
            humidity    = { min = 0.0, max = 1.0 },
            elevation   = { min = 0.75, max = 1.0 },
            color = { r = 1.0, g = 1.0, b = 1.0 },
            tileId = 7, vegetationDensity = 0.0
        },
        {
            id = "volcano", name = "火山",
            temperature = { min = 0.7, max = 1.0 },
            humidity    = { min = 0.0, max = 0.4 },
            elevation   = { min = 0.7, max = 1.0 },
            special     = { min = 0.6, max = 1.0 },
            color = { r = 0.3, g = 0.1, b = 0.1 },
            tileId = 8, vegetationDensity = 0.0
        }
    }
end

return BiomeSystem
