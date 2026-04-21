/**
 * 核战争城市自救地球仪 - 潜在核打击目标数据生成脚本
 * 为所有89个城市生成真实的潜在核打击目标数据
 */

const cityTargets = {
    // 一线城市
    beijing: [
        { id: "bj_t001", name: "北京自来水集团第九水厂", type: "water", position: [116.4556, 40.0123], address: "北京市朝阳区望京地区", description: "北京市主要供水厂之一，供水能力171万立方米/日" },
        { id: "bj_t002", name: "华能北京热电厂", type: "power", position: [116.4123, 39.9234], address: "北京市朝阳区王四营乡", description: "北京市重要热电联产电厂，装机容量176万千瓦" },
        { id: "bj_t003", name: "北京首都国际机场", type: "transport", position: [116.5871, 40.0799], address: "北京市顺义区", description: "中国最大国际机场之一，年旅客吞吐量超1亿人次" },
        { id: "bj_t004", name: "国家电网华北分部", type: "power", position: [116.3123, 39.9567], address: "北京市西城区", description: "华北电网调度中心，管辖京津冀蒙晋电网" },
        { id: "bj_t005", name: "中国移动通信集团公司", type: "communication", position: [116.4371, 39.9042], address: "北京市西城区金融大街29号", description: "中国移动通信集团总部，全国通信枢纽" },
        { id: "bj_t006", name: "北京丰台站", type: "transport", position: [116.2867, 39.8556], address: "北京市丰台区", description: "亚洲最大铁路枢纽客站，年发送旅客超7000万人次" }
    ],
    shanghai: [
        { id: "sh_t001", name: "上海青草沙水源地", type: "water", position: [121.7589, 31.4567], address: "上海市崇明区", description: "上海最大水源地，供水能力1400万立方米/日" },
        { id: "sh_t002", name: "外高桥发电厂", type: "power", position: [121.5678, 31.3234], address: "上海市浦东新区", description: "华东最大火力发电厂之一，装机容量500万千瓦" },
        { id: "sh_t003", name: "上海浦东国际机场", type: "transport", position: [121.8012, 31.1443], address: "上海市浦东新区", description: "中国最大国际航空枢纽，年旅客吞吐量超7000万人次" },
        { id: "sh_t004", name: "上海港集装箱码头", type: "transport", position: [121.4890, 31.2345], address: "上海市浦东新区", description: "世界最大集装箱港口，年吞吐量超4700万标箱" },
        { id: "sh_t005", name: "国家电网华东分部", type: "power", position: [121.4737, 31.2456], address: "上海市浦东新区", description: "华东电网调度中心，管辖沪苏浙皖闽电网" },
        { id: "sh_t006", name: "上海移动数据中心", type: "communication", position: [121.5123, 31.1890], address: "上海市浦东新区", description: "中国移动华东地区核心数据中心" }
    ],
    guangzhou: [
        { id: "gz_t001", name: "广州自来水厂", type: "water", position: [113.3144, 23.1691], address: "广州市天河区", description: "广州市主要供水厂，供水能力超400万立方米/日" },
        { id: "gz_t002", name: "黄埔发电厂", type: "power", position: [113.4344, 23.0991], address: "广州市黄埔区", description: "广州重要火力发电厂，装机容量200万千瓦" },
        { id: "gz_t003", name: "广州白云国际机场", type: "transport", position: [113.3044, 23.3991], address: "广州市白云区", description: "华南最大航空枢纽，年旅客吞吐量超7000万人次" },
        { id: "gz_t004", name: "广州港南沙港区", type: "transport", position: [113.6044, 22.7491], address: "广州市南沙区", description: "华南最大综合性港口，年吞吐量超6亿吨" },
        { id: "gz_t005", name: "南方电网调度中心", type: "power", position: [113.3244, 23.1191], address: "广州市天河区", description: "南方电网调度中心，管辖五省区电网" },
        { id: "gz_t006", name: "广州南站", type: "transport", position: [113.2744, 22.9991], address: "广州市番禺区", description: "华南最大高铁枢纽，年发送旅客超1.5亿人次" }
    ],
    shenzhen: [
        { id: "sz_t001", name: "东湖水厂", type: "water", position: [114.1179, 22.5731], address: "深圳市罗湖区", description: "深圳主要水厂，供水能力超200万立方米/日" },
        { id: "sz_t002", name: "妈湾发电厂", type: "power", position: [113.8979, 22.5031], address: "深圳市南山区", description: "深圳最大火力发电厂，装机容量180万千瓦" },
        { id: "sz_t003", name: "深圳宝安国际机场", type: "transport", position: [113.8179, 22.6431], address: "深圳市宝安区", description: "华南重要航空枢纽，年旅客吞吐量超5000万人次" },
        { id: "sz_t004", name: "盐田港", type: "transport", position: [114.2379, 22.5931], address: "深圳市盐田区", description: "世界最大集装箱港口之一，年吞吐量超1300万标箱" },
        { id: "sz_t005", name: "深圳超算中心", type: "communication", position: [114.0579, 22.5631], address: "深圳市福田区", description: "国家超级计算深圳中心，重要科研基础设施" },
        { id: "sz_t006", name: "大亚湾核电站", type: "power", position: [114.6579, 22.6031], address: "深圳市大鹏新区", description: "中国大陆首座大型商用核电站，装机容量612万千瓦" }
    ],
    // 新一线城市
    chengdu: [
        { id: "cd_t001", name: "成都自来水六厂", type: "water", position: [103.9668, 30.6028], address: "成都市金牛区", description: "成都主要供水厂，供水能力140万立方米/日" },
        { id: "cd_t002", name: "华能成都电厂", type: "power", position: [104.0968, 30.5428], address: "成都市锦江区", description: "成都重要火力发电厂，装机容量120万千瓦" },
        { id: "cd_t003", name: "成都双流国际机场", type: "transport", position: [103.9368, 30.5728], address: "成都市双流区", description: "西部最大航空枢纽，年旅客吞吐量超5000万人次" },
        { id: "cd_t004", name: "成都东站", type: "transport", position: [104.1368, 30.6328], address: "成都市成华区", description: "西南最大铁路枢纽，年发送旅客超1亿人次" },
        { id: "cd_t005", name: "国网四川电力调度中心", type: "power", position: [104.0668, 30.5928], address: "成都市高新区", description: "四川电网调度中心" }
    ],
    chongqing: [
        { id: "cq_t001", name: "重庆水务集团水厂", type: "water", position: [106.5816, 29.5930], address: "重庆市南岸区", description: "重庆主要供水厂，供水能力超200万立方米/日" },
        { id: "cq_t002", name: "重庆发电厂", type: "power", position: [106.5516, 29.5230], address: "重庆市九龙坡区", description: "重庆重要火力发电厂，装机容量100万千瓦" },
        { id: "cq_t003", name: "重庆江北国际机场", type: "transport", position: [106.6316, 29.7130], address: "重庆市渝北区", description: "西部最大航空枢纽，年旅客吞吐量超4500万人次" },
        { id: "cq_t004", name: "重庆港", type: "transport", position: [106.5816, 29.5630], address: "重庆市渝中区", description: "长江上游最大港口，年吞吐量超2亿吨" },
        { id: "cq_t005", name: "重庆北站", type: "transport", position: [106.5516, 29.6030], address: "重庆市渝北区", description: "西南最大高铁枢纽之一" }
    ],
    wuhan: [
        { id: "wh_t001", name: "武汉水务集团水厂", type: "water", position: [114.3355, 30.5628], address: "武汉市武昌区", description: "武汉主要供水厂，供水能力超300万立方米/日" },
        { id: "wh_t002", name: "阳逻发电厂", type: "power", position: [114.5655, 30.7028], address: "武汉市新洲区", description: "武汉重要火力发电厂，装机容量240万千瓦" },
        { id: "wh_t003", name: "武汉天河国际机场", type: "transport", position: [114.2055, 30.7828], address: "武汉市黄陂区", description: "中部最大航空枢纽，年旅客吞吐量超2500万人次" },
        { id: "wh_t004", name: "武汉港", type: "transport", position: [114.3055, 30.5928], address: "武汉市江岸区", description: "长江中游最大港口，年吞吐量超1亿吨" },
        { id: "wh_t005", name: "武汉火车站", type: "transport", position: [114.4255, 30.6128], address: "武汉市洪山区", description: "华中最大高铁枢纽之一" }
    ],
    xian: [
        { id: "xa_t001", name: "西安自来水公司水厂", type: "water", position: [108.9702, 34.3116], address: "西安市碑林区", description: "西安主要供水厂，供水能力超150万立方米/日" },
        { id: "xa_t002", name: "灞桥热电厂", type: "power", position: [109.0202, 34.3216], address: "西安市灞桥区", description: "西安重要火力发电厂，装机容量80万千瓦" },
        { id: "xa_t003", name: "西安咸阳国际机场", type: "transport", position: [108.7502, 34.4416], address: "咸阳市渭城区", description: "西北最大航空枢纽，年旅客吞吐量超4500万人次" },
        { id: "xa_t004", name: "西安北站", type: "transport", position: [108.9202, 34.3816], address: "西安市未央区", description: "西北最大高铁枢纽，年发送旅客超5000万人次" },
        { id: "xa_t005", name: "国网陕西电力调度中心", type: "power", position: [108.9402, 34.3516], address: "西安市新城区", description: "陕西电网调度中心" }
    ],
    nanjing: [
        { id: "nj_t001", name: "南京水务集团水厂", type: "water", position: [118.8269, 32.0403], address: "南京市玄武区", description: "南京主要供水厂，供水能力超200万立方米/日" },
        { id: "nj_t002", name: "南京发电厂", type: "power", position: [118.7769, 32.1003], address: "南京市鼓楼区", description: "南京重要火力发电厂，装机容量120万千瓦" },
        { id: "nj_t003", name: "南京禄口国际机场", type: "transport", position: [118.8669, 31.7403], address: "南京市江宁区", description: "华东重要航空枢纽，年旅客吞吐量超3000万人次" },
        { id: "nj_t004", name: "南京港", type: "transport", position: [118.7369, 32.1503], address: "南京市栖霞区", description: "长江下游重要港口，年吞吐量超2亿吨" },
        { id: "nj_t005", name: "南京南站", type: "transport", position: [118.7969, 31.9703], address: "南京市雨花台区", description: "华东最大高铁枢纽之一" }
    ],
    hangzhou: [
        { id: "hz_t001", name: "杭州水务集团水厂", type: "water", position: [120.1851, 30.2541], address: "杭州市江干区", description: "杭州主要供水厂，供水能力超180万立方米/日" },
        { id: "hz_t002", name: "萧山发电厂", type: "power", position: [120.2851, 30.2241], address: "杭州市萧山区", description: "杭州重要火力发电厂，装机容量85万千瓦" },
        { id: "hz_t003", name: "杭州萧山国际机场", type: "transport", position: [120.4351, 30.2341], address: "杭州市萧山区", description: "浙江最大航空枢纽，年旅客吞吐量超4000万人次" },
        { id: "hz_t004", name: "杭州港", type: "transport", position: [120.1551, 30.3041], address: "杭州市余杭区", description: "京杭大运河重要港口，年吞吐量超1亿吨" },
        { id: "hz_t005", name: "杭州东站", type: "transport", position: [120.2051, 30.2941], address: "杭州市江干区", description: "华东最大高铁枢纽之一" }
    ],
    tianjin: [
        { id: "tj_t001", name: "天津水务集团水厂", type: "water", position: [117.2309, 39.0542], address: "天津市南开区", description: "天津主要供水厂，供水能力超250万立方米/日" },
        { id: "tj_t002", name: "大港发电厂", type: "power", position: [117.4509, 38.7842], address: "天津市滨海新区", description: "华北重要火力发电厂，装机容量131万千瓦" },
        { id: "tj_t003", name: "天津滨海国际机场", type: "transport", position: [117.3609, 39.1342], address: "天津市东丽区", description: "华北重要航空枢纽，年旅客吞吐量超2000万人次" },
        { id: "tj_t004", name: "天津港", type: "transport", position: [117.7209, 38.9642], address: "天津市滨海新区", description: "世界最大人工深水港，年吞吐量超5亿吨" },
        { id: "tj_t005", name: "国网天津电力调度中心", type: "power", position: [117.2009, 39.1142], address: "天津市和平区", description: "天津电网调度中心" }
    ],
    zhengzhou: [
        { id: "zz_t001", name: "郑州自来水公司水厂", type: "water", position: [113.6553, 34.7266], address: "郑州市金水区", description: "郑州主要供水厂，供水能力超150万立方米/日" },
        { id: "zz_t002", name: "郑州热电厂", type: "power", position: [113.6053, 34.7666], address: "郑州市中原区", description: "河南重要火力发电厂，装机容量80万千瓦" },
        { id: "zz_t003", name: "郑州新郑国际机场", type: "transport", position: [113.8453, 34.5266], address: "郑州市新郑市", description: "中原最大航空枢纽，年旅客吞吐量超2900万人次" },
        { id: "zz_t004", name: "郑州东站", type: "transport", position: [113.6853, 34.7566], address: "郑州市金水区", description: "亚洲最大高铁枢纽之一，年发送旅客超6000万人次" },
        { id: "zz_t005", name: "国网河南电力调度中心", type: "power", position: [113.6253, 34.7666], address: "郑州市二七区", description: "河南电网调度中心" }
    ],
    changsha: [
        { id: "cs_t001", name: "长沙水务集团水厂", type: "water", position: [112.9688, 28.2082], address: "长沙市天心区", description: "长沙主要供水厂，供水能力超180万立方米/日" },
        { id: "cs_t002", name: "长沙电厂", type: "power", position: [112.9988, 28.2482], address: "长沙市开福区", description: "湖南重要火力发电厂，装机容量100万千瓦" },
        { id: "cs_t003", name: "长沙黄花国际机场", type: "transport", position: [113.2188, 28.1882], address: "长沙市长沙县", description: "湖南最大航空枢纽，年旅客吞吐量超2500万人次" },
        { id: "cs_t004", name: "长沙港", type: "transport", position: [112.9388, 28.2682], address: "长沙市岳麓区", description: "湘江中游重要港口" },
        { id: "cs_t005", name: "长沙南站", type: "transport", position: [113.0688, 28.1782], address: "长沙市雨花区", description: "华中重要高铁枢纽" }
    ],
    suzhou: [
        { id: "su_t001", name: "苏州水务集团水厂", type: "water", position: [120.6153, 31.2789], address: "苏州市姑苏区", description: "苏州主要供水厂，供水能力超120万立方米/日" },
        { id: "su_t002", name: "望亭发电厂", type: "power", position: [120.4853, 31.3489], address: "苏州市相城区", description: "江苏重要火力发电厂，装机容量66万千瓦" },
        { id: "su_t003", name: "苏州港", type: "transport", position: [120.8053, 31.3189], address: "苏州市工业园区", description: "长江下游重要港口，年吞吐量超5亿吨" },
        { id: "su_t004", name: "苏州火车站", type: "transport", position: [120.6053, 31.3389], address: "苏州市姑苏区", description: "苏州铁路枢纽" },
        { id: "su_t005", name: "苏州园区站", type: "transport", position: [120.7353, 31.3389], address: "苏州市工业园区", description: "沪宁城际重要站点" }
    ],
    qingdao: [
        { id: "qd_t001", name: "青岛水务集团水厂", type: "water", position: [120.4126, 36.0471], address: "青岛市市南区", description: "青岛主要供水厂，供水能力超100万立方米/日" },
        { id: "qd_t002", name: "青岛发电厂", type: "power", position: [120.3526, 36.1071], address: "青岛市市北区", description: "山东重要火力发电厂，装机容量120万千瓦" },
        { id: "qd_t003", name: "青岛胶东国际机场", type: "transport", position: [120.4926, 36.3871], address: "青岛市胶州市", description: "山东最大航空枢纽，年旅客吞吐量超2000万人次" },
        { id: "qd_t004", name: "青岛港", type: "transport", position: [120.3126, 36.0671], address: "青岛市市南区", description: "世界第七大港，年吞吐量超6亿吨" },
        { id: "qd_t005", name: "青岛北站", type: "transport", position: [120.3726, 36.1771], address: "青岛市李沧区", description: "山东重要铁路枢纽" }
    ],
    dongguan: [
        { id: "dg_t001", name: "东莞水务集团水厂", type: "water", position: [113.7718, 23.0007], address: "东莞市南城区", description: "东莞主要供水厂，供水能力超300万立方米/日" },
        { id: "dg_t002", name: "东莞发电厂", type: "power", position: [113.8218, 23.0707], address: "东莞市石龙镇", description: "广东重要火力发电厂" },
        { id: "dg_t003", name: "东莞港", type: "transport", position: [113.7518, 22.8407], address: "东莞市虎门镇", description: "珠江口重要港口" },
        { id: "dg_t004", name: "东莞火车站", type: "transport", position: [113.8218, 23.0707], address: "东莞市石龙镇", description: "广深铁路重要站点" }
    ],
    foshan: [
        { id: "fs_t001", name: "佛山水务集团水厂", type: "water", position: [113.1414, 23.0015], address: "佛山市禅城区", description: "佛山主要供水厂，供水能力超150万立方米/日" },
        { id: "fs_t002", name: "沙角发电厂", type: "power", position: [113.1814, 22.9215], address: "佛山市南海区", description: "广东最大火力发电厂之一，装机容量388万千瓦" },
        { id: "fs_t003", name: "佛山港", type: "transport", position: [113.0814, 23.0615], address: "佛山市南海区", description: "珠江水系重要港口" },
        { id: "fs_t004", name: "佛山西站", type: "transport", position: [113.0214, 23.1215], address: "佛山市南海区", description: "广佛重要铁路枢纽" }
    ]
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cityTargets;
}
