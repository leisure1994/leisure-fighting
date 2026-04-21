-- Mail.lua
-- ============================================================================
-- 邮件系统 (Mail System)
-- ============================================================================
-- 功能：
--   1. 发送 / 接收邮件（支持普通邮件与系统邮件）
--   2. 附件（金币 / 道具 / 装备）
--   3. 已读状态、领取状态、过期删除
--   4. 批量删除、一键领取全部
--   5. 邮件上限、30天自动过期
-- ============================================================================

local Mail = {
    mails = {},            -- [mailId] = mailData
    playerInbox = {},      -- [playerId] = { mailId1, mailId2, ... }
    dbFileName = "MailDB",
    ctx = nil
}

-- ----------------------------------------------------------------------------
-- 初始化 / 持久化
-- ----------------------------------------------------------------------------

function Mail:Init(ctx)
    self.ctx = ctx
    self:Load()

    local net = GetNetwork()
    if IsServer() then
        net:RegisterRemoteEvent("MailSend")
        net:RegisterRemoteEvent("MailRead")
        net:RegisterRemoteEvent("MailClaimAttach")
        net:RegisterRemoteEvent("MailDelete")
        net:RegisterRemoteEvent("MailClaimAll")
        net:RegisterRemoteEvent("MailDeleteRead")
        net:RegisterRemoteEvent("MailRequestList")

        SubscribeToEvent("MailSend", function(et, ed) self:HandleMailSend(ed) end)
        SubscribeToEvent("MailRead", function(et, ed) self:HandleMailRead(ed) end)
        SubscribeToEvent("MailClaimAttach", function(et, ed) self:HandleMailClaimAttach(ed) end)
        SubscribeToEvent("MailDelete", function(et, ed) self:HandleMailDelete(ed) end)
        SubscribeToEvent("MailClaimAll", function(et, ed) self:HandleMailClaimAll(ed) end)
        SubscribeToEvent("MailDeleteRead", function(et, ed) self:HandleMailDeleteRead(ed) end)
        SubscribeToEvent("MailRequestList", function(et, ed) self:HandleMailRequestList(ed) end)
    else
        SubscribeToEvent("MailListSync", function(et, ed) self:HandleMailListSync(ed) end)
        SubscribeToEvent("MailUpdate", function(et, ed) self:HandleMailUpdate(ed) end)
        SubscribeToEvent("MailNotify", function(et, ed) self:HandleMailNotify(ed) end)
    end
end

function Mail:Load()
    local path = self.ctx:GetDbPath(self.dbFileName)
    local data = LoadTable(path)
    if data then
        self.mails = data.mails or {}
        self.playerInbox = data.playerInbox or {}
    end
    self:CleanupExpiredMails()
end

function Mail:Save()
    local path = self.ctx:GetDbPath(self.dbFileName)
    SaveTable(path, {
        mails = self.mails,
        playerInbox = self.playerInbox
    })
end

-- ----------------------------------------------------------------------------
-- 工具
-- ----------------------------------------------------------------------------

function Mail:GenerateMailId()
    return "MAIL_" .. GenerateUUID()
end

function Mail:GetMail(mailId)
    return self.mails[mailId]
end

function Mail:GetInbox(playerId)
    if not self.playerInbox[playerId] then
        self.playerInbox[playerId] = {}
    end
    return self.playerInbox[playerId]
end

function Mail:GetMailCount(playerId)
    local inbox = self:GetInbox(playerId)
    return #inbox
end

function Mail:GetUnreadCount(playerId)
    local inbox = self:GetInbox(playerId)
    local count = 0
    for _, mailId in ipairs(inbox) do
        local m = self.mails[mailId]
        if m and not m.isRead then
            count = count + 1
        end
    end
    return count
end

function Mail:HasAttachment(mailData)
    if not mailData.attachments then return false end
    for _, a in pairs(mailData.attachments) do
        if a.claimed == false then return true end
    end
    return false
end

function Mail:IsAttachmentClaimed(mailData)
    if not mailData.attachments then return true end
    for _, a in pairs(mailData.attachments) do
        if a.claimed == false then return false end
    end
    return true
end

function Mail:CleanupExpiredMails()
    local now = GetTimestampSec()
    local expirySec = self.ctx.config.mailExpiryDays * 86400
    local toDelete = {}
    for mailId, mail in pairs(self.mails) do
        if now - mail.sendTime > expirySec then
            table.insert(toDelete, mailId)
        end
    end
    for _, mailId in ipairs(toDelete) do
        self:DeleteMailById(mailId)
    end
end

-- ----------------------------------------------------------------------------
-- 核心逻辑
-- ----------------------------------------------------------------------------

function Mail:SendMail(senderId, targetId, subject, body, attachments, isSystem)
    if not targetId or not subject then return nil end
    if isSystem then senderId = "SYSTEM" end

    local inbox = self:GetInbox(targetId)
    if #inbox >= self.ctx.config.maxMailCount then
        -- 邮箱满了，删除最旧的非系统邮件
        local removed = self:RemoveOldestNonSystemMail(targetId)
        if not removed then
            -- 如果连系统邮件也要删，删除最旧的
            self:RemoveOldestMail(targetId)
        end
    end

    local mailId = self:GenerateMailId()
    local now = GetTimestampSec()
    local attachList = {}
    if attachments then
        for _, a in ipairs(attachments) do
            table.insert(attachList, {
                type = a.type or "gold",
                id = a.id or "",
                count = a.count or 1,
                claimed = false
            })
        end
    end

    local mail = {
        mailId = mailId,
        senderId = senderId or "SYSTEM",
        senderName = (senderId == "SYSTEM") and "系统" or self.ctx:GetPlayerNickname(senderId),
        targetId = targetId,
        subject = subject,
        body = body or "",
        attachments = attachList,
        sendTime = now,
        expiryTime = now + (self.ctx.config.mailExpiryDays * 86400),
        isRead = false,
        isSystem = isSystem or false,
        isDeleted = false
    }

    self.mails[mailId] = mail
    table.insert(inbox, 1, mailId)

    -- 通知在线收件人
    if self.ctx:IsOnline(targetId) then
        self:SyncMailToPlayer(targetId, mail)
        local vm = VariantMap()
        vm["MailId"] = mailId
        vm["SenderName"] = mail.senderName
        vm["Subject"] = subject
        self.ctx:SendToPlayer(targetId, "MailNotify", vm)
    end

    return mailId
end

function Mail:SendSystemMail(targetId, subject, body, attachments)
    return self:SendMail("SYSTEM", targetId, subject, body, attachments, true)
end

function Mail:BroadcastSystemMail(subject, body, attachments)
    for pid, _ in pairs(self.ctx.players) do
        self:SendSystemMail(pid, subject, body, attachments)
    end
end

function Mail:ReadMail(playerId, mailId)
    local mail = self.mails[mailId]
    if not mail or mail.targetId ~= playerId then return false end
    if not mail.isRead then
        mail.isRead = true
        if self.ctx:IsOnline(playerId) then
            self:SyncMailToPlayer(playerId, mail)
        end
    end
    return true
end

function Mail:ClaimAttachments(playerId, mailId)
    local mail = self.mails[mailId]
    if not mail or mail.targetId ~= playerId then return false, "邮件不存在" end
    local claimedItems = {}
    local hasAny = false
    for _, a in ipairs(mail.attachments) do
        if not a.claimed then
            a.claimed = true
            hasAny = true
            table.insert(claimedItems, DeepCopy(a))
        end
    end
    if not hasAny then return false, "没有可领取的附件" end
    if self.ctx:IsOnline(playerId) then
        self:SyncMailToPlayer(playerId, mail)
    end
    return true, nil, claimedItems
end

function Mail:DeleteMail(playerId, mailId)
    local mail = self.mails[mailId]
    if not mail or mail.targetId ~= playerId then return false end
    -- 如果还有附件未领取，禁止删除
    if self:HasAttachment(mail) then return false, "请先领取附件" end
    return self:DeleteMailById(mailId)
end

function Mail:DeleteMailById(mailId)
    local mail = self.mails[mailId]
    if not mail then return false end
    mail.isDeleted = true
    self.mails[mailId] = nil
    local inbox = self.playerInbox[mail.targetId]
    if inbox then
        for i = #inbox, 1, -1 do
            if inbox[i] == mailId then
                table.remove(inbox, i)
                break
            end
        end
    end
    if self.ctx:IsOnline(mail.targetId) then
        local vm = VariantMap()
        vm["MailId"] = mailId
        vm["Action"] = "delete"
        self.ctx:SendToPlayer(mail.targetId, "MailUpdate", vm)
    end
    return true
end

function Mail:ClaimAll(playerId)
    local inbox = self:GetInbox(playerId)
    local totalClaimed = {}
    for _, mailId in ipairs(inbox) do
        local mail = self.mails[mailId]
        if mail and self:HasAttachment(mail) then
            local ok, err, items = self:ClaimAttachments(playerId, mailId)
            if ok and items then
                for _, it in ipairs(items) do
                    table.insert(totalClaimed, it)
                end
            end
        end
    end
    return totalClaimed
end

function Mail:DeleteReadMails(playerId)
    local inbox = self:GetInbox(playerId)
    local toDelete = {}
    for _, mailId in ipairs(inbox) do
        local mail = self.mails[mailId]
        if mail and mail.isRead and not self:HasAttachment(mail) then
            table.insert(toDelete, mailId)
        end
    end
    for _, mailId in ipairs(toDelete) do
        self:DeleteMailById(mailId)
    end
    return #toDelete
end

function Mail:RemoveOldestNonSystemMail(playerId)
    local inbox = self:GetInbox(playerId)
    for i = #inbox, 1, -1 do
        local mailId = inbox[i]
        local mail = self.mails[mailId]
        if mail and not mail.isSystem then
            self:DeleteMailById(mailId)
            return true
        end
    end
    return false
end

function Mail:RemoveOldestMail(playerId)
    local inbox = self:GetInbox(playerId)
    if #inbox == 0 then return false end
    local oldestId = inbox[#inbox]
    self:DeleteMailById(oldestId)
    return true
end

-- ----------------------------------------------------------------------------
-- 同步协议 (Server -> Client)
-- ----------------------------------------------------------------------------

function Mail:SyncMailListToPlayer(playerId)
    if not self.ctx:IsOnline(playerId) then return end
    local inbox = self:GetInbox(playerId)
    local list = {}
    for _, mailId in ipairs(inbox) do
        local mail = self.mails[mailId]
        if mail then
            table.insert(list, self:MailToClientData(mail))
        end
    end

    local chunkSize = 20
    local total = #list
    local chunks = math.ceil(total / chunkSize)
    if chunks == 0 then
        local vm = VariantMap()
        vm["Total"] = 0
        vm["Index"] = 0
        self.ctx:SendToPlayer(playerId, "MailListSync", vm)
        return
    end
    for i = 1, chunks do
        local vm = VariantMap()
        vm["Total"] = total
        vm["Index"] = i
        local sub = {}
        local s = (i - 1) * chunkSize + 1
        local e = math.min(i * chunkSize, total)
        for j = s, e do
            table.insert(sub, list[j])
        end
        vm["Payload"] = self:SerializeMailList(sub)
        self.ctx:SendToPlayer(playerId, "MailListSync", vm)
    end
end

function Mail:SyncMailToPlayer(playerId, mail)
    if not self.ctx:IsOnline(playerId) then return end
    local vm = VariantMap()
    vm["MailId"] = mail.mailId
    vm["Action"] = "update"
    vm["Payload"] = self:SerializeMailList({ self:MailToClientData(mail) })
    self.ctx:SendToPlayer(playerId, "MailUpdate", vm)
end

function Mail:MailToClientData(mail)
    local attachStr = ""
    for _, a in ipairs(mail.attachments) do
        local part = string.format("%s:%s:%d:%d", a.type, a.id, a.count, a.claimed and 1 or 0)
        if #attachStr > 0 then attachStr = attachStr .. ";" end
        attachStr = attachStr .. part
    end
    return {
        mailId = mail.mailId,
        senderId = mail.senderId,
        senderName = mail.senderName,
        subject = mail.subject,
        body = mail.body,
        attachments = attachStr,
        sendTime = mail.sendTime,
        expiryTime = mail.expiryTime,
        isRead = mail.isRead,
        hasAttachment = self:HasAttachment(mail)
    }
end

function Mail:SerializeMailList(list)
    local parts = {}
    for _, m in ipairs(list) do
        local line = string.format("%s=%s=%s=%s=%s=%s=%d=%d=%s=%s",
            m.mailId,
            m.senderId,
            m.senderName,
            m.subject,
            m.body,
            m.attachments,
            m.sendTime,
            m.expiryTime,
            m.isRead and "1" or "0",
            m.hasAttachment and "1" or "0"
        )
        table.insert(parts, line)
    end
    return table.concat(parts, "|")
end

-- ----------------------------------------------------------------------------
-- 服务器事件处理
-- ----------------------------------------------------------------------------

function Mail:HandleMailSend(eventData)
    local connection = eventData["Connection"]
    local senderId = self.ctx:GetPlayerIdByConnection(connection)
    local targetId = eventData["TargetId"]:GetString()
    local subject = eventData["Subject"]:GetString()
    local body = eventData["Body"] and eventData["Body"]:GetString() or ""
    local attachStr = eventData["Attachments"] and eventData["Attachments"]:GetString() or ""
    if not senderId or not targetId or not subject then return end

    -- 解析附件字符串: type:id:count|type:id:count
    local attachments = {}
    if #attachStr > 0 then
        for seg in string.gmatch(attachStr, "[^|]+") do
            local parts = {}
            for p in string.gmatch(seg, "[^:]+") do table.insert(parts, p) end
            if #parts >= 3 then
                table.insert(attachments, { type = parts[1], id = parts[2], count = tonumber(parts[3]) or 1 })
            end
        end
    end

    local mailId = self:SendMail(senderId, targetId, subject, body, attachments, false)
    if mailId then
        self.ctx:NotifyPlayer(senderId, "success", "邮件已发送。")
    else
        self.ctx:NotifyPlayer(senderId, "error", "发送失败。")
    end
end

function Mail:HandleMailRead(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local mailId = eventData["MailId"]:GetString()
    if not playerId or not mailId then return end
    self:ReadMail(playerId, mailId)
end

function Mail:HandleMailClaimAttach(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local mailId = eventData["MailId"]:GetString()
    if not playerId or not mailId then return end
    local ok, err, items = self:ClaimAttachments(playerId, mailId)
    if ok then
        self.ctx:NotifyPlayer(playerId, "success", "附件领取成功。")
        -- 触发上层背包处理（如果有背包模块可订阅此事件）
        local vm = VariantMap()
        vm["PlayerId"] = playerId
        vm["MailId"] = mailId
        vm["Items"] = self:SerializeClaimedItems(items)
        self.ctx:BroadcastRemoteEvent("MailAttachmentsClaimed", vm)
    else
        self.ctx:NotifyPlayer(playerId, "error", err or "领取失败。")
    end
end

function Mail:SerializeClaimedItems(items)
    local parts = {}
    for _, it in ipairs(items) do
        table.insert(parts, string.format("%s:%s:%d", it.type, it.id, it.count))
    end
    return table.concat(parts, "|")
end

function Mail:HandleMailDelete(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    local mailId = eventData["MailId"]:GetString()
    if not playerId or not mailId then return end
    local ok, err = self:DeleteMail(playerId, mailId)
    if ok then
        self.ctx:NotifyPlayer(playerId, "info", "邮件已删除。")
    else
        self.ctx:NotifyPlayer(playerId, "error", err or "删除失败。")
    end
end

function Mail:HandleMailClaimAll(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local claimed = self:ClaimAll(playerId)
    if #claimed > 0 then
        self.ctx:NotifyPlayer(playerId, "success", "一键领取成功，共 " .. #claimed .. " 个附件。")
        local vm = VariantMap()
        vm["PlayerId"] = playerId
        vm["Items"] = self:SerializeClaimedItems(claimed)
        self.ctx:BroadcastRemoteEvent("MailAttachmentsClaimed", vm)
    else
        self.ctx:NotifyPlayer(playerId, "info", "没有可领取的附件。")
    end
end

function Mail:HandleMailDeleteRead(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    local count = self:DeleteReadMails(playerId)
    self.ctx:NotifyPlayer(playerId, "info", "已清理 " .. count .. " 封已读邮件。")
end

function Mail:HandleMailRequestList(eventData)
    local connection = eventData["Connection"]
    local playerId = self.ctx:GetPlayerIdByConnection(connection)
    if not playerId then return end
    self:SyncMailListToPlayer(playerId)
end

-- ----------------------------------------------------------------------------
-- 客户端事件处理（供 UI 接入）
-- ----------------------------------------------------------------------------

function Mail:HandleMailListSync(eventData)
    local total = eventData["Total"]:GetInt()
    local index = eventData["Index"]:GetInt()
    local payload = eventData["Payload"] and eventData["Payload"]:GetString() or ""
    print("[Mail] ListSync total=" .. total .. " chunk=" .. index .. " payload=" .. #payload)
end

function Mail:HandleMailUpdate(eventData)
    local mailId = eventData["MailId"]:GetString()
    local action = eventData["Action"]:GetString()
    print("[Mail] Update mailId=" .. mailId .. " action=" .. action)
end

function Mail:HandleMailNotify(eventData)
    local mailId = eventData["MailId"]:GetString()
    local sender = eventData["SenderName"]:GetString()
    local subject = eventData["Subject"]:GetString()
    print("[Mail] New mail from=" .. sender .. " subject=" .. subject)
end

-- ----------------------------------------------------------------------------
-- 供外部调用的便捷接口
-- ----------------------------------------------------------------------------

function Mail:SendRewardMail(targetId, subject, body, rewardList)
    return self:SendSystemMail(targetId, subject, body, rewardList)
end

function Mail:SendBulkSystemMail(targetIds, subject, body, rewardList)
    for _, pid in ipairs(targetIds) do
        self:SendSystemMail(pid, subject, body, rewardList)
    end
end

return Mail
