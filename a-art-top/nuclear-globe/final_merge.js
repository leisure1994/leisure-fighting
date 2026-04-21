// 最终数据合并脚本
const fs = require('fs');
const path = require('path');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe';

// 读取所有数据文件
const files = [
    'data.js',
    'data_part2.js', 'data_part3.js', 'data_part4.js', 'data_part5.js',
    'data_part6.js', 'data_part7.js', 'data_part8.js', 'data_part9.js', 'data_part10.js',
    'batch3_data.js'
];

let allData = {};
let stats = { totalFiles: 0, totalCities: 0, totalShelters: 0, totalTargets: 0 };

console.log('开始合并数据文件...\n');

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ 跳过: ${file} (不存在)`);
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 提取数据对象
    const match = content.match(/const\s+(?:NUCLEAR_GLOBE_DATA|PART\d+_CITIES|CITIES)\s*=\s*(\{[\s\S]*?\});?\s*(?:if|module|$)/);
    if (!match) {
        console.log(`⚠️ 跳过: ${file} (无法解析)`);
        return;
    }
    
    try {
        const data = eval('(' + match[1] + ')');
        const cities = Object.keys(data);
        
        cities.forEach(cityKey => {
            if (allData[cityKey]) {
                console.log(`  ⚠️ 重复城市: ${data[cityKey].name} (来自 ${file})`);
            } else {
                allData[cityKey] = data[cityKey];
                stats.totalCities++;
                stats.totalShelters += data[cityKey].shelters?.length || 0;
                stats.totalTargets += data[cityKey].nuclearTargets?.length || 0;
            }
        });
        
        stats.totalFiles++;
        console.log(`✅ 已加载: ${file} (${cities.length}个城市)`);
    } catch (e) {
        console.log(`❌ 错误: ${file} - ${e.message}`);
    }
});

// 生成合并后的数据文件
const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据 (337城市)
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${stats.totalCities}
// 数据来源: ${stats.totalFiles}个数据文件
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allData, null, 4)};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
`;

fs.writeFileSync(path.join(dataDir, 'data_merged.js'), output);

console.log(`\n========================================`);
console.log(`✅ 合并完成!`);
console.log(`========================================`);
console.log(`📁 已处理文件: ${stats.totalFiles}`);
console.log(`📍 城市总数: ${stats.totalCities}`);
console.log(`🏠 避难所总数: ${stats.totalShelters}`);
console.log(`🎯 核打击目标总数: ${stats.totalTargets}`);
console.log(`📊 输出文件: data_merged.js (${(output.length/1024).toFixed(2)} KB)`);

// 写入统计文件
fs.writeFileSync(path.join(dataDir, 'merge_stats.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalCities: stats.totalCities,
    totalShelters: stats.totalShelters,
    totalTargets: stats.totalTargets,
    filesProcessed: stats.totalFiles,
    outputSize: output.length
}, null, 2));

console.log(`\n📝 统计文件已保存: merge_stats.json`);
