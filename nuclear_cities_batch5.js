// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次5）
// 华中地区（河南、湖北、湖南）
// ============================================

// 华中地区 - 河南省
const centralHenan = {
  // 开封
  kaifeng: {
    name: "开封",
    center: [114.3410, 34.7970],
    shelters: [
      { id: "kf_001", name: "开封站地下避难所", type: "shelter", position: [114.3410, 34.7970], address: "开封市禹王台区中山路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "开封站地下通道", description: "开封铁路枢纽地下民防工程" },
      { id: "kf_002", name: "开封北站地下避难所", type: "shelter", position: [114.4234, 34.8567], address: "开封市龙亭区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "开封北站地下", description: "高铁枢纽人防工程" },
      { id: "kf_003", name: "开封市人防地下商城", type: "underground_mall", position: [114.3367, 34.7945], address: "开封市龙亭区中山路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "中山路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "开封火车站", type: "transport", position: [114.3410, 34.7970], risk: "中" }]
  },

  // 洛阳
  luoyang: {
    name: "洛阳",
    center: [112.4530, 34.6190],
    shelters: [
      { id: "ly4_001", name: "洛阳站地下避难所", type: "shelter", position: [112.4530, 34.6190], address: "洛阳市西工区道南路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "洛阳站地下通道", description: "豫西铁路枢纽地下民防工程" },
      { id: "ly4_002", name: "洛阳龙门站地下避难所", type: "shelter", position: [112.4567, 34.6234], address: "洛阳市洛龙区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "洛阳龙门站地下", description: "高铁枢纽人防工程" },
      { id: "ly4_003", name: "洛阳市人防地下商城", type: "underground_mall", position: [112.4489, 34.6167], address: "洛阳市西工区中州中路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "中州中路地下入口", description: "市中心商业区人防工程" },
      { id: "ly4_004", name: "洛阳石化地下指挥所", type: "shelter", position: [112.5234, 34.6789], address: "洛阳市吉利区", capacity: "3500人", level: "核5级", facilities: "企业应急系统", access: "洛阳石化地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "洛阳石化", type: "factory", position: [112.5234, 34.6789], risk: "中" }, { name: "洛阳火车站", type: "transport", position: [112.4530, 34.6190], risk: "中" }]
  },

  // 平顶山
  pingdingshan: {
    name: "平顶山",
    center: [113.1920, 33.7670],
    shelters: [
      { id: "pds_001", name: "平顶山西站地下避难所", type: "shelter", position: [113.0234, 33.8123], address: "平顶山市宝丰县", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "平顶山西站地下", description: "平顶山铁路枢纽地下民防工程" },
      { id: "pds_002", name: "平顶山市人防地下商城", type: "underground_mall", position: [113.1878, 33.7645], address: "平顶山市新华区建设路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "建设路地下入口", description: "市中心商业区人防工程" },
      { id: "pds_003", name: "平顶山煤矿地下防空洞", type: "shelter", position: [113.2567, 33.8345], address: "平顶山市卫东区", capacity: "4500人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "平顶山煤矿", type: "factory", position: [113.2567, 33.8345], risk: "中" }]
  },

  // 安阳
  anyang: {
    name: "安阳",
    center: [114.3920, 36.0990],
    shelters: [
      { id: "ay_001", name: "安阳站地下避难所", type: "shelter", position: [114.3920, 36.0990], address: "安阳市北关区解放大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "安阳站地下通道", description: "安阳铁路枢纽地下民防工程" },
      { id: "ay_002", name: "安阳东站地下避难所", type: "shelter", position: [114.4567, 36.1234], address: "安阳市文峰区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "安阳东站地下", description: "高铁枢纽人防工程" },
      { id: "ay_003", name: "安阳市人防地下商城", type: "underground_mall", position: [114.3878, 36.0967], address: "安阳市北关区人民大道", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "安阳火车站", type: "transport", position: [114.3920, 36.0990], risk: "中" }]
  },

  // 鹤壁
  hebi: {
    name: "鹤壁",
    center: [114.2980, 35.7480],
    shelters: [
      { id: "hb2_001", name: "鹤壁东站地下避难所", type: "shelter", position: [114.3567, 35.7890], address: "鹤壁市淇滨区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "鹤壁东站地下", description: "高铁枢纽人防工程" },
      { id: "hb2_002", name: "鹤壁市人防地下商城", type: "underground_mall", position: [114.2934, 35.7456], address: "鹤壁市淇滨区兴鹤大街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "兴鹤大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "鹤壁东站", type: "transport", position: [114.3567, 35.7890], risk: "中" }]
  },

  // 新乡
  xinxiang: {
    name: "新乡",
    center: [113.9290, 35.3030],
    shelters: [
      { id: "xx_001", name: "新乡站地下避难所", type: "shelter", position: [113.9290, 35.3030], address: "新乡市卫滨区平原路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "新乡站地下通道", description: "新乡铁路枢纽地下民防工程" },
      { id: "xx_002", name: "新乡东站地下避难所", type: "shelter", position: [113.9567, 35.3234], address: "新乡市牧野区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "新乡东站地下", description: "高铁枢纽人防工程" },
      { id: "xx_003", name: "新乡市人防地下商城", type: "underground_mall", position: [113.9245, 35.3006], address: "新乡市红旗区平原路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "平原路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "新乡火车站", type: "transport", position: [113.9290, 35.3030], risk: "中" }]
  },

  // 焦作
  jiaozuo: {
    name: "焦作",
    center: [113.2420, 35.2160],
    shelters: [
      { id: "jz3_001", name: "焦作站地下避难所", type: "shelter", position: [113.2420, 35.2160], address: "焦作市解放区民主南路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "焦作站地下通道", description: "焦作铁路枢纽地下民防工程" },
      { id: "jz3_002", name: "焦作市人防地下商城", type: "underground_mall", position: [113.2378, 35.2134], address: "焦作市解放区解放中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放中路地下入口", description: "市中心商业区人防工程" },
      { id: "jz3_003", name: "焦作煤矿地下防空洞", type: "shelter", position: [113.2789, 35.2567], address: "焦作市中站区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "焦作煤矿", type: "factory", position: [113.2789, 35.2567], risk: "中" }]
  },

  // 濮阳
  puyang: {
    name: "濮阳",
    center: [115.0410, 35.7640],
    shelters: [
      { id: "py_001", name: "濮阳站地下避难所", type: "shelter", position: [115.0410, 35.7640], address: "濮阳市华龙区站前路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "濮阳站地下通道", description: "濮阳铁路枢纽地下民防工程" },
      { id: "py_002", name: "濮阳市人防地下商城", type: "underground_mall", position: [115.0367, 35.7612], address: "濮阳市华龙区人民路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "人民路地下入口", description: "市中心商业区人防工程" },
      { id: "py_003", name: "中原油田地下指挥中心", type: "shelter", position: [115.0789, 35.8234], address: "濮阳市华龙区", capacity: "4500人", level: "核5级", facilities: "油田应急指挥系统", access: "中原油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "中原油田", type: "factory", position: [115.0789, 35.8234], risk: "高" }]
  },

  // 许昌
  xuchang: {
    name: "许昌",
    center: [113.8520, 34.0360],
    shelters: [
      { id: "xc2_001", name: "许昌站地下避难所", type: "shelter", position: [113.8520, 34.0360], address: "许昌市魏都区颖昌路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "许昌站地下通道", description: "许昌铁路枢纽地下民防工程" },
      { id: "xc2_002", name: "许昌东站地下避难所", type: "shelter", position: [113.9234, 34.0567], address: "许昌市建安区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "许昌东站地下", description: "高铁枢纽人防工程" },
      { id: "xc2_003", name: "许昌市人防地下商城", type: "underground_mall", position: [113.8478, 34.0334], address: "许昌市魏都区七一路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "七一路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "许昌火车站", type: "transport", position: [113.8520, 34.0360], risk: "中" }]
  },

  // 漯河
  luohe: {
    name: "漯河",
    center: [114.0160, 33.5860],
    shelters: [
      { id: "lh_001", name: "漯河站地下避难所", type: "shelter", position: [114.0160, 33.5860], address: "漯河市源汇区老街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "漯河站地下通道", description: "漯河铁路枢纽地下民防工程" },
      { id: "lh_002", name: "漯河西站地下避难所", type: "shelter", position: [113.9567, 33.6123], address: "漯河市源汇区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "漯河西站地下", description: "高铁枢纽人防工程" },
      { id: "lh_003", name: "漯河市人防地下商城", type: "underground_mall", position: [114.0112, 33.5834], address: "漯河市郾城区黄河路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "黄河路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "漯河火车站", type: "transport", position: [114.0160, 33.5860], risk: "中" }]
  },

  // 三门峡
  sanmenxia: {
    name: "三门峡",
    center: [111.2000, 34.7720],
    shelters: [
      { id: "smx_001", name: "三门峡站地下避难所", type: "shelter", position: [111.2000, 34.7720], address: "三门峡市湖滨区黄河东路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "三门峡站地下通道", description: "三门峡铁路枢纽地下民防工程" },
      { id: "smx_002", name: "三门峡南站地下避难所", type: "shelter", position: [111.1234, 34.7567], address: "三门峡市陕州区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "三门峡南站地下", description: "高铁枢纽人防工程" },
      { id: "smx_003", name: "三门峡市人防地下商城", type: "underground_mall", position: [111.1956, 34.7698], address: "三门峡市湖滨区六峰路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "六峰路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "三门峡火车站", type: "transport", position: [111.2000, 34.7720], risk: "中" }]
  },

  // 南阳
  nanyang: {
    name: "南阳",
    center: [112.5280, 33.0050],
    shelters: [
      { id: "ny_001", name: "南阳站地下避难所", type: "shelter", position: [112.5280, 33.0050], address: "南阳市卧龙区新华西路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "南阳站地下通道", description: "南阳铁路枢纽地下民防工程" },
      { id: "ny_002", name: "南阳东站地下避难所", type: "shelter", position: [112.6234, 33.0123], address: "南阳市宛城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "南阳东站地下", description: "高铁枢纽人防工程" },
      { id: "ny_003", name: "南阳市人防地下商城", type: "underground_mall", position: [112.5234, 33.0023], address: "南阳市卧龙区中州中路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "中州中路地下入口", description: "市中心商业区人防工程" },
      { id: "ny_004", name: "南阳油田地下指挥中心", type: "shelter", position: [112.6789, 33.0567], address: "南阳市宛城区", capacity: "3500人", level: "核5级", facilities: "油田应急指挥系统", access: "南阳油田地下", description: "重要能源设施防护工程" }
    ],
    targets: [{ name: "南阳火车站", type: "transport", position: [112.5280, 33.0050], risk: "中" }]
  },

  // 商丘
  shangqiu: {
    name: "商丘",
    center: [115.6560, 34.4140],
    shelters: [
      { id: "sq2_001", name: "商丘站地下避难所", type: "shelter", position: [115.6560, 34.4140], address: "商丘市梁园区站前路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "商丘站地下通道", description: "商丘铁路枢纽地下民防工程" },
      { id: "sq2_002", name: "商丘东站地下避难所", type: "shelter", position: [115.7567, 34.4234], address: "商丘市虞城县", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "商丘东站地下", description: "高铁枢纽人防工程" },
      { id: "sq2_003", name: "商丘市人防地下商城", type: "underground_mall", position: [115.6512, 34.4112], address: "商丘市梁园区神火大道", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "神火大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "商丘火车站", type: "transport", position: [115.6560, 34.4140], risk: "中" }]
  },

  // 信阳
  xinyang: {
    name: "信阳",
    center: [114.0910, 32.1470],
    shelters: [
      { id: "xy4_001", name: "信阳站地下避难所", type: "shelter", position: [114.0910, 32.1470], address: "信阳市浉河区新华东路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "信阳站地下通道", description: "信阳铁路枢纽地下民防工程" },
      { id: "xy4_002", name: "信阳东站地下避难所", type: "shelter", position: [114.1567, 32.1234], address: "信阳市平桥区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "信阳东站地下", description: "高铁枢纽人防工程" },
      { id: "xy4_003", name: "信阳市人防地下商城", type: "underground_mall", position: [114.0867, 32.1445], address: "信阳市浉河区东方红大道", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "东方红大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "信阳火车站", type: "transport", position: [114.0910, 32.1470], risk: "中" }]
  },

  // 周口
  zhoukou: {
    name: "周口",
    center: [114.6970, 33.6260],
    shelters: [
      { id: "zk_001", name: "周口站地下避难所", type: "shelter", position: [114.6970, 33.6260], address: "周口市川汇区交通大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "周口站地下通道", description: "周口铁路枢纽地下民防工程" },
      { id: "zk_002", name: "周口东站地下避难所", type: "shelter", position: [114.8234, 33.6789], address: "周口市川汇区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "周口东站地下", description: "高铁枢纽人防工程" },
      { id: "zk_003", name: "周口市人防地下商城", type: "underground_mall", position: [114.6923, 33.6234], address: "周口市川汇区七一路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "七一路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "周口火车站", type: "transport", position: [114.6970, 33.6260], risk: "中" }]
  },

  // 驻马店
  zhumadian: {
    name: "驻马店",
    center: [114.0220, 33.0120],
    shelters: [
      { id: "zmd_001", name: "驻马店站地下避难所", type: "shelter", position: [114.0220, 33.0120], address: "驻马店市驿城区自由街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "驻马店站地下通道", description: "驻马店铁路枢纽地下民防工程" },
      { id: "zmd_002", name: "驻马店西站地下避难所", type: "shelter", position: [113.9567, 33.0234], address: "驻马店市驿城区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "驻马店西站地下", description: "高铁枢纽人防工程" },
      { id: "zmd_003", name: "驻马店市人防地下商城", type: "underground_mall", position: [114.0178, 33.0098], address: "驻马店市驿城区解放大道", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "驻马店火车站", type: "transport", position: [114.0220, 33.0120], risk: "中" }]
  }
};

// 华中地区 - 湖北省
const centralHubei = {
  // 黄石
  huangshi: {
    name: "黄石",
    center: [115.0390, 30.2010],
    shelters: [
      { id: "hs3_001", name: "黄石站地下避难所", type: "shelter", position: [115.0390, 30.2010], address: "黄石市下陆区老下陆街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "黄石站地下通道", description: "黄石铁路枢纽地下民防工程" },
      { id: "hs3_002", name: "黄石北站地下避难所", type: "shelter", position: [115.0567, 30.2234], address: "黄石市下陆区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "黄石北站地下", description: "高铁枢纽人防工程" },
      { id: "hs3_003", name: "黄石市人防地下商城", type: "underground_mall", position: [115.0345, 30.1989], address: "黄石市黄石港区武汉路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "武汉路地下入口", description: "市中心商业区人防工程" },
      { id: "hs3_004", name: "大冶铁矿地下指挥所", type: "shelter", position: [114.9678, 30.1567], address: "黄石市铁山区", capacity: "3000人", level: "核5级", facilities: "企业应急系统", access: "大冶铁矿地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "大冶铁矿", type: "factory", position: [114.9678, 30.1567], risk: "中" }]
  },

  // 十堰
  shiyan: {
    name: "十堰",
    center: [110.7870, 32.6500],
    shelters: [
      { id: "sy2_001", name: "十堰站地下避难所", type: "shelter", position: [110.7870, 32.6500], address: "十堰市茅箭区车站路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "十堰站地下通道", description: "十堰铁路枢纽地下民防工程" },
      { id: "sy2_002", name: "十堰东站地下避难所", type: "shelter", position: [110.8567, 32.6123], address: "十堰市张湾区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "十堰东站地下", description: "高铁枢纽人防工程" },
      { id: "sy2_003", name: "十堰市人防地下商城", type: "underground_mall", position: [110.7823, 32.6478], address: "十堰市茅箭区人民北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "人民北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "十堰火车站", type: "transport", position: [110.7870, 32.6500], risk: "中" }]
  },

  // 宜昌
  yichang: {
    name: "宜昌",
    center: [111.2910, 30.6970],
    shelters: [
      { id: "yc5_001", name: "宜昌东站地下避难所", type: "shelter", position: [111.3567, 30.6789], address: "宜昌市伍家岗区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽防护设施、发电设备", access: "宜昌东站地下", description: "宜昌高铁枢纽人防工程" },
      { id: "yc5_002", name: "宜昌站地下避难所", type: "shelter", position: [111.2867, 30.6956], address: "宜昌市西陵区", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护设施", access: "宜昌站地下", description: "宜昌铁路枢纽人防工程" },
      { id: "yc5_003", name: "宜昌市人防地下商城", type: "underground_mall", position: [111.2878, 30.6945], address: "宜昌市西陵区夷陵大道", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "夷陵大道地下入口", description: "市中心商业区人防工程" },
      { id: "yc5_004", name: "葛洲坝地下指挥中心", type: "shelter", position: [111.2567, 30.7456], address: "宜昌市西陵区", capacity: "5000人", level: "核5级", facilities: "水利设施防护系统", access: "葛洲坝地下", description: "重要水利设施防护工程" }
    ],
    targets: [{ name: "葛洲坝水电站", type: "dam", position: [111.2567, 30.7456], risk: "高" }, { name: "三峡大坝", type: "dam", position: [111.0034, 30.8234], risk: "高" }]
  },

  // 襄阳
  xiangyang: {
    name: "襄阳",
    center: [112.1220, 32.0090],
    shelters: [
      { id: "xy5_001", name: "襄阳站地下避难所", type: "shelter", position: [112.1220, 32.0090], address: "襄阳市樊城区中原路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "襄阳站地下通道", description: "襄阳铁路枢纽地下民防工程" },
      { id: "xy5_002", name: "襄阳东站地下避难所", type: "shelter", position: [112.2234, 32.0567], address: "襄阳市襄州区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "襄阳东站地下", description: "高铁枢纽人防工程" },
      { id: "xy5_003", name: "襄阳市人防地下商城", type: "underground_mall", position: [112.1178, 32.0067], address: "襄阳市樊城区人民路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "人民路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "襄阳火车站", type: "transport", position: [112.1220, 32.0090], risk: "中" }]
  },

  // 鄂州
  ezhou: {
    name: "鄂州",
    center: [114.8900, 30.3960],
    shelters: [
      { id: "ez_001", name: "鄂州站地下避难所", type: "shelter", position: [114.8900, 30.3960], address: "鄂州市鄂城区江碧路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "鄂州站地下通道", description: "鄂州铁路枢纽地下民防工程" },
      { id: "ez_002", name: "鄂州市人防地下商城", type: "underground_mall", position: [114.8856, 30.3934], address: "鄂州市鄂城区南浦路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "南浦路地下入口", description: "市中心商业区人防工程" },
      { id: "ez_003", name: "鄂州钢铁厂地下指挥所", type: "shelter", position: [114.9234, 30.4234], address: "鄂州市鄂城区", capacity: "3000人", level: "核5级", facilities: "企业应急系统", access: "鄂钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "鄂州钢铁", type: "factory", position: [114.9234, 30.4234], risk: "中" }]
  },

  // 荆门
  jingmen: {
    name: "荆门",
    center: [112.2040, 31.0350],
    shelters: [
      { id: "jm_001", name: "荆门站地下避难所", type: "shelter", position: [112.2040, 31.0350], address: "荆门市东宝区月亮湖路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "荆门站地下通道", description: "荆门铁路枢纽地下民防工程" },
      { id: "jm_002", name: "荆门市人防地下商城", type: "underground_mall", position: [112.1998, 31.0323], address: "荆门市东宝区象山大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "象山大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "荆门火车站", type: "transport", position: [112.2040, 31.0350], risk: "低" }]
  },

  // 孝感
  xiaogan: {
    name: "孝感",
    center: [113.9100, 30.9280],
    shelters: [
      { id: "xg_001", name: "孝感站地下避难所", type: "shelter", position: [113.9100, 30.9280], address: "孝感市孝南区城站路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "孝感站地下通道", description: "孝感铁路枢纽地下民防工程" },
      { id: "xg_002", name: "孝感东站地下避难所", type: "shelter", position: [113.9567, 30.9789], address: "孝感市孝南区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "孝感东站地下", description: "高铁枢纽人防工程" },
      { id: "xg_003", name: "孝感市人防地下商城", type: "underground_mall", position: [113.9056, 30.9256], address: "孝感市孝南区城站路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "城站路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "孝感火车站", type: "transport", position: [113.9100, 30.9280], risk: "中" }]
  },

  // 荆州
  jingzhou: {
    name: "荆州",
    center: [112.2390, 30.3350],
    shelters: [
      { id: "jz4_001", name: "荆州站地下避难所", type: "shelter", position: [112.2390, 30.3350], address: "荆州市荆州区荆楚大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "荆州站地下通道", description: "荆州铁路枢纽地下民防工程" },
      { id: "jz4_002", name: "荆州市人防地下商城", type: "underground_mall", position: [112.2345, 30.3323], address: "荆州市沙市区北京路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "北京路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "荆州火车站", type: "transport", position: [112.2390, 30.3350], risk: "中" }]
  },

  // 黄冈
  huanggang: {
    name: "黄冈",
    center: [114.8790, 30.4470],
    shelters: [
      { id: "hg2_001", name: "黄冈站地下避难所", type: "shelter", position: [114.8790, 30.4470], address: "黄冈市黄州区路口镇", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "黄冈站地下通道", description: "黄冈铁路枢纽地下民防工程" },
      { id: "hg2_002", name: "黄冈东站地下避难所", type: "shelter", position: [114.9234, 30.4789], address: "黄冈市黄州区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "黄冈东站地下", description: "高铁枢纽人防工程" },
      { id: "hg2_003", name: "黄冈市人防地下商城", type: "underground_mall", position: [114.8745, 30.4445], address: "黄冈市黄州区东门路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "东门路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "黄冈火车站", type: "transport", position: [114.8790, 30.4470], risk: "中" }]
  },

  // 咸宁
  xianning: {
    name: "咸宁",
    center: [114.3220, 29.8330],
    shelters: [
      { id: "xn_001", name: "咸宁站地下避难所", type: "shelter", position: [114.3220, 29.8330], address: "咸宁市咸安区怀德路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "咸宁站地下通道", description: "咸宁铁路枢纽地下民防工程" },
      { id: "xn_002", name: "咸宁北站地下避难所", type: "shelter", position: [114.3567, 29.8789], address: "咸宁市咸安区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "咸宁北站地下", description: "高铁枢纽人防工程" },
      { id: "xn_003", name: "咸宁市人防地下商城", type: "underground_mall", position: [114.3178, 29.8306], address: "咸宁市咸安区温泉路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "温泉路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "咸宁火车站", type: "transport", position: [114.3220, 29.8330], risk: "中" }]
  },

  // 随州
  suizhou: {
    name: "随州",
    center: [113.3730, 31.6920],
    shelters: [
      { id: "sz3_001", name: "随州站地下避难所", type: "shelter", position: [113.3730, 31.6920], address: "随州市曾都区交通大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "随州站地下通道", description: "随州铁路枢纽地下民防工程" },
      { id: "sz3_002", name: "随州南站地下避难所", type: "shelter", position: [113.4567, 31.7234], address: "随州市曾都区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "随州南站地下", description: "高铁枢纽人防工程" },
      { id: "sz3_003", name: "随州市人防地下商城", type: "underground_mall", position: [113.3689, 31.6898], address: "随州市曾都区解放路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "随州火车站", type: "transport", position: [113.3730, 31.6920], risk: "中" }]
  },

  // 恩施
  enshi: {
    name: "恩施",
    center: [109.4830, 30.2830],
    shelters: [
      { id: "es_001", name: "恩施站地下避难所", type: "shelter", position: [109.4830, 30.2830], address: "恩施市舞阳坝街道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "恩施站地下通道", description: "恩施铁路枢纽地下民防工程" },
      { id: "es_002", name: "恩施市人防地下商城", type: "underground_mall", position: [109.4789, 30.2806], address: "恩施市舞阳坝街道清江路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "清江路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "恩施火车站", type: "transport", position: [109.4830, 30.2830], risk: "低" }]
  }
};

// 华中地区 - 湖南省
const centralHunan = {
  // 株洲
  zhuzhou: {
    name: "株洲",
    center: [113.1520, 27.8310],
    shelters: [
      { id: "zz3_001", name: "株洲站地下避难所", type: "shelter", position: [113.1520, 27.8310], address: "株洲市芦淞区人民南路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "株洲站地下通道", description: "湘东铁路枢纽地下民防工程" },
      { id: "zz3_002", name: "株洲西站地下避难所", type: "shelter", position: [113.0567, 27.8789], address: "株洲市天元区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "株洲西站地下", description: "高铁枢纽人防工程" },
      { id: "zz3_003", name: "株洲市人防地下商城", type: "underground_mall", position: [113.1478, 27.8289], address: "株洲市芦淞区建设中路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "建设中路地下入口", description: "市中心商业区人防工程" },
      { id: "zz3_004", name: "株洲电力机车厂地下指挥所", type: "shelter", position: [113.1789, 27.8567], address: "株洲市石峰区", capacity: "4000人", level: "核5级", facilities: "企业应急系统", access: "株机地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "株洲电力机车", type: "factory", position: [113.1789, 27.8567], risk: "中" }, { name: "株洲火车站", type: "transport", position: [113.1520, 27.8310], risk: "中" }]
  },

  // 湘潭
  xiangtan: {
    name: "湘潭",
    center: [112.9440, 27.8290],
    shelters: [
      { id: "xt2_001", name: "湘潭站地下避难所", type: "shelter", position: [112.9440, 27.8290], address: "湘潭市雨湖区车站路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "湘潭站地下通道", description: "湘潭铁路枢纽地下民防工程" },
      { id: "xt2_002", name: "湘潭北站地下避难所", type: "shelter", position: [112.9567, 27.9234], address: "湘潭市九华示范区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "湘潭北站地下", description: "高铁枢纽人防工程" },
      { id: "xt2_003", name: "湘潭市人防地下商城", type: "underground_mall", position: [112.9398, 27.8267], address: "湘潭市雨湖区建设北路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "建设北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "湘潭火车站", type: "transport", position: [112.9440, 27.8290], risk: "中" }]
  },

  // 衡阳
  hengyang: {
    name: "衡阳",
    center: [112.5720, 26.8940],
    shelters: [
      { id: "hy_001", name: "衡阳站地下避难所", type: "shelter", position: [112.5720, 26.8940], address: "衡阳市珠晖区东风路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "衡阳站地下通道", description: "衡阳铁路枢纽地下民防工程" },
      { id: "hy_002", name: "衡阳东站地下避难所", type: "shelter", position: [112.6789, 26.9234], address: "衡阳市珠晖区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "衡阳东站地下", description: "高铁枢纽人防工程" },
      { id: "hy_003", name: "衡阳市人防地下商城", type: "underground_mall", position: [112.5678, 26.8912], address: "衡阳市蒸湘区解放大道", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "衡阳火车站", type: "transport", position: [112.5720, 26.8940], risk: "中" }]
  },

  // 邵阳
  shaoyang: {
    name: "邵阳",
    center: [111.4690, 27.2420],
    shelters: [
      { id: "sy3_001", name: "邵阳站地下避难所", type: "shelter", position: [111.4690, 27.2420], address: "邵阳市大祥区双拥路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "邵阳站地下通道", description: "邵阳铁路枢纽地下民防工程" },
      { id: "sy3_002", name: "邵阳市人防地下商城", type: "underground_mall", position: [111.4645, 27.2398], address: "邵阳市大祥区红旗路", capacity: "2000人", level: "核6级", facilities: "应急物资储备", access: "红旗路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "邵阳火车站", type: "transport", position: [111.4690, 27.2420], risk: "中" }]
  },

  // 岳阳
  yueyang: {
    name: "岳阳",
    center: [113.1290, 29.3570],
    shelters: [
      { id: "yy_001", name: "岳阳站地下避难所", type: "shelter", position: [113.1290, 29.3570], address: "岳阳市岳阳楼区站前路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "岳阳站地下通道", description: "岳阳铁路枢纽地下民防工程" },
      { id: "yy_002", name: "岳阳东站地下避难所", type: "shelter", position: [113.1567, 29.3789], address: "岳阳市岳阳楼区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "岳阳东站地下", description: "高铁枢纽人防工程" },
      { id: "yy_003", name: "岳阳市人防地下商城", type: "underground_mall", position: [113.1245, 29.3545], address: "岳阳市岳阳楼区巴陵中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "巴陵中路地下入口", description: "市中心商业区人防工程" },
      { id: "yy_004", name: "岳阳港地下指挥中心", type: "shelter", position: [113.1789, 29.4234], address: "岳阳市岳阳楼区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "岳阳港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "岳阳港", type: "port", position: [113.1789, 29.4234], risk: "中" }, { name: "岳阳火车站", type: "transport", position: [113.1290, 29.3570], risk: "中" }]
  },

  // 常德
  changde: {
    name: "常德",
    center: [111.6990, 29.0320],
    shelters: [
      { id: "cd2_001", name: "常德站地下避难所", type: "shelter", position: [111.6990, 29.0320], address: "常德市武陵区常德大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "常德站地下通道", description: "常德铁路枢纽地下民防工程" },
      { id: "cd2_002", name: "常德市人防地下商城", type: "underground_mall", position: [111.6945, 29.0298], address: "常德市武陵区武陵大道", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "武陵大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "常德火车站", type: "transport", position: [111.6990, 29.0320], risk: "中" }]
  },

  // 张家界
  zhangjiajie: {
    name: "张家界",
    center: [110.4790, 29.1170],
    shelters: [
      { id: "zjj_001", name: "张家界站地下避难所", type: "shelter", position: [110.4790, 29.1170], address: "张家界市永定区迎宾路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "张家界站地下通道", description: "张家界铁路枢纽地下民防工程" },
      { id: "zjj_002", name: "张家界西站地下避难所", type: "shelter", position: [110.4234, 29.1567], address: "张家界市永定区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "张家界西站地下", description: "高铁枢纽人防工程" },
      { id: "zjj_003", name: "张家界市人防地下商城", type: "underground_mall", position: [110.4745, 29.1145], address: "张家界市永定区解放路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "解放路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "张家界火车站", type: "transport", position: [110.4790, 29.1170], risk: "中" }]
  },

  // 益阳
  yiyang2: {
    name: "益阳",
    center: [112.3560, 28.5700],
    shelters: [
      { id: "yy2_001", name: "益阳站地下避难所", type: "shelter", position: [112.3560, 28.5700], address: "益阳市赫山区金山南路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "益阳站地下通道", description: "益阳铁路枢纽地下民防工程" },
      { id: "yy2_002", name: "益阳南站地下避难所", type: "shelter", position: [112.4567, 28.6234], address: "益阳市赫山区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "益阳南站地下", description: "高铁枢纽人防工程" },
      { id: "yy2_003", name: "益阳市人防地下商城", type: "underground_mall", position: [112.3512, 28.5678], address: "益阳市赫山区桃花仑西路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "桃花仑西路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "益阳火车站", type: "transport", position: [112.3560, 28.5700], risk: "中" }]
  },

  // 郴州
  chenzhou: {
    name: "郴州",
    center: [113.0150, 25.7700],
    shelters: [
      { id: "cz4_001", name: "郴州站地下避难所", type: "shelter", position: [113.0150, 25.7700], address: "郴州市北湖区解放路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "郴州站地下通道", description: "郴州铁路枢纽地下民防工程" },
      { id: "cz4_002", name: "郴州西站地下避难所", type: "shelter", position: [112.9567, 25.8234], address: "郴州市北湖区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "郴州西站地下", description: "高铁枢纽人防工程" },
      { id: "cz4_003", name: "郴州市人防地下商城", type: "underground_mall", position: [113.0101, 25.7678], address: "郴州市北湖区人民西路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "人民西路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "郴州火车站", type: "transport", position: [113.0150, 25.7700], risk: "中" }]
  },

  // 永州
  yongzhou: {
    name: "永州",
    center: [111.6080, 26.4510],
    shelters: [
      { id: "yz2_001", name: "永州站地下避难所", type: "shelter", position: [111.6080, 26.4510], address: "永州市冷水滩区潇湘大道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "永州站地下通道", description: "永州铁路枢纽地下民防工程" },
      { id: "yz2_002", name: "永州市人防地下商城", type: "underground_mall", position: [111.6034, 26.4489], address: "永州市冷水滩区清桥路", capacity: "2000人", level: "核6级", facilities: "应急物资储备", access: "清桥路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "永州火车站", type: "transport", position: [111.6080, 26.4510], risk: "中" }]
  },

  // 怀化
  huaihua: {
    name: "怀化",
    center: [109.9780, 27.5500],
    shelters: [
      { id: "hh2_001", name: "怀化南站地下避难所", type: "shelter", position: [109.9780, 27.5500], address: "怀化市鹤城区高堰路", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护设施、发电设备", access: "怀化南站地下", description: "怀化高铁枢纽人防工程" },
      { id: "hh2_002", name: "怀化市人防地下商城", type: "underground_mall", position: [109.9734, 27.5478], address: "怀化市鹤城区人民南路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "怀化南站", type: "transport", position: [109.9780, 27.5500], risk: "中" }]
  },

  // 娄底
  loudi: {
    name: "娄底",
    center: [111.9930, 27.7010],
    shelters: [
      { id: "ld_001", name: "娄底站地下避难所", type: "shelter", position: [111.9930, 27.7010], address: "娄底市娄星区氐星路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "娄底站地下通道", description: "娄底铁路枢纽地下民防工程" },
      { id: "ld_002", name: "娄底南站地下避难所", type: "shelter", position: [112.0567, 27.7234], address: "娄底市娄星区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "娄底南站地下", description: "高铁枢纽人防工程" },
      { id: "ld_003", name: "娄底市人防地下商城", type: "underground_mall", position: [111.9889, 27.6989], address: "娄底市娄星区氐星路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "氐星路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "娄底火车站", type: "transport", position: [111.9930, 27.7010], risk: "中" }]
  },

  // 湘西
  xiangxi: {
    name: "湘西",
    center: [109.7390, 28.3140],
    shelters: [
      { id: "xx2_001", name: "吉首站地下避难所", type: "shelter", position: [109.7390, 28.3140], address: "湘西州吉首市光明西路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "吉首站地下通道", description: "湘西铁路枢纽地下民防工程" },
      { id: "xx2_002", name: "湘西州人防地下商城", type: "underground_mall", position: [109.7345, 28.3112], address: "湘西州吉首市人民中路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "人民中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "吉首火车站", type: "transport", position: [109.7390, 28.3140], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...centralHenan,
  ...centralHubei,
  ...centralHunan
};
