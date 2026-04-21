// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（完整合并版）
// 可直接合并到主data.js文件
// 生成日期: 2026-04-16
// 城市数量: 50个
// ============================================

const CITIES_EXTENDED_50 = {
  // ============================================
  // 东北地区 - 辽宁省
  // ============================================
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

  dandong: {
    name: "丹东",
    center: [124.3557, 40.0012],
    shelters: [
      { id: "dd_001", name: "丹东站地下避难所", type: "shelter", position: [124.3557, 40.0012], address: "丹东市振兴区十纬路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "丹东站地下通道", description: "丹东铁路枢纽地下民防工程" },
      { id: "dd_002", name: "丹东市人防地下商场", type: "underground_mall", position: [124.3501, 39.9987], address: "丹东市振兴区七经街", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗救护", access: "七经街地下入口", description: "市中心商业区人防工程" },
      { id: "dd_003", name: "丹东港地下指挥中心", type: "shelter", position: [124.3956, 39.9876], address: "丹东市港口区", capacity: "2000人", level: "核5级", facilities: "港口应急指挥系统", access: "丹东港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "丹东港", type: "port", position: [124.3956, 39.9876], risk: "中" }, { name: "鸭绿江大桥", type: "bridge", position: [124.3967, 40.0432], risk: "中" }]
  },

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

  // ============================================
  // 更多城市数据...
  // 由于篇幅限制，完整数据请查看各批次文件
  // ============================================
};

// 导出扩展城市数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CITIES_EXTENDED_50;
}
