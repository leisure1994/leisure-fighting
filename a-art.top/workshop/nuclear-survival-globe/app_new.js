// 核战争城市自救地球仪 - 主应用逻辑（v4.0 新增寻路逃离系统）
// 使用 Cesium.js 构建 3D 地球仪，确保边界正确显示

let viewer;
let shelterEntities = [];
let targetEntities = [];
let routeEntities = [];
let currentCity = null;
let escapeRoutePlanner = null;

// ============ 寻路逃离系统核心类 ============
class EscapeRoutePlanner {
    constructor() {
        this.safeDistance = 50000; // 安全距离：50公里
        this.dangerRadius = 3000;  // 危险半径：3公里
        this.maxRoutes = 3;
    }

    // 计算从指定位置到城外安全区的多条路线
    findEscapeRoutes(cityKey, startPosition, maxRoutes = 3) {
        const city = SHELTER_DATA[cityKey];
        if (!city) {
            console.error('[EscapeRoutePlanner] City not found:', cityKey);
            return null;
        }

        const targets = city.targets || [];
        const shelters = city.shelters || [];
        const cityCenter = city.center;

        // 生成4个基本方向（东、南、西、北）的逃离点
        const directions = [
            { name: '东', angle: 90, key: 'east' },
            { name: '南', angle: 180, key: 'south' },
            { name: '西', angle: 270, key: 'west' },
            { name: '北', angle: 0, key: 'north' }
        ];

        const routes = [];

        directions.forEach((dir, index) => {
            if (routes.length >= maxRoutes) return;

            const route = this.calculateRoute(
                startPosition,
                cityCenter,
                dir,
                targets,
                shelters,
                cityKey
            );

            if (route) {
                routes.push(route);
            }
        });

        // 按安全性排序
        routes.sort((a, b) => this.getSafetyScore(b) - this.getSafetyScore(a));

        return routes.slice(0, maxRoutes);
    }

    // 计算单条路线
    calculateRoute(startPos, cityCenter, direction, targets, shelters, cityKey) {
        const angleRad = (direction.angle * Math.PI) / 180;
        
        // 计算逃离终点（城市外50公里）
        const endPoint = [
            startPos[0] + (Math.sin(angleRad) * this.safeDistance) / 111000,
            startPos[1] + (Math.cos(angleRad) * this.safeDistance) / 111000
        ];

        // 计算中间点（避让核打击目标）
        const waypoints = this.calculateWaypoints(startPos, endPoint, targets);

        // 计算路线距离和时间
        const distance = this.calculateDistance(waypoints);
        const duration = this.estimateDuration(distance);

        // 找出沿途的避难所
        const routeShelters = this.findNearbyShelters(waypoints, shelters);

        // 找出需要绕开的核打击目标
        const nearbyTargets = this.findNearbyTargets(waypoints, targets);

        // 计算安全性评级
        const safetyRating = this.calculateSafetyRating(nearbyTargets, routeShelters);

        return {
            id: `${cityKey}_${direction.key}`,
            direction: direction.name,
            directionKey: direction.key,
            waypoints: waypoints,
            distance: distance,
            duration: duration,
            shelters: routeShelters,
            avoidTargets: nearbyTargets,
            safetyRating: safetyRating,
            description: this.generateRouteDescription(direction.name, distance, duration, safetyRating)
        };
    }

    // 计算避让路径点
    calculateWaypoints(start, end, targets) {
        const waypoints = [start];
        let current = start;

        // 简单实现：沿直线前进，如遇目标则绕行
        const steps = 10;
        const dx = (end[0] - start[0]) / steps;
        const dy = (end[1] - start[1]) / steps;

        for (let i = 1; i < steps; i++) {
            const point = [start[0] + dx * i, start[1] + dy * i];
            
            // 检查是否靠近核打击目标
            const nearbyTarget = this.findDangerousTarget(point, targets);
            if (nearbyTarget) {
                // 绕行该目标
                const detour = this.calculateDetour(point, nearbyTarget, end);
                waypoints.push(detour);
                current = detour;
            } else {
                current = point;
            }
        }

        waypoints.push(end);
        return waypoints;
    }

    // 查找危险目标
    findDangerousTarget(position, targets) {
        for (const target of targets) {
            const dist = this.calculatePointDistance(position, target.position);
            if (dist < this.dangerRadius) {
                return target;
            }
        }
        return null;
    }

    // 计算绕行点
    calculateDetour(point, target, end) {
        // 简单绕行：向侧面偏移
        const dx = end[0] - point[0];
        const dy = end[1] - point[1];
        const perpX = -dy;
        const perpY = dx;
        const len = Math.sqrt(perpX * perpX + perpY * perpY);
        
        const offset = 0.05; // 约5公里偏移
        return [
            point[0] + (perpX / len) * offset,
            point[1] + (perpY / len) * offset
        ];
    }

    // 计算两点距离（米）
    calculatePointDistance(p1, p2) {
        const R = 6371000;
        const lat1 = p1[1] * Math.PI / 180;
        const lat2 = p2[1] * Math.PI / 180;
        const deltaLat = (p2[1] - p1[1]) * Math.PI / 180;
        const deltaLon = (p2[0] - p1[0]) * Math.PI / 180;

        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }

    // 计算路线总距离
    calculateDistance(waypoints) {
        let total = 0;
        for (let i = 0; i < waypoints.length - 1; i++) {
            total += this.calculatePointDistance(waypoints[i], waypoints[i+1]);
        }
        return Math.round(total);
    }

    // 估算行程时间
    estimateDuration(distance) {
        // 假设步行速度5km/h，加上休息时间
        const speed = 5000 / 3600; // 米/秒
        const timeSeconds = distance / speed;
        const timeMinutes = Math.ceil(timeSeconds / 60);
        
        if (timeMinutes < 60) {
            return `${timeMinutes}分钟`;
        } else {
            const hours = Math.floor(timeMinutes / 60);
            const mins = timeMinutes % 60;
            return mins > 0 ? `${hours}小时${mins}分钟` : `${hours}小时`;
        }
    }

    // 查找沿途避难所
    findNearbyShelters(waypoints, shelters) {
        const nearby = [];
        const maxDistance = 5000; // 5公里范围内

        shelters.forEach(shelter => {
            for (const point of waypoints) {
                const dist = this.calculatePointDistance(point, shelter.position);
                if (dist < maxDistance) {
                    nearby.push({
                        ...shelter,
                        distance: Math.round(dist)
                    });
                    break;
                }
            }
        });

        return nearby.sort((a, b) => a.distance - b.distance).slice(0, 3);
    }

    // 查找附近目标
    findNearbyTargets(waypoints, targets) {
        const nearby = [];
        const alertDistance = 10000; // 10公里预警范围

        targets.forEach(target => {
            let minDist = Infinity;
            for (const point of waypoints) {
                const dist = this.calculatePointDistance(point, target.position);
                if (dist < minDist) minDist = dist;
            }
            if (minDist < alertDistance) {
                nearby.push({
                    ...target,
                    distance: Math.round(minDist)
                });
            }
        });

        return nearby.sort((a, b) => a.distance - b.distance);
    }

    // 计算安全性评级
    calculateSafetyRating(nearbyTargets, routeShelters) {
        let score = 100;

        // 扣除目标威胁分数
        nearbyTargets.forEach(target => {
            if (target.distance < 3000) score -= 30;
            else if (target.distance < 5000) score -= 20;
            else if (target.distance < 8000) score -= 10;
        });

        // 增加避难所保护分数
        score += routeShelters.length * 10;

        if (score >= 80) return { level: 'high', text: '高', color: '#2ed573' };
        if (score >= 50) return { level: 'medium', text: '中', color: '#ffa502' };
        return { level: 'low', text: '低', color: '#ff4757' };
    }

    // 获取安全分数（用于排序）
    getSafetyScore(route) {
        const ratings = { high: 3, medium: 2, low: 1 };
        return ratings[route.safetyRating.level] || 0;
    }

    // 生成路线描述
    generateRouteDescription(direction, distance, duration, safety) {
        return `向${direction}方向逃离，全程约${(distance/1000).toFixed(1)}公里，预计耗时${duration}，安全性${safety.text}`;
    }
}

// ============ 初始化 Cesium 地球仪 ============
function initGlobe() {
    console.log('[Nuclear Globe] Starting initialization v4.0...');
    
    // 初始化寻路系统
    escapeRoutePlanner = new EscapeRoutePlanner();
    
    // 设置 Cesium Ion Token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE3ZDAxZS1jZDZlLTQ3M2ItYjBlZC0wY2Y3ODAzOTYwM2QiLCJpZCI6NjEwMjYsImlhdCI6MTcyODI4MjE1OH0.KfKywGAydzCeL6z7eaoU69F2MoCz1K3nXW2OjXh0Pxs';
    
    try {
        viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: new Cesium.BingMapsImageryProvider({
                key: 'Agy2p8F1tRE4dYK_Qb7gHY_5tIp0OUrsTqdD50B_RhI4pZP4nB0vFWL8f6Jygw0E',
                mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
            }),
            terrainProvider: Cesium.createWorldTerrain({
                requestWaterMask: true,
                requestVertexNormals: true
            }),
            baseLayerPicker: true,
            geocoder: true,
            homeButton: true,
            sceneModePicker: true,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false
        });
    } catch (e) {
        console.error('[Nuclear Globe] Failed to create viewer:', e);
        viewer = new Cesium.Viewer('cesiumContainer', {
            imageryProvider: new Cesium.TileMapServiceImageryProvider({
                url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
            }),
            terrainProvider: new Cesium.EllipsoidTerrainProvider(),
            baseLayerPicker: true,
            geocoder: false,
            homeButton: true,
            sceneModePicker: true,
            navigationHelpButton: false,
            animation: false,
            timeline: false
        });
    }
    
    setupVisualEffects();
    loadWorldBoundaries();
    loadChinaBoundaries();
    loadCityMarkers();
    
    if (typeof SHELTER_DATA !== 'undefined') {
        generateShelterEntities();
        generateTargetEntities();
        populateCityList();
        updateStats();
    }
    
    setupEventHandlers();
    flyToChina();
    
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }, 2000);
    
    console.log('[Nuclear Globe] Initialization complete!');
}

// ============ 生成核打击目标标记 ============
function generateTargetEntities() {
    targetEntities = [];
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        if (!city.targets) continue;
        
        city.targets.forEach(target => {
            const color = getTargetTypeColor(target.type);
            const entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    target.position[0],
                    target.position[1],
                    100
                ),
                billboard: {
                    image: createTargetMarkerImage(color),
                    scale: 0.6,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },
                label: {
                    text: target.name,
                    font: 'bold 12px "Microsoft YaHei", sans-serif',
                    fillColor: Cesium.Color.fromCssColorString('#ff4757'),
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, -30),
                    show: false
                },
                properties: {
                    target: target,
                    city: city.name,
                    cityId: cityId
                }
            });
            
            targetEntities.push({
                entity: entity,
                target: target,
                city: city,
                cityId: cityId
            });
        });
    }
    
    console.log('[Nuclear Globe] Generated', targetEntities.length, 'target markers');
}

// ============ 创建目标标记图像 ============
function createTargetMarkerImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // 危险警告图标 - 三角形
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(28, 28);
    ctx.lineTo(4, 28);
    ctx.closePath();
    ctx.fill();
    
    // 白色边框
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(16, 4);
    ctx.lineTo(28, 28);
    ctx.lineTo(4, 28);
    ctx.closePath();
    ctx.stroke();
    
    // 感叹号
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', 16, 20);
    
    return canvas.toDataURL();
}

// ============ 显示逃离路线 ============
function showEscapeRoutes(cityKey) {
    const city = SHELTER_DATA[cityKey];
    if (!city) return;

    // 使用城市中心作为起点
    const startPosition = city.center;
    
    // 计算逃离路线
    const routes = escapeRoutePlanner.findEscapeRoutes(cityKey, startPosition, 3);
    if (!routes || routes.length === 0) {
        alert('无法生成逃离路线，请稍后重试');
        return;
    }

    // 清除之前的路线
    clearRouteEntities();

    // 显示路线面板
    showRoutePanel(routes, city.name);

    // 在地图上绘制路线
    routes.forEach((route, index) => {
        drawRouteOnMap(route, index);
    });
}

// ============ 在地图上绘制路线 ============
function drawRouteOnMap(route, index) {
    const colors = ['#2ed573', '#ffa502', '#3742fa'];
    const color = colors[index % colors.length];
    
    // 创建路线点
    const positions = route.waypoints.map(wp => 
        Cesium.Cartesian3.fromDegrees(wp[0], wp[1], 100)
    );
    
    // 添加路线实体
    const routeEntity = viewer.entities.add({
        polyline: {
            positions: positions,
            width: 4,
            material: new Cesium.PolylineGlowMaterialProperty({
                color: Cesium.Color.fromCssColorString(color),
                glowPower: 0.5
            }),
            clampToGround: true
        }
    });
    routeEntities.push(routeEntity);
    
    // 添加起点标记
    const startEntity = viewer.entities.add({
        position: positions[0],
        point: {
            pixelSize: 12,
            color: Cesium.Color.fromCssColorString(color),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
        },
        label: {
            text: `路线${index + 1}(${route.direction})`,
            font: 'bold 14px "Microsoft YaHei"',
            fillColor: Cesium.Color.fromCssColorString(color),
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            pixelOffset: new Cesium.Cartesian2(0, -20)
        }
    });
    routeEntities.push(startEntity);
    
    // 添加终点标记
    const endEntity = viewer.entities.add({
        position: positions[positions.length - 1],
        point: {
            pixelSize: 10,
            color: Cesium.Color.fromCssColorString(color),
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
        },
        label: {
            text: '安全区',
            font: 'bold 12px "Microsoft YaHei"',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            pixelOffset: new Cesium.Cartesian2(0, -15)
        }
    });
    routeEntities.push(endEntity);
}

// ============ 清除路线实体 ============
function clearRouteEntities() {
    routeEntities.forEach(entity => {
        viewer.entities.remove(entity);
    });
    routeEntities = [];
}

// ============ 显示路线面板 ============
function showRoutePanel(routes, cityName) {
    let panel = document.getElementById('routePanel');
    if (!panel) {
        panel = createRoutePanel();
    }
    
    const titleEl = document.getElementById('routePanelTitle');
    if (titleEl) titleEl.textContent = `${cityName} - 逃离路线方案`;
    
    const contentEl = document.getElementById('routePanelContent');
    if (contentEl) {
        contentEl.innerHTML = routes.map((route, index) => `
            <div class="route-card" style="border-left: 4px solid ${route.safetyRating.color}; margin: 10px 0; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0; color: ${route.safetyRating.color};">方案 ${index + 1}: 向${route.direction}逃离</h4>
                    <span class="safety-badge" style="background: ${route.safetyRating.color}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${route.safetyRating.text}</span>
                </div>
                <div style="font-size: 13px; color: #ccc; line-height: 1.6;">
                    <p style="margin: 5px 0;"><strong>📏 距离:</strong> ${(route.distance/1000).toFixed(1)} 公里</p>
                    <p style="margin: 5px 0;"><strong>⏱️ 预计时间:</strong> ${route.duration}</p>
                    <p style="margin: 5px 0;"><strong>🏠 沿途避难所:</strong> ${route.shelters.length > 0 ? route.shelters.map(s => s.name).join('、') : '无'}</p>
                    ${route.avoidTargets.length > 0 ? `
                    <p style="margin: 5px 0; color: #ff6b6b;"><strong>⚠️ 需绕开:</strong> ${route.avoidTargets.map(t => `${t.name}(${t.distance}m)`).join('、')}</p>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    
    panel.classList.add('active');
}

// ============ 创建路线面板 ============
function createRoutePanel() {
    const panel = document.createElement('div');
    panel.id = 'routePanel';
    panel.className = 'info-panel';
    panel.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        width: 400px;
        max-height: 80vh;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid #333;
        border-radius: 12px;
        padding: 20px;
        color: white;
        z-index: 1000;
        overflow-y: auto;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;
    panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            <h3 id="routePanelTitle" style="margin: 0; color: #ff4757;">逃离路线方案</h3>
            <button onclick="closeRoutePanel()" style="background: none; border: none; color: #999; font-size: 20px; cursor: pointer;">&times;</button>
        </div>
        <div id="routePanelContent"></div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #333; font-size: 12px; color: #888;">
            <p>💡 提示：选择安全性高的路线，沿途可在避难所休息补充物资</p>
        </div>
    `;
    document.body.appendChild(panel);
    return panel;
}

// ============ 关闭路线面板 ============
function closeRoutePanel() {
    const panel = document.getElementById('routePanel');
    if (panel) {
        panel.classList.remove('active');
        panel.style.transform = 'translateX(120%)';
    }
    clearRouteEntities();
}

// ============ 获取目标类型颜色 ============
function getTargetTypeColor(type) {
    const colors = {
        'water': '#3498db',
        'power': '#e74c3c',
        'transport': '#f39c12',
        'communication': '#9b59b6',
        'military': '#2c3e50'
    };
    return colors[type] || '#e74c3c';
}

// ============ 视觉效果设置 ============
function setupVisualEffects() {
    const scene = viewer.scene;
    const globe = scene.globe;
    
    scene.backgroundColor = Cesium.Color.fromCssColorString('#0a0a1a');
    globe.enableLighting = true;
    globe.lightingFadeOutDistance = 100000;
    globe.lightingFadeInDistance = 10000000;
    
    scene.skyAtmosphere.show = true;
    scene.skyAtmosphere.hueShift = 0.0;
    scene.skyAtmosphere.saturationShift = -0.3;
    scene.skyAtmosphere.brightnessShift = -0.1;
    
    scene.fog.enabled = true;
    scene.fog.density = 0.0001;
    scene.fog.minimumBrightness = 0.05;
    
    viewer.selectionIndicator.show = false;
    viewer.infoBox.show = false;
    
    scene.screenSpaceCameraController.minimumZoomDistance = 1000;
    scene.screenSpaceCameraController.maximumZoomDistance = 50000000;
    scene.screenSpaceCameraController.enableTilt = true;
    
    scene.highDynamicRange = true;
}

// ============ 加载世界主要国家边界 ============
function loadWorldBoundaries() {
    const countries = [
        {
            name: "中国",
            color: Cesium.Color.RED,
            width: 4,
            coords: [
                [73.5, 35.0], [73.5, 40.0], [78.0, 42.0], [80.0, 42.0], 
                [85.0, 45.0], [90.0, 48.0], [95.0, 49.0], [100.0, 50.0],
                [105.0, 50.0], [110.0, 49.0], [115.0, 47.0], [120.0, 50.0],
                [125.0, 53.0], [130.0, 48.0], [135.0, 48.0], [135.0, 40.0],
                [130.0, 42.0], [125.0, 40.0], [122.0, 37.0], [120.0, 35.0],
                [118.0, 33.0], [116.0, 30.0], [114.0, 28.0], [110.0, 25.0],
                [108.0, 23.0], [105.0, 22.0], [100.0, 20.0], [98.0, 22.0],
                [95.0, 25.0], [90.0, 25.0], [85.0, 22.0], [80.0, 25.0],
                [78.0, 30.0], [75.0, 32.0], [73.5, 35.0]
            ]
        }
    ];
    
    countries.forEach(country => {
        const positions = country.coords.map(coord => 
            Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 1000)
        );
        
        const isChina = country.name === '中国';
        
        viewer.entities.add({
            polyline: {
                positions: positions,
                width: isChina ? 6 : country.width,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: isChina ? 0.5 : 0.3,
                    color: country.color
                }),
                clampToGround: true
            }
        });
        
        if (isChina) {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(105, 38, 200000),
                label: {
                    text: '中国',
                    font: 'bold 24px "Microsoft YaHei", sans-serif',
                    fillColor: Cesium.Color.RED,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 4,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER
                }
            });
        }
    });
}

// ============ 加载中国省级边界 ============
function loadChinaBoundaries() {
    if (typeof CHINA_PROVINCES_GEOJSON === 'undefined') return;
    
    const provinces = CHINA_PROVINCES_GEOJSON.features;
    
    provinces.forEach(province => {
        const coords = province.geometry.coordinates[0];
        const positions = coords.map(coord => 
            Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 500)
        );
        
        viewer.entities.add({
            polyline: {
                positions: positions,
                width: 2,
                material: new Cesium.PolylineGlowMaterialProperty({
                    color: Cesium.Color.fromCssColorString('#ffd700'),
                    glowPower: 0.3
                }),
                clampToGround: true
            }
        });
    });
}

// ============ 加载城市标记 ============
function loadCityMarkers() {
    const cities = [
        {name: "北京", pos: [116.4074, 39.9042], type: "capital", size: 15},
        {name: "上海", pos: [121.4737, 31.2304], type: "capital", size: 15},
        {name: "广州", pos: [113.2644, 23.1291], type: "capital", size: 12},
        {name: "深圳", pos: [114.0579, 22.5431], type: "city", size: 12}
    ];
    
    cities.forEach(city => {
        const color = city.type === 'capital' ? Cesium.Color.fromCssColorString('#ff4757') : 
                      Cesium.Color.fromCssColorString('#2ed573');
        
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(city.pos[0], city.pos[1], 1000),
            point: {
                pixelSize: city.size,
                color: color,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2
            },
            label: {
                text: city.name,
                font: city.type === 'capital' ? 'bold 16px "Microsoft YaHei"' : '14px "Microsoft YaHei"',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -10)
            }
        });
    });
}

// ============ 生成避难所标记 ============
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
                    100
                ),
                billboard: {
                    image: createMarkerImage(color),
                    scale: 0.8,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                },
                label: {
                    text: shelter.name,
                    font: 'bold 13px "Microsoft YaHei"',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 3,
                    show: false
                },
                properties: {
                    shelter: shelter,
                    city: city.name,
                    cityId: cityId
                }
            });
            
            shelterEntities.push({ entity, shelter, city, cityId });
        });
    }
}

// ============ 创建避难所标记图像 ============
function createMarkerImage(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 36;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(18, 18, 0, 18, 18, 18);
    gradient.addColorStop(0, color + 'ff');
    gradient.addColorStop(0.5, color + '80');
    gradient.addColorStop(1, color + '00');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(18, 18, 18, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(18, 18, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(18, 18, 8, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(18, 26);
    ctx.lineTo(12, 40);
    ctx.lineTo(18, 34);
    ctx.lineTo(24, 40);
    ctx.closePath();
    ctx.fill();
    
    return canvas.toDataURL();
}

// ============ UI 函数 ============
function populateCityList() {
    const cityListEl = document.getElementById('cityList');
    if (!cityListEl) return;
    
    cityListEl.innerHTML = '';
    
    const majorCities = ['beijing', 'shanghai', 'guangzhou', 'shenzhen'];
    
    majorCities.forEach(cityId => {
        if (SHELTER_DATA[cityId]) {
            const city = SHELTER_DATA[cityId];
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.innerHTML = `
                <span>${city.name}</span>
                <span class="count">${city.shelters.length}个</span>
            `;
            cityItem.onclick = () => flyToCity(cityId);
            cityListEl.appendChild(cityItem);
        }
    });
}

function updateStats() {
    const stats = calculateStats();
    const totalBunkersEl = document.getElementById('totalBunkers');
    const totalCapacityEl = document.getElementById('totalCapacity');
    
    if (totalBunkersEl) totalBunkersEl.textContent = stats.totalBunkers;
    if (totalCapacityEl) totalCapacityEl.textContent = Math.floor(stats.totalCapacity / 10000) + '万+';
}

function calculateStats() {
    let totalBunkers = 0;
    let totalCapacity = 0;
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        totalBunkers += city.shelters.length;
        city.shelters.forEach(shelter => {
            totalCapacity += parseInt(shelter.capacity) || 10000;
        });
    }
    
    return { totalBunkers, totalCapacity };
}

// ============ 相机控制 ============
function flyToChina() {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(105.0, 35.0, 6000000),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-55),
            roll: 0
        },
        duration: 2.5
    });
}

function flyToCity(cityId) {
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

function showCityLabels(cityId) {
    shelterEntities.forEach(item => {
        item.entity.label.show = (item.cityId === cityId);
    });
    targetEntities.forEach(item => {
        item.entity.label.show = (item.cityId === cityId);
    });
}

// ============ 事件处理 ============
function setupEventHandlers() {
    viewer.screenSpaceEventHandler.setInputAction(function(movement) {
        const pickedObject = viewer.scene.pick(movement.position);
        
        if (Cesium.defined(pickedObject) && pickedObject.id) {
            const entity = pickedObject.id;
            if (entity.properties) {
                if (entity.properties.shelter) {
                    showShelterInfo(entity.properties.shelter.getValue(), entity.properties.city.getValue());
                } else if (entity.properties.target) {
                    showTargetInfo(entity.properties.target.getValue(), entity.properties.city.getValue());
                }
            }
        } else {
            closeInfoPanel();
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    
    viewer.camera.changed.addEventListener(function() {
        const height = viewer.camera.positionCartographic.height;
        
        shelterEntities.forEach(item => {
            item.entity.label.show = (height < 80000 && currentCity && item.cityId === currentCity);
        });
        targetEntities.forEach(item => {
            item.entity.label.show = (height < 80000 && currentCity && item.cityId === currentCity);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeInfoPanel();
            closeRoutePanel();
            closeGuide();
        }
    });
}

// ============ 显示避难所信息 ============
function showShelterInfo(shelter, cityName) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    
    document.getElementById('infoTitle').textContent = shelter.name;
    
    const typeLabel = getTypeLabel(shelter.type);
    const typeColor = getTypeColor(shelter.type);
    
    // 添加寻路按钮到信息面板
    const escapeButtonHtml = currentCity ? `
        <button onclick="showEscapeRoutes('${currentCity}')" style="
            background: linear-gradient(135deg, #ff4757, #ff6b81);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            margin-top: 15px;
            width: 100%;
            font-weight: bold;
            transition: all 0.3s;
        " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            🚨 寻路逃离
        </button>
    ` : '';
    
    document.getElementById('infoContent').innerHTML = `
        <div style="margin-bottom: 15px;">
            <span style="background: ${typeColor}30; color: ${typeColor}; border: 1px solid ${typeColor}; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                ${typeLabel}
            </span>
        </div>
        <div style="font-size: 13px; line-height: 1.8; color: #ccc;">
            <p><strong>📍 地址:</strong> ${shelter.address || '暂无详细地址'}</p>
            <p><strong>👥 容量:</strong> ${shelter.capacity || '未知'}</p>
            <p><strong>🛡️ 防护等级:</strong> ${shelter.level || '核6级'}</p>
            <p><strong>🔧 设施:</strong> ${shelter.facilities || '通风系统、应急供电、滤毒装置'}</p>
            <p><strong>🚇 交通:</strong> ${shelter.access || '可通过地铁或主要道路到达'}</p>
            <p><strong>📝 说明:</strong> ${shelter.description || ''}</p>
        </div>
        ${escapeButtonHtml}
    `;
    
    panel.classList.add('active');
}

// ============ 显示目标信息 ============
function showTargetInfo(target, cityName) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    
    const typeLabel = getTargetTypeLabel(target.type);
    const typeColor = getTargetTypeColor(target.type);
    
    document.getElementById('infoTitle').textContent = target.name;
    document.getElementById('infoContent').innerHTML = `
        <div style="margin-bottom: 15px;">
            <span style="background: ${typeColor}30; color: ${typeColor}; border: 1px solid ${typeColor}; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                ${typeLabel}
            </span>
            <span style="background: #ff475730; color: #ff4757; border: 1px solid #ff4757; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-left: 8px;">
                ⚠️ 潜在打击目标
            </span>
        </div>
        <div style="font-size: 13px; line-height: 1.8; color: #ccc;">
            <p><strong>📍 地址:</strong> ${target.address || '暂无详细地址'}</p>
            <p><strong>📝 说明:</strong> ${target.description || ''}</p>
            <div style="margin-top: 15px; padding: 10px; background: rgba(255, 71, 87, 0.1); border-radius: 8px; border-left: 3px solid #ff4757;">
                <p style="margin: 0; color: #ff6b6b; font-size: 12px;">
                    ⚠️ 警告：此设施为潜在核打击目标，核战爆发时应远离此区域至少3公里
                </p>
            </div>
        </div>
    `;
    
    panel.classList.add('active');
}

function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    if (panel) panel.classList.remove('active');
}

function closeGuide() {
    const modal = document.getElementById('guideModal');
    if (modal) modal.classList.remove('active');
}

// ============ 辅助函数 ============
function getTypeColor(type) {
    const colors = {
        'bunker': '#ff4757',
        'shelter': '#ffa502',
        'metro': '#2ed573',
        'underground': '#3742fa'
    };
    return colors[type] || '#ffa502';
}

function getTypeLabel(type) {
    const labels = {
        'bunker': '核掩体',
        'shelter': '人防工程',
        'metro': '地铁/地下通道',
        'underground': '地下设施'
    };
    return labels[type] || '人防工程';
}

function getTargetTypeLabel(type) {
    const labels = {
        'water': '供水设施',
        'power': '电力设施',
        'transport': '交通枢纽',
        'communication': '通信设施',
        'military': '军事设施'
    };
    return labels[type] || '战略设施';
}

// ============ 页面加载初始化 ============
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Cesium === 'undefined') {
        document.getElementById('loading').innerHTML = '<p style="color: #ff4757;">地图库加载失败，请刷新页面重试</p>';
        return;
    }
    initGlobe();
});
