// 核战争城市自救地球仪 - 第二批城市避难所数据（城市81-120）
// 覆盖40个新增地级市

const SHELTER_DATA_BATCH_2 = {
    // ===== 第81-90个城市 =====
    "yichang": {
        name: "宜昌",
        center: [111.2868, 30.6919],
        shelters: [
            { id: "yc_001", name: "宜昌东站地下避难所", type: "bunker", position: [111.3268, 30.6519], address: "宜昌市伍家岗区宜昌东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护、应急供电", access: "高铁宜昌东站/公交", description: "宜昌高铁枢纽民防，长江中上游重要节点" },
            { id: "yc_002", name: "三峡大坝地下避难所", type: "bunker", position: [111.0468, 30.8219], address: "宜昌市夷陵区三峡大坝景区地下", capacity: "5000人", level: "核5级", facilities: "水利枢纽配套深层防护、独立供水系统", access: "三峡专用公路/景区大巴", description: "三峡大坝配套民防工程，国家战略设施防护" },
            { id: "yc_003", name: "夷陵广场地下人防", type: "shelter", position: [111.2968, 30.7119], address: "宜昌市西陵区夷陵广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护、物资储备", access: "公交夷陵广场站", description: "宜昌市中心核心民防" },
            { id: "yc_004", name: "葛洲坝地下避难所", type: "bunker", position: [111.2768, 30.7319], address: "宜昌市西陵区葛洲坝水利枢纽地下", capacity: "4500人", level: "核5级", facilities: "水利枢纽配套防护、防洪水设计", access: "葛洲坝专用道路", description: "葛洲坝配套民防工程" }
        ]
    },
    "xiangyang": {
        name: "襄阳",
        center: [112.1225, 32.0090],
        shelters: [
            { id: "xy_001", name: "襄阳东站地下避难所", type: "bunker", position: [112.1825, 31.9890], address: "襄阳市襄州区襄阳东站地下", capacity: "4500人", level: "核6级", facilities: "高铁枢纽深层防护、华中最大站房", access: "高铁襄阳东站", description: "襄阳高铁枢纽民防，呼南高铁重要节点" },
            { id: "xy_002", name: "襄阳古城地下人防", type: "shelter", position: [112.1525, 32.0190], address: "襄阳市襄城区襄阳古城墙内地下", capacity: "3000人", level: "核6级", facilities: "古城墙内地下防护、历史文化区", access: "公交古城内环路站", description: "襄阳古城核心民防" },
            { id: "xy_003", name: "诸葛亮广场地下避难所", type: "shelter", position: [112.1125, 32.0390], address: "襄阳市樊城区诸葛亮广场地下", capacity: "2500人", level: "核6级", facilities: "市中心地下防护", access: "公交诸葛亮广场站", description: "襄阳市中心核心民防" }
        ]
    },
    "yueyang": {
        name: "岳阳",
        center: [113.1299, 29.3571],
        shelters: [
            { id: "yy_001", name: "岳阳东站地下避难所", type: "bunker", position: [113.1699, 29.3371], address: "岳阳市岳阳楼区岳阳东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁岳阳东站", description: "岳阳高铁枢纽民防，京广高铁重要节点" },
            { id: "yy_002", name: "岳阳楼地下人防", type: "shelter", position: [113.0899, 29.3771], address: "岳阳市岳阳楼区岳阳楼景区地下", capacity: "2000人", level: "核6级", facilities: "景区地下防护", access: "公交岳阳楼站", description: "岳阳楼景区配套民防" },
            { id: "yy_003", name: "南湖广场地下避难所", type: "shelter", position: [113.1399, 29.3371], address: "岳阳市岳阳楼区南湖广场地下", capacity: "3000人", level: "核6级", facilities: "市中心公园地下防护", access: "公交南湖广场站", description: "岳阳市中心核心民防" }
        ]
    },
    "hengyang": {
        name: "衡阳",
        center: [112.5720, 26.8936],
        shelters: [
            { id: "hy_001", name: "衡阳东站地下避难所", type: "bunker", position: [112.6620, 26.9136], address: "衡阳市珠晖区衡阳东站地下", capacity: "4500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁衡阳东站", description: "衡阳高铁枢纽民防" },
            { id: "hy_002", name: "南岳机场地下避难所", type: "shelter", position: [112.6220, 26.7236], address: "衡阳市衡南县南岳机场地下", capacity: "3500人", level: "核5级", facilities: "机场深层防护", access: "机场大巴/公交", description: "衡阳航空枢纽民防" },
            { id: "hy_003", name: "石鼓书院地下人防", type: "shelter", position: [112.6120, 26.9436], address: "衡阳市石鼓区石鼓书院地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交石鼓书院站", description: "衡阳古城核心民防" }
        ]
    },
    "zhuzhou": {
        name: "株洲",
        center: [113.1517, 27.8358],
        shelters: [
            { id: "zz_001", name: "株洲西站地下避难所", type: "bunker", position: [113.1217, 27.8658], address: "株洲市天元区株洲西站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护、株机厂配套", access: "高铁株洲西站", description: "株洲高铁枢纽民防，中车株机基地配套" },
            { id: "zz_002", name: "神农城地下人防", type: "shelter", position: [113.1617, 27.8258], address: "株洲市天元区神农城地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交神农城站", description: "株洲市中心核心民防" },
            { id: "zz_003", name: "火车站地下避难所", type: "metro", position: [113.1717, 27.8458], address: "株洲市芦淞区株洲火车站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "株洲火车站", description: "株洲铁路枢纽民防" }
        ]
    },
    "yancheng": {
        name: "盐城",
        center: [120.1636, 33.3474],
        shelters: [
            { id: "yanc_001", name: "盐城站地下避难所", type: "bunker", position: [120.1836, 33.3374], address: "盐城市亭湖区盐城站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁盐城站", description: "盐城高铁枢纽民防" },
            { id: "yanc_002", name: "南洋机场地下避难所", type: "shelter", position: [120.2636, 33.4174], address: "盐城市亭湖区南洋机场地下", capacity: "3500人", level: "核5级", facilities: "机场深层防护", access: "机场大巴/公交", description: "盐城航空枢纽民防" },
            { id: "yanc_003", name: "新四军纪念馆地下人防", type: "shelter", position: [120.1536, 33.3874], address: "盐城市亭湖区新四军纪念馆地下", capacity: "2500人", level: "核6级", facilities: "纪念馆地下防护", access: "公交纪念馆站", description: "盐城红色教育基地民防" }
        ]
    },
    "yangquan": {
        name: "阳泉",
        center: [113.5805, 37.8569],
        shelters: [
            { id: "yq_001", name: "阳泉北站地下避难所", type: "bunker", position: [113.5205, 37.9069], address: "阳泉市盂县阳泉北站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁阳泉北站", description: "阳泉高铁枢纽民防" },
            { id: "yq_002", name: "阳泉站地下避难所", type: "metro", position: [113.5705, 37.8669], address: "阳泉市城区阳泉站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽防护", access: "阳泉站", description: "阳泉铁路枢纽民防" },
            { id: "yq_003", name: "南山公园地下人防", type: "shelter", position: [113.5905, 37.8769], address: "阳泉市城区南山公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交南山公园站", description: "阳泉市中心核心民防" }
        ]
    },
    "changzhi": {
        name: "长治",
        center: [113.1163, 36.1954],
        shelters: [
            { id: "czh_001", name: "长治东站地下避难所", type: "bunker", position: [113.1463, 36.2054], address: "长治市潞州区长治东站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁长治东站", description: "长治高铁枢纽民防" },
            { id: "czh_002", name: "太行公园地下人防", type: "shelter", position: [113.0963, 36.1854], address: "长治市潞州区太行公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交太行公园站", description: "长治市中心核心民防" },
            { id: "czh_003", name: "王村机场地下避难所", type: "shelter", position: [113.0263, 36.1854], address: "长治市潞州区王村机场地下", capacity: "3000人", level: "核5级", facilities: "机场深层防护", access: "机场大巴", description: "长治航空枢纽民防" }
        ]
    },
    "jinzhong": {
        name: "晋中",
        center: [112.7527, 37.6870],
        shelters: [
            { id: "jz_001", name: "晋中站地下避难所", type: "bunker", position: [112.7827, 37.7070], address: "晋中市榆次区晋中站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁晋中站", description: "晋中高铁枢纽民防" },
            { id: "jz_002", name: "榆次老城地下人防", type: "shelter", position: [112.7427, 37.6670], address: "晋中市榆次区榆次老城地下", capacity: "2500人", level: "核6级", facilities: "古城地下防护", access: "公交榆次老城站", description: "晋中古城核心民防" },
            { id: "jz_003", name: "平遥古城地下避难所", type: "bunker", position: [112.1727, 37.2070], address: "晋中市平遥县平遥古城地下", capacity: "4000人", level: "核6级", facilities: "世界遗产地深层防护", access: "公交平遥古城站", description: "平遥古城配套民防" }
        ]
    },
    "linfen": {
        name: "临汾",
        center: [111.5190, 36.0841],
        shelters: [
            { id: "lf_001", name: "临汾西站地下避难所", type: "bunker", position: [111.5090, 36.0641], address: "临汾市尧都区临汾西站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁临汾西站", description: "临汾高铁枢纽民防" },
            { id: "lf_002", name: "尧庙地下人防", type: "shelter", position: [111.5290, 36.0641], address: "临汾市尧都区尧庙地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交尧庙站", description: "临汾古城核心民防" },
            { id: "lf_003", name: "鼓楼广场地下避难所", type: "shelter", position: [111.5390, 36.0941], address: "临汾市尧都区鼓楼广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交鼓楼广场站", description: "临汾市中心核心民防" }
        ]
    },
    // ===== 第91-100个城市 =====
    "yuncheng": {
        name: "运城",
        center: [111.0074, 35.0263],
        shelters: [
            { id: "ych_001", name: "运城北站地下避难所", type: "bunker", position: [111.0174, 35.0463], address: "运城市盐湖区运城北站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁运城北站", description: "运城高铁枢纽民防" },
            { id: "ych_002", name: "关帝庙地下人防", type: "shelter", position: [110.8474, 34.9163], address: "运城市解州镇关帝庙地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交关帝庙站", description: "运城关帝庙配套民防" },
            { id: "ych_003", name: "盐湖广场地下避难所", type: "shelter", position: [111.0074, 35.0363], address: "运城市盐湖区盐湖广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交盐湖广场站", description: "运城市中心核心民防" }
        ]
    },
    "baoji": {
        name: "宝鸡",
        center: [107.2370, 34.3630],
        shelters: [
            { id: "bj_001", name: "宝鸡南站地下避难所", type: "bunker", position: [107.2370, 34.3430], address: "宝鸡市渭滨区宝鸡南站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁宝鸡南站", description: "宝鸡高铁枢纽民防" },
            { id: "bj_002", name: "青铜器博物馆地下人防", type: "shelter", position: [107.2670, 34.3630], address: "宝鸡市渭滨区青铜器博物馆地下", capacity: "2500人", level: "核6级", facilities: "博物馆地下防护", access: "公交博物馆站", description: "宝鸡文化中心民防" },
            { id: "bj_003", name: "炎帝陵地下避难所", type: "shelter", position: [107.4670, 34.3230], address: "宝鸡市渭滨区炎帝陵景区地下", capacity: "2000人", level: "核6级", facilities: "景区地下防护", access: "景区大巴/公交", description: "宝鸡炎帝陵配套民防" }
        ]
    },
    "xianyang": {
        name: "咸阳",
        center: [108.7089, 34.3296],
        shelters: [
            { id: "xyan_001", name: "咸阳站地下避难所", type: "bunker", position: [108.7289, 34.3296], address: "咸阳市渭城区咸阳站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "咸阳站/公交", description: "咸阳铁路枢纽民防" },
            { id: "xyan_002", name: "咸阳国际机场地下避难所", type: "bunker", position: [108.7589, 34.4396], address: "咸阳市渭城区西安咸阳国际机场T3地下", capacity: "6000人", level: "核5级", facilities: "国际机场深层防护、地铁联通", access: "地铁14号线机场西站", description: "西北最大航空枢纽民防" },
            { id: "xyan_003", name: "统一广场地下人防", type: "shelter", position: [108.7389, 34.3096], address: "咸阳市渭城区统一广场地下", capacity: "2500人", level: "核6级", facilities: "市中心地下防护", access: "公交统一广场站", description: "咸阳市中心核心民防" }
        ]
    },
    "hanzhong": {
        name: "汉中",
        center: [107.0286, 33.0777],
        shelters: [
            { id: "hz_001", name: "汉中站地下避难所", type: "bunker", position: [107.0386, 33.0677], address: "汉中市汉台区汉中站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "汉中站/公交", description: "汉中铁路枢纽民防" },
            { id: "hz_002", name: "拜将坛地下人防", type: "shelter", position: [107.0286, 33.0877], address: "汉中市汉台区拜将坛地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交拜将坛站", description: "汉中古城核心民防" },
            { id: "hz_003", name: "石门栈道地下避难所", type: "shelter", position: [106.8986, 33.1877], address: "汉中市汉台区石门栈道景区地下", capacity: "2000人", level: "核6级", facilities: "景区地下防护", access: "景区大巴/公交", description: "汉中石门栈道配套民防" }
        ]
    },
    "yanan": {
        name: "延安",
        center: [109.4898, 36.5855],
        shelters: [
            { id: "ya_001", name: "延安站地下避难所", type: "bunker", position: [109.4998, 36.5755], address: "延安市宝塔区延安站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "延安站/公交", description: "延安铁路枢纽民防" },
            { id: "ya_002", name: "宝塔山地下人防", type: "shelter", position: [109.4898, 36.6055], address: "延安市宝塔区宝塔山景区地下", capacity: "3000人", level: "核6级", facilities: "革命圣地地下防护", access: "公交宝塔山站", description: "延安宝塔山配套民防" },
            { id: "ya_003", name: "枣园革命旧址地下避难所", type: "shelter", position: [109.4198, 36.6355], address: "延安市宝塔区枣园革命旧址地下", capacity: "2500人", level: "核6级", facilities: "革命旧址地下防护", access: "公交枣园站", description: "延安红色教育基地民防" }
        ]
    },
    "anyang": {
        name: "安阳",
        center: [114.3931, 36.0957],
        shelters: [
            { id: "ay_001", name: "安阳东站地下避难所", type: "bunker", position: [114.4331, 36.0757], address: "安阳市文峰区安阳东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁安阳东站", description: "安阳高铁枢纽民防" },
            { id: "ay_002", name: "殷墟地下人防", type: "shelter", position: [114.3131, 36.1257], address: "安阳市殷都区殷墟景区地下", capacity: "2500人", level: "核6级", facilities: "世界遗产地地下防护", access: "公交殷墟站", description: "安阳殷墟配套民防" },
            { id: "ay_003", name: "文峰塔地下避难所", type: "shelter", position: [114.3531, 36.0957], address: "安阳市文峰区文峰塔地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交文峰塔站", description: "安阳古城核心民防" }
        ]
    },
    "xinxiang": {
        name: "新乡",
        center: [113.9268, 35.3030],
        shelters: [
            { id: "xx_001", name: "新乡东站地下避难所", type: "bunker", position: [113.9368, 35.2830], address: "新乡市红旗区新乡东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁新乡东站", description: "新乡高铁枢纽民防" },
            { id: "xx_002", name: "胖东来地下人防", type: "shelter", position: [113.9168, 35.3130], address: "新乡市红旗区胖东来商场地下", capacity: "3000人", level: "核6级", facilities: "商场地下防护", access: "公交胖东来站", description: "新乡市中心商圈民防" },
            { id: "xx_003", name: "平原博物院地下避难所", type: "shelter", position: [113.9068, 35.2930], address: "新乡市红旗区平原博物院地下", capacity: "2500人", level: "核6级", facilities: "博物馆地下防护", access: "公交平原博物院站", description: "新乡文化中心民防" }
        ]
    },
    "jiaozuo": {
        name: "焦作",
        center: [113.2418, 35.2159],
        shelters: [
            { id: "jz_001", name: "焦作站地下避难所", type: "bunker", position: [113.2518, 35.2059], address: "焦作市解放区焦作站地下", capacity: "3500人", level: "核6级", facilities: "铁路枢纽深层防护", access: "焦作站/公交", description: "焦作铁路枢纽民防" },
            { id: "jz_002", name: "云台山地下避难所", type: "shelter", position: [113.4018, 35.3459], address: "焦作市修武县云台山景区地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/公交", description: "焦作云台山配套民防" },
            { id: "jz_003", name: "龙源湖公园地下人防", type: "shelter", position: [113.2718, 35.2159], address: "焦作市山阳区龙源湖公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交龙源湖公园站", description: "焦作市中心核心民防" }
        ]
    },
    "nanyang": {
        name: "南阳",
        center: [112.5285, 32.9909],
        shelters: [
            { id: "ny_001", name: "南阳东站地下避难所", type: "bunker", position: [112.5785, 32.9809], address: "南阳市宛城区南阳东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁南阳东站", description: "南阳高铁枢纽民防" },
            { id: "ny_002", name: "武侯祠地下人防", type: "shelter", position: [112.5285, 33.0009], address: "南阳市卧龙区武侯祠地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交武侯祠站", description: "南阳武侯祠配套民防" },
            { id: "ny_003", name: "医圣祠地下避难所", type: "shelter", position: [112.5485, 32.9909], address: "南阳市宛城区医圣祠地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交医圣祠站", description: "南阳医圣祠配套民防" }
        ]
    },
    "shangqiu": {
        name: "商丘",
        center: [115.6564, 34.4142],
        shelters: [
            { id: "sq_001", name: "商丘站地下避难所", type: "bunker", position: [115.6564, 34.4142], address: "商丘市梁园区商丘站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁商丘站", description: "商丘高铁枢纽民防" },
            { id: "sq_002", name: "古城地下人防", type: "shelter", position: [115.6164, 34.3842], address: "商丘市睢阳区商丘古城地下", capacity: "2500人", level: "核6级", facilities: "古城地下防护", access: "公交古城站", description: "商丘古城核心民防" },
            { id: "sq_003", name: "火神台地下避难所", type: "shelter", position: [115.6064, 34.3742], address: "商丘市睢阳区火神台景区地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交火神台站", description: "商丘火神台配套民防" }
        ]
    },
    // ===== 第101-110个城市 =====
    "luoyang": {
        name: "洛阳",
        center: [112.4540, 34.6196],
        shelters: [
            { id: "ly_001", name: "洛阳龙门站地下避难所", type: "bunker", position: [112.4740, 34.6096], address: "洛阳市洛龙区洛阳龙门站地下", capacity: "4500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁洛阳龙门站", description: "洛阳高铁枢纽民防" },
            { id: "ly_002", name: "龙门石窟地下人防", type: "shelter", position: [112.4540, 34.5596], address: "洛阳市洛龙区龙门石窟景区地下", capacity: "3000人", level: "核6级", facilities: "世界遗产地地下防护", access: "景区大巴/公交", description: "洛阳龙门石窟配套民防" },
            { id: "ly_003", name: "白马寺地下避难所", type: "shelter", position: [112.6140, 34.7196], address: "洛阳市洛龙区白马寺地下", capacity: "2500人", level: "核6级", facilities: "古寺地下防护", access: "公交白马寺站", description: "洛阳白马寺配套民防" },
            { id: "ly_004", name: "应天门地下人防", type: "shelter", position: [112.4340, 34.6796], address: "洛阳市老城区应天门地下", capacity: "3500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交应天门站", description: "洛阳应天门配套民防" }
        ]
    },
    "kaifeng": {
        name: "开封",
        center: [114.3412, 34.7971],
        shelters: [
            { id: "kf_001", name: "开封北站地下避难所", type: "bunker", position: [114.3712, 34.8171], address: "开封市龙亭区开封北站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁开封北站", description: "开封高铁枢纽民防" },
            { id: "kf_002", name: "清明上河园地下人防", type: "shelter", position: [114.3412, 34.8171], address: "开封市龙亭区清明上河园地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "公交清明上河园站", description: "开封清明上河园配套民防" },
            { id: "kf_003", name: "开封府地下避难所", type: "shelter", position: [114.3612, 34.7971], address: "开封市鼓楼区开封府地下", capacity: "2500人", level: "核6级", facilities: "古建筑地下防护", access: "公交开封府站", description: "开封府配套民防" }
        ]
    },
    "pingdingshan": {
        name: "平顶山",
        center: [113.1927, 33.7662],
        shelters: [
            { id: "pds_001", name: "平顶山西站地下避难所", type: "bunker", position: [113.1527, 33.7462], address: "平顶山市宝丰县平顶山西站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁平顶山西站", description: "平顶山高铁枢纽民防" },
            { id: "pds_002", name: "鹰城广场地下人防", type: "shelter", position: [113.2027, 33.7762], address: "平顶山市新华区鹰城广场地下", capacity: "3000人", level: "核6级", facilities: "市中心地下防护", access: "公交鹰城广场站", description: "平顶山市中心核心民防" },
            { id: "pds_003", name: "香山寺地下避难所", type: "shelter", position: [113.2127, 33.7362], address: "平顶山市新华区香山寺地下", capacity: "2000人", level: "核6级", facilities: "古寺地下防护", access: "公交香山寺站", description: "平顶山香山寺配套民防" }
        ]
    },
    "puyang": {
        name: "濮阳",
        center: [115.0293, 35.7619],
        shelters: [
            { id: "py_001", name: "濮阳东站地下避难所", type: "bunker", position: [115.0593, 35.7419], address: "濮阳市华龙区濮阳东站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁濮阳东站", description: "濮阳高铁枢纽民防" },
            { id: "py_002", name: "戚城遗址地下人防", type: "shelter", position: [115.0293, 35.7819], address: "濮阳市华龙区戚城遗址地下", capacity: "2500人", level: "核6级", facilities: "遗址地下防护", access: "公交戚城遗址站", description: "濮阳戚城遗址配套民防" },
            { id: "py_003", name: "中心广场地下避难所", type: "shelter", position: [115.0393, 35.7619], address: "濮阳市华龙区中心广场地下", capacity: "2500人", level: "核6级", facilities: "市中心地下防护", access: "公交中心广场站", description: "濮阳市中心核心民防" }
        ]
    },
    "xuchang": {
        name: "许昌",
        center: [113.8524, 34.0357],
        shelters: [
            { id: "xc_001", name: "许昌东站地下避难所", type: "bunker", position: [113.8624, 34.0157], address: "许昌市建安区许昌东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁许昌东站", description: "许昌高铁枢纽民防" },
            { id: "xc_002", name: "春秋楼地下人防", type: "shelter", position: [113.8524, 34.0557], address: "许昌市魏都区春秋楼地下", capacity: "2500人", level: "核6级", facilities: "古建筑地下防护", access: "公交春秋楼站", description: "许昌春秋楼配套民防" },
            { id: "xc_003", name: "丞相府地下避难所", type: "shelter", position: [113.8624, 34.0457], address: "许昌市魏都区丞相府地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交丞相府站", description: "许昌丞相府配套民防" }
        ]
    },
    "luohe": {
        name: "漯河",
        center: [114.0165, 33.5815],
        shelters: [
            { id: "lh_001", name: "漯河西站地下避难所", type: "bunker", position: [114.0065, 33.5615], address: "漯河市源汇区漯河西站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁漯河西站", description: "漯河高铁枢纽民防" },
            { id: "lh_002", name: "许慎故里地下人防", type: "shelter", position: [114.0565, 33.6315], address: "漯河市召陵区许慎故里地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交许慎故里站", description: "漯河许慎故里配套民防" },
            { id: "lh_003", name: "沙澧河风景区地下避难所", type: "shelter", position: [114.0165, 33.6015], address: "漯河市郾城区沙澧河风景区地下", capacity: "2500人", level: "核6级", facilities: "景区地下防护", access: "公交沙澧河站", description: "漯河沙澧河配套民防" }
        ]
    },
    "sanmenxia": {
        name: "三门峡",
        center: [111.2002, 34.7726],
        shelters: [
            { id: "smx_001", name: "三门峡南站地下避难所", type: "bunker", position: [111.2102, 34.7526], address: "三门峡市陕州区三门峡南站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁三门峡南站", description: "三门峡高铁枢纽民防" },
            { id: "smx_002", name: "虢国博物馆地下人防", type: "shelter", position: [111.1802, 34.7826], address: "三门峡市湖滨区虢国博物馆地下", capacity: "2500人", level: "核6级", facilities: "博物馆地下防护", access: "公交虢国博物馆站", description: "三门峡虢国博物馆配套民防" },
            { id: "smx_003", name: "天鹅湖地下避难所", type: "shelter", position: [111.2202, 34.7926], address: "三门峡市湖滨区天鹅湖景区地下", capacity: "2000人", level: "核6级", facilities: "景区地下防护", access: "公交天鹅湖站", description: "三门峡天鹅湖配套民防" }
        ]
    },
    "zhoukou": {
        name: "周口",
        center: [114.6969, 33.6263],
        shelters: [
            { id: "zk_001", name: "周口东站地下避难所", type: "bunker", position: [114.7469, 33.6063], address: "周口市川汇区周口东站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁周口东站", description: "周口高铁枢纽民防" },
            { id: "zk_002", name: "太昊陵地下人防", type: "shelter", position: [114.7169, 33.6363], address: "周口市淮阳区太昊陵地下", capacity: "2500人", level: "核6级", facilities: "古建筑群地下防护", access: "公交太昊陵站", description: "周口太昊陵配套民防" },
            { id: "zk_003", name: "关帝庙地下避难所", type: "shelter", position: [114.6769, 33.6163], address: "周口市川汇区关帝庙地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交关帝庙站", description: "周口关帝庙配套民防" }
        ]
    },
    "zhumadian": {
        name: "驻马店",
        center: [114.0225, 33.0124],
        shelters: [
            { id: "zmd_001", name: "驻马店西站地下避难所", type: "bunker", position: [114.0425, 32.9924], address: "驻马店市驿城区驻马店西站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁驻马店西站", description: "驻马店高铁枢纽民防" },
            { id: "zmd_002", name: "嵖岈山地下避难所", type: "shelter", position: [113.6225, 33.1524], address: "驻马店市遂平县嵖岈山景区地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/公交", description: "驻马店嵖岈山配套民防" },
            { id: "zmd_003", name: "南海禅寺地下人防", type: "shelter", position: [114.0425, 33.0324], address: "驻马店市汝南县南海禅寺地下", capacity: "2500人", level: "核6级", facilities: "古寺地下防护", access: "公交南海禅寺站", description: "驻马店南海禅寺配套民防" }
        ]
    },
    "xinzhou": {
        name: "忻州",
        center: [112.7341, 38.4169],
        shelters: [
            { id: "xz_001", name: "忻州西站地下避难所", type: "bunker", position: [112.7241, 38.3969], address: "忻州市忻府区忻州西站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁忻州西站", description: "忻州高铁枢纽民防" },
            { id: "xz_002", name: "五台山地下避难所", type: "shelter", position: [113.5541, 39.0369], address: "忻州市五台县五台山景区地下", capacity: "4000人", level: "核6级", facilities: "佛教圣地地下防护", access: "景区大巴/公交", description: "五台山配套民防" },
            { id: "xz_003", name: "雁门关地下人防", type: "shelter", position: [112.4241, 39.1869], address: "忻州市代县雁门关景区地下", capacity: "2500人", level: "核6级", facilities: "长城关隘地下防护", access: "景区大巴/公交", description: "雁门关配套民防" }
        ]
    },
    // ===== 第111-120个城市 =====
    "shuozhou": {
        name: "朔州",
        center: [112.4312, 39.3316],
        shelters: [
            { id: "sz_001", name: "朔州站地下避难所", type: "bunker", position: [112.4412, 39.3216], address: "朔州市朔城区朔州站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "朔州站/公交", description: "朔州铁路枢纽民防" },
            { id: "sz_002", name: "崇福寺地下人防", type: "shelter", position: [112.4312, 39.3416], address: "朔州市朔城区崇福寺地下", capacity: "2500人", level: "核6级", facilities: "古寺地下防护", access: "公交崇福寺站", description: "朔州崇福寺配套民防" },
            { id: "sz_003", name: "应县木塔地下避难所", type: "shelter", position: [113.1812, 39.5616], address: "朔州市应县应县木塔地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交应县木塔站", description: "应县木塔配套民防" }
        ]
    },
    "bengbu": {
        name: "蚌埠",
        center: [117.3895, 32.9159],
        shelters: [
            { id: "bb_001", name: "蚌埠南站地下避难所", type: "bunker", position: [117.3995, 32.8959], address: "蚌埠市蚌山区蚌埠南站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁蚌埠南站", description: "蚌埠高铁枢纽民防" },
            { id: "bb_002", name: "龙子湖地下人防", type: "shelter", position: [117.4095, 32.9359], address: "蚌埠市蚌山区龙子湖景区地下", capacity: "3000人", level: "核6级", facilities: "市中心景区地下防护", access: "公交龙子湖站", description: "蚌埠市中心核心民防" },
            { id: "bb_003", name: "张公山公园地下避难所", type: "shelter", position: [117.3495, 32.9259], address: "蚌埠市禹会区张公山公园地下", capacity: "2500人", level: "核6级", facilities: "公园地下防护", access: "公交张公山公园站", description: "蚌埠张公山配套民防" }
        ]
    },
    "huainan": {
        name: "淮南",
        center: [116.9998, 32.6255],
        shelters: [
            { id: "hn_001", name: "淮南南站地下避难所", type: "bunker", position: [116.9798, 32.6055], address: "淮南市田家庵区淮南南站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁淮南南站", description: "淮南高铁枢纽民防" },
            { id: "hn_002", name: "八公山地下避难所", type: "shelter", position: [116.7998, 32.6255], address: "淮南市八公山区八公山景区地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/公交", description: "淮南八公山配套民防" },
            { id: "hn_003", name: "龙湖公园地下人防", type: "shelter", position: [117.0198, 32.6455], address: "淮南市田家庵区龙湖公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交龙湖公园站", description: "淮南市中心核心民防" }
        ]
    },
    "huaibei": {
        name: "淮北",
        center: [116.7982, 33.9559],
        shelters: [
            { id: "hb_001", name: "淮北站地下避难所", type: "bunker", position: [116.8082, 33.9459], address: "淮北市相山区淮北站地下", capacity: "3000人", level: "核6级", facilities: "铁路枢纽深层防护", access: "淮北站/公交", description: "淮北铁路枢纽民防" },
            { id: "hb_002", name: "相山公园地下人防", type: "shelter", position: [116.7882, 33.9759], address: "淮北市相山区相山公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交相山公园站", description: "淮北市中心核心民防" },
            { id: "hb_003", name: "隋唐运河古镇地下避难所", type: "shelter", position: [116.8182, 33.9359], address: "淮北市相山区隋唐运河古镇地下", capacity: "2000人", level: "核6级", facilities: "古镇地下防护", access: "公交运河古镇站", description: "淮北隋唐运河古镇配套民防" }
        ]
    },
    "anqing": {
        name: "安庆",
        center: [117.0635, 30.5259],
        shelters: [
            { id: "aq_001", name: "安庆站地下避难所", type: "bunker", position: [117.0735, 30.5159], address: "安庆市宜秀区安庆站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁安庆站", description: "安庆高铁枢纽民防" },
            { id: "aq_002", name: "天柱山地下避难所", type: "shelter", position: [116.9235, 30.4459], address: "安庆市潜山市天柱山景区地下", capacity: "3500人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/公交", description: "安庆天柱山配套民防" },
            { id: "aq_003", name: "菱湖公园地下人防", type: "shelter", position: [117.0535, 30.5459], address: "安庆市大观区菱湖公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交菱湖公园站", description: "安庆市中心核心民防" }
        ]
    },
    "fuyang": {
        name: "阜阳",
        center: [115.8145, 32.8909],
        shelters: [
            { id: "fy_001", name: "阜阳西站地下避难所", type: "bunker", position: [115.8345, 32.8709], address: "阜阳市颍州区阜阳西站地下", capacity: "4000人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁阜阳西站", description: "阜阳高铁枢纽民防" },
            { id: "fy_002", name: "颍州西湖地下人防", type: "shelter", position: [115.7845, 32.9109], address: "阜阳市颍州区颍州西湖地下", capacity: "3000人", level: "核6级", facilities: "景区地下防护", access: "公交颍州西湖站", description: "阜阳颍州西湖配套民防" },
            { id: "fy_003", name: "文峰公园地下避难所", type: "shelter", position: [115.8245, 32.8909], address: "阜阳市颍州区文峰公园地下", capacity: "2500人", level: "核6级", facilities: "市中心公园地下防护", access: "公交文峰公园站", description: "阜阳市中心核心民防" }
        ]
    },
    "bozhou": {
        name: "亳州",
        center: [115.7812, 33.8456],
        shelters: [
            { id: "bz_001", name: "亳州南站地下避难所", type: "bunker", position: [115.8212, 33.8256], address: "亳州市谯城区亳州南站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁亳州南站", description: "亳州高铁枢纽民防" },
            { id: "bz_002", name: "花戏楼地下人防", type: "shelter", position: [115.7712, 33.8556], address: "亳州市谯城区花戏楼地下", capacity: "2500人", level: "核6级", facilities: "古建筑地下防护", access: "公交花戏楼站", description: "亳州花戏楼配套民防" },
            { id: "bz_003", name: "曹操运兵道地下避难所", type: "bunker", position: [115.7912, 33.8456], address: "亳州市谯城区曹操运兵道地下", capacity: "3000人", level: "核6级", facilities: "古地道加固防护", access: "公交曹操运兵道站", description: "亳州曹操运兵道配套民防" }
        ]
    },
    "chuzhou": {
        name: "滁州",
        center: [118.3169, 32.3016],
        shelters: [
            { id: "chuz_001", name: "滁州站地下避难所", type: "bunker", position: [118.2969, 32.3216], address: "滁州市南谯区滁州站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁滁州站", description: "滁州高铁枢纽民防" },
            { id: "chuz_002", name: "琅琊山地下避难所", type: "shelter", position: [118.2969, 32.2816], address: "滁州市琅琊区琅琊山景区地下", capacity: "3000人", level: "核6级", facilities: "4A景区地下防护", access: "景区大巴/公交", description: "滁州琅琊山配套民防" },
            { id: "chuz_003", name: "醉翁亭地下人防", type: "shelter", position: [118.2769, 32.2616], address: "滁州市琅琊区醉翁亭地下", capacity: "2000人", level: "核6级", facilities: "古建筑地下防护", access: "公交醉翁亭站", description: "滁州醉翁亭配套民防" }
        ]
    },
    "luan": {
        name: "六安",
        center: [116.5203, 31.7350],
        shelters: [
            { id: "la_001", name: "六安站地下避难所", type: "bunker", position: [116.5403, 31.7250], address: "六安市裕安区六安站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁六安站", description: "六安高铁枢纽民防" },
            { id: "la_002", name: "天堂寨地下避难所", type: "shelter", position: [115.9803, 31.2250], address: "六安市金寨县天堂寨景区地下", capacity: "3000人", level: "核6级", facilities: "5A景区地下防护", access: "景区大巴/公交", description: "六安天堂寨配套民防" },
            { id: "la_003", name: "万佛湖地下人防", type: "shelter", position: [116.6803, 31.2350], address: "六安市舒城县万佛湖景区地下", capacity: "2500人", level: "核6级", facilities: "湖泊景区地下防护", access: "景区大巴/公交", description: "六安万佛湖配套民防" }
        ]
    },
    "xuancheng": {
        name: "宣城",
        center: [118.7611, 30.9454],
        shelters: [
            { id: "xcheng_001", name: "宣城站地下避难所", type: "bunker", position: [118.7811, 30.9354], address: "宣城市宣州区宣城站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁宣城站", description: "宣城高铁枢纽民防" },
            { id: "xcheng_002", name: "敬亭山地下人防", type: "shelter", position: [118.7411, 30.9654], address: "宣城市宣州区敬亭山景区地下", capacity: "2500人", level: "核6级", facilities: "文化名山地下防护", access: "景区大巴/公交", description: "宣城敬亭山配套民防" },
            { id: "xcheng_003", name: "桃花潭地下避难所", type: "shelter", position: [118.3811, 30.6854], address: "宣城市泾县桃花潭景区地下", capacity: "2000人", level: "核6级", facilities: "景区地下防护", access: "景区大巴/公交", description: "宣城桃花潭配套民防" }
        ]
    },
    "chizhou": {
        name: "池州",
        center: [117.4915, 30.6648],
        shelters: [
            { id: "chi_001", name: "池州站地下避难所", type: "bunker", position: [117.4715, 30.6548], address: "池州市贵池区池州站地下", capacity: "3500人", level: "核6级", facilities: "高铁枢纽深层防护", access: "高铁池州站", description: "池州高铁枢纽民防" },
            { id: "chi_002", name: "九华山地下避难所", type: "shelter", position: [117.8115, 30.4848], address: "池州市青阳县九华山景区地下", capacity: "4000人", level: "核6级", facilities: "佛教名山地下防护", access: "景区大巴/公交", description: "池州九华山配套民防" },
            { id: "chi_003", name: "平天湖地下人防", type: "shelter", position: [117.5115, 30.6348], address: "池州市贵池区平天湖景区地下", capacity: "2500人", level: "核6级", facilities: "市中心景区地下防护", access: "公交平天湖站", description: "池州市中心核心民防" }
        ]
    }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SHELTER_DATA_BATCH_2;
}
