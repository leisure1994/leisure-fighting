// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次4）
// 华东（福建、江西、山东）+ 华中（河南、湖北、湖南）
// ============================================

// 华东地区 - 福建省（除福州、厦门外）
const eastFujian = {
  // 莆田
  putian: {
    name: "莆田",
    center: [119.0080, 25.4540],
    shelters: [
      { id: "pt_001", name: "莆田站地下避难所", type: "shelter", position: [119.0080, 25.4540], address: "莆田市秀屿区笏枫路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "莆田站地下通道", description: "莆田铁路枢纽地下民防工程" },
      { id: "pt_002", name: "莆田市人防地下商城", type: "underground_mall", position: [119.0034, 25.4512], address: "莆田市城厢区文献西路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "文献西路地下入口", description: "市中心商业区人防工程" },
      { id: "pt_003", name: "湄洲湾港地下指挥中心", type: "shelter", position: [119.1234, 25.3567], address: "莆田市秀屿区", capacity: "2000人", level: "核5级", facilities: "港口应急系统", access: "湄洲湾港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "湄洲湾港", type: "port", position: [119.1234, 25.3567], risk: "中" }]
  },

  // 三明
  sanming: {
    name: "三明",
    center: [117.6390, 26.2690],
    shelters: [
      { id: "sm_001", name: "三明站地下避难所", type: "shelter", position: [117.6390, 26.2690], address: "三明市三元区工业南路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "三明站地下通道", description: "三明铁路枢纽地下民防工程" },
      { id: "sm_002", name: "三明市人防地下商城", type: "underground_mall", position: [117.6345, 26.2667], address: "三明市三元区列东街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "列东街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "三明火车站", type: "transport", position: [117.6390, 26.2690], risk: "低" }]
  },

  // 泉州
  quanzhou: {
    name: "泉州",
    center: [118.6750, 24.8740],
    shelters: [
      { id: "qz_001", name: "泉州站地下避难所", type: "shelter", position: [118.6750, 24.8740], address: "泉州市丰泽区东西大道", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "泉州站地下通道", description: "泉州铁路枢纽地下民防工程" },
      { id: "qz_002", name: "泉州市人防地下商城", type: "underground_mall", position: [118.6701, 24.8712], address: "泉州市鲤城区中山路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "中山路地下入口", description: "市中心商业区人防工程" },
      { id: "qz_003", name: "泉州港地下指挥中心", type: "shelter", position: [118.7234, 24.8734], address: "泉州市丰泽区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "泉州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "泉州港", type: "port", position: [118.7234, 24.8734], risk: "中" }, { name: "泉州火车站", type: "transport", position: [118.6750, 24.8740], risk: "中" }]
  },

  // 漳州
  zhangzhou: {
    name: "漳州",
    center: [117.6610, 24.5110],
    shelters: [
      { id: "zz_001", name: "漳州站地下避难所", type: "shelter", position: [117.6610, 24.5110], address: "漳州市龙海区龙江南路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "漳州站地下通道", description: "漳州铁路枢纽地下民防工程" },
      { id: "zz_002", name: "漳州市人防地下商城", type: "underground_mall", position: [117.6567, 24.5089], address: "漳州市芗城区延安北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "延安北路地下入口", description: "市中心商业区人防工程" },
      { id: "zz_003", name: "漳州港地下指挥中心", type: "shelter", position: [117.7890, 24.4567], address: "漳州市龙海区", capacity: "2500人", level: "核5级", facilities: "港口应急系统", access: "漳州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "漳州港", type: "port", position: [117.7890, 24.4567], risk: "中" }]
  },

  // 南平
  nanping: {
    name: "南平",
    center: [118.1780, 26.6430],
    shelters: [
      { id: "np_001", name: "南平市站地下避难所", type: "shelter", position: [118.1780, 26.6430], address: "南平市建阳区嘉禾北路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "南平市站地下通道", description: "南平铁路枢纽地下民防工程" },
      { id: "np_002", name: "南平市人防地下商城", type: "underground_mall", position: [118.1734, 26.6406], address: "南平市延平区八一路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "八一路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "南平火车站", type: "transport", position: [118.1780, 26.6430], risk: "低" }]
  },

  // 龙岩
  longyan: {
    name: "龙岩",
    center: [117.0300, 25.0910],
    shelters: [
      { id: "ly2_001", name: "龙岩站地下避难所", type: "shelter", position: [117.0300, 25.0910], address: "龙岩市新罗区罗龙东路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "龙岩站地下通道", description: "龙岩铁路枢纽地下民防工程" },
      { id: "ly2_002", name: "龙岩市人防地下商城", type: "underground_mall", position: [117.0256, 25.0889], address: "龙岩市新罗区中山路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中山路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "龙岩火车站", type: "transport", position: [117.0300, 25.0910], risk: "中" }]
  },

  // 宁德
  ningde: {
    name: "宁德",
    center: [119.5480, 26.6680],
    shelters: [
      { id: "nd_001", name: "宁德站地下避难所", type: "shelter", position: [119.5480, 26.6680], address: "宁德市蕉城区万安西路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "宁德站地下通道", description: "宁德铁路枢纽地下民防工程" },
      { id: "nd_002", name: "宁德市人防地下商城", type: "underground_mall", position: [119.5434, 26.6656], address: "宁德市蕉城区八一五中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "八一五中路地下入口", description: "市中心商业区人防工程" },
      { id: "nd_003", name: "三都澳港地下指挥中心", type: "shelter", position: [119.6123, 26.6234], address: "宁德市蕉城区", capacity: "2000人", level: "核5级", facilities: "港口应急系统", access: "三都澳港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "三都澳港", type: "port", position: [119.6123, 26.6234], risk: "中" }]
  }
};

// 华东地区 - 江西省
const eastJiangxi = {
  // 景德镇
  jingdezhen: {
    name: "景德镇",
    center: [117.2080, 29.2990],
    shelters: [
      { id: "jdz_001", name: "景德镇北站地下避难所", type: "shelter", position: [117.2080, 29.2990], address: "景德镇市珠山区通站路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "景德镇北站地下通道", description: "景德镇铁路枢纽地下民防工程" },
      { id: "jdz_002", name: "景德镇市人防地下商城", type: "underground_mall", position: [117.2034, 29.2967], address: "景德镇市珠山区珠山中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "珠山中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "景德镇火车站", type: "transport", position: [117.2080, 29.2990], risk: "低" }]
  },

  // 萍乡
  pingxiang: {
    name: "萍乡",
    center: [113.8540, 27.6230],
    shelters: [
      { id: "px_001", name: "萍乡站地下避难所", type: "shelter", position: [113.8540, 27.6230], address: "萍乡市安源区跃进北路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "萍乡站地下通道", description: "萍乡铁路枢纽地下民防工程" },
      { id: "px_002", name: "萍乡市人防地下商城", type: "underground_mall", position: [113.8498, 27.6206], address: "萍乡市安源区跃进南路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "跃进南路地下入口", description: "市中心商业区人防工程" },
      { id: "px_003", name: "萍乡煤矿地下防空洞", type: "shelter", position: [113.8823, 27.6456], address: "萍乡市安源区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "萍乡煤矿", type: "factory", position: [113.8823, 27.6456], risk: "中" }]
  },

  // 九江
  jiujiang: {
    name: "九江",
    center: [115.9530, 29.7030],
    shelters: [
      { id: "jj_001", name: "九江站地下避难所", type: "shelter", position: [115.9530, 29.7030], address: "九江市濂溪区长虹大道", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "九江站地下通道", description: "江西北部铁路枢纽地下民防工程" },
      { id: "jj_002", name: "九江市人防地下商城", type: "underground_mall", position: [115.9489, 29.7006], address: "九江市浔阳区浔阳路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "浔阳路地下入口", description: "市中心商业区人防工程" },
      { id: "jj_003", name: "九江港地下指挥中心", type: "shelter", position: [115.9834, 29.7234], address: "九江市浔阳区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "九江港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "九江港", type: "port", position: [115.9834, 29.7234], risk: "中" }, { name: "九江火车站", type: "transport", position: [115.9530, 29.7030], risk: "中" }]
  },

  // 新余
  xinyu: {
    name: "新余",
    center: [114.9390, 27.8050],
    shelters: [
      { id: "xy3_001", name: "新余站地下避难所", type: "shelter", position: [114.9390, 27.8050], address: "新余市渝水区胜利北路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "新余站地下通道", description: "新余铁路枢纽地下民防工程" },
      { id: "xy3_002", name: "新余市人防地下商城", type: "underground_mall", position: [114.9345, 27.8023], address: "新余市渝水区抱石大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "抱石大道地下入口", description: "市中心商业区人防工程" },
      { id: "xy3_003", name: "新余钢铁厂地下指挥所", type: "shelter", position: [114.9678, 27.8345], address: "新余市渝水区", capacity: "3000人", level: "核5级", facilities: "企业应急系统", access: "新钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "新余钢铁", type: "factory", position: [114.9678, 27.8345], risk: "中" }]
  },

  // 鹰潭
  yingtan: {
    name: "鹰潭",
    center: [117.0340, 28.2390],
    shelters: [
      { id: "yt_001", name: "鹰潭站地下避难所", type: "shelter", position: [117.0340, 28.2390], address: "鹰潭市月湖区胜利东路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "鹰潭站地下通道", description: "鹰潭铁路枢纽地下民防工程" },
      { id: "yt_002", name: "鹰潭北站地下避难所", type: "shelter", position: [117.0234, 28.3234], address: "鹰潭市贵溪市", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "鹰潭北站地下", description: "高铁枢纽人防工程" },
      { id: "yt_003", name: "鹰潭市人防地下商城", type: "underground_mall", position: [117.0298, 28.2367], address: "鹰潭市月湖区站江路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "站江路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "鹰潭火车站", type: "transport", position: [117.0340, 28.2390], risk: "中" }]
  },

  // 赣州
  ganzhou: {
    name: "赣州",
    center: [114.9350, 25.8320],
    shelters: [
      { id: "gz_001", name: "赣州站地下避难所", type: "shelter", position: [114.9350, 25.8320], address: "赣州市章贡区五洲大道", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "赣州站地下通道", description: "赣南铁路枢纽地下民防工程" },
      { id: "gz_002", name: "赣州西站地下避难所", type: "shelter", position: [114.9234, 25.8789], address: "赣州市南康区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "赣州西站地下", description: "高铁枢纽人防工程" },
      { id: "gz_003", name: "赣州市人防地下商城", type: "underground_mall", position: [114.9301, 25.8298], address: "赣州市章贡区文清路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "文清路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "赣州火车站", type: "transport", position: [114.9350, 25.8320], risk: "中" }]
  },

  // 吉安
  jian: {
    name: "吉安",
    center: [114.9930, 27.1180],
    shelters: [
      { id: "ja_001", name: "吉安站地下避难所", type: "shelter", position: [114.9930, 27.1180], address: "吉安市青原区青原大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "吉安站地下通道", description: "吉安铁路枢纽地下民防工程" },
      { id: "ja_002", name: "吉安西站地下避难所", type: "shelter", position: [114.9567, 27.0567], address: "吉安市吉州区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "吉安西站地下", description: "高铁枢纽人防工程" },
      { id: "ja_003", name: "吉安市人防地下商城", type: "underground_mall", position: [114.9889, 27.1156], address: "吉安市吉州区阳明东路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "阳明东路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "吉安火车站", type: "transport", position: [114.9930, 27.1180], risk: "中" }]
  },

  // 宜春
  yichun2: {
    name: "宜春",
    center: [114.4170, 27.8160],
    shelters: [
      { id: "yc4_001", name: "宜春站地下避难所", type: "shelter", position: [114.4170, 27.8160], address: "宜春市袁州区宜浦路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "宜春站地下通道", description: "宜春铁路枢纽地下民防工程" },
      { id: "yc4_002", name: "宜春市人防地下商城", type: "underground_mall", position: [114.4123, 27.8134], address: "宜春市袁州区袁山中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "袁山中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "宜春火车站", type: "transport", position: [114.4170, 27.8160], risk: "中" }]
  },

  // 抚州
  fuzhou2: {
    name: "抚州",
    center: [116.3580, 27.9490],
    shelters: [
      { id: "fz2_001", name: "抚州站地下避难所", type: "shelter", position: [116.3580, 27.9490], address: "抚州市临川区站前大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "抚州站地下通道", description: "抚州铁路枢纽地下民防工程" },
      { id: "fz2_002", name: "抚州市人防地下商城", type: "underground_mall", position: [116.3534, 27.9467], address: "抚州市临川区赣东大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "赣东大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "抚州火车站", type: "transport", position: [116.3580, 27.9490], risk: "低" }]
  },

  // 上饶
  shangrao: {
    name: "上饶",
    center: [117.9430, 28.4550],
    shelters: [
      { id: "sr_001", name: "上饶站地下避难所", type: "shelter", position: [117.9430, 28.4550], address: "上饶市信州区站前大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "上饶站地下通道", description: "上饶铁路枢纽地下民防工程" },
      { id: "sr_002", name: "上饶市人防地下商城", type: "underground_mall", position: [117.9389, 28.4523], address: "上饶市信州区中山路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "中山路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "上饶火车站", type: "transport", position: [117.9430, 28.4550], risk: "中" }]
  }
};

// 华东地区 - 山东省
const eastShandong = {
  // 枣庄
  zaozhuang: {
    name: "枣庄",
    center: [117.3220, 34.8110],
    shelters: [
      { id: "zz2_001", name: "枣庄站地下避难所", type: "shelter", position: [117.3220, 34.8110], address: "枣庄市薛城区泰山中路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "枣庄站地下通道", description: "枣庄铁路枢纽地下民防工程" },
      { id: "zz2_002", name: "枣庄市人防地下商城", type: "underground_mall", position: [117.3178, 34.8089], address: "枣庄市中区解放北路", capacity: "2000人", level: "核6级", facilities: "应急物资储备", access: "解放北路地下入口", description: "市中心商业区人防工程" },
      { id: "zz2_003", name: "枣庄煤矿地下防空洞", type: "shelter", position: [117.3456, 34.8456], address: "枣庄市薛城区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "枣庄煤矿", type: "factory", position: [117.3456, 34.8456], risk: "中" }]
  },

  // 东营
  dongying: {
    name: "东营",
    center: [118.6750, 37.4340],
    shelters: [
      { id: "dy_001", name: "东营南站地下避难所", type: "shelter", position: [118.5234, 37.3567], address: "东营市东营区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "东营南站地下", description: "东营铁路枢纽地下民防工程" },
      { id: "dy_002", name: "东营市人防地下商城", type: "underground_mall", position: [118.6701, 34.4312], address: "东营市东营区济南路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "济南路地下入口", description: "市中心商业区人防工程" },
      { id: "dy_003", name: "胜利油田地下指挥中心", type: "shelter", position: [118.7234, 37.4234], address: "东营市东营区", capacity: "5000人", level: "核5级", facilities: "油田应急指挥系统", access: "胜利油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "胜利油田", type: "factory", position: [118.7234, 37.4234], risk: "高" }]
  },

  // 烟台
  yantai: {
    name: "烟台",
    center: [121.4480, 37.4630],
    shelters: [
      { id: "yt2_001", name: "烟台站地下避难所", type: "shelter", position: [121.4480, 37.4630], address: "烟台市芝罘区北马路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "烟台站地下通道", description: "山东半岛铁路枢纽地下民防工程" },
      { id: "yt2_002", name: "烟台南站地下避难所", type: "shelter", position: [121.2567, 37.3789], address: "烟台市莱山区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "烟台南站地下", description: "高铁枢纽人防工程" },
      { id: "yt2_003", name: "烟台市人防地下商城", type: "underground_mall", position: [121.4434, 37.4601], address: "烟台市芝罘区南大街", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "南大街地下入口", description: "市中心商业区人防工程" },
      { id: "yt2_004", name: "烟台港地下指挥中心", type: "shelter", position: [121.4567, 37.5567], address: "烟台市芝罘区", capacity: "4000人", level: "核5级", facilities: "港口应急系统", access: "烟台港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "烟台港", type: "port", position: [121.4567, 37.5567], risk: "高" }, { name: "烟台火车站", type: "transport", position: [121.4480, 37.4630], risk: "中" }]
  },

  // 潍坊
  weifang: {
    name: "潍坊",
    center: [119.1610, 36.7070],
    shelters: [
      { id: "wf_001", name: "潍坊站地下避难所", type: "shelter", position: [119.1610, 36.7070], address: "潍坊市潍城区和平路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "潍坊站地下通道", description: "潍坊铁路枢纽地下民防工程" },
      { id: "wf_002", name: "潍坊北站地下避难所", type: "shelter", position: [119.2234, 36.7789], address: "潍坊市寒亭区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "潍坊北站地下", description: "高铁枢纽人防工程" },
      { id: "wf_003", name: "潍坊市人防地下商城", type: "underground_mall", position: [119.1567, 36.7045], address: "潍坊市潍城区胜利西街", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "胜利西街地下入口", description: "市中心商业区人防工程" },
      { id: "wf_004", name: "潍坊港地下指挥中心", type: "shelter", position: [119.3567, 37.0234], address: "潍坊市滨海区", capacity: "2500人", level: "核5级", facilities: "港口应急系统", access: "潍坊港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "潍坊港", type: "port", position: [119.3567, 37.0234], risk: "中" }, { name: "潍坊火车站", type: "transport", position: [119.1610, 36.7070], risk: "中" }]
  },

  // 济宁
  jining2: {
    name: "济宁",
    center: [116.3490, 35.4150],
    shelters: [
      { id: "jn2_001", name: "济宁站地下避难所", type: "shelter", position: [116.3490, 35.4150], address: "济宁市任城区建设路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "济宁站地下通道", description: "济宁铁路枢纽地下民防工程" },
      { id: "jn2_002", name: "济宁北站地下避难所", type: "shelter", position: [116.4234, 35.4567], address: "济宁市任城区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "济宁北站地下", description: "高铁枢纽人防工程" },
      { id: "jn2_003", name: "济宁市人防地下商城", type: "underground_mall", position: [116.3445, 35.4123], address: "济宁市任城区太白楼中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "太白楼中路地下入口", description: "市中心商业区人防工程" },
      { id: "jn2_004", name: "济宁煤矿地下防空洞", type: "shelter", position: [116.3789, 35.4567], address: "济宁市任城区", capacity: "4500人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "济宁煤矿", type: "factory", position: [116.3789, 35.4567], risk: "中" }]
  },

  // 泰安
  taian: {
    name: "泰安",
    center: [117.0890, 36.2010],
    shelters: [
      { id: "ta_001", name: "泰山站地下避难所", type: "shelter", position: [117.0890, 36.2010], address: "泰安市泰山区龙潭路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "泰山站地下通道", description: "泰安铁路枢纽地下民防工程" },
      { id: "ta_002", name: "泰安站地下避难所", type: "shelter", position: [117.0234, 36.1789], address: "泰安市岱岳区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "泰安站地下", description: "高铁枢纽人防工程" },
      { id: "ta_003", name: "泰安市人防地下商城", type: "underground_mall", position: [117.0845, 36.1989], address: "泰安市泰山区东岳大街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "东岳大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "泰山站", type: "transport", position: [117.0890, 36.2010], risk: "中" }]
  },

  // 威海
  weihai: {
    name: "威海",
    center: [122.1200, 37.5130],
    shelters: [
      { id: "wh_001", name: "威海站地下避难所", type: "shelter", position: [122.1200, 37.5130], address: "威海市环翠区上海路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "威海站地下通道", description: "威海铁路枢纽地下民防工程" },
      { id: "wh_002", name: "威海市人防地下商城", type: "underground_mall", position: [122.1156, 37.5106], address: "威海市环翠区新威路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "新威路地下入口", description: "市中心商业区人防工程" },
      { id: "wh_003", name: "威海港地下指挥中心", type: "shelter", position: [122.1789, 37.5123], address: "威海市环翠区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "威海港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "威海港", type: "port", position: [122.1789, 37.5123], risk: "中" }]
  },

  // 日照
  rizhao: {
    name: "日照",
    center: [119.5270, 35.4170],
    shelters: [
      { id: "rz_001", name: "日照站地下避难所", type: "shelter", position: [119.5270, 35.4170], address: "日照市东港区海滨五路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "日照站地下通道", description: "日照铁路枢纽地下民防工程" },
      { id: "rz_002", name: "日照西站地下避难所", type: "shelter", position: [119.3567, 35.4567], address: "日照市东港区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "日照西站地下", description: "高铁枢纽人防工程" },
      { id: "rz_003", name: "日照市人防地下商城", type: "underground_mall", position: [119.5223, 35.4145], address: "日照市东港区海曲中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "海曲中路地下入口", description: "市中心商业区人防工程" },
      { id: "rz_004", name: "日照港地下指挥中心", type: "shelter", position: [119.5567, 35.4234], address: "日照市东港区", capacity: "3500人", level: "核5级", facilities: "港口应急系统", access: "日照港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "日照港", type: "port", position: [119.5567, 35.4234], risk: "中" }]
  },

  // 临沂
  linyi2: {
    name: "临沂",
    center: [118.3570, 35.1040],
    shelters: [
      { id: "ly3_001", name: "临沂站地下避难所", type: "shelter", position: [118.3570, 35.1040], address: "临沂市兰山区沂蒙路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "临沂站地下通道", description: "鲁南铁路枢纽地下民防工程" },
      { id: "ly3_002", name: "临沂北站地下避难所", type: "shelter", position: [118.4234, 35.1567], address: "临沂市兰山区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "临沂北站地下", description: "高铁枢纽人防工程" },
      { id: "ly3_003", name: "临沂市人防地下商城", type: "underground_mall", position: [118.3523, 35.1012], address: "临沂市兰山区解放路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "临沂火车站", type: "transport", position: [118.3570, 35.1040], risk: "中" }]
  },

  // 德州
  dezhou: {
    name: "德州",
    center: [116.3590, 37.4360],
    shelters: [
      { id: "dz_001", name: "德州站地下避难所", type: "shelter", position: [116.3590, 37.4360], address: "德州市德城区迎宾大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "德州站地下通道", description: "德州铁路枢纽地下民防工程" },
      { id: "dz_002", name: "德州东站地下避难所", type: "shelter", position: [116.4567, 37.4234], address: "德州市陵城区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "德州东站地下", description: "高铁枢纽人防工程" },
      { id: "dz_003", name: "德州市人防地下商城", type: "underground_mall", position: [116.3545, 37.4334], address: "德州市德城区东风中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "东风中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "德州火车站", type: "transport", position: [116.3590, 37.4360], risk: "中" }]
  },

  // 聊城
  liaocheng: {
    name: "聊城",
    center: [115.9850, 36.4570],
    shelters: [
      { id: "lc_001", name: "聊城站地下避难所", type: "shelter", position: [115.9850, 36.4570], address: "聊城市东昌府区站前街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "聊城站地下通道", description: "聊城铁路枢纽地下民防工程" },
      { id: "lc_002", name: "聊城市人防地下商城", type: "underground_mall", position: [115.9801, 36.4545], address: "聊城市东昌府区柳园路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "柳园路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "聊城火车站", type: "transport", position: [115.9850, 36.4570], risk: "中" }]
  },

  // 滨州
  binzhou: {
    name: "滨州",
    center: [117.9720, 37.3830],
    shelters: [
      { id: "bz2_001", name: "滨州站地下避难所", type: "shelter", position: [117.9720, 37.3830], address: "滨州市滨城区渤海二十路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "滨州站地下通道", description: "滨州铁路枢纽地下民防工程" },
      { id: "bz2_002", name: "滨州市人防地下商城", type: "underground_mall", position: [117.9678, 37.3806], address: "滨州市滨城区渤海七路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "渤海七路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "滨州火车站", type: "transport", position: [117.9720, 37.3830], risk: "低" }]
  },

  // 菏泽
  heze: {
    name: "菏泽",
    center: [115.4810, 35.2340],
    shelters: [
      { id: "hz2_001", name: "菏泽站地下避难所", type: "shelter", position: [115.4810, 35.2340], address: "菏泽市牡丹区中华东路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "菏泽站地下通道", description: "菏泽铁路枢纽地下民防工程" },
      { id: "hz2_002", name: "菏泽东站地下避难所", type: "shelter", position: [115.5567, 35.3123], address: "菏泽市定陶区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "菏泽东站地下", description: "高铁枢纽人防工程" },
      { id: "hz2_003", name: "菏泽市人防地下商城", type: "underground_mall", position: [115.4767, 35.2312], address: "菏泽市牡丹区牡丹路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "牡丹路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "菏泽火车站", type: "transport", position: [115.4810, 35.2340], risk: "中" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...eastFujian,
  ...eastJiangxi,
  ...eastShandong
};
