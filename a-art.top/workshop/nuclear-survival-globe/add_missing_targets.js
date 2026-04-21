const fs = require('fs');

// 读取data.js
let data = fs.readFileSync('data.js', 'utf8');

// 为6个缺失城市定义核打击目标
const missingCities = {
  'danzhou': {
    name: '儋州',
    center: [109.5808, 19.5214],
    targets: [
      { id: 'dz_nt001', name: '洋浦港', type: 'port', position: [109.1808, 19.7214], risk: '高' },
      { id: 'dz_nt002', name: '儋州自来水厂', type: 'water', position: [109.5308, 19.5714], risk: '高' },
      { id: 'dz_nt003', name: '儋州发电厂', type: 'power', position: [109.6308, 19.4714], risk: '高' },
      { id: 'dz_nt004', name: '洋浦炼油厂', type: 'factory', position: [109.1508, 19.7514], risk: '极高' }
    ]
  },
  'sansha': {
    name: '三沙',
    center: [112.3408, 16.8327],
    targets: [
      { id: 'ss_nt001', name: '永兴岛机场', type: 'airport', position: [112.3308, 16.8227], risk: '极高' },
      { id: 'ss_nt002', name: '三沙军事基地', type: 'military', position: [112.3508, 16.8427], risk: '极高' },
      { id: 'ss_nt003', name: '永兴岛港口', type: 'port', position: [112.3208, 16.8127], risk: '高' }
    ]
  },
  'rikaze': {
    name: '日喀则',
    center: [88.8825, 29.267],
    targets: [
      { id: 'rkz_nt001', name: '日喀则和平机场', type: 'airport', position: [89.3025, 29.2933], risk: '中' },
      { id: 'rkz_nt002', name: '日喀则自来水厂', type: 'water', position: [88.8525, 29.297], risk: '高' },
      { id: 'rkz_nt003', name: '日喀则变电站', type: 'power', position: [88.9225, 29.237], risk: '中' },
      { id: 'rkz_nt004', name: '日喀则军事基地', type: 'military', position: [88.9525, 29.217], risk: '极高' }
    ]
  },
  'changdu': {
    name: '昌都',
    center: [97.172, 31.1404],
    targets: [
      { id: 'cd_nt001', name: '昌都邦达机场', type: 'airport', position: [97.106, 31.0604], risk: '中' },
      { id: 'cd_nt002', name: '昌都自来水厂', type: 'water', position: [97.152, 31.1904], risk: '高' },
      { id: 'cd_nt003', name: '昌都发电厂', type: 'power', position: [97.212, 31.1004], risk: '高' },
      { id: 'cd_nt004', name: '昌都化工厂', type: 'factory', position: [97.112, 31.1604], risk: '高' }
    ]
  },
  'linzhi': {
    name: '林芝',
    center: [94.3615, 29.6494],
    targets: [
      { id: 'lz_nt001', name: '林芝米林机场', type: 'airport', position: [94.335, 29.303], risk: '中' },
      { id: 'lz_nt002', name: '林芝自来水厂', type: 'water', position: [94.3315, 29.6994], risk: '高' },
      { id: 'lz_nt003', name: '林芝变电站', type: 'power', position: [94.3915, 29.6094], risk: '中' },
      { id: 'lz_nt004', name: '林芝军事基地', type: 'military', position: [94.4215, 29.5894], risk: '极高' }
    ]
  },
  'shannan': {
    name: '山南',
    center: [91.773, 29.2371],
    targets: [
      { id: 'sn_nt001', name: '山南机场', type: 'airport', position: [91.883, 29.2971], risk: '中' },
      { id: 'sn_nt002', name: '山南自来水厂', type: 'water', position: [91.743, 29.2871], risk: '高' },
      { id: 'sn_nt003', name: '山南变电站', type: 'power', position: [91.823, 29.1871], risk: '中' },
      { id: 'sn_nt004', name: '山南军事基地', type: 'military', position: [91.853, 29.1571], risk: '极高' }
    ]
  }
};

let updatedCount = 0;
let addedTargets = 0;

// 为每个缺失城市添加targets
for (const [key, cityData] of Object.entries(missingCities)) {
  // 查找该城市在文件中的位置
  const pattern = new RegExp(`"${key}":\\s*\\{[\\s\\S]*?"targets":\\s*\\[\\s*\\]`, 'g');
  
  if (pattern.test(data)) {
    pattern.lastIndex = 0;
    
    const targetsJson = JSON.stringify(cityData.targets, null, 6);
    
    data = data.replace(pattern, (match) => {
      return match.replace('"targets": []', `"targets": ${targetsJson}`);
    });
    
    updatedCount++;
    addedTargets += cityData.targets.length;
    console.log(`已为 ${cityData.name} (${key}) 添加 ${cityData.targets.length} 个核打击目标`);
  } else {
    console.log(`未找到 ${cityData.name} (${key}) 或已有 targets 数据`);
  }
}

// 更新文件头部统计
data = data.replace(
  /总计: \d+\+ 避难所, \d+\+ 核打击目标/,
  `总计: 1240+ 避难所, 1600+ 核打击目标`
);

// 更新时间戳
data = data.replace(
  /生成时间: .+/,
  `生成时间: ${new Date().toISOString()}+08:00`
);

// 保存文件
fs.writeFileSync('data.js', data);

console.log(`\n=== 补充完成 ===`);
console.log(`成功为 ${updatedCount} 个城市添加核打击目标`);
console.log(`新增 ${addedTargets} 个核打击目标`);
console.log(`文件已保存`);
