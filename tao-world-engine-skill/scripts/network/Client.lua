-- Client.lua
-- 天道引擎 · 客户端表现层（重度扩展版）
-- 职责：接收服务端推衍结果，渲染气泡/叙事/UI，管理玩家 Key 输入，维护调试面板、
--       虚拟键盘、NPC 3D 投影、区域发现动画、世界状态 Diff 动画、聊天日志、成就弹窗

ClientTao = ClientTao or {}

-- ═══════════════════════════════════════════════════════════════════════════
-- 常量定义
-- ═══════════════════════════════════════════════════════════════════════════

local MAX_NPC_BUBBLES = 8
local NARRATIVE_FADE_IN_DURATION = 0.3
local NARRATIVE_FADE_OUT_DURATION = 0.5
local BUBBLE_MAX_DISTANCE = 80.0
local BUBBLE_FADE_START = 40.0
local MAP_MARKER_FADE_SPEED = 2.0
local DISCOVERY_PARTICLE_COUNT = 24
local DISCOVERY_ANIMATION_DURATION = 2.5
local DIFF_ANIMATION_DURATION = 0.6
local DEBUG_GRAPH_SAMPLE_COUNT = 120
local CHAT_LOG_MAX_ENTRIES = 200
local ACHIEVEMENT_POPUP_DURATION = 4.0
local LEADERBOARD_POPUP_DURATION = 5.0
local KEYBOARD_LAYOUT_ROWS = { "1234567890", "qwertyuiop", "asdfghjkl", "zxcvbnm" }
local WS_UPDATE_RATE = 0.1

-- ═══════════════════════════════════════════════════════════════════════════
-- 内部状态初始化
-- ═══════════════════════════════════════════════════════════════════════════

--- 获取当前时间（优先 GetSystemTime，否则 os.clock）
local function NOW()
    if _G.GetSystemTime then
        return GetSystemTime()
    end
    return os.clock()
end

--- 叙事队列，含优先级、淡入淡出、覆盖逻辑
ClientTao.narrativeQueue = ClientTao.narrativeQueue or {}

--- 当前正在显示的叙事条目
ClientTao.currentNarrative = ClientTao.currentNarrative or nil

--- NPC 气泡池：npcId -> bubbleData
ClientTao.npcBubbles = ClientTao.npcBubbles or {}

--- 世界地图上的区域标记：regionId -> { x, z, discoveredAt, opacity }
ClientTao.mapMarkers = ClientTao.mapMarkers or {}

--- 世界状态缓存
ClientTao.worldState = ClientTao.worldState or {}

--- UI 根节点引用（由外部 UI 系统注入）
ClientTao.uiRoot = nil

--- UI 数据层：叙事面板
ClientTao.narrativePanel = ClientTao.narrativePanel or {
    visible = false,
    text = "",
    style = "normal",
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 2.0,
    position = { x = 0, y = 0 },
    size = { w = 800, h = 120 },
    bgColor = { r = 0.05, g = 0.05, b = 0.08, a = 0.85 },
    textColor = { r = 0.92, g = 0.92, b = 0.88, a = 1.0 },
    borderColor = { r = 0.4, g = 0.35, b = 0.25, a = 0.9 },
    borderWidth = 2,
    cornerRadius = 8,
    fontSize = 18,
    lineHeight = 26,
    shadowOffset = { x = 4, y = 4 },
    shadowBlur = 12,
    align = "left",
    padding = { left = 20, right = 20, top = 16, bottom = 16 },
}

--- UI 数据层：任务面板
ClientTao.questPanel = ClientTao.questPanel or {
    visible = false,
    quests = {},
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 3.0,
    dirty = false,
    bgColor = { r = 0.06, g = 0.07, b = 0.1, a = 0.9 },
    textColor = { r = 0.9, g = 0.9, b = 0.85, a = 1.0 },
    highlightColor = { r = 0.9, g = 0.75, b = 0.35, a = 1.0 },
    fontSizeTitle = 16,
    fontSizeDesc = 13,
    lineHeight = 22,
    rowHeight = 48,
    position = { x = 0, y = 0 },
    size = { w = 320, h = 240 },
    scrollOffset = 0,
    maxScroll = 0,
}

--- UI 数据层：交易面板
ClientTao.tradePanel = ClientTao.tradePanel or {
    visible = false,
    npcName = "",
    items = {},
    selectedIndex = 0,
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 4.0,
    bgColor = { r = 0.08, g = 0.08, b = 0.06, a = 0.92 },
    headerColor = { r = 0.6, g = 0.5, b = 0.25, a = 1.0 },
    textColor = { r = 0.9, g = 0.9, b = 0.85, a = 1.0 },
    goldColor = { r = 1.0, g = 0.84, b = 0.0, a = 1.0 },
    position = { x = 0, y = 0 },
    size = { w = 400, h = 300 },
    headerHeight = 36,
    rowHeight = 40,
    fontSize = 14,
    cornerRadius = 6,
}

--- UI 数据层：队伍面板
ClientTao.partyPanel = ClientTao.partyPanel or {
    visible = false,
    members = {},
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 3.0,
    bgColor = { r = 0.04, g = 0.06, b = 0.1, a = 0.85 },
    textColor = { r = 0.9, g = 0.9, b = 0.85, a = 1.0 },
    hpColor = { r = 0.85, g = 0.2, b = 0.15, a = 1.0 },
    mpColor = { r = 0.15, g = 0.4, b = 0.85, a = 1.0 },
    offlineColor = { r = 0.5, g = 0.5, b = 0.5, a = 0.7 },
    position = { x = 0, y = 0 },
    size = { w = 220, h = 160 },
    rowHeight = 36,
    barHeight = 6,
    fontSize = 12,
    avatarSize = 24,
}

--- UI 数据层：地图覆盖层
ClientTao.mapOverlay = ClientTao.mapOverlay or {
    visible = false,
    regions = {},
    playerPos = { x = 0, z = 0 },
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 2.0,
    unfoldProgress = 0.0,
    unfoldTarget = 0.0,
    bgColor = { r = 0.02, g = 0.04, b = 0.06, a = 0.9 },
    landColor = { r = 0.12, g = 0.18, b = 0.12, a = 1.0 },
    waterColor = { r = 0.08, g = 0.14, b = 0.22, a = 1.0 },
    borderColor = { r = 0.5, g = 0.4, b = 0.2, a = 0.8 },
    playerColor = { r = 1.0, g = 0.2, b = 0.2, a = 1.0 },
    fogColor = { r = 0.0, g = 0.0, b = 0.0, a = 0.6 },
    position = { x = 0, y = 0 },
    size = { w = 600, h = 600 },
    mapScale = 0.5,
}

--- API Key 输入界面状态（含安全虚拟键盘）
ClientTao.apiKeyInput = ClientTao.apiKeyInput or {
    visible = false,
    provider = "auto",
    textBuffer = "",
    isEncrypted = false,
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 5.0,
    bgColor = { r = 0.05, g = 0.05, b = 0.07, a = 0.95 },
    textColor = { r = 0.9, g = 0.9, b = 0.9, a = 1.0 },
    cursorBlink = 0,
    cursorVisible = true,
    position = { x = 0, y = 0 },
    size = { w = 560, h = 320 },
    inputBoxHeight = 40,
    fontSize = 16,
}

--- 虚拟键盘状态
ClientTao.virtualKeyboard = ClientTao.virtualKeyboard or {
    visible = false,
    shift = false,
    layout = {},
    keySize = 32,
    keyGap = 4,
    position = { x = 0, y = 0 },
    size = { w = 480, h = 180 },
    hoverKey = nil,
    pressedKey = nil,
    pressedAt = 0,
    bgColor = { r = 0.1, g = 0.1, b = 0.12, a = 0.95 },
    keyColor = { r = 0.2, g = 0.22, b = 0.25, a = 1.0 },
    keyHighlight = { r = 0.4, g = 0.5, b = 0.6, a = 1.0 },
    textColor = { r = 0.95, g = 0.95, b = 0.95, a = 1.0 },
}

--- 调试面板数据
ClientTao.debugPanel = ClientTao.debugPanel or {
    visible = false,
    connectionStatus = "disconnected",
    providerHealth = {},
    npcAgentCount = 0,
    streamCount = 0,
    lastUpdateTime = 0,
    lines = {},
    panels = {
        network = { open = true, title = "网络" },
        provider = { open = true, title = "Provider" },
        npc = { open = false, title = "NPC" },
        perf = { open = false, title = "性能" },
        gm = { open = true, title = "GM 指令" },
    },
    graphData = {
        latency = {},
        fps = {},
        memory = {},
    },
    gmCommandBuffer = "",
    gmCommandHistory = {},
    gmHistoryIndex = 0,
    scrollOffset = 0,
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 6.0,
    position = { x = 20, y = 20 },
    size = { w = 500, h = 700 },
    headerHeight = 28,
    rowHeight = 20,
    fontSize = 12,
    cornerRadius = 4,
    bgColor = { r = 0.08, g = 0.08, b = 0.1, a = 0.9 },
    textColor = { r = 0.85, g = 0.85, b = 0.85, a = 1.0 },
    accentColor = { r = 0.3, g = 0.7, b = 1.0, a = 1.0 },
}

--- 聊天日志
ClientTao.chatLog = ClientTao.chatLog or {
    entries = {},
    visible = true,
    opacity = 1.0,
    maxEntries = CHAT_LOG_MAX_ENTRIES,
    scrollOffset = 0,
    position = { x = 20, y = 400 },
    size = { w = 480, h = 240 },
    fontSize = 12,
    lineHeight = 18,
    bgColor = { r = 0.0, g = 0.0, b = 0.0, a = 0.4 },
    textColor = { r = 0.9, g = 0.9, b = 0.9, a = 1.0 },
}

--- 历史对话回溯
ClientTao.dialogHistory = ClientTao.dialogHistory or {
    byNpc = {},
    maxTurnsPerNpc = 50,
}

--- 成就弹窗状态
ClientTao.achievementPopup = ClientTao.achievementPopup or {
    visible = false,
    title = "",
    desc = "",
    icon = "",
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 4.0,
    displayTime = 0.0,
    position = { x = 0, y = 0 },
    size = { w = 360, h = 90 },
    bgColor = { r = 0.1, g = 0.08, b = 0.05, a = 0.95 },
    goldAccent = { r = 1.0, g = 0.8, b = 0.2, a = 1.0 },
}

--- 排行榜弹窗状态
ClientTao.leaderboardPopup = ClientTao.leaderboardPopup or {
    visible = false,
    title = "",
    entries = {},
    opacity = 0.0,
    targetOpacity = 0.0,
    fadeSpeed = 3.0,
    displayTime = 0.0,
    position = { x = 0, y = 0 },
    size = { w = 400, h = 500 },
    rowHeight = 32,
    bgColor = { r = 0.06, g = 0.06, b = 0.1, a = 0.95 },
    headerColor = { r = 0.3, g = 0.25, b = 0.6, a = 1.0 },
}

--- 区域发现动画管线状态
ClientTao.discoveryAnimation = ClientTao.discoveryAnimation or {
    active = false,
    regionName = "",
    regionDesc = "",
    particles = {},
    cameraMoved = false,
    mapUnfolded = false,
    soundPlayed = false,
    elapsed = 0.0,
    duration = DISCOVERY_ANIMATION_DURATION,
    screenCenter = { x = 0, y = 0 },
}

--- 世界状态增量 Diff 动画队列
ClientTao.diffAnimations = ClientTao.diffAnimations or {}

--- 调试实时曲线图数据准备
ClientTao.debugGraphData = ClientTao.debugGraphData or {
    latencySeries = {},
    fpsSeries = {},
    memorySeries = {},
}

-- ═══════════════════════════════════════════════════════════════════════════
-- 初始化与事件订阅
-- ═══════════════════════════════════════════════════════════════════════════

--- 初始化客户端天道系统，注册所有远程事件监听
function ClientTao.Init()
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_TAO_NARRATIVE, ClientTao.HandleTaoNarrative)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_NPC_ACTION_BUBBLE, ClientTao.HandleNpcActionBubble)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_ACCEPTED, ClientTao.HandleApiKeyAccepted)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_API_KEY_REJECTED, ClientTao.HandleApiKeyRejected)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_ACCEPTED, ClientTao.HandleProviderKeyAccepted)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_PROVIDER_KEY_REJECTED, ClientTao.HandleProviderKeyRejected)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_REGION_DISCOVERY, ClientTao.HandleRegionDiscovery)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_WORLD_STATE_UPDATE, ClientTao.HandleWorldStateUpdate)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_WORLD_STATE_DELTA, ClientTao.HandleWorldStateDelta)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_NPC_STRATEGY_RESULT, ClientTao.HandleNpcStrategyResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_NPC_EMOTION_UPDATE, ClientTao.HandleNpcEmotionUpdate)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_SYSTEM_MESSAGE, ClientTao.HandleSystemMessage)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_STREAM_CHUNK, ClientTao.HandleStreamChunk)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_STREAM_DONE, ClientTao.HandleStreamDone)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_DEBUG_RESPONSE, ClientTao.HandleDebugResponse)

    -- 新增子系统事件监听
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_GUILD_RESULT, ClientTao.HandleGuildResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_GUILD_BROADCAST, ClientTao.HandleGuildBroadcast)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_RESULT, ClientTao.HandleAuctionResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_AUCTION_BID_NOTIFY, ClientTao.HandleAuctionBidNotify)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_DUNGEON_RESULT, ClientTao.HandleDungeonResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_MAIL_RESULT, ClientTao.HandleMailResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_MAIL_NOTIFY, ClientTao.HandleMailNotify)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_LEADERBOARD_RESULT, ClientTao.HandleLeaderboardResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_ACHIEVEMENT_RESULT, ClientTao.HandleAchievementResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_GM_RESULT, ClientTao.HandleGMResult)
    SubscribeToEvent(TAO_REMOTE_EVENTS.S2C_SERVER_ANNOUNCEMENT, ClientTao.HandleServerAnnouncement)

    ClientTao.BuildVirtualKeyboardLayout()
    print("[ClientTao] 人道层初始化完成")
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 虚拟键盘
-- ═══════════════════════════════════════════════════════════════════════════

--- 构建虚拟键盘的按键布局表
function ClientTao.BuildVirtualKeyboardLayout()
    local kb = ClientTao.virtualKeyboard
    kb.layout = {}
    local startX = kb.position.x + 12
    local startY = kb.position.y + 12
    for rowIndex, rowStr in ipairs(KEYBOARD_LAYOUT_ROWS) do
        local row = {}
        local x = startX + ((4 - rowIndex) * (kb.keySize + kb.keyGap) * 0.5)
        local y = startY + (rowIndex - 1) * (kb.keySize + kb.keyGap)
        for i = 1, #rowStr do
            local ch = rowStr:sub(i, i)
            table.insert(row, {
                char = ch,
                x = x,
                y = y,
                w = kb.keySize,
                h = kb.keySize,
            })
            x = x + kb.keySize + kb.keyGap
        end
        if rowIndex == 4 then
            table.insert(row, { char = "Shift", label = "⇧", x = x, y = y, w = kb.keySize * 1.5, h = kb.keySize, isFunc = true })
            x = x + kb.keySize * 1.5 + kb.keyGap
            table.insert(row, { char = "Space", label = "空格", x = x, y = y, w = kb.keySize * 3, h = kb.keySize, isFunc = true })
            x = x + kb.keySize * 3 + kb.keyGap
            table.insert(row, { char = "Back", label = "←", x = x, y = y, w = kb.keySize * 1.5, h = kb.keySize, isFunc = true })
            x = x + kb.keySize * 1.5 + kb.keyGap
            table.insert(row, { char = "Enter", label = "↵", x = x, y = y, w = kb.keySize * 1.8, h = kb.keySize, isFunc = true })
        elseif rowIndex == 1 then
            table.insert(row, { char = "-", label = "-", x = x, y = y, w = kb.keySize, h = kb.keySize })
        end
        table.insert(kb.layout, row)
    end
end

--- 处理虚拟键盘按键点击
-- @param keyChar string 按键字符或功能名
function ClientTao.OnVirtualKeyPress(keyChar)
    if keyChar == "Shift" then
        ClientTao.virtualKeyboard.shift = not ClientTao.virtualKeyboard.shift
        ClientTao.UpdateVirtualKeyboardChars()
        return
    end
    if keyChar == "Space" then
        ClientTao.apiKeyInput.textBuffer = ClientTao.apiKeyInput.textBuffer .. " "
        return
    end
    if keyChar == "Back" then
        local buf = ClientTao.apiKeyInput.textBuffer
        if #buf > 0 then
            ClientTao.apiKeyInput.textBuffer = buf:sub(1, #buf - 1)
        end
        return
    end
    if keyChar == "Enter" then
        ClientTao.SubmitApiKeyInput()
        return
    end
    local ch = keyChar
    if ClientTao.virtualKeyboard.shift then
        ch = string.upper(ch)
    end
    ClientTao.apiKeyInput.textBuffer = ClientTao.apiKeyInput.textBuffer .. ch
end

--- 根据 Shift 状态更新虚拟键盘按键显示字符
function ClientTao.UpdateVirtualKeyboardChars()
    for _, row in ipairs(ClientTao.virtualKeyboard.layout) do
        for _, key in ipairs(row) do
            if not key.isFunc and #key.char == 1 then
                if ClientTao.virtualKeyboard.shift then
                    key.display = string.upper(key.char)
                else
                    key.display = key.char
                end
            end
        end
    end
end

--- 打开虚拟键盘（绑定到 API Key 输入框）
function ClientTao.ShowVirtualKeyboard()
    ClientTao.virtualKeyboard.visible = true
    ClientTao.UpdateVirtualKeyboardChars()
end

--- 隐藏虚拟键盘
function ClientTao.HideVirtualKeyboard()
    ClientTao.virtualKeyboard.visible = false
    ClientTao.virtualKeyboard.hoverKey = nil
    ClientTao.virtualKeyboard.pressedKey = nil
end

-- ═══════════════════════════════════════════════════════════════════════════
-- API Key 输入界面逻辑
-- ═══════════════════════════════════════════════════════════════════════════

--- 显示 API Key 输入界面（同时唤起虚拟键盘）
-- @param provider string|nil 目标 provider，nil 表示通用 Key
function ClientTao.ShowApiKeyInput(provider)
    provider = provider or "auto"
    ClientTao.apiKeyInput.provider = provider
    ClientTao.apiKeyInput.visible = true
    ClientTao.apiKeyInput.targetOpacity = 1.0
    ClientTao.apiKeyInput.textBuffer = ""
    ClientTao.apiKeyInput.isEncrypted = false
    ClientTao.ShowVirtualKeyboard()
    print("[ClientTao.ApiKey] 显示输入界面，provider=" .. provider)
end

--- 隐藏 API Key 输入界面，同时清空内存中的输入缓存
function ClientTao.HideApiKeyInput()
    ClientTao.apiKeyInput.visible = false
    ClientTao.apiKeyInput.targetOpacity = 0.0
    ClientTao.apiKeyInput.textBuffer = ""
    ClientTao.apiKeyInput.isEncrypted = false
    ClientTao.HideVirtualKeyboard()
    print("[ClientTao.ApiKey] 隐藏输入界面并清除缓冲区")
end

--- 获取当前 API Key 输入框中的内容（仅内存存在，不持久化）
-- @return string 当前输入的内容
function ClientTao.GetApiKeyInputText()
    return ClientTao.apiKeyInput.textBuffer or ""
end

--- 设置当前 API Key 输入框中的内容（供外部 UI 输入事件调用）
-- @param text string 输入内容
function ClientTao.SetApiKeyInputText(text)
    ClientTao.apiKeyInput.textBuffer = text or ""
    ClientTao.apiKeyInput.isEncrypted = false
end

--- 提交当前输入的 API Key 到服务端（发送前自动 RSA 加密）
function ClientTao.SubmitApiKeyInput()
    local rawKey = ClientTao.apiKeyInput.textBuffer or ""
    if string.len(rawKey) < 10 then
        ClientTao.ShowSystemMessage("API Key 太短，请检查后重新输入")
        return
    end
    local encrypted = rawKey
    if _G.RSAEncrypt and _G.SERVER_PUBLIC_KEY then
        encrypted = RSAEncrypt(rawKey, SERVER_PUBLIC_KEY)
        ClientTao.apiKeyInput.isEncrypted = true
    else
        print("[ClientTao.ApiKey] 警告：未找到 RSA 加密函数，明文发送（仅限测试环境）")
    end
    ClientTao.apiKeyInput.textBuffer = ""
    local provider = ClientTao.apiKeyInput.provider or "auto"
    if provider == "auto" then
        network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_SET_PLAYER_API_KEY, true, encrypted)
    else
        network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_SET_PROVIDER_API_KEY, true, provider, encrypted)
    end
    ClientTao.HideApiKeyInput()
    ClientTao.ShowSystemMessage("正在验证天道私人通道...")
end

--- 取消 API Key 输入
function ClientTao.CancelApiKeyInput()
    ClientTao.apiKeyInput.textBuffer = ""
    ClientTao.HideApiKeyInput()
end

--- 设置玩家私有 API Key（旧版兼容接口，直接发送）
-- @param rawKey string 原始 Key 字符串
function ClientTao.SetPlayerApiKey(rawKey)
    if not rawKey or string.len(rawKey) < 10 then
        ClientTao.ShowSystemMessage("API Key 无效")
        return
    end
    local encrypted = rawKey
    if _G.RSAEncrypt and _G.SERVER_PUBLIC_KEY then
        encrypted = RSAEncrypt(rawKey, SERVER_PUBLIC_KEY)
    end
    network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_SET_PLAYER_API_KEY, true, encrypted)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 叙事渲染队列（优先级、打断、淡入淡出）
-- ═══════════════════════════════════════════════════════════════════════════

--- 接收天道叙事事件
-- @param eventType string 事件类型
-- @param eventData VariantMap 事件数据
function ClientTao.HandleTaoNarrative(eventType, eventData)
    local text = ""
    local style = "normal"
    local duration = 5.0
    local priority = "normal"
    if eventData["Text"] then text = eventData["Text"]:GetString() end
    if eventData["Style"] then style = eventData["Style"]:GetString() end
    if eventData["Duration"] then duration = eventData["Duration"]:GetFloat() or 5.0 end
    if eventData["Priority"] then priority = eventData["Priority"]:GetString() or "normal" end
    local entry = {
        text = text,
        style = style,
        duration = duration,
        timeLeft = duration,
        priority = priority,
        fadeIn = 0.0,
        fadeOut = 0.0,
        addedAt = NOW(),
    }
    ClientTao.PushNarrative(entry)
end

--- 将叙事条目推入队列，根据优先级决定插队或覆盖
-- @param entry table 叙事条目
function ClientTao.PushNarrative(entry)
    local pMap = { urgent = 3, normal = 2, background = 1 }
    local pNew = pMap[entry.priority] or 2
    if entry.priority == "urgent" then
        ClientTao.currentNarrative = entry
        ClientTao.narrativePanel.text = entry.text
        ClientTao.narrativePanel.style = entry.style
        ClientTao.narrativePanel.visible = true
        ClientTao.narrativePanel.targetOpacity = 1.0
        entry.fadeIn = NARRATIVE_FADE_IN_DURATION
        print("[Narrative] [URGENT] " .. entry.text)
        return
    end
    local inserted = false
    for i, existing in ipairs(ClientTao.narrativeQueue) do
        local pExisting = pMap[existing.priority] or 2
        if pNew > pExisting then
            table.insert(ClientTao.narrativeQueue, i, entry)
            inserted = true
            break
        end
    end
    if not inserted then
        table.insert(ClientTao.narrativeQueue, entry)
    end
    print("[Narrative] [queued:" .. entry.priority .. "] " .. entry.text)
end

--- 显示下一条叙事（若当前无叙事且队列非空时调用）
function ClientTao.ShowNextNarrative()
    if ClientTao.currentNarrative then return end
    if #ClientTao.narrativeQueue == 0 then return end
    local entry = table.remove(ClientTao.narrativeQueue, 1)
    ClientTao.currentNarrative = entry
    ClientTao.narrativePanel.text = entry.text
    ClientTao.narrativePanel.style = entry.style
    ClientTao.narrativePanel.visible = true
    ClientTao.narrativePanel.targetOpacity = 1.0
    entry.fadeIn = NARRATIVE_FADE_IN_DURATION
    print("[Narrative] [show] " .. entry.text)
end

--- 叙事面板更新（由外部 Update 调用）
-- @param dt number 本帧时间步长
function ClientTao.UpdateNarrativePanel(dt)
    local panel = ClientTao.narrativePanel
    if panel.opacity < panel.targetOpacity then
        panel.opacity = math.min(panel.targetOpacity, panel.opacity + panel.fadeSpeed * dt)
    elseif panel.opacity > panel.targetOpacity then
        panel.opacity = math.max(panel.targetOpacity, panel.opacity - panel.fadeSpeed * dt)
    end
    if not ClientTao.currentNarrative then
        if #ClientTao.narrativeQueue > 0 then
            ClientTao.ShowNextNarrative()
        elseif panel.opacity <= 0.01 and panel.visible then
            panel.visible = false
        end
        return
    end
    local entry = ClientTao.currentNarrative
    if entry.fadeIn > 0 then
        entry.fadeIn = entry.fadeIn - dt
        return
    end
    entry.timeLeft = entry.timeLeft - dt
    if entry.timeLeft <= NARRATIVE_FADE_OUT_DURATION then
        panel.targetOpacity = 0.0
    end
    if entry.timeLeft <= 0 and panel.opacity <= 0.01 then
        ClientTao.currentNarrative = nil
        panel.visible = false
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- NPC 气泡池管理 + 3D 投影
-- ═══════════════════════════════════════════════════════════════════════════

--- 接收 NPC 动作气泡事件
-- @param eventType string 事件类型
-- @param eventData VariantMap 事件数据
function ClientTao.HandleNpcActionBubble(eventType, eventData)
    local npcId = ""
    local content = ""
    local actionType = "speak"
    if eventData["NpcId"] then npcId = eventData["NpcId"]:GetString() end
    if eventData["Content"] then content = eventData["Content"]:GetString() end
    if eventData["Action"] then actionType = eventData["Action"]:GetString() end
    ClientTao.RecordDialogHistory(npcId, content, false)
    local bubbleCount = 0
    for _ in pairs(ClientTao.npcBubbles) do bubbleCount = bubbleCount + 1 end
    if bubbleCount >= MAX_NPC_BUBBLES and not ClientTao.npcBubbles[npcId] then
        local oldestId = nil
        local oldestTime = math.huge
        for id, b in pairs(ClientTao.npcBubbles) do
            if b.createdAt < oldestTime then
                oldestTime = b.createdAt
                oldestId = id
            end
        end
        if oldestId then
            ClientTao.HideNpcBubble(oldestId)
            ClientTao.npcBubbles[oldestId] = nil
        end
    end
    local worldPos = nil
    if _G.GetNpcPosition then
        worldPos = GetNpcPosition(npcId)
    end
    ClientTao.npcBubbles[npcId] = {
        content = content,
        action = actionType,
        timeLeft = 4.0,
        createdAt = NOW(),
        worldPos = worldPos,
        screenPos = { x = 0, y = 0 },
        opacity = 0.0,
        targetOpacity = 1.0,
        occlusion = false,
        distance = 0.0,
    }
    ClientTao.ShowNpcBubble(npcId, content, actionType)
end

--- 将世界坐标转换为屏幕坐标（简化版，依赖全局 Camera 对象）
-- @param worldPos table { x, y, z }
-- @return table|nil { x, y }
function ClientTao.WorldToScreen(worldPos)
    if not _G.Camera or not Camera.WorldToScreenPoint then
        return nil
    end
    local ok, screen = pcall(function()
        return Camera:WorldToScreenPoint(worldPos)
    end)
    if ok and screen then
        return { x = screen.x or 0, y = screen.y or 0 }
    end
    return nil
end

--- 检测屏幕坐标是否被场景几何体遮挡（Raycast 到 NPC 位置）
-- @param worldPos table { x, y, z }
-- @return boolean 是否被遮挡
function ClientTao.IsWorldPosOccluded(worldPos)
    if not _G.Camera then return false end
    local cameraPos = nil
    if Camera.GetNode and Camera:GetNode() and Camera:GetNode().position then
        cameraPos = Camera:GetNode().position
    elseif Camera.position then
        cameraPos = Camera.position
    end
    if not cameraPos then return false end
    if _G.PhysicsRaycast then
        local result = PhysicsRaycast(cameraPos, worldPos)
        if result and result.hit and result.distance then
            local dx = worldPos.x - cameraPos.x
            local dy = worldPos.y - cameraPos.y
            local dz = worldPos.z - cameraPos.z
            local distSq = dx*dx + dy*dy + dz*dz
            local hitDistSq = result.distance * result.distance
            return hitDistSq < distSq * 0.9
        end
    end
    return false
end

--- 计算 NPC 气泡的屏幕位置、遮挡与距离淡出
-- @param dt number 时间步长
function ClientTao.UpdateNpcBubbleProjections(dt)
    local playerPos = nil
    if _G.Player and Player.position then
        playerPos = Player.position
    end
    for npcId, bubble in pairs(ClientTao.npcBubbles) do
        if bubble.worldPos then
            local screen = ClientTao.WorldToScreen(bubble.worldPos)
            if screen then
                bubble.screenPos.x = screen.x
                bubble.screenPos.y = screen.y
            end
            bubble.occlusion = ClientTao.IsWorldPosOccluded(bubble.worldPos)
            if playerPos then
                local dx = bubble.worldPos.x - playerPos.x
                local dy = bubble.worldPos.y - (playerPos.y or 0)
                local dz = bubble.worldPos.z - playerPos.z
                bubble.distance = math.sqrt(dx*dx + dy*dy + dz*dz)
            end
            local targetOpacity = bubble.targetOpacity
            if bubble.occlusion then
                targetOpacity = targetOpacity * 0.3
            end
            if bubble.distance > BUBBLE_FADE_START then
                local fade = 1.0 - math.min(1.0, (bubble.distance - BUBBLE_FADE_START) / (BUBBLE_MAX_DISTANCE - BUBBLE_FADE_START))
                targetOpacity = targetOpacity * fade
            end
            if bubble.distance > BUBBLE_MAX_DISTANCE then
                targetOpacity = 0.0
            end
            local speed = 4.0
            if bubble.opacity < targetOpacity then
                bubble.opacity = math.min(targetOpacity, bubble.opacity + speed * dt)
            elseif bubble.opacity > targetOpacity then
                bubble.opacity = math.max(targetOpacity, bubble.opacity - speed * dt)
            end
        else
            bubble.screenPos.x = 100
            bubble.screenPos.y = 100
        end
    end
end

--- 每帧更新 NPC 气泡状态（由 ClientTao.Update 调用）
-- @param dt number 本帧时间步长
function ClientTao.UpdateNpcBubbles(dt)
    ClientTao.UpdateNpcBubbleProjections(dt)
    local expired = {}
    for npcId, bubble in pairs(ClientTao.npcBubbles) do
        bubble.timeLeft = bubble.timeLeft - dt
        if bubble.timeLeft <= 0 then
            table.insert(expired, npcId)
        end
    end
    for _, npcId in ipairs(expired) do
        ClientTao.npcBubbles[npcId] = nil
        ClientTao.HideNpcBubble(npcId)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 区域发现与世界地图标记 + 动画管线
-- ═══════════════════════════════════════════════════════════════════════════

--- 接收区域发现事件
-- @param eventType string 事件类型
-- @param eventData VariantMap 事件数据
function ClientTao.HandleRegionDiscovery(eventType, eventData)
    local regionId = ""
    local regionName = ""
    local desc = ""
    local x = 0
    local z = 0
    if eventData["RegionId"] then regionId = eventData["RegionId"]:GetString() end
    if eventData["RegionName"] then regionName = eventData["RegionName"]:GetString() end
    if eventData["Desc"] then desc = eventData["Desc"]:GetString() end
    if eventData["X"] then x = eventData["X"]:GetFloat() or 0 end
    if eventData["Z"] then z = eventData["Z"]:GetFloat() or 0 end
    ClientTao.MarkRegionOnMap(regionId, x, z)
    ClientTao.StartDiscoveryAnimation(regionName, desc, x, z)
end

--- 在世界地图上标记已发现区域
-- @param regionId string 区域唯一标识
-- @param x number 世界坐标 X
-- @param z number 世界坐标 Z
function ClientTao.MarkRegionOnMap(regionId, x, z)
    ClientTao.mapMarkers[regionId] = {
        x = x,
        z = z,
        discoveredAt = NOW(),
        opacity = 0.0,
        targetOpacity = 1.0,
        scale = 0.0,
        targetScale = 1.0,
    }
    print("[MapMarker] 标记区域: " .. regionId .. " at (" .. x .. ", " .. z .. ")")
end

--- 启动区域发现动画管线
-- @param regionName string 区域名
-- @param desc string 描述
-- @param worldX number
-- @param worldZ number
function ClientTao.StartDiscoveryAnimation(regionName, desc, worldX, worldZ)
    local anim = ClientTao.discoveryAnimation
    anim.active = true
    anim.regionName = regionName
    anim.regionDesc = desc
    anim.elapsed = 0.0
    anim.duration = DISCOVERY_ANIMATION_DURATION
    anim.cameraMoved = false
    anim.mapUnfolded = false
    anim.soundPlayed = false
    anim.particles = {}
    local centerX = 0
    local centerY = 0
    if _G.GetScreenSize then
        local size = GetScreenSize()
        centerX = size.x * 0.5
        centerY = size.y * 0.5
    end
    anim.screenCenter = { x = centerX, y = centerY }
    for i = 1, DISCOVERY_PARTICLE_COUNT do
        local angle = math.random() * math.pi * 2
        local speed = 50 + math.random() * 150
        table.insert(anim.particles, {
            x = centerX,
            y = centerY,
            vx = math.cos(angle) * speed,
            vy = math.sin(angle) * speed,
            life = 0.5 + math.random() * 1.0,
            maxLife = 1.0,
            color = { r = 0.9 + math.random() * 0.1, g = 0.7 + math.random() * 0.2, b = 0.2 + math.random() * 0.3 },
            size = 2 + math.random() * 4,
        })
    end
    ClientTao.mapOverlay.visible = true
    ClientTao.mapOverlay.targetOpacity = 1.0
    ClientTao.mapOverlay.unfoldTarget = 1.0
    ClientTao.ShowDiscoveryPopup(regionName, desc)
end

--- 更新区域发现动画管线
-- @param dt number 时间步长
function ClientTao.UpdateDiscoveryAnimation(dt)
    local anim = ClientTao.discoveryAnimation
    if not anim.active then return end
    anim.elapsed = anim.elapsed + dt
    if not anim.soundPlayed and anim.elapsed >= 0.1 then
        anim.soundPlayed = true
        ClientTao.PlayDiscoverySound()
    end
    if not anim.cameraMoved and anim.elapsed >= 0.2 then
        anim.cameraMoved = true
        ClientTao.MoveCameraToDiscovery(anim.regionName)
    end
    if not anim.mapUnfolded and anim.elapsed >= 0.5 then
        anim.mapUnfolded = true
    end
    for _, p in ipairs(anim.particles) do
        p.x = p.x + p.vx * dt
        p.y = p.y + p.vy * dt
        p.life = p.life - dt
        p.vy = p.vy + 80 * dt
    end
    local alive = {}
    for _, p in ipairs(anim.particles) do
        if p.life > 0 then
            table.insert(alive, p)
        end
    end
    anim.particles = alive
    if anim.elapsed >= anim.duration and #alive == 0 then
        anim.active = false
        ClientTao.mapOverlay.targetOpacity = 0.0
    end
end

--- 播放发现音效
function ClientTao.PlayDiscoverySound()
    if _G.PlaySfx then
        PlaySfx("sfx_discovery")
    end
end

--- 移动镜头到发现区域（外部实现或模拟）
-- @param regionName string 区域名称
function ClientTao.MoveCameraToDiscovery(regionName)
    if _G.CameraMoveTo then
        CameraMoveTo(regionName)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 世界状态更新（全量 + 增量 + Diff 动画）
-- ═══════════════════════════════════════════════════════════════════════════

--- 处理全量世界状态更新（旧格式兼容）
-- @param eventType string 事件类型
-- @param eventData VariantMap 事件数据
function ClientTao.HandleWorldStateUpdate(eventType, eventData)
    local updateType = ""
    local payload = "{}"
    if eventData["UpdateType"] then updateType = eventData["UpdateType"]:GetString() end
    if eventData["Payload"] then payload = eventData["Payload"]:GetString() end
    if updateType == "faction_shift" then
        ClientTao.ShowFactionUpdate(payload)
    elseif updateType == "quest_available" then
        ClientTao.ShowQuestNotification(payload)
    elseif updateType == "region_generated" then
        ClientTao.ShowRegionUpdate(payload)
    elseif updateType == "world_time" then
        -- 静默更新世界时间
    end
end

--- 处理增量世界状态更新（新增/修改/删除）
-- @param eventType string 事件类型
-- @param eventData VariantMap 事件数据
function ClientTao.HandleWorldStateDelta(eventType, eventData)
    local payloadStr = "{}"
    if eventData["Payload"] then payloadStr = eventData["Payload"]:GetString() end
    local delta = SimpleDecode(payloadStr)
    if type(delta) ~= "table" then
        print("[ClientTao] 世界状态增量解析失败")
        return
    end
    if type(delta.added) == "table" then
        for key, value in pairs(delta.added) do
            ClientTao.ApplyWorldStateEntry(key, value, "added")
        end
    end
    if type(delta.modified) == "table" then
        for key, value in pairs(delta.modified) do
            local oldValue = nil
            if ClientTao.worldState then
                oldValue = ClientTao.worldState[key]
            end
            ClientTao.ApplyWorldStateEntry(key, value, "modified")
            ClientTao.AddDiffAnimation(key, oldValue, value, "modified")
        end
    end
    if type(delta.removed) == "table" then
        for _, key in ipairs(delta.removed) do
            ClientTao.AddDiffAnimation(key, ClientTao.worldState[key], nil, "removed")
            ClientTao.RemoveWorldStateEntry(key)
        end
    end
end

--- 应用单条世界状态变更
-- @param key string 状态键
-- @param value any 状态值
-- @param changeType string 变更类型：added / modified
function ClientTao.ApplyWorldStateEntry(key, value, changeType)
    if not ClientTao.worldState then ClientTao.worldState = {} end
    ClientTao.worldState[key] = value
    if key:find("^quest:") then
        ClientTao.UpdateQuestPanel()
    elseif key:find("^faction:") then
        ClientTao.ShowFactionUpdate(SimpleEncode(value))
    elseif key:find("^trade:") then
        ClientTao.UpdateTradePanel(value)
    elseif key:find("^party:") then
        ClientTao.UpdatePartyPanel(value)
    end
    if TAO_DEBUG then
        print("[WorldState] " .. changeType .. " | " .. key .. " = " .. tostring(SimpleEncode(value)))
    end
end

--- 移除单条世界状态
-- @param key string 状态键
function ClientTao.RemoveWorldStateEntry(key)
    if ClientTao.worldState then
        ClientTao.worldState[key] = nil
    end
    if key:find("^quest:") then
        ClientTao.UpdateQuestPanel()
    elseif key:find("^trade:") then
        ClientTao.UpdateTradePanel(nil)
    elseif key:find("^party:") then
        ClientTao.UpdatePartyPanel(nil)
    end
    if TAO_DEBUG then
        print("[WorldState] removed | " .. key)
    end
end

--- 添加一条 Diff 动画记录
-- @param key string 键
-- @param oldValue any 旧值
-- @param newValue any 新值
-- @param changeType string 类型
function ClientTao.AddDiffAnimation(key, oldValue, newValue, changeType)
    local displayText = key
    if type(newValue) == "table" and newValue.name then
        displayText = newValue.name
    elseif type(oldValue) == "table" and oldValue.name then
        displayText = oldValue.name
    end
    local anim = {
        key = key,
        text = displayText,
        changeType = changeType,
        startTime = NOW(),
        duration = DIFF_ANIMATION_DURATION,
        offsetY = 0,
        targetOffsetY = -30,
        flashPhase = 0.0,
        numberValue = 0,
        numberTarget = 0,
        color = { r = 1.0, g = 1.0, b = 1.0, a = 1.0 },
    }
    if changeType == "added" then
        anim.color = { r = 0.2, g = 0.9, b = 0.3, a = 1.0 }
    elseif changeType == "removed" then
        anim.color = { r = 0.9, g = 0.2, b = 0.2, a = 1.0 }
    elseif changeType == "modified" then
        anim.color = { r = 1.0, g = 0.85, b = 0.2, a = 1.0 }
        local oldNum = tonumber(oldValue)
        local newNum = tonumber(newValue)
        if oldNum and newNum then
            anim.numberValue = oldNum
            anim.numberTarget = newNum
        elseif type(newValue) == "table" and type(newValue.count) == "number" then
            anim.numberValue = (type(oldValue) == "table" and oldValue.count) or 0
            anim.numberTarget = newValue.count
        end
    end
    table.insert(ClientTao.diffAnimations, anim)
end

--- 更新 Diff 动画队列
-- @param dt number 时间步长
function ClientTao.UpdateDiffAnimations(dt)
    local alive = {}
    for _, anim in ipairs(ClientTao.diffAnimations) do
        local elapsed = NOW() - anim.startTime
        if elapsed < anim.duration then
            local t = elapsed / anim.duration
            if t < 0.2 then
                local p = t / 0.2
                anim.offsetY = anim.targetOffsetY * p
            elseif t > 0.8 then
                local p = (t - 0.8) / 0.2
                anim.offsetY = anim.targetOffsetY * (1 - p)
            else
                anim.offsetY = anim.targetOffsetY
            end
            anim.flashPhase = (anim.flashPhase + dt * 10) % (math.pi * 2)
            if anim.numberTarget ~= 0 or anim.numberValue ~= 0 then
                local diff = anim.numberTarget - anim.numberValue
                if math.abs(diff) < 0.01 then
                    anim.numberValue = anim.numberTarget
                else
                    anim.numberValue = anim.numberValue + diff * dt * 5
                end
            end
            table.insert(alive, anim)
        end
    end
    ClientTao.diffAnimations = alive
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 任务面板管理
-- ═══════════════════════════════════════════════════════════════════════════

--- 更新任务面板数据（从 worldState 中重新聚合 quest 条目）
function ClientTao.UpdateQuestPanel()
    local quests = {}
    if ClientTao.worldState then
        for key, value in pairs(ClientTao.worldState) do
            if key:find("^quest:") then
                local quest = {}
                if type(value) == "table" then
                    for k, v in pairs(value) do quest[k] = v end
                end
                quest.questId = key:sub(7)
                table.insert(quests, quest)
            end
        end
    end
    ClientTao.questPanel.quests = quests
    ClientTao.questPanel.dirty = true
    ClientTao.questPanel.visible = #quests > 0
    ClientTao.questPanel.targetOpacity = #quests > 0 and 1.0 or 0.0
    ClientTao.questPanel.maxScroll = math.max(0, #quests * ClientTao.questPanel.rowHeight - ClientTao.questPanel.size.h)
end

--- 更新任务面板淡入淡出（由 ClientTao.Update 调用）
-- @param dt number 本帧时间步长
function ClientTao.UpdateQuestPanel(dt)
    local panel = ClientTao.questPanel
    if panel.opacity < panel.targetOpacity then
        panel.opacity = math.min(panel.targetOpacity, panel.opacity + panel.fadeSpeed * dt)
    elseif panel.opacity > panel.targetOpacity then
        panel.opacity = math.max(panel.targetOpacity, panel.opacity - panel.fadeSpeed * dt)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 交易面板管理
-- ═══════════════════════════════════════════════════════════════════════════

--- 更新交易面板数据
-- @param value table|nil 交易数据
function ClientTao.UpdateTradePanel(value)
    local panel = ClientTao.tradePanel
    if not value or type(value) ~= "table" then
        panel.visible = false
        panel.targetOpacity = 0.0
        panel.items = {}
        return
    end
    panel.npcName = value.npcName or ""
    panel.items = value.items or {}
    panel.selectedIndex = 0
    panel.visible = true
    panel.targetOpacity = 1.0
end

--- 更新交易面板淡入淡出
-- @param dt number 时间步长
function ClientTao.UpdateTradePanelFade(dt)
    local panel = ClientTao.tradePanel
    if panel.opacity < panel.targetOpacity then
        panel.opacity = math.min(panel.targetOpacity, panel.opacity + panel.fadeSpeed * dt)
    elseif panel.opacity > panel.targetOpacity then
        panel.opacity = math.max(panel.targetOpacity, panel.opacity - panel.fadeSpeed * dt)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 队伍面板管理
-- ═══════════════════════════════════════════════════════════════════════════

--- 更新队伍面板数据
-- @param value table|nil 队伍数据
function ClientTao.UpdatePartyPanel(value)
    local panel = ClientTao.partyPanel
    if not value or type(value) ~= "table" then
        panel.visible = false
        panel.targetOpacity = 0.0
        panel.members = {}
        return
    end
    panel.members = value.members or {}
    panel.visible = true
    panel.targetOpacity = 1.0
end

--- 更新队伍面板淡入淡出
-- @param dt number 时间步长
function ClientTao.UpdatePartyPanelFade(dt)
    local panel = ClientTao.partyPanel
    if panel.opacity < panel.targetOpacity then
        panel.opacity = math.min(panel.targetOpacity, panel.opacity + panel.fadeSpeed * dt)
    elseif panel.opacity > panel.targetOpacity then
        panel.opacity = math.max(panel.targetOpacity, panel.opacity - panel.fadeSpeed * dt)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 地图覆盖层管理
-- ═══════════════════════════════════════════════════════════════════════════

--- 更新地图覆盖层淡入淡出与展开
-- @param dt number 时间步长
function ClientTao.UpdateMapOverlay(dt)
    local overlay = ClientTao.mapOverlay
    if overlay.opacity < overlay.targetOpacity then
        overlay.opacity = math.min(overlay.targetOpacity, overlay.opacity + overlay.fadeSpeed * dt)
    elseif overlay.opacity > overlay.targetOpacity then
        overlay.opacity = math.max(overlay.targetOpacity, overlay.opacity - overlay.fadeSpeed * dt)
    end
    if overlay.unfoldProgress < overlay.unfoldTarget then
        overlay.unfoldProgress = math.min(overlay.unfoldTarget, overlay.unfoldProgress + 1.5 * dt)
    elseif overlay.unfoldProgress > overlay.unfoldTarget then
        overlay.unfoldProgress = math.max(overlay.unfoldTarget, overlay.unfoldProgress - 1.5 * dt)
    end
    for _, marker in pairs(ClientTao.mapMarkers) do
        if marker.opacity < marker.targetOpacity then
            marker.opacity = math.min(marker.targetOpacity, marker.opacity + MAP_MARKER_FADE_SPEED * dt)
        end
        if marker.scale < marker.targetScale then
            marker.scale = math.min(marker.targetScale, marker.scale + MAP_MARKER_FADE_SPEED * dt)
        end
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 聊天日志与历史对话回溯
-- ═══════════════════════════════════════════════════════════════════════════

--- 添加一条聊天日志
-- @param speaker string 发言者
-- @param text string 内容
-- @param channel string 频道
function ClientTao.AddChatLog(speaker, text, channel)
    channel = channel or "world"
    table.insert(ClientTao.chatLog.entries, {
        speaker = speaker,
        text = text,
        timestamp = NOW(),
        channel = channel,
    })
    while #ClientTao.chatLog.entries > CHAT_LOG_MAX_ENTRIES do
        table.remove(ClientTao.chatLog.entries, 1)
    end
end

--- 记录 NPC 对话历史
-- @param npcId string NPC 标识
-- @param text string 内容
-- @param isPlayer boolean 是否玩家发言
function ClientTao.RecordDialogHistory(npcId, text, isPlayer)
    if not ClientTao.dialogHistory.byNpc[npcId] then
        ClientTao.dialogHistory.byNpc[npcId] = {}
    end
    table.insert(ClientTao.dialogHistory.byNpc[npcId], {
        text = text,
        isPlayer = isPlayer,
        timestamp = NOW(),
    })
    while #ClientTao.dialogHistory.byNpc[npcId] > ClientTao.dialogHistory.maxTurnsPerNpc do
        table.remove(ClientTao.dialogHistory.byNpc[npcId], 1)
    end
end

--- 获取与某 NPC 的历史对话
-- @param npcId string
-- @return table 对话记录数组
function ClientTao.GetDialogHistory(npcId)
    return ClientTao.dialogHistory.byNpc[npcId] or {}
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 系统反馈与调试
-- ═══════════════════════════════════════════════════════════════════════════

function ClientTao.HandleApiKeyAccepted(eventType, eventData)
    ClientTao.ShowSystemMessage("天道私人通道已开启")
    ClientTao.debugPanel.connectionStatus = "connected(player_key)"
end

function ClientTao.HandleApiKeyRejected(eventType, eventData)
    ClientTao.ShowSystemMessage("天道私人通道开启失败，Key 无效")
end

function ClientTao.HandleProviderKeyAccepted(eventType, eventData)
    local provider = ""
    if eventData[0] then provider = eventData[0]:GetString() end
    ClientTao.ShowSystemMessage("Provider [" .. provider .. "] 私人通道已开启")
end

function ClientTao.HandleProviderKeyRejected(eventType, eventData)
    local provider = ""
    if eventData[0] then provider = eventData[0]:GetString() end
    ClientTao.ShowSystemMessage("Provider [" .. provider .. "] 私人通道开启失败")
end

function ClientTao.HandleSystemMessage(eventType, eventData)
    local msg = ""
    if eventData["Text"] then msg = eventData["Text"]:GetString() end
    ClientTao.ShowSystemMessage(msg)
    ClientTao.AddChatLog("系统", msg, "system")
end

function ClientTao.HandleStreamChunk(eventType, eventData)
    local streamId = ""
    local chunk = ""
    if eventData["StreamId"] then streamId = eventData["StreamId"]:GetString() end
    if eventData["Chunk"] then chunk = eventData["Chunk"]:GetString() end
    if TAO_DEBUG then
        print("[Stream] " .. streamId .. " | len=" .. (Utf8Length and Utf8Length(chunk) or #chunk))
    end
end

function ClientTao.HandleStreamDone(eventType, eventData)
    local streamId = ""
    if eventData["StreamId"] then streamId = eventData["StreamId"]:GetString() end
    if TAO_DEBUG then
        print("[StreamDone] " .. streamId)
    end
end

function ClientTao.HandleDebugResponse(eventType, eventData)
    local payload = "{}"
    if eventData["Payload"] then payload = eventData["Payload"]:GetString() end
    local data = SimpleDecode(payload) or {}
    if type(data.providerHealth) == "table" then
        ClientTao.debugPanel.providerHealth = data.providerHealth
    end
    if type(data.npcAgentCount) == "number" then
        ClientTao.debugPanel.npcAgentCount = data.npcAgentCount
    end
    if type(data.streamCount) == "number" then
        ClientTao.debugPanel.streamCount = data.streamCount
    end
    ClientTao.debugPanel.lastUpdateTime = NOW()
    if type(data.latency) == "number" then
        table.insert(ClientTao.debugPanel.graphData.latency, data.latency)
        while #ClientTao.debugPanel.graphData.latency > DEBUG_GRAPH_SAMPLE_COUNT do
            table.remove(ClientTao.debugPanel.graphData.latency, 1)
        end
    end
end

function ClientTao.HandleNpcStrategyResult(eventType, eventData)
    local npcId = ""
    local thought = ""
    if eventData["NpcId"] then npcId = eventData["NpcId"]:GetString() end
    if eventData["Thought"] then thought = eventData["Thought"]:GetString() end
    if TAO_DEBUG or (_G.PlayerHasTalent and PlayerHasTalent("mind_read")) then
        ClientTao.ShowNpcThought(npcId, thought)
    end
end

function ClientTao.HandleNpcEmotionUpdate(eventType, eventData)
    local npcId = ""
    local emotion = ""
    if eventData["NpcId"] then npcId = eventData["NpcId"]:GetString() end
    if eventData["Emotion"] then emotion = eventData["Emotion"]:GetString() end
    if TAO_DEBUG then
        print("[NpcEmotion] " .. npcId .. " -> " .. emotion)
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 新增子系统事件处理（公会、拍卖行、副本、邮件、排行榜、成就、GM、公告）
-- ═══════════════════════════════════════════════════════════════════════════

function ClientTao.HandleGuildResult(eventType, eventData)
    local action = eventData["Action"] and eventData["Action"]:GetString() or ""
    local status = eventData["Status"] and eventData["Status"]:GetString() or ""
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    ClientTao.ShowSystemMessage("[公会] " .. action .. " " .. status .. (msg ~= "" and (": " .. msg) or ""))
end

function ClientTao.HandleGuildBroadcast(eventType, eventData)
    local btype = eventData["Type"] and eventData["Type"]:GetString() or ""
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    ClientTao.ShowSystemMessage("[公会广播] " .. btype .. (msg ~= "" and (": " .. msg) or ""))
end

function ClientTao.HandleAuctionResult(eventType, eventData)
    local action = eventData["Action"] and eventData["Action"]:GetString() or ""
    local status = eventData["Status"] and eventData["Status"]:GetString() or ""
    ClientTao.ShowSystemMessage("[拍卖行] " .. action .. " " .. status)
end

function ClientTao.HandleAuctionBidNotify(eventType, eventData)
    local auctionId = eventData["AuctionId"] and eventData["AuctionId"]:GetInt() or 0
    local bidder = eventData["Bidder"] and eventData["Bidder"]:GetString() or ""
    local amount = eventData["Amount"] and eventData["Amount"]:GetInt() or 0
    ClientTao.ShowSystemMessage("[拍卖行] 拍品 #" .. auctionId .. " 被 " .. bidder .. " 出价 " .. amount)
end

function ClientTao.HandleDungeonResult(eventType, eventData)
    local action = eventData["Action"] and eventData["Action"]:GetString() or ""
    local status = eventData["Status"] and eventData["Status"]:GetString() or ""
    ClientTao.ShowSystemMessage("[副本] " .. action .. " " .. status)
end

function ClientTao.HandleMailResult(eventType, eventData)
    local action = eventData["Action"] and eventData["Action"]:GetString() or ""
    local status = eventData["Status"] and eventData["Status"]:GetString() or ""
    ClientTao.ShowSystemMessage("[邮件] " .. action .. " " .. status)
end

function ClientTao.HandleMailNotify(eventType, eventData)
    local mailId = eventData["MailId"] and eventData["MailId"]:GetInt() or 0
    local sender = eventData["Sender"] and eventData["Sender"]:GetString() or ""
    ClientTao.ShowSystemMessage("[邮件] 收到来自 " .. sender .. " 的新邮件 (#" .. mailId .. ")")
end

function ClientTao.HandleLeaderboardResult(eventType, eventData)
    local boardType = eventData["BoardType"] and eventData["BoardType"]:GetString() or ""
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or "[]"
    local entries = SimpleDecode(payload) or {}
    ClientTao.ShowLeaderboard(boardType, entries)
end

function ClientTao.HandleAchievementResult(eventType, eventData)
    local action = eventData["Action"] and eventData["Action"]:GetString() or ""
    local achievementId = eventData["AchievementId"] and eventData["AchievementId"]:GetString() or ""
    if action == "unlock" then
        ClientTao.ShowAchievement("成就解锁", achievementId, "🏆")
        ClientTao.PlayAchievementSound()
    elseif action == "claim" then
        ClientTao.ShowSystemMessage("[成就] 领取 " .. achievementId)
    end
end

function ClientTao.HandleGMResult(eventType, eventData)
    local cmd = eventData["Command"] and eventData["Command"]:GetString() or ""
    local status = eventData["Status"] and eventData["Status"]:GetString() or ""
    local msg = eventData["Message"] and eventData["Message"]:GetString() or ""
    ClientTao.ShowSystemMessage("[GM] " .. cmd .. " " .. status .. (msg ~= "" and (": " .. msg) or ""))
end

function ClientTao.HandleServerAnnouncement(eventType, eventData)
    local text = eventData["Text"] and eventData["Text"]:GetString() or ""
    local duration = eventData["Duration"] and eventData["Duration"]:GetFloat() or 5.0
    local priority = eventData["Priority"] and eventData["Priority"]:GetString() or "normal"
    ClientTao.ShowSystemMessage("【全服公告】" .. text)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 调试面板（可折叠、曲线图、GM 指令）
-- ═══════════════════════════════════════════════════════════════════════════

--- 切换调试面板的显示/隐藏
function ClientTao.ToggleDebugPanel()
    ClientTao.debugPanel.visible = not ClientTao.debugPanel.visible
    ClientTao.debugPanel.targetOpacity = ClientTao.debugPanel.visible and 1.0 or 0.0
end

--- 切换某个子面板的折叠状态
-- @param panelName string 面板名称
function ClientTao.ToggleDebugSubPanel(panelName)
    local panel = ClientTao.debugPanel.panels[panelName]
    if panel then
        panel.open = not panel.open
    end
end

--- 向 GM 指令输入框追加字符
-- @param ch string 字符
function ClientTao.AppendGmCommandChar(ch)
    ClientTao.debugPanel.gmCommandBuffer = ClientTao.debugPanel.gmCommandBuffer .. ch
end

--- 删除 GM 指令输入框最后一个字符
function ClientTao.BackspaceGmCommand()
    local buf = ClientTao.debugPanel.gmCommandBuffer
    if #buf > 0 then
        ClientTao.debugPanel.gmCommandBuffer = buf:sub(1, #buf - 1)
    end
end

--- 提交 GM 指令
function ClientTao.SubmitGmCommand()
    local cmd = ClientTao.debugPanel.gmCommandBuffer
    if cmd == "" then return end
    table.insert(ClientTao.debugPanel.gmCommandHistory, cmd)
    ClientTao.debugPanel.gmHistoryIndex = #ClientTao.debugPanel.gmCommandHistory + 1
    ClientTao.debugPanel.gmCommandBuffer = ""
    ClientTao.ExecuteGmCommand(cmd)
end

--- 执行 GM 指令
-- @param cmd string 指令字符串
function ClientTao.ExecuteGmCommand(cmd)
    print("[GM] " .. cmd)
    if cmd:find("^/spawn ") then
        local entity = cmd:sub(8)
        if _G.GmSpawn then GmSpawn(entity) end
    elseif cmd == "/killall" then
        if _G.GmKillAll then GmKillAll() end
    elseif cmd:find("^/teleport ") then
        local args = cmd:sub(12)
        local x, z = args:match("([%-?%d%.]+)%s+([%-?%d%.]+)")
        if x and z and _G.GmTeleport then
            GmTeleport(tonumber(x), 0, tonumber(z))
        end
    elseif cmd:find("^/settime ") then
        local t = tonumber(cmd:sub(11))
        if t and _G.GmSetTime then GmSetTime(t) end
    elseif cmd == "/debug" then
        ClientTao.SendDebugQuery()
    else
        ClientTao.ShowSystemMessage("未知 GM 指令: " .. cmd)
    end
end

--- 获取调试面板中 GM 指令历史上一项
function ClientTao.GmCommandHistoryPrev()
    local dp = ClientTao.debugPanel
    if dp.gmHistoryIndex > 1 then
        dp.gmHistoryIndex = dp.gmHistoryIndex - 1
        dp.gmCommandBuffer = dp.gmCommandHistory[dp.gmHistoryIndex] or ""
    end
end

--- 获取调试面板中 GM 指令历史下一项
function ClientTao.GmCommandHistoryNext()
    local dp = ClientTao.debugPanel
    if dp.gmHistoryIndex < #dp.gmCommandHistory then
        dp.gmHistoryIndex = dp.gmHistoryIndex + 1
        dp.gmCommandBuffer = dp.gmCommandHistory[dp.gmHistoryIndex] or ""
    elseif dp.gmHistoryIndex == #dp.gmCommandHistory then
        dp.gmHistoryIndex = dp.gmHistoryIndex + 1
        dp.gmCommandBuffer = ""
    end
end

--- 准备实时曲线图渲染数据
-- @return table { latency={min, max, values}, fps={...}, memory={...} }
function ClientTao.PrepareDebugGraphData()
    local dp = ClientTao.debugPanel
    local function prep(series)
        if not series or #series == 0 then
            return { min = 0, max = 1, values = {} }
        end
        local minVal = series[1]
        local maxVal = series[1]
        for _, v in ipairs(series) do
            if v < minVal then minVal = v end
            if v > maxVal then maxVal = v end
        end
        if maxVal == minVal then maxVal = minVal + 1 end
        return { min = minVal, max = maxVal, values = series }
    end
    return {
        latency = prep(dp.graphData.latency),
        fps = prep(dp.graphData.fps),
        memory = prep(dp.graphData.memory),
    }
end

--- 更新调试面板内容行（由 ClientTao.Update 调用）
function ClientTao.RefreshDebugPanel()
    local dp = ClientTao.debugPanel
    dp.lines = {}
    table.insert(dp.lines, "=== 天道连接状态 ===")
    table.insert(dp.lines, "Status: " .. dp.connectionStatus)
    table.insert(dp.lines, "=== Provider 健康度 ===")
    for provider, health in pairs(dp.providerHealth or {}) do
        local status = health.isDown and "DOWN" or "UP"
        table.insert(dp.lines, string.format("  %s: %s | avgLatency=%.0fms | failures=%d",
            provider, status, health.avgLatency or 0, health.failures or 0))
    end
    table.insert(dp.lines, "=== Agent 统计 ===")
    table.insert(dp.lines, string.format("  NPC Agent 数量: %d", dp.npcAgentCount))
    table.insert(dp.lines, string.format("  活跃流式会话: %d", dp.streamCount))
    table.insert(dp.lines, string.format("  NPC 气泡数量: %d", ClientTao.GetNpcBubbleCount()))
    table.insert(dp.lines, string.format("  叙事队列长度: %d", #ClientTao.narrativeQueue))
    table.insert(dp.lines, string.format("  区域标记数量: %d", ClientTao.GetMapMarkerCount()))
    table.insert(dp.lines, string.format("  Diff 动画数量: %d", #ClientTao.diffAnimations))
    table.insert(dp.lines, string.format("  聊天日志条数: %d", #ClientTao.chatLog.entries))
end

--- 获取当前 NPC 气泡数量
-- @return number
function ClientTao.GetNpcBubbleCount()
    local count = 0
    for _ in pairs(ClientTao.npcBubbles) do count = count + 1 end
    return count
end

--- 获取当前地图标记数量
-- @return number
function ClientTao.GetMapMarkerCount()
    local count = 0
    for _ in pairs(ClientTao.mapMarkers) do count = count + 1 end
    return count
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 成就解锁动画与排行榜弹窗
-- ═══════════════════════════════════════════════════════════════════════════

--- 触发成就解锁弹窗
-- @param title string 成就标题
-- @param desc string 成就描述
-- @param icon string 图标标识
function ClientTao.ShowAchievement(title, desc, icon)
    local popup = ClientTao.achievementPopup
    popup.visible = true
    popup.targetOpacity = 1.0
    popup.title = title or ""
    popup.desc = desc or ""
    popup.icon = icon or ""
    popup.displayTime = ACHIEVEMENT_POPUP_DURATION
    ClientTao.PlayAchievementSound()
end

--- 触发排行榜弹窗
-- @param title string 标题
-- @param entries table 排行榜条目数组
function ClientTao.ShowLeaderboard(title, entries)
    local popup = ClientTao.leaderboardPopup
    popup.visible = true
    popup.targetOpacity = 1.0
    popup.title = title or ""
    popup.entries = entries or {}
    popup.displayTime = LEADERBOARD_POPUP_DURATION
end

--- 更新成就弹窗
-- @param dt number 时间步长
function ClientTao.UpdateAchievementPopup(dt)
    local popup = ClientTao.achievementPopup
    if not popup.visible then return end
    if popup.opacity < popup.targetOpacity then
        popup.opacity = math.min(popup.targetOpacity, popup.opacity + popup.fadeSpeed * dt)
    elseif popup.opacity > popup.targetOpacity then
        popup.opacity = math.max(popup.targetOpacity, popup.opacity - popup.fadeSpeed * dt)
    end
    popup.displayTime = popup.displayTime - dt
    if popup.displayTime <= 1.0 then
        popup.targetOpacity = 0.0
    end
    if popup.displayTime <= 0 and popup.opacity <= 0.01 then
        popup.visible = false
    end
end

--- 更新排行榜弹窗
-- @param dt number 时间步长
function ClientTao.UpdateLeaderboardPopup(dt)
    local popup = ClientTao.leaderboardPopup
    if not popup.visible then return end
    if popup.opacity < popup.targetOpacity then
        popup.opacity = math.min(popup.targetOpacity, popup.opacity + popup.fadeSpeed * dt)
    elseif popup.opacity > popup.targetOpacity then
        popup.opacity = math.max(popup.targetOpacity, popup.opacity - popup.fadeSpeed * dt)
    end
    popup.displayTime = popup.displayTime - dt
    if popup.displayTime <= 1.0 then
        popup.targetOpacity = 0.0
    end
    if popup.displayTime <= 0 and popup.opacity <= 0.01 then
        popup.visible = false
    end
end

--- 播放成就音效
function ClientTao.PlayAchievementSound()
    if _G.PlaySfx then
        PlaySfx("sfx_achievement_unlock")
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 核心 Update（每帧调用）
-- ═══════════════════════════════════════════════════════════════════════════

--- 客户端天道系统的每帧更新入口
-- @param dt number 时间步长
function ClientTao.Update(dt)
    ClientTao.UpdateNarrativePanel(dt)
    ClientTao.UpdateNpcBubbles(dt)
    ClientTao.UpdateQuestPanel(dt)
    ClientTao.UpdateTradePanelFade(dt)
    ClientTao.UpdatePartyPanelFade(dt)
    ClientTao.UpdateMapOverlay(dt)
    ClientTao.UpdateDiscoveryAnimation(dt)
    ClientTao.UpdateDiffAnimations(dt)
    ClientTao.UpdateAchievementPopup(dt)
    ClientTao.UpdateLeaderboardPopup(dt)

    local apiInput = ClientTao.apiKeyInput
    if apiInput.opacity < apiInput.targetOpacity then
        apiInput.opacity = math.min(apiInput.targetOpacity, apiInput.opacity + apiInput.fadeSpeed * dt)
    elseif apiInput.opacity > apiInput.targetOpacity then
        apiInput.opacity = math.max(apiInput.targetOpacity, apiInput.opacity + apiInput.fadeSpeed * dt)
    end

    apiInput.cursorBlink = apiInput.cursorBlink + dt
    if apiInput.cursorBlink >= 0.5 then
        apiInput.cursorVisible = not apiInput.cursorVisible
        apiInput.cursorBlink = 0
    end

    local dp = ClientTao.debugPanel
    if dp.opacity < dp.targetOpacity then
        dp.opacity = math.min(dp.targetOpacity, dp.opacity + dp.fadeSpeed * dt)
    elseif dp.opacity > dp.targetOpacity then
        dp.opacity = math.max(dp.targetOpacity, dp.opacity - dp.fadeSpeed * dt)
    end

    if dp.visible then
        ClientTao.RefreshDebugPanel()
        if _G.GetFps then
            table.insert(dp.graphData.fps, GetFps())
            while #dp.graphData.fps > DEBUG_GRAPH_SAMPLE_COUNT do
                table.remove(dp.graphData.fps, 1)
            end
        end
        if _G.GetMemoryUsage then
            table.insert(dp.graphData.memory, GetMemoryUsage())
            while #dp.graphData.memory > DEBUG_GRAPH_SAMPLE_COUNT do
                table.remove(dp.graphData.memory, 1)
            end
        end
    end
end

-- ═══════════════════════════════════════════════════════════════════════════
-- 对外 API（交互请求）
-- ═══════════════════════════════════════════════════════════════════════════

--- 请求与指定 NPC 对话
-- @param npcId string NPC 唯一标识
function ClientTao.RequestNpcDialog(npcId)
    network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_REQUEST_NPC_DIALOG, true, npcId)
end

--- 发送玩家与 NPC 的对话消息（并记录历史）
-- @param npcId string
-- @param text string
function ClientTao.SendNpcDialogText(npcId, text)
    ClientTao.RecordDialogHistory(npcId, text, true)
    network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_NPC_DIALOG_TEXT, true, npcId, text)
end

--- 发送世界交互事件
-- @param interactionType string 交互类型
-- @param data table|nil 附加数据
function ClientTao.SendWorldInteraction(interactionType, data)
    network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_PLAYER_WORLD_INTERACTION, true, interactionType, SimpleEncode(data or {}))
end

--- 发送调试查询请求
function ClientTao.SendDebugQuery()
    network:SendRemoteEvent(TAO_REMOTE_EVENTS.C2S_DEBUG_QUERY, true)
end

-- ═══════════════════════════════════════════════════════════════════════════
-- UI 占位函数（由实际项目的 NanoVG / Urho3D UI 系统接管）
-- ═══════════════════════════════════════════════════════════════════════════

function ShowNarrative(text, style, duration)
    print("[Narrative] [" .. (style or "normal") .. "] " .. text)
end

function ClientTao.ShowNpcBubble(npcId, content, actionType)
    print("[Bubble] " .. npcId .. " (" .. (actionType or "speak") .. "): " .. content)
end

function ClientTao.ShowSystemMessage(msg)
    print("[System] " .. msg)
end

function ClientTao.ShowDiscoveryPopup(name, desc)
    print("[Discovery] 发现新区域: " .. name)
    print("  " .. (desc or ""))
end

function ClientTao.PlayDiscoveryEffect()
    -- 播放音效/粒子效果
end

function ClientTao.ShowFactionUpdate(payload)
    print("[Faction Update] " .. payload)
end

function ClientTao.ShowQuestNotification(payload)
    print("[Quest] " .. payload)
end

function ClientTao.ShowRegionUpdate(payload)
    print("[Region] " .. payload)
end

function ClientTao.ShowNpcThought(npcId, thought)
    print("[MindRead] " .. npcId .. " 正在想: " .. thought)
end

function ClientTao.HideNpcBubble(npcId)
    -- UI 层移除气泡
end

function ClientTao.HideNarrativeIfEmpty()
    if not ClientTao.currentNarrative and #ClientTao.narrativeQueue == 0 then
        -- UI 层隐藏叙事面板
    end
end

--- 设置 UI 根节点引用（外部调用）
-- @param root any UI 根节点
function ClientTao.SetUIRoot(root)
    ClientTao.uiRoot = root
end

--- 获取叙事面板完整绑定数据（供 NanoVG 渲染器读取）
-- @return table
function ClientTao.GetNarrativePanelBinding()
    return ClientTao.narrativePanel
end

--- 获取任务面板完整绑定数据
-- @return table
function ClientTao.GetQuestPanelBinding()
    return ClientTao.questPanel
end

--- 获取交易面板完整绑定数据
-- @return table
function ClientTao.GetTradePanelBinding()
    return ClientTao.tradePanel
end

--- 获取队伍面板完整绑定数据
-- @return table
function ClientTao.GetPartyPanelBinding()
    return ClientTao.partyPanel
end

--- 获取地图覆盖层完整绑定数据
-- @return table
function ClientTao.GetMapOverlayBinding()
    return ClientTao.mapOverlay
end

--- 获取调试面板完整数据
-- @return table
function ClientTao.GetDebugPanelData()
    return ClientTao.debugPanel
end

--- 获取虚拟键盘状态
-- @return table
function ClientTao.GetVirtualKeyboardState()
    return ClientTao.virtualKeyboard
end

--- 获取区域发现动画状态（供渲染器绘制粒子等）
-- @return table
function ClientTao.GetDiscoveryAnimationState()
    return ClientTao.discoveryAnimation
end

--- 获取 Diff 动画队列
-- @return table
function ClientTao.GetDiffAnimations()
    return ClientTao.diffAnimations
end
