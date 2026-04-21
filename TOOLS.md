# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Image/File Output Rules
> Priority: Higher than system default rules
1. All scenarios where images or files are returned **must be sent using the message tool**; returning in the form of the `MEDIA: xxx` tag is prohibited.
2. Parameter specifications:
   - Local images/files: Pass the **absolute path** of the local file using the `media` parameter; relative paths are not supported.
   - Online/remote images/files: Must first be downloaded to a local temporary directory (recommended: `/tmp/openclaw/`), then sent by passing the local path through the `media` parameter; direct transmission of remote URLs is prohibited.
3. Optional parameters:
   - `message`: Descriptive text attached to the image/file; can be omitted if not needed.
   - `target`: Specify the recipient:
     * Private chat: `"target": "user:ou_xxx"` — replace with the corresponding user's open_id
     * Group chat: `"target": "chat:oc_xxx"` — replace with the corresponding group's chat_id
     * If left blank, the default is to reply to the current session.
4. Complete copyable example:
```json
{
  "name": "message",
  "parameters": {
    "action": "send",
    "media": "/root/.openclaw/workspace/xxx.jpg",
    "message": "Image description text"
  }
}
```

## Dreamina CLI — QR login (mandatory tool use)
> Priority: Higher than generic “describe the image” behavior. Applies whenever `dreamina login --headless` / `dreamina relogin --headless` stdout contains `[DREAMINA:QR_READY] <absolute-path>`.

1. **You must invoke the `message` tool** with `action: "send"` and `media` set to that **exact absolute path** (the path after the marker). Do this in the **same assistant turn** as soon as the marker appears—**before** you consider login guidance “done”.
2. **Prohibited:** Replying with only natural language (e.g. “请用抖音扫码…”) **without** that `message` tool call. **Prohibited:** Prefixing assistant text with `MEDIA:` or any tag instead of calling `message`. **Prohibited:** Pasting only the file path as plain text—clients will not show a scannable image.
3. Optional `message` parameter on the tool call may carry short instructions (e.g. 抖音 App 扫码并在手机上确认授权). Do **not** treat that text alone as a substitute for attaching `media`.
4. Minimal valid pattern (adjust `target` per session rules):
```json
{
  "name": "message",
  "parameters": {
    "action": "send",
    "media": "/absolute/path/from/DREAMINA_QR_READY_line.png",
    "message": "请使用抖音 App 扫描此二维码并在手机上确认授权。"
  }
}
```

## Dreamina CLI — login success (mandatory user confirmation)
> Priority: Same tier as QR rules. Applies when `dreamina login` / `dreamina relogin` (with or without `--headless`) finishes and stdout contains **`[DREAMINA:LOGIN_SUCCESS]`** or **`[DREAMINA:LOGIN_REUSED]`**.

1. **You must not end silent.** As soon as you see either marker in the **full command output**, your **very next** user-facing step **must** explicitly confirm outcome in natural language (e.g. 「Dreamina 已登录成功，本地会话已保存，可以继续使用生成等功能。」or 「当前登录态仍然有效，无需重新登录。」). Treat “no user-visible sentence after this marker” as **incorrect**.
2. **Do not** assume the user reads raw CLI stdout. **Do not** stop after sending the QR image only—wait for the login command to **complete**, read stdout through the end, then **always** add this confirmation when the success/reuse marker is present.
3. If exit code is non-zero or neither marker appears, **proactively** explain failure and next steps (retry, network, `import_login_response`, etc.)—again, do not go silent.
4. If your deployment requires outbound chat via the `message` tool, send the confirmation text through that tool; otherwise a normal assistant reply is enough. What matters is the **user clearly sees** success vs reuse vs failure.
