-- EventLog.lua
-- 天道引擎 · 事件溯源日志
-- 职责：记录世界推衍因果链，支持时间线查询、图分析与回放
-- 版本：生产级扩展版

EventLog = EventLog or {}

-- ============================================
-- 常量定义
-- ============================================
EventLog.maxMemoryEntries = 10000       -- 内存中最大保留条目数
EventLog.flushBatchSize = 2000          -- 每次刷盘条数
EventLog.DEFAULT_BRANCH = "main"        -- 默认主线分支
EventLog.entries = EventLog.entries or {}
EventLog.branchRegistry = EventLog.branchRegistry or {} -- branch_id -> {parent, createdAt, desc}

-- ============================================
-- 本地辅助函数
-- ============================================

--- clamp: 将数值限制在 [min, max] 区间内
-- @param val 数值
-- @param min 最小值
-- @param max 最大值
-- @return 限制后的数值
local function clamp(val, min, max)
    if val < min then return min end
    if val > max then return max end
    return val
end

--- table_contains: 检查表中是否包含指定值
-- @param tbl 表
-- @param val 值
-- @return boolean
local function table_contains(tbl, val)
    for _, v in ipairs(tbl) do
        if v == val then return true end
    end
    return false
end

--- table_deepcopy: 深拷贝简单表
-- @param orig 原始表
-- @return 拷贝后的表
local function table_deepcopy(orig)
    local copy
    if type(orig) == "table" then
        copy = {}
        for k, v in next, orig, nil do
            copy[table_deepcopy(k)] = table_deepcopy(v)
        end
        setmetatable(copy, table_deepcopy(getmetatable(orig)))
    else
        copy = orig
    end
    return copy
end

-- 辅助：UUID 生成
function GenerateUUID()
    local template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    return string.gsub(template, "[xy]", function(c)
        local v = (c == "x") and math.random(0, 15) or math.random(8, 11)
        return string.format("%x", v)
    end)
end

-- 辅助：获取世界时间（可由外部覆盖）
function GetWorldTime()
    if _G.WorldTime then return _G.WorldTime end
    return math.floor(os.time() / 60)  -- 默认按分钟
end

-- ============================================
-- 核心 API：事件追加与基础查询
-- ============================================

--- EventLog.Append: 将事件追加到日志
-- 增强版：支持 cause_id（原因事件 ID）、effect_ids（后续影响事件 ID 列表）、branch_id（分支时间线）。
-- @param entry 事件表，至少包含 desc，可选 type/actor/target/loc/cause_id/effect_ids/branch_id
-- @return void
function EventLog.Append(entry)
    entry = entry or {}
    entry.t = entry.t or GetWorldTime() or os.time()
    entry.id = entry.id or GenerateUUID()
    entry.branch_id = entry.branch_id or EventLog.DEFAULT_BRANCH
    entry.cause_id = entry.cause_id or ""
    entry.effect_ids = entry.effect_ids or {}
    entry.actors = entry.actors or {}       -- 支持多 actor 列表
    entry.data = entry.data or entry        -- 冗余保留兼容性

    table.insert(EventLog.entries, entry)

    -- 溢出保护：刷盘最老的一批
    if #EventLog.entries > EventLog.maxMemoryEntries then
        EventLog.FlushToDisk(EventLog.flushBatchSize)
    end

    -- 调试输出
    if TAO_DEBUG then
        local branchTag = ""
        if entry.branch_id ~= EventLog.DEFAULT_BRANCH then
            branchTag = " [" .. entry.branch_id .. "]"
        end
        local causeTag = ""
        if entry.cause_id and entry.cause_id ~= "" then
            causeTag = " ←" .. entry.cause_id
        end
        print(string.format("[EventLog]%s %s | %s | %s%s", branchTag, entry.type or "unknown",
            entry.actor or "-", entry.desc or "", causeTag))
    end
end

--- EventLog.Recent: 查询最近 N 条事件
-- 支持按 type 和 branch_id 过滤。
-- @param n 返回条数（默认 20）
-- @param filterType 可选：类型过滤字符串
-- @param branchId 可选：分支过滤字符串
-- @return entries 列表（按时间倒序）
function EventLog.Recent(n, filterType, branchId)
    n = n or 20
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local results = {}
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        local matchType = (not filterType) or (e.type == filterType)
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchType and matchBranch then
            table.insert(results, e)
            if #results >= n then break end
        end
    end
    return results
end

--- EventLog.ByActor: 查询与指定 actor 相关的最近 N 条事件
-- actor 匹配支持主 actor 字段以及 actors 列表。
-- @param actorId actor ID
-- @param n 返回条数（默认 20）
-- @param branchId 可选分支过滤
-- @return entries 列表
function EventLog.ByActor(actorId, n, branchId)
    n = n or 20
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local results = {}
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        local matchActor = (e.actor == actorId) or (e.target == actorId)
        if not matchActor and e.actors then
            for _, a in ipairs(e.actors) do
                if a == actorId then
                    matchActor = true
                    break
                end
            end
        end
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchActor and matchBranch then
            table.insert(results, e)
            if #results >= n then break end
        end
    end
    return results
end

--- EventLog.ByLocation: 查询指定地点的最近 N 条事件
-- @param loc 地点名称
-- @param n 返回条数（默认 20）
-- @param branchId 可选分支过滤
-- @return entries 列表
function EventLog.ByLocation(loc, n, branchId)
    n = n or 20
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local results = {}
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        local matchLoc = (e.loc == loc)
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchLoc and matchBranch then
            table.insert(results, e)
            if #results >= n then break end
        end
    end
    return results
end

-- ============================================
-- 高级查询：组合条件、时间范围、多 actor
-- ============================================

--- EventLog.ByTimeRange: 查询指定时间区间内的事件
-- 结果按时间升序排列。
-- @param tMin 起始时间（秒，包含）
-- @param tMax 结束时间（秒，包含）
-- @param branchId 可选分支过滤（默认主线，"all" 表示全部）
-- @return entries 列表
function EventLog.ByTimeRange(tMin, tMax, branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    tMin = tMin or 0
    tMax = tMax or GetWorldTime()
    local results = {}
    -- 内存匹配
    for _, e in ipairs(EventLog.entries) do
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch and e.t >= tMin and e.t <= tMax then
            table.insert(results, e)
        end
    end
    -- SQLite 加载补充（已排序）
    if sqlite3 then
        local diskResults = EventLog.LoadRange(tMin, tMax, branchId)
        for _, e in ipairs(diskResults) do
            table.insert(results, e)
        end
    end
    -- 去重（基于 id）
    local seen = {}
    local unique = {}
    for _, e in ipairs(results) do
        if not seen[e.id] then
            seen[e.id] = true
            table.insert(unique, e)
        end
    end
    table.sort(unique, function(a, b) return a.t < b.t end)
    return unique
end

--- EventLog.ByActors: 查询涉及多个 actor 中任意一个的事件
-- @param actorIds actor ID 列表
-- @param n 返回条数上限（默认 50）
-- @param branchId 可选分支过滤
-- @return entries 列表（时间倒序）
function EventLog.ByActors(actorIds, n, branchId)
    n = n or 50
    branchId = branchId or EventLog.DEFAULT_BRANCH
    if not actorIds or #actorIds == 0 then return {} end
    local actorSet = {}
    for _, id in ipairs(actorIds) do actorSet[id] = true end
    local results = {}
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch then
            local match = false
            if actorSet[e.actor] or actorSet[e.target] then match = true end
            if not match and e.actors then
                for _, a in ipairs(e.actors) do
                    if actorSet[a] then match = true; break end
                end
            end
            if match then
                table.insert(results, e)
                if #results >= n then break end
            end
        end
    end
    return results
end

--- EventLog.ByLocations: 查询多个地点中任意一个的事件
-- @param locs 地点名称列表
-- @param n 返回条数上限（默认 50）
-- @param branchId 可选分支过滤
-- @return entries 列表
function EventLog.ByLocations(locs, n, branchId)
    n = n or 50
    branchId = branchId or EventLog.DEFAULT_BRANCH
    if not locs or #locs == 0 then return {} end
    local locSet = {}
    for _, loc in ipairs(locs) do locSet[loc] = true end
    local results = {}
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch and locSet[e.loc] then
            table.insert(results, e)
            if #results >= n then break end
        end
    end
    return results
end

--- EventLog.CombinedQuery: 组合查询（地点 + actors + 时间范围 + 类型）
-- 所有条件之间为 AND 关系，但 actors 和 locs 内部为 OR。
-- @param params 查询参数表 {actors, locs, tMin, tMax, types, branchId, limit}
-- @return entries 列表（时间升序）
function EventLog.CombinedQuery(params)
    params = params or {}
    local limit = params.limit or 100
    local branchId = params.branchId or EventLog.DEFAULT_BRANCH
    local tMin = params.tMin or 0
    local tMax = params.tMax or GetWorldTime()

    local actorSet = {}
    if params.actors then
        for _, id in ipairs(params.actors) do actorSet[id] = true end
    end
    local locSet = {}
    if params.locs then
        for _, loc in ipairs(params.locs) do locSet[loc] = true end
    end
    local typeSet = {}
    if params.types then
        for _, tp in ipairs(params.types) do typeSet[tp] = true end
    end

    local candidates = EventLog.ByTimeRange(tMin, tMax, branchId)
    local results = {}
    for _, e in ipairs(candidates) do
        local match = true
        if params.actors and #params.actors > 0 then
            local actorMatch = actorSet[e.actor] or actorSet[e.target]
            if not actorMatch and e.actors then
                for _, a in ipairs(e.actors) do
                    if actorSet[a] then actorMatch = true; break end
                end
            end
            match = match and actorMatch
        end
        if params.locs and #params.locs > 0 then
            match = match and locSet[e.loc]
        end
        if params.types and #params.types > 0 then
            match = match and typeSet[e.type]
        end
        if match then
            table.insert(results, e)
            if #results >= limit then break end
        end
    end
    return results
end

--- EventLog.FindById: 按事件 ID 查找事件（先内存后磁盘）
-- @param eventId 事件 UUID
-- @param branchId 可选分支过滤
-- @return entry 或 nil
function EventLog.FindById(eventId, branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    -- 内存查找
    for i = #EventLog.entries, 1, -1 do
        local e = EventLog.entries[i]
        if e.id == eventId then
            local matchBranch = (branchId == "all") or (e.branch_id == branchId)
            if matchBranch then return e end
        end
    end
    -- 磁盘查找（需要 SQLite 支持 ID 查询）
    if not sqlite3 then return nil end
    local db = sqlite3.open("tao_world.db")
    if not db then return nil end
    local query = "SELECT * FROM event_log WHERE id = '" .. eventId .. "'"
    if branchId ~= "all" then
        query = query .. " AND branch_id = '" .. branchId .. "'"
    end
    local result = nil
    for row in db:nrows(query) do
        result = SimpleDecode(row.data) or row
        break
    end
    db:close()
    return result
end

-- ============================================
-- 因果链追踪
-- ============================================

--- EventLog.LinkEvents: 手动建立两个事件之间的因果关系
-- 在 causeEvent 的 effect_ids 中追加 effectEvent.id，并设置 effectEvent.cause_id。
-- @param causeId 原因事件 ID
-- @param effectId 结果事件 ID
-- @return boolean 是否成功
function EventLog.LinkEvents(causeId, effectId)
    local causeEntry = EventLog.FindById(causeId, "all")
    local effectEntry = EventLog.FindById(effectId, "all")
    if not causeEntry or not effectEntry then
        if TAO_DEBUG then print("[EventLog.LinkEvents] 未找到事件") end
        return false
    end
    -- 确保 effect_ids 为列表
    if not causeEntry.effect_ids then causeEntry.effect_ids = {} end
    if not table_contains(causeEntry.effect_ids, effectId) then
        table.insert(causeEntry.effect_ids, effectId)
    end
    effectEntry.cause_id = causeId
    return true
end

--- EventLog.TraceCauses: 回溯某事件的因果链（向上追踪）
-- @param eventId 起始事件 ID
-- @param depth 最大回溯深度（默认 5）
-- @return chain 列表，从最近原因到最原始原因
function EventLog.TraceCauses(eventId, depth)
    depth = depth or 5
    local chain = {}
    local currentId = eventId
    local visited = {}
    for i = 1, depth do
        if visited[currentId] then break end
        visited[currentId] = true
        local entry = EventLog.FindById(currentId, "all")
        if not entry then break end
        if entry.cause_id and entry.cause_id ~= "" then
            table.insert(chain, {eventId = entry.cause_id, relation = "cause"})
            currentId = entry.cause_id
        else
            break
        end
    end
    return chain
end

--- EventLog.TraceEffects: 追踪某事件的后续影响链（向下追踪）
-- @param eventId 起始事件 ID
-- @param depth 最大追踪深度（默认 5）
-- @return chain 列表，从直接结果到间接结果
function EventLog.TraceEffects(eventId, depth)
    depth = depth or 5
    local chain = {}
    local queue = {{id = eventId, level = 0}}
    local visited = {}
    while #queue > 0 do
        local node = table.remove(queue, 1)
        if node.level >= depth then break end
        if visited[node.id] then break end
        visited[node.id] = true
        local entry = EventLog.FindById(node.id, "all")
        if entry and entry.effect_ids then
            for _, effectId in ipairs(entry.effect_ids) do
                if not visited[effectId] then
                    table.insert(chain, {eventId = effectId, from = node.id, level = node.level + 1})
                    table.insert(queue, {id = effectId, level = node.level + 1})
                end
            end
        end
    end
    return chain
end

--- EventLog.GetCauseTree: 获取事件的完整因果树（双向）
-- @param eventId 起始事件 ID
-- @param depth 深度（默认 3）
-- @return tree 表 {causes = {}, effects = {}, center = entry}
function EventLog.GetCauseTree(eventId, depth)
    depth = depth or 3
    local center = EventLog.FindById(eventId, "all")
    if not center then return nil end
    return {
        center = center,
        causes = EventLog.TraceCauses(eventId, depth),
        effects = EventLog.TraceEffects(eventId, depth)
    }
end

-- ============================================
-- 时间线分支
-- ============================================

--- EventLog.CreateBranch: 创建新的时间线分支
-- @param branchId 分支 ID（自定义字符串）
-- @param parentBranch 父分支 ID（默认 main）
-- @param desc 分支描述
-- @return boolean 是否创建成功
function EventLog.CreateBranch(branchId, parentBranch, desc)
    if not branchId or branchId == "" then return false end
    parentBranch = parentBranch or EventLog.DEFAULT_BRANCH
    if not EventLog.branchRegistry[branchId] then
        EventLog.branchRegistry[branchId] = {
            parent = parentBranch,
            createdAt = GetWorldTime(),
            desc = desc or ""
        }
        return true
    end
    return false
end

--- EventLog.GetBranches: 获取所有已注册的分支信息
-- @return branches 表列表
function EventLog.GetBranches()
    local list = {}
    for bid, info in pairs(EventLog.branchRegistry) do
        table.insert(list, {
            branchId = bid,
            parent = info.parent,
            createdAt = info.createdAt,
            desc = info.desc
        })
    end
    return list
end

--- EventLog.MergeBranch: 将分支中的事件合并到目标分支
-- 常用于 alternate timeline 收敛（如"如果玩家没杀杰克"假设被证实）。
-- @param sourceBranch 源分支 ID
-- @param targetBranch 目标分支 ID（默认 main）
-- @return 合并事件数
function EventLog.MergeBranch(sourceBranch, targetBranch)
    targetBranch = targetBranch or EventLog.DEFAULT_BRANCH
    local count = 0
    for _, e in ipairs(EventLog.entries) do
        if e.branch_id == sourceBranch then
            e.branch_id = targetBranch
            count = count + 1
        end
    end
    if sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local stmt = db:prepare("UPDATE event_log SET branch_id = ? WHERE branch_id = ?")
            stmt:bind_values(targetBranch, sourceBranch)
            stmt:step()
            stmt:finalize()
            db:close()
        end
    end
    return count
end

--- EventLog.PruneBranch: 删除某分支下的所有事件
-- @param branchId 分支 ID
-- @param fromDisk 是否同时清理 SQLite（默认 true）
-- @return 删除条数
function EventLog.PruneBranch(branchId, fromDisk)
    fromDisk = (fromDisk == nil) and true or fromDisk
    local removed = 0
    local newEntries = {}
    for _, e in ipairs(EventLog.entries) do
        if e.branch_id == branchId then
            removed = removed + 1
        else
            table.insert(newEntries, e)
        end
    end
    EventLog.entries = newEntries
    if fromDisk and sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local stmt = db:prepare("DELETE FROM event_log WHERE branch_id = ?")
            stmt:bind_values(branchId)
            stmt:step()
            stmt:finalize()
            db:close()
        end
    end
    EventLog.branchRegistry[branchId] = nil
    return removed
end

-- ============================================
-- 图查询
-- ============================================

--- EventLog.QueryGraph: 返回以某 actor 为中心的关联事件子图
-- 包含与该 actor 相关的所有事件，以及这些事件中涉及的其他 actor 作为节点。
-- @param centerActor 中心 actor ID
-- @param depth 关联深度（默认 1，即仅直接相关事件；2 则包含共同参与者的事件）
-- @param branchId 可选分支过滤
-- @return graph 表 {nodes = {}, edges = {}}
function EventLog.QueryGraph(centerActor, depth, branchId)
    depth = depth or 1
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local graph = {nodes = {}, edges = {}}
    local visitedActors = {}
    local visitedEvents = {}
    local currentActors = {centerActor}

    for d = 1, depth do
        local nextActors = {}
        local actorSet = {}
        for _, a in ipairs(currentActors) do actorSet[a] = true end
        -- 查询内存
        for _, e in ipairs(EventLog.entries) do
            local matchBranch = (branchId == "all") or (e.branch_id == branchId)
            if matchBranch and not visitedEvents[e.id] then
                local related = false
                if actorSet[e.actor] or actorSet[e.target] then related = true end
                if not related and e.actors then
                    for _, a in ipairs(e.actors) do
                        if actorSet[a] then related = true; break end
                    end
                end
                if related then
                    visitedEvents[e.id] = e
                    -- 收集参与者作为节点
                    local participants = {}
                    if e.actor then table.insert(participants, e.actor) end
                    if e.target then table.insert(participants, e.target) end
                    if e.actors then
                        for _, a in ipairs(e.actors) do
                            if not table_contains(participants, a) then
                                table.insert(participants, a)
                            end
                        end
                    end
                    for _, p in ipairs(participants) do
                        if not visitedActors[p] then
                            visitedActors[p] = true
                            table.insert(graph.nodes, {id = p, type = "actor"})
                            if d < depth then
                                table.insert(nextActors, p)
                            end
                        end
                    end
                    -- 事件节点
                    table.insert(graph.nodes, {id = e.id, type = "event", data = e})
                    -- 边：actor -> event
                    for _, p in ipairs(participants) do
                        table.insert(graph.edges, {from = p, to = e.id, type = "participate"})
                    end
                    -- 因果边
                    if e.cause_id and e.cause_id ~= "" then
                        if visitedEvents[e.cause_id] then
                            table.insert(graph.edges, {from = e.cause_id, to = e.id, type = "cause"})
                        end
                    end
                    for _, eff in ipairs(e.effect_ids or {}) do
                        if visitedEvents[eff] then
                            table.insert(graph.edges, {from = e.id, to = eff, type = "effect"})
                        end
                    end
                end
            end
        end
        currentActors = nextActors
    end
    return graph
end

--- EventLog.BuildActorGraph: 构建 actor 之间的关系网络（基于共同事件）
-- @param actorId 起始 actor
-- @param depth 深度（默认 1）
-- @param branchId 可选分支过滤
-- @return network 表 {actors = {}, links = {}}
function EventLog.BuildActorGraph(actorId, depth, branchId)
    depth = depth or 1
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local network = {actors = {}, links = {}}
    local visited = {}
    local queue = {{id = actorId, level = 0}}
    local linkMap = {}

    while #queue > 0 do
        local node = table.remove(queue, 1)
        if visited[node.id] then goto continue end
        visited[node.id] = true
        table.insert(network.actors, {id = node.id, level = node.level})

        if node.level >= depth then goto continue end
        local events = EventLog.ByActor(node.id, 200, branchId)
        for _, e in ipairs(events) do
            local others = {}
            if e.actor and e.actor ~= node.id then table.insert(others, e.actor) end
            if e.target and e.target ~= node.id then table.insert(others, e.target) end
            if e.actors then
                for _, a in ipairs(e.actors) do
                    if a ~= node.id and not table_contains(others, a) then
                        table.insert(others, a)
                    end
                end
            end
            for _, other in ipairs(others) do
                local linkKey = node.id < other and (node.id .. "-" .. other) or (other .. "-" .. node.id)
                if not linkMap[linkKey] then
                    linkMap[linkKey] = {source = node.id, target = other, count = 0}
                    table.insert(network.links, linkMap[linkKey])
                end
                linkMap[linkKey].count = linkMap[linkKey].count + 1
                if not visited[other] then
                    table.insert(queue, {id = other, level = node.level + 1})
                end
            end
        end
        ::continue::
    end
    return network
end

-- ============================================
-- 统计摘要
-- ============================================

--- EventLog.GetWorldSummary: 返回指定天数内的世界活跃度统计
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return summary 统计表
function EventLog.GetWorldSummary(days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local summary = {
        periodDays = days,
        totalEvents = 0,
        eventTypes = {},
        topActors = {},
        topLocations = {},
        hourlyDistribution = {},
        branchId = branchId
    }

    local processEntry = function(e)
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch and e.t >= cutoff then
            summary.totalEvents = summary.totalEvents + 1

            -- 事件类型统计
            local et = e.type or "unknown"
            summary.eventTypes[et] = (summary.eventTypes[et] or 0) + 1

            -- 活跃 actor 统计
            local actorsToCount = {}
            if e.actor then table.insert(actorsToCount, e.actor) end
            if e.target then table.insert(actorsToCount, e.target) end
            if e.actors then
                for _, a in ipairs(e.actors) do
                    if not table_contains(actorsToCount, a) then
                        table.insert(actorsToCount, a)
                    end
                end
            end
            for _, a in ipairs(actorsToCount) do
                summary.topActors[a] = (summary.topActors[a] or 0) + 1
            end

            -- 地点统计
            if e.loc then
                summary.topLocations[e.loc] = (summary.topLocations[e.loc] or 0) + 1
            end

            -- 按小时分布（如果 t 是秒级时间戳）
            local hour = math.floor((e.t % 86400) / 3600)
            summary.hourlyDistribution[hour] = (summary.hourlyDistribution[hour] or 0) + 1
        end
    end

    -- 内存统计
    for _, e in ipairs(EventLog.entries) do
        processEntry(e)
    end
    -- 磁盘统计（仅当数据量大且需要精确时使用，此处简化为直接查表）
    if sqlite3 and summary.totalEvents < 1000 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local condition = "t >= " .. cutoff
            if branchId ~= "all" then
                condition = condition .. " AND branch_id = '" .. branchId .. "'"
            end
            for row in db:nrows("SELECT data FROM event_log WHERE " .. condition) do
                local decoded = SimpleDecode(row.data)
                if decoded then processEntry(decoded) end
            end
            db:close()
        end
    end

    return summary
end

--- EventLog.GetActorSummary: 返回指定 actor 在某段时间内的活跃摘要
-- @param actorId actor ID
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return summary 统计表
function EventLog.GetActorSummary(actorId, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByActor(actorId, 1000, branchId)
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local summary = {
        actorId = actorId,
        periodDays = days,
        totalEvents = 0,
        asActor = 0,
        asTarget = 0,
        eventTypes = {},
        topLocations = {},
        topTargets = {},
        partners = {}
    }
    for _, e in ipairs(entries) do
        if e.t >= cutoff then
            summary.totalEvents = summary.totalEvents + 1
            if e.actor == actorId then summary.asActor = summary.asActor + 1 end
            if e.target == actorId then summary.asTarget = summary.asTarget + 1 end

            local et = e.type or "unknown"
            summary.eventTypes[et] = (summary.eventTypes[et] or 0) + 1

            if e.loc then
                summary.topLocations[e.loc] = (summary.topLocations[e.loc] or 0) + 1
            end

            if e.target and e.target ~= actorId then
                summary.topTargets[e.target] = (summary.topTargets[e.target] or 0) + 1
            end
            if e.actor and e.actor ~= actorId then
                summary.partners[e.actor] = (summary.partners[e.actor] or 0) + 1
            end
            if e.actors then
                for _, a in ipairs(e.actors) do
                    if a ~= actorId then
                        summary.partners[a] = (summary.partners[a] or 0) + 1
                    end
                end
            end
        end
    end
    return summary
end

--- EventLog.GetLocationSummary: 返回指定地点在某段时间内的事件摘要
-- @param loc 地点名称
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return summary 统计表
function EventLog.GetLocationSummary(loc, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByLocation(loc, 1000, branchId)
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local summary = {
        loc = loc,
        periodDays = days,
        totalEvents = 0,
        eventTypes = {},
        topActors = {},
        hourlyDistribution = {}
    }
    for _, e in ipairs(entries) do
        if e.t >= cutoff then
            summary.totalEvents = summary.totalEvents + 1
            local et = e.type or "unknown"
            summary.eventTypes[et] = (summary.eventTypes[et] or 0) + 1
            if e.actor then
                summary.topActors[e.actor] = (summary.topActors[e.actor] or 0) + 1
            end
            local hour = math.floor((e.t % 86400) / 3600)
            summary.hourlyDistribution[hour] = (summary.hourlyDistribution[hour] or 0) + 1
        end
    end
    return summary
end

-- ============================================
-- Prompt 组装
-- ============================================

--- EventLog.ToPromptText: 生成世界时间线摘要文本（供 Prompt 使用）
-- 增强版：支持按分支过滤、显示因果标记、地点标记。
-- @param n 返回最近条数（默认 10）
-- @param branchId 可选分支过滤（默认主线）
-- @return 字符串
function EventLog.ToPromptText(n, branchId)
    n = n or 10
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.Recent(n, nil, branchId)
    if #entries == 0 then return "（暂无近期大事）" end

    local lines = {"【最近事件】"}
    if branchId ~= EventLog.DEFAULT_BRANCH then
        lines[1] = lines[1] .. " [分支:" .. branchId .. "]"
    end
    for _, e in ipairs(entries) do
        local actorStr = e.actor or "世界"
        if e.actors and #e.actors > 1 then
            actorStr = table.concat(e.actors, ",")
        end
        local line = string.format("[T%d] %s: %s", e.t, actorStr, e.desc or (e.type or "event"))
        if e.loc then
            line = line .. " @" .. e.loc
        end
        if e.cause_id and e.cause_id ~= "" then
            line = line .. " ←因" .. string.sub(e.cause_id, 1, 8)
        end
        table.insert(lines, line)
    end
    return table.concat(lines, "\n")
end

--- EventLog.ToPromptTextWithCauses: 生成带因果链的 Prompt 文本
-- @param n 最近事件条数（默认 5）
-- @param causeDepth 因果回溯深度（默认 2）
-- @param branchId 可选分支过滤
-- @return 字符串
function EventLog.ToPromptTextWithCauses(n, causeDepth, branchId)
    n = n or 5
    causeDepth = causeDepth or 2
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.Recent(n, nil, branchId)
    if #entries == 0 then return "（暂无近期大事）" end
    local lines = {"【最近事件与因果链】"}
    for _, e in ipairs(entries) do
        local line = string.format("[T%d] %s: %s", e.t, e.actor or "世界", e.desc or (e.type or "event"))
        table.insert(lines, line)
        local causes = EventLog.TraceCauses(e.id, causeDepth)
        if #causes > 0 then
            local causeParts = {}
            for _, c in ipairs(causes) do
                local ce = EventLog.FindById(c.eventId, "all")
                if ce then
                    table.insert(causeParts, string.sub(ce.id, 1, 8) .. ":" .. (ce.desc or ""))
                end
            end
            table.insert(lines, "  ↳ 原因链: " .. table.concat(causeParts, " → "))
        end
    end
    return table.concat(lines, "\n")
end

-- ============================================
-- 持久化与数据管理
-- ============================================

--- EventLog.FlushToDisk: 将内存中最老 N 条刷入 SQLite
-- 使用 SimpleEncode 保存完整事件 JSON，含 cause_id/effect_ids/branch_id。
-- @param n 刷盘条数（默认 flushBatchSize）
-- @return 实际刷盘条数
function EventLog.FlushToDisk(n)
    n = n or EventLog.flushBatchSize
    if not sqlite3 then
        if TAO_DEBUG then print("[EventLog.FlushToDisk] sqlite3 不可用") end
        return 0
    end
    if #EventLog.entries == 0 then return 0 end

    local db = sqlite3.open("tao_world.db")
    if not db then return 0 end

    db:exec([[
        CREATE TABLE IF NOT EXISTS event_log (
            id TEXT PRIMARY KEY,
            t INTEGER,
            type TEXT,
            actor TEXT,
            target TEXT,
            loc TEXT,
            branch_id TEXT,
            cause_id TEXT,
            data TEXT
        );
        CREATE INDEX IF NOT EXISTS idx_event_t ON event_log(t);
        CREATE INDEX IF NOT EXISTS idx_event_actor ON event_log(actor);
        CREATE INDEX IF NOT EXISTS idx_event_type ON event_log(type);
        CREATE INDEX IF NOT EXISTS idx_event_branch ON event_log(branch_id);
        CREATE INDEX IF NOT EXISTS idx_event_cause ON event_log(cause_id);
    ]])

    local stmt = db:prepare("INSERT OR REPLACE INTO event_log (id, t, type, actor, target, loc, branch_id, cause_id, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
    local flushed = 0
    for i = 1, math.min(n, #EventLog.entries) do
        local e = EventLog.entries[i]
        local jsonData = SimpleEncode(e) or "{}"
        stmt:bind_values(e.id, e.t, e.type or "", e.actor or "", e.target or "", e.loc or "",
            e.branch_id or EventLog.DEFAULT_BRANCH, e.cause_id or "", jsonData)
        stmt:step()
        stmt:reset()
        flushed = flushed + 1
    end
    stmt:finalize()
    db:close()

    -- 从内存移除
    for i = 1, flushed do
        table.remove(EventLog.entries, 1)
    end
    return flushed
end

--- EventLog.LoadRange: 从 SQLite 加载某个时间区间的历史事件
-- 反序列化完整 JSON 数据，恢复所有扩展字段。
-- @param tMin 起始时间
-- @param tMax 结束时间
-- @param branchId 可选分支过滤（默认 all）
-- @return entries 列表（按时间升序）
function EventLog.LoadRange(tMin, tMax, branchId)
    if not sqlite3 then return {} end
    local db = sqlite3.open("tao_world.db")
    if not db then return {} end

    local query = "SELECT * FROM event_log WHERE t >= " .. tMin .. " AND t <= " .. tMax
    if branchId and branchId ~= "all" then
        query = query .. " AND branch_id = '" .. branchId .. "'"
    end
    query = query .. " ORDER BY t ASC"

    local results = {}
    for row in db:nrows(query) do
        local decoded = SimpleDecode(row.data)
        if type(decoded) == "table" then
            -- 确保扩展字段存在
            decoded.branch_id = decoded.branch_id or row.branch_id or EventLog.DEFAULT_BRANCH
            decoded.cause_id = decoded.cause_id or row.cause_id or ""
            decoded.effect_ids = decoded.effect_ids or {}
            table.insert(results, decoded)
        else
            -- 降级为原始行数据
            table.insert(results, {
                id = row.id,
                t = row.t,
                type = row.type,
                actor = row.actor,
                target = row.target,
                loc = row.loc,
                branch_id = row.branch_id or EventLog.DEFAULT_BRANCH,
                cause_id = row.cause_id or "",
                effect_ids = {},
                desc = row.data
            })
        end
    end
    db:close()
    return results
end

--- EventLog.ArchiveOld: 将超过 N 天的旧事件归档到单独表并清理
-- @param days 天数阈值（默认 30）
-- @param branchId 可选分支过滤
-- @return 归档条数
function EventLog.ArchiveOld(days, branchId)
    days = days or 30
    branchId = branchId or EventLog.DEFAULT_BRANCH
    if not sqlite3 then return 0 end
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local db = sqlite3.open("tao_world.db")
    if not db then return 0 end

    db:exec([[
        CREATE TABLE IF NOT EXISTS event_log_archive (
            id TEXT PRIMARY KEY,
            t INTEGER,
            type TEXT,
            actor TEXT,
            target TEXT,
            loc TEXT,
            branch_id TEXT,
            cause_id TEXT,
            data TEXT
        );
    ]])

    -- 将符合条件的事件从 event_log 移入 archive
    local condition = "t < " .. cutoff
    if branchId ~= "all" then
        condition = condition .. " AND branch_id = '" .. branchId .. "'"
    end
    local count = 0
    for row in db:nrows("SELECT * FROM event_log WHERE " .. condition) do
        local ins = db:prepare("INSERT OR REPLACE INTO event_log_archive (id, t, type, actor, target, loc, branch_id, cause_id, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
        ins:bind_values(row.id, row.t, row.type, row.actor, row.target, row.loc,
            row.branch_id or EventLog.DEFAULT_BRANCH, row.cause_id or "", row.data or "{}")
        ins:step()
        ins:finalize()
        count = count + 1
    end

    -- 删除原表记录
    db:exec("DELETE FROM event_log WHERE " .. condition)
    db:close()

    -- 同时清理内存中的老数据
    local kept = {}
    for _, e in ipairs(EventLog.entries) do
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch and e.t < cutoff then
            -- 跳过（已视为过期）
        else
            table.insert(kept, e)
        end
    end
    local removedFromMem = #EventLog.entries - #kept
    EventLog.entries = kept
    return count + removedFromMem
end

--- EventLog.PurgeOld: 永久删除超过 N 天的所有事件（包括磁盘和内存）
-- @param days 天数阈值
-- @param branchId 可选分支过滤
-- @return 删除条数
function EventLog.PurgeOld(days, branchId)
    days = days or 90
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400

    -- 清理内存
    local kept = {}
    for _, e in ipairs(EventLog.entries) do
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch and e.t < cutoff then
            -- 丢弃
        else
            table.insert(kept, e)
        end
    end
    local removed = #EventLog.entries - #kept
    EventLog.entries = kept

    -- 清理 SQLite
    if sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local condition = "t < " .. cutoff
            if branchId ~= "all" then
                condition = condition .. " AND branch_id = '" .. branchId .. "'"
            end
            db:exec("DELETE FROM event_log WHERE " .. condition)
            db:exec("DELETE FROM event_log_archive WHERE " .. condition)
            db:close()
        end
    end
    return removed
end

--- EventLog.CountEntries: 统计内存和磁盘中的总事件数
-- @param branchId 可选分支过滤
-- @return totalCount 整数
function EventLog.CountEntries(branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local memCount = 0
    for _, e in ipairs(EventLog.entries) do
        local matchBranch = (branchId == "all") or (e.branch_id == branchId)
        if matchBranch then memCount = memCount + 1 end
    end
    local diskCount = 0
    if sqlite3 then
        local db = sqlite3.open("tao_world.db")
        if db then
            local query = "SELECT COUNT(*) AS cnt FROM event_log"
            if branchId ~= "all" then
                query = query .. " WHERE branch_id = '" .. branchId .. "'"
            end
            for row in db:nrows(query) do
                diskCount = row.cnt or 0
            end
            db:close()
        end
    end
    return memCount + diskCount
end

-- ============================================
-- 运维工具
-- ============================================

--- EventLog.Dump: 将事件日志导出为纯文本（用于调试）
-- @param n 导出条数（默认 100）
-- @param branchId 可选分支过滤
-- @return 字符串
function EventLog.Dump(n, branchId)
    n = n or 100
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.Recent(n, nil, branchId)
    local lines = {"===== EventLog Dump ====="}
    for _, e in ipairs(entries) do
        local branchTag = ""
        if e.branch_id ~= EventLog.DEFAULT_BRANCH then
            branchTag = " [" .. e.branch_id .. "]"
        end
        local causeTag = ""
        if e.cause_id and e.cause_id ~= "" then
            causeTag = " ←" .. string.sub(e.cause_id, 1, 8)
        end
        table.insert(lines, string.format("%s | T%d | %s | %s | %s%s%s",
            e.id or "?", e.t, e.type or "-", e.actor or "-", e.desc or "", branchTag, causeTag))
    end
    return table.concat(lines, "\n")
end

--- EventLog.RebuildLinksFromDisk: 从磁盘数据重建内存事件的因果链接
-- 在服务器重启后恢复内存与磁盘事件的完整 cause_id/effect_ids 关系。
-- @return 修复链接数
function EventLog.RebuildLinksFromDisk()
    if not sqlite3 then return 0 end
    local db = sqlite3.open("tao_world.db")
    if not db then return 0 end
    local fixed = 0
    for row in db:nrows("SELECT id, cause_id FROM event_log WHERE cause_id != ''") do
        for _, e in ipairs(EventLog.entries) do
            if e.id == row.id then
                e.cause_id = row.cause_id
                fixed = fixed + 1
                break
            end
        end
    end
    db:close()
    return fixed
end

-- ============================================
-- 高级分析模块（从 AgentCore 移入并扩展）
-- ============================================

--- EventLog.ClusterEvents: 基于类型与地点对事件进行聚类
-- @param timeWindow 时间窗口（秒，默认 3600）
-- @param branchId 可选分支过滤
-- @return clusters 表 {clusterId = {centerLoc, centerTime, events={}, typeCounts={}}}
function EventLog.ClusterEvents(timeWindow, branchId)
    timeWindow = timeWindow or 3600
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByTimeRange(GetWorldTime() - timeWindow * 2, GetWorldTime(), branchId)
    local clusters = {}
    local clusterIdCounter = 1

    for _, e in ipairs(entries) do
        local assigned = false
        for cid, c in pairs(clusters) do
            local timeDist = math.abs((e.t or 0) - c.centerTime)
            local locMatch = (e.loc == c.centerLoc) or (not e.loc) or (not c.centerLoc)
            if timeDist <= timeWindow and locMatch then
                table.insert(c.events, e)
                c.typeCounts[e.type or "unknown"] = (c.typeCounts[e.type or "unknown"] or 0) + 1
                c.centerTime = math.floor((c.centerTime * #c.events + (e.t or 0)) / (#c.events + 1))
                assigned = true
                break
            end
        end
        if not assigned then
            local cid = "c" .. clusterIdCounter
            clusterIdCounter = clusterIdCounter + 1
            clusters[cid] = {
                centerLoc = e.loc,
                centerTime = e.t or GetWorldTime(),
                events = { e },
                typeCounts = { [e.type or "unknown"] = 1 }
            }
        end
    end
    return clusters
end

--- EventLog.GetHotClusters: 获取最近最活跃的事件聚类（Top N）
-- @param n 返回数量（默认 5）
-- @param timeWindow 时间窗口（秒，默认 3600）
-- @param branchId 可选分支过滤
-- @return clusterList 列表（按事件数量降序）
function EventLog.GetHotClusters(n, timeWindow, branchId)
    n = n or 5
    local clusters = EventLog.ClusterEvents(timeWindow, branchId)
    local list = {}
    for cid, c in pairs(clusters) do
        table.insert(list, { clusterId = cid, loc = c.centerLoc, time = c.centerTime, count = #c.events, typeCounts = c.typeCounts })
    end
    table.sort(list, function(a, b) return a.count > b.count end)
    local result = {}
    for i = 1, math.min(n, #list) do
        result[i] = list[i]
    end
    return result
end

--- EventLog.MineBehaviorPatterns: 基于 actor 事件序列挖掘行为模式（简单 N-gram）
-- @param actorId actor ID
-- @param nGramSize N-gram 长度（默认 3）
-- @param branchId 可选分支过滤
-- @return patterns 表 {patternString = count}
function EventLog.MineBehaviorPatterns(actorId, nGramSize, branchId)
    nGramSize = nGramSize or 3
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByActor(actorId, 500, branchId)
    -- 按时间升序排列
    table.sort(entries, function(a, b) return a.t < b.t end)
    local patterns = {}
    if #entries < nGramSize then return patterns end
    for i = 1, #entries - nGramSize + 1 do
        local seq = {}
        for j = 0, nGramSize - 1 do
            table.insert(seq, entries[i + j].type or "unknown")
        end
        local key = table.concat(seq, "-")
        patterns[key] = (patterns[key] or 0) + 1
    end
    return patterns
end

--- EventLog.GetTopBehaviorPatterns: 获取 actor 最常见的行为模式
-- @param actorId actor ID
-- @param topN 返回前 N 条（默认 5）
-- @param nGramSize N-gram 长度（默认 3）
-- @param branchId 可选分支过滤
-- @return patternList 列表
function EventLog.GetTopBehaviorPatterns(actorId, topN, nGramSize, branchId)
    topN = topN or 5
    local patterns = EventLog.MineBehaviorPatterns(actorId, nGramSize, branchId)
    local list = {}
    for k, v in pairs(patterns) do
        table.insert(list, { pattern = k, count = v })
    end
    table.sort(list, function(a, b) return a.count > b.count end)
    local result = {}
    for i = 1, math.min(topN, #list) do
        result[i] = list[i]
    end
    return result
end

--- EventLog.AnalyzeFactionNetwork: 派系社会网络分析
-- @param branchId 可选分支过滤
-- @return network 表 {nodes = {}, edges = {}, factionStats = {}}
function EventLog.AnalyzeFactionNetwork(branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local network = { nodes = {}, edges = {}, factionStats = {} }
    local entries = EventLog.Recent(1000, nil, branchId)
    local actorFactions = {}
    local edgeMap = {}

    -- 需要 AgentCore.factions 数据，这里通过事件推断近似派系关系
    for _, e in ipairs(entries) do
        if e.type:find("faction") or e.type:find("political") then
            local factionId = e.data and e.data.factionId or "unknown"
            local actor = e.actor
            if actor then
                actorFactions[actor] = actorFactions[actor] or {}
                actorFactions[actor][factionId] = (actorFactions[actor][factionId] or 0) + 1
                network.factionStats[factionId] = network.factionStats[factionId] or { events = 0, actors = {} }
                network.factionStats[factionId].events = network.factionStats[factionId].events + 1
                network.factionStats[factionId].actors[actor] = true
            end
            if e.target then
                local key = actor .. "->" .. e.target
                edgeMap[key] = edgeMap[key] or { source = actor, target = e.target, count = 0, types = {} }
                edgeMap[key].count = edgeMap[key].count + 1
                edgeMap[key].types[e.type] = (edgeMap[key].types[e.type] or 0) + 1
            end
        end
    end

    for actor, factions in pairs(actorFactions) do
        local dominantFaction = nil
        local maxCount = -1
        for fid, count in pairs(factions) do
            if count > maxCount then
                maxCount = count
                dominantFaction = fid
            end
        end
        table.insert(network.nodes, { id = actor, faction = dominantFaction or "unknown" })
    end

    for _, edge in pairs(edgeMap) do
        table.insert(network.edges, edge)
    end

    for fid, stat in pairs(network.factionStats) do
        local actorCount = 0
        for _ in pairs(stat.actors) do actorCount = actorCount + 1 end
        stat.actorCount = actorCount
    end

    return network
end

--- EventLog.AnalyzeEconomicTrends: 经济趋势分析
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return trends 表 {dailyProduction={}, dailyConsumption={}, dailyInvestment={}, netTrends={}}
function EventLog.AnalyzeEconomicTrends(days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entries = EventLog.ByTimeRange(cutoff, current_t, branchId)
    local trends = {
        dailyProduction = {},
        dailyConsumption = {},
        dailyInvestment = {},
        netTrends = {},
        topProducers = {},
        topInvestors = {}
    }

    for _, e in ipairs(entries) do
        if e.type == "economy_produce" then
            local day = math.floor(e.t / 86400)
            local value = e.data and e.data.value or 0
            trends.dailyProduction[day] = (trends.dailyProduction[day] or 0) + value
            trends.topProducers[e.actor] = (trends.topProducers[e.actor] or 0) + value
        elseif e.type == "economy_consume" then
            local day = math.floor(e.t / 86400)
            local cost = e.data and e.data.cost or 0
            trends.dailyConsumption[day] = (trends.dailyConsumption[day] or 0) + cost
        elseif e.type == "economy_invest" then
            local day = math.floor(e.t / 86400)
            local amount = e.data and e.data.amount or 0
            trends.dailyInvestment[day] = (trends.dailyInvestment[day] or 0) + amount
            trends.topInvestors[e.actor] = (trends.topInvestors[e.actor] or 0) + amount
        end
    end

    for day, prod in pairs(trends.dailyProduction) do
        local cons = trends.dailyConsumption[day] or 0
        local inv = trends.dailyInvestment[day] or 0
        trends.netTrends[day] = prod - cons - inv
    end

    return trends
end

--- EventLog.AnalyzeCombatStats: 战斗统计与热点
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return stats 表
function EventLog.AnalyzeCombatStats(days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entries = EventLog.ByTimeRange(cutoff, current_t, branchId)
    local stats = {
        totalCombats = 0,
        victories = 0,
        defeats = 0,
        topCombatants = {},
        hotLocations = {},
        hourlyDistribution = {},
        weaponUsage = {},
        averageDuration = 0
    }
    local combatStartTimes = {}

    for _, e in ipairs(entries) do
        if e.type == "combat" or e.type == "combat_victory" or e.type == "npc_combat" then
            stats.totalCombats = stats.totalCombats + 1
            if e.actor then
                stats.topCombatants[e.actor] = (stats.topCombatants[e.actor] or 0) + 1
            end
            if e.type == "combat_victory" then
                stats.victories = stats.victories + 1
            end
            if e.loc then
                stats.hotLocations[e.loc] = (stats.hotLocations[e.loc] or 0) + 1
            end
            local hour = math.floor((e.t % 86400) / 3600)
            stats.hourlyDistribution[hour] = (stats.hourlyDistribution[hour] or 0) + 1
            if e.data and e.data.weapon then
                stats.weaponUsage[e.data.weapon] = (stats.weaponUsage[e.data.weapon] or 0) + 1
            end
            if e.type == "combat" then
                combatStartTimes[e.id] = e.t
            end
            if e.type == "combat_victory" and e.cause_id and combatStartTimes[e.cause_id] then
                stats.averageDuration = stats.averageDuration + (e.t - combatStartTimes[e.cause_id])
            end
        end
    end

    if stats.victories > 0 then
        stats.averageDuration = stats.averageDuration / stats.victories
    else
        stats.averageDuration = 0
    end
    stats.defeats = stats.totalCombats - stats.victories

    return stats
end

--- EventLog.AnalyzeDialogSentiment: 对话情绪趋势分析
-- @param actorId actor ID（可选，nil 则分析所有）
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return sentiment 表 {positive=0, negative=0, neutral=0, timeline={}}
function EventLog.AnalyzeDialogSentiment(actorId, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entries = EventLog.ByTimeRange(cutoff, current_t, branchId)
    local sentiment = { positive = 0, negative = 0, neutral = 0, timeline = {} }

    local positiveWords = { "喜欢", "爱", "谢谢", "好", "棒", "欢迎", "恭喜", "赞美", "幸福", "快乐" }
    local negativeWords = { "恨", "死", "杀", "滚", "讨厌", "愤怒", "悲伤", "痛", "该死", "复仇" }

    for _, e in ipairs(entries) do
        if e.type == "npc_speech" or e.type == "dialog" then
            if not actorId or e.actor == actorId then
                local text = tostring(e.desc or "")
                local isPos = false
                local isNeg = false
                for _, w in ipairs(positiveWords) do
                    if text:find(w) then isPos = true; break end
                end
                for _, w in ipairs(negativeWords) do
                    if text:find(w) then isNeg = true; break end
                end
                local day = math.floor(e.t / 86400)
                sentiment.timeline[day] = sentiment.timeline[day] or { positive = 0, negative = 0, neutral = 0 }
                if isPos and not isNeg then
                    sentiment.positive = sentiment.positive + 1
                    sentiment.timeline[day].positive = sentiment.timeline[day].positive + 1
                elseif isNeg and not isPos then
                    sentiment.negative = sentiment.negative + 1
                    sentiment.timeline[day].negative = sentiment.timeline[day].negative + 1
                else
                    sentiment.neutral = sentiment.neutral + 1
                    sentiment.timeline[day].neutral = sentiment.timeline[day].neutral + 1
                end
            end
        end
    end
    return sentiment
end

--- EventLog.PredictNextEvents: 基于行为模式的简单预测
-- @param actorId actor ID
-- @param branchId 可选分支过滤
-- @return predictions 列表 {eventType, probability}
function EventLog.PredictNextEvents(actorId, branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local patterns = EventLog.MineBehaviorPatterns(actorId, 2, branchId)
    local recent = EventLog.ByActor(actorId, 2, branchId)
    if #recent < 1 then return {} end
    local lastType = recent[1].type or "unknown"
    local counts = {}
    local total = 0
    for pat, count in pairs(patterns) do
        local parts = {}
        for part in pat:gmatch("[^-]+") do table.insert(parts, part) end
        if #parts == 2 and parts[1] == lastType then
            counts[parts[2]] = (counts[parts[2]] or 0) + count
            total = total + count
        end
    end
    local predictions = {}
    for et, c in pairs(counts) do
        table.insert(predictions, { eventType = et, probability = c / total })
    end
    table.sort(predictions, function(a, b) return a.probability > b.probability end)
    return predictions
end

--- EventLog.DetectAnomalies: 异常事件检测（基于 actor 历史行为基线）
-- @param actorId actor ID
-- @param branchId 可选分支过滤
-- @return anomalies 列表
function EventLog.DetectAnomalies(actorId, branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local summary = EventLog.GetActorSummary(actorId, 7, branchId)
    local recent = EventLog.ByActor(actorId, 20, branchId)
    local anomalies = {}
    if summary.totalEvents == 0 then return anomalies end

    -- 计算每小时平均事件数
    local avgHourly = summary.totalEvents / 7 / 24
    local recentBurst = #recent
    if recentBurst > avgHourly * 5 + 3 then
        table.insert(anomalies, {
            type = "burst_activity",
            desc = actorId .. " 近期活动激增（" .. recentBurst .. " 事件/短时间内）",
            severity = math.min(10, math.floor(recentBurst / (avgHourly + 1)))
        })
    end

    -- 检测异常地点（从未去过或极少去的地方）
    local totalLocs = 0
    for _, _ in pairs(summary.topLocations) do totalLocs = totalLocs + 1 end
    for _, e in ipairs(recent) do
        if e.loc and (not summary.topLocations[e.loc] or summary.topLocations[e.loc] == 1) then
            table.insert(anomalies, {
                type = "unusual_location",
                desc = actorId .. " 出现在异常地点：" .. e.loc,
                severity = 4
            })
            break
        end
    end

    -- 检测异常类型（从未或极少发生的事件类型）
    local typedSummary = EventLog.GetActorSummary(actorId, 30, branchId)
    for _, e in ipairs(recent) do
        local et = e.type or "unknown"
        if not typedSummary.eventTypes[et] or typedSummary.eventTypes[et] <= 1 then
            table.insert(anomalies, {
                type = "rare_event_type",
                desc = actorId .. " 发生了罕见事件类型：" .. et,
                severity = 5
            })
            break
        end
    end

    return anomalies
end

--- EventLog.GetActorConsistencyScore: 计算 actor 行为一致性评分（0~100）
-- 基于行为模式的可预测性。模式越集中，一致性越高。
-- @param actorId actor ID
-- @param branchId 可选分支过滤
-- @return score 整数
function EventLog.GetActorConsistencyScore(actorId, branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local patterns = EventLog.MineBehaviorPatterns(actorId, 2, branchId)
    local totalPatterns = 0
    local totalOccurrences = 0
    for _, count in pairs(patterns) do
        totalPatterns = totalPatterns + 1
        totalOccurrences = totalOccurrences + count
    end
    if totalOccurrences == 0 then return 50 end
    -- 熵近似：模式种类多 -> 一致性低
    local entropy = 0
    for _, count in pairs(patterns) do
        local p = count / totalOccurrences
        entropy = entropy - p * math.log(p + 0.0001)
    end
    local maxEntropy = math.log(totalPatterns + 1)
    local score = math.floor((1 - entropy / (maxEntropy + 0.0001)) * 100)
    return math.max(0, math.min(100, score))
end

--- EventLog.GetLocationRiskRating: 地点风险评级
-- @param loc 地点名称
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return rating 表 {level="low"|"medium"|"high", score=数值, details={}}
function EventLog.GetLocationRiskRating(loc, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local summary = EventLog.GetLocationSummary(loc, days, branchId)
    local combatStats = EventLog.AnalyzeCombatStats(days, branchId)
    local riskScore = 0
    local details = {}

    -- 基于事件总量
    if summary.totalEvents > 100 then
        riskScore = riskScore + 20
        details.highTraffic = true
    end

    -- 基于战斗相关事件比例
    local combatCount = summary.eventTypes["combat"] or 0
    local combatRatio = summary.totalEvents > 0 and (combatCount / summary.totalEvents) or 0
    riskScore = riskScore + math.floor(combatRatio * 50)
    details.combatRatio = combatRatio

    -- 基于死亡事件
    local deathCount = summary.eventTypes["npc_death"] or 0
    riskScore = riskScore + deathCount * 10
    details.deathCount = deathCount

    -- 背叛/阴谋事件
    local betrayalCount = (summary.eventTypes["faction_betrayal"] or 0) + (summary.eventTypes["faction_coup_plan"] or 0)
    riskScore = riskScore + betrayalCount * 15
    details.betrayalCount = betrayalCount

    local level = "low"
    if riskScore >= 30 then level = "medium" end
    if riskScore >= 60 then level = "high" end

    return { level = level, score = riskScore, details = details }
end

--- EventLog.ExtrapolateTrend: 趋势外推（线性拟合）
-- @param data 表 {time -> value}
-- @param futureTime 未来时间点
-- @return predictedValue 数值
function EventLog.ExtrapolateTrend(data, futureTime)
    if not data or type(data) ~= "table" then return 0 end
    local n = 0
    local sumX = 0
    local sumY = 0
    local sumXY = 0
    local sumX2 = 0
    for t, v in pairs(data) do
        n = n + 1
        sumX = sumX + t
        sumY = sumY + v
        sumXY = sumXY + t * v
        sumX2 = sumX2 + t * t
    end
    if n < 2 then return sumY end
    local denom = n * sumX2 - sumX * sumX
    if denom == 0 then return sumY / n end
    local slope = (n * sumXY - sumX * sumY) / denom
    local intercept = (sumY - slope * sumX) / n
    return slope * futureTime + intercept
end

--- EventLog.TimeSeriesAggregate: 时间序列聚合（按天/小时）
-- @param params {typeFilter, actorFilter, locFilter, granularity="day"|"hour", days=7, branchId}
-- @return series 表 {timestamp = count}
function EventLog.TimeSeriesAggregate(params)
    params = params or {}
    local granularity = params.granularity or "day"
    local days = params.days or 7
    local branchId = params.branchId or EventLog.DEFAULT_BRANCH
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entries = EventLog.ByTimeRange(cutoff, current_t, branchId)
    local series = {}

    for _, e in ipairs(entries) do
        local match = true
        if params.typeFilter and e.type ~= params.typeFilter then match = false end
        if params.actorFilter and e.actor ~= params.actorFilter then match = false end
        if params.locFilter and e.loc ~= params.locFilter then match = false end
        if match then
            local bucket = e.t
            if granularity == "day" then
                bucket = math.floor(e.t / 86400) * 86400
            elseif granularity == "hour" then
                bucket = math.floor(e.t / 3600) * 3600
            end
            series[bucket] = (series[bucket] or 0) + 1
        end
    end
    return series
end

--- EventLog.CrossAnalysis: 多维度交叉分析（actor x location x type）
-- @param params {days=7, branchId, topN=10}
-- @return matrix 表
function EventLog.CrossAnalysis(params)
    params = params or {}
    local days = params.days or 7
    local branchId = params.branchId or EventLog.DEFAULT_BRANCH
    local topN = params.topN or 10
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entries = EventLog.ByTimeRange(cutoff, current_t, branchId)

    local actorTypeCounts = {}
    local locTypeCounts = {}
    local actorLocCounts = {}

    for _, e in ipairs(entries) do
        local actor = e.actor or "unknown"
        local loc = e.loc or "unknown"
        local et = e.type or "unknown"
        actorTypeCounts[actor] = actorTypeCounts[actor] or {}
        actorTypeCounts[actor][et] = (actorTypeCounts[actor][et] or 0) + 1
        locTypeCounts[loc] = locTypeCounts[loc] or {}
        locTypeCounts[loc][et] = (locTypeCounts[loc][et] or 0) + 1
        actorLocCounts[actor] = actorLocCounts[actor] or {}
        actorLocCounts[actor][loc] = (actorLocCounts[actor][loc] or 0) + 1
    end

    local function topKeysFromNested(nested, n)
        local list = {}
        for outer, inner in pairs(nested) do
            local total = 0
            for _, c in pairs(inner) do total = total + c end
            table.insert(list, { key = outer, total = total, details = inner })
        end
        table.sort(list, function(a, b) return a.total > b.total end)
        local res = {}
        for i = 1, math.min(n, #list) do res[i] = list[i] end
        return res
    end

    return {
        topActorTypes = topKeysFromNested(actorTypeCounts, topN),
        topLocTypes = topKeysFromNested(locTypeCounts, topN),
        topActorLocs = topKeysFromNested(actorLocCounts, topN)
    }
end

--- EventLog.CalculateEventImpact: 计算单条事件的影响力得分
-- @param eventId 事件 ID
-- @return impactScore 数值（0~100）
function EventLog.CalculateEventImpact(eventId)
    local e = EventLog.FindById(eventId, "all")
    if not e then return 0 end
    local score = 0
    -- 涉及 actor 越多，影响越大
    local actorCount = 1
    if e.actors then actorCount = math.max(actorCount, #e.actors) end
    score = score + actorCount * 10
    -- 有因果关系的事件影响更大
    if e.cause_id and e.cause_id ~= "" then score = score + 15 end
    if e.effect_ids and #e.effect_ids > 0 then score = score + #e.effect_ids * 10 end
    -- 特定类型事件权重更高
    local highImpactTypes = { combat = 20, npc_death = 30, faction_betrayal = 25, romance_wedding = 15, economy_invest = 10 }
    score = score + (highImpactTypes[e.type] or 0)
    -- 有后续事件链的额外加分
    local effects = EventLog.TraceEffects(eventId, 2)
    score = score + #effects * 5
    return math.min(100, score)
end

--- EventLog.TrackNpcLifecycle: NPC 生命周期追踪
-- @param npcId NPC ID
-- @return lifecycle 表
function EventLog.TrackNpcLifecycle(npcId)
    local allEvents = EventLog.ByActor(npcId, 1000, "all")
    table.sort(allEvents, function(a, b) return a.t < b.t end)
    local lifecycle = {
        birthEvent = allEvents[1],
        deathEvent = nil,
        majorMilestones = {},
        totalStates = 0,
        stateCounts = {},
        relationshipChanges = 0,
        combatCount = 0,
        romanceCount = 0,
        lifespanSeconds = 0
    }
    for _, e in ipairs(allEvents) do
        if e.type == "npc_death" then
            lifecycle.deathEvent = e
        end
        if e.type == "npc_state_change" then
            lifecycle.totalStates = lifecycle.totalStates + 1
            if e.desc then
                local toState = e.desc:match("->%s*(.+)")
                if toState then
                    lifecycle.stateCounts[toState] = (lifecycle.stateCounts[toState] or 0) + 1
                end
            end
        end
        if e.type == "relationship_update" then
            lifecycle.relationshipChanges = lifecycle.relationshipChanges + 1
        end
        if e.type:find("combat") then
            lifecycle.combatCount = lifecycle.combatCount + 1
        end
        if e.type:find("romance") then
            lifecycle.romanceCount = lifecycle.romanceCount + 1
        end
        local impact = EventLog.CalculateEventImpact(e.id)
        if impact >= 40 then
            table.insert(lifecycle.majorMilestones, { time = e.t, type = e.type, impact = impact, desc = e.desc })
        end
    end
    if lifecycle.birthEvent and lifecycle.deathEvent then
        lifecycle.lifespanSeconds = (lifecycle.deathEvent.t or 0) - (lifecycle.birthEvent.t or 0)
    elseif lifecycle.birthEvent then
        lifecycle.lifespanSeconds = GetWorldTime() - lifecycle.birthEvent.t
    end
    return lifecycle
end

--- EventLog.GetWorldMood: 基于对话情绪计算世界整体情绪倾向
-- @param days 天数（默认 1）
-- @param branchId 可选分支过滤
-- @return mood 表 {dominant="...", scores={}}
function EventLog.GetWorldMood(days, branchId)
    days = days or 1
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local sentiment = EventLog.AnalyzeDialogSentiment(nil, days, branchId)
    local total = sentiment.positive + sentiment.negative + sentiment.neutral
    if total == 0 then return { dominant = "neutral", scores = { positive = 0, negative = 0, neutral = 100 } } end
    local scores = {
        positive = math.floor(sentiment.positive / total * 100),
        negative = math.floor(sentiment.negative / total * 100),
        neutral = math.floor(sentiment.neutral / total * 100)
    }
    local dominant = "neutral"
    if scores.positive > scores.negative and scores.positive > scores.neutral then
        dominant = "positive"
    elseif scores.negative > scores.positive and scores.negative > scores.neutral then
        dominant = "negative"
    end
    return { dominant = dominant, scores = scores }
end

--- EventLog.GetFactionRivalries: 派系敌对关系强度表
-- @param branchId 可选分支过滤
-- @return rivalries 列表
function EventLog.GetFactionRivalries(branchId)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.Recent(1000, nil, branchId)
    local pairCounts = {}
    for _, e in ipairs(entries) do
        if e.type:find("faction") or e.type:find("betrayal") or e.type:find("combat") then
            local f1 = e.data and e.data.factionId
            local f2 = e.data and e.data.targetFaction
            if f1 and f2 and f1 ~= f2 then
                local key = f1 < f2 and (f1 .. "|" .. f2) or (f2 .. "|" .. f1)
                pairCounts[key] = (pairCounts[key] or 0) + 1
            end
        end
    end
    local list = {}
    for k, count in pairs(pairCounts) do
        local a, b = k:match("^([^|]+)|([^|]+)$")
        table.insert(list, { factionA = a, factionB = b, conflictCount = count })
    end
    table.sort(list, function(x, y) return x.conflictCount > y.conflictCount end)
    return list
end

--- EventLog.GetWealthDistribution: 财富分布统计（基于经济事件）
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return distribution 表
function EventLog.GetWealthDistribution(days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local trends = EventLog.AnalyzeEconomicTrends(days, branchId)
    local actorWealth = {}
    for actor, val in pairs(trends.topProducers or {}) do
        table.insert(actorWealth, { actor = actor, wealth = val })
    end
    table.sort(actorWealth, function(a, b) return a.wealth > b.wealth end)
    local total = 0
    for _, a in ipairs(actorWealth) do total = total + a.wealth end
    local distribution = { sorted = actorWealth, total = total, giniEstimate = 0 }
    -- 简单基尼系数估算
    if #actorWealth > 1 then
        local n = #actorWealth
        local sumDiffs = 0
        for i = 1, n do
            for j = 1, n do
                sumDiffs = sumDiffs + math.abs(actorWealth[i].wealth - actorWealth[j].wealth)
            end
        end
        distribution.giniEstimate = sumDiffs / (2 * n * n * (total / n + 0.0001))
    end
    return distribution
end

--- EventLog.GetEventVelocity: 事件发生率（事件/小时）
-- @param typeFilter 可选类型过滤
-- @param branchId 可选分支过滤
-- @param windowHours 时间窗口（小时，默认 24）
-- @return velocity 数值
function EventLog.GetEventVelocity(typeFilter, branchId, windowHours)
    branchId = branchId or EventLog.DEFAULT_BRANCH
    windowHours = windowHours or 24
    local series = EventLog.TimeSeriesAggregate({
        typeFilter = typeFilter,
        granularity = "hour",
        days = math.ceil(windowHours / 24),
        branchId = branchId
    })
    local total = 0
    for _, c in pairs(series) do total = total + c end
    return total / windowHours
end

--- EventLog.GetSuspiciousActors: 可疑人物列表（基于异常检测聚合）
-- @param n 返回数量（默认 10）
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return actors 列表
function EventLog.GetSuspiciousActors(n, days, branchId)
    n = n or 10
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local summary = EventLog.GetWorldSummary(days, branchId)
    local candidates = {}
    for actor, count in pairs(summary.topActors or {}) do
        local anomalies = EventLog.DetectAnomalies(actor, branchId)
        local totalSeverity = 0
        for _, a in ipairs(anomalies) do totalSeverity = totalSeverity + a.severity end
        if totalSeverity > 0 then
            table.insert(candidates, { actor = actor, severity = totalSeverity, anomalyCount = #anomalies })
        end
    end
    table.sort(candidates, function(a, b) return a.severity > b.severity end)
    local result = {}
    for i = 1, math.min(n, #candidates) do result[i] = candidates[i] end
    return result
end

--- EventLog.BuildLocationHeatmap: 构建地点热度图数据
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return heatmap 列表 {loc, totalEvents, riskScore,CombatRatio}
function EventLog.BuildLocationHeatmap(days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local summary = EventLog.GetWorldSummary(days, branchId)
    local heatmap = {}
    for loc, count in pairs(summary.topLocations or {}) do
        local rating = EventLog.GetLocationRiskRating(loc, days, branchId)
        table.insert(heatmap, {
            loc = loc,
            totalEvents = count,
            riskScore = rating.score,
            riskLevel = rating.level,
            combatRatio = rating.details.combatRatio or 0
        })
    end
    table.sort(heatmap, function(a, b) return a.totalEvents > b.totalEvents end)
    return heatmap
end

--- EventLog.CompareActors: 对比两个 actor 的事件特征
-- @param actorA string
-- @param actorB string
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return comparison 表
function EventLog.CompareActors(actorA, actorB, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local sA = EventLog.GetActorSummary(actorA, days, branchId)
    local sB = EventLog.GetActorSummary(actorB, days, branchId)
    local commonPartners = {}
    for p, cA in pairs(sA.partners or {}) do
        local cB = sB.partners and sB.partners[p] or 0
        if cB > 0 then
            table.insert(commonPartners, { partner = p, countA = cA, countB = cB })
        end
    end
    table.sort(commonPartners, function(a, b) return (a.countA + a.countB) > (b.countB + b.countA) end)

    local commonLocs = {}
    for loc, cA in pairs(sA.topLocations or {}) do
        local cB = sB.topLocations and sB.topLocations[loc] or 0
        if cB > 0 then
            table.insert(commonLocs, { loc = loc, countA = cA, countB = cB })
        end
    end
    table.sort(commonLocs, function(a, b) return (a.countA + a.countB) > (b.countB + b.countA) end)

    return {
        actorA = sA,
        actorB = sB,
        commonPartners = commonPartners,
        commonLocations = commonLocs,
        similarityEstimate = math.floor((#commonPartners * 10 + #commonLocs * 5) / math.max(1, math.abs(sA.totalEvents - sB.totalEvents) + 1))
    }
end

--- EventLog.GetEventPeakHours: 获取事件高峰时段
-- @param typeFilter 可选类型过滤
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return peaks 列表 {hour, count}
function EventLog.GetEventPeakHours(typeFilter, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local series = EventLog.TimeSeriesAggregate({
        typeFilter = typeFilter,
        granularity = "hour",
        days = days,
        branchId = branchId
    })
    local hourlyTotals = {}
    for bucket, count in pairs(series) do
        local hour = math.floor((bucket % 86400) / 3600)
        hourlyTotals[hour] = (hourlyTotals[hour] or 0) + count
    end
    local list = {}
    for h, c in pairs(hourlyTotals) do
        table.insert(list, { hour = h, count = c })
    end
    table.sort(list, function(a, b) return a.count > b.count end)
    return list
end

--- EventLog.SummarizeBranchDiff: 对比两个分支的事件差异
-- @param branchA string
-- @param branchB string
-- @param days 天数（默认 7）
-- @return diff 表
function EventLog.SummarizeBranchDiff(branchA, branchB, days)
    days = days or 7
    local current_t = GetWorldTime()
    local cutoff = current_t - days * 86400
    local entriesA = EventLog.ByTimeRange(cutoff, current_t, branchA)
    local entriesB = EventLog.ByTimeRange(cutoff, current_t, branchB)
    local typeCountsA = {}
    local typeCountsB = {}
    for _, e in ipairs(entriesA) do
        typeCountsA[e.type or "unknown"] = (typeCountsA[e.type or "unknown"] or 0) + 1
    end
    for _, e in ipairs(entriesB) do
        typeCountsB[e.type or "unknown"] = (typeCountsB[e.type or "unknown"] or 0) + 1
    end
    local allTypes = {}
    for t, _ in pairs(typeCountsA) do allTypes[t] = true end
    for t, _ in pairs(typeCountsB) do allTypes[t] = true end
    local diffs = {}
    for t, _ in pairs(allTypes) do
        local a = typeCountsA[t] or 0
        local b = typeCountsB[t] or 0
        table.insert(diffs, { type = t, countA = a, countB = b, diff = a - b })
    end
    table.sort(diffs, function(x, y) return math.abs(x.diff) > math.abs(y.diff) end)
    return {
        branchA = branchA,
        branchB = branchB,
        totalA = #entriesA,
        totalB = #entriesB,
        typeDiffs = diffs
    }
end

--- EventLog.GetInfluentialActors: 获取影响力最高的 N 个 actor
-- @param n 数量（默认 10）
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return actors 列表
function EventLog.GetInfluentialActors(n, days, branchId)
    n = n or 10
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByTimeRange(GetWorldTime() - days * 86400, GetWorldTime(), branchId)
    local actorImpact = {}
    for _, e in ipairs(entries) do
        if e.actor then
            local impact = EventLog.CalculateEventImpact(e.id)
            actorImpact[e.actor] = (actorImpact[e.actor] or 0) + impact
        end
    end
    local list = {}
    for a, total in pairs(actorImpact) do
        table.insert(list, { actor = a, totalImpact = total })
    end
    table.sort(list, function(a, b) return a.totalImpact > b.totalImpact end)
    local result = {}
    for i = 1, math.min(n, #list) do result[i] = list[i] end
    return result
end

--- EventLog.GetRelationshipDynamics: 分析两个 actor 之间关系随时间的变化
-- @param actorA string
-- @param actorB string
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return dynamics 列表 {time, eventType, impact}
function EventLog.GetRelationshipDynamics(actorA, actorB, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entriesA = EventLog.ByActor(actorA, 500, branchId)
    local relevant = {}
    for _, e in ipairs(entriesA) do
        if e.target == actorB then
            local impact = 0
            if e.type:find("positive") or e.type:find("gift") or e.type:find("wedding") then impact = 10
            elseif e.type:find("negative") or e.type:find("combat") or e.type:find("betrayal") then impact = -10
            elseif e.type:find("speech") then impact = 2
            end
            table.insert(relevant, { time = e.t, eventType = e.type, impact = impact, desc = e.desc })
        end
    end
    table.sort(relevant, function(a, b) return a.time < b.time end)
    return relevant
end

--- EventLog.GetNarrativeArc: 为指定 actor 生成叙事弧线摘要
-- @param actorId string
-- @param days 天数（默认 7）
-- @param branchId 可选分支过滤
-- @return arc 表 {opening, risingAction, climax, fallingAction, resolution}
function EventLog.GetNarrativeArc(actorId, days, branchId)
    days = days or 7
    branchId = branchId or EventLog.DEFAULT_BRANCH
    local entries = EventLog.ByActor(actorId, 200, branchId)
    table.sort(entries, function(a, b) return a.t < b.t end)
    if #entries == 0 then return nil end

    -- 将事件按影响力分段
    local scored = {}
    for _, e in ipairs(entries) do
        local impact = EventLog.CalculateEventImpact(e.id)
        table.insert(scored, { event = e, impact = impact })
    end
    table.sort(scored, function(a, b) return a.impact > b.impact end)
    local climax = scored[1]
    local climaxIndex = -1
    for i, s in ipairs(entries) do
        if s.id == climax.event.id then climaxIndex = i; break end
    end

    local arc = {
        opening = entries[1],
        climax = climax.event,
        resolution = entries[#entries]
    }
    if climaxIndex > 2 then
        arc.risingAction = entries[math.floor(climaxIndex / 2)]
    else
        arc.risingAction = entries[math.min(2, #entries)]
    end
    if climaxIndex > 0 and climaxIndex < #entries - 1 then
        arc.fallingAction = entries[math.floor((climaxIndex + #entries) / 2)]
    else
        arc.fallingAction = entries[math.max(1, #entries - 1)]
    end
    return arc
end

-- ============================================
-- 文件尾
-- ============================================
