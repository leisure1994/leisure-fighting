#!/bin/bash

# 核战争城市自救地图 - 部署脚本
echo "🚀 开始部署核战争城市自救地图..."

# 检查 wrangler 是否安装
if ! command -v wrangler &> /dev/null; then
    echo "正在安装 wrangler..."
    npm install -g wrangler
fi

# 部署
echo "正在部署..."
wrangler pages deploy . --project-name=nuclear-survival-map --branch=main

echo "✅ 部署完成！"
