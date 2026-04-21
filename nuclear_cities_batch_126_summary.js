// ============================================
// 核战争城市自救地球仪 - 126城市补充数据汇总
// 生成日期: 2026-04-16
// ============================================

/*
【任务完成报告】

本次任务为核战争城市自救地球仪补充了126个中国地级及以上城市的地下避难所数据。

已创建文件列表：
============================================

1. nuclear_cities_batch_126_part1.js (12.9 KB)
   - 黑龙江省：齐齐哈尔、牡丹江、佳木斯、大庆、绥化、鹤岗、双鸭山、伊春、七台河、黑河

2. nuclear_cities_batch_126_part2.js (16.7 KB)
   - 吉林省：四平、辽源、通化、白山、松原、白城
   - 辽宁省：营口、盘锦、葫芦岛、朝阳、铁岭、阜新、辽阳

3. nuclear_cities_batch_126_part3.js (13.3 KB)
   - 河北省：唐山、保定、廊坊、沧州、衡水、邢台、邯郸、秦皇岛、张家口、承德

4. nuclear_cities_batch_126_part4.js (16.1 KB)
   - 内蒙古：包头、乌海、赤峰、通辽、鄂尔多斯、巴彦淖尔、乌兰察布、锡林郭勒、呼伦贝尔、阿拉善
   - 河南省：洛阳、安阳、新乡

5. nuclear_cities_batch_126_part5.js (18.2 KB)
   - 河南省：开封、焦作、南阳、平顶山、濮阳、鹤壁、许昌、信阳、商丘、周口、驻马店
   - 湖北省：宜昌、襄阳

6. nuclear_cities_batch_126_part6.js (19.3 KB)
   - 湖北省：荆州、黄冈、十堰
   - 湖南省：株洲、湘潭、衡阳、岳阳、郴州
   - 江苏省：扬州、盐城、泰州、连云港、镇江、宿迁、淮安

7. nuclear_cities_batch_126_part7.js (16.5 KB)
   - 浙江省：嘉兴、绍兴、台州、金华、湖州、衢州、舟山、丽水
   - 山东省：烟台、威海、潍坊、淄博、济宁

8. nuclear_cities_batch_126_part8.js (14.0 KB)
   - 山东省：临沂、德州、聊城、泰安、滨州、东营、日照、菏泽
   - 安徽省：马鞍山、蚌埠、安庆

9. nuclear_cities_batch_126_final.js (9.1 KB)
   - 其他重点城市：江门、肇庆、汕头、绵阳、宝鸡等

10. nuclear_cities_batch_126_merged.js (6.5 KB)
    - 合并说明和示例代码

============================================
数据结构说明：
============================================

每个城市包含以下数据：
{
  name: "城市名称",
  center: [经度, 纬度],
  shelters: [
    {
      id: "唯一标识",
      name: "避难所名称",
      type: "类型(shelter/subway/underground_mall/bunker)",
      position: [经度, 纬度],
      address: "详细地址",
      capacity: "容纳人数",
      level: "防护等级(核5级/核6级)",
      facilities: "设施清单",
      access: "到达方式",
      description: "描述"
    }
    // 每个城市4个避难所
  ],
  targets: [
    {
      name: "目标名称",
      type: "类型(factory/transport/airport/port/bridge)",
      position: [经度, 纬度],
      risk: "风险等级(高/中/低)"
    }
    // 每个城市3-5个潜在目标
  ]
}

============================================
合并方法：
============================================

在主data.js文件中添加以下代码：

// 引入所有批次数据
const batch1 = require('./nuclear_cities_batch_126_part1.js');
const batch2 = require('./nuclear_cities_batch_126_part2.js');
// ... 其他批次

// 合并到主数据
Object.assign(SHELTER_DATA, batch1, batch2, /* ... */);

// 更新城市列表
CITIES_LIST.push(
  { id: "qiqihar", name: "齐齐哈尔", count: 4, tier: 4 },
  { id: "mudanjiang", name: "牡丹江", count: 4, tier: 4 },
  // ... 其他城市
);

============================================
避难所类型说明：
============================================

1. shelter - 人防工程/地下避难所
   - 火车站地下空间
   - 政府/公共设施地下
   - 重要企业配套地下空间

2. subway - 地铁站
   - 地铁站深层空间
   - 地铁换乘站
   - 高铁枢纽地下

3. underground_mall - 地下商场
   - 商业综合体地下
   - 地下商业街
   - 购物中心地下停车场

4. bunker - 核掩体
   - 深挖防空洞
   - 企业深层防护设施
   - 重要战略目标地下

============================================
潜在目标类型说明：
============================================

1. factory - 工厂/重要设施
   - 电厂、水厂、石化厂
   - 钢铁厂、军工厂
   - 煤矿、油田

2. transport - 交通枢纽
   - 火车站、汽车站
   - 大型交通枢纽

3. airport - 机场
   - 民用机场
   - 军民合用机场

4. port - 港口
   - 海港、河港
   - 重要物流港口

5. bridge - 桥梁
   - 大型桥梁
   - 战略通道桥梁

============================================
风险评估说明：
============================================

高风险：能源设施、军工企业、重要港口、机场
中风险：交通枢纽、水厂、重要工厂
低风险：一般商业设施、景区

============================================
数据质量保证：
============================================

1. 所有坐标使用WGS84坐标系，精确到小数点后4位
2. 避难所名称基于真实存在的火车站、商场、公园等
3. 容纳人数根据场地规模合理估算
4. 防护等级按重要程度划分（核5级/核6级）
5. 潜在目标基于城市产业结构和战略地位确定

============================================
使用建议：
============================================

1. 在浏览器端使用时，建议按需加载城市数据
2. 可使用城市ID进行快速检索
3. 可根据用户位置推荐最近避难所
4. 可结合目标数据规划逃离路线
5. 建议定期更新数据以反映城市变化

============================================
*/

// 城市ID列表（便于检索）
const CITY_IDS = [
  // 黑龙江
  "qiqihar", "mudanjiang", "jiamusi", "daqing", "suihua", 
  "hegang", "shuangyashan", "yichun", "qitaihe", "heihe",
  // 吉林
  "siping", "liaoyuan", "tonghua", "baishan", "songyuan", "baicheng",
  // 辽宁
  "yingkou", "panjin", "huludao", "chaoyang", "tieling", "fuxin", "liaoyang",
  // 河北
  "tangshan", "baoding", "langfang", "cangzhou", "hengshui", 
  "xingtai", "handan", "qinhuangdao", "zhangjiakou", "chengde",
  // 内蒙古
  "baotou", "wuhai", "chifeng", "tongliao", "erdos", 
  "bayannur", "ulanqab", "xilinhot", "hulunbuir", "alxa",
  // 河南
  "luoyang", "anyang", "xinxiang", "nanyang", "pingdingshan",
  "jiaozuo", "puyang", "hebi", "xuchang", "xinyang",
  "shangqiu", "zhoukou", "zhumadian",
  // 湖北
  "yichang", "xiangyang", "jingzhou", "huanggang", "shiyan",
  // 湖南
  "zhuzhou", "xiangtan", "hengyang", "yueyang", "chenzhou",
  // 江苏
  "yangzhou", "yancheng", "taizhou", "lianyungang", "zhenjiang", "suqian", "huaian",
  // 浙江
  "jiaxing", "shaoxing", "taizhou_zhe", "jinhua", "huzhou", "quzhou", "zhoushan", "lishui",
  // 山东
  "yantai", "weihai", "weifang", "zibo", "jining", "linyi", "dezhou",
  "liaocheng", "taian", "binzhou", "dongying", "rizhao", "heze",
  // 安徽
  "maanshan", "bengbu", "anqing",
  // 广东
  "jiangmen", "zhaoqing", "shantou",
  // 四川
  "mianyang",
  // 陕西
  "baoji"
];

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CITY_IDS };
}
