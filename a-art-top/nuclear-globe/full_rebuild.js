// 完整重新合并所有数据
const fs = require('fs');
const path = require('path');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe';

// 读取数据文件的辅助函数
function loadDataFile(filename) {
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ 不存在: ${filename}`);
        return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 找到 const XXX = {...}; 的模式
    const match = content.match(/const\s+(\w+)\s*=\s*(\{[\s\S]*?\n\});/);
    if (!match) {
        console.log(`⚠️ 无法解析: ${filename}`);
        return {};
    }
    
    try {
        const data = eval('(' + match[2] + ')');
        console.log(`✅ ${filename}: ${Object.keys(data).length} 个城市`);
        return data;
    } catch (e) {
        console.log(`❌ 解析错误: ${filename} - ${e.message}`);
        return {};
    }
}

console.log('开始完整数据合并...\n');

let allData = {};

// 加载所有数据文件
const files = [
    'data.js',
    'data_part2.js', 'data_part3.js', 'data_part4.js', 'data_part5.js',
    'data_part6.js', 'data_part7.js', 'data_part8.js', 'data_part9.js', 'data_part10.js',
    'data_part11.js', 'batch3_data.js'
];

files.forEach(file => {
    const data = loadDataFile(file);
    Object.keys(data).forEach(key => {
        if (!allData[key]) {
            allData[key] = data[key];
        }
    });
});

// 统计
const totalCities = Object.keys(allData).length;
let totalShelters = 0;
let totalTargets = 0;

Object.values(allData).forEach(city => {
    totalShelters += city.shelters?.length || 0;
    totalTargets += city.nuclearTargets?.length || 0;
});

console.log(`\n========================================`);
console.log(`📍 城市总数: ${totalCities}`);
console.log(`🏠 避难所总数: ${totalShelters}`);
console.log(`🎯 核打击目标总数: ${totalTargets}`);
console.log(`========================================\n`);

// 生成输出文件
const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${totalCities}
// 避难所总数: ${totalShelters}
// 核打击目标总数: ${totalTargets}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allData, null, 4)};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
`;

fs.writeFileSync(path.join(dataDir, 'data_merged.js'), output);
console.log(`✅ 已保存: data_merged.js (${(output.length/1024).toFixed(2)} KB)`);

// 保存统计
fs.writeFileSync(path.join(dataDir, 'merge_stats.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalCities,
    totalShelters,
    totalTargets
}, null, 2));

// 显示部分城市
console.log(`\n📋 城市列表 (前20个):`);
Object.entries(allData).slice(0, 20).forEach(([key, city], i) => {
    console.log(`  ${i+1}. ${city.name || key} - ${city.shelters?.length || 0}个避难所`);
});
