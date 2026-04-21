// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第六部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART6 = {
  // ============================================
  // 华中地区 - 湖北省（继续）
  // ============================================
  jingzhou: {
    name: "荆州",
    center: [112.2397, 30.3352],
    shelters: [
      { id: "jz_001", name: "荆州站地下避难所", type: "shelter", position: [112.1997, 30.3752], address: "荆州市荆州区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "荆州站地下", description: "荆州高铁枢纽民防" },
      { id: "jz_002", name: "荆州古城地下避难所", type: "bunker", position: [112.2397, 30.3352], address: "荆州市荆州区", capacity: "3500人", level: "核6级", facilities: "古城配套深层防护", access: "荆州古城墙地下", description: "古城墙人防工程" },
      { id: "jz_003", name: "沙市地下人防", type: "underground_mall", position: [112.2797, 30.3152], address: "荆州市沙市区", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "沙市中心地下", description: "商业中心人防" },
      { id: "jz_004", name: "洪湖地下避难所", type: "shelter", position: [113.4597, 29.8252], address: "荆州市洪湖市", capacity: "2000人", level: "核6级", facilities: "湖区配套防护", access: "洪湖市中心地下", description: "湖区城市人防" }
    ],
    targets: [
      { name: "荆州站", type: "transport", position: [112.1997, 30.3752], risk: "中" },
      { name: "荆州电厂", type: "factory", position: [112.2697, 30.3552], risk: "高" },
      { name: "沙隆达集团", type: "factory", position: [112.2897, 30.2952], risk: "中" },
      { name: "荆州古城", type: "transport", position: [112.2397, 30.3352], risk: "低" }
    ]
  },

  huanggang: {
    name: "黄冈",
    center: [114.8723, 30.4539],
    shelters: [
      { id: "hg_001", name: "黄冈西站地下避难所", type: "shelter", position: [114.8723, 30.4539], address: "黄冈市黄州区", capacity: "2500人", level: "核6级", facilities: "城铁枢纽深层防护", access: "黄冈西站地下", description: "黄冈城铁枢纽民防" },
      { id: "hg_002", name: "黄州地下人防", type: "underground_mall", position: [114.8623, 30.4439], address: "黄冈市黄州区", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "黄州中心地下", description: "商业中心人防" },
      { id: "hg_003", name: "麻城北站地下避难所", type: "shelter", position: [115.0323, 31.1839], address: "黄冈市麻城市", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "麻城北站地下", description: "麻城高铁枢纽民防" },
      { id: "hg_004", name: "东坡赤壁地下避难所", type: "shelter", position: [114.8823, 30.4639], address: "黄冈市黄州区", capacity: "1500人", level: "核6级", facilities: "古迹配套防护", access: "东坡赤壁地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "黄冈西站", type: "transport", position: [114.8723, 30.4539], risk: "中" },
      { name: "黄冈电厂", type: "factory", position: [114.8923, 30.4739], risk: "高" },
      { name: "祥云化工", type: "factory", position: [114.8423, 30.4339], risk: "中" }
    ]
  },

  shiyan: {
    name: "十堰",
    center: [110.7988, 32.6292],
    shelters: [
      { id: "sy_001", name: "十堰站地下避难所", type: "shelter", position: [110.7988, 32.6292], address: "十堰市茅箭区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "十堰火车站地下", description: "十堰铁路枢纽民防" },
      { id: "sy_002", name: "武当山机场地下避难所", type: "shelter", position: [110.9088, 32.5892], address: "十堰市茅箭区", capacity: "2000人", level: "核5级", facilities: "机场配套深层防护", access: "武当山机场地下", description: "航空枢纽民防工程" },
      { id: "sy_003", name: "人民广场地下人防", type: "underground_mall", position: [110.7888, 32.6192], address: "十堰市茅箭区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "人民广场地下", description: "商业中心人防" },
      { id: "sy_004", name: "武当山地下避难所", type: "bunker", position: [111.0288, 32.5292], address: "十堰市丹江口市", capacity: "3000人", level: "核6级", facilities: "景区配套深层防护", access: "武当山景区地下", description: "世界遗产人防工程" }
    ],
    targets: [
      { name: "东风汽车基地", type: "factory", position: [110.8188, 32.6492], risk: "高" },
      { name: "十堰火车站", type: "transport", position: [110.7988, 32.6292], risk: "中" },
      { name: "武当山机场", type: "airport", position: [110.9088, 32.5892], risk: "中" },
      { name: "丹江口水库", type: "factory", position: [111.1088, 32.4292], risk: "高" }
    ]
  },

  // ============================================
  // 华中地区 - 湖南省（剩余城市）
  // ============================================
  zhuzhou: {
    name: "株洲",
    center: [113.1330, 27.8277],
    shelters: [
      { id: "zz_001", name: "株洲西站地下避难所", type: "shelter", position: [113.0930, 27.8677], address: "株洲市天元区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "株洲西站地下", description: "株洲高铁枢纽民防" },
      { id: "zz_002", name: "株洲站地下避难所", type: "shelter", position: [113.1330, 27.8277], address: "株洲市芦淞区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "株洲火车站地下", description: "株洲传统火车站民防" },
      { id: "zz_003", name: "神农城地下人防", type: "underground_mall", position: [113.1530, 27.8077], address: "株洲市天元区", capacity: "2500人", level: "核6级", facilities: "商业区深层防护", access: "神农城地下", description: "商业中心人防" },
      { id: "zz_004", name: "中车株机地下避难所", type: "bunker", position: [113.1130, 27.8477], address: "株洲市石峰区", capacity: "4000人", level: "核5级", facilities: "轨道交通企业深层防护", access: "中车株机地下", description: "重要制造企业人防" }
    ],
    targets: [
      { name: "中车株机", type: "factory", position: [113.1130, 27.8477], risk: "高" },
      { name: "株洲冶炼", type: "factory", position: [113.1730, 27.8577], risk: "高" },
      { name: "株洲站", type: "transport", position: [113.1330, 27.8277], risk: "中" },
      { name: "株洲电厂", type: "factory", position: [113.0730, 27.7877], risk: "高" }
    ]
  },

  xiangtan: {
    name: "湘潭",
    center: [112.9437, 27.8297],
    shelters: [
      { id: "xt_001", name: "湘潭北站地下避难所", type: "shelter", position: [112.9437, 27.8697], address: "湘潭市雨湖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "湘潭北站地下", description: "湘潭高铁枢纽民防" },
      { id: "xt_002", name: "湘潭站地下避难所", type: "shelter", position: [112.9037, 27.7897], address: "湘潭市雨湖区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "湘潭火车站地下", description: "湘潭传统火车站民防" },
      { id: "xt_003", name: "湘潭中心地下人防", type: "underground_mall", position: [112.9337, 27.8197], address: "湘潭市岳塘区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "湘潭中心地下", description: "商业中心人防" },
      { id: "xt_004", name: "湘钢地下避难所", type: "shelter", position: [112.9637, 27.8497], address: "湘潭市岳塘区", capacity: "3500人", level: "核6级", facilities: "钢铁企业配套防护", access: "湘钢厂区地下", description: "钢铁企业人防" }
    ],
    targets: [
      { name: "湘钢集团", type: "factory", position: [112.9637, 27.8497], risk: "高" },
      { name: "湘潭电机", type: "factory", position: [112.9137, 27.8097], risk: "中" },
      { name: "湘潭火车站", type: "transport", position: [112.9037, 27.7897], risk: "中" },
      { name: "湘潭电厂", type: "factory", position: [112.9837, 27.8797], risk: "高" }
    ]
  },

  hengyang: {
    name: "衡阳",
    center: [112.5719, 26.8932],
    shelters: [
      { id: "hy_001", name: "衡阳东站地下避难所", type: "shelter", position: [112.6119, 26.9332], address: "衡阳市珠晖区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "衡阳东站地下", description: "衡阳高铁枢纽民防" },
      { id: "hy_002", name: "衡阳站地下避难所", type: "shelter", position: [112.5719, 26.8932], address: "衡阳市珠晖区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "衡阳火车站地下", description: "衡阳传统火车站民防" },
      { id: "hy_003", name: "解放路地下人防", type: "underground_mall", position: [112.5619, 26.8832], address: "衡阳市雁峰区", capacity: "2500人", level: "核6级", facilities: "商业区深层防护", access: "解放路地下", description: "商业中心人防" },
      { id: "hy_004", name: "衡钢地下避难所", type: "bunker", position: [112.5319, 26.8632], address: "衡阳市蒸湘区", capacity: "4000人", level: "核5级", facilities: "钢管企业深层防护", access: "衡钢地下", description: "钢管企业人防" }
    ],
    targets: [
      { name: "衡钢集团", type: "factory", position: [112.5319, 26.8632], risk: "高" },
      { name: "衡阳电厂", type: "factory", position: [112.6019, 26.9132], risk: "高" },
      { name: "衡阳火车站", type: "transport", position: [112.5719, 26.8932], risk: "中" },
      { name: "水口山有色", type: "factory", position: [112.4419, 26.9532], risk: "高" }
    ]
  },

  yueyang: {
    name: "岳阳",
    center: [113.1290, 29.3571],
    shelters: [
      { id: "yy_001", name: "岳阳东站地下避难所", type: "shelter", position: [113.1690, 29.3971], address: "岳阳市岳阳楼区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "岳阳东站地下", description: "岳阳高铁枢纽民防" },
      { id: "yy_002", name: "岳阳站地下避难所", type: "shelter", position: [113.1290, 29.3571], address: "岳阳市岳阳楼区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "岳阳火车站地下", description: "岳阳传统火车站民防" },
      { id: "yy_003", name: "岳阳楼地下避难所", type: "bunker", position: [113.0890, 29.3771], address: "岳阳市岳阳楼区", capacity: "2000人", level: "核6级", facilities: "古迹配套深层防护", access: "岳阳楼地下", description: "古迹人防工程" },
      { id: "yy_004", name: "城陵矶港地下避难所", type: "shelter", position: [113.1490, 29.4971], address: "岳阳市云溪区", capacity: "3000人", level: "核5级", facilities: "港口配套深层防护", access: "城陵矶港地下", description: "重要港口人防" }
    ],
    targets: [
      { name: "岳阳电厂", type: "factory", position: [113.1890, 29.3371], risk: "高" },
      { name: "岳阳火车站", type: "transport", position: [113.1290, 29.3571], risk: "中" },
      { name: "长岭炼化", type: "factory", position: [113.2090, 29.4771], risk: "高" },
      { name: "城陵矶港", type: "port", position: [113.1490, 29.4971], risk: "中" }
    ]
  },

  chenzhou: {
    name: "郴州",
    center: [113.0149, 25.7703],
    shelters: [
      { id: "cz_001", name: "郴州西站地下避难所", type: "shelter", position: [112.9749, 25.8103], address: "郴州市北湖区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "郴州西站地下", description: "郴州高铁枢纽民防" },
      { id: "cz_002", name: "郴州站地下避难所", type: "shelter", position: [113.0149, 25.7703], address: "郴州市北湖区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "郴州火车站地下", description: "郴州传统火车站民防" },
      { id: "cz_003", name: "五岭广场地下人防", type: "underground_mall", position: [113.0249, 25.7603], address: "郴州市北湖区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "五岭广场地下", description: "商业中心人防" },
      { id: "cz_004", name: "莽山地下避难所", type: "shelter", position: [113.1149, 24.9203], address: "郴州市宜章县", capacity: "1500人", level: "核6级", facilities: "景区配套防护", access: "莽山景区地下", description: "景区人防工程" }
    ],
    targets: [
      { name: "郴州电厂", type: "factory", position: [113.0449, 25.7803], risk: "高" },
      { name: "郴州火车站", type: "transport", position: [113.0149, 25.7703], risk: "中" },
      { name: "柿竹园有色", type: "factory", position: [113.0849, 25.7403], risk: "中" }
    ]
  },

  // ============================================
  // 华东地区 - 江苏省（剩余城市）
  // ============================================
  yangzhou: {
    name: "扬州",
    center: [119.4127, 32.3932],
    shelters: [
      { id: "yz_001", name: "扬州站地下避难所", type: "shelter", position: [119.3727, 32.4332], address: "扬州市邗江区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "扬州火车站地下", description: "扬州铁路枢纽民防" },
      { id: "yz_002", name: "扬州东站地下避难所", type: "shelter", position: [119.4527, 32.3532], address: "扬州市广陵区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "扬州东站地下", description: "扬州高铁枢纽民防" },
      { id: "yz_003", name: "文昌阁地下人防", type: "underground_mall", position: [119.4227, 32.3832], address: "扬州市广陵区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "文昌阁地下", description: "商业中心人防" },
      { id: "yz_004", name: "瘦西湖地下避难所", type: "bunker", position: [119.4027, 32.4132], address: "扬州市邗江区", capacity: "2000人", level: "核6级", facilities: "景区配套深层防护", access: "瘦西湖地下", description: "世界遗产人防工程" }
    ],
    targets: [
      { name: "扬州电厂", type: "factory", position: [119.3827, 32.4132], risk: "高" },
      { name: "扬州火车站", type: "transport", position: [119.3727, 32.4332], risk: "中" },
      { name: "扬州化工", type: "factory", position: [119.4627, 32.3132], risk: "中" }
    ]
  },

  yancheng: {
    name: "盐城",
    center: [120.1586, 33.3799],
    shelters: [
      { id: "yc_001", name: "盐城站地下避难所", type: "shelter", position: [120.1186, 33.4199], address: "盐城市亭湖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "盐城站地下", description: "盐城高铁枢纽民防" },
      { id: "yc_002", name: "盐城大丰站地下避难所", type: "shelter", position: [120.4586, 33.1999], address: "盐城市大丰区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "大丰站地下", description: "大丰高铁枢纽民防" },
      { id: "yc_003", name: "建军路地下人防", type: "underground_mall", position: [120.1486, 33.3699], address: "盐城市亭湖区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "建军路地下", description: "商业中心人防" },
      { id: "yc_004", name: "丹顶鹤保护区地下避难所", type: "shelter", position: [120.5586, 33.6799], address: "盐城市射阳县", capacity: "1500人", level: "核6级", facilities: "保护区配套防护", access: "保护区地下", description: "保护区人防" }
    ],
    targets: [
      { name: "盐城电厂", type: "factory", position: [120.1786, 33.3899], risk: "高" },
      { name: "盐城火车站", type: "transport", position: [120.1186, 33.4199], risk: "中" },
      { name: "悦达集团", type: "factory", position: [120.2086, 33.3499], risk: "中" }
    ]
  },

  taizhou: {
    name: "泰州",
    center: [119.9236, 32.4554],
    shelters: [
      { id: "tz_001", name: "泰州站地下避难所", type: "shelter", position: [119.9236, 32.4954], address: "泰州市海陵区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "泰州火车站地下", description: "泰州铁路枢纽民防" },
      { id: "tz_002", name: "泰州南站地下避难所", type: "shelter", position: [119.8836, 32.4354], address: "泰州市医药高新区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "泰州南站地下", description: "泰州高铁枢纽民防" },
      { id: "tz_003", name: "坡子街地下人防", type: "underground_mall", position: [119.9136, 32.4454], address: "泰州市海陵区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "坡子街地下", description: "商业中心人防" },
      { id: "tz_004", name: "扬子江药业地下避难所", type: "shelter", position: [119.9536, 32.4754], address: "泰州市高港区", capacity: "2500人", level: "核6级", facilities: "医药企业配套防护", access: "扬子江药业地下", description: "医药企业人防" }
    ],
    targets: [
      { name: "扬子江药业", type: "factory", position: [119.9536, 32.4754], risk: "中" },
      { name: "泰州电厂", type: "factory", position: [119.8936, 32.5154], risk: "高" },
      { name: "泰州火车站", type: "transport", position: [119.9236, 32.4954], risk: "中" }
    ]
  },

  lianyungang: {
    name: "连云港",
    center: [119.2216, 34.5966],
    shelters: [
      { id: "lyg_001", name: "连云港站地下避难所", type: "shelter", position: [119.2216, 34.5966], address: "连云港市海州区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "连云港火车站地下", description: "连云港铁路枢纽民防" },
      { id: "lyg_002", name: "花果山机场地下避难所", type: "shelter", position: [119.1216, 34.5766], address: "连云港市灌云县", capacity: "2000人", level: "核5级", facilities: "机场配套深层防护", access: "花果山机场地下", description: "航空枢纽民防" },
      { id: "lyg_003", name: "苏宁广场地下人防", type: "underground_mall", position: [119.2116, 34.5866], address: "连云港市海州区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "苏宁广场地下", description: "商业中心人防" },
      { id: "lyg_004", name: "连云港港地下避难所", type: "bunker", position: [119.3716, 34.7166], address: "连云港市连云区", capacity: "4000人", level: "核5级", facilities: "港口配套深层防护", access: "连云港港地下", description: "重要港口人防" }
    ],
    targets: [
      { name: "连云港港", type: "port", position: [119.3716, 34.7166], risk: "高" },
      { name: "连云港核电站", type: "factory", position: [119.5216, 34.8566], risk: "高" },
      { name: "连云港火车站", type: "transport", position: [119.2216, 34.5966], risk: "中" },
      { name: "田湾核电站", type: "factory", position: [119.5416, 34.8766], risk: "高" }
    ]
  },

  zhenjiang: {
    name: "镇江",
    center: [119.4230, 32.1885],
    shelters: [
      { id: "zj_001", name: "镇江南站地下避难所", type: "shelter", position: [119.3830, 32.1485], address: "镇江市丹徒区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "镇江南站地下", description: "镇江高铁枢纽民防" },
      { id: "zj_002", name: "镇江站地下避难所", type: "shelter", position: [119.4230, 32.1885], address: "镇江市润州区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "镇江火车站地下", description: "镇江传统火车站民防" },
      { id: "zj_003", name: "大市口地下人防", type: "underground_mall", position: [119.4130, 32.1785], address: "镇江市京口区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "大市口地下", description: "商业中心人防" },
      { id: "zj_004", name: "金山寺地下避难所", type: "shelter", position: [119.4030, 32.2085], address: "镇江市润州区", capacity: "1500人", level: "核6级", facilities: "古迹配套防护", access: "金山寺地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "镇江电厂", type: "factory", position: [119.4430, 32.1985], risk: "高" },
      { name: "镇江火车站", type: "transport", position: [119.4230, 32.1885], risk: "中" },
      { name: "索普化工", type: "factory", position: [119.4530, 32.1685], risk: "中" }
    ]
  },

  suqian: {
    name: "宿迁",
    center: [118.2755, 33.9633],
    shelters: [
      { id: "sq_001", name: "宿迁站地下避难所", type: "shelter", position: [118.2355, 34.0033], address: "宿迁市宿城区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "宿迁火车站地下", description: "宿迁铁路枢纽民防" },
      { id: "sq_002", name: "宿迁高铁站地下避难所", type: "shelter", position: [118.2955, 33.9833], address: "宿迁市经济技术开发区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "宿迁高铁站地下", description: "宿迁高铁枢纽民防" },
      { id: "sq_003", name: "幸福路地下人防", type: "underground_mall", position: [118.2655, 33.9533], address: "宿迁市宿城区", capacity: "1500人", level: "核6级", facilities: "商业区深层防护", access: "幸福路地下", description: "商业中心人防" },
      { id: "sq_004", name: "项王故里地下避难所", type: "shelter", position: [118.2455, 33.9433], address: "宿迁市宿城区", capacity: "1500人", level: "核6级", facilities: "古迹配套防护", access: "项王故里地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "宿迁电厂", type: "factory", position: [118.3055, 33.9633], risk: "高" },
      { name: "宿迁火车站", type: "transport", position: [118.2355, 34.0033], risk: "中" },
      { name: "洋河酒厂", type: "factory", position: [118.3955, 33.7233], risk: "中" }
    ]
  },

  huaian: {
    name: "淮安",
    center: [119.0153, 33.6104],
    shelters: [
      { id: "ha_001", name: "淮安东站地下避难所", type: "shelter", position: [119.0753, 33.6404], address: "淮安市淮安区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "淮安东站地下", description: "淮安高铁枢纽民防" },
      { id: "ha_002", name: "淮安站地下避难所", type: "shelter", position: [119.0153, 33.6104], address: "淮安市清江浦区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "淮安火车站地下", description: "淮安传统火车站民防" },
      { id: "ha_003", name: "淮海广场地下人防", type: "underground_mall", position: [119.0053, 33.6004], address: "淮安市清江浦区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "淮海广场地下", description: "商业中心人防" },
      { id: "ha_004", name: "周恩来纪念馆地下避难所", type: "shelter", position: [119.0953, 33.5804], address: "淮安市淮安区", capacity: "2000人", level: "核6级", facilities: "纪念建筑配套防护", access: "纪念馆地下", description: "纪念建筑人防" }
    ],
    targets: [
      { name: "淮安电厂", type: "factory", position: [119.0353, 33.6304], risk: "高" },
      { name: "淮安火车站", type: "transport", position: [119.0153, 33.6104], risk: "中" },
      { name: "淮钢集团", type: "factory", position: [118.9853, 33.5904], risk: "高" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART6;
}
