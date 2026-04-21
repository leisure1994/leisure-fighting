// 核战争城市自救地球仪 - 逃离路线规划引擎
// 提供三条最优逃离路线，自动绕开核打击目标

class EscapeRouteEngine {
    constructor(viewer, shelterData, nuclearTargets) {
        this.viewer = viewer;
        this.shelterData = shelterData;
        this.nuclearTargets = nuclearTargets;
        this.routeEntities = [];
    }

    // 计算逃离路线
    calculateEscapeRoutes(startPoint, cityId) {
        const routes = [];
        const targets = this.getNuclearTargets(cityId);
        
        // 路线1：北向高速路线
        routes.push({
            id: 'route_north',
            name: '北向高速通道',
            direction: 'north',
            path: this.generatePath(startPoint, 'north', targets),
            distance: 0,
            duration: 0,
            dangerLevel: 'low',
            shelters: [],
            color: '#00ff00'
        });
        
        // 路线2：南向国道路线
        routes.push({
            id: 'route_south',
            name: '南向国道通道',
            direction: 'south',
            path: this.generatePath(startPoint, 'south', targets),
            distance: 0,
            duration: 0,
            dangerLevel: 'medium',
            shelters: [],
            color: '#ffff00'
        });
        
        // 路线3：东西向混合路线
        routes.push({
            id: 'route_east_west',
            name: '东西向省道通道',
            direction: 'east_west',
            path: this.generatePath(startPoint, 'east_west', targets),
            distance: 0,
            duration: 0,
            dangerLevel: 'medium',
            shelters: [],
            color: '#ff8800'
        });
        
        return this.optimizeRoutes(routes, targets);
    }
    
    // 获取城市核打击目标
    getNuclearTargets(cityId) {
        const city = this.shelterData[cityId];
        if (!city) return [];
        
        // 返回目标位置数组
        return city.nuclearTargets || [];
    }
    
    // 生成路径点
    generatePath(start, direction, targets) {
        const points = [start];
        const bufferDistance = 8000; // 8km危险缓冲区
        
        // 基于方向生成路径点
        const step = 0.05; // 约5km步长
        for (let i = 1; i <= 20; i++) {
            let nextPoint;
            
            switch(direction) {
                case 'north':
                    nextPoint = [start[0], start[1] + step * i];
                    break;
                case 'south':
                    nextPoint = [start[0], start[1] - step * i];
                    break;
                case 'east_west':
                    // 东西向蛇形路线
                    const offset = i % 2 === 0 ? step : -step;
                    nextPoint = [start[0] + offset * i, start[1]];
                    break;
            }
            
            // 检查是否进入危险区域，如果是则绕行
            if (this.isInDangerZone(nextPoint, targets, bufferDistance)) {
                nextPoint = this.findDetour(nextPoint, targets, bufferDistance);
            }
            
            points.push(nextPoint);
        }
        
        return points;
    }
    
    // 检查点是否在危险区域
    isInDangerZone(point, targets, buffer) {
        for (const target of targets) {
            const distance = this.calculateDistance(point, target.position);
            if (distance < target.radius + buffer) {
                return true;
            }
        }
        return false;
    }
    
    // 计算两点间距离（简化版，使用欧几里得距离）
    calculateDistance(p1, p2) {
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        return Math.sqrt(dx*dx + dy*dy) * 111000; // 转换为米
    }
    
    // 寻找绕行路线
    findDetour(point, targets, buffer) {
        let safePoint = [...point];
        const step = 0.02; // 约2km
        
        // 尝试向不同方向偏移直到安全
        for (let attempt = 1; attempt <= 8; attempt++) {
            const angle = (attempt * Math.PI) / 4;
            safePoint[0] = point[0] + Math.cos(angle) * step;
            safePoint[1] = point[1] + Math.sin(angle) * step;
            
            if (!this.isInDangerZone(safePoint, targets, buffer)) {
                break;
            }
        }
        
        return safePoint;
    }
    
    // 优化路线（计算距离、时长、沿途避难所）
    optimizeRoutes(routes, targets) {
        return routes.map(route => {
            // 计算总距离
            let totalDistance = 0;
            for (let i = 1; i < route.path.length; i++) {
                totalDistance += this.calculateDistance(route.path[i-1], route.path[i]);
            }
            route.distance = Math.round(totalDistance / 1000); // km
            
            // 估算时间（假设车速60km/h，加上绕行时间）
            route.duration = Math.ceil(route.distance / 60 * 60); // 分钟
            
            // 评估危险等级
            route.dangerLevel = this.assessDangerLevel(route, targets);
            
            // 查找沿途避难所
            route.shelters = this.findRouteShelters(route.path);
            
            return route;
        });
    }
    
    // 评估路线危险等级
    assessDangerLevel(route, targets) {
        let minDistanceToTarget = Infinity;
        
        for (const point of route.path) {
            for (const target of targets) {
                const dist = this.calculateDistance(point, target.position);
                if (dist < minDistanceToTarget) {
                    minDistanceToTarget = dist;
                }
            }
        }
        
        if (minDistanceToTarget > 15000) return 'low';
        if (minDistanceToTarget > 8000) return 'medium';
        return 'high';
    }
    
    // 查找路线沿途避难所
    findRouteShelters(path) {
        const shelters = [];
        const searchRadius = 5000; // 5km搜索半径
        
        for (const cityId in this.shelterData) {
            const city = this.shelterData[cityId];
            if (!city.shelters) continue;
            
            for (const shelter of city.shelters) {
                for (const pathPoint of path) {
                    const dist = this.calculateDistance(
                        pathPoint, 
                        shelter.position || city.center
                    );
                    if (dist < searchRadius) {
                        shelters.push({
                            ...shelter,
                            distance: Math.round(dist),
                            city: city.name
                        });
                        break;
                    }
                }
            }
        }
        
        // 按距离排序
        return shelters.sort((a, b) => a.distance - b.distance).slice(0, 5);
    }
    
    // 在3D地球上渲染路线
    renderRoutes(routes) {
        // 清除旧路线
        this.clearRoutes();
        
        for (const route of routes) {
            // 创建路线实体
            const positions = Cesium.Cartesian3.fromDegreesArray(
                route.path.flat()
            );
            
            const entity = this.viewer.entities.add({
                name: route.name,
                polyline: {
                    positions: positions,
                    width: 5,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.2,
                        color: Cesium.Color.fromCssColorString(route.color)
                    }),
                    clampToGround: true
                },
                label: {
                    text: `${route.name}\n距离: ${route.distance}km\n预计: ${route.duration}分钟`,
                    font: '14px sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(0, -20)
                }
            });
            
            this.routeEntities.push(entity);
        }
    }
    
    // 清除路线
    clearRoutes() {
        for (const entity of this.routeEntities) {
            this.viewer.entities.remove(entity);
        }
        this.routeEntities = [];
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EscapeRouteEngine;
}

console.log('逃离路线规划引擎加载完成');
