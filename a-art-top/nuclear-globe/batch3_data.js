// ============================================
// 核战争城市自救地球仪 - 批次3：二线城市（30个）
// ============================================

const BATCH3_CITIES = {
    // 二线城市批次
    "foshan": {
        name: "佛山",
        center: [113.1214, 23.0215],
        shelters: [
            { id: "fs_001", name: "祖庙地下掩体", type: "government", level: "核5级", lat: 23.0367, lng: 113.1234, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "广佛线祖庙站D口" },
            { id: "fs_002", name: "岭南天地地下人防", type: "mall", level: "核6级", lat: 23.0389, lng: 113.1212, capacity: 3500, facilities: "商圈地下、大型通风", access: "广佛线祖庙站步行5分钟" },
            { id: "fs_003", name: "千灯湖地下避难所", type: "civil", level: "核6级", lat: 23.0589, lng: 113.1434, capacity: 4500, facilities: "金融区、独立供电", access: "广佛线千灯湖站C口" },
            { id: "fs_004", name: "顺德大良地下防护", type: "metro", level: "核6级", lat: 22.8489, lng: 113.2534, capacity: 3200, facilities: "老城区、深埋结构", access: "佛山3号线大良钟楼站" },
            { id: "fs_005", name: "南海桂城地下人防", type: "civil", level: "核6级", lat: 23.0389, lng: 113.1634, capacity: 3800, facilities: "新城区、密闭门", access: "广佛线桂城站A口" },
            { id: "fs_006", name: "佛山新城地下避难所", type: "government", level: "核5级", lat: 22.9589, lng: 113.1234, capacity: 3500, facilities: "新区高标准、三防系统", access: "广佛线东平站F口" },
            { id: "fs_007", name: "三水广场地下防护", type: "mall", level: "核6级", lat: 23.1689, lng: 112.9034, capacity: 2800, facilities: "商圈地下、滤毒通风", access: "佛山4号线三水广场站" },
            { id: "fs_008", name: "高明地下人防", type: "civil", level: "核6级", lat: 22.9089, lng: 112.8834, capacity: 2400, facilities: "西部城区、大型储水", access: "高明区公交直达" }
        ],
        nuclearTargets: [
            { id: "fs_nt001", name: "佛山电厂", type: "power", risk: "high", lat: 23.0789, lng: 113.0234, radius: 5000, description: "大型火力发电厂" },
            { id: "fs_nt002", name: "南海石化", type: "chemical", risk: "high", lat: 23.1289, lng: 112.9534, radius: 8000, description: "大型石化基地" },
            { id: "fs_nt003", name: "西樵山自来水厂", type: "water", risk: "high", lat: 22.9589, lng: 112.9934, radius: 3000, description: "主要供水厂" }
        ]
    },

    "wuxi": {
        name: "无锡",
        center: [120.3119, 31.4912],
        shelters: [
            { id: "wx_001", name: "三阳广场地下掩体", type: "government", level: "核5级", lat: 31.5789, lng: 120.3034, capacity: 5000, facilities: "市中心、深埋20米、三防系统", access: "地铁1/2号线三阳广场站14号口" },
            { id: "wx_002", name: "崇安寺地下人防", type: "civil", level: "核6级", lat: 31.5834, lng: 120.3034, capacity: 3200, facilities: "历史街区、深埋结构", access: "地铁1/2号线三阳广场站步行5分钟" },
            { id: "wx_003", name: "南禅寺地下避难所", type: "mall", level: "核6级", lat: 31.5734, lng: 120.3134, capacity: 3800, facilities: "商圈地下、独立供电", access: "地铁1号线南禅寺站3号口" },
            { id: "wx_004", name: "太湖广场地下防护", type: "civil", level: "核6级", lat: 31.5634, lng: 120.3134, capacity: 3500, facilities: "湖滨区、大型通风", access: "地铁1号线太湖广场站" },
            { id: "wx_005", name: "火车站地下人防", type: "transport", level: "核5级", lat: 31.5934, lng: 120.3234, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "地铁1号线无锡火车站3号口" },
            { id: "wx_006", name: "东站地下避难所", type: "transport", level: "核5级", lat: 31.6134, lng: 120.4534, capacity: 4500, facilities: "高铁枢纽、独立通风", access: "地铁2号线无锡东站" },
            { id: "wx_007", name: "惠山古镇地下防护", type: "civil", level: "核6级", lat: 31.5834, lng: 120.2734, capacity: 2800, facilities: "景区地下、密闭门", access: "地铁4号线惠山古镇站" },
            { id: "wx_008", name: "硕放机场地下人防", type: "transport", level: "核5级", lat: 31.5034, lng: 120.4334, capacity: 4000, facilities: "机场深层掩体", access: "地铁3号线硕放机场站" }
        ],
        nuclearTargets: [
            { id: "wx_nt001", name: "无锡电厂", type: "power", risk: "high", lat: 31.6534, lng: 120.3034, radius: 5000, description: "大型火力发电厂" },
            { id: "wx_nt002", name: "太湖自来水厂", type: "water", risk: "high", lat: 31.5334, lng: 120.2634, radius: 3000, description: "主要供水厂" },
            { id: "wx_nt003", name: "江阴化工园", type: "chemical", risk: "high", lat: 31.9234, lng: 120.2834, radius: 8000, description: "大型化工基地" }
        ]
    },

    "dalian": {
        name: "大连",
        center: [121.6147, 38.9140],
        shelters: [
            { id: "dl_001", name: "中山广场地下掩体", type: "government", level: "核5级", lat: 38.9212, lng: 121.6434, capacity: 4500, facilities: "市中心、深埋20米、三防系统", access: "地铁2号线中山广场站D口" },
            { id: "dl_002", name: "青泥洼桥地下人防", type: "mall", level: "核6级", lat: 38.9234, lng: 121.6334, capacity: 4000, facilities: "商圈核心、大型通风", access: "地铁2号线青泥洼桥站E口" },
            { id: "dl_003", name: "星海广场地下避难所", type: "civil", level: "核6级", lat: 38.8734, lng: 121.6834, capacity: 5000, facilities: "地标区、独立供电", access: "地铁1号线星海广场站A口" },
            { id: "dl_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 38.9234, lng: 121.6234, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "地铁3/5号线大连站" },
            { id: "dl_005", name: "北站地下人防", type: "transport", level: "核5级", lat: 39.0134, lng: 121.6234, capacity: 5000, facilities: "高铁枢纽、独立通风", access: "地铁1/2号线大连北站" },
            { id: "dl_006", name: "旅顺地下避难所", type: "civil", level: "核6级", lat: 38.8234, lng: 121.2734, capacity: 3200, facilities: "军港附近、深埋结构", access: "地铁12号线旅顺站" },
            { id: "dl_007", name: "开发区地下防护", type: "civil", level: "核6级", lat: 39.0534, lng: 121.7734, capacity: 3500, facilities: "工业区、密闭门", access: "地铁3号线开发区站" },
            { id: "dl_008", name: "周水子机场地下人防", type: "transport", level: "核5级", lat: 38.9634, lng: 121.5434, capacity: 4500, facilities: "机场深层掩体", access: "地铁2号线机场站" }
        ],
        nuclearTargets: [
            { id: "dl_nt001", name: "大连电厂", type: "power", risk: "high", lat: 38.9834, lng: 121.6834, radius: 5000, description: "大型火力发电厂" },
            { id: "dl_nt002", name: "大连石化", type: "chemical", risk: "high", lat: 38.8734, lng: 121.6234, radius: 8000, description: "大型石化基地" },
            { id: "dl_nt003", name: "大窑湾港", type: "port", risk: "high", lat: 38.9234, lng: 121.9234, radius: 5000, description: "重要港口" },
            { id: "dl_nt004", name: "旅顺军港", type: "military", risk: "critical", lat: 38.8234, lng: 121.2734, radius: 5000, description: "海军基地" }
        ]
    },

    "xiamen": {
        name: "厦门",
        center: [118.0894, 24.4798],
        shelters: [
            { id: "xm_001", name: "中山路地下掩体", type: "government", level: "核5级", lat: 24.4612, lng: 118.0834, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线镇海路站1号口" },
            { id: "xm_002", name: "鼓浪屿地下人防", type: "civil", level: "核6级", lat: 24.4489, lng: 118.0734, capacity: 2500, facilities: "岛屿地下、深埋结构", access: "轮渡+步行" },
            { id: "xm_003", name: "SM广场地下避难所", type: "mall", level: "核6级", lat: 24.5134, lng: 118.1234, capacity: 4500, facilities: "商圈地下、独立供电", access: "地铁1号线乌石浦站3号口" },
            { id: "xm_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 24.4734, lng: 118.1134, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁3号线厦门火车站6号口" },
            { id: "xm_005", name: "北站地下人防", type: "transport", level: "核5级", lat: 24.6434, lng: 118.0734, capacity: 6000, facilities: "高铁枢纽、独立通风", access: "地铁1号线厦门北站" },
            { id: "xm_006", name: "环岛路地下避难所", type: "civil", level: "核6级", lat: 24.4434, lng: 118.1334, capacity: 3200, facilities: "海滨区、密闭门", access: "地铁2号线岭兜站" },
            { id: "xm_007", name: "湖里地下防护", type: "civil", level: "核6级", lat: 24.5134, lng: 118.1034, capacity: 3000, facilities: "工业区、滤毒通风", access: "地铁3号线湖里公园站" },
            { id: "xm_008", name: "高崎机场地下人防", type: "transport", level: "核5级", lat: 24.5434, lng: 118.1334, capacity: 4000, facilities: "机场深层掩体", access: "地铁1号线高崎站" }
        ],
        nuclearTargets: [
            { id: "xm_nt001", name: "厦门电厂", type: "power", risk: "high", lat: 24.5834, lng: 118.1234, radius: 5000, description: "大型火力发电厂" },
            { id: "xm_nt002", name: "翔安石化", type: "chemical", risk: "high", lat: 24.6234, lng: 118.2434, radius: 8000, description: "大型石化基地" },
            { id: "xm_nt003", name: "高崎国际机场", type: "transport", risk: "high", lat: 24.5434, lng: 118.1334, radius: 5000, description: "国际航空枢纽" },
            { id: "xm_nt004", name: "海沧港", type: "port", risk: "medium", lat: 24.4834, lng: 118.0234, radius: 3000, description: "重要港口" }
        ]
    },

    "shenyang": {
        name: "沈阳",
        center: [123.4315, 41.8057],
        shelters: [
            { id: "sy_001", name: "中街地下掩体", type: "government", level: "核5级", lat: 41.8034, lng: 123.4534, capacity: 5000, facilities: "市中心、深埋20米、三防系统", access: "地铁1号线中街站B口" },
            { id: "sy_002", name: "太原街地下人防", type: "mall", level: "核6级", lat: 41.7934, lng: 123.4034, capacity: 4500, facilities: "商圈核心、大型通风", access: "地铁1号线太原街站C口" },
            { id: "sy_003", name: "故宫地下避难所", type: "civil", level: "核6级", lat: 41.8034, lng: 123.4234, capacity: 2800, facilities: "历史建筑、深埋结构", access: "地铁1号线中街站步行10分钟" },
            { id: "sy_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 41.8034, lng: 123.3934, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "地铁1号线沈阳站站" },
            { id: "sy_005", name: "北站地下人防", type: "transport", level: "核5级", lat: 41.8234, lng: 123.4334, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁2号线沈阳北站" },
            { id: "sy_006", name: "铁西地下避难所", type: "civil", level: "核6级", lat: 41.7834, lng: 123.3734, capacity: 3500, facilities: "工业区、密闭门", access: "地铁1号线铁西广场站" },
            { id: "sy_007", name: "浑南地下防护", type: "civil", level: "核6级", lat: 41.7434, lng: 123.4734, capacity: 3200, facilities: "新区、滤毒通风", access: "地铁2号线世纪大厦站" },
            { id: "sy_008", name: "桃仙机场地下人防", type: "transport", level: "核5级", lat: 41.6434, lng: 123.4934, capacity: 5000, facilities: "机场深层掩体", access: "地铁2号线桃仙机场站" }
        ],
        nuclearTargets: [
            { id: "sy_nt001", name: "沈海热电厂", type: "power", risk: "high", lat: 41.8434, lng: 123.5234, radius: 5000, description: "大型火力发电厂" },
            { id: "sy_nt002", name: "沈阳石化", type: "chemical", risk: "high", lat: 41.8634, lng: 123.4234, radius: 8000, description: "大型石化基地" },
            { id: "sy_nt003", name: "沈阳自来水厂", type: "water", risk: "high", lat: 41.8234, lng: 123.4534, radius: 3000, description: "主要供水厂" },
            { id: "sy_nt004", name: "桃仙国际机场", type: "transport", risk: "high", lat: 41.6434, lng: 123.4934, radius: 5000, description: "国际航空枢纽" }
        ]
    },

    "changchun": {
        name: "长春",
        center: [125.3235, 43.8171],
        shelters: [
            { id: "cc_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 43.8934, lng: 125.3334, capacity: 4500, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线人民广场站A口" },
            { id: "cc_002", name: "重庆路地下人防", type: "mall", level: "核6级", lat: 43.9034, lng: 125.3334, capacity: 3800, facilities: "商圈核心、大型通风", access: "地铁1号线人民广场站步行5分钟" },
            { id: "cc_003", name: "红旗街地下避难所", type: "mall", level: "核6级", lat: 43.8734, lng: 125.2834, capacity: 4000, facilities: "商圈地下、独立供电", access: "地铁3号线湖西桥站" },
            { id: "cc_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 43.9134, lng: 125.3234, capacity: 5500, facilities: "铁路枢纽、三防系统", access: "地铁1号线长春站北站" },
            { id: "cc_005", name: "西站地下人防", type: "transport", level: "核5级", lat: 43.8634, lng: 125.2534, capacity: 5000, facilities: "高铁枢纽、独立通风", access: "地铁2号线长春西站" },
            { id: "cc_006", name: "一汽地下避难所", type: "civil", level: "核6级", lat: 43.8234, lng: 125.2034, capacity: 3200, facilities: "工业区、密闭门", access: "地铁2号线汽车公园站" },
            { id: "cc_007", name: "净月地下防护", type: "civil", level: "核6级", lat: 43.8234, lng: 125.4534, capacity: 2800, facilities: "风景区、滤毒通风", access: "地铁3号线净月潭公园站" },
            { id: "cc_008", name: "龙嘉机场地下人防", type: "transport", level: "核5级", lat: 43.9934, lng: 125.6934, capacity: 4500, facilities: "机场深层掩体", access: "城际高铁龙嘉站" }
        ],
        nuclearTargets: [
            { id: "cc_nt001", name: "长春热电厂", type: "power", risk: "high", lat: 43.9534, lng: 125.3534, radius: 5000, description: "大型火力发电厂" },
            { id: "cc_nt002", name: "长春自来水厂", type: "water", risk: "high", lat: 43.8834, lng: 125.3434, radius: 3000, description: "主要供水厂" },
            { id: "cc_nt003", name: "吉林石化", type: "chemical", risk: "high", lat: 43.9234, lng: 126.5534, radius: 8000, description: "大型石化基地（近邻）" }
        ]
    },

    "shijiazhuang": {
        name: "石家庄",
        center: [114.5149, 38.0423],
        shelters: [
            { id: "sjz_001", name: "北国商城地下掩体", type: "government", level: "核5级", lat: 38.0434, lng: 114.5234, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线北国商城站C2口" },
            { id: "sjz_002", name: "中山路地下人防", type: "metro", level: "核6级", lat: 38.0434, lng: 114.5134, capacity: 3200, facilities: "商业街、大型通风", access: "地铁1号线解放广场站" },
            { id: "sjz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 38.0234, lng: 114.4834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁3号线石家庄站" },
            { id: "sjz_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 38.0634, lng: 114.5634, capacity: 4000, facilities: "高铁站、独立通风", access: "地铁1号线留村站" },
            { id: "sjz_005", name: "裕华地下人防", type: "civil", level: "核6级", lat: 38.0234, lng: 114.5334, capacity: 2800, facilities: "新区、密闭门", access: "地铁1号线裕华路站" },
            { id: "sjz_006", name: "桥西地下避难所", type: "civil", level: "核6级", lat: 38.0334, lng: 114.4734, capacity: 2600, facilities: "老城区、滤毒通风", access: "地铁3号线新百广场站" },
            { id: "sjz_007", name: "正定地下防护", type: "civil", level: "核6级", lat: 38.1534, lng: 114.5734, capacity: 2400, facilities: "古城、大型储水", access: "地铁1号线园博园站" },
            { id: "sjz_008", name: "栾城地下人防", type: "civil", level: "核6级", lat: 37.9034, lng: 114.6634, capacity: 2200, facilities: "工业区、应急照明", access: "公交栾城站" }
        ],
        nuclearTargets: [
            { id: "sjz_nt001", name: "石家庄电厂", type: "power", risk: "high", lat: 38.0834, lng: 114.5334, radius: 5000, description: "大型火力发电厂" },
            { id: "sjz_nt002", name: "石家庄石化", type: "chemical", risk: "high", lat: 38.0034, lng: 114.6234, radius: 8000, description: "大型石化基地" },
            { id: "sjz_nt003", name: "黄壁庄水库", type: "dam", risk: "medium", lat: 38.2634, lng: 114.1834, radius: 3000, description: "重要水利设施" }
        ]
    },

    "harbin": {
        name: "哈尔滨",
        center: [126.5340, 45.8038],
        shelters: [
            { id: "heb_001", name: "中央大街地下掩体", type: "government", level: "核5级", lat: 45.7834, lng: 126.6234, capacity: 4500, facilities: "市中心、深埋20米、三防系统", access: "地铁2号线中央大街站1号口" },
            { id: "heb_002", name: "索菲亚地下人防", type: "civil", level: "核6级", lat: 45.7734, lng: 126.6234, capacity: 3000, facilities: "历史建筑、深埋结构", access: "地铁2号线尚志大街站步行5分钟" },
            { id: "heb_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 45.7634, lng: 126.6334, capacity: 6000, facilities: "铁路枢纽、三防系统", access: "地铁2号线哈尔滨站" },
            { id: "heb_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 45.7134, lng: 126.5134, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁3号线哈尔滨西站" },
            { id: "heb_005", name: "会展中心地下人防", type: "civil", level: "核6级", lat: 45.7634, lng: 126.7134, capacity: 3500, facilities: "会展区、密闭门", access: "地铁3号线会展中心站" },
            { id: "heb_006", name: "南岗地下避难所", type: "civil", level: "核6级", lat: 45.7634, lng: 126.6434, capacity: 3200, facilities: "老城区、滤毒通风", access: "地铁1号线铁路局站" },
            { id: "heb_007", name: "道里地下防护", type: "civil", level: "核6级", lat: 45.7534, lng: 126.6034, capacity: 3000, facilities: "中心区、大型储水", access: "地铁3号线丁香公园站" },
            { id: "heb_008", name: "太平机场地下人防", type: "transport", level: "核5级", lat: 45.6334, lng: 126.2534, capacity: 5000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "heb_nt001", name: "哈尔滨电厂", type: "power", risk: "high", lat: 45.8534, lng: 126.6534, radius: 5000, description: "大型火力发电厂" },
            { id: "heb_nt002", name: "哈尔滨石化", type: "chemical", risk: "high", lat: 45.8834, lng: 126.6334, radius: 8000, description: "大型石化基地" },
            { id: "heb_nt003", name: "松花江大桥", type: "bridge", risk: "medium", lat: 45.8034, lng: 126.5334, radius: 2000, description: "战略桥梁" }
        ]
    },

    "nanning": {
        name: "南宁",
        center: [108.3665, 22.8170],
        shelters: [
            { id: "nn_001", name: "朝阳广场地下掩体", type: "government", level: "核5级", lat: 22.8234, lng: 108.3234, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1/2号线朝阳广场站F口" },
            { id: "nn_002", name: "民族大道地下人防", type: "metro", level: "核6级", lat: 22.8234, lng: 108.3634, capacity: 3200, facilities: "主干道沿线、大型通风", access: "地铁1号线新民路站" },
            { id: "nn_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 22.8334, lng: 108.3234, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁1号线火车站" },
            { id: "nn_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 22.8534, lng: 108.4034, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁1号线火车东站" },
            { id: "nn_005", name: "青秀山地下人防", type: "civil", level: "核6级", lat: 22.7934, lng: 108.3934, capacity: 2800, facilities: "风景区、密闭门", access: "地铁3号线青秀山站" },
            { id: "nn_006", name: "五象地下避难所", type: "civil", level: "核6级", lat: 22.7634, lng: 108.3834, capacity: 3000, facilities: "新区、滤毒通风", access: "地铁3号线总部基地站" },
            { id: "nn_007", name: "江南地下防护", type: "civil", level: "核6级", lat: 22.7834, lng: 108.3034, capacity: 2600, facilities: "工业区、大型储水", access: "地铁2号线江南客运站" },
            { id: "nn_008", name: "吴圩机场地下人防", type: "transport", level: "核5级", lat: 22.6434, lng: 108.1834, capacity: 4500, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "nn_nt001", name: "南宁电厂", type: "power", risk: "high", lat: 22.9234, lng: 108.4334, radius: 5000, description: "大型火力发电厂" },
            { id: "nn_nt002", name: "南宁自来水厂", type: "water", risk: "high", lat: 22.8534, lng: 108.3334, radius: 3000, description: "主要供水厂" },
            { id: "nn_nt003", name: "邕江大桥", type: "bridge", risk: "medium", lat: 22.8234, lng: 108.3234, radius: 2000, description: "战略桥梁" }
        ]
    },

    "fuzhou": {
        name: "福州",
        center: [119.2965, 26.0745],
        shelters: [
            { id: "fz_001", name: "东街口地下掩体", type: "government", level: "核5级", lat: 26.0934, lng: 119.3034, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1/4号线东街口站D口" },
            { id: "fz_002", name: "三坊七巷地下人防", type: "civil", level: "核6级", lat: 26.0934, lng: 119.2934, capacity: 2800, facilities: "历史街区、深埋结构", access: "地铁1号线东街口站步行10分钟" },
            { id: "fz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 26.1134, lng: 119.3134, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁1号线福州火车站" },
            { id: "fz_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 25.9934, lng: 119.4534, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁1号线福州火车南站" },
            { id: "fz_005", name: "五一广场地下人防", type: "civil", level: "核6级", lat: 26.0834, lng: 119.3134, capacity: 3200, facilities: "广场区、密闭门", access: "地铁2号线水部站" },
            { id: "fz_006", name: "台江地下避难所", type: "civil", level: "核6级", lat: 26.0634, lng: 119.3134, capacity: 3000, facilities: "老城区、滤毒通风", access: "地铁1号线达道站" },
            { id: "fz_007", name: "仓山地下防护", type: "civil", level: "核6级", lat: 26.0434, lng: 119.3234, capacity: 2600, facilities: "新区、大型储水", access: "地铁1号线上藤站" },
            { id: "fz_008", name: "长乐机场地下人防", type: "transport", level: "核5级", lat: 25.9434, lng: 119.6734, capacity: 4500, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "fz_nt001", name: "福州电厂", type: "power", risk: "high", lat: 26.1534, lng: 119.3434, radius: 5000, description: "大型火力发电厂" },
            { id: "fz_nt002", name: "福州自来水厂", type: "water", risk: "high", lat: 26.1234, lng: 119.3034, radius: 3000, description: "主要供水厂" },
            { id: "fz_nt003", name: "马尾港", type: "port", risk: "medium", lat: 26.0034, lng: 119.4534, radius: 3000, description: "重要港口" }
        ]
    },

    "guiyang": {
        name: "贵阳",
        center: [106.6302, 26.6477],
        shelters: [
            { id: "gy_001", name: "喷水池地下掩体", type: "government", level: "核5级", lat: 26.5934, lng: 106.7134, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "地铁1/2号线喷水池站B口" },
            { id: "gy_002", name: "大十字地下人防", type: "metro", level: "核6级", lat: 26.5934, lng: 106.7234, capacity: 2800, facilities: "老城区中心、大型通风", access: "地铁1号线中山西路站" },
            { id: "gy_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 26.5734, lng: 106.7034, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "地铁1号线贵阳火车站" },
            { id: "gy_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 26.6334, lng: 106.6834, capacity: 5000, facilities: "高铁枢纽、独立通风", access: "地铁1号线贵阳北站" },
            { id: "gy_005", name: "观山湖地下人防", type: "civil", level: "核6级", lat: 26.6534, lng: 106.6334, capacity: 3000, facilities: "新区、密闭门", access: "地铁1号线观山湖公园站" },
            { id: "gy_006", name: "花果园地下避难所", type: "mall", level: "核6级", lat: 26.5834, lng: 106.6734, capacity: 3500, facilities: "大型社区、滤毒通风", access: "地铁3号线花果园站" },
            { id: "gy_007", name: "南明地下防护", type: "civil", level: "核6级", lat: 26.5734, lng: 106.7234, capacity: 2600, facilities: "老城区、大型储水", access: "地铁1号线河滨公园站" },
            { id: "gy_008", name: "龙洞堡机场地下人防", type: "transport", level: "核5级", lat: 26.5434, lng: 106.8034, capacity: 4000, facilities: "机场深层掩体", access: "地铁2号线龙洞堡机场站" }
        ],
        nuclearTargets: [
            { id: "gy_nt001", name: "贵阳电厂", type: "power", risk: "high", lat: 26.6934, lng: 106.7534, radius: 5000, description: "大型火力发电厂" },
            { id: "gy_nt002", name: "贵阳自来水厂", type: "water", risk: "high", lat: 26.6134, lng: 106.7134, radius: 3000, description: "主要供水厂" },
            { id: "gy_nt003", name: "红枫湖水库", type: "dam", risk: "medium", lat: 26.5334, lng: 106.4334, radius: 3000, description: "重要水利设施" }
        ]
    },

    "lanzhou": {
        name: "兰州",
        center: [103.8343, 36.0611],
        shelters: [
            { id: "lz_001", name: "西关十字地下掩体", type: "government", level: "核5级", lat: 36.0634, lng: 103.8334, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线西关站C口" },
            { id: "lz_002", name: "张掖路地下人防", type: "metro", level: "核6级", lat: 36.0634, lng: 103.8434, capacity: 3000, facilities: "商业街、大型通风", access: "地铁1号线省政府站" },
            { id: "lz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 36.0334, lng: 103.8534, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁2号线兰州火车站" },
            { id: "lz_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 36.0734, lng: 103.7734, capacity: 4500, facilities: "铁路枢纽、独立通风", access: "地铁1号线兰州西站北广场站" },
            { id: "lz_005", name: "东方红广场地下人防", type: "civil", level: "核6级", lat: 36.0534, lng: 103.8434, capacity: 3200, facilities: "广场区、密闭门", access: "地铁1/2号线东方红广场站" },
            { id: "lz_006", name: "七里河地下避难所", type: "civil", level: "核6级", lat: 36.0734, lng: 103.7934, capacity: 2800, facilities: "工业区、滤毒通风", access: "地铁1号线七里河站" },
            { id: "lz_007", name: "安宁地下防护", type: "civil", level: "核6级", lat: 36.1034, lng: 103.7234, capacity: 2600, facilities: "高校区、大型储水", access: "地铁1号线兰州城市学院站" },
            { id: "lz_008", name: "中川机场地下人防", type: "transport", level: "核5级", lat: 36.5134, lng: 103.6234, capacity: 4000, facilities: "机场深层掩体", access: "城际高铁中川机场站" }
        ],
        nuclearTargets: [
            { id: "lz_nt001", name: "兰州电厂", type: "power", risk: "high", lat: 36.1034, lng: 103.9334, radius: 5000, description: "大型火力发电厂" },
            { id: "lz_nt002", name: "兰州石化", type: "chemical", risk: "high", lat: 36.1234, lng: 103.8534, radius: 8000, description: "大型石化基地" },
            { id: "lz_nt003", name: "黄河铁桥", type: "bridge", risk: "medium", lat: 36.0634, lng: 103.8234, radius: 2000, description: "战略桥梁" }
        ]
    },

    "taiyuan": {
        name: "太原",
        center: [112.5489, 37.8706],
        shelters: [
            { id: "ty_001", name: "五一广场地下掩体", type: "government", level: "核5级", lat: 37.8634, lng: 112.5634, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线五一广场站D口" },
            { id: "ty_002", name: "柳巷地下人防", type: "metro", level: "核6级", lat: 37.8734, lng: 112.5634, capacity: 3000, facilities: "商业街、大型通风", access: "地铁2号线府西街站" },
            { id: "ty_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.8634, lng: 112.5834, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁1号线太原火车站" },
            { id: "ty_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 37.8034, lng: 112.6234, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁1号线太原南站" },
            { id: "ty_005", name: "迎泽公园地下人防", type: "civil", level: "核6级", lat: 37.8534, lng: 112.5634, capacity: 2800, facilities: "公园区、密闭门", access: "地铁1号线大南门站" },
            { id: "ty_006", name: "小店地下避难所", type: "civil", level: "核6级", lat: 37.7634, lng: 112.5634, capacity: 2600, facilities: "新区、滤毒通风", access: "地铁2号线小店站" },
            { id: "ty_007", name: "万柏林地下防护", type: "civil", level: "核6级", lat: 37.8734, lng: 112.5134, capacity: 2400, facilities: "工业区、大型储水", access: "地铁1号线下元站" },
            { id: "ty_008", name: "武宿机场地下人防", type: "transport", level: "核5级", lat: 37.7634, lng: 112.6334, capacity: 4000, facilities: "机场深层掩体", access: "公交201路武宿机场站" }
        ],
        nuclearTargets: [
            { id: "ty_nt001", name: "太原电厂", type: "power", risk: "high", lat: 37.9234, lng: 112.5434, radius: 5000, description: "大型火力发电厂" },
            { id: "ty_nt002", name: "太原钢铁", type: "factory", risk: "high", lat: 37.8734, lng: 112.4834, radius: 6000, description: "大型钢铁企业" },
            { id: "ty_nt003", name: "汾河水库", type: "dam", risk: "medium", lat: 38.0034, lng: 112.0034, radius: 3000, description: "重要水利设施" }
        ]
    },

    "wenzhou": {
        name: "温州",
        center: [120.6994, 27.9943],
        shelters: [
            { id: "wz_001", name: "五马街地下掩体", type: "government", level: "核5级", lat: 28.0034, lng: 120.6634, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "地铁S1线德政站+步行" },
            { id: "wz_002", name: "车站大道地下人防", type: "metro", level: "核6级", lat: 28.0134, lng: 120.7034, capacity: 2800, facilities: "主干道沿线、大型通风", access: "地铁S1线惠民路站" },
            { id: "wz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 28.0234, lng: 120.6834, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "地铁S1线温州火车站" },
            { id: "wz_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 27.9834, lng: 120.6334, capacity: 4000, facilities: "高铁站、独立通风", access: "地铁S1线动车南站" },
            { id: "wz_005", name: "鹿城地下人防", type: "civil", level: "核6级", lat: 28.0134, lng: 120.6734, capacity: 2600, facilities: "老城区、密闭门", access: "地铁S1线龙霞路站" },
            { id: "wz_006", name: "瓯海地下避难所", type: "civil", level: "核6级", lat: 27.9934, lng: 120.6434, capacity: 2400, facilities: "新区、滤毒通风", access: "地铁S1线新桥站" },
            { id: "wz_007", name: "龙湾地下防护", type: "civil", level: "核6级", lat: 27.9934, lng: 120.8234, capacity: 2200, facilities: "工业区、大型储水", access: "地铁S1线永中站" },
            { id: "wz_008", name: "龙湾机场地下人防", type: "transport", level: "核5级", lat: 27.9134, lng: 120.8534, capacity: 4000, facilities: "机场深层掩体", access: "地铁S1线机场站" }
        ],
        nuclearTargets: [
            { id: "wz_nt001", name: "温州电厂", type: "power", risk: "high", lat: 28.0534, lng: 120.7334, radius: 5000, description: "大型火力发电厂" },
            { id: "wz_nt002", name: "温州自来水厂", type: "water", risk: "high", lat: 28.0234, lng: 120.6834, radius: 3000, description: "主要供水厂" },
            { id: "wz_nt003", name: "温州港", type: "port", risk: "medium", lat: 28.0334, lng: 120.7834, radius: 3000, description: "重要港口" }
        ]
    },

    "xuzhou": {
        name: "徐州",
        center: [117.2841, 34.2058],
        shelters: [
            { id: "xz_001", name: "彭城广场地下掩体", type: "government", level: "核5级", lat: 34.2634, lng: 117.1934, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "地铁1/2号线彭城广场站9号口" },
            { id: "xz_002", name: "淮海路地下人防", type: "metro", level: "核6级", lat: 34.2734, lng: 117.1934, capacity: 3000, facilities: "商业街、大型通风", access: "地铁1号线徐医附院站" },
            { id: "xz_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 34.2634, lng: 117.2134, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁1/3号线徐州火车站" },
            { id: "xz_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 34.2134, lng: 117.3134, capacity: 4500, facilities: "高铁枢纽、独立通风", access: "地铁1号线徐州东站" },
            { id: "xz_005", name: "云龙湖地下人防", type: "civil", level: "核6级", lat: 34.2434, lng: 117.1734, capacity: 2800, facilities: "风景区、密闭门", access: "地铁1号线韩山站" },
            { id: "xz_006", name: "铜山地下避难所", type: "civil", level: "核6级", lat: 34.1934, lng: 117.1834, capacity: 2600, facilities: "工业区、滤毒通风", access: "地铁3号线高新区南站" },
            { id: "xz_007", name: "鼓楼地下防护", type: "civil", level: "核6级", lat: 34.2934, lng: 117.1934, capacity: 2400, facilities: "老城区、大型储水", access: "地铁2号线九龙湖站" },
            { id: "xz_008", name: "观音机场地下人防", type: "transport", level: "核5级", lat: 34.0634, lng: 117.3034, capacity: 3500, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "xz_nt001", name: "徐州电厂", type: "power", risk: "high", lat: 34.3334, lng: 117.2434, radius: 5000, description: "大型火力发电厂" },
            { id: "xz_nt002", name: "徐州自来水厂", type: "water", risk: "high", lat: 34.2734, lng: 117.2034, radius: 3000, description: "主要供水厂" },
            { id: "xz_nt003", name: "万寨港", type: "port", risk: "medium", lat: 34.2934, lng: 117.2434, radius: 3000, description: "重要港口" }
        ]
    },

    "nantong": {
        name: "南通",
        center: [120.8646, 32.0146],
        shelters: [
            { id: "nt_001", name: "南大街地下掩体", type: "government", level: "核5级", lat: 32.0034, lng: 120.8634, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线友谊桥站" },
            { id: "nt_002", name: "濠河地下人防", type: "civil", level: "核6级", lat: 32.0134, lng: 120.8734, capacity: 2800, facilities: "风景区、深埋结构", access: "地铁1号线和平桥站" },
            { id: "nt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 32.0234, lng: 120.8634, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "地铁1号线南通火车站" },
            { id: "nt_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 32.0534, lng: 120.8034, capacity: 4000, facilities: "高铁站、独立通风", access: "地铁1号线南通西站" },
            { id: "nt_005", name: "开发区地下人防", type: "civil", level: "核6级", lat: 31.9434, lng: 120.9334, capacity: 2600, facilities: "工业区、密闭门", access: "地铁1号线能达商务区站" },
            { id: "nt_006", name: "通州地下避难所", type: "civil", level: "核6级", lat: 32.0934, lng: 121.0734, capacity: 2400, facilities: "新区、滤毒通风", access: "通州区公交直达" },
            { id: "nt_007", name: "海门地下防护", type: "civil", level: "核6级", lat: 31.9034, lng: 121.1834, capacity: 2200, facilities: "沿海区、大型储水", access: "海门区公交直达" },
            { id: "nt_008", name: "兴东机场地下人防", type: "transport", level: "核5级", lat: 32.0734, lng: 120.9834, capacity: 3500, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "nt_nt001", name: "南通电厂", type: "power", risk: "high", lat: 32.0534, lng: 120.9534, radius: 5000, description: "大型火力发电厂" },
            { id: "nt_nt002", name: "南通自来水厂", type: "water", risk: "high", lat: 32.0134, lng: 120.8834, radius: 3000, description: "主要供水厂" },
            { id: "nt_nt003", name: "南通港", type: "port", risk: "medium", lat: 31.9834, lng: 120.9034, radius: 3000, description: "重要港口" }
        ]
    },

    "yangzhou": {
        name: "扬州",
        center: [119.4130, 32.3942],
        shelters: [
            { id: "yz_001", name: "文昌阁地下掩体", type: "government", level: "核5级", lat: 32.4034, lng: 119.4434, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交文昌阁站" },
            { id: "yz_002", name: "瘦西湖地下人防", type: "civil", level: "核6级", lat: 32.4234, lng: 119.4234, capacity: 2500, facilities: "风景区、深埋结构", access: "公交瘦西湖站" },
            { id: "yz_003", name: "东关街地下避难所", type: "civil", level: "核6级", lat: 32.4034, lng: 119.4534, capacity: 2200, facilities: "历史街区、密闭门", access: "公交东关古渡站" },
            { id: "yz_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 32.3834, lng: 119.4034, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "yz_005", name: "东站地下人防", type: "transport", level: "核5级", lat: 32.3634, lng: 119.5234, capacity: 3500, facilities: "高铁站、独立通风", access: "公交东站" },
            { id: "yz_006", name: "江都地下避难所", type: "civil", level: "核6级", lat: 32.4334, lng: 119.5734, capacity: 2400, facilities: "新城区、滤毒通风", access: "江都区公交直达" },
            { id: "yz_007", name: "邗江地下防护", type: "civil", level: "核6级", lat: 32.3834, lng: 119.3934, capacity: 2200, facilities: "新区、大型储水", access: "邗江区公交直达" },
            { id: "yz_008", name: "泰州机场地下人防", type: "transport", level: "核5级", lat: 32.5634, lng: 119.7234, capacity: 3000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "yz_nt001", name: "扬州电厂", type: "power", risk: "high", lat: 32.4734, lng: 119.4534, radius: 5000, description: "大型火力发电厂" },
            { id: "yz_nt002", name: "扬州自来水厂", type: "water", risk: "high", lat: 32.4234, lng: 119.4434, radius: 3000, description: "主要供水厂" },
            { id: "yz_nt003", name: "江都水利枢纽", type: "dam", risk: "medium", lat: 32.4334, lng: 119.6034, radius: 3000, description: "重要水利设施" }
        ]
    },

    "zibo": {
        name: "淄博",
        center: [118.0548, 36.8135],
        shelters: [
            { id: "zb_001", name: "张店地下掩体", type: "government", level: "核5级", lat: 36.8034, lng: 118.0534, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交张店站" },
            { id: "zb_002", name: "临淄地下人防", type: "civil", level: "核6级", lat: 36.8234, lng: 118.3034, capacity: 3000, facilities: "工业区、大型通风", access: "临淄区公交直达" },
            { id: "zb_003", name: "淄川地下避难所", type: "civil", level: "核6级", lat: 36.6434, lng: 117.9634, capacity: 2600, facilities: "矿区、深埋结构", access: "淄川区公交直达" },
            { id: "zb_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 36.7934, lng: 118.0534, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "zb_005", name: "北站地下人防", type: "transport", level: "核5级", lat: 36.8734, lng: 117.9834, capacity: 3500, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "zb_006", name: "博山地下避难所", type: "civil", level: "核6级", lat: 36.4934, lng: 117.8634, capacity: 2200, facilities: "山区、密闭门", access: "博山区公交直达" },
            { id: "zb_007", name: "周村地下防护", type: "civil", level: "核6级", lat: 36.8034, lng: 117.8634, capacity: 2400, facilities: "古商城、滤毒通风", access: "周村区公交直达" },
            { id: "zb_008", name: "桓台地下人防", type: "civil", level: "核6级", lat: 36.9634, lng: 118.0834, capacity: 2000, facilities: "县城、大型储水", access: "桓台县公交直达" }
        ],
        nuclearTargets: [
            { id: "zb_nt001", name: "华能淄博电厂", type: "power", risk: "high", lat: 36.8534, lng: 118.0534, radius: 5000, description: "大型火力发电厂" },
            { id: "zb_nt002", name: "齐鲁石化", type: "chemical", risk: "high", lat: 36.8234, lng: 118.3034, radius: 8000, description: "超大型石化基地" },
            { id: "zb_nt003", name: "淄博自来水厂", type: "water", risk: "high", lat: 36.8134, lng: 118.0434, radius: 3000, description: "主要供水厂" }
        ]
    },

    "weifang": {
        name: "潍坊",
        center: [119.1619, 36.7069],
        shelters: [
            { id: "wf_001", name: "风筝广场地下掩体", type: "government", level: "核5级", lat: 36.7034, lng: 119.1034, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交风筝广场站" },
            { id: "wf_002", name: "奎文地下人防", type: "civil", level: "核6级", lat: 36.7134, lng: 119.1334, capacity: 2800, facilities: "主城区、大型通风", access: "奎文区公交直达" },
            { id: "wf_003", name: "潍城地下避难所", type: "civil", level: "核6级", lat: 36.7134, lng: 119.0234, capacity: 2600, facilities: "老城区、深埋结构", access: "潍城区公交直达" },
            { id: "wf_004", name: "火车站地下防护", type: "transport", level: "核5级", lat: 36.6834, lng: 119.1134, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "wf_005", name: "北站地下人防", type: "transport", level: "核5级", lat: 36.7634, lng: 119.1934, capacity: 3500, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "wf_006", name: "高新地下避难所", type: "civil", level: "核6级", lat: 36.7234, lng: 119.1834, capacity: 2400, facilities: "开发区、密闭门", access: "高新区公交直达" },
            { id: "wf_007", name: "坊子地下防护", type: "civil", level: "核6级", lat: 36.6534, lng: 119.1634, capacity: 2200, facilities: "工业区、滤毒通风", access: "坊子区公交直达" },
            { id: "wf_008", name: "青州地下人防", type: "civil", level: "核6级", lat: 36.6934, lng: 118.4834, capacity: 2000, facilities: "古城、大型储水", access: "青州市公交直达" }
        ],
        nuclearTargets: [
            { id: "wf_nt001", name: "潍坊电厂", type: "power", risk: "high", lat: 36.7534, lng: 119.1534, radius: 5000, description: "大型火力发电厂" },
            { id: "wf_nt002", name: "潍坊石化", type: "chemical", risk: "high", lat: 36.7834, lng: 119.2634, radius: 8000, description: "大型石化基地" },
            { id: "wf_nt003", name: "峡山水库", type: "dam", risk: "medium", lat: 36.4134, lng: 119.3334, radius: 3000, description: "重要水利设施" }
        ]
    },

    "yantai": {
        name: "烟台",
        center: [121.4480, 37.4638],
        shelters: [
            { id: "yt_001", name: "南大街地下掩体", type: "government", level: "核5级", lat: 37.5434, lng: 121.4434, capacity: 4000, facilities: "市中心、深埋18米、三防系统", access: "公交南大街站" },
            { id: "yt_002", name: "滨海广场地下人防", type: "civil", level: "核6级", lat: 37.5534, lng: 121.4034, capacity: 3000, facilities: "海滨区、深埋结构", access: "公交滨海广场站" },
            { id: "yt_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.5634, lng: 121.4234, capacity: 4500, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "yt_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 37.3834, lng: 121.2634, capacity: 4000, facilities: "高铁站、独立通风", access: "公交南站" },
            { id: "yt_005", name: "开发区地下人防", type: "civil", level: "核6级", lat: 37.5934, lng: 121.2734, capacity: 2800, facilities: "工业区、密闭门", access: "开发区公交直达" },
            { id: "yt_006", name: "福山地下避难所", type: "civil", level: "核6级", lat: 37.4934, lng: 121.2734, capacity: 2600, facilities: "郊区、滤毒通风", access: "福山区公交直达" },
            { id: "yt_007", name: "牟平地下防护", type: "civil", level: "核6级", lat: 37.3934, lng: 121.6034, capacity: 2400, facilities: "沿海区、大型储水", access: "牟平区公交直达" },
            { id: "yt_008", name: "蓬莱机场地下人防", type: "transport", level: "核5级", lat: 37.6634, lng: 120.9934, capacity: 4000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "yt_nt001", name: "烟台电厂", type: "power", risk: "high", lat: 37.6034, lng: 121.4734, radius: 5000, description: "大型火力发电厂" },
            { id: "yt_nt002", name: "烟台港", type: "port", risk: "high", lat: 37.5534, lng: 121.3834, radius: 5000, description: "重要港口" },
            { id: "yt_nt003", name: "万华化学", type: "chemical", risk: "high", lat: 37.5734, lng: 121.2834, radius: 8000, description: "大型化工基地" }
        ]
    },

    "weihai": {
        name: "威海",
        center: [122.1204, 37.5135],
        shelters: [
            { id: "wh_001", name: "幸福门地下掩体", type: "government", level: "核5级", lat: 37.5034, lng: 122.1234, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交幸福门站" },
            { id: "wh_002", name: "刘公岛地下人防", type: "civil", level: "核6级", lat: 37.5034, lng: 122.1834, capacity: 2500, facilities: "海岛、深埋结构", access: "轮渡+岛内通道" },
            { id: "wh_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.4334, lng: 122.0534, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "wh_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 37.4534, lng: 122.0234, capacity: 3500, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "wh_005", name: "环翠地下人防", type: "civil", level: "核6级", lat: 37.5134, lng: 122.1334, capacity: 2400, facilities: "主城区、密闭门", access: "环翠区公交直达" },
            { id: "wh_006", name: "文登地下避难所", type: "civil", level: "核6级", lat: 37.2034, lng: 122.0534, capacity: 2200, facilities: "新城区、滤毒通风", access: "文登区公交直达" },
            { id: "wh_007", name: "荣成地下防护", type: "civil", level: "核6级", lat: 37.1734, lng: 122.4334, capacity: 2000, facilities: "沿海区、大型储水", access: "荣成市公交直达" },
            { id: "wh_008", name: "大水泊机场地下人防", type: "transport", level: "核5级", lat: 37.2034, lng: 122.2334, capacity: 3000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "wh_nt001", name: "华能威海电厂", type: "power", risk: "high", lat: 37.5334, lng: 122.1534, radius: 5000, description: "大型火力发电厂" },
            { id: "wh_nt002", name: "威海港", type: "port", risk: "medium", lat: 37.5134, lng: 122.1234, radius: 3000, description: "重要港口" },
            { id: "wh_nt003", name: "石岛港", type: "port", risk: "medium", lat: 36.9034, lng: 122.4334, radius: 3000, description: "渔港重镇" }
        ]
    },

    "dongying": {
        name: "东营",
        center: [118.6747, 37.4341],
        shelters: [
            { id: "dy_001", name: "西城地下掩体", type: "government", level: "核5级", lat: 37.4634, lng: 118.5034, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交西城站" },
            { id: "dy_002", name: "东城地下人防", type: "civil", level: "核6级", lat: 37.4334, lng: 118.6734, capacity: 3000, facilities: "新区、大型通风", access: "公交东城站" },
            { id: "dy_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 37.4934, lng: 118.5334, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "dy_004", name: "胜利油田地下防护", type: "civil", level: "核6级", lat: 37.4534, lng: 118.5734, capacity: 3200, facilities: "油田区、深埋结构", access: "油田内部通道" },
            { id: "dy_005", name: "河口地下人防", type: "civil", level: "核6级", lat: 37.9134, lng: 118.5334, capacity: 2400, facilities: "沿海区、密闭门", access: "河口区公交直达" },
            { id: "dy_006", name: "广饶地下避难所", type: "civil", level: "核6级", lat: 37.0534, lng: 118.4134, capacity: 2200, facilities: "县城、滤毒通风", access: "广饶县公交直达" },
            { id: "dy_007", name: "垦利地下防护", type: "civil", level: "核6级", lat: 37.5834, lng: 118.5534, capacity: 2000, facilities: "新区、大型储水", access: "垦利区公交直达" },
            { id: "dy_008", name: "利津地下人防", type: "civil", level: "核6级", lat: 37.4934, lng: 118.2534, capacity: 1800, facilities: "县城、应急照明", access: "利津县公交直达" }
        ],
        nuclearTargets: [
            { id: "dy_nt001", name: "胜利油田", type: "chemical", risk: "critical", lat: 37.4534, lng: 118.5734, radius: 10000, description: "特大型油田" },
            { id: "dy_nt002", name: "东营港", type: "port", risk: "high", lat: 38.0234, lng: 118.6534, radius: 5000, description: "重要港口" },
            { id: "dy_nt003", name: "黄河大桥", type: "bridge", risk: "medium", lat: 37.4534, lng: 118.5734, radius: 2000, description: "战略桥梁" }
        ]
    },

    "linyi": {
        name: "临沂",
        center: [118.3564, 35.1047],
        shelters: [
            { id: "ly_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 35.0634, lng: 118.3534, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交人民广场站" },
            { id: "ly_002", name: "兰山地下人防", type: "civil", level: "核6级", lat: 35.0734, lng: 118.3334, capacity: 2800, facilities: "主城区、大型通风", access: "兰山区公交直达" },
            { id: "ly_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 35.0634, lng: 118.3634, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "ly_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 35.1634, lng: 118.2834, capacity: 3500, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "ly_005", name: "罗庄地下人防", type: "civil", level: "核6级", lat: 34.9934, lng: 118.3134, capacity: 2600, facilities: "工业区、密闭门", access: "罗庄区公交直达" },
            { id: "ly_006", name: "河东地下避难所", type: "civil", level: "核6级", lat: 35.0934, lng: 118.4134, capacity: 2400, facilities: "新城区、滤毒通风", access: "河东区公交直达" },
            { id: "ly_007", name: "沂南地下防护", type: "civil", level: "核6级", lat: 35.5534, lng: 118.4634, capacity: 2000, facilities: "县城、大型储水", access: "沂南县公交直达" },
            { id: "ly_008", name: "郯城地下人防", type: "civil", level: "核6级", lat: 34.6134, lng: 118.3534, capacity: 1800, facilities: "县城、应急照明", access: "郯城县公交直达" }
        ],
        nuclearTargets: [
            { id: "ly_nt001", name: "临沂电厂", type: "power", risk: "high", lat: 35.1234, lng: 118.3834, radius: 5000, description: "大型火力发电厂" },
            { id: "ly_nt002", name: "临沂自来水厂", type: "water", risk: "high", lat: 35.0834, lng: 118.3534, radius: 3000, description: "主要供水厂" },
            { id: "ly_nt003", name: "沂河大桥", type: "bridge", risk: "medium", lat: 35.0634, lng: 118.3534, radius: 2000, description: "战略桥梁" }
        ]
    },

    "jining": {
        name: "济宁",
        center: [116.4075, 35.4150],
        shelters: [
            { id: "jn_001", name: "太白楼地下掩体", type: "government", level: "核5级", lat: 35.4234, lng: 116.4134, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交太白楼站" },
            { id: "jn_002", name: "任城地下人防", type: "civil", level: "核6级", lat: 35.4334, lng: 116.3934, capacity: 2600, facilities: "主城区、大型通风", access: "任城区公交直达" },
            { id: "jn_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 35.4134, lng: 116.4334, capacity: 3800, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "jn_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 35.4434, lng: 116.3434, capacity: 3200, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "jn_005", name: "曲阜地下人防", type: "civil", level: "核6级", lat: 35.6034, lng: 116.9934, capacity: 2400, facilities: "古城、密闭门", access: "曲阜市公交直达" },
            { id: "jn_006", name: "邹城地下避难所", type: "civil", level: "核6级", lat: 35.4134, lng: 116.9734, capacity: 2200, facilities: "矿区、滤毒通风", access: "邹城市公交直达" },
            { id: "jn_007", name: "兖州地下防护", type: "civil", level: "核6级", lat: 35.5634, lng: 116.8334, capacity: 2000, facilities: "铁路枢纽、大型储水", access: "兖州区公交直达" },
            { id: "jn_008", name: "微山地下人防", type: "civil", level: "核6级", lat: 34.8134, lng: 117.1334, capacity: 1800, facilities: "湖区、应急照明", access: "微山县公交直达" }
        ],
        nuclearTargets: [
            { id: "jn_nt001", name: "邹县电厂", type: "power", risk: "high", lat: 35.4234, lng: 116.9734, radius: 5000, description: "大型火力发电厂" },
            { id: "jn_nt002", name: "济宁自来水厂", type: "water", risk: "high", lat: 35.4334, lng: 116.4134, radius: 3000, description: "主要供水厂" },
            { id: "jn_nt003", name: "济宁港", type: "port", risk: "medium", lat: 35.3634, lng: 116.5134, radius: 3000, description: "重要港口" }
        ]
    },

    "taizhou": {
        name: "台州",
        center: [121.4206, 28.6564],
        shelters: [
            { id: "tz_001", name: "市政府地下掩体", type: "government", level: "核5级", lat: 28.6634, lng: 121.4234, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交市政府站" },
            { id: "tz_002", name: "椒江地下人防", type: "civil", level: "核6级", lat: 28.6834, lng: 121.4434, capacity: 2600, facilities: "主城区、大型通风", access: "椒江区公交直达" },
            { id: "tz_003", name: "黄岩地下避难所", type: "civil", level: "核6级", lat: 28.6534, lng: 121.2634, capacity: 2400, facilities: "老城区、深埋结构", access: "黄岩区公交直达" },
            { id: "tz_004", name: "路桥地下防护", type: "civil", level: "核6级", lat: 28.6234, lng: 121.3734, capacity: 2200, facilities: "商贸区、密闭门", access: "路桥区公交直达" },
            { id: "tz_005", name: "温岭地下人防", type: "civil", level: "核6级", lat: 28.3834, lng: 121.3734, capacity: 2000, facilities: "沿海市、滤毒通风", access: "温岭市公交直达" },
            { id: "tz_006", name: "玉环地下避难所", type: "civil", level: "核6级", lat: 28.1434, lng: 121.2334, capacity: 1800, facilities: "海岛县、大型储水", access: "玉环市轮渡+公交" },
            { id: "tz_007", name: "临海地下防护", type: "civil", level: "核6级", lat: 28.8634, lng: 121.1234, capacity: 2000, facilities: "古城、应急照明", access: "临海市公交直达" },
            { id: "tz_008", name: "路桥机场地下人防", type: "transport", level: "核5级", lat: 28.5634, lng: 121.4334, capacity: 3000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "tz_nt001", name: "台州电厂", type: "power", risk: "high", lat: 28.5834, lng: 121.4634, radius: 5000, description: "大型火力发电厂" },
            { id: "tz_nt002", name: "椒江港", type: "port", risk: "medium", lat: 28.6834, lng: 121.4434, radius: 3000, description: "重要港口" },
            { id: "tz_nt003", name: "大陈岛", type: "military", risk: "medium", lat: 28.4534, lng: 121.8834, radius: 3000, description: "海岛军事设施" }
        ]
    },

    "jinhua": {
        name: "金华",
        center: [119.6495, 29.0895],
        shelters: [
            { id: "jh_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 29.1134, lng: 119.6534, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交人民广场站" },
            { id: "jh_002", name: "婺城地下人防", type: "civil", level: "核6级", lat: 29.1234, lng: 119.6334, capacity: 2600, facilities: "主城区、大型通风", access: "婺城区公交直达" },
            { id: "jh_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 29.1034, lng: 119.6534, capacity: 3800, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "jh_004", name: "金华南站地下防护", type: "transport", level: "核5级", lat: 29.0834, lng: 119.6834, capacity: 3200, facilities: "高铁站、独立通风", access: "公交南站" },
            { id: "jh_005", name: "义乌地下人防", type: "civil", level: "核6级", lat: 29.3034, lng: 120.0834, capacity: 3000, facilities: "商贸城、密闭门", access: "义乌市公交直达" },
            { id: "jh_006", name: "东阳地下避难所", type: "civil", level: "核6级", lat: 29.2834, lng: 120.2334, capacity: 2400, facilities: "影视城、滤毒通风", access: "东阳市公交直达" },
            { id: "jh_007", name: "永康地下防护", type: "civil", level: "核6级", lat: 28.9034, lng: 120.0334, capacity: 2200, facilities: "五金城、大型储水", access: "永康市公交直达" },
            { id: "jh_008", name: "兰溪地下人防", type: "civil", level: "核6级", lat: 29.2234, lng: 119.4834, capacity: 2000, facilities: "古城、应急照明", access: "兰溪市公交直达" }
        ],
        nuclearTargets: [
            { id: "jh_nt001", name: "金华电厂", type: "power", risk: "high", lat: 29.1434, lng: 119.6734, radius: 5000, description: "大型火力发电厂" },
            { id: "jh_nt002", name: "兰江大桥", type: "bridge", risk: "medium", lat: 29.2234, lng: 119.4834, radius: 2000, description: "战略桥梁" },
            { id: "jh_nt003", name: "义乌机场", type: "transport", risk: "medium", lat: 29.3434, lng: 120.0334, radius: 4000, description: "重要机场" }
        ]
    },

    "shaoxing": {
        name: "绍兴",
        center: [120.5802, 30.0302],
        shelters: [
            { id: "sx_001", name: "城市广场地下掩体", type: "government", level: "核5级", lat: 30.0034, lng: 120.5834, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "地铁1号线城市广场站" },
            { id: "sx_002", name: "鲁迅故里地下人防", type: "civil", level: "核6级", lat: 30.0134, lng: 120.5934, capacity: 2400, facilities: "景区、深埋结构", access: "地铁1号线鲁迅故里站" },
            { id: "sx_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.0234, lng: 120.5834, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "地铁1号线火车站" },
            { id: "sx_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 30.0834, lng: 120.5334, capacity: 3000, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "sx_005", name: "柯桥地下人防", type: "civil", level: "核6级", lat: 30.0834, lng: 120.4934, capacity: 2600, facilities: "轻纺城、密闭门", access: "地铁1号线中国轻纺城站" },
            { id: "sx_006", name: "上虞地下避难所", type: "civil", level: "核6级", lat: 30.0334, lng: 120.8734, capacity: 2200, facilities: "新城区、滤毒通风", access: "地铁2号线大学路站" },
            { id: "sx_007", name: "诸暨地下防护", type: "civil", level: "核6级", lat: 29.7234, lng: 120.2534, capacity: 2000, facilities: "袜都、大型储水", access: "诸暨市公交直达" },
            { id: "sx_008", name: "嵊州地下人防", type: "civil", level: "核6级", lat: 29.6034, lng: 120.8334, capacity: 1800, facilities: "越剧之乡、应急照明", access: "嵊州市公交直达" }
        ],
        nuclearTargets: [
            { id: "sx_nt001", name: "绍兴电厂", type: "power", risk: "high", lat: 30.0534, lng: 120.6134, radius: 5000, description: "大型火力发电厂" },
            { id: "sx_nt002", name: "曹娥江大坝", type: "dam", risk: "medium", lat: 30.0534, lng: 120.8334, radius: 3000, description: "重要水利设施" },
            { id: "sx_nt003", name: "绍兴港", type: "port", risk: "medium", lat: 30.0234, lng: 120.6734, radius: 3000, description: "重要港口" }
        ]
    },

    "yancheng": {
        name: "盐城",
        center: [120.1610, 33.3799],
        shelters: [
            { id: "yc_001", name: "建军路地下掩体", type: "government", level: "核5级", lat: 33.3834, lng: 120.1534, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交建军路站" },
            { id: "yc_002", name: "亭湖地下人防", type: "civil", level: "核6级", lat: 33.3934, lng: 120.1634, capacity: 2600, facilities: "主城区、大型通风", access: "亭湖区公交直达" },
            { id: "yc_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 33.3634, lng: 120.1834, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "yc_004", name: "大丰地下防护", type: "civil", level: "核6级", lat: 33.2034, lng: 120.4634, capacity: 2400, facilities: "沿海区、密闭门", access: "大丰区公交直达" },
            { id: "yc_005", name: "东台地下人防", type: "civil", level: "核6级", lat: 32.8734, lng: 120.3234, capacity: 2200, facilities: "县级市、滤毒通风", access: "东台市公交直达" },
            { id: "yc_006", name: "建湖地下避难所", type: "civil", level: "核6级", lat: 33.4834, lng: 119.8034, capacity: 2000, facilities: "县城、大型储水", access: "建湖县公交直达" },
            { id: "yc_007", name: "射阳地下防护", type: "civil", level: "核6级", lat: 33.7834, lng: 120.2634, capacity: 1800, facilities: "沿海县、应急照明", access: "射阳县公交直达" },
            { id: "yc_008", name: "阜宁地下人防", type: "civil", level: "核6级", lat: 33.7934, lng: 119.8034, capacity: 1800, facilities: "县城、应急照明", access: "阜宁县公交直达" }
        ],
        nuclearTargets: [
            { id: "yc_nt001", name: "盐城电厂", type: "power", risk: "high", lat: 33.4234, lng: 120.2034, radius: 5000, description: "大型火力发电厂" },
            { id: "yc_nt002", name: "大丰港", type: "port", risk: "medium", lat: 33.2034, lng: 120.4634, radius: 3000, description: "重要港口" },
            { id: "yc_nt003", name: "射阳港", type: "port", risk: "medium", lat: 33.8334, lng: 120.5034, radius: 3000, description: "重要港口" }
        ]
    },

    "huzhou": {
        name: "湖州",
        center: [120.0880, 30.8931],
        shelters: [
            { id: "hz_001", name: "爱山广场地下掩体", type: "government", level: "核5级", lat: 30.8734, lng: 120.1034, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "公交爱山广场站" },
            { id: "hz_002", name: "吴兴地下人防", type: "civil", level: "核6级", lat: 30.8834, lng: 120.1234, capacity: 2400, facilities: "主城区、大型通风", access: "吴兴区公交直达" },
            { id: "hz_003", name: "南浔地下避难所", type: "civil", level: "核6级", lat: 30.8834, lng: 120.4234, capacity: 2200, facilities: "古镇、深埋结构", access: "南浔区公交直达" },
            { id: "hz_004", name: "长兴地下防护", type: "civil", level: "核6级", lat: 31.0234, lng: 119.9134, capacity: 2000, facilities: "县城、密闭门", access: "长兴县公交直达" },
            { id: "hz_005", name: "德清地下人防", type: "civil", level: "核6级", lat: 30.5434, lng: 119.9834, capacity: 1800, facilities: "县城、滤毒通风", access: "德清县公交直达" },
            { id: "hz_006", name: "安吉地下避难所", type: "civil", level: "核6级", lat: 30.6334, lng: 119.6834, capacity: 1800, facilities: "竹乡、大型储水", access: "安吉县公交直达" },
            { id: "hz_007", name: "太湖度假区地下防护", type: "civil", level: "核6级", lat: 30.9434, lng: 120.0634, capacity: 1600, facilities: "度假区、应急照明", access: "度假区公交直达" },
            { id: "hz_008", name: "织里地下人防", type: "civil", level: "核6级", lat: 30.8834, lng: 120.2634, capacity: 1600, facilities: "童装镇、应急照明", access: "织里镇公交直达" }
        ],
        nuclearTargets: [
            { id: "hz_nt001", name: "长兴电厂", type: "power", risk: "high", lat: 31.0234, lng: 119.9134, radius: 5000, description: "大型火力发电厂" },
            { id: "hz_nt002", name: "湖州自来水厂", type: "water", risk: "high", lat: 30.8934, lng: 120.1034, radius: 3000, description: "主要供水厂" },
            { id: "hz_nt003", name: "太湖大堤", type: "dam", risk: "medium", lat: 30.9434, lng: 120.0634, radius: 3000, description: "重要水利设施" }
        ]
    },

    "jiaxing": {
        name: "嘉兴",
        center: [120.7555, 30.7458],
        shelters: [
            { id: "jx_001", name: "南湖地下掩体", type: "government", level: "核5级", lat: 30.7734, lng: 120.7634, capacity: 2800, facilities: "市中心、深埋18米、三防系统", access: "有轨电车南湖站" },
            { id: "jx_002", name: "秀洲地下人防", type: "civil", level: "核6级", lat: 30.7734, lng: 120.7234, capacity: 2400, facilities: "主城区、大型通风", access: "秀洲区公交直达" },
            { id: "jx_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 30.7834, lng: 120.7534, capacity: 3500, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "jx_004", name: "南站地下防护", type: "transport", level: "核5级", lat: 30.7034, lng: 120.7434, capacity: 3000, facilities: "高铁站、独立通风", access: "公交南站" },
            { id: "jx_005", name: "嘉善地下人防", type: "civil", level: "核6级", lat: 30.8534, lng: 120.9234, capacity: 2200, facilities: "临沪县、密闭门", access: "嘉善县公交直达" },
            { id: "jx_006", name: "海宁地下避难所", type: "civil", level: "核6级", lat: 30.5334, lng: 120.6834, capacity: 2000, facilities: "皮革城、滤毒通风", access: "海宁市公交直达" },
            { id: "jx_007", name: "平湖地下防护", type: "civil", level: "核6级", lat: 30.7034, lng: 121.0234, capacity: 1800, facilities: "临沪县、大型储水", access: "平湖市公交直达" },
            { id: "jx_008", name: "桐乡地下人防", type: "civil", level: "核6级", lat: 30.6334, lng: 120.5634, capacity: 1800, facilities: "乌镇、应急照明", access: "桐乡市公交直达" }
        ],
        nuclearTargets: [
            { id: "jx_nt001", name: "嘉兴电厂", type: "power", risk: "high", lat: 30.8334, lng: 120.9534, radius: 5000, description: "大型火力发电厂" },
            { id: "jx_nt002", name: "嘉兴自来水厂", type: "water", risk: "high", lat: 30.7634, lng: 120.7534, radius: 3000, description: "主要供水厂" },
            { id: "jx_nt003", name: "秦山核电站", type: "nuclear", risk: "critical", lat: 30.4334, lng: 120.9534, radius: 10000, description: "大型商用核电站" }
        ]
    },

    "jinan": {
        name: "济南",
        center: [117.1205, 36.6510],
        shelters: [
            { id: "jn2_001", name: "泉城广场地下掩体", type: "government", level: "核5级", lat: 36.6634, lng: 117.0234, capacity: 4000, facilities: "市中心、深埋20米、三防系统", access: "地铁1号线泉城广场站" },
            { id: "jn2_002", name: "大明湖地下人防", type: "civil", level: "核6级", lat: 36.6834, lng: 117.0234, capacity: 3000, facilities: "景区、深埋结构", access: "地铁2号线北园站" },
            { id: "jn2_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 36.6734, lng: 117.0034, capacity: 5000, facilities: "铁路枢纽、三防系统", access: "地铁2号线济南站北站" },
            { id: "jn2_004", name: "西站地下防护", type: "transport", level: "核5级", lat: 36.6734, lng: 116.8934, capacity: 5500, facilities: "高铁枢纽、独立通风", access: "地铁1号线济南西站" },
            { id: "jn2_005", name: "趵突泉地下人防", type: "civil", level: "核6级", lat: 36.6634, lng: 117.0134, capacity: 2800, facilities: "景区、密闭门", access: "地铁2号线生产路站" },
            { id: "jn2_006", name: "历下地下避难所", type: "civil", level: "核6级", lat: 36.6634, lng: 117.0534, capacity: 2600, facilities: "主城区、滤毒通风", access: "地铁2号线历山路站" },
            { id: "jn2_007", name: "市中地下防护", type: "civil", level: "核6级", lat: 36.6534, lng: 116.9934, capacity: 2400, facilities: "老城区、大型储水", access: "市中区公交直达" },
            { id: "jn2_008", name: "遥墙机场地下人防", type: "transport", level: "核5级", lat: 36.8534, lng: 117.2134, capacity: 4000, facilities: "机场深层掩体", access: "机场大巴+室内通道" }
        ],
        nuclearTargets: [
            { id: "jn2_nt001", name: "黄台电厂", type: "power", risk: "high", lat: 36.7334, lng: 117.0634, radius: 5000, description: "大型火力发电厂" },
            { id: "jn2_nt002", name: "济南自来水厂", type: "water", risk: "high", lat: 36.6934, lng: 117.0334, radius: 3000, description: "主要供水厂" },
            { id: "jn2_nt003", name: "黄河大桥", type: "bridge", risk: "medium", lat: 36.7334, lng: 116.9934, radius: 2000, description: "战略桥梁" }
        ]
    },

    "tangshan": {
        name: "唐山",
        center: [118.1802, 39.6309],
        shelters: [
            { id: "ts_001", name: "纪念碑广场地下掩体", type: "government", level: "核5级", lat: 39.6334, lng: 118.1834, capacity: 3500, facilities: "市中心、深埋18米、三防系统", access: "公交纪念碑广场站" },
            { id: "ts_002", name: "路南地下人防", type: "civil", level: "核6级", lat: 39.6134, lng: 118.1534, capacity: 2800, facilities: "主城区、大型通风", access: "路南区公交直达" },
            { id: "ts_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 39.6234, lng: 118.1234, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "ts_004", name: "北站地下防护", type: "transport", level: "核5级", lat: 39.7334, lng: 118.1534, capacity: 3500, facilities: "高铁站、独立通风", access: "公交北站" },
            { id: "ts_005", name: "路北地下人防", type: "civil", level: "核6级", lat: 39.6434, lng: 118.2034, capacity: 2600, facilities: "主城区、密闭门", access: "路北区公交直达" },
            { id: "ts_006", name: "古冶地下避难所", type: "civil", level: "核6级", lat: 39.7334, lng: 118.4534, capacity: 2400, facilities: "矿区、滤毒通风", access: "古冶区公交直达" },
            { id: "ts_007", name: "开滦地下防护", type: "civil", level: "核6级", lat: 39.6634, lng: 118.1834, capacity: 2200, facilities: "矿区、大型储水", access: "开滦矿区内部通道" },
            { id: "ts_008", name: "曹妃甸地下人防", type: "civil", level: "核6级", lat: 39.2734, lng: 118.4534, capacity: 2800, facilities: "港口区、应急照明", access: "曹妃甸公交直达" }
        ],
        nuclearTargets: [
            { id: "ts_nt001", name: "陡河电厂", type: "power", risk: "high", lat: 39.7334, lng: 118.2234, radius: 5000, description: "大型火力发电厂" },
            { id: "ts_nt002", name: "唐山港", type: "port", risk: "high", lat: 39.2034, lng: 118.9834, radius: 5000, description: "重要港口" },
            { id: "ts_nt003", name: "曹妃甸LNG接收站", type: "gas", risk: "high", lat: 39.2734, lng: 118.4534, radius: 4000, description: "天然气接收站" }
        ]
    },

    "baoding": {
        name: "保定",
        center: [115.4646, 38.8739],
        shelters: [
            { id: "bd_001", name: "竞秀公园地下掩体", type: "government", level: "核5级", lat: 38.8734, lng: 115.4634, capacity: 3000, facilities: "市中心、深埋18米、三防系统", access: "公交竞秀公园站" },
            { id: "bd_002", name: "莲池地下人防", type: "civil", level: "核6级", lat: 38.8634, lng: 115.5134, capacity: 2600, facilities: "主城区、大型通风", access: "莲池区公交直达" },
            { id: "bd_003", name: "火车站地下避难所", type: "transport", level: "核5级", lat: 38.8734, lng: 115.5034, capacity: 4000, facilities: "铁路枢纽、三防系统", access: "公交火车站" },
            { id: "bd_004", name: "东站地下防护", type: "transport", level: "核5级", lat: 38.9134, lng: 115.5934, capacity: 3500, facilities: "高铁站、独立通风", access: "公交东站" },
            { id: "bd_005", name: "徐水地下人防", type: "civil", level: "核6级", lat: 39.0334, lng: 115.6534, capacity: 2200, facilities: "新区、密闭门", access: "徐水区公交直达" },
            { id: "bd_006", name: "涿州地下避难所", type: "civil", level: "核6级", lat: 39.4834, lng: 115.9734, capacity: 2000, facilities: "临京县、滤毒通风", access: "涿州市公交直达" },
            { id: "bd_007", name: "定州地下防护", type: "civil", level: "核6级", lat: 38.5234, lng: 114.9734, capacity: 1800, facilities: "县级市、大型储水", access: "定州市公交直达" },
            { id: "bd_008", name: "雄安地下人防", type: "government", level: "核5级", lat: 38.9534, lng: 115.9034, capacity: 3500, facilities: "新区、高标准建设", access: "雄安新区公交直达" }
        ],
        nuclearTargets: [
            { id: "bd_nt001", name: "保定电厂", type: "power", risk: "high", lat: 38.9234, lng: 115.4934, radius: 5000, description: "大型火力发电厂" },
            { id: "bd_nt002", name: "保定自来水厂", type: "water", risk: "high", lat: 38.8834, lng: 115.4734, radius: 3000, description: "主要供水厂" },
            { id: "bd_nt003", name: "雄安新区", type: "government", risk: "high", lat: 38.9534, lng: 115.9034, radius: 5000, description: "国家级新区" }
        ]
    }
};

// 导出批次3数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BATCH3_CITIES };
}
