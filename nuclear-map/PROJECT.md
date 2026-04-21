# 核战争城市自救地图 - 项目总览

## 项目状态

**完成时间**: 2026年4月16日  
**版本**: v1.0  
**部署目标**: https://a-art.top/nuclear-map/

---

## 模块完成情况

### ✅ 1. 数据收集模块
- **状态**: 已完成
- **覆盖城市**: 北京、上海、广州、深圳、成都、重庆、武汉、西安、南京、杭州
- **数据结构**: JSON格式，包含避难所名称、地址、坐标、类型、容量
- **文件位置**: `/nuclear-map/data/`

### ✅ 2. 前端可视化模块  
- **状态**: 已完成
- **技术栈**: Leaflet.js + 原生 CSS/JS
- **核心功能**:
  - 交互式地图（街道/卫星/暗黑模式）
  - 避难所标记与聚类
  - 城市搜索与筛选
  - 移动端适配
  - 紧急模式
- **文件位置**: `/nuclear-map/frontend/`

### ✅ 3. 生存指南模块
- **状态**: 已完成
- **内容规模**: 约2万字，5大章节
- **核心内容**:
  - 核战争基础知识
  - 地下避难所选择指南
  - 30天应急物资清单
  - 生存技能教程（辐射防护、急救、净水等）
  - 核爆后72小时行动指南
- **文件位置**: `/nuclear-map/guide/`

### ✅ 4. 部署准备模块
- **状态**: 已完成
- **支持方案**: Docker / Kubernetes / Nginx / 静态托管
- **特色功能**: SSL自动续期、监控告警、安全防护
- **文件位置**: `/nuclear-map/deploy/`

---

## 快速部署

### 方式一：Docker Compose（推荐）

```bash
cd /root/.openclaw/workspace/nuclear-map/deploy
sudo ./scripts/deploy.sh
```

### 方式二：静态文件部署

```bash
# 复制前端文件到网站目录
sudo cp -r /root/.openclaw/workspace/nuclear-map/frontend/* /var/www/a-art.top/nuclear-map/

# 复制生存指南
sudo cp -r /root/.openclaw/workspace/nuclear-map/guide/* /var/www/a-art.top/nuclear-map/guide/
```

---

## 项目结构

```
nuclear-map/
├── data/              # 城市避难所数据
│   ├── beijing.json
│   ├── shanghai.json
│   ├── chengdu.json
│   ├── chongqing.json
│   └── ...
├── frontend/          # 前端可视化
│   ├── index.html
│   ├── css/style.css
│   ├── js/
│   │   ├── app.js
│   │   ├── map.js
│   │   ├── shelters.js
│   │   └── guide.js
│   └── data/
├── guide/             # 生存指南文档
│   ├── nuclear-survival-guide-part1.md
│   └── nuclear-survival-guide-part2.md
└── deploy/            # 部署配置
    ├── docker/
    ├── nginx/
    ├── kubernetes/
    └── scripts/
```

---

## 数据来源说明

本地图数据来源于：
- 各市政府公开的人防工程信息
- 国防动员办公室公告
- 高德地图可查询的地下工程数据
- 地铁站、地下商场公开信息

**免责声明**: 本地图仅供参考，实际避难时请以当地政府发布的官方信息为准。

---

## 后续优化方向

1. **数据扩充**: 增加更多二三线城市数据
2. **实时信息**: 接入官方应急广播API
3. **用户反馈**: 添加避难所状态上报功能
4. **离线支持**: 开发PWA离线版本
5. **多语言**: 增加英文版本

---

*为和平时期准备，愿永不需要使用。*
