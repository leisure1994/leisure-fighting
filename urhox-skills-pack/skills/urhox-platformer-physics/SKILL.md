# urhox-platformer-physics

## 简介

`urhox-platformer-physics` 是一个适用于 **UrhoX** 引擎的纯 Lua 平台物理模块，将原 C++ 实现的 `KinematicCharacterController`（lumak-kcc）核心算法翻译为 Lua，基于 UrhoX 原生的 `RigidBody + CollisionShape` 实现。

本模块包含两部分：
1. **`KinematicCharacterController`**：运动学角色控制器，具备重力、斜坡移动、跳跃（含 coyote time / 跳跃缓冲）、移动平台吸附、SphereCast+Raycast 地面检测、碰撞反馈等完整功能。
2. **`MovingPlatform`**：往复移动平台（电梯），支持自动往返、首尾缓停，并可通过变量标记让 KCC 自动吸附。

## 安装方式

1. 将本 Skill 复制到 UrhoX 的 `Data/Skills/` 或 TapTap 技能目录下。
2. 在主脚本中加载：

```lua
local Physics = require("urhox-platformer-physics/scripts/main")
```

3. 创建角色节点并确保节点上已挂载 `RigidBody` 与 `CollisionShape`（如胶囊体）。
4. 初始化控制器：

```lua
local kcc = Physics.KinematicCharacterController.New(characterNode)
kcc:SetCollisionLayerAndMask(1, 0xFFFF)
kcc:SetJumpForce(8.0)
kcc:SetMaxSlope(45.0)
```

5. 在 `FixedUpdate` 与 `FixedPostUpdate` 中调用：

```lua
function HandleFixedUpdate(eventType, eventData)
    local timeStep = eventData["TimeStep"]:GetFloat()
    kcc:SetWalkDirection(moveDir)
    if jumpPressed then
        kcc:RequestJump()
    end
    kcc:FixedUpdate(timeStep)
end

function HandleFixedPostUpdate(eventType, eventData)
    local timeStep = eventData["TimeStep"]:GetFloat()
    kcc:FixedPostUpdate(timeStep)
end
```

## API 文档：KinematicCharacterController

### 构造与初始化

#### `KinematicCharacterController.New(node)`
- **参数**
  - `node` (Node): 角色节点，必须已挂载 `RigidBody`
- **返回值** (table): 控制器实例

### 碰撞层与属性

#### `SetCollisionLayer(layer)` / `SetCollisionMask(mask)` / `SetCollisionLayerAndMask(layer, mask)`
- 分别设置刚体的碰撞层、掩码或同时设置两者。

#### `SetGravity(gravity)` / `GetGravity()`
- 设置 / 获取重力向量。默认 `(0, -14, 0)`。

#### `SetLinearDamping(damping)` / `GetLinearDamping()`
- 线性阻尼。

#### `SetAngularDamping(damping)` / `GetAngularDamping()`
- 角阻尼（默认也会锁定角色角因子）。

#### `SetMaxSlope(slopeDegree)` / `GetMaxSlope()`
- 最大可行走斜坡角度（度）。超过该角度将视为空中状态。

#### `SetJumpForce(force)` / `GetJumpForce()`
- 向上的跳跃冲量力。

#### `SetCoyoteTime(t)`
- 设置 coyote time（秒）。角色离开地面后的可跳跃缓冲窗口。

#### `SetJumpBufferTime(t)`
- 设置跳跃按键缓冲（秒）。按下跳跃后若未落地，落地瞬间自动触发跳跃。

### 移动与跳跃

#### `SetWalkDirection(dir)`
- **参数**
  - `dir` (Vector3): 行走方向向量（通常已归一化并旋转到角色朝向后的方向）
- **说明**: 控制器内部会按地面法线投影、斜坡约束、空中衰减等规则自动施加冲量。

#### `RequestJump()`
- 请求跳跃。支持 jump buffer，若尚未落地会在落地瞬间自动跳。

#### `Jump()`
- 立即跳跃（不经过 buffer，仅当 `CanJump()` 为 true 时生效）。

#### `CanJump()` / `IsOnGround()` / `IsSoftGrounded()`
- `CanJump`: 当前是否满足跳跃条件（含 coyote time）。
- `IsOnGround`: 严格的射线/球体探测结果。
- `IsSoftGrounded`: 包含 coyote time 的宽松地面判定。

#### `Warp(position)`
- 瞬移到指定世界坐标，并重置速度。

### 速度与位置

#### `GetLinearVelocity()` / `SetLinearVelocity(velocity)`
- 获取 / 设置刚体线速度。

### 碰撞与平台

#### `OnCollision(eventType, eventData)`
- **说明**: 模块在 `Init()` 时已自动订阅 `NodeCollision`。
- 该函数会读取碰撞接触点辅助判断地面，并检测带有 `IsMovingPlatform=true` 变量的 Trigger 体积，以实现平台吸附。

#### `FixedUpdate(timeStep)`
- **说明**: 必须在 FixedUpdate 阶段每帧调用，执行重力、地面探测、斜坡约束、跳跃、行走、制动、下落限速。

#### `FixedPostUpdate(timeStep)`
- **说明**: 必须在 FixedPostUpdate 阶段每帧调用，处理移动平台 delta transform 吸附与状态移位。

---

## API 文档：MovingPlatform

### 构造

#### `MovingPlatform.New(node)`
- **参数**
  - `node` (Node): 平台节点（建议挂载 Kinematic 或 RigidBody）
- **返回值** (table): 平台实例

### 初始化

#### `Initialize(finishPosition, startImmediately)`
- **参数**
  - `finishPosition` (Vector3): 终点世界坐标
  - `startImmediately` (boolean): 是否立即运行，默认 true
- **说明**: 会自动记录当前位置为起点。

#### `SetPlatformSpeed(speed)`
- 设置最大移动速度。

#### `SetRunning(running)`
- 暂停或继续平台移动。

#### `FixedUpdate(timeStep)`
- 在 FixedUpdate 中调用，自动在起点—终点间往返，并在接近端点时自动减速。

---

## 移动平台吸附使用示例

1. 创建平台节点并添加 `RigidBody`（设为 Kinematic 或仅做碰撞体）与 `CollisionShape`。
2. 再创建一个子节点作为 Trigger 体积（如 Box CollisionShape），挂载脚本或手动设置变量：

```lua
platformTriggerNode:SetVar(StringHash("IsMovingPlatform"), Variant(true))
```

3. 角色在进入该 Trigger 体积后，`KinematicCharacterController` 会自动记录并在 `FixedPostUpdate` 中跟随平台移动。

## 适用引擎

- **UrhoX**（基于 Urho3D 的 Lua 运行时）

## 许可证

MIT License（继承自 lumak-kcc 与 Urho3D 官方示例）
