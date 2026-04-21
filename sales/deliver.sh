#!/bin/bash
# ============================================
# 产品交付脚本
# 客户付款后自动发送产品
# ============================================

PRODUCT_DIR="/root/.openclaw/workspace/products"
DELIVERY_LOG="/root/.openclaw/workspace/sales/delivery.log"

# 产品列表
declare -A PRODUCTS
PRODUCTS[tao-engine]="tao-world-engine-skill.zip|天道引擎完整版"
PRODUCTS[urhox]="urhox-skills-pack-v1.0.0.zip|UrhoX技能包"
PRODUCTS[feishu-report]="feishu-report-assistant.tar.gz|飞书智能报表助手"
PRODUCTS[content-factory]="ai-content-factory.tar.gz|AI内容生成工厂"
PRODUCTS[wecom-bot]="wecom-bot-suite.tar.gz|企业微信机器人套件"
PRODUCTS[ai-service]="ai-customer-service.tar.gz|AI智能客服系统"
PRODUCTS[enterprise-suite]="企业四件套|飞书报表+内容工厂+企微机器人+AI客服"

# 交付产品
deliver_product() {
    local product_key=$1
    local customer=$2
    local amount=$3
    
    echo "$(date) - 交付 $product_key 给客户 $customer，金额 ¥$amount" >> "$DELIVERY_LOG"
    
    echo "✅ 已记录交付信息"
    echo "   产品: ${PRODUCTS[$product_key]}"
    echo "   客户: $customer"
    echo "   金额: ¥$amount"
}

# 显示可交付产品
list_products() {
    echo "📦 可交付产品清单:"
    echo ""
    for key in "${!PRODUCTS[@]}"; do
        echo "  $key: ${PRODUCTS[$key]}"
    done
}

# 主菜单
case "${1:-}" in
    list)
        list_products
        ;;
    deliver)
        deliver_product "$2" "$3" "$4"
        ;;
    *)
        echo "产品交付系统 v1.0"
        echo ""
        echo "用法:"
        echo "  ./deliver.sh list                    列出产品"
        echo "  ./deliver.sh deliver [产品] [客户] [金额]  记录交付"
        ;;
esac
