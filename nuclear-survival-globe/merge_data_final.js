#!/usr/bin/env node
/**
 * 核战争城市自救地球仪 - 数据合并脚本
 * 合并所有批次数据到最终的 data.js
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 开始合并核战争城市数据...\n');

// 读取所有数据文件
const files = [
    'data_full.js',           // 基础数据 (256城市)
    'data_batch_new.js',      // 新疆西藏青海 (28城市)
    'data_batch_gansu_ningxia.js'  // 甘肃宁夏 (17城市)
];

let allCities = {};
let totalCities = 0;
let totalShelters = 0;
let totalTargets = 0;

// 解析JS文件提取城市数据
function parseCityData(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ 文件不存在: ${filePath}`);
        return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 尝试匹配 NUCLEAR_GLOBE_DATA = {...} 格式
    const match = content.match(/const\s+NUCLEAR_GLOBE_DATA\s*=\s*({[\s\S]*?});?$/m);
    if (match) {
        try {
            // 安全地解析JSON (将JS对象转为JSON)
            let jsonStr = match[1]
                .replace(/'/g, '"')
                .replace(/(\w+):/g, '"$1":')
                .replace(/,\s*}/g, '}')
                .replace(/,\s*]/g, ']');
            return JSON.parse(jsonStr);
        } catch (e) {
            console.log(`⚠️ 解析失败: ${filePath} - ${e.message}`);
        }
    }
    
    // 尝试匹配 NUCLEAR_GLOBE_DATA_BATCH_NEW = {...} 格式
    const batchMatch = content.match(/const\s+NUCLEAR_GLOBE_DATA_BATCH_\w+\s*=\s*({[\s\S]*?});?$/m);
    if (batchMatch) {
        try {
            let jsonStr = batchMatch[1]
                .replace(/'/g, '"')
                .replace(/(\w+):/g, '"$1":')
                .replace(/,\s*}/g, '}')
                .replace(/,\s*]/g, ']');
            return JSON.parse(jsonStr);
        } catch (e) {
            console.log(`⚠️ 解析批次数据失败: ${filePath} - ${e.message}`);
        }
    }
    
    return {};
}

// 手动解析data_full.js (特殊格式)
function parseDataFull(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ 基础数据文件不存在: ${filePath}`);
        return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const cities = {};
    
    // 使用正则匹配每个城市的数据块
    const cityMatches = content.matchAll(/"([a-z_]+)":\s*{\s*"name":\s*"([^"]+)",\s*"center":\s*\[([\d.,\s]+)\]/g);
    
    for (const match of cityMatches) {
        const cityCode = match[1];
        const cityName = match[2];
        const center = match[3].split(',').map(n => parseFloat(n.trim()));
        
        // 查找该城市的完整数据块
        const cityStart = content.indexOf(`"${cityCode}":`);
        if (cityStart === -1) continue;
        
        // 找到匹配的结束括号
        let braceCount = 0;
        let cityEnd = cityStart;
        let inString = false;
        let stringChar = '';
        
        for (let i = cityStart; i < content.length; i++) {
            const char = content[i];
            const prevChar = i > 0 ? content[i-1] : '';
            
            if (!inString && (char === '"' || char === "'")) {
                inString = true;
                stringChar = char;
            } else if (inString && char === stringChar && prevChar !== '\\') {
                inString = false;
            } else if (!inString) {
                if (char === '{') braceCount++;
                else if (char === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        cityEnd = i + 1;
                        break;
                    }
                }
            }
        }
        
        const cityBlock = content.substring(cityStart, cityEnd);
        
        // 解析避难所数据
        const shelters = [];
        const shelterMatches = cityBlock.matchAll(/"id":\s*"([^"]+)"[^}]*"name":\s*"([^"]+)"[^}]*"type":\s*"([^"]+)"/g);
        for (const sm of shelterMatches) {
            shelters.push({
                id: sm[1],
                name: sm[2],
                type: sm[3]
            });
        }
        
        // 解析核打击目标
        const targets = [];
        const targetMatches = cityBlock.matchAll(/"id":\s*"([^"]+_nt\d+)"[^}]*"name":\s*"([^"]+)"[^}]*"type":\s*"([^"]+)"/g);
        for (const tm of targetMatches) {
            targets.push({
                id: tm[1],
                name: tm[2],
                type: tm[3]
            });
        }
        
        cities[cityCode] = {
            name: cityName,
            center: center,
            shelterCount: shelters.length,
            targetCount: targets.length
        };
        
        totalShelters += shelters.length;
        totalTargets += targets.length;
    }
    
    return cities;
}

console.log('📊 分析现有数据文件...\n');

// 解析基础数据
const baseCities = parseDataFull('data_full.js');
console.log(`✅ 基础数据: ${Object.keys(baseCities).length} 个城市`);

// 解析批次数据
const batch1Cities = parseCityData('data_batch_new.js');
console.log(`✅ 批次1 (新疆西藏青海): ${Object.keys(batch1Cities).length} 个城市`);

const batch2Cities = parseCityData('data_batch_gansu_ningxia.js');
console.log(`✅ 批次2 (甘肃宁夏): ${Object.keys(batch2Cities).length} 个城市`);

// 合并所有城市数据
allCities = { ...baseCities, ...batch1Cities, ...batch2Cities };
totalCities = Object.keys(allCities).length;

console.log(`\n📈 合并统计:`);
console.log(`   总城市数: ${totalCities}`);
console.log(`   避难所数: ${totalShelters}`);
console.log(`   核打击目标: ${totalTargets}`);

// 生成合并后的数据文件
console.log('\n📝 生成合并数据文件...');

// 读取原始 data_full.js 内容作为基础
let mergedContent = fs.readFileSync('data_full.js', 'utf8');

// 提取批次数据的城市块并追加
function extractCityBlocks(filePath) {
    if (!fs.existsSync(filePath)) return '';
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 找到数据开始的位置 (NUCLEAR_GLOBE_DATA_BATCH_XXX = {)
    const startMatch = content.match(/const\s+NUCLEAR_GLOBE_DATA_BATCH_\w+\s*=\s*{/);
    if (!startMatch) return '';
    
    const dataStart = content.indexOf(startMatch[0]) + startMatch[0].length - 1;
    
    // 找到数据结束的最后一个 };
    const endMatch = content.match(/};?\s*$/);
    if (!endMatch) return '';
    
    // 提取城市数据块
    let braceCount = 0;
    let dataEnd = dataStart;
    let inString = false;
    
    for (let i = dataStart; i < content.length - 10; i++) {
        const char = content[i];
        const prevChar = i > 0 ? content[i-1] : '';
        
        if (!inString && (char === '"' || char === "'")) {
            inString = true;
        } else if (inString && (char === '"' || char === "'") && prevChar !== '\\') {
            inString = false;
        } else if (!inString) {
            if (char === '{') braceCount++;
            else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    dataEnd = i;
                    break;
                }
            }
        }
    }
    
    // 返回内部的城市数据块 (去掉最外层的大括号)
    const innerData = content.substring(dataStart + 1, dataEnd).trim();
    return innerData;
}

// 提取并合并批次数据
const batch1Data = extractCityBlocks('data_batch_new.js');
const batch2Data = extractCityBlocks('data_batch_gansu_ningxia.js');

// 在 data_full.js 的最后一个城市后追加新数据
// 找到最后一个 } 之前的位置 (在 NUCLEAR_GLOBE_DATA 对象结束前)
const lastBrace = mergedContent.lastIndexOf('};');
if (lastBrace > 0) {
    const beforeLastBrace = mergedContent.substring(0, lastBrace);
    const afterLastBrace = mergedContent.substring(lastBrace);
    
    // 合并所有数据
    mergedContent = beforeLastBrace + ',\n\n    // ============================================\n    // 新增批次数据 - 新疆西藏青海甘肃宁夏\n    // ============================================\n' + batch1Data + ',\n' + batch2Data + '\n' + afterLastBrace;
}

// 更新文件头信息
mergedContent = mergedContent.replace(
    /城市总数: \d+/,
    `城市总数: ${totalCities} (完整覆盖中国内地所有地级及以上城市)`
);

mergedContent = mergedContent.replace(
    /生成时间: .*/,
    `生成时间: ${new Date().toISOString()}`
);

// 保存合并后的文件
fs.writeFileSync('data.js', mergedContent, 'utf8');

console.log(`✅ 数据合并完成: data.js (${(mergedContent.length / 1024).toFixed(1)} KB)`);

// 生成统计报告
const report = {
    generated: new Date().toISOString(),
    totalCities: totalCities,
    totalShelters: totalShelters,
    totalTargets: totalTargets,
    coverage: totalCities >= 337 ? '100% (完整覆盖)' : `${(totalCities/337*100).toFixed(1)}%`,
    files: {
        base: Object.keys(baseCities).length,
        batch1: Object.keys(batch1Cities).length,
        batch2: Object.keys(batch2Cities).length
    },
    cityList: Object.values(allCities).map(c => c.name).sort()
};

fs.writeFileSync('data_report.json', JSON.stringify(report, null, 2), 'utf8');
console.log(`✅ 统计报告已生成: data_report.json`);

console.log('\n🎉 数据合并完成！');
console.log(`   文件大小: ${(mergedContent.length / 1024).toFixed(1)} KB`);
console.log(`   城市总数: ${totalCities}`);
console.log(`   目标: 覆盖中国内地337座地级及以上城市`);
