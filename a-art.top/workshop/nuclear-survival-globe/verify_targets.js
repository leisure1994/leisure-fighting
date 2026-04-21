const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 提取所有核打击目标（有risk属性的）
const nuclearTargetPattern = /\{\s*"(?:id|name)":\s*"[^"]+",\s*"name":\s*"([^"]+)",\s*"type":\s*"([^"]+)",\s*"position":\s*\[([^\]]+)\],\s*"risk":\s*"([^"]+)"\s*\}/g;

let match;
let count = 0;
const citiesWithNuclearTargets = new Set();

while ((match = nuclearTargetPattern.exec(data)) !== null) {
  count++;
}

console.log(`核打击目标总数: ${count}`);

// 按城市统计
const cityPattern = /"([a-z_0-9]+)":\s*\{\s*"name":\s*"([^"]+)"[\s\S]*?"targets":\s*(\[[\s\S]*?\])/g;
let cityMatch;

let totalCities = 0;
let citiesWithTargets = 0;

while ((cityMatch = cityPattern.exec(data)) !== null) {
  const key = cityMatch[1];
  const name = cityMatch[2];
  const targetsStr = cityMatch[3];
  
  if (key === '_placeholder') continue;
  
  totalCities++;
  
  // 检查是否有risk属性（核打击目标特有）
  if (targetsStr.includes('"risk"')) {
    citiesWithTargets++;
  }
}

console.log(`总城市数: ${totalCities}`);
console.log(`有核打击目标的城市: ${citiesWithTargets}`);
console.log(`缺少核打击目标的城市: ${totalCities - citiesWithTargets}`);

// 显示一些城市的targets示例
const sampleCities = ['akesu', 'beijing', 'shanghai', 'changchun'];
for (const key of sampleCities) {
  const pattern = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?"targets":\\s*(\\[[^\\]]*\\])`);
  const m = data.match(pattern);
  if (m) {
    console.log(`\n${key} targets:`, m[1].substring(0, 200) + '...');
  }
}
