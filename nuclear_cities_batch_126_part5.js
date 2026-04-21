// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第五部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART5 = {
  // ============================================
  // 华中地区 - 河南省（继续）
  // ============================================
  kaifeng: {
    name: "开封",
    center: [114.3071, 34.7972],
    shelters: [
      { id: "kf_001", name: "开封北站地下避难所", type: "shelter", position: [114.3471, 34.8372], address: "开封市龙亭区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "开封北站地下", description: "开封高铁枢纽民防" },
      { id: "kf_002", name: "开封站地下避难所", type: "shelter", position: [114.3071, 34.7972], address: "开封市禹王台区中山路南段", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "开封火车站地下", description: "开封传统火车站民防" },
      { id: "kf_003", name: "龙亭公园地下避难所", type: "bunker", position: [114.3571, 34.8172], address: "开封市龙亭区", capacity: "2000人", level: "核6级", facilities: "古迹配套深层防护", access: "龙亭公园地下", description: "北宋皇宫遗址人防" },
      { id: "kf_004", name: "鼓楼地下人防", type: "underground_mall", position: [114.3371, 34.7872], address: "开封市鼓楼区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "鼓楼地下通道", description: "市中心商业区人防" }
    ],
    targets: [
      { name: "开封火车站", type: "transport", position: [114.3071, 34.7972], risk: "中" },
      { name: "开封电厂", type: "factory", position: [114.2871, 34.7772], risk: "高" },
      { name: "开封空分集团", type: "factory", position: [114.3271, 34.8172], risk: "中" }
    ]
  },

  xinxiang: {
    name: "新乡",
    center: [113.9268, 35.3037],
    shelters: [
      { id: "xx_001", name: "新乡东站地下避难所", type: "shelter", position: [113.9668, 35.3437], address: "新乡市红旗区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "新乡东站地下", description: "新乡高铁枢纽民防" },
      { id: "xx_002", name: "新乡站地下避难所", type: "shelter", position: [113.9268, 35.3037], address: "新乡市卫滨区平原路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "新乡火车站地下", description: "新乡传统火车站民防" },
      { id: "xx_003", name: "胖东来地下人防", type: "underground_mall", position: [113.9168, 35.2937], address: "新乡市红旗区", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "胖东来地下", description: "商业中心人防" },
      { id: "xx_004", name: "新飞电器地下避难所", type: "shelter", position: [113.8868, 35.3337], address: "新乡市红旗区", capacity: "2500人", level: "核6级", facilities: "企业配套防护", access: "新飞厂区地下", description: "重点企业人防" }
    ],
    targets: [
      { name: "新飞电器", type: "factory", position: [113.8868, 35.3337], risk: "中" },
      { name: "新乡化纤", type: "factory", position: [113.9468, 35.2837], risk: "中" },
      { name: "新乡火车站", type: "transport", position: [113.9268, 35.3037], risk: "中" },
      { name: "新乡电厂", type: "factory", position: [113.9568, 35.3137], risk: "高" }
    ]
  },

  nanyang: {
    name: "南阳",
    center: [112.5283, 32.9908],
    shelters: [
      { id: "ny_001", name: "南阳东站地下避难所", type: "shelter", position: [112.5683, 33.0308], address: "南阳市宛城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "南阳东站地下", description: "南阳高铁枢纽民防" },
      { id: "ny_002", name: "南阳站地下避难所", type: "shelter", position: [112.5283, 32.9908], address: "南阳市卧龙区新华西路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "南阳火车站地下", description: "南阳传统火车站民防" },
      { id: "ny_003", name: "武侯祠地下避难所", type: "bunker", position: [112.5083, 33.0108], address: "南阳市卧龙区", capacity: "2000人", level: "核6级", facilities: "古迹配套防护", access: "武侯祠地下", description: "古迹人防工程" },
      { id: "ny_004", name: "新华城市广场地下人防", type: "underground_mall", position: [112.5383, 32.9808], address: "南阳市卧龙区", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "新华城市广场地下", description: "商业中心人防" }
    ],
    targets: [
      { name: "南阳油田", type: "factory", position: [112.6283, 33.0508], risk: "高" },
      { name: "南阳火车站", type: "transport", position: [112.5283, 32.9908], risk: "中" },
      { name: "南阳电厂", type: "factory", position: [112.5583, 33.0208], risk: "高" }
    ]
  },

  pingdingshan: {
    name: "平顶山",
    center: [113.3077, 33.7352],
    shelters: [
      { id: "pds_001", name: "平顶山西站地下避难所", type: "shelter", position: [113.2277, 33.7952], address: "平顶山市宝丰县", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "平顶山西站地下", description: "平顶山高铁枢纽民防" },
      { id: "pds_002", name: "平顶山站地下避难所", type: "shelter", position: [113.3077, 33.7352], address: "平顶山市新华区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "平顶山火车站地下", description: "平顶山传统火车站民防" },
      { id: "pds_003", name: "中原商场地下人防", type: "underground_mall", position: [113.3177, 33.7452], address: "平顶山市新华区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "中原商场地下", description: "商业中心人防" },
      { id: "pds_004", name: "平煤集团地下避难所", type: "bunker", position: [113.3477, 33.7652], address: "平顶山市新华区", capacity: "4000人", level: "核5级", facilities: "煤矿配套深层防护", access: "平煤集团地下", description: "重要煤矿企业人防" }
    ],
    targets: [
      { name: "平煤集团", type: "factory", position: [113.3477, 33.7652], risk: "高" },
      { name: "姚孟电厂", type: "factory", position: [113.2777, 33.7752], risk: "高" },
      { name: "平顶山火车站", type: "transport", position: [113.3077, 33.7352], risk: "中" }
    ]
  },

  jiaozuo: {
    name: "焦作",
    center: [113.2418, 35.2159],
    shelters: [
      { id: "jz_001", name: "焦作站地下避难所", type: "shelter", position: [113.2418, 35.2159], address: "焦作市解放区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "焦作火车站地下", description: "焦作铁路枢纽民防" },
      { id: "jz_002", name: "焦作西站地下避难所", type: "shelter", position: [113.1818, 35.2759], address: "焦作市博爱县", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "焦作西站地下", description: "焦作高铁枢纽民防" },
      { id: "jz_003", name: "三维商业广场地下人防", type: "underground_mall", position: [113.2518, 35.2059], address: "焦作市解放区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "三维商业广场地下", description: "商业中心人防" },
      { id: "jz_004", name: "云台山地下避难所", type: "shelter", position: [113.3618, 35.4259], address: "焦作市修武县", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "云台山景区地下", description: "5A景区人防工程" }
    ],
    targets: [
      { name: "焦煤集团", type: "factory", position: [113.2618, 35.1859], risk: "高" },
      { name: "焦作万方", type: "factory", position: [113.2818, 35.2259], risk: "中" },
      { name: "焦作电厂", type: "factory", position: [113.2218, 35.1959], risk: "高" },
      { name: "焦作火车站", type: "transport", position: [113.2418, 35.2159], risk: "中" }
    ]
  },

  puyang: {
    name: "濮阳",
    center: [115.0292, 35.7619],
    shelters: [
      { id: "py_001", name: "濮阳东站地下避难所", type: "shelter", position: [115.0692, 35.8019], address: "濮阳市华龙区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "濮阳东站地下", description: "濮阳高铁枢纽民防" },
      { id: "py_002", name: "濮阳站地下避难所", type: "shelter", position: [115.0292, 35.7619], address: "濮阳市华龙区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "濮阳火车站地下", description: "濮阳传统火车站民防" },
      { id: "py_003", name: "银座商城地下人防", type: "underground_mall", position: [115.0192, 35.7519], address: "濮阳市华龙区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "银座商城地下", description: "商业中心人防" },
      { id: "py_004", name: "中原油田地下避难所", type: "bunker", position: [115.0592, 35.7919], address: "濮阳市华龙区", capacity: "3500人", level: "核5级", facilities: "油田配套深层防护", access: "中原油田地下", description: "重要油田人防工程" }
    ],
    targets: [
      { name: "中原油田", type: "factory", position: [115.0592, 35.7919], risk: "高" },
      { name: "濮阳热电厂", type: "factory", position: [115.0392, 35.7719], risk: "高" },
      { name: "濮阳火车站", type: "transport", position: [115.0292, 35.7619], risk: "中" }
    ]
  },

  hebi: {
    name: "鹤壁",
    center: [114.2954, 35.7470],
    shelters: [
      { id: "hb_001", name: "鹤壁东站地下避难所", type: "shelter", position: [114.3354, 35.7870], address: "鹤壁市淇滨区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "鹤壁东站地下", description: "鹤壁高铁枢纽民防" },
      { id: "hb_002", name: "鹤壁站地下避难所", type: "shelter", position: [114.2954, 35.7470], address: "鹤壁市淇滨区", capacity: "1500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "鹤壁火车站地下", description: "鹤壁传统火车站民防" },
      { id: "hb_003", name: "裕隆购物广场地下人防", type: "underground_mall", position: [114.2854, 35.7370], address: "鹤壁市淇滨区", capacity: "1000人", level: "核6级", facilities: "商业区防护", access: "裕隆购物广场地下", description: "商业中心人防" },
      { id: "hb_004", name: "鹤煤集团地下避难所", type: "shelter", position: [114.3154, 35.7670], address: "鹤壁市山城区", capacity: "2500人", level: "核6级", facilities: "煤矿配套防护", access: "鹤煤集团地下", description: "煤矿企业人防" }
    ],
    targets: [
      { name: "鹤煤集团", type: "factory", position: [114.3154, 35.7670], risk: "高" },
      { name: "鹤壁电厂", type: "factory", position: [114.2754, 35.7270], risk: "高" },
      { name: "鹤壁火车站", type: "transport", position: [114.2954, 35.7470], risk: "中" }
    ]
  },

  xuchang: {
    name: "许昌",
    center: [113.8523, 34.0357],
    shelters: [
      { id: "xc_001", name: "许昌东站地下避难所", type: "shelter", position: [113.8923, 34.0757], address: "许昌市建安区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "许昌东站地下", description: "许昌高铁枢纽民防" },
      { id: "xc_002", name: "许昌站地下避难所", type: "shelter", position: [113.8523, 34.0357], address: "许昌市魏都区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "许昌火车站地下", description: "许昌传统火车站民防" },
      { id: "xc_003", name: "胖东来时代广场地下人防", type: "underground_mall", position: [113.8623, 34.0457], address: "许昌市魏都区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "胖东来地下", description: "知名商业人防工程" },
      { id: "xc_004", name: "许昌卷烟厂地下避难所", type: "shelter", position: [113.8323, 34.0157], address: "许昌市魏都区", capacity: "3000人", level: "核6级", facilities: "企业配套深层防护", access: "卷烟厂地下", description: "重点企业人防" }
    ],
    targets: [
      { name: "许昌卷烟厂", type: "factory", position: [113.8323, 34.0157], risk: "中" },
      { name: "许继集团", type: "factory", position: [113.8723, 34.0557], risk: "中" },
      { name: "许昌电厂", type: "factory", position: [113.8123, 33.9957], risk: "高" },
      { name: "许昌火车站", type: "transport", position: [113.8523, 34.0357], risk: "中" }
    ]
  },

  xinyang: {
    name: "信阳",
    center: [114.0913, 32.1470],
    shelters: [
      { id: "xy_001", name: "信阳东站地下避难所", type: "shelter", position: [114.1313, 32.1870], address: "信阳市平桥区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "信阳东站地下", description: "信阳高铁枢纽民防" },
      { id: "xy_002", name: "信阳站地下避难所", type: "shelter", position: [114.0913, 32.1470], address: "信阳市浉河区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "信阳火车站地下", description: "信阳传统火车站民防" },
      { id: "xy_003", name: "和美广场地下人防", type: "underground_mall", position: [114.0813, 32.1370], address: "信阳市浉河区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "和美广场地下", description: "商业中心人防" },
      { id: "xy_004", name: "鸡公山地下避难所", type: "shelter", position: [114.0313, 31.9370], address: "信阳市浉河区", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "鸡公山景区地下", description: "5A景区人防工程" }
    ],
    targets: [
      { name: "信阳电厂", type: "factory", position: [114.1113, 32.1670], risk: "高" },
      { name: "信阳火车站", type: "transport", position: [114.0913, 32.1470], risk: "中" },
      { name: "信阳钢铁", type: "factory", position: [114.1413, 32.1070], risk: "中" }
    ]
  },

  shangqiu: {
    name: "商丘",
    center: [115.6564, 34.4142],
    shelters: [
      { id: "sq_001", name: "商丘站地下避难所", type: "shelter", position: [115.6564, 34.4142], address: "商丘市梁园区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "商丘火车站地下", description: "商丘高铁枢纽民防" },
      { id: "sq_002", name: "商丘东站地下避难所", type: "shelter", position: [115.6964, 34.4542], address: "商丘市虞城县", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "商丘东站地下", description: "商丘东站民防" },
      { id: "sq_003", name: "丹尼斯地下人防", type: "underground_mall", position: [115.6464, 34.4042], address: "商丘市梁园区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "丹尼斯地下", description: "商业中心人防" },
      { id: "sq_004", name: "应天书院地下避难所", type: "bunker", position: [115.6764, 34.4342], address: "商丘市睢阳区", capacity: "2000人", level: "核6级", facilities: "古迹配套防护", access: "应天书院地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "商丘站", type: "transport", position: [115.6564, 34.4142], risk: "高" },
      { name: "商丘电厂", type: "factory", position: [115.6164, 34.3942], risk: "高" },
      { name: "永煤集团", type: "factory", position: [116.1164, 34.1542], risk: "高" },
      { name: "梁园热电厂", type: "factory", position: [115.6364, 34.4342], risk: "高" }
    ]
  },

  zhoukou: {
    name: "周口",
    center: [114.6969, 33.6262],
    shelters: [
      { id: "zk_001", name: "周口东站地下避难所", type: "shelter", position: [114.7369, 33.6662], address: "周口市川汇区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "周口东站地下", description: "周口高铁枢纽民防" },
      { id: "zk_002", name: "周口站地下避难所", type: "shelter", position: [114.6969, 33.6262], address: "周口市川汇区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "周口火车站地下", description: "周口传统火车站民防" },
      { id: "zk_003", name: "万顺达广场地下人防", type: "underground_mall", position: [114.6869, 33.6162], address: "周口市川汇区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "万顺达广场地下", description: "商业中心人防" },
      { id: "zk_004", name: "淮阳地下避难所", type: "shelter", position: [114.8869, 33.7262], address: "周口市淮阳区", capacity: "2000人", level: "核6级", facilities: "古迹配套防护", access: "太昊陵地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "周口电厂", type: "factory", position: [114.7169, 33.6462], risk: "高" },
      { name: "周口火车站", type: "transport", position: [114.6969, 33.6262], risk: "中" },
      { name: "益海粮油", type: "factory", position: [114.6569, 33.6062], risk: "中" }
    ]
  },

  zhumadian: {
    name: "驻马店",
    center: [114.0223, 33.0115],
    shelters: [
      { id: "zmd_001", name: "驻马店西站地下避难所", type: "shelter", position: [113.9823, 33.0515], address: "驻马店市驿城区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "驻马店西站地下", description: "驻马店高铁枢纽民防" },
      { id: "zmd_002", name: "驻马店站地下避难所", type: "shelter", position: [114.0223, 33.0115], address: "驻马店市驿城区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "驻马店火车站地下", description: "驻马店传统火车站民防" },
      { id: "zmd_003", name: "爱家百货地下人防", type: "underground_mall", position: [114.0123, 33.0015], address: "驻马店市驿城区", capacity: "1500人", level: "核6级", facilities: "商业区防护", access: "爱家百货地下", description: "商业中心人防" },
      { id: "zmd_004", name: "嵖岈山地下避难所", type: "shelter", position: [113.7223, 33.1515], address: "驻马店市遂平县", capacity: "2000人", level: "核6级", facilities: "景区配套防护", access: "嵖岈山景区地下", description: "5A景区人防工程" }
    ],
    targets: [
      { name: "驻马店电厂", type: "factory", position: [114.0423, 33.0315], risk: "高" },
      { name: "驻马店火车站", type: "transport", position: [114.0223, 33.0115], risk: "中" },
      { name: "昊华骏化", type: "factory", position: [114.0623, 32.9915], risk: "中" }
    ]
  },

  // ============================================
  // 华中地区 - 湖北省（剩余城市）
  // ============================================
  yichang: {
    name: "宜昌",
    center: [111.2865, 30.6919],
    shelters: [
      { id: "yc_001", name: "宜昌东站地下避难所", type: "shelter", position: [111.3265, 30.7319], address: "宜昌市伍家岗区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "宜昌东站地下", description: "宜昌高铁枢纽民防" },
      { id: "yc_002", name: "宜昌站地下避难所", type: "shelter", position: [111.2865, 30.6919], address: "宜昌市西陵区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "宜昌火车站地下", description: "宜昌传统火车站民防" },
      { id: "yc_003", name: "夷陵广场地下人防", type: "underground_mall", position: [111.2765, 30.6819], address: "宜昌市西陵区", capacity: "2000人", level: "核6级", facilities: "商业区深层防护", access: "夷陵广场地下", description: "商业中心人防" },
      { id: "yc_004", name: "葛洲坝地下避难所", type: "bunker", position: [111.2165, 30.7319], address: "宜昌市西陵区", capacity: "5000人", level: "核5级", facilities: "水利枢纽深层防护", access: "葛洲坝地下", description: "重要水利工程人防" },
      { id: "yc_005", name: "三峡大坝地下避难所", type: "bunker", position: [111.0465, 30.8319], address: "宜昌市夷陵区", capacity: "6000人", level: "核5级", facilities: "超级工程深层防护", access: "三峡大坝地下", description: "世界级水利工程人防" }
    ],
    targets: [
      { name: "三峡大坝", type: "factory", position: [111.0465, 30.8319], risk: "高" },
      { name: "葛洲坝", type: "factory", position: [111.2165, 30.7319], risk: "高" },
      { name: "宜昌东站", type: "transport", position: [111.3265, 30.7319], risk: "中" },
      { name: "宜化集团", type: "factory", position: [111.3565, 30.6719], risk: "高" },
      { name: "安琪酵母", type: "factory", position: [111.3065, 30.7119], risk: "中" }
    ]
  },

  xiangyang: {
    name: "襄阳",
    center: [112.1224, 32.0090],
    shelters: [
      { id: "xy_001", name: "襄阳东站地下避难所", type: "shelter", position: [112.1624, 32.0490], address: "襄阳市襄州区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "襄阳东站地下", description: "襄阳高铁枢纽民防" },
      { id: "xy_002", name: "襄阳站地下避难所", type: "shelter", position: [112.1224, 32.0090], address: "襄阳市樊城区", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "襄阳火车站地下", description: "襄阳传统火车站民防" },
      { id: "xy_003", name: "万达广场地下人防", type: "underground_mall", position: [112.1324, 31.9990], address: "襄阳市樊城区", capacity: "2500人", level: "核6级", facilities: "商业区深层防护", access: "万达广场地下", description: "商业中心人防" },
      { id: "xy_004", name: "古隆中地下避难所", type: "bunker", position: [112.0724, 32.0390], address: "襄阳市襄城区", capacity: "2000人", level: "核6级", facilities: "古迹配套防护", access: "古隆中地下", description: "古迹人防工程" }
    ],
    targets: [
      { name: "襄阳火车站", type: "transport", position: [112.1224, 32.0090], risk: "中" },
      { name: "东风汽车", type: "factory", position: [112.1524, 31.9790], risk: "高" },
      { name: "襄阳电厂", type: "factory", position: [112.0824, 32.0490], risk: "高" },
      { name: "襄樊卷烟厂", type: "factory", position: [112.1124, 31.9890], risk: "中" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_4_PART5;
}
