-- UrhoX NavMesh 高级导航管理器
-- 基于 Urho3D 内置 Recast/Detour 的纯 Lua 封装
-- 三行代码即可工作：创建网格 → 查找路径 → 让 NPC 跟随

local NavMeshManager = {}
NavMeshManager.__index = NavMeshManager

-- 常量定义
local DEFAULT_CELL_SIZE = 0.3
local DEFAULT_CELL_HEIGHT = 0.2
local DEFAULT_AGENT_HEIGHT = 2.0
local DEFAULT_AGENT_RADIUS = 0.6
local DEFAULT_AGENT_MAX_CLIMB = 0.9
local DEFAULT_AGENT_MAX_SLOPE = 45.0
local DEFAULT_TILE_SIZE = 64
local MAX_SMOOTH_ITERATIONS = 4
local OBSTACLE_TAG = "NavmeshObstacle"

--- 创建一个新的导航管理器实例
-- @param scene Scene 场景实例
-- @param params table 可选参数表
-- @return NavMeshManager 实例
function NavMeshManager.Create(scene, params)
    local self = setmetatable({}, NavMeshManager)
    params = params or {}

    self.scene = scene
    self.navMesh = scene:CreateComponent("NavigationMesh")
    self.crowdManager = scene:CreateComponent("CrowdManager")

    -- 配置导航网格参数
    self.navMesh:SetTileSize(params.tileSize or DEFAULT_TILE_SIZE)
    self.navMesh:SetCellSize(params.cellSize or DEFAULT_CELL_SIZE)
    self.navMesh:SetCellHeight(params.cellHeight or DEFAULT_CELL_HEIGHT)
    self.navMesh:SetAgentHeight(params.agentHeight or DEFAULT_AGENT_HEIGHT)
    self.navMesh:SetAgentRadius(params.agentRadius or DEFAULT_AGENT_RADIUS)
    self.navMesh:SetAgentMaxClimb(params.agentMaxClimb or DEFAULT_AGENT_MAX_CLIMB)
    self.navMesh:SetAgentMaxSlope(params.agentMaxSlope or DEFAULT_AGENT_MAX_SLOPE)

    -- 人群参数
    self.crowdManager:SetMaxAgents(params.maxAgents or 128)
    self.crowdManager:SetMaxAgentRadius(params.agentRadius or DEFAULT_AGENT_RADIUS)

    -- 代理缓存
    self.agents = {}          -- node -> CrowdAgent
    self.agentSpeeds = {}     -- node -> speed
    self.agentTargets = {}    -- node -> targetPos
    self.obstacles = {}       -- node -> Obstacle

    return self
end

--- 动态烘焙整个场景的导航网格
-- @param boundingBox BoundingBox 可选的自定义包围盒；默认使用自动计算
-- @return boolean 是否成功
function NavMeshManager:BuildNavMesh(boundingBox)
    if boundingBox then
        self.navMesh:Build(boundingBox)
    else
        self.navMesh:Build()
    end
    return self.navMesh:IsInitialized()
end

--- 为指定节点标记为可导航区域
-- @param node Node 场景节点
function NavMeshManager:MarkNavigable(node)
    if not node:GetComponent("Navigable") then
        node:CreateComponent("Navigable")
    end
end

--- 在两点之间查找路径
-- @param from Vector3 起点世界坐标
-- @param to Vector3 终点世界坐标
-- @return table 路径点数组（Vector3 列表），若不可达返回空表
function NavMeshManager:FindPath(from, to)
    local path = self.navMesh:FindPath(from, to)
    if not path then
        return {}
    end
    return path
end

--- 对路径进行简单平滑处理（切角法）
-- @param path table 原始路径点数组
-- @return table 平滑后的路径点数组
function NavMeshManager:SmoothPath(path)
    if #path <= 2 then
        return path
    end

    local smoothed = {}
    smoothed[1] = path[1]

    local i = 1
    while i < #path do
        local farthest = i + 1
        for j = math.min(#path, i + MAX_SMOOTH_ITERATIONS), i + 2, -1 do
            local startPos = path[i]
            local endPos = path[j]
            local rayPos = Vector3(0, 0, 0)
            local rayHit = self.navMesh:Raycast(startPos, endPos, rayPos)
            if rayHit then
                -- 由于 Lua 绑定限制，使用分段距离检测代替精细射线检测
                local dir = endPos - startPos
                local dist = dir:Length()
                local steps = math.max(1, math.floor(dist / (DEFAULT_CELL_SIZE * 2)))
                dir:Normalize()
                local clear = true
                for s = 1, steps do
                    local checkPos = startPos + dir * (dist * s / steps)
                    local nearest = self.navMesh:FindNearestPoint(checkPos)
                    if (nearest - checkPos):Length() > DEFAULT_CELL_SIZE * 3 then
                        clear = false
                        break
                    end
                end
                if clear then
                    farthest = j
                    break
                end
            end
        end
        table.insert(smoothed, path[farthest])
        i = farthest
    end

    return smoothed
end

--- 在指定位置创建 CrowdAgent 并让节点跟随路径移动
-- @param node Node 需要移动的 NPC 节点
-- @param radius number 代理半径
-- @param height number 代理高度
-- @param maxSpeed number 最大移动速度
-- @param maxAccel number 最大加速度
-- @return CrowdAgent 组件
function NavMeshManager:CreateAgent(node, radius, height, maxSpeed, maxAccel)
    local agent = node:GetOrCreateComponent("CrowdAgent")
    agent:SetRadius(radius or DEFAULT_AGENT_RADIUS)
    agent:SetHeight(height or DEFAULT_AGENT_HEIGHT)
    agent:SetMaxSpeed(maxSpeed or 5.0)
    agent:SetMaxAccel(maxAccel or 10.0)
    agent:SetNavigationQuality(NAVIGATIONQUALITY_HIGH)
    agent:SetNavigationPushiness(NAVIGATIONPUSHINESS_MEDIUM)

    self.agents[node] = agent
    self.agentSpeeds[node] = maxSpeed or 5.0
    return agent
end

--- 设置代理的移动目标
-- @param node Node NPC 节点
-- @param targetPos Vector3 目标世界坐标
function NavMeshManager:SetAgentTarget(node, targetPos)
    local agent = self.agents[node]
    if not agent then
        return
    end
    local navTarget = self.navMesh:FindNearestPoint(targetPos)
    agent:SetTargetPosition(navTarget)
    self.agentTargets[node] = navTarget
end

--- 设置代理速度（覆盖最大速度）
-- @param node Node NPC 节点
-- @param speed number 新速度值
function NavMeshManager:SetAgentSpeed(node, speed)
    local agent = self.agents[node]
    if agent then
        agent:SetMaxSpeed(speed)
    end
    self.agentSpeeds[node] = speed
end

--- 获取代理当前世界坐标
-- @param node Node NPC 节点
-- @return Vector3 当前位置
function NavMeshManager:GetAgentPosition(node)
    return node:GetWorldPosition()
end

--- 获取代理当前速度向量
-- @param node Node NPC 节点
-- @return Vector3 当前实际速度
function NavMeshManager:GetAgentVelocity(node)
    local agent = self.agents[node]
    if agent then
        return agent:GetActualVelocity()
    end
    return Vector3(0, 0, 0)
end

--- 判断代理是否已到达目的地
-- @param node Node NPC 节点
-- @param threshold number 距离阈值，默认 0.5
-- @return boolean
function NavMeshManager:IsAgentAtTarget(node, threshold)
    threshold = threshold or 0.5
    local target = self.agentTargets[node]
    if not target then
        return true
    end
    return (node:GetWorldPosition() - target):Length() <= threshold
end

--- 移除代理
-- @param node Node NPC 节点
function NavMeshManager:RemoveAgent(node)
    local agent = self.agents[node]
    if agent then
        node:RemoveComponent("CrowdAgent")
    end
    self.agents[node] = nil
    self.agentSpeeds[node] = nil
    self.agentTargets[node] = nil
end

--- 添加动态障碍物
-- @param node Node 障碍物节点
-- @param radius number 障碍物半径
-- @param height number 障碍物高度
-- @return Obstacle 组件
function NavMeshManager:AddObstacle(node, radius, height)
    local obstacle = node:GetOrCreateComponent("Obstacle")
    obstacle:SetRadius(radius or DEFAULT_AGENT_RADIUS)
    obstacle:SetHeight(height or DEFAULT_AGENT_HEIGHT)
    self.obstacles[node] = obstacle
    return obstacle
end

--- 移除动态障碍物
-- @param node Node 障碍物节点
function NavMeshManager:RemoveObstacle(node)
    if self.obstacles[node] then
        node:RemoveComponent("Obstacle")
        self.obstacles[node] = nil
    end
end

--- 在 Update 中调用，更新所有代理状态（CrowdManager 自动处理，
-- 此方法用于补充上层逻辑如目标切换通知）
-- @param timeStep number 时间步长
function NavMeshManager:Update(timeStep)
    -- CrowdManager 在引擎内部已自动更新；
    -- 此处预留扩展点，用于检查到达事件、路径重算等。
    for node, agent in pairs(self.agents) do
        if agent and not agent:IsNull() then
            local state = agent:GetTargetState()
            -- CROWDAGENT_TARGET_NONE = 0, CROWDAGENT_TARGET_FAILED = 1,
            -- CROWDAGENT_TARGET_VALID = 2, CROWDAGENT_TARGET_REQUESTING = 3,
            -- CROWDAGENT_TARGET_WAITING_FOR_QUEUE = 4, CROWDAGENT_TARGET_WAITING_FOR_PATH = 5,
            -- CROWDAGENT_TARGET_VELOCITY = 6
            if state == 1 then -- failed
                -- 尝试重算到最近可达点
                local target = self.agentTargets[node]
                if target then
                    local nearest = self.navMesh:FindNearestPoint(target)
                    if nearest ~= target then
                        agent:SetTargetPosition(nearest)
                        self.agentTargets[node] = nearest
                    end
                end
            end
        end
    end
end

--- 保存导航网格到文件
-- @param filePath string 文件路径
function NavMeshManager:SaveNavMesh(filePath)
    local file = File()
    if file:Open(filePath, FILE_WRITE) then
        self.navMesh:Save(file)
        file:Close()
    end
end

--- 从文件加载导航网格
-- @param filePath string 文件路径
-- @return boolean 是否成功
function NavMeshManager:LoadNavMesh(filePath)
    local file = File()
    if file:Open(filePath, FILE_READ) then
        local ok = self.navMesh:Load(file)
        file:Close()
        return ok
    end
    return false
end

--- 获取底层 NavigationMesh 组件（高级用法）
-- @return NavigationMesh
function NavMeshManager:GetNavMesh()
    return self.navMesh
end

--- 获取底层 CrowdManager 组件（高级用法）
-- @return CrowdManager
function NavMeshManager:GetCrowdManager()
    return self.crowdManager
end

--- 简单的路径跟随封装：让节点沿路径点线性移动
-- @param node Node 需要移动的节点
-- @param path table 路径点数组
-- @param speed number 移动速度
-- @param turnSpeed number 转向速度（度/秒）
-- @return table 跟随状态对象，需在 Update 中调用 Update()
function NavMeshManager:FollowPath(node, path, speed, turnSpeed)
    local follower = {}
    follower.node = node
    follower.path = path
    follower.speed = speed or 3.0
    follower.turnSpeed = turnSpeed or 360.0
    follower.currentIndex = 1
    follower.finished = false
    follower.paused = false

    --- 更新跟随状态
    -- @param timeStep number 时间步长
    function follower:Update(timeStep)
        if self.finished or self.paused or #self.path == 0 then
            return
        end

        local target = self.path[self.currentIndex]
        local pos = self.node:GetWorldPosition()
        local diff = target - pos
        diff.y = 0 -- 保持水平移动

        local dist = diff:Length()
        if dist < 0.1 then
            self.currentIndex = self.currentIndex + 1
            if self.currentIndex > #self.path then
                self.finished = true
            end
            return
        end

        diff:Normalize()
        local move = diff * self.speed * timeStep
        self.node:SetWorldPosition(pos + move)

        -- 朝向目标
        local lookAt = pos + diff * 10.0
        self.node:LookAt(lookAt, Vector3.UP)
    end

    --- 暂停跟随
    function follower:Pause()
        self.paused = true
    end

    --- 恢复跟随
    function follower:Resume()
        self.paused = false
    end

    return follower
end

return NavMeshManager
