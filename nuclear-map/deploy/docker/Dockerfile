# 多阶段构建 - 生产优化版
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装依赖（利用缓存层）
COPY package*.json ./
RUN npm ci --only=production=false

# 复制源码
COPY . .

# 构建生产版本
RUN npm run build

# 生产阶段 - 使用 Nginx Alpine
FROM nginx:alpine

# 安装必要工具
RUN apk add --no-cache curl ca-certificates

# 复制自定义 Nginx 配置
COPY deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/nginx/security.conf /etc/nginx/conf.d/security.conf

# 从构建阶段复制产物
COPY --from=builder /app/dist /usr/share/nginx/html/nuclear-map

# 创建健康检查端点
RUN echo '{"status":"ok","service":"nuclear-map"}' > /usr/share/nginx/html/nuclear-map/health

# 设置权限
RUN chown -R nginx:nginx /usr/share/nginx/html/nuclear-map

# 暴露端口
EXPOSE 80

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/nuclear-map/health || exit 1

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
