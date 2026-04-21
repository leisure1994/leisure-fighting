// ============================================
// 核战争城市自救地图 - 移动端适配模块
// ============================================

class MobileModule {
    constructor() {
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.currentView = 'map';
        this.listPanelOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupGestures();
        this.setupBottomNav();
        this.setupPullToRefresh();
        this.optimizeMapTouch();
        console.log('📱 移动端适配模块初始化完成');
    }
    
    setupGestures() {
        const map = document.getElementById('map');
        const listPanel = document.getElementById('list-panel');
        
        if (!map) return;
        
        // 地图上的双击缩放
        let lastTap = 0;
        map.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                // 双击
                e.preventDefault();
                // 地图双击由 Leaflet 处理
            }
            
            lastTap = currentTime;
        });
        
        // 列表面板滑动手势
        if (listPanel) {
            listPanel.addEventListener('touchstart', (e) => {
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            listPanel.addEventListener('touchend', (e) => {
                this.touchEndY = e.changedTouches[0].clientY;
                this.handleListPanelSwipe();
            }, { passive: true });
        }
    }
    
    handleListPanelSwipe() {
        const diff = this.touchStartY - this.touchEndY;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // 向上滑动 - 展开面板
                this.expandListPanel();
            } else {
                // 向下滑动 - 收起面板
                this.collapseListPanel();
            }
        }
    }
    
    expandListPanel() {
        const listPanel = document.getElementById('list-panel');
        if (listPanel) {
            listPanel.style.height = '80vh';
            this.listPanelOpen = true;
        }
    }
    
    collapseListPanel() {
        const listPanel = document.getElementById('list-panel');
        if (listPanel) {
            listPanel.classList.remove('visible');
            this.listPanelOpen = false;
        }
    }
    
    setupBottomNav() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.switchView(view);
                
                // 更新激活状态
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    switchView(view) {
        this.currentView = view;
        
        switch (view) {
            case 'map':
                this.showMapView();
                break;
            case 'list':
                this.showListView();
                break;
            case 'filter':
                this.showFilterView();
                break;
            case 'guide':
                this.showGuideView();
                break;
        }
    }
    
    showMapView() {
        // 关闭其他面板，显示地图
        this.collapseListPanel();
        window.app?.closeSidebar();
        window.app?.closeGuide();
        
        // 确保地图可见
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
            mapContainer.style.display = 'block';
        }
        
        // 刷新地图大小
        setTimeout(() => {
            window.app?.mapModule?.handleResize();
        }, 100);
    }
    
    showListView() {
        const listPanel = document.getElementById('list-panel');
        if (listPanel) {
            listPanel.classList.add('visible');
            this.listPanelOpen = true;
        }
        
        // 更新列表数据
        window.app?.shelterManager?.updateListPanel();
    }
    
    showFilterView() {
        window.app?.toggleSidebar();
    }
    
    showGuideView() {
        window.app?.openGuide();
    }
    
    setupPullToRefresh() {
        let startY = 0;
        let refreshing = false;
        
        document.addEventListener('touchstart', (e) => {
            if (document.scrollingElement.scrollTop === 0) {
                startY = e.touches[0].clientY;
            }
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (refreshing) return;
            
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (document.scrollingElement.scrollTop === 0 && diff > 100) {
                this.showPullIndicator();
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            if (refreshing) return;
            
            if (document.scrollingElement.scrollTop === 0 && startY > 0) {
                this.hidePullIndicator();
            }
        }, { passive: true });
    }
    
    showPullIndicator() {
        // 创建下拉刷新指示器
        let indicator = document.getElementById('pull-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pull-indicator';
            indicator.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> 释放刷新';
            indicator.style.cssText = `
                position: fixed;
                top: var(--header-height-mobile);
                left: 0;
                right: 0;
                height: 50px;
                background: var(--color-surface);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                color: var(--color-primary);
                font-size: 0.9rem;
                z-index: 100;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }
        
        indicator.style.transform = 'translateY(0)';
    }
    
    hidePullIndicator() {
        const indicator = document.getElementById('pull-indicator');
        if (indicator) {
            indicator.style.transform = 'translateY(-100%)';
        }
    }
    
    optimizeMapTouch() {
        const map = document.getElementById('map');
        if (!map) return;
        
        // 优化触摸体验
        map.style.touchAction = 'pan-x pan-y';
        
        // 防止触摸时的页面滚动
        map.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // 禁用双击缩放时的页面缩放
        let lastTouchEnd = 0;
        map.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });
    }
    
    // 显示移动端特定的Toast提示
    showMobileToast(message, type = 'info') {
        // 移动端使用底部弹出的提示
        const toast = document.createElement('div');
        toast.className = `mobile-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: calc(var(--mobile-nav-height) + 20px);
            left: 20px;
            right: 20px;
            background: var(--color-surface);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 动画显示
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // 自动隐藏
        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
    
    // 处理设备方向变化
    handleOrientationChange() {
        setTimeout(() => {
            window.app?.mapModule?.handleResize();
        }, 300);
    }
}

// 初始化时暴露到全局
window.MobileModule = MobileModule;

// 添加移动端特定样式
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .mobile-toast.success {
        border-left: 4px solid var(--color-success);
    }
    
    .mobile-toast.error {
        border-left: 4px solid var(--color-danger);
    }
    
    .mobile-toast.warning {
        border-left: 4px solid var(--color-warning);
    }
    
    .mobile-toast.info {
        border-left: 4px solid var(--color-info);
    }
    
    .mobile-toast .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .mobile-toast i {
        font-size: 1.2rem;
    }
    
    .mobile-toast.success i { color: var(--color-success); }
    .mobile-toast.error i { color: var(--color-danger); }
    .mobile-toast.warning i { color: var(--color-warning); }
    .mobile-toast.info i { color: var(--color-info); }
`;
document.head.appendChild(mobileStyles);
