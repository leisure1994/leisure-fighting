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

-- Cell types
CaveGenerator.WALL  = 1
CaveGenerator.FLOOR = 0

-- ============================================================================
-- 1) Create a new generator instance
-- ============================================================================
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

-- ============================================================================
-- 2) Randomly fill the map with walls/floors based on fill percent
-- ============================================================================
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

-- ============================================================================
-- 3) Smooth the map using cellular automata rules
--    Standard 4-5 rule: a cell becomes/is a wall if it has >= 5 wall neighbors
-- ============================================================================
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
            if dx ~= 0 or dy ~= 0 then
                local nx, ny = x + dx, y + dy
                if nx < 1 or nx > self.width or ny < 1 or ny > self.height then
                    count = count + 1
                elseif self.map[ny][nx] == CaveGenerator.WALL then
                    count = count + 1
                end
            end
        end
    end
    return count
end

-- ============================================================================
-- 4) Flood Fill to identify connected regions (rooms/walls)
-- ============================================================================
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
                if math.abs(dx) + math.abs(dy) == 1 then -- 4-connect
                    local nx, ny = cell.x + dx, cell.y + dy
                    if nx >= 1 and nx <= self.width and ny >= 1 and ny <= self.height then
                        if not visited[ny][nx] and self.map[ny][nx] == tileType then
                            visited[ny][nx] = true
                            table.insert(stack, {x = nx, y = ny})
                        end
                    end
                end
            end
        end
    end

    return region
end

-- ============================================================================
-- 5) Remove small wall regions and small room regions
-- ============================================================================
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

    -- sort rooms by size descending
    table.sort(survivingRooms, function(a, b) return #a > #b end)
    self.rooms = survivingRooms
end

-- ============================================================================
-- 6) Connect closest rooms with tunnels
-- ============================================================================
function CaveGenerator:connect_closest_rooms()
    if #self.rooms <= 1 then return end

    -- build room edge tiles list for faster tunneling
    for _, room in ipairs(self.rooms) do
        room.edgeTiles = self:get_edge_tiles(room)
        room.connected = false
    end

    -- Connect main room to every other using shortest path between edge tiles
    local bestDistance = 0
    local bestTileA = nil
    local bestTileB = nil
    local bestRoomA = nil
    local bestRoomB = nil
    local roomA = self.rooms[1]

    while true do
        bestDistance = math.huge
        bestTileA = nil
        bestTileB = nil
        bestRoomA = nil
        bestRoomB = nil

        for _, roomB in ipairs(self.rooms) do
            if roomA ~= roomB and not roomB.connected then
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
            end
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

    -- ensure all rooms are connected (fallback)
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
        local isEdge = false
        for dy = -1, 1 do
            for dx = -1, 1 do
                if not isEdge and (dx ~= 0 or dy ~= 0) then
                    local nx, ny = tile.x + dx, tile.y + dy
                    if nx >= 1 and nx <= self.width and ny >= 1 and ny <= self.height then
                        if self.map[ny][nx] == CaveGenerator.WALL then
                            table.insert(edges, tile)
                            isEdge = true
                        end
                    end
                end
            end
        end
    end
    return edges
end

-- Draw a straight-ish corridor between two points
function CaveGenerator:create_tunnel(tileA, tileB)
    local x, y = tileA.x, tileA.y
    local targetX, targetY = tileB.x, tileB.y

    while x ~= targetX or y ~= targetY do
        if math.random() < 0.5 then
            if x ~= targetX then
                x = x + (targetX > x and 1 or -1)
            end
        else
            if y ~= targetY then
                y = y + (targetY > y and 1 or -1)
            end
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

-- ============================================================================
-- 7) Main Generate
-- ============================================================================
function CaveGenerator:generate()
    self:random_fill()
    for i = 1, self.smoothIterations do
        self:smooth_map()
    end
    self:process_map()
    if self.connectRooms then
        self:connect_closest_rooms()
    end
    return self.map, self.rooms
end

-- ============================================================================
-- 8) Post-process utilities
-- ============================================================================
function CaveGenerator:find_spawn_point()
    if #self.rooms == 0 then return math.floor(self.width / 2), math.floor(self.height / 2) end
    local mainRoom = self.rooms[1]
    local cx, cy = 0, 0
    for _, t in ipairs(mainRoom) do
        cx = cx + t.x
        cy = cy + t.y
    end
    return math.floor(cx / #mainRoom), math.floor(cy / #mainRoom)
end

-- 将 Wall=1/Floor=0 转为不同的 tile ids (传入 tileMap )
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
