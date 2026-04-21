// ============================================
// 核战争城市自救地球仪 - 数据批次5：江西省11个城市 + 山东省剩余城市 + 河南省部分城市
// ============================================

const PART5_CITIES = {
    // ========== 江西省11个城市 ==========
    "nanchang": {
        name: "南昌",
        center: [115.8579, 28.6820],
        shelters: [
            { id: "nc_001", name: "八一广场地下掩体", type: "government", level: "核5级", lat: 28.6820, lng: 115.8579, capacity: 5000, facilities: "市中心、深埋20米、三防系统", access: "地铁1/2号线八一广场站" },
            { id: "nc_002", name: "中山路地下人防", type: "civil", level: "核6级", lat: 28.6720, lng: 115.8679, capacity: 4500, facilities: "商业区、大型通风", access: "地铁1号线八一馆站" },
            { id: "nc_003", name: "红谷滩地下避难所", type: "government", level: "核5级", lat: 28.6920, lng: 115.8379, capacity: 6000, facilities: "新区核心、独立供电", access: "地铁1号线地铁大厦站" },
            { id: "nc_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 28.6520, lng: 115.9179, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "南昌站地下通道" },
            { id: "nc_005", name: "西站地下避难所", type: "transport", level: "核5级", lat: 28.6220, lng: 115.7979, capacity: 7000, facilities: "高铁枢纽、深掩体", access: "地铁2号线南昌西站" },
            { id: "nc_006", name: "滕王阁地下人防", type: "civil", level: "核6级", lat: 28.6820, lng: 115.8779, capacity: 3500, facilities: "景区地下、密闭结构", access: "公交滕王阁站" },
            { id: "nc_007", name: "青山湖地下防护", type: "civil", level: "核6级", lat: 28.7120, lng: 115.9379, capacity: 3000, facilities: "湖区、独立通风", access: "地铁1号线青山湖大道站" },
            { id: "nc_008", name: "青云谱地下避难所", type: "civil", level: "核6级", lat: 28.6620, lng: 115.9079, capacity: 2800, facilities: "南部城区、密闭门", access: "青云谱区公交直达" },
            { id: "nc_009", name: "昌北机场地下掩体", type: "transport", level: "核5级", lat: 28.8620, lng: 115.9079, capacity: 5000, facilities: "机场深层掩体", access: "机场大巴/地铁1号线" },
            { id: "nc_010", name: "新建地下人防", type: "civil", level: "核6级", lat: 28.6920, lng: 115.8179, capacity: 2600, facilities: "西部城区、滤毒通风", access: "新建区公交直达" }
        ],
        nuclearTargets: [
            { id: "nc_nt001", name: "南昌电厂", type: "power", risk: "high", lat: 28.7520, lng: 115.9279, radius: 5000, description: "大型火力发电厂" },
            { id: "nc_nt002", name: "青山湖自来水厂", type: "water", risk: "high", lat: 28.7220, lng: 115.9479, radius: 3000, description: "主要供水厂" },
            { id: "nc_nt003", name: "南昌昌北机场", type: "transport", risk: "high", lat: 28.8620, lng: 115.9079, radius: 5000, description: "国际航空枢纽" },
            { id: "nc_nt004", name: "南昌大桥", type: "bridge", risk: "high", lat: 28.6720, lng: 115.8879, radius: 2000, description: "跨赣江战略桥梁" },
            { id: "nc_nt005", name: "江铃汽车", type: "factory", risk: "medium", lat: 28.7320, lng: 115.8979, radius: 4000, description: "大型汽车企业" }
        ]
    },
    "jingdezhen": {
        name: "景德镇",
        center: [117.2147, 29.2926],
        shelters: [
            { id: "jdz_001", name: "珠山路地下掩体", type: "government", level: "核5级", lat: 29.2926, lng: 117.2147, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交珠山路站" },
            { id: "jdz_002", name: "人民广场地下人防", type: "civil", level: "核6级", lat: 29.2826, lng: 117.2047, capacity: 2800, facilities: "广场区、独立通风", access: "公交人民广场站" },
            { id: "jdz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.2626, lng: 117.2247, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "景德镇北站地下通道" },
            { id: "jdz_004", name: "陶瓷博物馆地下防护", type: "civil", level: "核6级", lat: 29.3126, lng: 117.2347, capacity: 2600, facilities: "文化区、密闭门", access: "陶瓷博物馆公交直达" }
        ],
        nuclearTargets: [
            { id: "jdz_nt001", name: "景德镇电厂", type: "power", risk: "high", lat: 29.3226, lng: 117.2547, radius: 5000, description: "大型火力发电厂" },
            { id: "jdz_nt002", name: "景德镇陶瓷厂", type: "factory", risk: "medium", lat: 29.2726, lng: 117.1847, radius: 4000, description: "大型陶瓷企业" }
        ]
    },
    "pingxiang": {
        name: "萍乡",
        center: [113.8547, 27.6225],
        shelters: [
            { id: "px_001", name: "跃进路地下掩体", type: "government", level: "核5级", lat: 27.6225, lng: 113.8547, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交跃进路站" },
            { id: "px_002", name: "安源路矿地下人防", type: "civil", level: "核6级", lat: 27.6425, lng: 113.8647, capacity: 3000, facilities: "矿区历史遗址、独立通风", access: "公交安源纪念馆站" },
            { id: "px_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 27.6025, lng: 113.8747, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "萍乡站地下通道" },
            { id: "px_004", name: "湘东地下防护", type: "civil", level: "核6级", lat: 27.6625, lng: 113.7447, capacity: 2600, facilities: "工矿区、密闭门", access: "湘东区公交直达" }
        ],
        nuclearTargets: [
            { id: "px_nt001", name: "萍乡电厂", type: "power", risk: "high", lat: 27.6525, lng: 113.8847, radius: 5000, description: "大型火力发电厂" },
            { id: "px_nt002", name: "安源煤矿", type: "factory", risk: "high", lat: 27.6325, lng: 113.8747, radius: 6000, description: "大型煤矿" }
        ]
    },
    "jiujiang": {
        name: "九江",
        center: [116.0019, 29.7051],
        shelters: [
            { id: "jj_001", name: "浔阳路地下掩体", type: "government", level: "核5级", lat: 29.7051, lng: 116.0019, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交浔阳路站" },
            { id: "jj_002", name: "甘棠湖地下人防", type: "civil", level: "核6级", lat: 29.7151, lng: 116.0119, capacity: 3000, facilities: "湖区、独立通风", access: "公交甘棠湖站" },
            { id: "jj_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.6851, lng: 116.0219, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "九江站地下通道" },
            { id: "jj_004", name: "庐山站地下防护", type: "transport", level: "核5级", lat: 29.6651, lng: 115.9619, capacity: 4000, facilities: "高铁站、深掩体", access: "庐山站地下通道" },
            { id: "jj_005", name: "庐山景区地下避难所", type: "civil", level: "核6级", lat: 29.5751, lng: 115.9819, capacity: 3200, facilities: "景区地下、密闭门", access: "庐山景区大巴" }
        ],
        nuclearTargets: [
            { id: "jj_nt001", name: "九江电厂", type: "power", risk: "high", lat: 29.7451, lng: 116.0319, radius: 5000, description: "大型火力发电厂" },
            { id: "jj_nt002", name: "九江长江大桥", type: "bridge", risk: "high", lat: 29.7651, lng: 115.9519, radius: 2000, description: "京九铁路战略桥" },
            { id: "jj_nt003", name: "九江港", type: "port", risk: "high", lat: 29.7351, lng: 115.9919, radius: 5000, description: "长江重要港口" }
        ]
    },
    "xinyu": {
        name: "新余",
        center: [114.9308, 27.8178],
        shelters: [
            { id: "xy_001", name: "抱石大道地下掩体", type: "government", level: "核5级", lat: 27.8178, lng: 114.9308, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交抱石大道站" },
            { id: "xy_002", name: "仙女湖地下人防", type: "civil", level: "核6级", lat: 27.7378, lng: 114.8808, capacity: 2600, facilities: "湖区、独立通风", access: "仙女湖景区公交" },
            { id: "xy_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 27.8078, lng: 114.9508, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "新余站地下通道" },
            { id: "xy_004", name: "钢铁厂地下防护", type: "civil", level: "核6级", lat: 27.8378, lng: 114.9108, capacity: 3200, facilities: "厂区、密闭门", access: "新钢公交直达" }
        ],
        nuclearTargets: [
            { id: "xy_nt001", name: "新余钢铁", type: "factory", risk: "high", lat: 27.8478, lng: 114.9208, radius: 6000, description: "大型钢铁企业" },
            { id: "xy_nt002", name: "新余电厂", type: "power", risk: "high", lat: 27.7878, lng: 114.9608, radius: 5000, description: "大型火力发电厂" }
        ]
    },
    "yingtan": {
        name: "鹰潭",
        center: [117.0680, 28.2609],
        shelters: [
            { id: "yt_001", name: "站江路地下掩体", type: "government", level: "核5级", lat: 28.2609, lng: 117.0680, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交站江路站" },
            { id: "yt_002", name: "龙虎山地下人防", type: "civil", level: "核6级", lat: 28.1309, lng: 117.0080, capacity: 3000, facilities: "道教圣地、独立通风", access: "龙虎山景区公交" },
            { id: "yt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 28.2509, lng: 117.0880, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "鹰潭站地下通道" },
            { id: "yt_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 28.2909, lng: 117.1080, capacity: 3000, facilities: "高铁站、深掩体", access: "鹰潭北站地下通道" }
        ],
        nuclearTargets: [
            { id: "yt_nt001", name: "鹰潭电厂", type: "power", risk: "high", lat: 28.2909, lng: 117.0780, radius: 5000, description: "大型火力发电厂" },
            { id: "yt_nt002", name: "沪昆铁路枢纽", type: "transport", risk: "high", lat: 28.2709, lng: 117.0680, radius: 4000, description: "重要铁路枢纽" }
        ]
    },
    "ganzhou": {
        name: "赣州",
        center: [114.9350, 25.8318],
        shelters: [
            { id: "gz3_001", name: "南门口地下掩体", type: "government", level: "核5级", lat: 25.8318, lng: 114.9350, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "公交南门口站" },
            { id: "gz3_002", name: "八境台地下人防", type: "civil", level: "核6级", lat: 25.8518, lng: 114.9450, capacity: 3000, facilities: "古城区、独立通风", access: "公交八境台站" },
            { id: "gz3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 25.8118, lng: 114.9550, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "赣州站地下通道" },
            { id: "gz3_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 25.7918, lng: 114.8750, capacity: 4000, facilities: "高铁站、深掩体", access: "赣州西站地下通道" },
            { id: "gz3_005", name: "瑞金地下避难所", type: "civil", level: "核6级", lat: 25.8818, lng: 116.0450, capacity: 2800, facilities: "红色景区、密闭门", access: "瑞金市公交直达" }
        ],
        nuclearTargets: [
            { id: "gz3_nt001", name: "赣州电厂", type: "power", risk: "high", lat: 25.8718, lng: 114.9650, radius: 5000, description: "大型火力发电厂" },
            { id: "gz3_nt002", name: "京九铁路桥", type: "bridge", risk: "high", lat: 25.8418, lng: 114.9350, radius: 2000, description: "战略桥梁" },
            { id: "gz3_nt003", name: "赣州港", type: "port", risk: "medium", lat: 25.7618, lng: 114.9950, radius: 4000, description: "重要内河港口" }
        ]
    },
    "jian": {
        name: "吉安",
        center: [114.9935, 27.1139],
        shelters: [
            { id: "ja_001", name: "井冈山大道地下掩体", type: "government", level: "核5级", lat: 27.1139, lng: 114.9935, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交井冈山大道站" },
            { id: "ja_002", name: "白鹭洲地下人防", type: "civil", level: "核6级", lat: 27.1339, lng: 115.0035, capacity: 2800, facilities: "洲上区、独立通风", access: "公交白鹭洲站" },
            { id: "ja_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 27.0939, lng: 115.0135, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "吉安站地下通道" },
            { id: "ja_004", name: "井冈山景区地下防护", type: "civil", level: "核6级", lat: 26.5839, lng: 114.1535, capacity: 3000, facilities: "革命圣地、密闭门", access: "井冈山景区公交" }
        ],
        nuclearTargets: [
            { id: "ja_nt001", name: "井冈山电厂", type: "power", risk: "high", lat: 27.1539, lng: 115.0235, radius: 5000, description: "大型火力发电厂" },
            { id: "ja_nt002", name: "吉安赣江大桥", type: "bridge", risk: "high", lat: 27.1239, lng: 114.9835, radius: 2000, description: "京九铁路战略桥" }
        ]
    },
    "yichun3": {
        name: "宜春",
        center: [114.4168, 27.8156],
        shelters: [
            { id: "yc3_001", name: "袁山路地下掩体", type: "government", level: "核5级", lat: 27.8156, lng: 114.4168, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交袁山路站" },
            { id: "yc3_002", name: "袁山公园地下人防", type: "civil", level: "核6级", lat: 27.8356, lng: 114.4268, capacity: 2600, facilities: "公园区、独立通风", access: "公交袁山公园站" },
            { id: "yc3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 27.7956, lng: 114.4368, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "宜春站地下通道" },
            { id: "yc3_004", name: "明月山地下防护", type: "civil", level: "核6级", lat: 27.6556, lng: 114.2668, capacity: 2800, facilities: "温泉景区、密闭门", access: "明月山景区公交" }
        ],
        nuclearTargets: [
            { id: "yc3_nt001", name: "宜春电厂", type: "power", risk: "high", lat: 27.8456, lng: 114.4468, radius: 5000, description: "大型火力发电厂" },
            { id: "yc3_nt002", name: "宜春锂矿", type: "factory", risk: "high", lat: 27.7256, lng: 114.3768, radius: 6000, description: "大型锂矿基地" }
        ]
    },
    "fuzhou2": {
        name: "抚州",
        center: [116.3581, 27.9492],
        shelters: [
            { id: "fz2_001", name: "赣东大道地下掩体", type: "government", level: "核5级", lat: 27.9492, lng: 116.3581, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交赣东大道站" },
            { id: "fz2_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 27.9692, lng: 116.3681, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "fz2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 27.9292, lng: 116.3781, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "抚州站地下通道" },
            { id: "fz2_004", name: "资溪地下防护", type: "civil", level: "核6级", lat: 27.7092, lng: 117.0681, capacity: 2200, facilities: "面包之乡、密闭门", access: "资溪县公交直达" }
        ],
        nuclearTargets: [
            { id: "fz2_nt001", name: "抚州电厂", type: "power", risk: "high", lat: 27.9792, lng: 116.3881, radius: 5000, description: "大型火力发电厂" },
            { id: "fz2_nt002", name: "向莆铁路桥", type: "bridge", risk: "high", lat: 27.9592, lng: 116.3481, radius: 2000, description: "战略桥梁" }
        ]
    },
    "shangrao": {
        name: "上饶",
        center: [117.9435, 28.4547],
        shelters: [
            { id: "sr_001", name: "中山路地下掩体", type: "government", level: "核5级", lat: 28.4547, lng: 117.9435, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交中山路站" },
            { id: "sr_002", name: "龙潭湖地下人防", type: "civil", level: "核6级", lat: 28.4747, lng: 117.9535, capacity: 2800, facilities: "湖区、独立通风", access: "公交龙潭湖站" },
            { id: "sr_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 28.4347, lng: 117.9635, capacity: 4000, facilities: "高铁枢纽、三防系统", access: "上饶站地下通道" },
            { id: "sr_004", name: "三清山地下防护", type: "civil", level: "核6级", lat: 28.9147, lng: 118.0635, capacity: 2800, facilities: "道教名山、密闭门", access: "三清山景区公交" }
        ],
        nuclearTargets: [
            { id: "sr_nt001", name: "上饶电厂", type: "power", risk: "high", lat: 28.4847, lng: 117.9735, radius: 5000, description: "大型火力发电厂" },
            { id: "sr_nt002", name: "沪昆高铁枢纽", type: "transport", risk: "high", lat: 28.4647, lng: 117.9535, radius: 4000, description: "重要高铁枢纽" },
            { id: "sr_nt003", name: "德兴铜矿", type: "factory", risk: "high", lat: 29.0047, lng: 117.7535, radius: 6000, description: "大型铜矿" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART5_CITIES;
}
