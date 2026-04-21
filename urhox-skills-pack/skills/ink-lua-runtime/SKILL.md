# Ink Lua Runtime

基于开源项目 [narrator](https://github.com/astrochili/narrator) 重构的 **TapTap Skill**，用于在 **UrhoX 引擎** 中运行 [Ink](https://www.inklestudios.com/ink/) 叙事脚本。所有 Lua 源码已内嵌为单个 `scripts/main.lua` 文件，**无需 luarocks、无需外置依赖**（解析功能依赖 `lpeg`，运行时推进完全不依赖）。

---

## 特性

- **单文件内嵌**：`classic` + `lume` + `parser` + `story` + `list/mt` 全部整合进一个模块。
- **零 luarocks 依赖**：除可选的 `lpeg` 外，无需任何外部包。
- **完整 Ink 语法支持**：文本、分支、选项、变量、表达式、序列（cycle/stopping/once）、隧道（tunnel）、标签、函数调用等。
- **状态可持久化**：`save_state()` / `load_state()` 支持随时存档/读档。
- **外部 Lua 绑定**：可将自定义 Lua 函数绑定到 Ink 脚本中调用。
- **变量观察者**：监听 Ink 变量变化，驱动外部系统（如 UI、音效）。

---

## 快速开始

```lua
local Ink = require("scripts.main")

-- 1. 用 Ink 脚本字符串快速创建故事
local story = Ink.create([[
Hello, world!
*   Hello back!
    Nice to hear you!
*   ...
    Well, okay.
]])

-- 2. 推进剧情，读取段落
while story:can_continue() do
    local para = story:continue(1)
    print(para.text)
end

-- 3. 出现选项时，让玩家选择
if story:can_choose() then
    local choices = story:get_choices()
    for i, c in ipairs(choices) do
        print(i .. ". " .. c.text)
    end
    story:choose(1) -- 玩家选了第 1 个
end

-- 4. 继续读取后续段落
while story:can_continue() do
    local para = story:continue(1)
    print(para.text)
end
```

---

## 核心 API

### `Ink.can_parse()` → `boolean`

检查当前环境是否可用 `lpeg`。若不可用，`parse_file` / `parse_content` / `create` 将返回 `nil` 或报错。

### `Ink.get_version()` → `number`

返回引擎内部版本号。

### `Ink.parse_file(path, params?)` → `Book | nil`

解析 `.ink` 文件为 `Book` 数据结构。开发期可用，生产环境建议直接加载已序列化的 `Book`。

- `path`：`string` — Ink 文件路径。
- `params`：`table | nil` — 如 `{ save = true }` 会将解析结果保存为同名 `.lua` 文件。

### `Ink.parse_content(content, inclusions?)` → `Book | nil`

从字符串解析 `Book`，适合热更或内嵌脚本。

- `content`：`string` — Ink 脚本内容。
- `inclusions`：`string[] | nil` — 额外包含的 Ink 内容数组。

### `Ink.init_story(book)` → `Story`

根据 `Book` 创建故事实例。

### `Ink.create(content)` → `Story`

一步完成 **解析 + 初始化 + `begin()`**，最常用入口。

---

## Story 实例 API

### `story:begin()`

启动故事，生成第一段内容。`create()` 已自动调用，一般无需手动执行。

### `story:can_continue()` → `boolean`

是否还有段落可输出。

### `story:continue(steps?)` → `Paragraph | Paragraph[]`

从队列中拉取段落。

- `steps` 为 `1` 时返回单个 `Paragraph`。
- 为 `0` 或省略时返回全部剩余段落的数组。

**Paragraph 结构：**

```lua
{
    text = "显示的文本",
    tags = { "tag1", "tag2" } -- 可能为 nil
}
```

### `story:can_choose()` → `boolean`

当前是否存在可选项（前提是段落已读完）。

### `story:get_choices()` → `Choice[]`

获取可选项列表。若仍有段落未输出则返回空数组。

**Choice 结构：**

```lua
{
    text = "选项文本",
    tags = { "tag1" } -- 可能为 nil
}
```

### `story:choose(index)`

做出选择，推进剧情。`index` 从 **1** 开始。

### `story:jump_to(path_string)`

直接跳转到指定路径，例如 `knot.stitch.label`。

### `story:get_visits(path_string)` → `number`

获取某路径被访问的次数。

### `story:get_tags(path_string?)` → `string[]`

获取某 Knot/Stitch 的标签。

### `story:save_state()` → `State`

提取当前完整状态（变量、访问计数、段落队列、选项、隧道堆栈等），可用于存档。

### `story:load_state(state)`

恢复状态。若版本不一致会自动调用 `migrate()`。

### `story:observe(variable, observer)`

监听变量变化。

```lua
story:observe("player_hp", function(value)
    print("HP changed to", value)
end)
```

### `story:bind(func_name, handler)`

将外部 Lua 函数暴露给 Ink 脚本调用。

```lua
story:bind("play_sound", function(name)
    -- 播放音效
end)
```

在 Ink 中可直接使用：

```ink
~ play_sound("click")
```

---

## 完整用例

以下示例展示了 **对话分支 + 选择系统 + 变量 + 存档** 的完整用法：

```lua
local Ink = require("scripts.main")

local script = [[
VAR friend_name = ""
VAR trust = 0

-> meet

=== meet ===
风雪中，你看见一个身影。

*   [主动打招呼]
    ~ trust = trust + 1
    "你好？" 你试探着问道。
    -> talk
*   [保持沉默]
    你缩了缩脖子，没有开口。
    -> talk

=== talk ===
{
    - trust > 0:
        对方笑了笑："我叫 {friend_name}，你呢？"
    - else:
        对方看了你一眼，没说话。
}

*   {trust > 0} [交换名字]
    ~ friend_name = "旅人"
    "我叫旅人。"
    -> ending
*   [离开]
    你不愿再停留。
    -> ending

=== ending ===
信任度：{trust}
{
    - friend_name != "":
        你们成为了同伴。
    - else:
        你们擦肩而过。
}
-> END
]]

-- 创建故事
local story = Ink.create(script)

-- 模拟游戏循环
local function game_loop(st)
    while true do
        -- 输出所有可用段落
        while st:can_continue() do
            local para = st:continue(1)
            print("[NPC] " .. para.text)
        end

        -- 输出选项
        if st:can_choose() then
            local choices = st:get_choices()
            for i, c in ipairs(choices) do
                print("  [" .. i .. "] " .. c.text)
            end

            -- 模拟玩家选择第 1 个可见选项
            st:choose(1)
        else
            break -- 故事结束
        end
    end
end

-- 绑定变量观察
story:observe("trust", function(v)
    print("[系统] 信任度变为：" .. tostring(v))
end)

-- 存档点示例
story:choose(1) -- 先做一次选择
local save = story:save_state()
print("[系统] 已存档")

-- 读档
local story2 = Ink.create(script)
story2:load_state(save)
print("[系统] 已读档，继续游戏")

game_loop(story2)
```

### 输出示例

```
[NPC] 风雪中，你看见一个身影。
  [1] 主动打招呼
  [2] 保持沉默
[系统] 信任度变为：1
[NPC] "你好？" 你试探着问道。
[NPC] 对方笑了笑："我叫 旅人，你呢？"
  [1] 交换名字
  [2] 离开
[NPC] 我叫旅人。
[NPC] 信任度：1
[NPC] 你们成为了同伴。
```

---

## 注意事项

1. **lpeg 依赖**：`parse_file` / `parse_content` / `create` 需要环境中已安装 `lpeg` 库。纯运行时（只使用已序列化的 `Book` + `init_story`）则不需要。
2. **状态迁移**：若 `Book` 结构在未来版本中发生变化，可覆盖 `story.migrate` 函数以兼容旧存档。
3. **标签与隧道**：支持 Ink 的 `-> knot ->` 隧道语法以及 `#标签` 语法。
4. **列表类型**：完整支持 Ink 的 LIST 类型及其 `+` `-` `has` `hasnt` `^` 等操作。

---

## 授权

本 Skill 内嵌的源码基于原项目 **MIT 许可证**，完整授权声明请见 `scripts/main.lua` 文件顶部。
