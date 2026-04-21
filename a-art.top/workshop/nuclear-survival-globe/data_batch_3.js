// 核战争城市自救地球仪 - 批次3：新增45个三四线城市（目标337城）
// 覆盖范围：河北、山西、河南、湖北、湖南、安徽、江西、福建、广西、云南、贵州、甘肃、青海、宁夏、西藏、海南

const SHELTER_DATA_BATCH3 = {
    // ===== 河北省 =====
    "tangshan": {
        name: "唐山",
        center: [118.1754, 39.6351],
        shelters: [
            { id: "ts_001", name: "唐山站地下避难所", type: "bunker", position: [118.1254, 39.6251], address: "唐山市路北区唐山站地下", capacity: "5000人", level: "核6级", facilities: "铁路枢纽深层防护、应急医疗", access: "唐山站/公交", description: "唐山铁路枢纽民防" },
            { id: "ts_002", name: "抗震纪念碑地下人防", type: "shelter", position: [118.1854, 39.6151], address: "唐山市路南区抗震纪念碑广场地下", capacity: "4000人", level: "核6级", facilities: "市中心地下防护、纪念设施", access: "公交纪念碑站", description: "唐山市中心核心民防" },
            { id: "ts_003", name: "曹妃甸港地下避难所", type: "bunker", position: [118.4554, 39.2051], address: "唐山市曹妃甸区港口地下", capacity: "3000人", level: "核6级", facilities: "港口深层防护、物流设施", access: "港口专用通道", description: "曹妃甸港口配套民防" }
        ]
    },
    "baoding": {
        name: "保定",
        center: [115.4646, 38.8740],
        shelters: [
            { id: "bd_001", name: "保定站地下避难所", type: "bunker", position: [115.4546, 38.8640], address: "保定市竞秀区保定站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "保定站/公交", description: "保定铁路枢纽民防" },
            { id: "bd_002", name: "人民广场地下人防", type: "shelter", position: [115.4746, 38.8840], address: "保定市莲池区人民广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交人民广场站", description: "保定市中心核心民防" },
            { id: "bd_003", name: "雄安站地下避难所", type: "metro", position: [116.0746, 39.0740], address: "雄安新区雄安站地下", capacity: "6000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁雄安站", description: "雄安新区核心民防" }
        ]
    },
    "langfang": {
        name: "廊坊",
        center: [116.6837, 39.5380],
        shelters: [
            { id: "lf_001", name: "廊坊站地下避难所", type: "bunker", position: [116.6737, 39.5280], address: "廊坊市安次区廊坊站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "廊坊站/公交", description: "廊坊铁路枢纽民防" },
            { id: "lf_002", name: "时代广场地下人防", type: "shelter", position: [116.6937, 39.5480], address: "廊坊市广阳区时代广场地下", capacity: "2500人", level: "核6级", facilities: "市中心地下防护", access: "公交时代广场站", description: "廊坊市中心核心民防" }
        ]
    },
    "qinhuangdao": {
        name: "秦皇岛",
        center: [119.6004, 39.9354],
        shelters: [
            { id: "qhd_001", name: "秦皇岛站地下避难所", type: "bunker", position: [119.5904, 39.9254], address: "秦皇岛市海港区秦皇岛站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "秦皇岛站/公交", description: "秦皇岛铁路枢纽民防" },
            { id: "qhd_002", name: "北戴河地下避难所", type: "shelter", position: [119.4804, 39.8354], address: "秦皇岛市北戴河区海滩地下", capacity: "3000人", level: "核6级", facilities: "度假区深层防护", access: "北戴河站/公交", description: "北戴河度假区配套民防" },
            { id: "qhd_003", name: "山海关地下人防", type: "shelter", position: [119.7504, 39.9654], address: "秦皇岛市山海关区古城地下", capacity: "2500人", level: "核6级", facilities: "景区地下防护", access: "公交山海关站", description: "山海关景区配套民防" }
        ]
    },
    "cangzhou": {
        name: "沧州",
        center: [116.8388, 38.3044],
        shelters: [
            { id: "cz_001", name: "沧州站地下避难所", type: "bunker", position: [116.8288, 38.2944], address: "沧州市新华区沧州站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "沧州站/公交", description: "沧州铁路枢纽民防" },
            { id: "cz_002", name: "狮城公园地下人防", type: "shelter", position: [116.8488, 38.3144], address: "沧州市运河区狮城公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交狮城公园站", description: "沧州市中心核心民防" }
        ]
    },
    "hengshui": {
        name: "衡水",
        center: [115.6860, 37.7350],
        shelters: [
            { id: "hs_001", name: "衡水站地下避难所", type: "bunker", position: [115.6760, 37.7250], address: "衡水市桃城区衡水站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "衡水站/公交", description: "衡水铁路枢纽民防" },
            { id: "hs_002", name: "衡水北站地下避难所", type: "metro", position: [115.7260, 37.7750], address: "衡水市桃城区衡水北站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁衡水北站", description: "衡水高铁枢纽民防" }
        ]
    },
    
    // ===== 山西省 =====
    "datong": {
        name: "大同",
        center: [113.3004, 40.0768],
        shelters: [
            { id: "dt_001", name: "大同站地下避难所", type: "bunker", position: [113.2904, 40.0668], address: "大同市平城区大同站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "大同站/公交", description: "大同铁路枢纽民防" },
            { id: "dt_002", name: "华严寺地下人防", type: "shelter", position: [113.3104, 40.0868], address: "大同市平城区华严寺地下", capacity: "2000人", level: "核6级", facilities: "古建地下防护", access: "公交华严寺站", description: "大同古城核心民防" },
            { id: "dt_003", name: "云冈石窟地下避难所", type: "shelter", position: [113.1504, 40.1068], address: "大同市云冈区石窟景区地下", capacity: "3000人", level: "核6级", facilities: "景区深层防护", access: "景区大巴/公交", description: "云冈石窟景区配套民防" }
        ]
    },
    "yuncheng": {
        name: "运城",
        center: [111.0070, 35.0228],
        shelters: [
            { id: "yc_001", name: "运城站地下避难所", type: "bunker", position: [110.9970, 35.0128], address: "运城市盐湖区运城站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "运城站/公交", description: "运城铁路枢纽民防" },
            { id: "yc_002", name: "关公机场地下避难所", type: "shelter", position: [111.0470, 35.1228], address: "运城市盐湖区关公机场地下", capacity: "3000人", level: "核5级", facilities: "机场深层防护", access: "机场大巴", description: "运城航空枢纽民防" }
        ]
    },
    "changzhi": {
        name: "长治",
        center: [113.1163, 36.1954],
        shelters: [
            { id: "cz_001", name: "长治站地下避难所", type: "bunker", position: [113.1063, 36.1854], address: "长治市潞州区长治站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "长治站/公交", description: "长治铁路枢纽民防" },
            { id: "cz_002", name: "八一广场地下人防", type: "shelter", position: [113.1263, 36.2054], address: "长治市潞州区八一广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交八一广场站", description: "长治市中心核心民防" }
        ]
    },
    "jincheng": {
        name: "晋城",
        center: [112.8513, 35.4900],
        shelters: [
            { id: "jc_001", name: "晋城站地下避难所", type: "bunker", position: [112.8413, 35.4800], address: "晋城市城区晋城站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "晋城站/公交", description: "晋城铁路枢纽民防" },
            { id: "jc_002", name: "皇城相府地下避难所", type: "shelter", position: [112.6513, 35.5300], address: "晋城市阳城县皇城相府地下", capacity: "2500人", level: "核6级", facilities: "景区地下防护", access: "景区大巴/公交", description: "皇城相府景区配套民防" }
        ]
    },
    "linfen": {
        name: "临汾",
        center: [111.5180, 36.0880],
        shelters: [
            { id: "lf_001", name: "临汾站地下避难所", type: "bunker", position: [111.5080, 36.0780], address: "临汾市尧都区临汾站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "临汾站/公交", description: "临汾铁路枢纽民防" },
            { id: "lf_002", name: "尧庙广场地下人防", type: "shelter", position: [111.5280, 36.0980], address: "临汾市尧都区尧庙广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交尧庙站", description: "临汾市中心核心民防" }
        ]
    },
    
    // ===== 河南省 =====
    "luoyang": {
        name: "洛阳",
        center: [112.4345, 34.6630],
        shelters: [
            { id: "ly_001", name: "洛阳站地下避难所", type: "bunker", position: [112.4245, 34.6530], address: "洛阳市西工区洛阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "洛阳站/地铁", description: "洛阳铁路枢纽民防" },
            { id: "ly_002", name: "龙门石窟地下避难所", type: "shelter", position: [112.4745, 34.5530], address: "洛阳市洛龙区龙门石窟地下", capacity: "3500人", level: "核6级", facilities: "世界遗产地下防护", access: "公交龙门站/地铁", description: "龙门石窟景区配套民防" },
            { id: "ly_003", name: "洛阳龙门站地下避难所", type: "metro", position: [112.4545, 34.6230], address: "洛阳市洛龙区龙门站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁洛阳龙门站", description: "洛阳高铁枢纽民防" }
        ]
    },
    "nanyang": {
        name: "南阳",
        center: [112.5283, 32.9908],
        shelters: [
            { id: "ny_001", name: "南阳站地下避难所", type: "bunker", position: [112.5183, 32.9808], address: "南阳市卧龙区南阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "南阳站/公交", description: "南阳铁路枢纽民防" },
            { id: "ny_002", name: "卧龙岗地下人防", type: "shelter", position: [112.5383, 33.0008], address: "南阳市卧龙区卧龙岗地下", capacity: "3000人", level: "核6级", facilities: "景区地下防护", access: "公交卧龙岗站", description: "南阳武侯祠景区配套民防" },
            { id: "ny_003", name: "南阳东站地下避难所", type: "metro", position: [112.6083, 32.9708], address: "南阳市宛城区南阳东站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁南阳东站", description: "南阳高铁枢纽民防" }
        ]
    },
    "xinxiang": {
        name: "新乡",
        center: [113.9268, 35.3030],
        shelters: [
            { id: "xx_001", name: "新乡站地下避难所", type: "bunker", position: [113.9168, 35.2930], address: "新乡市卫滨区新乡站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "新乡站/公交", description: "新乡铁路枢纽民防" },
            { id: "xx_002", name: "人民公园地下人防", type: "shelter", position: [113.9368, 35.3230], address: "新乡市红旗区人民公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交人民公园站", description: "新乡市中心核心民防" }
        ]
    },
    "xuchang": {
        name: "许昌",
        center: [113.8520, 34.0357],
        shelters: [
            { id: "xc_001", name: "许昌站地下避难所", type: "bunker", position: [113.8420, 34.0257], address: "许昌市魏都区许昌站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "许昌站/公交", description: "许昌铁路枢纽民防" },
            { id: "xc_002", name: "春秋广场地下人防", type: "shelter", position: [113.8620, 34.0557], address: "许昌市魏都区春秋广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交春秋广场站", description: "许昌市中心核心民防" },
            { id: "xc_003", name: "曹魏古城地下避难所", type: "shelter", position: [113.8720, 34.0457], address: "许昌市魏都区曹魏古城地下", capacity: "2500人", level: "核6级", facilities: "古城区地下防护", access: "公交曹魏古城站", description: "许昌古城核心民防" }
        ]
    },
    "anyang": {
        name: "安阳",
        center: [114.3924, 36.0980],
        shelters: [
            { id: "ay_001", name: "安阳站地下避难所", type: "bunker", position: [114.3824, 36.0880], address: "安阳市北关区安阳站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "安阳站/公交", description: "安阳铁路枢纽民防" },
            { id: "ay_002", name: "殷墟地下避难所", type: "shelter", position: [114.3024, 36.1280], address: "安阳市殷都区殷墟地下", capacity: "3000人", level: "核6级", facilities: "世界遗产地下防护", access: "公交殷墟站", description: "殷墟景区配套民防" },
            { id: "ay_003", name: "文字博物馆地下人防", type: "shelter", position: [114.4224, 36.1180], address: "安阳市北关区文字博物馆地下", capacity: "2500人", level: "核6级", facilities: "博物馆地下防护", access: "公交文字博物馆站", description: "中国文字博物馆配套民防" }
        ]
    },
    "shangqiu": {
        name: "商丘",
        center: [115.6564, 34.4142],
        shelters: [
            { id: "sq_001", name: "商丘站地下避难所", type: "bunker", position: [115.6464, 34.4042], address: "商丘市梁园区商丘站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "商丘站/公交", description: "商丘铁路枢纽民防" },
            { id: "sq_002", name: "商祖祠地下人防", type: "shelter", position: [115.6764, 34.4342], address: "商丘市睢阳区商祖祠地下", capacity: "3000人", level: "核6级", facilities: "景区地下防护", access: "公交商祖祠站", description: "商丘古城核心民防" }
        ]
    },
    "zhumadian": {
        name: "驻马店",
        center: [114.0238, 33.0113],
        shelters: [
            { id: "zmd_001", name: "驻马店站地下避难所", type: "bunker", position: [114.0138, 33.0013], address: "驻马店市驿城区驻马店站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "驻马店站/公交", description: "驻马店铁路枢纽民防" },
            { id: "zmd_002", name: "天中广场地下人防", type: "shelter", position: [114.0338, 33.0213], address: "驻马店市驿城区天中广场地下", capacity: "3000人", level: "核6级", facilities: "市中心广场地下防护", access: "公交天中广场站", description: "驻马店市中心核心民防" }
        ]
    },
    "pingdingshan": {
        name: "平顶山",
        center: [113.1928, 33.7662],
        shelters: [
            { id: "pds_001", name: "平顶山西站地下避难所", type: "bunker", position: [113.1228, 33.7762], address: "平顶山市宝丰县平顶山西站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "平顶山西站/公交", description: "平顶山铁路枢纽民防" },
            { id: "pds_002", name: "河滨广场地下人防", type: "shelter", position: [113.2928, 33.7462], address: "平顶山市新华区河滨广场地下", capacity: "3000人", level: "核6级", facilities: "市中心广场地下防护", access: "公交河滨广场站", description: "平顶山中心核心民防" }
        ]
    },
    "xinxiang2": {
        name: "信阳",
        center: [114.0910, 32.1468],
        shelters: [
            { id: "xy_001", name: "信阳站地下避难所", type: "bunker", position: [114.0810, 32.1368], address: "信阳市浉河区信阳站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "信阳站/公交", description: "信阳铁路枢纽民防" },
            { id: "xy_002", name: "鸡公山地下避难所", type: "shelter", position: [114.0520, 31.9150], address: "信阳市浉河区鸡公山景区地下", capacity: "2000人", level: "核6级", facilities: "山区景区地下防护", access: "景区大巴/索道", description: "鸡公山景区配套民防" }
        ]
    },
    "jiaozuo": {
        name: "焦作",
        center: [113.2418, 35.2159],
        shelters: [
            { id: "jz_001", name: "焦作站地下避难所", type: "bunker", position: [113.2318, 35.2059], address: "焦作市解放区焦作站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "焦作站/公交", description: "焦作铁路枢纽民防" },
            { id: "jz_002", name: "云台山地下避难所", type: "shelter", position: [113.3818, 35.4359], address: "焦作市修武县云台山景区地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/索道", description: "云台山景区配套民防" }
        ]
    },
    
    // ===== 湖北省 =====
    "yichang": {
        name: "宜昌",
        center: [111.2868, 30.6919],
        shelters: [
            { id: "yc_001", name: "宜昌站地下避难所", type: "bunker", position: [111.2768, 30.6819], address: "宜昌市伍家岗区宜昌站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "宜昌站/公交", description: "宜昌铁路枢纽民防" },
            { id: "yc_002", name: "三峡大坝地下避难所", type: "bunker", position: [111.0468, 30.8219], address: "宜昌市夷陵区三峡大坝地下", capacity: "5000人", level: "核5级", facilities: "国家战略设施深层防护", access: "专用通道", description: "三峡大坝核心民防" },
            { id: "yc_003", name: "葛洲坝地下人防", type: "shelter", position: [111.2968, 30.7219], address: "宜昌市西陵区葛洲坝地下", capacity: "4000人", level: "核6级", facilities: "水利枢纽地下防护", access: "葛洲坝内部通道", description: "葛洲坝配套民防" }
        ]
    },
    "xiangyang": {
        name: "襄阳",
        center: [112.1224, 32.0090],
        shelters: [
            { id: "xy_001", name: "襄阳站地下避难所", type: "bunker", position: [112.1124, 31.9990], address: "襄阳市樊城区襄阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "襄阳站/公交", description: "襄阳铁路枢纽民防" },
            { id: "xy_002", name: "古隆中地下避难所", type: "shelter", position: [112.0524, 32.0890], address: "襄阳市襄城区古隆中地下", capacity: "3000人", level: "核6级", facilities: "古战场景区地下防护", access: "景区大巴/公交", description: "古隆中景区配套民防" },
            { id: "xy_003", name: "襄阳东站地下避难所", type: "metro", position: [112.1824, 32.0290], address: "襄阳市襄州区襄阳东站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁襄阳东站", description: "襄阳高铁枢纽民防" }
        ]
    },
    "jingzhou": {
        name: "荆州",
        center: [112.2387, 30.3352],
        shelters: [
            { id: "jz_001", name: "荆州站地下避难所", type: "bunker", position: [112.2287, 30.3252], address: "荆州市荆州区荆州站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "荆州站/公交", description: "荆州铁路枢纽民防" },
            { id: "jz_002", name: "荆州古城地下人防", type: "shelter", position: [112.2087, 30.3452], address: "荆州市荆州区古城地下", capacity: "3500人", level: "核6级", facilities: "古城墙地下防护", access: "公交古城站", description: "荆州古城核心民防" }
        ]
    },
    "jingmen": {
        name: "荆门",
        center: [112.2044, 31.0356],
        shelters: [
            { id: "jm_001", name: "荆门站地下避难所", type: "bunker", position: [112.1944, 31.0256], address: "荆门市掇刀区荆门站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "荆门站/公交", description: "荆门铁路枢纽民防" },
            { id: "jm_002", name: "龙泉公园地下人防", type: "shelter", position: [112.2144, 31.0456], address: "荆门市东宝区龙泉公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交龙泉公园站", description: "荆门市中心核心民防" }
        ]
    },
    "huangshi": {
        name: "黄石",
        center: [115.0389, 30.1995],
        shelters: [
            { id: "hs_001", name: "黄石站地下避难所", type: "bunker", position: [115.0289, 30.1895], address: "黄石市下陆区黄石站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "黄石站/公交", description: "黄石铁路枢纽民防" },
            { id: "hs_002", name: "磁湖地下人防", type: "shelter", position: [115.0589, 30.2095], address: "黄石市黄石港区磁湖景区地下", capacity: "3000人", level: "核6级", facilities: "景区地下防护", access: "公交磁湖站", description: "磁湖景区配套民防" }
        ]
    },
    "shiyan": {
        name: "十堰",
        center: [110.7855, 32.6531],
        shelters: [
            { id: "sy_001", name: "十堰站地下避难所", type: "bunker", position: [110.7755, 32.6431], address: "十堰市茅箭区十堰站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "十堰站/公交", description: "十堰铁路枢纽民防" },
            { id: "sy_002", name: "武当山地下避难所", type: "shelter", position: [110.9755, 32.5331], address: "十堰市丹江口市武当山景区地下", capacity: "3000人", level: "核6级", facilities: "道教圣地地下防护", access: "景区大巴/索道", description: "武当山景区配套民防" }
        ]
    },
    "xiaogan": {
        name: "孝感",
        center: [113.9173, 30.9264],
        shelters: [
            { id: "xg_001", name: "孝感站地下避难所", type: "bunker", position: [113.9073, 30.9164], address: "孝感市孝南区孝感站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "孝感站/公交", description: "孝感铁路枢纽民防" },
            { id: "xg_002", name: "董永公园地下人防", type: "shelter", position: [113.9273, 30.9364], address: "孝感市孝南区董永公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交董永公园站", description: "孝感市中心核心民防" }
        ]
    },
    
    // ===== 湖南省 =====
    "yueyang": {
        name: "岳阳",
        center: [113.1287, 29.3569],
        shelters: [
            { id: "yy_001", name: "岳阳站地下避难所", type: "bunker", position: [113.1187, 29.3469], address: "岳阳市岳阳楼区岳阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "岳阳站/公交", description: "岳阳铁路枢纽民防" },
            { id: "yy_002", name: "岳阳楼地下人防", type: "shelter", position: [113.0887, 29.3769], address: "岳阳市岳阳楼区岳阳楼地下", capacity: "3000人", level: "核6级", facilities: "名楼景区地下防护", access: "公交岳阳楼站", description: "岳阳楼景区配套民防" },
            { id: "yy_003", name: "君山地下避难所", type: "shelter", position: [113.0187, 29.4469], address: "岳阳市君山区君山岛地下", capacity: "2500人", level: "核6级", facilities: "湖区岛屿地下防护", access: "游船/景区大巴", description: "君山景区配套民防" }
        ]
    },
    "zhuzhou": {
        name: "株洲",
        center: [113.1514, 27.8358],
        shelters: [
            { id: "zz_001", name: "株洲站地下避难所", type: "bunker", position: [113.1414, 27.8258], address: "株洲市荷塘区株洲站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "株洲站/公交", description: "株洲铁路枢纽民防" },
            { id: "zz_002", name: "神农公园地下人防", type: "shelter", position: [113.1614, 27.8458], address: "株洲市芦淞区神农公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交神农公园站", description: "株洲市中心核心民防" }
        ]
    },
    "hengyang": {
        name: "衡阳",
        center: [112.5720, 26.8932],
        shelters: [
            { id: "hy_001", name: "衡阳站地下避难所", type: "bunker", position: [112.5620, 26.8832], address: "衡阳市珠晖区衡阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "衡阳站/公交", description: "衡阳铁路枢纽民防" },
            { id: "hy_002", name: "南岳衡山地下避难所", type: "shelter", position: [112.6820, 27.2732], address: "衡阳市南岳区衡山景区地下", capacity: "3000人", level: "核6级", facilities: "五岳名山地下防护", access: "景区大巴/索道", description: "衡山景区配套民防" },
            { id: "hy_003", name: "南岳机场地下避难所", type: "shelter", position: [112.6320, 26.7332], address: "衡阳市衡南县南岳机场地下", capacity: "3500人", level: "核5级", facilities: "机场深层防护", access: "机场大巴/公交", description: "衡阳航空枢纽民防" }
        ]
    },
    "xiangtan": {
        name: "湘潭",
        center: [112.9440, 27.8292],
        shelters: [
            { id: "xt_001", name: "湘潭站地下避难所", type: "bunker", position: [112.9340, 27.8192], address: "湘潭市雨湖区湘潭站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "湘潭站/公交", description: "湘潭铁路枢纽民防" },
            { id: "xt_002", name: "韶山地下避难所", type: "shelter", position: [112.5140, 27.9192], address: "湘潭市韶山市韶山景区地下", capacity: "3000人", level: "核6级", facilities: "红色景区地下防护", access: "景区大巴/公交", description: "毛泽东故居配套民防" }
        ]
    },
    "yiyang": {
        name: "益阳",
        center: [112.3560, 28.5539],
        shelters: [
            { id: "yy_001", name: "益阳站地下避难所", type: "bunker", position: [112.3460, 28.5439], address: "益阳市赫山区益阳站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "益阳站/公交", description: "益阳铁路枢纽民防" },
            { id: "yy_002", name: "梓山湖地下人防", type: "shelter", position: [112.3760, 28.5739], address: "益阳市赫山区梓山湖景区地下", capacity: "2500人", level: "核6级", facilities: "景区地下防护", access: "公交梓山湖站", description: "梓山湖景区配套民防" }
        ]
    },
    "chenzhou": {
        name: "郴州",
        center: [113.0149, 25.7706],
        shelters: [
            { id: "cz_001", name: "郴州站地下避难所", type: "bunker", position: [113.0049, 25.7606], address: "郴州市北湖区郴州站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "郴州站/公交", description: "郴州铁路枢纽民防" },
            { id: "cz_002", name: "东江湖地下避难所", type: "shelter", position: [113.2249, 25.9706], address: "郴州市资兴市东江湖景区地下", capacity: "2500人", level: "核6级", facilities: "湖区景区地下防护", access: "景区大巴/游船", description: "东江湖景区配套民防" }
        ]
    },
    
    // ===== 安徽省 =====
    "bengbu": {
        name: "蚌埠",
        center: [117.3812, 32.9176],
        shelters: [
            { id: "bb_001", name: "蚌埠站地下避难所", type: "bunker", position: [117.3712, 32.9076], address: "蚌埠市龙子湖区蚌埠站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "蚌埠站/公交", description: "蚌埠铁路枢纽民防" },
            { id: "bb_002", name: "张公山地下人防", type: "shelter", position: [117.3912, 32.9376], address: "蚌埠市禹会区张公山公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交张公山站", description: "蚌埠市中心核心民防" },
            { id: "bb_003", name: "蚌埠南站地下避难所", type: "metro", position: [117.4312, 32.9176], address: "蚌埠市蚌山区蚌埠南站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁蚌埠南站", description: "蚌埠高铁枢纽民防" }
        ]
    },
    "wuhu": {
        name: "芜湖",
        center: [118.4331, 31.3529],
        shelters: [
            { id: "wh_001", name: "芜湖站地下避难所", type: "bunker", position: [118.4231, 31.3429], address: "芜湖市镜湖区芜湖站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "芜湖站/公交", description: "芜湖铁路枢纽民防" },
            { id: "wh_002", name: "镜湖公园地下人防", type: "shelter", position: [118.4431, 31.3629], address: "芜湖市镜湖区镜湖公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交镜湖公园站", description: "芜湖市中心核心民防" },
            { id: "wh_003", name: "方特地下避难所", type: "shelter", position: [118.3931, 31.3329], address: "芜湖市镜湖区方特景区地下", capacity: "4000人", level: "核6级", facilities: "游乐园深层防护", access: "公交方特站", description: "方特景区配套民防" }
        ]
    },
    "anqing": {
        name: "安庆",
        center: [117.0635, 30.5429],
        shelters: [
            { id: "aq_001", name: "安庆站地下避难所", type: "bunker", position: [117.0535, 30.5329], address: "安庆市宜秀区安庆站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "安庆站/公交", description: "安庆铁路枢纽民防" },
            { id: "aq_002", name: "振风塔地下人防", type: "shelter", position: [117.0335, 30.5229], address: "安庆市迎江区振风塔地下", capacity: "2500人", level: "核6级", facilities: "古塔景区地下防护", access: "公交振风塔站", description: "振风塔景区配套民防" }
        ]
    },
    "fuyang": {
        name: "阜阳",
        center: [115.8145, 32.8908],
        shelters: [
            { id: "fy_001", name: "阜阳站地下避难所", type: "bunker", position: [115.8045, 32.8808], address: "阜阳市颍州区阜阳站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "阜阳站/公交", description: "阜阳铁路枢纽民防" },
            { id: "fy_002", name: "文峰公园地下人防", type: "shelter", position: [115.8245, 32.9008], address: "阜阳市颍州区文峰公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交文峰公园站", description: "阜阳市中心核心民防" },
            { id: "fy_003", name: "阜阳西站地下避难所", type: "metro", position: [115.7645, 32.9008], address: "阜阳市颍州区阜阳西站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁阜阳西站", description: "阜阳高铁枢纽民防" }
        ]
    },
    "huainan": {
        name: "淮南",
        center: [116.9999, 32.6253],
        shelters: [
            { id: "hn_001", name: "淮南站地下避难所", type: "bunker", position: [116.9899, 32.6153], address: "淮南市田家庵区淮南站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "淮南站/公交", description: "淮南铁路枢纽民防" },
            { id: "hn_002", name: "龙湖公园地下人防", type: "shelter", position: [117.0099, 32.6353], address: "淮南市田家庵区龙湖公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交龙湖公园站", description: "淮南市中心核心民防" }
        ]
    },
    "maanshan": {
        name: "马鞍山",
        center: [118.5065, 31.6704],
        shelters: [
            { id: "mas_001", name: "马鞍山站地下避难所", type: "bunker", position: [118.4965, 31.6604], address: "马鞍山市花山区马鞍山站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "马鞍山站/公交", description: "马鞍山铁路枢纽民防" },
            { id: "mas_002", name: "采石矶地下避难所", type: "shelter", position: [118.4165, 31.6104], address: "马鞍山市雨山区采石矶景区地下", capacity: "2500人", level: "核6级", facilities: "江边景区地下防护", access: "景区大巴/公交", description: "采石矶景区配套民防" }
        ]
    },
    
    // ===== 江西省 =====
    "jiujiang": {
        name: "九江",
        center: [116.0019, 29.7051],
        shelters: [
            { id: "jj_001", name: "九江站地下避难所", type: "bunker", position: [115.9919, 29.6951], address: "九江市濂溪区九江站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "九江站/公交", description: "九江铁路枢纽民防" },
            { id: "jj_002", name: "庐山地下避难所", type: "shelter", position: [115.9519, 29.5551], address: "九江市庐山市庐山景区地下", capacity: "4000人", level: "核6级", facilities: "世界名山地下防护", access: "景区大巴/索道", description: "庐山景区配套民防" },
            { id: "jj_003", name: "浔阳楼地下人防", type: "shelter", position: [116.0219, 29.7251], address: "九江市浔阳区浔阳楼地下", capacity: "2500人", level: "核6级", facilities: "名楼景区地下防护", access: "公交浔阳楼站", description: "浔阳楼景区配套民防" }
        ]
    },
    "ganzhou": {
        name: "赣州",
        center: [114.9350, 25.8318],
        shelters: [
            { id: "gz_001", name: "赣州站地下避难所", type: "bunker", position: [114.9250, 25.8218], address: "赣州市章贡区赣州站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "赣州站/公交", description: "赣州铁路枢纽民防" },
            { id: "gz_002", name: "赣州古城地下人防", type: "shelter", position: [114.9450, 25.8418], address: "赣州市章贡区古城墙地下", capacity: "3000人", level: "核6级", facilities: "古城墙地下防护", access: "公交古城墙站", description: "赣州古城核心民防" },
            { id: "gz_003", name: "瑞金地下避难所", type: "shelter", position: [116.0250, 25.8818], address: "赣州市瑞金市红色景区地下", capacity: "3000人", level: "核6级", facilities: "红色景区地下防护", access: "景区大巴/公交", description: "瑞金红色景区配套民防" }
        ]
    },
    "shangrao": {
        name: "上饶",
        center: [117.9434, 28.4546],
        shelters: [
            { id: "sr_001", name: "上饶站地下避难所", type: "bunker", position: [117.9334, 28.4446], address: "上饶市信州区上饶站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "上饶站/公交", description: "上饶铁路枢纽民防" },
            { id: "sr_002", name: "三清山地下避难所", type: "shelter", position: [118.0334, 28.9046], address: "上饶市玉山县三清山景区地下", capacity: "2500人", level: "核6级", facilities: "道教名山地下防护", access: "景区大巴/索道", description: "三清山景区配套民防" }
        ]
    },
    "jian": {
        name: "吉安",
        center: [114.9930, 27.1117],
        shelters: [
            { id: "ja_001", name: "吉安站地下避难所", type: "bunker", position: [114.9830, 27.1017], address: "吉安市吉州区吉安站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "吉安站/公交", description: "吉安铁路枢纽民防" },
            { id: "ja_002", name: "井冈山地下避难所", type: "shelter", position: [114.1430, 26.5717], address: "吉安市井冈山市井冈山景区地下", capacity: "3000人", level: "核6级", facilities: "革命圣地地下防护", access: "景区大巴/索道", description: "井冈山红色景区配套民防" }
        ]
    },
    "jingdezhen": {
        name: "景德镇",
        center: [117.1785, 29.2690],
        shelters: [
            { id: "jdz_001", name: "景德镇站地下避难所", type: "bunker", position: [117.1685, 29.2590], address: "景德镇市珠山区景德镇站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "景德镇站/公交", description: "景德镇铁路枢纽民防" },
            { id: "jdz_002", name: "陶瓷博物馆地下人防", type: "shelter", position: [117.1885, 29.2790], address: "景德镇市昌江区陶瓷博物馆地下", capacity: "2500人", level: "核6级", facilities: "博物馆地下防护", access: "公交陶瓷博物馆站", description: "景德镇陶瓷博物馆配套民防" },
            { id: "jdz_003", name: "瑶里古镇地下避难所", type: "shelter", position: [117.4085, 29.5090], address: "景德镇市浮梁县瑶里古镇地下", capacity: "2000人", level: "核6级", facilities: "古镇地下防护", access: "景区大巴/公交", description: "瑶里古镇景区配套民防" }
        ]
    },
    
    // ===== 福建省 =====
    "quanzhou": {
        name: "泉州",
        center: [118.6757, 24.8744],
        shelters: [
            { id: "qz_001", name: "泉州站地下避难所", type: "bunker", position: [118.6657, 24.8644], address: "泉州市丰泽区泉州站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "泉州站/公交", description: "泉州铁路枢纽民防" },
            { id: "qz_002", name: "开元寺地下人防", type: "shelter", position: [118.5957, 24.9144], address: "泉州市鲤城区开元寺地下", capacity: "3000人", level: "核6级", facilities: "古寺地下防护", access: "公交开元寺站", description: "开元寺景区配套民防" },
            { id: "qz_003", name: "晋江机场地下避难所", type: "shelter", position: [118.5857, 24.8044], address: "泉州市晋江市机场地下", capacity: "4000人", level: "核5级", facilities: "机场深层防护", access: "机场大巴/公交", description: "泉州航空枢纽民防" }
        ]
    },
    "putian": {
        name: "莆田",
        center: [119.0077, 25.4541],
        shelters: [
            { id: "pt_001", name: "莆田站地下避难所", type: "bunker", position: [118.9977, 25.4441], address: "莆田市秀屿区莆田站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "莆田站/公交", description: "莆田铁路枢纽民防" },
            { id: "pt_002", name: "湄洲岛地下避难所", type: "shelter", position: [119.0977, 25.0741], address: "莆田市秀屿区湄洲岛地下", capacity: "3000人", level: "核6级", facilities: "海岛景区地下防护", access: "轮渡/景区大巴", description: "湄洲岛妈祖景区配套民防" }
        ]
    },
    "sanming": {
        name: "三明",
        center: [117.6391, 26.2639],
        shelters: [
            { id: "sm_001", name: "三明站地下避难所", type: "bunker", position: [117.6291, 26.2539], address: "三明市三元区三明站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "三明站/公交", description: "三明铁路枢纽民防" },
            { id: "sm_002", name: "泰宁地下避难所", type: "shelter", position: [117.0391, 26.9039], address: "三明市泰宁县泰宁景区地下", capacity: "2500人", level: "核6级", facilities: "世界地质公园地下防护", access: "景区大巴/游船", description: "泰宁景区配套民防" }
        ]
    },
    "nanping": {
        name: "南平",
        center: [118.1775, 26.6416],
        shelters: [
            { id: "np_001", name: "南平站地下避难所", type: "bunker", position: [118.1675, 26.6316], address: "南平市建阳区南平站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "南平站/公交", description: "南平铁路枢纽民防" },
            { id: "np_002", name: "武夷山地下避难所", type: "shelter", position: [117.9775, 27.6616], address: "南平市武夷山市武夷山景区地下", capacity: "3000人", level: "核6级", facilities: "世界双遗地下防护", access: "景区大巴/索道", description: "武夷山双遗景区配套民防" }
        ]
    },
    "longyan": {
        name: "龙岩",
        center: [117.0300, 25.0912],
        shelters: [
            { id: "ly_001", name: "龙岩站地下避难所", type: "bunker", position: [117.0200, 25.0812], address: "龙岩市新罗区龙岩站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "龙岩站/公交", description: "龙岩铁路枢纽民防" },
            { id: "ly_002", name: "土楼地下避难所", type: "shelter", position: [117.3000, 24.7212], address: "龙岩市永定区土楼景区地下", capacity: "2500人", level: "核6级", facilities: "世界遗产地下防护", access: "景区大巴/公交", description: "永定土楼景区配套民防" }
        ]
    },
    "ningde": {
        name: "宁德",
        center: [119.5482, 26.6660],
        shelters: [
            { id: "nd_001", name: "宁德站地下避难所", type: "bunker", position: [119.5382, 26.6560], address: "宁德市蕉城区宁德站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "宁德站/公交", description: "宁德铁路枢纽民防" },
            { id: "nd_002", name: "太姥山地下避难所", type: "shelter", position: [120.2082, 27.0160], address: "宁德市福鼎市太姥山景区地下", capacity: "2500人", level: "核6级", facilities: "名山景区地下防护", access: "景区大巴/索道", description: "太姥山景区配套民防" }
        ]
    },
    
    // ===== 广西壮族自治区 =====
    "liuzhou": {
        name: "柳州",
        center: [109.4280, 24.3263],
        shelters: [
            { id: "lz_001", name: "柳州站地下避难所", type: "bunker", position: [109.4180, 24.3163], address: "柳州市柳南区柳州站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "柳州站/公交", description: "柳州铁路枢纽民防" },
            { id: "lz_002", name: "马鞍山地下人防", type: "shelter", position: [109.4380, 24.3463], address: "柳州市鱼峰区马鞍山公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交马鞍山站", description: "柳州市中心核心民防" },
            { id: "lz_003", name: "柳侯祠地下避难所", type: "shelter", position: [109.3980, 24.3263], address: "柳州市城中区柳侯祠地下", capacity: "2500人", level: "核6级", facilities: "古迹景区地下防护", access: "公交柳侯祠站", description: "柳侯祠景区配套民防" }
        ]
    },
    "guilin": {
        name: "桂林",
        center: [110.1795, 25.2345],
        shelters: [
            { id: "gl_001", name: "桂林站地下避难所", type: "bunker", position: [110.1695, 25.2245], address: "桂林市象山区桂林站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "桂林站/公交", description: "桂林铁路枢纽民防" },
            { id: "gl_002", name: "两江四湖地下人防", type: "shelter", position: [110.1895, 25.2845], address: "桂林市秀峰区两江四湖景区地下", capacity: "3000人", level: "核6级", facilities: "景区地下防护", access: "景区游船/公交", description: "两江四湖景区配套民防" },
            { id: "gl_003", name: "阳朔地下避难所", type: "shelter", position: [110.4995, 24.7845], address: "桂林市阳朔县阳朔西街地下", capacity: "3500人", level: "核6级", facilities: "旅游县城深层防护", access: "景区大巴/公交", description: "阳朔景区配套民防" }
        ]
    },
    "beihai": {
        name: "北海",
        center: [109.1202, 21.4813],
        shelters: [
            { id: "bh_001", name: "北海站地下避难所", type: "bunker", position: [109.1102, 21.4713], address: "北海市海城区北海站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "北海站/公交", description: "北海铁路枢纽民防" },
            { id: "bh_002", name: "银滩地下避难所", type: "shelter", position: [109.1302, 21.4613], address: "北海市银海区银滩景区地下", capacity: "3500人", level: "核6级", facilities: "海滨景区地下防护", access: "景区大巴/公交", description: "银滩景区配套民防" },
            { id: "bh_003", name: "涠洲岛地下避难所", type: "shelter", position: [109.1102, 21.0313], address: "北海市海城区涠洲岛地下", capacity: "2500人", level: "核6级", facilities: "海岛景区地下防护", access: "轮渡/景区大巴", description: "涠洲岛景区配套民防" }
        ]
    },
    "qinzhou": {
        name: "钦州",
        center: [108.6545, 21.9798],
        shelters: [
            { id: "qz_001", name: "钦州站地下避难所", type: "bunker", position: [108.6445, 21.9698], address: "钦州市钦南区钦州站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "钦州站/公交", description: "钦州铁路枢纽民防" },
            { id: "qz_002", name: "三娘湾地下避难所", type: "shelter", position: [108.5945, 21.8798], address: "钦州市钦南区三娘湾景区地下", capacity: "2000人", level: "核6级", facilities: "海滨景区地下防护", access: "景区大巴/公交", description: "三娘湾景区配套民防" }
        ]
    },
    "guigang": {
        name: "贵港",
        center: [109.5989, 23.1115],
        shelters: [
            { id: "gg_001", name: "贵港站地下避难所", type: "bunker", position: [109.5889, 23.1015], address: "贵港市港北区贵港站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "贵港站/公交", description: "贵港铁路枢纽民防" },
            { id: "gg_002", name: "东湖地下人防", type: "shelter", position: [109.6089, 23.1215], address: "贵港市港北区东湖景区地下", capacity: "2500人", level: "核6级", facilities: "市中心湖景地下防护", access: "公交东湖站", description: "贵港市中心核心民防" }
        ]
    },
    "yulin": {
        name: "玉林",
        center: [110.1544, 22.6314],
        shelters: [
            { id: "yl_001", name: "玉林站地下避难所", type: "bunker", position: [110.1444, 22.6214], address: "玉林市玉州区玉林站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "玉林站/公交", description: "玉林铁路枢纽民防" },
            { id: "yl_002", name: "云天宫地下人防", type: "shelter", position: [110.1744, 22.6514], address: "玉林市玉州区云天宫地下", capacity: "3000人", level: "核6级", facilities: "市中心景区地下防护", access: "公交云天宫站", description: "云天宫景区配套民防" }
        ]
    },
    "baise": {
        name: "百色",
        center: [106.6182, 23.9025],
        shelters: [
            { id: "bs_001", name: "百色站地下避难所", type: "bunker", position: [106.6082, 23.8925], address: "百色市右江区百色站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "百色站/公交", description: "百色铁路枢纽民防" },
            { id: "bs_002", name: "起义纪念园地下人防", type: "shelter", position: [106.6282, 23.9125], address: "百色市右江区起义纪念园地下", capacity: "2500人", level: "核6级", facilities: "红色景区地下防护", access: "公交纪念园站", description: "百色起义纪念园配套民防" }
        ]
    },
    "hechi": {
        name: "河池",
        center: [108.0854, 24.6928],
        shelters: [
            { id: "hc_001", name: "河池站地下避难所", type: "bunker", position: [108.0754, 24.6828], address: "河池市金城江区河池站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "河池站/公交", description: "河池铁路枢纽民防" },
            { id: "hc_002", name: "巴马地下避难所", type: "shelter", position: [107.2554, 24.1428], address: "河池市巴马县长寿村地下", capacity: "2000人", level: "核6级", facilities: "长寿村地下防护", access: "景区大巴/公交", description: "巴马长寿村配套民防" }
        ]
    },
    
    // ===== 云南省 =====
    "qujing": {
        name: "曲靖",
        center: [103.7968, 25.4935],
        shelters: [
            { id: "qj_001", name: "曲靖站地下避难所", type: "bunker", position: [103.7868, 25.4835], address: "曲靖市麒麟区曲靖站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "曲靖站/公交", description: "曲靖铁路枢纽民防" },
            { id: "qj_002", name: "麒麟公园地下人防", type: "shelter", position: [103.8068, 25.5035], address: "曲靖市麒麟区麒麟公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交麒麟公园站", description: "曲靖市中心核心民防" },
            { id: "qj_003", name: "曲靖北站地下避难所", type: "metro", position: [103.8468, 25.4935], address: "曲靖市沾益区曲靖北站地下", capacity: "5000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁曲靖北站", description: "曲靖高铁枢纽民防" }
        ]
    },
    "yuxi": {
        name: "玉溪",
        center: [102.5471, 24.3518],
        shelters: [
            { id: "yx_001", name: "玉溪站地下避难所", type: "bunker", position: [102.5371, 24.3418], address: "玉溪市红塔区玉溪站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "玉溪站/公交", description: "玉溪铁路枢纽民防" },
            { id: "yx_002", name: "聂耳公园地下人防", type: "shelter", position: [102.5571, 24.3718], address: "玉溪市红塔区聂耳公园地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交聂耳公园站", description: "玉溪市中心核心民防" }
        ]
    },
    "lijiang": {
        name: "丽江",
        center: [100.2271, 26.8722],
        shelters: [
            { id: "lj_001", name: "丽江站地下避难所", type: "bunker", position: [100.2171, 26.8622], address: "丽江市玉龙县丽江站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "丽江站/公交", description: "丽江铁路枢纽民防" },
            { id: "lj_002", name: "丽江古城地下人防", type: "shelter", position: [100.2371, 26.8822], address: "丽江市古城区丽江古城地下", capacity: "3500人", level: "核6级", facilities: "世界遗产古城地下防护", access: "古城内部/公交", description: "丽江古城核心民防" },
            { id: "lj_003", name: "玉龙雪山地下避难所", type: "shelter", position: [100.1771, 27.0822], address: "丽江市玉龙县玉龙雪山景区地下", capacity: "2500人", level: "核6级", facilities: "雪山景区地下防护", access: "景区大巴/索道", description: "玉龙雪山景区配套民防" }
        ]
    },
    "dali": {
        name: "大理",
        center: [100.2300, 25.5916],
        shelters: [
            { id: "dl_001", name: "大理站地下避难所", type: "bunker", position: [100.2200, 25.5816], address: "大理市下关区大理站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "大理站/公交", description: "大理铁路枢纽民防" },
            { id: "dl_002", name: "大理古城地下人防", type: "shelter", position: [100.1700, 25.7016], address: "大理市大理古城地下", capacity: "3500人", level: "核6级", facilities: "古城地下防护", access: "古城内部/公交", description: "大理古城核心民防" },
            { id: "dl_003", name: "洱海地下避难所", type: "shelter", position: [100.2000, 25.8016], address: "大理市喜洲镇洱海景区地下", capacity: "2500人", level: "核6级", facilities: "湖区景区地下防护", access: "景区大巴/游船", description: "洱海景区配套民防" }
        ]
    },
    
    // ===== 贵州省 =====
    "zunyi": {
        name: "遵义",
        center: [106.9272, 27.7255],
        shelters: [
            { id: "zy_001", name: "遵义站地下避难所", type: "bunker", position: [106.9172, 27.7155], address: "遵义市红花岗区遵义站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "遵义站/公交", description: "遵义铁路枢纽民防" },
            { id: "zy_002", name: "遵义会议会址地下人防", type: "shelter", position: [106.9372, 27.7455], address: "遵义市红花岗区会议会址地下", capacity: "3000人", level: "核6级", facilities: "红色景区地下防护", access: "公交会址站", description: "遵义会议会址配套民防" },
            { id: "zy_003", name: "茅台镇地下避难所", type: "shelter", position: [106.3372, 27.8255], address: "遵义市仁怀市茅台镇地下", capacity: "3500人", level: "核6级", facilities: "名镇深层防护", access: "景区大巴/公交", description: "茅台镇景区配套民防" }
        ]
    },
    "liupanshui": {
        name: "六盘水",
        center: [104.8305, 26.5934],
        shelters: [
            { id: "lps_001", name: "六盘水站地下避难所", type: "bunker", position: [104.8205, 26.5834], address: "六盘水市钟山区六盘水站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "六盘水站/公交", description: "六盘水铁路枢纽民防" },
            { id: "lps_002", name: "明湖地下人防", type: "shelter", position: [104.8405, 26.6034], address: "六盘水市钟山区明湖公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交明湖站", description: "六盘水市中心核心民防" }
        ]
    },
    "anshun": {
        name: "安顺",
        center: [105.9322, 26.2455],
        shelters: [
            { id: "as_001", name: "安顺站地下避难所", type: "bunker", position: [105.9222, 26.2355], address: "安顺市西秀区安顺站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "安顺站/公交", description: "安顺铁路枢纽民防" },
            { id: "as_002", name: "黄果树地下避难所", type: "shelter", position: [105.6722, 25.9955], address: "安顺市镇宁县黄果树景区地下", capacity: "4000人", level: "核6级", facilities: "5A景区深层防护", access: "景区大巴/公交", description: "黄果树瀑布景区配套民防" }
        ]
    },
    
    // ===== 甘肃省 =====
    "tianshui": {
        name: "天水",
        center: [105.7249, 34.5809],
        shelters: [
            { id: "ts_001", name: "天水站地下避难所", type: "bunker", position: [105.7149, 34.5709], address: "天水市麦积区天水站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "天水站/公交", description: "天水铁路枢纽民防" },
            { id: "ts_002", name: "麦积山地下避难所", type: "shelter", position: [106.0349, 34.3509], address: "天水市麦积区麦积山景区地下", capacity: "3000人", level: "核6级", facilities: "石窟景区地下防护", access: "景区大巴/公交", description: "麦积山景区配套民防" },
            { id: "ts_003", name: "伏羲庙地下人防", type: "shelter", position: [105.7249, 34.6009], address: "天水市秦州区伏羲庙地下", capacity: "2500人", level: "核6级", facilities: "古迹景区地下防护", access: "公交伏羲庙站", description: "伏羲庙景区配套民防" }
        ]
    },
    "jiuquan": {
        name: "酒泉",
        center: [98.5108, 39.7442],
        shelters: [
            { id: "jq_001", name: "酒泉站地下避难所", type: "bunker", position: [98.5008, 39.7342], address: "酒泉市肃州区酒泉站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "酒泉站/公交", description: "酒泉铁路枢纽民防" },
            { id: "jq_002", name: "东风航天城地下避难所", type: "bunker", position: [100.3108, 41.2042], address: "酒泉市金塔县航天城地下", capacity: "5000人", level: "核5级", facilities: "航天基地深层防护", access: "专用通道", description: "东风航天城核心民防" },
            { id: "jq_003", name: "敦煌地下避难所", type: "shelter", position: [94.6608, 40.1342], address: "酒泉市敦煌市莫高窟景区地下", capacity: "3500人", level: "核6级", facilities: "世界遗产地下防护", access: "景区大巴/公交", description: "敦煌莫高窟配套民防" }
        ]
    },
    "zhangye": {
        name: "张掖",
        center: [100.4499, 38.9248],
        shelters: [
            { id: "zy_001", name: "张掖站地下避难所", type: "bunker", position: [100.4399, 38.9148], address: "张掖市甘州区张掖站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "张掖站/公交", description: "张掖铁路枢纽民防" },
            { id: "zy_002", name: "七彩丹霞地下避难所", type: "shelter", position: [100.0699, 38.8448], address: "张掖市临泽县丹霞景区地下", capacity: "3000人", level: "核6级", facilities: "地质公园地下防护", access: "景区大巴/公交", description: "七彩丹霞景区配套民防" }
        ]
    },
    
    // ===== 青海省 =====
    "xining": {
        name: "西宁",
        center: [101.7782, 36.6171],
        shelters: [
            { id: "xn_001", name: "西宁站地下避难所", type: "bunker", position: [101.7682, 36.6071], address: "西宁市城东区西宁站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "西宁站/公交", description: "西宁铁路枢纽民防" },
            { id: "xn_002", name: "中心广场地下人防", type: "shelter", position: [101.7882, 36.6271], address: "西宁市城中区中心广场地下", capacity: "3000人", level: "核6级", facilities: "市中心广场地下防护", access: "公交中心广场站", description: "西宁市中心核心民防" },
            { id: "xn_003", name: "塔尔寺地下避难所", type: "shelter", position: [101.5682, 36.4871], address: "西宁市湟中区塔尔寺景区地下", capacity: "3000人", level: "核6级", facilities: "藏传佛教圣地地下防护", access: "景区大巴/公交", description: "塔尔寺景区配套民防" }
        ]
    },
    
    // ===== 宁夏回族自治区 =====
    "yinchuan": {
        name: "银川",
        center: [106.2782, 38.4664],
        shelters: [
            { id: "yc_001", name: "银川站地下避难所", type: "bunker", position: [106.2682, 38.4564], address: "银川市金凤区银川站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "银川站/公交", description: "银川铁路枢纽民防" },
            { id: "yc_002", name: "西夏王陵地下避难所", type: "shelter", position: [106.0182, 38.4964], address: "银川市西夏区西夏王陵地下", capacity: "3500人", level: "核6级", facilities: "王陵景区地下防护", access: "景区大巴/公交", description: "西夏王陵景区配套民防" },
            { id: "yc_003", name: "镇北堡地下避难所", type: "shelter", position: [106.0482, 38.5864], address: "银川市西夏区镇北堡地下", capacity: "3000人", level: "核6级", facilities: "影视城地下防护", access: "景区大巴/公交", description: "镇北堡影视城配套民防" }
        ]
    },
    
    // ===== 西藏自治区 =====
    "lhasa": {
        name: "拉萨",
        center: [91.1409, 29.6456],
        shelters: [
            { id: "ls_001", name: "拉萨站地下避难所", type: "bunker", position: [91.1309, 29.6356], address: "拉萨市堆龙德庆区拉萨站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护、供氧系统", access: "拉萨站/公交", description: "青藏铁路核心民防" },
            { id: "ls_002", name: "布达拉宫地下避难所", type: "shelter", position: [91.1209, 29.6556], address: "拉萨市城关区布达拉宫地下", capacity: "3500人", level: "核6级", facilities: "世界文化遗产地下防护", access: "布达拉宫内部/公交", description: "布达拉宫核心民防" },
            { id: "ls_003", name: "大昭寺地下人防", type: "shelter", position: [91.1509, 29.6456], address: "拉萨市城关区大昭寺地下", capacity: "2500人", level: "核6级", facilities: "佛教圣地地下防护", access: "大昭寺周边/公交", description: "大昭寺配套民防" }
        ]
    },
    
    // ===== 海南省 =====
    "sanya": {
        name: "三亚",
        center: [109.5121, 18.2528],
        shelters: [
            { id: "sy_001", name: "三亚站地下避难所", type: "bunker", position: [109.5021, 18.2428], address: "三亚市吉阳区三亚站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "三亚站/公交", description: "三亚铁路枢纽民防" },
            { id: "sy_002", name: "亚龙湾地下避难所", type: "shelter", position: [109.6521, 18.2228], address: "三亚市吉阳区亚龙湾景区地下", capacity: "3500人", level: "核6级", facilities: "海滨度假区地下防护", access: "景区大巴/公交", description: "亚龙湾景区配套民防" },
            { id: "sy_003", name: "南山地下避难所", type: "shelter", position: [109.2021, 18.3028], address: "三亚市崖州区南山景区地下", capacity: "3000人", level: "核6级", facilities: "佛教景区地下防护", access: "景区大巴/公交", description: "南山寺景区配套民防" }
        ]
    },
    
    // ===== 黑龙江省 =====
    "qiqihaer": {
        name: "齐齐哈尔",
        center: [123.9182, 47.3543],
        shelters: [
            { id: "qqhe_001", name: "齐齐哈尔站地下避难所", type: "bunker", position: [123.9082, 47.3443], address: "齐齐哈尔市铁锋区齐齐哈尔站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "齐齐哈尔站/公交", description: "齐齐哈尔铁路枢纽民防" },
            { id: "qqhe_002", name: "扎龙地下避难所", type: "shelter", position: [124.1282, 47.2043], address: "齐齐哈尔市铁锋区扎龙湿地地下", capacity: "2500人", level: "核6级", facilities: "湿地景区地下防护", access: "景区大巴/公交", description: "扎龙湿地景区配套民防" }
        ]
    },
    "mudanjiang": {
        name: "牡丹江",
        center: [129.6186, 44.5827],
        shelters: [
            { id: "mdj_001", name: "牡丹江站地下避难所", type: "bunker", position: [129.6086, 44.5727], address: "牡丹江市西安区牡丹江站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "牡丹江站/公交", description: "牡丹江铁路枢纽民防" },
            { id: "mdj_002", name: "镜泊湖地下避难所", type: "shelter", position: [128.9786, 44.0827], address: "牡丹江市宁安市镜泊湖景区地下", capacity: "3000人", level: "核6级", facilities: "火山湖景区地下防护", access: "景区大巴/游船", description: "镜泊湖景区配套民防" }
        ]
    },
    
    // ===== 吉林省 =====
    "jilin": {
        name: "吉林",
        center: [126.5494, 43.8378],
        shelters: [
            { id: "jl_001", name: "吉林站地下避难所", type: "bunker", position: [126.5394, 43.8278], address: "吉林市昌邑区吉林站地下", capacity: "4000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "吉林站/公交", description: "吉林铁路枢纽民防" },
            { id: "jl_002", name: "松花湖地下避难所", type: "shelter", position: [126.7394, 43.6878], address: "吉林市丰满区松花湖景区地下", capacity: "3000人", level: "核6级", facilities: "水库景区地下防护", access: "景区大巴/游船", description: "松花湖景区配套民防" }
        ]
    },
    "yanbian": {
        name: "延边",
        center: [129.5098, 42.9083],
        shelters: [
            { id: "yb_001", name: "延吉站地下避难所", type: "bunker", position: [129.4998, 42.8983], address: "延边州延吉市延吉站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "延吉站/公交", description: "延边铁路枢纽民防" },
            { id: "yb_002", name: "长白山地下避难所", type: "shelter", position: [128.2098, 42.0583], address: "延边州安图县长白山景区地下", capacity: "3500人", level: "核6级", facilities: "天池景区地下防护", access: "景区大巴/索道", description: "长白山景区配套民防" }
        ]
    },
    
    // ===== 新疆维吾尔自治区 =====
    "korla": {
        name: "库尔勒",
        center: [86.1746, 41.7259],
        shelters: [
            { id: "kel_001", name: "库尔勒站地下避难所", type: "bunker", position: [86.1646, 41.7159], address: "巴音郭楞州库尔勒市库尔勒站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "库尔勒站/公交", description: "库尔勒铁路枢纽民防" },
            { id: "kel_002", name: "孔雀河地下人防", type: "shelter", position: [86.1846, 41.7359], address: "巴音郭楞州库尔勒市孔雀河景区地下", capacity: "2500人", level: "核6级", facilities: "河景公园地下防护", access: "公交孔雀河站", description: "库尔勒市中心核心民防" }
        ]
    },
    "yili": {
        name: "伊犁",
        center: [81.3177, 43.9219],
        shelters: [
            { id: "yl_001", name: "伊宁站地下避难所", type: "bunker", position: [81.3077, 43.9119], address: "伊犁州伊宁市伊宁站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "伊宁站/公交", description: "伊犁铁路枢纽民防" },
            { id: "yl_002", name: "那拉提地下避难所", type: "shelter", position: [84.0277, 43.3219], address: "伊犁州新源县那拉提景区地下", capacity: "2500人", level: "核6级", facilities: "草原景区地下防护", access: "景区大巴/公交", description: "那拉提草原配套民防" }
        ]
    },
    "kashgar": {
        name: "喀什",
        center: [75.9911, 39.4704],
        shelters: [
            { id: "ks_001", name: "喀什站地下避难所", type: "bunker", position: [75.9811, 39.4604], address: "喀什地区喀什市喀什站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "喀什站/公交", description: "喀什铁路枢纽民防" },
            { id: "ks_002", name: "艾提尕尔地下人防", type: "shelter", position: [76.0011, 39.4904], address: "喀什地区喀什市艾提尕尔清真寺地下", capacity: "3000人", level: "核6级", facilities: "清真寺地下防护", access: "公交艾提尕尔站", description: "艾提尕尔清真寺配套民防" },
            { id: "ks_003", name: "喀什古城地下避难所", type: "shelter", position: [76.0211, 39.4704], address: "喀什地区喀什市喀什古城地下", capacity: "3500人", level: "核6级", facilities: "古城地下防护", access: "古城内部/公交", description: "喀什古城核心民防" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHELTER_DATA_BATCH3;
}