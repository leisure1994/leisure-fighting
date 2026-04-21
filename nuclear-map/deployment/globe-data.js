// 核战争城市自救地球仪 - 3D数据
// 转换自2D地图数据

const GLOBE_CITIES = [
  { name: '北京', lat: 39.9042, lng: 116.4074, shelters: 8 },
  { name: '上海', lat: 31.2304, lng: 121.4737, shelters: 8 },
  { name: '广州', lat: 23.1291, lng: 113.2644, shelters: 8 },
  { name: '深圳', lat: 22.5431, lng: 114.0579, shelters: 8 },
  { name: '成都', lat: 30.5728, lng: 104.0668, shelters: 8 },
  { name: '杭州', lat: 30.2741, lng: 120.1551, shelters: 7 },
  { name: '武汉', lat: 30.5928, lng: 114.3055, shelters: 8 },
  { name: '西安', lat: 34.3416, lng: 108.9398, shelters: 6 },
  { name: '南京', lat: 32.0603, lng: 118.7969, shelters: 7 },
  { name: '重庆', lat: 29.5630, lng: 106.5516, shelters: 7 },
  { name: '天津', lat: 39.3434, lng: 117.3616, shelters: 6 },
  { name: '苏州', lat: 31.2990, lng: 120.5853, shelters: 6 },
  { name: '郑州', lat: 34.7466, lng: 113.6253, shelters: 6 },
  { name: '长沙', lat: 28.2280, lng: 112.9388, shelters: 6 },
  { name: '沈阳', lat: 41.8057, lng: 123.4315, shelters: 5 },
  { name: '青岛', lat: 36.0671, lng: 120.3826, shelters: 6 },
  { name: '宁波', lat: 29.8683, lng: 121.5440, shelters: 5 },
  { name: '厦门', lat: 24.4798, lng: 118.0894, shelters: 5 },
  { name: '大连', lat: 38.9140, lng: 121.6147, shelters: 5 },
  { name: '哈尔滨', lat: 45.8038, lng: 126.5350, shelters: 5 },
  { name: '济南', lat: 36.6512, lng: 117.1201, shelters: 5 },
  { name: '长春', lat: 43.8171, lng: 125.3235, shelters: 5 },
  { name: '昆明', lat: 25.0389, lng: 102.7183, shelters: 5 },
  { name: '贵阳', lat: 26.6470, lng: 106.6302, shelters: 5 },
  { name: '南宁', lat: 22.8170, lng: 108.3665, shelters: 5 },
  { name: '福州', lat: 26.0745, lng: 119.2965, shelters: 5 },
  { name: '南昌', lat: 28.6820, lng: 115.8579, shelters: 5 },
  { name: '合肥', lat: 31.8206, lng: 117.2272, shelters: 5 },
  { name: '兰州', lat: 36.0611, lng: 103.8343, shelters: 4 },
  { name: '乌鲁木齐', lat: 43.8256, lng: 87.6168, shelters: 4 }
];

// 3D标记数据
const GLOBE_SHELTERS = [
  // 北京
  { name: "西单地下人防工程", lat: 39.9109, lng: 116.3726, type: "shelter", capacity: 5000, city: "北京" },
  { name: "天安门地下通道", lat: 39.9055, lng: 116.3976, type: "bunker", capacity: 10000, city: "北京" },
  { name: "东直门地铁站", lat: 39.9401, lng: 116.4354, type: "metro", capacity: 3000, city: "北京" },
  
  // 上海
  { name: "人民广场地下空间", lat: 31.2304, lng: 121.4737, type: "bunker", capacity: 8000, city: "上海" },
  { name: "陆家嘴地下通道", lat: 31.2397, lng: 121.4998, type: "shelter", capacity: 5000, city: "上海" },
  { name: "徐家汇地铁站", lat: 31.1956, lng: 121.4374, type: "metro", capacity: 4000, city: "上海" },
  
  // 广州
  { name: "珠江新城地下空间", lat: 23.1291, lng: 113.2644, type: "shelter", capacity: 6000, city: "广州" },
  { name: "体育西路地铁站", lat: 23.1353, lng: 113.3219, type: "metro", capacity: 5000, city: "广州" },
  
  // 深圳
  { name: "福田站地下空间", lat: 22.5431, lng: 114.0579, type: "bunker", capacity: 7000, city: "深圳" },
  { name: "罗湖地铁站", lat: 22.5323, lng: 114.1163, type: "metro", capacity: 4000, city: "深圳" },
  
  // 成都
  { name: "天府广场地下空间", lat: 30.6574, lng: 104.0633, type: "shelter", capacity: 6000, city: "成都" },
  { name: "春熙路地铁站", lat: 30.6558, lng: 104.0784, type: "metro", capacity: 3500, city: "成都" },
  
  // 添加更多城市...
];

// 暴露到全局
if (typeof window !== 'undefined') {
  window.GLOBE_CITIES = GLOBE_CITIES;
  window.GLOBE_SHELTERS = GLOBE_SHELTERS;
}
