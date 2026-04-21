# SKILL.md - UrhoX 项目模板

## 简介

`urhox-project-template` 是一个可直接复制使用的 UrhoX Lua 项目模板，基于 ArnisLielturks 的 Urho3D Empty Project 改写而来。它提供了新建 UrhoX 项目时所需的核心基础设施，包括配置读写、关卡/场景管理、UI 窗口栈、Mod 热加载和日志调试系统。

## 适用场景

- 新建 UrhoX Lua 项目时的起点
- 需要一套标准化的配置/关卡/UI/Mod 生命周期管理
- 希望避免从零编写重复的基础框架代码

## 如何使用

### 1. 复制本 Skill 作为新工程

将整个 `urhox-project-template` 目录复制到你的 UrhoX 项目的 `Data/Skills/`（或等价的脚本根目录）下，并重命名为你的项目名称。

```bash
cp -r urhox-project-template my-game-project
```

### 2. 修改入口文件

在 `scripts/main.lua` 中：
- 修改 `APP_NAME` 等常量
- 注册你的自定义 Level（通过 `LevelManager:RegisterLevel`）
- 注册你的自定义 UI Window（通过 `WindowManager:RegisterWindow`）
- 调整默认启动的关卡名称

### 3. 创建自定义 Level

参考 `scripts/LevelManager.lua` 中 `BaseLevel` 的用法，新建你的关卡脚本：

```lua
local MyLevel = {}
setmetatable(MyLevel, { __index = BaseLevel })

function MyLevel:Init()
    -- 初始化场景、相机、光照等
end

function MyLevel:Update(timeStep)
    -- 每帧更新逻辑
end

LevelManager:RegisterLevel("MyLevel", MyLevel)
```

### 4. 创建自定义 UI Window

参考 `scripts/UIManager.lua` 中 `BaseWindow` 的用法：

```lua
local MyWindow = {}
setmetatable(MyWindow, { __index = BaseWindow })

function MyWindow:Create()
    local overlay = self:CreateOverlay()
    -- 在 overlay 下添加 UI 元素
end

WindowManager:RegisterWindow("MyWindow", MyWindow)
```

### 5. 配置持久化

`ConfigManager` 会在启动时自动加载 `Data/Config/config.json`，退出时自动保存。你可以直接读写配置：

```lua
ConfigManager:Set("audio", "master_volume", 0.8)
local volume = ConfigManager:GetFloat("audio", "master_volume", 1.0)
```

### 6. Mod 热加载

将 Lua Mod 脚本放入 `Data/Mods/` 目录，Mod Loader 会自动发现并执行 `Start()` 函数。文件修改后会自动重载（引擎支持文件变更通知的前提下）。

## 文件结构

```
urhox-project-template/
├── game.json              -- Skill 元信息
├── SKILL.md               -- 本说明文档
└── scripts/
    ├── main.lua           -- 模板入口：初始化各子系统并启动
    ├── ConfigManager.lua  -- JSON 配置读写、键位映射持久化
    ├── LevelManager.lua   -- 关卡切换、异步加载、淡入淡出过渡
    ├── UIManager.lua      -- UI 面板栈（打开/关闭/堆叠/焦点）
    ├── ModLoader.lua      -- Lua Mod 自动发现与热重载
    └── DebugLogger.lua    -- 日志分级与调试辅助工具
```

## 核心 API 速查

### ConfigManager
- `Has(section, parameter)` - 检查配置项是否存在
- `Set(section, parameter, value)` - 设置配置值
- `Get(section, parameter, defaultValue)` - 通用读取
- `GetString/GetInt/GetBool/GetFloat/GetVector2/GetVector3(section, parameter, default)` - 类型安全读取
- `Load(fileName)` / `Save(fileName)` - 手动加载/保存 JSON 配置

### LevelManager
- `RegisterLevel(name, levelClass)` - 注册关卡类
- `ChangeLevel(name, data)` - 发起关卡切换（带淡出淡入）
- `GetCurrentLevel()` / `GetPreviousLevel()` - 获取当前/上一个关卡名
- `CreateFadeLayer()` - 创建全屏遮罩窗口

### UIManager
- `RegisterWindow(name, windowClass)` - 注册窗口类
- `OpenWindow(name, data)` - 打开窗口
- `CloseWindow(name)` - 关闭窗口
- `CloseAllWindows()` - 关闭所有窗口
- `IsWindowOpen(name)` / `IsAnyWindowOpened()` - 查询窗口状态

### ModLoader
- `SetModDirectory(path)` - 设置 Mod 扫描目录
- `ReloadMods()` - 手动重新加载所有 Mod
- `GetLoadedMods()` - 获取已加载 Mod 列表

### DebugLogger
- `DebugLogger:Info(msg)` / `Warning(msg)` / `Error(msg)` - 分级日志
- `DebugLogger:Assert(condition, msg)` - 断言并输出错误日志
- `DebugLogger:DumpTable(tbl, indent)` - 递归打印 Lua 表

## 注意事项

1. 所有 Level 和 Window 类都使用 Lua 的原型继承模式（setmetatable），请不要使用占位 TODO，所有提供的功能均已完整实现。
2. `main.lua` 必须在 UrhoX 引擎的 Lua 入口中被执行，例如通过引擎的 LuaScript 子系统执行 `Scripts/main.lua`。
3. 配置读写依赖 `json` 库，UrhoX 的 Lua 环境通常已集成兼容的 JSON 模块。
4. Mod 热加载依赖引擎的文件系统监控或手动重载事件触发。

## 许可

本模板基于原 Urho3D Empty Project 的 MIT 许可。你可以自由用于商业或非商业项目。
