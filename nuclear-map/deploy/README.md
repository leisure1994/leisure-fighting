# 核战争城市自救地图 - 部署指南

## 项目简介

核战争城市自救地图是一个面向中国用户的核战争生存信息平台，提供全国主要城市地下避难所、人防工程的可视化地图查询服务。

**域名**: https://a-art.top/nuclear-map/

## 快速部署

### 方法一：Docker Compose 部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/nuclear-map/nuclear-map.git
cd nuclear-map

# 2. 运行部署脚本
sudo ./deploy/scripts/deploy.sh

# 3. 访问网站
# http://localhost:3000/nuclear-map/
```

### 方法二：手动部署

```bash
# 1. 安装依赖
npm install

# 2. 构建项目
npm run build

# 3. 复制到服务器
scp -r dist/* user@server:/usr/share/nginx/html/nuclear-map/
```

### 方法三：Kubernetes 部署

```bash
# 应用 K8s 配置
kubectl apply -f deploy/kubernetes/

# 查看部署状态
kubectl get pods -l app=nuclear-map
```

## 目录结构

```
deploy/
├── docker/
│   ├── Dockerfile           # Docker 构建文件
│   ├── docker-compose.yml   # Docker Compose 配置
│   └── nginx.conf          # Nginx 配置
├── nginx/
│   ├── nginx.conf          # 主 Nginx 配置
│   ├── security.conf       # 安全头配置
│   └── ssl/                # SSL 证书目录
├── scripts/
│   ├── deploy.sh           # 一键部署脚本
│   ├── backup.sh           # 备份脚本
│   └── health-check.sh     # 健康检查脚本
└── kubernetes/
    └── k8s-deployment.yaml # K8s 部署配置
```

## 管理命令

```bash
# 查看日志
docker-compose -f deploy/docker/docker-compose.yml logs -f

# 重启服务
docker-compose -f deploy/docker/docker-compose.yml restart

# 停止服务
docker-compose -f deploy/docker/docker-compose.yml down

# 创建备份
./deploy/scripts/backup.sh

# 健康检查
./deploy/scripts/health-check.sh
```

## SSL 证书配置

### 使用 Let's Encrypt（推荐）

```bash
# 安装 certbot
sudo apt install certbot

# 获取证书
sudo certbot certonly --standalone -d a-art.top -d www.a-art.top

# 自动续期已配置在 deploy.sh 中
```

### 使用自签名证书（测试用）

```bash
# 生成自签名证书
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout deploy/nginx/ssl/a-art.top.key \
  -out deploy/nginx/ssl/a-art.top.crt \
  -subj "/CN=a-art.top"
```

## 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `TZ` | 时区 | `Asia/Shanghai` |

## 性能优化

- 静态资源启用 Gzip/Brotli 压缩
- 图片资源使用 WebP 格式
- 启用浏览器缓存（6个月）
- CDN 加速静态资源

## 监控

访问以下地址查看监控：

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001

## 安全建议

1. 使用 HTTPS 强制跳转
2. 配置 CSP 内容安全策略
3. 定期更新依赖
4. 启用自动备份
5. 配置防火墙规则

## 故障排除

### 无法访问网站

```bash
# 检查容器状态
docker ps | grep nuclear-map

# 查看错误日志
docker-compose logs nuclear-map

# 检查端口占用
sudo netstat -tlnp | grep 3000
```

### SSL 证书问题

```bash
# 检查证书有效期
openssl x509 -in deploy/nginx/ssl/a-art.top.crt -noout -dates

# 手动续期证书
sudo certbot renew
```

## 联系支持

如有问题，请联系：admin@a-art.top