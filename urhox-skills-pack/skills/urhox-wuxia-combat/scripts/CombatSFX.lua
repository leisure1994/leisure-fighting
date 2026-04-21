-- CombatSFX.lua
-- 武侠战斗音效管理器
-- 映射不同武器、材质、元素、受击反应到对应音效事件

local M = {}

-- ============================================================================
-- 常量定义
-- ============================================================================

local SFX_EVENT_LIGHT_HIT = "sfx_light_hit"
local SFX_EVENT_HEAVY_HIT = "sfx_heavy_hit"
local SFX_EVENT_CRITICAL_HIT = "sfx_critical_hit"
local SFX_EVENT_BLOCK = "sfx_block"
local SFX_EVENT_PARRY = "sfx_parry"
local SFX_EVENT_DODGE = "sfx_dodge"
local SFX_EVENT_WHOOSH = "sfx_whoosh"
local SFX_EVENT_KNOCKDOWN = "sfx_knockdown"
local SFX_EVENT_DRAW_WEAPON = "sfx_draw_weapon"
local SFX_EVENT_FOOTSTEP = "sfx_footstep"
local SFX_EVENT_ELEMENT_FIRE = "sfx_fire"
local SFX_EVENT_ELEMENT_ICE = "sfx_ice"
local SFX_EVENT_ELEMENT_THUNDER = "sfx_thunder"

-- ============================================================================
-- SFXManager 类
-- ============================================================================

local SFXManager = {}
SFXManager.__index = SFXManager

--- 创建音效管理器
-- @param audioEngine any 音频引擎/音效播放器（可选）
-- @return SFXManager
function SFXManager.New(audioEngine)
    local self = setmetatable({}, SFXManager)
    self.audioEngine = audioEngine
    self.eventMappings = {}
    self.volumeMaster = 1.0
    self.volumeSFX = 1.0
    self:_RegisterDefaults()
    return self
end

--- 注册默认音效映射
function SFXManager:_RegisterDefaults()
    self.eventMappings[SFX_EVENT_LIGHT_HIT] = {
        clips = { "Audio/SFX/Hit_Light_01", "Audio/SFX/Hit_Light_02", "Audio/SFX/Hit_Light_03" },
        volume = 0.8,
        pitchVar = 0.1,
    }
    self.eventMappings[SFX_EVENT_HEAVY_HIT] = {
        clips = { "Audio/SFX/Hit_Heavy_01", "Audio/SFX/Hit_Heavy_02" },
        volume = 1.0,
        pitchVar = 0.05,
    }
    self.eventMappings[SFX_EVENT_CRITICAL_HIT] = {
        clips = { "Audio/SFX/Critical_Hit_01", "Audio/SFX/Critical_Hit_02" },
        volume = 1.1,
        pitchVar = 0.0,
    }
    self.eventMappings[SFX_EVENT_BLOCK] = {
        clips = { "Audio/SFX/Block_Metal_01", "Audio/SFX/Block_Metal_02" },
        volume = 0.9,
        pitchVar = 0.05,
    }
    self.eventMappings[SFX_EVENT_PARRY] = {
        clips = { "Audio/SFX/Parry_01" },
        volume = 1.0,
        pitchVar = 0.0,
    }
    self.eventMappings[SFX_EVENT_DODGE] = {
        clips = { "Audio/SFX/Dodge_Wind_01", "Audio/SFX/Dodge_Wind_02" },
        volume = 0.7,
        pitchVar = 0.1,
    }
    self.eventMappings[SFX_EVENT_WHOOSH] = {
        clips = { "Audio/SFX/Whoosh_01", "Audio/SFX/Whoosh_02", "Audio/SFX/Whoosh_03" },
        volume = 0.6,
        pitchVar = 0.15,
    }
    self.eventMappings[SFX_EVENT_KNOCKDOWN] = {
        clips = { "Audio/SFX/Bodyfall_01", "Audio/SFX/Bodyfall_02" },
        volume = 1.0,
        pitchVar = 0.05,
    }
    self.eventMappings[SFX_EVENT_DRAW_WEAPON] = {
        clips = { "Audio/SFX/Draw_Sword_01" },
        volume = 0.8,
        pitchVar = 0.0,
    }
    self.eventMappings[SFX_EVENT_FOOTSTEP] = {
        clips = { "Audio/SFX/Footstep_Grass_01", "Audio/SFX/Footstep_Grass_02", "Audio/SFX/Footstep_Grass_03" },
        volume = 0.5,
        pitchVar = 0.1,
    }
    self.eventMappings[SFX_EVENT_ELEMENT_FIRE] = {
        clips = { "Audio/SFX/Fire_Impact_01", "Audio/SFX/Fire_Impact_02" },
        volume = 1.0,
        pitchVar = 0.05,
    }
    self.eventMappings[SFX_EVENT_ELEMENT_ICE] = {
        clips = { "Audio/SFX/Ice_Shatter_01", "Audio/SFX/Ice_Shatter_02" },
        volume = 1.0,
        pitchVar = 0.05,
    }
    self.eventMappings[SFX_EVENT_ELEMENT_THUNDER] = {
        clips = { "Audio/SFX/Thunder_Crack_01", "Audio/SFX/Thunder_Crack_02" },
        volume = 1.1,
        pitchVar = 0.0,
    }
end

--- 注册音效事件映射
-- @param eventName string
-- @param mapping table { clips = {...}, volume = n, pitchVar = n }
function SFXManager:RegisterEvent(eventName, mapping)
    self.eventMappings[eventName] = mapping
end

--- 设置主音量
-- @param vol number
function SFXManager:SetMasterVolume(vol)
    self.volumeMaster = vol
end

--- 设置SFX音量
-- @param vol number
function SFXManager:SetSFXVolume(vol)
    self.volumeSFX = vol
end

--- 随机播放一个音效事件
-- @param eventName string
-- @param pos table|nil 世界位置（3D音效用）
function SFXManager:Play(eventName, pos)
    local mapping = self.eventMappings[eventName]
    if not mapping then
        return
    end
    local clips = mapping.clips
    if not clips or #clips == 0 then
        return
    end
    local clip = clips[math.random(1, #clips)]
    local volume = (mapping.volume or 1.0) * self.volumeMaster * self.volumeSFX
    local pitch = 1.0 + (math.random() * 2.0 - 1.0) * (mapping.pitchVar or 0.0)

    -- 若没有真实音频引擎，打印调试信息
    if not self.audioEngine then
        -- print(string.format("[SFX] %s -> %s (vol=%.2f, pitch=%.2f)", eventName, clip, volume, pitch))
        return
    end

    if type(self.audioEngine.PlaySound3D) == "function" and pos then
        self.audioEngine:PlaySound3D(clip, pos, volume, pitch)
    elseif type(self.audioEngine.PlaySound) == "function" then
        self.audioEngine:PlaySound(clip, volume, pitch)
    elseif type(self.audioEngine.play) == "function" then
        self.audioEngine:play(clip, volume, pitch)
    end
end

--- 停止所有音效
function SFXManager:StopAll()
    if self.audioEngine and type(self.audioEngine.StopAllSFX) == "function" then
        self.audioEngine:StopAllSFX()
    end
end

--- 战斗中命中时的一站式音效调用
-- @param damageEvent table
-- @param result table
function SFXManager:OnCombatHit(damageEvent, result)
    local eventName = SFX_EVENT_LIGHT_HIT

    local reaction = damageEvent.reaction or "hit_stun"
    if reaction == "knockback" or reaction == "knockdown" or reaction == "launch" then
        eventName = SFX_EVENT_HEAVY_HIT
    end

    if result and result.isCrit then
        eventName = SFX_EVENT_CRITICAL_HIT
    end

    self:Play(eventName)

    -- 元素音效
    local element = damageEvent.element
    if element == "fire" then
        self:Play(SFX_EVENT_ELEMENT_FIRE)
    elseif element == "ice" then
        self:Play(SFX_EVENT_ELEMENT_ICE)
    elseif element == "thunder" then
        self:Play(SFX_EVENT_ELEMENT_THUNDER)
    end

    -- 击倒追加
    if reaction == "knockdown" or reaction == "launch" then
        self:Play(SFX_EVENT_KNOCKDOWN)
    end
end

--- 格挡成功音效
function SFXManager:OnBlockSuccess()
    self:Play(SFX_EVENT_BLOCK)
end

--- 弹反成功音效
function SFXManager:OnParrySuccess()
    self:Play(SFX_EVENT_PARRY)
end

--- 闪避音效
function SFXManager:OnDodge()
    self:Play(SFX_EVENT_DODGE)
end

--- 武器挥空音效
function SFXManager:OnWhoosh()
    self:Play(SFX_EVENT_WHOOSH)
end

--- 拔刀/武器出鞘音效
function SFXManager:OnDrawWeapon()
    self:Play(SFX_EVENT_DRAW_WEAPON)
end

--- 脚步音效
function SFXManager:OnFootstep()
    self:Play(SFX_EVENT_FOOTSTEP)
end

M.SFXManager = SFXManager
M.SFX_EVENT_LIGHT_HIT = SFX_EVENT_LIGHT_HIT
M.SFX_EVENT_HEAVY_HIT = SFX_EVENT_HEAVY_HIT
M.SFX_EVENT_CRITICAL_HIT = SFX_EVENT_CRITICAL_HIT
M.SFX_EVENT_BLOCK = SFX_EVENT_BLOCK
M.SFX_EVENT_PARRY = SFX_EVENT_PARRY
M.SFX_EVENT_DODGE = SFX_EVENT_DODGE
M.SFX_EVENT_WHOOSH = SFX_EVENT_WHOOSH
M.SFX_EVENT_KNOCKDOWN = SFX_EVENT_KNOCKDOWN
M.SFX_EVENT_DRAW_WEAPON = SFX_EVENT_DRAW_WEAPON
M.SFX_EVENT_FOOTSTEP = SFX_EVENT_FOOTSTEP
M.SFX_EVENT_ELEMENT_FIRE = SFX_EVENT_ELEMENT_FIRE
M.SFX_EVENT_ELEMENT_ICE = SFX_EVENT_ELEMENT_ICE
M.SFX_EVENT_ELEMENT_THUNDER = SFX_EVENT_ELEMENT_THUNDER

return M
