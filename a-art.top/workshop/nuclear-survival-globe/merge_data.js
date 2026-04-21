const fs = require("fs");
const vm = require("vm");

// 方法: 使用 VM 来安全地执行JS代码并提取变量
function extractObjectFromJS(filePath, varName) {
  const code = fs.readFileSync(filePath, "utf-8");
  const context = {};
  vm.createContext(context);
  
  // 注入 console 以防万一
  context.console = console;
  
  try {
    vm.runInContext(code, context);
    return context[varName];
  } catch (e) {
    // 如果失败，尝试包装成模块执行
    const wrappedCode = `
      var module = { exports: {} };
      ${code}
      ${varName} = module.exports || ${varName};
    `;
    vm.runInContext(wrappedCode, context);
    return context[varName];
  }
}

// 提取 SHELTER_DATA
let mainObj;
try {
  mainObj = extractObjectFromJS("data.js", "SHELTER_DATA");
  console.log("成功提取 SHELTER_DATA");
} catch (e) {
  console.error("提取 SHELTER_DATA 失败:", e.message);
  process.exit(1);
}

// 提取 REMAINING_CITIES_DATA  
let remainingObj;
try {
  remainingObj = extractObjectFromJS("data_batch_remaining.js", "REMAINING_CITIES_DATA");
  console.log("成功提取 REMAINING_CITIES_DATA");
} catch (e) {
  console.error("提取 REMAINING_CITIES_DATA 失败:", e.message);
  process.exit(1);
}

// 统计信息
let mainCityCount = 0;
let mainShelterCount = 0;
let mainTargetCount = 0;

for (const key in mainObj) {
  if (key === "_placeholder") continue;
  mainCityCount++;
  if (mainObj[key].shelters) mainShelterCount += mainObj[key].shelters.length;
  if (mainObj[key].targets) mainTargetCount += mainObj[key].targets.length;
}

// 合并数据
for (const key in remainingObj) {
  if (mainObj[key]) {
    console.log("重复城市(将被覆盖):", key);
  }
  mainObj[key] = remainingObj[key];
}

// 统计合并后的信息
let totalCityCount = 0;
let totalShelterCount = 0;
let totalTargetCount = 0;

for (const key in mainObj) {
  if (key === "_placeholder") continue;
  totalCityCount++;
  if (mainObj[key].shelters) totalShelterCount += mainObj[key].shelters.length;
  if (mainObj[key].targets) totalTargetCount += mainObj[key].targets.length;
}

console.log("\n=== 合并统计 ===");
console.log("原始城市数:", mainCityCount);
console.log("新增城市数:", totalCityCount - mainCityCount);
console.log("最终城市数:", totalCityCount);
console.log("原始避难所数:", mainShelterCount);
console.log("最终避难所数:", totalShelterCount);
console.log("原始核打击目标数:", mainTargetCount);
console.log("最终核打击目标数:", totalTargetCount);

// 生成新的数据文件
const output = `/**
 * 核战争城市自救地球仪 - 完整避难所数据 v7.0
 * 覆盖中国${totalCityCount}个地级及以上城市
 * 总计: ${totalShelterCount}+ 避难所, ${totalTargetCount}+ 核打击目标
 * 生成时间: 2026-04-17
 * 
 * 数据来源:
 * - data_full.js (262个城市)
 * - data_batch_2.js (41个城市)
 * - data_batch_3.js (80个城市)
 * - data_batch_4.js (36个城市)
 * - data_batch_remaining.js (${totalCityCount - mainCityCount}个城市)
 * 
 * 格式: SHELTER_DATA
 */

const SHELTER_DATA = ${JSON.stringify(mainObj, null, 2)};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SHELTER_DATA;
}
`;

// 写入文件
fs.writeFileSync("data.js", output);
console.log("\n✅ 成功合并! data.js已更新为完整版本");
console.log("文件大小:", (fs.statSync("data.js").size / 1024).toFixed(2), "KB");
