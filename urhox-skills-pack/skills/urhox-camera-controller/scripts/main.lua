-- urhox-camera-controller
-- UrhoX 全功能镜头控制系统统一入口
-- 整合 2D 像素/RPG 镜头与 3D 平滑跟随、FPS、肩越视角、轨道相机、碰撞避障

local Camera2D = require("scripts/Camera2D")
local Camera3D = require("scripts/Camera3D")
local Utils = require("scripts/CameraUtils")

local M = {}

-- 暴露子模块，方便高级用户直接调用
M.Camera2D = Camera2D
M.Camera3D = Camera3D
M.Utils = Utils

-- ============================================================================
-- 2D 工厂方法
-- ============================================================================

--- 创建像素完美跟随相机
-- 适用于像素艺术游戏，消除子像素抖动
-- @param cameraNode Node
-- @param targetNode Node
-- @param pixelScale number 世界单位到像素的缩放比例（如 1 单位 = 32 像素则填 32）
-- @return PixelPerfectFollow 实例
function M.CreatePixelPerfectFollow(cameraNode, targetNode, pixelScale)
    return Camera2D.PixelPerfectFollow.New(cameraNode, targetNode, pixelScale)
end

--- 创建2D平滑跟随相机
-- 支持死区、前视预测、边界限制
-- @param cameraNode Node
-- @param targetNode Node
-- @return SmoothFollow2D 实例
function M.CreateSmoothFollow2D(cameraNode, targetNode)
    return Camera2D.SmoothFollow2D.New(cameraNode, targetNode)
end

--- 创建房间锁定相机（Metroidvania / RPG）
-- @param cameraNode Node
-- @param targetNode Node
-- @param roomWidth number 单个房间宽度（世界单位）
-- @param roomHeight number 单个房间高度（世界单位）
-- @return RoomLockedCamera 实例
function M.CreateRoomLockedCamera(cameraNode, targetNode, roomWidth, roomHeight)
    return Camera2D.RoomLockedCamera.New(cameraNode, targetNode, roomWidth, roomHeight)
end

--- 创建2D屏幕震动器
-- @return ScreenShake2D 实例
function M.CreateScreenShake2D()
    return Camera2D.ScreenShake2D.New()
end

--- 创建视差背景层
-- @param layerNode Node 背景层根节点
-- @param cameraNode Node 参考相机节点
-- @param factorX number X轴视差系数
-- @param factorY number Y轴视差系数
-- @return ParallaxLayer 实例
function M.CreateParallaxLayer(layerNode, cameraNode, factorX, factorY)
    return Camera2D.ParallaxLayer.New(layerNode, cameraNode, factorX, factorY)
end

--- 创建2D相机边界限制器
-- @param cameraNode Node
-- @param viewHalfWidth number 视口半宽（世界单位）
-- @param viewHalfHeight number 视口半高（世界单位）
-- @return CameraBounds2D 实例
function M.CreateCameraBounds2D(cameraNode, viewHalfWidth, viewHalfHeight)
    return Camera2D.CameraBounds2D.New(cameraNode, viewHalfWidth, viewHalfHeight)
end

--- 一键创建完整的像素风 RPG 相机组合
-- 包含：PixelPerfectFollow + ScreenShake2D + CameraBounds2D + 视差管理
-- @param cameraNode Node
-- @param targetNode Node
-- @param pixelScale number
-- @param viewHalfWidth number
-- @param viewHalfHeight number
-- @return table 组合控制器
function M.CreatePixelRPGCamera(cameraNode, targetNode, pixelScale, viewHalfWidth, viewHalfHeight)
    return Camera2D.CreatePixelRPGCamera(cameraNode, targetNode, pixelScale, viewHalfWidth, viewHalfHeight)
end

-- ============================================================================
-- 3D 工厂方法
-- ============================================================================

--- 创建3D平滑跟随相机
-- @param cameraNode Node
-- @param targetNode Node
-- @return SmoothFollow3D 实例
function M.CreateSmoothFollow3D(cameraNode, targetNode)
    return Camera3D.SmoothFollow3D.New(cameraNode, targetNode)
end

--- 创建FPS第一人称相机
-- @param cameraNode Node
-- @param moveSpeed number|nil 移动速度
-- @param mouseSensitivity number|nil 鼠标灵敏度
-- @return FPSCamera 实例
function M.CreateFPSCamera(cameraNode, moveSpeed, mouseSensitivity)
    return Camera3D.FPSCamera.New(cameraNode, moveSpeed, mouseSensitivity)
end

--- 创建肩越视角相机（第三人称）
-- @param cameraNode Node
-- @param targetNode Node
-- @return OverShoulderCamera 实例
function M.CreateOverShoulderCamera(cameraNode, targetNode)
    return Camera3D.OverShoulderCamera.New(cameraNode, targetNode)
end

--- 创建轨道相机
-- @param cameraNode Node
-- @param targetNode Node
-- @return OrbitCamera 实例
function M.CreateOrbitCamera(cameraNode, targetNode)
    return Camera3D.OrbitCamera.New(cameraNode, targetNode)
end

--- 创建碰撞避障器
-- @param scene any Scene 对象
-- @param collisionMask number|nil
-- @return CollisionAvoidance 实例
function M.CreateCollisionAvoidance(scene, collisionMask)
    return Camera3D.CollisionAvoidance.New(scene, collisionMask)
end

--- 创建3D屏幕震动器
-- @return ScreenShake3D 实例
function M.CreateScreenShake3D()
    return Camera3D.ScreenShake3D.New()
end

--- 一键创建高级第三人称相机（肩越视角 + 碰撞避障 + 屏幕震动）
-- @param cameraNode Node
-- @param targetNode Node
-- @param scene any Scene
-- @return table 组合控制器
function M.CreateAdvancedThirdPerson(cameraNode, targetNode, scene)
    return Camera3D.CreateAdvancedThirdPerson(cameraNode, targetNode, scene)
end

-- ============================================================================
-- 全局辅助：从节点当前状态初始化旋转（用于 FPS / Orbit 初始化时避免跳变）
-- ============================================================================

--- 读取节点当前旋转并分解为 Pitch/Yaw（假设 Roll = 0，适用于多数游戏镜头）
-- @param cameraNode Node
-- @return number pitch
-- @return number yaw
function M.ExtractEulerFromNode(cameraNode)
    if not cameraNode then
        return 0.0, 0.0
    end
    if cameraNode.rotation and type(cameraNode.rotation.EulerAngles) == "function" then
        local euler = cameraNode.rotation:EulerAngles()
        return euler.x or 0.0, euler.y or 0.0
    end
    return 0.0, 0.0
end

return M
