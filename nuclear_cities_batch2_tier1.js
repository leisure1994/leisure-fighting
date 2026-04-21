// 核战争城市自救地球仪 - 第二批15个新一线城市数据
// 生成时间: 2026-04-17
// 覆盖: 成都、杭州、武汉、南京、天津、苏州、西安、长沙、郑州、东莞、青岛、昆明、宁波、合肥、佛山

const NUCLEAR_CITIES_BATCH2_TIER1 = {
  // ==================== 1. 成都 ====================
  sichuan_chengdu: {
    name: "成都",
    center: [104.0665, 30.5723],
    shelters: [
      {
        id: "cd_001",
        name: "天府广场地下避难所",
        type: "underground_mall",
        position: [104.0665, 30.6574],
        address: "成都市青羊区人民南路一段",
        capacity: "8000人",
        level: "核5级",
        facilities: "三防通风系统、应急发电、储备水粮、医疗救护站、通信指挥",
        access: "天府广场地铁站C/D出口，地下商城入口",
        description: "成都市中心最大地下人防工程，连接地铁站和商业区"
      },
      {
        id: "cd_002",
        name: "春熙路地铁站",
        type: "subway",
        position: [104.0812, 30.6556],
        address: "成都市锦江区春熙路",
        capacity: "5000人",
        level: "核6级",
        facilities: "应急照明、通风系统、饮用水储备、应急广播",
        access: "春熙路地铁站各出入口",
        description: "成都最繁华商业区地铁节点"
      },
      {
        id: "cd_003",
        name: "成都东站地下避难所",
        type: "shelter",
        position: [104.1134, 30.6296],
        address: "成都市成华区青衣江路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备、医疗站",
        access: "成都东站地下一层人防区域",
        description: "西南最大铁路枢纽地下民防工程"
      },
      {
        id: "cd_004",
        name: "成都站地下避难所",
        type: "shelter",
        position: [104.0734, 30.6956],
        address: "成都市金牛区二环路北三段",
        capacity: "4500人",
        level: "核6级",
        facilities: "通风系统、应急供水、发电设备、医疗救护",
        access: "成都站地下通道",
        description: "成都老火车站地下民防工程"
      },
      {
        id: "cd_005",
        name: "四川大学地下人防工程",
        type: "shelter",
        position: [104.0867, 30.6312],
        address: "成都市武侯区一环路南一段24号",
        capacity: "3500人",
        level: "核6级",
        facilities: "教学区防护、应急物资、医疗点",
        access: "四川大学望江校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "cd_006",
        name: "双流机场地下避难所",
        type: "shelter",
        position: [103.9567, 30.5789],
        address: "成都市双流区机场路",
        capacity: "5000人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "双流机场T2航站楼地下",
        description: "重要交通枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "成都双流国际机场",
        type: "transport",
        position: [103.9567, 30.5789],
        risk: "高",
        radius: 2000
      },
      {
        name: "成都东站",
        type: "transport",
        position: [104.1134, 30.6296],
        risk: "中",
        radius: 1500
      },
      {
        name: "四川化工厂",
        type: "chemical",
        position: [104.2456, 30.7234],
        risk: "高",
        radius: 3000
      },
      {
        name: "成都自来水厂",
        type: "water_plant",
        position: [104.0567, 30.6134],
        risk: "中",
        radius: 1000
      },
      {
        name: "成都热电厂",
        type: "power_plant",
        position: [104.1234, 30.6567],
        risk: "高",
        radius: 2000
      },
      {
        name: "成都市政府",
        type: "government",
        position: [104.0665, 30.6574],
        risk: "中",
        radius: 800
      },
      {
        name: "成都军区",
        type: "military",
        position: [104.0345, 30.6456],
        risk: "高",
        radius: 1500
      },
      {
        name: "西南油气田储配站",
        type: "storage",
        position: [104.1567, 30.5567],
        risk: "高",
        radius: 2500
      }
    ]
  },

  // ==================== 2. 杭州 ====================
  zhejiang_hangzhou: {
    name: "杭州",
    center: [120.1551, 30.2741],
    shelters: [
      {
        id: "hz_001",
        name: "龙翔桥地下避难所",
        type: "underground_mall",
        position: [120.1656, 30.2589],
        address: "杭州市上城区延安路",
        capacity: "7000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "龙翔桥地铁站D出口，工联CC地下",
        description: "西湖景区核心区人防工程"
      },
      {
        id: "hz_002",
        name: "杭州东站地下避难所",
        type: "shelter",
        position: [120.2067, 30.2934],
        address: "杭州市江干区全福桥路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "杭州东站地下一层人防区",
        description: "华东最大铁路枢纽地下民防工程"
      },
      {
        id: "hz_003",
        name: "西湖文化广场地铁站",
        type: "subway",
        position: [120.1734, 30.2789],
        address: "杭州市下城区中山北路",
        capacity: "4000人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "西湖文化广场地铁站各出口",
        description: "市中心交通枢纽地下节点"
      },
      {
        id: "hz_004",
        name: "城站地下避难所",
        type: "shelter",
        position: [120.1767, 30.2456],
        address: "杭州市上城区环城东路",
        capacity: "4500人",
        level: "核6级",
        facilities: "铁路枢纽防护、通风系统、应急供水",
        access: "杭州站地下通道",
        description: "杭州老火车站地下民防工程"
      },
      {
        id: "hz_005",
        name: "浙江大学地下人防工程",
        type: "shelter",
        position: [120.0867, 30.3089],
        address: "杭州市西湖区浙大路38号",
        capacity: "5000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "浙江大学玉泉校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "hz_006",
        name: "萧山机场地下避难所",
        type: "shelter",
        position: [120.4345, 30.2296],
        address: "杭州市萧山区机场路",
        capacity: "5500人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "萧山机场T3/T4航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "杭州萧山国际机场",
        type: "transport",
        position: [120.4345, 30.2296],
        risk: "高",
        radius: 2000
      },
      {
        name: "杭州东站",
        type: "transport",
        position: [120.2067, 30.2934],
        risk: "中",
        radius: 1500
      },
      {
        name: "镇海炼化",
        type: "refinery",
        position: [121.7234, 29.9567],
        risk: "高",
        radius: 3500
      },
      {
        name: "杭州自来水厂",
        type: "water_plant",
        position: [120.1567, 30.3123],
        risk: "中",
        radius: 1000
      },
      {
        name: "杭州热电厂",
        type: "power_plant",
        position: [120.1867, 30.2734],
        risk: "高",
        radius: 2000
      },
      {
        name: "浙江省政府",
        type: "government",
        position: [120.1567, 30.2689],
        risk: "中",
        radius: 800
      },
      {
        name: "杭州军区",
        type: "military",
        position: [120.1234, 30.2567],
        risk: "高",
        radius: 1500
      },
      {
        name: "钱塘江大桥",
        type: "transport",
        position: [120.1567, 30.2012],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 3. 武汉 ====================
  hubei_wuhan: {
    name: "武汉",
    center: [114.3054, 30.5928],
    shelters: [
      {
        id: "wh_001",
        name: "江汉路地下避难所",
        type: "underground_mall",
        position: [114.2912, 30.5876],
        address: "武汉市江汉区江汉路",
        capacity: "8000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "江汉路地铁站，地下商业街入口",
        description: "武汉商业中心最大人防工程"
      },
      {
        id: "wh_002",
        name: "汉口站地下避难所",
        type: "shelter",
        position: [114.2567, 30.6123],
        address: "武汉市江汉区发展大道",
        capacity: "6000人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "汉口站地下一层人防区",
        description: "华中最大铁路枢纽地下民防工程"
      },
      {
        id: "wh_003",
        name: "武汉站地下避难所",
        type: "shelter",
        position: [114.4234, 30.6123],
        address: "武汉市洪山区杨春湖路",
        capacity: "5500人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "武汉站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "wh_004",
        name: "光谷广场地铁站",
        type: "subway",
        position: [114.4067, 30.5067],
        address: "武汉市洪山区珞喻路",
        capacity: "4500人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "光谷广场地铁站各出口",
        description: "光谷核心区地下节点"
      },
      {
        id: "wh_005",
        name: "长江大桥地下隧道",
        type: "tunnel",
        position: [114.3067, 30.5567],
        address: "武汉市武昌区临江大道",
        capacity: "3000人",
        level: "核6级",
        facilities: "隧道防护、通风系统、应急照明",
        access: "长江大桥引桥地下入口",
        description: "过江隧道人防工程"
      },
      {
        id: "wh_006",
        name: "武汉大学地下人防工程",
        type: "shelter",
        position: [114.3567, 30.5367],
        address: "武汉市武昌区珞珈山",
        capacity: "4000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "武汉大学珞珈山校区地下",
        description: "高校集中区域人防工程"
      }
    ],
    targets: [
      {
        name: "武汉天河国际机场",
        type: "transport",
        position: [114.2067, 30.7834],
        risk: "高",
        radius: 2000
      },
      {
        name: "武汉长江大桥",
        type: "transport",
        position: [114.3067, 30.5567],
        risk: "中",
        radius: 1000
      },
      {
        name: "汉口站",
        type: "transport",
        position: [114.2567, 30.6123],
        risk: "中",
        radius: 1500
      },
      {
        name: "武汉热电厂",
        type: "power_plant",
        position: [114.3567, 30.6234],
        risk: "高",
        radius: 2000
      },
      {
        name: "武钢集团",
        type: "factory",
        position: [114.4234, 30.6234],
        risk: "高",
        radius: 3000
      },
      {
        name: "武汉石化",
        type: "refinery",
        position: [114.2567, 30.6734],
        risk: "高",
        radius: 3500
      },
      {
        name: "武汉市自来水厂",
        type: "water_plant",
        position: [114.3234, 30.5967],
        risk: "中",
        radius: 1000
      },
      {
        name: "湖北省政府",
        type: "government",
        position: [114.3567, 30.5367],
        risk: "中",
        radius: 800
      }
    ]
  },

  // ==================== 4. 南京 ====================
  jiangsu_nanjing: {
    name: "南京",
    center: [118.7969, 32.0603],
    shelters: [
      {
        id: "nj_001",
        name: "新街口地下避难所",
        type: "underground_mall",
        position: [118.7969, 32.0456],
        address: "南京市玄武区中山路",
        capacity: "9000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "新街口地铁站，德基广场地下",
        description: "南京商业中心最大人防工程"
      },
      {
        id: "nj_002",
        name: "南京站地下避难所",
        type: "shelter",
        position: [118.8067, 32.0912],
        address: "南京市玄武区龙蟠路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "南京站地下一层人防区",
        description: "华东重要铁路枢纽地下民防工程"
      },
      {
        id: "nj_003",
        name: "南京南站地下避难所",
        type: "shelter",
        position: [118.8067, 31.9734],
        address: "南京市雨花台区玉兰路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "南京南站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "nj_004",
        name: "夫子庙地铁站",
        type: "subway",
        position: [118.7969, 32.0234],
        address: "南京市秦淮区建康路",
        capacity: "4000人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "夫子庙地铁站各出口",
        description: "景区核心区地下节点"
      },
      {
        id: "nj_005",
        name: "南京大学地下人防工程",
        type: "shelter",
        position: [118.7734, 32.0567],
        address: "南京市鼓楼区汉口路22号",
        capacity: "4500人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "南京大学鼓楼校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "nj_006",
        name: "禄口机场地下避难所",
        type: "shelter",
        position: [118.8734, 31.7434],
        address: "南京市江宁区禄口街道",
        capacity: "5000人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "禄口机场T1/T2航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "南京禄口国际机场",
        type: "transport",
        position: [118.8734, 31.7434],
        risk: "高",
        radius: 2000
      },
      {
        name: "南京长江大桥",
        type: "transport",
        position: [118.7567, 32.1234],
        risk: "中",
        radius: 1000
      },
      {
        name: "南京站",
        type: "transport",
        position: [118.8067, 32.0912],
        risk: "中",
        radius: 1500
      },
      {
        name: "南京热电厂",
        type: "power_plant",
        position: [118.8234, 32.1234],
        risk: "高",
        radius: 2000
      },
      {
        name: "金陵石化",
        type: "refinery",
        position: [118.7734, 32.1234],
        risk: "高",
        radius: 3500
      },
      {
        name: "南京市自来水厂",
        type: "water_plant",
        position: [118.8067, 32.0567],
        risk: "中",
        radius: 1000
      },
      {
        name: "江苏省政府",
        type: "government",
        position: [118.7969, 32.0603],
        risk: "中",
        radius: 800
      },
      {
        name: "南京军区司令部",
        type: "military",
        position: [118.7834, 32.0467],
        risk: "高",
        radius: 1500
      }
    ]
  },

  // ==================== 5. 天津 ====================
  tianjin: {
    name: "天津",
    center: [117.2009, 39.0842],
    shelters: [
      {
        id: "tj_001",
        name: "天津站地下避难所",
        type: "shelter",
        position: [117.2109, 39.1342],
        address: "天津市河北区东站前广场",
        capacity: "7000人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备、医疗救护",
        access: "天津站地下一层人防区",
        description: "京津城际重要枢纽地下民防工程"
      },
      {
        id: "tj_002",
        name: "津湾广场地下避难所",
        type: "underground_mall",
        position: [117.2109, 39.1242],
        address: "天津市和平区解放北路",
        capacity: "8000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "津湾广场地铁站，地下商业街入口",
        description: "天津站前广场地下人防工程"
      },
      {
        id: "tj_003",
        name: "天津西站地下避难所",
        type: "shelter",
        position: [117.1567, 39.1567],
        address: "天津市红桥区西站前街",
        capacity: "5500人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "天津西站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "tj_004",
        name: "小白楼地铁站",
        type: "subway",
        position: [117.2209, 39.1142],
        address: "天津市和平区南京路",
        capacity: "4500人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "小白楼地铁站各出口",
        description: "CBD核心区地下节点"
      },
      {
        id: "tj_005",
        name: "南开大学地下人防工程",
        type: "shelter",
        position: [117.1709, 39.1042],
        address: "天津市南开区卫津路94号",
        capacity: "5000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "南开大学八里台校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "tj_006",
        name: "滨海新区地下人防工程",
        type: "shelter",
        position: [117.7209, 39.0042],
        address: "天津市滨海新区中心商务区",
        capacity: "6000人",
        level: "核5级",
        facilities: "商务区防护、独立发电、物资储备",
        access: "滨海新区中心商务区地下",
        description: "滨海新区核心人防工程"
      }
    ],
    targets: [
      {
        name: "天津滨海国际机场",
        type: "transport",
        position: [117.3567, 39.1234],
        risk: "高",
        radius: 2000
      },
      {
        name: "天津港",
        type: "port",
        position: [117.7567, 38.9567],
        risk: "高",
        radius: 2500
      },
      {
        name: "天津站",
        type: "transport",
        position: [117.2109, 39.1342],
        risk: "中",
        radius: 1500
      },
      {
        name: "大港油田",
        type: "refinery",
        position: [117.4567, 38.8567],
        risk: "高",
        radius: 3500
      },
      {
        name: "天津石化",
        type: "refinery",
        position: [117.4567, 38.9234],
        risk: "高",
        radius: 3500
      },
      {
        name: "天津热电厂",
        type: "power_plant",
        position: [117.2567, 39.0567],
        risk: "高",
        radius: 2000
      },
      {
        name: "天津市政府",
        type: "government",
        position: [117.2009, 39.0842],
        risk: "中",
        radius: 800
      },
      {
        name: "渤海石油储运基地",
        type: "storage",
        position: [117.6567, 38.9567],
        risk: "高",
        radius: 3000
      }
    ]
  },

  // ==================== 6. 苏州 ====================
  jiangsu_suzhou: {
    name: "苏州",
    center: [120.5853, 31.2989],
    shelters: [
      {
        id: "sz_001",
        name: "观前街地下避难所",
        type: "underground_mall",
        position: [120.6234, 31.3167],
        address: "苏州市姑苏区观前街",
        capacity: "6000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "观前街地铁站，地下商业街入口",
        description: "苏州古城商业中心人防工程"
      },
      {
        id: "sz_002",
        name: "苏州站地下避难所",
        type: "shelter",
        position: [120.6134, 31.3367],
        address: "苏州市姑苏区苏站路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "苏州站地下一层人防区",
        description: "苏州铁路枢纽地下民防工程"
      },
      {
        id: "sz_003",
        name: "苏州北站地下避难所",
        type: "shelter",
        position: [120.6467, 31.4234],
        address: "苏州市相城区南天成路",
        capacity: "5000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "苏州北站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "sz_004",
        name: "金鸡湖地下避难所",
        type: "underground_mall",
        position: [120.7367, 31.3167],
        address: "苏州市工业园区苏州大道",
        capacity: "5000人",
        level: "核6级",
        facilities: "商务区防护、应急发电、物资储备",
        access: "金鸡湖商务区地下",
        description: "工业园区核心人防工程"
      },
      {
        id: "sz_005",
        name: "苏州大学地下人防工程",
        type: "shelter",
        position: [120.6567, 31.3067],
        address: "苏州市姑苏区十梓街1号",
        capacity: "4000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "苏州大学天赐庄校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "sz_006",
        name: "石路地下商业街避难所",
        type: "underground_mall",
        position: [120.6034, 31.3067],
        address: "苏州市姑苏区广济南路",
        capacity: "3500人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "石路地铁站地下商业街",
        description: "古城商业区地下节点"
      }
    ],
    targets: [
      {
        name: "苏州火车站",
        type: "transport",
        position: [120.6134, 31.3367],
        risk: "中",
        radius: 1500
      },
      {
        name: "苏州港",
        type: "port",
        position: [120.6567, 31.2567],
        risk: "中",
        radius: 2000
      },
      {
        name: "苏州工业园区电厂",
        type: "power_plant",
        position: [120.7367, 31.3267],
        risk: "高",
        radius: 2000
      },
      {
        name: "苏州市自来水厂",
        type: "water_plant",
        position: [120.6234, 31.3267],
        risk: "中",
        radius: 1000
      },
      {
        name: "苏州化工园区",
        type: "chemical",
        position: [120.7067, 31.2834],
        risk: "高",
        radius: 3000
      },
      {
        name: "苏州市政府",
        type: "government",
        position: [120.5853, 31.2989],
        risk: "中",
        radius: 800
      },
      {
        name: "苏州变电站",
        type: "power_grid",
        position: [120.6267, 31.3467],
        risk: "中",
        radius: 1500
      }
    ]
  },

  // ==================== 7. 西安 ====================
  shaanxi_xian: {
    name: "西安",
    center: [108.9398, 34.3416],
    shelters: [
      {
        id: "xa_001",
        name: "钟楼地下避难所",
        type: "underground_mall",
        position: [108.9467, 34.2616],
        address: "西安市碑林区东大街",
        capacity: "8000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "钟楼地铁站，开元商城地下",
        description: "西安古城中心最大人防工程"
      },
      {
        id: "xa_002",
        name: "西安站地下避难所",
        type: "shelter",
        position: [108.9567, 34.2816],
        address: "西安市新城区环城北路",
        capacity: "6000人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "西安站地下一层人防区",
        description: "西北最大铁路枢纽地下民防工程"
      },
      {
        id: "xa_003",
        name: "西安北站地下避难所",
        type: "shelter",
        position: [108.9367, 34.3816],
        address: "西安市未央区元朔路",
        capacity: "5500人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "西安北站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "xa_004",
        name: "大雁塔地铁站",
        type: "subway",
        position: [108.9667, 34.2216],
        address: "西安市雁塔区小寨东路",
        capacity: "4500人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "大雁塔地铁站各出口",
        description: "景区核心区地下节点"
      },
      {
        id: "xa_005",
        name: "西安交通大学地下人防工程",
        type: "shelter",
        position: [108.9867, 34.2516],
        address: "西安市碑林区咸宁西路28号",
        capacity: "5000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "西安交通大学兴庆校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "xa_006",
        name: "小寨地下人防工程",
        type: "underground_mall",
        position: [108.9467, 34.2216],
        address: "西安市雁塔区长安中路",
        capacity: "5500人",
        level: "核6级",
        facilities: "商业区防护、应急发电、物资储备",
        access: "小寨地铁站地下商业街",
        description: "城南商业中心人防工程"
      }
    ],
    targets: [
      {
        name: "西安咸阳国际机场",
        type: "transport",
        position: [108.7567, 34.4467],
        risk: "高",
        radius: 2000
      },
      {
        name: "西安站",
        type: "transport",
        position: [108.9567, 34.2816],
        risk: "中",
        radius: 1500
      },
      {
        name: "西安热电厂",
        type: "power_plant",
        position: [109.0567, 34.3216],
        risk: "高",
        radius: 2000
      },
      {
        name: "西安自来水厂",
        type: "water_plant",
        position: [108.9067, 34.3616],
        risk: "中",
        radius: 1000
      },
      {
        name: "西安石化",
        type: "refinery",
        position: [109.1067, 34.4216],
        risk: "高",
        radius: 3500
      },
      {
        name: "陕西省政府",
        type: "government",
        position: [108.9398, 34.3416],
        risk: "中",
        radius: 800
      },
      {
        name: "西安军区",
        type: "military",
        position: [108.9067, 34.3216],
        risk: "高",
        radius: 1500
      },
      {
        name: "西安电信枢纽",
        type: "communication",
        position: [108.9767, 34.3716],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 8. 长沙 ====================
  hunan_changsha: {
    name: "长沙",
    center: [112.9388, 28.2282],
    shelters: [
      {
        id: "cs_001",
        name: "五一广场地下避难所",
        type: "underground_mall",
        position: [112.9788, 28.1982],
        address: "长沙市芙蓉区五一大道",
        capacity: "7000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "五一广场地铁站，平和堂地下",
        description: "长沙商业中心最大人防工程"
      },
      {
        id: "cs_002",
        name: "长沙站地下避难所",
        type: "shelter",
        position: [113.0088, 28.1982],
        address: "长沙市芙蓉区车站中路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "长沙站地下一层人防区",
        description: "湖南铁路枢纽地下民防工程"
      },
      {
        id: "cs_003",
        name: "长沙南站地下避难所",
        type: "shelter",
        position: [113.0688, 28.1582],
        address: "长沙市雨花区花侯路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "长沙南站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "cs_004",
        name: "橘子洲地铁站",
        type: "subway",
        position: [112.9588, 28.1782],
        address: "长沙市岳麓区橘子洲",
        capacity: "4000人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "橘子洲地铁站各出口",
        description: "景区核心区地下节点"
      },
      {
        id: "cs_005",
        name: "中南大学地下人防工程",
        type: "shelter",
        position: [112.9288, 28.1782],
        address: "长沙市岳麓区麓山南路",
        capacity: "4500人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "中南大学校本部地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "cs_006",
        name: "黄花机场地下避难所",
        type: "shelter",
        position: [113.2188, 28.1882],
        address: "长沙市长沙县黄花镇",
        capacity: "5000人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "黄花机场T1/T2航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "长沙黄花国际机场",
        type: "transport",
        position: [113.2188, 28.1882],
        risk: "高",
        radius: 2000
      },
      {
        name: "长沙站",
        type: "transport",
        position: [113.0088, 28.1982],
        risk: "中",
        radius: 1500
      },
      {
        name: "长沙热电厂",
        type: "power_plant",
        position: [113.0588, 28.2482],
        risk: "高",
        radius: 2000
      },
      {
        name: "长沙自来水厂",
        type: "water_plant",
        position: [112.9688, 28.2582],
        risk: "中",
        radius: 1000
      },
      {
        name: "巴陵石化",
        type: "refinery",
        position: [113.1688, 28.2982],
        risk: "高",
        radius: 3500
      },
      {
        name: "湖南省政府",
        type: "government",
        position: [112.9388, 28.2282],
        risk: "中",
        radius: 800
      },
      {
        name: "长沙军区",
        type: "military",
        position: [112.9088, 28.2182],
        risk: "高",
        radius: 1500
      },
      {
        name: "湘江大桥",
        type: "transport",
        position: [112.9588, 28.1982],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 9. 郑州 ====================
  henan_zhengzhou: {
    name: "郑州",
    center: [113.6253, 34.7466],
    shelters: [
      {
        id: "zz_001",
        name: "二七广场地下避难所",
        type: "underground_mall",
        position: [113.6653, 34.7266],
        address: "郑州市二七区二七路",
        capacity: "8000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "二七广场地铁站，德化街地下",
        description: "郑州商业中心最大人防工程"
      },
      {
        id: "zz_002",
        name: "郑州站地下避难所",
        type: "shelter",
        position: [113.6553, 34.7566],
        address: "郑州市二七区二马路",
        capacity: "7000人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "郑州站地下一层人防区",
        description: "全国铁路心脏地下民防工程"
      },
      {
        id: "zz_003",
        name: "郑州东站地下避难所",
        type: "shelter",
        position: [113.7453, 34.7666],
        address: "郑州市金水区心怡路",
        capacity: "6500人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "郑州东站地下一层人防区",
        description: "亚洲最大高铁站地下民防工程"
      },
      {
        id: "zz_004",
        name: "紫荆山地铁站",
        type: "subway",
        position: [113.6853, 34.7666],
        address: "郑州市金水区紫荆山路",
        capacity: "4500人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "紫荆山地铁站各出口",
        description: "市中心交通枢纽地下节点"
      },
      {
        id: "zz_005",
        name: "郑州大学地下人防工程",
        type: "shelter",
        position: [113.5453, 34.8166],
        address: "郑州市高新区科学大道",
        capacity: "5000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "郑州大学新校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "zz_006",
        name: "新郑机场地下避难所",
        type: "shelter",
        position: [113.8453, 34.5266],
        address: "郑州市新郑市机场路",
        capacity: "5500人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "新郑机场T2航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "郑州新郑国际机场",
        type: "transport",
        position: [113.8453, 34.5266],
        risk: "高",
        radius: 2000
      },
      {
        name: "郑州站",
        type: "transport",
        position: [113.6553, 34.7566],
        risk: "高",
        radius: 1500
      },
      {
        name: "郑州东站",
        type: "transport",
        position: [113.7453, 34.7666],
        risk: "高",
        radius: 1500
      },
      {
        name: "郑州热电厂",
        type: "power_plant",
        position: [113.7053, 34.7966],
        risk: "高",
        radius: 2000
      },
      {
        name: "郑州自来水厂",
        type: "water_plant",
        position: [113.6253, 34.7766],
        risk: "中",
        radius: 1000
      },
      {
        name: "河南省政府",
        type: "government",
        position: [113.6953, 34.7666],
        risk: "中",
        radius: 800
      },
      {
        name: "郑州军区",
        type: "military",
        position: [113.6153, 34.7366],
        risk: "高",
        radius: 1500
      },
      {
        name: "中原福塔",
        type: "communication",
        position: [113.7353, 34.7166],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 10. 东莞 ====================
  guangdong_dongguan: {
    name: "东莞",
    center: [113.7518, 23.0207],
    shelters: [
      {
        id: "dg_001",
        name: "鸿福路地下避难所",
        type: "underground_mall",
        position: [113.7618, 23.0107],
        address: "东莞市南城街道鸿福路",
        capacity: "6000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "鸿福路地铁站，商业中心地下",
        description: "东莞市中心最大人防工程"
      },
      {
        id: "dg_002",
        name: "虎门站地下避难所",
        type: "shelter",
        position: [113.6718, 22.8207],
        address: "东莞市虎门镇白沙社区",
        capacity: "5500人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "虎门站地下一层人防区",
        description: "广深港高铁枢纽地下民防工程"
      },
      {
        id: "dg_003",
        name: "东莞站地下避难所",
        type: "shelter",
        position: [113.7918, 23.0607],
        address: "东莞市石龙镇西湖社区",
        capacity: "5000人",
        level: "核6级",
        facilities: "铁路枢纽防护、通风系统、应急供水",
        access: "东莞站地下通道",
        description: "东莞铁路枢纽地下民防工程"
      },
      {
        id: "dg_004",
        name: "厚街地下人防工程",
        type: "underground_mall",
        position: [113.7318, 22.9407],
        address: "东莞市厚街镇",
        capacity: "4000人",
        level: "核6级",
        facilities: "商业区防护、应急发电、物资储备",
        access: "厚街商业中心地下",
        description: "厚街商业中心人防工程"
      },
      {
        id: "dg_005",
        name: "松山湖地下避难所",
        type: "shelter",
        position: [113.8918, 22.9007],
        address: "东莞市大朗镇松山湖",
        capacity: "4500人",
        level: "核6级",
        facilities: "科技园区防护、独立发电、物资储备",
        access: "松山湖科技园区地下",
        description: "高科技园区人防工程"
      },
      {
        id: "dg_006",
        name: "长安地下人防工程",
        type: "shelter",
        position: [113.8118, 22.8107],
        address: "东莞市长安镇",
        capacity: "4000人",
        level: "核6级",
        facilities: "工业区防护、应急发电、物资储备",
        access: "长安工业区地下",
        description: "工业重镇人防工程"
      }
    ],
    targets: [
      {
        name: "虎门站",
        type: "transport",
        position: [113.6718, 22.8207],
        risk: "中",
        radius: 1500
      },
      {
        name: "东莞站",
        type: "transport",
        position: [113.7918, 23.0607],
        risk: "中",
        radius: 1500
      },
      {
        name: "东莞发电厂",
        type: "power_plant",
        position: [113.7718, 23.0407],
        risk: "高",
        radius: 2000
      },
      {
        name: "东莞市自来水厂",
        type: "water_plant",
        position: [113.7518, 23.0307],
        risk: "中",
        radius: 1000
      },
      {
        name: "东莞化工园区",
        type: "chemical",
        position: [113.8218, 22.9607],
        risk: "高",
        radius: 3000
      },
      {
        name: "东莞市政府",
        type: "government",
        position: [113.7518, 23.0207],
        risk: "中",
        radius: 800
      },
      {
        name: "虎门大桥",
        type: "transport",
        position: [113.6318, 22.7907],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 11. 青岛 ====================
  shandong_qingdao: {
    name: "青岛",
    center: [120.3826, 36.0671],
    shelters: [
      {
        id: "qd_001",
        name: "五四广场地下避难所",
        type: "underground_mall",
        position: [120.3926, 35.9971],
        address: "青岛市市南区香港中路",
        capacity: "7000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "五四广场地铁站，万象城地下",
        description: "青岛市中心最大人防工程"
      },
      {
        id: "qd_002",
        name: "青岛站地下避难所",
        type: "shelter",
        position: [120.3226, 36.0671],
        address: "青岛市市南区泰安路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "青岛站地下一层人防区",
        description: "青岛铁路枢纽地下民防工程"
      },
      {
        id: "qd_003",
        name: "青岛北站地下避难所",
        type: "shelter",
        position: [120.3826, 36.1671],
        address: "青岛市李沧区静乐路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "青岛北站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "qd_004",
        name: "台东地铁站",
        type: "subway",
        position: [120.3626, 36.0871],
        address: "青岛市市北区台东一路",
        capacity: "4000人",
        level: "核6级",
        facilities: "应急照明、通风、饮用水、医疗点",
        access: "台东地铁站各出口",
        description: "老城区商业中心地下节点"
      },
      {
        id: "qd_005",
        name: "中国海洋大学地下人防工程",
        type: "shelter",
        position: [120.3426, 36.0571],
        address: "青岛市市南区鱼山路5号",
        capacity: "4500人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "中国海洋大学鱼山校区地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "qd_006",
        name: "青岛港地下避难所",
        type: "shelter",
        position: [120.3226, 36.0471],
        address: "青岛市市北区港青路",
        capacity: "5000人",
        level: "核5级",
        facilities: "港口应急指挥、发电系统、通风设备",
        access: "青岛港地下",
        description: "重要港口枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "青岛流亭国际机场",
        type: "transport",
        position: [120.3826, 36.2671],
        risk: "高",
        radius: 2000
      },
      {
        name: "青岛港",
        type: "port",
        position: [120.3226, 36.0471],
        risk: "高",
        radius: 2500
      },
      {
        name: "青岛站",
        type: "transport",
        position: [120.3226, 36.0671],
        risk: "中",
        radius: 1500
      },
      {
        name: "青岛发电厂",
        type: "power_plant",
        position: [120.3626, 36.1271],
        risk: "高",
        radius: 2000
      },
      {
        name: "青岛自来水厂",
        type: "water_plant",
        position: [120.3926, 36.1071],
        risk: "中",
        radius: 1000
      },
      {
        name: "青岛石化",
        type: "refinery",
        position: [120.3026, 36.0271],
        risk: "高",
        radius: 3500
      },
      {
        name: "青岛市政府",
        type: "government",
        position: [120.3826, 36.0671],
        risk: "中",
        radius: 800
      },
      {
        name: "胶州湾大桥",
        type: "transport",
        position: [120.2526, 36.1771],
        risk: "中",
        radius: 1500
      }
    ]
  },

  // ==================== 12. 昆明 ====================
  yunnan_kunming: {
    name: "昆明",
    center: [102.8329, 24.8801],
    shelters: [
      {
        id: "km_001",
        name: "东风广场地下避难所",
        type: "underground_mall",
        position: [102.7229, 25.0401],
        address: "昆明市五华区东风东路",
        capacity: "6000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "东风广场地铁站，恒隆广场地下",
        description: "昆明市中心最大人防工程"
      },
      {
        id: "km_002",
        name: "昆明站地下避难所",
        type: "shelter",
        position: [102.7229, 25.0201],
        address: "昆明市官渡区北京路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "昆明站地下一层人防区",
        description: "云南铁路枢纽地下民防工程"
      },
      {
        id: "km_003",
        name: "昆明南站地下避难所",
        type: "shelter",
        position: [102.8629, 24.8801],
        address: "昆明市呈贡区白龙潭",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "昆明南站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "km_004",
        name: "五华区地下人防工程",
        type: "underground_mall",
        position: [102.7029, 25.0501],
        address: "昆明市五华区人民中路",
        capacity: "4500人",
        level: "核6级",
        facilities: "商业区防护、应急发电、物资储备",
        access: "五华区商业中心地下",
        description: "老城区人防工程"
      },
      {
        id: "km_005",
        name: "云南大学地下人防工程",
        type: "shelter",
        position: [102.7029, 25.0601],
        address: "昆明市五华区翠湖北路2号",
        capacity: "4000人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "云南大学校本部地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "km_006",
        name: "长水机场地下避难所",
        type: "shelter",
        position: [102.9229, 25.1001],
        address: "昆明市官渡区长水村",
        capacity: "5500人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "长水机场航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "昆明长水国际机场",
        type: "transport",
        position: [102.9229, 25.1001],
        risk: "高",
        radius: 2000
      },
      {
        name: "昆明站",
        type: "transport",
        position: [102.7229, 25.0201],
        risk: "中",
        radius: 1500
      },
      {
        name: "昆明发电厂",
        type: "power_plant",
        position: [102.7829, 24.9801],
        risk: "高",
        radius: 2000
      },
      {
        name: "昆明自来水厂",
        type: "water_plant",
        position: [102.7529, 24.9401],
        risk: "中",
        radius: 1000
      },
      {
        name: "云天化",
        type: "chemical",
        position: [102.6629, 24.8401],
        risk: "高",
        radius: 3000
      },
      {
        name: "云南省政府",
        type: "government",
        position: [102.7129, 25.0401],
        risk: "中",
        radius: 800
      },
      {
        name: "昆明军区",
        type: "military",
        position: [102.7329, 25.0301],
        risk: "高",
        radius: 1500
      },
      {
        name: "滇池大桥",
        type: "transport",
        position: [102.6729, 24.9601],
        risk: "中",
        radius: 1000
      }
    ]
  },

  // ==================== 13. 宁波 ====================
  zhejiang_ningbo: {
    name: "宁波",
    center: [121.5500, 29.8750],
    shelters: [
      {
        id: "nb_001",
        name: "天一广场地下避难所",
        type: "underground_mall",
        position: [121.5600, 29.8650],
        address: "宁波市海曙区中山东路",
        capacity: "6500人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "天一广场地铁站，地下商业街入口",
        description: "宁波市中心最大人防工程"
      },
      {
        id: "nb_002",
        name: "宁波站地下避难所",
        type: "shelter",
        position: [121.5400, 29.8550],
        address: "宁波市海曙区南站东路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "宁波站地下一层人防区",
        description: "宁波铁路枢纽地下民防工程"
      },
      {
        id: "nb_003",
        name: "北仑港地下避难所",
        type: "shelter",
        position: [121.8500, 29.9250],
        address: "宁波市北仑区新碶街道",
        capacity: "5000人",
        level: "核5级",
        facilities: "港口应急指挥、发电系统、通风设备",
        access: "北仑港地下",
        description: "重要港口枢纽防护工程"
      },
      {
        id: "nb_004",
        name: "鄞州中心区地下人防工程",
        type: "underground_mall",
        position: [121.5700, 29.8150],
        address: "宁波市鄞州区天童北路",
        capacity: "4000人",
        level: "核6级",
        facilities: "商业区防护、应急发电、物资储备",
        access: "鄞州中心区商业中心地下",
        description: "新城区人防工程"
      },
      {
        id: "nb_005",
        name: "宁波大学地下人防工程",
        type: "shelter",
        position: [121.6200, 29.9050],
        address: "宁波市江北区风华路818号",
        capacity: "4500人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "宁波大学本部地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "nb_006",
        name: "东钱湖地下避难所",
        type: "shelter",
        position: [121.6500, 29.7650],
        address: "宁波市鄞州区东钱湖",
        capacity: "3500人",
        level: "核6级",
        facilities: "景区防护、应急发电、物资储备",
        access: "东钱湖景区地下",
        description: "景区人防工程"
      }
    ],
    targets: [
      {
        name: "宁波栎社国际机场",
        type: "transport",
        position: [121.4700, 29.8250],
        risk: "高",
        radius: 2000
      },
      {
        name: "宁波港",
        type: "port",
        position: [121.8500, 29.9250],
        risk: "高",
        radius: 2500
      },
      {
        name: "宁波站",
        type: "transport",
        position: [121.5400, 29.8550],
        risk: "中",
        radius: 1500
      },
      {
        name: "宁波发电厂",
        type: "power_plant",
        position: [121.5900, 29.8750],
        risk: "高",
        radius: 2000
      },
      {
        name: "镇海炼化",
        type: "refinery",
        position: [121.6700, 29.9350],
        risk: "高",
        radius: 3500
      },
      {
        name: "宁波市政府",
        type: "government",
        position: [121.5500, 29.8750],
        risk: "中",
        radius: 800
      },
      {
        name: "杭州湾大桥",
        type: "transport",
        position: [121.1500, 30.3250],
        risk: "中",
        radius: 1500
      }
    ]
  },

  // ==================== 14. 合肥 ====================
  anhui_hefei: {
    name: "合肥",
    center: [117.2272, 31.8206],
    shelters: [
      {
        id: "hf_001",
        name: "淮河路地下避难所",
        type: "underground_mall",
        position: [117.3072, 31.8606],
        address: "合肥市庐阳区淮河路",
        capacity: "6000人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "淮河路地铁站，地下商业街入口",
        description: "合肥市中心最大人防工程"
      },
      {
        id: "hf_002",
        name: "合肥站地下避难所",
        type: "shelter",
        position: [117.3172, 31.8806],
        address: "合肥市瑶海区站前路",
        capacity: "5500人",
        level: "核5级",
        facilities: "铁路枢纽防护、独立发电、物资储备",
        access: "合肥站地下一层人防区",
        description: "安徽铁路枢纽地下民防工程"
      },
      {
        id: "hf_003",
        name: "合肥南站地下避难所",
        type: "shelter",
        position: [117.2872, 31.8006],
        address: "合肥市包河区龙川路",
        capacity: "6000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "合肥南站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "hf_004",
        name: "政务区地下人防工程",
        type: "underground_mall",
        position: [117.2072, 31.8206],
        address: "合肥市政务区休宁路",
        capacity: "5000人",
        level: "核6级",
        facilities: "政务区防护、应急发电、物资储备",
        access: "政务区地下",
        description: "政务中心人防工程"
      },
      {
        id: "hf_005",
        name: "中国科大地下人防工程",
        type: "shelter",
        position: [117.2672, 31.8406],
        address: "合肥市蜀山区黄山路",
        capacity: "4500人",
        level: "核6级",
        facilities: "校区防护、物资储备、医疗救护",
        access: "中国科学技术大学地下",
        description: "高校集中区域人防工程"
      },
      {
        id: "hf_006",
        name: "新桥机场地下避难所",
        type: "shelter",
        position: [116.9772, 31.9806],
        address: "合肥市蜀山区高刘镇",
        capacity: "5000人",
        level: "核5级",
        facilities: "机场应急指挥、发电系统、通风设备",
        access: "新桥机场航站楼地下",
        description: "重要航空枢纽防护工程"
      }
    ],
    targets: [
      {
        name: "合肥新桥国际机场",
        type: "transport",
        position: [116.9772, 31.9806],
        risk: "高",
        radius: 2000
      },
      {
        name: "合肥站",
        type: "transport",
        position: [117.3172, 31.8806],
        risk: "中",
        radius: 1500
      },
      {
        name: "合肥发电厂",
        type: "power_plant",
        position: [117.2572, 31.7606],
        risk: "高",
        radius: 2000
      },
      {
        name: "合肥自来水厂",
        type: "water_plant",
        position: [117.2272, 31.8406],
        risk: "中",
        radius: 1000
      },
      {
        name: "合肥化工厂",
        type: "chemical",
        position: [117.2872, 31.7406],
        risk: "高",
        radius: 3000
      },
      {
        name: "安徽省政府",
        type: "government",
        position: [117.2272, 31.8206],
        risk: "中",
        radius: 800
      },
      {
        name: "合肥军区",
        type: "military",
        position: [117.1972, 31.8006],
        risk: "高",
        radius: 1500
      },
      {
        name: "合肥变电站",
        type: "power_grid",
        position: [117.2472, 31.8606],
        risk: "中",
        radius: 1500
      }
    ]
  },

  // ==================== 15. 佛山 ====================
  guangdong_foshan: {
    name: "佛山",
    center: [113.1214, 23.0215],
    shelters: [
      {
        id: "fs_001",
        name: "祖庙地下避难所",
        type: "underground_mall",
        position: [113.1214, 23.0315],
        address: "佛山市禅城区祖庙路",
        capacity: "5500人",
        level: "核5级",
        facilities: "三防通风、应急发电、储备物资、医疗救护",
        access: "祖庙地铁站，岭南天地地下",
        description: "佛山市中心最大人防工程"
      },
      {
        id: "fs_002",
        name: "佛山站地下避难所",
        type: "shelter",
        position: [113.1014, 23.0415],
        address: "佛山市禅城区文昌路",
        capacity: "4500人",
        level: "核6级",
        facilities: "铁路枢纽防护、通风系统、应急供水",
        access: "佛山站地下通道",
        description: "佛山铁路枢纽地下民防工程"
      },
      {
        id: "fs_003",
        name: "佛山西站地下避难所",
        type: "shelter",
        position: [113.0514, 23.1215],
        address: "佛山市南海区狮山镇",
        capacity: "5000人",
        level: "核5级",
        facilities: "高铁枢纽防护、独立发电、物资储备",
        access: "佛山西站地下一层人防区",
        description: "高铁站地下民防工程"
      },
      {
        id: "fs_004",
        name: "顺德地下人防工程",
        type: "underground_mall",
        position: [113.2414, 22.8415],
        address: "佛山市顺德区大良街道",
        capacity: "4500人",
        level: "核6级",
        facilities: "商业区防护、应急发电、物资储备",
        access: "顺德大良商业中心地下",
        description: "顺德区核心人防工程"
      },
      {
        id: "fs_005",
        name: "南海地下人防工程",
        type: "shelter",
        position: [113.1414, 23.0415],
        address: "佛山市南海区桂城街道",
        capacity: "4000人",
        level: "核6级",
        facilities: "工业区防护、应急发电、物资储备",
        access: "南海区工业区地下",
        description: "南海工业重镇人防工程"
      },
      {
        id: "fs_006",
        name: "佛山新城地下避难所",
        type: "underground_mall",
        position: [113.1314, 22.9515],
        address: "佛山市顺德区乐从镇",
        capacity: "5000人",
        level: "核6级",
        facilities: "新城防护、应急发电、物资储备",
        access: "佛山新城地下",
        description: "佛山新城核心区人防工程"
      }
    ],
    targets: [
      {
        name: "佛山沙堤机场",
        type: "transport",
        position: [113.0714, 23.0715],
        risk: "中",
        radius: 1500
      },
      {
        name: "佛山站",
        type: "transport",
        position: [113.1014, 23.0415],
        risk: "中",
        radius: 1500
      },
      {
        name: "佛山发电厂",
        type: "power_plant",
        position: [113.1414, 23.0115],
        risk: "高",
        radius: 2000
      },
      {
        name: "佛山自来水厂",
        type: "water_plant",
        position: [113.1114, 23.0315],
        risk: "中",
        radius: 1000
      },
      {
        name: "佛山陶瓷厂",
        type: "factory",
        position: [113.1314, 23.0015],
        risk: "中",
        radius: 2000
      },
      {
        name: "佛山市政府",
        type: "government",
        position: [113.1214, 23.0215],
        risk: "中",
        radius: 800
      },
      {
        name: "顺德港",
        type: "port",
        position: [113.2614, 22.8015],
        risk: "中",
        radius: 2000
      }
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NUCLEAR_CITIES_BATCH2_TIER1;
}
