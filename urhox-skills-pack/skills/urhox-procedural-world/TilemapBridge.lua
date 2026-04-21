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

-- ============================================================================
-- 1) Create new bridge
-- ============================================================================
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

-- ============================================================================
-- 2) Tileset helpers
-- ============================================================================
function TilemapBridge:add_tileset(ts)
    -- normalize fields to Tiled JSON spec
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

-- ============================================================================
-- 3) Layer helpers
-- ============================================================================
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
        x = 0,
        y = 0
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
        x = 0,
        y = 0
    }
    self.nextLayerId = self.nextLayerId + 1
    table.insert(self.layers, layer)
    return layer
end

-- ============================================================================
-- 4) Flatten a 2D lua map into Tiled 1D data array (row-major)
--    Tiled tile ids can include flipped flags encoded in high bits; we keep raw here.
-- ============================================================================
function TilemapBridge:flatten_2d(map2d, firstgid)
    firstgid = firstgid or 1
    local data = {}
    for y = 1, self.mapHeight do
        for x = 1, self.mapWidth do
            local v = 0
            if map2d[y] and map2d[y][x] then
                v = map2d[y][x]
                if v == 0 then
                    v = 0
                else
                    v = v + firstgid - 1
                end
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
            if v == 0 then
                map2d[y][x] = 0
            else
                map2d[y][x] = v - firstgid + 1
            end
        end
    end
    return map2d
end

-- ============================================================================
-- 5) Build Tiled JSON table
-- ============================================================================
function TilemapBridge:build_json()
    local json = {
        compressionlevel = -1,
        height = self.mapHeight,
        width = self.mapWidth,
        tileheight = self.tileHeight,
        tilewidth = self.tileWidth,
        orientation = self.orientation,
        renderorder = self.renderOrder,
        infinite = false,
        nextlayerid = self.nextLayerId,
        nextobjectid = self.nextObjectId,
        layers = self.layers,
        tilesets = self.tilesets,
        type = "map",
        version = "1.10",
        tiledversion = "1.10.2",
        properties = self.properties
    }
    return json
end

-- ============================================================================
-- 6) Export to string (JSON-like, no external JSON lib required)
--    This encoder handles numbers, strings, booleans, tables (arrays/dicts)
-- ============================================================================
function TilemapBridge:encode_json(value, indent)
    indent = indent or 0
    local pad = string.rep("  ", indent)
    local t = type(value)

    if t == "nil" then return "null" end
    if t == "boolean" then return tostring(value) end
    if t == "number" then
        -- ensure integers don't get .0
        if value == math.floor(value) then
            return tostring(math.floor(value))
        end
        return tostring(value)
    end
    if t == "string" then
        return '"' .. value:gsub('\\', '\\\\')
                         :gsub('"', '\\"')
                         :gsub('\n', '\\n')
                         :gsub('\r', '\\r')
                         :gsub('\t', '\\t') .. '"'
    end
    if t == "table" then
        -- determine if array-like
        local isArray = true
        local n = 0
        for k, _ in pairs(value) do
            n = n + 1
            if type(k) ~= "number" or k <= 0 or math.floor(k) ~= k then
                isArray = false
                break
            end
        end
        if isArray and n == #value then
            local parts = {}
            for _, v in ipairs(value) do
                table.insert(parts, self:encode_json(v, indent + 1))
            end
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
                local keystr
                if type(k) == "string" then
                    keystr = '"' .. k .. '"'
                else
                    keystr = tostring(k)
                end
                table.insert(parts, pad .. "  " .. keystr .. ": " .. self:encode_json(v, indent + 1))
            end
            if #parts == 0 then return "{}" end
            return "{\n" .. table.concat(parts, ",\n") .. "\n" .. pad .. "}"
        end
    end
    return "null"
end

function TilemapBridge:export_string()
    local json = self:build_json()
    return self:encode_json(json)
end

-- ============================================================================
-- 7) Import from Lua table (already parsed JSON)
-- ============================================================================
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

-- ============================================================================
-- 8) Simple file write helper (urhox FileSystem 或 fallback)
-- ============================================================================
function TilemapBridge:save(path)
    local str = self:export_string()
    -- try urho file system first
    local fs = _G.fileSystem or (_G.Urho3D and _G.Urho3D.fileSystem)
    if fs then
        local file = fs:OpenFile(path, _G.FILE_WRITE)
        if file then
            file:WriteString(str)
            file:Close()
            return true
        end
    end
    -- fallback (if running in standard Lua with io)
    local f = io.open(path, "w")
    if f then
        f:write(str)
        f:close()
        return true
    end
    return false
end

function TilemapBridge.load(path)
    local fs = _G.fileSystem or (_G.Urho3D and _G.Urho3D.fileSystem)
    local content = nil
    if fs then
        local file = fs:OpenFile(path, _G.FILE_READ)
        if file then
            content = file:ReadString()
            file:Close()
        end
    else
        local f = io.open(path, "r")
        if f then
            content = f:read("*a")
            f:close()
        end
    end

    if not content then return nil end
    -- decode json via loadstring or require external json lib if available
    local json = nil
    local ok, err = pcall(function()
        local func = loadstring("return " .. content:gsub('"', '"'))
        if func then json = func() end
    end)
    if not ok or not json then
        -- if content is proper JSON (not Lua table literal), try a lightweight parse
        json = TilemapBridge._parse_json(content)
    end
    if json then
        return TilemapBridge.import_table(json)
    end
    return nil
end

-- ============================================================================
-- 9) Very lightweight JSON parser (handles Tiled export subset)
-- ============================================================================
function TilemapBridge._parse_json(str)
    -- This is a minimal recursive descent for the Tiled JSON subset.
    -- For production maps, prefer dkjson/lunajson/cjson.
    local pos = 1
    local len = #str

    local function skip_ws()
        while pos <= len do
            local c = str:sub(pos, pos)
            if c == " " or c == "\t" or c == "\n" or c == "\r" then
                pos = pos + 1
            elseif c == "/" and str:sub(pos + 1, pos + 1) == "/" then
                while pos <= len and str:sub(pos, pos) ~= "\n" do pos = pos + 1 end
            else
                break
            end
        end
    end

    local function parse_value()
        skip_ws()
        local c = str:sub(pos, pos)
        if c == '"' then return parse_string()
        elseif c == "{" then return parse_object()
        elseif c == "[" then return parse_array()
        elseif c == "t" then
            pos = pos + 4; return true
        elseif c == "f" then
            pos = pos + 5; return false
        elseif c == "n" then
            pos = pos + 4; return nil
        else
            return parse_number()
        end
    end

    local function parse_string()
        pos = pos + 1 -- skip opening quote
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
            else
                res = res .. c
                pos = pos + 1
            end
        end
        return res
    end

    local function parse_number()
        local start = pos
        while pos <= len do
            local c = str:sub(pos, pos)
            if c:match("[%-%d%.eE%+]") then pos = pos + 1 else break end
        end
        local numstr = str:sub(start, pos - 1)
        return tonumber(numstr)
    end

    local function parse_array()
        pos = pos + 1 -- skip [
        local arr = {}
        skip_ws()
        if str:sub(pos, pos) == "]" then pos = pos + 1; return arr end
        while true do
            table.insert(arr, parse_value())
            skip_ws()
            local c = str:sub(pos, pos)
            pos = pos + 1
            if c == "]" then return arr end
            -- expect ,
        end
    end

    local function parse_object()
        pos = pos + 1 -- skip {
        local obj = {}
        skip_ws()
        if str:sub(pos, pos) == "}" then pos = pos + 1; return obj end
        while true do
            local key = parse_string()
            skip_ws()
            pos = pos + 1 -- skip :
            obj[key] = parse_value()
            skip_ws()
            local c = str:sub(pos, pos)
            pos = pos + 1
            if c == "}" then return obj end
            -- expect ,
        end
    end

    return parse_value()
end

-- ============================================================================
-- 10) Convenience: Auto-create map from a set of 2D layer tables
-- ============================================================================
function TilemapBridge.from_layers(layerMap, tileWidth, tileHeight, tilesetImage)
    -- layerMap = { layerName = 2D tile grid, ... }
    local firstLayer = nil
    local mapW, mapH = 64, 64
    for _, grid in pairs(layerMap) do
        mapH = #grid
        mapW = #grid[1]
        firstLayer = grid
        break
    end

    local bridge = TilemapBridge.new({
        tileWidth = tileWidth or 32,
        tileHeight = tileHeight or 32,
        mapWidth = mapW,
        mapHeight = mapH
    })

    if tilesetImage then
        bridge:add_tileset({
            columns = 1,
            firstgid = 1,
            image = tilesetImage,
            imagewidth = tileWidth or 32,
            imageheight = tileHeight or 32,
            margin = 0,
            name = "auto_tileset",
            spacing = 0,
            tilecount = 256,
            tileheight = tileHeight or 32,
            tilewidth = tileWidth or 32
        })
    end

    for name, grid in pairs(layerMap) do
        local data = bridge:flatten_2d(grid, 1)
        bridge:add_tile_layer(name, data, 1.0, true)
    end

    return bridge
end

return TilemapBridge
