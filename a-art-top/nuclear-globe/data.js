    "haikou": {
        name: "海口",
        center: [110.3492, 20.0440],
        shelters: [
            { id: "hk_001", name: "骑楼老街地下掩体", type: "government", level: "核5级", lat: 20.0434, lng: 110.3534, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "海口骑楼老街地下" },
            { id: "hk_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 20.0234, lng: 110.3434, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "海口站地下广场" },
            { id: "hk_003", name: "美兰地下避难所", type: "civil", level: "核6级", lat: 20.0234, lng: 110.4534, capacity: 5000, facilities: "机场周边、独立通风", access: "美兰机场附近" },
            { id: "hk_004", name: "龙华地下防护", type: "civil", level: "核6级", lat: 20.0334, lng: 110.3234, capacity: 3000, facilities: "主城区、密闭门", access: "龙华区人防工程" },
            { id: "hk_005", name: "秀英地下人防", type: "civil", level: "核6级", lat: 20.0134, lng: 110.2934, capacity: 2800, facilities: "港口区、滤毒通风", access: "秀英港地下" },
            { id: "hk_006", name: "琼山地下避难所", type: "civil", level: "核6级", lat: 20.0034, lng: 110.3534, capacity: 2600, facilities: "老城区、大型储水", access: "琼山区地下通道" },
            { id: "hk_007", name: "美兰机场地下人防", type: "transport", level: "核5级", lat: 20.0234, lng: 110.4534, capacity: 5000, facilities: "机场深层掩体", access: "美兰机场航站楼地下" }
        ],
        nuclearTargets: [
            { id: "hk_nt001", name: "海口电厂", type: "power", risk: "high", lat: 20.0534, lng: 110.4034, radius: 5000, description: "大型火力发电厂" },
            { id: "hk_nt002", name: "海口自来水厂", type: "water", risk: "high", lat: 20.0434, lng: 110.3334, radius: 3000, description: "主要供水厂" },
            { id: "hk_nt003", name: "海口港", type: "port", risk: "high", lat: 20.0234, lng: 110.2934, radius: 5000, description: "重要港口" },
            { id: "hk_nt004", name: "美兰国际机场", type: "transport", risk: "high", lat: 20.0234, lng: 110.4534, radius: 5000, description: "国际航空枢纽" },
            { id: "hk_nt005", name: "昌江核电站", type: "nuclear", risk: "critical", lat: 19.2834, lng: 108.6534, radius: 10000, description: "大型商用核电站（近邻）" }
        ]
    },

    "sanya": {
        name: "三亚",
        center: [109.5082, 18.2479],
        shelters: [
            { id: "sy_001", name: "解放路地下掩体", type: "government", level: "核5级", lat: 18.2534, lng: 109.5134, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "三亚解放路地下通道" },
            { id: "sy_002", name: "亚龙湾地下人防", type: "civil", level: "核6级", lat: 18.2834, lng: 109.6034, capacity: 2800, facilities: "旅游区、深埋结构", access: "亚龙湾度假区地下" },
            { id: "sy_003", name: "海棠湾地下避难所", type: "civil", level: "核6级", lat: 18.3534, lng: 109.7534, capacity: 3200, facilities: "度假区、独立供电", access: "海棠湾地下" },
            { id: "sy_004", name: "凤凰机场地下人防", type: "transport", level: "核5级", lat: 18.3034, lng: 109.4134, capacity: 4500, facilities: "机场深层掩体", access: "凤凰机场航站楼地下" },
            { id: "sy_005", name: "大东海地下避难所", type: "civil", level: "核6级", lat: 18.2234, lng: 109.5234, capacity: 2500, facilities: "海滩区、密闭门", access: "大东海地下" },
            { id: "sy_006", name: "崖州地下防护", type: "civil", level: "核6级", lat: 18.3534, lng: 109.1834, capacity: 2400, facilities: "科技城、滤毒通风", access: "崖州区地下" },
            { id: "sy_007", name: "吉阳地下人防", type: "civil", level: "核6级", lat: 18.2834, lng: 109.5934, capacity: 2600, facilities: "新城区、大型储水", access: "吉阳区地下" }
        ],
        nuclearTargets: [
            { id: "sy_nt001", name: "三亚电厂", type: "power", risk: "high", lat: 18.2134, lng: 109.4334, radius: 5000, description: "大型火力发电厂" },
            { id: "sy_nt002", name: "三亚自来水厂", type: "water", risk: "high", lat: 18.2634, lng: 109.5034, radius: 3000, description: "主要供水厂" },
            { id: "sy_nt003", name: "凤凰国际机场", type: "transport", risk: "high", lat: 18.3034, lng: 109.4134, radius: 5000, description: "国际航空枢纽" }
        ]
    },

    "lasa": {
        name: "拉萨",
        center: [91.1409, 29.6456],
        shelters: [
            { id: "ls_001", name: "布达拉宫地下掩体", type: "government", level: "核5级", lat: 29.6634, lng: 91.1234, capacity: 3000, facilities: "地标区、深埋20米、三防系统", access: "布达拉宫广场地下" },
            { id: "ls_002", name: "八廓街地下人防", type: "civil", level: "核6级", lat: 29.6534, lng: 91.1434, capacity: 2800, facilities: "历史街区、深埋结构", access: "八廓街地下通道" },
            { id: "ls_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.6234, lng: 91.0734, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "拉萨站地下广场" },
            { id: "ls_004", name: "城关地下防护", type: "civil", level: "核6级", lat: 29.6534, lng: 91.1334, capacity: 2600, facilities: "主城区、密闭门", access: "城关区人防工程" },
            { id: "ls_005", name: "堆龙德庆地下人防", type: "civil", level: "核6级", lat: 29.6534, lng: 91.0034, capacity: 2400, facilities: "工业区、滤毒通风", access: "堆龙德庆区地下" },
            { id: "ls_006", name: "达孜地下避难所", type: "civil", level: "核6级", lat: 29.6834, lng: 91.3534, capacity: 2200, facilities: "郊区、大型储水", access: "达孜区地下" },
            { id: "ls_007", name: "贡嘎机场地下人防", type: "transport", level: "核5级", lat: 29.2934, lng: 90.9134, capacity: 3500, facilities: "机场深层掩体", access: "贡嘎机场航站楼地下" }
        ],
        nuclearTargets: [
            { id: "ls_nt001", name: "拉萨电厂", type: "power", risk: "high", lat: 29.6834, lng: 91.2034, radius: 5000, description: "高原火力发电厂" },
            { id: "ls_nt002", name: "拉萨自来水厂", type: "water", risk: "high", lat: 29.6634, lng: 91.1534, radius: 3000, description: "主要供水厂" },
            { id: "ls_nt003", name: "贡嘎国际机场", type: "transport", risk: "high", lat: 29.2934, lng: 90.9134, radius: 5000, description: "高原航空枢纽" },
            { id: "ls_nt004", name: "青藏铁路拉萨大桥", type: "bridge", risk: "medium", lat: 29.6334, lng: 91.0734, radius: 2000, description: "战略桥梁" }
        ]
    },

    "huhehaote": {
        name: "呼和浩特",
        center: [111.7492, 40.8426],
        shelters: [
            { id: "hhht_001", name: "新华大街地下掩体", type: "government", level: "核5级", lat: 40.8534, lng: 111.7534, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "呼和浩特新华大街地下" },
            { id: "hhht_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 40.8534, lng: 111.6834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "呼和浩特站地下广场" },
            { id: "hhht_003", name: "东站地下避难所", type: "transport", level: "核5级", lat: 40.8434, lng: 111.8234, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "呼和浩特东站地下" },
            { id: "hhht_004", name: "新城地下防护", type: "civil", level: "核6级", lat: 40.8634, lng: 111.7634, capacity: 3200, facilities: "主城区、密闭门", access: "新城区人防工程" },
            { id: "hhht_005", name: "回民地下人防", type: "civil", level: "核6级", lat: 40.8334, lng: 111.7134, capacity: 3000, facilities: "老城区、滤毒通风", access: "回民区地下通道" },
            { id: "hhht_006", name: "玉泉地下避难所", type: "civil", level: "核6级", lat: 40.8134, lng: 111.6734, capacity: 2800, facilities: "旅游区、大型储水", access: "玉泉区地下" },
            { id: "hhht_007", name: "赛罕地下防护", type: "civil", level: "核6级", lat: 40.8034, lng: 111.8034, capacity: 2600, facilities: "新区、应急照明", access: "赛罕区地下" },
            { id: "hhht_008", name: "白塔机场地下人防", type: "transport", level: "核5级", lat: 40.8534, lng: 111.8334, capacity: 4500, facilities: "机场深层掩体", access: "白塔机场航站楼地下" }
        ],
        nuclearTargets: [
            { id: "hhht_nt001", name: "呼和浩特电厂", type: "power", risk: "high", lat: 40.9034, lng: 111.7534, radius: 5000, description: "大型火力发电厂" },
            { id: "hhht_nt002", name: "呼和浩特自来水厂", type: "water", risk: "high", lat: 40.8634, lng: 111.7334, radius: 3000, description: "主要供水厂" },
            { id: "hhht_nt003", name: "呼和浩特炼油厂", type: "chemical", risk: "high", lat: 40.8234, lng: 111.7034, radius: 8000, description: "大型炼油基地" },
            { id: "hhht_nt004", name: "白塔国际机场", type: "transport", risk: "high", lat: 40.8534, lng: 111.8334, radius: 5000, description: "区域航空枢纽" }
        ]
    },

