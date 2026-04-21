#!/bin/bash
# ============================================
# AI内容生成工厂 - 主脚本
# ============================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config.json"
OUTPUT_DIR="${SCRIPT_DIR}/../output"

# 颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[Factory]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }

# 加载配置
load_config() {
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "错误: 配置文件不存在"
        exit 1
    fi
    MINIMAX_KEY=$(jq -r '.minimax.api_key' "$CONFIG_FILE")
    SEEDANCE_KEY=$(jq -r '.seedance.api_key' "$CONFIG_FILE")
}

# TTS批量生成
tts_batch() {
    local input_file=$1
    local voice=${2:-"female-shaonv"}
    local output_dir=${3:-"$OUTPUT_DIR/audio"}
    
    log "开始批量TTS生成..."
    mkdir -p "$output_dir"
    
    local count=0
    while IFS= read -r line; do
        count=$((count + 1))
        [ -z "$line" ] && continue
        
        local output_file="$output_dir/audio_$(printf "%04d" $count).mp3"
        
        # 调用MiniMax API
        local response=$(curl -s -X POST "https://api.minimaxi.com/v1/t2a_v2" \
            -H "Authorization: Bearer $MINIMAX_KEY" \
            -H "Content-Type: application/json" \
            -d "{
                \"model\": \"speech-2.8-turbo\",
                \"text\": \"$line\",
                \"voice_id\": \"$voice\"
            }")
        
        # 保存音频
        local audio_hex=$(echo "$response" | grep -o '"audio":"[^"]*"' | cut -d'"' -f4)
        if [ -n "$audio_hex" ]; then
            echo "$audio_hex" | xxd -r -p > "$output_file" 2>/dev/null
            echo "  [$count] ✓ $output_file"
        else
            echo "  [$count] ✗ 生成失败"
        fi
        
        sleep 0.5
    done < "$input_file"
    
    success "批量TTS完成，共生成 $count 条"
}

# 视频批量生成
video_batch() {
    local input_file=$1
    local duration=${2:-10}
    
    log "开始批量视频生成..."
    mkdir -p "$OUTPUT_DIR/video"
    
    local count=0
    while IFS= read -r prompt; do
        count=$((count + 1))
        [ -z "$prompt" ] && continue
        
        log "[$count] 提交视频任务: ${prompt:0:30}..."
        
        # 提交Seedance任务
        local response=$(curl -s -X POST \
            "https://ark.cn-beijing.volces.com/api/v3/content_generation/tasks" \
            -H "Authorization: Bearer $SEEDANCE_KEY" \
            -H "Content-Type: application/json" \
            -d "{
                \"model\": \"doubao-seedance-2-0-260128\",
                \"content\": [{\"type\": \"text\", \"text\": \"$prompt\"}],
                \"duration\": $duration
            }")
        
        local task_id=$(echo "$response" | jq -r '.id')
        echo "  任务ID: $task_id"
        
        # 保存任务信息
        echo "$task_id" >> "$OUTPUT_DIR/video/tasks.txt"
        
        sleep 1
    done < "$input_file"
    
    success "视频任务提交完成"
}

# 内容生产流水线
produce_content() {
    local topic=$1
    local count=$2
    
    log "启动内容生产流水线..."
    log "主题: $topic, 数量: $count"
    
    # 1. 生成脚本
    log "步骤1: 生成内容脚本..."
    mkdir -p "$OUTPUT_DIR/$topic"
    
    for i in $(seq 1 $count); do
        echo "${topic} 内容 $i - 这里是自动生成的内容脚本" >> "$OUTPUT_DIR/$topic/scripts.txt"
    done
    
    # 2. 生成TTS
    log "步骤2: 批量生成语音..."
    tts_batch "$OUTPUT_DIR/$topic/scripts.txt" "female-shaonv" "$OUTPUT_DIR/$topic/audio"
    
    # 3. 生成视频提示词
    log "步骤3: 准备视频素材..."
    for i in $(seq 1 $count); do
        echo "${topic}场景，高清，专业拍摄，动态展示" >> "$OUTPUT_DIR/$topic/video_prompts.txt"
    done
    
    success "内容生产完成: $OUTPUT_DIR/$topic/"
}

# 主入口
case "${1:-}" in
    tts)
        load_config
        shift
        tts_batch "$@"
        ;;
    video-batch)
        load_config
        shift
        video_batch "$@"
        ;;
    produce)
        load_config
        shift
        produce_content "$@"
        ;;
    *)
        echo "AI内容生成工厂 v1.0"
        echo ""
        echo "用法:"
        echo "  ./content-factory.sh tts --input texts.txt --voice female-shaonv"
        echo "  ./content-factory.sh video-batch --input prompts.txt"
        echo "  ./content-factory.sh produce --topic \"产品推广\" --count 10"
        ;;
esac
