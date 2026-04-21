-- ComboBuffer.lua
-- 连招输入缓冲器
-- 解决玩家按键时机与动画窗口不完全对齐的问题，让玩家输入在一定时间内被保留并自动触发

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local DEFAULT_BUFFER_TIME = 0.25
local DEFAULT_CHAIN_TOLERANCE = 0.15
local INPUT_LIGHT = "light"
local INPUT_HEAVY = "heavy"
local INPUT_DODGE = "dodge"
local INPUT_BLOCK = "block"
local INPUT_SPECIAL = "special"
local INPUT_PARRY = "parry"

-- ============================================================================
-- ComboBuffer 类
-- ============================================================================

local ComboBuffer = {}
ComboBuffer.__index = ComboBuffer

--- 创建连招缓冲器
-- @param owner table 战斗组件或玩家控制器
-- @param fsm WuxiaStateMachine 武侠状态机实例
-- @return ComboBuffer
function ComboBuffer.New(owner, fsm)
    local self = setmetatable({}, ComboBuffer)
    self.owner = owner
    self.fsm = fsm
    self.bufferedInputs = {}
    self.bufferTime = DEFAULT_BUFFER_TIME
    self.chainTolerance = DEFAULT_CHAIN_TOLERANCE
    self.maxBufferCount = 3
    self.lastInputTime = -math.huge
    self.comboCount = 0
    self.comboTimer = 0.0
    self.comboMaxInterval = 1.0
    self.comboSequence = {}
    self.onComboAdvance = nil
    self.onComboBreak = nil
    self.disabled = false
    return self
end

--- 设置缓冲参数
-- @param bufferTime number 单个输入的最大保留时间
-- @param chainTolerance number 连招链的容差时间
-- @param maxCount number 最大同时缓冲的输入数量
function ComboBuffer:SetParams(bufferTime, chainTolerance, maxCount)
    self.bufferTime = bufferTime or DEFAULT_BUFFER_TIME
    self.chainTolerance = chainTolerance or DEFAULT_CHAIN_TOLERANCE
    self.maxBufferCount = maxCount or 3
end

--- 设置连招间隔（超过此时间则连击数归零）
-- @param interval number
function ComboBuffer:SetComboMaxInterval(interval)
    self.comboMaxInterval = interval or 1.0
end

--- 禁用/启用缓冲
-- @param flag boolean
function ComboBuffer:SetDisabled(flag)
    self.disabled = flag
end

--- 记录一次原始输入
-- @param inputType string 输入类型（INPUT_LIGHT / INPUT_HEAVY / ...）
-- @param extraData table|nil 额外数据（如技能ID、方向、按键索引）
function ComboBuffer:PushInput(inputType, extraData)
    if self.disabled then
        return
    end
    local now = love and love.timer.getTime() or os.clock()
    local entry = {
        type = inputType,
        time = now,
        data = extraData or {},
        processed = false,
    }
    table.insert(self.bufferedInputs, entry)
    self.lastInputTime = now

    if #self.bufferedInputs > self.maxBufferCount then
        table.remove(self.bufferedInputs, 1)
    end
end

--- 直接触发轻攻击（外部按键绑定用）
function ComboBuffer:PushLight()
    self:PushInput(INPUT_LIGHT)
end

--- 直接触发重攻击
function ComboBuffer:PushHeavy()
    self:PushInput(INPUT_HEAVY)
end

--- 直接触发闪避
function ComboBuffer:PushDodge()
    self:PushInput(INPUT_DODGE)
end

--- 直接触发格挡
function ComboBuffer:PushBlock()
    self:PushInput(INPUT_BLOCK)
end

--- 直接触发特殊技
function ComboBuffer:PushSpecial()
    self:PushInput(INPUT_SPECIAL)
end

--- 直接触发弹反
function ComboBuffer:PushParry()
    self:PushInput(INPUT_PARRY)
end

--- 根据当前状态机和输入类型，解析下一步应进入的招式
-- @param inputType string
-- @return string|nil 事件名（供 fsm 调用）
function ComboBuffer:_ResolveEvent(inputType)
    if not self.fsm then
        return nil
    end
    local current = self.fsm.current

    if inputType == INPUT_LIGHT then
        if current == "idle" or current == "dodge" or current == "block" then
            return "light_attack"
        elseif current == "light_1" then
            if self.comboWindowOpen then
                return "light_2"
            else
                return "light_attack"
            end
        elseif current == "light_2" then
            if self.comboWindowOpen then
                return "light_3"
            else
                return "light_attack"
            end
        elseif current == "light_3" then
            -- 第3段后可循环回第1段（若支持无限连）
            return "light_attack"
        end
    elseif inputType == INPUT_HEAVY then
        return "heavy_attack"
    elseif inputType == INPUT_DODGE then
        return "dodge"
    elseif inputType == INPUT_BLOCK then
        return "block"
    elseif inputType == INPUT_SPECIAL then
        return "special_attack"
    elseif inputType == INPUT_PARRY then
        return "parry"
    end

    return nil
end

--- 手动通知缓冲器当前连招窗口已打开
-- @param open boolean
function ComboBuffer:NotifyComboWindow(open)
    self.comboWindowOpen = open
end

--- 清空所有缓冲输入
function ComboBuffer:Clear()
    self.bufferedInputs = {}
end

--- 中断当前连招（如被击飞）
function ComboBuffer:BreakCombo()
    self.comboCount = 0
    self.comboTimer = 0.0
    self.comboSequence = {}
    self.comboWindowOpen = false
    self:Clear()
    if type(self.onComboBreak) == "function" then
        self.onComboBreak(self.owner)
    end
end

--- 更新缓冲器（应在 Update 中调用）
-- @param dt number
function ComboBuffer:Update(dt)
    if self.disabled or not self.fsm then
        return
    end

    -- 连招计时器
    self.comboTimer = self.comboTimer + dt
    if self.comboTimer >= self.comboMaxInterval then
        if self.comboCount > 0 then
            self.comboCount = 0
            self.comboSequence = {}
            if type(self.onComboBreak) == "function" then
                self.onComboBreak(self.owner)
            end
        end
    end

    local now = love and love.timer.getTime() or os.clock()
    local i = 1
    while i <= #self.bufferedInputs do
        local entry = self.bufferedInputs[i]
        local age = now - entry.time

        if age > self.bufferTime then
            -- 超时丢弃
            table.remove(self.bufferedInputs, i)
        else
            if not entry.processed then
                local eventName = self:_ResolveEvent(entry.type)
                if eventName then
                    local can, to = self.fsm:Can(eventName)
                    if can then
                        -- 执行状态转换
                        local ok = self.fsm[eventName](self.fsm)
                        if ok then
                            entry.processed = true
                            self.comboTimer = 0.0
                            self.comboCount = self.comboCount + 1
                            table.insert(self.comboSequence, entry.type)
                            if type(self.onComboAdvance) == "function" then
                                self.onComboAdvance(self.owner, self.comboCount, eventName, entry)
                            end
                            -- 成功执行后清空该输入
                            table.remove(self.bufferedInputs, i)
                            goto continue
                        end
                    end
                end
            end
            i = i + 1
        end
        ::continue::
    end
end

--- 获取当前连招序列（用于调试或显示连击数）
-- @return table
function ComboBuffer:GetSequence()
    return Utils.DeepCopy(self.comboSequence)
end

--- 获取当前连击数
-- @return number
function ComboBuffer:GetComboCount()
    return self.comboCount
end

--- 检查是否存在指定类型的待处理输入
-- @param inputType string
-- @return boolean
function ComboBuffer:HasPendingInput(inputType)
    for _, entry in ipairs(self.bufferedInputs) do
        if not entry.processed and entry.type == inputType then
            return true
        end
    end
    return false
end

--- 设置连招推进回调
-- @param callback function(owner, comboCount, eventName, inputEntry)
function ComboBuffer:SetOnComboAdvance(callback)
    self.onComboAdvance = callback
end

--- 设置连招中断回调
-- @param callback function(owner)
function ComboBuffer:SetOnComboBreak(callback)
    self.onComboBreak = callback
end

M.ComboBuffer = ComboBuffer
M.INPUT_LIGHT = INPUT_LIGHT
M.INPUT_HEAVY = INPUT_HEAVY
M.INPUT_DODGE = INPUT_DODGE
M.INPUT_BLOCK = INPUT_BLOCK
M.INPUT_SPECIAL = INPUT_SPECIAL
M.INPUT_PARRY = INPUT_PARRY

return M
