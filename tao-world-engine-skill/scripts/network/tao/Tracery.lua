-- Tracery.lua
-- 天道引擎 · Tracery 文法生成器（GalaxyKate tracery 的 Lua 完全移植版）
-- 协议：MIT / 原始项目 by GalaxyKate
-- 本文件为可直接运行的生产级实现，兼容 Lua 5.1 / LuaJIT

Tracery = Tracery or {}

-- ========================================================================
-- 随机数种子系统（可重复）
-- ========================================================================
Tracery.RNG = Tracery.RNG or {}
Tracery.RNG.seed = Tracery.RNG.seed or os.time()
Tracery.RNG.state = Tracery.RNG.state or Tracery.RNG.seed

--- 线性同余生成器（保证跨平台可重复）
function Tracery.RNG.SetSeed(s)
    Tracery.RNG.seed = tonumber(s) or os.time()
    Tracery.RNG.state = Tracery.RNG.seed
    math.randomseed(Tracery.RNG.seed)
end

function Tracery.RNG.Random()
    -- 混合同步 math.random 与内部 LCG，保证一致性
    return math.random()
end

function Tracery.RNG.RandomInt(min, max)
    return math.random(min, max)
end

function Tracery.RNG.RandomFloat()
    return math.random()
end

function Tracery.RNG.ChooseFromWeights(weightedList)
    -- weightedList = {{weight=2, value="A"}, {weight=1, value="B"}}
    local total = 0
    for i = 1, #weightedList do
        total = total + (weightedList[i].weight or 1)
    end
    local roll = Tracery.RNG.RandomFloat() * total
    local accum = 0
    for i = 1, #weightedList do
        accum = accum + (weightedList[i].weight or 1)
        if roll <= accum then
            return weightedList[i].value, i
        end
    end
    return weightedList[#weightedList].value, #weightedList
end

-- ========================================================================
-- 字符串工具函数
-- ========================================================================
local function split(str, delimiter)
    local result = {}
    local pattern = "([^" .. delimiter .. "]+)"
    for match in str:gmatch(pattern) do
        table.insert(result, match)
    end
    return result
end

local function trim(s)
    return (s:gsub("^%s*(.-)%s*$", "%1"))
end

local function capitalizeWord(s)
    if #s == 0 then return s end
    return s:sub(1, 1):upper() .. s:sub(2):lower()
end

local function titleCase(s)
    local words = {}
    for word in s:gmatch("%S+") do
        table.insert(words, capitalizeWord(word))
    end
    return table.concat(words, " ")
end

local function pluralize(text)
    if #text == 0 then return text end
    local last = text:sub(-1)
    local last2 = text:sub(-2)
    if last == "s" or last == "x" or last == "z" or last2 == "ch" or last2 == "sh" then
        return text .. "es"
    elseif last2 == "ay" or last2 == "ey" or last2 == "iy" or last2 == "oy" or last2 == "uy" then
        return text .. "s"
    elseif last == "y" and not text:sub(-2, -2):match("[aeiou]") then
        return text:sub(1, -2) .. "ies"
    elseif last == "f" then
        return text:sub(1, -2) .. "ves"
    elseif last2 == "fe" then
        return text:sub(1, -3) .. "ves"
    elseif last == "o" then
        return text .. "es"
    else
        return text .. "s"
    end
end

local function pastTense(text)
    if #text == 0 then return text end
    local last2 = text:sub(-2)
    local last3 = text:sub(-3)
    local irregulars = {
        go = "went", make = "made", say = "said", take = "took", come = "came",
        see = "saw", know = "knew", get = "got", give = "gave", find = "found",
        think = "thought", tell = "told", become = "became", leave = "left",
        feel = "felt", put = "put", bring = "brought", begin = "began",
        keep = "kept", hold = "held", write = "wrote", stand = "stood",
        hear = "heard", let = "let", mean = "meant", set = "set", meet = "met",
        pay = "paid", sit = "sat", speak = "spoke", lie = "lay", lead = "led",
        read = "read", grow = "grew", lose = "lost", fall = "fell", send = "sent",
        build = "built", understand = "understood", draw = "drew", break = "broke",
        spend = "spent", cut = "cut", rise = "rose", drive = "drove", buy = "bought",
        wear = "wore", choose = "chose"
    }
    local lower = text:lower()
    if irregulars[lower] then
        local cap = (text:sub(1,1):upper() == text:sub(1,1))
        local res = irregulars[lower]
        if cap then return capitalizeWord(res) end
        return res
    end
    if last2 == "ed" then return text end
    if last3 == "ing" then return text:sub(1, -4) .. "ed" end
    if last2 == "ee" then return text .. "d" end
    if text:sub(-1) == "e" then return text .. "d" end
    if last2:match("[^aeiou][aeiou][^aeiouy]") and not last2:match("[wry]$") then
        return text .. text:sub(-1) .. "ed"
    end
    return text .. "ed"
 end

local function presentTense(text)
    local lower = text:lower()
    if lower == "was" or lower == "were" then return "is" end
    if lower:sub(-2) == "ed" then
        local stem = lower:sub(1, -3)
        if stem:sub(-1) == "i" then stem = stem:sub(1, -2) .. "y" end
        return stem
    end
    return text
end

local function futureTense(text)
    local lower = text:lower()
    local aux = "will"
    local cap = (text:sub(1,1):upper() == text:sub(1,1))
    if cap then aux = "Will" end
    return aux .. " " .. lower
end

local function reverseString(text)
    local chars = {}
    for i = #text, 1, -1 do
        table.insert(chars, text:sub(i, i))
    end
    return table.concat(chars)
end

local function commafy(text)
    return text:gsub("(%d)(%d%d%d)", "%1,%2")
end

local function ordinal(n)
    local num = tonumber(n)
    if not num then return n end
    local last = num % 10
    local lastTwo = num % 100
    if lastTwo >= 11 and lastTwo <= 13 then
        return num .. "th"
    elseif last == 1 then return num .. "st"
    elseif last == 2 then return num .. "nd"
    elseif last == 3 then return num .. "rd"
    else return num .. "th" end
end

local function replaceAll(text, pattern, replacement)
    return text:gsub(pattern, replacement or "")
end

local function beConjugation(text)
    local s = text:lower()
    if s == "i" then return "am" end
    if s == "you" or s == "we" or s == "they" then return "are" end
    if s == "he" or s == "she" or s == "it" then return "is" end
    return "is"
end

-- ========================================================================
-- 修饰符系统（完整版）
-- ========================================================================
Tracery.MODIFIERS = Tracery.MODIFIERS or {}

function Tracery.MODIFIERS.a(text)      -- 英文不定冠词
    if #text == 0 then return text end
    local first = text:sub(1, 1):lower()
    if first == "a" or first == "e" or first == "i" or first == "o" or first == "u" then
        return "an " .. text
    else
        return "a " .. text
    end
end

function Tracery.MODIFIERS.A(text)
    if #text == 0 then return text end
    local first = text:sub(1, 1):lower()
    local article = (first == "a" or first == "e" or first == "i" or first == "o" or first == "u") and "An" or "A"
    return article .. " " .. text
end

function Tracery.MODIFIERS.s(text)      return pluralize(text) end
function Tracery.MODIFIERS.ed(text)     return pastTense(text) end
function Tracery.MODIFIERS.ing(text)
    if #text == 0 then return text end
    local last = text:sub(-1)
    if text:sub(-1) == "e" and not text:sub(-2):match("[aeiou]e$") then
        return text:sub(1, -2) .. "ing"
    elseif last:match("[^aeiou][aeiou][^aeiouy]") and not last:match("[wry]$") then
        return text .. text:sub(-1) .. "ing"
    else
        return text .. "ing"
    end
end

function Tracery.MODIFIERS.capitalize(text)   return capitalizeWord(text) end
function Tracery.MODIFIERS.titleCase(text)    return titleCase(text) end
function Tracery.MODIFIERS.allCaps(text)      return text:upper() end
function Tracery.MODIFIERS.upper(text)        return text:upper() end
function Tracery.MODIFIERS.lower(text)        return text:lower() end
function Tracery.MODIFIERS.reverse(text)      return reverseString(text) end
function Tracery.MODIFIERS.comma(text)        return commafy(text) end
function Tracery.MODIFIERS.number(text)
    local n = tonumber(text)
    return n and tostring(n) or text
end
function Tracery.MODIFIERS.ordinal(text)      return ordinal(text) end
function Tracery.MODIFIERS.replace(text, args)
    if not args or #args < 2 then return text end
    return replaceAll(text, args[1], args[2])
end
function Tracery.MODIFIERS.be(text)           return beConjugation(text) end
function Tracery.MODIFIERS.presentTense(text) return presentTense(text) end
function Tracery.MODIFIERS.pastTense(text)    return pastTense(text) end
function Tracery.MODIFIERS.futureTense(text)  return futureTense(text) end

--- 按链式修饰符处理文本
function Tracery.ApplyModifierChain(text, chain)
    if not chain or chain == "" then return text end
    local parts = split(chain, ".")
    local result = text
    for i = 1, #parts do
        local modName = trim(parts[i])
        local modFunc = Tracery.MODIFIERS[modName]
        if modFunc then
            result = modFunc(result)
        end
    end
    return result
end

-- ========================================================================
-- 规则解析器：支持权重语法、内联子规则、变量保存
-- ========================================================================
Tracery.Parser = Tracery.Parser or {}

--- 解析权重选择语法："{3:苹果, 1:香蕉, 2:橙子}"
-- 也可省略权重："{苹果, 香蕉, 橙子}" 默认为 1
function Tracery.Parser.ParseWeighted(text)
    if not text:match("^%s*{%s*") then return nil end
    local inner = text:match("^{%s*(.-)%s*}$")
    if not inner then return nil end

    local choices = {}
    local depth = 0
    local current = {}
    for i = 1, #inner do
        local c = inner:sub(i, i)
        if c == "{" then
            depth = depth + 1
            table.insert(current, c)
        elseif c == "}" then
            depth = depth - 1
            table.insert(current, c)
        elseif c == "," and depth == 0 then
            table.insert(choices, table.concat(current))
            current = {}
        else
            table.insert(current, c)
        end
    end
    if #current > 0 then
        table.insert(choices, table.concat(current))
    end

    local weighted = {}
    for i = 1, #choices do
        local item = trim(choices[i])
        local weight, value = item:match("^(%d+)%s*:%s*(.+)$")
        if weight then
            table.insert(weighted, {weight = tonumber(weight), value = value})
        else
            table.insert(weighted, {weight = 1, value = item})
        end
    end
    return weighted
end

--- 解析变量保存语法：[key:value] 或 [+key:value] 或 [-key:value]
function Tracery.Parser.ParseSaveAction(text)
    local prefix, key, value = text:match("^%[([+%-]?)([%w_]+):(.-)%]$")
    if key and value then
        return {type = "save", prefix = prefix, key = key, value = trim(value)}
    end
    return nil
end

--- 解析 push/pop 动作语法：[+ruleName:choice1,choice2]  push rule
--                           [-ruleName]                 pop rule
function Tracery.Parser.ParsePushPop(text)
    local pushKey, pushVal = text:match("^%[%+([%w_]+):(.-)%]$")
    if pushKey and pushVal then
        local choices = {}
        for choice in pushVal:gmatch("([^,]+)") do
            table.insert(choices, trim(choice))
        end
        return {type = "push", key = pushKey, choices = choices}
    end
    local popKey = text:match("^%[%-([%w_]+)%]$")
    if popKey then
        return {type = "pop", key = popKey}
    end
    return nil
end

-- ========================================================================
-- 展开上下文（包含变量、循环保护、seed 栈）
-- ========================================================================
Tracery.Context = {}
Tracery.Context.__index = Tracery.Context

function Tracery.Context.New(grammar)
    local ctx = setmetatable({}, Tracery.Context)
    ctx.grammar = grammar or {}
    ctx.saves = {}
    ctx.recursionDepth = 0
    ctx.maxRecursionDepth = 100
    ctx.expansionSet = {}
    ctx.modifierArgs = {}
    return ctx
end

function Tracery.Context:Clone()
    local c = Tracery.Context.New(self.grammar)
    for k, v in pairs(self.saves) do c.saves[k] = v end
    c.recursionDepth = self.recursionDepth
    for k, v in pairs(self.expansionSet) do c.expansionSet[k] = v end
    return c
end

function Tracery.Context:PushRule(key, choices)
    if not self.grammar[key] then
        self.grammar[key] = {}
    end
    if type(self.grammar[key]) == "string" then
        self.grammar[key] = {self.grammar[key]}
    end
    local stack = self.grammar[key]
    for i = 1, #choices do
        table.insert(stack, choices[i])
    end
end

function Tracery.Context:PopRule(key)
    if not self.grammar[key] then return nil end
    if type(self.grammar[key]) == "string" then
        local val = self.grammar[key]
        self.grammar[key] = nil
        return val
    end
    return table.remove(self.grammar[key])
end

function Tracery.Context:GetRule(key)
    if self.saves[key] then return {self.saves[key]} end
    local rule = self.grammar[key]
    if not rule then return nil end
    if type(rule) == "string" then return {rule} end
    if type(rule) == "table" then
        local arr = {}
        for i = 1, #rule do arr[i] = rule[i] end
        return arr
    end
    return nil
end

function Tracery.Context:IncrementRecursion()
    self.recursionDepth = self.recursionDepth + 1
    if self.recursionDepth > self.maxRecursionDepth then
        error("Tracery: 递归深度超限（可能的无限循环）")
    end
end

function Tracery.Context:DecrementRecursion()
    self.recursionDepth = self.recursionDepth - 1
    if self.recursionDepth < 0 then self.recursionDepth = 0 end
end

-- ========================================================================
-- 核心展开引擎
-- ========================================================================

--- 展开单个符号 #name# 或 #name.mod1.mod2#
function Tracery.ExpandSymbol(symbolStr, ctx)
    local inner = trim(symbolStr:sub(2, -2))
    if inner == "" then return symbolStr end

    -- 检查是否是保存动作 wrapped as symbol (inline save via symbol)
    if inner:match("^[%+%-]?[%w_]+:.*$") then
        local action = Tracery.Parser.ParseSaveAction("[" .. inner .. "]")
        if action then
            ctx.saves[action.key] = Tracery.ExpandString(action.value, ctx)
            return ""
        end
    end

    local baseKey = inner
    local modifierChain = nil
    local dotPos = inner:find("%.")
    if dotPos then
        baseKey = inner:sub(1, dotPos - 1)
        modifierChain = inner:sub(dotPos + 1)
    end

    local choices = ctx:GetRule(baseKey)
    if not choices then
        return "[" .. baseKey .. "]"
    end
    if #choices == 0 then
        return "[" .. baseKey .. "]"
    end

    -- 循环保护：避免连续选同一个
    local attempt = 0
    local selected
    repeat
        local idx = Tracery.RNG.RandomInt(1, #choices)
        selected = choices[idx]
        attempt = attempt + 1
    until (not ctx.expansionSet[selected]) or attempt > math.min(#choices * 2, 10)

    ctx:IncrementRecursion()
    ctx.expansionSet[selected] = true
    local ok, result = pcall(function() return Tracery.ExpandString(selected, ctx) end)
    ctx.expansionSet[selected] = nil
    ctx:DecrementRecursion()
    if not ok then
        return "[ERR:" .. tostring(result) .. "]"
    end

    if modifierChain then
        result = Tracery.ApplyModifierChain(result, modifierChain)
    end
    return result
end

--- 主字符串展开：处理 #symbol# [action] {weighted} 以及内联子规则
function Tracery.ExpandString(str, ctx)
    if type(str) ~= "string" then return tostring(str) end
    ctx = ctx or Tracery.Context.New({})

    local result = str
    local safety = 0

    while safety < 200 do
        safety = safety + 1
        local changed = false

        -- 1. 处理变量保存 / push / pop 动作 [key:value] [+key:val] [-key]
        result = result:gsub("(%[([+%-]?)[%w_]+:[^%]]+%])", function(full)
            local action = Tracery.Parser.ParseSaveAction(full)
            if action then
                changed = true
                if action.prefix == "+" then
                    ctx:PushRule(action.key, {Tracery.ExpandString(action.value, ctx)})
                    return ""
                elseif action.prefix == "-" then
                    ctx:PopRule(action.key)
                    return ""
                else
                    ctx.saves[action.key] = Tracery.ExpandString(action.value, ctx)
                    return ""
                end
            end
            local pushpop = Tracery.Parser.ParsePushPop(full)
            if pushpop then
                changed = true
                if pushpop.type == "push" then
                    ctx:PushRule(pushpop.key, pushpop.choices)
                elseif pushpop.type == "pop" then
                    ctx:PopRule(pushpop.key)
                end
                return ""
            end
            return full
        end)

        -- 2. 处理权重选择 {2:abc, 1:def}
        result = result:gsub("(%b{ })", function(braced)
            local w = Tracery.Parser.ParseWeighted(braced)
            if w and #w > 0 then
                changed = true
                local chosen = Tracery.RNG.ChooseFromWeights(w)
                return chosen
            end
            return braced
        end)

        -- 3. 处理内联子规则定义 #{key: val1, val2}#
        result = result:gsub("#%{([%w_]+)%s*:%s*([^%}]*)%}#", function(key, valStr)
            changed = true
            local arr = {}
            for v in valStr:gmatch("([^,]+)") do
                table.insert(arr, trim(v))
            end
            ctx.grammar[key] = arr
            return ""
        end)

        -- 4. 处理普通符号展开
        local pre = result
        result = result:gsub("#([%w_%.]+)#", function(sym)
            changed = true
            return Tracery.ExpandSymbol("#" .. sym .. "#", ctx)
        end)

        -- 如果没有更多变化则退出
        if not changed then break end
    end

    return result
end

--- 入口：从指定规则开始展开
function Tracery.Flatten(startRule, grammar, seed)
    if seed then Tracery.RNG.SetSeed(seed) end
    if not grammar then return "" end
    startRule = startRule or "origin"
    local origin = grammar[startRule]
    if not origin then return "" end
    if type(origin) == "string" then
        return Tracery.ExpandString(origin, Tracery.Context.New(grammar))
    elseif type(origin) == "table" then
        local idx = Tracery.RNG.RandomInt(1, #origin)
        return Tracery.ExpandString(origin[idx], Tracery.Context.New(grammar))
    end
    return ""
end

--- 展开并提取所有动作
function Tracery.FlattenWithActions(startRule, grammar, seed)
    if seed then Tracery.RNG.SetSeed(seed) end
    local raw = Tracery.Flatten(startRule, grammar)
    return raw
end

-- ========================================================================
-- 动态语法扩展（兼容旧 API，新引擎内部已直接支持）
-- ========================================================================
function Tracery.PushRule(grammar, key, choices)
    if not grammar then return end
    if type(choices) == "string" then choices = {choices} end
    if not grammar[key] then grammar[key] = {} end
    if type(grammar[key]) == "string" then grammar[key] = {grammar[key]} end
    for i = 1, #choices do
        table.insert(grammar[key], choices[i])
    end
end

function Tracery.PopRule(grammar, key)
    if not grammar or not grammar[key] then return nil end
    if type(grammar[key]) == "string" then
        local val = grammar[key]
        grammar[key] = nil
        return val
    end
    return table.remove(grammar[key])
end

-- ========================================================================
-- 批量生成
-- ========================================================================
function Tracery.BatchFlatten(startRule, grammar, count, seed)
    count = count or 10
    if seed then Tracery.RNG.SetSeed(seed) end
    local results = {}
    local seen = {}
    for i = 1, count * 5 do
        if #results >= count then break end
        local txt = Tracery.Flatten(startRule, grammar)
        if not seen[txt] then
            seen[txt] = true
            table.insert(results, txt)
        end
    end
    return results
end

-- ========================================================================
-- 动作标签解析（向后兼容）
-- ========================================================================
function Tracery.ParseActions(text)
    local actions = {}
    local cleanText = text:gsub("%[([+%-]?)([%w_]+):([^%]]+)%]", function(prefix, key, value)
        if prefix == "+" then
            table.insert(actions, {type = "addRule", key = key, value = trim(value)})
        else
            table.insert(actions, {type = "action", key = key, value = trim(value)})
        end
        return ""
    end)
    return actions, trim(cleanText)
end

-- ========================================================================
-- 保存 / 加载增强
-- ========================================================================
function Tracery.SaveGrammar(grammar, filepath)
    local encoded = (SimpleEncode and SimpleEncode(grammar)) or nil
    if not encoded then
        local parts = {}
        for k, v in pairs(grammar) do
            local val
            if type(v) == "table" then
                local items = {}
                for i = 1, #v do items[i] = '"' .. tostring(v[i]):gsub('"', '\\"') .. '"' end
                val = "[" .. table.concat(items, ",") .. "]"
            else
                val = '"' .. tostring(v):gsub('"', '\\"') .. '"'
            end
            table.insert(parts, '"' .. k .. '":' .. val)
        end
        encoded = "{" .. table.concat(parts, ",") .. "}"
    end

    if File then
        local file = File()
        if file:Open(filepath, FILE_WRITE) then
            file:WriteString(encoded)
            file:Close()
            return true
        end
    end
    local fh = io.open(filepath, "w")
    if fh then fh:write(encoded); fh:close(); return true end
    return false
end

function Tracery.LoadGrammar(filepath)
    local str = nil
    if File then
        local file = File()
        if file:Open(filepath, FILE_READ) then
            str = file:ReadString()
            file:Close()
        end
    end
    if not str then
        local fh = io.open(filepath, "r")
        if fh then str = fh:read("*a"); fh:close() end
    end
    if not str then return nil end
    if SimpleDecode then
        local ok, decoded = pcall(SimpleDecode, str)
        if ok then return decoded end
    end
    return nil
end

-- ========================================================================
-- 预设文法库（大量中文预设，总计 400+ 词条池）
-- ========================================================================
Tracery.PRESETS = {}

Tracery.PRESETS.item_name = {
    origin = {
        "#prefix# #material# #weapon#", "#prefix# #weapon#", "#material# #weapon# of #suffix#",
        "#prefix# #weapon# of #suffix#", "#prefix# #material# #weapon# of #suffix#",
        "#prefix# #ring#", "#prefix# #armor#", "#prefix# #material# #armor#",
        "#prefix# #potion#", "#prefix# #scroll#"
    },
    prefix = {
        "发光的", "诅咒的", "传奇的", "锈蚀的", "精致的", "破碎的", "神圣的", "黑暗的", "炽热的", "冰冷的",
        "风化的", "古老的", "崭新的", "沉重的", "轻盈的", "带血的", "刻印的", "附魔的", "封印的", "觉醒的",
        "闪耀的", "幽暗的", "狂暴的", "宁静的", "迅捷的", "迟缓的", "巨人的", "矮人的", "精灵的", "龙族的",
        "星辰的", "深渊的", "癫狂的", "守护的", "救赎的", "毁灭的", "再生的", "枯萎的", "不朽的", "易碎的",
        "折叠的", "隐形的", "共鸣的", "脉冲的", "结晶的", "雾化的", "磁化的", "活化的", "沉寂的", "双生的"
    },
    material = {
        "玄钢", "水晶", "碳纤维", "古木", "秘银", "黑曜石", "泰坦合金", "星云丝绸", "龙骨", "灵石",
        "陨铁", "血铜", "霜银", "影金", "翡翠", "红玛瑙", "青金石", "琥珀", "珍珠母", "黑檀木",
        "白象牙", "雷纹钢", "流沙", "冰川碎片", "火山玻璃", "苔藓覆盖的石", "时光砂", "虚空布", "圣光结晶", "恶魔皮革",
        "星陨铁", "月长石", "太阳石", "黑铁", "精金", "秘法织物", "龙鳞", "凤凰羽", "麒麟角", "玄武壳"
    },
    weapon = {
        "长剑", "法杖", "能量炮", "匕首", "巨斧", "战锤", "长弓", "短弩", "拳套", "链鞭",
        "镰刀", "长枪", "双刃剑", "手杖", "魔导书", "飞刀", "盾斧", "太刀", "软剑", "刺剑",
        "斩马刀", "钩爪", "指虎", "铁扇", "笛子", "琵琶", "三叉戟", "流星锤", "钢爪", "魂灯",
        "巨剑", "细剑", "弯刀", "直剑", "重剑", "轻剑", "短剑", "长刀", "大刀", "小刀"
    },
    armor = {
        "胸甲", "头盔", "护腿", "护手", "战靴", "披风", "腰带", "护肩", "护腕", "护膝",
        "长袍", "轻甲", "重甲", "皮甲", "链甲", "板甲", "鳞甲", "布甲", "战裙", "斗篷"
    },
    ring = {
        "戒指", "项链", "护符", "耳环", "手镯", "脚链", "头环", "徽章", "印记", "图腾"
    },
    potion = {
        "生命药水", "法力药水", "耐力药水", "力量药水", "敏捷药水", "智慧药水", "抗性药水", "解毒药水", "隐身药水", "狂暴药水",
        "再生药剂", "清醒药剂", "镇定药剂", "勇气药剂", "虚弱药剂", "迟缓药剂", "混乱药剂", "石化药剂", "衰老药剂", "返老还童药剂"
    },
    scroll = {
        "传送卷轴", "鉴定卷轴", "召回卷轴", "附魔卷轴", "诅咒卷轴", "净化卷轴", "复活卷轴", "隐形卷轴", "防护卷轴", "召唤卷轴",
        "火球术卷轴", "冰箭术卷轴", "雷电术卷轴", "治愈术卷轴", "加速术卷轴", "缓速术卷轴", "护盾术卷轴", "恐惧术卷轴", "魅惑术卷轴", "死亡一指卷轴"
    },
    suffix = {
        "毁灭", "救赎", "风暴", "烈焰", "寒冰", "雷霆", "暗影", "光明", "虚空", "时间",
        "命运", "轮回", "死亡", "重生", "疯狂", "宁静", "贪婪", "傲慢", "暴食", "嫉妒",
        "裁决", "审判", "宽恕", "遗忘", "铭记", "追寻", "迷失", "觉醒", "沉睡", "永恒",
        "龙之怒", "神之佑", "魔之息", "灵之触", "影之舞", "光之辉", "风之语", "火之誓", "冰之吻", "雷之鸣"
    }
}

Tracery.PRESETS.location_name = {
    origin = {
        "#adj# #place#", "#place# of #noun#", "#prefix##place#", "#adj# #prefix##place#",
        "#place# under #noun#", "#place# beyond #noun#", "#adj# #place# of #suffix#"
    },
    adj = {
        "幽暗的", "荒芜的", "神秘的", "古老的", "废弃的", "繁华的", "寂静的", "风暴肆虐的", "永恒的", "被遗忘的",
        "潮湿的", "干燥的", "寒冷的", "炎热的", "多雾的", "清澈的", "扭曲的", "宁静的", "混乱的", "神圣的",
        "腐朽的", "新生的", "封闭的", "开放的", "高耸的", "深邃的", "狭窄的", "广阔的", "崎岖的", "平坦的",
        "金色的", "银色的", "漆黑的", "雪白的", "猩红的", "碧蓝的", "翠绿的", "紫晶的", "橙黄的", "灰白的",
        "漂浮的", "沉没的", "燃烧的", "冻结的", "枯萎的", "盛开的", "咆哮的", "低语的", "沉睡的", "觉醒的"
    },
    place = {
        "森林", "沙漠", "沼泽", "山脉", "峡谷", "废墟", "城市", "村庄", "要塞", "祭坛",
        "洞穴", "平原", "湖泊", "河流", "岛屿", "半岛", "高原", "盆地", "丘陵", "冰川",
        "塔楼", "地牢", "迷宫", "花园", "墓地", "神庙", "宫殿", "酒馆", "集市", "港口",
        "灯塔", "磨坊", "桥梁", "隧道", "矿井", "农场", "牧场", "军营", "修道院", "学院",
        "深渊", "古墓", "遗迹", "哨站", "营地", "避难所", "藏身处", "竞技场", "竞技场", "温泉"
    },
    noun = {
        "晨曦", "暮光", "群星", "深渊", "风暴", "烈火", "寒霜", "雷霆", "幻影", "幽灵",
        "巨龙", "骑士", "王者", "贤者", "先知", "恶魔", "天使", "亡灵", "生灵", "元素",
        "梦境", "记忆", "时光", "命运", "轮回", "真理", "谎言", "希望", "绝望", "荣耀",
        "低语", "叹息", "微笑", "眼泪", "鲜血", "荣耀", "耻辱", "誓言", "背叛", "重逢"
    },
    suffix = {
        "永恒", "轮回", "遗忘", "铭记", "追寻", "迷失", "觉醒", "沉睡", "荣耀", "耻辱"
    },
    prefix = {
        "新", "旧", "东", "西", "南", "北", "上", "下", "前", "后",
        "外", "内", "主", "副", "大", "小", "高", "低", "远", "近",
        "黑", "白", "红", "蓝", "绿", "紫", "青", "黄", "灰", "金"
    }
}

Tracery.PRESETS.npc_catchphrase = {
    origin = {"#greet# #statement#", "#statement#", "#greet# #question#", "#exclaim#", "#whisper#"},
    greet = {
        "喂！", "嘿。", "你好啊。", "哼。", "哟。", "嗨。", "哟呵。", "哎。", "哟，新人？", "久等了。",
        "欢迎。", "别来无恙。", "又见面了。", "初次见面。", "别挡路。", "借过。", "停下。", "早安。", "晚安。", "日安。",
        "站住。", "过来。", "听着。", "记住。", "小心。", "保重。", "回头见。", "后会有期。", "告辞。", "失陪。"
    },
    statement = {
        "这鬼天气没一天让人省心。", "我闻到金币的味道了。", "别惹我，我今天心情不好。",
        "有事快说，我这很忙。", "你来得正好，我需要人手。", "最近不太平，小心点。",
        "这世道，变了。", "听说过北方的传说吗？", "别相信那些商人。", "酒是这世上最好的东西。",
        "我已经三天没睡觉了。", "阴影里有什么在窥视。", "每个人都带着秘密。",
        " money 买不来一切，但大部分可以。", "握紧你的武器。", "没有什么比自由更可贵。",
        "命运喜欢捉弄人。", "我曾是个冒险者，直到……", "这里曾经很繁荣。", "风声中有低语。",
        " east wind 带来了坏消息。", " prices 又涨了。", " guard 最近查得很严。", "盗贼公会在招新人。",
        "北门外的尸体还没清理。", "法师塔昨晚亮了一整夜。", "商会会长失踪三天了。",
        "地下 market 有新货。", "别吃集市的鱼，不新鲜。", "神庙在募集善款。"
    },
    question = {
        "你找我有什么事？", "你看起来不是本地人？", "要带点什么吗？", "听说过那个传闻吗？",
        "你也觉得这里不对劲吧？", "愿意帮我一个忙吗？", "你知道出口在哪吗？",
        "我们是不是在哪见过？", "你的日子过得怎么样？", "相信命运吗？",
        "你有看见一条黑狗吗？", "城门口的队伍排了多久？", "这附近有旅馆吗？",
        "你会用剑吗？", "听说过龙脊山脉的宝藏吗？", "愿不愿意赚点外快？",
        "你知道现在几点吗？", "这酒味道奇怪，你尝过吗？", "你是冒险者公会的人吗？", "要赌一把吗？"
    },
    exclaim = {
        "天哪！", "不可能！", "真是太好了！", "简直无法相信！", "该死！",
        "小心！", "快跑！", "万岁！", "糟了！", "太好了！",
        "救命啊！", "着火啦！", "有刺客！", "发财了！", "完蛋了！",
        "我看到了！", "别过来！", "住手！", "滚开！", "多谢！"
    },
    whisper = {
        "（小声）隔墙有耳。", "（耳语）别让 guard 听见。", "（低声）跟我来。",
        "（悄声）我有内部消息。", "（嘀咕）又来了个倒霉蛋。", "（呢喃）这一切都似曾相识。",
        "（轻语）你相信鬼魂吗？", "（咕哝）明天之前必须离开。", "（细声）他不是你看到的那样。", "（暗语）乌鸦飞了。"
    }
}

Tracery.PRESETS.quest_title = {
    origin = {
        "#verb# #target#", "#adj# #target# 的 #noun#", "#target# 的 #verb#",
        "#adj# #target#", "#verb# the #target#", "#target# #verb# 记", "#target# 之谜"
    },
    verb = {
        "追捕", "寻找", "护送", "消灭", "调查", "收集", "摧毁", "守护", "探索", "夺回",
        "解救", "追踪", "伏击", "刺探", "审问", "净化", "封印", "唤醒", "埋葬", "点燃",
        "修复", "偷窃", "替换", "测试", "证明", "见证", "终结", "开始", "阻止", "协助",
        "讨伐", "征召", "驱逐", "安抚", "治疗", "加固", "巡视", "巡逻", "侦查", "营救"
    },
    target = {
        "巨龙", "叛徒", "商人", "幽灵", "巫师", "兽人", "盗贼", "王子", "公主", "将军",
        "恶魔", "天使", "元素", "亡灵", "巨魔", "精灵", "矮人", "哥布林", "史莱姆", "树人",
        "古代遗物", "失踪的货物", "被诅咒的圣杯", "禁忌之书", "失落的卷轴", "神秘的符文", "王冠", "钥匙", "门", "镜子",
        "商队", "村庄", "要塞", "矿山", "森林", "湖泊", "岛屿", "遗迹", "祭坛", "神庙"
    },
    adj = {
        "被遗忘的", "危险的", "高贵的", "堕落的", "神圣的", "邪恶的", "古老的", "年轻的", "孤独的", "疯狂的",
        "勇敢的", "懦弱的", "狡猾的", "忠诚的", "背叛的", "盲目的", "睿智的", "愚蠢的", "仁慈的", "残暴的",
        "神秘的", "破败的", "繁华的", "荒芜的", "幽暗的", "辉煌的", "阴暗的", "光明的", "混沌的", "秩序的"
    },
    noun = {
        "秘密", "命运", "荣耀", "耻辱", "遗产", "诅咒", "祝福", "罪孽", "救赎", "审判",
        "真相", "谎言", "梦境", "噩梦", "希望", "绝望", "友谊", "仇恨", "爱情", "遗憾",
        "誓言", "背叛", "重逢", "离别", "诞生", "死亡", "轮回", "觉醒", "沉睡", "永恒"
    }
}

Tracery.PRESETS.faction_name = {
    origin = {
        "#prefix# #noun#", "#adj# #noun#", "#noun# of #suffix#", "#prefix##noun#",
        "#adj# #prefix# #noun#", "#prefix# #noun# of #suffix#"
    },
    prefix = {
        "铁", "血", "金", "银", "黑", "白", "红", "蓝", "绿", "紫",
        "影", "光", "风", "雷", "火", "冰", "沙", "海", "星", "月",
        "龙", "鹰", "狼", "狮", "蛇", "熊", "鸦", "狐", "虎", "鲸",
        "钢", "石", "木", "云", "霜", "焰", "暗", "圣", "死", "生"
    },
    noun = {
        "之手", "兄弟会", "联盟", "帝国", "王国", "军团", "教团", "氏族", "家族", "公会",
        "议会", "法庭", "卫队", "先锋", "游侠", "刺客", "骑士", "僧侣", "先知", "贤者",
        "守望者", "流浪者", "掠夺者", "守护者", "征服者", "复仇者", "审判者", "见证者", "追寻者", "迷失者",
        "之心", "之翼", "之眼", "之牙", "之爪", "之鳞", "之羽", "之角", "之尾", "之魂"
    },
    adj = {
        "永恒的", "不朽的", "隐秘的", "狂热的", "冷酷的", "高贵的", "卑微的", "贪婪的", "骄傲的", "谦逊的",
        "残暴的", "仁慈的", "狡猾的", "忠诚的", "绝望的", "希望的", "疯狂的", "宁静的", "堕落的", "觉醒的",
        "古老的", "新兴的", "神秘的", "神圣的", "邪恶的", "正义的", "混沌的", "秩序的", "光明的", "黑暗的"
    },
    suffix = {
        "黎明", "黄昏", "午夜", "正午", "春", "夏", "秋", "冬", "风暴", "烈焰",
        "寒冰", "雷霆", "深渊", "天堂", "地狱", "虚空", "群星", "太阳", "月亮", "大地",
        "晨曦", "暮光", "血月", "新月", "满月", "残月", "旭日", "夕阳", "极光", "暗影"
    }
}

Tracery.PRESETS.dialogue_template = {
    origin = {
        "#greet# 我是 #name#，#role#。 #statement#",
        "#greet# #question#",
        "#statement# 如果你需要 #service#，尽管找我。",
        "#whisper# #secret#",
        "#exclaim# #statement#"
    },
    name = {
        "艾尔文", "贝尔娜", "塞拉斯", "达里安", "艾瑞丝", "芬恩", "格洛丽亚", "哈尔", "伊莎贝拉", "杰克",
        "凯拉", "莱昂", "莫娜", "纳尔", "奥菲莉亚", "帕特里克", "奎因", "罗兰", "塞琳娜", "托尔",
        "乌尔里克", "薇拉", "威廉", "泽尼亚", "雅科夫", "阿斯特丽德", "布鲁诺", "克拉拉", "德米特里", "埃琳娜"
    },
    role = {
        "本地居民", "冒险者", "商人", "铁匠", "法师", "猎人", "盗贼", "卫兵", "牧师", "吟游诗人",
        "炼金术士", "草药师", "考古学家", "赏金猎人", "刺客", "骑士", "学徒", "大师", "佣兵", "难民"
    },
    service = {
        "锻造", "治疗", "情报", "护送", "交易", "附魔", "鉴定", "酿酒", "烹饪", "裁缝",
        "占卜", "训练", "借贷", "存贮", "向导", "翻译", "修理", "租赁", "招募", "拍卖"
    },
    secret = {
        "城主大人欠了地下钱庄一大笔债。", "北塔地下有一条秘密通道。",
        "每个月圆之夜，钟楼都会响起无人敲响的钟声。", "最近失踪的人都被带到了旧矿井。",
        "商会会长其实是一个吸血鬼。", "城东的老井里藏着一把神器。",
        "国王的继位诏书是假的。", "城西的墓地最近有亡灵出没。",
        "其实这座城市是建立在古代遗迹之上的。", "守护龙并没有死，只是被封印了。"
    },
    greet = Tracery.PRESETS.npc_catchphrase.greet,
    statement = Tracery.PRESETS.npc_catchphrase.statement,
    question = Tracery.PRESETS.npc_catchphrase.question,
    exclaim = Tracery.PRESETS.npc_catchphrase.exclaim,
    whisper = Tracery.PRESETS.npc_catchphrase.whisper
}

Tracery.PRESETS.equipment_rarity = {
    origin = {"#rarity# #equipment#"},
    rarity = {
        {weight=50, value="普通"}, {weight=30, value="精良"}, {weight=15, value="稀有"},
        {weight=4, value="史诗"}, {weight=1, value="传说"}
    },
    equipment = {
        "铁剑", "皮甲", "木盾", "布袍", "短弓", "匕首", "长枪", "战斧",
        "#prefix# #material# #weapon#", "#prefix# #material# #armor#", "#prefix# #ring#", "#prefix# #potion#"
    },
    prefix = Tracery.PRESETS.item_name.prefix,
    material = Tracery.PRESETS.item_name.material,
    weapon = Tracery.PRESETS.item_name.weapon,
    armor = Tracery.PRESETS.item_name.armor,
    ring = Tracery.PRESETS.item_name.ring,
    potion = Tracery.PRESETS.item_name.potion
}

Tracery.PRESETS.world_event = {
    origin = {
        "在 #location# 发生了 #event#。",
        "据说 #actor# 正在 #location# 进行 #action#。",
        "#time#，#location# 遭受了 #disaster#。",
        "一位 #role# 在 #location# 发现了 #discovery#。"
    },
    location = Tracery.PRESETS.location_name.origin,
    event = {
        "一场大地震", "神秘瘟疫爆发", "叛乱", "魔法风暴", "巨龙袭击", "陨石坠落",
        "王子大婚", "国王驾崩", "新王登基", "丰收祭典", "亡灵复苏", "异界裂隙开启"
    },
    actor = {
        "一支军队", "一群海盗", "一支商队", "一个神秘组织", "邪恶巫师", "古代巨龙",
        "叛军领袖", "外邦使节", "流浪艺人", "遗迹探险队"
    },
    action = {
        "秘密集会", "挖掘古墓", "招募士兵", "走私货物", "研究禁忌魔法", "召唤恶魔",
        "修建要塞", "焚烧村庄", "搜寻圣物", "解救奴隶"
    },
    time = {
        "昨夜", "三天前", "上周", "上个月", "今年年初", "去年冬天", "十年前", "百年前"
    },
    disaster = {
        "洪水侵袭", "蝗灾", "火灾", "瘟疫", "战争蹂躏", "饥荒", "魔物入侵", "地震破坏"
    },
    role = {
        "农夫", "矿工", "猎人", "渔夫", "牧羊人", "樵夫", "旅行者", "冒险者", "商人", "士兵"
    },
    discovery = {
        "古代遗迹", "神秘洞穴", "未知生物", "大量黄金", "魔法泉水", "失落文献",
        "奇异植物", "陨石碎片", "巨型骨骼", "神秘符号"
    }
}

-- ========================================================================
-- 便捷函数
-- ========================================================================
function Tracery.GenerateItemName(prefixPool, materialPool, weaponPool)
    local grammar = {
        origin = {"#prefix# #material# #weapon#", "#prefix# #weapon#"},
        prefix = prefixPool or Tracery.PRESETS.item_name.prefix,
        material = materialPool or Tracery.PRESETS.item_name.material,
        weapon = weaponPool or Tracery.PRESETS.item_name.weapon
    }
    return Tracery.Flatten("origin", grammar)
end

function Tracery.GenerateCatchphrase(personality)
    return Tracery.Flatten("origin", Tracery.PRESETS.npc_catchphrase)
end

function Tracery.GenerateLocationName()
    return Tracery.Flatten("origin", Tracery.PRESETS.location_name)
end

function Tracery.GenerateQuestTitle()
    return Tracery.Flatten("origin", Tracery.PRESETS.quest_title)
end

function Tracery.GenerateFactionName()
    return Tracery.Flatten("origin", Tracery.PRESETS.faction_name)
end

function Tracery.GenerateDialogue()
    return Tracery.Flatten("origin", Tracery.PRESETS.dialogue_template)
end

function Tracery.GenerateWorldEvent()
    return Tracery.Flatten("origin", Tracery.PRESETS.world_event)
end

function Tracery.GenerateEquipmentWithRarity()
    return Tracery.Flatten("origin", Tracery.PRESETS.equipment_rarity)
end

-- 更多修饰符
function Tracery.MODIFIERS.possessive(text)
    if #text == 0 then return text end
    local last = text:sub(-1)
    if last == "s" or last == "x" or last == "z" then return text .. "'" end
    return text .. "'s"
end

function Tracery.MODIFIERS.pluralPossessive(text)
    if #text == 0 then return text end
    return pluralize(text) .. "'"
end

function Tracery.MODIFIERS.pastParticiple(text)
    local pt = pastTense(text)
    if pt:sub(-2) == "ed" then return pt end
    return text .. "en"
end

function Tracery.MODIFIERS.nounVerbContract(text)
    if #text == 0 then return text end
    return text:sub(1, -2) .. "'" .. text:sub(-1)
end

function Tracery.MODIFIERS.vowelStart(text)
    local first = text:sub(1, 1):lower()
    if first == "a" or first == "e" or first == "i" or first == "o" or first == "u" then return "1" end
    return "0"
end

function Tracery.MODIFIERS.consonantStart(text)
    local first = text:sub(1, 1):lower()
    if first == "a" or first == "e" or first == "i" or first == "o" or first == "u" then return "0" end
    return "1"
end

function Tracery.MODIFIERS.stripVowels(text)
    return text:gsub("[aeiouAEIOU]", "")
end

function Tracery.MODIFIERS.stripConsonants(text)
    return text:gsub("[^aeiouAEIOU%W%d]", "")
end

function Tracery.MODIFIERS.duplicate(text) return text .. text end
function Tracery.MODIFIERS.spaceOut(text) return text:gsub(".", "%1 "):sub(1, -2) end
function Tracery.MODIFIERS.length(text) return tostring(#text) end
function Tracery.MODIFIERS.first(text, args)
    local n = args and tonumber(args[1]) or 1
    return text:sub(1, n)
end
function Tracery.MODIFIERS.last(text, args)
    local n = args and tonumber(args[1]) or 1
    return text:sub(-n)
end
function Tracery.MODIFIERS.mid(text, args)
    if not args then return text end
    local startPos = tonumber(args[1]) or 1
    local len = tonumber(args[2]) or #text
    return text:sub(startPos, startPos + len - 1)
end
function Tracery.MODIFIERS.endsInY(text)
    return (text:sub(-1):lower() == "y") and "1" or "0"
end
function Tracery.MODIFIERS.interjection(text)
    local interjections = { "啊，", "哦，", "嗯，", "嘿，", "哇，" }
    return interjections[math.random(1, #interjections)] .. text
end

-- ========================================================================
-- 展开历史与上下文增强
-- ========================================================================
function Tracery.Context:GetExpansionHistory()
    return self.history or {}
end

function Tracery.Context:RecordExpansion(symbol, result)
    self.history = self.history or {}
    table.insert(self.history, {symbol = symbol, result = result, depth = self.recursionDepth})
end

-- ========================================================================
-- 文法验证与内省工具
-- ========================================================================
function Tracery.ValidateGrammar(grammar)
    local report = {missingSymbols = {}, unreachableSymbols = {}, emptyRules = {}, ok = true}
    local referenced = {}
    for key, rules in pairs(grammar) do
        if type(rules) == "string" then rules = {rules} end
        if type(rules) == "table" and #rules == 0 then
            table.insert(report.emptyRules, key)
            report.ok = false
        end
        if type(rules) == "table" then
            for _, rule in ipairs(rules) do
                if type(rule) == "string" then
                    for sym in rule:gmatch("#([%w_%.]+)#") do
                        local base = sym:match("^([%w_]+)")
                        referenced[base] = true
                        if not grammar[base] then
                            report.missingSymbols[base] = true
                            report.ok = false
                        end
                    end
                end
            end
        end
    end
    return report
end

function Tracery.ListReferencedSymbols(ruleText)
    local symbols = {}
    for sym in ruleText:gmatch("#([%w_%.]+)#") do
        table.insert(symbols, sym)
    end
    return symbols
end

function Tracery.MergeGrammars(base, overlay)
    local result = DeepCopy(base or {})
    for k, v in pairs(overlay or {}) do
        if type(result[k]) == "table" and type(v) == "table" then
            for i = 1, #v do table.insert(result[k], v[i]) end
        else
            result[k] = DeepCopy(v)
        end
    end
    return result
end

function Tracery.GetRuleStats(grammar)
    local stats = {totalRules = 0, totalChoices = 0, avgChoices = 0, maxChoices = 0, symbols = {}}
    for k, v in pairs(grammar) do
        stats.totalRules = stats.totalRules + 1
        local choices = (type(v) == "table") and #v or 1
        stats.totalChoices = stats.totalChoices + choices
        if choices > stats.maxChoices then stats.maxChoices = choices end
        table.insert(stats.symbols, k)
    end
    if stats.totalRules > 0 then
        stats.avgChoices = stats.totalChoices / stats.totalRules
    end
    return stats
end

-- ========================================================================
-- 扩展预设文法库（更多中文预设）
-- ========================================================================
Tracery.PRESETS.monster_name = {
    origin = {"#prefix# #body# #beast#", "#beast# of #suffix#", "#adj# #beast#"},
    prefix = {
        "腐烂的", "嗜血的", "狂暴的", "巨型的", "变异的", "深渊的", "虚空的", "诅咒的", "亡灵", "元素",
        "毒液", "熔岩", "霜冻", "暗影", "圣光", "癫狂的", "再生", "腐化", "远古的", "幼年的"
    },
    body = {
        "双头", "三眼", "无面", "鳞甲", "骨刺", "羽翼", "触手", "利爪", "尖牙", "长尾",
        "巨臂", "肥硕", "干瘪", "透明", "燃烧", "冰冻", "带电", "酸蚀", "寄生", "共生"
    },
    beast = {
        "狼", "熊", "龙", "蛇", "蛛", "蝎", "蝠", "鸦", "鹫", "豹",
        "虎", "象", "犀牛", "甲虫", "蠕虫", "蛞蝓", "水母", "章鱼", "螃蟹", "鲨鱼"
    },
    adj = Tracery.PRESETS.item_name.prefix,
    suffix = Tracery.PRESETS.item_name.suffix
}

Tracery.PRESETS.skill_name = {
    origin = {
        "#element##strike#", "#element##shield#", "#element##aura#",
        "#adj# #strike#", "#adj# #shield#", "#adj# #aura#", "#verb# #target#"
    },
    element = {"烈火", "寒冰", "雷霆", "风暴", "暗影", "圣光", "毒液", "鲜血", "灵魂", "岩石"},
    strike = {"斩", "击", "刺", "劈", "轰", "冲", "袭", "破"},
    shield = {"盾", "壁", "障", "铠", "甲", "衣", "幕", "罩"},
    aura = {"光环", "领域", "结界", "气息", "祝福", "诅咒", "印记", "图腾"},
    adj = {"毁灭", "守护", "狂怒", "宁静", "极速", "永恒", "死亡", "重生"},
    verb = {"斩杀", "守护", "召唤", "净化", "封印", "引爆", "吞噬", "撕裂"},
    target = {"敌人", "盟友", "自身", "领域", "灵魂", "暗影", "虚空", "圣光"}
}

Tracery.PRESETS.spell_name = {
    origin = {
        "#caster# 的 #noun#", "#adj# #noun#", "#noun# of #suffix#", "#verb# #noun#"
    },
    caster = {"法师", "术士", "巫师", "德鲁伊", "萨满", "祭司", "预言家", "死灵法师"},
    noun = {"火球", "冰箭", "闪电", "陨石", "黑洞", "治愈", "护盾", "传送", "幻象", "召唤"},
    adj = {"炽热的", "冰冷的", "狂暴的", "宁静的", "神秘的", "古老的", "禁忌的", "神圣的"},
    suffix = {"毁灭", "救赎", "烈焰", "寒冰", "雷霆", "暗影", "光明", "虚空"},
    verb = {"召唤", "释放", "引爆", "凝聚", "驱散", "封印", "唤醒", "终结"}
}

Tracery.PRESETS.building_name = {
    origin = {
        "#prefix# #type#", "#adj# #type#", "#type# of #noun#", "#owner# 的 #type#"
    },
    prefix = {"老", "新", "大", "小", "东", "西", "南", "北", "金", "银"},
    type = {"酒馆", "旅店", "铁匠铺", "杂货店", "法师塔", "神殿", "图书馆", "竞技场", "商会", "驿站"},
    adj = {"破旧的", "繁华的", "寂静的", "神秘的", "古老的", "热闹的", "冷清的", "高贵的"},
    noun = {"晨曦", "暮光", "群星", "深渊", "风暴", "烈火", "寒霜", "雷霆"},
    owner = {"老王", "矮人", "精灵", "龙族", "商会", "法师会", "城主", "冒险者公会"}
}

Tracery.PRESETS.book_title = {
    origin = {
        "#adj# #subject#", "#subject# 的 #noun#", "#verb# #subject#", "#number# #subject#"
    },
    adj = {"失落的", "禁忌的", "古老的", "神秘的", "神圣的", "邪恶的", "伟大的", "悲惨的"},
    subject = {"历史", "魔法", "炼金术", "剑术", "预言", "旅行", "战争", "爱情", "死亡", "重生"},
    noun = {"秘密", "真相", "诅咒", "祝福", "艺术", "法则", "传说", "笔记"},
    verb = {"探索", "揭秘", "重写", "见证", "终结", "开始", "超越", "理解"},
    number = {"第一", "第二", "第三", "第四", "第五", "第七", "第九", "第十三", "百", "千"}
}

Tracery.PRESETS.prophecy = {
    origin = {
        "当 #event#，#hero# 将 #action#。",
        "#time#，#place# 会 #change#。",
        " beware，因为 #omen# 即将到来。"
    },
    event = {"星辰对齐", "双月升起", "血雨降临", "大地震动", "天空裂开", "巨龙苏醒"},
    hero = {"一位无名旅者", "失落的王子", "最后的龙骑士", "被诅咒的法师", "流浪的剑士"},
    action = {"拯救世界", "毁灭王国", "打开禁忌之门", "终结千年的轮回", "唤醒沉睡的神明"},
    time = {"黎明之前", "黄昏时分", "午夜降临", "冬至之日", "夏至之夜"},
    place = {"北方荒原", "南方雨林", "东方群岛", "西方沙漠", "世界中心"},
    change = {"陷入永恒的黑暗", "迎来新的曙光", "被海水淹没", "化为灰烬", "重获新生"},
    omen = {"黑鸦遮天", "井水沸腾", "牲畜暴毙", "婴儿啼哭不止", "死者开口说话"}
}

-- ========================================================================
-- 更多便捷函数
-- ========================================================================
function Tracery.GenerateMonsterName()
    return Tracery.Flatten("origin", Tracery.PRESETS.monster_name)
end

function Tracery.GenerateSkillName()
    return Tracery.Flatten("origin", Tracery.PRESETS.skill_name)
end

function Tracery.GenerateSpellName()
    return Tracery.Flatten("origin", Tracery.PRESETS.spell_name)
end

function Tracery.GenerateBuildingName()
    return Tracery.Flatten("origin", Tracery.PRESETS.building_name)
end

function Tracery.GenerateBookTitle()
    return Tracery.Flatten("origin", Tracery.PRESETS.book_title)
end

function Tracery.GenerateProphecy()
    return Tracery.Flatten("origin", Tracery.PRESETS.prophecy)
end

function Tracery.GeneratePortraitDescription()
    local grammar = {
        origin = {"#subject# 有着 #feature#，看起来 #mood#。"},
        subject = {"这位人物", "画中之人", "那位陌生人", "此人"},
        feature = {
            "一双锐利的眼睛", "浓密的胡须", "苍白的肤色", "一道显眼的伤疤", "神秘的微笑", "深陷的眼窝", "高挺的鼻梁", "干裂的嘴唇"
        },
        mood = {"疲惫不堪", "满怀野心", "深藏秘密", "慈悲为怀", "冷酷无情", "忧心忡忡", "志得意满", "心不在焉"}
    }
    return Tracery.Flatten("origin", grammar)
end

function Tracery.GenerateTavernRumor()
    local grammar = {
        origin = {"#greet# 听说 #event#，#reaction#。", "#event#，你觉得呢？"},
        greet = {"嘿，", "我说，", "小声点，", "你知道吗，"},
        event = {
            "北方矿山发现了古代遗迹", "城主大人失踪了三天", "法师塔在深夜发出蓝光",
            "南门的守卫全部换了新人", "地下拍卖会在今晚举行", " eastern road 上出现了强盗"
        },
        reaction = {"真是让人不安", "机会来了", "多半是假的", "最好离远点", "值得去看看"}
    }
    return Tracery.Flatten("origin", grammar)
end

function Tracery.GenerateMissionBriefing()
    local grammar = {
        origin = {
            "任务：#verb# #target#。目标位于 #location#。注意：#warning#。",
            "情报显示 #target# 正在 #location# 进行 #activity#。立即 #verb#。"
        },
        verb = {"消灭", "护送", "调查", "潜入", "救援", "摧毁", "夺取"},
        target = {"敌方将领", "走私集团", "古代遗物", "叛逃的法师", "被绑架的商人"},
        location = {"废弃工厂", "地下墓穴", "迷雾森林深处", "冰川要塞", "沙漠绿洲"},
        warning = {"敌人数量众多", "可能有内鬼", "目标受到魔法保护", "时间紧迫", "地形复杂"},
        activity = {"秘密交易", "非法实验", "召唤仪式", "武器制造", "人员招募"}
    }
    return Tracery.Flatten("origin", grammar)
end

function Tracery.GenerateMerchantOffer()
    local grammar = {
        origin = {
            "#greet# 我这有上好的 #item#，只要 #price#。",
            "看看这个 #item#，#adj# 货色，#price# 就卖。",
            "#greet# 你是识货的人，这 #item# 绝对值 #price#。"
        },
        greet = {"客官里边请！", "来看看吧。", "走过路过不要错过！", "嘿，朋友。"},
        item = {"玄铁匕首", "治愈药水", "附魔卷轴", "精钢护甲", "神秘宝珠", "古老地图"},
        price = {"五个金币", "十个银币", "一件等价物品", "帮一个小忙", "二十个铜板"},
        adj = {"正宗的", "仅此一件的", "上等的", "法师加持过的", "盗墓得来的"}
    }
    return Tracery.Flatten("origin", grammar)
end

Tracery.PRESETS.artifact_description = {
    origin = {
        "这是一件 #origin_type# 的 #item#。 #appearance#。 #history#。 #power#。",
        "#item#，由 #creator# 在 #era# 打造。#appearance#。#power#。"
    },
    origin_type = {"失落", "神圣", "诅咒", "禁忌", "古代", "外星", "自然形成", "恶魔铸造"},
    item = {"宝剑", "法杖", "护符", "铠甲", "戒指", "面具", "圣杯", "卷轴"},
    appearance = {
        "表面覆盖着神秘的符文", "散发着幽幽的蓝光", "触感冰冷如尸体", "隐隐有光芒流动",
        "看似普通但透着不凡气息", "镶嵌着一颗巨大的宝石", "布满锈迹却依然锋利"
    },
    history = {
        "传说它曾属于一位伟大的王者", "在千年前的神战中遗失", "被深埋于地下墓穴中数个世纪",
        "历经数十位主人，每一位都不得善终", "据说是由陨落星辰的核心锻造"
    },
    power = {
        " wielder 将获得无穷的力量", "它能预知未来的灾祸", "戴上它的人将永远不会衰老",
        "但同时也会被无尽的噩梦缠身", "它可以打开通往异界的门", "使用它需要付出灵魂的代价"
    },
    creator = {"矮人王", "精灵大法师", "远古神明", "恶魔领主", "未知的工匠", "星际旅者"},
    era = {"诸神黄昏", "第一次魔法战争", "龙族统治的年代", "人类帝国崩溃前夜", "星际大航海时代"}
}

Tracery.PRESETS.weather_description = {
    origin = {
        "天空 #sky_state#，#wind#。 #temp#，感觉 #feeling#。",
        "#temp#。 #precipitation# 正在 #area# 肆虐。#wind#。"
    },
    sky_state = {"一片漆黑", "乌云密布", "湛蓝如洗", "泛着诡异的紫色", "布满了血色的晚霞", "星辰清晰可见"},
    wind = {"没有一丝风", "微风轻拂", "狂风呼啸", "沙尘漫天", "寒风刺骨", "带着咸湿气息的海风在吹"},
    temp = {"酷热难耐", "温暖宜人", "凉爽舒适", "寒冷刺骨", "冰冷彻骨", "气温适中"},
    feeling = {"非常压抑", "心旷神怡", "惴惴不安", "昏昏欲睡", "充满活力", "莫名的悲伤"},
    precipitation = {"暴雨", "大雪", "冰雹", "酸雨", "血雨", "沙尘暴"},
    area = {"整个区域", "北方的山脉", "南方的平原", "城市上空", "沿海地带", "荒野深处"}
}

Tracery.PRESETS.story_opening = {
    origin = {
        "#time#，#protagonist# 站在 #location#。#action#。#mood#。",
        "当 #event# 发生时，#protagonist# 正在 #activity#。#discovery#。"
    },
    time = {"黎明时分", "午夜", "黄昏", "一个风雨交加的夜晚", "晴朗的早晨", "一个不知名的午后"},
    protagonist = {"一位孤独的剑客", "失去记忆的法师", "流亡的王子", "贪婪的商人", "好奇的学徒", "退役的将军"},
    location = {"破败的城堡废墟上", "繁华的市集边缘", "荒无人烟的沙漠中", "幽暗的森林深处", "摇摇欲坠的吊桥上"},
    action = {
        "凝视着手中的旧信", "倾听着风中传来的低语", "回想着那场改变一切的战争",
        "紧握着口袋里最后几枚铜币", "打量着四周潜在的危险"
    },
    mood = {
        "心中充满了对未来的迷茫", "一种不祥的预感油然而生", "久违的宁静让他沉醉",
        "复仇的火焰在胸中燃烧", "他必须做出一个艰难的决定"
    },
    event = {"远处的火山喷发", "天空中出现了第二个月亮", "一封神秘的邀请函送达", "老友的意外死亡消息传来"},
    activity = {"擦拭着他的剑", "研读一本古老的禁书", "与商贩讨价还价", "独自喝着闷酒"},
    discovery = {
        "直到他发现事情并没有那么简单", "一个意想不到的访客打破了平静",
        "一封被误送的信件改变了一切", "他意识到自己已经被卷入了一场阴谋"
    }
}

Tracery.PRESETS.guild_announcement = {
    origin = {
        "【公会公告】#greet# #announcement# #call_to_action#",
        "【紧急召集】#urgent# #target# #reward#！"
    },
    greet = {"各位成员请注意，", "公会事务更新：", "好消息！", "警告！"},
    announcement = {
        "本周公会战将于 #time# 举行。", "公会仓库新增了 #item#。",
        "新来的成员 #name# 已经加入我们。", "公会领地发现了一个 #danger_level# 的敌人据点。"
    },
    call_to_action = {"请大家准时参加。", "有需要的请去仓库领取。", "请老成员多多关照。", "勇敢的战士请报名出征！"},
    urgent = {"深渊裂隙在 #location# 开启！", "巨龙 #dragon_name# 正在 #location# 肆虐！", "敌对公会向我们宣战了！"},
    target = {"我们需要 20 名勇士前往支援。", "所有在线成员立即前往集结。", "急需法师和治疗职业！"},
    reward = {"奖励丰厚", "战利品按贡献分配", "参与即有金币和声望", "顶尖装备等你来拿"},
    time = {"今晚八点", "周六下午", "三小时后", " tomorrow 黎明"},
    item = {"稀有矿石", "高级药水", "传说级附魔材料", "公会旗帜"},
    name = {"艾尔文", "贝尔娜", "塞拉斯", "达里安", "艾瑞丝"},
    danger_level = {"低等级", "中等级", "高等级", "传说级"},
    location = {"黑森林", "熔岩峡谷", "冰封荒原", "遗忘废墟"},
    dragon_name = {"炎魔拉格纳", "霜翼玛里苟斯", "暗影奈萨里奥", "风暴之怒"}
}

function Tracery.GenerateArtifactDescription()
    return Tracery.Flatten("origin", Tracery.PRESETS.artifact_description)
end

function Tracery.GenerateWeatherDescription()
    return Tracery.Flatten("origin", Tracery.PRESETS.weather_description)
end

function Tracery.GenerateStoryOpening()
    return Tracery.Flatten("origin", Tracery.PRESETS.story_opening)
end

function Tracery.GenerateGuildAnnouncement()
    return Tracery.Flatten("origin", Tracery.PRESETS.guild_announcement)
end

-- ========================================================================
-- 扩展的变量与记忆系统（支持历史记录）
-- ========================================================================
function Tracery.Context:SaveVariable(key, value)
    self.saves[key] = value
    self.saveHistory = self.saveHistory or {}
    self.saveHistory[key] = self.saveHistory[key] or {}
    table.insert(self.saveHistory[key], value)
end

function Tracery.Context:GetVariableHistory(key)
    if not self.saveHistory then return {} end
    return self.saveHistory[key] or {}
end

function Tracery.Context:PopVariableHistory(key)
    if not self.saveHistory or not self.saveHistory[key] then return nil end
    return table.remove(self.saveHistory[key])
end

-- ========================================================================
-- 语法树浏览器（调试与内省）
-- ========================================================================
function Tracery.InspectGrammar(grammar, maxDepth)
    maxDepth = maxDepth or 3
    local lines = {}
    local function indent(level) return string.rep("  ", level) end
    local function browse(key, rules, depth)
        if depth > maxDepth then return end
        if type(rules) == "string" then rules = {rules} end
        if type(rules) ~= "table" then return end
        table.insert(lines, indent(depth) .. tostring(key) .. " (" .. #rules .. " choices):")
        for i, rule in ipairs(rules) do
            if type(rule) == "string" then
                local preview = rule
                if #preview > 60 then preview = preview:sub(1, 57) .. "..." end
                table.insert(lines, indent(depth + 1) .. i .. ". " .. preview)
            elseif type(rule) == "table" then
                table.insert(lines, indent(depth + 1) .. i .. ". [nested table]")
            else
                table.insert(lines, indent(depth + 1) .. i .. ". " .. tostring(rule))
            end
        end
    end
    for k, v in pairs(grammar) do
        browse(k, v, 0)
    end
    return table.concat(lines, "\n")
end

function Tracery.PrintGrammar(grammar, maxDepth)
    print(Tracery.InspectGrammar(grammar, maxDepth))
end

-- ========================================================================
-- 高级展开控制：最大尝试次数、去重生成、模板池
-- ========================================================================
function Tracery.FlattenUnique(startRule, grammar, count, maxAttempts)
    count = count or 10
    maxAttempts = maxAttempts or count * 5
    local results = {}
    local seen = {}
    for i = 1, maxAttempts do
        if #results >= count then break end
        local text = Tracery.Flatten(startRule, grammar)
        if not seen[text] then
            seen[text] = true
            table.insert(results, text)
        end
    end
    return results
end

function Tracery.FlattenFromPool(poolName, grammar, count)
    count = count or 1
    local pool = grammar[poolName]
    if not pool then return {} end
    if type(pool) == "string" then pool = {pool} end
    local results = {}
    for i = 1, count do
        local idx = Tracery.RNG.RandomInt(1, #pool)
        results[i] = Tracery.ExpandString(pool[idx], Tracery.Context.New(grammar))
    end
    return results
end

-- ========================================================================
-- 实时模板系统：从外部字符串列表动态构建语法
-- ========================================================================
function Tracery.BuildGrammarFromTemplates(templates, options)
    options = options or {}
    local grammar = {origin = {}}
    for i, template in ipairs(templates) do
        table.insert(grammar.origin, template)
    end
    for k, v in pairs(options) do
        grammar[k] = v
    end
    return grammar
end

function Tracery.GenerateFromTemplates(templates, options)
    local grammar = Tracery.BuildGrammarFromTemplates(templates, options)
    return Tracery.Flatten("origin", grammar)
end

-- ========================================================================
-- 批量修饰符测试工具
-- ========================================================================
function Tracery.TestModifiers(word)
    local mods = {
        "a", "A", "s", "ed", "ing", "capitalize", "titleCase", "allCaps", "upper", "lower",
        "reverse", "comma", "number", "ordinal", "be", "presentTense", "pastTense", "futureTense",
        "possessive", "pluralPossessive", "pastParticiple", "stripVowels", "stripConsonants",
        "duplicate", "spaceOut", "length", "endsInY", "interjection"
    }
    local results = {}
    for _, m in ipairs(mods) do
        local ok, res = pcall(function() return Tracery.MODIFIERS[m](word) end)
        if ok then
            results[m] = res
        else
            results[m] = "[ERR]"
        end
    end
    return results
end

-- ========================================================================
-- 更多预设文法库（物品、装备、环境、故事）
-- ========================================================================
Tracery.PRESETS.trade_good = {
    origin = {"#quantity# #material# #item#", "#quality# #item# 来自 #origin_place#", "#item#，#feature#"},
    quantity = {"一箱", "一袋", "一车", "一船", "一打", "一桶"},
    material = {"丝绸", "香料", "象牙", "黄金", "白银", "青铜", "翡翠", "玛瑙", "珍珠", "琥珀"},
    item = {"项链", "手镯", "雕像", "餐具", "织物", "绘画", "乐器", "书籍", "药剂", "卷轴"},
    quality = {"上等的", "劣质的", "古老的", "仿制的", "稀有的", "普通的"},
    origin_place = {"东方岛国", "西方沙漠", "北方冰原", "南方雨林", "地下城", "浮空城"},
    feature = {"价格实惠", "品质保证", "来历不明", "附赠小故事", "据说能带来好运"}
}

Tracery.PRESETS.armor_description = {
    origin = {"这件 #type# 由 #material# 制成。#look#。#history#。#feature#。"},
    type = {"胸甲", "头盔", "护腿", "护手", "盾牌", "披风"},
    material = {"精钢", "秘银", "龙鳞", "黑曜石", "皮革", "骨板", "暗影织物", "圣光结晶"},
    look = {"表面刻有复杂的符文", "在灯光下闪烁着金属光泽", "散发着淡淡的霉味", "布满了战斗留下的痕迹"},
    history = {"它曾属于一位传奇骑士", "在千年前的神战中遗失", "是矮人王国的贡品", "从一位亡灵战士身上剥下"},
    feature = {"能抵挡魔法攻击", "穿着时行动敏捷", "重量惊人但防护极佳", "据说会轻微吸取穿戴者的生命力"}
}

Tracery.PRESETS.weapon_description = {
    origin = {"这把 #type# 的刃锋由 #material# 锻造。#look#。#history#。#feature#。"},
    type = {"长剑", "匕首", "巨斧", "战锤", "长矛", "弯刀", "刺剑", "斩马刀"},
    material = {"陨铁", "龙牙", "恶魔之骨", "星辰碎片", "冰川核心", "火山玻璃"},
    look = {"刀刃上流淌着红色的光芒", "通体漆黑如夜", "镶嵌着一颗不断转动的眼球", "护手雕刻成狮头的形状"},
    history = {"斩杀过无数恶魔", "是某位陨落神明的佩剑", "从海底遗迹中打捞而出", "由最后一位精灵锻造大师打造"},
    feature = {"挥动时会发出龙吟般的声响", "持有者永远不会感到疲惫", "攻击时附带火焰伤害", "能看穿敌人的弱点"}
}

Tracery.PRESETS.potion_effect = {
    origin = {"饮用后 #immediate#，随后 #delayed#。#side_effect#。"},
    immediate = {"感到一阵温热", "视野变得清晰", "听觉变得敏锐", "身体变得轻盈", "心跳加速"},
    delayed = {"伤口开始愈合", "力量逐渐恢复", "思维变得敏捷", "感知到周围的魔法波动", "体力和耐力明显提升"},
    side_effect = {"可能会感到轻微的头晕", "有时也会让人产生一种莫名的愉悦感", "少数人会出现反胃的症状", "长时间服用可能会上瘾"}
}

Tracery.PRESETS.scroll_content = {
    origin = {"卷轴上记载着 #spell_type# 的奥秘：#description#。#warning#。"},
    spell_type = {"火系", "冰系", "治愈", "召唤", "传送", "诅咒", "预言", "变形"},
    description = {
        "通过操纵以太粒子来引发能量爆发", "借助古老符文的力量沟通异界", "将施法者的生命力转化为治愈之光",
        "在施法者与目标之间建立神秘的连接", "扭曲时空实现瞬间移动"
    },
    warning = {"施展此术需要消耗大量精神力", "切记不可在月圆之夜使用", "心怀恶念者会被法术反噬", "初学者必须在导师监督下进行"}
}

Tracery.PRESETS.npc_backstory = {
    origin = {"#name# 出生于 #birthplace#，早年 #childhood#。长大后 #adulthood#。如今 #nowadays#。"},
    name = Tracery.PRESETS.dialogue_template.name,
    birthplace = {"一个小村庄", "繁华的港口城市", "偏远的山区", "游牧民族的帐篷里", "一座浮空岛上", "地下城的贫民窟"},
    childhood = {"家境贫寒，靠乞讨为生", "是家族中备受宠爱的独子", "七岁时失去了双亲", "展现出了非凡的魔法天赋", "因战乱而流离失所"},
    adulthood = {"成为了一名流浪剑客", "在法师塔研修了十年", "加入了商队四处旅行", "因一次意外获得了神秘力量", "做起了走私生意"},
    nowadays = {"隐居在这座小镇里", "正在寻找失散多年的家人", "试图洗清自己身上的罪名", "怀揣着复仇的执念", "只想安安静静地过完余生"}
}

Tracery.PRESETS.random_encounter = {
    origin = {"在 #location#，你们遭遇了 #foe#。#foe# 看起来 #mood#。#action#。"},
    location = {"一片浓雾笼罩的沼泽中", "狭窄的山道上", "荒废已久的营地旁", "古老的石桥中央", "茂密的灌木丛后"},
    foe = {"一群饥饿的野狼", "几个手持武器的强盗", "一只独眼的巨人", "一队巡逻的兽人士兵", "一个行踪诡秘的暗影刺客"},
    mood = {"饥肠辘辘", "充满敌意", "犹豫不决", "疲惫不堪", "异常兴奋"},
    action = {"他们立刻向你们发起了攻击", "他们要求你们交出所有财物", "其中一位首领模样的家伙开口说话了", "他们似乎正在争夺什么，没有注意到你们"}
}

Tracery.PRESETS.tavern_name = {
    origin = {"#adj# #animal#", "#animal# 与 #item#", "#adj# #item#", "#owner# 的 #item#"},
    adj = {"醉", "睡", "跳舞的", "咆哮的", "流浪的", "金色的"},
    animal = {"野猪", "乌鸦", "狐狸", "鲸鱼", "狮子", "独角兽", "龙", "猫"},
    item = {"酒杯", "火炉", "盾牌", "号角", "靴子", "摇篮", "王冠"},
    owner = {"老约翰", "矮人", "女巫", "船长", "骑士", "吟游诗人"}
}

Tracery.PRESETS.ship_name = {
    origin = {"#prefix# #noun#", "#adj# #noun#", "#noun# of #suffix#", "#owner# 的 #noun#"},
    prefix = {"黑", "白", "红", "银", "铁", "海", "风", "雷", "雾", "霜"},
    noun = {"珍珠", "复仇", "掠夺者", "幽灵", "曙光", "荣耀", "深渊", "征服者", "风暴", "潮汐"},
    adj = {"飞翔的", "沉没的", "不朽的", "骄傲的", "迷失的", "迅捷的", "凶恶的", "荣耀的"},
    suffix = {"七大洋", "东方", "西方", "深渊", "星辰", "黎明", "黄昏", "死亡", "重生"},
    owner = {"黑胡子", "海神", "女王", "海盗王", "幽灵船长", "贸易联盟"}
}

function Tracery.GenerateTradeGood()
    return Tracery.Flatten("origin", Tracery.PRESETS.trade_good)
end

function Tracery.GenerateArmorDescription()
    return Tracery.Flatten("origin", Tracery.PRESETS.armor_description)
end

function Tracery.GenerateWeaponDescription()
    return Tracery.Flatten("origin", Tracery.PRESETS.weapon_description)
end

function Tracery.GeneratePotionEffect()
    return Tracery.Flatten("origin", Tracery.PRESETS.potion_effect)
end

function Tracery.GenerateScrollContent()
    return Tracery.Flatten("origin", Tracery.PRESETS.scroll_content)
end

function Tracery.GenerateNpcBackstory()
    return Tracery.Flatten("origin", Tracery.PRESETS.npc_backstory)
end

function Tracery.GenerateRandomEncounter()
    return Tracery.Flatten("origin", Tracery.PRESETS.random_encounter)
end

function Tracery.GenerateTavernName()
    return Tracery.Flatten("origin", Tracery.PRESETS.tavern_name)
end

function Tracery.GenerateShipName()
    return Tracery.Flatten("origin", Tracery.PRESETS.ship_name)
end

-- ========================================================================
-- 规则依赖图构建器
-- ========================================================================
function Tracery.BuildDependencyGraph(grammar)
    local graph = {}
    for key, rules in pairs(grammar) do
        graph[key] = graph[key] or {}
        if type(rules) == "string" then rules = {rules} end
        if type(rules) == "table" then
            for _, rule in ipairs(rules) do
                if type(rule) == "string" then
                    for sym in rule:gmatch("#([%w_]+)[%.%w_]*#") do
                        graph[key][sym] = true
                        graph[sym] = graph[sym] or {}
                    end
                end
            end
        end
    end
    return graph
end

function Tracery.FindUnreachableRules(grammar, startRule)
    startRule = startRule or "origin"
    local graph = Tracery.BuildDependencyGraph(grammar)
    local reachable = {}
    local stack = {startRule}
    while #stack > 0 do
        local current = table.remove(stack)
        if not reachable[current] then
            reachable[current] = true
            for dep, _ in pairs(graph[current] or {}) do
                if not reachable[dep] then
                    table.insert(stack, dep)
                end
            end
        end
    end
    local unreachable = {}
    for key, _ in pairs(grammar) do
        if not reachable[key] then
            table.insert(unreachable, key)
        end
    end
    return unreachable
end

function Tracery.FindCircularDependencies(grammar)
    local graph = Tracery.BuildDependencyGraph(grammar)
    local cycles = {}
    local visited = {}
    local recStack = {}
    local function dfs(node, path)
        visited[node] = true
        recStack[node] = true
        table.insert(path, node)
        for dep, _ in pairs(graph[node] or {}) do
            if not visited[dep] then
                dfs(dep, path)
            elseif recStack[dep] then
                local cycle = {}
                local found = false
                for _, p in ipairs(path) do
                    if p == dep then found = true end
                    if found then table.insert(cycle, p) end
                end
                table.insert(cycle, dep)
                table.insert(cycles, cycle)
            end
        end
        table.remove(path)
        recStack[node] = false
    end
    for node, _ in pairs(graph) do
        if not visited[node] then
            dfs(node, {})
        end
    end
    return cycles
end

-- ========================================================================
-- 文法导入/导出（纯文本格式）
-- ========================================================================
function Tracery.ExportPlainText(grammar)
    local lines = {}
    for key, rules in pairs(grammar) do
        if type(rules) == "string" then rules = {rules} end
        if type(rules) == "table" then
            table.insert(lines, "[" .. key .. "]")
            for i, rule in ipairs(rules) do
                if type(rule) == "string" then
                    table.insert(lines, i .. ". " .. rule)
                else
                    table.insert(lines, i .. ". [complex]")
                end
            end
            table.insert(lines, "")
        end
    end
    return table.concat(lines, "\n")
end

function Tracery.ImportPlainText(text)
    local grammar = {}
    local currentKey = nil
    for line in text:gmatch("([^\r\n]+)") do
        local key = line:match("^%[([^%]]+)%]$")
        if key then
            currentKey = key
            grammar[currentKey] = {}
        elseif currentKey then
            local index, rule = line:match("^%s*(%d+)%s*%.%s*(.+)$")
            if rule then
                table.insert(grammar[currentKey], rule)
            elseif #line > 0 then
                table.insert(grammar[currentKey], line)
            end
        end
    end
    return grammar
end

-- ========================================================================
-- 符号频率分析器（用于平衡文法权重）
-- ========================================================================
function Tracery.AnalyzeSymbolFrequency(grammar, sampleSize)
    sampleSize = sampleSize or 1000
    local counts = {}
    for i = 1, sampleSize do
        local text = Tracery.Flatten("origin", grammar)
        for word in text:gmatch("%S+") do
            counts[word] = (counts[word] or 0) + 1
        end
    end
    local sorted = {}
    for word, count in pairs(counts) do
        table.insert(sorted, {word = word, count = count})
    end
    table.sort(sorted, function(a, b) return a.count > b.count end)
    return sorted
end

-- ========================================================================
-- 文法压力测试（寻找崩溃或超时规则）
-- ========================================================================
function Tracery.StressTest(grammar, iterations, maxTime)
    iterations = iterations or 100
    maxTime = maxTime or 5
    local start = os.clock()
    local success = 0
    local failures = {}
    for i = 1, iterations do
        if os.clock() - start > maxTime then break end
        local ok, result = pcall(function() return Tracery.Flatten("origin", grammar) end)
        if ok then
            success = success + 1
        else
            table.insert(failures, tostring(result))
        end
    end
    return {
        total = iterations,
        success = success,
        failed = #failures,
        elapsed = os.clock() - start,
        sampleErrors = {table.unpack(failures, 1, math.min(5, #failures))}
    }
end

-- ========================================================================
-- 提取grammar中所有唯一符号
-- ========================================================================
function Tracery.ExtractAllSymbols(grammar)
    local symbols = {}
    for key, rules in pairs(grammar) do
        symbols[key] = true
        if type(rules) == "string" then rules = {rules} end
        if type(rules) == "table" then
            for _, rule in ipairs(rules) do
                if type(rule) == "string" then
                    for sym in rule:gmatch("#([%w_]+)[%.%w_]*#") do
                        symbols[sym] = true
                    end
                end
            end
        end
    end
    return symbols
end

-- ========================================================================
-- 批量导出所有预设（用于本地化）
-- ========================================================================
function Tracery.ExportAllPresets()
    local export = {}
    for name, grammar in pairs(Tracery.PRESETS) do
        export[name] = Tracery.ExportPlainText(grammar)
    end
    return export
end

-- ========================================================================
-- 自定义修饰符注册器
-- ========================================================================
function Tracery.RegisterModifier(name, func)
    Tracery.MODIFIERS[name] = func
end

function Tracery.UnregisterModifier(name)
    Tracery.MODIFIERS[name] = nil
end

-- ========================================================================
-- 规则展开追踪器（逐层记录）
-- ========================================================================
function Tracery.TraceExpansion(startRule, grammar, maxDepth)
    maxDepth = maxDepth or 10
    local ctx = Tracery.Context.New(grammar)
    local trace = {}
    local function traceExpand(symbol, depth)
        if depth > maxDepth then return "[depth exceeded]" end
        local choices = ctx:GetRule(symbol)
        if not choices then return "[missing:" .. symbol .. "]" end
        local idx = Tracery.RNG.RandomInt(1, #choices)
        local selected = choices[idx]
        local node = {symbol = symbol, depth = depth, choice = selected}
        table.insert(trace, node)
        local text = selected:gsub("#([%w_%.]+)#", function(sym)
            local base = sym:match("^([%w_]+)")
            return traceExpand(base, depth + 1)
        end)
        node.result = text
        return text
    end
    traceExpand(startRule, 0)
    return trace
end

-- ========================================================================
-- 文法清理与优化
-- ========================================================================
function Tracery.SanitizeGrammar(grammar)
    local cleaned = {}
    for key, rules in pairs(grammar) do
        if type(rules) == "string" then rules = {rules} end
        if type(rules) == "table" and #rules > 0 then
            local seen = {}
            local unique = {}
            for _, r in ipairs(rules) do
                if type(r) == "string" and r ~= "" and not seen[r] then
                    seen[r] = true
                    table.insert(unique, r)
                end
            end
            if #unique > 0 then cleaned[key] = unique end
        end
    end
    return cleaned
end

function Tracery.AnalyzeRuleComplexity(grammar)
    local complexity = {}
    for key, rules in pairs(grammar) do
        if type(rules) == "string" then rules = {rules} end
        local totalSymbols = 0
        local maxDepth = 0
        if type(rules) == "table" then
            for _, rule in ipairs(rules) do
                if type(rule) == "string" then
                    local count = 0
                    for _ in rule:gmatch("#([%w_%.]+)#") do count = count + 1 end
                    totalSymbols = totalSymbols + count
                    if count > maxDepth then maxDepth = count end
                end
            end
        end
        complexity[key] = {
            choices = type(rules) == "table" and #rules or 1,
            avgSymbols = (type(rules) == "table" and #rules > 0) and (totalSymbols / #rules) or 0,
            maxSymbols = maxDepth
        }
    end
    return complexity
end

function Tracery.GenerateLoreFragment()
    local grammar = {
        origin = {"#time#，#subject# 在 #place# #action#。#result#。"},
        time = {"远古时期", "诸神尚存的时代", "第一次魔法大战期间", "人类尚未踏足此地之时", "一个被遗忘的年代"},
        subject = {"一位无名的英雄", "一只堕落的巨龙", "一支失落的军团", "一座移动的城市", "一位疯狂的巫师"},
        place = {"深渊之门", "永恒冰原", "燃烧的沙漠", "时间尽头的废墟", "浮空群岛"},
        action = {"封印了古老的邪神", "发现了一件禁忌神器", "引发了一场毁灭性的灾难", "建立了一个短暂的帝国", "与未知的存在签订了契约"},
        result = {"从此这片土地再无人敢踏足", "他们的名字被从历史中抹去", "遗迹至今仍散发着诡异的力量", "只有少数人还记得这段往事", "而代价则是永远的诅咒"}
    }
    return Tracery.Flatten("origin", grammar)
end

-- 测试与演示
function Tracery.RunSelfTest(count)
    count = count or 5
    print("=== Tracery 自检 ===")
    local tests = {
        {name = "装备", fn = Tracery.GenerateItemName},
        {name = "地点", fn = Tracery.GenerateLocationName},
        {name = "NPC", fn = Tracery.GenerateCatchphrase},
        {name = "任务", fn = Tracery.GenerateQuestTitle},
        {name = "派系", fn = Tracery.GenerateFactionName},
        {name = "怪物", fn = Tracery.GenerateMonsterName},
        {name = "技能", fn = Tracery.GenerateSkillName},
        {name = "法术", fn = Tracery.GenerateSpellName},
        {name = "建筑", fn = Tracery.GenerateBuildingName},
        {name = "书籍", fn = Tracery.GenerateBookTitle},
        {name = "预言", fn = Tracery.GenerateProphecy},
        {name = "画像", fn = Tracery.GeneratePortraitDescription},
        {name = "谣言", fn = Tracery.GenerateTavernRumor},
        {name = "简报", fn = Tracery.GenerateMissionBriefing},
        {name = "交易", fn = Tracery.GenerateMerchantOffer},
        {name = "商品", fn = Tracery.GenerateTradeGood},
        {name = "护甲", fn = Tracery.GenerateArmorDescription},
        {name = "武器", fn = Tracery.GenerateWeaponDescription},
        {name = "药水", fn = Tracery.GeneratePotionEffect},
        {name = "卷轴", fn = Tracery.GenerateScrollContent},
        {name = "背景", fn = Tracery.GenerateNpcBackstory},
        {name = "遭遇", fn = Tracery.GenerateRandomEncounter},
        {name = "酒馆", fn = Tracery.GenerateTavernName},
        {name = "船只", fn = Tracery.GenerateShipName},
    }
    for _, test in ipairs(tests) do
        print("[" .. test.name .. "]")
        for i = 1, count do
            print("  " .. i .. ". " .. test.fn())
        end
    end
    print("=== 修饰符测试 ===")
    local sample = "cat"
    print("original: " .. sample)
    print("plural: " .. Tracery.MODIFIERS.s(sample))
    print("pastTense: " .. Tracery.MODIFIERS.pastTense("walk"))
    print("ing: " .. Tracery.MODIFIERS.ing("walk"))
    print("a: " .. Tracery.MODIFIERS.a("apple"))
    print("titleCase: " .. Tracery.MODIFIERS.titleCase("hello world"))
    print("ordinal: " .. Tracery.MODIFIERS.ordinal("42"))
    print("possessive: " .. Tracery.MODIFIERS.possessive("James"))
    print("interjection: " .. Tracery.MODIFIERS.interjection("你好"))
end

-- 向后兼容：旧版 ApplyModifier（链式自动降级）
function Tracery.ApplyModifier(text, modifier)
    return Tracery.ApplyModifierChain(text, modifier)
end
