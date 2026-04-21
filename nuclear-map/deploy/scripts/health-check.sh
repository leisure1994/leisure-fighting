#!/bin/bash
# ============================================
# 核战争城市自救地图 - 健康检查脚本
# ============================================

URLS=(
    "http://localhost:3000/nuclear-map/health"
    "https://a-art.top/nuclear-map/health"
)

CHECK_TIMEOUT=10
ALERT_WEBHOOK=""  # 可选：配置告警 webhook

# 检查单个 URL
check_url() {
    local url=$1
    local status
    
    status=$(curl -s -o /dev/null -w "%{http_code}" --max-time $CHECK_TIMEOUT "$url" 2>/dev/null)
    
    if [ "$status" = "200" ]; then
        echo "✓ $url - 正常"
        return 0
    else
        echo "✗ $url - 异常 (状态码: $status)"
        return 1
    fi
}

# 发送告警
send_alert() {
    local message="$1"
    
    if [ -n "$ALERT_WEBHOOK" ]; then
        curl -s -X POST \
            -H "Content-Type: application/json" \
            -d "{\"text\":\"$message\"}" \
            "$ALERT_WEBHOOK" > /dev/null 2>&1
    fi
    
    # 记录到系统日志
    logger -t nuclear-map "[ALERT] $message"
}

# 检查 Docker 容器
check_containers() {
    echo "检查 Docker 容器..."
    
    if ! docker ps | grep -q nuclear-map; then
        echo "✗ nuclear-map 容器未运行"
        send_alert "nuclear-map 容器已停止，请检查！"
        return 1
    fi
    
    echo "✓ 容器运行正常"
    return 0
}

# 检查磁盘空间
check_disk() {
    echo "检查磁盘空间..."
    
    USAGE=$(df / | tail -1 | awk '{print $5}' | tr -d '%')
    
    if [ "$USAGE" -gt 90 ]; then
        echo "✗ 磁盘空间不足: ${USAGE}%"
        send_alert "磁盘空间警告: 已使用 ${USAGE}%"
        return 1
    fi
    
    echo "✓ 磁盘空间充足: ${USAGE}%"
    return 0
}

# 主逻辑
main() {
    echo "========================================"
    echo "  健康检查 - $(date)"
    echo "========================================"
    
    local has_error=0
    
    # 检查 URL
    for url in "${URLS[@]}"; do
        if ! check_url "$url"; then
            has_error=1
        fi
    done
    
    # 检查容器
    if ! check_containers; then
        has_error=1
    fi
    
    # 检查磁盘
    if ! check_disk; then
        has_error=1
    fi
    
    echo "========================================"
    
    if [ $has_error -eq 0 ]; then
        echo "✓ 所有检查通过"
        exit 0
    else
        echo "✗ 发现异常，请检查日志"
        exit 1
    fi
}

main