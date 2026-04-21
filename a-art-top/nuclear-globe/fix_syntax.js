// 修复合并文件语法
const fs = require('fs');
const path = '/root/.openclaw/workspace/a-art-top/nuclear-globe/data_merged.js';

let content = fs.readFileSync(path, 'utf-8');

// 修复多余的逗号
content = content.replace(/,\s*\n\s*};\s*\n\/\/ 城市列表/, '\n};\n\n// 城市列表');

// 修复空的城市键
content = content.replace(/"[a-z_]+2":\s*\{[\s\S]*?\}\s*,/g, (match) => {
    // 保留这些可能重复的城市
    return match;
});

// 统计城市数
const cityMatches = content.match(/"[a-z_]+":\s*\{/g);
const uniqueCities = [...new Set(cityMatches)];
console.log(`📍 找到 ${uniqueCities.length} 个城市定义`);

fs.writeFileSync(path, content);
console.log('✅ 语法修复完成');

// 验证文件
const check = require('vm');
const ctx = {};
check.createContext(ctx);
try {
    check.runInContext(content, ctx, { timeout: 10000 });
    console.log('✅ JavaScript语法验证通过');
    console.log(`📊 实际城市数: ${Object.keys(ctx.NUCLEAR_GLOBE_DATA || {}).length}`);
} catch(e) {
    console.log('❌ 语法错误:', e.message);
}
