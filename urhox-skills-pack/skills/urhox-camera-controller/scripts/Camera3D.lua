-- Camera3D.lua
-- 3D 游戏镜头控制器
-- 提供平滑跟随、肩越视角、轨道相机、FPS 第一人称与碰撞避障

local Utils = require("scripts/CameraUtils")

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local DEFAULT_SMOOTH_TIME = 0.12
local DEFAULT_ROTATION_SMOOTH_TIME = 0.1
local DEFAULT_TRAUMA_DECAY = 2.0
local DEFAULT_MOUSE_SENSITIVITY = 0.1
local DEFAULT_ZOOM_MIN = 1.0
local DEFAULT_ZOOM_MAX = 15.0
local DEFAULT_ZOOM_SPEED = 2.0

-- ============================================================================
-- SmoothFollow3D 3D 平滑跟随
-- ============================================================================

local SmoothFollow3D = {}
SmoothFollow3D.__index = SmoothFollow3D

--- 创建3D平滑跟随控制器
-- @param cameraNode Node
-- @param targetNode Node
-- @return table
function SmoothFollow3D.New(cameraNode, targetNode)
    local self = setmetatable({}, SmoothFollow3D)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.offset = Utils.Vec3(0.0, 3.0, -8.0)
    self.smoothTime = DEFAULT_SMOOTH_TIME
    self.rotationSmoothTime = DEFAULT_ROTATION_SMOOTH_TIME
    self.maxSpeed = math.huge
    self.lookAtTarget = true
    self.posVelocity = { x = 0.0, y = 0.0, z = 0.0 }
    self.yawVelocity = { 0.0 }
    self.pitchVelocity = { 0.0 }
    self.currentYaw = 0.0
    self.currentPitch = 15.0
    self.shakePos = Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = Utils.Vec3(0.0, 0.0, 0.0)
    return self
end

--- 设置跟随偏移（目标局部空间，通常 Y 轴向上）
-- @param ox number
-- @param oy number
-- @param oz number
function SmoothFollow3D:SetOffset(ox, oy, oz)
    self.offset = Utils.Vec3(ox, oy, oz)
end

--- 设置平滑参数
-- @param posTime number 位置平滑时间
-- @param rotTime number 旋转平滑时间
-- @param maxSpeed number|nil
function SmoothFollow3D:SetSmooth(posTime, rotTime, maxSpeed)
    self.smoothTime = posTime or DEFAULT_SMOOTH_TIME
    self.rotationSmoothTime = rotTime or DEFAULT_ROTATION_SMOOTH_TIME
    self.maxSpeed = maxSpeed or math.huge
end

--- 设置屏幕震动偏移
-- @param pos table {x,y,z} 位置震动
-- @param rot table {x,y,z} 旋转震动（欧拉角，度）
function SmoothFollow3D:SetShake(pos, rot)
    self.shakePos = pos or Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = rot or Utils.Vec3(0.0, 0.0, 0.0)
end

--- 更新相机位置与朝向
-- @param dt number
function SmoothFollow3D:Update(dt)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local targetPos = Utils.GetNodeWorldPosition(self.targetNode)

    -- 计算期望位置 = 目标位置 + 偏移（简单世界空间偏移，不做旋转矩阵变换）
    local desiredPos = Utils.Vec3Add(targetPos, self.offset)
    desiredPos = Utils.Vec3Add(desiredPos, self.shakePos)

    local camPos = Utils.GetNodeWorldPosition(self.cameraNode)
    local newPos = Utils.Vec3SmoothDamp(camPos, desiredPos, self.posVelocity, self.smoothTime, self.maxSpeed, dt)

    Utils.SetNodePositionSafe(self.cameraNode, newPos)

    if self.lookAtTarget then
        -- 计算朝向目标的 yaw/pitch
        local dir = Utils.Vec3Sub(targetPos, newPos)
        local flatLen = math.sqrt(dir.x * dir.x + dir.z * dir.z)
        local targetYaw = math.atan2(dir.x, dir.z) * (180.0 / math.pi)
        local targetPitch = -math.atan2(dir.y, flatLen) * (180.0 / math.pi)

        self.currentYaw = Utils.SmoothDampAngle(self.currentYaw, targetYaw, self.yawVelocity, self.rotationSmoothTime, dt)
        self.currentPitch = Utils.SmoothDampAngle(self.currentPitch, targetPitch, self.pitchVelocity, self.rotationSmoothTime, dt)

        local finalPitch = self.currentPitch + (self.shakeRot.x or 0.0)
        local finalYaw = self.currentYaw + (self.shakeRot.y or 0.0)
        local finalRoll = self.shakeRot.z or 0.0

        if type(Quaternion) == "function" then
            local q = Quaternion(finalPitch, finalYaw, finalRoll)
            Utils.SetNodeRotationSafe(self.cameraNode, q)
        end
    end
end

M.SmoothFollow3D = SmoothFollow3D

-- ============================================================================
-- FPSCamera 第一人称相机
-- ============================================================================

local FPSCamera = {}
FPSCamera.__index = FPSCamera

--- 创建 FPS 相机控制器
-- @param cameraNode Node
-- @param moveSpeed number 移动速度
-- @param mouseSensitivity number 鼠标灵敏度
-- @return table
function FPSCamera.New(cameraNode, moveSpeed, mouseSensitivity)
    local self = setmetatable({}, FPSCamera)
    self.cameraNode = cameraNode
    self.yaw = 0.0
    self.pitch = 0.0
    self.moveSpeed = moveSpeed or 10.0
    self.mouseSensitivity = mouseSensitivity or DEFAULT_MOUSE_SENSITIVITY
    self.enableMovement = true
    self.shakePos = Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = Utils.Vec3(0.0, 0.0, 0.0)
    self.input = nil -- 应由外部注入 Urho3D Input 子系统
    return self
end

--- 注入输入子系统
-- @param input any Input 子系统
function FPSCamera:SetInput(input)
    self.input = input
end

--- 处理鼠标输入更新朝向
-- @param dx number 鼠标 X 偏移
-- @param dy number 鼠标 Y 偏移
function FPSCamera:OnMouseMove(dx, dy)
    self.yaw = self.yaw + dx * self.mouseSensitivity
    self.pitch = self.pitch - dy * self.mouseSensitivity
    self.pitch = math.max(-89.0, math.min(89.0, self.pitch))
end

--- 设置震动偏移
-- @param pos table {x,y,z}
-- @param rot table {x,y,z}
function FPSCamera:SetShake(pos, rot)
    self.shakePos = pos or Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = rot or Utils.Vec3(0.0, 0.0, 0.0)
end

--- 更新 FPS 相机位置与旋转
-- @param dt number
function FPSCamera:Update(dt)
    if not self.cameraNode then
        return
    end

    local finalPitch = self.pitch + (self.shakeRot.x or 0.0)
    local finalYaw = self.yaw + (self.shakeRot.y or 0.0)
    local finalRoll = self.shakeRot.z or 0.0

    if type(Quaternion) == "function" then
        self.cameraNode:SetRotation(Quaternion(finalPitch, finalYaw, finalRoll))
    end

    if self.enableMovement and self.input then
        local fwd = self.cameraNode.rotation and self.cameraNode.rotation * Vector3.FORWARD or { x = 0.0, y = 0.0, z = 1.0 }
        local right = self.cameraNode.rotation and self.cameraNode.rotation * Vector3.RIGHT or { x = 1.0, y = 0.0, z = 0.0 }

        local moveDir = Utils.Vec3(0.0, 0.0, 0.0)
        if self.input:GetKeyDown(KEY_W) then moveDir = Utils.Vec3Add(moveDir, fwd) end
        if self.input:GetKeyDown(KEY_S) then moveDir = Utils.Vec3Sub(moveDir, fwd) end
        if self.input:GetKeyDown(KEY_D) then moveDir = Utils.Vec3Add(moveDir, right) end
        if self.input:GetKeyDown(KEY_A) then moveDir = Utils.Vec3Sub(moveDir, right) end

        local len = Utils.Vec3Length(moveDir)
        if len > 0.001 then
            moveDir = Utils.Vec3Scale(moveDir, 1.0 / len)
            local pos = Utils.GetNodeWorldPosition(self.cameraNode)
            local delta = Utils.Vec3Scale(moveDir, self.moveSpeed * dt)
            delta = Utils.Vec3Add(delta, self.shakePos)
            local newPos = Utils.Vec3Add(pos, delta)
            Utils.SetNodePositionSafe(self.cameraNode, newPos)
        else
            if self.shakePos.x ~= 0.0 or self.shakePos.y ~= 0.0 or self.shakePos.z ~= 0.0 then
                local pos = Utils.GetNodeWorldPosition(self.cameraNode)
                Utils.SetNodePositionSafe(self.cameraNode, Utils.Vec3Add(pos, self.shakePos))
            end
        end
    else
        -- 非移动模式下仍然应用震动位置偏移
        if self.shakePos.x ~= 0.0 or self.shakePos.y ~= 0.0 or self.shakePos.z ~= 0.0 then
            local pos = Utils.GetNodeWorldPosition(self.cameraNode)
            Utils.SetNodePositionSafe(self.cameraNode, Utils.Vec3Add(pos, self.shakePos))
        end
    end
end

M.FPSCamera = FPSCamera

-- ============================================================================
-- OverShoulderCamera 肩越视角（第三人称）
-- ============================================================================

local OverShoulderCamera = {}
OverShoulderCamera.__index = OverShoulderCamera

--- 创建肩越视角控制器
-- @param cameraNode Node
-- @param targetNode Node
-- @return table
function OverShoulderCamera.New(cameraNode, targetNode)
    local self = setmetatable({}, OverShoulderCamera)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.distance = 5.0
    self.height = 1.8
    self.sideOffset = 1.2
    self.yawOffset = 15.0
    self.pitchOffset = 5.0
    self.smoothTime = 0.1
    self.posVelocity = { x = 0.0, y = 0.0, z = 0.0 }
    self.yawVelocity = { 0.0 }
    self.pitchVelocity = { 0.0 }
    self.currentYaw = 0.0
    self.currentPitch = 0.0
    self.shakePos = Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = Utils.Vec3(0.0, 0.0, 0.0)
    return self
end

--- 设置肩越参数
-- @param distance number 相机到目标的距离
-- @param height number 相机相对目标的高度
-- @param sideOffset number 侧向偏移（右肩为正）
function OverShoulderCamera:SetOffset(distance, height, sideOffset)
    self.distance = distance or 5.0
    self.height = height or 1.8
    self.sideOffset = sideOffset or 1.2
end

--- 设置角度偏移
-- @param yaw number
-- @param pitch number
function OverShoulderCamera:SetAngleOffset(yaw, pitch)
    self.yawOffset = yaw or 15.0
    self.pitchOffset = pitch or 5.0
end

--- 设置屏幕震动偏移
-- @param pos table {x,y,z}
-- @param rot table {x,y,z}
function OverShoulderCamera:SetShake(pos, rot)
    self.shakePos = pos or Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = rot or Utils.Vec3(0.0, 0.0, 0.0)
end

--- 计算理想相机位置（世界空间）
-- @param targetPos table {x,y,z}
-- @param targetYaw number 目标角色的朝向角度（度）
-- @return table {x,y,z}
function OverShoulderCamera:CalcIdealPosition(targetPos, targetYaw)
    local yaw = math.rad(targetYaw + self.yawOffset)
    local pitch = math.rad(self.pitchOffset)

    local backX = math.sin(yaw) * self.distance * math.cos(pitch)
    local backZ = math.cos(yaw) * self.distance * math.cos(pitch)
    local backY = math.sin(pitch) * self.distance

    local sideYaw = math.rad(targetYaw + 90.0)
    local sideX = math.sin(sideYaw) * self.sideOffset
    local sideZ = math.cos(sideYaw) * self.sideOffset

    return {
        x = targetPos.x - backX + sideX + self.shakePos.x,
        y = targetPos.y + self.height - backY + self.shakePos.y,
        z = targetPos.z - backZ + sideZ + self.shakePos.z,
    }
end

--- 更新
-- @param dt number
-- @param targetYaw number|nil 目标当前朝向角（度），若 nil 则使用目标节点的世界旋转 Yaw
function OverShoulderCamera:Update(dt, targetYaw)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local targetPos = Utils.GetNodeWorldPosition(self.targetNode)

    if targetYaw == nil then
        -- 尝试从节点旋转提取 yaw
        if self.targetNode.rotation then
            local euler = self.targetNode.rotation:EulerAngles()
            targetYaw = euler.y or 0.0
        else
            targetYaw = 0.0
        end
    end

    local desiredPos = self:CalcIdealPosition(targetPos, targetYaw)
    local camPos = Utils.GetNodeWorldPosition(self.cameraNode)
    local newPos = Utils.Vec3SmoothDamp(camPos, desiredPos, self.posVelocity, self.smoothTime, math.huge, dt)

    Utils.SetNodePositionSafe(self.cameraNode, newPos)

    -- 计算朝向目标的方向
    local lookDir = Utils.Vec3Sub(targetPos, newPos)
    local flatLen = math.sqrt(lookDir.x * lookDir.x + lookDir.z * lookDir.z)
    local aimYaw = math.atan2(lookDir.x, lookDir.z) * (180.0 / math.pi)
    local aimPitch = -math.atan2(lookDir.y, flatLen) * (180.0 / math.pi)

    self.currentYaw = Utils.SmoothDampAngle(self.currentYaw, aimYaw, self.yawVelocity, self.smoothTime, dt)
    self.currentPitch = Utils.SmoothDampAngle(self.currentPitch, aimPitch, self.pitchVelocity, self.smoothTime, dt)

    local finalPitch = self.currentPitch + (self.shakeRot.x or 0.0)
    local finalYaw = self.currentYaw + (self.shakeRot.y or 0.0)
    local finalRoll = self.shakeRot.z or 0.0
    if type(Quaternion) == "function" then
        Utils.SetNodeRotationSafe(self.cameraNode, Quaternion(finalPitch, finalYaw, finalRoll))
    end
end

M.OverShoulderCamera = OverShoulderCamera

-- ============================================================================
-- OrbitCamera 轨道相机
-- ============================================================================

local OrbitCamera = {}
OrbitCamera.__index = OrbitCamera

--- 创建轨道相机
-- @param cameraNode Node
-- @param targetNode Node
-- @return table
function OrbitCamera.New(cameraNode, targetNode)
    local self = setmetatable({}, OrbitCamera)
    self.cameraNode = cameraNode
    self.targetNode = targetNode
    self.yaw = 0.0
    self.pitch = 30.0
    self.distance = 8.0
    self.minDistance = DEFAULT_ZOOM_MIN
    self.maxDistance = DEFAULT_ZOOM_MAX
    self.zoomSpeed = DEFAULT_ZOOM_SPEED
    self.orbitSpeedX = 1.0
    self.orbitSpeedY = 1.0
    self.smoothTime = 0.08
    self.posVelocity = { x = 0.0, y = 0.0, z = 0.0 }
    self.yawVelocity = { 0.0 }
    self.pitchVelocity = { 0.0 }
    self.distVelocity = { 0.0 }
    self.currentYaw = 0.0
    self.currentPitch = 30.0
    self.currentDistance = 8.0
    self.shakePos = Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = Utils.Vec3(0.0, 0.0, 0.0)
    return self
end

--- 设置轨道距离限制
-- @param minD number
-- @param maxD number
function OrbitCamera:SetDistanceLimits(minD, maxD)
    self.minDistance = minD or DEFAULT_ZOOM_MIN
    self.maxDistance = maxD or DEFAULT_ZOOM_MAX
end

--- 设置轨道速度
-- @param sx number 水平旋转速度系数
-- @param sy number 垂直旋转速度系数
function OrbitCamera:SetOrbitSpeed(sx, sy)
    self.orbitSpeedX = sx or 1.0
    self.orbitSpeedY = sy or 1.0
end

--- 处理鼠标拖拽旋转
-- @param dx number
-- @param dy number
function OrbitCamera:OnMouseDrag(dx, dy)
    self.yaw = self.yaw + dx * self.orbitSpeedX
    self.pitch = self.pitch + dy * self.orbitSpeedY
    self.pitch = math.max(-80.0, math.min(80.0, self.pitch))
end

--- 处理滚轮缩放
-- @param delta number
function OrbitCamera:OnZoom(delta)
    self.distance = self.distance - delta * self.zoomSpeed
    self.distance = math.max(self.minDistance, math.min(self.maxDistance, self.distance))
end

--- 设置震动偏移
-- @param pos table {x,y,z}
-- @param rot table {x,y,z}
function OrbitCamera:SetShake(pos, rot)
    self.shakePos = pos or Utils.Vec3(0.0, 0.0, 0.0)
    self.shakeRot = rot or Utils.Vec3(0.0, 0.0, 0.0)
end

--- 计算理想位置
-- @param targetPos table {x,y,z}
-- @return table {x,y,z}
function OrbitCamera:CalcIdealPosition(targetPos)
    local yawRad = math.rad(self.currentYaw)
    local pitchRad = math.rad(self.currentPitch)
    local dx = math.sin(yawRad) * math.cos(pitchRad) * self.currentDistance
    local dz = math.cos(yawRad) * math.cos(pitchRad) * self.currentDistance
    local dy = math.sin(pitchRad) * self.currentDistance
    return {
        x = targetPos.x - dx + self.shakePos.x,
        y = targetPos.y + dy + self.shakePos.y,
        z = targetPos.z - dz + self.shakePos.z,
    }
end

--- 更新
-- @param dt number
function OrbitCamera:Update(dt)
    if not self.cameraNode or not self.targetNode then
        return
    end
    local targetPos = Utils.GetNodeWorldPosition(self.targetNode)

    self.currentYaw = Utils.SmoothDampAngle(self.currentYaw, self.yaw, self.yawVelocity, self.smoothTime, dt)
    self.currentPitch = Utils.SmoothDampAngle(self.currentPitch, self.pitch, self.pitchVelocity, self.smoothTime, dt)
    self.currentDistance = Utils.SmoothDamp(self.currentDistance, self.distance, self.distVelocity, self.smoothTime, nil, dt)

    local desiredPos = self:CalcIdealPosition(targetPos)
    local camPos = Utils.GetNodeWorldPosition(self.cameraNode)
    local newPos = Utils.Vec3SmoothDamp(camPos, desiredPos, self.posVelocity, self.smoothTime, math.huge, dt)

    Utils.SetNodePositionSafe(self.cameraNode, newPos)

    local lookDir = Utils.Vec3Sub(targetPos, newPos)
    local flatLen = math.sqrt(lookDir.x * lookDir.x + lookDir.z * lookDir.z)
    local aimYaw = math.atan2(lookDir.x, lookDir.z) * (180.0 / math.pi)
    local aimPitch = -math.atan2(lookDir.y, flatLen) * (180.0 / math.pi)

    if type(Quaternion) == "function" then
        Utils.SetNodeRotationSafe(self.cameraNode, Quaternion(aimPitch + self.shakeRot.x, aimYaw + self.shakeRot.y, self.shakeRot.z))
    end
end

M.OrbitCamera = OrbitCamera

-- ============================================================================
-- CollisionAvoidance 碰撞避障（3D 通用）
-- ============================================================================

local CollisionAvoidance = {}
CollisionAvoidance.__index = CollisionAvoidance

--- 创建碰撞避障器
-- @param scene any Scene 对象（用于获取 PhysicsWorld）
-- @param collisionMask number|nil 碰撞掩码
-- @return table
function CollisionAvoidance.New(scene, collisionMask)
    local self = setmetatable({}, CollisionAvoidance)
    self.scene = scene
    self.collisionMask = collisionMask or 0xFFFF
    self.sphereCastRadius = 0.2
    self.bufferDistance = 0.3
    return self
end

--- 设置射线检测半径与缓冲距离
-- @param radius number
-- @param buffer number
function CollisionAvoidance:SetParams(radius, buffer)
    self.sphereCastRadius = radius or 0.2
    self.bufferDistance = buffer or 0.3
end

--- 计算避障后的相机位置
-- 从目标位置向期望相机位置发射射线，若命中障碍物则将相机拉近
-- @param targetPos table {x,y,z}
-- @param desiredPos table {x,y,z}
-- @return table 安全位置
function CollisionAvoidance:Resolve(targetPos, desiredPos)
    if not self.scene then
        return desiredPos
    end

    local dir = Utils.Vec3Sub(desiredPos, targetPos)
    local maxDist = Utils.Vec3Length(dir)
    if maxDist < 0.001 then
        return desiredPos
    end
    local normDir = Utils.Vec3Normalize(dir)

    -- 尝试简单射线检测
    local hit, hitDist = Utils.SimpleRaycast(self.scene, targetPos, normDir, maxDist + self.sphereCastRadius, self.collisionMask)
    if hit then
        local safeDist = math.max(0.0, hitDist - self.bufferDistance - self.sphereCastRadius)
        local safePos = Utils.Vec3Add(targetPos, Utils.Vec3Scale(normDir, safeDist))
        return safePos
    end

    return desiredPos
end

M.CollisionAvoidance = CollisionAvoidance

-- ============================================================================
-- ScreenShake3D 3D 屏幕震动器
-- ============================================================================

local ScreenShake3D = {}
ScreenShake3D.__index = ScreenShake3D

--- 创建3D屏幕震动器
-- @return table
function ScreenShake3D.New()
    local self = setmetatable({}, ScreenShake3D)
    self.trauma = 0.0
    self.traumaDecay = DEFAULT_TRAUMA_DECAY
    self.maxPosOffset = 0.3
    self.maxRotOffset = 3.0
    self.timeScale = 1.0
    self.elapsedTime = 0.0
    self.currentPosOffset = Utils.Vec3(0.0, 0.0, 0.0)
    self.currentRotOffset = Utils.Vec3(0.0, 0.0, 0.0)
    return self
end

--- 设置参数
-- @param traumaDecay number
-- @param maxPos number 最大位置偏移
-- @param maxRot number 最大旋转偏移（度）
function ScreenShake3D:SetParams(traumaDecay, maxPos, maxRot)
    self.traumaDecay = traumaDecay or DEFAULT_TRAUMA_DECAY
    self.maxPosOffset = maxPos or 0.3
    self.maxRotOffset = maxRot or 3.0
end

--- 添加创伤
-- @param amount number [0,1]
function ScreenShake3D:AddTrauma(amount)
    self.trauma = math.min(1.0, self.trauma + math.max(0.0, amount))
end

--- 设置创伤值
-- @param amount number [0,1]
function ScreenShake3D:SetTrauma(amount)
    self.trauma = math.max(0.0, math.min(1.0, amount))
end

--- 更新
-- @param dt number
-- @return table posOffset {x,y,z}
-- @return table rotOffset {x,y,z}
function ScreenShake3D:Update(dt)
    self.elapsedTime = self.elapsedTime + dt * self.timeScale
    if self.trauma > 0.0 then
        self.trauma = math.max(0.0, self.trauma - self.traumaDecay * dt)
    end

    local p = Utils.SampleShakeOffset3D(self.trauma, self.elapsedTime, self.maxPosOffset)
    local r = Utils.SampleShakeOffset3D(self.trauma, self.elapsedTime + 50.0, self.maxRotOffset)
    self.currentPosOffset = p
    self.currentRotOffset = r
    return p, r
end

--- 获取当前偏移
-- @return table posOffset
-- @return table rotOffset
function ScreenShake3D:GetOffset()
    return self.currentPosOffset, self.currentRotOffset
end

M.ScreenShake3D = ScreenShake3D

-- ============================================================================
-- 便捷组合：带碰撞避障的肩越视角
-- ============================================================================

--- 创建高级第三人称相机（肩越视角 + 碰撞避障 + 屏幕震动）
-- @param cameraNode Node
-- @param targetNode Node
-- @param scene any Scene
-- @return table 组合控制器
function M.CreateAdvancedThirdPerson(cameraNode, targetNode, scene)
    local combo = {
        shoulder = OverShoulderCamera.New(cameraNode, targetNode),
        avoider = CollisionAvoidance.New(scene),
        shaker = ScreenShake3D.New(),
    }

    function combo:SetOffset(distance, height, sideOffset)
        self.shoulder:SetOffset(distance, height, sideOffset)
    end

    function combo:SetAngleOffset(yaw, pitch)
        self.shoulder:SetAngleOffset(yaw, pitch)
    end

    function combo:SetAvoidanceParams(radius, buffer)
        self.avoider:SetParams(radius, buffer)
    end

    function combo:AddTrauma(amount)
        self.shaker:AddTrauma(amount)
    end

    function combo:Update(dt, targetYaw)
        local shakePos, shakeRot = self.shaker:Update(dt)
        self.shoulder:SetShake(shakePos, shakeRot)
        self.shoulder:Update(dt, targetYaw)

        local camPos = Utils.GetNodeWorldPosition(self.shoulder.cameraNode)
        local targetPos = Utils.GetNodeWorldPosition(self.shoulder.targetNode)
        local safePos = self.avoider:Resolve(targetPos, camPos)
        if safePos.x ~= camPos.x or safePos.y ~= camPos.y or safePos.z ~= camPos.z then
            Utils.SetNodePositionSafe(self.shoulder.cameraNode, safePos)
        end
    end

    return combo
end

return M
