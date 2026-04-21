// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次2）
// 华北地区、西北地区
// ============================================

// 华北地区 - 河北省
const northHebei = {
  // 邯郸
  handan: {
    name: "邯郸",
    center: [114.4940, 36.6090],
    shelters: [
      { id: "hd_001", name: "邯郸站地下避难所", type: "shelter", position: [114.4940, 36.6090], address: "邯郸市邯山区浴新南大街", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "邯郸站地下通道", description: "邯郸铁路枢纽地下民防工程" },
      { id: "hd_002", name: "邯郸东站地下避难所", type: "shelter", position: [114.5234, 36.6234], address: "邯郸市丛台区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "邯郸东站地下", description: "高铁枢纽人防工程" },
      { id: "hd_003", name: "邯郸市人防地下商城", type: "underground_mall", position: [114.4890, 36.6067], address: "邯郸市丛台区中华北大街", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "中华北大街地下入口", description: "市中心商业区人防工程" },
      { id: "hd_004", name: "邯郸钢铁厂地下指挥所", type: "shelter", position: [114.4567, 36.5876], address: "邯郸市复兴区", capacity: "4500人", level: "核5级", facilities: "企业应急系统", access: "邯钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "邯郸钢铁厂", type: "factory", position: [114.4567, 36.5876], risk: "高" }, { name: "邯郸火车站", type: "transport", position: [114.4940, 36.6090], risk: "中" }]
  },

  // 邢台
  xingtai: {
    name: "邢台",
    center: [114.5047, 37.0700],
    shelters: [
      { id: "xt_001", name: "邢台站地下避难所", type: "shelter", position: [114.5047, 37.0700], address: "邢台市桥东区车站北路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "邢台站地下通道", description: "邢台铁路枢纽地下民防工程" },
      { id: "xt_002", name: "邢台东站地下避难所", type: "shelter", position: [114.5567, 37.0876], address: "邢台市桥东区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "邢台东站地下", description: "高铁枢纽人防工程" },
      { id: "xt_003", name: "邢台市人防地下商城", type: "underground_mall", position: [114.5001, 37.0678], address: "邢台市桥西区中兴西大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中兴西大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "邢台火车站", type: "transport", position: [114.5047, 37.0700], risk: "中" }]
  },

  // 张家口
  zhangjiakou: {
    name: "张家口",
    center: [114.8870, 40.7670],
    shelters: [
      { id: "zjk_001", name: "张家口站地下避难所", type: "shelter", position: [114.8870, 40.7670], address: "张家口市桥东区站前大街", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "张家口站地下通道", description: "张家口铁路枢纽地下民防工程" },
      { id: "zjk_002", name: "张家口市人防地下商城", type: "underground_mall", position: [114.8812, 40.7645], address: "张家口市桥西区至善街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "至善街地下入口", description: "市中心商业区人防工程" },
      { id: "zjk_003", name: "张家口宁远机场地下避难所", type: "shelter", position: [114.9234, 40.7567], address: "张家口市桥东区", capacity: "2000人", level: "核5级", facilities: "机场应急系统", access: "张家口机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "张家口火车站", type: "transport", position: [114.8870, 40.7670], risk: "中" }, { name: "张家口机场", type: "airport", position: [114.9234, 40.7567], risk: "中" }]
  },

  // 承德
  chengde: {
    name: "承德",
    center: [117.9328, 40.9510],
    shelters: [
      { id: "cd_001", name: "承德站地下避难所", type: "shelter", position: [117.9328, 40.9510], address: "承德市双桥区车站路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "承德站地下通道", description: "承德铁路枢纽地下民防工程" },
      { id: "cd_002", name: "承德市人防地下商城", type: "underground_mall", position: [117.9267, 40.9489], address: "承德市双桥区南营子大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "南营子大街地下入口", description: "市中心商业区人防工程" },
      { id: "cd_003", name: "承德普宁机场地下避难所", type: "shelter", position: [118.0567, 41.1789], address: "承德市承德县", capacity: "1500人", level: "核6级", facilities: "机场应急系统", access: "承德机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "承德火车站", type: "transport", position: [117.9328, 40.9510], risk: "低" }, { name: "避暑山庄", type: "landmark", position: [117.9367, 40.9956], risk: "低" }]
  },

  // 沧州
  cangzhou: {
    name: "沧州",
    center: [116.8388, 38.3040],
    shelters: [
      { id: "cz_001", name: "沧州站地下避难所", type: "shelter", position: [116.8388, 38.3040], address: "沧州市新华区新华东路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "沧州站地下通道", description: "沧州铁路枢纽地下民防工程" },
      { id: "cz_002", name: "沧州西站地下避难所", type: "shelter", position: [116.7934, 38.3123], address: "沧州市运河区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "沧州西站地下", description: "高铁枢纽人防工程" },
      { id: "cz_003", name: "沧州市人防地下商城", type: "underground_mall", position: [116.8345, 38.3012], address: "沧州市运河区解放西路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "解放西路地下入口", description: "市中心商业区人防工程" },
      { id: "cz_004", name: "黄骅港地下指挥中心", type: "shelter", position: [117.3234, 38.3678], address: "沧州市黄骅市", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "黄骅港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "黄骅港", type: "port", position: [117.3234, 38.3678], risk: "中" }, { name: "沧州火车站", type: "transport", position: [116.8388, 38.3040], risk: "中" }]
  },

  // 廊坊
  langfang: {
    name: "廊坊",
    center: [116.6830, 39.5380],
    shelters: [
      { id: "lf_001", name: "廊坊站地下避难所", type: "shelter", position: [116.6830, 39.5380], address: "廊坊市广阳区光明东道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "廊坊站地下通道", description: "廊坊铁路枢纽地下民防工程" },
      { id: "lf_002", name: "廊坊北站地下避难所", type: "shelter", position: [116.7123, 39.5567], address: "廊坊市广阳区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "廊坊北站地下", description: "高铁枢纽人防工程" },
      { id: "lf_003", name: "廊坊市人防地下商城", type: "underground_mall", position: [116.6789, 39.5356], address: "廊坊市广阳区新华路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "新华路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "廊坊火车站", type: "transport", position: [116.6830, 39.5380], risk: "中" }]
  },

  // 衡水
  hengshui: {
    name: "衡水",
    center: [115.6860, 37.7390],
    shelters: [
      { id: "hs_001", name: "衡水站地下避难所", type: "shelter", position: [115.6860, 37.7390], address: "衡水市桃城区站前东路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "衡水站地下通道", description: "衡水铁路枢纽地下民防工程" },
      { id: "hs_002", name: "衡水北站地下避难所", type: "shelter", position: [115.7567, 37.7789], address: "衡水市桃城区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "衡水北站地下", description: "高铁枢纽人防工程" },
      { id: "hs_003", name: "衡水市人防地下商城", type: "underground_mall", position: [115.6812, 37.7367], address: "衡水市桃城区人民路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "人民路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "衡水火车站", type: "transport", position: [115.6860, 37.7390], risk: "中" }]
  }
};

// 华北地区 - 山西省
const northShanxi = {
  // 大同
  datong: {
    name: "大同",
    center: [113.3000, 40.0760],
    shelters: [
      { id: "dt_001", name: "大同站地下避难所", type: "shelter", position: [113.3000, 40.0760], address: "大同市平城区站北街", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "大同站地下通道", description: "晋北铁路枢纽地下民防工程" },
      { id: "dt_002", name: "大同南站地下避难所", type: "shelter", position: [113.3234, 40.0432], address: "大同市平城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "大同南站地下", description: "高铁枢纽人防工程" },
      { id: "dt_003", name: "大同市人防地下商城", type: "underground_mall", position: [113.2956, 40.0734], address: "大同市平城区永泰南路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "永泰南路地下入口", description: "市中心商业区人防工程" },
      { id: "dt_004", name: "大同煤矿地下防空洞", type: "shelter", position: [113.3567, 40.1123], address: "大同市云冈区", capacity: "6000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "大同煤矿", type: "factory", position: [113.3567, 40.1123], risk: "高" }, { name: "大同火车站", type: "transport", position: [113.3000, 40.0760], risk: "中" }]
  },

  // 阳泉
  yangquan: {
    name: "阳泉",
    center: [113.5800, 37.8570],
    shelters: [
      { id: "yq_001", name: "阳泉站地下避难所", type: "shelter", position: [113.5800, 37.8570], address: "阳泉市城区德胜东街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "阳泉站地下通道", description: "阳泉铁路枢纽地下民防工程" },
      { id: "yq_002", name: "阳泉北站地下避难所", type: "shelter", position: [113.4567, 38.0123], address: "阳泉市盂县", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "阳泉北站地下", description: "高铁枢纽人防工程" },
      { id: "yq_003", name: "阳泉市人防地下商城", type: "underground_mall", position: [113.5756, 37.8545], address: "阳泉市城区桃北东街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "桃北东街地下入口", description: "市中心商业区人防工程" },
      { id: "yq_004", name: "阳泉煤矿地下防空洞", type: "shelter", position: [113.6123, 37.8789], address: "阳泉市矿区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "阳泉煤矿", type: "factory", position: [113.6123, 37.8789], risk: "中" }]
  },

  // 长治
  changzhi: {
    name: "长治",
    center: [113.1160, 36.1950],
    shelters: [
      { id: "cz_001", name: "长治站地下避难所", type: "shelter", position: [113.1160, 36.1950], address: "长治市潞州区站前路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "长治站地下通道", description: "长治铁路枢纽地下民防工程" },
      { id: "cz_002", name: "长治东站地下避难所", type: "shelter", position: [113.1567, 36.2023], address: "长治市潞州区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "长治东站地下", description: "高铁枢纽人防工程" },
      { id: "cz_003", name: "长治市人防地下商城", type: "underground_mall", position: [113.1112, 36.1923], address: "长治市潞州区英雄中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "英雄中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "长治火车站", type: "transport", position: [113.1160, 36.1950], risk: "中" }]
  },

  // 晋城
  jincheng: {
    name: "晋城",
    center: [112.8510, 35.4900],
    shelters: [
      { id: "jc_001", name: "晋城站地下避难所", type: "shelter", position: [112.8510, 35.4900], address: "晋城市城区迎宾街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "晋城站地下通道", description: "晋城铁路枢纽地下民防工程" },
      { id: "jc_002", name: "晋城市人防地下商城", type: "underground_mall", position: [112.8467, 35.4878], address: "晋城市城区黄华街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "黄华街地下入口", description: "市中心商业区人防工程" },
      { id: "jc_003", name: "晋城煤矿地下防空洞", type: "shelter", position: [112.8789, 35.5123], address: "晋城市泽州县", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "晋城煤矿", type: "factory", position: [112.8789, 35.5123], risk: "中" }]
  },

  // 朔州
  shuozhou: {
    name: "朔州",
    center: [112.4330, 39.3310],
    shelters: [
      { id: "sz_001", name: "朔州站地下避难所", type: "shelter", position: [112.4330, 39.3310], address: "朔州市朔城区站北路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "朔州站地下通道", description: "朔州铁路枢纽地下民防工程" },
      { id: "sz_002", name: "朔州市人防地下商城", type: "underground_mall", position: [112.4289, 39.3289], address: "朔州市朔城区鄯阳街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "鄯阳街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "朔州火车站", type: "transport", position: [112.4330, 39.3310], risk: "低" }]
  },

  // 晋中
  jinzhong: {
    name: "晋中",
    center: [112.7520, 37.6870],
    shelters: [
      { id: "jz_001", name: "晋中站地下避难所", type: "shelter", position: [112.7520, 37.6870], address: "晋中市榆次区迎宾街", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "晋中站地下通道", description: "晋中铁路枢纽地下民防工程" },
      { id: "jz_002", name: "晋中高铁站地下避难所", type: "shelter", position: [112.7234, 37.7567], address: "晋中市榆次区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "晋中高铁站地下", description: "高铁枢纽人防工程" },
      { id: "jz_003", name: "榆次老城人防地下商城", type: "underground_mall", position: [112.7467, 37.6845], address: "晋中市榆次区中都路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中都路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "晋中火车站", type: "transport", position: [112.7520, 37.6870], risk: "中" }]
  },

  // 运城
  yuncheng: {
    name: "运城",
    center: [111.0070, 35.0260],
    shelters: [
      { id: "yc_001", name: "运城站地下避难所", type: "shelter", position: [111.0070, 35.0260], address: "运城市盐湖区禹都大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "运城站地下通道", description: "运城铁路枢纽地下民防工程" },
      { id: "yc_002", name: "运城北站地下避难所", type: "shelter", position: [111.0234, 35.0567], address: "运城市盐湖区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "运城北站地下", description: "高铁枢纽人防工程" },
      { id: "yc_003", name: "运城市人防地下商城", type: "underground_mall", position: [111.0023, 35.0234], address: "运城市盐湖区红旗西街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "红旗西街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "运城火车站", type: "transport", position: [111.0070, 35.0260], risk: "中" }]
  },

  // 忻州
  xinzhou: {
    name: "忻州",
    center: [112.7340, 38.4160],
    shelters: [
      { id: "xz_001", name: "忻州站地下避难所", type: "shelter", position: [112.7340, 38.4160], address: "忻州市忻府区云中南路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "忻州站地下通道", description: "忻州铁路枢纽地下民防工程" },
      { id: "xz_002", name: "忻州市人防地下商城", type: "underground_mall", position: [112.7289, 38.4134], address: "忻州市忻府区新建路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "新建路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "忻州火车站", type: "transport", position: [112.7340, 38.4160], risk: "低" }]
  },

  // 临汾
  linfen: {
    name: "临汾",
    center: [111.5190, 36.0880],
    shelters: [
      { id: "lf_001", name: "临汾站地下避难所", type: "shelter", position: [111.5190, 36.0880], address: "临汾市尧都区车站路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "临汾站地下通道", description: "临汾铁路枢纽地下民防工程" },
      { id: "lf_002", name: "临汾西站地下避难所", type: "shelter", position: [111.5567, 36.0923], address: "临汾市尧都区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "临汾西站地下", description: "高铁枢纽人防工程" },
      { id: "lf_003", name: "临汾市人防地下商城", type: "underground_mall", position: [111.5145, 36.0856], address: "临汾市尧都区解放路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "临汾火车站", type: "transport", position: [111.5190, 36.0880], risk: "中" }]
  },

  // 吕梁
  lvliang: {
    name: "吕梁",
    center: [111.1440, 37.5190],
    shelters: [
      { id: "ll_001", name: "吕梁站地下避难所", type: "shelter", position: [111.1440, 37.5190], address: "吕梁市离石区吕梁大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "吕梁站地下通道", description: "吕梁铁路枢纽地下民防工程" },
      { id: "ll_002", name: "吕梁市人防地下商城", type: "underground_mall", position: [111.1389, 37.5167], address: "吕梁市离石区永宁中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "永宁中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "吕梁火车站", type: "transport", position: [111.1440, 37.5190], risk: "低" }]
  }
};

// 西北地区 - 陕西省
const northwestShaanxi = {
  // 铜川
  tongchuan: {
    name: "铜川",
    center: [108.9500, 34.8970],
    shelters: [
      { id: "tc_001", name: "铜川站地下避难所", type: "shelter", position: [108.9500, 34.8970], address: "铜川市王益区宜园路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "铜川站地下通道", description: "铜川铁路枢纽地下民防工程" },
      { id: "tc_002", name: "铜川市人防地下商城", type: "underground_mall", position: [108.9456, 34.8945], address: "铜川市王益区红旗街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "红旗街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "铜川火车站", type: "transport", position: [108.9500, 34.8970], risk: "低" }]
  },

  // 宝鸡
  baoji: {
    name: "宝鸡",
    center: [107.2370, 34.3630],
    shelters: [
      { id: "bj_001", name: "宝鸡站地下避难所", type: "shelter", position: [107.2370, 34.3630], address: "宝鸡市渭滨区迎宾路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "宝鸡站地下通道", description: "陕西西部铁路枢纽地下民防工程" },
      { id: "bj_002", name: "宝鸡南站地下避难所", type: "shelter", position: [107.2234, 34.3234], address: "宝鸡市渭滨区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "宝鸡南站地下", description: "高铁枢纽人防工程" },
      { id: "bj_003", name: "宝鸡市人防地下商城", type: "underground_mall", position: [107.2312, 34.3601], address: "宝鸡市渭滨区经二路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点、通信设备", access: "经二路地下入口", description: "市中心商业区人防工程" },
      { id: "bj_004", name: "宝钛集团地下指挥所", type: "shelter", position: [107.2567, 34.3789], address: "宝鸡市高新区", capacity: "2500人", level: "核5级", facilities: "企业应急系统", access: "宝钛集团地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "宝钛集团", type: "factory", position: [107.2567, 34.3789], risk: "中" }, { name: "宝鸡火车站", type: "transport", position: [107.2370, 34.3630], risk: "中" }]
  },

  // 咸阳
  xianyang: {
    name: "咸阳",
    center: [108.7080, 34.3300],
    shelters: [
      { id: "xy_001", name: "咸阳站地下避难所", type: "shelter", position: [108.7080, 34.3300], address: "咸阳市渭城区抗战北路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "咸阳站地下通道", description: "咸阳铁路枢纽地下民防工程" },
      { id: "xy_002", name: "咸阳西站地下避难所", type: "shelter", position: [108.6234, 34.3567], address: "咸阳市秦都区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "咸阳西站地下", description: "高铁枢纽人防工程" },
      { id: "xy_003", name: "咸阳市人防地下商城", type: "underground_mall", position: [108.7034, 34.3278], address: "咸阳市秦都区人民中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民中路地下入口", description: "市中心商业区人防工程" },
      { id: "xy_004", name: "咸阳国际机场地下避难所", type: "shelter", position: [108.7567, 34.4456], address: "咸阳市渭城区", capacity: "4000人", level: "核5级", facilities: "机场应急系统、医疗救护", access: "咸阳机场地下", description: "重要交通枢纽防护工程" }
    ],
    targets: [{ name: "咸阳国际机场", type: "airport", position: [108.7567, 34.4456], risk: "高" }, { name: "咸阳火车站", type: "transport", position: [108.7080, 34.3300], risk: "中" }]
  },

  // 渭南
  weinan: {
    name: "渭南",
    center: [109.5000, 34.5000],
    shelters: [
      { id: "wn_001", name: "渭南站地下避难所", type: "shelter", position: [109.5000, 34.5000], address: "渭南市临渭区站北街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "渭南站地下通道", description: "渭南铁路枢纽地下民防工程" },
      { id: "wn_002", name: "渭南北站地下避难所", type: "shelter", position: [109.5234, 34.5234], address: "渭南市临渭区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "渭南北站地下", description: "高铁枢纽人防工程" },
      { id: "wn_003", name: "渭南市人防地下商城", type: "underground_mall", position: [109.4956, 34.4978], address: "渭南市临渭区东风大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "东风大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "渭南火车站", type: "transport", position: [109.5000, 34.5000], risk: "中" }]
  },

  // 延安
  yanan: {
    name: "延安",
    center: [109.4890, 36.6000],
    shelters: [
      { id: "ya_001", name: "延安站地下避难所", type: "shelter", position: [109.4890, 36.6000], address: "延安市宝塔区七里铺街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "延安站地下通道", description: "延安铁路枢纽地下民防工程" },
      { id: "ya_002", name: "延安市人防地下商城", type: "underground_mall", position: [109.4845, 36.5978], address: "延安市宝塔区中心街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中心街地下入口", description: "市中心商业区人防工程" },
      { id: "ya_003", name: "延安油田地下指挥中心", type: "shelter", position: [109.5234, 36.6234], address: "延安市宝塔区", capacity: "3500人", level: "核5级", facilities: "油田应急指挥系统", access: "延安油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "延安油田", type: "factory", position: [109.5234, 36.6234], risk: "中" }, { name: "延安火车站", type: "transport", position: [109.4890, 36.6000], risk: "中" }]
  },

  // 汉中
  hanzhong: {
    name: "汉中",
    center: [107.0230, 33.0670],
    shelters: [
      { id: "hz_001", name: "汉中站地下避难所", type: "shelter", position: [107.0230, 33.0670], address: "汉中市汉台区人民路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "汉中站地下通道", description: "汉中铁路枢纽地下民防工程" },
      { id: "hz_002", name: "汉中市人防地下商城", type: "underground_mall", position: [107.0189, 33.0645], address: "汉中市汉台区天汉大道", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "天汉大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "汉中火车站", type: "transport", position: [107.0230, 33.0670], risk: "中" }]
  },

  // 榆林
  yulin: {
    name: "榆林",
    center: [109.7410, 38.2900],
    shelters: [
      { id: "yl_001", name: "榆林站地下避难所", type: "shelter", position: [109.7410, 38.2900], address: "榆林市榆阳区兴榆路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "榆林站地下通道", description: "榆林铁路枢纽地下民防工程" },
      { id: "yl_002", name: "榆林市人防地下商城", type: "underground_mall", position: [109.7367, 38.2878], address: "榆林市榆阳区新建北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "新建北路地下入口", description: "市中心商业区人防工程" },
      { id: "yl_003", name: "榆林能源基地地下指挥所", type: "shelter", position: [109.7789, 38.3234], address: "榆林市榆阳区", capacity: "5000人", level: "核5级", facilities: "能源应急指挥系统", access: "能源基地地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "榆林能源基地", type: "factory", position: [109.7789, 38.3234], risk: "高" }, { name: "榆林火车站", type: "transport", position: [109.7410, 38.2900], risk: "中" }]
  },

  // 安康
  ankang: {
    name: "安康",
    center: [109.0290, 32.6900],
    shelters: [
      { id: "ak_001", name: "安康站地下避难所", type: "shelter", position: [109.0290, 32.6900], address: "安康市汉滨区进站路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "安康站地下通道", description: "安康铁路枢纽地下民防工程" },
      { id: "ak_002", name: "安康市人防地下商城", type: "underground_mall", position: [109.0245, 32.6878], address: "安康市汉滨区大桥路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "大桥路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "安康火车站", type: "transport", position: [109.0290, 32.6900], risk: "低" }]
  },

  // 商洛
  shangluo: {
    name: "商洛",
    center: [109.9200, 33.8700],
    shelters: [
      { id: "sl_001", name: "商洛站地下避难所", type: "shelter", position: [109.9200, 33.8700], address: "商洛市商州区商丹大道", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "商洛站地下通道", description: "商洛铁路枢纽地下民防工程" },
      { id: "sl_002", name: "商洛市人防地下商城", type: "underground_mall", position: [109.9156, 33.8678], address: "商洛市商州区北新街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "北新街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "商洛火车站", type: "transport", position: [109.9200, 33.8700], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...northHebei,
  ...northShanxi,
  ...northwestShaanxi
};
