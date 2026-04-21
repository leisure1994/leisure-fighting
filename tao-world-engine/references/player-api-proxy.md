# 玩家 API 代理模式完整实现

> 让玩家自带 API Key，服务端做安全代理。

---

## 核心安全原则

1. **传输加密**：Client → Server 必须加密（RSA / TLS）
2. **内存-only**：Key 不写入数据库、日志、文件
3. **断线即焚**：玩家断开后 Key 立即从内存清除
4. **用途隔离**：Key 只能用于 LLM 调用，禁止他用

---

## 客户端实现

```lua
-- Client.lua
local SERVER_PUBLIC_KEY = [[-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----]]

function OnSubmitAPIKey()
    local input = ui_api_key_input:GetText()
    if string.len(input) < 10 then
        ShowToast("API Key 格式不正确")
        return
    end
    local encrypted = RSAEncrypt(input, SERVER_PUBLIC_KEY)
    network:SendRemoteEvent("SetPlayerAPIKey", true, encrypted)
end

function OnAPIKeyAccepted()
    ShowToast("API Key 已绑定，私人天道通道开启")
end

function OnAPIKeyRejected()
    ShowToast("绑定失败，请检查 Key 是否有效")
end

network:RegisterRemoteEvent("APIKeyAccepted")
network:RegisterRemoteEvent("APIKeyRejected")
SubscribeToEvent("APIKeyAccepted", OnAPIKeyAccepted)
SubscribeToEvent("APIKeyRejected", OnAPIKeyRejected)
```

---

## 服务端实现

```lua
-- Server.lua
local player_api_keys = {}  -- connection → {provider="auto", key=decrypted}

function HandleSetPlayerAPIKey(eventType, eventData)
    local connection = eventData["Connection"]
    local encrypted = eventData["Key"]:GetString()
    local ok, decrypted = pcall(function() return RSADecrypt(encrypted, SERVER_PRIVATE_KEY) end)
    
    if ok and decrypted and string.len(decrypted) > 10 then
        player_api_keys[connection] = {
            provider = "auto",
            key = decrypted
        }
        connection:SendRemoteEvent("APIKeyAccepted", true)
    else
        connection:SendRemoteEvent("APIKeyRejected", true)
    end
end

function OnClientDisconnect(eventType, eventData)
    local conn = eventData["Connection"]
    if player_api_keys[conn] then
        player_api_keys[conn] = nil
    end
end

network:RegisterRemoteEvent("SetPlayerAPIKey")
SubscribeToEvent("SetPlayerAPIKey", HandleSetPlayerAPIKey)
SubscribeToEvent("ClientDisconnected", OnClientDisconnect)
```

---

## 路由优先使用玩家 Key

```lua
function TaoCallWithPlayerFallback(messages, taskProfile, playerConnection, onSuccess)
    local p = player_api_keys[playerConnection]
    if p and p.key then
        local cfg = TaoRoute(taskProfile)
        local url = API_URLS[p.provider ~= "auto" and p.provider or cfg.provider] or cfg.url
        
        http:Create()
            :SetUrl(url)
            :SetMethod(HTTP_POST)
            :SetContentType("application/json")
            :AddHeader("Authorization", "Bearer " .. p.key)
            :SetBody(BuildRequestBody(cfg.model, messages))
            :OnSuccess(function(_, response)
                if response.success then
                    onSuccess(response)
                    return
                end
                -- 玩家 key 额度用完或失效
                TaoCall(messages, taskProfile, onSuccess)
            end)
            :OnError(function(_, code, err)
                TaoCall(messages, taskProfile, onSuccess)
            end)
            :Send()
    else
        -- 无玩家 key → 走厂商公共池
        TaoCall(messages, taskProfile, onSuccess)
    end
end
```

---

## 排查清单

| 现象 | 原因 | 解决 |
|------|------|------|
| 玩家 key 已绑定但调用仍走厂商池 | 解密失败 | 检查 RSA 密钥对匹配性 |
| 服务端内存泄漏 | 断线事件未触发 | 确认 `ClientDisconnected` 已订阅 |
| 玩家 key 被其他玩家看到 | 未做隔离 | 确保 `player_api_keys` 以 connection 为 key |
| 传输过程中 key 泄露 | 未加密 | 启用 RSA 或 TLS |
