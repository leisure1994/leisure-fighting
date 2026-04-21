#!/bin/bash
# ============================================
# 销售流程自动化脚本
# 记录客户互动、自动跟进提醒
# ============================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CRM_FILE="$SCRIPT_DIR/../customer-crm.md"
LOG_FILE="$SCRIPT_DIR/../sales-activity.log"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_activity() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

add_lead() {
    echo ""
    echo "📝 添加新客户线索"
    read -p "客户名称: " name
    read -p "来源渠道: " source
    read -p "联系方式: " contact
    read -p "意向程度 (1-5): " intent
    
    log_activity "添加线索: $name ($source)"
    echo -e "${GREEN}✅ 已添加: $name${NC}"
    
    # 显示跟进建议
    echo ""
    echo "💡 跟进建议:"
    case $intent in
        1) echo "   - 发送试用版建立信任" ;;
        2) echo "   - 发送详细产品介绍" ;;
        3) echo "   - 了解具体需求场景" ;;
        4) echo "   - 发送报价并推进成交" ;;
        5) echo "   - 立即跟进促成交易" ;;
    esac
}

record_followup() {
    echo ""
    echo "📞 记录跟进"
    read -p "客户名称: " name
    read -p "跟进方式 (电话/微信/飞书): " method
    read -p "沟通内容摘要: " content
    read -p "客户反馈: " feedback
    
    log_activity "跟进 $name: $method - $feedback"
    echo -e "${GREEN}✅ 跟进已记录${NC}"
    
    # 显示下次跟进建议
    echo ""
    echo "💡 下次跟进建议:"
    case "$feedback" in
        *考虑*|*想想*) echo "   - 3天后跟进，提供案例" ;;
        *预算*|*贵*) echo "   - 强调ROI，提供分期方案" ;;
        *试用*|*看看*) echo "   - 立即发送试用版" ;;
        *着急*|*马上*) echo "   - 立即推进成交" ;;
        *) echo "   - 2天后再次跟进" ;;
    esac
}

record_sale() {
    echo ""
    echo "🎉 记录成交"
    read -p "客户名称: " name
    read -p "成交金额: " amount
    read -p "购买产品: " product
    
    log_activity "成交 $name: ¥$amount ($product)"
    echo -e "${GREEN}✅ 成交记录已保存${NC}"
    echo ""
    echo "🎯 本月目标进度:"
    echo "   已成交: ¥$amount"
    
    # 播放成功音效（如果可用）
    echo -e "\a" 2>/dev/null || true
}

daily_report() {
    echo ""
    echo "📊 今日销售报告"
    echo "================"
    
    if [ -f "$LOG_FILE" ]; then
        today=$(date '+%Y-%m-%d')
        echo ""
        echo "今日活动:"
        grep "^\[$today" "$LOG_FILE" | tail -10
        
        echo ""
        echo "本周统计:"
        week_start=$(date -d "$(date +%u) days ago" '+%Y-%m-%d' 2>/dev/null || echo "本周")
        echo "   待实现自动统计"
    else
        echo "暂无活动记录"
    fi
}

# 主菜单
while true; do
    echo ""
    echo "🚀 销售流程自动化"
    echo "=================="
    echo "1) 添加新客户线索"
    echo "2) 记录跟进"
    echo "3) 记录成交 🎉"
    echo "4) 今日报告"
    echo "5) 退出"
    echo ""
    read -p "选择操作 [1-5]: " choice
    
    case $choice in
        1) add_lead ;;
        2) record_followup ;;
        3) record_sale ;;
        4) daily_report ;;
        5) echo "再见！"; exit 0 ;;
        *) echo "无效选择" ;;
    esac
done
