-- lua-behavior-tree
-- 基于 behavior3lua 改写，适用于 UrhoX 游戏引擎
-- 提供 BehaviorTree、Blackboard、Node 核心，以及常用内置 AI 节点

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local SUCCESS = "SUCCESS"
local FAIL = "FAIL"
local RUNNING = "RUNNING"
local ABORT = "ABORT"

-- ============================================================================
-- 基础对象系统（简化版 classic）
-- ============================================================================

local Object = {}
Object.__index = Object

--- 创建新实例
function Object:new(...)
end

--- 派生新类
-- @return table 新类
function Object:extend()
    local cls = {}
    for k, v in pairs(self) do
        if k:find("__") == 1 then
            cls[k] = v
        end
    end
    cls.__index = cls
    cls.super = self
    setmetatable(cls, self)
    return cls
end

--- 实例化对象
function Object:__call(...)
    local obj = setmetatable({}, self)
    obj:new(...)
    return obj
end

-- ============================================================================
-- 行为树事件
-- ============================================================================

local BehaviorEvent = {
    INTERRUPTED = "treeInterrupted",
    BEFORE_RUN = "beforeRunTree",
    AFTER_RUN = "afterRunTree",
    AFTER_RUN_SUCCESS = "afterRunTreeSuccess",
    AFTER_RUN_FAILURE = "afterRunTreeFailure",
}

-- ============================================================================
-- Blackboard（黑板）
-- ============================================================================

---@class Blackboard
--- 用于在节点间共享数据的状态板
local Blackboard = Object:extend()
M.Blackboard = Blackboard

--- 构造函数
function Blackboard:new()
    self.data = {}
    self.inner = {}
end

--- 设置共享变量
-- @param key string 键名
-- @param value any 值
function Blackboard:set(key, value)
    if key == "" then return end
    self.data[key] = value
end

--- 获取共享变量
-- @param key string 键名
-- @return any 值
function Blackboard:get(key)
    return self.data[key]
end

--- 设置节点内部变量（用于状态保持）
-- @param nodeId string 节点唯一ID
-- @param key string 键名
-- @param value any 值
function Blackboard:setInner(nodeId, key, value)
    if nodeId == "" then return end
    self.inner[nodeId .. "_" .. key] = value
end

--- 获取节点内部变量
-- @param nodeId string 节点唯一ID
-- @param key string 键名
-- @return any 值
function Blackboard:getInner(nodeId, key)
    return self.inner[nodeId .. "_" .. key]
end

--- 清除所有数据
function Blackboard:clear()
    self.data = {}
    self.inner = {}
end

-- ============================================================================
-- BehaviorTree（行为树）
-- ============================================================================

---@class BehaviorTree
local BehaviorTree = {}
BehaviorTree.__index = BehaviorTree
M.BehaviorTree = BehaviorTree

--- 创建行为树
-- @param name string 行为树名称
-- @param rootNode Node 根节点
-- @param blackboard Blackboard 黑板实例
-- @return BehaviorTree 实例
function BehaviorTree.New(name, rootNode, blackboard)
    local self = setmetatable({}, BehaviorTree)
    self.name = name or "BehaviorTree"
    self.root = rootNode
    self.blackboard = blackboard or Blackboard()
    self.stack = {}      -- 运行栈
    self.lastRet = nil   -- 上一次的返回状态
    self.abort = false   -- 中断标志
    return self
end

--- 运行行为树一帧
-- @return string SUCCESS / FAIL / RUNNING / ABORT
function BehaviorTree:tick()
    if self.abort then
        self:interrupt()
        return ABORT
    end

    local ret
    if #self.stack > 0 then
        -- 恢复运行：从栈顶继续
        local lastNode = self.stack[#self.stack]
        while lastNode do
            ret = lastNode:tick(self)
            if ret == RUNNING then
                break
            end
            lastNode = self.stack[#self.stack]
        end
    else
        self:dispatchEvent(BehaviorEvent.BEFORE_RUN)
        ret = self.root:tick(self)
    end

    if self.abort then
        self:interrupt()
        return ABORT
    end

    if ret == SUCCESS then
        self:dispatchEvent(BehaviorEvent.AFTER_RUN)
        self:dispatchEvent(BehaviorEvent.AFTER_RUN_SUCCESS)
    elseif ret == FAIL then
        self:dispatchEvent(BehaviorEvent.AFTER_RUN)
        self:dispatchEvent(BehaviorEvent.AFTER_RUN_FAILURE)
    end

    self.lastRet = ret
    return ret
end

--- 中断当前行为树执行
function BehaviorTree:interrupt()
    if #self.stack > 0 then
        self:dispatchEvent(BehaviorEvent.INTERRUPTED)
        self.stack = {}
    end
    self.abort = false
end

--- 标记中断
function BehaviorTree:requestAbort()
    self.abort = true
end

--- 事件分发（可被子类覆盖）
-- @param event string 事件名
function BehaviorTree:dispatchEvent(event)
    -- 默认空实现，用户可继承覆盖
end

--- 压入运行栈
-- @param node Node 节点
function BehaviorTree:pushStack(node)
    self.stack[#self.stack + 1] = node
end

--- 弹出运行栈
-- @return Node 节点
function BehaviorTree:popStack()
    local node = self.stack[#self.stack]
    self.stack[#self.stack] = nil
    return node
end

--- 检查是否正在运行
-- @return boolean
function BehaviorTree:isRunning()
    return #self.stack > 0
end

-- ============================================================================
-- Node（行为树节点基类）
-- ============================================================================

---@class Node
local Node = Object:extend()
M.Node = Node

--- 构造函数
-- @param name string 节点名称
-- @param nodeType string 节点类型：Action/Condition/Composite/Decorator
-- @param id string|number 节点ID
function Node:new(name, nodeType, id)
    self.name = name or "Node"
    self.nodeType = nodeType or "Action"
    self.id = tostring(id or 0)
    self.children = {}   -- 子节点列表
    self.args = {}       -- 参数表
    self.status = nil    -- 当前状态
end

--- 添加子节点
-- @param child Node 子节点
function Node:addChild(child)
    table.insert(self.children, child)
end

--- 设置参数
-- @param key string 键
-- @param value any 值
function Node:setArg(key, value)
    self.args[key] = value
end

--- 获取参数
-- @param key string 键
-- @return any 值
function Node:getArg(key)
    return self.args[key]
end

--- 运行节点一帧（内部调度）
-- @param tree BehaviorTree 所属行为树
-- @return string 状态
function Node:tick(tree)
    if tree.abort then
        return RUNNING
    end

    -- 若未处于恢复状态，压栈
    local yieldFlag = tree.blackboard:getInner(self.id, "YIELD")
    if yieldFlag == nil then
        tree:pushStack(self)
    end

    -- 执行具体逻辑
    local ok, ret = pcall(self.onTick, self, tree)
    if not ok then
        error(string.format("Node %s#%s run error: %s", self.name, self.id, tostring(ret)))
    end

    if ret == ABORT then
        tree.abort = true
        return RUNNING
    end

    if ret ~= RUNNING then
        -- 运行结束，清掉内部标记并出栈
        tree.blackboard:setInner(self.id, "YIELD", nil)
        tree:popStack()
    elseif tree.blackboard:getInner(self.id, "YIELD") == nil then
        -- 首次挂起
        tree.blackboard:setInner(self.id, "YIELD", true)
    end

    tree.lastRet = ret
    return ret
end

--- 子类需覆盖此方法实现具体逻辑
-- @param tree BehaviorTree
-- @return string SUCCESS/FAIL/RUNNING/ABORT
function Node:onTick(tree)
    return SUCCESS
end

--- 恢复检查
-- @param tree BehaviorTree
-- @return any yield时保存的数据, string 上次返回值
function Node:resume(tree)
    local val = tree.blackboard:getInner(self.id, "YIELD")
    return val, tree.lastRet
end

--- 挂起节点到下一帧
-- @param tree BehaviorTree
-- @param value any 可选保存值
-- @return string RUNNING
function Node:yield(tree, value)
    tree.blackboard:setInner(self.id, "YIELD", value or true)
    return RUNNING
end

-- ============================================================================
-- Composite 节点（组合节点）
-- ============================================================================

---@class Composite : Node
local Composite = Node:extend()
M.Composite = Composite

--- 构造函数
-- @param name string 节点名称
-- @param id string|number 节点ID
function Composite:new(name, id)
    Node.new(self, name, "Composite", id)
end

-- --------------------------------------------------------------------------
-- Sequence（顺序执行）
-- --------------------------------------------------------------------------

---@class Sequence : Composite
local Sequence = Composite:extend()
M.Sequence = Sequence

--- 构造函数
-- @param id string|number 节点ID
function Sequence:new(id)
    Composite.new(self, "Sequence", id)
end

--- 顺序执行子节点，全部成功才返回成功
-- @param tree BehaviorTree
-- @return string
function Sequence:onTick(tree)
    local lastIdx = tree.blackboard:getInner(self.id, "SEQ_IDX")
    local lastRet = tree.lastRet

    if lastIdx then
        if lastRet == FAIL then
            tree.blackboard:setInner(self.id, "SEQ_IDX", nil)
            return FAIL
        elseif lastRet == SUCCESS then
            lastIdx = lastIdx + 1
        else
            error(string.format("Sequence#%s unexpected status", self.id))
        end
    else
        lastIdx = 1
    end

    for i = lastIdx, #self.children do
        local child = self.children[i]
        local r = child:tick(tree)
        if r == RUNNING then
            return self:yield(tree, i)
        end
        if r == FAIL then
            tree.blackboard:setInner(self.id, "SEQ_IDX", nil)
            return FAIL
        end
    end

    tree.blackboard:setInner(self.id, "SEQ_IDX", nil)
    return SUCCESS
end

-- --------------------------------------------------------------------------
-- Selector（选择执行）
-- --------------------------------------------------------------------------

---@class Selector : Composite
local Selector = Composite:extend()
M.Selector = Selector

--- 构造函数
-- @param id string|number 节点ID
function Selector:new(id)
    Composite.new(self, "Selector", id)
end

--- 顺序执行子节点，有一个成功即返回成功
-- @param tree BehaviorTree
-- @return string
function Selector:onTick(tree)
    local lastIdx = tree.blackboard:getInner(self.id, "SEL_IDX")
    local lastRet = tree.lastRet

    if lastIdx then
        if lastRet == SUCCESS then
            tree.blackboard:setInner(self.id, "SEL_IDX", nil)
            return SUCCESS
        elseif lastRet == FAIL then
            lastIdx = lastIdx + 1
        else
            error(string.format("Selector#%s unexpected status", self.id))
        end
    else
        lastIdx = 1
    end

    for i = lastIdx, #self.children do
        local child = self.children[i]
        local r = child:tick(tree)
        if r == RUNNING then
            return self:yield(tree, i)
        end
        if r == SUCCESS then
            tree.blackboard:setInner(self.id, "SEL_IDX", nil)
            return SUCCESS
        end
    end

    tree.blackboard:setInner(self.id, "SEL_IDX", nil)
    return FAIL
end

-- --------------------------------------------------------------------------
-- Parallel（并行执行）
-- --------------------------------------------------------------------------

---@class Parallel : Composite
local Parallel = Composite:extend()
M.Parallel = Parallel

--- 构造函数
-- @param id string|number 节点ID
function Parallel:new(id)
    Composite.new(self, "Parallel", id)
end

--- 并行执行所有子节点
-- @param tree BehaviorTree
-- @return string
function Parallel:onTick(tree)
    local bb = tree.blackboard
    local lastState = bb:getInner(self.id, "PAR_STATE")
    local level = #tree.stack
    local finishedCount = 0
    lastState = lastState or {}

    for i = 1, #self.children do
        local child = self.children[i]
        local nodes = lastState[i]
        local status = nil

        if nodes == nil then
            status = child:tick(tree)
        elseif #nodes > 0 then
            while #nodes > 0 do
                local n = table.remove(nodes)
                tree:pushStack(n)
                status = n:tick(tree)
                if status == RUNNING then
                    local p = #nodes + 1
                    while #tree.stack > level do
                        table.insert(nodes, p, tree:popStack())
                    end
                    break
                end
            end
        else
            status = SUCCESS
        end

        if status == RUNNING then
            if nodes == nil then
                nodes = {}
            end
            while #tree.stack > level do
                table.insert(nodes, 1, tree:popStack())
            end
        else
            nodes = {}
            finishedCount = finishedCount + 1
        end

        lastState[i] = nodes
    end

    if finishedCount == #self.children then
        bb:setInner(self.id, "PAR_STATE", nil)
        return SUCCESS
    else
        return self:yield(tree, lastState)
    end
end

-- ============================================================================
-- Decorator 节点（装饰节点）
-- ============================================================================

---@class Decorator : Node
local Decorator = Node:extend()
M.Decorator = Decorator

--- 构造函数
-- @param name string 节点名称
-- @param id string|number 节点ID
function Decorator:new(name, id)
    Node.new(self, name, "Decorator", id)
end

-- --------------------------------------------------------------------------
-- Invert（结果取反）
-- --------------------------------------------------------------------------

---@class Invert : Decorator
local Invert = Decorator:extend()
M.Invert = Invert

--- 构造函数
-- @param id string|number 节点ID
function Invert:new(id)
    Decorator.new(self, "Invert", id)
end

--- 取反子节点执行结果
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL/RUNNING
function Invert:onTick(tree)
    local child = self.children[1]
    if not child then
        return FAIL
    end

    local resumeFlag = self:resume(tree)
    local r
    if resumeFlag then
        r = tree.lastRet
    else
        r = child:tick(tree)
    end

    if r == RUNNING then
        return self:yield(tree)
    elseif r == SUCCESS then
        return FAIL
    else
        return SUCCESS
    end
end

-- --------------------------------------------------------------------------
-- AlwaysSuccess（始终成功）
-- --------------------------------------------------------------------------

---@class AlwaysSuccess : Decorator
local AlwaysSuccess = Decorator:extend()
M.AlwaysSuccess = AlwaysSuccess

--- 构造函数
-- @param id string|number 节点ID
function AlwaysSuccess:new(id)
    Decorator.new(self, "AlwaysSuccess", id)
end

--- 无论子节点结果如何都返回成功
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/RUNNING
function AlwaysSuccess:onTick(tree)
    local child = self.children[1]
    if not child then
        return SUCCESS
    end
    local resumeFlag = self:resume(tree)
    if resumeFlag then
        return SUCCESS
    end
    local r = child:tick(tree)
    if r == RUNNING then
        return self:yield(tree)
    end
    return SUCCESS
end

-- --------------------------------------------------------------------------
-- AlwaysFail（始终失败）
-- --------------------------------------------------------------------------

---@class AlwaysFail : Decorator
local AlwaysFail = Decorator:extend()
M.AlwaysFail = AlwaysFail

--- 构造函数
-- @param id string|number 节点ID
function AlwaysFail:new(id)
    Decorator.new(self, "AlwaysFail", id)
end

--- 无论子节点结果如何都返回失败
-- @param tree BehaviorTree 所属行为树
-- @return string FAIL/RUNNING
function AlwaysFail:onTick(tree)
    local child = self.children[1]
    if not child then
        return FAIL
    end
    local resumeFlag = self:resume(tree)
    if resumeFlag then
        return FAIL
    end
    local r = child:tick(tree)
    if r == RUNNING then
        return self:yield(tree)
    end
    return FAIL
end

-- --------------------------------------------------------------------------
-- RepeatUntilSuccess（直到成功）
-- --------------------------------------------------------------------------

---@class RepeatUntilSuccess : Decorator
local RepeatUntilSuccess = Decorator:extend()
M.RepeatUntilSuccess = RepeatUntilSuccess

--- 构造函数
-- @param id string|number 节点ID
function RepeatUntilSuccess:new(id)
    Decorator.new(self, "RepeatUntilSuccess", id)
end

--- 重复执行子节点直到返回成功
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/RUNNING
function RepeatUntilSuccess:onTick(tree)
    local child = self.children[1]
    if not child then
        return SUCCESS
    end

    local resumeFlag = self:resume(tree)
    if resumeFlag then
        if tree.lastRet == SUCCESS then
            return SUCCESS
        end
    end

    local r = child:tick(tree)
    if r == RUNNING then
        return self:yield(tree)
    elseif r == SUCCESS then
        return SUCCESS
    else
        -- FAIL 则重试，出栈后再入栈
        return self:yield(tree)
    end
end

-- ============================================================================
-- Action 节点（动作节点）
-- ============================================================================

---@class Action : Node
local Action = Node:extend()
M.Action = Action

--- 构造函数
-- @param name string 节点名称
-- @param id string|number 节点ID
function Action:new(name, id)
    Node.new(self, "Action", id)
end

-- --------------------------------------------------------------------------
-- Wait（等待）
-- --------------------------------------------------------------------------

---@class Wait : Action
local Wait = Action:extend()
M.Wait = Wait

--- 构造函数
-- @param id string|number 节点ID
-- @param duration number 等待时长（秒）
function Wait:new(id, duration)
    Action.new(self, "Wait", id)
    self:setArg("duration", duration or 1)
end

--- 每帧检查等待时间是否到达
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/RUNNING
function Wait:onTick(tree)
    local duration = self:getArg("duration") or 1
    local t = tree.blackboard:getInner(self.id, "WAIT_TARGET")
    local now = os.clock()

    if t then
        if now >= t then
            tree.blackboard:setInner(self.id, "WAIT_TARGET", nil)
            return SUCCESS
        else
            return RUNNING
        end
    end

    tree.blackboard:setInner(self.id, "WAIT_TARGET", now + duration)
    return RUNNING
end

-- --------------------------------------------------------------------------
-- Log（打印日志）
-- --------------------------------------------------------------------------

---@class Log : Action
local Log = Action:extend()
M.Log = Log

--- 构造函数
-- @param id string|number 节点ID
-- @param message string 日志内容
function Log:new(id, message)
    Action.new(self, "Log", id)
    self:setArg("message", message or "")
end

--- 打印日志消息
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS
function Log:onTick(tree)
    print(self:getArg("message"))
    return SUCCESS
end

-- --------------------------------------------------------------------------
-- MoveTo（移动到目标位置）
-- --------------------------------------------------------------------------

---@class MoveTo : Action
local MoveTo = Action:extend()
M.MoveTo = MoveTo

--- 构造函数
-- @param id string|number 节点ID
-- @param speed number 移动速度
-- @param threshold number 距离阈值
function MoveTo:new(id, speed, threshold)
    Action.new(self, "MoveTo", id)
    self:setArg("speed", speed or 5)
    self:setArg("threshold", threshold or 0.5)
end

--- 每帧向目标位置移动一步
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL/RUNNING
function MoveTo:onTick(tree)
    local bb = tree.blackboard
    local speed = self:getArg("speed")
    local threshold = self:getArg("threshold")
    local pos = bb:get("selfPos")         -- Vector3 或 table {x,y,z}
    local targetPos = bb:get("targetPos") -- Vector3 或 table

    if not pos or not targetPos then
        return FAIL
    end

    local dx = targetPos.x - pos.x
    local dy = targetPos.y - pos.y
    local dz = targetPos.z - pos.z
    local dist = math.sqrt(dx * dx + dy * dy + dz * dz)

    if dist <= threshold then
        return SUCCESS
    end

    local t = math.min(1, speed / dist)
    pos.x = pos.x + dx * t
    pos.y = pos.y + dy * t
    pos.z = pos.z + dz * t
    bb:set("selfPos", pos)

    return RUNNING
end

-- --------------------------------------------------------------------------
-- Attack（攻击目标）
-- --------------------------------------------------------------------------

---@class Attack : Action
local Attack = Action:extend()
M.Attack = Attack

--- 构造函数
-- @param id string|number 节点ID
-- @param damage number 伤害值
function Attack:new(id, damage)
    Action.new(self, "Attack", id)
    self:setArg("damage", damage or 10)
end

--- 对目标造成伤害
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL
function Attack:onTick(tree)
    local target = tree.blackboard:get("target")
    local damage = self:getArg("damage")

    if not target then
        return FAIL
    end

    local hp = target.hp or 100
    hp = hp - damage
    target.hp = hp
    tree.blackboard:set("lastDamage", damage)

    if hp <= 0 then
        return SUCCESS
    end

    -- 攻击动作通常被视为瞬时完成，但也可返回 RUNNING 做多段攻击
    return SUCCESS
end

-- --------------------------------------------------------------------------
-- Patrol（巡逻）
-- --------------------------------------------------------------------------

---@class Patrol : Action
local Patrol = Action:extend()
M.Patrol = Patrol

--- 构造函数
-- @param id string|number 节点ID
-- @param waypoints table 路径点数组
function Patrol:new(id, waypoints)
    Action.new(self, "Patrol", id)
    self:setArg("waypoints", waypoints or {})
    self:setArg("speed", 2)
end

--- 沿路径点巡逻移动
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL/RUNNING
function Patrol:onTick(tree)
    local bb = tree.blackboard
    local waypoints = self:getArg("waypoints")
    local speed = self:getArg("speed")
    local pos = bb:get("selfPos")
    local idx = bb:getInner(self.id, "PATROL_IDX") or 1
    local wp = waypoints[idx]

    if not pos or not wp then
        return FAIL
    end

    local dx = wp.x - pos.x
    local dy = wp.y - pos.y
    local dz = wp.z - pos.z
    local dist = math.sqrt(dx * dx + dy * dy + dz * dz)

    if dist <= 0.5 then
        idx = idx + 1
        if idx > #waypoints then
            idx = 1
        end
        bb:setInner(self.id, "PATROL_IDX", idx)
        wp = waypoints[idx]
        if not wp then
            return SUCCESS
        end
        dx = wp.x - pos.x
        dy = wp.y - pos.y
        dz = wp.z - pos.z
        dist = math.sqrt(dx * dx + dy * dy + dz * dz)
    end

    local t = math.min(1, speed / dist)
    pos.x = pos.x + dx * t
    pos.y = pos.y + dy * t
    pos.z = pos.z + dz * t
    bb:set("selfPos", pos)

    return RUNNING
end

-- ============================================================================
-- Condition 节点（条件节点）
-- ============================================================================

---@class Condition : Node
local Condition = Node:extend()
M.Condition = Condition

--- 构造函数
-- @param name string 节点名称
-- @param id string|number 节点ID
function Condition:new(name, id)
    Node.new(self, name, "Condition", id)
end

-- --------------------------------------------------------------------------
-- CheckTrue（检查布尔值）
-- --------------------------------------------------------------------------

---@class CheckTrue : Condition
local CheckTrue = Condition:extend()
M.CheckTrue = CheckTrue

--- 构造函数
-- @param id string|number 节点ID
-- @param key string 黑板键名
function CheckTrue:new(id, key)
    Condition.new(self, "CheckTrue", id)
    self:setArg("key", key)
end

--- 检查黑板中指定键值是否为真
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL
function CheckTrue:onTick(tree)
    local v = tree.blackboard:get(self:getArg("key"))
    return v and SUCCESS or FAIL
end

-- --------------------------------------------------------------------------
-- CheckDistance（检查与目标距离）
-- --------------------------------------------------------------------------

---@class CheckDistance : Condition
local CheckDistance = Condition:extend()
M.CheckDistance = CheckDistance

--- 构造函数
-- @param id string|number 节点ID
-- @param maxDistance number 最大距离
function CheckDistance:new(id, maxDistance)
    Condition.new(self, "CheckDistance", id)
    self:setArg("maxDistance", maxDistance or 10)
end

--- 检查与目标位置的距离是否在范围内
-- @param tree BehaviorTree 所属行为树
-- @return string SUCCESS/FAIL
function CheckDistance:onTick(tree)
    local pos = tree.blackboard:get("selfPos")
    local targetPos = tree.blackboard:get("targetPos")
    local maxDist = self:getArg("maxDistance")

    if not pos or not targetPos then
        return FAIL
    end

    local dx = targetPos.x - pos.x
    local dy = targetPos.y - pos.y
    local dz = targetPos.z - pos.z
    local dist = math.sqrt(dx * dx + dy * dy + dz * dz)

    return dist <= maxDist and SUCCESS or FAIL
end

-- ============================================================================
-- 辅助构建 API
-- ============================================================================

--- 根据配置表快速构建行为树
-- 配置格式：
-- {
--   name = "MonsterAI",
--   root = {
--     name = "Selector", id = 1, children = {
--       { name = "Sequence", id = 2, children = { ... } }
--     }
--   }
-- }
-- @param cfg table 配置表
-- @param blackboard Blackboard 黑板（可选）
-- @return BehaviorTree 行为树实例
function M.Build(cfg, blackboard)
    local nodeMap = {
        Sequence = Sequence,
        Selector = Selector,
        Parallel = Parallel,
        Invert = Invert,
        AlwaysSuccess = AlwaysSuccess,
        AlwaysFail = AlwaysFail,
        RepeatUntilSuccess = RepeatUntilSuccess,
        Wait = Wait,
        Log = Log,
        MoveTo = MoveTo,
        Attack = Attack,
        Patrol = Patrol,
        CheckTrue = CheckTrue,
        CheckDistance = CheckDistance,
    }

    --- 递归构建节点
    -- @param data table 节点配置数据
    -- @return Node 节点实例
    local function buildNode(data)
        local cls = nodeMap[data.name] or Node
        local node = cls(data.id)
        if data.args then
            for k, v in pairs(data.args) do
                node:setArg(k, v)
            end
        end
        if data.children then
            for _, childData in ipairs(data.children) do
                node:addChild(buildNode(childData))
            end
        end
        return node
    end

    local root = buildNode(cfg.root)
    return BehaviorTree.New(cfg.name, root, blackboard)
end

--- 注册自定义节点类型
-- @param name string 节点名
-- @param cls table 节点类（需继承自 Node）
function M.RegisterNode(name, cls)
    -- 在 Build 时使用，暂留扩展接口
    -- 用户可直接实例化 cls 后 addChild
end

return M
