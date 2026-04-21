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

-- Directions: index -> {dx, dy, opposite}
local DIRS = {
    { name = "up",    dx =  0, dy = -1, opp = 2 },
    { name = "right", dx =  1, dy =  0, opp = 3 },
    { name = "down",  dx =  0, dy =  1, opp = 0 },
    { name = "left",  dx = -1, dy =  0, opp = 1 },
}

-- ============================================================================
-- 2) Tile Definition
-- ============================================================================
-- 每个 Tile 包含:
--   id: 唯一标识符
--   sockets: { up=string, right=string, down=string, left=string }
--            相同字符串表示可拼接（类似 WFC 原版 socket 概念）
--   weight: 出现概率权重 (default 1.0)
--   symmetry: 旋转对称性 (可选，用于自动 tile 生成)
--   data: 任意自定义数据（如纹理路径、碰撞属性）

-- ============================================================================
-- 3) WFC Core Engine
-- ============================================================================
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

    -- tiles & adjacency
    self.tiles = {}
    self.tileCount = 0
    self.adjacency = {} -- [dir][tileA][tileB] = bool
    self.compatibility = {} -- cache

    -- state
    self.wave = nil
    self.entropy = nil
    self.stack = {} -- backtrack stack
    return self
end

function WFCGenerator:add_tile(tile)
    table.insert(self.tiles, tile)
    self.tileCount = self.tileCount + 1
    tile.index = self.tileCount
    tile.weight = tile.weight or 1.0
    if not tile.sockets then
        tile.sockets = {}
    end
    return tile.index
end

-- 自动根据 socket 相等规则构建邻接表
function WFCGenerator:build_adjacency()
    -- init adjacency matrix
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
                local opp = DIRS[dir.opp + 1] -- Lua 1-based
                -- tile i's direction socket must match tile j's opposite socket
                if ti.sockets[dir.name] and tj.sockets[opp.name] then
                    if ti.sockets[dir.name] == tj.sockets[opp.name] then
                        self.adjacency[d][i][j] = true
                    end
                end
            end
        end
    end
end

-- 预计算 compatibility 计数，用于传播加速
function WFCGenerator:precompute_compatibility()
    self.compatibility = {}
    for d = 1, 4 do
        self.compatibility[d] = {}
        for t = 1, self.tileCount do
            local count = 0
            for u = 1, self.tileCount do
                if self.adjacency[d][t][u] then
                    count = count + 1
                end
            end
            self.compatibility[d][t] = count
        end
    end
end

-- ============================================================================
-- 4) Wave & Entropy Init
-- ============================================================================
function WFCGenerator:initialize_wave()
    self.wave = new_grid(self.width, self.height)
    self.entropy = new_grid(self.width, self.height, 0)

    for y = 1, self.height do
        for x = 1, self.width do
            local possible = {}
            for t = 1, self.tileCount do
                possible[t] = true
            end
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

    if count == 0 then return -1 end -- contradiction
    if count == 1 then return 0 end

    -- Shannon entropy with noise tie-breaker
    local ent = math.log(weightSum) - (weightLogSum / weightSum)
    -- small random tie-break
    ent = ent + math.random() * 0.0001
    return ent
end

-- ============================================================================
-- 5) Observation (Collapse)
-- ============================================================================
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

    if #candidates == 0 then
        return true -- all collapsed, done
    end

    local cell = candidates[math.random(1, #candidates)]
    local cx, cy = cell.x, cell.y
    local possible = self.wave[cy][cx]

    -- weighted random choice
    local weightSum = 0
    for t = 1, self.tileCount do
        if possible[t] then
            weightSum = weightSum + self.tiles[t].weight
        end
    end

    if weightSum <= 0 then
        return false -- contradiction
    end

    local r = math.random() * weightSum
    local chosen = nil
    for t = 1, self.tileCount do
        if possible[t] then
            r = r - self.tiles[t].weight
            if r <= 0 then
                chosen = t
                break
            end
        end
    end

    if not chosen then chosen = self.tileCount end

    -- snapshot for backtrack
    if self.backtrack then
        table.insert(self.stack, {
            x = cx, y = cy,
            wave = self:copy_wave(),
            entropy = self:copy_entropy()
        })
    end

    -- collapse
    for t = 1, self.tileCount do
        possible[t] = (t == chosen)
    end
    self.entropy[cy][cx] = 0

    -- propagate
    local ok = self:propagate(cx, cy)
    if not ok then
        return false
    end

    -- trim stack
    if self.backtrack and #self.stack > self.maxBacktracks then
        table.remove(self.stack, 1)
    end

    return nil -- continue
end

function WFCGenerator:copy_wave()
    local c = new_grid(self.width, self.height)
    for y = 1, self.height do
        for x = 1, self.width do
            local s = {}
            for t = 1, self.tileCount do
                s[t] = self.wave[y][x][t]
            end
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

-- ============================================================================
-- 6) Propagation (Constraint Propagation)
-- ============================================================================
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

            local inBounds = true
            if self.periodicOutput then
                nx = ((nx - 1) % self.width) + 1
                ny = ((ny - 1) % self.height) + 1
            elseif nx < 1 or nx > self.width or ny < 1 or ny > self.height then
                inBounds = false
            end

            if inBounds then
                local currentPossible = self.wave[cy][cx]
                local neighborPossible = self.wave[ny][nx]
                local changed = false

                for nt = 1, self.tileCount do
                    if neighborPossible[nt] then
                        local allowed = false
                        for ct = 1, self.tileCount do
                            if currentPossible[ct] and self.adjacency[d][ct][nt] then
                                allowed = true
                                break
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
                    if ent < 0 then
                        return false -- contradiction
                    end
                    self.entropy[ny][nx] = ent
                    table.insert(queue, {x = nx, y = ny})
                end
            end
        end
    end

    return true
end

-- ============================================================================
-- 7) Main Generate Loop
-- ============================================================================
function WFCGenerator:generate()
    if self.tileCount == 0 then
        error("WFCGenerator: no tiles defined. Call add_tile() first.")
    end
    if not self.adjacency[1] then
        self:build_adjacency()
    end
    self:precompute_compatibility()
    self:initialize_wave()

    local attempts = 0
    local maxAttempts = self.maxBacktracks * 2 + 1000

    while true do
        attempts = attempts + 1
        if attempts > maxAttempts then
            error("WFCGenerator: generation failed after max attempts.")
        end

        local result = self:observe()
        if result == true then
            return true -- success
        elseif result == false then
            -- contradiction
            if self.backtrack and #self.stack > 0 then
                local snapshot = table.remove(self.stack)
                self:restore_state(snapshot)
                -- ban the chosen tile at that cell to avoid same contradiction
                -- (simple heuristic: clear all, will be handled by next observe)
            else
                error("WFCGenerator: contradiction encountered and backtracking disabled or exhausted.")
            end
        end
    end
end

-- ============================================================================
-- 8) Output Helpers
-- ============================================================================
function WFCGenerator:get_output()
    local out = new_grid(self.width, self.height)
    for y = 1, self.height do
        for x = 1, self.width do
            local possible = self.wave[y][x]
            local chosen = nil
            for t = 1, self.tileCount do
                if possible[t] then
                    chosen = self.tiles[t]
                    break
                end
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
                if possible[t] then
                    out[y][x] = t
                    break
                end
            end
        end
    end
    return out
end

-- ============================================================================
-- 9) Convenience: Simple Overlapping Model (simplified image-based WFC)
--    这里提供一个简化版 Pattern Extractor：从示例 map 中提取 NxN pattern
-- ============================================================================
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
                    if sx >= 1 and sx <= w and sy >= 1 and sy <= h then
                        v = sampleMap[sy][sx]
                    end
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

-- 将 pattern 转为 Tile（用于 overlap model 的后续封装）
function WFCGenerator.patterns_to_tiles(patterns)
    local tiles = {}
    for i, pat in ipairs(patterns) do
        local tile = {
            id = "pat_" .. i,
            data = { pattern = pat },
            sockets = {}
        }
        -- overlap model 的邻接由 pattern 本身决定，这里仅做容器
        table.insert(tiles, tile)
    end
    return tiles
end

return WFCGenerator
