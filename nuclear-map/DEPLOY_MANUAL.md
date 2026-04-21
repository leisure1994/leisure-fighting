#!/bin/bash
# ============================================
# 核战争城市自救地图 - 手动部署指南
# ============================================
# 
# 由于无法直接SSH访问服务器，请按照以下步骤手动部署：
#
# 方法一：直接复制到现有Nginx服务器（推荐）
# ============================================
#
# 1. 将 deployment-package.tar.gz 上传到服务器
#    scp deployment-package.tar.gz root@a-art.top:/tmp/
#
# 2. SSH登录服务器并解压
#    ssh root@a-art.top
#    cd /var/www/html
#    tar -xzf /tmp/deployment-package.tar.gz
#
# 3. 重命名目录
#    mv nuclear-map-deploy nuclear-map
#
# 4. 配置Nginx（在 /etc/nginx/sites-available/a-art.top 添加）
#
#    location /nuclear-map/ {
#        alias /var/www/html/nuclear-map/;
#        try_files $uri $uri/ /nuclear-map/index.html;
#        
#        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
#            expires 6M;
#            access_log off;
#        }
#    }
#
# 5. 测试并重载Nginx
#    nginx -t
#    systemctl reload nginx
#
# 方法二：使用Docker部署（如果服务器支持）
# ============================================
#
# 1. 上传并解压
#    scp nuclear-map-v1.0.tar.gz root@a-art.top:/opt/
#    ssh root@a-art.top
#    cd /opt
#    tar -xzf nuclear-map-v1.0.tar.gz
#
# 2. 运行Docker部署
#    cd nuclear-map/deploy/docker
#    docker-compose up -d
#
# 3. 配置Nginx反向代理到 localhost:3000
#
# ============================================
# 部署验证
# ============================================
#
# 访问以下URL验证部署：
# - https://a-art.top/nuclear-map/
# - https://a-art.top/nuclear-map/health
#
# 如果看到地图界面和健康检查返回OK，则部署成功。
#
echo "核战争城市自救地图部署包已准备就绪"
echo "请按照上述说明手动部署到服务器"
