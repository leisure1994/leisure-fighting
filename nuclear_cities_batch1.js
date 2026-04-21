// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据
// 东北地区、华北地区、西北地区、华东部分地区
// ============================================

// 东北地区 - 辽宁省
const northeastLiaoning = {
  // 鞍山
  anshan: {
    name: "鞍山",
    center: [123.0248, 41.1066],
    shelters: [
      { id: "as_001", name: "鞍山火车站地下避难所", type: "shelter", position: [123.0248, 41.1066], address: "鞍山市铁东区建国大道", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "鞍山火车站地下一层", description: "鞍山主要铁路枢纽地下民防工程，战时指挥中心" },
      { id: "as_002", name: "鞍山站地铁站", type: "subway", position: [123.0185, 41.1082], address: "鞍山市铁东区千山中路", capacity: "2000人", level: "核6级", facilities: "应急照明、通风系统、饮用水储备", access: "鞍山站地铁出入口", description: "鞍山轨道交通重要节点" },
      { id: "as_003", name: "鞍山市人防地下商场", type: "underground_mall", position: [123.0156, 41.1058], address: "鞍山市铁东区胜利路", capacity: "4000人", level: "核6级", facilities: "物资储备库、医疗救护站、通信设备", access: "胜利路地下通道入口", description: "市中心商业区人防工程" },
      { id: "as_004", name: "鞍山钢铁厂地下指挥所", type: "shelter", position: [123.0512, 41.1203], address: "鞍山市立山区鞍钢路", capacity: "5000人", level: "核5级", facilities: "独立通风、发电系统、地下水库", access: "鞍钢厂区地下通道", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "鞍山钢铁厂", type: "factory", position: [123.0512, 41.1203], risk: "高" }, { name: "鞍山火车站", type: "transport", position: [123.0248, 41.1066], risk: "中" }]
  },

  // 抚顺
  fushun: {
    name: "抚顺",
    center: [123.9219, 41.8809],
    shelters: [
      { id: "fs_001", name: "抚顺火车站地下避难所", type: "shelter", position: [123.9219, 41.8809], address: "抚顺市新抚区中央大街", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "抚顺火车站地下通道", description: "抚顺铁路枢纽地下民防工程" },
      { id: "fs_002", name: "抚顺市人防地下商业街", type: "underground_mall", position: [123.9178, 41.8756], address: "抚顺市新抚区东一路", capacity: "2500人", level: "核6级", facilities: "应急物资储备、医疗点", access: "东一路地下入口", description: "市中心商业区人防工程" },
      { id: "fs_003", name: "抚顺矿务局地下防空洞", type: "shelter", position: [123.9432, 41.8923], address: "抚顺市望花区雷锋路", capacity: "6000人", level: "核5级", facilities: "矿井通风系统、地下水储备", access: "矿务局地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "抚顺煤矿", type: "factory", position: [123.9432, 41.8923], risk: "高" }, { name: "抚顺石化", type: "factory", position: [123.9567, 41.8834], risk: "高" }]
  },

  // 本溪
  benxi: {
    name: "本溪",
    center: [123.7707, 41.3015],
    shelters: [
      { id: "bx_001", name: "本溪火车站地下避难所", type: "shelter", position: [123.7707, 41.3015], address: "本溪市平山区解放南路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "本溪火车站地下", description: "本溪铁路枢纽地下民防工程" },
      { id: "bx_002", name: "本溪市人防地下商城", type: "underground_mall", position: [123.7654, 41.2987], address: "本溪市平山区站前街", capacity: "2000人", level: "核6级", facilities: "应急物资、医疗点", access: "站前街地下入口", description: "市中心商业区人防工程" },
      { id: "bx_003", name: "本溪钢铁厂地下人防工程", type: "shelter", position: [123.7890, 41.3123], address: "本溪市溪湖区本钢路", capacity: "4500人", level: "核5级", facilities: "独立供电、供水系统", access: "本钢厂区地下通道", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "本溪钢铁厂", type: "factory", position: [123.7890, 41.3123], risk: "高" }]
  },

  // 丹东
  dandong: {
    name: "丹东",
    center: [124.3557, 40.0012],
    shelters: [
      { id: "dd_001", name: "丹东站地下避难所", type: "shelter", position: [124.3557, 40.0012], address: "丹东市振兴区十纬路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "丹东站地下通道", description: "丹东铁路枢纽地下民防工程" },
      { id: "dd_002", name: "丹东市人防地下商场", type: "underground_mall", position: [124.3501, 39.9987], address: "丹东市振兴区七经街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗救护", access: "七经街地下入口", description: "市中心商业区人防工程" },
      { id: "dd_003", name: "丹东港地下指挥中心", type: "shelter", position: [124.3956, 39.9876], address: "丹东市港口区", capacity: "2000人", level: "核5级", facilities: "港口应急指挥系统", access: "丹东港地下", description: "港口重要设施防护工程" }
    ],
    targets: [{ name: "丹东港", type: "port", position: [124.3956, 39.9876], risk: "中" }, { name: "鸭绿江大桥", type: "bridge", position: [124.3967, 40.0432], risk: "中" }]
  },

  // 锦州
  jinzhou: {
    name: "锦州",
    center: [121.1308, 41.1190],
    shelters: [
      { id: "jz_001", name: "锦州站地下避难所", type: "shelter", position: [121.1308, 41.1190], address: "锦州市凌河区延安路", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "锦州站地下通道", description: "辽西铁路枢纽地下民防工程" },
      { id: "jz_002", name: "锦州南站地铁站", type: "subway", position: [121.1123, 41.0987], address: "锦州市太和区渤海大道", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "锦州南站地下", description: "高铁枢纽人防工程" },
      { id: "jz_003", name: "锦州市人防地下商业街", type: "underground_mall", position: [121.1267, 41.1156], address: "锦州市凌河区中央大街", capacity: "3500人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "中央大街地下入口", description: "市中心商业区人防工程" },
      { id: "jz_004", name: "锦州港地下指挥中心", type: "shelter", position: [121.0567, 41.0789], address: "锦州市经济技术开发区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "锦州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "锦州港", type: "port", position: [121.0567, 41.0789], risk: "中" }, { name: "锦州火车站", type: "transport", position: [121.1308, 41.1190], risk: "中" }]
  },

  // 营口
  yingkou: {
    name: "营口",
    center: [122.2190, 40.6670],
    shelters: [
      { id: "yk_001", name: "营口东站地下避难所", type: "shelter", position: [122.4190, 40.7170], address: "营口市老边区渤海大街", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "营口东站地下", description: "高铁枢纽地下民防工程" },
      { id: "yk_002", name: "营口市人防地下商城", type: "underground_mall", position: [122.2156, 40.6645], address: "营口市站前区东升路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "东升路地下入口", description: "市中心商业区人防工程" },
      { id: "yk_003", name: "营口港地下指挥所", type: "shelter", position: [122.2678, 40.6734], address: "营口市鲅鱼圈区", capacity: "3500人", level: "核5级", facilities: "港口应急系统", access: "营口港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "营口港", type: "port", position: [122.2678, 40.6734], risk: "高" }, { name: "辽河大桥", type: "bridge", position: [122.2834, 40.6987], risk: "中" }]
  },

  // 阜新
  fuxin: {
    name: "阜新",
    center: [121.6700, 42.0269],
    shelters: [
      { id: "fx_001", name: "阜新火车站地下避难所", type: "shelter", position: [121.6700, 42.0269], address: "阜新市海州区迎宾大街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "阜新火车站地下", description: "阜新铁路枢纽地下民防工程" },
      { id: "fx_002", name: "阜新市人防地下商场", type: "underground_mall", position: [121.6656, 42.0234], address: "阜新市海州区中华路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中华路地下入口", description: "市中心商业区人防工程" },
      { id: "fx_003", name: "阜新煤矿地下防空洞", type: "shelter", position: [121.6923, 42.0432], address: "阜新市太平区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "阜新煤矿", type: "factory", position: [121.6923, 42.0432], risk: "中" }]
  },

  // 辽阳
  liaoyang: {
    name: "辽阳",
    center: [123.1815, 41.2690],
    shelters: [
      { id: "ly_001", name: "辽阳站地下避难所", type: "shelter", position: [123.1815, 41.2690], address: "辽阳市白塔区中华大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "辽阳站地下通道", description: "辽阳铁路枢纽地下民防工程" },
      { id: "ly_002", name: "辽阳市人防地下商城", type: "underground_mall", position: [123.1767, 41.2656], address: "辽阳市白塔区新运大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "新运大街地下入口", description: "市中心商业区人防工程" },
      { id: "ly_003", name: "辽阳石化地下指挥所", type: "shelter", position: [123.2123, 41.2876], address: "辽阳市宏伟区", capacity: "3500人", level: "核5级", facilities: "企业应急系统", access: "辽阳石化地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "辽阳石化", type: "factory", position: [123.2123, 41.2876], risk: "高" }]
  },

  // 盘锦
  panjin: {
    name: "盘锦",
    center: [122.0707, 41.1245],
    shelters: [
      { id: "pj_001", name: "盘锦站地下避难所", type: "shelter", position: [122.0707, 41.1245], address: "盘锦市双台子区双兴北路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "盘锦站地下通道", description: "盘锦铁路枢纽地下民防工程" },
      { id: "pj_002", name: "盘锦市人防地下商场", type: "underground_mall", position: [122.0656, 41.1212], address: "盘锦市兴隆台区石油大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "石油大街地下入口", description: "市中心商业区人防工程" },
      { id: "pj_003", name: "辽河油田地下指挥中心", type: "shelter", position: [122.0890, 41.1456], address: "盘锦市兴隆台区", capacity: "5000人", level: "核5级", facilities: "油田应急指挥系统", access: "辽河油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "辽河油田", type: "factory", position: [122.0890, 41.1456], risk: "高" }, { name: "盘锦港", type: "port", position: [122.0234, 40.6876], risk: "中" }]
  },

  // 铁岭
  tieling: {
    name: "铁岭",
    center: [123.8420, 42.2920],
    shelters: [
      { id: "tl_001", name: "铁岭站地下避难所", type: "shelter", position: [123.8420, 42.2920], address: "铁岭市银州区光荣街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "铁岭站地下通道", description: "铁岭铁路枢纽地下民防工程" },
      { id: "tl_002", name: "铁岭市人防地下商场", type: "underground_mall", position: [123.8367, 42.2889], address: "铁岭市银州区广裕街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "广裕街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "铁岭火车站", type: "transport", position: [123.8420, 42.2920], risk: "低" }]
  },

  // 朝阳
  chaoyang: {
    name: "朝阳",
    center: [120.4520, 41.5790],
    shelters: [
      { id: "cy_001", name: "朝阳站地下避难所", type: "shelter", position: [120.4520, 41.5790], address: "朝阳市龙城区中山大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "朝阳站地下通道", description: "朝阳铁路枢纽地下民防工程" },
      { id: "cy_002", name: "朝阳市人防地下商城", type: "underground_mall", position: [120.4456, 41.5767], address: "朝阳市双塔区朝阳大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "朝阳大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "朝阳火车站", type: "transport", position: [120.4520, 41.5790], risk: "低" }]
  },

  // 葫芦岛
  huludao: {
    name: "葫芦岛",
    center: [120.8626, 40.7556],
    shelters: [
      { id: "hld_001", name: "葫芦岛站地下避难所", type: "shelter", position: [120.8626, 40.7556], address: "葫芦岛市连山区永昌路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "葫芦岛站地下通道", description: "葫芦岛铁路枢纽地下民防工程" },
      { id: "hld_002", name: "葫芦岛市人防地下商城", type: "underground_mall", position: [120.8567, 40.7523], address: "葫芦岛市连山区中央路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中央路地下入口", description: "市中心商业区人防工程" },
      { id: "hld_003", name: "葫芦岛港地下指挥中心", type: "shelter", position: [120.9234, 40.7234], address: "葫芦岛市龙港区", capacity: "3500人", level: "核5级", facilities: "港口应急系统", access: "葫芦岛港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "葫芦岛港", type: "port", position: [120.9234, 40.7234], risk: "中" }, { name: "葫芦岛火车站", type: "transport", position: [120.8626, 40.7556], risk: "低" }]
  }
};

// ============================================
// 东北地区 - 吉林省
// ============================================
const northeastJilin = {
  // 长春（已存在，补充信息）
  
  // 吉林
  jilin: {
    name: "吉林",
    center: [126.5530, 43.8436],
    shelters: [
      { id: "jl_001", name: "吉林站地下避难所", type: "shelter", position: [126.5530, 43.8436], address: "吉林市昌邑区重庆街", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "吉林站地下通道", description: "吉林省重要铁路枢纽地下民防工程" },
      { id: "jl_002", name: "吉林市人防地下商城", type: "underground_mall", position: [126.5467, 43.8401], address: "吉林市船营区吉林大街", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "吉林大街地下入口", description: "市中心商业区人防工程" },
      { id: "jl_003", name: "吉林石化地下指挥所", type: "shelter", position: [126.5876, 43.8567], address: "吉林市龙潭区", capacity: "5000人", level: "核5级", facilities: "企业应急指挥系统", access: "吉林石化地下", description: "重要化工企业防护工程" },
      { id: "jl_004", name: "松花江地下人防工程", type: "shelter", position: [126.5601, 43.8323], address: "吉林市丰满区", capacity: "3500人", level: "核6级", facilities: "水利设施防护", access: "松花江沿岸地下", description: "重要水利设施防护工程" }
    ],
    targets: [{ name: "吉林石化", type: "factory", position: [126.5876, 43.8567], risk: "高" }, { name: "丰满水电站", type: "dam", position: [126.5601, 43.8323], risk: "高" }]
  },

  // 四平
  siping: {
    name: "四平",
    center: [124.3721, 43.1716],
    shelters: [
      { id: "sp_001", name: "四平站地下避难所", type: "shelter", position: [124.3721, 43.1716], address: "四平市铁西区英雄大路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "四平站地下通道", description: "四平铁路枢纽地下民防工程" },
      { id: "sp_002", name: "四平市人防地下商城", type: "underground_mall", position: [124.3678, 43.1689], address: "四平市铁西区南仁兴街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "南仁兴街地下入口", description: "市中心商业区人防工程" },
      { id: "sp_003", name: "四平东站地下避难所", type: "shelter", position: [124.4234, 43.1567], address: "四平市铁东区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "四平东站地下", description: "高铁枢纽人防工程" }
    ],
    targets: [{ name: "四平火车站", type: "transport", position: [124.3721, 43.1716], risk: "中" }]
  },

  // 辽源
  liaoyuan: {
    name: "辽源",
    center: [125.1440, 42.8880],
    shelters: [
      { id: "lyuan_001", name: "辽源站地下避难所", type: "shelter", position: [125.1440, 42.8880], address: "辽源市龙山区人民大街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "辽源站地下通道", description: "辽源铁路枢纽地下民防工程" },
      { id: "lyuan_002", name: "辽源市人防地下商城", type: "underground_mall", position: [125.1389, 42.8856], address: "辽源市龙山区西宁大路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "西宁大路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "辽源火车站", type: "transport", position: [125.1440, 42.8880], risk: "低" }]
  },

  // 通化
  tonghua: {
    name: "通化",
    center: [125.9377, 41.7219],
    shelters: [
      { id: "th_001", name: "通化站地下避难所", type: "shelter", position: [125.9377, 41.7219], address: "通化市东昌区建设大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "通化站地下通道", description: "通化铁路枢纽地下民防工程" },
      { id: "th_002", name: "通化市人防地下商城", type: "underground_mall", position: [125.9323, 41.7189], address: "通化市东昌区新华大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "新华大街地下入口", description: "市中心商业区人防工程" },
      { id: "th_003", name: "通钢地下指挥所", type: "shelter", position: [125.9678, 41.7456], address: "通化市二道江区", capacity: "3500人", level: "核5级", facilities: "企业应急系统", access: "通钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "通化钢厂", type: "factory", position: [125.9678, 41.7456], risk: "中" }]
  },

  // 白山
  baishan: {
    name: "白山",
    center: [126.4239, 41.9392],
    shelters: [
      { id: "bs_001", name: "白山站地下避难所", type: "shelter", position: [126.4239, 41.9392], address: "白山市浑江区东庆路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "白山站地下通道", description: "白山铁路枢纽地下民防工程" },
      { id: "bs_002", name: "白山市人防地下商城", type: "underground_mall", position: [126.4189, 41.9367], address: "白山市浑江区红旗街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "红旗街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "白山火车站", type: "transport", position: [126.4239, 41.9392], risk: "低" }]
  },

  // 松原
  songyuan: {
    name: "松原",
    center: [124.8320, 45.1410],
    shelters: [
      { id: "sy_001", name: "松原站地下避难所", type: "shelter", position: [124.8320, 45.1410], address: "松原市宁江区建华路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "松原站地下通道", description: "松原铁路枢纽地下民防工程" },
      { id: "sy_002", name: "松原市人防地下商城", type: "underground_mall", position: [124.8267, 45.1389], address: "松原市宁江区乌兰大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "乌兰大街地下入口", description: "市中心商业区人防工程" },
      { id: "sy_003", name: "吉林油田地下指挥中心", type: "shelter", position: [124.8567, 45.1678], address: "松原市宁江区", capacity: "4500人", level: "核5级", facilities: "油田应急指挥系统", access: "吉林油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "吉林油田", type: "factory", position: [124.8567, 45.1678], risk: "高" }]
  },

  // 白城
  baicheng: {
    name: "白城",
    center: [122.8437, 45.6200],
    shelters: [
      { id: "bc_001", name: "白城站地下避难所", type: "shelter", position: [122.8437, 45.6200], address: "白城市洮北区爱国街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "白城站地下通道", description: "白城铁路枢纽地下民防工程" },
      { id: "bc_002", name: "白城市人防地下商城", type: "underground_mall", position: [122.8389, 45.6178], address: "白城市洮北区青年南大街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "青年南大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "白城火车站", type: "transport", position: [122.8437, 45.6200], risk: "低" }]
  },

  // 延边（延吉）
  yanbian: {
    name: "延边",
    center: [129.5080, 42.9080],
    shelters: [
      { id: "yb_001", name: "延吉西站地下避难所", type: "shelter", position: [129.4423, 42.9123], address: "延吉市朝阳川镇", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施、发电设备", access: "延吉西站地下", description: "延边高铁枢纽人防工程" },
      { id: "yb_002", name: "延吉市人防地下商城", type: "underground_mall", position: [129.5034, 42.9056], address: "延吉市参花街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "参花街地下入口", description: "市中心商业区人防工程" },
      { id: "yb_003", name: "延边州政府地下指挥中心", type: "shelter", position: [129.5123, 42.9101], address: "延吉市光明街", capacity: "3500人", level: "核5级", facilities: "应急指挥系统", access: "州政府地下", description: "州级行政中心防护工程" }
    ],
    targets: [{ name: "延吉机场", type: "airport", position: [129.4567, 42.8876], risk: "中" }]
  }
};

// ============================================
// 东北地区 - 黑龙江省
// ============================================
const northeastHeilongjiang = {
  // 哈尔滨（已存在，补充信息）
  
  // 齐齐哈尔
  qiqihaer: {
    name: "齐齐哈尔",
    center: [123.9182, 47.3543],
    shelters: [
      { id: "qqhe_001", name: "齐齐哈尔站地下避难所", type: "shelter", position: [123.9182, 47.3543], address: "齐齐哈尔市铁锋区站前大街", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "齐齐哈尔站地下通道", description: "黑龙江省西部铁路枢纽地下民防工程" },
      { id: "qqhe_002", name: "齐齐哈尔南站地下避难所", type: "shelter", position: [123.9567, 47.3234], address: "齐齐哈尔市龙沙区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "齐齐哈尔南站地下", description: "高铁枢纽人防工程" },
      { id: "qqhe_003", name: "齐齐哈尔市人防地下商城", type: "underground_mall", position: [123.9123, 47.3501], address: "齐齐哈尔市龙沙区龙华路", capacity: "3500人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "龙华路地下入口", description: "市中心商业区人防工程" },
      { id: "qqhe_004", name: "齐钢地下指挥所", type: "shelter", position: [123.9456, 47.3789], address: "齐齐哈尔市富拉尔基区", capacity: "5000人", level: "核5级", facilities: "企业应急系统", access: "齐钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "齐齐哈尔钢厂", type: "factory", position: [123.9456, 47.3789], risk: "高" }, { name: "齐齐哈尔火车站", type: "transport", position: [123.9182, 47.3543], risk: "中" }]
  },

  // 鸡西
  jixi: {
    name: "鸡西",
    center: [130.9690, 45.2950],
    shelters: [
      { id: "jx_001", name: "鸡西站地下避难所", type: "shelter", position: [130.9690, 45.2950], address: "鸡西市鸡冠区兴国中路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "鸡西站地下通道", description: "鸡西铁路枢纽地下民防工程" },
      { id: "jx_002", name: "鸡西市人防地下商城", type: "underground_mall", position: [130.9634, 45.2923], address: "鸡西市鸡冠区中心大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中心大街地下入口", description: "市中心商业区人防工程" },
      { id: "jx_003", name: "鸡西煤矿地下防空洞", type: "shelter", position: [130.9923, 45.3123], address: "鸡西市恒山区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "鸡西煤矿", type: "factory", position: [130.9923, 45.3123], risk: "中" }]
  },

  // 鹤岗
  hegang: {
    name: "鹤岗",
    center: [130.2775, 47.3321],
    shelters: [
      { id: "hg_001", name: "鹤岗站地下避难所", type: "shelter", position: [130.2775, 47.3321], address: "鹤岗市向阳区红军路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "鹤岗站地下通道", description: "鹤岗铁路枢纽地下民防工程" },
      { id: "hg_002", name: "鹤岗市人防地下商城", type: "underground_mall", position: [130.2723, 47.3298], address: "鹤岗市向阳区振兴路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "振兴路地下入口", description: "市中心商业区人防工程" },
      { id: "hg_003", name: "鹤岗煤矿地下防空洞", type: "shelter", position: [130.2989, 47.3456], address: "鹤岗市南山区", capacity: "4500人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "鹤岗煤矿", type: "factory", position: [130.2989, 47.3456], risk: "中" }]
  },

  // 双鸭山
  shuangyashan: {
    name: "双鸭山",
    center: [131.1581, 46.6434],
    shelters: [
      { id: "sys_001", name: "双鸭山站地下避难所", type: "shelter", position: [131.1581, 46.6434], address: "双鸭山市尖山区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "双鸭山站地下通道", description: "双鸭山铁路枢纽地下民防工程" },
      { id: "sys_002", name: "双鸭山市人防地下商城", type: "underground_mall", position: [131.1523, 46.6409], address: "双鸭山市尖山区新兴大街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "新兴大街地下入口", description: "市中心商业区人防工程" },
      { id: "sys_003", name: "双鸭山煤矿地下防空洞", type: "shelter", position: [131.1823, 46.6623], address: "双鸭山市岭东区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "双鸭山煤矿", type: "factory", position: [131.1823, 46.6623], risk: "中" }]
  },

  // 大庆
  daqing: {
    name: "大庆",
    center: [125.1030, 46.5890],
    shelters: [
      { id: "dq_001", name: "大庆西站地下避难所", type: "shelter", position: [124.9989, 46.6123], address: "大庆市让胡路区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽防护设施、发电设备", access: "大庆西站地下", description: "大庆高铁枢纽人防工程" },
      { id: "dq_002", name: "大庆东站地下避难所", type: "shelter", position: [125.1567, 46.5456], address: "大庆市龙凤区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "大庆东站地下", description: "大庆高铁枢纽人防工程" },
      { id: "dq_003", name: "大庆市人防地下商城", type: "underground_mall", position: [125.1123, 46.5967], address: "大庆市萨尔图区会战大街", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "会战大街地下入口", description: "市中心商业区人防工程" },
      { id: "dq_004", name: "大庆油田地下指挥中心", type: "shelter", position: [125.0876, 46.5734], address: "大庆市萨尔图区", capacity: "6000人", level: "核5级", facilities: "油田应急指挥系统", access: "大庆油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "大庆油田", type: "factory", position: [125.0876, 46.5734], risk: "高" }, { name: "大庆石化", type: "factory", position: [125.1234, 46.5289], risk: "高" }]
  },

  // 伊春
  yichun: {
    name: "伊春",
    center: [128.9090, 47.7270],
    shelters: [
      { id: "yc_001", name: "伊春站地下避难所", type: "shelter", position: [128.9090, 47.7270], address: "伊春市伊春区前进路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "伊春站地下通道", description: "伊春铁路枢纽地下民防工程" },
      { id: "yc_002", name: "伊春市人防地下商城", type: "underground_mall", position: [128.9034, 47.7245], address: "伊春市伊春区新兴中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "新兴中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "伊春火车站", type: "transport", position: [128.9090, 47.7270], risk: "低" }]
  },

  // 佳木斯
  jiamusi: {
    name: "佳木斯",
    center: [130.3660, 46.8060],
    shelters: [
      { id: "jms_001", name: "佳木斯站地下避难所", type: "shelter", position: [130.3660, 46.8060], address: "佳木斯市站前区站前路", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "佳木斯站地下通道", description: "黑龙江省东部铁路枢纽地下民防工程" },
      { id: "jms_002", name: "佳木斯市人防地下商城", type: "underground_mall", position: [130.3601, 46.8034], address: "佳木斯市前进区长安路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "长安路地下入口", description: "市中心商业区人防工程" },
      { id: "jms_003", name: "佳木斯港地下指挥中心", type: "shelter", position: [130.4234, 46.8234], address: "佳木斯市东风区", capacity: "2500人", level: "核5级", facilities: "港口应急系统", access: "佳木斯港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "佳木斯港", type: "port", position: [130.4234, 46.8234], risk: "中" }, { name: "佳木斯火车站", type: "transport", position: [130.3660, 46.8060], risk: "中" }]
  },

  // 七台河
  qitaihe: {
    name: "七台河",
    center: [131.0080, 45.7760],
    shelters: [
      { id: "qth_001", name: "七台河站地下避难所", type: "shelter", position: [131.0080, 45.7760], address: "七台河市桃山区大同街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "七台河站地下通道", description: "七台河铁路枢纽地下民防工程" },
      { id: "qth_002", name: "七台河市人防地下商城", type: "underground_mall", position: [131.0023, 45.7734], address: "七台河市桃山区山湖路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "山湖路地下入口", description: "市中心商业区人防工程" },
      { id: "qth_003", name: "七台河煤矿地下防空洞", type: "shelter", position: [131.0289, 45.7934], address: "七台河市茄子河区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "七台河煤矿", type: "factory", position: [131.0289, 45.7934], risk: "中" }]
  },

  // 牡丹江
  mudanjiang: {
    name: "牡丹江",
    center: [129.6186, 44.5880],
    shelters: [
      { id: "mdj_001", name: "牡丹江站地下避难所", type: "shelter", position: [129.6186, 44.5880], address: "牡丹江市西安区西三条路", capacity: "4000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "牡丹江站地下通道", description: "黑龙江省东南部铁路枢纽地下民防工程" },
      { id: "mdj_002", name: "牡丹江市人防地下商城", type: "underground_mall", position: [129.6123, 44.5856], address: "牡丹江市东安区太平路", capacity: "3500人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "太平路地下入口", description: "市中心商业区人防工程" },
      { id: "mdj_003", name: "牡丹江机场地下避难所", type: "shelter", position: [129.6234, 44.5234], address: "牡丹江市西安区", capacity: "3000人", level: "核5级", facilities: "机场应急系统", access: "牡丹江机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "牡丹江火车站", type: "transport", position: [129.6186, 44.5880], risk: "中" }, { name: "牡丹江机场", type: "airport", position: [129.6234, 44.5234], risk: "中" }]
  },

  // 黑河
  heihe: {
    name: "黑河",
    center: [127.4990, 50.2450],
    shelters: [
      { id: "hh_001", name: "黑河站地下避难所", type: "shelter", position: [127.4990, 50.2450], address: "黑河市爱辉区铁路街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "黑河站地下通道", description: "黑河铁路枢纽地下民防工程" },
      { id: "hh_002", name: "黑河市人防地下商城", type: "underground_mall", position: [127.4934, 50.2423], address: "黑河市爱辉区中央街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中央街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "黑河火车站", type: "transport", position: [127.4990, 50.2450], risk: "低" }]
  },

  // 绥化
  suihua: {
    name: "绥化",
    center: [126.9680, 46.6540],
    shelters: [
      { id: "sh_001", name: "绥化站地下避难所", type: "shelter", position: [126.9680, 46.6540], address: "绥化市北林区太平路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "绥化站地下通道", description: "绥化铁路枢纽地下民防工程" },
      { id: "sh_002", name: "绥化市人防地下商城", type: "underground_mall", position: [126.9623, 46.6512], address: "绥化市北林区中兴东大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中兴东大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "绥化火车站", type: "transport", position: [126.9680, 46.6540], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...northeastLiaoning,
  ...northeastJilin,
  ...northeastHeilongjiang
};
