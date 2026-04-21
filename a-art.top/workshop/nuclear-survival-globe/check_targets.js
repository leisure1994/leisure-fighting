const fs = require('fs');

const data = fs.readFileSync('data.js', 'utf8');

// 提取所有城市名和targets
const cityMatches = data.match(/"[a-z_]+":\s*\{/g) || [];
const cities = [];

for (const match of cityMatches) {
  const cityKey = match.replace(/["\:]/g, '').replace('{', '').trim();
  if (cityKey === '_placeholder') continue;
  
  // 查找该城市的targets
  const cityPattern = new RegExp(`"${cityKey}":\\s*\\{[^}]*"name":\\s*"([^"]+)"[^}]*"targets":\\s*(\\[[^\\]]*\\])`, 's');
  const cityMatch = data.match(cityPattern);
  
  if (cityMatch) {
    const cityName = cityMatch[1];
    const targetsStr = cityMatch[2];
    const hasTargets = targetsStr.includes('"name"'); // 检查是否有实际目标
    
    if (!hasTargets) {
      cities.push({ key: cityKey, name: cityName });
    }
  }
}

console.log('缺少 targets 数据的城市列表:');
console.log(`共 ${cities.length} 个城市`);
console.log('\n城市列表:');
cities.forEach((c, i) => {
  console.log(`${i+1}. ${c.name} (${c.key})`);
});
