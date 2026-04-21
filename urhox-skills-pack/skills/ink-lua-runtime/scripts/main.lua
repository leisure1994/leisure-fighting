-- ============================================================================
-- Ink Lua Runtime for UrhoX / TapTap Skills
-- ============================================================================
-- 本模块基于开源项目 narrator（MIT 许可证）重构，整合为一个独立可运行的 Lua 文件。
-- 原项目地址：https://github.com/astrochili/narrator
--
-- 保留原项目的 MIT 授权声明：
--
-- MIT License
--
-- Copyright (c) 2020 Roman Silin
-- Copyright (c) 2014 rxi (classic, lume)
--
-- Permission is hereby granted, free of charge, to any person obtaining a copy
-- of this software and associated documentation files (the "Software"), to deal
-- in the Software without restriction, including without limitation the rights
-- to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
-- copies of the Software, and to permit persons to whom the Software is
-- furnished to do so, subject to the following conditions:
--
-- The above copyright notice and this permission notice shall be included in all
-- copies or substantial portions of the Software.
--
-- THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
-- IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
-- FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
-- AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
-- LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
-- OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
-- SOFTWARE.
-- ============================================================================

local M = {}

-- ============================================================================
-- Section 1: classic OOP 库（内嵌）
-- ============================================================================

local Object = {}
Object.__index = Object

--- 创建一个新的对象实例（空实现，由子类覆盖）
function Object:new()
end

--- 扩展当前类，创建子类
-- @return table 子类表
function Object:extend()
  local cls = {}
  for k, v in pairs(self) do
    if k:find("__") == 1 then
      cls[k] = v
    end
  end
  cls.__index = cls
  cls.super = self
  setmetatable(cls, self)
  return cls
end

--- 实现（混入）其他类的函数
-- @param ... table 要混入的类
function Object:implement(...)
  for _, cls in pairs({...}) do
    for k, v in pairs(cls) do
      if self[k] == nil and type(v) == "function" then
        self[k] = v
      end
    end
  end
end

--- 判断对象是否属于指定类型
-- @param T table 要检查的类型
-- @return boolean 是否属于该类型
function Object:is(T)
  local mt = getmetatable(self)
  while mt do
    if mt == T then
      return true
    end
    mt = getmetatable(mt)
  end
  return false
end

function Object:__tostring()
  return "Object"
end

function Object:__call(...)
  local obj = setmetatable({}, self)
  obj:new(...)
  return obj
end

-- ============================================================================
-- Section 2: lume 工具库（精简内嵌，保留 narrator 所需功能）
-- ============================================================================

local lume = { _version = "2.3.0" }

local pairs, ipairs = pairs, ipairs
local type, assert, unpack = type, assert, unpack or table.unpack
local tostring, tonumber = tostring, tonumber
local math_floor = math.floor
local math_ceil = math.ceil
local math_sqrt = math.sqrt

local noop = function()
end

local identity = function(x)
  return x
end

local iscallable = function(x)
  if type(x) == "function" then return true end
  local mt = getmetatable(x)
  return mt and mt.__call ~= nil
end

local getiter = function(x)
  if lume.isarray(x) then
    return ipairs
  elseif type(x) == "table" then
    return pairs
  end
  error("expected table", 3)
end

local iteratee = function(x)
  if x == nil then return identity end
  if iscallable(x) then return x end
  if type(x) == "table" then
    return function(z)
      for k, v in pairs(x) do
        if z[k] ~= v then return false end
      end
      return true
    end
  end
  return function(z) return z[x] end
end

--- 将数值限制在 [min, max] 范围内
-- @param x number 输入值
-- @param min number 最小值
-- @param max number 最大值
-- @return number 限制后的值
function lume.clamp(x, min, max)
  return x < min and min or (x > max and max or x)
end

--- 四舍五入
-- @param x number 输入值
-- @param increment number|nil 舍入精度
-- @return number 舍入结果
function lume.round(x, increment)
  if increment then return lume.round(x / increment) * increment end
  return x >= 0 and math_floor(x + .5) or math_ceil(x - .5)
end

--- 返回数值符号
-- @param x number
-- @return number -1 或 1
function lume.sign(x)
  return x < 0 and -1 or 1
end

--- 线性插值
-- @param a number 起始值
-- @param b number 结束值
-- @param amount number 插值比例 0~1
-- @return number 插值结果
function lume.lerp(a, b, amount)
  return a + (b - a) * lume.clamp(amount, 0, 1)
end

--- 判断表是否为数组（以 1 为起始索引）
-- @param x table
-- @return boolean
function lume.isarray(x)
  return type(x) == "table" and x[1] ~= nil
end

--- 向数组末尾追加元素
-- @param t table 目标数组
-- @param ... any 要追加的元素
-- @return ... 返回追加的元素
function lume.push(t, ...)
  local n = select("#", ...)
  for i = 1, n do
    t[#t + 1] = select(i, ...)
  end
  return ...
end

--- 清空表
-- @param t table
-- @return table 清空后的表
function lume.clear(t)
  local iter = getiter(t)
  for k in iter(t) do
    t[k] = nil
  end
  return t
end

--- 扩展目标表，合并其他表的键值对
-- @param t table 目标表
-- @param ... table 要合并的表
-- @return table 扩展后的表
function lume.extend(t, ...)
  for i = 1, select("#", ...) do
    local x = select(i, ...)
    if x then
      for k, v in pairs(x) do
        t[k] = v
      end
    end
  end
  return t
end

--- 深拷贝（一层）表
-- @param t table
-- @return table 复制后的表
function lume.clone(t)
  local rtn = {}
  for k, v in pairs(t) do rtn[k] = v end
  return rtn
end

--- 将迭代器结果转换为数组
-- @param ... iterator
-- @return table 数组
function lume.array(...)
  local t = {}
  for x in ... do t[#t + 1] = x end
  return t
end

--- 遍历表并执行回调
-- @param t table
-- @param fn function|string 回调函数或方法名
-- @param ... any 额外参数
-- @return table 原表
function lume.each(t, fn, ...)
  local iter = getiter(t)
  if type(fn) == "string" then
    for _, v in iter(t) do v[fn](v, ...) end
  else
    for _, v in iter(t) do fn(v, ...) end
  end
  return t
end

--- 映射表
-- @param t table
-- @param fn function|string 映射函数
-- @return table 新表
function lume.map(t, fn)
  fn = iteratee(fn)
  local iter = getiter(t)
  local rtn = {}
  for k, v in iter(t) do rtn[k] = fn(v) end
  return rtn
end

--- 合并多个表（键值对方式，后者覆盖前者）
-- @param ... table
-- @return table 合并后的新表
function lume.merge(...)
  local rtn = {}
  for i = 1, select("#", ...) do
    local t = select(i, ...)
    local iter = getiter(t)
    for k, v in iter(t) do
      rtn[k] = v
    end
  end
  return rtn
end

--- 连接多个数组
-- @param ... table
-- @return table 连接后的新数组
function lume.concat(...)
  local rtn = {}
  for i = 1, select("#", ...) do
    local t = select(i, ...)
    if t ~= nil then
      local iter = getiter(t)
      for _, v in iter(t) do
        rtn[#rtn + 1] = v
      end
    end
  end
  return rtn
end

--- 在表中查找值
-- @param t table
-- @param value any
-- @return any|nil 找到的键
function lume.find(t, value)
  local iter = getiter(t)
  for k, v in iter(t) do
    if v == value then return k end
  end
  return nil
end

--- 计算表中符合条件的元素数量
-- @param t table
-- @param fn function|nil 过滤函数，为空则返回总数
-- @return number 数量
function lume.count(t, fn)
  local count = 0
  local iter = getiter(t)
  if fn then
    fn = iteratee(fn)
    for _, v in iter(t) do
      if fn(v) then count = count + 1 end
    end
  else
    if lume.isarray(t) then
      return #t
    end
    for _ in iter(t) do count = count + 1 end
  end
  return count
end

--- 截取数组片段
-- @param t table
-- @param i number|nil 起始索引（支持负索引）
-- @param j number|nil 结束索引（支持负索引）
-- @return table 新数组
function lume.slice(t, i, j)
  local len = #t
  local function absindex(ll, ii)
    return ii < 0 and (ll + ii + 1) or ii
  end
  i = i and absindex(len, i) or 1
  j = j and absindex(len, j) or len
  local rtn = {}
  for x = i < 1 and 1 or i, j > len and len or j do
    rtn[#rtn + 1] = t[x]
  end
  return rtn
end

--- 反转键值对
-- @param t table
-- @return table 新表
function lume.invert(t)
  local rtn = {}
  for k, v in pairs(t) do rtn[v] = k end
  return rtn
end

--- 获取表的所有键组成的数组
-- @param t table
-- @return table 键数组
function lume.keys(t)
  local rtn = {}
  local iter = getiter(t)
  for k in iter(t) do rtn[#rtn + 1] = k end
  return rtn
end

--- 字符串按分隔符分割为数组
-- @param str string
-- @param sep string|nil 分隔符
-- @return table 分割结果
function lume.split(str, sep)
  local function patternescape(s)
    return s:gsub("[%(%)%.%%%+%-%*%?%[%]%^%$]", "%%%1")
  end
  if not sep then
    return lume.array(str:gmatch("([%S]+)"))
  else
    assert(sep ~= "", "empty separator")
    local psep = patternescape(sep)
    return lume.array((str..sep):gmatch("(.-)("..psep..")"))
  end
end

--- 去除字符串首尾空白或指定字符
-- @param str string
-- @param chars string|nil 要去除的字符集合
-- @return string 处理后的字符串
function lume.trim(str, chars)
  local function patternescape(s)
    return s:gsub("[%(%)%.%%%+%-%*%?%[%]%^%$]", "%%%1")
  end
  if not chars then return str:match("^[%s]*(.-)[%s]*$") end
  chars = patternescape(chars)
  return str:match("^[" .. chars .. "]*(.-)[" .. chars .. "]*$")
end

--- 格式化字符串（替换 {key} 为对应值）
-- @param str string
-- @param vars table|nil 替换映射表
-- @return string 格式化结果
function lume.format(str, vars)
  if not vars then return str end
  local f = function(x)
    return tostring(vars[x] or vars[tonumber(x)] or "{" .. x .. "}")
  end
  return (str:gsub("{(.-)}", f))
end

--- 执行字符串中的 Lua 代码
-- @param str string Lua 代码字符串
-- @return any 执行结果
function lume.dostring(str)
  return assert((loadstring or load)(str))()
end

-- 序列化辅助
local serialize

local serialize_map = {
  [ "boolean" ] = tostring,
  [ "nil"     ] = tostring,
  [ "string"  ] = function(v) return string.format("%q", v) end,
  [ "number"  ] = function(v)
    if      v ~=  v     then return  "0/0"
    elseif  v ==  1 / 0 then return  "1/0"
    elseif  v == -1 / 0 then return "-1/0" end
    return tostring(v)
  end,
  [ "table"   ] = function(t, stk)
    stk = stk or {}
    if stk[t] then error("circular reference") end
    local rtn = {}
    stk[t] = true
    for k, v in pairs(t) do
      rtn[#rtn + 1] = "[" .. serialize(k, stk) .. "]=" .. serialize(v, stk)
    end
    stk[t] = nil
    return "{" .. table.concat(rtn, ",") .. "}"
  end
}

setmetatable(serialize_map, {
  __index = function(_, k) error("unsupported serialize type: " .. k) end
})

serialize = function(x, stk)
  return serialize_map[type(x)](x, stk)
end

--- 将 Lua 值序列化为字符串
-- @param x any
-- @return string 序列化字符串
function lume.serialize(x)
  return serialize(x)
end

--- 将序列化字符串反序列化为 Lua 值
-- @param str string
-- @return any 反序列化结果
function lume.deserialize(str)
  return lume.dostring("return " .. str)
end

-- ============================================================================
-- Section 3: 枚举常量
-- ============================================================================

local enums = {
  --- 引擎版本号（当状态结构变更时应递增）
  ENGINE_VERSION = 2,

  --- @enum Narrator.ItemType
  ITEM = {
    TEXT = 1,
    ALTS = 2,
    CHOICE = 3,
    CONDITION = 4,
    VARIABLE = 5
  },

  --- @enum Narrator.Sequence
  SEQUENCE = {
    CYCLE = 1,
    STOPPING = 2,
    ONCE = 3
  },

  --- @enum Narrator.ReadMode
  READ_MODE = {
    TEXT = 1,
    CHOICES = 2,
    GATHERS = 3,
    QUIT = 4
  }
}

-- ============================================================================
-- Section 4: Ink 列表类型元表（内嵌）
-- ============================================================================

local mt = { lists = {} }

--- 将 Ink 列表转换为可读字符串
-- @param self table 列表对象
-- @return string
function mt.__tostring(self)
  local pool = {}
  local list_keys = {}
  for key, _ in pairs(self) do
    table.insert(list_keys, key)
  end
  table.sort(list_keys)

  for i = 1, #list_keys do
    local list_name = list_keys[i]
    local list_items = self[list_name]
    for index = 1, #(mt.lists[list_name] or {}) do
      pool[index] = pool[index] or {}
      local item_name = mt.lists[list_name][index]
      if list_items[item_name] == true then
        table.insert(pool[index], 1, item_name)
      end
    end
  end

  local items = {}
  for _, titles in ipairs(pool) do
    for _, title in ipairs(titles) do
      table.insert(items, title)
    end
  end

  return table.concat(items, ", ")
end

--- 列表加法运算元方法（+）
-- @param lhs table 左操作数
-- @param rhs table|number 右操作数
-- @return table 运算结果
function mt.__add(lhs, rhs)
  if type(rhs) == 'table' then
    return mt.__add_list(lhs, rhs)
  elseif type(rhs) == 'number' then
    return mt.__shift_by_number(lhs, rhs)
  else
    error('Attempt to sum the list with ' .. type(rhs))
  end
end

--- 列表减法运算元方法（-）
-- @param lhs table 左操作数
-- @param rhs table|number 右操作数
-- @return table 运算结果
function mt.__sub(lhs, rhs)
  if type(rhs) == 'table' then
    return mt.__subList(lhs, rhs)
  elseif type(rhs) == 'number' then
    return mt.__shift_by_number(lhs, -rhs)
  else
    error('Attempt to sub the list with ' .. type(rhs))
  end
end

--- 列表取模运算元方法（%，包含检查）
-- @param lhs table 左操作数
-- @param rhs table 右操作数
-- @return boolean
function mt.__mod(lhs, rhs)
  if type(rhs) ~= 'table' then
    error('Attempt to check content of the list for ' .. type(rhs))
  end

  for list_name, list_items in pairs(rhs) do
    if lhs[list_name] == nil then return false end
    for item_name, item_value in pairs(list_items) do
      if (lhs[list_name][item_name] or false) ~= item_value then return false end
    end
  end

  return true
end

--- 列表幂运算元方法（^，交集）
-- @param lhs table 左操作数
-- @param rhs table 右操作数
-- @return table 交集结果
function mt.__pow(lhs, rhs)
  if type(rhs) ~= 'table' then
    error('Attempt to interselect the list with ' .. type(rhs))
  end

  local intersection = {}
  for list_name, list_items in pairs(lhs) do
    for item_name, item_value in pairs(list_items) do
      local left = lhs[list_name][item_name]
      local right = (rhs[list_name] or {})[item_name]
      if left == true and right == true then
        intersection[list_name] = intersection[list_name] or {}
        intersection[list_name][item_name] = true
      end
    end
  end

  setmetatable(intersection, mt)
  return intersection
end

--- 列表长度运算元方法（#）
-- @param self table
-- @return number
function mt.__len(self)
  local len = 0
  for list_name, list_items in pairs(self) do
    for item_name, item_value in pairs(list_items) do
      if item_value == true then len = len + 1 end
    end
  end
  return len
end

--- 列表相等运算元方法（==）
-- @param lhs table
-- @param rhs table
-- @return boolean
function mt.__eq(lhs, rhs)
  if type(rhs) ~= 'table' then
    error('Attempt to compare the list with ' .. type(rhs))
  end

  local function keys_count(object)
    local count = 0
    for _, _ in pairs(object) do
      count = count + 1
    end
    return count
  end

  local left_lists_count = keys_count(lhs)
  local right_lists_count = keys_count(rhs)
  if left_lists_count ~= right_lists_count then
    return false
  end

  for list_name, left_items in pairs(lhs) do
    local right_items = rhs[list_name]
    if right_items == nil then
      return false
    end

    local left_items_count = keys_count(left_items)
    local right_items_count = keys_count(right_items)

    if left_items_count ~= right_items_count then
      return false
    end
  end

  return mt.__mod(lhs, rhs)
end

--- 列表小于运算元方法（<）
-- @param lhs table
-- @param rhs table
-- @return boolean
function mt.__lt(lhs, rhs)
  if type(rhs) ~= 'table' then
    error('Attempt to compare the list with ' .. type(rhs))
  end

  local minLeft = mt.min_value_of(lhs, true)
  local maxRight = mt.max_value_of(rhs, true)

  return minLeft < maxRight
end

--- 列表小于等于运算元方法（<=）
-- @param lhs table
-- @param rhs table
-- @return boolean
function mt.__le(lhs, rhs)
  if type(rhs) ~= 'table' then
    error('Attempt to compare the list with ' .. type(rhs))
  end

  local minRight = mt.min_value_of(rhs, true)
  local minLeft = mt.min_value_of(lhs, true)
  local maxRight = mt.max_value_of(rhs, true)
  local maxLeft = mt.max_value_of(lhs, true)

  return minRight >= minLeft and maxRight >= maxLeft
end

--- 列表相加
-- @param lhs table
-- @param rhs table
-- @return table
function mt.__add_list(lhs, rhs)
  local result = lume.clone(lhs)

  for list_name, list_items in pairs(rhs) do
    result[list_name] = result[list_name] or {}
    for item_name, item_value in pairs(list_items) do
      result[list_name][item_name] = item_value
    end
  end

  return result
end

--- 列表相减
-- @param lhs table
-- @param rhs table
-- @return table
function mt.__subList(lhs, rhs)
  local result = lume.clone(lhs)

  for list_name, list_items in pairs(rhs) do
    if lhs[list_name] ~= nil then
      for item_name, _ in pairs(list_items) do
        lhs[list_name][item_name] = nil
      end
    end
  end

  return mt.remove_empties_in_list(result)
end

--- 按数值偏移列表
-- @param list table
-- @param number number
-- @return table
function mt.__shift_by_number(list, number)
  local result = {}

  for list_name, list_items in pairs(list) do
    result[list_name] = {}
    for index, item_name in ipairs(mt.lists[list_name] or {}) do
      if list_items[item_name] == true then
        local nextItem = (mt.lists[list_name] or {})[index + number]
        if nextItem ~= nil then
          result[list_name][nextItem] = true
        end
      end
    end
  end

  return mt.remove_empties_in_list(result)
end

--- 移除列表中的空子表
-- @param list table
-- @return table
function mt.remove_empties_in_list(list)
  local result = lume.clone(list)

  for list_name, list_items in pairs(list) do
    if next(list_items) == nil then
      result[list_name] = nil
    end
  end

  return result
end

--- 获取列表中的最小值
-- @param list table
-- @param raw boolean|nil 是否返回原始索引
-- @return table|number
function mt.min_value_of(list, raw)
  local min_index = 0
  local min_value = {}

  local list_keys = {}
  for key, _ in pairs(list) do
    table.insert(list_keys, key)
  end
  table.sort(list_keys)

  for i = 1, #list_keys do
    local list_name = list_keys[i]
    local list_items = list[list_name]
    for item_name, item_value in pairs(list_items) do
      if item_value == true then
        local index = lume.find(mt.lists[list_name], item_name)
        if index and index < min_index or min_index == 0 then
          min_index = index
          min_value = { [list_name] = { [item_name] = true } }
        end
      end
    end
  end

  return raw and min_index or min_value
end

--- 获取列表中的最大值
-- @param list table
-- @param raw boolean|nil 是否返回原始索引
-- @return table|number
function mt.max_value_of(list, raw)
  local max_index = 0
  local max_value = {}

  local list_keys = {}
  for key, _ in pairs(list) do
    table.insert(list_keys, key)
  end
  table.sort(list_keys)

  for i = 1, #list_keys do
    local list_name = list_keys[i]
    local list_items = list[list_name]
    for item_name, item_value in pairs(list_items) do
      if item_value == true then
        local index = lume.find(mt.lists[list_name], item_name)
        if index and index > max_index or max_index == 0 then
          max_index = index
          max_value = { [list_name] = { [item_name] = true } }
        end
      end
    end
  end

  return raw and max_index or max_value
end

--- 随机获取列表中的一项
-- @param list table
-- @return table
function mt.random_value_of(list)
  local items = {}

  local list_keys = {}
  for key, _ in pairs(list) do
    table.insert(list_keys, key)
  end
  table.sort(list_keys)

  for i = 1, #list_keys do
    local list_name = list_keys[i]
    local list_items = list[list_name]
    local items_keys = {}
    for key, _ in pairs(list_items) do
      table.insert(items_keys, key)
    end
    table.sort(items_keys)

    for j = 1, #items_keys do
      local item_name = items_keys[j]
      local item_value = list_items[item_name]
      if item_value == true then
        local result = { [list_name] = { [item_name] = true } }
        table.insert(items, result)
      end
    end
  end

  local random_index = math.random(1, #items)
  return items[random_index]
end

--- 获取列表中首个非空项的原始索引
-- @param list table
-- @return number
function mt.first_raw_value_of(list)
  local result = 0

  for list_name, list_items in pairs(list) do
    for item_name, item_value in pairs(list_items) do
      if item_value == true then
        local index = lume.find(mt.lists[list_name], item_name)
        if index then
          result = index
          break
        end
      end
    end
  end

  return result
end

--- 获取列表中所有可能的值
-- @param list table
-- @return table
function mt.posible_values_of(list)
  local result = {}

  for list_name, list_items in pairs(list) do
    local subList = {}
    for _, item_name in ipairs(mt.lists[list_name] or {}) do
      subList[item_name] = true
    end
    result[list_name] = subList
  end

  return result
end

--- 获取列表中指定范围的值
-- @param list table
-- @param min table|number 最小值或索引
-- @param max table|number 最大值或索引
-- @return table
function mt.range_of(list, min, max)
  if type(min) ~= 'table' and type(min) ~= 'number' then
    error('Attempt to get a range with incorrect min value of type ' .. type(min))
  end
  if type(max) ~= 'table' and type(max) ~= 'number' then
    error('Attempt to get a range with incorrect max value of type ' .. type(max))
  end

  local result = {}
  local allList = mt.posible_values_of(list)
  local min_index = type(min) == 'number' and min or mt.first_raw_value_of(min)
  local max_index = type(max) == 'number' and max or mt.first_raw_value_of(max)

  for list_name, list_items in pairs(allList) do
    for item_name, item_value in pairs(list_items) do
      local index = lume.find(mt.lists[list_name], item_name)
      if index and index >= min_index and index <= max_index and list[list_name][item_name] == true then
        result[list_name] = result[list_name] or {}
        result[list_name][item_name] = true
      end
    end
  end

  return result
end

--- 反转列表（求补集）
-- @param list table
-- @return table
function mt.invert(list)
  local result = mt.posible_values_of(list)

  for list_name, list_items in pairs(list) do
    for item_name, item_value in pairs(list_items) do
      if item_value == true then
        result[list_name][item_name] = nil
      end
    end
  end

  return result
end


-- ============================================================================
-- Section 5: Ink 语法解析器（内嵌，依赖 lpeg）
-- ============================================================================

--- 解析器模块
local parser = {}
local constructor = {}

--- 解析 Ink 内容字符串为 Book 数据结构
-- 依赖 lpeg 库。若 UrhoX 环境未内置 lpeg，parse_file / parse_content 将不可用。
-- @param content string Ink 脚本内容
-- @return table|nil Book 数据结构
function parser.parse(content)
  -- 尝试加载 lpeg
  local lpeg_name = 'lpeg'
  if not pcall(require, lpeg_name) then
    return false
  end
  local lpeg = require(lpeg_name)

  local S, C, P, V = lpeg.S, lpeg.C, lpeg.P, lpeg.V
  local Cb, Ct, Cc, Cg = lpeg.Cb, lpeg.Ct, lpeg.Cc, lpeg.Cg
  local Cmt = lpeg.Cmt

  lpeg.locale(lpeg)

  --- 获取数组长度
  -- @param array table
  -- @return number
  local function get_length(array) return #array end

  local eof = -1
  local sp = S(' \t') ^ 0
  local ws = S(' \t\r\n') ^ 0
  local nl = S('\r\n') ^ 1
  local none = Cc(nil)

  local divert_sign = P'->'
  local gather_mark = sp * C('-' - divert_sign)
  local gather_level = Cg(Ct(gather_mark ^ 1) / get_length + none, 'level')

  local sticky_marks = Cg(Ct((sp * C('+')) ^ 1) / get_length, 'level') * Cg(Cc(true), 'sticky')
  local choice_marks = Cg(Ct((sp * C('*')) ^ 1) / get_length, 'level') * Cg(Cc(false), 'sticky')
  local choice_level = sticky_marks + choice_marks

  local id = (lpeg.alpha + '_') * (lpeg.alnum + '_') ^ 0
  local label = Cg('(' * sp * C(id) * sp * ')', 'label')
  local address = id * ('.' * id) ^ -2

  --- 检查是否为隧道跳转
  -- @param s string
  -- @param i number
  -- @param a any
  -- @return boolean
  local function check_tunnel(s, i, a)
    local r = lpeg.match(sp * divert_sign, s, i)
    return i, r ~= nil
  end

  local divert = divert_sign * sp * Cg(address, 'path')
  local check_tunnel = Cg(Cmt(Cb('path'), check_tunnel), 'tunnel')
  local opt_tunnel_sign = (sp * divert_sign * sp * (#nl + #S'#')) ^ -1
  divert = Cg(Ct(divert * sp * check_tunnel * opt_tunnel_sign), 'divert')

  local divert_to_nothing = divert_sign * none
  local exit_tunnel = Cg(divert_sign * divert_sign, 'exit')
  local tag = '#' * sp * V'text'
  local tags = Cg(Ct(tag * (sp * tag) ^ 0), 'tags')

  local todo = sp * 'TODO:' * (1 - nl) ^ 0
  local comment_line = sp * '//' * sp * (1 - nl) ^ 0
  local comment_multi = sp * '/*' * ((P(1) - '*/') ^ 0) * '*/'
  local comment = comment_line + comment_multi

  local multiline_end = ws * '}'

  --- 获取项目类型标签
  -- @param itype any
  -- @return any
  local function item_type(itype)
    return Cg(Cc(itype), 'type')
  end

  --- 平衡多行项目匹配
  -- @param is_restricted boolean|nil
  -- @return any
  local function balanced_multiline_item(is_restricted)
    local restricted = is_restricted ~= nil and is_restricted or false
    local paragraph = restricted and V'restricted_paragraph' or V'paragraph'
    return sp * paragraph ^ -1 * sp * V'multiline_item' * sp * paragraph ^ -1 * ws
  end

  --- 提取排除符号前的句子
  -- @param excluded any
  -- @param tailed boolean|nil
  -- @return any
  local function sentence_before(excluded, tailed)
    local t = tailed or false
    local character = P(1 - S(' \t')) - excluded
    local pattern = (sp * character ^ 1) ^ 1
    local with_tail = C(pattern * sp)
    local without_tail = C(pattern) * sp
    local without_tail_always = C(pattern) * sp * #(tags + nl)
    return without_tail_always + (t and with_tail or without_tail)
  end

  --- 解包赋值语句
  -- @param assignment string
  -- @return string, string 变量名和值表达式
  local function unwrap_assignment(assignment)
    local unwrapped = assignment
    unwrapped = unwrapped:gsub('([%w_]*)%s*([%+%-])[%+%-]', '%1 = %1 %2 1')
    unwrapped = unwrapped:gsub('([%w_]*)%s*([%+%-])=%s*(.*)', '%1 = %1 %2 %3')
    local name, value = unwrapped:match('([%w_]*)%s*=%s*(.*)')
    return name or '', value or assignment
  end

  --- 检查特殊转义字符
  -- @param s string
  -- @param i number
  -- @param a any
  -- @return number|nil
  local function check_special_escape(s, i, a)
    if string.sub(s, i - 2, i - 2) == '\\' then
      return
    end
    return i
  end

  local ink_grammar = P({ 'root',

    root = ws * V'items' + eof,
    items = Ct(V'item' ^ 0),

    item = balanced_multiline_item() + V'singleline_item',
    singleline_item = sp * (V'global' + V'statement' + V'paragraph' + V'gatherPoint') * ws,
    multiline_item = ('{' * sp * (V'sequence' + V'switch') * sp * multiline_end) - V'inline_condition',

    gatherPoint = Ct(gather_level * sp * nl * item_type('gather')),

    global =
      Ct(V'inclusion' * item_type('inclusion')) +
      Ct(V'list' * item_type('list')) +
      Ct(V'constant' * item_type('constant')) +
      Ct(V'variable' * item_type('variable'))
    ,

    inclusion = 'INCLUDE ' * sp * Cg(sentence_before(nl + comment), 'filename'),
    list = 'LIST ' * sp * V'assignment_pair',
    constant = 'CONST ' * sp * V'assignment_pair',
    variable = 'VAR ' * sp * V'assignment_pair',

    statement =
      Ct(V'return_from_func' * item_type('return')) +
      Ct(V'assignment' * item_type('assignment')) +
      Ct(V'func' * item_type('func')) +
      Ct(V'knot' * item_type('knot')) +
      Ct(V'stitch' * item_type('stitch')) +
      Ct(V'choice' * item_type('choice')) +
      comment + todo
    ,

    section_name = C(id) * sp * P'=' ^ 0,
    knot = P'==' * (P'=' ^ 0) * sp * Cg(V'section_name', 'knot'),
    stitch = '=' * sp * Cg(V'section_name', 'stitch'),

    func_param = sp * C(id) * sp * S','^0,
    func_params = P'(' * Cg(Ct(V'func_param'^0), 'params') * P')',
    function_name = P'function' * sp * Cg(id, 'name') * sp * V'func_params' * sp * P'=' ^ 0,
    func =  P'==' * (P'=' ^ 0) * sp * Cg(Ct(V'function_name'), 'func'),

    return_from_func = sp * '~' * sp * P('return') * sp * Cg((P(1) - nl)^0, 'value') * nl ^ 0,

    assignment = gather_level * sp * '~' * sp * V'assignment_temp' * sp * V'assignment_pair',
    assignment_temp = Cg('temp' * Cc(true) + Cc(false), 'temp'),
    assignment_pair = Cg(sentence_before(nl + comment) / unwrap_assignment, 'name') * Cg(Cb('name') / 2, 'value'),

    choice_condition = Cg(V'expression' + none, 'condition'),
    choice_fallback = choice_level * sp * V'label_optional' * sp * V'choice_condition' * sp * (divert + divert_to_nothing) * sp * V'tags_optional',
    choice_normal = choice_level * sp * V'label_optional' * sp * V'choice_condition' * sp * Cg(V'text', 'text') * divert ^ -1 * sp * V'tags_optional',
    choice = V'choice_fallback' + V'choice_normal',

    paragraph = Ct(gather_level * sp * (V'paragraph_label' + V'paragraph_text' + V'paragraph_tags') * item_type('paragraph')),
    paragraph_label = label * sp * Cg(V'text_optional', 'parts') * sp * V'tags_optional',
    paragraph_text = V'label_optional' * sp * Cg(V'text_complex', 'parts') * sp * V'tags_optional',
    paragraph_tags = V'label_optional' * sp * Cg(V'text_optional', 'parts') * sp * tags,

    label_optional = label + none,
    text_optional = V'text_complex' + none,
    tags_optional = tags + none,

    text_complex = Ct((Ct(
      Cg(V'inline_condition', 'condition') +
      Cg(V'inline_sequence', 'sequence') +
      Cg(V'expression', 'expression') +
      Cg(V'text' + ' ', 'text') * (exit_tunnel ^ -1) * (divert ^ -1) + exit_tunnel + divert
    ) - V'multiline_item') ^ 1),

    special_check_escape = Cmt(S("{|}"), check_special_escape),

    text = sentence_before(nl + exit_tunnel + divert + comment + tag + V'special_check_escape', true) - V'statement',

    expression = '{' * sp * sentence_before('}' + nl) * sp * '}',

    inline_condition = '{' * sp * Ct(V'inline_if_else' + V'inline_if') * sp * '}',
    inline_if = Cg(sentence_before(S':}' + nl), 'condition') * sp * ':' * sp * Cg(V'text_complex', 'success'),
    inline_if_else = (V'inline_if') * sp * '|' * sp * Cg(V'text_complex', 'failure'),

    inline_alt_empty = Ct(Ct(Cg(sp * Cc'', 'text') * sp * divert ^ -1)),
    inline_alt = V'text_complex' + V'inline_alt_empty',
    inline_alts = Ct(((sp * V'inline_alt' * sp * '|') ^ 1) * sp * V'inline_alt'),
    inline_sequence = '{' * sp * (
    '!' * sp * Ct(Cg(V'inline_alts', 'alts') * Cg(Cc('once'), 'sequence')) +
    '&' * sp * Ct(Cg(V'inline_alts', 'alts') * Cg(Cc('cycle'), 'sequence')) +
    '~' * sp * Ct(Cg(V'inline_alts', 'alts') * Cg(Cc('stopping'), 'sequence') * Cg(Cc(true),  'shuffle')) +
           Ct(Cg(V'inline_alts', 'alts') * Cg(Cc('stopping'), 'sequence'))
    ) * sp * '}',

    switch = Ct((V'switch_comparative' + V'switch_conditional') * item_type('switch')),

    switch_comparative = Cg(V'switch_condition', 'expression') * ws * Cg(Ct((sp * V'switch_case') ^ 1), 'cases'),
    switch_conditional = Cg(Ct(V'switch_cases_headed' + V'switch_cases_only'), 'cases'),

    switch_cases_headed = V'switch_if' * ((sp * V'switch_case') ^ 0),
    switch_cases_only = ws * ((sp * V'switch_case') ^ 1),

    switch_if = Ct(Cg(V'switch_condition', 'condition') * ws * Cg(Ct(V'switch_items'), 'node')),
    switch_case = ('-' - divert_sign) * sp * V'switch_if',
    switch_condition = sentence_before(':' + nl) * sp * ':' * sp * comment ^ -1,
    switch_items = (V'restricted_item' - V'switch_case') ^ 1,

    sequence = Ct((V'sequence_params' * sp * nl * sp * V'sequence_alts') * item_type('sequence')),

    sequence_params = (
      V'sequence_shuffle_optional' * sp * V'sequence_type' +
      V'sequence_shuffle' * sp * V'sequence_type' +
      V'sequence_shuffle' * sp * V'sequence_type_optional'
    ) * sp * ':' * sp * comment ^ -1,

    sequence_shuffle_optional = V'sequence_shuffle' + Cg(Cc(false), 'shuffle'),
    sequence_shuffle = Cg(P'shuffle' / function() return true end, 'shuffle'),

    sequence_type_optional = V'sequence_type' + Cg(Cc'cycle', 'sequence'),
    sequence_type = Cg(P'cycle' + 'stopping' + 'once', 'sequence'),

    sequence_alts = Cg(Ct((sp * V'sequence_alt') ^ 1), 'alts'),
    sequence_alt = ('-' - divert_sign) * ws * Ct(V'sequence_items'),
    sequence_items = (V'restricted_item' - V'sequence_alt') ^ 1,

    restricted_item = balanced_multiline_item(true) + V'restricted_singleline_item',
    restricted_singleline_item = sp * (V'global' + V'restricted_statement' + V'restricted_paragraph' - multiline_end) * ws,

    restricted_statement = Ct(
      V'choice' * item_type('choice') +
      V'assignment' * item_type('assignment')
    ) + comment + todo,

    restricted_paragraph = Ct((
      Cg(V'text_complex', 'parts') * sp * V'tags_optional' +
      Cg(V'text_optional', 'parts') * sp * tags
    ) * item_type('paragraph'))

  })

  local parsed_items = ink_grammar:match(content)
  local book = constructor.construct_book(parsed_items)
  return book
end

--- 反转义字符
-- @param text string
-- @return string
function constructor.unescape(text)
  local result = text
  result = result:gsub('\\|', '|')
  result = result:gsub('\\{', '{')
  result = result:gsub('\\}', '}')
  return result
end

--- 根据解析出的项目构造 Book
-- @param items table
-- @return table Book
function constructor.construct_book(items)
  local construction = {
    current_knot = '_',
    current_stitch = '_',
    variables_to_compute = {}
  }

  construction.book = {
    inclusions = {},
    lists = {},
    constants = {},
    variables = {},
    params = {},
    tree = { _ = { _ = {} } }
  }

  construction.book.version = {
    engine = enums.ENGINE_VERSION,
    tree = 1
  }

  construction.nodes_chain = {
    construction.book.tree[construction.current_knot][construction.current_stitch]
  }

  constructor.add_node(construction, items)
  constructor.clear(construction.book.tree)
  constructor.compute_variables(construction)

  return construction.book
end

--- 向当前节点链中添加节点
-- @param self table 构造上下文
-- @param items table 要添加的项目列表
-- @param is_restricted boolean|nil 是否为受限上下文
function constructor:add_node(items, is_restricted)
  local restricted = is_restricted ~= nil and is_restricted or false

  for _, item in ipairs(items) do
    if restricted then
      item.level = nil
      if item.type == 'choice' and item.divert == nil then
        item.type = nil
      end
    end

    if item.type == 'inclusion' then
      constructor.add_inclusion(self, item.filename)
    elseif item.type == 'list' then
      constructor.add_list(self, item.name, item.value)
    elseif item.type == 'constant' then
      constructor.add_constant(self, item.name, item.value)
    elseif item.type == 'variable' then
      constructor.add_variable(self, item.name, item.value)
    elseif item.type == 'func' then
      constructor.add_function(self, item.func.name, item.func.params)
    elseif item.type == 'knot' then
      constructor.add_knot(self, item.knot)
    elseif item.type == 'stitch' then
      constructor.add_stitch(self, item.stitch)
    elseif item.type == 'switch' then
      constructor.add_switch(self, item.expression, item.cases)
    elseif item.type == 'sequence' then
      constructor.add_sequence(self, item.sequence, item.shuffle, item.alts)
    elseif item.type == 'assignment' then
      constructor.add_assignment(self, item.level, item.name, item.value, item.temp)
    elseif item.type == 'return' then
      constructor.add_return(self, item.value)
    elseif item.type == 'paragraph' then
      constructor.add_paragraph(self, item.level, item.label, item.parts, item.tags)
    elseif item.type == 'gather' then
      constructor.add_paragraph(self, item.level, "", nil, item.tags)
    elseif item.type == 'choice' then
      constructor.add_choice(self, item.level, item.sticky, item.label, item.condition, item.text, item.divert, item.tags)
    end
  end
end

--- 添加文件包含声明
-- @param self table
-- @param filename string
function constructor:add_inclusion(filename)
  table.insert(self.book.inclusions, filename)
end

--- 添加列表定义
-- @param self table
-- @param name string
-- @param value string
function constructor:add_list(name, value)
  local items = lume.array(value:gmatch('[%w_%.]+'))
  self.book.lists[name] = items

  local switched = lume.array(value:gmatch('%b()'))
  switched = lume.map(switched, function(item) return item:sub(2, #item - 1) end)
  self.book.variables[name] = { [name] = {} }
  lume.each(switched, function(item) self.book.variables[name][name][item] = true end)
end

--- 添加常量定义
-- @param self table
-- @param constant string
-- @param value string
function constructor:add_constant(constant, value)
  local val = lume.deserialize(value)
  self.book.constants[constant] = val
end

--- 添加变量定义（延迟计算）
-- @param self table
-- @param variable string
-- @param value string
function constructor:add_variable(variable, value)
  self.variables_to_compute[variable] = value
end

--- 添加函数定义
-- @param self table
-- @param fname string
-- @param params table
function constructor:add_function(fname, params)
  local node = {}
  self.book.tree[fname] = { ['_'] = node }
  self.book.params[fname] = params
  self.nodes_chain = { node }
end

--- 添加 Knot（章节）
-- @param self table
-- @param knot string
function constructor:add_knot(knot)
  self.current_knot = knot
  self.current_stitch = '_'

  local node = {}
  self.book.tree[self.current_knot] = { [self.current_stitch] = node }
  self.nodes_chain = { node }
end

--- 添加 Stitch（子章节）
-- @param self table
-- @param stitch string
function constructor:add_stitch(stitch)
  if self.current_stitch == '_' then
    local root_stitch_node = self.book.tree[self.current_knot]._
    if #root_stitch_node == 0 then
      local divertItem = { divert = { path = stitch } }
      table.insert(root_stitch_node, divertItem)
    end
  end

  self.current_stitch = stitch

  local node = {}
  self.book.tree[self.current_knot][self.current_stitch] = node
  self.nodes_chain = { node }
end

--- 添加 Switch（多路条件分支）
-- @param self table
-- @param expression string|nil
-- @param cases table
function constructor:add_switch(expression, cases)
  if expression then
    for _, case in ipairs(cases) do
      if case.condition ~= 'else' then
        case.condition = expression .. '==' .. case.condition
      end
    end
  end

  local item = {
    condition = {},
    success = {}
  }

  for _, case in ipairs(cases) do
    if case.condition == 'else' then
      local failure_node = {}
      table.insert(self.nodes_chain, failure_node)
      constructor.add_node(self, case.node, true)
      table.remove(self.nodes_chain)
      item.failure = failure_node
    else
      local success_node = {}
      table.insert(self.nodes_chain, success_node)
      constructor.add_node(self, case.node, true)
      table.remove(self.nodes_chain)
      table.insert(item.success, success_node)
      table.insert(item.condition, case.condition)
    end
  end

  constructor.add_item(self, nil, item)
end

--- 添加 Sequence（序列/切换）
-- @param self table
-- @param sequence string
-- @param shuffle boolean|nil
-- @param alts table
function constructor:add_sequence(sequence, shuffle, alts)
  local item = {
    sequence = sequence,
    shuffle = shuffle and true or nil,
    alts = {}
  }

  for _, alt in ipairs(alts) do
    local alt_node = {}
    table.insert(self.nodes_chain, alt_node)
    constructor.add_node(self, alt, true)
    table.remove(self.nodes_chain)
    table.insert(item.alts, alt_node)
  end

  constructor.add_item(self, nil, item)
end

--- 添加函数返回值
-- @param self table
-- @param value string
function constructor:add_return(value)
  local item = {
    return_value = value
  }
  constructor.add_item(self, nil, item)
end

--- 添加赋值语句
-- @param self table
-- @param level number|nil
-- @param name string
-- @param value string
-- @param temp boolean|nil
function constructor:add_assignment(level, name, value, temp)
  local item = {
    temp = temp or nil,
    var = name,
    value = value
  }
  constructor.add_item(self, level, item)
end

--- 添加段落
-- @param self table
-- @param level number|nil
-- @param label string|nil
-- @param parts table|nil
-- @param tags table|nil
function constructor:add_paragraph(level, label, parts, tags)
  local items = constructor.convert_paragraph_parts_to_items(parts, true)
  items = items or {}

  if label ~= nil or tags ~= nil then
    local first_item

    if #items > 0 and items[1].condition == nil then
      first_item = items[1]
    else
      first_item = {}
      table.insert(items, first_item)
    end

    first_item.label = label
    first_item.tags = tags
  end

  for _, item in ipairs(items) do
    constructor.add_item(self, level, item)
  end
end

--- 将段落片段转换为项目列表
-- @param parts table|nil
-- @param is_root boolean|nil
-- @return table|nil
function constructor.convert_paragraph_parts_to_items(parts, is_root)
  if parts == nil then return nil end

  local root = is_root ~= nil and is_root or false
  local items = {}
  local item

  for index, part in ipairs(parts) do
    if part.condition then
      item = {
        condition = part.condition.condition,
        success = constructor.convert_paragraph_parts_to_items(part.condition.success),
        failure = constructor.convert_paragraph_parts_to_items(part.condition.failure)
      }
      table.insert(items, item)
      item = nil
    elseif part.sequence then
      item = {
        sequence = part.sequence.sequence,
        shuffle = part.sequence.shuffle and true or nil,
        alts = {}
      }
      for _, alt in ipairs(part.sequence.alts) do
        table.insert(item.alts, constructor.convert_paragraph_parts_to_items(alt))
      end
      table.insert(items, item)
      item = nil
    else
      local is_divert_only = part.divert ~= nil and part.text == nil

      if item == nil then
        item = { text = (root or is_divert_only) and '' or '<>' }
      end

      if part.text then
        item.text = item.text .. part.text:gsub('%s+', ' ')
        item.text = constructor.unescape(item.text)
      elseif part.expression then
        item.text = item.text .. '#' .. part.expression .. '#'
      end

      if part.divert or part.exit then
        item.exit = part.exit and true or nil
        item.divert = part.divert
        item.text = #item.text > 0 and (item.text .. '<>') or nil
        table.insert(items, item)
        item = nil
      else
        local next = parts[index + 1]
        local next_is_block = next and not (next.text or next.expression)

        if not next or next_is_block then
          if not root or next_is_block then
            item.text = item.text .. '<>'
          end
          table.insert(items, item)
          item = nil
        end
      end
    end
  end

  if root then
    local first_item = items[1]
    if first_item.text == nil and first_item.divert == nil and first_item.exit == nil then
      table.insert(items, 1, { text = '' })
    end

    local last_item = items[#items]
    if last_item.text == nil and last_item.divert == nil and last_item.exit == nil then
      table.insert(items, { text = '' })
    elseif last_item.text ~= nil and last_item.divert == nil then
      last_item.text = last_item.text:gsub('(.-)%s*$', '%1')
    end
  end

  return items
end

--- 添加选项
-- @param self table
-- @param level number|nil
-- @param sticky boolean|nil
-- @param label string|nil
-- @param condition string|nil
-- @param sentence string|nil
-- @param divert table|nil
-- @param tags table|nil
function constructor:add_choice(level, sticky, label, condition, sentence, divert, tags)
  local item = {
    sticky = sticky or nil,
    condition = condition,
    label = label,
    divert = divert,
    tags = tags
  }

  if sentence == nil then
    item.choice = 0
  else
    local prefix, divider, suffix = sentence:match('(.*)%[(.*)%](.*)')
    prefix = prefix or sentence
    divider = divider or ''
    suffix = suffix or ''

    local text = (prefix .. suffix):gsub('%s+', ' ')
    local choice = (prefix .. divider):gsub('%s+', ' '):gsub('^%s*(.-)%s*$', '%1')

    if divert and #text > 0 and text:match('%S+') then
      text = text .. '<>'
    else
      text = text:gsub('^%s*(.-)%s*$', '%1')
    end

    item.text = constructor.unescape(text)
    item.choice = constructor.unescape(choice)
  end

  constructor.add_item(self, level, item)

  if divert == nil then
    item.node = {}
    table.insert(self.nodes_chain, item.node)
  end
end

--- 将项目添加到当前节点链的指定层级
-- @param self table
-- @param level number|nil
-- @param item table
function constructor:add_item(level, item)
  local lvl = (level ~= nil and level > 0) and level or #self.nodes_chain
  while #self.nodes_chain > lvl do
    table.remove(self.nodes_chain)
  end

  local node = self.nodes_chain[#self.nodes_chain]
  table.insert(node, item)
end

--- 计算变量的最终值（处理列表字面量等）
-- @param self table
-- @param variable string
-- @param value string
function constructor:compute_variable(variable, value)
  local constant = self.book.constants[value]
  if constant then
    self.book.variables[variable] = constant
    return
  end

  local list_expression = value:match('%(([%s%w%.,_]*)%)')
  local item_expressions = list_expression and lume.array(list_expression:gmatch('[%w_%.]+')) or { value }
  local list_variable = list_expression and {} or nil

  for _, item_expression in ipairs(item_expressions) do
    local list_part, item_part = item_expression:match('([%w_]+)%.([%w_]+)')
    item_part = item_part or item_expression

    for list_name, list_items in pairs(self.book.lists) do
      local list_is_valid = list_part == nil or list_part == list_name
      local item_is_found = lume.find(list_items, item_part)

      if list_is_valid and item_is_found then
        list_variable = list_variable or {}
        list_variable[list_name] = list_variable[list_name] or {}
        list_variable[list_name][item_part] = true
      end
    end
  end

  if list_variable then
    self.book.variables[variable] = list_variable
  else
    self.book.variables[variable] = lume.deserialize(value)
  end
end

--- 计算所有延迟定义的变量
-- @param self table
function constructor:compute_variables()
  for variable, value in pairs(self.variables_to_compute) do
    constructor.compute_variable(self, variable, value)
  end
end

--- 清理和简化树节点
-- @param tree table
function constructor.clear(tree)
  for knot, node in pairs(tree) do
    for stitch, snode in pairs(node) do
      constructor.clear_node(snode)
    end
  end
end

--- 清理单个节点
-- @param node table
function constructor.clear_node(node)
  for index, item in ipairs(node) do
    if item.text ~= nil and lume.count(item) == 1 then
      node[index] = item.text
    end

    if item.node ~= nil then
      if #item.node == 0 then
        item.node = nil
      else
        constructor.clear_node(item.node)
      end
    end

    if item.success ~= nil then
      if type(item.condition) == 'table' and #item.condition == 1 then
        item.condition = item.condition[1]
      end

      if item.success[1] ~= nil and item.success[1][1] ~= nil then
        for idx, success_node in ipairs(item.success) do
          constructor.clear_node(success_node)
          if #success_node == 1 and type(success_node[1]) == 'string' then
            item.success[idx] = success_node[1]
          end
        end

        if #item.success == 1 then
          item.success = item.success[1]
        end
      else
        constructor.clear_node(item.success)
        if #item.success == 1 and type(item.success[1]) == 'string' then
          item.success = item.success[1]
        end
      end

      if item.failure ~= nil then
        constructor.clear_node(item.failure)
        if #item.failure == 1 and type(item.failure[1]) == 'string' then
          item.failure = item.failure[1]
        end
      end
    end

    if item.alts ~= nil then
      for idx, alt_node in ipairs(item.alts) do
        constructor.clear_node(alt_node)
        if #alt_node == 1 and type(alt_node[1]) == 'string' then
          item.alts[idx] = alt_node[1]
        end
      end
    end
  end
end


-- ============================================================================
-- Section 6: Story 故事状态机（内嵌）
-- ============================================================================

--- Story 类，管理 Ink 故事的运行状态、段落输出和选择推进
local Story = Object:extend()

--- Story 构造函数
-- @param book table 由 parser.parse 生成的 Book 数据结构
function Story:new(book)
  self.tree = book.tree
  self.constants = book.constants
  self.variables = lume.clone(book.variables)
  self.lists = book.lists
  self.params = book.params

  self.list_mt = mt
  self.list_mt.lists = self.lists

  self.version = book.constants.version or 0

  --- 状态迁移函数（可在子类中覆盖）
  -- @param state table 旧状态
  -- @param old_version number
  -- @param new_version number
  -- @return table 迁移后的状态
  self.migrate = function(state, old_version, new_version) return state end

  self.functions = self:ink_functions()
  self.observers = {}
  self.global_tags = self:get_tags()

  self.temp = {}
  self.seeds = {}
  self.choices = {}
  self.paragraphs = {}
  self.output = {}
  self.visits = {}
  self.current_path = nil
  self.is_over = false

  self.tunnels = {}
  self.stack = {}
end

--- 启动故事，生成第一批段落和选项
function Story:begin()
  if #self.paragraphs > 0 or #self.choices > 0 then
    return
  end

  self:jump_path('_')
end

--- 判断故事是否可以继续输出段落
-- @return boolean
function Story:can_continue()
  return #self.paragraphs > 0
end

--- 从段落队列中拉取指定数量的段落
-- @param steps number|nil 要拉取的段落数，为 0 或未指定则全部拉取
-- @return table 段落数组，单个时若 steps==1 可返回单条
function Story:continue(steps)
  local lines = {}

  if not self:can_continue() then
    return lines
  end

  local stp = steps or 0
  local single_mode = stp == 1

  stp = stp > 0 and stp or #self.paragraphs
  stp = stp > #self.paragraphs and #self.paragraphs or stp

  for index = 1, stp do
    local paragraph = self.paragraphs[index]
    paragraph.text = paragraph.text:gsub('^%s*(.-)%s*$', '%1')
    table.insert(lines, paragraph)
    table.insert(self.output, paragraph)
  end

  for _ = 1, stp do
    table.remove(self.paragraphs, 1)
  end

  return single_mode and lines[1] or lines
end

--- 判断当前是否存在可供玩家选择的选项
-- 若仍有段落未输出则返回 false。
-- @return boolean
function Story:can_choose()
  return self.choices ~= nil and #self.choices > 0 and not self:can_continue()
end

--- 获取当前可用的选项标题列表
-- @return table 选项数组
function Story:get_choices()
  local choices = {}

  if self:can_continue() then
    return choices
  end

  for _, choice in ipairs(self.choices) do
    local model = {
      text = choice.title,
      tags = choice.tags
    }
    table.insert(choices, model)
  end

  return choices
end

--- 玩家做出选择，继续推进故事
-- @param index number 选择的索引（从 1 开始）
function Story:choose(index)
  if self:can_continue() then
    return
  end

  if #self.tunnels > 0 then
    self.tunnels[#self.tunnels].restore = true
  end

  local choice_is_available = index > 0 and index <= #self.choices
  assert(choice_is_available, 'Choice index ' .. index .. ' out of bounds 1-' .. #self.choices)

  local choice = self.choices[index]
  assert(choice, 'Choice index ' .. index .. ' out of bounds 1-' .. #self.choices)

  self.paragraphs = {}
  self.choices = {}

  if choice.text and #choice.text > 0 then
    local paragraph = {
      text = choice.text,
      tags = choice.tags
    }
    table.insert(self.paragraphs, paragraph)
  end

  self:visit(choice.path)

  if choice.divert ~= nil then
    if choice.divert.tunnel then
      local context = { path = choice.path, restore = true, previous = self.current_path }
      table.insert(self.tunnels, context)
    end
    self:jump_path(choice.divert.path)
  else
    self:read_path(choice.path)
  end
end

--- 直接跳转到指定路径
-- @param path_string string 路径字符串，例如 'knot.stitch.label'
function Story:jump_to(path_string)
  self:jump_path(path_string)
end

--- 获取某路径被访问的次数
-- @param path_string string 路径字符串
-- @return number
function Story:get_visits(path_string)
  return self:get_visits_with_context(path_string)
end

--- 获取指定路径的标签
-- @param path_string string|nil 路径字符串
-- @return table 标签数组
function Story:get_tags(path_string)
  local path = self:path_from_string(path_string)
  local items = self:items_for(path.knot, path.stitch)
  local tags = {}

  for _, item in ipairs(items) do
    if type(item) == 'table' and lume.count(item) > 1 or item.tags == nil then
      break
    end

    local item_tags = type(item.tags) == 'string' and { item.tags } or item.tags
    tags = lume.concat(tags, item_tags)
  end

  return tags
end

--- 保存当前故事状态（用于存档）
-- @return table 状态表
function Story:save_state()
  local state = {
    version = self.version,
    temp = self.temp,
    seeds = self.seeds,
    variables = self.variables,
    params = self.params,
    visits = self.visits,
    path = self.current_path,
    paragraphs = self.paragraphs,
    choices = self.choices,
    output = self.output,
    tunnels = self.tunnels
  }
  return state
end

--- 恢复故事状态（用于读档）
-- @param state table 由 save_state 生成的状态表
function Story:load_state(state)
  if self.version ~= state.version then
    state = self.migrate(state, state.version, self.version)
  end

  self.temp = state.temp
  self.seeds = state.seeds
  self.variables = state.variables
  self.params = state.params or {}
  self.visits = state.visits
  self.current_path = state.path
  self.paragraphs = state.paragraphs
  self.choices = state.choices
  self.output = state.output
  self.tunnels = state.tunnels or {}
end

--- 为变量变更注册观察者回调
-- @param variable string 变量名
-- @param observer function 回调函数 function(value)
function Story:observe(variable, observer)
  self.observers[variable] = observer
end

--- 绑定外部 Lua 函数供 Ink 脚本调用
-- @param func_name string 函数名
-- @param handler function 处理函数
function Story:bind(func_name, handler)
  self.functions[func_name] = handler
end

--- 在项目中查找标签对应的节点链
-- @param path table 路径对象
-- @return table 节点索引链
function Story:path_chain_for_label(path)
  local label = path.label
  local items = self:items_for(path.knot, path.stitch)

  local function find_label_chain_in_items(nitems)
    if type(nitems) ~= 'table' then
      return nil
    end

    for idx, item in ipairs(nitems) do
      if item.label == label then
        return { idx }
      elseif item.node ~= nil then
        local result = find_label_chain_in_items(item.node)
        if result ~= nil then
          table.insert(result, 1, idx)
          return result
        end
      elseif item.success ~= nil then
        if type(item.success) == 'table' then
          local is_switch = item.success[1] ~= nil and item.success[1][1] ~= nil
          local cases = is_switch and item.success or { item.success }

          for case_index, case in ipairs(cases) do
            local result = find_label_chain_in_items(case)
            if result ~= nil then
              table.insert(result, 1, 't' .. case_index)
              table.insert(result, 1, idx)
              return result
            end
          end
        end

        if type(item.failure) == 'table' then
          local result = find_label_chain_in_items(item.failure)
          if result ~= nil then
            table.insert(result, 1, 'f')
            table.insert(result, 1, idx)
            return result
          end
        end
      end
    end

    return nil
  end

  local chain = find_label_chain_in_items(items)
  assert(chain, 'Label \'' .. label .. '\' not found')
  return chain
end

--- 跳转到指定路径并读取内容
-- @param path_string string 路径字符串
-- @param params table|nil 传入的参数
function Story:jump_path(path_string, params)
  assert(path_string, 'The path_string can\'t be nil')

  self.choices = {}

  if path_string == 'END' or path_string == 'DONE' then
    self.is_over = true
    return
  end

  local path = self:path_from_string(path_string, self.current_path)

  if path.label ~= nil then
    path.chain = self:path_chain_for_label(path)
  end

  return self:read_path(path, params)
end

--- 读取指定路径的节点内容
-- @param path table 路径对象
-- @param params table|nil 传入参数
function Story:read_path(path, params)
  assert(path, 'The reading path can\'t be nil')

  if self.is_over then
    return
  end

  if not path.label then
    self:visit(path)
  end

  if params then
    for name, value in pairs(params) do
      self:assign_value_to(name, value, true)
    end
  end

  local items = self:items_for(path.knot, path.stitch)
  return self:read_items(items, path)
end

--- 根据 Knot 和 Stitch 名称获取对应节点内容
-- @param knot string|nil
-- @param stitch string|nil
-- @return table 节点项目数组
function Story:items_for(knot, stitch)
  local root_node = self.tree
  local knot_node = knot == nil and root_node._ or root_node[knot]
  assert(knot_node or lume.isarray(root_node), 'The knot \'' .. (knot or '_') .. '\' not found')

  local stitch_node = stitch == nil and knot_node._ or knot_node[stitch]
  assert(stitch_node or lume.isarray(knot_node), 'The stitch \'' .. (knot or '_') .. '.' .. (stitch or '_') .. '\' not found')

  return stitch_node or knot_node or root_node
end

--- 递归读取节点项目
-- @param items table 项目数组
-- @param path table 当前路径
-- @param depth number|nil 递归深度
-- @param mode number|nil 读取模式
-- @param current_index number|nil 当前索引
-- @return number 读取后的模式
function Story:read_items(items, path, depth, mode, current_index)
  assert(items, 'Items can\'t be nil')
  assert(path, 'Path can\'t be nil')

  local chain = path.chain or {}
  local dep = depth or 0
  local deep_index = chain[dep + 1]
  local rmode = mode or enums.READ_MODE.TEXT

  local make_deep_path = function(values, label_prefix)
    local deep_chain = lume.slice(chain, 1, dep)

    for values_index, value in ipairs(values) do
      deep_chain[dep + values_index] = value
    end

    local deep_path = lume.clone(path)
    deep_path.chain = deep_chain

    if label_prefix then
      deep_path.label = label_prefix .. table.concat(deep_chain, '.')
    end

    return deep_path
  end

  for index = current_index or (deep_index or 1), #items do
    local context = {
      items = items,
      path = path,
      depth = dep,
      mode = rmode,
      index = index + 1,
      previous = self.current_path
    }

    local item = items[index]
    local skip = false

    if item.return_value then
      self.return_value = tostring(item.return_value)
      return enums.READ_MODE.QUIT
    end

    local item_type = enums.ITEM.TEXT

    if type(item) == 'table' then
      if item.choice ~= nil then
        item_type = enums.ITEM.CHOICE
      elseif item.success ~= nil then
        item_type = enums.ITEM.CONDITION
      elseif item.var ~= nil then
        item_type = enums.ITEM.VARIABLE
      elseif item.alts ~= nil then
        item_type = enums.ITEM.ALTS
      end
    end

    if index == deep_index then
      if item_type == enums.ITEM.CHOICE and item.node ~= nil then
        rmode = enums.READ_MODE.GATHERS
        rmode = self:read_items(item.node, path, dep + 1) or rmode
      elseif item_type == enums.ITEM.CONDITION then
        local chain_value = chain[dep + 2]
        local is_success = chain_value:sub(1, 1) == 't'
        local node

        if is_success then
          local success_index = tonumber(chain_value:sub(2, 2)) or 0
          node = success_index > 0 and item.success[success_index] or item.success
        else
          node = item.failure
        end

        rmode = self:read_items(node, path, dep + 2, rmode) or rmode
      end

      if item_type == enums.ITEM.CONDITION or item_type == enums.ITEM.CHOICE then
        rmode = rmode ~= enums.READ_MODE.QUIT and enums.READ_MODE.GATHERS or rmode
        skip = true
      end
    end

    if rmode == enums.READ_MODE.CHOICES and item_type ~= enums.ITEM.CHOICE then
      rmode = enums.READ_MODE.QUIT
      skip = true
    elseif rmode == enums.READ_MODE.GATHERS and item_type == enums.ITEM.CHOICE then
      skip = true
    end

    if not skip then
      if item_type == enums.ITEM.TEXT then
        rmode = enums.READ_MODE.TEXT
        local safe_item = type(item) == 'string' and { text = item } or item
        rmode = self:read_text(safe_item, context) or rmode
      elseif item_type == enums.ITEM.ALTS then
        rmode = enums.READ_MODE.TEXT
        local deep_path = make_deep_path({ index }, '~')
        rmode = self:read_alts(item, deep_path, dep + 1, rmode) or rmode
      elseif item_type == enums.ITEM.CHOICE and self:check_condition(item.condition) then
        rmode = enums.READ_MODE.CHOICES
        local deep_path = make_deep_path({ index }, '>')
        deep_path.label = item.label or deep_path.label
        rmode = self:read_choice(item, deep_path) or rmode

        if index == #items and type(chain[#chain]) == 'number' then
          rmode = enums.READ_MODE.QUIT
        end
      elseif item_type == enums.ITEM.CONDITION then
        local result, chain_value

        if type(item.condition) == 'string' then
          local success = self:check_condition(item.condition)
          result = success and item.success or (item.failure or {})
          chain_value = success and 't' or 'f'
        elseif type(item.condition) == 'table' then
          local success = self:check_switch(item.condition)
          result = success > 0 and item.success[success] or (item.failure or {})
          chain_value = success > 0 and ('t' .. success) or 'f'
        end

        if type(result) == 'string' then
          rmode = enums.READ_MODE.TEXT
          rmode = self:read_text({ text = result }, context) or rmode
        elseif type(result) == 'table' then
          local deep_path = make_deep_path({ index, chain_value })
          rmode = self:read_items(result, deep_path, dep + 2, rmode) or rmode
        end
      elseif item_type == enums.ITEM.VARIABLE then
        self:assign_value_to(item.var, item.value, item.temp)
      end
    end

    if item.label ~= nil and item_type ~= enums.ITEM.CHOICE and not skip then
      local label_path = lume.clone(path)
      label_path.label = item.label
      self:visit(label_path)
    end

    if rmode == enums.READ_MODE.QUIT then
      break
    end
  end

  if dep == 0 then
    for idx = #self.paragraphs, 1, -1 do
      local paragraph = self.paragraphs[idx]
      if (not paragraph.text or #paragraph.text == 0) and (not paragraph.tags or #paragraph.tags == 0) then
        table.remove(self.paragraphs, idx)
      else
        paragraph.text = paragraph.text:match('(.-)%s*<>$') or paragraph.text
      end
    end
  end

  return rmode
end

--- 读取文本段落
-- @param item table 项目
-- @param context table 上下文
-- @return number|nil 读取模式
function Story:read_text(item, context)
  local text = item.text
  local tags = type(item.tags) == 'string' and { item.tags } or item.tags
  local paragraphs = #self.stack == 0 and self.paragraphs or self.stack[#self.stack]

  if text ~= nil or tags ~= nil then
    local paragraph = { text = text or '<>', tags = tags }
    local stack

    paragraph.text, stack = self:replace_expressions(paragraph.text)
    paragraph.text = paragraph.text:gsub('%s+', ' ')

    table.insert(stack, paragraph)

    for _, para in ipairs(stack) do
      local glued_by_prev = #paragraphs > 0 and paragraphs[#paragraphs].text:sub(-2) == '<>'
      local glued_by_this = text ~= nil and text:sub(1, 2) == '<>'

      if glued_by_prev then
        local prev_paragraph = paragraphs[#paragraphs]
        prev_paragraph.text = prev_paragraph.text:sub(1, #prev_paragraph.text - 2)
        paragraphs[#paragraphs] = prev_paragraph
      end

      if glued_by_this then
        para.text = para.text:sub(3)
      end

      if glued_by_prev or (glued_by_this and #paragraphs > 0) then
        local prev_paragraph = paragraphs[#paragraphs]
        prev_paragraph.text = (prev_paragraph.text .. para.text):gsub('%s+', ' ')
        prev_paragraph.tags = lume.concat(prev_paragraph.tags, para.tags)
        prev_paragraph.tags = #prev_paragraph.tags > 0 and prev_paragraph.tags or nil
        paragraphs[#paragraphs] = prev_paragraph
      else
        table.insert(paragraphs, #paragraphs + 1, para)
      end
    end
  end

  if item.divert ~= nil then
    if item.divert.tunnel then
      table.insert(self.tunnels, context)
    end

    local mode = self:jump_path(item.divert.path)

    if item.divert.tunnel then
      return (mode == enums.READ_MODE.QUIT and #self.choices == 0) and enums.READ_MODE.TEXT or mode
    end

    return enums.READ_MODE.QUIT
  end

  if item.exit then
    local ctx = assert(table.remove(self.tunnels), 'Tunnel stack is empty')
    self.current_path = ctx.previous
    if ctx.restore then
      if ctx.items == nil then
        self:read_path(ctx.path)
        return enums.READ_MODE.QUIT
      end
      self:read_items(ctx.items, ctx.path, ctx.depth, ctx.mode, ctx.index)
      return enums.READ_MODE.QUIT
    end
    return enums.READ_MODE.TEXT
  end
end

--- 读取序列/切换项目
-- @param item table 序列项目
-- @param path table 路径对象
-- @param depth number 深度
-- @param mode number 读取模式
-- @return number|nil
function Story:read_alts(item, path, depth, mode)
  assert(item.alts, 'Alternatives can\'t be nil')
  local alts = lume.clone(item.alts)

  local sequence = item.sequence or enums.SEQUENCE.STOPPING
  if type(sequence) == 'string' then
    sequence = enums.SEQUENCE[item.sequence]
  end

  self:visit(path)
  local visits = self:get_visits_for_path(path)
  local index = 0

  if item.shuffle then
    local seed_key = (path.knot or '_') .. '.' .. (path.stitch or '_') .. ':' .. path.label
    local seed = visits % #alts == 1 and (self.debug_seed or os.time() * 1000) or self.seeds[seed_key]
    self.seeds[seed_key] = seed

    for idx, alt in ipairs(alts) do
      math.randomseed(seed + idx)
      local pair_index = idx < #alts and math.random(idx, #alts) or idx
      alts[idx] = alts[pair_index]
      alts[pair_index] = alt
    end
  end

  if sequence == enums.SEQUENCE.CYCLE then
    index = visits % #alts
    index = index > 0 and index or #alts
  elseif sequence == enums.SEQUENCE.STOPPING then
    index = visits < #alts and visits or #alts
  elseif sequence == enums.SEQUENCE.ONCE then
    index = visits
  end

  local alt = index <= #alts and alts[index] or {}
  local aitems = type(alt) == 'string' and { alt } or alt

  return self:read_items(aitems, path, depth, mode)
end

--- 读取选项项目
-- @param item table 选项定义
-- @param path table 路径对象
-- @return number|nil
function Story:read_choice(item, path)
  local is_fallback = item.choice == 0

  if is_fallback then
    if #self.choices == 0 then
      if item.divert ~= nil then
        self:jump_path(item.divert.path)
      else
        self:read_path(path)
      end
    end
    return enums.READ_MODE.QUIT
  end

  local title = self:replace_expressions(item.choice)
  title = title:match('(.-)%s*<>$') or title

  local choice = {
    title = title,
    text = item.text ~= nil and self:replace_expressions(item.text) or title,
    divert = item.divert,
    tags = item.tags,
    path = path
  }

  if item.sticky or self:get_visits_for_path(path) == 0 then
    table.insert(self.choices, #self.choices + 1, choice)
  end
end

--- 替换字符串中的表达式为计算结果
-- @param text string
-- @return string, table 替换后的文本和堆栈
function Story:replace_expressions(text)
  local stack = {}

  local replaced = text:gsub('%b##', function(match)
    if #match == 2 then
      return '#'
    else
      local result
      result, stack = self:do_expression(match:sub(2, #match - 1))

      if type(result) == 'table' then
        result = self.list_mt.__tostring(result)
      elseif type(result) == 'boolean' then
        result = result and 1 or 0
      elseif type(result) == 'number' then
        result = tostring(result)
        if result:sub(-2) == '.0' then
          result = result:sub(1, -3)
        end
      elseif result == nil then
        result = ''
      end

      return result
    end
  end)

  return replaced, stack
end

--- 检查 Switch 条件，返回匹配的分支索引
-- @param conditions table 条件数组
-- @return number 匹配索引，0 表示无匹配
function Story:check_switch(conditions)
  for index, condition in ipairs(conditions) do
    if self:check_condition(condition) then
      return index
    end
  end
  return 0
end

--- 检查条件表达式是否成立
-- @param condition string|nil 条件表达式
-- @return boolean
function Story:check_condition(condition)
  if condition == nil then
    return true
  end

  local result, stack = self:do_expression(condition)

  for _, paragraph in ipairs(stack) do
    table.insert(self.paragraphs, paragraph)
  end

  if type(result) == 'table' and not next(result) then
    result = nil
  end

  return result ~= nil and result ~= false
end

--- 执行一段 Ink 表达式并返回结果
-- @param expression string 表达式字符串
-- @return any, table 计算结果和可能生成的段落堆栈
function Story:do_expression(expression)
  assert(type(expression) == 'string', 'Expression must be a string')

  local code = ''
  local lists = {}
  local stack = {}

  -- 运算符替换
  expression = expression:gsub('!=', '~=')
  expression = expression:gsub('%s*||%s*', ' or ')
  expression = expression:gsub('%s*%&%&%s*', ' and ')
  expression = expression:gsub('%s+has%s+', ' ? ')
  expression = expression:gsub('%s+hasnt%s+', ' !? ')
  expression = expression:gsub('!%s*%w', ' not ')

  -- 函数调用替换
  expression = expression:gsub('[%a_][%w_]*%b()', function(match)
    local func_name = match:match('([%a_][%w_]*)%(')
    local params_string = match:match('[%a_][%w_]*%((.+)%)')
    local params = params_string ~= nil and lume.map(lume.split(params_string, ','), lume.trim) or nil

    for idx, param in ipairs(params or {}) do
      params[idx] = self:do_expression(param)
    end

    local func = self.functions[func_name]

    if func ~= nil then
      local value = func((table.unpack or unpack)(params or {}))

      if type(value) == 'table' then
        lists[#lists + 1] = value
        return '__list' .. #lists
      else
        return lume.serialize(value)
      end
    elseif self.lists[func_name] ~= nil then
      local idx = params and params[1] or 0
      local list_item = self.lists[func_name][idx]
      local list = list_item and { [func_name] = { [list_item] = true } } or {}

      lists[#lists + 1] = list
      return '__list' .. #lists
    else
      self.return_value = nil

      local func_params = {}
      local path = self.current_path

      if params then
        for i, value in ipairs(params) do
          func_params[self.params[func_name][i]] = tostring(value)
        end
      end

      table.insert(self.stack, {})
      self:jump_path(func_name, func_params)
      self.current_path = path

      for _, paragraph in ipairs(table.remove(self.stack)) do
        table.insert(stack, paragraph)
      end

      return self.return_value
    end
  end)

  -- 列表字面量替换
  expression = expression:gsub('%(([%s%w%.,_]*)%)', function(match)
    local list = self:make_list_for(match)
    if list ~= nil then
      lists[#lists + 1] = list
      return '__list' .. #lists
    else
      return 'nil'
    end
  end)

  -- 保护字符串不被变量替换破坏
  local strings_bag = {}
  expression = expression:gsub('%b""', function(match)
    table.insert(strings_bag, match)
    return '#' .. #strings_bag .. '#'
  end)

  -- 变量替换
  expression = expression:gsub('[%a_][%w_%.]*', function(match)
    local exceptions = { 'and', 'or', 'true', 'false', 'nil', 'not' }

    if lume.find(exceptions, match) or match:match('__list%d*') then
      return match
    else
      local value = self:get_value_for(match)

      if type(value) == 'table' then
        lists[#lists + 1] = value
        return '__list' .. #lists
      else
        return lume.serialize(value)
      end
    end
  end)

  -- has / hasnt 替换
  expression = expression:gsub('[%a_#][%w_%.#]*[%s]*[%?!]+[%s]*[%a_#][%w_%.#]*', function(match)
    local lhs, operator, rhs = match:match('([%a_#][%w_%.#]*)[%s]*([%?!]+)[%s]*([%a_#][%w_%.#]*)')

    if lhs:match('__list%d*') then
      return lhs .. ' % ' .. rhs .. (operator == '?' and ' == true' or ' == false')
    else
      return 'string.match(' .. lhs .. ', ' .. rhs .. ')' .. (operator == '?' and ' ~= nil' or ' == nil')
    end
  end)

  -- 恢复字符串
  expression = expression:gsub('%b##', function(match)
    local idx = tonumber(match:sub(2, -2))
    return strings_bag[idx or 0]
  end)

  -- 绑定列表元表
  if #lists > 0 then
    code = code .. 'local mt = ' .. lume.serialize(mt) .. '\n'
    code = code .. 'mt.lists = ' .. lume.serialize(self.lists) .. '\n\n'

    for idx, list in pairs(lists) do
      local name = '__list' .. idx
      code = code .. 'local ' .. name .. ' = ' .. lume.serialize(list) .. '\n'
      code = code .. 'setmetatable(' .. name .. ', mt)\n\n'
    end
  end

  code = code .. 'return ' .. expression
  return lume.dostring(code), stack
end

--- 为变量赋值
-- @param variable string 变量名
-- @param expression string 值表达式
-- @param temp boolean|nil 是否为临时变量
function Story:assign_value_to(variable, expression, temp)
  if self.constants[variable] ~= nil then
    return
  end
  local value = self:do_expression(expression)

  if #variable == 0 then
    return
  end
  local storage = (temp or self.temp[variable] ~= nil) and self.temp or self.variables

  if storage[variable] == value then
    return
  end
  storage[variable] = value

  local observer = self.observers[variable]
  if observer ~= nil then
    observer(value)
  end
end

--- 获取变量的值
-- @param variable string 变量名
-- @return any
function Story:get_value_for(variable)
  local result = self.temp[variable]

  if result == nil then
    result = self.variables[variable]
  end
  if result == nil then
    result = self.constants[variable]
  end
  if result == nil then
    result = self:make_list_for(variable)
  end
  if result == nil then
    local visits = self:get_visits_with_context(variable, self.current_path)
    result = visits > 0 and visits or nil
  end

  return result
end

--- 根据字符串表达式构造 Ink 列表
-- @param expression string
-- @return table|nil
function Story:make_list_for(expression)
  local result = {}
  if not expression:find('%S') then
    return result
  end

  local items = lume.array(expression:gmatch('[%w_%.]+'))

  for _, item in ipairs(items) do
    local list_name, item_name = self:get_list_name_for(item)
    if list_name ~= nil and item_name ~= nil then
      result[list_name] = result[list_name] or {}
      result[list_name][item_name] = true
    end
  end

  return next(result) ~= nil and result or nil
end

--- 根据项名称查找所属的列表名
-- @param name string
-- @return string|nil, string|nil
function Story:get_list_name_for(name)
  local list_name, item_name = name:match('([%w_]+)%.([%w_]+)')
  item_name = item_name or name

  if list_name == nil then
    for key, list in pairs(self.lists) do
      for _, str in ipairs(list) do
        if str == item_name then
          list_name = key
          break
        end
      end
    end
  end

  local not_found = list_name == nil or self.lists[list_name] == nil

  if not_found then
    return nil
  end

  return list_name, item_name
end

--- 记录路径访问
-- @param path table 路径对象
function Story:visit(path)
  local path_is_changed = self.current_path == nil or path.knot ~= self.current_path.knot or path.stitch ~= self.current_path.stitch

  if path_is_changed then
    if self.current_path == nil or path.knot ~= self.current_path.knot then
      local knot = path.knot or '_'
      local visits = self.visits[knot] or { _root = 0 }

      visits._root = visits._root + 1
      self.visits[knot] = visits
    end

    local knot, stitch = path.knot or '_', path.stitch or '_'
    local visits = self.visits[knot][stitch] or { _root = 0 }

    visits._root = visits._root + 1
    self.visits[knot][stitch] = visits
  end

  if path.label ~= nil then
    local knot, stitch, label = path.knot or '_', path.stitch or '_', path.label
    self.visits[knot] = self.visits[knot] or { _root = 1, _ = { _root = 1 } }
    self.visits[knot][stitch] = self.visits[knot][stitch] or { _root = 1 }

    local visits = self.visits[knot][stitch][label] or 0
    visits = visits + 1
    self.visits[knot][stitch][path.label] = visits
  end

  self.current_path = lume.clone(path)
  self.current_path.label = nil
  self.temp = path_is_changed and {} or self.temp
end

--- 获取指定路径的访问次数
-- @param path table 路径对象
-- @return number
function Story:get_visits_for_path(path)
  if path == nil then
    return 0
  end

  local knot, stitch, label = path.knot or '_', path.stitch, path.label

  if stitch == nil and label ~= nil then
    stitch = '_'
  end

  local knot_visits = self.visits[knot]

  if knot_visits == nil then
    return 0
  elseif stitch == nil then
    return knot_visits._root or 0
  end

  local stitch_visits = knot_visits[stitch]

  if stitch_visits == nil then
    return 0
  elseif label == nil then
    return stitch_visits._root or 0
  end

  local label_visits = stitch_visits[label]
  return label_visits or 0
end

--- 在指定上下文下获取路径访问次数
-- @param path_string string 路径字符串
-- @param context table|nil 上下文路径
-- @return number
function Story:get_visits_with_context(path_string, context)
  local path = self:path_from_string(path_string, context)
  local visits_count = self:get_visits_for_path(path)
  return visits_count
end

--- 将路径字符串解析为路径对象
-- @param path_string string
-- @param context table|nil 上下文路径
-- @return table 路径对象
function Story:path_from_string(path_string, context)
  local pstring = path_string or ''
  local context_knot = context and context.knot
  local context_stitch = context and context.stitch

  context_knot = context_knot or '_'
  context_stitch = context_stitch or '_'

  local part1, part2, part3 = pstring:match('([%w_]+)%.([%w_]+)%.([%w_]+)')

  if not part1 then
    part1, part2 = pstring:match('([%w_]+)%.([%w_]+)')
  end

  if not part1 then
    part1 = #pstring > 0 and pstring or nil
  end

  local path = {}

  if not part1 then
    return path
  end

  if part3 then
    path.knot = part1
    path.stitch = part2
    path.label = part3
    return path
  end

  if part2 then
    if self.tree[part1] and self.tree[part1][part2] then
      path.knot = part1
      path.stitch = part2
      return path
    end

    if self.tree[context_knot][part1] then
      path.knot = context_knot
      path.stitch = part1
      path.label = part2
      return path
    end

    if self.tree[part1] then
      path.knot = part1
      path.stitch = '_'
      path.label = part2
      return path
    end

    if self.tree._[part1] then
      path.knot = '_'
      path.stitch = part1
      path.label = part2
      return path
    end
  end

  if part1 then
    if self.tree[context_knot][part1] then
      path.knot = context_knot
      path.stitch = part1
      return path
    elseif self.tree[part1] then
      path.knot = part1
      return path
    else
      path.knot = context_knot
      path.stitch = context_stitch
      path.label = part1
    end
  end

  return path
end

--- 内置 Ink 函数表
-- @return table 函数表
function Story:ink_functions()
  return {
    CHOICE_COUNT = function() return #self.choices end,
    SEED_RANDOM = function(seed) self.debug_seed = seed end,
    POW = function(x, y) return math.pow and math.pow(x, y) or x ^ y end,

    RANDOM = function(x, y)
      math.randomseed(self.debug_seed or os.time() * 1000)
      return math.random(x, y)
    end,

    INT = function(x) return math.floor(x) end,
    FLOOR = function(x) return math.floor(x) end,
    FLOAT = function(x) return x end,

    LIST_VALUE = function(list) return self.list_mt.first_raw_value_of(list) end,
    LIST_COUNT = function(list) return self.list_mt.__len(list) end,
    LIST_MIN = function(list) return self.list_mt.min_value_of(list) end,
    LIST_MAX = function(list) return self.list_mt.max_value_of(list) end,

    LIST_RANDOM = function(list)
      math.randomseed(self.debug_seed or os.time() * 1000)
      return self.list_mt.random_value_of(list)
    end,

    LIST_ALL = function(list) return self.list_mt.posible_values_of(list) end,
    LIST_RANGE = function(list, minv, maxv) return self.list_mt.range_of(list, minv, maxv) end,
    LIST_INVERT = function(list) return self.list_mt.invert(list) end
  }
end


-- ============================================================================
-- Section 7: Narrator 统一 API 入口与适配层
-- ============================================================================

local FOLDER_SEPARATOR = package.config:sub(1, 1)

--- 规范化路径，去掉 .lua/.ink 后缀并将点替换为路径分隔符
-- @param path string 原始路径
-- @return string 规范化后的路径
local function normalize_path(path)
  local result = path:gsub('.lua$', '')
  result = result:gsub('.ink$', '')

  if result:match('%.') and not result:match(FOLDER_SEPARATOR) then
    result = result:gsub('%.', FOLDER_SEPARATOR)
  end

  return result
end

--- 读取 Ink 文件内容
-- @param path string 文件路径
-- @return string 文件内容
local function read_ink_file(path)
  local file_path = normalize_path(path) .. '.ink'

  local file = io.open(file_path, 'r')
  assert(file, 'File doesn\'t exist: ' .. file_path)

  local content = file:read('*all')
  file:close()

  return content
end

--- 将 Book 保存为 Lua 模块文件
-- @param book table Book 数据结构
-- @param path string 保存路径
-- @return boolean 是否成功
local function save_book(book, path)
  local file_path = normalize_path(path) .. '.lua'

  local data = lume.serialize(book)
  data = data:gsub('%[%d+%]=', '')
  data = data:gsub('[\'[%w_]+\']', function(match)
    return match:sub(3, #match - 2)
  end)

  local file = io.open(file_path, 'w')
  if file == nil then
    return false
  end

  file:write('return ' .. data)
  file:close()

  return true
end

--- 合并章节到主 Book
-- @param book table 主 Book
-- @param chapter table 要合并的章节
-- @return table 合并后的 Book
local function merge_chapter_to_book(book, chapter)
  -- 检查引擎版本兼容性
  if chapter.version.engine and chapter.version.engine ~= enums.ENGINE_VERSION then
    error('Version ' .. chapter.version.engine .. ' of book isn\'t equal to the version ' .. enums.ENGINE_VERSION .. ' of Narrator.')
  end

  -- 合并根 knot 及其 stitch
  book.tree._._ = lume.concat(chapter.tree._._, book.tree._._)
  chapter.tree._._ = nil
  book.tree._ = lume.merge(chapter.tree._, book.tree._)
  chapter.tree._ = nil

  -- 合并章节到主 Book
  book.tree = lume.merge(book.tree or {}, chapter.tree or {})
  book.constants = lume.merge(book.constants or {}, chapter.constants or {})
  book.lists = lume.merge(book.lists or {}, chapter.lists or {})
  book.variables = lume.merge(book.variables or {}, chapter.variables or {})
  book.params = lume.merge(book.params or {}, chapter.params or {})

  return book
end

-- ============================================================================
-- 对外暴露的 TapTap Skill API
-- ============================================================================

--- 解析 Ink 脚本文件为 Book
-- 开发期可用，生产环境建议直接加载已序列化的 Book。
-- @param path string Ink 文件路径
-- @param params table|nil 参数表，如 { save = false }
-- @return table|nil Book 数据结构
function M.parse_file(path, params)
  local p = params or { save = false }
  assert(parser, 'Can\'t parse anything without lpeg, sorry.')

  local content = read_ink_file(path)
  local book = parser.parse(content)
  if not book then
    return nil
  end

  for _, inclusion in ipairs(book.inclusions) do
    local folder_path = normalize_path(path):match('(.*' .. FOLDER_SEPARATOR .. ')')
    local inclusion_path = folder_path .. normalize_path(inclusion) .. '.ink'
    local chapter = M.parse_file(inclusion_path)
    if chapter then
      merge_chapter_to_book(book, chapter)
    end
  end

  if p.save then
    save_book(book, path)
  end

  return book
end

--- 解析 Ink 脚本内容字符串为 Book
-- @param content string Ink 内容
-- @param inclusions table|nil 包含的其他 Ink 内容字符串数组
-- @return table|nil Book 数据结构
function M.parse_content(content, inclusions)
  local incs = inclusions or {}
  assert(parser, 'Can\'t parse anything without a parser.')

  local book = parser.parse(content)
  if not book then
    return nil
  end

  for _, inclusion in ipairs(incs) do
    local chapter = parser.parse(inclusion)
    if chapter then
      merge_chapter_to_book(book, chapter)
    end
  end

  return book
end

--- 根据 Book 创建 Story 实例
-- @param book table Book 数据结构
-- @return table Story 实例
function M.init_story(book)
  return Story(book)
end

--- 快速创建一个 Story（一步完成解析与初始化）
-- @param content string Ink 脚本内容
-- @return table Story 实例
function M.create(content)
  local book = M.parse_content(content)
  assert(book, 'Failed to parse ink content. Make sure lpeg is available.')
  local story = M.init_story(book)
  story:begin()
  return story
end

--- 检查当前环境是否支持 Ink 解析（即是否可用 lpeg）
-- @return boolean
function M.can_parse()
  local ok = pcall(require, 'lpeg')
  return ok
end

--- 获取引擎版本号
-- @return number
function M.get_version()
  return enums.ENGINE_VERSION
end

--- 类型别名/类注释导出（供外部 IDE 提示使用，无运行时作用）
M.Types = {
  Paragraph = { text = "", tags = nil },
  Choice = { text = "", tags = nil },
  State = {
    version = 0, temp = {}, seeds = {}, variables = {},
    params = nil, visits = {}, path = nil,
    paragraphs = {}, choices = {}, output = {}, tunnels = {}
  },
  Book = {
    version = { engine = 0, tree = 0 },
    inclusions = {}, lists = {}, constants = {},
    variables = {}, params = {}, tree = {}
  }
}

--- 重新导出工具函数（供高级用户直接使用）
M.Lume = lume

return M
