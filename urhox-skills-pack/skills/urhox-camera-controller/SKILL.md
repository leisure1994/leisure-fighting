# UrhoX 镜头控制器（urhox-camera-controller）

UrhoX 全功能镜头控制系统，覆盖 **2D 像素/RPG 游戏** 与 **3D 动作/射击/角色扮演游戏** 所需的全部主流镜头技巧。

---

## 核心特性

### 2D 镜头
- **PixelPerfectFollow**：像素级对齐，彻底消除子像素抖动
- **SmoothFollow2D**：带死区、前视预测与边界钳制的平滑跟随
- **RoomLockedCamera**：Metroidvania / RPG 房间锁定与平滑过渡
- **ScreenShake2D**：trauma-based 屏幕震动，支持衰减控制
- **ParallaxLayer**：多层视差背景，适配横版/竖版场景
- **CameraBounds2D**：将镜头限制在地图边界内

### 3D 镜头
- **SmoothFollow3D**：3D 平滑跟随，自动计算 Yaw/Pitch 并插值
- **FPSCamera**：第一人称鼠标视角 + WASD 移动
- **OverShoulderCamera**：肩越第三人称视角，支持左右肩切换
- **OrbitCamera**：环绕目标旋转 + 滚轮缩放，带距离限制
- **CollisionAvoidance**：射线碰撞避障，防止镜头穿墙/入地
- **ScreenShake3D**：3D 位置与旋转同步震动

---

## 快速开始

```lua
local Cam = require("scripts/main")

-- ===== 2D 像素风 RPG 一键相机 =====
local camera = Cam.CreatePixelRPGCamera(
    cameraNode, targetNode,
    32,    -- pixelScale：1 世界单位 = 32 像素
    10, 7.5 -- 视口半宽、半高（世界单位）
)

-- 设置地图边界
camera:SetBounds(0, 0, 200, 150)

-- 添加视差背景（远林、近山）
camera:AddParallax(farForestNode, 0.2, 0.1)
camera:AddParallax(nearMountainNode, 0.5, 0.2)

-- 在游戏主循环中更新
camera:Update(dt)

-- 触发屏幕震动（受击、爆炸）
camera:AddTrauma(0.5)
```

```lua
-- ===== 3D 高级第三人称（肩越 + 碰撞避障 + 震动） =====
local tps = Cam.CreateAdvancedThirdPerson(cameraNode, playerNode, scene)

tps:SetOffset(5.0, 1.8, 1.2)      -- 距离、高度、侧偏移
tps:SetAngleOffset(15.0, 5.0)     -- Yaw/Pitch 偏移
tps:SetAvoidanceParams(0.2, 0.3) -- 射线半径、缓冲距离
tps:AddTrauma(0.4)                -- 被击退时震一下

-- 在主循环更新（targetYaw 为玩家当前朝向角）
tps:Update(dt, targetYaw)
```

---

## 模块架构

### CameraUtils.lua
公共数学工具库，所有 2D/3D 控制器共享：

| 函数 | 用途 |
|------|------|
| `Lerp(a,b,t)` | 线性插值 |
| `SmoothDamp(...)` | 弹簧阻尼插值（Unity 风格） |
| `SmoothDampAngle(...)` | 角度平滑阻尼（处理 -180~180 环绕） |
| `ExpDecay(...)` | 指数衰减平滑 |
| `Vec3* / Vec2*` | 向量加减、缩放、点乘、长度、归一化、插值、阻尼 |
| `Rect / ClampPointToRect` | 2D 矩形边界运算 |
| `Noise1D / SampleShakeOffset*` | 屏幕震动噪声采样 |
| `GetNodeWorldPosition / SetNodePositionSafe` | 安全节点操作封装 |
| `SimpleRaycast` | 基于 `PhysicsWorld:RaycastSingle` 的简易射线检测 |

---

## 2D API 详解

### PixelPerfectFollow

用于像素艺术游戏。把相机位置对齐到整数像素网格，彻底避免“画面在抖但角色没动”的子像素闪烁。

```lua
local follow = Cam.CreatePixelPerfectFollow(cameraNode, playerNode, 32)
follow:SetOffset(0, 0) -- 相对目标的固定偏移
follow:SetShake(sx, sy) -- 外部 ScreenShake 输出每帧注入
follow:Update(dt)
```

### SmoothFollow2D

通用 2D 平滑跟随。死区适合平台跳跃（角色在中央区域内移动时不拉镜头），前视适合高速动作游戏（相机预判角色运动方向）。

```lua
local follow = Cam.CreateSmoothFollow2D(cameraNode, playerNode)
follow:SetSmooth(0.15, math.huge)
follow:EnableDeadZone(0.3, 0.2)      -- 启用死区（占视口比例）
follow:EnableLookahead(0.3, 2.0)     -- 启用前视
camera.bounds:SetBounds(0, 0, 200, 150)
follow:Update(dt, { x = velX, y = velY })
```

### RoomLockedCamera

类空洞骑士/恶魔城的房间锁定相机。以固定宽高划分房间格子，只有玩家越过边界时才切换到下一个房间，并做平滑过渡。

```lua
local roomCam = Cam.CreateRoomLockedCamera(cameraNode, playerNode, 20, 15)
roomCam:SetTransitionTime(0.08) -- 过渡速度
roomCam:SetRoom(0, 0)           -- 初始房间索引
roomCam:Update(dt)
```

### ScreenShake2D

trauma-based 震动：调用 `AddTrauma(0.0~1.0)` 后，偏移会随时间按二次方衰减，画面冲击感比线性衰减更自然。

```lua
local shaker = Cam.CreateScreenShake2D()
shaker:SetParams(2.0, 1.0) -- 衰减速度, 最大偏移
shaker:AddTrauma(0.6)
local offset = shaker:Update(dt) -- 返回 {x,y}
```

### ParallaxLayer

让背景层根据相机位置按一定比例偏移，营造深度感。

```lua
local bg = Cam.CreateParallaxLayer(farCloudsNode, cameraNode, 0.1, 0.05)
bg:SetLockZ(true)
bg:Update(dt)
```

### CameraBounds2D

将相机中心点钳制在合法区域内，确保玩家永远不会看到地图外。

```lua
local bounds = Cam.CreateCameraBounds2D(cameraNode, 10, 7.5)
bounds:SetBounds(0, 0, 200, 150)
bounds:Clamp() -- 每帧在所有跟随逻辑之后调用
```

---

## 3D API 详解

### SmoothFollow3D

3D 平滑跟随。自动计算从相机指向目标的 Yaw/Pitch，并用 `SmoothDampAngle` 插值旋转。

```lua
local follow = Cam.CreateSmoothFollow3D(cameraNode, playerNode)
follow:SetOffset(0, 3, -8)            -- X,Y,Z 世界偏移
follow:SetSmooth(0.12, 0.1, 20.0)     -- 位置平滑, 旋转平滑, 最大移速
follow:SetShake(shakePos, shakeRot)   -- 外部 ScreenShake3D 注入
follow:Update(dt)
```

### FPSCamera

第一人称控制器。需要外部在 `MouseMove` 事件中调用 `OnMouseMove(dx, dy)`，并在 `Update` 中传入 `dt`。

```lua
local fps = Cam.CreateFPSCamera(cameraNode, 10.0, 0.1)
fps:SetInput(input) -- 注入 Urho3D Input 子系统

-- 在 MouseMove 事件处理器中
fps:OnMouseMove(dx, dy)

-- 在主循环中
fps:Update(dt)
```

### OverShoulderCamera

肩越视角（常见 TPS / ARPG）。相机位于目标后方偏右/偏左，始终朝向目标头部方向。

```lua
local shoulder = Cam.CreateOverShoulderCamera(cameraNode, playerNode)
shoulder:SetOffset(5.0, 1.8, 1.2)   -- 距离, 高度, 右肩偏移（负值为左肩）
shoulder:SetAngleOffset(15.0, 5.0)  -- 额外偏航角、俯仰角
shoulder:SetShake(shakePos, shakeRot)
shoulder:Update(dt, playerYaw)      -- playerYaw 为目标当前朝向角（度）
```

### OrbitCamera

围绕目标做轨道观测。鼠标拖拽改变 Yaw/Pitch，滚轮改变 Distance。

```lua
local orbit = Cam.CreateOrbitCamera(cameraNode, targetNode)
orbit:SetDistanceLimits(2.0, 15.0)
orbit:SetOrbitSpeed(1.0, 0.8)

-- 在 MouseMove / 滚轮事件中
orbit:OnMouseDrag(dx, dy)
orbit:OnZoom(wheelDelta)

-- 主循环
orbit:Update(dt)
```

### CollisionAvoidance

**独立于具体相机类型**的碰撞避障器。把它挂到任何 3D 相机上都能用。

核心逻辑：从 `targetPos` 向 `desiredPos` 发一条射线，若命中墙壁/地形，将相机沿射线拉回至最近安全距离。

```lua
local avoider = Cam.CreateCollisionAvoidance(scene, 0xFFFF)
local safePos = avoider:Resolve(targetPos, desiredPos)
cameraNode:SetPosition(safePos)
```

### ScreenShake3D

3D trauma-based 震动，同时输出位置偏移和旋转偏移，可直接用于 FPS / 肩越 / 轨道相机。

```lua
local shaker = Cam.CreateScreenShake3D()
shaker:SetParams(2.5, 0.3, 3.0) -- 衰减, 最大位置偏移, 最大旋转偏移(度)
shaker:AddTrauma(0.7)
local posOffset, rotOffset = shaker:Update(dt)
```

---

## 高级组合用法

### 组合 A：2D 横版像素动作游戏

推荐的更新顺序：
1. 计算 `ScreenShake2D` 偏移
2. 注入到 `PixelPerfectFollow`
3. `PixelPerfectFollow:Update`
4. `CameraBounds2D:Clamp`
5. 更新所有 `ParallaxLayer`

一键完成：
```lua
local camera = Cam.CreatePixelRPGCamera(cameraNode, playerNode, 32, 10, 7.5)
camera:SetBounds(0, 0, 320, 180)
camera:AddTrauma(0.5)
camera:Update(dt)
```

### 组合 B：3D ARPG 第三人称（肩越 + 碰撞避障 + 震动）

```lua
local tps = Cam.CreateAdvancedThirdPerson(cameraNode, playerNode, scene)
tps:SetOffset(5.5, 2.0, 1.5)
tps:SetAngleOffset(12.0, 8.0)
tps:AddTrauma(0.3)
tps:Update(dt, playerYaw)
```

### 组合 C：3D 射击游戏切换

```lua
local fps = Cam.CreateFPSCamera(cameraNode, 10.0, 0.08)
local tps = Cam.CreateOverShoulderCamera(cameraNode, playerNode)

-- 在瞄准模式切换时切 FPS，平时切 TPS
if isAiming then
    fps:SetShake(shakePos, shakeRot)
    fps:OnMouseMove(dx, dy)
    fps:Update(dt)
else
    tps:SetShake(shakePos, shakeRot)
    tps:Update(dt, playerYaw)
end
```

---

## 重要约定

1. **坐标系**：所有控制器默认 Y 轴向上（Urho3D 标准）。
2. **2D 场景**：通常把 Sprite 放在 XY 平面，相机沿 Z 轴正方向俯视。因此 `PixelPerfectFollow` 和 `SmoothFollow2D` 都保留原 Z 坐标。
3. **角度单位**：所有 API 中的角度均为**度数**（°），内部计算时自动转换为弧度。
4. **节点安全操作**：当你的运行时环境为纯表驱动（无实际 Urho3D Node 对象）时，`Utils.SetNodePositionSafe` 会静默跳过，方便单元测试。
5. **射线避障**：`SimpleRaycast` 依赖 `scene:GetComponent("PhysicsWorld")`，若场景无物理世界则自动退化为“不避障”。

---

## 设计参考

本技能中的核心算法与设计参考了以下开源实现：

- **TheComet** 的 `CameraController`（Urho3D 论坛）— FPS/自由相机双模式与速度平滑思路
- **hdunderscore** 的 `Urho3D-FPS-Controller`（GitHub）— 视觉模型与物理体分离，插值消除抖动
- **Lumak** 的 Over-the-Shoulder Camera（Urho3D 论坛）— 用 Lerp/Slerp 追逐 dummy node 的 ARPG 常用方案
- **Kiminaze / OrbitCam**（GitHub）— 轨道旋转 + 滚轮缩放的可移植设计

---

## 元数据

| 字段 | 值 |
|---|---|
| 名称 | `urhox-camera-controller` |
| 中文名 | `UrhoX 镜头控制器` |
| 版本 | `1.0.0` |
| 引擎 | `UrhoX` |
| 入口 | `scripts/main.lua` |
| 分类 | `开发工具` |
| 标签 | `camera, urhox, lua, 2d, 3d, pixel-perfect, follow, orbit` |
