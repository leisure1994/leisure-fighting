// ============================================
// 核战争城市自救地图 - 主应用逻辑
// ============================================

class NuclearMapApp {
    constructor() {
        this.currentCity = null;
        this.currentFilters = {
            types: ['metro', 'air-raid', 'underground', 'shopping', 'government', 'hospital'],
            capacity: 0
        };
        this.isMobile = window.innerWidth <= 1024;
        this.emergencyMode = false;
        this.userLocation = null;
        
        this.init();
    }
    
    async init() {
        console.log('🗺️ 核战争城市自救地图初始化中...');
        
        // 显示加载动画
        this.showLoadingProgress();
        
        // 等待DOM加载完成
        await this.waitForDOM();
        
        // 初始化各个模块
        this.initializeModules();
        
        // 绑定事件
        this.bindEvents();
        
        // 隐藏加载动画
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
        
        console.log('✅ 应用初始化完成');
    }
    
    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }
    
    showLoadingProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.animation = 'loading-progress 2s ease-in-out forwards';
        }
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
    
    initializeModules() {
        // 初始化地图
        if (window.MapModule) {
            this.mapModule = new MapModule();
        }
        
        // 初始化避难所管理
        if (window.ShelterManager) {
            this.shelterManager = new ShelterManager();
        }
        
        // 初始化搜索功能
        if (window.SearchModule) {
            this.searchModule = new SearchModule();
        }
        
        // 初始化生存指南
        if (window.GuideModule) {
            this.guideModule = new GuideModule();
        }
        
        // 初始化移动端适配
        if (window.MobileModule && this.isMobile) {
            this.mobileModule = new MobileModule();
        }
        
        // 初始化统计信息
        this.updateStats();
        
        // 尝试获取用户位置
        this.requestUserLocation();
    }
    
    bindEvents() {
        // 侧边栏控制
        const menuToggle = document.getElementById('menu-toggle');
        const sidebarClose = document.getElementById('sidebar-close');
        const overlay = document.getElementById('overlay');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => this.closeSidebar());
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => this.closeAllPanels());
        }
        
        // 紧急模式
        const emergencyBtn = document.getElementById('emergency-btn');
        const emergencyExit = document.getElementById('emergency-exit');
        
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => this.toggleEmergencyMode());
        }
        
        if (emergencyExit) {
            emergencyExit.addEventListener('click', () => this.toggleEmergencyMode());
        }
        
        // 紧急操作按钮
        const emergencyFind = document.getElementById('emergency-find');
        const emergencySOS = document.getElementById('emergency-sos');
        const emergencyGuide = document.getElementById('emergency-guide');
        
        if (emergencyFind) {
            emergencyFind.addEventListener('click', () => this.findNearestShelter());
        }
        
        if (emergencySOS) {
            emergencySOS.addEventListener('click', () => this.sendSOS());
        }
        
        if (emergencyGuide) {
            emergencyGuide.addEventListener('click', () => {
                this.toggleEmergencyMode();
                this.openGuide();
            });
        }
        
        // 生存指南
        const guideBtn = document.getElementById('guide-btn');
        const guideClose = document.getElementById('guide-close');
        
        if (guideBtn) {
            guideBtn.addEventListener('click', () => this.openGuide());
        }
        
        if (guideClose) {
            guideClose.addEventListener('click', () => this.closeGuide());
        }
        
        // 详情面板
        const detailClose = document.getElementById('detail-close');
        if (detailClose) {
            detailClose.addEventListener('click', () => this.closeDetailPanel());
        }
        
        // 导航和分享按钮
        const btnRoute = document.getElementById('btn-route');
        const btnShare = document.getElementById('btn-share');
        
        if (btnRoute) {
            btnRoute.addEventListener('click', () => this.navigateToShelter());
        }
        
        if (btnShare) {
            btnShare.addEventListener('click', () => this.shareShelter());
        }
        
        // 地图控制按钮
        const locateBtn = document.getElementById('locate-btn');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const layerToggleBtn = document.getElementById('layer-toggle-btn');
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const resetViewBtn = document.getElementById('reset-view-btn');
        
        if (locateBtn) {
            locateBtn.addEventListener('click', () => this.locateUser());
        }
        
        if (fullscreenBtn && this.mapModule) {
            fullscreenBtn.addEventListener('click', () => {
                this.mapModule.toggleFullscreen();
            });
        }
        
        if (layerToggleBtn) {
            layerToggleBtn.addEventListener('click', () => this.toggleLayerPanel());
        }
        
        if (zoomInBtn && this.mapModule) {
            zoomInBtn.addEventListener('click', () => this.mapModule.zoomIn());
        }
        
        if (zoomOutBtn && this.mapModule) {
            zoomOutBtn.addEventListener('click', () => this.mapModule.zoomOut());
        }
        
        if (resetViewBtn && this.mapModule) {
            resetViewBtn.addEventListener('click', () => {
                this.mapModule.resetView();
                this.currentCity = null;
                this.updateCurrentCity('全国');
            });
        }
        
        // 图层切换
        const layerOptions = document.querySelectorAll('.layer-option');
        layerOptions.forEach(option => {
            option.addEventListener('click', () => this.switchMapLayer(option.dataset.layer));
        });
        
        // 城市筛选
        const provinceSelect = document.getElementById('province-select');
        const citySelect = document.getElementById('city-select');
        
        if (provinceSelect) {
            this.populateProvinces();
            provinceSelect.addEventListener('change', (e) => this.onProvinceChange(e.target.value));
        }
        
        if (citySelect) {
            citySelect.addEventListener('change', (e) => this.onCityChange(e.target.value));
        }
        
        // 热门城市快捷按钮
        const quickCities = document.querySelectorAll('.quick-city');
        quickCities.forEach(btn => {
            btn.addEventListener('click', () => {
                this.onCityChange(btn.dataset.city);
            });
        });
        
        // 避难所类型筛选
        const typeCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        typeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateTypeFilters());
        });
        
        // 容量筛选
        const capacitySlider = document.getElementById('capacity-slider');
        if (capacitySlider) {
            capacitySlider.addEventListener('input', (e) => {
                this.currentFilters.capacity = parseInt(e.target.value);
                this.applyFilters();
            });
        }
        
        // 搜索清除按钮
        const searchClear = document.getElementById('search-clear');
        const searchInput = document.getElementById('city-search');
        
        if (searchClear && searchInput) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.classList.remove('visible');
                document.getElementById('search-suggestions')?.classList.remove('visible');
            });
            
            searchInput.addEventListener('input', (e) => {
                if (e.target.value) {
                    searchClear.classList.add('visible');
                } else {
                    searchClear.classList.remove('visible');
                }
            });
        }
        
        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        if (sidebar) {
            sidebar.classList.toggle('open');
            if (sidebar.classList.contains('open')) {
                overlay?.classList.add('visible');
            } else {
                overlay?.classList.remove('visible');
            }
        }
    }
    
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar?.classList.remove('open');
        overlay?.classList.remove('visible');
    }
    
    closeAllPanels() {
        this.closeSidebar();
        this.closeDetailPanel();
        this.closeGuide();
        this.closeListPanel();
        
        const overlay = document.getElementById('overlay');
        overlay?.classList.remove('visible');
        
        const layerPanel = document.getElementById('layer-panel');
        layerPanel?.classList.remove('visible');
    }
    
    toggleEmergencyMode() {
        this.emergencyMode = !this.emergencyMode;
        const overlay = document.getElementById('emergency-overlay');
        
        if (overlay) {
            if (this.emergencyMode) {
                overlay.classList.add('active');
                this.showToast('已进入紧急避难模式', 'warning');
            } else {
                overlay.classList.remove('active');
            }
        }
    }
    
    findNearestShelter() {
        if (!this.userLocation) {
            this.showToast('请先允许获取位置信息', 'warning');
            return;
        }
        
        // 找到最近的避难所
        if (this.shelterManager) {
            const nearest = this.shelterManager.findNearest(
                this.userLocation.lat, 
                this.userLocation.lng
            );
            
            if (nearest && this.mapModule) {
                this.mapModule.flyTo(nearest.lat, nearest.lng, 16);
                this.mapModule.openPopup(nearest);
                this.toggleEmergencyMode();
                this.showToast(`找到最近的避难所: ${nearest.name}`, 'success');
            }
        }
    }
    
    sendSOS() {
        if (!this.userLocation) {
            this.showToast('请先允许获取位置信息', 'warning');
            return;
        }
        
        // 模拟发送求救信号
        this.showToast('求救信号已发送！位置信息已共享', 'success');
        
        // 在实际应用中，这里会调用后端API发送求救信息
        console.log('🚨 SOS Signal:', {
            location: this.userLocation,
            timestamp: new Date().toISOString(),
            type: 'emergency_sos'
        });
    }
    
    openGuide() {
        const guideSidebar = document.getElementById('guide-sidebar');
        const overlay = document.getElementById('overlay');
        
        if (guideSidebar) {
            guideSidebar.classList.add('visible');
            overlay?.classList.add('visible');
        }
    }
    
    closeGuide() {
        const guideSidebar = document.getElementById('guide-sidebar');
        
        guideSidebar?.classList.remove('visible');
        
        // 只在移动端关闭遮罩（桌面端侧边栏不覆盖全屏）
        if (this.isMobile) {
            document.getElementById('overlay')?.classList.remove('visible');
        }
    }
    
    closeDetailPanel() {
        const detailPanel = document.getElementById('detail-panel');
        detailPanel?.classList.remove('visible');
    }
    
    closeListPanel() {
        const listPanel = document.getElementById('list-panel');
        listPanel?.classList.remove('visible');
    }
    
    toggleLayerPanel() {
        const layerPanel = document.getElementById('layer-panel');
        layerPanel?.classList.toggle('visible');
    }
    
    switchMapLayer(layerType) {
        // 更新UI
        document.querySelectorAll('.layer-option').forEach(opt => {
            opt.classList.remove('active');
        });
        document.querySelector(`[data-layer="${layerType}"]`)?.classList.add('active');
        
        // 切换地图图层
        if (this.mapModule) {
            this.mapModule.switchLayer(layerType);
        }
        
        // 关闭面板
        document.getElementById('layer-panel')?.classList.remove('visible');
    }
    
    populateProvinces() {
        const provinceSelect = document.getElementById('province-select');
        if (!provinceSelect || !window.CHINA_CITIES) return;
        
        const provinces = [...new Set(window.CHINA_CITIES.map(c => c.province))].sort();
        
        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
    }
    
    onProvinceChange(province) {
        const citySelect = document.getElementById('city-select');
        if (!citySelect || !window.CHINA_CITIES) return;
        
        // 清空城市选择
        citySelect.innerHTML = '<option value="">选择城市</option>';
        
        if (province) {
            const cities = window.CHINA_CITIES.filter(c => c.province === province);
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.name;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
        }
    }
    
    onCityChange(cityName) {
        if (!cityName || !window.CHINA_CITIES) return;
        
        const city = window.CHINA_CITIES.find(c => c.name === cityName);
        if (city && this.mapModule) {
            this.currentCity = city;
            this.mapModule.flyTo(city.lat, city.lng, 12);
            this.updateCurrentCity(city.name);
            
            // 加载该城市的避难所
            this.shelterManager?.loadSheltersForCity(city.name);
            
            this.showToast(`已切换到: ${city.name}`, 'success');
        }
    }
    
    updateCurrentCity(cityName) {
        const currentCityEl = document.getElementById('current-city');
        if (currentCityEl) {
            currentCityEl.textContent = cityName;
        }
    }
    
    updateTypeFilters() {
        const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        this.currentFilters.types = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        this.applyFilters();
    }
    
    applyFilters() {
        if (this.shelterManager) {
            this.shelterManager.applyFilters(this.currentFilters);
        }
        this.updateStats();
    }
    
    updateStats() {
        const totalEl = document.getElementById('stat-total');
        const visibleEl = document.getElementById('stat-visible');
        const capacityEl = document.getElementById('stat-capacity');
        
        if (this.shelterManager) {
            const stats = this.shelterManager.getStats();
            
            if (totalEl) totalEl.textContent = stats.total.toLocaleString();
            if (visibleEl) visibleEl.textContent = stats.visible.toLocaleString();
            if (capacityEl) capacityEl.textContent = (stats.totalCapacity / 10000).toFixed(1);
        }
    }
    
    locateUser() {
        this.requestUserLocation();
    }
    
    requestUserLocation() {
        if (!navigator.geolocation) {
            this.showToast('您的浏览器不支持地理定位', 'warning');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                if (this.mapModule) {
                    this.mapModule.setUserLocation(this.userLocation);
                    this.mapModule.flyTo(this.userLocation.lat, this.userLocation.lng, 14);
                }
                
                this.showToast('已定位到当前位置', 'success');
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.showToast('无法获取位置信息，请检查权限设置', 'error');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }
    
    navigateToShelter() {
        const shelter = this.currentSelectedShelter;
        if (!shelter) {
            this.showToast('请先选择一个避难所', 'warning');
            return;
        }
        
        // 构建导航URL（使用高德地图）
        const url = `https://uri.amap.com/navigation?to=${shelter.lng},${shelter.lat},${encodeURIComponent(shelter.name)}&mode=car&policy=1`;
        window.open(url, '_blank');
    }
    
    shareShelter() {
        const shelter = this.currentSelectedShelter;
        if (!shelter) {
            this.showToast('请先选择一个避难所', 'warning');
            return;
        }
        
        const shareText = `核战争避难所信息：\n名称：${shelter.name}\n地址：${shelter.address}\n类型：${shelter.typeLabel}\n位置：https://uri.amap.com/marker?position=${shelter.lng},${shelter.lat}`;
        
        if (navigator.share) {
            navigator.share({
                title: shelter.name,
                text: shareText
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareText).then(() => {
                this.showToast('避难所信息已复制到剪贴板', 'success');
            });
        }
    }
    
    showShelterDetail(shelter) {
        this.currentSelectedShelter = shelter;
        
        const detailPanel = document.getElementById('detail-panel');
        const detailContent = document.getElementById('detail-content');
        const detailTitle = document.getElementById('detail-title');
        
        if (!detailPanel || !detailContent) return;
        
        detailTitle.textContent = shelter.name;
        
        // 构建详情内容
        const typeColors = {
            'metro': '#3498db',
            'air-raid': '#e74c3c',
            'underground': '#9b59b6',
            'shopping': '#f39c12',
            'government': '#27ae60',
            'hospital': '#e91e63'
        };
        
        detailContent.innerHTML = `
            <div class="detail-section">
                <div class="detail-info-grid">
                    <div class="detail-info-item">
                        <div class="detail-info-label">类型</div>
                        <div class="detail-info-value" style="color: ${typeColors[shelter.type] || '#fff'}">
                            <i class="fas ${shelter.icon}"></i> ${shelter.typeLabel}
                        </div>
                    </div>
                    <div class="detail-info-item">
                        <div class="detail-info-label">容纳人数</div>
                        <div class="detail-info-value">${shelter.capacity?.toLocaleString() || '未知'}</div>
                    </div>
                    <div class="detail-info-item">
                        <div class="detail-info-label">距地面深度</div>
                        <div class="detail-info-value">${shelter.depth || '未知'}</div>
                    </div>
                    <div class="detail-info-item">
                        <div class="detail-info-label">抗力等级</div>
                        <div class="detail-info-value">${shelter.resistance || '未知'}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <div class="detail-section-title">
                    <i class="fas fa-map-marker-alt"></i> 地址信息
                </div>
                <div class="detail-description">
                    <p><strong>详细地址：</strong>${shelter.address || '暂无详细地址信息'}</p>
                    <p style="margin-top: 8px;"><strong>坐标：</strong>${shelter.lat.toFixed(6)}, ${shelter.lng.toFixed(6)}</p>
                </div>
            </div>
            
            <div class="detail-section">
                <div class="detail-section-title">
                    <i class="fas fa-info-circle"></i> 设施信息
                </div>
                <div class="detail-features">
                    ${shelter.features?.map(f => `
                        <span class="detail-feature ${f.available ? 'available' : 'unavailable'}">
                            <i class="fas ${f.available ? 'fa-check' : 'fa-times'}"></i>
                            ${f.name}
                        </span>
                    `).join('') || '<span class="detail-feature">暂无设施信息</span>'}
                </div>
            </div>
            
            <div class="detail-section">
                <div class="detail-section-title">
                    <i class="fas fa-file-alt"></i> 详细说明
                </div>
                <div class="detail-description">
                    ${shelter.description || '暂无详细说明。该避难所是城市人防工程的一部分，具备基本的核生化防护能力。建议在紧急情况下优先选择距离最近、容纳人数充足的避难所。'}
                </div>
            </div>
            
            ${shelter.emergencyContact ? `
            <div class="detail-section">
                <div class="detail-section-title">
                    <i class="fas fa-phone"></i> 紧急联系方式
                </div>
                <div class="detail-info-item">
                    <div class="detail-info-value">${shelter.emergencyContact}</div>
                </div>
            </div>
            ` : ''}
        `;
        
        detailPanel.classList.add('visible');
        
        // 移动端关闭侧边栏
        if (this.isMobile) {
            this.closeSidebar();
        }
    }
    
    handleResize() {
        const newIsMobile = window.innerWidth <= 1024;
        
        if (newIsMobile !== this.isMobile) {
            this.isMobile = newIsMobile;
            
            // 重新初始化移动端模块
            if (this.isMobile && !this.mobileModule && window.MobileModule) {
                this.mobileModule = new MobileModule();
            }
            
            // 关闭所有面板
            this.closeAllPanels();
        }
        
        // 通知地图模块调整大小
        if (this.mapModule) {
            this.mapModule.handleResize();
        }
    }
    
    handleKeyboard(e) {
        // ESC 关闭所有面板
        if (e.key === 'Escape') {
            this.closeAllPanels();
            if (this.emergencyMode) {
                this.toggleEmergencyMode();
            }
        }
        
        // F 全屏
        if (e.key === 'f' || e.key === 'F') {
            if (e.target.tagName !== 'INPUT' && this.mapModule) {
                this.mapModule.toggleFullscreen();
            }
        }
        
        // / 聚焦搜索
        if (e.key === '/') {
            e.preventDefault();
            document.getElementById('city-search')?.focus();
        }
    }
    
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info} toast-icon"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        });
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new NuclearMapApp();
});
