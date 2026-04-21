-- UrhoX Extra Effects - UI SpriteAnimBox 精灵动画框

local UISpriteAnimBox = {}
UISpriteAnimBox.__index = UISpriteAnimBox

--- 创建精灵动画框
-- @param root UIElement 根元素
-- @return UISpriteAnimBox
function UISpriteAnimBox.Create(root)
    local self = setmetatable({}, UISpriteAnimBox)
    self.root = root:CreateChild("BorderImage")
    self.root:SetPosition(IntVector2(800, 120))
    self.root:SetSize(IntVector2(300, 180))
    self.root:SetColor(Color(0, 0, 0, 0))

    self.title = self.root:CreateChild("Text")
    self.title:SetPosition(IntVector2(5, 5))
    self.title:SetFont("Fonts/Anonymous Pro.ttf", 12)
    self.title:SetText("Sprite Anim Box")

    self.sprite = self.root:CreateChild("Sprite")
    self.sprite:SetAlignment(HA_CENTER, VA_CENTER)
    self.sprite:SetSize(IntVector2(64, 64))

    self.frames = {} -- texture paths
    self.currentFrame = 1
    self.fps = 20.0
    self.elapsed = 0.0
    self.playing = false
    self.cache = nil

    return self
end

--- 添加帧图片
-- @param cache ResourceCache
-- @param texturePath string
function UISpriteAnimBox:AddFrame(cache, texturePath)
    self.cache = cache
    table.insert(self.frames, texturePath)
    if #self.frames == 1 then
        local tex = cache:GetResource("Texture2D", texturePath)
        self.sprite:SetTexture(tex)
    end
end

--- 设置帧率
-- @param fps number
function UISpriteAnimBox:SetFPS(fps)
    self.fps = fps
end

--- 播放/暂停
-- @param play boolean
function UISpriteAnimBox:Play(play)
    self.playing = play
end

--- 更新动画
-- @param timeStep number
function UISpriteAnimBox:Update(timeStep)
    if not self.playing or #self.frames == 0 or not self.cache then
        return
    end
    self.elapsed = self.elapsed + timeStep
    local interval = 1.0 / self.fps
    if self.elapsed >= interval then
        self.elapsed = self.elapsed - interval
        self.currentFrame = self.currentFrame + 1
        if self.currentFrame > #self.frames then
            self.currentFrame = 1
        end
        local tex = self.cache:GetResource("Texture2D", self.frames[self.currentFrame])
        if tex then
            self.sprite:SetTexture(tex)
        end
    end
end

--- 设置标题
-- @param text string
function UISpriteAnimBox:SetTitle(text)
    self.title:SetText(text)
end

return UISpriteAnimBox
