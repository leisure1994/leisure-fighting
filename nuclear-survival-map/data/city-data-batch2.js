// 核战争城市自救地图 - 扩展城市数据
// 第二批城市数据

const CITY_DATA_BATCH2 = {
  "天津": {
    center: [117.2009, 39.0842],
    shelters: [
      { name: "天津站地下", type: "civil", level: "high", lat: 39.1340, lng: 117.2108, capacity: 6000, address: "建国道", description: "火车站人防工程" },
      { name: "天津西站地下", type: "civil", level: "high", lat: 39.1585, lng: 117.1634, capacity: 5500, address: "西站前街", description: "高铁站人防工程" },
      { name: "滨江道地下商业街", type: "underground", level: "basic", lat: 39.1178, lng: 117.1954, capacity: 3000, address: "滨江道地下", description: "滨江道商圈地下空间" },
      { name: "和平路地铁站", type: "metro", level: "medium", lat: 39.1173, lng: 117.1893, capacity: 2800, address: "和平路", description: "地铁3号线站点" },
      { name: "滨海国际机场T2", type: "bunker", level: "high", lat: 39.1226, lng: 117.3520, capacity: 7000, address: "机场大道", description: "机场重点人防工程" },
      { name: "小白楼地铁站", type: "metro", level: "medium", lat: 39.1126, lng: 117.2134, capacity: 3200, address: "南京路", description: "地铁1号线站点" },
      { name: "津湾广场地下", type: "civil", level: "high", lat: 39.1312, lng: 117.2056, capacity: 4500, address: "解放北路", description: "津湾广场人防工程" },
      { name: "文化中心地下", type: "underground", level: "medium", lat: 39.0901, lng: 117.2156, capacity: 4000, address: "友谊路", description: "文化中心地下空间" },
      { name: "南开大学地下", type: "civil", level: "medium", lat: 39.1023, lng: 117.1728, capacity: 5000, address: "卫津路", description: "高校人防工程" },
      { name: "天津医科大学地下", type: "civil", level: "medium", lat: 39.1008, lng: 117.1856, capacity: 3500, address: "气象台路", description: "医疗人防工程" }
    ]
  },
  "青岛": {
    center: [120.3826, 36.0671],
    shelters: [
      { name: "青岛站地下", type: "civil", level: "high", lat: 36.0596, lng: 120.3087, capacity: 5000, address: "泰安路", description: "火车站人防工程" },
      { name: "青岛北站地下", type: "civil", level: "high", lat: 36.1716, lng: 120.3847, capacity: 6000, address: "静乐路", description: "高铁站人防工程" },
      { name: "五四广场地下", type: "civil", level: "high", lat: 36.0601, lng: 120.3840, capacity: 4500, address: "香港中路", description: "市中心人防工程" },
      { name: "台东地铁站", type: "metro", level: "medium", lat: 36.0834, lng: 120.3559, capacity: 3000, address: "台东一路", description: "地铁2号线站点" },
      { name: "流亭国际机场", type: "bunker", level: "high", lat: 36.2669, lng: 120.3816, capacity: 6000, address: "民航路", description: "机场重点人防工程" },
      { name: "崂山风景区地下", type: "civil", level: "medium", lat: 36.1978, lng: 120.6256, capacity: 3500, address: "崂山路", description: "旅游区人防工程" }
    ]
  },
  "大连": {
    center: [121.6147, 38.9140],
    shelters: [
      { name: "大连站地下", type: "civil", level: "high", lat: 38.9225, lng: 121.6204, capacity: 5500, address: "长江路", description: "火车站人防工程" },
      { name: "大连北站地下", type: "civil", level: "high", lat: 39.0089, lng: 121.6090, capacity: 6000, address: "华北路", description: "高铁站人防工程" },
      { name: "青泥洼桥地下", type: "underground", level: "medium", lat: 38.9189, lng: 121.6285, capacity: 4000, address: "中山路", description: "商业中心地下空间" },
      { name: "星海广场地下", type: "civil", level: "high", lat: 38.9037, lng: 121.6808, capacity: 5000, address: "星海广场", description: "广场人防工程" },
      { name: "周水子国际机场", type: "bunker", level: "high", lat: 38.9656, lng: 121.5392, capacity: 6500, address: "迎客路", description: "机场重点人防工程" }
    ]
  },
  "厦门": {
    center: [118.0894, 24.4798],
    shelters: [
      { name: "厦门站地下", type: "civil", level: "high", lat: 24.4694, lng: 118.1140, capacity: 5000, address: "厦禾路", description: "火车站人防工程" },
      { name: "厦门北站地下", type: "civil", level: "high", lat: 24.6389, lng: 118.0723, capacity: 6000, address: "珩圣路", description: "高铁站人防工程" },
      { name: "中山路地下", type: "underground", level: "medium", lat: 24.4623, lng: 118.0823, capacity: 3500, address: "中山路", description: "商业区地下空间" },
      { name: "鼓浪屿轮渡地下", type: "civil", level: "medium", lat: 24.4628, lng: 118.0689, capacity: 3000, address: "东渡路", description: "码头人防工程" },
      { name: "高崎国际机场T4", type: "bunker", level: "high", lat: 24.5350, lng: 118.1326, capacity: 6000, address: "翔云一路", description: "机场重点人防工程" },
      { name: "厦门大学地下", type: "civil", level: "medium", lat: 24.4393, lng: 118.0983, capacity: 4000, address: "思明南路", description: "高校人防工程" }
    ]
  },
  "苏州": {
    center: [120.5853, 31.2989],
    shelters: [
      { name: "苏州站地下", type: "civil", level: "high", lat: 31.3308, lng: 120.6083, capacity: 5500, address: "苏站路", description: "火车站人防工程" },
      { name: "苏州北站地下", type: "civil", level: "high", lat: 31.4238, lng: 120.6398, capacity: 6000, address: "南天成路", description: "高铁站人防工程" },
      { name: "观前街地下", type: "underground", level: "medium", lat: 31.3108, lng: 120.6267, capacity: 3500, address: "观前街", description: "商业区地下空间" },
      { name: "园区星海广场", type: "civil", level: "medium", lat: 31.3167, lng: 120.7286, capacity: 4000, address: "星海街", description: "园区人防工程" },
      { name: "木渎古镇地下", type: "civil", level: "basic", lat: 31.2586, lng: 120.5125, capacity: 2500, address: "木渎镇", description: "旅游区人防工程" }
    ]
  },
  "长沙": {
    center: [112.9388, 28.2282],
    shelters: [
      { name: "长沙站地下", type: "civil", level: "high", lat: 28.1925, lng: 113.0089, capacity: 5000, address: "车站中路", description: "火车站人防工程" },
      { name: "长沙南站地下", type: "civil", level: "high", lat: 28.1503, lng: 113.0578, capacity: 6500, address: "花侯路", description: "高铁站人防工程" },
      { name: "五一广场地下", type: "underground", level: "medium", lat: 28.1945, lng: 112.9783, capacity: 4500, address: "五一大道", description: "商业区地下空间" },
      { name: "橘子洲地下", type: "civil", level: "medium", lat: 28.1714, lng: 112.9576, capacity: 4000, address: "橘子洲头", description: "景区人防工程" },
      { name: "黄花国际机场T2", type: "bunker", level: "high", lat: 28.1892, lng: 113.2197, capacity: 7000, address: "机场大道", description: "机场重点人防工程" },
      { name: "岳麓山地下", type: "civil", level: "medium", lat: 28.1823, lng: 112.9345, capacity: 3500, address: "岳麓山", description: "山区人防工程" }
    ]
  },
  "郑州": {
    center: [113.6253, 34.7466],
    shelters: [
      { name: "郑州站地下", type: "civil", level: "high", lat: 34.7483, lng: 113.6583, capacity: 5500, address: "二马路", description: "火车站人防工程" },
      { name: "郑州东站地下", type: "civil", level: "high", lat: 34.7578, lng: 113.7678, capacity: 7000, address: "心怡路", description: "高铁站人防工程" },
      { name: "二七广场地下", type: "underground", level: "medium", lat: 34.7523, lng: 113.6656, capacity: 4000, address: "二七路", description: "商业区地下空间" },
      { name: "紫荆山地铁站", type: "metro", level: "medium", lat: 34.7645, lng: 113.6789, capacity: 3500, address: "紫荆山路", description: "地铁1号线/2号线换乘站" },
      { name: "新郑国际机场T2", type: "bunker", level: "high", lat: 34.5197, lng: 113.8408, capacity: 7500, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "沈阳": {
    center: [123.4315, 41.8057],
    shelters: [
      { name: "沈阳站地下", type: "civil", level: "high", lat: 41.7933, lng: 123.3833, capacity: 5500, address: "胜利南街", description: "火车站人防工程" },
      { name: "沈阳北站地下", type: "civil", level: "high", lat: 41.8167, lng: 123.4333, capacity: 6000, address: "北站路", description: "高铁站人防工程" },
      { name: "中街地下", type: "underground", level: "medium", lat: 41.8000, lng: 123.4167, capacity: 4000, address: "中街路", description: "商业区地下空间" },
      { name: "太原街地下", type: "underground", level: "medium", lat: 41.7833, lng: 123.4000, capacity: 3500, address: "太原南街", description: "商业区地下空间" },
      { name: "桃仙国际机场T3", type: "bunker", level: "high", lat: 41.6333, lng: 123.4833, capacity: 7000, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  "哈尔滨": {
    center: [126.5340, 45.8038],
    shelters: [
      { name: "哈尔滨站地下", type: "civil", level: "high", lat: 45.7667, lng: 126.6333, capacity: 5500, address: "铁路街", description: "火车站人防工程" },
      { name: "哈尔滨西站地下", type: "civil", level: "high", lat: 45.7167, lng: 126.5667, capacity: 6000, address: "哈尔滨大街", description: "高铁站人防工程" },
      { name: "中央大街地下", type: "underground", level: "medium", lat: 45.7833, lng: 126.6167, capacity: 3500, address: "中央大街", description: "旅游区地下空间" },
      { name: "索菲亚广场地下", type: "civil", level: "medium", lat: 45.7667, lng: 126.6167, capacity: 3000, address: "透笼街", description: "广场人防工程" },
      { name: "太平国际机场T2", type: "bunker", level: "high", lat: 45.6167, lng: 126.2500, capacity: 6500, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "昆明": {
    center: [102.8329, 24.8801],
    shelters: [
      { name: "昆明站地下", type: "civil", level: "high", lat: 25.0167, lng: 102.7167, capacity: 5000, address: "北京路", description: "火车站人防工程" },
      { name: "昆明南站地下", type: "civil", level: "high", lat: 24.8667, lng: 102.8667, capacity: 6000, address: "祥园街", description: "高铁站人防工程" },
      { name: "翠湖地下", type: "civil", level: "medium", lat: 25.0500, lng: 102.7000, capacity: 3500, address: "翠湖南路", description: "公园人防工程" },
      { name: "南屏街地下", type: "underground", level: "medium", lat: 25.0333, lng: 102.7167, capacity: 3000, address: "南屏街", description: "商业区地下空间" },
      { name: "长水国际机场", type: "bunker", level: "high", lat: 25.1000, lng: 102.9333, capacity: 7000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "合肥": {
    center: [117.2272, 31.8206],
    shelters: [
      { name: "合肥站地下", type: "civil", level: "high", lat: 31.8833, lng: 117.3167, capacity: 5000, address: "站前路", description: "火车站人防工程" },
      { name: "合肥南站地下", type: "civil", level: "high", lat: 31.8000, lng: 117.3000, capacity: 6000, address: "龙川路", description: "高铁站人防工程" },
      { name: "四牌楼地下", type: "underground", level: "medium", lat: 31.8667, lng: 117.2833, capacity: 3500, address: "长江中路", description: "商业区地下空间" },
      { name: "天鹅湖地下", type: "civil", level: "medium", lat: 31.8167, lng: 117.2333, capacity: 4000, address: "天鹅湖路", description: "政务区人防工程" },
      { name: "新桥国际机场", type: "bunker", level: "high", lat: 31.9833, lng: 116.9833, capacity: 6500, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "南昌": {
    center: [115.8540, 28.6820],
    shelters: [
      { name: "南昌站地下", type: "civil", level: "high", lat: 28.6667, lng: 115.8833, capacity: 5000, address: "二七南路", description: "火车站人防工程" },
      { name: "南昌西站地下", type: "civil", level: "high", lat: 28.6333, lng: 115.7833, capacity: 6000, address: "龙兴大街", description: "高铁站人防工程" },
      { name: "八一广场地下", type: "civil", level: "high", lat: 28.6833, lng: 115.8833, capacity: 5000, address: "八一大道", description: "广场人防工程" },
      { name: "中山路地下", type: "underground", level: "medium", lat: 28.6833, lng: 115.8833, capacity: 3500, address: "中山路", description: "商业区地下空间" },
      { name: "昌北国际机场T2", type: "bunker", level: "high", lat: 28.8667, lng: 115.9000, capacity: 6000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "贵阳": {
    center: [106.6302, 26.6477],
    shelters: [
      { name: "贵阳站地下", type: "civil", level: "high", lat: 26.5667, lng: 106.7000, capacity: 4500, address: "遵义路", description: "火车站人防工程" },
      { name: "贵阳北站地下", type: "civil", level: "high", lat: 26.6167, lng: 106.6833, capacity: 5500, address: "北站路", description: "高铁站人防工程" },
      { name: "喷水池地下", type: "underground", level: "medium", lat: 26.5833, lng: 106.7167, capacity: 3000, address: "中华北路", description: "商业区地下空间" },
      { name: "甲秀楼地下", type: "civil", level: "medium", lat: 26.5667, lng: 106.7167, capacity: 2500, address: "南明路", description: "景区人防工程" },
      { name: "龙洞堡国际机场T2", type: "bunker", level: "high", lat: 26.5333, lng: 106.8000, capacity: 6000, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "福州": {
    center: [119.2965, 26.0745],
    shelters: [
      { name: "福州站地下", type: "civil", level: "high", lat: 26.1167, lng: 119.3167, capacity: 5000, address: "华林路", description: "火车站人防工程" },
      { name: "福州南站地下", type: "civil", level: "high", lat: 26.0500, lng: 119.3833, capacity: 5500, address: "胪雷路", description: "高铁站人防工程" },
      { name: "东街口地下", type: "underground", level: "medium", lat: 26.0833, lng: 119.3000, capacity: 3500, address: "八一七北路", description: "商业区地下空间" },
      { name: "三坊七巷地下", type: "civil", level: "medium", lat: 26.0833, lng: 119.3000, capacity: 3000, address: "杨桥东路", description: "旅游区人防工程" },
      { name: "长乐国际机场", type: "bunker", level: "high", lat: 25.9333, lng: 119.6667, capacity: 6000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "南宁": {
    center: [108.3661, 22.8172],
    shelters: [
      { name: "南宁站地下", type: "civil", level: "high", lat: 22.8167, lng: 108.3167, capacity: 5000, address: "中华路", description: "火车站人防工程" },
      { name: "南宁东站地下", type: "civil", level: "high", lat: 22.7833, lng: 108.3833, capacity: 6000, address: "凤岭北路", description: "高铁站人防工程" },
      { name: "朝阳广场地下", type: "underground", level: "medium", lat: 22.8167, lng: 108.3667, capacity: 4000, address: "朝阳路", description: "商业区地下空间" },
      { name: "青秀山地下", type: "civil", level: "medium", lat: 22.7833, lng: 108.4000, capacity: 3500, address: "青秀山路", description: "景区人防工程" },
      { name: "吴圩国际机场T2", type: "bunker", level: "high", lat: 22.6167, lng: 108.1667, capacity: 6500, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "兰州": {
    center: [103.8343, 36.0611],
    shelters: [
      { name: "兰州站地下", type: "civil", level: "high", lat: 36.0333, lng: 103.8333, capacity: 4500, address: "火车站东路", description: "火车站人防工程" },
      { name: "兰州西站地下", type: "civil", level: "high", lat: 36.0667, lng: 103.7667, capacity: 5500, address: "西津西路", description: "高铁站人防工程" },
      { name: "西关十字地下", type: "underground", level: "medium", lat: 36.0500, lng: 103.8333, capacity: 3000, address: "张掖路", description: "商业区地下空间" },
      { name: "东方红广场地下", type: "civil", level: "medium", lat: 36.0500, lng: 103.8500, capacity: 4000, address: "庆阳路", description: "广场人防工程" },
      { name: "中川国际机场T2", type: "bunker", level: "high", lat: 36.5000, lng: 103.6167, capacity: 6000, address: "机场高速", description: "机场重点人防工程" }
    ]
  },
  "乌鲁木齐": {
    center: [87.6168, 43.8256],
    shelters: [
      { name: "乌鲁木齐站地下", type: "civil", level: "high", lat: 43.7833, lng: 87.6000, capacity: 5500, address: "高铁北一路", description: "火车站人防工程" },
      { name: "南站地下", type: "civil", level: "high", lat: 43.7833, lng: 87.6000, capacity: 5000, address: "南站路", description: "火车站人防工程" },
      { name: "友好商圈地下", type: "underground", level: "medium", lat: 43.8333, lng: 87.6000, capacity: 3500, address: "友好北路", description: "商业区地下空间" },
      { name: "大巴扎地下", type: "civil", level: "medium", lat: 43.7667, lng: 87.6167, capacity: 3000, address: "解放南路", description: "旅游区人防工程" },
      { name: "地窝堡国际机场T3", type: "bunker", level: "high", lat: 43.9000, lng: 87.4667, capacity: 6500, address: "机场高速", description: "机场重点人防工程" }
    ]
  }
};

// 合并到主数据集
if (typeof CITY_DATA !== 'undefined') {
  Object.assign(CITY_DATA, CITY_DATA_BATCH2);
}
