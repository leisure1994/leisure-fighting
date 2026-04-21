#!/bin/bash
# ============================================
# 核战争城市自救地图 - 自动备份脚本
# ============================================

set -e

DEPLOY_DIR="/opt/nuclear-map"
BACKUP_DIR="$DEPLOY_DIR/backups"
REMOTE_BACKUP=""  # 可选：配置远程备份地址，如 user@backup-server:/path
RETENTION_DAYS=30

# 创建备份
create_backup() {
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_NAME="nuclear-map_backup_$TIMESTAMP"
    BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME.tar.gz"
    
    mkdir -p "$BACKUP_DIR"
    
    # 备份数据
    tar -czf "$BACKUP_PATH" \
        -C "$DEPLOY_DIR" \
        data/ \
        ssl/ \
        2>/dev/null || true
    
    # 备份数据库（如果有）
    if docker ps | grep -q nuclear-map; then
        docker exec nuclear-map-redis redis-cli BGSAVE 2>/dev/null || true
    fi
    
    echo "$BACKUP_PATH"
}

# 上传到远程
upload_remote() {
    if [ -n "$REMOTE_BACKUP" ] && [ -f "$1" ]; then
        scp "$1" "$REMOTE_BACKUP/" 2>/dev/null || echo "远程备份失败"
    fi
}

# 清理旧备份
cleanup_old() {
    find "$BACKUP_DIR" -name "nuclear-map_backup_*.tar.gz" \
        -mtime +$RETENTION_DAYS \
        -delete 2>/dev/null || true
}

# 主逻辑
main() {
    echo "[$(date)] 开始备份..."
    
    BACKUP_FILE=$(create_backup)
    echo "[$(date)] 备份创建: $BACKUP_FILE"
    
    upload_remote "$BACKUP_FILE"
    cleanup_old
    
    echo "[$(date)] 备份完成"
}

main