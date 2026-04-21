import React from 'react'
import { Link } from 'react-router-dom'
import { Map, Shield, AlertTriangle, Radiation, ChevronRight, Search } from 'lucide-react'

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Map,
      title: '全国避难所地图',
      description: '覆盖北京、上海、广州、深圳等100+城市的地下避难所、人防工程、防空洞位置数据',
      link: '/map',
    },
    {
      icon: Shield,
      title: '生存指南',
      description: '核战争生存手册，包含72小时应急包清单、防辐射知识、避难所选择策略',
      link: '/survival-guide',
    },
    {
      icon: AlertTriangle,
      title: '实时警报',
      description: '模拟核攻击警报系统，帮助用户熟悉不同警报类型的含义和应对措施',
      link: '/alerts',
    },
  ]

  const stats = [
    { label: '覆盖城市', value: '100+', suffix: '' },
    { label: '避难所数据', value: '5000+', suffix: '' },
    { label: '人防工程', value: '2000+', suffix: '' },
    { label: '日活用户', value: '10K+', suffix: '' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,55,72,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(45,55,72,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Alert Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/30 mb-8">
              <Radiation className="w-4 h-4 text-danger animate-pulse" />
              <span className="text-sm font-mono text-danger">SYSTEM ONLINE</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-text">核战争城市</span>
              <span className="block text-gradient mt-2">自救地图</span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              中国首个核战争生存信息平台。查询全国主要城市地下避难所、
              人防工程位置，获取专业生存指南与应急物资清单。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/map" className="btn-primary">
                <Map className="w-5 h-5" />
                <span>查看避难所地图</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/survival-guide" className="btn-secondary">
                <Shield className="w-5 h-5" />
                <span>生存指南</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scanline Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-grid bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-cyan font-mono">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text mb-4">核心功能</h2>
            <p className="text-text-muted">为核战争生存做好全方位准备</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group p-6 rounded-xl bg-surface border border-grid hover:border-accent-orange/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-orange/10 flex items-center justify-center mb-4 group-hover:bg-accent-orange/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-text mb-2">{feature.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center text-accent-cyan text-sm font-mono">
                    <span>了解更多</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text mb-2">快速查找避难所</h2>
            <p className="text-text-muted">输入城市名称查看当地所有避难设施</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="搜索城市，如：北京、上海、广州..."
              className="w-full pl-12 pr-4 py-4 bg-surface border border-grid rounded-xl text-text placeholder-text-muted focus:outline-none focus:border-accent-orange/50 focus:ring-1 focus:ring-accent-orange/50 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent-orange text-white rounded-lg text-sm font-medium hover:bg-accent-orange/90 transition-colors">
              搜索
            </button>
          </div>

          {/* Popular Cities */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-text-muted">热门城市：</span>
            {['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '西安'].map((city) => (
              <Link
                key={city}
                to={`/city/${city}`}
                className="px-3 py-1 text-sm bg-surface border border-grid rounded-full text-text-muted hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Alert Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-danger/10 border border-danger/30 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-danger/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-danger" />
              </div>
              <div>
                <h3 className="font-semibold text-danger">紧急提醒</h3>
                <p className="text-sm text-text-muted">本网站仅供教育和准备用途，不代表任何实际威胁预警</p>
              </div>
            </div>
            <Link to="/survival-guide" className="btn-secondary whitespace-nowrap">
              查看生存指南
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage