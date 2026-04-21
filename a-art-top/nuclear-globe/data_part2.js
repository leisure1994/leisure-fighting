// ============================================
// 核战争城市自救地球仪 - 数据批次2：河北省11个城市 + 山西省11个城市
// ============================================

const PART2_CITIES = {
    // ========== 河北省11个城市 ==========
    "shijiazhuang2": {
        name: "石家庄",
        center: [114.5149, 38.0423],
        shelters: [
            { id: "sjz_001", name: "新百广场地下掩体", type: "government", level: "核5级", lat: 38.0423, lng: 114.4745, capacity: 4500, facilities: "市中心、深埋18米、三防系统", access: "地铁1/3号线新百广场站D口" },
            { id: "sjz_002", name: "北国商城地下人防", type: "mall", level: "核6级", lat: 38.0489, lng: 114.5045, capacity: 4000, facilities: "商圈核心、大型通风", access: "地铁1/2号线北国商城站C口" },
            { id: "sjz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 38.0134, lng: 114.4845, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "地铁3号线石家庄站" },
            { id: "sjz_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 38.0234, lng: 114.5645, capacity: 4500, facilities: "高铁站、深掩体", access: "地铁1号线石家庄东站" },
            { id: "sjz_005", name: "正定古城地下人防", type: "civil", level: "核6级", lat: 38.1534, lng: 114.5745, capacity: 3200, facilities: "历史城区、独立通风", access: "地铁1号线福泽站" },
            { id: "sjz_006", name: "裕华万达地下避难所", type: "mall", level: "核6级", lat: 38.0234, lng: 114.5245, capacity: 3500, facilities: "商圈地下、医疗点", access: "地铁1号线裕华路站" },
            { id: "sjz_007", name: "桥西地下防护", type: "civil", level: "核6级", lat: 38.0234, lng: 114.4445, capacity: 2800, facilities: "老城区、密闭结构", access: "地铁3号线西三教站" },
            { id: "sjz_008", name: "长安地下人防", type: "civil", level: "核6级", lat: 38.0434, lng: 114.5345, capacity: 3000, facilities: "行政区、滤毒设备", access: "地铁1号线博物院站" },
            { id: "sjz_009", name: "新华地下避难所", type: "civil", level: "核6级", lat: 38.0634, lng: 114.4545, capacity: 2600, facilities: "北部城区、大型储水", access: "地铁3号线市庄站" },
            { id: "sjz_010", name: "藁城地下防护", type: "civil", level: "核6级", lat: 38.0134, lng: 114.6745, capacity: 2400, facilities: "东部新区、应急照明", access: "藁城区公交直达" },
            { id: "sjz_011", name: "鹿泉地下人防", type: "civil", level: "核6级", lat: 38.0934, lng: 114.3145, capacity: 2200, facilities: "西部城区、独立通风", access: "鹿泉区公交直达" }
        ],
        nuclearTargets: [
            { id: "sjz_nt001", name: "石家庄热电厂", type: "power", risk: "high", lat: 38.0634, lng: 114.4245, radius: 5000, description: "大型热电联产厂" },
            { id: "sjz_nt002", name: "石家庄自来水厂", type: "water", risk: "high", lat: 38.0334, lng: 114.4945, radius: 3000, description: "主要供水厂" },
            { id: "sjz_nt003", name: "正定国际机场", type: "transport", risk: "high", lat: 38.2834, lng: 114.7045, radius: 5000, description: "国内航空枢纽" },
            { id: "sjz_nt004", name: "石家庄炼油厂", type: "chemical", risk: "high", lat: 38.0034, lng: 114.3645, radius: 8000, description: "大型炼油基地" }
        ]
    },
    "tangshan": {
        name: "唐山",
        center: [118.1812, 39.6305],
        shelters: [
            { id: "ts_001", name: "新华道地下掩体", type: "government", level: "核5级", lat: 39.6305, lng: 118.1612, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "公交新华道站" },
            { id: "ts_002", name: "世博广场地下人防", type: "mall", level: "核6级", lat: 39.6205, lng: 118.1812, capacity: 3500, facilities: "商圈地下、大型通风", access: "公交世博广场站" },
            { id: "ts_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 39.6105, lng: 118.1912, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "唐山站地下通道" },
            { id: "ts_004", name: "开滦地下防护", type: "civil", level: "核6级", lat: 39.6405, lng: 118.2012, capacity: 3000, facilities: "矿区、深埋结构", access: "公交开滦矿务局站" },
            { id: "ts_005", name: "丰南地下人防", type: "civil", level: "核6级", lat: 39.5505, lng: 118.1312, capacity: 2800, facilities: "南部城区、密闭门", access: "丰南区公交直达" },
            { id: "ts_006", name: "丰润地下避难所", type: "civil", level: "核6级", lat: 39.8205, lng: 118.1612, capacity: 2600, facilities: "北部城区、医疗点", access: "丰润区公交直达" },
            { id: "ts_007", name: "古冶地下防护", type: "civil", level: "核6级", lat: 39.7305, lng: 118.4512, capacity: 2400, facilities: "工业区、滤毒通风", access: "古冶区公交直达" },
            { id: "ts_008", name: "曹妃甸地下人防", type: "civil", level: "核6级", lat: 39.2805, lng: 118.4512, capacity: 3200, facilities: "港区、大型储水", access: "曹妃甸公交直达" }
        ],
        nuclearTargets: [
            { id: "ts_nt001", name: "陡河电厂", type: "power", risk: "high", lat: 39.6505, lng: 118.2212, radius: 5000, description: "大型火力发电厂" },
            { id: "ts_nt002", name: "唐山港", type: "port", risk: "high", lat: 39.2305, lng: 118.0212, radius: 5000, description: "京唐港区" },
            { id: "ts_nt003", name: "曹妃甸LNG接收站", type: "gas", risk: "high", lat: 39.2505, lng: 118.1212, radius: 4000, description: "天然气接收站" },
            { id: "ts_nt004", name: "开滦煤矿", type: "factory", risk: "medium", lat: 39.6705, lng: 118.2112, radius: 3000, description: "大型煤矿" }
        ]
    },
    "baoding": {
        name: "保定",
        center: [115.4646, 38.8740],
        shelters: [
            { id: "bd_001", name: "万博广场地下掩体", type: "government", level: "核5级", lat: 38.8740, lng: 115.4446, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交万博广场站" },
            { id: "bd_002", name: "裕华路地下人防", type: "civil", level: "核6级", lat: 38.8840, lng: 115.4646, capacity: 3000, facilities: "主干道、大型通风", access: "公交裕华路站" },
            { id: "bd_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 38.8640, lng: 115.4746, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "保定站地下通道" },
            { id: "bd_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 38.8240, lng: 115.5146, capacity: 4000, facilities: "高铁站、深掩体", access: "保定东站地下通道" },
            { id: "bd_005", name: "竞秀地下人防", type: "civil", level: "核6级", lat: 38.8940, lng: 115.4346, capacity: 2800, facilities: "公园区、独立通风", access: "公交竞秀公园站" },
            { id: "bd_006", name: "莲池地下避难所", type: "civil", level: "核6级", lat: 38.8940, lng: 115.4846, capacity: 2600, facilities: "古城区、密闭结构", access: "公交古莲花池站" },
            { id: "bd_007", name: "高新地下防护", type: "civil", level: "核6级", lat: 38.9340, lng: 115.4846, capacity: 2400, facilities: "开发区、滤毒设备", access: "高新区公交直达" }
        ],
        nuclearTargets: [
            { id: "bd_nt001", name: "保定热电厂", type: "power", risk: "high", lat: 38.8540, lng: 115.4946, radius: 5000, description: "大型热电厂" },
            { id: "bd_nt002", name: "保定自来水厂", type: "water", risk: "high", lat: 38.8840, lng: 115.4546, radius: 3000, description: "主要供水厂" },
            { id: "bd_nt003", name: "京石高速大桥", type: "bridge", risk: "medium", lat: 38.8740, lng: 115.3846, radius: 2000, description: "战略桥梁" }
        ]
    },
    "qinhuangdao": {
        name: "秦皇岛",
        center: [119.6005, 39.9354],
        shelters: [
            { id: "qhd_001", name: "海港区地下掩体", type: "government", level: "核5级", lat: 39.9354, lng: 119.6005, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "公交海港区站" },
            { id: "qhd_002", name: "北戴河地下人防", type: "civil", level: "核6级", lat: 39.8354, lng: 119.4805, capacity: 3500, facilities: "旅游区、独立通风", access: "北戴河火车站" },
            { id: "qhd_003", name: "山海关地下避难所", type: "civil", level: "核6级", lat: 40.0054, lng: 119.7505, capacity: 3000, facilities: "关城区、深埋结构", access: "山海关火车站" },
            { id: "qhd_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 39.9054, lng: 119.6005, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "秦皇岛站地下通道" },
            { id: "qhd_005", name: "开发区地下人防", type: "civil", level: "核6级", lat: 39.9554, lng: 119.6305, capacity: 2800, facilities: "工业区、密闭门", access: "开发区公交直达" }
        ],
        nuclearTargets: [
            { id: "qhd_nt001", name: "秦皇岛港", type: "port", risk: "high", lat: 39.9454, lng: 119.6105, radius: 5000, description: "重要能源港" },
            { id: "qhd_nt001", name: "山海关船厂", type: "factory", risk: "high", lat: 39.9854, lng: 119.7705, radius: 4000, description: "大型船舶制造" },
            { id: "qhd_nt003", name: "抚宁核电厂", type: "nuclear", risk: "critical", lat: 40.0254, lng: 119.3505, radius: 10000, description: "规划核电厂" }
        ]
    },
    "handan": {
        name: "邯郸",
        center: [114.4905, 36.6093],
        shelters: [
            { id: "hd_001", name: "新世纪地下掩体", type: "government", level: "核5级", lat: 36.6093, lng: 114.4705, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交新世纪广场站" },
            { id: "hd_002", name: "丛台公园地下人防", type: "civil", level: "核6级", lat: 36.6293, lng: 114.4805, capacity: 3000, facilities: "公园区、大型通风", access: "公交丛台公园站" },
            { id: "hd_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 36.5993, lng: 114.5005, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "邯郸站地下通道" },
            { id: "hd_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 36.5793, lng: 114.5605, capacity: 4000, facilities: "高铁站、深掩体", access: "邯郸东站地下通道" },
            { id: "hd_005", name: "邯山地下人防", type: "civil", level: "核6级", lat: 36.5893, lng: 114.4905, capacity: 2600, facilities: "商业区、密闭结构", access: "邯山区公交直达" }
        ],
        nuclearTargets: [
            { id: "hd_nt001", name: "邯郸热电厂", type: "power", risk: "high", lat: 36.6393, lng: 114.5105, radius: 5000, description: "大型热电厂" },
            { id: "hd_nt002", name: "邯郸钢铁厂", type: "factory", risk: "high", lat: 36.6293, lng: 114.5305, radius: 6000, description: "大型钢铁企业" },
            { id: "hd_nt003", name: "青兰高速大桥", type: "bridge", risk: "medium", lat: 36.6093, lng: 114.4205, radius: 2000, description: "战略桥梁" }
        ]
    },
    "xingtai": {
        name: "邢台",
        center: [114.5047, 37.0660],
        shelters: [
            { id: "xt_001", name: "中北商城地下掩体", type: "government", level: "核5级", lat: 37.0660, lng: 114.4847, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交中北商城站" },
            { id: "xt_002", name: "达活泉地下人防", type: "civil", level: "核6级", lat: 37.0860, lng: 114.4947, capacity: 2600, facilities: "公园区、独立通风", access: "公交达活泉站" },
            { id: "xt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.0460, lng: 114.5047, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "邢台站地下通道" },
            { id: "xt_004", name: "桥西地下防护", type: "civil", level: "核6级", lat: 37.0760, lng: 114.4747, capacity: 2400, facilities: "城区、密闭门", access: "桥西区公交直达" }
        ],
        nuclearTargets: [
            { id: "xt_nt001", name: "邢台热电厂", type: "power", risk: "high", lat: 37.0960, lng: 114.5147, radius: 5000, description: "大型热电厂" },
            { id: "xt_nt002", name: "邢钢", type: "factory", risk: "high", lat: 37.0560, lng: 114.5247, radius: 6000, description: "大型钢铁企业" }
        ]
    },
    "baoding2": {
        name: "张家口",
        center: [114.8875, 40.7676],
        shelters: [
            { id: "zjk_001", name: "桥西地下掩体", type: "government", level: "核5级", lat: 40.7676, lng: 114.8675, capacity: 3200, facilities: "市中心、深埋18米、三防系统", access: "公交桥西站" },
            { id: "zjk_002", name: "堡子里地下人防", type: "civil", level: "核6级", lat: 40.7776, lng: 114.8775, capacity: 2800, facilities: "古堡区、独立通风", access: "公交堡子里站" },
            { id: "zjk_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.7476, lng: 114.8875, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "张家口站地下通道" },
            { id: "zjk_004", name: "崇礼地下防护", type: "civil", level: "核6级", lat: 40.9176, lng: 115.2675, capacity: 2600, facilities: "滑雪区、密闭结构", access: "崇礼区公交直达" }
        ],
        nuclearTargets: [
            { id: "zjk_nt001", name: "大唐张家口电厂", type: "power", risk: "high", lat: 40.7876, lng: 114.9075, radius: 5000, description: "大型火力发电厂" },
            { id: "zjk_nt002", name: "京张高速大桥", type: "bridge", risk: "medium", lat: 40.8176, lng: 114.8475, radius: 2000, description: "战略桥梁" }
        ]
    },
    "chengde": {
        name: "承德",
        center: [117.9328, 40.9510],
        shelters: [
            { id: "cd_001", name: "避暑山庄地下掩体", type: "government", level: "核5级", lat: 40.9710, lng: 117.9128, capacity: 3000, facilities: "旅游区、深埋18米、三防系统", access: "公交避暑山庄站" },
            { id: "cd_002", name: "南营子地下人防", type: "civil", level: "核6级", lat: 40.9610, lng: 117.9328, capacity: 2600, facilities: "商业区、独立通风", access: "公交南营子站" },
            { id: "cd_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.9410, lng: 117.9428, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "承德站地下通道" },
            { id: "cd_004", name: "双滦地下防护", type: "civil", level: "核6级", lat: 40.9310, lng: 117.8728, capacity: 2400, facilities: "开发区、密闭门", access: "双滦区公交直达" }
        ],
        nuclearTargets: [
            { id: "cd_nt001", name: "滦河电厂", type: "power", risk: "high", lat: 40.9510, lng: 117.9528, radius: 5000, description: "大型火力发电厂" },
            { id: "cd_nt002", name: "承德避暑山庄机场", type: "transport", risk: "medium", lat: 40.9910, lng: 117.9928, radius: 4000, description: "国内机场" }
        ]
    },
    "cangzhou": {
        name: "沧州",
        center: [116.8388, 38.3037],
        shelters: [
            { id: "cz_001", name: "新华路地下掩体", type: "government", level: "核5级", lat: 38.3037, lng: 116.8188, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交新华路站" },
            { id: "cz_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 38.2937, lng: 116.8388, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "沧州站地下通道" },
            { id: "cz_003", name: "西站地下避难所", type: "transport", level: "核5级", lat: 38.2837, lng: 116.8988, capacity: 3500, facilities: "高铁站、深掩体", access: "沧州西站地下通道" },
            { id: "cz_004", name: "黄骅港地下防护", type: "civil", level: "核6级", lat: 38.3637, lng: 117.3388, capacity: 3200, facilities: "港区、密闭结构", access: "黄骅港公交直达" }
        ],
        nuclearTargets: [
            { id: "cz_nt001", name: "国华沧东电厂", type: "power", risk: "high", lat: 38.3237, lng: 117.3288, radius: 5000, description: "大型火力发电厂" },
            { id: "cz_nt002", name: "黄骅港", type: "port", risk: "high", lat: 38.3537, lng: 117.3488, radius: 5000, description: "重要港口" }
        ]
    },
    "langfang": {
        name: "廊坊",
        center: [116.6838, 39.5380],
        shelters: [
            { id: "lf_001", name: "万达广场地下掩体", type: "government", level: "核5级", lat: 39.5380, lng: 116.6638, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交万达广场站" },
            { id: "lf_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 39.5280, lng: 116.6838, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "廊坊站地下通道" },
            { id: "lf_003", name: "北站地下避难所", type: "transport", level: "核5级", lat: 39.5180, lng: 116.7338, capacity: 3000, facilities: "高铁站、深掩体", access: "廊坊北站地下通道" },
            { id: "lf_004", name: "燕郊地下防护", type: "civil", level: "核6级", lat: 39.9380, lng: 116.7838, capacity: 2600, facilities: "卫星城、密闭门", access: "燕郊公交直达" }
        ],
        nuclearTargets: [
            { id: "lf_nt001", name: "华能廊坊热电厂", type: "power", risk: "high", lat: 39.5580, lng: 116.7038, radius: 5000, description: "大型热电厂" },
            { id: "lf_nt002", name: "京沪高速大桥", type: "bridge", risk: "medium", lat: 39.5680, lng: 116.6438, radius: 2000, description: "战略桥梁" }
        ]
    },
    "hengshui": {
        name: "衡水",
        center: [115.6860, 37.7350],
        shelters: [
            { id: "hs_001", name: "百货大楼地下掩体", type: "government", level: "核5级", lat: 37.7350, lng: 115.6660, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交百货大楼站" },
            { id: "hs_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 37.7250, lng: 115.6860, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "衡水站地下通道" },
            { id: "hs_003", name: "北站地下避难所", type: "transport", level: "核5级", lat: 37.7150, lng: 115.7460, capacity: 3000, facilities: "高铁站、深掩体", access: "衡水北站地下通道" },
            { id: "hs_004", name: "冀州地下防护", type: "civil", level: "核6级", lat: 37.5850, lng: 115.5860, capacity: 2400, facilities: "古城区、密闭门", access: "冀州区公交直达" }
        ],
        nuclearTargets: [
            { id: "hs_nt001", name: "衡水热电厂", type: "power", risk: "high", lat: 37.7550, lng: 115.7060, radius: 5000, description: "大型热电厂" },
            { id: "hs_nt002", name: "衡水湖大桥", type: "bridge", risk: "medium", lat: 37.6750, lng: 115.6560, radius: 2000, description: "战略桥梁" }
        ]
    },

    // ========== 山西省11个城市 ==========
    "taiyuan": {
        name: "太原",
        center: [112.5489, 37.8706],
        shelters: [
            { id: "ty_001", name: "五一广场地下掩体", type: "government", level: "核5级", lat: 37.8706, lng: 112.5489, capacity: 5000, facilities: "市中心、深埋20米、三防系统", access: "地铁1号线五一广场站" },
            { id: "ty_002", name: "柳巷地下人防", type: "mall", level: "核6级", lat: 37.8806, lng: 112.5389, capacity: 4500, facilities: "商圈核心、大型通风", access: "地铁2号线府西街站" },
            { id: "ty_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.8606, lng: 112.5589, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "太原站地下通道" },
            { id: "ty_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 37.7906, lng: 112.6089, capacity: 7000, facilities: "高铁枢纽、深掩体", access: "太原南站地下通道" },
            { id: "ty_005", name: "迎泽公园地下人防", type: "civil", level: "核6级", lat: 37.8506, lng: 112.5489, capacity: 4000, facilities: "公园区、独立通风", access: "地铁1号线大南门站" },
            { id: "ty_006", name: "晋祠地下避难所", type: "civil", level: "核6级", lat: 37.7006, lng: 112.4389, capacity: 3500, facilities: "景区地下、密闭结构", access: "晋祠公交直达" },
            { id: "ty_007", name: "小店地下防护", type: "civil", level: "核6级", lat: 37.7506, lng: 112.5689, capacity: 3200, facilities: "新区、滤毒设备", access: "地铁2号线小店站" },
            { id: "ty_008", name: "万柏林地下人防", type: "civil", level: "核6级", lat: 37.8706, lng: 112.4989, capacity: 3000, facilities: "工业区、大型储水", access: "地铁1号线下元站" },
            { id: "ty_009", name: "尖草坪地下避难所", type: "civil", level: "核6级", lat: 37.9306, lng: 112.5289, capacity: 2800, facilities: "北部城区、医疗点", access: "地铁2号线尖草坪站" },
            { id: "ty_010", name: "武宿机场地下人防", type: "transport", level: "核5级", lat: 37.7606, lng: 112.6289, capacity: 4500, facilities: "机场深层掩体", access: "太原武宿机场T1/T2" }
        ],
        nuclearTargets: [
            { id: "ty_nt001", name: "太原第一热电厂", type: "power", risk: "high", lat: 37.8306, lng: 112.5889, radius: 5000, description: "大型热电厂" },
            { id: "ty_nt002", name: "太原钢铁集团", type: "factory", risk: "high", lat: 37.9106, lng: 112.5289, radius: 6000, description: "特大型钢铁企业" },
            { id: "ty_nt003", name: "太原自来水厂", type: "water", risk: "high", lat: 37.8506, lng: 112.5589, radius: 3000, description: "主要供水厂" },
            { id: "ty_nt004", name: "武宿国际机场", type: "transport", risk: "high", lat: 37.7606, lng: 112.6289, radius: 5000, description: "国内航空枢纽" },
            { id: "ty_nt005", name: "太钢不锈钢", type: "factory", risk: "high", lat: 37.9206, lng: 112.5189, radius: 6000, description: "大型不锈钢基地" }
        ]
    },
    "datong": {
        name: "大同",
        center: [113.3000, 40.0768],
        shelters: [
            { id: "dt_001", name: "华严寺地下掩体", type: "government", level: "核5级", lat: 40.0768, lng: 113.2800, capacity: 4000, facilities: "古城区、深埋20米、三防系统", access: "公交华严寺站" },
            { id: "dt_002", name: "云冈地下人防", type: "civil", level: "核6级", lat: 40.1168, lng: 113.2300, capacity: 3500, facilities: "石窟区、独立通风", access: "公交云冈石窟站" },
            { id: "dt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 40.0668, lng: 113.3100, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "大同站地下通道" },
            { id: "dt_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 40.0468, lng: 113.3600, capacity: 4000, facilities: "高铁站、深掩体", access: "大同南站地下通道" },
            { id: "dt_005", name: "矿区地下人防", type: "civil", level: "核6级", lat: 40.0168, lng: 113.2700, capacity: 4500, facilities: "煤矿区、密闭门", access: "矿区公交直达" },
            { id: "dt_006", name: "新荣地下避难所", type: "civil", level: "核6级", lat: 40.1568, lng: 113.2200, capacity: 2800, facilities: "北部城区、大型储水", access: "新荣区公交直达" }
        ],
        nuclearTargets: [
            { id: "dt_nt001", name: "大同二电厂", type: "power", risk: "high", lat: 40.0968, lng: 113.3200, radius: 5000, description: "大型火力发电厂" },
            { id: "dt_nt002", name: "大同煤矿集团", type: "factory", risk: "high", lat: 40.0368, lng: 113.2900, radius: 6000, description: "特大型煤矿" },
            { id: "dt_nt003", name: "大同云冈机场", type: "transport", risk: "medium", lat: 40.0568, lng: 113.4800, radius: 4000, description: "国内机场" }
        ]
    },
    "yangquan": {
        name: "阳泉",
        center: [113.5806, 37.8569],
        shelters: [
            { id: "yq_001", name: "阳泉站地下掩体", type: "government", level: "核5级", lat: 37.8569, lng: 113.5606, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交阳泉站" },
            { id: "yq_002", name: "南山公园地下人防", type: "civil", level: "核6级", lat: 37.8769, lng: 113.5706, capacity: 2600, facilities: "公园区、独立通风", access: "公交南山公园站" },
            { id: "yq_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.8469, lng: 113.5806, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "阳泉站地下通道" },
            { id: "yq_004", name: "矿区地下防护", type: "civil", level: "核6级", lat: 37.8169, lng: 113.5506, capacity: 3200, facilities: "煤矿区、密闭门", access: "矿区公交直达" }
        ],
        nuclearTargets: [
            { id: "yq_nt001", name: "阳泉电厂", type: "power", risk: "high", lat: 37.8769, lng: 113.6006, radius: 5000, description: "大型火力发电厂" },
            { id: "yq_nt002", name: "阳泉煤业", type: "factory", risk: "high", lat: 37.8269, lng: 113.5806, radius: 6000, description: "大型煤矿" }
        ]
    },
    "changzhi": {
        name: "长治",
        center: [113.1163, 36.1954],
        shelters: [
            { id: "cz2_001", name: "八一广场地下掩体", type: "government", level: "核5级", lat: 36.1954, lng: 113.1163, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交八一广场站" },
            { id: "cz2_002", name: "太行公园地下人防", type: "civil", level: "核6级", lat: 36.2154, lng: 113.1263, capacity: 3000, facilities: "公园区、独立通风", access: "公交太行公园站" },
            { id: "cz2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 36.1754, lng: 113.1363, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "长治站地下通道" },
            { id: "cz2_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 36.1554, lng: 113.1763, capacity: 3500, facilities: "高铁站、深掩体", access: "长治东站地下通道" }
        ],
        nuclearTargets: [
            { id: "cz2_nt001", name: "漳泽电厂", type: "power", risk: "high", lat: 36.2354, lng: 113.1463, radius: 5000, description: "大型火力发电厂" },
            { id: "cz2_nt002", name: "潞安煤矿", type: "factory", risk: "high", lat: 36.1254, lng: 113.1563, radius: 6000, description: "大型煤矿" },
            { id: "cz2_nt003", name: "长治王村机场", type: "transport", risk: "medium", lat: 36.1854, lng: 113.0663, radius: 4000, description: "国内机场" }
        ]
    },
    "jincheng": {
        name: "晋城",
        center: [112.8513, 35.4904],
        shelters: [
            { id: "jc_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 35.4904, lng: 112.8513, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交人民广场站" },
            { id: "jc_002", name: "泽州公园地下人防", type: "civil", level: "核6级", lat: 35.5104, lng: 112.8613, capacity: 2600, facilities: "公园区、独立通风", access: "公交泽州公园站" },
            { id: "jc_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 35.4704, lng: 112.8713, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "晋城站地下通道" },
            { id: "jc_004", name: "矿区地下防护", type: "civil", level: "核6级", lat: 35.4304, lng: 112.8213, capacity: 3200, facilities: "无烟煤矿区、密闭门", access: "矿区公交直达" }
        ],
        nuclearTargets: [
            { id: "jc_nt001", name: "晋城热电厂", type: "power", risk: "high", lat: 35.5304, lng: 112.8813, radius: 5000, description: "大型火力发电厂" },
            { id: "jc_nt002", name: "晋城无烟煤矿", type: "factory", risk: "high", lat: 35.4504, lng: 112.7913, radius: 6000, description: "大型无烟煤矿" }
        ]
    },
    "shuozhou": {
        name: "朔州",
        center: [112.4333, 39.3316],
        shelters: [
            { id: "sz3_001", name: "民福街地下掩体", type: "government", level: "核5级", lat: 39.3316, lng: 112.4333, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交民福街站" },
            { id: "sz3_002", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 39.3516, lng: 112.4433, capacity: 2400, facilities: "公园区、独立通风", access: "公交人民公园站" },
            { id: "sz3_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 39.3116, lng: 112.4533, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "朔州站地下通道" }
        ],
        nuclearTargets: [
            { id: "sz3_nt001", name: "神头电厂", type: "power", risk: "high", lat: 39.3716, lng: 112.4833, radius: 5000, description: "大型火力发电厂" },
            { id: "sz3_nt002", name: "平朔煤矿", type: "factory", risk: "high", lat: 39.3916, lng: 112.3533, radius: 6000, description: "特大型露天煤矿" }
        ]
    },
    "jinzhong": {
        name: "晋中",
        center: [112.7365, 37.6870],
        shelters: [
            { id: "jz_001", name: "榆次老城地下掩体", type: "government", level: "核5级", lat: 37.6870, lng: 112.7365, capacity: 3000, facilities: "古城区、深埋18米、三防系统", access: "公交榆次老城站" },
            { id: "jz_002", name: "大学城地下人防", type: "civil", level: "核6级", lat: 37.6670, lng: 112.7565, capacity: 3500, facilities: "教育园区、独立通风", access: "公交大学城站" },
            { id: "jz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.7070, lng: 112.7265, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "榆次站地下通道" },
            { id: "jz_004", name: "平遥古城地下防护", type: "civil", level: "核6级", lat: 37.2010, lng: 112.1765, capacity: 3200, facilities: "世界文化遗产地下、密闭门", access: "平遥公交直达" }
        ],
        nuclearTargets: [
            { id: "jz_nt001", name: "榆次热电厂", type: "power", risk: "high", lat: 37.7170, lng: 112.7665, radius: 5000, description: "大型热电厂" },
            { id: "jz_nt002", name: "平遥古城", type: "cultural", risk: "medium", lat: 37.2010, lng: 112.1765, radius: 2000, description: "世界文化遗产" }
        ]
    },
    "yuncheng": {
        name: "运城",
        center: [111.0072, 35.0263],
        shelters: [
            { id: "yc_001", name: "南风广场地下掩体", type: "government", level: "核5级", lat: 35.0263, lng: 111.0072, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交南风广场站" },
            { id: "yc_002", name: "盐湖地下人防", type: "civil", level: "核6级", lat: 35.0463, lng: 111.0172, capacity: 2600, facilities: "盐湖区、独立通风", access: "公交盐湖站" },
            { id: "yc_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 35.0063, lng: 111.0272, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "运城站地下通道" },
            { id: "yc_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 35.0363, lng: 111.0872, capacity: 3000, facilities: "高铁站、深掩体", access: "运城北站地下通道" },
            { id: "yc_005", name: "永济地下避难所", type: "civil", level: "核6级", lat: 34.8663, lng: 110.4472, capacity: 2400, facilities: "古城区、密闭门", access: "永济公交直达" }
        ],
        nuclearTargets: [
            { id: "yc_nt001", name: "运城电厂", type: "power", risk: "high", lat: 35.0663, lng: 111.0372, radius: 5000, description: "大型火力发电厂" },
            { id: "yc_nt002", name: "解州关帝庙", type: "cultural", risk: "medium", lat: 34.9163, lng: 110.8472, radius: 2000, description: "国家重点文物" },
            { id: "yc_nt003", name: "运城关公机场", type: "transport", risk: "medium", lat: 35.1163, lng: 111.0372, radius: 4000, description: "国内机场" }
        ]
    },
    "xinzhou": {
        name: "忻州",
        center: [112.7341, 38.4164],
        shelters: [
            { id: "xz_001", name: "人民公园地下掩体", type: "government", level: "核5级", lat: 38.4164, lng: 112.7341, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交人民公园站" },
            { id: "xz_002", name: "五台山地下人防", type: "civil", level: "核6级", lat: 39.0316, lng: 113.5841, capacity: 3000, facilities: "佛教圣地地下、独立通风", access: "五台山公交直达" },
            { id: "xz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 38.3964, lng: 112.7441, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "忻州站地下通道" }
        ],
        nuclearTargets: [
            { id: "xz_nt001", name: "忻州热电厂", type: "power", risk: "high", lat: 38.4364, lng: 112.7541, radius: 5000, description: "大型热电厂" },
            { id: "xz_nt002", name: "五台山", type: "cultural", risk: "medium", lat: 39.0316, lng: 113.5841, radius: 2000, description: "世界文化遗产" }
        ]
    },
    "linfen": {
        name: "临汾",
        center: [111.5196, 36.0880],
        shelters: [
            { id: "lf2_001", name: "鼓楼地下掩体", type: "government", level: "核5级", lat: 36.0880, lng: 111.5196, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交鼓楼站" },
            { id: "lf2_002", name: "尧庙地下人防", type: "civil", level: "核6级", lat: 36.0680, lng: 111.5296, capacity: 2600, facilities: "历史区、独立通风", access: "公交尧庙站" },
            { id: "lf2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 36.1080, lng: 111.5396, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "临汾站地下通道" },
            { id: "lf2_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 36.0580, lng: 111.5896, capacity: 3000, facilities: "高铁站、深掩体", access: "临汾西站地下通道" },
            { id: "lf2_005", name: "洪洞地下避难所", type: "civil", level: "核6级", lat: 36.2580, lng: 111.6796, capacity: 2400, facilities: "大槐树区、密闭门", access: "洪洞公交直达" }
        ],
        nuclearTargets: [
            { id: "lf2_nt001", name: "临汾热电厂", type: "power", risk: "high", lat: 36.1280, lng: 111.5496, radius: 5000, description: "大型热电厂" },
            { id: "lf2_nt002", name: "霍州煤矿", type: "factory", risk: "high", lat: 36.5680, lng: 111.7196, radius: 6000, description: "大型煤矿" },
            { id: "lf2_nt003", name: "洪洞大槐树", type: "cultural", risk: "medium", lat: 36.2680, lng: 111.6696, radius: 2000, description: "全国重点文物" }
        ]
    },
    "lvliang": {
        name: "吕梁",
        center: [111.1443, 37.5193],
        shelters: [
            { id: "ll_001", name: "世纪广场地下掩体", type: "government", level: "核5级", lat: 37.5193, lng: 111.1443, capacity: 2600, facilities: "市中心、深埋18米、三防系统", access: "公交世纪广场站" },
            { id: "ll_002", name: "火车站地下人防", type: "transport", level: "核5级", lat: 37.4993, lng: 111.1543, capacity: 3000, facilities: "铁路枢纽、三防系统", access: "吕梁站地下通道" },
            { id: "ll_003", name: "汾阳地下避难所", type: "civil", level: "核6级", lat: 37.2693, lng: 111.7843, capacity: 2800, facilities: "酒都地下、密闭门", access: "汾阳公交直达" }
        ],
        nuclearTargets: [
            { id: "ll_nt001", name: "吕梁热电厂", type: "power", risk: "high", lat: 37.5393, lng: 111.1643, radius: 5000, description: "大型热电厂" },
            { id: "ll_nt002", name: "离柳煤矿", type: "factory", risk: "high", lat: 37.4893, lng: 111.1943, radius: 6000, description: "大型煤矿" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART2_CITIES;
}
