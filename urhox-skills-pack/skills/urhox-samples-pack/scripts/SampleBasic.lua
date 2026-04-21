-- SampleBasic.lua
-- 基础 3D 场景搭建 + 自由视角摄像机控制
-- 对应原版示例：01_HelloWorld、04_StaticScene

local Utils = require("SampleUtils")
local M = {}

--- 快速创建一个带地面、灯光和漫游摄像机的 3D 场景
-- @param scene Scene 场景实例
-- @param groundSize number 地面尺寸（默认 100）
-- @param numObjects number 随机放置的蘑菇数量（默认 200）
-- @return Node 摄像机节点
function M.CreateBasicScene(scene, groundSize, numObjects)
    Utils.SetupOctree(scene)

    local gsize = groundSize or 100.0
    local planeNode = scene:CreateChild("Plane")
    planeNode:SetScale(Vector3(gsize, 1.0, gsize))
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    Utils.CreateDirectionalLight(scene, Vector3(0.6, -1.0, 0.8), false)

    local count = numObjects or 200
    for i = 1, count do
        local mush = scene:CreateChild("Mushroom")
        mush.position = Vector3(math.random() * 90.0 - 45.0, 0.0, math.random() * 90.0 - 45.0)
        mush.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
        mush:SetScale(0.5 + math.random() * 2.0)
        local mobj = mush:CreateComponent("StaticModel")
        mobj.model = cache:GetResource("Model", "Models/Mushroom.mdl")
        mobj.material = cache:GetResource("Material", "Materials/Mushroom.xml")
    end

    local camNode = Utils.CreateCamera(scene, Vector3(0.0, 5.0, 0.0), 1000.0)
    Utils.SetupViewport(scene, camNode)
    return camNode
end

--- 每帧更新自由视角摄像机（WASD + 鼠标）
-- @param camNode Node 摄像机节点
-- @param timeStep number 时间步长
-- @param yaw number 当前水平偏航角
-- @param pitch number 当前俯仰角
-- @return number, number 更新后的 yaw, pitch
function M.UpdateFreeLookCamera(camNode, timeStep, yaw, pitch)
    return Utils.FPSCameraMove(camNode, timeStep, yaw, pitch)
end

--- 创建屏幕中央的 "Hello World" 文本（纪念 01_HelloWorld）
-- @param text string 显示文本
-- @param color Color 文本颜色
function M.CreateHelloText(text, color)
    local hello = ui.root:CreateChild("Text")
    hello.text = text or "Hello World from Urho3D!"
    hello:SetFont(cache:GetResource("Font", "Fonts/Anonymous Pro.ttf"), 30)
    hello.color = color or Color(0.0, 1.0, 0.0)
    hello.horizontalAlignment = HA_CENTER
    hello.verticalAlignment = VA_CENTER
    return hello
end

return M
