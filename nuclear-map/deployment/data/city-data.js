// 核战争城市自救地图 - 城市数据
// 数据来源: 各地人防办公开数据、地铁规划、地下空间规划

const CITY_DATA = {
  "北京": {
    center: [116.4074, 39.9042],
    shelters: [
      { name: "西单地下人防工程", type: "civil", level: "high", lat: 39.9109, lng: 116.3726, capacity: 5000, address: "西单北大街地下", description: "大型平战结合人防工程" },
      { name: "天安门地下通道避难所", type: "bunker", level: "high", lat: 39.9055, lng: 116.3976, capacity: 10000, address: "天安门广场地下", description: "国家级重点人防工程" },
      { name: "东直门地铁站", type: "metro", level: "medium", lat: 39.9401, lng: 116.4354, capacity: 3000, address: "东直门外大街", description: "地铁2号线/13号线/机场线换乘站" },
      { name: "西直门地下商场", type: "underground", level: "basic", lat: 39.9368, lng: 116.3555, capacity: 2000, address: "西直门外大街地下", description: "凯德MALL·西直门地下空间" },
      { name: "国贸地铁站", type: "metro", level: "medium", lat: 39.9093, lng: 116.4583, capacity: 3500, address: "建国路88号地下", description: "地铁1号线/10号线换乘站" },
      { name: "王府井地下人防", type: "civil", level: "high", lat: 39.9110, lng: 116.4110, capacity: 6000, address: "王府井大街地下", description: "王府井地下步行街人防工程" },
      { name: "复兴门地铁站", type: "metro", level: "medium", lat: 39.9072, lng: 116.3569, capacity: 4000, address: "复兴门内大街", description: "地铁1号线/2号线换乘站" },
      { name: "朝阳门地下商场", type: "underground", level: "basic", lat: 39.9239, lng: 116.4326, capacity: 2500, address: "朝阳门内大街地下", description: "银河SOHO地下空间" },
      { name: "军事博物馆人防工程", type: "bunker", level: "high", lat: 39.9074, lng: 116.3211, capacity: 8000, address: "复兴路9号地下", description: "军事博物馆配套人防工程" },
      { name: "北京站地下避难所", type: "civil", level: "high", lat: 39.9049, lng: 116.4275, capacity: 7000, address: "北京站东街地下", description: "火车站人防工程" },
      { name: "西单地铁站", type: "metro", level: "medium", lat: 39.9103, lng: 116.3739, capacity: 4500, address: "西单北大街", description: "地铁1号线/4号线换乘站" },
      { name: "东单地铁站", type: "metro", level: "medium", lat: 39.9073, lng: 116.4186, capacity: 3800, address: "东单北大街", description: "地铁1号线/5号线换乘站" },
      { name: "建国门地铁站", type: "metro", level: "medium", lat: 39.9083, lng: 116.4356, capacity: 3500, address: "建国门内大街", description: "地铁1号线/2号线换乘站" },
      { name: "朝阳大悦城地下空间", type: "underground", level: "medium", lat: 39.9237, lng: 116.5185, capacity: 5000, address: "朝阳北路101号地下", description: "大型商业综合体地下人防" },
      { name: "中关村广场地下", type: "civil", level: "high", lat: 39.9812, lng: 116.3108, capacity: 6000, address: "中关村大街地下", description: "中关村核心区人防工程" }
    ]
  },
  "上海": {
    center: [121.4737, 31.2304],
    shelters: [
      { name: "人民广场地下空间", type: "civil", level: "high", lat: 31.2328, lng: 121.4737, capacity: 8000, address: "人民广场地下", description: "大型综合人防工程" },
      { name: "徐家汇地铁站", type: "metro", level: "medium", lat: 31.1955, lng: 121.4377, capacity: 4000, address: "肇嘉浜路", description: "地铁1号线/9号线/11号线换乘站" },
      { name: "陆家嘴地下通道", type: "underground", level: "medium", lat: 31.2397, lng: 121.4998, capacity: 3500, address: "陆家嘴环路地下", description: "金融区地下人防通道" },
      { name: "虹桥火车站地下", type: "civil", level: "high", lat: 31.1946, lng: 121.3206, capacity: 10000, address: "申贵路", description: "交通枢纽人防工程" },
      { name: "静安寺地铁站", type: "metro", level: "medium", lat: 31.2244, lng: 121.4465, capacity: 3000, address: "南京西路", description: "地铁2号线/7号线/14号线换乘站" },
      { name: "五角场地下商场", type: "underground", level: "basic", lat: 31.2989, lng: 121.5146, capacity: 2800, address: "翔殷路地下", description: "五角场商圈地下空间" },
      { name: "浦东国际机场T1", type: "bunker", level: "high", lat: 31.1443, lng: 121.8083, capacity: 8000, address: "浦东机场T1航站楼地下", description: "机场重点人防工程" },
      { name: "上海火车站地下", type: "civil", level: "high", lat: 31.2495, lng: 121.4559, capacity: 7000, address: "秣陵路", description: "火车站人防工程" },
      { name: "世纪大道地铁站", type: "metro", level: "medium", lat: 31.2317, lng: 121.5261, capacity: 4500, address: "世纪大道", description: "地铁2号线/4号线/6号线/9号线换乘站" },
      { name: "龙阳路地铁站", type: "metro", level: "medium", lat: 31.2034, lng: 121.5575, capacity: 5000, address: "龙阳路", description: "地铁2号线/7号线/16号线/18号线/磁悬浮换乘站" }
    ]
  },
  "广州": {
    center: [113.2644, 23.1291],
    shelters: [
      { name: "珠江新城地下空间", type: "civil", level: "high", lat: 23.1249, lng: 113.3268, capacity: 7000, address: "珠江新城核心区地下", description: "CBD综合人防工程" },
      { name: "体育西路地铁站", type: "metro", level: "medium", lat: 23.1373, lng: 113.3215, capacity: 4500, address: "体育西路", description: "地铁1号线/3号线换乘站" },
      { name: "广州东站地下", type: "civil", level: "high", lat: 23.1514, lng: 113.3249, capacity: 6000, address: "东站路", description: "火车站人防工程" },
      { name: "白云国际机场T2", type: "bunker", level: "high", lat: 23.3925, lng: 113.2993, capacity: 8000, address: "机场大道东", description: "机场重点人防工程" },
      { name: "天河城地下商场", type: "underground", level: "medium", lat: 23.1354, lng: 113.3228, capacity: 3500, address: "天河路208号地下", description: "天河商圈地下空间" },
      { name: "公园前地铁站", type: "metro", level: "medium", lat: 23.1255, lng: 113.2646, capacity: 4000, address: "中山五路", description: "地铁1号线/2号线换乘站" }
    ]
  },
  "深圳": {
    center: [114.0579, 22.5431],
    shelters: [
      { name: "福田中心区地下", type: "civil", level: "high", lat: 22.5431, lng: 114.0579, capacity: 6000, address: "福华路地下", description: "市民中心人防工程" },
      { name: "罗湖火车站地下", type: "civil", level: "high", lat: 22.5318, lng: 114.1159, capacity: 7000, address: "建设路", description: "罗湖口岸人防工程" },
      { name: "宝安国际机场", type: "bunker", level: "high", lat: 22.6393, lng: 113.8107, capacity: 8000, address: "宝安大道", description: "机场重点人防工程" },
      { name: "会展中心地铁站", type: "metro", level: "medium", lat: 22.5363, lng: 114.0555, capacity: 3500, address: "福华三路", description: "地铁1号线/4号线换乘站" },
      { name: "华强北地下空间", type: "underground", level: "medium", lat: 22.5445, lng: 114.0856, capacity: 4000, address: "华强北路地下", description: "华强北商圈地下空间" }
    ]
  },
  "成都": {
    center: [104.0668, 30.5728],
    shelters: [
      { name: "天府广场地下空间", type: "civil", level: "high", lat: 30.6574, lng: 104.0633, capacity: 6000, address: "天府广场地下", description: "市中心综合人防工程" },
      { name: "春熙路地铁站", type: "metro", level: "medium", lat: 30.6556, lng: 104.0805, capacity: 3000, address: "春熙路", description: "地铁2号线/3号线换乘站" },
      { name: "火车南站地下", type: "civil", level: "high", lat: 30.6021, lng: 104.0636, capacity: 7000, address: "天仁路", description: "高铁站人防工程" },
      { name: "双流国际机场T2", type: "bunker", level: "high", lat: 30.5786, lng: 103.9468, capacity: 8000, address: "机场南三路", description: "机场重点人防工程" },
      { name: "太古里地下商场", type: "underground", level: "medium", lat: 30.6547, lng: 104.0816, capacity: 2800, address: "中纱帽街地下", description: "春熙路商圈地下空间" }
    ]
  },
  "武汉": {
    center: [114.3054, 30.5928],
    shelters: [
      { name: "汉口火车站地下", type: "civil", level: "high", lat: 30.6243, lng: 114.2570, capacity: 6000, address: "发展大道", description: "火车站人防工程" },
      { name: "洪山广场地下", type: "civil", level: "high", lat: 30.5445, lng: 114.3358, capacity: 5500, address: "洪山路", description: "市中心人防工程" },
      { name: "中山公园地铁站", type: "metro", level: "medium", lat: 30.5936, lng: 114.2706, capacity: 3000, address: "解放大道", description: "地铁2号线站点" },
      { name: "江汉路地下商业街", type: "underground", level: "basic", lat: 30.5867, lng: 114.2919, capacity: 2500, address: "江汉路地下", description: "江汉路商圈地下空间" },
      { name: "天河机场T3", type: "bunker", level: "high", lat: 30.7762, lng: 114.2123, capacity: 8000, address: "机场大道", description: "机场重点人防工程" },
      { name: "光谷广场地铁站", type: "metro", level: "medium", lat: 30.5056, lng: 114.4078, capacity: 4000, address: "珞喻路", description: "地铁2号线/11号线换乘站" }
    ]
  },
  "西安": {
    center: [108.9398, 34.3416],
    shelters: [
      { name: "钟楼地下环形通道", type: "civil", level: "high", lat: 34.2610, lng: 108.9398, capacity: 5000, address: "钟楼地下", description: "市中心环形人防通道" },
      { name: "北客站地下", type: "civil", level: "high", lat: 34.3767, lng: 108.9383, capacity: 7000, address: "元朔路", description: "高铁站人防工程" },
      { name: "小寨地铁站", type: "metro", level: "medium", lat: 34.2241, lng: 108.9403, capacity: 3500, address: "长安中路", description: "地铁2号线/3号线换乘站" },
      { name: "回民街地下空间", type: "underground", level: "basic", lat: 34.2632, lng: 108.9465, capacity: 2000, address: "北院门地下", description: "旅游商圈地下空间" },
      { name: "咸阳国际机场T3", type: "bunker", level: "high", lat: 34.4471, lng: 108.7516, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "重庆": {
    center: [106.5516, 29.5630],
    shelters: [
      { name: "解放碑地下空间", type: "civil", level: "high", lat: 29.5583, lng: 106.5734, capacity: 6000, address: "解放碑地下", description: "CBD综合人防工程" },
      { name: "重庆北站地下", type: "civil", level: "high", lat: 29.6086, lng: 106.5531, capacity: 7000, address: "昆仑大道", description: "火车站人防工程" },
      { name: "观音桥地铁站", type: "metro", level: "medium", lat: 29.5740, lng: 106.5329, capacity: 3500, address: "观音桥步行街", description: "地铁3号线/9号线换乘站" },
      { name: "江北国际机场T3", type: "bunker", level: "high", lat: 29.7223, lng: 106.6385, capacity: 8000, address: "机场东三路", description: "机场重点人防工程" },
      { name: "沙坪坝地下空间", type: "underground", level: "medium", lat: 29.5585, lng: 106.4577, capacity: 3000, address: "三峡广场地下", description: "沙坪坝商圈地下空间" }
    ]
  },
  "南京": {
    center: [118.7969, 32.0603],
    shelters: [
      { name: "新街口地下空间", type: "civil", level: "high", lat: 32.0415, lng: 118.7843, capacity: 6000, address: "中山路地下", description: "市中心综合人防工程" },
      { name: "南京南站地下", type: "civil", level: "high", lat: 31.9708, lng: 118.8020, capacity: 7000, address: "玉兰路", description: "高铁站人防工程" },
      { name: "夫子庙地铁站", type: "metro", level: "medium", lat: 32.0226, lng: 118.7943, capacity: 3000, address: "平江府路", description: "地铁3号线站点" },
      { name: "禄口机场T2", type: "bunker", level: "high", lat: 31.7420, lng: 118.8635, capacity: 7000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "杭州": {
    center: [120.1551, 30.2741],
    shelters: [
      { name: "武林广场地下", type: "civil", level: "high", lat: 30.2758, lng: 120.1650, capacity: 5000, address: "体育场路", description: "市中心人防工程" },
      { name: "火车东站地下", type: "civil", level: "high", lat: 30.2936, lng: 120.2115, capacity: 7000, address: "全福桥路", description: "高铁站人防工程" },
      { name: "龙翔桥地铁站", type: "metro", level: "medium", lat: 30.2578, lng: 120.1652, capacity: 3000, address: "平海路", description: "地铁1号线站点" },
      { name: "萧山国际机场T4", type: "bunker", level: "high", lat: 30.2295, lng: 120.4344, capacity: 8000, address: "空港大道", description: "机场重点人防工程" }
    ]
  }
};

// 避难所类型配置
const SHELTER_TYPES = {
  civil: { name: "人防工程", color: "#ff8800", icon: "shield" },
  metro: { name: "地铁站", color: "#ffff00", icon: "train" },
  underground: { name: "地下商场", color: "#00ff00", icon: "shopping-bag" },
  bunker: { name: "专业避难所", color: "#ff0000", icon: "home" }
};

// 防护等级配置
const PROTECTION_LEVELS = {
  high: { name: "甲级防护", color: "#ff0000", description: "可承受核爆冲击波和辐射" },
  medium: { name: "乙级防护", color: "#ff8800", description: "可承受常规轰炸" },
  basic: { name: "丙级防护", color: "#ffff00", description: "基础掩蔽功能" }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CITY_DATA, SHELTER_TYPES, PROTECTION_LEVELS };
}
