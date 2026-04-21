---
name: minimax-api
description: |
  MiniMax 全模型 API 接入 Skill。支持文本对话(M2.5/M2.1/M2)、语音合成(T2A)、
  语音克隆、视频生成(Hailuo)、图片生成、音乐生成等全部能力。
  
  Use when: (1) 需要调用 MiniMax 大模型进行文本对话, (2) 需要语音合成/克隆,
  (3) 需要生成视频(Hailuo), (4) 需要文生图/图生图, (5) 需要生成音乐。
  
  触发关键词: minimax, 海螺, Hailuo, T2A, 语音合成, 文生视频, 文生图
---

# MiniMax API Skill

> **MiniMax 全能力接入 —— 文本、语音、视频、图片、音乐**

## 概述

本 Skill 提供对 MiniMax 平台全部 API 的统一调用能力：

| 能力 | 模型 | 状态 |
|------|------|------|
| 文本对话 | MiniMax-M2.5, M2.1, M2, M2-her | ✅ |
| 语音合成(T2A) | Speech-2.8/2.6/02/01 HD/Turbo | ✅ |
| 语音克隆 | Voice Cloning API | ✅ |
| 视频生成 | Hailuo 2.3, 2.3 Fast, 02 | ✅ |
| 图片生成 | image-01, image-01-live | ✅ |
| 音乐生成 | music-2.5 | ✅ |

## 安装配置

### 1. 获取 API Key

前往 [MiniMax 开放平台](https://platform.minimaxi.com/) → 账户管理 → 接口密钥

### 2. 配置 API Key

```bash
# 方式一：环境变量
export MINIMAX_API_KEY="your-api-key"

# 方式二：配置文件
echo '{"api_key": "your-api-key"}' > ~/.minimax_config.json
```

### 3. 使用方法

```bash
# 文本对话
minimax chat "你好，请介绍一下自己"

# 语音合成
minimax tts "这是一段测试语音" --voice  male-qn-qingse --output test.mp3

# 视频生成（文生视频）
minimax video "一只猫在草地上奔跑" --output cat.mp4

# 图片生成
minimax image "一只可爱的柯基犬" --output corgi.png

# 音乐生成
minimax music "欢快的电子音乐，适合游戏背景音乐" --output bgm.mp3
```

## API 详细说明

### 文本对话 (Chat)

**接口**: `POST https://api.minimaxi.com/v1/text/chatcompletion_v2`

**模型列表**:
- `MiniMax-M2.5` - 顶尖性能与极致性价比
- `MiniMax-M2.5-highspeed` - M2.5 高速版
- `MiniMax-M2.1` - 强大多语言编程能力
- `MiniMax-M2` - 高效编码与Agent工作流
- `M2-her` - 角色扮演、多轮对话专用

**示例请求**:
```json
{
  "model": "MiniMax-M2.5",
  "messages": [
    {"role": "system", "content": "你是一个 helpful assistant"},
    {"role": "user", "content": "你好"}
  ],
  "temperature": 0.7,
  "max_tokens": 2048
}
```

### 语音合成 (T2A)

**接口**: `POST https://api.minimaxi.com/v1/t2a_v2`

**模型**:
- `speech-2.8-hd` - 新一代HD模型，精准还原语气细节
- `speech-2.8-turbo` - 极速响应，语气表达生动
- `speech-2.6-hd` - 极致音质与韵律
- `speech-2.6-turbo` - 超低时延

**音色 ID 列表**:
- 中文男声: `male-qn-qingse`, `male-qn-jingying`, `male-qn-badao`
- 中文女声: `female-shaonv`, `female-yujie`, `female-chengshu`
- 英文: `english-male`, `english-female`

**文本控制标签**:
- 停顿: `<#1.5#>` (停顿1.5秒)
- 语气词: `(laughs)`, `(breath)`, `(sighs)`, `(coughs)` 等 (仅2.8系列)

### 视频生成 (Hailuo)

**接口**: `POST https://api.minimaxi.com/v1/video_generation`

**模型**:
- `MiniMax Hailuo 2.3` - 最新视频模型，物理表现突破
- `MiniMax Hailuo 2.3 Fast` - 更快更优惠
- `MiniMax Hailuo 02` - 1080p 原生，SOTA 指令遵循

**参数**:
- `prompt` - 视频描述
- `duration` - 时长(5s/10s)
- `aspect_ratio` - 比例(16:9/9:16/1:1)

### 图片生成

**接口**: `POST https://api.minimaxi.com/v1/image_generation`

**模型**:
- `image-01` - 画面表现细腻
- `image-01-live` - 手绘/卡通画风增强

### 音乐生成

**接口**: `POST https://api.minimaxi.com/v1/music_generation`

**模型**: `music-2.5` - 全维度突破，指挥细节

## CLI 工具使用

### 全局命令

```bash
# 查看帮助
minimax --help

# 查看各子命令帮助
minimax chat --help
minimax tts --help
minimax video --help
```

### 文本对话

```bash
# 简单对话
minimax chat "你好"

# 指定模型
minimax chat "写一段Python代码" --model MiniMax-M2.1

# 流式输出
minimax chat "讲一个故事" --stream

# 多轮对话（保留上下文）
minimax chat "你好" --session my_session
minimax chat "刚才说了什么" --session my_session
```

### 语音合成

```bash
# 基础合成
minimax tts "这是一段测试语音"

# 指定音色
minimax tts "你好世界" --voice female-shaonv

# 指定模型和格式
minimax tts "高清语音测试" --model speech-2.8-hd --format wav

# 长文本（自动分段）
minimax tts "很长的文本..." --long-text

# 带语气词
minimax tts "这真是太好了(laughs)" --model speech-2.8-hd
```

### 视频生成

```bash
# 文生视频
minimax video "夕阳下的海滩，海浪拍打着沙滩"

# 指定参数
minimax video "一只熊猫在吃竹子" --duration 10 --ratio 16:9

# 查询任务状态
minimax video-status --id task_xxx

# 下载完成的视频
minimax video-download --id task_xxx --output panda.mp4
```

### 图片生成

```bash
# 文生图
minimax image "科幻城市夜景，赛博朋克风格"

# 图生图
minimax image "转换为油画风格" --image input.jpg

# 指定画风
minimax image "可爱的猫咪" --style cartoon
```

### 音乐生成

```bash
# 生成音乐
minimax music "轻快的钢琴曲，适合学习时听"

# 指定时长
minimax music "史诗级交响乐" --duration 60

# 参考音频
minimax music "类似这首的风格" --reference ref.mp3
```

## OpenClaw 集成

本 Skill 注册以下工具供 OpenClaw 直接调用：

```yaml
minimax_chat: 文本对话
minimax_tts: 语音合成
minimax_video: 视频生成
minimax_image: 图片生成
minimax_music: 音乐生成
```

**使用示例**:

```
用户: 用 MiniMax 生成一段语音说"你好世界"
→ 调用 minimax_tts("你好世界")

用户: 用海螺生成一个猫咪视频
→ 调用 minimax_video("一只可爱的猫咪")

用户: 调用 MiniMax M2.5 回答这个问题
→ 调用 minimax_chat("问题内容", model="MiniMax-M2.5")
```

## 技术规格

### 速率限制

| API | 限制 |
|-----|------|
| 文本对话 | 100 QPS |
| 语音合成 | 50 QPS |
| 视频生成 | 10 并发 |
| 图片生成 | 20 QPS |
| 音乐生成 | 10 QPS |

### 数据格式

- 文本: JSON
- 音频: MP3, WAV, FLAC
- 视频: MP4
- 图片: PNG, JPG, WebP
- 音乐: MP3

### 支持语言

文本模型支持 50+ 语言，语音合成支持中文（含粤语）、英语、日语、韩语、德语、法语、西班牙语等 30+ 语言。

## 错误处理

常见错误码：

| 错误码 | 说明 | 处理 |
|--------|------|------|
| 400 | 请求参数错误 | 检查参数格式 |
| 401 | API Key 无效 | 检查密钥配置 |
| 429 | 速率限制 | 降低请求频率 |
| 500 | 服务器错误 | 稍后重试 |
| 503 | 服务不可用 | 检查服务状态 |

## 定价参考

| 服务 | 计费方式 | 参考价格 |
|------|----------|----------|
| 文本对话 | tokens | ¥0.005-0.015/1K tokens |
| 语音合成 | 字符数 | ¥0.015/千字符 |
| 视频生成 | 秒数 | ¥0.5-2/秒 |
| 图片生成 | 张数 | ¥0.05-0.2/张 |
| 音乐生成 | 秒数 | ¥0.1/秒 |

> 实际价格以 MiniMax 官方定价为准。

## 版本历史

- v1.0.0 - 初始版本，支持全部 API

## 参考链接

- [MiniMax 开放平台](https://platform.minimaxi.com/)
- [API 文档](https://platform.minimaxi.com/docs)
- [音色列表](https://platform.minimaxi.com/docs/speech-reference)
