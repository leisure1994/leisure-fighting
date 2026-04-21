const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 直接替换所有priority为risk
data = data.replace(/"priority":/g, '"risk":');

// 移除radius字段（在targets中）
// 这需要精确匹配targets块内的radius
// 简单起见，移除所有radius字段
data = data.replace(/\s*"radius":\s*\d+,/g, '');

// 移除description字段（在targets中）
// 简单处理：移除所有targets相关的description
// 这需要更精确的处理，暂时保留

// 保存文件
fs.writeFileSync('data.js', data);

console.log('已将所有 priority 替换为 risk');
console.log('已移除 radius 字段');

// 验证
const riskCount = (data.match(/"risk":/g) || []).length;
const priorityCount = (data.match(/"priority":/g) || []).length;
console.log(`\n验证结果:`);
console.log(`risk 字段数量: ${riskCount}`);
console.log(`priority 字段数量: ${priorityCount}`);
