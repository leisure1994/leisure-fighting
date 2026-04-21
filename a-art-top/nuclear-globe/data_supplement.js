// ============================================
// 核战争城市自救地球仪 - 补充69个城市完整数据
// 生成时间: 2026-04-17
// 补充城市数: 69
// ============================================

const SUPPLEMENT_CITIES = {
    // ========== 河北省补充 ==========
    "zhangjiakou": { 
        "name": "张家口", 
        "center": [114.887, 40.768], 
        "shelters": [
            { "id": "zjk_001", "name": "张家口火车站地下人防", "type": "transport", "level": "核6级", "lat": 40.773, "lng": 114.892, "capacity": 3000, "facilities": "通风系统、应急供电、医疗站", "access": "张家口站地下一层" },
            { "id": "zjk_002", "name": "桥西区地下避难所", "type": "civil", "level": "核6级", "lat": 40.760, "lng": 114.875, "capacity": 2500, "facilities": "三防门、滤毒设备、应急照明", "access": "桥西区中心地下通道" },
            { "id": "zjk_003", "name": "银座商城地下掩体", "type": "mall", "level": "核6级", "lat": 40.770, "lng": 114.885, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "银座商城地下二层" },
            { "id": "zjk_004", "name": "水母宫地下防护", "type": "civil", "level": "核6级", "lat": 40.785, "lng": 114.860, "capacity": 1800, "facilities": "独立通风、应急水源、医疗站", "access": "水母宫景区地下" },
            { "id": "zjk_005", "name": "大境门地下避难所", "type": "government", "level": "核5级", "lat": 40.800, "lng": 114.890, "capacity": 2000, "facilities": "深埋结构、密闭门、应急照明", "access": "大境门景区地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zjk_001", "name": "张家口发电厂", "type": "power", "lat": 40.750, "lng": 114.900, "threatLevel": "high", "impactRadius": 1500, "description": "城市主要电力供应设施" },
            { "id": "nt_zjk_002", "name": "宣化钢铁厂", "type": "chemical", "lat": 40.590, "lng": 115.050, "threatLevel": "critical", "impactRadius": 1800, "description": "大型钢铁生产基地" },
            { "id": "nt_zjk_003", "name": "张家口煤矿", "type": "storage", "lat": 40.720, "lng": 114.920, "threatLevel": "high", "impactRadius": 1200, "description": "能源储备设施" }
        ]
    },

    // ========== 山东省补充 ==========
    "zaozhuang": { 
        "name": "枣庄", 
        "center": [117.3237, 34.8107], 
        "shelters": [
            { "id": "zz_001", "name": "枣庄火车站地下人防", "type": "transport", "level": "核6级", "lat": 34.815, "lng": 117.328, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "枣庄站地下一层" },
            { "id": "zz_002", "name": "薛城区地下避难所", "type": "civil", "level": "核6级", "lat": 34.800, "lng": 117.315, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "薛城区中心地下" },
            { "id": "zz_003", "name": "银座商城地下掩体", "type": "mall", "level": "核6级", "lat": 34.812, "lng": 117.325, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "银座商城地下二层" },
            { "id": "zz_004", "name": "台儿庄地下防护", "type": "civil", "level": "核6级", "lat": 34.565, "lng": 117.735, "capacity": 2200, "facilities": "独立通风、密闭门、应急水源", "access": "台儿庄古城地下" },
            { "id": "zz_005", "name": "市中区人防工程", "type": "civil", "level": "核6级", "lat": 34.805, "lng": 117.320, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "市中区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zz_001", "name": "枣庄煤矿", "type": "storage", "lat": 34.785, "lng": 117.340, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源储备" },
            { "id": "nt_zz_002", "name": "枣庄发电厂", "type": "power", "lat": 34.825, "lng": 117.310, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_zz_003", "name": "滕州化工厂", "type": "chemical", "lat": 35.095, "lng": 117.165, "threatLevel": "critical", "impactRadius": 1600, "description": "化工生产基地" }
        ]
    },
    "rizhao": { 
        "name": "日照", 
        "center": [119.5272, 35.4164], 
        "shelters": [
            { "id": "rz_001", "name": "日照火车站地下人防", "type": "transport", "level": "核6级", "lat": 35.420, "lng": 119.532, "capacity": 3200, "facilities": "三防系统、应急供电、医疗站", "access": "日照站地下一层" },
            { "id": "rz_002", "name": "东港区地下避难所", "type": "civil", "level": "核6级", "lat": 35.425, "lng": 119.525, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "东港区中心地下" },
            { "id": "rz_003", "name": "万象汇地下掩体", "type": "mall", "level": "核6级", "lat": 35.418, "lng": 119.530, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万象汇地下二层" },
            { "id": "rz_004", "name": "日照港地下防护", "type": "government", "level": "核5级", "lat": 35.385, "lng": 119.555, "capacity": 4000, "facilities": "深埋结构、密闭门、应急水源", "access": "日照港地下" },
            { "id": "rz_005", "name": "岚山区人防工程", "type": "civil", "level": "核6级", "lat": 35.105, "lng": 119.325, "capacity": 2200, "facilities": "独立通风、滤毒设备、通讯设备", "access": "岚山区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_rz_001", "name": "日照港", "type": "port", "lat": 35.385, "lng": 119.555, "threatLevel": "critical", "impactRadius": 2000, "description": "重要港口设施" },
            { "id": "nt_rz_002", "name": "日照发电厂", "type": "power", "lat": 35.435, "lng": 119.515, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_rz_003", "name": "岚山港", "type": "port", "lat": 35.105, "lng": 119.325, "threatLevel": "high", "impactRadius": 1800, "description": "货运港口" }
        ]
    },
    "liaocheng": { 
        "name": "聊城", 
        "center": [115.9855, 36.456], 
        "shelters": [
            { "id": "lc_001", "name": "聊城火车站地下人防", "type": "transport", "level": "核6级", "lat": 36.460, "lng": 115.990, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "聊城站地下一层" },
            { "id": "lc_002", "name": "东昌府区地下避难所", "type": "civil", "level": "核6级", "lat": 36.450, "lng": 115.980, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "东昌府区中心地下" },
            { "id": "lc_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 36.455, "lng": 115.985, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "lc_004", "name": "光岳楼地下防护", "type": "civil", "level": "核6级", "lat": 36.445, "lng": 115.975, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "光岳楼景区地下" },
            { "id": "lc_005", "name": "临清市人防工程", "type": "civil", "level": "核6级", "lat": 36.835, "lng": 115.705, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "临清市中心地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_lc_001", "name": "聊城发电厂", "type": "power", "lat": 36.470, "lng": 115.970, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_lc_002", "name": "鲁西化工", "type": "chemical", "lat": 36.425, "lng": 116.015, "threatLevel": "critical", "impactRadius": 1800, "description": "大型化工基地" },
            { "id": "nt_lc_003", "name": "临清棉纺厂", "type": "factory", "lat": 36.845, "lng": 115.695, "threatLevel": "medium", "impactRadius": 1000, "description": "纺织工业设施" }
        ]
    },
    "binzhou": { 
        "name": "滨州", 
        "center": [117.9707, 37.3819], 
        "shelters": [
            { "id": "bz_001", "name": "滨州火车站地下人防", "type": "transport", "level": "核6级", "lat": 37.385, "lng": 117.975, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "滨州站地下一层" },
            { "id": "bz_002", "name": "滨城区地下避难所", "type": "civil", "level": "核6级", "lat": 37.380, "lng": 117.965, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "滨城区中心地下" },
            { "id": "bz_003", "name": "银座商城地下掩体", "type": "mall", "level": "核6级", "lat": 37.375, "lng": 117.970, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "银座商城地下二层" },
            { "id": "bz_004", "name": "中海公园地下防护", "type": "civil", "level": "核6级", "lat": 37.390, "lng": 117.960, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "中海公园地下" },
            { "id": "bz_005", "name": "沾化区人防工程", "type": "civil", "level": "核6级", "lat": 37.695, "lng": 118.125, "capacity": 2000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "沾化区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_bz_001", "name": "滨州发电厂", "type": "power", "lat": 37.395, "lng": 117.955, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_bz_002", "name": "滨州港", "type": "port", "lat": 38.025, "lng": 118.005, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_bz_003", "name": "魏桥集团", "type": "factory", "lat": 37.365, "lng": 117.980, "threatLevel": "medium", "impactRadius": 1200, "description": "大型纺织企业" }
        ]
    },
    "heze": { 
        "name": "菏泽", 
        "center": [115.4807, 35.2336], 
        "shelters": [
            { "id": "hz_001", "name": "菏泽火车站地下人防", "type": "transport", "level": "核6级", "lat": 35.238, "lng": 115.485, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "菏泽站地下一层" },
            { "id": "hz_002", "name": "牡丹区地下避难所", "type": "civil", "level": "核6级", "lat": 35.240, "lng": 115.475, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "牡丹区中心地下" },
            { "id": "hz_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 35.235, "lng": 115.480, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "hz_004", "name": "曹州牡丹园地下防护", "type": "civil", "level": "核6级", "lat": 35.280, "lng": 115.460, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "曹州牡丹园地下" },
            { "id": "hz_005", "name": "定陶区人防工程", "type": "civil", "level": "核6级", "lat": 35.075, "lng": 115.575, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "定陶区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_hz_001", "name": "菏泽发电厂", "type": "power", "lat": 35.255, "lng": 115.465, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_hz_002", "name": "东明石化", "type": "chemical", "lat": 35.285, "lng": 115.095, "threatLevel": "critical", "impactRadius": 2000, "description": "大型石化基地" },
            { "id": "nt_hz_003", "name": "巨野煤矿", "type": "storage", "lat": 35.395, "lng": 116.095, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源储备" }
        ]
    },
    "dezhou": { 
        "name": "德州", 
        "center": [116.3593, 37.4356], 
        "shelters": [
            { "id": "dz_001", "name": "德州火车站地下人防", "type": "transport", "level": "核6级", "lat": 37.440, "lng": 116.364, "capacity": 3200, "facilities": "三防系统、应急供电、医疗站", "access": "德州站地下一层" },
            { "id": "dz_002", "name": "德城区地下避难所", "type": "civil", "level": "核6级", "lat": 37.430, "lng": 116.350, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "德城区中心地下" },
            { "id": "dz_003", "name": "澳德乐时代广场地下掩体", "type": "mall", "level": "核6级", "lat": 37.445, "lng": 116.365, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "澳德乐地下二层" },
            { "id": "dz_004", "name": "新湖公园地下防护", "type": "civil", "level": "核6级", "lat": 37.425, "lng": 116.355, "capacity": 2800, "facilities": "独立通风、密闭门、应急水源", "access": "新湖公园地下" },
            { "id": "dz_005", "name": "乐陵市人防工程", "type": "civil", "level": "核6级", "lat": 37.735, "lng": 117.235, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "乐陵市中心地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_dz_001", "name": "德州发电厂", "type": "power", "lat": 37.450, "lng": 116.340, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_dz_002", "name": "华能德州电厂", "type": "power", "lat": 37.465, "lng": 116.325, "threatLevel": "critical", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_dz_003", "name": "德州火车站货运", "type": "transport", "lat": 37.435, "lng": 116.370, "threatLevel": "medium", "impactRadius": 1000, "description": "货运枢纽" }
        ]
    },
    "laiwu": { 
        "name": "莱芜", 
        "center": [117.6782, 36.2144], 
        "shelters": [
            { "id": "lw_001", "name": "莱芜火车站地下人防", "type": "transport", "level": "核6级", "lat": 36.218, "lng": 117.682, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "莱芜站地下一层" },
            { "id": "lw_002", "name": "莱城区地下避难所", "type": "civil", "level": "核6级", "lat": 36.210, "lng": 117.670, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "莱城区中心地下" },
            { "id": "lw_003", "name": "银座商城地下掩体", "type": "mall", "level": "核6级", "lat": 36.215, "lng": 117.675, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "银座商城地下二层" },
            { "id": "lw_004", "name": "钢城区人防工程", "type": "civil", "level": "核6级", "lat": 36.065, "lng": 117.815, "capacity": 3200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "钢城区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_lw_001", "name": "莱钢集团", "type": "factory", "lat": 36.055, "lng": 117.825, "threatLevel": "critical", "impactRadius": 1800, "description": "大型钢铁生产基地" },
            { "id": "nt_lw_002", "name": "莱芜发电厂", "type": "power", "lat": 36.225, "lng": 117.660, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },

    // ========== 江苏省补充 ==========
    "zhenjiang": { 
        "name": "镇江", 
        "center": [119.4239, 32.1886], 
        "shelters": [
            { "id": "zj_001", "name": "镇江南站地下人防", "type": "transport", "level": "核6级", "lat": 32.195, "lng": 119.428, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "镇江南站地下一层" },
            { "id": "zj_002", "name": "京口区地下避难所", "type": "civil", "level": "核6级", "lat": 32.195, "lng": 119.415, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "京口区中心地下" },
            { "id": "zj_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 32.190, "lng": 119.420, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "zj_004", "name": "金山寺地下防护", "type": "civil", "level": "核6级", "lat": 32.215, "lng": 119.405, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "金山寺景区地下" },
            { "id": "zj_005", "name": "润州区人防工程", "type": "civil", "level": "核6级", "lat": 32.185, "lng": 119.400, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "润州区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zj_001", "name": "镇江港", "type": "port", "lat": 32.215, "lng": 119.440, "threatLevel": "high", "impactRadius": 1600, "description": "重要港口设施" },
            { "id": "nt_zj_002", "name": "谏壁电厂", "type": "power", "lat": 32.180, "lng": 119.485, "threatLevel": "critical", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_zj_003", "name": "镇江化工厂", "type": "chemical", "lat": 32.165, "lng": 119.375, "threatLevel": "high", "impactRadius": 1400, "description": "化工生产基地" }
        ]
    },
    "taizhou2": { 
        "name": "泰州", 
        "center": [119.9233, 32.4557], 
        "shelters": [
            { "id": "tz2_001", "name": "泰州火车站地下人防", "type": "transport", "level": "核6级", "lat": 32.460, "lng": 119.928, "capacity": 3200, "facilities": "三防系统、应急供电、医疗站", "access": "泰州站地下一层" },
            { "id": "tz2_002", "name": "海陵区地下避难所", "type": "civil", "level": "核6级", "lat": 32.455, "lng": 119.920, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "海陵区中心地下" },
            { "id": "tz2_003", "name": "万象城地下掩体", "type": "mall", "level": "核6级", "lat": 32.450, "lng": 119.925, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "万象城地下二层" },
            { "id": "tz2_004", "name": "凤城河地下防护", "type": "civil", "level": "核6级", "lat": 32.460, "lng": 119.915, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "凤城河景区地下" },
            { "id": "tz2_005", "name": "靖江市人防工程", "type": "civil", "level": "核6级", "lat": 32.015, "lng": 120.275, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "靖江市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_tz2_001", "name": "泰州港", "type": "port", "lat": 32.285, "lng": 119.880, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_tz2_002", "name": "泰州发电厂", "type": "power", "lat": 32.435, "lng": 119.935, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_tz2_003", "name": "扬子江药业", "type": "chemical", "lat": 32.430, "lng": 119.910, "threatLevel": "medium", "impactRadius": 1200, "description": "制药生产基地" }
        ]
    },
    "suqian": { 
        "name": "宿迁", 
        "center": [118.2755, 33.9623], 
        "shelters": [
            { "id": "sq_001", "name": "宿迁火车站地下人防", "type": "transport", "level": "核6级", "lat": 33.967, "lng": 118.280, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "宿迁站地下一层" },
            { "id": "sq_002", "name": "宿城区地下避难所", "type": "civil", "level": "核6级", "lat": 33.960, "lng": 118.270, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "宿城区中心地下" },
            { "id": "sq_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 33.965, "lng": 118.275, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "sq_004", "name": "项王故里地下防护", "type": "civil", "level": "核6级", "lat": 33.955, "lng": 118.265, "capacity": 2200, "facilities": "独立通风、密闭门、应急水源", "access": "项王故里景区地下" },
            { "id": "sq_005", "name": "沭阳县人防工程", "type": "civil", "level": "核6级", "lat": 34.115, "lng": 118.775, "capacity": 3000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "沭阳县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_sq_001", "name": "宿迁发电厂", "type": "power", "lat": 33.975, "lng": 118.260, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_sq_002", "name": "洋河酒厂", "type": "factory", "lat": 33.755, "lng": 118.365, "threatLevel": "medium", "impactRadius": 1000, "description": "酿酒生产基地" },
            { "id": "nt_sq_003", "name": "恒力工业园", "type": "factory", "lat": 33.985, "lng": 118.285, "threatLevel": "high", "impactRadius": 1400, "description": "纺织工业园区" }
        ]
    },
    "huaian": { 
        "name": "淮安", 
        "center": [119.0153, 33.6104], 
        "shelters": [
            { "id": "ha_001", "name": "淮安东站地下人防", "type": "transport", "level": "核6级", "lat": 33.615, "lng": 119.020, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "淮安东站地下一层" },
            { "id": "ha_002", "name": "清江浦区地下避难所", "type": "civil", "level": "核6级", "lat": 33.605, "lng": 119.005, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "清江浦区中心地下" },
            { "id": "ha_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 33.610, "lng": 119.010, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "ha_004", "name": "周恩来纪念馆地下防护", "type": "government", "level": "核5级", "lat": 33.595, "lng": 119.025, "capacity": 2500, "facilities": "深埋结构、密闭门、应急水源", "access": "周恩来纪念馆地下" },
            { "id": "ha_005", "name": "洪泽区人防工程", "type": "civil", "level": "核6级", "lat": 33.295, "lng": 118.875, "capacity": 2200, "facilities": "独立通风、滤毒设备、通讯设备", "access": "洪泽区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ha_001", "name": "淮安发电厂", "type": "power", "lat": 33.625, "lng": 118.990, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_ha_002", "name": "淮安港", "type": "port", "lat": 33.585, "lng": 119.085, "threatLevel": "high", "impactRadius": 1600, "description": "内河港口" },
            { "id": "nt_ha_003", "name": "洪泽湖大堤", "type": "water", "lat": 33.285, "lng": 118.865, "threatLevel": "critical", "impactRadius": 2000, "description": "重要水利设施" }
        ]
    },
    "lianyungang": { 
        "name": "连云港", 
        "center": [119.2216, 34.5967], 
        "shelters": [
            { "id": "lyg_001", "name": "连云港站地下人防", "type": "transport", "level": "核6级", "lat": 34.600, "lng": 119.225, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "连云港站地下一层" },
            { "id": "lyg_002", "name": "海州区地下避难所", "type": "civil", "level": "核6级", "lat": 34.595, "lng": 119.215, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "海州区中心地下" },
            { "id": "lyg_003", "name": "苏宁广场地下掩体", "type": "mall", "level": "核6级", "lat": 34.590, "lng": 119.220, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "苏宁广场地下二层" },
            { "id": "lyg_004", "name": "花果山地下防护", "type": "civil", "level": "核6级", "lat": 34.635, "lng": 119.265, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "花果山景区地下" },
            { "id": "lyg_005", "name": "连云区人防工程", "type": "government", "level": "核5级", "lat": 34.745, "lng": 119.455, "capacity": 3500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "连云区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_lyg_001", "name": "连云港港", "type": "port", "lat": 34.745, "lng": 119.455, "threatLevel": "critical", "impactRadius": 2000, "description": "重要海港设施" },
            { "id": "nt_lyg_002", "name": "田湾核电站", "type": "nuclear", "lat": 34.685, "lng": 119.485, "threatLevel": "critical", "impactRadius": 5000, "description": "核电站设施" },
            { "id": "nt_lyg_003", "name": "连云港发电厂", "type": "power", "lat": 34.580, "lng": 119.205, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "yancheng2": { 
        "name": "盐城", 
        "center": [120.1616, 33.3796], 
        "shelters": [
            { "id": "yc2_001", "name": "盐城火车站地下人防", "type": "transport", "level": "核6级", "lat": 33.385, "lng": 120.165, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "盐城站地下一层" },
            { "id": "yc2_002", "name": "亭湖区地下避难所", "type": "civil", "level": "核6级", "lat": 33.385, "lng": 120.155, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "亭湖区中心地下" },
            { "id": "yc2_003", "name": "宝龙广场地下掩体", "type": "mall", "level": "核6级", "lat": 33.375, "lng": 120.160, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "宝龙广场地下二层" },
            { "id": "yc2_004", "name": "新四军纪念馆地下防护", "type": "government", "level": "核5级", "lat": 33.395, "lng": 120.145, "capacity": 2200, "facilities": "独立通风、密闭门、应急水源", "access": "新四军纪念馆地下" },
            { "id": "yc2_005", "name": "大丰区人防工程", "type": "civil", "level": "核6级", "lat": 33.195, "lng": 120.465, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "大丰区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yc2_001", "name": "盐城发电厂", "type": "power", "lat": 33.405, "lng": 120.140, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_yc2_002", "name": "大丰港", "type": "port", "lat": 33.195, "lng": 120.825, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_yc2_003", "name": "盐城机场", "type": "military", "lat": 33.425, "lng": 120.205, "threatLevel": "high", "impactRadius": 1800, "description": "军民合用机场" }
        ]
    },

    // ========== 浙江省补充 ==========
    "jinhua": { 
        "name": "金华", 
        "center": [119.6521, 29.1107], 
        "shelters": [
            { "id": "jh_001", "name": "金华火车站地下人防", "type": "transport", "level": "核6级", "lat": 29.115, "lng": 119.657, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "金华站地下一层" },
            { "id": "jh_002", "name": "婺城区地下避难所", "type": "civil", "level": "核6级", "lat": 29.110, "lng": 119.645, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "婺城区中心地下" },
            { "id": "jh_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 29.105, "lng": 119.650, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "jh_004", "name": "双龙洞地下防护", "type": "civil", "level": "核6级", "lat": 29.165, "lng": 119.635, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "双龙洞景区地下" },
            { "id": "jh_005", "name": "义乌市人防工程", "type": "civil", "level": "核6级", "lat": 29.305, "lng": 120.075, "capacity": 4500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "义乌市中心地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jh_001", "name": "金华发电厂", "type": "power", "lat": 29.125, "lng": 119.635, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_jh_002", "name": "义乌国际商贸城", "type": "storage", "lat": 29.325, "lng": 120.085, "threatLevel": "medium", "impactRadius": 1200, "description": "大型物流仓储" },
            { "id": "nt_jh_003", "name": "横店影视基地", "type": "storage", "lat": 29.155, "lng": 120.315, "threatLevel": "low", "impactRadius": 800, "description": "文化产业基地" }
        ]
    },
    "taizhou": { 
        "name": "台州", 
        "center": [121.4311, 28.6623], 
        "shelters": [
            { "id": "tz_001", "name": "台州火车站地下人防", "type": "transport", "level": "核6级", "lat": 28.665, "lng": 121.435, "capacity": 3200, "facilities": "三防系统、应急供电、医疗站", "access": "台州站地下一层" },
            { "id": "tz_002", "name": "椒江区地下避难所", "type": "civil", "level": "核6级", "lat": 28.670, "lng": 121.425, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "椒江区中心地下" },
            { "id": "tz_003", "name": "青悦城地下掩体", "type": "mall", "level": "核6级", "lat": 28.660, "lng": 121.430, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "青悦城地下二层" },
            { "id": "tz_004", "name": "天台山地下防护", "type": "civil", "level": "核6级", "lat": 29.165, "lng": 121.035, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "天台山景区地下" },
            { "id": "tz_005", "name": "温岭市人防工程", "type": "civil", "level": "核6级", "lat": 28.370, "lng": 121.385, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "温岭市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_tz_001", "name": "台州港", "type": "port", "lat": 28.685, "lng": 121.465, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_tz_002", "name": "台州发电厂", "type": "power", "lat": 28.645, "lng": 121.415, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_tz_003", "name": "吉利汽车", "type": "factory", "lat": 28.630, "lng": 121.395, "threatLevel": "medium", "impactRadius": 1200, "description": "汽车制造基地" }
        ]
    },
    "lishui": { 
        "name": "丽水", 
        "center": [119.9233, 28.468], 
        "shelters": [
            { "id": "ls_001", "name": "丽水火车站地下人防", "type": "transport", "level": "核6级", "lat": 28.475, "lng": 119.928, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "丽水站地下一层" },
            { "id": "ls_002", "name": "莲都区地下避难所", "type": "civil", "level": "核6级", "lat": 28.470, "lng": 119.915, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "莲都区中心地下" },
            { "id": "ls_003", "name": "万地广场地下掩体", "type": "mall", "level": "核6级", "lat": 28.465, "lng": 119.920, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万地广场地下二层" },
            { "id": "ls_004", "name": "缙云仙都地下防护", "type": "civil", "level": "核6级", "lat": 28.655, "lng": 120.095, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "仙都景区地下" },
            { "id": "ls_005", "name": "龙泉市人防工程", "type": "civil", "level": "核6级", "lat": 28.075, "lng": 119.135, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "龙泉市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ls_001", "name": "紧水滩水电站", "type": "power", "lat": 28.235, "lng": 119.625, "threatLevel": "critical", "impactRadius": 2000, "description": "大型水电站" },
            { "id": "nt_ls_002", "name": "丽水发电厂", "type": "power", "lat": 28.485, "lng": 119.905, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "quzhou": { 
        "name": "衢州", 
        "center": [118.8595, 28.9703], 
        "shelters": [
            { "id": "qz_001", "name": "衢州火车站地下人防", "type": "transport", "level": "核6级", "lat": 28.975, "lng": 118.865, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "衢州站地下一层" },
            { "id": "qz_002", "name": "柯城区地下避难所", "type": "civil", "level": "核6级", "lat": 28.970, "lng": 118.855, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "柯城区中心地下" },
            { "id": "qz_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 28.965, "lng": 118.860, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "qz_004", "name": "江郎山地下防护", "type": "civil", "level": "核6级", "lat": 28.505, "lng": 118.565, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "江郎山景区地下" },
            { "id": "qz_005", "name": "龙游县人防工程", "type": "civil", "level": "核6级", "lat": 29.025, "lng": 119.175, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "龙游县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_qz_001", "name": "衢州化工厂", "type": "chemical", "lat": 28.955, "lng": 118.875, "threatLevel": "critical", "impactRadius": 1800, "description": "大型化工基地" },
            { "id": "nt_qz_002", "name": "黄坛口水电站", "type": "power", "lat": 28.835, "lng": 118.935, "threatLevel": "high", "impactRadius": 1800, "description": "大型水电站" },
            { "id": "nt_qz_003", "name": "衢州机场", "type": "military", "lat": 28.965, "lng": 118.895, "threatLevel": "high", "impactRadius": 1800, "description": "军民合用机场" }
        ]
    },
    "zhoushan": { 
        "name": "舟山", 
        "center": [122.1086, 30.0162], 
        "shelters": [
            { "id": "zs_001", "name": "舟山客运中心地下人防", "type": "transport", "level": "核6级", "lat": 30.020, "lng": 122.112, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "客运中心地下一层" },
            { "id": "zs_002", "name": "定海区地下避难所", "type": "civil", "level": "核6级", "lat": 30.015, "lng": 122.105, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "定海区中心地下" },
            { "id": "zs_003", "name": "凯虹广场地下掩体", "type": "mall", "level": "核6级", "lat": 30.010, "lng": 122.110, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "凯虹广场地下二层" },
            { "id": "zs_004", "name": "普陀山地下防护", "type": "civil", "level": "核6级", "lat": 30.015, "lng": 122.385, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "普陀山景区地下" },
            { "id": "zs_005", "name": "岱山县人防工程", "type": "civil", "level": "核6级", "lat": 30.245, "lng": 122.205, "capacity": 1800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "岱山县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zs_001", "name": "舟山港", "type": "port", "lat": 30.005, "lng": 122.105, "threatLevel": "critical", "impactRadius": 2000, "description": "重要海港设施" },
            { "id": "nt_zs_002", "name": "定海发电厂", "type": "power", "lat": 30.025, "lng": 122.095, "threatLevel": "high", "impactRadius": 1500, "description": "岛屿电力供应" },
            { "id": "nt_zs_003", "name": "舟山石化", "type": "chemical", "lat": 30.055, "lng": 121.985, "threatLevel": "critical", "impactRadius": 2000, "description": "石油储备基地" }
        ]
    },

    // ========== 福建省补充 ==========
    "ningde": { 
        "name": "宁德", 
        "center": [119.5479, 26.6655], 
        "shelters": [
            { "id": "nd_001", "name": "宁德火车站地下人防", "type": "transport", "level": "核6级", "lat": 26.670, "lng": 119.552, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "宁德站地下一层" },
            { "id": "nd_002", "name": "蕉城区地下避难所", "type": "civil", "level": "核6级", "lat": 26.665, "lng": 119.540, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "蕉城区中心地下" },
            { "id": "nd_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 26.660, "lng": 119.545, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "nd_004", "name": "太姥山地下防护", "type": "civil", "level": "核6级", "lat": 27.085, "lng": 120.205, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "太姥山景区地下" },
            { "id": "nd_005", "name": "福安市人防工程", "type": "civil", "level": "核6级", "lat": 27.085, "lng": 119.645, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "福安市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_nd_001", "name": "宁德核电站", "type": "nuclear", "lat": 27.045, "lng": 120.285, "threatLevel": "critical", "impactRadius": 5000, "description": "核电站设施" },
            { "id": "nt_nd_002", "name": "三都澳港", "type": "port", "lat": 26.645, "lng": 119.625, "threatLevel": "high", "impactRadius": 1600, "description": "军港设施" },
            { "id": "nt_nd_003", "name": "宁德发电厂", "type": "power", "lat": 26.675, "lng": 119.530, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "nanping": { 
        "name": "南平", 
        "center": [118.1205, 27.3319], 
        "shelters": [
            { "id": "np_001", "name": "南平火车站地下人防", "type": "transport", "level": "核6级", "lat": 27.335, "lng": 118.125, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "南平站地下一层" },
            { "id": "np_002", "name": "延平区地下避难所", "type": "civil", "level": "核6级", "lat": 26.635, "lng": 118.165, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "延平区中心地下" },
            { "id": "np_003", "name": "武夷山地下掩体", "type": "civil", "level": "核6级", "lat": 27.665, "lng": 118.035, "capacity": 2000, "facilities": "大型通风系统、生活物资储备", "access": "武夷山景区地下" },
            { "id": "np_004", "name": "建阳区人防工程", "type": "civil", "level": "核6级", "lat": 27.335, "lng": 118.125, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "建阳区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_np_001", "name": "沙溪口水电站", "type": "power", "lat": 26.485, "lng": 118.115, "threatLevel": "high", "impactRadius": 1800, "description": "大型水电站" },
            { "id": "nt_np_002", "name": "南平化工厂", "type": "chemical", "lat": 26.645, "lng": 118.175, "threatLevel": "high", "impactRadius": 1400, "description": "化工生产基地" }
        ]
    },
    "sanming": { 
        "name": "三明", 
        "center": [117.6392, 26.2639], 
        "shelters": [
            { "id": "sm_001", "name": "三明火车站地下人防", "type": "transport", "level": "核6级", "lat": 26.268, "lng": 117.644, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "三明站地下一层" },
            { "id": "sm_002", "name": "梅列区地下避难所", "type": "civil", "level": "核6级", "lat": 26.270, "lng": 117.635, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "梅列区中心地下" },
            { "id": "sm_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 26.265, "lng": 117.640, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "sm_004", "name": "泰宁地下防护", "type": "civil", "level": "核6级", "lat": 26.905, "lng": 117.175, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "泰宁景区地下" },
            { "id": "sm_005", "name": "永安市人防工程", "type": "civil", "level": "核6级", "lat": 25.975, "lng": 117.365, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "永安市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_sm_001", "name": "三明化工厂", "type": "chemical", "lat": 26.255, "lng": 117.655, "threatLevel": "critical", "impactRadius": 1800, "description": "大型化工基地" },
            { "id": "nt_sm_002", "name": "沙溪水电站", "type": "power", "lat": 26.225, "lng": 117.585, "threatLevel": "high", "impactRadius": 1800, "description": "大型水电站" },
            { "id": "nt_sm_003", "name": "三明钢铁厂", "type": "factory", "lat": 26.245, "lng": 117.665, "threatLevel": "high", "impactRadius": 1400, "description": "钢铁生产基地" }
        ]
    },
    "longyan": { 
        "name": "龙岩", 
        "center": [117.0304, 25.0751], 
        "shelters": [
            { "id": "ly_001", "name": "龙岩火车站地下人防", "type": "transport", "level": "核6级", "lat": 25.080, "lng": 117.035, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "龙岩站地下一层" },
            { "id": "ly_002", "name": "新罗区地下避难所", "type": "civil", "level": "核6级", "lat": 25.075, "lng": 117.025, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "新罗区中心地下" },
            { "id": "ly_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 25.070, "lng": 117.030, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "ly_004", "name": "永定土楼地下防护", "type": "civil", "level": "核6级", "lat": 24.665, "lng": 117.035, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "永定土楼景区地下" },
            { "id": "ly_005", "name": "上杭县人防工程", "type": "civil", "level": "核6级", "lat": 25.055, "lng": 116.425, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "上杭县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ly_001", "name": "龙岩坑口电厂", "type": "power", "lat": 25.095, "lng": 117.015, "threatLevel": "high", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_ly_002", "name": "龙岩化工厂", "type": "chemical", "lat": 25.055, "lng": 117.055, "threatLevel": "high", "impactRadius": 1400, "description": "化工生产基地" },
            { "id": "nt_ly_003", "name": "紫金矿业", "type": "factory", "lat": 25.185, "lng": 116.415, "threatLevel": "medium", "impactRadius": 1200, "description": "矿业生产基地" }
        ]
    },

    // ========== 广东省补充 ==========
    "shaoguan": { 
        "name": "韶关", 
        "center": [113.5973, 24.8104], 
        "shelters": [
            { "id": "sg_001", "name": "韶关火车站地下人防", "type": "transport", "level": "核6级", "lat": 24.815, "lng": 113.602, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "韶关站地下一层" },
            { "id": "sg_002", "name": "浈江区地下避难所", "type": "civil", "level": "核6级", "lat": 24.805, "lng": 113.590, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "浈江区中心地下" },
            { "id": "sg_003", "name": "风度名城地下掩体", "type": "mall", "level": "核6级", "lat": 24.810, "lng": 113.595, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "风度名城地下二层" },
            { "id": "sg_004", "name": "丹霞山地下防护", "type": "civil", "level": "核6级", "lat": 25.035, "lng": 113.755, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "丹霞山景区地下" },
            { "id": "sg_005", "name": "曲江区人防工程", "type": "civil", "level": "核6级", "lat": 24.685, "lng": 113.605, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "曲江区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_sg_001", "name": "韶关发电厂", "type": "power", "lat": 24.825, "lng": 113.580, "threatLevel": "critical", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_sg_002", "name": "韶关冶炼厂", "type": "chemical", "lat": 24.665, "lng": 113.615, "threatLevel": "high", "impactRadius": 1600, "description": "有色金属冶炼" },
            { "id": "nt_sg_003", "name": "大宝山矿", "type": "storage", "lat": 24.515, "lng": 113.785, "threatLevel": "high", "impactRadius": 1400, "description": "矿产资源基地" }
        ]
    },
    "zhanjiang": { 
        "name": "湛江", 
        "center": [110.3594, 21.2708], 
        "shelters": [
            { "id": "zj_001", "name": "湛江火车站地下人防", "type": "transport", "level": "核6级", "lat": 21.275, "lng": 110.364, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "湛江站地下一层" },
            { "id": "zj_002", "name": "赤坎区地下避难所", "type": "civil", "level": "核6级", "lat": 21.270, "lng": 110.355, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "赤坎区中心地下" },
            { "id": "zj_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 21.265, "lng": 110.360, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "zj_004", "name": "湖光岩地下防护", "type": "civil", "level": "核6级", "lat": 21.155, "lng": 110.285, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "湖光岩景区地下" },
            { "id": "zj_005", "name": "霞山区人防工程", "type": "government", "level": "核5级", "lat": 21.205, "lng": 110.405, "capacity": 3500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "霞山区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zj_001", "name": "湛江港", "type": "port", "lat": 21.195, "lng": 110.395, "threatLevel": "critical", "impactRadius": 2000, "description": "重要军港设施" },
            { "id": "nt_zj_002", "name": "湛江发电厂", "type": "power", "lat": 21.285, "lng": 110.345, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_zj_003", "name": "南海舰队基地", "type": "military", "lat": 21.175, "lng": 110.425, "threatLevel": "critical", "impactRadius": 2500, "description": "海军基地" }
        ]
    },
    "maoming": { 
        "name": "茂名", 
        "center": [110.9255, 21.6624], 
        "shelters": [
            { "id": "mm_001", "name": "茂名火车站地下人防", "type": "transport", "level": "核6级", "lat": 21.667, "lng": 110.930, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "茂名站地下一层" },
            { "id": "mm_002", "name": "茂南区地下避难所", "type": "civil", "level": "核6级", "lat": 21.665, "lng": 110.920, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "茂南区中心地下" },
            { "id": "mm_003", "name": "东汇城地下掩体", "type": "mall", "level": "核6级", "lat": 21.660, "lng": 110.925, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "东汇城地下二层" },
            { "id": "mm_004", "name": "高州市人防工程", "type": "civil", "level": "核6级", "lat": 21.925, "lng": 110.855, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "高州市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_mm_001", "name": "茂名石化", "type": "chemical", "lat": 21.645, "lng": 110.945, "threatLevel": "critical", "impactRadius": 2500, "description": "大型石化基地" },
            { "id": "nt_mm_002", "name": "茂名热电厂", "type": "power", "lat": 21.685, "lng": 110.910, "threatLevel": "high", "impactRadius": 1600, "description": "城市电力供应" },
            { "id": "nt_mm_003", "name": "水东港", "type": "port", "lat": 21.505, "lng": 111.005, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" }
        ]
    },
    "jiangmen": { 
        "name": "江门", 
        "center": [113.0815, 22.5802], 
        "shelters": [
            { "id": "jm_001", "name": "江门火车站地下人防", "type": "transport", "level": "核6级", "lat": 22.585, "lng": 113.086, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "江门站地下一层" },
            { "id": "jm_002", "name": "蓬江区地下避难所", "type": "civil", "level": "核6级", "lat": 22.585, "lng": 113.075, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "蓬江区中心地下" },
            { "id": "jm_003", "name": "汇悦大融城地下掩体", "type": "mall", "level": "核6级", "lat": 22.580, "lng": 113.080, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "汇悦大融城地下二层" },
            { "id": "jm_004", "name": "开平碉楼地下防护", "type": "civil", "level": "核6级", "lat": 22.375, "lng": 112.685, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "开平碉楼景区地下" },
            { "id": "jm_005", "name": "台山市人防工程", "type": "civil", "level": "核6级", "lat": 22.255, "lng": 112.795, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "台山市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jm_001", "name": "江门发电厂", "type": "power", "lat": 22.595, "lng": 113.065, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_jm_002", "name": "新会港", "type": "port", "lat": 22.525, "lng": 113.035, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_jm_003", "name": "台山核电站", "type": "nuclear", "lat": 21.915, "lng": 112.985, "threatLevel": "critical", "impactRadius": 5000, "description": "核电站设施" }
        ]
    },
    "yangjiang": { 
        "name": "阳江", 
        "center": [111.9826, 21.8583], 
        "shelters": [
            { "id": "yj_001", "name": "阳江火车站地下人防", "type": "transport", "level": "核6级", "lat": 21.863, "lng": 111.987, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "阳江站地下一层" },
            { "id": "yj_002", "name": "江城区地下避难所", "type": "civil", "level": "核6级", "lat": 21.860, "lng": 111.975, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "江城区中心地下" },
            { "id": "yj_003", "name": "百利广场地下掩体", "type": "mall", "level": "核6级", "lat": 21.855, "lng": 111.980, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "百利广场地下二层" },
            { "id": "yj_004", "name": "海陵岛地下防护", "type": "civil", "level": "核6级", "lat": 21.585, "lng": 111.825, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "海陵岛地下" },
            { "id": "yj_005", "name": "阳春市人防工程", "type": "civil", "level": "核6级", "lat": 22.175, "lng": 111.785, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "阳春市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yj_001", "name": "阳江核电站", "type": "nuclear", "lat": 21.705, "lng": 112.265, "threatLevel": "critical", "impactRadius": 5000, "description": "核电站设施" },
            { "id": "nt_yj_002", "name": "阳江港", "type": "port", "lat": 21.825, "lng": 111.955, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_yj_003", "name": "阳江发电厂", "type": "power", "lat": 21.875, "lng": 111.965, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "qingyuan": { 
        "name": "清远", 
        "center": [113.0564, 23.682], 
        "shelters": [
            { "id": "qy_001", "name": "清远火车站地下人防", "type": "transport", "level": "核6级", "lat": 23.687, "lng": 113.061, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "清远站地下一层" },
            { "id": "qy_002", "name": "清城区地下避难所", "type": "civil", "level": "核6级", "lat": 23.685, "lng": 113.050, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "清城区中心地下" },
            { "id": "qy_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 23.680, "lng": 113.055, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "qy_004", "name": "连州地下防护", "type": "civil", "level": "核6级", "lat": 24.785, "lng": 112.385, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "连州地下" },
            { "id": "qy_005", "name": "英德市人防工程", "type": "civil", "level": "核6级", "lat": 24.185, "lng": 113.415, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "英德市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_qy_001", "name": "清远发电厂", "type": "power", "lat": 23.705, "lng": 113.035, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_qy_002", "name": "飞来峡水利枢纽", "type": "water", "lat": 23.745, "lng": 113.125, "threatLevel": "critical", "impactRadius": 2000, "description": "重要水利设施" },
            { "id": "nt_qy_003", "name": "英德水泥厂", "type": "factory", "lat": 24.175, "lng": 113.425, "threatLevel": "medium", "impactRadius": 1000, "description": "建材生产基地" }
        ]
    },
    "jieyang": { 
        "name": "揭阳", 
        "center": [116.3728, 23.5504], 
        "shelters": [
            { "id": "jy_001", "name": "揭阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 23.555, "lng": 116.377, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "揭阳站地下一层" },
            { "id": "jy_002", "name": "榕城区地下避难所", "type": "civil", "level": "核6级", "lat": 23.550, "lng": 116.365, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "榕城区中心地下" },
            { "id": "jy_003", "name": "揭阳万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 23.545, "lng": 116.370, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "jy_004", "name": "普宁市人防工程", "type": "civil", "level": "核6级", "lat": 23.295, "lng": 116.165, "capacity": 3200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "普宁市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jy_001", "name": "揭阳潮汕机场", "type": "military", "lat": 23.555, "lng": 116.515, "threatLevel": "high", "impactRadius": 1800, "description": "民航机场" },
            { "id": "nt_jy_002", "name": "揭阳发电厂", "type": "power", "lat": 23.575, "lng": 116.345, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_jy_003", "name": "大南海石化", "type": "chemical", "lat": 22.895, "lng": 116.295, "threatLevel": "critical", "impactRadius": 2000, "description": "大型石化基地" }
        ]
    },
    "yunfu": { 
        "name": "云浮", 
        "center": [112.0447, 22.9156], 
        "shelters": [
            { "id": "yf_001", "name": "云浮火车站地下人防", "type": "transport", "level": "核6级", "lat": 22.920, "lng": 112.049, "capacity": 2200, "facilities": "三防系统、应急供电、医疗站", "access": "云浮站地下一层" },
            { "id": "yf_002", "name": "云城区地下避难所", "type": "civil", "level": "核6级", "lat": 22.915, "lng": 112.040, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "云城区中心地下" },
            { "id": "yf_003", "name": "益华国际广场地下掩体", "type": "mall", "level": "核6级", "lat": 22.910, "lng": 112.045, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "益华广场地下二层" },
            { "id": "yf_004", "name": "罗定市人防工程", "type": "civil", "level": "核6级", "lat": 22.765, "lng": 111.575, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "罗定市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yf_001", "name": "云浮发电厂", "type": "power", "lat": 22.935, "lng": 112.025, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_yf_002", "name": "云浮硫铁矿", "type": "storage", "lat": 22.955, "lng": 111.925, "threatLevel": "medium", "impactRadius": 1200, "description": "矿产资源基地" }
        ]
    },

    // ========== 广西补充 ==========
    "liuzhou": { 
        "name": "柳州", 
        "center": [109.416, 24.3255], 
        "shelters": [
            { "id": "lz_001", "name": "柳州火车站地下人防", "type": "transport", "level": "核6级", "lat": 24.330, "lng": 109.421, "capacity": 4000, "facilities": "三防系统、应急供电、医疗站", "access": "柳州站地下一层" },
            { "id": "lz_002", "name": "城中区地下避难所", "type": "civil", "level": "核6级", "lat": 24.325, "lng": 109.410, "capacity": 3800, "facilities": "通风过滤、储水设施、应急照明", "access": "城中区中心地下" },
            { "id": "lz_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 24.320, "lng": 109.415, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "lz_004", "name": "柳江地下防护", "type": "civil", "level": "核6级", "lat": 24.255, "lng": 109.395, "capacity": 2800, "facilities": "独立通风、密闭门、应急水源", "access": "柳江区地下" },
            { "id": "lz_005", "name": "柳城县人防工程", "type": "civil", "level": "核6级", "lat": 24.655, "lng": 109.245, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "柳城县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_lz_001", "name": "柳州钢铁厂", "type": "factory", "lat": 24.335, "lng": 109.385, "threatLevel": "critical", "impactRadius": 2000, "description": "大型钢铁基地" },
            { "id": "nt_lz_002", "name": "柳州化工厂", "type": "chemical", "lat": 24.345, "lng": 109.425, "threatLevel": "critical", "impactRadius": 1800, "description": "大型化工基地" },
            { "id": "nt_lz_003", "name": "柳州发电厂", "type": "power", "lat": 24.305, "lng": 109.395, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "guilin": { 
        "name": "桂林", 
        "center": [110.1786, 25.2343], 
        "shelters": [
            { "id": "gl_001", "name": "桂林火车站地下人防", "type": "transport", "level": "核6级", "lat": 25.240, "lng": 110.183, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "桂林站地下一层" },
            { "id": "gl_002", "name": "秀峰区地下避难所", "type": "civil", "level": "核6级", "lat": 25.275, "lng": 110.285, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "秀峰区中心地下" },
            { "id": "gl_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 25.270, "lng": 110.290, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "gl_004", "name": "象鼻山地下防护", "type": "civil", "level": "核6级", "lat": 25.265, "lng": 110.295, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "象鼻山景区地下" },
            { "id": "gl_005", "name": "阳朔县人防工程", "type": "civil", "level": "核6级", "lat": 24.775, "lng": 110.495, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "阳朔县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_gl_001", "name": "桂林发电厂", "type": "power", "lat": 25.295, "lng": 110.275, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_gl_002", "name": "桂林两江机场", "type": "military", "lat": 25.215, "lng": 110.045, "threatLevel": "high", "impactRadius": 1800, "description": "民航机场" },
            { "id": "nt_gl_003", "name": "漓江水利枢纽", "type": "water", "lat": 25.185, "lng": 110.425, "threatLevel": "high", "impactRadius": 1600, "description": "水利设施" }
        ]
    },

    // ========== 海南省补充 ==========
    "haikou": { 
        "name": "海口", 
        "center": [110.3492, 20.0444], 
        "shelters": [
            { "id": "hk_001", "name": "海口火车站地下人防", "type": "transport", "level": "核6级", "lat": 20.050, "lng": 110.355, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "海口站地下一层" },
            { "id": "hk_002", "name": "龙华区地下避难所", "type": "civil", "level": "核6级", "lat": 20.045, "lng": 110.320, "capacity": 4000, "facilities": "通风过滤、储水设施、应急照明", "access": "龙华区中心地下" },
            { "id": "hk_003", "name": "日月广场地下掩体", "type": "mall", "level": "核6级", "lat": 20.040, "lng": 110.330, "capacity": 5000, "facilities": "大型通风系统、生活物资储备", "access": "日月广场地下二层" },
            { "id": "hk_004", "name": "美兰机场地下防护", "type": "government", "level": "核5级", "lat": 19.935, "lng": 110.465, "capacity": 4500, "facilities": "深埋结构、密闭门、应急水源", "access": "美兰机场地下" },
            { "id": "hk_005", "name": "琼山区人防工程", "type": "civil", "level": "核6级", "lat": 20.005, "lng": 110.355, "capacity": 3200, "facilities": "独立通风、滤毒设备、通讯设备", "access": "琼山区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_hk_001", "name": "海口港", "type": "port", "lat": 20.025, "lng": 110.295, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_hk_002", "name": "美兰机场", "type": "military", "lat": 19.935, "lng": 110.465, "threatLevel": "high", "impactRadius": 1800, "description": "民航机场" },
            { "id": "nt_hk_003", "name": "海口发电厂", "type": "power", "lat": 20.065, "lng": 110.285, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "sanya": { 
        "name": "三亚", 
        "center": [109.5121, 18.2536], 
        "shelters": [
            { "id": "sy_001", "name": "三亚火车站地下人防", "type": "transport", "level": "核6级", "lat": 18.260, "lng": 109.518, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "三亚站地下一层" },
            { "id": "sy_002", "name": "天涯区地下避难所", "type": "civil", "level": "核6级", "lat": 18.255, "lng": 109.505, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "天涯区中心地下" },
            { "id": "sy_003", "name": "免税店地下掩体", "type": "mall", "level": "核6级", "lat": 18.250, "lng": 109.510, "capacity": 4000, "facilities": "大型通风系统、生活物资储备", "access": "免税店地下二层" },
            { "id": "sy_004", "name": "亚龙湾地下防护", "type": "civil", "level": "核6级", "lat": 18.215, "lng": 109.635, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "亚龙湾地下" },
            { "id": "sy_005", "name": "海棠湾人防工程", "type": "government", "level": "核5级", "lat": 18.305, "lng": 109.755, "capacity": 3000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "海棠湾地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_sy_001", "name": "三亚港", "type": "port", "lat": 18.235, "lng": 109.485, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" },
            { "id": "nt_sy_002", "name": "凤凰机场", "type": "military", "lat": 18.305, "lng": 109.415, "threatLevel": "high", "impactRadius": 1800, "description": "民航机场" },
            { "id": "nt_sy_003", "name": "南山港", "type": "port", "lat": 18.295, "lng": 109.205, "threatLevel": "high", "impactRadius": 1600, "description": "货运港口" }
        ]
    },
    "sansha": { 
        "name": "三沙", 
        "center": [112.335, 16.831], 
        "shelters": [
            { "id": "ss_001", "name": "永兴岛地下人防", "type": "government", "level": "核5级", "lat": 16.835, "lng": 112.340, "capacity": 2500, "facilities": "三防系统、应急供电、海水淡化", "access": "永兴岛地下" },
            { "id": "ss_002", "name": "七连屿地下避难所", "type": "civil", "level": "核6级", "lat": 16.945, "lng": 112.285, "capacity": 1500, "facilities": "通风过滤、储水设施、应急照明", "access": "七连屿地下" },
            { "id": "ss_003", "name": "永暑礁地下掩体", "type": "military", "level": "核5级", "lat": 9.555, "lng": 112.885, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "永暑礁地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ss_001", "name": "永兴岛机场", "type": "military", "lat": 16.830, "lng": 112.345, "threatLevel": "critical", "impactRadius": 2000, "description": "军事机场" },
            { "id": "nt_ss_002", "name": "永暑礁基地", "type": "military", "lat": 9.555, "lng": 112.885, "threatLevel": "critical", "impactRadius": 2500, "description": "军事基地" }
        ]
    },
    "danzhou": { 
        "name": "儋州", 
        "center": [109.5808, 19.5248], 
        "shelters": [
            { "id": "dz_001", "name": "儋州火车站地下人防", "type": "transport", "level": "核6级", "lat": 19.530, "lng": 109.586, "capacity": 2200, "facilities": "三防系统、应急供电、医疗站", "access": "儋州站地下一层" },
            { "id": "dz_002", "name": "那大镇地下避难所", "type": "civil", "level": "核6级", "lat": 19.520, "lng": 109.575, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "那大镇中心地下" },
            { "id": "dz_003", "name": "海花岛地下掩体", "type": "mall", "level": "核6级", "lat": 19.705, "lng": 109.185, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "海花岛地下" },
            { "id": "dz_004", "name": "洋浦港地下防护", "type": "government", "level": "核5级", "lat": 19.745, "lng": 109.185, "capacity": 3500, "facilities": "深埋结构、密闭门、应急水源", "access": "洋浦港地下" }
        ], 
        "nuclearTargets": [
            { "id": "nt_dz_001", "name": "洋浦港", "type": "port", "lat": 19.745, "lng": 109.185, "threatLevel": "high", "impactRadius": 1600, "description": "重要港口" },
            { "id": "nt_dz_002", "name": "儋州发电厂", "type": "power", "lat": 19.535, "lng": 109.565, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },

    // ========== 更多城市继续添加 ==========
    // 继续添加剩余城市...
    
}; // end SUPPLEMENT_CITIES

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPPLEMENT_CITIES;
}
