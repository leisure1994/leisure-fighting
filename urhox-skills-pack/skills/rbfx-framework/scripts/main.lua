--- rbfx 现代框架入口模板
-- 演示 ResourceRoot 使用、场景加载、编辑器兼容模式、调试 HUD 以及状态管理。
-- 可直接作为 UrhoX Lua 项目的 main.lua 使用。
--
-- @script
-- @module main

local ResourceRoot = require("scripts/ResourceRoot")

--- 全局场景引用
local SCENE = nil

--- 主摄像机节点
local CAMERA_NODE = nil

--- 当前 yaw / pitch
local YAW = 0.0
local PITCH = 0.0

--- 鼠标模式
local MOUSE_MODE = MM_RELATIVE

--- 是否从编辑器启动
local FROM_EDITOR = false

--- 移动速度（世界单位/秒）
local MOVE_SPEED = 20.0

--- 鼠标灵敏度（度/像素）
local MOUSE_SENSITIVITY = 0.1

--- 初始化引擎参数
-- @return table engineParameters
function GetEngineParameters()
    local params = {}
    params["WindowTitle"] = "rbfx Framework Sample"
    params["WindowWidth"] = 1280
    params["WindowHeight"] = 720
    params["FullScreen"] = false
    params["RenderPath"] = "RenderPaths/Forward.xml"

    -- 尝试加载 ResourceRoot.ini，若失败则使用默认别名
    ResourceRoot.LoadFromDisk()
    if next(ResourceRoot.ToEnginePaths()) == nil then
        ResourceRoot.InitDefaults()
    end

    -- 将解析出的路径注入引擎资源路径
    local paths = ResourceRoot.ToEnginePaths()
    local pathStr = table.concat(paths, ";")
    params["ResourcePaths"] = pathStr

    return params
end

--- 检测是否从编辑器启动
-- 通过检查 Param_SceneName 是否非空来判断
-- @return boolean
local function DetectFromEditor()
    local sceneName = engine:GetParameter("SceneName"):GetString()
    return sceneName ~= nil and sceneName ~= ""
end

--- 创建并配置主场景
-- @return Scene
local function CreateMainScene()
    local scene = Scene:new()
    scene:CreateComponent("Octree")

    -- Zone：环境光与雾效
    local zoneNode = scene:CreateChild("Zone")
    local zone = zoneNode:CreateComponent("Zone")
    zone.boundingBox = BoundingBox(-1000.0, 1000.0)
    zone.ambientColor = Color(0.1, 0.15, 0.2)
    zone.fogColor = Color(0.1, 0.2, 0.3)
    zone.fogStart = 10.0
    zone.fogEnd = 300.0

    -- 方向光
    local lightNode = scene:CreateChild("DirectionalLight")
    lightNode.direction = Vector3(0.6, -1.0, 0.8)
    local light = lightNode:CreateComponent("Light")
    light.lightType = LIGHT_DIRECTIONAL
    light.castShadows = true

    -- 地面
    local planeNode = scene:CreateChild("Plane")
    planeNode.scale = Vector3(100.0, 1.0, 100.0)
    local planeObj = planeNode:CreateComponent("StaticModel")
    planeObj.model = cache:GetResource("Model", "Models/Plane.mdl")
    planeObj.material = cache:GetResource("Material", "Materials/StoneTiled.xml")

    -- 一些随机蘑菇（静态实例化演示）
    local NUM_OBJECTS = 100
    for _ = 1, NUM_OBJECTS do
        local mushroomNode = scene:CreateChild("Mushroom")
        mushroomNode.position = Vector3(
            math.random() * 90.0 - 45.0,
            0.0,
            math.random() * 90.0 - 45.0
        )
        mushroomNode.rotation = Quaternion(0.0, math.random() * 360.0, 0.0)
        mushroomNode:SetScale(0.5 + math.random() * 2.0)
        local mushroomObj = mushroomNode:CreateComponent("StaticModel")
        mushroomObj.model = cache:GetResource("Model", "Models/Mushroom.mdl")
        mushroomObj.material = cache:GetResource("Material", "Materials/Mushroom.xml")
    end

    -- 摄像机
    CAMERA_NODE = scene:CreateChild("Camera")
    CAMERA_NODE:CreateComponent("Camera")
    CAMERA_NODE.position = Vector3(0.0, 5.0, 0.0)

    return scene
end

--- 设置视口
-- @param scene Scene
local function SetupViewport(scene)
    local renderer = cache:GetSubsystem("Renderer")
    local camera = CAMERA_NODE:GetComponent("Camera")
    local viewport = Viewport:new(scene, camera)
    renderer:SetViewport(0, viewport)
end

--- 创建调试 HUD 与控制台
local function CreateDebugHud()
    local console = engine:CreateConsole()
    local debugHud = engine:CreateDebugHud()
    local xmlFile = cache:GetResource("XMLFile", "UI/DefaultStyle.xml")
    if xmlFile ~= nil then
        console.defaultStyle = xmlFile
        console.background.opacity = 0.8
        debugHud.defaultStyle = xmlFile
    end
end

--- 创建引导文本
local function CreateInstructions()
    local text = ui.root:CreateChild("Text")
    text.text = "WASD + 鼠标移动 | F1 控制台 | F2 DebugHUD | ESC 退出或释放鼠标"
    text:SetFont(cache:GetResource("Font", "Fonts/Anonymous Pro.ttf"), 15)
    text.horizontalAlignment = HA_CENTER
    text.verticalAlignment = VA_CENTER
    text:SetPosition(0, ui.root.height / 4)
end

--- 处理摄像机移动
-- @param timeStep number
local function MoveCamera(timeStep)
    if ui.focusElement ~= nil then
        return
    end

    local mouseMove = input.mouseMove
    YAW = YAW + MOUSE_SENSITIVITY * mouseMove.x
    PITCH = PITCH + MOUSE_SENSITIVITY * mouseMove.y
    if PITCH > 90.0 then PITCH = 90.0 end
    if PITCH < -90.0 then PITCH = -90.0 end

    CAMERA_NODE.rotation = Quaternion(PITCH, YAW, 0.0)

    if input:GetKeyDown(KEY_W) then
        CAMERA_NODE:Translate(Vector3.FORWARD * MOVE_SPEED * timeStep)
    end
    if input:GetKeyDown(KEY_S) then
        CAMERA_NODE:Translate(Vector3.BACK * MOVE_SPEED * timeStep)
    end
    if input:GetKeyDown(KEY_A) then
        CAMERA_NODE:Translate(Vector3.LEFT * MOVE_SPEED * timeStep)
    end
    if input:GetKeyDown(KEY_D) then
        CAMERA_NODE:Translate(Vector3.RIGHT * MOVE_SPEED * timeStep)
    end
end

--- 键盘按下事件回调
-- @param eventType StringHash
-- @param eventData VariantMap
local function HandleKeyDown(eventType, eventData)
    local key = eventData["Key"]:GetInt()
    if key == KEY_F1 then
        local console = engine:GetConsole()
        if console ~= nil then console:Toggle() end
    elseif key == KEY_F2 then
        local debugHud = engine:GetDebugHud()
        if debugHud ~= nil then debugHud:ToggleAll() end
    elseif key == KEY_ESC then
        local console = engine:GetConsole()
        if console ~= nil and console.visible then
            console.visible = false
        else
            if GetPlatform() == "Web" or GetPlatform() == "HTML5" then
                input.mouseVisible = true
                if MOUSE_MODE ~= MM_ABSOLUTE then
                    input.mouseMode = MM_FREE
                end
            else
                engine:Exit()
            end
        end
    end
end

--- Update 事件回调
-- @param eventType StringHash
-- @param eventData VariantMap
local function HandleUpdate(eventType, eventData)
    local timeStep = eventData["TimeStep"]:GetFloat()
    MoveCamera(timeStep)
end

--- 主入口：Start
function Start()
    FROM_EDITOR = DetectFromEditor()

    -- 非 Web 平台设置鼠标模式
    if GetPlatform() ~= "Web" and GetPlatform() ~= "HTML5" then
        input.mouseMode = MOUSE_MODE
        if MOUSE_MODE == MM_FREE then
            input.mouseVisible = true
        else
            input.mouseVisible = false
        end
    else
        input.mouseVisible = true
    end

    CreateDebugHud()

    if FROM_EDITOR then
        -- 编辑器模式：尝试直接加载编辑器传入的场景，或只做最小初始化
        SCENE = scene
        if SCENE == nil then
            SCENE = CreateMainScene()
        end
        -- 编辑器已提供摄像机时保持其引用
        if CAMERA_NODE == nil then
            -- 简单查找已有 camera（示例逻辑）
            local children = SCENE:GetChildren(false)
            for i = 0, children:GetNumNodes() - 1 do
                local child = children:GetNode(i)
                if child:GetComponent("Camera") ~= nil then
                    CAMERA_NODE = child
                    break
                end
            end
        end
    else
        SCENE = CreateMainScene()
        CreateInstructions()
    end

    if CAMERA_NODE ~= nil then
        SetupViewport(SCENE)
    end

    SubscribeToEvent("Update", HandleUpdate)
    SubscribeToEvent("KeyDown", HandleKeyDown)
end

--- 停止回调（编辑器停止播放时触发）
function Stop()
    -- 清理工作
    SCENE = nil
    CAMERA_NODE = nil
end
