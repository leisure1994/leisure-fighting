# lua-behavior-tree

Lua 行为树运行时，适用于 UrhoX 游戏引擎。提供行为树核心（Node、Composite、Decorator、Action、Condition、Blackboard、BehaviorTree）以及常用内置节点。

---

## 特性

- 纯 Lua 实现，无外部依赖
- 支持中断、恢复、挂起（RUNNING）
- 内置常用 AI 节点：Sequence、Selector、Parallel、Wait、MoveTo、Attack、Patrol、CheckDistance 等
- 提供 `Build` 快速构建 API

---

## 快速开始

```lua
local BT = require "scripts.main"

-- 创建黑板
local bb = BT.Blackboard()
bb:set("selfPos", { x = 0, z = 0 })
bb:set("targetPos", { x = 10, z = 10 })

-- 构建行为树
local tree = BT.Build({
    name = "TestTree",
    root = {
        name = "Sequence", id = 1,
        children = {
            { name = "MoveTo", id = 2 },
            { name = "Log", id = 3, args = { message = "Arrived!" } },
        }
    }
}, bb)

-- 每帧调用
local ret = tree:tick()
```

---

## 核心 API

### Blackboard

| 方法 | 说明 |
|------|------|
| `Blackboard()` | 创建黑板 |
| `:set(key, value)` | 设置共享变量 |
| `:get(key)` | 获取共享变量 |
| `:setInner(nodeId, key, value)` | 设置节点内部状态 |
| `:getInner(nodeId, key)` | 获取节点内部状态 |
| `:clear()` | 清空数据 |

### BehaviorTree

| 方法 | 说明 |
|------|------|
| `BehaviorTree.New(name, rootNode, blackboard)` | 创建行为树 |
| `:tick()` | 执行一帧，返回 `SUCCESS` / `FAIL` / `RUNNING` / `ABORT` |
| `:interrupt()` | 立即中断并重置运行栈 |
| `:requestAbort()` | 请求下一帧中断 |
| `:isRunning()` | 是否处于 RUNNING 状态 |

### Node

| 方法 | 说明 |
|------|------|
| `:addChild(child)` | 添加子节点 |
| `:setArg(key, value)` | 设置节点参数 |
| `:getArg(key)` | 获取节点参数 |

---

## 内置节点

### Composite

- **Sequence**（id）：顺序执行，全部成功才成功
- **Selector**（id）：选择执行，有一个成功即成功
- **Parallel**（id）：并行执行所有子节点

### Decorator

- **Invert**（id）：子节点结果取反
- **AlwaysSuccess**（id）：无论子节点结果，始终返回 SUCCESS
- **AlwaysFail**（id）：无论子节点结果，始终返回 FAIL
- **RepeatUntilSuccess**（id）：重复执行子节点直到成功

### Action

- **Wait**（id, duration）：等待 duration 秒
- **Log**（id, message）：打印日志
- **MoveTo**（id, speed, threshold）：朝 `targetPos` 移动，到阈值返回 SUCCESS
- **Attack**（id, damage）：对 `target` 造成伤害
- **Patrol**（id, waypoints）：沿路径点巡逻

### Condition

- **CheckTrue**（id, key）：检查黑板中 key 的布尔值
- **CheckDistance**（id, maxDistance）：检查与 `targetPos` 的距离是否小于 maxDistance

---

## 完整用例：小兵 AI（巡逻 → 发现玩家 → 追击 → 攻击）

```lua
local BT = require "scripts.main"

-- 1. 准备黑板数据
local bb = BT.Blackboard()
bb:set("selfPos", { x = 0, y = 0, z = 0 })
bb:set("targetPos", nil)
bb:set("hasTarget", false)

local enemy = { hp = 100, name = "Player" }
bb:set("target", enemy)

local waypoints = {
    { x = 0, y = 0, z = 0 },
    { x = 10, y = 0, z = 0 },
    { x = 10, y = 0, z = 10 },
    { x = 0, y = 0, z = 10 },
}

-- 2. 构建行为树
local tree = BT.Build({
    name = "GruntAI",
    root = {
        name = "Selector", id = 1,
        children = {
            -- 分支 A：发现玩家 → 追击 → 攻击
            {
                name = "Sequence", id = 2,
                children = {
                    { name = "CheckDistance", id = 3, args = { maxDistance = 8 } },
                    {
                        name = "Sequence", id = 4,
                        children = {
                            { name = "Log", id = 5, args = { message = "发现敌人！追击！" } },
                            { name = "MoveTo", id = 6, args = { speed = 6, threshold = 1.5 } },
                            { name = "Attack", id = 7, args = { damage = 15 } },
                        }
                    }
                }
            },
            -- 分支 B：未发�玩家 → 继续巡逻
            {
                name = "Sequence", id = 8,
                children = {
                    { name = "Log", id = 9, args = { message = "巡逻中..." } },
                    { name = "Patrol", id = 10, args = { waypoints = waypoints, speed = 2 } },
                }
            }
        }
    }
}, bb)

-- 3. 模拟玩家位置变化
local playerPos = { x = 5, y = 0, z = 5 }
bb:set("targetPos", playerPos)

-- 4. 主循环：每帧 tick
function Update()
    -- 动态更新玩家位置
    playerPos.x = playerPos.x + 0.1
    bb:set("targetPos", playerPos)

    local ret = tree:tick()
    if ret == "SUCCESS" then
        print("行为树一轮执行完毕")
    elseif ret == "RUNNING" then
        -- 保持到下一帧继续
    end
end

-- 调用若干帧模拟
for i = 1, 100 do
    Update()
end
```

### 用例说明

1. **Selector**（根节点）优先尝试攻击分支；如果 CheckDistance 失败（玩家太远），则 fallback 到巡逻分支。
2. **CheckDistance** 读取黑板中的 `selfPos` 和 `targetPos`，若距离 ≤ 8 则返回 SUCCESS。
3. **MoveTo** 同样基于黑板数据移动小兵位置，并实时写回 `selfPos`。
4. **Patrol** 在攻击条件不满足时循环执行，沿 waypoints 巡逻。
5. 整个树每帧调用 `tree:tick()`，RUNNING 状态会自动在下一帧恢复。

---

## 状态返回值

- `SUCCESS`：节点执行成功
- `FAIL`：节点执行失败
- `RUNNING`：节点尚未完成，下帧继续
- `ABORT`：被中断

---

## 扩展自定义节点

```lua
local BT = require "scripts.main"

-- 自定义一个 Heal 动作节点
local Heal = BT.Action:extend()
function Heal:new(id, amount)
    BT.Action.new(self, "Heal", id)
    self:setArg("amount", amount or 5)
end

function Heal:onTick(tree)
    local target = tree.blackboard:get("target")
    if target then
        target.hp = (target.hp or 0) + self:getArg("amount")
    end
    return "SUCCESS"
end

-- 使用
local node = Heal(100, 20)
```

---

## 文件结构

```
lua-behavior-tree/
├── game.json
├── SKILL.md
└── scripts/
    └── main.lua
```
