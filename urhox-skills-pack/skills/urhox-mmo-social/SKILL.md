<!-- urhox-mmo-social SKILL.md -->

# urhox-mmo-social

**UrhoX MMO 多人社交系统技能包**

---

## 一、技能简介

`urhox-mmo-social` 是一款面向 UrhoX 引擎的**完整级多人社交系统技能包**。它以 Lua 为核心实现语言，面向服务器/客户端混合运行环境，提供从底层连接认证到上层社交互动的全套能力。系统设计参考了 NoahGameFrame（NF）、Squick、OpenCoreMMO（TFS+） 等业界成熟开源 MMO 服务端框架的社交子系统，力图在单节点部署环境下也能支撑中小型 MMO、ARPG、武侠修仙等品类游戏的社交需求。

本技能包包含以下六大核心模块：

1. **Friend（好友系统）**：添加/删除、请求/接受/拒绝、分组备注、亲密度、在线状态同步、黑名单。
2. **Guild（公会系统）**：创建/解散、加入/退出、职位权限、公会仓库贡献、公告板、公会战。
3. **Party（队伍系统）**：创建/解散、邀请/踢出、队长移交、经验/掉落共享、队伍频道。
4. **Chat（聊天系统）**：世界/区域/公会/队伍/私聊、喇叭/公告/CD控制/敏感词过滤/禁言/历史记录。
5. **Mail（邮件系统）**：收发邮件、附件金币道具、已读/领取/删除、一键领取、一键清理、邮件过期。
6. **SocialRelation（社交关系系统）**：师徒、结拜、情侣、仇人追踪、击杀记录、玩家推荐、称号标签。

所有模块均具备完整的 Lua 实现、事件驱动的网络协议、Lua Table 持久化（本地文件落盘），并且提供详细的客户端事件接口，可用于驱动 UI 层表现。

---

## 二、适用场景

- **MMORPG**：需要完整大世界社交系统的网络游戏。
- **武侠/修仙 MMO**：对师徒、结拜、帮派、仇人追踪有强需求的游戏。
- **ARPG/Looter**：需要组队副本、好友组队、公会仓库的轻社交游戏。
- **MUD/文字 MMO**：以聊天、邮件、公会公告为核心的高社交粘性品类。
- ** educators / demos**：想学习如何在 UrhoX 中用 Lua 实现服务端社交系统的开发者。

---

## 三、触发关键词

在 OpenClaw 中激活本技能的典型表述：

- "帮我搭建一个 MMO 社交系统"
- "UrhoX 需要好友、公会、队伍功能"
- "我要在游戏里加聊天和邮件"
- "给我一套完整的社交系统代码"
- "urhox mmo social"
- "师徒系统、结拜系统怎么实现"
- "需要一个带禁言和敏感词过滤的聊天系统"

---

## 四、安装方式

### 4.1 通过 OpenClaw 技能管理器安装（推荐）

```bash
# 将本技能 zip 放置到 OpenClaw 技能目录
unzip urhox-mmo-social.zip -d ~/.openclaw/skills/
```

然后在你的 UrhoX 项目 `Scripts/` 目录中直接引用：

```lua
require("urhox-mmo-social/scripts/main")
```

### 4.2 手动集成到现有项目

1. 将 `scripts/` 目录复制到你的项目脚本目录中。
2. 确保 `game.json` 位于技能根目录。
3. 在游戏启动脚本中调用 `Start()`：

```lua
local socialMain = require("Social/main")
socialMain.Start()
```

### 4.3 目录结构要求

```
urhox-mmo-social/
├── game.json                    -- OpenClaw 技能配置
├── SKILL.md                     -- 本文件
└── scripts/
    ├── main.lua                 -- 入口：SocialContext + 认证 + 自动保存
    └── Social/
        ├── Friend.lua           -- 好友系统
        ├── Guild.lua            -- 公会系统
        ├── Party.lua            -- 队伍系统
        ├── Chat.lua             -- 聊天系统
        ├── Mail.lua             -- 邮件系统
        └── SocialRelation.lua   -- 社交关系（师徒/结拜/情侣/仇人）
```

---

## 五、系统架构图（文字版）

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ FriendUI│ │ GuildUI │ │ PartyUI │ │ ChatUI  │ │ MailUI  │   │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘   │
│       │           │           │           │           │         │
│  ┌────┴───────────┴───────────┴───────────┴───────────┴────┐   │
│  │           Remote Events (VariantMap)                     │   │
│  │  FriendListSync / ChatChannelMessage / MailNotify ...    │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
└────────────────────────────┼────────────────────────────────────┘
                             │ Network (Urho3D Network Subsystem)
┌────────────────────────────┼────────────────────────────────────┐
│                       SERVER LAYER                              │
│  ┌─────────────────────────┴─────────────────────────────────┐   │
│  │                    SocialContext                           │   │
│  │  - players / connectionMap / config / modules registry     │   │
│  │  - Broadcast / SendToPlayer / Notify helper                │   │
│  └─────────────────────────┬─────────────────────────────────┘   │
│                            │                                     │
│   ┌────────┬────────┬──────┴──┬────────┬────────┬────────┐      │
│   ▼        ▼        ▼         ▼        ▼        ▼        │      │
│ ┌─────┐ ┌─────┐ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────────┐  │      │
│ │Friend│ │Guild│ │Party│  │Chat │  │Mail │  │SocialRel│  │      │
│ └──┬──┘ └──┬──┘ └──┬──┘  └──┬──┘  └──┬──┘  └────┬────┘  │      │
│    │       │       │        │        │            │       │      │
│    └───────┴───────┴────────┴────────┴────────────┘       │      │
│                         │                                  │      │
│              ┌──────────┴──────────┐                       │      │
│              ▼                     ▼                       │      │
│      ┌──────────────┐     ┌──────────────┐                 │      │
│      │ LoadTable()  │     │ SaveTable()  │                 │      │
│      │   (File)     │     │   (File)     │                 │      │
│      └──────────────┘     └──────────────┘                 │      │
│                      Data/SocialDB/*.lua                   │      │
└────────────────────────────────────────────────────────────┘      │
```

### 5.1 核心设计原则

1. **中心化上下文（SocialContext）**
   - 维护全局玩家映射（playerId -> connection / nickname / level / online）。
   - 提供统一的网络发送接口 `SendToPlayer`、`BroadcastToPlayers`。
   - 注册所有子模块，调度自动保存与玩家上下线事件。

2. **模块化设计**
   - 每个子系统独立为 Lua Table（Friend / Guild / Party / Chat / Mail / SocialRelation）。
   - 每个模块暴露 `Init(ctx)`、`Load()`、`Save()`、`OnPlayerOnline(pid)`、`OnPlayerOffline(pid)` 五个生命周期函数。

3. **事件驱动网络层**
   - 服务器端通过 `RegisterRemoteEvent` + `SubscribeToEvent` 接收客户端请求。
   - 客户端通过订阅服务端推送事件（`FriendListSync`、`ChatChannelMessage` 等）更新 UI。

4. **本地文件持久化**
   - 使用纯 Lua 的 `SerializeTable` + `SaveTable` / `LoadTable` 将数据落盘到 `Data/SocialDB/`。
   - 支持自动保存（默认 300 秒）与进程退出保存。

---

## 六、核心 API 文档

### 6.1 SocialContext 全局 API

```lua
-- 注册模块
SocialContext:RegisterModule(name, moduleInstance)

-- 获取模块实例
SocialContext:GetModule(name)

-- 通过连接获取玩家 ID
SocialContext:GetPlayerIdByConnection(connection)

-- 通过玩家 ID 获取连接
SocialContext:GetConnectionByPlayerId(playerId)

-- 获取玩家数据（nickname/level/online）
SocialContext:GetPlayerData(playerId)

-- 向特定玩家发送远程事件
SocialContext:SendToPlayer(playerId, eventName, VariantMap)

-- 向玩家列表广播
SocialContext:BroadcastToPlayers(playerIdList, eventName, VariantMap)

-- 全局广播
SocialContext:BroadcastRemoteEvent(eventName, VariantMap)

-- 发送轻量通知（类型 + 文本）
SocialContext:NotifyPlayer(playerId, messageType, text)
```

### 6.2 好友系统 API（Friend）

```lua
-- 判断是否为好友
Friend:AreFriends(a, b) → bool

-- 获取好友数量
Friend:GetFriendCount(playerId) → int

-- 获取全部好友列表（按亲密度降序）
Friend:GetAllFriends(playerId) → { { friendId, data }, ... }

-- 判断是否被拉黑
Friend:IsBlocked(playerId, targetId) → bool

-- 添加/移除分组
Friend:AddDefaultGroupIfMissing(playerId, groupName)

-- 服务器事件（客户端发送）
FriendRequest     → { TargetId: string, Message: string }
FriendAccept      → { SenderId: string }
FriendReject      → { SenderId: string }
FriendRemove      → { TargetId: string }
FriendSetGroup    → { TargetId: string, Group: string }
FriendSetNote     → { TargetId: string, Note: string }
FriendInteract    → { TargetId: string, Delta: int }
FriendBlock       → { TargetId: string }
FriendUnblock     → { TargetId: string }

-- 客户端事件（服务端推送）
FriendListSync    → { Total: int, Index: int, Payload: string }
FriendEntrySync   → { FriendId: string, Exists: bool, ... }
FriendOnlineStatus→ { FriendId: string, Online: bool, LastLogout: int }
FriendNotify      → { Type: string, SenderId: string, SenderName: string, Message: string }
```

### 6.3 公会系统 API（Guild）

```lua
-- 创建公会
Guild:CreateGuild(leaderId, guildName, tagline) → guildId or nil

-- 解散公会
Guild:DisbandGuild(guildId, operatorId) → bool

-- 邀请玩家
Guild:InviteMember(guildId, inviterId, targetId) → bool

-- 接受邀请
Guild:AcceptInvite(guildId, playerId) → bool

-- 踢出成员
Guild:KickMember(guildId, kickerId, targetId) → bool

-- 设置职位
Guild:SetMemberRank(guildId, operatorId, targetId, newRank) → bool

-- 修改公告
Guild:SetNotice(guildId, operatorId, noticeText) → bool

-- 贡献资源
Guild:Contribute(guildId, playerId, resourceType, amount) → bool

-- 升级公会
Guild:UpgradeGuild(guildId, operatorId) → bool

-- 查询玩家所在公会
Guild:GetPlayerGuildId(playerId) → guildId or nil

-- 查询成员列表
Guild:GetMembers(guildId) → { playerId, rank, joinTime }[]

-- 服务器事件
GuildCreate       → { Name: string, Tagline: string }
GuildDisband      → { GuildId: string }
GuildInvite       → { GuildId: string, TargetId: string }
GuildAcceptInvite → { GuildId: string }
GuildLeave        → { GuildId: string }
GuildKick         → { GuildId: string, TargetId: string }
GuildSetRank      → { GuildId: string, TargetId: string, Rank: string }
GuildSetNotice    → { GuildId: string, Notice: string }
GuildContribute   → { GuildId: string, Resource: string, Amount: int }
GuildUpgrade      → { GuildId: string }
GuildWarDeclare   → { TargetGuildId: string }
GuildWarEnd       → { TargetGuildId: string }

-- 客户端事件
GuildInfoSync     → { ... }
GuildMemberSync   → { ... }
GuildNotify       → { Type: string, Text: string }
```

### 6.4 队伍系统 API（Party）

```lua
-- 创建队伍
Party:CreateParty(leaderId) → partyId

-- 解散队伍
Party:DisbandParty(partyId, leaderId) → bool

-- 邀请入队
Party:InviteToParty(partyId, inviterId, targetId) → bool

-- 接受邀请
Party:AcceptPartyInvite(partyId, playerId) → bool

-- 离开队伍
Party:LeaveParty(partyId, playerId) → bool

-- 踢出队员
Party:KickFromParty(partyId, leaderId, targetId) → bool

-- 移交队长
Party:TransferLeadership(partyId, oldLeaderId, newLeaderId) → bool

-- 设置掉落分配模式
Party:SetLootMode(partyId, leaderId, mode) → bool

-- 查询玩家队伍
Party:GetPlayerPartyId(playerId) → partyId or nil

-- 查询队员列表
Party:GetMembers(partyId) → { playerId }[]

-- 服务器事件
PartyCreate       → { }
PartyInvite       → { PartyId: string, TargetId: string }
PartyAcceptInvite → { PartyId: string }
PartyLeave        → { PartyId: string }
PartyKick         → { PartyId: string, TargetId: string }
PartyTransfer     → { PartyId: string, NewLeaderId: string }
PartyLootMode     → { PartyId: string, Mode: string }

-- 客户端事件
PartyInfoSync     → { PartyId: string, LeaderId: string, Members: string, LootMode: string }
PartyNotify       → { Type: string, Text: string }
```

### 6.5 聊天系统 API（Chat）

```lua
-- 发送频道消息（内部方法，可被外部模块调用）
Chat:SendChannelMessage(senderId, channelName, text, msgType) → bool

-- 发送私聊
Chat:SendWhisper(senderId, targetId, text) → bool

-- 发送系统消息（全局/指定玩家）
Chat:SendSystemMessage(text, targetId)

-- 发送全服公告（顶部滚动）
Chat:SendAnnounce(text, durationSec)

-- 发送喇叭（大喇叭广播）
Chat:SendHorn(senderId, text) → bool

-- 公会/队伍快捷接口
Chat:SendGuildMessage(guildId, senderId, text) → bool
Chat:SendPartyMessage(partyId, senderId, text) → bool

-- 禁言/GM 检测
Chat:IsMuted(playerId) → bool, reason, untilTime
Chat:IsGM(playerId) → bool
Chat:SetGM(playerId, level)

-- 服务器事件
ChatSendChannel   → { Channel: string, Text: string, MsgType: string }
ChatSendWhisper   → { TargetId: string, Text: string }
ChatJoinChannel   → { Channel: string }
ChatLeaveChannel  → { Channel: string }
ChatRequestHistory→ { Channel: string, Limit: int, BeforeTime: int }
ChatHorn          → { Text: string }
ChatMutePlayer    → { TargetId: string, Duration: int, Reason: string }
ChatUnmutePlayer  → { TargetId: string }
ChatAnnounce      → { Text: string, Duration: int }

-- 客户端事件
ChatChannelMessage→ { Channel: string, SenderId: string, SenderName: string, Text: string, Time: int, Type: string }
ChatWhisper       → { SenderId: string, SenderName: string, TargetId: string, Text: string, Time: int }
ChatHorn          → { SenderId: string, SenderName: string, Text: string, Time: int }
ChatAnnounce      → { Text: string, Duration: int }
ChatHistorySync   → { Channel: string, Total: int, Index: int, Payload: string }
ChatMuted         → { Reason: string, Until: int }
```

### 6.6 邮件系统 API（Mail）

```lua
-- 发送邮件（通用）
Mail:SendMail(senderId, targetId, subject, body, attachments, isSystem) → mailId

-- 发送系统邮件
Mail:SendSystemMail(targetId, subject, body, attachments) → mailId

-- 全服系统邮件
Mail:BroadcastSystemMail(subject, body, attachments)

-- 发送奖励邮件（快捷封装）
Mail:SendRewardMail(targetId, subject, body, rewardList) → mailId

-- 读取邮件
Mail:ReadMail(playerId, mailId) → bool

-- 领取附件
Mail:ClaimAttachments(playerId, mailId) → bool, err, items

-- 一键领取
Mail:ClaimAll(playerId) → items[]

-- 删除邮件
Mail:DeleteMail(playerId, mailId) → bool, err

-- 一键删除已读
Mail:DeleteReadMails(playerId) → deletedCount

-- 查询未读数量
Mail:GetUnreadCount(playerId) → int

-- 服务器事件
MailSend          → { TargetId: string, Subject: string, Body: string, Attachments: string }
MailRead          → { MailId: string }
MailClaimAttach   → { MailId: string }
MailDelete        → { MailId: string }
MailClaimAll      → { }
MailDeleteRead    → { }
MailRequestList   → { }

-- 客户端事件
MailListSync      → { Total: int, Index: int, Payload: string }
MailUpdate        → { MailId: string, Action: string, Payload: string }
MailNotify        → { MailId: string, SenderName: string, Subject: string }
MailAttachmentsClaimed → { PlayerId: string, MailId: string, Items: string }
```

### 6.7 社交关系系统 API（SocialRelation）

```lua
-- 基础关系
SocialRelation:SetRelation(playerId, targetId, relType, extra) → bool, err
SocialRelation:RemoveRelation(playerId, targetId) → bool
SocialRelation:GetRelation(playerId, targetId) → relationData
SocialRelation:GetRelationListByType(playerId, relType) → relationData[]

-- 师徒
SocialRelation:HasMaster(playerId) → bool
SocialRelation:GetMaster(playerId) → masterData
SocialRelation:GetApprentices(playerId) → apprenticeData[]
SocialRelation:RequestMentor(apprenticeId, masterId) → bool, err
SocialRelation:AcceptMentor(masterId, apprenticeId) → bool, err
SocialRelation:LeaveMentor(apprenticeId) → bool, err
SocialRelation:GraduateApprentice(masterId, apprenticeId) → bool
SocialRelation:CanTakeApprentice(masterId) → bool

-- 亲密关系（结拜 / 情侣）
SocialRelation:SetIntimacyType(a, b, relType) → bool, err
SocialRelation:BreakIntimacy(a, b) → bool, err
SocialRelation:GetIntimacyRelation(a, b) → intimacyData
SocialRelation:AddIntimacyExp(a, b, delta) → bool, status

-- 仇人 / 击杀
SocialRelation:RecordKill(killerId, victimId)
SocialRelation:GetKillRecords(killerId) → killRecord[]
SocialRelation:GetRecentKillCount(killerId, victimId, withinSec) → int

-- 称号 / 标签
SocialRelation:GetTags(playerId) → string[]
SocialRelation:AddTag(playerId, tag) → bool
SocialRelation:RemoveTag(playerId, tag) → bool
SocialRelation:SetTitle(playerId, title)
SocialRelation:GetTitle(playerId) → string

-- 推荐
SocialRelation:GetRecommendations(requesterId, count) → { playerId, nickname, level, reason }[]

-- 服务器事件
SocialAddRelation   → { TargetId: string, RelType: string }
SocialRemoveRelation→ { TargetId: string }
SocialRequestMentor → { MasterId: string }
SocialAcceptMentor  → { ApprenticeId: string }
SocialLeaveMentor   → { }
SocialSetIntimacy   → { TargetId: string, RelType: string }
SocialBreakIntimacy → { TargetId: string }
SocialRecommend     → { Count: int }
SocialSetTitle      → { Title: string }
SocialReportKill    → { KillerId: string, VictimId: string }

-- 客户端事件
SocialRelationSync  → { Payload: string }
SocialMentorSync    → { MasterId: string, GraduationCount: int, Apprentices: string }
SocialIntimacySync  → { Payload: string }
SocialNotify        → { Type: string, ... }
```

---

## 七、配置项说明

所有配置集中在 `main.lua` 的 `SocialContext.config` 中：

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `dbDir` | `"Data/SocialDB/"` | 持久化数据库文件存放目录 |
| `autoSaveIntervalSec` | `300` | 自动保存周期（秒） |
| `maxPartySize` | `5` | 队伍最大人数 |
| `maxGuildSize` | `50` | 公会最大人数 |
| `maxFriends` | `100` | 单个玩家好友上限 |
| `maxMailCount` | `200` | 单个玩家邮件上限 |
| `mailExpiryDays` | `30` | 邮件过期天数 |
| `chatCooldownMs` | `500` | 聊天发言基础 CD（毫秒） |
| `guildCreationCost` | `10000` | 创建公会消耗金币 |
| `maxMasterApprentices` | `3` | 每位师父最多徒弟数 |
| `maxFactionSize` | `100` | 预留阵营系统上限 |

你可以直接在 `main.lua` 中修改这些数值，也可以通过外部配置文件在运行时覆盖。

---

## 八、代码示例

### 8.1 客户端：发送一条好友请求

```lua
local vm = VariantMap()
vm["TargetId"] = "player_123"
vm["Message"] = "大佬带带我！"
local connection = network:GetServerConnection()
if connection then
    connection:SendRemoteEvent("FriendRequest", true, vm)
end
```

### 8.2 客户端：在世界频道发言

```lua
local vm = VariantMap()
vm["Channel"] = "world"
vm["Text"] = "有人一起下副本吗？"
vm["MsgType"] = "text"
local connection = network:GetServerConnection()
if connection then
    connection:SendRemoteEvent("ChatSendChannel", true, vm)
end
```

### 8.3 服务器脚本：系统发一封全服奖励邮件

```lua
local mailMod = SocialContext:GetModule("Mail")
mailMod:BroadcastSystemMail(
    "开服庆典",
    "感谢您参与本次测试，请查收附件奖励。",
    {
        { type = "gold", id = "", count = 10000 },
        { type = "item", id = "gift_box_001", count = 3 }
    }
)
```

### 8.4 服务器脚本：记录一场 PVP 击杀并建立仇人关系

```lua
local relMod = SocialContext:GetModule("SocialRelation")
relMod:RecordKill("killer_pid", "victim_pid")
-- 同时在世界频道发公告
local chatMod = SocialContext:GetModule("Chat")
chatMod:SendChannelMessage("killer_pid", "world",
    chatMod:FilterText("我击杀了 victim_pid！"), "text")
```

### 8.5 客户端：监听并显示聊天消息

```lua
SubscribeToEvent("ChatChannelMessage", function(eventType, eventData)
    local channel = eventData["Channel"]:GetString()
    local sender = eventData["SenderName"]:GetString()
    local text = eventData["Text"]:GetString()
    AddChatMessageToUI(channel, sender, text)
end)
```

### 8.6 服务器脚本：公会升级后广播系统消息

```lua
local chatMod = SocialContext:GetModule("Chat")
chatMod:SendGuildMessage(guildId, "SYSTEM",
    "恭喜本公会升级到 Lv." .. newLevel .. "！")
```

### 8.7 客户端：读取邮件并领取附件

```lua
local vm = VariantMap()
vm["MailId"] = "MAIL_xxx"
connection:SendRemoteEvent("MailRead", true, vm)

local vm2 = VariantMap()
vm2["MailId"] = "MAIL_xxx"
connection:SendRemoteEvent("MailClaimAttach", true, vm2)
```

### 8.8 服务器脚本：拜师流程

```lua
local relMod = SocialContext:GetModule("SocialRelation")
relMod:RequestMentor("apprentice_pid", "master_pid")
-- master 端收到 SocialNotify(Type="mentor_request") 后调用：
relMod:AcceptMentor("master_pid", "apprentice_pid")
```

---

## 九、数据持久化说明

本技能包不依赖外部数据库，所有社交数据通过纯 Lua Table 序列化保存到本地文件。每个模块拥有独立的数据库文件：

- `Data/SocialDB/FriendDB.lua`
- `Data/SocialDB/GuildDB.lua`
- `Data/SocialDB/PartyDB.lua`
- `Data/SocialDB/ChatDB.lua`
- `Data/SocialDB/MailDB.lua`
- `Data/SocialDB/SocialRelationDB.lua`

文件格式示例 (`FriendDB.lua`)：

```lua
return {
  friendships = {
    ["player_A"] = {
      ["player_B"] = {
        status = "friend",
        group = "默认",
        note = "",
        intimacy = 15,
        addTime = 1714567890,
        lastInteract = 1714567900,
        requestMsg = ""
      }
    }
  },
  blocks = {
    ["player_A"] = { ["player_C"] = true }
  },
  playerGroups = {
    ["player_A"] = { [1] = "默认", [2] = "战友" }
  }
}
```

### 9.1 迁移到外部数据库的建议

如果你需要将数据迁移到 MySQL / PostgreSQL / Redis：

1. **Friend / Guild / Party / SocialRelation** → 使用关系型数据库（MySQL/PostgreSQL）存储表结构数据。
2. **Chat 历史记录** → 使用 MongoDB 或 Elasticsearch 存储消息日志，按时间分表/分片。
3. **Mail** → 继续使用关系型数据库，附件字段使用 JSON 列。
4. **在线状态 / 连接映射** → 使用 Redis Hash + Sorted Set 维护在线玩家与最后活跃时间。

在 Lua 层，你只需重写 `Load()` 和 `Save()` 方法即可平滑替换存储后端，其余业务逻辑完全不需要改动。

---

## 十、开源参考链接

本技能包的设计和实现参考了以下优秀的开源项目，感谢社区贡献者：

1. **NoahGameFrame (NF)**  
   https://github.com/ketoo/NoahGameFrame  
   - 分布式 MMO 服务端框架，Lua 插件化设计。提供了模块加载、事件驱动、Actor 模型等设计思想参考。

2. **OpenCoreMMO**  
   https://github.com/OpenCoreMMO/OpenCoreMMO  
   - 现代 C# MMORPG 服务器模拟器。具备完整的 Guild、Party、Chats、Royal Mail、Vip List 实现，社交系统边界划分清晰。

3. **SkynetMMO**  
   https://github.com/liuhaopen/SkynetMMO  
   - 基于 Skynet 的 Lua MMO 框架。展示了如何使用 Lua 在高并发场景下管理玩家连接、状态同步和房间/队伍机制。

4. **Nakama** (Heroic Labs)  
   https://github.com/heroiclabs/nakama  
   - 可扩展的游戏后端服务，提供 Groups、Chat、Friends、Leaderboards 的完整实现。虽然使用 Go 编写，但其社交 API 设计极具参考价值。

5. **The Forgotten Server (TFS)**  
   https://github.com/otland/forgottenserver  
   - 经典的 Tibia 服务器模拟器，Lua 脚本系统非常成熟。其 Guild、Party、Chat 模块是很多现代 MMO 服务器的前身。

---

## 十一、扩展与定制建议

### 11.1 接入 UI 层

所有模块均通过 `VariantMap` 发送/接收数据。你可以在客户端订阅对应事件，将数据转换为 UI 所需的列表或缓存结构。例如：

- `FriendListSync` → 解析字符串 → 更新 `ScrollView` / `ListView`。
- `ChatChannelMessage` → 按 Channel 分桶 → 追加到对应聊天窗口。
- `MailListSync` → 解析后生成邮件卡片 → 标记未读红点。

### 11.2 接入邮件系统的背包扣减

当玩家发送带附件的邮件时，你需要在调用 `Mail:SendMail` 之前先由背包系统扣除对应物品。技能包内部只负责"邮件元数据"的流转，不直接操作背包。

### 11.3 公会战的扩展

当前 Guild 模块已预留 `GuildWarDeclare` / `GuildWarEnd` 事件和 `activeWars` 字段。你可以在此基础上扩展：

- 公会战报名期 → 匹配期 → 战斗期 → 结果结算。
- 公会据点/领地占领逻辑。
- 公会赛季排行榜。

### 11.4 敏感词与聊天安全的增强

当前敏感词库为硬编码数组，建议替换为：

- 从外部配置文件（CSV/JSON）加载的动态词库。
- Aho-Corasick 多模式匹配算法（可在 C++ 层实现并暴露给 Lua）。
- 接入机器学习内容审核 API（如阿里云、腾讯云）。

### 11.5 性能优化方向

- **热点数据缓存**：将 `SocialContext.players`、`Friend.friendships` 中频繁访问的数据缓存到 Lua 局部变量，减少哈希查找。
- **批量操作**：全服广播系统邮件时，分片发送，避免一次性构造过大的 VariantMap。
- **异步持久化**：在 C++ 层实现一个后台线程执行 `SaveTable`，避免主循环卡顿。

---

## 十二、License

本技能包遵循 MIT 开源协议，你可以自由用于商业或非商业项目。

```
MIT License
Copyright (c) 2026 UrhoX Community
```

---

## 十三、作者与维护

- **主要设计者**：UrhoX Community
- **文档版本**：v1.0.0
- **最后更新时间**：2026-04-13

如果你在集成过程中遇到问题，欢迎查看上方列出的开源参考项目，或在 UrhoX 社区讨论区发起话题。
