// 核战争城市自救地图 - 完整50城数据 (修复版)
// 生成时间: 2026-04-16

const CITY_DATA = {
  北京: {
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
  上海: {
    center: [121.4737, 31.2304],
    shelters: [
      { name: "人民广场地下空间", type: "civil", level: "high", lat: 31.2328, lng: 121.4737, capacity: 8000, address: "人民广场地下", description: "大型综合人防工程" },
      { name: "徐家汇地铁站", type: "metro", level: "medium", lat: 31.1955, lng: 121.4377, capacity: 4000, address: "肇嘉浜路", description: "地铁1号线/9号线/11号线换乘站" },
      { name: "陆家嘴地下通道", type: "underground", level: "medium", lat: 31.2397, lng: 121.4998, capacity: 3500, address: "陆家嘴环路地下", description: "金融区地下人防通道" },
      { name: "虹桥火车站地下", type: "civil", level: "high", lat: 31.1946, lng: 121.3206, capacity: 10000, address: "申贵路", description: "交通枢纽人防工程" },
      { name: "静安寺地铁站", type: "metro", level: "medium", lat: 31.2244, lng: 121.4465, capacity: 3000, address: "南京西路", description: "地铁2号线/7号线/14号线换乘站" },
      { name: "陆家嘴中心绿地人防", type: "civil", level: "high", lat: 31.2400, lng: 121.5000, capacity: 6000, address: "陆家嘴中心绿地地下", description: "中心绿地人防工程" },
      { name: "世博轴地下空间", type: "underground", level: "medium", lat: 31.1850, lng: 121.4800, capacity: 5000, address: "世博大道", description: "世博园区地下空间" }
    ]
  },
  广州: {
    center: [113.2644, 23.1291],
    shelters: [
      { name: "珠江新城地下空间", type: "civil", level: "high", lat: 23.1249, lng: 113.3268, capacity: 7000, address: "珠江新城核心区地下", description: "CBD综合人防工程" },
      { name: "体育西路地铁站", type: "metro", level: "medium", lat: 23.1373, lng: 113.3215, capacity: 4500, address: "体育西路", description: "地铁1号线/3号线换乘站" },
      { name: "广州东站地下", type: "civil", level: "high", lat: 23.1514, lng: 113.3249, capacity: 6000, address: "东站路", description: "火车站人防工程" },
      { name: "白云国际机场T2", type: "bunker", level: "high", lat: 23.3925, lng: 113.2993, capacity: 8000, address: "机场大道东", description: "机场重点人防工程" },
      { name: "天河城地下商场", type: "underground", level: "medium", lat: 23.1354, lng: 113.3228, capacity: 3500, address: "天河路208号地下", description: "天河商圈地下空间" },
      { name: "公园前地铁站", type: "metro", level: "medium", lat: 23.1300, lng: 113.2600, capacity: 4000, address: "中山五路", description: "地铁1号线/2号线换乘站" }
    ]
  },
  深圳: {
    center: [114.0579, 22.5431],
    shelters: [
      { name: "福田站地下", type: "civil", level: "high", lat: 22.5429, lng: 114.0567, capacity: 8000, address: "福田中心区", description: "高铁枢纽人防工程" },
      { name: "罗湖地铁站", type: "metro", level: "medium", lat: 22.5323, lng: 114.1138, capacity: 4000, address: "建设路", description: "地铁1号线站点" },
      { name: "会展中心地下", type: "civil", level: "high", lat: 22.5384, lng: 114.0557, capacity: 6000, address: "福华三路", description: "会展中心人防工程" },
      { name: "宝安国际机场T3", type: "bunker", level: "high", lat: 22.6393, lng: 113.8115, capacity: 9000, address: "机场南路", description: "机场重点人防工程" },
      { name: "华强北地下空间", type: "underground", level: "medium", lat: 22.5445, lng: 114.0880, capacity: 3500, address: "华强北路地下", description: "华强北商圈地下空间" },
      { name: "南山地铁站", type: "metro", level: "medium", lat: 22.5200, lng: 113.9300, capacity: 3000, address: "南山大道", description: "地铁11号线站点" }
    ]
  },
  成都: {
    center: [104.0668, 30.5728],
    shelters: [
      { name: "天府广场地下", type: "civil", level: "high", lat: 30.6574, lng: 104.0665, capacity: 8000, address: "天府广场", description: "市中心大型人防工程" },
      { name: "春熙路地铁站", type: "metro", level: "medium", lat: 30.6558, lng: 104.0823, capacity: 3500, address: "春熙路", description: "地铁2号线/3号线换乘站" },
      { name: "火车南站地下", type: "civil", level: "high", lat: 30.6031, lng: 104.0653, capacity: 7000, address: "天府大道北段", description: "高铁站人防工程" },
      { name: "双流国际机场T2", type: "bunker", level: "high", lat: 30.5793, lng: 103.9565, capacity: 8000, address: "机场南四路", description: "机场重点人防工程" },
      { name: "宽窄巷子地下空间", type: "underground", level: "medium", lat: 30.6638, lng: 104.0557, capacity: 2500, address: "长顺上街地下", description: "景区地下人防空间" }
    ]
  },
  重庆: {
    center: [106.5516, 29.5630],
    shelters: [
      { name: "解放碑地下", type: "civil", level: "high", lat: 29.5630, lng: 106.5703, capacity: 8000, address: "解放碑", description: "市中心大型人防工程" },
      { name: "观音桥地铁站", type: "metro", level: "medium", lat: 29.5757, lng: 106.5325, capacity: 4000, address: "观音桥", description: "地铁3号线站点" },
      { name: "江北国际机场T3", type: "bunker", level: "high", lat: 29.7192, lng: 106.6417, capacity: 10000, address: "机场东路", description: "机场重点人防工程" },
      { name: "沙坪坝站地下", type: "civil", level: "high", lat: 29.5561, lng: 106.4576, capacity: 7000, address: "天陈路", description: "高铁站人防工程" },
      { name: "南坪地下商场", type: "underground", level: "medium", lat: 29.5236, lng: 106.5739, capacity: 3500, address: "南城大道", description: "南坪商圈地下空间" },
      { name: "重庆北站地下", type: "civil", level: "high", lat: 29.6100, lng: 106.5500, capacity: 9000, address: "昆仑大道", description: "高铁站人防工程" },
      { name: "三峡广场地下", type: "underground", level: "medium", lat: 29.5580, lng: 106.4600, capacity: 4000, address: "三峡广场", description: "商圈地下空间" }
    ]
  },
  武汉: {
    center: [114.3054, 30.5931],
    shelters: [
      { name: "洪山广场地下", type: "civil", level: "high", lat: 30.5425, lng: 114.3303, capacity: 7000, address: "洪山路", description: "大型人防工程" },
      { name: "江汉路地铁站", type: "metro", level: "medium", lat: 30.5872, lng: 114.2935, capacity: 4000, address: "江汉路", description: "地铁2号线/6号线换乘站" },
      { name: "汉口火车站地下", type: "civil", level: "high", lat: 30.6180, lng: 114.2584, capacity: 8000, address: "发展大道", description: "火车站人防工程" },
      { name: "光谷广场地下", type: "underground", level: "medium", lat: 30.5095, lng: 114.3979, capacity: 5000, address: "珞喻路", description: "光谷商圈地下空间" },
      { name: "武昌站地下", type: "civil", level: "high", lat: 30.5283, lng: 114.3164, capacity: 6000, address: "中山路", description: "火车站人防工程" },
      { name: "武汉站地下", type: "civil", level: "high", lat: 30.6070, lng: 114.4200, capacity: 9000, address: "高铁武汉站", description: "高铁站人防工程" }
    ]
  },
  西安: {
    center: [108.9402, 34.3416],
    shelters: [
      { name: "钟楼地下", type: "civil", level: "high", lat: 34.2610, lng: 108.9423, capacity: 6000, address: "钟楼", description: "市中心人防工程" },
      { name: "大雁塔地铁站", type: "metro", level: "medium", lat: 34.2185, lng: 108.9689, capacity: 3500, address: "雁塔路", description: "地铁3号线/4号线换乘站" },
      { name: "西安北站地下", type: "civil", level: "high", lat: 34.3767, lng: 108.9400, capacity: 9000, address: "元朔路", description: "高铁站人防工程" },
      { name: "回民街地下空间", type: "underground", level: "medium", lat: 34.2638, lng: 108.9445, capacity: 2000, address: "北院门", description: "景区地下人防空间" },
      { name: "咸阳国际机场T3", type: "bunker", level: "high", lat: 34.4472, lng: 108.7516, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  南京: {
    center: [118.7969, 32.0603],
    shelters: [
      { name: "新街口地下", type: "civil", level: "high", lat: 32.0432, lng: 118.7965, capacity: 7000, address: "新街口", description: "市中心人防工程" },
      { name: "南京站地下", type: "civil", level: "high", lat: 32.0873, lng: 118.7982, capacity: 8000, address: "龙蟠路", description: "火车站人防工程" },
      { name: "南京南站地下", type: "civil", level: "high", lat: 31.9689, lng: 118.8031, capacity: 9000, address: "玉兰路", description: "高铁站人防工程" },
      { name: "禄口国际机场T2", type: "bunker", level: "high", lat: 31.7427, lng: 118.8697, capacity: 8000, address: "机场大道", description: "机场重点人防工程" },
      { name: "夫子庙地下空间", type: "underground", level: "medium", lat: 32.0229, lng: 118.7955, capacity: 3000, address: "秦淮河北", description: "景区地下人防空间" }
    ]
  },
  杭州: {
    center: [120.1551, 30.2741],
    shelters: [
      { name: "武林广场地下", type: "civil", level: "high", lat: 30.2758, lng: 120.1664, capacity: 7000, address: "武林广场", description: "市中心人防工程" },
      { name: "杭州东站地下", type: "civil", level: "high", lat: 30.2936, lng: 120.2065, capacity: 9000, address: "天城路", description: "高铁站人防工程" },
      { name: "萧山国际机场T4", type: "bunker", level: "high", lat: 30.2295, lng: 120.4344, capacity: 9000, address: "机场大道", description: "机场重点人防工程" },
      { name: "龙翔桥地铁站", type: "metro", level: "medium", lat: 30.2581, lng: 120.1647, capacity: 3500, address: "平海路", description: "地铁1号线站点" },
      { name: "西湖文化广场地下", type: "underground", level: "medium", lat: 30.2769, lng: 120.1641, capacity: 4000, address: "中山北路", description: "文化广场地下空间" }
    ]
  },
  天津: {
    center: [117.2009, 39.0842],
    shelters: [
      { name: "天津站地下", type: "civil", level: "high", lat: 39.1340, lng: 117.2108, capacity: 6000, address: "建国道", description: "火车站人防工程" },
      { name: "天津西站地下", type: "civil", level: "high", lat: 39.1585, lng: 117.1634, capacity: 5500, address: "西站前街", description: "高铁站人防工程" },
      { name: "滨江道地下商业街", type: "underground", level: "basic", lat: 39.1178, lng: 117.1954, capacity: 3000, address: "滨江道地下", description: "滨江道商圈地下空间" },
      { name: "和平路地铁站", type: "metro", level: "medium", lat: 39.1185, lng: 117.1920, capacity: 2500, address: "和平路", description: "地铁3号线/4号线站点" },
      { name: "滨海国际机场T2", type: "bunker", level: "high", lat: 39.1167, lng: 117.3500, capacity: 8000, address: "机场大道", description: "机场重点人防工程" },
      { name: "鼓楼地下商业街", type: "underground", level: "basic", lat: 39.1400, lng: 117.1800, capacity: 3500, address: "鼓楼", description: "鼓楼商圈地下空间" }
    ]
  },
  青岛: {
    center: [120.3826, 36.0669],
    shelters: [
      { name: "青岛站地下", type: "civil", level: "high", lat: 36.0667, lng: 120.3167, capacity: 5000, address: "泰安路", description: "火车站人防工程" },
      { name: "五四广场地下", type: "civil", level: "high", lat: 36.0667, lng: 120.3833, capacity: 6000, address: "香港中路", description: "市中心人防工程" },
      { name: "台东地下商业街", type: "underground", level: "basic", lat: 36.0833, lng: 120.3667, capacity: 3000, address: "台东一路地下", description: "台东商圈地下空间" },
      { name: "李村地铁站", type: "metro", level: "medium", lat: 36.1500, lng: 120.4333, capacity: 2500, address: "京口路", description: "地铁2号线/3号线站点" },
      { name: "胶东国际机场", type: "bunker", level: "high", lat: 36.3617, lng: 120.0883, capacity: 10000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  大连: {
    center: [121.6147, 38.9140],
    shelters: [
      { name: "大连站地下", type: "civil", level: "high", lat: 38.9225, lng: 121.6392, capacity: 6000, address: "长江路", description: "火车站人防工程" },
      { name: "青泥洼桥地下", type: "civil", level: "high", lat: 38.9167, lng: 121.6333, capacity: 5500, address: "中山路", description: "市中心人防工程" },
      { name: "西安路地下商业街", type: "underground", level: "basic", lat: 38.9167, lng: 121.6000, capacity: 3500, address: "西安路地下", description: "西安路商圈地下空间" },
      { name: "星海广场地下", type: "civil", level: "medium", lat: 38.8667, lng: 121.6833, capacity: 4000, address: "中山路", description: "星海广场人防工程" },
      { name: "周水子国际机场", type: "bunker", level: "high", lat: 38.9667, lng: 121.5333, capacity: 8000, address: "迎客路", description: "机场重点人防工程" }
    ]
  },
  厦门: {
    center: [118.0894, 24.4798],
    shelters: [
      { name: "厦门站地下", type: "civil", level: "high", lat: 24.4667, lng: 118.1167, capacity: 5000, address: "厦禾路", description: "火车站人防工程" },
      { name: "中山路地下商业街", type: "underground", level: "basic", lat: 24.4667, lng: 118.0833, capacity: 3000, address: "中山路地下", description: "中山路商圈地下空间" },
      { name: "SM城市广场地下", type: "underground", level: "basic", lat: 24.5167, lng: 118.1333, capacity: 4000, address: "嘉禾路", description: "SM商圈地下空间" },
      { name: "高崎国际机场T4", type: "bunker", level: "high", lat: 24.5333, lng: 118.1333, capacity: 8000, address: "翔云一路", description: "机场重点人防工程" },
      { name: "镇海路地铁站", type: "metro", level: "medium", lat: 24.4667, lng: 118.0833, capacity: 2500, address: "镇海路", description: "地铁1号线站点" }
    ]
  },
  苏州: {
    center: [120.5853, 31.2989],
    shelters: [
      { name: "苏州站地下", type: "civil", level: "high", lat: 31.3333, lng: 120.6167, capacity: 6000, address: "苏站路", description: "火车站人防工程" },
      { name: "观前街地下商业街", type: "underground", level: "basic", lat: 31.3167, lng: 120.6333, capacity: 3500, address: "观前街地下", description: "观前街商圈地下空间" },
      { name: "园区时代广场地下", type: "civil", level: "medium", lat: 31.3167, lng: 120.7333, capacity: 5000, address: "华池街", description: "园区CBD人防工程" },
      { name: "石路地铁站", type: "metro", level: "medium", lat: 31.3167, lng: 120.6000, capacity: 2500, address: "广济南路", description: "地铁2号线站点" },
      { name: "木渎地下商业街", type: "underground", level: "basic", lat: 31.2667, lng: 120.5167, capacity: 3000, address: "金山路地下", description: "木渎商圈地下空间" }
    ]
  },
  长沙: {
    center: [112.9388, 28.2282],
    shelters: [
      { name: "五一广场地下", type: "civil", level: "high", lat: 28.1967, lng: 112.9833, capacity: 7000, address: "五一大道", description: "市中心人防工程" },
      { name: "黄兴路步行街地下", type: "underground", level: "basic", lat: 28.2000, lng: 112.9833, capacity: 3500, address: "黄兴路地下", description: "黄兴路商圈地下空间" },
      { name: "长沙南站地下", type: "civil", level: "high", lat: 28.1500, lng: 113.0667, capacity: 9000, address: "花侯路", description: "高铁站人防工程" },
      { name: "橘子洲地铁站", type: "metro", level: "medium", lat: 28.1667, lng: 112.9667, capacity: 3000, address: "橘子洲", description: "地铁2号线站点" },
      { name: "黄花国际机场T2", type: "bunker", level: "high", lat: 28.2000, lng: 113.2167, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  郑州: {
    center: [113.6253, 34.7466],
    shelters: [
      { name: "郑州站地下", type: "civil", level: "high", lat: 34.7500, lng: 113.6500, capacity: 7000, address: "大同路", description: "火车站人防工程" },
      { name: "二七广场地下", type: "civil", level: "high", lat: 34.7500, lng: 113.6667, capacity: 6000, address: "二七路", description: "市中心人防工程" },
      { name: "郑州东站地下", type: "civil", level: "high", lat: 34.7667, lng: 113.7500, capacity: 9000, address: "心怡路", description: "高铁站人防工程" },
      { name: "德化街地下商业街", type: "underground", level: "basic", lat: 34.7500, lng: 113.6667, capacity: 3500, address: "德化街地下", description: "德化街商圈地下空间" },
      { name: "新郑国际机场T2", type: "bunker", level: "high", lat: 34.5167, lng: 113.8333, capacity: 10000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  沈阳: {
    center: [123.4315, 41.8057],
    shelters: [
      { name: "沈阳站地下", type: "civil", level: "high", lat: 41.8000, lng: 123.4000, capacity: 6000, address: "胜利南街", description: "火车站人防工程" },
      { name: "中街地下商业街", type: "underground", level: "basic", lat: 41.8000, lng: 123.4500, capacity: 4000, address: "中街地下", description: "中街商圈地下空间" },
      { name: "沈阳北站地下", type: "civil", level: "high", lat: 41.8167, lng: 123.4333, capacity: 8000, address: "北站路", description: "高铁站人防工程" },
      { name: "太原街地铁站", type: "metro", level: "medium", lat: 41.8000, lng: 123.4000, capacity: 3000, address: "中华路", description: "地铁1号线/4号线站点" },
      { name: "桃仙国际机场T3", type: "bunker", level: "high", lat: 41.6333, lng: 123.4833, capacity: 9000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  哈尔滨: {
    center: [126.5350, 45.8038],
    shelters: [
      { name: "哈尔滨站地下", type: "civil", level: "high", lat: 45.7667, lng: 126.6333, capacity: 6000, address: "铁路街", description: "火车站人防工程" },
      { name: "中央大街地下商业街", type: "underground", level: "basic", lat: 45.7833, lng: 126.6167, capacity: 3000, address: "中央大街地下", description: "中央大街商圈地下空间" },
      { name: "哈尔滨西站地下", type: "civil", level: "high", lat: 45.7167, lng: 126.5167, capacity: 8000, address: "哈尔滨大街", description: "高铁站人防工程" },
      { name: "博物馆地铁站", type: "metro", level: "medium", lat: 45.7667, lng: 126.6500, capacity: 3000, address: "红军街", description: "地铁1号线站点" },
      { name: "太平国际机场T2", type: "bunker", level: "high", lat: 45.6333, lng: 126.2500, capacity: 8500, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  昆明: {
    center: [102.8329, 24.8801],
    shelters: [
      { name: "昆明站地下", type: "civil", level: "high", lat: 25.0167, lng: 102.7167, capacity: 6000, address: "北京路", description: "火车站人防工程" },
      { name: "南屏街地下商业街", type: "underground", level: "basic", lat: 25.0333, lng: 102.7167, capacity: 3500, address: "南屏街地下", description: "南屏街商圈地下空间" },
      { name: "昆明南站地下", type: "civil", level: "high", lat: 24.8833, lng: 102.8667, capacity: 8000, address: "祥丰街", description: "高铁站人防工程" },
      { name: "东风广场地铁站", type: "metro", level: "medium", lat: 25.0333, lng: 102.7167, capacity: 3000, address: "北京路", description: "地铁2号线/3号线站点" },
      { name: "长水国际机场", type: "bunker", level: "high", lat: 25.1000, lng: 102.9333, capacity: 10000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  合肥: {
    center: [117.2272, 31.8206],
    shelters: [
      { name: "合肥站地下", type: "civil", level: "high", lat: 31.8667, lng: 117.3167, capacity: 6000, address: "站前路", description: "火车站人防工程" },
      { name: "淮河路步行街地下", type: "underground", level: "basic", lat: 31.8667, lng: 117.3000, capacity: 3500, address: "淮河路地下", description: "淮河路商圈地下空间" },
      { name: "合肥南站地下", type: "civil", level: "high", lat: 31.8167, lng: 117.3000, capacity: 9000, address: "龙川路", description: "高铁站人防工程" },
      { name: "大东门地铁站", type: "metro", level: "medium", lat: 31.8667, lng: 117.3000, capacity: 3000, address: "长江东路", description: "地铁1号线/2号线站点" },
      { name: "新桥国际机场", type: "bunker", level: "high", lat: 31.9833, lng: 116.9833, capacity: 9000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  南昌: {
    center: [115.8542, 28.6820],
    shelters: [
      { name: "南昌站地下", type: "civil", level: "high", lat: 28.6833, lng: 115.8833, capacity: 6000, address: "站前路", description: "火车站人防工程" },
      { name: "中山路地下商业街", type: "underground", level: "basic", lat: 28.6833, lng: 115.8833, capacity: 3500, address: "中山路地下", description: "中山路商圈地下空间" },
      { name: "南昌西站地下", type: "civil", level: "high", lat: 28.6333, lng: 115.8000, capacity: 8000, address: "西站大街", description: "高铁站人防工程" },
      { name: "八一广场地铁站", type: "metro", level: "medium", lat: 28.6833, lng: 115.8833, capacity: 3000, address: "八一大道", description: "地铁1号线/2号线站点" },
      { name: "昌北国际机场T2", type: "bunker", level: "high", lat: 28.8667, lng: 115.9333, capacity: 9000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  贵阳: {
    center: [106.6302, 26.6477],
    shelters: [
      { name: "贵阳站地下", type: "civil", level: "high", lat: 26.5667, lng: 106.7167, capacity: 6000, address: "遵义路", description: "火车站人防工程" },
      { name: "喷水池地下商业街", type: "underground", level: "basic", lat: 26.5833, lng: 106.7167, capacity: 3000, address: "喷水池地下", description: "喷水池商圈地下空间" },
      { name: "贵阳北站地下", type: "civil", level: "high", lat: 26.6167, lng: 106.6833, capacity: 8000, address: "北站路", description: "高铁站人防工程" },
      { name: "大十字地铁站", type: "metro", level: "medium", lat: 26.5833, lng: 106.7167, capacity: 3000, address: "中华中路", description: "地铁1号线站点" },
      { name: "龙洞堡国际机场T2", type: "bunker", level: "high", lat: 26.5333, lng: 106.8000, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  福州: {
    center: [119.2965, 26.0745],
    shelters: [
      { name: "福州站地下", type: "civil", level: "high", lat: 26.1000, lng: 119.3167, capacity: 6000, address: "站前路", description: "火车站人防工程" },
      { name: "东街口地下商业街", type: "underground", level: "basic", lat: 26.0833, lng: 119.3000, capacity: 3500, address: "东街口地下", description: "东街口商圈地下空间" },
      { name: "福州南站地下", type: "civil", level: "high", lat: 26.0333, lng: 119.3833, capacity: 8000, address: "站后路", description: "高铁站人防工程" },
      { name: "南门兜地铁站", type: "metro", level: "medium", lat: 26.0833, lng: 119.3000, capacity: 3000, address: "乌山路", description: "地铁1号线/2号线站点" },
      { name: "长乐国际机场", type: "bunker", level: "high", lat: 25.9333, lng: 119.6667, capacity: 9000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  南宁: {
    center: [108.3661, 22.8172],
    shelters: [
      { name: "南宁站地下", type: "civil", level: "high", lat: 22.8167, lng: 108.3167, capacity: 6000, address: "中华路", description: "火车站人防工程" },
      { name: "朝阳广场地下商业街", type: "underground", level: "basic", lat: 22.8167, lng: 108.3167, capacity: 3500, address: "朝阳路地下", description: "朝阳商圈地下空间" },
      { name: "南宁东站地下", type: "civil", level: "high", lat: 22.8500, lng: 108.4000, capacity: 8000, address: "凤岭北路", description: "高铁站人防工程" },
      { name: "金湖广场地铁站", type: "metro", level: "medium", lat: 22.8167, lng: 108.3667, capacity: 3000, address: "民族大道", description: "地铁1号线/3号线站点" },
      { name: "吴圩国际机场T2", type: "bunker", level: "high", lat: 22.6000, lng: 108.1667, capacity: 8000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  兰州: {
    center: [103.8343, 36.0611],
    shelters: [
      { name: "兰州站地下", type: "civil", level: "high", lat: 36.0667, lng: 103.8167, capacity: 6000, address: "火车站东路", description: "火车站人防工程" },
      { name: "西关什字地下商业街", type: "underground", level: "basic", lat: 36.0667, lng: 103.8167, capacity: 3000, address: "西关什字地下", description: "西关商圈地下空间" },
      { name: "兰州西站地下", type: "civil", level: "high", lat: 36.0667, lng: 103.7667, capacity: 8000, address: "西津西路", description: "高铁站人防工程" },
      { name: "东方红广场地铁站", type: "metro", level: "medium", lat: 36.0667, lng: 103.8333, capacity: 3000, address: "庆阳路", description: "地铁1号线/2号线站点" },
      { name: "中川国际机场T2", type: "bunker", level: "high", lat: 36.5167, lng: 103.6167, capacity: 8000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  乌鲁木齐: {
    center: [87.6168, 43.8256],
    shelters: [
      { name: "乌鲁木齐站地下", type: "civil", level: "high", lat: 43.8000, lng: 87.6000, capacity: 7000, address: "高铁北二路", description: "高铁站人防工程" },
      { name: "友好地下商业街", type: "underground", level: "basic", lat: 43.8333, lng: 87.6000, capacity: 3000, address: "友好北路地下", description: "友好商圈地下空间" },
      { name: "南门地铁站", type: "metro", level: "medium", lat: 43.7833, lng: 87.6167, capacity: 3000, address: "解放南路", description: "地铁1号线站点" },
      { name: "地窝堡国际机场T3", type: "bunker", level: "high", lat: 43.9000, lng: 87.4667, capacity: 9000, address: "机场高速", description: "机场重点人防工程" },
      { name: "铁路局地下", type: "civil", level: "medium", lat: 43.8667, lng: 87.5667, capacity: 5000, address: "北京南路", description: "铁路局商圈人防工程" }
    ]
  },
  海口: {
    center: [110.3492, 20.0174],
    shelters: [
      { name: "海口站地下", type: "civil", level: "high", lat: 20.0167, lng: 110.2833, capacity: 6000, address: "粤海大道", description: "火车站人防工程" },
      { name: "骑楼老街地下空间", type: "underground", level: "basic", lat: 20.0167, lng: 110.3333, capacity: 2000, address: "中山路地下", description: "骑楼老街地下空间" },
      { name: "海口东站地下", type: "civil", level: "high", lat: 20.0000, lng: 110.3667, capacity: 7000, address: "龙昆南路", description: "高铁站人防工程" },
      { name: "万绿园地铁站", type: "metro", level: "medium", lat: 20.0167, lng: 110.3167, capacity: 2500, address: "滨海大道", description: "地铁1号线站点" },
      { name: "美兰国际机场T2", type: "bunker", level: "high", lat: 19.9333, lng: 110.4667, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  拉萨: {
    center: [91.1409, 29.6500],
    shelters: [
      { name: "拉萨站地下", type: "civil", level: "high", lat: 29.6500, lng: 91.1000, capacity: 5000, address: "柳梧新区", description: "火车站人防工程" },
      { name: "布达拉宫广场地下", type: "underground", level: "basic", lat: 29.6500, lng: 91.1167, capacity: 2000, address: "北京中路", description: "布达拉宫广场地下空间" },
      { name: "八廓街地下商业街", type: "underground", level: "basic", lat: 29.6500, lng: 91.1333, capacity: 2500, address: "八廓街地下", description: "八廓街商圈地下空间" },
      { name: "贡嘎国际机场", type: "bunker", level: "high", lat: 29.2833, lng: 90.9167, capacity: 7000, address: "机场高速", description: "机场重点人防工程" },
      { name: "西郊人防工程", type: "civil", level: "medium", lat: 29.6500, lng: 91.0667, capacity: 4000, address: "金珠中路", description: "西郊人防工程" }
    ]
  },
  西宁: {
    center: [101.7782, 36.6171],
    shelters: [
      { name: "西宁站地下", type: "civil", level: "high", lat: 36.6000, lng: 101.8167, capacity: 6000, address: "建国路", description: "火车站人防工程" },
      { name: "大十字地下商业街", type: "underground", level: "basic", lat: 36.6167, lng: 101.7833, capacity: 3000, address: "东大街地下", description: "大十字商圈地下空间" },
      { name: "力盟商业巷地下", type: "underground", level: "basic", lat: 36.6333, lng: 101.7667, capacity: 3500, address: "西关大街", description: "力盟商圈地下空间" },
      { name: "曹家堡国际机场T2", type: "bunker", level: "high", lat: 36.5333, lng: 102.0500, capacity: 8000, address: "机场高速", description: "机场重点人防工程" },
      { name: "西门人防工程", type: "civil", level: "medium", lat: 36.6167, lng: 101.7667, capacity: 4500, address: "西门口", description: "西门人防工程" }
    ]
  },
  银川: {
    center: [106.2309, 38.4872],
    shelters: [
      { name: "银川站地下", type: "civil", level: "high", lat: 38.5000, lng: 106.2167, capacity: 6000, address: "上海西路", description: "火车站人防工程" },
      { name: "新华街地下商业街", type: "underground", level: "basic", lat: 38.4667, lng: 106.2833, capacity: 3000, address: "新华街地下", description: "新华街商圈地下空间" },
      { name: "怀远市场地下", type: "underground", level: "basic", lat: 38.4833, lng: 106.1500, capacity: 2500, address: "怀远路", description: "怀远市场地下空间" },
      { name: "河东国际机场T3", type: "bunker", level: "high", lat: 38.4833, lng: 106.4000, capacity: 8000, address: "机场高速", description: "机场重点人防工程" },
      { name: "南门人防工程", type: "civil", level: "medium", lat: 38.4667, lng: 106.2833, capacity: 4500, address: "南薰西街", description: "南门人防工程" }
    ]
  },
  呼和浩特: {
    center: [111.7492, 40.8414],
    shelters: [
      { name: "呼和浩特站地下", type: "civil", level: "high", lat: 40.8167, lng: 111.6833, capacity: 6000, address: "车站东街", description: "火车站人防工程" },
      { name: "中山西路地下商业街", type: "underground", level: "basic", lat: 40.8167, lng: 111.6833, capacity: 3000, address: "中山西路地下", description: "中山路商圈地下空间" },
      { name: "呼和浩特东站地下", type: "civil", level: "high", lat: 40.8500, lng: 111.7667, capacity: 8000, address: "万通路", description: "高铁站人防工程" },
      { name: "新华广场地铁站", type: "metro", level: "medium", lat: 40.8167, lng: 111.6833, capacity: 3000, address: "新华大街", description: "地铁1号线/2号线站点" },
      { name: "白塔国际机场", type: "bunker", level: "high", lat: 40.8500, lng: 111.8167, capacity: 8000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  无锡: {
    center: [120.3119, 31.4912],
    shelters: [
      { name: "无锡站地下", type: "civil", level: "high", lat: 31.5833, lng: 120.3000, capacity: 6000, address: "兴源北路", description: "火车站人防工程" },
      { name: "崇安寺地下商业街", type: "underground", level: "basic", lat: 31.5833, lng: 120.3000, capacity: 3500, address: "中山路地下", description: "崇安寺商圈地下空间" },
      { name: "无锡东站地下", type: "civil", level: "high", lat: 31.6000, lng: 120.4500, capacity: 8000, address: "迎安路", description: "高铁站人防工程" },
      { name: "三阳广场地铁站", type: "metro", level: "medium", lat: 31.5833, lng: 120.3000, capacity: 3000, address: "中山路", description: "地铁1号线/2号线站点" },
      { name: "硕放国际机场T2", type: "bunker", level: "high", lat: 31.5000, lng: 120.4333, capacity: 8000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  佛山: {
    center: [113.1214, 23.0215],
    shelters: [
      { name: "佛山西站地下", type: "civil", level: "high", lat: 23.0833, lng: 113.0667, capacity: 7000, address: "狮山镇", description: "高铁站人防工程" },
      { name: "祖庙地下商业街", type: "underground", level: "basic", lat: 23.0333, lng: 113.1167, capacity: 3000, address: "祖庙路地下", description: "祖庙商圈地下空间" },
      { name: "岭南天地地下", type: "underground", level: "basic", lat: 23.0333, lng: 113.1167, capacity: 3500, address: "天地路", description: "岭南天地地下空间" },
      { name: "千灯湖地铁站", type: "metro", level: "medium", lat: 23.0333, lng: 113.1333, capacity: 2500, address: "桂澜路", description: "地铁广佛线站点" },
      { name: "沙堤机场", type: "bunker", level: "high", lat: 23.0667, lng: 113.0833, capacity: 6000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  东莞: {
    center: [113.7518, 23.0207],
    shelters: [
      { name: "东莞站地下", type: "civil", level: "high", lat: 23.0667, lng: 113.6833, capacity: 6000, address: "茶山镇", description: "火车站人防工程" },
      { name: "南城地下商业街", type: "underground", level: "basic", lat: 23.0333, lng: 113.7500, capacity: 3500, address: "鸿福路地下", description: "南城商圈地下空间" },
      { name: "虎门高铁站地下", type: "civil", level: "high", lat: 22.8167, lng: 113.6667, capacity: 7000, address: "虎门镇", description: "高铁站人防工程" },
      { name: "东城地铁站", type: "metro", level: "medium", lat: 23.0500, lng: 113.7833, capacity: 2500, address: "东城中路", description: "地铁2号线站点" },
      { name: "东莞东站地下", type: "civil", level: "high", lat: 22.9667, lng: 114.0833, capacity: 6000, address: "常平镇", description: "火车站人防工程" }
    ]
  },
  温州: {
    center: [120.6994, 27.9943],
    shelters: [
      { name: "温州站地下", type: "civil", level: "high", lat: 28.0000, lng: 120.6667, capacity: 6000, address: "温州大道", description: "火车站人防工程" },
      { name: "五马街地下商业街", type: "underground", level: "basic", lat: 28.0000, lng: 120.6667, capacity: 3000, address: "五马街地下", description: "五马街商圈地下空间" },
      { name: "温州南站地下", type: "civil", level: "high", lat: 27.9667, lng: 120.5833, capacity: 8000, address: "宁波路", description: "高铁站人防工程" },
      { name: "龙霞路地铁站", type: "metro", level: "medium", lat: 28.0000, lng: 120.7000, capacity: 2500, address: "龙霞路", description: "地铁S1线站点" },
      { name: "龙湾国际机场T2", type: "bunker", level: "high", lat: 27.9167, lng: 120.8500, capacity: 8000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  常州: {
    center: [119.9741, 31.8112],
    shelters: [
      { name: "常州站地下", type: "civil", level: "high", lat: 31.7833, lng: 119.9667, capacity: 6000, address: "竹林西路", description: "火车站人防工程" },
      { name: "南大街地下商业街", type: "underground", level: "basic", lat: 31.7833, lng: 119.9667, capacity: 3500, address: "南大街地下", description: "南大街商圈地下空间" },
      { name: "常州北站地下", type: "civil", level: "high", lat: 31.8333, lng: 119.9667, capacity: 8000, address: "长江北路", description: "高铁站人防工程" },
      { name: "文化宫地铁站", type: "metro", level: "medium", lat: 31.7833, lng: 119.9667, capacity: 3000, address: "和平北路", description: "地铁1号线/2号线站点" },
      { name: "奔牛国际机场", type: "bunker", level: "high", lat: 31.9167, lng: 119.7833, capacity: 7000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  徐州: {
    center: [117.2841, 34.2610],
    shelters: [
      { name: "徐州站地下", type: "civil", level: "high", lat: 34.2667, lng: 117.2000, capacity: 6000, address: "复兴北路", description: "火车站人防工程" },
      { name: "淮海路地下商业街", type: "underground", level: "basic", lat: 34.2667, lng: 117.2000, capacity: 3000, address: "淮海路地下", description: "淮海路商圈地下空间" },
      { name: "徐州东站地下", type: "civil", level: "high", lat: 34.2167, lng: 117.3000, capacity: 9000, address: "城东大道", description: "高铁站人防工程" },
      { name: "彭城广场地铁站", type: "metro", level: "medium", lat: 34.2667, lng: 117.2000, capacity: 3000, address: "中山北路", description: "地铁1号线/2号线站点" },
      { name: "观音国际机场T2", type: "bunker", level: "high", lat: 34.0667, lng: 117.5500, capacity: 8000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  烟台: {
    center: [121.4481, 37.4638],
    shelters: [
      { name: "烟台站地下", type: "civil", level: "high", lat: 37.5500, lng: 121.3833, capacity: 6000, address: "北马路", description: "火车站人防工程" },
      { name: "南大街地下商业街", type: "underground", level: "basic", lat: 37.5500, lng: 121.4000, capacity: 3000, address: "南大街地下", description: "南大街商圈地下空间" },
      { name: "烟台南站地下", type: "civil", level: "high", lat: 37.4000, lng: 121.5667, capacity: 8000, address: "山海南路", description: "高铁站人防工程" },
      { name: "文化中心地铁站", type: "metro", level: "medium", lat: 37.5500, lng: 121.4000, capacity: 2500, address: "港城东大街", description: "规划地铁站点" },
      { name: "蓬莱国际机场", type: "bunker", level: "high", lat: 37.6667, lng: 120.9833, capacity: 9000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  唐山: {
    center: [118.1812, 39.6292],
    shelters: [
      { name: "唐山站地下", type: "civil", level: "high", lat: 39.6333, lng: 118.1500, capacity: 7000, address: "站前路", description: "火车站人防工程" },
      { name: "新华道地下商业街", type: "underground", level: "basic", lat: 39.6333, lng: 118.1833, capacity: 3500, address: "新华道地下", description: "新华道商圈地下空间" },
      { name: "唐山北站地下", type: "civil", level: "high", lat: 39.6667, lng: 118.1667, capacity: 6000, address: "浭阳大街", description: "高铁站人防工程" },
      { name: "世博广场地下", type: "underground", level: "basic", lat: 39.6333, lng: 118.1833, capacity: 3000, address: "建设南路", description: "世博广场地下空间" },
      { name: "三女河机场", type: "bunker", level: "high", lat: 39.7167, lng: 118.0167, capacity: 6000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  洛阳: {
    center: [112.4540, 34.6197],
    shelters: [
      { name: "洛阳站地下", type: "civil", level: "high", lat: 34.6833, lng: 112.4333, capacity: 6000, address: "道南路", description: "火车站人防工程" },
      { name: "中州路地下商业街", type: "underground", level: "basic", lat: 34.6833, lng: 112.4333, capacity: 3000, address: "中州路地下", description: "中州路商圈地下空间" },
      { name: "龙门高铁站地下", type: "civil", level: "high", lat: 34.6167, lng: 112.4500, capacity: 8000, address: "通衢路", description: "高铁站人防工程" },
      { name: "牡丹广场地铁站", type: "metro", level: "medium", lat: 34.6667, lng: 112.4000, capacity: 3000, address: "牡丹广场", description: "地铁1号线站点" },
      { name: "北郊机场", type: "bunker", level: "high", lat: 34.7333, lng: 112.4000, capacity: 7000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  襄阳: {
    center: [112.1224, 32.0090],
    shelters: [
      { name: "襄阳站地下", type: "civil", level: "high", lat: 32.0667, lng: 112.1500, capacity: 6000, address: "前进路", description: "火车站人防工程" },
      { name: "人民广场地下商业街", type: "underground", level: "basic", lat: 32.0667, lng: 112.1333, capacity: 3000, address: "人民广场地下", description: "人民广场商圈地下空间" },
      { name: "襄阳东站地下", type: "civil", level: "high", lat: 32.0833, lng: 112.2333, capacity: 8000, address: "高铁南路", description: "高铁站人防工程" },
      { name: "鼓楼商场地下", type: "underground", level: "basic", lat: 32.0667, lng: 112.1333, capacity: 2500, address: "解放路", description: "鼓楼商圈地下空间" },
      { name: "刘集机场", type: "bunker", level: "high", lat: 32.0833, lng: 112.3000, capacity: 6000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  宜昌: {
    center: [111.2868, 30.6920],
    shelters: [
      { name: "宜昌站地下", type: "civil", level: "high", lat: 30.7000, lng: 111.2833, capacity: 6000, address: "东山大道", description: "火车站人防工程" },
      { name: "夷陵广场地下商业街", type: "underground", level: "basic", lat: 30.7000, lng: 111.2833, capacity: 3000, address: "夷陵大道地下", description: "夷陵广场商圈地下空间" },
      { name: "宜昌东站地下", type: "civil", level: "high", lat: 30.6833, lng: 111.3833, capacity: 8000, address: "城东大道", description: "高铁站人防工程" },
      { name: "万达广场地下", type: "underground", level: "basic", lat: 30.7000, lng: 111.3167, capacity: 3500, address: "沿江大道", description: "万达商圈地下空间" },
      { name: "三峡机场", type: "bunker", level: "high", lat: 30.5500, lng: 111.4500, capacity: 7000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  桂林: {
    center: [110.1791, 25.2345],
    shelters: [
      { name: "桂林站地下", type: "civil", level: "high", lat: 25.2833, lng: 110.2833, capacity: 6000, address: "上海路", description: "火车站人防工程" },
      { name: "中山路地下商业街", type: "underground", level: "basic", lat: 25.2833, lng: 110.2833, capacity: 3000, address: "中山路地下", description: "中山路商圈地下空间" },
      { name: "桂林北站地下", type: "civil", level: "high", lat: 25.3333, lng: 110.3167, capacity: 7000, address: "北辰路", description: "高铁站人防工程" },
      { name: "十字街地下", type: "underground", level: "basic", lat: 25.2833, lng: 110.2833, capacity: 2500, address: "解放西路", description: "十字街商圈地下空间" },
      { name: "两江国际机场", type: "bunker", level: "high", lat: 25.2167, lng: 110.0500, capacity: 8000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  三亚: {
    center: [109.5121, 18.2525],
    shelters: [
      { name: "三亚站地下", type: "civil", level: "high", lat: 18.3000, lng: 109.5000, capacity: 6000, address: "育秀路", description: "火车站人防工程" },
      { name: "解放路地下商业街", type: "underground", level: "basic", lat: 18.2500, lng: 109.5000, capacity: 3000, address: "解放路地下", description: "解放路商圈地下空间" },
      { name: "亚龙湾站地下", type: "civil", level: "medium", lat: 18.3167, lng: 109.6500, capacity: 4000, address: "吉阳镇", description: "高铁站人防工程" },
      { name: "大东海地下避难所", type: "civil", level: "medium", lat: 18.2333, lng: 109.5333, capacity: 3500, address: "榆亚路", description: "景区人防工程" },
      { name: "凤凰国际机场T2", type: "bunker", level: "high", lat: 18.3000, lng: 109.4167, capacity: 8000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  石家庄: {
    center: [114.5149, 38.0428],
    shelters: [
      { name: "石家庄站地下", type: "civil", level: "high", lat: 38.0333, lng: 114.5167, capacity: 7000, address: "京广东街", description: "高铁站人防工程" },
      { name: "中山路地下商业街", type: "underground", level: "basic", lat: 38.0500, lng: 114.5000, capacity: 3500, address: "中山路地下", description: "中山路商圈地下空间" },
      { name: "北国商城地下", type: "underground", level: "basic", lat: 38.0500, lng: 114.5167, capacity: 4000, address: "建设南大街", description: "北国商圈地下空间" },
      { name: "新百广场地铁站", type: "metro", level: "medium", lat: 38.0500, lng: 114.4833, capacity: 3000, address: "中华北大街", description: "地铁1号线/3号线站点" },
      { name: "正定国际机场T2", type: "bunker", level: "high", lat: 38.2833, lng: 114.7000, capacity: 9000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  太原: {
    center: [112.5489, 37.8706],
    shelters: [
      { name: "太原站地下", type: "civil", level: "high", lat: 37.8667, lng: 112.5667, capacity: 6000, address: "建设南路", description: "火车站人防工程" },
      { name: "柳巷地下商业街", type: "underground", level: "basic", lat: 37.8667, lng: 112.5500, capacity: 3000, address: "柳巷地下", description: "柳巷商圈地下空间" },
      { name: "太原南站地下", type: "civil", level: "high", lat: 37.8000, lng: 112.6167, capacity: 8000, address: "北营北路", description: "高铁站人防工程" },
      { name: "五一广场地铁站", type: "metro", level: "medium", lat: 37.8667, lng: 112.5667, capacity: 3000, address: "迎泽大街", description: "地铁1号线/2号线站点" },
      { name: "武宿国际机场T2", type: "bunker", level: "high", lat: 37.7500, lng: 112.6333, capacity: 9000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  济南: {
    center: [117.1205, 36.6510],
    shelters: [
      { name: "济南站地下", type: "civil", level: "high", lat: 36.6667, lng: 116.9833, capacity: 6000, address: "车站街", description: "火车站人防工程" },
      { name: "泉城路地下商业街", type: "underground", level: "basic", lat: 36.6667, lng: 117.0000, capacity: 3500, address: "泉城路地下", description: "泉城路商圈地下空间" },
      { name: "济南西站地下", type: "civil", level: "high", lat: 36.6667, lng: 116.8833, capacity: 9000, address: "威海路", description: "高铁站人防工程" },
      { name: "泉城广场地铁站", type: "metro", level: "medium", lat: 36.6667, lng: 117.0000, capacity: 3000, address: "泺源大街", description: "地铁1号线/3号线站点" },
      { name: "遥墙国际机场", type: "bunker", level: "high", lat: 36.8667, lng: 117.2167, capacity: 9000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  长春: {
    center: [125.3235, 43.8171],
    shelters: [
      { name: "长春站地下", type: "civil", level: "high", lat: 43.9000, lng: 125.3167, capacity: 7000, address: "长白路", description: "火车站人防工程" },
      { name: "重庆路地下商业街", type: "underground", level: "basic", lat: 43.9000, lng: 125.3333, capacity: 3500, address: "重庆路地下", description: "重庆路商圈地下空间" },
      { name: "长春西站地下", type: "civil", level: "high", lat: 43.8667, lng: 125.2000, capacity: 8000, address: "站前街", description: "高铁站人防工程" },
      { name: "人民广场地铁站", type: "metro", level: "medium", lat: 43.8833, lng: 125.3333, capacity: 3000, address: "人民大街", description: "地铁1号线站点" },
      { name: "龙嘉国际机场T2", type: "bunker", level: "high", lat: 44.0000, lng: 125.6833, capacity: 9000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  宁波: {
    center: [121.5502, 29.8750],
    shelters: [
      { name: "宁波站地下", type: "civil", level: "high", lat: 29.8667, lng: 121.5500, capacity: 7000, address: "南站东路", description: "火车站/高铁站人防工程" },
      { name: "天一广场地下商业街", type: "underground", level: "basic", lat: 29.8667, lng: 121.5500, capacity: 4000, address: "中山东路地下", description: "天一商圈地下空间" },
      { name: "鼓楼地下商业街", type: "underground", level: "basic", lat: 29.8667, lng: 121.5500, capacity: 3500, address: "鼓楼", description: "鼓楼商圈地下空间" },
      { name: "东门口地铁站", type: "metro", level: "medium", lat: 29.8667, lng: 121.5500, capacity: 3000, address: "中山东路", description: "地铁1号线/2号线站点" },
      { name: "栎社国际机场T2", type: "bunker", level: "high", lat: 29.8167, lng: 121.4667, capacity: 8500, address: "航空路", description: "机场重点人防工程" }
    ]
  }
};

// 兼容导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CITY_DATA };
}
