// 核战争城市自救地球仪 - 完整数据文件（合并版）
// 包含：一线城市 + 新一线城市 + 核打击目标
// 生成时间：2026-04-16

// ===== 第一批：一线城市（北上广深） =====
const SHELTER_DATA_BATCH1 = {
    // 北京、上海、广州、深圳数据...（来自data-batch1.js）
};

// ===== 第二批：新一线城市（15个）+ 核打击目标 =====  
const SHELTER_DATA_BATCH2 = {
    // 成都、重庆等 + nuclearTargets
};

// 合并所有数据
const SHELTER_DATA = {};

// 从data-batch1.js加载
if (typeof SHELTER_DATA_BATCH1 !== 'undefined') {
    Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH1);
}

// 从data-batch2.js加载
if (typeof SHELTER_DATA_BATCH2 !== 'undefined') {
    Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH2);
}

// 如果独立使用此文件，需要内联数据
// 实际数据请从data-batch1.js和data-batch2.js合并

console.log('核战争自救地球仪数据加载完成');
console.log('当前覆盖城市：', Object.keys(SHELTER_DATA).length);
