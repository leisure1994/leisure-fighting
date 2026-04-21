// 继续添加剩余城市数据 - PART 2
// 此文件包含补充城市的第2部分

const SUPPLEMENT_CITIES_PART2 = {
    // ========== 江西省补充 ==========
    "yingtan": { 
        "name": "鹰潭", 
        "center": [117.0357, 28.239], 
        "shelters": [
            { "id": "yt_001", "name": "鹰潭火车站地下人防", "type": "transport", "level": "核6级", "lat": 28.245, "lng": 117.042, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "鹰潭站地下一层" },
            { "id": "yt_002", "name": "月湖区地下避难所", "type": "civil", "level": "核6级", "lat": 28.240, "lng": 117.030, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "月湖区中心地下" },
            { "id": "yt_003", "name": "凯翔新天地地下掩体", "type": "mall", "level": "核6级", "lat": 28.235, "lng": 117.035, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "凯翔新天地地下二层" },
            { "id": "yt_004", "name": "龙虎山地下防护", "type": "civil", "level": "核6级", "lat": 28.115, "lng": 116.995, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "龙虎山景区地下" },
            { "id": "yt_005", "name": "贵溪市人防工程", "type": "civil", "level": "核6级", "lat": 28.295, "lng": 117.205, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "贵溪市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yt_001", "name": "贵溪冶炼厂", "type": "chemical", "lat": 28.305, "lng": 117.215, "threatLevel": "critical", "impactRadius": 2000, "description": "大型冶炼基地" },
            { "id": "nt_yt_002", "name": "鹰潭发电厂", "type": "power", "lat": 28.255, "lng": 117.025, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "pingxiang": { 
        "name": "萍乡", 
        "center": [113.8547, 27.6225], 
        "shelters": [
            { "id": "px_001", "name": "萍乡火车站地下人防", "type": "transport", "level": "核6级", "lat": 27.628, "lng": 113.860, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "萍乡站地下一层" },
            { "id": "px_002", "name": "安源区地下避难所", "type": "civil", "level": "核6级", "lat": 27.625, "lng": 113.850, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "安源区中心地下" },
            { "id": "px_003", "name": "润达国际地下掩体", "type": "mall", "level": "核6级", "lat": 27.620, "lng": 113.855, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "润达国际地下二层" },
            { "id": "px_004", "name": "武功山地下防护", "type": "civil", "level": "核6级", "lat": 27.455, "lng": 114.165, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "武功山景区地下" },
            { "id": "px_005", "name": "湘东区人防工程", "type": "civil", "level": "核6级", "lat": 27.645, "lng": 113.735, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "湘东区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_px_001", "name": "安源煤矿", "type": "storage", "lat": 27.615, "lng": 113.865, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" },
            { "id": "nt_px_002", "name": "萍乡发电厂", "type": "power", "lat": 27.635, "lng": 113.840, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_px_003", "name": "萍乡钢厂", "type": "factory", "lat": 27.655, "lng": 113.825, "threatLevel": "high", "impactRadius": 1400, "description": "钢铁生产基地" }
        ]
    },
    "jingdezhen": { 
        "name": "景德镇", 
        "center": [117.2147, 29.2726], 
        "shelters": [
            { "id": "jdz_001", "name": "景德镇火车站地下人防", "type": "transport", "level": "核6级", "lat": 29.278, "lng": 117.220, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "景德镇站地下一层" },
            { "id": "jdz_002", "name": "珠山区地下避难所", "type": "civil", "level": "核6级", "lat": 29.275, "lng": 117.210, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "珠山区中心地下" },
            { "id": "jdz_003", "name": "金鼎广场地下掩体", "type": "mall", "level": "核6级", "lat": 29.270, "lng": 117.215, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "金鼎广场地下二层" },
            { "id": "jdz_004", "name": "陶瓷博物馆地下防护", "type": "government", "level": "核5级", "lat": 29.285, "lng": 117.195, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "陶瓷博物馆地下" },
            { "id": "jdz_005", "name": "乐平市人防工程", "type": "civil", "level": "核6级", "lat": 28.975, "lng": 117.125, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "乐平市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jdz_001", "name": "景德镇发电厂", "type": "power", "lat": 29.295, "lng": 117.200, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_jdz_002", "name": "乐平煤矿", "type": "storage", "lat": 28.985, "lng": 117.135, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" }
        ]
    },

    // ========== 湖南省补充 ==========
    "xiangtan": { 
        "name": "湘潭", 
        "center": [112.9444, 27.8311], 
        "shelters": [
            { "id": "xt_001", "name": "湘潭火车站地下人防", "type": "transport", "level": "核6级", "lat": 27.838, "lng": 112.950, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "湘潭站地下一层" },
            { "id": "xt_002", "name": "雨湖区地下避难所", "type": "civil", "level": "核6级", "lat": 27.835, "lng": 112.935, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "雨湖区中心地下" },
            { "id": "xt_003", "name": "步步高广场地下掩体", "type": "mall", "level": "核6级", "lat": 27.830, "lng": 112.940, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "步步高广场地下二层" },
            { "id": "xt_004", "name": "韶山地下防护", "type": "government", "level": "核5级", "lat": 27.915, "lng": 112.475, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "韶山景区地下" },
            { "id": "xt_005", "name": "岳塘区人防工程", "type": "civil", "level": "核6级", "lat": 27.865, "lng": 112.955, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "岳塘区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_xt_001", "name": "湘潭钢铁厂", "type": "factory", "lat": 27.845, "lng": 112.925, "threatLevel": "critical", "impactRadius": 2000, "description": "大型钢铁基地" },
            { "id": "nt_xt_002", "name": "湘潭发电厂", "type": "power", "lat": 27.875, "lng": 112.945, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_xt_003", "name": "湘机集团", "type": "factory", "lat": 27.825, "lng": 112.965, "threatLevel": "high", "impactRadius": 1400, "description": "机械制造基地" }
        ]
    },
    "hengyang": { 
        "name": "衡阳", 
        "center": [112.572, 26.8938], 
        "shelters": [
            { "id": "hy_001", "name": "衡阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 26.900, "lng": 112.578, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "衡阳站地下一层" },
            { "id": "hy_002", "name": "雁峰区地下避难所", "type": "civil", "level": "核6级", "lat": 26.895, "lng": 112.565, "capacity": 3800, "facilities": "通风过滤、储水设施、应急照明", "access": "雁峰区中心地下" },
            { "id": "hy_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 26.890, "lng": 112.570, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "hy_004", "name": "南岳衡山地下防护", "type": "civil", "level": "核6级", "lat": 27.295, "lng": 112.695, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "衡山景区地下" },
            { "id": "hy_005", "name": "珠晖区人防工程", "type": "civil", "level": "核6级", "lat": 26.915, "lng": 112.645, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "珠晖区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_hy_001", "name": "衡阳发电厂", "type": "power", "lat": 26.915, "lng": 112.555, "threatLevel": "critical", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_hy_002", "name": "水口山矿", "type": "storage", "lat": 26.415, "lng": 112.395, "threatLevel": "high", "impactRadius": 1400, "description": "有色金属矿" },
            { "id": "nt_hy_003", "name": "衡阳钢管厂", "type": "factory", "lat": 26.885, "lng": 112.585, "threatLevel": "high", "impactRadius": 1400, "description": "钢管生产基地" }
        ]
    },
    "yueyang": { 
        "name": "岳阳", 
        "center": [113.1289, 29.3566], 
        "shelters": [
            { "id": "yy_001", "name": "岳阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 29.363, "lng": 113.135, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "岳阳站地下一层" },
            { "id": "yy_002", "name": "岳阳楼区地下避难所", "type": "civil", "level": "核6级", "lat": 29.380, "lng": 113.095, "capacity": 3500, "facilities": "通风过滤、储水设施、应急照明", "access": "岳阳楼区中心地下" },
            { "id": "yy_003", "name": "百盛商场地下掩体", "type": "mall", "level": "核6级", "lat": 29.375, "lng": 113.100, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "百盛商场地下二层" },
            { "id": "yy_004", "name": "君山岛地下防护", "type": "civil", "level": "核6级", "lat": 29.325, "lng": 113.005, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "君山岛地下" },
            { "id": "yy_005", "name": "云溪区人防工程", "type": "civil", "level": "核6级", "lat": 29.485, "lng": 113.285, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "云溪区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yy_001", "name": "岳阳石化", "type": "chemical", "lat": 29.495, "lng": 113.295, "threatLevel": "critical", "impactRadius": 2000, "description": "大型石化基地" },
            { "id": "nt_yy_002", "name": "岳阳港", "type": "port", "lat": 29.385, "lng": 113.135, "threatLevel": "high", "impactRadius": 1600, "description": "内河港口" },
            { "id": "nt_yy_003", "name": "华能岳阳电厂", "type": "power", "lat": 29.515, "lng": 113.255, "threatLevel": "high", "impactRadius": 1800, "description": "大型火力发电" }
        ]
    },

    // ========== 河南省补充 ==========
    "luoyang": { 
        "name": "洛阳", 
        "center": [112.4345, 34.6184], 
        "shelters": [
            { "id": "ly2_001", "name": "洛阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 34.625, "lng": 112.440, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "洛阳站地下一层" },
            { "id": "ly2_002", "name": "西工区地下避难所", "type": "civil", "level": "核6级", "lat": 34.665, "lng": 112.435, "capacity": 3800, "facilities": "通风过滤、储水设施、应急照明", "access": "西工区中心地下" },
            { "id": "ly2_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 34.660, "lng": 112.440, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "ly2_004", "name": "龙门石窟地下防护", "type": "government", "level": "核5级", "lat": 34.555, "lng": 112.465, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "龙门石窟景区地下" },
            { "id": "ly2_005", "name": "涧西区人防工程", "type": "civil", "level": "核6级", "lat": 34.655, "lng": 112.385, "capacity": 3000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "涧西区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ly2_001", "name": "洛阳拖拉机厂", "type": "factory", "lat": 34.645, "lng": 112.395, "threatLevel": "high", "impactRadius": 1400, "description": "重型机械基地" },
            { "id": "nt_ly2_002", "name": "洛阳发电厂", "type": "power", "lat": 34.635, "lng": 112.425, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_ly2_003", "name": "洛阳石化", "type": "chemical", "lat": 34.695, "lng": 112.485, "threatLevel": "critical", "impactRadius": 1800, "description": "石化生产基地" }
        ]
    },
    "kaifeng": { 
        "name": "开封", 
        "center": [114.3073, 34.7972], 
        "shelters": [
            { "id": "kf_001", "name": "开封火车站地下人防", "type": "transport", "level": "核6级", "lat": 34.803, "lng": 114.313, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "开封站地下一层" },
            { "id": "kf_002", "name": "鼓楼区地下避难所", "type": "civil", "level": "核6级", "lat": 34.795, "lng": 114.345, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "鼓楼区中心地下" },
            { "id": "kf_003", "name": "大润发地下掩体", "type": "mall", "level": "核6级", "lat": 34.790, "lng": 114.350, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "大润发地下二层" },
            { "id": "kf_004", "name": "清明上河园地下防护", "type": "civil", "level": "核6级", "lat": 34.815, "lng": 114.305, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "清明上河园地下" },
            { "id": "kf_005", "name": "龙亭区人防工程", "type": "civil", "level": "核6级", "lat": 34.805, "lng": 114.355, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "龙亭区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_kf_001", "name": "开封发电厂", "type": "power", "lat": 34.815, "lng": 114.295, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_kf_002", "name": "开封空分厂", "type": "factory", "lat": 34.785, "lng": 114.365, "threatLevel": "medium", "impactRadius": 1200, "description": "工业气体基地" }
        ]
    },
    "anyang": { 
        "name": "安阳", 
        "center": [114.3924, 36.0976], 
        "shelters": [
            { "id": "ay_001", "name": "安阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 36.103, "lng": 114.398, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "安阳站地下一层" },
            { "id": "ay_002", "name": "文峰区地下避难所", "type": "civil", "level": "核6级", "lat": 36.095, "lng": 114.395, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "文峰区中心地下" },
            { "id": "ay_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 36.090, "lng": 114.400, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "ay_004", "name": "殷墟地下防护", "type": "government", "level": "核5级", "lat": 36.125, "lng": 114.315, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "殷墟景区地下" },
            { "id": "ay_005", "name": "北关区人防工程", "type": "civil", "level": "核6级", "lat": 36.105, "lng": 114.365, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "北关区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_ay_001", "name": "安阳钢铁厂", "type": "factory", "lat": 36.075, "lng": 114.385, "threatLevel": "critical", "impactRadius": 2000, "description": "大型钢铁基地" },
            { "id": "nt_ay_002", "name": "安阳发电厂", "type": "power", "lat": 36.115, "lng": 114.375, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_ay_003", "name": "安彩集团", "type": "factory", "lat": 36.085, "lng": 114.415, "threatLevel": "high", "impactRadius": 1400, "description": "玻璃制造基地" }
        ]
    },
    "xinxiang": { 
        "name": "新乡", 
        "center": [113.9268, 35.3037], 
        "shelters": [
            { "id": "xx_001", "name": "新乡火车站地下人防", "type": "transport", "level": "核6级", "lat": 35.310, "lng": 113.933, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "新乡站地下一层" },
            { "id": "xx_002", "name": "红旗区地下避难所", "type": "civil", "level": "核6级", "lat": 35.305, "lng": 113.920, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "红旗区中心地下" },
            { "id": "xx_003", "name": "宝龙广场地下掩体", "type": "mall", "level": "核6级", "lat": 35.300, "lng": 113.925, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "宝龙广场地下二层" },
            { "id": "xx_004", "name": "卫滨区人防工程", "type": "civil", "level": "核6级", "lat": 35.315, "lng": 113.865, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "卫滨区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_xx_001", "name": "新乡化纤厂", "type": "chemical", "lat": 35.285, "lng": 113.935, "threatLevel": "high", "impactRadius": 1400, "description": "化纤生产基地" },
            { "id": "nt_xx_002", "name": "新乡发电厂", "type": "power", "lat": 35.325, "lng": 113.905, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_xx_003", "name": "航空工业基地", "type": "military", "lat": 35.255, "lng": 113.875, "threatLevel": "high", "impactRadius": 1800, "description": "航空工业设施" }
        ]
    },

    // ========== 湖北省补充 ==========
    "jingzhou": { 
        "name": "荆州", 
        "center": [112.2397, 30.3348], 
        "shelters": [
            { "id": "jz_001", "name": "荆州火车站地下人防", "type": "transport", "level": "核6级", "lat": 30.341, "lng": 112.246, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "荆州站地下一层" },
            { "id": "jz_002", "name": "沙市区地下避难所", "type": "civil", "level": "核6级", "lat": 30.335, "lng": 112.255, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "沙市区中心地下" },
            { "id": "jz_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 30.330, "lng": 112.260, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "jz_004", "name": "荆州古城地下防护", "type": "government", "level": "核5级", "lat": 30.350, "lng": 112.195, "capacity": 2500, "facilities": "独立通风、密闭门、应急水源", "access": "荆州古城地下" },
            { "id": "jz_005", "name": "荆州区人防工程", "type": "civil", "level": "核6级", "lat": 30.355, "lng": 112.185, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "荆州区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jz_001", "name": "荆州热电厂", "type": "power", "lat": 30.365, "lng": 112.275, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_jz_002", "name": "荆州港", "type": "port", "lat": 30.325, "lng": 112.245, "threatLevel": "high", "impactRadius": 1600, "description": "内河港口" },
            { "id": "nt_jz_003", "name": "荆州石化", "type": "chemical", "lat": 30.345, "lng": 112.285, "threatLevel": "high", "impactRadius": 1400, "description": "石化生产基地" }
        ]
    },
    "yichang": { 
        "name": "宜昌", 
        "center": [111.2865, 30.6918], 
        "shelters": [
            { "id": "yc_001", "name": "宜昌火车站地下人防", "type": "transport", "level": "核6级", "lat": 30.698, "lng": 111.293, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "宜昌站地下一层" },
            { "id": "yc_002", "name": "西陵区地下避难所", "type": "civil", "level": "核6级", "lat": 30.695, "lng": 111.280, "capacity": 3800, "facilities": "通风过滤、储水设施、应急照明", "access": "西陵区中心地下" },
            { "id": "yc_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 30.690, "lng": 111.285, "capacity": 4200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "yc_004", "name": "葛洲坝地下防护", "type": "government", "level": "核5级", "lat": 30.735, "lng": 111.285, "capacity": 3000, "facilities": "独立通风、密闭门、应急水源", "access": "葛洲坝地下" },
            { "id": "yc_005", "name": "伍家岗区人防工程", "type": "civil", "level": "核6级", "lat": 30.645, "lng": 111.335, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "伍家岗区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_yc_001", "name": "三峡大坝", "type": "water", "lat": 30.825, "lng": 111.005, "threatLevel": "critical", "impactRadius": 5000, "description": "超级水利枢纽" },
            { "id": "nt_yc_002", "name": "葛洲坝电站", "type": "power", "lat": 30.745, "lng": 111.295, "threatLevel": "critical", "impactRadius": 2000, "description": "大型水电站" },
            { "id": "nt_yc_003", "name": "宜昌化工厂", "type": "chemical", "lat": 30.675, "lng": 111.315, "threatLevel": "high", "impactRadius": 1600, "description": "化工生产基地" }
        ]
    },

    // ========== 安徽省补充 ==========
    "bengbu": { 
        "name": "蚌埠", 
        "center": [117.3895, 32.9156], 
        "shelters": [
            { "id": "bb_001", "name": "蚌埠火车站地下人防", "type": "transport", "level": "核6级", "lat": 32.921, "lng": 117.396, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "蚌埠站地下一层" },
            { "id": "bb_002", "name": "蚌山区地下避难所", "type": "civil", "level": "核6级", "lat": 32.915, "lng": 117.385, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "蚌山区中心地下" },
            { "id": "bb_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 32.910, "lng": 117.390, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "bb_004", "name": "龙子湖地下防护", "type": "civil", "level": "核6级", "lat": 32.945, "lng": 117.405, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "龙子湖地下" },
            { "id": "bb_005", "name": "禹会区人防工程", "type": "civil", "level": "核6级", "lat": 32.935, "lng": 117.345, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "禹会区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_bb_001", "name": "蚌埠发电厂", "type": "power", "lat": 32.945, "lng": 117.375, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_bb_002", "name": "八一化工厂", "type": "chemical", "lat": 32.895, "lng": 117.405, "threatLevel": "high", "impactRadius": 1400, "description": "化工生产基地" },
            { "id": "nt_bb_003", "name": "淮河蚌埠港", "type": "port", "lat": 32.945, "lng": 117.365, "threatLevel": "high", "impactRadius": 1600, "description": "内河港口" }
        ]
    },
    "huainan": { 
        "name": "淮南", 
        "center": [116.9998, 32.6265], 
        "shelters": [
            { "id": "hn_001", "name": "淮南火车站地下人防", "type": "transport", "level": "核6级", "lat": 32.633, "lng": 117.006, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "淮南站地下一层" },
            { "id": "hn_002", "name": "田家庵区地下避难所", "type": "civil", "level": "核6级", "lat": 32.630, "lng": 116.995, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "田家庵区中心地下" },
            { "id": "hn_003", "name": "吾悦广场地下掩体", "type": "mall", "level": "核6级", "lat": 32.625, "lng": 117.000, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "吾悦广场地下二层" },
            { "id": "hn_004", "name": "八公山地下防护", "type": "civil", "level": "核6级", "lat": 32.635, "lng": 116.835, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "八公山景区地下" },
            { "id": "hn_005", "name": "大通区人防工程", "type": "civil", "level": "核6级", "lat": 32.615, "lng": 117.055, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "大通区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_hn_001", "name": "淮南煤矿", "type": "storage", "lat": 32.645, "lng": 116.985, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" },
            { "id": "nt_hn_002", "name": "平圩电厂", "type": "power", "lat": 32.615, "lng": 116.915, "threatLevel": "critical", "impactRadius": 1800, "description": "大型火力发电" },
            { "id": "nt_hn_003", "name": "淮南化工厂", "type": "chemical", "lat": 32.665, "lng": 117.025, "threatLevel": "high", "impactRadius": 1400, "description": "化工生产基地" }
        ]
    },
    "huaibei": { 
        "name": "淮北", 
        "center": [116.7983, 33.9562], 
        "shelters": [
            { "id": "hb2_001", "name": "淮北火车站地下人防", "type": "transport", "level": "核6级", "lat": 33.963, "lng": 116.805, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "淮北站地下一层" },
            { "id": "hb2_002", "name": "相山区地下避难所", "type": "civil", "level": "核6级", "lat": 33.960, "lng": 116.795, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "相山区中心地下" },
            { "id": "hb2_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 33.955, "lng": 116.800, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "hb2_004", "name": "杜集区人防工程", "type": "civil", "level": "核6级", "lat": 33.995, "lng": 116.835, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "杜集区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_hb2_001", "name": "淮北煤矿", "type": "storage", "lat": 33.945, "lng": 116.785, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" },
            { "id": "nt_hb2_002", "name": "淮北发电厂", "type": "power", "lat": 33.975, "lng": 116.815, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },

    // ========== 东北三省补充 ==========
    "anshan": { 
        "name": "鞍山", 
        "center": [122.9943, 41.1086], 
        "shelters": [
            { "id": "as_001", "name": "鞍山火车站地下人防", "type": "transport", "level": "核6级", "lat": 41.115, "lng": 123.000, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "鞍山站地下一层" },
            { "id": "as_002", "name": "铁东区地下避难所", "type": "civil", "level": "核6级", "lat": 41.110, "lng": 122.990, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "铁东区中心地下" },
            { "id": "as_003", "name": "万象汇地下掩体", "type": "mall", "level": "核6级", "lat": 41.105, "lng": 122.995, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "万象汇地下二层" },
            { "id": "as_004", "name": "千山地下防护", "type": "civil", "level": "核6级", "lat": 41.025, "lng": 123.125, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "千山景区地下" },
            { "id": "as_005", "name": "立山区人防工程", "type": "civil", "level": "核6级", "lat": 41.135, "lng": 123.025, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "立山区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_as_001", "name": "鞍钢集团", "type": "factory", "lat": 41.095, "lng": 122.975, "threatLevel": "critical", "impactRadius": 2500, "description": "超级钢铁基地" },
            { "id": "nt_as_002", "name": "鞍山发电厂", "type": "power", "lat": 41.125, "lng": 123.015, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_as_003", "name": "齐大山铁矿", "type": "storage", "lat": 41.185, "lng": 123.055, "threatLevel": "high", "impactRadius": 1400, "description": "铁矿石基地" }
        ]
    },
    "jilin": { 
        "name": "吉林", 
        "center": [126.5495, 43.8378], 
        "shelters": [
            { "id": "jl_001", "name": "吉林火车站地下人防", "type": "transport", "level": "核6级", "lat": 43.845, "lng": 126.556, "capacity": 3500, "facilities": "三防系统、应急供电、医疗站", "access": "吉林站地下一层" },
            { "id": "jl_002", "name": "昌邑区地下避难所", "type": "civil", "level": "核6级", "lat": 43.840, "lng": 126.545, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "昌邑区中心地下" },
            { "id": "jl_003", "name": "财富广场地下掩体", "type": "mall", "level": "核6级", "lat": 43.835, "lng": 126.550, "capacity": 3800, "facilities": "大型通风系统、生活物资储备", "access": "财富广场地下二层" },
            { "id": "jl_004", "name": "松花湖地下防护", "type": "civil", "level": "核6级", "lat": 43.725, "lng": 126.755, "capacity": 2000, "facilities": "独立通风、密闭门、应急水源", "access": "松花湖地下" },
            { "id": "jl_005", "name": "丰满区人防工程", "type": "civil", "level": "核6级", "lat": 43.815, "lng": 126.555, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "丰满区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_jl_001", "name": "丰满水电站", "type": "power", "lat": 43.705, "lng": 126.745, "threatLevel": "critical", "impactRadius": 2000, "description": "大型水电站" },
            { "id": "nt_jl_002", "name": "吉林石化", "type": "chemical", "lat": 43.865, "lng": 126.565, "threatLevel": "critical", "impactRadius": 2000, "description": "大型石化基地" },
            { "id": "nt_jl_003", "name": "吉林化纤", "type": "factory", "lat": 43.855, "lng": 126.575, "threatLevel": "high", "impactRadius": 1400, "description": "化纤生产基地" }
        ]
    },

    // ========== 陕西省补充 ==========
    "xianyang": { 
        "name": "咸阳", 
        "center": [108.7089, 34.3296], 
        "shelters": [
            { "id": "xy2_001", "name": "咸阳火车站地下人防", "type": "transport", "level": "核6级", "lat": 34.336, "lng": 108.715, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "咸阳站地下一层" },
            { "id": "xy2_002", "name": "秦都区地下避难所", "type": "civil", "level": "核6级", "lat": 34.335, "lng": 108.705, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "秦都区中心地下" },
            { "id": "xy2_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 34.330, "lng": 108.710, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "xy2_004", "name": "茂陵地下防护", "type": "government", "level": "核5级", "lat": 34.335, "lng": 108.575, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "茂陵景区地下" },
            { "id": "xy2_005", "name": "渭城区人防工程", "type": "civil", "level": "核6级", "lat": 34.365, "lng": 108.745, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "渭城区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_xy2_001", "name": "咸阳国际机场", "type": "military", "lat": 34.445, "lng": 108.755, "threatLevel": "critical", "impactRadius": 2000, "description": "大型国际机场" },
            { "id": "nt_xy2_002", "name": "咸阳发电厂", "type": "power", "lat": 34.355, "lng": 108.725, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_xy2_003", "name": "彩虹集团", "type": "factory", "lat": 34.345, "lng": 108.685, "threatLevel": "high", "impactRadius": 1400, "description": "电子工业基地" }
        ]
    },
    "baoji": { 
        "name": "宝鸡", 
        "center": [107.2382, 34.3609], 
        "shelters": [
            { "id": "bj2_001", "name": "宝鸡火车站地下人防", "type": "transport", "level": "核6级", "lat": 34.367, "lng": 107.245, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "宝鸡站地下一层" },
            { "id": "bj2_002", "name": "渭滨区地下避难所", "type": "civil", "level": "核6级", "lat": 34.355, "lng": 107.235, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "渭滨区中心地下" },
            { "id": "bj2_003", "name": "银泰城地下掩体", "type": "mall", "level": "核6级", "lat": 34.350, "lng": 107.240, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "银泰城地下二层" },
            { "id": "bj2_004", "name": "太白山地下防护", "type": "civil", "level": "核6级", "lat": 34.055, "lng": 107.795, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "太白山景区地下" },
            { "id": "bj2_005", "name": "金台区人防工程", "type": "civil", "level": "核6级", "lat": 34.365, "lng": 107.195, "capacity": 2500, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "金台区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_bj2_001", "name": "宝钛集团", "type": "factory", "lat": 34.335, "lng": 107.265, "threatLevel": "high", "impactRadius": 1400, "description": "钛金属基地" },
            { "id": "nt_bj2_002", "name": "宝鸡发电厂", "type": "power", "lat": 34.375, "lng": 107.225, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_bj2_003", "name": "宝鸡桥梁厂", "type": "factory", "lat": 34.385, "lng": 107.205, "threatLevel": "medium", "impactRadius": 1200, "description": "桥梁制造基地" }
        ]
    },

    // ========== 四川省补充 ==========
    "zigong": { 
        "name": "自贡", 
        "center": [104.7734, 29.3416], 
        "shelters": [
            { "id": "zg_001", "name": "自贡火车站地下人防", "type": "transport", "level": "核6级", "lat": 29.348, "lng": 104.780, "capacity": 2200, "facilities": "三防系统、应急供电、医疗站", "access": "自贡站地下一层" },
            { "id": "zg_002", "name": "自流井区地下避难所", "type": "civil", "level": "核6级", "lat": 29.345, "lng": 104.765, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "自流井区中心地下" },
            { "id": "zg_003", "name": "华商国际城地下掩体", "type": "mall", "level": "核6级", "lat": 29.340, "lng": 114.770, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "华商国际城地下二层" },
            { "id": "zg_004", "name": "恐龙博物馆地下防护", "type": "government", "level": "核5级", "lat": 29.395, "lng": 104.855, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "恐龙博物馆地下" },
            { "id": "zg_005", "name": "大安区人防工程", "type": "civil", "level": "核6级", "lat": 29.375, "lng": 104.775, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "大安区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zg_001", "name": "自贡盐业", "type": "factory", "lat": 29.355, "lng": 104.755, "threatLevel": "medium", "impactRadius": 1000, "description": "盐化工基地" },
            { "id": "nt_zg_002", "name": "自贡发电厂", "type": "power", "lat": 29.365, "lng": 104.785, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    },
    "panzhihua": { 
        "name": "攀枝花", 
        "center": [101.7161, 26.5852], 
        "shelters": [
            { "id": "pzh_001", "name": "攀枝花火车站地下人防", "type": "transport", "level": "核6级", "lat": 26.592, "lng": 101.723, "capacity": 2500, "facilities": "三防系统、应急供电、医疗站", "access": "攀枝花站地下一层" },
            { "id": "pzh_002", "name": "东区地下避难所", "type": "civil", "level": "核6级", "lat": 26.590, "lng": 101.710, "capacity": 2800, "facilities": "通风过滤、储水设施、应急照明", "access": "东区中心地下" },
            { "id": "pzh_003", "name": "万象城地下掩体", "type": "mall", "level": "核6级", "lat": 26.585, "lng": 101.715, "capacity": 3000, "facilities": "大型通风系统、生活物资储备", "access": "万象城地下二层" },
            { "id": "pzh_004", "name": "西区人防工程", "type": "civil", "level": "核6级", "lat": 26.595, "lng": 101.665, "capacity": 2200, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "西区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_pzh_001", "name": "攀钢集团", "type": "factory", "lat": 26.575, "lng": 101.705, "threatLevel": "critical", "impactRadius": 2000, "description": "大型钒钛钢铁基地" },
            { "id": "nt_pzh_002", "name": "攀枝花发电厂", "type": "power", "lat": 26.605, "lng": 101.725, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_pzh_003", "name": "二滩水电站", "type": "power", "lat": 26.825, "lng": 101.785, "threatLevel": "critical", "impactRadius": 2000, "description": "大型水电站" }
        ]
    },

    // ========== 云南省补充 ==========
    "qujing": { 
        "name": "曲靖", 
        "center": [103.7961, 25.4901], 
        "shelters": [
            { "id": "qj_001", "name": "曲靖火车站地下人防", "type": "transport", "level": "核6级", "lat": 25.497, "lng": 103.803, "capacity": 2800, "facilities": "三防系统、应急供电、医疗站", "access": "曲靖站地下一层" },
            { "id": "qj_002", "name": "麒麟区地下避难所", "type": "civil", "level": "核6级", "lat": 25.495, "lng": 103.790, "capacity": 3000, "facilities": "通风过滤、储水设施、应急照明", "access": "麒麟区中心地下" },
            { "id": "qj_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 25.490, "lng": 103.795, "capacity": 3200, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "qj_004", "name": "罗平县人防工程", "type": "civil", "level": "核6级", "lat": 24.885, "lng": 104.305, "capacity": 2000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "罗平县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_qj_001", "name": "曲靖发电厂", "type": "power", "lat": 25.505, "lng": 103.780, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_qj_002", "name": "曲靖煤矿", "type": "storage", "lat": 25.465, "lng": 103.815, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" }
        ]
    },
    "zhaotong": { 
        "name": "昭通", 
        "center": [103.7172, 27.337], 
        "shelters": [
            { "id": "zt_001", "name": "昭通火车站地下人防", "type": "transport", "level": "核6级", "lat": 27.344, "lng": 103.724, "capacity": 2200, "facilities": "三防系统、应急供电、医疗站", "access": "昭通站地下一层" },
            { "id": "zt_002", "name": "昭阳区地下避难所", "type": "civil", "level": "核6级", "lat": 27.340, "lng": 103.710, "capacity": 2500, "facilities": "通风过滤、储水设施、应急照明", "access": "昭阳区中心地下" },
            { "id": "zt_003", "name": "金融中心地下掩体", "type": "mall", "level": "核6级", "lat": 27.335, "lng": 103.715, "capacity": 2800, "facilities": "大型通风系统、生活物资储备", "access": "金融中心地下二层" },
            { "id": "zt_004", "name": "镇雄县人防工程", "type": "civil", "level": "核6级", "lat": 27.445, "lng": 104.875, "capacity": 1800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "镇雄县地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zt_001", "name": "昭通煤矿", "type": "storage", "lat": 27.325, "lng": 103.735, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" },
            { "id": "nt_zt_002", "name": "溪洛渡水电站", "type": "power", "lat": 28.265, "lng": 103.475, "threatLevel": "critical", "impactRadius": 2000, "description": "巨型水电站" }
        ]
    },

    // ========== 贵州省补充 ==========
    "zunyi": { 
        "name": "遵义", 
        "center": [106.9274, 27.7255], 
        "shelters": [
            { "id": "zy_001", "name": "遵义火车站地下人防", "type": "transport", "level": "核6级", "lat": 27.732, "lng": 106.934, "capacity": 3000, "facilities": "三防系统、应急供电、医疗站", "access": "遵义站地下一层" },
            { "id": "zy_002", "name": "红花岗区地下避难所", "type": "civil", "level": "核6级", "lat": 27.700, "lng": 106.915, "capacity": 3200, "facilities": "通风过滤、储水设施、应急照明", "access": "红花岗区中心地下" },
            { "id": "zy_003", "name": "国贸广场地下掩体", "type": "mall", "level": "核6级", "lat": 27.695, "lng": 106.920, "capacity": 3500, "facilities": "大型通风系统、生活物资储备", "access": "国贸广场地下二层" },
            { "id": "zy_004", "name": "遵义会议会址地下防护", "type": "government", "level": "核5级", "lat": 27.695, "lng": 106.915, "capacity": 1800, "facilities": "独立通风、密闭门、应急水源", "access": "遵义会议会址地下" },
            { "id": "zy_005", "name": "汇川区人防工程", "type": "civil", "level": "核6级", "lat": 27.755, "lng": 106.935, "capacity": 2800, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "汇川区地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_zy_001", "name": "茅台酒厂", "type": "factory", "lat": 27.865, "lng": 106.375, "threatLevel": "medium", "impactRadius": 1200, "description": "酿酒生产基地" },
            { "id": "nt_zy_002", "name": "遵义发电厂", "type": "power", "lat": 27.745, "lng": 106.955, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" },
            { "id": "nt_zy_003", "name": "乌江渡水电站", "type": "power", "lat": 27.285, "lng": 106.805, "threatLevel": "critical", "impactRadius": 2000, "description": "大型水电站" }
        ]
    },
    "liupanshui": { 
        "name": "六盘水", 
        "center": [104.8302, 26.5934], 
        "shelters": [
            { "id": "lps_001", "name": "六盘水火车站地下人防", "type": "transport", "level": "核6级", "lat": 26.600, "lng": 104.837, "capacity": 2200, "facilities": "三防系统、应急供电、医疗站", "access": "六盘水站地下一层" },
            { "id": "lps_002", "name": "钟山区地下避难所", "type": "civil", "level": "核6级", "lat": 26.595, "lng": 104.825, "capacity": 2500, "facilities": "通风过滤、储水设施、应急照明", "access": "钟山区中心地下" },
            { "id": "lps_003", "name": "万达广场地下掩体", "type": "mall", "level": "核6级", "lat": 26.590, "lng": 104.830, "capacity": 2800, "facilities": "大型通风系统、生活物资储备", "access": "万达广场地下二层" },
            { "id": "lps_004", "name": "盘州市人防工程", "type": "civil", "level": "核6级", "lat": 25.715, "lng": 104.465, "capacity": 2000, "facilities": "深埋结构、滤毒设备、通讯设备", "access": "盘州市地下通道" }
        ], 
        "nuclearTargets": [
            { "id": "nt_lps_001", "name": "六盘水煤矿", "type": "storage", "lat": 26.585, "lng": 104.845, "threatLevel": "high", "impactRadius": 1400, "description": "煤炭能源基地" },
            { "id": "nt_lps_002", "name": "六盘水发电厂", "type": "power", "lat": 26.615, "lng": 104.815, "threatLevel": "high", "impactRadius": 1500, "description": "城市电力供应" }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUPPLEMENT_CITIES_PART2;
}
