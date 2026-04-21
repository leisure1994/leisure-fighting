// ============================================
// 核战争城市自救地图 - 避难所数据管理模块
// ============================================

class ShelterManager {
    constructor() {
        this.shelters = [];
        this.filteredShelters = [];
        this.currentCity = null;
        
        // 避难所类型配置
        this.shelterTypes = {
            'metro': { label: '地铁站', icon: 'fa-subway', color: '#3498db' },
            'air-raid': { label: '人防工程', icon: 'fa-bunker', color: '#e74c3c' },
            'underground': { label: '地下停车场', icon: 'fa-dungeon', color: '#9b59b6' },
            'shopping': { label: '地下商场', icon: 'fa-shopping-cart', color: '#f39c12' },
            'government': { label: '政府避难所', icon: 'fa-landmark', color: '#27ae60' },
            'hospital': { label: '医院防空设施', icon: 'fa-hospital', color: '#e91e63' }
        };
        
        this.init();
    }
    
    init() {
        // 加载初始数据
        this.loadAllShelters();
        console.log('🏢 避难所数据管理器初始化完成');
    }
    
    loadAllShelters() {
        // 从全局数据加载避难所
        if (window.SHELTER_DATA) {
            this.shelters = window.SHELTER_DATA.map(s => this.processShelterData(s));
            this.filteredShelters = [...this.shelters];
            
            // 添加到地图
            this.updateMapMarkers();
            
            console.log(`📍 已加载 ${this.shelters.length} 个避难所数据`);
        } else {
            console.warn('⚠️ 未找到避难所数据，使用默认数据');
            this.generateDefaultShelters();
        }
    }
    
    processShelterData(data) {
        return {
            id: data.id || this.generateId(),
            name: data.name,
            type: data.type || 'air-raid',
            typeLabel: this.shelterTypes[data.type]?.label || '人防工程',
            icon: this.shelterTypes[data.type]?.icon || 'fa-bunker',
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            address: data.address || '地址信息待补充',
            city: data.city || '未知城市',
            province: data.province || '未知省份',
            capacity: data.capacity || Math.floor(Math.random() * 5000) + 500,
            depth: data.depth || '地下2-3层',
            resistance: data.resistance || '核6级',
            features: data.features || this.generateDefaultFeatures(),
            description: data.description || '',
            emergencyContact: data.emergencyContact || null,
            openingHours: data.openingHours || '24小时',
            accessibility: data.accessibility || '公共开放',
            lastUpdated: data.lastUpdated || new Date().toISOString()
        };
    }
    
    generateId() {
        return 'shelter_' + Math.random().toString(36).substr(2, 9);
    }
    
    generateDefaultFeatures() {
        const allFeatures = [
            { name: '饮用水', available: true },
            { name: '应急电源', available: true },
            { name: '通风系统', available: true },
            { name: '医疗设施', available: Math.random() > 0.5 },
            { name: '通讯设备', available: Math.random() > 0.3 },
            { name: '食物储备', available: Math.random() > 0.4 },
            { name: '卫生设施', available: true },
            { name: '消防设施', available: true }
        ];
        return allFeatures;
    }
    
    generateDefaultShelters() {
        // 为没有数据的城市生成示例数据
        const majorCities = [
            { name: '北京', lat: 39.9042, lng: 116.4074, count: 50 },
            { name: '上海', lat: 31.2304, lng: 121.4737, count: 45 },
            { name: '广州', lat: 23.1291, lng: 113.2644, count: 40 },
            { name: '深圳', lat: 22.5431, lng: 114.0579, count: 35 },
            { name: '成都', lat: 30.5728, lng: 104.0668, count: 30 },
            { name: '武汉', lat: 30.5928, lng: 114.3055, count: 30 },
            { name: '西安', lat: 34.3416, lng: 108.9398, count: 25 },
            { name: '重庆', lat: 29.5630, lng: 106.5516, count: 35 },
            { name: '杭州', lat: 30.2741, lng: 120.1551, count: 25 },
            { name: '南京', lat: 32.0603, lng: 118.7969, count: 25 }
        ];
        
        const types = Object.keys(this.shelterTypes);
        
        majorCities.forEach(city => {
            for (let i = 0; i < city.count; i++) {
                const type = types[Math.floor(Math.random() * types.length)];
                const offsetLat = (Math.random() - 0.5) * 0.2;
                const offsetLng = (Math.random() - 0.5) * 0.2;
                
                this.shelters.push({
                    id: this.generateId(),
                    name: `${city.name}${this.shelterTypes[type].label}${i + 1}号`,
                    type: type,
                    typeLabel: this.shelterTypes[type].label,
                    icon: this.shelterTypes[type].icon,
                    lat: city.lat + offsetLat,
                    lng: city.lng + offsetLng,
                    address: `${city.name}市${['朝阳区', '海淀区', '东城区', '西城区', '丰台区'][Math.floor(Math.random() * 5)]}某街道`,
                    city: city.name,
                    province: '未知',
                    capacity: Math.floor(Math.random() * 5000) + 500,
                    depth: `地下${Math.floor(Math.random() * 4) + 1}-${Math.floor(Math.random() * 4) + 2}层`,
                    resistance: `核${Math.floor(Math.random() * 3) + 5}级`,
                    features: this.generateDefaultFeatures(),
                    description: `这是${city.name}市的${this.shelterTypes[type].label}，具备基本的核生化防护能力。`,
                    openingHours: '24小时',
                    accessibility: '公共开放'
                });
            }
        });
        
        this.filteredShelters = [...this.shelters];
        this.updateMapMarkers();
    }
    
    loadSheltersForCity(cityName) {
        this.currentCity = cityName;
        
        // 筛选该城市的避难所
        const cityShelters = this.shelters.filter(s => s.city === cityName);
        
        if (cityShelters.length === 0) {
            // 如果没有该城市数据，生成一些示例数据
            this.generateCityShelters(cityName);
        }
        
        this.applyFilters(window.app?.currentFilters || { types: [], capacity: 0 });
    }
    
    generateCityShelters(cityName) {
        // 查找城市坐标
        const cityData = window.CHINA_CITIES?.find(c => c.name === cityName);
        if (!cityData) return;
        
        const types = Object.keys(this.shelterTypes);
        const count = 30; // 每个城市生成30个示例避难所
        
        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)];
            const offsetLat = (Math.random() - 0.5) * 0.15;
            const offsetLng = (Math.random() - 0.5) * 0.15;
            
            this.shelters.push({
                id: this.generateId(),
                name: `${cityName}${this.shelterTypes[type].label}${i + 1}号`,
                type: type,
                typeLabel: this.shelterTypes[type].label,
                icon: this.shelterTypes[type].icon,
                lat: cityData.lat + offsetLat,
                lng: cityData.lng + offsetLng,
                address: `${cityName}市某区域`,
                city: cityName,
                province: cityData.province,
                capacity: Math.floor(Math.random() * 5000) + 500,
                depth: `地下${Math.floor(Math.random() * 4) + 1}层`,
                resistance: `核${Math.floor(Math.random() * 3) + 5}级`,
                features: this.generateDefaultFeatures(),
                description: `这是${cityName}市的${this.shelterTypes[type].label}。`,
                openingHours: '24小时',
                accessibility: '公共开放'
            });
        }
        
        this.filteredShelters = [...this.shelters];
    }
    
    applyFilters(filters) {
        if (!filters) {
            this.filteredShelters = [...this.shelters];
        } else {
            this.filteredShelters = this.shelters.filter(shelter => {
                // 类型筛选
                if (filters.types && filters.types.length > 0) {
                    if (!filters.types.includes(shelter.type)) {
                        return false;
                    }
                }
                
                // 容量筛选
                if (filters.capacity > 0 && shelter.capacity < filters.capacity) {
                    return false;
                }
                
                // 城市筛选
                if (this.currentCity && shelter.city !== this.currentCity) {
                    return false;
                }
                
                return true;
            });
        }
        
        this.updateMapMarkers();
        this.updateListPanel();
        
        // 更新统计
        if (window.app) {
            window.app.updateStats();
        }
    }
    
    updateMapMarkers() {
        if (window.app?.mapModule) {
            window.app.mapModule.updateVisibleMarkers(this.filteredShelters);
        }
    }
    
    updateListPanel() {
        // 更新移动端列表面板
        const listContent = document.getElementById('list-content');
        const listCount = document.getElementById('list-count');
        
        if (listCount) {
            listCount.textContent = `${this.filteredShelters.length}个`;
        }
        
        if (listContent) {
            if (this.filteredShelters.length === 0) {
                listContent.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <p>没有找到符合条件的避难所</p>
                        <button class="btn-reset-filters">重置筛选条件</button>
                    </div>
                `;
            } else {
                listContent.innerHTML = this.filteredShelters.map(shelter => `
                    <div class="shelter-list-item" data-id="${shelter.id}">
                        <div class="shelter-list-icon" style="background: ${this.shelterTypes[shelter.type]?.color || '#e74c3c'}">
                            <i class="fas ${shelter.icon}"></i>
                        </div>
                        <div class="shelter-list-info">
                            <div class="shelter-list-name">${shelter.name}</div>
                            <div class="shelter-list-address">${shelter.address}</div>
                            <div class="shelter-list-meta">
                                <span class="shelter-list-type">${shelter.typeLabel}</span>
                                <span class="shelter-list-capacity">容纳${shelter.capacity}人</span>
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // 绑定点击事件
                listContent.querySelectorAll('.shelter-list-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const shelter = this.getShelterById(item.dataset.id);
                        if (shelter) {
                            window.app?.mapModule?.flyTo(shelter.lat, shelter.lng, 16);
                            window.app?.showShelterDetail(shelter);
                        }
                    });
                });
            }
        }
    }
    
    searchShelters(query) {
        if (!query || query.trim() === '') {
            return this.filteredShelters;
        }
        
        const lowercaseQuery = query.toLowerCase().trim();
        
        return this.shelters.filter(shelter => {
            return shelter.name.toLowerCase().includes(lowercaseQuery) ||
                   shelter.address.toLowerCase().includes(lowercaseQuery) ||
                   shelter.city.toLowerCase().includes(lowercaseQuery) ||
                   shelter.typeLabel.toLowerCase().includes(lowercaseQuery);
        });
    }
    
    getShelterById(id) {
        return this.shelters.find(s => s.id === id);
    }
    
    getSheltersByCity(cityName) {
        return this.shelters.filter(s => s.city === cityName);
    }
    
    getSheltersByType(type) {
        return this.shelters.filter(s => s.type === type);
    }
    
    findNearest(lat, lng, limit = 10) {
        // 计算每个避难所的距离
        const withDistance = this.shelters.map(shelter => {
            const distance = this.calculateDistance(lat, lng, shelter.lat, shelter.lng);
            return { ...shelter, distance };
        });
        
        // 按距离排序
        withDistance.sort((a, b) => a.distance - b.distance);
        
        // 返回最近的几个
        if (limit === 1) {
            return withDistance[0];
        }
        return withDistance.slice(0, limit);
    }
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        // Haversine 公式计算两点间距离
        const R = 6371; // 地球半径，单位为公里
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 返回距离（公里）
    }
    
    toRad(value) {
        return value * Math.PI / 180;
    }
    
    getStats() {
        const total = this.shelters.length;
        const visible = this.filteredShelters.length;
        const totalCapacity = this.shelters.reduce((sum, s) => sum + (s.capacity || 0), 0);
        
        // 按类型统计
        const byType = {};
        this.shelters.forEach(s => {
            byType[s.type] = (byType[s.type] || 0) + 1;
        });
        
        // 按城市统计
        const byCity = {};
        this.shelters.forEach(s => {
            byCity[s.city] = (byCity[s.city] || 0) + 1;
        });
        
        return {
            total,
            visible,
            totalCapacity,
            byType,
            byCity
        };
    }
    
    addShelter(shelterData) {
        const shelter = this.processShelterData(shelterData);
        this.shelters.push(shelter);
        this.applyFilters(window.app?.currentFilters);
        return shelter;
    }
    
    updateShelter(id, updates) {
        const index = this.shelters.findIndex(s => s.id === id);
        if (index !== -1) {
            this.shelters[index] = { ...this.shelters[index], ...updates };
            this.applyFilters(window.app?.currentFilters);
            return this.shelters[index];
        }
        return null;
    }
    
    deleteShelter(id) {
        const index = this.shelters.findIndex(s => s.id === id);
        if (index !== -1) {
            const deleted = this.shelters.splice(index, 1)[0];
            this.applyFilters(window.app?.currentFilters);
            return deleted;
        }
        return null;
    }
    
    exportToJSON() {
        return JSON.stringify(this.shelters, null, 2);
    }
    
    importFromJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.shelters = data.map(s => this.processShelterData(s));
            this.filteredShelters = [...this.shelters];
            this.updateMapMarkers();
            return true;
        } catch (e) {
            console.error('导入数据失败:', e);
            return false;
        }
    }
}

// 初始化时暴露到全局
window.ShelterManager = ShelterManager;
