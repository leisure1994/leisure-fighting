// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第二部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART2 = {
  // ============================================
  // 东北地区 - 吉林省（剩余城市）
  // ============================================
  siping: {
    name: "四平",
    center: [124.3504, 43.1666],
    shelters: [
      { id: "sp_001", name: "四平站地下避难所", type: "shelter", position: [124.3504, 43.1666], address: "四平市铁西区英雄大路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "四平火车站地下", description: "四平铁路枢纽地下民防工程" },
      { id: "sp_002", name: "仁兴步行街地下人防", type: "underground_mall", position: [124.3404, 43.1566], address: "四平市铁西区仁兴街", capacity: "2000人", level: "核6级", facilities: "商业区地下防护", access: "仁兴街地下通道", description: "市中心商业区人防工程" },
      { id: "sp_003", name: "英雄广场地下避难所", type: "shelter", position: [124.3604, 43.1766], address: "四平市铁东区英雄广场", capacity: "2500人", level: "核6级", facilities: "广场地下防护", access: "英雄广场地下", description: "广场人防工程" },
      { id: "sp_004", name: "四平战役纪念馆地下防空洞", type: "bunker", position: [124.3704, 43.1466], address: "四平市铁西区", capacity: "3000人", level: "核5级", facilities: "纪念馆配套防护", access: "战役纪念馆地下", description: "纪念建筑人防工程" }
    ],
    targets: [
      { name: "四平火车站", type: "transport", position: [124.3504, 43.1666], risk: "中" },
      { name: "四平热电厂", type: "factory", position: [124.3804, 43.1866], risk: "高" },
      { name: "红嘴钢铁", type: "factory", position: [124.3204, 43.1366], risk: "中" }
    ]
  },

  liaoyuan: {
    name: "辽源",
    center: [125.1453, 42.8880],
    shelters: [
      { id: "ly_001", name: "辽源站地下避难所", type: "shelter", position: [125.1453, 42.8880], address: "辽源市龙山区西宁大路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "辽源火车站地下", description: "辽源铁路枢纽地下民防工程" },
      { id: "ly_002", name: "大什街地下人防", type: "underground_mall", position: [125.1353, 42.8780], address: "辽源市龙山区大什街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "大什街地下通道", description: "市中心商业区人防" },
      { id: "ly_003", name: "辽源矿务局地下避难所", type: "shelter", position: [125.1753, 42.9080], address: "辽源市西安区", capacity: "3000人", level: "核5级", facilities: "矿区配套防护", access: "矿务局地下", description: "矿区人防工程" },
      { id: "ly_004", name: "龙山公园地下防空洞", type: "bunker", position: [125.1553, 42.8680], address: "辽源市龙山区龙山公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "龙山公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "辽源煤矿", type: "factory", position: [125.1653, 42.8980], risk: "高" },
      { name: "辽源火车站", type: "transport", position: [125.1453, 42.8880], risk: "中" },
      { name: "辽源发电厂", type: "factory", position: [125.1253, 42.8580], risk: "中" }
    ]
  },

  tonghua: {
    name: "通化",
    center: [125.9365, 41.7212],
    shelters: [
      { id: "th_001", name: "通化站地下避难所", type: "shelter", position: [125.9365, 41.7212], address: "通化市东昌区建设大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "通化火车站地下", description: "通化铁路枢纽地下民防工程" },
      { id: "th_002", name: "新华大街地下人防", type: "underground_mall", position: [125.9265, 41.7112], address: "通化市东昌区新华大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "新华大街地下通道", description: "市中心商业区人防" },
      { id: "th_003", name: "通化医药高新区地下避难所", type: "shelter", position: [125.9565, 41.7312], address: "通化市二道江区", capacity: "3000人", level: "核6级", facilities: "医药园区配套防护", access: "医药高新区地下", description: "工业园区人防" },
      { id: "th_004", name: "玉皇山公园地下防空洞", type: "bunker", position: [125.9165, 41.7012], address: "通化市东昌区玉皇山公园", capacity: "2000人", level: "核6级", facilities: "山地防空设施", access: "玉皇山公园地下", description: "山地人防工程" }
    ],
    targets: [
      { name: "通化东宝药业", type: "factory", position: [125.9465, 41.7412], risk: "中" },
      { name: "通化火车站", type: "transport", position: [125.9365, 41.7212], risk: "中" },
      { name: "通化发电厂", type: "factory", position: [125.9065, 41.6912], risk: "中" }
    ]
  },

  baishan: {
    name: "白山",
    center: [126.4239, 41.9395],
    shelters: [
      { id: "bs_001", name: "白山市地下避难所", type: "shelter", position: [126.4239, 41.9395], address: "白山市浑江区长白山大街", capacity: "2000人", level: "核6级", facilities: "市级指挥中心", access: "市政府地下", description: "白山市民防指挥中心" },
      { id: "bs_002", name: "合兴地下人防", type: "underground_mall", position: [126.4139, 41.9295], address: "白山市浑江区浑江大街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "合兴大厦地下", description: "市中心商业区人防" },
      { id: "bs_003", name: "白山发电厂地下避难所", type: "shelter", position: [126.4439, 41.9595], address: "白山市浑江区", capacity: "2500人", level: "核6级", facilities: "电厂配套防护", access: "发电厂地下", description: "电厂配套人防" },
      { id: "bs_004", name: "北山公园地下防空洞", type: "bunker", position: [126.3939, 41.9195], address: "白山市浑江区北山公园", capacity: "2000人", level: "核6级", facilities: "山地防空设施", access: "北山公园地下", description: "山地人防工程" }
    ],
    targets: [
      { name: "白山发电厂", type: "factory", position: [126.4439, 41.9595], risk: "高" },
      { name: "通化矿务局", type: "factory", position: [126.4339, 41.9495], risk: "高" },
      { name: "白山铝厂", type: "factory", position: [126.4539, 41.9695], risk: "中" }
    ]
  },

  songyuan: {
    name: "松原",
    center: [124.8254, 45.1361],
    shelters: [
      { id: "sy_001", name: "松原站地下避难所", type: "shelter", position: [124.8254, 45.1361], address: "松原市宁江区乌兰大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "松原火车站地下", description: "松原铁路枢纽地下民防工程" },
      { id: "sy_002", name: "飞宇地下人防", type: "underground_mall", position: [124.8154, 45.1261], address: "松原市宁江区飞宇街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "飞宇街地下通道", description: "市中心商业区人防" },
      { id: "sy_003", name: "吉林油田地下避难所", type: "shelter", position: [124.8554, 45.1561], address: "松原市宁江区", capacity: "3500人", level: "核5级", facilities: "油田配套防护设施", access: "吉林油田地下", description: "油田人防工程" },
      { id: "sy_004", name: "纳仁汗公园地下防空洞", type: "bunker", position: [124.7854, 45.1061], address: "松原市宁江区纳仁汗公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "纳仁汗公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "吉林油田", type: "factory", position: [124.8454, 45.1461], risk: "高" },
      { name: "松原火车站", type: "transport", position: [124.8254, 45.1361], risk: "中" },
      { name: "松原热电厂", type: "factory", position: [124.8754, 45.1661], risk: "高" }
    ]
  },

  baicheng: {
    name: "白城",
    center: [122.8397, 45.6196],
    shelters: [
      { id: "bc_001", name: "白城站地下避难所", type: "shelter", position: [122.8397, 45.6196], address: "白城市洮北区胜利西路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "白城火车站地下", description: "白城铁路枢纽地下民防工程" },
      { id: "bc_002", name: "海明路地下人防", type: "underground_mall", position: [122.8297, 45.6096], address: "白城市洮北区海明路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "海明路地下通道", description: "市中心商业区人防" },
      { id: "bc_003", name: "白城发电厂地下避难所", type: "shelter", position: [122.8697, 45.6396], address: "白城市洮北区", capacity: "3000人", level: "核5级", facilities: "电厂配套防护", access: "发电厂地下", description: "电厂人防工程" },
      { id: "bc_004", name: "劳动公园地下防空洞", type: "bunker", position: [122.7897, 45.5996], address: "白城市洮北区劳动公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "劳动公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "白城发电厂", type: "factory", position: [122.8697, 45.6396], risk: "高" },
      { name: "白城火车站", type: "transport", position: [122.8397, 45.6196], risk: "中" },
      { name: "白城水厂", type: "factory", position: [122.8597, 45.6296], risk: "中" }
    ]
  },

  // ============================================
  // 东北地区 - 辽宁省（剩余城市）
  // ============================================
  yingkou: {
    name: "营口",
    center: [122.2352, 40.6669],
    shelters: [
      { id: "yk_001", name: "营口东站地下避难所", type: "shelter", position: [122.3152, 40.6869], address: "营口市老边区渤海大街", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "营口东站地下", description: "营口高铁枢纽地下民防工程" },
      { id: "yk_002", name: "营口站地下避难所", type: "shelter", position: [122.2352, 40.6669], address: "营口市站前区金牛山大街", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "营口火车站地下", description: "传统火车站地下民防" },
      { id: "yk_003", name: "财富中心地下人防", type: "underground_mall", position: [122.2252, 40.6569], address: "营口市站前区市府路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "财富中心地下", description: "商业中心人防工程" },
      { id: "yk_004", name: "营口港地下指挥中心", type: "bunker", position: [122.1552, 40.6469], address: "营口市鲅鱼圈区", capacity: "3500人", level: "核5级", facilities: "港口配套防护", access: "营口港地下", description: "重要港口人防工程" }
    ],
    targets: [
      { name: "营口港", type: "port", position: [122.1552, 40.6469], risk: "中" },
      { name: "营口东站", type: "transport", position: [122.3152, 40.6869], risk: "中" },
      { name: "营口电厂", type: "factory", position: [122.2652, 40.6769], risk: "高" },
      { name: "五矿营钢", type: "factory", position: [122.1952, 40.6369], risk: "高" }
    ]
  },

  panjin: {
    name: "盘锦",
    center: [122.0699, 41.1196],
    shelters: [
      { id: "pj_001", name: "盘锦站地下避难所", type: "shelter", position: [122.0699, 41.1196], address: "盘锦市双台子区双兴北路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "盘锦火车站地下", description: "盘锦铁路枢纽地下民防工程" },
      { id: "pj_002", name: "盘锦北站地下避难所", type: "shelter", position: [122.1699, 41.1796], address: "盘锦市盘山县", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "盘锦北站地下", description: "盘锦高铁枢纽民防" },
      { id: "pj_003", name: "水游城地下人防", type: "underground_mall", position: [122.0599, 41.1096], address: "盘锦市兴隆台区石油大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "水游城地下", description: "商业中心人防工程" },
      { id: "pj_004", name: "辽河油田地下避难所", type: "bunker", position: [122.0899, 41.1396], address: "盘锦市兴隆台区", capacity: "4000人", level: "核5级", facilities: "油田配套深层防护", access: "辽河油田地下", description: "油田重要人防工程" }
    ],
    targets: [
      { name: "辽河油田", type: "factory", position: [122.0899, 41.1396], risk: "高" },
      { name: "盘锦港", type: "port", position: [122.0099, 41.0596], risk: "中" },
      { name: "华锦化工", type: "factory", position: [122.1199, 41.1596], risk: "高" },
      { name: "盘锦火车站", type: "transport", position: [122.0699, 41.1196], risk: "中" }
    ]
  },

  huludao: {
    name: "葫芦岛",
    center: [120.8369, 40.7551],
    shelters: [
      { id: "hld_001", name: "葫芦岛北站地下避难所", type: "shelter", position: [120.8569, 40.8051], address: "葫芦岛市连山区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "葫芦岛北站地下", description: "葫芦岛高铁枢纽地下民防工程" },
      { id: "hld_002", name: "葫芦岛站地下避难所", type: "shelter", position: [120.8369, 40.7551], address: "葫芦岛市连山区永昌路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "葫芦岛火车站地下", description: "传统火车站地下民防" },
      { id: "hld_003", name: "飞天广场地下人防", type: "underground_mall", position: [120.8269, 40.7451], address: "葫芦岛市龙港区龙湾大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "飞天广场地下", description: "商业中心人防工程" },
      { id: "hld_004", name: "葫芦岛港地下指挥中心", type: "bunker", position: [120.7669, 40.7151], address: "葫芦岛市龙港区", capacity: "3500人", level: "核5级", facilities: "港口配套深层防护", access: "葫芦岛港地下", description: "军港重要人防工程" }
    ],
    targets: [
      { name: "葫芦岛港", type: "port", position: [120.7669, 40.7151], risk: "中" },
      { name: "渤海造船厂", type: "factory", position: [120.7869, 40.7351], risk: "高" },
      { name: "葫芦岛电厂", type: "factory", position: [120.8569, 40.7751], risk: "高" },
      { name: "葫芦岛火车站", type: "transport", position: [120.8369, 40.7551], risk: "中" }
    ]
  },

  chaoyang: {
    name: "朝阳",
    center: [120.4511, 41.5768],
    shelters: [
      { id: "cy_001", name: "朝阳站地下避难所", type: "shelter", position: [120.4511, 41.5768], address: "朝阳市双塔区龙山街", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护", access: "朝阳火车站地下", description: "朝阳铁路枢纽地下民防工程" },
      { id: "cy_002", name: "新华广场地下人防", type: "underground_mall", position: [120.4411, 41.5668], address: "朝阳市双塔区新华路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "新华广场地下", description: "市中心商业区人防" },
      { id: "cy_003", name: "朝阳机场地下避难所", type: "shelter", position: [120.5111, 41.5368], address: "朝阳市双塔区", capacity: "2000人", level: "核5级", facilities: "机场配套防护", access: "朝阳机场地下", description: "航空枢纽人防工程" },
      { id: "cy_004", name: "北塔地下防空洞", type: "bunker", position: [120.4611, 41.5868], address: "朝阳市双塔区北塔", capacity: "2500人", level: "核6级", facilities: "历史建筑地下防空", access: "北塔地下", description: "古建筑人防工程" }
    ],
    targets: [
      { name: "朝阳火车站", type: "transport", position: [120.4511, 41.5768], risk: "中" },
      { name: "朝阳发电厂", type: "factory", position: [120.4711, 41.5968], risk: "高" },
      { name: "凌源钢铁", type: "factory", position: [119.4211, 41.2468], risk: "中" }
    ]
  },

  tieling: {
    name: "铁岭",
    center: [123.8443, 42.2862],
    shelters: [
      { id: "tl_001", name: "铁岭西站地下避难所", type: "shelter", position: [123.8043, 42.3162], address: "铁岭市铁岭县", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "铁岭西站地下", description: "铁岭高铁枢纽地下民防工程" },
      { id: "tl_002", name: "铁岭站地下避难所", type: "shelter", position: [123.8443, 42.2862], address: "铁岭市银州区工人街", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护", access: "铁岭火车站地下", description: "传统火车站地下民防" },
      { id: "tl_003", name: "兴隆百货地下人防", type: "underground_mall", position: [123.8343, 42.2762], address: "铁岭市银州区南马路", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "兴隆百货地下", description: "商业中心人防工程" },
      { id: "tl_004", name: "铁岭电厂地下避难所", type: "shelter", position: [123.8743, 42.3062], address: "铁岭市清河区", capacity: "3000人", level: "核5级", facilities: "电厂配套防护", access: "铁岭电厂地下", description: "电厂人防工程" }
    ],
    targets: [
      { name: "铁岭电厂", type: "factory", position: [123.8743, 42.3062], risk: "高" },
      { name: "铁岭火车站", type: "transport", position: [123.8443, 42.2862], risk: "中" },
      { name: "铁煤集团", type: "factory", position: [123.8243, 42.2662], risk: "高" }
    ]
  },

  fuxin: {
    name: "阜新",
    center: [121.6703, 42.0220],
    shelters: [
      { id: "fx_001", name: "阜新站地下避难所", type: "shelter", position: [121.6803, 42.0520], address: "阜新市细河区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护", access: "阜新站地下", description: "阜新高铁枢纽地下民防工程" },
      { id: "fx_002", name: "阜新南站地下避难所", type: "shelter", position: [121.6703, 42.0220], address: "阜新市海州区振兴路", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护", access: "阜新南站地下", description: "传统火车站地下民防" },
      { id: "fx_003", name: "解放广场地下人防", type: "underground_mall", position: [121.6603, 42.0120], address: "阜新市海州区解放大街", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "解放广场地下", description: "市中心商业区人防" },
      { id: "fx_004", name: "阜新矿务局地下避难所", type: "bunker", position: [121.6403, 41.9920], address: "阜新市海州区", capacity: "3500人", level: "核5级", facilities: "矿区配套深层防护", access: "矿务局地下", description: "重要矿区人防工程" }
    ],
    targets: [
      { name: "阜新煤矿", type: "factory", position: [121.6503, 42.0320], risk: "高" },
      { name: "阜新发电厂", type: "factory", position: [121.6903, 42.0420], risk: "高" },
      { name: "阜新火车站", type: "transport", position: [121.6803, 42.0520], risk: "中" }
    ]
  },

  liaoyang: {
    name: "辽阳",
    center: [123.1815, 41.2695],
    shelters: [
      { id: "ly_001", name: "辽阳站地下避难所", type: "shelter", position: [123.1815, 41.2695], address: "辽阳市白塔区中华大街", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "辽阳火车站地下", description: "辽阳铁路枢纽地下民防工程" },
      { id: "ly_002", name: "辽阳南站地下避难所", type: "shelter", position: [123.1415, 41.2395], address: "辽阳市太子河区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护", access: "辽阳南站地下", description: "辽阳南站地下民防" },
      { id: "ly_003", name: "新世纪广场地下人防", type: "underground_mall", position: [123.1715, 41.2595], address: "辽阳市白塔区民主路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "新世纪广场地下", description: "商业中心人防工程" },
      { id: "ly_004", name: "辽阳石化地下避难所", type: "bunker", position: [123.2215, 41.2995], address: "辽阳市宏伟区", capacity: "4000人", level: "核5级", facilities: "石化企业配套深层防护", access: "辽阳石化地下", description: "重要石化企业人防工程" }
    ],
    targets: [
      { name: "辽阳石化", type: "factory", position: [123.2215, 41.2995], risk: "高" },
      { name: "辽阳火车站", type: "transport", position: [123.1815, 41.2695], risk: "中" },
      { name: "辽阳钢厂", type: "factory", position: [123.2015, 41.2795], risk: "高" },
      { name: "辽阳发电厂", type: "factory", position: [123.1615, 41.2495], risk: "高" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART2;
}
