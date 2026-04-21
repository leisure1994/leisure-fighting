# rbfx-framework

基于 [rbfx](https://github.com/rbfx/rbfx)（现代 Urho3D 分支，C++17）的 Lua/UrhoX 项目框架。提取了 rbfx 示例项目中真正对 Lua 开发有用的模板与工具逻辑，让你以现代工程化的方式启动 UrhoX 项目。

---

## 功能特性

1. **资源根路径管理器** (`ResourceRoot.lua`) —— 模拟 `ResourceRoot.ini`，支持多路径查找、运行时切换、磁盘自动加载。
2. **项目组织加载器** —— 分离 `CoreData` / `Data` / `Cache`，与 rbfx 官方推荐目录结构一致。
3. **Web/CI 构建辅助** —— 在 `SKILL.md` 中内嵌了完整的构建脚本思路与部署说明。
4. **编辑器兼容入口** (`main.lua`) —— 自动检测是否从编辑器启动，支持 `Play From Here` 工作流。

---

## 快速开始

在你的 UrhoX 项目中将本技能的 `scripts` 复制到项目根目录，或直接在 `main.lua` 中 `require("scripts/ResourceRoot")`。

```lua
local ResourceRoot = require("scripts/ResourceRoot")

-- 方式 A：自动从 ResourceRoot.ini 加载
ResourceRoot.LoadFromDisk()

-- 方式 B：显式注册
ResourceRoot.Register("CoreData", "../rbfx/bin/CoreData")
ResourceRoot.Register("Data", "Project/Data")
ResourceRoot.Register("Cache", "Project/Cache")

-- 注入引擎资源路径
local paths = ResourceRoot.ToEnginePaths()
```

---

## ResourceRoot API

### `Register(alias, path)`
注册一个资源根别名。`alias` 为逻辑名，`path` 为相对于可执行文件的路径。

### `RegisterBatch(t)`
批量注册，传入 `{ CoreData="...", Data="..." }` 表。

### `Unregister(alias)` / `Clear()`
移除单个或全部别名。

### `GetRawPath(alias)` / `GetAbsolutePath(alias)`
获取原始路径或解析后的绝对路径。

### `IterRoots()`
按注册逆序迭代（后注册优先），返回 `alias, rawPath, absPath`。

### `FindResource(relPath)`
在所有已注册的资源根中查找文件，返回第一个存在的绝对路径。

### `ToEnginePaths()`
生成可直接用于 `engineParameters["ResourcePaths"]` 的路径数组。

### `LoadFromIni(text)`
从 INI 风格字符串解析配置，支持 `#` 注释、`key=value` 格式。

### `LoadFromDisk(startDir)`
按 rbfx 约定从 `startDir` 向上查找 `ResourceRoot.ini` 并加载。

---

## rbfx vs UrhoX 差异对照

| 特性 | rbfx | UrhoX (Lua) |
|------|------|-------------|
| 资源根管理 | `ResourceRoot.ini` | `ResourceRoot.lua`（本 Skill） |
| 场景编辑工作流 | 自定义 Editor + `Project.json` 插件系统 | 兼容标准 Urho3D Editor，通过 `DetectFromEditor()` 判断 |
| 脚本语言 | C# / AngelScript / Lua | Lua 为主 |
| 编译标准 | C++17 | 视引擎版本而定 |
| 部署方式 | CMake + Web / itch.io CI | 本 Skill 提供了等效的 Lua 构建辅助说明 |
| 状态管理 | `StateManager` + `MainPluginApplication` | Lua 层自行管理 `Start / Stop` |

### 移植建议

- rbfx 的 `StateManager` 重度依赖 C++ 插件生命周期，在 Lua 层建议用 `Start / Stop / HandleUpdate` 事件组合替代。
- rbfx 的 `Project.json` 配置的 `LoadedPlugins` 在纯 Lua 项目中无对应机制，建议用 `require` 加载 Lua 模块。
- rbfx 的 `SplashScreen` 异步加载场景可通过 Lua 协程 + `GetAsyncLoadProgress` 模拟。

---

## 现代工程化建议

### 目录结构

推荐按 rbfx 风格组织：

```
MyProject/
├── Project/
│   ├── Data/          # 人工维护的资源（模型、材质、场景、Lua脚本）
│   └── Cache/         # 编辑器生成的缓存（如烘焙光照）
├── scripts/           # 游戏逻辑脚本
│   ├── main.lua
│   └── ResourceRoot.lua
├── ResourceRoot.ini   # 开发期资源配置
└── game.json
```

### Web 部署流程（Lua 版）

rbfx 官方使用 CMake 的 `create_pak` + `web_link_resources` 将资源打包为 `.pak` 并嵌入 Emscripten。在 Lua/UrhoX 项目中你可以：

1. **打包资源**
   ```bash
   # 使用 Urho3D 自带的 PackageTool（或等效工具）将 Data/Cache 打包
   PackageTool Project/Data Data.pak
   PackageTool CoreData CoreData.pak
   ```

2. **部署到 Web**
   - 保证 `engineParameters["ResourcePaths"] = "Data.pak;CoreData.pak"`。
   - 在 Emscripten 构建时，通过 `--preload-file` 将 `.pak` 预加载到虚拟文件系统。

3. **CI 模板（GitHub Actions）**
   以下是一个可直接放入 `.github/workflows/deploy.yml` 的简化 Lua 版思路：

   ```yaml
   name: Deploy
   on: [push]
   jobs:
     web:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Build Emscripten
           run: |
             # 编译你的 UrhoX 可执行文件（EMS 工具链）
             emcc main.cpp -s USE_SDL=2 ... -o MyGame.html
             # 打包资源
             ./PackageTool Project/Data Data.pak
             ./PackageTool CoreData CoreData.pak
         - name: Deploy to itch.io
           uses: KikimoraGames/itch-publish@v0.0.3
           with:
             butlerApiKey: ${{ secrets.BUTLER_API_KEY }}
             gameData: ./build/
             itchUsername: YOUR_NAME
             itchGameId: YOUR_GAME
             buildChannel: web
   ```

---

## 文件说明

| 文件 | 说明 |
|------|------|
| `scripts/ResourceRoot.lua` | 资源根管理器，模拟 `ResourceRoot.ini` |
| `scripts/main.lua` | rbfx 风格项目入口，包含编辑器兼容检测、摄像机控制 |
| `game.json` | TapTap Skill 元数据 |

---

## 许可证

rbfx 采用 MIT 许可证。本 Skill 为基于其项目结构的重制与封装，保留 MIT 授权精神。
