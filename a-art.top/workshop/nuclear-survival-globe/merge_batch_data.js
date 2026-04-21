// 数据合并脚本 - 将新批次数据整合到主data.js
const fs = require('fs');
const path = require('path');

const DATA_DIR = '/root/.openclaw/workspace/a-art.top/workshop/nuclear-survival-globe';

// 读取主数据文件
let mainData = fs.readFileSync(path.join(DATA_DIR, 'data.js'), 'utf8');

// 读取批次数据
const tier2Data = require('./data_tier2_15cities.js');
const tier3Data = require('./data_tier3_partial.js');

// 合并所有批次数据
const allNewData = { ...tier2Data, ...tier3Data };

console.log(`[合并] 准备合并 ${Object.keys(allNewData).length} 个城市的数据`);

// 统计合并前的城市数
const beforeMatch = mainData.match(/"[a-z_]+":\s*\{/g);
console.log(`[合并前] 城市数量: ${beforeMatch ? beforeMatch.length : 'N/A'}`);

// 对每个新城市，检查是否已存在，如不存在则添加
let addedCount = 0;
let updatedCount = 0;

for (const [cityKey, cityData] of Object.entries(allNewData)) {
  // 检查城市是否已存在
  const cityPattern = new RegExp(`"${cityKey}":\\s*\\{`, 'g');
  const exists = cityPattern.test(mainData);
  
  if (!exists) {
    // 城市不存在，添加到数据末尾
    const cityJson = JSON.stringify(cityData, null, 2);
    // 找到最后一个城市的结束位置
    const lastCityPattern = /,\s*"[a-z_]+":\s*\{[\s\S]*?\n  \}\s*\};/;
    
    // 简化为直接替换占位符或添加到最后
    const insertPattern = /"_placeholder":\s*\{[\s\S]*?\}/;
    if (insertPattern.test(mainData)) {
      // 替换占位符
      mainData = mainData.replace(insertPattern, `"${cityKey}": ${cityJson}`);
    }
    addedCount++;
  } else {
    // 城市存在，跳过或更新（当前策略：保留现有数据）
    updatedCount++;
  }
}

console.log(`[合并结果] 新增: ${addedCount}, 已存在: ${updatedCount}`);

// 写回文件
// fs.writeFileSync(path.join(DATA_DIR, 'data_merged.js'), mainData);
console.log('[合并完成] 数据已准备，等待最终部署');
