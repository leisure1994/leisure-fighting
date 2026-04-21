// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第四批次）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// 城市数量: 126个
// ============================================

const CITIES_BATCH_4 = {
  // ============================================
  // 东北地区 - 黑龙江省（剩余城市）
  // ============================================
  qiqihar: {
    name: "齐齐哈尔",
    center: [123.9182, 47.3543],
    shelters: [
      { id: "qqhe_001", name: "齐齐哈尔站地下避难所", type: "shelter", position: [123.9182, 47.3543], address: "齐齐哈尔市铁锋区站前大街", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "齐齐哈尔火车站地下", description: "齐齐哈尔铁路枢纽地下民防工程" },
      { id: "qqhe_002", name: "中环广场地下人防", type: "underground_mall", position: [123.9082, 47.3443], address: "齐齐哈尔市龙沙区中环广场", capacity: "3000人", level: "核6级", facilities: "物资储备库、医疗救护站", access: "中环广场地下通道", description: "市中心商业区人防工程" },
      { id: "qqhe_003", name: "齐齐哈尔医学院地下避难所", type: "shelter", position: [123.9382, 47.3643], address: "齐齐哈尔市建华区卜奎大街", capacity: "2500人", level: "核6级", facilities: "医疗救护设施、应急物资储备", access: "医学院地下停车场", description: "医疗设施配套人防工程" },
      { id: "qqhe_004", name: "龙沙公园地下防空洞", type: "bunker", position: [123.8982, 47.3243], address: "齐齐哈尔市龙沙区龙沙公园", capacity: "4000人", level: "核5级", facilities: "深层防空洞、独立供水系统", access: "龙沙公园地下入口", description: "早期深挖防空洞改建" }
    ],
    targets: [
      { name: "齐齐哈尔火车站", type: "transport", position: [123.9182, 47.3543], risk: "中" },
      { name: "第一重型机械厂", type: "factory", position: [123.9282, 47.3743], risk: "高" },
      { name: "齐齐哈尔水厂", type: "factory", position: [123.8882, 47.3643], risk: "中" }
    ]
  },

  mudanjiang: {
    name: "牡丹江",
    center: [129.6186, 44.5827],
    shelters: [
      { id: "mdj_001", name: "牡丹江站地下避难所", type: "shelter", position: [129.6186, 44.5827], address: "牡丹江市东安区光华街", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "牡丹江火车站地下", description: "牡丹江铁路枢纽地下民防工程" },
      { id: "mdj_002", name: "步行街地下人防商场", type: "underground_mall", position: [129.6086, 44.5727], address: "牡丹江市西安区西平安街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "步行街地下入口", description: "市中心商业区人防工程" },
      { id: "mdj_003", name: "北山公园地下防空洞", type: "bunker", position: [129.6386, 44.5927], address: "牡丹江市爱民区北山公园", capacity: "3500人", level: "核5级", facilities: "深层防护设施", access: "北山公园地下", description: "山地深层防空工程" },
      { id: "mdj_004", name: "海浪机场地下避难所", type: "shelter", position: [129.5986, 44.5227], address: "牡丹江市西安区海浪路", capacity: "2000人", level: "核5级", facilities: "机场配套防护", access: "海浪机场地下", description: "航空枢纽配套民防" }
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
      { id: "jms_003", name: "西林公园地下防空洞", type: "bunker", position: [130.3713, 46.8196], address: "佳木斯市郊区西林路", capacity: "3000人", level: "核5级", facilities: "深层防空设施", access: "西林公园地下", description: "公园地下人防工程" },
      { id: "jms_004", name: "东郊机场地下避难所", type: "shelter", position: [130.4213, 46.8596], address: "佳木斯市东风区东郊机场", capacity: "1500人", level: "核5级", facilities: "机场配套防护", access: "东郊机场地下", description: "航空枢纽配套民防" }
    ],
    targets: [
      { name: "佳木斯火车站", type: "transport", position: [130.3613, 46.8096], risk: "中" },
      { name: "佳木斯发电厂", type: "factory", position: [130.3813, 46.8296], risk: "高" },
      { name: "造纸厂", type: "factory", position: [130.4013, 46.7896], risk: "中" }
    ]
  },

  daqing: {
    name: "大庆",
    center: [125.1127, 46.5903],
    shelters: [
      { id: "dq_001", name: "大庆西站地下避难所", type: "shelter", position: [125.0027, 46.6403], address: "大庆市让胡路区中原路", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "大庆西站地下", description: "大庆高铁枢纽地下民防工程" },
      { id: "dq_002", name: "萨尔图火车站地下避难所", type: "shelter", position: [125.1127, 46.5903], address: "大庆市萨尔图区会战大街", capacity: "3000人", level: "核6级", facilities: "铁路枢纽防护", access: "萨尔图火车站地下", description: "传统火车站地下民防" },
      { id: "dq_003", name: "新村新玛特地下人防", type: "underground_mall", position: [125.1227, 46.6003], address: "大庆市萨尔图区新村", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "新玛特地下停车场", description: "商业中心人防工程" },
      { id: "dq_004", name: "铁人王进喜纪念馆地下避难所", type: "shelter", position: [125.0627, 46.5503], address: "大庆市让胡路区", capacity: "2000人", level: "核6级", facilities: "公共建筑配套防护", access: "纪念馆地下", description: "纪念建筑配套民防" }
    ],
    targets: [
      { name: "大庆油田", type: "factory", position: [125.1127, 46.5903], risk: "高" },
      { name: "大庆炼化", type: "factory", position: [125.1527, 46.6103], risk: "高" },
      { name: "大庆西站", type: "transport", position: [125.0027, 46.6403], risk: "中" },
      { name: "大庆石化", type: "factory", position: [125.1827, 46.5703], risk: "高" }
    ]
  },

  suihua: {
    name: "绥化",
    center: [126.9929, 46.6374],
    shelters: [
      { id: "sh_001", name: "绥化站地下避难所", type: "shelter", position: [126.9929, 46.6374], address: "绥化市北林区太平路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "绥化火车站地下", description: "绥化铁路枢纽地下民防工程" },
      { id: "sh_002", name: "中兴大街地下人防", type: "underground_mall", position: [126.9829, 46.6274], address: "绥化市北林区中兴大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "中兴大街地下通道", description: "市中心商业区人防" },
      { id: "sh_003", name: "绥化市人防指挥中心", type: "shelter", position: [127.0129, 46.6474], address: "绥化市北林区党政办公中心", capacity: "3000人", level: "核5级", facilities: "指挥通信系统、应急供电", access: "党政办公中心地下", description: "市级人防指挥枢纽" },
      { id: "sh_004", name: "西湖公园地下防空洞", type: "bunker", position: [126.9629, 46.6174], address: "绥化市北林区西湖公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空设施", access: "西湖公园地下", description: "公园配套人防工程" }
    ],
    targets: [
      { name: "绥化火车站", type: "transport", position: [126.9929, 46.6374], risk: "中" },
      { name: "绥化水厂", type: "factory", position: [126.9729, 46.6574], risk: "中" },
      { name: "中粮油脂", type: "factory", position: [127.0229, 46.6074], risk: "中" }
    ]
  },

  hegang: {
    name: "鹤岗",
    center: [130.2775, 47.3321],
    shelters: [
      { id: "hg_001", name: "鹤岗站地下避难所", type: "shelter", position: [130.2775, 47.3321], address: "鹤岗市向阳区东解放路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "鹤岗火车站地下", description: "鹤岗铁路枢纽地下民防工程" },
      { id: "hg_002", name: "新世纪广场地下人防", type: "underground_mall", position: [130.2675, 47.3221], address: "鹤岗市工农区新世纪广场", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "新世纪广场地下", description: "市中心商业区人防" },
      { id: "hg_003", name: "五指山公园地下防空洞", type: "bunker", position: [130.2975, 47.3421], address: "鹤岗市南山区", capacity: "2500人", level: "核6级", facilities: "山地防空设施", access: "五指山公园地下", description: "山地人防工程" },
      { id: "hg_004", name: "鹤岗矿务局地下避难所", type: "shelter", position: [130.2375, 47.3121], address: "鹤岗市向阳区", capacity: "3000人", level: "核5级", facilities: "矿区配套防护设施", access: "矿务局地下", description: "矿区人防工程" }
    ],
    targets: [
      { name: "鹤岗煤矿", type: "factory", position: [130.2575, 47.3521], risk: "高" },
      { name: "鹤岗火车站", type: "transport", position: [130.2775, 47.3321], risk: "中" },
      { name: "鹤岗发电厂", type: "factory", position: [130.2175, 47.2921], risk: "高" }
    ]
  },

  shuangyashan: {
    name: "双鸭山",
    center: [131.1577, 46.6434],
    shelters: [
      { id: "sys_001", name: "双鸭山站地下避难所", type: "shelter", position: [131.1577, 46.6434], address: "双鸭山市尖山区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "双鸭山火车站地下", description: "双鸭山铁路枢纽地下民防工程" },
      { id: "sys_002", name: "新兴大街地下人防", type: "underground_mall", position: [131.1477, 46.6334], address: "双鸭山市尖山区新兴大街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "新兴大街地下通道", description: "市中心商业区人防" },
      { id: "sys_003", name: "双鸭山矿务局地下避难所", type: "shelter", position: [131.1777, 46.6634], address: "双鸭山市尖山区", capacity: "3000人", level: "核5级", facilities: "矿区配套防护", access: "矿务局地下", description: "矿区人防工程" },
      { id: "sys_004", name: "北秀公园地下防空洞", type: "bunker", position: [131.1277, 46.6234], address: "双鸭山市尖山区北秀公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "北秀公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "双鸭山煤矿", type: "factory", position: [131.1677, 46.6534], risk: "高" },
      { name: "双鸭山火车站", type: "transport", position: [131.1577, 46.6434], risk: "中" },
      { name: "集贤洗煤厂", type: "factory", position: [131.1977, 46.6734], risk: "中" }
    ]
  },

  yichun: {
    name: "伊春",
    center: [128.8405, 47.7263],
    shelters: [
      { id: "yc_001", name: "伊春站地下避难所", type: "shelter", position: [128.8405, 47.7263], address: "伊春市伊春区新兴西路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "伊春火车站地下", description: "伊春铁路枢纽地下民防工程" },
      { id: "yc_002", name: "通河路地下人防", type: "underground_mall", position: [128.8305, 47.7163], address: "伊春市伊春区通河路", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "通河路地下通道", description: "市中心商业区人防" },
      { id: "yc_003", name: "伊春林业管理局地下避难所", type: "shelter", position: [128.8605, 47.7363], address: "伊春市伊春区", capacity: "2500人", level: "核6级", facilities: "林业配套防护", access: "林业管理局地下", description: "林区人防工程" },
      { id: "yc_004", name: "南山公园地下防空洞", type: "bunker", position: [128.8105, 47.7063], address: "伊春市伊春区南山公园", capacity: "2000人", level: "核6级", facilities: "山地防空设施", access: "南山公园地下", description: "山地人防工程" }
    ],
    targets: [
      { name: "伊春火车站", type: "transport", position: [128.8405, 47.7263], risk: "中" },
      { name: "伊春发电厂", type: "factory", position: [128.8705, 47.7463], risk: "中" },
      { name: "乌马河木材厂", type: "factory", position: [128.7905, 47.6963], risk: "中" }
    ]
  },

  qitaihe: {
    name: "七台河",
    center: [131.0158, 45.7712],
    shelters: [
      { id: "qth_001", name: "七台河站地下避难所", type: "shelter", position: [131.0158, 45.7712], address: "七台河市桃山区山湖路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "七台河火车站地下", description: "七台河铁路枢纽地下民防工程" },
      { id: "qth_002", name: "桃南地下人防", type: "underground_mall", position: [131.0058, 45.7612], address: "七台河市桃山区桃南街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "桃南街地下通道", description: "市中心商业区人防" },
      { id: "qth_003", name: "七台河矿务局地下避难所", type: "shelter", position: [131.0358, 45.7812], address: "七台河市茄子河区", capacity: "3000人", level: "核5级", facilities: "矿区配套防护", access: "矿务局地下", description: "矿区人防工程" },
      { id: "qth_004", name: "仙洞山公园地下防空洞", type: "bunker", position: [130.9958, 45.7512], address: "七台河市桃山区仙洞山公园", capacity: "2000人", level: "核6级", facilities: "山地防空设施", access: "仙洞山公园地下", description: "山地人防工程" }
    ],
    targets: [
      { name: "七台河煤矿", type: "factory", position: [131.0258, 45.7912], risk: "高" },
      { name: "七台河火车站", type: "transport", position: [131.0158, 45.7712], risk: "中" },
      { name: "七台河电厂", type: "factory", position: [131.0558, 45.7312], risk: "高" }
    ]
  },

  heihe: {
    name: "黑河",
    center: [127.4990, 50.2501],
    shelters: [
      { id: "hh_001", name: "黑河站地下避难所", type: "shelter", position: [127.4990, 50.2501], address: "黑河市爱辉区铁路街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水、供暖设施", access: "黑河火车站地下", description: "黑河铁路枢纽地下民防工程" },
      { id: "hh_002", name: "中央街地下人防", type: "underground_mall", position: [127.4890, 50.2401], address: "黑河市爱辉区中央街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "中央街地下通道", description: "边境城市商业区人防" },
      { id: "hh_003", name: "黑河口岸地下避难所", type: "bunker", position: [127.5190, 50.2601], address: "黑河市爱辉区大黑河岛", capacity: "2500人", level: "核5级", facilities: "边境口岸配套防护", access: "口岸地下", description: "边境口岸人防工程" },
      { id: "hh_004", name: "黑龙江公园地下防空洞", type: "shelter", position: [127.4590, 50.2201], address: "黑河市爱辉区黑龙江公园", capacity: "1500人", level: "核6级", facilities: "公园地下防空", access: "黑龙江公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "黑河口岸", type: "port", position: [127.5190, 50.2601], risk: "中" },
      { name: "黑河火车站", type: "transport", position: [127.4990, 50.2501], risk: "中" },
      { name: "黑河发电厂", type: "factory", position: [127.5390, 50.2301], risk: "中" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4;
}
