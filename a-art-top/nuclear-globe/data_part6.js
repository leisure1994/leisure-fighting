// ============================================
// 核战争城市自救地球仪 - 数据批次6：湖北省12城市 + 湖南省13城市
// ============================================

const PART6_CITIES = {
  // ========== 湖北省12城市 ==========
  "jingzhou": {
    name: "荆州",
    center: [112.2397, 30.3352],
    shelters: [
      { id: "jz3_001", name: "古城地下掩体", type: "government", level: "核5级", lat: 30.3352, lng: 112.2397, capacity: 4000, facilities: "古城墙内、深埋20米", access: "东门/南门入口" },
      { id: "jz3_002", name: "中山公园地下人防", type: "civil", level: "核6级", lat: 30.3452, lng: 112.2497, capacity: 3500, facilities: "大型公园地下、独立通风", access: "公园西路入口" },
      { id: "jz3_003", name: "沙市地下避难所", type: "civil", level: "核6级", lat: 30.3252, lng: 112.2797, capacity: 5000, facilities: "商业中心地下、应急供电", access: "北京路地铁站" },
      { id: "jz3_004", name: "荆州站地下防护", type: "transport", level: "核5级", lat: 30.3152, lng: 112.2097, capacity: 6000, facilities: "高铁站深层掩体", access: "荆州站B1层" },
      { id: "jz3_005", name: "长江大学地下人防", type: "civil", level: "核6级", lat: 30.3552, lng: 112.1897, capacity: 4500, facilities: "校园地下、大型储水", access: "学苑路入口" }
    ],
    nuclearTargets: [
      { id: "jz3_nt001", name: "荆州热电厂", type: "power", risk: "high", lat: 30.3752, lng: 112.2197, radius: 5000, description: "主力发电厂" },
      { id: "jz3_nt002", name: "荆州长江大桥", type: "bridge", risk: "high", lat: 30.3052, lng: 112.2597, radius: 3000, description: "战略桥梁" },
      { id: "jz3_nt003", name: "荆州港", type: "port", risk: "medium", lat: 30.2852, lng: 112.2897, radius: 4000, description: "长江港口" }
    ]
  },
  "yichang": {
    name: "宜昌",
    center: [111.2865, 30.6919],
    shelters: [
      { id: "yc4_001", name: "夷陵广场地下掩体", type: "government", level: "核5级", lat: 30.6919, lng: 111.2865, capacity: 4500, facilities: "市中心、深埋22米", access: "夷陵大道入口" },
      { id: "yc4_002", name: "滨江公园地下人防", type: "civil", level: "核6级", lat: 30.7019, lng: 111.2965, capacity: 4000, facilities: "沿江地下、防潮设施", access: "滨江路入口" },
      { id: "yc4_003", name: "宜昌东站避难所", type: "transport", level: "核5级", lat: 30.6719, lng: 111.3465, capacity: 5500, facilities: "铁路枢纽掩体", access: "宜昌东站B1" },
      { id: "yc4_004", name: "三峡大坝地下防护", type: "dam", level: "核4级", lat: 30.8219, lng: 111.0065, capacity: 8000, facilities: "大坝配套、顶级防护", access: "专用通道" },
      { id: "yc4_005", name: "葛洲坝地下人防", type: "dam", level: "核4级", lat: 30.7319, lng: 111.2765, capacity: 7000, facilities: "船闸区地下", access: "葛洲坝专用" },
      { id: "yc4_006", name: "西陵峡地下避难所", type: "civil", level: "核6级", lat: 30.7819, lng: 111.1165, capacity: 5000, facilities: "景区山体掩体", access: "峡口景区" }
    ],
    nuclearTargets: [
      { id: "yc4_nt001", name: "三峡大坝", type: "dam", risk: "critical", lat: 30.8219, lng: 111.0065, radius: 8000, description: "国家战略目标" },
      { id: "yc4_nt002", name: "葛洲坝", type: "dam", risk: "critical", lat: 30.7319, lng: 111.2765, radius: 6000, description: "重要水利枢纽" },
      { id: "yc4_nt003", name: "宜昌化工厂", type: "chemical", risk: "high", lat: 30.6619, lng: 111.3165, radius: 5000, description: "大型化工基地" }
    ]
  },
  "xiangyang": {
    name: "襄阳",
    center: [112.1225, 32.0090],
    shelters: [
      { id: "xy2_001", name: "古城墙地下掩体", type: "government", level: "核5级", lat: 32.0190, lng: 112.1225, capacity: 4500, facilities: "古城地下、深埋20米", access: "临汉门入口" },
      { id: "xy2_002", name: "诸葛亮广场地下人防", type: "civil", level: "核6级", lat: 32.0290, lng: 112.1325, capacity: 4000, facilities: "广场地下、大型通风", access: "长虹路入口" },
      { id: "xy2_003", name: "襄阳站地下避难所", type: "transport", level: "核5级", lat: 32.0090, lng: 112.1425, capacity: 5000, facilities: "铁路枢纽掩体", access: "襄阳站地下" },
      { id: "xy2_004", name: "东风基地地下防护", type: "civil", level: "核6级", lat: 31.9890, lng: 112.0625, capacity: 6000, facilities: "汽车城地下、大型储水", access: "东风公司专用" }
    ],
    nuclearTargets: [
      { id: "xy2_nt001", name: "东风汽车基地", type: "factory", risk: "high", lat: 31.9890, lng: 112.0625, radius: 6000, description: "大型军工企业" },
      { id: "xy2_nt002", name: "襄阳电厂", type: "power", risk: "high", lat: 32.0390, lng: 112.1625, radius: 5000, description: "主力发电厂" },
      { id: "xy2_nt003", name: "汉江大桥", type: "bridge", risk: "high", lat: 32.0190, lng: 112.1225, radius: 3000, description: "战略桥梁" }
    ]
  },
  "huangshi": {
    name: "黄石",
    center: [115.0385, 30.1995],
    shelters: [
      { id: "hs3_001", name: "黄石港地下掩体", type: "government", level: "核5级", lat: 30.2295, lng: 115.0585, capacity: 3500, facilities: "港口区地下、深埋18米", access: "黄石大道入口" },
      { id: "hs3_002", name: "磁湖地下人防", type: "civil", level: "核6级", lat: 30.2095, lng: 115.0385, capacity: 3000, facilities: "湖区地下", access: "杭州东路入口" },
      { id: "hs3_003", name: "大冶铁矿避难所", type: "civil", level: "核6级", lat: 30.1395, lng: 114.9785, capacity: 4000, facilities: "矿区地下掩体", access: "铁山区专用" }
    ],
    nuclearTargets: [
      { id: "hs3_nt001", name: "大冶铁矿", type: "factory", risk: "high", lat: 30.1395, lng: 114.9785, radius: 6000, description: "大型铁矿" },
      { id: "hs3_nt002", name: "黄石电厂", type: "power", risk: "high", lat: 30.2495, lng: 115.0685, radius: 5000, description: "火力发电厂" },
      { id: "hs3_nt003", name: "新港码头", type: "port", risk: "high", lat: 30.1095, lng: 115.1085, radius: 4000, description: "深水港口" }
    ]
  },
  "shiyan": {
    name: "十堰",
    center: [110.7980, 32.6294],
    shelters: [
      { id: "sy3_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 32.6294, lng: 110.7980, capacity: 3500, facilities: "市中心、深埋18米", access: "人民路入口" },
      { id: "sy3_002", name: "武当山地下人防", type: "civil", level: "核6级", lat: 32.5294, lng: 111.0280, capacity: 5000, facilities: "道教名山、山体掩体", access: "武当山景区" },
      { id: "sy3_003", name: "东风基地地下避难所", type: "military", level: "核4级", lat: 32.6094, lng: 110.7280, capacity: 8000, facilities: "二汽厂区顶级防护", access: "东风专用" }
    ],
    nuclearTargets: [
      { id: "sy3_nt001", name: "东风汽车公司", type: "factory", risk: "critical", lat: 32.6094, lng: 110.7280, radius: 8000, description: "重要汽车军工基地" },
      { id: "sy3_nt002", name: "十堰电厂", type: "power", risk: "high", lat: 32.6494, lng: 110.8180, radius: 5000, description: "主力发电厂" },
      { id: "sy3_nt003", name: "武当山机场", type: "transport", risk: "medium", lat: 32.5894, lng: 110.9280, radius: 4000, description: "军民两用机场" }
    ]
  },
  "jingmen": {
    name: "荆门",
    center: [112.2004, 31.0354],
    shelters: [
      { id: "jm_001", name: "中天街地下掩体", type: "government", level: "核5级", lat: 31.0354, lng: 112.2004, capacity: 3000, facilities: "市中心、深埋18米", access: "中天街入口" },
      { id: "jm_002", name: "漳河地下人防", type: "civil", level: "核6级", lat: 31.0854, lng: 112.0504, capacity: 4000, facilities: "水库区地下、大型储水", access: "漳河风景区" }
    ],
    nuclearTargets: [
      { id: "jm_nt001", name: "荆门石化", type: "chemical", risk: "high", lat: 31.0154, lng: 112.2304, radius: 8000, description: "大型石化基地" },
      { id: "jm_nt002", name: "荆门电厂", type: "power", risk: "high", lat: 31.0654, lng: 112.1804, radius: 5000, description: "火力发电厂" },
      { id: "jm_nt003", name: "漳河水库", type: "water", risk: "high", lat: 31.0854, lng: 112.0504, radius: 4000, description: "重要水源地" }
    ]
  },
  "xiaogan": {
    name: "孝感",
    center: [113.9165, 30.9245],
    shelters: [
      { id: "xg_001", name: "城站路地下掩体", type: "government", level: "核5级", lat: 30.9245, lng: 113.9165, capacity: 3000, facilities: "市中心、深埋18米", access: "城站路入口" },
      { id: "xg_002", name: "董永公园地下人防", type: "civil", level: "核6级", lat: 30.9345, lng: 113.9265, capacity: 2500, facilities: "公园地下", access: "董永公园" }
    ],
    nuclearTargets: [
      { id: "xg_nt001", name: "孝感电厂", type: "power", risk: "high", lat: 30.9445, lng: 113.9365, radius: 5000, description: "火力发电厂" },
      { id: "xg_nt002", name: "孝感化工厂", type: "chemical", risk: "medium", lat: 30.9045, lng: 113.8865, radius: 4000, description: "化工基地" }
    ]
  },
  "ezhou": {
    name: "鄂州",
    center: [114.8949, 30.3965],
    shelters: [
      { id: "ez_001", name: "凤凰广场地下掩体", type: "government", level: "核5级", lat: 30.3965, lng: 114.8949, capacity: 2800, facilities: "市中心、深埋18米", access: "凤凰路入口" },
      { id: "ez_002", name: "西山地下人防", type: "civil", level: "核6级", lat: 30.4165, lng: 114.8749, capacity: 3000, facilities: "景区山体掩体", access: "西山风景区" }
    ],
    nuclearTargets: [
      { id: "ez_nt001", name: "鄂州电厂", type: "power", risk: "high", lat: 30.4365, lng: 114.9249, radius: 5000, description: "大型火电厂" },
      { id: "ez_nt002", name: "鄂钢", type: "factory", risk: "high", lat: 30.3765, lng: 114.8549, radius: 6000, description: "钢铁企业" },
      { id: "ez_nt003", name: "鄂黄大桥", type: "bridge", risk: "high", lat: 30.4065, lng: 114.9149, radius: 3000, description: "跨江大桥" }
    ]
  },
  "suizhou": {
    name: "随州",
    center: [113.3820, 31.6905],
    shelters: [
      { id: "sz5_001", name: "烈山大道地下掩体", type: "government", level: "核5级", lat: 31.6905, lng: 113.3820, capacity: 2800, facilities: "市中心、深埋18米", access: "烈山大道入口" },
      { id: "sz5_002", name: "神农故里地下人防", type: "civil", level: "核6级", lat: 31.6205, lng: 113.4520, capacity: 3500, facilities: "景区地下", access: "炎帝神农故里" }
    ],
    nuclearTargets: [
      { id: "sz5_nt001", name: "随州电厂", type: "power", risk: "high", lat: 31.7105, lng: 113.4020, radius: 5000, description: "火力发电厂" },
      { id: "sz5_nt002", name: "随州专汽", type: "factory", risk: "medium", lat: 31.6605, lng: 113.3520, radius: 4000, description: "专用汽车基地" }
    ]
  },
  "huanggang": {
    name: "黄冈",
    center: [114.8723, 30.4539],
    shelters: [
      { id: "hg3_001", name: "黄州大道地下掩体", type: "government", level: "核5级", lat: 30.4539, lng: 114.8723, capacity: 3000, facilities: "市中心、深埋18米", access: "黄州大道入口" },
      { id: "hg3_002", name: "东坡赤壁地下人防", type: "civil", level: "核6级", lat: 30.4439, lng: 114.8623, capacity: 2800, facilities: "景区地下", access: "东坡赤壁" }
    ],
    nuclearTargets: [
      { id: "hg3_nt001", name: "黄冈电厂", type: "power", risk: "high", lat: 30.4739, lng: 114.8923, radius: 5000, description: "火力发电厂" },
      { id: "hg3_nt002", name: "鄂黄长江大桥", type: "bridge", risk: "high", lat: 30.4139, lng: 114.8823, radius: 3000, description: "跨江大桥" }
    ]
  },
  "xianning": {
    name: "咸宁",
    center: [114.3225, 29.8413],
    shelters: [
      { id: "xn_001", name: "温泉路地下掩体", type: "government", level: "核5级", lat: 29.8413, lng: 114.3225, capacity: 2800, facilities: "市中心、深埋18米", access: "温泉路入口" },
      { id: "xn_002", name: "九宫山地下人防", type: "civil", level: "核6级", lat: 29.3913, lng: 114.6225, capacity: 3000, facilities: "景区山体掩体", access: "九宫山景区" }
    ],
    nuclearTargets: [
      { id: "xn_nt001", name: "咸宁核电站", type: "nuclear", risk: "critical", lat: 29.7413, lng: 114.1225, radius: 10000, description: "规划核电站" },
      { id: "xn_nt002", name: "咸宁电厂", type: "power", risk: "high", lat: 29.8613, lng: 114.3425, radius: 5000, description: "火力发电厂" }
    ]
  },
  "enshi": {
    name: "恩施",
    center: [109.4892, 30.2722],
    shelters: [
      { id: "es_001", name: "舞阳坝地下掩体", type: "government", level: "核5级", lat: 30.2722, lng: 109.4892, capacity: 3000, facilities: "市中心、深埋18米", access: "舞阳大道入口" },
      { id: "es_002", name: "土司城地下人防", type: "civil", level: "核6级", lat: 30.2922, lng: 109.4692, capacity: 3200, facilities: "景区山体掩体", access: "土司城景区" },
      { id: "es_003", name: "大峡谷避难所", type: "civil", level: "核6级", lat: 30.4322, lng: 109.1292, capacity: 4000, facilities: "峡谷区天然掩体", access: "恩施大峡谷" }
    ],
    nuclearTargets: [
      { id: "es_nt001", name: "清江水电", type: "power", risk: "high", lat: 30.3922, lng: 109.3292, radius: 5000, description: "水力发电厂" },
      { id: "es_nt002", name: "恩施机场", type: "transport", risk: "medium", lat: 30.3122, lng: 109.5092, radius: 4000, description: "机场" }
    ]
  },
  "xiantao": {
    name: "仙桃",
    center: [113.4545, 30.3623],
    shelters: [
      { id: "xt2_001", name: "沔街地下掩体", type: "government", level: "核5级", lat: 30.3623, lng: 113.4545, capacity: 2600, facilities: "市中心、深埋18米", access: "沔街入口" },
      { id: "xt2_002", name: "体育馆地下人防", type: "civil", level: "核6级", lat: 30.3823, lng: 113.4445, capacity: 2800, facilities: "体育场馆地下", access: "仙桃体育馆" }
    ],
    nuclearTargets: [
      { id: "xt2_nt001", name: "仙桃电厂", type: "power", risk: "high", lat: 30.3923, lng: 113.4745, radius: 5000, description: "火力发电厂" }
    ]
  },
  "tianmen": {
    name: "天门",
    center: [113.1665, 30.6632],
    shelters: [
      { id: "tm_001", name: "陆羽广场地下掩体", type: "government", level: "核5级", lat: 30.6632, lng: 113.1665, capacity: 2500, facilities: "市中心、深埋18米", access: "陆羽大道入口" }
    ],
    nuclearTargets: [
      { id: "tm_nt001", name: "天门纺织", type: "factory", risk: "medium", lat: 30.6832, lng: 113.1865, radius: 4000, description: "纺织基地" }
    ]
  },

  // ========== 湖南省13城市 ==========
  "yueyang": {
    name: "岳阳",
    center: [113.1299, 29.3573],
    shelters: [
      { id: "yy_001", name: "巴陵广场地下掩体", type: "government", level: "核5级", lat: 29.3573, lng: 113.1299, capacity: 4000, facilities: "市中心、深埋20米", access: "巴陵西路入口" },
      { id: "yy_002", name: "岳阳楼地下人防", type: "civil", level: "核6级", lat: 29.3773, lng: 113.1199, capacity: 3500, facilities: "古城区地下", access: "岳阳楼景区" },
      { id: "yy_003", name: "东站地下避难所", type: "transport", level: "核5级", lat: 29.3373, lng: 113.1799, capacity: 5000, facilities: "高铁枢纽", access: "岳阳东站B1" },
      { id: "yy_004", name: "洞庭湖地下防护", type: "civil", level: "核6级", lat: 29.3273, lng: 113.0699, capacity: 6000, facilities: "湖区大堤地下、防潮", access: "湖堤路入口" }
    ],
    nuclearTargets: [
      { id: "yy_nt001", name: "岳阳电厂", type: "power", risk: "high", lat: 29.3973, lng: 113.1499, radius: 5000, description: "主力发电厂" },
      { id: "yy_nt002", name: "岳阳港", type: "port", risk: "high", lat: 29.3473, lng: 113.1099, radius: 5000, description: "长江重要港口" },
      { id: "yy_nt003", name: "洞庭湖大桥", type: "bridge", risk: "high", lat: 29.3873, lng: 113.1599, radius: 3000, description: "跨湖大桥" },
      { id: "yy_nt004", name: "岳阳石化", type: "chemical", risk: "high", lat: 29.3173, lng: 113.1999, radius: 8000, description: "大型石化" }
    ]
  },
  "zhuzhou": {
    name: "株洲",
    center: [113.1517, 27.8358],
    shelters: [
      { id: "zz2_001", name: "神农广场地下掩体", type: "government", level: "核5级", lat: 27.8358, lng: 113.1517, capacity: 4000, facilities: "市中心、深埋20米", access: "神农大道入口" },
      { id: "zz2_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 27.8558, lng: 113.1717, capacity: 5500, facilities: "京广枢纽掩体", access: "株洲站地下" },
      { id: "zz2_003", name: "田心基地避难所", type: "military", level: "核4级", lat: 27.8958, lng: 113.1117, capacity: 7000, facilities: "机车厂顶级防护", access: "中车专用" },
      { id: "zz2_004", name: "石峰山地下人防", type: "civil", level: "核6级", lat: 27.8858, lng: 113.1317, capacity: 3500, facilities: "山体掩体", access: "石峰公园" }
    ],
    nuclearTargets: [
      { id: "zz2_nt001", name: "中车株机", type: "factory", risk: "critical", lat: 27.8958, lng: 113.1117, radius: 8000, description: "高铁机车制造" },
      { id: "zz2_nt002", name: "株洲电厂", type: "power", risk: "high", lat: 27.8158, lng: 113.1917, radius: 5000, description: "主力发电厂" },
      { id: "zz2_nt003", name: "株洲化工厂", type: "chemical", risk: "high", lat: 27.8758, lng: 113.1617, radius: 8000, description: "大型化工" }
    ]
  },
  "xiangtan": {
    name: "湘潭",
    center: [112.9453, 27.8297],
    shelters: [
      { id: "xt2_002", name: "东方红广场地下掩体", type: "government", level: "核5级", lat: 27.8297, lng: 112.9453, capacity: 3500, facilities: "市中心、深埋20米", access: "东方红广场" },
      { id: "xt2_003", name: "韶山地下人防", type: "civil", level: "核6级", lat: 27.9197, lng: 112.5253, capacity: 4500, facilities: "红色景区地下", access: "韶山景区" },
      { id: "xt2_004", name: "湘钢地下避难所", type: "civil", level: "核6级", lat: 27.8497, lng: 112.9053, capacity: 5000, facilities: "厂区地下掩体", access: "湘钢专用" }
    ],
    nuclearTargets: [
      { id: "xt2_nt001", name: "湘潭钢铁", type: "factory", risk: "high", lat: 27.8497, lng: 112.9053, radius: 6000, description: "大型钢铁" },
      { id: "xt2_nt002", name: "湘潭电机", type: "factory", risk: "high", lat: 27.8797, lng: 112.9653, radius: 5000, description: "军工电机" },
      { id: "xt2_nt003", name: "湘潭电厂", type: "power", risk: "high", lat: 27.7897, lng: 112.9853, radius: 5000, description: "主力发电厂" }
    ]
  },
  "hengyang": {
    name: "衡阳",
    center: [112.5720, 26.8936],
    shelters: [
      { id: "hy_001", name: "解放路地下掩体", type: "government", level: "核5级", lat: 26.8936, lng: 112.5720, capacity: 4000, facilities: "市中心、深埋20米", access: "解放大道入口" },
      { id: "hy_002", name: "南岳衡山地下人防", type: "civil", level: "核6级", lat: 27.2436, lng: 112.7420, capacity: 5000, facilities: "名山山体掩体", access: "南岳景区" },
      { id: "hy_003", name: "东站地下避难所", type: "transport", level: "核5级", lat: 26.8636, lng: 112.6320, capacity: 5500, facilities: "高铁枢纽", access: "衡阳东站B1" }
    ],
    nuclearTargets: [
      { id: "hy_nt001", name: "衡阳电厂", type: "power", risk: "high", lat: 26.9336, lng: 112.5520, radius: 5000, description: "主力发电厂" },
      { id: "hy_nt002", name: "衡钢集团", type: "factory", risk: "high", lat: 26.8536, lng: 112.5120, radius: 6000, description: "无缝钢管" },
      { id: "hy_nt003", name: "衡阳铁路枢纽", type: "transport", risk: "high", lat: 26.8836, lng: 112.5920, radius: 4000, description: "铁路枢纽" }
    ]
  },
  "yiyang": {
    name: "益阳",
    center: [112.3561, 28.5705],
    shelters: [
      { id: "yy2_001", name: "康富路地下掩体", type: "government", level: "核5级", lat: 28.5705, lng: 112.3561, capacity: 3000, facilities: "市中心、深埋18米", access: "康富路入口" },
      { id: "yy2_002", name: "梓山湖地下人防", type: "civil", level: "核6级", lat: 28.5905, lng: 112.3761, capacity: 2800, facilities: "湖区地下", access: "梓山湖入口" }
    ],
    nuclearTargets: [
      { id: "yy2_nt001", name: "益阳电厂", type: "power", risk: "high", lat: 28.6105, lng: 112.3961, radius: 5000, description: "火力发电厂" },
      { id: "yy2_nt002", name: "益阳橡机", type: "factory", risk: "medium", lat: 28.5505, lng: 112.3361, radius: 4000, description: "橡胶机械" }
    ]
  },
  "changde": {
    name: "常德",
    center: [111.6996, 29.0317],
    shelters: [
      { id: "cd2_001", name: "武陵阁地下掩体", type: "government", level: "核5级", lat: 29.0317, lng: 111.6996, capacity: 3500, facilities: "市中心、深埋20米", access: "武陵大道入口" },
      { id: "cd2_002", name: "诗墙公园地下人防", type: "civil", level: "核6级", lat: 29.0517, lng: 111.7196, capacity: 3200, facilities: "沿江地下、防潮", access: "诗墙公园" },
      { id: "cd2_003", name: "桃花源避难所", type: "civil", level: "核6级", lat: 28.7617, lng: 111.4896, capacity: 4000, facilities: "景区山体掩体", access: "桃花源景区" }
    ],
    nuclearTargets: [
      { id: "cd2_nt001", name: "常德电厂", type: "power", risk: "high", lat: 29.0717, lng: 111.6796, radius: 5000, description: "主力发电厂" },
      { id: "cd2_nt002", name: "常德烟厂", type: "factory", risk: "high", lat: 29.0217, lng: 111.7396, radius: 5000, description: "卷烟厂" },
      { id: "cd2_nt003", name: "石门水库", type: "water", risk: "high", lat: 29.7017, lng: 111.3796, radius: 4000, description: "大型水库" }
    ]
  },
  "chenzhou": {
    name: "郴州",
    center: [113.0155, 25.7703],
    shelters: [
      { id: "cz5_001", name: "人民东路地下掩体", type: "government", level: "核5级", lat: 25.7703, lng: 113.0155, capacity: 3000, facilities: "市中心、深埋18米", access: "人民东路入口" },
      { id: "cz5_002", name: "苏仙岭地下人防", type: "civil", level: "核6级", lat: 25.7903, lng: 113.0355, capacity: 3500, facilities: "景区山体掩体", access: "苏仙岭景区" },
      { id: "cz5_003", name: "东江湖地下防护", type: "civil", level: "核6级", lat: 25.8803, lng: 113.2655, capacity: 4000, facilities: "水库区地下", access: "东江湖景区" }
    ],
    nuclearTargets: [
      { id: "cz5_nt001", name: "郴州电厂", type: "power", risk: "high", lat: 25.8103, lng: 113.0555, radius: 5000, description: "火力发电厂" },
      { id: "cz5_nt002", name: "柿竹园矿", type: "factory", risk: "high", lat: 25.7403, lng: 112.9555, radius: 6000, description: "多金属矿" },
      { id: "cz5_nt003", name: "京广铁路桥", type: "bridge", risk: "high", lat: 25.7603, lng: 113.0255, radius: 3000, description: "战略桥梁" }
    ]
  },
  "shaoyang": {
    name: "邵阳",
    center: [111.4678, 27.2389],
    shelters: [
      { id: "sy4_001", name: "红旗路地下掩体", type: "government", level: "核5级", lat: 27.2389, lng: 111.4678, capacity: 2800, facilities: "市中心、深埋18米", access: "红旗路入口" },
      { id: "sy4_002", name: "城南公园地下人防", type: "civil", level: "核6级", lat: 27.2589, lng: 111.4878, capacity: 2600, facilities: "公园地下", access: "城南公园" },
      { id: "sy4_003", name: "崀山避难所", type: "civil", level: "核6级", lat: 26.4189, lng: 110.9578, capacity: 3500, facilities: "丹霞景区掩体", access: "崀山景区" }
    ],
    nuclearTargets: [
      { id: "sy4_nt001", name: "邵阳电厂", type: "power", risk: "high", lat: 27.2789, lng: 111.4478, radius: 5000, description: "火力发电厂" },
      { id: "sy4_nt002", name: "邵阳纺织", type: "factory", risk: "medium", lat: 27.2189, lng: 111.5078, radius: 4000, description: "纺织基地" }
    ]
  },
  "yongzhou": {
    name: "永州",
    center: [111.5917, 26.4195],
    shelters: [
      { id: "yz_001", name: "潇湘路地下掩体", type: "government", level: "核5级", lat: 26.4195, lng: 111.5917, capacity: 2800, facilities: "市中心、深埋18米", access: "潇湘路入口" },
      { id: "yz_002", name: "柳子庙地下人防", type: "civil", level: "核6级", lat: 26.4395, lng: 111.6117, capacity: 2600, facilities: "古城区地下", access: "柳子街" }
    ],
    nuclearTargets: [
      { id: "yz_nt001", name: "永州电厂", type: "power", risk: "high", lat: 26.4595, lng: 111.5717, radius: 5000, description: "火力发电厂" },
      { id: "yz_nt002", name: "零陵机场", type: "transport", risk: "medium", lat: 26.3495, lng: 111.6117, radius: 4000, description: "机场" }
    ]
  },
  "zhangjiajie": {
    name: "张家界",
    center: [110.4812, 29.1171],
    shelters: [
      { id: "zjj_001", name: "回龙路地下掩体", type: "government", level: "核5级", lat: 29.1171, lng: 110.4812, capacity: 3000, facilities: "市中心、深埋18米", access: "回龙路入口" },
      { id: "zjj_002", name: "武陵源地下人防", type: "civil", level: "核6级", lat: 29.3571, lng: 110.5512, capacity: 5000, facilities: "景区山体掩体", access: "武陵源景区" },
      { id: "zjj_003", name: "天门山避难所", type: "civil", level: "核6级", lat: 29.0571, lng: 110.4612, capacity: 4500, facilities: "山洞天然掩体", access: "天门山景区" }
    ],
    nuclearTargets: [
      { id: "zjj_nt001", name: "张家界机场", type: "transport", risk: "medium", lat: 29.1071, lng: 110.4412, radius: 4000, description: "旅游机场" },
      { id: "zjj_nt002", name: "张家界景区", type: "cultural", risk: "low", lat: 29.2871, lng: 110.5012, radius: 2000, description: "世界自然遗产" }
    ]
  },
  "huaihua": {
    name: "怀化",
    center: [109.9995, 27.5549],
    shelters: [
      { id: "hh4_001", name: "迎丰路地下掩体", type: "government", level: "核5级", lat: 27.5549, lng: 109.9995, capacity: 3000, facilities: "市中心、深埋18米", access: "迎丰路入口" },
      { id: "hh4_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 27.5349, lng: 110.0195, capacity: 4000, facilities: "铁路枢纽掩体", access: "怀化南站" }
    ],
    nuclearTargets: [
      { id: "hh4_nt001", name: "怀化电厂", type: "power", risk: "high", lat: 27.5749, lng: 109.9795, radius: 5000, description: "火力发电厂" },
      { id: "hh4_nt002", name: "怀化铁路枢纽", type: "transport", risk: "high", lat: 27.5449, lng: 109.9995, radius: 4000, description: "重要铁路枢纽" }
    ]
  },
  "loudi": {
    name: "娄底",
    center: [111.9945, 27.7006],
    shelters: [
      { id: "ld_001", name: "氐星路地下掩体", type: "government", level: "核5级", lat: 27.7006, lng: 111.9945, capacity: 2800, facilities: "市中心、深埋18米", access: "氐星路入口" },
      { id: "ld_002", name: "涟钢地下人防", type: "civil", level: "核6级", lat: 27.7806, lng: 111.9345, capacity: 4000, facilities: "厂区地下掩体", access: "涟钢专用" }
    ],
    nuclearTargets: [
      { id: "ld_nt001", name: "涟源钢铁", type: "factory", risk: "high", lat: 27.7806, lng: 111.9345, radius: 6000, description: "大型钢铁" },
      { id: "ld_nt002", name: "冷江煤矿", type: "factory", risk: "high", lat: 27.6806, lng: 111.9545, radius: 6000, description: "大型煤矿" }
    ]
  },
  "xiangxi": {
    name: "湘西",
    center: [109.7389, 28.3116],
    shelters: [
      { id: "xx_001", name: "吉首地下掩体", type: "government", level: "核5级", lat: 28.3116, lng: 109.7389, capacity: 2800, facilities: "州府地下、深埋18米", access: "吉首市区入口" },
      { id: "xx_002", name: "凤凰古城地下人防", type: "civil", level: "核6级", lat: 27.9516, lng: 109.6089, capacity: 3500, facilities: "古城地下掩体", access: "凤凰古城" },
      { id: "xx_003", name: "芙蓉镇避难所", type: "civil", level: "核6级", lat: 28.7516, lng: 109.9589, capacity: 3000, facilities: "瀑布景区地下", access: "芙蓉镇景区" }
    ],
    nuclearTargets: [
      { id: "xx_nt001", name: "湘西电厂", type: "power", risk: "high", lat: 28.3316, lng: 109.7589, radius: 5000, description: "火力发电厂" },
      { id: "xx_nt002", name: "花垣锰矿", type: "factory", risk: "high", lat: 28.5516, lng: 109.4889, radius: 6000, description: "锰矿基地" }
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PART6_CITIES;
}
