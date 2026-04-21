--- UrhoX 虚拟摇杆与手柄输入模块
-- 支持多端手柄（Xbox/PS4）、Android 蓝牙手柄、移动端触屏虚拟摇杆。
-- 统一封装了 Urho3D Input 子系统，提供跨平台一致的摇杆与按键读取接口。
-- @module VirtualJoystick
-- @author OpenClaw

local VirtualJoystick = {}

-- ========================================================================
-- 常量定义
-- ========================================================================

--- SDL GameController 按钮位掩码常量
local BUTTON_A             = bit.lshift(1, 0)
local BUTTON_B             = bit.lshift(1, 1)
local BUTTON_X             = bit.lshift(1, 2)
local BUTTON_Y             = bit.lshift(1, 3)
local BUTTON_BACK          = bit.lshift(1, 4)
local BUTTON_GUIDE         = bit.lshift(1, 5)
local BUTTON_START         = bit.lshift(1, 6)
local BUTTON_LEFTSTICK     = bit.lshift(1, 7)
local BUTTON_RIGHTSTICK    = bit.lshift(1, 8)
local BUTTON_LEFTSHOULDER  = bit.lshift(1, 9)
local BUTTON_RIGHTSHOULDER = bit.lshift(1, 10)
local BUTTON_DPAD_UP       = bit.lshift(1, 11)
local BUTTON_DPAD_DOWN     = bit.lshift(1, 12)
local BUTTON_DPAD_LEFT     = bit.lshift(1, 13)
local BUTTON_DPAD_RIGHT    = bit.lshift(1, 14)

--- 摇杆轴向哈希键（模拟 C++ Controls::extraData_）
local VAR_AXIS_0 = StringHash("VAR_AXIS_0")
local VAR_AXIS_1 = StringHash("VAR_AXIS_1")
local VAR_AXIS_2 = StringHash("VAR_AXIS_2")

--- 默认摇杆死区
local DEFAULT_MIN_TOLERANCE = 0.2

--- SDL HAT 方向常量（与 SDL 头文件保持一致）
local SDL_HAT_UP    = 0x01
local SDL_HAT_RIGHT = 0x02
local SDL_HAT_DOWN  = 0x04
local SDL_HAT_LEFT  = 0x08

-- ========================================================================
-- 内部状态
-- ========================================================================
local joystickID_ = -1
local minTolerance_ = DEFAULT_MIN_TOLERANCE
local axisData_ = { Vector2.ZERO, Vector2.ZERO, Vector2.ZERO }

-- ========================================================================
-- 私有辅助函数
-- ========================================================================

--- 将二维向量按最小容差裁剪，并对角线长度做归一化
-- @param vec Vector2 输入向量（会被修改）
-- @param minVal number 最小容限
local function ClampValues(vec, minVal)
    if math.abs(vec.x) < minVal then
        vec.x = 0.0
    end
    if math.abs(vec.y) < minVal then
        vec.y = 0.0
    end
    if vec:LengthSquared() > 1.0 then
        vec:Normalize()
    end
end

--- 获取当前平台名称
-- @return string 平台名称（Android / iOS / Windows / Linux / MacOS / Web 等）
local function DetectPlatform()
    if GetPlatform then
        return GetPlatform()
    end
    return "Unknown"
end

--- 获取 Input 子系统
-- @return Input Input 子系统实例
local function GetInput()
    return GetCache():GetSubsystem("Input")
end

--- 获取 ResourceCache 子系统
-- @return ResourceCache ResourceCache 子系统实例
local function GetCache()
    return cache:GetSubsystem("ResourceCache")
end

--- 获取当前绑定的 JoystickState 对象
-- @return JoystickState|nil 当前绑定的摇杆状态，未绑定则返回 nil
local function GetCurrentJoystick()
    if joystickID_ < 0 then
        return nil
    end
    local input = GetInput()
    return input:GetJoystick(joystickID_)
end

-- ========================================================================
-- 公共 API
-- ========================================================================

--- 创建或检测摇杆。
-- 在 Android / iOS 上创建屏幕虚拟摇杆；在 PC / 主机上自动绑定第一个检测到的 GameController。
-- @param xmlPath string|nil 虚拟摇杆布局 XML 路径（仅移动端使用），默认 "Data/UI/ScreenJoystick.xml"
-- @param stylePath string|nil UI 样式文件路径（仅移动端使用），默认 "Data/UI/DefaultStyle.xml"
-- @return number 摇杆 ID，若未成功创建则返回 -1
function VirtualJoystick.CreateVirtualJoystick(xmlPath, stylePath)
    local input = GetInput()
    local cache = GetCache()
    local platform = DetectPlatform()

    xmlPath = xmlPath or "Data/UI/ScreenJoystick.xml"
    stylePath = stylePath or "Data/UI/DefaultStyle.xml"

    if platform == "Android" or platform == "iOS" then
        -- 移除已有的默认屏幕摇杆（若存在）
        for i = 0, input:GetNumJoysticks() - 1 do
            local j = input:GetJoystickByIndex(i)
            if j and j.screenJoystick_ then
                input:RemoveScreenJoystick(j.joystickID_)
                break
            end
        end
        local xml = cache:GetResource("XMLFile", xmlPath)
        local style = cache:GetResource("XMLFile", stylePath)
        if xml then
            joystickID_ = input:AddScreenJoystick(xml, style)
        else
            LogWarning("ScreenJoystick XML not found: " .. tostring(xmlPath))
            joystickID_ = -1
        end
    else
        -- PC / 主机：绑定第一个 GameController
        for i = 0, input:GetNumJoysticks() - 1 do
            local j = input:GetJoystickByIndex(i)
            if j and j:IsController() then
                joystickID_ = j.joystickID_
                break
            end
        end
        if joystickID_ < 0 then
            LogWarning("No game controller detected.")
        end
    end

    return joystickID_
end

--- 移除指定 ID 的屏幕虚拟摇杆
-- @param id number 摇杆 ID
function VirtualJoystick.RemoveVirtualJoystick(id)
    if id and id >= 0 then
        GetInput():RemoveScreenJoystick(id)
        if joystickID_ == id then
            joystickID_ = -1
        end
    end
end

--- 使用当前摇杆状态更新 Controls 对象。
-- 会清空按钮位掩码，重新写入按钮、方向键以及三个轴向向量。
-- @param controls Controls 要更新的控制对象
function VirtualJoystick.UpdateControls(controls)
    if controls == nil then
        return
    end

    controls.buttons = 0
    axisData_ = { Vector2.ZERO, Vector2.ZERO, Vector2.ZERO }

    local joystick = GetCurrentJoystick()
    if joystick == nil then
        return
    end

    -- 按钮（最多 32 个）
    local numButtons = joystick:GetNumButtons()
    for i = 0, math.min(numButtons - 1, 31) do
        if joystick:GetButtonDown(i) then
            controls:Set(bit.lshift(1, i), true)
        end
    end

    -- 方向键（Hat / DPad）
    if joystick:GetNumHats() > 0 then
        local hatVal = joystick:GetHatPosition(0)
        if bit.band(hatVal, SDL_HAT_UP) ~= 0 then
            controls:Set(BUTTON_DPAD_UP, true)
        end
        if bit.band(hatVal, SDL_HAT_DOWN) ~= 0 then
            controls:Set(BUTTON_DPAD_DOWN, true)
        end
        if bit.band(hatVal, SDL_HAT_LEFT) ~= 0 then
            controls:Set(BUTTON_DPAD_LEFT, true)
        end
        if bit.band(hatVal, SDL_HAT_RIGHT) ~= 0 then
            controls:Set(BUTTON_DPAD_RIGHT, true)
        end
    end

    -- 轴向（左右摇杆 + 触发器）
    local axisHashList = { VAR_AXIS_0, VAR_AXIS_1, VAR_AXIS_2 }
    local numAxes = joystick:GetNumAxes()
    local maxPairs = math.min(math.floor(numAxes / 2), 3)
    for i = 0, maxPairs - 1 do
        local axisX = joystick:GetAxisPosition(i * 2)
        local axisY = joystick:GetAxisPosition(i * 2 + 1)
        local val = Vector2(axisX, axisY)

        -- 触发器（索引 >= 4 对应 TRIGGERLEFT）不裁剪死区
        if (i * 2) < 4 then
            ClampValues(val, minTolerance_)
        end

        axisData_[i + 1] = val
        controls.extraData[axisHashList[i + 1]] = val
    end
end

--- 获取最近一次 UpdateControls 后某个摇杆轴向的值。
-- @param axisIndex number 轴向索引：0=左摇杆，1=右摇杆，2=触发器/额外轴向
-- @return Vector2 轴向二维值
function VirtualJoystick.GetJoystickAxis(axisIndex)
    axisIndex = axisIndex or 0
    local idx = math.floor(axisIndex) + 1
    if idx >= 1 and idx <= 3 then
        return axisData_[idx]
    end
    return Vector2.ZERO
end

--- 获取最近一次 UpdateControls 后某个按钮是否按下。
-- 应配合 BUTTON_A / BUTTON_B 等常量使用。
-- @param btnMask number 按钮位掩码
-- @return boolean 是否按下
function VirtualJoystick.GetJoystickButton(btnMask)
    local joystick = GetCurrentJoystick()
    if joystick == nil or btnMask == nil then
        return false
    end

    -- 若 btnMask 对应 DPad，尝试从 Hat 读取
    if bit.band(btnMask, bit.bor(BUTTON_DPAD_UP, BUTTON_DPAD_DOWN, BUTTON_DPAD_LEFT, BUTTON_DPAD_RIGHT)) ~= 0 then
        if joystick:GetNumHats() > 0 then
            local hatVal = joystick:GetHatPosition(0)
            if btnMask == BUTTON_DPAD_UP    and bit.band(hatVal, SDL_HAT_UP) ~= 0 then return true end
            if btnMask == BUTTON_DPAD_DOWN  and bit.band(hatVal, SDL_HAT_DOWN) ~= 0 then return true end
            if btnMask == BUTTON_DPAD_LEFT  and bit.band(hatVal, SDL_HAT_LEFT) ~= 0 then return true end
            if btnMask == BUTTON_DPAD_RIGHT and bit.band(hatVal, SDL_HAT_RIGHT) ~= 0 then return true end
        end
    end

    -- 常规按钮：遍历前 32 个测试位掩码
    for i = 0, math.min(joystick:GetNumButtons() - 1, 31) do
        local mask = bit.lshift(1, i)
        if bit.band(btnMask, mask) ~= 0 then
            if joystick:GetButtonDown(i) then
                return true
            end
        end
    end
    return false
end

--- 设置屏幕虚拟摇杆是否可见（仅对屏幕摇杆有效）
-- @param id number 摇杆 ID
-- @param visible boolean 是否可见
function VirtualJoystick.SetJoystickVisible(id, visible)
    if id and id >= 0 then
        GetInput():SetScreenJoystickVisible(id, visible == true)
    end
end

--- 判断当前是否已绑定有效摇杆
-- @return boolean 是否有效
function VirtualJoystick.IsJoystickValid()
    return joystickID_ >= 0 and GetCurrentJoystick() ~= nil
end

--- 设置摇杆轴向死区（最小容差）
-- @param minVal number 最小容差值，范围建议 [0.0, 1.0]
function VirtualJoystick.SetMinTolerance(minVal)
    minTolerance_ = math.max(0.0, math.min(1.0, minVal or DEFAULT_MIN_TOLERANCE))
end

--- 获取当前摇杆轴向死区
-- @return number 最小容差值
function VirtualJoystick.GetMinTolerance()
    return minTolerance_
end

--- 获取系统检测到的摇杆总数
-- @return number 摇杆总数
function VirtualJoystick.GetJoystickCount()
    return GetInput():GetNumJoysticks()
end

--- 生成单个摇杆的调试信息字符串
-- @param idx number 索引或摇杆 ID
-- @param useIdx boolean 为 true 时按索引查询，否则按 ID 查询
-- @return string 摇杆信息字符串
function VirtualJoystick.DumpJoystickInfo(idx, useIdx)
    local input = GetInput()
    local j
    if useIdx then
        j = input:GetJoystickByIndex(idx)
    else
        j = input:GetJoystick(idx)
    end
    if j == nil then
        return "Joystick not found (idx/id=" .. tostring(idx) .. ")"
    end
    local info = string.format(
        "joystick: id=%d, name='%s', btns=%d, axes=%d, hats=%d, isctrl=%s",
        j.joystickID_,
        tostring(j.name_ or "null"),
        j:GetNumButtons(),
        j:GetNumAxes(),
        j:GetNumHats(),
        tostring(j:IsController())
    )
    return info
end

--- 生成所有摇杆的调试信息字符串
-- @return string 多行调试信息
function VirtualJoystick.DumpAllJoysticks()
    local input = GetInput()
    local count = input:GetNumJoysticks()
    local lines = { string.format("-------- num joysticks=%d --------", count) }
    for i = 0, count - 1 do
        table.insert(lines, VirtualJoystick.DumpJoystickInfo(i, true))
    end
    table.insert(lines, "---------------------------------")
    return table.concat(lines, "\n")
end

--- 处理 JoystickConnected 事件，自动重新分配未绑定的摇杆。
-- 可在主程序中直接注册：SubscribeToEvent("JoystickConnected", VirtualJoystick.HandleJoystickConnected)
-- @param eventType StringHash 事件类型
-- @param eventData VariantMap 事件数据
function VirtualJoystick.HandleJoystickConnected(eventType, eventData)
    local newID = eventData["JoystickID"]:GetInt()
    LogInfo(string.format("VirtualJoystick: JoystickConnected id=%d", newID))
    if joystickID_ < 0 then
        local input = GetInput()
        local j = input:GetJoystick(newID)
        if j and j:IsController() then
            joystickID_ = newID
        end
    end
    LogInfo(VirtualJoystick.DumpJoystickInfo(newID, false))
end

--- 处理 JoystickDisconnected 事件。
-- 可在主程序中直接注册：SubscribeToEvent("JoystickDisconnected", VirtualJoystick.HandleJoystickDisconnected)
-- @param eventType StringHash 事件类型
-- @param eventData VariantMap 事件数据
function VirtualJoystick.HandleJoystickDisconnected(eventType, eventData)
    local lostID = eventData["JoystickID"]:GetInt()
    LogInfo(string.format("VirtualJoystick: JoystickDisconnected id=%d", lostID))
    if joystickID_ == lostID then
        joystickID_ = -1
    end
end

-- ========================================================================
-- 导出常量
-- ========================================================================
VirtualJoystick.BUTTON_A = BUTTON_A
VirtualJoystick.BUTTON_B = BUTTON_B
VirtualJoystick.BUTTON_X = BUTTON_X
VirtualJoystick.BUTTON_Y = BUTTON_Y
VirtualJoystick.BUTTON_BACK = BUTTON_BACK
VirtualJoystick.BUTTON_GUIDE = BUTTON_GUIDE
VirtualJoystick.BUTTON_START = BUTTON_START
VirtualJoystick.BUTTON_LEFTSTICK = BUTTON_LEFTSTICK
VirtualJoystick.BUTTON_RIGHTSTICK = BUTTON_RIGHTSTICK
VirtualJoystick.BUTTON_LEFTSHOULDER = BUTTON_LEFTSHOULDER
VirtualJoystick.BUTTON_RIGHTSHOULDER = BUTTON_RIGHTSHOULDER
VirtualJoystick.BUTTON_DPAD_UP = BUTTON_DPAD_UP
VirtualJoystick.BUTTON_DPAD_DOWN = BUTTON_DPAD_DOWN
VirtualJoystick.BUTTON_DPAD_LEFT = BUTTON_DPAD_LEFT
VirtualJoystick.BUTTON_DPAD_RIGHT = BUTTON_DPAD_RIGHT

VirtualJoystick.VAR_AXIS_0 = VAR_AXIS_0
VirtualJoystick.VAR_AXIS_1 = VAR_AXIS_1
VirtualJoystick.VAR_AXIS_2 = VAR_AXIS_2

return VirtualJoystick
