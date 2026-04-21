-- SpriteValidator.lua
-- 精灵参数校验器
-- 校验尺寸、透明度要求、批次一致性与动画帧规范

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local VALID_SIZES = {
    ["16x16"]   = true, ["24x24"]  = true, ["32x32"]  = true, ["48x48"]  = true,
    ["64x64"]   = true, ["96x96"]  = true, ["128x128"] = true,
    ["16x24"]  = true, ["24x32"]  = true, ["32x48"]  = true, ["48x64"]  = true,
    ["64x96"]  = true,
    ["256x144"] = true, ["320x180"] = true, ["384x256"] = true,
    ["480x270"] = true, ["640x360"] = true,
    ["144x256"] = true, ["180x320"] = true, ["256x384"] = true,
    ["270x480"] = true,
}

local VALID_ASPECT_RATIOS = {
    ["1:1"]  = true, ["2:3"]  = true, ["3:4"]  = true,
    ["16:9"] = true, ["3:2"]  = true, ["9:16"] = true,
}

local ASSET_TYPES_REQUIRING_TRANSPARENCY = {
    character = true,
    item      = true,
    ui        = true,
}

local ASSET_TYPES_NO_TRANSPARENCY = {
    scene = true,
    tile  = true,
}

-- ============================================================================
-- 公共 API
-- ============================================================================

--- 校验尺寸字符串是否在支持列表中
-- @param sizeStr string 尺寸字符串（如 "32x32"）
-- @return boolean isValid 是否合法
-- @return string|nil err 错误信息
function M.ValidateSize(sizeStr)
    if VALID_SIZES[sizeStr] then
        return true, nil
    end
    local validList = {}
    for k, _ in pairs(VALID_SIZES) do
        table.insert(validList, k)
    end
    table.sort(validList)
    return false, "不支持的尺寸 " .. tostring(sizeStr) .. "，支持的尺寸: " .. table.concat(validList, ", ")
end

--- 校验宽高比字符串是否合法
-- @param ratioStr string 宽高比字符串（如 "1:1"）
-- @return boolean isValid 是否合法
-- @return string|nil err 错误信息
function M.ValidateAspectRatio(ratioStr)
    if VALID_ASPECT_RATIOS[ratioStr] then
        return true, nil
    end
    local validList = {}
    for k, _ in pairs(VALID_ASPECT_RATIOS) do
        table.insert(validList, k)
    end
    table.sort(validList)
    return false, "不支持的宽高比 " .. tostring(ratioStr) .. "，支持的值: " .. table.concat(validList, ", ")
end

--- 校验尺寸与宽高比是否匹配
-- @param sizeStr string 尺寸字符串
-- @param ratioStr string 宽高比字符串
-- @return boolean isValid 是否匹配
-- @return string|nil err 错误信息
function M.ValidateSizeAspectMatch(sizeStr, ratioStr)
    local w, h = string.match(tostring(sizeStr), "^(%d+)x(%d+)$")
    w = tonumber(w)
    h = tonumber(h)
    if not w or not h then
        return false, "尺寸格式错误"
    end

    local rw, rh = string.match(tostring(ratioStr), "^(%d+):(%d+)$")
    rw = tonumber(rw)
    rh = tonumber(rh)
    if not rw or not rh then
        return false, "宽高比格式错误"
    end

    -- 计算浮点比例并允许一定误差
    local actual = w / h
    local expected = rw / rh
    local diff = math.abs(actual - expected)
    if diff < 0.01 then
        return true, nil
    end

    return false, string.format("尺寸 %s 与宽高比 %s 不匹配（实际比例 %.3f，期望 %.3f）", sizeStr, ratioStr, actual, expected)
end

--- 判断资源类型是否需要透明背景
-- @param assetType string 资源类型
-- @return boolean requiresTransparency 是否需要透明背景
function M.RequiresTransparency(assetType)
    return ASSET_TYPES_REQUIRING_TRANSPARENCY[assetType] or false
end

--- 校验单个生成请求是否合规
-- @param request table 生成请求表（需包含 prompt, target_size, aspect_ratio, transparent 等字段）
-- @param assetType string 资源类型
-- @return boolean isValid 是否合规
-- @return string|nil err 错误信息
function M.ValidateRequest(request, assetType)
    request = request or {}
    assetType = assetType or "character"

    if type(request.prompt) ~= "string" or request.prompt == "" then
        return false, "prompt 不能为空"
    end

    local ok, err = M.ValidateSize(request.target_size)
    if not ok then return false, err end

    ok, err = M.ValidateAspectRatio(request.aspect_ratio)
    if not ok then return false, err end

    ok, err = M.ValidateSizeAspectMatch(request.target_size, request.aspect_ratio)
    if not ok then return false, err end

    local needsTransparent = M.RequiresTransparency(assetType)
    if needsTransparent and request.transparent ~= true then
        return false, string.format("资源类型 '%s' 必须设置 transparent=true", assetType)
    end

    if ASSET_TYPES_NO_TRANSPARENCY[assetType] and request.transparent == true then
        return false, string.format("资源类型 '%s' 不应设置 transparent=true", assetType)
    end

    return true, nil
end

--- 校验批次请求的一致性（动画帧或图标组）
-- @param batch table 批量请求数组
-- @param strictSeed boolean|nil 是否强制要求所有种子一致
-- @return boolean isValid 是否合规
-- @return string|nil err 错误信息
function M.ValidateBatchUniformity(batch, strictSeed)
    if not batch or #batch == 0 then
        return false, "批次不能为空"
    end

    local firstSize = batch[1].target_size
    local firstRatio = batch[1].aspect_ratio
    local firstSeed = batch[1].seed

    for i, item in ipairs(batch) do
        if item.target_size ~= firstSize then
            return false, string.format("第 %d 帧尺寸不一致：%s vs %s", i, item.target_size or "nil", firstSize)
        end
        if item.aspect_ratio ~= firstRatio then
            return false, string.format("第 %d 帧宽高比不一致：%s vs %s", i, item.aspect_ratio or "nil", firstRatio)
        end
        if strictSeed and item.seed ~= firstSeed then
            return false, string.format("第 %d 帧种子不一致：%s vs %s", i, tostring(item.seed), tostring(firstSeed))
        end
        if type(item.prompt) ~= "string" or item.prompt == "" then
            return false, string.format("第 %d 帧 prompt 为空", i)
        end
    end

    return true, nil
end

--- 获取所有合法尺寸列表
-- @return table sizes 尺寸字符串数组
function M.ListValidSizes()
    local list = {}
    for k, _ in pairs(VALID_SIZES) do
        table.insert(list, k)
    end
    table.sort(list, function(a, b)
        local aw, ah = string.match(a, "^(%d+)x(%d+)$")
        local bw, bh = string.match(b, "^(%d+)x(%d+)$")
        local areaA = (tonumber(aw) or 0) * (tonumber(ah) or 0)
        local areaB = (tonumber(bw) or 0) * (tonumber(bh) or 0)
        return areaA < areaB
    end)
    return list
end

--- 获取所有合法宽高比列表
-- @return table ratios 宽高比字符串数组
function M.ListValidAspectRatios()
    local list = {}
    for k, _ in pairs(VALID_ASPECT_RATIOS) do
        table.insert(list, k)
    end
    table.sort(list)
    return list
end

return M
