import React, { useEffect, useRef, useState } from 'react'
import { Globe, Map as MapIcon, X, Navigation, Info } from 'lucide-react'
import { loadAllShelters, type Shelter } from '../utils/dataLoader'

// Cesium CSS 和 JS 通过 CDN 加载
const CESIUM_CSS = 'https://cesium.com/downloads/cesiumjs/releases/1.115/Build/Cesium/Widgets/widgets.css'
const CESIUM_JS = 'https://cesium.com/downloads/cesiumjs/releases/1.115/Build/Cesium/Cesium.js'

// 避难所类型颜色映射
const typeColors: Record<string, string> = {
  '核掩体': '#ff4757',
  '防空洞': '#ffa502',
  '人防工程': '#2ed573',
  '地铁': '#1e90ff',
  '地下停车场': '#a55eea',
  'default': '#747d8c'
}

const typeGlowColors: Record<string, string> = {
  '核掩体': 'rgba(255, 71, 87, 0.6)',
  '防空洞': 'rgba(255, 165, 2, 0.6)',
  '人防工程': 'rgba(46, 213, 115, 0.6)',
  '地铁': 'rgba(30, 144, 255, 0.6)',
  '地下停车场': 'rgba(165, 94, 234, 0.6)',
  'default': 'rgba(116, 125, 140, 0.6)'
}

interface GlobeComponentProps {
  onClose: () => void
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({ onClose }) => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null)
  const [shelters, setShelters] = useState<Shelter[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({ total: 0, capacity: 0 })

  // 加载 Cesium
  useEffect(() => {
    const loadCesium = async () => {
      // 加载 CSS
      if (!document.querySelector(`link[href="${CESIUM_CSS}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = CESIUM_CSS
        document.head.appendChild(link)
      }

      // 加载 JS
      if (!(window as any).Cesium) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script')
          script.src = CESIUM_JS
          script.async = true
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Failed to load Cesium'))
          document.head.appendChild(script)
        })
      }

      initCesium()
    }

    loadCesium()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  // 初始化 Cesium
  const initCesium = async () => {
    const Cesium = (window as any).Cesium
    if (!Cesium || !cesiumContainerRef.current) return

    // 加载避难所数据
    const allShelters = await loadAllShelters()
    setShelters(allShelters)
    setStats({
      total: allShelters.length,
      capacity: allShelters.reduce((sum, s) => sum + (s.capacity || 0), 0)
    })

    // 配置 Cesium Ion token (使用默认的，或者可以配置自己的)
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWEwN2Q1Ny0yOTA4LTQwZjQtYjQ2ZC0yYjQwMjNlMmJlMzYiLCJpZCI6MjM2MjU4LCJpYXQiOjE3MjY3MjE4MDJ9'

    // 创建 Viewer
    const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
      terrain: Cesium.Terrain.fromWorldTerrain(),
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      vrButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      navigationHelpButton: false,
      skyAtmosphere: true,
      skyBox: true,
      shouldAnimate: true,
    })

    viewerRef.current = viewer

    // 设置深色主题
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0a0a1a')
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a1a')

    // 添加避难所标记
    addShelterEntities(viewer, allShelters)

    // 飞行到中国
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(104.1954, 35.8617, 8000000),
      duration: 2,
      complete: () => setIsLoading(false)
    })

    // 点击事件处理
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    handler.setInputAction((movement: any) => {
      const pickedObject = viewer.scene.pick(movement.position)
      if (pickedObject && pickedObject.id && pickedObject.id.properties) {
        const shelterData = pickedObject.id.properties.shelterData?.getValue()
        if (shelterData) {
          setSelectedShelter(shelterData)
        }
      } else {
        setSelectedShelter(null)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  // 添加避难所实体
  const addShelterEntities = (viewer: any, shelterList: Shelter[]) => {
    const Cesium = (window as any).Cesium

    shelterList.forEach((shelter) => {
      const color = typeColors[shelter.type] || typeColors.default
      const glowColor = typeGlowColors[shelter.type] || typeGlowColors.default

      // 创建发光点
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(shelter.coordinates.lng, shelter.coordinates.lat, 100),
        point: {
          pixelSize: 15,
          color: Cesium.Color.fromCssColorString(color),
          outlineColor: Cesium.Color.fromCssColorString(glowColor),
          outlineWidth: 3,
          scaleByDistance: new Cesium.NearFarScalar(100000, 2.0, 5000000, 0.5),
          translucencyByDistance: new Cesium.NearFarScalar(100000, 1.0, 5000000, 0.3)
        },
        properties: {
          shelterData: shelter
        }
      })

      // 创建脉冲动画圆圈
      const ellipse = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(shelter.coordinates.lng, shelter.coordinates.lat, 50),
        ellipse: {
          semiMinorAxis: 5000,
          semiMajorAxis: 5000,
          material: new Cesium.ColorMaterialProperty(
            Cesium.Color.fromCssColorString(glowColor).withAlpha(0.3)
          ),
          outline: true,
          outlineColor: Cesium.Color.fromCssColorString(color),
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        },
        properties: {
          shelterData: shelter
        }
      })

      // 添加标签（当相机靠近时显示）
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(shelter.coordinates.lng, shelter.coordinates.lat, 200),
        label: {
          text: shelter.name,
          font: '14px "Noto Sans SC", sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -20),
          translucencyByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.0),
          scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.5)
        },
        properties: {
          shelterData: shelter
        }
      })
    })

    // 添加脉冲动画
    let rotation = 0
    viewer.scene.preUpdate.addEventListener(() => {
      rotation += 0.02
      viewer.entities.values.forEach((entity: any) => {
        if (entity.ellipse) {
          const scale = 1 + Math.sin(rotation) * 0.2
          entity.ellipse.semiMinorAxis = 5000 * scale
          entity.ellipse.semiMajorAxis = 5000 * scale
          entity.ellipse.material.color.alpha = 0.3 * (0.5 + Math.sin(rotation) * 0.5)
        }
      })
    })
  }

  // 搜索城市
  const searchCity = () => {
    if (!viewerRef.current || !searchQuery) return

    const city = shelters.find(s => 
      s.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (city) {
      const Cesium = (window as any).Cesium
      viewerRef.current.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(city.coordinates.lng, city.coordinates.lat, 50000),
        duration: 2
      })
    }
  }

  // 快速跳转到主要城市
  const flyToCity = (lat: number, lng: number, height: number = 50000) => {
    if (!viewerRef.current) return
    const Cesium = (window as any).Cesium
    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lng, lat, height),
      duration: 2
    })
  }

  // 获取防护等级
  const getProtectionLevel = (type: string, capacity?: number) => {
    if (type === '核掩体') return { level: '最高', color: '#ff4757' }
    if (type === '防空洞') return { level: '高', color: '#ffa502' }
    if (capacity && capacity > 10000) return { level: '中高', color: '#2ed573' }
    return { level: '标准', color: '#1e90ff' }
  }

  // 获取类型图标颜色
  const getTypeColor = (type: string) => {
    return typeColors[type] || typeColors.default
  }

  return (
    <div className="relative w-full h-full bg-[#0a0a1a]">
      {/* Cesium 容器 */}
      <div ref={cesiumContainerRef} className="absolute inset-0" />

      {/* 加载动画 */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col items-center justify-center z-50">
          <div className="relative">
            <Globe className="w-16 h-16 text-accent-cyan animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 bg-accent-cyan/20 rounded-full blur-xl animate-pulse" />
          </div>
          <p className="mt-6 text-accent-cyan font-mono text-sm tracking-wider animate-pulse">
            LOADING 3D GLOBE...
          </p>
        </div>
      )}

      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 bg-surface/90 backdrop-blur-md 
                   border border-grid rounded-lg hover:border-accent-orange transition-all group"
      >
        <MapIcon className="w-4 h-4 text-accent-orange group-hover:scale-110 transition-transform" />
        <span className="text-sm text-text">返回2D地图</span>
      </button>

      {/* 标题覆盖层 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-accent-orange to-accent-cyan bg-clip-text text-transparent">
          🌍 3D 全球避难所视图
        </h1>
        <p className="text-xs text-text-muted mt-1">
          旋转地球查看全球 · 滚轮缩放 · 点击标记查看详情
        </p>
      </div>

      {/* 控制面板 */}
      <div className="absolute top-20 right-4 z-40 w-72 bg-surface/90 backdrop-blur-md 
                      border border-grid rounded-xl p-4 space-y-4">
        
        {/* 搜索 */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-accent-cyan" />
            快速定位
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchCity()}
              placeholder="输入城市名称..."
              className="flex-1 bg-bg-primary border border-grid rounded-lg px-3 py-2 
                         text-sm text-text placeholder-text-muted focus:border-accent-cyan outline-none"
            />
            <button
              onClick={searchCity}
              className="px-3 py-2 bg-accent-cyan/20 text-accent-cyan rounded-lg 
                         hover:bg-accent-cyan/30 transition-colors text-sm font-medium"
            >
              搜索
            </button>
          </div>
        </div>

        {/* 主要城市 */}
        <div>
          <h3 className="text-sm font-semibold text-text mb-2">主要城市</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: '北京', lat: 39.9042, lng: 116.4074 },
              { name: '上海', lat: 31.2304, lng: 121.4737 },
              { name: '广州', lat: 23.1291, lng: 113.2644 },
              { name: '深圳', lat: 22.5431, lng: 114.0579 },
              { name: '成都', lat: 30.5728, lng: 104.0668 },
              { name: '武汉', lat: 30.5928, lng: 114.3055 },
            ].map((city) => (
              <button
                key={city.name}
                onClick={() => flyToCity(city.lat, city.lng)}
                className="px-3 py-2 bg-bg-primary border border-grid rounded-lg 
                           text-sm text-text hover:border-accent-cyan transition-all
                           hover:bg-accent-cyan/10"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>

        {/* 图例 */}
        <div className="border-t border-grid pt-3">
          <h3 className="text-sm font-semibold text-text mb-2">图例</h3>
          <div className="space-y-2">
            {Object.entries(typeColors).filter(([k]) => k !== 'default').map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
                <span className="text-xs text-text-muted">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 统计面板 */}
      <div className="absolute bottom-4 left-4 z-40 flex gap-6 bg-surface/90 backdrop-blur-md 
                      border border-grid rounded-xl px-6 py-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-orange">{stats.total}</div>
          <div className="text-xs text-text-muted">避难所总数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-cyan">30+</div>
          <div className="text-xs text-text-muted">覆盖城市</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {(stats.capacity / 10000).toFixed(1)}万
          </div>
          <div className="text-xs text-text-muted">总容纳人数</div>
        </div>
      </div>

      {/* 信息弹窗 */}
      {selectedShelter && (
        <div className="absolute bottom-4 right-4 z-50 w-96 bg-surface/95 backdrop-blur-xl 
                        border border-grid rounded-xl p-5 shadow-2xl max-h-[60vh] overflow-y-auto">
          <button
            onClick={() => setSelectedShelter(null)}
            className="absolute top-3 right-3 p-1 text-text-muted hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-bold text-text pr-6 mb-3">{selectedShelter.name}</h3>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${getTypeColor(selectedShelter.type)}20`,
                  color: getTypeColor(selectedShelter.type),
                  border: `1px solid ${getTypeColor(selectedShelter.type)}40`
                }}
              >
                {selectedShelter.type}
              </span>
              {selectedShelter.subtype && (
                <span className="px-2 py-1 bg-bg-primary rounded-full text-xs text-text-muted border border-grid">
                  {selectedShelter.subtype}
                </span>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-text-muted w-16 shrink-0">城市:</span>
                <span className="text-text">{selectedShelter.city || '未知'}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-text-muted w-16 shrink-0">地址:</span>
                <span className="text-text">{selectedShelter.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-text-muted w-16 shrink-0">容纳:</span>
                <span className="text-text">{selectedShelter.capacity?.toLocaleString() || '未知'} 人</span>
              </div>
              {(() => {
                const protection = getProtectionLevel(selectedShelter.type, selectedShelter.capacity)
                return (
                  <div className="flex items-start gap-2">
                    <span className="text-text-muted w-16 shrink-0">防护等级:</span>
                    <span style={{ color: protection.color }}>{protection.level}</span>
                  </div>
                )
              })()}
              <div className="flex items-start gap-2">
                <span className="text-text-muted w-16 shrink-0">状态:</span>
                <span className="text-text">{selectedShelter.status || '未知'}</span>
              </div>
            </div>

            {selectedShelter.description && (
              <div className="border-t border-grid pt-3 mt-3">
                <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">描述</h4>
                <p className="text-sm text-text leading-relaxed">{selectedShelter.description}</p>
              </div>
            )}

            {selectedShelter.features && selectedShelter.features.length > 0 && (
              <div className="border-t border-grid pt-3">
                <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">设施特点</h4>
                <ul className="space-y-1">
                  {selectedShelter.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-text flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedShelter.map_search && (
              <div className="border-t border-grid pt-3">
                <a
                  href={`https://ditu.amap.com/search?query=${encodeURIComponent(selectedShelter.map_search)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 
                             bg-accent-cyan/20 text-accent-cyan rounded-lg 
                             hover:bg-accent-cyan/30 transition-colors text-sm font-medium"
                >
                  <Navigation className="w-4 h-4" />
                  在地图中查看
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 操作提示 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 
                      bg-surface/80 backdrop-blur-md border border-grid rounded-full px-4 py-2">
        <p className="text-xs text-text-muted">
          左键旋转 · 右键平移 · 滚轮缩放 · 点击标记查看详情
        </p>
      </div>
    </div>
  )
}

export default GlobeComponent
