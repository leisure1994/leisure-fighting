# urhox-lightprobe

UrhoX 光照探针系统 —— 基于 lumak-lightprobe 的球谐（SH）系数计算核心逻辑改写的纯 Lua 实现。支持从 Cubemap 生成/加载光照探针、Irradiance SH 应用、场景内探针自动混合。

## 安装

```lua
local LightProbeManager = require("urhox-lightprobe/scripts/main")
```

## 快速开始

### 从已有 Cubemap 生成探针

```lua
local lpm = LightProbeManager.Create(scene)
lpm:SetupUnitBoxGeom(cache)

local probeNode = lpm:PlaceProbe(Vector3(0, 2, 0), "Probe_01")
lpm:GenerateProbeSHFromPath(probeNode, cache, "Cubemaps/Probe01")

local coeffs = lpm:GetProbeSH(probeNode)
for i = 1, 9 do
    print(string.format("SH%d: %.4f %.4f %.4f", i - 1, coeffs[i].x, coeffs[i].y, coeffs[i].z))
end
```

### 将 SH 应用到材质

```lua
local mat = staticModel:GetMaterial()
lpm:ApplySHToMaterial(mat, coeffs, "SH")
```

### 场景内动态混合

```lua
local blended = lpm:BlendProbesAt(playerNode:GetWorldPosition())
lpm:ApplySHToMaterial(playerMat, blended, "SH")
```

### 手动捕获 Cubemap

```lua
lpm:CaptureCubemap(Vector3(0, 2, 0), 32, function(images)
    lpm:GenerateProbeSH(probeNode, images)
end)
```

## API 参考

### LightProbeManager.Create(scene)
创建管理器实例。

### SetupUnitBoxGeom(cache)
初始化内部球面采样缓存（Unit Box 离散化）。必须在计算 SH 前调用一次。

### PlaceProbe(position, name) -> Node
在场景中放置一个空的探针节点。

### LoadCubemap(cache, xmlPath) -> TextureCube
加载已有的 Cubemap XML 资源。

### LoadCubemapImages(cache, basePath) -> table
从 6 张 PNG（_PosX / _NegX …）加载为 Image 数组。

### CaptureCubemap(position, size, onComplete)
创建临时 Camera + Viewport，分 6 帧捕获场景 Cubemap，完成后回调 `onComplete(images)`。

### CalculateSH(cubeImages) -> table
对 6 张 Image 计算 9 阶 SH 系数，返回 Vector3[9]。

### GenerateProbeSH(node, cubeImages)
为指定节点计算并存储 SH 系数。

### GenerateProbeSHFromPath(node, cache, basePath)
从基础路径加载 Cubemap 图像并计算 SH。

### GetProbeSH(node) -> table
读取已存储的 SH 数据。

### ApplySHToMaterial(material, coeffs, prefix)
将 9 个 Vector3 系数以 `SH0` ~ `SH8` 的 uniform 名设置到材质参数。`prefix` 默认 `"SH"`。

### SetProbeTechnique(staticModel, techniquePath, cache)
切换对象材质 Technique 为支持探针的着色器（需外部提供 `.xml` 技法文件）。

### BlendProbesAt(position) -> table
按距离倒数权重混合最近的最多 4 个探针，返回混合后的 Vector3[9]。

### WriteSHTableImage(outputPath) -> boolean
将所有探针系数写入一张 1D PNG 纹理（RGBA，宽度为 2 的幂），供 GPU 批量查找。

### WorldPositionToColor(wpos) -> Vector4
将世界坐标编码为 Color Vector4，可用于 GI 位置图。

### GetProbeCount() -> number
### RemoveProbe(node)
### ClearProbes()
管理探针生命周期。

## SH 数据格式

| 系数 | 球谐基函数 |
|------|------------|
| SH0 | L00, Y00 = 0.282095 |
| SH1~3 | L1m, Y1-1..Y11 |
| SH4~8 | L2m, Y2-2..Y22 |

## 注意事项

1. `CaptureCubemap` 会在 6 帧内逐面渲染，期间请勿删除临时节点。
2. 着色器端需在 pixel shader 中 decode：`coeff = (tex - 0.5) * 10.0`。
3. 混合探针时默认取最近 4 个，权重为 `1/(distance+0.001)`。
