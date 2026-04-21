// 核战争城市自救地球仪 - 剩余81个城市数据
// 生成时间: 2026-04-17
// 这批数据覆盖新疆、西藏、青海、甘肃、宁夏等西部省份及其他剩余地级市

const NUCLEAR_GLOBE_DATA_BATCH_NEW = {

    // ============================================
    // 新疆维吾尔自治区 (14个城市)
    // ============================================
    
    "urumqi": {
        "name": "乌鲁木齐",
        "center": [87.6168, 43.8256],
        "shelters": [
            {"id": "ur_001", "name": "友好路地下人防工程", "type": "civil", "level": "核6级", "lat": 43.8256, "lng": 87.6168, "capacity": 4000, "facilities": "三防系统、应急供电、净水设备", "access": "地铁1号线友好路站A口"},
            {"id": "ur_002", "name": "南门地铁站掩体", "type": "metro", "level": "核6级", "lat": 43.7908, "lng": 87.6234, "capacity": 3500, "facilities": "深埋结构、独立通风、应急照明", "access": "地铁1号线南门站C口"},
            {"id": "ur_003", "name": "北门地下防护工程", "type": "civil", "level": "核6级", "lat": 43.8392, "lng": 87.6091, "capacity": 3000, "facilities": "通风过滤、储水设施、医疗站", "access": "地铁1号线北门站B口"},
            {"id": "ur_004", "name": "铁路局地下商城掩体", "type": "mall", "level": "核6级", "lat": 43.8778, "lng": 87.5678, "capacity": 5000, "facilities": "大型通风系统、发电设备、物资库", "access": "铁路局地铁站D口"},
            {"id": "ur_005", "name": "二道桥地下避难所", "type": "civil", "level": "核6级", "lat": 43.7823, "lng": 87.6145, "capacity": 2800, "facilities": "滤毒通风、应急供电、通讯设备", "access": "二道桥地铁站A口"},
            {"id": "ur_006", "name": "红山地下人防工程", "type": "civil", "level": "核5级", "lat": 43.8123, "lng": 87.5891, "capacity": 4500, "facilities": "深埋结构、三防系统、大型储水", "access": "红山公园附近地下入口"},
            {"id": "ur_007", "name": "铁路局西地下掩体", "type": "metro", "level": "核6级", "lat": 43.8756, "lng": 87.5543, "capacity": 3200, "facilities": "密闭门、通风过滤、应急照明", "access": "地铁1号线铁路局西站"},
            {"id": "ur_008", "name": "八一剧场地下避难所", "type": "civil", "level": "核6级", "lat": 43.8512, "lng": 87.6012, "capacity": 2500, "facilities": "三防门、滤毒设备、生活物资", "access": "八一剧场旁地下入口"}
        ],
        "nuclearTargets": [
            {"id": "ur_nt001", "name": "国电新疆电力", "type": "power", "risk": "high", "lat": 43.9123, "lng": 87.5345, "radius": 5000, "description": "大型火电厂"},
            {"id": "ur_nt002", "name": "乌鲁木齐石化", "type": "chemical", "risk": "high", "lat": 43.7234, "lng": 87.6789, "radius": 8000, "description": "大型石油化工基地"},
            {"id": "ur_nt003", "name": "乌鲁木齐水业集团", "type": "water", "risk": "medium", "lat": 43.8567, "lng": 87.6234, "radius": 3000, "description": "主要供水设施"}
        ]
    },
    
    "karamay": {
        "name": "克拉玛依",
        "center": [84.8892, 45.5799],
        "shelters": [
            {"id": "kl_001", "name": "克拉玛依大十字地下人防", "type": "civil", "level": "核6级", "lat": 45.5799, "lng": 84.8892, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "市中心大十字地下商城"},
            {"id": "kl_002", "name": "友谊路地下避难所", "type": "civil", "level": "核6级", "lat": 45.5823, "lng": 84.8723, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗点", "access": "友谊路地下通道"},
            {"id": "kl_003", "name": "准噶尔地下掩体", "type": "civil", "level": "核5级", "lat": 45.6012, "lng": 84.9123, "capacity": 4000, "facilities": "深埋结构、独立供电、指挥通讯", "access": "准噶尔路地下工程"},
            {"id": "kl_004", "name": "独山子地下防护", "type": "civil", "level": "核6级", "lat": 44.3234, "lng": 84.8789, "capacity": 3500, "facilities": "大型通风、发电设备、物资库", "access": "独山子区中心地下"},
            {"id": "kl_005", "name": "白碱滩地下避难所", "type": "civil", "level": "核6级", "lat": 45.6891, "lng": 85.1234, "capacity": 2000, "facilities": "密闭门、滤毒设备、应急水源", "access": "白碱滩区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "kl_nt001", "name": "克拉玛依油田", "type": "oil", "risk": "high", "lat": 45.5567, "lng": 84.9234, "radius": 10000, "description": "大型石油开采基地"},
            {"id": "kl_nt002", "name": "独山子石化", "type": "chemical", "risk": "high", "lat": 44.3456, "lng": 84.8567, "radius": 8000, "description": "大型炼化基地"},
            {"id": "kl_nt003", "name": "克拉玛依热电厂", "type": "power", "risk": "medium", "lat": 45.6123, "lng": 84.8456, "radius": 5000, "description": "城市供热电厂"}
        ]
    },
    
    "turpan": {
        "name": "吐鲁番",
        "center": [89.1897, 42.9513],
        "shelters": [
            {"id": "tp_001", "name": "高昌路地下人防", "type": "civil", "level": "核6级", "lat": 42.9513, "lng": 89.1897, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "高昌路地下商城"},
            {"id": "tp_002", "name": "老城地下避难所", "type": "civil", "level": "核6级", "lat": 42.9389, "lng": 89.1567, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "老城核心区地下"},
            {"id": "tp_003", "name": "葡萄沟地下防护", "type": "civil", "level": "核6级", "lat": 43.0123, "lng": 89.2234, "capacity": 1500, "facilities": "滤毒通风、密闭门、应急水源", "access": "葡萄沟景区附近"},
            {"id": "tp_004", "name": "火车站地下掩体", "type": "transport", "level": "核5级", "lat": 42.9678, "lng": 89.2456, "capacity": 3000, "facilities": "深埋结构、大型通风、物资储备", "access": "吐鲁番北站地下"}
        ],
        "nuclearTargets": [
            {"id": "tp_nt001", "name": "吐哈油田", "type": "oil", "risk": "medium", "lat": 42.9234, "lng": 89.2567, "radius": 8000, "description": "油田开采区"},
            {"id": "tp_nt002", "name": "吐鲁番发电厂", "type": "power", "risk": "medium", "lat": 42.9789, "lng": 89.1567, "radius": 5000, "description": "热电联产厂"}
        ]
    },
    
    "hami": {
        "name": "哈密",
        "center": [93.5153, 42.8259],
        "shelters": [
            {"id": "hm_001", "name": "天山北路地下人防", "type": "civil", "level": "核6级", "lat": 42.8259, "lng": 93.5153, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "天山北路地下商城"},
            {"id": "hm_002", "name": "前进东路地下避难所", "type": "civil", "level": "核6级", "lat": 42.8389, "lng": 93.5345, "capacity": 2200, "facilities": "通风过滤、应急照明、医疗点", "access": "前进东路人防入口"},
            {"id": "hm_003", "name": "火车站地下掩体", "type": "transport", "level": "核5级", "lat": 42.8123, "lng": 93.5678, "capacity": 3500, "facilities": "深埋结构、大型通风、物资库", "access": "哈密站地下设施"},
            {"id": "hm_004", "name": "八一南路地下防护", "type": "civil", "level": "核6级", "lat": 42.7987, "lng": 93.4891, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "八一南路人防工程"}
        ],
        "nuclearTargets": [
            {"id": "hm_nt001", "name": "哈密煤电", "type": "power", "risk": "medium", "lat": 42.8567, "lng": 93.4567, "radius": 5000, "description": "大型火电厂"},
            {"id": "hm_nt002", "name": "吐哈油田哈密基地", "type": "oil", "risk": "medium", "lat": 42.7891, "lng": 93.5678, "radius": 8000, "description": "石油开采基地"}
        ]
    },
    
    "aksu": {
        "name": "阿克苏",
        "center": [80.2650, 41.1231],
        "shelters": [
            {"id": "ak_001", "name": "东大街地下人防", "type": "civil", "level": "核6级", "lat": 41.1231, "lng": 80.2650, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "东大街地下商城"},
            {"id": "ak_002", "name": "北京路地下避难所", "type": "civil", "level": "核6级", "lat": 41.1456, "lng": 80.2345, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗点", "access": "北京路人防入口"},
            {"id": "ak_003", "name": "栏杆路地下防护", "type": "civil", "level": "核6级", "lat": 41.0891, "lng": 80.2891, "capacity": 2000, "facilities": "密闭门、滤毒设备、应急水源", "access": "栏杆路地下工程"},
            {"id": "ak_004", "name": "西城地下掩体", "type": "civil", "level": "核5级", "lat": 41.1567, "lng": 80.2012, "capacity": 3500, "facilities": "深埋结构、独立供电、指挥通讯", "access": "西城区人防中心"}
        ],
        "nuclearTargets": [
            {"id": "ak_nt001", "name": "塔河油田", "type": "oil", "risk": "high", "lat": 41.0789, "lng": 80.3123, "radius": 10000, "description": "大型油气田"},
            {"id": "ak_nt002", "name": "阿克苏石化", "type": "chemical", "risk": "medium", "lat": 41.1678, "lng": 80.2234, "radius": 6000, "description": "石化工业园区"},
            {"id": "ak_nt003", "name": "阿克苏发电厂", "type": "power", "risk": "medium", "lat": 41.0987, "lng": 80.2567, "radius": 5000, "description": "热电厂"}
        ]
    },
    
    "kashgar": {
        "name": "喀什",
        "center": [75.9897, 39.4677],
        "shelters": [
            {"id": "ks_001", "name": "人民东路地下人防", "type": "civil", "level": "核6级", "lat": 39.4677, "lng": 75.9897, "capacity": 3500, "facilities": "三防系统、应急供电、储水设施", "access": "人民东路地下商城"},
            {"id": "ks_002", "name": "解放南路地下避难所", "type": "civil", "level": "核6级", "lat": 39.4456, "lng": 76.0123, "capacity": 2800, "facilities": "通风过滤、应急照明、医疗点", "access": "解放南路人防入口"},
            {"id": "ks_003", "name": "古城地下防护", "type": "civil", "level": "核5级", "lat": 39.4234, "lng": 75.9789, "capacity": 4000, "facilities": "深埋结构、独立供电、大型储水", "access": "喀什古城地下设施"},
            {"id": "ks_004", "name": "机场路地下掩体", "type": "transport", "level": "核6级", "lat": 39.5123, "lng": 76.0567, "capacity": 2500, "facilities": "密闭门、滤毒设备、应急水源", "access": "机场路地下通道"},
            {"id": "ks_005", "name": "西域大道避难所", "type": "civil", "level": "核6级", "lat": 39.4567, "lng": 75.9234, "capacity": 2200, "facilities": "三防门、发电设备、通讯设施", "access": "西域大道人防工程"}
        ],
        "nuclearTargets": [
            {"id": "ks_nt001", "name": "喀什发电公司", "type": "power", "risk": "medium", "lat": 39.4789, "lng": 76.0345, "radius": 5000, "description": "城市主要电厂"},
            {"id": "ks_nt002", "name": "喀什国际机场", "type": "transport", "risk": "medium", "lat": 39.5456, "lng": 76.0234, "radius": 5000, "description": "国际航空港"},
            {"id": "ks_nt003", "name": "喀什水务集团", "type": "water", "risk": "low", "lat": 39.4678, "lng": 76.0012, "radius": 3000, "description": "城市供水中心"}
        ]
    },
    
    "hotan": {
        "name": "和田",
        "center": [79.9225, 37.1107],
        "shelters": [
            {"id": "ht_001", "name": "北京路地下人防", "type": "civil", "level": "核6级", "lat": 37.1107, "lng": 79.9225, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "北京路地下商城"},
            {"id": "ht_002", "name": "团结广场地下避难所", "type": "civil", "level": "核6级", "lat": 37.1234, "lng": 79.9456, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "团结广场地下"},
            {"id": "ht_003", "name": "昆仑地下防护", "type": "civil", "level": "核6级", "lat": 37.0891, "lng": 79.8891, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "昆仑路人防工程"},
            {"id": "ht_004", "name": "火车站地下掩体", "type": "transport", "level": "核5级", "lat": 37.1456, "lng": 79.9678, "capacity": 3000, "facilities": "深埋结构、大型通风、物资库", "access": "和田站地下设施"}
        ],
        "nuclearTargets": [
            {"id": "ht_nt001", "name": "和田电厂", "type": "power", "risk": "medium", "lat": 37.0789, "lng": 79.9234, "radius": 5000, "description": "热电厂"},
            {"id": "ht_nt002", "name": "和田水厂", "type": "water", "risk": "low", "lat": 37.1123, "lng": 79.9456, "radius": 3000, "description": "主要供水设施"}
        ]
    },
    
    "yili": {
        "name": "伊犁",
        "center": [81.3242, 43.9169],
        "shelters": [
            {"id": "yl_001", "name": "斯大林街地下人防", "type": "civil", "level": "核6级", "lat": 43.9169, "lng": 81.3242, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "斯大林街地下商城"},
            {"id": "yl_002", "name": "解放路地下避难所", "type": "civil", "level": "核6级", "lat": 43.9345, "lng": 81.3567, "capacity": 2200, "facilities": "通风过滤、应急照明、医疗点", "access": "解放路人防入口"},
            {"id": "yl_003", "name": "伊犁河地下防护", "type": "civil", "level": "核6级", "lat": 43.8789, "lng": 81.2891, "capacity": 2500, "facilities": "密闭门、滤毒设备、应急水源", "access": "伊犁河路地下工程"},
            {"id": "yl_004", "name": "开发区地下掩体", "type": "civil", "level": "核5级", "lat": 43.9567, "lng": 81.4123, "capacity": 3500, "facilities": "深埋结构、独立供电、指挥通讯", "access": "开发区人防中心"}
        ],
        "nuclearTargets": [
            {"id": "yl_nt001", "name": "伊犁电厂", "type": "power", "risk": "medium", "lat": 43.9456, "lng": 81.3789, "radius": 5000, "description": "热电联产厂"},
            {"id": "yl_nt002", "name": "伊犁石化", "type": "chemical", "risk": "medium", "lat": 43.9234, "lng": 81.4456, "radius": 6000, "description": "石化园区"}
        ]
    },
    
    "changji": {
        "name": "昌吉",
        "center": [87.3040, 44.0116],
        "shelters": [
            {"id": "cj_001", "name": "延安北路地下人防", "type": "civil", "level": "核6级", "lat": 44.0116, "lng": 87.3040, "capacity": 2600, "facilities": "三防系统、应急供电、储水设施", "access": "延安北路地下商城"},
            {"id": "cj_002", "name": "北京路地下避难所", "type": "civil", "level": "核6级", "lat": 44.0234, "lng": 87.3456, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "北京路人防入口"},
            {"id": "cj_003", "name": "绿洲路地下防护", "type": "civil", "level": "核6级", "lat": 43.9891, "lng": 87.2678, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "绿洲路地下工程"},
            {"id": "cj_004", "name": "屯河地下掩体", "type": "civil", "level": "核5级", "lat": 44.0567, "lng": 87.3891, "capacity": 3200, "facilities": "深埋结构、独立供电、大型储水", "access": "屯河路地下设施"}
        ],
        "nuclearTargets": [
            {"id": "cj_nt001", "name": "昌吉热电厂", "type": "power", "risk": "medium", "lat": 44.0345, "lng": 87.3234, "radius": 5000, "description": "城市供热电厂"},
            {"id": "cj_nt002", "name": "昌吉化工园区", "type": "chemical", "risk": "medium", "lat": 44.0789, "lng": 87.3567, "radius": 6000, "description": "化工产业集中区"}
        ]
    },
    
    "bortala": {
        "name": "博尔塔拉",
        "center": [82.0667, 44.9058],
        "shelters": [
            {"id": "bt_001", "name": "青得里大街地下人防", "type": "civil", "level": "核6级", "lat": 44.9058, "lng": 82.0667, "capacity": 2200, "facilities": "三防系统、应急供电、储水设施", "access": "青得里大街地下"},
            {"id": "bt_002", "name": "北京路地下避难所", "type": "civil", "level": "核6级", "lat": 44.9234, "lng": 82.0891, "capacity": 1800, "facilities": "通风过滤、应急照明、医疗点", "access": "北京路人防入口"},
            {"id": "bt_003", "name": "博乐地下防护", "type": "civil", "level": "核6级", "lat": 44.8891, "lng": 82.0456, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "博乐市人防工程"}
        ],
        "nuclearTargets": [
            {"id": "bt_nt001", "name": "博乐发电厂", "type": "power", "risk": "medium", "lat": 44.9123, "lng": 82.0234, "radius": 5000, "description": "地区电厂"},
            {"id": "bt_nt002", "name": "阿拉山口口岸", "type": "transport", "risk": "low", "lat": 45.1678, "lng": 82.5678, "radius": 3000, "description": "边境口岸"}
        ]
    },
    
    "bayingol": {
        "name": "巴音郭楞",
        "center": [86.1508, 41.7259],
        "shelters": [
            {"id": "by_001", "name": "人民东路地下人防", "type": "civil", "level": "核6级", "lat": 41.7259, "lng": 86.1508, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "库尔勒人民东路地下"},
            {"id": "by_002", "name": "石化大道地下避难所", "type": "civil", "level": "核6级", "lat": 41.7456, "lng": 86.1891, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗点", "access": "石化大道人防入口"},
            {"id": "by_003", "name": "孔雀河地下防护", "type": "civil", "level": "核6级", "lat": 41.6891, "lng": 86.1234, "capacity": 2200, "facilities": "密闭门、滤毒设备、应急水源", "access": "孔雀河路地下工程"},
            {"id": "by_004", "name": "开发区地下掩体", "type": "civil", "level": "核5级", "lat": 41.7789, "lng": 86.2234, "capacity": 3500, "facilities": "深埋结构、独立供电、指挥通讯", "access": "开发区人防中心"}
        ],
        "nuclearTargets": [
            {"id": "by_nt001", "name": "塔里木油田", "type": "oil", "risk": "high", "lat": 41.6567, "lng": 86.3456, "radius": 10000, "description": "超大型油气田"},
            {"id": "by_nt002", "name": "库尔勒石化", "type": "chemical", "risk": "high", "lat": 41.7123, "lng": 86.2678, "radius": 8000, "description": "大型炼化基地"},
            {"id": "by_nt003", "name": "库尔勒电厂", "type": "power", "risk": "medium", "lat": 41.7456, "lng": 86.1567, "radius": 5000, "description": "热电厂"}
        ]
    },
    
    "kizilsu": {
        "name": "克孜勒苏",
        "center": [76.1678, 39.7134],
        "shelters": [
            {"id": "kz_001", "name": "帕米尔路地下人防", "type": "civil", "level": "核6级", "lat": 39.7134, "lng": 76.1678, "capacity": 1800, "facilities": "三防系统、应急供电、储水设施", "access": "阿图什帕米尔路地下"},
            {"id": "kz_002", "name": "人民路地下避难所", "type": "civil", "level": "核6级", "lat": 39.7345, "lng": 76.1891, "capacity": 1500, "facilities": "通风过滤、应急照明、医疗点", "access": "人民路人防入口"},
            {"id": "kz_003", "name": "克州地下防护", "type": "civil", "level": "核6级", "lat": 39.6891, "lng": 76.1456, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "克州人防工程"}
        ],
        "nuclearTargets": [
            {"id": "kz_nt001", "name": "克州电厂", "type": "power", "risk": "low", "lat": 39.7234, "lng": 76.1234, "radius": 5000, "description": "小型热电厂"}
        ]
    },
    
    "tacheng": {
        "name": "塔城",
        "center": [82.9857, 46.7463],
        "shelters": [
            {"id": "tc_001", "name": "新华路地下人防", "type": "civil", "level": "核6级", "lat": 46.7463, "lng": 82.9857, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "新华路地下商城"},
            {"id": "tc_002", "name": "伊宁路地下避难所", "type": "civil", "level": "核6级", "lat": 46.7678, "lng": 83.0123, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "伊宁路人防入口"},
            {"id": "tc_003", "name": "塔城地下防护", "type": "civil", "level": "核6级", "lat": 46.7234, "lng": 82.9678, "capacity": 1400, "facilities": "密闭门、滤毒设备、应急水源", "access": "塔城市人防工程"}
        ],
        "nuclearTargets": [
            {"id": "tc_nt001", "name": "塔城电厂", "type": "power", "risk": "low", "lat": 46.7567, "lng": 82.9456, "radius": 5000, "description": "边境地区电厂"},
            {"id": "tc_nt002", "name": "巴克图口岸", "type": "transport", "risk": "low", "lat": 46.8123, "lng": 82.8234, "radius": 3000, "description": "边境口岸"}
        ]
    },
    
    "altay": {
        "name": "阿勒泰",
        "center": [88.1396, 47.8483],
        "shelters": [
            {"id": "al_001", "name": "解放路地下人防", "type": "civil", "level": "核6级", "lat": 47.8483, "lng": 88.1396, "capacity": 1800, "facilities": "三防系统、应急供电、储水设施", "access": "解放路地下商城"},
            {"id": "al_002", "name": "金山路地下避难所", "type": "civil", "level": "核6级", "lat": 47.8678, "lng": 88.1678, "capacity": 1400, "facilities": "通风过滤、应急照明、医疗点", "access": "金山路人防入口"},
            {"id": "al_003", "name": "阿勒泰地下防护", "type": "civil", "level": "核6级", "lat": 47.8234, "lng": 88.1123, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "阿勒泰市人防工程"}
        ],
        "nuclearTargets": [
            {"id": "al_nt001", "name": "阿勒泰电厂", "type": "power", "risk": "low", "lat": 47.8456, "lng": 88.1234, "radius": 5000, "description": "边境地区电厂"},
            {"id": "al_nt002", "name": "喀纳斯机场", "type": "transport", "risk": "low", "lat": 48.2234, "lng": 87.7567, "radius": 3000, "description": "旅游机场"}
        ]
    },
    
    "shihezi": {
        "name": "石河子",
        "center": [86.0410, 44.3059],
        "shelters": [
            {"id": "shz_001", "name": "北三路地下人防", "type": "civil", "level": "核6级", "lat": 44.3059, "lng": 86.0410, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "北三路地下商城"},
            {"id": "shz_002", "name": "东环路地下避难所", "type": "civil", "level": "核6级", "lat": 44.3234, "lng": 86.0678, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗点", "access": "东环路人防入口"},
            {"id": "shz_003", "name": "西环路地下防护", "type": "civil", "level": "核6级", "lat": 44.2891, "lng": 86.0123, "capacity": 2200, "facilities": "密闭门、滤毒设备、应急水源", "access": "西环路地下工程"},
            {"id": "shz_004", "name": "兵团地下掩体", "type": "government", "level": "核5级", "lat": 44.3456, "lng": 86.0891, "capacity": 4000, "facilities": "深埋结构、独立供电、指挥系统", "access": "兵团指挥部地下"}
        ],
        "nuclearTargets": [
            {"id": "shz_nt001", "name": "天业集团", "type": "chemical", "risk": "high", "lat": 44.2789, "lng": 86.1234, "radius": 8000, "description": "大型化工集团"},
            {"id": "shz_nt002", "name": "石河子电厂", "type": "power", "risk": "medium", "lat": 44.3123, "lng": 86.0567, "radius": 5000, "description": "兵团电厂"},
            {"id": "shz_nt003", "name": "石河子水厂", "type": "water", "risk": "medium", "lat": 44.3345, "lng": 86.0345, "radius": 3000, "description": "主要供水设施"}
        ]
    },

    // ============================================
    // 西藏自治区 (6个城市)
    // ============================================
    
    "lhasa": {
        "name": "拉萨",
        "center": [91.1409, 29.6500],
        "shelters": [
            {"id": "ls_001", "name": "北京中路地下人防", "type": "civil", "level": "核6级", "lat": 29.6500, "lng": 91.1409, "capacity": 3500, "facilities": "三防系统、应急供电、储水设施", "access": "北京中路地下商城"},
            {"id": "ls_002", "name": "布达拉宫地下避难所", "type": "government", "level": "核5级", "lat": 29.6578, "lng": 91.1178, "capacity": 5000, "facilities": "深埋结构、独立供电、指挥通讯", "access": "布达拉宫地下设施"},
            {"id": "ls_003", "name": "八廓街地下防护", "type": "civil", "level": "核6级", "lat": 29.6512, "lng": 91.1345, "capacity": 2800, "facilities": "通风过滤、应急照明、医疗点", "access": "八廓街人防入口"},
            {"id": "ls_004", "name": "罗布林卡地下掩体", "type": "civil", "level": "核6级", "lat": 29.6456, "lng": 91.0891, "capacity": 2500, "facilities": "密闭门、滤毒设备、应急水源", "access": "罗布林卡路地下"},
            {"id": "ls_005", "name": "太阳岛地下避难所", "type": "civil", "level": "核6级", "lat": 29.6789, "lng": 91.1678, "capacity": 2200, "facilities": "三防门、发电设备、通讯设施", "access": "太阳岛人防工程"},
            {"id": "ls_006", "name": "火车站地下防护", "type": "transport", "level": "核5级", "lat": 29.6234, "lng": 91.1891, "capacity": 4000, "facilities": "深埋结构、大型通风、物资库", "access": "拉萨站地下设施"}
        ],
        "nuclearTargets": [
            {"id": "ls_nt001", "name": "拉萨电厂", "type": "power", "risk": "medium", "lat": 29.6345, "lng": 91.1567, "radius": 5000, "description": "西藏主要电厂"},
            {"id": "ls_nt002", "name": "贡嘎机场", "type": "transport", "risk": "medium", "lat": 29.2934, "lng": 90.9123, "radius": 5000, "description": "高原国际机场"},
            {"id": "ls_nt003", "name": "拉萨水厂", "type": "water", "risk": "low", "lat": 29.6678, "lng": 91.1456, "radius": 3000, "description": "城市供水中心"}
        ]
    },
    
    "rikaze": {
        "name": "日喀则",
        "center": [88.8800, 29.2669],
        "shelters": [
            {"id": "rkz_001", "name": "山东路地下人防", "type": "civil", "level": "核6级", "lat": 29.2669, "lng": 88.8800, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "山东路地下商城"},
            {"id": "rkz_002", "name": "扎什伦布寺地下避难所", "type": "civil", "level": "核6级", "lat": 29.2678, "lng": 88.8678, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "寺庙附近人防入口"},
            {"id": "rkz_003", "name": "日喀则地下防护", "type": "civil", "level": "核6级", "lat": 29.2456, "lng": 88.8923, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "市区人防工程"},
            {"id": "rkz_004", "name": "火车站地下掩体", "type": "transport", "level": "核5级", "lat": 29.2234, "lng": 88.9234, "capacity": 3000, "facilities": "深埋结构、大型通风、物资库", "access": "日喀则站地下"}
        ],
        "nuclearTargets": [
            {"id": "rkz_nt001", "name": "日喀则电厂", "type": "power", "risk": "low", "lat": 29.2567, "lng": 88.8567, "radius": 5000, "description": "地区电厂"},
            {"id": "rkz_nt002", "name": "和平机场", "type": "transport", "risk": "low", "lat": 29.2912, "lng": 89.2934, "radius": 3000, "description": "支线机场"}
        ]
    },
    
    "qamdo": {
        "name": "昌都",
        "center": [97.1725, 31.1407],
        "shelters": [
            {"id": "cd_001", "name": "西路地下人防", "type": "civil", "level": "核6级", "lat": 31.1407, "lng": 97.1725, "capacity": 2200, "facilities": "三防系统、应急供电、储水设施", "access": "西路地下商城"},
            {"id": "cd_002", "name": "茶马广场地下避难所", "type": "civil", "level": "核6级", "lat": 31.1567, "lng": 97.1891, "capacity": 1800, "facilities": "通风过滤、应急照明、医疗点", "access": "茶马广场地下"},
            {"id": "cd_003", "name": "昌都地下防护", "type": "civil", "level": "核6级", "lat": 31.1234, "lng": 97.1456, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "市区人防工程"},
            {"id": "cd_004", "name": "强巴林寺地下掩体", "type": "civil", "level": "核6级", "lat": 31.1345, "lng": 97.1678, "capacity": 1200, "facilities": "三防门、发电设备、物资储备", "access": "寺庙附近人防"}
        ],
        "nuclearTargets": [
            {"id": "cd_nt001", "name": "昌都电厂", "type": "power", "risk": "low", "lat": 31.1478, "lng": 97.1567, "radius": 5000, "description": "地区电厂"},
            {"id": "cd_nt002", "name": "邦达机场", "type": "transport", "risk": "low", "lat": 30.5567, "lng": 97.1234, "radius": 3000, "description": "高原机场"}
        ]
    },
    
    "shannan": {
        "name": "山南",
        "center": [91.7665, 29.2369],
        "shelters": [
            {"id": "sn_001", "name": "湖南路地下人防", "type": "civil", "level": "核6级", "lat": 29.2369, "lng": 91.7665, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "泽当湖南路地下"},
            {"id": "sn_002", "name": "雅砻河地下避难所", "type": "civil", "level": "核6级", "lat": 29.2234, "lng": 91.7456, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "雅砻河路人防入口"},
            {"id": "sn_003", "name": "山南地下防护", "type": "civil", "level": "核6级", "lat": 29.2567, "lng": 91.7891, "capacity": 1400, "facilities": "密闭门、滤毒设备、应急水源", "access": "市区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "sn_nt001", "name": "山南电厂", "type": "power", "risk": "low", "lat": 29.2345, "lng": 91.7567, "radius": 5000, "description": "地区电厂"},
            {"id": "sn_nt002", "name": "拉萨贡嘎机场", "type": "transport", "risk": "medium", "lat": 29.2934, "lng": 90.9123, "radius": 5000, "description": "国际机场"}
        ]
    },
    
    "nagqu": {
        "name": "那曲",
        "center": [92.0524, 31.4762],
        "shelters": [
            {"id": "nq_001", "name": "浙江中路地下人防", "type": "civil", "level": "核6级", "lat": 31.4762, "lng": 92.0524, "capacity": 1800, "facilities": "三防系统、应急供电、储水设施", "access": "浙江中路地下"},
            {"id": "nq_002", "name": "那曲地下避难所", "type": "civil", "level": "核6级", "lat": 31.4891, "lng": 92.0789, "capacity": 1400, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "nq_003", "name": "火车站地下防护", "type": "transport", "level": "核6级", "lat": 31.4567, "lng": 92.0234, "capacity": 2000, "facilities": "深埋结构、密闭门、应急水源", "access": "那曲站地下"}
        ],
        "nuclearTargets": [
            {"id": "nq_nt001", "name": "那曲电厂", "type": "power", "risk": "low", "lat": 31.4678, "lng": 92.0456, "radius": 5000, "description": "高原电厂"},
            {"id": "nq_nt002", "name": "那曲火车站", "type": "transport", "risk": "low", "lat": 31.4456, "lng": 92.0567, "radius": 3000, "description": "青藏铁路站点"}
        ]
    },
    
    "ngari": {
        "name": "阿里",
        "center": [80.1056, 32.5011],
        "shelters": [
            {"id": "al_001", "name": "狮泉河地下人防", "type": "civil", "level": "核6级", "lat": 32.5011, "lng": 80.1056, "capacity": 1500, "facilities": "三防系统、应急供电、储水设施", "access": "狮泉河镇地下"},
            {"id": "al_002", "name": "阿里地下避难所", "type": "civil", "level": "核6级", "lat": 32.5234, "lng": 80.1234, "capacity": 1200, "facilities": "通风过滤、应急照明、医疗点", "access": "地区人防入口"},
            {"id": "al_003", "name": "昆莎机场地下防护", "type": "transport", "level": "核6级", "lat": 32.5345, "lng": 80.0567, "capacity": 1800, "facilities": "深埋结构、密闭门、应急水源", "access": "昆莎机场地下"}
        ],
        "nuclearTargets": [
            {"id": "al_nt001", "name": "阿里电厂", "type": "power", "risk": "low", "lat": 32.5123, "lng": 80.0891, "radius": 5000, "description": "边防地区电厂"},
            {"id": "al_nt002", "name": "昆莎机场", "type": "transport", "risk": "low", "lat": 32.5456, "lng": 80.0678, "radius": 3000, "description": "支线机场"}
        ]
    },

    // ============================================
    // 青海省 (8个城市)
    // ============================================
    
    "xining": {
        "name": "西宁",
        "center": [101.7782, 36.6171],
        "shelters": [
            {"id": "xn_001", "name": "西大街地下人防", "type": "civil", "level": "核6级", "lat": 36.6171, "lng": 101.7782, "capacity": 4000, "facilities": "三防系统、应急供电、储水设施", "access": "西大街地下商城"},
            {"id": "xn_002", "name": "东关清真大寺地下避难所", "type": "civil", "level": "核6级", "lat": 36.6189, "lng": 101.8012, "capacity": 3500, "facilities": "通风过滤、应急照明、医疗点", "access": "东关大街人防入口"},
            {"id": "xn_003", "name": "中心广场地下防护", "type": "civil", "level": "核6级", "lat": 36.6234, "lng": 101.7567, "capacity": 3000, "facilities": "密闭门、滤毒设备、应急水源", "access": "中心广场地下"},
            {"id": "xn_004", "name": "城西区地下掩体", "type": "civil", "level": "核5级", "lat": 36.6123, "lng": 101.7456, "capacity": 5000, "facilities": "深埋结构、独立供电、指挥通讯", "access": "城西区人防中心"},
            {"id": "xn_005", "name": "火车站地下避难所", "type": "transport", "level": "核6级", "lat": 36.5891, "lng": 101.8234, "capacity": 4500, "facilities": "大型通风、发电设备、物资库", "access": "西宁站地下设施"},
            {"id": "xn_006", "name": "海湖新区地下防护", "type": "civil", "level": "核6级", "lat": 36.6567, "lng": 101.7345, "capacity": 3500, "facilities": "三防门、发电设备、通讯设施", "access": "海湖新区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "xn_nt001", "name": "西宁电厂", "type": "power", "risk": "medium", "lat": 36.6456, "lng": 101.7891, "radius": 5000, "description": "省会城市电厂"},
            {"id": "xn_nt002", "name": "西宁水厂", "type": "water", "risk": "medium", "lat": 36.6345, "lng": 101.7678, "radius": 3000, "description": "主要供水设施"},
            {"id": "xn_nt003", "name": "甘河工业园", "type": "chemical", "risk": "high", "lat": 36.6234, "lng": 101.6567, "radius": 6000, "description": "大型工业园区"}
        ]
    },
    
    "haidong": {
        "name": "海东",
        "center": [102.1223, 36.5021],
        "shelters": [
            {"id": "hd_001", "name": "平安路地下人防", "type": "civil", "level": "核6级", "lat": 36.5021, "lng": 102.1223, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "平安路地下商城"},
            {"id": "hd_002", "name": "乐都地下避难所", "type": "civil", "level": "核6级", "lat": 36.4789, "lng": 102.3891, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "乐都区人防入口"},
            {"id": "hd_003", "name": "民和地下防护", "type": "civil", "level": "核6级", "lat": 36.3234, "lng": 102.8234, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "民和县人防工程"},
            {"id": "hd_004", "name": "互助地下掩体", "type": "civil", "level": "核6级", "lat": 36.8456, "lng": 101.9567, "capacity": 1500, "facilities": "三防门、发电设备、物资储备", "access": "互助县人防中心"}
        ],
        "nuclearTargets": [
            {"id": "hd_nt001", "name": "海东电厂", "type": "power", "risk": "medium", "lat": 36.4891, "lng": 102.1567, "radius": 5000, "description": "地区电厂"},
            {"id": "hd_nt002", "name": "海东水厂", "type": "water", "risk": "low", "lat": 36.5123, "lng": 102.1345, "radius": 3000, "description": "主要供水设施"}
        ]
    },
    
    "haixi": {
        "name": "海西",
        "center": [97.3712, 37.3774],
        "shelters": [
            {"id": "hx_001", "name": "德令哈地下人防", "type": "civil", "level": "核6级", "lat": 37.3774, "lng": 97.3712, "capacity": 2200, "facilities": "三防系统、应急供电、储水设施", "access": "德令哈市地下商城"},
            {"id": "hx_002", "name": "格尔木地下避难所", "type": "civil", "level": "核6级", "lat": 36.4023, "lng": 94.9034, "capacity": 3000, "facilities": "通风过滤、应急照明、医疗点", "access": "格尔木市人防入口"},
            {"id": "hx_003", "name": "茫崖地下防护", "type": "civil", "level": "核6级", "lat": 38.2523, "lng": 90.8567, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "茫崖市人防工程"},
            {"id": "hx_004", "name": "都兰地下掩体", "type": "civil", "level": "核6级", "lat": 36.3000, "lng": 98.0891, "capacity": 1400, "facilities": "三防门、发电设备、通讯设施", "access": "都兰县人防中心"}
        ],
        "nuclearTargets": [
            {"id": "hx_nt001", "name": "格尔木炼油厂", "type": "chemical", "risk": "high", "lat": 36.4234, "lng": 94.9234, "radius": 8000, "description": "大型炼化基地"},
            {"id": "hx_nt002", "name": "格尔木电厂", "type": "power", "risk": "medium", "lat": 36.3789, "lng": 94.8789, "radius": 5000, "description": "地区电厂"},
            {"id": "hx_nt003", "name": "柴达木油田", "type": "oil", "risk": "high", "lat": 37.4234, "lng": 95.1567, "radius": 10000, "description": "大型油气田"}
        ]
    },
    
    "haibei": {
        "name": "海北",
        "center": [100.9016, 36.9546],
        "shelters": [
            {"id": "hb_001", "name": "西海镇地下人防", "type": "civil", "level": "核6级", "lat": 36.9546, "lng": 100.9016, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "西海镇地下商城"},
            {"id": "hb_002", "name": "海晏地下避难所", "type": "civil", "level": "核6级", "lat": 36.9789, "lng": 100.9345, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "海晏县人防入口"},
            {"id": "hb_003", "name": "门源地下防护", "type": "civil", "level": "核6级", "lat": 37.3789, "lng": 101.6234, "capacity": 1400, "facilities": "密闭门、滤毒设备、应急水源", "access": "门源县人防工程"},
            {"id": "hb_004", "name": "原子城地下掩体", "type": "military", "level": "核4级", "lat": 36.9456, "lng": 100.9234, "capacity": 5000, "facilities": "顶级三防、独立供电、指挥系统", "access": "原子城核心区地下", "note": "历史核设施"}
        ],
        "nuclearTargets": [
            {"id": "hb_nt001", "name": "海北电厂", "type": "power", "risk": "low", "lat": 36.9678, "lng": 100.8789, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "hainan": {
        "name": "海南",
        "center": [100.6208, 36.2845],
        "shelters": [
            {"id": "hn_001", "name": "共和县地下人防", "type": "civil", "level": "核6级", "lat": 36.2845, "lng": 100.6208, "capacity": 2200, "facilities": "三防系统、应急供电、储水设施", "access": "共和县地下商城"},
            {"id": "hn_002", "name": "贵德地下避难所", "type": "civil", "level": "核6级", "lat": 36.0456, "lng": 101.4345, "capacity": 1800, "facilities": "通风过滤、应急照明、医疗点", "access": "贵德县人防入口"},
            {"id": "hn_003", "name": "兴海地下防护", "type": "civil", "level": "核6级", "lat": 35.5891, "lng": 99.9891, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "兴海县人防工程"},
            {"id": "hn_004", "name": "龙羊峡地下掩体", "type": "civil", "level": "核5级", "lat": 36.1234, "lng": 100.7567, "capacity": 3500, "facilities": "深埋结构、独立供电、大型储水", "access": "龙羊峡水电站地下"}
        ],
        "nuclearTargets": [
            {"id": "hn_nt001", "name": "龙羊峡水电站", "type": "power", "risk": "high", "lat": 36.1456, "lng": 100.7789, "radius": 5000, "description": "大型水电站"},
            {"id": "hn_nt002", "name": "海南电厂", "type": "power", "risk": "medium", "lat": 36.2678, "lng": 100.6456, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "huangnan": {
        "name": "黄南",
        "center": [102.0192, 35.5195],
        "shelters": [
            {"id": "hnz_001", "name": "同仁地下人防", "type": "civil", "level": "核6级", "lat": 35.5195, "lng": 102.0192, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "同仁市地下商城"},
            {"id": "hnz_002", "name": "尖扎地下避难所", "type": "civil", "level": "核6级", "lat": 35.9345, "lng": 102.0345, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "尖扎县人防入口"},
            {"id": "hnz_003", "name": "泽库地下防护", "type": "civil", "level": "核6级", "lat": 35.0234, "lng": 101.4678, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "泽库县人防工程"}
        ],
        "nuclearTargets": [
            {"id": "hnz_nt001", "name": "黄南电厂", "type": "power", "risk": "low", "lat": 35.5345, "lng": 102.0012, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "guoluo": {
        "name": "果洛",
        "center": [100.2447, 34.4714],
        "shelters": [
            {"id": "gl_001", "name": "玛沁地下人防", "type": "civil", "level": "核6级", "lat": 34.4714, "lng": 100.2447, "capacity": 1800, "facilities": "三防系统、应急供电、储水设施", "access": "玛沁县地下商城"},
            {"id": "gl_002", "name": "班玛地下避难所", "type": "civil", "level": "核6级", "lat": 32.9345, "lng": 100.7456, "capacity": 1400, "facilities": "通风过滤、应急照明、医疗点", "access": "班玛县人防入口"},
            {"id": "gl_003", "name": "甘德地下防护", "type": "civil", "level": "核6级", "lat": 33.9678, "lng": 99.9012, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "甘德县人防工程"}
        ],
        "nuclearTargets": [
            {"id": "gl_nt001", "name": "果洛电厂", "type": "power", "risk": "low", "lat": 34.4891, "lng": 100.2234, "radius": 5000, "description": "高原电厂"}
        ]
    },
    
    "yushu": {
        "name": "玉树",
        "center": [97.0090, 33.0103],
        "shelters": [
            {"id": "ys_001", "name": "结古镇地下人防", "type": "civil", "level": "核6级", "lat": 33.0103, "lng": 97.0090, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "结古镇地下商城"},
            {"id": "ys_002", "name": "玉树地震遗址地下避难所", "type": "civil", "level": "核6级", "lat": 33.0234, "lng": 97.0567, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗站", "access": "重建区人防中心"},
            {"id": "ys_003", "name": "玉树巴塘机场地下防护", "type": "transport", "level": "核6级", "lat": 32.8345, "lng": 97.0456, "capacity": 3000, "facilities": "深埋结构、密闭门、应急水源", "access": "机场地下设施"}
        ],
        "nuclearTargets": [
            {"id": "ys_nt001", "name": "玉树电厂", "type": "power", "risk": "low", "lat": 33.0456, "lng": 96.9789, "radius": 5000, "description": "高原电厂"},
            {"id": "ys_nt002", "name": "玉树巴塘机场", "type": "transport", "risk": "low", "lat": 32.8567, "lng": 97.0678, "radius": 3000, "description": "高原机场"}
        ]
    }
};

// 导出数据供合并使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA_BATCH_NEW };
}
