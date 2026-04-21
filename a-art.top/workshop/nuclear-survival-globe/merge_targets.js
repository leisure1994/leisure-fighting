const fs = require('fs');

// 读取原始data.js
let dataContent = fs.readFileSync('data.js', 'utf8');

// 读取生成的targets数据
const targetsData = JSON.parse(fs.readFileSync('generated_targets.json', 'utf8'));

// 统计
let updatedCities = 0;
let totalTargets = 0;

// 为每个城市替换targets部分
for (const [cityKey, targets] of Object.entries(targetsData)) {
  if (targets.length === 0) continue;
  
  // 构建新的targets JSON
  const targetsJson = JSON.stringify(targets, null, 6).replace(/\]/, '    ]');
  
  // 创建替换模式 - 匹配 "targets": []
  const pattern = new RegExp(`"${cityKey}":\\s*\\{[\\s\\S]*?"targets":\\s*\\[\\s*\\]`, 'g');
  
  // 检查是否存在匹配
  if (pattern.test(dataContent)) {
    // 重置lastIndex
    pattern.lastIndex = 0;
    
    // 执行替换
    dataContent = dataContent.replace(pattern, (match) => {
      // 找到targets部分并替换
      return match.replace('"targets": []', `"targets": ${targetsJson}`);
    });
    
    updatedCities++;
    totalTargets += targets.length;
  }
}

// 更新头部统计信息
const oldHeader = dataContent.match(/总计: \d+\+ 避难所, \d+\+ 核打击目标/);
if (oldHeader) {
  const newHeader = `总计: 1240+ 避难所, ${560 + totalTargets}+ 核打击目标`;
  dataContent = dataContent.replace(oldHeader[0], newHeader);
}

// 更新时间戳
const oldTime = dataContent.match(/生成时间: .+/);
if (oldTime) {
  const newTime = `生成时间: ${new Date().toISOString()}`;
  dataContent = dataContent.replace(oldTime[0], newTime);
}

// 保存更新后的文件
fs.writeFileSync('data.js', dataContent);

console.log('=== 合并完成 ===');
console.log(`更新了 ${updatedCities} 个城市的 targets 数据`);
console.log(`新增 ${totalTargets} 个核打击目标`);
console.log(`文件已保存到 data.js`);
