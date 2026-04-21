# UrhoX 示例速查包

将 Urho3D 官方 41 个 Lua 示例中最常用的技术点，提炼成可直接复用的小型 Lua 模块。适合新手快速查阅、老手复制粘贴。

---

## 模块清单

| 模块 | 对应原版示例 | 功能简述 |
|------|-------------|----------|
| `SampleBasic` | 01_HelloWorld | 引擎初始化、场景创建、摄像机基础 |
| `Sample2D` | 24_Urho2DSprite | 2D 精灵创建、缩放、移动、动画帧 |
| `SampleAnimation` | 05_AnimatingScene | 3D 对象旋转/位移动画脚本 |
| `SampleSkeletalAnimation` | 07_SkeletalAnimation | 骨骼动画播放、混合、状态切换 |
| `SamplePhysics` | 08_Physics, 11_PhysicsStressTest | 刚体创建、碰撞事件订阅、施加冲量 |
| `SamplePhysics2D` | 32_Urho2DConstraints | 2D 刚体、约束、Box2D 碰撞回调 |
| `SampleVehicle` | 19_VehicleDemo | 简版载具控制器（轮子、悬挂、油门） |
| `SampleUI` | 23_InGameUI | 按钮、滑动条、窗口、事件绑定 |
| `SampleUtils` | 多个示例 | 辅助函数：创建摄像机、创建灯光、创建地面 |
| `SampleScene3D` | 04_StaticScene | 3D 静态场景一站式构建（Octree、地面、灯光、批量对象） |
| `SampleHelloGUI` | 02_HelloGUI | 按钮、滑动条、窗口的代码级 UI 构造 |
| `SampleSprites` | 03_Sprites | 2D 精灵批量创建、随机缩放与边界反弹动画 |
| `SampleStaticScene` | 04_StaticScene | 完整静态 3D 场景（地面、方向光、蘑菇实例、摄像机） |
| `SampleAnimatingScene` | 05_AnimatingScene | Zone 雾效 + 批量自转 Box + 摄像机点光源 |
| `SampleBillboards` | 07_Billboards | 公告板、粒子发射器与天空盒组合 |
| `SampleDecals` | 08_Decals | 射线拾取并在命中处动态添加贴花 |
| `SampleMultipleViewports` | 09_MultipleViewports | 前后双摄像机、Bloom/FXAA 后处理切换 |
| `SampleRenderToTexture` | 10_RenderToTexture | 双场景 + RTT 材质绑定 + 克隆模型顶点动画 |
| `SampleRagdolls` | 13_Ragdolls | 布娃娃系统：刚体触发器、程序化骨骼约束生成 |
| `SampleSoundEffects` | 14_SoundEffects | 音效播放、背景音乐、主音量控制 |
| `SampleNavigation` | 15_Navigation | NavigationMesh、Detour 寻路、流式加载与调试绘制 |
| `SampleWater` | 23_Water | 高度图地形、水面反射摄像机、RTT 反射纹理 |
| `SampleUrho2DParticle` | 25_Urho2DParticle | 2D 正交粒子发射器与鼠标交互控制 |
| `SampleConsoleInput` | 26_ConsoleInput | 控制台文字冒险游戏逻辑 |
| `SampleLightAnimation` | 30_LightAnimation | ValueAnimation 控制灯光颜色、位置与 UI 动画 |
| `SampleDynamicGeometry` | 34_DynamicGeometry | 运行时顶点数据修改、程序化 Model 创建 |
| `SamplePBRMaterials` | 42_PBRMaterials | PBR 场景加载 + Roughness/Metallic/Ambient 实时滑动条 |
| `SampleRibbonTrail` | 44_RibbonTrailDemo | FaceCamera 与 Bone 两种拖尾（RibbonTrail）效果 |
| `SampleInverseKinematics` | 45_InverseKinematics | IKSolver + IKEffector 实现斜坡足部自适应 |
---

## 快速开始

```lua
local Samples = require("scripts/main")

-- 按需加载某个模块
local Utils = Samples.LoadModule("SampleUtils")
local Vehicle = Samples.LoadModule("SampleVehicle")

-- 使用辅助函数创建场景基础
local scene = Utils.CreateBaseScene()
local cameraNode = Utils.CreateCamera(scene, Vector3(0, 5, -10), Vector3(0, 0, 0))
local lightNode = Utils.CreateDirectionalLight(scene, Vector3(-1, -2, -1))

-- 创建一辆载具
local carNode = Vehicle.CreateVehicle(scene, Vector3(0, 2, 0))
```

---

## 模块 API 速查

### SampleBasic
- `CreateSampleScene()` — 创建一个带摄像机和定向光的空场景
- `CreateBox(scene, position, color)` — 在场景中创建一个彩色立方体

### Sample2D
- `CreateSprite(scene, texturePath, position, size)` — 创建 2D 精灵
- `AnimateScale(spriteNode, duration, targetScale)` — 缩放动画
- `AnimatePosition(spriteNode, duration, targetPos)` — 位移动画

### SampleAnimation
- `Spin(node, axis, speed)` — 使节点持续旋转
- `PingPongMove(node, axis, distance, speed)` — 往返移动

### SampleSkeletalAnimation
- `PlayAnimation(modelNode, animName, loop)` — 播放骨骼动画
- `SetAnimationBlend(modelNode, animName, weight)` — 动画混合权重

### SamplePhysics
- `CreateRigidBodyBox(scene, position, size, mass)` — 创建物理立方体
- `ApplyImpulse(bodyNode, impulse)` — 施加冲量
- `SubscribeToCollision(bodyNode, callback)` — 碰撞事件订阅

### SamplePhysics2D
- `CreateRigidBody2DBox(scene, position, size, bodyType)` — 创建 2D 物理体
- `CreateDistanceConstraint(scene, bodyA, bodyB, anchorA, anchorB)` — 距离约束

### SampleVehicle
- `CreateVehicle(scene, position)` — 创建基础载具节点
- `SetSteering(vehicleNode, value)` — 设置方向盘值（-1 ~ 1）
- `SetAccelerator(vehicleNode, value)` — 设置油门值
- `SetBrake(vehicleNode, value)` — 设置刹车值

### SampleUI
- `CreateButton(title, x, y, width, height, callback)` — 创建按钮
- `CreateSlider(x, y, width, height, min, max, callback)` — 创建滑动条
- `ShowMessageBox(title, message)` — 弹出消息框

### SampleUtils
- `CreateBaseScene()` — 创建基础场景（摄像机+灯光+地面）
- `CreateCamera(scene, eye, lookAt, fov)` — 创建透视摄像机
- `CreateDirectionalLight(scene, direction)` — 创建定向光
- `CreateGroundPlane(scene, size)` — 创建网格地面
- `CreateSkybox(scene, materialPath)` — 创建天空盒

### SampleScene3D
- `CreateBaseScene(scene, createCamera)` — 创建基础 3D 场景
- `SpawnRandomObjects(scene, count, ...)` — 批量生成随机分布模型
- `CreateZone(scene, ambientColor, fogColor, fogStart, fogEnd)` — 创建雾效 Zone

### SampleHelloGUI
- `CreateHelloUI()` — 构建 HelloGUI 示例的按钮、滑动条与弹窗

### SampleSprites
- `CreateSpritesScene(scene, count)` — 创建 2D 精灵场景
- `UpdateSprites(timeStep)` — 更新精灵边界反弹动画

### SampleStaticScene
- `CreateStaticScene(scene, createCamera)` — 创建完整静态 3D 场景

### SampleAnimatingScene
- `CreateAnimatingScene(scene, count, createCamera)` — 创建带自转 Box 的动画场景
- `AddRotator(node, speed)` / `UpdateRotators(timeStep)` — 批量旋转控制

### SampleBillboards
- `CreateBillboardsScene(scene, createCamera)` — 创建公告板与粒子场景

### SampleDecals
- `CreateDecalsScene(scene, createCamera)` — 创建贴花示例场景
- `PaintDecal()` — 在光标位置喷涂贴花

### SampleMultipleViewports
- `CreateMultipleViewportsScene(scene, createCamera)` — 创建前后双视口场景
- `SetupViewports(scene, frontCameraNode)` — 配置视口与后处理
- `ToggleBloom()` / `ToggleFXAA()` — 切换后处理效果

### SampleRenderToTexture
- `CreateRenderToTextureScene()` — 创建 RTT 双场景与材质绑定
- `UpdateRotators(timeStep)` — 更新 RTT 子场景中的旋转器

### SampleRagdolls
- `CreateRagdollsScene(scene, createCamera)` — 创建物理布娃娃场景
- `SpawnObject(scene, spawnPos, direction)` — 发射物理球体
- `CreateRagdoll(node)` — 为指定 Jack 节点生成布娃娃约束

### SampleSoundEffects
- `CreateSoundUI(scene)` — 构建音效与音乐控制 UI

### SampleNavigation
- `CreateNavigationScene(scene, createCamera)` — 创建导航网格场景
- `SetPathPoint()` — 设置目标点或瞬移
- `AddOrRemoveObject()` — 添加/移除障碍物并重构建导航
- `FollowPath(timeStep)` — 沿路径移动 Jack
- `ToggleStreaming(enabled)` / `UpdateStreaming()` — 流式加载瓦片

### SampleWater
- `CreateWaterScene(scene, createCamera)` — 创建水面、地形与反射摄像机
- `UpdateReflectionAspect()` — 更新反射摄像机宽高比

### SampleUrho2DParticle
- `CreateUrho2DParticleScene(scene, createCamera)` — 创建 2D 粒子场景
- `HandleMouseMove(eventData)` — 鼠标移动控制粒子位置

### SampleConsoleInput
- `InitConsoleInput(scene)` — 初始化控制台音源
- `StartGame()` / `EndGame(message)` / `Advance()` — 游戏主逻辑
- `HandleInput(input)` — 处理玩家控制台输入

### SampleLightAnimation
- `CreateLightAnimationScene(scene, createCamera)` — 创建属性动画场景
- `CreateAnimatingUI()` — 构建动画文本与 UI 精灵

### SampleDynamicGeometry
- `CreateDynamicGeometryScene(scene, createCamera)` — 创建动态几何场景
- `AnimateObjects(timeStep)` — 更新克隆模型的顶点动画

### SamplePBRMaterials
- `CreatePBRScene(scene, createCamera)` — 加载 PBR 示例场景
- `CreatePBRUI()` — 构建 Roughness/Metallic/Ambient 滑动条
- `SetupPBRViewport(frontCameraNode)` — 设置 HDR 视口与后处理

### SampleRibbonTrail
- `CreateRibbonTrailScene(scene, createCamera)` — 创建 RibbonTrail 场景
- `UpdateRibbonTrailScene(timeStep)` — 更新盒子运动与剑拖尾开关

### SampleInverseKinematics
- `CreateInverseKinematicsScene(scene, createCamera)` — 创建 IK 斜坡场景
- `UpdateCameraAndFloor(timeStep, yaw, pitch)` — 更新摄像机与地板角度
- `SolveIK()` — 在 SceneDrawableUpdateFinished 中执行 IK 解算

---

## 提示

本 Skill 的所有模块均为**逻辑封装**，不是完整可运行的示例程序。你需要在自己的 `main.lua` 中组合使用。
