import React from 'react'
import { useParams } from 'react-router-dom'

const CityDetailPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-text mb-8">{cityId} - 避难所详情</h1>
      <div className="text-text-muted">
        <p>城市详情页面开发中...</p>
      </div>
    </div>
  )
}

export default CityDetailPage