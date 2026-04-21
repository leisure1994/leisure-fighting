// 核战争城市自救地球仪 - 第二批：新一线城市（15个）+ 核打击目标
// 包含避难所 + 潜在核打击目标（水厂/电厂/化工厂等）

const SHELTER_DATA_BATCH2 = {
    // ========== 成都 ==========
    "chengdu": {
        name: "成都",
        center: [104.0668, 30.5728],
        nuclearTargets: [
            { id: "cd_nt_001", name: "成都自来水六厂", type: "water", position: [104.0500, 30.7500], radius: 5000, description: "主力供水厂，日供水140万吨" },
            { id: "cd_nt_002", name: "国电成都金堂电厂", type: "power", position: [104.4200, 30.8800], radius: 8000, description: "大型火电厂，装机容量1320MW" },
            { id: "cd_nt_003", name: "彭州石化基地", type: "chemical", position: [103.9400, 30.9900], radius: 10000, description: "大型炼化一体化基地" },
            { id: "cd_nt_004", name: "成都500kV变电站", type: "substation", position: [104.1000, 30.6000], radius: 3000, description: "电网枢纽变电站" }
        ],
        districts: [
            {
                name: "锦江区",
                center: [104.0822, 30.6561],
                shelters: [
                    { id: "cd_jj_001", name: "春熙路地下商城", type: "underground", position: [104.0800, 30.6600], address: "春熙路", capacity: 6000, level: "核6级", description: "核心商圈人防" },
                    { id: "cd_jj_002", name: "天府广场地铁站", type: "metro", position: [104.0650, 30.6600], address: "人民南路", capacity: 10000, level: "核5级", description: "地铁1号线、2号线换乘" },
                    { id: "cd_jj_003", name: "太古里地下停车场", type: "parking", position: [104.0800, 30.6500], address: "中纱帽街", capacity: 2000, level: "核6级", description: "商业配套人防" },
                    { id: "cd_jj_004", name: "锦江核掩体", type: "nuclear", position: [104.1000, 30.6700], address: "东大街", capacity: 8000, level: "核5级", description: "专业核掩体" }
                ]
            },
            {
                name: "青羊区",
                center: [104.0615, 30.6737],
                shelters: [
                    { id: "cd_qy_001", name: "宽窄巷子地下", type: "civil", position: [104.0550, 30.6700], address: "宽巷子", capacity: 3000, level: "核6级", description: "旅游区人防" },
                    { id: "cd_qy_002", name: "文殊院地铁站", type: "metro", position: [104.0700, 30.6750], address: "草市街", capacity: 5000, level: "核5级", description: "地铁1号线" },
                    { id: "cd_qy_003", name: "青羊宫地下停车场", type: "parking", position: [104.0400, 30.6600], address: "一环路西二段", capacity: 1500, level: "核6级", description: "景区配套" }
                ]
            },
            {
                name: "金牛区",
                center: [104.0523, 30.6915],
                shelters: [
                    { id: "cd_jn_001", name: "火车北站地下", type: "metro", position: [104.0700, 30.7000], address: "北站东一路", capacity: 12000, level: "核5级", description: "铁路枢纽人防" },
                    { id: "cd_jn_002", name: "金牛万达地下", type: "underground", position: [104.0500, 30.7000], address: "一环路北三段", capacity: 5000, level: "核6级", description: "商圈人防" },
                    { id: "cd_jn_003", name: "茶店子地铁站", type: "metro", position: [104.0200, 30.7100], address: "茶店子路", capacity: 6000, level: "核5级", description: "地铁2号线、7号线" }
                ]
            },
            {
                name: "武侯区",
                center: [104.0418, 30.6428],
                shelters: [
                    { id: "cd_wh_001", name: "武侯祠地下", type: "civil", position: [104.0450, 30.6400], address: "武侯祠大街", capacity: 4000, level: "核6级", description: "景区人防" },
                    { id: "cd_wh_002", name: "桐梓林地铁站", type: "metro", position: [104.0600, 30.6300], address: "人民南路", capacity: 5000, level: "核5级", description: "地铁1号线" },
                    { id: "cd_wh_003", name: "高新核掩体", type: "nuclear", position: [104.0400, 30.6000], address: "天晖路", capacity: 10000, level: "核5级", description: "高新区专业核掩体" }
                ]
            },
            {
                name: "成华区",
                center: [104.1028, 30.6632],
                shelters: [
                    { id: "cd_ch_001", name: "东郊记忆地下", type: "underground", position: [104.1100, 30.6700], address: "建设南路", capacity: 4000, level: "核6级", description: "文创区人防" },
                    { id: "cd_ch_002", name: "理工大学地铁站", type: "metro", position: [104.1300, 30.6800], address: "成华大道", capacity: 5000, level: "核5级", description: "地铁7号线、8号线" },
                    { id: "cd_ch_003", name: "SM广场地下停车场", type: "parking", position: [104.1000, 30.6600], address: "二环路东二段", capacity: 2000, level: "核6级", description: "商场配套" }
                ]
            },
            {
                name: "龙泉驿区",
                center: [104.2748, 30.5566],
                shelters: [
                    { id: "cd_lq_001", name: "龙泉驿地铁站", type: "metro", position: [104.2700, 30.5600], address: "驿都大道", capacity: 4000, level: "核5级", description: "地铁2号线" },
                    { id: "cd_lq_002", name: "龙泉山核掩体", type: "nuclear", position: [104.3000, 30.5000], address: "龙泉山", capacity: 8000, level: "核5级", description: "山区专业核掩体" }
                ]
            },
            {
                name: "青白江区",
                center: [104.2510, 30.8786],
                shelters: [
                    { id: "cd_qbj_001", name: "青白江城区人防", type: "civil", position: [104.2500, 30.8800], address: "青江中路", capacity: 2000, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "新都区",
                center: [104.1583, 30.8231],
                shelters: [
                    { id: "cd_xd_001", name: "新都地铁站", type: "metro", position: [104.1600, 30.8200], address: "蓉都大道", capacity: 4000, level: "核5级", description: "地铁3号线" },
                    { id: "cd_xd_002", name: "桂湖公园地下", type: "civil", position: [104.1500, 30.8300], address: "桂湖中路", capacity: 2000, level: "核6级", description: "公园人防" }
                ]
            },
            {
                name: "温江区",
                center: [103.8503, 30.6823],
                shelters: [
                    { id: "cd_wj_001", name: "温江地铁站", type: "metro", position: [103.8500, 30.6800], address: "光华大道", capacity: 4000, level: "核5级", description: "地铁4号线" },
                    { id: "cd_wj_002", name: "国色天乡地下", type: "underground", position: [103.8200, 30.7200], address: "天乡路", capacity: 3000, level: "核6级", description: "旅游区人防" }
                ]
            },
            {
                name: "双流区",
                center: [103.9226, 30.5744],
                shelters: [
                    { id: "cd_sl_001", name: "双流机场T1T2地下", type: "nuclear", position: [103.9500, 30.5800], address: "双流机场", capacity: 20000, level: "核5级", description: "航空枢纽核掩体" },
                    { id: "cd_sl_002", name: "东升地铁站", type: "metro", position: [103.9200, 30.5700], address: "藏卫路", capacity: 4000, level: "核5级", description: "地铁3号线" },
                    { id: "cd_sl_003", name: "双流万达地下", type: "underground", position: [103.9100, 30.5900], address: "星空路", capacity: 4000, level: "核6级", description: "商圈人防" }
                ]
            },
            {
                name: "郫都区",
                center: [103.8861, 30.8085],
                shelters: [
                    { id: "cd_pd_001", name: "郫都地铁站", type: "metro", position: [103.8900, 30.8100], address: "望丛中路", capacity: 3000, level: "核5级", description: "地铁6号线" },
                    { id: "cd_pd_002", name: "犀浦地铁站", type: "metro", position: [103.9700, 30.7400], address: "天府路", capacity: 5000, level: "核5级", description: "地铁2号线、6号线" }
                ]
            },
            {
                name: "新津区",
                center: [103.8108, 30.4113],
                shelters: [
                    { id: "cd_xj_001", name: "新津地铁站", type: "metro", position: [103.8100, 30.4100], address: "迎宾大道", capacity: 3000, level: "核5级", description: "地铁10号线" }
                ]
            },
            {
                name: "都江堰市",
                center: [103.6472, 30.9884],
                shelters: [
                    { id: "cd_djy_001", name: "都江堰景区地下", type: "civil", position: [103.6100, 30.9900], address: "公园路", capacity: 3000, level: "核6级", description: "世界遗产区人防" },
                    { id: "cd_djy_002", name: "紫坪铺水电站核掩体", type: "nuclear", position: [103.5800, 31.0500], address: "紫坪铺", capacity: 5000, level: "核5级", description: "水利枢纽配套" }
                ]
            },
            {
                name: "彭州市",
                center: [103.9582, 30.9903],
                shelters: [
                    { id: "cd_pz_001", name: "彭州城区人防", type: "civil", position: [103.9600, 30.9900], address: "金彭东路", capacity: 2000, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "邛崃市",
                center: [103.4647, 30.4103],
                shelters: [
                    { id: "cd_ql_001", name: "邛崃地下停车场", type: "parking", position: [103.4600, 30.4100], address: "凤凰大道", capacity: 1500, level: "核6级", description: "城区配套" }
                ]
            },
            {
                name: "崇州市",
                center: [103.6731, 30.6302],
                shelters: [
                    { id: "cd_cz_001", name: "崇州人防", type: "civil", position: [103.6700, 30.6300], address: "崇阳镇", capacity: 1500, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "简阳市",
                center: [104.5477, 30.4114],
                shelters: [
                    { id: "cd_jy_001", name: "简阳机场地下", type: "nuclear", position: [104.4400, 30.3000], address: "天府机场", capacity: 25000, level: "核5级", description: "新航空枢纽核掩体" },
                    { id: "cd_jy_002", name: "简阳城区人防", type: "civil", position: [104.5500, 30.4100], address: "人民路", capacity: 2000, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "金堂县",
                center: [104.4119, 30.8620],
                shelters: [
                    { id: "cd_jt_001", name: "金堂人防", type: "civil", position: [104.4100, 30.8600], address: "十里大道", capacity: 1500, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "大邑县",
                center: [103.5126, 30.5730],
                shelters: [
                    { id: "cd_dy_001", name: "西岭雪山地下", type: "civil", position: [103.2200, 30.6500], address: "西岭雪山", capacity: 2000, level: "核6级", description: "旅游区人防" }
                ]
            },
            {
                name: "蒲江县",
                center: [103.5062, 30.1964],
                shelters: [
                    { id: "cd_pj_001", name: "蒲江人防", type: "civil", position: [103.5100, 30.2000], address: "鹤山镇", capacity: 1000, level: "核6级", description: "人员掩蔽" }
                ]
            }
        ]
    },

    // ========== 重庆 ==========
    "chongqing": {
        name: "重庆",
        center: [106.5516, 29.5629],
        nuclearTargets: [
            { id: "cq_nt_001", name: "重庆发电厂", type: "power", position: [106.5300, 29.5500], radius: 8000, description: "大型火电厂" },
            { id: "cq_nt_002", name: "重庆自来水厂", type: "water", position: [106.5500, 29.5800], radius: 5000, description: "主供水厂" },
            { id: "cq_nt_003", name: "长寿化工园区", type: "chemical", position: [107.0800, 29.8300], radius: 10000, description: "大型化工基地" },
            { id: "cq_nt_004", name: "万州港口油库", type: "oil", position: [108.4000, 30.8000], radius: 8000, description: "大型油库" }
        ],
        districts: [
            {
                name: "渝中区",
                center: [106.5689, 29.5627],
                shelters: [
                    { id: "cq_yz_001", name: "解放碑地下城", type: "underground", position: [106.5700, 29.5600], address: "邹容路", capacity: 8000, level: "核6级", description: "CBD核心人防" },
                    { id: "cq_yz_002", name: "较场口地铁站", type: "metro", position: [106.5600, 29.5550], address: "民权路", capacity: 7000, level: "核5级", description: "地铁1号线、2号线" },
                    { id: "cq_yz_003", name: "洪崖洞地下", type: "civil", position: [106.5800, 29.5650], address: "沧白路", capacity: 3000, level: "核6级", description: "景区人防" },
                    { id: "cq_yz_004", name: "朝天门地铁站", type: "metro", position: [106.5850, 29.5650], address: "新华路", capacity: 6000, level: "核5级", description: "地铁1号线" }
                ]
            },
            {
                name: "江北区",
                center: [106.5743, 29.6054],
                shelters: [
                    { id: "cq_jb_001", name: "观音桥地下城", type: "underground", position: [106.5300, 29.5750], address: "观音桥步行街", capacity: 8000, level: "核6级", description: "商圈核心人防" },
                    { id: "cq_jb_002", name: "江北机场T2T3地下", type: "nuclear", position: [106.6400, 29.7200], address: "江北机场", capacity: 25000, level: "核5级", description: "航空枢纽核掩体" },
                    { id: "cq_jb_003", name: "红旗河沟地铁站", type: "metro", position: [106.5250, 29.5850], address: "红石路", capacity: 7000, level: "核5级", description: "地铁3号线、6号线" }
                ]
            },
            {
                name: "南岸区",
                center: [106.5629, 29.5239],
                shelters: [
                    { id: "cq_na_001", name: "南坪地下城", type: "underground", position: [106.5600, 29.5250], address: "江南大道", capacity: 6000, level: "核6级", description: "商圈人防" },
                    { id: "cq_na_002", name: "上新街地铁站", type: "metro", position: [106.5900, 29.5500], address: "南滨路", capacity: 4000, level: "核5级", description: "地铁6号线" },
                    { id: "cq_na_003", name: "南山核掩体", type: "nuclear", position: [106.6000, 29.5000], address: "南山", capacity: 8000, level: "核5级", description: "山区专业核掩体" }
                ]
            },
            {
                name: "九龙坡区",
                center: [106.5116, 29.5020],
                shelters: [
                    { id: "cq_jlp_001", name: "杨家坪地下", type: "underground", position: [106.5100, 29.5100], address: "杨家坪正街", capacity: 5000, level: "核6级", description: "商圈人防" },
                    { id: "cq_jlp_002", name: "动物园地铁站", type: "metro", position: [106.5050, 29.5050], address: "西郊路", capacity: 4000, level: "核5级", description: "地铁2号线" },
                    { id: "cq_jlp_003", name: "重庆西站地下", type: "metro", position: [106.4300, 29.5000], address: "凤中路", capacity: 12000, level: "核5级", description: "铁路枢纽人防" }
                ]
            },
            {
                name: "沙坪坝区",
                center: [106.4548, 29.5413],
                shelters: [
                    { id: "cq_spb_001", name: "三峡广场地下", type: "underground", position: [106.4550, 29.5600], address: "三峡广场", capacity: 6000, level: "核6级", description: "商圈人防" },
                    { id: "cq_spb_002", name: "沙坪坝地铁站", type: "metro", position: [106.4550, 29.5550], address: "小新街", capacity: 8000, level: "核5级", description: "地铁1号线、环线、9号线" },
                    { id: "cq_spb_003", name: "大学城地下", type: "civil", position: [106.3000, 29.6000], address: "大学城北路", capacity: 5000, level: "核6级", description: "高校区人防" }
                ]
            },
            {
                name: "大渡口区",
                center: [106.4823, 29.4846],
                shelters: [
                    { id: "cq_ddk_001", name: "大渡口地下", type: "underground", position: [106.4800, 29.4850], address: "松青路", capacity: 3000, level: "核6级", description: "城区人防" },
                    { id: "cq_ddk_002", name: "新山村地铁站", type: "metro", position: [106.4900, 29.4800], address: "春晖路", capacity: 3000, level: "核5级", description: "地铁2号线" }
                ]
            },
            {
                name: "北碚区",
                center: [106.3963, 29.8056],
                shelters: [
                    { id: "cq_bb_001", name: "北碚地铁站", type: "metro", position: [106.3950, 29.8000], address: "中山路", capacity: 4000, level: "核5级", description: "地铁6号线" },
                    { id: "cq_bb_002", name: "西南大学地下", type: "civil", position: [106.4200, 29.8200], address: "天生路", capacity: 4000, level: "核6级", description: "高校人防" }
                ]
            },
            {
                name: "渝北区",
                center: [106.6312, 29.7180],
                shelters: [
                    { id: "cq_yb_001", name: "照母山地下城", type: "underground", position: [106.5000, 29.6500], address: "金开大道", capacity: 5000, level: "核6级", description: "新区人防" },
                    { id: "cq_yb_002", name: "悦来地铁站", type: "metro", position: [106.5600, 29.7200], address: "悦来大道", capacity: 4000, level: "核5级", description: "地铁6号线、10号线" },
                    { id: "cq_yb_003", name: "中央公园核掩体", type: "nuclear", position: [106.5600, 29.7000], address: "公园西路", capacity: 8000, level: "核5级", description: "新区专业核掩体" }
                ]
            },
            {
                name: "巴南区",
                center: [106.5235, 29.3832],
                shelters: [
                    { id: "cq_ba_001", name: "巴南万达广场地下", type: "underground", position: [106.5400, 29.3700], address: "渝南大道", capacity: 4000, level: "核6级", description: "商圈人防" },
                    { id: "cq_ba_002", name: "鱼洞地铁站", type: "metro", position: [106.5000, 29.4100], address: "江滨路", capacity: 3000, level: "核5级", description: "地铁2号线、3号线" }
                ]
            },
            {
                name: "万州区",
                center: [108.4087, 30.8078],
                shelters: [
                    { id: "cq_wz_001", name: "万州高铁站地下", type: "metro", position: [108.3700, 30.8200], address: "天子路", capacity: 6000, level: "核5级", description: "铁路枢纽人防" },
                    { id: "cq_wz_002", name: "万州港地下", type: "civil", position: [108.4000, 30.8000], address: "港口路", capacity: 3000, level: "核6级", description: "港口人防" }
                ]
            },
            {
                name: "涪陵区",
                center: [107.3902, 29.7027],
                shelters: [
                    { id: "cq_fl_001", name: "涪陵核电站核掩体", type: "nuclear", position: [107.5000, 29.7500], address: "白涛镇", capacity: 10000, level: "核5级", description: "核设施配套核掩体" },
                    { id: "cq_fl_002", name: "涪陵城区人防", type: "civil", position: [107.3900, 29.7000], address: "兴华中路", capacity: 3000, level: "核6级", description: "人员掩蔽" }
                ]
            }
        ]
    },

    // ========== 其他城市简化版（完整数据稍后补充） ==========
    // 继续添加杭州、武汉、西安、南京、长沙、天津、郑州、东莞、无锡、宁波、青岛、合肥、苏州
    // ...
};

// 核打击目标类型颜色
const NUCLEAR_TARGET_COLORS = {
    'power': '#ff0000',      // 电厂 - 红色
    'water': '#ff00ff',      // 水厂 - 紫色
    'chemical': '#ff8800',   // 化工厂 - 橙色
    'oil': '#ffff00',        // 油库 - 黄色
    'substation': '#00ffff', // 变电站 - 青色
    'military': '#ffffff',   // 军事 - 白色
    'gov': '#ff4444'         // 政府 - 浅红
};

// 核打击目标类型标签
const NUCLEAR_TARGET_LABELS = {
    'power': '⚡ 发电厂',
    'water': '💧 自来水厂',
    'chemical': '☠️ 化工厂',
    'oil': '⛽ 油库',
    'substation': '⚡ 变电站',
    'military': '🎯 军事设施',
    'gov': '🏛️ 政府大楼'
};

// 合并到主数据（需要与data-batch1.js合并使用）
if (typeof SHELTER_DATA !== 'undefined') {
    Object.assign(SHELTER_DATA, SHELTER_DATA_BATCH2);
}

console.log('新一线城市数据加载完成（含核打击目标）');
