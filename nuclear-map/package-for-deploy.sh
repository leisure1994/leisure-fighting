#!/bin/bash
# 创建核战争城市自救地图部署包

set -e

PROJECT_DIR="/root/.openclaw/workspace/nuclear-map"
DEPLOY_DIR="$PROJECT_DIR/deployment"
OUTPUT="$PROJECT_DIR/nuclear-map-deployment.tar.gz"

echo "📦 创建部署包..."

# 确保所有最新文件已复制
echo "  - 检查最新文件..."

# 从 nuclear-survival-map 复制主要页面
cp /root/.openclaw/workspace/nuclear-survival-map/index.html $DEPLOY_DIR/index.html 2>/dev/null || true
cp /root/.openclaw/workspace/nuclear-survival-map/guide.html $DEPLOY_DIR/guide.html 2>/dev/null || true
cp /root/.openclaw/workspace/nuclear-survival-map/supplies.html $DEPLOY_DIR/supplies.html 2>/dev/null || true
cp /root/.openclaw/workspace/nuclear-survival-map/skills.html $DEPLOY_DIR/skills.html 2>/dev/null || true

# 复制数据文件
cp /root/.openclaw/workspace/nuclear-survival-map/data/city-data.js $DEPLOY_DIR/data/city-data.js 2>/dev/null || true
cp /root/.openclaw/workspace/nuclear-survival-map/data/city-data-batch2.js $DEPLOY_DIR/data/city-data-batch2.js 2>/dev/null || true

# 创建部署包
echo "  - 打包文件..."
cd $PROJECT_DIR
tar -czf $OUTPUT -C deployment .

echo "✅ 部署包创建完成: $OUTPUT"
echo "📊 文件大小: $(du -h $OUTPUT | cut -f1)"
echo ""
echo "包含文件:"
tar -tzf $OUTPUT | head -20
echo "  ... (共 $(tar -tzf $OUTPUT | wc -l) 个文件)"
