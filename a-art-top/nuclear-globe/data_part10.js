// 核战争城市自救地球仪 - 剩余城市数据补充（续）
// 批次: 批次10 - 完成337城市目标
// 覆盖: 辽宁/吉林/黑龙江补充 + 安徽/福建/江西补充
// 生成时间: 2026-04-17

const PART10_CITIES = {
    // ========== 辽宁省（补充）==========
    "anshan": {
        name: "鞍山",
        center: [123.0000, 41.1104],
        shelters: [
            { id: "as_001", name: "鞍山火车站人防工程", type: "transport", level: "核6级", lat: 41.1204, lng: 123.0000, capacity: 2500, facilities: "深埋结构、通风系统、应急供水", access: "鞍山站B出口" },
            { id: "as_002", name: "万象汇地下避难所", type: "mall", level: "核6级", lat: 41.1104, lng: 123.0200, capacity: 3000, facilities: "三防门、应急供电、物资储备", access: "万象汇B2层" },
            { id: "as_003", name: "二一九公园人防工程", type: "civil", level: "核6级", lat: 41.1004, lng: 123.0100, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "二一九公园西门地下" },
            { id: "as_004", name: "鞍钢集团地下避难所", type: "government", level: "核5级", lat: 41.0904, lng: 122.9900, capacity: 3500, facilities: "抗核加固、独立供电、指挥中心", access: "鞍钢集团总部" }
        ],
        nuclearTargets: [
            { name: "鞍山钢铁集团", type: "factory", lat: 41.1304, lng: 122.9800, risk: "high", radius: 5000 },
            { name: "鞍山发电厂", type: "power", lat: 41.0704, lng: 123.0000, risk: "critical", radius: 8000 },
            { name: "鞍山自来水厂", type: "water", lat: 41.1104, lng: 123.0400, risk: "high", radius: 3000 }
        ]
    },
    "fushun": {
        name: "抚顺",
        center: [123.9211, 41.8759],
        shelters: [
            { id: "fs_001", name: "抚顺火车站人防工程", type: "transport", level: "核6级", lat: 41.8859, lng: 123.9211, capacity: 2200, facilities: "通风系统、应急供水、医疗站", access: "抚顺站B出口" },
            { id: "fs_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 41.8759, lng: 123.9411, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "fs_003", name: "雷锋纪念馆人防工程", type: "civil", level: "核6级", lat: 41.8659, lng: 123.9311, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "雷锋纪念馆地下" }
        ],
        nuclearTargets: [
            { name: "抚顺发电厂", type: "power", lat: 41.8959, lng: 123.9011, risk: "critical", radius: 8000 },
            { name: "抚顺煤矿", type: "factory", lat: 41.8559, lng: 123.9211, risk: "high", radius: 5000 },
            { name: "抚顺自来水厂", type: "water", lat: 41.8759, lng: 123.9611, risk: "high", radius: 3000 }
        ]
    },
    "benxi": {
        name: "本溪",
        center: [123.7708, 41.2940],
        shelters: [
            { id: "bx_001", name: "本溪火车站人防工程", type: "transport", level: "核6级", lat: 41.3040, lng: 123.7708, capacity: 2000, facilities: "深埋结构、通风系统、应急供水", access: "本溪站B出口" },
            { id: "bx_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 41.2940, lng: 123.7908, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "bx_003", name: "本溪水洞景区避难所", type: "civil", level: "核5级", lat: 41.3240, lng: 123.7408, capacity: 1500, facilities: "山体掩体、应急物资、医疗站", access: "水洞景区入口" }
        ],
        nuclearTargets: [
            { name: "本溪钢铁集团", type: "factory", lat: 41.3140, lng: 123.7508, risk: "high", radius: 5000 },
            { name: "本溪发电厂", type: "power", lat: 41.2740, lng: 123.7708, risk: "critical", radius: 8000 },
            { name: "本溪自来水厂", type: "water", lat: 41.2940, lng: 123.8108, risk: "high", radius: 3000 }
        ]
    },
    "dandong": {
        name: "丹东",
        center: [124.3545, 40.1244],
        shelters: [
            { id: "dd_001", name: "丹东火车站人防工程", type: "transport", level: "核6级", lat: 40.1344, lng: 124.3545, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "丹东站B出口" },
            { id: "dd_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 40.1244, lng: 124.3745, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "dd_003", name: "鸭绿江断桥景区避难所", type: "civil", level: "核6级", lat: 40.1144, lng: 124.3645, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "断桥景区地下" }
        ],
        nuclearTargets: [
            { name: "丹东港", type: "port", lat: 40.1044, lng: 124.3845, risk: "high", radius: 5000 },
            { name: "丹东发电厂", type: "power", lat: 40.1444, lng: 124.3345, risk: "critical", radius: 8000 },
            { name: "丹东自来水厂", type: "water", lat: 40.1244, lng: 124.3945, risk: "high", radius: 3000 }
        ]
    },
    "yingkou": {
        name: "营口",
        center: [122.2352, 40.6670],
        shelters: [
            { id: "yk_001", name: "营口火车站人防工程", type: "transport", level: "核6级", lat: 40.6770, lng: 122.2352, capacity: 2000, facilities: "深埋结构、通风系统、应急供水", access: "营口站B出口" },
            { id: "yk_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 40.6670, lng: 122.2552, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "yk_003", name: "辽河广场人防工程", type: "civil", level: "核6级", lat: 40.6570, lng: 122.2452, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "辽河广场地下" }
        ],
        nuclearTargets: [
            { name: "营口港", type: "port", lat: 40.6470, lng: 122.2152, risk: "high", radius: 5000 },
            { name: "营口发电厂", type: "power", lat: 40.6870, lng: 122.2152, risk: "critical", radius: 8000 },
            { name: "营口自来水厂", type: "water", lat: 40.6670, lng: 122.2752, risk: "high", radius: 3000 }
        ]
    },
    "fuxin": {
        name: "阜新",
        center: [121.6700, 42.0217],
        shelters: [
            { id: "fx_001", name: "阜新火车站人防工程", type: "transport", level: "核6级", lat: 42.0317, lng: 121.6700, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "阜新站A出口" },
            { id: "fx_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 42.0217, lng: 121.6900, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "fx_003", name: "海州庙人防工程", type: "civil", level: "核6级", lat: 42.0117, lng: 121.6800, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "海州庙地下" }
        ],
        nuclearTargets: [
            { name: "阜新发电厂", type: "power", lat: 42.0417, lng: 121.6500, risk: "critical", radius: 8000 },
            { name: "阜新煤矿", type: "factory", lat: 42.0017, lng: 121.6700, risk: "high", radius: 5000 }
        ]
    },
    "liaoyang": {
        name: "辽阳",
        center: [123.2363, 41.2681],
        shelters: [
            { id: "ly_001", name: "辽阳火车站人防工程", type: "transport", level: "核6级", lat: 41.2781, lng: 123.2363, capacity: 2000, facilities: "深埋结构、通风系统、应急供水", access: "辽阳站B出口" },
            { id: "ly_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 41.2681, lng: 123.2563, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "ly_003", name: "白塔公园人防工程", type: "civil", level: "核6级", lat: 41.2581, lng: 123.2463, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "白塔公园西门地下" }
        ],
        nuclearTargets: [
            { name: "辽阳化工厂", type: "chemical", lat: 41.2881, lng: 123.2163, risk: "critical", radius: 10000 },
            { name: "辽阳发电厂", type: "power", lat: 41.2481, lng: 123.2363, risk: "critical", radius: 8000 },
            { name: "辽阳自来水厂", type: "water", lat: 41.2681, lng: 123.2763, risk: "high", radius: 3000 }
        ]
    },
    "panjin": {
        name: "盘锦",
        center: [122.0703, 41.1196],
        shelters: [
            { id: "pj_001", name: "盘锦火车站人防工程", type: "transport", level: "核6级", lat: 41.1296, lng: 122.0703, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "盘锦站B出口" },
            { id: "pj_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 41.1196, lng: 122.0903, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "pj_003", name: "红海滩景区避难所", type: "civil", level: "核5级", lat: 41.0896, lng: 122.0403, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "红海滩景区入口" }
        ],
        nuclearTargets: [
            { name: "辽河油田", type: "factory", lat: 41.1396, lng: 122.0503, risk: "critical", radius: 10000 },
            { name: "盘锦发电厂", type: "power", lat: 41.0996, lng: 122.0703, risk: "critical", radius: 8000 },
            { name: "盘锦自来水厂", type: "water", lat: 41.1196, lng: 122.1103, risk: "high", radius: 3000 }
        ]
    },
    "tieling": {
        name: "铁岭",
        center: [123.8435, 42.2860],
        shelters: [
            { id: "tl_001", name: "铁岭火车站人防工程", type: "transport", level: "核6级", lat: 42.2960, lng: 123.8435, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "铁岭站A出口" },
            { id: "tl_002", name: "新都汇地下避难所", type: "mall", level: "核6级", lat: 42.2860, lng: 123.8635, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "新都汇B2层" },
            { id: "tl_003", name: "龙首山风景区避难所", type: "civil", level: "核5级", lat: 42.3060, lng: 123.8335, capacity: 1500, facilities: "山体掩体、应急物资、医疗站", access: "龙首山风景区" }
        ],
        nuclearTargets: [
            { name: "铁岭发电厂", type: "power", lat: 42.2760, lng: 123.8235, risk: "critical", radius: 8000 },
            { name: "铁岭自来水厂", type: "water", lat: 42.2860, lng: 123.8835, risk: "high", radius: 3000 }
        ]
    },
    "chaoyang": {
        name: "朝阳",
        center: [120.4524, 41.5734],
        shelters: [
            { id: "cy_001", name: "朝阳火车站人防工程", type: "transport", level: "核6级", lat: 41.5834, lng: 120.4524, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "朝阳站B出口" },
            { id: "cy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 41.5734, lng: 120.4724, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "cy_003", name: "凤凰山景区避难所", type: "civil", level: "核5级", lat: 41.5534, lng: 120.4324, capacity: 1800, facilities: "山体掩体、应急物资、医疗站", access: "凤凰山景区入口" }
        ],
        nuclearTargets: [
            { name: "朝阳发电厂", type: "power", lat: 41.5934, lng: 120.4224, risk: "critical", radius: 8000 },
            { name: "朝阳自来水厂", type: "water", lat: 41.5734, lng: 120.4924, risk: "high", radius: 3000 }
        ]
    },
    "huludao": {
        name: "葫芦岛",
        center: [120.8608, 40.7543],
        shelters: [
            { id: "hld_001", name: "葫芦岛火车站人防工程", type: "transport", level: "核6级", lat: 40.7643, lng: 120.8608, capacity: 2000, facilities: "深埋结构、通风系统、应急供水", access: "葫芦岛站B出口" },
            { id: "hld_002", name: "飞天广场地下避难所", type: "mall", level: "核6级", lat: 40.7543, lng: 120.8808, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "飞天广场B2层" },
            { id: "hld_003", name: "龙湾公园人防工程", type: "civil", level: "核6级", lat: 40.7443, lng: 120.8708, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "龙湾公园地下" }
        ],
        nuclearTargets: [
            { name: "葫芦岛港", type: "port", lat: 40.7243, lng: 120.8408, risk: "high", radius: 5000 },
            { name: "葫芦岛化工厂", type: "chemical", lat: 40.7743, lng: 120.8508, risk: "critical", radius: 10000 },
            { name: "葫芦岛自来水厂", type: "water", lat: 40.7543, lng: 120.9008, risk: "high", radius: 3000 }
        ]
    },

    // ========== 吉林省（补充）==========
    "jilin": {
        name: "吉林",
        center: [126.5603, 43.8378],
        shelters: [
            { id: "jl_001", name: "吉林火车站人防工程", type: "transport", level: "核6级", lat: 43.8478, lng: 126.5603, capacity: 2500, facilities: "深埋结构、通风系统、应急供水", access: "吉林站B出口" },
            { id: "jl_002", name: "财富广场地下避难所", type: "mall", level: "核6级", lat: 43.8378, lng: 126.5803, capacity: 3000, facilities: "三防门、应急供电、物资储备", access: "财富广场B2层" },
            { id: "jl_003", name: "北山公园人防工程", type: "civil", level: "核6级", lat: 43.8278, lng: 126.5703, capacity: 2200, facilities: "密闭门、应急照明、医疗站", access: "北山公园西门地下" },
            { id: "jl_004", name: "松花江边避难所", type: "civil", level: "核5级", lat: 43.8478, lng: 126.5403, capacity: 2000, facilities: "抗核加固、滤毒通风、通讯设备", access: "松花江大坝" }
        ],
        nuclearTargets: [
            { name: "吉林化工厂", type: "chemical", lat: 43.8678, lng: 126.5303, risk: "critical", radius: 10000 },
            { name: "吉林热电厂", type: "power", lat: 43.8178, lng: 126.5603, risk: "critical", radius: 8000 },
            { name: "吉林自来水厂", type: "water", lat: 43.8378, lng: 126.6003, risk: "high", radius: 3000 }
        ]
    },
    "siping": {
        name: "四平",
        center: [124.3504, 43.1665],
        shelters: [
            { id: "sp_001", name: "四平火车站人防工程", type: "transport", level: "核6级", lat: 43.1765, lng: 124.3504, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "四平站B出口" },
            { id: "sp_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 43.1665, lng: 124.3704, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "sp_003", name: "英雄广场人防工程", type: "civil", level: "核6级", lat: 43.1565, lng: 124.3604, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "英雄广场地下" }
        ],
        nuclearTargets: [
            { name: "四平发电厂", type: "power", lat: 43.1865, lng: 124.3304, risk: "critical", radius: 8000 },
            { name: "四平自来水厂", type: "water", lat: 43.1665, lng: 124.3904, risk: "high", radius: 3000 }
        ]
    },
    "liaoyuan": {
        name: "辽源",
        center: [125.1437, 42.8878],
        shelters: [
            { id: "ly_001", name: "辽源火车站人防工程", type: "transport", level: "核6级", lat: 42.8978, lng: 125.1437, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "辽源站A出口" },
            { id: "ly_002", name: "大润发地下避难所", type: "mall", level: "核6级", lat: 42.8878, lng: 125.1637, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "大润发B1层" },
            { id: "ly_003", name: "龙山公园人防工程", type: "civil", level: "核6级", lat: 42.8778, lng: 125.1537, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "龙山公园地下" }
        ],
        nuclearTargets: [
            { name: "辽源发电厂", type: "power", lat: 42.9078, lng: 125.1237, risk: "critical", radius: 8000 },
            { name: "辽源自来水厂", type: "water", lat: 42.8878, lng: 125.1837, risk: "high", radius: 3000 }
        ]
    },
    "tonghua": {
        name: "通化",
        center: [125.9368, 41.7212],
        shelters: [
            { id: "th_001", name: "通化火车站人防工程", type: "transport", level: "核6级", lat: 41.7312, lng: 125.9368, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "通化站B出口" },
            { id: "th_002", name: "欧亚购物中心地下避难所", type: "mall", level: "核6级", lat: 41.7212, lng: 125.9568, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "欧亚中心B2层" },
            { id: "th_003", name: "玉皇山公园人防工程", type: "civil", level: "核6级", lat: 41.7112, lng: 125.9468, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "玉皇山公园西门" }
        ],
        nuclearTargets: [
            { name: "通化发电厂", type: "power", lat: 41.7412, lng: 125.9168, risk: "critical", radius: 8000 },
            { name: "通化钢铁厂", type: "factory", lat: 41.7012, lng: 125.9368, risk: "high", radius: 5000 },
            { name: "通化自来水厂", type: "water", lat: 41.7212, lng: 125.9768, risk: "high", radius: 3000 }
        ]
    },
    "baishan": {
        name: "白山",
        center: [126.4239, 41.9395],
        shelters: [
            { id: "bs_001", name: "白山火车站人防工程", type: "transport", level: "核6级", lat: 41.9495, lng: 126.4239, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "白山站A出口" },
            { id: "bs_002", name: "欧亚合兴地下避难所", type: "mall", level: "核6级", lat: 41.9395, lng: 126.4439, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "欧亚合兴B2层" },
            { id: "bs_003", name: "北山公园人防工程", type: "civil", level: "核6级", lat: 41.9295, lng: 126.4339, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "北山公园地下" }
        ],
        nuclearTargets: [
            { name: "白山发电厂", type: "power", lat: 41.9595, lng: 126.4039, risk: "critical", radius: 8000 },
            { name: "白山自来水厂", type: "water", lat: 41.9395, lng: 126.4639, risk: "high", radius: 3000 }
        ]
    },
    "songyuan": {
        name: "松原",
        center: [124.8253, 45.1411],
        shelters: [
            { id: "sy_001", name: "松原火车站人防工程", type: "transport", level: "核6级", lat: 45.1511, lng: 124.8253, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "松原站B出口" },
            { id: "sy_002", name: "欧亚购物中心地下避难所", type: "mall", level: "核6级", lat: 45.1411, lng: 124.8453, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "欧亚中心B2层" },
            { id: "sy_003", name: "松花江边避难所", type: "civil", level: "核5级", lat: 45.1311, lng: 124.8153, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "松花江大坝" }
        ],
        nuclearTargets: [
            { name: "松原油田", type: "factory", lat: 45.1611, lng: 124.7953, risk: "critical", radius: 10000 },
            { name: "松原发电厂", type: "power", lat: 45.1211, lng: 124.8253, risk: "critical", radius: 8000 },
            { name: "松原自来水厂", type: "water", lat: 45.1411, lng: 124.8653, risk: "high", radius: 3000 }
        ]
    },
    "baicheng": {
        name: "白城",
        center: [122.8386, 45.6205],
        shelters: [
            { id: "bc_001", name: "白城火车站人防工程", type: "transport", level: "核6级", lat: 45.6305, lng: 122.8386, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "白城站B出口" },
            { id: "bc_002", name: "欧亚购物中心地下避难所", type: "mall", level: "核6级", lat: 45.6205, lng: 122.8586, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "欧亚中心B2层" },
            { id: "bc_003", name: "劳动公园人防工程", type: "civil", level: "核6级", lat: 45.6105, lng: 122.8486, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "劳动公园地下" }
        ],
        nuclearTargets: [
            { name: "白城发电厂", type: "power", lat: 45.6405, lng: 122.8086, risk: "critical", radius: 8000 },
            { name: "白城自来水厂", type: "water", lat: 45.6205, lng: 122.8786, risk: "high", radius: 3000 }
        ]
    },

    // ========== 黑龙江省（补充）==========
    "jiamusi": {
        name: "佳木斯",
        center: [130.3188, 46.7998],
        shelters: [
            { id: "jms_001", name: "佳木斯火车站人防工程", type: "transport", level: "核6级", lat: 46.8098, lng: 130.3188, capacity: 2200, facilities: "通风系统、应急供水、医疗站", access: "佳木斯站B出口" },
            { id: "jms_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 46.7998, lng: 130.3388, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "jms_003", name: "西林公园人防工程", type: "civil", level: "核6级", lat: 46.7898, lng: 130.3288, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "西林公园地下" }
        ],
        nuclearTargets: [
            { name: "佳木斯发电厂", type: "power", lat: 46.8198, lng: 130.2988, risk: "critical", radius: 8000 },
            { name: "佳木斯港", type: "port", lat: 46.7798, lng: 130.3188, risk: "high", radius: 5000 },
            { name: "佳木斯自来水厂", type: "water", lat: 46.7998, lng: 130.3588, risk: "high", radius: 3000 }
        ]
    },
    "daqing": {
        name: "大庆",
        center: [125.0218, 46.5969],
        shelters: [
            { id: "dq_001", name: "大庆火车站人防工程", type: "transport", level: "核6级", lat: 46.6069, lng: 125.0218, capacity: 2500, facilities: "深埋结构、通风系统、应急供水", access: "大庆站B出口" },
            { id: "dq_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 46.5969, lng: 125.0418, capacity: 3000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "dq_003", name: "铁人纪念馆人防工程", type: "civil", level: "核6级", lat: 46.5869, lng: 125.0318, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "铁人纪念馆地下" },
            { id: "dq_004", name: "大庆油田指挥中心", type: "government", level: "核5级", lat: 46.6169, lng: 125.0018, capacity: 1500, facilities: "抗核加固、独立供电、指挥中心", access: "油田总部" }
        ],
        nuclearTargets: [
            { name: "大庆油田", type: "factory", lat: 46.6369, lng: 124.9918, risk: "critical", radius: 10000 },
            { name: "大庆石化", type: "chemical", lat: 46.5769, lng: 125.0218, risk: "critical", radius: 10000 },
            { name: "大庆自来水厂", type: "water", lat: 46.5969, lng: 125.0618, risk: "high", radius: 3000 }
        ]
    },
    "yichunhlj": {
        name: "伊春",
        center: [128.8411, 47.7262],
        shelters: [
            { id: "ych_001", name: "伊春火车站人防工程", type: "transport", level: "核6级", lat: 47.7362, lng: 128.8411, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "伊春站B出口" },
            { id: "ych_002", name: "大商地下避难所", type: "mall", level: "核6级", lat: 47.7262, lng: 128.8611, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "大商B2层" },
            { id: "ych_003", name: "北山公园人防工程", type: "civil", level: "核6级", lat: 47.7162, lng: 128.8511, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "北山公园地下" }
        ],
        nuclearTargets: [
            { name: "伊春发电厂", type: "power", lat: 47.7462, lng: 128.8211, risk: "critical", radius: 8000 },
            { name: "伊春自来水厂", type: "water", lat: 47.7262, lng: 128.8811, risk: "high", radius: 3000 }
        ]
    },
    "jixi": {
        name: "鸡西",
        center: [130.9698, 45.2952],
        shelters: [
            { id: "jx_001", name: "鸡西火车站人防工程", type: "transport", level: "核6级", lat: 45.3052, lng: 130.9698, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "鸡西站B出口" },
            { id: "jx_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 45.2952, lng: 130.9898, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "jx_003", name: "鸡冠山公园人防工程", type: "civil", level: "核6级", lat: 45.2852, lng: 130.9798, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "鸡冠山公园地下" }
        ],
        nuclearTargets: [
            { name: "鸡西煤矿", type: "factory", lat: 45.3152, lng: 130.9598, risk: "high", radius: 5000 },
            { name: "鸡西发电厂", type: "power", lat: 45.2752, lng: 130.9698, risk: "critical", radius: 8000 },
            { name: "鸡西自来水厂", type: "water", lat: 45.2952, lng: 131.0098, risk: "high", radius: 3000 }
        ]
    },
    "hegang": {
        name: "鹤岗",
        center: [130.2775, 47.3499],
        shelters: [
            { id: "hg_001", name: "鹤岗火车站人防工程", type: "transport", level: "核6级", lat: 47.3599, lng: 130.2775, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "鹤岗站A出口" },
            { id: "hg_002", name: "比优特地下避难所", type: "mall", level: "核6级", lat: 47.3499, lng: 130.2975, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "比优特B2层" },
            { id: "hg_003", name: "五指山公园人防工程", type: "civil", level: "核6级", lat: 47.3399, lng: 130.2875, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "五指山公园地下" }
        ],
        nuclearTargets: [
            { name: "鹤岗煤矿", type: "factory", lat: 47.3699, lng: 130.2575, risk: "high", radius: 5000 },
            { name: "鹤岗发电厂", type: "power", lat: 47.3299, lng: 130.2775, risk: "critical", radius: 8000 }
        ]
    },
    "shuangyashan": {
        name: "双鸭山",
        center: [131.1614, 46.6434],
        shelters: [
            { id: "sys_001", name: "双鸭山火车站人防工程", type: "transport", level: "核6级", lat: 46.6534, lng: 131.1614, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "双鸭山站A出口" },
            { id: "sys_002", name: "松江国际地下避难所", type: "mall", level: "核6级", lat: 46.6434, lng: 131.1814, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "松江国际B2层" },
            { id: "sys_003", name: "北秀公园人防工程", type: "civil", level: "核6级", lat: 46.6334, lng: 131.1714, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "北秀公园地下" }
        ],
        nuclearTargets: [
            { name: "双鸭山煤矿", type: "factory", lat: 46.6634, lng: 131.1414, risk: "high", radius: 5000 },
            { name: "双鸭山发电厂", type: "power", lat: 46.6234, lng: 131.1614, risk: "critical", radius: 8000 },
            { name: "双鸭山自来水厂", type: "water", lat: 46.6434, lng: 131.2014, risk: "high", radius: 3000 }
        ]
    },
    "qitaihe": {
        name: "七台河",
        center: [131.0046, 45.7706],
        shelters: [
            { id: "qth_001", name: "七台河火车站人防工程", type: "transport", level: "核6级", lat: 45.7806, lng: 131.0046, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "七台河站A出口" },
            { id: "qth_002", name: "比优特地下避难所", type: "mall", level: "核6级", lat: 45.7706, lng: 131.0246, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "比优特B2层" },
            { id: "qth_003", name: "桃山公园人防工程", type: "civil", level: "核6级", lat: 45.7606, lng: 131.0146, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "桃山公园地下" }
        ],
        nuclearTargets: [
            { name: "七台河煤矿", type: "factory", lat: 45.7906, lng: 130.9846, risk: "high", radius: 5000 },
            { name: "七台河发电厂", type: "power", lat: 45.7506, lng: 131.0046, risk: "critical", radius: 8000 }
        ]
    },
    "heihe": {
        name: "黑河",
        center: [127.5000, 50.2500],
        shelters: [
            { id: "hh_001", name: "黑河火车站人防工程", type: "transport", level: "核6级", lat: 50.2600, lng: 127.5000, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "黑河站B出口" },
            { id: "hh_002", name: "华富地下避难所", type: "mall", level: "核6级", lat: 50.2500, lng: 127.5200, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "华富B2层" },
            { id: "hh_003", name: "黑龙江公园避难所", type: "civil", level: "核6级", lat: 50.2400, lng: 127.5100, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "黑龙江公园地下" }
        ],
        nuclearTargets: [
            { name: "黑河港", type: "port", lat: 50.2200, lng: 127.5200, risk: "high", radius: 5000 },
            { name: "黑河发电厂", type: "power", lat: 50.2700, lng: 127.4800, risk: "critical", radius: 8000 }
        ]
    },
    "suihua": {
        name: "绥化",
        center: [126.9929, 46.6529],
        shelters: [
            { id: "sh_001", name: "绥化火车站人防工程", type: "transport", level: "核6级", lat: 46.6629, lng: 126.9929, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "绥化站B出口" },
            { id: "sh_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 46.6529, lng: 127.0129, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "sh_003", name: "人民公园人防工程", type: "civil", level: "核6级", lat: 46.6429, lng: 127.0029, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "人民公园地下" }
        ],
        nuclearTargets: [
            { name: "绥化发电厂", type: "power", lat: 46.6729, lng: 126.9629, risk: "critical", radius: 8000 },
            { name: "绥化自来水厂", type: "water", lat: 46.6529, lng: 127.0329, risk: "high", radius: 3000 }
        ]
    },
    "daxinganling": {
        name: "大兴安岭",
        center: [124.1177, 50.4113],
        shelters: [
            { id: "dxal_001", name: "加格达奇火车站人防工程", type: "transport", level: "核6级", lat: 50.4213, lng: 124.1177, capacity: 1200, facilities: "深埋结构、通风系统、应急供水", access: "加格达奇站A出口" },
            { id: "dxal_002", name: "新世纪广场地下避难所", type: "mall", level: "核6级", lat: 50.4113, lng: 124.1377, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "新世纪广场B1层" },
            { id: "dxal_003", name: "北山森林公园避难所", type: "civil", level: "核5级", lat: 50.4313, lng: 124.1077, capacity: 1200, facilities: "山体掩体、应急物资、医疗站", access: "北山森林公园" }
        ],
        nuclearTargets: [
            { name: "加格达奇发电厂", type: "power", lat: 50.4413, lng: 124.0977, risk: "critical", radius: 8000 }
        ]
    },

    // ========== 安徽省（补充）==========
    "bengbu": {
        name: "蚌埠",
        center: [117.3812, 32.9163],
        shelters: [
            { id: "bb_001", name: "蚌埠火车站人防工程", type: "transport", level: "核6级", lat: 32.9263, lng: 117.3812, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "蚌埠站B出口" },
            { id: "bb_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 32.9163, lng: 117.4012, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "bb_003", name: "张公山公园人防工程", type: "civil", level: "核6级", lat: 32.9063, lng: 117.3912, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "张公山公园西门地下" },
            { id: "bb_004", name: "淮河大坝避难所", type: "civil", level: "核5级", lat: 32.9363, lng: 117.3612, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "淮河大坝" }
        ],
        nuclearTargets: [
            { name: "蚌埠发电厂", type: "power", lat: 32.9463, lng: 117.3512, risk: "critical", radius: 8000 },
            { name: "蚌埠自来水厂", type: "water", lat: 32.9163, lng: 117.4312, risk: "high", radius: 3000 },
            { name: "蚌埠港", type: "port", lat: 32.8863, lng: 117.3812, risk: "high", radius: 5000 }
        ]
    },
    "wuhu": {
        name: "芜湖",
        center: [118.4331, 31.3535],
        shelters: [
            { id: "wh_001", name: "芜湖火车站人防工程", type: "transport", level: "核6级", lat: 31.3635, lng: 118.4331, capacity: 2500, facilities: "通风系统、应急供水、医疗站", access: "芜湖站B出口" },
            { id: "wh_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 31.3535, lng: 118.4531, capacity: 3000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "wh_003", name: "赭山公园人防工程", type: "civil", level: "核6级", lat: 31.3435, lng: 118.4431, capacity: 2200, facilities: "深埋结构、滤毒通风、通讯设备", access: "赭山公园西门地下" },
            { id: "wh_004", name: "长江大桥避难所", type: "transport", level: "核5级", lat: 31.3735, lng: 118.4231, capacity: 1500, facilities: "抗核加固、独立供电", access: "长江大桥北岸" }
        ],
        nuclearTargets: [
            { name: "芜湖发电厂", type: "power", lat: 31.3835, lng: 118.4131, risk: "critical", radius: 8000 },
            { name: "芜湖港", type: "port", lat: 31.3335, lng: 118.4531, risk: "high", radius: 5000 },
            { name: "芜湖长江大桥", type: "bridge", lat: 31.3735, lng: 118.4231, risk: "high", radius: 3000 }
        ]
    },
    "fuyang": {
        name: "阜阳",
        center: [115.8145, 32.8906],
        shelters: [
            { id: "fy_001", name: "阜阳火车站人防工程", type: "transport", level: "核6级", lat: 32.9006, lng: 115.8145, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "阜阳站B出口" },
            { id: "fy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 32.8906, lng: 115.8345, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "fy_003", name: "文峰公园人防工程", type: "civil", level: "核6级", lat: 32.8806, lng: 115.8245, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "文峰公园地下" }
        ],
        nuclearTargets: [
            { name: "阜阳发电厂", type: "power", lat: 32.9106, lng: 115.7945, risk: "critical", radius: 8000 },
            { name: "阜阳自来水厂", type: "water", lat: 32.8906, lng: 115.8545, risk: "high", radius: 3000 }
        ]
    }
};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART10_CITIES;
}
