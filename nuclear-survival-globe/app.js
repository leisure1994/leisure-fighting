// 核战争城市自救地球仪 - 完整版
// 119个三线及以上城市 + 区县级多类型避难所
// 底图：天地图（国内稳定访问）

let viewer;
let shelterEntities = [];
let currentCity = null;
let currentDistrict = null;

// 初始化 Cesium 地球仪
function initGlobe() {
    try {
        Cesium.Ion.defaultAccessToken = '';
        
        viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: false,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: true,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            terrainProvider: new Cesium.EllipsoidTerrainProvider()
        });
        
        viewer.cesiumWidget.creditContainer.style.display = "none";
        
        // 天地图影像底图
        const tdtyImagery = new Cesium.UrlTemplateImageryProvider({
            url: 'https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=174705aebfe31b79b3587279e211cb9a',
            minimumLevel: 3,
            maximumLevel: 18
        });
        viewer.imageryLayers.addImageryProvider(tdtyImagery);
        
        // 天地图标注
        const tdtyLabel = new Cesium.UrlTemplateImageryProvider({
            url: 'https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=174705aebfe31b79b3587279e211cb9a',
            minimumLevel: 3,
            maximumLevel: 18
        });
        viewer.imageryLayers.addImageryProvider(tdtyLabel);
        
        viewer.scene.skyAtmosphere.show = true;
        viewer.scene.fog.enabled = true;
        viewer.scene.fog.density = 0.0001;
        
        viewer.selectionIndicator.show = false;
        viewer.infoBox.show = false;
        
        // 加载中国边界
        loadChinaBoundary();
        
        // 生成避难所标记
        generateShelterEntities();
        
        // 填充城市列表
        populateCityList();
        
        // 更新统计数据
        updateStats();
        
        // 绑定事件
        viewer.screenSpaceEventHandler.setInputAction(onLeftClick, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
        // 绑定home按钮
        document.getElementById('homeButton').addEventListener('click', flyToChina);
        
        // 隐藏加载
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
        }, 2000);
        
        // 初始视角
        flyToChina();
        
        // 相机监听
        setupCameraListener();
        
        console.log('地球仪初始化成功');
    } catch (error) {
        console.error('初始化失败:', error);
        document.querySelector('.loading p').textContent = '加载失败: ' + error.message;
    }
}

// 加载中国边界
function loadChinaBoundary() {
    const url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000.json';
    fetch(url)
        .then(r => r.json())
        .then(data => {
            viewer.dataSources.add(
                Cesium.GeoJsonDataSource.load(data, {
                    stroke: Cesium.Color.YELLOW,
                    strokeWidth: 3,
                    fill: Cesium.Color.YELLOW.withAlpha(0.02)
                })
            );
        });
}

// 生成避难所实体
function generateShelterEntities() {
    shelterEntities = [];
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        
        city.shelters.forEach(shelter => {
            const color = getTypeColor(shelter.type);
            const entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    shelter.position[0],
                    shelter.position[1],
                    300
                ),
                billboard: {
                    image: createMarkerImage(color),
                    scale: 1.0,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },
                label: {
                    text: shelter.name,
                    font: 'bold 12px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, -35),
                    show: false
                },
                properties: {
                    shelter: shelter,
                    city: city.name
                }
            });
            
            shelterEntities.push({
                entity: entity,
                shelter: shelter,
                city: city
            });
        });
    }
}

// 创建标记图像
function createMarkerImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 36;
    canvas.height = 46;
    const ctx = canvas.getContext('2d');
    
    // 发光效果
    const gradient = ctx.createRadialGradient(18, 18, 0, 18, 18, 18);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.6, color + '60');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(18, 18, 18, 0, Math.PI * 2);
    ctx.fill();
    
    // 圆点
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(18, 18, 9, 0, Math.PI * 2);
    ctx.fill();
    
    // 边框
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(18, 18, 9, 0, Math.PI * 2);
    ctx.stroke();
    
    // 尖角
    ctx.beginPath();
    ctx.moveTo(18, 27);
    ctx.lineTo(12, 42);
    ctx.lineTo(18, 36);
    ctx.lineTo(24, 42);
    ctx.closePath();
    ctx.fill();
    
    return canvas.toDataURL();
}

// 填充城市列表
function populateCityList() {
    const cityListEl = document.getElementById('cityList');
    if (!cityListEl) return;
    
    cityListEl.innerHTML = '';
    
    // 按城市等级分组
    const tiers = {
        '一线': ['beijing', 'shanghai', 'guangzhou', 'shenzhen'],
        '新一线': ['chengdu', 'hangzhou', 'chongqing', 'wuhan', 'xian', 'nanjing', 'changsha', 'tianjin', 'zhengzhou', 'dongguan', 'wuxi', 'ningbo', 'qingdao', 'hefei', 'suzhou'],
        '二线': ['foshan', 'shenyang', 'kunming', 'jinan', 'xiamen', 'fuzhou', 'wenzhou', 'changzhou', 'dalian', 'shijiazhuang', 'nanning', 'haerbin', 'jinhua', 'nanchang', 'changchun', 'nantong', 'quanzhou', 'guiyang', 'jiaxing', 'taiyuan', 'huizhou', 'xuzhou', 'shaoxing', 'zhongshan', 'taizhou', 'yantai', 'zhuhai', 'baoding', 'weifang', 'lanzhou']
    };
    
    for (const [tierName, cityIds] of Object.entries(tiers)) {
        const groupEl = document.createElement('div');
        groupEl.className = 'city-group';
        groupEl.innerHTML = `<div class="city-group-title">${tierName}城市</div>`;
        
        cityIds.forEach(id => {
            const city = SHELTER_DATA[id];
            if (!city) return;
            
            const item = document.createElement('div');
            item.className = 'city-item';
            item.innerHTML = `
                <span>${city.name}</span>
                <span class="count">${city.shelters.length}处</span>
            `;
            item.onclick = () => flyToCity(id);
            groupEl.appendChild(item);
        });
        
        cityListEl.appendChild(groupEl);
    }
    
    // 三线城市单独分组（显示前20个）
    const tier3Ids = Object.keys(SHELTER_DATA).filter(id => {
        const tiers2and1 = [...tiers['一线'], ...tiers['新一线'], ...tiers['二线']];
        return !tiers2and1.includes(id);
    }).slice(0, 20);
    
    const group3 = document.createElement('div');
    group3.className = 'city-group';
    group3.innerHTML = `<div class="city-group-title">三线城市（部分）</div>`;
    
    tier3Ids.forEach(id => {
        const city = SHELTER_DATA[id];
        if (!city) return;
        
        const item = document.createElement('div');
        item.className = 'city-item';
        item.innerHTML = `
            <span>${city.name}</span>
            <span class="count">${city.shelters.length}处</span>
        `;
        item.onclick = () => flyToCity(id);
        group3.appendChild(item);
    });
    
    cityListEl.appendChild(group3);
}

// 更新统计
function updateStats() {
    const stats = calculateStats();
    document.getElementById('totalBunkers').textContent = stats.totalBunkers;
    document.getElementById('coveredCities').textContent = stats.coveredCities;
    document.getElementById('totalCapacity').textContent = (stats.totalCapacity / 10000).toFixed(1) + '万';
}

// 飞到中国
function flyToChina() {
    if (!viewer) return;
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(104.0, 35.0, 8000000),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-60),
            roll: 0
        },
        duration: 2
    });
}

// 飞到城市
function flyToCity(cityId) {
    if (!viewer) return;
    
    const city = SHELTER_DATA[cityId];
    if (!city) return;
    
    currentCity = cityId;
    
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            city.center[0],
            city.center[1],
            50000
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0
        },
        duration: 2,
        complete: () => showCityLabels(cityId)
    });
}

// 显示城市标签
function showCityLabels(cityId) {
    shelterEntities.forEach(item => {
        item.entity.label.show = (item.city.id === cityId);
    });
}

// 点击事件
function onLeftClick(movement) {
    const picked = viewer.scene.pick(movement.position);
    
    if (Cesium.defined(picked) && picked.id) {
        const entity = picked.id;
        if (entity.properties && entity.properties.shelter) {
            showShelterInfo(
                entity.properties.shelter.getValue(),
                entity.properties.city.getValue()
            );
        }
    } else {
        closeInfoPanel();
    }
}

// 显示避难所信息
function showShelterInfo(shelter, cityName) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    
    document.getElementById('infoTitle').textContent = shelter.name;
    document.getElementById('infoCity').textContent = cityName;
    document.getElementById('infoType').innerHTML = `
        <span class="badge" style="background: ${getTypeColor(shelter.type)}20; color: ${getTypeColor(shelter.type)}; border: 1px solid ${getTypeColor(shelter.type)}">
            ${getTypeLabel(shelter.type)}
        </span>
    `;
    document.getElementById('infoAddress').textContent = shelter.address;
    document.getElementById('infoCapacity').textContent = shelter.capacity;
    document.getElementById('infoLevel').textContent = shelter.level;
    document.getElementById('infoDesc').textContent = shelter.description;
    
    panel.classList.add('active');
    
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            shelter.position[0],
            shelter.position[1],
            8000
        ),
        duration: 1.5
    });
}

// 关闭面板
function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    if (panel) panel.classList.remove('active');
}

// 搜索城市
function searchCity() {
    const query = document.getElementById('citySearch').value.trim();
    if (!query) return;
    
    for (const cityId in SHELTER_DATA) {
        if (SHELTER_DATA[cityId].name.includes(query)) {
            flyToCity(cityId);
            return;
        }
    }
    alert('未找到该城市');
}

// 相机监听
function setupCameraListener() {
    if (!viewer) return;
    
    viewer.camera.changed.addEventListener(() => {
        const height = viewer.camera.positionCartographic.height;
        
        shelterEntities.forEach(item => {
            if (height < 80000) {
                if (currentCity && item.city.id === currentCity) {
                    item.entity.label.show = true;
                }
            } else {
                item.entity.label.show = false;
            }
        });
    });
}

// 类型颜色
function getTypeColor(type) {
    const colors = {
        'nuclear': '#ff0000',      // 核掩体 - 红
        'civil': '#ff6600',        // 人防工程 - 橙
        'metro': '#0066ff',        // 地铁 - 蓝
        'underground': '#00ff00',  // 地下商场 - 绿
        'parking': '#ffff00'       // 停车场 - 黄
    };
    return colors[type] || '#ffffff';
}

// 类型标签
function getTypeLabel(type) {
    const labels = {
        'nuclear': '核掩体',
        'civil': '人防工程',
        'metro': '地铁/地下通道',
        'underground': '地下商场',
        'parking': '地下停车场'
    };
    return labels[type] || '未知';
}

// 统计计算
function calculateStats() {
    let totalBunkers = 0;
    let totalCapacity = 0;
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        totalBunkers += city.shelters.length;
        city.shelters.forEach(s => totalCapacity += s.capacity);
    }
    
    return {
        totalBunkers,
        coveredCities: Object.keys(SHELTER_DATA).length,
        totalCapacity
    };
}

// 键盘快捷键
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeInfoPanel();
            document.getElementById('guideModal').classList.remove('active');
        }
        if (e.key === 'h' || e.key === 'H') {
            document.getElementById('guideModal').classList.add('active');
        }
        if (e.key === 'c' || e.key === 'C') {
            flyToChina();
        }
    });
    
    const searchInput = document.getElementById('citySearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchCity();
        });
    }
});
