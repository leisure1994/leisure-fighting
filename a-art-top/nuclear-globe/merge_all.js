// 直接执行合并 - 使用require加载
const fs = require('fs');
const path = require('path');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe';

console.log('开始完整数据合并...\n');

let allData = {};

// 加载数据文件
try {
    // 1. 原始数据
    const data1 = require('./data.js');
    Object.assign(allData, data1);
    console.log(`✅ data.js: ${Object.keys(data1).length} 个城市`);
} catch(e) { console.log(`❌ data.js: ${e.message}`); }

try {
    // 2-8. 分批数据
    for (let i = 2; i <= 8; i++) {
        const part = require(`./data_part${i}.js`);
        const varName = `PART${i}_CITIES`;
        const data = part[varName] || part;
        const count = Object.keys(data).length;
        Object.keys(data).forEach(key => {
            if (!allData[key]) allData[key] = data[key];
        });
        console.log(`✅ data_part${i}.js: ${count} 个城市`);
    }
} catch(e) { console.log(`❌ part2-8: ${e.message}`); }

try {
    // 9. 第9批
    const part9 = require('./data_part9.js');
    const count9 = Object.keys(part9.PART9_CITIES || part9).length;
    Object.assign(allData, part9.PART9_CITIES || part9);
    console.log(`✅ data_part9.js: ${count9} 个城市`);
} catch(e) { console.log(`❌ data_part9.js: ${e.message}`); }

try {
    // 10. 第10批
    const part10 = require('./data_part10.js');
    const count10 = Object.keys(part10.PART10_CITIES || part10).length;
    Object.assign(allData, part10.PART10_CITIES || part10);
    console.log(`✅ data_part10.js: ${count10} 个城市`);
} catch(e) { console.log(`❌ data_part10.js: ${e.message}`); }

try {
    // batch3
    const batch3 = require('./batch3_data.js');
    const count3 = Object.keys(batch3.CITIES || batch3).length;
    Object.assign(allData, batch3.CITIES || batch3);
    console.log(`✅ batch3_data.js: ${count3} 个城市`);
} catch(e) { console.log(`❌ batch3_data.js: ${e.message}`); }

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

console.log(`\n📋 城市列表预览 (前20个):`);
Object.keys(allData).slice(0, 20).forEach((key, i) => {
    const city = allData[key];
    console.log(`  ${i+1}. ${city.name} - ${city.shelters?.length || 0}个避难所`);
});
