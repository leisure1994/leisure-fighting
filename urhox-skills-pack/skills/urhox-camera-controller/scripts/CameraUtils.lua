-- CameraUtils.lua
-- 镜头控制公共工具函数库
-- 提供插值、限幅、向量运算、平滑阻尼等通用数学辅助

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local EPSILON = 0.0001
local DEG2RAD = math.pi / 180.0
local RAD2DEG = 180.0 / math.pi
local HALF_PI = math.pi * 0.5

-- ============================================================================
-- 标量运算
-- ============================================================================

--- 线性插值
-- @param a number 起始值
-- @param b number 目标值
-- @param t number 插值系数 [0,1]
-- @return number 插值结果
function M.Lerp(a, b, t)
    t = math.max(0.0, math.min(1.0, t))
    return a + (b - a) * t
end

--- 平滑阻尼插值（近似弹簧阻尼效果，适用于镜头跟随）
-- @param current number 当前值
-- @param target number 目标值
-- @param velocityRef table 速度引用表（用于保存中间速度）
-- @param smoothTime number 平滑时间（越小响应越快）
-- @param maxSpeed number|nil 最大速度限制
-- @param deltaTime number 时间步长
-- @return number 新当前值
function M.SmoothDamp(current, target, velocityRef, smoothTime, maxSpeed, deltaTime)
    smoothTime = math.max(0.0001, smoothTime)
    local omega = 2.0 / smoothTime
    local x = omega * deltaTime
    local exp = 1.0 / (1.0 + x + 0.48 * x * x + 0.235 * x * x * x)
    local change = current - target
    local originalTarget = target

    if maxSpeed then
        local maxChange = maxSpeed * smoothTime
        change = math.max(-maxChange, math.min(maxChange, change))
    end

    target = current - change
    local temp = (velocityRef[1] + omega * change) * deltaTime
    velocityRef[1] = (velocityRef[1] - omega * temp) * exp
    local output = target + (change + temp) * exp

    if (originalTarget - current) > 0.0 and (output > originalTarget) then
        output = originalTarget
        velocityRef[1] = 0.0
    elseif (originalTarget - current) < 0.0 and (output < originalTarget) then
        output = originalTarget
        velocityRef[1] = 0.0
    end

    return output
end

--- 将角度规范到 [-180, 180] 范围内
-- @param angle number 角度（度）
-- @return number 规范后的角度
function M.NormalizeAngle(angle)
    while angle > 180.0 do
        angle = angle - 360.0
    end
    while angle < -180.0 do
        angle = angle + 360.0
    end
    return angle
end

--- 角度线性插值（处理环绕）
-- @param a number 起始角度
-- @param b number 目标角度
-- @param t number 插值系数
-- @return number 插值结果
function M.LerpAngle(a, b, t)
    local diff = M.NormalizeAngle(b - a)
    return a + diff * math.max(0.0, math.min(1.0, t))
end

--- 平滑阻尼角度
-- @param current number 当前角度
-- @param target number 目标角度
-- @param velocityRef table 速度引用表
-- @param smoothTime number 平滑时间
-- @param deltaTime number 时间步长
-- @return number 新角度
function M.SmoothDampAngle(current, target, velocityRef, smoothTime, deltaTime)
    local diff = M.NormalizeAngle(target - current)
    target = current + diff
    return M.SmoothDamp(current, target, velocityRef, smoothTime, nil, deltaTime)
end

--- 指数衰减平滑（适用于简单的镜头位置/缩放平滑）
-- @param current number 当前值
-- @param target number 目标值
-- @param decay number 衰减系数（通常 1~25）
-- @param dt number 时间步长
-- @return number 平滑后的值
function M.ExpDecay(current, target, decay, dt)
    return M.Lerp(current, target, 1.0 - math.exp(-decay * dt))
end

-- ============================================================================
-- 向量运算（基于 Urho3D Vector3 的表封装，兼容 Lua 无原生 Vector3  bindings 的场景）
-- ============================================================================

--- 构建三维向量表
-- @param x number
-- @param y number
-- @param z number
-- @return table {x,y,z}
function M.Vec3(x, y, z)
    return { x = x or 0.0, y = y or 0.0, z = z or 0.0 }
end

--- 三维向量加法
-- @param a table
-- @param b table
-- @return table 和向量
function M.Vec3Add(a, b)
    return { x = a.x + b.x, y = a.y + b.y, z = a.z + b.z }
end

--- 三维向量减法
-- @param a table
-- @param b table
-- @return table 差向量
function M.Vec3Sub(a, b)
    return { x = a.x - b.x, y = a.y - b.y, z = a.z - b.z }
end

--- 三维向量数乘
-- @param v table
-- @param s number
-- @return table 数乘结果
function M.Vec3Scale(v, s)
    return { x = v.x * s, y = v.y * s, z = v.z * s }
end

--- 三维向量点乘
-- @param a table
-- @param b table
-- @return number 点乘结果
function M.Vec3Dot(a, b)
    return a.x * b.x + a.y * b.y + a.z * b.z
end

--- 三维向量长度
-- @param v table
-- @return number 长度
function M.Vec3Length(v)
    return math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
end

--- 三维向量归一化
-- @param v table
-- @return table 单位向量（若长度接近零则返回零向量）
function M.Vec3Normalize(v)
    local len = M.Vec3Length(v)
    if len < EPSILON then
        return { x = 0.0, y = 0.0, z = 0.0 }
    end
    return { x = v.x / len, y = v.y / len, z = v.z / len }
end

--- 三维向量线性插值
-- @param a table
-- @param b table
-- @param t number
-- @return table 插值结果
function M.Vec3Lerp(a, b, t)
    return {
        x = M.Lerp(a.x, b.x, t),
        y = M.Lerp(a.y, b.y, t),
        z = M.Lerp(a.z, b.z, t),
    }
end

--- 三维向量平滑阻尼
-- @param current table 当前向量
-- @param target table 目标向量
-- @param velocityRef table 速度引用向量 {x,y,z}
-- @param smoothTime number
-- @param maxSpeed number|nil
-- @param deltaTime number
-- @return table 新向量
function M.Vec3SmoothDamp(current, target, velocityRef, smoothTime, maxSpeed, deltaTime)
    local vx = { velocityRef.x or 0.0 }
    local vy = { velocityRef.y or 0.0 }
    local vz = { velocityRef.z or 0.0 }

    local rx = M.SmoothDamp(current.x, target.x, vx, smoothTime, maxSpeed, deltaTime)
    local ry = M.SmoothDamp(current.y, target.y, vy, smoothTime, maxSpeed, deltaTime)
    local rz = M.SmoothDamp(current.z, target.z, vz, smoothTime, maxSpeed, deltaTime)

    velocityRef.x = vx[1]
    velocityRef.y = vy[1]
    velocityRef.z = vz[1]

    return { x = rx, y = ry, z = rz }
end

--- 三维向量指数衰减平滑
-- @param current table
-- @param target table
-- @param decay number
-- @param dt number
-- @return table
function M.Vec3ExpDecay(current, target, decay, dt)
    return M.Vec3Lerp(current, target, 1.0 - math.exp(-decay * dt))
end

--- 二维向量表构建
-- @param x number
-- @param y number
-- @return table {x,y}
function M.Vec2(x, y)
    return { x = x or 0.0, y = y or 0.0 }
end

--- 二维向量线性插值
-- @param a table
-- @param b table
-- @param t number
-- @return table
function M.Vec2Lerp(a, b, t)
    return { x = M.Lerp(a.x, b.x, t), y = M.Lerp(a.y, b.y, t) }
end

--- 二维向量平滑阻尼
-- @param current table
-- @param target table
-- @param velocityRef table {x,y}
-- @param smoothTime number
-- @param maxSpeed number|nil
-- @param deltaTime number
-- @return table
function M.Vec2SmoothDamp(current, target, velocityRef, smoothTime, maxSpeed, deltaTime)
    local vx = { velocityRef.x or 0.0 }
    local vy = { velocityRef.y or 0.0 }
    local rx = M.SmoothDamp(current.x, target.x, vx, smoothTime, maxSpeed, deltaTime)
    local ry = M.SmoothDamp(current.y, target.y, vy, smoothTime, maxSpeed, deltaTime)
    velocityRef.x = vx[1]
    velocityRef.y = vy[1]
    return { x = rx, y = ry }
end

-- ============================================================================
-- 矩形/边界运算（2D 常用）
-- ============================================================================

--- 构建矩形边界表
-- @param minX number
-- @param minY number
-- @param maxX number
-- @param maxY number
-- @return table 边界
function M.Rect(minX, minY, maxX, maxY)
    return { minX = minX, minY = minY, maxX = maxX, maxY = maxY }
end

--- 将点限制在矩形内部
-- @param point table {x,y}
-- @param rect table
-- @return table 限制后的点
function M.ClampPointToRect(point, rect)
    return {
        x = math.max(rect.minX, math.min(rect.maxX, point.x)),
        y = math.max(rect.minY, math.min(rect.maxY, point.y)),
    }
end

--- 判断矩形是否包含点
-- @param rect table
-- @param point table {x,y}
-- @return boolean
function M.RectContains(rect, point)
    return point.x >= rect.minX and point.x <= rect.maxX and point.y >= rect.minY and point.y <= rect.maxY
end

-- ============================================================================
-- 噪声/随机辅助（屏幕震动用）
-- ============================================================================

--- 基于 Perlin-like 的简单平滑噪声（一维）
-- @param x number
-- @return number [-1,1]
function M.Noise1D(x)
    local n = math.floor(x)
    local f = x - n
    local a = math.sin(n * 12.9898) * 43758.5453
    local b = math.sin((n + 1) * 12.9898) * 43758.5453
    a = a - math.floor(a)
    b = b - math.floor(b)
    local t = f * f * (3.0 - 2.0 * f)
    return M.Lerp(a, b, t) * 2.0 - 1.0
end

--- 屏幕震动偏移采样（ trauma-based shake offset ）
-- @param trauma number [0,1]
-- @param time number 当前时间
-- @param maxOffset number 最大偏移量
-- @return table {x,y}
function M.SampleShakeOffset2D(trauma, time, maxOffset)
    local magnitude = trauma * trauma * maxOffset
    local ox = M.Noise1D(time * 15.0) * magnitude
    local oy = M.Noise1D(time * 15.0 + 100.0) * magnitude
    return { x = ox, y = oy }
end

--- 三维屏幕震动偏移采样
-- @param trauma number [0,1]
-- @param time number
-- @param maxOffset number
-- @return table {x,y,z}
function M.SampleShakeOffset3D(trauma, time, maxOffset)
    local magnitude = trauma * trauma * maxOffset
    local ox = M.Noise1D(time * 15.0) * magnitude
    local oy = M.Noise1D(time * 15.0 + 100.0) * magnitude
    local oz = M.Noise1D(time * 15.0 + 200.0) * magnitude
    return { x = ox, y = oy, z = oz }
end

-- ============================================================================
-- Urho3D 节点操作封装（适配 Lua API 的常见写法）
-- ============================================================================

--- 安全获取节点的世界位置（兼容 Node 对象或坐标表）
-- @param node any Node 对象或表
-- @return table {x,y,z}
function M.GetNodeWorldPosition(node)
    if not node then
        return { x = 0.0, y = 0.0, z = 0.0 }
    end
    if type(node.GetWorldPosition) == "function" then
        local pos = node:GetWorldPosition()
        return { x = pos.x or 0.0, y = pos.y or 0.0, z = pos.z or 0.0 }
    end
    if type(node.x) == "number" then
        return { x = node.x or 0.0, y = node.y or 0.0, z = node.z or 0.0 }
    end
    return { x = 0.0, y = 0.0, z = 0.0 }
end

--- 安全设置节点的位置（Node 对象专用）
-- @param node Node
-- @param pos table {x,y,z}
function M.SetNodePositionSafe(node, pos)
    if node and type(node.SetPosition) == "function" then
        node:SetPosition(pos)
    end
end

--- 安全设置节点的旋转（Quaternion 或 Euler）
-- @param node Node
-- @param rot table|any Quaternion 对象或 {x,y,z} Euler 角度
function M.SetNodeRotationSafe(node, rot)
    if not node or type(node.SetRotation) ~= "function" then
        return
    end
    if type(rot.x) == "number" and type(rot.w) == "number" then
        -- 假设是 Quaternion 表或对象
        node:SetRotation(rot)
    elseif type(rot.x) == "number" then
        -- 表形式 Euler -> 需要外部提供 Quaternion 构造，这里仅做尽力调用
        if type(node.SetRotation) == "function" and type(Quaternion) == "function" then
            node:SetRotation(Quaternion(rot.x, rot.y, rot.z))
        end
    else
        node:SetRotation(rot)
    end
end

-- ============================================================================
-- Raycast / 碰撞避障简化辅助
-- ============================================================================

--- 简单的线性射线检测模拟（若无 PhysicsWorld 可用则退化为距离检查）
-- 在真实的 UrhoX 项目中，应替换为 scene:GetComponent("PhysicsWorld"):RaycastSingle
-- @param scene any Scene 对象
-- @param origin table {x,y,z}
-- @param direction table {x,y,z}
-- @param maxDistance number
-- @param collisionMask number|nil
-- @return boolean hit 是否命中
-- @return number distance 命中距离（未命中返回 maxDistance）
function M.SimpleRaycast(scene, origin, direction, maxDistance, collisionMask)
    if not scene then
        return false, maxDistance
    end
    local physicsWorld = scene:GetComponent("PhysicsWorld")
    if not physicsWorld then
        return false, maxDistance
    end
    local ray = Ray(origin, direction)
    local result = PhysicsRaycastResult()
    physicsWorld:RaycastSingle(result, ray, maxDistance, collisionMask or 0xFFFF)
    if result.body_ then
        return true, result.distance_
    end
    return false, maxDistance
end

return M
