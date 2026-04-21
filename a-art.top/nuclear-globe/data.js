
// ============================================
// 统计函数 - 用于实时计算城市数据
// ============================================
function getCityStats() {
    let totalCities = 0;
    let totalShelters = 0;
    let totalTargets = 0;
    
    // 合并所有数据
    const allData = {
        ...NUCLEAR_GLOBE_DATA,
        ...(typeof PART2_CITIES !== 'undefined' ? PART2_CITIES : {}),
        ...(typeof PART3_CITIES !== 'undefined' ? PART3_CITIES : {}),
        ...(typeof PART4_CITIES !== 'undefined' ? PART4_CITIES : {}),
        ...(typeof PART5_CITIES !== 'undefined' ? PART5_CITIES : {}),
        ...(typeof PART6_CITIES !== 'undefined' ? PART6_CITIES : {}),
        ...(typeof PART7_CITIES !== 'undefined' ? PART7_CITIES : {}),
        ...(typeof PART8_CITIES !== 'undefined' ? PART8_CITIES : {})
    };
    
    Object.keys(allData).forEach(cityKey => {
        const city = allData[cityKey];
        totalCities++;
        
        if (city.shelters) {
            totalShelters += city.shelters.length;
        }
        
        if (city.nuclearTargets) {
            totalTargets += city.nuclearTargets.length;
        }
    });
    
    return {
        totalCities,
        totalShelters,
        totalTargets
    };
}

// 使函数全局可用
window.getCityStats = getCityStats;
