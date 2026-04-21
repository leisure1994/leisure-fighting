// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次6-最终）
// 华南地区（广东、广西、海南）+ 西南地区（四川、贵州、云南、西藏）
// ============================================

// 华南地区 - 广东省（除广州、深圳外）
const southGuangdong = {
  // 韶关
  shaoguan: {
    name: "韶关",
    center: [113.5970, 24.8100],
    shelters: [
      { id: "sg_001", name: "韶关站地下避难所", type: "shelter", position: [113.5970, 24.8100], address: "韶关市浈江区北江北路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "韶关站地下通道", description: "韶关铁路枢纽地下民防工程" },
      { id: "sg_002", name: "韶关东站地下避难所", type: "shelter", position: [113.5567, 24.8234], address: "韶关市浈江区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "韶关东站地下", description: "铁路枢纽人防工程" },
      { id: "sg_003", name: "韶关市人防地下商城", type: "underground_mall", position: [113.5923, 24.8078], address: "韶关市浈江区解放路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "韶关火车站", type: "transport", position: [113.5970, 24.8100], risk: "中" }]
  },

  // 湛江
  zhanjiang: {
    name: "湛江",
    center: [110.3650, 21.2710],
    shelters: [
      { id: "zj_001", name: "湛江西站地下避难所", type: "shelter", position: [110.2567, 21.1567], address: "湛江市麻章区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "湛江西站地下", description: "湛江高铁枢纽人防工程" },
      { id: "zj_002", name: "湛江站地下避难所", type: "shelter", position: [110.3567, 21.2734], address: "湛江市霞山区解放西路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护设施", access: "湛江站地下", description: "湛江铁路枢纽人防工程" },
      { id: "zj_003", name: "湛江市人防地下商城", type: "underground_mall", position: [110.3601, 21.2689], address: "湛江市霞山区人民大道", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民大道地下入口", description: "市中心商业区人防工程" },
      { id: "zj_004", name: "湛江港地下指挥中心", type: "shelter", position: [110.4234, 21.2567], address: "湛江市霞山区", capacity: "3500人", level: "核5级", facilities: "港口应急系统", access: "湛江港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "湛江港", type: "port", position: [110.4234, 21.2567], risk: "中" }]
  },

  // 茂名
  maoming: {
    name: "茂名",
    center: [110.9190, 21.6620],
    shelters: [
      { id: "mm_001", name: "茂名站地下避难所", type: "shelter", position: [110.9190, 21.6620], address: "茂名市茂南区站北一路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "茂名站地下通道", description: "茂名铁路枢纽地下民防工程" },
      { id: "mm_002", name: "茂名市人防地下商城", type: "underground_mall", position: [110.9145, 21.6598], address: "茂名市茂南区油城四路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "油城四路地下入口", description: "市中心商业区人防工程" },
      { id: "mm_003", name: "茂名石化地下指挥中心", type: "shelter", position: [110.9789, 21.7234], address: "茂名市茂南区", capacity: "4500人", level: "核5级", facilities: "石化应急系统", access: "茂名石化地下", description: "重要工业企业防护工程" }
    ],
    targets: [{ name: "茂名石化", type: "factory", position: [110.9789, 21.7234], risk: "高" }]
  },

  // 肇庆
  zhaoqing: {
    name: "肇庆",
    center: [112.4650, 23.0480],
    shelters: [
      { id: "zq_001", name: "肇庆站地下避难所", type: "shelter", position: [112.4650, 23.0480], address: "肇庆市端州区西江北路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "肇庆站地下通道", description: "肇庆铁路枢纽地下民防工程" },
      { id: "zq_002", name: "肇庆东站地下避难所", type: "shelter", position: [112.6567, 23.1567], address: "肇庆市鼎湖区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "肇庆东站地下", description: "高铁枢纽人防工程" },
      { id: "zq_003", name: "肇庆市人防地下商城", type: "underground_mall", position: [112.4601, 23.0456], address: "肇庆市端州区天宁北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "天宁北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "肇庆火车站", type: "transport", position: [112.4650, 23.0480], risk: "中" }]
  },

  // 惠州
  huizhou: {
    name: "惠州",
    center: [114.4160, 23.1120],
    shelters: [
      { id: "hz3_001", name: "惠州站地下避难所", type: "shelter", position: [114.4160, 23.1120], address: "惠州市惠城区惠州大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "惠州站地下通道", description: "惠州铁路枢纽地下民防工程" },
      { id: "hz3_002", name: "惠州南站地下避难所", type: "shelter", position: [114.4234, 22.8234], address: "惠州市惠阳区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "惠州南站地下", description: "高铁枢纽人防工程" },
      { id: "hz3_003", name: "惠州市人防地下商城", type: "underground_mall", position: [114.4112, 23.1098], address: "惠州市惠城区下埔路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "下埔路地下入口", description: "市中心商业区人防工程" },
      { id: "hz3_004", name: "惠州港地下指挥中心", type: "shelter", position: [114.5567, 22.9789], address: "惠州市大亚湾区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "惠州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "惠州港", type: "port", position: [114.5567, 22.9789], risk: "中" }]
  },

  // 梅州
  meizhou: {
    name: "梅州",
    center: [116.1230, 24.2880],
    shelters: [
      { id: "mz_001", name: "梅州站地下避难所", type: "shelter", position: [116.1230, 24.2880], address: "梅州市梅江区彬芳大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "梅州站地下通道", description: "梅州铁路枢纽地下民防工程" },
      { id: "mz_002", name: "梅州西站地下避难所", type: "shelter", position: [116.0567, 24.3567], address: "梅州市梅县区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "梅州西站地下", description: "高铁枢纽人防工程" },
      { id: "mz_003", name: "梅州市人防地下商城", type: "underground_mall", position: [116.1189, 24.2856], address: "梅州市梅江区江南路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "江南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "梅州火车站", type: "transport", position: [116.1230, 24.2880], risk: "中" }]
  },

  // 汕尾
  shanwei: {
    name: "汕尾",
    center: [115.3750, 22.7860],
    shelters: [
      { id: "sw_001", name: "汕尾站地下避难所", type: "shelter", position: [115.3750, 22.7860], address: "汕尾市城区站前横路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "汕尾站地下通道", description: "汕尾铁路枢纽地下民防工程" },
      { id: "sw_002", name: "汕尾市人防地下商城", type: "underground_mall", position: [115.3701, 22.7834], address: "汕尾市城区汕尾大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "汕尾大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "汕尾火车站", type: "transport", position: [115.3750, 22.7860], risk: "低" }]
  },

  // 河源
  heyuan: {
    name: "河源",
    center: [114.6980, 23.7430],
    shelters: [
      { id: "hy2_001", name: "河源站地下避难所", type: "shelter", position: [114.6980, 23.7430], address: "河源市源城区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "河源站地下通道", description: "河源铁路枢纽地下民防工程" },
      { id: "hy2_002", name: "河源东站地下避难所", type: "shelter", position: [114.7567, 23.8234], address: "河源市江东新区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "河源东站地下", description: "高铁枢纽人防工程" },
      { id: "hy2_003", name: "河源市人防地下商城", type: "underground_mall", position: [114.6934, 23.7406], address: "河源市源城区长塘路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "长塘路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "河源火车站", type: "transport", position: [114.6980, 23.7430], risk: "中" }]
  },

  // 阳江
  yangjiang: {
    name: "阳江",
    center: [111.9820, 21.8590],
    shelters: [
      { id: "yj_001", name: "阳江站地下避难所", type: "shelter", position: [111.9820, 21.8590], address: "阳江市江城区城南西路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "阳江站地下通道", description: "阳江铁路枢纽地下民防工程" },
      { id: "yj_002", name: "阳江市人防地下商城", type: "underground_mall", position: [111.9778, 21.8567], address: "阳江市江城区东风一路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "东风一路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "阳江火车站", type: "transport", position: [111.9820, 21.8590], risk: "中" }]
  },

  // 清远
  qingyuan: {
    name: "清远",
    center: [113.0560, 23.6820],
    shelters: [
      { id: "qy_001", name: "清远站地下避难所", type: "shelter", position: [113.0560, 23.6820], address: "清远市清城区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "清远站地下通道", description: "清远铁路枢纽地下民防工程" },
      { id: "qy_002", name: "清远市人防地下商城", type: "underground_mall", position: [113.0512, 23.6798], address: "清远市清城区先锋中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "先锋中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "清远火车站", type: "transport", position: [113.0560, 23.6820], risk: "中" }]
  },

  // 东莞
  dongguan: {
    name: "东莞",
    center: [113.7520, 23.0480],
    shelters: [
      { id: "dg_001", name: "东莞站地下避难所", type: "shelter", position: [113.7520, 23.0480], address: "东莞市石龙镇西湖社区", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "东莞站地下通道", description: "东莞铁路枢纽地下民防工程" },
      { id: "dg_002", name: "东莞南站地下避难所", type: "shelter", position: [114.0567, 22.7234], address: "东莞市塘厦镇", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "东莞南站地下", description: "高铁枢纽人防工程" },
      { id: "dg_003", name: "虎门站地下避难所", type: "shelter", position: [113.6567, 22.8567], address: "东莞市虎门镇", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "虎门站地下", description: "高铁枢纽人防工程" },
      { id: "dg_004", name: "东莞市人防地下商城", type: "underground_mall", position: [113.7478, 23.0456], address: "东莞市南城区鸿福路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "鸿福路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "东莞火车站", type: "transport", position: [113.7520, 23.0480], risk: "中" }]
  },

  // 中山
  zhongshan: {
    name: "中山",
    center: [113.3920, 22.5170],
    shelters: [
      { id: "zs2_001", name: "中山站地下避难所", type: "shelter", position: [113.3920, 22.5170], address: "中山市火炬开发区濠头", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "中山站地下通道", description: "中山铁路枢纽地下民防工程" },
      { id: "zs2_002", name: "中山北站地下避难所", type: "shelter", position: [113.3567, 22.5789], address: "中山市石岐区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "中山北站地下", description: "高铁枢纽人防工程" },
      { id: "zs2_003", name: "中山市人防地下商城", type: "underground_mall", position: [113.3878, 22.5145], address: "中山市石岐区孙文东路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "孙文东路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "中山火车站", type: "transport", position: [113.3920, 22.5170], risk: "中" }]
  },

  // 潮州
  chaozhou: {
    name: "潮州",
    center: [116.6400, 23.6590],
    shelters: [
      { id: "cz5_001", name: "潮汕站地下避难所", type: "shelter", position: [116.6234, 23.5567], address: "潮州市潮安区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "潮汕站地下", description: "潮汕高铁枢纽人防工程" },
      { id: "cz5_002", name: "潮州市人防地下商城", type: "underground_mall", position: [116.6356, 23.6567], address: "潮州市湘桥区潮枫路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "潮枫路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "潮汕站", type: "transport", position: [116.6234, 23.5567], risk: "中" }]
  },

  // 揭阳
  jieyang: {
    name: "揭阳",
    center: [116.3730, 23.5500],
    shelters: [
      { id: "jy_001", name: "揭阳站地下避难所", type: "shelter", position: [116.3730, 23.5500], address: "揭阳市榕城区黄岐山大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "揭阳站地下通道", description: "揭阳铁路枢纽地下民防工程" },
      { id: "jy_002", name: "揭阳北站地下避难所", type: "shelter", position: [116.4567, 23.6123], address: "揭阳市揭东区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "揭阳北站地下", description: "高铁枢纽人防工程" },
      { id: "jy_003", name: "揭阳市人防地下商城", type: "underground_mall", position: [116.3689, 23.5478], address: "揭阳市榕城区进贤门大道", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "进贤门大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "揭阳火车站", type: "transport", position: [116.3730, 23.5500], risk: "中" }]
  },

  // 云浮
  yunfu: {
    name: "云浮",
    center: [112.0440, 22.9290],
    shelters: [
      { id: "yf_001", name: "云浮站地下避难所", type: "shelter", position: [112.0440, 22.9290], address: "云浮市云城区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "云浮站地下通道", description: "云浮铁路枢纽地下民防工程" },
      { id: "yf_002", name: "云浮市人防地下商城", type: "underground_mall", position: [112.0398, 22.9267], address: "云浮市云城区兴云中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "兴云中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "云浮火车站", type: "transport", position: [112.0440, 22.9290], risk: "低" }]
  }
};

// 华南地区 - 广西
const southGuangxi = {
  // 柳州
  liuzhou: {
    name: "柳州",
    center: [109.4290, 24.3260],
    shelters: [
      { id: "lz_001", name: "柳州站地下避难所", type: "shelter", position: [109.4290, 24.3260], address: "柳州市柳南区南站路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "柳州站地下通道", description: "广西中北部铁路枢纽地下民防工程" },
      { id: "lz_002", name: "柳州北站地下避难所", type: "shelter", position: [109.4234, 24.4234], address: "柳州市柳北区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "柳州北站地下", description: "铁路枢纽人防工程" },
      { id: "lz_003", name: "柳州市人防地下商城", type: "underground_mall", position: [109.4245, 24.3234], address: "柳州市城中区五一路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "五一路地下入口", description: "市中心商业区人防工程" },
      { id: "lz_004", name: "柳州钢铁厂地下指挥所", type: "shelter", position: [109.4789, 24.3567], address: "柳州市柳北区", capacity: "4000人", level: "核5级", facilities: "企业应急系统", access: "柳钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "柳州钢铁", type: "factory", position: [109.4789, 24.3567], risk: "中" }, { name: "柳州火车站", type: "transport", position: [109.4290, 24.3260], risk: "中" }]
  },

  // 桂林
  guilin: {
    name: "桂林",
    center: [110.1790, 25.2340],
    shelters: [
      { id: "gl_001", name: "桂林站地下避难所", type: "shelter", position: [110.2790, 25.2689], address: "桂林市象山区上海路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "桂林站地下通道", description: "桂林铁路枢纽地下民防工程" },
      { id: "gl_002", name: "桂林北站地下避难所", type: "shelter", position: [110.3067, 25.3234], address: "桂林市叠彩区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "桂林北站地下", description: "高铁枢纽人防工程" },
      { id: "gl_003", name: "桂林市人防地下商城", type: "underground_mall", position: [110.2745, 25.2656], address: "桂林市秀峰区中山中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "中山中路地下入口", description: "市中心商业区人防工程" },
      { id: "gl_004", name: "两江国际机场地下避难所", type: "shelter", position: [110.0390, 25.2189], address: "桂林市临桂区", capacity: "2500人", level: "核5级", facilities: "机场应急系统", access: "桂林机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "桂林机场", type: "airport", position: [110.0390, 25.2189], risk: "中" }]
  },

  // 梧州
  wuzhou: {
    name: "梧州",
    center: [111.2790, 23.4770],
    shelters: [
      { id: "wz_001", name: "梧州南站地下避难所", type: "shelter", position: [111.3567, 23.4234], address: "梧州市龙圩区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "梧州南站地下", description: "梧州高铁枢纽人防工程" },
      { id: "wz_002", name: "梧州站地下避难所", type: "shelter", position: [111.2789, 23.4789], address: "梧州市长洲区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "梧州站地下", description: "梧州铁路枢纽人防工程" },
      { id: "wz_003", name: "梧州市人防地下商城", type: "underground_mall", position: [111.2745, 23.4745], address: "梧州市万秀区中山路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中山路地下入口", description: "市中心商业区人防工程" },
      { id: "wz_004", name: "梧州港地下指挥中心", type: "shelter", position: [111.3234, 23.5067], address: "梧州市长洲区", capacity: "2500人", level: "核5级", facilities: "港口应急系统", access: "梧州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "梧州港", type: "port", position: [111.3234, 23.5067], risk: "中" }]
  },

  // 北海
  beihai: {
    name: "北海",
    center: [109.1010, 21.4810],
    shelters: [
      { id: "bh_001", name: "北海站地下避难所", type: "shelter", position: [109.1010, 21.4810], address: "北海市海城区北京路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "北海站地下通道", description: "北海铁路枢纽地下民防工程" },
      { id: "bh_002", name: "北海市人防地下商城", type: "underground_mall", position: [109.0967, 21.4789], address: "北海市海城区北部湾中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "北部湾中路地下入口", description: "市中心商业区人防工程" },
      { id: "bh_003", name: "北海港地下指挥中心", type: "shelter", position: [109.1234, 21.4567], address: "北海市海城区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "北海港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "北海港", type: "port", position: [109.1234, 21.4567], risk: "中" }]
  },

  // 防城港
  fangchenggang: {
    name: "防城港",
    center: [108.3550, 21.6870],
    shelters: [
      { id: "fcg_001", name: "防城港北站地下避难所", type: "shelter", position: [108.3567, 21.7234], address: "防城港市港口区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "防城港北站地下", description: "高铁枢纽人防工程" },
      { id: "fcg_002", name: "防城港市人防地下商城", type: "underground_mall", position: [108.3501, 21.6845], address: "防城港市港口区兴港大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "兴港大道地下入口", description: "市中心商业区人防工程" },
      { id: "fcg_003", name: "防城港码头地下指挥中心", type: "shelter", position: [108.4234, 21.6567], address: "防城港市港口区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "防城港码头地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "防城港码头", type: "port", position: [108.4234, 21.6567], risk: "中" }]
  },

  // 钦州
  qinzhou: {
    name: "钦州",
    center: [108.6550, 21.9790],
    shelters: [
      { id: "qz2_001", name: "钦州东站地下避难所", type: "shelter", position: [108.7567, 22.0234], address: "钦州市钦南区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "钦州东站地下", description: "高铁枢纽人防工程" },
      { id: "qz2_002", name: "钦州市人防地下商城", type: "underground_mall", position: [108.6501, 21.9767], address: "钦州市钦南区人民路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "人民路地下入口", description: "市中心商业区人防工程" },
      { id: "qz2_003", name: "钦州港地下指挥中心", type: "shelter", position: [108.6234, 21.8567], address: "钦州市钦南区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "钦州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "钦州港", type: "port", position: [108.6234, 21.8567], risk: "中" }]
  },

  // 贵港
  guigang: {
    name: "贵港",
    center: [109.5990, 23.1110],
    shelters: [
      { id: "gg_001", name: "贵港站地下避难所", type: "shelter", position: [109.5990, 23.1110], address: "贵港市港北区江北大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "贵港站地下通道", description: "贵港铁路枢纽地下民防工程" },
      { id: "gg_002", name: "贵港市人防地下商城", type: "underground_mall", position: [109.5945, 23.1089], address: "贵港市港北区解放路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "贵港火车站", type: "transport", position: [109.5990, 23.1110], risk: "中" }]
  },

  // 玉林
  yulin2: {
    name: "玉林",
    center: [110.1540, 22.6310],
    shelters: [
      { id: "yl2_001", name: "玉林站地下避难所", type: "shelter", position: [110.1540, 22.6310], address: "玉林市玉州区站前路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "玉林站地下通道", description: "玉林铁路枢纽地下民防工程" },
      { id: "yl2_002", name: "玉林市人防地下商城", type: "underground_mall", position: [110.1498, 22.6289], address: "玉林市玉州区人民中路", capacity: "2000人", level: "核6级", facilities: "应急物资储备", access: "人民中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "玉林火车站", type: "transport", position: [110.1540, 22.6310], risk: "中" }]
  },

  // 百色
  baise: {
    name: "百色",
    center: [106.6170, 23.8970],
    shelters: [
      { id: "bs2_001", name: "百色站地下避难所", type: "shelter", position: [106.6170, 23.8970], address: "百色市右江区站前大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "百色站地下通道", description: "百色铁路枢纽地下民防工程" },
      { id: "bs2_002", name: "百色市人防地下商城", type: "underground_mall", position: [106.6123, 23.8945], address: "百色市右江区中山一路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中山一路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "百色火车站", type: "transport", position: [106.6170, 23.8970], risk: "中" }]
  },

  // 贺州
  hezhou: {
    name: "贺州",
    center: [111.5660, 24.4140],
    shelters: [
      { id: "hz4_001", name: "贺州站地下避难所", type: "shelter", position: [111.5660, 24.4140], address: "贺州市平桂区站前大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "贺州站地下通道", description: "贺州铁路枢纽地下民防工程" },
      { id: "hz4_002", name: "贺州市人防地下商城", type: "underground_mall", position: [111.5612, 24.4112], address: "贺州市八步区建设中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "建设中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "贺州火车站", type: "transport", position: [111.5660, 24.4140], risk: "中" }]
  },

  // 河池
  hechi: {
    name: "河池",
    center: [108.0850, 24.6950],
    shelters: [
      { id: "hc_001", name: "河池西站地下避难所", type: "shelter", position: [107.9567, 24.7234], address: "河池市金城江区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "河池西站地下", description: "高铁枢纽人防工程" },
      { id: "hc_002", name: "河池市人防地下商城", type: "underground_mall", position: [108.0801, 24.6923], address: "河池市金城江区新建路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "新建路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "河池火车站", type: "transport", position: [108.0850, 24.6950], risk: "低" }]
  },

  // 来宾
  laibin: {
    name: "来宾",
    center: [109.2290, 23.7340],
    shelters: [
      { id: "lb_001", name: "来宾站地下避难所", type: "shelter", position: [109.2290, 23.7340], address: "来宾市兴宾区铁道北路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "来宾站地下通道", description: "来宾铁路枢纽地下民防工程" },
      { id: "lb_002", name: "来宾市人防地下商城", type: "underground_mall", position: [109.2245, 23.7312], address: "来宾市兴宾区中南路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "来宾火车站", type: "transport", position: [109.2290, 23.7340], risk: "低" }]
  },

  // 崇左
  chongzuo: {
    name: "崇左",
    center: [107.3540, 22.4160],
    shelters: [
      { id: "cz6_001", name: "崇左南站地下避难所", type: "shelter", position: [107.4234, 22.4567], address: "崇左市江州区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "崇左南站地下", description: "高铁枢纽人防工程" },
      { id: "cz6_002", name: "崇左市人防地下商城", type: "underground_mall", position: [107.3498, 22.4134], address: "崇左市江州区新民路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "新民路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "崇左南站", type: "transport", position: [107.4234, 22.4567], risk: "低" }]
  }
};

// 华南地区 - 海南省
const southHainan = {
  // 三亚
  sanya: {
    name: "三亚",
    center: [109.5120, 18.2520],
    shelters: [
      { id: "sy4_001", name: "三亚站地下避难所", type: "shelter", position: [109.5120, 18.2520], address: "三亚市吉阳区育秀路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "三亚站地下通道", description: "三亚铁路枢纽地下民防工程" },
      { id: "sy4_002", name: "三亚市人防地下商城", type: "underground_mall", position: [109.5078, 18.2498], address: "三亚市吉阳区解放路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" },
      { id: "sy4_003", name: "三亚凤凰机场地下避难所", type: "shelter", position: [109.4123, 18.3067], address: "三亚市天涯区", capacity: "2500人", level: "核5级", facilities: "机场应急系统", access: "凤凰机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "三亚凤凰机场", type: "airport", position: [109.4123, 18.3067], risk: "中" }]
  },

  // 三沙
  sansha: {
    name: "三沙",
    center: [112.3440, 16.8310],
    shelters: [
      { id: "ss_001", name: "三沙市人防地下指挥所", type: "shelter", position: [112.3440, 16.8310], address: "三沙市西沙区永兴岛", capacity: "1500人", level: "核5级", facilities: "海岛应急指挥系统", access: "永兴岛地下", description: "三沙市行政中心防护工程" }
    ],
    targets: [{ name: "三沙市政府", type: "landmark", position: [112.3440, 16.8310], risk: "高" }]
  },

  // 儋州
  danzhou: {
    name: "儋州",
    center: [109.5800, 19.5210],
    shelters: [
      { id: "dz2_001", name: "儋州站地下避难所", type: "shelter", position: [109.5234, 19.6234], address: "儋州市那大镇", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "儋州站地下", description: "儋州铁路枢纽人防工程" },
      { id: "dz2_002", name: "儋州市人防地下商城", type: "underground_mall", position: [109.5756, 19.5189], address: "儋州市那大镇中兴大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中兴大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "儋州火车站", type: "transport", position: [109.5234, 19.6234], risk: "中" }]
  },

  // 五指山
  wuzhishan: {
    name: "五指山",
    center: [109.5170, 18.7760],
    shelters: [
      { id: "wzs_001", name: "五指山市人防地下商城", type: "underground_mall", position: [109.5123, 18.7734], address: "五指山市通什镇解放路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "五指山市政府", type: "landmark", position: [109.5170, 18.7760], risk: "低" }]
  },

  // 琼海
  qionghai: {
    name: "琼海",
    center: [110.4660, 19.2460],
    shelters: [
      { id: "qh_001", name: "琼海站地下避难所", type: "shelter", position: [110.4660, 19.2460], address: "琼海市嘉积镇爱华东路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "琼海站地下通道", description: "琼海铁路枢纽地下民防工程" },
      { id: "qh_002", name: "琼海市人防地下商城", type: "underground_mall", position: [110.4612, 19.2434], address: "琼海市嘉积镇元亨街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "元亨街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "琼海火车站", type: "transport", position: [110.4660, 19.2460], risk: "低" }]
  },

  // 文昌
  wenchang: {
    name: "文昌",
    center: [110.7530, 19.6130],
    shelters: [
      { id: "wc_001", name: "文昌站地下避难所", type: "shelter", position: [110.7530, 19.6130], address: "文昌市文城镇文建路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "文昌站地下通道", description: "文昌铁路枢纽地下民防工程" },
      { id: "wc_002", name: "文昌市人防地下商城", type: "underground_mall", position: [110.7489, 19.6106], address: "文昌市文城镇文建路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "文建路地下入口", description: "市中心商业区人防工程" },
      { id: "wc_003", name: "文昌航天发射场地下指挥中心", type: "shelter", position: [110.9567, 19.6234], address: "文昌市龙楼镇", capacity: "3000人", level: "核5级", facilities: "航天基地防护系统", access: "发射场地下", description: "重要国防设施防护工程" }
    ],
    targets: [{ name: "文昌航天发射场", type: "landmark", position: [110.9567, 19.6234], risk: "高" }]
  },

  // 万宁
  wanning: {
    name: "万宁",
    center: [110.3880, 18.7960],
    shelters: [
      { id: "wn2_001", name: "万宁站地下避难所", type: "shelter", position: [110.3880, 18.7960], address: "万宁市万城镇环市一东路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "万宁站地下通道", description: "万宁铁路枢纽地下民防工程" },
      { id: "wn2_002", name: "万宁市人防地下商城", type: "underground_mall", position: [110.3834, 18.7934], address: "万宁市万城镇红专中路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "红专中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "万宁火车站", type: "transport", position: [110.3880, 18.7960], risk: "低" }]
  },

  // 东方
  dongfang: {
    name: "东方",
    center: [108.6530, 19.1010],
    shelters: [
      { id: "df_001", name: "东方站地下避难所", type: "shelter", position: [108.6530, 19.1010], address: "东方市八所镇东海路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "东方站地下通道", description: "东方铁路枢纽地下民防工程" },
      { id: "df_002", name: "东方市人防地下商城", type: "underground_mall", position: [108.6489, 19.0989], address: "东方市八所镇解放西路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "解放西路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "东方火车站", type: "transport", position: [108.6530, 19.1010], risk: "低" }]
  },

  // 定安
  dingan: {
    name: "定安",
    center: [110.3490, 19.6840],
    shelters: [
      { id: "da2_001", name: "定安站地下避难所", type: "shelter", position: [110.3490, 19.6840], address: "定安县定城镇见龙大道", capacity: "1000人", level: "核6级", facilities: "通风系统、应急供水", access: "定安站地下通道", description: "定安铁路枢纽地下民防工程" }
    ],
    targets: [{ name: "定安火车站", type: "transport", position: [110.3490, 19.6840], risk: "低" }]
  },

  // 屯昌
  tunchang: {
    name: "屯昌",
    center: [110.1020, 19.3520],
    shelters: [
      { id: "tc_001", name: "屯昌县人防地下商城", type: "underground_mall", position: [110.0978, 19.3498], address: "屯昌县屯城镇昌盛路", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "昌盛路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "屯昌县政府", type: "landmark", position: [110.1020, 19.3520], risk: "低" }]
  },

  // 澄迈
  chengmai: {
    name: "澄迈",
    center: [110.0070, 19.7370],
    shelters: [
      { id: "cm_001", name: "澄迈县人防地下商城", type: "underground_mall", position: [110.0023, 19.7345], address: "澄迈县金江镇文化北路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "文化北路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "澄迈县政府", type: "landmark", position: [110.0070, 19.7370], risk: "低" }]
  },

  // 临高
  lingao: {
    name: "临高",
    center: [109.6870, 19.9080],
    shelters: [
      { id: "lg2_001", name: "临高县人防地下商城", type: "underground_mall", position: [109.6823, 19.9056], address: "临高县临城镇解放路", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "解放路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "临高县政府", type: "landmark", position: [109.6870, 19.9080], risk: "低" }]
  },

  // 白沙
  baisha: {
    name: "白沙",
    center: [109.4500, 19.2240],
    shelters: [
      { id: "bs3_001", name: "白沙县人防地下商城", type: "underground_mall", position: [109.4456, 19.2212], address: "白沙县牙叉镇牙叉中路", capacity: "600人", level: "核6级", facilities: "应急物资储备", access: "牙叉中路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "白沙县政府", type: "landmark", position: [109.4500, 19.2240], risk: "低" }]
  },

  // 昌江
  changjiang: {
    name: "昌江",
    center: [109.0530, 19.2600],
    shelters: [
      { id: "cj_001", name: "昌江县人防地下商城", type: "underground_mall", position: [109.0489, 19.2578], address: "昌江县石碌镇人民北路", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "人民北路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "昌江县政府", type: "landmark", position: [109.0530, 19.2600], risk: "低" }]
  },

  // 乐东
  ledong: {
    name: "乐东",
    center: [109.1750, 18.7470],
    shelters: [
      { id: "ld2_001", name: "乐东站地下避难所", type: "shelter", position: [109.1750, 18.7470], address: "乐东黎族自治县抱由镇", capacity: "1000人", level: "核6级", facilities: "通风系统、应急供水", access: "乐东站地下通道", description: "乐东铁路枢纽地下民防工程" }
    ],
    targets: [{ name: "乐东火车站", type: "transport", position: [109.1750, 18.7470], risk: "低" }]
  },

  // 陵水
  lingshui: {
    name: "陵水",
    center: [110.0370, 18.5050],
    shelters: [
      { id: "ls2_001", name: "陵水站地下避难所", type: "shelter", position: [110.0370, 18.5050], address: "陵水黎族自治县椰林镇", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "陵水站地下通道", description: "陵水铁路枢纽地下民防工程" },
      { id: "ls2_002", name: "陵水县人防地下商城", type: "underground_mall", position: [110.0323, 18.5023], address: "陵水黎族自治县椰林镇新建路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "新建路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "陵水火车站", type: "transport", position: [110.0370, 18.5050], risk: "低" }]
  },

  // 保亭
  baoting: {
    name: "保亭",
    center: [109.7020, 18.6360],
    shelters: [
      { id: "bt_001", name: "保亭县人防地下商城", type: "underground_mall", position: [109.6978, 18.6334], address: "保亭黎族苗族自治县保城镇新兴路", capacity: "600人", level: "核6级", facilities: "应急物资储备", access: "新兴路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "保亭县政府", type: "landmark", position: [109.7020, 18.6360], risk: "低" }]
  },

  // 琼中
  qiongzhong: {
    name: "琼中",
    center: [109.8390, 19.0350],
    shelters: [
      { id: "qz3_001", name: "琼中县人防地下商城", type: "underground_mall", position: [109.8345, 19.0323], address: "琼中黎族苗族自治县营根镇海榆路", capacity: "600人", level: "核6级", facilities: "应急物资储备", access: "海榆路地下入口", description: "县城中心区人防工程" }
    ],
    targets: [{ name: "琼中县政府", type: "landmark", position: [109.8390, 19.0350], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...southGuangdong,
  ...southGuangxi,
  ...southHainan
};
