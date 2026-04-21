-- InkRuntime.lua
-- 天道引擎 · 轻量级 Ink 叙事运行时
-- 职责：解析 Ink JSON（简化版），驱动分支、选择、变量与标签

InkRuntime = InkRuntime or {}

-- ============================================================================
-- 内部工具函数
-- ============================================================================

--- 去除字符串首尾空白
-- @param s string
-- @return string
local function trim(s)
    return s:match("^%s*(.-)%s*$")
end

--- 安全字符串替换（不受影响范围内的嵌套内容干扰）
-- @param str string 原始字符串
-- @param pattern string 匹配模式
-- @param repl function|string 替换内容
-- @return string 替换后的字符串
local function safeGsub(str, pattern, repl)
    return str:gsub(pattern, repl)
end

--- 尝试将值转为数字
-- @param v any
-- @return number|any
local function toNumber(v)
    local n = tonumber(v)
    return n or v
end

--- 解析 Ink 条件表达式（仅支持简单比较）
-- 支持格式: var > 5, var == 0, count >= 3, hasKey, !hasKey
-- @param expr string 表达式字符串
-- @param vars table 变量表
-- @return boolean 条件真假
local function evalCondition(expr, vars)
    expr = trim(expr)
    -- 处理逻辑非
    if expr:sub(1, 1) == "!" then
        return not evalCondition(expr:sub(2), vars)
    end

    -- 简单比较: var > 5, var == something, count <= 3
    local left, op, right = expr:match("^(.-)%s*([%<>=!]+)%s*(.-)$")
    if left and op and right then
        left = trim(left)
        right = trim(right)
        local lv = vars[left]
        if lv == nil then lv = toNumber(left) end
        local rv = vars[right]
        if rv == nil then rv = toNumber(right) end
        lv = toNumber(lv)
        rv = toNumber(rv)

        if op == "==" then return lv == rv end
        if op == "!=" then return lv ~= rv end
        if op == ">"  then return lv >  rv end
        if op == "<"  then return lv <  rv end
        if op == ">=" then return lv >= rv end
        if op == "<=" then return lv <= rv end
        return false
    end

    -- 布尔值: 变量存在且非 false/0/""
    local val = vars[expr]
    if val == nil then
        val = toNumber(expr)
    end
    if type(val) == "boolean" then return val end
    if type(val) == "number" then return val ~= 0 end
    if type(val) == "string" then return val ~= "" end
    return false
end

--- 解析行内条件块 {cond: trueText | falseText}
-- @param text string 输入文本
-- @param vars table 变量表
-- @return string 展开后的文本
local function expandInlineConditions(text, vars)
    -- 采用迭代方式处理最内层条件
    local changed = true
    local safety = 0
    while changed and safety < 50 do
        changed = false
        safety = safety + 1
        -- 匹配最内层 { ... }
        text = text:gsub("{([^{}]+)}", function(inner)
            changed = true
            -- 拆分 cond: true | false
            local condPart, rest = inner:match("^([^:]+):(.*)$")
            if condPart and rest then
                local condTrue = evalCondition(condPart, vars)
                -- 按 | 拆分，但只拆第一级（忽略可能的嵌套，此处已是最内层）
                local parts = {}
                local depth = 0
                local current = ""
                for i = 1, #rest do
                    local ch = rest:sub(i, i)
                    if ch == "|" and depth == 0 then
                        table.insert(parts, trim(current))
                        current = ""
                    else
                        current = current .. ch
                    end
                end
                table.insert(parts, trim(current))
                if condTrue then
                    return parts[1] or ""
                else
                    return parts[2] or ""
                end
            end
            return inner
        end)
    end
    return text
end

-- ============================================================================
-- Ink 故事对象定义
-- ============================================================================

local InkStory = {}
InkStory.__index = InkStory

--- 从简化 JSON 表创建 Ink 故事对象
-- @param data table 故事数据表
-- @return table InkStory 对象
function InkRuntime.LoadStory(data)
    local story = {}
    setmetatable(story, InkStory)

    if type(data) == "string" then
        if SimpleDecode then
            data = SimpleDecode(data)
        else
            -- 极简：尝试 json 库
            local ok, json = pcall(require, "json")
            if ok and json then
                data = json.decode(data)
            end
        end
    end

    data = data or {}
    story.data = data
    story.knots = data.knots or {}
    story.variables = {}
    if data.variables then
        for k, v in pairs(data.variables) do
            story.variables[k] = toNumber(v)
        end
    end

    story.currentKnot = "_start"
    story.stepIndex = 1
    story.choices = {}
    story.tags = {}
    story.finished = false
    story.choiceHistory = {} -- 记录已做的选择路径

    -- 默认入口
    if not story.knots._start and data.content then
        story.knots._start = {
            type = "sequence",
            steps = data.content
        }
    end

    return story
end

--- 推进到下一个输出点，返回当前文本与标签
-- @return string 当前段落文本（可能为空，表示进入选择点或结束）
-- @return table 标签数组
function InkStory:Continue()
    if self.finished then return "", {} end

    local knot = self.knots[self.currentKnot]
    if not knot then
        self.finished = true
        return "", {}
    end

    local steps = knot.steps or knot.content or {}
    while self.stepIndex <= #steps do
        local step = steps[self.stepIndex]
        self.stepIndex = self.stepIndex + 1

        local stepType = step.type or "text"

        if stepType == "text" then
            local text = step.text or ""
            text = expandInlineConditions(text, self.variables)
            self.tags = step.tags or {}
            if trim(text) ~= "" then
                return trim(text), self.tags
            end

        elseif stepType == "divert" then
            self.currentKnot = step.target or self.currentKnot
            self.stepIndex = 1
            knot = self.knots[self.currentKnot]
            if not knot then
                self.finished = true
                return "", {}
            end
            steps = knot.steps or knot.content or {}

        elseif stepType == "choice" then
            -- 回退一步，让外部读取选择
            self.stepIndex = self.stepIndex - 1
            self.choices = self:_gatherChoices(steps)
            return "", {}

        elseif stepType == "set" then
            local val = toNumber(step.value)
            if step.operation == "add" then
                self.variables[step.var] = (self.variables[step.var] or 0) + val
            elseif step.operation == "sub" then
                self.variables[step.var] = (self.variables[step.var] or 0) - val
            else
                self.variables[step.var] = val
            end

        elseif stepType == "tag" then
            self.tags = step.tags or {}
        end
    end

    self.finished = true
    return "", {}
end

--- 在继续前检查是否有可做的选择（内部使用）
-- @param steps table 当前 knot 的步骤列表
-- @return table 可用选项列表
function InkStory:_gatherChoices(steps)
    local choices = {}
    local idx = self.stepIndex
    while idx <= #steps do
        local step = steps[idx]
        if step.type == "choice" then
            local cond = step.condition
            local visible = true
            if cond then
                visible = evalCondition(cond, self.variables)
            end
            if visible then
                local text = step.text or ""
                text = expandInlineConditions(text, self.variables)
                table.insert(choices, {
                    text = trim(text),
                    target = step.target,
                    index = #choices + 1,
                    stepIndex = idx
                })
            end
        elseif step.type ~= "tag" then
            break
        end
        idx = idx + 1
    end
    return choices
end

--- 获取当前可用的选择列表
-- @return table 选项数组，每个元素 {text=..., index=...}
function InkStory:GetChoices()
    local knot = self.knots[self.currentKnot]
    if not knot then return {} end
    self.choices = self:_gatherChoices(knot.steps or knot.content or {})
    return self.choices
end

--- 做出选择并继续推进故事
-- @param idx number 选择序号（从 1 开始）
function InkStory:ChooseChoiceIndex(idx)
    local choices = self:GetChoices()
    local choice = choices[idx]
    if not choice then return end

    table.insert(self.choiceHistory, choice.text)
    self.stepIndex = choice.stepIndex + 1

    if choice.target then
        self.currentKnot = choice.target
        self.stepIndex = 1
    end
    self.choices = {}
end

--- 设置故事变量
-- @param name string 变量名
-- @param value any 变量值
function InkStory:SetVariable(name, value)
    self.variables[name] = toNumber(value)
end

--- 获取故事变量
-- @param name string 变量名
-- @return any 变量值
function InkStory:GetVariable(name)
    return self.variables[name]
end

--- 判断故事是否已结束
-- @return boolean
function InkStory:CanContinue()
    return not self.finished
end

--- 获取当前段落标签
-- @return table 标签字符串数组
function InkStory:GetCurrentTags()
    return self.tags or {}
end

-- ============================================================================
-- 辅助：将简化 Ink 文本格式解析为 InkRuntime 数据结构
-- ============================================================================

--- 解析简化 Ink 脚本字符串为 LoadStory 可用的数据表
-- 支持的语法:
--   = knot_name           -- 定义 knot
--   # tag1 tag2           -- 标签（作用于下行文本）
--   -> target             -- 跳转
--   ~ var = value         -- 赋值
--   ~ var += value        -- 加减
--   * [条件] 选项文本 -> target  -- 选择
--   {cond: A | B}         -- 条件文本
-- @param script string 脚本文本
-- @return table 数据表
function InkRuntime.ParseSimpleScript(script)
    local data = {
        knots = {},
        variables = {}
    }
    local lines = {}
    for line in script:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end

    local currentKnot = "_start"
    data.knots[currentKnot] = {type = "sequence", steps = {}}
    local pendingTags = {}

    for i = 1, #lines do
        local line = trim(lines[i])
        if line == "" or line:sub(1, 2) == "//" then
            goto continue
        end

        -- knot 定义
        local knotName = line:match("^=\s*(.+)$")
        if knotName then
            currentKnot = trim(knotName)
            data.knots[currentKnot] = {type = "sequence", steps = {}}
            pendingTags = {}
            goto continue
        end

        -- 标签
        local tagsStr = line:match("^#%s*(.+)$")
        if tagsStr then
            local tags = {}
            for tag in tagsStr:gmatch("%S+") do
                table.insert(tags, tag)
            end
            pendingTags = tags
            goto continue
        end

        -- 跳转
        local divertTarget = line:match("^%-%s*\>%s*(.+)$")
        if divertTarget then
            table.insert(data.knots[currentKnot].steps, {
                type = "divert",
                target = trim(divertTarget)
            })
            pendingTags = {}
            goto continue
        end

        -- 赋值 / 运算
        local setOp, setVar, setVal = line:match("^~%s*(%w+)%s*([%+%-]?=)%s*(.+)$")
        if setOp then
            local val = trim(setVal)
            if val:match("^%-?%d+$") or val:match("^%-?%d+%.%d*$") then
                val = tonumber(val)
            end
            local operation = nil
            if setOp == "+=" then operation = "add"
            elseif setOp == "-=" then operation = "sub"
            end
            table.insert(data.knots[currentKnot].steps, {
                type = "set",
                var = setVar,
                value = val,
                operation = operation
            })
            pendingTags = {}
            goto continue
        end

        -- 变量声明默认值（VAR x = 5）
        local varName, varVal = line:match("^VAR%s+(%w+)%s*=%s*(.+)$")
        if varName then
            local val = trim(varVal)
            if val:match("^%-?%d+$") or val:match("^%-?%d+%.%d*$") then
                val = tonumber(val)
            end
            data.variables[varName] = val
            goto continue
        end

        -- 选择
        local choiceCond, choiceText, choiceTarget = line:match("^%*\s*%[([^%]]*)%]?%s*(.-)%s*%-%>%s*(%S+)$")
        if not choiceCond and line:sub(1, 1) == "*" then
            choiceText, choiceTarget = line:match("^%*%s*(.-)%s*%-%>%s*(%S+)$")
        end
        if line:sub(1, 1) == "*" then
            if not choiceText then
                choiceCond, choiceText = line:match("^%*\s*%[([^%]]*)%]%s*(.*)$")
            end
            if not choiceText then
                choiceText = line:match("^%*%s*(.+)$")
            end
            local cond = choiceCond and trim(choiceCond) or nil
            if cond == "" then cond = nil end
            local text = choiceText and trim(choiceText) or ""
            local target = choiceTarget and trim(choiceTarget) or nil
            -- 去除文本中可能残留的箭头
            if not target then
                text = text:gsub("%-%>%s*.+", "")
                text = trim(text)
            end
            table.insert(data.knots[currentKnot].steps, {
                type = "choice",
                text = text,
                condition = cond,
                target = target,
                tags = CloneTags(pendingTags)
            })
            pendingTags = {}
            goto continue
        end

        -- 普通文本（可能包含行内条件）
        table.insert(data.knots[currentKnot].steps, {
            type = "text",
            text = line,
            tags = CloneTags(pendingTags)
        })
        pendingTags = {}

        ::continue::
    end

    return data
end

local function CloneTags(tags)
    if not tags or #tags == 0 then return nil end
    local copy = {}
    for i = 1, #tags do copy[i] = tags[i] end
    return copy
end

--- 包装 ParseSimpleScript + LoadStory
-- @param script string 简化脚本
-- @return table InkStory 对象
function InkRuntime.LoadSimpleScript(script)
    local data = InkRuntime.ParseSimpleScript(script)
    return InkRuntime.LoadStory(data)
end

-- ============================================================================
-- 微型故事示例
-- ============================================================================

--- 示例 1：基本的门与选择
InkRuntime.EXAMPLE_DOOR = [[
VAR hasKey = false

你站在一扇巨大的石门前。 #intro

门上刻着古老的符文。

* [hasKey] 用钥匙打开大门 -> inside
* 敲门 -> knock
* 转身离开 -> leave

= inside

石门缓缓打开，发出低沉的轰鸣。

你走进了未知的黑暗。 #ending

-> END

= knock

你敲了敲门，只有回声作答。

* 再敲一次 -> knock
* 转身离开 -> leave

= leave

你决定不冒险，转身消失在走廊的阴影中。 #ending

-> END
]]

--- 示例 2：变量驱动的交易对话
InkRuntime.EXAMPLE_TRADE = [[
VAR gold = 10
VAR price = 5

商人上下打量着你。

"这把匕首只卖 {price} 枚金币。"

* [gold >= price] 买下匕首 -> buy
* [gold < price] 你买不起（选项不可用） -> 
* 算了，不要了 -> refuse

= buy

~ gold -= price

"成交！这是你的匕首。" 商人接过金币，将匕首递给你。

你现在还有 {gold} 枚金币。 #trade_done

-> END

= refuse

商人耸了耸肩。

"错过这次机会，你可能再也遇不到了。"

-> END
]]

--- 示例 3：带标签与状态变化的任务对话
InkRuntime.EXAMPLE_QUEST = [[
VAR reputation = 0

村长焦急地望着远方。

"年轻人，村里的水井干涸了。你能帮我们吗？" #quest_giver

* 当然，我这就去 -> accept
* 我还有其他事 -> decline

= accept

~ reputation += 5

村长的脸上露出了欣慰的笑容。

"太好了！沿着北边的路走，你就能找到水源。"

你的声望增加了。 当前声望: {reputation} #reputation_up

-> END

= decline

~ reputation -= 2

村长叹了口气。

"好吧，如果你改变了主意，随时回来找我。"

你的声望下降了。 当前声望: {reputation} #reputation_down

-> END
]]

-- 兼容处理：为 ParseSimpleScript 中的 CloneTags 前置声明
local oldParse = InkRuntime.ParseSimpleScript

function InkRuntime.ParseSimpleScript(script)
    local data = {
        knots = {},
        variables = {}
    }
    local lines = {}
    for line in script:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end

    local currentKnot = "_start"
    data.knots[currentKnot] = {type = "sequence", steps = {}}
    local pendingTags = {}

    for i = 1, #lines do
        local line = trim(lines[i])
        if line == "" or line:sub(1, 2) == "//" then
            goto continue
        end

        local knotName = line:match("^=\s*(.+)$")
        if knotName then
            currentKnot = trim(knotName)
            data.knots[currentKnot] = {type = "sequence", steps = {}}
            pendingTags = {}
            goto continue
        end

        local tagsStr = line:match("^#%s*(.+)$")
        if tagsStr then
            local tags = {}
            for tag in tagsStr:gmatch("%S+") do
                table.insert(tags, tag)
            end
            pendingTags = tags
            goto continue
        end

        local divertTarget = line:match("^%-%s*\>%s*(.+)$")
        if divertTarget then
            table.insert(data.knots[currentKnot].steps, {
                type = "divert",
                target = trim(divertTarget)
            })
            pendingTags = {}
            goto continue
        end

        local varOp, opSign, valStr = line:match("^~%s*(%w+)%s*([%+%-]?=)%s*(.+)$")
        if varOp then
            local val = trim(valStr)
            if val:match("^%-?%d+$") or val:match("^%-?%d+%.%d*$") then
                val = tonumber(val)
            end
            local operation = nil
            if opSign == "+=" then operation = "add"
            elseif opSign == "-=" then operation = "sub"
            end
            table.insert(data.knots[currentKnot].steps, {
                type = "set",
                var = varOp,
                value = val,
                operation = operation
            })
            pendingTags = {}
            goto continue
        end

        local varName, varVal = line:match("^VAR%s+(%w+)%s*=%s*(.+)$")
        if varName then
            local val = trim(varVal)
            if val:match("^%-?%d+$") or val:match("^%-?%d+%.%d*$") then
                val = tonumber(val)
            end
            data.variables[varName] = val
            goto continue
        end

        if line:sub(1, 1) == "*" then
            local cond, text, target = line:match("^%*\s*%[([^%]]*)%]%s*(.-)%s*%-%>%s*(%S+)$")
            if not text then
                text, target = line:match("^%*%s*(.-)%s*%-%>%s*(%S+)$")
            end
            if not text then
                cond, text = line:match("^%*\s*%[([^%]]*)%]%s*(.*)$")
            end
            if not text then
                text = line:match("^%*%s*(.*)$")
            end
            local condition = cond and trim(cond) or nil
            if condition == "" then condition = nil end
            text = text and trim(text) or ""
            target = target and trim(target) or nil
            if not target then
                text = text:gsub("%-%>%s*.+", "")
                text = trim(text)
            end
            local tagCopy = {}
            for t = 1, #pendingTags do tagCopy[t] = pendingTags[t] end
            table.insert(data.knots[currentKnot].steps, {
                type = "choice",
                text = text,
                condition = condition,
                target = target,
                tags = (#tagCopy > 0) and tagCopy or nil
            })
            pendingTags = {}
            goto continue
        end

        local tagCopy = {}
        for t = 1, #pendingTags do tagCopy[t] = pendingTags[t] end
        table.insert(data.knots[currentKnot].steps, {
            type = "text",
            text = line,
            tags = (#tagCopy > 0) and tagCopy or nil
        })
        pendingTags = {}

        ::continue::
    end

    return data
end
