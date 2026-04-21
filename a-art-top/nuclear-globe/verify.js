// 核战争城市自救地球仪 - 部署验证
const fs = require('fs');
const path = '/root/.openclaw/workspace/a-art.top/nuclear-globe/data.js';

const content = fs.readFileSync(path, 'utf-8');
const match = content.match(/const NUCLEAR_GLOBE_DATA = (\{[\s\S]*\});/);

if (match) {
    const data = eval('(' + match[1] + ')');
    const cities = Object.keys(data);
    
    console.log('✅ 数据验证通过');
    console.log(`📍 城市总数: ${cities.length}`);
    console.log(`📁 文件大小: ${(fs.statSync(path).size / 1024).toFixed(2)} KB`);
    
    // 统计避难所和核目标
    let shelters = 0, targets = 0;
    for (const city of Object.values(data)) {
        shelters += city.shelters?.length || 0;
        targets += city.nuclearTargets?.length || 0;
    }
    console.log(`🏠 避难所总数: ${shelters}`);
    console.log(`🎯 核目标总数: ${targets}`);
    
    // 显示前10个城市
    console.log('\n前10个城市:');
    cities.slice(0, 10).forEach(c => {
        const city = data[c];
        console.log(`  - ${city.name}: ${city.shelters?.length || 0}个避难所`);
    });
} else {
    console.log('❌ 数据解析失败');
}
