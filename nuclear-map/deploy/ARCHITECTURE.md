# 核战争城市自救地图 - 部署架构设计文档

## 项目概述

**项目名称**: Nuclear Survival Map / 核战生存地图  
**部署域名**: https://a-art.top/nuclear-map/  
**技术栈**: React + TypeScript + Leaflet + Vite + Docker + Nginx

## 架构设计

### 1. 文件结构

```
nuclear-map/
├── deploy/                     # 部署配置
│   ├── docker/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── nginx.conf
│   ├── nginx/
│   │   ├── nginx.conf          # 主配置
│   │   ├── ssl.conf            # SSL配置
│   │   └── security.conf       # 安全头配置
│   ├── scripts/
│   │   ├── deploy.sh           # 一键部署脚本
│   │   ├── backup.sh           # 备份脚本
│   │   └── health-check.sh     # 健康检查
│   └── kubernetes/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
├── src/
│   ├── components/             # React组件
│   ├── pages/                  # 页面
│   ├── styles/                 # 样式
│   ├── assets/                 # 静态资源
│   └── data/                   # 地图数据
├── public/
│   ├── shelter-data/           # 避难所数据
│   └── assets/                 # 静态资源
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 2. 技术选型

- **前端框架**: React 18 + TypeScript
- **地图引擎**: Leaflet.js (开源，支持自定义图层)
- **构建工具**: Vite (极速构建)
- **样式**: TailwindCSS + 自定义生存主题
- **路由**: React Router v6
- **状态管理**: Zustand
- **图标**: Lucide React
- **地图数据**: GeoJSON + 自定义避难所数据集

### 3. 部署方案

#### 方案A: Docker Compose (推荐，中小型部署)
- 单服务器部署
- 包含 Nginx 反向代理
- SSL 自动续期
- 简单维护

#### 方案B: Kubernetes (大规模部署)
- 高可用集群
- 自动扩缩容
- 服务网格支持

#### 方案C: 静态托管 (CDN加速)
- Cloudflare Pages / Vercel
- 边缘缓存
- 全球加速

## UI设计风格

### 视觉主题: "废墟中的希望"

#### 配色方案
```css
/* 主色调 - 辐射警告 */
--color-primary: #FF6B35;        /* 警报橙 */
--color-secondary: #1A1A2E;      /* 深夜蓝 */
--color-background: #0F0F1A;     /* 深空黑 */
--color-surface: #16213E;        /* 面板色 */
--color-text: #EAEAEA;           /* 高亮文本 */
--color-text-muted: #8892A0;     /* 辅助文本 */
--color-success: #00D9FF;        /* 生存蓝 */
--color-warning: #FFB800;        /* 警告黄 */
--color-danger: #FF2E63;         /* 危险红 */
--color-grid: #2D3748;           /* 网格线 */
```

#### 视觉元素
- **扫描线效果**: 模拟CRT显示器
- **闪烁光标**: 终端风格
- **辐射符号**: 装饰性元素
- **网格背景**: 军事地图风格
- **等宽字体**: 数据展示使用 JetBrains Mono
- **毛玻璃效果**: 现代UI与传统风格融合

### 交互设计

1. **地图交互**
   - 缩放级别自适应标记密度
   - 点击标记展开详细信息卡片
   - 热力图显示避难所分布密度
   - 路径规划功能

2. **搜索功能**
   - 城市快速搜索
   - 设施类型筛选
   - 容量/距离排序

3. **响应式布局**
   - 移动端优先
   - 侧边栏可折叠
   - 全屏地图模式

## SEO 与社交分享

### SEO配置
- 结构化数据 (Schema.org)
- Open Graph 标签
- Twitter Cards
- 站点地图自动生成
- robots.txt 配置

### 社交分享预览
- 自定义分享图片
- 描述性元标签
- 中文/英文双语支持

## 性能优化

- 代码分割 (Code Splitting)
- 懒加载 (Lazy Loading)
- 图片/WebP 优化
- 缓存策略
- CDN 加速
- 服务端压缩 (gzip/brotli)

## 安全考虑

- HTTPS 强制
- CSP 内容安全策略
- XSS 防护
- 数据备份策略
- DDoS 防护
