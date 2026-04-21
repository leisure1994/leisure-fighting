-- PixelPromptEngine.lua
-- 高精度像素美术提示词引擎
-- 提供逐像素风格控制、统一像素密度与手绘质感的关键词封装

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local STYLE_PREFIX_BASE = "像素风格,pixel art,retro game style"
local KEYWORD_PIXEL_PERFECT = "清晰像素边缘,无抗锯齿,硬边缘,方格像素对齐,无半透明像素,无渐变过渡"
local KEYWORD_HAND_DRAWN = "手工绘制质感,手绘着色,铅笔笔触,手工抖动,有机像素,非AI平滑感"
local KEYWORD_UNIFORM_DENSITY = "统一像素密度,规整像素网格,无分辨率混叠,像素尺寸一致"
local KEYWORD_TRANSPARENT = "透明背景,纯色背景,无环境光干扰"

--- 尺寸对应的像素密度描述映射表
local DENSITY_MAP = {
    ["16x16"]   = "极低像素,16x16严格方格,每个像素极大且边界锐利",
    ["24x24"]   = "超低像素,24x24方格,粗大像素块",
    ["32x32"]   = "低像素,32x32方格,粗大像素块,统一像素尺寸",
    ["48x48"]   = "中低像素,48x48方格,清晰像素单元",
    ["64x64"]   = "中像素,64x64方格,标准像素密度",
    ["96x96"]   = "中高像素,96x96方格,细腻像素",
    ["128x128"] = "高像素,128x128方格,高细节像素",
    ["256x144"] = "横版背景,256x144分辨率,低像素密度背景",
    ["320x180"] = "横版背景,320x180分辨率,中低像素密度背景",
    ["480x270"] = "横版背景,480x270分辨率,标准像素密度背景",
    ["640x360"] = "横版背景,640x360分辨率,高清像素密度背景",
    ["180x320"] = "竖版背景,180x320分辨率,低像素密度背景",
    ["270x480"] = "竖版背景,270x480分辨率,标准像素密度背景",
}

--- 尺寸合法性校验正则
local SIZE_PATTERN = "^(%d+)x(%d+)$"

-- ============================================================================
-- 内部辅助函数
-- ============================================================================

--- 将多个字符串用逗号拼接，自动过滤空值
-- @param ... string 任意数量的字符串片段
-- @return string 拼接后的结果
local function concatParts(...)
    local parts = {}
    for i = 1, select("#", ...) do
        local v = select(i, ...)
        if v and v ~= "" then
            table.insert(parts, v)
        end
    end
    return table.concat(parts, ",")
end

--- 获取指定尺寸的像素密度描述
-- @param sizeStr string 尺寸字符串（如 "32x32"）
-- @return string 密度描述
local function getDensityDesc(sizeStr)
    return DENSITY_MAP[sizeStr] or ("自定义尺寸," .. tostring(sizeStr) .. ",统一像素密度")
end

-- ============================================================================
-- 公共 API
-- ============================================================================

--- 构建逐像素控制风格前缀
-- @param options table 可选配置：transparent(boolean), pixelPerfect(boolean), handDrawn(boolean), uniformDensity(boolean)
-- @return string 风格前缀
function M.BuildStylePrefix(options)
    options = options or {}
    local parts = { STYLE_PREFIX_BASE }

    if options.pixelPerfect ~= false then
        table.insert(parts, KEYWORD_PIXEL_PERFECT)
    end

    if options.handDrawn then
        table.insert(parts, KEYWORD_HAND_DRAWN)
    end

    if options.uniformDensity ~= false then
        table.insert(parts, KEYWORD_UNIFORM_DENSITY)
    end

    if options.transparent then
        table.insert(parts, KEYWORD_TRANSPARENT)
    end

    return table.concat(parts, ",")
end

--- 构建完整的生成提示词
-- @param assetType string 资源类型："character" / "item" / "scene" / "tile" / "ui"
-- @param description string 主体描述
-- @param view string 视角/朝向/姿态描述
-- @param options table 配置表：size(str), transparent(bool), pixelPerfect(bool), handDrawn(bool), uniformDensity(bool), extra(string)
-- @return string 完整 prompt
function M.BuildAssetPrompt(assetType, description, view, options)
    assetType = assetType or "character"
    description = description or ""
    view = view or ""
    options = options or {}

    local sizeStr = options.size or "32x32"
    local prefix = M.BuildStylePrefix(options)
    local density = getDensityDesc(sizeStr)

    local typeDesc = ""
    if assetType == "character" then
        typeDesc = "游戏角色精灵"
    elseif assetType == "item" then
        typeDesc = "游戏道具图标"
    elseif assetType == "scene" then
        typeDesc = "游戏场景背景"
    elseif assetType == "tile" then
        typeDesc = "游戏地块贴图"
    elseif assetType == "ui" then
        typeDesc = "游戏UI元素"
    end

    return concatParts(prefix, density, typeDesc, description, view, options.extra)
end

--- 构建动画帧提示词，确保帧间基础描述不变
-- @param baseDesc string 角色/物体基础描述（决定轮廓和比例）
-- @param frameDesc string 当前帧特有姿态描述
-- @param options table 配置表（同 BuildAssetPrompt）
-- @param silhouetteLock string|nil 轮廓锁定签名，追加到每帧防止变形
-- @return string 单帧完整 prompt
function M.BuildAnimationFramePrompt(baseDesc, frameDesc, options, silhouetteLock)
    options = options or {}
    silhouetteLock = silhouetteLock or ""

    local sizeStr = options.size or "32x32"
    local prefix = M.BuildStylePrefix(options)
    local density = getDensityDesc(sizeStr)

    return concatParts(prefix, density, baseDesc, silhouetteLock, frameDesc, options.extra)
end

--- 构建带严格逐像素控制要求的提示词
-- 在 BuildAssetPrompt 基础上额外注入最强硬的关键词
-- @param assetType string 资源类型
-- @param description string 主体描述
-- @param view string 视角描述
-- @param options table 配置表
-- @return string 完整 prompt
function M.BuildPixelPerfectPrompt(assetType, description, view, options)
    options = options or {}
    options.pixelPerfect = true
    options.uniformDensity = true

    local extra = options.extra or ""
    extra = concatParts(extra, "逐像素精确控制,每个像素边界清晰,像素级颜色定位,无子像素偏移")
    options.extra = extra

    return M.BuildAssetPrompt(assetType, description, view, options)
end

--- 构建带手绘质感的提示词
-- @param assetType string 资源类型
-- @param description string 主体描述
-- @param view string 视角描述
-- @param options table 配置表
-- @return string 完整 prompt
function M.BuildHandDrawnPrompt(assetType, description, view, options)
    options = options or {}
    options.handDrawn = true

    local extra = options.extra or ""
    extra = concatParts(extra, "手工像素艺术,人手绘制的像素纹理,自然笔触参差")
    options.extra = extra

    return M.BuildAssetPrompt(assetType, description, view, options)
end

--- 校验尺寸字符串是否合法
-- @param sizeStr string 尺寸字符串（如 "32x32"）
-- @return boolean isValid 是否合法
-- @return number|nil width 宽度
-- @return number|nil height 高度
function M.ValidateSize(sizeStr)
    local w, h = string.match(tostring(sizeStr), SIZE_PATTERN)
    if not w then
        return false, nil, nil
    end
    return true, tonumber(w), tonumber(h)
end

--- 获取推荐尺寸列表
-- @param assetType string 资源类型
-- @return table sizes 推荐尺寸字符串数组
function M.GetRecommendedSizes(assetType)
    local MAP = {
        character = { "16x16", "32x32", "48x48", "64x64", "128x128" },
        item      = { "16x16", "32x32", "64x64" },
        scene     = { "256x144", "320x180", "480x270", "640x360" },
        tile      = { "16x16", "32x32", "64x64" },
        ui        = { "32x32", "64x64", "128x128" },
    }
    return MAP[assetType] or { "32x32" }
end

return M
