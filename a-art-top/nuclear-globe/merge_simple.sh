#!/bin/bash
# 简单直接的数据合并脚本

cd /root/.openclaw/workspace/a-art-top/nuclear-globe/

OUTPUT="data_merged.js"

echo "🚀 开始数据合并..."

# 创建临时合并脚本
node << 'NODE_EOF'
const fs = require('fs');
const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe/';
const outputFile = dataDir + 'data_merged.js';

const files = [
    { file: 'data.js', varName: 'NUCLEAR_GLOBE_DATA' },
    { file: 'data_part2.js', varName: 'PART2_CITIES' },
    { file: 'data_part3.js', varName: 'PART3_CITIES' },
    { file: 'data_part4.js', varName: 'PART4_CITIES' },
    { file: 'data_part5.js', varName: 'PART5_CITIES' },
    { file: 'data_part6.js', varName: 'PART6_CITIES' },
    { file: 'data_part7.js', varName: 'PART7_CITIES' },
    { file: 'data_part8.js', varName: 'PART8_CITIES' },
    { file: 'batch3_data.js', varName: 'BATCH3_CITIES' }
];

const allCities = {};
const stats = { processed: [], duplicates: 0 };

// 简单提取：找到变量定义并解析
function extractCities(filePath, varName) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 删除导出相关代码，避免执行问题
    content = content.replace(/if\s*\(\s*typeof\s+module[\s\S]*?\}\s*$/gm, '');
    
    // 在沙箱中执行
    const code = `
        var module = { exports: {} };
        var exports = module.exports;
        ${content}
        __RESULT = ${varName};
    `;
    
    try {
        const result = eval(code);
        return result;
    } catch(e) {
        // 尝试其他变量名
        const otherVars = ['NUCLEAR_GLOBE_DATA', 'PART2_CITIES', 'PART3_CITIES', 'PART4_CITIES', 
                          'PART5_CITIES', 'PART6_CITIES', 'PART7_CITIES', 'PART8_CITIES', 'BATCH3_CITIES', 'CITIES'];
        for (const v of otherVars) {
            try {
                const code2 = `
                    var module = { exports: {} };
                    var exports = module.exports;
                    ${content}
                    __RESULT = ${v};
                `;
                const result = eval(code2);
                if (result && Object.keys(result).length > 0) {
                    return result;
                }
            } catch(e2) {}
        }
        return null;
    }
}

for (const { file, varName } of files) {
    const filePath = dataDir + file;
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  跳过: ${file} (不存在)`);
        continue;
    }
    
    const cities = extractCities(filePath, varName);
    
    if (cities && Object.keys(cities).length > 0) {
        const count = Object.keys(cities).length;
        console.log(`✅ ${file}: ${count} 个城市`);
        stats.processed.push({ file, count });
        
        for (const [key, data] of Object.entries(cities)) {
            if (allCities[key]) {
                stats.duplicates++;
            } else {
                allCities[key] = data;
            }
        }
    } else {
        console.log(`❌ ${file}: 无法解析`);
    }
}

const totalCities = Object.keys(allCities).length;

console.log(`\n📊 统计: ${stats.processed.length} 个文件, ${totalCities} 个城市`);
if (stats.duplicates > 0) console.log(`⚠️  重复: ${stats.duplicates} 个`);

// 生成输出
const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${totalCities}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allCities, null, 4)};

const CITY_LIST = Object.keys(NUCLEAR_GLOBE_DATA);

function getCityStats() {
    return {
        totalCities: CITY_LIST.length,
        totalShelters: CITY_LIST.reduce((sum, city) => sum + (NUCLEAR_GLOBE_DATA[city].shelters?.length || 0), 0),
        totalTargets: CITY_LIST.reduce((sum, city) => sum + (NUCLEAR_GLOBE_DATA[city].nuclearTargets?.length || 0), 0)
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA, CITY_LIST, getCityStats };
}
`;

fs.writeFileSync(outputFile, output);

// 验证
const verify = eval(output.replace(/if\s*\(\s*typeof\s+module[\s\S]*?\}\s*$/gm, ''));
console.log(`✅ 验证通过: ${Object.keys(verify.NUCLEAR_GLOBE_DATA).length} 个城市`);

const stats2 = verify.getCityStats();
console.log(`   避难所: ${stats2.totalShelters}`);
console.log(`   核目标: ${stats2.totalTargets}`);

const size = fs.statSync(outputFile).size;
console.log(`📁 文件大小: ${(size/1024).toFixed(2)} KB`);
NODE_EOF

echo ""
echo "🎉 合并完成！"
