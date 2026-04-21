--- SoundEffects 音效示例模块
-- 提取自官方示例 14_SoundEffects，演示 SoundSource 播放音效、背景音乐及主音量控制。
--
-- @module SampleSoundEffects

local M = {}

--- 音效名称列表
M.SOUND_NAMES = { "Fist", "Explosion", "Power-up" }

--- 音效资源路径列表
M.SOUND_RESOURCES = {
    "Sounds/PlayerFistHit.wav",
    "Sounds/BigExplosion.wav",
    "Sounds/Powerup.wav"
}

--- 背景音乐音源
M.musicSource = nil

--- 构建 UI 及初始化音频
-- @param scene Scene
function M.CreateSoundUI(scene)
    M.musicSource = scene:CreateComponent("SoundSource")
    M.musicSource.soundType = SOUND_MUSIC

    local uiStyle = cache:GetResource("XMLFile", "UI/DefaultStyle.xml")
    ui.root.defaultStyle = uiStyle

    local font = cache:GetResource("Font", "Fonts/Anonymous Pro.ttf")

    -- 音效按钮
    for i, name in ipairs(M.SOUND_NAMES) do
        local button = ui.root:CreateChild("Button")
        button:SetStyleAuto()
        button:SetPosition((i - 1) * 140 + 20, 20)
        button:SetSize(120, 40)
        local bt = button:CreateChild("Text")
        bt:SetAlignment(HA_CENTER, VA_CENTER)
        bt:SetFont(font, 12)
        bt.text = name
        button.vars["SoundResource"] = Variant(M.SOUND_RESOURCES[i])
        SubscribeToEvent(button, "Pressed", function(eventType, eventData)
            local sender = GetEventSender()
            if sender == nil then return end
            local resName = sender.vars["SoundResource"]:GetString()
            local sound = cache:GetResource("Sound", resName)
            if sound ~= nil then
                local src = scene:CreateComponent("SoundSource")
                src.autoRemoveMode = REMOVE_COMPONENT
                src:Play(sound)
                src.gain = 0.7
            end
        end)
    end

    -- 播放/停止音乐按钮
    local playButton = ui.root:CreateChild("Button")
    playButton:SetStyleAuto()
    playButton:SetPosition(20, 80)
    playButton:SetSize(120, 40)
    local pbt = playButton:CreateChild("Text")
    pbt:SetAlignment(HA_CENTER, VA_CENTER)
    pbt:SetFont(font, 12)
    pbt.text = "Play Music"
    SubscribeToEvent(playButton, "Released", function(eventType, eventData)
        local music = cache:GetResource("Sound", "Music/Ninja Gods.ogg")
        if music ~= nil then
            music.looped = true
            M.musicSource:Play(music)
        end
    end)

    local stopButton = ui.root:CreateChild("Button")
    stopButton:SetStyleAuto()
    stopButton:SetPosition(160, 80)
    stopButton:SetSize(120, 40)
    local sbt = stopButton:CreateChild("Text")
    sbt:SetAlignment(HA_CENTER, VA_CENTER)
    sbt:SetFont(font, 12)
    sbt.text = "Stop Music"
    SubscribeToEvent(stopButton, "Released", function(eventType, eventData)
        M.musicSource:Stop()
    end)

    -- 音量滑动条
    local soundSlider = ui.root:CreateChild("Slider")
    soundSlider:SetStyleAuto()
    soundSlider:SetPosition(50, 140)
    soundSlider:SetSize(200, 20)
    soundSlider.range = 1.0
    soundSlider.value = audio.masterGain[SOUND_EFFECT]
    SubscribeToEvent(soundSlider, "SliderChanged", function(eventType, eventData)
        local vol = eventData["Value"]:GetFloat()
        audio.masterGain[SOUND_EFFECT] = vol
    end)
    local st = ui.root:CreateChild("Text")
    st:SetPosition(20, 140)
    st:SetFont(font, 12)
    st.text = "Sound Volume"

    local musicSlider = ui.root:CreateChild("Slider")
    musicSlider:SetStyleAuto()
    musicSlider:SetPosition(50, 200)
    musicSlider:SetSize(200, 20)
    musicSlider.range = 1.0
    musicSlider.value = audio.masterGain[SOUND_MUSIC]
    SubscribeToEvent(musicSlider, "SliderChanged", function(eventType, eventData)
        local vol = eventData["Value"]:GetFloat()
        audio.masterGain[SOUND_MUSIC] = vol
    end)
    local mt = ui.root:CreateChild("Text")
    mt:SetPosition(20, 200)
    mt:SetFont(font, 12)
    mt.text = "Music Volume"
end

return M
