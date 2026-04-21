#!/bin/bash
# ============================================
# 飞书智能报表助手 - 主脚本
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config.json"
CACHE_DIR="${SCRIPT_DIR}/../.cache"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# 初始化
check_dependencies() {
    local deps=("curl" "jq")
    for dep in "${deps[@]}"; do
        if ! command -v $dep &> /dev/null; then
            log_error "缺少依赖: $dep"
            exit 1
        fi
    done
}

# 加载配置
load_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        log_error "配置文件不存在: $CONFIG_FILE"
        log_info "请复制 config.example.json 到 config.json 并配置"
        exit 1
    fi
    
    FEISHU_APP_ID=$(jq -r '.feishu.app_id' "$CONFIG_FILE")
    FEISHU_APP_SECRET=$(jq -r '.feishu.app_secret' "$CONFIG_FILE")
    REPORT_NAME=$(jq -r '.report.name' "$CONFIG_FILE")
    
    log_info "加载配置: $REPORT_NAME"
}

# 获取飞书token
get_feishu_token() {
    local cache_file="$CACHE_DIR/feishu_token.json"
    
    # 检查缓存
    if [ -f "$cache_file" ]; then
        local expire_time=$(jq -r '.expire' "$cache_file")
        local current_time=$(date +%s)
        if [ "$current_time" -lt "$expire_time" ]; then
            jq -r '.token' "$cache_file"
            return
        fi
    fi
    
    # 获取新token
    local response=$(curl -s -X POST "https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal" \
        -H "Content-Type: application/json" \
        -d "{
            \"app_id\": \"$FEISHU_APP_ID\",
            \"app_secret\": \"$FEISHU_APP_SECRET\"
        }")
    
    local token=$(echo "$response" | jq -r '.app_access_token')
    local expire=$(echo "$response" | jq -r '.expire')
    local expire_time=$(($(date +%s) + expire - 300))
    
    # 缓存token
    mkdir -p "$CACHE_DIR"
    echo "{\"token\": \"$token\", \"expire\": $expire_time}" > "$cache_file"
    
    echo "$token"
}

# 从多维表格获取数据
fetch_bitable_data() {
    local token=$1
    local app_token=$2
    local table_id=$3
    
    log_info "拉取多维表格数据..."
    
    local response=$(curl -s -X GET \
        "https://open.feishu.cn/open-apis/bitable/v1/apps/$app_token/tables/$table_id/records" \
        -H "Authorization: Bearer $token")
    
    echo "$response" | jq '.data.items'
}

# 生成数据摘要
generate_summary() {
    local data=$1
    
    log_info "生成数据摘要..."
    
    local total_count=$(echo "$data" | jq 'length')
    local today=$(date '+%Y-%m-%d')
    
    cat << EOF
{
    "report_date": "$today",
    "total_records": $total_count,
    "summary": "共 $total_count 条记录"
}
EOF
}

# 生成报表内容
generate_report() {
    log_info "生成报表: $REPORT_NAME"
    
    local token=$(get_feishu_token)
    local app_token=$(jq -r '.data_source.app_token' "$CONFIG_FILE")
    local table_id=$(jq -r '.data_source.table_id' "$CONFIG_FILE")
    
    # 获取数据
    local data=$(fetch_bitable_data "$token" "$app_token" "$table_id")
    
    # 生成摘要
    local summary=$(generate_summary "$data")
    
    # 生成报表文本
    local report_text=$(cat << EOF
📊 $REPORT_NAME

生成时间: $(date '+%Y-%m-%d %H:%M')

$(echo "$summary" | jq -r '.summary')

数据来源: 飞书多维表格
EOF
)
    
    echo "$report_text"
}

# 推送到飞书
push_to_feishu() {
    local content=$1
    local chat_id=$(jq -r '.push.chat_id' "$CONFIG_FILE")
    local token=$(get_feishu_token)
    
    log_info "推送到飞书群..."
    
    local response=$(curl -s -X POST \
        "https://open.feishu.cn/open-apis/message/v4/send" \
        -H "Authorization: Bearer $token" \
        -H "Content-Type: application/json" \
        -d "{
            \"chat_id\": \"$chat_id\",
            \"msg_type\": \"text\",
            \"content\": {
                \"text\": \"$content\"
            }
        }")
    
    if [ "$(echo "$response" | jq -r '.code')" = "0" ]; then
        log_success "推送成功"
    else
        log_error "推送失败: $(echo "$response" | jq -r '.msg')"
    fi
}

# 主函数
main() {
    log_info "飞书智能报表助手 v1.0"
    log_info "===================="
    
    check_dependencies
    load_config
    
    # 生成报表
    local report=$(generate_report)
    
    echo ""
    echo "$report"
    echo ""
    
    # 推送到飞书
    local should_push=$(jq -r '.push.enabled' "$CONFIG_FILE")
    if [ "$should_push" = "true" ]; then
        push_to_feishu "$report"
    fi
    
    log_success "报表生成完成"
}

# 执行
main "$@"
