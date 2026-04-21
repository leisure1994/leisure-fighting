// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第七部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART7 = {
  // ============================================
  // 华东地区 - 浙江省（剩余城市）
  // ============================================
  jiaxing: {
    name: "嘉兴",
    center: [120.7555, 30.7450],
    shelters: [
      { id: "jx_001", name: "嘉兴南站地下避难所", type: "shelter", position: [120.7755, 30.7450], address: "嘉兴市南湖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "嘉兴南站地下", description: "嘉兴高铁枢纽民防" },
      { id: "jx_002", name: "嘉兴站地下避难所", type: "shelter", position: [120.7555, 30.7650], address: "嘉兴市南湖区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "嘉兴火车站地下", description: "嘉兴传统火车站民防" },
      { id: "jx_003", name: "八佰伴地下人防", type: "underground_mall", position: [120.7455, 30.7350], address: "嘉兴市南湖区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "八佰伴地下", description: "商业中心人防" },
      { id: "jx_004", name: "乌镇地下避难所", type: "shelter", position: [120.4855, 30.7450], address: "嘉兴市桐乡市", capacity: "2000人", level: "核6级", facilities: "古镇配套深层防护", access: "乌镇地下", description: "古镇人防工程" }
    ],
    targets: [
      { name: "嘉兴电厂", type: "factory", position: [120.7855, 30.7550], risk: "高" },
      { name: "嘉兴火车站", type: "transport", position: [120.7555, 30.7650], risk: "中" },
      { name: "嘉兴港", type: "port", position: [120.9055, 30.6850], risk: "中" }
    ]
  },

  shaoxing: {
    name: "绍兴",
    center: [120.5802, 30.0302],
    shelters: [
      { id: "sx_001", name: "绍兴北站地下避难所", type: "shelter", position: [120.5402, 30.0702], address: "绍兴市柯桥区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "绍兴北站地下", description: "绍兴高铁枢纽民防" },
      { id: "sx_002", name: "绍兴站地下避难所", type: "shelter", position: [120.5802, 30.0302], address: "绍兴市越城区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "绍兴火车站地下", description: "绍兴传统火车站民防" },
      { id: "sx_003", name: "鲁迅故里地下避难所", type: "bunker", position: [120.5902, 30.0102], address: "绍兴市越城区", capacity: "2000人", level: "核6级", facilities: "古迹配套深层防护", access: "鲁迅故里地下", description: "名人故居人防" },
      { id: "sx_004", name: "银泰城地下人防", type: "underground_mall", position: [120.5702, 30.0402], address: "绍兴市越城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "银泰城地下", description: "商业中心人防" }
    ],
    targets: [
      { name: "绍兴电厂", type: "factory", position: [120.6102, 30.0502], risk: "高" },
      { name: "绍兴火车站", type: "transport", position: [120.5802, 30.0302], risk: "中" },
      { name: "袍江工业区", type: "factory", position: [120.6502, 30.0802], risk: "中" }
    ]
  },

  taizhou_zhe: {
    name: "台州",
    center: [121.4286, 28.6614],
    shelters: [
      { id: "tz_zhe_001", name: "台州站地下避难所", type: "shelter", position: [121.3886, 28.7014], address: "台州市椒江区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "台州火车站地下", description: "台州高铁枢纽民防" },
      { id: "tz_zhe_002", name: "台州西站地下避难所", type: "shelter", position: [121.3586, 28.6814], address: "台州市黄岩区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "台州西站地下", description: "台州铁路枢纽民防" },
      { id: "tz_zhe_003", name: "市民广场地下人防", type: "underground_mall", position: [121.4186, 28.6514], address: "台州市椒江区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "市民广场地下", description: "商业中心人防" },
      { id: "tz_zhe_004", name: "天台山地下避难所", type: "shelter", position: [121.0286, 29.1614], address: "台州市天台县", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "天台山景区地下", description: "5A景区人防工程" }
    ],
    targets: [
      { name: "台州电厂", type: "factory", position: [121.4486, 28.6314], risk: "高" },
      { name: "台州火车站", type: "transport", position: [121.3886, 28.7014], risk: "中" },
      { name: "吉利汽车", type: "factory", position: [121.4986, 28.7214], risk: "中" }
    ]
  },

  jinhua: {
    name: "金华",
    center: [119.6494, 29.0846],
    shelters: [
      { id: "jh_001", name: "金华南站地下避难所", type: "shelter", position: [119.6694, 29.1046], address: "金华市金东区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "金华南站地下", description: "金华高铁枢纽民防" },
      { id: "jh_002", name: "金华站地下避难所", type: "shelter", position: [119.6494, 29.0846], address: "金华市婺城区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "金华火车站地下", description: "浙中铁路枢纽民防" },
      { id: "jh_003", name: "人民广场地下人防", type: "underground_mall", position: [119.6394, 29.0746], address: "金华市婺城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "人民广场地下", description: "商业中心人防" },
      { id: "jh_004", name: "义乌小商品城地下避难所", type: "bunker", position: [120.0694, 29.3046], address: "金华市义乌市", capacity: "4000人", level: "核5级", facilities: "市场配套深层防护", access: "义乌小商品城地下", description: "世界最大小商品市场人防" }
    ],
    targets: [
      { name: "金华电厂", type: "factory", position: [119.6794, 29.0946], risk: "高" },
      { name: "义乌小商品城", type: "factory", position: [120.0694, 29.3046], risk: "中" },
      { name: "金华火车站", type: "transport", position: [119.6494, 29.0846], risk: "中" }
    ]
  },

  huzhou: {
    name: "湖州",
    center: [120.0881, 30.8931],
    shelters: [
      { id: "hz_001", name: "湖州站地下避难所", type: "shelter", position: [120.0281, 30.9531], address: "湖州市吴兴区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "湖州火车站地下", description: "湖州高铁枢纽民防" },
      { id: "hz_002", name: "湖州东站地下避难所", type: "shelter", position: [120.1481, 30.8331], address: "湖州市南浔区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "湖州东站地下", description: "湖苏沪高铁枢纽民防" },
      { id: "hz_003", name: "爱山广场地下人防", type: "underground_mall", position: [120.0781, 30.8831], address: "湖州市吴兴区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "爱山广场地下", description: "商业中心人防" },
      { id: "hz_004", name: "南浔古镇地下避难所", type: "shelter", position: [120.4281, 30.8731], address: "湖州市南浔区", capacity: "2000人", level: "核6级", facilities: "古镇配套防护", access: "南浔古镇地下", description: "古镇人防工程" }
    ],
    targets: [
      { name: "湖州电厂", type: "factory", position: [120.0581, 30.9131], risk: "高" },
      { name: "湖州火车站", type: "transport", position: [120.0281, 30.9531], risk: "中" },
      { name: "长兴电厂", type: "factory", position: [119.8981, 31.0131], risk: "高" }
    ]
  },

  quzhou: {
    name: "衢州",
    center: [118.8595, 28.9697],
    shelters: [
      { id: "qz_001", name: "衢州站地下避难所", type: "shelter", position: [118.8595, 28.9697], address: "衢州市柯城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "衢州火车站地下", description: "衢州高铁枢纽民防" },
      { id: "qz_002", name: "衢州西站地下避难所", type: "shelter", position: [118.9195, 28.9297], address: "衢州市柯城区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "衢州西站地下", description: "杭衢高铁枢纽民防" },
      { id: "qz_003", name: "国金中心地下人防", type: "underground_mall", position: [118.8495, 28.9597], address: "衢州市柯城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "国金中心地下", description: "商业中心人防" },
      { id: "qz_004", name: "江郎山地下避难所", type: "shelter", position: [118.5495, 28.5297], address: "衢州市江山市", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "江郎山景区地下", description: "世界遗产人防工程" }
    ],
    targets: [
      { name: "衢州电厂", type: "factory", position: [118.8795, 28.9897], risk: "高" },
      { name: "巨化集团", type: "factory", position: [118.9095, 28.9997], risk: "高" },
      { name: "衢州火车站", type: "transport", position: [118.8595, 28.9697], risk: "中" }
    ]
  },

  zhoushan: {
    name: "舟山",
    center: [122.2072, 29.9853],
    shelters: [
      { id: "zs_001", name: "舟山站地下避难所", type: "shelter", position: [122.1072, 30.0853], address: "舟山市定海区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "甬舟铁路舟山站地下", description: "甬舟铁路枢纽民防" },
      { id: "zs_002", name: "定海地下人防", type: "underground_mall", position: [122.1172, 30.0253], address: "舟山市定海区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "定海中心地下", description: "商业中心人防" },
      { id: "zs_003", name: "普陀山地下避难所", type: "shelter", position: [122.3872, 30.0153], address: "舟山市普陀区", capacity: "2000人", level: "核6级", facilities: "宗教圣地配套防护", access: "普陀山景区地下", description: "佛教圣地的防护工程" },
      { id: "zs_004", name: "舟山港地下避难所", type: "bunker", position: [122.1572, 30.0953], address: "舟山市定海区", capacity: "3000人", level: "核5级", facilities: "港口配套深层防护", access: "舟山港地下", description: "世界级港口人防" }
    ],
    targets: [
      { name: "舟山港", type: "port", position: [122.1572, 30.0953], risk: "高" },
      { name: "舟山机场", type: "airport", position: [122.3572, 29.9353], risk: "中" },
      { name: "岙山油库", type: "factory", position: [122.0472, 30.1653], risk: "高" }
    ]
  },

  lishui: {
    name: "丽水",
    center: [119.9228, 28.4676],
    shelters: [
      { id: "ls_001", name: "丽水站地下避难所", type: "shelter", position: [119.9228, 28.4676], address: "丽水市莲都区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "丽水火车站地下", description: "丽水高铁枢纽民防" },
      { id: "ls_002", name: "万地广场地下人防", type: "underground_mall", position: [119.9128, 28.4576], address: "丽水市莲都区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "万地广场地下", description: "商业中心人防" },
      { id: "ls_003", name: "缙云仙都地下避难所", type: "shelter", position: [120.0628, 28.6476], address: "丽水市缙云县", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "仙都景区地下", description: "5A景区人防工程" },
      { id: "ls_004", name: "龙泉青瓷地下避难所", type: "shelter", position: [119.1228, 28.0676], address: "丽水市龙泉市", capacity: "1500人", level: "核6级", facilities: "文化遗产配套防护", access: "青瓷小镇地下", description: "文化遗产人防" }
    ],
    targets: [
      { name: "丽水电厂", type: "factory", position: [119.9428, 28.4876], risk: "中" },
      { name: "丽水火车站", type: "transport", position: [119.9228, 28.4676], risk: "中" },
      { name: "纳爱斯集团", type: "factory", position: [119.9528, 28.4776], risk: "中" }
    ]
  },

  // ============================================
  // 华东地区 - 山东省（剩余城市）
  // ============================================
  yantai: {
    name: "烟台",
    center: [121.4478, 37.4638],
    shelters: [
      { id: "yt_001", name: "烟台站地下避难所", type: "shelter", position: [121.3978, 37.5438], address: "烟台市芝罘区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "烟台火车站地下", description: "烟台铁路枢纽民防" },
      { id: "yt_002", name: "烟台南站地下避难所", type: "shelter", position: [121.3878, 37.3738], address: "烟台市莱山区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "烟台南站地下", description: "烟台高铁枢纽民防" },
      { id: "yt_003", name: "万达广场地下人防", type: "underground_mall", position: [121.4378, 37.4938], address: "烟台市芝罘区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "万达广场地下", description: "商业中心人防" },
      { id: "yt_004", name: "蓬莱阁地下避难所", type: "bunker", position: [120.7578, 37.8238], address: "烟台市蓬莱区", capacity: "2000人", level: "核6级", facilities: "古迹配套深层防护", access: "蓬莱阁地下", description: "仙境海岸人防工程" }
    ],
    targets: [
      { name: "烟台港", type: "port", position: [121.4078, 37.5538], risk: "高" },
      { name: "烟台电厂", type: "factory", position: [121.4578, 37.5138], risk: "高" },
      { name: "万华化学", type: "factory", position: [121.3578, 37.4138], risk: "高" },
      { name: "烟台火车站", type: "transport", position: [121.3978, 37.5438], risk: "中" }
    ]
  },

  weihai: {
    name: "威海",
    center: [122.1204, 37.5135],
    shelters: [
      { id: "wh_001", name: "威海站地下避难所", type: "shelter", position: [122.1204, 37.5135], address: "威海市环翠区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "威海火车站地下", description: "威海铁路枢纽民防" },
      { id: "wh_002", name: "威海北站地下避难所", type: "shelter", position: [122.0604, 37.5035], address: "威海市环翠区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "威海北站地下", description: "威海高铁枢纽民防" },
      { id: "wh_003", name: "威高广场地下人防", type: "underground_mall", position: [122.1304, 37.5235], address: "威海市环翠区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "威高广场地下", description: "商业中心人防" },
      { id: "wh_004", name: "刘公岛地下避难所", type: "bunker", position: [122.1904, 37.4935], address: "威海市环翠区", capacity: "2000人", level: "核6级", facilities: "海岛配套深层防护", access: "刘公岛地下", description: "海岛历史遗迹人防" }
    ],
    targets: [
      { name: "威海港", type: "port", position: [122.1604, 37.5335], risk: "中" },
      { name: "华能威海电厂", type: "factory", position: [122.0804, 37.5535], risk: "高" },
      { name: "威海火车站", type: "transport", position: [122.1204, 37.5135], risk: "中" }
    ]
  },

  weifang: {
    name: "潍坊",
    center: [119.1619, 36.7069],
    shelters: [
      { id: "wf_001", name: "潍坊站地下避难所", type: "shelter", position: [119.1619, 36.7069], address: "潍坊市潍城区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "潍坊火车站地下", description: "潍坊铁路枢纽民防" },
      { id: "wf_002", name: "潍坊北站地下避难所", type: "shelter", position: [119.2019, 36.7469], address: "潍坊市寒亭区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "潍坊北站地下", description: "潍坊高铁枢纽民防" },
      { id: "wf_003", name: "泰华城地下人防", type: "underground_mall", position: [119.1719, 36.7169], address: "潍坊市奎文区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "泰华城地下", description: "商业中心人防" },
      { id: "wf_004", name: "风筝博物馆地下避难所", type: "shelter", position: [119.1519, 36.6969], address: "潍坊市潍城区", capacity: "2000人", level: "核6级", facilities: "文化设施配套防护", access: "风筝博物馆地下", description: "文化设施人防" }
    ],
    targets: [
      { name: "潍坊电厂", type: "factory", position: [119.1919, 36.7369], risk: "高" },
      { name: "潍坊火车站", type: "transport", position: [119.1619, 36.7069], risk: "中" },
      { name: "晨鸣纸业", type: "factory", position: [119.2219, 36.6869], risk: "中" },
      { name: "潍柴动力", type: "factory", position: [119.2419, 36.7469], risk: "高" }
    ]
  },

  zibo: {
    name: "淄博",
    center: [118.0550, 36.8130],
    shelters: [
      { id: "zb_001", name: "淄博站地下避难所", type: "shelter", position: [118.0550, 36.8130], address: "淄博市张店区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "淄博火车站地下", description: "淄博铁路枢纽民防" },
      { id: "zb_002", name: "淄博北站地下避难所", type: "shelter", position: [118.1150, 36.8730], address: "淄博市张店区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "淄博北站地下", description: "淄博高铁枢纽民防" },
      { id: "zb_003", name: "万象汇地下人防", type: "underground_mall", position: [118.0650, 36.8230], address: "淄博市张店区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "万象汇地下", description: "商业中心人防" },
      { id: "zb_004", name: "齐鲁石化地下避难所", type: "bunker", position: [118.1550, 36.7530], address: "淄博市临淄区", capacity: "4000人", level: "核5级", facilities: "石化企业深层防护", access: "齐鲁石化地下", description: "重要石化企业人防" }
    ],
    targets: [
      { name: "齐鲁石化", type: "factory", position: [118.1550, 36.7530], risk: "高" },
      { name: "淄博火车站", type: "transport", position: [118.0550, 36.8130], risk: "中" },
      { name: "山东铝业", type: "factory", position: [118.1250, 36.7830], risk: "高" },
      { name: "华能辛店电厂", type: "factory", position: [118.0850, 36.8430], risk: "高" }
    ]
  },

  jining: {
    name: "济宁",
    center: [116.4072, 35.4151],
    shelters: [
      { id: "jn_001", name: "济宁站地下避难所", type: "shelter", position: [116.4072, 35.4151], address: "济宁市任城区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "济宁火车站地下", description: "济宁铁路枢纽民防" },
      { id: "jn_002", name: "济宁北站地下避难所", type: "shelter", position: [116.4472, 35.4551], address: "济宁市任城区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "济宁北站地下", description: "济宁高铁枢纽民防" },
      { id: "jn_003", name: "运河城地下人防", type: "underground_mall", position: [116.4172, 35.4251], address: "济宁市任城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "运河城地下", description: "商业中心人防" },
      { id: "jn_004", name: "曲阜三孔地下避难所", type: "bunker", position: [116.9872, 35.5951], address: "济宁市曲阜市", capacity: "3000人", level: "核5级", facilities: "世界遗产深层防护", access: "孔庙地下", description: "世界文化遗产人防" }
    ],
    targets: [
      { name: "济宁电厂", type: "factory", position: [116.4372, 35.4351], risk: "高" },
      { name: "济宁火车站", type: "transport", position: [116.4072, 35.4151], risk: "中" },
      { name: "兖矿集团", type: "factory", position: [116.7972, 35.5551], risk: "高" },
      { name: "太阳纸业", type: "factory", position: [116.3572, 35.3751], risk: "中" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART7;
}
