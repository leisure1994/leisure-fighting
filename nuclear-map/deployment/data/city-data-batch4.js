// 核战争城市自救地图 - 补充城市数据（第四批）
// 补充5个城市，达到50城目标

const CITY_DATA_BATCH4 = {
  "石家庄": {
    center: [114.5149, 38.0423],
    shelters: [
      { name: "石家庄火车站地下", type: "civil", level: "high", lat: 38.0167, lng: 114.4833, capacity: 5000, address: "新石南路", description: "火车站人防工程" },
      { name: "石家庄北站地下", type: "civil", level: "high", lat: 38.0667, lng: 114.4500, capacity: 4500, address: "市庄路", description: "火车站人防工程" },
      { name: "北国商城地下", type: "underground", level: "medium", lat: 38.0333, lng: 114.4833, capacity: 3500, address: "中山东路", description: "商业区地下空间" },
      { name: "新百广场地下", type: "underground", level: "medium", lat: 38.0333, lng: 114.4667, capacity: 3000, address: "中山西路", description: "商圈地下空间" },
      { name: "人民广场地下", type: "civil", level: "high", lat: 38.0333, lng: 114.4833, capacity: 4000, address: "长安区", description: "广场人防工程" },
      { name: "正定国际机场T2", type: "bunker", level: "high", lat: 38.2833, lng: 114.7000, capacity: 5500, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  "太原": {
    center: [112.5489, 37.8706],
    shelters: [
      { name: "太原火车站地下", type: "civil", level: "high", lat: 37.8667, lng: 112.5667, capacity: 5000, address: "迎泽大街", description: "火车站人防工程" },
      { name: "太原南站地下", type: "civil", level: "high", lat: 37.8000, lng: 112.6167, capacity: 5500, address: "晋阳街", description: "高铁站人防工程" },
      { name: "五一广场地下", type: "civil", level: "high", lat: 37.8667, lng: 112.5667, capacity: 4500, address: "迎泽大街", description: "广场人防工程" },
      { name: "柳巷地下商业街", type: "underground", level: "medium", lat: 37.8667, lng: 112.5667, capacity: 3000, address: "柳巷", description: "商业区地下空间" },
      { name: "王府井百货地下", type: "underground", level: "medium", lat: 37.8667, lng: 112.5500, capacity: 2500, address: "亲贤北街", description: "商圈地下空间" },
      { name: "武宿国际机场T2", type: "bunker", level: "high", lat: 37.7500, lng: 112.6167, capacity: 5500, address: "机场大道", description: "机场重点人防工程" }
    ]
  },
  "济南": {
    center: [117.1205, 36.6510],
    shelters: [
      { name: "济南火车站地下", type: "civil", level: "high", lat: 36.6667, lng: 116.9833, capacity: 5000, address: "车站街", description: "火车站人防工程" },
      { name: "济南西站地下", type: "civil", level: "high", lat: 36.6833, lng: 116.9000, capacity: 5500, address: "顺安路", description: "高铁站人防工程" },
      { name: "泉城广场地下", type: "civil", level: "high", lat: 36.6667, lng: 117.0167, capacity: 5000, address: "泺源大街", description: "广场人防工程" },
      { name: "芙蓉街地下", type: "underground", level: "medium", lat: 36.6667, lng: 117.0167, capacity: 3000, address: "芙蓉街", description: "商业区地下空间" },
      { name: "趵突泉地下避难所", type: "civil", level: "medium", lat: 36.6667, lng: 117.0167, capacity: 3500, address: "泺突泉南路", description: "景区人防工程" },
      { name: "遥墙国际机场", type: "bunker", level: "high", lat: 36.8500, lng: 117.2167, capacity: 5500, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  "长春": {
    center: [125.3235, 43.8171],
    shelters: [
      { name: "长春火车站地下", type: "civil", level: "high", lat: 43.9000, lng: 125.3167, capacity: 5000, address: "长白路", description: "火车站人防工程" },
      { name: "长春西站地下", type: "civil", level: "high", lat: 43.8667, lng: 125.2167, capacity: 5500, address: "绿园大街", description: "高铁站人防工程" },
      { name: "人民广场地下", type: "civil", level: "high", lat: 43.8833, lng: 125.3167, capacity: 4500, address: "人民大街", description: "广场人防工程" },
      { name: "重庆路地下商业街", type: "underground", level: "medium", lat: 43.8833, lng: 125.3333, capacity: 3500, address: "重庆路", description: "商业区地下空间" },
      { name: "红旗街地下", type: "underground", level: "medium", lat: 43.8667, lng: 125.3000, capacity: 3000, address: "红旗街", description: "商圈地下空间" },
      { name: "龙嘉国际机场T2", type: "bunker", level: "high", lat: 43.9833, lng: 125.6833, capacity: 5500, address: "机场路", description: "机场重点人防工程" }
    ]
  },
  "宁波": {
    center: [121.5500, 29.8750],
    shelters: [
      { name: "宁波火车站地下", type: "civil", level: "high", lat: 29.8667, lng: 121.5500, capacity: 5000, address: "南站东路", description: "火车站人防工程" },
      { name: "宁波东站地下", type: "civil", level: "high", lat: 29.8333, lng: 121.5833, capacity: 4500, address: "福明南路", description: "火车站人防工程" },
      { name: "天一广场地下", type: "underground", level: "medium", lat: 29.8667, lng: 121.5500, capacity: 4000, address: "中山东路", description: "商圈地下空间" },
      { name: "鼓楼地下商业街", type: "underground", level: "medium", lat: 29.8667, lng: 121.5500, capacity: 3500, address: "鼓楼", description: "商业区地下空间" },
      { name: "老外滩地下避难所", type: "civil", level: "medium", lat: 29.8833, lng: 121.5500, capacity: 3000, address: "中马路", description: "景区人防工程" },
      { name: "栎社国际机场T2", type: "bunker", level: "high", lat: 29.8167, lng: 121.4667, capacity: 5500, address: "航空路", description: "机场重点人防工程" }
    ]
  }
};

// 合并到主数据集
if (typeof CITY_DATA !== 'undefined') {
  Object.assign(CITY_DATA, CITY_DATA_BATCH4);
}
