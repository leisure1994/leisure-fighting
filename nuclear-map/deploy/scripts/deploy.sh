#!/bin/bash
# ============================================
# 核战争城市自救地图 - 一键部署脚本
# ============================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
PROJECT_NAME="nuclear-map"
DEPLOY_DIR="/opt/nuclear-map"
DOMAIN="a-art.top"
EMAIL="admin@a-art.top"

# 打印带颜色的信息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "请使用 root 权限运行此脚本"
        exit 1
    fi
}

# 检查依赖
check_dependencies() {
    print_info "检查依赖..."
    
    local deps=("docker" "docker-compose" "curl" "git")
    local missing=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing+=("$dep")
        fi
    done
    
    if [ ${#missing[@]} -ne 0 ]; then
        print_error "缺少以下依赖: ${missing[*]}"
        print_info "正在尝试安装..."
        
        if command -v apt &> /dev/null; then
            apt update
            apt install -y docker.io docker-compose curl git
        elif command -v yum &> /dev/null; then
            yum install -y docker docker-compose curl git
        else
            print_error "无法自动安装依赖，请手动安装"
            exit 1
        fi
        
        # 启动 Docker
        systemctl start docker
        systemctl enable docker
    fi
    
    print_success "依赖检查完成"
}

# 创建目录结构
setup_directories() {
    print_info "创建目录结构..."
    
    mkdir -p "$DEPLOY_DIR"/{data,logs,ssl,backups}
    mkdir -p "$DEPLOY_DIR"/logs/nginx
    mkdir -p "$DEPLOY_DIR"/monitoring/grafana/{dashboards,datasources}
    
    print_success "目录创建完成: $DEPLOY_DIR"
}

# 生成 SSL 证书（使用 Let's Encrypt 或自签名）
setup_ssl() {
    print_info "配置 SSL 证书..."
    
    SSL_DIR="$DEPLOY_DIR/ssl"
    
    # 检查是否已有证书
    if [ -f "$SSL_DIR/$DOMAIN.crt" ]; then
        print_warning "发现已有证书，跳过生成"
        return
    fi
    
    # 尝试使用 Let's Encrypt
    if command -v certbot &> /dev/null; then
        print_info "尝试使用 Let's Encrypt 获取证书..."
        certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" --agree-tos -n -m "$EMAIL" || true
        
        if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
            cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "$SSL_DIR/$DOMAIN.crt"
            cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "$SSL_DIR/$DOMAIN.key"
            print_success "Let's Encrypt 证书已配置"
            
            # 设置自动续期
            (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet && docker-compose -f $DEPLOY_DIR/docker-compose.yml restart") | crontab -
            return
        fi
    fi
    
    # 生成自签名证书（开发/测试用）
    print_warning "生成自签名证书（仅用于测试）..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$SSL_DIR/$DOMAIN.key" \
        -out "$SSL_DIR/$DOMAIN.crt" \
        -subj "/C=CN/ST=Beijing/L=Beijing/O=NuclearMap/CN=$DOMAIN" \
        -addext "subjectAltName=DNS:$DOMAIN,DNS:www.$DOMAIN"
    
    print_success "自签名证书已生成"
}

# 部署应用
deploy_app() {
    print_info "开始部署核战争地图..."
    
    cd "$DEPLOY_DIR"
    
    # 拉取最新代码（如果配置了 git）
    if [ -d ".git" ]; then
        git pull origin main || print_warning "无法拉取最新代码"
    fi
    
    # 构建并启动
    docker-compose down --remove-orphans 2>/dev/null || true
    docker-compose build --no-cache
    docker-compose up -d
    
    # 等待服务启动
    print_info "等待服务启动..."
    sleep 10
    
    # 健康检查
    if curl -f http://localhost:3000/nuclear-map/health > /dev/null 2>&1; then
        print_success "部署成功！"
        print_info "访问地址: https://$DOMAIN/nuclear-map/"
    else
        print_error "健康检查失败，请查看日志: docker-compose logs"
        exit 1
    fi
}

# 配置防火墙
setup_firewall() {
    print_info "配置防火墙..."
    
    if command -v ufw &> /dev/null; then
        ufw allow 80/tcp
        ufw allow 443/tcp
        ufw allow 22/tcp
        ufw --force enable
        print_success "UFW 防火墙已配置"
    elif command -v firewall-cmd &> /dev/null; then
        firewall-cmd --permanent --add-service=http
        firewall-cmd --permanent --add-service=https
        firewall-cmd --permanent --add-service=ssh
        firewall-cmd --reload
        print_success "Firewalld 已配置"
    fi
}

# 显示状态
show_status() {
    echo ""
    echo "========================================"
    print_success "核战争城市自救地图部署完成！"
    echo "========================================"
    echo ""
    echo -e "${BLUE}访问地址:${NC}"
    echo "  - 网站: https://$DOMAIN/nuclear-map/"
    echo "  - 本地: http://localhost:3000/nuclear-map/"
    echo ""
    echo -e "${BLUE}管理命令:${NC}"
    echo "  查看日志: docker-compose -f $DEPLOY_DIR/docker-compose.yml logs -f"
    echo "  重启服务: docker-compose -f $DEPLOY_DIR/docker-compose.yml restart"
    echo "  停止服务: docker-compose -f $DEPLOY_DIR/docker-compose.yml down"
    echo "  更新部署: $DEPLOY_DIR/deploy.sh update"
    echo ""
    echo -e "${BLUE}文件位置:${NC}"
    echo "  部署目录: $DEPLOY_DIR"
    echo "  网站数据: $DEPLOY_DIR/data"
    echo "  日志文件: $DEPLOY_DIR/logs"
    echo "  SSL证书:  $DEPLOY_DIR/ssl"
    echo ""
}

# 更新部署
update() {
    print_info "更新部署..."
    deploy_app
    print_success "更新完成"
}

# 备份
backup() {
    print_info "创建备份..."
    
    BACKUP_DIR="$DEPLOY_DIR/backups"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/nuclear-map_backup_$TIMESTAMP.tar.gz"
    
    mkdir -p "$BACKUP_DIR"
    
    tar -czf "$BACKUP_FILE" -C "$DEPLOY_DIR" data ssl
    
    # 保留最近 10 个备份
    ls -t "$BACKUP_DIR"/nuclear-map_backup_*.tar.gz 2>/dev/null | tail -n +11 | xargs rm -f
    
    print_success "备份已创建: $BACKUP_FILE"
}

# 主函数
main() {
    echo "========================================"
    echo "  核战争城市自救地图 - 部署脚本"
    echo "========================================"
    echo ""
    
    case "${1:-deploy}" in
        deploy)
            check_root
            check_dependencies
            setup_directories
            setup_ssl
            setup_firewall
            deploy_app
            show_status
            ;;
        update)
            check_root
            update
            ;;
        backup)
            check_root
            backup
            ;;
        status)
            docker-compose -f "$DEPLOY_DIR/docker-compose.yml" ps
            ;;
        logs)
            docker-compose -f "$DEPLOY_DIR/docker-compose.yml" logs -f
            ;;
        *)
            echo "用法: $0 {deploy|update|backup|status|logs}"
            exit 1
            ;;
    esac
}

main "$@"