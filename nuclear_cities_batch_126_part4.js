// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第四部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART4 = {
  // ============================================
  // 华北地区 - 内蒙古（剩余城市）
  // ============================================
  baotou: {
    name: "包头",
    center: [109.8404, 40.6574],
    shelters: [
      { id: "bt_001", name: "包头站地下避难所", type: "shelter", position: [109.8404, 40.6574], address: "包头市昆都仑区阿尔丁大街", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "包头火车站地下", description: "草原钢城核心铁路枢纽民防" },
      { id: "bt_002", name: "包头东站地下避难所", type: "shelter", position: [110.0204, 40.5674], address: "包头市东河区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽防护", access: "包头东站地下", description: "包头东部铁路枢纽民防" },
      { id: "bt_003", name: "钢铁大街地下人防", type: "underground_mall", position: [109.8304, 40.6474], address: "包头市昆都仑区钢铁大街", capacity: "2500人", level: "核6级", facilities: "商业区防护", access: "钢铁大街地下通道", description: "市中心商业区人防" },
      { id: "bt_004", name: "包钢地下避难所", type: "bunker", position: [109.7804, 40.6174], address: "包头市昆都仑区包钢厂区", capacity: "5000人", level: "核5级", facilities: "钢铁企业深层防护", access: "包钢地下指挥中心", description: "重要钢铁企业民防工程" },
      { id: "bt_005", name: "赛汗塔拉地下避难所", type: "shelter", position: [109.8904, 40.6874], address: "包头市九原区赛汗塔拉", capacity: "2000人", level: "核6级", facilities: "生态园配套防护", access: "赛汗塔拉地下", description: "城中草原配套人防" }
    ],
    targets: [
      { name: "包钢", type: "factory", position: [109.7804, 40.6174], risk: "高" },
      { name: "包头火车站", type: "transport", position: [109.8404, 40.6574], risk: "中" },
      { name: "包头一机厂", type: "factory", position: [109.8104, 40.6674], risk: "高" },
      { name: "包头二机厂", type: "factory", position: [109.7904, 40.6774], risk: "高" },
      { name: "包头电厂", type: "factory", position: [109.8604, 40.7074], risk: "高" }
    ]
  },

  wuhai: {
    name: "乌海",
    center: [106.7943, 39.6554],
    shelters: [
      { id: "wh_001", name: "乌海站地下避难所", type: "shelter", position: [106.7943, 39.6554], address: "乌海市海勃湾区新华大街", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "乌海火车站地下", description: "乌海铁路枢纽民防工程" },
      { id: "wh_002", name: "乌海西站地下避难所", type: "shelter", position: [106.7143, 39.5954], address: "乌海市乌达区", capacity: "2000人", level: "核6级", facilities: "货运枢纽防护", access: "乌海西站地下", description: "乌海货运枢纽民防" },
      { id: "wh_003", name: "明珠百货地下人防", type: "underground_mall", position: [106.8043, 39.6654], address: "乌海市海勃湾区人民路", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "明珠百货地下", description: "商业中心人防" },
      { id: "wh_004", name: "神华乌海能源地下避难所", type: "shelter", position: [106.7543, 39.6254], address: "乌海市海勃湾区", capacity: "3000人", level: "核5级", facilities: "能源企业配套防护", access: "神华地下", description: "能源企业人防工程" }
    ],
    targets: [
      { name: "神华乌海能源", type: "factory", position: [106.7543, 39.6254], risk: "高" },
      { name: "乌海电厂", type: "factory", position: [106.7843, 39.6454], risk: "高" },
      { name: "乌海火车站", type: "transport", position: [106.7943, 39.6554], risk: "中" }
    ]
  },

  chifeng: {
    name: "赤峰",
    center: [118.8868, 42.2578],
    shelters: [
      { id: "cf_001", name: "赤峰站地下避难所", type: "shelter", position: [118.8868, 42.2578], address: "赤峰市松山区西站大街", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "赤峰火车站地下", description: "赤峰铁路枢纽民防工程" },
      { id: "cf_002", name: "赤峰南站地下避难所", type: "shelter", position: [118.9568, 42.2678], address: "赤峰市红山区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "赤峰南站地下", description: "赤峰南站民防" },
      { id: "cf_003", name: "维多利地下人防", type: "underground_mall", position: [118.8968, 42.2478], address: "赤峰市红山区昭乌达路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "维多利广场地下", description: "商业中心人防" },
      { id: "cf_004", name: "红山公园地下避难所", type: "shelter", position: [118.9168, 42.2778], address: "赤峰市红山区红山公园", capacity: "1500人", level: "核6级", facilities: "公园配套防护", access: "红山公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "赤峰热电厂", type: "factory", position: [118.8768, 42.2378], risk: "高" },
      { name: "赤峰火车站", type: "transport", position: [118.8868, 42.2578], risk: "中" },
      { name: "平庄煤矿", type: "factory", position: [119.1268, 42.0378], risk: "高" }
    ]
  },

  tongliao: {
    name: "通辽",
    center: [122.2430, 43.6525],
    shelters: [
      { id: "tl_001", name: "通辽站地下避难所", type: "shelter", position: [122.2430, 43.6525], address: "通辽市科尔沁区南顺大街", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "通辽火车站地下", description: "蒙东铁路枢纽民防工程" },
      { id: "tl_002", name: "通辽机场地下避难所", type: "shelter", position: [122.2030, 43.6125], address: "通辽市科尔沁区", capacity: "2000人", level: "核5级", facilities: "机场配套防护", access: "通辽机场地下", description: "航空枢纽民防工程" },
      { id: "tl_003", name: "明仁大街地下人防", type: "underground_mall", position: [122.2330, 43.6425], address: "通辽市科尔沁区明仁大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "明仁大街地下通道", description: "市中心商业区人防" },
      { id: "tl_004", name: "西拉木伦公园地下避难所", type: "shelter", position: [122.2630, 43.6825], address: "通辽市科尔沁区", capacity: "1500人", level: "核6级", facilities: "公园配套防护", access: "西拉木伦公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "通辽电厂", type: "factory", position: [122.2730, 43.6625], risk: "高" },
      { name: "通辽火车站", type: "transport", position: [122.2430, 43.6525], risk: "中" },
      { name: "霍林河煤矿", type: "factory", position: [119.6630, 45.5325], risk: "高" }
    ]
  },

  erdos: {
    name: "鄂尔多斯",
    center: [109.7813, 39.6083],
    shelters: [
      { id: "eeds_001", name: "鄂尔多斯站地下避难所", type: "shelter", position: [109.7813, 39.6083], address: "鄂尔多斯市东胜区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "鄂尔多斯站地下", description: "草原新城铁路枢纽民防" },
      { id: "eeds_002", name: "东胜西站地下避难所", type: "shelter", position: [109.7013, 39.6683], address: "鄂尔多斯市东胜区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "东胜西站地下", description: "东胜西铁路枢纽民防" },
      { id: "eeds_003", name: "伊金霍洛旗地下避难所", type: "bunker", position: [109.8013, 39.5683], address: "鄂尔多斯市伊金霍洛旗", capacity: "4000人", level: "核5级", facilities: "旗府配套深层防护", access: "伊旗党政中心地下", description: "伊金霍洛旗人防指挥中心" },
      { id: "eeds_004", name: "康巴什新区地下避难所", type: "shelter", position: [109.8413, 39.5883], address: "鄂尔多斯市康巴什区", capacity: "3500人", level: "核6级", facilities: "新区配套防护", access: "康巴什核心区地下", description: "康巴什新区民防工程" }
    ],
    targets: [
      { name: "神华集团", type: "factory", position: [109.7613, 39.6283], risk: "高" },
      { name: "鄂尔多斯煤矿", type: "factory", position: [109.8213, 39.5483], risk: "高" },
      { name: "鄂尔多斯站", type: "transport", position: [109.7813, 39.6083], risk: "中" },
      { name: "达拉特电厂", type: "factory", position: [109.8813, 39.6883], risk: "高" }
    ]
  },

  bayannur: {
    name: "巴彦淖尔",
    center: [107.3850, 40.7505],
    shelters: [
      { id: "byze_001", name: "临河站地下避难所", type: "shelter", position: [107.3850, 40.7505], address: "巴彦淖尔市临河区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "临河火车站地下", description: "河套平原铁路枢纽民防" },
      { id: "byze_002", name: "新华东街地下人防", type: "underground_mall", position: [107.3750, 40.7405], address: "巴彦淖尔市临河区新华东街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "新华东街地下通道", description: "市中心商业区人防" },
      { id: "byze_003", name: "河套酒业地下避难所", type: "shelter", position: [107.4150, 40.7705], address: "巴彦淖尔市杭锦后旗", capacity: "2000人", level: "核6级", facilities: "企业配套防护", access: "河套酒业地下", description: "重点企业人防工程" },
      { id: "byze_004", name: "黄河湿地公园地下避难所", type: "shelter", position: [107.3350, 40.7305], address: "巴彦淖尔市临河区", capacity: "1500人", level: "核6级", facilities: "公园配套防护", access: "黄河湿地公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "临河电厂", type: "factory", position: [107.4050, 40.7605], risk: "高" },
      { name: "河套酒业", type: "factory", position: [107.4150, 40.7705], risk: "中" },
      { name: "临河火车站", type: "transport", position: [107.3850, 40.7505], risk: "中" }
    ]
  },

  ulanqab: {
    name: "乌兰察布",
    center: [113.1338, 40.9934],
    shelters: [
      { id: "wlcb_001", name: "集宁南站地下避难所", type: "shelter", position: [113.1338, 40.9934], address: "乌兰察布市集宁区怀远北路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "集宁南站地下", description: "乌兰察布铁路枢纽民防" },
      { id: "wlcb_002", name: "乌兰察布站地下避难所", type: "shelter", position: [113.0738, 41.0334], address: "乌兰察布市集宁区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "乌兰察布站地下", description: "张呼高铁枢纽民防工程" },
      { id: "wlcb_003", name: "恩和大街地下人防", type: "underground_mall", position: [113.1238, 40.9834], address: "乌兰察布市集宁区恩和大街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "恩和大街地下通道", description: "市中心商业区人防" },
      { id: "wlcb_004", name: "集宁战役纪念馆地下避难所", type: "shelter", position: [113.1538, 41.0134], address: "乌兰察布市集宁区", capacity: "2000人", level: "核6级", facilities: "纪念建筑配套防护", access: "纪念馆地下", description: "纪念建筑人防工程" }
    ],
    targets: [
      { name: "乌兰察布电厂", type: "factory", position: [113.1638, 41.0034], risk: "高" },
      { name: "集宁火车站", type: "transport", position: [113.1338, 40.9934], risk: "中" },
      { name: "乌兰察布铁合金", type: "factory", position: [113.0938, 41.0534], risk: "中" }
    ]
  },

  xilinhot: {
    name: "锡林郭勒",
    center: [116.0487, 43.9333],
    shelters: [
      { id: "xlgl_001", name: "锡林浩特站地下避难所", type: "shelter", position: [116.0487, 43.9333], address: "锡林郭勒盟锡林浩特市", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "锡林浩特站地下", description: "草原城市铁路枢纽民防" },
      { id: "xlgl_002", name: "锡林广场地下人防", type: "underground_mall", position: [116.0387, 43.9233], address: "锡林郭勒盟锡林浩特市", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "锡林广场地下", description: "市中心人防工程" },
      { id: "xlgl_003", name: "贝子庙地下避难所", type: "shelter", position: [116.0687, 43.9433], address: "锡林郭勒盟锡林浩特市", capacity: "1500人", level: "核6级", facilities: "古迹配套防护", access: "贝子庙地下", description: "古迹配套人防" },
      { id: "xlgl_004", name: "锡林郭勒草原公园地下", type: "shelter", position: [116.0887, 43.9533], address: "锡林郭勒盟锡林浩特市", capacity: "1000人", level: "核6级", facilities: "公园配套防护", access: "草原公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "锡林浩特机场", type: "airport", position: [115.9987, 43.9533], risk: "中" },
      { name: "锡林浩特站", type: "transport", position: [116.0487, 43.9333], risk: "中" },
      { name: "锡林热电厂", type: "factory", position: [116.0787, 43.9633], risk: "中" }
    ]
  },

  hulunbuir: {
    name: "呼伦贝尔",
    center: [119.7658, 49.2112],
    shelters: [
      { id: "hlbe_001", name: "海拉尔站地下避难所", type: "shelter", position: [119.7658, 49.2112], address: "呼伦贝尔市海拉尔区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "海拉尔站地下", description: "草原之城铁路枢纽民防" },
      { id: "hlbe_002", name: "海拉尔东山机场地下", type: "shelter", position: [119.8258, 49.2012], address: "呼伦贝尔市海拉尔区", capacity: "2000人", level: "核5级", facilities: "机场配套深层防护", access: "东山机场地下", description: "边境航空枢纽民防" },
      { id: "hlbe_003", name: "成吉思汗广场地下人防", type: "underground_mall", position: [119.7558, 49.2012], address: "呼伦贝尔市海拉尔区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "成吉思汗广场地下", description: "市中心人防工程" },
      { id: "hlbe_004", name: "满洲里口岸地下避难所", type: "bunker", position: [117.4458, 49.5912], address: "呼伦贝尔市满洲里市", capacity: "3000人", level: "核5级", facilities: "边境口岸深层防护", access: "满洲里口岸地下", description: "边境口岸重要人防" }
    ],
    targets: [
      { name: "满洲里口岸", type: "port", position: [117.4458, 49.5912], risk: "中" },
      { name: "海拉尔火车站", type: "transport", position: [119.7658, 49.2112], risk: "中" },
      { name: "海拉尔热电厂", type: "factory", position: [119.7958, 49.2412], risk: "中" }
    ]
  },

  alxa: {
    name: "阿拉善",
    center: [105.7057, 38.8515],
    shelters: [
      { id: "als_001", name: "阿拉善左旗地下避难所", type: "shelter", position: [105.7057, 38.8515], address: "阿拉善盟阿拉善左旗", capacity: "1500人", level: "核6级", facilities: "旗府配套防护", access: "左旗党政中心地下", description: "沙漠城市旗府民防" },
      { id: "als_002", name: "巴彦浩特地下人防", type: "underground_mall", position: [105.6957, 38.8415], address: "阿拉善盟巴彦浩特镇", capacity: "1000人", level: "核6级", facilities: "商业区防护", access: "巴彦浩特地下", description: "小镇中心人防" },
      { id: "als_003", name: "策克口岸地下避难所", type: "shelter", position: [101.0557, 42.9515], address: "阿拉善盟额济纳旗", capacity: "2000人", level: "核5级", facilities: "边境口岸配套防护", access: "策克口岸地下", description: "边境口岸人防" },
      { id: "als_004", name: "东风航天城地下避难所", type: "bunker", position: [100.2557, 41.0515], address: "阿拉善盟额济纳旗", capacity: "5000人", level: "核5级", facilities: "航天基地深层防护", access: "航天城地下", description: "航天基地重要人防" }
    ],
    targets: [
      { name: "东风航天城", type: "factory", position: [100.2557, 41.0515], risk: "高" },
      { name: "策克口岸", type: "port", position: [101.0557, 42.9515], risk: "中" },
      { name: "阿拉善机场", type: "airport", position: [105.7257, 38.8715], risk: "低" }
    ]
  },

  // ============================================
  // 华中地区 - 河南省（剩余城市）
  // ============================================
  luoyang: {
    name: "洛阳",
    center: [112.4345, 34.6181],
    shelters: [
      { id: "ly_001", name: "洛阳龙门站地下避难所", type: "shelter", position: [112.4205, 34.6281], address: "洛阳市洛龙区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "洛阳龙门站地下", description: "洛阳高铁枢纽民防工程" },
      { id: "ly_002", name: "洛阳站地下避难所", type: "shelter", position: [112.4345, 34.6181], address: "洛阳市西工区道南路", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "洛阳火车站地下", description: "洛阳传统火车站民防" },
      { id: "ly_003", name: "应天门地下防空洞", type: "bunker", position: [112.4445, 34.6081], address: "洛阳市西工区应天门", capacity: "2500人", level: "核5级", facilities: "历史建筑深层防护", access: "应天门地下", description: "隋唐遗址人防工程" },
      { id: "ly_004", name: "王府井地下人防", type: "underground_mall", position: [112.4545, 34.6281], address: "洛阳市西工区中州中路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "王府井地下", description: "商业中心人防" },
      { id: "ly_005", name: "中国一拖地下避难所", type: "shelter", position: [112.4145, 34.6381], address: "洛阳市涧西区建设路", capacity: "3000人", level: "核6级", facilities: "企业配套防护", access: "一拖厂区地下", description: "重点企业人防" }
    ],
    targets: [
      { name: "洛阳一拖", type: "factory", position: [112.4145, 34.6381], risk: "高" },
      { name: "洛阳轴承", type: "factory", position: [112.4245, 34.6481], risk: "中" },
      { name: "洛阳站", type: "transport", position: [112.4345, 34.6181], risk: "中" },
      { name: "洛阳石化", type: "factory", position: [112.3545, 34.7581], risk: "高" },
      { name: "洛阳热电厂", type: "factory", position: [112.3945, 34.5981], risk: "高" }
    ]
  },

  anyang: {
    name: "安阳",
    center: [114.3924, 36.0981],
    shelters: [
      { id: "ay_001", name: "安阳东站地下避难所", type: "shelter", position: [114.4324, 36.1181], address: "安阳市安阳县", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "安阳东站地下", description: "安阳高铁枢纽民防" },
      { id: "ay_002", name: "安阳站地下避难所", type: "shelter", position: [114.3924, 36.0981], address: "安阳市北关区解放路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "安阳火车站地下", description: "安阳传统火车站民防" },
      { id: "ay_003", name: "殷墟地下避难所", type: "bunker", position: [114.3124, 36.1381], address: "安阳市殷都区", capacity: "2000人", level: "核6级", facilities: "世界遗产配套防护", access: "殷墟地下", description: "世界遗产人防工程" },
      { id: "ay_004", name: "安钢地下避难所", type: "shelter", position: [114.3524, 36.0681], address: "安阳市殷都区", capacity: "4000人", level: "核5级", facilities: "钢铁企业配套深层防护", access: "安钢地下", description: "重要钢铁企业人防" }
    ],
    targets: [
      { name: "安钢集团", type: "factory", position: [114.3524, 36.0681], risk: "高" },
      { name: "安阳电厂", type: "factory", position: [114.3724, 36.0881], risk: "高" },
      { name: "安阳火车站", type: "transport", position: [114.3924, 36.0981], risk: "中" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART4;
}
