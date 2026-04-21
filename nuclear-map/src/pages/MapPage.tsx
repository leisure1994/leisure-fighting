import React, { useState, Suspense, lazy } from 'react'
import { Globe, Map as MapIcon } from 'lucide-react'
import MapComponent from '../components/MapComponent'

// 懒加载 3D 地球仪组件
const GlobeComponent = lazy(() => import('../components/GlobeComponent'))

const MapPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* 视图切换工具栏 */}
      <div className="bg-surface border-b border-grid px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-text">核战争城市自救地图</h1>
            <span className="text-xs text-text-muted hidden sm:inline">
              查看全国地下避难所、人防工程位置
            </span>
          </div>
          
          {/* 2D/3D 切换按钮组 */}
          <div className="flex items-center bg-bg-primary rounded-lg p-1 border border-grid">
            <button
              onClick={() => setViewMode('2d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === '2d'
                  ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">2D 地图</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === '3d'
                  ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">3D 地球仪</span>
            </button>
          </div>
        </div>
      </div>

      {/* 地图内容区域 */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === '2d' ? (
          // 2D 地图视图
          <div className="absolute inset-0 flex">
            {/* Sidebar - 仅在2D视图显示 */}
            <aside className="w-80 bg-surface border-r border-grid flex flex-col hidden lg:flex">
              <div className="p-4 border-b border-grid">
                <h2 className="font-semibold text-text">避难所筛选</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <p className="text-text-muted text-sm">
                  已加载全国 13 个城市避难所数据
                </p>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-bg-primary rounded-lg border border-grid">
                    <h3 className="text-sm font-medium text-text mb-1">图例说明</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff4757]" />
                        <span className="text-text-muted">人防工程</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ffa502]" />
                        <span className="text-text-muted">防空洞</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#2ed573]" />
                        <span className="text-text-muted">地下掩体</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* 2D 地图 */}
            <div className="flex-1 relative">
              <MapComponent />
            </div>
          </div>
        ) : (
          // 3D 地球仪视图
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-[#0a0a1a] flex flex-col items-center justify-center">
                <div className="relative">
                  <Globe className="w-16 h-16 text-accent-cyan animate-spin" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 bg-accent-cyan/20 rounded-full blur-xl animate-pulse" />
                </div>
                <p className="mt-6 text-accent-cyan font-mono text-sm tracking-wider">
                  LOADING 3D GLOBE...
                </p>
              </div>
            }
          >
            <GlobeComponent onClose={() => setViewMode('2d')} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default MapPage