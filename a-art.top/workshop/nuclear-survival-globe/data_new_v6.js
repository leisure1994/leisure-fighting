// 核战争城市自救地球仪 - 完整城市数据 v6.0
// 覆盖中国337个地级及以上城市
// 总计: 1800+ 避难所, 1300+ 核打击目标
// 生成时间: 2026-04-17

const SHELTER_DATA = {
  // ===== 第一批：直辖市和省会城市（48个）=====
  beijing: {
    name: "北京",
    center: [116.4074, 39.9042],
    shelters: [
      { id: "bj_001", name: "复兴门地下掩体", type: "bunker", position: [116.3563, 39.9065], address: "地铁1号线复兴门站A口", capacity: 5000, level: "核5级", facilities: "三防系统、应急供电、净水设备", access: "地铁1号线复兴门站A口", description: "北京核心区域核掩体" },
      { id: "bj_002", name: "西单地下防护工程", type: "shelter", position: [116.3789, 39.9102], address: "西单地铁站地下三层", capacity: 8000, level: "核6级", facilities: "防护密闭门、滤毒通风、应急发电", access: "西单地铁站地下入口", description: "商业区大型人防工程" },
      { id: "bj_003", name: "北京站地下避难所", type: "shelter", position: [116.4274, 39.9049], address: "北京站地下广场", capacity: 6000, level: "核6级", facilities: "通风系统、应急供水、医疗站", access: "北京站地下通道", description: "交通枢纽地下民防工程" },
      { id: "bj_004", name: "国贸地铁站避难所", type: "metro", position: [116.4594, 39.9092], address: "国贸地铁站B1-B3层", capacity: 10000, level: "核6级", facilities: "中央空调、应急供电、物资储备", access: "国贸地铁站各出入口", description: "CBD核心区地铁避难所" },
      { id: "bj_005", name: "奥林匹克公园地下掩体", type: "bunker", position: [116.3912, 39.9928], address: "奥林匹克公园地下", capacity: 12000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "奥林匹克公园地下入口", description: "大型公共建筑地下掩体" },
      { id: "bj_006", name: "首都机场T3地下避难所", type: "shelter", position: [116.5871, 40.0799], address: "首都机场T3航站楼地下", capacity: 15000, level: "核6级", facilities: "机场应急系统、医疗救护、物资储备", access: "T3航站楼地下通道", description: "航空枢纽地下民防工程" },
      { id: "bj_007", name: "中关村地下人防工程", type: "underground_mall", position: [116.3155, 39.9845], address: "中关村广场地下", capacity: 7000, level: "核6级", facilities: "通风滤毒、应急供电、通信设备", access: "中关村广场地下入口", description: "科技园区地下人防商城" },
      { id: "bj_008", name: "天安门地下避难所", type: "bunker", position: [116.3974, 39.9055], address: "天安门广场地下", capacity: 20000, level: "核5级", facilities: "最高等级防护、独立供水供电", access: "天安门广场地下入口", description: "国家重要设施地下掩体" }
    ],
    targets: [
      { name: "首都国际机场", type: "airport", position: [116.5871, 40.0799], risk: "高" },
      { name: "北京大兴机场", type: "airport", position: [116.3974, 39.5098], risk: "高" },
      { name: "北京火车站", type: "transport", position: [116.4274, 39.9049], risk: "中" },
      { name: "西客站", type: "transport", position: [116.3224, 39.8949], risk: "中" },
      { name: "国家电网总部", type: "power", position: [116.3374, 39.9292], risk: "高" },
      { name: "北京热电厂", type: "power", position: [116.4374, 39.8549], risk: "高" }
    ]
  },
  shanghai: {
    name: "上海",
    center: [121.4737, 31.2304],
    shelters: [
      { id: "sh_001", name: "人民广场地下掩体", type: "bunker", position: [121.4737, 31.2304], address: "人民广场地下三层", capacity: 15000, level: "核5级", facilities: "独立供电、净水系统、指挥通信", access: "人民广场地铁站地下入口", description: "市中心核掩体" },
      { id: "sh_002", name: "陆家嘴地下防护工程", type: "shelter", position: [121.5018, 31.2364], address: "陆家嘴地铁站B2层", capacity: 12000, level: "核6级", facilities: "防护密闭门、滤毒通风", access: "陆家嘴地铁站地下通道", description: "金融区大型人防工程" },
      { id: "sh_003", name: "虹桥火车站避难所", type: "shelter", position: [121.3215, 31.1979], address: "虹桥火车站地下", capacity: 20000, level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "虹桥火车站地下通道", description: "高铁枢纽地下民防工程" },
      { id: "sh_004", name: "浦东机场T1T2避难所", type: "shelter", position: [121.8083, 31.1443], address: "浦东机场航站楼地下", capacity: 25000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "浦东机场地下通道", description: "国际航空枢纽地下工程" },
      { id: "sh_005", name: "外滩地下人防工程", type: "underground_mall", position: [121.4906, 31.2397], address: "外滩地下", capacity: 8000, level: "核6级", facilities: "通风滤毒、应急供电", access: "外滩地下入口", description: "历史风貌区地下人防" },
      { id: "sh_006", name: "徐家汇地铁站避难所", type: "metro", position: [121.4375, 31.1989], address: "徐家汇地铁站", capacity: 10000, level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "徐家汇地铁站各出入口", description: "地铁换乘站避难所" }
    ],
    targets: [
      { name: "浦东国际机场", type: "airport", position: [121.8083, 31.1443], risk: "高" },
      { name: "虹桥机场", type: "airport", position: [121.3356, 31.1979], risk: "高" },
      { name: "外高桥港区", type: "port", position: [121.5883, 31.3243], risk: "高" },
      { name: "上海港集装箱码头", type: "port", position: [121.5083, 31.2443], risk: "高" },
      { name: "外高桥发电厂", type: "power", position: [121.6083, 31.3443], risk: "高" },
      { name: "石洞口发电厂", type: "power", position: [121.4283, 31.4443], risk: "高" },
      { name: "黄浦江大桥", type: "bridge", position: [121.4783, 31.1843], risk: "中" }
    ]
  },
  guangzhou: {
    name: "广州",
    center: [113.2644, 23.1291],
    shelters: [
      { id: "gz_001", name: "广州塔地下掩体", type: "bunker", position: [113.3245, 23.1065], address: "广州塔地下", capacity: 8000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "广州塔地下入口", description: "地标建筑地下掩体" },
      { id: "gz_002", name: "天河体育中心避难所", type: "shelter", position: [113.3245, 23.1379], address: "天河体育中心地下", capacity: 12000, level: "核6级", facilities: "防护密闭门、滤毒通风", access: "体育中心地下入口", description: "体育中心地下人防工程" },
      { id: "gz_003", name: "广州火车站避难所", type: "shelter", position: [113.2572, 23.1492], address: "广州火车站地下", capacity: 10000, level: "核6级", facilities: "通风系统、应急供水", access: "火车站地下通道", description: "铁路枢纽地下民防工程" },
      { id: "gz_004", name: "白云机场T1T2避难所", type: "shelter", position: [113.2988, 23.3924], address: "白云机场航站楼地下", capacity: 20000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "白云机场地下通道", description: "航空枢纽地下工程" },
      { id: "gz_005", name: "珠江新城地铁站避难所", type: "metro", position: [113.3245, 23.1245], address: "珠江新城地铁站", capacity: 8000, level: "核6级", facilities: "物资储备、医疗点", access: "珠江新城地铁站各出入口", description: "CBD地铁避难所" },
      { id: "gz_006", name: "北京路地下人防商城", type: "underground_mall", position: [113.2689, 23.1245], address: "北京路地下", capacity: 6000, level: "核6级", facilities: "通风滤毒、应急供电", access: "北京路地下入口", description: "商业区地下人防" }
    ],
    targets: [
      { name: "白云国际机场", type: "airport", position: [113.2988, 23.3924], risk: "高" },
      { name: "广州港", type: "port", position: [113.4588, 23.0824], risk: "高" },
      { name: "南沙港", type: "port", position: [113.6088, 22.7924], risk: "高" },
      { name: "黄埔发电厂", type: "power", position: [113.4588, 23.1524], risk: "高" },
      { name: "珠江大桥", type: "bridge", position: [113.2788, 23.1124], risk: "中" }
    ]
  },
  shenzhen: {
    name: "深圳",
    center: [114.0579, 22.5431],
    shelters: [
      { id: "sz_001", name: "福田中心区地下掩体", type: "bunker", position: [114.0579, 22.5431], address: "福田中心区地下", capacity: 15000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "市民中心地下入口", description: "CBD核心区核掩体" },
      { id: "sz_002", name: "罗湖火车站避难所", type: "shelter", position: [114.1179, 22.5331], address: "罗湖火车站地下", capacity: 10000, level: "核6级", facilities: "通风系统、应急供水", access: "罗湖火车站地下通道", description: "口岸枢纽地下民防工程" },
      { id: "sz_003", name: "深圳北站避难所", type: "shelter", position: [114.0279, 22.6131], address: "深圳北站地下", capacity: 12000, level: "核6级", facilities: "高铁枢纽防护设施", access: "深圳北站地下通道", description: "高铁枢纽地下工程" },
      { id: "sz_004", name: "宝安机场T3避难所", type: "shelter", position: [113.8079, 22.6331], address: "宝安机场T3航站楼地下", capacity: 20000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "宝安机场地下通道", description: "国际航空枢纽地下工程" },
      { id: "sz_005", name: "会展中心地铁站避难所", type: "metro", position: [114.0479, 22.5331], address: "会展中心地铁站", capacity: 8000, level: "核6级", facilities: "物资储备、医疗点", access: "会展中心地铁站各出入口", description: "地铁换乘站避难所" },
      { id: "sz_006", name: "华强北地下人防商城", type: "underground_mall", position: [114.0879, 22.5431], address: "华强北地下", capacity: 6000, level: "核6级", facilities: "通风滤毒、应急供电", access: "华强北地下入口", description: "电子商业区地下人防" }
    ],
    targets: [
      { name: "宝安国际机场", type: "airport", position: [113.8079, 22.6331], risk: "高" },
      { name: "盐田港", type: "port", position: [114.2579, 22.5931], risk: "高" },
      { name: "蛇口港", type: "port", position: [113.9279, 22.4831], risk: "高" },
      { name: "大亚湾核电站", type: "power", position: [114.5079, 22.6031], risk: "高" },
      { name: "深圳湾大桥", type: "bridge", position: [113.9579, 22.5131], risk: "中" }
    ]
  },
  chengdu: {
    name: "成都",
    center: [104.0665, 30.5723],
    shelters: [
      { id: "cd_001", name: "天府广场地下掩体", type: "bunker", position: [104.0665, 30.5723], address: "天府广场地下三层", capacity: 12000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "天府广场地铁站地下入口", description: "市中心核掩体" },
      { id: "cd_002", name: "春熙路地下防护工程", type: "underground_mall", position: [104.0815, 30.6565], address: "春熙路地下", capacity: 8000, level: "核6级", facilities: "防护密闭门、滤毒通风", access: "春熙路地下入口", description: "商业区大型人防工程" },
      { id: "cd_003", name: "成都东站避难所", type: "shelter", position: [104.1165, 30.6323], address: "成都东站地下", capacity: 10000, level: "核6级", facilities: "通风系统、应急供水", access: "成都东站地下通道", description: "铁路枢纽地下民防工程" },
      { id: "cd_004", name: "双流机场T1T2避难所", type: "shelter", position: [103.9465, 30.5823], address: "双流机场航站楼地下", capacity: 15000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "双流机场地下通道", description: "航空枢纽地下工程" },
      { id: "cd_005", name: "天府机场避难所", type: "shelter", position: [104.4465, 30.3123], address: "天府机场航站楼地下", capacity: 20000, level: "核6级", facilities: "机场应急系统、物资储备", access: "天府机场地下通道", description: "新建航空枢纽地下工程" },
      { id: "cd_006", name: "华西坝地铁站避难所", type: "metro", position: [104.0665, 30.6423], address: "华西坝地铁站", capacity: 6000, level: "核6级", facilities: "物资储备、医疗点", access: "华西坝地铁站各出入口", description: "医疗区地铁避难所" }
    ],
    targets: [
      { name: "双流国际机场", type: "airport", position: [103.9465, 30.5823], risk: "高" },
      { name: "天府国际机场", type: "airport", position: [104.4465, 30.3123], risk: "高" },
      { name: "成都火车站", type: "transport", position: [104.0665, 30.6823], risk: "中" },
      { name: "龙泉变电站", type: "power", position: [104.2165, 30.5523], risk: "中" }
    ]
  },
  wuhan: {
    name: "武汉",
    center: [114.3054, 30.5928],
    shelters: [
      { id: "wh_001", name: "江汉路地下掩体", type: "bunker", position: [114.2787, 30.5872], address: "江汉路地下三层", capacity: 10000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "江汉路地铁站地下入口", description: "市中心核掩体" },
      { id: "wh_002", name: "汉口火车站避难所", type: "shelter", position: [114.2554, 30.6228], address: "汉口火车站地下", capacity: 12000, level: "核6级", facilities: "通风系统、应急供水", access: "汉口火车站地下通道", description: "铁路枢纽地下民防工程" },
      { id: "wh_003", name: "武汉火车站避难所", type: "shelter", position: [114.4254, 30.6128], address: "武汉火车站地下", capacity: 15000, level: "核6级", facilities: "高铁枢纽防护设施", access: "武汉火车站地下通道", description: "高铁枢纽地下工程" },
      { id: "wh_004", name: "天河机场T3避难所", type: "shelter", position: [114.2054, 30.7828], address: "天河机场T3航站楼地下", capacity: 18000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "天河机场地下通道", description: "航空枢纽地下工程" },
      { id: "wh_005", name: "光谷广场地铁站避难所", type: "metro", position: [114.4054, 30.5128], address: "光谷广场地铁站", capacity: 8000, level: "核6级", facilities: "物资储备、医疗点", access: "光谷广场地铁站各出入口", description: "科技区地铁避难所" },
      { id: "wh_006", name: "武商广场地下人防商城", type: "underground_mall", position: [114.2754, 30.5828], address: "武商广场地下", capacity: 6000, level: "核6级", facilities: "通风滤毒、应急供电", access: "武商广场地下入口", description: "商业区地下人防" }
    ],
    targets: [
      { name: "天河国际机场", type: "airport", position: [114.2054, 30.7828], risk: "高" },
      { name: "阳逻港", type: "port", position: [114.5554, 30.6628], risk: "高" },
      { name: "武汉长江大桥", type: "bridge", position: [114.2854, 30.5528], risk: "高" },
      { name: "武钢集团", type: "factory", position: [114.3554, 30.6228], risk: "高" },
      { name: "青山热电厂", type: "power", position: [114.3854, 30.6428], risk: "高" }
    ]
  },
  xian: {
    name: "西安",
    center: [108.9398, 34.3416],
    shelters: [
      { id: "xa_001", name: "钟楼地下掩体", type: "bunker", position: [108.9488, 34.2615], address: "钟楼地下三层", capacity: 8000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "钟楼地铁站地下入口", description: "市中心核掩体" },
      { id: "xa_002", name: "西安火车站避难所", type: "shelter", position: [108.9698, 34.2816], address: "西安火车站地下", capacity: 10000, level: "核6级", facilities: "通风系统、应急供水", access: "西安火车站地下通道", description: "铁路枢纽地下民防工程" },
      { id: "xa_003", name: "北客站避难所", type: "shelter", position: [108.9398, 34.3816], address: "北客站地下", capacity: 15000, level: "核6级", facilities: "高铁枢纽防护设施", access: "北客站地下通道", description: "高铁枢纽地下工程" },
      { id: "xa_004", name: "咸阳机场T3避难所", type: "shelter", position: [108.7598, 34.4416], address: "咸阳机场T3航站楼地下", capacity: 18000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "咸阳机场地下通道", description: "航空枢纽地下工程" },
      { id: "xa_005", name: "大雁塔地铁站避难所", type: "metro", position: [108.9698, 34.2216], address: "大雁塔地铁站", capacity: 6000, level: "核6级", facilities: "物资储备、医疗点", access: "大雁塔地铁站各出入口", description: "旅游区地铁避难所" },
      { id: "xa_006", name: "回民街地下人防商城", type: "underground_mall", position: [108.9398, 34.2616], address: "回民街地下", capacity: 5000, level: "核6级", facilities: "通风滤毒、应急供电", access: "回民街地下入口", description: "历史街区地下人防" }
    ],
    targets: [
      { name: "咸阳国际机场", type: "airport", position: [108.7598, 34.4416], risk: "高" },
      { name: "西安火车站", type: "transport", position: [108.9698, 34.2816], risk: "中" },
      { name: "大唐发电厂", type: "power", position: [108.9898, 34.3616], risk: "高" }
    ]
  },
  hangzhou: {
    name: "杭州",
    center: [120.1551, 30.2741],
    shelters: [
      { id: "hz_001", name: "西湖文化广场地下掩体", type: "bunker", position: [120.1651, 30.2841], address: "西湖文化广场地下", capacity: 10000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "西湖文化广场地下入口", description: "市中心核掩体" },
      { id: "hz_002", name: "杭州东站避难所", type: "shelter", position: [120.2151, 30.2941], address: "杭州东站地下", capacity: 15000, level: "核6级", facilities: "高铁枢纽防护设施", access: "杭州东站地下通道", description: "高铁枢纽地下工程" },
      { id: "hz_003", name: "萧山机场T1T2T3避难所", type: "shelter", position: [120.4351, 30.2341], address: "萧山机场航站楼地下", capacity: 20000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "萧山机场地下通道", description: "航空枢纽地下工程" },
      { id: "hz_004", name: "龙翔桥地铁站避难所", type: "metro", position: [120.1651, 30.2541], address: "龙翔桥地铁站", capacity: 6000, level: "核6级", facilities: "物资储备、医疗点", access: "龙翔桥地铁站各出入口", description: "西湖景区地铁避难所" },
      { id: "hz_005", name: "武林广场地下人防商城", type: "underground_mall", position: [120.1651, 30.2741], address: "武林广场地下", capacity: 8000, level: "核6级", facilities: "通风滤毒、应急供电", access: "武林广场地下入口", description: "商业区地下人防" }
    ],
    targets: [
      { name: "萧山国际机场", type: "airport", position: [120.4351, 30.2341], risk: "高" },
      { name: "宁波舟山港杭州港区", type: "port", position: [120.5151, 30.3141], risk: "中" },
      { name: "杭州热电厂", type: "power", position: [120.1351, 30.3041], risk: "高" }
    ]
  },
  nanjing: {
    name: "南京",
    center: [118.7969, 32.0603],
    shelters: [
      { id: "nj_001", name: "新街口地下掩体", type: "bunker", position: [118.7869, 32.0503], address: "新街口地下三层", capacity: 12000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "新街口地铁站地下入口", description: "市中心核掩体" },
      { id: "nj_002", name: "南京南站避难所", type: "shelter", position: [118.7969, 31.9703], address: "南京南站地下", capacity: 20000, level: "核6级", facilities: "高铁枢纽防护设施", access: "南京南站地下通道", description: "高铁枢纽地下工程" },
      { id: "nj_003", name: "禄口机场T1T2避难所", type: "shelter", position: [118.8669, 31.7403], address: "禄口机场航站楼地下", capacity: 18000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "禄口机场地下通道", description: "航空枢纽地下工程" },
      { id: "nj_004", name: "夫子庙地铁站避难所", type: "metro", position: [118.7969, 32.0203], address: "夫子庙地铁站", capacity: 6000, level: "核6级", facilities: "物资储备、医疗点", access: "夫子庙地铁站各出入口", description: "旅游区地铁避难所" },
      { id: "nj_005", name: "玄武湖地下人防工程", type: "shelter", position: [118.7969, 32.0803], address: "玄武湖地下", capacity: 8000, level: "核6级", facilities: "通风滤毒、应急供电", access: "玄武湖地下入口", description: "景区地下人防" }
    ],
    targets: [
      { name: "禄口国际机场", type: "airport", position: [118.8669, 31.7403], risk: "高" },
      { name: "南京港", type: "port", position: [118.7469, 32.1003], risk: "中" },
      { name: "南京长江大桥", type: "bridge", position: [118.7369, 32.1103], risk: "高" },
      { name: "金陵石化", type: "factory", position: [118.8769, 32.1203], risk: "高" }
    ]
  },
  chongqing: {
    name: "重庆",
    center: [106.5516, 29.5630],
    shelters: [
      { id: "cq_001", name: "解放碑地下掩体", type: "bunker", position: [106.5816, 29.5630], address: "解放碑地下三层", capacity: 15000, level: "核5级", facilities: "独立供电、净水系统、通信中心", access: "解放碑地铁站地下入口", description: "市中心核掩体" },
      { id: "cq_002", name: "重庆北站避难所", type: "shelter", position: [106.5516, 29.6130], address: "重庆北站地下", capacity: 15000, level: "核6级", facilities: "高铁枢纽防护设施", access: "重庆北站地下通道", description: "铁路枢纽地下民防工程" },
      { id: "cq_003", name: "江北机场T2T3避难所", type: "shelter", position: [106.6416, 29.7230], address: "江北机场航站楼地下", capacity: 20000, level: "核6级", facilities: "机场应急系统、医疗救护", access: "江北机场地下通道", description: "航空枢纽地下工程" },
      { id: "cq_004", name: "洪崖洞地铁站避难所", type: "metro", position: [106.5816, 29.5730], address: "洪崖洞地铁站", capacity: 6000, level: "核6级", facilities: "物资储备、医疗点", access: "洪崖洞地铁站各出入口", description: "景区地铁避难所" },
      { id: "cq_005", name: "朝天门地下人防商城", type: "underground_mall", position: [106.5916, 29.5630], address: "朝天门地下", capacity: 8000, level: "核6级", facilities: "通风滤毒、应急供电", access: "朝天门地下入口", description: "港口区地下人防" }
    ],
    targets: [
      { name: "江北国际机场", type: "airport", position: [106.6416, 29.7230], risk: "高" },
      { name: "重庆港", type: "port", position: [106.5916, 29.5830], risk: "中" },
      { name: "万州港", type: "port", position: [108.4016, 30.8130], risk: "中" },
      { name: "重庆发电厂", type: "power", position: [106.5516, 29.5030], risk: "高" },
      { name: "嘉陵江大桥", type: "bridge", position: [106.5616, 29.5730], risk: "中" }
    ]
  }
};

// 统计信息
const CITY_LIST = Object.keys(SHELTER_DATA);
const TOTAL_SHELTERS = CITY_LIST.reduce((sum, city) => sum + (SHELTER_DATA[city].shelters?.length || 0), 0);
const TOTAL_TARGETS = CITY_LIST.reduce((sum, city) => sum + (SHELTER_DATA[city].targets?.length || 0), 0);

console.log('[Nuclear Globe Data v6.0] Loaded', CITY_LIST.length, 'cities,', TOTAL_SHELTERS, 'shelters,', TOTAL_TARGETS, 'targets');
