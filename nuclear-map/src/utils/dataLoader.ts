/**
 * 避难所数据加载工具
 * 加载所有城市的避难所数据
 */

export interface Shelter {
  id: string
  name: string
  address: string
  district?: string
  type: string
  subtype?: string
  description?: string
  coordinates: {
    lat: number
    lng: number
  }
  map_search?: string
  capacity?: number
  status?: string
  features?: string[]
  source?: string
  contact?: string
  city?: string
}

// 城市列表
const CITIES = [
  'beijing',
  'shanghai', 
  'guangzhou',
  'shenzhen',
  'chengdu',
  'wuhan',
  'hangzhou',
  'nanjing',
  'changchun',
  'qingdao',
  'ningbo',
  'lanzhou',
  'guiyang'
]

// 城市名称映射
const CITY_NAMES: Record<string, string> = {
  beijing: '北京',
  shanghai: '上海',
  guangzhou: '广州',
  shenzhen: '深圳',
  chengdu: '成都',
  wuhan: '武汉',
  hangzhou: '杭州',
  nanjing: '南京',
  changchun: '长春',
  qingdao: '青岛',
  ningbo: '宁波',
  lanzhou: '兰州',
  guiyang: '贵阳'
}

/**
 * 加载单个城市的避难所数据
 */
export async function loadCityShelters(city: string): Promise<Shelter[]> {
  try {
    const response = await fetch(`/nuclear-map/data/${city}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load ${city}: ${response.status}`)
    }
    const data: Shelter[] = await response.json()
    // 添加城市名称
    return data.map(shelter => ({
      ...shelter,
      city: shelter.city || CITY_NAMES[city] || city
    }))
  } catch (error) {
    console.error(`Error loading ${city} shelters:`, error)
    return []
  }
}

/**
 * 加载所有城市的避难所数据
 */
export async function loadAllShelters(): Promise<Shelter[]> {
  const promises = CITIES.map(city => loadCityShelters(city))
  const results = await Promise.all(promises)
  return results.flat()
}

/**
 * 根据类型筛选避难所
 */
export function filterByType(shelters: Shelter[], type: string): Shelter[] {
  if (type === 'all') return shelters
  return shelters.filter(s => s.type === type)
}

/**
 * 根据城市筛选避难所
 */
export function filterByCity(shelters: Shelter[], city: string): Shelter[] {
  if (city === 'all') return shelters
  return shelters.filter(s => s.city === city)
}

/**
 * 获取所有可用的避难所类型
 */
export function getShelterTypes(shelters: Shelter[]): string[] {
  const types = new Set(shelters.map(s => s.type))
  return Array.from(types).sort()
}

/**
 * 获取所有覆盖的城市
 */
export function getCoveredCities(shelters: Shelter[]): string[] {
  const cities = new Set(shelters.map(s => s.city).filter(Boolean))
  return Array.from(cities).sort()
}

/**
 * 搜索避难所
 */
export function searchShelters(shelters: Shelter[], query: string): Shelter[] {
  const lowerQuery = query.toLowerCase()
  return shelters.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.address.toLowerCase().includes(lowerQuery) ||
    s.city?.toLowerCase().includes(lowerQuery) ||
    s.type.toLowerCase().includes(lowerQuery)
  )
}

/**
 * 根据坐标计算距离
 */
export function calculateDistance(
  lat1: number, 
  lng1: number, 
  lat2: number, 
  lng2: number
): number {
  const R = 6371 // 地球半径（公里）
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

/**
 * 查找附近的避难所
 */
export function findNearbyShelters(
  shelters: Shelter[],
  lat: number,
  lng: number,
  radiusKm: number = 10
): Array<Shelter & { distance: number }> {
  return shelters
    .map(s => ({
      ...s,
      distance: calculateDistance(lat, lng, s.coordinates.lat, s.coordinates.lng)
    }))
    .filter(s => s.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
}
