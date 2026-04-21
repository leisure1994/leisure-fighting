-- PaletteDirector.lua
-- 调色板导演
-- 提供限制色板、手绘抖动风格与像素颜色控制策略

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

--- 经典 NES 调色板（代表性主色）
local PALETTE_NES = {
    name = "NES",
    desc = "经典8位红白机风格,高饱和,限制调色板",
    maxColors = 16,
    colors = { "#000000", "#FCFCFC", "#F8F800", "#00F8F8", "#F80000", "#00F800", "#F800F8", "#0000F8", "#F8A400", "#00A4F8", "#A400F8", "#A4F800" },
}

--- Game Boy 风格调色板（4 级灰绿）
local PALETTE_GAMEBOY = {
    name = "GameBoy",
    desc = "Game Boy 四阶灰绿,复古掌机质感",
    maxColors = 4,
    colors = { "#0F380F", "#306230", "#8BAC0F", "#9BBC0F" },
}

--- PICO-8 调色板
local PALETTE_PICO8 = {
    name = "PICO8",
    desc = "PICO-8 幻想游戏机调色板,16色低像素独立游戏风格",
    maxColors = 16,
    colors = { "#000000", "#1D2B53", "#7E2553", "#008751", "#AB5236", "#5F574F", "#C2C3C7", "#FFF1E8", "#FF004D", "#FFA300", "#FFEC27", "#00E436", "#29ADFF", "#83769C", "#FF77A8", "#FFCCAA" },
}

--- DawnBringer 16 色
local PALETTE_DAWNBRINGER16 = {
    name = "DawnBringer16",
    desc = "DawnBringer 16色调色板,像素艺术社区标准柔和配色",
    maxColors = 16,
    colors = { "#140C1C", "#442434", "#30346D", "#4E4A4E", "#854C30", "#346524", "#D04648", "#757161", "#597DCE", "#D27D2C", "#8595A1", "#6DAA2C", "#D2AA99", "#6DC2CA", "#DAD45E", "#DEEED6" },
}

--- 单色灰阶
local PALETTE_MONO = {
    name = "Mono",
    desc = "单色灰阶,极简风格,高对比黑白",
    maxColors = 4,
    colors = { "#000000", "#555555", "#AAAAAA", "#FFFFFF" },
}

--- 末日废土风
local PALETTE_WASTELAND = {
    name = "Wasteland",
    desc = "末日废土低饱和大地色系",
    maxColors = 8,
    colors = { "#2B1D14", "#523A28", "#8C6A4F", "#BFA376", "#D9C6A3", "#A66E4E", "#734939", "#3D2719" },
}

--- 调色板注册表
local PALETTE_REGISTRY = {
    NES = PALETTE_NES,
    GAMEBOY = PALETTE_GAMEBOY,
    PICO8 = PALETTE_PICO8,
    DAWNBRINGER16 = PALETTE_DAWNBRINGER16,
    MONO = PALETTE_MONO,
    WASTELAND = PALETTE_WASTELAND,
}

--- 抖动风格描述库
local DITHERING_STYLES = {
    NONE        = "无抖动,纯平涂,硬边缘色块",
    BAYER       = "Bayer 有序抖动,经典2x2/4x4点阵过渡",
    CROSSHATCH  = "交叉线抖动,手绘交叉阴影质感",
    SCRIBBLE    = "涂鸦抖动,不规则手绘噪点过渡",
    CHECKER     = "棋盘抖动,方格交替像素过渡",
}

-- ============================================================================
-- 公共 API
-- ============================================================================

--- 获取指定调色板配置
-- @param name string 调色板名称（如 "PICO8"）
-- @return table|nil palette 调色板配置表
function M.GetPalette(name)
    return PALETTE_REGISTRY[name]
end

--- 列出所有可用调色板名称
-- @return table names 名称数组
function M.ListPaletteNames()
    local names = {}
    for k, _ in pairs(PALETTE_REGISTRY) do
        table.insert(names, k)
    end
    table.sort(names)
    return names
end

--- 构建调色板限制提示词
-- @param paletteName string 调色板名称
-- @return string|nil prompt 调色板提示词片段
function M.BuildPalettePrefix(paletteName)
    local p = PALETTE_REGISTRY[paletteName]
    if not p then
        return nil
    end
    return string.format("限制%d色色板,%s,严格按调色板配色,无超出色板颜色,无渐变", p.maxColors, p.desc)
end

--- 获取调色板颜色列表（可用于运行时的颜色校验或 UI 展示）
-- @param paletteName string 调色板名称
-- @return table|nil colors 颜色 hex 数组
function M.GetPaletteColors(paletteName)
    local p = PALETTE_REGISTRY[paletteName]
    if not p then return nil end
    local copy = {}
    for _, c in ipairs(p.colors) do
        table.insert(copy, c)
    end
    return copy
end

--- 获取抖动风格描述
-- @param styleName string 风格名称：NONE/BAYER/CROSSHATCH/SCRIBBLE/CHECKER
-- @return string|nil desc 描述字符串
function M.GetDitheringStyle(styleName)
    return DITHERING_STYLES[styleName]
end

--- 列出所有抖动风格名称
-- @return table names 名称数组
function M.ListDitheringStyles()
    local names = {}
    for k, _ in pairs(DITHERING_STYLES) do
        table.insert(names, k)
    end
    table.sort(names)
    return names
end

--- 构建含抖动风格的提示词片段
-- @param styleName string 抖动风格名称
-- @param paletteName string|nil 可选的调色板名称
-- @return string prompt 提示词片段
function M.BuildDitheringPrefix(styleName, paletteName)
    local ditherDesc = DITHERING_STYLES[styleName] or DITHERING_STYLES.NONE
    local parts = { ditherDesc }
    if paletteName then
        local p = PALETTE_REGISTRY[paletteName]
        if p then
            table.insert(parts, 1, string.format("%d色限制", p.maxColors))
        end
    end
    return table.concat(parts, ",")
end

--- 构建手绘质感综合提示词片段（调色板 + 抖动 + 手工笔触）
-- @param paletteName string|nil 调色板名称
-- @param styleName string|nil 抖动风格名称
-- @return string prompt 综合提示词片段
function M.BuildHandDrawnTexturePrefix(paletteName, styleName)
    local parts = { "手工绘制像素艺术,手绘着色,铅笔笔触,有机像素" }

    if paletteName then
        local palettePrefix = M.BuildPalettePrefix(paletteName)
        if palettePrefix then
            table.insert(parts, palettePrefix)
        end
    end

    if styleName then
        local ditherPrefix = M.BuildDitheringPrefix(styleName, paletteName)
        if ditherPrefix then
            table.insert(parts, ditherPrefix)
        end
    end

    return table.concat(parts, ",")
end

--- 将 hex 颜色字符串解析为 RGB 分量
-- @param hex string 如 "#FF004D" 或 "FF004D"
-- @return number|nil r 红 (0-255)
-- @return number|nil g 绿 (0-255)
-- @return number|nil b 蓝 (0-255)
function M.HexToRgb(hex)
    hex = tostring(hex):gsub("#", "")
    if #hex ~= 6 then return nil, nil, nil end
    local r = tonumber(hex:sub(1, 2), 16)
    local g = tonumber(hex:sub(3, 4), 16)
    local b = tonumber(hex:sub(5, 6), 16)
    return r, g, b
end

--- 查找调色板中与给定颜色最接近的颜色索引
-- @param hex string 目标颜色
-- @param paletteName string 调色板名称
-- @return number|nil index 最近颜色索引（从1开始）
-- @return number minDistance 最小欧氏距离
function M.FindNearestColor(hex, paletteName)
    local tr, tg, tb = M.HexToRgb(hex)
    if not tr then return nil, math.huge end

    local colors = M.GetPaletteColors(paletteName)
    if not colors then return nil, math.huge end

    local bestIndex = 1
    local minDist = math.huge
    for i, c in ipairs(colors) do
        local r, g, b = M.HexToRgb(c)
        local dist = math.sqrt((tr - r) ^ 2 + (tg - g) ^ 2 + (tb - b) ^ 2)
        if dist < minDist then
            minDist = dist
            bestIndex = i
        end
    end
    return bestIndex, minDist
end

return M
