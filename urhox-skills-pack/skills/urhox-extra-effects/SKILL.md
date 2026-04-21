# urhox-extra-effects

UrhoX 特效库 —— 基于 lumak-extra-samples 的多种效果与示例组件的 Lua 化封装。

## 安装

```lua
local FX = require("urhox-extra-effects/scripts/main")
```

## 特效清单

| 模块 | 文件 | 说明 |
|------|------|------|
| OceanEffect | `scripts/ocean_effect.lua` | FFT 海洋波浪动态水面，支持实时顶点和法线更新 |
| GeomReplicator | `scripts/geom_replicator.lua` | 大规模几何体复制 + 风力顶点动画（适用于草地/树林） |
| UIRadialGroup | `scripts/ui_radial_group.lua` | 径向单选按钮组 |
| UITabGroup | `scripts/ui_tab_group.lua` | 标签页切换容器 |
| UISpriteAnimBox | `scripts/ui_sprite_anim.lua` | 序列帧精灵动画播放器 |
| UILineComponent | `scripts/ui_line_component.lua` | 2D 折线与贝塞尔曲线绘制 |
| UIDrawTool | `scripts/ui_draw_tool.lua` | 2D 像素画板（支持拖拽绘制） |
| UINodeGraph | `scripts/ui_node_graph.lua` | 简易节点图（节点拖拽 + 端口连线） |

## 快速开始

### FFT 海洋

```lua
local FX = require("urhox-extra-effects/scripts/main")
local ocean = FX.OceanEffect.Create(context, scene, scene, "Ocean/MatOcean.xml", cache)

function Update(timeStep)
    ocean:Update(timeStep)
end
```

### 植被风力复制

```lua
local FX = require("urhox-extra-effects/scripts/main")
local rep = FX.GeomReplicator.Create(scene)

-- 使用 StaticModel 批量复制（简单方案）
local transforms = FX.GeomReplicator.GenerateVegetationTransforms(500, 90.0, 0.5, 2.5)
rep:ReplicateStaticModels(baseNode, transforms)

-- 使用 CustomGeometry 风力动画（需预加载 Lua 顶点数据）
rep:BuildFromData(vegModelData, vegMaterial)
rep:InitAnimatedVertices(positions, normals, uvs)
rep:ConfigWindVelocity({2, 3}, 100, Vector3(0.2, -0.2, 0.2), 0.4)
rep:WindAnimationEnabled(true)
```

### UI 径向按钮组

```lua
local radial = FX.UIRadialGroup.Create(uiRoot, cache)
for i = 1, 4 do
    radial:AddButton("Option " .. i)
end
radial.onToggled = function(index, checked)
    print("Selected:", index)
end
radial:SetSelected(1)
```

### UI 标签页

```lua
local tabs = FX.UITabGroup.Create(uiRoot)
local body1 = tabs:AddTab("Tab 1", IntVector2(60, 25), IntVector2(280, 150))
local body2 = tabs:AddTab("Tab 2", IntVector2(60, 25), IntVector2(280, 150))
-- 向 body1/body2 中添加子元素
tabs:SetActive(1)
```

### 序列帧动画

```lua
local anim = FX.UISpriteAnimBox.Create(uiRoot)
for i = 1, 5 do
    anim:AddFrame(cache, "Urho2D/GoldIcon/" .. i .. ".png")
end
anim:SetFPS(20)
anim:Play(true)

function Update(timeStep)
    anim:Update(timeStep)
end
```

### 2D 连线

```lua
local line = FX.UILineComponent.Create(uiRoot)
line:DrawPolyline({
    IntVector2(70, 380),
    IntVector2(150, 430),
    IntVector2(300, 400),
}, Color.BLUE, 4)

-- 贝塞尔曲线
line:DrawBezier(IntVector2(70,480), IntVector2(150,530), IntVector2(300,500), Color.RED, 4, 30)
```

### 像素画板

```lua
local tool = FX.UIDrawTool.Create(uiRoot, cache, IntVector2(500, 330))
tool:SetPosition(IntVector2(700, 365))
tool:SetBrushColor(Color(0.8, 0.95, 0.2))
tool:SetBrushSize(3)
-- 用户拖拽即可在界面上绘画
tool:Clear() -- 清空
```

### 节点图

```lua
local graph = FX.UINodeGraph.Create(uiRoot)
graph.root:SetPosition(IntVector2(50, 50))

local nodeA = graph:AddNode("Input", IntVector2(20, 20), IntVector2(120, 80))
local outA = graph:AddPort(nodeA, false, "Out", 0)

local nodeB = graph:AddNode("Output", IntVector2(200, 20), IntVector2(120, 80))
local inB = graph:AddPort(nodeB, true, "In", 0)

graph:ConnectPorts(outA, inB)
```

## 注意事项

1. `OceanEffect` 使用纯 Lua FFT，在移动设备上建议降低分辨率（默认 N=64）。
2. `GeomReplicator` 的 `ReplicateStaticModels` 是简单实例化方案，若需顶点动画请使用 `BuildFromData` + `CustomGeometry`。
3. 所有 UI 模块均基于 Urho3D 原生 UIElement（BorderImage、Button、Sprite 等），无需额外 C++ 扩展。

## 外部资源依赖

- `Ocean/MatOcean.xml` — 海洋材质（可参考 lumak-extra-samples 提供的 Technique）
- `Fonts/Anonymous Pro.ttf` — 示例字体
- `Urho2D/GoldIcon/*.png` — 序列帧示例贴图
