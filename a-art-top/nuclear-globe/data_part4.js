// ============================================
// 核战争城市自救地球仪 - 数据批次4：黑龙江12个城市 + 安徽16个城市
// ============================================

const PART4_CITIES = {
    // ========== 黑龙江省12个城市 ==========
    "qiqihaer": {
        name: "齐齐哈尔",
        center: [123.9182, 47.3543],
        shelters: [
            { id: "qqhe_001", name: "中环广场地下掩体", type: "government", level: "核5级", lat: 47.3543, lng: 123.9182, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交中环广场站" },
            { id: "qqhe_002", name: "龙沙公园地下人防", type: "civil", level: "核6级", lat: 47.3743, lng: 123.9282, capacity: 3000, facilities: "公园区、独立通风", access: "公交龙沙公园站" },
            { id: "qqhe_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 47.3343, lng: 123.9382, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "齐齐哈尔站地下通道" },
            { id: "qqhe_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 47.3043, lng: 123.9782, capacity: 4000, facilities: "高铁站、深掩体", access: "齐齐哈尔南站地下通道" },
            { id: "qqhe_005", name: "富拉尔基地下人防", type: "civil", level: "核6级", lat: 47.2043, lng: 123.6282, capacity: 3200, facilities: "工矿区、密闭门", access: "富拉尔基公交直达" },
            { id: "qqhe_006", name: "昂昂溪地下避难所", type: "civil", level: "核6级", lat: 47.1543, lng: 123.8182, capacity: 2600, facilities: "历史区、大型储水", access: "昂昂溪公交直达" }
        ],
        nuclearTargets: [
            { id: "qqhe_nt001", name: "齐齐哈尔热电厂", type: "power", risk: "high", lat: 47.3743, lng: 123.9482, radius: 5000, description: "大型热电厂" },
            { id: "qqhe_nt002", name: "第一重型机械厂", type: "factory", risk: "high", lat: 47.2243, lng: 123.6582, radius: 6000, description: "大型重工企业" },
            { id: "qqhe_nt003", name: "富拉尔基钢厂", type: "factory", risk: "high", lat: 47.1943, lng: 123.5982, radius: 6000, description: "大型钢铁企业" }
        ]
    },
    "mudanjiang": {
        name: "牡丹江",
        center: [129.6186, 44.5827],
        shelters: [
            { id: "mdj_001", name: "文化广场地下掩体", type: "government", level: "核5级", lat: 44.5827, lng: 129.6186, capacity: 3200, facilities: "市中心、深埋18米、三防系统", access: "公交文化广场站" },
            { id: "mdj_002", name: "北山公园地下人防", type: "civil", level: "核6级", lat: 44.6027, lng: 129.6286, capacity: 2800, facilities: "公园区、独立通风", access: "公交北山公园站" },
            { id: "mdj_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 44.5627, lng: 129.6386, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "牡丹江站地下通道" },
            { id: "mdj_004", name: "镜泊湖地下防护", type: "civil", level: "核6级", lat: 43.9127, lng: 128.9186, capacity: 3000, facilities: "景区地下、密闭门", access: "镜泊湖公交直达" }
        ],
        nuclearTargets: [
            { id: "mdj_nt001", name: "牡丹江热电厂", type: "power", risk: "high", lat: 44.6027, lng: 129.6586, radius: 5000, description: "大型热电厂" },
            { id: "mdj_nt002", name: "绥芬河口岸", type: "transport", risk: "high", lat: 44.4127, lng: 131.1586, radius: 4000, description: "对俄重要口岸" },
            { id: "mdj_nt003", name: "牡丹江水泥厂", type: "factory", risk: "medium", lat: 44.6327, lng: 129.5886, radius: 4000, description: "大型水泥企业" }
        ]
    },
    "jiamusi": {
        name: "佳木斯",
        center: [130.3188, 46.7998],
        shelters: [
            { id: "jms_001", name: "长安路地下掩体", type: "government", level: "核5级", lat: 46.7998, lng: 130.3188, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交长安路站" },
            { id: "jms_002", name: "西林公园地下人防", type: "civil", level: "核6级", lat: 46.8198, lng: 130.3288, capacity: 2600, facilities: "公园区、独立通风", access: "公交西林公园站" },
            { id: "jms_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 46.7798, lng: 130.3388, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "佳木斯站地下通道" },
            { id: "jms_004", name: "东风区地下防护", type: "civil", level: "核6级", lat: 46.7598, lng: 130.3888, capacity: 2800, facilities: "工业区、密闭门", access: "东风区公交直达" }
        ],
        nuclearTargets: [
            { id: "jms_nt001", name: "佳木斯热电厂", type: "power", risk: "high", lat: 46.8298, lng: 130.3488, radius: 5000, description: "大型热电厂" },
            { id: "jms_nt002", name: "佳木斯造纸厂", type: "factory", risk: "medium", lat: 46.8398, lng: 130.3088, radius: 4000, description: "大型造纸企业" },
            { id: "jms_nt003", name: "松花江大桥", type: "bridge", risk: "medium", lat: 46.8098, lng: 130.2988, radius: 2000, description: "战略桥梁" }
        ]
    },
    "daqing": {
        name: "大庆",
        center: [125.1030, 46.5891],
        shelters: [
            { id: "dq_001", name: "铁人广场地下掩体", type: "government", level: "核5级", lat: 46.5891, lng: 125.1030, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交铁人广场站" },
            { id: "dq_002", name: "时代广场地下人防", type: "civil", level: "核6级", lat: 46.6091, lng: 125.1130, capacity: 3000, facilities: "公园区、独立通风", access: "公交时代广场站" },
            { id: "dq_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 46.5691, lng: 125.1230, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "大庆站地下通道" },
            { id: "dq_004", name: "萨尔图机场地下防护", type: "transport", level: "核5级", lat: 46.6491, lng: 125.1430, capacity: 3200, facilities: "机场深层掩体", access: "萨尔图机场" },
            { id: "dq_005", name: "让胡路地下避难所", type: "civil", level: "核6级", lat: 46.5491, lng: 124.8630, capacity: 2800, facilities: "油田区、密闭门", access: "让胡路区公交直达" }
        ],
        nuclearTargets: [
            { id: "dq_nt001", name: "大庆油田总部", type: "factory", risk: "high", lat: 46.5991, lng: 125.0830, radius: 6000, description: "特大型油田" },
            { id: "dq_nt002", name: "大庆石化", type: "chemical", risk: "high", lat: 46.5291, lng: 125.1630, radius: 8000, description: "大型石化基地" },
            { id: "dq_nt003", name: "大庆热电厂", type: "power", risk: "high", lat: 46.6391, lng: 125.1430, radius: 5000, description: "大型热电厂" }
        ]
    },
    "heihe": {
        name: "黑河",
        center: [127.4887, 50.2449],
        shelters: [
            { id: "hh_001", name: "中央街地下掩体", type: "government", level: "核5级", lat: 50.2449, lng: 127.4887, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "黑河公交直达" },
            { id: "hh_002", name: "黑龙江公园地下人防", type: "civil", level: "核6级", lat: 50.2649, lng: 127.4987, capacity: 2400, facilities: "江边区、独立通风", access: "公交黑龙江公园站" },
            { id: "hh_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 50.2049, lng: 127.5087, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "黑河站地下通道" },
            { id: "hh_004", name: "口岸地下防护", type: "transport", level: "核5级", lat: 50.2449, lng: 127.5187, capacity: 2800, facilities: "边境口岸、密闭门", access: "黑河口岸" }
        ],
        nuclearTargets: [
            { id: "hh_nt001", name: "黑河热电厂", type: "power", risk: "high", lat: 50.2749, lng: 127.5287, radius: 5000, description: "大型热电厂" },
            { id: "hh_nt002", name: "黑河口岸", type: "transport", risk: "high", lat: 50.2449, lng: 127.5187, radius: 4000, description: "对俄重要口岸" },
            { id: "hh_nt003", name: "黑龙江大桥", type: "bridge", risk: "medium", lat: 50.2349, lng: 127.5287, radius: 2000, description: "中俄边境桥" }
        ]
    },
    "suihua": {
        name: "绥化",
        center: [126.9689, 46.6535],
        shelters: [
            { id: "sh_001", name: "中兴路地下掩体", type: "government", level: "核5级", lat: 46.6535, lng: 126.9689, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "绥化公交直达" },
            { id: "sh_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 46.6735, lng: 126.9789, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "sh_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 46.6135, lng: 126.9889, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "绥化站地下通道" },
            { id: "sh_004", name: "北林区地下防护", type: "civil", level: "核6级", lat: 46.6935, lng: 126.9489, capacity: 2600, facilities: "农区、密闭门", access: "北林区公交直达" }
        ],
        nuclearTargets: [
            { id: "sh_nt001", name: "绥化热电厂", type: "power", risk: "high", lat: 46.6835, lng: 126.9989, radius: 5000, description: "大型热电厂" },
            { id: "sh_nt002", name: "绥化机场", type: "transport", risk: "medium", lat: 46.5535, lng: 127.0289, radius: 4000, description: "国内机场" }
        ]
    },
    "yichun2": {
        name: "伊春",
        center: [128.8408, 47.7271],
        shelters: [
            { id: "yc2_001", name: "新兴路地下掩体", type: "government", level: "核5级", lat: 47.7271, lng: 128.8408, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "伊春公交直达" },
            { id: "yc2_002", name: "北山公园地下人防", type: "civil", level: "核6级", lat: 47.7471, lng: 128.8508, capacity: 2200, facilities: "林区、独立通风", access: "公交北山公园站" },
            { id: "yc2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 47.7071, lng: 128.8608, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "伊春站地下通道" },
            { id: "yc2_004", name: "五营地下防护", type: "civil", level: "核6级", lat: 48.1071, lng: 129.2508, capacity: 2000, facilities: "森林公园区、密闭门", access: "五营公交直达" }
        ],
        nuclearTargets: [
            { id: "yc2_nt001", name: "伊春热电厂", type: "power", risk: "high", lat: 47.7371, lng: 128.8708, radius: 5000, description: "大型热电厂" },
            { id: "yc2_nt002", name: "伊春林业局", type: "factory", risk: "medium", lat: 47.7671, lng: 128.8208, radius: 3000, description: "大型林业基地" }
        ]
    },
    "jixi": {
        name: "鸡西",
        center: [130.9752, 45.2959],
        shelters: [
            { id: "jx_001", name: "中心大街地下掩体", type: "government", level: "核5级", lat: 45.2959, lng: 130.9752, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "鸡西公交直达" },
            { id: "jx_002", name: "穆棱河公园地下人防", type: "civil", level: "核6级", lat: 45.3159, lng: 130.9852, capacity: 2600, facilities: "河畔区、独立通风", access: "公交穆棱河公园站" },
            { id: "jx_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 45.2759, lng: 130.9952, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "鸡西站地下通道" },
            { id: "jx_004", name: "滴道地下防护", type: "civil", level: "核6级", lat: 45.3559, lng: 130.9052, capacity: 2800, facilities: "矿区、密闭门", access: "滴道区公交直达" }
        ],
        nuclearTargets: [
            { id: "jx_nt001", name: "鸡西煤矿", type: "factory", risk: "high", lat: 45.3059, lng: 130.9352, radius: 6000, description: "大型煤矿" },
            { id: "jx_nt002", name: "鸡西热电厂", type: "power", risk: "high", lat: 45.3259, lng: 131.0052, radius: 5000, description: "大型热电厂" },
            { id: "jx_nt003", name: "密山口岸", type: "transport", risk: "medium", lat: 45.5559, lng: 131.8752, radius: 4000, description: "对俄口岸" }
        ]
    },
    "hegang": {
        name: "鹤岗",
        center: [130.2775, 47.3324],
        shelters: [
            { id: "hg_001", name: "红军路地下掩体", type: "government", level: "核5级", lat: 47.3324, lng: 130.2775, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "鹤岗公交直达" },
            { id: "hg_002", name: "五指山公园地下人防", type: "civil", level: "核6级", lat: 47.3524, lng: 130.2875, capacity: 2400, facilities: "公园区、独立通风", access: "公交五指山公园站" },
            { id: "hg_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 47.3124, lng: 130.2975, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "鹤岗站地下通道" },
            { id: "hg_004", name: "兴山地下防护", type: "civil", level: "核6级", lat: 47.3824, lng: 130.3375, capacity: 2800, facilities: "矿区、密闭门", access: "兴山区公交直达" }
        ],
        nuclearTargets: [
            { id: "hg_nt001", name: "鹤岗煤矿", type: "factory", risk: "high", lat: 47.3624, lng: 130.3075, radius: 6000, description: "大型煤矿" },
            { id: "hg_nt002", name: "鹤岗热电厂", type: "power", risk: "high", lat: 47.3424, lng: 130.3175, radius: 5000, description: "大型热电厂" }
        ]
    },
    "qitaihe": {
        name: "七台河",
        center: [131.0159, 45.7712],
        shelters: [
            { id: "qth_001", name: "桃山地下掩体", type: "government", level: "核5级", lat: 45.7712, lng: 131.0159, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "七台河公交直达" },
            { id: "qth_002", name: "仙洞山公园地下人防", type: "civil", level: "核6级", lat: 45.7912, lng: 131.0259, capacity: 2200, facilities: "公园区、独立通风", access: "公交仙洞山公园站" },
            { id: "qth_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 45.7512, lng: 131.0359, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "七台河站地下通道" },
            { id: "qth_004", name: "茄子河地下防护", type: "civil", level: "核6级", lat: 45.7812, lng: 131.1159, capacity: 2600, facilities: "矿区、密闭门", access: "茄子河区公交直达" }
        ],
        nuclearTargets: [
            { id: "qth_nt001", name: "七台河煤矿", type: "factory", risk: "high", lat: 45.7612, lng: 131.0559, radius: 6000, description: "大型煤矿" },
            { id: "qth_nt002", name: "七台河热电厂", type: "power", risk: "high", lat: 45.7912, lng: 131.0559, radius: 5000, description: "大型热电厂" }
        ]
    },
    "shuangyashan": {
        name: "双鸭山",
        center: [131.1573, 46.6434],
        shelters: [
            { id: "sys_001", name: "新兴大街地下掩体", type: "government", level: "核5级", lat: 46.6434, lng: 131.1573, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "双鸭山公交直达" },
            { id: "sys_002", name: "益寿山公园地下人防", type: "civil", level: "核6级", lat: 46.6634, lng: 131.1673, capacity: 2400, facilities: "公园区、独立通风", access: "公交益寿山公园站" },
            { id: "sys_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 46.6234, lng: 131.1773, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "双鸭山站地下通道" },
            { id: "sys_004", name: "尖山地下防护", type: "civil", level: "核6级", lat: 46.6634, lng: 131.1373, capacity: 2800, facilities: "矿区、密闭门", access: "尖山区公交直达" }
        ],
        nuclearTargets: [
            { id: "sys_nt001", name: "双鸭山煤矿", type: "factory", risk: "high", lat: 46.6434, lng: 131.1873, radius: 6000, description: "大型煤矿" },
            { id: "sys_nt002", name: "双鸭山热电厂", type: "power", risk: "high", lat: 46.6834, lng: 131.1673, radius: 5000, description: "大型热电厂" }
        ]
    },
    "daxinganling": {
        name: "大兴安岭",
        center: [124.7115, 51.6747],
        shelters: [
            { id: "dxal_001", name: "加格达奇地下掩体", type: "government", level: "核5级", lat: 50.4247, lng: 124.1215, capacity: 2000, facilities: "地区中心、深埋18米、三防系统", access: "加格达奇公交直达" },
            { id: "dxal_002", name: "北山森林公园地下人防", type: "civil", level: "核6级", lat: 50.4447, lng: 124.1415, capacity: 1800, facilities: "林区、独立通风", access: "公交北山公园站" },
            { id: "dxal_003", name: "漠河地下避难所", type: "civil", level: "核6级", lat: 52.9747, lng: 122.5315, capacity: 1600, facilities: "极北地区、密闭门", access: "漠河市公交直达" },
            { id: "dxal_004", name: "呼玛地下防护", type: "civil", level: "核6级", lat: 51.7347, lng: 126.6515, capacity: 1400, facilities: "边境区、大型储水", access: "呼玛县公交直达" }
        ],
        nuclearTargets: [
            { id: "dxal_nt001", name: "加格达奇热电厂", type: "power", risk: "high", lat: 50.4347, lng: 124.1315, radius: 5000, description: "地区热电厂" },
            { id: "dxal_nt002", name: "漠河机场", type: "transport", risk: "medium", lat: 52.9147, lng: 122.5215, radius: 4000, description: "国内旅游机场" },
            { id: "dxal_nt003", name: "大兴安岭林区", type: "factory", risk: "medium", lat: 51.6747, lng: 124.7115, radius: 3000, description: "重要林业基地" }
        ]
    },

    // ========== 安徽省16个城市 ==========
    "hefei": {
        name: "合肥",
        center: [117.2272, 31.8206],
        shelters: [
            { id: "hf_001", name: "市政府广场地下掩体", type: "government", level: "核5级", lat: 31.8606, lng: 117.2272, capacity: 5000, facilities: "政务区、深埋20米、三防系统", access: "地铁3号线市政务中心站" },
            { id: "hf_002", name: "淮河路地下人防", type: "civil", level: "核6级", lat: 31.8676, lng: 117.3122, capacity: 4500, facilities: "商业步行街、大型通风", access: "地铁1号线大东门站" },
            { id: "hf_003", name: "包河万达地下避难所", type: "mall", level: "核6级", lat: 31.8486, lng: 117.3002, capacity: 6000, facilities: "商圈核心、独立供电", access: "地铁1号线包公园站" },
            { id: "hf_004", name: "合肥南站地下防护", type: "transport", level: "核5级", lat: 31.8076, lng: 117.2852, capacity: 8000, facilities: "高铁枢纽、深掩体", access: "地铁1/4/5号线合肥南站" },
            { id: "hf_005", name: "合肥站地下避难所", type: "transport", level: "核5级", lat: 31.8796, lng: 117.3202, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "地铁1号线合肥火车站" },
            { id: "hf_006", name: "滨湖会展中心地下人防", type: "civil", level: "核6级", lat: 31.7576, lng: 117.2952, capacity: 4000, facilities: "新区、大型储水", access: "地铁1号线滨湖会展中心站" },
            { id: "hf_007", name: "新桥机场地下掩体", type: "transport", level: "核5级", lat: 31.9876, lng: 116.9752, capacity: 5000, facilities: "机场深层掩体", access: "机场大巴/地铁S1线" },
            { id: "hf_008", name: "蜀山地下人防", type: "civil", level: "核6级", lat: 31.8376, lng: 117.2452, capacity: 3500, facilities: "大学城区、密闭结构", access: "地铁2号线三里庵站" },
            { id: "hf_009", name: "瑶海地下避难所", type: "civil", level: "核6级", lat: 31.8776, lng: 117.3302, capacity: 3000, facilities: "老城区、滤毒通风", access: "地铁2号线东七里站" },
            { id: "hf_010", name: "庐阳地下防护", type: "civil", level: "核6级", lat: 31.8876, lng: 117.2652, capacity: 3200, facilities: "历史城区、医疗点", access: "地铁2号线四牌楼站" },
            { id: "hf_011", name: "高新区地下人防", type: "civil", level: "核6级", lat: 31.8276, lng: 117.1352, capacity: 2800, facilities: "科技园区、独立通风", access: "地铁2号线汽车西站" },
            { id: "hf_012", name: "经开区地下避难所", type: "civil", level: "核6级", lat: 31.7876, lng: 117.2052, capacity: 2600, facilities: "工业区、应急照明", access: "地铁3号线大学城北站" }
        ],
        nuclearTargets: [
            { id: "hf_nt001", name: "合肥电厂", type: "power", risk: "high", lat: 31.9276, lng: 117.1852, radius: 5000, description: "大型火力发电厂" },
            { id: "hf_nt002", name: "董铺水库", type: "water", risk: "high", lat: 31.9176, lng: 117.1952, radius: 3000, description: "城市主要水源地" },
            { id: "hf_nt003", name: "合肥新桥机场", type: "transport", risk: "high", lat: 31.9876, lng: 116.9752, radius: 5000, description: "国际航空枢纽" },
            { id: "hf_nt004", name: "合肥燃气集团", type: "gas", risk: "high", lat: 31.8576, lng: 117.2652, radius: 4000, description: "天然气储配站" },
            { id: "hf_nt005", name: "京东方合肥工厂", type: "factory", risk: "medium", lat: 31.8076, lng: 117.1752, radius: 4000, description: "大型电子工厂" }
        ]
    },
    "wuhu": {
        name: "芜湖",
        center: [118.4331, 31.3526],
        shelters: [
            { id: "wh3_001", name: "中山路地下掩体", type: "government", level: "核5级", lat: 31.3526, lng: 118.4331, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "轻轨1号线中山路站" },
            { id: "wh3_002", name: "镜湖公园地下人防", type: "civil", level: "核6级", lat: 31.3426, lng: 118.4231, capacity: 3500, facilities: "公园区、独立通风", access: "轻轨1号线鸠兹广场站" },
            { id: "wh3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 31.3726, lng: 118.3831, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "芜湖站地下通道" },
            { id: "wh3_004", name: "弋矶山地下防护", type: "civil", level: "核6级", lat: 31.3626, lng: 118.3631, capacity: 3000, facilities: "医院区、密闭门", access: "公交弋矶山站" },
            { id: "wh3_005", name: "三山地下避难所", type: "civil", level: "核6级", lat: 31.2126, lng: 118.2931, capacity: 2800, facilities: "开发区、大型储水", access: "三山区公交直达" }
        ],
        nuclearTargets: [
            { id: "wh3_nt001", name: "芜湖电厂", type: "power", risk: "high", lat: 31.3826, lng: 118.4131, radius: 5000, description: "大型火力发电厂" },
            { id: "wh3_nt002", name: "芜湖港", type: "port", risk: "high", lat: 31.3326, lng: 118.3831, radius: 5000, description: "长江重要港口" },
            { id: "wh3_nt003", name: "长江大桥", type: "bridge", risk: "high", lat: 31.3626, lng: 118.4031, radius: 2000, description: "战略桥梁" }
        ]
    },
    "bengbu": {
        name: "蚌埠",
        center: [117.3890, 32.9156],
        shelters: [
            { id: "bb_001", name: "淮河路地下掩体", type: "government", level: "核5级", lat: 32.9156, lng: 117.3890, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交淮河路站" },
            { id: "bb_002", name: "龙子湖地下人防", type: "civil", level: "核6级", lat: 32.9356, lng: 117.4190, capacity: 3000, facilities: "湖区、独立通风", access: "公交龙子湖站" },
            { id: "bb_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 32.9056, lng: 117.4190, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "蚌埠站地下通道" },
            { id: "bb_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 32.8756, lng: 117.3890, capacity: 4000, facilities: "高铁站、深掩体", access: "蚌埠南站地下通道" }
        ],
        nuclearTargets: [
            { id: "bb_nt001", name: "蚌埠电厂", type: "power", risk: "high", lat: 32.9556, lng: 117.4090, radius: 5000, description: "大型火力发电厂" },
            { id: "bb_nt002", name: "淮河铁路桥", type: "bridge", risk: "high", lat: 32.9256, lng: 117.3990, radius: 2000, description: "京沪铁路战略桥" },
            { id: "bb_nt003", name: "蚌埠港", type: "port", risk: "medium", lat: 32.8956, lng: 117.3790, radius: 4000, description: "淮河重要港口" }
        ]
    },
    "huainan": {
        name: "淮南",
        center: [117.0184, 32.5872],
        shelters: [
            { id: "hn_001", name: "洞山地下掩体", type: "government", level: "核5级", lat: 32.5872, lng: 117.0184, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交洞山站" },
            { id: "hn_002", name: "龙湖公园地下人防", type: "civil", level: "核6级", lat: 32.6072, lng: 117.0384, capacity: 3000, facilities: "公园区、独立通风", access: "公交龙湖公园站" },
            { id: "hn_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 32.5672, lng: 117.0284, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "淮南站地下通道" },
            { id: "hn_004", name: "潘集地下防护", type: "civil", level: "核6级", lat: 32.7872, lng: 116.6084, capacity: 3200, facilities: "矿区、密闭门", access: "潘集区公交直达" }
        ],
        nuclearTargets: [
            { id: "hn_nt001", name: "淮南煤矿", type: "factory", risk: "high", lat: 32.6272, lng: 116.9884, radius: 8000, description: "特大型煤炭基地" },
            { id: "hn_nt002", name: "淮南电厂", type: "power", risk: "high", lat: 32.5472, lng: 117.0684, radius: 5000, description: "大型火力发电厂" },
            { id: "hn_nt003", name: "平圩电厂", type: "power", risk: "high", lat: 32.7672, lng: 116.6784, radius: 5000, description: "特大型电厂" }
        ]
    },
    "maanshan": {
        name: "马鞍山",
        center: [118.5084, 31.7003],
        shelters: [
            { id: "mas_001", name: "湖东路地下掩体", type: "government", level: "核5级", lat: 31.7003, lng: 118.5084, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交湖东路站" },
            { id: "mas_002", name: "雨山湖地下人防", type: "civil", level: "核6级", lat: 31.7203, lng: 118.5184, capacity: 2800, facilities: "公园区、独立通风", access: "公交雨山湖站" },
            { id: "mas_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 31.6803, lng: 118.5284, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "马鞍山东站地下通道" },
            { id: "mas_004", name: "马钢地下防护", type: "civil", level: "核6级", lat: 31.7303, lng: 118.5384, capacity: 3200, facilities: "厂区、密闭门", access: "马钢公交直达" }
        ],
        nuclearTargets: [
            { id: "mas_nt001", name: "马鞍山钢铁", type: "factory", risk: "high", lat: 31.7403, lng: 118.5484, radius: 6000, description: "大型钢铁企业" },
            { id: "mas_nt002", name: "马鞍山电厂", type: "power", risk: "high", lat: 31.6703, lng: 118.4884, radius: 5000, description: "大型火力发电厂" },
            { id: "mas_nt003", name: "长江大桥", type: "bridge", risk: "high", lat: 31.6503, lng: 118.4184, radius: 2000, description: "战略桥梁" }
        ]
    },
    "huaibei": {
        name: "淮北",
        center: [116.7983, 33.9559],
        shelters: [
            { id: "hb_001", name: "相山路地下掩体", type: "government", level: "核5级", lat: 33.9559, lng: 116.7983, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交相山路站" },
            { id: "hb_002", name: "相山公园地下人防", type: "civil", level: "核6级", lat: 33.9759, lng: 116.8083, capacity: 2600, facilities: "公园区、独立通风", access: "公交相山公园站" },
            { id: "hb_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 33.9359, lng: 116.8183, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "淮北站地下通道" },
            { id: "hb_004", name: "烈山地下防护", type: "civil", level: "核6级", lat: 33.8659, lng: 116.8283, capacity: 3000, facilities: "矿区、密闭门", access: "烈山区公交直达" }
        ],
        nuclearTargets: [
            { id: "hb_nt001", name: "淮北矿业", type: "factory", risk: "high", lat: 33.9259, lng: 116.8383, radius: 6000, description: "大型煤炭企业" },
            { id: "hb_nt002", name: "淮北电厂", type: "power", risk: "high", lat: 33.9959, lng: 116.7783, radius: 5000, description: "大型火力发电厂" }
        ]
    },
    "tongling": {
        name: "铜陵",
        center: [117.8121, 30.9454],
        shelters: [
            { id: "tl3_001", name: "长江路地下掩体", type: "government", level: "核5级", lat: 30.9454, lng: 117.8121, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交长江路站" },
            { id: "tl3_002", name: "天井湖地下人防", type: "civil", level: "核6级", lat: 30.9654, lng: 117.8221, capacity: 2400, facilities: "湖区、独立通风", access: "公交天井湖站" },
            { id: "tl3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.9254, lng: 117.8321, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "铜陵站地下通道" },
            { id: "tl3_004", name: "铜官山地下防护", type: "civil", level: "核6级", lat: 30.9054, lng: 117.8521, capacity: 2800, facilities: "矿区、密闭门", access: "铜官区公交直达" }
        ],
        nuclearTargets: [
            { id: "tl3_nt001", name: "铜陵有色", type: "factory", risk: "high", lat: 30.9354, lng: 117.8421, radius: 6000, description: "大型铜冶炼企业" },
            { id: "tl3_nt002", name: "铜陵电厂", type: "power", risk: "high", lat: 30.9854, lng: 117.7921, radius: 5000, description: "大型火力发电厂" },
            { id: "tl3_nt003", name: "长江大桥", type: "bridge", risk: "high", lat: 30.8954, lng: 117.7221, radius: 2000, description: "战略桥梁" }
        ]
    },
    "anqing": {
        name: "安庆",
        center: [117.0635, 30.5429],
        shelters: [
            { id: "aq_001", name: "人民路地下掩体", type: "government", level: "核5级", lat: 30.5429, lng: 117.0635, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交人民路站" },
            { id: "aq_002", name: "菱湖公园地下人防", type: "civil", level: "核6级", lat: 30.5629, lng: 117.0735, capacity: 2800, facilities: "公园区、独立通风", access: "公交菱湖公园站" },
            { id: "aq_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.5229, lng: 117.0835, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "安庆站地下通道" },
            { id: "aq_004", name: "迎江地下防护", type: "civil", level: "核6级", lat: 30.5029, lng: 117.0535, capacity: 2600, facilities: "沿江城区、密闭门", access: "迎江区公交直达" }
        ],
        nuclearTargets: [
            { id: "aq_nt001", name: "安庆石化", type: "chemical", risk: "high", lat: 30.5829, lng: 117.1035, radius: 8000, description: "大型石化基地" },
            { id: "aq_nt002", name: "安庆电厂", type: "power", risk: "high", lat: 30.5129, lng: 116.9935, radius: 5000, description: "大型火力发电厂" },
            { id: "aq_nt003", name: "安庆港", type: "port", risk: "high", lat: 30.4929, lng: 117.0335, radius: 5000, description: "长江重要港口" }
        ]
    },
    "huangshan": {
        name: "黄山",
        center: [118.3387, 29.7147],
        shelters: [
            { id: "hs2_001", name: "屯溪老街地下掩体", type: "government", level: "核5级", lat: 29.7147, lng: 118.3387, capacity: 2600, facilities: "历史街区、深埋18米、三防系统", access: "公交屯溪老街站" },
            { id: "hs2_002", name: "黄山风景区地下人防", type: "civil", level: "核6级", lat: 30.1347, lng: 118.1687, capacity: 3000, facilities: "景区、独立通风", access: "黄山景区大巴" },
            { id: "hs2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.7047, lng: 118.3487, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "黄山北站地下通道" },
            { id: "hs2_004", name: "徽州地下防护", type: "civil", level: "核6级", lat: 29.9147, lng: 118.3387, capacity: 2400, facilities: "古城区、密闭门", access: "徽州区公交直达" }
        ],
        nuclearTargets: [
            { id: "hs2_nt001", name: "黄山机场", type: "transport", risk: "medium", lat: 29.7347, lng: 118.2587, radius: 4000, description: "国内旅游机场" },
            { id: "hs2_nt002", name: "黄山风景区", type: "cultural", risk: "medium", lat: 30.1347, lng: 118.1687, radius: 2000, description: "世界文化与自然双重遗产" }
        ]
    },
    "fuyang": {
        name: "阜阳",
        center: [115.8145, 32.8908],
        shelters: [
            { id: "fy_001", name: "颍州路地下掩体", type: "government", level: "核5级", lat: 32.8908, lng: 115.8145, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交颍州路站" },
            { id: "fy_002", name: "文峰公园地下人防", type: "civil", level: "核6级", lat: 32.9108, lng: 115.8245, capacity: 2800, facilities: "公园区、独立通风", access: "公交文峰公园站" },
            { id: "fy_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 32.8708, lng: 115.8345, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "阜阳站地下通道" },
            { id: "fy_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 32.8508, lng: 115.7845, capacity: 3200, facilities: "高铁站、深掩体", access: "阜阳西站地下通道" },
            { id: "fy_005", name: "颍泉地下避难所", type: "civil", level: "核6级", lat: 32.9308, lng: 115.7945, capacity: 2600, facilities: "北部城区、密闭门", access: "颍泉区公交直达" }
        ],
        nuclearTargets: [
            { id: "fy_nt001", name: "阜阳电厂", type: "power", risk: "high", lat: 32.9308, lng: 115.8545, radius: 5000, description: "大型火力发电厂" },
            { id: "fy_nt002", name: "阜阳机场", type: "transport", risk: "medium", lat: 32.8808, lng: 115.7545, radius: 4000, description: "国内机场" },
            { id: "fy_nt003", name: "京九铁路枢纽", type: "transport", risk: "high", lat: 32.8908, lng: 115.8145, radius: 4000, description: "重要铁路枢纽" }
        ]
    },
    "suzhou2": {
        name: "宿州",
        center: [116.9645, 33.6340],
        shelters: [
            { id: "sz4_001", name: "汴河路地下掩体", type: "government", level: "核5级", lat: 33.6340, lng: 116.9645, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交汴河路站" },
            { id: "sz4_002", name: "三角洲公园地下人防", type: "civil", level: "核6级", lat: 33.6540, lng: 116.9745, capacity: 2600, facilities: "公园区、独立通风", access: "公交三角洲公园站" },
            { id: "sz4_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 33.6140, lng: 116.9845, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "宿州站地下通道" },
            { id: "sz4_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 33.5940, lng: 117.0345, capacity: 3000, facilities: "高铁站、深掩体", access: "宿州东站地下通道" }
        ],
        nuclearTargets: [
            { id: "sz4_nt001", name: "宿州电厂", type: "power", risk: "high", lat: 33.6640, lng: 116.9945, radius: 5000, description: "大型火力发电厂" },
            { id: "sz4_nt002", name: "京沪高铁桥", type: "bridge", risk: "high", lat: 33.6440, lng: 116.9545, radius: 2000, description: "战略桥梁" }
        ]
    },
    "chuzhou": {
        name: "滁州",
        center: [118.3169, 32.3016],
        shelters: [
            { id: "cz3_001", name: "琅琊路地下掩体", type: "government", level: "核5级", lat: 32.3016, lng: 118.3169, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交琅琊路站" },
            { id: "cz3_002", name: "琅琊山地下人防", type: "civil", level: "核6级", lat: 32.3216, lng: 118.2969, capacity: 2800, facilities: "风景区、独立通风", access: "公交琅琊山站" },
            { id: "cz3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 32.2816, lng: 118.3269, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "滁州站地下通道" },
            { id: "cz3_004", name: "南谯地下防护", type: "civil", level: "核6级", lat: 32.2616, lng: 118.3769, capacity: 2600, facilities: "南部城区、密闭门", access: "南谯区公交直达" }
        ],
        nuclearTargets: [
            { id: "cz3_nt001", name: "滁州电厂", type: "power", risk: "high", lat: 32.3316, lng: 118.3369, radius: 5000, description: "大型火力发电厂" },
            { id: "cz3_nt002", name: "京沪高铁桥", type: "bridge", risk: "high", lat: 32.3416, lng: 118.2969, radius: 2000, description: "战略桥梁" }
        ]
    },
    "liuan": {
        name: "六安",
        center: [116.5235, 31.7349],
        shelters: [
            { id: "la_001", name: "皖西路地下掩体", type: "government", level: "核5级", lat: 31.7349, lng: 116.5235, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交皖西路站" },
            { id: "la_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 31.7549, lng: 116.5335, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "la_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 31.7149, lng: 116.5435, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "六安站地下通道" },
            { id: "la_004", name: "叶集地下防护", type: "civil", level: "核6级", lat: 31.8749, lng: 115.9435, capacity: 2200, facilities: "西部城区、密闭门", access: "叶集区公交直达" }
        ],
        nuclearTargets: [
            { id: "la_nt001", name: "六安电厂", type: "power", risk: "high", lat: 31.7749, lng: 116.5535, radius: 5000, description: "大型火力发电厂" },
            { id: "la_nt002", name: "淠史杭灌区", type: "water", risk: "high", lat: 31.8049, lng: 116.4835, radius: 3000, description: "大型水利工程" }
        ]
    },
    "xuancheng": {
        name: "宣城",
        center: [118.7610, 30.9454],
        shelters: [
            { id: "xc_001", name: "鳌峰路地下掩体", type: "government", level: "核5级", lat: 30.9454, lng: 118.7610, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交鳌峰路站" },
            { id: "xc_002", name: "敬亭山地下人防", type: "civil", level: "核6级", lat: 30.9654, lng: 118.7410, capacity: 2400, facilities: "风景区、独立通风", access: "公交敬亭山站" },
            { id: "xc_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.9254, lng: 118.7710, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "宣城站地下通道" },
            { id: "xc_004", name: "宣州地下防护", type: "civil", level: "核6级", lat: 30.9854, lng: 118.7810, capacity: 2600, facilities: "古城区、密闭门", access: "宣州区公交直达" }
        ],
        nuclearTargets: [
            { id: "xc_nt001", name: "宣城电厂", type: "power", risk: "high", lat: 30.9754, lng: 118.7910, radius: 5000, description: "大型火力发电厂" },
            { id: "xc_nt002", name: "宣纸厂", type: "factory", risk: "medium", lat: 30.8454, lng: 118.6510, radius: 3000, description: "传统工艺基地" }
        ]
    },
    "chizhou": {
        name: "池州",
        center: [117.4892, 30.6560],
        shelters: [
            { id: "cz4_001", name: "百牙路地下掩体", type: "government", level: "核5级", lat: 30.6560, lng: 117.4892, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "公交百牙路站" },
            { id: "cz4_002", name: "九华山地下人防", type: "civil", level: "核6级", lat: 30.4760, lng: 117.8092, capacity: 2800, facilities: "佛教圣地、独立通风", access: "九华山公交直达" },
            { id: "cz4_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.6360, lng: 117.4992, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "池州站地下通道" },
            { id: "cz4_004", name: "贵池地下防护", type: "civil", level: "核6级", lat: 30.6360, lng: 117.5292, capacity: 2400, facilities: "南部城区、密闭门", access: "贵池区公交直达" }
        ],
        nuclearTargets: [
            { id: "cz4_nt001", name: "池州电厂", type: "power", risk: "high", lat: 30.6760, lng: 117.5092, radius: 5000, description: "大型火力发电厂" },
            { id: "cz4_nt002", name: "九华山机场", type: "transport", risk: "medium", lat: 30.7460, lng: 117.5592, radius: 4000, description: "国内旅游机场" }
        ]
    },
    "bozhou": {
        name: "亳州",
        center: [115.7820, 33.8693],
        shelters: [
            { id: "bz_001", name: "魏武大道地下掩体", type: "government", level: "核5级", lat: 33.8693, lng: 115.7820, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交魏武大道站" },
            { id: "bz_002", name: "曹操地下运兵道", type: "civil", level: "核6级", lat: 33.8793, lng: 115.7620, capacity: 3000, facilities: "历史遗迹、独立通风", access: "公交曹操公园站" },
            { id: "bz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 33.8493, lng: 115.7920, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "亳州站地下通道" },
            { id: "bz_004", name: "谯城地下防护", type: "civil", level: "核6级", lat: 33.8893, lng: 115.8120, capacity: 2400, facilities: "古城区、密闭门", access: "谯城区公交直达" }
        ],
        nuclearTargets: [
            { id: "bz_nt001", name: "亳州电厂", type: "power", risk: "high", lat: 33.8893, lng: 115.8020, radius: 5000, description: "大型火力发电厂" },
            { id: "bz_nt002", name: "古井酒厂", type: "factory", risk: "medium", lat: 33.7793, lng: 115.9020, radius: 4000, description: "大型酒厂" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART4_CITIES;
}
