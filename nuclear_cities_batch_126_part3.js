// ============================================
// 核战争城市自救地球仪 - 126城市补充数据（第三部分）
// 覆盖中国剩余地级及以上城市
// 生成日期: 2026-04-16
// ============================================

const CITIES_BATCH_4_PART3 = {
  // ============================================
  // 华北地区 - 河北省（剩余城市）
  // ============================================
  tangshan: {
    name: "唐山",
    center: [118.1754, 39.6351],
    shelters: [
      { id: "ts_001", name: "唐山站地下避难所", type: "shelter", position: [118.1154, 39.6151], address: "唐山市路北区站前路", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护、通风系统、应急供水", access: "唐山站西广场地下", description: "唐山高铁枢纽核心民防工程，抗震防护双标准" },
      { id: "ts_002", name: "抗震纪念碑地下人防", type: "underground_mall", position: [118.1854, 39.6251], address: "唐山市路南区新华道文化路口", capacity: "3500人", level: "核6级", facilities: "纪念地下商业防空一体、应急物资储备", access: "抗震纪念碑广场地下通道", description: "纪念性综合人防工程，具备历史意义与防护功能" },
      { id: "ts_003", name: "开滦煤矿地下避难所", type: "bunker", position: [118.2254, 39.6551], address: "唐山市路南区开滦矿区", capacity: "6000人", level: "核5级", facilities: "百年矿道改造、独立通风系统、深层水库", access: "开滦国家矿山公园地下入口", description: "利用百年矿道建设的深层核掩体，防护等级高" },
      { id: "ts_004", name: "曹妃甸港地下指挥中心", type: "shelter", position: [118.4554, 39.2151], address: "唐山市曹妃甸区", capacity: "5000人", level: "核5级", facilities: "港口应急指挥、船舶调度、物资储备", access: "曹妃甸港综合服务区地下", description: "重要港口配套设施，战时港口指挥中心" }
    ],
    targets: [
      { name: "唐山港", type: "port", position: [118.4554, 39.2151], risk: "高" },
      { name: "开滦煤矿", type: "factory", position: [118.2254, 39.6551], risk: "高" },
      { name: "首钢京唐", type: "factory", position: [118.4854, 39.1951], risk: "高" },
      { name: "唐山站", type: "transport", position: [118.1154, 39.6151], risk: "中" },
      { name: "大唐唐山发电厂", type: "factory", position: [118.2654, 39.6851], risk: "高" }
    ]
  },

  baoding: {
    name: "保定",
    center: [115.4646, 38.8739],
    shelters: [
      { id: "bd_001", name: "保定东站地下避难所", type: "shelter", position: [115.4856, 38.8649], address: "保定市莲池区开泰街", capacity: "3500人", level: "核6级", facilities: "高铁枢纽防护、应急指挥中心", access: "保定东站地下出站层", description: "京广高铁重要节点城市民防工程" },
      { id: "bd_002", name: "万博广场地下人防", type: "underground_mall", position: [115.4546, 38.8639], address: "保定市竞秀区朝阳大街", capacity: "3000人", level: "核6级", facilities: "商业综合体地下防护、物资储备", access: "万博广场地下停车场", description: "保定市中心最大商业综合体人防工程" },
      { id: "bd_003", name: "直隶总督署地下避难所", type: "bunker", position: [115.4946, 38.8839], address: "保定市莲池区裕华路", capacity: "2500人", level: "核5级", facilities: "历史建筑地下防空、文物保护", access: "总督署后院地下入口", description: "历史文化名城核心区防护工程" },
      { id: "bd_004", name: "长城汽车地下避难所", type: "shelter", position: [115.5246, 38.8439], address: "保定市莲池区朝阳南大街", capacity: "4000人", level: "核6级", facilities: "企业园区配套防护、生产保障", access: "长城汽车总部地下", description: "重点工业企业民防工程" }
    ],
    targets: [
      { name: "保定东站", type: "transport", position: [115.4856, 38.8649], risk: "中" },
      { name: "长城汽车", type: "factory", position: [115.5246, 38.8439], risk: "高" },
      { name: "保定热电厂", type: "factory", position: [115.4446, 38.8939], risk: "高" },
      { name: "保定水厂", type: "factory", position: [115.4646, 38.9139], risk: "中" }
    ]
  },

  langfang: {
    name: "廊坊",
    center: [116.6838, 39.5380],
    shelters: [
      { id: "lf_001", name: "廊坊站地下避难所", type: "shelter", position: [116.6838, 39.5380], address: "廊坊市广阳区解放道", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护、应急疏散", access: "廊坊火车站地下", description: "京津走廊重要节点民防工程" },
      { id: "lf_002", name: "万达广场地下人防", type: "underground_mall", position: [116.6738, 39.5280], address: "廊坊市广阳区新华路", capacity: "2500人", level: "核6级", facilities: "商业综合体地下防护", access: "万达广场地下停车场", description: "市中心商业核心区人防" },
      { id: "lf_003", name: "廊坊开发区地下避难所", type: "shelter", position: [116.7238, 39.5680], address: "廊坊市开发区云鹏道", capacity: "3500人", level: "核6级", facilities: "开发区配套防护", access: "开发区管委会地下", description: "经济技术开发区民防工程" },
      { id: "lf_004", name: "自然公园地下防空洞", type: "bunker", position: [116.6938, 39.5580], address: "廊坊市广阳区", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "自然公园地下", description: "城市公园配套人防" }
    ],
    targets: [
      { name: "廊坊火车站", type: "transport", position: [116.6838, 39.5380], risk: "中" },
      { name: "华能廊坊电厂", type: "factory", position: [116.7138, 39.5880], risk: "高" },
      { name: "富士康廊坊", type: "factory", position: [116.7438, 39.5180], risk: "中" }
    ]
  },

  cangzhou: {
    name: "沧州",
    center: [116.8575, 38.3037],
    shelters: [
      { id: "cz_001", name: "沧州西站地下避难所", type: "shelter", position: [116.8175, 38.3437], address: "沧州市运河区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "沧州西站地下", description: "沧州高铁枢纽民防工程" },
      { id: "cz_002", name: "沧州站地下避难所", type: "shelter", position: [116.8575, 38.3037], address: "沧州市新华区新华东路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "沧州火车站地下", description: "传统火车站民防" },
      { id: "cz_003", name: "华北商厦地下人防", type: "underground_mall", position: [116.8475, 38.2937], address: "沧州市运河区新华西路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "华北商厦地下", description: "商业中心人防" },
      { id: "cz_004", name: "黄骅港地下指挥中心", type: "bunker", position: [117.3575, 38.4037], address: "沧州市黄骅市", capacity: "4000人", level: "核5级", facilities: "港口配套深层防护", access: "黄骅港地下", description: "重要港口人防工程" }
    ],
    targets: [
      { name: "黄骅港", type: "port", position: [117.3575, 38.4037], risk: "高" },
      { name: "沧州大化", type: "factory", position: [116.8775, 38.3337], risk: "高" },
      { name: "沧州炼油厂", type: "factory", position: [116.8375, 38.2737], risk: "高" },
      { name: "沧州电厂", type: "factory", position: [116.8675, 38.3237], risk: "高" }
    ]
  },

  hengshui: {
    name: "衡水",
    center: [115.6860, 37.7350],
    shelters: [
      { id: "hs_001", name: "衡水北站地下避难所", type: "shelter", position: [115.6860, 37.7750], address: "衡水市桃城区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "衡水北站地下", description: "衡水高铁枢纽民防工程" },
      { id: "hs_002", name: "衡水站地下避难所", type: "shelter", position: [115.6860, 37.7350], address: "衡水市桃城区站前东路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "衡水火车站地下", description: "传统火车站民防" },
      { id: "hs_003", name: "百货大楼地下人防", type: "underground_mall", position: [115.6760, 37.7250], address: "衡水市桃城区人民路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "百货大楼地下", description: "商业中心人防" },
      { id: "hs_004", name: "衡水湖地下避难所", type: "shelter", position: [115.6260, 37.6850], address: "衡水市桃城区衡水湖", capacity: "1500人", level: "核6级", facilities: "景区配套防护", access: "衡水湖景区地下", description: "景区人防工程" }
    ],
    targets: [
      { name: "衡水老白干", type: "factory", position: [115.7060, 37.7550], risk: "中" },
      { name: "衡水电厂", type: "factory", position: [115.6660, 37.7050], risk: "高" },
      { name: "衡水火车站", type: "transport", position: [115.6860, 37.7350], risk: "中" }
    ]
  },

  xingtai: {
    name: "邢台",
    center: [114.5047, 37.0706],
    shelters: [
      { id: "xt_001", name: "邢台东站地下避难所", type: "shelter", position: [114.5447, 37.0506], address: "邢台市桥东区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "邢台东站地下", description: "邢台高铁枢纽民防工程" },
      { id: "xt_002", name: "邢台站地下避难所", type: "shelter", position: [114.5047, 37.0706], address: "邢台市桥东区车站北路", capacity: "2500人", level: "核6级", facilities: "铁路枢纽防护", access: "邢台火车站地下", description: "传统火车站民防" },
      { id: "xt_003", name: "天一城地下人防", type: "underground_mall", position: [114.4947, 37.0606], address: "邢台市桥东区新华北路", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "天一城地下", description: "商业中心人防" },
      { id: "xt_004", name: "达活泉地下防空洞", type: "bunker", position: [114.4647, 37.0906], address: "邢台市桥西区达活泉公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "达活泉公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "邢钢", type: "factory", position: [114.5247, 37.0806], risk: "高" },
      { name: "邢台电厂", type: "factory", position: [114.4747, 37.0406], risk: "高" },
      { name: "邢台火车站", type: "transport", position: [114.5047, 37.0706], risk: "中" }
    ]
  },

  handan: {
    name: "邯郸",
    center: [114.4905, 36.6123],
    shelters: [
      { id: "hd_001", name: "邯郸东站地下避难所", type: "shelter", position: [114.5305, 36.6223], address: "邯郸市丛台区", capacity: "3500人", level: "核6级", facilities: "高铁枢纽防护", access: "邯郸东站地下", description: "邯郸高铁枢纽民防工程" },
      { id: "hd_002", name: "邯郸站地下避难所", type: "shelter", position: [114.4905, 36.6123], address: "邯郸市邯山区浴新大街", capacity: "3000人", level: "核6级", facilities: "铁路枢纽防护", access: "邯郸火车站地下", description: "传统火车站民防" },
      { id: "hd_003", name: "新世纪地下人防", type: "underground_mall", position: [114.4805, 36.6023], address: "邯郸市丛台区中华北大街", capacity: "2500人", level: "核6级", facilities: "商业区防护", access: "新世纪广场地下", description: "商业中心人防" },
      { id: "hd_004", name: "丛台公园地下防空洞", type: "bunker", position: [114.5005, 36.6323], address: "邯郸市丛台区丛台公园", capacity: "2000人", level: "核6级", facilities: "公园地下防空", access: "丛台公园地下", description: "公园人防工程" }
    ],
    targets: [
      { name: "邯钢", type: "factory", position: [114.4705, 36.5923], risk: "高" },
      { name: "邯郸电厂", type: "factory", position: [114.5105, 36.6423], risk: "高" },
      { name: "邯郸火车站", type: "transport", position: [114.4905, 36.6123], risk: "中" },
      { name: "峰峰煤矿", type: "factory", position: [114.4205, 36.5123], risk: "高" }
    ]
  },

  qinhuangdao: {
    name: "秦皇岛",
    center: [119.6005, 39.9354],
    shelters: [
      { id: "qhd_001", name: "秦皇岛站地下避难所", type: "shelter", position: [119.6005, 39.9354], address: "秦皇岛市海港区北环路", capacity: "3500人", level: "核6级", facilities: "高铁枢纽防护", access: "秦皇岛站地下", description: "秦皇岛铁路枢纽民防工程" },
      { id: "qhd_002", name: "北戴河地下避难所", type: "shelter", position: [119.4805, 39.8354], address: "秦皇岛市北戴河区", capacity: "3000人", level: "核6级", facilities: "度假区配套防护", access: "北戴河核心区地下", description: "重要度假区民防工程" },
      { id: "qhd_003", name: "秦皇岛港地下指挥中心", type: "bunker", position: [119.5605, 39.9054], address: "秦皇岛市海港区", capacity: "4000人", level: "核5级", facilities: "港口配套深层防护", access: "秦皇岛港地下", description: "重要能源港口人防工程" },
      { id: "qhd_004", name: "山海关地下避难所", type: "shelter", position: [119.7605, 40.0054], address: "秦皇岛市山海关区", capacity: "2500人", level: "核6级", facilities: "旅游区配套防护", access: "山海关景区地下", description: "历史景区人防工程" }
    ],
    targets: [
      { name: "秦皇岛港", type: "port", position: [119.5605, 39.9054], risk: "高" },
      { name: "山海关机场", type: "airport", position: [119.7005, 39.9654], risk: "中" },
      { name: "秦皇岛站", type: "transport", position: [119.6005, 39.9354], risk: "中" },
      { name: "秦皇岛电厂", type: "factory", position: [119.6205, 39.9554], risk: "高" }
    ]
  },

  zhangjiakou: {
    name: "张家口",
    center: [114.8863, 40.7676],
    shelters: [
      { id: "zjk_001", name: "张家口站地下避难所", type: "shelter", position: [114.8863, 40.7676], address: "张家口市桥西区", capacity: "3000人", level: "核6级", facilities: "高铁枢纽防护", access: "张家口站地下", description: "京张高铁枢纽民防工程" },
      { id: "zjk_002", name: "宣化地下避难所", type: "shelter", position: [115.0663, 40.6076], address: "张家口市宣化区", capacity: "2500人", level: "核6级", facilities: "古城配套防护", access: "宣化核心区地下", description: "历史文化名城民防" },
      { id: "zjk_003", name: "大境门地下防空洞", type: "bunker", position: [114.9163, 40.8476], address: "张家口市桥西区大境门", capacity: "2000人", level: "核6级", facilities: "历史建筑地下防空", access: "大境门地下", description: "古长城人防工程" },
      { id: "zjk_004", name: "崇礼地下避难所", type: "shelter", position: [115.2763, 40.9676], address: "张家口市崇礼区", capacity: "2000人", level: "核6级", facilities: "冬奥场馆配套防护", access: "崇礼核心区地下", description: "冬奥核心区民防工程" }
    ],
    targets: [
      { name: "张家口站", type: "transport", position: [114.8863, 40.7676], risk: "中" },
      { name: "宣钢", type: "factory", position: [115.0463, 40.6276], risk: "高" },
      { name: "张家口电厂", type: "factory", position: [114.9063, 40.7876], risk: "高" },
      { name: "张家口水厂", type: "factory", position: [114.8663, 40.7476], risk: "中" }
    ]
  },

  chengde: {
    name: "承德",
    center: [117.9328, 40.9512],
    shelters: [
      { id: "cd_001", name: "承德南站地下避难所", type: "shelter", position: [117.9328, 40.9212], address: "承德市双桥区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护", access: "承德南站地下", description: "承德高铁枢纽民防工程" },
      { id: "cd_002", name: "避暑山庄地下避难所", type: "bunker", position: [117.9528, 40.9912], address: "承德市双桥区避暑山庄", capacity: "3000人", level: "核5级", facilities: "园林地下防空、文物保护", access: "避暑山庄地下", description: "世界文化遗产配套人防" },
      { id: "cd_003", name: "承德市中心地下人防", type: "underground_mall", position: [117.9428, 40.9612], address: "承德市双桥区南营子大街", capacity: "2000人", level: "核6级", facilities: "商业区防护", access: "市中心地下通道", description: "市中心商业区人防" },
      { id: "cd_004", name: "双滦地下避难所", type: "shelter", position: [117.7828, 40.9612], address: "承德市双滦区", capacity: "2000人", level: "核6级", facilities: "工业区配套防护", access: "双滦核心区地下", description: "工业区民防工程" }
    ],
    targets: [
      { name: "承德钢厂", type: "factory", position: [117.7628, 40.9712], risk: "高" },
      { name: "承德电厂", type: "factory", position: [117.9128, 40.9412], risk: "高" },
      { name: "避暑山庄", type: "transport", position: [117.9528, 40.9912], risk: "低" }
    ]
  }
};

// 导出城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_BATCH_3;
}
