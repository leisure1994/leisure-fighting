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
    local X = math.floor(x) % 256
    local Y = math.floor(y) % 256
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
    local X = math.floor(x) % 256
    local Y = math.floor(y) % 256
    local Z = math.floor(z) % 256
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

-- compatibility wrapper, actual implementation below
function NoiseTerrain.terrace(value, steps)
    steps = steps or 8
    local t = math.floor(value * steps) / steps
    return t
end

-- fix typo above in a compatibility wrapper
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
-- 将 heightmap 写入 urho Image 对象，方便作为 heightmap texture 或 terrain data
function NoiseTerrain.to_image(heightmap, imageOrCreate)
    local width = #heightmap[1]
    local height = #heightmap

    -- 如果在 urhox 环境内，可以尝试创建 Image
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
            -- grayscale in R channel, full white alpha
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
