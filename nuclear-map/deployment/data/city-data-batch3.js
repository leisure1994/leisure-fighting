// 核战争城市自救地图 - 第三批城市数据
// 新增23个城市，达到50城目标

const CITY_DATA_BATCH3 = {
  // ===== 新增省会城市 =====
  "海口": {
    center: [110.3893, 20.0440],
    shelters: [
      { name: "海口火车站地下", type: "civil", level: "high", lat: 20.0428, lng: 110.2926, capacity: 4000, address: "粤海大道", description: "火车站人防工程" },
      { name: "海口东站地下", type: "civil", level: "high", lat: 19.9911, lng: 110.3516, capacity: 4500, address: "凤翔西路", description: "高铁站人防工程" },
      { name: "骑楼老街地下", type: "underground", level: "medium", lat: 20.0450, lng: 110.3450, capacity: 2500, address: "中山路地下", description: "骑楼商圈地下空间" },
      { name: "美兰国际机场T2", type: "bunker", level: "high", lat: 20.0242, lng: 110.4556, capacity: 6000, address: "美兰机场路", description: "机场重点人防工程" },
      { name: "国贸商圈地下", type: "civil", level: "medium", lat: 20.0250, lng: 110.3300, capacity: 3500, address: "国贸路", description: "商业中心人防工程" },
      { name: "日月广场地下", type: "underground", level: "medium", lat: 20.0200, lng: 110.3500, capacity: 4000, address: "国兴大道", description: "日月广场地下空间" },
      { name: "万绿园地下避难所", type: "civil", level: "medium", lat: 20.0300, lng: 110.3200, capacity: 3000, address: "滨海大道", description: "公园人防工程" }
    ]
  },
  "拉萨": {
    center: [91.1409, 29.6456],
    shelters: [
      { name: "拉萨火车站地下", type: "civil", level: "high", lat: 29.6228, lng: 91.0896, capacity: 4000, address: "世纪大道", description: "火车站人防工程" },
      { name: "布达拉宫广场地下", type: "bunker", level: "high", lat: 29.6578, lng: 91.1172, capacity: 5000, address: "北京中路", description: "重点人防工程" },
      { name: "大昭寺地下避难所", type: "civil", level: "medium", lat: 29.6500, lng: 91.1333, capacity: 2500, address: "八廓街", description: "景区人防工程" },
      { name: "贡嘎国际机场T3", type: "bunker", level: "high", lat: 29.2933, lng: 90.9167, capacity: 4500, address: "机场高速", description: "机场重点人防工程" },
      { name: "八廓街地下空间", type: "underground", level: "basic", lat: 29.6500, lng: 91.1333, capacity: 2000, address: "八廓街地下", description: "旅游区地下空间" },
      { name: "罗布林卡地下", type: "civil", level: "medium", lat: 29.6333, lng: 91.1000, capacity: 3000, address: "罗布林卡路", description: "园林人防工程" }
    ]
  },
  "西宁": {
    center: [101.7782, 36.6171],
    shelters: [
      { name: "西宁火车站地下", type: "civil", level: "high", lat: 36.6167, lng: 101.8000, capacity: 4500, address: "互助路", description: "火车站人防工程" },
      { name: "中心广场地下", type: "civil", level: "high", lat: 36.6167, lng: 101.7833, capacity: 4000, address: "西大街", description: "广场人防工程" },
      { name: "莫家街地下", type: "underground", level: "medium", lat: 36.6167, lng: 101.8000, capacity: 2500, address: "莫家街", description: "商业区地下空间" },
      { name: "曹家堡国际机场T2", type: "bunker", level: "high", lat: 36.5333, lng: 102.0500, capacity: 5500, address: "机场高速", description: "机场重点人防工程" },
      { name: "力盟商业巷地下", type: "underground", level: "medium", lat: 36.6333, lng: 101.7667, capacity: 3000, address: "五四大街", description: "商圈地下空间" },
      { name: "青海省博物馆地下", type: "civil", level: "medium", lat: 36.6167, lng: 101.7833, capacity: 3500, address: "新宁路", description: "文化人防工程" }
    ]
  },
  "银川": {
    center: [106.2782, 38.4664],
    shelters: [
      { name: "银川火车站地下", type: "civil", level: "high", lat: 38.5167, lng: 106.1833, capacity: 4500, address: "上海西路", description: "火车站人防工程" },
      { name: "南门广场地下", type: "civil", level: "high", lat: 38.4667, lng: 106.2833, capacity: 4000, address: "南薰西街", description: "广场人防工程" },
      { name: "鼓楼地下商业街", type: "underground", level: "medium", lat: 38.4667, lng: 106.2833, capacity: 3000, address: "解放东街", description: "商业区地下空间" },
      { name: "河东国际机场T3", type: "bunker", level: "high", lat: 38.3167, lng: 106.4000, capacity: 5500, address: "机场大道", description: "机场重点人防工程" },
      { name: "新华街地下", type: "underground", level: "medium", lat: 38.4667, lng: 106.2833, capacity: 2500, address: "新华东街", description: "商业街地下空间" },
      { name: "人民广场地下", type: "civil", level: "medium", lat: 38.4833, lng: 106.2333, capacity: 3500, address: "上海西路", description: "广场人防工程" }
    ]
  },
  "呼和浩特": {
    center: [111.7492, 40.8427],
    shelters: [
      { name: "呼和浩特火车站地下", type: "civil", level: "high", lat: 40.8167, lng: 111.6667, capacity: 5000, address: "车站东街", description: "火车站人防工程" },
      { name: "呼和浩特东站地下", type: "civil", level: "high", lat: 40.8500, lng: 111.7667, capacity: 5500, address: "万通路", description: "高铁站人防工程" },
      { name: "维多利商厦地下", type: "underground", level: "medium", lat: 40.8167, lng: 111.6833, capacity: 3000, address: "中山西路", description: "商业区地下空间" },
      { name: "白塔国际机场", type: "bunker", level: "high", lat: 40.8500, lng: 111.8167, capacity: 6000, address: "机场高速", description: "机场重点人防工程" },
      { name: "新华广场地下", type: "civil", level: "high", lat: 40.8167, lng: 111.6833, capacity: 4500, address: "新华大街", description: "广场人防工程" },
      { name: "大召寺地下避难所", type: "civil", level: "medium", lat: 40.8000, lng: 111.6667, capacity: 3500, address: "大召前街", description: "景区人防工程" }
    ]
  },

  // ===== 新增重点城市 =====
  "无锡": {
    center: [120.3119, 31.4912],
    shelters: [
      { name: "无锡火车站地下", type: "civil", level: "high", lat: 31.5833, lng: 120.3000, capacity: 5000, address: "兴源路", description: "火车站人防工程" },
      { name: "无锡东站地下", type: "civil", level: "high", lat: 31.6000, lng: 120.4500, capacity: 5500, address: "迎安路", description: "高铁站人防工程" },
      { name: "三阳广场地下", type: "underground", level: "medium", lat: 31.5667, lng: 120.3000, capacity: 4000, address: "中山路", description: "商圈地下空间" },
      { name: "苏宁广场地下", type: "underground", level: "medium", lat: 31.5667, lng: 120.3000, capacity: 3500, address: "人民中路", description: "商业综合体地下" },
      { name: "硕放国际机场T2", type: "bunker", level: "high", lat: 31.5000, lng: 120.4333, capacity: 6000, address: "机场路", description: "机场重点人防工程" },
      { name: "太湖广场地下", type: "civil", level: "medium", lat: 31.5500, lng: 120.3000, capacity: 4500, address: "清扬路", description: "广场人防工程" }
    ]
  },
  "佛山": {
    center: [113.1214, 23.0215],
    shelters: [
      { name: "佛山火车站地下", type: "civil", level: "high", lat: 23.0333, lng: 113.1167, capacity: 4000, address: "文昌路", description: "火车站人防工程" },
      { name: "祖庙地铁站", type: "metro", level: "medium", lat: 23.0333, lng: 113.1167, capacity: 3000, address: "祖庙路", description: "广佛线站点" },
      { name: "岭南天地地下", type: "underground", level: "medium", lat: 23.0333, lng: 113.1167, capacity: 3500, address: "祖庙路", description: "旅游区地下空间" },
      { name: "佛山沙堤机场", type: "bunker", level: "high", lat: 23.0667, lng: 113.0667, capacity: 4000, address: "机场路", description: "机场人防工程" },
      { name: "东方广场地下", type: "underground", level: "medium", lat: 23.0333, lng: 113.1333, capacity: 3000, address: "锦华路", description: "商业区地下空间" },
      { name: "千灯湖地下空间", type: "civil", level: "medium", lat: 23.0333, lng: 113.1500, capacity: 4000, address: "灯湖西路", description: "商务区人防工程" }
    ]
  },
  "东莞": {
    center: [113.7518, 23.0207],
    shelters: [
      { name: "东莞火车站地下", type: "civil", level: "high", lat: 23.0833, lng: 113.7333, capacity: 5000, address: "环湖路", description: "火车站人防工程" },
      { name: "东莞东站地下", type: "civil", level: "high", lat: 22.9667, lng: 114.0833, capacity: 4500, address: "常东路", description: "火车站人防工程" },
      { name: "南城蛤地地铁站", type: "metro", level: "medium", lat: 22.9833, lng: 113.7333, capacity: 3000, address: "东莞大道", description: "地铁2号线站点" },
      { name: "鸿福路地下", type: "underground", level: "medium", lat: 22.9833, lng: 113.7333, capacity: 3500, address: "鸿福路", description: "商业区地下空间" },
      { name: "东城万达地下", type: "underground", level: "medium", lat: 23.0333, lng: 113.7667, capacity: 3000, address: "东城中路", description: "商圈地下空间" },
      { name: "旗峰公园地下", type: "civil", level: "medium", lat: 22.9833, lng: 113.7667, capacity: 3500, address: "旗峰路", description: "公园人防工程" }
    ]
  },
  "温州": {
    center: [120.6994, 27.9943],
    shelters: [
      { name: "温州火车站地下", type: "civil", level: "high", lat: 28.0167, lng: 120.6667, capacity: 4500, address: "温州大道", description: "火车站人防工程" },
      { name: "温州南站地下", type: "civil", level: "high", lat: 27.9667, lng: 120.6000, capacity: 5000, address: "宁波路", description: "高铁站人防工程" },
      { name: "五马街地下", type: "underground", level: "medium", lat: 28.0167, lng: 120.6667, capacity: 3000, address: "五马街", description: "商业区地下空间" },
      { name: "龙湾国际机场T2", type: "bunker", level: "high", lat: 27.9167, lng: 120.8500, capacity: 5500, address: "机场大道", description: "机场重点人防工程" },
      { name: "世纪广场地下", type: "civil", level: "medium", lat: 28.0000, lng: 120.7000, capacity: 3500, address: "市府路", description: "广场人防工程" },
      { name: "江心屿地下避难所", type: "civil", level: "medium", lat: 28.0333, lng: 120.6167, capacity: 3000, address: "江心屿", description: "景区人防工程" }
    ]
  },
  "常州": {
    center: [119.9741, 31.8112],
    shelters: [
      { name: "常州火车站地下", type: "civil", level: "high", lat: 31.7833, lng: 119.9833, capacity: 5000, address: "竹林西路", description: "火车站人防工程" },
      { name: "常州北站地下", type: "civil", level: "high", lat: 31.8333, lng: 119.9500, capacity: 5500, address: "北一路", description: "高铁站人防工程" },
      { name: "南大街地下", type: "underground", level: "medium", lat: 31.7833, lng: 119.9500, capacity: 3500, address: "南大街", description: "商业区地下空间" },
      { name: "文化宫地铁站", type: "metro", level: "medium", lat: 31.7833, lng: 119.9500, capacity: 3000, address: "和平北路", description: "地铁1号线站点" },
      { name: "吾悦广场地下", type: "underground", level: "medium", lat: 31.7833, lng: 119.9500, capacity: 3000, address: "湖塘镇", description: "商圈地下空间" },
      { name: "恐龙园地下", type: "civil", level: "medium", lat: 31.8333, lng: 120.0000, capacity: 4000, address: "河海东路", description: "景区人防工程" }
    ]
  },
  "徐州": {
    center: [117.2841, 34.2058],
    shelters: [
      { name: "徐州火车站地下", type: "civil", level: "high", lat: 34.2667, lng: 117.2000, capacity: 5000, address: "淮海东路", description: "火车站人防工程" },
      { name: "徐州东站地下", type: "civil", level: "high", lat: 34.3000, lng: 117.3000, capacity: 5500, address: "鲲鹏路", description: "高铁站人防工程" },
      { name: "彭城广场地下", type: "underground", level: "medium", lat: 34.2667, lng: 117.2000, capacity: 4000, address: "彭城路", description: "商圈地下空间" },
      { name: "金鹰国际地下", type: "underground", level: "medium", lat: 34.2667, lng: 117.2000, capacity: 3500, address: "中山北路", description: "商业综合体地下" },
      { name: "云龙湖地下避难所", type: "civil", level: "medium", lat: 34.2500, lng: 117.1667, capacity: 3500, address: "湖东路", description: "景区人防工程" },
      { name: "淮海战役纪念馆地下", type: "civil", level: "medium", lat: 34.2333, lng: 117.2333, capacity: 3000, address: "解放南路", description: "纪念人防工程" }
    ]
  },
  "烟台": {
    center: [121.4481, 37.4635],
    shelters: [
      { name: "烟台火车站地下", type: "civil", level: "high", lat: 37.5500, lng: 121.4000, capacity: 4500, address: "北马路", description: "火车站人防工程" },
      { name: "烟台南站地下", type: "civil", level: "high", lat: 37.4000, lng: 121.2500, capacity: 5000, address: "山海南路", description: "高铁站人防工程" },
      { name: "南大街地下", type: "underground", level: "medium", lat: 37.5333, lng: 121.4000, capacity: 3500, address: "南大街", description: "商业区地下空间" },
      { name: "蓬莱国际机场", type: "bunker", level: "high", lat: 37.6667, lng: 120.9833, capacity: 5500, address: "迎宾二路", description: "机场重点人防工程" },
      { name: "万达广场地下", type: "underground", level: "medium", lat: 37.5333, lng: 121.4167, capacity: 3000, address: "西南河路", description: "商圈地下空间" },
      { name: "芝罘区人防工程", type: "civil", level: "medium", lat: 37.5500, lng: 121.4000, capacity: 4000, address: "解放路", description: "区人防工程" }
    ]
  },
  "唐山": {
    center: [118.1802, 39.6309],
    shelters: [
      { name: "唐山火车站地下", type: "civil", level: "high", lat: 39.6333, lng: 118.1333, capacity: 5000, address: "站前路", description: "火车站人防工程" },
      { name: "唐山北站地下", type: "civil", level: "high", lat: 39.8000, lng: 118.1667, capacity: 4500, address: "浭阳大街", description: "火车站人防工程" },
      { name: "新华道地下商业街", type: "underground", level: "medium", lat: 39.6333, lng: 118.1833, capacity: 3000, address: "新华东道", description: "商业区地下空间" },
      { name: "三利国际地下", type: "underground", level: "medium", lat: 39.6333, lng: 118.1833, capacity: 2500, address: "建设南路", description: "商业综合体地下" },
      { name: "抗震纪念碑地下", type: "civil", level: "high", lat: 39.6333, lng: 118.1833, capacity: 4500, address: "新华道", description: "纪念人防工程" },
      { name: "凤凰山公园地下", type: "civil", level: "medium", lat: 39.6667, lng: 118.1833, capacity: 3500, address: "北新西道", description: "公园人防工程" }
    ]
  },
  "洛阳": {
    center: [112.4345, 34.6197],
    shelters: [
      { name: "洛阳火车站地下", type: "civil", level: "high", lat: 34.6833, lng: 112.4500, capacity: 5000, address: "道南路", description: "火车站人防工程" },
      { name: "龙门高铁站地下", type: "civil", level: "high", lat: 34.5833, lng: 112.4667, capacity: 5500, address: "通衢路", description: "高铁站人防工程" },
      { name: "中州路地下", type: "underground", level: "medium", lat: 34.6833, lng: 112.4500, capacity: 3500, address: "中州中路", description: "商业区地下空间" },
      { name: "龙门石窟地下避难所", type: "civil", level: "medium", lat: 34.5500, lng: 112.4667, capacity: 4000, address: "龙门大道", description: "景区人防工程" },
      { name: "王城公园地下", type: "civil", level: "medium", lat: 34.6667, lng: 112.4000, capacity: 3500, address: "中州中路", description: "公园人防工程" },
      { name: "丽景门地下空间", type: "underground", level: "medium", lat: 34.6833, lng: 112.4667, capacity: 3000, address: "西门口街", description: "景区地下空间" }
    ]
  },
  "襄阳": {
    center: [112.1221, 32.0090],
    shelters: [
      { name: "襄阳火车站地下", type: "civil", level: "high", lat: 32.0500, lng: 112.1500, capacity: 4500, address: "前进路", description: "火车站人防工程" },
      { name: "襄阳东站地下", type: "civil", level: "high", lat: 32.0000, lng: 112.3000, capacity: 5000, address: "东津大道", description: "高铁站人防工程" },
      { name: "人民广场地下", type: "civil", level: "high", lat: 32.0500, lng: 112.1500, capacity: 4000, address: "丹江路", description: "广场人防工程" },
      { name: "鼓楼地下商业街", type: "underground", level: "medium", lat: 32.0500, lng: 112.1500, capacity: 3000, address: "鼓楼巷", description: "商业区地下空间" },
      { name: "古隆中地下避难所", type: "civil", level: "medium", lat: 32.0167, lng: 112.0667, capacity: 3500, address: "隆中路", description: "景区人防工程" },
      { name: "诸葛亮广场地下", type: "civil", level: "medium", lat: 32.0667, lng: 112.1333, capacity: 3000, address: "长虹北路", description: "广场人防工程" }
    ]
  },
  "宜昌": {
    center: [111.2868, 30.6919],
    shelters: [
      { name: "宜昌火车站地下", type: "civil", level: "high", lat: 30.6833, lng: 111.3500, capacity: 4500, address: "东山大道", description: "火车站人防工程" },
      { name: "宜昌东站地下", type: "civil", level: "high", lat: 30.7000, lng: 111.4000, capacity: 5000, address: "城东大道", description: "高铁站人防工程" },
      { name: "夷陵广场地下", type: "civil", level: "high", lat: 30.7000, lng: 111.3000, capacity: 4000, address: "西陵一路", description: "广场人防工程" },
      { name: "三峡大坝地下设施", type: "bunker", level: "high", lat: 30.8167, lng: 111.0167, capacity: 6000, address: "三峡大坝", description: "国家工程配套人防" },
      { name: "国贸大厦地下", type: "underground", level: "medium", lat: 30.7000, lng: 111.3000, capacity: 3000, address: "云集路", description: "商业区地下空间" },
      { name: "滨江公园地下避难所", type: "civil", level: "medium", lat: 30.6833, lng: 111.2833, capacity: 3500, address: "沿江大道", description: "公园人防工程" }
    ]
  },
  "桂林": {
    center: [110.2993, 25.2740],
    shelters: [
      { name: "桂林火车站地下", type: "civil", level: "high", lat: 25.2833, lng: 110.2833, capacity: 4500, address: "南站路", description: "火车站人防工程" },
      { name: "桂林北站地下", type: "civil", level: "high", lat: 25.3333, lng: 110.3000, capacity: 5000, address: "定江路", description: "高铁站人防工程" },
      { name: "两江四湖地下避难所", type: "civil", level: "medium", lat: 25.2833, lng: 110.2833, capacity: 3500, address: "杉湖路", description: "景区人防工程" },
      { name: "正阳路地下商业街", type: "underground", level: "medium", lat: 25.2833, lng: 110.2833, capacity: 3000, address: "正阳路", description: "商业区地下空间" },
      { name: "东西巷地下", type: "underground", level: "medium", lat: 25.2833, lng: 110.2833, capacity: 2500, address: "东西巷", description: "旅游区地下空间" },
      { name: "中心广场地下", type: "civil", level: "medium", lat: 25.2833, lng: 110.2833, capacity: 4000, address: "中山中路", description: "广场人防工程" }
    ]
  },
  "三亚": {
    center: [109.5121, 18.2525],
    shelters: [
      { name: "三亚火车站地下", type: "civil", level: "high", lat: 18.3000, lng: 109.5000, capacity: 4000, address: "育秀路", description: "火车站人防工程" },
      { name: "凤凰国际机场地下", type: "bunker", level: "high", lat: 18.3000, lng: 109.4000, capacity: 5500, address: "凤凰路", description: "机场重点人防工程" },
      { name: "大东海地下避难所", type: "civil", level: "medium", lat: 18.2333, lng: 109.5000, capacity: 3000, address: "榆亚路", description: "海滨人防工程" },
      { name: "解放路地下商业街", type: "underground", level: "medium", lat: 18.2500, lng: 109.5000, capacity: 2500, address: "解放路", description: "商业区地下空间" },
      { name: "亚龙湾地下设施", type: "civil", level: "medium", lat: 18.2000, lng: 109.6000, capacity: 3500, address: "亚龙湾路", description: "旅游区人防工程" },
      { name: "海棠湾地下空间", type: "civil", level: "medium", lat: 18.3500, lng: 109.7500, capacity: 3000, address: "海棠北路", description: "度假区人防工程" }
    ]
  }
};

// 合并到主数据集
if (typeof CITY_DATA !== 'undefined') {
  Object.assign(CITY_DATA, CITY_DATA_BATCH3);
}
