/**
 * 核战争城市自救地球仪 - 数据合并脚本
 * 合并多个数据源为完整的337城市数据
 */

const fs = require('fs');
const path = require('path');

// 读取第一个数据文件 (SHELTER_DATA格式)
const data1Path = '/root/.openclaw/workspace/a-art.top/workshop/nuclear-survival-globe/data.js';
const data1Content = fs.readFileSync(data1Path, 'utf8');

// 提取 SHELTER_DATA 对象
const shelterDataMatch = data1Content.match(/const SHELTER_DATA = \{([\s\S]*)\};/);
if (!shelterDataMatch) {
    console.error('无法解析 SHELTER_DATA');
    process.exit(1);
}

// 使用更安全的方式解析数据 - 直接执行JS文件
console.log('正在加载数据文件...');

// 读取第一个文件
let SHELTER_DATA = {};
eval(data1Content.replace('const SHELTER_DATA', 'SHELTER_DATA'));

// 读取补充数据文件
const data2Path = '/root/.openclaw/workspace/a-art-top/nuclear-globe/data_supplement_full.js';
const data2Content = fs.readFileSync(data2Path, 'utf8');
let SUPPLEMENT_CITIES = {};
eval(data2Content.replace('const SUPPLEMENT_CITIES', 'SUPPLEMENT_CITIES'));

// 转换函数: 将SHELTER_DATA格式转换为NUCLEAR_GLOBE_DATA格式
function convertShelterData(cityKey, cityData) {
    // 转换避难所格式
    const shelters = (cityData.shelters || []).map(shelter => ({
        id: shelter.id,
        name: shelter.name,
        type: shelter.type,
        level: shelter.level,
        position: shelter.position || [shelter.lng || 0, shelter.lat || 0],
        capacity: typeof shelter.capacity === 'string' ? shelter.capacity : `${shelter.capacity}人`,
        facilities: shelter.facilities,
        access: shelter.access,
        address: shelter.address || '',
        description: shelter.description || ''
    }));

    // 转换核打击目标格式
    const nuclearTargets = (cityData.targets || []).map(target => ({
        id: `${cityKey}_t${Math.random().toString(36).substr(2, 3)}`,
        name: target.name,
        type: target.type,
        position: target.position || [target.lng || 0, target.lat || 0],
        risk: target.risk === '高' ? 'critical' : target.risk === '中' ? 'high' : 'medium',
        radius: target.radius || (target.risk === '高' ? 5000 : target.risk === '中' ? 3000 : 1000)
    }));

    return {
        name: cityData.name,
        center: cityData.center,
        shelters: shelters,
        nuclearTargets: nuclearTargets
    };
}

// 转换补充数据格式
function convertSupplementData(cityKey, cityData) {
    // 转换避难所格式
    const shelters = (cityData.shelters || []).map((shelter, idx) => ({
        id: shelter.id || `${cityKey}_${String(idx+1).padStart(3, '0')}`,
        name: shelter.name,
        type: shelter.type,
        level: shelter.level,
        position: [shelter.lng || 0, shelter.lat || 0],
        capacity: typeof shelter.capacity === 'number' ? `${shelter.capacity}人` : shelter.capacity,
        facilities: shelter.facilities,
        access: shelter.access,
        address: '',
        description: ''
    }));

    // 转换核打击目标格式
    const nuclearTargets = (cityData.nuclearTargets || []).map(target => ({
        id: target.id || `${cityKey}_t${Math.random().toString(36).substr(2, 3)}`,
        name: target.name,
        type: target.type,
        position: [target.lng || 0, target.lat || 0],
        risk: target.risk,
        radius: target.radius || 2000
    }));

    return {
        name: cityData.name,
        center: cityData.center,
        shelters: shelters,
        nuclearTargets: nuclearTargets
    };
}

// 合并数据
const NUCLEAR_GLOBE_DATA = {};
let cityCount = 0;
let shelterCount = 0;
let targetCount = 0;

// 首先添加SHELTER_DATA的数据
for (const [key, data] of Object.entries(SHELTER_DATA)) {
    NUCLEAR_GLOBE_DATA[key] = convertShelterData(key, data);
    cityCount++;
    shelterCount += NUCLEAR_GLOBE_DATA[key].shelters.length;
    targetCount += NUCLEAR_GLOBE_DATA[key].nuclearTargets.length;
}

console.log(`已从SHELTER_DATA导入 ${cityCount} 个城市`);

// 然后添加补充数据（去重）
let addedCities = 0;
let skippedCities = 0;

for (const [key, data] of Object.entries(SUPPLEMENT_CITIES)) {
    // 清理key中的数字后缀（如 hengshui2 -> hengshui）
    const cleanKey = key.replace(/\d+$/, '');
    
    // 如果城市已存在，跳过或合并
    if (NUCLEAR_GLOBE_DATA[cleanKey]) {
        // 合并避难所和目标
        const existing = NUCLEAR_GLOBE_DATA[cleanKey];
        const newData = convertSupplementData(cleanKey, data);
        
        // 合并避难所（去重）
        const existingShelterNames = new Set(existing.shelters.map(s => s.name));
        for (const shelter of newData.shelters) {
            if (!existingShelterNames.has(shelter.name)) {
                existing.shelters.push(shelter);
                shelterCount++;
            }
        }
        
        // 合并核打击目标（去重）
        const existingTargetNames = new Set(existing.nuclearTargets.map(t => t.name));
        for (const target of newData.nuclearTargets) {
            if (!existingTargetNames.has(target.name)) {
                existing.nuclearTargets.push(target);
                targetCount++;
            }
        }
        
        skippedCities++;
    } else {
        NUCLEAR_GLOBE_DATA[cleanKey] = convertSupplementData(cleanKey, data);
        cityCount++;
        shelterCount += NUCLEAR_GLOBE_DATA[cleanKey].shelters.length;
        targetCount += NUCLEAR_GLOBE_DATA[cleanKey].nuclearTargets.length;
        addedCities++;
    }
}

console.log(`已从SUPPLEMENT_CITIES新增 ${addedCities} 个城市，合并 ${skippedCities} 个城市`);

// 生成输出文件
const outputPath = '/root/.openclaw/workspace/a-art.top/nuclear-globe/data.js';

const outputContent = `// ============================================
// 核战争城市自救地球仪 - 完整数据
// 覆盖中国337个地级及以上城市
// 生成时间: ${new Date().toISOString()}
// 城市总数: ${cityCount}
// 避难所总数: ${shelterCount}
// 核打击目标总数: ${targetCount}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(NUCLEAR_GLOBE_DATA, null, 2)};

// 兼容旧格式
const SHELTER_DATA = NUCLEAR_GLOBE_DATA;

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA, SHELTER_DATA };
}
`;

fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log('\n✅ 数据合并完成！');
console.log(`输出文件: ${outputPath}`);
console.log(`总城市数: ${cityCount}`);
console.log(`总避难所数: ${shelterCount}`);
console.log(`总核打击目标数: ${targetCount}`);

// 列出所有城市名称
console.log('\n城市列表:');
const cityNames = Object.values(NUCLEAR_GLOBE_DATA).map(c => c.name).sort();
console.log(cityNames.join(', '));
