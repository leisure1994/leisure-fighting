// 核战争城市自救地球仪 - 主应用逻辑（修复版 v4.0 - 新增目标标记与寻路系统）
// 使用 Cesium.js 构建 3D 地球仪，确保边界正确显示

let viewer;
let shelterEntities = [];
let targetEntities = [];
let currentCity = null;
let escapeRoutePlanner = null;
let routeEntities = [];
let selectedStartPoint = null;

// ============ 初始化 Cesium 地球仪 ============
function initGlobe() {
    console.log('[Nuclear Globe] Starting initialization v4.0...');
    
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
        console.error('[Nuclear Globe] Failed to create viewer with Bing, trying fallback...', e);
        
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
    
    // 初始化寻路规划器
    escapeRoutePlanner = new EscapeRoutePlanner(viewer);
    
    setupEventHandlers();
    setupEscapeRouteUI();
    
    flyToChina();
    
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }, 2000);
    
    console.log('[Nuclear Globe] Initialization complete! v4.0 with targets and escape routes');
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
    console.log('[Nuclear Globe] Loading world boundaries...');
    
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
        },
        {
            name: "俄罗斯",
            color: Cesium.Color.YELLOW,
            width: 3,
            coords: [
                [27.0, 55.0], [30.0, 60.0], [35.0, 65.0], [40.0, 67.0],
                [50.0, 70.0], [60.0, 72.0], [70.0, 72.0], [80.0, 75.0],
                [90.0, 75.0], [100.0, 75.0], [110.0, 75.0], [120.0, 72.0],
                [130.0, 70.0], [140.0, 65.0], [150.0, 60.0], [160.0, 58.0],
                [170.0, 60.0], [180.0, 65.0], [180.0, 70.0], [175.0, 72.0],
                [170.0, 75.0], [160.0, 77.0], [150.0, 75.0], [140.0, 72.0],
                [130.0, 70.0], [120.0, 68.0], [110.0, 66.0], [100.0, 65.0],
                [90.0, 62.0], [80.0, 60.0], [70.0, 58.0], [60.0, 55.0],
                [50.0, 52.0], [40.0, 50.0], [30.0, 52.0], [27.0, 55.0]
            ]
        },
        {
            name: "美国",
            color: Cesium.Color.YELLOW,
            width: 3,
            coords: [
                [-125.0, 49.0], [-120.0, 49.0], [-115.0, 49.0], [-110.0, 49.0],
                [-105.0, 49.0], [-100.0, 49.0], [-95.0, 49.0], [-90.0, 48.0],
                [-85.0, 47.0], [-82.0, 45.0], [-80.0, 42.0], [-77.0, 39.0],
                [-75.0, 36.0], [-73.0, 33.0], [-70.0, 30.0], [-68.0, 28.0],
                [-66.0, 25.0], [-80.0, 25.0], [-95.0, 25.0], [-105.0, 27.0],
                [-110.0, 29.0], [-115.0, 31.0], [-117.0, 33.0], [-120.0, 35.0],
                [-123.0, 39.0], [-125.0, 45.0], [-125.0, 49.0]
            ]
        },
        {
            name: "加拿大",
            color: Cesium.Color.YELLOW,
            width: 3,
            coords: [
                [-140.0, 60.0], [-130.0, 65.0], [-120.0, 68.0], [-110.0, 70.0],
                [-100.0, 72.0], [-90.0, 74.0], [-80.0, 75.0], [-70.0, 77.0],
                [-60.0, 78.0], [-50.0, 77.0], [-52.0, 60.0], [-55.0, 50.0],
                [-60.0, 48.0], [-65.0, 45.0], [-70.0, 43.0], [-75.0, 42.0],
                [-80.0, 42.0], [-85.0, 45.0], [-90.0, 48.0], [-95.0, 50.0],
                [-100.0, 52.0], [-110.0, 55.0], [-120.0, 56.0], [-130.0, 58.0],
                [-140.0, 60.0]
            ]
        },
        {
            name: "巴西",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [-74.0, 5.0], [-70.0, 2.0], [-65.0, 0.0], [-60.0, -5.0],
                [-55.0, -10.0], [-50.0, -15.0], [-48.0, -20.0], [-45.0, -25.0],
                [-40.0, -30.0], [-35.0, -25.0], [-34.0, -20.0], [-35.0, -15.0],
                [-38.0, -10.0], [-40.0, -5.0], [-45.0, 0.0], [-50.0, 2.0],
                [-55.0, 4.0], [-60.0, 5.0], [-65.0, 5.0], [-70.0, 5.0],
                [-74.0, 5.0]
            ]
        },
        {
            name: "印度",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [68.0, 23.0], [70.0, 25.0], [72.0, 27.0], [75.0, 30.0],
                [77.0, 32.0], [79.0, 33.0], [80.0, 35.0], [82.0, 33.0],
                [85.0, 30.0], [88.0, 27.0], [90.0, 25.0], [92.0, 24.0],
                [93.0, 26.0], [94.0, 28.0], [95.0, 26.0], [94.0, 24.0],
                [92.0, 22.0], [90.0, 20.0], [88.0, 18.0], [85.0, 16.0],
                [82.0, 15.0], [79.0, 15.0], [76.0, 16.0], [73.0, 18.0],
                [70.0, 20.0], [68.0, 23.0]
            ]
        },
        {
            name: "澳大利亚",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [113.0, -11.0], [120.0, -11.0], [125.0, -12.0], [130.0, -15.0],
                [135.0, -20.0], [140.0, -25.0], [145.0, -30.0], [150.0, -35.0],
                [153.0, -38.0], [150.0, -40.0], [145.0, -38.0], [140.0, -35.0],
                [135.0, -32.0], [130.0, -30.0], [125.0, -28.0], [120.0, -25.0],
                [115.0, -20.0], [113.0, -15.0], [113.0, -11.0]
            ]
        },
        {
            name: "日本",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [129.0, 31.0], [132.0, 33.0], [135.0, 35.0], [138.0, 37.0],
                [141.0, 39.0], [144.0, 41.0], [146.0, 43.0], [146.0, 45.0],
                [144.0, 45.0], [142.0, 43.0], [140.0, 41.0], [138.0, 39.0],
                [136.0, 37.0], [134.0, 35.0], [132.0, 33.0], [130.0, 31.0],
                [129.0, 31.0]
            ]
        },
        {
            name: "英国",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [-8.0, 50.0], [-6.0, 52.0], [-4.0, 54.0], [-2.0, 56.0],
                [0.0, 58.0], [2.0, 58.0], [2.0, 54.0], [1.0, 52.0],
                [0.0, 50.0], [-2.0, 50.0], [-5.0, 50.0], [-8.0, 50.0]
            ]
        },
        {
            name: "法国",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [-5.0, 48.0], [-2.0, 50.0], [2.0, 51.0], [5.0, 51.0],
                [8.0, 49.0], [8.0, 46.0], [7.0, 44.0], [5.0, 43.0],
                [3.0, 42.0], [0.0, 42.0], [-3.0, 43.0], [-5.0, 45.0],
                [-5.0, 48.0]
            ]
        },
        {
            name: "德国",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [5.0, 47.0], [7.0, 49.0], [10.0, 51.0], [13.0, 54.0],
                [15.0, 55.0], [15.0, 51.0], [14.0, 49.0], [12.0, 48.0],
                [10.0, 47.0], [8.0, 47.0], [6.0, 47.0], [5.0, 47.0]
            ]
        },
        {
            name: "意大利",
            color: Cesium.Color.YELLOW,
            width: 2,
            coords: [
                [7.0, 37.0], [8.0, 39.0], [10.0, 41.0], [12.0, 43.0],
                [14.0, 44.0], [15.0, 42.0], [16.0, 40.0], [15.0, 38.0],
                [13.0, 37.0], [11.0, 37.0], [9.0, 37.0], [7.0, 37.0]
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
                polyline: {
                    positions: positions,
                    width: 3,
                    material: new Cesium.ColorMaterialProperty(Cesium.Color.RED),
                    clampToGround: true
                }
            });
            
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
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    scaleByDistance: new Cesium.NearFarScalar(500000, 2.0, 20000000, 0.5)
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
        
        const center = province.properties.center;
        const majorProvinces = ['北京市', '上海市', '广东省', '江苏省', '浙江省', '山东省', '河南省', '四川省', '湖北省', '湖南省', '河北省', '福建省'];
        
        if (majorProvinces.includes(province.properties.name)) {
            viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(center[0], center[1], 10000),
                label: {
                    text: province.properties.name.replace('省', '').replace('市', '').replace('自治区', '').replace('特别行政区', ''),
                    font: 'bold 14px "Microsoft YaHei", sans-serif',
                    fillColor: Cesium.Color.fromCssColorString('#ffd700'),
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 3,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    scaleByDistance: new Cesium.NearFarScalar(100000, 1.2, 3000000, 0.3),
                    translucencyByDistance: new Cesium.NearFarScalar(100000, 1.0, 5000000, 0.0)
                }
            });
        }
    });
}

// ============ 加载城市标记 ============
function loadCityMarkers() {
    const cities = [
        {name: "北京", pos: [116.4074, 39.9042], type: "capital", size: 15},
        {name: "上海", pos: [121.4737, 31.2304], type: "capital", size: 15},
        {name: "天津", pos: [117.2008, 39.0842], type: "capital", size: 12},
        {name: "重庆", pos: [106.5516, 29.5630], type: "capital", size: 12},
        {name: "广州", pos: [113.2644, 23.1291], type: "capital", size: 12},
        {name: "深圳", pos: [114.0579, 22.5431], type: "city", size: 12},
        {name: "成都", pos: [104.0665, 30.5723], type: "capital", size: 12},
        {name: "武汉", pos: [114.3054, 30.5928], type: "capital", size: 12},
        {name: "西安", pos: [108.9398, 34.3416], type: "capital", size: 12},
        {name: "杭州", pos: [120.1551, 30.2741], type: "capital", size: 12},
        {name: "南京", pos: [118.7969, 32.0603], type: "capital", size: 12},
        {name: "郑州", pos: [113.6253, 34.7466], type: "capital", size: 10},
        {name: "长沙", pos: [112.9388, 28.2282], type: "capital", size: 10},
        {name: "沈阳", pos: [123.4315, 41.2976], type: "capital", size: 10},
        {name: "济南", pos: [117.0208, 36.6683], type: "capital", size: 10},
        {name: "哈尔滨", pos: [126.6617, 45.7423], type: "capital", size: 10},
        {name: "长春", pos: [125.3235, 43.8171], type: "capital", size: 10},
        {name: "石家庄", pos: [114.5149, 38.0423], type: "capital", size: 10},
        {name: "太原", pos: [112.5624, 37.8734], type: "capital", size: 10},
        {name: "合肥", pos: [117.2849, 31.8612], type: "capital", size: 10},
        {name: "南昌", pos: [115.8540, 28.6742], type: "capital", size: 10},
        {name: "福州", pos: [119.2951, 26.0998], type: "capital", size: 10},
        {name: "贵阳", pos: [106.6302, 26.6477], type: "capital", size: 10},
        {name: "昆明", pos: [102.7100, 25.0453], type: "capital", size: 10},
        {name: "拉萨", pos: [91.1172, 29.6469], type: "capital", size: 10},
        {name: "兰州", pos: [103.8263, 36.0594], type: "capital", size: 10},
        {name: "西宁", pos: [101.7802, 36.6209], type: "capital", size: 10},
        {name: "银川", pos: [106.2591, 38.4720], type: "capital", size: 10},
        {name: "乌鲁木齐", pos: [87.6168, 43.8256], type: "capital", size: 10},
        {name: "南宁", pos: [108.3275, 22.8152], type: "capital", size: 10},
        {name: "海口", pos: [110.3492, 20.0174], type: "capital", size: 10},
        {name: "呼和浩特", pos: [111.7656, 43.8398], type: "capital", size: 10},
        {name: "大连", pos: [121.6147, 38.9140], type: "city", size: 8},
        {name: "青岛", pos: [120.3826, 36.0671], type: "city", size: 8},
        {name: "宁波", pos: [121.5500, 29.8750], type: "city", size: 8},
        {name: "厦门", pos: [118.0894, 24.4798], type: "city", size: 8},
        {name: "苏州", pos: [120.5853, 31.2989], type: "city", size: 8},
        {name: "无锡", pos: [120.3119, 31.4912], type: "city", size: 8},
        {name: "佛山", pos: [113.1214, 23.0215], type: "city", size: 8},
        {name: "东莞", pos: [113.7518, 23.0207], type: "city", size: 8},
        {name: "温州", pos: [120.6994, 27.9943], type: "city", size: 6},
        {name: "徐州", pos: [117.2841, 34.2058], type: "city", size: 6},
        {name: "南通", pos: [120.8943, 31.9802], type: "city", size: 6},
        {name: "烟台", pos: [121.4481, 37.4635], type: "city", size: 6},
        {name: "唐山", pos: [118.1802, 39.6309], type: "city", size: 6},
        {name: "洛阳", pos: [112.4345, 34.6197], type: "city", size: 6},
        {name: "襄阳", pos: [112.1226, 32.0090], type: "city", size: 6},
        {name: "岳阳", pos: [113.1292, 29.3571], type: "city", size: 6},
        {name: "桂林", pos: [110.2993, 25.2742], type: "city", size: 6},
        {name: "三亚", pos: [109.5121, 18.2528], type: "city", size: 6},
        {name: "遵义", pos: [106.9272, 27.7254], type: "city", size: 6},
        {name: "绵阳", pos: [104.6796, 31.4675], type: "city", size: 6},
        {name: "宜昌", pos: [111.2865, 30.6919], type: "city", size: 6},
        {name: "鞍山", pos: [122.9950, 41.1086], type: "city", size: 6},
        {name: "吉林", pos: [126.5530, 43.8376], type: "city", size: 6},
        {name: "大庆", pos: [125.1033, 46.5893], type: "city", size: 6},
        {name: "齐齐哈尔", pos: [123.9182, 47.3543], type: "city", size: 6}
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
                outlineWidth: 2,
                scaleByDistance: new Cesium.NearFarScalar(50000, 1.5, 10000000, 0.5),
                translucencyByDistance: new Cesium.NearFarScalar(100000, 1.0, 10000000, 0.0)
            },
            label: {
                text: city.name,
                font: city.type === 'capital' ? 
                    'bold 16px "Microsoft YaHei", sans-serif' : 
                    '14px "Microsoft YaHei", sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -10),
                scaleByDistance: new Cesium.NearFarScalar(50000, 1.5, 5000000, 0.4),
                translucencyByDistance: new Cesium.NearFarScalar(100000, 1.0, 5000000, 0.0)
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
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },
                label: {
                    text: shelter.name,
                    font: 'bold 13px "Microsoft YaHei", sans-serif',
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 3,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, -35),
                    show: false
                },
                properties: {
                    shelter: shelter,
                    city: city.name,
                    cityId: cityId,
                    entityType: 'shelter'
                }
            });
            
            shelterEntities.push({
                entity: entity,
                shelter: shelter,
                city: city,
                cityId: cityId
            });
        });
    }
    
    console.log('[Nuclear Globe] Generated', shelterEntities.length, 'shelter markers');
}

// ============ 生成潜在核打击目标标记 ============
function generateTargetEntities() {
    targetEntities = [];
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        
        if (!city.targets) continue;
        
        city.targets.forEach(target => {
            const iconSvg = createTargetIconSvg(target.type, target.risk);
            const entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    target.position[0],
                    target.position[1],
                    150
                ),
                billboard: {
                    image: iconSvg,
                    scale: 0.6,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },
                label: {
                    text: target.name,
                    font: 'bold 12px "Microsoft YaHei", sans-serif',
                    fillColor: Cesium.Color.fromCssColorString('#ff3333'),
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 3,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    verticalOrigin: Cesium.VerticalOrigin.TOP,
                    pixelOffset: new Cesium.Cartesian2(0, -30),
                    show: false
                },
                properties: {
                    target: target,
                    city: city.name,
                    cityId: cityId,
                    entityType: 'target'
                }
            });
            
            // 风险区域（5km禁区）
            entity.dangerZone = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(
                    target.position[0],
                    target.position[1],
                    0
                ),
                ellipse: {
                    semiMinorAxis: 5000,
                    semiMajorAxis: 5000,
                    material: Cesium.Color.fromCssColorString(getRiskColor(target.risk)).withAlpha(0.2),
                    outline: true,
                    outlineColor: Cesium.Color.fromCssColorString(getRiskColor(target.risk)),
                    outlineWidth: 2,
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                },
                show: false
            });
            
            targetEntities.push({
                entity: entity,
                dangerZone: entity.dangerZone,
                target: target,
                city: city,
                cityId: cityId
            });
        });
    }
    
    console.log('[Nuclear Globe] Generated', targetEntities.length, 'target markers');
}

// ============ 创建目标类型图标 SVG ============
function createTargetIconSvg(type, risk) {
    const riskColor = getRiskColor(risk);
    const iconPaths = {
        factory: 'M2,22 L2,10 L6,10 L6,14 L10,6 L10,22 L14,22 L14,14 L18,14 L18,22 L22,22 L22,4 L2,4 Z',
        transport: 'M2,18 L2,10 L4,10 L4,6 L8,6 L8,10 L16,10 L16,6 L20,6 L20,10 L22,10 L22,18 L20,18 L20,20 L18,20 L18,18 L6,18 L6,20 L4,20 L4,18 Z M7,14 L9,14 L9,16 L7,16 Z M15,14 L17,14 L17,16 L15,16 Z',
        airport: 'M21,16 L21,14 L15,10 L15,6 L17,4 L15,2 L13,4 L13,8 L7,12 L7,8 L5,6 L3,8 L3,14 L9,12 L9,16 L7,18 L9,20 L12,18 L15,20 L17,18 L15,16 Z',
        port: 'M2,20 L22,20 L22,18 L20,16 L20,12 L22,10 L22,8 L18,8 L18,4 L16,2 L14,4 L14,8 L10,8 L10,4 L8,2 L6,4 L6,8 L2,8 L2,10 L4,12 L4,16 L2,18 Z',
        power: 'M13,2 L3,14 L12,14 L11,22 L21,10 L12,10 Z',
        water: 'M12,2 C8,8 4,12 4,16 C4,20 8,22 12,22 C16,22 20,20 20,16 C20,12 16,8 12,2 Z M12,18 C10,18 8,17 8,15 C8,13 10,11 12,9 C14,11 16,13 16,15 C16,17 14,18 12,18 Z',
        bridge: 'M2,20 L6,16 L10,20 L14,16 L18,20 L22,16 L22,12 L18,16 L14,12 L10,16 L6,12 L2,16 Z M2,8 L6,4 L10,8 L14,4 L18,8 L22,4 L22,8 L18,12 L14,8 L10,12 L6,8 L2,12 Z'
    };
    
    const path = iconPaths[type] || iconPaths.factory;
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="12" cy="12" r="11" fill="${riskColor}" opacity="0.2" filter="url(#glow)"/>
            <circle cx="12" cy="12" r="9" fill="#1a1a1a" stroke="${riskColor}" stroke-width="2"/>
            <path d="${path}" fill="${riskColor}" transform="translate(1,1) scale(0.9)"/>
            <text x="12" y="28" font-size="8" fill="${riskColor}" text-anchor="middle" font-weight="bold">⚠</text>
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// ============ 获取风险等级颜色 ============
function getRiskColor(risk) {
    const colors = {
        '高': '#ff0000',
        '中': '#ff8800',
        '低': '#ffcc00'
    };
    return colors[risk] || '#ff8800';
}

// ============ 获取目标类型标签 ============
function getTargetTypeLabel(type) {
    const labels = {
        factory: '工厂/工业',
        transport: '交通枢纽',
        airport: '机场',
        port: '港口',
        power: '电厂',
        water: '水厂',
        bridge: '桥梁'
    };
    return labels[type] || '潜在目标';
}

// ============ 切换目标显示/隐藏 ============
function toggleTargets(show) {
    targetEntities.forEach(item => {
        item.entity.show = show;
        item.dangerZone.show = show;
        item.entity.label.show = show && currentCity === item.cityId;
    });
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

// ============ EscapeRoutePlanner 类 - 自动寻路逃离系统 ============
class EscapeRoutePlanner {
    constructor(viewer) {
        this.viewer = viewer;
        this.routes = [];
        this.startPoint = null;
        this.endPoint = null;
        this.avoidRadius = 5000; // 5km禁区
    }
    
    // 设置起点
    setStartPoint(lon, lat) {
        this.startPoint = { lon, lat };
        this.renderStartMarker();
        return this;
    }
    
    // 设置终点
    setEndPoint(lon, lat) {
        this.endPoint = { lon, lat };
        return this;
    }
    
    // 渲染起点标记
    renderStartMarker() {
        if (this.startEntity) {
            this.viewer.entities.remove(this.startEntity);
        }
        
        this.startEntity = this.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(
                this.startPoint.lon,
                this.startPoint.lat,
                200
            ),
            billboard: {
                image: this.createStartMarkerSvg(),
                scale: 0.8,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            label: {
                text: '起点',
                font: 'bold 14px "Microsoft YaHei", sans-serif',
                fillColor: Cesium.Color.GREEN,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 3,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -40)
            }
        });
    }
    
    // 创建起点标记SVG
    createStartMarkerSvg() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="#00ff00" opacity="0.3"/>
                <circle cx="20" cy="20" r="12" fill="#00ff00" stroke="#ffffff" stroke-width="2"/>
                <text x="20" y="25" font-size="16" fill="#ffffff" text-anchor="middle" font-weight="bold">S</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    }
    
    // 获取所有禁区（目标周围5km）
    getForbiddenZones() {
        const zones = [];
        for (const cityId in SHELTER_DATA) {
            const city = SHELTER_DATA[cityId];
            if (city.targets) {
                city.targets.forEach(target => {
                    zones.push({
                        lon: target.position[0],
                        lat: target.position[1],
                        radius: this.avoidRadius,
                        name: target.name,
                        risk: target.risk
                    });
                });
            }
        }
        return zones;
    }
    
    // 检查点是否在禁区内
    isInForbiddenZone(lon, lat, zones) {
        for (const zone of zones) {
            const distance = this.haversineDistance(lon, lat, zone.lon, zone.lat);
            if (distance < zone.radius) {
                return true;
            }
        }
        return false;
    }
    
    // 计算两点间距离（米）
    haversineDistance(lon1, lat1, lon2, lat2) {
        const R = 6371000;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    // A*寻路算法
    findPathAStar(start, end, zones) {
        const openSet = [];
        const closedSet = new Set();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();
        
        const startKey = `${start.lon},${start.lat}`;
        const endKey = `${end.lon},${end.lat}`;
        
        openSet.push(start);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.haversineDistance(start.lon, start.lat, end.lon, end.lat));
        
        const maxIterations = 1000;
        let iterations = 0;
        
        while (openSet.length > 0 && iterations < maxIterations) {
            iterations++;
            
            // 找到fScore最小的节点
            let current = openSet[0];
            let currentIdx = 0;
            let minF = fScore.get(`${current.lon},${current.lat}`) || Infinity;
            
            for (let i = 1; i < openSet.length; i++) {
                const f = fScore.get(`${openSet[i].lon},${openSet[i].lat}`) || Infinity;
                if (f < minF) {
                    minF = f;
                    current = openSet[i];
                    currentIdx = i;
                }
            }
            
            const currentKey = `${current.lon},${current.lat}`;
            
            // 到达终点
            if (this.haversineDistance(current.lon, current.lat, end.lon, end.lat) < 1000) {
                return this.reconstructPath(cameFrom, current);
            }
            
            openSet.splice(currentIdx, 1);
            closedSet.add(currentKey);
            
            // 生成邻居点
            const neighbors = this.generateNeighbors(current, zones);
            
            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.lon},${neighbor.lat}`;
                
                if (closedSet.has(neighborKey)) continue;
                
                const tentativeG = (gScore.get(currentKey) || Infinity) + 
                                   this.haversineDistance(current.lon, current.lat, neighbor.lon, neighbor.lat);
                
                if (!openSet.find(n => n.lon === neighbor.lon && n.lat === neighbor.lat)) {
                    openSet.push(neighbor);
                } else if (tentativeG >= (gScore.get(neighborKey) || Infinity)) {
                    continue;
                }
                
                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeG);
                fScore.set(neighborKey, tentativeG + this.haversineDistance(neighbor.lon, neighbor.lat, end.lon, end.lat));
            }
        }
        
        // 如果没找到路径，返回直线路径
        return [start, end];
    }
    
    // 生成邻居点（绕开禁区）
    generateNeighbors(point, zones) {
        const neighbors = [];
        const stepSize = 0.02; // 约2km
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
        
        for (const [dx, dy] of directions) {
            const newLon = point.lon + dx * stepSize;
            const newLat = point.lat + dy * stepSize;
            
            // 检查是否在禁区内
            if (!this.isInForbiddenZone(newLon, newLat, zones)) {
                neighbors.push({ lon: newLon, lat: newLat });
            }
        }
        
        return neighbors;
    }
    
    // 重构路径
    reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = `${current.lon},${current.lat}`;
        
        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            path.unshift(current);
            currentKey = `${current.lon},${current.lat}`;
        }
        
        return path;
    }
    
    // 生成3条不同路线
    generateThreeRoutes() {
        if (!this.startPoint || !this.endPoint) {
            console.warn('[EscapeRoutePlanner] Start or end point not set');
            return [];
        }
        
        const zones = this.getForbiddenZones();
        const routes = [];
        
        // 路线1: 最短路径（优先速度）
        const path1 = this.findPathAStar(this.startPoint, this.endPoint, []);
        routes.push({
            name: '最短路径',
            type: 'fastest',
            color: '#00ff00',
            path: path1,
            distance: this.calculatePathDistance(path1),
            safetyScore: this.calculateSafetyScore(path1, zones)
        });
        
        // 路线2: 最安全路径（距离禁区最远）
        const safeEnd = this.findSafestExitPoint(this.startPoint, zones);
        const path2 = this.findPathAStar(this.startPoint, safeEnd, zones);
        routes.push({
            name: '最安全路径',
            type: 'safest',
            color: '#0088ff',
            path: path2,
            distance: this.calculatePathDistance(path2),
            safetyScore: this.calculateSafetyScore(path2, zones)
        });
        
        // 路线3: 平衡路径（兼顾速度和安全）
        const path3 = this.findPathAStar(this.startPoint, this.endPoint, zones);
        routes.push({
            name: '平衡路径',
            type: 'balanced',
            color: '#aa00ff',
            path: path3,
            distance: this.calculatePathDistance(path3),
            safetyScore: this.calculateSafetyScore(path3, zones)
        });
        
        this.routes = routes;
        return routes;
    }
    
    // 找到最安全的出口方向
    findSafestExitPoint(start, zones) {
        let bestPoint = null;
        let maxMinDistance = 0;
        
        const angles = [0, 45, 90, 135, 180, 225, 270, 315];
        const distance = 0.5; // 约50km
        
        for (const angle of angles) {
            const rad = angle * Math.PI / 180;
            const lon = start.lon + distance * Math.cos(rad) / Math.cos(start.lat * Math.PI / 180);
            const lat = start.lat + distance * Math.sin(rad);
            
            // 计算该方向到最近禁区的距离
            let minDistance = Infinity;
            for (const zone of zones) {
                const d = this.haversineDistance(lon, lat, zone.lon, zone.lat);
                if (d < minDistance) {
                    minDistance = d;
                }
            }
            
            if (minDistance > maxMinDistance) {
                maxMinDistance = minDistance;
                bestPoint = { lon, lat };
            }
        }
        
        return bestPoint || { lon: start.lon + 0.5, lat: start.lat };
    }
    
    // 计算路径距离
    calculatePathDistance(path) {
        let distance = 0;
        for (let i = 1; i < path.length; i++) {
            distance += this.haversineDistance(
                path[i-1].lon, path[i-1].lat,
                path[i].lon, path[i].lat
            );
        }
        return distance;
    }
    
    // 计算安全系数 (0-100)
    calculateSafetyScore(path, zones) {
        if (!zones.length) return 100;
        
        let totalMinDistance = 0;
        for (const point of path) {
            let minDistance = Infinity;
            for (const zone of zones) {
                const d = this.haversineDistance(point.lon, point.lat, zone.lon, zone.lat);
                if (d < minDistance) {
                    minDistance = d;
                }
            }
            totalMinDistance += minDistance;
        }
        
        const avgDistance = totalMinDistance / path.length;
        const score = Math.min(100, (avgDistance / 5000) * 100);
        return Math.round(score);
    }
    
    // 渲染路线
    renderRoutes() {
        // 清除旧路线
        this.clearRoutes();
        
        this.routes.forEach((route, index) => {
            const positions = route.path.map(p => 
                Cesium.Cartesian3.fromDegrees(p.lon, p.lat, 100)
            );
            
            // 主路线
            const polyline = this.viewer.entities.add({
                polyline: {
                    positions: positions,
                    width: 4,
                    material: new Cesium.ColorMaterialProperty(
                        Cesium.Color.fromCssColorString(route.color)
                    ),
                    clampToGround: true
                }
            });
            
            // 发光效果
            const glowPolyline = this.viewer.entities.add({
                polyline: {
                    positions: positions,
                    width: 8,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.3,
                        color: Cesium.Color.fromCssColorString(route.color)
                    }),
                    clampToGround: true
                }
            });
            
            // 方向箭头
            this.addDirectionArrows(route.path, route.color);
            
            routeEntities.push(polyline, glowPolyline);
        });
        
        this.updateRoutePanel();
    }
    
    // 添加方向箭头
    addDirectionArrows(path, color) {
        for (let i = 0; i < path.length - 1; i += 3) {
            const midLon = (path[i].lon + path[i+1].lon) / 2;
            const midLat = (path[i].lat + path[i+1].lat) / 2;
            
            const arrow = this.viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(midLon, midLat, 150),
                billboard: {
                    image: this.createArrowSvg(color),
                    scale: 0.5,
                    rotation: this.calculateBearing(path[i], path[i+1]),
                    verticalOrigin: Cesium.VerticalOrigin.CENTER
                }
            });
            
            routeEntities.push(arrow);
        }
    }
    
    // 创建箭头SVG
    createArrowSvg(color) {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2 L22 12 L16 12 L16 22 L8 22 L8 12 L2 12 Z" fill="${color}"/>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    }
    
    // 计算方位角
    calculateBearing(from, to) {
        const dLon = (to.lon - from.lon) * Math.PI / 180;
        const lat1 = from.lat * Math.PI / 180;
        const lat2 = to.lat * Math.PI / 180;
        
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) -
                  Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        
        let bearing = Math.atan2(y, x) * 180 / Math.PI;
        bearing = (bearing + 360) % 360;
        
        return Cesium.Math.toRadians(-bearing);
    }
    
    // 更新路线面板
    updateRoutePanel() {
        const panel = document.getElementById('routePanel');
        if (!panel) return;
        
        let html = '<h3>🚨 逃离路线方案</h3>';
        
        this.routes.forEach((route, index) => {
            const time = Math.ceil(route.distance / 30000 * 60); // 假设30km/h速度
            const safetyClass = route.safetyScore > 70 ? 'high' : route.safetyScore > 40 ? 'medium' : 'low';
            
            html += `
                <div class="route-item" style="border-left-color: ${route.color}">
                    <div class="route-header">
                        <span class="route-name" style="color: ${route.color}">${route.name}</span>
                        <span class="route-safety ${safetyClass}">安全度: ${route.safetyScore}%</span>
                    </div>
                    <div class="route-details">
                        <span>📏 ${(route.distance / 1000).toFixed(1)} km</span>
                        <span>⏱️ 约 ${time} 分钟</span>
                    </div>
                </div>
            `;
        });
        
        panel.innerHTML = html;
        panel.classList.add('active');
    }
    
    // 清除路线
    clearRoutes() {
        routeEntities.forEach(entity => {
            this.viewer.entities.remove(entity);
        });
        routeEntities = [];
    }
}

// ============ 设置寻路UI ============
function setupEscapeRouteUI() {
    // 创建目标显示切换按钮
    const targetToggleBtn = document.createElement('button');
    targetToggleBtn.id = 'targetToggleBtn';
    targetToggleBtn.className = 'control-btn';
    targetToggleBtn.innerHTML = '⚠️ 显示潜在目标';
    targetToggleBtn.onclick = () => {
        const showing = targetToggleBtn.classList.toggle('active');
        toggleTargets(showing);
        targetToggleBtn.innerHTML = showing ? '⚠️ 隐藏潜在目标' : '⚠️ 显示潜在目标';
    };
    
    // 创建寻路按钮
    const escapeBtn = document.createElement('button');
    escapeBtn.id = 'escapeBtn';
    escapeBtn.className = 'control-btn escape-btn';
    escapeBtn.innerHTML = '🚨 寻路逃离';
    escapeBtn.onclick = startEscapePlanning;
    
    // 创建路线面板
    const routePanel = document.createElement('div');
    routePanel.id = 'routePanel';
    routePanel.className = 'route-panel';
    
    // 添加到控制栏
    const controls = document.querySelector('.controls') || document.body;
    controls.appendChild(targetToggleBtn);
    controls.appendChild(escapeBtn);
    document.body.appendChild(routePanel);
}

// ============ 开始逃离规划 ============
function startEscapePlanning() {
    const btn = document.getElementById('escapeBtn');
    const isActive = btn.classList.toggle('active');
    
    if (isActive) {
        btn.innerHTML = '❌ 取消寻路';
        showNotification('点击地图设置起点，或搜索确认起点位置');
        
        // 启用点击选点模式
        viewer.screenSpaceEventHandler.setInputAction(function(movement) {
            const cartesian = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if (cartesian) {
                const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                const lon = Cesium.Math.toDegrees(cartographic.longitude);
                const lat = Cesium.Math.toDegrees(cartographic.latitude);
                
                selectedStartPoint = { lon, lat };
                escapeRoutePlanner.setStartPoint(lon, lat);
                
                // 自动设置终点为城市边缘
                const nearestCity = findNearestCity(lon, lat);
                if (nearestCity) {
                    const exitPoint = calculateCityExitPoint(lon, lat, nearestCity);
                    escapeRoutePlanner.setEndPoint(exitPoint.lon, exitPoint.lat);
                    
                    // 生成并显示路线
                    escapeRoutePlanner.generateThreeRoutes();
                    escapeRoutePlanner.renderRoutes();
                    
                    // 聚焦到路线
                    viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 20000),
                        duration: 1.5
                    });
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    } else {
        btn.innerHTML = '🚨 寻路逃离';
        escapeRoutePlanner.clearRoutes();
        if (escapeRoutePlanner.startEntity) {
            viewer.entities.remove(escapeRoutePlanner.startEntity);
        }
        
        // 恢复原来的点击事件
        viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        setupClickHandler();
    }
}

// ============ 找到最近的城市 ============
function findNearestCity(lon, lat) {
    let nearest = null;
    let minDistance = Infinity;
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        const distance = haversineDistance(lon, lat, city.center[0], city.center[1]);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = city;
        }
    }
    
    return nearest;
}

// ============ 计算城市出口点（远离目标的方向）
function calculateCityExitPoint(startLon, startLat, city) {
    const zones = [];
    if (city.targets) {
        city.targets.forEach(target => {
            zones.push({
                lon: target.position[0],
                lat: target.position[1]
            });
        });
    }
    
    // 找到最安全方向
    let bestExit = null;
    let maxMinDistance = 0;
    
    for (let angle = 0; angle < 360; angle += 30) {
        const rad = angle * Math.PI / 180;
        const distance = 0.3; // 约30km
        const exitLon = startLon + distance * Math.cos(rad) / Math.cos(startLat * Math.PI / 180);
        const exitLat = startLat + distance * Math.sin(rad);
        
        let minDistance = Infinity;
        for (const zone of zones) {
            const d = haversineDistance(exitLon, exitLat, zone.lon, zone.lat);
            if (d < minDistance) {
                minDistance = d;
            }
        }
        
        if (minDistance > maxMinDistance) {
            maxMinDistance = minDistance;
            bestExit = { lon: exitLon, lat: exitLat };
        }
    }
    
    return bestExit || { lon: startLon + 0.3, lat: startLat };
}

// ============ 距离计算辅助函数 ============
function haversineDistance(lon1, lat1, lon2, lat2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// ============ 显示通知 ============
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ 设置点击事件处理器 ============
function setupClickHandler() {
    viewer.screenSpaceEventHandler.setInputAction(function(movement) {
        const pickedObject = viewer.scene.pick(movement.position);
        
        if (Cesium.defined(pickedObject) && pickedObject.id) {
            const entity = pickedObject.id;
            if (entity.properties) {
                const entityType = entity.properties.entityType ? entity.properties.entityType.getValue() : null;
                
                if (entityType === 'shelter' && entity.properties.shelter) {
                    const shelter = entity.properties.shelter.getValue();
                    const cityName = entity.properties.city.getValue();
                    showShelterInfo(shelter, cityName);
                } else if (entityType === 'target' && entity.properties.target) {
                    const target = entity.properties.target.getValue();
                    const cityName = entity.properties.city.getValue();
                    showTargetInfo(target, cityName);
                }
            }
        } else {
            closeInfoPanel();
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// ============ 显示目标信息 ============
function showTargetInfo(target, cityName) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    
    document.getElementById('infoTitle').textContent = target.name;
    
    const typeLabel = getTargetTypeLabel(target.type);
    const riskColor = getRiskColor(target.risk);
    
    const infoContent = document.getElementById('infoContent') || panel;
    infoContent.innerHTML = `
        <div class="info-section">
            <span class="badge" style="background: ${riskColor}30; color: ${riskColor}; border: 1px solid ${riskColor}; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                ⚠️ ${typeLabel} - 风险等级: ${target.risk}
            </span>
        </div>
        <div class="info-section">
            <h4>📍 位置信息</h4>
            <p>城市: ${cityName}</p>
            <p>坐标: ${target.position[0].toFixed(4)}, ${target.position[1].toFixed(4)}</p>
        </div>
        <div class="info-section warning">
            <h4>⚠️ 风险提示</h4>
            <p>该设施属于潜在核打击目标，周围5公里为禁区！</p>
            <p>核战争爆发时应立即远离该区域。</p>
        </div>
        <button class="action-btn" onclick="startEscapeFromTarget(${target.position[0]}, ${target.position[1]})">
            🚨 从此处逃离
        </button>
    `;
    
    panel.classList.add('active');
    
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            target.position[0],
            target.position[1],
            15000
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0
        },
        duration: 1.5
    });
}

// ============ 从目标位置开始逃离 ============
function startEscapeFromTarget(lon, lat) {
    document.getElementById('escapeBtn').click();
    selectedStartPoint = { lon, lat };
    escapeRoutePlanner.setStartPoint(lon, lat);
    
    const nearestCity = findNearestCity(lon, lat);
    if (nearestCity) {
        const exitPoint = calculateCityExitPoint(lon, lat, nearestCity);
        escapeRoutePlanner.setEndPoint(exitPoint.lon, exitPoint.lat);
        escapeRoutePlanner.generateThreeRoutes();
        escapeRoutePlanner.renderRoutes();
    }
}

// ============ UI 函数 ============
function populateCityList() {
    const cityListEl = document.getElementById('cityList');
    if (!cityListEl) return;
    
    cityListEl.innerHTML = '';
    
    const majorCities = ['beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu', 'wuhan', 'xian', 'hangzhou', 'nanjing'];
    
    majorCities.forEach(cityId => {
        if (SHELTER_DATA[cityId]) {
            const city = SHELTER_DATA[cityId];
            const cityItem = document.createElement('div');
            cityItem.className = 'city-item';
            cityItem.innerHTML = `
                <span>${city.name}</span>
                <span class="count">${city.shelters.length}个避难所</span>
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
    const totalTargetsEl = document.getElementById('totalTargets');
    
    if (totalBunkersEl) totalBunkersEl.textContent = stats.totalBunkers;
    if (totalCapacityEl) totalCapacityEl.textContent = Math.floor(stats.totalCapacity / 10000) + '万+';
    if (totalTargetsEl) totalTargetsEl.textContent = stats.totalTargets;
}

function calculateStats() {
    let totalBunkers = 0;
    let totalCapacity = 0;
    let totalTargets = 0;
    
    for (const cityId in SHELTER_DATA) {
        const city = SHELTER_DATA[cityId];
        totalBunkers += city.shelters.length;
        city.shelters.forEach(shelter => {
            totalCapacity += parseInt(shelter.capacity) || 10000;
        });
        if (city.targets) {
            totalTargets += city.targets.length;
        }
    }
    
    return { totalBunkers, totalCapacity, totalTargets };
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
        complete: () => {
            showCityLabels(cityId);
            showTargetLabels(cityId);
        }
    });
}

function showCityLabels(cityId) {
    shelterEntities.forEach(item => {
        if (item.cityId === cityId) {
            item.entity.label.show = true;
        } else {
            item.entity.label.show = false;
        }
    });
}

function showTargetLabels(cityId) {
    targetEntities.forEach(item => {
        if (item.cityId === cityId) {
            item.entity.label.show = true;
        } else {
            item.entity.label.show = false;
        }
    });
}

// ============ 事件处理 ============
function setupEventHandlers() {
    setupClickHandler();
    
    viewer.camera.changed.addEventListener(function() {
        const height = viewer.camera.positionCartographic.height;
        
        shelterEntities.forEach(item => {
            if (height < 80000 && currentCity && item.cityId === currentCity) {
                item.entity.label.show = true;
            } else {
                item.entity.label.show = false;
            }
        });
        
        targetEntities.forEach(item => {
            if (height < 80000 && currentCity && item.cityId === currentCity) {
                item.entity.label.show = true;
            } else {
                item.entity.label.show = false;
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeInfoPanel();
            closeRoutePanel();
        }
        if (e.key === 'h' || e.key === 'H') {
            openGuide();
        }
        if (e.key === 'c' || e.key === 'C') {
            flyToChina();
        }
        if (e.key === 't' || e.key === 'T') {
            document.getElementById('targetToggleBtn').click();
        }
    });
    
    const searchInput = document.getElementById('citySearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCity();
            }
        });
    }
}

function closeRoutePanel() {
    const panel = document.getElementById('routePanel');
    if (panel) panel.classList.remove('active');
}

function showShelterInfo(shelter, cityName) {
    const panel = document.getElementById('infoPanel');
    if (!panel) return;
    
    document.getElementById('infoTitle').textContent = shelter.name;
    
    const typeLabel = getTypeLabel(shelter.type);
    const typeColor = getTypeColor(shelter.type);
    
    const infoContent = document.getElementById('infoContent') || panel;
    infoContent.innerHTML = `
        <div class="info-section">
            <span class="badge" style="background: ${typeColor}30; color: ${typeColor}; border: 1px solid ${typeColor}; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                ${typeLabel}
            </span>
        </div>
        <div class="info-section">
            <h4>📍 基本信息</h4>
            <p>地址: ${shelter.address || '暂无详细地址'}</p>
            <p>容量: ${typeof shelter.capacity === 'number' ? shelter.capacity.toLocaleString() + ' 人' : shelter.capacity}</p>
            <p>防护等级: ${shelter.level || '核6级'}</p>
        </div>
        <div class="info-section">
            <h4>🏗️ 设施配置</h4>
            <p>${shelter.facilities || '通风系统、应急供电、滤毒装置'}</p>
        </div>
        <div class="info-section">
            <h4>🚪 进入方式</h4>
            <p>${shelter.access || '可通过地铁或主要道路到达'}</p>
        </div>
        <button class="action-btn" onclick="startEscapeFromTarget(${shelter.position[0]}, ${shelter.position[1]})">
            🚨 规划至此避难所
        </button>
    `;
    
    panel.classList.add('active');
    
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            shelter.position[0],
            shelter.position[1],
            8000
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-45),
            roll: 0
        },
        duration: 1.5
    });
}

function closeInfoPanel() {
    const panel = document.getElementById('infoPanel');
    if (panel) panel.classList.remove('active');
}

function searchCity() {
    const query = document.getElementById('citySearch').value.trim();
    if (!query) return;
    
    for (const cityId in SHELTER_DATA) {
        if (SHELTER_DATA[cityId].name.includes(query)) {
            flyToCity(cityId);
            return;
        }
    }
    
    alert('未找到该城市，请尝试输入"北京"、"上海"、"广州"等');
}

function openGuide() {
    const modal = document.getElementById('guideModal');
    if (modal) modal.classList.add('active');
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
        'underground': '#3742fa',
        'underground_mall': '#ff6348'
    };
    return colors[type] || '#ffa502';
}

function getTypeLabel(type) {
    const labels = {
        'bunker': '核掩体',
        'shelter': '人防工程',
        'metro': '地铁/地下通道',
        'underground': '地下设施',
        'underground_mall': '地下商城'
    };
    return labels[type] || '人防工程';
}

// ============ 页面加载初始化 ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Nuclear Globe] DOM loaded, initializing v4.0...');
    
    if (typeof Cesium === 'undefined') {
        console.error('[Nuclear Globe] Cesium library not loaded!');
        document.getElementById('loading').innerHTML = '<p style="color: #ff4757;">地图库加载失败，请刷新页面重试</p>';
        return;
    }
    
    initGlobe();
});
