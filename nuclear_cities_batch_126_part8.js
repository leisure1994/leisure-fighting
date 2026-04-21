// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第八部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART8 = {
  // ============================================
  // 华东地区 - 山东省（继续）
  // ============================================
  linyi: {
    name: "临沂",
    center: [118.3565, 35.1047],
    shelters: [
      { id: "ly_lin_001", name: "临沂站地下避难所", type: "shelter", position: [118.3565, 35.1047], address: "临沂市兰山区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "临沂火车站地下", description: "临沂铁路枢纽民防" },
      { id: "ly_lin_002", name: "临沂北站地下避难所", type: "shelter", position: [118.3965, 35.1447], address: "临沂市兰山区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "临沂北站地下", description: "临沂高铁枢纽民防" },
      { id: "ly_lin_003", name: "泰盛广场地下人防", type: "underground_mall", position: [118.3465, 35.0947], address: "临沂市兰山区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "泰盛广场地下", description: "商业中心人防" },
      { id: "ly_lin_004", name: "蒙山地下避难所", type: "shelter", position: [117.7765, 35.5547], address: "临沂市平邑县", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "蒙山景区地下", description: "5A景区人防工程" }
    ],
    targets: [
      { name: "临沂电厂", type: "factory", position: [118.3765, 35.1247], risk: "高" },
      { name: "临沂火车站", type: "transport", position: [118.3565, 35.1047], risk: "中" },
      { name: "临沂港", type: "port", position: [118.5565, 35.0847], risk: "中" }
    ]
  },

  dezhou: {
    name: "德州",
    center: [116.3593, 37.4365],
    shelters: [
      { id: "dz_001", name: "德州东站地下避难所", type: "shelter", position: [116.3993, 37.4765], address: "德州市德城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "德州东站地下", description: "德州高铁枢纽民防" },
      { id: "dz_002", name: "德州站地下避难所", type: "shelter", position: [116.3593, 37.4365], address: "德州市德城区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "德州火车站地下", description: "德州传统火车站民防" },
      { id: "dz_003", name: "澳德乐地下人防", type: "underground_mall", position: [116.3793, 37.4565], address: "德州市德城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "澳德乐地下", description: "商业中心人防" },
      { id: "dz_004", name: "华能德州电厂地下避难所", type: "shelter", position: [116.3193, 37.4165], address: "德州市德城区", capacity: "3000人", level: "核6级", facilities: "电厂配套防护", access: "德州电厂地下", description: "电厂人防工程" }
    ],
    targets: [
      { name: "华能德州电厂", type: "factory", position: [116.3193, 37.4165], risk: "高" },
      { name: "德州火车站", type: "transport", position: [116.3593, 37.4365], risk: "中" },
      { name: "德州恒升化工", type: "factory", position: [116.3393, 37.4565], risk: "中" }
    ]
  },

  liaocheng: {
    name: "聊城",
    center: [115.9912, 36.4629],
    shelters: [
      { id: "lc_001", name: "聊城站地下避难所", type: "shelter", position: [115.9912, 36.4629], address: "聊城市东昌府区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "聊城火车站地下", description: "聊城铁路枢纽民防" },
      { id: "lc_002", name: "金鼎商厦地下人防", type: "underground_mall", position: [115.9812, 36.4529], address: "聊城市东昌府区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "金鼎商厦地下", description: "商业中心人防" },
      { id: "lc_003", name: "光岳楼地下避难所", type: "bunker", position: [115.9712, 36.4429], address: "聊城市东昌府区", capacity: "2000人", level: "核6级", facilities: "古迹配套深层防护", access: "光岳楼地下", description: "古迹人防工程" },
      { id: "lc_004", name: "山陕会馆地下避难所", type: "shelter", position: [116.0112, 36.4829], address: "聊城市东昌府区", capacity: "1500人", level: "核6级", facilities: "文物配套防护", access: "山陕会馆地下", description: "文物保护单位人防" }
    ],
    targets: [
      { name: "聊城中通客车", type: "factory", position: [116.0212, 36.4929], risk: "中" },
      { name: "聊城发电厂", type: "factory", position: [116.0012, 36.4429], risk: "高" },
      { name: "聊城火车站", type: "transport", position: [115.9912, 36.4629], risk: "中" }
    ]
  },

  taian: {
    name: "泰安",
    center: [117.0895, 36.2010],
    shelters: [
      { id: "ta_001", name: "泰山站地下避难所", type: "shelter", position: [117.0895, 36.2010], address: "泰安市泰山区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "泰山火车站地下", description: "泰山铁路枢纽民防" },
      { id: "ta_002", name: "泰安站地下避难所", type: "shelter", position: [117.0495, 36.1810], address: "泰安市岱岳区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "泰安站地下", description: "泰安高铁枢纽民防" },
      { id: "ta_003", name: "银座商城地下人防", type: "underground_mall", position: [117.0995, 36.2110], address: "泰安市泰山区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "银座商城地下", description: "商业中心人防" },
      { id: "ta_004", name: "泰山地下避难所", type: "bunker", position: [117.1295, 36.2610], address: "泰安市泰山区", capacity: "4000人", level: "核5级", facilities: "世界遗产深层防护", access: "泰山景区地下", description: "五岳之首人防工程" }
    ],
    targets: [
      { name: "泰山景区", type: "transport", position: [117.1295, 36.2610], risk: "低" },
      { name: "泰安电厂", type: "factory", position: [117.0695, 36.1910], risk: "高" },
      { name: "泰山火车站", type: "transport", position: [117.0895, 36.2010], risk: "中" }
    ]
  },

  binzhou: {
    name: "滨州",
    center: [117.9725, 37.3834],
    shelters: [
      { id: "bz_001", name: "滨州站地下避难所", type: "shelter", position: [117.9725, 37.3834], address: "滨州市滨城区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "滨州火车站地下", description: "滨州铁路枢纽民防" },
      { id: "bz_002", name: "银座购物地下人防", type: "underground_mall", position: [117.9625, 37.3734], address: "滨州市滨城区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "银座购物地下", description: "商业中心人防" },
      { id: "bz_003", name: "魏桥创业地下避难所", type: "shelter", position: [117.8825, 37.0634], address: "滨州市邹平市", capacity: "3500人", level: "核6级", facilities: "企业配套防护", access: "魏桥创业地下", description: "重要企业人防" },
      { id: "bz_004", name: "中海公园地下避难所", type: "shelter", position: [117.9825, 37.4034], address: "滨州市滨城区", capacity: "2000人", level: "核6级", facilities: "公园配套防护", access: "中海公园地下", description: "公园人防" }
    ],
    targets: [
      { name: "魏桥创业", type: "factory", position: [117.8825, 37.0634], risk: "高" },
      { name: "滨州电厂", type: "factory", position: [117.9925, 37.4134], risk: "高" },
      { name: "滨州火车站", type: "transport", position: [117.9725, 37.3834], risk: "中" }
    ]
  },

  dongying: {
    name: "东营",
    center: [118.6747, 37.4336],
    shelters: [
      { id: "dy_001", name: "东营南站地下避难所", type: "shelter", position: [118.6347, 37.4736], address: "东营市东营区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "东营南站地下", description: "东营高铁枢纽民防" },
      { id: "dy_002", name: "东城银座地下人防", type: "underground_mall", position: [118.6847, 37.4436], address: "东营市东营区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "东城银座地下", description: "商业中心人防" },
      { id: "dy_003", name: "胜利油田地下避难所", type: "bunker", position: [118.5947, 37.3536], address: "东营市东营区", capacity: "5000人", level: "核5级", facilities: "油田深层防护设施", access: "胜利油田地下", description: "第二大油田人防" },
      { id: "dy_004", name: "东营港地下避难所", type: "shelter", position: [118.8747, 38.0336], address: "东营市河口区", capacity: "3000人", level: "核5级", facilities: "港口配套防护", access: "东营港地下", description: "港口人防工程" }
    ],
    targets: [
      { name: "胜利油田", type: "factory", position: [118.5947, 37.3536], risk: "高" },
      { name: "东营港", type: "port", position: [118.8747, 38.0336], risk: "高" },
      { name: "华泰集团", type: "factory", position: [118.6247, 37.3836], risk: "高" },
      { name: "东营电厂", type: "factory", position: [118.7047, 37.4636], risk: "高" }
    ]
  },

  rizhao: {
    name: "日照",
    center: [119.5269, 35.4164],
    shelters: [
      { id: "rz_001", name: "日照西站地下避难所", type: "shelter", position: [119.3469, 35.4564], address: "日照市东港区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "日照西站地下", description: "日照高铁枢纽民防" },
      { id: "rz_002", name: "日照站地下避难所", type: "shelter", position: [119.5469, 35.4164], address: "日照市东港区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "日照火车站地下", description: "日照铁路枢纽民防" },
      { id: "rz_003", name: "万象汇地下人防", type: "underground_mall", position: [119.5369, 35.4064], address: "日照市东港区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "万象汇地下", description: "商业中心人防" },
      { id: "rz_004", name: "日照港地下避难所", type: "bunker", position: [119.5969, 35.3864], address: "日照市东港区", capacity: "4000人", level: "核5级", facilities: "港口配套深层防护", access: "日照港地下", description: "深水大港人防" }
    ],
    targets: [
      { name: "日照港", type: "port", position: [119.5969, 35.3864], risk: "高" },
      { name: "日照钢铁", type: "factory", position: [119.5169, 35.4564], risk: "高" },
      { name: "日照火车站", type: "transport", position: [119.5469, 35.4164], risk: "中" },
      { name: "亚太森博", type: "factory", position: [119.5769, 35.3964], risk: "中" }
    ]
  },

  heze: {
    name: "菏泽",
    center: [115.4807, 35.2336],
    shelters: [
      { id: "hz_001", name: "菏泽东站地下避难所", type: "shelter", position: [115.5207, 35.2736], address: "菏泽市牡丹区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "菏泽东站地下", description: "菏泽高铁枢纽民防" },
      { id: "hz_002", name: "菏泽站地下避难所", type: "shelter", position: [115.4807, 35.2336], address: "菏泽市牡丹区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "菏泽火车站地下", description: "菏泽铁路枢纽民防" },
      { id: "hz_003", name: "银座商城地下人防", type: "underground_mall", position: [115.4707, 35.2236], address: "菏泽市牡丹区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "银座商城地下", description: "商业中心人防" },
      { id: "hz_004", name: "牡丹园地下避难所", type: "shelter", position: [115.4507, 35.2936], address: "菏泽市牡丹区", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "曹州牡丹园地下", description: "景区人防工程" }
    ],
    targets: [
      { name: "菏泽电厂", type: "factory", position: [115.5007, 35.2536], risk: "高" },
      { name: "菏泽火车站", type: "transport", position: [115.4807, 35.2336], risk: "中" },
      { name: "东明石化", type: "factory", position: [115.3407, 35.2936], risk: "高" }
    ]
  },

  // ============================================
  // 华东地区 - 安徽省（剩余城市）
  // ============================================
  wuhu: {
    name: "芜湖",
    center: [118.4329, 31.3526],
    shelters: [
      { id: "wh_wh_001", name: "芜湖站地下避难所", type: "shelter", position: [118.3929, 31.3626], address: "芜湖市镜湖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "芜湖火车站地下", description: "芜湖铁路枢纽民防" },
      { id: "wh_wh_002", name: "芜湖南站地下避难所", type: "shelter", position: [118.3129, 31.3226], address: "芜湖市弋江区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "芜湖南站地下", description: "芜湖高铁枢纽民防" },
      { id: "wh_wh_003", name: "中山路地下人防", type: "underground_mall", position: [118.4229, 31.3426], address: "芜湖市镜湖区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "中山路地下", description: "商业中心人防" },
      { id: "wh_wh_004", name: "方特地下避难所", type: "shelter", position: [118.3629, 31.3826], address: "芜湖市镜湖区", capacity: "3000人", level: "核6级", facilities: "主题乐园配套防护", access: "方特地下", description: "主题乐园人防" }
    ],
    targets: [
      { name: "海螺集团", type: "factory", position: [118.4529, 31.3126], risk: "高" },
      { name: "奇瑞汽车", type: "factory", position: [118.2829, 31.3026], risk: "高" },
      { name: "芜湖火车站", type: "transport", position: [118.3929, 31.3626], risk: "中" },
      { name: "芜湖港", type: "port", position: [118.3529, 31.3926], risk: "中" }
    ]
  },

  bengbu: {
    name: "蚌埠",
    center: [117.3893, 32.9155],
    shelters: [
      { id: "bb_001", name: "蚌埠南站地下避难所", type: "shelter", position: [117.3693, 32.9355], address: "蚌埠市龙子湖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "蚌埠南站地下", description: "蚌埠高铁枢纽民防" },
      { id: "bb_002", name: "蚌埠站地下避难所", type: "shelter", position: [117.3893, 32.9155], address: "蚌埠市蚌山区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "蚌埠火车站地下", description: "蚌埠铁路枢纽民防" },
      { id: "bb_003", name: "百货大楼地下人防", type: "underground_mall", position: [117.3993, 32.9055], address: "蚌埠市蚌山区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "百货大楼地下", description: "商业中心人防" },
      { id: "bb_004", name: "张公山公园地下避难所", type: "shelter", position: [117.3593, 32.8955], address: "蚌埠市禹会区", capacity: "2000人", level: "核6级", facilities: "公园配套防护", access: "张公山公园地下", description: "公园人防" }
    ],
    targets: [
      { name: "蚌埠电厂", type: "factory", position: [117.4193, 32.9355], risk: "高" },
      { name: "丰原集团", type: "factory", position: [117.3393, 32.8855], risk: "中" },
      { name: "蚌埠火车站", type: "transport", position: [117.3893, 32.9155], risk: "中" }
    ]
  },

  anqing: {
    name: "安庆",
    center: [117.0635, 30.5309],
    shelters: [
      { id: "aq_001", name: "安庆站地下避难所", type: "shelter", position: [117.0635, 30.5309], address: "安庆市宜秀区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "安庆火车站地下", description: "安庆铁路枢纽民防" },
      { id: "aq_002", name: "人民路地下人防", type: "underground_mall", position: [117.0535, 30.5209], address: "安庆市迎江区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "人民路地下", description: "商业中心人防" },
      { id: "aq_003", name: "振宜汽车地下避难所", type: "shelter", position: [117.1035, 30.5509], address: "安庆市经开区", capacity: "3000人", level: "核6级", facilities: "汽车企业配套防护", access: "振宜汽车地下", description: "汽车企业人防" },
      { id: "aq_004", name: "天柱山地下避难所", type: "shelter", position: [116.9035, 30.7309], address: "安庆市潜山市", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "天柱山景区地下", description: "5A景区人防" }
    ],
    targets: [
      { name: "安庆石化", type: "factory", position: [117.0235, 30.5109], risk: "高" },
      { name: "安庆电厂", type: "factory", position: [117.0835, 30.5609], risk: "高" },
      { name: "安庆火车站", type: "transport", position: [117.0635, 30.5309], risk: "中" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART8;
}
