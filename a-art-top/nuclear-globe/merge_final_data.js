// ============================================
// 核战争城市自救地球仪 - 完整数据合并脚本
// 合并所有城市数据到 data_merged.js
// ============================================

const fs = require('fs');
const path = require('path');

console.log('开始合并核战争城市数据...\n');

// 读取现有数据
const dataMergedPath = './data_merged.js';
const supplementPath = './data_supplement.js';
const supplementPath2 = './data_supplement_part2.js';

// 解析现有数据
let existingData = {};
try {
    const dataContent = fs.readFileSync(dataMergedPath, 'utf8');
    // 提取 NUCLEAR_GLOBE_DATA 对象
    const match = dataContent.match(/const NUCLEAR_GLOBE_DATA = ({[\s\S]*?});?\s*$/);
    if (match) {
        existingData = eval('(' + match[1] + ')');
        console.log(`✓ 读取现有数据: ${Object.keys(existingData).length} 个城市`);
    }
} catch (e) {
    console.error('读取现有数据失败:', e.message);
}

// 读取补充数据
let supplementData = {};
try {
    const supContent = fs.readFileSync(supplementPath, 'utf8');
    const match = supContent.match(/const SUPPLEMENT_CITIES = ({[\s\S]*?});?\s*$/);
    if (match) {
        supplementData = eval('(' + match[1] + ')');
        console.log(`✓ 读取补充数据Part1: ${Object.keys(supplementData).length} 个城市`);
    }
} catch (e) {
    console.error('读取补充数据失败:', e.message);
}

// 读取补充数据Part2
let supplementData2 = {};
try {
    const supContent2 = fs.readFileSync(supplementPath2, 'utf8');
    const match = supContent2.match(/const SUPPLEMENT_CITIES_PART2 = ({[\s\S]*?});?\s*$/);
    if (match) {
        supplementData2 = eval('(' + match[1] + ')');
        console.log(`✓ 读取补充数据Part2: ${Object.keys(supplementData2).length} 个城市`);
    }
} catch (e) {
    console.error('读取补充数据Part2失败:', e.message);
}

// 合并所有数据
const allData = {
    ...existingData,
    ...supplementData,
    ...supplementData2
};

console.log(`\n📊 合并后总城市数: ${Object.keys(allData).length}`);

// 统计信息
let totalShelters = 0;
let totalTargets = 0;

Object.values(allData).forEach(city => {
    if (city.shelters) totalShelters += city.shelters.length;
    if (city.nuclearTargets) totalTargets += city.nuclearTargets.length;
});

console.log(`🛡️  避难所总数: ${totalShelters}`);
console.log(`⚠️  核打击目标总数: ${totalTargets}\n`);

// 生成合并后的数据文件
const outputContent = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${Object.keys(allData).length}
// 避难所总数: ${totalShelters}
// 核打击目标总数: ${totalTargets}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allData, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
`;

// 写入文件
fs.writeFileSync(dataMergedPath, outputContent, 'utf8');
console.log('✓ 数据合并完成，已保存到 data_merged.js');

// 生成统计信息文件
const stats = {
    totalCities: Object.keys(allData).length,
    totalShelters: totalShelters,
    totalTargets: totalTargets,
    updatedAt: new Date().toISOString()
};
fs.writeFileSync('./merge_stats.json', JSON.stringify(stats, null, 2), 'utf8');

console.log('\n📋 城市统计信息:');
console.log(JSON.stringify(stats, null, 2));
