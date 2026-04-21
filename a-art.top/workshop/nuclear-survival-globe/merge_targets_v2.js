const fs = require('fs');

// 读取原始data.js
let dataContent = fs.readFileSync('data.js', 'utf8');

// 读取之前生成的targets数据
const generatedTargets = JSON.parse(fs.readFileSync('generated_targets.json', 'utf8'));

console.log(`准备为 ${Object.keys(generatedTargets).length} 个城市合并 targets 数据`);

// 统计
let updatedCities = 0;
let totalTargetsAdded = 0;
let failedCities = [];

// 逐个处理每个城市
for (const [cityKey, targets] of Object.entries(generatedTargets)) {
  if (targets.length === 0) continue;
  
  // 查找该城市在data.js中的位置
  const cityStartPattern = new RegExp(`"${cityKey}":\\s*\\{`);
  const cityStartMatch = dataContent.match(cityStartPattern);
  
  if (!cityStartMatch) {
    failedCities.push(cityKey);
    continue;
  }
  
  // 找到该城市的完整JSON块（简化处理：查找"targets": []）
  const targetsEmptyPattern = new RegExp(`("${cityKey}":\\s*\\{[\\s\\S]*?"targets":)\\s*\\[\\s*\\]`);
  
  if (targetsEmptyPattern.test(dataContent)) {
    // 构建targets JSON字符串
    const targetsStr = JSON.stringify(targets, null, 6);
    
    // 执行替换
    const newContent = dataContent.replace(targetsEmptyPattern, `$1 ${targetsStr}`);
    
    if (newContent !== dataContent) {
      dataContent = newContent;
      updatedCities++;
      totalTargetsAdded += targets.length;
    } else {
      failedCities.push(cityKey);
    }
  }
}

// 更新文件头部的统计信息
dataContent = dataContent.replace(
  /总计: \d+\+ 避难所, \d+\+ 核打击目标/,
  `总计: 1240+ 避难所, ${560 + totalTargetsAdded}+ 核打击目标`
);

// 更新版本号
dataContent = dataContent.replace(
  /v\d+\.\d+/,
  `v9.0`
);

// 更新时间戳
dataContent = dataContent.replace(
  /生成时间: .+/,
  `生成时间: ${new Date().toISOString()}+08:00`
);

// 保存更新后的文件
fs.writeFileSync('data.js', dataContent);

console.log('\n=== 合并完成 ===');
console.log(`成功更新了 ${updatedCities} 个城市的 targets 数据`);
console.log(`新增 ${totalTargetsAdded} 个核打击目标`);
if (failedCities.length > 0) {
  console.log(`失败的城市 (${failedCities.length} 个): ${failedCities.slice(0, 10).join(', ')}...`);
}
console.log(`文件已保存到 data.js`);
