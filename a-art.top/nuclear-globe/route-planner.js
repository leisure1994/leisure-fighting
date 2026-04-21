// ============================================
// 核战争城市自救地球仪 - 智能逃离路线规划算法
// ============================================

class EscapeRoutePlanner {
    constructor(cityData, nuclearTargets) {
        this.cityData = cityData;
        this.nuclearTargets = nuclearTargets;
        this.dangerBuffer = 0.05; // 危险缓冲区 ~5km
    }

    /**
     * 计算最优逃离路线
     * @param {number[]} startPoint - 起点坐标 [lng, lat]
     * @param {string} cityKey - 城市标识
     * @returns {Array} 3条路线方案
     */
    calculateRoutes(startPoint, cityKey) {
        const city = this.cityData[cityKey];
        if (!city) return null;

        const shelters = city.shelters || [];
        const targets = city.nuclearTargets || [];

        // 生成8个方向的候选路线
        const directions = [
            { name: '北', angle: 0 },
            { name: '东北', angle: 45 },
            { name: '东', angle: 90 },
            { name: '东南', angle: 135 },
            { name: '南', angle: 180 },
            { name: '西南', angle: 225 },
            { name: '西', angle: 270 },
            { name: '西北', angle: 315 }
        ];

        // 评估每个方向
        const scoredDirections = directions.map(dir => {
            const endPoint = this.calculateEndPoint(startPoint, dir.angle, 50); // 50km距离
            const score = this.evaluateRoute(startPoint, endPoint, shelters, targets);
            return { ...dir, endPoint, ...score };
        });

        // 按分数排序，选择前3个不同方向的路线
        scoredDirections.sort((a, b) => b.totalScore - a.totalScore);
        
        const selectedRoutes = [];
        const usedAngles = [];

        for (const dir of scoredDirections) {
            // 确保路线方向分散（至少相隔45度）
            const angleConflict = usedAngles.some(angle => 
                Math.abs(angle - dir.angle) < 45 || Math.abs(angle - dir.angle) > 315
            );
            
            if (!angleConflict && selectedRoutes.length < 3) {
                selectedRoutes.push(dir);
                usedAngles.push(dir.angle);
            }
        }

        // 格式化为返回格式
        return selectedRoutes.map((route, index) => ({
            id: `route_${index + 1}`,
            name: this.getRouteName(route.name, route.riskLevel),
            direction: route.name,
            distance: `${route.distance.toFixed(1)}km`,
            time: this.estimateTime(route.distance, route.riskLevel),
            risk: route.riskLevel,
            riskScore: route.riskScore,
            shelterCount: route.shelterCount,
            path: [startPoint, route.endPoint],
            description: this.generateDescription(route),
            recommendations: this.getRecommendations(route)
        }));
    }

    /**
     * 评估单条路线
     */
    evaluateRoute(start, end, shelters, targets) {
        // 1. 计算距离
        const distance = this.calculateDistance(start, end);

        // 2. 评估危险程度（经过核打击目标的数量和距离）
        let riskScore = 0;
        let minTargetDistance = Infinity;

        for (const target of targets) {
            const dist = this.pointToLineDistance(
                [target.lng, target.lat],
                start,
                end
            );
            minTargetDistance = Math.min(minTargetDistance, dist);
            
            if (dist < this.dangerBuffer) {
                riskScore += (this.dangerBuffer - dist) * 1000; // 距离越近风险越高
            }
        }

        // 3. 评估避难所覆盖
        let shelterCount = 0;
        let shelterBonus = 0;

        for (const shelter of shelters) {
            const dist = this.pointToLineDistance(
                [shelter.lng, shelter.lat],
                start,
                end
            );
            if (dist < 0.1) { // 10km范围内
                shelterCount++;
                shelterBonus += 10;
            }
        }

        // 4. 确定风险等级
        let riskLevel;
        if (riskScore === 0 && minTargetDistance > 0.1) {
            riskLevel = 'safe';
        } else if (riskScore < 50 && minTargetDistance > 0.05) {
            riskLevel = 'warning';
        } else {
            riskLevel = 'danger';
        }

        // 5. 综合评分（越高越好）
        const totalScore = shelterBonus - riskScore + (distance * 0.1);

        return {
            distance,
            riskScore,
            riskLevel,
            shelterCount,
            minTargetDistance,
            totalScore
        };
    }

    /**
     * 计算终点坐标（给定方向角和距离）
     */
    calculateEndPoint(start, angleDegrees, distanceKm) {
        const angleRad = (angleDegrees * Math.PI) / 180;
        // 简化计算：1度约等于111km
        const deltaLat = (distanceKm * Math.cos(angleRad)) / 111;
        const deltaLng = (distanceKm * Math.sin(angleRad)) / (111 * Math.cos(start[1] * Math.PI / 180));
        
        return [start[0] + deltaLng, start[1] + deltaLat];
    }

    /**
     * 计算两点间距离（km）
     */
    calculateDistance(p1, p2) {
        const R = 6371; // 地球半径 km
        const dLat = (p2[1] - p1[1]) * Math.PI / 180;
        const dLng = (p2[0] - p1[0]) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(p1[1] * Math.PI/180) * Math.cos(p2[1] * Math.PI/180) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    /**
     * 计算点到线段的距离
     */
    pointToLineDistance(point, lineStart, lineEnd) {
        const x = point[0], y = point[1];
        const x1 = lineStart[0], y1 = lineStart[1];
        const x2 = lineEnd[0], y2 = lineEnd[1];

        const A = x - x1;
        const B = y - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;

        if (lenSq !== 0) {
            param = dot / lenSq;
        }

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = x - xx;
        const dy = y - yy;

        // 转换为km（近似）
        return Math.sqrt(dx * dx + dy * dy) * 111;
    }

    /**
     * 估算通行时间
     */
    estimateTime(distance, riskLevel) {
        // 基础速度：安全路线50km/h，警告40km/h，危险30km/h
        const speed = riskLevel === 'safe' ? 50 : riskLevel === 'warning' ? 40 : 30;
        const hours = distance / speed;
        const mins = Math.round((hours % 1) * 60);
        const hrs = Math.floor(hours);
        
        if (hrs === 0) return `${mins}分钟`;
        return `${hrs}小时${mins > 0 ? mins + '分钟' : ''}`;
    }

    /**
     * 生成路线名称
     */
    getRouteName(direction, riskLevel) {
        const riskPrefix = {
            safe: '安全路线',
            warning: '备用路线',
            danger: '紧急路线'
        };
        return `${riskPrefix[riskLevel]}-${direction}方向`;
    }

    /**
     * 生成路线描述
     */
    generateDescription(route) {
        const parts = [];
        
        if (route.shelterCount > 0) {
            parts.push(`沿途有${route.shelterCount}个避难所`);
        }
        
        if (route.minTargetDistance > 0.1) {
            parts.push('远离核打击目标');
        } else if (route.minTargetDistance < 0.05) {
            parts.push('⚠️ 靠近危险区域');
        }

        return parts.join('，') || '常规撤离路线';
    }

    /**
     * 获取路线建议
     */
    getRecommendations(route) {
        const recs = [];
        
        if (route.riskLevel === 'safe') {
            recs.push('✅ 首选路线，优先考虑');
        } else if (route.riskLevel === 'warning') {
            recs.push('⚠️ 备选方案，注意观察');
        } else {
            recs.push('🚨 紧急情况下使用');
        }

        if (route.shelterCount >= 3) {
            recs.push('🛡️ 避难所充足，安全性高');
        } else if (route.shelterCount === 0) {
            recs.push('⚠️ 沿途避难所较少');
        }

        return recs;
    }
}

// 导出算法类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EscapeRoutePlanner };
}
