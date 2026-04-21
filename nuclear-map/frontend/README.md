# 核战争城市自救地图 - 前端可视化模块

## 项目概述

本项目是一个完整的核战争城市自救地图前端应用，提供以下核心功能：

- 🗺️ **交互式地图**：基于 Leaflet.js，支持中国主要城市的地下避难所/人防工程可视化
- 📍 **避难所标记**：在地图上标记地铁站、人防工程、地下停车场、地下商场等避难场所
- 🔍 **智能搜索**：支持城市搜索、避难所搜索、按类型筛选
- 📱 **移动端适配**：响应式设计，完美支持手机、平板等移动设备
- 📖 **生存指南**：内置完整的核战争生存指南，包括预警识别、紧急撤离、避难所选择、必备物资、生存技能、医疗急救

## 文件结构

```
nuclear-map/frontend/
├── index.html          # 主页面
├── css/
│   └── style.css       # 完整样式表（14,000+ 行）
├── js/
│   ├── app.js          # 主应用逻辑（25,000+ 字节）
│   ├── map.js          # 地图模块（14,000+ 字节）
│   ├── shelters.js     # 避难所数据管理（15,000+ 字节）
│   ├── search.js       # 搜索功能模块（13,000+ 字节）
│   ├── guide.js        # 生存指南模块（25,000+ 字节）
│   ├── mobile.js       # 移动端适配（9,900+ 字节）
│   └── utils.js        # 工具函数库（13,000+ 字节）
├── data/
│   ├── cities.js       # 中国城市数据（20,000+ 字节）
│   └── shelters.js     # 避难所示例数据（22,000+ 字节）
└── images/             # 图片资源目录
```

## 技术栈

- **地图引擎**：Leaflet.js 1.9.4
- **标记聚类**：Leaflet.markercluster
- **地图图层**：OpenStreetMap / CartoDB / 高德地图
- **UI框架**：原生 CSS + Font Awesome 图标
- **响应式设计**：CSS Variables + Flexbox + Grid

## 核心功能

### 1. 地图功能
- 支持街道图、卫星图、暗黑模式三种图层切换
- 标记聚类，优化大量避难所显示
- 点击标记弹出详细信息
- 支持缩放、平移、全屏
- 用户定位功能

### 2. 避难所类型
- 🚇 地铁站 - 深度大，防护最好
- 🏢 人防工程 - 专业防护结构
- 🅿️ 地下停车场 - 混凝土结构，防护较好
- 🛒 地下商场 - 空间较大
- 🏛️ 政府避难所 - 专门设计，设施齐全
- 🏥 医院防空设施 - 有医疗条件

### 3. 筛选功能
- 按城市/省份筛选
- 按避难所类型筛选
- 按容纳人数筛选
- 按距离筛选（移动端）

### 4. 生存指南
- 核爆预警识别
- 紧急撤离指南
- 避难所选择
- 72小时应急包清单
- 生存技能教程
- 医疗急救知识

## 使用说明

### 本地运行

1. 克隆或下载本项目
2. 用浏览器打开 `index.html` 即可运行
3. 无需后端服务，纯前端实现

### 部署到服务器

将 `frontend` 目录下的所有文件部署到任意 Web 服务器即可：

```bash
# Nginx 配置示例
server {
    listen 80;
    server_name nuclear-map.example.com;
    root /path/to/nuclear-map/frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 部署到 CDN

推荐使用 Vercel、Netlify、Cloudflare Pages 等免费 CDN 服务：

1. 将代码推送到 GitHub
2. 连接 Vercel/Netlify
3. 自动部署完成

## 数据扩展

### 添加新城市数据

编辑 `data/cities.js`，按格式添加城市信息：

```javascript
{ 
    name: '城市名', 
    province: '省份', 
    lat: 纬度, 
    lng: 经度, 
    pinyin: '拼音',
    tier: 城市等级
}
```

### 添加避难所数据

编辑 `data/shelters.js`，按格式添加避难所信息：

```javascript
{
    id: '唯一标识',
    name: '避难所名称',
    type: '类型(metro/air-raid/underground/shopping/government/hospital)',
    lat: 纬度,
    lng: 经度,
    address: '详细地址',
    city: '所属城市',
    province: '所属省份',
    capacity: 容纳人数,
    depth: '地下深度',
    resistance: '抗力等级',
    features: [设施列表],
    description: '详细描述',
    emergencyContact: '紧急联系电话',
    openingHours: '开放时间',
    accessibility: '准入说明'
}
```

## 浏览器兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome for Android 90+

## 移动端优化

- 触摸手势支持
- 底部导航栏
- 可滑动的列表面板
- 响应式布局适配
- 性能优化

## 紧急模式

点击右上角「紧急模式」按钮，进入全屏紧急界面：
- 寻找最近避难所
- 发送求救信号
- 快速查看生存指南

## 安全提示

⚠️ 本地图提供的是**示例数据**，实际使用时应：
1. 接入真实的城市人防工程数据库
2. 与当地民防部门核实避难所信息
3. 定期更新避难所状态和容量信息

## 开源协议

MIT License - 可自由使用、修改、分发

## 致谢

- Leaflet.js - 开源地图库
- OpenStreetMap - 开源地图数据
- Font Awesome - 图标库

---

**核战争城市自救地图** - 为和平时期准备，愿永不需要使用。
