# 核战争城市自救地图 - 多平台部署指南

## 快速部署选项

### 选项1: Netlify (推荐，无需服务器)
```bash
cd /root/.openclaw/workspace/nuclear-map/deployment
npx netlify-cli deploy --prod --dir=. --site=nuclear-map-china
```

### 选项2: Vercel
```bash
cd /root/.openclaw/workspace/nuclear-map/deployment
npx vercel --prod
```

### 选项3: Cloudflare Pages
```bash
cd /root/.openclaw/workspace/nuclear-map/deployment
npx wrangler pages deploy . --project-name=nuclear-map
```

### 选项4: 自建服务器 (a-art.top)
```bash
cd /root/.openclaw/workspace/nuclear-map
./deploy.sh
```

## 项目结构

```
nuclear-map/
├── deployment/          # 生产就绪文件
│   ├── index.html      # 主页面
│   ├── css/            # 样式
│   ├── js/             # JavaScript
│   ├── data/           # 地图数据
│   └── images/         # 图片资源
├── src/                # 源代码
├── deploy/             # 部署配置
└── DEPLOY_MANUAL.md    # 详细部署说明
```

## 数据覆盖城市

北京、上海、广州、深圳、成都、重庆、武汉、西安、南京、杭州

## 部署包

- `nuclear-map-deployment.tar.gz` (51KB) - 精简部署包
- `nuclear-map-v1.0.tar.gz` (131KB) - 完整项目

## 生产环境URL

部署后可访问:
- `https://your-domain/nuclear-map/`

## 注意事项

1. 地图使用高德地图瓦片，无需额外API Key
2. 数据为静态JSON，可完全离线使用
3. 支持PWA，可添加至主屏幕
