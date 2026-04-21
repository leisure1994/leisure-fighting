// 核战争城市自救地球仪 - 最终补充数据（6个城市）
// 覆盖剩余地级及以上城市，完成337城全覆盖

const FINAL_BATCH = {
  // 1. 儋州市 (海南地级市)
  "danzhou": {
    "name": "儋州",
    "center": [109.5808, 19.5214],
    "shelters": [
      {
        "id": "dz_001",
        "name": "那大镇地下人防工程",
        "type": "government",
        "position": [109.5808, 19.5214],
        "address": "那大镇市中心",
        "capacity": 3200,
        "level": "核6级",
        "facilities": "市政府附近、深埋12米、三防系统",
        "access": "那大镇公交总站步行5分钟",
        "description": "儋州市人防工程"
      },
      {
        "id": "dz_002",
        "name": "洋浦港地下掩体",
        "type": "government",
        "position": [109.1803, 19.7105],
        "address": "洋浦经济开发区",
        "capacity": 2800,
        "level": "核6级",
        "facilities": "港口区域、物资储备充足",
        "access": "洋浦港公交直达",
        "description": "洋浦港人防设施"
      }
    ],
    "targets": [
      {
        "id": "dz_t001",
        "name": "洋浦港",
        "type": "port",
        "position": [109.1803, 19.7105],
        "radius": 3000,
        "priority": "高",
        "description": "重要港口设施"
      },
      {
        "id": "dz_t002",
        "name": "海南炼化",
        "type": "factory",
        "position": [109.1500, 19.7200],
        "radius": 2000,
        "priority": "极高",
        "description": "大型炼油厂"
      }
    ]
  },

  // 2. 三沙市 (海南地级市)
  "sansha": {
    "name": "三沙",
    "center": [112.3386, 16.8310],
    "shelters": [
      {
        "id": "ss_001",
        "name": "永兴岛地下指挥中心",
        "type": "military",
        "position": [112.3386, 16.8310],
        "address": "永兴岛中心区域",
        "capacity": 1500,
        "level": "核5级",
        "facilities": "军事设施、深埋20米、独立发电",
        "access": "永兴岛码头步行10分钟",
        "description": "三沙市核心人防工程"
      },
      {
        "id": "ss_002",
        "name": "永兴岛民防掩体",
        "type": "shelter",
        "position": [112.3400, 16.8330],
        "address": "永兴岛居民区",
        "capacity": 800,
        "level": "核6级",
        "facilities": "居民疏散用、淡水储备",
        "access": "永兴岛中心广场",
        "description": "岛上民用避难所"
      }
    ],
    "targets": [
      {
        "id": "ss_t001",
        "name": "永兴岛机场",
        "type": "airport",
        "position": [112.3450, 16.8350],
        "radius": 1500,
        "priority": "极高",
        "description": "军民两用机场"
      },
      {
        "id": "ss_t002",
        "name": "三沙市行政中心",
        "type": "government",
        "position": [112.3386, 16.8310],
        "radius": 800,
        "priority": "高",
        "description": "市政府所在地"
      }
    ]
  },

  // 3. 日喀则市 (西藏地级市)
  "rikaze": {
    "name": "日喀则",
    "center": [88.8800, 29.2700],
    "shelters": [
      {
        "id": "rkz_001",
        "name": "桑珠孜区地下掩体",
        "type": "government",
        "position": [88.8800, 29.2700],
        "address": "桑珠孜区中心",
        "capacity": 2500,
        "level": "核6级",
        "facilities": "区中心位置、深埋12米",
        "access": "桑珠孜区公交总站",
        "description": "日喀则市人防工程"
      },
      {
        "id": "rkz_002",
        "name": "扎什伦布寺地下通道",
        "type": "shelter",
        "position": [88.8700, 29.2600],
        "address": "扎什伦布寺附近",
        "capacity": 1800,
        "level": "核6级",
        "facilities": "宗教场所配套、游客疏散用",
        "access": "扎什伦布寺东侧",
        "description": "寺庙应急避难设施"
      }
    ],
    "targets": [
      {
        "id": "rkz_t001",
        "name": "日喀则火车站",
        "type": "transport",
        "position": [88.9000, 29.2800],
        "radius": 1000,
        "priority": "中",
        "description": "拉日铁路终点站"
      },
      {
        "id": "rkz_t002",
        "name": "扎什伦布寺",
        "type": "landmark",
        "position": [88.8700, 29.2600],
        "radius": 500,
        "priority": "低",
        "description": "重要宗教文化地标"
      }
    ]
  },

  // 4. 昌都市 (西藏地级市)
  "changdu": {
    "name": "昌都",
    "center": [97.1800, 31.1300],
    "shelters": [
      {
        "id": "cd_001",
        "name": "卡若区地下人防工程",
        "type": "government",
        "position": [97.1800, 31.1300],
        "address": "卡若区中心",
        "capacity": 2200,
        "level": "核6级",
        "facilities": "区中心、深埋12米、三防系统",
        "access": "卡若区公交总站",
        "description": "昌都市人防工程"
      },
      {
        "id": "cd_002",
        "name": "昌都邦达机场地下掩体",
        "type": "government",
        "position": [97.4300, 30.5500],
        "address": "邦达机场",
        "capacity": 1600,
        "level": "核6级",
        "facilities": "机场配套、海拔4300米",
        "access": "邦达机场航站楼",
        "description": "机场应急避难设施"
      }
    ],
    "targets": [
      {
        "id": "cd_t001",
        "name": "昌都邦达机场",
        "type": "airport",
        "position": [97.4300, 30.5500],
        "radius": 2000,
        "priority": "高",
        "description": "西藏重要机场"
      },
      {
        "id": "cd_t002",
        "name": "澜沧江大桥",
        "type": "bridge",
        "position": [97.2000, 31.1000],
        "radius": 500,
        "priority": "中",
        "description": "川藏公路重要桥梁"
      }
    ]
  },

  // 5. 林芝市 (西藏地级市)
  "linzhi": {
    "name": "林芝",
    "center": [94.3600, 29.6500],
    "shelters": [
      {
        "id": "lz_001",
        "name": "巴宜区地下掩体",
        "type": "government",
        "position": [94.3600, 29.6500],
        "address": "巴宜区中心",
        "capacity": 2000,
        "level": "核6级",
        "facilities": "区中心、深埋12米",
        "access": "巴宜区公交总站",
        "description": "林芝市人防工程"
      },
      {
        "id": "lz_002",
        "name": "林芝米林机场地下掩体",
        "type": "government",
        "position": [94.3400, 29.3000],
        "address": "米林机场",
        "capacity": 1500,
        "level": "核6级",
        "facilities": "机场配套、高海拔适用",
        "access": "米林机场航站楼",
        "description": "机场应急避难设施"
      }
    ],
    "targets": [
      {
        "id": "lz_t001",
        "name": "林芝米林机场",
        "type": "airport",
        "position": [94.3400, 29.3000],
        "radius": 2000,
        "priority": "高",
        "description": "西藏重要机场"
      },
      {
        "id": "lz_t002",
        "name": "雅鲁藏布江水电站",
        "type": "power",
        "position": [94.5000, 29.2000],
        "radius": 2000,
        "priority": "极高",
        "description": "重要水利设施"
      }
    ]
  },

  // 6. 山南市 (西藏地级市)
  "shannan": {
    "name": "山南",
    "center": [91.7700, 29.2300],
    "shelters": [
      {
        "id": "sn_001",
        "name": "乃东区地下人防工程",
        "type": "government",
        "position": [91.7700, 29.2300],
        "address": "乃东区中心",
        "capacity": 1800,
        "level": "核6级",
        "facilities": "区中心、深埋12米",
        "access": "乃东区公交总站",
        "description": "山南市人防工程"
      },
      {
        "id": "sn_002",
        "name": "泽当镇地下掩体",
        "type": "shelter",
        "position": [91.7600, 29.2400],
        "address": "泽当镇中心",
        "capacity": 1200,
        "level": "核6级",
        "facilities": "镇中心位置",
        "access": "泽当镇主干道",
        "description": "泽当镇疏散掩体"
      }
    ],
    "targets": [
      {
        "id": "sn_t001",
        "name": "山南火车站",
        "type": "transport",
        "position": [91.8000, 29.2500],
        "radius": 1000,
        "priority": "中",
        "description": "拉林铁路站点"
      },
      {
        "id": "sn_t002",
        "name": "雍布拉康",
        "type": "landmark",
        "position": [91.7500, 29.2200],
        "radius": 400,
        "priority": "低",
        "description": "西藏第一座宫殿"
      }
    ]
  }
};

// 如果用于Node.js环境，导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FINAL_BATCH;
}
