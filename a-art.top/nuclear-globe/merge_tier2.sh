#!/bin/bash
# 合并第二批新一线城市数据到主data.js

cd /root/.openclaw/workspace/a-art.top/nuclear-globe

# 读取tier2_cities.js的内容（去掉module.exports）
node -e "
const fs = require('fs');

// 读取tier2数据
const tier2Content = fs.readFileSync('tier2_cities.js', 'utf8');

// 提取城市数据对象（去掉module.exports）
const cityDataMatch = tier2Content.match(/const TIER2_CITIES = ({[\s\S]*});/);
if (!cityDataMatch) {
    console.error('无法解析tier2_cities.js');
    process.exit(1);
}

// 读取主data.js
let mainData = fs.readFileSync('data.js', 'utf8');

// 找到最后一个城市对象的结束位置（倒数第4行的位置）
// 寻找倒数第4行的位置（统计的行数）
const lines = mainData.split('\n');

// 找到最后一个非空行且不是结尾符号的行
let insertPosition = mainData.lastIndexOf('};');
if (insertPosition === -1) {
    console.error('无法找到插入位置');
    process.exit(1);
}

// 提取城市数据字符串（去掉const声明和module.exports）
let cityDataStr = cityDataMatch[1].trim();

// 移除开头和结尾的大括号，获取内部内容
cityDataStr = cityDataStr.substring(1, cityDataStr.length - 1).trim();

// 确保前面有逗号分隔
if (cityDataStr.charAt(0) !== ',') {
    cityDataStr = ',\n' + cityDataStr;
}

// 在最后一个 }; 之前插入新数据
const beforeInsert = mainData.substring(0, insertPosition);
const afterInsert = mainData.substring(insertPosition);

// 合并数据
const newData = beforeInsert + cityDataStr + '\n' + afterInsert;

// 保存回data.js
fs.writeFileSync('data.js', newData);

console.log('第二批15个新一线城市数据已合并到data.js');
console.log('新增城市: 成都、杭州、重庆、苏州、武汉、西安、南京、长沙、天津、郑州、东莞、宁波、佛山、合肥、青岛');
"
