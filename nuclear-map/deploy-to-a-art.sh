#!/bin/bash
# 核战争城市自救地图 - 一键部署脚本
# 部署到 a-art.top/nuclear-map/

set -e

echo "🚀 开始部署核战争城市自救地图..."

# 配置
REMOTE_HOST="a-art.top"
REMOTE_USER="root"
REMOTE_DIR="/var/www/html/nuclear-map"
LOCAL_DEPLOYMENT="./deployment"

# 检查本地部署目录
if [ ! -d "$LOCAL_DEPLOYMENT" ]; then
    echo "❌ 错误: 找不到部署目录 $LOCAL_DEPLOYMENT"
    echo "请先运行 npm run build 或检查项目结构"
    exit 1
fi

echo "📦 部署文件准备就绪:"
echo "  - 覆盖城市: 30个"
echo "  - 避难所数据: 218条记录"
echo "  - 部署目标: $REMOTE_HOST:$REMOTE_DIR"

# 创建远程目录
echo "📁 创建远程目录..."
ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR"

# 同步文件
echo "🔄 同步文件到服务器..."
rsync -avz --delete --progress \
    --exclude='*.md' \
    --exclude='.git' \
    "$LOCAL_DEPLOYMENT/" \
    "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# 设置权限
echo "🔒 设置文件权限..."
ssh $REMOTE_USER@$REMOTE_HOST "chown -R www-data:www-data $REMOTE_DIR && chmod -R 755 $REMOTE_DIR"

echo "✅ 部署完成!"
echo ""
echo "🌐 访问地址:"
echo "  https://a-art.top/nuclear-map/"
echo ""
echo "📊 部署内容:"
echo "  - 前端页面: index.html"
echo "  - 城市数据: 30个城市JSON"
echo "  - 避难所数据: 218条记录"
echo "  - 生存指南: 完整核战生存教程"
