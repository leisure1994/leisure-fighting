const fs = require('fs');

// 读取文件
const data = fs.readFileSync('data.js', 'utf8');

// 提取所有城市数据
const cityPattern = /"([a-z_0-9]+)":\s*\{[\s\S]*?"name":\s*"([^"]+)"[\s\S]*?"center":\s*\[([^\]]+)\][\s\S]*?"targets":\s*(\[[^\]]*\])/g;

const citiesWithoutTargets = [];
const citiesWithTargets = [];
let match;

while ((match = cityPattern.exec(data)) !== null) {
  const key = match[1];
  const name = match[2];
  const center = match[3].split(',').map(n => parseFloat(n.trim()));
  const targetsStr = match[4];
  
  if (key === '_placeholder') continue;
  
  // 检查是否有实际目标数据（包含name字段）
  if (targetsStr.includes('"name"')) {
    // 计算目标数量
    const targetCount = (targetsStr.match(/"name":/g) || []).length;
    citiesWithTargets.push({ key, name, targetCount });
  } else {
    citiesWithoutTargets.push({ key, name, center });
  }
}

console.log('=== 统计报告 ===');
console.log(`有 targets 数据的城市: ${citiesWithTargets.length}`);
console.log(`缺少 targets 数据的城市: ${citiesWithoutTargets.length}`);
console.log(`总城市数: ${citiesWithTargets.length + citiesWithoutTargets.length}`);

console.log('\n=== 缺少 targets 的城市列表 (前20个) ===');
citiesWithoutTargets.slice(0, 20).forEach((c, i) => {
  console.log(`${i+1}. ${c.name} (${c.key}) - 中心: [${c.center.join(', ')}]`);
});

console.log('\n=== 有 targets 的城市示例 ===');
citiesWithTargets.slice(0, 5).forEach(c => {
  console.log(`${c.name} (${c.key}): ${c.targetCount} 个目标`);
});

// 保存JSON供后续使用
fs.writeFileSync('cities_without_targets.json', JSON.stringify(citiesWithoutTargets, null, 2));
fs.writeFileSync('cities_with_targets.json', JSON.stringify(citiesWithTargets, null, 2));
console.log('\n已保存 JSON 文件');
