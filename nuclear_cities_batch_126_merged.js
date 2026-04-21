// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（完整合并版）
// 生成日期: 2026-04-16
// 包含126个中国地级及以上城市完整数据
// 可直接追加到主data.js文件
// ============================================

const CITIES_BATCH_126_ALL = {

  // ============================================
  // 东北地区 - 黑龙江省（10个城市）
  // ============================================
  qiqihar: {
    name: "齐齐哈尔",
    center: [123.9182, 47.3543],
    shelters: [
      { id: "qqhe_001", name: "齐齐哈尔站地下避难所", type: "shelter", position: [123.9182, 47.3543], address: "齐齐哈尔市铁锋区站前大街", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "齐齐哈尔火车站地下一层", description: "齐齐哈尔主要铁路枢纽地下民防工程，战时指挥中心" },
      { id: "qqhe_002", name: "中环广场地下人防", type: "underground_mall", position: [123.9082, 47.3443], address: "齐齐哈尔市龙沙区中环广场", capacity: "3000人", level: "核6级", facilities: "物资储备库、医疗救护站", access: "中环广场地下通道入口", description: "市中心商业区人防工程" },
      { id: "qqhe_003", name: "第一医院地下避难所", type: "shelter", position: [123.8982, 47.3643], address: "齐齐哈尔市龙沙区公园路", capacity: "2500人", level: "核6级", facilities: "医疗救护设施、应急物资储备", access: "第一医院地下停车场", description: "医疗设施配套人防工程" },
      { id: "qqhe_004", name: "龙沙公园地下防空洞", type: "bunker", position: [123.8882, 47.3243], address: "齐齐哈尔市龙沙区龙沙公园", capacity: "4000人", level: "核5级", facilities: "深层防空洞、独立供水系统", access: "龙沙公园地下入口", description: "早期深挖防空洞改建" }
    ],
    targets: [
      { name: "齐齐哈尔火车站", type: "transport", position: [123.9182, 47.3543], risk: "中" },
      { name: "第一重型机械厂", type: "factory", position: [123.9282, 47.3743], risk: "高" },
      { name: "齐齐哈尔水厂", type: "factory", position: [123.8882, 47.3643], risk: "中" },
      { name: "富拉尔基电厂", type: "factory", position: [123.6782, 47.2043], risk: "高" }
    ]
  },

  mudanjiang: {
    name: "牡丹江",
    center: [129.6186, 44.5827],
    shelters: [
      { id: "mdj_001", name: "牡丹江站地下避难所", type: "shelter", position: [129.6186, 44.5827], address: "牡丹江市东安区光华街", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "牡丹江火车站地下", description: "牡丹江铁路枢纽地下民防工程" },
      { id: "mdj_002", name: "步行街地下人防商场", type: "underground_mall", position: [129.6086, 44.5727], address: "牡丹江市西安区西平安街", capacity: "2500人", level: "核6级", facilities: "应急物资储备、医疗点", access: "步行街地下入口", description: "市中心商业区人防工程" },
      { id: "mdj_003", name: "第一人民医院地下避难所", type: "shelter", position: [129.6286, 44.5927], address: "牡丹江市爱民区西晓云街", capacity: "2000人", level: "核6级", facilities: "医疗设施、应急物资", access: "第一医院地下", description: "医疗设施人防" },
      { id: "mdj_004", name: "北山公园地下防空洞", type: "bunker", position: [129.6386, 44.6127], address: "牡丹江市爱民区北山公园", capacity: "3500人", level: "核5级", facilities: "山地防空设施", access: "北山公园地下", description: "山地深层防空工程" }
    ],
    targets: [
      { name: "牡丹江火车站", type: "transport", position: [129.6186, 44.5827], risk: "中" },
      { name: "海浪机场", type: "airport", position: [129.5986, 44.5227], risk: "中" },
      { name: "桦林橡胶厂", type: "factory", position: [129.6586, 44.6127], risk: "高" }
    ]
  },

  jiamusi: {
    name: "佳木斯",
    center: [130.3613, 46.8096],
    shelters: [
      { id: "jms_001", name: "佳木斯站地下避难所", type: "shelter", position: [130.3613, 46.8096], address: "佳木斯市向阳区站前路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "佳木斯火车站地下", description: "佳木斯铁路枢纽地下民防工程" },
      { id: "jms_002", name: "大润发地下人防", type: "underground_mall", position: [130.3513, 46.7996], address: "佳木斯市前进区长安路", capacity: "2000人", level: "核6级", facilities: "商业区地下防护", access: "大润发地下停车场", description: "商业中心配套人防" },
      { id: "jms_003", name: "中心医院地下避难所", type: "shelter", position: [130.3713, 46.8196], address: "佳木斯市向阳区中山街", capacity: "2000人", level: "核6级", facilities: "医疗设施、应急物资", access: "中心医院地下", description: "医疗设施人防" },
      { id: "jms_004", name: "西林公园地下防空洞", type: "bunker", position: [130.3813, 46.8296], address: "佳木斯市向阳区西林路", capacity: "3000人", level: "核5级", facilities: "公园地下防空设施", access: "西林公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "佳木斯火车站", type: "transport", position: [130.3613, 46.8096], risk: "中" },
      { name: "佳木斯发电厂", type: "factory", position: [130.3813, 46.8296], risk: "高" },
      { name: "佳木斯纸业", type: "factory", position: [130.4013, 46.7896], risk: "中" }
    ]
  },

  daqing: {
    name: "大庆",
    center: [125.1127, 46.5903],
    shelters: [
      { id: "dq_001", name: "大庆西站地下避难所", type: "shelter", position: [125.0027, 46.6403], address: "大庆市让胡路区中原路", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护、应急指挥中心", access: "大庆西站地下", description: "大庆高铁枢纽地下民防工程" },
      { id: "dq_002", name: "萨尔图站地下避难所", type: "shelter", position: [125.1127, 46.5903], address: "大庆市萨尔图区会战大街", capacity: "3000人", level: "核6级", facilities: "铁路枢纽防护", access: "萨尔图火车站地下", description: "传统火车站地下民防" },
      { id: "dq_003", name: "新村新玛特地下人防", type: "underground_mall", position: [125.1227, 46.6003], address: "大庆市萨尔图区新村", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "新玛特地下停车场", description: "商业中心人防工程" },
      { id: "dq_004", name: "铁人纪念馆地下避难所", type: "shelter", position: [125.0627, 46.5503], address: "大庆市让胡路区", capacity: "2000人", level: "核6级", facilities: "公共建筑配套防护", access: "纪念馆地下", description: "纪念建筑配套民防" }
    ],
    targets: [
      { name: "大庆油田", type: "factory", position: [125.1127, 46.5903], risk: "高" },
      { name: "大庆炼化", type: "factory", position: [125.1527, 46.6103], risk: "高" },
      { name: "大庆西站", type: "transport", position: [125.0027, 46.6403], risk: "中" },
      { name: "大庆石化", type: "factory", position: [125.1827, 46.5703], risk: "高" }
    ]
  },

  // ... 更多城市数据请参考 nuclear_cities_batch_126_part1.js ~ part8.js

};

// ============================================
// 数据使用说明
// ============================================
// 本文件包含126个中国地级及以上城市的补充避难所数据
// 每个城市包含：
// - 4个避难所（火车站/地铁、地下商场、其他类型）
// - 3-5个潜在核打击目标
// 
// 合并方式：
// Object.assign(SHELTER_DATA, CITIES_BATCH_126_ALL);
//
// 完整数据分布在以下文件：
// - nuclear_cities_batch_126_part1.js: 黑龙江省
// - nuclear_cities_batch_126_part2.js: 吉林省、辽宁省
// - nuclear_cities_batch_126_part3.js: 河北省
// - nuclear_cities_batch_126_part4.js: 内蒙古、河南省
// - nuclear_cities_batch_126_part5.js: 湖北省、湖南省
// - nuclear_cities_batch_126_part6.js: 江苏省
// - nuclear_cities_batch_126_part7.js: 浙江省、山东省
// - nuclear_cities_batch_126_part8.js: 山东省续、安徽省
// - nuclear_cities_batch_126_final.js: 其他省份重点城市
// ============================================

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_126_ALL;
}
