// ============================================
// 核战争城市自救地图 - 搜索模块
// ============================================

class SearchModule {
    constructor() {
        this.searchInput = document.getElementById('city-search');
        this.suggestionsBox = document.getElementById('search-suggestions');
        this.searchClear = document.getElementById('search-clear');
        this.debounceTimer = null;
        this.currentSuggestions = [];
        
        this.init();
    }
    
    init() {
        if (!this.searchInput) {
            console.warn('搜索输入框未找到');
            return;
        }
        
        this.bindEvents();
        console.log('🔍 搜索模块初始化完成');
    }
    
    bindEvents() {
        // 输入事件（防抖处理）
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            const query = e.target.value.trim();
            
            if (query.length === 0) {
                this.hideSuggestions();
                this.searchClear?.classList.remove('visible');
                return;
            }
            
            this.searchClear?.classList.add('visible');
            
            // 防抖处理，300ms后执行搜索
            this.debounceTimer = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });
        
        // 焦点事件
        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim().length > 0) {
                this.showSuggestions();
            }
        });
        
        // 键盘导航
        this.searchInput.addEventListener('keydown', (e) => {
            this.handleKeyNavigation(e);
        });
        
        // 点击外部关闭建议
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-box')) {
                this.hideSuggestions();
            }
        });
    }
    
    performSearch(query) {
        // 合并所有可搜索的数据源
        const suggestions = [];
        
        // 1. 搜索城市
        if (window.CHINA_CITIES) {
            const cities = window.CHINA_CITIES.filter(city => 
                city.name.includes(query) || 
                city.pinyin?.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            
            cities.forEach(city => {
                suggestions.push({
                    type: 'city',
                    name: city.name,
                    subtitle: city.province,
                    icon: 'fa-city',
                    data: city
                });
            });
        }
        
        // 2. 搜索避难所
        if (window.app?.shelterManager) {
            const shelters = window.app.shelterManager.searchShelters(query).slice(0, 5);
            
            shelters.forEach(shelter => {
                suggestions.push({
                    type: 'shelter',
                    name: shelter.name,
                    subtitle: `${shelter.city} · ${shelter.typeLabel}`,
                    icon: shelter.icon,
                    data: shelter
                });
            });
        }
        
        // 3. 搜索省份
        if (window.CHINA_CITIES) {
            const provinces = [...new Set(window.CHINA_CITIES.map(c => c.province))]
                .filter(p => p.includes(query))
                .slice(0, 3);
            
            provinces.forEach(province => {
                suggestions.push({
                    type: 'province',
                    name: province,
                    subtitle: '省份',
                    icon: 'fa-map-marked-alt',
                    data: { name: province, type: 'province' }
                });
            });
        }
        
        this.currentSuggestions = suggestions;
        this.renderSuggestions(suggestions);
    }
    
    renderSuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.suggestionsBox.innerHTML = `
                <div class="suggestion-item no-results">
                    <i class="fas fa-search"></i>
                    <span>未找到相关结果</span>
                </div>
            `;
        } else {
            this.suggestionsBox.innerHTML = suggestions.map((item, index) => `
                <div class="suggestion-item" data-index="${index}" data-type="${item.type}">
                    <i class="fas ${item.icon}"></i>
                    <span class="suggestion-name">${this.highlightMatch(item.name)}</span>
                    <span class="suggestion-type">${item.subtitle}</span>
                </div>
            `).join('';
            
            // 绑定点击事件
            this.suggestionsBox.querySelectorAll('.suggestion-item').forEach(el => {
                el.addEventListener('click', () => {
                    const index = parseInt(el.dataset.index);
                    this.selectSuggestion(this.currentSuggestions[index]);
                });
            });
        }
        
        this.showSuggestions();
    }
    
    highlightMatch(text) {
        const query = this.searchInput.value.trim();
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    selectSuggestion(item) {
        this.hideSuggestions();
        this.searchInput.value = item.name;
        
        switch (item.type) {
            case 'city':
                this.handleCitySelect(item.data);
                break;
            case 'shelter':
                this.handleShelterSelect(item.data);
                break;
            case 'province':
                this.handleProvinceSelect(item.data);
                break;
        }
    }
    
    handleCitySelect(city) {
        // 更新城市选择器
        const provinceSelect = document.getElementById('province-select');
        const citySelect = document.getElementById('city-select');
        
        if (provinceSelect) {
            provinceSelect.value = city.province;
            // 触发省份变化以更新城市列表
            window.app?.onProvinceChange(city.province);
        }
        
        if (citySelect) {
            citySelect.value = city.name;
        }
        
        // 执行城市切换
        window.app?.onCityChange(city.name);
        
        this.showToast(`已切换到: ${city.name}`, 'success');
    }
    
    handleShelterSelect(shelter) {
        // 飞到避难所位置
        window.app?.mapModule?.flyTo(shelter.lat, shelter.lng, 16);
        
        // 显示详情
        setTimeout(() => {
            window.app?.showShelterDetail(shelter);
        }, 500);
        
        this.showToast(`已定位到: ${shelter.name}`, 'success');
    }
    
    handleProvinceSelect(province) {
        // 切换到省份视图，显示该省所有避难所
        const provinceCities = window.CHINA_CITIES?.filter(c => c.province === province.name);
        if (provinceCities && provinceCities.length > 0) {
            // 计算省份中心点
            const centerLat = provinceCities.reduce((sum, c) => sum + c.lat, 0) / provinceCities.length;
            const centerLng = provinceCities.reduce((sum, c) => sum + c.lng, 0) / provinceCities.length;
            
            window.app?.mapModule?.flyTo(centerLat, centerLng, 8);
            
            // 更新省份选择器
            const provinceSelect = document.getElementById('province-select');
            if (provinceSelect) {
                provinceSelect.value = province.name;
                window.app?.onProvinceChange(province.name);
            }
        }
        
        this.showToast(`已切换到: ${province.name}`, 'success');
    }
    
    handleKeyNavigation(e) {
        const items = this.suggestionsBox?.querySelectorAll('.suggestion-item:not(.no-results)');
        if (!items || items.length === 0) return;
        
        let activeIndex = -1;
        items.forEach((item, index) => {
            if (item.classList.contains('active')) {
                activeIndex = index;
            }
        });
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                this.setActiveSuggestion(items, activeIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, -1);
                this.setActiveSuggestion(items, activeIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0) {
                    items[activeIndex].click();
                } else if (this.currentSuggestions.length > 0) {
                    // 默认选择第一个
                    this.selectSuggestion(this.currentSuggestions[0]);
                }
                break;
            case 'Escape':
                this.hideSuggestions();
                this.searchInput.blur();
                break;
        }
    }
    
    setActiveSuggestion(items, index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    showSuggestions() {
        this.suggestionsBox?.classList.add('visible');
    }
    
    hideSuggestions() {
        this.suggestionsBox?.classList.remove('visible');
    }
    
    clear() {
        this.searchInput.value = '';
        this.hideSuggestions();
        this.searchClear?.classList.remove('visible');
    }
    
    showToast(message, type) {
        window.app?.showToast(message, type);
    }
    
    // 高级搜索功能
    advancedSearch(params) {
        const { query, city, type, capacity, distance, lat, lng } = params;
        
        let results = window.app?.shelterManager?.shelters || [];
        
        // 关键词搜索
        if (query) {
            results = results.filter(s => 
                s.name.includes(query) || 
                s.address.includes(query)
            );
        }
        
        // 城市筛选
        if (city) {
            results = results.filter(s => s.city === city);
        }
        
        // 类型筛选
        if (type && type.length > 0) {
            results = results.filter(s => type.includes(s.type));
        }
        
        // 容量筛选
        if (capacity) {
            results = results.filter(s => s.capacity >= capacity);
        }
        
        // 距离筛选
        if (distance && lat && lng) {
            results = results.map(s => ({
                ...s,
                distance: this.calculateDistance(lat, lng, s.lat, s.lng)
            })).filter(s => s.distance <= distance);
            
            results.sort((a, b) => a.distance - b.distance);
        }
        
        return results;
    }
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    // 获取搜索历史
    getSearchHistory() {
        try {
            return JSON.parse(localStorage.getItem('nuclearMapSearchHistory') || '[]');
        } catch {
            return [];
        }
    }
    
    // 添加搜索历史
    addToHistory(query) {
        if (!query || query.trim() === '') return;
        
        const history = this.getSearchHistory();
        const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 10);
        
        try {
            localStorage.setItem('nuclearMapSearchHistory', JSON.stringify(newHistory));
        } catch {
            // 忽略存储错误
        }
    }
    
    // 显示搜索历史
    showSearchHistory() {
        const history = this.getSearchHistory();
        if (history.length === 0) return;
        
        this.suggestionsBox.innerHTML = `
            <div class="suggestion-header">
                <span>搜索历史</span>
                <button class="clear-history">清除</button>
            </div>
            ${history.map((item, index) => `
                <div class="suggestion-item" data-index="${index}">
                    <i class="fas fa-history"></i>
                    <span class="suggestion-name">${item}</span>
                </div>
            `).join('')}
        `;
        
        // 绑定事件
        this.suggestionsBox.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                const query = history[parseInt(el.dataset.index)];
                this.searchInput.value = query;
                this.performSearch(query);
            });
        });
        
        this.suggestionsBox.querySelector('.clear-history')?.addEventListener('click', () => {
            localStorage.removeItem('nuclearMapSearchHistory');
            this.hideSuggestions();
        });
        
        this.showSuggestions();
    }
}

// 初始化时暴露到全局
window.SearchModule = SearchModule;
