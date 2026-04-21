const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 将文件中的所有 "priority" 替换为 "risk"
// 但只在 targets 数组内进行替换

// 查找所有targets块
const targetsBlocks = data.match(/"targets":\s*\[[\s\S]*?\]/g) || [];
console.log(`找到 ${targetsBlocks.length} 个 targets 块`);

let modifiedCount = 0;

for (const block of targetsBlocks) {
  if (block.includes('"priority"')) {
    // 替换该块内的 priority 为 risk
    const newBlock = block
      .replace(/"priority":/g, '"risk":')
      .replace(/"radius":\s*\d+,?\s*\n?\s*/g, '')
      .replace(/,\s*\n\s*\}\s*\]/g, '\n    }]');
    
    data = data.replace(block, newBlock);
    modifiedCount++;
  }
}

// 保存文件
fs.writeFileSync('data.js', data);

console.log(`修改了 ${modifiedCount} 个 targets 块`);

// 验证
const riskCount = (data.match(/"risk":/g) || []).length;
const priorityCount = (data.match(/"priority":/g) || []).length;
console.log(`\n验证结果:`);
console.log(`risk 字段数量: ${riskCount}`);
console.log(`priority 字段数量: ${priorityCount}`);
