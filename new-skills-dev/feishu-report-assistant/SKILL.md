---
name: feishu-report-assistant
description: |
  飞书智能报表助手 - 自动化多维表格数据分析和报表生成。
  支持定时拉取数据、生成可视化报表、自动推送到飞书群。
  
  Use when: (1) 需要自动化生成业务报表, (2) 需要定时推送数据看板,
  (3) 需要多维表格数据分析, (4) 需要监控关键指标变化。
  
  触发关键词: 飞书报表, 多维表格, 自动化报表, 数据看板, 定时推送
---

# 飞书智能报表助手 v1.0

> **让数据自动说话，报表自动生成**

## 功能特性

### ✅ 自动数据采集
- 从飞书多维表格自动拉取数据
- 支持多种数据筛选条件
- 增量更新，避免重复处理

### ✅ 智能报表生成
- 自动生成数据摘要
- 支持柱状图/折线图/饼图
- 关键指标自动标红预警

### ✅ 定时推送
- 支持日报/周报/月报
- 自定义推送时间
- 推送到指定飞书群/个人

### ✅ 多数据源支持
- 飞书多维表格
- 飞书电子表格
- 自定义API数据源

## 快速开始

### 1. 安装配置

```bash
# 解压到 OpenClaw skills 目录
unzip feishu-report-assistant.zip -d ~/.openclaw/workspace/skills/

# 配置飞书授权
cp config.example.json config.json
# 编辑 config.json，填入你的飞书授权信息
```

### 2. 配置报表

```json
{
  "report_name": "销售日报",
  "data_source": {
    "type": "bitable",
    "app_token": "your_bitable_token",
    "table_id": "your_table_id"
  },
  "schedule": {
    "type": "daily",
    "time": "18:00"
  },
  "charts": [
    {"type": "bar", "field": "销售额", "group_by": "日期"},
    {"type": "line", "field": "订单量", "trend": true}
  ],
  "push": {
    "target": "chat_id",
    "chat_id": "oc_xxx"
  }
}
```

### 3. 启动报表生成

```bash
./scripts/generate-report.sh --config config.json
```

## 使用示例

### 示例1: 销售日报

```bash
# 生成今日销售报表
./feishu-report.sh --type daily --source sales_bitable

# 自动推送到销售群
--push-to-chat oc_sales_group
```

### 示例2: 周报自动生成

```bash
# 每周五18:00自动生成周报
./feishu-report.sh --type weekly --day fri --time 18:00
```

### 示例3: 自定义报表

```bash
# 生成自定义分析报表
./feishu-report.sh --config my_report.json --output report.html
```

## API 使用

```lua
-- 在 OpenClaw 中使用
local ReportAssistant = require("feishu-report-assistant")

-- 生成报表
local report = ReportAssistant.generate({
    source = "bitable://app_token/table_id",
    template = "daily_sales",
    push_to = "chat_id"
})

-- 定时任务
ReportAssistant.schedule({
    cron = "0 18 * * *",  -- 每天18:00
    report_config = "daily_report.json"
})
```

## 报表模板

内置模板：
- `daily_sales` - 销售日报
- `weekly_summary` - 周报汇总
- `kpi_dashboard` - KPI看板
- `custom` - 自定义模板

## 价格

**¥149** - 单项目永久授权

包含：
- 完整源码
- 使用文档
- 3个月技术支持

---

**让数据工作自动化，把时间留给更重要的事。**
