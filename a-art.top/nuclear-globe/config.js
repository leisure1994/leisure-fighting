// ============================================
// 核战争城市自救地球仪 - 3D地球数据配置文件
// ============================================

const GLOBE_CONFIG = {
    // 阿里云OSS部署配置
    oss: {
        bucket: 'a-art-top',
        endpoint: 'oss-cn-hangzhou.aliyuncs.com',
        region: 'cn-hangzhou'
    },
    
    // 地图样式配置
    mapStyle: {
        backgroundColor: '#0a0a0a',
        earthColor: '#1a1a2e',
        landColor: '#2d2d44',
        borderColor: '#444466',
        highlightColor: '#ff6b6b',
        shelterColor: '#4ecdc4',
        targetColor: '#ff4757'
    },
    
    // 视图配置
    view: {
        initialRotation: [110, 35], // 中国中心位置
        autoRotate: true,
        autoRotateSpeed: 2
    },
    
    // 数据版本
    version: '2.0',
    lastUpdate: '2026-04-17'
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GLOBE_CONFIG };
}
