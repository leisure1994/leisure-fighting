#!/bin/bash
# ========================================
# 核战争城市自救地图 - 一键部署脚本
# ========================================

set -e

PROJECT_DIR="/root/.openclaw/workspace/nuclear-map"
DEPLOY_PACKAGE="$PROJECT_DIR/nuclear-map-deployment.tar.gz"
SERVER_HOST="${SERVER_HOST:-a-art.top}"
SERVER_USER="${SERVER_USER:-root}"
SERVER_PATH="${SERVER_PATH:-/var/www/html}"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}  核战争城市自救地图 - 部署脚本${NC}"
echo -e "${YELLOW}========================================${NC}"

# 检查部署包
if [ ! -f "$DEPLOY_PACKAGE" ]; then
    echo -e "${RED}错误: 部署包不存在 $DEPLOY_PACKAGE${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 部署包已就绪: $DEPLOY_PACKAGE${NC}"
echo ""
echo "文件大小: $(du -h $DEPLOY_PACKAGE | cut -f1)"
echo ""

# 检查SSH可用性
echo -e "${YELLOW}检查SSH连接...${NC}"
if ! ssh -o ConnectTimeout=5 -o BatchMode=yes -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "echo 'SSH可用'" 2>/dev/null; then
    echo -e "${RED}✗ SSH连接失败 (需要密码或密钥)${NC}"
    echo ""
    echo "请使用以下方式之一部署:"
    echo ""
    echo "方式1 - 使用SSH密钥:"
    echo "  ssh-copy-id root@a-art.top"
    echo "  ./deploy.sh"
    echo ""
    echo "方式2 - 手动部署:"
    echo "  scp $DEPLOY_PACKAGE root@a-art.top:/tmp/"
    echo "  ssh root@a-art.top"
    echo "  cd /var/www/html && tar -xzf /tmp/nuclear-map-deployment.tar.gz && mv deployment nuclear-map"
    echo ""
    echo "方式3 - 查看详细说明:"
    echo "  cat $PROJECT_DIR/DEPLOY_MANUAL.md"
    exit 1
fi

# 上传部署包
echo -e "${YELLOW}上传部署包到服务器...${NC}"
scp -o StrictHostKeyChecking=no "$DEPLOY_PACKAGE" $SERVER_USER@$SERVER_HOST:/tmp/nuclear-map-deployment.tar.gz

# 解压部署
echo -e "${YELLOW}在服务器上部署...${NC}"
ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST << 'REMOTE_SCRIPT'
    cd /var/www/html
    
    # 备份旧版本
    if [ -d "nuclear-map" ]; then
        mv nuclear-map nuclear-map-backup-$(date +%Y%m%d-%H%M%S)
    fi
    
    # 解压新版本
    tar -xzf /tmp/nuclear-map-deployment.tar.gz
    mv deployment nuclear-map
    
    # 设置权限
    chown -R www-data:www-data nuclear-map 2>/dev/null || true
    chmod -R 755 nuclear-map
    
    # 清理临时文件
    rm -f /tmp/nuclear-map-deployment.tar.gz
    
    echo "部署完成!"
REMOTE_SCRIPT

# 检查Nginx配置
echo -e "${YELLOW}检查Nginx配置...${NC}"
if ! ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "grep -q 'nuclear-map' /etc/nginx/sites-available/* 2>/dev/null"; then
    echo -e "${YELLOW}⚠ 需要添加Nginx配置${NC}"
    echo ""
    echo "请在服务器上执行以下命令添加Nginx配置:"
    echo ""
    cat << 'NGINX_CONFIG'
sudo tee -a /etc/nginx/sites-available/a-art.top << 'EOF'

location /nuclear-map/ {
    alias /var/www/html/nuclear-map/;
    try_files $uri $uri/ /nuclear-map/index.html;
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 6M;
        access_log off;
    }
}
EOF
sudo nginx -t && sudo systemctl reload nginx
NGINX_CONFIG
else
    ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "nginx -t && systemctl reload nginx"
    echo -e "${GREEN}✓ Nginx配置已重载${NC}"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署成功!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "访问地址:"
echo "  - 主页面: https://a-art.top/nuclear-map/"
echo "  - 健康检查: https://a-art.top/nuclear-map/index.html"
echo ""
echo -e "${YELLOW}下一步: 配置Nginx后即可正常访问${NC}"
