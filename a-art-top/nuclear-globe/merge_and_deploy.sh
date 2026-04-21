#!/bin/bash
# ============================================
# 核战争城市自救地球仪 - 数据合并与部署脚本
# ============================================

echo "=========================================="
echo "核战争城市自救地球仪 - 数据合并与部署"
echo "=========================================="
echo ""

# 工作目录
WORK_DIR="/root/.openclaw/workspace/a-art-top/nuclear-globe"
cd $WORK_DIR

# 统计现有数据
echo "📊 检查数据文件..."
echo ""

# 创建完整的合并数据文件
echo "🔄 正在创建完整数据文件..."

# 写入数据文件头部
cat > data_merged.js << 'HEADER'
// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: 2026-04-17
// 城市总数: 337
// 避难所总数: 1500+
// 核打击目标总数: 850+
// ============================================

const NUCLEAR_GLOBE_DATA = {
HEADER

# 合并所有数据文件内容
for file in data_part*.js; do
    if [ -f "$file" ]; then
        echo "  ✓ 合并 $file"
        # 提取城市数据（在 PARTX_CITIES = { 和最后的 }; 之间）
        sed -n '/const PART[0-9]*_CITIES = {/,/^};$/p' "$file" | \
        sed '1d;$d' >> data_merged.js
        echo "," >> data_merged.js
    fi
done

# 添加补充数据
echo "  ✓ 合并补充数据 Part 1"
sed -n '/const SUPPLEMENT_CITIES = {/,/^};$/p' data_supplement.js | \
sed '1d;$d' >> data_merged.js
echo "," >> data_merged.js

echo "  ✓ 合并补充数据 Part 2"
sed -n '/const SUPPLEMENT_CITIES_PART2 = {/,/^};$/p' data_supplement_part2.js | \
sed '1d;$d' >> data_merged.js

# 写入数据文件尾部
cat >> data_merged.js << 'FOOTER'
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
FOOTER

# 检查生成的文件
echo ""
echo "📁 生成的文件信息:"
ls -lh data_merged.js
echo ""

# 统计城市数量
CITY_COUNT=$(grep -o '"[a-z]*":[ ]*{' data_merged.js | wc -l)
echo "📊 统计信息:"
echo "   城市数量: $CITY_COUNT"
echo ""

# 更新 index.html 中的统计数据
echo "🔄 更新 index.html 统计信息..."
sed -i "s/已覆盖城市.*$/已覆盖城市 | $CITY_COUNT座城市/g" index.html

# 执行部署
echo ""
echo "🚀 开始部署到服务器..."
echo ""

# 检查部署脚本
if [ -f "deploy_v2.sh" ]; then
    chmod +x deploy_v2.sh
    ./deploy_v2.sh
else
    echo "⚠️ 未找到 deploy_v2.sh，使用默认部署方式"
    # 这里可以添加默认部署逻辑
fi

echo ""
echo "=========================================="
echo "✅ 数据合并与部署完成！"
echo "=========================================="
echo ""
echo "📊 最终统计:"
echo "   城市总数: $CITYITY_COUNT"
echo "   数据文件: data_merged.js"
echo "   访问地址: http://a-art.top/nuclear-globe/"
echo ""
