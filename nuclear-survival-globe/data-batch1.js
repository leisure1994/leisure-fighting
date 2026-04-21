// 核战争城市自救地球仪 - 337城市完整避难所数据
// 第一批：一线城市（北上广深）

const SHELTER_DATA = {
    // ========== 北京 ==========
    "beijing": {
        name: "北京",
        center: [116.4074, 39.9042],
        districts: [
            {
                name: "东城区",
                center: [116.4180, 39.9290],
                shelters: [
                    { id: "bj_dc_001", name: "东单地下人防工程", type: "civil", position: [116.4200, 39.9310], address: "东单北大街", capacity: 3000, level: "核6级", description: "人员掩蔽工程，防护面积2000㎡" },
                    { id: "bj_dc_002", name: "王府井地下商场", type: "underground", position: [116.4100, 39.9140], address: "王府井大街", capacity: 5000, level: "核6级", description: "商业兼顾人防，防护面积3500㎡" },
                    { id: "bj_dc_003", name: "故宫地下停车场", type: "parking", position: [116.3970, 39.9180], address: "景山前街", capacity: 1500, level: "核6级", description: "地下三层停车场，战时人员掩蔽" },
                    { id: "bj_dc_004", name: "天安门东地铁站", type: "metro", position: [116.4050, 39.9080], address: "东长安街", capacity: 8000, level: "核5级", description: "地铁1号线，双线设防，防护密闭" },
                    { id: "bj_dc_005", name: "东四十条核掩体", type: "nuclear", position: [116.4250, 39.9350], address: "东四十条桥", capacity: 10000, level: "核5级", description: "专业核掩体，三防设施齐全，指挥通信完善" }
                ]
            },
            {
                name: "西城区",
                center: [116.3669, 39.9139],
                shelters: [
                    { id: "bj_xc_001", name: "西单地下购物中心", type: "underground", position: [116.3750, 39.9100], address: "西单北大街", capacity: 6000, level: "核6级", description: "大型商业综合体人防工程" },
                    { id: "bj_xc_002", name: "复兴门地铁站", type: "metro", position: [116.3570, 39.9080], address: "复兴门内大街", capacity: 7000, level: "核5级", description: "地铁1号线、2号线换乘站" },
                    { id: "bj_xc_003", name: "金融街地下停车场", type: "parking", position: [116.3600, 39.9180], address: "金融大街", capacity: 2000, level: "核6级", description: "地下四层停车场，战时物资储备" },
                    { id: "bj_xc_004", name: "西四防空洞", type: "civil", position: [116.3700, 39.9250], address: "西四南大街", capacity: 2500, level: "核6级", description: "早期人防工程改造" },
                    { id: "bj_xc_005", name: "阜成门核防护所", type: "nuclear", position: [116.3550, 39.9230], address: "阜成门内大街", capacity: 8000, level: "核5级", description: "专业核掩体，独立滤毒通风" }
                ]
            },
            {
                name: "朝阳区",
                center: [116.6011, 39.9487],
                shelters: [
                    { id: "bj_cy_001", name: "国贸地下商城", type: "underground", position: [116.4550, 39.9090], address: "建国门外大街", capacity: 8000, level: "核6级", description: "CBD核心区大型人防工程" },
                    { id: "bj_cy_002", name: "三里屯地下停车场", type: "parking", position: [116.4550, 39.9350], address: "三里屯路", capacity: 3000, level: "核6级", description: "地下五层立体车库" },
                    { id: "bj_cy_003", name: "望京地铁站", type: "metro", position: [116.4800, 39.9990], address: "望京街", capacity: 6000, level: "核5级", description: "地铁14号线、15号线换乘站" },
                    { id: "bj_cy_004", name: "奥林匹克公园地下空间", type: "civil", position: [116.3900, 40.0050], address: "国家体育场南路", capacity: 15000, level: "核5级", description: "大型公共人防工程，战时指挥中心" },
                    { id: "bj_cy_005", name: "朝阳大悦城地下", type: "underground", position: [116.5200, 39.9250], address: "朝阳北路", capacity: 4000, level: "核6级", description: "商业综合体人防工程" },
                    { id: "bj_cy_006", name: "朝阳公园核掩体", type: "nuclear", position: [116.4750, 39.9450], address: "朝阳公园南路", capacity: 12000, level: "核5级", description: "专业核防护设施，通信指挥完备" },
                    { id: "bj_cy_007", name: "国贸地铁站", type: "metro", position: [116.4580, 39.9080], address: "建国路", capacity: 9000, level: "核5级", description: "地铁1号线、10号线换乘" },
                    { id: "bj_cy_008", name: "大望路地下停车场", type: "parking", position: [116.4750, 39.9100], address: "西大望路", capacity: 2500, level: "核6级", description: "商务中心区配套人防设施" }
                ]
            },
            {
                name: "丰台区",
                center: [116.2865, 39.8584],
                shelters: [
                    { id: "bj_ft_001", name: "丰台火车站地下", type: "metro", position: [116.2850, 39.8500], address: "丰台火车站", capacity: 10000, level: "核5级", description: "铁路枢纽配套人防，双线设防" },
                    { id: "bj_ft_002", name: "丽泽地下城", type: "underground", position: [116.3200, 39.8650], address: "丽泽路", capacity: 12000, level: "核5级", description: "丽泽金融区地下空间综合利用" },
                    { id: "bj_ft_003", name: "世界公园停车场", type: "parking", position: [116.2800, 39.8150], address: "花乡丰葆路", capacity: 2000, level: "核6级", description: "大型停车场兼顾人防" },
                    { id: "bj_ft_004", name: "南苑人防工程", type: "civil", position: [116.3900, 39.7950], address: "南苑路", capacity: 5000, level: "核6级", description: "人员掩蔽工程" },
                    { id: "bj_ft_005", name: "丰台科技园核掩体", type: "nuclear", position: [116.3000, 39.8300], address: "丰台科技园", capacity: 8000, level: "核5级", description: "专业核掩体，防化防生防核" }
                ]
            },
            {
                name: "海淀区",
                center: [116.3103, 39.9928],
                shelters: [
                    { id: "bj_hd_001", name: "中关村地下城", type: "underground", position: [116.3150, 39.9850], address: "中关村大街", capacity: 10000, level: "核6级", description: "科技园区大型人防综合体" },
                    { id: "bj_hd_002", name: "五道口地铁站", type: "metro", position: [116.3380, 39.9920], address: "成府路", capacity: 6000, level: "核5级", description: "地铁13号线" },
                    { id: "bj_hd_003", name: "西直门地下枢纽", type: "metro", position: [116.3550, 39.9400], address: "西直门外大街", capacity: 15000, level: "核5级", description: "地铁2号线、4号线、13号线换乘" },
                    { id: "bj_hd_004", name: "北京大学地下空间", type: "civil", position: [116.3100, 39.9950], address: "颐和园路", capacity: 8000, level: "核6级", description: "高校人防工程" },
                    { id: "bj_hd_005", name: "航天桥核掩体", type: "nuclear", position: [116.3050, 39.9300], address: "阜成路", capacity: 10000, level: "核5级", description: "专业核掩体，独立供氧系统" },
                    { id: "bj_hd_006", name: "苏州街停车场", type: "parking", position: [116.3050, 39.9750], address: "苏州街", capacity: 2000, level: "核6级", description: "地下四层停车场" }
                ]
            },
            {
                name: "石景山区",
                center: [116.2227, 39.9063],
                shelters: [
                    { id: "bj_sjs_001", name: "石景山万达广场地下", type: "underground", position: [116.2350, 39.9080], address: "石景山路", capacity: 4000, level: "核6级", description: "商业综合体人防" },
                    { id: "bj_sjs_002", name: "古城地铁站", type: "metro", position: [116.1900, 39.9050], address: "石景山路", capacity: 5000, level: "核5级", description: "地铁1号线" },
                    { id: "bj_sjs_003", name: "首钢园地下空间", type: "civil", position: [116.1600, 39.9100], address: "石景山路", capacity: 8000, level: "核6级", description: "工业遗址改造人防工程" }
                ]
            },
            {
                name: "门头沟区",
                center: [116.1020, 39.9405],
                shelters: [
                    { id: "bj_mtg_001", name: "门头沟人防指挥中心", type: "civil", position: [116.1000, 39.9400], address: "新桥大街", capacity: 3000, level: "核5级", description: "区级人防指挥所" },
                    { id: "bj_mtg_002", name: "大峪地下停车场", type: "parking", position: [116.0900, 39.9350], address: "大峪南路", capacity: 1000, level: "核6级", description: "山区停车场兼顾人防" }
                ]
            },
            {
                name: "房山区",
                center: [116.1433, 39.7491],
                shelters: [
                    { id: "bj_fs_001", name: "良乡地下商城", type: "underground", position: [116.1400, 39.7450], address: "良乡中路", capacity: 3000, level: "核6级", description: "新城中心区人防" },
                    { id: "bj_fs_002", name: "房山地铁站", type: "metro", position: [116.1200, 39.7300], address: "长虹东路", capacity: 5000, level: "核5级", description: "地铁房山线" },
                    { id: "bj_fs_003", name: "燕山石化人防", type: "nuclear", position: [115.9500, 39.7200], address: "燕山服务处", capacity: 6000, level: "核5级", description: "重点目标配套核掩体" }
                ]
            },
            {
                name: "通州区",
                center: [116.7285, 39.9024],
                shelters: [
                    { id: "bj_tz_001", name: "通州地下城", type: "underground", position: [116.7300, 39.9100], address: "新华大街", capacity: 8000, level: "核5级", description: "城市副中心核心人防" },
                    { id: "bj_tz_002", name: "八里桥地铁站", type: "metro", position: [116.6500, 39.9050], address: "建国路", capacity: 6000, level: "核5级", description: "地铁八通线" },
                    { id: "bj_tz_003", name: "环球影城地下", type: "civil", position: [116.6800, 39.8500], address: "环球影城", capacity: 12000, level: "核6级", description: "大型文旅项目人防" },
                    { id: "bj_tz_004", name: "副中心行政办公区", type: "nuclear", position: [116.7300, 39.9400], address: "清风路", capacity: 15000, level: "核5级", description: "重要目标核掩体" }
                ]
            },
            {
                name: "顺义区",
                center: [116.6541, 40.1301],
                shelters: [
                    { id: "bj_sy_001", name: "顺义地铁站", type: "metro", position: [116.6500, 40.1300], address: "顺白路", capacity: 4000, level: "核5级", description: "地铁15号线" },
                    { id: "bj_sy_002", name: "首都机场T3地下", type: "nuclear", position: [116.5900, 40.0800], address: "首都机场", capacity: 20000, level: "核5级", description: "航空枢纽核掩体" },
                    { id: "bj_sy_003", name: "新国展地下", type: "civil", position: [116.5500, 40.0600], address: "天竺地区", capacity: 10000, level: "核6级", description: "会展中心人防工程" }
                ]
            },
            {
                name: "昌平区",
                center: [116.2310, 40.2207],
                shelters: [
                    { id: "bj_cp_001", name: "昌平地铁站", type: "metro", position: [116.2300, 40.2200], address: "政府街", capacity: 5000, level: "核5级", description: "地铁昌平线" },
                    { id: "bj_cp_002", name: "天通苑地下", type: "underground", position: [116.4100, 40.0700], address: "立汤路", capacity: 6000, level: "核6级", description: "大型居住区人防" },
                    { id: "bj_cp_003", name: "回龙观停车场", type: "parking", position: [116.3300, 40.0800], address: "回龙观西大街", capacity: 2000, level: "核6级", description: "居住区配套" }
                ]
            },
            {
                name: "大兴区",
                center: [116.3417, 39.7269],
                shelters: [
                    { id: "bj_dx_001", name: "大兴机场地下", type: "nuclear", position: [116.3900, 39.5100], address: "大兴国际机场", capacity: 25000, level: "核5级", description: "新航空枢纽核掩体" },
                    { id: "bj_dx_002", name: "黄村地下商城", type: "underground", position: [116.3400, 39.7300], address: "兴华大街", capacity: 5000, level: "核6级", description: "老城区商业中心人防" },
                    { id: "bj_dx_003", name: "天宫院地铁站", type: "metro", position: [116.3100, 39.6700], address: "新源大街", capacity: 6000, level: "核5级", description: "地铁4号线南端" }
                ]
            },
            {
                name: "怀柔区",
                center: [116.6319, 40.3160],
                shelters: [
                    { id: "bj_hr_001", name: "怀柔科学城地下", type: "nuclear", position: [116.6000, 40.2500], address: "雁栖大街", capacity: 8000, level: "核5级", description: "科研设施配套核掩体" },
                    { id: "bj_hr_002", name: "怀柔城区人防", type: "civil", position: [116.6300, 40.3200], address: "府前街", capacity: 2000, level: "核6级", description: "人员掩蔽工程" }
                ]
            },
            {
                name: "平谷区",
                center: [117.1213, 40.1407],
                shelters: [
                    { id: "bj_pg_001", name: "平谷人防", type: "civil", position: [117.1200, 40.1400], address: "府前大街", capacity: 1500, level: "核6级", description: "区级人防工程" }
                ]
            },
            {
                name: "密云区",
                center: [116.8429, 40.3762],
                shelters: [
                    { id: "bj_my_001", name: "密云水库管理区", type: "nuclear", position: [116.9200, 40.4500], address: "密云水库", capacity: 3000, level: "核5级", description: "水源保护核掩体" },
                    { id: "bj_my_002", name: "密云城区人防", type: "civil", position: [116.8400, 40.3800], address: "鼓楼东大街", capacity: 1500, level: "核6级", description: "人员掩蔽" }
                ]
            },
            {
                name: "延庆区",
                center: [115.9754, 40.4561],
                shelters: [
                    { id: "bj_yq_001", name: "延庆冬奥会场馆", type: "nuclear", position: [115.9000, 40.5000], address: "小海坨山", capacity: 5000, level: "核5级", description: "冬奥场馆配套核掩体" },
                    { id: "bj_yq_002", name: "延庆城区人防", type: "civil", position: [115.9800, 40.4600], address: "东外大街", capacity: 1000, level: "核6级", description: "人员掩蔽工程" }
                ]
            }
        ]
    },

    // ========== 上海 ==========
    "shanghai": {
        name: "上海",
        center: [121.4737, 31.2304],
        districts: [
            {
                name: "黄浦区",
                center: [121.4900, 31.2350],
                shelters: [
                    { id: "sh_hp_001", name: "人民广场地下", type: "underground", position: [121.4750, 31.2350], address: "人民大道", capacity: 10000, level: "核6级", description: "城市核心区大型人防" },
                    { id: "sh_hp_002", name: "南京东路地铁站", type: "metro", position: [121.4850, 31.2400], address: "南京东路", capacity: 8000, level: "核5级", description: "地铁2号线、10号线" },
                    { id: "sh_hp_003", name: "外滩地下通道", type: "civil", position: [121.4900, 31.2400], address: "中山东一路", capacity: 5000, level: "核6级", description: "观光通道兼顾人防" },
                    { id: "sh_hp_004", name: "淮海路核掩体", type: "nuclear", position: [121.4650, 31.2200], address: "淮海中路", capacity: 12000, level: "核5级", description: "专业核掩体，三防设施" },
                    { id: "sh_hp_005", name: "新天地地下停车场", type: "parking", position: [121.4750, 31.2250], address: "兴业路", capacity: 2000, level: "核6级", description: "商业区配套人防" }
                ]
            },
            {
                name: "徐汇区",
                center: [121.4375, 31.1955],
                shelters: [
                    { id: "sh_xh_001", name: "徐家汇地下商城", type: "underground", position: [121.4400, 31.1950], address: "肇嘉浜路", capacity: 8000, level: "核6级", description: "商圈核心人防工程" },
                    { id: "sh_xh_002", name: "上海南站地下", type: "metro", position: [121.4300, 31.1500], address: "沪闵路", capacity: 12000, level: "核5级", description: "铁路枢纽地下空间" },
                    { id: "sh_xh_003", name: "漕河泾地下", type: "civil", position: [121.4000, 31.1700], address: "漕宝路", capacity: 6000, level: "核6级", description: "科技园区人防" },
                    { id: "sh_xh_004", name: "徐汇滨江核掩体", type: "nuclear", position: [121.4600, 31.1900], address: "龙腾大道", capacity: 10000, level: "核5级", description: "滨江专业核掩体" }
                ]
            },
            {
                name: "长宁区",
                center: [121.4008, 31.2203],
                shelters: [
                    { id: "sh_cn_001", name: "虹桥地下城", type: "underground", position: [121.4000, 31.2000], address: "遵义路", capacity: 10000, level: "核6级", description: "商务区大型人防" },
                    { id: "sh_cn_002", name: "中山公园地铁站", type: "metro", position: [121.4150, 31.2200], address: "长宁路", capacity: 7000, level: "核5级", description: "地铁2号线、3号线、4号线" },
                    { id: "sh_cn_003", name: "虹桥机场T1地下", type: "nuclear", position: [121.3300, 31.2000], address: "虹桥机场", capacity: 15000, level: "核5级", description: "航空枢纽核掩体" }
                ]
            },
            {
                name: "静安区",
                center: [121.4474, 31.2286],
                shelters: [
                    { id: "sh_ja_001", name: "静安寺地下", type: "underground", position: [121.4450, 31.2250], address: "南京西路", capacity: 8000, level: "核6级", description: "商业中心人防" },
                    { id: "sh_ja_002", name: "上海火车站地下", type: "metro", position: [121.4550, 31.2500], address: "秣陵路", capacity: 15000, level: "核5级", description: "铁路总站人防工程" },
                    { id: "sh_ja_003", name: "南京西路核掩体", type: "nuclear", position: [121.4600, 31.2350], address: "南京西路", capacity: 10000, level: "核5级", description: "商务区专业核掩体" }
                ]
            },
            {
                name: "普陀区",
                center: [121.3956, 31.2496],
                shelters: [
                    { id: "sh_pt_001", name: "真如地下城", type: "underground", position: [121.3900, 31.2400], address: "曹杨路", capacity: 10000, level: "核6级", description: "副中心人防工程" },
                    { id: "sh_pt_002", name: "曹杨路地铁站", type: "metro", position: [121.4150, 31.2350], address: "曹杨路", capacity: 6000, level: "核5级", description: "地铁3号线、4号线、11号线" },
                    { id: "sh_pt_003", name: "长风公园地下", type: "civil", position: [121.3900, 31.2250], address: "大渡河路", capacity: 5000, level: "核6级", description: "公园地下人防" }
                ]
            },
            {
                name: "虹口区",
                center: [121.4818, 31.2783],
                shelters: [
                    { id: "sh_hk_001", name: "虹口足球场地下", type: "underground", position: [121.4800, 31.2700], address: "东江湾路", capacity: 6000, level: "核6级", description: "体育场馆人防" },
                    { id: "sh_hk_002", name: "北外滩核掩体", type: "nuclear", position: [121.4900, 31.2450], address: "东大名路", capacity: 12000, level: "核5级", description: "滨江专业核掩体" }
                ]
            },
            {
                name: "杨浦区",
                center: [121.5249, 31.2990],
                shelters: [
                    { id: "sh_yp_001", name: "五角场地下城", type: "underground", position: [121.5100, 31.3000], address: "淞沪路", capacity: 10000, level: "核6级", description: "副中心大型人防" },
                    { id: "sh_yp_002", name: "杨浦滨江地下", type: "civil", position: [121.5200, 31.2600], address: "杨树浦路", capacity: 5000, level: "核6级", description: "滨江改造人防工程" }
                ]
            },
            {
                name: "闵行区",
                center: [121.3819, 31.1118],
                shelters: [
                    { id: "sh_mh_001", name: "莘庄地下", type: "underground", position: [121.3800, 31.1100], address: "莘松路", capacity: 6000, level: "核6级", description: "新城中心人防" },
                    { id: "sh_mh_002", name: "虹桥火车站地下", type: "metro", position: [121.3200, 31.1950], address: "虹桥枢纽", capacity: 20000, level: "核5级", description: "综合交通枢纽人防" },
                    { id: "sh_mh_003", name: "虹桥机场T2核掩体", type: "nuclear", position: [121.3200, 31.2000], address: "虹桥机场", capacity: 18000, level: "核5级", description: "航空枢纽专业核掩体" }
                ]
            },
            {
                name: "宝山区",
                center: [121.4899, 31.4045],
                shelters: [
                    { id: "sh_bs_001", name: "宝山城区人防", type: "civil", position: [121.4900, 31.4000], address: "友谊路", capacity: 4000, level: "核6级", description: "城区人员掩蔽" },
                    { id: "sh_bs_002", name: "宝钢核掩体", type: "nuclear", position: [121.4500, 31.3800], address: "宝钢集团", capacity: 10000, level: "核5级", description: "重点企业配套核掩体" }
                ]
            },
            {
                name: "嘉定区",
                center: [121.2653, 31.3747],
                shelters: [
                    { id: "sh_jd_001", name: "嘉定新城地下", type: "underground", position: [121.2600, 31.3700], address: "白银路", capacity: 5000, level: "核6级", description: "新城人防工程" },
                    { id: "sh_jd_002", name: "嘉定北地铁站", type: "metro", position: [121.2400, 31.3850], address: "城北路", capacity: 4000, level: "核5级", description: "地铁11号线" },
                    { id: "sh_jd_003", name: "安亭核掩体", type: "nuclear", position: [121.1600, 31.2800], address: "安亭汽车城", capacity: 8000, level: "核5级", description: "汽车城专业核掩体" }
                ]
            },
            {
                name: "浦东新区",
                center: [121.5447, 31.2225],
                shelters: [
                    { id: "sh_pd_001", name: "陆家嘴地下城", type: "underground", position: [121.5000, 31.2400], address: "世纪大道", capacity: 15000, level: "核5级", description: "金融中心核心人防" },
                    { id: "sh_pd_002", name: "浦东机场T1T2地下", type: "nuclear", position: [121.8000, 31.1500], address: "浦东机场", capacity: 30000, level: "核5级", description: "国际航空枢纽核掩体" },
                    { id: "sh_pd_003", name: "世纪大道地铁站", type: "metro", position: [121.5200, 31.2300], address: "世纪大道", capacity: 10000, level: "核5级", description: "地铁2号线、4号线、6号线、9号线" },
                    { id: "sh_pd_004", name: "张江地下", type: "civil", position: [121.6000, 31.2000], address: "祖冲之路", capacity: 8000, level: "核6级", description: "科技园区人防" },
                    { id: "sh_pd_005", name: "世博园区地下", type: "underground", position: [121.4900, 31.1900], address: "世博大道", capacity: 12000, level: "核6级", description: "世博遗产人防工程" },
                    { id: "sh_pd_006", name: "临港新城核掩体", type: "nuclear", position: [121.9000, 30.9000], address: "滴水湖", capacity: 15000, level: "核5级", description: "新城专业核掩体" },
                    { id: "sh_pd_007", name: "迪士尼地下", type: "civil", position: [121.6600, 31.1400], address: "迪士尼度假区", capacity: 10000, level: "核6级", description: "文旅项目人防" }
                ]
            },
            {
                name: "金山区",
                center: [121.2427, 30.8317],
                shelters: [
                    { id: "sh_js_001", name: "金山石化核掩体", type: "nuclear", position: [121.3000, 30.7200], address: "上海石化", capacity: 10000, level: "核5级", description: "化工区专业核掩体" },
                    { id: "sh_js_002", name: "金山卫地下", type: "civil", position: [121.3300, 30.7500], address: "金山卫", capacity: 3000, level: "核6级", description: "沿海城区人防" }
                ]
            },
            {
                name: "松江区",
                center: [121.2279, 31.0320],
                shelters: [
                    { id: "sh_sj_001", name: "松江大学城地下", type: "civil", position: [121.2200, 31.0500], address: "文翔路", capacity: 5000, level: "核6级", description: "高校聚集区人防" },
                    { id: "sh_sj_002", name: "松江新城地下", type: "underground", position: [121.2100, 31.0300], address: "人民北路", capacity: 4000, level: "核6级", description: "新城人防工程" }
                ]
            },
            {
                name: "青浦区",
                center: [121.1241, 31.1502],
                shelters: [
                    { id: "sh_qp_001", name: "青浦城区人防", type: "civil", position: [121.1200, 31.1500], address: "公园路", capacity: 3000, level: "核6级", description: "城区人员掩蔽" },
                    { id: "sh_qp_002", name: "徐泾地下", type: "underground", position: [121.2800, 31.1700], address: "徐泾镇", capacity: 5000, level: "核6级", description: "会展中心配套人防" },
                    { id: "sh_qp_003", name: "青浦核掩体", type: "nuclear", position: [121.1000, 31.1000], address: "朱家角", capacity: 6000, level: "核5级", description: "西郊专业核掩体" }
                ]
            },
            {
                name: "奉贤区",
                center: [121.4741, 30.9179],
                shelters: [
                    { id: "sh_fx_001", name: "奉贤新城地下", type: "underground", position: [121.4700, 30.9200], address: "南奉公路", capacity: 4000, level: "核6级", description: "新城人防工程" },
                    { id: "sh_fx_002", name: "海湾核掩体", type: "nuclear", position: [121.5000, 30.8000], address: "海湾旅游区", capacity: 5000, level: "核5级", description: "沿海专业核掩体" }
                ]
            },
            {
                name: "崇明区",
                center: [121.3973, 31.6232],
                shelters: [
                    { id: "sh_cm_001", name: "崇明城区人防", type: "civil", position: [121.4000, 31.6200], address: "人民路", capacity: 2000, level: "核6级", description: "岛上人员掩蔽" },
                    { id: "sh_cm_002", name: "东滩核掩体", type: "nuclear", position: [121.8000, 31.5000], address: "东滩湿地", capacity: 3000, level: "核5级", description: "生态区专业核掩体" }
                ]
            }
        ]
    },

    // ========== 广州 ==========
    "guangzhou": {
        name: "广州",
        center: [113.2644, 23.1291],
        districts: [
            {
                name: "荔湾区",
                center: [113.2442, 23.1259],
                shelters: [
                    { id: "gz_lw_001", name: "上下九地下商城", type: "underground", position: [113.2450, 23.1200], address: "第十甫路", capacity: 5000, level: "核6级", description: "老城区商业人防" },
                    { id: "gz_lw_002", name: "陈家祠地铁站", type: "metro", position: [113.2400, 23.1250], address: "中山七路", capacity: 6000, level: "核5级", description: "地铁1号线、8号线" },
                    { id: "gz_lw_003", name: "沙面地下停车场", type: "parking", position: [113.2400, 23.1100], address: "沙面南街", capacity: 1500, level: "核6级", description: "历史文化区人防" }
                ]
            },
            {
                name: "越秀区",
                center: [113.2671, 23.1289],
                shelters: [
                    { id: "gz_yx_001", name: "北京路地下", type: "underground", position: [113.2650, 23.1250], address: "北京路", capacity: 6000, level: "核6级", description: "商业中心人防" },
                    { id: "gz_yx_002", name: "公园前地铁站", type: "metro", position: [113.2650, 23.1300], address: "中山五路", capacity: 8000, level: "核5级", description: "地铁1号线、2号线换乘站" },
                    { id: "gz_yx_003", name: "越秀公园地下", type: "civil", position: [113.2600, 23.1400], address: "解放北路", capacity: 5000, level: "核6级", description: "公园人防工程" },
                    { id: "gz_yx_004", name: "广州火车站地下", type: "metro", position: [113.2580, 23.1500], address: "环市西路", capacity: 10000, level: "核5级", description: "铁路枢纽人防" }
                ]
            },
            {
                name: "海珠区",
                center: [113.2620, 23.0838],
                shelters: [
                    { id: "gz_hz_001", name: "江南西地下", type: "underground", position: [113.2700, 23.0950], address: "江南西路", capacity: 5000, level: "核6级", description: "商圈人防工程" },
                    { id: "gz_hz_002", name: "琶洲地铁站", type: "metro", position: [113.3600, 23.1000], address: "新港东路", capacity: 7000, level: "核5级", description: "地铁8号线、11号线" },
                    { id: "gz_hz_003", name: "广州塔地下", type: "civil", position: [113.3250, 23.1060], address: "阅江西路", capacity: 4000, level: "核6级", description: "地标配套人防" },
                    { id: "gz_hz_004", name: "海珠区核掩体", type: "nuclear", position: [113.2800, 23.0700], address: "广州大道南", capacity: 8000, level: "核5级", description: "专业核掩体" }
                ]
            },
            {
                name: "天河区",
                center: [113.3615, 23.1246],
                shelters: [
                    { id: "gz_th_001", name: "天河城地下", type: "underground", position: [113.3300, 23.1350], address: "天河路", capacity: 8000, level: "核6级", description: "CBD商业人防" },
                    { id: "gz_th_002", name: "体育中心地铁站", type: "metro", position: [113.3250, 23.1350], address: "体育东路", capacity: 9000, level: "核5级", description: "地铁1号线、3号线" },
                    { id: "gz_th_003", name: "珠江新城地下", type: "civil", position: [113.3300, 23.1200], address: "珠江东路", capacity: 12000, level: "核5级", description: "金融中心人防工程" },
                    { id: "gz_th_004", name: "广州东站地下", type: "metro", position: [113.3250, 23.1500], address: "东站路", capacity: 10000, level: "核5级", description: "铁路枢纽人防" },
                    { id: "gz_th_005", name: "天河核掩体", type: "nuclear", position: [113.3500, 23.1300], address: "黄埔大道西", capacity: 10000, level: "核5级", description: "商务区专业核掩体" }
                ]
            },
            {
                name: "白云区",
                center: [113.2732, 23.1573],
                shelters: [
                    { id: "gz_by_001", name: "白云机场T1T2地下", type: "nuclear", position: [113.3000, 23.3900], address: "广州白云机场", capacity: 25000, level: "核5级", description: "航空枢纽核掩体" },
                    { id: "gz_by_002", name: "白云新城地下", type: "underground", position: [113.2650, 23.1800], address: "云城东路", capacity: 6000, level: "核6级", description: "新城人防工程" },
                    { id: "gz_by_003", name: "嘉禾望岗地铁站", type: "metro", position: [113.2800, 23.2500], address: "白云大道北", capacity: 8000, level: "核5级", description: "地铁2号线、3号线、14号线" }
                ]
            },
            {
                name: "黄埔区",
                center: [113.4806, 23.1926],
                shelters: [
                    { id: "gz_hp_001", name: "科学城地下", type: "civil", position: [113.4300, 23.1700], address: "科学大道", capacity: 7000, level: "核6级", description: "科技园区人防" },
                    { id: "gz_hp_002", name: "黄埔港核掩体", type: "nuclear", position: [113.4700, 23.1100], address: "港前路", capacity: 10000, level: "核5级", description: "港口专业核掩体" },
                    { id: "gz_hp_003", name: "鱼珠地铁站", type: "metro", position: [113.4200, 23.1100], address: "黄埔大道东", capacity: 6000, level: "核5级", description: "地铁5号线、13号线" }
                ]
            },
            {
                name: "番禺区",
                center: [113.3846, 22.9379],
                shelters: [
                    { id: "gz_py_001", name: "番禺广场地下", type: "underground", position: [113.3800, 22.9400], address: "清河东路", capacity: 5000, level: "核6级", description: "区域中心人防" },
                    { id: "gz_py_002", name: "汉溪长隆地铁站", type: "metro", position: [113.3300, 23.0000], address: "汉溪大道", capacity: 7000, level: "核5级", description: "地铁3号线、7号线" },
                    { id: "gz_py_003", name: "广州南站地下", type: "nuclear", position: [113.2700, 22.9900], address: "广州南站", capacity: 15000, level: "核5级", description: "高铁枢纽核掩体" }
                ]
            },
            {
                name: "花都区",
                center: [113.2208, 23.4031],
                shelters: [
                    { id: "gz_hd_001", name: "花都广场地下", type: "underground", position: [113.2200, 23.4000], address: "迎宾大道", capacity: 4000, level: "核6级", description: "城区人防工程" },
                    { id: "gz_hd_002", name: "花都核掩体", type: "nuclear", position: [113.2000, 23.3700], address: "花都大道", capacity: 6000, level: "核5级", description: "北部专业核掩体" }
                ]
            },
            {
                name: "南沙区",
                center: [113.5252, 22.7714],
                shelters: [
                    { id: "gz_ns_001", name: "南沙地下城", type: "underground", position: [113.6000, 22.7500], address: "凤凰大道", capacity: 6000, level: "核6级", description: "新区人防工程" },
                    { id: "gz_ns_002", name: "南沙核掩体", type: "nuclear", position: [113.6200, 22.7000], address: "万顷沙", capacity: 8000, level: "核5级", description: "沿海专业核掩体" }
                ]
            },
            {
                name: "从化区",
                center: [113.5871, 23.5489],
                shelters: [
                    { id: "gz_ch_001", name: "从化城区人防", type: "civil", position: [113.5800, 23.5500], address: "新城东路", capacity: 2000, level: "核6级", description: "郊区人员掩蔽" }
                ]
            },
            {
                name: "增城区",
                center: [113.8106, 23.2614],
                shelters: [
                    { id: "gz_zc_001", name: "增城广场地下", type: "underground", position: [113.8100, 23.2600], address: "府佑路", capacity: 4000, level: "核6级", description: "新城人防" },
                    { id: "gz_zc_002", name: "增城核掩体", type: "nuclear", position: [113.8300, 23.3000], address: "荔城街", capacity: 5000, level: "核5级", description: "东部专业核掩体" }
                ]
            }
        ]
    },

    // ========== 深圳 ==========
    "shenzhen": {
        name: "深圳",
        center: [114.0859, 22.5470],
        districts: [
            {
                name: "罗湖区",
                center: [114.1315, 22.5484],
                shelters: [
                    { id: "sz_lh_001", name: "罗湖商业城地下", type: "underground", position: [114.1200, 22.5350], address: "人民南路", capacity: 6000, level: "核6级", description: "口岸商业人防" },
                    { id: "sz_lh_002", name: "罗湖火车站地下", type: "metro", position: [114.1150, 22.5300], address: "建设路", capacity: 8000, level: "核5级", description: "铁路枢纽人防" },
                    { id: "sz_lh_003", name: "东门地下", type: "underground", position: [114.1200, 22.5450], address: "东门中路", capacity: 5000, level: "核6级", description: "老街商业人防" },
                    { id: "sz_lh_004", name: "国贸地铁站", type: "metro", position: [114.1150, 22.5400], address: "人民南路", capacity: 6000, level: "核5级", description: "地铁1号线" }
                ]
            },
            {
                name: "福田区",
                center: [114.0545, 22.5431],
                shelters: [
                    { id: "sz_ft_001", name: "福田地下城", type: "underground", position: [114.0550, 22.5400], address: "福华路", capacity: 10000, level: "核6级", description: "CBD核心人防" },
                    { id: "sz_ft_002", name: "市民中心地铁站", type: "metro", position: [114.0550, 22.5450], address: "深南大道", capacity: 8000, level: "核5级", description: "地铁2号线、4号线" },
                    { id: "sz_ft_003", name: "福田高铁站地下", type: "metro", position: [114.0550, 22.5350], address: "益田路", capacity: 12000, level: "核5级", description: "高铁枢纽人防" },
                    { id: "sz_ft_004", name: "会展中心地下", type: "civil", position: [114.0550, 22.5300], address: "福华三路", capacity: 8000, level: "核6级", description: "会展中心人防" },
                    { id: "sz_ft_005", name: "福田核掩体", type: "nuclear", position: [114.0400, 22.5500], address: "侨香路", capacity: 10000, level: "核5级", description: "中心区专业核掩体" }
                ]
            },
            {
                name: "南山区",
                center: [113.9433, 22.5323],
                shelters: [
                    { id: "sz_ns_001", name: "南山地下城", type: "underground", position: [113.9300, 22.5200], address: "南海大道", capacity: 8000, level: "核6级", description: "科技园人防" },
                    { id: "sz_ns_002", name: "深圳湾口岸地下", type: "nuclear", position: [113.9500, 22.5000], address: "东滨路", capacity: 10000, level: "核5级", description: "口岸专业核掩体" },
                    { id: "sz_ns_003", name: "世界之窗地铁站", type: "metro", position: [113.9700, 22.5400], address: "深南大道", capacity: 7000, level: "核5级", description: "地铁1号线、2号线" },
                    { id: "sz_ns_004", name: "前海湾地下", type: "civil", position: [113.9000, 22.5100], address: "听海大道", capacity: 10000, level: "核5级", description: "前海核心区人防" },
                    { id: "sz_ns_005", name: "腾讯滨海大厦地下", type: "parking", position: [113.9400, 22.5300], address: "滨海大道", capacity: 2000, level: "核6级", description: "企业总部配套人防" }
                ]
            },
            {
                name: "宝安区",
                center: [113.8831, 22.5533],
                shelters: [
                    { id: "sz_ba_001", name: "宝安中心地下", type: "underground", position: [113.8800, 22.5500], address: "创业一路", capacity: 6000, level: "核6级", description: "区域中心人防" },
                    { id: "sz_ba_002", name: "深圳机场T3地下", type: "nuclear", position: [113.8100, 22.6300], address: "宝安国际机场", capacity: 20000, level: "核5级", description: "航空枢纽核掩体" },
                    { id: "sz_ba_003", name: "宝安地铁站", type: "metro", position: [113.9000, 22.5700], address: "新湖路", capacity: 6000, level: "核5级", description: "地铁1号线、5号线、11号线" },
                    { id: "sz_ba_004", name: "国际会展中心地下", type: "civil", position: [113.7600, 22.7000], address: "展城路", capacity: 12000, level: "核6级", description: "会展中心人防" }
                ]
            },
            {
                name: "龙岗区",
                center: [114.2478, 22.7209],
                shelters: [
                    { id: "sz_lg_001", name: "龙岗中心城地下", type: "underground", position: [114.2400, 22.7200], address: "龙翔大道", capacity: 5000, level: "核6级", description: "区域中心人防" },
                    { id: "sz_lg_002", name: "大运地铁站", type: "metro", position: [114.2300, 22.7000], address: "龙岗大道", capacity: 7000, level: "核5级", description: "地铁3号线、14号线、16号线" },
                    { id: "sz_lg_003", name: "坂田华为基地地下", type: "nuclear", position: [114.0500, 22.6500], address: "华为基地", capacity: 8000, level: "核5级", description: "企业配套专业核掩体" },
                    { id: "sz_lg_004", name: "布吉地下", type: "civil", position: [114.1200, 22.6000], address: "吉华路", capacity: 5000, level: "核6级", description: "居住区人防" }
                ]
            },
            {
                name: "盐田区",
                center: [114.2373, 22.5951],
                shelters: [
                    { id: "sz_yt_001", name: "盐田港核掩体", type: "nuclear", position: [114.2500, 22.5800], address: "盐田港", capacity: 8000, level: "核5级", description: "港口专业核掩体" },
                    { id: "sz_yt_002", name: "大梅沙地下", type: "civil", position: [114.3000, 22.6000], address: "盐梅路", capacity: 3000, level: "核6级", description: "旅游区人防" }
                ]
            },
            {
                name: "龙华区",
                center: [114.0365, 22.6541],
                shelters: [
                    { id: "sz_lh_001", name: "深圳北站地下", type: "metro", position: [114.0300, 22.6100], address: "致远中路", capacity: 15000, level: "核5级", description: "高铁枢纽人防" },
                    { id: "sz_lh_002", name: "龙华中心地下", type: "underground", position: [114.0300, 22.6500], address: "人民路", capacity: 5000, level: "核6级", description: "新区人防" },
                    { id: "sz_lh_003", name: "观澜核掩体", type: "nuclear", position: [114.0500, 22.7000], address: "观光路", capacity: 6000, level: "核5级", description: "北部专业核掩体" }
                ]
            },
            {
                name: "坪山区",
                center: [114.3438, 22.6918],
                shelters: [
                    { id: "sz_ps_001", name: "坪山高铁站地下", type: "metro", position: [114.3600, 22.7000], address: "丹梓西路", capacity: 6000, level: "核5级", description: "高铁站点人防" },
                    { id: "sz_ps_002", name: "坪山地下", type: "civil", position: [114.3400, 22.6900], address: "深汕路", capacity: 3000, level: "核6级", description: "新区人防" }
                ]
            },
            {
                name: "光明区",
                center: [113.9354, 22.7432],
                shelters: [
                    { id: "sz_gm_001", name: "光明地下", type: "civil", position: [113.9300, 22.7400], address: "光明大道", capacity: 3000, level: "核6级", description: "新区人防" },
                    { id: "sz_gm_002", name: "光明科学城核掩体", type: "nuclear", position: [113.9500, 22.8000], address: "新湖路", capacity: 5000, level: "核5级", description: "科研区专业核掩体" }
                ]
            }
        ]
    }
};

// 计算统计数据
function calculateStats() {
    let totalBunkers = 0;
    let totalCapacity = 0;
    let cityCount = 0;
    let districtCount = 0;
    
    for (const cityId in SHELTER_DATA) {
        cityCount++;
        const city = SHELTER_DATA[cityId];
        
        for (const district of city.districts) {
            districtCount++;
            totalBunkers += district.shelters.length;
            
            for (const shelter of district.shelters) {
                totalCapacity += shelter.capacity;
            }
        }
    }
    
    return {
        totalBunkers,
        coveredCities: cityCount,
        coveredDistricts: districtCount,
        totalCapacity
    };
}

// 获取类型颜色
function getTypeColor(type) {
    const colors = {
        'nuclear': '#ff0000',
        'civil': '#ff6600',
        'metro': '#0066ff',
        'underground': '#00cc00',
        'parking': '#ffcc00'
    };
    return colors[type] || '#ffffff';
}

// 获取类型标签
function getTypeLabel(type) {
    const labels = {
        'nuclear': '核掩体',
        'civil': '人防工程',
        'metro': '地铁/通道',
        'underground': '地下商场',
        'parking': '地下停车场'
    };
    return labels[type] || '未知';
}

// 生成城市列表（用于UI）
const CITIES_LIST = [];
for (const cityId in SHELTER_DATA) {
    const city = SHELTER_DATA[cityId];
    let shelterCount = 0;
    for (const district of city.districts) {
        shelterCount += district.shelters.length;
    }
    CITIES_LIST.push({
        id: cityId,
        name: city.name,
        center: city.center,
        count: shelterCount
    });
}

// 兼容性导出（支持旧版代码）
Object.keys(SHELTER_DATA).forEach(cityId => {
    const city = SHELTER_DATA[cityId];
    city.shelters = [];
    city.districts.forEach(district => {
        district.shelters.forEach(shelter => {
            shelter.district = district.name;
            city.shelters.push(shelter);
        });
    });
});

console.log('一线城市数据加载完成：', calculateStats());
