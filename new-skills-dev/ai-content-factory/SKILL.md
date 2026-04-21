---
name: ai-content-factory
description: |
  AI内容生成工厂 - 批量生产图文视频内容的自动化工具。
  集成MiniMax TTS、Seedance视频生成、图文排版，支持内容日历管理。
  
  Use when: (1) 需要批量生成短视频, (2) 需要TTS语音合成,
  (3) 需要AI视频生成, (4) 需要内容日历管理, (5) 需要自动化内容生产。
  
  触发关键词: 内容工厂, 批量生成, TTS, 视频生成, 内容日历
---

# AI内容生成工厂 v1.0

> **一人即团队，批量生产内容**

## 功能特性

### 🎙️ 批量语音合成
- MiniMax TTS集成
- 多音色批量生成
- 长文本自动分段
- 批量导出MP3

### 🎬 AI视频生成
- Seedance 2.0集成
- 文生视频批量生产
- 图生视频动画化
- 视频模板复用

### 📝 图文排版
- 自动图文混排
- 多平台格式适配
- 一键导出多尺寸

### 📅 内容日历
- 排期管理
- 自动发布
- 多平台同步

## 快速开始

### 1. 配置API密钥

```bash
cp config.example.json config.json
# 编辑 config.json，填入API密钥
```

### 2. 准备内容脚本

```bash
# 创建文本文件，每行一个内容
cat > scripts.txt << EOF
欢迎来到我们的频道，今天分享一个实用技巧
大家好，今天介绍一款超好用的工具
EOF
```

### 3. 批量生成

```bash
# 批量生成语音
./content-factory.sh tts --input scripts.txt --voice female-shaonv

# 批量生成视频
./content-factory.sh video --input prompts.txt --duration 10
```

## 使用示例

### 示例1: 批量TTS生成

```bash
# 生成100条语音
./content-factory.sh tts \
    --input texts.txt \
    --voice female-shaonv \
    --output ./audio/ \
    --batch-size 100
```

### 示例2: 批量视频生成

```bash
# 基于脚本生成视频
./content-factory.sh video-batch \
    --script scripts.csv \
    --template product_showcase \
    --output ./videos/
```

### 示例3: 完整内容生产

```bash
# 从选题到成片一键完成
./content-factory.sh produce \
    --topic "产品推广" \
    --count 10 \
    --platforms douyin,xiaohongshu
```

## 价格

**¥199** - 单项目永久授权

包含：
- 完整源码
- 视频教程
- 3个月技术支持

---

**内容生产的工业化时代。**
