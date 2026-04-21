#!/bin/bash
# 核战争城市自救地球仪 - 数据合并脚本

cd /root/.openclaw/workspace/a-art-top/nuclear-globe/

OUTPUT="data_merged.js"

# 写入文件头
cat > "$OUTPUT" << 'HEADER'
// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 中国内地地级及以上城市全覆盖
// 生成时间: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
// ============================================

const NUCLEAR_GLOBE_DATA = {
HEADER

# 城市计数器
TOTAL_CITIES=0

# 处理每个数据文件
process_file() {
    local file=$1
    local varname=$2
    
    if [ ! -f "$file" ]; then
        echo "⚠️  跳过: $file (不存在)"
        return
    fi
    
    echo "📄 处理: $file"
    
    # 提取变量内容 - 从 { 开始 到 }; 结束
    awk -v var="$varname" '
        BEGIN { found=0; brace=0; }
        $0 ~ "^const " var " = {" { found=1; brace=1; next }
        found {
            # 计算大括号
            for(i=1;i<=NF;i++) {
                if($i ~ /\{/) brace++
                if($i ~ /\}/) brace--
            }
            
            # 检测结束
            if (brace == 0 && /^\s*};?\s*$/) {
                found=0
                next
            }
            
            # 输出行
            print
            
            # 检测变量结束
            if (brace == 0) {
                found=0
            }
        }
    ' "$file" >> "$OUTPUT"
    
    # 添加逗号
    echo "," >> "$OUTPUT"
}

# 处理所有文件
process_file "data.js" "NUCLEAR_GLOBE_DATA"
process_file "data_part2.js" "PART2_CITIES"
process_file "data_part3.js" "PART3_CITIES"
process_file "data_part4.js" "PART4_CITIES"
process_file "data_part5.js" "PART5_CITIES"
process_file "data_part6.js" "PART6_CITIES"
process_file "data_part7.js" "PART7_CITIES"
process_file "data_part8.js" "PART8_CITIES"
process_file "batch3_data.js" "BATCH3_CITIES"

# 写入文件尾
cat >> "$OUTPUT" << 'FOOTER'
};

// 城市列表（用于统计和遍历）
const CITY_LIST = Object.keys(NUCLEAR_GLOBE_DATA);

// 获取城市统计数据
function getCityStats() {
    return {
        totalCities: CITY_LIST.length,
        totalShelters: CITY_LIST.reduce((sum, city) => sum + NUCLEAR_GLOBE_DATA[city].shelters.length, 0),
        totalTargets: CITY_LIST.reduce((sum, city) => sum + (NUCLEAR_GLOBE_DATA[city].nuclearTargets?.length || 0), 0)
    };
}

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA, CITY_LIST, getCityStats };
}
FOOTER

echo ""
echo "✅ 合并完成: $OUTPUT"
echo "📊 文件大小: $(du -h $OUTPUT | cut -f1)"

# 统计城市数
echo "📍 城市数量统计:"
grep -c '"[a-z_]*":\s*{' "$OUTPUT" || echo "无法统计"
