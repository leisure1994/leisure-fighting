--- Urho3D 官方示例通用工具模块
-- 提取自 Scripts/Utilities/Sample.as，提供 Logo、DebugHud、控制台、鼠标模式、基础相机控制等通用能力。
--
-- @module SampleUtils

local M = {}

--- 触摸灵敏度
M.TOUCH_SENSITIVITY = 2.0

--- 当前鼠标模式
local USE_MOUSE_MODE = MM_ABSOLUTE

--- 是否启用了触摸
local TOUCH_ENABLED = false

--- Logo 精灵引用
local LOGO_SPRITE = nil

--- 屏幕摇杆索引
local SCREEN_JOYSTICK_INDEX = M_MAX_UNSIGNED

--- 设置窗口标题与图标
-- @param title string 窗口标题
-- @param iconPath string 图标资源路径，可选
function M.SetWindowTitleAndIcon(title, iconPath)
    local graphics = cache:GetSubsystem("Graphics")
    if graphics == nil then return end
    graphics.windowTitle = title or "UrhoX Sample"
    if iconPath ~= nil then
        local icon = cache:GetResource("Image", iconPath)
        if icon ~= nil then
            graphics.windowIcon = icon
        end
    end
end

--- 创建 Urho3D Logo（右上角）
-- @param texturePath string Logo 纹理路径，默认 "Textures/FishBoneLogo.png"
function M.CreateLogo(texturePath)
    texturePath = texturePath or "Textures/FishBoneLogo.png"
    local tex = cache:GetResource("Texture2D", texturePath)
    if tex == nil then return end
    LOGO_SPRITE = ui.root:CreateChild("Sprite")
    LOGO_SPRITE.texture = tex
    local scale = 256.0 / tex.width
    LOGO_SPRITE:SetScale(scale)
    LOGO_SPRITE:SetSize(tex.width, tex.height)
    LOGO_SPRITE:SetHotSpot(tex.width, tex.height)
    LOGO_SPRITE:SetAlignment(HA_RIGHT, VA_BOTTOM)
    LOGO_SPRITE.opacity = 0.9
    LOGO_SPRITE.priority = -100
end

--- 显示/隐藏 Logo
-- @param enable boolean
function M.SetLogoVisible(enable)
    if LOGO_SPRITE ~= nil then
        LOGO_SPRITE.visible = enable
    end
end

--- 创建控制台与 DebugHud
function M.CreateConsoleAndDebugHud()
    local style = cache:GetResource("XMLFile", "UI/DefaultStyle.xml")
    if style == nil then return end
    local console = engine:CreateConsole()
    console.defaultStyle = style
    console.background.opacity = 0.8
    local debugHud = engine:CreateDebugHud()
    debugHud.defaultStyle = style
end

--- 初始化触摸输入（移动端屏幕摇杆）
-- @param patchInstructions string|nil 用于修补摇杆布局的 XML patch 字符串
function M.InitTouchInput(patchInstructions)
    TOUCH_ENABLED = true
    local layout = cache:GetResource("XMLFile", "UI/ScreenJoystick_Samples.xml")
    if layout == nil then return end
    if patchInstructions ~= nil and patchInstructions ~= "" then
        local patchFile = XMLFile:new()
        if patchFile:FromString(patchInstructions) then
            layout:Patch(patchFile)
        end
    end
    SCREEN_JOYSTICK_INDEX = input:AddScreenJoystick(layout, cache:GetResource("XMLFile", "UI/DefaultStyle.xml"))
    input:SetScreenJoystickVisible(0, true)
end

--- 初始化鼠标模式
-- @param mode MouseMode
function M.SampleInitMouseMode(mode)
    USE_MOUSE_MODE = mode
    local platform = GetPlatform()
    if platform ~= "Web" and platform ~= "HTML5" then
        if USE_MOUSE_MODE == MM_FREE then
            input.mouseVisible = true
        end
        if USE_MOUSE_MODE ~= MM_ABSOLUTE then
            input.mouseMode = USE_MOUSE_MODE
            local console = engine:GetConsole()
            if console ~= nil and console.visible then
                input:SetMouseMode(MM_ABSOLUTE, true)
            end
        end
    else
        input.mouseVisible = true
    end
end

--- 通用的 KeyDown 处理器（F1 控制台、F2 DebugHud、ESC 退出）
-- @param eventType StringHash
-- @param eventData VariantMap
function M.HandleKeyDown(eventType, eventData)
    local key = eventData["Key"]:GetInt()
    if key == KEY_F1 then
        local c = engine:GetConsole()
        if c ~= nil then c:Toggle() end
    elseif key == KEY_F2 then
        local d = engine:GetDebugHud()
        if d ~= nil then d:ToggleAll() end
    elseif key == KEY_ESC then
        local c = engine:GetConsole()
        if c ~= nil and c.visible then
            c.visible = false
        else
            local platform = GetPlatform()
            if platform == "Web" or platform == "HTML5" then
                input.mouseVisible = true
                if USE_MOUSE_MODE ~= MM_ABSOLUTE then
                    input.mouseMode = MM_FREE
                end
            else
                engine:Exit()
            end
        end
    end
end

--- 通用触摸检测回调（桌面平台连接摇杆后禁用触摸检测）
-- @param eventType StringHash
-- @param eventData VariantMap
function M.HandleTouchBegin(eventType, eventData)
    if input.numJoysticks == 0 then
        M.InitTouchInput()
    end
end

--- 执行官方示例风格的通用启动流程
-- @param opts table|nil 可选参数 { patchInstructions=string, title=string }
function M.SampleStart(opts)
    opts = opts or {}
    local platform = GetPlatform()
    if platform == "Android" or platform == "iOS" or input.touchEmulation then
        M.InitTouchInput(opts.patchInstructions)
    elseif input.numJoysticks == 0 then
        SubscribeToEvent("TouchBegin", M.HandleTouchBegin)
    end
    M.CreateLogo()
    M.SetWindowTitleAndIcon(opts.title or "UrhoX Sample", "Textures/UrhoIcon.png")
    M.CreateConsoleAndDebugHud()
    SubscribeToEvent("KeyDown", M.HandleKeyDown)
end

--- 创建 FPS 风格自由相机移动控制器
-- 需要外部维护 cameraNode、yaw、pitch 三个变量
-- @param cameraNode Node 摄像机节点
-- @param yaw number 当前偏航角（引用更新由调用者自行赋值）
-- @param pitch number 当前俯仰角（同上）
-- @param timeStep number 帧时间
-- @param moveSpeed number 移动速度，默认 20.0
-- @param mouseSensitivity number 鼠标灵敏度，默认 0.1
-- @return number, number 新的 yaw, pitch
function M.MoveCameraFreelook(cameraNode, yaw, pitch, timeStep, moveSpeed, mouseSensitivity)
    moveSpeed = moveSpeed or 20.0
    mouseSensitivity = mouseSensitivity or 0.1
    if ui.focusElement ~= nil then
        return yaw, pitch
    end
    local mouseMove = input.mouseMove
    yaw = yaw + mouseSensitivity * mouseMove.x
    pitch = pitch + mouseSensitivity * mouseMove.y
    if pitch > 90.0 then pitch = 90.0 end
    if pitch < -90.0 then pitch = -90.0 end
    cameraNode.rotation = Quaternion(pitch, yaw, 0.0)
    if input:GetKeyDown(KEY_W) then cameraNode:Translate(Vector3.FORWARD * moveSpeed * timeStep) end
    if input:GetKeyDown(KEY_S) then cameraNode:Translate(Vector3.BACK * moveSpeed * timeStep) end
    if input:GetKeyDown(KEY_A) then cameraNode:Translate(Vector3.LEFT * moveSpeed * timeStep) end
    if input:GetKeyDown(KEY_D) then cameraNode:Translate(Vector3.RIGHT * moveSpeed * timeStep) end
    return yaw, pitch
end

--- 创建场景视口
-- @param scene Scene
-- @param cameraNode Node 包含 Camera 组件的节点
function M.SetupViewport(scene, cameraNode)
    local renderer = cache:GetSubsystem("Renderer")
    local camera = cameraNode:GetComponent("Camera")
    if camera == nil or renderer == nil then return end
    local viewport = Viewport:new(scene, camera)
    renderer:SetViewport(0, viewport)
end

--- 检查当前是否处于触摸平台
-- @return boolean
function M.IsTouchEnabled()
    return TOUCH_ENABLED
end

return M
