#!/bin/bash
# ============================================
# 核战争城市自救地球仪 - 部署脚本
# ============================================

set -e

echo "🚀 核战争城市自救地球仪部署脚本"
echo "================================"

# 配置
LOCAL_DIR="/root/.openclaw/workspace/nuclear-survival-globe"
REMOTE_HOST="a-art.top"
REMOTE_USER="root"
REMOTE_DIR="/var/www/a-art.top/nuclear-globe"
OSS_BUCKET="a-art-top"
OSS_ENDPOINT="oss-cn-hangzhou.aliyuncs.com"

# 检查本地文件
echo "📁 检查本地文件..."
if [ ! -f "$LOCAL_DIR/index.html" ]; then
    echo "❌ 错误: index.html 不存在"
    exit 1
fi

if [ ! -f "$LOCAL_DIR/data.js" ]; then
    echo "❌ 错误: data.js 不存在"
    exit 1
fi

CITY_COUNT=$(grep -oP '^\s*"[a-z_]+"\s*:\s*\{' $LOCAL_DIR/data.js | wc -l)
echo "✓ 数据文件包含 $CITY_COUNT 个城市"

# 计算文件大小
DATA_SIZE=$(du -h $LOCAL_DIR/data.js | cut -f1)
echo "✓ 数据文件大小: $DATA_SIZE"

# 部署方式选择
echo ""
echo "请选择部署方式:"
echo "1. SCP 上传到服务器 (需要SSH密钥)"
echo "2. OSS 上传到阿里云 (需要ossutil)"
echo "3. 本地预览 (http-server)"
echo ""

# 默认使用OSS部署
echo "🌐 使用阿里云OSS部署..."

# 检查ossutil
if ! command -v ossutil &> /dev/null; then
    echo "⚠️ 未找到ossutil，尝试安装..."
    wget -q https://gosspublic.alicdn.com/ossutil/1.7.15/ossutil64 -O /tmp/ossutil64
    chmod 755 /tmp/ossutil64
    OSSUTIL="/tmp/ossutil64"
else
    OSSUTIL="ossutil"
fi

# 配置OSS (使用环境变量或配置文件)
if [ -f "$HOME/.ossutilconfig" ]; then
    echo "✓ 找到OSS配置文件"
else
    echo "⚠️ 警告: 未找到OSS配置文件，可能需要手动配置"
fi

# 上传文件
echo "📤 上传文件到OSS..."
$OSSUTIL cp -r -f $LOCAL_DIR/index.html oss://$OSS_BUCKET/nuclear-globe/
$OSSUTIL cp -r -f $LOCAL_DIR/data.js oss://$OSS_BUCKET/nuclear-globe/

# 上传app.js (如果存在)
if [ -f "$LOCAL_DIR/app.js" ]; then
    $OSSUTIL cp -r -f $LOCAL_DIR/app.js oss://$OSS_BUCKET/nuclear-globe/
fi

# 上传其他资源文件
for file in $LOCAL_DIR/*.js; do
    if [ -f "$file" ]; then
        filename=$(basename $file)
        echo "  上传: $filename"
        $OSSUTIL cp -r -f $file oss://$OSS_BUCKET/nuclear-globe/ 2>/dev/null || true
    fi
done

echo ""
echo "✅ 部署完成!"
echo "🌐 访问地址: https://a-art.top/nuclear-globe/"
echo ""
echo "部署时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "数据版本: $CITY_COUNT 个城市"
