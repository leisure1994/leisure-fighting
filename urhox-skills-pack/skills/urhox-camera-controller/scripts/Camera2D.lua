-- Camera2D.lua
-- 2D 游戏镜头控制器
-- 针对像素风、RPG、横版/竖版游戏提供像素级跟随、房间过渡、屏幕震动与视差背景

local Utils = require("scripts/CameraUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local DEFAULT_SMOOTH_TIME = 0.15
local DEFAULT_PIXEL_SCALE = 1.0
local DEFAULT_DEAD_ZONE_WIDTH = 0.3
local DEFAULT_DEAD_ZONE_HEIGHT = 0.2
local DEFAULT_TRAUMA_DECAY = 2.0
local DEFAULT_PARALLAX_FACTOR = 0.5

-- ============================================================================
-- PixelPerfectFollow 像素级精准跟随
-- ============================================================================

local PixelPerfectFollow = {}
PixelPerfectFollow.__index = PixelPerfectFollow

--- 创建像素完美跟随控制器
-- 用于消除像素艺术游戏中因相机浮点位置导致的子像素抖动
-- @param cameraNode Node 相机节点
-- @param targetNode Node 跟随目标节点
-- @param pixelScale number 一个世界单位对应多少像素（通常 1 世界单位 = 16/32/64 像素）
-- @return table 控制器实例
function PixelPerfectFollow.New(cameraNode, targetNode, pixelScale)
    pixelScale = pixelScale or DEFAULT_PIXEL_SCALE
    local self = setmetatable({}, PixelPerfectFollow)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.pixelScale = pixelScale
    self.offset = Utils.Vec2(0.0, 0.0)
    self.shake = { x = 0.0, y = 0.0 }
    return self
end

--- 设置跟随偏移
-- @param ox number
-- @param oy number
function PixelPerfectFollow:SetOffset(ox, oy)
    self.offset = Utils.Vec2(ox, oy)
end

--- 应用屏幕震动偏移（由外部 ScreenShake 模块调用）
-- @param sx number
-- @param sy number
function PixelPerfectFollow:SetShake(sx, sy)
    self.shake = Utils.Vec2(sx, sy)
end

--- 更新相机位置
-- @param dt number 时间步长
function PixelPerfectFollow:Update(dt)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local targetPos = Utils.GetNodeWorldPosition(self.targetNode)
    local desiredX = targetPos.x + self.offset.x + self.shake.x
    local desiredY = targetPos.y + self.offset.y + self.shake.y

    -- 像素对齐：先缩放到像素空间取整，再缩放回世界空间
    local pixelInv = 1.0 / self.pixelScale
    desiredX = math.floor(desiredX * self.pixelScale) * pixelInv
    desiredY = math.floor(desiredY * self.pixelScale) * pixelInv

    Utils.SetNodePositionSafe(self.cameraNode, { x = desiredX, y = desiredY, z = self.cameraNode.position and self.cameraNode.position.z or 0.0 })
end

M.PixelPerfectFollow = PixelPerfectFollow

-- ============================================================================
-- SmoothFollow2D 平滑跟随（带前视与死区）
-- ============================================================================

local SmoothFollow2D = {}
SmoothFollow2D.__index = SmoothFollow2D

--- 创建2D平滑跟随控制器
-- @param cameraNode Node
-- @param targetNode Node
-- @return table
function SmoothFollow2D.New(cameraNode, targetNode)
    local self = setmetatable({}, SmoothFollow2D)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.offset = Utils.Vec2(0.0, 0.0)
    self.smoothTime = DEFAULT_SMOOTH_TIME
    self.maxSpeed = math.huge
    self.useDeadZone = false
    self.deadZoneWidth = DEFAULT_DEAD_ZONE_WIDTH
    self.deadZoneHeight = DEFAULT_DEAD_ZONE_HEIGHT
    self.useLookahead = false
    self.lookaheadFactor = 0.3
    self.lookaheadMax = 2.0
    self.velocity = { x = 0.0, y = 0.0 }
    self.shake = { x = 0.0, y = 0.0 }
    self.bounds = nil
    self.currentPos = Utils.GetNodeWorldPosition(cameraNode)
    return self
end

--- 设置平滑参数
-- @param smoothTime number
-- @param maxSpeed number|nil
function SmoothFollow2D:SetSmooth(smoothTime, maxSpeed)
    self.smoothTime = smoothTime or DEFAULT_SMOOTH_TIME
    self.maxSpeed = maxSpeed or math.huge
end

--- 启用死区（目标在屏幕中心某范围内时不移动相机）
-- @param width number 死区宽度（占视口宽度的比例，如 0.3）
-- @param height number 死区高度比例
function SmoothFollow2D:EnableDeadZone(width, height)
    self.useDeadZone = true
    self.deadZoneWidth = width or DEFAULT_DEAD_ZONE_WIDTH
    self.deadZoneHeight = height or DEFAULT_DEAD_ZONE_HEIGHT
end

--- 禁用死区
function SmoothFollow2D:DisableDeadZone()
    self.useDeadZone = false
end

--- 启用前视（基于速度向目标前方偏移相机）
-- @param factor number 前视系数
-- @param maxDist number 最大前视距离
function SmoothFollow2D:EnableLookahead(factor, maxDist)
    self.useLookahead = true
    self.lookaheadFactor = factor or 0.3
    self.lookaheadMax = maxDist or 2.0
end

--- 设置地图边界
-- @param minX number
-- @param minY number
-- @param maxX number
-- @param maxY number
function SmoothFollow2D:SetBounds(minX, minY, maxX, maxY)
    self.bounds = Utils.Rect(minX, minY, maxX, maxY)
end

--- 设置屏幕震动偏移
-- @param sx number
-- @param sy number
function SmoothFollow2D:SetShake(sx, sy)
    self.shake = Utils.Vec2(sx, sy)
end

--- 计算死区处理后的目标位置
-- @param targetPos table {x,y}
-- @param camPos table {x,y}
-- @return table 处理后的目标点
function SmoothFollow2D:ApplyDeadZone(targetPos, camPos)
    if not self.useDeadZone then
        return targetPos
    end

    -- 将死区比例转换为世界单位（需要知道相机 orthoSize / viewHeight，这里做简化近似）
    -- 假设orthoSize为屏幕半高，用户可额外通过 SetViewSize 注入；此处退化为基于偏移比例的死区
    local dx = targetPos.x - camPos.x
    local dy = targetPos.y - camPos.y

    local halfW = self.deadZoneWidth * 0.5
    local halfH = self.deadZoneHeight * 0.5

    local outX = camPos.x
    local outY = camPos.y

    -- 这里使用相对比例作为世界单位的近似（通常适用于 pixel-art 中 1 单位 = 1 米的简化场景）
    -- 实际项目中可接入 camera:GetComponent("Camera"):GetOrthoSize() * aspect
    local worldDeadW = halfW * 10.0
    local worldDeadH = halfH * 10.0

    if math.abs(dx) > worldDeadW then
        outX = targetPos.x - (worldDeadW * (dx > 0 and 1 or -1))
    end
    if math.abs(dy) > worldDeadH then
        outY = targetPos.y - (worldDeadH * (dy > 0 and 1 or -1))
    end

    return { x = outX, y = outY }
end

--- 计算前视偏移
-- @param targetVel table {x,y} 目标速度（世界单位/秒）
-- @return table {x,y}
function SmoothFollow2D:CalcLookahead(targetVel)
    if not self.useLookahead then
        return Utils.Vec2(0.0, 0.0)
    end
    local vx = (targetVel and targetVel.x) or 0.0
    local vy = (targetVel and targetVel.y) or 0.0
    local len = math.sqrt(vx * vx + vy * vy)
    if len < 0.01 then
        return Utils.Vec2(0.0, 0.0)
    end
    local scale = math.min(self.lookaheadMax, len * self.lookaheadFactor) / len
    return { x = vx * scale, y = vy * scale }
end

--- 更新
-- @param dt number
-- @param targetVel table|nil {x,y} 目标当前速度（用于前视）
function SmoothFollow2D:Update(dt, targetVel)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local tpos = Utils.GetNodeWorldPosition(self.targetNode)
    local camPos = self.currentPos

    local dzTarget = self:ApplyDeadZone(tpos, camPos)
    local lookahead = self:CalcLookahead(targetVel)

    local desired = Utils.Vec2Add(dzTarget, lookahead)
    desired = Utils.Vec2Add(desired, self.offset)
    desired = Utils.Vec2Add(desired, self.shake)

    if self.bounds then
        desired = Utils.ClampPointToRect(desired, self.bounds)
    end

    local newPos = Utils.Vec2SmoothDamp(camPos, desired, self.velocity, self.smoothTime, self.maxSpeed, dt)
    self.currentPos = newPos

    Utils.SetNodePositionSafe(self.cameraNode, { x = newPos.x, y = newPos.y, z = self.cameraNode.position and self.cameraNode.position.z or 10.0 })
end

M.SmoothFollow2D = SmoothFollow2D

-- ============================================================================
-- RoomLockedCamera 房间锁定相机（Metroidvania / RPG 房间过渡）
-- ============================================================================

local RoomLockedCamera = {}
RoomLockedCamera.__index = RoomLockedCamera

--- 创建房间锁定相机
-- @param cameraNode Node
-- @param targetNode Node
-- @param roomWidth number 单个房间的宽度（世界单位）
-- @param roomHeight number 单个房间的高度（世界单位）
-- @return table
function RoomLockedCamera.New(cameraNode, targetNode, roomWidth, roomHeight)
    local self = setmetatable({}, RoomLockedCamera)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.roomWidth = roomWidth or 20.0
    self.roomHeight = roomHeight or 15.0
    self.halfRoomW = self.roomWidth * 0.5
    self.halfRoomH = self.roomHeight * 0.5
    self.currentRoomX = 0.0
    self.currentRoomY = 0.0
    self.transitionSmoothTime = 0.08
    self.velocity = { x = 0.0, y = 0.0 }
    self.shake = { x = 0.0, y = 0.0 }
    self.isTransitioning = false
    return self
end

--- 设置当前房间索引（初始化用）
-- @param rx number 房间列索引
-- @param ry number 房间行索引
function RoomLockedCamera:SetRoom(rx, ry)
    self.currentRoomX = rx
    self.currentRoomY = ry
end

--- 设置过渡平滑时间
-- @param t number
function RoomLockedCamera:SetTransitionTime(t)
    self.transitionSmoothTime = t
end

--- 设置屏幕震动偏移
-- @param sx number
-- @param sy number
function RoomLockedCamera:SetShake(sx, sy)
    self.shake = Utils.Vec2(sx, sy)
end

--- 更新房间检测与相机位置
-- @param dt number
function RoomLockedCamera:Update(dt)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local tpos = Utils.GetNodeWorldPosition(self.targetNode)

    -- 计算目标当前所在房间的行列
    local roomOriginX = self.currentRoomX * self.roomWidth
    local roomOriginY = self.currentRoomY * self.roomHeight

    local localX = tpos.x - roomOriginX
    local localY = tpos.y - roomOriginY

    local changed = false
    if localX > self.roomWidth then
        self.currentRoomX = self.currentRoomX + 1
        changed = true
    elseif localX < 0.0 then
        self.currentRoomX = self.currentRoomX - 1
        changed = true
    end

    if localY > self.roomHeight then
        self.currentRoomY = self.currentRoomY + 1
        changed = true
    elseif localY < 0.0 then
        self.currentRoomY = self.currentRoomY - 1
        changed = true
    end

    if changed then
        self.isTransitioning = true
    end

    local desiredX = (self.currentRoomX * self.roomWidth) + self.halfRoomW + self.shake.x
    local desiredY = (self.currentRoomY * self.roomHeight) + self.halfRoomH + self.shake.y

    local camPos = Utils.GetNodeWorldPosition(self.cameraNode)
    local newPos = Utils.Vec2SmoothDamp(
        { x = camPos.x, y = camPos.y },
        { x = desiredX, y = desiredY },
        self.velocity,
        self.transitionSmoothTime,
        math.huge,
        dt
    )

    local dist = math.sqrt((newPos.x - desiredX) ^ 2 + (newPos.y - desiredY) ^ 2)
    if dist < 0.05 then
        self.isTransitioning = false
    end

    Utils.SetNodePositionSafe(self.cameraNode, { x = newPos.x, y = newPos.y, z = camPos.z })
end

M.RoomLockedCamera = RoomLockedCamera

-- ============================================================================
-- ScreenShake2D 2D 屏幕震动器
-- ============================================================================

local ScreenShake2D = {}
ScreenShake2D.__index = ScreenShake2D

--- 创建屏幕震动器
-- @return table
function ScreenShake2D.New()
    local self = setmetatable({}, ScreenShake2D)
    self.trauma = 0.0
    self.traumaDecay = DEFAULT_TRAUMA_DECAY
    self.maxOffset = 1.0
    self.timeScale = 1.0
    self.elapsedTime = 0.0
    self.currentOffset = Utils.Vec2(0.0, 0.0)
    return self
end

--- 设置参数
-- @param traumaDecay number 创伤衰减速度（越大停止越快）
-- @param maxOffset number 最大偏移（世界单位）
function ScreenShake2D:SetParams(traumaDecay, maxOffset)
    self.traumaDecay = traumaDecay or DEFAULT_TRAUMA_DECAY
    self.maxOffset = maxOffset or 1.0
end

--- 添加震动创伤
-- @param amount number [0,1]
function ScreenShake2D:AddTrauma(amount)
    self.trauma = math.min(1.0, self.trauma + math.max(0.0, amount))
end

--- 立即设置创伤值（覆盖）
-- @param amount number [0,1]
function ScreenShake2D:SetTrauma(amount)
    self.trauma = math.max(0.0, math.min(1.0, amount))
end

--- 更新震动状态
-- @param dt number
-- @return table {x,y} 当前震动偏移（应加到相机目标位置上）
function ScreenShake2D:Update(dt)
    self.elapsedTime = self.elapsedTime + dt * self.timeScale
    if self.trauma > 0.0 then
        self.trauma = math.max(0.0, self.trauma - self.traumaDecay * dt)
    end
    self.currentOffset = Utils.SampleShakeOffset2D(self.trauma, self.elapsedTime, self.maxOffset)
    return self.currentOffset
end

--- 获取当前震动偏移
-- @return table {x,y}
function ScreenShake2D:GetOffset()
    return self.currentOffset
end

M.ScreenShake2D = ScreenShake2D

-- ============================================================================
-- ParallaxLayer 2D 视差背景层
-- ============================================================================

local ParallaxLayer = {}
ParallaxLayer.__index = ParallaxLayer

--- 创建视差层控制器
-- @param layerNode Node 背景层根节点
-- @param cameraNode Node 相机节点（用于获取参考位置）
-- @param factorX number X 轴视差系数（0=不移动, 1=完全跟随）
-- @param factorY number Y 轴视差系数
-- @return table
function ParallaxLayer.New(layerNode, cameraNode, factorX, factorY)
    local self = setmetatable({}, ParallaxLayer)
    self.layerNode = layerNode
    self.cameraNode = cameraNode
    self.factorX = factorX or DEFAULT_PARALLAX_FACTOR
    self.factorY = factorY or DEFAULT_PARALLAX_FACTOR
    self.basePos = Utils.GetNodeWorldPosition(layerNode)
    self.lockZ = true
    return self
end

--- 设置是否锁定 Z 轴（2D 场景中通常要锁）
-- @param lock boolean
function ParallaxLayer:SetLockZ(lock)
    self.lockZ = lock
end

--- 更新层位置
-- @param dt number
function ParallaxLayer:Update(dt)
    if not self.layerNode or not self.cameraNode then
        return
    end
    local camPos = Utils.GetNodeWorldPosition(self.cameraNode)
    local nx = self.basePos.x + camPos.x * self.factorX
    local ny = self.basePos.y + camPos.y * self.factorY
    local nz = self.basePos.z
    if not self.lockZ then
        nz = self.basePos.z + camPos.z * ((self.factorX + self.factorY) * 0.5)
    end
    Utils.SetNodePositionSafe(self.layerNode, { x = nx, y = ny, z = nz })
end

M.ParallaxLayer = ParallaxLayer

-- ============================================================================
-- CameraBounds2D 2D 相机边界限制器
-- ============================================================================

local CameraBounds2D = {}
CameraBounds2D.__index = CameraBounds2D

--- 创建边界限制器
-- @param cameraNode Node
-- @param viewHalfWidth number 视口半宽（世界单位）
-- @param viewHalfHeight number 视口半高（世界单位）
-- @return table
function CameraBounds2D.New(cameraNode, viewHalfWidth, viewHalfHeight)
    local self = setmetatable({}, CameraBounds2D)
    self.cameraNode = cameraNode
    self.halfW = viewHalfWidth or 10.0
    self.halfH = viewHalfHeight or 7.5
    self.bounds = nil
    return self
end

--- 设置边界
-- @param minX number
-- @param minY number
-- @param maxX number
-- @param maxY number
function CameraBounds2D:SetBounds(minX, minY, maxX, maxY)
    self.bounds = Utils.Rect(minX, minY, maxX, maxY)
end

--- 每帧将相机位置钳制在合法范围内
-- 应在其他跟随逻辑之后调用
function CameraBounds2D:Clamp()
    if not self.cameraNode or not self.bounds then
        return
    end
    local pos = Utils.GetNodeWorldPosition(self.cameraNode)
    local clamped = Utils.ClampPointToRect(
        { x = pos.x, y = pos.y },
        {
            minX = self.bounds.minX + self.halfW,
            minY = self.bounds.minY + self.halfH,
            maxX = self.bounds.maxX - self.halfW,
            maxY = self.bounds.maxY - self.halfH,
        }
    )
    Utils.SetNodePositionSafe(self.cameraNode, { x = clamped.x, y = clamped.y, z = pos.z })
end

M.CameraBounds2D = CameraBounds2D

-- ============================================================================
-- 便捷工厂函数
-- ============================================================================

--- 快速创建像素风 RPG 通用相机组合（PixelPerfectFollow + ScreenShake2D + CameraBounds2D）
-- @param cameraNode Node
-- @param targetNode Node
-- @param pixelScale number
-- @param viewHalfWidth number
-- @param viewHalfHeight number
-- @return table 组合控制器实例
function M.CreatePixelRPGCamera(cameraNode, targetNode, pixelScale, viewHalfWidth, viewHalfHeight)
    local combo = {
        follow = PixelPerfectFollow.New(cameraNode, targetNode, pixelScale),
        shaker = ScreenShake2D.New(),
        bounds = CameraBounds2D.New(cameraNode, viewHalfWidth, viewHalfHeight),
        parallax = {},
    }

    function combo:SetOffset(ox, oy)
        self.follow:SetOffset(ox, oy)
    end

    function combo:SetBounds(minX, minY, maxX, maxY)
        self.bounds:SetBounds(minX, minY, maxX, maxY)
    end

    function combo:AddTrauma(amount)
        self.shaker:AddTrauma(amount)
    end

    function combo:AddParallax(layerNode, factorX, factorY)
        local p = ParallaxLayer.New(layerNode, self.follow.cameraNode, factorX, factorY)
        table.insert(self.parallax, p)
        return p
    end

    function combo:Update(dt, targetVel)
        local offset = self.shaker:Update(dt)
        self.follow:SetShake(offset.x, offset.y)
        self.follow:Update(dt)
        self.bounds:Clamp()
        for _, p in ipairs(self.parallax) do
            p:Update(dt)
        end
    end

    return combo
end

return M
