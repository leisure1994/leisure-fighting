import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { loadAllShelters, type Shelter } from '../utils/dataLoader'

// 避难所类型颜色映射
const typeColors: Record<string, string> = {
  '核掩体': '#ff4757',
  '防空洞': '#ffa502',
  '人防工程': '#2ed573',
  '地铁': '#1e90ff',
  '地下停车场': '#a55eea',
  'default': '#747d8c'
}

// 创建自定义图标
const createIcon = (type: string) => {
  const color = typeColors[type] || typeColors.default
  return new Icon({
    iconUrl: `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle cx="12" cy="12" r="10" fill="${color}" filter="url(#glow)" opacity="0.3"/>
        <circle cx="12" cy="12" r="6" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

// 地图加载完成后自动适应边界
const MapBounds: React.FC<{ shelters: Shelter[] }> = ({ shelters }) => {
  const map = useMap()
  
  useEffect(() => {
    if (shelters.length > 0) {
      const bounds = shelters.map(s => [s.coordinates.lat, s.coordinates.lng] as [number, number])
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 })
    }
  }, [map, shelters])
  
  return null
}

const MapComponent: React.FC = () => {
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 中国中心位置
  const center: [number, number] = [35.8617, 104.1954]

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadAllShelters()
        setShelters(data)
      } catch (error) {
        console.error('Error loading shelters:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  // 获取类型颜色
  const getTypeColor = (type: string) => typeColors[type] || typeColors.default

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-12 h-12 border-3 border-accent-orange/20 border-t-accent-orange rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-sm text-text-muted">正在加载避难所数据...</p>
        </div>
      </div>
    )
  }

  return (
    <MapContainer
      center={center}
      zoom={5}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <MapBounds shelters={shelters} />
      
      {shelters.map((shelter) => (
        <Marker
          key={shelter.id}
          position={[shelter.coordinates.lat, shelter.coordinates.lng]}
          icon={createIcon(shelter.type)}
        >
          <Popup className="shelter-popup">
            <div className="min-w-[250px] max-w-[300px]">
              {/* 标题 */}
              <h3 className="font-bold text-gray-900 text-base mb-2 pr-6">
                {shelter.name}
              </h3>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getTypeColor(shelter.type)}20`,
                    color: getTypeColor(shelter.type)
                  }}
                >
                  {shelter.type}
                </span>
                {shelter.subtype && (
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                    {shelter.subtype}
                  </span>
                )}
              </div>

              {/* 信息列表 */}
              <div className="space-y-1.5 text-sm">
                {shelter.city && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 w-12 shrink-0">城市:</span>
                    <span className="text-gray-800">{shelter.city}</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 w-12 shrink-0">地址:</span>
                  <span className="text-gray-800 leading-snug">{shelter.address}</span>
                </div>
                {shelter.capacity && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 w-12 shrink-0">容量:</span>
                    <span className="text-gray-800">{shelter.capacity.toLocaleString()} 人</span>
                  </div>
                )}
                {shelter.status && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 w-12 shrink-0">状态:</span>
                    <span className="text-gray-800">{shelter.status}</span>
                  </div>
                )}
              </div>

              {/* 描述 */}
              {shelter.description && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                    {shelter.description}
                  </p>
                </div>
              )}

              {/* 功能特点 */}
              {shelter.features && shelter.features.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1.5">设施特点:</p>
                  <div className="flex flex-wrap gap-1">
                    {shelter.features.slice(0, 3).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                    {shelter.features.length > 3 && (
                      <span className="px-1.5 py-0.5 text-xs text-gray-400">
                        +{shelter.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* 地图搜索链接 */}
              {shelter.map_search && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <a
                    href={`https://ditu.amap.com/search?query=${encodeURIComponent(shelter.map_search)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-2 
                               bg-blue-500 hover:bg-blue-600 text-white rounded-md 
                               text-xs font-medium transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    在地图中查看
                  </a>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent
