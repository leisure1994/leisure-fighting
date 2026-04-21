// 完整数据合并与修复脚本
const fs = require('fs');
const vm = require('vm');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe/';
const outputFile = dataDir + 'data_merged.js';

const allCities = {};
const stats = {
    processed: [],
    duplicates: [],
    errors: []
};

// 从文件提取城市数据
function extractCities(filePath, varName) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
        const context = {};
        vm.createContext(context);
        vm.runInContext(content, context, { timeout: 10000 });
        
        const possibleNames = [varName, 'NUCLEAR_GLOBE_DATA', 'PART2_CITIES', 'PART3_CITIES', 
                               'PART4_CITIES', 'PART5_CITIES', 'PART6_CITIES', 'PART7_CITIES', 
                               'PART8_CITIES', 'BATCH3_CITIES', 'CITIES'];
        
        for (const name of possibleNames) {
            if (context[name] && typeof context[name] === 'object') {
                const cities = context[name];
                const count = Object.keys(cities).length;
                if (count > 0) {
                    return { success: true, cities, count, varFound: name };
                }
            }
        }
    } catch(e) {}
    
    return { success: false, error: '无法解析' };
}

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

console.log('🚀 开始数据合并...\n');

for (const { file, varName } of files) {
    const filePath = dataDir + file;
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  跳过: ${file} (不存在)`);
        continue;
    }
    
    const result = extractCities(filePath, varName);
    
    if (result.success) {
        const cityNames = Object.keys(result.cities);
        console.log(`✅ ${file}: ${result.count} 个城市 (变量: ${result.varFound})`);
        
        stats.processed.push({ file, count: result.count, varName: result.varFound });
        
        for (const [key, data] of Object.entries(result.cities)) {
            if (allCities[key]) {
                stats.duplicates.push({ city: key, file });
            } else {
                allCities[key] = data;
            }
        }
    } else {
        console.log(`❌ ${file}: ${result.error}`);
        stats.errors.push({ file, error: result.error });
    }
}

const totalCities = Object.keys(allCities).length;

console.log('\n' + '='.repeat(60));
console.log('📊 合并统计');
console.log('='.repeat(60));
stats.processed.forEach(s => {
    console.log(`${s.file.padEnd(20)} → ${s.count.toString().padStart(3)} 城市 (${s.varName})`);
});
console.log('-'.repeat(60));
console.log(`📍 合并后总城市数: ${totalCities}`);
console.log(`⚠️  重复城市: ${stats.duplicates.length}`);

console.log('\n📝 生成 data_merged.js...');

const output = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 中国内地地级及以上城市全覆盖
// 生成时间: ${new Date().toISOString()}
// 数据来源: ${stats.processed.length} 个文件
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

const context = {};
vm.createContext(context);
try {
    vm.runInContext(output, context, { timeout: 10000 });
    const verifyCount = Object.keys(context.NUCLEAR_GLOBE_DATA || {}).length;
    const stats = context.getCityStats ? context.getCityStats() : null;
    
    console.log('✅ JavaScript语法验证通过');
    console.log(`📊 实际加载城市数: ${verifyCount}`);
    if (stats) {
        console.log(`   避难所总数: ${stats.totalShelters}`);
        console.log(`   核目标总数: ${stats.totalTargets}`);
    }
    
    const size = fs.statSync(outputFile).size;
    console.log(`📁 文件大小: ${(size/1024).toFixed(2)} KB (${(size/1024/1024).toFixed(2)} MB)`);
    
    console.log('\n🎉 数据合并完成！');
} catch(e) {
    console.log('❌ 语法错误:', e.message);
    process.exit(1);
}
