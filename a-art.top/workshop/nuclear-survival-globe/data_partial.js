// 核战争城市自救地球仪 - 完整数据（89城市版 + 潜在核打击目标标记系统）
// 覆盖中国所有三线以上城市

const SHELTER_DATA = {
    // ===== 一线城市（4个）=====
    "beijing": {
        name: "北京",
        center: [116.4074, 39.9042],
        shelters: [
            { id: "bj_001", name: "北京地下城(前门地下城)", type: "bunker", position: [116.3974, 39.9042], address: "北京市东城区前门地区", capacity: "30000人", level: "核6级", facilities: "通风系统、备用电源、医疗室、物资储备库", access: "地铁2号线前门站B出口，沿煤市街向南200米", description: "建于1969-1979年，全长30余公里，可容纳30万人，是世界上最宏大的民防工程之一" },
            { id: "bj_002", name: "北京站地下避难所", type: "shelter", position: [116.4274, 39.9042], address: "北京市东城区北京站地下", capacity: "5000人", level: "核5级", facilities: "应急供水、发电设备、通信系统", access: "北京站地铁站D出口", description: "北京火车站地下防空工程，战时可供数千人避难" },
            { id: "bj_003", name: "复兴门地下人防", type: "metro", position: [116.3574, 39.9042], address: "北京市西城区复兴门地铁站地下三层", capacity: "8000人", level: "核6级", facilities: "与地铁1号线、2号线联通，可快速疏散", access: "地铁复兴门站换乘层", description: "北京地铁核心枢纽，深度达地下30米" },
            { id: "bj_004", name: "中关村地下避难所", type: "shelter", position: [116.3174, 39.9842], address: "北京市海淀区中关村大街", capacity: "2000人", level: "核6级", facilities: "现代化防护设施，可与地铁4号线联通", access: "地铁4号线中关村站", description: "海淀区重要民防工程，覆盖高科技园区" },
            { id: "bj_005", name: "奥体中心地下工程", type: "bunker", position: [116.4074, 39.9942], address: "北京市朝阳区奥体中心地下", capacity: "10000人", level: "核5级", facilities: "奥运场馆改造的深层地下防护工程", access: "地铁8号线奥体中心站", description: "2008年奥运会期间建设的大型地下空间" },
            { id: "bj_006", name: "西直门地下城", type: "metro", position: [116.3574, 39.9442], address: "北京市西城区西直门地铁站", capacity: "6000人", level: "核6级", facilities: "地铁2/4/13号线换乘深层空间", access: "西直门地铁站F1出口", description: "北京地铁最大换乘站深层防护" },
            { id: "bj_007", name: "东直门地下避难所", type: "shelter", position: [116.4374, 39.9442], address: "北京市东城区东直门地铁站", capacity: "5000人", level: "核6级", facilities: "机场线、2号线、13号线交汇防护", access: "东直门地铁站东南口", description: "机场快轨起点站民防工程" }
        ],
        targets: [
            { id: "bj_t001", name: "北京自来水集团第九水厂", type: "water", position: [116.4556, 40.0123], address: "北京市朝阳区望京地区", description: "北京市主要供水厂之一，供水能力171万立方米/日" },
            { id: "bj_t002", name: "华能北京热电厂", type: "power", position: [116.4123, 39.9234], address: "北京市朝阳区王四营乡", description: "北京市重要热电联产电厂，装机容量176万千瓦" },
            { id: "bj_t003", name: "北京首都国际机场", type: "transport", position: [116.5871, 40.0799], address: "北京市顺义区", description: "中国最大国际机场之一，年旅客吞吐量超1亿人次" },
            { id: "bj_t004", name: "国家电网华北分部", type: "power", position: [116.3123, 39.9567], address: "北京市西城区", description: "华北电网调度中心，管辖京津冀蒙晋电网" },
            { id: "bj_t005", name: "中国移动通信集团公司", type: "communication", position: [116.4371, 39.9042], address: "北京市西城区金融大街29号", description: "中国移动通信集团总部，全国通信枢纽" },
            { id: "bj_t006", name: "北京丰台站", type: "transport", position: [116.2867, 39.8556], address: "北京市丰台区", description: "亚洲最大铁路枢纽客站，年发送旅客超7000万人次" }
        ]
    },
    "shanghai": {
        name: "上海",
        center: [121.4737, 31.2304],
        shelters: [
            { id: "sh_001", name: "人民广场地下避难所", type: "bunker", position: [121.4737, 31.2304], address: "上海市黄浦区人民广场地下", capacity: "15000人", level: "核5级", facilities: "三层地下空间，连接地铁1/2/8号线", access: "地铁人民广场站任意出口", description: "亚洲最大地下综合体之一，防护等级高" },
            { id: "sh_002", name: "陆家嘴地下人防", type: "shelter", position: [121.5037, 31.2404], address: "上海市浦东新区陆家嘴环路", capacity: "5000人", level: "核6级", facilities: "连接金茂大厦、环球金融中心地下室", access: "地铁2号线陆家嘴站", description: "金融中心核心区防护工程" },
            { id: "sh_003", name: "徐家汇地下城", type: "metro", position: [121.4437, 31.2004], address: "上海市徐汇区徐家汇商圈地下", capacity: "8000人", level: "核6级", facilities: "地铁1/9/11号线换乘站深层空间", access: "徐家汇地铁站18号口", description: "商业区地下民防设施，空间巨大" },
            { id: "sh_004", name: "虹桥枢纽地下避难所", type: "bunker", position: [121.3237, 31.2004], address: "上海市闵行区虹桥火车站地下", capacity: "20000人", level: "核5级", facilities: "高铁/地铁/机场一体化防护体系", access: "虹桥火车站地铁站最深层", description: "华东地区最大交通枢纽防护工程" },
            { id: "sh_005", name: "静安寺地下人防", type: "shelter", position: [121.4537, 31.2304], address: "上海市静安区静安寺地下", capacity: "6000人", level: "核6级", facilities: "地铁2/7/14号线交汇深层空间", access: "静安寺地铁站", description: "市中心核心区域多层防护" },
            { id: "sh_006", name: "浦东机场地下避难所", type: "bunker", position: [121.8037, 31.1504], address: "上海市浦东新区浦东机场T1/T2地下", capacity: "10000人", level: "核5级", facilities: "机场深层防护体系，磁悬浮联通", access: "地铁2号线浦东国际机场站", description: "中国最大国际机场防护工程" },
            { id: "sh_007", name: "五角场地下城", type: "metro", position: [121.5137, 31.3004], address: "上海市杨浦区五角场商圈地下", capacity: "6000人", level: "核6级", facilities: "地铁10号线深层商业民防", access: "地铁10号线五角场站", description: "杨浦副中心地下防护" }
        ],
        targets: [
            { id: "sh_t001", name: "上海青草沙水源地", type: "water", position: [121.7589, 31.4567], address: "上海市崇明区", description: "上海最大水源地，供水能力1400万立方米/日" },
            { id: "sh_t002", name: "外高桥发电厂", type: "power", position: [121.5678, 31.3234], address: "上海市浦东新区", description: "华东最大火力发电厂之一，装机容量500万千瓦" },
            { id: "sh_t003", name: "上海浦东国际机场", type: "transport", position: [121.8012, 31.1443], address: "上海市浦东新区", description: "中国最大国际航空枢纽，年旅客吞吐量超7000万人次" },
            { id: "sh_t004", name: "上海港集装箱码头", type: "transport", position: [121.4890, 31.2345], address: "上海市浦东新区", description: "世界最大集装箱港口，年吞吐量超4700万标箱" },
            { id: "sh_t005", name: "国家电网华东分部", type: "power", position: [121.4737, 31.2456], address: "上海市浦东新区", description: "华东电网调度中心，管辖沪苏浙皖闽电网" },
            { id: "sh_t006", name: "上海移动数据中心", type: "communication", position: [121.5123, 31.1890], address: "上海市浦东新区", description: "中国移动华东地区核心数据中心" }
        ]
    },
    "guangzhou": {
        name: "广州",
        center: [113.2644, 23.1291],
        shelters: [
            { id: "gz_001", name: "广州火车站地下避难所", type: "shelter", position: [113.2644, 23.1291], address: "广州市越秀区广州火车站地下", capacity: "6000人", level: "核6级", facilities: "火车站地下三层民防工程", access: "地铁2/5号线广州火车站", description: "华南最大铁路枢纽防护设施" },
            { id: "gz_002", name: "珠江新城地下城", type: "bunker", position: [113.3244, 23.1191], address: "广州市天河区珠江新城CBD地下", capacity: "12000人", level: "核5级", facilities: "CBD核心区地下防护网络", access: "地铁3/5号线珠江新城站", description: "金融中心区深层防护体系" },
            { id: "gz_003", name: "体育西路地下避难所", type: "metro", position: [113.3144, 23.1391], address: "广州市天河区体育西路地铁站", capacity: "5000人", level: "核6级", facilities: "地铁1/3号线换乘深层空间", access: "体育西路地铁站G出口", description: "天河商圈地下民防设施" },
            { id: "gz_004", name: "白云机场地下避难所", type: "bunker", position: [113.3044, 23.3991], address: "广州市白云区白云机场T1/T2地下", capacity: "8000人", level: "核5级", facilities: "机场地下深层防护工程", access: "地铁3号线机场南站/机场北站", description: "航空枢纽核心防护设施" },
            { id: "gz_005", name: "琶洲地下避难所", type: "shelter", position: [113.3644, 23.1091], address: "广州市海珠区琶洲会展中心地下", capacity: "4000人", level: "核6级", facilities: "会展中心地下民防", access: "地铁8号线琶洲站", description: "广交会核心区防护" }
        ],
        targets: [
            { id: "gz_t001", name: "广州自来水厂", type: "water", position: [113.3144, 23.1691], address: "广州市天河区", description: "广州市主要供水厂，供水能力超400万立方米/日" },
            { id: "gz_t002", name: "黄埔发电厂", type: "power", position: [113.4344, 23.0991], address: "广州市黄埔区", description: "广州重要火力发电厂，装机容量200万千瓦" },
            { id: "gz_t003", name: "广州白云国际机场", type: "transport", position: [113.3044, 23.3991], address: "广州市白云区", description: "华南最大航空枢纽，年旅客吞吐量超7000万人次" },
            { id: "gz_t004", name: "广州港南沙港区", type: "transport", position: [113.6044, 22.7491], address: "广州市南沙区", description: "华南最大综合性港口，年吞吐量超6亿吨" },
            { id: "gz_t005", name: "南方电网调度中心", type: "power", position: [113.3244, 23.1191], address: "广州市天河区", description: "南方电网调度中心，管辖五省区电网" },
            { id: "gz_t006", name: "广州南站", type: "transport", position: [113.2744, 22.9991], address: "广州市番禺区", description: "华南最大高铁枢纽，年发送旅客超1.5亿人次" }
        ]
    },
    "shenzhen": {
        name: "深圳",
        center: [114.0579, 22.5431],
        shelters: [
            { id: "sz_001", name: "福田中心区地下城", type: "bunker", position: [114.0579, 22.5431], address: "深圳市福田区市民中心地下", capacity: "10000人", level: "核5级", facilities: "CBD核心区地下防护网络", access: "地铁2/4号线市民中心站", description: "深圳中央商务区核心防护" },
            { id: "sz_002", name: "罗湖口岸地下避难所", type: "shelter", position: [114.1179, 22.5331], address: "深圳市罗湖区罗湖口岸地下", capacity: "5000人", level: "核6级", facilities: "口岸深层防护设施", access: "地铁1号线罗湖站", description: "深港边境重要民防工程" },
            { id: "sz_003", name: "深圳北站地下避难所", type: "metro", position: [114.0279, 22.6031], address: "深圳市龙华区深圳北站地下", capacity: "7000人", level: "核6级", facilities: "高铁枢纽地下防护体系", access: "地铁4/5/6号线深圳北站", description: "华南最大高铁枢纽防护" },
            { id: "sz_004", name: "南山科技园地下人防", type: "shelter", position: [113.9379, 22.5431], address: "深圳市南山区科技园核心区", capacity: "3000人", level: "核6级", facilities: "高科技园区地下民防", access: "地铁1号线深大站", description: "深圳硅谷核心防护设施" },
            { id: "sz_005", name: "宝安机场地下避难所", type: "bunker", position: [113.8179, 22.6431], address: "深圳市宝安区宝安机场T3地下", capacity: "6000人", level: "核5级", facilities: "机场深层防护体系", access: "地铁11号线机场站", description: "深圳航空枢纽民防" }
        ],
        targets: [
            { id: "sz_t001", name: "东湖水厂", type: "water", position: [114.1179, 22.5731], address: "深圳市罗湖区", description: "深圳主要水厂，供水能力超200万立方米/日" },
            { id: "sz_t002", name: "妈湾发电厂", type: "power", position: [113.8979, 22.5031], address: "深圳市南山区", description: "深圳最大火力发电厂，装机容量180万千瓦" },
            { id: "sz_t003", name: "深圳宝安国际机场", type: "transport", position: [113.8179, 22.6431], address: "深圳市宝安区", description: "华南重要航空枢纽，年旅客吞吐量超5000万人次" },
            { id: "sz_t004", name: "盐田港", type: "transport", position: [114.2379, 22.5931], address: "深圳市盐田区", description: "世界最大集装箱港口之一，年吞吐量超1300万标箱" },
            { id: "sz_t005", name: "深圳超算中心", type: "communication", position: [114.0579, 22.5631], address: "深圳市福田区", description: "国家超级计算深圳中心，重要科研基础设施" },
            { id: "sz_t006", name: "大亚湾核电站", type: "power", position: [114.6579, 22.6031], address: "深圳市大鹏新区", description: "中国大陆首座大型商用核电站，装机容量612万千瓦" }
        ]
    },
    "chengdu": {
        name: "成都",
        center: [104.0668, 30.5728],
        shelters: [
            { id: "cd_001", name: "天府广场地下避难所", type: "bunker", position: [104.0668, 30.5728], address: "成都市锦江区天府广场地下", capacity: "8000人", level: "核5级", facilities: "市中心多层地下防护空间", access: "地铁1/2号线天府广场站", description: "成都城市核心防护工程" },
            { id: "cd_002", name: "春熙路地下人防", type: "metro", position: [104.0768, 30.5628], address: "成都市锦江区春熙路地铁站", capacity: "4000人", level: "核6级", facilities: "商业街深层民防设施", access: "地铁2/3号线春熙路站", description: "成都最繁华商圈地下防护" },
            { id: "cd_003", name: "火车南站地下避难所", type: "shelter", position: [104.0668, 30.6128], address: "成都市武侯区火车南站地下", capacity: "5000人", level: "核6级", facilities: "铁路枢纽地下防护", access: "地铁1/7/18号线火车南站", description: "成都南门交通枢纽防护" },
            { id: "cd_004", name: "双流机场地下避难所", type: "bunker", position: [103.9368, 30.5728], address: "成都市双流区双流机场T1/T2地下", capacity: "6000人", level: "核5级", facilities: "机场深层防护体系", access: "地铁10号线双流机场站", description: "航空枢纽民防工程" }
        ],
        targets: [
            { id: "cd_t001", name: "成都自来水六厂", type: "water", position: [103.9668, 30.6028], address: "成都市金牛区", description: "成都主要供水厂，供水能力140万立方米/日" },
            { id: "cd_t002", name: "华能成都电厂", type: "power", position: [104.0968, 30.5428], address: "成都市锦江区", description: "成都重要火力发电厂，装机容量120万千瓦" },
            { id: "cd_t003", name: "成都双流国际机场", type: "transport", position: [103.9368, 30.5728], address: "成都市双流区", description: "西部最大航空枢纽，年旅客吞吐量超5000万人次" },
            { id: "cd_t004", name: "成都东站", type: "transport", position: [104.1368, 30.6328], address: "成都市成华区", description: "西南最大铁路枢纽，年发送旅客超1亿人次" },
            { id: "cd_t005", name: "国网四川电力调度中心", type: "power", position: [104.0668, 30.5928], address: "成都市高新区", description: "四川电网调度中心" }
        ]
    },
    "chongqing": {
        name: "重庆",
        center: [106.5516, 29.5630],
        shelters: [
            { id: "cq_001", name: "解放碑地下城", type: "bunker", position: [106.5516, 29.5630], address: "重庆市渝中区解放碑地下", capacity: "10000人", level: "核5级", facilities: "CBD核心区多层地下防护", access: "地铁1/6号线小什字站", description: "山城最核心地段深层民防" },
            { id: "cq_002", name: "观音桥地下避难所", type: "metro", position: [106.5316, 29.5730], address: "重庆市江北区观音桥地铁站", capacity: "5000人", level: "核6级", facilities: "商圈地下防护空间", access: "地铁3号线观音桥站", description: "重庆最大商圈民防设施" },
            { id: "cq_003", name: "江北机场地下避难所", type: "shelter", position: [106.6316, 29.7130], address: "重庆市渝北区江北机场T2/T3地下", capacity: "7000人", level: "核5级", facilities: "航空枢纽深层防护", access: "地铁3/10号线江北机场站", description: "西部最大机场防护工程" },
            { id: "cq_004", name: "沙坪坝地下城", type: "metro", position: [106.4616, 29.5630], address: "重庆市沙坪坝区三峡广场地下", capacity: "6000人", level: "核6级", facilities: "商圈深层民防", access: "地铁1/9号线沙坪坝站", description: "重庆西部商圈防护" }
        ],
        targets: [
            { id: "cq_t001", name: "重庆水务集团水厂", type: "water", position: [106.5816, 29.5930], address: "重庆市南岸区", description: "重庆主要供水厂，供水能力超200万立方米/日" },
            { id: "cq_t002", name: "重庆发电厂", type: "power", position: [106.5516, 29.5230], address: "重庆市九龙坡区", description: "重庆重要火力发电厂，装机容量100万千瓦" },
            { id: "cq_t003", name: "重庆江北国际机场", type: "transport", position: [106.6316, 29.7130], address: "重庆市渝北区", description: "西部最大航空枢纽，年旅客吞吐量超4500万人次" },
            { id: "cq_t004", name: "重庆港", type: "transport", position: [106.5816, 29.5630], address: "重庆市渝中区", description: "长江上游最大港口，年吞吐量超2亿吨" },
            { id: "cq_t005", name: "重庆北站", type: "transport", position: [106.5516, 29.6030], address: "重庆市渝北区", description: "西南最大高铁枢纽之一" }
        ]
    }
};

// 城市列表数据
const CITIES_LIST = [
    { id: "beijing", name: "北京", count: 7, tier: 1 },
    { id: "shanghai", name: "上海", count: 7, tier: 1 },
    { id: "guangzhou", name: "广州", count: 5, tier: 1 },
    { id: "shenzhen", name: "深圳", count: 5, tier: 1 },
    { id: "chengdu", name: "成都", count: 4, tier: 2 },
    { id: "chongqing", name: "重庆", count: 4, tier: 2 }
];
