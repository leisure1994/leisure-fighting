--- UrhoX 平台物理核心模块（KinematicCharacterController + MovingPlatform）
-- 基于 UrhoX 原生 RigidBody + CollisionShape 在 Lua 层实现运动学角色控制器，
-- 提供重力、斜坡移动、跳跃（含 coyote time / jump buffer）、移动平台吸附、
-- 射线/Sphere 地面检测等完整功能。
-- @module PlatformerPhysics
-- @author OpenClaw

local PlatformerPhysics = {}

-- ========================================================================
-- 常量定义
-- ========================================================================

--- 默认属性值
local DEFAULT_STEP_HEIGHT = 0.4
local DEFAULT_JUMP_FORCE = 7.0
local DEFAULT_FALL_SPEED = 55.0
local DEFAULT_MAX_SLOPE = 45.0
local DEFAULT_DAMPING = 0.2
local DEFAULT_GRAVITY = Vector3(0.0, -14.0, 0.0)
local DEFAULT_MOVE_FORCE = 0.8
local DEFAULT_BRAKE_FORCE = 0.2
local DEFAULT_INAIR_MOVE_FORCE = 0.02
local DEFAULT_INAIR_THRESHOLD_TIME = 0.1
local DEFAULT_COYOTE_TIME = 0.1
local DEFAULT_JUMP_BUFFER_TIME = 0.1
local DEFAULT_PLATFORM_SPEED = 5.0
local DEFAULT_PLATFORM_MIN_SPEED = 1.5

--- 碰撞事件模式：始终发送
local COLLISION_ALWAYS = 2

--- 常用方向向量（显式构造，避免依赖未导出的静态常量）
local VEC_UP    = Vector3(0.0, 1.0, 0.0)
local VEC_DOWN  = Vector3(0.0, -1.0, 0.0)

-- ========================================================================
-- 私有辅助函数
-- ========================================================================

--- 判断值是否在范围内 [min, max]
-- @param value number 输入值
-- @param min number 下限
-- @param max number 上限
-- @return number 裁剪后的值
local function Clamp(value, min, max)
    if value < min then return min end
    if value > max then return max end
    return value
end

--- 将向量投影到由法线定义的平面上
-- @param vec Vector3 原始向量
-- @param normal Vector3 平面法线（应已归一化）
-- @return Vector3 投影后的向量
local function ProjectOnPlane(vec, normal)
    local dot = vec:DotProduct(normal)
    return vec - normal * dot
end

--- 计算两个 Vector3 之间的角度（度）
-- @param a Vector3 向量 A
-- @param b Vector3 向量 B
-- @return number 角度（度）
local function AngleBetween(a, b)
    local lenA = a:Length()
    local lenB = b:Length()
    if lenA < 1e-6 or lenB < 1e-6 then return 0.0 end
    local cosv = Clamp(a:DotProduct(b) / (lenA * lenB), -1.0, 1.0)
    return math.deg(math.acos(cosv))
end

-- ========================================================================
-- KinematicCharacterController
-- ========================================================================

--- KinematicCharacterController 构造函数
-- @param node Node 绑定的角色节点（必须已挂载 RigidBody）
-- @return table KinematicCharacterController 实例
function PlatformerPhysics.KinematicCharacterController.New(node)
    local self = setmetatable({}, { __index = PlatformerPhysics.KinematicCharacterController })
    self.node_ = node
    self.body_ = nil
    self.shape_ = nil
    self.world_ = nil
    self.gravity_ = DEFAULT_GRAVITY
    self.stepHeight_ = DEFAULT_STEP_HEIGHT
    self.jumpForce_ = DEFAULT_JUMP_FORCE
    self.fallSpeed_ = DEFAULT_FALL_SPEED
    self.maxSlope_ = DEFAULT_MAX_SLOPE
    self.linearDamping_ = DEFAULT_DAMPING
    self.angularDamping_ = DEFAULT_DAMPING
    self.moveForce_ = DEFAULT_MOVE_FORCE
    self.brakeForce_ = DEFAULT_BRAKE_FORCE
    self.inAirMoveForce_ = DEFAULT_INAIR_MOVE_FORCE
    self.coyoteTime_ = DEFAULT_COYOTE_TIME
    self.jumpBufferTime_ = DEFAULT_JUMP_BUFFER_TIME

    self.onGround_ = false
    self.softGrounded_ = false
    self.okToJump_ = true
    self.isJumping_ = false
    self.jumpStarted_ = false
    self.inAirTimer_ = 0.0
    self.coyoteTimer_ = 0.0
    self.jumpBufferTimer_ = 0.0
    self.walkDir_ = Vector3.ZERO

    self.groundNormal_ = VEC_UP
    self.groundBody_ = nil
    self.groundDistance_ = 0.0

    self.colLayer_ = 1
    self.colMask_ = 0xFFFF

    -- 移动平台数据（双缓冲以计算 delta）
    self.movingData_ = {
        { node_ = nil, transform_ = Matrix3x4() },
        { node_ = nil, transform_ = Matrix3x4() },
    }

    self:Init()
    return self
end

--- 初始化控制器，缓存组件并绑定事件
function PlatformerPhysics.KinematicCharacterController:Init()
    if self.node_ == nil then
        LogError("KinematicCharacterController.Init: node is nil")
        return
    end

    self.body_ = self.node_:GetComponent("RigidBody", true)
    self.shape_ = self.node_:GetComponent("CollisionShape", true)

    local scene = self.node_:GetScene()
    if scene then
        self.world_ = scene:GetComponent("PhysicsWorld")
    end

    if self.body_ then
        self.body_:SetAngularFactor(Vector3.ZERO)
        self.body_:SetCollisionEventMode(COLLISION_ALWAYS)
        self.body_:SetGravityOverride(self.gravity_)
        self.body_:SetLinearDamping(self.linearDamping_)
        self.body_:SetAngularDamping(self.angularDamping_)
    else
        LogError("KinematicCharacterController.Init: RigidBody not found on node.")
    end

    -- 订阅碰撞事件（用于移动平台检测与额外地面校验）
    SubscribeToEvent(self.node_, "NodeCollision", function(eventType, eventData)
        self:OnCollision(eventType, eventData)
    end)
end

--- 设置碰撞层
-- @param layer number 碰撞层位掩码
function PlatformerPhysics.KinematicCharacterController:SetCollisionLayer(layer)
    self.colLayer_ = layer
    if self.body_ then
        self.body_:SetCollisionLayer(layer)
    end
end

--- 设置碰撞掩码
-- @param mask number 碰撞掩码
function PlatformerPhysics.KinematicCharacterController:SetCollisionMask(mask)
    self.colMask_ = mask
    if self.body_ then
        self.body_:SetCollisionMask(mask)
    end
end

--- 同时设置碰撞层与掩码
-- @param layer number 碰撞层
-- @param mask number 碰撞掩码
function PlatformerPhysics.KinematicCharacterController:SetCollisionLayerAndMask(layer, mask)
    self.colLayer_ = layer
    self.colMask_ = mask
    if self.body_ then
        self.body_:SetCollisionLayer(layer)
        self.body_:SetCollisionMask(mask)
    end
end

--- 设置重力
-- @param gravity Vector3 重力向量
function PlatformerPhysics.KinematicCharacterController:SetGravity(gravity)
    self.gravity_ = gravity
    if self.body_ then
        self.body_:SetGravityOverride(gravity)
    end
end

--- 获取当前重力
-- @return Vector3 重力向量
function PlatformerPhysics.KinematicCharacterController:GetGravity()
    return self.gravity_
end

--- 设置线性阻尼
-- @param damping number 阻尼值
function PlatformerPhysics.KinematicCharacterController:SetLinearDamping(damping)
    self.linearDamping_ = damping
    if self.body_ then
        self.body_:SetLinearDamping(damping)
    end
end

--- 获取线性阻尼
-- @return number 阻尼值
function PlatformerPhysics.KinematicCharacterController:GetLinearDamping()
    return self.linearDamping_
end

--- 设置角阻尼
-- @param damping number 阻尼值
function PlatformerPhysics.KinematicCharacterController:SetAngularDamping(damping)
    self.angularDamping_ = damping
    if self.body_ then
        self.body_:SetAngularDamping(damping)
    end
end

--- 获取角阻尼
-- @return number 阻尼值
function PlatformerPhysics.KinematicCharacterController:GetAngularDamping()
    return self.angularDamping_
end

--- 设置最大可攀爬斜坡角度（度）
-- @param slope number 斜坡角度（度）
function PlatformerPhysics.KinematicCharacterController:SetMaxSlope(slope)
    self.maxSlope_ = Clamp(slope, 0.0, 89.0)
end

--- 获取最大可攀爬斜坡角度
-- @return number 斜坡角度（度）
function PlatformerPhysics.KinematicCharacterController:GetMaxSlope()
    return self.maxSlope_
end

--- 设置跳跃力度
-- @param force number 向上的冲量力
function PlatformerPhysics.KinematicCharacterController:SetJumpForce(force)
    self.jumpForce_ = force
end

--- 获取跳跃力度
-- @return number 冲量力
function PlatformerPhysics.KinematicCharacterController:GetJumpForce()
    return self.jumpForce_
end

--- 设置 coyote time（离开地面后仍可跳跃的缓冲时间）
-- @param t number 时间（秒）
function PlatformerPhysics.KinematicCharacterController:SetCoyoteTime(t)
    self.coyoteTime_ = math.max(0.0, t)
end

--- 设置跳跃缓冲时间（按下跳跃后到触地自动跳的等待时间）
-- @param t number 时间（秒）
function PlatformerPhysics.KinematicCharacterController:SetJumpBufferTime(t)
    self.jumpBufferTime_ = math.max(0.0, t)
end

--- 设置行走方向（在世界坐标系或角色本地坐标系下的未缩放方向）
-- @param dir Vector3 方向向量
function PlatformerPhysics.KinematicCharacterController:SetWalkDirection(dir)
    self.walkDir_ = dir
end

--- 是否站立在地面上（严格基于射线/球体检测）
-- @return boolean
function PlatformerPhysics.KinematicCharacterController:IsOnGround()
    return self.onGround_
end

--- 当前是否处于"软地面"状态（包含 coyote time）
-- @return boolean
function PlatformerPhysics.KinematicCharacterController:IsSoftGrounded()
    return self.softGrounded_
end

--- 是否能跳跃（基于软地面状态与按键缓冲）
-- @return boolean
function PlatformerPhysics.KinematicCharacterController:CanJump()
    return self.softGrounded_
end

--- 强制施加跳跃冲量
function PlatformerPhysics.KinematicCharacterController:Jump()
    if not self.body_ then return end
    if self:CanJump() then
        self.body_:ApplyImpulse(VEC_UP * self.jumpForce_)
        self.okToJump_ = false
        self.isJumping_ = true
        self.jumpStarted_ = true
        self.coyoteTimer_ = 0.0
        self.jumpBufferTimer_ = 0.0
    end
end

--- 发出跳跃请求（配合 Jump Buffer 使用）。若当前未落地，会保留请求等待落地。
function PlatformerPhysics.KinematicCharacterController:RequestJump()
    self.jumpBufferTimer_ = self.jumpBufferTime_
end

--- 瞬移到指定位置
-- @param position Vector3 目标位置
function PlatformerPhysics.KinematicCharacterController:Warp(position)
    if self.node_ then
        self.node_:SetWorldPosition(position)
    end
    if self.body_ then
        self.body_:SetLinearVelocity(Vector3.ZERO)
    end
end

--- 获取线性速度
-- @return Vector3 速度
function PlatformerPhysics.KinematicCharacterController:GetLinearVelocity()
    if self.body_ then
        return self.body_:GetLinearVelocity()
    end
    return Vector3.ZERO
end

--- 设置线性速度
-- @param velocity Vector3 目标速度
function PlatformerPhysics.KinematicCharacterController:SetLinearVelocity(velocity)
    if self.body_ then
        self.body_:SetLinearVelocity(velocity)
    end
end

--- 处理 NodeCollision 事件，用于移动平台检测与辅助地面校验。
-- 已由 Init() 自动订阅；若外部有特殊需求也可手动转发。
-- @param eventType StringHash 事件类型
-- @param eventData VariantMap 事件数据
function PlatformerPhysics.KinematicCharacterController:OnCollision(eventType, eventData)
    if self.body_ == nil then return end

    -- 检测移动平台（Trigger 体积）
    local otherBody = eventData["OtherBody"]
    if otherBody and otherBody:IsTrigger() then
        local otherNode = eventData["OtherNode"]
        if otherNode then
            local var = otherNode:GetVar(StringHash("IsMovingPlatform"))
            if var and var ~= Variant.EMPTY and var:GetBool() then
                self.movingData_[1].node_ = otherNode
                self.movingData_[1].transform_ = otherNode:GetWorldTransform()
            end
        end
    end

    -- 辅助地面校验：分析碰撞接触点法线
    local contactsBuf = eventData["Contacts"]
    if contactsBuf then
        local contacts = MemoryBuffer(contactsBuf:GetBuffer())
        local posY = self.node_:GetPosition().y
        while not contacts:IsEof() do
            local contactPos = contacts:ReadVector3()
            local contactNormal = contacts:ReadVector3()
            contacts:ReadFloat() -- distance
            contacts:ReadFloat() -- impulse
            if contactPos.y < (posY + 1.0) then
                if contactNormal.y > 0.75 then
                    self.onGround_ = true
                    self.groundNormal_ = contactNormal
                end
            end
        end
    end
end

--- 执行地面检测（SphereCast + RaycastSingle 双保险）
-- @return boolean 是否检测到地面
-- @return Vector3 地面法线
-- @return number 地面距离
-- @return RigidBody|nil 地面刚体
function PlatformerPhysics.KinematicCharacterController:ProbeGround()
    if self.world_ == nil or self.body_ == nil then
        return false, VEC_UP, 0.0, nil
    end

    local pos = self.node_:GetWorldPosition()
    local radius = 0.35
    local castDistance = self.stepHeight_ + 0.05
    local startOffset = Vector3(0.0, radius + 0.1, 0.0)

    -- 优先使用 SphereCast：从角色底部球心向下扫掠
    local ray = Ray(pos + startOffset, VEC_DOWN)
    local result = PhysicsRaycastResult()
    self.world_:SphereCast(result, ray, radius, castDistance, self.colMask_)

    if result.body and result.body ~= self.body_ then
        return true, result.normal, result.distance, result.body
    end

    -- 备用：中心射线检测
    local rayResult = PhysicsRaycastResult()
    self.world_:RaycastSingle(rayResult, Ray(pos, VEC_DOWN), castDistance + radius, self.colMask_)
    if rayResult.body and rayResult.body ~= self.body_ then
        return true, rayResult.normal, rayResult.distance, rayResult.body
    end

    return false, VEC_UP, 0.0, nil
end

--- 每帧物理更新，必须在 FixedUpdate 中调用。
-- @param timeStep number 时间步长
function PlatformerPhysics.KinematicCharacterController:FixedUpdate(timeStep)
    if self.body_ == nil then return end

    -- 1. 重力覆盖
    self.body_:SetGravityOverride(self.gravity_)

    -- 2. 探测地面
    local wasOnGround = self.onGround_
    self.onGround_, self.groundNormal_, self.groundDistance_, self.groundBody_ = self:ProbeGround()

    -- 3. 更新空中计时器与 coyote time
    if not self.onGround_ then
        self.inAirTimer_ = self.inAirTimer_ + timeStep
        if wasOnGround then
            self.coyoteTimer_ = self.coyoteTime_
        else
            self.coyoteTimer_ = math.max(0.0, self.coyoteTimer_ - timeStep)
        end
    else
        self.inAirTimer_ = 0.0
        self.coyoteTimer_ = self.coyoteTime_
        self.jumpStarted_ = false
    end

    self.softGrounded_ = self.onGround_ or self.coyoteTimer_ > 0.0

    -- 4. 斜坡约束：超过最大坡度则视为不 grounded
    if self.onGround_ then
        local slopeDeg = AngleBetween(self.groundNormal_, VEC_UP)
        if slopeDeg > self.maxSlope_ then
            self.softGrounded_ = false
            self.onGround_ = false
        end
    end

    -- 5. 处理跳跃缓冲与跳跃触发
    if self.jumpBufferTimer_ > 0.0 then
        self.jumpBufferTimer_ = math.max(0.0, self.jumpBufferTimer_ - timeStep)
        if self.softGrounded_ and self.okToJump_ then
            self:Jump()
        end
    end

    -- 6. 处理行走移动
    local velocity = self.body_:GetLinearVelocity()
    local planeVelocity = Vector3(velocity.x, 0.0, velocity.z)
    local moveDir = self.walkDir_
    local effectiveMoveForce = self.softGrounded_ and self.moveForce_ or self.inAirMoveForce_

    -- 斜坡投影
    if self.onGround_ and moveDir:LengthSquared() > 0.0 then
        local projected = ProjectOnPlane(moveDir, self.groundNormal_)
        -- 若坡度朝上且角度超限，则仅保留水平分量
        if projected:LengthSquared() > 1e-8 then
            moveDir = projected
        end
    end

    if moveDir:LengthSquared() > 0.0 then
        self.body_:ApplyImpulse(moveDir * effectiveMoveForce)
    end

    -- 7. 地面制动（防止无限加速）
    if self.softGrounded_ then
        local brake = -planeVelocity * self.brakeForce_
        self.body_:ApplyImpulse(brake)
    end

    -- 8. 限制下落速度（防止穿透）
    if velocity.y < -self.fallSpeed_ then
        local clamped = Vector3(velocity.x, -self.fallSpeed_, velocity.z)
        self.body_:SetLinearVelocity(clamped)
    end
end

--- FixedPostUpdate 回调，处理移动平台吸附与节点同步。
-- 必须在 FixedPostUpdate 中调用。
-- @param timeStep number 时间步长
function PlatformerPhysics.KinematicCharacterController:FixedPostUpdate(timeStep)
    if self.body_ == nil then return end

    -- 移动平台 delta transform 吸附
    local md0 = self.movingData_[1]
    local md1 = self.movingData_[2]
    if md0.node_ and md1.node_ and md0.node_ == md1.node_ then
        local delta = md0.transform_ * md1.transform_:Inverse()
        local curPos = self.node_:GetWorldPosition()
        local curRot = self.node_:GetWorldRotation()
        local mat = Matrix3x4(curPos, curRot, Vector3.ONE)
        mat = delta * mat
        self.node_:SetWorldPosition(mat:Translation())
        self.node_:SetWorldRotation(mat:Rotation())
    end

    -- 平台数据移位
    self.movingData_[2] = {
        node_ = self.movingData_[1].node_,
        transform_ = self.movingData_[1].transform_,
    }
    self.movingData_[1].node_ = nil
    self.movingData_[1].transform_ = Matrix3x4()
end

-- ========================================================================
-- MovingPlatform
-- ========================================================================

--- MovingPlatform 构造函数
-- @param node Node 平台节点（必须已挂载 RigidBody）
-- @return table MovingPlatform 实例
function PlatformerPhysics.MovingPlatform.New(node)
    local self = setmetatable({}, { __index = PlatformerPhysics.MovingPlatform })
    self.node_ = node
    self.finishPosition_ = Vector3.ZERO
    self.initialPosition_ = Vector3.ZERO
    self.directionToFinish_ = Vector3.ZERO
    self.maxLiftSpeed_ = DEFAULT_PLATFORM_SPEED
    self.minLiftSpeed_ = DEFAULT_PLATFORM_MIN_SPEED
    self.curLiftSpeed_ = 0.0
    self.platformState_ = 0 -- 0=START, 1=MOVETO_FINISH, 2=MOVETO_START, 3=FINISH
    self.isRunning_ = false
    return self
end

--- 初始化移动平台
-- @param finishPosition Vector3 终点位置
-- @param startImmediately boolean 是否立即开始移动，默认 true
function PlatformerPhysics.MovingPlatform:Initialize(finishPosition, startImmediately)
    if self.node_ == nil then return end
    self.initialPosition_ = self.node_:GetWorldPosition()
    self.finishPosition_ = finishPosition
    local diff = finishPosition - self.initialPosition_
    self.directionToFinish_ = diff:Normalized()
    self.platformState_ = 1
    self.curLiftSpeed_ = self.maxLiftSpeed_
    self.isRunning_ = (startImmediately ~= false)
end

--- 设置移动速度
-- @param speed number 最大速度
function PlatformerPhysics.MovingPlatform:SetPlatformSpeed(speed)
    self.maxLiftSpeed_ = speed
    if self.isRunning_ then
        self.curLiftSpeed_ = speed
    end
end

--- 暂停/继续平台移动
-- @param running boolean 是否运行
function PlatformerPhysics.MovingPlatform:SetRunning(running)
    self.isRunning_ = running
end

--- 每帧物理更新，必须在 FixedUpdate 中调用。
-- @param timeStep number 时间步长
function PlatformerPhysics.MovingPlatform:FixedUpdate(timeStep)
    if self.node_ == nil or not self.isRunning_ then return end

    local platformPos = self.node_:GetPosition()
    local newPos = platformPos

    if self.platformState_ == 1 then -- MOVETO_FINISH
        local curDistance = self.finishPosition_ - platformPos
        local dist = curDistance:Length()
        local curDirection = curDistance:Normalized()
        local dotd = self.directionToFinish_:DotProduct(curDirection)

        if dotd > 0.0 then
            if dist < 1.0 then
                self.curLiftSpeed_ = self.curLiftSpeed_ * 0.92
            end
            self.curLiftSpeed_ = Clamp(self.curLiftSpeed_, self.minLiftSpeed_, self.maxLiftSpeed_)
            newPos = platformPos + curDirection * self.curLiftSpeed_ * timeStep
        else
            newPos = self.finishPosition_
            self.curLiftSpeed_ = self.maxLiftSpeed_
            self.platformState_ = 2
        end
        self.node_:SetPosition(newPos)

    elseif self.platformState_ == 2 then -- MOVETO_START
        local curDistance = self.initialPosition_ - platformPos
        local dist = curDistance:Length()
        local curDirection = curDistance:Normalized()
        local dotd = self.directionToFinish_:DotProduct(curDirection)

        if dotd < 0.0 then
            if dist < 1.0 then
                self.curLiftSpeed_ = self.curLiftSpeed_ * 0.92
            end
            self.curLiftSpeed_ = Clamp(self.curLiftSpeed_, self.minLiftSpeed_, self.maxLiftSpeed_)
            newPos = platformPos + curDirection * self.curLiftSpeed_ * timeStep
        else
            newPos = self.initialPosition_
            self.curLiftSpeed_ = self.maxLiftSpeed_
            self.platformState_ = 1
        end
        self.node_:SetPosition(newPos)
    end
end

-- ========================================================================
-- 模块导出
-- ========================================================================
return PlatformerPhysics
