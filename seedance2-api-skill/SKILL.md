---
name: seedance2-api
description: |
  火山引擎 Seedance 2.0 视频生成 API Skill。支持文生视频、图生视频、多模态参考生成、
  视频编辑、视频延长、首尾帧图生视频、虚拟人像等全部能力。
  
  Use when: (1) 需要生成高质量 AI 视频, (2) 需要视频编辑/修改, (3) 需要视频延长/续写,
  (4) 需要使用虚拟人像生成视频, (5) 需要多模态（图文音视频）参考生成视频。
  
  触发关键词: seedance, 火山引擎, 视频生成, 文生视频, 图生视频, doubao-seedance
---

# Seedance 2.0 API Skill

> **火山引擎 Seedance 2.0 —— 导演级 AI 视频生成模型**

## 概述

Seedance 2.0 是字节跳动 Seed 团队推出的多模态视频生成模型，采用多模态音视频联合生成架构，支持：

- **文生视频** - 纯文本描述生成视频
- **图生视频** - 单张图片生成视频（首帧/尾帧控制）
- **多模态参考** - 组合图文音视频素材生成视频
- **视频编辑** - 替换主体、增删改元素、局部重绘
- **视频延长** - 向前/向后延长视频、多视频串联
- **虚拟人像** - 使用预置虚拟人像生成含人脸视频

### 核心优势

- **导演级控制** - 精确的镜头运动、物理模拟、角色一致性
- **原生声画同步** - 自动生成匹配画面的音频
- **多模态输入** - 支持文本、图片、音频、视频四种模态
- **生产级质量** - 支持 1080p/2K 输出，适用于商业内容制作

## 前置要求

1. **火山引擎账号** - 注册并登录 [火山引擎](https://www.volcengine.com/)
2. **开通模型** - 账户余额 ≥ 200 元才能开通 Seedance 2.0
3. **API Key** - 在 [API Key 管理](https://console.volcengine.com/ark/region:ark+cn-beijing/apikey) 创建

## 安装配置

### 1. 配置 API Key

```bash
# 方式一：环境变量
export ARK_API_KEY="your-api-key"

# 方式二：配置文件
echo '{"api_key": "your-api-key"}' > ~/.seedance_config.json
```

### 2. 使用方法

```bash
# 文生视频
seedance video "夕阳下的海滩，海浪拍打着沙滩"

# 图生视频
seedance video "让图片1中的风景动起来" --image input.jpg

# 视频编辑
seedance edit "将视频1中的香水换成面霜" --video input.mp4

# 视频延长
seedance extend "向后延长视频1，展示后续画面" --video input.mp4

# 使用虚拟人像
seedance avatar "asset-20260401123823-6d4x2" "美妆博主介绍产品"
```

## API 详细说明

### 接口地址

```
Base URL: https://ark.cn-beijing.volces.com/api/v3
```

### 模型 ID

| 模型 | ID | 说明 |
|------|-----|------|
| Seedance 2.0 | doubao-seedance-2-0-260128 | 最高质量，推荐首选 |
| Seedance 2.0 Fast | doubao-seedance-2-0-fast-260128 | 更快更省成本 |

### 认证方式

```
Authorization: Bearer {ARK_API_KEY}
Content-Type: application/json
```

### 创建视频生成任务

**接口**: `POST /content_generation/tasks`

**请求体**:
```json
{
  "model": "doubao-seedance-2-0-260128",
  "content": [
    {"type": "text", "text": "提示词"},
    {"type": "image_url", "image_url": {"url": "https://..."}, "role": "reference_image"},
    {"type": "video_url", "video_url": {"url": "https://..."}, "role": "reference_video"},
    {"type": "audio_url", "audio_url": {"url": "https://..."}, "role": "reference_audio"}
  ],
  "generate_audio": true,
  "ratio": "16:9",
  "duration": 5,
  "watermark": true
}
```

**参数说明**:

| 参数 | 类型 | 说明 |
|------|------|------|
| model | string | 模型ID |
| content | array | 输入内容数组 |
| content[].type | string | text/image_url/video_url/audio_url |
| content[].role | string | reference_image/first_frame/last_frame/reference_video/reference_audio |
| generate_audio | boolean | 是否生成音频 |
| ratio | string | 视频比例: 16:9/9:16/1:1/adaptive |
| duration | integer | 时长秒数: 5/10/11 |
| watermark | boolean | 是否显示水印 |

### 查询任务状态

**接口**: `GET /content_generation/tasks/{task_id}`

**响应**:
```json
{
  "id": "task_xxx",
  "status": "succeeded",
  "content": {
    "video_url": "https://..."
  },
  "usage": {
    "completion_tokens": 1234
  }
}
```

## CLI 工具使用

### 全局命令

```bash
# 查看帮助
seedance --help

# 查看账户状态
seedance status
```

### 文生视频 (text2video)

```bash
# 基础用法
seedance video "夕阳下的海滩"

# 指定参数
seedance video "科幻城市夜景" --duration 10 --ratio 16:9 --model fast

# 开启联网搜索
seedance video "最新的科技产品展示" --web-search

# 保存到指定文件
seedance video "猫咪玩耍" --output cat.mp4
```

### 图生视频 (image2video)

```bash
# 单张图片生成视频
seedance video "让画面动起来" --image photo.jpg

# 指定图片作为首帧
seedance video "从图片1开始，展示花朵绽放" --image flower.jpg --role first_frame

# 首尾帧控制
seedance video "从图片1渐变到图片2" --image-start start.jpg --image-end end.jpg
```

### 多模态参考 (multimodal)

```bash
# 图片+文本
seedance multi \
  --text "美妆博主介绍产品" \
  --image avatar.jpg \
  --image product.jpg \
  --output ad.mp4

# 视频+音频+文本
seedance multi \
  --text "参考视频1的动作，使用音频1的音色" \
  --video dance.mp4 \
  --audio voice.mp3 \
  --output result.mp4

# 完整多模态
seedance multi \
  --text "第一人称果茶广告" \
  --image scene1.jpg \
  --image scene2.jpg \
  --video camera.mp4 \
  --audio bgm.mp3 \
  --duration 11
```

### 视频编辑 (edit)

```bash
# 替换主体
seedance edit "将视频1中的香水换成图片1中的面霜" \
  --video input.mp4 \
  --image cream.jpg

# 修改颜色
seedance edit "将面霜颜色修改为白色" --video input.mp4

# 增加元素
seedance edit "在画面中添加一束光" --video input.mp4

# 删除元素
seedance edit "去除背景中的路人" --video input.mp4
```

### 视频延长 (extend)

```bash
# 向后延长
seedance extend "向后延长视频1，展示后续画面" --video input.mp4

# 向前延长
seedance extend "向前延长视频1，添加开场镜头" --video input.mp4 --direction prepend

# 多视频串联
seedance extend "视频1中的拱形窗户打开，接视频2进入室内，再接视频3" \
  --video clip1.mp4 \
  --video clip2.mp4 \
  --video clip3.mp4
```

### 虚拟人像 (avatar)

```bash
# 使用虚拟人像生成视频
seedance avatar "asset-20260401123823-6d4x2" \
  "美妆博主面带笑容，向镜头介绍面霜"

# 自定义素材+虚拟人像
seedance avatar "asset-xxx" \
  "博主展示图片1中的产品" \
  --image product.jpg
```

## 提示词技巧

### 素材引用格式

提示词中使用 `"素材类型+序号"` 引用素材：

- `图片 1` - content 数组中第 1 个 image_url
- `视频 1` - content 数组中第 1 个 video_url  
- `音频 1` - content 数组中第 1 个 audio_url

### 多模态参考写法

```
参考「图片 1」中的美妆博主形象
参考「视频 1」的第一人称运镜方式
参考「音频 1」的女生音色
```

### 镜头控制

```
固定机位，近景镜头
缓慢推进，特写面部表情
快速切镜，展示不同角度
第一人称视角
俯拍全景
```

### 时间轴控制

```
0-2 秒：开场镜头...
2-5 秒：产品特写...
5-8 秒：使用展示...
尾帧定格为图片 2
```

## OpenClaw 集成

本 Skill 注册以下工具供 OpenClaw 直接调用：

```yaml
seedance_video: 视频生成（文生/图生/多模态）
seedance_edit: 视频编辑
seedance_extend: 视频延长
seedance_avatar: 虚拟人像生成
seedance_status: 查询任务状态
```

**使用示例**:

```
用户: 用 Seedance 生成一个 10 秒的科幻城市视频
→ 调用 seedance_video(prompt="科幻城市夜景", duration=10)

用户: 把这张图片变成视频
→ 调用 seedance_video(prompt="让画面动起来", image=input.jpg)

用户: 查看刚才视频任务的状态
→ 调用 seedance_status(task_id="xxx")
```

## 定价参考

| 模型 | 单价 |
|------|------|
| Seedance 2.0 | 46 元/百万 tokens |
| Seedance 2.0 Fast | 28 元/百万 tokens |

**约 15 秒视频 ≈ 15 元**（即常说的 "1秒1元"）

实际价格以 [火山方舟定价](https://console.volcengine.com/ark/pricing) 为准。

## 限制说明

- 账户余额需 ≥ 200 元才能开通
- 视频原始 URL 有效期 24 小时，建议转存到 TOS
- 不支持直接上传含真人面部的素材（需使用虚拟人像或真人认证）
- Seedance 2.0 生成的人脸视频 30 天内可用于二次创作

## 参考链接

- [Seedance 2.0 模型卡片](https://www.volcengine.com/docs/82379/)
- [API 文档](https://www.volcengine.com/docs/82379/2291680)
- [虚拟人像库](https://console.volcengine.com/ark/assets)
- [定价页面](https://console.volcengine.com/ark/pricing)

## 版本历史

- v1.0.0 - 初始版本，支持 Seedance 2.0 全部 API
