// 核战争城市自救地球仪 - 甘肃宁夏剩余城市数据
// 生成时间: 2026-04-17
// 覆盖甘肃12个城市 + 宁夏5个城市

const NUCLEAR_GLOBE_DATA_BATCH_GANSU_NINGXIA = {

    // ============================================
    // 甘肃省 (12个城市)
    // ============================================
    
    "lanzhou": {
        "name": "兰州",
        "center": [103.8343, 36.0611],
        "shelters": [
            {"id": "lz_001", "name": "西关十字地下人防", "type": "civil", "level": "核6级", "lat": 36.0611, "lng": 103.8343, "capacity": 5000, "facilities": "三防系统、应急供电、净水设备", "access": "地铁1号线西关站A口"},
            {"id": "lz_002", "name": "东方红广场地下避难所", "type": "civil", "level": "核6级", "lat": 36.0678, "lng": 103.8456, "capacity": 4500, "facilities": "通风过滤、储水设施、医疗站", "access": "东方红广场地下商城"},
            {"id": "lz_003", "name": "兰州火车站地下掩体", "type": "transport", "level": "核5级", "lat": 36.0456, "lng": 103.8567, "capacity": 6000, "facilities": "深埋结构、独立通风、大型储水", "access": "兰州站地下设施"},
            {"id": "lz_004", "name": "七里河地下防护", "type": "civil", "level": "核6级", "lat": 36.0789, "lng": 103.8123, "capacity": 3500, "facilities": "密闭门、滤毒设备、应急照明", "access": "七里河人防入口"},
            {"id": "lz_005", "name": "安宁地下避难所", "type": "civil", "level": "核6级", "lat": 36.1123, "lng": 103.7789, "capacity": 3000, "facilities": "三防门、应急供电、通讯设备", "access": "安宁区人防中心"},
            {"id": "lz_006", "name": "西固地下掩体", "type": "civil", "level": "核6级", "lat": 36.0345, "lng": 103.7234, "capacity": 4000, "facilities": "大型通风、发电设备、物资库", "access": "西固区人防工程"},
            {"id": "lz_007", "name": "张掖路地下避难所", "type": "mall", "level": "核6级", "lat": 36.0567, "lng": 103.8234, "capacity": 3800, "facilities": "滤毒通风、密闭门、应急水源", "access": "张掖路地下步行街"},
            {"id": "lz_008", "name": "黄河铁桥地下防护", "type": "civil", "level": "核6级", "lat": 36.0723, "lng": 103.8345, "capacity": 2500, "facilities": "三防系统、医疗点、应急照明", "access": "中山桥附近地下"}
        ],
        "nuclearTargets": [
            {"id": "lz_nt001", "name": "国电兰州热电", "type": "power", "risk": "high", "lat": 36.0234, "lng": 103.7456, "radius": 5000, "description": "省会城市主力电厂"},
            {"id": "lz_nt002", "name": "兰州石化", "type": "chemical", "risk": "high", "lat": 36.0123, "lng": 103.7123, "radius": 8000, "description": "大型炼化基地"},
            {"id": "lz_nt003", "name": "兰州自来水总公司", "type": "water", "risk": "medium", "lat": 36.0456, "lng": 103.8345, "radius": 3000, "description": "主要供水设施"},
            {"id": "lz_nt004", "name": "西固热电厂", "type": "power", "risk": "high", "lat": 36.0456, "lng": 103.7234, "radius": 5000, "description": "大型热电厂"},
            {"id": "lz_nt005", "name": "兰州中川机场", "type": "transport", "risk": "medium", "lat": 36.5234, "lng": 103.6234, "radius": 5000, "description": "国际航空港"}
        ]
    },
    
    "tianshui": {
        "name": "天水",
        "center": [105.7249, 34.5809],
        "shelters": [
            {"id": "ts_001", "name": "中心广场地下人防", "type": "civil", "level": "核6级", "lat": 34.5809, "lng": 105.7249, "capacity": 3500, "facilities": "三防系统、应急供电、储水设施", "access": "秦州区中心广场地下"},
            {"id": "ts_002", "name": "天水火车站地下避难所", "type": "transport", "level": "核6级", "lat": 34.5634, "lng": 105.8891, "capacity": 4000, "facilities": "大型通风、发电设备、物资库", "access": "天水站地下设施"},
            {"id": "ts_003", "name": "麦积地下防护", "type": "civil", "level": "核6级", "lat": 34.5789, "lng": 105.9234, "capacity": 2800, "facilities": "密闭门、滤毒设备、应急水源", "access": "麦积区人防入口"},
            {"id": "ts_004", "name": "秦州地下掩体", "type": "civil", "level": "核6级", "lat": 34.6012, "lng": 105.7234, "capacity": 2500, "facilities": "三防门、发电设备、通讯设施", "access": "秦州区人防中心"},
            {"id": "ts_005", "name": "伏羲庙地下避难所", "type": "civil", "level": "核6级", "lat": 34.5734, "lng": 105.7456, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "伏羲庙附近地下"}
        ],
        "nuclearTargets": [
            {"id": "ts_nt001", "name": "天水热电厂", "type": "power", "risk": "medium", "lat": 34.5345, "lng": 105.7567, "radius": 5000, "description": "地区主力电厂"},
            {"id": "ts_nt002", "name": "天水水厂", "type": "water", "risk": "medium", "lat": 34.5678, "lng": 105.7345, "radius": 3000, "description": "主要供水设施"}
        ]
    },
    
    "jiuquan": {
        "name": "酒泉",
        "center": [98.4945, 39.7323],
        "shelters": [
            {"id": "jq_001", "name": "鼓楼地下人防", "type": "civil", "level": "核6级", "lat": 39.7323, "lng": 98.4945, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "酒泉鼓楼地下商城"},
            {"id": "jq_002", "name": "酒泉卫星基地地下避难所", "type": "military", "level": "核4级", "lat": 41.1234, "lng": 100.2678, "capacity": 8000, "facilities": "顶级三防、独立供电、指挥系统", "access": "东风航天城地下设施", "note": "军事禁区"},
            {"id": "jq_003", "name": "敦煌地下防护", "type": "civil", "level": "核6级", "lat": 40.1456, "lng": 94.6678, "capacity": 2500, "facilities": "密闭门、滤毒设备、应急水源", "access": "敦煌市区人防中心"},
            {"id": "jq_004", "name": "嘉峪关地下掩体", "type": "civil", "level": "核6级", "lat": 39.8012, "lng": 98.2891, "capacity": 3500, "facilities": "深埋结构、大型通风、物资库", "access": "嘉峪关人防入口"},
            {"id": "jq_005", "name": "玉门地下避难所", "type": "civil", "level": "核6级", "lat": 40.2678, "lng": 97.0345, "capacity": 2000, "facilities": "三防门、发电设备、通讯设施", "access": "玉门市人防工程"}
        ],
        "nuclearTargets": [
            {"id": "jq_nt001", "name": "酒泉钢铁", "type": "industrial", "risk": "high", "lat": 39.8123, "lng": 98.3012, "radius": 6000, "description": "大型钢铁企业"},
            {"id": "jq_nt002", "name": "酒泉卫星发射中心", "type": "military", "risk": "high", "lat": 41.1567, "lng": 100.2891, "radius": 10000, "description": "战略导弹发射场", "note": "军事禁区"},
            {"id": "jq_nt003", "name": "玉门油田", "type": "oil", "risk": "medium", "lat": 40.2891, "lng": 97.0567, "radius": 8000, "description": "新中国第一油田"},
            {"id": "jq_nt004", "name": "酒泉电厂", "type": "power", "risk": "medium", "lat": 39.7456, "lng": 98.5234, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "zhangye": {
        "name": "张掖",
        "center": [100.4496, 38.9253],
        "shelters": [
            {"id": "zy_001", "name": "南大街地下人防", "type": "civil", "level": "核6级", "lat": 38.9253, "lng": 100.4496, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "甘州区南大街地下"},
            {"id": "zy_002", "name": "鼓楼地下避难所", "type": "civil", "level": "核6级", "lat": 38.9345, "lng": 100.4567, "capacity": 2200, "facilities": "通风过滤、应急照明、医疗点", "access": "张掖鼓楼地下"},
            {"id": "zy_003", "name": "丹霞地下防护", "type": "civil", "level": "核6级", "lat": 38.8789, "lng": 100.0678, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "丹霞景区附近人防", "note": "旅游景区"},
            {"id": "zy_004", "name": "火车站地下掩体", "type": "transport", "level": "核6级", "lat": 38.9567, "lng": 100.5234, "capacity": 3000, "facilities": "深埋结构、大型通风、物资库", "access": "张掖西站地下"}
        ],
        "nuclearTargets": [
            {"id": "zy_nt001", "name": "张掖电厂", "type": "power", "risk": "medium", "lat": 38.9456, "lng": 100.4234, "radius": 5000, "description": "地区电厂"},
            {"id": "zy_nt002", "name": "黑河水利枢纽", "type": "water", "risk": "medium", "lat": 38.7234, "lng": 99.8891, "radius": 4000, "description": "重要水利工程"}
        ]
    },
    
    "wuwei": {
        "name": "武威",
        "center": [102.6380, 37.9282],
        "shelters": [
            {"id": "ww_001", "name": "南大街地下人防", "type": "civil", "level": "核6级", "lat": 37.9282, "lng": 102.6380, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "凉州区南大街地下"},
            {"id": "ww_002", "name": "火车站地下避难所", "type": "transport", "level": "核6级", "lat": 37.9567, "lng": 102.6789, "capacity": 3000, "facilities": "大型通风、发电设备、物资库", "access": "武威站地下设施"},
            {"id": "ww_003", "name": "雷台地下防护", "type": "civil", "level": "核6级", "lat": 37.9456, "lng": 102.6234, "capacity": 2000, "facilities": "密闭门、滤毒设备、应急水源", "access": "雷台景区附近人防"},
            {"id": "ww_004", "name": "天马湖地下掩体", "type": "civil", "level": "核6级", "lat": 37.9012, "lng": 102.6567, "capacity": 1800, "facilities": "三防门、发电设备、通讯设施", "access": "天马湖附近地下"}
        ],
        "nuclearTargets": [
            {"id": "ww_nt001", "name": "国电武威热电", "type": "power", "risk": "medium", "lat": 37.9345, "lng": 102.6234, "radius": 5000, "description": "地区热电厂"},
            {"id": "ww_nt002", "name": "红崖山水库", "type": "water", "risk": "medium", "lat": 38.8234, "lng": 102.4567, "radius": 4000, "description": "重要水利工程"}
        ]
    },
    
    "dingxi": {
        "name": "定西",
        "center": [104.5928, 35.6073],
        "shelters": [
            {"id": "dx_001", "name": "解放路地下人防", "type": "civil", "level": "核6级", "lat": 35.6073, "lng": 104.5928, "capacity": 2200, "facilities": "三防系统、应急供电、储水设施", "access": "安定区解放路地下"},
            {"id": "dx_002", "name": "定西地下避难所", "type": "civil", "level": "核6级", "lat": 35.6234, "lng": 104.6123, "capacity": 1800, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "dx_003", "name": "火车站地下防护", "type": "transport", "level": "核6级", "lat": 35.6456, "lng": 104.5678, "capacity": 2500, "facilities": "深埋结构、密闭门、应急水源", "access": "定西站地下设施"}
        ],
        "nuclearTargets": [
            {"id": "dx_nt001", "name": "定西电厂", "type": "power", "risk": "medium", "lat": 35.6234, "lng": 104.5789, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "longnan": {
        "name": "陇南",
        "center": [104.9235, 33.4060],
        "shelters": [
            {"id": "ln_001", "name": "长江街地下人防", "type": "civil", "level": "核6级", "lat": 33.4060, "lng": 104.9235, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "武都区长江街地下"},
            {"id": "ln_002", "name": "陇南地下避难所", "type": "civil", "level": "核6级", "lat": 33.4234, "lng": 104.9456, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "ln_003", "name": "阶州地下防护", "type": "civil", "level": "核6级", "lat": 33.3789, "lng": 104.9012, "capacity": 1400, "facilities": "密闭门、滤毒设备、应急水源", "access": "阶州路人防工程"}
        ],
        "nuclearTargets": [
            {"id": "ln_nt001", "name": "陇南电厂", "type": "power", "risk": "low", "lat": 33.4123, "lng": 104.9345, "radius": 5000, "description": "地区电厂"},
            {"id": "ln_nt002", "name": "碧口水电站", "type": "power", "risk": "medium", "lat": 33.1567, "lng": 105.0891, "radius": 4000, "description": "白龙江水电站"}
        ]
    },
    
    "pingliang": {
        "name": "平凉",
        "center": [106.6650, 35.5430],
        "shelters": [
            {"id": "pl_001", "name": "西大街地下人防", "type": "civil", "level": "核6级", "lat": 35.5430, "lng": 106.6650, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "崆峒区西大街地下"},
            {"id": "pl_002", "name": "崆峒山地下避难所", "type": "civil", "level": "核6级", "lat": 35.5567, "lng": 106.5345, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "崆峒山景区附近", "note": "旅游景区"},
            {"id": "pl_003", "name": "平凉地下防护", "type": "civil", "level": "核6级", "lat": 35.5234, "lng": 106.6789, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "市区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "pl_nt001", "name": "平凉电厂", "type": "power", "risk": "medium", "lat": 35.5567, "lng": 106.6456, "radius": 5000, "description": "地区电厂"},
            {"id": "pl_nt002", "name": "崆峒水库", "type": "water", "risk": "low", "lat": 35.5789, "lng": 106.5123, "radius": 3000, "description": "重要水利工程"}
        ]
    },
    
    "qingyang": {
        "name": "庆阳",
        "center": [107.6436, 35.7090],
        "shelters": [
            {"id": "qy_001", "name": "西峰地下人防", "type": "civil", "level": "核6级", "lat": 35.7090, "lng": 107.6436, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "西峰区地下商城"},
            {"id": "qy_002", "name": "庆阳地下避难所", "type": "civil", "level": "核6级", "lat": 35.7234, "lng": 107.6678, "capacity": 2200, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "qy_003", "name": "北石窟地下防护", "type": "civil", "level": "核6级", "lat": 35.6891, "lng": 107.7123, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "北石窟寺附近人防"}
        ],
        "nuclearTargets": [
            {"id": "qy_nt001", "name": "庆阳石化", "type": "chemical", "risk": "high", "lat": 35.7345, "lng": 107.6789, "radius": 8000, "description": "大型炼化基地"},
            {"id": "qy_nt002", "name": "庆阳油田", "type": "oil", "risk": "high", "lat": 35.6567, "lng": 107.7891, "radius": 10000, "description": "长庆油田主产区"},
            {"id": "qy_nt003", "name": "庆阳电厂", "type": "power", "risk": "medium", "lat": 35.7123, "lng": 107.6345, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "baiyin": {
        "name": "白银",
        "center": [104.1378, 36.5447],
        "shelters": [
            {"id": "by_001", "name": "人民路地下人防", "type": "civil", "level": "核6级", "lat": 36.5447, "lng": 104.1378, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "白银区人民路地下"},
            {"id": "by_002", "name": "白银地下避难所", "type": "civil", "level": "核6级", "lat": 36.5678, "lng": 104.1567, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "by_003", "name": "平川地下防护", "type": "civil", "level": "核6级", "lat": 36.7234, "lng": 104.8234, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "平川区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "by_nt001", "name": "白银有色", "type": "industrial", "risk": "high", "lat": 36.5345, "lng": 104.1678, "radius": 6000, "description": "大型有色金属冶炼"},
            {"id": "by_nt002", "name": "靖远电厂", "type": "power", "risk": "high", "lat": 36.5678, "lng": 104.6789, "radius": 5000, "description": "大型火电厂"}
        ]
    },
    
    "jiayuguan": {
        "name": "嘉峪关",
        "center": [98.2892, 39.8010],
        "shelters": [
            {"id": "jyg_001", "name": "新华路地下人防", "type": "civil", "level": "核6级", "lat": 39.8010, "lng": 98.2892, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "新华路地下商城"},
            {"id": "jyg_002", "name": "嘉峪关关城地下避难所", "type": "civil", "level": "核6级", "lat": 39.8012, "lng": 98.2189, "capacity": 3500, "facilities": "通风过滤、应急照明、医疗点", "access": "关城景区附近人防", "note": "世界文化遗产"},
            {"id": "jyg_003", "name": "火车站地下防护", "type": "transport", "level": "核6级", "lat": 39.8456, "lng": 98.3234, "capacity": 3000, "facilities": "深埋结构、密闭门、应急水源", "access": "嘉峪关站地下"}
        ],
        "nuclearTargets": [
            {"id": "jyg_nt001", "name": "酒钢集团", "type": "industrial", "risk": "high", "lat": 39.8234, "lng": 98.3012, "radius": 6000, "description": "大型钢铁企业"},
            {"id": "jyg_nt002", "name": "嘉峪关电厂", "type": "power", "risk": "medium", "lat": 39.7678, "lng": 98.2789, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "jinchang": {
        "name": "金昌",
        "center": [102.1877, 38.5135],
        "shelters": [
            {"id": "jc_001", "name": "北京路地下人防", "type": "civil", "level": "核6级", "lat": 38.5135, "lng": 102.1877, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "金川区北京路地下"},
            {"id": "jc_002", "name": "金昌地下避难所", "type": "civil", "level": "核6级", "lat": 38.5345, "lng": 102.2234, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "jc_003", "name": "永昌地下防护", "type": "civil", "level": "核6级", "lat": 38.2456, "lng": 101.9678, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "永昌县人防工程"}
        ],
        "nuclearTargets": [
            {"id": "jc_nt001", "name": "金川集团", "type": "industrial", "risk": "high", "lat": 38.5234, "lng": 102.1789, "radius": 6000, "description": "大型镍矿冶炼基地"},
            {"id": "jc_nt002", "name": "金昌电厂", "type": "power", "risk": "medium", "lat": 38.5456, "lng": 102.2123, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "gannan": {
        "name": "甘南",
        "center": [102.9115, 34.9834],
        "shelters": [
            {"id": "gn_001", "name": "合作地下人防", "type": "civil", "level": "核6级", "lat": 34.9834, "lng": 102.9115, "capacity": 1800, "facilities": "三防系统、应急供电、储水设施", "access": "合作市地下商城"},
            {"id": "gn_002", "name": "夏河地下避难所", "type": "civil", "level": "核6级", "lat": 35.2012, "lng": 102.5234, "capacity": 1400, "facilities": "通风过滤、应急照明、医疗点", "access": "夏河县人防入口", "note": "拉卜楞寺附近"},
            {"id": "gn_003", "name": "甘南地下防护", "type": "civil", "level": "核6级", "lat": 34.9678, "lng": 102.9345, "capacity": 1200, "facilities": "密闭门、滤毒设备、应急水源", "access": "州人防工程"}
        ],
        "nuclearTargets": [
            {"id": "gn_nt001", "name": "甘南电厂", "type": "power", "risk": "low", "lat": 35.0012, "lng": 102.9012, "radius": 5000, "description": "高原小型电厂"},
            {"id": "gn_nt002", "name": "九甸峡水电站", "type": "power", "risk": "medium", "lat": 34.6789, "lng": 103.4567, "radius": 4000, "description": "重要水电站"}
        ]
    },
    
    "linxia": {
        "name": "临夏",
        "center": [103.2105, 35.6054],
        "shelters": [
            {"id": "lx_001", "name": "解放路地下人防", "type": "civil", "level": "核6级", "lat": 35.6054, "lng": 103.2105, "capacity": 2000, "facilities": "三防系统、应急供电、储水设施", "access": "临夏市解放路地下"},
            {"id": "lx_002", "name": "红园地下避难所", "type": "civil", "level": "核6级", "lat": 35.6234, "lng": 103.2345, "capacity": 1600, "facilities": "通风过滤、应急照明、医疗点", "access": "红园广场地下"},
            {"id": "lx_003", "name": "八坊地下防护", "type": "civil", "level": "核6级", "lat": 35.5789, "lng": 103.1891, "capacity": 1400, "facilities": "密闭门、滤毒设备、应急水源", "access": "八坊十三巷附近"}
        ],
        "nuclearTargets": [
            {"id": "lx_nt001", "name": "临夏电厂", "type": "power", "risk": "low", "lat": 35.6345, "lng": 103.2456, "radius": 5000, "description": "地区电厂"},
            {"id": "lx_nt002", "name": "刘家峡水电站", "type": "power", "risk": "high", "lat": 35.9234, "lng": 103.3234, "radius": 5000, "description": "大型水电站"}
        ]
    },

    // ============================================
    // 宁夏回族自治区 (5个城市)
    // ============================================
    
    "yinchuan": {
        "name": "银川",
        "center": [106.2309, 38.4872],
        "shelters": [
            {"id": "yc_001", "name": "解放街地下人防", "type": "civil", "level": "核6级", "lat": 38.4872, "lng": 106.2309, "capacity": 4500, "facilities": "三防系统、应急供电、净水设备", "access": "兴庆区解放街地下商城"},
            {"id": "yc_002", "name": "光明广场地下避难所", "type": "civil", "level": "核6级", "lat": 38.4956, "lng": 106.2456, "capacity": 4000, "facilities": "通风过滤、储水设施、医疗站", "access": "光明广场地下"},
            {"id": "yc_003", "name": "金凤地下防护", "type": "civil", "level": "核6级", "lat": 38.5234, "lng": 106.2234, "capacity": 3500, "facilities": "密闭门、滤毒设备、应急照明", "access": "金凤区人防入口"},
            {"id": "yc_004", "name": "西夏地下掩体", "type": "civil", "level": "核5级", "lat": 38.5567, "lng": 106.1567, "capacity": 5000, "facilities": "深埋结构、独立供电、指挥通讯", "access": "西夏区人防中心"},
            {"id": "yc_005", "name": "火车站地下避难所", "type": "transport", "level": "核6级", "lat": 38.5345, "lng": 106.2891, "capacity": 4000, "facilities": "大型通风、发电设备、物资库", "access": "银川站地下设施"},
            {"id": "yc_006", "name": "滨河地下防护", "type": "civil", "level": "核6级", "lat": 38.4891, "lng": 106.3567, "capacity": 3000, "facilities": "三防门、发电设备、通讯设施", "access": "滨河新区人防工程"}
        ],
        "nuclearTargets": [
            {"id": "yc_nt001", "name": "国电宁夏电力", "type": "power", "risk": "high", "lat": 38.5123, "lng": 106.2678, "radius": 5000, "description": "区域电网主力电厂"},
            {"id": "yc_nt002", "name": "宁东能源基地", "type": "chemical", "risk": "high", "lat": 38.4234, "lng": 106.8234, "radius": 10000, "description": "大型煤电化基地"},
            {"id": "yc_nt003", "name": "银川自来水", "type": "water", "risk": "medium", "lat": 38.4678, "lng": 106.2456, "radius": 3000, "description": "主要供水设施"},
            {"id": "yc_nt004", "name": "河东机场", "type": "transport", "risk": "medium", "lat": 38.3234, "lng": 106.3932, "radius": 5000, "description": "国际航空港"}
        ]
    },
    
    "shizuishan": {
        "name": "石嘴山",
        "center": [106.3834, 39.0133],
        "shelters": [
            {"id": "szs_001", "name": "朝阳街地下人防", "type": "civil", "level": "核6级", "lat": 39.0133, "lng": 106.3834, "capacity": 3000, "facilities": "三防系统、应急供电、储水设施", "access": "大武口区朝阳街地下"},
            {"id": "szs_002", "name": "石嘴山地下避难所", "type": "civil", "level": "核6级", "lat": 39.0345, "lng": 106.3567, "capacity": 2500, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "szs_003", "name": "惠农地下防护", "type": "civil", "level": "核6级", "lat": 39.2456, "lng": 106.7789, "capacity": 2000, "facilities": "密闭门、滤毒设备、应急水源", "access": "惠农区人防工程"},
            {"id": "szs_004", "name": "平罗地下掩体", "type": "civil", "level": "核6级", "lat": 38.9012, "lng": 106.5345, "capacity": 1800, "facilities": "三防门、发电设备、通讯设施", "access": "平罗县人防中心"}
        ],
        "nuclearTargets": [
            {"id": "szs_nt001", "name": "国电石嘴山电厂", "type": "power", "risk": "high", "lat": 39.0234, "lng": 106.3456, "radius": 5000, "description": "大型火电厂"},
            {"id": "szs_nt002", "name": "石嘴山钢厂", "type": "industrial", "risk": "medium", "lat": 39.0567, "lng": 106.3234, "radius": 6000, "description": "钢铁冶炼基地"}
        ]
    },
    
    "wuzhong": {
        "name": "吴忠",
        "center": [106.2002, 37.9847],
        "shelters": [
            {"id": "wz_001", "name": "利通街地下人防", "type": "civil", "level": "核6级", "lat": 37.9847, "lng": 106.2002, "capacity": 2800, "facilities": "三防系统、应急供电、储水设施", "access": "利通区利通街地下"},
            {"id": "wz_002", "name": "吴忠地下避难所", "type": "civil", "level": "核6级", "lat": 37.9678, "lng": 106.2234, "capacity": 2200, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "wz_003", "name": "青铜峡地下防护", "type": "civil", "level": "核6级", "lat": 38.0012, "lng": 106.0789, "capacity": 2500, "facilities": "密闭门、滤毒设备、应急水源", "access": "青铜峡市人防工程"}
        ],
        "nuclearTargets": [
            {"id": "wz_nt001", "name": "青铜峡水电站", "type": "power", "risk": "high", "lat": 37.9567, "lng": 106.0456, "radius": 5000, "description": "大型水电站"},
            {"id": "wz_nt002", "name": "吴忠电厂", "type": "power", "risk": "medium", "lat": 37.9912, "lng": 106.2345, "radius": 5000, "description": "地区电厂"}
        ]
    },
    
    "guyuan": {
        "name": "固原",
        "center": [106.2426, 36.0144],
        "shelters": [
            {"id": "gy_001", "name": "文化街地下人防", "type": "civil", "level": "核6级", "lat": 36.0144, "lng": 106.2426, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "原州区文化街地下"},
            {"id": "gy_002", "name": "固原地下避难所", "type": "civil", "level": "核6级", "lat": 35.9956, "lng": 106.2678, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "市区人防入口"},
            {"id": "gy_003", "name": "六盘山地下防护", "type": "civil", "level": "核6级", "lat": 35.6567, "lng": 106.2012, "capacity": 1500, "facilities": "密闭门、滤毒设备、应急水源", "access": "六盘山景区附近人防", "note": "红色旅游景区"}
        ],
        "nuclearTargets": [
            {"id": "gy_nt001", "name": "固原电厂", "type": "power", "risk": "medium", "lat": 36.0234, "lng": 106.2567, "radius": 5000, "description": "地区电厂"},
            {"id": "gy_nt002", "name": "东岳山水厂", "type": "water", "risk": "low", "lat": 35.9878, "lng": 106.2456, "radius": 3000, "description": "主要供水设施"}
        ]
    },
    
    "zhongwei": {
        "name": "中卫",
        "center": [105.1968, 37.5142],
        "shelters": [
            {"id": "zw_001", "name": "鼓楼西街地下人防", "type": "civil", "level": "核6级", "lat": 37.5142, "lng": 105.1968, "capacity": 2500, "facilities": "三防系统、应急供电、储水设施", "access": "沙坡头区鼓楼西街地下"},
            {"id": "zw_002", "name": "沙坡头地下避难所", "type": "civil", "level": "核6级", "lat": 37.4567, "lng": 105.0234, "capacity": 2000, "facilities": "通风过滤、应急照明、医疗点", "access": "沙坡头景区附近", "note": "旅游景区"},
            {"id": "zw_003", "name": "中卫地下防护", "type": "civil", "level": "核6级", "lat": 37.5345, "lng": 105.2234, "capacity": 1800, "facilities": "密闭门、滤毒设备、应急水源", "access": "市区人防工程"},
            {"id": "zw_004", "name": "中宁地下掩体", "type": "civil", "level": "核6级", "lat": 37.4789, "lng": 105.6789, "capacity": 1600, "facilities": "三防门、发电设备、通讯设施", "access": "中宁县人防中心"}
        ],
        "nuclearTargets": [
            {"id": "zw_nt001", "name": "国电中卫热电", "type": "power", "risk": "medium", "lat": 37.5234, "lng": 105.1789, "radius": 5000, "description": "地区热电厂"},
            {"id": "zw_nt002", "name": "沙坡头水利枢纽", "type": "water", "risk": "medium", "lat": 37.4456, "lng": 105.0345, "radius": 4000, "description": "重要水利工程"}
        ]
    }
};

// 导出数据供合并使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA_BATCH_GANSU_NINGXIA };
}
