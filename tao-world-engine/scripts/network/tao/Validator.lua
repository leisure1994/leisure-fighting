-- Validator.lua
-- 天道引擎 · ValidateGuard 状态防火墙
-- 职责：拦截非法状态变更、校验动作可行性、守护硬锁事实、管理世界规则一致性、预言软锁定、审计追踪

Validator = Validator or {}

------------------------------------------------------------------------
-- 一、常量定义
------------------------------------------------------------------------

local MAX_RELATIONSHIP = 100
local MIN_RELATIONSHIP = -100
local MAX_GOLD_TRANSFER = 10000000
local MAX_ITEM_STACK = 9999
local MAX_NPC_LEVEL = 999
local MAX_PLAYER_LEVEL = 999
local MAX_BACKPACK_SLOTS = 200
local MAX_PARTY_SIZE = 5
local MAX_GUILD_SIZE = 100
local MAX_TRADE_DISTANCE = 300
local MAX_SPEAK_DISTANCE = 500
local MAX_COMBAT_DISTANCE = 800
local MAX_MENTOR_DISTANCE = 500
local MAX_ROMANCE_DISTANCE = 300
local MIN_MANA_PERCENT_FOR_CAST = 5
local MAX_FATIGUE_FOR_GATHER = 90
local MIN_LEVEL_FOR_DUNGEON = 10
local MIN_LEVEL_FOR_MENTOR = 50
local MAX_BUILD_DISTANCE = 600
local MAX_AUCTION_DURATION_DAYS = 7
local MAX_MAIL_ATTACHMENT_COUNT = 5
local BATCH_VALIDATE_CHUNK_SIZE = 1000
local WORLD_GRAPH_SURFACE = "surface"
local WORLD_GRAPH_UNDERGROUND = "underground"
local WORLD_GRAPH_SKY = "sky"
local SEASON_SPRING = "spring"
local SEASON_SUMMER = "summer"
local SEASON_AUTUMN = "autumn"
local SEASON_WINTER = "winter"

------------------------------------------------------------------------
-- 二、世界规则库（字段规则）
------------------------------------------------------------------------

--- 按 target_type 分类的合法字段与值域规则表
Validator.FIELD_RULES = {
    npc = {
        state = { type = "string", enum = { "idle","thinking","executing","waiting","combat","dead","patrol","sleep","fear","trading","leading","dying","romancing","mentoring","crafting","gathering","building","voting","mobilizing" } },
        location = { type = "string", minLen = 1, maxLen = 128 },
        hp = { type = "number", min = 0, max = 999999999 },
        health = { type = "number", min = 0, max = 999999999 },
        mp = { type = "number", min = 0, max = 999999999 },
        level = { type = "number", min = 1, max = 999 },
        exp = { type = "number", min = 0, max = 999999999 },
        gold = { type = "number", min = 0, max = 999999999 },
        relationship = { type = "number", min = -100, max = 100 },
        reputation = { type = "number", min = -10000, max = 10000 },
        faction = { type = "string", minLen = 0, maxLen = 64 },
        visual_range = { type = "number", min = 0, max = 5000 },
        fatigue = { type = "number", min = 0, max = 100 },
        hunger = { type = "number", min = 0, max = 100 },
        safety = { type = "number", min = 0, max = 100 },
        social = { type = "number", min = 0, max = 100 },
        wealth = { type = "number", min = 0, max = 100 },
        prestige = { type = "number", min = 0, max = 100 },
        romance_target = { type = "string", minLen = 0, maxLen = 64 },
        mentor_target = { type = "string", minLen = 0, maxLen = 64 },
        apprentice_target = { type = "string", minLen = 0, maxLen = 64 },
        guild_id = { type = "string", minLen = 0, maxLen = 64 },
        political_stance = { type = "number", min = -100, max = 100 }
    },
    player = {
        state = { type = "string", enum = { "online","offline","combat","trading","dying","dead","queuing","in_dungeon","crafting","gathering","voting","romancing" } },
        location = { type = "string", minLen = 1, maxLen = 128 },
        level = { type = "number", min = 1, max = 999 },
        gold = { type = "number", min = 0, max = 999999999 },
        exp = { type = "number", min = 0, max = 999999999 },
        reputation = { type = "number", min = -10000, max = 10000 },
        faction = { type = "string", minLen = 0, maxLen = 64 },
        dungeon_prestige = { type = "number", min = 0, max = 999999999 },
        hp = { type = "number", min = 0, max = 999999999 },
        mp = { type = "number", min = 0, max = 999999999 },
        guild_id = { type = "string", minLen = 0, maxLen = 64 },
        guild_rank = { type = "number", min = 0, max = 10 },
        romance_partner = { type = "string", minLen = 0, maxLen = 64 },
        mentor_id = { type = "string", minLen = 0, maxLen = 64 },
        political_influence = { type = "number", min = 0, max = 999999999 },
        achievement_points = { type = "number", min = 0, max = 999999999 }
    },
    world = {
        event = { type = "string", enum = { "npc_death","npc_birth","faction_destroyed","faction_founded","timeline_altered","region_conquered","weather_changed","market_crash","war_declared","peace_signed","season_changed","festival_started","festival_ended","election_held","coup_attempted","miracle_occurred","cataclysm_triggered" } },
        time_of_day = { type = "number", min = 0, max = 24 },
        day_number = { type = "number", min = 1, max = 999999999 },
        season = { type = "string", enum = { "spring","summer","autumn","winter" } },
        festival = { type = "string", minLen = 0, maxLen = 64 },
        global_mood = { type = "number", min = -100, max = 100 },
        war_state = { type = "boolean" }
    },
    item = {
        count = { type = "number", min = 0, max = 9999 },
        quality = { type = "number", min = 0, max = 100 },
        durability = { type = "number", min = 0, max = 100 },
        owner = { type = "string", minLen = 0, maxLen = 64 },
        location = { type = "string", minLen = 0, maxLen = 128 },
        bound = { type = "boolean" },
        bound_type = { type = "string", enum = { "none","account","character","guild" } },
        price = { type = "number", min = 0, max = 999999999 }
    },
    faction = {
        reputation = { type = "number", min = -10000, max = 10000 },
        territory = { type = "string", minLen = 0, maxLen = 128 },
        strength = { type = "number", min = 0, max = 999999999 },
        wealth = { type = "number", min = 0, max = 999999999 },
        leader = { type = "string", minLen = 0, maxLen = 64 },
        member_count = { type = "number", min = 0, max = 10000 },
        war_target = { type = "string", minLen = 0, maxLen = 64 },
        ally_factions = { type = "table" },
        enemy_factions = { type = "table" }
    },
    region = {
        name = { type = "string", minLen = 1, maxLen = 128 },
        owner = { type = "string", minLen = 0, maxLen = 64 },
        region_type = { type = "string", enum = { "city","dungeon","wilderness","camp","ruin","castle","village","underground","sky_island" } },
        danger_level = { type = "number", min = 0, max = 100 },
        population = { type = "number", min = 0, max = 999999999 },
        resource_abundance = { type = "number", min = 0, max = 100 },
        controlling_faction = { type = "string", minLen = 0, maxLen = 64 }
    },
    romance = {
        partner_a = { type = "string", minLen = 1, maxLen = 64 },
        partner_b = { type = "string", minLen = 1, maxLen = 64 },
        affection = { type = "number", min = 0, max = 100 },
        trust = { type = "number", min = 0, max = 100 },
        loyalty = { type = "number", min = 0, max = 100 },
        status = { type = "string", enum = { "courting","engaged","married","divorced","widowed" } },
        anniversary_day = { type = "number", min = 1, max = 999999999 }
    },
    mentor = {
        mentor_id = { type = "string", minLen = 1, maxLen = 64 },
        apprentice_id = { type = "string", minLen = 1, maxLen = 64 },
        skill_transferred = { type = "table" },
        respect = { type = "number", min = 0, max = 100 },
        teaching_quality = { type = "number", min = 0, max = 100 },
        graduation_day = { type = "number", min = 0, max = 999999999 },
        active = { type = "boolean" }
    },
    faction_war = {
        aggressor = { type = "string", minLen = 1, maxLen = 64 },
        defender = { type = "string", minLen = 1, maxLen = 64 },
        war_score = { type = "number", min = -10000, max = 10000 },
        start_day = { type = "number", min = 1, max = 999999999 },
        end_day = { type = "number", min = 0, max = 999999999 },
        status = { type = "string", enum = { "preparing","active","stalemate","victory_aggressor","victory_defender","peace_negotiated" } },
        mobilization_rate = { type = "number", min = 0, max = 100 }
    },
    region_event = {
        region_id = { type = "string", minLen = 1, maxLen = 128 },
        event_type = { type = "string", enum = { "harvest_festival","bandit_invasion","plague","earthquake","miracle","civil_unrest","trade_boom","famine" } },
        severity = { type = "number", min = 1, max = 10 },
        start_day = { type = "number", min = 1, max = 999999999 },
        duration_days = { type = "number", min = 1, max = 365 }
    },
    guild = {
        name = { type = "string", minLen = 1, maxLen = 32 },
        leader_id = { type = "string", minLen = 1, maxLen = 64 },
        member_count = { type = "number", min = 1, max = 100 },
        level = { type = "number", min = 1, max = 20 },
        wealth = { type = "number", min = 0, max = 999999999 },
        territory = { type = "string", minLen = 0, maxLen = 128 },
        reputation = { type = "number", min = -10000, max = 10000 }
    },
    auction = {
        seller_id = { type = "string", minLen = 1, maxLen = 64 },
        item_id = { type = "string", minLen = 1, maxLen = 64 },
        starting_price = { type = "number", min = 1, max = 999999999 },
        current_bid = { type = "number", min = 0, max = 999999999 },
        buyout_price = { type = "number", min = 0, max = 999999999 },
        duration_hours = { type = "number", min = 1, max = 168 },
        status = { type = "string", enum = { "active","sold","expired","cancelled" } }
    },
    mail = {
        sender_id = { type = "string", minLen = 1, maxLen = 64 },
        recipient_id = { type = "string", minLen = 1, maxLen = 64 },
        subject = { type = "string", minLen = 1, maxLen = 64 },
        body = { type = "string", minLen = 0, maxLen = 2000 },
        read = { type = "boolean" },
        has_attachment = { type = "boolean" },
        sent_day = { type = "number", min = 1, max = 999999999 }
    },
    vote = {
        voter_id = { type = "string", minLen = 1, maxLen = 64 },
        target_id = { type = "string", minLen = 1, maxLen = 64 },
        vote_type = { type = "string", enum = { "support","oppose","abstain" } },
        weight = { type = "number", min = 1, max = 100 },
        reason = { type = "string", minLen = 0, maxLen = 256 }
    },
    build = {
        builder_id = { type = "string", minLen = 1, maxLen = 64 },
        structure_type = { type = "string", enum = { "house","wall","tower","farm","mine","temple","market","barracks" } },
        location = { type = "string", minLen = 1, maxLen = 128 },
        progress = { type = "number", min = 0, max = 100 },
        required_materials = { type = "table" },
        quality = { type = "number", min = 0, max = 100 }
    }
}

--- 动作前置条件规则库：定义每个动作所需的字段与基础约束
Validator.ACTION_PRECONDITIONS = {
    move_to = { required = { "target" }, optional = { "distance","speed","graph_layer" } },
    speak = { required = { "content" }, optional = { "target","emotion","volume","language" } },
    trade_initiate = { required = { "target_player" }, optional = { "offer_items","request_gold","request_items" } },
    invite_party = { required = { "target_player" }, optional = { "dungeon_id","min_level","loot_mode" } },
    lead_to = { required = { "destination" }, optional = { "speed","stop_distance","graph_layer" } },
    engage_combat = { required = { "target" }, optional = { "skill_set","stance","combat_mode" } },
    cast_spell = { required = { "spell_id" }, optional = { "target","mana_cost","cast_time","channel_time" } },
    setup_stall = { required = { "goods_list" }, optional = { "location","duration","tax_rate" } },
    wait_for = { required = {}, optional = { "timeout","condition","interrupt_on_combat" } },
    use_item = { required = { "item_id" }, optional = { "target","count","consumption_mode" } },
    gather = { required = { "resource_id" }, optional = { "tool_id","amount","skill_level_required" } },
    craft = { required = { "recipe_id" }, optional = { "workbench_loc","materials","batch_count" } },
    rest = { required = {}, optional = { "location","duration","rest_quality" } },
    flee = { required = { "direction" }, optional = { "distance","hide_loc","graph_layer" } },
    taunt = { required = { "target" }, optional = { "content","range","taunt_style" } },
    bribe = { required = { "target","gold_amount" }, optional = { "item_id","bribe_promise" } },
    propose_romance = { required = { "target" }, optional = { "gift_item_id","proposal_text","location" } },
    accept_romance = { required = { "proposer" }, optional = { "dowry_items" } },
    break_romance = { required = { "partner" }, optional = { "reason","compensation_gold" } },
    propose_mentor = { required = { "target" }, optional = { "teaching_focus","contract_duration" } },
    accept_mentor = { required = { "mentor_id" }, optional = { "apprentice_gift" } },
    graduate_apprentice = { required = { "apprentice_id" }, optional = { "graduation_gift","skill_taught" } },
    build_structure = { required = { "structure_type","location" }, optional = { "materials","blueprint_id","batch_workers" } },
    donate_guild = { required = { "guild_id","amount" }, optional = { "donation_message" } },
    vote_faction = { required = { "target_faction","vote_type" }, optional = { "reason","influence_spent" } },
    mobilize_war = { required = { "war_id" }, optional = { "mobilization_rate","resource_commitment" } },
    post_auction = { required = { "item_id","starting_price" }, optional = { "buyout_price","duration_hours","reserve_price" } },
    bid_auction = { required = { "auction_id","bid_amount" }, optional = { "max_proxy_bid" } },
    send_mail = { required = { "recipient_id","subject" }, optional = { "body","attachments"," COD_gold" } },
    enter_dungeon = { required = { "dungeon_id" }, optional = { "party_id","difficulty" } },
    claim_achievement = { required = { "achievement_id" }, optional = { "claim_reward" } },
    use_webhook = { required = { "endpoint","payload" }, optional = { "method","headers","retry_count" } }
}

------------------------------------------------------------------------
-- 三、世界图（World Graph）多图支持
------------------------------------------------------------------------

Validator.worldGraph = Validator.worldGraph or {
    surface = { nodes = {}, regions = {} },
    underground = { nodes = {}, regions = {} },
    sky = { nodes = {}, regions = {} }
}

--- 注册世界图节点到指定图层
function Validator.RegisterWorldNode(locName, def, layer)
    layer = layer or WORLD_GRAPH_SURFACE
    if not Validator.worldGraph[layer] then return end
    Validator.worldGraph[layer].nodes[locName] = def or { connections = {}, region = "" }
end

--- 注册世界图连接（双向）到指定图层
function Validator.ConnectWorldNodes(a, b, cost, layer)
    layer = layer or WORLD_GRAPH_SURFACE
    cost = cost or 1
    local graph = Validator.worldGraph[layer]
    if not graph then return end
    if graph.nodes[a] then
        graph.nodes[a].connections = graph.nodes[a].connections or {}
        graph.nodes[a].connections[b] = cost
    end
    if graph.nodes[b] then
        graph.nodes[b].connections = graph.nodes[b].connections or {}
        graph.nodes[b].connections[a] = cost
    end
end

--- 检查地点是否存在于指定图层的世界图中
function Validator.IsValidLocation(locName, layer)
    layer = layer or WORLD_GRAPH_SURFACE
    if not locName or locName == "" then return false end
    local graph = Validator.worldGraph[layer]
    if not graph then return false end
    return graph.nodes[locName] ~= nil
end

--- 检查从A到B是否存在合法路径（使用BFS，限制深度防止卡死）
function Validator.HasValidPath(fromLoc, toLoc, maxDepth, layer)
    maxDepth = maxDepth or 20
    layer = layer or WORLD_GRAPH_SURFACE
    if not Validator.IsValidLocation(fromLoc, layer) or not Validator.IsValidLocation(toLoc, layer) then return false end
    if fromLoc == toLoc then return true end
    local graph = Validator.worldGraph[layer]
    if not graph then return false end
    local visited = {}
    local queue = { { loc = fromLoc, depth = 0 } }
    visited[fromLoc] = true
    local head = 1
    while head <= #queue do
        local cur = queue[head]
        head = head + 1
        if cur.depth >= maxDepth then goto continue end
        local node = graph.nodes[cur.loc]
        if node and node.connections then
            for neighbor, _ in pairs(node.connections) do
                if neighbor == toLoc then return true end
                if not visited[neighbor] then
                    visited[neighbor] = true
                    table.insert(queue, { loc = neighbor, depth = cur.depth + 1 })
                end
            end
        end
        ::continue::
    end
    return false
end

--- 获取跨层传送点合法性（如电梯、飞行点）
function Validator.IsValidCrossLayerPortal(fromLoc, toLoc, fromLayer, toLayer)
    if fromLayer == toLayer then return Validator.HasValidPath(fromLoc, toLoc, 20, fromLayer) end
    if not Validator.IsValidLocation(fromLoc, fromLayer) then return false end
    if not Validator.IsValidLocation(toLoc, toLayer) then return false end
    local fromNode = Validator.worldGraph[fromLayer] and Validator.worldGraph[fromLayer].nodes[fromLoc]
    local toNode = Validator.worldGraph[toLayer] and Validator.worldGraph[toLayer].nodes[toLoc]
    if not fromNode or not toNode then return false end
    if fromNode.portal_tag and toNode.portal_tag and fromNode.portal_tag == toNode.portal_tag then return true end
    return false
end

------------------------------------------------------------------------
-- 四、硬锁事实与预言软锁定
------------------------------------------------------------------------

Validator.hardLocks = Validator.hardLocks or {
    immortalNpcs = {},
    immortalFactions = {},
    fixedLocations = {},
    timelineAnchors = {},
    confirmedDeaths = {},
    confirmedEvents = {},
    confirmedBuilds = {},
    confirmedPolitics = {},
    confirmedGuilds = {},
    confirmedRomances = {}
}

Validator.softLocks = Validator.softLocks or {
    futureDeaths = {},
    futureEvents = {},
    futureWars = {},
    futureElections = {},
    futureFestivals = {},
    prophecies = {}
}

Validator.RULES = {
    maxRelationship = MAX_RELATIONSHIP,
    minRelationship = MIN_RELATIONSHIP,
    maxGoldTransfer = MAX_GOLD_TRANSFER,
    maxItemStack = MAX_ITEM_STACK,
    maxNpcLevel = MAX_NPC_LEVEL,
    maxPlayerLevel = MAX_PLAYER_LEVEL,
    maxBackpackSlots = MAX_BACKPACK_SLOTS,
    maxPartySize = MAX_PARTY_SIZE,
    maxGuildSize = MAX_GUILD_SIZE,
    maxTradeDistance = MAX_TRADE_DISTANCE,
    maxSpeakDistance = MAX_SPEAK_DISTANCE,
    maxCombatDistance = MAX_COMBAT_DISTANCE,
    maxMentorDistance = MAX_MENTOR_DISTANCE,
    maxRomanceDistance = MAX_ROMANCE_DISTANCE,
    minManaPercentForCast = MIN_MANA_PERCENT_FOR_CAST,
    maxFatigueForGather = MAX_FATIGUE_FOR_GATHER,
    minLevelForDungeon = MIN_LEVEL_FOR_DUNGEON,
    minLevelForMentor = MIN_LEVEL_FOR_MENTOR,
    maxBuildDistance = MAX_BUILD_DISTANCE,
    maxAuctionDurationDays = MAX_AUCTION_DURATION_DAYS,
    maxMailAttachmentCount = MAX_MAIL_ATTACHMENT_COUNT,
    batchChunkSize = BATCH_VALIDATE_CHUNK_SIZE
}

--- 设置硬锁事实
function Validator.SetHardLock(category, id, value)
    Validator.hardLocks[category] = Validator.hardLocks[category] or {}
    Validator.hardLocks[category][id] = value or true
end

--- 查询硬锁事实
function Validator.IsHardLocked(category, id)
    return Validator.hardLocks[category] and Validator.hardLocks[category][id] ~= nil
end

--- 清除硬锁事实
function Validator.ClearHardLock(category, id)
    if Validator.hardLocks[category] then
        Validator.hardLocks[category][id] = nil
    end
end

--- 注册预言软锁定（允许提前拒绝矛盾变更）
function Validator.RegisterSoftLock(lockType, id, lockData)
    Validator.softLocks[lockType] = Validator.softLocks[lockType] or {}
    Validator.softLocks[lockType][id] = lockData or true
end

--- 查询预言软锁定
function Validator.IsSoftLocked(lockType, id)
    return Validator.softLocks[lockType] and Validator.softLocks[lockType][id] ~= nil
end

--- 清除预言软锁定
function Validator.ClearSoftLock(lockType, id)
    if Validator.softLocks[lockType] then
        Validator.softLocks[lockType][id] = nil
    end
end

--- 检查变更是否与软锁定冲突
function Validator.CheckSoftLockConflict(c)
    if not c or type(c) ~= "table" then return true, "" end
    local errors = {}
    if c.target_type == "npc" and c.target then
        if Validator.IsSoftLocked("futureDeaths", c.target) then
            if c.field == "hp" and type(c.value) == "number" and c.value > 0 then
                table.insert(errors, "软锁冲突: NPC " .. c.target .. " 已被预言死亡，不可恢复生命")
            end
            if c.field == "state" and c.value ~= "dead" then
                table.insert(errors, "软锁冲突: NPC " .. c.target .. " 已被预言死亡，不可变更状态为 " .. c.value)
            end
        end
    end
    if c.target_type == "world" and c.event then
        if c.event_id and Validator.IsSoftLocked("futureEvents", c.event_id) then
            local lockData = Validator.softLocks.futureEvents[c.event_id]
            if lockData and lockData.expected_event and lockData.expected_event ~= c.event then
                table.insert(errors, "软锁冲突: 事件 " .. c.event_id .. " 已被预言为 " .. lockData.expected_event)
            end
        end
        if c.event == "war_declared" and c.war_id and Validator.IsSoftLocked("futureWars", c.war_id) then
            local lockData = Validator.softLocks.futureWars[c.war_id]
            if lockData and lockData.aggressor and lockData.aggressor ~= c.aggressor then
                table.insert(errors, "软锁冲突: 战争 " .. c.war_id .. " 的宣战方已被预言锁定")
            end
        end
        if c.event == "election_held" and c.election_id and Validator.IsSoftLocked("futureElections", c.election_id) then
            table.insert(errors, "软锁冲突: 选举 " .. c.election_id .. " 已被预言锁定")
        end
    end
    if c.target_type == "faction" and c.faction_id then
        if Validator.IsSoftLocked("futureWars", c.faction_id .. "_war") then
            if c.field == "war_target" and c.value == "" then
                table.insert(errors, "软锁冲突: 势力 " .. c.faction_id .. " 已被预言卷入战争，不可取消战争目标")
            end
        end
    end
    if c.target_type == "region" and c.region_id then
        if Validator.IsSoftLocked("futureFestivals", c.region_id) then
            if c.field == "event_active" and c.value == false then
                table.insert(errors, "软锁冲突: 区域 " .. c.region_id .. " 已被预言举办节日，不可取消")
            end
        end
    end
    if #errors > 0 then return false, table.concat(errors, "; ") end
    return true, ""
end

------------------------------------------------------------------------
-- 五、审计日志系统
------------------------------------------------------------------------

Validator.auditLog = Validator.auditLog or {}
Validator.auditLogMaxSize = 10000

--- 生成审计条目
function Validator.CreateAuditEntry(level, category, actor, action, target, result, reason, details)
    local entry = {
        t = os and os.time and os.time() or 0,
        level = level or "info",
        category = category or "general",
        actor = actor or "system",
        action = action or "unknown",
        target = target or "",
        result = result or "unknown",
        reason = reason or "",
        details = details or {}
    }
    table.insert(Validator.auditLog, entry)
    while #Validator.auditLog > Validator.auditLogMaxSize do
        table.remove(Validator.auditLog, 1)
    end
    return entry
end

--- 获取最近审计日志
function Validator.GetRecentAudits(count, filterCategory)
    count = count or 50
    local result = {}
    for i = #Validator.auditLog, 1, -1 do
        local e = Validator.auditLog[i]
        if not filterCategory or e.category == filterCategory then
            table.insert(result, e)
            if #result >= count then break end
        end
    end
    return result
end

--- 清空审计日志
function Validator.ClearAuditLog()
    Validator.auditLog = {}
end

------------------------------------------------------------------------
-- 六、通用字段类型校验
------------------------------------------------------------------------

local function ValidateFieldType(fieldName, value, rule)
    if rule.type == "string" then
        if type(value) ~= "string" then return false, fieldName .. " 必须是字符串" end
        if rule.minLen and #value < rule.minLen then return false, fieldName .. " 长度不足" end
        if rule.maxLen and #value > rule.maxLen then return false, fieldName .. " 长度超限" end
        if rule.enum then
            local found = false
            for _, e in ipairs(rule.enum) do
                if e == value then found = true; break end
            end
            if not found then return false, fieldName .. " 值不在合法枚举中: " .. tostring(value) end
        end
    elseif rule.type == "number" then
        if type(value) ~= "number" then return false, fieldName .. " 必须是数字" end
        if rule.min ~= nil and value < rule.min then return false, fieldName .. " 低于最小值" end
        if rule.max ~= nil and value > rule.max then return false, fieldName .. " 超过最大值" end
    elseif rule.type == "boolean" then
        if type(value) ~= "boolean" then return false, fieldName .. " 必须是布尔值" end
    elseif rule.type == "table" then
        if type(value) ~= "table" then return false, fieldName .. " 必须是表" end
    end
    return true, ""
end

local function table_contains(tbl, val)
    for _, v in ipairs(tbl) do
        if v == val then return true end
    end
    return false
end

------------------------------------------------------------------------
-- 七、状态变更校验
------------------------------------------------------------------------

--- 校验一批状态变更
function Validator.ValidateChanges(changes)
    if type(changes) ~= "table" then
        Validator.CreateAuditEntry("error", "validation", "system", "ValidateChanges", "", "rejected", "changes 不是表")
        return false, "changes 不是表"
    end
    for _, c in ipairs(changes) do
        local ok, err = Validator.ValidateSingleChange(c)
        if not ok then
            return false, err
        end
    end
    return true, ""
end

--- 批量校验（支持一次校验 1000+ 条变更）
function Validator.BatchValidateChanges(changes)
    if type(changes) ~= "table" then
        Validator.CreateAuditEntry("error", "batch_validation", "system", "BatchValidateChanges", "", "rejected", "changes 不是表")
        return { ok = false, total = 0, passCount = 0, failCount = 0, errors = { "changes 不是表" }, details = {} }
    end
    local total = #changes
    local passCount = 0
    local failCount = 0
    local details = {}
    local errors = {}
    local chunkSize = Validator.RULES.batchChunkSize
    for i = 1, total do
        local c = changes[i]
        local ok1, err1 = Validator.ValidateSingleChange(c)
        local ok2, err2 = Validator._CheckTimelineSingle(c)
        local ok3, err3 = Validator.CheckSoftLockConflict(c)
        local ok = ok1 and ok2 and ok3
        local err = ""
        if not ok1 then err = err .. err1 .. "; " end
        if not ok2 then err = err .. err2 .. "; " end
        if not ok3 then err = err .. err3 .. "; " end
        details[i] = { ok = ok, err = err, change = c }
        if ok then
            passCount = passCount + 1
        else
            failCount = failCount + 1
            table.insert(errors, "[序号 " .. i .. "] " .. err)
        end
        if i % chunkSize == 0 then
            collectgarbage("step")
        end
    end
    Validator.CreateAuditEntry("info", "batch_validation", "system", "BatchValidateChanges", "", "completed", "", { total = total, pass = passCount, fail = failCount })
    return { ok = failCount == 0, total = total, passCount = passCount, failCount = failCount, errors = errors, details = details }
end

--- 校验单条状态变更，扩展了完整的规则库检查
function Validator.ValidateSingleChange(c)
    if type(c) ~= "table" then
        Validator.CreateAuditEntry("error", "validation", "system", "ValidateSingleChange", "", "rejected", "变更条目不是表")
        return false, "变更条目不是表"
    end
    if not c.target_type then
        Validator.CreateAuditEntry("error", "validation", "system", "ValidateSingleChange", "", "rejected", "缺少 target_type")
        return false, "缺少 target_type"
    end
    if not c.field and not c.event then
        Validator.CreateAuditEntry("error", "validation", "system", "ValidateSingleChange", "", "rejected", "缺少 field 或 event")
        return false, "缺少 field 或 event"
    end

    local ruleset = Validator.FIELD_RULES[c.target_type]
    if not ruleset then
        Validator.CreateAuditEntry("error", "validation", "system", "ValidateSingleChange", c.target_type, "rejected", "未知的 target_type")
        return false, "未知的 target_type: " .. tostring(c.target_type)
    end

    local fieldKey = c.field or c.event
    local rule = ruleset[fieldKey]
    if rule then
        local ok, err = ValidateFieldType(fieldKey, c.value, rule)
        if not ok then
            Validator.CreateAuditEntry("warn", "validation", "system", "ValidateSingleChange", c.target_type .. ":" .. fieldKey, "rejected", err)
            return false, err
        end
    end

    local ok, err = Validator._ValidateByTargetType(c)
    if not ok then
        Validator.CreateAuditEntry("warn", "validation", "system", "ValidateSingleChange", c.target_type .. ":" .. fieldKey, "rejected", err)
        return false, err
    end

    Validator.CreateAuditEntry("info", "validation", "system", "ValidateSingleChange", c.target_type .. ":" .. fieldKey, "passed", "")
    return true, ""
end

--- 按 target_type 细分的校验逻辑
function Validator._ValidateByTargetType(c)
    if c.target_type == "npc" then
        return Validator._ValidateNpcChange(c)
    elseif c.target_type == "player" then
        return Validator._ValidatePlayerChange(c)
    elseif c.target_type == "world" then
        return Validator._ValidateWorldChange(c)
    elseif c.target_type == "item" then
        return Validator._ValidateItemChange(c)
    elseif c.target_type == "faction" then
        return Validator._ValidateFactionChange(c)
    elseif c.target_type == "region" then
        return Validator._ValidateRegionChange(c)
    elseif c.target_type == "romance" then
        return Validator._ValidateRomanceChange(c)
    elseif c.target_type == "mentor" then
        return Validator._ValidateMentorChange(c)
    elseif c.target_type == "faction_war" then
        return Validator._ValidateFactionWarChange(c)
    elseif c.target_type == "region_event" then
        return Validator._ValidateRegionEventChange(c)
    elseif c.target_type == "guild" then
        return Validator._ValidateGuildChange(c)
    elseif c.target_type == "auction" then
        return Validator._ValidateAuctionChange(c)
    elseif c.target_type == "mail" then
        return Validator._ValidateMailChange(c)
    elseif c.target_type == "vote" then
        return Validator._ValidateVoteChange(c)
    elseif c.target_type == "build" then
        return Validator._ValidateBuildChange(c)
    end
    return true, ""
end

--- NPC 变更细分校验
function Validator._ValidateNpcChange(c)
    if not c.target then return false, "NPC 变更缺少 target" end
    if _G.NPCExists and not NPCExists(c.target) then return false, "NPC 不存在: " .. c.target end

    if c.field == "relationship" then
        if type(c.value) ~= "number" then return false, "relationship 必须是数字" end
        if math.abs(c.value) > Validator.RULES.maxRelationship then
            return false, "关系值越界: " .. tostring(c.value)
        end
    end

    if c.field == "hp" or c.field == "health" then
        if type(c.value) == "number" and c.value <= 0 then
            if Validator.IsHardLocked("immortalNpcs", c.target) then
                return false, "硬锁事实：该角色不可死亡"
            end
            Validator.SetHardLock("confirmedDeaths", c.target, true)
        end
    end

    if c.field == "state" and c.value == "dead" then
        if Validator.IsHardLocked("immortalNpcs", c.target) then
            return false, "硬锁事实：该角色不可被设为死亡"
        end
        Validator.SetHardLock("confirmedDeaths", c.target, true)
    end

    if c.field == "location" then
        if Validator.IsHardLocked("fixedLocations", c.target) then
            return false, "硬锁事实：该角色位置不可变更"
        end
        if type(c.value) == "string" and not Validator.IsValidLocation(c.value) then
            return false, "NPC 目标地点不存在于世界图: " .. c.value
        end
        if Validator.IsHardLocked("confirmedDeaths", c.target) then
            return false, "时序冲突：已死亡 NPC 无法移动"
        end
    end

    if c.field == "level" and type(c.value) == "number" then
        if c.value < 1 or c.value > Validator.RULES.maxNpcLevel then
            return false, "NPC 等级越界"
        end
    end

    if c.field == "gold" and type(c.value) == "number" then
        if c.value < 0 then return false, "NPC 金币不能为负数" end
    end

    if c.field == "romance_target" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedRomances", c.target .. "_romance") then
            return false, "硬锁事实：该 NPC 的婚姻状态已被锁定"
        end
    end

    if c.field == "mentor_target" or c.field == "apprentice_target" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedPolitics", c.target .. "_mentor") then
            return false, "硬锁事实：该 NPC 的师徒关系已被政治锁定"
        end
    end

    if c.field == "guild_id" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedGuilds", c.value) then
            -- 允许加入已确认公会，但不允许加入不存在的公会
            if _G.GuildExists and not GuildExists(c.value) then
                return false, "公会不存在: " .. c.value
            end
        end
    end

    return true, ""
end

--- Player 变更细分校验
function Validator._ValidatePlayerChange(c)
    if not c.target then return false, "Player 变更缺少 target" end
    if c.field == "gold" and type(c.value) == "number" then
        if math.abs(c.value) > Validator.RULES.maxGoldTransfer then
            return false, "金币变动超限"
        end
        if c.value < 0 then return false, "Player 金币不能为负数" end
    end
    if c.field == "level" and type(c.value) == "number" then
        if c.value < 1 or c.value > Validator.RULES.maxPlayerLevel then
            return false, "玩家等级越界"
        end
    end
    if c.field == "location" and type(c.value) == "string" then
        if not Validator.IsValidLocation(c.value) then
            return false, "玩家目标地点不存在于世界图: " .. c.value
        end
    end
    if c.field == "guild_rank" and type(c.value) == "number" then
        if c.value < 0 or c.value > 10 then
            return false, "公会等级越界"
        end
    end
    if c.field == "romance_partner" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedRomances", c.target .. "_romance") then
            return false, "硬锁事实：玩家的婚姻状态已被锁定"
        end
    end
    if c.field == "mentor_id" then
        if c.value ~= "" then
            if _G.GetNpcLevel and GetNpcLevel(c.value) then
                if GetNpcLevel(c.value) < Validator.RULES.minLevelForMentor then
                    return false, "师傅等级不足，需要 " .. Validator.RULES.minLevelForMentor .. " 级以上"
                end
            end
        end
    end
    if c.field == "achievement_points" and type(c.value) == "number" then
        if c.value < 0 then return false, "成就点数不能为负数" end
    end
    return true, ""
end

--- World 变更细分校验
function Validator._ValidateWorldChange(c)
    if c.event == "npc_death" and c.npc_id and Validator.IsHardLocked("immortalNpcs", c.npc_id) then
        return false, "硬锁事实：该角色不可死亡"
    end
    if c.event == "faction_destroyed" and c.faction_id and Validator.IsHardLocked("immortalFactions", c.faction_id) then
        return false, "硬锁事实：该势力不可被摧毁"
    end
    if c.event == "timeline_altered" and c.anchor_id and Validator.IsHardLocked("timelineAnchors", c.anchor_id) then
        return false, "硬锁事实：时间线锚点不可修改"
    end
    if c.event == "npc_birth" and c.npc_id and Validator.IsHardLocked("confirmedDeaths", c.npc_id) then
        return false, "时序冲突：已确认死亡的 NPC 不可再次出生"
    end
    if c.event and c.event_id and Validator.IsHardLocked("confirmedEvents", c.event_id) then
        return false, "时序冲突：事件 " .. c.event_id .. " 已被确认，不可修改"
    end
    if c.field == "season" and type(c.value) == "string" then
        local validSeasons = { spring = true, summer = true, autumn = true, winter = true }
        if not validSeasons[c.value] then return false, "非法季节值: " .. c.value end
    end
    return true, ""
end

--- Item 变更细分校验
function Validator._ValidateItemChange(c)
    if c.field == "count" and type(c.value) == "number" then
        if c.value < 0 or c.value > Validator.RULES.maxItemStack then
            return false, "物品数量越界"
        end
    end
    if c.field == "quality" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "物品品质越界" end
    end
    if c.field == "durability" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "物品耐久越界" end
    end
    if c.field == "price" and type(c.value) == "number" then
        if c.value < 0 then return false, "物品价格不能为负数" end
    end
    return true, ""
end

--- Faction 变更细分校验
function Validator._ValidateFactionChange(c)
    if c.field == "leader" and type(c.value) == "string" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedDeaths", c.value) then
            return false, "该 NPC 已死亡，不能担任领袖"
        end
    end
    if c.field == "member_count" and type(c.value) == "number" then
        if c.value < 0 or c.value > 10000 then return false, "势力成员数越界" end
    end
    if c.field == "strength" and type(c.value) == "number" then
        if c.value < 0 then return false, "势力实力不能为负数" end
    end
    if c.field == "wealth" and type(c.value) == "number" then
        if c.value < 0 then return false, "势力财富不能为负数" end
    end
    return true, ""
end

--- Region 变更细分校验
function Validator._ValidateRegionChange(c)
    if c.field == "name" and type(c.value) == "string" then
        if c.value == "" then return false, "区域名不能为空" end
    end
    if c.field == "population" and type(c.value) == "number" then
        if c.value < 0 then return false, "区域人口不能为负数" end
    end
    if c.field == "danger_level" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "区域危险度越界" end
    end
    return true, ""
end

--- Romance 变更细分校验
function Validator._ValidateRomanceChange(c)
    if not c.target then return false, "Romance 变更缺少 target（关系ID）" end
    if c.field == "affection" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "好感度越界" end
    end
    if c.field == "trust" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "信任度越界" end
    end
    if c.field == "loyalty" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "忠诚度越界" end
    end
    if c.field == "status" then
        local valid = { courting = true, engaged = true, married = true, divorced = true, widowed = true }
        if not valid[c.value] then return false, "非法婚姻状态" end
    end
    if c.field == "partner_a" or c.field == "partner_b" then
        if c.value ~= "" and Validator.IsHardLocked("confirmedDeaths", c.value) then
            return false, "伴侣已死亡，无法建立或变更婚姻关系"
        end
    end
    return true, ""
end

--- Mentor 变更细分校验
function Validator._ValidateMentorChange(c)
    if not c.target then return false, "Mentor 变更缺少 target（关系ID）" end
    if c.field == "respect" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "尊敬度越界" end
    end
    if c.field == "teaching_quality" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "教学质量越界" end
    end
    if c.field == "mentor_id" then
        if c.value ~= "" and _G.GetNpcLevel then
            local lvl = GetNpcLevel(c.value) or 1
            if lvl < Validator.RULES.minLevelForMentor then
                return false, "师傅等级不足: " .. lvl
            end
        end
    end
    return true, ""
end

--- FactionWar 变更细分校验
function Validator._ValidateFactionWarChange(c)
    if not c.target then return false, "FactionWar 变更缺少 target（战争ID）" end
    if c.field == "war_score" and type(c.value) == "number" then
        if c.value < -10000 or c.value > 10000 then return false, "战争分数越界" end
    end
    if c.field == "mobilization_rate" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "动员率越界" end
    end
    if c.field == "status" then
        local valid = { preparing = true, active = true, stalemate = true, victory_aggressor = true, victory_defender = true, peace_negotiated = true }
        if not valid[c.value] then return false, "非法战争状态" end
    end
    return true, ""
end

--- RegionEvent 变更细分校验
function Validator._ValidateRegionEventChange(c)
    if not c.target then return false, "RegionEvent 变更缺少 target（事件ID）" end
    if c.field == "severity" and type(c.value) == "number" then
        if c.value < 1 or c.value > 10 then return false, "事件严重度越界" end
    end
    if c.field == "duration_days" and type(c.value) == "number" then
        if c.value < 1 or c.value > 365 then return false, "事件持续时间越界" end
    end
    return true, ""
end

--- Guild 变更细分校验
function Validator._ValidateGuildChange(c)
    if not c.target then return false, "Guild 变更缺少 target（公会ID）" end
    if c.field == "member_count" and type(c.value) == "number" then
        if c.value < 1 or c.value > Validator.RULES.maxGuildSize then
            return false, "公会成员数越界（最大 " .. Validator.RULES.maxGuildSize .. "）"
        end
    end
    if c.field == "level" and type(c.value) == "number" then
        if c.value < 1 or c.value > 20 then return false, "公会等级越界" end
    end
    if c.field == "wealth" and type(c.value) == "number" then
        if c.value < 0 then return false, "公会财富不能为负数" end
    end
    return true, ""
end

--- Auction 变更细分校验
function Validator._ValidateAuctionChange(c)
    if not c.target then return false, "Auction 变更缺少 target（拍卖ID）" end
    if c.field == "starting_price" and type(c.value) == "number" then
        if c.value < 1 then return false, "起拍价必须大于0" end
    end
    if c.field == "current_bid" and type(c.value) == "number" then
        if c.value < 0 then return false, "当前出价不能为负数" end
    end
    if c.field == "buyout_price" and type(c.value) == "number" then
        if c.value < 0 then return false, "一口价不能为负数" end
    end
    if c.field == "duration_hours" and type(c.value) == "number" then
        if c.value < 1 or c.value > 168 then return false, "拍卖持续时间越界" end
    end
    return true, ""
end

--- Mail 变更细分校验
function Validator._ValidateMailChange(c)
    if not c.target then return false, "Mail 变更缺少 target（邮件ID）" end
    if c.field == "subject" and type(c.value) == "string" then
        if #c.value < 1 or #c.value > 64 then return false, "邮件主题长度越界" end
    end
    if c.field == "body" and type(c.value) == "string" then
        if #c.value > 2000 then return false, "邮件正文长度越界" end
    end
    return true, ""
end

--- Vote 变更细分校验
function Validator._ValidateVoteChange(c)
    if not c.target then return false, "Vote 变更缺少 target（投票ID）" end
    if c.field == "vote_type" then
        local valid = { support = true, oppose = true, abstain = true }
        if not valid[c.value] then return false, "非法投票类型" end
    end
    if c.field == "weight" and type(c.value) == "number" then
        if c.value < 1 or c.value > 100 then return false, "投票权重越界" end
    end
    return true, ""
end

--- Build 变更细分校验
function Validator._ValidateBuildChange(c)
    if not c.target then return false, "Build 变更缺少 target（建筑ID）" end
    if c.field == "progress" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "建筑进度越界" end
    end
    if c.field == "quality" and type(c.value) == "number" then
        if c.value < 0 or c.value > 100 then return false, "建筑品质越界" end
    end
    if c.field == "location" and type(c.value) == "string" then
        if not Validator.IsValidLocation(c.value) then
            return false, "建筑地点不存在于世界图: " .. c.value
        end
    end
    if Validator.IsHardLocked("confirmedBuilds", c.target) then
        if c.field == "progress" or c.field == "location" or c.field == "structure_type" then
            return false, "硬锁事实：该建筑已被确认，不可变更核心属性"
        end
    end
    return true, ""
end

------------------------------------------------------------------------
-- 八、动作前置条件引擎
------------------------------------------------------------------------

--- 检查指定动作对指定 NPC 是否满足前置条件
function Validator.CheckPrecondition(npcId, action)
    if not action or not action.action then
        return false, "动作结构不完整"
    end

    local a = action.action
    local pre = Validator.ACTION_PRECONDITIONS[a]
    if not pre then
        return false, "未知动作类型: " .. tostring(a)
    end

    for _, field in ipairs(pre.required) do
        if action[field] == nil then
            return false, "动作 " .. a .. " 缺少必填字段: " .. field
        end
    end

    local function npcIsDead(nid)
        if _G.GetNpcState then
            local s = GetNpcState(nid)
            return s == "dead" or s == "dying"
        end
        return Validator.IsHardLocked("confirmedDeaths", nid)
    end

    local function npcIsFriend(targetId)
        if _G.GetNpcFaction and _G.GetNpcRelationship then
            local f1 = GetNpcFaction(npcId)
            local f2 = GetNpcFaction(targetId)
            if f1 and f2 and f1 == f2 then return true end
            local rel = GetNpcRelationship(npcId, targetId)
            if rel and rel > 30 then return true end
        end
        return false
    end

    local function targetExists(tid)
        if _G.NPCExists and NPCExists(tid) then return true end
        if _G.PlayerOnline and PlayerOnline(tid) then return true end
        return false
    end

    local function getNpcMana(nid)
        if _G.GetNpcMp then return GetNpcMp(nid) or 0 end
        return 999999
    end

    local function getNpcMaxMana(nid)
        if _G.GetNpcMaxMp then return GetNpcMaxMp(nid) or 1 end
        return 999999
    end

    local function spellOnCooldown(nid, spellId)
        if _G.IsSpellOnCooldown then return IsSpellOnCooldown(nid, spellId) end
        return false
    end

    local function getNpcBackpackFreeSlots(nid)
        if _G.GetNpcBackpackFreeSlots then return GetNpcBackpackFreeSlots(nid) or 0 end
        return Validator.RULES.maxBackpackSlots
    end

    local function getPlayerBackpackFreeSlots(pid)
        if _G.GetPlayerBackpackFreeSlots then return GetPlayerBackpackFreeSlots(pid) or 0 end
        return Validator.RULES.maxBackpackSlots
    end

    local function getNpcGold(nid)
        if _G.GetNpcGold then return GetNpcGold(nid) or 0 end
        return 0
    end

    local function getPlayerGold(pid)
        if _G.GetPlayerGold then return GetPlayerGold(pid) or 0 end
        return 0
    end

    local function getPlayerLevel(pid)
        if _G.GetPlayerLevel then return GetPlayerLevel(pid) or 1 end
        return 999
    end

    local function getNpcLevel(nid)
        if _G.GetNpcLevel then return GetNpcLevel(nid) or 1 end
        return 1
    end

    local function getNpcFatigue(nid)
        if _G.GetNpcFatigue then return GetNpcFatigue(nid) or 0 end
        return 0
    end

    local function npcHasItem(nid, itemId, count)
        count = count or 1
        if _G.NpcHasItem then return NpcHasItem(nid, itemId, count) end
        return false
    end

    local function playerHasItem(pid, itemId, count)
        count = count or 1
        if _G.PlayerHasItem then return PlayerHasItem(pid, itemId, count) end
        return false
    end

    local function resourceExists(rid)
        if _G.ResourceNodeExists then return ResourceNodeExists(rid) end
        return true
    end

    local function playerInRange(pid, range)
        if _G.GetDistanceToPlayer then
            local d = GetDistanceToPlayer(npcId, pid)
            return d and d <= range
        end
        return true
    end

    local function npcInRange(tid, range)
        if _G.GetDistanceToNpc then
            local d = GetDistanceToNpc(npcId, tid)
            return d and d <= range
        end
        return true
    end

    local function locationInRange(loc, range)
        if _G.GetDistanceToLocation then
            local d = GetDistanceToLocation(npcId, loc)
            return d and d <= range
        end
        return true
    end

    local function isGuildLeader(pid, gid)
        if _G.GetGuildLeader then return GetGuildLeader(gid) == pid end
        return false
    end

    local function isInGuild(pid, gid)
        if _G.GetPlayerGuild then return GetPlayerGuild(pid) == gid end
        return false
    end

    local function getGuildWealth(gid)
        if _G.GetGuildWealth then return GetGuildWealth(gid) or 0 end
        return 0
    end

    local function getGuildMemberCount(gid)
        if _G.GetGuildMemberCount then return GetGuildMemberCount(gid) or 0 end
        return 0
    end

    local function isAuctionActive(aid)
        if _G.GetAuctionStatus then return GetAuctionStatus(aid) == "active" end
        return true
    end

    local function getAuctionCurrentBid(aid)
        if _G.GetAuctionCurrentBid then return GetAuctionCurrentBid(aid) or 0 end
        return 0
    end

    local function getMailAttachmentCount(mid)
        if _G.GetMailAttachmentCount then return GetMailAttachmentCount(mid) or 0 end
        return 0
    end

    local function isDungeonActive(did)
        if _G.DungeonAvailable then return DungeonAvailable(did) end
        return true
    end

    local function getNpcPoliticalStance(nid)
        if _G.GetNpcPoliticalStance then return GetNpcPoliticalStance(nid) or 0 end
        return 0
    end

    -- move_to
    if a == "move_to" then
        if not action.target then return false, "移动缺少目标" end
        local layer = action.graph_layer or WORLD_GRAPH_SURFACE
        if type(action.target) == "string" and not Validator.IsValidLocation(action.target, layer) then
            return false, "移动目标地点不存在: " .. action.target .. " 图层: " .. layer
        end
        if npcIsDead(npcId) then return false, "已死亡，无法移动" end
    end

    -- speak
    if a == "speak" then
        if not action.content or action.content == "" then
            return false, "对话内容为空"
        end
        if npcIsDead(npcId) then return false, "已死亡，无法说话" end
    end

    -- trade_initiate
    if a == "trade_initiate" then
        if not action.target_player then return false, "交易缺少目标玩家" end
        if not PlayerOnline(action.target_player) then return false, "玩家不在线" end
        if not playerInRange(action.target_player, Validator.RULES.maxTradeDistance) then
            return false, "玩家超出交易距离"
        end
        if action.offer_items and #action.offer_items > 0 then
            local totalSlotsNeeded = 0
            for _, item in ipairs(action.offer_items) do
                if type(item) == "table" and item.id then
                    if not npcHasItem(npcId, item.id, item.count or 1) then
                        return false, "NPC 不持有交易物品: " .. item.id
                    end
                    totalSlotsNeeded = totalSlotsNeeded + 1
                end
            end
            if getPlayerBackpackFreeSlots(action.target_player) < totalSlotsNeeded then
                return false, "玩家背包空间不足"
            end
        end
        if action.request_items and #action.request_items > 0 then
            for _, item in ipairs(action.request_items) do
                if type(item) == "table" and item.id then
                    if not playerHasItem(action.target_player, item.id, item.count or 1) then
                        return false, "玩家不持有请求物品: " .. item.id
                    end
                end
            end
        end
        if npcIsDead(npcId) then return false, "已死亡，无法交易" end
    end

    -- invite_party
    if a == "invite_party" then
        if not action.target_player then return false, "组队邀请缺少目标玩家" end
        if not PlayerOnline(action.target_player) then return false, "玩家不在线" end
        if action.dungeon_id and _G.DungeonAvailable and not DungeonAvailable(action.dungeon_id) then
            return false, "副本未开启"
        end
        local minLvl = action.min_level or Validator.RULES.minLevelForDungeon
        if getPlayerLevel(action.target_player) < minLvl then
            return false, "玩家等级不足，需要 " .. minLvl
        end
        if action.dungeon_id and _G.GetPlayerDungeonPrestige then
            local req = (_G.GetDungeonPrestigeReq and GetDungeonPrestigeReq(action.dungeon_id)) or 0
            if GetPlayerDungeonPrestige(action.target_player) < req then
                return false, "玩家副本声望不足"
            end
        end
        if _G.GetPartySize and GetPartySize(action.target_player) >= Validator.RULES.maxPartySize then
            return false, "玩家队伍已满"
        end
        if npcIsDead(npcId) then return false, "已死亡，无法邀请组队" end
    end

    -- lead_to
    if a == "lead_to" then
        if not action.destination then return false, "带路缺少目的地" end
        local layer = action.graph_layer or WORLD_GRAPH_SURFACE
        if type(action.destination) == "string" and not Validator.IsValidLocation(action.destination, layer) then
            return false, "目的地不存在于世界图: " .. action.destination .. " 图层: " .. layer
        end
        if npcIsDead(npcId) then return false, "已死亡，无法带路" end
    end

    -- engage_combat
    if a == "engage_combat" then
        if not action.target then return false, "战斗缺少目标" end
        if not targetExists(action.target) then return false, "战斗目标不存在" end
        if npcIsDead(action.target) then return false, "目标已死亡，无法战斗" end
        if npcIsFriend(action.target) then return false, "不能攻击友方目标" end
        if npcIsDead(npcId) then return false, "自身已死亡，无法进入战斗" end
    end

    -- cast_spell
    if a == "cast_spell" then
        if not action.spell_id then return false, "施法缺少技能 ID" end
        local maxMp = getNpcMaxMana(npcId)
        local manaNeeded = action.mana_cost or 0
        if maxMp > 0 then
            local mpPct = (getNpcMana(npcId) / maxMp) * 100
            if mpPct < Validator.RULES.minManaPercentForCast then
                return false, "蓝量不足，无法施法"
            end
        end
        if getNpcMana(npcId) < manaNeeded then
            return false, "蓝量不足以释放该技能"
        end
        if spellOnCooldown(npcId, action.spell_id) then
            return false, "技能正在冷却中"
        end
        if npcIsDead(npcId) then return false, "已死亡，无法施法" end
    end

    -- setup_stall
    if a == "setup_stall" then
        if not action.goods_list or #action.goods_list == 0 then
            return false, "摆摊缺少货物"
        end
        for _, g in ipairs(action.goods_list) do
            if type(g) == "table" and g.item_id then
                if not npcHasItem(npcId, g.item_id, g.count or 1) then
                    return false, "NPC 没有足够货物: " .. g.item_id
                end
            end
        end
        if npcIsDead(npcId) then return false, "已死亡，无法摆摊" end
    end

    -- use_item
    if a == "use_item" then
        if not action.item_id then return false, "使用物品缺少 item_id" end
        if not npcHasItem(npcId, action.item_id, action.count or 1) then
            return false, "NPC 没有该物品"
        end
        if npcIsDead(npcId) then return false, "已死亡，无法使用物品" end
    end

    -- gather
    if a == "gather" then
        if not action.resource_id then return false, "采集缺少资源点 ID" end
        if not resourceExists(action.resource_id) then return false, "资源点不存在" end
        if getNpcFatigue(npcId) > Validator.RULES.maxFatigueForGather then
            return false, "NPC 过于疲劳，无法采集"
        end
        if action.tool_id and not npcHasItem(npcId, action.tool_id, 1) then
            return false, "缺少采集工具: " .. action.tool_id
        end
        if npcIsDead(npcId) then return false, "已死亡，无法采集" end
    end

    -- craft
    if a == "craft" then
        if not action.recipe_id then return false, "制造缺少配方 ID" end
        if _G.RecipeExists and not RecipeExists(action.recipe_id) then
            return false, "配方不存在"
        end
        if action.workbench_loc and type(action.workbench_loc) == "string" then
            if not Validator.IsValidLocation(action.workbench_loc) then
                return false, "工作台位置不存在"
            end
        end
        if npcIsDead(npcId) then return false, "已死亡，无法制造" end
    end

    -- rest
    if a == "rest" then
        if npcIsDead(npcId) then return false, "已死亡，无需休息" end
    end

    -- flee
    if a == "flee" then
        if not action.direction then return false, "逃跑缺少方向" end
        if npcIsDead(npcId) then return false, "已死亡，无需逃跑" end
    end

    -- taunt
    if a == "taunt" then
        if not action.target then return false, "嘲讽缺少目标" end
        if not targetExists(action.target) then return false, "嘲讽目标不存在" end
        if npcIsDead(action.target) then return false, "目标已死亡，无法嘲讽" end
        if npcIsDead(npcId) then return false, "已死亡，无法嘲讽" end
    end

    -- bribe
    if a == "bribe" then
        if not action.target then return false, "贿赂缺少目标" end
        if not targetExists(action.target) then return false, "贿赂目标不存在" end
        local amount = action.gold_amount or 0
        if amount <= 0 then return false, "贿赂金额必须大于0" end
        if getNpcGold(npcId) < amount then return false, "NPC 金币不足以贿赂" end
        if npcIsDead(npcId) then return false, "已死亡，无法贿赂" end
    end

    -- propose_romance
    if a == "propose_romance" then
        if not action.target then return false, "求婚缺少目标" end
        if not targetExists(action.target) then return false, "求婚目标不存在" end
        if npcIsDead(action.target) then return false, "目标已死亡，无法求婚" end
        if not npcInRange(action.target, Validator.RULES.maxRomanceDistance) then
            return false, "目标超出求婚距离"
        end
        if Validator.IsHardLocked("confirmedRomances", npcId .. "_romance") then
            return false, "该 NPC 已有锁定婚姻关系"
        end
        if Validator.IsHardLocked("confirmedRomances", action.target .. "_romance") then
            return false, "目标已有锁定婚姻关系"
        end
        if action.gift_item_id and not npcHasItem(npcId, action.gift_item_id, 1) then
            return false, "缺少求婚礼物: " .. action.gift_item_id
        end
    end

    -- accept_romance
    if a == "accept_romance" then
        if not action.proposer then return false, "接受求婚缺少求婚者" end
        if Validator.IsHardLocked("confirmedRomances", npcId .. "_romance") then
            return false, "该 NPC 已有锁定婚姻关系"
        end
        if Validator.IsHardLocked("confirmedRomances", action.proposer .. "_romance") then
            return false, "求婚者已有锁定婚姻关系"
        end
    end

    -- break_romance
    if a == "break_romance" then
        if not action.partner then return false, "分手缺少对象" end
        if action.compensation_gold and action.compensation_gold > 0 then
            if getNpcGold(npcId) < action.compensation_gold then
                return false, "分手补偿金不足"
            end
        end
    end

    -- propose_mentor
    if a == "propose_mentor" then
        if not action.target then return false, "拜师缺少目标" end
        if not targetExists(action.target) then return false, "师傅目标不存在" end
        if not npcInRange(action.target, Validator.RULES.maxMentorDistance) then
            return false, "目标超出拜师距离"
        end
        if getNpcLevel(npcId) >= getNpcLevel(action.target) then
            return false, "师傅等级必须高于徒弟"
        end
        if getNpcLevel(action.target) < Validator.RULES.minLevelForMentor then
            return false, "师傅等级不足 " .. Validator.RULES.minLevelForMentor
        end
        if Validator.IsHardLocked("confirmedPolitics", npcId .. "_mentor") then
            return false, "该 NPC 师徒关系已被政治锁定"
        end
    end

    -- accept_mentor
    if a == "accept_mentor" then
        if not action.mentor_id then return false, "接受拜师缺少师傅ID" end
        if getNpcLevel(action.mentor_id) < Validator.RULES.minLevelForMentor then
            return false, "师傅等级不足"
        end
    end

    -- graduate_apprentice
    if a == "graduate_apprentice" then
        if not action.apprentice_id then return false, "出师缺少徒弟ID" end
    end

    -- build_structure
    if a == "build_structure" then
        if not action.structure_type then return false, "建造缺少结构类型" end
        if not action.location then return false, "建造缺少地点" end
        if not Validator.IsValidLocation(action.location) then
            return false, "建造地点不存在"
        end
        if not locationInRange(action.location, Validator.RULES.maxBuildDistance) then
            return false, "建造地点超出范围"
        end
        if npcIsDead(npcId) then return false, "已死亡，无法建造" end
    end

    -- donate_guild
    if a == "donate_guild" then
        if not action.guild_id then return false, "捐献缺少公会ID" end
        if not action.amount or action.amount <= 0 then return false, "捐献金额必须大于0" end
        if not isInGuild(npcId, action.guild_id) then return false, "不属于该公会" end
        if getNpcGold(npcId) < action.amount then return false, "捐献金币不足" end
    end

    -- vote_faction
    if a == "vote_faction" then
        if not action.target_faction then return false, "投票缺少目标势力" end
        if not action.vote_type then return false, "投票缺少类型" end
        local validVotes = { support = true, oppose = true, abstain = true }
        if not validVotes[action.vote_type] then return false, "非法投票类型" end
        if action.influence_spent and action.influence_spent > 0 then
            if _G.GetNpcInfluence and GetNpcInfluence(npcId) < action.influence_spent then
                return false, "NPC 影响力不足"
            end
        end
    end

    -- mobilize_war
    if a == "mobilize_war" then
        if not action.war_id then return false, "动员缺少战争ID" end
        if action.mobilization_rate and (action.mobilization_rate < 0 or action.mobilization_rate > 100) then
            return false, "动员率越界"
        end
    end

    -- post_auction
    if a == "post_auction" then
        if not action.item_id then return false, "拍卖缺少物品ID" end
        if not action.starting_price or action.starting_price < 1 then
            return false, "拍卖起拍价必须大于0"
        end
        if not npcHasItem(npcId, action.item_id, 1) then
            return false, "NPC 不持有该拍卖物品"
        end
        if action.duration_hours and (action.duration_hours < 1 or action.duration_hours > 168) then
            return false, "拍卖持续时间越界"
        end
    end

    -- bid_auction
    if a == "bid_auction" then
        if not action.auction_id then return false, "竞拍缺少拍卖ID" end
        if not action.bid_amount or action.bid_amount < 1 then
            return false, "竞拍价必须大于0"
        end
        if not isAuctionActive(action.auction_id) then
            return false, "拍卖已结束"
        end
        local currentBid = getAuctionCurrentBid(action.auction_id)
        if action.bid_amount <= currentBid then
            return false, "竞拍价必须高于当前出价"
        end
        if getNpcGold(npcId) < action.bid_amount then
            return false, "竞拍金币不足"
        end
    end

    -- send_mail
    if a == "send_mail" then
        if not action.recipient_id then return false, "发邮件缺少收件人" end
        if not action.subject or action.subject == "" then return false, "邮件主题不能为空" end
        if action.attachments and #action.attachments > Validator.RULES.maxMailAttachmentCount then
            return false, "邮件附件数量超限"
        end
        if action.COD_gold and action.COD_gold < 0 then
            return false, "COD 金额不能为负数"
        end
    end

    -- enter_dungeon
    if a == "enter_dungeon" then
        if not action.dungeon_id then return false, "进入副本缺少副本ID" end
        if not isDungeonActive(action.dungeon_id) then
            return false, "副本未激活"
        end
        if _G.GetPlayerLevel and GetPlayerLevel(npcId) < Validator.RULES.minLevelForDungeon then
            return false, "等级不足，无法进入副本"
        end
    end

    -- claim_achievement
    if a == "claim_achievement" then
        if not action.achievement_id then return false, "领取成就缺少成就ID" end
        if _G.HasAchievementUnlocked and not HasAchievementUnlocked(npcId, action.achievement_id) then
            return false, "成就未解锁"
        end
    end

    -- use_webhook
    if a == "use_webhook" then
        if not action.endpoint then return false, "Webhook 缺少 endpoint" end
        if not action.payload then return false, "Webhook 缺少 payload" end
    end

    Validator.CreateAuditEntry("info", "precondition", npcId, a, action.target or "", "passed", "")
    return true, ""
end

--- 驱动旧的 API 的包装：内部调用 CheckPrecondition
function Validator.ValidateAction(npcId, action)
    return Validator.CheckPrecondition(npcId, action)
end

------------------------------------------------------------------------
-- 九、资源校验
------------------------------------------------------------------------

--- 资源校验统一入口
function Validator.ValidateResources(npcId, action)
    if not action or not action.action then return true, "" end
    local a = action.action

    if a == "trade_initiate" then
        return Validator._ValidateTradeResources(npcId, action)
    elseif a == "invite_party" then
        return Validator._ValidatePartyResources(npcId, action)
    elseif a == "bribe" then
        return Validator._ValidateBribeResources(npcId, action)
    elseif a == "craft" then
        return Validator._ValidateCraftResources(npcId, action)
    elseif a == "build_structure" then
        return Validator._ValidateBuildResources(npcId, action)
    elseif a == "propose_romance" then
        return Validator._ValidateRomanceResources(npcId, action)
    elseif a == "accept_romance" then
        return Validator._ValidateRomanceAcceptResources(npcId, action)
    elseif a == "break_romance" then
        return Validator._ValidateRomanceBreakResources(npcId, action)
    elseif a == "propose_mentor" then
        return Validator._ValidateMentorResources(npcId, action)
    elseif a == "accept_mentor" then
        return Validator._ValidateMentorAcceptResources(npcId, action)
    elseif a == "graduate_apprentice" then
        return Validator._ValidateGraduateResources(npcId, action)
    elseif a == "donate_guild" then
        return Validator._ValidateGuildDonateResources(npcId, action)
    elseif a == "vote_faction" then
        return Validator._ValidateVoteResources(npcId, action)
    elseif a == "mobilize_war" then
        return Validator._ValidateWarMobilizeResources(npcId, action)
    elseif a == "post_auction" then
        return Validator._ValidateAuctionPostResources(npcId, action)
    elseif a == "bid_auction" then
        return Validator._ValidateAuctionBidResources(npcId, action)
    elseif a == "send_mail" then
        return Validator._ValidateMailSendResources(npcId, action)
    elseif a == "enter_dungeon" then
        return Validator._ValidateDungeonEnterResources(npcId, action)
    elseif a == "claim_achievement" then
        return Validator._ValidateAchievementResources(npcId, action)
    end

    return true, ""
end

--- 交易资源校验
function Validator._ValidateTradeResources(npcId, action)
    if not action.target_player then return false, "缺少交易目标" end
    local offerCount = 0
    if action.offer_items then
        for _, item in ipairs(action.offer_items) do
            if type(item) == "table" then
                offerCount = offerCount + 1
                if _G.NpcHasItem and not NpcHasItem(npcId, item.id, item.count or 1) then
                    return false, "NPC 缺少交易物品: " .. tostring(item.id)
                end
            end
        end
    end
    if _G.GetPlayerBackpackFreeSlots then
        local free = GetPlayerBackpackFreeSlots(action.target_player) or 0
        if free < offerCount then
            return false, "玩家背包容量不足（需 " .. offerCount .. " 格）"
        end
    end
    return true, ""
end

--- 组队资源校验
function Validator._ValidatePartyResources(npcId, action)
    if not action.target_player then return false, "缺少组队目标" end
    if _G.GetPlayerLevel then
        local minLvl = action.min_level or Validator.RULES.minLevelForDungeon
        if (GetPlayerLevel(action.target_player) or 1) < minLvl then
            return false, "玩家等级不足"
        end
    end
    if action.dungeon_id and _G.GetPlayerDungeonPrestige then
        local req = 0
        if _G.GetDungeonPrestigeReq then req = GetDungeonPrestigeReq(action.dungeon_id) or 0 end
        if (GetPlayerDungeonPrestige(action.target_player) or 0) < req then
            return false, "玩家副本声望不足"
        end
    end
    if _G.GetPartySize and _G.GetPartyMaxSize then
        if (GetPartySize(action.target_player) or 0) >= (GetPartyMaxSize(action.target_player) or Validator.RULES.maxPartySize) then
            return false, "玩家队伍已满"
        end
    end
    if _G.GetNpcPartySize and _G.GetNpcPartyMaxSize then
        if (GetNpcPartySize(npcId) or 0) >= (GetNpcPartyMaxSize(npcId) or Validator.RULES.maxPartySize) then
            return false, "NPC 队伍已满"
        end
    end
    return true, ""
end

--- 贿赂资源校验
function Validator._ValidateBribeResources(npcId, action)
    local amount = action.gold_amount or 0
    if _G.GetNpcGold then
        if (GetNpcGold(npcId) or 0) < amount then
            return false, "贿赂金币不足"
        end
    end
    return true, ""
end

--- 制造资源校验
function Validator._ValidateCraftResources(npcId, action)
    if not action.recipe_id then return true, "" end
    if _G.GetRecipeMaterials then
        local mats = GetRecipeMaterials(action.recipe_id)
        if type(mats) == "table" then
            for itemId, needCount in pairs(mats) do
                if _G.NpcHasItem and not NpcHasItem(npcId, itemId, needCount) then
                    return false, "制造缺少材料: " .. itemId .. " x" .. needCount
                end
            end
        end
    end
    if _G.GetNpcBackpackFreeSlots then
        local resultCount = 1
        if _G.GetRecipeResultCount then resultCount = GetRecipeResultCount(action.recipe_id) or 1 end
        local free = GetNpcBackpackFreeSlots(npcId) or 0
        if free < resultCount then
            return false, "NPC 背包空间不足以接收制造产物"
        end
    end
    if action.batch_count and action.batch_count > 1 then
        if _G.GetRecipeBatchLimit then
            local limit = GetRecipeBatchLimit(action.recipe_id) or 1
            if action.batch_count > limit then
                return false, "制造批量数量超过配方限制: " .. limit
            end
        end
    end
    return true, ""
end

--- 建造资源校验
function Validator._ValidateBuildResources(npcId, action)
    if not action.structure_type then return false, "建造缺少结构类型" end
    if action.materials and type(action.materials) == "table" then
        for itemId, needCount in pairs(action.materials) do
            if _G.NpcHasItem and not NpcHasItem(npcId, itemId, needCount) then
                return false, "建造缺少材料: " .. itemId .. " x" .. needCount
            end
        end
    end
    if action.blueprint_id and _G.BlueprintExists and not BlueprintExists(action.blueprint_id) then
        return false, "建筑蓝图不存在"
    end
    if _G.GetNpcBuildSkill and GetNpcBuildSkill(npcId) then
        local requiredSkill = (_G.GetBuildSkillReq and GetBuildSkillReq(action.structure_type)) or 0
        if GetNpcBuildSkill(npcId) < requiredSkill then
            return false, "NPC 建造技能不足，需要 " .. requiredSkill
        end
    end
    return true, ""
end

--- 求婚资源校验
function Validator._ValidateRomanceResources(npcId, action)
    if action.gift_item_id then
        if _G.NpcHasItem and not NpcHasItem(npcId, action.gift_item_id, 1) then
            return false, "缺少求婚礼物"
        end
    end
    if _G.GetNpcRomanceCount then
        if GetNpcRomanceCount(npcId) >= 3 then
            return false, "该 NPC 已有过多浪漫关系"
        end
    end
    return true, ""
end

--- 接受求婚资源校验
function Validator._ValidateRomanceAcceptResources(npcId, action)
    if _G.GetNpcRomanceCount then
        if GetNpcRomanceCount(npcId) >= 3 then
            return false, "该 NPC 已有过多浪漫关系"
        end
    end
    return true, ""
end

--- 分手资源校验
function Validator._ValidateRomanceBreakResources(npcId, action)
    if action.compensation_gold and action.compensation_gold > 0 then
        if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.compensation_gold then
            return false, "分手补偿金不足"
        end
    end
    return true, ""
end

--- 拜师资源校验
function Validator._ValidateMentorResources(npcId, action)
    if _G.GetNpcMentorCount then
        if GetNpcMentorCount(npcId) >= 1 then
            return false, "该 NPC 已有师傅"
        end
    end
    if _G.GetNpcApprenticeCount and GetNpcApprenticeCount(action.target) then
        if GetNpcApprenticeCount(action.target) >= 5 then
            return false, "目标师傅徒弟已满"
        end
    end
    return true, ""
end

--- 接受拜师资源校验
function Validator._ValidateMentorAcceptResources(npcId, action)
    if _G.GetNpcApprenticeCount and GetNpcApprenticeCount(npcId) then
        if GetNpcApprenticeCount(npcId) >= 5 then
            return false, "该 NPC 徒弟已满"
        end
    end
    return true, ""
end

--- 出师资源校验
function Validator._ValidateGraduateResources(npcId, action)
    if not action.apprentice_id then return false, "缺少徒弟ID" end
    if _G.GetNpcMentor and GetNpcMentor(action.apprentice_id) ~= npcId then
        return false, "该角色不是此 NPC 的徒弟"
    end
    if action.graduation_gift and action.graduation_gift > 0 then
        if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.graduation_gift then
            return false, "出师赠礼金币不足"
        end
    end
    return true, ""
end

--- 公会捐献资源校验
function Validator._ValidateGuildDonateResources(npcId, action)
    if not action.guild_id then return false, "缺少公会ID" end
    if not action.amount or action.amount <= 0 then return false, "捐献金额无效" end
    if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.amount then
        return false, "捐献金币不足"
    end
    return true, ""
end

--- 投票资源校验
function Validator._ValidateVoteResources(npcId, action)
    if not action.target_faction then return false, "缺少投票目标势力" end
    if action.influence_spent and action.influence_spent > 0 then
        if _G.GetNpcInfluence and (GetNpcInfluence(npcId) or 0) < action.influence_spent then
            return false, "影响力不足"
        end
    end
    if _G.GetNpcVotingRight and not GetNpcVotingRight(npcId, action.target_faction) then
        return false, "该 NPC 无权对此势力投票"
    end
    return true, ""
end

--- 战争动员资源校验
function Validator._ValidateWarMobilizeResources(npcId, action)
    if not action.war_id then return false, "缺少战争ID" end
    if action.mobilization_rate and action.mobilization_rate > 0 then
        if _G.GetFactionManpower and _G.GetFactionMaxManpower then
            local factionId = _G.GetNpcFaction and GetNpcFaction(npcId) or ""
            if factionId ~= "" then
                local manpower = GetFactionManpower(factionId) or 0
                local maxManpower = GetFactionMaxManpower(factionId) or 1
                local needed = math.floor(maxManpower * action.mobilization_rate / 100)
                if manpower < needed then
                    return false, "势力兵力不足以支持该动员率"
                end
            end
        end
    end
    if action.resource_commitment and type(action.resource_commitment) == "table" then
        for resType, amount in pairs(action.resource_commitment) do
            if _G.GetFactionResource and (GetFactionResource(action.faction_id or "", resType) or 0) < amount then
                return false, "势力资源不足: " .. resType .. " x" .. amount
            end
        end
    end
    return true, ""
end

--- 拍卖发布资源校验
function Validator._ValidateAuctionPostResources(npcId, action)
    if not action.item_id then return false, "缺少物品ID" end
    if _G.NpcHasItem and not NpcHasItem(npcId, action.item_id, 1) then
        return false, "NPC 不持有该物品"
    end
    if action.starting_price and action.starting_price < 0 then
        return false, "起拍价不能为负数"
    end
    if action.buyout_price and action.buyout_price > 0 and action.buyout_price < action.starting_price then
        return false, "一口价不能低于起拍价"
    end
    return true, ""
end

--- 拍卖竞拍资源校验
function Validator._ValidateAuctionBidResources(npcId, action)
    if not action.auction_id then return false, "缺少拍卖ID" end
    if not action.bid_amount or action.bid_amount <= 0 then return false, "竞拍金额无效" end
    if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.bid_amount then
        return false, "竞拍金币不足"
    end
    if action.max_proxy_bid and action.max_proxy_bid > 0 then
        if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.max_proxy_bid then
            return false, "代理竞拍金币不足"
        end
    end
    return true, ""
end

--- 邮件发送资源校验
function Validator._ValidateMailSendResources(npcId, action)
    if not action.recipient_id then return false, "缺少收件人" end
    if action.attachments and #action.attachments > Validator.RULES.maxMailAttachmentCount then
        return false, "附件数量超限"
    end
    if action.attachments then
        for _, att in ipairs(action.attachments) do
            if type(att) == "table" and att.item_id then
                if _G.NpcHasItem and not NpcHasItem(npcId, att.item_id, att.count or 1) then
                    return false, "缺少附件物品: " .. att.item_id
                end
            end
        end
    end
    if action.COD_gold and action.COD_gold > 0 then
        if _G.GetNpcGold and (GetNpcGold(npcId) or 0) < action.COD_gold then
            return false, "COD 保证金不足"
        end
    end
    return true, ""
end

--- 副本进入资源校验
function Validator._ValidateDungeonEnterResources(npcId, action)
    if not action.dungeon_id then return false, "缺少副本ID" end
    if _G.GetPlayerLevel and GetPlayerLevel(npcId) then
        if GetPlayerLevel(npcId) < Validator.RULES.minLevelForDungeon then
            return false, "等级不足"
        end
    end
    if _G.GetPlayerDungeonKeyCount and GetPlayerDungeonKeyCount(npcId, action.dungeon_id) then
        if GetPlayerDungeonKeyCount(npcId, action.dungeon_id) < 1 then
            return false, "缺少副本钥匙"
        end
    end
    return true, ""
end

--- 成就领取资源校验
function Validator._ValidateAchievementResources(npcId, action)
    if not action.achievement_id then return false, "缺少成就ID" end
    if _G.HasAchievementUnlocked and not HasAchievementUnlocked(npcId, action.achievement_id) then
        return false, "成就未解锁"
    end
    if _G.HasClaimedAchievementReward and HasClaimedAchievementReward(npcId, action.achievement_id) then
        return false, "成就奖励已领取"
    end
    return true, ""
end

------------------------------------------------------------------------
-- 十、时序一致性校验
------------------------------------------------------------------------

--- 检测变更集合是否与硬锁事实或确认历史事件冲突
function Validator.ValidateTimeline(changes)
    if type(changes) ~= "table" then return true, "" end
    local errors = {}
    for _, c in ipairs(changes) do
        local ok, err = Validator._CheckTimelineSingle(c)
        if not ok then
            table.insert(errors, err)
        end
    end
    if #errors > 0 then
        return false, table.concat(errors, "; ")
    end
    return true, ""
end

--- 单条变更的时序一致性检查
function Validator._CheckTimelineSingle(c)
    if not c or type(c) ~= "table" then return true, "" end

    if c.target_type == "npc" and c.target then
        if Validator.IsHardLocked("confirmedDeaths", c.target) then
            if c.field == "state" and c.value == "dead" then
                return true, ""
            end
            if c.field == "hp" and type(c.value) == "number" and c.value <= 0 then
                return true, ""
            end
            if c.field == "location" or c.field == "state" or c.field == "level" or c.field == "gold" then
                return false, "时序冲突: " .. c.target .. " 已死亡，无法变更 " .. (c.field or "?")
            end
        end
    end

    if c.target_type == "world" and c.event == "npc_birth" and c.npc_id then
        if Validator.IsHardLocked("confirmedDeaths", c.npc_id) then
            return false, "时序冲突: 已死亡 NPC " .. c.npc_id .. " 不可再次出生"
        end
    end

    if c.target_type == "world" and c.event == "timeline_altered" and c.anchor_id then
        if Validator.IsHardLocked("timelineAnchors", c.anchor_id) then
            return false, "硬锁事实：时间线锚点不可修改"
        end
    end

    if c.target_type == "world" and c.event and c.event_id then
        if Validator.IsHardLocked("confirmedEvents", c.event_id) then
            return false, "时序冲突：事件 " .. c.event_id .. " 已被确认，不可修改"
        end
    end

    -- 周期性事件校验：节日不能在同一区域重叠
    if c.target_type == "region_event" and c.target and c.field == "event_type" then
        if _G.IsRegionEventActive and IsRegionEventActive(c.target) then
            return false, "时序冲突：该区域已有活跃事件"
        end
    end

    -- 季节校验：季节变更必须按春→夏→秋→冬顺序
    if c.target_type == "world" and c.field == "season" then
        local seasonOrder = { spring = 1, summer = 2, autumn = 3, winter = 4 }
        local currentSeason = (_G.GetCurrentSeason and GetCurrentSeason()) or "spring"
        local currentOrder = seasonOrder[currentSeason] or 1
        local newOrder = seasonOrder[c.value] or 1
        local expected = currentOrder % 4 + 1
        if newOrder ~= expected and newOrder ~= currentOrder then
            return false, "时序冲突：季节变更顺序非法（当前 " .. currentSeason .. "，期望下一季节为序号 " .. expected .. "）"
        end
    end

    -- 节日时序校验：节日开始日不能晚于结束日
    if c.target_type == "region_event" and c.field == "start_day" and c.value then
        if _G.GetRegionEventEndDay and GetRegionEventEndDay(c.target) then
            if c.value > GetRegionEventEndDay(c.target) then
                return false, "时序冲突：节日开始日不能晚于结束日"
            end
        end
    end

    -- 战争时序校验：结束日不能早于开始日
    if c.target_type == "faction_war" and c.field == "end_day" and c.value then
        if _G.GetWarStartDay and GetWarStartDay(c.target) then
            if c.value > 0 and c.value < GetWarStartDay(c.target) then
                return false, "时序冲突：战争结束日不能早于开始日"
            end
        end
    end

    -- 建筑时序校验：已完成的建筑不能再回退进度
    if c.target_type == "build" and c.field == "progress" then
        if _G.GetBuildProgress and GetBuildProgress(c.target) then
            local currentProgress = GetBuildProgress(c.target) or 0
            if currentProgress >= 100 and (c.value or 0) < 100 then
                return false, "时序冲突：已完成的建筑不能再回退进度"
            end
        end
    end

    -- 邮件时序校验：已读邮件不能变为未读
    if c.target_type == "mail" and c.field == "read" then
        if _G.IsMailRead and IsMailRead(c.target) and c.value == false then
            return false, "时序冲突：已读邮件不能变为未读"
        end
    end

    -- 拍卖时序校验：已结束的拍卖不能重新激活
    if c.target_type == "auction" and c.field == "status" then
        if _G.GetAuctionStatus then
            local status = GetAuctionStatus(c.target)
            if status ~= "active" and status ~= "cancelled" and c.value == "active" then
                return false, "时序冲突：已结束的拍卖不能重新激活"
            end
        end
    end

    return true, ""
end

------------------------------------------------------------------------
-- 十一、区域与地点合法性
------------------------------------------------------------------------

--- 校验区域数据基本合法性
function Validator.ValidateRegion(regionData)
    if not regionData then return false, "regionData 为空" end
    if not regionData.name then return false, "区域缺少名称" end
    if _G.RegionExists and RegionExists(regionData.name) then
        return false, "区域名已存在"
    end
    if regionData.layout and type(regionData.layout) ~= "table" then
        return false, "layout 格式非法"
    end
    if regionData.height and type(regionData.height) ~= "table" then
        return false, "height 格式非法"
    end
    if regionData.region_type and Validator.FIELD_RULES.region.region_type then
        local ok, err = ValidateFieldType("region_type", regionData.region_type, Validator.FIELD_RULES.region.region_type)
        if not ok then return false, err end
    end
    if regionData.population and type(regionData.population) == "number" and regionData.population < 0 then
        return false, "区域人口不能为负数"
    end
    if regionData.danger_level and type(regionData.danger_level) == "number" then
        if regionData.danger_level < 0 or regionData.danger_level > 100 then
            return false, "区域危险度越界"
        end
    end
    return true, ""
end

--- 地点合法性校验入口
function Validator.ValidateLocation(locName, fromLoc, layer)
    layer = layer or WORLD_GRAPH_SURFACE
    if not Validator.IsValidLocation(locName, layer) then
        return false, "地点不存在于世界图: " .. tostring(locName) .. "（图层: " .. layer .. "）"
    end
    if fromLoc and fromLoc ~= "" then
        if not Validator.IsValidLocation(fromLoc, layer) then
            return false, "起始地点不存在: " .. tostring(fromLoc) .. "（图层: " .. layer .. "）"
        end
        if not Validator.HasValidPath(fromLoc, locName, 20, layer) then
            return false, "从 " .. fromLoc .. " 到 " .. locName .. " 没有合法路径（图层: " .. layer .. "）"
        end
    end
    return true, ""
end

------------------------------------------------------------------------
-- 十二、计划校验
------------------------------------------------------------------------

--- 校验并过滤整个计划
function Validator.ValidatePlan(npcId, plan)
    if type(plan) ~= "table" then
        Validator.CreateAuditEntry("error", "plan_validation", npcId, "ValidatePlan", "", "rejected", "plan 不是表")
        return false, "plan 不是表"
    end

    local validPlan = {}
    for i, step in ipairs(plan) do
        local ok1, err1 = Validator.CheckPrecondition(npcId, step)
        local ok2, err2 = Validator.ValidateResources(npcId, step)
        local ok3, err3 = Validator._CheckTimelineSingle({ target_type = "npc", target = npcId, field = step.action, value = step })
        if ok1 and ok2 and ok3 then
            table.insert(validPlan, step)
        else
            local reason = err1 or ""
            if not ok2 then reason = reason .. " | " .. err2 end
            if not ok3 then reason = reason .. " | " .. err3 end
            EventLog.Append({
                type = "validation_rejected",
                actor = npcId,
                desc = "步骤 " .. i .. " 被拒绝: " .. reason,
                raw = step
            })
            Validator.CreateAuditEntry("warn", "plan_validation", npcId, "ValidatePlan", "step_" .. i, "rejected", reason, step)
        end
    end

    Validator.CreateAuditEntry("info", "plan_validation", npcId, "ValidatePlan", "", "passed", "", { validSteps = #validPlan })
    return true, validPlan
end

------------------------------------------------------------------------
-- 十三、冲突检测与消解（支持合并策略）
------------------------------------------------------------------------

--- 查找变更冲突（同一 target+field 的重复定义）
function Validator.FindConflicts(changes)
    local seen = {}
    local conflicts = {}
    for _, c in ipairs(changes) do
        local key = (c.target_type or "") .. ":" .. (c.target or "") .. ":" .. (c.field or c.event or "")
        if seen[key] then
            table.insert(conflicts, { first = seen[key], second = c })
        else
            seen[key] = c
        end
    end
    return conflicts
end

--- 变更条目的来源类型判定
local function ChangeSourcePriority(c)
    local src = (c.source or "")
    if src == "hard_lock" then return 5 end
    if src == "player" then return 4 end
    if src == "npc" then return 3 end
    if src == "system" then return 2 end
    return 1
end

--- 冲突消解：支持合并策略（不只是覆盖）
function Validator.ResolveConflicts(changes)
    if type(changes) ~= "table" then return {} end

    local groups = {}
    for _, c in ipairs(changes) do
        local key = (c.target_type or "") .. ":" .. (c.target or "") .. ":" .. (c.field or c.event or "")
        groups[key] = groups[key] or {}
        table.insert(groups[key], c)
    end

    local resolved = {}
    for key, group in pairs(groups) do
        if #group == 1 then
            local ok, err = Validator.ValidateSingleChange(group[1])
            if ok then table.insert(resolved, group[1]) end
        else
            -- 检测合并策略
            local mergeStrategy = group[1].merge_strategy or "priority"
            if mergeStrategy == "sum" and type(group[1].value) == "number" then
                local total = 0
                local maxPriority = -1
                local winner = nil
                for _, c in ipairs(group) do
                    total = total + (c.value or 0)
                    local p = ChangeSourcePriority(c)
                    if p > maxPriority then
                        maxPriority = p
                        winner = c
                    end
                end
                if winner then
                    local merged = {}
                    for k, v in pairs(winner) do merged[k] = v end
                    merged.value = total
                    merged.merged_from = #group
                    local ok, err = Validator.ValidateSingleChange(merged)
                    if ok then table.insert(resolved, merged) end
                end
            elseif mergeStrategy == "max" and type(group[1].value) == "number" then
                local maxVal = group[1].value
                local winner = group[1]
                for i = 2, #group do
                    if type(group[i].value) == "number" and group[i].value > maxVal then
                        maxVal = group[i].value
                        winner = group[i]
                    end
                end
                local ok, err = Validator.ValidateSingleChange(winner)
                if ok then table.insert(resolved, winner) end
            elseif mergeStrategy == "min" and type(group[1].value) == "number" then
                local minVal = group[1].value
                local winner = group[1]
                for i = 2, #group do
                    if type(group[i].value) == "number" and group[i].value < minVal then
                        minVal = group[i].value
                        winner = group[i]
                    end
                end
                local ok, err = Validator.ValidateSingleChange(winner)
                if ok then table.insert(resolved, winner) end
            elseif mergeStrategy == "concat" and type(group[1].value) == "string" then
                local parts = {}
                local winner = group[1]
                for _, c in ipairs(group) do
                    if type(c.value) == "string" then
                        table.insert(parts, c.value)
                    end
                end
                local merged = {}
                for k, v in pairs(winner) do merged[k] = v end
                merged.value = table.concat(parts, "; ")
                merged.merged_from = #group
                local ok, err = Validator.ValidateSingleChange(merged)
                if ok then table.insert(resolved, merged) end
            elseif mergeStrategy == "append_array" and type(group[1].value) == "table" then
                local combined = {}
                local winner = group[1]
                for _, c in ipairs(group) do
                    if type(c.value) == "table" then
                        for _, v in ipairs(c.value) do
                            table.insert(combined, v)
                        end
                    end
                end
                local merged = {}
                for k, v in pairs(winner) do merged[k] = v end
                merged.value = combined
                merged.merged_from = #group
                local ok, err = Validator.ValidateSingleChange(merged)
                if ok then table.insert(resolved, merged) end
            else
                -- 默认：按优先级和时间戳排序
                table.sort(group, function(a, b)
                    local pa = ChangeSourcePriority(a)
                    local pb = ChangeSourcePriority(b)
                    if pa ~= pb then return pa > pb end
                    local ta = a.t or 0
                    local tb = b.t or 0
                    return ta > tb
                end)
                for _, c in ipairs(group) do
                    local ok, err = Validator.ValidateSingleChange(c)
                    if ok then
                        table.insert(resolved, c)
                        break
                    end
                end
            end
        end
    end

    local timelineOk, timelineErr = Validator.ValidateTimeline(resolved)
    if not timelineOk then
        EventLog.Append({
            type = "validation_timeline_rejected",
            desc = timelineErr,
            raw = resolved
        })
        Validator.CreateAuditEntry("warn", "conflict_resolution", "system", "ResolveConflicts", "", "timeline_rejected", timelineErr)
        local filtered = {}
        for _, c in ipairs(resolved) do
            local ok, _ = Validator._CheckTimelineSingle(c)
            if ok then table.insert(filtered, c) end
        end
        resolved = filtered
    end

    Validator.CreateAuditEntry("info", "conflict_resolution", "system", "ResolveConflicts", "", "completed", "", { resolvedCount = #resolved })
    return resolved
end

--- 批量快速校验：用于高频 world tick，返回通过的数量和详情
function Validator.BatchValidate(npcId, changes)
    if type(changes) ~= "table" then return 0, {} end
    local passCount = 0
    local details = {}
    for i, c in ipairs(changes) do
        local ok1, err1 = Validator.ValidateSingleChange(c)
        local ok2, err2 = Validator._CheckTimelineSingle(c)
        local ok3, err3 = Validator.CheckSoftLockConflict(c)
        local ok = ok1 and ok2 and ok3
        local err = ""
        if not ok1 then err = err .. err1 .. "; " end
        if not ok2 then err = err .. err2 .. "; " end
        if not ok3 then err = err .. err3 .. "; " end
        details[i] = { ok = ok, err = err, change = c }
        if ok then passCount = passCount + 1 end
    end
    return passCount, details
end

------------------------------------------------------------------------
-- 十四、周期性事件与季节验证辅助
------------------------------------------------------------------------

--- 检查给定日期是否为指定节日
function Validator.IsFestivalDay(dayNumber, festivalName)
    if not dayNumber or not festivalName then return false end
    if _G.GetFestivalRange then
        local startDay, endDay = GetFestivalRange(festivalName)
        if startDay and endDay then
            return dayNumber >= startDay and dayNumber <= endDay
        end
    end
    -- 默认：春季节日 1-15，夏季节日 91-105，秋季节日 181-195，冬季节日 271-285
    local defaultRanges = {
        spring_festival = { 1, 15 },
        summer_festival = { 91, 105 },
        autumn_festival = { 181, 195 },
        winter_festival = { 271, 285 }
    }
    local range = defaultRanges[festivalName]
    if range then
        return dayNumber >= range[1] and dayNumber <= range[2]
    end
    return false
end

--- 根据日期推算季节
function Validator.DayToSeason(dayNumber)
    if not dayNumber or dayNumber < 1 then return SEASON_SPRING end
    local seasonIndex = ((dayNumber - 1) % 360) // 90
    local seasons = { SEASON_SPRING, SEASON_SUMMER, SEASON_AUTUMN, SEASON_WINTER }
    return seasons[seasonIndex + 1] or SEASON_SPRING
end

--- 校验节日事件合法性
function Validator.ValidateFestivalEvent(eventData)
    if not eventData then return false, "节日事件为空" end
    if not eventData.festival_name then return false, "节日事件缺少名称" end
    if not eventData.start_day or not eventData.end_day then
        return false, "节日事件缺少起止日期"
    end
    if eventData.start_day > eventData.end_day then
        return false, "节日开始日不能晚于结束日"
    end
    if eventData.end_day - eventData.start_day > 30 then
        return false, "节日持续时间不能超过30天"
    end
    return true, ""
end

--- 校验周期性任务触发条件
function Validator.ValidatePeriodicTrigger(triggerData, currentDay)
    if not triggerData then return false, "触发器为空" end
    if triggerData.interval_days and triggerData.interval_days > 0 then
        if currentDay % triggerData.interval_days ~= triggerData.offset_day then
            return false, "未到触发周期"
        end
    end
    if triggerData.season and triggerData.season ~= Validator.DayToSeason(currentDay) then
        return false, "当前季节不匹配触发条件"
    end
    if triggerData.festival and not Validator.IsFestivalDay(currentDay, triggerData.festival) then
        return false, "当前不是指定节日"
    end
    if triggerData.day_of_week and _G.GetDayOfWeek then
        if GetDayOfWeek(currentDay) ~= triggerData.day_of_week then
            return false, "当前星期不匹配触发条件"
        end
    end
    return true, ""
end

------------------------------------------------------------------------
-- 十五、额外辅助校验函数
------------------------------------------------------------------------

--- 快速校验玩家在线状态
function Validator.ValidatePlayerOnline(pid)
    if _G.PlayerOnline then return PlayerOnline(pid) end
    return true
end

--- 快速校验金币转移合法性
function Validator.ValidateGoldTransfer(fromId, toId, amount)
    if amount < 0 then return false, "转移金额不能为负数" end
    if amount > Validator.RULES.maxGoldTransfer then return false, "转移金额超过上限" end
    if _G.GetNpcGold then
        if NPCExists and NPCExists(fromId) then
            if (GetNpcGold(fromId) or 0) < amount then return false, "转出方金币不足" end
        end
    end
    return true, ""
end

--- 快速校验物品转移合法性
function Validator.ValidateItemTransfer(fromId, toId, itemId, count)
    count = count or 1
    if count < 0 then return false, "转移数量不能为负数" end
    if count > Validator.RULES.maxItemStack then return false, "转移数量超过堆叠上限" end
    if _G.NpcHasItem then
        if NPCExists and NPCExists(fromId) then
            if not NpcHasItem(fromId, itemId, count) then return false, "转出方不持有足够物品" end
        end
    end
    if _G.GetNpcBackpackFreeSlots then
        if NPCExists and NPCExists(toId) then
            if (GetNpcBackpackFreeSlots(toId) or 0) < 1 then return false, "接收方背包空间不足" end
        end
    end
    return true, ""
end

--- 快速校验 NPC 状态合法性
function Validator.ValidateNpcState(npcId, desiredState)
    local validStates = { idle = true, thinking = true, executing = true, waiting = true, combat = true, dead = true, patrol = true, sleep = true, fear = true, trading = true, leading = true, dying = true, romancing = true, mentoring = true, crafting = true, gathering = true, building = true, voting = true, mobilizing = true }
    if not validStates[desiredState] then return false, "非法 NPC 状态: " .. tostring(desiredState) end
    if desiredState ~= "dead" and desiredState ~= "dying" and Validator.IsHardLocked("confirmedDeaths", npcId) then
        return false, "已死亡 NPC 不能变更到非死亡状态"
    end
    return true, ""
end

--- 快速校验跨图层移动
function Validator.ValidateCrossLayerMove(fromLoc, toLoc, fromLayer, toLayer, npcId)
    if fromLayer == toLayer then
        return Validator.HasValidPath(fromLoc, toLoc, 20, fromLayer)
    end
    return Validator.IsValidCrossLayerPortal(fromLoc, toLoc, fromLayer, toLayer)
end

--- 快速校验公会操作权限
function Validator.ValidateGuildPermission(pid, guildId, requiredRank)
    requiredRank = requiredRank or 0
    if _G.GetPlayerGuild then
        if GetPlayerGuild(pid) ~= guildId then return false, "不属于该公会" end
    end
    if _G.GetPlayerGuildRank then
        if (GetPlayerGuildRank(pid) or 0) < requiredRank then
            return false, "公会权限不足，需要等级 " .. requiredRank
        end
    end
    return true, ""
end

--- 快速校验邮件可读性
function Validator.ValidateMailReadable(pid, mailId)
    if _G.GetMailRecipient then
        if GetMailRecipient(mailId) ~= pid then return false, "不是邮件收件人" end
    end
    if _G.MailExists and not MailExists(mailId) then
        return false, "邮件不存在"
    end
    return true, ""
end

--- 快速校验拍卖出价递增规则
function Validator.ValidateBidIncrement(currentBid, newBid)
    if newBid <= currentBid then return false, "出价必须高于当前价格" end
    local minIncrement = math.max(1, math.floor(currentBid * 0.05))
    if newBid - currentBid < minIncrement then
        return false, "出价增量不足，至少需要 " .. minIncrement
    end
    return true, ""
end

--- 快速校验副本队伍规模
function Validator.ValidateDungeonPartySize(partyId, dungeonId)
    if _G.GetPartyMemberCount then
        local count = GetPartyMemberCount(partyId) or 1
        if count < 1 then return false, "队伍不能为空" end
        if count > Validator.RULES.maxPartySize then
            return false, "队伍人数超过上限 " .. Validator.RULES.maxPartySize
        end
    end
    if _G.GetDungeonMinPartySize and GetDungeonMaxPartySize then
        local minSize = GetDungeonMinPartySize(dungeonId) or 1
        local maxSize = GetDungeonMaxPartySize(dungeonId) or Validator.RULES.maxPartySize
        local count = (_G.GetPartyMemberCount and GetPartyMemberCount(partyId)) or 1
        if count < minSize then return false, "队伍人数不足，需要至少 " .. minSize end
        if count > maxSize then return false, "队伍人数过多，最多 " .. maxSize end
    end
    return true, ""
end

--- 快速校验成就解锁条件
function Validator.ValidateAchievementUnlock(pid, achievementId)
    if _G.HasAchievementUnlocked and HasAchievementUnlocked(pid, achievementId) then
        return false, "成就已解锁"
    end
    if _G.GetAchievementProgress and _G.GetAchievementRequirement then
        local progress = GetAchievementProgress(pid, achievementId) or 0
        local req = GetAchievementRequirement(achievementId) or 1
        if progress < req then return false, "成就进度不足" end
    end
    return true, ""
end

--- 导出审计日志为简写格式
function Validator.ExportAudits(format)
    format = format or "json"
    local lines = {}
    for _, e in ipairs(Validator.auditLog) do
        if format == "json" then
            table.insert(lines, SimpleEncode(e) or "{}")
        else
            table.insert(lines, string.format("[%s] %s | %s | %s -> %s | %s",
                os and os.date and os.date("%Y-%m-%d %H:%M:%S", e.t) or tostring(e.t),
                e.level, e.category, e.actor, e.action, e.result))
        end
    end
    return lines
end

return Validator
