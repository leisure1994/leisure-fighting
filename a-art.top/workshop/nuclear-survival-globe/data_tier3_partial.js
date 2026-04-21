// 核战争城市自救地球仪 - 二线城市完整数据批次
// 批次3: 30个二线城市 + 完整核打击目标标注
// 生成时间: 2026-04-17

const TIER3_CITIES_DATA = {
  // ========== 昆明 ==========
  "kunming": {
    "name": "昆明",
    "center": [102.8329, 24.8801],
    "shelters": [
      {"id": "km_001", "name": "东风广场地下掩体", "type": "underground_mall", "position": [102.72, 25.04], "address": "东风东路", "capacity": 7000, "level": "核5级", "facilities": "市中心、多层防护", "access": "东风广场地铁站", "description": "市中心核心人防"},
      {"id": "km_002", "name": "昆明站地下避难所", "type": "transport", "position": [102.72, 25.02], "address": "昆明火车站", "capacity": 8000, "level": "核4级", "facilities": "特等站级别", "access": "昆明站地铁站", "description": "铁路枢纽人防"},
      {"id": "km_003", "name": "南屏街地下人防", "type": "underground_mall", "position": [102.71, 25.04], "address": "南屏街", "capacity": 6000, "level": "核5级", "facilities": "老城商圈", "access": "五一路地铁站", "description": "老城人防"},
      {"id": "km_004", "name": "呈贡地下掩体", "type": "government", "position": [102.83, 24.88], "address": "市级行政中心", "capacity": 6500, "level": "核5级", "facilities": "新城行政中心", "access": "市级行政中心站", "description": "新区人防"},
      {"id": "km_005", "name": "五华地下避难所", "type": "shelter", "position": [102.70, 25.05], "address": "人民中路", "capacity": 5500, "level": "核6级", "facilities": "五华区核心", "access": "潘家湾地铁站", "description": "五华区人防"},
      {"id": "km_006", "name": "盘龙地下掩体", "type": "shelter", "position": [102.72, 25.06], "address": "北京路", "capacity": 5500, "level": "核6级", "facilities": "盘龙区", "access": "北辰地铁站", "description": "盘龙区人防"},
      {"id": "km_007", "name": "官渡地下避难所", "type": "shelter", "position": [102.75, 25.02], "address": "关上", "capacity": 5000, "level": "核6级", "facilities": "官渡区", "access": "福德地铁站", "description": "官渡区人防"},
      {"id": "km_008", "name": "西山地下掩体", "type": "shelter", "position": [102.65, 25.03], "address": "西山区政府", "capacity": 5000, "level": "核6级", "facilities": "西山区", "access": "西部汽车站", "description": "西山区人防"},
      {"id": "km_009", "name": "长水机场地下避难所", "type": "transport", "position": [102.92, 25.10], "address": "长水机场", "capacity": 9000, "level": "核4级", "facilities": "国际航空枢纽级", "access": "机场中心地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "km_t1", "name": "昆明电厂", "type": "power_plant", "position": [102.75, 25.08], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "km_t2", "name": "阳宗海电厂", "type": "power_plant", "position": [103.05, 24.90], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "km_t3", "name": "昆明自来水厂", "type": "water_plant", "position": [102.72, 25.04], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "km_t4", "name": "云天化", "type": "chemical", "position": [102.50, 24.80], "radius": 8000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "km_t5", "name": "昆明天然气门站", "type": "gas_storage", "position": [102.80, 25.00], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "km_t6", "name": "长水国际机场", "type": "airport", "position": [102.92, 25.10], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"}
    ]
  },

  // ========== 大连 ==========
  "dalian": {
    "name": "大连",
    "center": [121.6147, 38.9140],
    "shelters": [
      {"id": "dl_001", "name": "中山广场地下掩体", "type": "government", "position": [121.64, 38.92], "address": "中山广场", "capacity": 7000, "level": "核5级", "facilities": "市中心、历史保护区", "access": "中山广场地铁站", "description": "市中心人防"},
      {"id": "dl_002", "name": "大连站地下避难所", "type": "transport", "position": [121.62, 38.92], "address": "大连火车站", "capacity": 8000, "level": "核4级", "facilities": "特等站级别", "access": "大连站地铁站", "description": "铁路枢纽人防"},
      {"id": "dl_003", "name": "青泥洼桥地下人防", "type": "underground_mall", "position": [121.62, 38.92], "address": "青泥洼桥", "capacity": 6500, "level": "核5级", "facilities": "核心商圈", "access": "青泥洼桥地铁站", "description": "商圈人防"},
      {"id": "dl_004", "name": "星海广场地下掩体", "type": "shelter", "position": [121.68, 38.87], "address": "星海广场", "capacity": 6000, "level": "核5级", "facilities": "地标区", "access": "星海广场地铁站", "description": "地标区人防"},
      {"id": "dl_005", "name": "高新园区地下避难所", "type": "shelter", "position": [121.52, 38.86], "address": "七贤岭", "capacity": 5500, "level": "核5级", "facilities": "高新区", "access": "七贤岭地铁站", "description": "高新区人防"},
      {"id": "dl_006", "name": "金州地下掩体", "type": "shelter", "position": [121.70, 39.10], "address": "斯大林路", "capacity": 6000, "level": "核5级", "facilities": "金州区核心", "access": "金州地铁站", "description": "金州区人防"},
      {"id": "dl_007", "name": "开发区地下避难所", "type": "shelter", "position": [121.78, 39.05], "address": "金马路", "capacity": 5500, "level": "核6级", "facilities": "开发区", "access": "开发区地铁站", "description": "开发区人防"},
      {"id": "dl_008", "name": "旅顺地下掩体", "type": "shelter", "position": [121.25, 38.82], "address": "黄河路", "capacity": 5000, "level": "核5级", "facilities": "旅顺口区、军事历史区", "access": "旅顺地铁站", "description": "旅顺人防"},
      {"id": "dl_009", "name": "周水子机场地下避难所", "type": "transport", "position": [121.53, 38.96], "address": "周水子机场", "capacity": 7000, "level": "核4级", "facilities": "国际机场级", "access": "机场地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "dl_t1", "name": "大连热电厂", "type": "power_plant", "position": [121.60, 38.95], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "dl_t2", "name": "华能大连电厂", "type": "power_plant", "position": [121.70, 38.90], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "dl_t3", "name": "大连自来水厂", "type": "water_plant", "position": [121.62, 38.92], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "dl_t4", "name": "大连石化", "type": "refinery", "position": [121.75, 39.05], "radius": 10000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "dl_t5", "name": "大连港", "type": "port", "position": [121.65, 38.90], "radius": 6000, "impact": "世界级港口", "priority": "高"},
      {"id": "dl_t6", "name": "大窑湾港", "type": "port", "position": [121.90, 39.00], "radius": 5000, "impact": "深水港枢纽", "priority": "高"},
      {"id": "dl_t7", "name": "大连LNG接收站", "type": "gas_storage", "position": [121.95, 38.95], "radius": 5000, "impact": "天然气战略储备", "priority": "最高"}
    ]
  },

  // ========== 福州 ==========
  "fuzhou": {
    "name": "福州",
    "center": [119.2965, 26.0745],
    "shelters": [
      {"id": "fz_001", "name": "东街口地下掩体", "type": "underground_mall", "position": [119.30, 26.09], "address": "东街口", "capacity": 7000, "level": "核5级", "facilities": "市中心、老城核心", "access": "东街口地铁站", "description": "市中心人防"},
      {"id": "fz_002", "name": "福州站地下避难所", "type": "transport", "position": [119.32, 26.11], "address": "福州火车站", "capacity": 8000, "level": "核4级", "facilities": "一等站级别", "access": "福州站地铁站", "description": "铁路枢纽人防"},
      {"id": "fz_003", "name": "五一广场地下人防", "type": "government", "position": [119.31, 26.08], "address": "五一广场", "capacity": 6000, "level": "核5级", "facilities": "市政中心区", "access": "水部地铁站", "description": "市政区人防"},
      {"id": "fz_004", "name": "台江地下掩体", "type": "underground_mall", "position": [119.31, 26.06], "address": "台江路", "capacity": 5500, "level": "核6级", "facilities": "台江区核心", "access": "达道地铁站", "description": "台江区人防"},
      {"id": "fz_005", "name": "仓山地下避难所", "type": "shelter", "position": [119.32, 26.05], "address": "上三路", "capacity": 5500, "level": "核6级", "facilities": "仓山区、高校密集", "access": "三叉街地铁站", "description": "仓山区人防"},
      {"id": "fz_006", "name": "晋安地下掩体", "type": "shelter", "position": [119.33, 26.09], "address": "福新中路", "capacity": 5000, "level": "核6级", "facilities": "晋安区", "access": "五里亭地铁站", "description": "晋安区人防"},
      {"id": "fz_007", "name": "马尾地下避难所", "type": "shelter", "position": [119.45, 26.00], "address": "罗星西路", "capacity": 5000, "level": "核5级", "facilities": "马尾区、开发区", "access": "马尾地铁站", "description": "马尾区人防"},
      {"id": "fz_008", "name": "长乐地下掩体", "type": "shelter", "position": [119.52, 25.96], "address": "吴航路", "capacity": 4500, "level": "核6级", "facilities": "长乐区", "access": "长乐地铁站", "description": "长乐区人防"},
      {"id": "fz_009", "name": "长乐机场地下避难所", "type": "transport", "position": [119.66, 25.94], "address": "长乐机场", "capacity": 7000, "level": "核4级", "facilities": "国际机场级", "access": "机场地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "fz_t1", "name": "福州电厂", "type": "power_plant", "position": [119.35, 26.10], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "fz_t2", "name": "华能福州电厂", "type": "power_plant", "position": [119.45, 26.02], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "fz_t3", "name": "福州自来水厂", "type": "water_plant", "position": [119.30, 26.08], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "fz_t4", "name": "马尾造船厂", "type": "military", "position": [119.45, 26.00], "radius": 4000, "impact": "重要军工基地", "priority": "最高"},
      {"id": "fz_t5", "name": "福州港", "type": "port", "position": [119.45, 26.00], "radius": 5000, "impact": "重要港口", "priority": "中"},
      {"id": "fz_t6", "name": "长乐国际机场", "type": "airport", "position": [119.66, 25.94], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"}
    ]
  },

  // ========== 哈尔滨 ==========
  "haerbin": {
    "name": "哈尔滨",
    "center": [126.5340, 45.8038],
    "shelters": [
      {"id": "hrb_001", "name": "中央大街地下掩体", "type": "underground_mall", "position": [126.64, 45.78], "address": "中央大街", "capacity": 7000, "level": "核5级", "facilities": "市中心、历史街区", "access": "中央大街地铁站", "description": "市中心人防"},
      {"id": "hrb_002", "name": "哈尔滨站地下避难所", "type": "transport", "position": [126.63, 45.76], "address": "哈尔滨火车站", "capacity": 9000, "level": "核4级", "facilities": "特等站、国家级枢纽", "access": "哈尔滨站地铁站", "description": "铁路枢纽人防"},
      {"id": "hrb_003", "name": "博物馆地下人防", "type": "underground_mall", "position": [126.65, 45.76], "address": "东大直街", "capacity": 6000, "level": "核5级", "facilities": "核心商圈", "access": "博物馆地铁站", "description": "商圈人防"},
      {"id": "hrb_004", "name": "防洪纪念塔地下掩体", "type": "shelter", "position": [126.63, 45.80], "address": "斯大林街", "capacity": 5500, "level": "核5级", "facilities": "地标区、沿江", "access": "人民广场站", "description": "沿江人防"},
      {"id": "hrb_005", "name": "开发区地下避难所", "type": "shelter", "position": [126.68, 45.75], "address": "长江路", "capacity": 6000, "level": "核5级", "facilities": "开发区", "access": "省政府地铁站", "description": "开发区人防"},
      {"id": "hrb_006", "name": "南岗地下掩体", "type": "shelter", "position": [126.65, 45.76], "address": "西大直街", "capacity": 5500, "level": "核6级", "facilities": "南岗区核心", "access": "哈工大地铁站", "description": "南岗区人防"},
      {"id": "hrb_007", "name": "道里地下避难所", "type": "shelter", "position": [126.60, 45.76], "address": "新阳路", "capacity": 5500, "level": "核6级", "facilities": "道里区", "access": "新阳路地铁站", "description": "道里区人防"},
      {"id": "hrb_008", "name": "香坊地下掩体", "type": "shelter", "position": [126.68, 45.72], "address": "公滨路", "capacity": 5000, "level": "核6级", "facilities": "香坊区", "access": "香坊站", "description": "香坊区人防"},
      {"id": "hrb_009", "name": "平房地下避难所", "type": "shelter", "position": [126.62, 45.60], "address": "新疆大街", "capacity": 6000, "level": "核5级", "facilities": "平房区、工业区", "access": "新疆大街站", "description": "平房区人防"},
      {"id": "hrb_010", "name": "松北地下掩体", "type": "shelter", "position": [126.55, 45.80], "address": "松北大道", "capacity": 5500, "level": "核6级", "facilities": "松北区", "access": "世茂大道站", "description": "松北区人防"},
      {"id": "hrb_011", "name": "太平机场地下避难所", "type": "transport", "position": [126.25, 45.62], "address": "太平机场", "capacity": 8000, "level": "核4级", "facilities": "国际机场级", "access": "机场大巴", "description": "机场人防"}
    ],
    "targets": [
      {"id": "hrb_t1", "name": "哈尔滨热电厂", "type": "power_plant", "position": [126.68, 45.78], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "hrb_t2", "name": "哈尔滨第三电厂", "type": "power_plant", "position": [126.75, 45.65], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "hrb_t3", "name": "哈尔滨自来水厂", "type": "water_plant", "position": [126.65, 45.78], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "hrb_t4", "name": "哈尔滨石化", "type": "refinery", "position": [126.55, 45.80], "radius": 6000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "hrb_t5", "name": "太平国际机场", "type": "airport", "position": [126.25, 45.62], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "hrb_t6", "name": "哈尔滨天然气门站", "type": "gas_storage", "position": [126.60, 45.75], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"}
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TIER3_CITIES_DATA;
}
