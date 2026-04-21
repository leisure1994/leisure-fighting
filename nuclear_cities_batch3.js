// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次3）
// 华东地区（江苏、浙江、安徽、福建、江西、山东）
// ============================================

// 华东地区 - 江苏省
const eastJiangsu = {
  // 连云港
  lianyungang: {
    name: "连云港",
    center: [119.2220, 34.4260],
    shelters: [
      { id: "lyg_001", name: "连云港站地下避难所", type: "shelter", position: [119.2220, 34.4260], address: "连云港市新浦区人民东路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "连云港站地下通道", description: "连云港铁路枢纽地下民防工程" },
      { id: "lyg_002", name: "连云港市人防地下商城", type: "underground_mall", position: [119.2178, 34.4234], address: "连云港市海州区解放中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "解放中路地下入口", description: "市中心商业区人防工程" },
      { id: "lyg_003", name: "连云港港地下指挥中心", type: "shelter", position: [119.4567, 34.7567], address: "连云港市连云区", capacity: "3500人", level: "核5级", facilities: "港口应急系统", access: "连云港港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "连云港港", type: "port", position: [119.4567, 34.7567], risk: "中" }, { name: "连云港火车站", type: "transport", position: [119.2220, 34.4260], risk: "中" }]
  },

  // 淮安
  huaian: {
    name: "淮安",
    center: [119.1130, 33.5030],
    shelters: [
      { id: "ha_001", name: "淮安东站地下避难所", type: "shelter", position: [119.1567, 33.5234], address: "淮安市淮安区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施、发电设备", access: "淮安东站地下", description: "淮安高铁枢纽人防工程" },
      { id: "ha_002", name: "淮安站地下避难所", type: "shelter", position: [119.0234, 33.6123], address: "淮安市清江浦区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护设施", access: "淮安站地下", description: "淮安铁路枢纽人防工程" },
      { id: "ha_003", name: "淮安市人防地下商城", type: "underground_mall", position: [119.1089, 33.5001], address: "淮安市清江浦区淮海北路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "淮海北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "淮安火车站", type: "transport", position: [119.0234, 33.6123], risk: "中" }]
  },

  // 盐城
  yancheng: {
    name: "盐城",
    center: [120.1630, 33.3780],
    shelters: [
      { id: "yc_001", name: "盐城站地下避难所", type: "shelter", position: [120.1630, 33.3780], address: "盐城市亭湖区范公中路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "盐城站地下通道", description: "盐城铁路枢纽地下民防工程" },
      { id: "yc_002", name: "盐城市人防地下商城", type: "underground_mall", position: [120.1589, 33.3756], address: "盐城市亭湖区建军中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "建军中路地下入口", description: "市中心商业区人防工程" },
      { id: "yc_003", name: "盐城大丰港地下指挥中心", type: "shelter", position: [120.4567, 33.2567], address: "盐城市大丰区", capacity: "2500人", level: "核5级", facilities: "港口应急系统", access: "大丰港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "盐城火车站", type: "transport", position: [120.1630, 33.3780], risk: "中" }, { name: "大丰港", type: "port", position: [120.4567, 33.2567], risk: "中" }]
  },

  // 扬州
  yangzhou: {
    name: "扬州",
    center: [119.4210, 32.3930],
    shelters: [
      { id: "yz_001", name: "扬州站地下避难所", type: "shelter", position: [119.4210, 32.3930], address: "扬州市邗江区文昌西路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "扬州站地下通道", description: "扬州铁路枢纽地下民防工程" },
      { id: "yz_002", name: "扬州东站地下避难所", type: "shelter", position: [119.4789, 32.3890], address: "扬州市广陵区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "扬州东站地下", description: "高铁枢纽人防工程" },
      { id: "yz_003", name: "扬州市人防地下商城", type: "underground_mall", position: [119.4167, 32.3901], address: "扬州市广陵区文昌中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "文昌中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "扬州火车站", type: "transport", position: [119.4210, 32.3930], risk: "中" }]
  },

  // 镇江
  zhenjiang: {
    name: "镇江",
    center: [119.4550, 32.2040],
    shelters: [
      { id: "zj_001", name: "镇江站地下避难所", type: "shelter", position: [119.4550, 32.2040], address: "镇江市润州区中山西路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "镇江站地下通道", description: "镇江铁路枢纽地下民防工程" },
      { id: "zj_002", name: "镇江南站地下避难所", type: "shelter", position: [119.4234, 32.1789], address: "镇江市丹徒区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "镇江南站地下", description: "高铁枢纽人防工程" },
      { id: "zj_003", name: "镇江市人防地下商城", type: "underground_mall", position: [119.4501, 32.2012], address: "镇江市京口区解放路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "镇江火车站", type: "transport", position: [119.4550, 32.2040], risk: "中" }]
  },

  // 泰州
  taizhou: {
    name: "泰州",
    center: [119.9230, 32.4600],
    shelters: [
      { id: "tz_001", name: "泰州站地下避难所", type: "shelter", position: [119.9230, 32.4600], address: "泰州市海陵区京泰路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "泰州站地下通道", description: "泰州铁路枢纽地下民防工程" },
      { id: "tz_002", name: "泰州市人防地下商城", type: "underground_mall", position: [119.9189, 32.4578], address: "泰州市海陵区鼓楼南路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "鼓楼南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "泰州火车站", type: "transport", position: [119.9230, 32.4600], risk: "低" }]
  },

  // 宿迁
  suqian: {
    name: "宿迁",
    center: [118.2930, 33.9330],
    shelters: [
      { id: "sq_001", name: "宿迁站地下避难所", type: "shelter", position: [118.2930, 33.9330], address: "宿迁市宿城区运河路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "宿迁站地下通道", description: "宿迁铁路枢纽地下民防工程" },
      { id: "sq_002", name: "宿迁市人防地下商城", type: "underground_mall", position: [118.2889, 33.9301], address: "宿迁市宿城区幸福中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "幸福中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "宿迁火车站", type: "transport", position: [118.2930, 33.9330], risk: "低" }]
  }
};

// 华东地区 - 浙江省（除杭州、宁波、温州外）
const eastZhejiang = {
  // 舟山
  zhoushan: {
    name: "舟山",
    center: [122.1060, 30.0200],
    shelters: [
      { id: "zs_001", name: "舟山站地下避难所", type: "shelter", position: [122.1060, 30.0200], address: "舟山市定海区昌洲大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "舟山站地下通道", description: "舟山铁路枢纽地下民防工程" },
      { id: "zs_002", name: "舟山市人防地下商城", type: "underground_mall", position: [122.1012, 30.0178], address: "舟山市定海区解放东路", capacity: "1500人", level: "核6级", facilities: "物资储备、医疗点", access: "解放东路地下入口", description: "市中心商业区人防工程" },
      { id: "zs_003", name: "舟山港地下指挥中心", type: "shelter", position: [122.1567, 30.0234], address: "舟山市定海区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "舟山港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "舟山港", type: "port", position: [122.1567, 30.0234], risk: "中" }]
  },

  // 台州
  taizhou2: {
    name: "台州",
    center: [121.4210, 28.6560],
    shelters: [
      { id: "tz2_001", name: "台州站地下避难所", type: "shelter", position: [121.4210, 28.6560], address: "台州市椒江区市府大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "台州站地下通道", description: "台州铁路枢纽地下民防工程" },
      { id: "tz2_002", name: "台州市人防地下商城", type: "underground_mall", position: [121.4167, 28.6534], address: "台州市椒江区解放南路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "解放南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "台州火车站", type: "transport", position: [121.4210, 28.6560], risk: "中" }]
  },

  // 丽水
  lishui: {
    name: "丽水",
    center: [119.9230, 28.4680],
    shelters: [
      { id: "ls_001", name: "丽水站地下避难所", type: "shelter", position: [119.9230, 28.4680], address: "丽水市莲都区水东路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "丽水站地下通道", description: "丽水铁路枢纽地下民防工程" },
      { id: "ls_002", name: "丽水市人防地下商城", type: "underground_mall", position: [119.9189, 28.4656], address: "丽水市莲都区解放街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "解放街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "丽水火车站", type: "transport", position: [119.9230, 28.4680], risk: "低" }]
  }
};

// 华东地区 - 安徽省
const eastAnhui = {
  // 蚌埠
  bengbu: {
    name: "蚌埠",
    center: [117.3830, 32.9170],
    shelters: [
      { id: "bb_001", name: "蚌埠站地下避难所", type: "shelter", position: [117.3830, 32.9170], address: "蚌埠市龙子湖区淮河路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "蚌埠站地下通道", description: "皖北铁路枢纽地下民防工程" },
      { id: "bb_002", name: "蚌埠南站地下避难所", type: "shelter", position: [117.3567, 32.9234], address: "蚌埠市蚌山区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "蚌埠南站地下", description: "高铁枢纽人防工程" },
      { id: "bb_003", name: "蚌埠市人防地下商城", type: "underground_mall", position: [117.3789, 32.9145], address: "蚌埠市蚌山区胜利中路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "胜利中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "蚌埠火车站", type: "transport", position: [117.3830, 32.9170], risk: "中" }]
  },

  // 淮南
  huainan: {
    name: "淮南",
    center: [117.0180, 32.6460],
    shelters: [
      { id: "hn_001", name: "淮南站地下避难所", type: "shelter", position: [117.0180, 32.6460], address: "淮南市田家庵区舜耕中路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "淮南站地下通道", description: "淮南铁路枢纽地下民防工程" },
      { id: "hn_002", name: "淮南市人防地下商城", type: "underground_mall", position: [117.0134, 32.6434], address: "淮南市田家庵区洞山中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "洞山中路地下入口", description: "市中心商业区人防工程" },
      { id: "hn_003", name: "淮南煤矿地下防空洞", type: "shelter", position: [117.0456, 32.6789], address: "淮南市潘集区", capacity: "5000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "淮南煤矿", type: "factory", position: [117.0456, 32.6789], risk: "中" }]
  },

  // 马鞍山
  maanshan: {
    name: "马鞍山",
    center: [118.5070, 31.6760],
    shelters: [
      { id: "mas_001", name: "马鞍山站地下避难所", type: "shelter", position: [118.5070, 31.6760], address: "马鞍山市花山区红旗北路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "马鞍山站地下通道", description: "马鞍山铁路枢纽地下民防工程" },
      { id: "mas_002", name: "马鞍山东站地下避难所", type: "shelter", position: [118.5567, 31.7234], address: "马鞍山市雨山区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "马鞍山东站地下", description: "高铁枢纽人防工程" },
      { id: "mas_003", name: "马鞍山市人防地下商城", type: "underground_mall", position: [118.5023, 31.6734], address: "马鞍山市花山区解放路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "马鞍山钢铁厂", type: "factory", position: [118.5345, 31.6543], risk: "中" }]
  },

  // 淮北
  huaibei: {
    name: "淮北",
    center: [116.7950, 33.9720],
    shelters: [
      { id: "hb_001", name: "淮北站地下避难所", type: "shelter", position: [116.7950, 33.9720], address: "淮北市相山区古城路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "淮北站地下通道", description: "淮北铁路枢纽地下民防工程" },
      { id: "hb_002", name: "淮北市人防地下商城", type: "underground_mall", position: [116.7901, 33.9698], address: "淮北市相山区孟山北路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "孟山北路地下入口", description: "市中心商业区人防工程" },
      { id: "hb_003", name: "淮北煤矿地下防空洞", type: "shelter", position: [116.8234, 34.0123], address: "淮北市杜集区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "淮北煤矿", type: "factory", position: [116.8234, 34.0123], risk: "中" }]
  },

  // 铜陵
  tongling: {
    name: "铜陵",
    center: [117.8120, 30.9450],
    shelters: [
      { id: "tl2_001", name: "铜陵站地下避难所", type: "shelter", position: [117.8120, 30.9450], address: "铜陵市铜官区北京西路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "铜陵站地下通道", description: "铜陵铁路枢纽地下民防工程" },
      { id: "tl2_002", name: "铜陵市人防地下商城", type: "underground_mall", position: [117.8078, 30.9423], address: "铜陵市铜官区长江中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "长江中路地下入口", description: "市中心商业区人防工程" },
      { id: "tl2_003", name: "铜陵有色地下指挥所", type: "shelter", position: [117.8345, 30.9678], address: "铜陵市铜官区", capacity: "2500人", level: "核5级", facilities: "企业应急系统", access: "铜陵有色地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "铜陵有色", type: "factory", position: [117.8345, 30.9678], risk: "中" }]
  },

  // 安庆
  anqing: {
    name: "安庆",
    center: [117.0640, 30.5430],
    shelters: [
      { id: "aq_001", name: "安庆站地下避难所", type: "shelter", position: [117.0640, 30.5430], address: "安庆市宜秀区迎宾西路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "安庆站地下通道", description: "安庆铁路枢纽地下民防工程" },
      { id: "aq_002", name: "安庆市人防地下商城", type: "underground_mall", position: [117.0598, 30.5406], address: "安庆市迎江区人民路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "安庆火车站", type: "transport", position: [117.0640, 30.5430], risk: "中" }]
  },

  // 黄山
  huangshan: {
    name: "黄山",
    center: [118.3170, 29.7140],
    shelters: [
      { id: "hs2_001", name: "黄山北站地下避难所", type: "shelter", position: [118.2923, 29.8234], address: "黄山市屯溪区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "黄山北站地下", description: "黄山高铁枢纽人防工程" },
      { id: "hs2_002", name: "黄山市人防地下商城", type: "underground_mall", position: [118.3123, 29.7112], address: "黄山市屯溪区黄山西路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "黄山西路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "黄山北站", type: "transport", position: [118.2923, 29.8234], risk: "低" }]
  },

  // 滁州
  chuzhou: {
    name: "滁州",
    center: [118.3160, 32.3030],
    shelters: [
      { id: "cz2_001", name: "滁州站地下避难所", type: "shelter", position: [118.3160, 32.3030], address: "滁州市南谯区洪武西路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "滁州站地下通道", description: "滁州铁路枢纽地下民防工程" },
      { id: "cz2_002", name: "滁州市人防地下商城", type: "underground_mall", position: [118.3112, 32.3006], address: "滁州市琅琊区南谯北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "南谯北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "滁州火车站", type: "transport", position: [118.3160, 32.3030], risk: "中" }]
  },

  // 阜阳
  fuyang: {
    name: "阜阳",
    center: [115.8200, 32.8960],
    shelters: [
      { id: "fy_001", name: "阜阳站地下避难所", type: "shelter", position: [115.8200, 32.8960], address: "阜阳市颍东区北京东路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "阜阳站地下通道", description: "阜阳铁路枢纽地下民防工程" },
      { id: "fy_002", name: "阜阳西站地下避难所", type: "shelter", position: [115.7567, 32.9234], address: "阜阳市颍州区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "阜阳西站地下", description: "高铁枢纽人防工程" },
      { id: "fy_003", name: "阜阳市人防地下商城", type: "underground_mall", position: [115.8156, 32.8934], address: "阜阳市颍州区颍州中路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "颍州中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "阜阳火车站", type: "transport", position: [115.8200, 32.8960], risk: "中" }]
  },

  // 宿州
  suzhou: {
    name: "宿州",
    center: [116.9840, 33.6360],
    shelters: [
      { id: "sz2_001", name: "宿州站地下避难所", type: "shelter", position: [116.9840, 33.6360], address: "宿州市埇桥区工人路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "宿州站地下通道", description: "宿州铁路枢纽地下民防工程" },
      { id: "sz2_002", name: "宿州东站地下避难所", type: "shelter", position: [117.0234, 33.6789], address: "宿州市埇桥区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "宿州东站地下", description: "高铁枢纽人防工程" },
      { id: "sz2_003", name: "宿州市人防地下商城", type: "underground_mall", position: [116.9798, 33.6334], address: "宿州市埇桥区汴河中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "汴河中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "宿州火车站", type: "transport", position: [116.9840, 33.6360], risk: "中" }]
  },

  // 六安
  liuan: {
    name: "六安",
    center: [116.5220, 31.7350],
    shelters: [
      { id: "la_001", name: "六安站地下避难所", type: "shelter", position: [116.5220, 31.7350], address: "六安市裕安区站前路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "六安站地下通道", description: "六安铁路枢纽地下民防工程" },
      { id: "la_002", name: "六安市人防地下商城", type: "underground_mall", position: [116.5178, 31.7323], address: "六安市金安区人民路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "人民路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "六安火车站", type: "transport", position: [116.5220, 31.7350], risk: "中" }]
  },

  // 亳州
  bozhou: {
    name: "亳州",
    center: [115.7790, 33.8460],
    shelters: [
      { id: "bz_001", name: "亳州站地下避难所", type: "shelter", position: [115.7790, 33.8460], address: "亳州市谯城区芍花路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "亳州站地下通道", description: "亳州铁路枢纽地下民防工程" },
      { id: "bz_002", name: "亳州市人防地下商城", type: "underground_mall", position: [115.7745, 33.8434], address: "亳州市谯城区魏武大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "魏武大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "亳州火车站", type: "transport", position: [115.7790, 33.8460], risk: "低" }]
  },

  // 池州
  chizhou: {
    name: "池州",
    center: [117.4890, 30.6560],
    shelters: [
      { id: "cz3_001", name: "池州站地下避难所", type: "shelter", position: [117.4890, 30.6560], address: "池州市贵池区永明路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "池州站地下通道", description: "池州铁路枢纽地下民防工程" },
      { id: "cz3_002", name: "池州市人防地下商城", type: "underground_mall", position: [117.4845, 30.6534], address: "池州市贵池区长江中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "长江中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "池州火车站", type: "transport", position: [117.4890, 30.6560], risk: "低" }]
  },

  // 宣城
  xuancheng: {
    name: "宣城",
    center: [118.7580, 30.9460],
    shelters: [
      { id: "xc_001", name: "宣城站地下避难所", type: "shelter", position: [118.7580, 30.9460], address: "宣城市宣州区鳌峰东路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "宣城站地下通道", description: "宣城铁路枢纽地下民防工程" },
      { id: "xc_002", name: "宣城市人防地下商城", type: "underground_mall", position: [118.7534, 30.9434], address: "宣城市宣州区叠嶂中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "叠嶂中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "宣城火车站", type: "transport", position: [118.7580, 30.9460], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...eastJiangsu,
  ...eastZhejiang,
  ...eastAnhui
};
