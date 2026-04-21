// 合并补充数据到主数据文件
const fs = require('fs');

// 读取主数据文件
const mainDataPath = '/root/.openclaw/workspace/a-art-top/nuclear-globe/data_merged.js';
const supplementPath = '/root/.openclaw/workspace/a-art-top/nuclear-globe/data_supplement_full.js';
const outputPath = '/root/.openclaw/workspace/a-art.top/nuclear-globe/data.js';

// 读取文件内容
let mainContent = fs.readFileSync(mainDataPath, 'utf8');
let supplementContent = fs.readFileSync(supplementPath, 'utf8');

// 提取补充数据中的城市对象
const supplementMatch = supplementContent.match(/const SUPPLEMENT_CITIES = ({[\s\S]*?});/);
if (!supplementMatch) {
    console.error('无法解析补充数据');
    process.exit(1);
}

// 解析补充数据
let supplementCities;
try {
    supplementCities = eval('(' + supplementMatch[1] + ')');
} catch (e) {
    console.error('解析补充数据失败:', e);
    process.exit(1);
}

// 提取主数据中的城市对象
const mainMatch = mainContent.match(/const NUCLEAR_GLOBE_DATA = ({[\s\S]*?});\s*if/);
if (!mainMatch) {
    console.error('无法解析主数据');
    process.exit(1);
}

let mainCities;
try {
    mainCities = eval('(' + mainMatch[1] + ')');
} catch (e) {
    console.error('解析主数据失败:', e);
    process.exit(1);
}

// 合并数据
const mergedCities = { ...mainCities, ...supplementCities };

// 统计
const cityCount = Object.keys(mergedCities).length;
let shelterCount = 0;
let targetCount = 0;

for (const city of Object.values(mergedCities)) {
    if (city.shelters) shelterCount += city.shelters.length;
    if (city.nuclearTargets) targetCount += city.nuclearTargets.length;
}

console.log(`合并完成:`);
console.log(`- 城市总数: ${cityCount}`);
console.log(`- 避难所总数: ${shelterCount}`);
console.log(`- 核打击目标总数: ${targetCount}`);

// 生成新的数据文件内容
const outputContent = `// ============================================
// 核战争城市自救地球仪 - 完整数据 (337城市)
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${cityCount}
// 避难所总数: ${shelterCount}
// 核打击目标总数: ${targetCount}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(mergedCities, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA };
}
`;

// 写入文件
fs.writeFileSync(outputPath, outputContent);
console.log(`\n数据已保存到: ${outputPath}`);
