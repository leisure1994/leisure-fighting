#!/bin/bash
# =====================================
# 批量内容生成工具 - 企业版
# 售价: ¥99
# =====================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/config.json"
OUTPUT_DIR="$SCRIPT_DIR/output"

# 默认配置
MINIMAX_API_KEY=""
DEFAULT_VOICE="female-shaonv"
DEFAULT_MODEL="speech-2.8-turbo"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_help() {
    cat << EOF
批量内容生成工具 v1.0

用法:
    ./batch-generator.sh [命令] [选项]

命令:
    tts         批量文字转语音
    setup       初始化配置

TTS选项:
    -i, --input     输入文件(每行一个文本)
    -o, --output    输出目录
    -v, --voice     音色ID (默认: female-shaonv)
    -m, --model     模型 (默认: speech-2.8-turbo)

示例:
    ./batch-generator.sh tts -i texts.txt -o ./audio
    ./batch-generator.sh tts -i texts.txt -v male-qn-qingse

可用音色:
    female-shaonv   中文女声-少女
    female-yujie    中文女声-御姐  
    male-qn-qingse  中文男声-青涩
    male-qn-jingying 中文男声-精英
EOF
}

load_config() {
    if [ -f "$CONFIG_FILE" ]; then
        MINIMAX_API_KEY=$(cat "$CONFIG_FILE" | grep -o '"api_key": "[^"]*"' | cut -d'"' -f4)
    fi
    
    if [ -z "$MINIMAX_API_KEY" ]; then
        echo -e "${RED}错误: 未配置API Key${NC}"
        echo "请运行: ./batch-generator.sh setup"
        exit 1
    fi
}

setup() {
    echo "🔧 初始化配置"
    echo
    read -p "请输入MiniMax API Key: " api_key
    
    cat > "$CONFIG_FILE" << EOF
{
    "api_key": "$api_key",
    "default_voice": "female-shaonv",
    "default_model": "speech-2.8-turbo"
}
EOF
    
    echo -e "${GREEN}✅ 配置已保存到 $CONFIG_FILE${NC}"
}

tts_batch() {
    local input_file=""
    local output_dir="$OUTPUT_DIR"
    local voice="$DEFAULT_VOICE"
    local model="$DEFAULT_MODEL"
    
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -i|--input) input_file="$2"; shift 2 ;;
            -o|--output) output_dir="$2"; shift 2 ;;
            -v|--voice) voice="$2"; shift 2 ;;
            -m|--model) model="$2"; shift 2 ;;
            *) shift ;;
        esac
    done
    
    if [ -z "$input_file" ] || [ ! -f "$input_file" ]; then
        echo -e "${RED}错误: 请指定有效的输入文件${NC}"
        echo "使用: ./batch-generator.sh tts -i texts.txt"
        exit 1
    fi
    
    mkdir -p "$output_dir"
    
    echo "🎙️ 开始批量TTS生成"
    echo "   输入: $input_file"
    echo "   输出: $output_dir"
    echo "   音色: $voice"
    echo
    
    local count=0
    local success=0
    local failed=0
    
    while IFS= read -r line; do
        count=$((count + 1))
        [ -z "$line" ] && continue
        
        local output_file="$output_dir/audio_$(printf "%04d" $count).mp3"
        
        echo -n "[$count] 生成中... "
        
        # 调用MiniMax API
        local response=$(curl -s -X POST "https://api.minimaxi.com/v1/t2a_v2" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $MINIMAX_API_KEY" \
            -d "{
                \"model\": \"$model\",
                \"text\": \"$line\",
                \"voice_id\": \"$voice\",
                \"response_format\": \"mp3\"
            }" 2>/dev/null)
        
        # 提取音频数据
        local audio_hex=$(echo "$response" | grep -o '"audio":"[^"]*"' | cut -d'"' -f4)
        
        if [ -n "$audio_hex" ]; then
            echo "$audio_hex" | xxd -r -p > "$output_file" 2>/dev/null
            if [ -f "$output_file" ]; then
                echo -e "${GREEN}✓${NC} $output_file"
                success=$((success + 1))
            else
                echo -e "${RED}✗${NC} 解码失败"
                failed=$((failed + 1))
            fi
        else
            echo -e "${RED}✗${NC} API调用失败"
            failed=$((failed + 1))
        fi
        
        sleep 0.5  # 限速
    done < "$input_file"
    
    echo
    echo "📊 生成完成"
    echo "   成功: $success"
    echo "   失败: $failed"
    echo "   总计: $count"
}

# 主入口
case "${1:-}" in
    setup)
        setup
        ;;
    tts)
        load_config
        shift
        tts_batch "$@"
        ;;
    --help|-h|help)
        print_help
        ;;
    *)
        echo -e "${YELLOW}批量内容生成工具 v1.0${NC}"
        echo
        echo "运行 './batch-generator.sh --help' 查看用法"
        echo "或 './batch-generator.sh setup' 初始化配置"
        ;;
esac
