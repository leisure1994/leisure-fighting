// 核战争城市自救地球仪 - 完整合并数据
// 使用简单方式合并所有数据文件
// 生成时间: 2026-04-17

const fs = require('fs');
const path = require('path');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe';

// 手动构建数据
let allData = {};

// 加载各个数据文件并合并
const dataFiles = [
    { name: 'data.js', var: 'NUCLEAR_GLOBE_DATA' },
    { name: 'data_part2.js', var: 'PART2_CITIES' },
    { name: 'data_part3.js', var: 'PART3_CITIES' },
    { name: 'data_part4.js', var: 'PART4_CITIES' },
    { name: 'data_part5.js', var: 'PART5_CITIES' },
    { name: 'data_part6.js', var: 'PART6_CITIES' },
    { name: 'data_part7.js', var: 'PART7_CITIES' },
    { name: 'data_part8.js', var: 'PART8_CITIES' },
    { name: 'data_part9.js', var: 'PART9_CITIES' },
    { name: 'data_part10.js', var: 'PART10_CITIES' },
    { name: 'batch3_data.js', var: 'CITIES' }
];

console.log('开始合并数据...\n');

dataFiles.forEach(file => {
    const filePath = path.join(dataDir, file.name);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ 跳过: ${file.name} (不存在)`);
        return;
    }
    
    try {
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 移除模块导出代码
        content = content.replace(/if\s*\(\s*typeof\s+module[\s\S]*?\}\s*$/, '');
        
        // 执行代码获取数据
        const tempData = {};
        const tempFunc = new Function(file.var, 'return ' + file.var);
        
        // 使用正则提取数据对象
        const match = content.match(new RegExp(`const\\s+${file.var}\\s*=\\s*(\\{[\\s\\S]*?\\n\\};?)`, 'm'));
        if (match) {
            let dataStr = match[1];
            // 移除末尾的分号
            dataStr = dataStr.replace(/;\s*$/, '');
            
            try {
                const data = eval('(' + dataStr + ')');
                
                // 合并数据
                let added = 0;
                Object.keys(data).forEach(key => {
                    if (!allData[key]) {
                        allData[key] = data[key];
                        added++;
                    }
                });
                
                console.log(`✅ ${file.name}: 添加 ${added} 个城市`);
            } catch (e) {
                console.log(`❌ ${file.name}: 解析错误 - ${e.message}`);
            }
        } else {
            console.log(`⚠️ ${file.name}: 无法找到数据对象`);
        }
    } catch (e) {
        console.log(`❌ ${file.name}: ${e.message}`);
    }
});

// 统计
const totalCities = Object.keys(allData).length;
let totalShelters = 0;
let totalTargets = 0;

Object.values(allData).forEach(city => {
    totalShelters += city.shelters?.length || 0;
    totalTargets += city.nuclearTargets?.length || 0;
});

console.log(`\n========================================`);
console.log(`📍 城市总数: ${totalCities}`);
console.log(`🏠 避难所总数: ${totalShelters}`);
console.log(`🎯 核打击目标总数: ${totalTargets}`);
console.log(`========================================\n`);

// 生成输出
const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${totalCities}
// 避难所总数: ${totalShelters}
// 核打击目标总数: ${totalTargets}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allData, null, 4)};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
`;

fs.writeFileSync(path.join(dataDir, 'data_merged.js'), output);
console.log(`✅ 已保存: data_merged.js (${(output.length/1024).toFixed(2)} KB)`);

// 保存统计
fs.writeFileSync(path.join(dataDir, 'merge_stats.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalCities,
    totalShelters,
    totalTargets
}, null, 2));
