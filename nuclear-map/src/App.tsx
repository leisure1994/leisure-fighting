import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MapPage from './pages/MapPage'
import SurvivalGuidePage from './pages/SurvivalGuidePage'
import CityDetailPage from './pages/CityDetailPage'
import './styles/index.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/survival-guide" element={<SurvivalGuidePage />} />
        <Route path="/city/:cityId" element={<CityDetailPage />} />
      </Routes>
    </Layout>
  )
}

export default App