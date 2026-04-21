// ============================================
// 核战争城市自救地图 - 地图模块
// 基于 Leaflet.js 和 OpenStreetMap
// ============================================

class MapModule {
    constructor() {
        this.map = null;
        this.markers = [];
        this.markerCluster = null;
        this.userMarker = null;
        this.userCircle = null;
        this.currentLayer = null;
        this.layers = {};
        
        this.init();
    }
    
    init() {
        this.createMap();
        this.setupLayers();
        this.setupControls();
        this.setupEventListeners();
        this.setupMarkerCluster();
    }
    
    createMap() {
        // 初始化 Leaflet 地图
        // 设置中心点为中国中心位置
        this.map = L.map('map', {
            center: [35.8617, 104.1954], // 中国中心
            zoom: 5,
            minZoom: 4,
            maxZoom: 18,
            zoomControl: false, // 使用自定义缩放控件
            attributionControl: true,
            fullscreenControl: false
        });
        
        // 设置当前图层
        this.switchLayer('streets');
        
        // 添加比例尺
        L.control.scale({
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(this.map);
        
        console.log('🗺️ 地图初始化完成');
    }
    
    setupLayers() {
        // 街道图层 - 使用 CartoDB Dark Matter (适合暗色主题)
        this.layers.streets = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        });
        
        // 卫星图层
        this.layers.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 18
        });
        
        // 暗黑图层（使用更暗的样式）
        this.layers.dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20,
            className: 'dark-tiles'
        });
        
        // 中国地图图层（使用高德瓦片）
        this.layers.china = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            attribution: '&copy; 高德地图',
            subdomains: '1234',
            maxZoom: 18
        });
    }
    
    setupControls() {
        // 添加自定义定位按钮
        const locateControl = L.control({ position: 'topright' });
        locateControl.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control custom-locate');
            div.innerHTML = '<a href="#" title="定位当前位置"><i class="fas fa-crosshairs"></i></a>';
            div.onclick = (e) => {
                e.preventDefault();
                window.app?.locateUser();
            };
            return div;
        };
        locateControl.addTo(this.map);
    }
    
    setupEventListeners() {
        // 监听地图移动事件，更新坐标显示
        this.map.on('mousemove', (e) => {
            const coordsEl = document.getElementById('coordinates');
            if (coordsEl) {
                coordsEl.textContent = `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
            }
        });
        
        this.map.on('click', (e) => {
            const coordsEl = document.getElementById('coordinates');
            if (coordsEl) {
                coordsEl.textContent = `已选择: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;
            }
        });
        
        // 监听视野变化
        this.map.on('zoomend moveend', () => {
            // 通知应用更新可见的避难所
            window.app?.updateStats();
        });
    }
    
    setupMarkerCluster() {
        // 初始化标记聚类
        this.markerCluster = L.markerClusterGroup({
            chunkedLoading: true,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            maxClusterRadius: 80,
            iconCreateFunction: (cluster) => {
                const count = cluster.getChildCount();
                let size = 'small';
                if (count >= 100) size = 'large';
                else if (count >= 10) size = 'medium';
                
                return L.divIcon({
                    html: `<div><span>${count}</span></div>`,
                    className: `marker-cluster marker-cluster-${size}`,
                    iconSize: L.point(40, 40)
                });
            }
        });
        
        this.map.addLayer(this.markerCluster);
    }
    
    switchLayer(layerType) {
        // 移除当前图层
        if (this.currentLayer) {
            this.map.removeLayer(this.currentLayer);
        }
        
        // 添加新图层
        const layerMap = {
            'streets': this.layers.streets,
            'satellite': this.layers.satellite,
            'dark': this.layers.dark,
            'china': this.layers.china
        };
        
        this.currentLayer = layerMap[layerType] || this.layers.streets;
        this.currentLayer.addTo(this.map);
        
        // 确保标记聚类图层在最上层
        if (this.markerCluster) {
            this.markerCluster.bringToFront();
        }
    }
    
    addMarker(shelter) {
        // 根据类型设置图标样式
        const iconConfig = this.getMarkerIcon(shelter.type);
        
        const customIcon = L.divIcon({
            className: `custom-marker marker-${shelter.type}`,
            html: `<i class="fas ${iconConfig.icon}"></i>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        
        const marker = L.marker([shelter.lat, shelter.lng], { icon: customIcon });
        
        // 创建弹出内容
        const popupContent = this.createPopupContent(shelter);
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 250,
            className: 'shelter-popup'
        });
        
        // 点击事件
        marker.on('click', () => {
            window.app?.showShelterDetail(shelter);
        });
        
        this.markers.push({
            marker: marker,
            shelter: shelter
        });
        
        return marker;
    }
    
    getMarkerIcon(type) {
        const icons = {
            'metro': { icon: 'fa-subway', color: '#3498db' },
            'air-raid': { icon: 'fa-bunker', color: '#e74c3c' },
            'underground': { icon: 'fa-dungeon', color: '#9b59b6' },
            'shopping': { icon: 'fa-shopping-cart', color: '#f39c12' },
            'government': { icon: 'fa-landmark', color: '#27ae60' },
            'hospital': { icon: 'fa-hospital', color: '#e91e63' }
        };
        
        return icons[type] || icons['air-raid'];
    }
    
    createPopupContent(shelter) {
        const typeLabels = {
            'metro': '地铁站',
            'air-raid': '人防工程',
            'underground': '地下停车场',
            'shopping': '地下商场',
            'government': '政府避难所',
            'hospital': '医院防空设施'
        };
        
        const typeColors = {
            'metro': '#3498db',
            'air-raid': '#e74c3c',
            'underground': '#9b59b6',
            'shopping': '#f39c12',
            'government': '#27ae60',
            'hospital': '#e91e63'
        };
        
        return `
            <div class="popup-header">
                <span class="popup-icon" style="background: ${typeColors[shelter.type] || '#e74c3c'}">
                    <i class="fas ${this.getMarkerIcon(shelter.type).icon}"></i>
                </span>
                <span class="popup-title">${shelter.name}</span>
            </div>
            <div class="popup-body">
                <div class="popup-row">
                    <i class="fas fa-tag"></i>
                    <span>${typeLabels[shelter.type] || '避难所'}</span>
                </div>
                <div class="popup-row">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${shelter.address || '地址信息待补充'}</span>
                </div>
                <div class="popup-row">
                    <i class="fas fa-users"></i>
                    <span>容纳人数: ${shelter.capacity?.toLocaleString() || '未知'}</span>
                </div>
            </div>
            <div class="popup-actions">
                <button class="popup-btn primary" onclick="window.app.showShelterDetail(window.app.shelterManager.getShelterById('${shelter.id}'))">
                    <i class="fas fa-info-circle"></i> 详情
                </button>
                <button class="popup-btn" onclick="window.app.navigateToShelter()">
                    <i class="fas fa-directions"></i> 导航
                </button>
            </div>
        `;
    }
    
    addMarkers(shelters) {
        // 清除现有标记
        this.clearMarkers();
        
        // 批量添加标记到聚类组
        const markers = shelters.map(shelter => this.addMarker(shelter));
        this.markerCluster.addLayers(markers);
    }
    
    clearMarkers() {
        if (this.markerCluster) {
            this.markerCluster.clearLayers();
        }
        this.markers = [];
    }
    
    updateVisibleMarkers(shelters) {
        this.clearMarkers();
        this.addMarkers(shelters);
    }
    
    flyTo(lat, lng, zoom = 14) {
        this.map.flyTo([lat, lng], zoom, {
            duration: 1.5,
            easeLinearity: 0.25
        });
    }
    
    setView(lat, lng, zoom = 14) {
        this.map.setView([lat, lng], zoom);
    }
    
    resetView() {
        this.map.flyTo([35.8617, 104.1954], 5, {
            duration: 2
        });
    }
    
    setUserLocation(location) {
        // 移除现有用户标记
        if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
        }
        if (this.userCircle) {
            this.map.removeLayer(this.userCircle);
        }
        
        // 创建用户位置标记
        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: '<div class="user-location-dot"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        this.userMarker = L.marker([location.lat, location.lng], {
            icon: userIcon,
            zIndexOffset: 1000
        }).addTo(this.map);
        
        // 添加精度圈
        this.userCircle = L.circle([location.lat, location.lng], {
            radius: 500,
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 0.1,
            weight: 1
        }).addTo(this.map);
    }
    
    openPopup(shelter) {
        const markerData = this.markers.find(m => m.shelter.id === shelter.id);
        if (markerData) {
            markerData.marker.openPopup();
        }
    }
    
    zoomIn() {
        this.map.zoomIn();
    }
    
    zoomOut() {
        this.map.zoomOut();
    }
    
    toggleFullscreen() {
        const mapContainer = document.getElementById('map-container');
        
        if (!document.fullscreenElement) {
            mapContainer.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    handleResize() {
        this.map.invalidateSize();
    }
    
    // 绘制路径
    drawRoute(from, to, waypoints = []) {
        // 使用高德地图路径规划API绘制路线
        // 这里使用简单的直线连接作为示意
        
        const latlngs = [
            [from.lat, from.lng],
            ...waypoints.map(w => [w.lat, w.lng]),
            [to.lat, to.lng]
        ];
        
        const polyline = L.polyline(latlngs, {
            color: '#e74c3c',
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 10'
        }).addTo(this.map);
        
        // 存储路径以便后续清除
        this.currentRoute = polyline;
        
        // 适配视野
        this.map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
        
        return polyline;
    }
    
    clearRoute() {
        if (this.currentRoute) {
            this.map.removeLayer(this.currentRoute);
            this.currentRoute = null;
        }
    }
    
    // 绘制热力图（基于避难所密度）
    drawHeatmap(shelters) {
        // 简化的热力图实现 - 使用圆形标记
        shelters.forEach(shelter => {
            const circle = L.circle([shelter.lat, shelter.lng], {
                radius: 1000,
                color: 'transparent',
                fillColor: '#e74c3c',
                fillOpacity: 0.1
            }).addTo(this.map);
        });
    }
    
    // 添加避难所覆盖范围圆圈
    addShelterRadius(shelter, radius = 1000) {
        const circle = L.circle([shelter.lat, shelter.lng], {
            radius: radius,
            color: this.getMarkerIcon(shelter.type).color,
            fillColor: this.getMarkerIcon(shelter.type).color,
            fillOpacity: 0.1,
            weight: 1
        }).addTo(this.map);
        
        return circle;
    }
    
    // 获取当前视野范围内的避难所
    getVisibleShelters() {
        const bounds = this.map.getBounds();
        return this.markers.filter(m => {
            return bounds.contains(m.marker.getLatLng());
        }).map(m => m.shelter);
    }
    
    // 获取当前中心点
    getCenter() {
        const center = this.map.getCenter();
        return { lat: center.lat, lng: center.lng };
    }
    
    // 获取当前缩放级别
    getZoom() {
        return this.map.getZoom();
    }
}

// 添加用户位置标记样式
const userLocationStyle = document.createElement('style');
userLocationStyle.textContent = `
    .user-location-marker {
        position: relative;
    }
    
    .user-location-dot {
        width: 16px;
        height: 16px;
        background: #3498db;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
        animation: user-location-pulse 2s infinite;
    }
    
    @keyframes user-location-pulse {
        0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4); }
        70% { box-shadow: 0 0 0 15px rgba(52, 152, 219, 0); }
        100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
    }
`;
document.head.appendChild(userLocationStyle);
