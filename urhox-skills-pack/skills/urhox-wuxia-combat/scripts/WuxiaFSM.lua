-- WuxiaFSM.lua
-- 武侠战斗有限状态机
-- 基于 kyleconroy/lua-state-machine 的状态切换逻辑，深度融合武侠特化规则：
-- 连招窗口、硬直、霸体优先级、格挡反击、受击打断

local Utils = require("scripts/CombatUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local NONE = "none"
local ASYNC = "async"
local WUXIA_PRIORITY_IDLE = 0
local WUXIA_PRIORITY_DODGE = 5
local WUXIA_PRIORITY_BLOCK = 10
local WUXIA_PRIORITY_LIGHT_ATTACK = 15
local WUXIA_PRIORITY_HEAVY_ATTACK = 25
local WUXIA_PRIORITY_SPECIAL_ATTACK = 35
local WUXIA_PRIORITY_HIT_STUN = 50
local WUXIA_PRIORITY_KNOCKDOWN = 60
local WUXIA_PRIORITY_SUPER_ARMOR = 100

-- ============================================================================
-- WuxiaStateMachine 核心类
-- ============================================================================

local WuxiaStateMachine = {}
WuxiaStateMachine.__index = WuxiaStateMachine

--- 创建武侠状态机实例
-- @param owner any 战斗单元的引用（如玩家节点或战斗组件）
-- @param config table 配置表，含 { initial, events, callbacks, priorities }
-- @return WuxiaStateMachine
function WuxiaStateMachine.New(owner, config)
    config = config or {}
    local self = setmetatable({}, WuxiaStateMachine)
    self.owner = owner
    self.current = config.initial or "idle"
    self.asyncState = NONE
    self.currentTransitioningEvent = nil
    self.events = {}
    self.options = config
    self.priorities = config.priorities or {}
    self.comboWindowActive = false
    self.comboWindowTime = 0.0
    self.comboWindowMaxTime = 0.3
    self.stateTimer = 0.0
    self.stateMaxTime = math.huge
    self.bufferedInput = nil
    self.bufferedInputTime = 0.0
    self.bufferExpiry = 0.2
    self.invincible = false
    self.superArmor = false
    self.canCancel = false
    self.currentCallbackEntry = nil

    -- 解析事件定义
    for _, event in ipairs(config.events or {}) do
        local name = event.name
        if not self.events[name] then
            self.events[name] = { map = {} }
        end
        self:_AddToMap(self.events[name].map, event)
        -- 若尚未绑定函数，创建事件触发函数
        if not self[name] then
            self[name] = function(_, ...)
                return self:_CreateAndRunTransition(name, ...)
            end
        end
    end

    -- 解析回调
    for name, callback in pairs(config.callbacks or {}) do
        self[name] = callback
    end

    return self
end

--- 内部：将事件映射添加到 map
-- @param map table
-- @param event table
function WuxiaStateMachine:_AddToMap(map, event)
    if type(event.from) == "string" then
        map[event.from] = event.to
    elseif type(event.from) == "table" then
        for _, from in ipairs(event.from) do
            map[from] = event.to
        end
    end
end

--- 获取当前状态的优先级值
-- @return number
function WuxiaStateMachine:GetCurrentPriority()
    return self.priorities[self.current] or WUXIA_PRIORITY_IDLE
end

--- 设置某状态的优先级（用于动态热修）
-- @param stateName string
-- @param priority number
function WuxiaStateMachine:SetPriority(stateName, priority)
    self.priorities[stateName] = priority
end

--- 检查当前状态是否为指定状态
-- @param state string
-- @return boolean
function WuxiaStateMachine:Is(state)
    return self.current == state
end

--- 检查是否能执行指定事件
-- @param eventName string
-- @return boolean, string|nil 是否可执行，目标状态
function WuxiaStateMachine:Can(eventName)
    local event = self.events[eventName]
    if not event then
        return false, nil
    end
    local to = event.map[self.current] or event.map["*"]
    return to ~= nil, to
end

--- 检查是否不能执行指定事件
-- @param eventName string
-- @return boolean
function WuxiaStateMachine:Cannot(eventName)
    return not self:Can(eventName)
end

--- 内部：创建状态转换函数并立即执行
-- @param name string 事件名
-- @return function 转换函数
function WuxiaStateMachine:_CreateAndRunTransition(name)
    local transition
    transition = function(selfRef, ...)
        if self.asyncState == NONE then
            local can, to = self:Can(name)
            local from = self.current
            local params = { self, name, from, to, ... }

            if not can then
                -- 若无法转换且开启了输入缓冲，尝试暂存
                self:_TryBufferInput(name, params)
                return false
            end

            -- 武侠优先级判定：低优先级状态无法主动切向高优先级状态（除了某些 write 规则）
            local currentPrio = self:GetCurrentPriority()
            local targetPrio = self.priorities[to] or WUXIA_PRIORITY_IDLE
            if targetPrio < currentPrio and not self.canCancel and not self.superArmor then
                self:_TryBufferInput(name, params)
                return false
            end

            self.currentTransitioningEvent = name

            local beforeReturn = self:_CallHandler(self["onbefore" .. name], params)
            local leaveReturn = self:_CallHandler(self["onleave" .. from], params)

            if beforeReturn == false or leaveReturn == false then
                self.currentTransitioningEvent = nil
                return false
            end

            self.asyncState = name .. "WaitingOnLeave"
            if leaveReturn ~= ASYNC then
                transition(selfRef, ...)
            end
            return true

        elseif self.asyncState == name .. "WaitingOnLeave" then
            local event = self.events[name]
            local to = event.map[self.current] or event.map["*"]
            local from = self.current
            local params = { self, name, from, to, ... }

            self.current = to
            self.stateTimer = 0.0
            self:_OnEnterState(to)

            local enterReturn = self:_CallHandler(self["onenter" .. to] or self["on" .. to], params)
            self.asyncState = name .. "WaitingOnEnter"

            if enterReturn ~= ASYNC then
                transition(selfRef, ...)
            end
            return true

        elseif self.asyncState == name .. "WaitingOnEnter" then
            local event = self.events[name]
            local to = event.map[self.current] or event.map["*"]
            local from = self.current
            -- 这里的 from 其实是切换前的状态，已在上一步记录
            local params = { self, name, from, to, ... }

            self:_CallHandler(self["onafter" .. name] or self["on" .. name], params)
            self:_CallHandler(self["onstatechange"], params)
            self.asyncState = NONE
            self.currentTransitioningEvent = nil
            return true

        else
            local lower = string.lower(self.asyncState)
            if string.find(lower, "waitingonleave") or string.find(lower, "waitingonenter") then
                self.asyncState = NONE
                return transition(selfRef, ...)
            end
        end

        self.currentTransitioningEvent = nil
        return false
    end

    -- 立即执行
    return transition(self, ...)
end

--- 内部：调用回调处理器
-- @param handler function|nil
-- @param params table
-- @return any
function WuxiaStateMachine:_CallHandler(handler, params)
    if type(handler) == "function" then
        return handler(unpack(params))
    end
    return nil
end

--- 内部：尝试将输入缓冲到队列
-- @param eventName string
-- @param params table
function WuxiaStateMachine:_TryBufferInput(eventName, params)
    if self.comboWindowActive or self:Is("idle") or self:Is("block") then
        self.bufferedInput = eventName
        self.bufferedInputTime = 0.0
    end
end

--- 内部：进入状态时重置相关属性
-- @param stateName string
function WuxiaStateMachine:_OnEnterState(stateName)
    self.comboWindowActive = false
    self.canCancel = false
    self.invincible = false
    self.superArmor = false

    local prio = self.priorities[stateName] or WUXIA_PRIORITY_IDLE
    if prio >= WUXIA_PRIORITY_DODGE and prio < WUXIA_PRIORITY_HIT_STUN then
        -- 攻击态默认不无敌但开启连招窗口（由动画回调触发）
    elseif stateName == "dodge" then
        self.invincible = true
    elseif stateName == "block" then
        self.superArmor = true
    elseif stateName == "hit_stun" or stateName == "knockdown" then
        -- 受击态默认不可操作
    end
end

--- 设置连招窗口持续时间与是否允许取消
-- 通常在动画回调中使用：如第 8 帧到第 12 帧之间可接下一招
-- @param duration number
-- @param allowCancel boolean|nil
function WuxiaStateMachine:OpenComboWindow(duration, allowCancel)
    self.comboWindowActive = true
    self.comboWindowTime = 0.0
    self.comboWindowMaxTime = duration or 0.3
    self.canCancel = allowCancel or false
end

--- 关闭连招窗口
function WuxiaStateMachine:CloseComboWindow()
    self.comboWindowActive = false
    self.comboWindowTime = 0.0
    self.canCancel = false
end

--- 开启霸体（Super Armor）
-- 霸体状态下不会被普通攻击打断，但会被抓取/击倒打断
function WuxiaStateMachine:EnableSuperArmor()
    self.superArmor = true
end

--- 关闭霸体
function WuxiaStateMachine:DisableSuperArmor()
    self.superArmor = false
end

--- 设置状态的最大持续时间
-- 用于自动从收招/硬直回到 idle
-- @param maxTime number
function WuxiaStateMachine:SetStateMaxTime(maxTime)
    self.stateMaxTime = maxTime
end

--- 更新状态机（应在 Update 循环中调用）
-- @param dt number 时间步长
function WuxiaStateMachine:Update(dt)
    self.stateTimer = self.stateTimer + dt

    -- 连招窗口计时
    if self.comboWindowActive then
        self.comboWindowTime = self.comboWindowTime + dt
        if self.comboWindowTime >= self.comboWindowMaxTime then
            self:CloseComboWindow()
        end
    end

    -- 缓冲输入计时
    if self.bufferedInput then
        self.bufferedInputTime = self.bufferedInputTime + dt
        if self.bufferedInputTime >= self.bufferExpiry then
            self.bufferedInput = nil
            self.bufferedInputTime = 0.0
        end
    end

    -- 状态超时自动回 idle
    if self.stateTimer >= self.stateMaxTime then
        if self.current ~= "idle" and self.current ~= "knockdown" then
            -- knockdown 需要额外起身逻辑，不在这里处理
            if self["force_idle"] then
                self:force_idle()
            end
        end
    end

    -- 若当前在 idle 或窗口期，且存在缓冲输入，尝试执行
    if self.bufferedInput and (self:Is("idle") or self.comboWindowActive) then
        local bufferedEvent = self.bufferedInput
        self.bufferedInput = nil
        self.bufferedInputTime = 0.0
        if self[bufferedEvent] then
            self[bufferedEvent](self)
        end
    end
end

--- 判断当前是否可被某种打断级别打断
-- @param interruptLevel number 打断级别（如 WUXIA_PRIORITY_LIGHT_ATTACK）
-- @return boolean
function WuxiaStateMachine:CanBeInterrupted(interruptLevel)
    if self.invincible then
        return false
    end
    if self.superArmor then
        return interruptLevel >= WUXIA_PRIORITY_SUPER_ARMOR
    end
    local currentPrio = self:GetCurrentPriority()
    return interruptLevel >= currentPrio
end

--- 手动触发受击（外部伤害模块调用）
-- @param damageEvent table 伤害事件信息
-- @return boolean 是否成功被打断
function WuxiaStateMachine:TakeHit(damageEvent)
    local interruptLevel = damageEvent.interruptLevel or WUXIA_PRIORITY_LIGHT_ATTACK
    if not self:CanBeInterrupted(interruptLevel) then
        -- 霸体/格挡触发音效/特效但不被打断
        if self:Is("block") and damageEvent.blockable then
            self:_CallHandler(self["onblocksuccess"], { self, damageEvent })
        end
        return false
    end

    -- 根据伤害类型选择进入 hit_stun 或 knockdown
    if damageEvent.knockdown then
        if self["knockdown_event"] then
            self:knockdown_event()
        end
    else
        if self["hitstun_event"] then
            self:hitstun_event()
        end
    end

    self:_CallHandler(self["onhittaken"], { self, damageEvent })
    return true
end

--- 导出状态机到 Graphviz DOT 文件（调试用）
-- @param filename string
function WuxiaStateMachine:ToDot(filename)
    local dotfile = io.open(filename, "w")
    if not dotfile then
        return
    end
    dotfile:write("digraph {\n")
    for _, event in pairs(self.options.events or {}) do
        if type(event.from) == "table" then
            for _, from in ipairs(event.from) do
                dotfile:write(string.format('  "%s" -> "%s" [label="%s"];\n', from, event.to, event.name))
            end
        else
            dotfile:write(string.format('  "%s" -> "%s" [label="%s"];\n', event.from, event.to, event.name))
        end
    end
    dotfile:write("}\n")
    dotfile:close()
end

--- 获取当前状态的描述信息（调试用）
-- @return table
function WuxiaStateMachine:GetDebugInfo()
    return {
        current = self.current,
        priority = self:GetCurrentPriority(),
        comboWindow = self.comboWindowActive,
        comboProgress = self.comboWindowTime,
        superArmor = self.superArmor,
        invincible = self.invincible,
        buffered = self.bufferedInput,
        stateTimer = self.stateTimer,
    }
end

M.WuxiaStateMachine = WuxiaStateMachine
M.ASYNC = ASYNC
M.NONE = NONE

-- ============================================================================
-- 预置武侠战斗状态机配置工厂
-- ============================================================================

--- 创建标准武侠战斗 FSM 配置
-- @return table config
function M.CreateStandardWuxiaConfig()
    return {
        initial = "idle",
        events = {
            { name = "light_attack", from = { "idle", "light_1", "light_2", "dodge", "block" }, to = "light_1" },
            { name = "light_2",    from = "light_1", to = "light_2" },
            { name = "light_3",    from = "light_2", to = "light_3" },
            { name = "heavy_attack", from = { "idle", "light_1", "light_2", "dodge", "block" }, to = "heavy_1" },
            { name = "special_attack", from = { "idle", "block" }, to = "special" },
            { name = "dodge",      from = { "idle", "light_1", "light_2", "block" }, to = "dodge" },
            { name = "block",      from = "idle", to = "block" },
            { name = "parry",      from = "block", to = "parry" },
            { name = "hitstun_event", from = "*", to = "hit_stun" },
            { name = "knockdown_event", from = "*", to = "knockdown" },
            { name = "force_idle", from = "*", to = "idle" },
            { name = "getup",      from = "knockdown", to = "idle" },
        },
        priorities = {
            ["idle"] = WUXIA_PRIORITY_IDLE,
            ["dodge"] = WUXIA_PRIORITY_DODGE,
            ["block"] = WUXIA_PRIORITY_BLOCK,
            ["parry"] = WUXIA_PRIORITY_BLOCK,
            ["light_1"] = WUXIA_PRIORITY_LIGHT_ATTACK,
            ["light_2"] = WUXIA_PRIORITY_LIGHT_ATTACK,
            ["light_3"] = WUXIA_PRIORITY_LIGHT_ATTACK,
            ["heavy_1"] = WUXIA_PRIORITY_HEAVY_ATTACK,
            ["special"] = WUXIA_PRIORITY_SPECIAL_ATTACK,
            ["hit_stun"] = WUXIA_PRIORITY_HIT_STUN,
            ["knockdown"] = WUXIA_PRIORITY_KNOCKDOWN,
        },
        callbacks = {
            -- 用户可扩展：onenterlight_1, onbeforeheavy_attack, onhittaken, onblocksuccess 等
        },
    }
end

return M
