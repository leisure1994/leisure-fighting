import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Radiation, Map, BookOpen, Home, Menu, X } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/map', label: '地图', icon: Map },
    { path: '/survival-guide', label: '生存指南', icon: BookOpen },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b border-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Radiation className="w-8 h-8 text-accent-orange group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-accent-orange/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm text-accent-cyan tracking-wider">NUCLEAR SURVIVAL MAP</span>
                <span className="text-xs text-text-muted">核战城市自救指南</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text hover:text-accent-orange transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden bg-surface border-t border-grid">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 border-b border-grid ${
                    isActive ? 'bg-accent-orange/10 text-accent-orange' : 'text-text hover:bg-surface-light'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-grid py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Radiation className="w-5 h-5 text-accent-orange" />
              <span className="text-sm text-text-muted">
                核战争城市自救地图 © 2024
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <span className="font-mono">STATUS: <span className="text-success">OPERATIONAL</span></span>
              <span className="font-mono">VER: 1.0.0</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-text-muted/60 text-center max-w-2xl mx-auto">
            免责声明：本网站提供的信息仅供参考，实际避难所信息请以当地政府发布为准。
            在紧急情况下，请遵循官方指引和警报系统。
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Layout