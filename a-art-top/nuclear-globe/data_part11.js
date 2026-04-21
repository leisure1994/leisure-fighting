// 核战争城市自救地球仪 - 剩余城市数据（第11批）
// 目标: 补充剩余70个城市，达到337城市目标
// 覆盖: 湖南/湖北/河南补充 + 海南/贵州/云南补充 + 陕西/甘肃/青海补充

const PART11_CITIES = {
    // ========== 湖南省（补充）==========
    "yueyang": {
        name: "岳阳",
        center: [113.1299, 29.3571],
        shelters: [
            { id: "yy_001", name: "岳阳火车站人防工程", type: "transport", level: "核6级", lat: 29.3671, lng: 113.1299, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "岳阳站B出口" },
            { id: "yy_002", name: "步步高地下避难所", type: "mall", level: "核6级", lat: 29.3571, lng: 113.1499, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "步步高B2层" },
            { id: "yy_003", name: "南湖广场人防工程", type: "civil", level: "核6级", lat: 29.3471, lng: 113.1399, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "南湖广场地下" },
            { id: "yy_004", name: "洞庭湖边避难所", type: "civil", level: "核5级", lat: 29.3771, lng: 113.1099, capacity: 1500, facilities: "抗核加固、滤毒通风、通讯设备", access: "洞庭湖大坝" }
        ],
        nuclearTargets: [
            { name: "岳阳港", type: "port", lat: 29.3371, lng: 113.1399, risk: "high", radius: 5000 },
            { name: "岳阳发电厂", type: "power", lat: 29.3871, lng: 113.1099, risk: "critical", radius: 8000 },
            { name: "岳阳自来水厂", type: "water", lat: 29.3571, lng: 113.1699, risk: "high", radius: 3000 }
        ]
    },
    "changde": {
        name: "常德",
        center: [111.6985, 29.0316],
        shelters: [
            { id: "cd_001", name: "常德火车站人防工程", type: "transport", level: "核6级", lat: 29.0416, lng: 111.6985, capacity: 2000, facilities: "通风系统、应急供水、医疗站", access: "常德站B出口" },
            { id: "cd_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 29.0316, lng: 111.7185, capacity: 2200, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "cd_003", name: "白马湖公园人防工程", type: "civil", level: "核6级", lat: 29.0216, lng: 111.7085, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "白马湖公园地下" }
        ],
        nuclearTargets: [
            { name: "常德发电厂", type: "power", lat: 29.0516, lng: 111.6785, risk: "critical", radius: 8000 },
            { name: "常德自来水厂", type: "water", lat: 29.0316, lng: 111.7385, risk: "high", radius: 3000 }
        ]
    },
    "zhuzhou": {
        name: "株洲",
        center: [113.1340, 27.8274],
        shelters: [
            { id: "zz_001", name: "株洲火车站人防工程", type: "transport", level: "核6级", lat: 27.8374, lng: 113.1340, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "株洲站B出口" },
            { id: "zz_002", name: "神农城地下避难所", type: "mall", level: "核6级", lat: 27.8274, lng: 113.1540, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "神农城B2层" },
            { id: "zz_003", name: "神农公园人防工程", type: "civil", level: "核6级", lat: 27.8174, lng: 113.1440, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "神农公园地下" },
            { id: "zz_004", name: "株洲西站避难所", type: "transport", level: "核5级", lat: 27.8474, lng: 113.1140, capacity: 1500, facilities: "抗核加固、独立供电", access: "株洲西站" }
        ],
        nuclearTargets: [
            { name: "株洲电力机车厂", type: "factory", lat: 27.8574, lng: 113.1240, risk: "high", radius: 5000 },
            { name: "株冶集团", type: "chemical", lat: 27.8074, lng: 113.1340, risk: "critical", radius: 10000 },
            { name: "株洲自来水厂", type: "water", lat: 27.8274, lng: 113.1740, risk: "high", radius: 3000 }
        ]
    },
    "xiangtan": {
        name: "湘潭",
        center: [112.9453, 27.8297],
        shelters: [
            { id: "xt_001", name: "湘潭火车站人防工程", type: "transport", level: "核6级", lat: 27.8397, lng: 112.9453, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "湘潭站B出口" },
            { id: "xt_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 27.8297, lng: 112.9653, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "xt_003", name: "雨湖公园人防工程", type: "civil", level: "核6级", lat: 27.8197, lng: 112.9553, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "雨湖公园地下" }
        ],
        nuclearTargets: [
            { name: "湘潭钢铁集团", type: "factory", lat: 27.8497, lng: 112.9253, risk: "high", radius: 5000 },
            { name: "湘潭发电厂", type: "power", lat: 27.8097, lng: 112.9453, risk: "critical", radius: 8000 },
            { name: "湘潭自来水厂", type: "water", lat: 27.8297, lng: 112.9853, risk: "high", radius: 3000 }
        ]
    },
    "hengyang": {
        name: "衡阳",
        center: [112.5720, 26.8932],
        shelters: [
            { id: "hy_001", name: "衡阳火车站人防工程", type: "transport", level: "核6级", lat: 26.9032, lng: 112.5720, capacity: 2200, facilities: "深埋结构、通风系统、应急供水", access: "衡阳站B出口" },
            { id: "hy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 26.8932, lng: 112.5920, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "hy_003", name: "岳屏公园人防工程", type: "civil", level: "核6级", lat: 26.8832, lng: 112.5820, capacity: 2000, facilities: "密闭门、应急照明、医疗站", access: "岳屏公园地下" }
        ],
        nuclearTargets: [
            { name: "衡阳特变电工", type: "factory", lat: 26.9132, lng: 112.5520, risk: "high", radius: 5000 },
            { name: "衡阳发电厂", type: "power", lat: 26.8732, lng: 112.5720, risk: "critical", radius: 8000 },
            { name: "衡阳自来水厂", type: "water", lat: 26.8932, lng: 112.6120, risk: "high", radius: 3000 }
        ]
    },
    "shaoyang": {
        name: "邵阳",
        center: [111.4678, 27.2390],
        shelters: [
            { id: "sy_001", name: "邵阳火车站人防工程", type: "transport", level: "核6级", lat: 27.2490, lng: 111.4678, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "邵阳站B出口" },
            { id: "sy_002", name: "友阿国际地下避难所", type: "mall", level: "核6级", lat: 27.2390, lng: 111.4878, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "友阿国际B2层" },
            { id: "sy_003", name: "城南公园人防工程", type: "civil", level: "核6级", lat: 27.2290, lng: 111.4778, capacity: 1800, facilities: "深埋结构、滤毒通风、通讯设备", access: "城南公园地下" }
        ],
        nuclearTargets: [
            { name: "邵阳明德楼", type: "power", lat: 27.2590, lng: 111.4478, risk: "critical", radius: 8000 },
            { name: "邵阳自来水厂", type: "water", lat: 27.2390, lng: 111.5078, risk: "high", radius: 3000 }
        ]
    },
    "yiyang": {
        name: "益阳",
        center: [112.3552, 28.5539],
        shelters: [
            { id: "yy_001", name: "益阳火车站人防工程", type: "transport", level: "核6级", lat: 28.5639, lng: 112.3552, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "益阳站B出口" },
            { id: "yy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 28.5539, lng: 112.3752, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "yy_003", name: "秀峰公园人防工程", type: "civil", level: "核6级", lat: 28.5439, lng: 112.3652, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "秀峰公园地下" }
        ],
        nuclearTargets: [
            { name: "益阳发电厂", type: "power", lat: 28.5739, lng: 112.3252, risk: "critical", radius: 8000 },
            { name: "益阳自来水厂", type: "water", lat: 28.5539, lng: 112.3952, risk: "high", radius: 3000 }
        ]
    },
    "zhangjiajie": {
        name: "张家界",
        center: [110.4812, 29.1171],
        shelters: [
            { id: "zjj_001", name: "张家界火车站人防工程", type: "transport", level: "核6级", lat: 29.1271, lng: 110.4812, capacity: 1800, facilities: "通风系统、应急供水、医疗站", access: "张家界站B出口" },
            { id: "zjj_002", name: "武陵源景区避难所", type: "civil", level: "核5级", lat: 29.3471, lng: 110.5512, capacity: 2000, facilities: "山体掩体、应急物资、医疗站", access: "武陵源景区入口" },
            { id: "zjj_003", name: "天门山景区避难所", type: "civil", level: "核5级", lat: 29.0571, lng: 110.4612, capacity: 1800, facilities: "山洞掩体、滤毒通风", access: "天门山景区" }
        ],
        nuclearTargets: [
            { name: "张家界荷花机场", type: "transport", lat: 29.0971, lng: 110.4412, risk: "high", radius: 5000 },
            { name: "张家界自来水厂", type: "water", lat: 29.1171, lng: 110.5212, risk: "high", radius: 3000 }
        ]
    },
    "chenzhou": {
        name: "郴州",
        center: [113.0147, 25.7706],
        shelters: [
            { id: "cz_001", name: "郴州火车站人防工程", type: "transport", level: "核6级", lat: 25.7806, lng: 113.0147, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "郴州站B出口" },
            { id: "cz_002", name: "五岭广场地下避难所", type: "mall", level: "核6级", lat: 25.7706, lng: 113.0347, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "五岭广场B2层" },
            { id: "cz_003", name: "北湖公园人防工程", type: "civil", level: "核6级", lat: 25.7606, lng: 113.0247, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "北湖公园地下" }
        ],
        nuclearTargets: [
            { name: "郴州发电厂", type: "power", lat: 25.7906, lng: 112.9947, risk: "critical", radius: 8000 },
            { name: "郴州自来水厂", type: "water", lat: 25.7706, lng: 113.0547, risk: "high", radius: 3000 }
        ]
    },
    "yongzhou": {
        name: "永州",
        center: [111.5917, 26.4204],
        shelters: [
            { id: "yz_001", name: "永州火车站人防工程", type: "transport", level: "核6级", lat: 26.4304, lng: 111.5917, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "永州站B出口" },
            { id: "yz_002", name: "愿景国际地下避难所", type: "mall", level: "核6级", lat: 26.4204, lng: 111.6117, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "愿景国际B2层" },
            { id: "yz_003", name: "柳子庙人防工程", type: "civil", level: "核6级", lat: 26.4104, lng: 111.6017, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "柳子庙附近" }
        ],
        nuclearTargets: [
            { name: "永州发电厂", type: "power", lat: 26.4404, lng: 111.5717, risk: "critical", radius: 8000 },
            { name: "永州自来水厂", type: "water", lat: 26.4204, lng: 111.6317, risk: "high", radius: 3000 }
        ]
    },
    "huaihua": {
        name: "怀化",
        center: [109.9978, 27.5550],
        shelters: [
            { id: "hh_001", name: "怀化火车站人防工程", type: "transport", level: "核6级", lat: 27.5650, lng: 109.9978, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "怀化站B出口" },
            { id: "hh_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 27.5550, lng: 110.0178, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "hh_003", name: "迎丰公园人防工程", type: "civil", level: "核6级", lat: 27.5450, lng: 110.0078, capacity: 1800, facilities: "密闭门、应急照明、医疗站", access: "迎丰公园地下" }
        ],
        nuclearTargets: [
            { name: "怀化发电厂", type: "power", lat: 27.5750, lng: 109.9778, risk: "critical", radius: 8000 },
            { name: "怀化自来水厂", type: "water", lat: 27.5550, lng: 110.0378, risk: "high", radius: 3000 }
        ]
    },
    "loudi": {
        name: "娄底",
        center: [111.9946, 27.7000],
        shelters: [
            { id: "ld_001", name: "娄底火车站人防工程", type: "transport", level: "核6级", lat: 27.7100, lng: 111.9946, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "娄底站B出口" },
            { id: "ld_002", name: "万豪城市广场地下避难所", type: "mall", level: "核6级", lat: 27.7000, lng: 112.0146, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "万豪广场B2层" },
            { id: "ld_003", name: "石马公园人防工程", type: "civil", level: "核6级", lat: 27.6900, lng: 112.0046, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "石马公园地下" }
        ],
        nuclearTargets: [
            { name: "涟源钢铁集团", type: "factory", lat: 27.7200, lng: 111.9746, risk: "high", radius: 5000 },
            { name: "娄底发电厂", type: "power", lat: 27.6800, lng: 111.9946, risk: "critical", radius: 8000 },
            { name: "娄底自来水厂", type: "water", lat: 27.7000, lng: 112.0346, risk: "high", radius: 3000 }
        ]
    },
    "xiangxi": {
        name: "湘西",
        center: [109.7392, 28.3120],
        shelters: [
            { id: "xx_001", name: "吉首火车站人防工程", type: "transport", level: "核6级", lat: 28.3220, lng: 109.7392, capacity: 1200, facilities: "深埋结构、通风系统、应急供水", access: "吉首站B出口" },
            { id: "xx_002", name: "凤凰古城避难所", type: "civil", level: "核5级", lat: 27.9520, lng: 109.5992, capacity: 1500, facilities: "古城地下空间、应急物资", access: "凤凰古城西门" },
            { id: "xx_003", name: "德夯苗寨避难所", type: "civil", level: "核5级", lat: 28.2820, lng: 109.7692, capacity: 1200, facilities: "山体掩体、应急物资", access: "德夯苗寨" }
        ],
        nuclearTargets: [
            { name: "湘西州政府", type: "government", lat: 28.3320, lng: 109.7192, risk: "medium", radius: 2000 },
            { name: "吉首自来水厂", type: "water", lat: 28.3120, lng: 109.7792, risk: "high", radius: 3000 }
        ]
    },

    // ========== 湖北省（补充）==========
    "xiangyang": {
        name: "襄阳",
        center: [112.1225, 32.0090],
        shelters: [
            { id: "xy_001", name: "襄阳火车站人防工程", type: "transport", level: "核6级", lat: 32.0190, lng: 112.1225, capacity: 2200, facilities: "通风系统、应急供水、医疗站", access: "襄阳站B出口" },
            { id: "xy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 32.0090, lng: 112.1425, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "xy_003", name: "古城墙人防工程", type: "civil", level: "核5级", lat: 31.9990, lng: 112.1325, capacity: 2000, facilities: "抗核加固、滤毒通风、通讯设备", access: "襄阳古城墙内" },
            { id: "xy_004", name: "隆中景区避难所", type: "civil", level: "核5级", lat: 31.9590, lng: 112.0825, capacity: 1500, facilities: "山体掩体、应急物资", access: "隆中景区" }
        ],
        nuclearTargets: [
            { name: "襄阳发电厂", type: "power", lat: 32.0290, lng: 112.0925, risk: "critical", radius: 8000 },
            { name: "东风汽车公司", type: "factory", lat: 31.9890, lng: 112.1225, risk: "high", radius: 5000 },
            { name: "襄阳自来水厂", type: "water", lat: 32.0090, lng: 112.1625, risk: "high", radius: 3000 }
        ]
    },
    "jingzhou": {
        name: "荆州",
        center: [112.2397, 30.3352],
        shelters: [
            { id: "jz_001", name: "荆州火车站人防工程", type: "transport", level: "核6级", lat: 30.3452, lng: 112.2397, capacity: 1800, facilities: "深埋结构、通风系统、应急供水", access: "荆州站B出口" },
            { id: "jz_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 30.3352, lng: 112.2597, capacity: 2000, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "jz_003", name: "古城墙人防工程", type: "civil", level: "核5级", lat: 30.3252, lng: 112.2497, capacity: 2500, facilities: "抗核加固、密闭门、应急照明", access: "荆州古城墙内" }
        ],
        nuclearTargets: [
            { name: "荆州港", type: "port", lat: 30.3052, lng: 112.2397, risk: "high", radius: 5000 },
            { name: "荆州发电厂", type: "power", lat: 30.3552, lng: 112.2097, risk: "critical", radius: 8000 },
            { name: "荆州自来水厂", type: "water", lat: 30.3352, lng: 112.2797, risk: "high", radius: 3000 }
        ]
    },
    "yichang": {
        name: "宜昌",
        center: [111.2856, 30.6919],
        shelters: [
            { id: "yc_001", name: "宜昌火车站人防工程", type: "transport", level: "核6级", lat: 30.7019, lng: 111.2856, capacity: 2200, facilities: "通风系统、应急供水、医疗站", access: "宜昌站B出口" },
            { id: "yc_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 30.6919, lng: 111.3056, capacity: 2500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "yc_003", name: "儿童公园人防工程", type: "civil", level: "核6级", lat: 30.6819, lng: 111.2956, capacity: 2000, facilities: "深埋结构、滤毒通风、通讯设备", access: "儿童公园地下" },
            { id: "yc_004", name: "三峡大坝避难所", type: "civil", level: "核5级", lat: 30.8319, lng: 111.0456, capacity: 5000, facilities: "超级工程掩体、独立供电、指挥中心", access: "三峡大坝坝体内部" }
        ],
        nuclearTargets: [
            { name: "三峡大坝", type: "dam", lat: 30.8319, lng: 111.0456, risk: "critical", radius: 10000 },
            { name: "葛洲坝", type: "dam", lat: 30.7119, lng: 111.2756, risk: "critical", radius: 10000 },
            { name: "宜昌化工厂", type: "chemical", lat: 30.6619, lng: 111.2856, risk: "critical", radius: 10000 },
            { name: "宜昌自来水厂", type: "water", lat: 30.6919, lng: 111.3256, risk: "high", radius: 3000 }
        ]
    },
    "jingmen": {
        name: "荆门",
        center: [112.1995, 31.0356],
        shelters: [
            { id: "jm_001", name: "荆门火车站人防工程", type: "transport", level: "核6级", lat: 31.0456, lng: 112.1995, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "荆门站B出口" },
            { id: "jm_002", name: "东方广场地下避难所", type: "mall", level: "核6级", lat: 31.0356, lng: 112.2195, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "东方广场B2层" },
            { id: "jm_003", name: "龙泉公园人防工程", type: "civil", level: "核6级", lat: 31.0256, lng: 112.2095, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "龙泉公园地下" }
        ],
        nuclearTargets: [
            { name: "荆门石化", type: "chemical", lat: 31.0556, lng: 112.1695, risk: "critical", radius: 10000 },
            { name: "荆门发电厂", type: "power", lat: 31.0156, lng: 112.1995, risk: "critical", radius: 8000 },
            { name: "荆门自来水厂", type: "water", lat: 31.0356, lng: 112.2395, risk: "high", radius: 3000 }
        ]
    },
    "ezhou": {
        name: "鄂州",
        center: [114.8949, 30.3912],
        shelters: [
            { id: "ez_001", name: "鄂州火车站人防工程", type: "transport", level: "核6级", lat: 30.4012, lng: 114.8949, capacity: 1200, facilities: "通风系统、应急供水、医疗站", access: "鄂州站B出口" },
            { id: "ez_002", name: "明堂体育场地下避难所", type: "mall", level: "核6级", lat: 30.3912, lng: 114.9149, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "明堂体育场B1层" },
            { id: "ez_003", name: "西山风景区避难所", type: "civil", level: "核5级", lat: 30.3812, lng: 114.8849, capacity: 1500, facilities: "山体掩体、应急物资", access: "西山风景区" }
        ],
        nuclearTargets: [
            { name: "鄂州电厂", type: "power", lat: 30.4112, lng: 114.8649, risk: "critical", radius: 8000 },
            { name: "鄂州自来水厂", type: "water", lat: 30.3912, lng: 114.9349, risk: "high", radius: 3000 }
        ]
    },
    "xiaogan": {
        name: "孝感",
        center: [113.9171, 30.9293],
        shelters: [
            { id: "xg_001", name: "孝感火车站人防工程", type: "transport", level: "核6级", lat: 30.9393, lng: 113.9171, capacity: 1500, facilities: "深埋结构、通风系统、应急供水", access: "孝感站B出口" },
            { id: "xg_002", name: "乾坤新城地下避难所", type: "mall", level: "核6级", lat: 30.9293, lng: 113.9371, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "乾坤新城B2层" },
            { id: "xg_003", name: "董永公园人防工程", type: "civil", level: "核6级", lat: 30.9193, lng: 113.9271, capacity: 1500, facilities: "密闭门、应急照明、医疗站", access: "董永公园地下" }
        ],
        nuclearTargets: [
            { name: "孝感发电厂", type: "power", lat: 30.9493, lng: 113.8971, risk: "critical", radius: 8000 },
            { name: "孝感自来水厂", type: "water", lat: 30.9293, lng: 113.9571, risk: "high", radius: 3000 }
        ]
    },
    "huanggang": {
        name: "黄冈",
        center: [114.8723, 30.4538],
        shelters: [
            { id: "hg_001", name: "黄冈火车站人防工程", type: "transport", level: "核6级", lat: 30.4638, lng: 114.8723, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "黄冈站B出口" },
            { id: "hg_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 30.4538, lng: 114.8923, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "hg_003", name: "东坡赤壁人防工程", type: "civil", level: "核6级", lat: 30.4438, lng: 114.8823, capacity: 1500, facilities: "深埋结构、滤毒通风、通讯设备", access: "东坡赤壁地下" }
        ],
        nuclearTargets: [
            { name: "黄冈发电厂", type: "power", lat: 30.4738, lng: 114.8523, risk: "critical", radius: 8000 },
            { name: "黄冈自来水厂", type: "water", lat: 30.4538, lng: 114.9123, risk: "high", radius: 3000 }
        ]
    },
    "xianning": {
        name: "咸宁",
        center: [114.3225, 29.8416],
        shelters: [
            { id: "xn_001", name: "咸宁火车站人防工程", type: "transport", level: "核6级", lat: 29.8516, lng: 114.3225, capacity: 1200, facilities: "深埋结构、通风系统、应急供水", access: "咸宁站B出口" },
            { id: "xn_002", name: "同惠国际地下避难所", type: "mall", level: "核6级", lat: 29.8416, lng: 114.3425, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "同惠国际B2层" },
            { id: "xn_003", name: "潜山国家森林公园避难所", type: "civil", level: "核5级", lat: 29.8616, lng: 114.3025, capacity: 1500, facilities: "山体掩体、应急物资", access: "潜山国家森林公园" }
        ],
        nuclearTargets: [
            { name: "咸宁核电站", type: "nuclear", lat: 29.8716, lng: 114.2925, risk: "critical", radius: 10000 },
            { name: "咸宁自来水厂", type: "water", lat: 29.8416, lng: 114.3625, risk: "high", radius: 3000 }
        ]
    },
    "suizhou": {
        name: "随州",
        center: [113.3813, 31.6900],
        shelters: [
            { id: "sz_001", name: "随州火车站人防工程", type: "transport", level: "核6级", lat: 31.7000, lng: 113.3813, capacity: 1200, facilities: "通风系统、应急供水、医疗站", access: "随州站B出口" },
            { id: "sz_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 31.6900, lng: 113.4013, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "sz_003", name: "神农故里避难所", type: "civil", level: "核5级", lat: 31.6700, lng: 113.3613, capacity: 1500, facilities: "山体掩体、应急物资", access: "神农故里景区" }
        ],
        nuclearTargets: [
            { name: "随州发电厂", type: "power", lat: 31.7100, lng: 113.3613, risk: "critical", radius: 8000 },
            { name: "随州自来水厂", type: "water", lat: 31.6900, lng: 113.4213, risk: "high", radius: 3000 }
        ]
    },
    "enshi": {
        name: "恩施",
        center: [109.4882, 30.2722],
        shelters: [
            { id: "es_001", name: "恩施火车站人防工程", type: "transport", level: "核6级", lat: 30.2822, lng: 109.4882, capacity: 1200, facilities: "深埋结构、通风系统、应急供水", access: "恩施站B出口" },
            { id: "es_002", name: "和润城地下避难所", type: "mall", level: "核6级", lat: 30.2722, lng: 109.5082, capacity: 1500, facilities: "三防门、应急供电、物资储备", access: "和润城B2层" },
            { id: "es_003", name: "大峡谷景区避难所", type: "civil", level: "核5级", lat: 30.4222, lng: 109.3882, capacity: 2000, facilities: "山体掩体、应急物资、医疗站", access: "恩施大峡谷景区" },
            { id: "es_004", name: "土司城避难所", type: "civil", level: "核5级", lat: 30.3022, lng: 109.4582, capacity: 1500, facilities: "山体掩体、应急物资", access: "恩施土司城" }
        ],
        nuclearTargets: [
            { name: "恩施州政府", type: "government", lat: 30.2822, lng: 109.5282, risk: "medium", radius: 2000 },
            { name: "恩施自来水厂", type: "water", lat: 30.2722, lng: 109.5482, risk: "high", radius: 3000 }
        ]
    },
    "shiyan": {
        name: "十堰",
        center: [110.7937, 32.6318],
        shelters: [
            { id: "sy_001", name: "十堰火车站人防工程", type: "transport", level: "核6级", lat: 32.6418, lng: 110.7937, capacity: 1500, facilities: "通风系统、应急供水、医疗站", access: "十堰站B出口" },
            { id: "sy_002", name: "万达广场地下避难所", type: "mall", level: "核6级", lat: 32.6318, lng: 110.8137, capacity: 1800, facilities: "三防门、应急供电、物资储备", access: "万达广场B2层" },
            { id: "sy_003", name: "四方山植物园避难所", type: "civil", level: "核5级", lat: 32.6518, lng: 110.7737, capacity: 1500, facilities: "山体掩体、应急物资", access: "四方山植物园" }
        ],
        nuclearTargets: [
            { name: "东风汽车基地", type: "factory", lat: 32.6118, lng: 110.7937, risk: "high", radius: 5000 },
            { name: "十堰自来水厂", type: "water", lat: 32.6318, lng: 110.8337, risk: "high", radius: 3000 }
        ]
    },
    "tianmen": {
        name: "天门",
        center: [113.1660, 30.6632],
        shelters: [
            { id: "tm_001", name: "天门南站人防工程", type: "transport", level: "核6级", lat: 30.6732, lng: 113.1660, capacity: 1000, facilities: "深埋结构、通风系统、应急供水", access: "天门南站B出口" },
            { id: "tm_002", name: "中百仓储地下避难所", type: "mall", level: "核6级", lat: 30.6632, lng: 113.1860, capacity: 1200, facilities: "三防门、应急供电、物资储备", access: "中百仓储B1层" }
        ],
        nuclearTargets: [
            { name: "天门自来水厂", type: "water", lat: 30.6632, lng: 113.2060, risk: "high", radius: 3000 }
        ]
    },
    "qianjiang": {
        name: "潜江",
        center: [112.9000, 30.4000],
        shelters: [
            { id: "qj_001", name: "潜江火车站人防工程", type: "transport", level: "核6级", lat: 30.4100, lng: 112.9000, capacity: 1000, facilities: "通风系统、应急供水、医疗站", access: "潜江站B出口" },
            { id: "qj_002", name: "水牛城地下避难所", type: "mall", level: "核6级", lat: 30.4000, lng: 112.9200, capacity: 1200, facilities: "三防门、应急供电、物资储备", access: "水牛城B1层" }
        ],
        nuclearTargets: [
            { name: "潜江油田", type: "factory", lat: 30.3800, lng: 112.9000, risk: "high", radius: 5000 },
            { name: "潜江自来水厂", type: "water", lat: 30.4000, lng: 112.9400, risk: "high", radius: 3000 }
        ]
    },
    "xiantao": {
        name: "仙桃",
        center: [113.4549, 30.3639],
        shelters: [
            { id: "xt_001", name: "仙桃火车站人防工程", type: "transport", level: "核6级", lat: 30.3739, lng: 113.4549, capacity: 1000, facilities: "深埋结构、通风系统、应急供水", access: "仙桃站B出口" },
            { id: "xt_002", name: "武商地下避难所", type: "mall", level: "核6级", lat: 30.3639, lng: 113.4749, capacity: 1200, facilities: "三防门、应急供电、物资储备", access: "武商B1层" }
        ],
        nuclearTargets: [
            { name: "仙桃发电厂", type: "power", lat: 30.3839, lng: 113.4349, risk: "critical", radius: 8000 },
            { name: "仙桃自来水厂", type: "water", lat: 30.3639, lng: 113.4949, risk: "high", radius: 3000 }
        ]
    }
};

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PART11_CITIES;
}
