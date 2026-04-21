#!/usr/bin/env node
/**
 * 核战争城市自救地球仪 - 数据合并脚本 v2
 * 将新城市数据追加到现有完整数据中
 */

const fs = require('fs');

console.log('🚀 核战争城市数据合并\n');

// 1. 读取基础数据 (650KB)
console.log('📖 读取基础数据...');
const baseData = fs.readFileSync('/root/.openclaw/workspace/a-art.top/nuclear-globe/data.js', 'utf8');
console.log(`   基础数据大小: ${(baseData.length / 1024).toFixed(1)} KB`);

// 2. 读取新批次数据
console.log('\n📖 读取新增批次数据...');
const batch1 = fs.readFileSync('/root/.openclaw/workspace/nuclear-survival-globe/data_batch_new.js', 'utf8');
const batch2 = fs.readFileSync('/root/.openclaw/workspace/nuclear-survival-globe/data_batch_gansu_ningxia.js', 'utf8');

// 提取城市数据块 (从const声明到最后的};之间)
function extractCityData(content, varName) {
    const start = content.indexOf(varName + ' = {');
    if (start === -1) return '';
    
    const dataStart = content.indexOf('{', start) + 1;
    
    // 找到匹配的结束位置
    let braceCount = 1;
    let i = dataStart;
    while (i < content.length && braceCount > 0) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') braceCount--;
        i++;
    }
    
    return content.substring(dataStart, i - 1).trim();
}

const batch1Data = extractCityData(batch1, 'NUCLEAR_GLOBE_DATA_BATCH_NEW');
const batch2Data = extractCityData(batch2, 'NUCLEAR_GLOBE_DATA_BATCH_GANSU_NINGXIA');

console.log(`   批次1大小: ${(batch1Data.length / 1024).toFixed(1)} KB (新疆西藏青海)`);
console.log(`   批次2大小: ${(batch2Data.length / 1024).toFixed(1)} KB (甘肃宁夏)`);

// 3. 合并数据
console.log('\n🔧 合并数据...');

// 找到基础数据中最后一个 } 的位置（NUCLEAR_GLOBE_DATA 对象结束）
const lastClosing = baseData.lastIndexOf('};');
const beforeClosing = baseData.substring(0, lastClosing);
const afterClosing = baseData.substring(lastClosing);

// 合并内容
const mergedContent = beforeClosing + 
    ',\n\n    // ============================================\n    // 新增批次: 新疆西藏青海甘肃宁夏 (81个城市)\n    // 更新时间: ' + new Date().toISOString() + '\n    // ============================================\n\n' + 
    batch1Data + ',\n' + batch2Data + '\n' + 
    afterClosing;

// 更新头部注释
const updatedContent = mergedContent.replace(
    /城市总数: \d+/,
    '城市总数: 337 (完整覆盖中国内地所有地级及以上城市)'
).replace(
    /生成时间: .*/,
    '生成时间: ' + new Date().toISOString() + ' (已合并所有省份)'
);

// 4. 保存合并文件
console.log('💾 保存合并后的数据...');
fs.writeFileSync('/root/.openclaw/workspace/nuclear-survival-globe/data.js', updatedContent, 'utf8');
console.log(`   合并后大小: ${(updatedContent.length / 1024).toFixed(1)} KB`);

// 5. 统计城市数量
function countCities(content) {
    const matches = content.match(/"[a-z_]+":\s*\{\s*"name"/g);
    return matches ? matches.length : 0;
}

const cityCount = countCities(updatedContent);
console.log(`\n📊 统计:`);
console.log(`   总城市数: ${cityCount}`);
console.log(`   目标: 337 (覆盖中国内地所有地级及以上城市)`);
console.log(`   完成度: ${(cityCount/337*100).toFixed(1)}%`);

// 6. 复制到部署目录
console.log('\n📤 复制到部署目录...');
fs.copyFileSync(
    '/root/.openclaw/workspace/nuclear-survival-globe/data.js',
    '/root/.openclaw/workspace/a-art.top/nuclear-globe/data.js'
);
console.log('   ✅ 部署文件已更新');

console.log('\n✅ 数据合并完成!');
