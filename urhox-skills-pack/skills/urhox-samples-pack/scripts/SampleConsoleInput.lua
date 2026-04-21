--- ConsoleInput 控制台输入示例模块
-- 提取自官方示例 26_ConsoleInput，实现一个基于控制台输入的极简文字冒险游戏。
--
-- @module SampleConsoleInput

local M = {}

--- 游戏是否进行中
M.gameOn = false

--- 是否有食物
M.foodAvailable = false

--- 上回合是否进食
M.eatenLastTurn = false

--- 回合数
M.numTurns = 0

--- 饥饿值（0~5）
M.hunger = 2

--- Urho 威胁值
M.urhoThreat = 0

--- 饥饿等级描述
M.HUNGER_LEVELS = {
    "bursting", "well-fed", "fed", "hungry", "very hungry", "starving"
}

--- Urho 威胁等级描述
M.URHO_THREAT_LEVELS = {
    "Suddenly Urho appears from a dark corner of the fish tank",
    "Urho seems to have his eyes set on you",
    "Urho is homing in on you mercilessly"
}

--- 初始化控制台输入示例
-- @param scene Scene 用于创建音源的空场景（只承载 SoundSource 不渲染）
function M.InitConsoleInput(scene)
    scene:CreateComponent("SoundSource")
end

--- 开始新游戏
function M.StartGame()
    M.Print("Welcome to the Urho adventure game! You are the newest fish in the tank; your\n"
            .. "objective is to survive as long as possible. Beware of hunger and the merciless\n"
            .. "predator cichlid Urho, who appears from time to time. Evading Urho is easier\n"
            .. "with an empty stomach. Type 'help' for available commands.")
    M.gameOn = true
    M.foodAvailable = false
    M.eatenLastTurn = false
    M.numTurns = 0
    M.hunger = 2
    M.urhoThreat = 0
end

--- 结束游戏
-- @param message string 结束消息
function M.EndGame(message)
    M.Print(message)
    M.Print("Game over! You survived " .. tostring(M.numTurns) .. " turns.\n"
            .. "Do you want to play again (Y/N)?")
    M.gameOn = false
end

--- 模拟一回合推进
function M.Advance()
    if M.urhoThreat > 0 then
        M.urhoThreat = M.urhoThreat + 1
        if M.urhoThreat > 3 then
            M.EndGame("Urho has eaten you!")
            return
        end
    elseif M.urhoThreat < 0 then
        M.urhoThreat = M.urhoThreat + 1
    end
    if M.urhoThreat == 0 and math.random() < 0.2 then
        M.urhoThreat = M.urhoThreat + 1
    end
    if M.urhoThreat > 0 then
        M.Print(M.URHO_THREAT_LEVELS[M.urhoThreat] .. ".")
    end

    if (M.numTurns % 4) == 0 and not M.eatenLastTurn then
        M.hunger = M.hunger + 1
        if M.hunger > 5 then
            M.EndGame("You have died from starvation!")
            return
        else
            M.Print("You are " .. M.HUNGER_LEVELS[M.hunger + 1] .. ".")
        end
    end
    M.eatenLastTurn = false

    if M.foodAvailable then
        M.Print("The floating pieces of fish food are quickly eaten by other fish in the tank.")
        M.foodAvailable = false
    elseif math.random() < 0.15 then
        M.Print("The overhead dispenser drops pieces of delicious fish food to the water!")
        M.foodAvailable = true
    end
    M.numTurns = M.numTurns + 1
end

--- 处理玩家输入
-- @param input string 玩家输入的原始字符串
function M.HandleInput(input)
    local inputLower = input:lower():gsub("^%s+", ""):gsub("%s+$", "")
    if inputLower == "" then
        M.Print("Empty input given!")
        return
    end

    if inputLower == "quit" or inputLower == "exit" then
        engine:Exit()
    elseif M.gameOn then
        if inputLower == "help" then
            M.Print("The following commands are available: 'eat', 'hide', 'wait', 'score', 'quit'.")
        elseif inputLower == "score" then
            M.Print("You have survived " .. tostring(M.numTurns) .. " turns.")
        elseif inputLower == "eat" then
            if M.foodAvailable then
                M.Print("You eat several pieces of fish food.")
                M.foodAvailable = false
                M.eatenLastTurn = true
                M.hunger = M.hunger - ((M.hunger > 3) and 2 or 1)
                if M.hunger < 0 then
                    M.EndGame("You have killed yourself by over-eating!")
                    return
                else
                    M.Print("You are now " .. M.HUNGER_LEVELS[M.hunger + 1] .. ".")
                end
            else
                M.Print("There is no food available.")
            end
            M.Advance()
        elseif inputLower == "wait" then
            M.Print("Time passes...")
            M.Advance()
        elseif inputLower == "hide" then
            if M.urhoThreat > 0 then
                local evadeSuccess = (M.hunger > 2) or (math.random() < 0.5)
                if evadeSuccess then
                    M.Print("You hide behind the thick bottom vegetation, until Urho grows bored.")
                    M.urhoThreat = -2
                else
                    M.Print("Your movements are too slow; you are unable to hide from Urho.")
                end
            else
                M.Print("There is nothing to hide from.")
            end
            M.Advance()
        else
            M.Print("Cannot understand the input '" .. input .. "'.")
        end
    else
        local firstChar = inputLower:sub(1, 1)
        if firstChar == "y" then
            M.StartGame()
        elseif firstChar == "n" then
            engine:Exit()
        else
            M.Print("Please answer 'y' or 'n'.")
        end
    end
end

--- 输出文本
-- @param text string
function M.Print(text)
    print(text)
end

return M
