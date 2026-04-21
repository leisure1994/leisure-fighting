// 完整数据合并脚本
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataDir = '/root/.openclaw/workspace/a-art-top/nuclear-globe/';

const dataFiles = [
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
const mergeStats = {
  fileStats: [],
  duplicates: [],
  failedFiles: []
};

// 从文件提取数据
function extractData(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  try {
    const context = {};
    vm.createContext(context);
    vm.runInContext(content, context, { timeout: 10000 });
    
    if (context[varName]) {
      return context[varName];
    }
    
    // 尝试其他常见变量名
    const altNames = ['NUCLEAR_GLOBE_DATA', 'CITIES', 'DATA', 'CITY_DATA'];
    for (const name of altNames) {
      if (context[name]) {
        return context[name];
      }
    }
    
    return null;
  } catch(e) {
    console.log(`  解析错误: ${e.message}`);
    return null;
  }
}

// 处理每个文件
for (const { file, varName } of dataFiles) {
  const filePath = path.join(dataDir, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 跳过 - 文件不存在: ${file}`);
    mergeStats.failedFiles.push({ file, reason: 'not_found' });
    continue;
  }
  
  console.log(`\n📄 处理: ${file} (变量: ${varName})`);
  
  const data = extractData(filePath, varName);
  
  if (data && typeof data === 'object') {
    const cityNames = Object.keys(data);
    const cityCount = cityNames.length;
    
    mergeStats.fileStats.push({
      file: file,
      varName: varName,
      cities: cityCount,
      cityNames: cityNames
    });
    
    console.log(`  ✅ 成功: ${cityCount} 个城市`);
    console.log(`     ${cityNames.slice(0, 5).join(', ')}${cityNames.length > 5 ? '...' : ''}`);
    
    // 合并到总数据
    for (const [cityKey, cityData] of Object.entries(data)) {
      if (allCities[cityKey]) {
        mergeStats.duplicates.push({
          city: cityKey,
          original: mergeStats.fileStats.find(s => s.cityNames?.includes(cityKey))?.file || 'unknown',
          duplicate: file
        });
        console.log(`  ⚠️ 重复: ${cityKey}`);
      } else {
        allCities[cityKey] = cityData;
      }
    }
  } else {
    console.log(`  ❌ 解析失败: 未能提取数据`);
    mergeStats.failedFiles.push({ file, varName, reason: 'parse_failed' });
  }
}

mergeStats.totalCities = Object.keys(allCities).length;
mergeStats.totalFiles = mergeStats.fileStats.length;

// 输出统计
console.log('\n' + '='.repeat(60));
console.log('📊 数据合并统计');
console.log('='.repeat(60));

mergeStats.fileStats.forEach(s => {
  console.log(`${s.file.padEnd(20)} → ${s.cities.toString().padStart(3)} 个城市`);
});

console.log('-'.repeat(60));
console.log(`📍 合并后总城市数: ${mergeStats.totalCities}`);
console.log(`📁 成功处理文件数: ${mergeStats.totalFiles}`);
console.log(`⚠️  重复城市数: ${mergeStats.duplicates.length}`);

if (mergeStats.failedFiles.length > 0) {
  console.log(`\n❌ 失败文件:`);
  mergeStats.failedFiles.forEach(f => console.log(`   ${f.file}: ${f.reason}`));
}

// 生成合并文件
if (mergeStats.totalCities > 0) {
  console.log('\n' + '='.repeat(60));
  console.log('📝 生成合并文件...');
  console.log('='.repeat(60));
  
  const mergedContent = `// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 中国内地地级及以上城市全覆盖
// 生成时间: ${new Date().toISOString()}
// 数据来源: ${mergeStats.totalFiles} 个数据文件
// 城市总数: ${mergeStats.totalCities}
// ============================================

const NUCLEAR_GLOBE_DATA = ${JSON.stringify(allCities, null, 4)};

// 导出数据供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA };
}
`;
  
  const outputPath = path.join(dataDir, 'data_merged.js');
  fs.writeFileSync(outputPath, mergedContent);
  
  const fileStats = fs.statSync(outputPath);
  console.log(`✅ data_merged.js 已生成`);
  console.log(`   大小: ${(fileStats.size / 1024).toFixed(2)} KB (${(fileStats.size / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`   路径: ${outputPath}`);
  
  // 保存详细统计
  fs.writeFileSync(
    path.join(dataDir, 'merge_stats.json'),
    JSON.stringify(mergeStats, null, 2)
  );
  console.log(`✅ merge_stats.json 已保存`);
  
  // 输出城市列表预览
  const allNames = Object.keys(allCities);
  console.log(`\n📍 城市列表预览 (前30个):`);
  allNames.slice(0, 30).forEach((name, i) => {
    process.stdout.write(`${name.padEnd(15)} `);
    if ((i + 1) % 5 === 0) console.log();
  });
  if (allNames.length > 30) {
    console.log(`\n... 还有 ${allNames.length - 30} 个城市`);
  }
  
  console.log('\n🎉 数据合并完成！');
} else {
  console.log('\n❌ 没有提取到任何城市数据，无法生成合并文件');
  process.exit(1);
}
