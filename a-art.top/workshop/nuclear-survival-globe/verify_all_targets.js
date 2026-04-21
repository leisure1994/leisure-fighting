const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 提取所有城市名并检查是否有risk字段
const cityBlockPattern = /"([a-z_0-9]+)":\s*\{\s*"name":\s*"([^"]+)"[\s\S]*?"targets":\s*(\[[\s\S]*?\])\s*\}/g;

let match;
const citiesWithNuclearTargets = [];
const citiesWithoutNuclearTargets = [];

while ((match = cityBlockPattern.exec(data)) !== null) {
  const key = match[1];
  const name = match[2];
  const targetsBlock = match[3];
  
  if (key === '_placeholder') continue;
  
  // 检查是否包含risk字段（核打击目标的特征）
  if (targetsBlock.includes('"risk"')) {
    // 统计目标数量
    const targetCount = (targetsBlock.match(/"risk":/g) || []).length;
    citiesWithNuclearTargets.push({ key, name, count: targetCount });
  } else {
    citiesWithoutNuclearTargets.push({ key, name });
  }
}

console.log('=== 核打击目标数据验证 ===');
console.log(`有核打击目标的城市: ${citiesWithNuclearTargets.length}`);
console.log(`缺少核打击目标的城市: ${citiesWithoutNuclearTargets.length}`);
console.log(`总计城市数: ${citiesWithNuclearTargets.length + citiesWithoutNuclearTargets.length}`);

if (citiesWithoutNuclearTargets.length > 0) {
  console.log('\n=== 缺少核打击目标的城市 ===');
  citiesWithoutNuclearTargets.forEach((c, i) => {
    console.log(`${i+1}. ${c.name} (${c.key})`);
  });
}

// 统计核打击目标总数
const totalNuclearTargets = citiesWithNuclearTargets.reduce((sum, c) => sum + c.count, 0);
console.log(`\n核打击目标总数: ${totalNuclearTargets}`);

// 显示目标最多的城市
const sorted = [...citiesWithNuclearTargets].sort((a, b) => b.count - a.count);
console.log('\n=== 核打击目标最多的前10个城市 ===');
sorted.slice(0, 10).forEach((c, i) => {
  console.log(`${i+1}. ${c.name}: ${c.count} 个目标`);
});

console.log('\n=== 验证结果 ===');
if (citiesWithoutNuclearTargets.length === 0) {
  console.log('✅ 所有 336 个城市都有完整的核打击目标数据');
} else {
  console.log('❌ 还有部分城市缺少核打击目标数据');
}
