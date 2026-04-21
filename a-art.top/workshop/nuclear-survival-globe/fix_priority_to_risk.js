const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 将priority字段转换为risk字段
const citiesToFix = ['danzhou', 'sansha', 'rikaze', 'changdu', 'linzhi', 'shannan'];

let fixedCount = 0;

for (const cityKey of citiesToFix) {
  // 查找该城市的targets部分
  const cityPattern = new RegExp(`"${cityKey}":\\s*\\{[\\s\\S]*?"targets":\\s*\\[(\\[[^\\]]*priority[^\\]]*\\])`, 'g');
  
  if (data.includes(`"${cityKey}":`) && data.includes('"priority"')) {
    // 替换该城市块内的所有priority为risk
    // 先找到该城市的完整块
    const blockStart = data.indexOf(`"${cityKey}":`);
    if (blockStart === -1) continue;
    
    // 找到该城市块的结束位置（下一个城市或文件结束）
    let blockEnd = data.indexOf('\n  },\n  "', blockStart + 10);
    if (blockEnd === -1) blockEnd = data.indexOf('\n}\n};', blockStart);
    
    let cityBlock = data.substring(blockStart, blockEnd);
    
    // 如果包含priority，替换为risk
    if (cityBlock.includes('"priority"')) {
      cityBlock = cityBlock.replace(/"priority":/g, '"risk":');
      cityBlock = cityBlock.replace(/"radius":\s*\d+,\s*\n\s*/g, '');
      cityBlock = cityBlock.replace(/"description":\s*"[^"]*",?\s*\n?/g, '');
      
      data = data.substring(0, blockStart) + cityBlock + data.substring(blockEnd);
      fixedCount++;
      console.log(`已修复 ${cityKey} 的 targets 格式`);
    }
  }
}

// 保存文件
fs.writeFileSync('data.js', data);

console.log(`\n=== 修复完成 ===`);
console.log(`修复了 ${fixedCount} 个城市的 targets 格式`);
