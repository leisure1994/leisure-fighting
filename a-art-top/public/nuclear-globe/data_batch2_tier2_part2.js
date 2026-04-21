// 第二批二线城市数据 - 河北/山西地区
const CITIES_BATCH2_TIER2 = {
    // ===== 河北省 =====
    "baoding": {
        name: "保定",
        center: [115.4646, 38.8739],
        shelters: [
            { id: "bd_001", name: "竞秀公园地下人防", type: "civil", level: "核6级", lat: 38.8734, lng: 115.4534, capacity: 3500, facilities: "市中心公园、深埋15米、三防系统", access: "竞秀公园地下" },
            { id: "bd_002", name: "保定火车站地下避难所", type: "transport", level: "核5级", lat: 38.8634, lng: 115.4834, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "保定站地下广场" },
            { id: "bd_003", name: "高开区地下掩体", type: "civil", level: "核6级", lat: 38.8934, lng: 115.5134, capacity: 4000, facilities: "高新区、深埋结构", access: "高新区主干道地下" },
            { id: "bd_004", name: "莲池地下人防", type: "civil", level: "核6级", lat: 38.8834, lng: 115.4734, capacity: 3200, facilities: "老城区、密闭门", access: "莲池区地下通道" },
            { id: "bd_005", name: "清苑地下避难所", type: "civil", level: "核6级", lat: 38.7634, lng: 115.5034, capacity: 2800, facilities: "新区、独立通风", access: "清苑区人防工程" },
            { id: "bd_006", name: "徐水地下防护", type: "civil", level: "核6级", lat: 38.9334, lng: 115.6534, capacity: 2600, facilities: "工业区、滤毒通风", access: "徐水区地下" },
            { id: "bd_007", name: "满城区地下人防", type: "civil", level: "核6级", lat: 38.9534, lng: 115.3234, capacity: 2400, facilities: "郊区、大型储水", access: "满城区地下" },
            { id: "bd_008", name: "保定东站地下避难所", type: "transport", level: "核5级", lat: 38.9034, lng: 115.5734, capacity: 6000, facilities: "高铁枢纽、独立供电", access: "保定东站地下" },
            { id: "bd_009", name: "河北大学地下人防", type: "civil", level: "核6级", lat: 38.9134, lng: 115.5234, capacity: 4500, facilities: "教育区、应急医疗", access: "河北大学地下" }
        ],
        nuclearTargets: [
            { id: "bd_nt001", name: "保定热电厂", type: "power", risk: "high", lat: 38.8534, lng: 115.5034, radius: 5000, description: "大型火力发电厂" },
            { id: "bd_nt002", name: "保定第一自来水厂", type: "water", risk: "high", lat: 38.8734, lng: 115.4634, radius: 3000, description: "主要供水厂" },
            { id: "bd_nt003", name: "保定炼油厂", type: "chemical", risk: "high", lat: 38.8234, lng: 115.4534, radius: 8000, description: "石油化工基地" },
            { id: "bd_nt004", name: "保定南站", type: "transport", risk: "medium", lat: 38.8434, lng: 115.4934, radius: 3000, description: "货运枢纽" },
            { id: "bd_nt005", name: "保变电气", type: "industrial", risk: "medium", lat: 38.9034, lng: 115.5134, radius: 4000, description: "大型变电站" }
        ]
    },

    "tangshan": {
        name: "唐山",
        center: [118.1802, 39.6292],
        shelters: [
            { id: "ts_001", name: "抗震纪念碑地下掩体", type: "government", level: "核5级", lat: 39.6334, lng: 118.2034, capacity: 4500, facilities: "市中心、深埋20米、三防系统", access: "抗震纪念碑广场地下" },
            { id: "ts_002", name: "唐山站地下避难所", type: "transport", level: "核5级", lat: 39.6234, lng: 118.1234, capacity: 6500, facilities: "高铁枢纽、三防系统", access: "唐山站地下广场" },
            { id: "ts_003", name: "南湖地下人防", type: "civil", level: "核6级", lat: 39.6034, lng: 118.1534, capacity: 5000, facilities: "大型公园、深埋结构", access: "南湖生态城地下" },
            { id: "ts_004", name: "路北地下防护", type: "civil", level: "核6级", lat: 39.6434, lng: 118.2034, capacity: 3800, facilities: "主城区、密闭门", access: "路北区人防工程" },
            { id: "ts_005", name: "路南地下避难所", type: "civil", level: "核6级", lat: 39.6134, lng: 118.2234, capacity: 3500, facilities: "老城区、独立通风", access: "路南区地下通道" },
            { id: "ts_006", name: "曹妃甸地下掩体", type: "industrial", level: "核5级", lat: 39.2034, lng: 118.0034, capacity: 5500, facilities: "工业区、深埋25米", access: "曹妃甸工业区地下" },
            { id: "ts_007", name: "丰南地下人防", type: "civil", level: "核6级", lat: 39.5734, lng: 118.1034, capacity: 3200, facilities: "工业区、滤毒通风", access: "丰南区地下" },
            { id: "ts_008", name: "丰润地下避难所", type: "civil", level: "核6级", lat: 39.8334, lng: 118.1534, capacity: 3000, facilities: "新区、大型储水", access: "丰润区地下" },
            { id: "ts_009", name: "古冶地下人防", type: "civil", level: "核6级", lat: 39.7334, lng: 118.4534, capacity: 2800, facilities: "矿区、加固结构", access: "古冶区地下" },
            { id: "ts_010", name: "开滦矿区地下避难所", type: "industrial", level: "核5级", lat: 39.7034, lng: 118.4034, capacity: 6000, facilities: "矿区深层、自然防护", access: "开滦矿区地下巷道" }
        ],
        nuclearTargets: [
            { id: "ts_nt001", name: "陡河电厂", type: "power", risk: "high", lat: 39.6834, lng: 118.3534, radius: 5000, description: "大型火力发电厂" },
            { id: "ts_nt002", name: "唐山自来水厂", type: "water", risk: "high", lat: 39.6434, lng: 118.1834, radius: 3000, description: "主要供水厂" },
            { id: "ts_nt003", name: "曹妃甸港", type: "port", risk: "high", lat: 39.1734, lng: 118.0034, radius: 5000, description: "重要港口" },
            { id: "ts_nt004", name: "京唐港", type: "port", risk: "high", lat: 39.2034, lng: 119.0034, radius: 5000, description: "重要港口" },
            { id: "ts_nt005", name: "唐山钢铁集团", type: "industrial", risk: "high", lat: 39.7334, lng: 118.4534, radius: 6000, description: "大型钢铁基地" },
            { id: "ts_nt006", name: "唐山港集团", type: "port", risk: "high", lat: 39.2334, lng: 119.0334, radius: 5000, description: "能源运输港" }
        ]
    },

    "handan": {
        name: "邯郸",
        center: [114.4905, 36.6123],
        shelters: [
            { id: "hd_001", name: "丛台公园地下人防", type: "civil", level: "核6级", lat: 36.6134, lng: 114.4934, capacity: 4000, facilities: "市中心公园、深埋15米", access: "丛台公园地下" },
            { id: "hd_002", name: "邯郸站地下避难所", type: "transport", level: "核5级", lat: 36.6034, lng: 114.4834, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "邯郸站地下广场" },
            { id: "hd_003", name: "邯山区地下掩体", type: "civil", level: "核6级", lat: 36.5934, lng: 114.5034, capacity: 3500, facilities: "主城区、密闭门", access: "邯山区地下通道" },
            { id: "hd_004", name: "复兴地下人防", type: "civil", level: "核6级", lat: 36.6334, lng: 114.4534, capacity: 3200, facilities: "工业区、滤毒通风", access: "复兴区地下" },
            { id: "hd_005", name: "峰峰矿区地下避难所", type: "industrial", level: "核5级", lat: 36.4234, lng: 114.2034, capacity: 5000, facilities: "矿区深层、自然防护", access: "峰峰矿区地下巷道" },
            { id: "hd_006", name: "武安地下防护", type: "civil", level: "核6级", lat: 36.7034, lng: 114.2034, capacity: 3000, facilities: "工业区、大型储水", access: "武安市地下" },
            { id: "hd_007", name: "永年地下人防", type: "civil", level: "核6级", lat: 36.7834, lng: 114.5034, capacity: 2800, facilities: "新区、独立供电", access: "永年区地下" },
            { id: "hd_008", name: "邯郸东站地下避难所", type: "transport", level: "核5级", lat: 36.6434, lng: 114.5734, capacity: 6000, facilities: "高铁枢纽、应急医疗", access: "邯郸东站地下" }
        ],
        nuclearTargets: [
            { id: "hd_nt001", name: "邯郸热电厂", type: "power", risk: "high", lat: 36.5834, lng: 114.5034, radius: 5000, description: "大型火力发电厂" },
            { id: "hd_nt002", name: "邯郸自来水厂", type: "water", risk: "high", lat: 36.6134, lng: 114.4734, radius: 3000, description: "主要供水厂" },
            { id: "hd_nt003", name: "邯郸钢铁集团", type: "industrial", risk: "high", lat: 36.6534, lng: 114.4834, radius: 6000, description: "大型钢铁基地" },
            { id: "hd_nt004", name: "峰峰煤矿", type: "industrial", risk: "medium", lat: 36.4334, lng: 114.2134, radius: 4000, description: "重要能源基地" },
            { id: "hd_nt005", name: "马头电厂", type: "power", risk: "high", lat: 36.5234, lng: 114.4534, radius: 5000, description: "火力发电厂" }
        ]
    },

    "langfang": {
        name: "廊坊",
        center: [116.7130, 39.5380],
        shelters: [
            { id: "lf_001", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 39.5434, lng: 116.7134, capacity: 3500, facilities: "市中心公园、深埋15米", access: "人民公园地下" },
            { id: "lf_002", name: "廊坊站地下避难所", type: "transport", level: "核5级", lat: 39.5334, lng: 116.6834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "廊坊站地下广场" },
            { id: "lf_003", name: "安次地下掩体", type: "civil", level: "核6级", lat: 39.5134, lng: 116.6934, capacity: 3000, facilities: "主城区、密闭门", access: "安次区地下通道" },
            { id: "lf_004", name: "广阳地下人防", type: "civil", level: "核6级", lat: 39.5534, lng: 116.7334, capacity: 3200, facilities: "新区、独立通风", access: "广阳区地下" },
            { id: "lf_005", name: "开发区地下避难所", type: "civil", level: "核6级", lat: 39.5834, lng: 116.7834, capacity: 4000, facilities: "高新区、应急照明", access: "开发区地下" },
            { id: "lf_006", name: "三河地下防护", type: "civil", level: "核6级", lat: 39.9834, lng: 117.0834, capacity: 2800, facilities: "郊区、滤毒通风", access: "三河市地下" },
            { id: "lf_007", name: "霸州地下人防", type: "civil", level: "核6级", lat: 39.1234, lng: 116.4034, capacity: 2600, facilities: "工业区、大型储水", access: "霸州市地下" },
            { id: "lf_008", name: "固安地下避难所", type: "civil", level: "核6级", lat: 39.4434, lng: 116.3034, capacity: 2500, facilities: "临京区、深埋结构", access: "固安县地下" }
        ],
        nuclearTargets: [
            { id: "lf_nt001", name: "廊坊热电厂", type: "power", risk: "high", lat: 39.5634, lng: 116.7234, radius: 5000, description: "火力发电厂" },
            { id: "lf_nt002", name: "廊坊自来水厂", type: "water", risk: "high", lat: 39.5434, lng: 116.7034, radius: 3000, description: "主要供水厂" },
            { id: "lf_nt003", name: "廊坊变电站", type: "industrial", risk: "medium", lat: 39.5734, lng: 116.7534, radius: 3000, description: "电网枢纽" },
            { id: "lf_nt004", name: "京津唐高速枢纽", type: "transport", risk: "medium", lat: 39.5534, lng: 116.7334, radius: 2000, description: "高速公路枢纽" }
        ]
    },

    "cangzhou": {
        name: "沧州",
        center: [116.8388, 38.3037],
        shelters: [
            { id: "cz_001", name: "南湖公园地下人防", type: "civil", level: "核6级", lat: 38.3134, lng: 116.8534, capacity: 3500, facilities: "市中心公园、深埋15米", access: "南湖公园地下" },
            { id: "cz_002", name: "沧州站地下避难所", type: "transport", level: "核5级", lat: 38.3034, lng: 116.8534, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "沧州站地下广场" },
            { id: "cz_003", name: "新华地下掩体", type: "civil", level: "核6级", lat: 38.3234, lng: 116.8734, capacity: 3000, facilities: "主城区、密闭门", access: "新华区地下通道" },
            { id: "cz_004", name: "运河地下人防", type: "civil", level: "核6级", lat: 38.2934, lng: 116.8334, capacity: 3200, facilities: "老城区、滤毒通风", access: "运河区地下" },
            { id: "cz_005", name: "黄骅港地下避难所", type: "port", level: "核5级", lat: 38.3734, lng: 117.3534, capacity: 4500, facilities: "港口区、独立供电", access: "黄骅港地下" },
            { id: "cz_006", name: "任丘地下防护", type: "civil", level: "核6级", lat: 38.7034, lng: 116.1034, capacity: 3200, facilities: "油田区、大型储水", access: "任丘市地下" },
            { id: "cz_007", name: "泊头地下人防", type: "civil", level: "核6级", lat: 38.0834, lng: 116.5834, capacity: 2600, facilities: "工业区、深埋结构", access: "泊头市地下" },
            { id: "cz_008", name: "渤海新区地下掩体", type: "industrial", level: "核5级", lat: 38.2934, lng: 117.7034, capacity: 5000, facilities: "工业区、加固结构", access: "渤海新区地下" }
        ],
        nuclearTargets: [
            { id: "cz_nt001", name: "沧州电厂", type: "power", risk: "high", lat: 38.3334, lng: 116.9034, radius: 5000, description: "火力发电厂" },
            { id: "cz_nt002", name: "沧州自来水厂", type: "water", risk: "high", lat: 38.3134, lng: 116.8634, radius: 3000, description: "主要供水厂" },
            { id: "cz_nt003", name: "黄骅港", type: "port", risk: "high", lat: 38.4034, lng: 117.4034, radius: 5000, description: "重要港口" },
            { id: "cz_nt004", name: "华北油田", type: "industrial", risk: "high", lat: 38.7334, lng: 116.1334, radius: 8000, description: "大型油田基地" },
            { id: "cz_nt005", name: "沧州炼油厂", type: "chemical", risk: "high", lat: 38.2834, lng: 116.8834, radius: 7000, description: "石油化工基地" }
        ]
    },

    "xingtai": {
        name: "邢台",
        center: [114.5047, 37.0659],
        shelters: [
            { id: "xt_001", name: "达活泉公园地下人防", type: "civil", level: "核6级", lat: 37.0734, lng: 114.5134, capacity: 3200, facilities: "市中心公园、深埋15米", access: "达活泉公园地下" },
            { id: "xt_002", name: "邢台站地下避难所", type: "transport", level: "核5级", lat: 37.0634, lng: 114.4934, capacity: 4800, facilities: "铁路枢纽、三防系统", access: "邢台站地下广场" },
            { id: "xt_003", name: "桥东地下掩体", type: "civil", level: "核6级", lat: 37.0534, lng: 114.5234, capacity: 2800, facilities: "主城区、密闭门", access: "桥东区地下通道" },
            { id: "xt_004", name: "桥西地下人防", type: "civil", level: "核6级", lat: 37.0834, lng: 114.4734, capacity: 3000, facilities: "新区、独立通风", access: "桥西区地下" },
            { id: "xt_005", name: "沙河地下避难所", type: "industrial", level: "核6级", lat: 36.8534, lng: 114.5034, capacity: 3500, facilities: "工业区、滤毒通风", access: "沙河市地下" },
            { id: "xt_006", name: "南宫地下防护", type: "civil", level: "核6级", lat: 37.3534, lng: 115.4034, capacity: 2600, facilities: "郊区、大型储水", access: "南宫市地下" },
            { id: "xt_007", name: "宁晋地下人防", type: "civil", level: "核6级", lat: 37.6234, lng: 114.9234, capacity: 2400, facilities: "农业区、应急照明", access: "宁晋县地下" },
            { id: "xt_008", name: "邢台东站地下避难所", type: "transport", level: "核5级", lat: 37.0934, lng: 114.6234, capacity: 5500, facilities: "高铁枢纽、应急医疗", access: "邢台东站地下" }
        ],
        nuclearTargets: [
            { id: "xt_nt001", name: "邢台电厂", type: "power", risk: "high", lat: 37.0334, lng: 114.5334, radius: 5000, description: "火力发电厂" },
            { id: "xt_nt002", name: "邢台自来水厂", type: "water", risk: "high", lat: 37.0734, lng: 114.5034, radius: 3000, description: "主要供水厂" },
            { id: "xt_nt003", name: "冀中能源", type: "industrial", risk: "medium", lat: 37.0134, lng: 114.4834, radius: 4000, description: "煤矿基地" },
            { id: "xt_nt004", name: "沙河玻璃基地", type: "industrial", risk: "medium", lat: 36.8834, lng: 114.5234, radius: 3000, description: "工业基地" }
        ]
    },

    "qinhuangdao": {
        name: "秦皇岛",
        center: [119.6005, 39.9354],
        shelters: [
            { id: "qhd_001", name: "人民广场地下人防", type: "civil", level: "核6级", lat: 39.9434, lng: 119.6034, capacity: 4000, facilities: "市中心广场、深埋18米", access: "人民广场地下" },
            { id: "qhd_002", name: "秦皇岛站地下避难所", type: "transport", level: "核5级", lat: 39.9334, lng: 119.6034, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "秦皇岛站地下广场" },
            { id: "qhd_003", name: "北戴河地下掩体", type: "civil", level: "核5级", lat: 39.8334, lng: 119.4834, capacity: 4500, facilities: "旅游区、深埋结构", access: "北戴河区地下" },
            { id: "qhd_004", name: "海港地下人防", type: "civil", level: "核6级", lat: 39.9334, lng: 119.6234, capacity: 3500, facilities: "主城区、密闭门", access: "海港区地下通道" },
            { id: "qhd_005", name: "山海关地下避难所", type: "civil", level: "核6级", lat: 40.0034, lng: 119.7534, capacity: 3200, facilities: "历史区、滤毒通风", access: "山海关区地下" },
            { id: "qhd_006", name: "秦皇岛港地下防护", type: "port", level: "核5级", lat: 39.9034, lng: 119.6034, capacity: 5000, facilities: "港口区、独立供电", access: "秦皇岛港地下" },
            { id: "qhd_007", name: "抚宁地下人防", type: "civil", level: "核6级", lat: 39.8734, lng: 119.2434, capacity: 2800, facilities: "郊区、大型储水", access: "抚宁区地下" },
            { id: "qhd_008", name: "昌黎地下避难所", type: "civil", level: "核6级", lat: 39.7034, lng: 119.1634, capacity: 2600, facilities: "农业区、应急照明", access: "昌黎县地下" },
            { id: "qhd_009", name: "山海关机场地下人防", type: "transport", level: "核5级", lat: 39.9734, lng: 119.7334, capacity: 4000, facilities: "机场深层掩体", access: "山海关机场地下" }
        ],
        nuclearTargets: [
            { id: "qhd_nt001", name: "秦皇岛热电厂", type: "power", risk: "high", lat: 39.9634, lng: 119.6334, radius: 5000, description: "火力发电厂" },
            { id: "qhd_nt002", name: "秦皇岛自来水厂", type: "water", risk: "high", lat: 39.9434, lng: 119.5934, radius: 3000, description: "主要供水厂" },
            { id: "qhd_nt003", name: "秦皇岛港", type: "port", risk: "high", lat: 39.9134, lng: 119.6234, radius: 5000, description: "重要港口（能源运输）" },
            { id: "qhd_nt004", name: "山海关机场", type: "transport", risk: "high", lat: 39.9834, lng: 119.7534, radius: 5000, description: "军用/民用机场" },
            { id: "qhd_nt005", name: "首秦公司", type: "industrial", risk: "medium", lat: 39.9534, lng: 119.6734, radius: 4000, description: "钢铁基地" }
        ]
    },

    "zhangjiakou": {
        name: "张家口",
        center: [114.8875, 40.7676],
        shelters: [
            { id: "zjk_001", name: "人民公园地下人防", type: "civil", level: "核6级", lat: 40.7734, lng: 114.8934, capacity: 3500, facilities: "市中心公园、深埋18米", access: "人民公园地下" },
            { id: "zjk_002", name: "张家口站地下避难所", type: "transport", level: "核5级", lat: 40.7634, lng: 114.8834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "张家口站地下广场" },
            { id: "zjk_003", name: "桥东地下掩体", type: "civil", level: "核6级", lat: 40.7834, lng: 114.9034, capacity: 3000, facilities: "主城区、密闭门", access: "桥东区地下通道" },
            { id: "zjk_004", name: "桥西地下人防", type: "civil", level: "核6级", lat: 40.7734, lng: 114.8734, capacity: 3200, facilities: "老城区、滤毒通风", access: "桥西区地下" },
            { id: "zjk_005", name: "宣化地下避难所", type: "civil", level: "核6级", lat: 40.6034, lng: 115.0634, capacity: 2800, facilities: "矿区、大型储水", access: "宣化区地下" },
            { id: "zjk_006", name: "崇礼地下防护", type: "civil", level: "核6级", lat: 40.9734, lng: 115.2834, capacity: 2600, facilities: "旅游区、深埋结构", access: "崇礼区地下" },
            { id: "zjk_007", name: "张北地下人防", type: "civil", level: "核6级", lat: 41.1534, lng: 114.7134, capacity: 2400, facilities: "风电区、独立供电", access: "张北县地下" },
            { id: "zjk_008", name: "怀来地下避难所", type: "civil", level: "核6级", lat: 40.4234, lng: 115.5234, capacity: 2500, facilities: "葡萄酒区、应急照明", access: "怀来县地下" },
            { id: "zjk_009", name: "张家口宁远机场地下人防", type: "transport", level: "核5级", lat: 40.7434, lng: 114.9334, capacity: 4000, facilities: "机场深层掩体", access: "宁远机场地下" }
        ],
        nuclearTargets: [
            { id: "zjk_nt001", name: "张家口热电厂", type: "power", risk: "high", lat: 40.7934, lng: 114.9134, radius: 5000, description: "火力发电厂" },
            { id: "zjk_nt002", name: "张家口自来水厂", type: "water", risk: "high", lat: 40.7734, lng: 114.8934, radius: 3000, description: "主要供水厂" },
            { id: "zjk_nt003", name: "张北风电基地", type: "power", risk: "medium", lat: 41.1834, lng: 114.7334, radius: 4000, description: "大型风电场" },
            { id: "zjk_nt004", name: "宣化钢铁", type: "industrial", risk: "medium", lat: 40.6334, lng: 115.0834, radius: 4000, description: "钢铁基地" },
            { id: "zjk_nt005", name: "张家口变电站", type: "industrial", risk: "medium", lat: 40.7534, lng: 114.8534, radius: 3000, description: "电网枢纽" }
        ]
    },

    "hengshui": {
        name: "衡水",
        center: [115.6860, 37.7350],
        shelters: [
            { id: "hs_001", name: "中华公园地下人防", type: "civil", level: "核6级", lat: 37.7434, lng: 115.6934, capacity: 3000, facilities: "市中心公园、深埋15米", access: "中华公园地下" },
            { id: "hs_002", name: "衡水站地下避难所", type: "transport", level: "核5级", lat: 37.7334, lng: 115.6834, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "衡水站地下广场" },
            { id: "hs_003", name: "桃城地下掩体", type: "civil", level: "核6级", lat: 37.7434, lng: 115.7134, capacity: 2800, facilities: "主城区、密闭门", access: "桃城区地下通道" },
            { id: "hs_004", name: "冀州地下人防", type: "civil", level: "核6级", lat: 37.5734, lng: 115.5834, capacity: 2600, facilities: "新区、独立通风", access: "冀州区地下" },
            { id: "hs_005", name: "深州地下避难所", type: "civil", level: "核6级", lat: 38.0034, lng: 115.5834, capacity: 2400, facilities: "农业区、大型储水", access: "深州市地下" },
            { id: "hs_006", name: "枣强地下防护", type: "civil", level: "核6级", lat: 37.5134, lng: 115.7334, capacity: 2200, facilities: "工业区、滤毒通风", access: "枣强县地下" },
            { id: "hs_007", name: "武邑地下人防", type: "civil", level: "核6级", lat: 37.8034, lng: 115.9034, capacity: 2000, facilities: "郊区、应急照明", access: "武邑县地下" },
            { id: "hs_008", name: "衡水北站地下避难所", type: "transport", level: "核5级", lat: 37.7934, lng: 115.7534, capacity: 5000, facilities: "高铁枢纽、应急医疗", access: "衡水北站地下" }
        ],
        nuclearTargets: [
            { id: "hs_nt001", name: "衡水热电厂", type: "power", risk: "high", lat: 37.7634, lng: 115.7234, radius: 5000, description: "火力发电厂" },
            { id: "hs_nt002", name: "衡水自来水厂", type: "water", risk: "high", lat: 37.7434, lng: 115.7034, radius: 3000, description: "主要供水厂" },
            { id: "hs_nt003", name: "衡水变电站", type: "industrial", risk: "medium", lat: 37.7734, lng: 115.7334, radius: 3000, description: "电网枢纽" },
            { id: "hs_nt004", name: "衡水电网枢纽", type: "industrial", risk: "medium", lat: 37.7534, lng: 115.7134, radius: 2500, description: "电力调度中心" }
        ]
    },

    "chengde": {
        name: "承德",
        center: [117.9328, 40.9510],
        shelters: [
            { id: "cd_001", name: "避暑山庄地下人防", type: "civil", level: "核6级", lat: 40.9834, lng: 117.9334, capacity: 4000, facilities: "旅游区、深埋15米", access: "避暑山庄地下" },
            { id: "cd_002", name: "承德站地下避难所", type: "transport", level: "核5级", lat: 40.9634, lng: 117.9234, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "承德站地下广场" },
            { id: "cd_003", name: "双桥地下掩体", type: "civil", level: "核6级", lat: 40.9734, lng: 117.9434, capacity: 2800, facilities: "主城区、密闭门", access: "双桥区地下通道" },
            { id: "cd_004", name: "双滦地下人防", type: "civil", level: "核6级", lat: 40.9534, lng: 117.7934, capacity: 3000, facilities: "工业区、滤毒通风", access: "双滦区地下" },
            { id: "cd_005", name: "鹰手营子地下避难所", type: "industrial", level: "核6级", lat: 40.5534, lng: 117.6634, capacity: 3200, facilities: "矿区、大型储水", access: "鹰手营子矿区地下" },
            { id: "cd_006", name: "平泉地下防护", type: "civil", level: "核6级", lat: 41.0034, lng: 118.6834, capacity: 2400, facilities: "郊区、深埋结构", access: "平泉市地下" },
            { id: "cd_007", name: "围场地下人防", type: "civil", level: "核6级", lat: 41.9334, lng: 117.7634, capacity: 2200, facilities: "草原区、独立供电", access: "围场县地下" },
            { id: "cd_008", name: "丰宁地下避难所", type: "civil", level: "核6级", lat: 41.2034, lng: 116.6534, capacity: 2600, facilities: "坝上区、应急照明", access: "丰宁县地下" }
        ],
        nuclearTargets: [
            { id: "cd_nt001", name: "承德热电厂", type: "power", risk: "high", lat: 40.9934, lng: 117.9534, radius: 5000, description: "火力发电厂" },
            { id: "cd_nt002", name: "承德自来水厂", type: "water", risk: "high", lat: 40.9734, lng: 117.9334, radius: 3000, description: "主要供水厂" },
            { id: "cd_nt003", name: "滦平矿业", type: "industrial", risk: "medium", lat: 40.9334, lng: 117.3334, radius: 4000, description: "铁矿基地" },
            { id: "cd_nt004", name: "承德天然气储配站", type: "chemical", risk: "high", lat: 40.9534, lng: 117.9134, radius: 5000, description: "天然气储配设施" }
        ]
    },

    // ===== 山西省 =====
    "datong": {
        name: "大同",
        center: [113.3000, 40.0768],
        shelters: [
            { id: "dt_001", name: "文瀛湖地下掩体", type: "civil", level: "核6级", lat: 40.0934, lng: 113.3234, capacity: 4500, facilities: "市中心湖区、深埋18米、三防系统", access: "文瀛湖公园地下" },
            { id: "dt_002", name: "大同站地下避难所", type: "transport", level: "核5级", lat: 40.0834, lng: 113.3034, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "大同站地下广场" },
            { id: "dt_003", name: "古城墙地下人防", type: "civil", level: "核6级", lat: 40.0834, lng: 113.3034, capacity: 4000, facilities: "历史区、深埋结构", access: "古城墙地下通道" },
            { id: "dt_004", name: "御东地下掩体", type: "civil", level: "核6级", lat: 40.1034, lng: 113.3634, capacity: 3500, facilities: "新区、密闭门", access: "御东区地下" },
            { id: "dt_005", name: "云冈地下避难所", type: "civil", level: "核6级", lat: 40.0634, lng: 113.1534, capacity: 3200, facilities: "旅游区、滤毒通风", access: "云冈区地下" },
            { id: "dt_006", name: "同煤地下防护", type: "industrial", level: "核5级", lat: 40.0434, lng: 113.1234, capacity: 5500, facilities: "矿区深层、自然防护", access: "同煤集团地下巷道" },
            { id: "dt_007", name: "新荣地下人防", type: "civil", level: "核6级", lat: 40.2034, lng: 113.1534, capacity: 2800, facilities: "郊区、大型储水", access: "新荣区地下" },
            { id: "dt_008", name: "口泉地下避难所", type: "industrial", level: "核6级", lat: 39.9834, lng: 113.2034, capacity: 3000, facilities: "工业区、独立供电", access: "口泉矿区地下" },
            { id: "dt_009", name: "大同南站地下人防", type: "transport", level: "核5级", lat: 40.0534, lng: 113.3834, capacity: 6500, facilities: "高铁枢纽、应急医疗", access: "大同南站地下" },
            { id: "dt_010", name: "晋华宫地下避难所", type: "industrial", level: "核5级", lat: 40.0234, lng: 113.0834, capacity: 5000, facilities: "矿区深层、加固结构", access: "晋华宫矿地下" }
        ],
        nuclearTargets: [
            { id: "dt_nt001", name: "大同热电厂", type: "power", risk: "high", lat: 40.0734, lng: 113.3334, radius: 5000, description: "大型火力发电厂" },
            { id: "dt_nt002", name: "大同自来水厂", type: "water", risk: "high", lat: 40.0934, lng: 113.3134, radius: 3000, description: "主要供水厂" },
            { id: "dt_nt003", name: "同煤集团", type: "industrial", risk: "high", lat: 40.0534, lng: 113.1434, radius: 8000, description: "大型煤炭基地" },
            { id: "dt_nt004", name: "大同化工厂", type: "chemical", risk: "high", lat: 40.0634, lng: 113.2534, radius: 6000, description: "化工基地" },
            { id: "dt_nt005", name: "大同变电站", type: "industrial", risk: "medium", lat: 40.1134, lng: 113.3534, radius: 3000, description: "电网枢纽" }
        ]
    },

    "changzhi": {
        name: "长治",
        center: [113.1174, 36.1954],
        shelters: [
            { id: "czs_001", name: "太行公园地下人防", type: "civil", level: "核6级", lat: 36.2034, lng: 113.1234, capacity: 3500, facilities: "市中心公园、深埋15米", access: "太行公园地下" },
            { id: "czs_002", name: "长治站地下避难所", type: "transport", level: "核5级", lat: 36.1934, lng: 113.1034, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "长治站地下广场" },
            { id: "czs_003", name: "城区地下掩体", type: "civil", level: "核6级", lat: 36.2134, lng: 113.1334, capacity: 3000, facilities: "主城区、密闭门", access: "城区地下通道" },
            { id: "czs_004", name: "郊区地下人防", type: "civil", level: "核6级", lat: 36.2334, lng: 113.0934, capacity: 2800, facilities: "郊区、滤毒通风", access: "郊区地下" },
            { id: "czs_005", name: "潞州地下避难所", type: "civil", level: "核6级", lat: 36.2234, lng: 113.1534, capacity: 3200, facilities: "新区、独立供电", access: "潞州区地下" },
            { id: "czs_006", name: "潞城地下防护", type: "civil", level: "核6级", lat: 36.3334, lng: 113.2334, capacity: 2600, facilities: "工业区、大型储水", access: "潞城区地下" },
            { id: "czs_007", name: "襄垣地下人防", type: "industrial", level: "核6级", lat: 36.5334, lng: 113.0534, capacity: 3000, facilities: "矿区、深埋结构", access: "襄垣县地下" },
            { id: "czs_008", name: "屯留地下避难所", type: "civil", level: "核6级", lat: 36.3134, lng: 112.8934, capacity: 2400, facilities: "农业区、应急照明", access: "屯留区地下" }
        ],
        nuclearTargets: [
            { id: "czs_nt001", name: "长治热电厂", type: "power", risk: "high", lat: 36.1734, lng: 113.1434, radius: 5000, description: "火力发电厂" },
            { id: "czs_nt002", name: "长治自来水厂", type: "water", risk: "high", lat: 36.2034, lng: 113.1234, radius: 3000, description: "主要供水厂" },
            { id: "czs_nt003", name: "潞安矿业", type: "industrial", risk: "high", lat: 36.2834, lng: 113.1834, radius: 6000, description: "大型煤矿基地" },
            { id: "czs_nt004", name: "长治化工厂", type: "chemical", risk: "high", lat: 36.2434, lng: 113.0834, radius: 5000, description: "化工基地" }
        ]
    },

    "linfen": {
        name: "临汾",
        center: [111.5190, 36.0880],
        shelters: [
            { id: "lf_001", name: "汾河公园地下人防", type: "civil", level: "核6级", lat: 36.0934, lng: 111.5234, capacity: 3500, facilities: "市中心公园、深埋15米", access: "汾河公园地下" },
            { id: "lf_002", name: "临汾站地下避难所", type: "transport", level: "核5级", lat: 36.0834, lng: 111.5034, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "临汾站地下广场" },
            { id: "lf_003", name: "尧都地下掩体", type: "civil", level: "核6级", lat: 36.0934, lng: 111.5434, capacity: 3000, facilities: "主城区、密闭门", access: "尧都区地下通道" },
            { id: "lf_004", name: "侯马地下人防", type: "transport", level: "核5级", lat: 35.6234, lng: 111.3634, capacity: 4500, facilities: "铁路枢纽、独立通风", access: "侯马站地下" },
            { id: "lf_005", name: "霍州地下避难所", type: "industrial", level: "核6级", lat: 36.5734, lng: 111.7534, capacity: 3200, facilities: "矿区、滤毒通风", access: "霍州市地下" },
            { id: "lf_006", name: "曲沃地下防护", type: "civil", level: "核6级", lat: 35.6434, lng: 111.4834, capacity: 2600, facilities: "农业区、大型储水", access: "曲沃县地下" },
            { id: "lf_007", name: "襄汾地下人防", type: "civil", level: "核6级", lat: 35.8834, lng: 111.4334, capacity: 2800, facilities: "工业区、深埋结构", access: "襄汾县地下" },
            { id: "lf_008", name: "洪洞地下避难所", type: "civil", level: "核6级", lat: 36.2534, lng: 111.6734, capacity: 2400, facilities: "旅游区、应急照明", access: "洪洞县地下" }
        ],
        nuclearTargets: [
            { id: "lf_nt001", name: "临汾热电厂", type: "power", risk: "high", lat: 36.0634, lng: 111.5334, radius: 5000, description: "火力发电厂" },
            { id: "lf_nt002", name: "临汾自来水厂", type: "water", risk: "high", lat: 36.0934, lng: 111.5134, radius: 3000, description: "主要供水厂" },
            { id: "lf_nt003", name: "霍州煤电", type: "industrial", risk: "high", lat: 36.6034, lng: 111.7734, radius: 6000, description: "大型煤电基地" },
            { id: "lf_nt004", name: "临汾焦化厂", type: "chemical", risk: "high", lat: 36.1134, lng: 111.5534, radius: 5000, description: "焦化基地" }
        ]
    },

    "yuncheng": {
        name: "运城",
        center: [111.0072, 35.0263],
        shelters: [
            { id: "yc_001", name: "禹都公园地下人防", type: "civil", level: "核6级", lat: 35.0334, lng: 111.0134, capacity: 3500, facilities: "市中心公园、深埋15米", access: "禹都公园地下" },
            { id: "yc_002", name: "运城站地下避难所", type: "transport", level: "核5级", lat: 35.0234, lng: 110.9834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "运城站地下广场" },
            { id: "yc_003", name: "盐湖地下掩体", type: "civil", level: "核6级", lat: 35.0034, lng: 111.0334, capacity: 3200, facilities: "主城区、密闭门", access: "盐湖区地下通道" },
            { id: "yc_004", name: "永济地下人防", type: "civil", level: "核6级", lat: 34.8734, lng: 110.4534, capacity: 2800, facilities: "旅游区、滤毒通风", access: "永济市地下" },
            { id: "yc_005", name: "河津地下避难所", type: "industrial", level: "核6级", lat: 35.6034, lng: 110.7134, capacity: 3500, facilities: "工业区、独立供电", access: "河津市地下" },
            { id: "yc_006", name: "闻喜地下防护", type: "civil", level: "核6级", lat: 35.3534, lng: 111.2234, capacity: 2600, facilities: "农业区、大型储水", access: "闻喜县地下" },
            { id: "yc_007", name: "新绛地下人防", type: "civil", level: "核6级", lat: 35.6234, lng: 111.1034, capacity: 2400, facilities: "工业区、深埋结构", access: "新绛县地下" },
            { id: "yc_008", name: "临猗地下避难所", type: "civil", level: "核6级", lat: 35.1534, lng: 110.7834, capacity: 2800, facilities: "农业区、应急照明", access: "临猗县地下" }
        ],
        nuclearTargets: [
            { id: "yc_nt001", name: "运城热电厂", type: "power", risk: "high", lat: 35.0534, lng: 111.0334, radius: 5000, description: "火力发电厂" },
            { id: "yc_nt002", name: "运城自来水厂", type: "water", risk: "high", lat: 35.0334, lng: 111.0134, radius: 3000, description: "主要供水厂" },
            { id: "yc_nt003", name: "河津铝厂", type: "industrial", risk: "high", lat: 35.6334, lng: 110.7334, radius: 6000, description: "大型铝业基地" },
            { id: "yc_nt004", name: "运城盐化", type: "chemical", risk: "medium", lat: 35.0134, lng: 111.0534, radius: 4000, description: "盐化工基地" }
        ]
    },

    "jinzhong": {
        name: "晋中",
        center: [112.7527, 37.6870],
        shelters: [
            { id: "jz_001", name: "榆次老城地下人防", type: "civil", level: "核6级", lat: 37.7034, lng: 112.7634, capacity: 3500, facilities: "市中心历史区、深埋18米", access: "榆次老城地下" },
            { id: "jz_002", name: "晋中站地下避难所", type: "transport", level: "核5级", lat: 37.6934, lng: 112.7434, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "晋中站地下广场" },
            { id: "jz_003", name: "大学城地下掩体", type: "civil", level: "核6级", lat: 37.7234, lng: 112.7634, capacity: 4500, facilities: "教育区、密闭门、应急医疗", access: "大学城地下" },
            { id: "jz_004", name: "榆次地下人防", type: "civil", level: "核6级", lat: 37.6834, lng: 112.7834, capacity: 3000, facilities: "主城区、滤毒通风", access: "榆次区地下通道" },
            { id: "jz_005", name: "太谷地下避难所", type: "civil", level: "核6级", lat: 37.4234, lng: 112.5534, capacity: 2800, facilities: "农业区、独立供电", access: "太谷区地下" },
            { id: "jz_006", name: "平遥地下防护", type: "civil", level: "核6级", lat: 37.2034, lng: 112.1834, capacity: 3200, facilities: "旅游区、大型储水", access: "平遥古城地下" },
            { id: "jz_007", name: "介休地下人防", type: "industrial", level: "核6级", lat: 37.0334, lng: 111.9234, capacity: 3000, facilities: "工业区、深埋结构", access: "介休市地下" },
            { id: "jz_008", name: "灵石地下避难所", type: "industrial", level: "核6级", lat: 36.8534, lng: 111.7834, capacity: 2800, facilities: "矿区、加固结构", access: "灵石县地下" },
            { id: "jz_009", name: "寿阳地下人防", type: "civil", level: "核6级", lat: 37.8934, lng: 113.1834, capacity: 2600, facilities: "农业区、应急照明", access: "寿阳县地下" },
            { id: "jz_010", name: "昔阳地下避难所", type: "civil", level: "核6级", lat: 37.6134, lng: 113.7034, capacity: 2400, facilities: "山区、独立供电", access: "昔阳县地下" }
        ],
        nuclearTargets: [
            { id: "jz_nt001", name: "榆次热电厂", type: "power", risk: "high", lat: 37.7334, lng: 112.7834, radius: 5000, description: "火力发电厂" },
            { id: "jz_nt002", name: "晋中自来水厂", type: "water", risk: "high", lat: 37.7134, lng: 112.7534, radius: 3000, description: "主要供水厂" },
            { id: "jz_nt003", name: "介休洗煤厂", type: "industrial", risk: "medium", lat: 37.0634, lng: 111.9434, radius: 4000, description: "煤炭加工基地" },
            { id: "jz_nt004", name: "灵石煤矿", type: "industrial", risk: "medium", lat: 36.8834, lng: 111.8034, radius: 4000, description: "煤矿基地" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CITIES_BATCH2_TIER2;
}
