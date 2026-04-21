// ============================================
// 核战争城市自救地球仪 - 数据批次3：内蒙古12个城市 + 辽宁10个城市 + 吉林8个城市
// ============================================

const PART3_CITIES = {
    // ========== 内蒙古自治区12个城市 ==========
    "huhehaote": {
        name: "呼和浩特",
        center: [111.7492, 40.8414],
        shelters: [
            { id: "hhht_001", name: "新华广场地下掩体", type: "government", level: "核5级", lat: 40.8414, lng: 111.7492, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1/2号线新华广场站" },
            { id: "hhht_002", name: "中山路地下人防", type: "mall", level: "核6级", lat: 40.8514, lng: 111.7392, capacity: 3500, facilities: "商圈核心、大型通风", access: "地铁2号线中山路站" },
            { id: "hhht_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.8214, lng: 111.7592, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "呼和浩特站地下通道" },
            { id: "hhht_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 40.7914, lng: 111.8092, capacity: 4500, facilities: "高铁站、深掩体", access: "呼和浩特东站地下通道" },
            { id: "hhht_005", name: "内蒙古博物院地下人防", type: "government", level: "核5级", lat: 40.8414, lng: 111.7292, capacity: 3200, facilities: "文化区、独立通风", access: "地铁1号线博物院站" },
            { id: "hhht_006", name: "回民区地下避难所", type: "civil", level: "核6级", lat: 40.8314, lng: 111.6692, capacity: 3000, facilities: "老城区、密闭结构", access: "回民区公交直达" },
            { id: "hhht_007", name: "赛罕地下防护", type: "civil", level: "核6级", lat: 40.8014, lng: 111.7692, capacity: 2800, facilities: "新区、滤毒设备", access: "赛罕区公交直达" },
            { id: "hhht_008", name: "玉泉地下人防", type: "civil", level: "核6级", lat: 40.8114, lng: 111.7192, capacity: 2600, facilities: "大召区、大型储水", access: "玉泉区公交直达" },
            { id: "hhht_009", name: "白塔机场地下掩体", type: "transport", level: "核5级", lat: 40.8514, lng: 111.8392, capacity: 4000, facilities: "机场深层掩体", access: "白塔机场T1/T2" }
        ],
        nuclearTargets: [
            { id: "hhht_nt001", name: "呼和浩特热电厂", type: "power", risk: "high", lat: 40.8714, lng: 111.7692, radius: 5000, description: "大型热电厂" },
            { id: "hhht_nt002", name: "呼和浩特自来水厂", type: "water", risk: "high", lat: 40.8514, lng: 111.7392, radius: 3000, description: "主要供水厂" },
            { id: "hhht_nt003", name: "呼和浩特白塔机场", type: "transport", risk: "high", lat: 40.8514, lng: 111.8392, radius: 5000, description: "国内航空枢纽" },
            { id: "hhht_nt004", name: "金桥热电厂", type: "power", risk: "high", lat: 40.7814, lng: 111.7692, radius: 5000, description: "大型热电厂" }
        ]
    },
    "baotou": {
        name: "包头",
        center: [109.8404, 40.6574],
        shelters: [
            { id: "bt_001", name: "钢铁大街地下掩体", type: "government", level: "核5级", lat: 40.6574, lng: 109.8404, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "公交钢铁大街站" },
            { id: "bt_002", name: "八一公园地下人防", type: "civil", level: "核6级", lat: 40.6674, lng: 109.8504, capacity: 3500, facilities: "公园区、独立通风", access: "公交八一公园站" },
            { id: "bt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.6474, lng: 109.8604, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "包头站地下通道" },
            { id: "bt_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 40.5874, lng: 109.9704, capacity: 4500, facilities: "高铁站、深掩体", access: "包头东站地下通道" },
            { id: "bt_005", name: "昆都仑地下人防", type: "civil", level: "核6级", lat: 40.6774, lng: 109.7904, capacity: 3200, facilities: "工业区、密闭门", access: "昆都仑区公交直达" },
            { id: "bt_006", name: "青山地下避难所", type: "civil", level: "核6级", lat: 40.6574, lng: 109.9004, capacity: 3000, facilities: "工矿区、大型储水", access: "青山区公交直达" }
        ],
        nuclearTargets: [
            { id: "bt_nt001", name: "包头钢铁集团", type: "factory", risk: "high", lat: 40.6674, lng: 109.8004, radius: 6000, description: "特大型钢铁企业" },
            { id: "bt_nt002", name: "包头第一热电厂", type: "power", risk: "high", lat: 40.6374, lng: 109.8504, radius: 5000, description: "大型热电厂" },
            { id: "bt_nt003", name: "包西铁路枢纽", type: "transport", risk: "high", lat: 40.6474, lng: 109.8804, radius: 4000, description: "铁路枢纽" }
        ]
    },
    "chifeng": {
        name: "赤峰",
        center: [118.8867, 42.2586],
        shelters: [
            { id: "cf_001", name: "昭乌达地下掩体", type: "government", level: "核5级", lat: 42.2586, lng: 118.8867, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交昭乌达路站" },
            { id: "cf_002", name: "红山公园地下人防", type: "civil", level: "核6级", lat: 42.2786, lng: 118.8967, capacity: 2600, facilities: "公园区、独立通风", access: "公交红山公园站" },
            { id: "cf_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 42.2486, lng: 118.9067, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "赤峰站地下通道" },
            { id: "cf_004", name: "玉龙机场地下防护", type: "transport", level: "核5级", lat: 42.1586, lng: 118.9067, capacity: 3000, facilities: "机场深层掩体", access: "玉龙机场航站楼" }
        ],
        nuclearTargets: [
            { id: "cf_nt001", name: "赤峰热电厂", type: "power", risk: "high", lat: 42.2886, lng: 118.9267, radius: 5000, description: "大型热电厂" },
            { id: "cf_nt002", name: "元宝山煤矿", type: "factory", risk: "high", lat: 42.3486, lng: 118.9367, radius: 6000, description: "大型露天煤矿" }
        ]
    },
    "tongliao": {
        name: "通辽",
        center: [122.2655, 43.6174],
        shelters: [
            { id: "tl_001", name: "科尔沁地下掩体", type: "government", level: "核5级", lat: 43.6174, lng: 122.2655, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交科尔沁站" },
            { id: "tl_002", name: "西拉木伦地下人防", type: "civil", level: "核6级", lat: 43.6374, lng: 122.2755, capacity: 2600, facilities: "公园区、独立通风", access: "公交西拉木伦公园站" },
            { id: "tl_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 43.6074, lng: 122.2855, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "通辽站地下通道" },
            { id: "tl_004", name: "霍林郭勒地下防护", type: "civil", level: "核6级", lat: 45.5374, lng: 119.6555, capacity: 3000, facilities: "工矿区、密闭门", access: "霍林郭勒公交直达" }
        ],
        nuclearTargets: [
            { id: "tl_nt001", name: "通辽热电厂", type: "power", risk: "high", lat: 43.6374, lng: 122.3055, radius: 5000, description: "大型热电厂" },
            { id: "tl_nt002", name: "霍林河煤矿", type: "factory", risk: "high", lat: 45.5674, lng: 119.6755, radius: 6000, description: "特大型露天煤矿" }
        ]
    },
    "eerduosi": {
        name: "鄂尔多斯",
        center: [109.7813, 39.6083],
        shelters: [
            { id: "eeds_001", name: "康巴什地下掩体", type: "government", level: "核5级", lat: 39.6083, lng: 109.7813, capacity: 3000, facilities: "新区中心、深埋18米、三防系统", access: "康巴什公交直达" },
            { id: "eeds_002", name: "东胜地下人防", type: "civil", level: "核6级", lat: 39.8183, lng: 109.9813, capacity: 3500, facilities: "老城区、独立通风", access: "东胜公交直达" },
            { id: "eeds_003", name: "伊金霍洛地下避难所", type: "civil", level: "核6级", lat: 39.5883, lng: 109.7613, capacity: 2800, facilities: "成吉思汗陵附近、密闭门", access: "伊金霍洛旗公交" },
            { id: "eeds_004", name: "准格尔地下防护", type: "civil", level: "核6级", lat: 39.8683, lng: 111.2313, capacity: 3200, facilities: "矿区、大型储水", access: "准格尔旗公交" }
        ],
        nuclearTargets: [
            { id: "eeds_nt001", name: "鄂尔多斯电厂", type: "power", risk: "high", lat: 39.6283, lng: 109.8013, radius: 5000, description: "大型火电厂" },
            { id: "eeds_nt002", name: "神东煤矿", type: "factory", risk: "high", lat: 39.5383, lng: 110.2813, radius: 8000, description: "特大型现代化煤矿" },
            { id: "eeds_nt003", name: "准格尔煤矿", type: "factory", risk: "high", lat: 39.8883, lng: 111.2113, radius: 6000, description: "大型露天煤矿" }
        ]
    },
    "hulunbeier": {
        name: "呼伦贝尔",
        center: [119.7657, 49.2115],
        shelters: [
            { id: "hlbe_001", name: "海拉尔地下掩体", type: "government", level: "核5级", lat: 49.2115, lng: 119.7657, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "海拉尔公交直达" },
            { id: "hlbe_002", name: "成吉思汗广场地下人防", type: "civil", level: "核6级", lat: 49.2215, lng: 119.7757, capacity: 2400, facilities: "广场区、独立通风", access: "公交成吉思汗广场站" },
            { id: "hlbe_003", name: "满洲里地下避难所", type: "transport", level: "核5级", lat: 49.5915, lng: 117.4357, capacity: 3000, facilities: "口岸区、密闭门", access: "满洲里公交直达" },
            { id: "hlbe_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 49.2015, lng: 119.7857, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "海拉尔站地下通道" }
        ],
        nuclearTargets: [
            { id: "hlbe_nt001", name: "海拉尔热电厂", type: "power", risk: "high", lat: 49.2315, lng: 119.7957, radius: 5000, description: "大型热电厂" },
            { id: "hlbe_nt002", name: "满洲里口岸", type: "transport", risk: "high", lat: 49.6015, lng: 117.4457, radius: 4000, description: "重要陆路口岸" },
            { id: "hlbe_nt003", name: "伊敏河煤矿", type: "factory", risk: "high", lat: 48.7315, lng: 119.7557, radius: 6000, description: "大型露天煤矿" }
        ]
    },
    "bayannaoer": {
        name: "巴彦淖尔",
        center: [107.3852, 40.7432],
        shelters: [
            { id: "bynr_001", name: "临河地下掩体", type: "government", level: "核5级", lat: 40.7432, lng: 107.3852, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "临河公交直达" },
            { id: "bynr_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 40.7632, lng: 107.3952, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "bynr_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.7332, lng: 107.4052, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "临河站地下通道" }
        ],
        nuclearTargets: [
            { id: "bynr_nt001", name: "临河热电厂", type: "power", risk: "high", lat: 40.7632, lng: 107.4152, radius: 5000, description: "大型热电厂" },
            { id: "bynr_nt002", name: "巴彦淖尔机场", type: "transport", risk: "medium", lat: 40.8232, lng: 107.3652, radius: 4000, description: "国内机场" }
        ]
    },
    "wuhai": {
        name: "乌海",
        center: [106.7943, 39.6554],
        shelters: [
            { id: "wh2_001", name: "海勃湾地下掩体", type: "government", level: "核5级", lat: 39.6554, lng: 106.7943, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "海勃湾公交直达" },
            { id: "wh2_002", name: "乌海湖地下人防", type: "civil", level: "核6级", lat: 39.6354, lng: 106.8143, capacity: 2200, facilities: "湖滨区、独立通风", access: "乌海湖公交直达" },
            { id: "wh2_003", name: "海南地下避难所", type: "civil", level: "核6级", lat: 39.4454, lng: 106.8943, capacity: 2000, facilities: "工矿区、密闭门", access: "海南区公交直达" },
            { id: "wh2_004", name: "乌达地下防护", type: "civil", level: "核6级", lat: 39.5054, lng: 106.7243, capacity: 2200, facilities: "煤矿区、大型储水", access: "乌达区公交直达" }
        ],
        nuclearTargets: [
            { id: "wh2_nt001", name: "乌海热电厂", type: "power", risk: "high", lat: 39.6754, lng: 106.7843, radius: 5000, description: "大型热电厂" },
            { id: "wh2_nt002", name: "乌海煤矿", type: "factory", risk: "high", lat: 39.5554, lng: 106.7543, radius: 6000, description: "大型焦煤基地" }
        ]
    },
    "alashanmeng": {
        name: "阿拉善盟",
        center: [105.7281, 38.8470],
        shelters: [
            { id: "als_001", name: "巴彦浩特地下掩体", type: "government", level: "核5级", lat: 38.8470, lng: 105.7281, capacity: 2000, facilities: "盟府中心、深埋18米、三防系统", access: "阿拉善左旗公交直达" },
            { id: "als_002", name: "额济纳地下人防", type: "civil", level: "核6级", lat: 41.9570, lng: 101.0681, capacity: 1800, facilities: "卫星发射附近、密闭门", access: "额济纳旗公交直达" },
            { id: "als_003", name: "东风航天城地下避难所", type: "military", level: "核4级", lat: 40.9570, lng: 100.3681, capacity: 5000, facilities: "军事区、顶级防护", access: "军事管理区" }
        ],
        nuclearTargets: [
            { id: "als_nt001", name: "东风航天城", type: "military", risk: "critical", lat: 40.9570, lng: 100.3681, radius: 8000, description: "卫星发射中心" },
            { id: "als_nt002", name: "阿拉善机场", type: "transport", risk: "medium", lat: 38.8770, lng: 105.7481, radius: 4000, description: "国内机场" }
        ]
    },
    "xinganmeng": {
        name: "兴安盟",
        center: [122.0685, 46.0776],
        shelters: [
            { id: "xam_001", name: "乌兰浩特地下掩体", type: "government", level: "核5级", lat: 46.0776, lng: 122.0685, capacity: 2400, facilities: "盟府中心、深埋18米、三防系统", access: "乌兰浩特公交直达" },
            { id: "xam_002", name: "成吉思汗庙地下人防", type: "civil", level: "核6级", lat: 46.0876, lng: 122.0785, capacity: 2200, facilities: "文化区、独立通风", access: "公交成吉思汗庙站" },
            { id: "xam_003", name: "阿尔山地下避难所", type: "civil", level: "核6级", lat: 47.1776, lng: 119.9385, capacity: 2000, facilities: "旅游区、密闭门", access: "阿尔山市公交直达" }
        ],
        nuclearTargets: [
            { id: "xam_nt001", name: "乌兰浩特热电厂", type: "power", risk: "high", lat: 46.0976, lng: 122.0885, radius: 5000, description: "大型热电厂" },
            { id: "xam_nt002", name: "阿尔山机场", type: "transport", risk: "medium", lat: 47.1876, lng: 119.9285, radius: 4000, description: "国内旅游机场" }
        ]
    },
    "xilinguolemeng": {
        name: "锡林郭勒盟",
        center: [116.0476, 43.9363],
        shelters: [
            { id: "xlglm_001", name: "锡林浩特地下掩体", type: "government", level: "核5级", lat: 43.9363, lng: 116.0476, capacity: 2400, facilities: "盟府中心、深埋18米、三防系统", access: "锡林浩特公交直达" },
            { id: "xlglm_002", name: "贝子庙地下人防", type: "civil", level: "核6级", lat: 43.9563, lng: 116.0576, capacity: 2200, facilities: "寺庙区、独立通风", access: "公交贝子庙站" },
            { id: "xlglm_003", name: "二连浩特地下避难所", type: "transport", level: "核5级", lat: 43.6463, lng: 111.9776, capacity: 2800, facilities: "口岸区、密闭门", access: "二连浩特公交直达" }
        ],
        nuclearTargets: [
            { id: "xlglm_nt001", name: "锡林浩特热电厂", type: "power", risk: "high", lat: 43.9563, lng: 116.0676, radius: 5000, description: "大型热电厂" },
            { id: "xlglm_nt002", name: "二连浩特口岸", type: "transport", risk: "high", lat: 43.6563, lng: 111.9876, radius: 4000, description: "对蒙重要口岸" }
        ]
    },

    // ========== 辽宁省10个城市 ==========
    "anshan": {
        name: "鞍山",
        center: [123.0245, 41.0956],
        shelters: [
            { id: "as_001", name: "胜利广场地下掩体", type: "government", level: "核5级", lat: 41.0956, lng: 123.0245, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交胜利广场站" },
            { id: "as_002", name: "二一九公园地下人防", type: "civil", level: "核6级", lat: 41.1156, lng: 123.0345, capacity: 3000, facilities: "公园区、独立通风", access: "公交二一九公园站" },
            { id: "as_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.0756, lng: 123.0445, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "鞍山站地下通道" },
            { id: "as_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 41.0556, lng: 123.0845, capacity: 4000, facilities: "高铁站、深掩体", access: "鞍山西站地下通道" },
            { id: "as_005", name: "铁东地下人防", type: "civil", level: "核6级", lat: 41.1156, lng: 123.0645, capacity: 2800, facilities: "商业区、密闭门", access: "铁东区公交直达" }
        ],
        nuclearTargets: [
            { id: "as_nt001", name: "鞍山钢铁集团", type: "factory", risk: "high", lat: 41.1256, lng: 123.0145, radius: 6000, description: "特大型钢铁企业" },
            { id: "as_nt002", name: "鞍山热电厂", type: "power", risk: "high", lat: 41.0656, lng: 123.0545, radius: 5000, description: "大型热电厂" },
            { id: "as_nt003", name: "鞍钢矿业", type: "factory", risk: "high", lat: 41.1456, lng: 122.9945, radius: 6000, description: "大型铁矿" }
        ]
    },
    "fushun": {
        name: "抚顺",
        center: [123.9211, 41.8759],
        shelters: [
            { id: "fs2_001", name: "新抚地下掩体", type: "government", level: "核5级", lat: 41.8759, lng: 123.9211, capacity: 3200, facilities: "市中心、深埋18米、三防系统", access: "公交新抚站" },
            { id: "fs2_002", name: "劳动公园地下人防", type: "civil", level: "核6级", lat: 41.8959, lng: 123.9311, capacity: 2800, facilities: "公园区、独立通风", access: "公交劳动公园站" },
            { id: "fs2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.8559, lng: 123.9411, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "抚顺站地下通道" },
            { id: "fs2_004", name: "矿区地下防护", type: "civil", level: "核6级", lat: 41.8359, lng: 123.8811, capacity: 3500, facilities: "西露天矿附近、密闭门", access: "矿区公交直达" }
        ],
        nuclearTargets: [
            { id: "fs2_nt001", name: "抚顺石化", type: "chemical", risk: "high", lat: 41.9059, lng: 123.9511, radius: 8000, description: "大型石化基地" },
            { id: "fs2_nt002", name: "抚顺西露天矿", type: "factory", risk: "high", lat: 41.8259, lng: 123.8911, radius: 6000, description: "亚洲最大露天矿" },
            { id: "fs2_nt003", name: "抚顺热电厂", type: "power", risk: "high", lat: 41.8759, lng: 123.9611, radius: 5000, description: "大型热电厂" }
        ]
    },
    "benxi": {
        name: "本溪",
        center: [123.7705, 41.2979],
        shelters: [
            { id: "bx_001", name: "站前地下掩体", type: "government", level: "核5级", lat: 41.2979, lng: 123.7705, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交站前" },
            { id: "bx_002", name: "望溪公园地下人防", type: "civil", level: "核6级", lat: 41.3179, lng: 123.7805, capacity: 2600, facilities: "公园区、独立通风", access: "公交望溪公园站" },
            { id: "bx_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.2779, lng: 123.7905, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "本溪站地下通道" },
            { id: "bx_004", name: "溪湖地下防护", type: "civil", level: "核6级", lat: 41.3379, lng: 123.7305, capacity: 2400, facilities: "工矿区、密闭门", access: "溪湖区公交直达" }
        ],
        nuclearTargets: [
            { id: "bx_nt001", name: "本溪钢铁", type: "factory", risk: "high", lat: 41.3279, lng: 123.7505, radius: 6000, description: "大型钢铁企业" },
            { id: "bx_nt002", name: "本溪水洞", type: "water", risk: "medium", lat: 40.8679, lng: 124.0605, radius: 2000, description: "战略水源地" }
        ]
    },
    "dandong": {
        name: "丹东",
        center: [124.3547, 40.0005],
        shelters: [
            { id: "dd_001", name: "七经街地下掩体", type: "government", level: "核5级", lat: 40.0005, lng: 124.3547, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交七经街站" },
            { id: "dd_002", name: "锦江山公园地下人防", type: "civil", level: "核6级", lat: 40.0205, lng: 124.3647, capacity: 2600, facilities: "公园区、独立通风", access: "公交锦江山公园站" },
            { id: "dd_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 39.9905, lng: 124.3747, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "丹东站地下通道" },
            { id: "dd_004", name: "鸭绿江口地下防护", type: "civil", level: "核6级", lat: 39.9505, lng: 124.4147, capacity: 2400, facilities: "口岸区、密闭门", access: "江岸区公交直达" }
        ],
        nuclearTargets: [
            { id: "dd_nt001", name: "丹东港", type: "port", risk: "high", lat: 39.9205, lng: 124.4347, radius: 5000, description: "重要港口" },
            { id: "dd_nt002", name: "鸭绿江大桥", type: "bridge", risk: "high", lat: 40.0105, lng: 124.3947, radius: 2000, description: "中朝边境桥" },
            { id: "dd_nt003", name: "丹东化纤", type: "factory", risk: "medium", lat: 40.0405, lng: 124.3647, radius: 4000, description: "大型化纤企业" }
        ]
    },
    "jinzhou": {
        name: "锦州",
        center: [121.1267, 41.0951],
        shelters: [
            { id: "jz2_001", name: "中央大街地下掩体", type: "government", level: "核5级", lat: 41.0951, lng: 121.1267, capacity: 3200, facilities: "市中心、深埋18米、三防系统", access: "公交中央大街站" },
            { id: "jz2_002", name: "古塔公园地下人防", type: "civil", level: "核6级", lat: 41.1151, lng: 121.1367, capacity: 2800, facilities: "公园区、独立通风", access: "公交古塔公园站" },
            { id: "jz2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.0751, lng: 121.1467, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "锦州站地下通道" },
            { id: "jz2_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 41.0351, lng: 121.2067, capacity: 3500, facilities: "高铁站、深掩体", access: "锦州南站地下通道" },
            { id: "jz2_005", name: "辽沈战役馆地下人防", type: "civil", level: "核6级", lat: 41.1351, lng: 121.1167, capacity: 2600, facilities: "纪念区、密闭门", access: "公交辽沈战役纪念馆站" }
        ],
        nuclearTargets: [
            { id: "jz2_nt001", name: "锦州港", type: "port", risk: "high", lat: 40.9551, lng: 121.0867, radius: 5000, description: "重要能源港" },
            { id: "jz2_nt002", name: "锦州电厂", type: "power", risk: "high", lat: 41.0551, lng: 121.1667, radius: 5000, description: "大型火力发电厂" },
            { id: "jz2_nt003", name: "锦州机场", type: "transport", risk: "medium", lat: 41.1051, lng: 121.0167, radius: 4000, description: "国内机场" }
        ]
    },
    "yingkou": {
        name: "营口",
        center: [122.2352, 40.6674],
        shelters: [
            { id: "yk_001", name: "金牛山地下掩体", type: "government", level: "核5级", lat: 40.6674, lng: 122.2352, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交金牛山站" },
            { id: "yk_002", name: "辽河公园地下人防", type: "civil", level: "核6级", lat: 40.6874, lng: 122.2452, capacity: 2600, facilities: "公园区、独立通风", access: "公交辽河公园站" },
            { id: "yk_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.6474, lng: 122.2552, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "营口站地下通道" },
            { id: "yk_004", name: "鲅鱼圈地下防护", type: "civil", level: "核6级", lat: 40.2674, lng: 122.1352, capacity: 3000, facilities: "港区、密闭门", access: "鲅鱼圈公交直达" }
        ],
        nuclearTargets: [
            { id: "yk_nt001", name: "营口港", type: "port", risk: "high", lat: 40.2474, lng: 122.1152, radius: 5000, description: "重要港口" },
            { id: "yk_nt002", name: "营口电厂", type: "power", risk: "high", lat: 40.7074, lng: 122.2852, radius: 5000, description: "大型火力发电厂" },
            { id: "yk_nt003", name: "鞍钢鲅鱼圈", type: "factory", risk: "high", lat: 40.2974, lng: 122.1552, radius: 6000, description: "大型钢铁企业" }
        ]
    },
    "fuxin": {
        name: "阜新",
        center: [121.6700, 42.0217],
        shelters: [
            { id: "fx_001", name: "解放广场地下掩体", type: "government", level: "核5级", lat: 42.0217, lng: 121.6700, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交解放广场站" },
            { id: "fx_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 42.0417, lng: 121.6800, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "fx_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 42.0017, lng: 121.6900, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "阜新站地下通道" },
            { id: "fx_004", name: "海州矿地下防护", type: "civil", level: "核6级", lat: 41.9817, lng: 121.6300, capacity: 3000, facilities: "露天矿附近、密闭门", access: "海州区公交直达" }
        ],
        nuclearTargets: [
            { id: "fx_nt001", name: "阜新矿务局", type: "factory", risk: "high", lat: 42.0117, lng: 121.6500, radius: 6000, description: "大型煤矿" },
            { id: "fx_nt002", name: "阜新热电厂", type: "power", risk: "high", lat: 42.0417, lng: 121.7100, radius: 5000, description: "大型热电厂" }
        ]
    },
    "liaoyang": {
        name: "辽阳",
        center: [123.2397, 41.2673],
        shelters: [
            { id: "ly_001", name: "中华大街地下掩体", type: "government", level: "核5级", lat: 41.2673, lng: 123.2397, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交中华大街站" },
            { id: "ly_002", name: "白塔公园地下人防", type: "civil", level: "核6级", lat: 41.2873, lng: 123.2497, capacity: 2600, facilities: "公园区、独立通风", access: "公交白塔公园站" },
            { id: "ly_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.2473, lng: 123.2597, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "辽阳站地下通道" },
            { id: "ly_004", name: "弓长岭地下防护", type: "civil", level: "核6级", lat: 41.1473, lng: 123.4397, capacity: 2800, facilities: "矿区、密闭门", access: "弓长岭公交直达" }
        ],
        nuclearTargets: [
            { id: "ly_nt001", name: "辽阳石化", type: "chemical", risk: "high", lat: 41.2973, lng: 123.2697, radius: 8000, description: "大型石化基地" },
            { id: "ly_nt002", name: "辽阳钢厂", type: "factory", risk: "high", lat: 41.2673, lng: 123.2197, radius: 6000, description: "大型钢铁企业" }
        ]
    },
    "tieling": {
        name: "铁岭",
        center: [123.7260, 42.2239],
        shelters: [
            { id: "tl2_001", name: "银州地下掩体", type: "government", level: "核5级", lat: 42.2239, lng: 123.7260, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交银州站" },
            { id: "tl2_002", name: "龙首山地下人防", type: "civil", level: "核6级", lat: 42.2439, lng: 123.7360, capacity: 2400, facilities: "山区、独立通风", access: "公交龙首山站" },
            { id: "tl2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 42.2039, lng: 123.7460, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "铁岭站地下通道" },
            { id: "tl2_004", name: "调兵山地下防护", type: "civil", level: "核6级", lat: 42.4639, lng: 123.5560, capacity: 2800, facilities: "矿区、密闭门", access: "调兵山市公交直达" }
        ],
        nuclearTargets: [
            { id: "tl2_nt001", name: "清河电厂", type: "power", risk: "high", lat: 42.2839, lng: 124.0260, radius: 5000, description: "大型火力发电厂" },
            { id: "tl2_nt002", name: "铁法煤矿", type: "factory", risk: "high", lat: 42.4439, lng: 123.5660, radius: 6000, description: "大型煤矿" }
        ]
    },

    // ========== 吉林省8个城市 ==========
    "jilin": {
        name: "吉林",
        center: [126.5530, 43.8377],
        shelters: [
            { id: "jl_001", name: "世纪广场地下掩体", type: "government", level: "核5级", lat: 43.8377, lng: 126.5530, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交世纪广场站" },
            { id: "jl_002", name: "北山公园地下人防", type: "civil", level: "核6级", lat: 43.8577, lng: 126.5630, capacity: 3000, facilities: "公园区、独立通风", access: "公交北山公园站" },
            { id: "jl_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 43.8177, lng: 126.5730, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "吉林站地下通道" },
            { id: "jl_004", name: "丰满地下防护", type: "civil", level: "核6级", lat: 43.7377, lng: 126.5530, capacity: 3200, facilities: "水库区、密闭门", access: "丰满区公交直达" },
            { id: "jl_005", name: "哈达湾地下人防", type: "civil", level: "核6级", lat: 43.8777, lng: 126.5130, capacity: 2800, facilities: "工业区、大型储水", access: "昌邑区公交直达" }
        ],
        nuclearTargets: [
            { id: "jl_nt001", name: "丰满水电站", type: "power", risk: "high", lat: 43.7277, lng: 126.5430, radius: 5000, description: "大型水电站" },
            { id: "jl_nt002", name: "吉林石化", type: "chemical", risk: "high", lat: 43.7977, lng: 126.5230, radius: 8000, description: "大型石化基地" },
            { id: "jl_nt003", name: "吉林热电厂", type: "power", risk: "high", lat: 43.8577, lng: 126.5830, radius: 5000, description: "大型热电厂" }
        ]
    },
    "siping": {
        name: "四平",
        center: [124.3504, 43.1664],
        shelters: [
            { id: "sp_001", name: "英雄广场地下掩体", type: "government", level: "核5级", lat: 43.1664, lng: 124.3504, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交英雄广场站" },
            { id: "sp_002", name: "南湖公园地下人防", type: "civil", level: "核6级", lat: 43.1864, lng: 124.3604, capacity: 2600, facilities: "公园区、独立通风", access: "公交南湖公园站" },
            { id: "sp_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 43.1464, lng: 124.3704, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "四平站地下通道" },
            { id: "sp_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 43.1264, lng: 124.4104, capacity: 3000, facilities: "高铁站、深掩体", access: "四平东站地下通道" }
        ],
        nuclearTargets: [
            { id: "sp_nt001", name: "四平热电厂", type: "power", risk: "high", lat: 43.1964, lng: 124.3804, radius: 5000, description: "大型热电厂" },
            { id: "sp_nt002", name: "京哈铁路桥", type: "bridge", risk: "medium", lat: 43.1764, lng: 124.3404, radius: 2000, description: "战略桥梁" }
        ]
    },
    "liaoyuan": {
        name: "辽源",
        center: [125.1453, 42.8880],
        shelters: [
            { id: "ly2_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 42.8880, lng: 125.1453, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交人民广场站" },
            { id: "ly2_002", name: "龙山公园地下人防", type: "civil", level: "核6级", lat: 42.9080, lng: 125.1553, capacity: 2400, facilities: "公园区、独立通风", access: "公交龙山公园站" },
            { id: "ly2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 42.8680, lng: 125.1653, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "辽源站地下通道" }
        ],
        nuclearTargets: [
            { id: "ly2_nt001", name: "辽源热电厂", type: "power", risk: "high", lat: 42.9080, lng: 125.1753, radius: 5000, description: "大型热电厂" },
            { id: "ly2_nt002", name: "辽源煤矿", type: "factory", risk: "high", lat: 42.9280, lng: 125.1253, radius: 6000, description: "大型煤矿" }
        ]
    },
    "tonghua": {
        name: "通化",
        center: [125.9365, 41.7212],
        shelters: [
            { id: "th_001", name: "玉皇山地下掩体", type: "government", level: "核5级", lat: 41.7212, lng: 125.9365, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交玉皇山站" },
            { id: "th_002", name: "集贸地下人防", type: "civil", level: "核6级", lat: 41.7412, lng: 125.9465, capacity: 2400, facilities: "商业区、独立通风", access: "公交集贸站" },
            { id: "th_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.7012, lng: 125.9565, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "通化站地下通道" },
            { id: "th_004", name: "二道江地下防护", type: "civil", level: "核6级", lat: 41.7512, lng: 126.0265, capacity: 2800, facilities: "工矿区、密闭门", access: "二道江区公交直达" }
        ],
        nuclearTargets: [
            { id: "th_nt001", name: "通化钢铁", type: "factory", risk: "high", lat: 41.7612, lng: 126.0165, radius: 6000, description: "大型钢铁企业" },
            { id: "th_nt002", name: "通化热电厂", type: "power", risk: "high", lat: 41.7312, lng: 125.9665, radius: 5000, description: "大型热电厂" },
            { id: "th_nt003", name: "集安口岸", type: "transport", risk: "medium", lat: 41.1212, lng: 126.1865, radius: 4000, description: "对朝口岸" }
        ]
    },
    "baishan": {
        name: "白山",
        center: [126.4278, 41.9425],
        shelters: [
            { id: "bs_001", name: "江北地下掩体", type: "government", level: "核5级", lat: 41.9425, lng: 126.4278, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "白山公交直达" },
            { id: "bs_002", name: "北山公园地下人防", type: "civil", level: "核6级", lat: 41.9625, lng: 126.4378, capacity: 2200, facilities: "公园区、独立通风", access: "公交北山公园站" },
            { id: "bs_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 41.9225, lng: 126.4478, capacity: 2800, facilities: "铁路枢纽、三防系统", access: "白山站地下通道" },
            { id: "bs_004", name: "江源地下防护", type: "civil", level: "核6级", lat: 41.9825, lng: 126.5878, capacity: 2600, facilities: "矿区、密闭门", access: "江源区公交直达" }
        ],
        nuclearTargets: [
            { id: "bs_nt001", name: "白山热电厂", type: "power", risk: "high", lat: 41.9625, lng: 126.4578, radius: 5000, description: "大型热电厂" },
            { id: "bs_nt002", name: "通化矿务局", type: "factory", risk: "high", lat: 42.0225, lng: 126.5178, radius: 6000, description: "大型煤矿" }
        ]
    },
    "songyuan": {
        name: "松原",
        center: [124.8248, 45.1411],
        shelters: [
            { id: "sy2_001", name: "中山地下掩体", type: "government", level: "核5级", lat: 45.1411, lng: 124.8248, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "松原公交直达" },
            { id: "sy2_002", name: "江滨公园地下人防", type: "civil", level: "核6级", lat: 45.1611, lng: 124.8348, capacity: 2400, facilities: "松花江边、独立通风", access: "公交江滨公园站" },
            { id: "sy2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 45.1211, lng: 124.8448, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "松原站地下通道" },
            { id: "sy2_004", name: "宁江地下防护", type: "civil", level: "核6级", lat: 45.1811, lng: 124.8148, capacity: 2800, facilities: "油田区、密闭门", access: "宁江区公交直达" }
        ],
        nuclearTargets: [
            { id: "sy2_nt001", name: "吉林油田", type: "factory", risk: "high", lat: 45.1611, lng: 124.8548, radius: 6000, description: "大型油田" },
            { id: "sy2_nt002", name: "松原热电厂", type: "power", risk: "high", lat: 45.1011, lng: 124.8748, radius: 5000, description: "大型热电厂" }
        ]
    },
    "baicheng": {
        name: "白城",
        center: [122.8398, 45.6200],
        shelters: [
            { id: "bc_001", name: "中兴路地下掩体", type: "government", level: "核5级", lat: 45.6200, lng: 122.8398, capacity: 2400, facilities: "市中心、深埋18米、三防系统", access: "白城公交直达" },
            { id: "bc_002", name: "劳动公园地下人防", type: "civil", level: "核6级", lat: 45.6400, lng: 122.8498, capacity: 2200, facilities: "公园区、独立通风", access: "公交劳动公园站" },
            { id: "bc_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 45.6000, lng: 122.8598, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "白城站地下通道" },
            { id: "bc_004", name: "洮北地下防护", type: "civil", level: "核6级", lat: 45.6800, lng: 122.8198, capacity: 2600, facilities: "农区、密闭门", access: "洮北区公交直达" }
        ],
        nuclearTargets: [
            { id: "bc_nt001", name: "白城热电厂", type: "power", risk: "high", lat: 45.6600, lng: 122.8698, radius: 5000, description: "大型热电厂" },
            { id: "bc_nt002", name: "白城机场", type: "transport", risk: "medium", lat: 45.5000, lng: 122.8998, radius: 4000, description: "国内机场" }
        ]
    },
    "yanbian": {
        name: "延边",
        center: [129.5138, 42.9048],
        shelters: [
            { id: "yb_001", name: "延吉地下掩体", type: "government", level: "核5级", lat: 42.9048, lng: 129.5138, capacity: 2800, facilities: "州府中心、深埋18米、三防系统", access: "延吉公交直达" },
            { id: "yb_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 42.9248, lng: 129.5238, capacity: 2600, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "yb_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 42.8848, lng: 129.5338, capacity: 3200, facilities: "铁路枢纽、三防系统", access: "延吉站地下通道" },
            { id: "yb_004", name: "朝阳川机场地下防护", type: "transport", level: "核5级", lat: 42.8848, lng: 129.4738, capacity: 2800, facilities: "机场深层掩体", access: "延吉朝阳川机场" },
            { id: "yb_005", name: "珲春地下避难所", type: "civil", level: "核6级", lat: 42.8648, lng: 130.3638, capacity: 2600, facilities: "边境区、密闭门", access: "珲春市公交直达" }
        ],
        nuclearTargets: [
            { id: "yb_nt001", name: "延吉热电厂", type: "power", risk: "high", lat: 42.9348, lng: 129.5438, radius: 5000, description: "大型热电厂" },
            { id: "yb_nt002", name: "延吉机场", type: "transport", risk: "medium", lat: 42.8848, lng: 129.4738, radius: 4000, description: "国内机场" },
            { id: "yb_nt003", name: "珲春口岸", type: "transport", risk: "high", lat: 42.8748, lng: 130.3738, radius: 4000, description: "对俄口岸" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART3_CITIES;
}
