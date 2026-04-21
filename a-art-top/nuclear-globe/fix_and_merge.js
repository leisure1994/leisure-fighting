// 修复并合并数据
const fs = require('fs');
const path = require('path');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe';

// 读取当前合并数据
const mergedPath = path.join(dataDir, 'data_merged.js');
let mergedContent = fs.readFileSync(mergedPath, 'utf8');

// 提取当前数据对象（修复嵌套问题）
const match = mergedContent.match(/const\s+NUCLEAR_GLOBE_DATA\s*=\s*(\{[\s\S]*\n\});/);
if (!match) {
    console.log('无法解析当前数据文件');
    process.exit(1);
}

let currentData;
try {
    currentData = eval('(' + match[1] + ')');
    // 如果数据被嵌套，修复它
    if (currentData.NUCLEAR_GLOBE_DATA) {
        currentData = currentData.NUCLEAR_GLOBE_DATA;
    }
} catch (e) {
    console.log('解析错误:', e.message);
    process.exit(1);
}

console.log(`当前已有城市: ${Object.keys(currentData).length}\n`);

// 读取并添加新数据文件
const newFiles = ['data_part9.js', 'data_part10.js'];
let added = 0;

newFiles.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ ${file} 不存在`);
        return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const varName = file.replace('.js', '').toUpperCase().replace(/DATA_PART/, 'PART').replace(/DATA_/, '');
    
    const fileMatch = content.match(new RegExp(`const\\s+${varName}\\s*=\\s*(\\{[\\s\\S]*?\\n\\});`));
    if (fileMatch) {
        try {
            const fileData = eval('(' + fileMatch[1] + ')');
            Object.keys(fileData).forEach(key => {
                if (!currentData[key]) {
                    currentData[key] = fileData[key];
                    added++;
                }
            });
            console.log(`✅ ${file}: 添加 ${Object.keys(fileData).length} 个城市`);
        } catch (e) {
            console.log(`❌ ${file}: 解析错误`);
        }
    } else {
        console.log(`⚠️ ${file}: 无法找到数据`);
    }
});

// 统计
const totalCities = Object.keys(currentData).length;
let totalShelters = 0;
let totalTargets = 0;

Object.values(currentData).forEach(city => {
    totalShelters += city.shelters?.length || 0;
    totalTargets += city.nuclearTargets?.length || 0;
});

console.log(`\n========================================`);
console.log(`📍 城市总数: ${totalCities}`);
console.log(`🏠 避难所总数: ${totalShelters}`);
console.log(`🎯 核打击目标总数: ${totalTargets}`);
console.log(`➕ 新增城市: ${added}`);
console.log(`========================================\n`);

// 生成新文件
const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${totalCities}
// 避难所总数: ${totalShelters}
// 核打击目标总数: ${totalTargets}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(currentData, null, 4)};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NUCLEAR_GLOBE_DATA;
}
`;

fs.writeFileSync(mergedPath, output);
console.log(`✅ 已更新: data_merged.js (${(output.length/1024).toFixed(2)} KB)`);

// 保存统计
fs.writeFileSync(path.join(dataDir, 'merge_stats.json'), JSON.stringify({
    timestamp: new Date().toISOString(),
    totalCities,
    totalShelters,
    totalTargets,
    added
}, null, 2));
