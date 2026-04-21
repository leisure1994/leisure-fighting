# urhox-navmesh

UrhoX 寻路系统 —— 基于 Urho3D 内置 Recast/Detour 的高级纯 Lua 封装。让开发者三行代码即可实现：创建网格 → 查找路径 → NPC 跟随。

## 安装

将本技能文件夹复制到 TapTap 工程的 `Skills/` 目录下，或直接在脚本中 require：

```lua
local NavMeshManager = require("urhox-navmesh/scripts/main")
```

## 快速开始

```lua
-- 1. 创建管理器
local nav = NavMeshManager.Create(scene)

-- 2. 标记可行走区域并烘焙
nav:MarkNavigable(groundNode)
nav:BuildNavMesh()

-- 3. 创建代理并设置目标
nav:CreateAgent(npcNode, 0.5, 1.8, 4.0, 8.0)
nav:SetAgentTarget(npcNode, targetPosition)
```

## 示例：完整 NPC 巡逻

```lua
local NavMeshManager = require("urhox-navmesh/scripts/main")

function Start()
    local nav = NavMeshManager.Create(scene, {
        cellSize = 0.3,
        cellHeight = 0.2,
        agentHeight = 2.0,
        agentRadius = 0.6,
        agentMaxClimb = 0.9,
        agentMaxSlope = 45.0,
        maxAgents = 64
    })

    -- 标记场景内所有 StaticModel 为可导航
    local nodes = scene:GetChildren(false)
    for _, node in ipairs(nodes) do
        if node:GetComponent("StaticModel") then
            nav:MarkNavigable(node)
        end
    end

    nav:BuildNavMesh()

    -- 创建 NPC
    local npc = scene:CreateChild("NPC")
    npc:SetPosition(Vector3(0, 0, 0))
    local npcModel = npc:CreateComponent("StaticModel")
    npcModel:SetModel(cache:GetResource("Model", "Models/Jack.mdl"))

    -- 基于 CrowdAgent 的智能跟随
    nav:CreateAgent(npc, 0.5, 1.8, 4.0, 8.0)
    nav:SetAgentTarget(npc, Vector3(10, 0, 10))
end

function Update(timeStep)
    nav:Update(timeStep)
end
```

## 路径平滑跟随（不使用 CrowdAgent）

如果你想手动控制移动动画，可用 `FollowPath`：

```lua
local path = nav:FindPath(Vector3(0,0,0), Vector3(20,0,20))
path = nav:SmoothPath(path)
local follower = nav:FollowPath(npcNode, path, 3.5, 180.0)

function Update(timeStep)
    follower:Update(timeStep)
    if follower.finished then
        print("到达终点")
    end
end
```

## 动态障碍物

```lua
-- 在场景中放置一个箱子并标记为障碍
local box = scene:CreateChild("BoxObstacle")
box:SetPosition(Vector3(5, 0, 5))
nav:AddObstacle(box, 0.8, 2.0)

-- 移除障碍
nav:RemoveObstacle(box)
```

## API 参考

### NavMeshManager.Create(scene, params)

| 参数 | 类型 | 说明 |
|------|------|------|
| `scene` | Scene | 场景实例 |
| `params` | table | 可选配置（cellSize、agentHeight、maxAgents 等）|

返回值：`NavMeshManager` 实例。

### BuildNavMesh(boundingBox)
烘焙导航网格。`boundingBox` 可选。

### MarkNavigable(node)
为节点添加 `Navigable` 组件，使其几何体参与导航网格生成。

### FindPath(from, to) -> table
返回从 `from` 到 `to` 的路径点数组（`Vector3` 列表）。

### SmoothPath(path) -> table
对路径进行简单切角平滑，减少生硬拐角。

### CreateAgent(node, radius, height, maxSpeed, maxAccel) -> CrowdAgent
为节点创建 Detour Crowd 代理。

### SetAgentTarget(node, targetPos)
设置代理的最终目标位置，会自动寻路到最近可达点。

### SetAgentSpeed(node, speed)
运行时修改代理最大速度。

### GetAgentPosition(node) -> Vector3
获取代理节点当前世界坐标。

### GetAgentVelocity(node) -> Vector3
获取代理当前实际速度向量。

### IsAgentAtTarget(node, threshold) -> boolean
判断代理是否已到达目的地（默认阈值 0.5 米）。

### RemoveAgent(node)
移除节点的 CrowdAgent 组件。

### AddObstacle(node, radius, height) -> Obstacle
添加动态切割障碍物（支持运行时刻添加/移除）。

### RemoveObstacle(node)
移除动态障碍物。

### Update(timeStep)
每帧调用，用于内部重算失败路径等扩展逻辑。

### SaveNavMesh(filePath) / LoadNavMesh(filePath)
保存/加载已烘焙的 `.navmesh` 二进制数据。

### FollowPath(node, path, speed, turnSpeed) -> follower
返回一个轻量的路径跟随状态机，不依赖 CrowdAgent，适合需要手动控制动画的状态。

| 方法 | 说明 |
|------|------|
| `follower:Update(timeStep)` | 每帧更新移动与朝向 |
| `follower:Pause()` | 暂停移动 |
| `follower:Resume()` | 恢复移动 |

## 常量

- `DEFAULT_CELL_SIZE = 0.3`
- `DEFAULT_AGENT_HEIGHT = 2.0`
- `DEFAULT_AGENT_RADIUS = 0.6`
- `DEFAULT_TILE_SIZE = 64`
- `MAX_SMOOTH_ITERATIONS = 4`

## 注意事项

1. `BuildNavMesh()` 应在场景主要静态物体加载完成后调用。
2. 动态障碍物频繁变动时建议分批处理，避免每帧重建。
3. CrowdAgent 与手动 `FollowPath` 两种方式互斥，同一节点请勿混用。
