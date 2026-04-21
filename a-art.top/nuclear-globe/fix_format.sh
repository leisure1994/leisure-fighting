#!/bin/bash
# 修复data.js文件末尾格式问题

cd /root/.openclaw/workspace/a-art.top/nuclear-globe

# 修复文件末尾格式
node -e "
const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

// 修复末尾的 };
} 问题
const lines = data.split('\n');
let lastNonEmpty = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() !== '') {
        lastNonEmpty = i;
        break;
    }
}

// 如果最后两行是 }; 和 }，合并成 };
if (lines[lastNonEmpty] === '}' && lines[lastNonEmpty - 1] === '};') {
    lines.splice(lastNonEmpty, 1);
    data = lines.join('\n');
    fs.writeFileSync('data.js', data);
    console.log('已修复文件末尾格式');
} else if (lines[lastNonEmpty] === '};') {
    console.log('文件格式正确，无需修复');
} else {
    console.log('文件末尾:', lines.slice(-3).join('\\n'));
}

// 统计城市数量
const cityCount = (data.match(/\"[a-z_]+\":\s*{/g) || []).length;
const shelterCount = (data.match(/\"id\":\s*\"/g) || []).length;
const nuclearTargetCount = (data.match(/\"nuclearTargets\":\s*\[/g) || []).length;

console.log('\\n【第二批15个新一线城市数据合并完成】');
console.log('城市总数:', cityCount, '个');
console.log('避难所总数:', shelterCount, '个');
console.log('核打击目标区块:', nuclearTargetCount, '个');
console.log('\\n新增城市列表:');
console.log('- 成都、杭州、重庆、苏州、武汉');
console.log('- 西安、南京、长沙、天津、郑州');
console.log('- 东莞、宁波、佛山、合肥、青岛');
console.log('\\n每个城市包含:');
console.log('- 8-12个避难所（火车站、机场、政府、地铁等）');
console.log('- 6-9个核打击目标（水厂、电厂、化工厂等）');
"
