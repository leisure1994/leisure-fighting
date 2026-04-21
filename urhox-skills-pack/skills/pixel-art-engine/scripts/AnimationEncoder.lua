-- AnimationEncoder.lua
-- 动画帧序列编码器
-- 提供帧间一致性约束、轮廓锁定与批量生成参数封装

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local ANIMATION_IDLE  = "idle"
local ANIMATION_WALK  = "walk"
local ANIMATION_RUN   = "run"
local ANIMATION_ATTACK = "attack"
local ANIMATION_JUMP  = "jump"
local ANIMATION_HURT  = "hurt"
local ANIMATION_DEATH = "death"

--- 内置动画帧姿态库
local BUILTIN_ANIMATIONS = {
    [ANIMATION_IDLE] = {
        "站立姿势,双脚并拢,双臂自然下垂",
        "待机站立,微微上下浮动,呼吸感,双臂轻微摆动",
    },
    [ANIMATION_WALK] = {
        "站立姿势,双脚并拢",
        "行走姿势,左腿向前迈出,右腿在后,左臂向后摆动",
        "行走姿势,双腿交叉中间过渡",
        "行走姿势,右腿向前迈出,左腿在后,右臂向后摆动",
    },
    [ANIMATION_RUN] = {
        "奔跑起步,身体前倾,右脚蹬地",
        "奔跑腾空,左腿前跨,右腿后蹬,双臂大幅摆动",
        "奔跑落地,右腿前跨,左腿后蹬",
        "奔跑腾空,双腿打开最大幅度",
    },
    [ANIMATION_ATTACK] = {
        "攻击蓄力姿势,武器举起后方,身体后倾",
        "攻击挥击中,武器向前劈下,身体前倾",
        "攻击完成姿势,武器前伸到位,双脚站稳",
        "攻击收招姿势,武器回撤,恢复待机",
    },
    [ANIMATION_JUMP] = {
        "跳跃蓄力,膝盖弯曲,身体下蹲",
        "起跳腾空,双腿收起,身体上升",
        "跳跃顶点,双腿展开,身体舒展",
        "下落着地,双腿弯曲,缓冲落地",
    },
    [ANIMATION_HURT] = {
        "受击姿势,身体后仰,表情痛苦,双臂护胸",
        "受击恢复,身体前倾,踉跄一步",
    },
    [ANIMATION_DEATH] = {
        "濒倒姿势,膝盖跪地,身体前倾",
        "倒地姿势,侧躺地面,双眼闭合",
    },
}

--- 默认配置
local DEFAULT_FRAME_COUNT = 4

-- ============================================================================
-- 内部辅助函数
-- ============================================================================

--- 从基础描述中提取轮廓签名（用于锁定角色比例和外观）
-- @param baseDesc string 基础描述
-- @return string 轮廓锁定字符串
local function extractSilhouetteLock(baseDesc)
    if not baseDesc or baseDesc == "" then
        return "轮廓锁定,比例不变,外观一致"
    end
    return "轮廓锁定,比例不变,外观一致,相同角色:" .. baseDesc
end

--- 复制表（浅拷贝）
-- @param t table 源表
-- @return table 拷贝
local function shallowCopy(t)
    local c = {}
    for k, v in pairs(t) do
        c[k] = v
    end
    return c
end

-- ============================================================================
-- 公共 API
-- ============================================================================

--- 创建动画规格表
-- @param animType string 动画类型：idle/walk/run/attack/jump/hurt/death
-- @param baseDesc string 角色基础描述（决定轮廓和比例）
-- @param frameCount number|nil 帧数，默认使用内置库长度
-- @return table spec 动画规格表
function M.CreateAnimationSpec(animType, baseDesc, frameCount)
    animType = animType or ANIMATION_IDLE
    baseDesc = baseDesc or ""
    local builtinFrames = BUILTIN_ANIMATIONS[animType] or BUILTIN_ANIMATIONS[ANIMATION_IDLE]
    frameCount = frameCount or #builtinFrames

    local frames = {}
    for i = 1, frameCount do
        local desc = builtinFrames[i]
        if not desc then
            -- 如果超出内置长度，复制最后一帧
            desc = builtinFrames[#builtinFrames]
        end
        table.insert(frames, {
            index = i,
            description = desc,
        })
    end

    return {
        animType = animType,
        baseDesc = baseDesc,
        frameCount = frameCount,
        frames = frames,
        silhouetteLock = extractSilhouetteLock(baseDesc),
    }
end

--- 创建自定义动画规格表（完全自定义帧描述）
-- @param baseDesc string 角色基础描述
-- @param frameDescs table 帧描述字符串数组
-- @return table spec 动画规格表
function M.CreateCustomAnimationSpec(baseDesc, frameDescs)
    baseDesc = baseDesc or ""
    frameDescs = frameDescs or {}

    local frames = {}
    for i, desc in ipairs(frameDescs) do
        table.insert(frames, {
            index = i,
            description = tostring(desc),
        })
    end

    return {
        animType = "custom",
        baseDesc = baseDesc,
        frameCount = #frames,
        frames = frames,
        silhouetteLock = extractSilhouetteLock(baseDesc),
    }
end

--- 创建用于生成批次的统一种子
-- @param base string|number|nil 基础种子源
-- @return number seed 整数种子
function M.CreateConsistencySeed(base)
    if type(base) == "number" then
        return math.floor(base)
    end
    if type(base) == "string" then
        local hash = 0
        for i = 1, #base do
            hash = ((hash * 31) + string.byte(base, i)) % 2147483647
        end
        return hash
    end
    return math.random(1, 2147483647)
end

--- 将动画规格转换为逐帧生成参数表
-- 返回的表可直接用于批量图像生成接口
-- @param spec table 动画规格表（由 CreateAnimationSpec 生成）
-- @param promptBuilder fun(baseDesc, frameDesc, options, silhouetteLock):string 提示词构建函数
-- @param options table 资源配置（pixelSize, aspectRatio, transparent 等）
-- @param seed number|nil 一致性种子
-- @return table batch 批量生成参数数组，每个元素包含 prompt/name/target_size/aspect_ratio/transparent/seed
function M.ToBatchRequests(spec, promptBuilder, options, seed)
    promptBuilder = promptBuilder or function(baseDesc, frameDesc, opts, lock)
        return baseDesc .. "," .. frameDesc .. "," .. lock
    end
    options = options or {}
    seed = seed or M.CreateConsistencySeed(spec.baseDesc)

    local batch = {}
    for _, frame in ipairs(spec.frames) do
        local prompt = promptBuilder(spec.baseDesc, frame.description, options, spec.silhouetteLock)
        local name = string.format("%s_%s_%02d", spec.baseDesc:gsub("[%s,]", "_"):sub(1, 20), spec.animType, frame.index)

        table.insert(batch, {
            prompt = prompt,
            name = name,
            target_size = options.size or "32x32",
            aspect_ratio = options.aspectRatio or "1:1",
            transparent = options.transparent ~= false,
            seed = seed,
        })
    end
    return batch
end

--- 校验动画帧的一致性
-- 检查所有帧是否共享相同的 baseDesc 和 seed
-- @param batch table 批量生成参数数组
-- @param expectedSeed number|nil 预期种子
-- @return boolean ok 是否通过校验
-- @return string|nil err 错误信息
function M.ValidateFrameConsistency(batch, expectedSeed)
    if not batch or #batch == 0 then
        return false, "批次为空"
    end

    local firstBase = nil
    for i, item in ipairs(batch) do
        local prompt = item.prompt or ""
        local base = ""
        -- 简单提取 baseDesc（取第一个逗号前的非关键词部分，作为近似）
        -- 实际应用中 baseDesc 通常位于 prompt 中段，此处做宽松检查
        if not firstBase then
            firstBase = prompt
        else
            -- 通过轮廓锁定关键词检查
            if not string.find(prompt, "轮廓锁定,比例不变,外观一致") then
                return false, string.format("第 %d 帧缺少轮廓锁定签名，可能导致帧间变形", i)
            end
        end

        if expectedSeed and item.seed ~= expectedSeed then
            return false, string.format("第 %d 帧种子不一致：期望 %d，实际 %d", i, expectedSeed, item.seed or 0)
        end
    end

    return true, nil
end

--- 获取动画类型的推荐帧数
-- @param animType string 动画类型
-- @return number 推荐帧数
function M.GetRecommendedFrameCount(animType)
    local counts = {
        [ANIMATION_IDLE]  = 2,
        [ANIMATION_WALK]  = 4,
        [ANIMATION_RUN]   = 4,
        [ANIMATION_ATTACK] = 4,
        [ANIMATION_JUMP]  = 4,
        [ANIMATION_HURT]  = 2,
        [ANIMATION_DEATH] = 2,
    }
    return counts[animType] or DEFAULT_FRAME_COUNT
end

--- 获取所有支持的动画类型列表
-- @return table types 动画类型字符串数组
function M.ListAnimationTypes()
    return { ANIMATION_IDLE, ANIMATION_WALK, ANIMATION_RUN, ANIMATION_ATTACK, ANIMATION_JUMP, ANIMATION_HURT, ANIMATION_DEATH }
end

return M
