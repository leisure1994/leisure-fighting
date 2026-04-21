-- pixel-art-engine
-- 高精度像素美术生成引擎入口
-- 整合提示词引擎、动画编码器、调色板导演与参数校验器

local M = {}

-- ============================================================================
-- 子模块加载
-- ============================================================================

local PixelPromptEngine = require("scripts/PixelPromptEngine")
local AnimationEncoder  = require("scripts/AnimationEncoder")
local PaletteDirector   = require("scripts/PaletteDirector")
local SpriteValidator   = require("scripts/SpriteValidator")

M.PixelPromptEngine = PixelPromptEngine
M.AnimationEncoder  = AnimationEncoder
M.PaletteDirector   = PaletteDirector
M.SpriteValidator   = SpriteValidator

-- ============================================================================
-- 常量
-- ============================================================================

local DEFAULT_SIZE = "32x32"
local DEFAULT_ASPECT_RATIO = "1:1"

-- ============================================================================
-- 高阶 convenience API
-- ============================================================================

--- 生成单个角色精灵的完整请求参数
-- @param description string 角色描述
-- @param view string 视角/朝向
-- @param options table|nil 可选配置（size, aspectRatio, transparent, pixelPerfect, handDrawn, palette, dithering 等）
-- @return table request 可直接用于 generate_image 的请求表
function M.GenerateCharacter(description, view, options)
    options = options or {}
    local size = options.size or DEFAULT_SIZE
    local ratio = options.aspectRatio or DEFAULT_ASPECT_RATIO

    local extraParts = {}
    if options.palette then
        local p = PaletteDirector.BuildPalettePrefix(options.palette)
        if p then table.insert(extraParts, p) end
    end
    if options.dithering then
        local d = PaletteDirector.BuildDitheringPrefix(options.dithering, options.palette)
        if d then table.insert(extraParts, d) end
    end
    if options.handDrawn then
        table.insert(extraParts, "手工绘制质感,手绘着色,铅笔笔触")
    end
    options.extra = table.concat(extraParts, ",")

    local prompt = PixelPromptEngine.BuildAssetPrompt("character", description, view, options)
    local request = {
        prompt = prompt,
        target_size = size,
        aspect_ratio = ratio,
        transparent = options.transparent ~= false,
    }

    local ok, err = SpriteValidator.ValidateRequest(request, "character")
    if not ok then
        return { _error = err, prompt = prompt, target_size = size }
    end

    return request
end

--- 生成单个道具图标的完整请求参数
-- @param description string 道具描述
-- @param view string 视角
-- @param options table|nil 可选配置
-- @return table request 生成请求表
function M.GenerateItem(description, view, options)
    options = options or {}
    local size = options.size or "32x32"
    local ratio = options.aspectRatio or "1:1"

    local extraParts = {}
    if options.palette then
        local p = PaletteDirector.BuildPalettePrefix(options.palette)
        if p then table.insert(extraParts, p) end
    end
    options.extra = table.concat(extraParts, ",")

    local prompt = PixelPromptEngine.BuildAssetPrompt("item", description, view, options)
    local request = {
        prompt = prompt,
        target_size = size,
        aspect_ratio = ratio,
        transparent = true,
    }

    local ok, err = SpriteValidator.ValidateRequest(request, "item")
    if not ok then
        return { _error = err, prompt = prompt, target_size = size }
    end

    return request
end

--- 生成场景背景的完整请求参数
-- @param description string 场景描述
-- @param view string 视角描述（如“横版游戏背景”）
-- @param options table|nil 可选配置
-- @return table request 生成请求表
function M.GenerateScene(description, view, options)
    options = options or {}
    local size = options.size or "320x180"
    local ratio = options.aspectRatio or "16:9"
    options.transparent = false

    local prompt = PixelPromptEngine.BuildAssetPrompt("scene", description, view, options)
    local request = {
        prompt = prompt,
        target_size = size,
        aspect_ratio = ratio,
        transparent = false,
    }

    local ok, err = SpriteValidator.ValidateRequest(request, "scene")
    if not ok then
        return { _error = err, prompt = prompt, target_size = size }
    end

    return request
end

--- 生成一组道具图标（批量）
-- @param descriptions table 道具描述数组，每个元素为 {name=string, desc=string, view=string|nil}
-- @param options table|nil 公共配置
-- @return table batch 批量请求数组
function M.GenerateItemSet(descriptions, options)
    options = options or {}
    local batch = {}
    for _, item in ipairs(descriptions) do
        local req = M.GenerateItem(item.desc, item.view or "正面视角", options)
        req.name = item.name or "item"
        table.insert(batch, req)
    end
    return batch
end

--- 生成动画帧批次请求
-- @param animType string 动画类型：idle/walk/run/attack/jump/hurt/death
-- @param baseDesc string 角色基础描述
-- @param options table|nil 配置（size, aspectRatio, transparent, pixelPerfect, handDrawn, palette, seed 等）
-- @return table batch 批量请求数组
function M.GenerateAnimation(animType, baseDesc, options)
    options = options or {}
    local size = options.size or DEFAULT_SIZE
    local ratio = options.aspectRatio or DEFAULT_ASPECT_RATIO
    local seed = options.seed or AnimationEncoder.CreateConsistencySeed(baseDesc)

    local extraParts = {}
    if options.palette then
        local p = PaletteDirector.BuildPalettePrefix(options.palette)
        if p then table.insert(extraParts, p) end
    end
    if options.dithering then
        local d = PaletteDirector.BuildDitheringPrefix(options.dithering, options.palette)
        if d then table.insert(extraParts, d) end
    end
    options.extra = table.concat(extraParts, ",")

    local spec = AnimationEncoder.CreateAnimationSpec(animType, baseDesc, options.frameCount)

    local function builder(bdesc, fdesc, opts, lock)
        return PixelPromptEngine.BuildAnimationFramePrompt(bdesc, fdesc, opts, lock)
    end

    local batch = AnimationEncoder.ToBatchRequests(spec, builder, options, seed)

    local ok, err = SpriteValidator.ValidateBatchUniformity(batch, true)
    if not ok then
        return { _error = err, batch = batch }
    end

    return batch
end

--- 生成自定义动画帧批次请求
-- @param baseDesc string 角色基础描述
-- @param frameDescs table 自定义帧描述数组
-- @param options table|nil 配置
-- @return table batch 批量请求数组
function M.GenerateCustomAnimation(baseDesc, frameDescs, options)
    options = options or {}
    local size = options.size or DEFAULT_SIZE
    local ratio = options.aspectRatio or DEFAULT_ASPECT_RATIO
    local seed = options.seed or AnimationEncoder.CreateConsistencySeed(baseDesc)

    local extraParts = {}
    if options.palette then
        local p = PaletteDirector.BuildPalettePrefix(options.palette)
        if p then table.insert(extraParts, p) end
    end
    options.extra = table.concat(extraParts, ",")

    local spec = AnimationEncoder.CreateCustomAnimationSpec(baseDesc, frameDescs)

    local function builder(bdesc, fdesc, opts, lock)
        return PixelPromptEngine.BuildAnimationFramePrompt(bdesc, fdesc, opts, lock)
    end

    local batch = AnimationEncoder.ToBatchRequests(spec, builder, options, seed)

    local ok, err = SpriteValidator.ValidateBatchUniformity(batch, true)
    if not ok then
        return { _error = err, batch = batch }
    end

    return batch
end

--- 为单张生成请求追加逐像素精确控制
-- @param request table 生成请求表
-- @return table request 修改后的请求表
function M.EnforcePixelPerfect(request)
    request = request or {}
    if type(request.prompt) == "string" then
        request.prompt = request.prompt .. ",逐像素精确控制,每个像素边界清晰,像素级颜色定位,无子像素偏移,硬锯齿,禁用渐变"
    end
    return request
end

--- 为批次所有请求追加逐像素精确控制
-- @param batch table 批量请求数组
-- @return table batch 修改后的批量请求数组
function M.EnforceBatchPixelPerfect(batch)
    if not batch then return {} end
    local result = {}
    for _, req in ipairs(batch) do
        table.insert(result, M.EnforcePixelPerfect(req))
    end
    return result
end

return M
