// 核战争城市自救地球仪 - 完整数据合并文件
// 自动合并所有批次数据：batch1 + batch2 + batch3 + batch4
// 生成时间：2026-04-17
// 总城市数：337个地级及以上城市

// 初始化主数据对象
const NUCLEAR_SURVIVAL_DATA = {
    version: "2.0.0",
    generated: "2026-04-17",
    totalCities: 337,
    shelterTypes: {
        nuclear: { label: "专业核掩体", color: "#ff0000", priority: 1 },
        metro: { label: "地铁站", color: "#00ff00", priority: 2 },
        underground: { label: "地下商城", color: "#0088ff", priority: 3 },
        civil: { label: "人防工程", color: "#ff8800", priority: 4 },
        parking: { label: "地下停车场", color: "#888888", priority: 5 }
    },
    nuclearTargetTypes: {
        power: { label: "⚡ 发电厂", color: "#ff0000", radius: 8000 },
        water: { label: "💧 自来水厂", color: "#ff00ff", radius: 5000 },
        chemical: { label: "☠️ 化工厂", color: "#ff8800", radius: 10000 },
        oil: { label: "⛽ 油库", color: "#ffff00", radius: 10000 },
        military: { label: "🎯 军事设施", color: "#ffffff", radius: 8000 }
    }
};

// 城市数据容器
const SHELTER_DATA = {};

// 数据加载完成标记
let dataLoaded = false;

// 合并所有批次数据的函数
function mergeAllBatches() {
    // 批次1：一线城市（北上广深）
    if (typeof SHELTER_DATA_BATCH1 !== 'undefined') {
        Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH1);
        console.log('✓ Batch 1 loaded: 一线城市');
    }
    
    // 批次2：新一线城市（15个）+ 核打击目标
    if (typeof SHELTER_DATA_BATCH2 !== 'undefined') {
        Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH2);
        console.log('✓ Batch 2 loaded: 新一线城市');
    }
    
    // 批次3：二线城市（30个）
    if (typeof SHELTER_DATA_BATCH3 !== 'undefined') {
        Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH3);
        console.log('✓ Batch 3 loaded: 二线城市');
    }
    
    // 批次4：大规模城市数据（288个）
    if (typeof SHELTER_DATA_BATCH4 !== 'undefined') {
        Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH4);
        console.log('✓ Batch 4 loaded: 大规模城市数据');
    }
    
    dataLoaded = true;
    const cityCount = Object.keys(SHELTER_DATA).length;
    console.log(`核战争城市自救地球仪数据加载完成`);
    console.log(`当前覆盖城市：${cityCount}/337`);
    console.log(`进度：${(cityCount/337*100).toFixed(1)}%`);
    
    return cityCount;
}

// 自动合并（如果在浏览器环境中）
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(mergeAllBatches, 100);
    });
}

// Node.js环境导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_SURVIVAL_DATA, SHELTER_DATA, mergeAllBatches };
}

console.log('数据合并工具已加载，等待批次数据...');
