// ============================================
// 核战争城市自救地球仪 - 数据批次7：广西14城市 + 海南4城市 + 西藏7城市 + 贵州9城市
// ============================================

const PART7_CITIES = {
  // ========== 广西壮族自治区14城市 ==========
  "nanning": {
    name: "南宁",
    center: [108.3665, 22.8170],
    shelters: [
      { id: "nn_001", name: "民族广场地下掩体", type: "government", level: "核5级", lat: 22.8270, lng: 108.3665, capacity: 4500, facilities: "市中心、深埋20米", access: "民族大道入口" },
      { id: "nn_002", name: "南湖地下人防", type: "civil", level: "核6级", lat: 22.8470, lng: 108.3765, capacity: 4000, facilities: "湖区地下、防潮", access: "南湖入口" },
      { id: "nn_003", name: "南宁站地下避难所", type: "transport", level: "核5级", lat: 22.8070, lng: 108.3265, capacity: 5500, facilities: "铁路枢纽掩体", access: "南宁站B1" },
      { id: "nn_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 22.7870, lng: 108.4165, capacity: 6000, facilities: "高铁枢纽", access: "南宁东站B1" },
      { id: "nn_005", name: "青秀山地下人防", type: "civil", level: "核6级", lat: 22.7870, lng: 108.3965, capacity: 5000, facilities: "景区山体掩体", access: "青秀山景区" }
    ],
    nuclearTargets: [
      { id: "nn_nt001", name: "南宁电厂", type: "power", risk: "high", lat: 22.8570, lng: 108.3065, radius: 5000, description: "主力发电厂" },
      { id: "nn_nt002", name: "邕江大桥", type: "bridge", risk: "high", lat: 22.8170, lng: 108.3665, radius: 3000, description: "跨江大桥" },
      { id: "nn_nt003", name: "南宁吴圩机场", type: "transport", risk: "high", lat: 22.6370, lng: 108.1865, radius: 5000, description: "国际航空枢纽" }
    ]
  },
  "liuzhou": {
    name: "柳州",
    center: [109.4280, 24.3263],
    shelters: [
      { id: "lz_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 24.3263, lng: 109.4280, capacity: 4000, facilities: "市中心、深埋20米", access: "人民广场入口" },
      { id: "lz_002", name: "柳侯公园地下人防", type: "civil", level: "核6级", lat: 24.3463, lng: 109.4380, capacity: 3500, facilities: "公园地下", access: "柳侯公园" },
      { id: "lz_003", name: "柳州站地下避难所", type: "transport", level: "核5级", lat: 24.3063, lng: 109.4480, capacity: 5000, facilities: "铁路枢纽", access: "柳州站B1" },
      { id: "lz_004", name: "柳钢地下防护", type: "civil", level: "核6级", lat: 24.3863, lng: 109.3480, capacity: 5500, facilities: "厂区地下掩体", access: "柳钢专用" }
    ],
    nuclearTargets: [
      { id: "lz_nt001", name: "柳州钢铁", type: "factory", risk: "high", lat: 24.3863, lng: 109.3480, radius: 6000, description: "大型钢铁" },
      { id: "lz_nt002", name: "柳州电厂", type: "power", risk: "high", lat: 24.3663, lng: 109.4680, radius: 5000, description: "主力发电厂" },
      { id: "lz_nt003", name: "柳江大桥", type: "bridge", risk: "high", lat: 24.3163, lng: 109.4180, radius: 3000, description: "战略桥梁" }
    ]
  },
  "guilin": {
    name: "桂林",
    center: [110.2993, 25.2740],
    shelters: [
      { id: "gl_001", name: "中心广场地下掩体", type: "government", level: "核5级", lat: 25.2740, lng: 110.2993, capacity: 4000, facilities: "市中心、深埋20米", access: "中山中路入口" },
      { id: "gl_002", name: "象鼻山地下人防", type: "civil", level: "核6级", lat: 25.2540, lng: 110.3093, capacity: 3500, facilities: "景区岩洞掩体", access: "象山景区" },
      { id: "gl_003", name: "桂林站地下避难所", type: "transport", level: "核5级", lat: 25.2440, lng: 110.2893, capacity: 4500, facilities: "铁路枢纽", access: "桂林站B1" },
      { id: "gl_004", name: "两江四湖地下防护", type: "civil", level: "核6级", lat: 25.2840, lng: 110.3193, capacity: 5000, facilities: "水系地下掩体", access: "两江四湖入口" }
    ],
    nuclearTargets: [
      { id: "gl_nt001", name: "桂林电厂", type: "power", risk: "high", lat: 25.2940, lng: 110.3293, radius: 5000, description: "火力发电厂" },
      { id: "gl_nt002", name: "桂林两江机场", type: "transport", risk: "high", lat: 25.2140, lng: 110.0493, radius: 5000, description: "国际机场" }
    ]
  },
  "qinzhou": { name: "钦州", center: [108.6541, 21.9797], shelters: [{ id: "qz_001", name: "钦州港地下掩体", type: "government", level: "核5级", lat: 21.9797, lng: 108.6541, capacity: 3000, facilities: "港口区地下", access: "钦州港入口" }], nuclearTargets: [{ id: "qz_nt001", name: "钦州港", type: "port", risk: "high", lat: 21.9597, lng: 108.6941, radius: 5000, description: "重要港口" }] },
  "beihai": { name: "北海", center: [109.1202, 21.4812], shelters: [{ id: "bh_001", name: "北部湾广场地下掩体", type: "government", level: "核5级", lat: 21.4812, lng: 109.1202, capacity: 3500, facilities: "市中心、深埋18米", access: "北部湾路入口" }, { id: "bh_002", name: "银滩地下人防", type: "civil", level: "核6级", lat: 21.6612, lng: 109.1402, capacity: 3000, facilities: "海滨地下", access: "银滩景区" }], nuclearTargets: [{ id: "bh_nt001", name: "北海港", type: "port", risk: "high", lat: 21.4612, lng: 109.1602, radius: 5000, description: "重要港口" }, { id: "bh_nt002", name: "北海机场", type: "transport", risk: "medium", lat: 21.5412, lng: 109.3002, radius: 4000, description: "机场" }] },
  "wuzhou": { name: "梧州", center: [111.2791, 23.4770], shelters: [{ id: "wz_001", name: "中山路地下掩体", type: "government", level: "核5级", lat: 23.4770, lng: 111.2791, capacity: 2800, facilities: "市中心、深埋18米", access: "中山路入口" }], nuclearTargets: [{ id: "wz_nt001", name: "长洲水电站", type: "power", risk: "high", lat: 23.4770, lng: 111.2791, radius: 5000, description: "大型水电站" }] },
  "guigang": { name: "贵港", center: [109.5989, 23.1115], shelters: [{ id: "gg_001", name: "新世纪广场地下掩体", type: "government", level: "核5级", lat: 23.1115, lng: 109.5989, capacity: 2800, facilities: "市中心、深埋18米", access: "金港大道入口" }], nuclearTargets: [{ id: "gg_nt001", name: "贵港电厂", type: "power", risk: "high", lat: 23.1315, lng: 109.6189, radius: 5000, description: "主力发电厂" }] },
  "yulin": { name: "玉林", center: [110.1812, 22.6545], shelters: [{ id: "yl_001", name: "人民东路地下掩体", type: "government", level: "核5级", lat: 22.6545, lng: 110.1812, capacity: 3000, facilities: "市中心、深埋18米", access: "人民东路入口" }], nuclearTargets: [{ id: "yl_nt001", name: "玉林电厂", type: "power", risk: "high", lat: 22.6745, lng: 110.2012, radius: 5000, description: "火力发电厂" }] },
  "baise": { name: "百色", center: [106.6181, 23.9023], shelters: [{ id: "bs3_001", name: "向阳路地下掩体", type: "government", level: "核5级", lat: 23.9023, lng: 106.6181, capacity: 2600, facilities: "市中心、深埋18米", access: "向阳路入口" }], nuclearTargets: [{ id: "bs3_nt001", name: "百色水利枢纽", type: "dam", risk: "high", lat: 23.7223, lng: 106.4981, radius: 5000, description: "大型水利枢纽" }] },
  "hechi": { name: "河池", center: [108.0855, 24.6928], shelters: [{ id: "hc_001", name: "金城江地下掩体", type: "government", level: "核5级", lat: 24.6928, lng: 108.0855, capacity: 2500, facilities: "市中心、深埋18米", access: "金城江入口" }], nuclearTargets: [{ id: "hc_nt001", name: "龙滩水电站", type: "dam", risk: "high", lat: 24.9528, lng: 107.1455, radius: 6000, description: "大型水电站" }] },
  "laibin": { name: "来宾", center: [109.2286, 23.7525], shelters: [{ id: "lb_001", name: "人民路地下掩体", type: "government", level: "核5级", lat: 23.7525, lng: 109.2286, capacity: 2400, facilities: "市中心、深埋18米", access: "人民路入口" }], nuclearTargets: [{ id: "lb_nt001", name: "来宾电厂", type: "power", risk: "high", lat: 23.7725, lng: 109.2486, radius: 5000, description: "火力发电厂" }] },
  "hezhou": { name: "贺州", center: [111.5667, 24.4036], shelters: [{ id: "hz2_001", name: "建设路地下掩体", type: "government", level: "核5级", lat: 24.4036, lng: 111.5667, capacity: 2400, facilities: "市中心、深埋18米", access: "建设路入口" }], nuclearTargets: [{ id: "hz2_nt001", name: "贺州电厂", type: "power", risk: "high", lat: 24.4236, lng: 111.5867, radius: 5000, description: "火力发电厂" }] },
  "fangchenggang": { name: "防城港", center: [108.3556, 21.6861], shelters: [{ id: "fcg_001", name: "兴港大道地下掩体", type: "government", level: "核5级", lat: 21.6861, lng: 108.3556, capacity: 2800, facilities: "港口区地下", access: "兴港大道入口" }], nuclearTargets: [{ id: "fcg_nt001", name: "防城港", type: "port", risk: "high", lat: 21.6661, lng: 108.3756, radius: 5000, description: "重要港口" }, { id: "fcg_nt002", name: "核电站", type: "nuclear", risk: "critical", lat: 21.7261, lng: 108.2956, radius: 10000, description: "核电基地" }] },
  "chongzuo": { name: "崇左", center: [107.3651, 22.3776], shelters: [{ id: "cz6_001", name: "友谊大道地下掩体", type: "government", level: "核5级", lat: 22.3776, lng: 107.3651, capacity: 2200, facilities: "边境区地下", access: "友谊大道入口" }], nuclearTargets: [{ id: "cz6_nt001", name: "崇左电厂", type: "power", risk: "high", lat: 22.3976, lng: 107.3851, radius: 5000, description: "火力发电厂" }] },

  // ========== 海南省4城市 ==========
  "haikou": {
    name: "海口",
    center: [110.3492, 20.0440],
    shelters: [
      { id: "hk_001", name: "万绿园地下掩体", type: "government", level: "核5级", lat: 20.0440, lng: 110.3492, capacity: 4000, facilities: "滨海区地下、防潮", access: "滨海大道入口" },
      { id: "hk_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 20.0340, lng: 110.3292, capacity: 3500, facilities: "市中心地下", access: "海秀路入口" },
      { id: "hk_003", name: "秀英港地下防护", type: "port", level: "核5级", lat: 20.0240, lng: 110.2892, capacity: 5000, facilities: "港口区深层掩体", access: "秀英港专用" }
    ],
    nuclearTargets: [
      { id: "hk_nt001", name: "海口港", type: "port", risk: "high", lat: 20.0140, lng: 110.2692, radius: 5000, description: "重要港口" },
      { id: "hk_nt002", name: "海口美兰机场", type: "transport", risk: "high", lat: 19.9340, lng: 110.4592, radius: 5000, description: "国际航空枢纽" }
    ]
  },
  "sanya": {
    name: "三亚",
    center: [109.5120, 18.2528],
    shelters: [
      { id: "sy5_001", name: "解放路地下掩体", type: "government", level: "核5级", lat: 18.2528, lng: 109.5120, capacity: 3500, facilities: "市中心、深埋18米", access: "解放路入口" },
      { id: "sy5_002", name: "亚龙湾地下人防", type: "civil", level: "核6级", lat: 18.2928, lng: 109.6520, capacity: 3000, facilities: "海滨度假区地下", access: "亚龙湾入口" },
      { id: "sy5_003", name: "凤凰岛地下防护", type: "civil", level: "核6级", lat: 18.2428, lng: 109.4920, capacity: 2800, facilities: "人工岛地下掩体", access: "凤凰岛专用" }
    ],
    nuclearTargets: [
      { id: "sy5_nt001", name: "三亚凤凰机场", type: "transport", risk: "high", lat: 18.3028, lng: 109.4120, radius: 5000, description: "国际机场" },
      { id: "sy5_nt002", name: "三亚港", type: "port", risk: "high", lat: 18.2328, lng: 109.5020, radius: 4000, description: "邮轮母港" },
      { id: "sy5_nt003", name: "南山港", type: "port", risk: "high", lat: 18.2928, lng: 109.0920, radius: 5000, description: "军民用港口" }
    ]
  },
  "sansha": { name: "三沙", center: [112.3408, 16.8327], shelters: [{ id: "ss_001", name: "永兴岛地下掩体", type: "military", level: "核4级", lat: 16.8327, lng: 112.3408, capacity: 3000, facilities: "岛礁地下、顶级防护", access: "军用通道" }], nuclearTargets: [{ id: "ss_nt001", name: "永兴岛基地", type: "military", risk: "critical", lat: 16.8327, lng: 112.3408, radius: 8000, description: "南海战略基地" }] },
  "danzhou": { name: "儋州", center: [109.5808, 19.5214], shelters: [{ id: "dz_001", name: "那大地下掩体", type: "government", level: "核5级", lat: 19.5214, lng: 109.5808, capacity: 2600, facilities: "市中心、深埋18米", access: "那大镇入口" }], nuclearTargets: [{ id: "dz_nt001", name: "洋浦港", type: "port", risk: "high", lat: 19.7314, lng: 109.1808, radius: 5000, description: "重要港口" }] },

  // ========== 西藏自治区7城市 ==========
  "lasa": {
    name: "拉萨",
    center: [91.1409, 29.6456],
    shelters: [
      { id: "ls_001", name: "布达拉宫广场地下掩体", type: "government", level: "核5级", lat: 29.6456, lng: 91.1409, capacity: 4000, facilities: "高原地下、深埋20米", access: "北京中路入口" },
      { id: "ls_002", name: "罗布林卡地下人防", type: "civil", level: "核6级", lat: 29.6556, lng: 91.1209, capacity: 3500, facilities: "园林区地下", access: "罗布林卡路" },
      { id: "ls_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.6256, lng: 91.0709, capacity: 4500, facilities: "青藏铁路枢纽", access: "拉萨站B1" },
      { id: "ls_004", name: "贡嘎机场地下防护", type: "transport", level: "核5级", lat: 29.2956, lng: 90.9109, capacity: 4000, facilities: "机场深层掩体", access: "贡嘎机场" }
    ],
    nuclearTargets: [
      { id: "ls_nt001", name: "拉萨电厂", type: "power", risk: "high", lat: 29.6856, lng: 91.1609, radius: 5000, description: "高原电厂" },
      { id: "ls_nt002", name: "贡嘎机场", type: "transport", risk: "high", lat: 29.2956, lng: 90.9109, radius: 5000, description: "高原机场" }
    ]
  },
  "rikaze": { name: "日喀则", center: [88.8825, 29.2670], shelters: [{ id: "rkz_001", name: "珠峰路地下掩体", type: "government", level: "核5级", lat: 29.2670, lng: 88.8825, capacity: 2800, facilities: "高原地下", access: "珠峰路入口" }], nuclearTargets: [{ id: "rkz_nt001", name: "日喀则机场", type: "transport", risk: "medium", lat: 29.3070, lng: 89.3025, radius: 4000, description: "高原机场" }] },
  "linzhi": { name: "林芝", center: [94.3615, 29.6494], shelters: [{ id: "lz2_001", name: "八一镇地下掩体", type: "government", level: "核5级", lat: 29.6494, lng: 94.3615, capacity: 2600, facilities: "高原林区地下", access: "八一大街入口" }], nuclearTargets: [{ id: "lz2_nt001", name: "林芝机场", type: "transport", risk: "medium", lat: 29.3094, lng: 94.3315, radius: 4000, description: "高原机场" }] },
  "changdu": { name: "昌都", center: [97.1720, 31.1404], shelters: [{ id: "cd3_001", name: "茶马广场地下掩体", type: "government", level: "核5级", lat: 31.1404, lng: 97.1720, capacity: 2400, facilities: "高原地下", access: "茶马广场" }], nuclearTargets: [{ id: "cd3_nt001", name: "昌都邦达机场", type: "transport", risk: "medium", lat: 30.5604, lng: 97.4320, radius: 4000, description: "高原机场" }] },
  "shannan": { name: "山南", center: [91.7730, 29.2371], shelters: [{ id: "sn_001", name: "泽当地下掩体", type: "government", level: "核5级", lat: 29.2371, lng: 91.7730, capacity: 2400, facilities: "高原地下", access: "泽当镇入口" }], nuclearTargets: [{ id: "sn_nt001", name: "山南机场", type: "transport", risk: "medium", lat: 28.9571, lng: 90.5630, radius: 4000, description: "高原机场" }] },
  "naqu": { name: "那曲", center: [92.0535, 31.4767], shelters: [{ id: "nq_001", name: "浙江路地下掩体", type: "government", level: "核5级", lat: 31.4767, lng: 92.0535, capacity: 2200, facilities: "高海拔地下", access: "浙江路入口" }], nuclearTargets: [{ id: "nq_nt001", name: "那曲物流中心", type: "transport", risk: "medium", lat: 31.4567, lng: 92.0335, radius: 3000, description: "物流枢纽" }] },
  "ali": { name: "阿里", center: [80.1060, 32.5004], shelters: [{ id: "al_001", name: "狮泉河地下掩体", type: "government", level: "核5级", lat: 32.5004, lng: 80.1060, capacity: 2000, facilities: "极高海拔地下", access: "狮泉河镇" }], nuclearTargets: [{ id: "al_nt001", name: "阿里昆莎机场", type: "transport", risk: "medium", lat: 32.1004, lng: 80.0660, radius: 4000, description: "高原机场" }] },

  // ========== 贵州省9城市 ==========
  "guiyang": {
    name: "贵阳",
    center: [106.6302, 26.6477],
    shelters: [
      { id: "gy_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 26.6477, lng: 106.6302, capacity: 4500, facilities: "市中心、深埋20米", access: "中华北路入口" },
      { id: "gy_002", name: "黔灵山地下人防", type: "civil", level: "核6级", lat: 26.5977, lng: 106.6802, capacity: 4000, facilities: "山体岩洞掩体", access: "黔灵山公园" },
      { id: "gy_003", name: "贵阳北站地下避难所", type: "transport", level: "核5级", lat: 26.6277, lng: 106.7102, capacity: 6000, facilities: "高铁枢纽", access: "贵阳北站B1" },
      { id: "gy_004", name: "龙洞堡机场地下防护", type: "transport", level: "核5级", lat: 26.5377, lng: 106.8002, capacity: 5000, facilities: "机场深层掩体", access: "龙洞堡机场" }
    ],
    nuclearTargets: [
      { id: "gy_nt001", name: "贵阳电厂", type: "power", risk: "high", lat: 26.6877, lng: 106.6502, radius: 5000, description: "主力发电厂" },
      { id: "gy_nt002", name: "贵阳机场", type: "transport", risk: "high", lat: 26.5377, lng: 106.8002, radius: 5000, description: "国际机场" }
    ]
  },
  "zunyi": {
    name: "遵义",
    center: [106.9272, 27.7254],
    shelters: [
      { id: "zy_001", name: "红花岗地下掩体", type: "government", level: "核5级", lat: 27.7254, lng: 106.9272, capacity: 3500, facilities: "市中心、深埋20米", access: "新华路入口" },
      { id: "zy_002", name: "遵义会议会址地下人防", type: "civil", level: "核6级", lat: 27.7454, lng: 106.9372, capacity: 3000, facilities: "老城区地下", access: "子尹路" },
      { id: "zy_003", name: "茅台镇避难所", type: "civil", level: "核6级", lat: 27.8254, lng: 106.3872, capacity: 3500, facilities: "酒厂区地下", access: "茅台镇专用" }
    ],
    nuclearTargets: [
      { id: "zy_nt001", name: "遵义电厂", type: "power", risk: "high", lat: 27.7054, lng: 106.9672, radius: 5000, description: "火力发电厂" },
      { id: "zy_nt002", name: "茅台酒厂", type: "factory", risk: "high", lat: 27.8254, lng: 106.3872, radius: 6000, description: "大型酒厂" }
    ]
  },
  "liupanshui": { name: "六盘水", center: [104.8303, 26.5935], shelters: [{ id: "lps_001", name: "钟山大道地下掩体", type: "government", level: "核5级", lat: 26.5935, lng: 104.8303, capacity: 3000, facilities: "市中心、深埋18米", access: "钟山大道入口" }], nuclearTargets: [{ id: "lps_nt001", name: "六盘水煤矿", type: "factory", risk: "high", lat: 26.5735, lng: 104.8503, radius: 6000, description: "大型煤矿" }] },
  "anshun": { name: "安顺", center: [105.9476, 26.2533], shelters: [{ id: "as2_001", name: "塔山广场地下掩体", type: "government", level: "核5级", lat: 26.2533, lng: 105.9476, capacity: 2800, facilities: "市中心、深埋18米", access: "塔山西路入口" }], nuclearTargets: [{ id: "as2_nt001", name: "黄果树水电站", type: "power", risk: "high", lat: 25.9933, lng: 105.6676, radius: 5000, description: "大型水电站" }] },
  "tongren": { name: "铜仁", center: [109.1896, 27.7317], shelters: [{ id: "tr_001", name: "碧江地下掩体", type: "government", level: "核5级", lat: 27.7317, lng: 109.1896, capacity: 2800, facilities: "市中心、深埋18米", access: "碧江区入口" }], nuclearTargets: [{ id: "tr_nt001", name: "铜仁机场", type: "transport", risk: "medium", lat: 27.8817, lng: 109.3096, radius: 4000, description: "机场" }] },
  "bijie": { name: "毕节", center: [105.2850, 27.3026], shelters: [{ id: "bj_001", name: "七星关地下掩体", type: "government", level: "核5级", lat: 27.3026, lng: 105.2850, capacity: 2800, facilities: "市中心、深埋18米", access: "七星关区入口" }], nuclearTargets: [{ id: "bj_nt001", name: "毕节电厂", type: "power", risk: "high", lat: 27.3226, lng: 105.3050, radius: 5000, description: "火力发电厂" }] },
  "qiandongnan": { name: "黔东南", center: [107.9804, 26.5835], shelters: [{ id: "qdn_001", name: "凯里地下掩体", type: "government", level: "核5级", lat: 26.5835, lng: 107.9804, capacity: 2600, facilities: "州府地下、深埋18米", access: "凯里市区入口" }], nuclearTargets: [{ id: "qdn_nt001", name: "凯里电厂", type: "power", risk: "high", lat: 26.6035, lng: 108.0004, radius: 5000, description: "火力发电厂" }] },
  "qiannan": { name: "黔南", center: [107.5220, 26.2543], shelters: [{ id: "qn_001", name: "都匀地下掩体", type: "government", level: "核5级", lat: 26.2543, lng: 107.5220, capacity: 2600, facilities: "州府地下、深埋18米", access: "都匀市区入口" }], nuclearTargets: [{ id: "qn_nt001", name: "都匀电厂", type: "power", risk: "high", lat: 26.2743, lng: 107.5420, radius: 5000, description: "火力发电厂" }] },
  "qianxinan": { name: "黔西南", center: [104.9026, 25.0938], shelters: [{ id: "qxn_001", name: "兴义地下掩体", type: "government", level: "核5级", lat: 25.0938, lng: 104.9026, capacity: 2600, facilities: "州府地下、深埋18米", access: "兴义市区入口" }], nuclearTargets: [{ id: "qxn_nt001", name: "天生桥水电站", type: "dam", risk: "high", lat: 24.9538, lng: 105.3026, radius: 5000, description: "大型水电站" }] }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PART7_CITIES;
}
