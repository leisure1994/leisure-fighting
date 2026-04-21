const fs = require('fs');

// 读取主数据文件
let mainContent = fs.readFileSync('data.js', 'utf8');
let remainingContent = fs.readFileSync('data_batch_remaining.js', 'utf8');

// 提取城市数据（从const SHELTER_DATA = { 到最后的};）
const mainMatch = mainContent.match(/const SHELTER_DATA = \{([\s\S]*?)\};/);
const remainingMatch = remainingContent.match(/const [A-Z_]+ = \{([\s\S]*?)\};/);

if (!mainMatch || !remainingMatch) {
    console.error('无法解析数据文件');
    process.exit(1);
}

// 解析城市对象
let mainCities, remainingCities;
try {
    mainCities = eval('({' + mainMatch[1] + '})');
    remainingCities = eval('({' + remainingMatch[1] + '})');
} catch (e) {
    console.error('解析失败:', e);
    process.exit(1);
}

// 合并
const mergedCities = { ...mainCities, ...remainingCities };
const cityCount = Object.keys(mergedCities).length;

// 统计
let shelterCount = 0;
let targetCount = 0;
for (const city of Object.values(mergedCities)) {
    if (city.shelters) shelterCount += city.shelters.length;
    if (city.targets) targetCount += city.targets.length;
}

console.log(`合并完成: ${cityCount}城市, ${shelterCount}避难所, ${targetCount}目标`);

// 生成新文件
const output = `/**
 * 核战争城市自救地球仪 - 完整避难所数据 v7.0
 * 覆盖中国${cityCount}个地级及以上城市
 * 总计: ${shelterCount}+ 避难所, ${targetCount}+ 核打击目标
 * 生成时间: ${new Date().toISOString()}
 */

const SHELTER_DATA = ${JSON.stringify(mergedCities, null, 2)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SHELTER_DATA };
}
`;

fs.writeFileSync('data.js', output);
console.log('✅ 合并完成，已更新data.js');
