// 第二批：15个新一线城市核打击目标数据补充
// 包含：成都、杭州、武汉、西安、重庆、天津、苏州、南京、郑州、长沙、沈阳、青岛、宁波、东莞、佛山

const TARGETS_BATCH2 = {
  "chengdu": {
    "targets": [
      {"name": "成都双流国际机场", "type": "airport", "position": [104.4464, 30.5715], "risk": "高"},
      {"name": "成都天府国际机场", "type": "airport", "position": [104.6281, 30.3075], "risk": "高"},
      {"name": "国电成都金堂电厂", "type": "power", "position": [104.4241, 30.8741], "risk": "高"},
      {"name": "成都自来水六厂", "type": "water", "position": [104.0456, 30.7312], "risk": "高"},
      {"name": "中石油成都炼油厂", "type": "factory", "position": [104.2264, 30.5718], "risk": "高"},
      {"name": "四川石化成都基地", "type": "factory", "position": [104.0423, 30.6812], "risk": "极高"},
      {"name": "成都500kV变电站", "type": "power", "position": [104.0641, 30.6618], "risk": "中"},
      {"name": "成都地铁控制中心", "type": "transport", "position": [104.0665, 30.6582], "risk": "中"},
      {"name": "西部战区指挥中心", "type": "military", "position": [104.0582, 30.6715], "risk": "极高"}
    ]
  },
  "hangzhou": {
    "targets": [
      {"name": "杭州萧山国际机场", "type": "airport", "position": [120.4344, 30.2295], "risk": "高"},
      {"name": "浙能杭州半山电厂", "type": "power", "position": [120.1824, 30.3512], "risk": "高"},
      {"name": "杭州自来水厂", "type": "water", "position": [120.1421, 30.2925], "risk": "高"},
      {"name": "镇海炼化杭州分部", "type": "factory", "position": [120.1245, 30.2845], "risk": "高"},
      {"name": "杭州500kV变电站", "type": "power", "position": [120.0824, 30.1825], "risk": "中"},
      {"name": "阿里云杭州数据中心", "type": "communication", "position": [120.1824, 30.1925], "risk": "中"},
      {"name": "杭州炼油厂", "type": "factory", "position": [120.1624, 30.2325], "risk": "中"},
      {"name": "西气东输杭州末站", "type": "factory", "position": [120.1224, 30.2525], "risk": "高"}
    ]
  },
  "wuhan": {
    "targets": [
      {"name": "武汉天河国际机场", "type": "airport", "position": [114.2081, 30.7765], "risk": "高"},
      {"name": "华能武汉阳逻电厂", "type": "power", "position": [114.6081, 30.6565], "risk": "高"},
      {"name": "武钢集团", "type": "factory", "position": [114.4281, 30.6065], "risk": "极高"},
      {"name": "武汉石化", "type": "factory", "position": [114.3481, 30.5365], "risk": "极高"},
      {"name": "武汉市自来水厂", "type": "water", "position": [114.2981, 30.5865], "risk": "高"},
      {"name": "武汉长江大桥", "type": "bridge", "position": [114.2981, 30.5565], "risk": "中"},
      {"name": "武汉500kV变电站", "type": "power", "position": [114.3381, 30.6165], "risk": "中"},
      {"name": "中部战区指挥中心", "type": "military", "position": [114.3181, 30.5765], "risk": "极高"},
      {"name": "中石化武汉油库", "type": "factory", "position": [114.3681, 30.5165], "risk": "高"}
    ]
  },
  "xian": {
    "targets": [
      {"name": "西安咸阳国际机场", "type": "airport", "position": [108.7516, 34.4471], "risk": "高"},
      {"name": "大唐西安热电厂", "type": "power", "position": [108.9416, 34.3271], "risk": "高"},
      {"name": "西安市自来水厂", "type": "water", "position": [108.9616, 34.3871], "risk": "高"},
      {"name": "长庆油田西安基地", "type": "factory", "position": [108.8916, 34.3071], "risk": "高"},
      {"name": "西安500kV变电站", "type": "power", "position": [108.9316, 34.3571], "risk": "中"},
      {"name": "西部战区指挥中心", "type": "military", "position": [108.9516, 34.2771], "risk": "极高"},
      {"name": "西气东输西安压气站", "type": "factory", "position": [108.8716, 34.3371], "risk": "高"},
      {"name": "西安石化", "type": "factory", "position": [108.9816, 34.3171], "risk": "高"}
    ]
  },
  "chongqing": {
    "targets": [
      {"name": "重庆江北国际机场", "type": "airport", "position": [106.6413, 29.7192], "risk": "高"},
      {"name": "国电重庆发电厂", "type": "power", "position": [106.5413, 29.5992], "risk": "高"},
      {"name": "重庆自来水厂", "type": "water", "position": [106.5813, 29.6792], "risk": "高"},
      {"name": "中石化川维化工", "type": "factory", "position": [106.8813, 29.8992], "risk": "极高"},
      {"name": "西南油气田重庆储气库", "type": "factory", "position": [106.6213, 29.7592], "risk": "高"},
      {"name": "重庆500kV变电站", "type": "power", "position": [106.6613, 29.6392], "risk": "中"},
      {"name": "重庆石化", "type": "factory", "position": [106.7213, 29.5492], "risk": "高"},
      {"name": "西部战区重庆指挥中心", "type": "military", "position": [106.5213, 29.6192], "risk": "极高"}
    ]
  },
  "tianjin": {
    "targets": [
      {"name": "天津滨海国际机场", "type": "airport", "position": [117.3465, 39.1345], "risk": "高"},
      {"name": "国投北疆电厂", "type": "power", "position": [117.7265, 39.0545], "risk": "高"},
      {"name": "天津港", "type": "port", "position": [117.7865, 38.9945], "risk": "极高"},
      {"name": "天津石化", "type": "factory", "position": [117.6265, 38.8745], "risk": "极高"},
      {"name": "天津自来水厂", "type": "water", "position": [117.5265, 39.1045], "risk": "高"},
      {"name": "大港油田", "type": "factory", "position": [117.4865, 38.7645], "risk": "高"},
      {"name": "天津港成品油码头", "type": "factory", "position": [117.7665, 39.0245], "risk": "高"},
      {"name": "天津500kV变电站", "type": "power", "position": [117.5665, 39.0545], "risk": "中"},
      {"name": "东部战区天津指挥中心", "type": "military", "position": [117.5465, 39.1245], "risk": "高"}
    ]
  },
  "suzhou": {
    "targets": [
      {"name": "苏州港", "type": "port", "position": [120.7354, 31.3656], "risk": "高"},
      {"name": "国电苏州望亭电厂", "type": "power", "position": [120.4754, 31.5056], "risk": "高"},
      {"name": "苏州工业园区自来水厂", "type": "water", "position": [120.7554, 31.3256], "risk": "高"},
      {"name": "中石化苏州油库", "type": "factory", "position": [120.7054, 31.3756], "risk": "高"},
      {"name": "苏州500kV变电站", "type": "power", "position": [120.6854, 31.3956], "risk": "中"},
      {"name": "苏州化工园区", "type": "factory", "position": [120.8054, 31.2956], "risk": "高"},
      {"name": "西气东输苏州末站", "type": "factory", "position": [120.6354, 31.4456], "risk": "高"}
    ]
  },
  "nanjing": {
    "targets": [
      {"name": "南京禄口国际机场", "type": "airport", "position": [118.7824, 31.8656], "risk": "高"},
      {"name": "国电南京电厂", "type": "power", "position": [118.7824, 32.0556], "risk": "高"},
      {"name": "南京市自来水厂", "type": "water", "position": [118.8224, 32.0156], "risk": "高"},
      {"name": "中石化金陵石化", "type": "factory", "position": [118.9124, 32.2356], "risk": "极高"},
      {"name": "扬子石化", "type": "factory", "position": [118.9524, 32.2556], "risk": "极高"},
      {"name": "南京港", "type": "port", "position": [118.7424, 32.0756], "risk": "高"},
      {"name": "东部战区指挥中心", "type": "military", "position": [118.8024, 32.0556], "risk": "极高"},
      {"name": "南京长江大桥", "type": "bridge", "position": [118.7424, 32.0656], "risk": "中"},
      {"name": "南京500kV变电站", "type": "power", "position": [118.7624, 32.0456], "risk": "中"}
    ]
  },
  "zhengzhou": {
    "targets": [
      {"name": "郑州新郑国际机场", "type": "airport", "position": [113.8408, 34.5312], "risk": "高"},
      {"name": "国电郑州热电厂", "type": "power", "position": [113.6208, 34.7512], "risk": "高"},
      {"name": "郑州自来水厂", "type": "water", "position": [113.6808, 34.6912], "risk": "高"},
      {"name": "郑州石化", "type": "factory", "position": [113.7208, 34.6512], "risk": "高"},
      {"name": "西气东输郑州分输站", "type": "factory", "position": [113.5808, 34.7912], "risk": "高"},
      {"name": "郑州500kV变电站", "type": "power", "position": [113.6408, 34.7312], "risk": "中"},
      {"name": "中部战区郑州指挥中心", "type": "military", "position": [113.6608, 34.7112], "risk": "极高"},
      {"name": "郑州铁路局枢纽", "type": "transport", "position": [113.6508, 34.7612], "risk": "中"}
    ]
  },
  "changsha": {
    "targets": [
      {"name": "长沙黄花国际机场", "type": "airport", "position": [113.2208, 28.1912], "risk": "高"},
      {"name": "国电长沙电厂", "type": "power", "position": [113.0008, 28.4112], "risk": "高"},
      {"name": "长沙自来水厂", "type": "water", "position": [112.9808, 28.3912], "risk": "高"},
      {"name": "中石化长岭炼化", "type": "factory", "position": [113.3208, 29.1212], "risk": "极高"},
      {"name": "湖南石化", "type": "factory", "position": [113.1008, 28.3112], "risk": "高"},
      {"name": "长沙港", "type": "port", "position": [112.9808, 28.3512], "risk": "中"},
      {"name": "长沙500kV变电站", "type": "power", "position": [113.0608, 28.3312], "risk": "中"},
      {"name": "南部战区长沙指挥中心", "type": "military", "position": [113.0408, 28.3712], "risk": "极高"}
    ]
  },
  "shenyang": {
    "targets": [
      {"name": "沈阳桃仙国际机场", "type": "airport", "position": [123.4833, 41.6383], "risk": "高"},
      {"name": "国电沈阳热电厂", "type": "power", "position": [123.2033, 41.7583], "risk": "高"},
      {"name": "沈阳自来水厂", "type": "water", "position": [123.2233, 41.7783], "risk": "高"},
      {"name": "中石油沈阳石化", "type": "factory", "position": [123.2633, 41.8183], "risk": "高"},
      {"name": "沈阳冶炼厂", "type": "factory", "position": [123.1833, 41.6983], "risk": "高"},
      {"name": "沈阳500kV变电站", "type": "power", "position": [123.2433, 41.7383], "risk": "中"},
      {"name": "北部战区指挥中心", "type": "military", "position": [123.3033, 41.7983], "risk": "极高"},
      {"name": "西气东输沈阳末站", "type": "factory", "position": [123.1633, 41.7183], "risk": "高"}
    ]
  },
  "qingdao": {
    "targets": [
      {"name": "青岛胶东国际机场", "type": "airport", "position": [120.3854, 36.3656], "risk": "高"},
      {"name": "华电青岛电厂", "type": "power", "position": [120.1454, 36.4656], "risk": "高"},
      {"name": "青岛港", "type": "port", "position": [120.3254, 36.0656], "risk": "极高"},
      {"name": "中石化青岛石化", "type": "factory", "position": [120.2254, 36.1856], "risk": "极高"},
      {"name": "青岛自来水厂", "type": "water", "position": [120.2554, 36.2856], "risk": "高"},
      {"name": "青岛500kV变电站", "type": "power", "position": [120.1954, 36.3456], "risk": "中"},
      {"name": "青岛石化工业园", "type": "factory", "position": [120.3054, 36.1456], "risk": "高"},
      {"name": "青岛北海造船厂", "type": "factory", "position": [120.4054, 36.0856], "risk": "中"}
    ]
  },
  "ningbo": {
    "targets": [
      {"name": "宁波栎社国际机场", "type": "airport", "position": [121.4654, 29.8356], "risk": "高"},
      {"name": "国电宁波北仑电厂", "type": "power", "position": [121.8854, 29.9556], "risk": "高"},
      {"name": "宁波港", "type": "port", "position": [121.8454, 29.8956], "risk": "极高"},
      {"name": "镇海炼化", "type": "factory", "position": [121.7054, 29.9756], "risk": "极高"},
      {"name": "宁波自来水厂", "type": "water", "position": [121.5654, 29.9156], "risk": "高"},
      {"name": "宁波500kV变电站", "type": "power", "position": [121.6254, 29.8556], "risk": "中"},
      {"name": "宁波化工园区", "type": "factory", "position": [121.7454, 29.9356], "risk": "高"},
      {"name": "中石化宁波油库", "type": "factory", "position": [121.7854, 29.8756], "risk": "高"}
    ]
  },
  "dongguan": {
    "targets": [
      {"name": "东莞港", "type": "port", "position": [113.7644, 22.8191], "risk": "高"},
      {"name": "国电东莞电厂", "type": "power", "position": [113.6844, 22.9791], "risk": "高"},
      {"name": "东莞自来水厂", "type": "water", "position": [113.7444, 22.8991], "risk": "高"},
      {"name": "中石化东莞油库", "type": "factory", "position": [113.8244, 22.8591], "risk": "高"},
      {"name": "东莞500kV变电站", "type": "power", "position": [113.7044, 22.9391], "risk": "中"},
      {"name": "东莞化工园区", "type": "factory", "position": [113.7844, 22.8791], "risk": "高"},
      {"name": "东莞天然气LNG站", "type": "factory", "position": [113.8444, 22.8991], "risk": "高"}
    ]
  },
  "foshan": {
    "targets": [
      {"name": "佛山沙堤机场", "type": "airport", "position": [113.0744, 23.0491], "risk": "中"},
      {"name": "佛山发电厂", "type": "power", "position": [113.1344, 23.1091], "risk": "高"},
      {"name": "佛山自来水厂", "type": "water", "position": [113.1544, 23.0691], "risk": "高"},
      {"name": "中石化佛山油库", "type": "factory", "position": [113.0344, 23.0291], "risk": "高"},
      {"name": "佛山500kV变电站", "type": "power", "position": [113.0944, 23.0891], "risk": "中"},
      {"name": "西气东输佛山末站", "type": "factory", "position": [113.1944, 23.0391], "risk": "高"},
      {"name": "佛山陶瓷化工园", "type": "factory", "position": [113.0544, 22.9891], "risk": "中"}
    ]
  }
};

module.exports = { TARGETS_BATCH2 };
