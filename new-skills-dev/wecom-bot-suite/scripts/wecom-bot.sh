#!/bin/bash
# ============================================
# 企业微信机器人套件 - 主脚本
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/config.json"
LOG_FILE="${SCRIPT_DIR}/../logs/bot.log"
PID_FILE="${SCRIPT_DIR}/../bot.pid"

# 颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"; }

# 加载配置
load_config() {
    WEBHOOK_KEY=$(jq -r '.webhook_key' "$CONFIG_FILE")
    WECOM_URL="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=$WEBHOOK_KEY"
}

# 发送消息
send_message() {
    local content=$1
    local msg_type=${2:-"text"}
    
    local json_data=""
    if [ "$msg_type" = "markdown" ]; then
        json_data="{\"msgtype\": \"markdown\", \"markdown\": {\"content\": \"$content\"}}"
    else
        json_data="{\"msgtype\": \"text\", \"text\": {\"content\": \"$content\"}}"
    fi
    
    curl -s -X POST "$WECOM_URL" \
        -H "Content-Type: application/json" \
        -d "$json_data" > /dev/null
}

# 自动回复处理
process_reply() {
    local message=$1
    
    # 加载回复规则
    local rules=$(jq -c '.auto_reply[]' "$CONFIG_FILE" 2>/dev/null)
    
    while IFS= read -r rule; do
        local keyword=$(echo "$rule" | jq -r '.keyword')
        local response=$(echo "$rule" | jq -r '.response')
        
        if echo "$message" | grep -qi "$keyword"; then
            send_message "$response"
            log "自动回复: $keyword -> $response"
            return
        fi
    done <<< "$rules"
}

# 定时任务
cron_job() {
    log "执行定时任务..."
    
    # 获取当前时间
    local hour=$(date '+%H')
    local minute=$(date '+%M')
    local current_time="$hour:$minute"
    
    # 检查是否有匹配的定时任务
    local tasks=$(jq -c ".scheduled_tasks[] | select(.time == \"$current_time\")" "$CONFIG_FILE" 2>/dev/null)
    
    while IFS= read -r task; do
        [ -z "$task" ] && continue
        local content=$(echo "$task" | jq -r '.content')
        send_message "$content"
        log "定时推送: $content"
    done <<< "$tasks"
}

# 启动机器人
start_bot() {
    log "启动企业微信机器人..."
    
    if [ -f "$PID_FILE" ]; then
        echo "机器人已在运行"
        return
    fi
    
    echo $$ > "$PID_FILE"
    load_config
    
    log "机器人已启动"
    send_message "🤖 机器人已上线"
    
    # 主循环
    while true; do
        cron_job
        sleep 60
    done
}

# 停止机器人
stop_bot() {
    if [ -f "$PID_FILE" ]; then
        local pid=$(cat "$PID_FILE")
        kill "$pid" 2>/dev/null || true
        rm -f "$PID_FILE"
        log "机器人已停止"
    else
        echo "机器人未运行"
    fi
}

# 发送测试消息
test_message() {
    load_config
    send_message "🧪 测试消息 - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "测试消息已发送"
}

# 查看状态
status() {
    if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
        echo -e "${GREEN}●${NC} 运行中"
    else
        echo -e "${RED}●${NC} 已停止"
    fi
}

# 主入口
case "${1:-}" in
    start)
        start_bot
        ;;
    stop)
        stop_bot
        ;;
    restart)
        stop_bot
        sleep 2
        start_bot
        ;;
    status)
        status
        ;;
    test)
        test_message
        ;;
    send)
        load_config
        send_message "${2:-测试消息}"
        ;;
    *)
        echo "企业微信机器人套件 v1.0"
        echo ""
        echo "用法:"
        echo "  ./wecom-bot.sh start      启动机器人"
        echo "  ./wecom-bot.sh stop       停止机器人"
        echo "  ./wecom-bot.sh restart    重启机器人"
        echo "  ./wecom-bot.sh status     查看状态"
        echo "  ./wecom-bot.sh test       发送测试消息"
        echo "  ./wecom-bot.sh send \"消息\"  发送自定义消息"
        ;;
esac
