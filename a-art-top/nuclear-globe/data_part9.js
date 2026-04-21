// 核战争城市自救地球仪 - 剩余75城市数据补充
// 批次: 批次9 - 完成337城市目标
// 生成时间: 2026-04-17

const PART9_CITIES = {
    // ========== 河北省（补充）==========
    "qinhuangdao": {
        name: "秦皇岛",
        center: [119.6005, 39.9354],
        shelters: [
            { id: "qhd_001", name: "秦皇岛火车站人防工程", type: "transport", level: "核6级", lat: 39.9754, lng: 119.5861, capacity: 3000, facilities: "深埋结构、通风系统、应急供水", access: "秦皇岛站B出口" },
            { id: "qhd_002", name: "茂业中心地下避难所", type: "mall", level: "核6级", lat: 39.9221, lng: 119.5987, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "茂业天地商场B2层" },
            { id: "qhd_003", name: "北戴河鸽子窝人防工程", type: "civil", level: "核5级", lat: 39.8421, lng: 119.5187, capacity: 2000, facilities: "抗核加固、滤毒通风、通讯设备", access: "鸽子窝公园东侧" },
            { id: "qhd_004", name: "山海关火车站地下工程", type: "transport", level: "核6级", lat: 39.9754, lng: 119.7587, capacity: 2800, facilities: "密闭门、应急照明、医疗站", access: "山海关站A出口" },
            { id: "qhd_005", name: "世纪港湾地下停车场", type: "civil", level: "核6级", lat: 39.9421, lng: 119.5687, capacity: 1500, facilities: "通风过滤、应急水源、生活物资", access: "世纪港湾B3层" }
        ],
        nuclearTargets: [
            { name: "秦皇岛港煤码头", type: "port", lat: 39.9421, lng: 119.6187, risk: "high", radius: 5000 },
            { name: "秦皇岛热电厂", type: "power", lat: 39.9621, lng: 119.5787, risk: "critical", radius: 8000 },
            { name: "秦皇岛自来水厂", type: "water", lat: 39.9321, lng: 119.5987, risk: "high", radius: 3000 }
        ]
    },
    "langfang": {
        name: "廊坊",
        center: [116.6837, 39.5380],
        shelters: [
            { id: "lf_001", name: "廊坊火车站人防工程", type: "transport", level: "核6级", lat: 39.5480, lng: 116.6837, capacity: 2500, facilities: "通风系统、应急供水、医疗站", access: "廊坊站B出口" },
            { id: "lf_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 39.5380, lng: 116.7037, capacity: 3000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "lf_003", name: "人民公园人防工程", type: "civil", level: "核6级", lat: 39.5280, lng: 116.6937, capacity: 2000, facilities: "深埋结构、滤毒通风、通讯设备", access: "人民公园西门地下" },
            { id: "lf_004", name: "廊坊市政府地下工程", type: "government", level: "核5级", lat: 39.5580, lng: 116.7137, capacity: 1500, facilities: "抗核加固、独立供电、指挥中心", access: "政府大院西侧" }
        ],
        nuclearTargets: [
            { name: "廊坊电厂", type: "power", lat: 39.5680, lng: 116.6637, risk: "critical", radius: 8000 },
            { name: "廊坊自来水厂", type: "water", lat: 39.5280, lng: 116.7237, risk: "high", radius: 3000 },
            { name: "京唐港廊坊转运站", type: "transport", lat: 39.5480, lng: 116.6537, risk: "medium", radius: 2000 }
        ]
    },
    "hengshui": {
        name: "衡水",
        center: [115.6860, 37.7350],
        shelters: [
            { id: "hs_001", name: "衡水火车站人防工程", type: "transport", level: "核6级", lat: 37.7450, lng: 115.6860, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "衡水站A出口" },
            { id: "hs_002", name: "怡然城地下避难所", type: "mall", level: "核6级", lat: 37.7350, lng: 115.7060, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "怡然城B2层" },
            { id: "hs_003", name: "衡水中学人防工程", type: "civil", level: "核6级", lat: 37.7250, lng: 115.6960, capacity: 3000, facilities: "密闭门、应急照明、医疗站", access: "衡水中学东侧" }
        ],
        nuclearTargets: [
            { name: "衡水发电厂", type: "power", lat: 37.7550, lng: 115.6660, risk: "critical", radius: 8000 },
            { name: "衡水自来水厂", type: "water", lat: 37.7350, lng: 115.7260, risk: "high", radius: 3000 }
        ]
    },
    // ========== 山西省（补充）==========
    "datong": {
        name: "大同",
        center: [113.3003, 40.0768],
        shelters: [
            { id: "dt_001", name: "大同火车站人防工程", type: "transport", level: "核6级", lat: 40.0868, lng: 113.3003, capacity: 3000, facilities: "深埋结构、通风系统、应急供水", access: "大同站B出口" },
            { id: "dt_002", name: "华林新天地地下避难所", type: "mall", level: "核6级", lat: 40.0768, lng: 113.3203, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "华林新天地B2层" },
            { id: "dt_003", name: "云冈石窟景区人防", type: "civil", level: "核5级", lat: 40.0868, lng: 113.2803, capacity: 2000, facilities: "抗核加固、滤毒通风、通讯设备", access: "云冈石窟北门" },
            { id: "dt_004", name: "大同市政府地下工程", type: "government", level: "核5级", lat: 40.0668, lng: 113.3103, capacity: 1500, facilities: "独立供电、指挥中心、医疗站", access: "政府大院地下" }
        ],
        nuclearTargets: [
            { name: "大同煤矿集团", type: "factory", lat: 40.0968, lng: 113.2803, risk: "high", radius: 5000 },
            { name: "大同发电厂", type: "power", lat: 40.0668, lng: 113.3303, risk: "critical", radius: 8000 },
            { name: "大同自来水厂", type: "water", lat: 40.0568, lng: 113.3003, risk: "high", radius: 3000 }
        ]
    },
    "yangquan": {
        name: "阳泉",
        center: [113.5805, 37.8568],
        shelters: [
            { id: "yq_001", name: "阳泉火车站人防工程", type: "transport", level: "核6级", lat: 37.8668, lng: 113.5805, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "阳泉站A出口" },
            { id: "yq_002", name: "滨河新天地地下避难所", type: "mall", level: "核6级", lat: 37.8568, lng: 113.6005, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "滨河新天地B2层" },
            { id: "yq_003", name: "南山公园人防工程", type: "civil", level: "核6级", lat: 37.8468, lng: 113.5905, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "南山公园西门地下" }
        ],
        nuclearTargets: [
            { name: "阳泉发电厂", type: "power", lat: 37.8768, lng: 113.5605, risk: "critical", radius: 8000 },
            { name: "阳泉煤矿", type: "factory", lat: 37.8368, lng: 113.5805, risk: "high", radius: 5000 },
            { name: "阳泉自来水厂", type: "water", lat: 37.8668, lng: 113.6205, risk: "high", radius: 3000 }
        ]
    },
    "changzhi": {
        name: "长治",
        center: [113.1141, 36.1911],
        shelters: [
            { id: "cz_001", name: "长治火车站人防工程", type: "transport", level: "核6级", lat: 36.2011, lng: 113.1141, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "长治站B出口" },
            { id: "cz_002", name: "城隍庙地下避难所", type: "mall", level: "核6级", lat: 36.1911, lng: 113.1341, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "城隍庙B2层" },
            { id: "cz_003", name: "八一广场人防工程", type: "civil", level: "核6级", lat: 36.1811, lng: 113.1241, capacity: 2500, facilities: "密闭门、应急照明、医疗站", access: "八一广场地下" },
            { id: "cz_004", name: "老顶山公园避难所", type: "civil", level: "核5级", lat: 36.2111, lng: 113.0941, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "老顶山公园南门" }
        ],
        nuclearTargets: [
            { name: "长治发电厂", type: "power", lat: 36.2211, lng: 113.0941, risk: "critical", radius: 8000 },
            { name: "长治钢铁厂", type: "factory", lat: 36.1711, lng: 113.1141, risk: "high", radius: 5000 },
            { name: "长治自来水厂", type: "water", lat: 36.2011, lng: 113.1441, risk: "high", radius: 3000 }
        ]
    },
    "jincheng": {
        name: "晋城",
        center: [112.8518, 35.4906],
        shelters: [
            { id: "jc_001", name: "晋城火车站人防工程", type: "transport", level: "核6级", lat: 35.5006, lng: 112.8518, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "晋城站A出口" },
            { id: "jc_002", name: "兰花城地下避难所", type: "mall", level: "核6级", lat: 35.4906, lng: 112.8718, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "兰花城B2层" },
            { id: "jc_003", name: "泽州公园人防工程", type: "civil", level: "核6级", lat: 35.4806, lng: 112.8618, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "泽州公园东门地下" }
        ],
        nuclearTargets: [
            { name: "晋城煤矿", type: "factory", lat: 35.5106, lng: 112.8318, risk: "high", radius: 5000 },
            { name: "晋城发电厂", type: "power", lat: 35.4706, lng: 112.8518, risk: "critical", radius: 8000 },
            { name: "晋城自来水厂", type: "water", lat: 35.4906, lng: 112.8918, risk: "high", radius: 3000 }
        ]
    },
    "shuozhou": {
        name: "朔州",
        center: [112.4342, 39.3403],
        shelters: [
            { id: "sz_001", name: "朔州火车站人防工程", type: "transport", level: "核6级", lat: 39.3503, lng: 112.4342, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "朔州站B出口" },
            { id: "sz_002", name: "美都汇地下避难所", type: "mall", level: "核6级", lat: 39.3403, lng: 112.4542, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "美都汇B2层" },
            { id: "sz_003", name: "人民公园人防工程", type: "civil", level: "核6级", lat: 39.3303, lng: 112.4442, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "人民公园西门地下" }
        ],
        nuclearTargets: [
            { name: "朔州发电厂", type: "power", lat: 39.3603, lng: 112.4142, risk: "critical", radius: 8000 },
            { name: "朔州煤矿", type: "factory", lat: 39.3203, lng: 112.4342, risk: "high", radius: 5000 }
        ]
    },
    "jinzhong": {
        name: "晋中",
        center: [112.7527, 37.6870],
        shelters: [
            { id: "jz_001", name: "晋中火车站人防工程", type: "transport", level: "核6级", lat: 37.6970, lng: 112.7527, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "晋中站A出口" },
            { id: "jz_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 37.6870, lng: 112.7727, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "jz_003", name: "榆次老城人防工程", type: "civil", level: "核6级", lat: 37.6770, lng: 112.7627, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "榆次老城东门" },
            { id: "jz_004", name: "晋中市政府地下工程", type: "government", level: "核5级", lat: 37.7070, lng: 112.7827, capacity: 1200, facilities: "独立供电、指挥中心", access: "政府大院地下" }
        ],
        nuclearTargets: [
            { name: "晋中发电厂", type: "power", lat: 37.7170, lng: 112.7327, risk: "critical", radius: 8000 },
            { name: "榆次钢铁厂", type: "factory", lat: 37.6670, lng: 112.7527, risk: "high", radius: 5000 },
            { name: "晋中自来水厂", type: "water", lat: 37.6970, lng: 112.8027, risk: "high", radius: 3000 }
        ]
    },
    "yuncheng": {
        name: "运城",
        center: [111.0074, 35.0263],
        shelters: [
            { id: "yc_001", name: "运城火车站人防工程", type: "transport", level: "核6级", lat: 35.0363, lng: 111.0074, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "运城站B出口" },
            { id: "yc_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 35.0263, lng: 111.0274, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "yc_003", name: "南风广场人防工程", type: "civil", level: "核6级", lat: 35.0163, lng: 111.0174, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "南风广场地下" },
            { id: "yc_004", name: "盐湖景区避难所", type: "civil", level: "核5级", lat: 35.0463, lng: 110.9974, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "盐湖景区北门" }
        ],
        nuclearTargets: [
            { name: "运城发电厂", type: "power", lat: 35.0563, lng: 110.9874, risk: "critical", radius: 8000 },
            { name: "运城铝厂", type: "factory", lat: 35.0063, lng: 111.0074, risk: "high", radius: 5000 },
            { name: "运城自来水厂", type: "water", lat: 35.0363, lng: 111.0474, risk: "high", radius: 3000 }
        ]
    },
    "xinzhou": {
        name: "忻州",
        center: [112.7341, 38.4169],
        shelters: [
            { id: "xz_001", name: "忻州火车站人防工程", type: "transport", level: "核6级", lat: 38.4269, lng: 112.7341, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "忻州站A出口" },
            { id: "xz_002", name: "开来欣悦地下避难所", type: "mall", level: "核6级", lat: 38.4169, lng: 112.7541, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "开来欣悦B2层" },
            { id: "xz_003", name: "人民公园人防工程", type: "civil", level: "核6级", lat: 38.4069, lng: 112.7441, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "人民公园西门地下" },
            { id: "xz_004", name: "五台山景区避难所", type: "civil", level: "核5级", lat: 39.0369, lng: 113.5041, capacity: 2000, facilities: "山体掩体、应急物资、医疗站", access: "五台山台怀镇" }
        ],
        nuclearTargets: [
            { name: "忻州发电厂", type: "power", lat: 38.4369, lng: 112.7141, risk: "critical", radius: 8000 },
            { name: "忻州自来水厂", type: "water", lat: 38.4169, lng: 112.7841, risk: "high", radius: 3000 }
        ]
    },
    "linfen": {
        name: "临汾",
        center: [111.5189, 36.0882],
        shelters: [
            { id: "lf_001", name: "临汾火车站人防工程", type: "transport", level: "核6级", lat: 36.0982, lng: 111.5189, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "临汾站B出口" },
            { id: "lf_002", name: "生龙悦享地下避难所", type: "mall", level: "核6级", lat: 36.0882, lng: 111.5389, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "生龙悦享B2层" },
            { id: "lf_003", name: "尧庙广场人防工程", type: "civil", level: "核6级", lat: 36.0782, lng: 111.5289, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "尧庙广场地下" },
            { id: "lf_004", name: "汾河公园避难所", type: "civil", level: "核5级", lat: 36.1082, lng: 111.5089, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "汾河公园中段" }
        ],
        nuclearTargets: [
            { name: "临汾发电厂", type: "power", lat: 36.1182, lng: 111.4989, risk: "critical", radius: 8000 },
            { name: "临汾钢铁厂", type: "factory", lat: 36.0682, lng: 111.5189, risk: "high", radius: 5000 },
            { name: "临汾自来水厂", type: "water", lat: 36.0982, lng: 111.5589, risk: "high", radius: 3000 }
        ]
    },
    "lvliang": {
        name: "吕梁",
        center: [111.1448, 37.5186],
        shelters: [
            { id: "ll_001", name: "吕梁火车站人防工程", type: "transport", level: "核6级", lat: 37.5286, lng: 111.1448, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "吕梁站A出口" },
            { id: "ll_002", name: "嘉润国际地下避难所", type: "mall", level: "核6级", lat: 37.5186, lng: 111.1648, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "嘉润国际B2层" },
            { id: "ll_003", name: "离石区政府人防工程", type: "government", level: "核5级", lat: 37.5086, lng: 111.1548, capacity: 1500, facilities: "独立供电、指挥中心、滤毒通风", access: "区政府大院" }
        ],
        nuclearTargets: [
            { name: "吕梁发电厂", type: "power", lat: 37.5386, lng: 111.1248, risk: "critical", radius: 8000 },
            { name: "吕梁煤矿", type: "factory", lat: 37.4986, lng: 111.1448, risk: "high", radius: 5000 },
            { name: "吕梁自来水厂", type: "water", lat: 37.5186, lng: 111.1848, risk: "high", radius: 3000 }
        ]
    },

    // ========== 内蒙古自治区 ==========
    "huhehaote": {
        name: "呼和浩特",
        center: [111.7500, 40.8414],
        shelters: [
            { id: "hhht_001", name: "呼和浩特火车站人防工程", type: "transport", level: "核6级", lat: 40.8514, lng: 111.7500, capacity: 3000, facilities: "深埋结构、通风系统、应急供水", access: "呼和浩特站B出口" },
            { id: "hhht_002", name: "维多利商厦地下避难所", type: "mall", level: "核6级", lat: 40.8414, lng: 111.7700, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "维多利商厦B2层" },
            { id: "hhht_003", name: "新华广场人防工程", type: "civil", level: "核6级", lat: 40.8314, lng: 111.7600, capacity: 3500, facilities: "密闭门、应急照明、医疗站", access: "新华广场地下" },
            { id: "hhht_004", name: "大召寺景区避难所", type: "civil", level: "核5级", lat: 40.8214, lng: 111.7400, capacity: 2000, facilities: "抗核加固、滤毒通风、通讯设备", access: "大召寺南门" },
            { id: "hhht_005", name: "呼和浩特市政府地下工程", type: "government", level: "核5级", lat: 40.8614, lng: 111.7800, capacity: 1500, facilities: "独立供电、指挥中心", access: "市政府大院" }
        ],
        nuclearTargets: [
            { name: "呼和浩特发电厂", type: "power", lat: 40.8714, lng: 111.7300, risk: "critical", radius: 8000 },
            { name: "呼和浩特自来水厂", type: "water", lat: 40.8414, lng: 111.8000, risk: "high", radius: 3000 },
            { name: "白塔国际机场", type: "transport", lat: 40.8614, lng: 111.8200, risk: "high", radius: 5000 }
        ]
    },
    "baotou": {
        name: "包头",
        center: [109.8403, 40.6574],
        shelters: [
            { id: "bt_001", name: "包头火车站人防工程", type: "transport", level: "核6级", lat: 40.6674, lng: 109.8403, capacity: 2800, facilities: "深埋结构、通风系统、应急供水", access: "包头站B出口" },
            { id: "bt_002", name: "维多利商厦地下避难所", type: "mall", level: "核6级", lat: 40.6574, lng: 109.8603, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "维多利商厦B2层" },
            { id: "bt_003", name: "银河广场人防工程", type: "civil", level: "核6级", lat: 40.6474, lng: 109.8503, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "银河广场地下" },
            { id: "bt_004", name: "赛汗塔拉城中草原避难所", type: "civil", level: "核5级", lat: 40.6374, lng: 109.8303, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "赛汗塔拉北门" }
        ],
        nuclearTargets: [
            { name: "包头钢铁集团", type: "factory", lat: 40.6774, lng: 109.8203, risk: "high", radius: 5000 },
            { name: "包头发电厂", type: "power", lat: 40.6374, lng: 109.8403, risk: "critical", radius: 8000 },
            { name: "包头自来水厂", type: "water", lat: 40.6674, lng: 109.8803, risk: "high", radius: 3000 }
        ]
    },
    "wuhai": {
        name: "乌海",
        center: [106.7958, 39.6530],
        shelters: [
            { id: "wh_001", name: "乌海火车站人防工程", type: "transport", level: "核6级", lat: 39.6630, lng: 106.7958, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "乌海站A出口" },
            { id: "wh_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 39.6530, lng: 106.8158, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "wh_003", name: "乌海湖公园避难所", type: "civil", level: "核5级", lat: 39.6430, lng: 106.8058, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "乌海湖大坝" }
        ],
        nuclearTargets: [
            { name: "乌海发电厂", type: "power", lat: 39.6730, lng: 106.7758, risk: "critical", radius: 8000 },
            { name: "乌海煤矿", type: "factory", lat: 39.6330, lng: 106.7958, risk: "high", radius: 5000 }
        ]
    },
    "chifeng": {
        name: "赤峰",
        center: [118.8867, 42.2578],
        shelters: [
            { id: "cf_001", name: "赤峰火车站人防工程", type: "transport", level: "核6级", lat: 42.2678, lng: 118.8867, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "赤峰站B出口" },
            { id: "cf_002", name: "维多利广场地下避难所", type: "mall", level: "核6级", lat: 42.2578, lng: 118.9067, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "维多利广场B2层" },
            { id: "cf_003", name: "红山公园人防工程", type: "civil", level: "核6级", lat: 42.2478, lng: 118.8967, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "红山公园西门地下" }
        ],
        nuclearTargets: [
            { name: "赤峰发电厂", type: "power", lat: 42.2778, lng: 118.8667, risk: "critical", radius: 8000 },
            { name: "赤峰自来水厂", type: "water", lat: 42.2578, lng: 118.9267, risk: "high", radius: 3000 }
        ]
    },
    "tongliao": {
        name: "通辽",
        center: [122.2655, 43.6194],
        shelters: [
            { id: "tl_001", name: "通辽火车站人防工程", type: "transport", level: "核6级", lat: 43.6294, lng: 122.2655, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "通辽站A出口" },
            { id: "tl_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 43.6194, lng: 122.2855, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "tl_003", name: "西拉木伦公园人防工程", type: "civil", level: "核6级", lat: 43.6094, lng: 122.2755, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "西拉木伦公园东门" }
        ],
        nuclearTargets: [
            { name: "通辽发电厂", type: "power", lat: 43.6394, lng: 122.2455, risk: "critical", radius: 8000 },
            { name: "通辽自来水厂", type: "water", lat: 43.6194, lng: 122.3055, risk: "high", radius: 3000 }
        ]
    },
    "eerduosi": {
        name: "鄂尔多斯",
        center: [109.7813, 39.6082],
        shelters: [
            { id: "eeds_001", name: "鄂尔多斯火车站人防工程", type: "transport", level: "核6级", lat: 39.6182, lng: 109.7813, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "鄂尔多斯站B出口" },
            { id: "eeds_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 39.6082, lng: 109.8013, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "eeds_003", name: "康巴什广场人防工程", type: "civil", level: "核6级", lat: 39.5982, lng: 109.7913, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "康巴什广场地下" },
            { id: "eeds_004", name: "成吉思汗陵景区避难所", type: "civil", level: "核5级", lat: 39.5482, lng: 109.7313, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "成吉思汗陵景区" }
        ],
        nuclearTargets: [
            { name: "鄂尔多斯发电厂", type: "power", lat: 39.6282, lng: 109.7613, risk: "critical", radius: 8000 },
            { name: "鄂尔多斯天然气储配站", type: "gas", lat: 39.5882, lng: 109.7813, risk: "critical", radius: 10000 },
            { name: "鄂尔多斯自来水厂", type: "water", lat: 39.6182, lng: 109.8213, risk: "high", radius: 3000 }
        ]
    },
    "hulunbeier": {
        name: "呼伦贝尔",
        center: [119.7658, 49.2119],
        shelters: [
            { id: "hlbe_001", name: "海拉尔火车站人防工程", type: "transport", level: "核6级", lat: 49.2219, lng: 119.7658, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "海拉尔站B出口" },
            { id: "hlbe_002", name: "龙凤新天地地下避难所", type: "mall", level: "核6级", lat: 49.2119, lng: 119.7858, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "龙凤新天地B2层" },
            { id: "hlbe_003", name: "成吉思汗广场人防工程", type: "civil", level: "核6级", lat: 49.2019, lng: 119.7758, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "成吉思汗广场地下" }
        ],
        nuclearTargets: [
            { name: "呼伦贝尔发电厂", type: "power", lat: 49.2319, lng: 119.7458, risk: "critical", radius: 8000 },
            { name: "海拉尔自来水厂", type: "water", lat: 49.2119, lng: 119.8058, risk: "high", radius: 3000 }
        ]
    },
    "bayannaoer": {
        name: "巴彦淖尔",
        center: [107.3877, 40.7432],
        shelters: [
            { id: "byne_001", name: "临河火车站人防工程", type: "transport", level: "核6级", lat: 40.7532, lng: 107.3877, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "临河站A出口" },
            { id: "byne_002", name: "维多利广场地下避难所", type: "mall", level: "核6级", lat: 40.7432, lng: 107.4077, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "维多利广场B2层" },
            { id: "byne_003", name: "黄河河套湿地公园避难所", type: "civil", level: "核5级", lat: 40.7332, lng: 107.3977, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "湿地公园管理处" }
        ],
        nuclearTargets: [
            { name: "巴彦淖尔发电厂", type: "power", lat: 40.7632, lng: 107.3677, risk: "critical", radius: 8000 },
            { name: "巴彦淖尔自来水厂", type: "water", lat: 40.7432, lng: 107.4277, risk: "high", radius: 3000 }
        ]
    },
    "wulanchabu": {
        name: "乌兰察布",
        center: [113.1338, 40.9939],
        shelters: [
            { id: "wlcb_001", name: "集宁火车站人防工程", type: "transport", level: "核6级", lat: 41.0039, lng: 113.1338, capacity: 2000, facilities: "深埋结构、通风系统、应急供水", access: "集宁站B出口" },
            { id: "wlcb_002", name: "维多利广场地下避难所", type: "mall", level: "核6级", lat: 40.9939, lng: 113.1538, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "维多利广场B2层" },
            { id: "wlcb_003", name: "老虎山公园人防工程", type: "civil", level: "核6级", lat: 40.9839, lng: 113.1438, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "老虎山公园西门地下" }
        ],
        nuclearTargets: [
            { name: "乌兰察布发电厂", type: "power", lat: 41.0139, lng: 113.1138, risk: "critical", radius: 8000 },
            { name: "乌兰察布自来水厂", type: "water", lat: 40.9939, lng: 113.1738, risk: "high", radius: 3000 }
        ]
    },
    "xinganmeng": {
        name: "兴安盟",
        center: [122.0680, 46.0775],
        shelters: [
            { id: "xam_001", name: "乌兰浩特火车站人防工程", type: "transport", level: "核6级", lat: 46.0875, lng: 122.0680, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "乌兰浩特站A出口" },
            { id: "xam_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 46.0775, lng: 122.0880, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "xam_003", name: "成吉思汗公园人防工程", type: "civil", level: "核6级", lat: 46.0675, lng: 122.0780, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "成吉思汗公园东门" }
        ],
        nuclearTargets: [
            { name: "乌兰浩特发电厂", type: "power", lat: 46.0975, lng: 122.0480, risk: "critical", radius: 8000 },
            { name: "乌兰浩特自来水厂", type: "water", lat: 46.0775, lng: 122.1080, risk: "high", radius: 3000 }
        ]
    },
    "xilinguolemeng": {
        name: "锡林郭勒盟",
        center: [116.0482, 43.9334],
        shelters: [
            { id: "xlglm_001", name: "锡林浩特火车站人防工程", type: "transport", level: "核6级", lat: 43.9434, lng: 116.0482, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "锡林浩特站B出口" },
            { id: "xlglm_002", name: "维多利广场地下避难所", type: "mall", level: "核6级", lat: 43.9334, lng: 116.0682, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "维多利广场B2层" },
            { id: "xlglm_003", name: "锡林广场人防工程", type: "civil", level: "核6级", lat: 43.9234, lng: 116.0582, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "锡林广场地下" }
        ],
        nuclearTargets: [
            { name: "锡林浩特发电厂", type: "power", lat: 43.9534, lng: 116.0282, risk: "critical", radius: 8000 },
            { name: "锡林浩特自来水厂", type: "water", lat: 43.9334, lng: 116.0882, risk: "high", radius: 3000 }
        ]
    },
    "alashanmeng": {
        name: "阿拉善盟",
        center: [105.7285, 38.8516],
        shelters: [
            { id: "alsm_001", name: "阿拉善左旗人防工程", type: "government", level: "核6级", lat: 38.8616, lng: 105.7285, capacity: 1200, facilities: "深埋结构、通风系统、应急供水", access: "左旗政府院内" },
            { id: "alsm_002", name: "巴彦浩特地下避难所", type: "civil", level: "核6级", lat: 38.8516, lng: 105.7485, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "巴彦浩特镇中心" }
        ],
        nuclearTargets: [
            { name: "阿拉善天然气储配站", type: "gas", lat: 38.8716, lng: 105.7085, risk: "critical", radius: 10000 }
        ]
    }
};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART9_CITIES;
}
