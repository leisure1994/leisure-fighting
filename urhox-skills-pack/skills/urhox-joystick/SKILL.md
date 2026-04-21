# urhox-joystick

## 简介

`urhox-joystick` 是一个适用于 **UrhoX** 引擎的纯 Lua 摇杆输入模块，提取自 Urho3D 官方摇杆示例并进行了跨平台封装。

本技能统一管理：
- **PC / 主机端** 的 Xbox / PS4 / 蓝牙手柄（基于 SDL GameController）
- **Android / iOS** 的触屏虚拟摇杆（Screen Joystick）
- **蓝牙手柄** 在移动端的自动识别

## 安装方式

1. 将本 Skill 复制到 UrhoX 的 `Data/Skills/` 或 TapTap 技能目录下。
2. 在主脚本中加载：

```lua
local Joystick = require("urhox-joystick/scripts/main")
```

3. 在 `Start()` 或初始化阶段调用：

```lua
local id = Joystick.CreateVirtualJoystick()
if id >= 0 then
    print("摇杆已绑定，ID=" .. id)
end
```

4. 在 `Update()` / `HandleUpdate()` 中每帧更新：

```lua
Joystick.UpdateControls(characterControls)
local leftStick = Joystick.GetJoystickAxis(0)
local isJump = Joystick.GetJoystickButton(Joystick.BUTTON_A)
```

## API 文档

### 创建与销毁

#### `CreateVirtualJoystick(xmlPath, stylePath)`
- **参数**
  - `xmlPath` (string|nil): 虚拟摇杆布局 XML 路径，默认 `"Data/UI/ScreenJoystick.xml"`
  - `stylePath` (string|nil): UI 样式路径，默认 `"Data/UI/DefaultStyle.xml"`
- **返回值** (number): 摇杆 ID，失败返回 `-1`
- **说明**: 移动端会创建屏幕摇杆；PC/主机端自动绑定第一个 GameController。

#### `RemoveVirtualJoystick(id)`
- **参数**
  - `id` (number): 要移除的摇杆 ID

#### `IsJoystickValid()`
- **返回值** (boolean): 当前是否已绑定有效摇杆

### 输入读取

#### `UpdateControls(controls)`
- **参数**
  - `controls` (Controls): Urho3D 的 Controls 对象
- **说明**: 每帧调用一次，将摇杆的按钮、轴向、方向键状态同步到 `controls`。

#### `GetJoystickAxis(axisIndex)`
- **参数**
  - `axisIndex` (number): `0`=左摇杆，`1`=右摇杆，`2`=触发器/额外轴向
- **返回值** (Vector2): 对应轴向的二维值

#### `GetJoystickButton(btnMask)`
- **参数**
  - `btnMask` (number): 按钮位掩码。请使用模块常量，如 `Joystick.BUTTON_A`
- **返回值** (boolean): 当前帧是否按下

### 可视控制

#### `SetJoystickVisible(id, visible)`
- **参数**
  - `id` (number): 摇杆 ID
  - `visible` (boolean): 是否可见
- **说明**: 仅对屏幕虚拟摇杆有效。

### 参数调整

#### `SetMinTolerance(val)` / `GetMinTolerance()`
- **参数**
  - `val` (number): 摇杆死区阈值，默认 `0.2`
- **返回值** / **无**

### 调试与枚举

#### `GetJoystickCount()`
- **返回值** (number): 系统当前检测到的摇杆总数

#### `DumpAllJoysticks()`
- **返回值** (string): 所有摇杆的调试信息汇总

#### `DumpJoystickInfo(idx, useIdx)`
- **参数**
  - `idx` (number): 索引或 ID
  - `useIdx` (boolean): `true` 表示按索引查询，否则按 ID 查询

### 事件处理（热插拔）

#### `HandleJoystickConnected(eventType, eventData)`
#### `HandleJoystickDisconnected(eventType, eventData)`
在主程序中订阅事件即可自动管理断连：

```lua
SubscribeToEvent("JoystickConnected", Joystick.HandleJoystickConnected)
SubscribeToEvent("JoystickDisconnected", Joystick.HandleJoystickDisconnected)
```

## 按钮常量

| 常量名 | 说明 |
|--------|------|
| `BUTTON_A` | A 键（底部按键，Xbox 布局） |
| `BUTTON_B` | B 键 |
| `BUTTON_X` | X 键 |
| `BUTTON_Y` | Y 键 |
| `BUTTON_BACK` | Back / Select |
| `BUTTON_GUIDE` | Guide / Home |
| `BUTTON_START` | Start / Menu |
| `BUTTON_LEFTSTICK` | 按下左摇杆（L3） |
| `BUTTON_RIGHTSTICK` | 按下右摇杆（R3） |
| `BUTTON_LEFTSHOULDER` | 左肩键（LB / L1） |
| `BUTTON_RIGHTSHOULDER` | 右肩键（RB / R1） |
| `BUTTON_DPAD_UP` | 方向键上 |
| `BUTTON_DPAD_DOWN` | 方向键下 |
| `BUTTON_DPAD_LEFT` | 方向键左 |
| `BUTTON_DPAD_RIGHT` | 方向键右 |

## 适用引擎

- **UrhoX** (基于 Urho3D 的 Lua 运行时)

## 许可证

MIT License（继承自 Urho3D 官方示例）
