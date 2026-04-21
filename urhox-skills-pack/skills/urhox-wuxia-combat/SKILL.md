---
name: urhox-wuxia-combat
description: >
  为 UrhoX 引擎打造的完整武侠战斗系统技能。包含状态机驱动的连招系统、输入缓冲、
  Hitbox/Hurtbox 判定管理、伤害计算与受击反馈、Buff/Debuff（中毒/点穴/护体真气）、
  门派武学风格（少林/武当/峨眉/五毒/华山/逍遥）、敌人 AI 控制器、以及镜头震动、
  VFX、SFX 等战斗演出。适用于需要硬核动作武侠战斗体验的 UrhoX 项目。触发关键词：
  "武侠战斗系统"、"连招"、"状态机"、"hitbox"、"受击反馈"、"门派"、"技能配置"、
  "Buff/Debuff"、"战斗 AI"、"屏幕震动"、"UrhoX 战斗"
---

# UrhoX 武侠战斗系统（UrhoX Wuxia Combat System）

> 一套可直接挂载到角色上、开箱即用的武侠动作战斗框架。
> 从零设计的状态机连招、判定框系统、门派风格、BuffDebuff 与 AI 全部内建，无需额外依赖。

---

## 一、简介

**UrhoX 武侠战斗系统** 是一套专门为 UrhoX 引擎（Urho3D 衍生分支）开发的 Lua 战斗框架。
它参考了多款开源格斗游戏引擎与动作游戏的战斗设计理念，
包括但不限于：`L2DF (Love2D Fighting Engine)` 的帧级碰撞架构、
`siki.lua` 的 Hitbox/Hurtbox 分离思路、
Godot `2d-hitbox-godot-plugin` 的信号驱动事件模型，
以及《街霸》《怪物猎人》《影之刃》《燕云十六声》《黑神话：悟空》等作品中关于
“连招取消窗口”、“受击硬直优先级”、“弹反帧”、“Hit-Stop 顿帧”、“屏幕震动”等经典设计。

本系统不只是一个示例 Demo，而是一套**可以直接集成到正式项目中的模块化框架**。
角色只需挂载 `WuxiaCombatComponent`，注册好技能和 hitbox，战斗系统就会自动接管：
输入读取、连招衔接、命中判定、伤害结算、受击反馈、Buff 叠加、门派加成、AI 决策、演出调度。

### 1.1 核心特性

- **连招状态机（WuxiaFSM）**：每个动作拆分为 `startup → active → recovery` 三段，
  支持“连招窗口期”内输入衔接、闪避/格挡取消收招、霸体与无敌帧。
- **输入缓冲（ComboBuffer）**：解决玩家按键过早导致的断连问题，
  轻/重/闪/挡/反五种指令带独立缓冲计时。
- **HitboxManager**：支持 `box / sphere / fan / line` 四种判定形状，
  按技能分组激活/关闭，自动过滤已命中对象防止多段伤害重复触发。
- **CombatDamage**：基于属性的伤害公式，支持暴击、元素伤害、真实伤害、
  物理/内力/毒伤类型，以及 `hit_stun / knockback / knockdown / launch` 四级受击反应。
- **SkillDatabase**：完整的技能配置表，包含普攻三段、重击、降龙掌、闪避、格挡、弹反，
  支持 cooldown、体力/内力消耗、优先级、霸体标记。
- **BuffDebuffManager**：武侠特色的状态效果系统，
  内置 `护体真气、气血沸腾、打坐调息、金刚不坏、中毒、内伤、点穴、迟缓`。.
- **MartialStyle 门派系统**：少林/武当/峨眉/五毒魔教/华山/逍遥 六大门派，
  每门派有被动加成和专属技能修改器，可直接改变 hitbox 属性与伤害公式。
- **EnemyAIController**：完整的敌人 AI，含巡逻（Patrol）、警戒（Alert）、
  追击（Chase）、攻击（Attack）、受击反应（HitReact）、死亡（Dead）六个状态，
  并支持闪避、格挡、弹反的 AI 决策。
- **CombatCamera / CombatVFX / CombatSFX**：镜头震动（trauma-based 柏林噪声）、
  Hit-Stop 顿帧、慢镜头、元素特效、命中火花、格挡火花、武器轨迹、音效映射等完整演出层。

---

## 二、适用场景与触发关键词

### 2.1 适用场景

1. 在 UrhoX 引擎中开发武侠、仙侠、修真题材的动作游戏。
2. 需要实现类似《影之刃》《燕云十六声》《卧龙：苍天陨落》风格的快节奏连招战斗。
3. 需要为项目引入完整的 Hitbox/Hurtbox 判定、帧数据（frame data）概念。
4. 需要门派差异化战斗体验（如少林霸体拳、武当反击剑、五毒毒伤掌）。
5. 需要敌人具备基本战斗 AI（巡逻 → 索敌 → 追击 → 攻击 → 受击 → 死亡）。
6. 需要打击感闭环：顿帧、震屏、音效、粒子特效、受击动画全部联动。

### 2.2 触发关键词

- 武侠战斗系统、UrhoX 战斗、Lua 战斗框架
- 连招（Combo）、攻击缓冲（Input Buffer）、取消窗口（Cancel Window）
- 状态机（FSM）、动画状态机、战斗状态机
- Hitbox、Hurtbox、命中框、受击框、攻击判定
- 受击反馈（Hit Reaction）、硬直（Hit Stun）、击退（Knockback）、击飞（Launch）
- 弹反（Parry）、格挡（Block）、闪避（Dodge）、霸体（Super Armor）、无敌帧（Invincible）
- 门派、武学风格、少林、武当、峨眉、五毒、华山、逍遥
- Buff、Debuff、中毒、点穴、护体真气、气血沸腾
- 战斗 AI、敌人 AI、巡逻、追击
- 屏幕震动、Hit-Stop、顿帧、战斗特效、战斗音效

---

## 三、安装方式

### 3.1 目录结构

将本技能包解压到项目 `Data/LuaScripts/`（或你的 Lua 加载路径）下，确保目录结构如下：

```
urhox-wuxia-combat/
├── game.json
├── SKILL.md
└── scripts/
    ├── main.lua
    ├── CombatUtils.lua
    ├── ComboBuffer.lua
    ├── WuxiaFSM.lua
    ├── HitboxManager.lua
    ├── CombatDamage.lua
    ├── SkillDatabase.lua
    ├── WuxiaCombatComponent.lua
    ├── BuffDebuffManager.lua
    ├── MartialStyle.lua
    ├── CombatCamera.lua
    ├── CombatVFX.lua
    ├── CombatSFX.lua
    └── EnemyAIController.lua
```

### 3.2 加载入口

在你的场景初始化脚本中：

```lua
local WuxiaCombat = require("urhox-wuxia-combat/scripts/main")
```

`main.lua` 已导出所有子模块和工厂函数，可以直接使用。

### 3.3 依赖关系

- **零外部依赖**：所有模块均为纯 Lua 实现。
- **唯一要求**：UrhoX 引擎需确保 LuaJIT/Lua 5.1+ 环境和 `require` 路径正确。

---

## 四、系统架构图（文字版）

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           WuxiaCombatSystem                                 │
│                    (UrhoX Wuxia Combat Framework)                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────────┐  │
│  │   Player Input   │    │   Enemy AI       │    │   Scene Managers     │  │
│  │   (Light/Heavy/  │    │   (Patrol/Chase/ │    │   (Camera/VFX/SFX)   │  │
│  │    Dodge/Block/  │    │    Attack/Block) │    │                      │  │
│  │    Parry)        │    │                  │    │                      │  │
│  └────────┬─────────┘    └────────┬─────────┘    └──────────┬───────────┘  │
│           │                       │                         │              │
│           ▼                       ▼                         ▼              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    WuxiaCombatComponent (统一组件)                    │  │
│  │  - 整合所有子系统                                                       │  │
│  │  - 处理输入、资源、属性、门派修正                                          │  │
│  │  - 命中回调链 VFX/SFX/Camera                                           │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│           │                                                                  │
│           ▼                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  ┌───────────┐  ┌───────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │ ComboBuffer│  │ WuxiaFSM  │  │ SkillDatabase│  │ HitboxManager│  │  │
│  │  │ 输入缓冲   │  │ 状态机    │  │ 技能数据库   │  │ 判定管理      │  │  │
│  │  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘  └──────┬───────┘  │  │
│  │        │              │               │                 │          │  │
│  │        └──────────────┴───────┬───────┴─────────────────┘          │  │
│  │                               ▼                                     │  │
│  │  ┌───────────────────────────────────────────────────────────────┐ │  │
│  │  │                     CombatDamage (战斗伤害)                    │ │  │
│  │  │  - 属性计算 | 伤害公式 | 暴击 | 元素 | 受击反应 | 击杀回调      │ │  │
│  │  └───────────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  辅助子系统                                                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │  │
│  │  │BuffDebuffMgr │  │ MartialStyle │  │ EnemyAIController            │  │
│  │  │ 状态效果     │  │ 门派武学     │  │ 敌人AI       │               │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │  │
│  │  │ CombatCamera │  │ CombatVFX    │  │ CombatSFX    │               │  │
│  │  │ 镜头/顿帧    │  │ 视觉特效     │  │ 音效管理     │               │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 五、核心 API 文档

### 5.1 WuxiaCombatComponent（统一战斗组件）

这是你最常打交道的类。建议为每个参与战斗的角色挂载一个实例。

#### 构造函数

```lua
local combat = WuxiaCombat.WuxiaCombatComponent.New(owner, config)
```

`config` 字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `martialStyleId` | string | 门派 ID，如 `"shaolin"`、`"wudang"` 等 |
| `stamina` | number | 初始体力 |
| `maxStamina` | number | 体力上限 |
| `internalForce` | number | 初始内力 |
| `maxInternalForce` | number | 内力上限 |
| `staminaRegen` | number | 体力每秒回复 |
| `internalForceRegen` | number | 内力每秒回复 |
| `attributes` | table | 战斗属性（力量/敏捷/根骨/悟性/身法） |
| `vfxManager` | CombatVFX.VFXManager | 可选，外部传入的 VFX 管理器 |
| `sfxManager` | CombatSFX.SFXManager | 可选，外部传入的 SFX 管理器 |
| `cameraController` | CombatCamera.CombatCamera | 可选，外部传入的相机控制器 |

#### 关键方法

| 方法 | 说明 |
|------|------|
| `SetMartialStyle(styleId)` | 动态切换门派 |
| `RegisterSkillHitbox(skillId, hitboxList)` | 为某个技能注册判定框 |
| `InputLightAttack()` | 输入轻攻击 |
| `InputHeavyAttack()` | 输入重攻击 |
| `InputDodge()` | 输入闪避 |
| `InputBlockHold()` | 按住格挡 |
| `InputBlockRelease()` | 松开格挡 |
| `InputParry()` | 输入弹反 |
| `TakeHit(hitEvent)` | 外部调用，让角色受击 |
| `ApplyBuff(effectId, source, duration, stacks)` | 施加 Buff/Debuff |
| `RemoveBuff(effectId)` | 移除指定效果 |
| `IsInvincible()` | 是否无敌 |
| `IsSuperArmor()` | 是否霸体 |
| `Update(dt)` | 每帧更新 |

#### 回调事件

```lua
combat.onHit = function(attacker, target, result, damageEvent) ... end
combat.onKill = function(attacker, target, damageEvent) ... end
combat.onDodge = function(attacker, target, damageEvent) ... end
combat.onBlock = function(hitEvent) ... end
combat.onParry = function(hitEvent) ... end
combat.onStateChange = function(oldStateName, newStateName) ... end
```

### 5.2 ComboBuffer（输入缓冲）

解决动作游戏中“按键时机提前半拍”导致的断连问题。

```lua
local cb = WuxiaCombat.ComboBuffer.ComboBuffer.New()
-- 在 Update 中
local fsm = combat.fsm
cb:Update(dt, fsm)

-- 按键时
if inputLight then cb:PushLight() end
if inputHeavy then cb:PushHeavy() end
if inputDodge then cb:PushDodge() end
if inputBlock then cb:PushBlock() end
if inputParry then cb:PushParry() end
```

缓冲参数：
- `bufferWindow` = 0.3s（默认）
- 轻/重攻击可在落地前 0.2s 预输入
- 格挡/弹反可在 idle/block 前任意时刻预输入

### 5.3 WuxiaFSM（状态机）

```lua
local fsm = WuxiaCombat.WuxiaFSM.WuxiaStateMachine.New(owner)
fsm:Update(dt)

-- 切换状态
fsm:TransitionTo("light_1", {
    duration = 0.33,
    startup = 0.1,
    active = 0.1,
    recovery = 0.13,
    superArmor = false,
    invincible = false,
    cancelable = false,
    onActiveStart = function() ... end,
    onActiveEnd = function() ... end,
    onRecoveryEnd = function() ... end,
})

-- 受击（自动根据打断等级判断是否打断）
fsm:TakeHit(hitEvent)

-- 检查当前状态
fsm:Is("idle")
fsm:IsInStartup()
fsm:IsInActive()
fsm:IsInRecovery()
```

### 5.4 HitboxManager（判定管理器）

```lua
local hbMgr = WuxiaCombat.HitboxManager.HitboxManager.New(owner)

-- 创建判定框
hbMgr:CreateHitbox("light_1", {
    shape = "fan", -- "box" | "sphere" | "fan" | "line"
    offset = { x = 0.0, y = 1.0, z = 1.2 },
    params = { radius = 2.0, angleSpan = 90.0, yawOffset = 0.0 },
    owner = owner,
    lifetime = 0.15,
    maxHits = 3,
    damageEvent = { ... },
})

-- 激活/关闭
hbMgr:ActivateHitboxesForSkill("light_1")
hbMgr:DeactivateHitboxesForSkill("light_1")

-- 碰撞检测（应在 Update 中调用）
hbMgr:CheckCollisions(allHurtboxOwners)
```

### 5.5 CombatDamage（伤害计算）

```lua
local attrs = WuxiaCombat.CombatDamage.CreateAttributes({
    strength = 20,
    agility = 15,
    constitution = 18,
    perception = 12,
    speed = 14,
})

local hitEvent = WuxiaCombat.CombatDamage.CreateHitEvent(attacker, 50.0, "physical")
local result = WuxiaCombat.CombatDamage.CalculateDamage(hitEvent, targetAttrs)
-- result.damage, result.isCrit, result.finalReaction 等
```

### 5.6 SkillDatabase（技能库）

```lua
local db = WuxiaCombat.SkillDatabase.SkillDatabase.New()
db:RegisterSkill({ id = "my_skill", ... })
local skill = db:GetSkill("my_skill")
local ok, reason = db:CanAfford(owner, "my_skill")
db:ConsumeCost(owner, "my_skill")
db:StartCooldown(owner, "my_skill")
db:Update(dt)
```

内置技能常量：
- `SKILL_ID_LIGHT_1` / `LIGHT_2` / `LIGHT_3`
- `SKILL_ID_HEAVY_1`
- `SKILL_ID_SPECIAL_DRAGON_PALM`
- `SKILL_ID_DODGE`
- `SKILL_ID_BLOCK`
- `SKILL_ID_PARRY`

### 5.7 BuffDebuffManager（状态效果）

```lua
local buffMgr = WuxiaCombat.BuffDebuffManager.BuffDebuffManager.New(owner)

-- 施加
buffMgr:Apply(WuxiaCombat.DEBUFF_ID_POISON, attacker, 5.0, 2)
buffMgr:Apply(WuxiaCombat.BUFF_ID_QI_SHIELD, nil, 10.0, 1)

-- 查询
local hasShield = buffMgr:Has(WuxiaCombat.BUFF_ID_QI_SHIELD)
local stacks = buffMgr:GetStacks(WuxiaCombat.DEBUFF_ID_POISON)

-- 属性修正
local reducedDmg = buffMgr:ModifyAttribute("damageTaken", 1.0)

-- 更新
buffMgr:Update(dt)
```

### 5.8 MartialStyle（门派武学）

```lua
local style = WuxiaCombat.MartialStyle.MartialStyle.New("huashan")
local modifiedSkill = style:ModifySkill(originalSkillConfig)
```

可用门派常量：
- `STYLE_SHAOLIN`
- `STYLE_WUDANG`
- `STYLE_EMEI`
- `STYLE_WTMO`
- `STYLE_HUASHAN`
- `STYLE_XIAOYAO`

### 5.9 CombatCamera（镜头控制器）

```lua
local cam = WuxiaCombat.CombatCamera.CombatCamera.New(cameraNode)
cam:SetBase({ x = 0, y = 3, z = -6 }, 60)
cam:SetTracking(playerNode, 0.3, { x = 0, y = 2, z = 4 })

-- 命中演出
cam:OnCombatHit("heavy", "knockback")

-- 慢镜头
cam:SlowMotion(0.2, 2.0, 1.0)

-- 更新
cam:Update(dt)
```

### 5.10 CombatVFX / CombatSFX

```lua
local vfx = WuxiaCombat.CombatVFX.VFXManager.New(sceneRoot)
vfx:Play(WuxiaCombat.VFX_TYPE_HIT_SPARK, hitPos)
vfx:OnCombatHit(attacker, target, damageEvent, result)

local sfx = WuxiaCombat.CombatSFX.SFXManager.New(audioEngine)
sfx:OnCombatHit(damageEvent, result)
sfx:OnBlockSuccess()
sfx:OnParrySuccess()
```

### 5.11 EnemyAIController（敌人 AI）

```lua
local ai = WuxiaCombat.EnemyAIController.New(enemyNode, combatComponent)
ai:SetTarget(playerNode)
ai:SetPatrolWaypoints({
    { x = 0, y = 0, z = 0 },
    { x = 10, y = 0, z = 0 },
})

-- 受击通知
ai:OnHitTaken()

-- 死亡通知
ai:OnDeath()

-- 更新
ai:Update(dt)
```

AI 状态常量：
- `AI_STATE_IDLE`
- `AI_STATE_PATROL`
- `AI_STATE_ALERT`
- `AI_STATE_CHASE`
- `AI_STATE_ATTACK`
- `AI_STATE_HIT_REACT`
- `AI_STATE_DEAD`

---

## 六、完整集成示例

### 6.1 最简玩家创建

```lua
local WuxiaCombat = require("urhox-wuxia-combat/scripts/main")

-- 1. 创建场景级演出管理器
local sceneMgr = WuxiaCombat.CreateSceneManagers(sceneRoot, cameraNode, audioEngine)

-- 2. 创建玩家
local playerCombat, _ = WuxiaCombat.CreateCombatant(playerNode, {
    martialStyleId = "huashan",
    stamina = 120,
    maxStamina = 120,
    internalForce = 200,
    maxInternalForce = 200,
    attributes = {
        strength = 22,
        agility = 16,
        constitution = 18,
        perception = 14,
        speed = 15,
    },
})

-- 3. 绑定场景演出
WuxiaCombat.BindSceneManagers(playerCombat, sceneMgr)

-- 4. 在 Update 中处理输入并更新
function HandleUpdate(dt)
    -- 读取输入
    local input = {
        light = IsKeyPressed(KEY_ATTACK_LIGHT),
        heavy = IsKeyPressed(KEY_ATTACK_HEAVY),
        dodge = IsKeyPressed(KEY_DODGE),
        block = IsKeyDown(KEY_BLOCK),
        parry = IsKeyPressed(KEY_PARRY),
    }
    WuxiaCombat.ProcessPlayerInput(playerCombat, input)

    -- 统一更新
    WuxiaCombat.UpdateCombatFrame(dt, { playerCombat, enemyCombat }, sceneMgr)
end
```

### 6.2 创建带 AI 的敌人

```lua
local enemyCombat, enemyAI = WuxiaCombat.CreateCombatant(enemyNode, {
    isEnemy = true,
    martialStyleId = "shaolin",
    stamina = 80,
    maxStamina = 80,
    internalForce = 50,
    maxInternalForce = 50,
    target = playerNode,
    patrolWaypoints = {
        { x = -5, y = 0, z = -5 },
        { x = 5, y = 0, z = 5 },
    },
})

-- 敌人也需要绑定场景 VFX/SFX
enemyCombat:SetVFX(sceneMgr.vfx)
enemyCombat:SetSFX(sceneMgr.sfx)
```

### 6.3 触发受击

当外部系统检测到 hitbox 碰撞时，应调用 `TakeHit`：

```lua
-- 在 hitbox 碰撞回调中
local hitEvent = WuxiaCombat.CombatDamage.CreateHitEvent(
    attackerNode,
    damageEvent.baseDamage,
    damageEvent.damageType
)
hitEvent.reaction = damageEvent.reaction
hitEvent.knockbackForce = damageEvent.knockbackForce
hitEvent.interruptLevel = damageEvent.interruptLevel
hitEvent.blockable = damageEvent.blockable

targetNode.wuxiaCombat:TakeHit(hitEvent)
```

---

## 七、开源参考与技术溯源

本系统在设计与实现过程中参考了以下开源项目和技术文献：

### 7.1 开源项目

1. **L2DF (Love2D Fighting Engine)**
   - 地址：`atom-tm/l2df-engine`
   - 参考价值：帧级架构（Frame-based architecture）
     对战斗系统的时间管理有重要启发。
     L2DF 将每一帧作为独立单位处理碰撞、状态与输入，
     这直接影响了本系统中 `startupFrames / activeFrames / recoveryFrames` 的定义方式。

2. **siki.lua**
   - 地址：`BakaBBQ/siki.lua`
   - 参考价值：Love2D 帧级 Hitbox 编辑器。
     其 `GreenBox (Hurtbox) / RedBox (Hitbox) / WhiteBox (Collision)` 的
     三色分离思想被本系统吸收为 `Hitbox / Hurtbox / 物理碰撞体` 三层结构，
     虽然在 3D 环境下使用了 `box / sphere / fan / line`，
     但核心逻辑（攻击方 hitbox 触碰受击方 hurtbox 才触发命中）保持一致。

3. **2D Hitbox System - Godot Plugin**
   - 地址：`jv-vogler/2d-hitbox-godot-plugin`
   - 参考价值：信号驱动的 Hitbox/Hurtbox 组件模型。
     本系统虽未使用 Godot 节点树，但在 `CombatDamage` 中实现的
     `onHit / onKill / onDodge / onBlock / onParry` 回调链
     正是对这种解耦事件模型的借鉴。

4. **Black Trigram**
   - 地址：`Hack23/blacktrigram`
   - 参考价值：韩国格斗武术模拟器中的
     `Stance Transition Animation System` 与 `Recovery Animation System`
     为武当门派“架势切换”和受击后起身动作提供了设计参考。

### 7.2 技术文章

- **《3D动作游戏连招开发：拆解动态判定与多感官反馈的核心》**
  （阿里云开发者社区）：关于“连招状态树优于引擎自带动画状态机”、
  输入缓冲、动态判定器、多感官同步（音效/震屏/顿帧/物理）的详细实践总结，
  直接指导了本系统中 `WuxiaFSM` 与 `ComboBuffer` 的设计。

- **《3D动作游戏受击反馈：从模板化硬直到沉浸式打击感的开发拆解》**
  （Unity 开发者社区）：关于“伤害类型-反馈参数映射表”、
  动态硬直判定器、状态过渡动画层的最佳实践，
  被应用于 `CombatDamage` 的 `REACTION_*` 分级与 `CombatCamera` 的 `OnCombatHit` 演出逻辑。

- **《设计真正的动作游戏（一）："动作状态机"与打击感》**
  （GameRes 游资网）：穷举所有动作切换可能性的设计理念、
  霸体/打断优先级的实现方式、感官反馈七要素（动画/特效/镜头/音效/震动等），
  构成了本系统状态机与打击感闭环的理论基础。

---

## 八、扩展指南

### 8.1 添加新技能

在 `SkillDatabase.lua` 的 `DEFAULT_SKILLS` 中复制一份配置，修改字段即可。
关键字段说明：

```lua
{
    id = "my_skill",
    animation = "anim_my_skill",     -- 动画名
    stateName = "my_skill",          -- 对应 FSM 状态名
    totalFrames = 30,                -- 总帧数
    startupFrames = 8,               -- 前摇帧
    activeFrames = 8,                -- 判定帧
    recoveryFrames = 14,             -- 收招帧
    comboWindowOpenFrame = 12,       -- 连招窗口开放
    comboWindowCloseFrame = 24,      -- 连招窗口关闭
    cancelable = false,              -- 能否被闪避/格挡取消
    hitboxList = { { ... } },        -- 判定框列表
    damageEvent = {                  -- 伤害配置
        baseDamage = 30.0,
        damageType = DAMAGE_TYPE_PHYSICAL,
        interruptLevel = 20,
        reaction = REACTION_KNOCKBACK,
        knockbackForce = 8.0,
        blockable = true,
        canCrit = true,
    },
    cooldown = 2.0,                  -- 冷却时间（秒）
    cost = { stamina = 15.0, internalForce = 0.0 }, -- 消耗
    priority = 20,                   -- 优先级
    superArmorStartup = false,       -- 前摇是否霸体
    invincible = false,              -- 是否无敌
}
```

然后在角色创建后调用：

```lua
combat:RegisterSkillHitbox("my_skill")
```

### 8.2 添加新门派

在 `MartialStyle.lua` 中：
1. 定义新的 `STYLE_XXX` 常量。
2. 在 `_InitByStyleId` 中新增分支，配置 `passives`、`skillModifiers`、`uniqueSkills`。
3. 在创建角色时传入 `martialStyleId`。

### 8.3 添加新 Buff/Debuff

在 `BuffDebuffManager.lua` 中：
1. 定义新的 `BUFF_ID_XXX` 或 `DEBUFF_ID_XXX` 常量。
2. 在 `_RegisterDefaults` 中添加定义，配置 `onApply / onTick / onRemove` 回调。
3. 在 `ModifyAttribute` 中处理新的属性修正逻辑。

### 8.4 集成自定义 VFX/SFX/Camera

由于 `WuxiaCombatComponent` 通过 `SetVFX / SetSFX / SetCamera` 接收外部管理器，
你可以完全替换为自己的引擎原生粒子系统或音频系统，
只需保持相同的接口（如 `Play(vfxType, pos)`）即可。

---

## 九、性能优化与注意事项

1. **时间缩放与物理**：`CombatCamera` 的 `GetTimeScale()` 返回的缩放值建议仅影响
   动画播放速度与战斗逻辑 `dt`，不要直接缩放物理引擎 `dt`，以免导致碰撞不稳定。
   推荐做法：在 `UpdateCombatFrame` 中对动画和逻辑使用 `scaledDt`，
   对相机和 UI 使用原始 `dt`。

2. **Hitbox 精度**：`HitboxManager` 中的碰撞检测默认按每帧调用，
   在高速挥刀或低帧率场景下可能出现“穿模”漏判。
   建议对 `line` 和 `box` 形状在 `CheckCollisions` 中增加
   基于上一帧位置与当前帧位置的插值检测（Sweep 或 Continuous Collision Detection）。

3. **AI 移动耦合**：`EnemyAIController` 中的移动接口（`SetVelocity`、`ApplyMovement`）
   是占位式调用，实际项目中应替换为 UrhoX 的 `RigidBody` 或自定义移动组件。

4. **对象池**：`CombatVFX.VFXManager` 已内置简易对象池（`effectPool`），
   若场景内特效数量巨大（>100 个同时存在），建议接入引擎级粒子池。

5. **内存安全**：Lua 的 `pairs` 遍历结合运行时 `table.remove` 和 `nil` 赋值
   在旧版本 Love2D/LuaJIT 中可能产生内存碎片。
   本系统已使用 `while i <= #arr` 模式清理过期对象以规避问题。

---

## 十、版本与兼容性

- **版本**：1.0.0
- **最低引擎版本**：UrhoX 1.0.0
- **Lua 版本**：LuaJIT 2.1+ / Lua 5.1+
- **平台**：Windows / Linux / macOS / Android / iOS（理论上全平台兼容，
  取决于 UrhoX 引擎本身的 Lua 支持）

---

## 十一、结语

本系统诞生的初衷是为 UrhoX 引擎补足一套**完整、可直接交付、无需二次封装**的
武侠动作战斗框架。它不是一两百行的演示 Demo，而是一套包含
状态机、碰撞、伤害、AI、特效、音效、门派、Buff 的**生产级代码库**。

如果你在集成过程中需要进一步了解某个模块的内部实现，
可以直接阅读 `scripts/` 目录下对应的 Lua 文件，
所有代码均带有详细的中文注释与 API 文档字符串。

愿你的江湖，刀剑如梦，拳拳到肉。
