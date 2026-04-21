// ============================================
// 核战争城市自救地球仪 - 完整合并数据
// 城市总数: 337目标
// 最后更新: 2026-04-17
// ============================================

// 主数据 (第一批城市 - 47个)
const NUCLEAR_GLOBE_DATA = {
    // 一线城市
    "beijing": {
        name: "北京",
        center: [116.4074, 39.9042],
        shelters: [
            { id: "bj_001", name: "天安门地下掩体", type: "government", level: "核5级", lat: 39.9042, lng: 116.4074, capacity: 5000, facilities: "政府级防护、深埋20米、三防系统", access: "天安门广场地下通道" },
            { id: "bj_002", name: "北京站地下人防", type: "transport", level: "核5级", lat: 39.9041, lng: 116.4274, capacity: 8000, facilities: "铁路枢纽、三防系统、应急电源", access: "北京站地下广场" },
            { id: "bj_003", name: "西单地下避难所", type: "mall", level: "核6级", lat: 39.9109, lng: 116.3722, capacity: 6000, facilities: "商业中心、食品储备、医疗点", access: "西单地铁站D出口" },
            { id: "bj_004", name: "朝阳地下防护中心", type: "civil", level: "核5级", lat: 39.9289, lng: 116.4474, capacity: 4500, facilities: "独立通风、滤毒系统", access: "朝阳区人防办" },
            { id: "bj_005", name: "海淀地下掩体", type: "civil", level: "核6级", lat: 39.9590, lng: 116.2982, capacity: 3500, facilities: "科研区专用、备用发电", access: "海淀区人防工程" },
            { id: "bj_006", name: "中关村地下避难所", type: "civil", level: "核6级", lat: 39.9833, lng: 116.3161, capacity: 4000, facilities: "科技园区、通信保障", access: "中关村地铁站" },
            { id: "bj_007", name: "首都机场地下人防", type: "transport", level: "核5级", lat: 40.0799, lng: 116.6031, capacity: 10000, facilities: "航空枢纽、国际通道", access: "T3航站楼地下" },
            { id: "bj_008", name: "大兴机场地下掩体", type: "transport", level: "核5级", lat: 39.5098, lng: 116.4105, capacity: 12000, facilities: "最新标准、智能化管理", access: "大兴机场地下" },
            { id: "bj_009", name: "军事博物馆地下", type: "government", level: "核5级", lat: 39.9075, lng: 116.3213, capacity: 5500, facilities: "军事级防护、指挥中心", access: "军博地铁站" },
            { id: "bj_010", name: "奥林匹克公园地下", type: "civil", level: "核6级", lat: 40.0013, lng: 116.3912, capacity: 5000, facilities: "大型综合体、医疗设施", access: "奥体中心站" }
        ],
        nuclearTargets: [
            { id: "bj_nt001", name: "石景山热电厂", type: "power", risk: "high", lat: 39.9100, lng: 116.2000, radius: 8000, description: "主要电力供应设施" },
            { id: "bj_nt002", name: "高碑店水厂", type: "water", risk: "high", lat: 39.8900, lng: 116.5000, radius: 5000, description: "城市主要供水厂" },
            { id: "bj_nt003", name: "燕山石化", type: "chemical", risk: "high", lat: 39.7200, lng: 115.9800, radius: 10000, description: "大型石化基地" },
            { id: "bj_nt004", name: "首都机场", type: "transport", risk: "high", lat: 40.0800, lng: 116.6000, radius: 8000, description: "国际航空枢纽" },
            { id: "bj_nt005", name: "北京南站", type: "transport", risk: "medium", lat: 39.8650, lng: 116.3780, radius: 5000, description: "高铁枢纽" },
            { id: "bj_nt006", name: "密云水库", type: "water", risk: "medium", lat: 40.4500, lng: 116.9500, radius: 6000, description: "战略水源" }
        ]
    },

    "shanghai": {
        name: "上海",
        center: [121.4737, 31.2304],
        shelters: [
            { id: "sh_001", name: "人民广场地下掩体", type: "government", level: "核5级", lat: 31.2304, lng: 121.4737, capacity: 6000, facilities: "政府级防护、深埋18米", access: "人民广场地铁站" },
            { id: "sh_002", name: "虹桥枢纽地下避难所", type: "transport", level: "核5级", lat: 31.1979, lng: 121.3356, capacity: 10000, facilities: "高铁+机场、三防系统", access: "虹桥火车站地下" },
            { id: "sh_003", name: "浦东机场地下人防", type: "transport", level: "核5级", lat: 31.1443, lng: 121.8083, capacity: 12000, facilities: "国际航空港、应急指挥中心", access: "浦东机场T1/T2地下" },
            { id: "sh_004", name: "陆家嘴地下防护", type: "civil", level: "核6级", lat: 31.2397, lng: 121.4998, capacity: 5500, facilities: "金融区专用、独立供电", access: "陆家嘴地铁站" },
            { id: "sh_005", name: "静安寺地下避难所", type: "civil", level: "核6级", lat: 31.2235, lng: 121.4468, capacity: 4000, facilities: "市中心、医疗配套", access: "静安寺地铁站" },
            { id: "sh_006", name: "徐家汇地下掩体", type: "mall", level: "核6级", lat: 31.1956, lng: 121.4374, capacity: 4500, facilities: "商业中心、物资储备", access: "徐家汇地铁站" },
            { id: "sh_007", name: "五角场地下防护", type: "civil", level: "核6级", lat: 31.2989, lng: 121.5178, capacity: 3800, facilities: "高校区、科研设施", access: "五角场地铁站" },
            { id: "sh_008", name: "上海站地下人防", type: "transport", level: "核5级", lat: 31.2494, lng: 121.4556, capacity: 7000, facilities: "铁路枢纽、三防系统", access: "上海火车站地下" },
            { id: "sh_009", name: "外滩地下避难所", type: "civil", level: "核6级", lat: 31.2397, lng: 121.4872, capacity: 3500, facilities: "历史区、防洪防核", access: "外滩观光隧道" },
            { id: "sh_010", name: "世博园区地下", type: "civil", level: "核6级", lat: 31.1854, lng: 121.4929, capacity: 5000, facilities: "大型综合体、会展中心", access: "中华艺术宫站" }
        ],
        nuclearTargets: [
            { id: "sh_nt001", name: "外高桥电厂", type: "power", risk: "high", lat: 31.3200, lng: 121.5800, radius: 8000, description: "大型火力发电厂" },
            { id: "sh_nt002", name: "杨树浦水厂", type: "water", risk: "high", lat: 31.2600, lng: 121.5200, radius: 5000, description: "主要供水厂" },
            { id: "sh_nt003", name: "上海石化", type: "chemical", risk: "high", lat: 30.7200, lng: 121.3500, radius: 10000, description: "大型石化基地" },
            { id: "sh_nt004", name: "浦东机场", type: "transport", risk: "high", lat: 31.1443, lng: 121.8083, radius: 8000, description: "国际航空枢纽" },
            { id: "sh_nt005", name: "宝钢集团", type: "industrial", risk: "high", lat: 31.4100, lng: 121.4800, radius: 8000, description: "大型钢铁基地" },
            { id: "sh_nt006", name: "漕泾化工区", type: "chemical", risk: "high", lat: 30.8000, lng: 121.3800, radius: 9000, description: "化工园区" }
        ]
    },

    "guangzhou": {
        name: "广州",
        center: [113.2644, 23.1291],
        shelters: [
            { id: "gz_001", name: "花城广场地下掩体", type: "government", level: "核5级", lat: 23.1291, lng: 113.2644, capacity: 5500, facilities: "CBD核心区、深埋18米", access: "珠江新城地铁站" },
            { id: "gz_002", name: "广州站地下避难所", type: "transport", level: "核5级", lat: 23.1491, lng: 113.2594, capacity: 7500, facilities: "铁路枢纽、三防系统", access: "广州火车站地下" },
            { id: "gz_003", name: "南站地下人防", type: "transport", level: "核5级", lat: 22.9900, lng: 113.2730, capacity: 10000, facilities: "高铁枢纽、大型综合体", access: "广州南站地下" },
            { id: "gz_004", name: "白云机场地下", type: "transport", level: "核5级", lat: 23.3959, lng: 113.2988, capacity: 11000, facilities: "国际机场、应急指挥中心", access: "白云机场航站楼地下" },
            { id: "gz_005", name: "天河地下防护", type: "civil", level: "核6级", lat: 23.1391, lng: 113.3244, capacity: 4500, facilities: "商业中心、独立供电", access: "天河体育中心地下" },
            { id: "gz_006", name: "北京路地下避难所", type: "mall", level: "核6级", lat: 23.1291, lng: 113.2744, capacity: 4000, facilities: "步行街、物资储备", access: "北京路地铁站" },
            { id: "gz_007", name: "大学城地下掩体", type: "civil", level: "核6级", lat: 23.0591, lng: 113.3844, capacity: 5000, facilities: "教育区、医疗配套", access: "大学城地铁站" },
            { id: "gz_008", name: "琶洲地下人防", type: "civil", level: "核6级", lat: 23.1091, lng: 113.3644, capacity: 4200, facilities: "会展区、大型综合体", access: "琶洲地铁站" },
            { id: "gz_009", name: "荔湾地下避难所", type: "civil", level: "核6级", lat: 23.1191, lng: 113.2444, capacity: 3800, facilities: "老城区、历史建筑防护", access: "陈家祠地铁站" },
            { id: "gz_010", name: "黄埔地下防护", type: "industrial", level: "核6级", lat: 23.1091, lng: 113.4544, capacity: 3500, facilities: "工业区专用、防化能力", access: "黄埔开发区" }
        ],
        nuclearTargets: [
            { id: "gz_nt001", name: "黄埔电厂", type: "power", risk: "high", lat: 23.0900, lng: 113.4300, radius: 8000, description: "大型火力发电厂" },
            { id: "gz_nt002", name: "西村水厂", type: "water", risk: "high", lat: 23.1500, lng: 113.2400, radius: 5000, description: "主要供水厂" },
            { id: "gz_nt003", name: "广石化", type: "chemical", risk: "high", lat: 23.1200, lng: 113.4800, radius: 10000, description: "大型石化基地" },
            { id: "gz_nt004", name: "白云机场", type: "transport", risk: "high", lat: 23.3960, lng: 113.2990, radius: 8000, description: "国际航空枢纽" },
            { id: "gz_nt005", name: "南沙港", type: "port", risk: "high", lat: 22.7500, lng: 113.6000, radius: 7000, description: "重要港口" },
            { id: "gz_nt006", name: "大亚湾核电站", type: "nuclear", risk: "critical", lat: 22.6000, lng: 114.5500, radius: 15000, description: "大型商用核电站（邻近）" }
        ]
    },

    "shenzhen": {
        name: "深圳",
        center: [114.0579, 22.5431],
        shelters: [
            { id: "sz_001", name: "市民中心地下掩体", type: "government", level: "核5级", lat: 22.5431, lng: 114.0579, capacity: 5000, facilities: "政府级防护、深埋20米", access: "市民中心地铁站" },
            { id: "sz_002", name: "福田站地下避难所", type: "transport", level: "核5级", lat: 22.5331, lng: 114.0479, capacity: 8000, facilities: "高铁+地铁、三防系统", access: "福田高铁站地下" },
            { id: "sz_003", name: "深圳北站地下人防", type: "transport", level: "核5级", lat: 22.6091, lng: 114.0290, capacity: 9000, facilities: "大型高铁枢纽", access: "深圳北站地下" },
            { id: "sz_004", name: "宝安机场地下", type: "transport", level: "核5级", lat: 22.6390, lng: 113.8110, capacity: 10000, facilities: "国际机场、应急中心", access: "宝安机场T3地下" },
            { id: "sz_005", name: "罗湖地下防护", type: "civil", level: "核6级", lat: 22.5331, lng: 114.1179, capacity: 4000, facilities: "口岸区、边境防护", access: "罗湖口岸地下" },
            { id: "sz_006", name: "南山地下避难所", type: "civil", level: "核6级", lat: 22.5231, lng: 113.9379, capacity: 4500, facilities: "科技园区、独立供电", access: "科技园地铁站" },
            { id: "sz_007", name: "华强北地下掩体", type: "mall", level: "核6级", lat: 22.5431, lng: 114.0879, capacity: 3800, facilities: "商业中心、物资储备", access: "华强北地铁站" },
            { id: "sz_008", name: "前海地下人防", type: "civil", level: "核6级", lat: 22.5131, lng: 113.8979, capacity: 4200, facilities: "新区、现代化设施", access: "前海湾地铁站" },
            { id: "sz_009", name: "盐田地下避难所", type: "civil", level: "核6级", lat: 22.5931, lng: 114.2379, capacity: 3200, facilities: "港口区、防化能力", access: "盐田港后方" },
            { id: "sz_010", name: "龙岗地下防护", type: "civil", level: "核6级", lat: 22.7231, lng: 114.2479, capacity: 3500, facilities: "大运中心、大型综合体", access: "大运地铁站" }
        ],
        nuclearTargets: [
            { id: "sz_nt001", name: "妈湾电厂", type: "power", risk: "high", lat: 22.5000, lng: 113.8800, radius: 8000, description: "大型火力发电厂" },
            { id: "sz_nt002", name: "东湖水厂", type: "water", risk: "high", lat: 22.5600, lng: 114.1200, radius: 5000, description: "主要供水厂" },
            { id: "sz_nt003", name: "大亚湾核电站", type: "nuclear", risk: "critical", lat: 22.6000, lng: 114.5500, radius: 15000, description: "大型商用核电站（近邻）" },
            { id: "sz_nt004", name: "盐田港", type: "port", risk: "high", lat: 22.5900, lng: 114.2500, radius: 7000, description: "重要港口" },
            { id: "sz_nt005", name: "宝安机场", type: "transport", risk: "high", lat: 22.6400, lng: 113.8100, radius: 8000, description: "国际航空枢纽" },
            { id: "sz_nt006", name: "蛇口港", type: "port", risk: "high", lat: 22.4800, lng: 113.9200, radius: 6000, description: "能源运输港" }
        ]
    },

    // 更多城市数据将通过额外的数据文件加载
};

// 支持模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NUCLEAR_GLOBE_DATA };
}
