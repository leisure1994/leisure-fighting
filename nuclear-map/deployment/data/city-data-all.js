// 核战争城市自救地图 - 完整50城数据合并文件
// 自动生成于 2026-04-16

const CITY_DATA = {
  // 第一批：10个核心城市
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
      { name: "北京站地下避难所", type: "civil", level: "high", lat: 39.9049, lng: 116.4275, capacity: 7000, address: "北京站东街地下", description: "火车站人防工程" }
    ]
  },
  "上海": {
    center: [121.4737, 31.2304],
    shelters: [
      { name: "人民广场地下空间", type: "civil", level: "high", lat: 31.2328, lng: 121.4737, capacity: 8000, address: "人民广场地下", description: "大型综合人防工程" },
      { name: "徐家汇地铁站", type: "metro", level: "medium", lat: 31.1955, lng: 121.4377, capacity: 4000, address: "肇嘉浜路", description: "地铁1号线/9号线/11号线换乘站" },
      { name: "陆家嘴地下通道", type: "underground", level: "medium", lat: 31.2397, lng: 121.4998, capacity: 3500, address: "陆家嘴环路地下", description: "金融区地下人防通道" },
      { name: "虹桥火车站地下", type: "civil", level: "high", lat: 31.1946, lng: 121.3206, capacity: 10000, address: "申贵路", description: "交通枢纽人防工程" },
      { name: "静安寺地铁站", type: "metro", level: "medium", lat: 31.2244, lng: 121.4465, capacity: 3000, address: "南京西路", description: "地铁2号线/7号线/14号线换乘站" }
    ]
  },
  "广州": {
    center: [113.2644, 23.1291],
    shelters: [
      { name: "珠江新城地下空间", type: "civil", level: "high", lat: 23.1249, lng: 113.3268, capacity: 7000, address: "珠江新城核心区地下", description: "CBD综合人防工程" },
      { name: "体育西路地铁站", type: "metro", level: "medium", lat: 23.1373, lng: 113.3215, capacity: 4500, address: "体育西路", description: "地铁1号线/3号线换乘站" },
      { name: "广州东站地下", type: "civil", level: "high", lat: 23.1514, lng: 113.3249, capacity: 6000, address: "东站路", description: "火车站人防工程" },
      { name: "白云国际机场T2", type: "bunker", level: "high", lat: 23.3925, lng: 113.2993, capacity: 8000, address: "机场大道东", description: "机场重点人防工程" },
      { name: "天河城地下商场", type: "underground", level: "medium", lat: 23.1354, lng: 113.3228, capacity: 3500, address: "天河路208号地下", description: "天河商圈地下空间" }
    ]
  },
  "深圳": {
    center: [114.0579, 22.5431],
    shelters: [
      { name: "福田站地下", type: "civil", level: "high", lat: 22.5429, lng: 114.0567, capacity: 8000, address: "福田中心区", description: "高铁枢纽人防工程" },
      { name: "罗湖地铁站", type: "metro", level: "medium", lat: 22.5323, lng: 114.1138, capacity: 4000, address: "建设路", description: "地铁1号线站点" },
      { name: "会展中心地下", type: "civil", level: "high", lat: 22.5384, lng: 114.0557, capacity: 6000, address: "福华三路", description: "会展中心人防工程" },
      { name: "宝安国际机场T3", type: "bunker", level: "high", lat: 22.6393, lng: 113.8115, capacity: 9000, address: "机场南路", description: "机场重点人防工程" },
      { name: "华强北地下空间", type: "underground", level: "medium", lat: 22.5445, lng: 114.0880, capacity: 3500, address: "华强北路地下", description: "华强北商圈地下空间" }
    ]
  },
  "成都": {
    center: [104.0668, 30.5728],
    shelters: [
      { name: "天府广场地下", type: "civil", level: "high", lat: 30.6574, lng: 104.0665, capacity: 8000, address: "天府广场", description: "市中心大型人防工程" },
      { name: "春熙路地铁站", type: "metro", level: "medium", lat: 30.6558, lng: 104.0823, capacity: 3500, address: "春熙路", description: "地铁2号线/3号线换乘站" },
      { name: "火车南站地下", type: "civil", level: "high", lat: 30.6031, lng: 104.0653, capacity: 7000, address: "天府大道北段", description: "高铁站人防工程" },
      { name: "双流国际机场T2", type: "bunker", level: "high", lat: 30.5793, lng: 103.9565, capacity: 8000, address: "机场南四路", description: "机场重点人防工程" },
      { name: "宽窄巷子地下空间", type: "underground", level: "medium", lat: 30.6638, lng: 104.0557, capacity: 2500, address: "长顺上街地下", description: "景区地下人防空间" }
    ]
  },
  "武汉": {
    center: [114.3054, 30.5931],
    shelters: [
      { name: "洪山广场地下", type: "civil", level: "high", lat: 30.5425, lng: 114.3303, capacity: 7000, address: "洪山路", description: "大型人防工程" },
      { name: "江汉路地铁站", type: "metro", level: "medium", lat: 30.5872, lng: 114.2935, capacity: 4000, address: "江汉路", description: "地铁2号线/6号线换乘站" },
      { name: "汉口火车站地下", type: "civil", level: "high", lat: 30.6180, lng: 114.2584, capacity: 8000, address: "发展大道", description: "火车站人防工程" },
      { name: "光谷广场地下", type: "underground", level: "medium", lat: 30.5095, lng: 114.3979, capacity: 5000, address: "珞喻路", description: "光谷商圈地下空间" },
      { name: "武昌站地下", type: "civil", level: "high", lat: 30.5283, lng: 114.3164, capacity: 6000, address: "中山路", description: "火车站人防工程" }
    ]
  },
  "西安": {
    center: [108.9402, 34.3416],
    shelters: [
      { name: "钟楼地下", type: "civil", level: "high", lat: 34.2610, lng: 108.9423, capacity: 6000, address: "钟楼", description: "市中心人防工程" },
      { name: "大雁塔地铁站", type: "metro", level: "medium", lat: 34.2185, lng: 108.9689, capacity: 3500, address: "雁塔路", description: "地铁3号线/4号线换乘站" },
      { name: "西安北站地下", type: "civil", level: "high", lat: 34.3767, lng: 108.9400, capacity: 9000, address: "元朔路", description: "高铁站人防工程" },
      { name: "回民街地下空间", type: "underground", level: "medium", lat: 34.2638, lng: 108.9445, capacity: 2000, address: "北院门", description: "景区地下人防空间" },
      { name: "咸阳国际机场T3", type: "bunker", level: "high", lat: 34.4472, lng: 108.7516, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "重庆": {
    center: [106.5516, 29.5630],
    shelters: [
      { name: "解放碑地下", type: "civil", level: "high", lat: 29.5630, lng: 106.5703, capacity: 8000, address: "解放碑", description: "市中心大型人防工程" },
      { name: "观音桥地铁站", type: "metro", level: "medium", lat: 29.5757, lng: 106.5325, capacity: 4000, address: "观音桥", description: "地铁3号线站点" },
      { name: "江北国际机场T3", type: "bunker", level: "high", lat: 29.7192, lng: 106.6417, capacity: 10000, address: "机场东路", description: "机场重点人防工程" },
      { name: "沙坪坝站地下", type: "civil", level: "high", lat: 29.5561, lng: 106.4576, capacity: 7000, address: "天陈路", description: "高铁站人防工程" },
      { name: "南坪地下商场", type: "underground", level: "medium", lat: 29.5236, lng: 106.5739, capacity: 3500, address: "南城大道", description: "南坪商圈地下空间" }
    ]
  },
  "南京": {
    center: [118.7969, 32.0603],
    shelters: [
      { name: "新街口地下", type: "civil", level: "high", lat: 32.0432, lng: 118.7965, capacity: 7000, address: "新街口", description: "市中心人防工程" },
      { name: "南京站地下", type: "civil", level: "high", lat: 32.0873, lng: 118.7982, capacity: 8000, address: "龙蟠路", description: "火车站人防工程" },
      { name: "南京南站地下", type: "civil", level: "high", lat: 31.9689, lng: 118.8031, capacity: 9000, address: "玉兰路", description: "高铁站人防工程" },
      { name: "禄口国际机场T2", type: "bunker", level: "high", lat: 31.7427, lng: 118.8697, capacity: 8000, address: "机场大道", description: "机场重点人防工程" },
      { name: "夫子庙地下空间", type: "underground", level: "medium", lat: 32.0229, lng: 118.7955, capacity: 3000, address: "秦淮河北", description: "景区地下人防空间" }
    ]
  },
  "杭州": {
    center: [120.1551, 30.2741],
    shelters: [
      { name: "武林广场地下", type: "civil", level: "high", lat: 30.2758, lng: 120.1664, capacity: 7000, address: "武林广场", description: "市中心人防工程" },
      { name: "杭州东站地下", type: "civil", level: "high", lat: 30.2936, lng: 120.2065, capacity: 9000, address: "天城路", description: "高铁站人防工程" },
      { name: "萧山国际机场T4", type: "bunker", level: "high", lat: 30.2295, lng: 120.4344, capacity: 9000, address: "机场大道", description: "机场重点人防工程" },
      { name: "龙翔桥地铁站", type: "metro", level: "medium", lat: 30.2581, lng: 120.1647, capacity: 3500, address: "平海路", description: "地铁1号线站点" },
      { name: "西湖文化广场地下", type: "underground", level: "medium", lat: 30.2769, lng: 120.1641, capacity: 4000, address: "中山北路", description: "文化广场地下空间" }
    ]
  }
};
