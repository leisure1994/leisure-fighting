// ============================================
// 核战争城市自救地球仪 - 剩余75城市补充数据
// 生成时间: 2026-04-17
// 城市数量: 75
// ============================================

const REMAINING_CITIES_DATA = {

  // ===== 广东省 =====
  shantou: {
    name: "汕头",
    center: [116.7285, 23.3839],
    shelters: [
      { id: "st_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 23.3539, lng: 116.6985, capacity: 6000, facilities: "三防系统、应急供电、通风过滤", access: "人民广场地铁站B出口" },
      { id: "st_002", name: "金砂东路地铁站避难所", type: "metro", level: "核6级", lat: 23.3739, lng: 116.7185, capacity: 4500, facilities: "密闭门、滤毒设备、应急照明", access: "地铁1号线金砂东路站" },
      { id: "st_003", name: "汕头站地下避难所", type: "transport", level: "核6级", lat: 23.3139, lng: 116.7585, capacity: 8000, facilities: "大型通风系统、医疗站、储水设施", access: "汕头火车站地下通道" },
      { id: "st_004", name: "海滨路地下人防商城", type: "mall", level: "核6级", lat: 23.3639, lng: 116.7385, capacity: 5000, facilities: "通风过滤、应急供电、物资储备", access: "海滨路地下商业街入口" }
    ],
    targets: [
      { id: "st_nt001", name: "汕头港", type: "port", risk: "高", lat: 23.3539, lng: 116.7685 },
      { id: "st_nt002", name: "华能汕头电厂", type: "power", risk: "高", lat: 23.4039, lng: 116.7885 },
      { id: "st_nt003", name: "揭阳潮汕机场", type: "airport", risk: "中", lat: 23.5439, lng: 116.5085 },
      { id: "st_nt004", name: "粤东液化天然气接收站", type: "chemical", risk: "高", lat: 23.3039, lng: 116.7985 }
    ]
  },

  zhanjiang: {
    name: "湛江",
    center: [110.3594, 21.2708],
    shelters: [
      { id: "zj_001", name: "霞山广场地下人防工程", type: "civil", level: "核6级", lat: 21.2508, lng: 110.3394, capacity: 5500, facilities: "三防系统、应急供电、医疗站", access: "霞山广场地下入口" },
      { id: "zj_002", name: "湛江西站地下避难所", type: "transport", level: "核6级", lat: 21.2908, lng: 110.3794, capacity: 7000, facilities: "大型通风、储水设施、发电设备", access: "湛江西站地下通道" },
      { id: "zj_003", name: "国贸大厦地下避难所", type: "mall", level: "核6级", lat: 21.2608, lng: 110.3494, capacity: 4000, facilities: "密闭门、滤毒通风、应急照明", access: "国贸大厦地下停车场" },
      { id: "zj_004", name: "观海路地下人防工程", type: "civil", level: "核6级", lat: 21.2408, lng: 110.3694, capacity: 5000, facilities: "三防门、应急供电、通讯设备", access: "观海路地下通道入口" }
    ],
    targets: [
      { id: "zj_nt001", name: "湛江港", type: "port", risk: "高", lat: 21.2208, lng: 110.3994 },
      { id: "zj_nt002", name: "湛江发电厂", type: "power", risk: "高", lat: 21.3008, lng: 110.3594 },
      { id: "zj_nt003", name: "湛江吴川机场", type: "airport", risk: "中", lat: 21.5008, lng: 110.3594 },
      { id: "zj_nt004", name: "中科炼化", type: "chemical", risk: "高", lat: 21.1808, lng: 110.4194 }
    ]
  },

  jiangmen: {
    name: "江门",
    center: [113.0811, 22.5789],
    shelters: [
      { id: "jm_001", name: "东湖广场地下人防工程", type: "civil", level: "核6级", lat: 22.5889, lng: 113.0711, capacity: 5000, facilities: "三防系统、应急供电、通风过滤", access: "东湖公园地下入口" },
      { id: "jm_002", name: "江门站地下避难所", type: "transport", level: "核6级", lat: 22.5489, lng: 113.1211, capacity: 6500, facilities: "大型通风系统、医疗站", access: "江门站地下广场" },
      { id: "jm_003", name: "五邑华侨广场地下避难所", type: "mall", level: "核6级", lat: 22.5989, lng: 113.0611, capacity: 4500, facilities: "密闭门、滤毒设备、应急照明", access: "华侨广场地下商业街" }
    ],
    targets: [
      { id: "jm_nt001", name: "江门港", type: "port", risk: "中", lat: 22.5689, lng: 113.1011 },
      { id: "jm_nt002", name: "江门发电厂", type: "power", risk: "高", lat: 22.5889, lng: 113.0411 },
      { id: "jm_nt003", name: "广东国华粤电台山电厂", type: "power", risk: "高", lat: 21.8689, lng: 112.8011 },
      { id: "jm_nt004", name: "江门自来水厂", type: "water", risk: "中", lat: 22.5789, lng: 113.0911 }
    ]
  },

  maoming: {
    name: "茂名",
    center: [110.9252, 21.6662],
    shelters: [
      { id: "mm_001", name: "文化广场地下人防工程", type: "civil", level: "核6级", lat: 21.6762, lng: 110.9052, capacity: 4500, facilities: "三防系统、应急供电、医疗站", access: "文化广场地下入口" },
      { id: "mm_002", name: "茂名站地下避难所", type: "transport", level: "核6级", lat: 21.6562, lng: 110.9452, capacity: 6000, facilities: "大型通风、储水设施", access: "茂名站地下广场" },
      { id: "mm_003", name: "油城路地下人防商城", type: "mall", level: "核6级", lat: 21.6862, lng: 110.9152, capacity: 3500, facilities: "密闭门、滤毒通风、应急照明", access: "油城路地下商业街" }
    ],
    targets: [
      { id: "mm_nt001", name: "茂名港", type: "port", risk: "中", lat: 21.6062, lng: 110.9852 },
      { id: "mm_nt002", name: "茂名石化", type: "chemical", risk: "高", lat: 21.6362, lng: 110.9352 },
      { id: "mm_nt003", name: "大唐茂名发电厂", type: "power", risk: "高", lat: 21.7162, lng: 110.8852 },
      { id: "mm_nt004", name: "茂名炼油厂", type: "chemical", risk: "高", lat: 21.6262, lng: 110.9552 }
    ]
  },

  shaoguan: {
    name: "韶关",
    center: [113.5971, 24.8108],
    shelters: [
      { id: "sg_001", name: "中山公园地下人防工程", type: "civil", level: "核6级", lat: 24.8208, lng: 113.5771, capacity: 4000, facilities: "三防系统、应急供电、通风过滤", access: "中山公园地下入口" },
      { id: "sg_002", name: "韶关站地下避难所", type: "transport", level: "核6级", lat: 24.7908, lng: 113.6371, capacity: 5500, facilities: "大型通风系统、医疗站", access: "韶关站地下广场" },
      { id: "sg_003", name: "风度路地下人防商城", type: "mall", level: "核6级", lat: 24.8308, lng: 113.5871, capacity: 3500, facilities: "密闭门、滤毒设备、应急照明", access: "风度路地下商业街" }
    ],
    targets: [
      { id: "sg_nt001", name: "韶关发电厂", type: "power", risk: "高", lat: 24.7708, lng: 113.6171 },
      { id: "sg_nt002", name: "韶关冶炼厂", type: "factory", risk: "中", lat: 24.7508, lng: 113.6571 },
      { id: "sg_nt003", name: "大宝山铁矿", type: "mine", risk: "低", lat: 24.6808, lng: 113.6971 },
      { id: "sg_nt004", name: "韶关港", type: "port", risk: "中", lat: 24.8508, lng: 113.5671 }
    ]
  },

  yangjiang: {
    name: "阳江",
    center: [111.9826, 21.8583],
    shelters: [
      { id: "yj_001", name: "鸳鸯湖公园地下人防工程", type: "civil", level: "核6级", lat: 21.8783, lng: 111.9626, capacity: 4000, facilities: "三防系统、应急供电、医疗站", access: "鸳鸯湖公园地下入口" },
      { id: "yj_002", name: "阳江站地下避难所", type: "transport", level: "核6级", lat: 21.8183, lng: 112.0226, capacity: 5500, facilities: "大型通风、储水设施", access: "阳江站地下广场" },
      { id: "yj_003", name: "东风路地下人防工程", type: "civil", level: "核6级", lat: 21.8483, lng: 111.9726, capacity: 3000, facilities: "密闭门、滤毒通风", access: "东风路地下通道" }
    ],
    targets: [
      { id: "yj_nt001", name: "阳江港", type: "port", risk: "中", lat: 21.7883, lng: 112.0426 },
      { id: "yj_nt002", name: "阳江核电站", type: "power", risk: "高", lat: 21.7183, lng: 112.0826 },
      { id: "yj_nt003", name: "阳江发电厂", type: "power", risk: "高", lat: 21.8683, lng: 111.9526 },
      { id: "yj_nt004", name: "阳江自来水厂", type: "water", risk: "中", lat: 21.8883, lng: 111.9426 }
    ]
  },

  qingyuan: {
    name: "清远",
    center: [113.0560, 23.6820],
    shelters: [
      { id: "qy_001", name: "城市广场地下人防工程", type: "civil", level: "核6级", lat: 23.6920, lng: 113.0360, capacity: 4000, facilities: "三防系统、应急供电", access: "城市广场地下入口" },
      { id: "qy_002", name: "清远站地下避难所", type: "transport", level: "核6级", lat: 23.6620, lng: 113.1160, capacity: 5500, facilities: "大型通风、储水设施", access: "清远站地下广场" },
      { id: "qy_003", name: "先锋路地下人防商城", type: "mall", level: "核6级", lat: 23.6720, lng: 113.0660, capacity: 3000, facilities: "密闭门、滤毒通风", access: "先锋路地下商业街" }
    ],
    targets: [
      { id: "qy_nt001", name: "清远港", type: "port", risk: "中", lat: 23.6420, lng: 113.1360 },
      { id: "qy_nt002", name: "清远发电厂", type: "power", risk: "高", lat: 23.7020, lng: 112.9860 },
      { id: "qy_nt003", name: "清远自来水厂", type: "water", risk: "中", lat: 23.6820, lng: 113.0460 },
      { id: "qy_nt004", name: "清连高速大桥", type: "bridge", risk: "低", lat: 23.7220, lng: 113.0060 }
    ]
  },

  heyuan: {
    name: "河源",
    center: [114.6978, 23.7435],
    shelters: [
      { id: "hy_001", name: "文化广场地下人防工程", type: "civil", level: "核6级", lat: 23.7535, lng: 114.6778, capacity: 3500, facilities: "三防系统、应急供电", access: "文化广场地下入口" },
      { id: "hy_002", name: "河源站地下避难所", type: "transport", level: "核6级", lat: 23.7335, lng: 114.7378, capacity: 5000, facilities: "大型通风、储水设施", access: "河源站地下广场" },
      { id: "hy_003", name: "中山大道地下人防工程", type: "civil", level: "核6级", lat: 23.7435, lng: 114.6878, capacity: 3000, facilities: "密闭门、滤毒通风", access: "中山大道地下通道" }
    ],
    targets: [
      { id: "hy_nt001", name: "河源港", type: "port", risk: "中", lat: 23.7135, lng: 114.7578 },
      { id: "hy_nt002", name: "河源发电厂", type: "power", risk: "高", lat: 23.7735, lng: 114.6378 },
      { id: "hy_nt003", name: "新丰江水库", type: "water", risk: "中", lat: 23.9335, lng: 114.6578 },
      { id: "hy_nt004", name: "河源自来水厂", type: "water", risk: "中", lat: 23.7535, lng: 114.6978 }
    ]
  },

  yunfu: {
    name: "云浮",
    center: [112.0398, 22.9158],
    shelters: [
      { id: "yf_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 22.9258, lng: 112.0198, capacity: 3000, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "yf_002", name: "云浮东站地下避难所", type: "transport", level: "核6级", lat: 22.8758, lng: 112.0998, capacity: 4500, facilities: "大型通风、储水设施", access: "云浮东站地下广场" },
      { id: "yf_003", name: "兴云中路地下人防工程", type: "civil", level: "核6级", lat: 22.9058, lng: 112.0498, capacity: 2500, facilities: "密闭门、滤毒通风", access: "兴云中路地下通道" }
    ],
    targets: [
      { id: "yf_nt001", name: "云浮港", type: "port", risk: "中", lat: 22.8558, lng: 112.1098 },
      { id: "yf_nt002", name: "云浮发电厂", type: "power", risk: "中", lat: 22.9358, lng: 112.0098 },
      { id: "yf_nt003", name: "云浮自来水厂", type: "water", risk: "中", lat: 22.9158, lng: 112.0298 },
      { id: "yf_nt004", name: "云浮石材基地", type: "factory", risk: "低", lat: 22.8958, lng: 112.0698 }
    ]
  },

  meizhou: {
    name: "梅州",
    center: [116.1223, 24.2887],
    shelters: [
      { id: "mz_001", name: "文化公园地下人防工程", type: "civil", level: "核6级", lat: 24.2987, lng: 116.1023, capacity: 3500, facilities: "三防系统、应急供电", access: "文化公园地下入口" },
      { id: "mz_002", name: "梅州西站地下避难所", type: "transport", level: "核6级", lat: 24.2487, lng: 116.1823, capacity: 5000, facilities: "大型通风、储水设施", access: "梅州西站地下广场" },
      { id: "mz_003", name: "嘉应路地下人防工程", type: "civil", level: "核6级", lat: 24.2787, lng: 116.1323, capacity: 3000, facilities: "密闭门、滤毒通风", access: "嘉应路地下通道" }
    ],
    targets: [
      { id: "mz_nt001", name: "梅州机场", type: "airport", risk: "中", lat: 24.2687, lng: 116.0823 },
      { id: "mz_nt002", name: "梅州发电厂", type: "power", risk: "中", lat: 24.3087, lng: 116.1423 },
      { id: "mz_nt003", name: "梅州自来水厂", type: "water", risk: "中", lat: 24.2887, lng: 116.1123 },
      { id: "mz_nt004", name: "梅汕高速大桥", type: "bridge", risk: "低", lat: 24.3287, lng: 116.0723 }
    ]
  },

  huizhou: {
    name: "惠州",
    center: [114.4168, 23.1118],
    shelters: [
      { id: "hzhi_001", name: "西湖地下人防工程", type: "civil", level: "核6级", lat: 23.1018, lng: 114.3968, capacity: 5000, facilities: "三防系统、应急供电、医疗站", access: "西湖景区地下入口" },
      { id: "hzhi_002", name: "惠州站地下避难所", type: "transport", level: "核6级", lat: 23.1418, lng: 114.4768, capacity: 7000, facilities: "大型通风、储水设施", access: "惠州站地下广场" },
      { id: "hzhi_003", name: "麦地路地下人防商城", type: "mall", level: "核6级", lat: 23.1218, lng: 114.4368, capacity: 4000, facilities: "密闭门、滤毒通风", access: "麦地路地下商业街" }
    ],
    targets: [
      { id: "hzhi_nt001", name: "惠州港", type: "port", risk: "中", lat: 22.7118, lng: 114.6168 },
      { id: "hzhi_nt002", name: "大亚湾核电站", type: "power", risk: "高", lat: 22.6018, lng: 114.5568 },
      { id: "hzhi_nt003", name: "惠州发电厂", type: "power", risk: "高", lat: 23.0818, lng: 114.3668 },
      { id: "hzhi_nt004", name: "惠东液化天然气接收站", type: "chemical", risk: "高", lat: 22.8818, lng: 114.7968 }
    ]
  },

  zhaoqing: {
    name: "肇庆",
    center: [112.4650, 23.0472],
    shelters: [
      { id: "zq_001", name: "牌坊广场地下人防工程", type: "civil", level: "核6级", lat: 23.0372, lng: 112.4450, capacity: 4500, facilities: "三防系统、应急供电、医疗站", access: "牌坊广场地下入口" },
      { id: "zq_002", name: "肇庆站地下避难所", type: "transport", level: "核6级", lat: 23.0972, lng: 112.5050, capacity: 6000, facilities: "大型通风、储水设施", access: "肇庆站地下广场" },
      { id: "zq_003", name: "天宁路地下人防商城", type: "mall", level: "核6级", lat: 23.0572, lng: 112.4750, capacity: 3500, facilities: "密闭门、滤毒通风", access: "天宁路地下商业街" }
    ],
    targets: [
      { id: "zq_nt001", name: "肇庆港", type: "port", risk: "中", lat: 23.0272, lng: 112.5350 },
      { id: "zq_nt002", name: "肇庆发电厂", type: "power", risk: "高", lat: 23.0772, lng: 112.4150 },
      { id: "zq_nt003", name: "星湖水库", type: "water", risk: "中", lat: 23.0472, lng: 112.4650 },
      { id: "zq_nt004", name: "肇庆自来水厂", type: "water", risk: "中", lat: 23.0672, lng: 112.4850 }
    ]
  },

  // ===== 江苏省 =====
  suqian: {
    name: "宿迁",
    center: [118.2755, 33.9630],
    shelters: [
      { id: "sq_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 33.9730, lng: 118.2555, capacity: 4000, facilities: "三防系统、应急供电、医疗站", access: "人民广场地下入口" },
      { id: "sq_002", name: "宿迁站地下避难所", type: "transport", level: "核6级", lat: 33.9330, lng: 118.3355, capacity: 5500, facilities: "大型通风、储水设施", access: "宿迁站地下广场" },
      { id: "sq_003", name: "西湖路地下人防工程", type: "civil", level: "核6级", lat: 33.9530, lng: 118.2655, capacity: 3000, facilities: "密闭门、滤毒通风", access: "西湖路地下通道" }
    ],
    targets: [
      { id: "sq_nt001", name: "宿迁港", type: "port", risk: "中", lat: 33.9030, lng: 118.4055 },
      { id: "sq_nt002", name: "国电宿迁热电", type: "power", risk: "高", lat: 33.9830, lng: 118.2255 },
      { id: "sq_nt003", name: "宿迁自来水厂", type: "water", risk: "中", lat: 33.9730, lng: 118.2755 },
      { id: "sq_nt004", name: "宿迁运河大桥", type: "bridge", risk: "低", lat: 34.0030, lng: 118.2155 }
    ]
  },

  lianyungang: {
    name: "连云港",
    center: [119.2216, 34.5966],
    shelters: [
      { id: "lyg_001", name: "苍梧绿园地下人防工程", type: "civil", level: "核6级", lat: 34.6066, lng: 119.2016, capacity: 5000, facilities: "三防系统、应急供电、医疗站", access: "苍梧绿园地下入口" },
      { id: "lyg_002", name: "连云港站地下避难所", type: "transport", level: "核6级", lat: 34.5866, lng: 119.2616, capacity: 7000, facilities: "大型通风、储水设施", access: "连云港站地下广场" },
      { id: "lyg_003", name: "陇海步行街地下人防商城", type: "mall", level: "核6级", lat: 34.5766, lng: 119.2316, capacity: 4000, facilities: "密闭门、滤毒通风、应急照明", access: "陇海步行街地下商业街" }
    ],
    targets: [
      { id: "lyg_nt001", name: "连云港港", type: "port", risk: "高", lat: 34.7266, lng: 119.4216 },
      { id: "lyg_nt002", name: "田湾核电站", type: "power", risk: "高", lat: 34.6766, lng: 119.4716 },
      { id: "lyg_nt003", name: "连云港机场", type: "airport", risk: "中", lat: 34.4066, lng: 118.8816 },
      { id: "lyg_nt004", name: "连云港发电厂", type: "power", risk: "高", lat: 34.6366, lng: 119.2816 }
    ]
  },

  // ===== 浙江省 =====
  zhoushan: {
    name: "舟山",
    center: [122.2072, 29.9855],
    shelters: [
      { id: "zshan_001", name: "定海文化广场地下人防工程", type: "civil", level: "核6级", lat: 30.0155, lng: 122.1772, capacity: 4000, facilities: "三防系统、应急供电、医疗站", access: "文化广场地下入口" },
      { id: "zshan_002", name: "新城客运站地下避难所", type: "transport", level: "核6级", lat: 29.9755, lng: 122.2572, capacity: 5000, facilities: "大型通风、储水设施", access: "新城客运站地下广场" },
      { id: "zshan_003", name: "解放路地下人防商城", type: "mall", level: "核6级", lat: 30.0055, lng: 122.1972, capacity: 3000, facilities: "密闭门、滤毒通风", access: "解放路地下商业街" }
    ],
    targets: [
      { id: "zshan_nt001", name: "宁波舟山港", type: "port", risk: "高", lat: 29.9655, lng: 122.1372 },
      { id: "zshan_nt002", name: "六横电厂", type: "power", risk: "高", lat: 29.8555, lng: 122.1272 },
      { id: "zshan_nt003", name: "岙山石油基地", type: "chemical", risk: "高", lat: 29.9155, lng: 122.0472 },
      { id: "zshan_nt004", name: "舟山自来水厂", type: "water", risk: "中", lat: 30.0255, lng: 122.1672 }
    ]
  },

  quzhou: {
    name: "衢州",
    center: [118.8594, 28.9697],
    shelters: [
      { id: "qz_001", name: "南湖广场地下人防工程", type: "civil", level: "核6级", lat: 28.9597, lng: 118.8494, capacity: 3500, facilities: "三防系统、应急供电", access: "南湖广场地下入口" },
      { id: "qz_002", name: "衢州站地下避难所", type: "transport", level: "核6级", lat: 28.9497, lng: 118.9194, capacity: 5000, facilities: "大型通风、储水设施", access: "衢州站地下广场" },
      { id: "qz_003", name: "上街地下人防商城", type: "mall", level: "核6级", lat: 28.9697, lng: 118.8694, capacity: 2500, facilities: "密闭门、滤毒通风", access: "上街地下商业街" }
    ],
    targets: [
      { id: "qz_nt001", name: "衢州港", type: "port", risk: "中", lat: 28.9297, lng: 118.9494 },
      { id: "qz_nt002", name: "巨化集团", type: "chemical", risk: "高", lat: 28.8897, lng: 118.8794 },
      { id: "qz_nt003", name: "元立金属制品", type: "factory", risk: "中", lat: 28.9097, lng: 118.8994 },
      { id: "qz_nt004", name: "衢州自来水厂", type: "water", risk: "中", lat: 28.9797, lng: 118.8594 }
    ]
  },

  lishui: {
    name: "丽水",
    center: [119.9228, 28.4676],
    shelters: [
      { id: "ls_001", name: "纳爱斯广场地下人防工程", type: "civil", level: "核6级", lat: 28.4776, lng: 119.9028, capacity: 3000, facilities: "三防系统、应急供电", access: "纳爱斯广场地下入口" },
      { id: "ls_002", name: "丽水站地下避难所", type: "transport", level: "核6级", lat: 28.4376, lng: 119.9828, capacity: 4500, facilities: "大型通风、储水设施", access: "丽水站地下广场" },
      { id: "ls_003", name: "中山街地下人防工程", type: "civil", level: "核6级", lat: 28.4676, lng: 119.9328, capacity: 2500, facilities: "密闭门、滤毒通风", access: "中山街地下通道" }
    ],
    targets: [
      { id: "ls_nt001", name: "紧水滩水电站", type: "power", risk: "中", lat: 28.2076, lng: 119.5828 },
      { id: "ls_nt002", name: "滩坑水电站", type: "power", risk: "中", lat: 28.0576, lng: 120.2028 },
      { id: "ls_nt003", name: "丽水发电厂", type: "power", risk: "中", lat: 28.4876, lng: 119.8928 },
      { id: "ls_nt004", name: "丽水自来水厂", type: "water", risk: "中", lat: 28.4976, lng: 119.9128 }
    ]
  },

  // ===== 山东省 =====
  zaozhuang: {
    name: "枣庄",
    center: [117.3210, 34.8107],
    shelters: [
      { id: "zz_001", name: "人民公园地下人防工程", type: "civil", level: "核6级", lat: 34.8207, lng: 117.3010, capacity: 3500, facilities: "三防系统、应急供电", access: "人民公园地下入口" },
      { id: "zz_002", name: "枣庄站地下避难所", type: "transport", level: "核6级", lat: 34.8007, lng: 117.3610, capacity: 5000, facilities: "大型通风、储水设施", access: "枣庄站地下广场" },
      { id: "zz_003", name: "振兴路地下人防工程", type: "civil", level: "核6级", lat: 34.8107, lng: 117.3310, capacity: 3000, facilities: "密闭门、滤毒通风", access: "振兴路地下通道" }
    ],
    targets: [
      { id: "zz_nt001", name: "枣庄港", type: "port", risk: "中", lat: 34.7607, lng: 117.4210 },
      { id: "zz_nt002", name: "枣庄发电厂", type: "power", risk: "高", lat: 34.8307, lng: 117.2710 },
      { id: "zz_nt003", name: "兖矿鲁南化肥厂", type: "chemical", risk: "高", lat: 34.7807, lng: 117.3810 },
      { id: "zz_nt004", name: "枣庄自来水厂", type: "water", risk: "中", lat: 34.8207, lng: 117.3110 }
    ]
  },

  rizhao: {
    name: "日照",
    center: [119.5269, 35.4164],
    shelters: [
      { id: "rz_001", name: "银河公园地下人防工程", type: "civil", level: "核6级", lat: 35.4264, lng: 119.5069, capacity: 3500, facilities: "三防系统、应急供电、医疗站", access: "银河公园地下入口" },
      { id: "rz_002", name: "日照站地下避难所", type: "transport", level: "核6级", lat: 35.4064, lng: 119.5669, capacity: 5000, facilities: "大型通风、储水设施", access: "日照站地下广场" },
      { id: "rz_003", name: "海曲路地下人防商城", type: "mall", level: "核6级", lat: 35.4164, lng: 119.5369, capacity: 3000, facilities: "密闭门、滤毒通风", access: "海曲路地下商业街" }
    ],
    targets: [
      { id: "rz_nt001", name: "日照港", type: "port", risk: "高", lat: 35.3764, lng: 119.6369 },
      { id: "rz_nt002", name: "日照发电厂", type: "power", risk: "高", lat: 35.4564, lng: 119.4869 },
      { id: "rz_nt003", name: "岚山港", type: "port", risk: "高", lat: 35.1264, lng: 119.3369 },
      { id: "rz_nt004", name: "日照山字河机场", type: "airport", risk: "中", lat: 35.4064, lng: 118.7569 }
    ]
  },

  binzhou: {
    name: "滨州",
    center: [117.9724, 37.3811],
    shelters: [
      { id: "bz_001", name: "中海公园地下人防工程", type: "civil", level: "核6级", lat: 37.3911, lng: 117.9524, capacity: 3500, facilities: "三防系统、应急供电", access: "中海公园地下入口" },
      { id: "bz_002", name: "滨州站地下避难所", type: "transport", level: "核6级", lat: 37.3511, lng: 118.0324, capacity: 5000, facilities: "大型通风、储水设施", access: "滨州站地下广场" },
      { id: "bz_003", name: "黄河五路地下人防工程", type: "civil", level: "核6级", lat: 37.3811, lng: 117.9924, capacity: 3000, facilities: "密闭门、滤毒通风", access: "黄河五路地下通道" }
    ],
    targets: [
      { id: "bz_nt001", name: "滨州港", type: "port", risk: "中", lat: 37.6811, lng: 118.1924 },
      { id: "bz_nt002", name: "魏桥创业集团", type: "factory", risk: "中", lat: 37.3611, lng: 117.9524 },
      { id: "bz_nt003", name: "滨州发电厂", type: "power", risk: "高", lat: 37.4011, lng: 118.0124 },
      { id: "bz_nt004", name: "滨州自来水厂", type: "water", risk: "中", lat: 37.3911, lng: 117.9624 }
    ]
  },

  dongying: {
    name: "东营",
    center: [118.6747, 37.4341],
    shelters: [
      { id: "dy_001", name: "清风湖公园地下人防工程", type: "civil", level: "核6级", lat: 37.4441, lng: 118.6547, capacity: 4000, facilities: "三防系统、应急供电、医疗站", access: "清风湖公园地下入口" },
      { id: "dy_002", name: "东营南站地下避难所", type: "transport", level: "核6级", lat: 37.4141, lng: 118.7547, capacity: 5500, facilities: "大型通风、储水设施", access: "东营南站地下广场" },
      { id: "dy_003", name: "济南路地下人防商城", type: "mall", level: "核6级", lat: 37.4241, lng: 118.6947, capacity: 3500, facilities: "密闭门、滤毒通风", access: "济南路地下商业街" }
    ],
    targets: [
      { id: "dy_nt001", name: "东营港", type: "port", risk: "高", lat: 37.9341, lng: 118.9447 },
      { id: "dy_nt002", name: "胜利油田", type: "chemical", risk: "高", lat: 37.4641, lng: 118.6147 },
      { id: "dy_nt003", name: "胜利发电厂", type: "power", risk: "高", lat: 37.4041, lng: 118.7347 },
      { id: "dy_nt004", name: "东营利津石化", type: "chemical", risk: "高", lat: 37.6041, lng: 118.2547 }
    ]
  },

  liaocheng: {
    name: "聊城",
    center: [115.9854, 36.4560],
    shelters: [
      { id: "lc_001", name: "东昌湖地下人防工程", type: "civil", level: "核6级", lat: 36.4660, lng: 115.9654, capacity: 4000, facilities: "三防系统、应急供电", access: "东昌湖公园地下入口" },
      { id: "lc_002", name: "聊城站地下避难所", type: "transport", level: "核6级", lat: 36.4360, lng: 116.0454, capacity: 5500, facilities: "大型通风、储水设施", access: "聊城站地下广场" },
      { id: "lc_003", name: "柳园路地下人防工程", type: "civil", level: "核6级", lat: 36.4560, lng: 115.9954, capacity: 3000, facilities: "密闭门、滤毒通风", access: "柳园路地下通道" }
    ],
    targets: [
      { id: "lc_nt001", name: "聊城发电厂", type: "power", risk: "高", lat: 36.4760, lng: 115.9554 },
      { id: "lc_nt002", name: "临清发电厂", type: "power", risk: "高", lat: 36.6860, lng: 115.7054 },
      { id: "lc_nt003", name: "聊城自来水厂", type: "water", risk: "中", lat: 36.4460, lng: 115.9754 },
      { id: "lc_nt004", name: "京九铁路聊城大桥", type: "bridge", risk: "低", lat: 36.4860, lng: 115.9354 }
    ]
  },

  heze: {
    name: "菏泽",
    center: [115.4807, 35.2336],
    shelters: [
      { id: "hz_001", name: "天香公园地下人防工程", type: "civil", level: "核6级", lat: 35.2436, lng: 115.4607, capacity: 3500, facilities: "三防系统、应急供电", access: "天香公园地下入口" },
      { id: "hz_002", name: "菏泽站地下避难所", type: "transport", level: "核6级", lat: 35.2136, lng: 115.5407, capacity: 5000, facilities: "大型通风、储水设施", access: "菏泽站地下广场" },
      { id: "hz_003", name: "中华路地下人防商城", type: "mall", level: "核6级", lat: 35.2336, lng: 115.5007, capacity: 3000, facilities: "密闭门、滤毒通风", access: "中华路地下商业街" }
    ],
    targets: [
      { id: "hz_nt001", name: "菏泽发电厂", type: "power", risk: "高", lat: 35.2536, lng: 115.4707 },
      { id: "hz_nt002", name: "东明石化", type: "chemical", risk: "高", lat: 35.2136, lng: 115.0807 },
      { id: "hz_nt003", name: "菏泽自来水厂", type: "water", risk: "中", lat: 35.2436, lng: 115.4807 },
      { id: "hz_nt004", name: "菏泽火车站货场", type: "transport", risk: "中", lat: 35.2036, lng: 115.5307 }
    ]
  },

  // ===== 河南省 =====
  luoyang: {
    name: "洛阳",
    center: [112.4536, 34.6184],
    shelters: [
      { id: "ly_001", name: "周王城广场地下人防工程", type: "civil", level: "核6级", lat: 34.6284, lng: 112.4336, capacity: 6000, facilities: "三防系统、应急供电、医疗站", access: "周王城广场地下入口" },
      { id: "ly_002", name: "洛阳龙门站地下避难所", type: "transport", level: "核6级", lat: 34.5884, lng: 112.5336, capacity: 8000, facilities: "大型通风、储水设施", access: "洛阳龙门站地下广场" },
      { id: "ly_003", name: "新都汇地下人防商城", type: "mall", level: "核6级", lat: 34.6084, lng: 112.4736, capacity: 5000, facilities: "密闭门、滤毒通风", access: "新都汇地下商业街" },
      { id: "ly_004", name: "牡丹广场地下避难所", type: "metro", level: "核6级", lat: 34.6484, lng: 112.4236, capacity: 4500, facilities: "地铁防护设施、应急供电", access: "牡丹广场地铁站" }
    ],
    targets: [
      { id: "ly_nt001", name: "洛阳北郊机场", type: "airport", risk: "中", lat: 34.7414, lng: 112.3906 },
      { id: "ly_nt002", name: "洛阳石化", type: "chemical", risk: "高", lat: 34.8384, lng: 112.5136 },
      { id: "ly_nt003", name: "大唐洛阳热电", type: "power", risk: "高", lat: 34.6284, lng: 112.3936 },
      { id: "ly_nt004", name: "洛阳自来水厂", type: "water", risk: "中", lat: 34.6184, lng: 112.4636 }
    ]
  },

  anyang: {
    name: "安阳",
    center: [114.3925, 36.0976],
    shelters: [
      { id: "ay_001", name: "文峰塔地下人防工程", type: "civil", level: "核6级", lat: 36.1076, lng: 114.3725, capacity: 4000, facilities: "三防系统、应急供电", access: "文峰塔公园地下入口" },
      { id: "ay_002", name: "安阳东站地下避难所", type: "transport", level: "核6级", lat: 36.0576, lng: 114.4725, capacity: 6000, facilities: "大型通风、储水设施", access: "安阳东站地下广场" },
      { id: "ay_003", name: "北大街地下人防商城", type: "mall", level: "核6级", lat: 36.1176, lng: 114.3825, capacity: 3500, facilities: "密闭门、滤毒通风", access: "北大街地下商业街" }
    ],
    targets: [
      { id: "ay_nt001", name: "安阳钢铁集团", type: "factory", risk: "高", lat: 36.1676, lng: 114.3025 },
      { id: "ay_nt002", name: "大唐安阳发电厂", type: "power", risk: "高", lat: 36.0876, lng: 114.4525 },
      { id: "ay_nt003", name: "安阳自来水厂", type: "water", risk: "中", lat: 36.0976, lng: 114.3925 },
      { id: "ay_nt004", name: "安阳豫北纺织", type: "factory", risk: "中", lat: 36.1176, lng: 114.3625 }
    ]
  },

  xinxiang: {
    name: "新乡",
    center: [113.9267, 35.3037],
    shelters: [
      { id: "xx_001", name: "人民公园地下人防工程", type: "civil", level: "核6级", lat: 35.3137, lng: 113.9067, capacity: 4000, facilities: "三防系统、应急供电", access: "人民公园地下入口" },
      { id: "xx_002", name: "新乡东站地下避难所", type: "transport", level: "核6级", lat: 35.2837, lng: 113.9867, capacity: 5500, facilities: "大型通风、储水设施", access: "新乡东站地下广场" },
      { id: "xx_003", name: "平原路地下人防商城", type: "mall", level: "核6级", lat: 35.3037, lng: 113.9367, capacity: 3500, facilities: "密闭门、滤毒通风", access: "平原路地下商业街" }
    ],
    targets: [
      { id: "xx_nt001", name: "新乡化纤", type: "factory", risk: "中", lat: 35.3437, lng: 113.8867 },
      { id: "xx_nt002", name: "新乡发电厂", type: "power", risk: "高", lat: 35.2637, lng: 113.9467 },
      { id: "xx_nt003", name: "新乡自来水厂", type: "water", risk: "中", lat: 35.3137, lng: 113.9167 },
      { id: "xx_nt004", name: "京广铁路新乡大桥", type: "bridge", risk: "低", lat: 35.3537, lng: 113.8767 }
    ]
  },

  shangqiu: {
    name: "商丘",
    center: [115.6564, 34.4143],
    shelters: [
      { id: "sqsq_001", name: "金世纪广场地下人防工程", type: "civil", level: "核6级", lat: 34.4243, lng: 115.6364, capacity: 3500, facilities: "三防系统、应急供电", access: "金世纪广场地下入口" },
      { id: "sqsq_002", name: "商丘站地下避难所", type: "transport", level: "核6级", lat: 34.3943, lng: 115.7164, capacity: 5500, facilities: "大型通风、储水设施", access: "商丘站地下广场" },
      { id: "sqsq_003", name: "神火大道地下人防工程", type: "civil", level: "核6级", lat: 34.4143, lng: 115.6664, capacity: 3000, facilities: "密闭门、滤毒通风", access: "神火大道地下通道" }
    ],
    targets: [
      { id: "sqsq_nt001", name: "商丘机场", type: "airport", risk: "中", lat: 34.5343, lng: 115.7364 },
      { id: "sqsq_nt002", name: "神火集团", type: "power", risk: "高", lat: 34.4543, lng: 115.6564 },
      { id: "sqsq_nt003", name: "商丘自来水厂", type: "water", risk: "中", lat: 34.4243, lng: 115.6764 },
      { id: "sqsq_nt004", name: "京九铁路商丘大桥", type: "bridge", risk: "低", lat: 34.3843, lng: 115.7064 }
    ]
  },

  pingdingshan: {
    name: "平顶山",
    center: [113.1925, 33.7661],
    shelters: [
      { id: "pds_001", name: "河滨公园地下人防工程", type: "civil", level: "核6级", lat: 33.7761, lng: 113.1725, capacity: 3500, facilities: "三防系统、应急供电", access: "河滨公园地下入口" },
      { id: "pds_002", name: "平顶山西站地下避难所", type: "transport", level: "核6级", lat: 33.7361, lng: 113.2725, capacity: 5000, facilities: "大型通风、储水设施", access: "平顶山西站地下广场" },
      { id: "pds_003", name: "中兴路地下人防商城", type: "mall", level: "核6级", lat: 33.7561, lng: 113.2125, capacity: 3000, facilities: "密闭门、滤毒通风", access: "中兴路地下商业街" }
    ],
    targets: [
      { id: "pds_nt001", name: "平煤神马集团", type: "factory", risk: "高", lat: 33.8261, lng: 113.1325 },
      { id: "pds_nt002", name: "姚孟发电厂", type: "power", risk: "高", lat: 33.7861, lng: 113.2225 },
      { id: "pds_nt003", name: "平顶山自来水厂", type: "water", risk: "中", lat: 33.7661, lng: 113.1825 },
      { id: "pds_nt004", name: "平顶山东站", type: "transport", risk: "中", lat: 33.8061, lng: 113.1525 }
    ]
  },

  // ===== 福建省 =====
  zhangzhou: {
    name: "漳州",
    center: [117.6611, 24.5112],
    shelters: [
      { id: "zzzz_001", name: "中山公园地下人防工程", type: "civil", level: "核6级", lat: 24.5212, lng: 117.6411, capacity: 4000, facilities: "三防系统、应急供电", access: "中山公园地下入口" },
      { id: "zzzz_002", name: "漳州站地下避难所", type: "transport", level: "核6级", lat: 24.4812, lng: 117.7211, capacity: 5500, facilities: "大型通风、储水设施", access: "漳州站地下广场" },
      { id: "zzzz_003", name: "延安路地下人防商城", type: "mall", level: "核6级", lat: 24.5112, lng: 117.6711, capacity: 3500, facilities: "密闭门、滤毒通风", access: "延安路地下商业街" }
    ],
    targets: [
      { id: "zzzz_nt001", name: "漳州港", type: "port", risk: "中", lat: 24.4412, lng: 117.8011 },
      { id: "zzzz_nt002", name: "华阳电业漳州后石电厂", type: "power", risk: "高", lat: 24.3812, lng: 117.8811 },
      { id: "zzzz_nt003", name: "漳州自来水厂", type: "water", risk: "中", lat: 24.5212, lng: 117.6511 },
      { id: "zzzz_nt004", name: "漳州机场", type: "airport", risk: "中", lat: 24.5512, lng: 117.5611 }
    ]
  },

  putian: {
    name: "莆田",
    center: [119.0078, 25.4541],
    shelters: [
      { id: "pt_001", name: "凤凰山公园地下人防工程", type: "civil", level: "核6级", lat: 25.4641, lng: 118.9878, capacity: 3500, facilities: "三防系统、应急供电", access: "凤凰山公园地下入口" },
      { id: "pt_002", name: "莆田站地下避难所", type: "transport", level: "核6级", lat: 25.4241, lng: 119.0678, capacity: 5000, facilities: "大型通风、储水设施", access: "莆田站地下广场" },
      { id: "pt_003", name: "文献路地下人防商城", type: "mall", level: "核6级", lat: 25.4441, lng: 119.0178, capacity: 3000, facilities: "密闭门、滤毒通风", access: "文献路地下商业街" }
    ],
    targets: [
      { id: "pt_nt001", name: "秀屿港", type: "port", risk: "中", lat: 25.2241, lng: 119.0678 },
      { id: "pt_nt002", name: "莆田燃气电厂", type: "power", risk: "高", lat: 25.2041, lng: 119.1378 },
      { id: "pt_nt003", name: "LNG接收站", type: "chemical", risk: "高", lat: 25.1641, lng: 119.1078 },
      { id: "pt_nt004", name: "莆田自来水厂", type: "water", risk: "中", lat: 25.4541, lng: 118.9978 }
    ]
  },

  // ===== 河北省 =====
  baoding: {
    name: "保定",
    center: [115.4646, 38.8739],
    shelters: [
      { id: "bd_001", name: "竞秀公园地下人防工程", type: "civil", level: "核6级", lat: 38.8839, lng: 115.4446, capacity: 5000, facilities: "三防系统、应急供电、医疗站", access: "竞秀公园地下入口" },
      { id: "bd_002", name: "保定东站地下避难所", type: "transport", level: "核6级", lat: 38.8439, lng: 115.5446, capacity: 7000, facilities: "大型通风、储水设施", access: "保定东站地下广场" },
      { id: "bd_003", name: "裕华路地下人防商城", type: "mall", level: "核6级", lat: 38.8639, lng: 115.4846, capacity: 4500, facilities: "密闭门、滤毒通风", access: "裕华路地下商业街" }
    ],
    targets: [
      { id: "bd_nt001", name: "保定发电厂", type: "power", risk: "高", lat: 38.9039, lng: 115.4346 },
      { id: "bd_nt002", name: "风帆蓄电池", type: "factory", risk: "中", lat: 38.8339, lng: 115.4646 },
      { id: "bd_nt003", name: "保定自来水厂", type: "water", risk: "中", lat: 38.8839, lng: 115.4546 },
      { id: "bd_nt004", name: "长城汽车总部", type: "factory", risk: "中", lat: 38.9239, lng: 115.4846 }
    ]
  },

  cangzhou: {
    name: "沧州",
    center: [116.8388, 38.3045],
    shelters: [
      { id: "cz_001", name: "狮城公园地下人防工程", type: "civil", level: "核6级", lat: 38.3145, lng: 116.8188, capacity: 4000, facilities: "三防系统、应急供电", access: "狮城公园地下入口" },
      { id: "cz_002", name: "沧州西站地下避难所", type: "transport", level: "核6级", lat: 38.2745, lng: 116.8988, capacity: 5500, facilities: "大型通风、储水设施", access: "沧州西站地下广场" },
      { id: "cz_003", name: "新华路地下人防工程", type: "civil", level: "核6级", lat: 38.3045, lng: 116.8488, capacity: 3000, facilities: "密闭门、滤毒通风", access: "新华路地下通道" }
    ],
    targets: [
      { id: "cz_nt001", name: "黄骅港", type: "port", risk: "高", lat: 38.3745, lng: 117.3388 },
      { id: "cz_nt002", name: "国华沧东电厂", type: "power", risk: "高", lat: 38.2845, lng: 117.2788 },
      { id: "cz_nt003", name: "沧州大化", type: "chemical", risk: "高", lat: 38.2545, lng: 116.8188 },
      { id: "cz_nt004", name: "任丘油田", type: "chemical", risk: "高", lat: 38.7245, lng: 116.0988 }
    ]
  },

  langfang: {
    name: "廊坊",
    center: [116.6836, 39.5380],
    shelters: [
      { id: "lf_001", name: "人民公园地下人防工程", type: "civil", level: "核6级", lat: 39.5480, lng: 116.6636, capacity: 3500, facilities: "三防系统、应急供电", access: "人民公园地下入口" },
      { id: "lf_002", name: "廊坊站地下避难所", type: "transport", level: "核6级", lat: 39.5280, lng: 116.7336, capacity: 5000, facilities: "大型通风、储水设施", access: "廊坊站地下广场" },
      { id: "lf_003", name: "金光道地下人防工程", type: "civil", level: "核6级", lat: 39.5380, lng: 116.6936, capacity: 3000, facilities: "密闭门、滤毒通风", access: "金光道地下通道" }
    ],
    targets: [
      { id: "lf_nt001", name: "廊坊发电厂", type: "power", risk: "高", lat: 39.5080, lng: 116.6636 },
      { id: "lf_nt002", name: "富士康廊坊园区", type: "factory", risk: "中", lat: 39.5680, lng: 116.7136 },
      { id: "lf_nt003", name: "廊坊自来水厂", type: "water", risk: "中", lat: 39.5480, lng: 116.6736 },
      { id: "lf_nt004", name: "京沪高铁廊坊站", type: "transport", risk: "中", lat: 39.5180, lng: 116.7536 }
    ]
  },

  hengshui: {
    name: "衡水",
    center: [115.6860, 37.7350],
    shelters: [
      { id: "hs_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 37.7450, lng: 115.6660, capacity: 3000, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "hs_002", name: "衡水北站地下避难所", type: "transport", level: "核6级", lat: 37.7250, lng: 115.7760, capacity: 4500, facilities: "大型通风、储水设施", access: "衡水北站地下广场" },
      { id: "hs_003", name: "中心街地下人防工程", type: "civil", level: "核6级", lat: 37.7350, lng: 115.7060, capacity: 2500, facilities: "密闭门、滤毒通风", access: "中心街地下通道" }
    ],
    targets: [
      { id: "hs_nt001", name: "衡水电厂", type: "power", risk: "高", lat: 37.7650, lng: 115.6560 },
      { id: "hs_nt002", name: "衡水老白干", type: "factory", risk: "中", lat: 37.7550, lng: 115.6760 },
      { id: "hs_nt003", name: "衡水自来水厂", type: "water", risk: "中", lat: 37.7450, lng: 115.6860 },
      { id: "hs_nt004", name: "石德铁路衡水大桥", type: "bridge", risk: "低", lat: 37.7150, lng: 115.7160 }
    ]
  },

  // ===== 湖北省 =====
  yichang: {
    name: "宜昌",
    center: [111.2865, 30.6919],
    shelters: [
      { id: "yc_001", name: "滨江公园地下人防工程", type: "civil", level: "核6级", lat: 30.7019, lng: 111.2665, capacity: 5000, facilities: "三防系统、应急供电、医疗站", access: "滨江公园地下入口" },
      { id: "yc_002", name: "宜昌东站地下避难所", type: "transport", level: "核6级", lat: 30.6719, lng: 111.3465, capacity: 7000, facilities: "大型通风、储水设施", access: "宜昌东站地下广场" },
      { id: "yc_003", name: "夷陵广场地下人防商城", type: "mall", level: "核6级", lat: 30.6919, lng: 111.3065, capacity: 4500, facilities: "密闭门、滤毒通风", access: "夷陵广场地下商业街" }
    ],
    targets: [
      { id: "yc_nt001", name: "三峡大坝", type: "water", risk: "高", lat: 30.8319, lng: 111.0065 },
      { id: "yc_nt002", name: "葛洲坝水电站", type: "power", risk: "高", lat: 30.7219, lng: 111.2565 },
      { id: "yc_nt003", name: "宜昌三峡机场", type: "airport", risk: "中", lat: 30.5519, lng: 111.4365 },
      { id: "yc_nt004", name: "宜化集团", type: "chemical", risk: "高", lat: 30.6519, lng: 111.3365 }
    ]
  },

  xiangyang: {
    name: "襄阳",
    center: [112.1224, 32.0090],
    shelters: [
      { id: "xy_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 32.0190, lng: 112.1024, capacity: 5000, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "xy_002", name: "襄阳东站地下避难所", type: "transport", level: "核6级", lat: 31.9790, lng: 112.2024, capacity: 7000, facilities: "大型通风、储水设施", access: "襄阳东站地下广场" },
      { id: "xy_003", name: "鼓楼地下人防商城", type: "mall", level: "核6级", lat: 32.0290, lng: 112.1124, capacity: 4000, facilities: "密闭门、滤毒通风", access: "鼓楼地下商业街" }
    ],
    targets: [
      { id: "xy_nt001", name: "襄阳刘集机场", type: "airport", risk: "中", lat: 32.1490, lng: 112.2924 },
      { id: "xy_nt002", name: "华电襄阳发电厂", type: "power", risk: "高", lat: 32.0590, lng: 112.0824 },
      { id: "xy_nt003", name: "东风汽车公司", type: "factory", risk: "高", lat: 31.9890, lng: 112.1524 },
      { id: "xy_nt004", name: "襄阳自来水厂", type: "water", risk: "中", lat: 32.0090, lng: 112.1224 }
    ]
  },

  // ===== 湖南省 =====
  yueyang: {
    name: "岳阳",
    center: [113.1299, 29.3571],
    shelters: [
      { id: "yy_001", name: "南湖广场地下人防工程", type: "civil", level: "核6级", lat: 29.3671, lng: 113.1099, capacity: 4500, facilities: "三防系统、应急供电", access: "南湖广场地下入口" },
      { id: "yy_002", name: "岳阳东站地下避难所", type: "transport", level: "核6级", lat: 29.3371, lng: 113.2099, capacity: 6000, facilities: "大型通风、储水设施", access: "岳阳东站地下广场" },
      { id: "yy_003", name: "步行街地下人防商城", type: "mall", level: "核6级", lat: 29.3571, lng: 113.1499, capacity: 3500, facilities: "密闭门、滤毒通风", access: "步行街地下商业街" }
    ],
    targets: [
      { id: "yy_nt001", name: "岳阳港", type: "port", risk: "高", lat: 29.5271, lng: 113.2499 },
      { id: "yy_nt002", name: "华能岳阳电厂", type: "power", risk: "高", lat: 29.5171, lng: 113.1799 },
      { id: "yy_nt003", name: "岳阳石化", type: "chemical", risk: "高", lat: 29.4271, lng: 113.1399 },
      { id: "yy_nt004", name: "岳阳三荷机场", type: "airport", risk: "中", lat: 29.2071, lng: 113.3299 }
    ]
  },

  changde: {
    name: "常德",
    center: [111.6985, 29.0316],
    shelters: [
      { id: "cd_001", name: "滨湖公园地下人防工程", type: "civil", level: "核6级", lat: 29.0416, lng: 111.6785, capacity: 4000, facilities: "三防系统、应急供电", access: "滨湖公园地下入口" },
      { id: "cd_002", name: "常德站地下避难所", type: "transport", level: "核6级", lat: 29.0016, lng: 111.7585, capacity: 5500, facilities: "大型通风、储水设施", access: "常德站地下广场" },
      { id: "cd_003", name: "武陵大道地下人防工程", type: "civil", level: "核6级", lat: 29.0216, lng: 111.7085, capacity: 3000, facilities: "密闭门、滤毒通风", access: "武陵大道地下通道" }
    ],
    targets: [
      { id: "cd_nt001", name: "常德桃花源机场", type: "airport", risk: "中", lat: 28.9116, lng: 111.6485 },
      { id: "cd_nt002", name: "石门发电厂", type: "power", risk: "高", lat: 29.6216, lng: 111.3885 },
      { id: "cd_nt003", name: "常德自来水厂", type: "water", risk: "中", lat: 29.0316, lng: 111.6985 },
      { id: "cd_nt004", name: "常德华电", type: "power", risk: "高", lat: 29.0616, lng: 111.6485 }
    ]
  },

  zhuzhou: {
    name: "株洲",
    center: [113.1517, 27.8358],
    shelters: [
      { id: "zhuzhou_001", name: "神农公园地下人防工程", type: "civil", level: "核6级", lat: 27.8458, lng: 113.1317, capacity: 4500, facilities: "三防系统、应急供电", access: "神农公园地下入口" },
      { id: "zhuzhou_002", name: "株洲西站地下避难所", type: "transport", level: "核6级", lat: 27.8158, lng: 113.2117, capacity: 6000, facilities: "大型通风、储水设施", access: "株洲西站地下广场" },
      { id: "zhuzhou_003", name: "中心广场地下人防商城", type: "mall", level: "核6级", lat: 27.8358, lng: 113.1617, capacity: 4000, facilities: "密闭门、滤毒通风", access: "中心广场地下商业街" }
    ],
    targets: [
      { id: "zhuzhou_nt001", name: "株洲清水塘工业区", type: "factory", risk: "高", lat: 27.9058, lng: 113.1117 },
      { id: "zhuzhou_nt002", name: "中车株洲电力机车", type: "factory", risk: "中", lat: 27.8558, lng: 113.1417 },
      { id: "zhuzhou_nt003", name: "株洲自来水厂", type: "water", risk: "中", lat: 27.8458, lng: 113.1717 },
      { id: "zhuzhou_nt004", name: "株洲电厂", type: "power", risk: "高", lat: 27.8758, lng: 113.1017 }
    ]
  },

  xiangtan: {
    name: "湘潭",
    center: [112.9513, 27.8297],
    shelters: [
      { id: "xt_001", name: "雨湖公园地下人防工程", type: "civil", level: "核6级", lat: 27.8397, lng: 112.9313, capacity: 4000, facilities: "三防系统、应急供电", access: "雨湖公园地下入口" },
      { id: "xt_002", name: "湘潭站地下避难所", type: "transport", level: "核6级", lat: 27.8097, lng: 112.9913, capacity: 5500, facilities: "大型通风、储水设施", access: "湘潭站地下广场" },
      { id: "xt_003", name: "建设路地下人防工程", type: "civil", level: "核6级", lat: 27.8297, lng: 112.9613, capacity: 3000, facilities: "密闭门、滤毒通风", access: "建设路地下通道" }
    ],
    targets: [
      { id: "xt_nt001", name: "湘钢集团", type: "factory", risk: "高", lat: 27.8597, lng: 112.9413 },
      { id: "xt_nt002", name: "湘潭电厂", type: "power", risk: "高", lat: 27.7797, lng: 112.9913 },
      { id: "xt_nt003", name: "湘潭自来水厂", type: "water", risk: "中", lat: 27.8497, lng: 112.9213 },
      { id: "xt_nt004", name: "江南机器厂", type: "military", risk: "高", lat: 27.8797, lng: 112.9513 }
    ]
  },

  // ===== 江西省 =====
  ganzhou: {
    name: "赣州",
    center: [114.9350, 25.8511],
    shelters: [
      { id: "gz_001", name: "八境台地下人防工程", type: "civil", level: "核6级", lat: 25.8611, lng: 114.9150, capacity: 4000, facilities: "三防系统、应急供电", access: "八境台公园地下入口" },
      { id: "gz_002", name: "赣州西站地下避难所", type: "transport", level: "核6级", lat: 25.8211, lng: 115.0050, capacity: 6000, facilities: "大型通风、储水设施", access: "赣州西站地下广场" },
      { id: "gz_003", name: "南门广场地下人防商城", type: "mall", level: "核6级", lat: 25.8411, lng: 114.9450, capacity: 3500, facilities: "密闭门、滤毒通风", access: "南门广场地下商业街" }
    ],
    targets: [
      { id: "gz_nt001", name: "赣州黄金机场", type: "airport", risk: "中", lat: 25.8611, lng: 114.7850 },
      { id: "gz_nt002", name: "华能瑞金电厂", type: "power", risk: "高", lat: 25.9111, lng: 116.0250 },
      { id: "gz_nt003", name: "赣州自来水厂", type: "water", risk: "中", lat: 25.8711, lng: 114.9250 },
      { id: "gz_nt004", name: "京九铁路赣州大桥", type: "bridge", risk: "低", lat: 25.8911, lng: 114.9050 }
    ]
  },

  jiujiang: {
    name: "九江",
    center: [116.0017, 29.7041],
    shelters: [
      { id: "jj_001", name: "甘棠公园地下人防工程", type: "civil", level: "核6级", lat: 29.7141, lng: 115.9817, capacity: 4000, facilities: "三防系统、应急供电", access: "甘棠公园地下入口" },
      { id: "jj_002", name: "九江站地下避难所", type: "transport", level: "核6级", lat: 29.6841, lng: 116.0517, capacity: 6000, facilities: "大型通风、储水设施", access: "九江站地下广场" },
      { id: "jj_003", name: "大中路地下人防商城", type: "mall", level: "核6级", lat: 29.7041, lng: 116.0017, capacity: 3500, facilities: "密闭门、滤毒通风", access: "大中路地下商业街" }
    ],
    targets: [
      { id: "jj_nt001", name: "九江港", type: "port", risk: "高", lat: 29.7441, lng: 116.0217 },
      { id: "jj_nt002", name: "国电九江电厂", type: "power", risk: "高", lat: 29.7841, lng: 115.9017 },
      { id: "jj_nt003", name: "中石化九江石化", type: "chemical", risk: "高", lat: 29.6541, lng: 115.9617 },
      { id: "jj_nt004", name: "九江庐山机场", type: "airport", risk: "中", lat: 29.4741, lng: 115.8017 }
    ]
  },

  // ===== 四川省 =====
  dazhou: {
    name: "达州",
    center: [107.5030, 31.2093],
    shelters: [
      { id: "dazhou_001", name: "人民公园地下人防工程", type: "civil", level: "核6级", lat: 31.2193, lng: 107.4830, capacity: 3500, facilities: "三防系统、应急供电", access: "人民公园地下入口" },
      { id: "dazhou_002", name: "达州站地下避难所", type: "transport", level: "核6级", lat: 31.1893, lng: 107.5530, capacity: 5000, facilities: "大型通风、储水设施", access: "达州站地下广场" },
      { id: "dazhou_003", name: "通川路地下人防工程", type: "civil", level: "核6级", lat: 31.2093, lng: 107.5130, capacity: 3000, facilities: "密闭门、滤毒通风", access: "通川路地下通道" }
    ],
    targets: [
      { id: "dazhou_nt001", name: "达州天然气净化厂", type: "chemical", risk: "高", lat: 31.2493, lng: 107.4330 },
      { id: "dazhou_nt002", name: "达州发电厂", type: "power", risk: "高", lat: 31.2293, lng: 107.5230 },
      { id: "dazhou_nt003", name: "达州自来水厂", type: "water", risk: "中", lat: 31.2193, lng: 107.4930 },
      { id: "dazhou_nt004", name: "襄渝铁路达州大桥", type: "bridge", risk: "低", lat: 31.1793, lng: 107.5430 }
    ]
  },

  mianyang: {
    name: "绵阳",
    center: [104.6797, 31.4677],
    shelters: [
      { id: "my_001", name: "人民公园地下人防工程", type: "civil", level: "核6级", lat: 31.4777, lng: 104.6597, capacity: 4500, facilities: "三防系统、应急供电", access: "人民公园地下入口" },
      { id: "my_002", name: "绵阳站地下避难所", type: "transport", level: "核6级", lat: 31.4577, lng: 104.7397, capacity: 6000, facilities: "大型通风、储水设施", access: "绵阳站地下广场" },
      { id: "my_003", name: "临园路地下人防商城", type: "mall", level: "核6级", lat: 31.4677, lng: 104.6997, capacity: 4000, facilities: "密闭门、滤毒通风", access: "临园路地下商业街" }
    ],
    targets: [
      { id: "my_nt001", name: "绵阳南郊机场", type: "airport", risk: "中", lat: 31.4277, lng: 104.7397 },
      { id: "my_nt002", name: "绵阳科学城", type: "military", risk: "高", lat: 31.4877, lng: 104.5197 },
      { id: "my_nt003", name: "绵阳卷烟厂", type: "factory", risk: "中", lat: 31.4977, lng: 104.6797 },
      { id: "my_nt004", name: "绵阳自来水厂", type: "water", risk: "中", lat: 31.4777, lng: 104.7097 }
    ]
  },

  nanchong: {
    name: "南充",
    center: [106.1107, 30.8378],
    shelters: [
      { id: "nc_001", name: "北湖公园地下人防工程", type: "civil", level: "核6级", lat: 30.8478, lng: 106.0907, capacity: 4000, facilities: "三防系统、应急供电", access: "北湖公园地下入口" },
      { id: "nc_002", name: "南充站地下避难所", type: "transport", level: "核6级", lat: 30.8278, lng: 106.1707, capacity: 5500, facilities: "大型通风、储水设施", access: "南充站地下广场" },
      { id: "nc_003", name: "人民中路地下人防商城", type: "mall", level: "核6级", lat: 30.8378, lng: 106.1307, capacity: 3500, facilities: "密闭门、滤毒通风", access: "人民中路地下商业街" }
    ],
    targets: [
      { id: "nc_nt001", name: "南充高坪机场", type: "airport", risk: "中", lat: 30.7978, lng: 106.1707 },
      { id: "nc_nt002", name: "南充发电厂", type: "power", risk: "高", lat: 30.8778, lng: 106.0607 },
      { id: "nc_nt003", name: "南充炼油厂", type: "chemical", risk: "高", lat: 30.8178, lng: 106.1007 },
      { id: "nc_nt004", name: "南充自来水厂", type: "water", risk: "中", lat: 30.8578, lng: 106.1107 }
    ]
  },

  luzhou: {
    name: "泸州",
    center: [105.4429, 28.8700],
    shelters: [
      { id: "lz_001", name: "忠山公园地下人防工程", type: "civil", level: "核6级", lat: 28.8800, lng: 105.4229, capacity: 3500, facilities: "三防系统、应急供电", access: "忠山公园地下入口" },
      { id: "lz_002", name: "泸州站地下避难所", type: "transport", level: "核6级", lat: 28.8500, lng: 105.4929, capacity: 5000, facilities: "大型通风、储水设施", access: "泸州站地下广场" },
      { id: "lz_003", name: "水井沟地下人防工程", type: "civil", level: "核6级", lat: 28.8700, lng: 105.4529, capacity: 3000, facilities: "密闭门、滤毒通风", access: "水井沟地下通道" }
    ],
    targets: [
      { id: "lz_nt001", name: "泸州港", type: "port", risk: "中", lat: 28.9300, lng: 105.5829 },
      { id: "lz_nt002", name: "泸州天然气", type: "chemical", risk: "高", lat: 28.7900, lng: 105.4229 },
      { id: "lz_nt003", name: "泸州酒厂", type: "factory", risk: "中", lat: 28.8900, lng: 105.4429 },
      { id: "lz_nt004", name: "泸州自来水厂", type: "water", risk: "中", lat: 28.8800, lng: 105.4329 }
    ]
  },

  deyang: {
    name: "德阳",
    center: [104.3976, 31.1270],
    shelters: [
      { id: "dysc_001", name: "石刻公园地下人防工程", type: "civil", level: "核6级", lat: 31.1370, lng: 104.3776, capacity: 3500, facilities: "三防系统、应急供电", access: "石刻公园地下入口" },
      { id: "dysc_002", name: "德阳站地下避难所", type: "transport", level: "核6级", lat: 31.1170, lng: 104.4476, capacity: 5000, facilities: "大型通风、储水设施", access: "德阳站地下广场" },
      { id: "dysc_003", name: "长江路地下人防工程", type: "civil", level: "核6级", lat: 31.1270, lng: 104.4076, capacity: 3000, facilities: "密闭门、滤毒通风", access: "长江路地下通道" }
    ],
    targets: [
      { id: "dysc_nt001", name: "二重集团", type: "factory", risk: "高", lat: 31.1570, lng: 104.3676 },
      { id: "dysc_nt002", name: "东汽集团", type: "factory", risk: "高", lat: 31.1670, lng: 104.3976 },
      { id: "dysc_nt003", name: "德阳发电厂", type: "power", risk: "高", lat: 31.1370, lng: 104.4376 },
      { id: "dysc_nt004", name: "德阳自来水厂", type: "water", risk: "中", lat: 31.1470, lng: 104.3876 }
    ]
  },

  // ===== 贵州省 =====
  zunyi: {
    name: "遵义",
    center: [106.9272, 27.7255],
    shelters: [
      { id: "zy_001", name: "凤凰山公园地下人防工程", type: "civil", level: "核6级", lat: 27.7355, lng: 106.9072, capacity: 4000, facilities: "三防系统、应急供电", access: "凤凰山公园地下入口" },
      { id: "zy_002", name: "遵义站地下避难所", type: "transport", level: "核6级", lat: 27.7055, lng: 106.9872, capacity: 5500, facilities: "大型通风、储水设施", access: "遵义站地下广场" },
      { id: "zy_003", name: "中华路地下人防商城", type: "mall", level: "核6级", lat: 27.7255, lng: 106.9472, capacity: 3500, facilities: "密闭门、滤毒通风", access: "中华路地下商业街" }
    ],
    targets: [
      { id: "zy_nt001", name: "遵义茅台机场", type: "airport", risk: "中", lat: 27.8155, lng: 106.3372 },
      { id: "zy_nt002", name: "茅台酒厂", type: "factory", risk: "中", lat: 27.8655, lng: 106.3872 },
      { id: "zy_nt003", name: "遵义发电厂", type: "power", risk: "高", lat: 27.7455, lng: 106.9272 },
      { id: "zy_nt004", name: "遵义自来水厂", type: "water", risk: "中", lat: 27.7655, lng: 106.9172 }
    ]
  },

  // ===== 云南省 =====
  baoshan: {
    name: "保山",
    center: [99.1618, 25.1120],
    shelters: [
      { id: "bs_001", name: "太保公园地下人防工程", type: "civil", level: "核6级", lat: 25.1220, lng: 99.1418, capacity: 2500, facilities: "三防系统、应急供电", access: "太保公园地下入口" },
      { id: "bs_002", name: "保山站地下避难所", type: "transport", level: "核6级", lat: 25.1020, lng: 99.2218, capacity: 4000, facilities: "大型通风、储水设施", access: "保山站地下广场" },
      { id: "bs_003", name: "九龙路地下人防工程", type: "civil", level: "核6级", lat: 25.1120, lng: 99.1818, capacity: 2000, facilities: "密闭门、滤毒通风", access: "九龙路地下通道" }
    ],
    targets: [
      { id: "bs_nt001", name: "保山云瑞机场", type: "airport", risk: "中", lat: 25.0520, lng: 99.1918 },
      { id: "bs_nt002", name: "保山发电厂", type: "power", risk: "中", lat: 25.1420, lng: 99.1418 },
      { id: "bs_nt003", name: "保山自来水厂", type: "water", risk: "中", lat: 25.1220, lng: 99.1718 },
      { id: "bs_nt004", name: "保山卷烟厂", type: "factory", risk: "中", lat: 25.1320, lng: 99.1618 }
    ]
  },

  // ===== 山西省 =====
  datong: {
    name: "大同",
    center: [113.3002, 40.0768],
    shelters: [
      { id: "dt_001", name: "华严寺地下人防工程", type: "civil", level: "核6级", lat: 40.0868, lng: 113.2802, capacity: 3500, facilities: "三防系统、应急供电", access: "华严寺地下入口" },
      { id: "dt_002", name: "大同南站地下避难所", type: "transport", level: "核6级", lat: 40.0468, lng: 113.3602, capacity: 5500, facilities: "大型通风、储水设施", access: "大同南站地下广场" },
      { id: "dt_003", name: "永泰街地下人防商城", type: "mall", level: "核6级", lat: 40.0768, lng: 113.3202, capacity: 3000, facilities: "密闭门、滤毒通风", access: "永泰街地下商业街" }
    ],
    targets: [
      { id: "dt_nt001", name: "大同云冈机场", type: "airport", risk: "中", lat: 40.0268, lng: 113.4802 },
      { id: "dt_nt002", name: "大同煤矿", type: "mine", risk: "中", lat: 40.0568, lng: 113.2202 },
      { id: "dt_nt003", name: "大同第二发电厂", type: "power", risk: "高", lat: 40.0868, lng: 113.3002 },
      { id: "dt_nt004", name: "大同自来水厂", type: "water", risk: "中", lat: 40.0668, lng: 113.2802 }
    ]
  },

  yuncheng: {
    name: "运城",
    center: [111.0075, 35.0263],
    shelters: [
      { id: "yc_yc_001", name: "南风广场地下人防工程", type: "civil", level: "核6级", lat: 35.0363, lng: 110.9875, capacity: 3500, facilities: "三防系统、应急供电", access: "南风广场地下入口" },
      { id: "yc_yc_002", name: "运城北站地下避难所", type: "transport", level: "核6级", lat: 35.0063, lng: 111.0575, capacity: 5000, facilities: "大型通风、储水设施", access: "运城北站地下广场" },
      { id: "yc_yc_003", name: "解放路地下人防工程", type: "civil", level: "核6级", lat: 35.0263, lng: 111.0175, capacity: 3000, facilities: "密闭门、滤毒通风", access: "解放路地下通道" }
    ],
    targets: [
      { id: "yc_yc_nt001", name: "运城关公机场", type: "airport", risk: "中", lat: 35.1163, lng: 111.0375 },
      { id: "yc_yc_nt002", name: "运城发电厂", type: "power", risk: "高", lat: 35.0463, lng: 110.9875 },
      { id: "yc_yc_nt003", name: "运城盐化工", type: "chemical", risk: "高", lat: 35.0063, lng: 111.0475 },
      { id: "yc_yc_nt004", name: "运城自来水厂", type: "water", risk: "中", lat: 35.0363, lng: 111.0075 }
    ]
  },

  // ===== 陕西省 =====
  baoji: {
    name: "宝鸡",
    center: [107.2376, 34.3632],
    shelters: [
      { id: "bj_001", name: "炎帝园地下人防工程", type: "civil", level: "核6级", lat: 34.3732, lng: 107.2176, capacity: 3500, facilities: "三防系统、应急供电", access: "炎帝园地下入口" },
      { id: "bj_002", name: "宝鸡南站地下避难所", type: "transport", level: "核6级", lat: 34.3432, lng: 107.3076, capacity: 5500, facilities: "大型通风、储水设施", access: "宝鸡南站地下广场" },
      { id: "bj_003", name: "经二路地下人防商城", type: "mall", level: "核6级", lat: 34.3632, lng: 107.2576, capacity: 3000, facilities: "密闭门、滤毒通风", access: "经二路地下商业街" }
    ],
    targets: [
      { id: "bj_nt001", name: "宝鸡机场", type: "airport", risk: "中", lat: 34.3132, lng: 107.3176 },
      { id: "bj_nt002", name: "宝鸡钢管厂", type: "factory", risk: "中", lat: 34.3832, lng: 107.1976 },
      { id: "bj_nt003", name: "宝鸡发电厂", type: "power", risk: "高", lat: 34.3932, lng: 107.2376 },
      { id: "bj_nt004", name: "宝鸡自来水厂", type: "water", risk: "中", lat: 34.3732, lng: 107.2276 }
    ]
  },

  hanzhong: {
    name: "汉中",
    center: [107.0230, 33.0676],
    shelters: [
      { id: "hz_001", name: "莲花池公园地下人防工程", type: "civil", level: "核6级", lat: 33.0776, lng: 107.0030, capacity: 3000, facilities: "三防系统、应急供电", access: "莲花池公园地下入口" },
      { id: "hz_002", name: "汉中站地下避难所", type: "transport", level: "核6级", lat: 33.0476, lng: 107.0730, capacity: 4500, facilities: "大型通风、储水设施", access: "汉中站地下广场" },
      { id: "hz_003", name: "天汉大道地下人防工程", type: "civil", level: "核6级", lat: 33.0676, lng: 107.0330, capacity: 2500, facilities: "密闭门、滤毒通风", access: "天汉大道地下通道" }
    ],
    targets: [
      { id: "hz_nt001", name: "汉中城固机场", type: "airport", risk: "中", lat: 33.1576, lng: 107.2030 },
      { id: "hz_nt002", name: "汉中卷烟厂", type: "factory", risk: "中", lat: 33.0876, lng: 107.0130 },
      { id: "hz_nt003", name: "汉中发电厂", type: "power", risk: "高", lat: 33.0376, lng: 107.0630 },
      { id: "hz_nt004", name: "汉中自来水厂", type: "water", risk: "中", lat: 33.0776, lng: 107.0230 }
    ]
  },

  yulin_shanxi: {
    name: "榆林",
    center: [109.7346, 38.2853],
    shelters: [
      { id: "yl_001", name: "世纪广场地下人防工程", type: "civil", level: "核6级", lat: 38.2953, lng: 109.7146, capacity: 3500, facilities: "三防系统、应急供电", access: "世纪广场地下入口" },
      { id: "yl_002", name: "榆林站地下避难所", type: "transport", level: "核6级", lat: 38.2653, lng: 109.7946, capacity: 5000, facilities: "大型通风、储水设施", access: "榆林站地下广场" },
      { id: "yl_003", name: "新建路地下人防工程", type: "civil", level: "核6级", lat: 38.2853, lng: 109.7546, capacity: 3000, facilities: "密闭门、滤毒通风", access: "新建路地下通道" }
    ],
    targets: [
      { id: "yl_nt001", name: "榆林榆阳机场", type: "airport", risk: "中", lat: 38.2693, lng: 109.5936 },
      { id: "yl_nt002", name: "榆林天然气", type: "chemical", risk: "高", lat: 38.6253, lng: 109.5646 },
      { id: "yl_nt003", name: "神东煤矿", type: "mine", risk: "中", lat: 39.0753, lng: 110.2346 },
      { id: "yl_nt004", name: "榆林发电厂", type: "power", risk: "高", lat: 38.3053, lng: 109.7246 }
    ]
  },

  // ===== 甘肃省 =====
  jiayuguan: {
    name: "嘉峪关",
    center: [98.2892, 39.7720],
    shelters: [
      { id: "jyg_001", name: "雄关广场地下人防工程", type: "civil", level: "核6级", lat: 39.7820, lng: 98.2692, capacity: 3000, facilities: "三防系统、应急供电", access: "雄关广场地下入口" },
      { id: "jyg_002", name: "嘉峪关站地下避难所", type: "transport", level: "核6级", lat: 39.7520, lng: 98.3392, capacity: 4500, facilities: "大型通风、储水设施", access: "嘉峪关站地下广场" },
      { id: "jyg_003", name: "新华路地下人防工程", type: "civil", level: "核6级", lat: 39.7720, lng: 98.2992, capacity: 2500, facilities: "密闭门、滤毒通风", access: "新华路地下通道" }
    ],
    targets: [
      { id: "jyg_nt001", name: "嘉峪关机场", type: "airport", risk: "中", lat: 39.8620, lng: 98.3392 },
      { id: "jyg_nt002", name: "酒钢集团", type: "factory", risk: "高", lat: 39.8020, lng: 98.2292 },
      { id: "jyg_nt003", name: "嘉峪关发电厂", type: "power", risk: "高", lat: 39.7920, lng: 98.3092 },
      { id: "jyg_nt004", name: "嘉峪关自来水厂", type: "water", risk: "中", lat: 39.7820, lng: 98.2792 }
    ]
  },

  jinchang: {
    name: "金昌",
    center: [102.1882, 38.5202],
    shelters: [
      { id: "jc_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 38.5302, lng: 102.1682, capacity: 2500, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "jc_002", name: "金昌站地下避难所", type: "transport", level: "核6级", lat: 38.5002, lng: 102.2282, capacity: 4000, facilities: "大型通风、储水设施", access: "金昌站地下广场" },
      { id: "jc_003", name: "北京路地下人防工程", type: "civil", level: "核6级", lat: 38.5202, lng: 102.1982, capacity: 2000, facilities: "密闭门、滤毒通风", access: "北京路地下通道" }
    ],
    targets: [
      { id: "jc_nt001", name: "金昌金川机场", type: "airport", risk: "中", lat: 38.4902, lng: 102.3502 },
      { id: "jc_nt002", name: "金川集团", type: "mine", risk: "高", lat: 38.5502, lng: 102.1682 },
      { id: "jc_nt003", name: "金昌发电厂", type: "power", risk: "高", lat: 38.5102, lng: 102.2082 },
      { id: "jc_nt004", name: "金昌自来水厂", type: "water", risk: "中", lat: 38.5302, lng: 102.1782 }
    ]
  },

  // ===== 广西 =====
  liuzhou: {
    name: "柳州",
    center: [109.4155, 24.3240],
    shelters: [
      { id: "lz_001", name: "柳侯公园地下人防工程", type: "civil", level: "核6级", lat: 24.3340, lng: 109.3955, capacity: 4000, facilities: "三防系统、应急供电", access: "柳侯公园地下入口" },
      { id: "lz_002", name: "柳州站地下避难所", type: "transport", level: "核6级", lat: 24.3040, lng: 109.4655, capacity: 6000, facilities: "大型通风、储水设施", access: "柳州站地下广场" },
      { id: "lz_003", name: "五星街地下人防商城", type: "mall", level: "核6级", lat: 24.3140, lng: 109.4255, capacity: 3500, facilities: "密闭门、滤毒通风", access: "五星街地下商业街" }
    ],
    targets: [
      { id: "lz_nt001", name: "柳州白莲机场", type: "airport", risk: "中", lat: 24.2140, lng: 109.3955 },
      { id: "lz_nt002", name: "柳州钢铁", type: "factory", risk: "高", lat: 24.3540, lng: 109.3655 },
      { id: "lz_nt003", name: "柳州汽车城", type: "factory", risk: "中", lat: 24.3940, lng: 109.4455 },
      { id: "lz_nt004", name: "柳州自来水厂", type: "water", risk: "中", lat: 24.3340, lng: 109.4055 }
    ]
  },

  guigang: {
    name: "贵港",
    center: [109.5989, 23.1115],
    shelters: [
      { id: "gg_001", name: "东湖公园地下人防工程", type: "civil", level: "核6级", lat: 23.1215, lng: 109.5789, capacity: 3000, facilities: "三防系统、应急供电", access: "东湖公园地下入口" },
      { id: "gg_002", name: "贵港站地下避难所", type: "transport", level: "核6级", lat: 23.0915, lng: 109.6589, capacity: 4500, facilities: "大型通风、储水设施", access: "贵港站地下广场" },
      { id: "gg_003", name: "中山路地下人防工程", type: "civil", level: "核6级", lat: 23.1115, lng: 109.6189, capacity: 2500, facilities: "密闭门、滤毒通风", access: "中山路地下通道" }
    ],
    targets: [
      { id: "gg_nt001", name: "贵港港", type: "port", risk: "中", lat: 23.1715, lng: 109.6989 },
      { id: "gg_nt002", name: "贵糖集团", type: "factory", risk: "中", lat: 23.1415, lng: 109.5889 },
      { id: "gg_nt003", name: "贵港发电厂", type: "power", risk: "高", lat: 23.1315, lng: 109.6289 },
      { id: "gg_nt004", name: "贵港自来水厂", type: "water", risk: "中", lat: 23.1215, lng: 109.5989 }
    ]
  },

  qinzhou: {
    name: "钦州",
    center: [108.6542, 21.9797],
    shelters: [
      { id: "qz_001", name: "中山公园地下人防工程", type: "civil", level: "核6级", lat: 21.9897, lng: 108.6342, capacity: 3000, facilities: "三防系统、应急供电", access: "中山公园地下入口" },
      { id: "qz_002", name: "钦州东站地下避难所", type: "transport", level: "核6级", lat: 21.9597, lng: 108.7042, capacity: 4500, facilities: "大型通风、储水设施", access: "钦州东站地下广场" },
      { id: "qz_003", name: "人民路地下人防工程", type: "civil", level: "核6级", lat: 21.9797, lng: 108.6642, capacity: 2500, facilities: "密闭门、滤毒通风", access: "人民路地下通道" }
    ],
    targets: [
      { id: "qz_nt001", name: "钦州港", type: "port", risk: "高", lat: 21.9097, lng: 108.6142 },
      { id: "qz_nt002", name: "国投钦州电厂", type: "power", risk: "高", lat: 21.9397, lng: 108.5842 },
      { id: "qz_nt003", name: "中石油钦州石化", type: "chemical", risk: "高", lat: 21.8497, lng: 108.5542 },
      { id: "qz_nt004", name: "钦州自来水厂", type: "water", risk: "中", lat: 21.9897, lng: 108.6542 }
    ]
  },

  beihai: {
    name: "北海",
    center: [109.1202, 21.4813],
    shelters: [
      { id: "bh_001", name: "北部湾广场地下人防工程", type: "civil", level: "核6级", lat: 21.4913, lng: 109.1002, capacity: 3500, facilities: "三防系统、应急供电", access: "北部湾广场地下入口" },
      { id: "bh_002", name: "北海站地下避难所", type: "transport", level: "核6级", lat: 21.4613, lng: 109.1602, capacity: 5000, facilities: "大型通风、储水设施", access: "北海站地下广场" },
      { id: "bh_003", name: "北海老街地下人防工程", type: "civil", level: "核6级", lat: 21.4913, lng: 109.1202, capacity: 2500, facilities: "密闭门、滤毒通风", access: "老街地下通道" }
    ],
    targets: [
      { id: "bh_nt001", name: "北海港", type: "port", risk: "中", lat: 21.4313, lng: 109.1002 },
      { id: "bh_nt002", name: "北海福成机场", type: "airport", risk: "中", lat: 21.5413, lng: 109.2902 },
      { id: "bh_nt003", name: "北海发电厂", type: "power", risk: "高", lat: 21.5113, lng: 109.0802 },
      { id: "bh_nt004", name: "北海自来水厂", type: "water", risk: "中", lat: 21.4813, lng: 109.1102 }
    ]
  },

  wuzhou: {
    name: "梧州",
    center: [111.2791, 23.4770],
    shelters: [
      { id: "wz_001", name: "白云山公园地下人防工程", type: "civil", level: "核6级", lat: 23.4870, lng: 111.2591, capacity: 3000, facilities: "三防系统、应急供电", access: "白云山公园地下入口" },
      { id: "wz_002", name: "梧州南站地下避难所", type: "transport", level: "核6级", lat: 23.4470, lng: 111.3391, capacity: 4500, facilities: "大型通风、储水设施", access: "梧州南站地下广场" },
      { id: "wz_003", name: "中山路地下人防工程", type: "civil", level: "核6级", lat: 23.4770, lng: 111.2991, capacity: 2500, facilities: "密闭门、滤毒通风", access: "中山路地下通道" }
    ],
    targets: [
      { id: "wz_nt001", name: "梧州港", type: "port", risk: "中", lat: 23.5170, lng: 111.3491 },
      { id: "wz_nt002", name: "梧州机场", type: "airport", risk: "中", lat: 23.4570, lng: 111.2191 },
      { id: "wz_nt003", name: "梧州发电厂", type: "power", risk: "高", lat: 23.4670, lng: 111.2891 },
      { id: "wz_nt004", name: "梧州自来水厂", type: "water", risk: "中", lat: 23.4870, lng: 111.2691 }
    ]
  },

  // ===== 内蒙古 =====
  huhehaote: {
    name: "呼和浩特",
    center: [111.7492, 40.8427],
    shelters: [
      { id: "hhht_001", name: "新华广场地下人防工程", type: "civil", level: "核6级", lat: 40.8527, lng: 111.7292, capacity: 5000, facilities: "三防系统、应急供电", access: "新华广场地下入口" },
      { id: "hhht_002", name: "呼和浩特东站地下避难所", type: "transport", level: "核6级", lat: 40.8127, lng: 111.8092, capacity: 7000, facilities: "大型通风、储水设施", access: "呼和浩特东站地下广场" },
      { id: "hhht_003", name: "中山西路地下人防商城", type: "mall", level: "核6级", lat: 40.8427, lng: 111.7692, capacity: 4000, facilities: "密闭门、滤毒通风", access: "中山西路地下商业街" }
    ],
    targets: [
      { id: "hhht_nt001", name: "呼和浩特白塔机场", type: "airport", risk: "中", lat: 40.8527, lng: 111.8192 },
      { id: "hhht_nt002", name: "呼和浩特热电厂", type: "power", risk: "高", lat: 40.8227, lng: 111.7392 },
      { id: "hhht_nt003", name: "蒙牛乳业", type: "factory", risk: "中", lat: 40.7127, lng: 111.6892 },
      { id: "hhht_nt004", name: "呼和浩特自来水厂", type: "water", risk: "中", lat: 40.8627, lng: 111.7592 }
    ]
  },

  baotou: {
    name: "包头",
    center: [109.8404, 40.6574],
    shelters: [
      { id: "bt_001", name: "银河广场地下人防工程", type: "civil", level: "核6级", lat: 40.6674, lng: 109.8204, capacity: 4500, facilities: "三防系统、应急供电", access: "银河广场地下入口" },
      { id: "bt_002", name: "包头站地下避难所", type: "transport", level: "核6级", lat: 40.6374, lng: 109.9004, capacity: 6000, facilities: "大型通风、储水设施", access: "包头站地下广场" },
      { id: "bt_003", name: "钢铁大街地下人防工程", type: "civil", level: "核6级", lat: 40.6574, lng: 109.8604, capacity: 3500, facilities: "密闭门、滤毒通风", access: "钢铁大街地下通道" }
    ],
    targets: [
      { id: "bt_nt001", name: "包头东河机场", type: "airport", risk: "中", lat: 40.5674, lng: 110.0104 },
      { id: "bt_nt002", name: "包钢集团", type: "factory", risk: "高", lat: 40.7074, lng: 109.7804 },
      { id: "bt_nt003", name: "包头第一热电厂", type: "power", risk: "高", lat: 40.6774, lng: 109.8404 },
      { id: "bt_nt004", name: "包头稀土高新区", type: "factory", risk: "中", lat: 40.6174, lng: 109.9104 }
    ]
  },

  wuhai: {
    name: "乌海",
    center: [106.7957, 39.6530],
    shelters: [
      { id: "wh_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 39.6630, lng: 106.7757, capacity: 3000, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "wh_002", name: "乌海站地下避难所", type: "transport", level: "核6级", lat: 39.6430, lng: 106.8357, capacity: 4000, facilities: "大型通风、储水设施", access: "乌海站地下广场" },
      { id: "wh_003", name: "新华大街地下人防工程", type: "civil", level: "核6级", lat: 39.6530, lng: 106.8057, capacity: 2500, facilities: "密闭门、滤毒通风", access: "新华大街地下通道" }
    ],
    targets: [
      { id: "wh_nt001", name: "乌海机场", type: "airport", risk: "中", lat: 39.7930, lng: 106.8057 },
      { id: "wh_nt002", name: "神华乌海能源", type: "mine", risk: "高", lat: 39.6830, lng: 106.7257 },
      { id: "wh_nt003", name: "乌海发电厂", type: "power", risk: "高", lat: 39.6730, lng: 106.8157 },
      { id: "wh_nt004", name: "乌海自来水厂", type: "water", risk: "中", lat: 39.6630, lng: 106.7957 }
    ]
  },

  // ===== 海南 =====
  sanya: {
    name: "三亚",
    center: [109.5121, 18.2528],
    shelters: [
      { id: "sy_001", name: "三亚湾地下人防工程", type: "civil", level: "核6级", lat: 18.2628, lng: 109.4921, capacity: 4000, facilities: "三防系统、应急供电", access: "三亚湾地下入口" },
      { id: "sy_002", name: "三亚站地下避难所", type: "transport", level: "核6级", lat: 18.3028, lng: 109.5621, capacity: 5500, facilities: "大型通风、储水设施", access: "三亚站地下广场" },
      { id: "sy_003", name: "解放路地下人防商城", type: "mall", level: "核6级", lat: 18.2728, lng: 109.5221, capacity: 3500, facilities: "密闭门、滤毒通风", access: "解放路地下商业街" }
    ],
    targets: [
      { id: "sy_nt001", name: "三亚凤凰机场", type: "airport", risk: "高", lat: 18.3028, lng: 109.4121 },
      { id: "sy_nt002", name: "三亚南山港", type: "port", risk: "中", lat: 18.2928, lng: 109.2021 },
      { id: "sy_nt003", name: "南山电厂", type: "power", risk: "高", lat: 18.3428, lng: 109.2021 },
      { id: "sy_nt004", name: "三亚自来水厂", type: "water", risk: "中", lat: 18.2628, lng: 109.5021 }
    ]
  },

  // ===== 新疆 =====
  kuerle: {
    name: "库尔勒",
    center: [86.1746, 41.7259],
    shelters: [
      { id: "kele_001", name: "人民广场地下人防工程", type: "civil", level: "核6级", lat: 41.7359, lng: 86.1546, capacity: 3000, facilities: "三防系统、应急供电", access: "人民广场地下入口" },
      { id: "kele_002", name: "库尔勒站地下避难所", type: "transport", level: "核6级", lat: 41.7059, lng: 86.2146, capacity: 4500, facilities: "大型通风、储水设施", access: "库尔勒站地下广场" },
      { id: "kele_003", name: "人民路地下人防工程", type: "civil", level: "核6级", lat: 41.7259, lng: 86.1746, capacity: 2500, facilities: "密闭门、滤毒通风", access: "人民路地下通道" }
    ],
    targets: [
      { id: "kele_nt001", name: "库尔勒机场", type: "airport", risk: "中", lat: 41.6159, lng: 86.1446 },
      { id: "kele_nt002", name: "塔里木油田", type: "chemical", risk: "高", lat: 41.6259, lng: 85.9946 },
      { id: "kele_nt003", name: "库尔勒发电厂", type: "power", risk: "高", lat: 41.7459, lng: 86.1646 },
      { id: "kele_nt004", name: "库尔勒自来水厂", type: "water", risk: "中", lat: 41.7359, lng: 86.1846 }
    ]
  },

  shihezi: {
    name: "石河子",
    center: [86.0411, 44.3059],
    shelters: [
      { id: "shz_001", name: "军垦博物馆地下人防工程", type: "civil", level: "核6级", lat: 44.3159, lng: 86.0211, capacity: 3000, facilities: "三防系统、应急供电", access: "军垦博物馆地下入口" },
      { id: "shz_002", name: "石河子站地下避难所", type: "transport", level: "核6级", lat: 44.2859, lng: 86.0811, capacity: 4000, facilities: "大型通风、储水设施", access: "石河子站地下广场" },
      { id: "shz_003", name: "北子午路地下人防工程", type: "civil", level: "核6级", lat: 44.3059, lng: 86.0411, capacity: 2500, facilities: "密闭门、滤毒通风", access: "北子午路地下通道" }
    ],
    targets: [
      { id: "shz_nt001", name: "石河子花园机场", type: "airport", risk: "中", lat: 44.3259, lng: 86.0811 },
      { id: "shz_nt002", name: "天业集团", type: "chemical", risk: "高", lat: 44.2859, lng: 86.0111 },
      { id: "shz_nt003", name: "石河子发电厂", type: "power", risk: "高", lat: 44.3259, lng: 86.0611 },
      { id: "shz_nt004", name: "石河子自来水厂", type: "water", risk: "中", lat: 44.3159, lng: 86.0311 }
    ]
  },

  hamishi: {
    name: "哈密",
    center: [93.5153, 42.8259],
    shelters: [
      { id: "hm_001", name: "时代广场地下人防工程", type: "civil", level: "核6级", lat: 42.8359, lng: 93.4953, capacity: 2500, facilities: "三防系统、应急供电", access: "时代广场地下入口" },
      { id: "hm_002", name: "哈密站地下避难所", type: "transport", level: "核6级", lat: 42.8059, lng: 93.5553, capacity: 4000, facilities: "大型通风、储水设施", access: "哈密站地下广场" },
      { id: "hm_003", name: "中山北路地下人防工程", type: "civil", level: "核6级", lat: 42.8259, lng: 93.5153, capacity: 2000, facilities: "密闭门、滤毒通风", access: "中山北路地下通道" }
    ],
    targets: [
      { id: "hm_nt001", name: "哈密机场", type: "airport", risk: "中", lat: 42.9159, lng: 93.6853 },
      { id: "hm_nt002", name: "国投哈密电厂", type: "power", risk: "高", lat: 42.7559, lng: 93.4253 },
      { id: "hm_nt003", name: "哈密煤矿", type: "mine", risk: "中", lat: 42.6559, lng: 93.3153 },
      { id: "hm_nt004", name: "哈密自来水厂", type: "water", risk: "中", lat: 42.8359, lng: 93.5253 }
    ]
  }
};

  // ===== 补充城市 =====
  neijiang: {
    name: "内江",
    center: [105.0584, 29.5802],
    shelters: [
      { id: "nj_001", name: "大洲广场地下人防工程", type: "civil", level: "核6级", lat: 29.5902, lng: 105.0384, capacity: 3000, facilities: "三防系统、应急供电", access: "大洲广场地下入口" },
      { id: "nj_002", name: "内江北站地下避难所", type: "transport", level: "核6级", lat: 29.5502, lng: 105.1084, capacity: 4500, facilities: "大型通风、储水设施", access: "内江北站地下广场" },
      { id: "nj_003", name: "天津街地下人防工程", type: "civil", level: "核6级", lat: 29.5802, lng: 105.0684, capacity: 2500, facilities: "密闭门、滤毒通风", access: "天津街地下通道" }
    ],
    targets: [
      { id: "nj_nt001", name: "内江发电厂", type: "power", risk: "高", lat: 29.6002, lng: 105.0484 },
      { id: "nj_nt002", name: "川威集团", type: "factory", risk: "中", lat: 29.6202, lng: 105.0284 },
      { id: "nj_nt003", name: "内江自来水厂", type: "water", risk: "中", lat: 29.5902, lng: 105.0584 },
      { id: "nj_nt004", name: "成渝高铁内江大桥", type: "bridge", risk: "低", lat: 29.5702, lng: 105.0984 }
    ]
  },

  suining: {
    name: "遂宁",
    center: [105.5929, 30.5329],
    shelters: [
      { id: "sn_001", name: "观音湖地下人防工程", type: "civil", level: "核6级", lat: 30.5429, lng: 105.5729, capacity: 3000, facilities: "三防系统、应急供电", access: "观音湖地下入口" },
      { id: "sn_002", name: "遂宁站地下避难所", type: "transport", level: "核6级", lat: 30.5029, lng: 105.6529, capacity: 4500, facilities: "大型通风、储水设施", access: "遂宁站地下广场" },
      { id: "sn_003", name: "遂州中路地下人防工程", type: "civil", level: "核6级", lat: 30.5329, lng: 105.6129, capacity: 2500, facilities: "密闭门、滤毒通风", access: "遂州中路地下通道" }
    ],
    targets: [
      { id: "sn_nt001", name: "遂宁机场", type: "airport", risk: "中", lat: 30.6029, lng: 105.5529 },
      { id: "sn_nt002", name: "遂宁发电厂", type: "power", risk: "高", lat: 30.5529, lng: 105.5929 },
      { id: "sn_nt003", name: "遂宁自来水厂", type: "water", risk: "中", lat: 30.5429, lng: 105.5829 },
      { id: "sn_nt004", name: "遂宁纺织厂", type: "factory", risk: "中", lat: 30.5629, lng: 105.5729 }
    ]
  },

  xianyang: {
    name: "咸阳",
    center: [108.7050, 34.3334],
    shelters: [
      { id: "xianyang_001", name: "统一广场地下人防工程", type: "civil", level: "核6级", lat: 34.3434, lng: 108.6850, capacity: 3500, facilities: "三防系统、应急供电", access: "统一广场地下入口" },
      { id: "xianyang_002", name: "咸阳秦都站地下避难所", type: "transport", level: "核6级", lat: 34.3234, lng: 108.7450, capacity: 5000, facilities: "大型通风、储水设施", access: "咸阳秦都站地下广场" },
      { id: "xianyang_003", name: "人民中路地下人防商城", type: "mall", level: "核6级", lat: 34.3434, lng: 108.7150, capacity: 3000, facilities: "密闭门、滤毒通风", access: "人民中路地下商业街" }
    ],
    targets: [
      { id: "xianyang_nt001", name: "咸阳机场", type: "airport", risk: "高", lat: 34.4334, lng: 108.7650 },
      { id: "xianyang_nt002", name: "咸阳发电厂", type: "power", risk: "高", lat: 34.3634, lng: 108.6950 },
      { id: "xianyang_nt003", name: "彩虹集团", type: "factory", risk: "中", lat: 34.3834, lng: 108.6850 },
      { id: "xianyang_nt004", name: "咸阳自来水厂", type: "water", risk: "中", lat: 34.3534, lng: 108.7050 }
    ]
  },

  weinan: {
    name: "渭南",
    center: [109.5098, 34.4999],
    shelters: [
      { id: "wn_001", name: "中心广场地下人防工程", type: "civil", level: "核6级", lat: 34.5099, lng: 109.4898, capacity: 3000, facilities: "三防系统、应急供电", access: "中心广场地下入口" },
      { id: "wn_002", name: "渭南北站地下避难所", type: "transport", level: "核6级", lat: 34.5099, lng: 109.5698, capacity: 4500, facilities: "大型通风、储水设施", access: "渭南北站地下广场" },
      { id: "wn_003", name: "东风大街地下人防工程", type: "civil", level: "核6级", lat: 34.4999, lng: 109.5298, capacity: 2500, facilities: "密闭门、滤毒通风", access: "东风大街地下通道" }
    ],
    targets: [
      { id: "wn_nt001", name: "渭河发电厂", type: "power", risk: "高", lat: 34.5299, lng: 109.4998 },
      { id: "wn_nt002", name: "陕化集团", type: "chemical", risk: "高", lat: 34.5599, lng: 109.5498 },
      { id: "wn_nt003", name: "渭南自来水厂", type: "water", risk: "中", lat: 34.5099, lng: 109.5198 },
      { id: "wn_nt004", name: "渭南火车站", type: "transport", risk: "中", lat: 34.5199, lng: 109.5098 }
    ]
  },

  anshun: {
    name: "安顺",
    center: [105.9322, 26.2453],
    shelters: [
      { id: "as_001", name: "虹山湖地下人防工程", type: "civil", level: "核6级", lat: 26.2553, lng: 105.9122, capacity: 2500, facilities: "三防系统、应急供电", access: "虹山湖地下入口" },
      { id: "as_002", name: "安顺西站地下避难所", type: "transport", level: "核6级", lat: 26.2253, lng: 105.9822, capacity: 4000, facilities: "大型通风、储水设施", access: "安顺西站地下广场" },
      { id: "as_003", name: "中华东路地下人防工程", type: "civil", level: "核6级", lat: 26.2453, lng: 105.9422, capacity: 2000, facilities: "密闭门、滤毒通风", access: "中华东路地下通道" }
    ],
    targets: [
      { id: "as_nt001", name: "安顺黄果树机场", type: "airport", risk: "中", lat: 26.2653, lng: 105.8922 },
      { id: "as_nt002", name: "安顺发电厂", type: "power", risk: "高", lat: 26.2353, lng: 105.9522 },
      { id: "as_nt003", name: "安顺自来水厂", type: "water", risk: "中", lat: 26.2553, lng: 105.9222 },
      { id: "as_nt004", name: "黎阳航空发动机", type: "military", risk: "高", lat: 26.2153, lng: 105.9622 }
    ]
  },

  tongchuan: {
    name: "铜川",
    center: [108.9446, 34.8967],
    shelters: [
      { id: "tc_001", name: "阳光广场地下人防工程", type: "civil", level: "核6级", lat: 34.9067, lng: 108.9246, capacity: 2500, facilities: "三防系统、应急供电", access: "阳光广场地下入口" },
      { id: "tc_002", name: "铜川站地下避难所", type: "transport", level: "核6级", lat: 34.9167, lng: 108.9846, capacity: 4000, facilities: "大型通风、储水设施", access: "铜川站地下广场" },
      { id: "tc_003", name: "红旗街地下人防工程", type: "civil", level: "核6级", lat: 34.8967, lng: 108.9546, capacity: 2000, facilities: "密闭门、滤毒通风", access: "红旗街地下通道" }
    ],
    targets: [
      { id: "tc_nt001", name: "铜川发电厂", type: "power", risk: "高", lat: 34.9167, lng: 108.9346 },
      { id: "tc_nt002", name: "铜川煤矿", type: "mine", risk: "中", lat: 34.9567, lng: 108.8846 },
      { id: "tc_nt003", name: "铜川自来水厂", type: "water", risk: "中", lat: 34.9067, lng: 108.9446 },
      { id: "tc_nt004", name: "耀州瓷厂", type: "factory", risk: "中", lat: 34.8767, lng: 108.9746 }
    ]
  },

  dingxi: {
    name: "定西",
    center: [104.6263, 35.5796],
    shelters: [
      { id: "dx_001", name: "友谊广场地下人防工程", type: "civil", level: "核6级", lat: 35.5896, lng: 104.6063, capacity: 2500, facilities: "三防系统、应急供电", access: "友谊广场地下入口" },
      { id: "dx_002", name: "定西北站地下避难所", type: "transport", level: "核6级", lat: 35.5896, lng: 104.6863, capacity: 4000, facilities: "大型通风、储水设施", access: "定西北站地下广场" },
      { id: "dx_003", name: "解放路地下人防工程", type: "civil", level: "核6级", lat: 35.5796, lng: 104.6463, capacity: 2000, facilities: "密闭门、滤毒通风", access: "解放路地下通道" }
    ],
    targets: [
      { id: "dx_nt001", name: "定西发电厂", type: "power", risk: "高", lat: 35.5996, lng: 104.6263 },
      { id: "dx_nt002", name: "定西自来水厂", type: "water", risk: "中", lat: 35.5896, lng: 104.6163 },
      { id: "dx_nt003", name: "陇海铁路定西大桥", type: "bridge", risk: "低", lat: 35.6096, lng: 104.5963 },
      { id: "dx_nt004", name: "定西制药厂", type: "factory", risk: "中", lat: 35.5696, lng: 104.6363 }
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = REMAINING_CITIES_DATA;
}