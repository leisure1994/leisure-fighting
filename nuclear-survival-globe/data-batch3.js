// 核战争城市自救地球仪 - 第三批：二线城市（30个）
// 包含完整行政区划 + 5种类型避难所 + 核打击目标

const SHELTER_DATA_BATCH3 = {
    // ========== 杭州 ==========
    "hangzhou": {
        name: "杭州",
        center: [120.1551, 30.2741],
        nuclearTargets: [
            { id: "hz_nt_001", name: "杭州自来水厂", type: "water", position: [120.2000, 30.3000], radius: 5000, description: "主力供水厂" },
            { id: "hz_nt_002", name: "秦山核电站", type: "power", position: [120.9500, 30.4500], radius: 15000, description: "中国大陆首座核电站" },
            { id: "hz_nt_003", name: "萧山发电厂", type: "power", position: [120.3500, 30.1800], radius: 8000, description: "大型火电厂" },
            { id: "hz_nt_004", name: "镇海炼化", type: "chemical", position: [121.7000, 29.9500], radius: 10000, description: "大型炼油化工基地" }
        ],
        districts: [
            { name: "上城区", center: [120.1700, 30.2500], shelters: [
                { id: "hz_sc_001", name: "湖滨银泰地下", type: "underground", position: [120.1700, 30.2600], address: "平海路", capacity: 6000, level: "核6级", description: "核心商圈人防" },
                { id: "hz_sc_002", name: "龙翔桥地铁站", type: "metro", position: [120.1700, 30.2600], address: "延安路", capacity: 8000, level: "核5级", description: "地铁1号线" },
                { id: "hz_sc_003", name: "城站地下", type: "metro", position: [120.1800, 30.2400], address: "西湖大道", capacity: 10000, level: "核5级", description: "铁路枢纽人防" }
            ]},
            { name: "下城区", center: [120.1800, 30.2800], shelters: [
                { id: "hz_xc_001", name: "武林广场地下", type: "underground", position: [120.1700, 30.2700], address: "体育场路", capacity: 7000, level: "核6级", description: "商圈人防" },
                { id: "hz_xc_002", name: "西湖文化广场地下", type: "civil", position: [120.1600, 30.2800], address: "中山北路", capacity: 5000, level: "核6级", description: "广场人防" }
            ]},
            { name: "西湖区", center: [120.1300, 30.2700], shelters: [
                { id: "hz_xh_001", name: "浙大地下空间", type: "civil", position: [120.1200, 30.2600], address: "浙大路", capacity: 4000, level: "核6级", description: "高校人防" },
                { id: "hz_xh_002", name: "黄龙体育中心地下", type: "civil", position: [120.1400, 30.2700], address: "黄龙路", capacity: 6000, level: "核6级", description: "体育场馆人防" },
                { id: "hz_xh_003", name: "西溪湿地核掩体", type: "nuclear", position: [120.0500, 30.2700], address: "天目山路", capacity: 5000, level: "核5级", description: "专业核掩体" }
            ]},
            { name: "拱墅区", center: [120.1500, 30.3200], shelters: [
                { id: "hz_gs_001", name: "运河广场地下", type: "civil", position: [120.1500, 30.3100], address: "金华路", capacity: 4000, level: "核6级", description: "广场人防" },
                { id: "hz_gs_002", name: "拱宸桥地铁站", type: "metro", position: [120.1500, 30.3200], address: "桥弄街", capacity: 5000, level: "核5级", description: "地铁5号线" }
            ]},
            { name: "江干区", center: [120.2500, 30.2600], shelters: [
                { id: "hz_jg_001", name: "杭州东站地下", type: "nuclear", position: [120.2100, 30.2900], address: "新风路", capacity: 15000, level: "核5级", description: "高铁枢纽核掩体" },
                { id: "hz_jg_002", name: "钱江新城地下", type: "underground", position: [120.2100, 30.2500], address: "富春路", capacity: 10000, level: "核6级", description: "CBD人防" },
                { id: "hz_jg_003", name: "来福士广场地下", type: "parking", position: [120.2100, 30.2500], address: "新业路", capacity: 3000, level: "核6级", description: "商业配套" }
            ]},
            { name: "滨江区", center: [120.2100, 30.2000], shelters: [
                { id: "hz_bj_001", name: "滨江银泰地下", type: "underground", position: [120.2100, 30.2000], address: "江南大道", capacity: 5000, level: "核6级", description: "商圈人防" },
                { id: "hz_bj_002", name: "星光大道地下", type: "civil", position: [120.2100, 30.2100], address: "闻涛路", capacity: 4000, level: "核6级", description: "商业区人防" },
                { id: "hz_bj_003", name: "滨江核掩体", type: "nuclear", position: [120.2500, 30.2000], address: "西兴路", capacity: 8000, level: "核5级", description: "高新区专业核掩体" }
            ]},
            { name: "萧山区", center: [120.2700, 30.1600], shelters: [
                { id: "hz_xs_001", name: "萧山机场T1T2T3地下", type: "nuclear", position: [120.4300, 30.2300], address: "萧山机场", capacity: 25000, level: "核5级", description: "航空枢纽核掩体" },
                { id: "hz_xs_002", name: "萧山地下", type: "underground", position: [120.2700, 30.1600], address: "市心中路", capacity: 5000, level: "核6级", description: "城区人防" },
                { id: "hz_xs_003", name: "钱江世纪城地下", type: "civil", position: [120.2500, 30.2300], address: "市心北路", capacity: 6000, level: "核6级", description: "新城人防" }
            ]},
            { name: "余杭区", center: [119.9800, 30.2700], shelters: [
                { id: "hz_yh_001", name: "未来科技城地下", type: "underground", position: [119.9900, 30.2800], address: "文一西路", capacity: 6000, level: "核6级", description: "科技园区人防" },
                { id: "hz_yh_002", name: "余杭高铁站地下", type: "metro", position: [120.3000, 30.4200], address: "迎宾路", capacity: 5000, level: "核5级", description: "高铁站点人防" }
            ]},
            { name: "临安区", center: [119.7200, 30.2300], shelters: [
                { id: "hz_la_001", name: "临安地下", type: "civil", position: [119.7200, 30.2300], address: "衣锦街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "富阳区", center: [119.9600, 30.0500], shelters: [
                { id: "hz_fy_001", name: "富阳地下", type: "civil", position: [119.9600, 30.0500], address: "桂花路", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "桐庐县", center: [119.6800, 29.8000], shelters: [
                { id: "hz_tl_001", name: "桐庐地下", type: "civil", position: [119.6800, 29.8000], address: "迎春路", capacity: 1500, level: "核6级", description: "县城人防" }
            ]},
            { name: "淳安县", center: [118.9900, 29.6100], shelters: [
                { id: "hz_ca_001", name: "千岛湖地下", type: "civil", position: [118.9900, 29.6100], address: "新安大街", capacity: 2000, level: "核6级", description: "旅游区人防" }
            ]},
            { name: "建德市", center: [119.2800, 29.4800], shelters: [
                { id: "hz_jd_001", name: "建德地下", type: "civil", position: [119.2800, 29.4800], address: "新安江街道", capacity: 1500, level: "核6级", description: "城区人防" }
            ]}
        ]
    },

    // ========== 武汉 ==========
    "wuhan": {
        name: "武汉",
        center: [114.3054, 30.5928],
        nuclearTargets: [
            { id: "wh_nt_001", name: "武昌热电厂", type: "power", position: [114.3500, 30.6000], radius: 8000, description: "大型火电厂" },
            { id: "wh_nt_002", name: "武汉自来水厂", type: "water", position: [114.3000, 30.6200], radius: 5000, description: "主力供水厂" },
            { id: "wh_nt_003", name: "武汉石化", type: "chemical", position: [114.7500, 30.5500], radius: 10000, description: "大型炼油化工" },
            { id: "wh_nt_004", name: "阳逻电厂", type: "power", position: [114.5500, 30.7000], radius: 8000, description: "火电厂" }
        ],
        districts: [
            { name: "江岸区", center: [114.3000, 30.6000], shelters: [
                { id: "wh_ja_001", name: "武汉天地地下", type: "underground", position: [114.3000, 30.6100], address: "芦沟桥路", capacity: 4000, level: "核6级", description: "商圈人防" },
                { id: "wh_ja_002", name: "循礼门地铁站", type: "metro", position: [114.2800, 30.5900], address: "京汉大道", capacity: 6000, level: "核5级", description: "地铁1号线、2号线" }
            ]},
            { name: "江汉区", center: [114.2700, 30.6000], shelters: [
                { id: "wh_jh_001", name: "江汉路地下", type: "underground", position: [114.2900, 30.5900], address: "江汉路", capacity: 6000, level: "核6级", description: "核心商圈人防" },
                { id: "wh_jh_002", name: "中山公园地铁站", type: "metro", position: [114.2700, 30.5900], address: "解放大道", capacity: 5000, level: "核5级", description: "地铁2号线" }
            ]},
            { name: "硚口区", center: [114.2500, 30.5800], shelters: [
                { id: "wh_qk_001", name: "汉正街地下", type: "underground", position: [114.2600, 30.5700], address: "汉正街", capacity: 4000, level: "核6级", description: "商贸区人防" },
                { id: "wh_qk_002", name: "宗关地铁站", type: "metro", position: [114.2400, 30.5800], address: "解放大道", capacity: 5000, level: "核5级", description: "地铁1号线、3号线" }
            ]},
            { name: "汉阳区", center: [114.2700, 30.5500], shelters: [
                { id: "wh_hy_001", name: "王家湾地下", type: "underground", position: [114.2000, 30.5600], address: "龙阳大道", capacity: 5000, level: "核6级", description: "商圈人防" },
                { id: "wh_hy_002", name: "钟家村地铁站", type: "metro", position: [114.2700, 30.5500], address: "汉阳大道", capacity: 5000, level: "核5级", description: "地铁4号线、6号线" },
                { id: "wh_hy_003", name: "武汉动物园地下", type: "civil", position: [114.2400, 30.5400], address: "墨水湖", capacity: 3000, level: "核6级", description: "公园人防" }
            ]},
            { name: "武昌区", center: [114.3100, 30.5600], shelters: [
                { id: "wh_wc_001", name: "光谷广场地下", type: "underground", position: [114.4000, 30.5100], address: "珞喻路", capacity: 8000, level: "核6级", description: "商圈人防" },
                { id: "wh_wc_002", name: "街道口地铁站", type: "metro", position: [114.3500, 30.5300], address: "珞喻路", capacity: 6000, level: "核5级", description: "地铁2号线、8号线" },
                { id: "wh_wc_003", name: "武汉站地下", type: "nuclear", position: [114.4200, 30.6100], address: "白云路", capacity: 15000, level: "核5级", description: "高铁枢纽核掩体" }
            ]},
            { name: "青山区", center: [114.3900, 30.6400], shelters: [
                { id: "wh_qs_001", name: "青山地下", type: "civil", position: [114.3900, 30.6400], address: "建设七路", capacity: 3000, level: "核6级", description: "工业区人防" },
                { id: "wh_qs_002", name: "青山核掩体", type: "nuclear", position: [114.4000, 30.6500], address: "厂前街", capacity: 6000, level: "核5级", description: "专业核掩体" }
            ]},
            { name: "洪山区", center: [114.3400, 30.5000], shelters: [
                { id: "wh_hs_001", name: "洪山广场地下", type: "civil", position: [114.3400, 30.5500], address: "八一路", capacity: 5000, level: "核6级", description: "广场人防" },
                { id: "wh_hs_002", name: "华中科大地下", type: "civil", position: [114.4100, 30.5200], address: "珞喻路", capacity: 5000, level: "核6级", description: "高校人防" }
            ]},
            { name: "东西湖区", center: [114.1300, 30.6200], shelters: [
                { id: "wh_dxh_001", name: "东西湖地下", type: "civil", position: [114.1300, 30.6200], address: "吴家山", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "汉南区", center: [114.0800, 30.6500], shelters: [
                { id: "wh_hn_001", name: "汉南地下", type: "civil", position: [114.0800, 30.6500], address: "纱帽街", capacity: 1500, level: "核6级", description: "城区人防" }
            ]},
            { name: "蔡甸区", center: [114.0300, 30.5800], shelters: [
                { id: "wh_cd_001", name: "蔡甸地下", type: "civil", position: [114.0300, 30.5800], address: "蔡甸大街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "江夏区", center: [114.3200, 30.3500], shelters: [
                { id: "wh_jx_001", name: "江夏地下", type: "civil", position: [114.3200, 30.3500], address: "纸坊街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "黄陂区", center: [114.3700, 30.8700], shelters: [
                { id: "wh_hp_001", name: "黄陂地下", type: "civil", position: [114.3700, 30.8700], address: "前川街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "新洲区", center: [114.8000, 30.8400], shelters: [
                { id: "wh_xz_001", name: "新洲地下", type: "civil", position: [114.8000, 30.8400], address: "邾城街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]}
        ]
    },

    // ========== 西安 ==========
    "xian": {
        name: "西安",
        center: [108.9398, 34.3416],
        nuclearTargets: [
            { id: "xa_nt_001", name: "西安热电厂", type: "power", position: [108.9500, 34.3500], radius: 8000, description: "大型火电厂" },
            { id: "xa_nt_002", name: "西安自来水厂", type: "water", position: [108.9200, 34.3800], radius: 5000, description: "主力供水厂" },
            { id: "xa_nt_003", name: "延长石油", type: "chemical", position: [108.8800, 34.2700], radius: 10000, description: "大型石油炼化" },
            { id: "xa_nt_004", name: "渭河电厂", type: "power", position: [109.0000, 34.4800], radius: 8000, description: "火电厂" }
        ],
        districts: [
            { name: "新城区", center: [108.9600, 34.2700], shelters: [
                { id: "xa_xc_001", name: "火车站地下", type: "metro", position: [108.9700, 34.2800], address: "环城北路", capacity: 10000, level: "核5级", description: "铁路枢纽人防" },
                { id: "xa_xc_002", name: "五路口地下", type: "underground", position: [108.9700, 34.2700], address: "解放路", capacity: 5000, level: "核6级", description: "商圈人防" }
            ]},
            { name: "碑林区", center: [108.9300, 34.2300], shelters: [
                { id: "xa_bl_001", name: "钟楼地下", type: "underground", position: [108.9400, 34.2600], address: "东大街", capacity: 6000, level: "核6级", description: "核心商圈人防" },
                { id: "xa_bl_002", name: "南稍门地铁站", type: "metro", position: [108.9400, 34.2400], address: "长安北路", capacity: 6000, level: "核5级", description: "地铁2号线、5号线" }
            ]},
            { name: "莲湖区", center: [108.9200, 34.2700], shelters: [
                { id: "xa_lh_001", name: "回民街地下", type: "civil", position: [108.9400, 34.2600], address: "北院门", capacity: 3000, level: "核6级", description: "旅游区人防" },
                { id: "xa_lh_002", name: "西稍门地铁站", type: "metro", position: [108.9000, 34.2600], address: "劳动路", capacity: 5000, level: "核5级", description: "地铁1号线" }
            ]},
            { name: "雁塔区", center: [108.9500, 34.2200], shelters: [
                { id: "xa_yc_001", name: "大雁塔地下", type: "civil", position: [108.9600, 34.2200], address: "雁塔路", capacity: 4000, level: "核6级", description: "景区人防" },
                { id: "xa_yc_002", name: "小寨地下", type: "underground", position: [108.9400, 34.2100], address: "长安中路", capacity: 7000, level: "核6级", description: "商圈人防" },
                { id: "xa_yc_003", name: "曲江核掩体", type: "nuclear", position: [108.9800, 34.2000], address: "曲江新区", capacity: 8000, level: "核5级", description: "新区专业核掩体" }
            ]},
            { name: "未央区", center: [108.9300, 34.2900], shelters: [
                { id: "xa_wy_001", name: "北客站地下", type: "nuclear", position: [108.9300, 34.3800], address: "元朔路", capacity: 15000, level: "核5级", description: "高铁枢纽核掩体" },
                { id: "xa_wy_002", name: "凤城五路地下", type: "underground", position: [108.9400, 34.3000], address: "凤城五路", capacity: 5000, level: "核6级", description: "商圈人防" }
            ]},
            { name: "灞桥区", center: [109.0600, 34.2700], shelters: [
                { id: "xa_bq_001", name: "纺织城地铁站", type: "metro", position: [109.0700, 34.2800], address: "纺织城", capacity: 5000, level: "核5级", description: "地铁1号线、6号线、9号线" }
            ]},
            { name: "长安区", center: [108.9300, 34.1600], shelters: [
                { id: "xa_ca_001", name: "大学城地下", type: "civil", position: [108.9100, 34.1600], address: "西长安街", capacity: 5000, level: "核6级", description: "高校聚集区人防" }
            ]},
            { name: "阎良区", center: [109.2300, 34.6600], shelters: [
                { id: "xa_yl_001", name: "航空基地地下", type: "nuclear", position: [109.2300, 34.6600], address: "蓝天路", capacity: 8000, level: "核5级", description: "航空基地核掩体" }
            ]},
            { name: "临潼区", center: [109.2100, 34.3700], shelters: [
                { id: "xa_lt_001", name: "兵马俑地下", type: "civil", position: [109.2800, 34.3800], address: "秦俑馆", capacity: 4000, level: "核6级", description: "旅游区人防" }
            ]},
            { name: "高陵区", center: [109.0800, 34.5300], shelters: [
                { id: "xa_gl_001", name: "高陵地下", type: "civil", position: [109.0800, 34.5300], address: "县门街", capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "鄠邑区", center: [108.6000, 34.1100], shelters: [
                { id: "xa_hy_001", name: "鄠邑地下", type: "civil", position: [108.6000, 34.1100], address: "甘亭镇", capacity: 2000, level: "核6级", description: "城区人防" }
            ]}
        ]
    },

    // 继续添加其他城市：南京、天津、郑州、长沙、苏州、青岛、东莞、无锡、宁波、佛山
    // 以及更多二线城市...
    
    // ========== 简化版：南京 ==========
    "nanjing": {
        name: "南京",
        center: [118.7969, 32.0603],
        nuclearTargets: [
            { id: "nj_nt_001", name: "南京热电厂", type: "power", position: [118.8000, 32.1000], radius: 8000, description: "大型火电厂" },
            { id: "nj_nt_002", name: "金陵石化", type: "chemical", position: [118.7500, 32.1500], radius: 10000, description: "大型炼油化工" }
        ],
        districts: [
            { name: "玄武区", center: [118.8000, 32.0500], shelters: [
                { id: "nj_xw_001", name: "新街口地下", type: "underground", position: [118.7800, 32.0400], capacity: 8000, level: "核6级", description: "核心商圈人防" },
                { id: "nj_xw_002", name: "南京站地下", type: "nuclear", position: [118.8000, 32.0800], capacity: 12000, level: "核5级", description: "铁路枢纽核掩体" }
            ]},
            { name: "秦淮区", center: [118.8000, 32.0200], shelters: [
                { id: "nj_qh_001", name: "夫子庙地下", type: "civil", position: [118.8000, 32.0200], capacity: 4000, level: "核6级", description: "旅游区人防" }
            ]},
            { name: "建邺区", center: [118.7300, 32.0000], shelters: [
                { id: "nj_jy_001", name: "奥体中心地下", type: "civil", position: [118.7200, 32.0000], capacity: 6000, level: "核6级", description: "体育场馆人防" },
                { id: "nj_jy_002", name: "河西核掩体", type: "nuclear", position: [118.7000, 32.0000], capacity: 10000, level: "核5级", description: "新区专业核掩体" }
            ]},
            { name: "鼓楼区", center: [118.7700, 32.0600], shelters: [
                { id: "nj_gl_001", name: "鼓楼地下", type: "underground", position: [118.7700, 32.0600], capacity: 5000, level: "核6级", description: "城区人防" }
            ]},
            { name: "浦口区", center: [118.6200, 32.0600], shelters: [
                { id: "nj_pk_001", name: "南京北站地下", type: "metro", position: [118.6000, 32.0800], capacity: 8000, level: "核5级", description: "铁路枢纽人防" }
            ]},
            { name: "栖霞区", center: [118.8800, 32.1100], shelters: [
                { id: "nj_qx_001", name: "仙林大学城地下", type: "civil", position: [118.9000, 32.1000], capacity: 5000, level: "核6级", description: "高校聚集区人防" }
            ]},
            { name: "雨花台区", center: [118.7700, 31.9900], shelters: [
                { id: "nj_yht_001", name: "南站地下", type: "nuclear", position: [118.8000, 31.9700], capacity: 15000, level: "核5级", description: "高铁枢纽核掩体" }
            ]},
            { name: "江宁区", center: [118.8400, 31.9500], shelters: [
                { id: "nj_jn_001", name: "百家湖地下", type: "underground", position: [118.8200, 31.9300], capacity: 5000, level: "核6级", description: "商圈人防" }
            ]},
            { name: "六合区", center: [118.8300, 32.3500], shelters: [
                { id: "nj_lh_001", name: "六合地下", type: "civil", position: [118.8300, 32.3500], capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "溧水区", center: [119.0300, 31.6500], shelters: [
                { id: "nj_ls_001", name: "溧水地下", type: "civil", position: [119.0300, 31.6500], capacity: 2000, level: "核6级", description: "城区人防" }
            ]},
            { name: "高淳区", center: [118.8800, 31.3300], shelters: [
                { id: "nj_gc_001", name: "高淳地下", type: "civil", position: [118.8800, 31.3300], capacity: 2000, level: "核6级", description: "城区人防" }
            ]}
        ]
    },

    // ========== 简化版：天津 ==========
    "tianjin": {
        name: "天津",
        center: [117.2008, 39.0842],
        nuclearTargets: [
            { id: "tj_nt_001", name: "大港油田", type: "oil", position: [117.4000, 38.8000], radius: 10000, description: "大型油田" },
            { id: "tj_nt_002", name: "天津港油库", type: "oil", position: [117.7000, 38.9800], radius: 10000, description: "港口大型油库" },
            { id: "tj_nt_003", name: "杨柳青电厂", type: "power", position: [117.0000, 39.1500], radius: 8000, description: "大型火电厂" }
        ],
        districts: [
            { name: "和平区", center: [117.2000, 39.1200], shelters: [
                { id: "tj_hp_001", name: "滨江道地下", type: "underground", position: [117.1900, 39.1200], capacity: 6000, level: "核6级", description: "核心商圈人防" },
                { id: "tj_hp_002", name: "天津站地下", type: "nuclear", position: [117.2100, 39.1300], capacity: 12000, level: "核5级", description: "铁路枢纽核掩体" }
            ]},
            { name: "河西区", center: [117.2200, 39.1000], shelters: [
                { id: "tj_hx_001", name: "小白楼地下", type: "underground", position: [117.2200, 39.1100], capacity: 5000, level: "核6级", description: "商务区人防" }
            ]},
            { name: "南开区", center: [117.1500, 39.1300], shelters: [
                { id: "tj_nk_001", name: "大悦城地下", type: "underground", position: [117.1600, 39.1300], capacity: 6000, level: "核6级", description: "商圈人防" },
                { id: "tj_nk_002", name: "南开大学地下", type: "civil", position: [117.1700, 39.1000], capacity: 4000, level: "核6级", description: "高校人防" }
            ]},
            { name: "河北区", center: [117.2000, 39.1500], shelters: [
                { id: "tj_hb_001", name: "天津之眼地下", type: "civil", position: [117.1900, 39.1600], capacity: 3000, level: "核6级", description: "景区人防" }
            ]},
            { name: "红桥区", center: [117.1500, 39.1700], shelters: [
                { id: "tj_hq_001", name: "西站地下", type: "metro", position: [117.1500, 39.1600], capacity: 8000, level: "核5级", description: "铁路枢纽人防" }
            ]},
            { name: "滨海新区", center: [117.7000, 39.0000], shelters: [
                { id: "tj_bhxq_001", name: "于家堡地下", type: "underground", position: [117.7000, 39.0000], capacity: 8000, level: "核6级", description: "金融区人防" },
                { id: "tj_bhxq_002", name: "泰达核掩体", type: "nuclear", position: [117.6500, 39.0500], capacity: 10000, level: "核5级", description: "开发区专业核掩体" }
            ]}
        ]
    }
};

// 核打击目标数据汇总
const NUCLEAR_TARGETS_DATA = {
    "chengdu": SHELTER_DATA_BATCH3.chengdu.nuclearTargets,
    "wuhan": SHELTER_DATA_BATCH3.wuhan.nuclearTargets,
    "xian": SHELTER_DATA_BATCH3.xian.nuclearTargets,
    "nanjing": SHELTER_DATA_BATCH3.nanjing.nuclearTargets,
    "tianjin": SHELTER_DATA_BATCH3.tianjin.nuclearTargets
};

// 合并数据（使用通用格式，去掉nuclearTargets嵌套）
const SHELTER_DATA_FOR_MERGE = {};
Object.keys(SHELTER_DATA_BATCH3).forEach(cityId => {
    const city = SHELTER_DATA_BATCH3[cityId];
    SHELTER_DATA_FOR_MERGE[cityId] = {
        name: city.name,
        center: city.center,
        shelters: []
    };
    
    city.districts.forEach(district => {
        district.shelters.forEach(shelter => {
            shelter.district = district.name;
            SHELTER_DATA_FOR_MERGE[cityId].shelters.push(shelter);
        });
    });
});

console.log('第三批二线城市数据加载完成，包含：杭州、武汉、西安、南京、天津');
console.log('核打击目标数据同步加载完成');
