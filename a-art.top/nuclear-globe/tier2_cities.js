// 第二批：15个新一线城市完整数据补充
const TIER2_CITIES = {
  // 1. 成都 - 西部中心城市
  "chengdu": {
    "name": "成都",
    "center": [104.0668, 30.5728],
    "shelters": [
      {
        "id": "cd_001",
        "name": "成都天府广场地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [104.0665, 30.6582],
        "capacity": "8000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站、物资储备库",
        "access": "地铁1/2号线天府广场站",
        "address": "成都市青羊区人民南路",
        "description": "市中心核心人防工程，连接地铁网络"
      },
      {
        "id": "cd_002",
        "name": "成都东站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [104.1183, 30.6306],
        "capacity": "6000人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "成都东站地下广场",
        "address": "成都市成华区青衣江路",
        "description": "西南地区最大高铁枢纽人防工程"
      },
      {
        "id": "cd_003",
        "name": "成都双流机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [103.9567, 30.5789],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "双流机场T2航站楼地下",
        "address": "成都市双流区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "cd_004",
        "name": "成都春熙路地下人防商城",
        "type": "underground_mall",
        "level": "核6级",
        "position": [104.0789, 30.6567],
        "capacity": "4500人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "春熙路地铁站",
        "address": "成都市锦江区春熙路",
        "description": "繁华商业区人防工程"
      },
      {
        "id": "cd_005",
        "name": "成都高新区地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [104.0567, 30.5567],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "高新区政府地下",
        "address": "成都市高新区天府大道",
        "description": "高新区行政中心防护工程"
      },
      {
        "id": "cd_006",
        "name": "成都北站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [104.0734, 30.6967],
        "capacity": "5000人",
        "facilities": "铁路枢纽防护设施、应急供水、发电设备",
        "access": "成都北站地下",
        "address": "成都市金牛区站北路",
        "description": "成都铁路枢纽核心人防工程"
      },
      {
        "id": "cd_007",
        "name": "成都天府新区地下人防工程",
        "type": "civil",
        "level": "核6级",
        "position": [104.0567, 30.4567],
        "capacity": "6000人",
        "facilities": "现代化人防工程、智能监控系统、应急物资库",
        "access": "天府新区地铁站",
        "address": "成都市天府新区天府大道",
        "description": "天府新区核心人防设施"
      },
      {
        "id": "cd_008",
        "name": "成都武侯祠地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [104.0467, 30.6467],
        "capacity": "3500人",
        "facilities": "历史文化区人防工程、应急供水、医疗站",
        "access": "武侯祠大街地下入口",
        "address": "成都市武侯区武侯祠大街",
        "description": "历史文化区人防设施"
      },
      {
        "id": "cd_009",
        "name": "成都青羊宫地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [104.0367, 30.6667],
        "capacity": "3200人",
        "facilities": "道教文化区人防工程、应急供电、通风系统",
        "access": "青羊宫地铁站",
        "address": "成都市青羊区一环路西二段",
        "description": "城西重要人防设施"
      },
      {
        "id": "cd_010",
        "name": "成都龙泉驿地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [104.2567, 30.5567],
        "capacity": "4000人",
        "facilities": "工业区人防工程、应急物资储备、医疗站",
        "access": "龙泉驿地铁站",
        "address": "成都市龙泉驿区成龙大道",
        "description": "城东工业区人防设施"
      },
      {
        "id": "cd_011",
        "name": "成都温江地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [103.8567, 30.6867],
        "capacity": "3000人",
        "facilities": "城区人防工程、应急供水、发电设备",
        "access": "温江城区地下入口",
        "address": "成都市温江区光华大道",
        "description": "城西温江区人防设施"
      },
      {
        "id": "cd_012",
        "name": "成都郫都地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [103.9067, 30.8067],
        "capacity": "3500人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "郫都城区地下入口",
        "address": "成都市郫都区郫筒镇",
        "description": "西北郫都区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "cd_t001",
        "name": "成都双流国际机场",
        "type": "transport",
        "position": [103.9567, 30.5789],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "cd_t002",
        "name": "成都东站",
        "type": "transport",
        "position": [104.1183, 30.6306],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "cd_t003",
        "name": "成都市政府大楼",
        "type": "government",
        "position": [104.0668, 30.6728],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "cd_t004",
        "name": "成都核电站(规划中)",
        "type": "nuclear",
        "position": [104.1567, 30.4567],
        "risk": "critical",
        "radius": 10000
      },
      {
        "id": "cd_t005",
        "name": "成都自来水厂",
        "type": "water",
        "position": [104.0267, 30.5967],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "cd_t006",
        "name": "成都500kV变电站",
        "type": "power",
        "position": [104.1067, 30.5267],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "cd_t007",
        "name": "成都天然气储配站",
        "type": "gas",
        "position": [103.9767, 30.5367],
        "risk": "critical",
        "radius": 3000
      },
      {
        "id": "cd_t008",
        "name": "成都炼油厂",
        "type": "chemical",
        "position": [104.2167, 30.5967],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "cd_t009",
        "name": "成都化工厂区",
        "type": "chemical",
        "position": [104.1867, 30.6167],
        "risk": "high",
        "radius": 3000
      }
    ]
  },

  // 2. 杭州 - 长三角南翼
  "hangzhou": {
    "name": "杭州",
    "center": [120.1551, 30.2741],
    "shelters": [
      {
        "id": "hz_001",
        "name": "杭州西湖文化广场地下人防",
        "type": "underground_mall",
        "level": "核6级",
        "position": [120.1651, 30.2841],
        "capacity": "6000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1号线西湖文化广场站",
        "address": "杭州市下城区西湖文化广场",
        "description": "市中心核心人防工程"
      },
      {
        "id": "hz_002",
        "name": "杭州东站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.2051, 30.2941],
        "capacity": "7000人",
        "facilities": "亚洲最大高铁枢纽防护设施、应急供电、医疗站",
        "access": "杭州东站地下",
        "address": "杭州市江干区全福桥路",
        "description": "亚洲最大高铁枢纽人防工程"
      },
      {
        "id": "hz_003",
        "name": "杭州萧山机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [120.4351, 30.2341],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "萧山机场T3航站楼地下",
        "address": "杭州市萧山区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "hz_004",
        "name": "杭州西湖地下人防工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.1451, 30.2541],
        "capacity": "4000人",
        "facilities": "景区人防工程、应急供水、医疗点",
        "access": "西湖周边地下入口",
        "address": "杭州市西湖区西湖大道",
        "description": "西湖景区人防设施"
      },
      {
        "id": "hz_005",
        "name": "杭州钱江新城地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [120.2151, 30.2641],
        "capacity": "4500人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "钱江新城地下",
        "address": "杭州市江干区富春路",
        "description": "钱江新城行政中心防护工程"
      },
      {
        "id": "hz_006",
        "name": "杭州滨江地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.2151, 30.2141],
        "capacity": "5000人",
        "facilities": "高新区人防工程、应急物资储备、医疗站",
        "access": "滨江地铁站",
        "address": "杭州市滨江区江南大道",
        "description": "滨江高新区人防设施"
      },
      {
        "id": "hz_007",
        "name": "杭州城站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.1751, 30.2541],
        "capacity": "4500人",
        "facilities": "铁路枢纽防护设施、应急供水、发电设备",
        "access": "杭州城站地下",
        "address": "杭州市上城区环城东路",
        "description": "杭州老火车站人防工程"
      },
      {
        "id": "hz_008",
        "name": "杭州武林广场地下人防",
        "type": "underground_mall",
        "level": "核6级",
        "position": [120.1651, 30.2741],
        "capacity": "5000人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "武林广场地铁站",
        "address": "杭州市下城区武林广场",
        "description": "市中心商业区人防工程"
      },
      {
        "id": "hz_009",
        "name": "杭州余杭地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [119.9751, 30.3541],
        "capacity": "4000人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "余杭地铁站",
        "address": "杭州市余杭区余杭街道",
        "description": "余杭区人防设施"
      },
      {
        "id": "hz_010",
        "name": "杭州未来科技城地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [119.9951, 30.2841],
        "capacity": "4500人",
        "facilities": "科技园区人防工程、应急供电、通风系统",
        "access": "未来科技城地下入口",
        "address": "杭州市余杭区文一西路",
        "description": "未来科技城人防设施"
      },
      {
        "id": "hz_011",
        "name": "杭州拱墅地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.1551, 30.3141],
        "capacity": "3500人",
        "facilities": "城区人防工程、应急供水、发电设备",
        "access": "拱墅区地下入口",
        "address": "杭州市拱墅区湖州街",
        "description": "拱墅区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "hz_t001",
        "name": "杭州萧山国际机场",
        "type": "transport",
        "position": [120.4351, 30.2341],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "hz_t002",
        "name": "杭州东站",
        "type": "transport",
        "position": [120.2051, 30.2941],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "hz_t003",
        "name": "杭州市政府大楼",
        "type": "government",
        "position": [120.1551, 30.2741],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "hz_t004",
        "name": "杭州秦山核电站(附近)",
        "type": "nuclear",
        "position": [120.7551, 30.4141],
        "risk": "critical",
        "radius": 10000
      },
      {
        "id": "hz_t005",
        "name": "杭州自来水厂",
        "type": "water",
        "position": [120.1251, 30.2441],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "hz_t006",
        "name": "杭州500kV变电站",
        "type": "power",
        "position": [120.2551, 30.2241],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "hz_t007",
        "name": "杭州炼油厂",
        "type": "chemical",
        "position": [120.2151, 30.1941],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "hz_t008",
        "name": "杭州钱塘江大桥",
        "type": "bridge",
        "position": [120.1651, 30.2041],
        "risk": "high",
        "radius": 1500
      }
    ]
  },

  // 3. 重庆 - 山城直辖市
  "chongqing": {
    "name": "重庆",
    "center": [106.5516, 29.5630],
    "shelters": [
      {
        "id": "cq_001",
        "name": "重庆解放碑地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [106.5766, 29.5630],
        "capacity": "8000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站、物资储备库",
        "access": "地铁1/2号线较场口站",
        "address": "重庆市渝中区解放碑",
        "description": "市中心核心人防工程，重庆地标"
      },
      {
        "id": "cq_002",
        "name": "重庆北站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [106.5466, 29.6130],
        "capacity": "7000人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "重庆北站北广场地下",
        "address": "重庆市渝北区昆仑大道",
        "description": "西南地区最大铁路枢纽人防工程"
      },
      {
        "id": "cq_003",
        "name": "重庆江北机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [106.6366, 29.7230],
        "capacity": "6000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "江北机场T3航站楼地下",
        "address": "重庆市渝北区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "cq_004",
        "name": "重庆三峡广场地下人防",
        "type": "underground_mall",
        "level": "核6级",
        "position": [106.4566, 29.5630],
        "capacity": "5000人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "三峡广场地铁站",
        "address": "重庆市沙坪坝区三峡广场",
        "description": "沙坪坝核心区人防工程"
      },
      {
        "id": "cq_005",
        "name": "重庆市人民大礼堂地下避难所",
        "type": "government",
        "level": "核5级",
        "position": [106.5566, 29.5730],
        "capacity": "4500人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "人民大礼堂地下",
        "address": "重庆市渝中区人民路",
        "description": "政治中心防护工程"
      },
      {
        "id": "cq_006",
        "name": "重庆观音桥地下避难所",
        "type": "underground_mall",
        "level": "核6级",
        "position": [106.5366, 29.5830],
        "capacity": "5500人",
        "facilities": "商业人防工程、应急物资储备、医疗站",
        "access": "观音桥地铁站",
        "address": "重庆市江北区观音桥",
        "description": "江北核心区人防设施"
      },
      {
        "id": "cq_007",
        "name": "重庆南岸地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [106.5866, 29.5230],
        "capacity": "4500人",
        "facilities": "城区人防工程、应急供水、发电设备",
        "access": "南坪地铁站",
        "address": "重庆市南岸区南坪",
        "description": "南岸区人防设施"
      },
      {
        "id": "cq_008",
        "name": "重庆九龙坡地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [106.5166, 29.5130],
        "capacity": "4000人",
        "facilities": "工业区人防工程、物资储备、医疗点",
        "access": "杨家坪地铁站",
        "address": "重庆市九龙坡区杨家坪",
        "description": "九龙坡区人防设施"
      },
      {
        "id": "cq_009",
        "name": "重庆大渡口地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [106.4866, 29.4930],
        "capacity": "3500人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "大渡口地铁站",
        "address": "重庆市大渡口区新山村",
        "description": "大渡口区人防设施"
      },
      {
        "id": "cq_010",
        "name": "重庆渝北地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [106.6266, 29.7230],
        "capacity": "5000人",
        "facilities": "城区人防工程、应急供电、通风系统",
        "access": "渝北广场地下入口",
        "address": "重庆市渝北区两路",
        "description": "渝北区人防设施"
      },
      {
        "id": "cq_011",
        "name": "重庆巴南地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [106.5466, 29.4230],
        "capacity": "3500人",
        "facilities": "城区人防工程、应急供水、发电设备",
        "access": "鱼洞地铁站",
        "address": "重庆市巴南区鱼洞",
        "description": "巴南区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "cq_t001",
        "name": "重庆江北国际机场",
        "type": "transport",
        "position": [106.6366, 29.7230],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "cq_t002",
        "name": "重庆北站",
        "type": "transport",
        "position": [106.5466, 29.6130],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "cq_t003",
        "name": "重庆市政府大楼",
        "type": "government",
        "position": [106.5516, 29.5630],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "cq_t004",
        "name": "重庆朝天门码头",
        "type": "port",
        "position": [106.5866, 29.5730],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "cq_t005",
        "name": "重庆自来水厂",
        "type": "water",
        "position": [106.5166, 29.5430],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "cq_t006",
        "name": "重庆500kV变电站",
        "type": "power",
        "position": [106.6066, 29.6030],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "cq_t007",
        "name": "重庆天然气储配站",
        "type": "gas",
        "position": [106.4766, 29.5830],
        "risk": "critical",
        "radius": 3000
      },
      {
        "id": "cq_t008",
        "name": "重庆炼油厂",
        "type": "chemical",
        "position": [106.4566, 29.4830],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "cq_t009",
        "name": "重庆长江大桥",
        "type": "bridge",
        "position": [106.5766, 29.5630],
        "risk": "high",
        "radius": 1500
      }
    ]
  },

  // 4. 苏州 - 制造业重镇
  "suzhou": {
    "name": "苏州",
    "center": [120.5853, 31.2989],
    "shelters": [
      {
        "id": "sz_001",
        "name": "苏州观前街地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [120.6253, 31.3089],
        "capacity": "5000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1号线临顿路站",
        "address": "苏州市姑苏区观前街",
        "description": "市中心核心人防工程"
      },
      {
        "id": "sz_002",
        "name": "苏州园区地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.7353, 31.3189],
        "capacity": "6000人",
        "facilities": "工业园区人防设施、应急供电、医疗站",
        "access": "园区地铁站",
        "address": "苏州市工业园区苏州大道",
        "description": "工业园区核心人防工程"
      },
      {
        "id": "sz_003",
        "name": "苏州火车站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.6053, 31.3289],
        "capacity": "5500人",
        "facilities": "铁路枢纽防护设施、应急供水、发电设备",
        "access": "苏州站地下",
        "address": "苏州市姑苏区苏站路",
        "description": "苏州铁路枢纽人防工程"
      },
      {
        "id": "sz_004",
        "name": "苏州新区地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.5553, 31.3089],
        "capacity": "4500人",
        "facilities": "高新区人防工程、应急物资储备、医疗站",
        "access": "新区地铁站",
        "address": "苏州市虎丘区狮山路",
        "description": "高新区人防设施"
      },
      {
        "id": "sz_005",
        "name": "苏州吴江地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.6453, 31.1589],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、通风系统",
        "access": "吴江地铁站",
        "address": "苏州市吴江区中山南路",
        "description": "吴江区人防设施"
      },
      {
        "id": "sz_006",
        "name": "苏州昆山地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.9553, 31.3889],
        "capacity": "4500人",
        "facilities": "县级市人防工程、智能监控系统、应急物资库",
        "access": "昆山地铁站",
        "address": "苏州市昆山市前进中路",
        "description": "昆山市人防设施"
      },
      {
        "id": "sz_007",
        "name": "苏州太仓地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [121.1053, 31.4589],
        "capacity": "3500人",
        "facilities": "港口城市人防工程、应急供水、发电设备",
        "access": "太仓城区地下入口",
        "address": "苏州市太仓市城厢镇",
        "description": "太仓市人防设施"
      },
      {
        "id": "sz_008",
        "name": "苏州常熟地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.7553, 31.6589],
        "capacity": "4000人",
        "facilities": "县级市人防工程、应急供电、医疗点",
        "access": "常熟地铁站",
        "address": "苏州市常熟市海虞南路",
        "description": "常熟市人防设施"
      },
      {
        "id": "sz_009",
        "name": "苏州张家港地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.5553, 31.8789],
        "capacity": "3500人",
        "facilities": "港口城市人防工程、物资储备、医疗站",
        "access": "张家港城区地下入口",
        "address": "苏州市张家港市杨舍镇",
        "description": "张家港市人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "sz_t001",
        "name": "苏州火车站",
        "type": "transport",
        "position": [120.6053, 31.3289],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "sz_t002",
        "name": "苏州市政府大楼",
        "type": "government",
        "position": [120.5853, 31.2989],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "sz_t003",
        "name": "苏州工业园区变电站",
        "type": "power",
        "position": [120.7353, 31.3189],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "sz_t004",
        "name": "苏州石化园区",
        "type": "chemical",
        "position": [120.6553, 31.2889],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "sz_t005",
        "name": "苏州港太仓港区",
        "type": "port",
        "position": [121.1053, 31.4589],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "sz_t006",
        "name": "苏州港张家港港区",
        "type": "port",
        "position": [120.5553, 31.8789],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "sz_t007",
        "name": "苏州自来水厂",
        "type": "water",
        "position": [120.5753, 31.2889],
        "risk": "high",
        "radius": 1500
      }
    ]
  },

  // 5. 武汉 - 九省通衢
  "wuhan": {
    "name": "武汉",
    "center": [114.3054, 30.5928],
    "shelters": [
      {
        "id": "wh_001",
        "name": "武汉江汉路地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [114.2954, 30.5928],
        "capacity": "6000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站、物资储备库",
        "access": "地铁2号线江汉路站",
        "address": "武汉市江汉区江汉路",
        "description": "汉口核心商业区人防工程"
      },
      {
        "id": "wh_002",
        "name": "武汉汉口站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [114.2554, 30.6128],
        "capacity": "7000人",
        "facilities": "铁路枢纽防护设施、应急供电、医疗站",
        "access": "汉口站地下广场",
        "address": "武汉市江汉区发展大道",
        "description": "华中最大铁路枢纽人防工程"
      },
      {
        "id": "wh_003",
        "name": "武汉武昌站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [114.3154, 30.5328],
        "capacity": "6000人",
        "facilities": "铁路枢纽防护设施、应急供水、发电设备",
        "access": "武昌站地下",
        "address": "武汉市武昌区中山路",
        "description": "武昌铁路枢纽人防工程"
      },
      {
        "id": "wh_004",
        "name": "武汉站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [114.4254, 30.6128],
        "capacity": "6500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "武汉站地下",
        "address": "武汉市洪山区白云路",
        "description": "高铁枢纽人防工程"
      },
      {
        "id": "wh_005",
        "name": "武汉天河机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [114.2154, 30.7828],
        "capacity": "5500人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "天河机场T3航站楼地下",
        "address": "武汉市黄陂区机场大道",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "wh_006",
        "name": "武汉市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [114.2654, 30.5828],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "武汉市江岸区沿江大道",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "wh_007",
        "name": "武汉光谷地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [114.4054, 30.5128],
        "capacity": "5500人",
        "facilities": "科技园区人防工程、应急物资储备、医疗站",
        "access": "光谷地铁站",
        "address": "武汉市洪山区珞喻路",
        "description": "光谷核心区人防设施"
      },
      {
        "id": "wh_008",
        "name": "武汉洪山广场地下人防",
        "type": "underground_mall",
        "level": "核6级",
        "position": [114.3354, 30.5428],
        "capacity": "5000人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "洪山广场地铁站",
        "address": "武汉市武昌区洪山路",
        "description": "武昌核心区人防工程"
      },
      {
        "id": "wh_009",
        "name": "武汉汉阳地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [114.2654, 30.5528],
        "capacity": "4500人",
        "facilities": "工业区人防工程、应急供水、发电设备",
        "access": "汉阳地铁站",
        "address": "武汉市汉阳区鹦鹉大道",
        "description": "汉阳区人防设施"
      },
      {
        "id": "wh_010",
        "name": "武汉青山地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [114.3854, 30.6328],
        "capacity": "4000人",
        "facilities": "工业区人防工程、应急供电、通风系统",
        "access": "青山地铁站",
        "address": "武汉市青山区和平大道",
        "description": "青山区人防设施"
      },
      {
        "id": "wh_011",
        "name": "武汉东湖地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [114.3654, 30.5628],
        "capacity": "3500人",
        "facilities": "景区人防工程、智能监控系统、应急物资库",
        "access": "东湖景区地下入口",
        "address": "武汉市武昌区东湖路",
        "description": "东湖景区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "wh_t001",
        "name": "武汉天河国际机场",
        "type": "transport",
        "position": [114.2154, 30.7828],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "wh_t002",
        "name": "武汉站",
        "type": "transport",
        "position": [114.4254, 30.6128],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "wh_t003",
        "name": "武汉市政府大楼",
        "type": "government",
        "position": [114.2654, 30.5828],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "wh_t004",
        "name": "武汉长江大桥",
        "type": "bridge",
        "position": [114.3054, 30.5528],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "wh_t005",
        "name": "武汉自来水厂",
        "type": "water",
        "position": [114.2754, 30.5628],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "wh_t006",
        "name": "武汉500kV变电站",
        "type": "power",
        "position": [114.3454, 30.6028],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "wh_t007",
        "name": "武汉石化基地",
        "type": "chemical",
        "position": [114.4254, 30.6628],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "wh_t008",
        "name": "武汉钢铁集团",
        "type": "factory",
        "position": [114.3854, 30.6428],
        "risk": "high",
        "radius": 3000
      }
    ]
  },

  // 6. 西安 - 古都重镇
  "xian": {
    "name": "西安",
    "center": [108.9402, 34.3416],
    "shelters": [
      {
        "id": "xa_001",
        "name": "西安钟楼地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [108.9452, 34.2616],
        "capacity": "6000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁2号线钟楼站",
        "address": "西安市碑林区钟楼",
        "description": "市中心核心人防工程"
      },
      {
        "id": "xa_002",
        "name": "西安北站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [108.9452, 34.3816],
        "capacity": "7000人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "西安北站地下",
        "address": "西安市未央区元朔路",
        "description": "西北最大高铁枢纽人防工程"
      },
      {
        "id": "xa_003",
        "name": "西安咸阳机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [108.7652, 34.4416],
        "capacity": "5500人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "咸阳机场T3航站楼地下",
        "address": "西安市西咸新区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "xa_004",
        "name": "西安大雁塔地下人防",
        "type": "civil",
        "level": "核6级",
        "position": [108.9752, 34.2216],
        "capacity": "4500人",
        "facilities": "景区人防工程、应急供水、医疗点",
        "access": "大雁塔地铁站",
        "address": "西安市雁塔区雁塔南路",
        "description": "大雁塔景区人防设施"
      },
      {
        "id": "xa_005",
        "name": "西安市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [108.9502, 34.2716],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "西安市未央区凤城八路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "xa_006",
        "name": "西安高新区地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [108.8952, 34.2016],
        "capacity": "5500人",
        "facilities": "高新区人防工程、应急物资储备、医疗站",
        "access": "高新地铁站",
        "address": "西安市雁塔区科技路",
        "description": "高新区人防设施"
      },
      {
        "id": "xa_007",
        "name": "西安火车站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [108.9652, 34.2816],
        "capacity": "5000人",
        "facilities": "铁路枢纽防护设施、应急供电、发电设备",
        "access": "西安站地下",
        "address": "西安市新城区环城北路",
        "description": "西安老火车站人防工程"
      },
      {
        "id": "xa_008",
        "name": "西安曲江新区地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [108.9852, 34.2016],
        "capacity": "4500人",
        "facilities": "新区人防工程、智能监控系统、应急物资库",
        "access": "曲江地铁站",
        "address": "西安市雁塔区芙蓉西路",
        "description": "曲江新区人防设施"
      },
      {
        "id": "xa_009",
        "name": "西安碑林地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [108.9352, 34.2516],
        "capacity": "3500人",
        "facilities": "文化区人防工程、应急供水、发电设备",
        "access": "碑林地铁站",
        "address": "西安市碑林区三学街",
        "description": "碑林区人防设施"
      },
      {
        "id": "xa_010",
        "name": "西安经开区地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [108.9252, 34.3216],
        "capacity": "4000人",
        "facilities": "工业区人防工程、应急供电、医疗点",
        "access": "经开地铁站",
        "address": "西安市未央区凤城五路",
        "description": "经开区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "xa_t001",
        "name": "西安咸阳国际机场",
        "type": "transport",
        "position": [108.7652, 34.4416],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "xa_t002",
        "name": "西安北站",
        "type": "transport",
        "position": [108.9452, 34.3816],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "xa_t003",
        "name": "西安市政府大楼",
        "type": "government",
        "position": [108.9502, 34.2716],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "xa_t004",
        "name": "西安古城墙",
        "type": "dam",
        "position": [108.9452, 34.2616],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "xa_t005",
        "name": "西安自来水厂",
        "type": "water",
        "position": [108.9052, 34.2816],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "xa_t006",
        "name": "西安750kV变电站",
        "type": "power",
        "position": [108.9852, 34.3516],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "xa_t007",
        "name": "西安石化基地",
        "type": "chemical",
        "position": [109.0452, 34.4116],
        "risk": "critical",
        "radius": 5000
      }
    ]
  },

  // 7. 南京 - 六朝古都
  "nanjing": {
    "name": "南京",
    "center": [118.7969, 32.0603],
    "shelters": [
      {
        "id": "nj_001",
        "name": "南京新街口地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [118.7869, 32.0503],
        "capacity": "6500人",
        "facilities": "三防系统、应急供电、储水设施、医疗站、物资储备库",
        "access": "地铁1/2号线新街口站",
        "address": "南京市玄武区中山路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "nj_002",
        "name": "南京南站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [118.8069, 31.9703],
        "capacity": "7500人",
        "facilities": "亚洲最大高铁站防护设施、应急供电、医疗站",
        "access": "南京南站地下",
        "address": "南京市雨花台区玉兰路",
        "description": "亚洲最大高铁站人防工程"
      },
      {
        "id": "nj_003",
        "name": "南京禄口机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [118.8769, 31.7403],
        "capacity": "6000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "禄口机场T2航站楼地下",
        "address": "南京市江宁区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "nj_004",
        "name": "南京夫子庙地下人防",
        "type": "civil",
        "level": "核6级",
        "position": [118.7969, 32.0203],
        "capacity": "4500人",
        "facilities": "景区人防工程、应急供水、医疗点",
        "access": "夫子庙地铁站",
        "address": "南京市秦淮区贡院街",
        "description": "夫子庙景区人防设施"
      },
      {
        "id": "nj_005",
        "name": "南京市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [118.8069, 32.0603],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "南京市玄武区北京东路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "nj_006",
        "name": "南京江宁地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [118.8569, 31.9603],
        "capacity": "5500人",
        "facilities": "新城区人防工程、应急物资储备、医疗站",
        "access": "江宁地铁站",
        "address": "南京市江宁区天元中路",
        "description": "江宁区人防设施"
      },
      {
        "id": "nj_007",
        "name": "南京浦口地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [118.6369, 32.0603],
        "capacity": "4500人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "浦口地铁站",
        "address": "南京市浦口区文德路",
        "description": "浦口区人防设施"
      },
      {
        "id": "nj_008",
        "name": "南京鼓楼地下避难所",
        "type": "underground_mall",
        "level": "核6级",
        "position": [118.7769, 32.0603],
        "capacity": "5000人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "鼓楼地铁站",
        "address": "南京市鼓楼区中山路",
        "description": "鼓楼核心区人防工程"
      },
      {
        "id": "nj_009",
        "name": "南京栖霞地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [118.8869, 32.1103],
        "capacity": "4000人",
        "facilities": "工业区人防工程、智能监控系统、应急物资库",
        "access": "栖霞地铁站",
        "address": "南京市栖霞区和燕路",
        "description": "栖霞区人防设施"
      },
      {
        "id": "nj_010",
        "name": "南京雨花台地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [118.7769, 31.9903],
        "capacity": "3500人",
        "facilities": "景区人防工程、应急供水、医疗点",
        "access": "雨花台地铁站",
        "address": "南京市雨花台区雨花路",
        "description": "雨花台景区人防设施"
      },
      {
        "id": "nj_011",
        "name": "南京河西地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [118.7369, 32.0103],
        "capacity": "6000人",
        "facilities": "新城区人防工程、应急供电、通风系统",
        "access": "奥体中心地铁站",
        "address": "南京市建邺区江东中路",
        "description": "河西新城人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "nj_t001",
        "name": "南京禄口国际机场",
        "type": "transport",
        "position": [118.8769, 31.7403],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "nj_t002",
        "name": "南京南站",
        "type": "transport",
        "position": [118.8069, 31.9703],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "nj_t003",
        "name": "南京市政府大楼",
        "type": "government",
        "position": [118.8069, 32.0603],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "nj_t004",
        "name": "南京长江大桥",
        "type": "bridge",
        "position": [118.7369, 32.1103],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "nj_t005",
        "name": "南京自来水厂",
        "type": "water",
        "position": [118.7669, 32.0403],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "nj_t006",
        "name": "南京500kV变电站",
        "type": "power",
        "position": [118.8469, 32.0803],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "nj_t007",
        "name": "南京石化基地",
        "type": "chemical",
        "position": [118.9069, 32.1203],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "nj_t008",
        "name": "南京钢铁集团",
        "type": "factory",
        "position": [118.8869, 32.1403],
        "risk": "high",
        "radius": 3000
      }
    ]
  },

  // 8. 长沙 - 中部崛起
  "changsha": {
    "name": "长沙",
    "center": [112.9388, 28.2282],
    "shelters": [
      {
        "id": "cs_001",
        "name": "长沙五一广场地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [112.9888, 28.1982],
        "capacity": "5500人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1/2号线五一广场站",
        "address": "长沙市芙蓉区五一大道",
        "description": "市中心核心人防工程"
      },
      {
        "id": "cs_002",
        "name": "长沙南站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.0688, 28.1582],
        "capacity": "6500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "长沙南站地下",
        "address": "长沙市雨花区花侯路",
        "description": "中部最大高铁枢纽人防工程"
      },
      {
        "id": "cs_003",
        "name": "长沙黄花机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [113.2188, 28.1882],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "黄花机场T2航站楼地下",
        "address": "长沙市长沙县机场大道",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "cs_004",
        "name": "长沙岳麓山地下人防",
        "type": "civil",
        "level": "核6级",
        "position": [112.9388, 28.1882],
        "capacity": "4000人",
        "facilities": "景区人防工程、应急供水、医疗点",
        "access": "岳麓山地铁站",
        "address": "长沙市岳麓区岳麓大道",
        "description": "岳麓山景区人防设施"
      },
      {
        "id": "cs_005",
        "name": "长沙市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [112.9788, 28.2382],
        "capacity": "3500人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "长沙市岳麓区岳麓大道",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "cs_006",
        "name": "长沙星沙地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [113.0888, 28.2482],
        "capacity": "5000人",
        "facilities": "工业区人防工程、应急物资储备、医疗站",
        "access": "星沙地铁站",
        "address": "长沙市长沙县星沙大道",
        "description": "星沙开发区人防设施"
      },
      {
        "id": "cs_007",
        "name": "长沙天心地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [112.9688, 28.1882],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "天心阁地铁站",
        "address": "长沙市天心区天心路",
        "description": "天心区人防设施"
      },
      {
        "id": "cs_008",
        "name": "长沙开福地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [112.9888, 28.2582],
        "capacity": "4500人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "开福寺地铁站",
        "address": "长沙市开福区开福寺路",
        "description": "开福区人防设施"
      },
      {
        "id": "cs_009",
        "name": "长沙雨花地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.0288, 28.1582],
        "capacity": "4000人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "雨花亭地铁站",
        "address": "长沙市雨花区韶山中路",
        "description": "雨花区人防设施"
      },
      {
        "id": "cs_010",
        "name": "长沙望城地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [112.8188, 28.3582],
        "capacity": "3500人",
        "facilities": "新城区人防工程、应急供电、通风系统",
        "access": "望城地铁站",
        "address": "长沙市望城区高塘岭",
        "description": "望城区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "cs_t001",
        "name": "长沙黄花国际机场",
        "type": "transport",
        "position": [113.2188, 28.1882],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "cs_t002",
        "name": "长沙南站",
        "type": "transport",
        "position": [113.0688, 28.1582],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "cs_t003",
        "name": "长沙市政府大楼",
        "type": "government",
        "position": [112.9788, 28.2382],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "cs_t004",
        "name": "长沙橘子洲大桥",
        "type": "bridge",
        "position": [112.9588, 28.1982],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "cs_t005",
        "name": "长沙自来水厂",
        "type": "water",
        "position": [112.9988, 28.2182],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "cs_t006",
        "name": "长沙500kV变电站",
        "type": "power",
        "position": [113.0488, 28.1882],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "cs_t007",
        "name": "长沙石化基地",
        "type": "chemical",
        "position": [113.1188, 28.1382],
        "risk": "critical",
        "radius": 5000
      }
    ]
  },

  // 9. 天津 - 北方门户
  "tianjin": {
    "name": "天津",
    "center": [117.2009, 39.0842],
    "shelters": [
      {
        "id": "tj_001",
        "name": "天津站地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [117.2059, 39.1242],
        "capacity": "6000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站、物资储备库",
        "access": "地铁2/3/9号线天津站",
        "address": "天津市河北区建国道",
        "description": "市中心核心人防工程"
      },
      {
        "id": "tj_002",
        "name": "天津西站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.1559, 39.1542],
        "capacity": "5500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "天津西站地下",
        "address": "天津市红桥区西站前街",
        "description": "天津铁路枢纽人防工程"
      },
      {
        "id": "tj_003",
        "name": "天津滨海机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [117.3559, 39.1242],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "滨海机场T2航站楼地下",
        "address": "天津市东丽区机场大道",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "tj_004",
        "name": "天津滨海地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.7059, 39.0042],
        "capacity": "6000人",
        "facilities": "滨海新区人防工程、应急物资储备、医疗站",
        "access": "滨海地铁站",
        "address": "天津市滨海新区塘沽",
        "description": "滨海新区人防设施"
      },
      {
        "id": "tj_005",
        "name": "天津市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [117.2159, 39.0942],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "天津市河西区友谊路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "tj_006",
        "name": "天津和平地下人防",
        "type": "underground_mall",
        "level": "核6级",
        "position": [117.1959, 39.1142],
        "capacity": "4500人",
        "facilities": "商业人防工程、物资储备、医疗点",
        "access": "和平路地铁站",
        "address": "天津市和平区和平路",
        "description": "和平核心区人防工程"
      },
      {
        "id": "tj_007",
        "name": "天津南开地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.1659, 39.1042],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "南开地铁站",
        "address": "天津市南开区南门外大街",
        "description": "南开区人防设施"
      },
      {
        "id": "tj_008",
        "name": "天津河北地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [117.1959, 39.1442],
        "capacity": "3500人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "河北区地下入口",
        "address": "天津市河北区中山路",
        "description": "河北区人防设施"
      },
      {
        "id": "tj_009",
        "name": "天津河东地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.2359, 39.1142],
        "capacity": "4000人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "河东地铁站",
        "address": "天津市河东区十一经路",
        "description": "河东区人防设施"
      },
      {
        "id": "tj_010",
        "name": "天津塘沽地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [117.6659, 38.9942],
        "capacity": "4500人",
        "facilities": "港口城市人防工程、应急供电、通风系统",
        "access": "塘沽地铁站",
        "address": "天津市滨海新区新港路",
        "description": "塘沽区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "tj_t001",
        "name": "天津滨海国际机场",
        "type": "transport",
        "position": [117.3559, 39.1242],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "tj_t002",
        "name": "天津港",
        "type": "port",
        "position": [117.7559, 38.9942],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "tj_t003",
        "name": "天津市政府大楼",
        "type": "government",
        "position": [117.2159, 39.0942],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "tj_t004",
        "name": "天津石化基地",
        "type": "chemical",
        "position": [117.4559, 38.9542],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "tj_t005",
        "name": "天津自来水厂",
        "type": "water",
        "position": [117.1859, 39.0842],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "tj_t006",
        "name": "天津500kV变电站",
        "type": "power",
        "position": [117.2859, 39.0542],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "tj_t007",
        "name": "天津大港油田",
        "type": "factory",
        "position": [117.4559, 38.8542],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "tj_t008",
        "name": "天津钢铁集团",
        "type": "factory",
        "position": [117.5559, 39.0142],
        "risk": "high",
        "radius": 3000
      }
    ]
  },

  // 10. 郑州 - 中原腹地
  "zhengzhou": {
    "name": "郑州",
    "center": [113.6253, 34.7466],
    "shelters": [
      {
        "id": "zz_001",
        "name": "郑州二七广场地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [113.6653, 34.7566],
        "capacity": "5500人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1/3号线二七广场站",
        "address": "郑州市二七区二七路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "zz_002",
        "name": "郑州东站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.7553, 34.7666],
        "capacity": "6500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "郑州东站地下",
        "address": "郑州市金水区心怡路",
        "description": "全国铁路枢纽中心人防工程"
      },
      {
        "id": "zz_003",
        "name": "郑州站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.6553, 34.7466],
        "capacity": "5500人",
        "facilities": "铁路枢纽防护设施、应急供水、发电设备",
        "access": "郑州站地下",
        "address": "郑州市二七区兴隆街",
        "description": "郑州铁路枢纽人防工程"
      },
      {
        "id": "zz_004",
        "name": "郑州新郑机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [113.8453, 34.5266],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "新郑机场T2航站楼地下",
        "address": "郑州市新郑市机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "zz_005",
        "name": "郑州市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [113.6853, 34.7666],
        "capacity": "3500人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "郑州市金水区金水路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "zz_006",
        "name": "郑州金水地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [113.7053, 34.7966],
        "capacity": "4500人",
        "facilities": "城区人防工程、应急物资储备、医疗站",
        "access": "金水路地铁站",
        "address": "郑州市金水区花园路",
        "description": "金水区人防设施"
      },
      {
        "id": "zz_007",
        "name": "郑州中原地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.6053, 34.7466],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "中原路地铁站",
        "address": "郑州市中原区中原路",
        "description": "中原区人防设施"
      },
      {
        "id": "zz_008",
        "name": "郑州管城地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.6853, 34.7266],
        "capacity": "4000人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "管城地铁站",
        "address": "郑州市管城回族区紫荆山路",
        "description": "管城区人防设施"
      },
      {
        "id": "zz_009",
        "name": "郑州高新地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.5653, 34.8066],
        "capacity": "4500人",
        "facilities": "高新区人防工程、智能监控系统、应急物资库",
        "access": "高新地铁站",
        "address": "郑州市高新区科学大道",
        "description": "高新区人防设施"
      },
      {
        "id": "zz_010",
        "name": "郑州经开地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.7453, 34.7266],
        "capacity": "4000人",
        "facilities": "工业区人防工程、应急供电、通风系统",
        "access": "经开地铁站",
        "address": "郑州市经开区航海路",
        "description": "经开区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "zz_t001",
        "name": "郑州新郑国际机场",
        "type": "transport",
        "position": [113.8453, 34.5266],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "zz_t002",
        "name": "郑州东站",
        "type": "transport",
        "position": [113.7553, 34.7666],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "zz_t003",
        "name": "郑州市政府大楼",
        "type": "government",
        "position": [113.6853, 34.7666],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "zz_t004",
        "name": "郑州火车站",
        "type": "transport",
        "position": [113.6553, 34.7466],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "zz_t005",
        "name": "郑州自来水厂",
        "type": "water",
        "position": [113.6153, 34.7766],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "zz_t006",
        "name": "郑州500kV变电站",
        "type": "power",
        "position": [113.7253, 34.7366],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "zz_t007",
        "name": "郑州石化基地",
        "type": "chemical",
        "position": [113.8153, 34.6666],
        "risk": "critical",
        "radius": 5000
      }
    ]
  },

  // 11. 东莞 - 制造业名城
  "dongguan": {
    "name": "东莞",
    "center": [113.7518, 23.0207],
    "shelters": [
      {
        "id": "dg_001",
        "name": "东莞南城地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [113.7318, 22.9907],
        "capacity": "5000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁2号线鸿福路站",
        "address": "东莞市南城区鸿福路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "dg_002",
        "name": "东莞虎门地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.6718, 22.8207],
        "capacity": "5500人",
        "facilities": "港口城市人防工程、应急供电、医疗站",
        "access": "虎门高铁站地下",
        "address": "东莞市虎门镇白沙",
        "description": "虎门铁路枢纽人防工程"
      },
      {
        "id": "dg_003",
        "name": "东莞松山湖地下指挥中心",
        "type": "government",
        "level": "核5级",
        "position": [113.8818, 22.9207],
        "capacity": "4500人",
        "facilities": "科技园区人防工程、应急指挥系统、数据中心",
        "access": "松山湖地铁站",
        "address": "东莞市松山湖科技产业园区",
        "description": "松山湖科技园区人防设施"
      },
      {
        "id": "dg_004",
        "name": "东莞长安地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.8118, 22.8107],
        "capacity": "4500人",
        "facilities": "工业区人防工程、应急物资储备、医疗站",
        "access": "长安地铁站",
        "address": "东莞市长安镇德政中路",
        "description": "长安工业区人防设施"
      },
      {
        "id": "dg_005",
        "name": "东莞厚街地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.7318, 22.9407],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "厚街地铁站",
        "address": "东莞市厚街镇康乐南路",
        "description": "厚街区人防设施"
      },
      {
        "id": "dg_006",
        "name": "东莞常平地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.9918, 22.9707],
        "capacity": "4500人",
        "facilities": "铁路枢纽人防工程、物资储备、医疗点",
        "access": "常平火车站地下",
        "address": "东莞市常平镇口岸大道",
        "description": "常平铁路枢纽人防设施"
      },
      {
        "id": "dg_007",
        "name": "东莞塘厦地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [114.1018, 22.8107],
        "capacity": "3500人",
        "facilities": "工业区人防工程、智能监控系统、应急物资库",
        "access": "塘厦地铁站",
        "address": "东莞市塘厦镇迎宾大道",
        "description": "塘厦区人防设施"
      },
      {
        "id": "dg_008",
        "name": "东莞凤岗地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [114.1518, 22.7507],
        "capacity": "3500人",
        "facilities": "边境城区人防工程、应急供电、通风系统",
        "access": "凤岗地铁站",
        "address": "东莞市凤岗镇凤深大道",
        "description": "凤岗区人防设施"
      },
      {
        "id": "dg_009",
        "name": "东莞寮步地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.8518, 22.8307],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供水、医疗点",
        "access": "寮步地铁站",
        "address": "东莞市寮步镇香市路",
        "description": "寮步区人防设施"
      },
      {
        "id": "dg_010",
        "name": "东莞大朗地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.9018, 22.9507],
        "capacity": "3500人",
        "facilities": "工业区人防工程、应急物资储备、发电设备",
        "access": "大朗地铁站",
        "address": "东莞市大朗镇美景中路",
        "description": "大朗区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "dg_t001",
        "name": "东莞虎门港",
        "type": "port",
        "position": [113.6718, 22.8207],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "dg_t002",
        "name": "东莞虎门高铁站",
        "type": "transport",
        "position": [113.6918, 22.8207],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "dg_t003",
        "name": "东莞市政府大楼",
        "type": "government",
        "position": [113.7518, 23.0207],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "dg_t004",
        "name": "东莞松山湖变电站",
        "type": "power",
        "position": [113.8818, 22.9207],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "dg_t005",
        "name": "东莞自来水厂",
        "type": "water",
        "position": [113.7218, 23.0007],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "dg_t006",
        "name": "东莞石化储运基地",
        "type": "chemical",
        "position": [113.6218, 22.7807],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "dg_t007",
        "name": "东莞华为园区",
        "type": "factory",
        "position": [113.9218, 22.9007],
        "risk": "high",
        "radius": 2000
      }
    ]
  },

  // 12. 宁波 - 东方大港
  "ningbo": {
    "name": "宁波",
    "center": [121.5500, 29.8750],
    "shelters": [
      {
        "id": "nb_001",
        "name": "宁波天一广场地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [121.5600, 29.8750],
        "capacity": "5500人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1号线东门口站",
        "address": "宁波市海曙区中山东路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "nb_002",
        "name": "宁波站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [121.5400, 29.8650],
        "capacity": "6000人",
        "facilities": "铁路枢纽防护设施、应急供电、医疗站",
        "access": "宁波站地下",
        "address": "宁波市海曙区南站东路",
        "description": "宁波铁路枢纽人防工程"
      },
      {
        "id": "nb_003",
        "name": "宁波栎社机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [121.4700, 29.8250],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "栎社机场T2航站楼地下",
        "address": "宁波市海曙区航空路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "nb_004",
        "name": "宁波北仑地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [121.8500, 29.9150],
        "capacity": "5500人",
        "facilities": "港口城市人防工程、应急物资储备、医疗站",
        "access": "北仑地铁站",
        "address": "宁波市北仑区新大路",
        "description": "北仑港区人防设施"
      },
      {
        "id": "nb_005",
        "name": "宁波市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [121.5700, 29.8850],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "宁波市鄞州区宁穿路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "nb_006",
        "name": "宁波鄞州地下人防",
        "type": "civil",
        "level": "核6级",
        "position": [121.5900, 29.8150],
        "capacity": "4500人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "鄞州区政府地铁站",
        "address": "宁波市鄞州区惠风东路",
        "description": "鄞州区人防设施"
      },
      {
        "id": "nb_007",
        "name": "宁波镇海地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [121.7200, 29.9550],
        "capacity": "4000人",
        "facilities": "港口城市人防工程、物资储备、医疗点",
        "access": "镇海地铁站",
        "address": "宁波市镇海区车站路",
        "description": "镇海区人防设施"
      },
      {
        "id": "nb_008",
        "name": "宁波江北地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [121.5600, 29.9250],
        "capacity": "4000人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "江北地铁站",
        "address": "宁波市江北区人民路",
        "description": "江北区人防设施"
      },
      {
        "id": "nb_009",
        "name": "宁波慈溪地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [121.2500, 30.1750],
        "capacity": "3500人",
        "facilities": "县级市人防工程、应急供电、通风系统",
        "access": "慈溪地铁站",
        "address": "宁波市慈溪市新城大道",
        "description": "慈溪市人防设施"
      },
      {
        "id": "nb_010",
        "name": "宁波余姚地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [121.1600, 30.0450],
        "capacity": "3500人",
        "facilities": "县级市人防工程、应急供水、医疗点",
        "access": "余姚地铁站",
        "address": "宁波市余姚市北滨江路",
        "description": "余姚市人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "nb_t001",
        "name": "宁波栎社国际机场",
        "type": "transport",
        "position": [121.4700, 29.8250],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "nb_t002",
        "name": "宁波舟山港",
        "type": "port",
        "position": [121.8500, 29.9150],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "nb_t003",
        "name": "宁波市政府大楼",
        "type": "government",
        "position": [121.5700, 29.8850],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "nb_t004",
        "name": "宁波镇海石化基地",
        "type": "chemical",
        "position": [121.7500, 29.9750],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "nb_t005",
        "name": "宁波自来水厂",
        "type": "water",
        "position": [121.5200, 29.8650],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "nb_t006",
        "name": "宁波500kV变电站",
        "type": "power",
        "position": [121.6200, 29.8450],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "nb_t007",
        "name": "宁波北仑电厂",
        "type": "factory",
        "position": [121.8800, 29.9350],
        "risk": "critical",
        "radius": 3000
      }
    ]
  },

  // 13. 佛山 - 岭南名城
  "foshan": {
    "name": "佛山",
    "center": [113.1215, 23.0215],
    "shelters": [
      {
        "id": "fs_001",
        "name": "佛山祖庙地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [113.1215, 23.0315],
        "capacity": "5000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁广佛线祖庙站",
        "address": "佛山市禅城区祖庙路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "fs_002",
        "name": "佛山西站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.0515, 23.0815],
        "capacity": "5500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "佛山西站地下",
        "address": "佛山市南海区狮山镇",
        "description": "佛山铁路枢纽人防工程"
      },
      {
        "id": "fs_003",
        "name": "佛山顺德地下指挥中心",
        "type": "government",
        "level": "核5级",
        "position": [113.2415, 22.8415],
        "capacity": "4500人",
        "facilities": "区级应急指挥系统、通讯中心、数据中心",
        "access": "顺德区政府地下",
        "address": "佛山市顺德区大良街道",
        "description": "顺德区行政中心防护工程"
      },
      {
        "id": "fs_004",
        "name": "佛山南海地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.1415, 23.0315],
        "capacity": "5000人",
        "facilities": "城区人防工程、应急物资储备、医疗站",
        "access": "南海地铁站",
        "address": "佛山市南海区桂城",
        "description": "南海区人防设施"
      },
      {
        "id": "fs_005",
        "name": "佛山三水地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [112.8815, 23.1715],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "三水地铁站",
        "address": "佛山市三水区西南",
        "description": "三水区人防设施"
      },
      {
        "id": "fs_006",
        "name": "佛山高明地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [112.8815, 22.9015],
        "capacity": "3500人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "高明地铁站",
        "address": "佛山市高明区荷城",
        "description": "高明区人防设施"
      },
      {
        "id": "fs_007",
        "name": "佛山禅城地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.1115, 23.0215],
        "capacity": "4500人",
        "facilities": "城区人防工程、智能监控系统、应急物资库",
        "access": "禅城地铁站",
        "address": "佛山市禅城区岭南大道",
        "description": "禅城区人防设施"
      },
      {
        "id": "fs_008",
        "name": "佛山乐从地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [113.0815, 22.9515],
        "capacity": "4000人",
        "facilities": "商贸区人防工程、应急供电、通风系统",
        "access": "乐从地铁站",
        "address": "佛山市顺德区乐从",
        "description": "乐从区人防设施"
      },
      {
        "id": "fs_009",
        "name": "佛山容桂地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [113.2815, 22.7815],
        "capacity": "3500人",
        "facilities": "工业区人防工程、应急供水、医疗点",
        "access": "容桂地铁站",
        "address": "佛山市顺德区容桂",
        "description": "容桂区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "fs_t001",
        "name": "佛山西站",
        "type": "transport",
        "position": [113.0515, 23.0815],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "fs_t002",
        "name": "佛山顺德港",
        "type": "port",
        "position": [113.3215, 22.8015],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "fs_t003",
        "name": "佛山市政府大楼",
        "type": "government",
        "position": [113.1215, 23.0215],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "fs_t004",
        "name": "佛山顺德变电站",
        "type": "power",
        "position": [113.2615, 22.8615],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "fs_t005",
        "name": "佛山自来水厂",
        "type": "water",
        "position": [113.1015, 23.0415],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "fs_t006",
        "name": "佛山陶瓷基地",
        "type": "chemical",
        "position": [113.0215, 22.9815],
        "risk": "critical",
        "radius": 3000
      }
    ]
  },

  // 14. 合肥 - 创新高地
  "hefei": {
    "name": "合肥",
    "center": [117.2272, 31.8206],
    "shelters": [
      {
        "id": "hf_001",
        "name": "合肥淮河路地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [117.2872, 31.8706],
        "capacity": "5000人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁1号线大东门站",
        "address": "合肥市庐阳区淮河路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "hf_002",
        "name": "合肥南站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.2872, 31.8006],
        "capacity": "6500人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "合肥南站地下",
        "address": "合肥市包河区龙川路",
        "description": "安徽最大高铁枢纽人防工程"
      },
      {
        "id": "hf_003",
        "name": "合肥新桥机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [116.9972, 31.9806],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "新桥机场航站楼地下",
        "address": "合肥市蜀山区机场路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "hf_004",
        "name": "合肥科学岛地下防护工程",
        "type": "government",
        "level": "核5级",
        "position": [117.1672, 31.8606],
        "capacity": "4500人",
        "facilities": "科研基地人防工程、应急指挥系统、数据中心",
        "access": "科学岛地下",
        "address": "合肥市蜀山区科学岛路",
        "description": "国家科学中心防护工程"
      },
      {
        "id": "hf_005",
        "name": "合肥滨湖地下避难所",
        "type": "civil",
        "level": "核6级",
        "position": [117.3072, 31.7506],
        "capacity": "5500人",
        "facilities": "新城区人防工程、应急物资储备、医疗站",
        "access": "滨湖地铁站",
        "address": "合肥市包河区滨湖",
        "description": "滨湖区人防设施"
      },
      {
        "id": "hf_006",
        "name": "合肥蜀山地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [117.2272, 31.8506],
        "capacity": "4500人",
        "facilities": "城区人防工程、应急供电、发电设备",
        "access": "蜀山地铁站",
        "address": "合肥市蜀山区长江西路",
        "description": "蜀山区人防设施"
      },
      {
        "id": "hf_007",
        "name": "合肥瑶海地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.3072, 31.8906],
        "capacity": "4000人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "瑶海地铁站",
        "address": "合肥市瑶海区明光路",
        "description": "瑶海区人防设施"
      },
      {
        "id": "hf_008",
        "name": "合肥站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.3072, 31.8806],
        "capacity": "5000人",
        "facilities": "铁路枢纽防护设施、应急供电、通风系统",
        "access": "合肥站地下",
        "address": "合肥市瑶海区站前路",
        "description": "合肥老火车站人防工程"
      },
      {
        "id": "hf_009",
        "name": "合肥高新地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [117.1472, 31.8306],
        "capacity": "4500人",
        "facilities": "高新区人防工程、智能监控系统、应急物资库",
        "access": "高新地铁站",
        "address": "合肥市高新区科学大道",
        "description": "高新区人防设施"
      },
      {
        "id": "hf_010",
        "name": "合肥经开地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [117.2072, 31.7906],
        "capacity": "4000人",
        "facilities": "工业区人防工程、应急供水、医疗点",
        "access": "经开地铁站",
        "address": "合肥市经开区繁华大道",
        "description": "经开区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "hf_t001",
        "name": "合肥新桥国际机场",
        "type": "transport",
        "position": [116.9972, 31.9806],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "hf_t002",
        "name": "合肥南站",
        "type": "transport",
        "position": [117.2872, 31.8006],
        "risk": "high",
        "radius": 3000
      },
      {
        "id": "hf_t003",
        "name": "合肥市政府大楼",
        "type": "government",
        "position": [117.2272, 31.8206],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "hf_t004",
        "name": "合肥科学岛",
        "type": "factory",
        "position": [117.1672, 31.8606],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "hf_t005",
        "name": "合肥自来水厂",
        "type": "water",
        "position": [117.2472, 31.8406],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "hf_t006",
        "name": "合肥500kV变电站",
        "type": "power",
        "position": [117.3272, 31.8606],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "hf_t007",
        "name": "合肥石化基地",
        "type": "chemical",
        "position": [117.3872, 31.9206],
        "risk": "critical",
        "radius": 5000
      }
    ]
  },

  // 15. 青岛 - 东方瑞士
  "qingdao": {
    "name": "青岛",
    "center": [120.3827, 36.0671],
    "shelters": [
      {
        "id": "qd_001",
        "name": "青岛五四广场地下人防工程",
        "type": "underground_mall",
        "level": "核6级",
        "position": [120.3827, 36.0671],
        "capacity": "5500人",
        "facilities": "三防系统、应急供电、储水设施、医疗站",
        "access": "地铁2/3号线五四广场站",
        "address": "青岛市市南区香港中路",
        "description": "市中心核心人防工程"
      },
      {
        "id": "qd_002",
        "name": "青岛站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.3127, 36.0671],
        "capacity": "5500人",
        "facilities": "铁路枢纽防护设施、应急供电、发电设备",
        "access": "青岛站地下",
        "address": "青岛市市南区泰安路",
        "description": "青岛铁路枢纽人防工程"
      },
      {
        "id": "qd_003",
        "name": "青岛北站地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.3727, 36.1671],
        "capacity": "6000人",
        "facilities": "高铁枢纽防护设施、应急供电、医疗站",
        "access": "青岛北站地下",
        "address": "青岛市李沧区静乐路",
        "description": "青岛高铁枢纽人防工程"
      },
      {
        "id": "qd_004",
        "name": "青岛流亭机场地下指挥中心",
        "type": "nuclear",
        "level": "核5级",
        "position": [120.4027, 36.2671],
        "capacity": "5000人",
        "facilities": "机场应急指挥系统、三防设施、独立通风",
        "access": "流亭机场航站楼地下",
        "address": "青岛市城阳区民航路",
        "description": "航空枢纽防护工程"
      },
      {
        "id": "qd_005",
        "name": "青岛西海岸地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.2027, 35.9671],
        "capacity": "6000人",
        "facilities": "港口城市人防工程、应急物资储备、医疗站",
        "access": "西海岸地铁站",
        "address": "青岛市黄岛区长江中路",
        "description": "西海岸新区人防设施"
      },
      {
        "id": "qd_006",
        "name": "青岛市政府地下指挥所",
        "type": "government",
        "level": "核5级",
        "position": [120.3927, 36.0771],
        "capacity": "4000人",
        "facilities": "政府应急指挥系统、通讯中心、数据中心",
        "access": "市政府地下",
        "address": "青岛市市南区香港中路",
        "description": "市级行政中心防护工程"
      },
      {
        "id": "qd_007",
        "name": "青岛崂山地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.4527, 36.1071],
        "capacity": "4500人",
        "facilities": "山区人防工程、应急供电、发电设备",
        "access": "崂山地铁站",
        "address": "青岛市崂山区秦岭路",
        "description": "崂山区人防设施"
      },
      {
        "id": "qd_008",
        "name": "青岛城阳地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.3827, 36.3071],
        "capacity": "4500人",
        "facilities": "城区人防工程、物资储备、医疗点",
        "access": "城阳地铁站",
        "address": "青岛市城阳区正阳路",
        "description": "城阳区人防设施"
      },
      {
        "id": "qd_009",
        "name": "青岛黄岛地下防护工程",
        "type": "civil",
        "level": "核6级",
        "position": [120.1827, 35.9571],
        "capacity": "5000人",
        "facilities": "港口城市人防工程、智能监控系统、应急物资库",
        "access": "黄岛地铁站",
        "address": "青岛市黄岛区香江路",
        "description": "黄岛区人防设施"
      },
      {
        "id": "qd_010",
        "name": "青岛即墨地下避难所",
        "type": "shelter",
        "level": "核6级",
        "position": [120.4527, 36.3871],
        "capacity": "4000人",
        "facilities": "城区人防工程、应急供电、通风系统",
        "access": "即墨地铁站",
        "address": "青岛市即墨区振华街",
        "description": "即墨区人防设施"
      }
    ],
    "nuclearTargets": [
      {
        "id": "qd_t001",
        "name": "青岛流亭国际机场",
        "type": "transport",
        "position": [120.4027, 36.2671],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "qd_t002",
        "name": "青岛港",
        "type": "port",
        "position": [120.3227, 36.0571],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "qd_t003",
        "name": "青岛市政府大楼",
        "type": "government",
        "position": [120.3927, 36.0771],
        "risk": "critical",
        "radius": 2000
      },
      {
        "id": "qd_t004",
        "name": "青岛胶州湾大桥",
        "type": "bridge",
        "position": [120.2527, 36.2171],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "qd_t005",
        "name": "青岛自来水厂",
        "type": "water",
        "position": [120.3527, 36.0871],
        "risk": "high",
        "radius": 1500
      },
      {
        "id": "qd_t006",
        "name": "青岛500kV变电站",
        "type": "power",
        "position": [120.4327, 36.1271],
        "risk": "high",
        "radius": 2000
      },
      {
        "id": "qd_t007",
        "name": "青岛石化基地",
        "type": "chemical",
        "position": [120.1527, 35.9171],
        "risk": "critical",
        "radius": 5000
      },
      {
        "id": "qd_t008",
        "name": "青岛钢铁集团",
        "type": "factory",
        "position": [120.2227, 36.1171],
        "risk": "high",
        "radius": 3000
      }
    ]
  }
};

module.exports = TIER2_CITIES;
