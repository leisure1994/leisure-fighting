const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 统计有risk字段的目标（核打击目标）
const nuclearTargetPattern = /"risk":\s*"([^"]+)"/g;
let match;
let nuclearCount = 0;
const riskLevels = {};

while ((match = nuclearTargetPattern.exec(data)) !== null) {
  nuclearCount++;
  const risk = match[1];
  riskLevels[risk] = (riskLevels[risk] || 0) + 1;
}

console.log(`核打击目标总数: ${nuclearCount}`);
console.log('风险等级分布:', riskLevels);

// 统计总targets字段数量
const allTargetsPattern = /"targets":\s*\[/g;
let totalTargetsFields = 0;
while (allTargetsPattern.exec(data)) totalTargetsFields++;
console.log(`\ntargets字段总数: ${totalTargetsFields}`);

// 统计城市数量
const cityPattern = /"[a-z_0-9]+":\s*\{\s*"name":\s*"[^"]+",\s*"center"/g;
let cityCount = 0;
while (cityPattern.exec(data)) cityCount++;
console.log(`城市数量: ${cityCount}（包含_placeholder）`);
