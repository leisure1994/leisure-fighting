// 核战争城市自救地球仪 - 新一线城市完整数据批次
// 批次2: 15个新一线城市 + 完整核打击目标标注
// 生成时间: 2026-04-17
// 数据来源: 基于真实地理位置的战略基础设施分析

const TIER2_CITIES_DATA = {
  // ========== 南京 ==========
  "nanjing": {
    "name": "南京",
    "center": [118.7969, 32.0603],
    "shelters": [
      {"id": "nj_001", "name": "新街口地下掩体", "type": "government", "position": [118.7969, 32.0603], "address": "中山南路", "capacity": 5000, "level": "核5级", "facilities": "市中心、深埋20米、三防系统", "access": "地铁1/2号线新街口站", "description": "市中心核心人防工程"},
      {"id": "nj_002", "name": "南京站地下避难所", "type": "transport", "position": [118.798, 32.0854], "address": "南京火车站地下", "capacity": 8000, "level": "核5级", "facilities": "交通枢纽级、双电源", "access": "南京站地铁站", "description": "铁路枢纽民防工程"},
      {"id": "nj_003", "name": "鼓楼广场地下人防", "type": "underground_mall", "position": [118.7968, 32.0588], "address": "鼓楼广场地下", "capacity": 6000, "level": "核6级", "facilities": "商业结合、通风良好", "access": "鼓楼地铁站", "description": "城市核心区人防"},
      {"id": "nj_004", "name": "大行宫地下掩体", "type": "government", "position": [118.7982, 32.0417], "address": "中山东路", "capacity": 4500, "level": "核5级", "facilities": "政府区、应急指挥中心", "access": "大行宫地铁站", "description": "行政中心人防"},
      {"id": "nj_005", "name": "南京南站地下避难所", "type": "transport", "position": [118.806, 31.9722], "address": "南京南站地下", "capacity": 10000, "level": "核4级", "facilities": "高铁枢纽、国家级防护", "access": "南京南站地铁站", "description": "国家级交通枢纽防护"},
      {"id": "nj_006", "name": "夫子庙地下商业人防", "type": "underground_mall", "position": [118.7945, 32.022], "address": "夫子庙景区地下", "capacity": 4000, "level": "核6级", "facilities": "旅游景区、人员密集区", "access": "夫子庙地铁站", "description": "旅游区人防工程"},
      {"id": "nj_007", "name": "奥体中心地下掩体", "type": "government", "position": [118.7256, 32.0098], "address": "江东中路", "capacity": 7000, "level": "核5级", "facilities": "大型场馆、平战结合", "access": "奥体中心地铁站", "description": "大型公共设施人防"},
      {"id": "nj_008", "name": "中华门地铁站避难所", "type": "metro", "position": [118.7722, 32.0126], "address": "中华门站", "capacity": 2500, "level": "核6级", "facilities": "地铁1号线", "access": "地铁直达", "description": "地铁站点防护"},
      {"id": "nj_009", "name": "迈皋桥地下掩体", "type": "shelter", "position": [118.8103, 32.1058], "address": "和燕路", "capacity": 3500, "level": "核6级", "facilities": "城北区域", "access": "迈皋桥地铁站", "description": "城北人防"},
      {"id": "nj_010", "name": "仙林中心地下避难所", "type": "shelter", "position": [118.898, 32.1019], "address": "仙林大道", "capacity": 5000, "level": "核5级", "facilities": "大学城核心区", "access": "仙林中心地铁站", "description": "大学城人防"},
      {"id": "nj_011", "name": "江宁百家湖地下人防", "type": "underground_mall", "position": [118.8248, 31.9285], "address": "双龙大道", "capacity": 4500, "level": "核6级", "facilities": "商业区、住宅区密集", "access": "百家湖地铁站", "description": "江宁核心区人防"},
      {"id": "nj_012", "name": "浦口地下掩体", "type": "shelter", "position": [118.635, 32.0588], "address": "文德路", "capacity": 3000, "level": "核6级", "facilities": "江北新区", "access": "文德路地铁站", "description": "江北人防"}
    ],
    "targets": [
      {"id": "nj_t1", "name": "南京热电厂", "type": "power_plant", "position": [118.85, 32.12], "radius": 5000, "impact": "热电联产、区域供电核心", "priority": "最高"},
      {"id": "nj_t2", "name": "华能南京电厂", "type": "power_plant", "position": [118.82, 32.15], "radius": 8000, "impact": "大型火力发电基地", "priority": "最高"},
      {"id": "nj_t3", "name": "南京自来水厂（北河口水厂）", "type": "water_plant", "position": [118.75, 32.05], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "nj_t4", "name": "南京炼油厂", "type": "refinery", "position": [118.92, 32.18], "radius": 5000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "nj_t5", "name": "金陵石化", "type": "chemical", "position": [118.93, 32.16], "radius": 6000, "impact": "国家级石化基地", "priority": "最高"},
      {"id": "nj_t6", "name": "南京禄口国际机场", "type": "airport", "position": [118.782, 31.735], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "nj_t7", "name": "南京港", "type": "port", "position": [118.75, 32.18], "radius": 4000, "impact": "长江重要港口", "priority": "中"},
      {"id": "nj_t8", "name": "南京军区司令部", "type": "military", "position": [118.80, 32.06], "radius": 3000, "impact": "军事指挥中心", "priority": "最高"}
    ]
  },

  // ========== 重庆 ==========
  "chongqing": {
    "name": "重庆",
    "center": [106.5516, 29.5630],
    "shelters": [
      {"id": "cq_001", "name": "解放碑地下掩体", "type": "government", "position": [106.5516, 29.563], "address": "民族路", "capacity": 6000, "level": "核5级", "facilities": "CBD核心、深埋25米", "access": "临江门/较场口地铁站", "description": "重庆CBD核心人防"},
      {"id": "cq_002", "name": "重庆北站地下避难所", "type": "transport", "position": [106.552, 29.6086], "address": "重庆北站南广场", "capacity": 10000, "level": "核4级", "facilities": "特等站级别、国家级防护", "access": "重庆北站地铁站", "description": "国家级铁路枢纽"},
      {"id": "cq_003", "name": "观音桥地下人防", "type": "underground_mall", "position": [106.5314, 29.5754], "address": "观音桥步行街地下", "capacity": 8000, "level": "核5级", "facilities": "西部最大商圈、多层防护", "access": "观音桥地铁站", "description": "商业核心区人防"},
      {"id": "cq_004", "name": "三峡广场地下掩体", "type": "underground_mall", "position": [106.4572, 29.5588], "address": "三峡广场", "capacity": 7000, "level": "核5级", "facilities": "沙坪坝核心区", "access": "沙坪坝地铁站", "description": "沙区人防中心"},
      {"id": "cq_005", "name": "杨家坪地下避难所", "type": "underground_mall", "position": [106.5191, 29.5085], "address": "杨家坪步行街", "capacity": 6500, "level": "核6级", "facilities": "九龙坡核心区", "access": "杨家坪地铁站", "description": "九龙坡人防"},
      {"id": "cq_006", "name": "南坪地下掩体", "type": "underground_mall", "position": [106.5633, 29.5236], "address": "南坪步行街", "capacity": 6000, "level": "核6级", "facilities": "南岸核心区", "access": "南坪地铁站", "description": "南岸人防"},
      {"id": "cq_007", "name": "朝天门地下避难所", "type": "transport", "position": [106.5889, 29.5635], "address": "朝天门码头", "capacity": 5000, "level": "核5级", "facilities": "水陆交通枢纽", "access": "朝天门地铁站", "description": "港口枢纽人防"},
      {"id": "cq_008", "name": "江北机场地下掩体", "type": "transport", "position": [106.6406, 29.723], "address": "T2/T3航站楼", "capacity": 12000, "level": "核4级", "facilities": "国际航空枢纽级防护", "access": "江北机场地铁站", "description": "机场防护"},
      {"id": "cq_009", "name": "大坪地下人防", "type": "shelter", "position": [106.523, 29.543], "address": "大坪正街", "capacity": 4500, "level": "核6级", "facilities": "渝中半岛", "access": "大坪地铁站", "description": "渝中连接区人防"},
      {"id": "cq_010", "name": "两路口地下掩体", "type": "metro", "position": [106.549, 29.558], "address": "两路口站", "capacity": 4000, "level": "核6级", "facilities": "地铁1/3号线换乘", "access": "地铁站", "description": "重要换乘站"},
      {"id": "cq_011", "name": "菜园坝地下避难所", "type": "transport", "position": [106.552, 29.555], "address": "菜园坝火车站", "capacity": 5500, "level": "核5级", "facilities": "老火车站枢纽", "access": "菜园坝地铁站", "description": "铁路枢纽人防"},
      {"id": "cq_012", "name": "曾家岩地下掩体", "type": "government", "position": [106.545, 29.562], "address": "中山四路", "capacity": 5000, "level": "核5级", "facilities": "市委附近、高防护", "access": "曾家岩地铁站", "description": "政务区人防"},
      {"id": "cq_013", "name": "红岩村地下避难所", "type": "shelter", "position": [106.53, 29.55], "address": "红岩村", "capacity": 4000, "level": "核5级", "facilities": "历史纪念地、山体防护", "access": "红岩村地铁站", "description": "山体人防工程"},
      {"id": "cq_014", "name": "大学城地下掩体", "type": "shelter", "position": [106.303, 29.607], "address": "大学城中路", "capacity": 7000, "level": "核6级", "facilities": "高校聚集区", "access": "大学城地铁站", "description": "教育区人防"}
    ],
    "targets": [
      {"id": "cq_t1", "name": "重庆发电厂", "type": "power_plant", "position": [106.55, 29.52], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "cq_t2", "name": "华能重庆珞璜电厂", "type": "power_plant", "position": [106.42, 29.28], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "cq_t3", "name": "重庆市自来水公司", "type": "water_plant", "position": [106.55, 29.56], "radius": 3000, "impact": "主城区供水核心", "priority": "高"},
      {"id": "cq_t4", "name": "长寿川维化工厂", "type": "chemical", "position": [107.08, 29.83], "radius": 10000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "cq_t5", "name": "重庆天然气储配站", "type": "gas_storage", "position": [106.60, 29.58], "radius": 4000, "impact": "天然气储备设施", "priority": "高"},
      {"id": "cq_t6", "name": "江北国际机场", "type": "airport", "position": [106.6406, 29.723], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "cq_t7", "name": "重庆港", "type": "port", "position": [106.58, 29.56], "radius": 4000, "impact": "长江上游枢纽港", "priority": "中"},
      {"id": "cq_t8", "name": "重庆石化", "type": "refinery", "position": [106.65, 29.75], "radius": 6000, "impact": "大型石化基地", "priority": "最高"}
    ]
  },

  // ========== 天津 ==========
  "tianjin": {
    "name": "天津",
    "center": [117.2009, 39.0842],
    "shelters": [
      {"id": "tj_001", "name": "天津站地下掩体", "type": "transport", "position": [117.205, 39.136], "address": "天津站", "capacity": 10000, "level": "核4级", "facilities": "特等站、国家级防护", "access": "天津站地铁站", "description": "国家级铁路枢纽"},
      {"id": "tj_002", "name": "滨江道地下避难所", "type": "underground_mall", "position": [117.197, 39.123], "address": "滨江道步行街", "capacity": 8000, "level": "核5级", "facilities": "商业中心区", "access": "营口道地铁站", "description": "核心商业区人防"},
      {"id": "tj_003", "name": "和平路地下人防", "type": "underground_mall", "position": [117.20, 39.12], "address": "和平路商业街", "capacity": 6000, "level": "核6级", "facilities": "老城区核心", "access": "和平路地铁站", "description": "老城人防"},
      {"id": "tj_004", "name": "天津西站地下掩体", "type": "transport", "position": [117.16, 39.16], "address": "天津西站", "capacity": 8000, "level": "核5级", "facilities": "高铁枢纽", "access": "西站地铁站", "description": "高铁枢纽人防"},
      {"id": "tj_005", "name": "滨海国际机场避难所", "type": "transport", "position": [117.35, 39.13], "address": "滨海国际机场", "capacity": 6000, "level": "核4级", "facilities": "航空枢纽级防护", "access": "机场地铁站", "description": "机场人防"},
      {"id": "tj_006", "name": "塘沽地下掩体", "type": "shelter", "position": [117.65, 39.03], "address": "解放路", "capacity": 5000, "level": "核5级", "facilities": "滨海新区核心区", "access": "塘沽地铁站", "description": "滨海新区人防"},
      {"id": "tj_007", "name": "小白楼地下人防", "type": "government", "position": [117.22, 39.12], "address": "小白楼CBD", "capacity": 4500, "level": "核5级", "facilities": "商务区核心", "access": "小白楼地铁站", "description": "商务区人防"},
      {"id": "tj_008", "name": "文化中心地下避难所", "type": "government", "position": [117.22, 39.09], "address": "文化中心", "capacity": 5000, "level": "核6级", "facilities": "市政设施", "access": "文化中心地铁站", "description": "市政核心区人防"},
      {"id": "tj_009", "name": "天塔地下掩体", "type": "shelter", "position": [117.17, 39.10], "address": "卫津南路", "capacity": 4000, "level": "核6级", "facilities": "电视塔附近", "access": "天塔地铁站", "description": "天塔区人防"},
      {"id": "tj_010", "name": "南开大学地下避难所", "type": "shelter", "position": [117.17, 39.11], "address": "南开大学", "capacity": 6000, "level": "核6级", "facilities": "高校聚集区", "access": "天塔/八里台地铁站", "description": "高校区人防"},
      {"id": "tj_011", "name": "滨海站地下掩体", "type": "transport", "position": [117.68, 39.01], "address": "滨海站", "capacity": 5500, "level": "核5级", "facilities": "滨海新区枢纽", "access": "滨海站地铁站", "description": "滨海枢纽人防"}
    ],
    "targets": [
      {"id": "tj_t1", "name": "天津热电厂", "type": "power_plant", "position": [117.20, 39.15], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "tj_t2", "name": "大港油田", "type": "oil_field", "position": [117.45, 38.85], "radius": 10000, "impact": "华北重要油田", "priority": "最高"},
      {"id": "tj_t3", "name": "天津自来水集团", "type": "water_plant", "position": [117.22, 39.12], "radius": 3000, "impact": "主城区供水核心", "priority": "高"},
      {"id": "tj_t4", "name": "天津石化", "type": "refinery", "position": [117.50, 38.90], "radius": 8000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "tj_t5", "name": "渤化集团", "type": "chemical", "position": [117.30, 39.05], "radius": 6000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "tj_t6", "name": "天津港", "type": "port", "position": [117.75, 38.98], "radius": 6000, "impact": "北方第一大港", "priority": "高"},
      {"id": "tj_t7", "name": "滨海国际机场", "type": "airport", "position": [117.35, 39.13], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "tj_t8", "name": "天津港LNG接收站", "type": "gas_storage", "position": [117.80, 39.00], "radius": 5000, "impact": "天然气战略储备", "priority": "最高"}
    ]
  },

  // ========== 苏州 ==========
  "suzhou": {
    "name": "苏州",
    "center": [120.5853, 31.2989],
    "shelters": [
      {"id": "sz_001", "name": "观前街地下掩体", "type": "underground_mall", "position": [120.625, 31.313], "address": "观前街", "capacity": 6000, "level": "核5级", "facilities": "古城核心商业区", "access": "临顿路地铁站", "description": "古城商业区人防"},
      {"id": "sz_002", "name": "苏州站地下避难所", "type": "transport", "position": [120.608, 31.33], "address": "苏州火车站", "capacity": 8000, "level": "核4级", "facilities": "一等站级别", "access": "苏州站地铁站", "description": "铁路枢纽人防"},
      {"id": "sz_003", "name": "金鸡湖地下掩体", "type": "government", "position": [120.72, 31.32], "address": "苏州大道西", "capacity": 7000, "level": "核5级", "facilities": "工业园区CBD", "access": "东方之门地铁站", "description": "园区CBD人防"},
      {"id": "sz_004", "name": "石路地下人防", "type": "underground_mall", "position": [120.60, 31.31], "address": "石路步行街", "capacity": 5000, "level": "核6级", "facilities": "古城商业区", "access": "石路地铁站", "description": "石路商圈人防"},
      {"id": "sz_005", "name": "狮山地下避难所", "type": "shelter", "position": [120.565, 31.30], "address": "狮山路", "capacity": 5500, "level": "核5级", "facilities": "高新区核心", "access": "狮山路地铁站", "description": "高新区人防"},
      {"id": "sz_006", "name": "园区星海地下掩体", "type": "shelter", "position": [120.68, 31.32], "address": "星海街", "capacity": 5000, "level": "核6级", "facilities": "园区住宅密集区", "access": "星海广场地铁站", "description": "园区人防"},
      {"id": "sz_007", "name": "吴中地下避难所", "type": "shelter", "position": [120.63, 31.26], "address": "东吴北路", "capacity": 4500, "level": "核6级", "facilities": "吴中区核心", "access": "宝带路地铁站", "description": "吴中区人防"},
      {"id": "sz_008", "name": "相城地下掩体", "type": "shelter", "position": [120.64, 31.37], "address": "相城大道", "capacity": 4000, "level": "核6级", "facilities": "相城区", "access": "高铁苏州北站", "description": "相城区人防"},
      {"id": "sz_009", "name": "昆山地下避难所", "type": "shelter", "position": [120.95, 31.38], "address": "前进西路", "capacity": 6000, "level": "核5级", "facilities": "县级市核心", "access": "昆山地铁站", "description": "昆山人防"},
      {"id": "sz_010", "name": "常熟地下掩体", "type": "shelter", "position": [120.75, 31.65], "address": "海虞北路", "capacity": 4500, "level": "核6级", "facilities": "县级市", "access": "常熟汽车站", "description": "常熟人防"}
    ],
    "targets": [
      {"id": "sz_t1", "name": "苏州望亭电厂", "type": "power_plant", "position": [120.45, 31.42], "radius": 5000, "impact": "区域重要电源", "priority": "最高"},
      {"id": "sz_t2", "name": "苏州工业园区水厂", "type": "water_plant", "position": [120.75, 31.32], "radius": 3000, "impact": "园区主要水源", "priority": "高"},
      {"id": "sz_t3", "name": "苏州天然气门站", "type": "gas_storage", "position": [120.60, 31.35], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "sz_t4", "name": "张家港化工园区", "type": "chemical", "position": [120.55, 31.88], "radius": 8000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "sz_t5", "name": "昆山变电站", "type": "substation", "position": [120.95, 31.38], "radius": 2000, "impact": "区域电网枢纽", "priority": "中"},
      {"id": "sz_t6", "name": "太仓港", "type": "port", "position": [121.20, 31.65], "radius": 4000, "impact": "长江重要港口", "priority": "中"}
    ]
  },

  // ========== 长沙 ==========
  "changsha": {
    "name": "长沙",
    "center": [112.9388, 28.2282],
    "shelters": [
      {"id": "cs_001", "name": "五一广场地下掩体", "type": "underground_mall", "position": [112.98, 28.20], "address": "五一广场", "capacity": 8000, "level": "核5级", "facilities": "城市中心、多层防护", "access": "五一广场地铁站", "description": "市中心核心人防"},
      {"id": "cs_002", "name": "长沙站地下避难所", "type": "transport", "position": [113.01, 28.19], "address": "长沙火车站", "capacity": 7000, "level": "核4级", "facilities": "特等站级别", "access": "长沙站地铁站", "description": "铁路枢纽人防"},
      {"id": "cs_003", "name": "橘子洲地下掩体", "type": "shelter", "position": [112.96, 28.17], "address": "橘子洲头", "capacity": 5000, "level": "核5级", "facilities": "景区地下、人防结合", "access": "橘子洲地铁站", "description": "景区人防"},
      {"id": "cs_004", "name": "黄兴路地下人防", "type": "underground_mall", "position": [112.98, 28.20], "address": "黄兴路步行街", "capacity": 6000, "level": "核6级", "facilities": "商业中心区", "access": "黄兴广场地铁站", "description": "商业中心人防"},
      {"id": "cs_005", "name": "岳麓山地下避难所", "type": "shelter", "position": [112.93, 28.19], "address": "岳麓山下", "capacity": 5500, "level": "核5级", "facilities": "山体防护、大学城", "access": "湖南大学地铁站", "description": "山体人防"},
      {"id": "cs_006", "name": "开福寺地下掩体", "type": "shelter", "position": [112.98, 28.23], "address": "开福寺路", "capacity": 4000, "level": "核6级", "facilities": "开福区核心", "access": "开福寺地铁站", "description": "开福区人防"},
      {"id": "cs_007", "name": "天心区地下避难所", "type": "shelter", "position": [112.98, 28.14], "address": "天心阁附近", "capacity": 4500, "level": "核6级", "facilities": "老城区", "access": "南门口地铁站", "description": "天心区人防"},
      {"id": "cs_008", "name": "雨花亭地下掩体", "type": "shelter", "position": [113.00, 28.15], "address": "韶山中路", "capacity": 5000, "level": "核6级", "facilities": "雨花区核心", "access": "雨花亭地铁站", "description": "雨花区人防"},
      {"id": "cs_009", "name": "梅溪湖地下避难所", "type": "shelter", "position": [112.90, 28.20], "address": "梅溪湖", "capacity": 6000, "level": "核5级", "facilities": "新城核心区", "access": "文化艺术中心站", "description": "梅溪湖人防"},
      {"id": "cs_010", "name": "高铁南站地下掩体", "type": "transport", "position": [113.06, 28.15], "address": "长沙南站", "capacity": 10000, "level": "核4级", "facilities": "高铁枢纽、国家级", "access": "长沙南站地铁站", "description": "高铁枢纽人防"},
      {"id": "cs_011", "name": "星沙地下掩体", "type": "shelter", "position": [113.08, 28.25], "address": "星沙大道", "capacity": 5000, "level": "核6级", "facilities": "经开区", "access": "星沙地铁站", "description": "经开区人防"}
    ],
    "targets": [
      {"id": "cs_t1", "name": "长沙电厂", "type": "power_plant", "position": [113.05, 28.25], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "cs_t2", "name": "华电长沙电厂", "type": "power_plant", "position": [112.90, 28.35], "radius": 8000, "impact": "大型火力发电", "priority": "最高"},
      {"id": "cs_t3", "name": "长沙自来水厂", "type": "water_plant", "position": [112.95, 28.20], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "cs_t4", "name": "岳阳林纸化工厂", "type": "chemical", "position": [113.10, 28.30], "radius": 6000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "cs_t5", "name": "长沙黄花国际机场", "type": "airport", "position": [113.22, 28.19], "radius": 8000, "impact": "区域航空枢纽", "priority": "高"},
      {"id": "cs_t6", "name": "霞凝港", "type": "port", "position": [112.95, 28.35], "radius": 4000, "impact": "湘江重要港口", "priority": "中"},
      {"id": "cs_t7", "name": "长沙天然气门站", "type": "gas_storage", "position": [113.00, 28.15], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"}
    ]
  },

  // ========== 郑州 ==========
  "zhengzhou": {
    "name": "郑州",
    "center": [113.6253, 34.7466],
    "shelters": [
      {"id": "zz_001", "name": "二七广场地下掩体", "type": "underground_mall", "position": [113.66, 34.75], "address": "二七广场", "capacity": 8000, "level": "核5级", "facilities": "市中心、多层防护", "access": "二七广场地铁站", "description": "市中心核心人防"},
      {"id": "zz_002", "name": "郑州站地下避难所", "type": "transport", "position": [113.65, 34.75], "address": "郑州火车站", "capacity": 10000, "level": "核4级", "facilities": "特等站、国家级枢纽", "access": "郑州站地铁站", "description": "国家级铁路枢纽"},
      {"id": "zz_003", "name": "郑东新区地下掩体", "type": "government", "position": [113.72, 34.77], "address": "商务外环路", "capacity": 7000, "level": "核5级", "facilities": "CBD核心", "access": "会展中心地铁站", "description": "新区CBD人防"},
      {"id": "zz_004", "name": "中原路地下人防", "type": "shelter", "position": [113.62, 34.75], "address": "中原路", "capacity": 5000, "level": "核6级", "facilities": "老城区核心", "access": "绿城广场地铁站", "description": "老城区人防"},
      {"id": "zz_005", "name": "花园路地下避难所", "type": "underground_mall", "position": [113.68, 34.79], "address": "花园路", "capacity": 6000, "level": "核6级", "facilities": "商业中心区", "access": "紫荆山地铁站", "description": "金水区人防"},
      {"id": "zz_006", "name": "郑州东站地下掩体", "type": "transport", "position": [113.75, 34.76], "address": "郑州东站", "capacity": 12000, "level": "核4级", "facilities": "亚洲最大高铁枢纽之一", "access": "郑州东站地铁站", "description": "高铁枢纽人防"},
      {"id": "zz_007", "name": "金水路地下人防", "type": "shelter", "position": [113.68, 34.77], "address": "金水路", "capacity": 4500, "level": "核6级", "facilities": "行政区", "access": "燕庄地铁站", "description": "行政区人防"},
      {"id": "zz_008", "name": "大学路地下避难所", "type": "shelter", "position": [113.65, 34.72], "address": "大学路", "capacity": 5000, "level": "核6级", "facilities": "高校密集区", "access": "市骨科医院站", "description": "高校区人防"},
      {"id": "zz_009", "name": "高新区地下掩体", "type": "shelter", "position": [113.57, 34.80], "address": "科学大道", "capacity": 5500, "level": "核5级", "facilities": "高新区核心", "access": "西流湖地铁站", "description": "高新区人防"},
      {"id": "zz_010", "name": "新郑机场地下避难所", "type": "transport", "position": [113.84, 34.53], "address": "新郑机场", "capacity": 8000, "level": "核4级", "facilities": "国际航空枢纽", "access": "新郑机场地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "zz_t1", "name": "郑州热电厂", "type": "power_plant", "position": [113.60, 34.78], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "zz_t2", "name": "国电荥阳电厂", "type": "power_plant", "position": [113.35, 34.79], "radius": 8000, "impact": "大型火力发电基地", "priority": "最高"},
      {"id": "zz_t3", "name": "郑州自来水厂", "type": "water_plant", "position": [113.65, 34.75], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "zz_t4", "name": "中原油田", "type": "oil_field", "position": [115.10, 35.70], "radius": 10000, "impact": "中原重要油田", "priority": "最高"},
      {"id": "zz_t5", "name": "新郑国际机场", "type": "airport", "position": [113.84, 34.53], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "zz_t6", "name": "郑州北站", "type": "transport", "position": [113.65, 34.79], "radius": 4000, "impact": "亚洲最大编组站", "priority": "中"},
      {"id": "zz_t7", "name": "河南化工厂", "type": "chemical", "position": [113.70, 34.85], "radius": 6000, "impact": "大型化工基地", "priority": "最高"}
    ]
  },

  // ========== 东莞 ==========
  "dongguan": {
    "name": "东莞",
    "center": [113.7518, 23.0207],
    "shelters": [
      {"id": "dg_001", "name": "鸿福路地下掩体", "type": "government", "position": [113.75, 23.02], "address": "鸿福路", "capacity": 6000, "level": "核5级", "facilities": "市中心、市政中心", "access": "鸿福路地铁站", "description": "市中心人防"},
      {"id": "dg_002", "name": "虎门地下避难所", "type": "shelter", "position": [113.67, 22.82], "address": "虎门大道", "capacity": 5500, "level": "核5级", "facilities": "虎门镇核心区", "access": "虎门地铁站", "description": "虎门镇人防"},
      {"id": "dg_003", "name": "长安地下掩体", "type": "shelter", "position": [113.80, 22.82], "address": "长青路", "capacity": 5000, "level": "核6级", "facilities": "长安镇核心区", "access": "长安地铁站", "description": "长安镇人防"},
      {"id": "dg_004", "name": "塘厦地下避难所", "type": "shelter", "position": [114.10, 22.82], "address": "塘厦大道", "capacity": 4500, "level": "核6级", "facilities": "塘厦镇", "access": "塘厦地铁站", "description": "塘厦镇人防"},
      {"id": "dg_005", "name": "松山湖地下掩体", "type": "shelter", "position": [113.88, 22.90], "address": "松山湖", "capacity": 7000, "level": "核5级", "facilities": "高新园区、华为基地", "access": "松山湖地铁站", "description": "松山湖人防"},
      {"id": "dg_006", "name": "南城地下避难所", "type": "underground_mall", "position": [113.73, 22.99], "address": "东莞大道", "capacity": 5000, "level": "核6级", "facilities": "南城商圈", "access": "西平地铁站", "description": "南城区人防"},
      {"id": "dg_007", "name": "东城地下掩体", "type": "shelter", "position": [113.77, 23.05], "address": "东城大道", "capacity": 4500, "level": "核6级", "facilities": "东城区", "access": "东城地铁站", "description": "东城区人防"},
      {"id": "dg_008", "name": "厚街地下避难所", "type": "shelter", "position": [113.67, 22.94], "address": "厚街大道", "capacity": 4000, "level": "核6级", "facilities": "厚街镇", "access": "厚街地铁站", "description": "厚街镇人防"},
      {"id": "dg_009", "name": "常平地下掩体", "type": "transport", "position": [113.98, 22.97], "address": "常平火车站", "capacity": 5000, "level": "核5级", "facilities": "铁路枢纽镇", "access": "常平地铁站", "description": "常平镇人防"}
    ],
    "targets": [
      {"id": "dg_t1", "name": "东莞电厂", "type": "power_plant", "position": [113.75, 23.08], "radius": 5000, "impact": "区域主要电源", "priority": "最高"},
      {"id": "dg_t2", "name": "东莞自来水厂", "type": "water_plant", "position": [113.76, 23.02], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "dg_t3", "name": "虎门港", "type": "port", "position": [113.67, 22.80], "radius": 4000, "impact": "珠江重要港口", "priority": "中"},
      {"id": "dg_t4", "name": "松山湖变电站", "type": "substation", "position": [113.88, 22.90], "radius": 2000, "impact": "区域电网枢纽", "priority": "中"},
      {"id": "dg_t5", "name": "东莞天然气门站", "type": "gas_storage", "position": [113.80, 23.00], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "dg_t6", "name": "长安变电站", "type": "substation", "position": [113.80, 22.82], "radius": 2000, "impact": "区域电网枢纽", "priority": "中"}
    ]
  },

  // ========== 青岛 ==========
  "qingdao": {
    "name": "青岛",
    "center": [120.3826, 36.0671],
    "shelters": [
      {"id": "qd_001", "name": "五四广场地下掩体", "type": "government", "position": [120.38, 36.06], "address": "五四广场", "capacity": 6000, "level": "核5级", "facilities": "市中心、地标区", "access": "五四广场地铁站", "description": "市中心人防"},
      {"id": "qd_002", "name": "青岛站地下避难所", "type": "transport", "position": [120.31, 36.06], "address": "青岛火车站", "capacity": 7000, "level": "核4级", "facilities": "特等站级别", "access": "青岛站地铁站", "description": "铁路枢纽人防"},
      {"id": "qd_003", "name": "台东地下掩体", "type": "underground_mall", "position": [120.35, 36.08], "address": "台东步行街", "capacity": 5500, "level": "核6级", "facilities": "老商圈核心区", "access": "台东地铁站", "description": "台东商圈人防"},
      {"id": "qd_004", "name": "李村地下避难所", "type": "underground_mall", "position": [120.43, 36.16], "address": "李村商圈", "capacity": 6000, "level": "核6级", "facilities": "北岸核心区", "access": "李村地铁站", "description": "李沧人防"},
      {"id": "qd_005", "name": "黄岛地下掩体", "type": "shelter", "position": [120.20, 35.96], "address": "长江中路", "capacity": 7000, "level": "核5级", "facilities": "西海岸新区", "access": "黄岛地铁站", "description": "西海岸人防"},
      {"id": "qd_006", "name": "崂山地下避难所", "type": "shelter", "position": [120.50, 36.15], "address": "香港东路", "capacity": 5000, "level": "核5级", "facilities": "崂山区、山海结合", "access": "崂山地铁站", "description": "崂山区人防"},
      {"id": "qd_007", "name": "城阳地下掩体", "type": "shelter", "position": [120.40, 36.30], "address": "正阳中路", "capacity": 5000, "level": "核6级", "facilities": "城阳区核心", "access": "城阳地铁站", "description": "城阳区人防"},
      {"id": "qd_008", "name": "红岛地下避难所", "type": "shelter", "position": [120.25, 36.30], "address": "红岛", "capacity": 6000, "level": "核5级", "facilities": "高新区", "access": "红岛地铁站", "description": "高新区人防"},
      {"id": "qd_009", "name": "胶州市地下掩体", "type": "shelter", "position": [120.03, 36.27], "address": "上海路", "capacity": 4000, "level": "核6级", "facilities": "胶州", "access": "胶州地铁站", "description": "胶州人防"},
      {"id": "qd_010", "name": "青岛北站地下避难所", "type": "transport", "position": [120.38, 36.20], "address": "青岛北站", "capacity": 9000, "level": "核4级", "facilities": "高铁枢纽", "access": "青岛北站地铁站", "description": "高铁枢纽人防"},
      {"id": "qd_011", "name": "即墨地下掩体", "type": "shelter", "position": [120.45, 36.38], "address": "振华街", "capacity": 4500, "level": "核6级", "facilities": "即墨区", "access": "即墨地铁站", "description": "即墨区人防"}
    ],
    "targets": [
      {"id": "qd_t1", "name": "华电青岛电厂", "type": "power_plant", "position": [120.32, 36.10], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "qd_t2", "name": "黄岛电厂", "type": "power_plant", "position": [120.18, 35.95], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "qd_t3", "name": "青岛自来水厂", "type": "water_plant", "position": [120.38, 36.08], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "qd_t4", "name": "青岛石化", "type": "refinery", "position": [120.25, 36.00], "radius": 6000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "qd_t5", "name": "青岛港", "type": "port", "position": [120.32, 36.05], "radius": 6000, "impact": "世界级港口", "priority": "高"},
      {"id": "qd_t6", "name": "前湾港LNG接收站", "type": "gas_storage", "position": [120.18, 35.97], "radius": 5000, "impact": "天然气战略储备", "priority": "最高"},
      {"id": "qd_t7", "name": "流亭机场", "type": "airport", "position": [120.40, 36.27], "radius": 5000, "impact": "民用机场", "priority": "中"},
      {"id": "qd_t8", "name": "胶东国际机场", "type": "airport", "position": [120.09, 36.37], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"}
    ]
  },

  // ========== 宁波 ==========
  "ningbo": {
    "name": "宁波",
    "center": [121.5502, 29.8750],
    "shelters": [
      {"id": "nb_001", "name": "天一广场地下掩体", "type": "underground_mall", "position": [121.55, 29.87], "address": "天一广场", "capacity": 7000, "level": "核5级", "facilities": "市中心、商业核心", "access": "东门口地铁站", "description": "市中心人防"},
      {"id": "nb_002", "name": "宁波站地下避难所", "type": "transport", "position": [121.54, 29.87], "address": "宁波火车站", "capacity": 8000, "level": "核4级", "facilities": "一等站级别", "access": "宁波站地铁站", "description": "铁路枢纽人防"},
      {"id": "nb_003", "name": "东部新城地下掩体", "type": "government", "position": [121.60, 29.87], "address": "宁穿路", "capacity": 6000, "level": "核5级", "facilities": "新CBD核心区", "access": "福庆北路地铁站", "description": "新城人防"},
      {"id": "nb_004", "name": "鼓楼地下人防", "type": "underground_mall", "position": [121.55, 29.87], "address": "鼓楼步行街", "capacity": 5000, "level": "核6级", "facilities": "老城内", "access": "鼓楼地铁站", "description": "老城人防"},
      {"id": "nb_005", "name": "北仑地下掩体", "type": "shelter", "position": [121.85, 29.92], "address": "新大路", "capacity": 5500, "level": "核5级", "facilities": "北仑区核心、港口区", "access": "北仑地铁站", "description": "北仑区人防"},
      {"id": "nb_006", "name": "镇海地下避难所", "type": "shelter", "position": [121.72, 29.95], "address": "城关西路", "capacity": 5000, "level": "核6级", "facilities": "镇海区", "access": "镇海地铁站", "description": "镇海区人防"},
      {"id": "nb_007", "name": "鄞州地下掩体", "type": "shelter", "position": [121.57, 29.83], "address": "鄞县大道", "capacity": 6000, "level": "核6级", "facilities": "鄞州区核心", "access": "鄞州区政府站", "description": "鄞州区人防"},
      {"id": "nb_008", "name": "余姚地下避难所", "type": "shelter", "position": [121.15, 30.05], "address": "北滨江路", "capacity": 4500, "level": "核6级", "facilities": "县级市", "access": "余姚地铁站", "description": "余姚人防"},
      {"id": "nb_009", "name": "慈溪地下掩体", "type": "shelter", "position": [121.23, 30.17], "address": "三北大街", "capacity": 4500, "level": "核6级", "facilities": "县级市", "access": "慈溪地铁站", "description": "慈溪人防"},
      {"id": "nb_010", "name": "奉化地下避难所", "type": "shelter", "position": [121.40, 29.65], "address": "中山路", "capacity": 4000, "level": "核6级", "facilities": "奉化区", "access": "奉化地铁站", "description": "奉化区人防"}
    ],
    "targets": [
      {"id": "nb_t1", "name": "镇海电厂", "type": "power_plant", "position": [121.72, 29.95], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "nb_t2", "name": "宁波自来水厂", "type": "water_plant", "position": [121.56, 29.88], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "nb_t3", "name": "镇海炼化", "type": "refinery", "position": [121.75, 29.92], "radius": 10000, "impact": "世界级石化基地", "priority": "最高"},
      {"id": "nb_t4", "name": "宁波舟山港", "type": "port", "position": [121.85, 29.92], "radius": 6000, "impact": "世界第一大港", "priority": "高"},
      {"id": "nb_t5", "name": "宁波LNG接收站", "type": "gas_storage", "position": [121.90, 29.95], "radius": 5000, "impact": "天然气战略储备", "priority": "最高"},
      {"id": "nb_t6", "name": "栎社国际机场", "type": "airport", "position": [121.46, 29.83], "radius": 8000, "impact": "区域航空枢纽", "priority": "高"},
      {"id": "nb_t7", "name": "宁波化工区", "type": "chemical", "position": [121.70, 29.98], "radius": 8000, "impact": "大型化工基地", "priority": "最高"}
    ]
  },

  // ========== 佛山 ==========
  "foshan": {
    "name": "佛山",
    "center": [113.1214, 23.0215],
    "shelters": [
      {"id": "fs_001", "name": "祖庙地下掩体", "type": "underground_mall", "position": [113.12, 23.03], "address": "祖庙路", "capacity": 6000, "level": "核5级", "facilities": "市中心、老城区核心", "access": "祖庙地铁站", "description": "市中心人防"},
      {"id": "fs_002", "name": "佛山站地下避难所", "type": "transport", "position": [113.11, 23.04], "address": "佛山火车站", "capacity": 5500, "level": "核5级", "facilities": "铁路枢纽", "access": "佛山站地铁站", "description": "铁路枢纽人防"},
      {"id": "fs_003", "name": "千灯湖地下掩体", "type": "government", "position": [113.15, 23.06], "address": "千灯湖", "capacity": 7000, "level": "核5级", "facilities": "南海区CBD", "access": "千灯湖地铁站", "description": "南海CBD人防"},
      {"id": "fs_004", "name": "顺德地下避难所", "type": "shelter", "position": [113.25, 22.84], "address": "大良街道", "capacity": 6000, "level": "核5级", "facilities": "顺德区核心", "access": "顺德地铁站", "description": "顺德区人防"},
      {"id": "fs_005", "name": "南海地下掩体", "type": "shelter", "position": [113.15, 23.05], "address": "桂城街道", "capacity": 5500, "level": "核6级", "facilities": "南海区", "access": "桂城地铁站", "description": "南海区人防"},
      {"id": "fs_006", "name": "三水地下避难所", "type": "shelter", "position": [112.90, 23.17], "address": "西南街道", "capacity": 4000, "level": "核6级", "facilities": "三水区", "access": "三水地铁站", "description": "三水区人防"},
      {"id": "fs_007", "name": "高明地下掩体", "type": "shelter", "position": [112.88, 22.90], "address": "荷城街道", "capacity": 3500, "level": "核6级", "facilities": "高明区", "access": "高明地铁站", "description": "高明区人防"},
      {"id": "fs_008", "name": "禅城地下避难所", "type": "underground_mall", "position": [113.12, 23.02], "address": "东方广场", "capacity": 5000, "level": "核6级", "facilities": "禅城区商业", "access": "普君北路站", "description": "禅城区人防"},
      {"id": "fs_009", "name": "佛山西站地下掩体", "type": "transport", "position": [113.05, 23.08], "address": "佛山西站", "capacity": 8000, "level": "核4级", "facilities": "高铁枢纽", "access": "佛山西站地铁站", "description": "高铁枢纽人防"}
    ],
    "targets": [
      {"id": "fs_t1", "name": "佛山电厂", "type": "power_plant", "position": [113.15, 23.10], "radius": 5000, "impact": "区域主要电源", "priority": "最高"},
      {"id": "fs_t2", "name": "西樵山变电站", "type": "substation", "position": [112.98, 22.93], "radius": 3000, "impact": "区域电网枢纽", "priority": "高"},
      {"id": "fs_t3", "name": "佛山天然气门站", "type": "gas_storage", "position": [113.10, 23.05], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "fs_t4", "name": "顺德水厂", "type": "water_plant", "position": [113.25, 22.84], "radius": 3000, "impact": "顺德区主要水源", "priority": "高"},
      {"id": "fs_t5", "name": "南海电厂", "type": "power_plant", "position": [113.18, 23.08], "radius": 5000, "impact": "南海区主要电源", "priority": "最高"}
    ]
  },

  // ========== 合肥 ==========
  "hefei": {
    "name": "合肥",
    "center": [117.2272, 31.8206],
    "shelters": [
      {"id": "hf_001", "name": "政务区地下掩体", "type": "government", "position": [117.23, 31.82], "address": "政务环路", "capacity": 7000, "level": "核5级", "facilities": "市政府区、高防护", "access": "市政务中心站", "description": "政务核心区人防"},
      {"id": "hf_002", "name": "合肥站地下避难所", "type": "transport", "position": [117.32, 31.88], "address": "合肥火车站", "capacity": 8000, "level": "核4级", "facilities": "特等站级别", "access": "合肥站地铁站", "description": "铁路枢纽人防"},
      {"id": "hf_003", "name": "淮河路地下人防", "type": "underground_mall", "position": [117.31, 31.87], "address": "淮河路步行街", "capacity": 6000, "level": "核6级", "facilities": "老城商圈", "access": "大东门地铁站", "description": "老城人防"},
      {"id": "hf_004", "name": "滨湖新区地下掩体", "type": "shelter", "position": [117.30, 31.75], "address": "徽州大道", "capacity": 6500, "level": "核5级", "facilities": "新城核心区", "access": "滨湖世纪城站", "description": "滨湖新区人防"},
      {"id": "hf_005", "name": "包河地下避难所", "type": "shelter", "position": [117.30, 31.83], "address": "芜湖路", "capacity": 5000, "level": "核6级", "facilities": "包河区", "access": "包公园地铁站", "description": "包河区人防"},
      {"id": "hf_006", "name": "蜀山地下掩体", "type": "shelter", "position": [117.25, 31.85], "address": "长江西路", "capacity": 5500, "level": "核6级", "facilities": "蜀山区", "access": "三里庵地铁站", "description": "蜀山区人防"},
      {"id": "hf_007", "name": "瑶海地下避难所", "type": "shelter", "position": [117.33, 31.88], "address": "长江东路", "capacity": 5000, "level": "核6级", "facilities": "瑶海区", "access": "三里街地铁站", "description": "瑶海区人防"},
      {"id": "hf_008", "name": "庐阳地下掩体", "type": "shelter", "position": [117.28, 31.87], "address": "阜阳路", "capacity": 4500, "level": "核6级", "facilities": "庐阳区", "access": "四牌楼地铁站", "description": "庐阳区人防"},
      {"id": "hf_009", "name": "高新地下避难所", "type": "shelter", "position": [117.15, 31.83], "address": "创新大道", "capacity": 6000, "level": "核5级", "facilities": "高新区", "access": "汽车西站", "description": "高新区人防"},
      {"id": "hf_010", "name": "经开地下掩体", "type": "shelter", "position": [117.20, 31.79], "address": "繁华大道", "capacity": 5000, "level": "核6级", "facilities": "经开区", "access": "繁华大道站", "description": "经开区人防"},
      {"id": "hf_011", "name": "合肥南站地下避难所", "type": "transport", "position": [117.29, 31.80], "address": "合肥南站", "capacity": 10000, "level": "核4级", "facilities": "高铁枢纽", "access": "合肥南站地铁站", "description": "高铁枢纽人防"},
      {"id": "hf_012", "name": "中国科大地下掩体", "type": "shelter", "position": [117.27, 31.83], "address": "金寨路", "capacity": 5500, "level": "核6级", "facilities": "高校聚集区", "access": "中国科大站", "description": "高校区人防"}
    ],
    "targets": [
      {"id": "hf_t1", "name": "合肥发电厂", "type": "power_plant", "position": [117.30, 31.85], "radius": 5000, "impact": "主城区主要电源", "priority": "最高"},
      {"id": "hf_t2", "name": "皖能合肥电厂", "type": "power_plant", "position": [117.10, 31.90], "radius": 8000, "impact": "大型火力发电", "priority": "最高"},
      {"id": "hf_t3", "name": "合肥自来水厂", "type": "water_plant", "position": [117.28, 31.82], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "hf_t4", "name": "合肥天然气门站", "type": "gas_storage", "position": [117.25, 31.80], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "hf_t5", "name": "合肥化工厂", "type": "chemical", "position": [117.35, 31.90], "radius": 6000, "impact": "大型化工基地", "priority": "最高"},
      {"id": "hf_t6", "name": "骆岗机场", "type": "airport", "position": [117.30, 31.78], "radius": 5000, "impact": "军民合用机场", "priority": "高"},
      {"id": "hf_t7", "name": "合肥变电站", "type": "substation", "position": [117.28, 31.84], "radius": 2000, "impact": "区域电网枢纽", "priority": "中"}
    ]
  },

  // ========== 无锡 ==========
  "wuxi": {
    "name": "无锡",
    "center": [120.3119, 31.4912],
    "shelters": [
      {"id": "wx_001", "name": "三阳广场地下掩体", "type": "underground_mall", "position": [120.30, 31.58], "address": "中山路", "capacity": 8000, "level": "核5级", "facilities": "市中心、多层防护", "access": "三阳广场地铁站", "description": "市中心核心人防"},
      {"id": "wx_002", "name": "无锡站地下避难所", "type": "transport", "position": [120.30, 31.59], "address": "无锡火车站", "capacity": 7500, "level": "核4级", "facilities": "特等站级别", "access": "无锡站地铁站", "description": "铁路枢纽人防"},
      {"id": "wx_003", "name": "太湖广场地下掩体", "type": "government", "position": [120.31, 31.57], "address": "太湖大道", "capacity": 6000, "level": "核5级", "facilities": "市府区附近", "access": "太湖广场地铁站", "description": "市政区人防"},
      {"id": "wx_004", "name": "崇安寺地下人防", "type": "underground_mall", "position": [120.30, 31.58], "address": "崇安寺步行街", "capacity": 5500, "level": "核6级", "facilities": "老城商圈", "access": "三阳广场站", "description": "老城人防"},
      {"id": "wx_005", "name": "锡山地下避难所", "type": "shelter", "position": [120.36, 31.59], "address": "锡沪路", "capacity": 5000, "level": "核6级", "facilities": "锡山区核心", "access": "东亭地铁站", "description": "锡山区人防"},
      {"id": "wx_006", "name": "惠山地下掩体", "type": "shelter", "position": [120.30, 31.68], "address": "惠山大道", "capacity": 4500, "level": "核6级", "facilities": "惠山区", "access": "堰桥地铁站", "description": "惠山区人防"},
      {"id": "wx_007", "name": "滨湖地下避难所", "type": "shelter", "position": [120.28, 31.55], "address": "梁清路", "capacity": 5000, "level": "核6级", "facilities": "滨湖区、景区附近", "access": "河埒口地铁站", "description": "滨湖区人防"},
      {"id": "wx_008", "name": "新区地下掩体", "type": "shelter", "position": [120.38, 31.55], "address": "长江北路", "capacity": 5500, "level": "核5级", "facilities": "高新区", "access": "旺庄路地铁站", "description": "高新区人防"},
      {"id": "wx_009", "name": "江阴地下避难所", "type": "shelter", "position": [120.27, 31.92], "address": "人民中路", "capacity": 6000, "level": "核5级", "facilities": "县级市核心", "access": "江阴地铁站", "description": "江阴人防"},
      {"id": "wx_010", "name": "宜兴地下掩体", "type": "shelter", "position": [119.82, 31.36], "address": "解放东路", "capacity": 5000, "level": "核6级", "facilities": "县级市", "access": "宜兴地铁站", "description": "宜兴人防"}
    ],
    "targets": [
      {"id": "wx_t1", "name": "无锡热电厂", "type": "power_plant", "position": [120.32, 31.62], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "wx_t2", "name": "国电无锡电厂", "type": "power_plant", "position": [120.35, 31.65], "radius": 8000, "impact": "大型火力发电", "priority": "最高"},
      {"id": "wx_t3", "name": "无锡自来水厂", "type": "water_plant", "position": [120.30, 31.59], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "wx_t4", "name": "江阴长江大桥", "type": "transport", "position": [120.27, 31.95], "radius": 2000, "impact": "跨江通道枢纽", "priority": "中"},
      {"id": "wx_t5", "name": "无锡天然气门站", "type": "gas_storage", "position": [120.33, 31.58], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "wx_t6", "name": "硕放机场", "type": "airport", "position": [120.43, 31.50], "radius": 8000, "impact": "区域航空枢纽", "priority": "高"}
    ]
  },

  // ========== 厦门 ==========
  "xiamen": {
    "name": "厦门",
    "center": [118.0894, 24.4798],
    "shelters": [
      {"id": "xm_001", "name": "中山路地下掩体", "type": "underground_mall", "position": [118.08, 24.46], "address": "中山路步行街", "capacity": 6000, "level": "核5级", "facilities": "市中心、老城区", "access": "镇海路地铁站", "description": "市中心人防"},
      {"id": "xm_002", "name": "厦门站地下避难所", "type": "transport", "position": [118.11, 24.47], "address": "厦门火车站", "capacity": 6500, "level": "核4级", "facilities": "一等站级别", "access": "厦门站地铁站", "description": "铁路枢纽人防"},
      {"id": "xm_003", "name": "SM广场地下掩体", "type": "underground_mall", "position": [118.12, 24.51], "address": "嘉禾路", "capacity": 7000, "level": "核5级", "facilities": "岛内心商圈", "access": "乌石浦地铁站", "description": "岛内商圈人防"},
      {"id": "xm_004", "name": "会展中心地下避难所", "type": "government", "position": [118.13, 24.48], "address": "会展路", "capacity": 5500, "level": "核5级", "facilities": "国际会展中心", "access": "会展中心地铁站", "description": "会展区人防"},
      {"id": "xm_005", "name": "五缘湾地下掩体", "type": "shelter", "position": [118.16, 24.52], "address": "五缘湾道", "capacity": 5000, "level": "核5级", "facilities": "新开发区", "access": "五缘湾地铁站", "description": "五缘湾人防"},
      {"id": "xm_006", "name": "湖里地下避难所", "type": "shelter", "position": [118.10, 24.51], "address": "湖里大道", "capacity": 4500, "level": "核6级", "facilities": "老城区", "access": "湖里公园地铁站", "description": "湖里区人防"},
      {"id": "xm_007", "name": "海沧地下掩体", "type": "shelter", "position": [117.98, 24.48], "address": "滨湖北路", "capacity": 5000, "level": "核6级", "facilities": "海沧区", "access": "海沧湾公园站", "description": "海沧区人防"},
      {"id": "xm_008", "name": "集美地下避难所", "type": "shelter", "position": [118.10, 24.58], "address": "集源路", "capacity": 6000, "level": "核5级", "facilities": "集美区核心、大学城", "access": "集美学村地铁站", "description": "集美区人防"},
      {"id": "xm_009", "name": "同安地下掩体", "type": "shelter", "position": [118.15, 24.72], "address": "环城西路", "capacity": 4000, "level": "核6级", "facilities": "同安区", "access": "同安地铁站", "description": "同安区人防"},
      {"id": "xm_010", "name": "翔安地下避难所", "type": "shelter", "position": [118.24, 24.62], "address": "祥吴一路", "capacity": 4500, "level": "核6级", "facilities": "翔安区", "access": "翔安地铁站", "description": "翔安区人防"},
      {"id": "xm_011", "name": "高崎机场地下掩体", "type": "transport", "position": [118.13, 24.54], "address": "高崎机场", "capacity": 8000, "level": "核4级", "facilities": "国际机场级防护", "access": "高崎机场地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "xm_t1", "name": "厦门电厂", "type": "power_plant", "position": [118.12, 24.55], "radius": 5000, "impact": "岛内主要电源", "priority": "最高"},
      {"id": "xm_t2", "name": "嵩屿电厂", "type": "power_plant", "position": [117.98, 24.45], "radius": 8000, "impact": "大型火电基地", "priority": "最高"},
      {"id": "xm_t3", "name": "厦门自来水厂", "type": "water_plant", "position": [118.08, 24.48], "radius": 3000, "impact": "岛内主要水源", "priority": "高"},
      {"id": "xm_t4", "name": "翔安LNG接收站", "type": "gas_storage", "position": [118.25, 24.60], "radius": 5000, "impact": "天然气战略储备", "priority": "最高"},
      {"id": "xm_t5", "name": "高崎国际机场", "type": "airport", "position": [118.13, 24.54], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "xm_t6", "name": "厦门港", "type": "port", "position": [118.07, 24.45], "radius": 5000, "impact": "重要港口", "priority": "中"},
      {"id": "xm_t7", "name": "海沧PX项目", "type": "chemical", "position": [117.95, 24.50], "radius": 10000, "impact": "大型石化基地", "priority": "最高"}
    ]
  },

  // ========== 济南 ==========
  "jinan": {
    "name": "济南",
    "center": [117.1205, 36.6510],
    "shelters": [
      {"id": "jn_001", "name": "泉城广场地下掩体", "type": "underground_mall", "position": [117.02, 36.66], "address": "泉城广场", "capacity": 7000, "level": "核5级", "facilities": "市中心、地标区", "access": "泉城广场地铁站", "description": "市中心人防"},
      {"id": "jn_002", "name": "济南站地下避难所", "type": "transport", "position": [117.00, 36.67], "address": "济南火车站", "capacity": 8000, "level": "核4级", "facilities": "特等站级别", "access": "济南站地铁站", "description": "铁路枢纽人防"},
      {"id": "jn_003", "name": "大观园地下人防", "type": "underground_mall", "position": [117.00, 36.66], "address": "大观园", "capacity": 5500, "level": "核6级", "facilities": "老城商圈", "access": "大观园地铁站", "description": "老城人防"},
      {"id": "jn_004", "name": "奥体中心地下掩体", "type": "government", "position": [117.05, 36.65], "address": "经十东路", "capacity": 6000, "level": "核5级", "facilities": "东部新城", "access": "奥体中心地铁站", "description": "奥体区人防"},
      {"id": "jn_005", "name": "高新地下避难所", "type": "shelter", "position": [117.12, 36.68], "address": "舜华路", "capacity": 5500, "level": "核5级", "facilities": "高新区", "access": "丁家庄地铁站", "description": "高新区人防"},
      {"id": "jn_006", "name": "历下地下掩体", "type": "shelter", "position": [117.08, 36.66], "address": "解放路", "capacity": 5000, "level": "核6级", "facilities": "历下区", "access": "解放桥地铁站", "description": "历下区人防"},
      {"id": "jn_007", "name": "市中地下避难所", "type": "shelter", "position": [116.99, 36.65], "address": "经七路", "capacity": 5000, "level": "核6级", "facilities": "市中区", "access": "市中医院站", "description": "市中区人防"},
      {"id": "jn_008", "name": "槐荫地下掩体", "type": "shelter", "position": [116.95, 36.65], "address": "经十西路", "capacity": 4500, "level": "核6级", "facilities": "槐荫区", "access": "西客站地铁站", "description": "槐荫区人防"},
      {"id": "jn_009", "name": "天桥地下避难所", "type": "shelter", "position": [116.98, 36.68], "address": "堤口路", "capacity": 4500, "level": "核6级", "facilities": "天桥区", "access": "济南站北地铁站", "description": "天桥区人防"},
      {"id": "jn_010", "name": "长清地下掩体", "type": "shelter", "position": [116.75, 36.55], "address": "大学路", "capacity": 5000, "level": "核6级", "facilities": "大学城", "access": "大学城地铁站", "description": "长清区人防"},
      {"id": "jn_011", "name": "济南西站地下避难所", "type": "transport", "position": [116.89, 36.67], "address": "济南西站", "capacity": 9000, "level": "核4级", "facilities": "高铁枢纽", "access": "济南西站地铁站", "description": "高铁枢纽人防"}
    ],
    "targets": [
      {"id": "jn_t1", "name": "济南热电厂", "type": "power_plant", "position": [117.00, 36.70], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "jn_t2", "name": "黄台电厂", "type": "power_plant", "position": [117.05, 36.72], "radius": 8000, "impact": "大型火力发电基地", "priority": "最高"},
      {"id": "jn_t3", "name": "济南自来水厂", "type": "water_plant", "position": [117.02, 36.66], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "jn_t4", "name": "济南炼油厂", "type": "refinery", "position": [117.10, 36.65], "radius": 6000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "jn_t5", "name": "遥墙国际机场", "type": "airport", "position": [117.22, 36.85], "radius": 8000, "impact": "国际航空枢纽", "priority": "高"},
      {"id": "jn_t6", "name": "济南天然气门站", "type": "gas_storage", "position": [117.05, 36.68], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "jn_t7", "name": "济南港", "type": "port", "position": [116.85, 36.75], "radius": 4000, "impact": "小清河港口", "priority": "中"}
    ]
  },

  // ========== 沈阳 ==========
  "shenyang": {
    "name": "沈阳",
    "center": [123.4315, 41.8057],
    "shelters": [
      {"id": "sy_001", "name": "太原街地下掩体", "type": "underground_mall", "position": [123.40, 41.80], "address": "太原街", "capacity": 8000, "level": "核5级", "facilities": "市中心、多层防护", "access": "沈阳站地铁站", "description": "市中心核心人防"},
      {"id": "sy_002", "name": "沈阳站地下避难所", "type": "transport", "position": [123.38, 41.80], "address": "沈阳火车站", "capacity": 10000, "level": "核4级", "facilities": "特等站、国家级枢纽", "access": "沈阳站地铁站", "description": "国家级铁路枢纽"},
      {"id": "sy_003", "name": "中街地下人防", "type": "underground_mall", "position": [123.45, 41.80], "address": "中街步行街", "capacity": 7000, "level": "核5级", "facilities": "东北第一商业街", "access": "中街地铁站", "description": "核心商圈人防"},
      {"id": "sy_004", "name": "市府广场地下掩体", "type": "government", "position": [123.43, 41.80], "address": "市府广场", "capacity": 6500, "level": "核5级", "facilities": "市政府区", "access": "市府广场地铁站", "description": "政务区人防"},
      {"id": "sy_005", "name": "奥体中心地下避难所", "type": "shelter", "position": [123.48, 41.74], "address": "浑南中路", "capacity": 7000, "level": "核5级", "facilities": "浑南新区核心", "access": "奥体中心地铁站", "description": "奥体区人防"},
      {"id": "sy_006", "name": "北站地下掩体", "type": "transport", "position": [123.43, 41.82], "address": "沈阳北站", "capacity": 10000, "level": "核4级", "facilities": "特等站", "access": "沈阳北站地铁站", "description": "北站枢纽人防"},
      {"id": "sy_007", "name": "铁西地下人防", "type": "shelter", "position": [123.35, 41.80], "address": "兴华街", "capacity": 6000, "level": "核5级", "facilities": "工业区转型区", "access": "铁西广场地铁站", "description": "铁西区人防"},
      {"id": "sy_008", "name": "大东地下掩体", "type": "shelter", "position": [123.48, 41.81], "address": "东陵西路", "capacity": 5500, "level": "核6级", "facilities": "大东区", "access": "黎明广场站", "description": "大东区人防"},
      {"id": "sy_009", "name": "皇姑地下避难所", "type": "shelter", "position": [123.42, 41.82], "address": "长江街", "capacity": 5500, "level": "核6级", "facilities": "皇姑区、高校密集", "access": "长江街地铁站", "description": "皇姑区人防"},
      {"id": "sy_010", "name": "沈河地下掩体", "type": "shelter", "position": [123.45, 41.79], "address": "青年大街", "capacity": 6000, "level": "核5级", "facilities": "金融商贸区", "access": "青年大街地铁站", "description": "金融区人防"},
      {"id": "sy_011", "name": "于洪地下避难所", "type": "shelter", "position": [123.30, 41.80], "address": "黄海路", "capacity": 5000, "level": "核6级", "facilities": "于洪区", "access": "于洪广场站", "description": "于洪区人防"},
      {"id": "sy_012", "name": "桃仙机场地下掩体", "type": "transport", "position": [123.48, 41.63], "address": "桃仙机场", "capacity": 8000, "level": "核4级", "facilities": "国际机场级防护", "access": "桃仙机场地铁站", "description": "机场人防"}
    ],
    "targets": [
      {"id": "sy_t1", "name": "沈海热电厂", "type": "power_plant", "position": [123.48, 41.80], "radius": 5000, "impact": "主城区主要热源电源", "priority": "最高"},
      {"id": "sy_t2", "name": "沈阳热电厂", "type": "power_plant", "position": [123.38, 41.78], "radius": 8000, "impact": "大型热电基地", "priority": "最高"},
      {"id": "sy_t3", "name": "浑南热电厂", "type": "power_plant", "position": [123.50, 41.70], "radius": 5000, "impact": "浑南区主要电源", "priority": "最高"},
      {"id": "sy_t4", "name": "沈阳自来水厂", "type": "water_plant", "position": [123.42, 36.82], "radius": 3000, "impact": "主城区主要水源", "priority": "高"},
      {"id": "sy_t5", "name": "沈阳炼油厂", "type": "refinery", "position": [123.35, 41.85], "radius": 6000, "impact": "大型石化基地", "priority": "最高"},
      {"id": "sy_t6", "name": "桃仙国际机场", "type": "airport", "position": [123.48, 41.63], "radius": 8000, "impact": "东北航空枢纽", "priority": "高"},
      {"id": "sy_t7", "name": "沈阳天然气门站", "type": "gas_storage", "position": [123.40, 41.85], "radius": 3000, "impact": "天然气输配枢纽", "priority": "高"},
      {"id": "sy_t8", "name": "沈阳港", "type": "port", "position": [123.20, 41.75], "radius": 4000, "impact": "内陆港枢纽", "priority": "中"}
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TIER2_CITIES_DATA;
}
