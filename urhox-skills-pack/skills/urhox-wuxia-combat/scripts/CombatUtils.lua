-- CombatUtils.lua
-- 武侠战斗系统公共工具函数库
-- 提供向量运算、时间格式化、表深度拷贝、随机选择等通用辅助

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local EPSILON = 0.0001
local DEG2RAD = math.pi / 180.0
local RAD2DEG = 180.0 / math.pi

-- ============================================================================
-- 标量运算
-- ============================================================================

--- 线性插值
-- @param a number 起始值
-- @param b number 目标值
-- @param t number 插值系数 [0,1]
-- @return number
function M.Lerp(a, b, t)
    t = math.max(0.0, math.min(1.0, t))
    return a + (b - a) * t
end

--- 将值限制在 [min, max] 范围内
-- @param value number
-- @param minVal number
-- @param maxVal number
-- @return number
function M.Clamp(value, minVal, maxVal)
    return math.max(minVal, math.min(maxVal, value))
end

--- 角度规范化到 [-180, 180]
-- @param angle number
-- @return number
function M.NormalizeAngle(angle)
    while angle > 180.0 do
        angle = angle - 360.0
    end
    while angle < -180.0 do
        angle = angle + 360.0
    end
    return angle
end

--- 计算两角度之间的最短差值
-- @param a number
-- @param b number
-- @return number
function M.AngleDifference(a, b)
    return M.NormalizeAngle(b - a)
end

--- 指数衰减平滑
-- @param current number
-- @param target number
-- @param decay number
-- @param dt number
-- @return number
function M.ExpDecay(current, target, decay, dt)
    return M.Lerp(current, target, 1.0 - math.exp(-decay * dt))
end

-- ============================================================================
-- 向量运算（三维表封装）
-- ============================================================================

--- 构建三维向量
-- @param x number
-- @param y number
-- @param z number
-- @return table
function M.Vec3(x, y, z)
    return { x = x or 0.0, y = y or 0.0, z = z or 0.0 }
end

--- 三维向量加法
-- @param a table
-- @param b table
-- @return table
function M.Vec3Add(a, b)
    return { x = a.x + b.x, y = a.y + b.y, z = a.z + b.z }
end

--- 三维向量减法
-- @param a table
-- @param b table
-- @return table
function M.Vec3Sub(a, b)
    return { x = a.x - b.x, y = a.y - b.y, z = a.z - b.z }
end

--- 三维向量数乘
-- @param v table
-- @param s number
-- @return table
function M.Vec3Scale(v, s)
    return { x = v.x * s, y = v.y * s, z = v.z * s }
end

--- 三维向量长度
-- @param v table
-- @return number
function M.Vec3Length(v)
    return math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
end

--- 三维向量归一化
-- @param v table
-- @return table
function M.Vec3Normalize(v)
    local len = M.Vec3Length(v)
    if len < EPSILON then
        return { x = 0.0, y = 0.0, z = 0.0 }
    end
    return { x = v.x / len, y = v.y / len, z = v.z / len }
end

--- 三维向量点乘
-- @param a table
-- @param b table
-- @return number
function M.Vec3Dot(a, b)
    return a.x * b.x + a.y * b.y + a.z * b.z
end

--- 三维向量插值
-- @param a table
-- @param b table
-- @param t number
-- @return table
function M.Vec3Lerp(a, b, t)
    return {
        x = M.Lerp(a.x, b.x, t),
        y = M.Lerp(a.y, b.y, t),
        z = M.Lerp(a.z, b.z, t),
    }
end

--- 计算从原点指向目标的方向角度（Yaw，度）
-- @param origin table {x,y,z}
-- @param target table {x,y,z}
-- @return number Yaw角度
function M.CalcYawToTarget(origin, target)
    local dx = target.x - origin.x
    local dz = target.z - origin.z
    return math.atan2(dx, dz) * RAD2DEG
end

-- ============================================================================
-- 表工具
-- ============================================================================

--- 浅拷贝表
-- @param t table
-- @return table
function M.ShallowCopy(t)
    local copy = {}
    for k, v in pairs(t) do
        copy[k] = v
    end
    return copy
end

--- 深拷贝表（支持嵌套表，不处理循环引用）
-- @param t table
-- @return table
function M.DeepCopy(t)
    local copy = {}
    for k, v in pairs(t) do
        if type(v) == "table" then
            copy[k] = M.DeepCopy(v)
        else
            copy[k] = v
        end
    end
    return copy
end

--- 从数组中按权重随机选取一项
-- @param items table {{item=any, weight=number}, ...}
-- @return any 选中的 item
function M.WeightedRandomChoice(items)
    local totalWeight = 0.0
    for _, entry in ipairs(items) do
        totalWeight = totalWeight + (entry.weight or 1.0)
    end
    if totalWeight <= 0.0 then
        return nil
    end
    local rand = math.random() * totalWeight
    for _, entry in ipairs(items) do
        rand = rand - (entry.weight or 1.0)
        if rand <= 0.0 then
            return entry.item
        end
    end
    return items[#items] and items[#items].item
end

--- 检查表是否包含指定值（假设为数组结构）
-- @param arr table
-- @param value any
-- @return boolean
function M.TableContains(arr, value)
    for _, v in ipairs(arr) do
        if v == value then
            return true
        end
    end
    return false
end

--- 从数组中移除指定值（仅移除第一个匹配项）
-- @param arr table
-- @param value any
-- @return boolean 是否成功移除
function M.TableRemoveValue(arr, value)
    for i, v in ipairs(arr) do
        if v == value then
            table.remove(arr, i)
            return true
        end
    end
    return false
end

--- 格式化时间（秒 -> 分:秒）
-- @param seconds number
-- @return string
function M.FormatTime(seconds)
    local m = math.floor(seconds / 60)
    local s = math.floor(seconds % 60)
    return string.format("%02d:%02d", m, s)
end

--- 生成唯一标识符（UUID v4 简化版）
-- @return string
function M.GenerateUUID()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return string.gsub(template, "[xy]", function(c)
        local v = (c == "x") and math.random(0, 15) or math.random(8, 11)
        return string.format("%x", v)
    end)
end

-- ============================================================================
-- 安全节点操作（兼容 Urho3D Node 或纯表）
-- ============================================================================

--- 安全获取节点的世界位置
-- @param node any Node 对象或坐标表
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
        return { x = node.x, y = node.y or 0.0, z = node.z or 0.0 }
    end
    return { x = 0.0, y = 0.0, z = 0.0 }
end

--- 安全应用物理脉冲（击退效果）
-- @param node Node 目标节点（需带 RigidBody）
-- @param impulse table {x,y,z}
function M.ApplyImpulseSafe(node, impulse)
    if not node then
        return
    end
    local body = node:GetComponent("RigidBody")
    if body and type(body.ApplyImpulse) == "function" then
        body:ApplyImpulse(impulse)
    end
end

--- 安全播放动画
-- @param node Node 动画节点（需带 AnimatedModel / AnimationController）
-- @param animName string
-- @param looped boolean|nil
function M.PlayAnimationSafe(node, animName, looped)
    if not node then
        return
    end
    local animCtrl = node:GetComponent("AnimationController")
    if animCtrl and type(animCtrl.PlayExclusive) == "function" then
        animCtrl:PlayExclusive(animName, 0, looped or false, 0.1)
    end
end

--- 安全设置节点旋转（Yaw 角度）
-- 适用于武侠战斗中常见的“面向攻击方向”需求
-- @param node Node
-- @param yaw number 角度（度）
function M.SetNodeYawSafe(node, yaw)
    if not node or type(node.SetRotation) ~= "function" then
        return
    end
    if type(Quaternion) == "function" then
        node:SetRotation(Quaternion(0.0, yaw, 0.0))
    end
end

return M
