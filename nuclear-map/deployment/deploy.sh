#!/bin/bash
# Netlify 部署脚本 - 需要先登录

echo "=== 核战争城市自救地图 - Netlify 部署脚本 ==="
echo ""

# 检查是否已登录
npx netlify-cli status 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  未检测到 Netlify 登录状态"
    echo "请运行: npx netlify-cli login"
    echo "或者设置环境变量: export NETLIFY_AUTH_TOKEN=your_token"
    echo ""
    echo "获取 Token 步骤:"
    echo "1. 访问 https://app.netlify.com/user/applications/personal"
    echo "2. 生成 New access token"
    echo "3. 复制 token 并设置环境变量"
    exit 1
fi

# 初始化/链接站点（如果还没链接）
if [ ! -f .netlify/state.json ]; then
    echo "🔗 链接到 Netlify 站点..."
    npx netlify-cli link --id=$NETLIFY_SITE_ID 2>/dev/null || npx netlify-cli init --manual
fi

# 执行部署
echo "🚀 开始部署..."
npx netlify-cli deploy --prod --dir=. --message="核战争城市自救地图 - $(date '+%Y-%m-%d %H:%M')"

echo ""
echo "✅ 部署完成！"