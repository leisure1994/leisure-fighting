// ============================================
// 核战争城市自救地球仪 - 50城市扩展数据（批次7-最终）
// 西南地区（四川、贵州、云南、西藏）
// ============================================

// 西南地区 - 四川省（除成都外）
const southwestSichuan = {
  // 自贡
  zigong: {
    name: "自贡",
    center: [104.7780, 29.3390],
    shelters: [
      { id: "zg_001", name: "自贡站地下避难所", type: "shelter", position: [104.7780, 29.3390], address: "自贡市自流井区丹桂大街", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "自贡站地下通道", description: "自贡铁路枢纽地下民防工程" },
      { id: "zg_002", name: "自贡市人防地下商城", type: "underground_mall", position: [104.7734, 29.3367], address: "自贡市自流井区五星街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "五星街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "自贡火车站", type: "transport", position: [104.7780, 29.3390], risk: "中" }]
  },

  // 攀枝花
  panzhihua: {
    name: "攀枝花",
    center: [101.7160, 26.5800],
    shelters: [
      { id: "pzh_001", name: "攀枝花站地下避难所", type: "shelter", position: [101.7160, 26.5800], address: "攀枝花市仁和区金江镇", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "攀枝花站地下通道", description: "攀枝花铁路枢纽地下民防工程" },
      { id: "pzh_002", name: "攀枝花南站地下避难所", type: "shelter", position: [101.6567, 26.5234], address: "攀枝花市仁和区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "攀枝花南站地下", description: "高铁枢纽人防工程" },
      { id: "pzh_003", name: "攀枝花市人防地下商城", type: "underground_mall", position: [101.7112, 26.5778], address: "攀枝花市东区炳草岗大街", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "炳草岗大街地下入口", description: "市中心商业区人防工程" },
      { id: "pzh_004", name: "攀钢地下指挥中心", type: "shelter", position: [101.7789, 26.6234], address: "攀枝花市东区", capacity: "4000人", level: "核5级", facilities: "企业应急系统", access: "攀钢地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "攀钢", type: "factory", position: [101.7789, 26.6234], risk: "中" }]
  },

  // 泸州
  luzhou: {
    name: "泸州",
    center: [105.4430, 28.8700],
    shelters: [
      { id: "lz2_001", name: "泸州站地下避难所", type: "shelter", position: [105.4430, 28.8700], address: "泸州市龙马潭区安宁街道", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "泸州站地下通道", description: "泸州铁路枢纽地下民防工程" },
      { id: "lz2_002", name: "泸州市人防地下商城", type: "underground_mall", position: [105.4389, 28.8678], address: "泸州市江阳区江阳中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "江阳中路地下入口", description: "市中心商业区人防工程" },
      { id: "lz2_003", name: "泸州港地下指挥中心", type: "shelter", position: [105.4567, 28.9123], address: "泸州市龙马潭区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "泸州港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "泸州港", type: "port", position: [105.4567, 28.9123], risk: "中" }]
  },

  // 德阳
  deyang2: {
    name: "德阳",
    center: [104.3980, 31.1270],
    shelters: [
      { id: "dy2_001", name: "德阳站地下避难所", type: "shelter", position: [104.3980, 31.1270], address: "德阳市旌阳区黄山路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "德阳站地下通道", description: "德阳铁路枢纽地下民防工程" },
      { id: "dy2_002", name: "德阳市人防地下商城", type: "underground_mall", position: [104.3934, 31.1245], address: "德阳市旌阳区长江东路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "长江东路地下入口", description: "市中心商业区人防工程" },
      { id: "dy2_003", name: "东汽地下指挥中心", type: "shelter", position: [104.4567, 31.1789], address: "德阳市旌阳区", capacity: "3500人", level: "核5级", facilities: "企业应急系统", access: "东汽地下", description: "重点工业企业防护工程" }
    ],
    targets: [{ name: "东汽", type: "factory", position: [104.4567, 31.1789], risk: "中" }]
  },

  // 绵阳
  mianyang: {
    name: "绵阳",
    center: [104.7410, 31.4640],
    shelters: [
      { id: "my_001", name: "绵阳站地下避难所", type: "shelter", position: [104.7410, 31.4640], address: "绵阳市涪城区临园路西段", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "绵阳站地下通道", description: "川北铁路枢纽地下民防工程" },
      { id: "my_002", name: "绵阳北站地下避难所", type: "shelter", position: [104.6234, 31.5567], address: "绵阳市游仙区", capacity: "2000人", level: "核6级", facilities: "铁路枢纽防护设施", access: "绵阳北站地下", description: "铁路枢纽人防工程" },
      { id: "my_003", name: "绵阳市人防地下商城", type: "underground_mall", position: [104.7367, 31.4612], address: "绵阳市涪城区临园路东段", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "临园路东段地下入口", description: "市中心商业区人防工程" },
      { id: "my_004", name: "绵阳科研基地地下指挥中心", type: "shelter", position: [104.8234, 31.4234], address: "绵阳市游仙区", capacity: "4500人", level: "核5级", facilities: "科研基地防护系统", access: "科研基地地下", description: "重要科研设施防护工程" }
    ],
    targets: [{ name: "绵阳科研基地", type: "landmark", position: [104.8234, 31.4234], risk: "高" }]
  },

  // 广元
  guangyuan: {
    name: "广元",
    center: [105.8300, 32.4330],
    shelters: [
      { id: "gy_001", name: "广元站地下避难所", type: "shelter", position: [105.8300, 32.4330], address: "广元市利州区则天路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "广元站地下通道", description: "川陕甘铁路枢纽地下民防工程" },
      { id: "gy_002", name: "广元市人防地下商城", type: "underground_mall", position: [105.8256, 32.4306], address: "广元市利州区嘉陵路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "嘉陵路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "广元火车站", type: "transport", position: [105.8300, 32.4330], risk: "中" }]
  },

  // 遂宁
  suining: {
    name: "遂宁",
    center: [105.5930, 30.5320],
    shelters: [
      { id: "sn_001", name: "遂宁站地下避难所", type: "shelter", position: [105.5930, 30.5320], address: "遂宁市船山区明月路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "遂宁站地下通道", description: "遂宁铁路枢纽地下民防工程" },
      { id: "sn_002", name: "遂宁市人防地下商城", type: "underground_mall", position: [105.5889, 30.5298], address: "遂宁市船山区凯旋路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "凯旋路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "遂宁火车站", type: "transport", position: [105.5930, 30.5320], risk: "中" }]
  },

  // 内江
  neijiang: {
    name: "内江",
    center: [105.0660, 29.5870],
    shelters: [
      { id: "nj_001", name: "内江站地下避难所", type: "shelter", position: [105.0660, 29.5870], address: "内江市市中区壕子口", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "内江站地下通道", description: "内江铁路枢纽地下民防工程" },
      { id: "nj_002", name: "内江北站地下避难所", type: "shelter", position: [105.0567, 29.6234], address: "内江市市中区", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "内江北站地下", description: "高铁枢纽人防工程" },
      { id: "nj_003", name: "内江市人防地下商城", type: "underground_mall", position: [105.0612, 29.5845], address: "内江市市中区玉溪路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "玉溪路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "内江火车站", type: "transport", position: [105.0660, 29.5870], risk: "中" }]
  },

  // 乐山
  leshan: {
    name: "乐山",
    center: [103.7610, 29.5820],
    shelters: [
      { id: "ls3_001", name: "乐山站地下避难所", type: "shelter", position: [103.7610, 29.5820], address: "乐山市市中区宝莲路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "乐山站地下通道", description: "乐山铁路枢纽地下民防工程" },
      { id: "ls3_002", name: "乐山市人防地下商城", type: "underground_mall", position: [103.7567, 29.5798], address: "乐山市市中区嘉定南路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "嘉定南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "乐山火车站", type: "transport", position: [103.7610, 29.5820], risk: "中" }]
  },

  // 南充
  nanchong: {
    name: "南充",
    center: [106.1090, 30.8370],
    shelters: [
      { id: "nc_001", name: "南充站地下避难所", type: "shelter", position: [106.1090, 30.8370], address: "南充市顺庆区铁欣路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "南充站地下通道", description: "川东北铁路枢纽地下民防工程" },
      { id: "nc_002", name: "南充北站地下避难所", type: "shelter", position: [106.1234, 30.8789], address: "南充市顺庆区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "南充北站地下", description: "高铁枢纽人防工程" },
      { id: "nc_003", name: "南充市人防地下商城", type: "underground_mall", position: [106.1045, 30.8345], address: "南充市顺庆区人民中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "南充火车站", type: "transport", position: [106.1090, 30.8370], risk: "中" }]
  },

  // 眉山
  meishan: {
    name: "眉山",
    center: [103.8480, 30.0750],
    shelters: [
      { id: "ms_001", name: "眉山站地下避难所", type: "shelter", position: [103.8480, 30.0750], address: "眉山市东坡区裴城路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "眉山站地下通道", description: "眉山铁路枢纽地下民防工程" },
      { id: "ms_002", name: "眉山市人防地下商城", type: "underground_mall", position: [103.8434, 30.0723], address: "眉山市东坡区三苏路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "三苏路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "眉山火车站", type: "transport", position: [103.8480, 30.0750], risk: "中" }]
  },

  // 宜宾
  yibin: {
    name: "宜宾",
    center: [104.5620, 29.7730],
    shelters: [
      { id: "yb_001", name: "宜宾站地下避难所", type: "shelter", position: [104.5620, 29.7730], address: "宜宾市叙州区蜀南大道", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "宜宾站地下通道", description: "宜宾铁路枢纽地下民防工程" },
      { id: "yb_002", name: "宜宾西站地下避难所", type: "shelter", position: [104.5234, 28.7234], address: "宜宾市叙州区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "宜宾西站地下", description: "高铁枢纽人防工程" },
      { id: "yb_003", name: "宜宾市人防地下商城", type: "underground_mall", position: [104.5578, 29.7706], address: "宜宾市翠屏区人民路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "人民路地下入口", description: "市中心商业区人防工程" },
      { id: "yb_004", name: "宜宾港地下指挥中心", type: "shelter", position: [104.6123, 28.8567], address: "宜宾市翠屏区", capacity: "3000人", level: "核5级", facilities: "港口应急系统", access: "宜宾港地下", description: "重要港口防护工程" }
    ],
    targets: [{ name: "宜宾港", type: "port", position: [104.6123, 28.8567], risk: "中" }]
  },

  // 广安
  guangan: {
    name: "广安",
    center: [106.6330, 30.4560],
    shelters: [
      { id: "ga_001", name: "广安站地下避难所", type: "shelter", position: [106.6330, 30.4560], address: "广安市前锋区前锋镇", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "广安站地下通道", description: "广安铁路枢纽地下民防工程" },
      { id: "ga_002", name: "广安市人防地下商城", type: "underground_mall", position: [106.6289, 30.4534], address: "广安市广安区广宁路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "广宁路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "广安火车站", type: "transport", position: [106.6330, 30.4560], risk: "中" }]
  },

  // 达州
  dazhou: {
    name: "达州",
    center: [107.5030, 31.2090],
    shelters: [
      { id: "dz3_001", name: "达州站地下避难所", type: "shelter", position: [107.5030, 31.2090], address: "达州市通川区朝阳西路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "达州站地下通道", description: "川东铁路枢纽地下民防工程" },
      { id: "dz3_002", name: "达州市人防地下商城", type: "underground_mall", position: [107.4989, 31.2067], address: "达州市通川区来凤路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "来凤路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "达州火车站", type: "transport", position: [107.5030, 31.2090], risk: "中" }]
  },

  // 雅安
  yaan: {
    name: "雅安",
    center: [103.0010, 29.9870],
    shelters: [
      { id: "ya2_001", name: "雅安站地下避难所", type: "shelter", position: [103.0010, 29.9870], address: "雅安市雨城区姚桥路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "雅安站地下通道", description: "雅安铁路枢纽地下民防工程" },
      { id: "ya2_002", name: "雅安市人防地下商城", type: "underground_mall", position: [102.9967, 29.9845], address: "雅安市雨城区少年宫路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "少年宫路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "雅安火车站", type: "transport", position: [103.0010, 29.9870], risk: "中" }]
  },

  // 巴中
  bazhong: {
    name: "巴中",
    center: [106.7430, 31.8690],
    shelters: [
      { id: "bz3_001", name: "巴中站地下避难所", type: "shelter", position: [106.7430, 31.8690], address: "巴中市巴州区北龛大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "巴中站地下通道", description: "巴中铁路枢纽地下民防工程" },
      { id: "bz3_002", name: "巴中市人防地下商城", type: "underground_mall", position: [106.7389, 31.8667], address: "巴中市巴州区江北大道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "江北大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "巴中火车站", type: "transport", position: [106.7430, 31.8690], risk: "低" }]
  },

  // 资阳
  ziyang: {
    name: "资阳",
    center: [104.6270, 30.1310],
    shelters: [
      { id: "zy_001", name: "资阳站地下避难所", type: "shelter", position: [104.6270, 30.1310], address: "资阳市雁江区松涛路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "资阳站地下通道", description: "资阳铁路枢纽地下民防工程" },
      { id: "zy_002", name: "资阳市人防地下商城", type: "underground_mall", position: [104.6223, 30.1289], address: "资阳市雁江区和平路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "和平路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "资阳火车站", type: "transport", position: [104.6270, 30.1310], risk: "中" }]
  },

  // 阿坝
  aba: {
    name: "阿坝",
    center: [102.2210, 31.9000],
    shelters: [
      { id: "ab_001", name: "阿坝州人防地下指挥所", type: "shelter", position: [102.2210, 31.9000], address: "阿坝州马尔康市马尔康镇", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "马尔康镇地下", description: "州行政中心人防工程" }
    ],
    targets: [{ name: "阿坝州政府", type: "landmark", position: [102.2210, 31.9000], risk: "低" }]
  },

  // 甘孜
  ganzi: {
    name: "甘孜",
    center: [101.9640, 30.0500],
    shelters: [
      { id: "gz2_001", name: "甘孜州人防地下指挥所", type: "shelter", position: [101.9640, 30.0500], address: "甘孜州康定市炉城街道", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "康定市地下", description: "州行政中心人防工程" }
    ],
    targets: [{ name: "甘孜州政府", type: "landmark", position: [101.9640, 30.0500], risk: "低" }]
  },

  // 凉山
  liangshan: {
    name: "凉山",
    center: [102.2580, 27.8820],
    shelters: [
      { id: "ls4_001", name: "西昌站地下避难所", type: "shelter", position: [102.2580, 27.8820], address: "凉山州西昌市安宁镇", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "西昌站地下通道", description: "凉山铁路枢纽地下民防工程" },
      { id: "ls4_002", name: "西昌市人防地下商城", type: "underground_mall", position: [102.2534, 27.8798], address: "凉山州西昌市长安中路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "长安中路地下入口", description: "市中心商业区人防工程" },
      { id: "ls4_003", name: "西昌卫星发射中心地下指挥中心", type: "shelter", position: [102.3234, 28.2234], address: "凉山州冕宁县", capacity: "5000人", level: "核5级", facilities: "航天基地防护系统", access: "发射中心地下", description: "重要国防设施防护工程" }
    ],
    targets: [{ name: "西昌卫星发射中心", type: "landmark", position: [102.3234, 28.2234], risk: "高" }]
  }
};

// 西南地区 - 贵州省
const southwestGuizhou = {
  // 遵义
  zunyi: {
    name: "遵义",
    center: [106.9370, 27.7070],
    shelters: [
      { id: "zy2_001", name: "遵义站地下避难所", type: "shelter", position: [106.9370, 27.7070], address: "遵义市红花岗区北京路", capacity: "3500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "遵义站地下通道", description: "黔北铁路枢纽地下民防工程" },
      { id: "zy2_002", name: "遵义南站地下避难所", type: "shelter", position: [106.8567, 27.6234], address: "遵义市播州区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "遵义南站地下", description: "高铁枢纽人防工程" },
      { id: "zy2_003", name: "遵义市人防地下商城", type: "underground_mall", position: [106.9323, 27.7045], address: "遵义市红花岗区中华南路", capacity: "3000人", level: "核6级", facilities: "物资储备、医疗点", access: "中华南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "遵义火车站", type: "transport", position: [106.9370, 27.7070], risk: "中" }]
  },

  // 六盘水
  liupanshui: {
    name: "六盘水",
    center: [104.8320, 26.5930],
    shelters: [
      { id: "lps_001", name: "六盘水站地下避难所", type: "shelter", position: [104.8320, 26.5930], address: "六盘水市钟山区水西路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水", access: "六盘水站地下通道", description: "六盘水铁路枢纽地下民防工程" },
      { id: "lps_002", name: "六盘水市人防地下商城", type: "underground_mall", position: [104.8278, 26.5906], address: "六盘水市钟山区钟山大道", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "钟山大道地下入口", description: "市中心商业区人防工程" },
      { id: "lps_003", name: "六盘水煤矿地下防空洞", type: "shelter", position: [104.8789, 26.6567], address: "六盘水市钟山区", capacity: "4000人", level: "核5级", facilities: "矿井通风系统", access: "矿区地下入口", description: "依托矿井建设的深层防空工程" }
    ],
    targets: [{ name: "六盘水煤矿", type: "factory", position: [104.8789, 26.6567], risk: "中" }]
  },

  // 安顺
  anshun: {
    name: "安顺",
    center: [105.9280, 26.2450],
    shelters: [
      { id: "as2_001", name: "安顺站地下避难所", type: "shelter", position: [105.9280, 26.2450], address: "安顺市西秀区中华南路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "安顺站地下通道", description: "安顺铁路枢纽地下民防工程" },
      { id: "as2_002", name: "安顺市人防地下商城", type: "underground_mall", position: [105.9234, 26.2423], address: "安顺市西秀区塔山东路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "塔山东路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "安顺火车站", type: "transport", position: [105.9280, 26.2450], risk: "中" }]
  },

  // 毕节
  bijie: {
    name: "毕节",
    center: [105.2850, 27.3020],
    shelters: [
      { id: "bj2_001", name: "毕节站地下避难所", type: "shelter", position: [105.2850, 27.3020], address: "毕节市七星关区麻园路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "毕节站地下通道", description: "毕节铁路枢纽地下民防工程" },
      { id: "bj2_002", name: "毕节市人防地下商城", type: "underground_mall", position: [105.2801, 27.2998], address: "毕节市七星关区威宁路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "威宁路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "毕节火车站", type: "transport", position: [105.2850, 27.3020], risk: "中" }]
  },

  // 铜仁
  tongren: {
    name: "铜仁",
    center: [109.1890, 27.7190],
    shelters: [
      { id: "tr_001", name: "铜仁站地下避难所", type: "shelter", position: [109.1890, 27.7190], address: "铜仁市碧江区清水大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "铜仁站地下通道", description: "铜仁铁路枢纽地下民防工程" },
      { id: "tr_002", name: "铜仁南站地下避难所", type: "shelter", position: [109.2567, 27.7567], address: "铜仁市玉屏县", capacity: "2000人", level: "核6级", facilities: "高铁枢纽防护设施", access: "铜仁南站地下", description: "高铁枢纽人防工程" },
      { id: "tr_003", name: "铜仁市人防地下商城", type: "underground_mall", position: [109.1845, 27.7167], address: "铜仁市碧江区中山路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "中山路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "铜仁火车站", type: "transport", position: [109.1890, 27.7190], risk: "中" }]
  },

  // 黔西南
  qianxinan: {
    name: "黔西南",
    center: [104.8940, 25.0920],
    shelters: [
      { id: "qxn_001", name: "兴义站地下避难所", type: "shelter", position: [104.8940, 25.0920], address: "黔西南州兴义市兴义大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "兴义站地下通道", description: "黔西南铁路枢纽地下民防工程" },
      { id: "qxn_002", name: "黔西南州人防地下商城", type: "underground_mall", position: [104.8898, 25.0898], address: "黔西南州兴义市沙井街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "沙井街地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "兴义火车站", type: "transport", position: [104.8940, 25.0920], risk: "中" }]
  },

  // 黔东南
  qiandongnan: {
    name: "黔东南",
    center: [107.9800, 26.5890],
    shelters: [
      { id: "qdn_001", name: "凯里站地下避难所", type: "shelter", position: [107.9800, 26.5890], address: "黔东南州凯里市清江路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "凯里站地下通道", description: "黔东南铁路枢纽地下民防工程" },
      { id: "qdn_002", name: "黔东南州人防地下商城", type: "underground_mall", position: [107.9756, 26.5867], address: "黔东南州凯里市北京东路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "北京东路地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "凯里火车站", type: "transport", position: [107.9800, 26.5890], risk: "中" }]
  },

  // 黔南
  qiannan: {
    name: "黔南",
    center: [107.5170, 26.2580],
    shelters: [
      { id: "qn_001", name: "都匀站地下避难所", type: "shelter", position: [107.5170, 26.2580], address: "黔南州都匀市剑江中路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "都匀站地下通道", description: "黔南铁路枢纽地下民防工程" },
      { id: "qn_002", name: "黔南州人防地下商城", type: "underground_mall", position: [107.5123, 26.2556], address: "黔南州都匀市广惠路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "广惠路地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "都匀火车站", type: "transport", position: [107.5170, 26.2580], risk: "中" }]
  }
};

// 西南地区 - 云南省
const southwestYunnan = {
  // 曲靖
  qujing: {
    name: "曲靖",
    center: [103.7960, 25.5020],
    shelters: [
      { id: "qj_001", name: "曲靖站地下避难所", type: "shelter", position: [103.7960, 25.5020], address: "曲靖市麒麟区建宁西路", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "曲靖站地下通道", description: "云南东部铁路枢纽地下民防工程" },
      { id: "qj_002", name: "曲靖北站地下避难所", type: "shelter", position: [103.8567, 25.5567], address: "曲靖市沾益区", capacity: "2500人", level: "核6级", facilities: "高铁枢纽防护设施", access: "曲靖北站地下", description: "高铁枢纽人防工程" },
      { id: "qj_003", name: "曲靖市人防地下商城", type: "underground_mall", position: [103.7912, 25.4998], address: "曲靖市麒麟区麒麟南路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "麒麟南路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "曲靖火车站", type: "transport", position: [103.7960, 25.5020], risk: "中" }]
  },

  // 玉溪
  yuxi: {
    name: "玉溪",
    center: [102.5440, 24.3510],
    shelters: [
      { id: "yx_001", name: "玉溪站地下避难所", type: "shelter", position: [102.5440, 24.3510], address: "玉溪市红塔区珊瑚路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "玉溪站地下通道", description: "玉溪铁路枢纽地下民防工程" },
      { id: "yx_002", name: "玉溪市人防地下商城", type: "underground_mall", position: [102.5398, 24.3489], address: "玉溪市红塔区南北大街", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "南北大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "玉溪火车站", type: "transport", position: [102.5440, 24.3510], risk: "中" }]
  },

  // 保山
  baoshan: {
    name: "保山",
    center: [99.1680, 25.1120],
    shelters: [
      { id: "bs4_001", name: "保山站地下避难所", type: "shelter", position: [99.1680, 25.1120], address: "保山市隆阳区永昌路", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "保山站地下通道", description: "保山铁路枢纽地下民防工程" },
      { id: "bs4_002", name: "保山市人防地下商城", type: "underground_mall", position: [99.1634, 25.1098], address: "保山市隆阳区正阳北路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "正阳北路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "保山火车站", type: "transport", position: [99.1680, 25.1120], risk: "中" }]
  },

  // 昭通
  zhaotong: {
    name: "昭通",
    center: [103.7170, 27.3380],
    shelters: [
      { id: "zt_001", name: "昭通站地下避难所", type: "shelter", position: [103.7170, 27.3380], address: "昭通市昭阳区昭阳大道", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "昭通站地下通道", description: "昭通铁路枢纽地下民防工程" },
      { id: "zt_002", name: "昭通市人防地下商城", type: "underground_mall", position: [103.7123, 27.3356], address: "昭通市昭阳区凤霞路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "凤霞路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "昭通火车站", type: "transport", position: [103.7170, 27.3380], risk: "中" }]
  },

  // 丽江
  lijiang: {
    name: "丽江",
    center: [100.2330, 26.8720],
    shelters: [
      { id: "lj_001", name: "丽江站地下避难所", type: "shelter", position: [100.2330, 26.8720], address: "丽江市玉龙县黄山镇", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "丽江站地下通道", description: "丽江铁路枢纽地下民防工程" },
      { id: "lj_002", name: "丽江市人防地下商城", type: "underground_mall", position: [100.2289, 26.8698], address: "丽江市古城区民主路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "民主路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "丽江火车站", type: "transport", position: [100.2330, 26.8720], risk: "中" }]
  },

  // 普洱
  puer: {
    name: "普洱",
    center: [100.9660, 22.7930],
    shelters: [
      { id: "pe_001", name: "普洱站地下避难所", type: "shelter", position: [100.9660, 22.7930], address: "普洱市思茅区茶城大道", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "普洱站地下通道", description: "普洱铁路枢纽地下民防工程" },
      { id: "pe_002", name: "普洱市人防地下商城", type: "underground_mall", position: [100.9612, 22.7906], address: "普洱市思茅区振兴大道", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "振兴大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "普洱火车站", type: "transport", position: [100.9660, 22.7930], risk: "低" }]
  },

  // 临沧
  lincang: {
    name: "临沧",
    center: [100.0880, 23.8840],
    shelters: [
      { id: "lc2_001", name: "临沧站地下避难所", type: "shelter", position: [100.0880, 23.8840], address: "临沧市临翔区忙畔街道", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "临沧站地下通道", description: "临沧铁路枢纽地下民防工程" },
      { id: "lc2_002", name: "临沧市人防地下商城", type: "underground_mall", position: [100.0834, 23.8812], address: "临沧市临翔区南塘街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "南塘街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "临沧火车站", type: "transport", position: [100.0880, 23.8840], risk: "低" }]
  },

  // 楚雄
  chuxiong: {
    name: "楚雄",
    center: [101.5440, 25.0440],
    shelters: [
      { id: "cx_001", name: "楚雄站地下避难所", type: "shelter", position: [101.5440, 25.0440], address: "楚雄州楚雄市鹿城南路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "楚雄站地下通道", description: "楚雄铁路枢纽地下民防工程" },
      { id: "cx_002", name: "楚雄州人防地下商城", type: "underground_mall", position: [101.5398, 25.0418], address: "楚雄州楚雄市鹿城东路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "鹿城东路地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "楚雄火车站", type: "transport", position: [101.5440, 25.0440], risk: "中" }]
  },

  // 红河
  honghe: {
    name: "红河",
    center: [103.3730, 23.3690],
    shelters: [
      { id: "hh3_001", name: "蒙自站地下避难所", type: "shelter", position: [103.3730, 23.3690], address: "红河州蒙自市雨过铺镇", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "蒙自站地下通道", description: "红河铁路枢纽地下民防工程" },
      { id: "hh3_002", name: "红河州人防地下商城", type: "underground_mall", position: [103.3689, 23.3667], address: "红河州蒙自市天马路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "天马路地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "蒙自火车站", type: "transport", position: [103.3730, 23.3690], risk: "中" }]
  },

  // 文山
  wenshan: {
    name: "文山",
    center: [104.2330, 23.3710],
    shelters: [
      { id: "ws_001", name: "文山州人防地下商城", type: "underground_mall", position: [104.2289, 23.3689], address: "文山州文山市开化中路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "开化中路地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "文山州政府", type: "landmark", position: [104.2330, 23.3710], risk: "低" }]
  },

  // 西双版纳
  xishuangbanna: {
    name: "西双版纳",
    center: [100.7960, 22.0080],
    shelters: [
      { id: "xsbn_001", name: "西双版纳站地下避难所", type: "shelter", position: [100.7960, 22.0080], address: "西双版纳州景洪市勐罕路", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "西双版纳站地下通道", description: "西双版纳铁路枢纽地下民防工程" },
      { id: "xsbn_002", name: "西双版纳州人防地下商城", type: "underground_mall", position: [100.7912, 22.0056], address: "西双版纳州景洪市宣慰大道", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "宣慰大道地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "西双版纳火车站", type: "transport", position: [100.7960, 22.0080], risk: "中" }]
  },

  // 大理
  dali: {
    name: "大理",
    center: [100.2300, 25.5890],
    shelters: [
      { id: "dl_001", name: "大理站地下避难所", type: "shelter", position: [100.2300, 25.5890], address: "大理州大理市巍山路", capacity: "2500人", level: "核6级", facilities: "通风系统、应急供水、发电设备", access: "大理站地下通道", description: "大理铁路枢纽地下民防工程" },
      { id: "dl_002", name: "大理市人防地下商城", type: "underground_mall", position: [100.2256, 25.5867], address: "大理州大理市苍山路", capacity: "2000人", level: "核6级", facilities: "物资储备、医疗点", access: "苍山路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "大理火车站", type: "transport", position: [100.2300, 25.5890], risk: "中" }]
  },

  // 德宏
  dehong: {
    name: "德宏",
    center: [98.5780, 24.4370],
    shelters: [
      { id: "dh_001", name: "德宏州人防地下商城", type: "underground_mall", position: [98.5734, 24.4345], address: "德宏州芒市团结大街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "团结大街地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "德宏州政府", type: "landmark", position: [98.5780, 24.4370], risk: "低" }]
  },

  // 怒江
  nujiang: {
    name: "怒江",
    center: [98.8540, 25.8510],
    shelters: [
      { id: "nj2_001", name: "怒江州人防地下商城", type: "underground_mall", position: [98.8498, 25.8489], address: "怒江州泸水市六库镇", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "六库镇地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "怒江州政府", type: "landmark", position: [98.8540, 25.8510], risk: "低" }]
  },

  // 迪庆
  diqing: {
    name: "迪庆",
    center: [99.7060, 27.8230],
    shelters: [
      { id: "dq4_001", name: "迪庆州人防地下商城", type: "underground_mall", position: [99.7012, 27.8206], address: "迪庆州香格里拉市长征大道", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "长征大道地下入口", description: "州府所在地人防工程" }
    ],
    targets: [{ name: "迪庆州政府", type: "landmark", position: [99.7060, 27.8230], risk: "低" }]
  }
};

// 西南地区 - 西藏
const southwestXizang = {
  // 拉萨
  lhasa: {
    name: "拉萨",
    center: [91.1400, 29.6500],
    shelters: [
      { id: "ls5_001", name: "拉萨站地下避难所", type: "shelter", position: [91.1400, 29.6500], address: "拉萨市堆龙德庆区", capacity: "3000人", level: "核6级", facilities: "通风系统、应急供水、发电设备、医疗站", access: "拉萨站地下通道", description: "西藏铁路枢纽地下民防工程" },
      { id: "ls5_002", name: "拉萨市人防地下商城", type: "underground_mall", position: [91.1356, 29.6478], address: "拉萨市城关区北京中路", capacity: "2500人", level: "核6级", facilities: "物资储备、医疗点", access: "北京中路地下入口", description: "市中心商业区人防工程" },
      { id: "ls5_003", name: "布达拉宫地下防空洞", type: "shelter", position: [91.1178, 29.6578], address: "拉萨市城关区北京中路", capacity: "2000人", level: "核5级", facilities: "历史建筑防护系统", access: "布达拉宫地下", description: "重要历史文化遗产防护工程" }
    ],
    targets: [{ name: "布达拉宫", type: "landmark", position: [91.1178, 29.6578], risk: "中" }]
  },

  // 日喀则
  rikaze: {
    name: "日喀则",
    center: [88.8850, 29.2670],
    shelters: [
      { id: "rkz_001", name: "日喀则站地下避难所", type: "shelter", position: [88.8850, 29.2670], address: "日喀则市桑珠孜区", capacity: "2000人", level: "核6级", facilities: "通风系统、应急供水", access: "日喀则站地下通道", description: "日喀则铁路枢纽地下民防工程" },
      { id: "rkz_002", name: "日喀则市人防地下商城", type: "underground_mall", position: [88.8801, 29.2645], address: "日喀则市桑珠孜区山东路", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "山东路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "日喀则火车站", type: "transport", position: [88.8850, 29.2670], risk: "中" }]
  },

  // 昌都
  changdu: {
    name: "昌都",
    center: [97.1730, 31.1430],
    shelters: [
      { id: "cd3_001", name: "昌都市人防地下商城", type: "underground_mall", position: [97.1689, 31.1406], address: "昌都市卡若区茶马广场", capacity: "1500人", level: "核6级", facilities: "应急物资储备", access: "茶马广场地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "昌都市政府", type: "landmark", position: [97.1730, 31.1430], risk: "低" }]
  },

  // 林芝
  linzhi: {
    name: "林芝",
    center: [94.3620, 29.6480],
    shelters: [
      { id: "lz3_001", name: "林芝站地下避难所", type: "shelter", position: [94.3620, 29.6480], address: "林芝市巴宜区", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "林芝站地下通道", description: "林芝铁路枢纽地下民防工程" },
      { id: "lz3_002", name: "林芝市人防地下商城", type: "underground_mall", position: [94.3578, 29.6456], address: "林芝市巴宜区八一大街", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "八一大街地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "林芝火车站", type: "transport", position: [94.3620, 29.6480], risk: "低" }]
  },

  // 山南
  shannan: {
    name: "山南",
    center: [91.7660, 29.2360],
    shelters: [
      { id: "sn2_001", name: "山南市人防地下商城", type: "underground_mall", position: [91.7612, 29.2334], address: "山南市乃东区泽当大道", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "泽当大道地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "山南市政府", type: "landmark", position: [91.7660, 29.2360], risk: "低" }]
  },

  // 那曲
  naqu: {
    name: "那曲",
    center: [92.0510, 31.4760],
    shelters: [
      { id: "nq_001", name: "那曲站地下避难所", type: "shelter", position: [92.0510, 31.4760], address: "那曲市色尼区", capacity: "1500人", level: "核6级", facilities: "通风系统、应急供水", access: "那曲站地下通道", description: "那曲铁路枢纽地下民防工程" },
      { id: "nq_002", name: "那曲市人防地下商城", type: "underground_mall", position: [92.0467, 31.4734], address: "那曲市色尼区浙江中路", capacity: "1000人", level: "核6级", facilities: "应急物资储备", access: "浙江中路地下入口", description: "市中心商业区人防工程" }
    ],
    targets: [{ name: "那曲火车站", type: "transport", position: [92.0510, 31.4760], risk: "低" }]
  },

  // 阿里
  ali: {
    name: "阿里",
    center: [80.1050, 32.5030],
    shelters: [
      { id: "al_001", name: "阿里地区人防地下指挥所", type: "shelter", position: [80.1050, 32.5030], address: "阿里地区噶尔县狮泉河镇", capacity: "800人", level: "核6级", facilities: "应急物资储备", access: "狮泉河镇地下", description: "地区行政中心人防工程" }
    ],
    targets: [{ name: "阿里地区政府", type: "landmark", position: [80.1050, 32.5030], risk: "低" }]
  }
};

// 导出所有城市数据
module.exports = {
  ...southwestSichuan,
  ...southwestGuizhou,
  ...southwestYunnan,
  ...southwestXizang
};
