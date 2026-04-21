// 核战争城市自救地球仪 - 扩展城市数据
// 生成时间: 2026-04-16T14:57:28.326Z
// 城市数: 211
// 避难所数: 548

const ADDITIONAL_CITIES = {
    "anshan": {
        "name": "鞍山",
        "center": [
            123.0248,
            41.1066
        ],
        "shelters": [
            {
                "id": "as_001",
                "name": "鞍山火车站地下避难所",
                "type": "shelter",
                "position": [
                    123.0248,
                    41.1066
                ],
                "address": "鞍山市铁东区建国大道",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "鞍山火车站地下一层",
                "description": "鞍山主要铁路枢纽地下民防工程，战时指挥中心"
            },
            {
                "id": "as_002",
                "name": "鞍山站地铁站",
                "type": "subway",
                "position": [
                    123.0185,
                    41.1082
                ],
                "address": "鞍山市铁东区千山中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "应急照明、通风系统、饮用水储备",
                "access": "鞍山站地铁出入口",
                "description": "鞍山轨道交通重要节点"
            },
            {
                "id": "as_003",
                "name": "鞍山市人防地下商场",
                "type": "underground_mall",
                "position": [
                    123.0156,
                    41.1058
                ],
                "address": "鞍山市铁东区胜利路",
                "capacity": "4000人",
                "level": "核6级",
                "facilities": "物资储备库、医疗救护站、通信设备",
                "access": "胜利路地下通道入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "as_004",
                "name": "鞍山钢铁厂地下指挥所",
                "type": "shelter",
                "position": [
                    123.0512,
                    41.1203
                ],
                "address": "鞍山市立山区鞍钢路",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "独立通风、发电系统、地下水库",
                "access": "鞍钢厂区地下通道",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "鞍山钢铁厂",
                "type": "factory",
                "position": [
                    123.0512,
                    41.1203
                ],
                "risk": "高"
            },
            {
                "name": "鞍山火车站",
                "type": "transport",
                "position": [
                    123.0248,
                    41.1066
                ],
                "risk": "中"
            }
        ]
    },
    "fushun": {
        "name": "抚顺",
        "center": [
            123.9219,
            41.8809
        ],
        "shelters": [
            {
                "id": "fs_001",
                "name": "抚顺火车站地下避难所",
                "type": "shelter",
                "position": [
                    123.9219,
                    41.8809
                ],
                "address": "抚顺市新抚区中央大街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "抚顺火车站地下通道",
                "description": "抚顺铁路枢纽地下民防工程"
            },
            {
                "id": "fs_002",
                "name": "抚顺市人防地下商业街",
                "type": "underground_mall",
                "position": [
                    123.9178,
                    41.8756
                ],
                "address": "抚顺市新抚区东一路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "应急物资储备、医疗点",
                "access": "东一路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "fs_003",
                "name": "抚顺矿务局地下防空洞",
                "type": "shelter",
                "position": [
                    123.9432,
                    41.8923
                ],
                "address": "抚顺市望花区雷锋路",
                "capacity": "6000人",
                "level": "核5级",
                "facilities": "矿井通风系统、地下水储备",
                "access": "矿务局地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "抚顺煤矿",
                "type": "factory",
                "position": [
                    123.9432,
                    41.8923
                ],
                "risk": "高"
            },
            {
                "name": "抚顺石化",
                "type": "factory",
                "position": [
                    123.9567,
                    41.8834
                ],
                "risk": "高"
            }
        ]
    },
    "benxi": {
        "name": "本溪",
        "center": [
            123.7707,
            41.3015
        ],
        "shelters": [
            {
                "id": "bx_001",
                "name": "本溪火车站地下避难所",
                "type": "shelter",
                "position": [
                    123.7707,
                    41.3015
                ],
                "address": "本溪市平山区解放南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "本溪火车站地下",
                "description": "本溪铁路枢纽地下民防工程"
            },
            {
                "id": "bx_002",
                "name": "本溪市人防地下商城",
                "type": "underground_mall",
                "position": [
                    123.7654,
                    41.2987
                ],
                "address": "本溪市平山区站前街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "应急物资、医疗点",
                "access": "站前街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "bx_003",
                "name": "本溪钢铁厂地下人防工程",
                "type": "shelter",
                "position": [
                    123.789,
                    41.3123
                ],
                "address": "本溪市溪湖区本钢路",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "独立供电、供水系统",
                "access": "本钢厂区地下通道",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "本溪钢铁厂",
                "type": "factory",
                "position": [
                    123.789,
                    41.3123
                ],
                "risk": "高"
            }
        ]
    },
    "dandong": {
        "name": "丹东",
        "center": [
            124.3557,
            40.0012
        ],
        "shelters": [
            {
                "id": "dd_001",
                "name": "丹东站地下避难所",
                "type": "shelter",
                "position": [
                    124.3557,
                    40.0012
                ],
                "address": "丹东市振兴区十纬路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "丹东站地下通道",
                "description": "丹东铁路枢纽地下民防工程"
            },
            {
                "id": "dd_002",
                "name": "丹东市人防地下商场",
                "type": "underground_mall",
                "position": [
                    124.3501,
                    39.9987
                ],
                "address": "丹东市振兴区七经街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗救护",
                "access": "七经街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "dd_003",
                "name": "丹东港地下指挥中心",
                "type": "shelter",
                "position": [
                    124.3956,
                    39.9876
                ],
                "address": "丹东市港口区",
                "capacity": "2000人",
                "level": "核5级",
                "facilities": "港口应急指挥系统",
                "access": "丹东港地下",
                "description": "港口重要设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "丹东港",
                "type": "port",
                "position": [
                    124.3956,
                    39.9876
                ],
                "risk": "中"
            },
            {
                "name": "鸭绿江大桥",
                "type": "bridge",
                "position": [
                    124.3967,
                    40.0432
                ],
                "risk": "中"
            }
        ]
    },
    "jinzhou": {
        "name": "锦州",
        "center": [
            121.1308,
            41.119
        ],
        "shelters": [
            {
                "id": "jz_001",
                "name": "锦州站地下避难所",
                "type": "shelter",
                "position": [
                    121.1308,
                    41.119
                ],
                "address": "锦州市凌河区延安路",
                "capacity": "4000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "锦州站地下通道",
                "description": "辽西铁路枢纽地下民防工程"
            },
            {
                "id": "jz_002",
                "name": "锦州南站地铁站",
                "type": "subway",
                "position": [
                    121.1123,
                    41.0987
                ],
                "address": "锦州市太和区渤海大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "锦州南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "jz_003",
                "name": "锦州市人防地下商业街",
                "type": "underground_mall",
                "position": [
                    121.1267,
                    41.1156
                ],
                "address": "锦州市凌河区中央大街",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "中央大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jz_004",
                "name": "锦州港地下指挥中心",
                "type": "shelter",
                "position": [
                    121.0567,
                    41.0789
                ],
                "address": "锦州市经济技术开发区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "锦州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "锦州港",
                "type": "port",
                "position": [
                    121.0567,
                    41.0789
                ],
                "risk": "中"
            },
            {
                "name": "锦州火车站",
                "type": "transport",
                "position": [
                    121.1308,
                    41.119
                ],
                "risk": "中"
            }
        ]
    },
    "yingkou": {
        "name": "营口",
        "center": [
            122.219,
            40.667
        ],
        "shelters": [
            {
                "id": "yk_001",
                "name": "营口东站地下避难所",
                "type": "shelter",
                "position": [
                    122.419,
                    40.717
                ],
                "address": "营口市老边区渤海大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "营口东站地下",
                "description": "高铁枢纽地下民防工程"
            },
            {
                "id": "yk_002",
                "name": "营口市人防地下商城",
                "type": "underground_mall",
                "position": [
                    122.2156,
                    40.6645
                ],
                "address": "营口市站前区东升路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "东升路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yk_003",
                "name": "营口港地下指挥所",
                "type": "shelter",
                "position": [
                    122.2678,
                    40.6734
                ],
                "address": "营口市鲅鱼圈区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "营口港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "营口港",
                "type": "port",
                "position": [
                    122.2678,
                    40.6734
                ],
                "risk": "高"
            },
            {
                "name": "辽河大桥",
                "type": "bridge",
                "position": [
                    122.2834,
                    40.6987
                ],
                "risk": "中"
            }
        ]
    },
    "fuxin": {
        "name": "阜新",
        "center": [
            121.67,
            42.0269
        ],
        "shelters": [
            {
                "id": "fx_001",
                "name": "阜新火车站地下避难所",
                "type": "shelter",
                "position": [
                    121.67,
                    42.0269
                ],
                "address": "阜新市海州区迎宾大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "阜新火车站地下",
                "description": "阜新铁路枢纽地下民防工程"
            },
            {
                "id": "fx_002",
                "name": "阜新市人防地下商场",
                "type": "underground_mall",
                "position": [
                    121.6656,
                    42.0234
                ],
                "address": "阜新市海州区中华路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中华路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "fx_003",
                "name": "阜新煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    121.6923,
                    42.0432
                ],
                "address": "阜新市太平区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "阜新煤矿",
                "type": "factory",
                "position": [
                    121.6923,
                    42.0432
                ],
                "risk": "中"
            }
        ]
    },
    "liaoyang": {
        "name": "辽阳",
        "center": [
            123.1815,
            41.269
        ],
        "shelters": [
            {
                "id": "ly_001",
                "name": "辽阳站地下避难所",
                "type": "shelter",
                "position": [
                    123.1815,
                    41.269
                ],
                "address": "辽阳市白塔区中华大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "辽阳站地下通道",
                "description": "辽阳铁路枢纽地下民防工程"
            },
            {
                "id": "ly_002",
                "name": "辽阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    123.1767,
                    41.2656
                ],
                "address": "辽阳市白塔区新运大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "新运大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "ly_003",
                "name": "辽阳石化地下指挥所",
                "type": "shelter",
                "position": [
                    123.2123,
                    41.2876
                ],
                "address": "辽阳市宏伟区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "辽阳石化地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "辽阳石化",
                "type": "factory",
                "position": [
                    123.2123,
                    41.2876
                ],
                "risk": "高"
            }
        ]
    },
    "panjin": {
        "name": "盘锦",
        "center": [
            122.0707,
            41.1245
        ],
        "shelters": [
            {
                "id": "pj_001",
                "name": "盘锦站地下避难所",
                "type": "shelter",
                "position": [
                    122.0707,
                    41.1245
                ],
                "address": "盘锦市双台子区双兴北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "盘锦站地下通道",
                "description": "盘锦铁路枢纽地下民防工程"
            },
            {
                "id": "pj_002",
                "name": "盘锦市人防地下商场",
                "type": "underground_mall",
                "position": [
                    122.0656,
                    41.1212
                ],
                "address": "盘锦市兴隆台区石油大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "石油大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "pj_003",
                "name": "辽河油田地下指挥中心",
                "type": "shelter",
                "position": [
                    122.089,
                    41.1456
                ],
                "address": "盘锦市兴隆台区",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "辽河油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "辽河油田",
                "type": "factory",
                "position": [
                    122.089,
                    41.1456
                ],
                "risk": "高"
            },
            {
                "name": "盘锦港",
                "type": "port",
                "position": [
                    122.0234,
                    40.6876
                ],
                "risk": "中"
            }
        ]
    },
    "tieling": {
        "name": "铁岭",
        "center": [
            123.842,
            42.292
        ],
        "shelters": [
            {
                "id": "tl_001",
                "name": "铁岭站地下避难所",
                "type": "shelter",
                "position": [
                    123.842,
                    42.292
                ],
                "address": "铁岭市银州区光荣街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "铁岭站地下通道",
                "description": "铁岭铁路枢纽地下民防工程"
            },
            {
                "id": "tl_002",
                "name": "铁岭市人防地下商场",
                "type": "underground_mall",
                "position": [
                    123.8367,
                    42.2889
                ],
                "address": "铁岭市银州区广裕街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "广裕街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "铁岭火车站",
                "type": "transport",
                "position": [
                    123.842,
                    42.292
                ],
                "risk": "低"
            }
        ]
    },
    "chaoyang": {
        "name": "朝阳",
        "center": [
            120.452,
            41.579
        ],
        "shelters": [
            {
                "id": "cy_001",
                "name": "朝阳站地下避难所",
                "type": "shelter",
                "position": [
                    120.452,
                    41.579
                ],
                "address": "朝阳市龙城区中山大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "朝阳站地下通道",
                "description": "朝阳铁路枢纽地下民防工程"
            },
            {
                "id": "cy_002",
                "name": "朝阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    120.4456,
                    41.5767
                ],
                "address": "朝阳市双塔区朝阳大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "朝阳大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "朝阳火车站",
                "type": "transport",
                "position": [
                    120.452,
                    41.579
                ],
                "risk": "低"
            }
        ]
    },
    "siping": {
        "name": "四平",
        "center": [
            124.3721,
            43.1716
        ],
        "shelters": [
            {
                "id": "sp_001",
                "name": "四平站地下避难所",
                "type": "shelter",
                "position": [
                    124.3721,
                    43.1716
                ],
                "address": "四平市铁西区英雄大路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "四平站地下通道",
                "description": "四平铁路枢纽地下民防工程"
            },
            {
                "id": "sp_002",
                "name": "四平市人防地下商城",
                "type": "underground_mall",
                "position": [
                    124.3678,
                    43.1689
                ],
                "address": "四平市铁西区南仁兴街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "南仁兴街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "sp_003",
                "name": "四平东站地下避难所",
                "type": "shelter",
                "position": [
                    124.4234,
                    43.1567
                ],
                "address": "四平市铁东区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "四平东站地下",
                "description": "高铁枢纽人防工程"
            }
        ],
        "targets": [
            {
                "name": "四平火车站",
                "type": "transport",
                "position": [
                    124.3721,
                    43.1716
                ],
                "risk": "中"
            }
        ]
    },
    "liaoyuan": {
        "name": "辽源",
        "center": [
            125.144,
            42.888
        ],
        "shelters": [
            {
                "id": "lyuan_001",
                "name": "辽源站地下避难所",
                "type": "shelter",
                "position": [
                    125.144,
                    42.888
                ],
                "address": "辽源市龙山区人民大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "辽源站地下通道",
                "description": "辽源铁路枢纽地下民防工程"
            },
            {
                "id": "lyuan_002",
                "name": "辽源市人防地下商城",
                "type": "underground_mall",
                "position": [
                    125.1389,
                    42.8856
                ],
                "address": "辽源市龙山区西宁大路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "西宁大路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "辽源火车站",
                "type": "transport",
                "position": [
                    125.144,
                    42.888
                ],
                "risk": "低"
            }
        ]
    },
    "tonghua": {
        "name": "通化",
        "center": [
            125.9377,
            41.7219
        ],
        "shelters": [
            {
                "id": "th_001",
                "name": "通化站地下避难所",
                "type": "shelter",
                "position": [
                    125.9377,
                    41.7219
                ],
                "address": "通化市东昌区建设大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "通化站地下通道",
                "description": "通化铁路枢纽地下民防工程"
            },
            {
                "id": "th_002",
                "name": "通化市人防地下商城",
                "type": "underground_mall",
                "position": [
                    125.9323,
                    41.7189
                ],
                "address": "通化市东昌区新华大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "新华大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "th_003",
                "name": "通钢地下指挥所",
                "type": "shelter",
                "position": [
                    125.9678,
                    41.7456
                ],
                "address": "通化市二道江区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "通钢地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "通化钢厂",
                "type": "factory",
                "position": [
                    125.9678,
                    41.7456
                ],
                "risk": "中"
            }
        ]
    },
    "baishan": {
        "name": "白山",
        "center": [
            126.4239,
            41.9392
        ],
        "shelters": [
            {
                "id": "bs_001",
                "name": "白山站地下避难所",
                "type": "shelter",
                "position": [
                    126.4239,
                    41.9392
                ],
                "address": "白山市浑江区东庆路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "白山站地下通道",
                "description": "白山铁路枢纽地下民防工程"
            },
            {
                "id": "bs_002",
                "name": "白山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    126.4189,
                    41.9367
                ],
                "address": "白山市浑江区红旗街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "红旗街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "白山火车站",
                "type": "transport",
                "position": [
                    126.4239,
                    41.9392
                ],
                "risk": "低"
            }
        ]
    },
    "songyuan": {
        "name": "松原",
        "center": [
            124.832,
            45.141
        ],
        "shelters": [
            {
                "id": "sy_001",
                "name": "松原站地下避难所",
                "type": "shelter",
                "position": [
                    124.832,
                    45.141
                ],
                "address": "松原市宁江区建华路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "松原站地下通道",
                "description": "松原铁路枢纽地下民防工程"
            },
            {
                "id": "sy_002",
                "name": "松原市人防地下商城",
                "type": "underground_mall",
                "position": [
                    124.8267,
                    45.1389
                ],
                "address": "松原市宁江区乌兰大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "乌兰大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "sy_003",
                "name": "吉林油田地下指挥中心",
                "type": "shelter",
                "position": [
                    124.8567,
                    45.1678
                ],
                "address": "松原市宁江区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "吉林油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "吉林油田",
                "type": "factory",
                "position": [
                    124.8567,
                    45.1678
                ],
                "risk": "高"
            }
        ]
    },
    "baicheng": {
        "name": "白城",
        "center": [
            122.8437,
            45.62
        ],
        "shelters": [
            {
                "id": "bc_001",
                "name": "白城站地下避难所",
                "type": "shelter",
                "position": [
                    122.8437,
                    45.62
                ],
                "address": "白城市洮北区爱国街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "白城站地下通道",
                "description": "白城铁路枢纽地下民防工程"
            },
            {
                "id": "bc_002",
                "name": "白城市人防地下商城",
                "type": "underground_mall",
                "position": [
                    122.8389,
                    45.6178
                ],
                "address": "白城市洮北区青年南大街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "青年南大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "白城火车站",
                "type": "transport",
                "position": [
                    122.8437,
                    45.62
                ],
                "risk": "低"
            }
        ]
    },
    "jixi": {
        "name": "鸡西",
        "center": [
            130.969,
            45.295
        ],
        "shelters": [
            {
                "id": "jx_001",
                "name": "鸡西站地下避难所",
                "type": "shelter",
                "position": [
                    130.969,
                    45.295
                ],
                "address": "鸡西市鸡冠区兴国中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "鸡西站地下通道",
                "description": "鸡西铁路枢纽地下民防工程"
            },
            {
                "id": "jx_002",
                "name": "鸡西市人防地下商城",
                "type": "underground_mall",
                "position": [
                    130.9634,
                    45.2923
                ],
                "address": "鸡西市鸡冠区中心大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中心大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jx_003",
                "name": "鸡西煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    130.9923,
                    45.3123
                ],
                "address": "鸡西市恒山区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "鸡西煤矿",
                "type": "factory",
                "position": [
                    130.9923,
                    45.3123
                ],
                "risk": "中"
            }
        ]
    },
    "hegang": {
        "name": "鹤岗",
        "center": [
            130.2775,
            47.3321
        ],
        "shelters": [
            {
                "id": "hg_001",
                "name": "鹤岗站地下避难所",
                "type": "shelter",
                "position": [
                    130.2775,
                    47.3321
                ],
                "address": "鹤岗市向阳区红军路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "鹤岗站地下通道",
                "description": "鹤岗铁路枢纽地下民防工程"
            },
            {
                "id": "hg_002",
                "name": "鹤岗市人防地下商城",
                "type": "underground_mall",
                "position": [
                    130.2723,
                    47.3298
                ],
                "address": "鹤岗市向阳区振兴路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "振兴路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "hg_003",
                "name": "鹤岗煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    130.2989,
                    47.3456
                ],
                "address": "鹤岗市南山区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "鹤岗煤矿",
                "type": "factory",
                "position": [
                    130.2989,
                    47.3456
                ],
                "risk": "中"
            }
        ]
    },
    "shuangyashan": {
        "name": "双鸭山",
        "center": [
            131.1581,
            46.6434
        ],
        "shelters": [
            {
                "id": "sys_001",
                "name": "双鸭山站地下避难所",
                "type": "shelter",
                "position": [
                    131.1581,
                    46.6434
                ],
                "address": "双鸭山市尖山区站前路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "双鸭山站地下通道",
                "description": "双鸭山铁路枢纽地下民防工程"
            },
            {
                "id": "sys_002",
                "name": "双鸭山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    131.1523,
                    46.6409
                ],
                "address": "双鸭山市尖山区新兴大街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新兴大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "sys_003",
                "name": "双鸭山煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    131.1823,
                    46.6623
                ],
                "address": "双鸭山市岭东区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "双鸭山煤矿",
                "type": "factory",
                "position": [
                    131.1823,
                    46.6623
                ],
                "risk": "中"
            }
        ]
    },
    "daqing": {
        "name": "大庆",
        "center": [
            125.103,
            46.589
        ],
        "shelters": [
            {
                "id": "dq_001",
                "name": "大庆西站地下避难所",
                "type": "shelter",
                "position": [
                    124.9989,
                    46.6123
                ],
                "address": "大庆市让胡路区",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施、发电设备",
                "access": "大庆西站地下",
                "description": "大庆高铁枢纽人防工程"
            },
            {
                "id": "dq_002",
                "name": "大庆东站地下避难所",
                "type": "shelter",
                "position": [
                    125.1567,
                    46.5456
                ],
                "address": "大庆市龙凤区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "大庆东站地下",
                "description": "大庆高铁枢纽人防工程"
            },
            {
                "id": "dq_003",
                "name": "大庆市人防地下商城",
                "type": "underground_mall",
                "position": [
                    125.1123,
                    46.5967
                ],
                "address": "大庆市萨尔图区会战大街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "会战大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "dq_004",
                "name": "大庆油田地下指挥中心",
                "type": "shelter",
                "position": [
                    125.0876,
                    46.5734
                ],
                "address": "大庆市萨尔图区",
                "capacity": "6000人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "大庆油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "大庆油田",
                "type": "factory",
                "position": [
                    125.0876,
                    46.5734
                ],
                "risk": "高"
            },
            {
                "name": "大庆石化",
                "type": "factory",
                "position": [
                    125.1234,
                    46.5289
                ],
                "risk": "高"
            }
        ]
    },
    "yichun": {
        "name": "伊春",
        "center": [
            128.909,
            47.727
        ],
        "shelters": [
            {
                "id": "yc_001",
                "name": "伊春站地下避难所",
                "type": "shelter",
                "position": [
                    128.909,
                    47.727
                ],
                "address": "伊春市伊春区前进路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "伊春站地下通道",
                "description": "伊春铁路枢纽地下民防工程"
            },
            {
                "id": "yc_002",
                "name": "伊春市人防地下商城",
                "type": "underground_mall",
                "position": [
                    128.9034,
                    47.7245
                ],
                "address": "伊春市伊春区新兴中路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新兴中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "伊春火车站",
                "type": "transport",
                "position": [
                    128.909,
                    47.727
                ],
                "risk": "低"
            }
        ]
    },
    "jiamusi": {
        "name": "佳木斯",
        "center": [
            130.366,
            46.806
        ],
        "shelters": [
            {
                "id": "jms_001",
                "name": "佳木斯站地下避难所",
                "type": "shelter",
                "position": [
                    130.366,
                    46.806
                ],
                "address": "佳木斯市站前区站前路",
                "capacity": "4000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "佳木斯站地下通道",
                "description": "黑龙江省东部铁路枢纽地下民防工程"
            },
            {
                "id": "jms_002",
                "name": "佳木斯市人防地下商城",
                "type": "underground_mall",
                "position": [
                    130.3601,
                    46.8034
                ],
                "address": "佳木斯市前进区长安路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "长安路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jms_003",
                "name": "佳木斯港地下指挥中心",
                "type": "shelter",
                "position": [
                    130.4234,
                    46.8234
                ],
                "address": "佳木斯市东风区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "佳木斯港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "佳木斯港",
                "type": "port",
                "position": [
                    130.4234,
                    46.8234
                ],
                "risk": "中"
            },
            {
                "name": "佳木斯火车站",
                "type": "transport",
                "position": [
                    130.366,
                    46.806
                ],
                "risk": "中"
            }
        ]
    },
    "qitaihe": {
        "name": "七台河",
        "center": [
            131.008,
            45.776
        ],
        "shelters": [
            {
                "id": "qth_001",
                "name": "七台河站地下避难所",
                "type": "shelter",
                "position": [
                    131.008,
                    45.776
                ],
                "address": "七台河市桃山区大同街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "七台河站地下通道",
                "description": "七台河铁路枢纽地下民防工程"
            },
            {
                "id": "qth_002",
                "name": "七台河市人防地下商城",
                "type": "underground_mall",
                "position": [
                    131.0023,
                    45.7734
                ],
                "address": "七台河市桃山区山湖路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "山湖路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "qth_003",
                "name": "七台河煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    131.0289,
                    45.7934
                ],
                "address": "七台河市茄子河区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "七台河煤矿",
                "type": "factory",
                "position": [
                    131.0289,
                    45.7934
                ],
                "risk": "中"
            }
        ]
    },
    "mudanjiang": {
        "name": "牡丹江",
        "center": [
            129.6186,
            44.588
        ],
        "shelters": [
            {
                "id": "mdj_001",
                "name": "牡丹江站地下避难所",
                "type": "shelter",
                "position": [
                    129.6186,
                    44.588
                ],
                "address": "牡丹江市西安区西三条路",
                "capacity": "4000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "牡丹江站地下通道",
                "description": "黑龙江省东南部铁路枢纽地下民防工程"
            },
            {
                "id": "mdj_002",
                "name": "牡丹江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    129.6123,
                    44.5856
                ],
                "address": "牡丹江市东安区太平路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "太平路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "mdj_003",
                "name": "牡丹江机场地下避难所",
                "type": "shelter",
                "position": [
                    129.6234,
                    44.5234
                ],
                "address": "牡丹江市西安区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "机场应急系统",
                "access": "牡丹江机场地下",
                "description": "重要交通枢纽防护工程"
            }
        ],
        "targets": [
            {
                "name": "牡丹江火车站",
                "type": "transport",
                "position": [
                    129.6186,
                    44.588
                ],
                "risk": "中"
            },
            {
                "name": "牡丹江机场",
                "type": "airport",
                "position": [
                    129.6234,
                    44.5234
                ],
                "risk": "中"
            }
        ]
    },
    "heihe": {
        "name": "黑河",
        "center": [
            127.499,
            50.245
        ],
        "shelters": [
            {
                "id": "hh_001",
                "name": "黑河站地下避难所",
                "type": "shelter",
                "position": [
                    127.499,
                    50.245
                ],
                "address": "黑河市爱辉区铁路街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "黑河站地下通道",
                "description": "黑河铁路枢纽地下民防工程"
            },
            {
                "id": "hh_002",
                "name": "黑河市人防地下商城",
                "type": "underground_mall",
                "position": [
                    127.4934,
                    50.2423
                ],
                "address": "黑河市爱辉区中央街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中央街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "黑河火车站",
                "type": "transport",
                "position": [
                    127.499,
                    50.245
                ],
                "risk": "低"
            }
        ]
    },
    "handan": {
        "name": "邯郸",
        "center": [
            114.494,
            36.609
        ],
        "shelters": [
            {
                "id": "hd_001",
                "name": "邯郸站地下避难所",
                "type": "shelter",
                "position": [
                    114.494,
                    36.609
                ],
                "address": "邯郸市邯山区浴新南大街",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "邯郸站地下通道",
                "description": "邯郸铁路枢纽地下民防工程"
            },
            {
                "id": "hd_002",
                "name": "邯郸东站地下避难所",
                "type": "shelter",
                "position": [
                    114.5234,
                    36.6234
                ],
                "address": "邯郸市丛台区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "邯郸东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hd_003",
                "name": "邯郸市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.489,
                    36.6067
                ],
                "address": "邯郸市丛台区中华北大街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "中华北大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "hd_004",
                "name": "邯郸钢铁厂地下指挥所",
                "type": "shelter",
                "position": [
                    114.4567,
                    36.5876
                ],
                "address": "邯郸市复兴区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "邯钢地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "邯郸钢铁厂",
                "type": "factory",
                "position": [
                    114.4567,
                    36.5876
                ],
                "risk": "高"
            },
            {
                "name": "邯郸火车站",
                "type": "transport",
                "position": [
                    114.494,
                    36.609
                ],
                "risk": "中"
            }
        ]
    },
    "xingtai": {
        "name": "邢台",
        "center": [
            114.5047,
            37.07
        ],
        "shelters": [
            {
                "id": "xt_001",
                "name": "邢台站地下避难所",
                "type": "shelter",
                "position": [
                    114.5047,
                    37.07
                ],
                "address": "邢台市桥东区车站北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "邢台站地下通道",
                "description": "邢台铁路枢纽地下民防工程"
            },
            {
                "id": "xt_002",
                "name": "邢台东站地下避难所",
                "type": "shelter",
                "position": [
                    114.5567,
                    37.0876
                ],
                "address": "邢台市桥东区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "邢台东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xt_003",
                "name": "邢台市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.5001,
                    37.0678
                ],
                "address": "邢台市桥西区中兴西大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中兴西大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "邢台火车站",
                "type": "transport",
                "position": [
                    114.5047,
                    37.07
                ],
                "risk": "中"
            }
        ]
    },
    "zhangjiakou": {
        "name": "张家口",
        "center": [
            114.887,
            40.767
        ],
        "shelters": [
            {
                "id": "zjk_001",
                "name": "张家口站地下避难所",
                "type": "shelter",
                "position": [
                    114.887,
                    40.767
                ],
                "address": "张家口市桥东区站前大街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "张家口站地下通道",
                "description": "张家口铁路枢纽地下民防工程"
            },
            {
                "id": "zjk_002",
                "name": "张家口市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.8812,
                    40.7645
                ],
                "address": "张家口市桥西区至善街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "至善街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "zjk_003",
                "name": "张家口宁远机场地下避难所",
                "type": "shelter",
                "position": [
                    114.9234,
                    40.7567
                ],
                "address": "张家口市桥东区",
                "capacity": "2000人",
                "level": "核5级",
                "facilities": "机场应急系统",
                "access": "张家口机场地下",
                "description": "重要交通枢纽防护工程"
            }
        ],
        "targets": [
            {
                "name": "张家口火车站",
                "type": "transport",
                "position": [
                    114.887,
                    40.767
                ],
                "risk": "中"
            },
            {
                "name": "张家口机场",
                "type": "airport",
                "position": [
                    114.9234,
                    40.7567
                ],
                "risk": "中"
            }
        ]
    },
    "chengde": {
        "name": "承德",
        "center": [
            117.9328,
            40.951
        ],
        "shelters": [
            {
                "id": "cd_001",
                "name": "承德站地下避难所",
                "type": "shelter",
                "position": [
                    117.9328,
                    40.951
                ],
                "address": "承德市双桥区车站路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "承德站地下通道",
                "description": "承德铁路枢纽地下民防工程"
            },
            {
                "id": "cd_002",
                "name": "承德市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.9267,
                    40.9489
                ],
                "address": "承德市双桥区南营子大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "南营子大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "cd_003",
                "name": "承德普宁机场地下避难所",
                "type": "shelter",
                "position": [
                    118.0567,
                    41.1789
                ],
                "address": "承德市承德县",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "机场应急系统",
                "access": "承德机场地下",
                "description": "重要交通枢纽防护工程"
            }
        ],
        "targets": [
            {
                "name": "承德火车站",
                "type": "transport",
                "position": [
                    117.9328,
                    40.951
                ],
                "risk": "低"
            },
            {
                "name": "避暑山庄",
                "type": "landmark",
                "position": [
                    117.9367,
                    40.9956
                ],
                "risk": "低"
            }
        ]
    },
    "cangzhou": {
        "name": "沧州",
        "center": [
            116.8388,
            38.304
        ],
        "shelters": [
            {
                "id": "cz_001",
                "name": "沧州站地下避难所",
                "type": "shelter",
                "position": [
                    116.8388,
                    38.304
                ],
                "address": "沧州市新华区新华东路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "沧州站地下通道",
                "description": "沧州铁路枢纽地下民防工程"
            },
            {
                "id": "cz_002",
                "name": "沧州西站地下避难所",
                "type": "shelter",
                "position": [
                    116.7934,
                    38.3123
                ],
                "address": "沧州市运河区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "沧州西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "cz_003",
                "name": "沧州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.8345,
                    38.3012
                ],
                "address": "沧州市运河区解放西路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "解放西路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "cz_004",
                "name": "黄骅港地下指挥中心",
                "type": "shelter",
                "position": [
                    117.3234,
                    38.3678
                ],
                "address": "沧州市黄骅市",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "黄骅港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "黄骅港",
                "type": "port",
                "position": [
                    117.3234,
                    38.3678
                ],
                "risk": "中"
            },
            {
                "name": "沧州火车站",
                "type": "transport",
                "position": [
                    116.8388,
                    38.304
                ],
                "risk": "中"
            }
        ]
    },
    "langfang": {
        "name": "廊坊",
        "center": [
            116.683,
            39.538
        ],
        "shelters": [
            {
                "id": "lf_001",
                "name": "廊坊站地下避难所",
                "type": "shelter",
                "position": [
                    116.683,
                    39.538
                ],
                "address": "廊坊市广阳区光明东道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "廊坊站地下通道",
                "description": "廊坊铁路枢纽地下民防工程"
            },
            {
                "id": "lf_002",
                "name": "廊坊北站地下避难所",
                "type": "shelter",
                "position": [
                    116.7123,
                    39.5567
                ],
                "address": "廊坊市广阳区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "廊坊北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "lf_003",
                "name": "廊坊市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.6789,
                    39.5356
                ],
                "address": "廊坊市广阳区新华路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "新华路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "廊坊火车站",
                "type": "transport",
                "position": [
                    116.683,
                    39.538
                ],
                "risk": "中"
            }
        ]
    },
    "yangquan": {
        "name": "阳泉",
        "center": [
            113.58,
            37.857
        ],
        "shelters": [
            {
                "id": "yq_001",
                "name": "阳泉站地下避难所",
                "type": "shelter",
                "position": [
                    113.58,
                    37.857
                ],
                "address": "阳泉市城区德胜东街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "阳泉站地下通道",
                "description": "阳泉铁路枢纽地下民防工程"
            },
            {
                "id": "yq_002",
                "name": "阳泉北站地下避难所",
                "type": "shelter",
                "position": [
                    113.4567,
                    38.0123
                ],
                "address": "阳泉市盂县",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "阳泉北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yq_003",
                "name": "阳泉市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.5756,
                    37.8545
                ],
                "address": "阳泉市城区桃北东街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "桃北东街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yq_004",
                "name": "阳泉煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    113.6123,
                    37.8789
                ],
                "address": "阳泉市矿区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "阳泉煤矿",
                "type": "factory",
                "position": [
                    113.6123,
                    37.8789
                ],
                "risk": "中"
            }
        ]
    },
    "changzhi": {
        "name": "长治",
        "center": [
            113.116,
            36.195
        ],
        "shelters": [
            {
                "id": "cz_001",
                "name": "长治站地下避难所",
                "type": "shelter",
                "position": [
                    113.116,
                    36.195
                ],
                "address": "长治市潞州区站前路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "长治站地下通道",
                "description": "长治铁路枢纽地下民防工程"
            },
            {
                "id": "cz_002",
                "name": "长治东站地下避难所",
                "type": "shelter",
                "position": [
                    113.1567,
                    36.2023
                ],
                "address": "长治市潞州区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "长治东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "cz_003",
                "name": "长治市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.1112,
                    36.1923
                ],
                "address": "长治市潞州区英雄中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "英雄中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "长治火车站",
                "type": "transport",
                "position": [
                    113.116,
                    36.195
                ],
                "risk": "中"
            }
        ]
    },
    "jincheng": {
        "name": "晋城",
        "center": [
            112.851,
            35.49
        ],
        "shelters": [
            {
                "id": "jc_001",
                "name": "晋城站地下避难所",
                "type": "shelter",
                "position": [
                    112.851,
                    35.49
                ],
                "address": "晋城市城区迎宾街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "晋城站地下通道",
                "description": "晋城铁路枢纽地下民防工程"
            },
            {
                "id": "jc_002",
                "name": "晋城市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.8467,
                    35.4878
                ],
                "address": "晋城市城区黄华街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "黄华街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jc_003",
                "name": "晋城煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    112.8789,
                    35.5123
                ],
                "address": "晋城市泽州县",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "晋城煤矿",
                "type": "factory",
                "position": [
                    112.8789,
                    35.5123
                ],
                "risk": "中"
            }
        ]
    },
    "shuozhou": {
        "name": "朔州",
        "center": [
            112.433,
            39.331
        ],
        "shelters": [
            {
                "id": "sz_001",
                "name": "朔州站地下避难所",
                "type": "shelter",
                "position": [
                    112.433,
                    39.331
                ],
                "address": "朔州市朔城区站北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "朔州站地下通道",
                "description": "朔州铁路枢纽地下民防工程"
            },
            {
                "id": "sz_002",
                "name": "朔州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.4289,
                    39.3289
                ],
                "address": "朔州市朔城区鄯阳街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "鄯阳街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "朔州火车站",
                "type": "transport",
                "position": [
                    112.433,
                    39.331
                ],
                "risk": "低"
            }
        ]
    },
    "jinzhong": {
        "name": "晋中",
        "center": [
            112.752,
            37.687
        ],
        "shelters": [
            {
                "id": "jz_001",
                "name": "晋中站地下避难所",
                "type": "shelter",
                "position": [
                    112.752,
                    37.687
                ],
                "address": "晋中市榆次区迎宾街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "晋中站地下通道",
                "description": "晋中铁路枢纽地下民防工程"
            },
            {
                "id": "jz_002",
                "name": "晋中高铁站地下避难所",
                "type": "shelter",
                "position": [
                    112.7234,
                    37.7567
                ],
                "address": "晋中市榆次区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "晋中高铁站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "jz_003",
                "name": "榆次老城人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.7467,
                    37.6845
                ],
                "address": "晋中市榆次区中都路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中都路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "晋中火车站",
                "type": "transport",
                "position": [
                    112.752,
                    37.687
                ],
                "risk": "中"
            }
        ]
    },
    "yuncheng": {
        "name": "运城",
        "center": [
            111.007,
            35.026
        ],
        "shelters": [
            {
                "id": "yc_001",
                "name": "运城站地下避难所",
                "type": "shelter",
                "position": [
                    111.007,
                    35.026
                ],
                "address": "运城市盐湖区禹都大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "运城站地下通道",
                "description": "运城铁路枢纽地下民防工程"
            },
            {
                "id": "yc_002",
                "name": "运城北站地下避难所",
                "type": "shelter",
                "position": [
                    111.0234,
                    35.0567
                ],
                "address": "运城市盐湖区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "运城北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yc_003",
                "name": "运城市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.0023,
                    35.0234
                ],
                "address": "运城市盐湖区红旗西街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "红旗西街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "运城火车站",
                "type": "transport",
                "position": [
                    111.007,
                    35.026
                ],
                "risk": "中"
            }
        ]
    },
    "xinzhou": {
        "name": "忻州",
        "center": [
            112.734,
            38.416
        ],
        "shelters": [
            {
                "id": "xz_001",
                "name": "忻州站地下避难所",
                "type": "shelter",
                "position": [
                    112.734,
                    38.416
                ],
                "address": "忻州市忻府区云中南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "忻州站地下通道",
                "description": "忻州铁路枢纽地下民防工程"
            },
            {
                "id": "xz_002",
                "name": "忻州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.7289,
                    38.4134
                ],
                "address": "忻州市忻府区新建路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新建路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "忻州火车站",
                "type": "transport",
                "position": [
                    112.734,
                    38.416
                ],
                "risk": "低"
            }
        ]
    },
    "linfen": {
        "name": "临汾",
        "center": [
            111.519,
            36.088
        ],
        "shelters": [
            {
                "id": "lf_001",
                "name": "临汾站地下避难所",
                "type": "shelter",
                "position": [
                    111.519,
                    36.088
                ],
                "address": "临汾市尧都区车站路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "临汾站地下通道",
                "description": "临汾铁路枢纽地下民防工程"
            },
            {
                "id": "lf_002",
                "name": "临汾西站地下避难所",
                "type": "shelter",
                "position": [
                    111.5567,
                    36.0923
                ],
                "address": "临汾市尧都区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "临汾西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "lf_003",
                "name": "临汾市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.5145,
                    36.0856
                ],
                "address": "临汾市尧都区解放路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "临汾火车站",
                "type": "transport",
                "position": [
                    111.519,
                    36.088
                ],
                "risk": "中"
            }
        ]
    },
    "baoji": {
        "name": "宝鸡",
        "center": [
            107.237,
            34.363
        ],
        "shelters": [
            {
                "id": "bj_001",
                "name": "宝鸡站地下避难所",
                "type": "shelter",
                "position": [
                    107.237,
                    34.363
                ],
                "address": "宝鸡市渭滨区迎宾路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "宝鸡站地下通道",
                "description": "陕西西部铁路枢纽地下民防工程"
            },
            {
                "id": "bj_002",
                "name": "宝鸡南站地下避难所",
                "type": "shelter",
                "position": [
                    107.2234,
                    34.3234
                ],
                "address": "宝鸡市渭滨区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "宝鸡南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "bj_003",
                "name": "宝鸡市人防地下商城",
                "type": "underground_mall",
                "position": [
                    107.2312,
                    34.3601
                ],
                "address": "宝鸡市渭滨区经二路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "经二路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "bj_004",
                "name": "宝钛集团地下指挥所",
                "type": "shelter",
                "position": [
                    107.2567,
                    34.3789
                ],
                "address": "宝鸡市高新区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "宝钛集团地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "宝钛集团",
                "type": "factory",
                "position": [
                    107.2567,
                    34.3789
                ],
                "risk": "中"
            },
            {
                "name": "宝鸡火车站",
                "type": "transport",
                "position": [
                    107.237,
                    34.363
                ],
                "risk": "中"
            }
        ]
    },
    "xianyang": {
        "name": "咸阳",
        "center": [
            108.708,
            34.33
        ],
        "shelters": [
            {
                "id": "xy_001",
                "name": "咸阳站地下避难所",
                "type": "shelter",
                "position": [
                    108.708,
                    34.33
                ],
                "address": "咸阳市渭城区抗战北路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "咸阳站地下通道",
                "description": "咸阳铁路枢纽地下民防工程"
            },
            {
                "id": "xy_002",
                "name": "咸阳西站地下避难所",
                "type": "shelter",
                "position": [
                    108.6234,
                    34.3567
                ],
                "address": "咸阳市秦都区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "咸阳西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xy_003",
                "name": "咸阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    108.7034,
                    34.3278
                ],
                "address": "咸阳市秦都区人民中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "xy_004",
                "name": "咸阳国际机场地下避难所",
                "type": "shelter",
                "position": [
                    108.7567,
                    34.4456
                ],
                "address": "咸阳市渭城区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "机场应急系统、医疗救护",
                "access": "咸阳机场地下",
                "description": "重要交通枢纽防护工程"
            }
        ],
        "targets": [
            {
                "name": "咸阳国际机场",
                "type": "airport",
                "position": [
                    108.7567,
                    34.4456
                ],
                "risk": "高"
            },
            {
                "name": "咸阳火车站",
                "type": "transport",
                "position": [
                    108.708,
                    34.33
                ],
                "risk": "中"
            }
        ]
    },
    "weinan": {
        "name": "渭南",
        "center": [
            109.5,
            34.5
        ],
        "shelters": [
            {
                "id": "wn_001",
                "name": "渭南站地下避难所",
                "type": "shelter",
                "position": [
                    109.5,
                    34.5
                ],
                "address": "渭南市临渭区站北街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "渭南站地下通道",
                "description": "渭南铁路枢纽地下民防工程"
            },
            {
                "id": "wn_002",
                "name": "渭南北站地下避难所",
                "type": "shelter",
                "position": [
                    109.5234,
                    34.5234
                ],
                "address": "渭南市临渭区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "渭南北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "wn_003",
                "name": "渭南市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.4956,
                    34.4978
                ],
                "address": "渭南市临渭区东风大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "东风大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "渭南火车站",
                "type": "transport",
                "position": [
                    109.5,
                    34.5
                ],
                "risk": "中"
            }
        ]
    },
    "yanan": {
        "name": "延安",
        "center": [
            109.489,
            36.6
        ],
        "shelters": [
            {
                "id": "ya_001",
                "name": "延安站地下避难所",
                "type": "shelter",
                "position": [
                    109.489,
                    36.6
                ],
                "address": "延安市宝塔区七里铺街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "延安站地下通道",
                "description": "延安铁路枢纽地下民防工程"
            },
            {
                "id": "ya_002",
                "name": "延安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.4845,
                    36.5978
                ],
                "address": "延安市宝塔区中心街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中心街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "ya_003",
                "name": "延安油田地下指挥中心",
                "type": "shelter",
                "position": [
                    109.5234,
                    36.6234
                ],
                "address": "延安市宝塔区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "延安油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "延安油田",
                "type": "factory",
                "position": [
                    109.5234,
                    36.6234
                ],
                "risk": "中"
            },
            {
                "name": "延安火车站",
                "type": "transport",
                "position": [
                    109.489,
                    36.6
                ],
                "risk": "中"
            }
        ]
    },
    "hanzhong": {
        "name": "汉中",
        "center": [
            107.023,
            33.067
        ],
        "shelters": [
            {
                "id": "hz_001",
                "name": "汉中站地下避难所",
                "type": "shelter",
                "position": [
                    107.023,
                    33.067
                ],
                "address": "汉中市汉台区人民路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "汉中站地下通道",
                "description": "汉中铁路枢纽地下民防工程"
            },
            {
                "id": "hz_002",
                "name": "汉中市人防地下商城",
                "type": "underground_mall",
                "position": [
                    107.0189,
                    33.0645
                ],
                "address": "汉中市汉台区天汉大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "天汉大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "汉中火车站",
                "type": "transport",
                "position": [
                    107.023,
                    33.067
                ],
                "risk": "中"
            }
        ]
    },
    "yulin": {
        "name": "榆林",
        "center": [
            109.741,
            38.29
        ],
        "shelters": [
            {
                "id": "yl_001",
                "name": "榆林站地下避难所",
                "type": "shelter",
                "position": [
                    109.741,
                    38.29
                ],
                "address": "榆林市榆阳区兴榆路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "榆林站地下通道",
                "description": "榆林铁路枢纽地下民防工程"
            },
            {
                "id": "yl_002",
                "name": "榆林市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.7367,
                    38.2878
                ],
                "address": "榆林市榆阳区新建北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "新建北路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yl_003",
                "name": "榆林能源基地地下指挥所",
                "type": "shelter",
                "position": [
                    109.7789,
                    38.3234
                ],
                "address": "榆林市榆阳区",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "能源应急指挥系统",
                "access": "能源基地地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "榆林能源基地",
                "type": "factory",
                "position": [
                    109.7789,
                    38.3234
                ],
                "risk": "高"
            },
            {
                "name": "榆林火车站",
                "type": "transport",
                "position": [
                    109.741,
                    38.29
                ],
                "risk": "中"
            }
        ]
    },
    "ankang": {
        "name": "安康",
        "center": [
            109.029,
            32.69
        ],
        "shelters": [
            {
                "id": "ak_001",
                "name": "安康站地下避难所",
                "type": "shelter",
                "position": [
                    109.029,
                    32.69
                ],
                "address": "安康市汉滨区进站路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "安康站地下通道",
                "description": "安康铁路枢纽地下民防工程"
            },
            {
                "id": "ak_002",
                "name": "安康市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.0245,
                    32.6878
                ],
                "address": "安康市汉滨区大桥路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "大桥路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "安康火车站",
                "type": "transport",
                "position": [
                    109.029,
                    32.69
                ],
                "risk": "低"
            }
        ]
    },
    "lianyungang": {
        "name": "连云港",
        "center": [
            119.222,
            34.426
        ],
        "shelters": [
            {
                "id": "lyg_001",
                "name": "连云港站地下避难所",
                "type": "shelter",
                "position": [
                    119.222,
                    34.426
                ],
                "address": "连云港市新浦区人民东路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "连云港站地下通道",
                "description": "连云港铁路枢纽地下民防工程"
            },
            {
                "id": "lyg_002",
                "name": "连云港市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.2178,
                    34.4234
                ],
                "address": "连云港市海州区解放中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "lyg_003",
                "name": "连云港港地下指挥中心",
                "type": "shelter",
                "position": [
                    119.4567,
                    34.7567
                ],
                "address": "连云港市连云区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "连云港港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "连云港港",
                "type": "port",
                "position": [
                    119.4567,
                    34.7567
                ],
                "risk": "中"
            },
            {
                "name": "连云港火车站",
                "type": "transport",
                "position": [
                    119.222,
                    34.426
                ],
                "risk": "中"
            }
        ]
    },
    "huaian": {
        "name": "淮安",
        "center": [
            119.113,
            33.503
        ],
        "shelters": [
            {
                "id": "ha_001",
                "name": "淮安东站地下避难所",
                "type": "shelter",
                "position": [
                    119.1567,
                    33.5234
                ],
                "address": "淮安市淮安区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施、发电设备",
                "access": "淮安东站地下",
                "description": "淮安高铁枢纽人防工程"
            },
            {
                "id": "ha_002",
                "name": "淮安站地下避难所",
                "type": "shelter",
                "position": [
                    119.0234,
                    33.6123
                ],
                "address": "淮安市清江浦区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "淮安站地下",
                "description": "淮安铁路枢纽人防工程"
            },
            {
                "id": "ha_003",
                "name": "淮安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.1089,
                    33.5001
                ],
                "address": "淮安市清江浦区淮海北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "淮海北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "淮安火车站",
                "type": "transport",
                "position": [
                    119.0234,
                    33.6123
                ],
                "risk": "中"
            }
        ]
    },
    "yancheng": {
        "name": "盐城",
        "center": [
            120.163,
            33.378
        ],
        "shelters": [
            {
                "id": "yc_001",
                "name": "盐城站地下避难所",
                "type": "shelter",
                "position": [
                    120.163,
                    33.378
                ],
                "address": "盐城市亭湖区范公中路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "盐城站地下通道",
                "description": "盐城铁路枢纽地下民防工程"
            },
            {
                "id": "yc_002",
                "name": "盐城市人防地下商城",
                "type": "underground_mall",
                "position": [
                    120.1589,
                    33.3756
                ],
                "address": "盐城市亭湖区建军中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "建军中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yc_003",
                "name": "盐城大丰港地下指挥中心",
                "type": "shelter",
                "position": [
                    120.4567,
                    33.2567
                ],
                "address": "盐城市大丰区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "大丰港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "盐城火车站",
                "type": "transport",
                "position": [
                    120.163,
                    33.378
                ],
                "risk": "中"
            },
            {
                "name": "大丰港",
                "type": "port",
                "position": [
                    120.4567,
                    33.2567
                ],
                "risk": "中"
            }
        ]
    },
    "yangzhou": {
        "name": "扬州",
        "center": [
            119.421,
            32.393
        ],
        "shelters": [
            {
                "id": "yz_001",
                "name": "扬州站地下避难所",
                "type": "shelter",
                "position": [
                    119.421,
                    32.393
                ],
                "address": "扬州市邗江区文昌西路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "扬州站地下通道",
                "description": "扬州铁路枢纽地下民防工程"
            },
            {
                "id": "yz_002",
                "name": "扬州东站地下避难所",
                "type": "shelter",
                "position": [
                    119.4789,
                    32.389
                ],
                "address": "扬州市广陵区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "扬州东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yz_003",
                "name": "扬州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.4167,
                    32.3901
                ],
                "address": "扬州市广陵区文昌中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "文昌中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "扬州火车站",
                "type": "transport",
                "position": [
                    119.421,
                    32.393
                ],
                "risk": "中"
            }
        ]
    },
    "zhenjiang": {
        "name": "镇江",
        "center": [
            119.455,
            32.204
        ],
        "shelters": [
            {
                "id": "zj_001",
                "name": "镇江站地下避难所",
                "type": "shelter",
                "position": [
                    119.455,
                    32.204
                ],
                "address": "镇江市润州区中山西路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "镇江站地下通道",
                "description": "镇江铁路枢纽地下民防工程"
            },
            {
                "id": "zj_002",
                "name": "镇江南站地下避难所",
                "type": "shelter",
                "position": [
                    119.4234,
                    32.1789
                ],
                "address": "镇江市丹徒区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "镇江南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "zj_003",
                "name": "镇江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.4501,
                    32.2012
                ],
                "address": "镇江市京口区解放路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "镇江火车站",
                "type": "transport",
                "position": [
                    119.455,
                    32.204
                ],
                "risk": "中"
            }
        ]
    },
    "taizhou": {
        "name": "泰州",
        "center": [
            119.923,
            32.46
        ],
        "shelters": [
            {
                "id": "tz_001",
                "name": "泰州站地下避难所",
                "type": "shelter",
                "position": [
                    119.923,
                    32.46
                ],
                "address": "泰州市海陵区京泰路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "泰州站地下通道",
                "description": "泰州铁路枢纽地下民防工程"
            },
            {
                "id": "tz_002",
                "name": "泰州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.9189,
                    32.4578
                ],
                "address": "泰州市海陵区鼓楼南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "鼓楼南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "泰州火车站",
                "type": "transport",
                "position": [
                    119.923,
                    32.46
                ],
                "risk": "低"
            }
        ]
    },
    "taizhou2": {
        "name": "台州",
        "center": [
            121.421,
            28.656
        ],
        "shelters": [
            {
                "id": "tz2_001",
                "name": "台州站地下避难所",
                "type": "shelter",
                "position": [
                    121.421,
                    28.656
                ],
                "address": "台州市椒江区市府大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "台州站地下通道",
                "description": "台州铁路枢纽地下民防工程"
            },
            {
                "id": "tz2_002",
                "name": "台州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    121.4167,
                    28.6534
                ],
                "address": "台州市椒江区解放南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "台州火车站",
                "type": "transport",
                "position": [
                    121.421,
                    28.656
                ],
                "risk": "中"
            }
        ]
    },
    "huainan": {
        "name": "淮南",
        "center": [
            117.018,
            32.646
        ],
        "shelters": [
            {
                "id": "hn_001",
                "name": "淮南站地下避难所",
                "type": "shelter",
                "position": [
                    117.018,
                    32.646
                ],
                "address": "淮南市田家庵区舜耕中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "淮南站地下通道",
                "description": "淮南铁路枢纽地下民防工程"
            },
            {
                "id": "hn_002",
                "name": "淮南市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.0134,
                    32.6434
                ],
                "address": "淮南市田家庵区洞山中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "洞山中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "hn_003",
                "name": "淮南煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    117.0456,
                    32.6789
                ],
                "address": "淮南市潘集区",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "淮南煤矿",
                "type": "factory",
                "position": [
                    117.0456,
                    32.6789
                ],
                "risk": "中"
            }
        ]
    },
    "maanshan": {
        "name": "马鞍山",
        "center": [
            118.507,
            31.676
        ],
        "shelters": [
            {
                "id": "mas_001",
                "name": "马鞍山站地下避难所",
                "type": "shelter",
                "position": [
                    118.507,
                    31.676
                ],
                "address": "马鞍山市花山区红旗北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "马鞍山站地下通道",
                "description": "马鞍山铁路枢纽地下民防工程"
            },
            {
                "id": "mas_002",
                "name": "马鞍山东站地下避难所",
                "type": "shelter",
                "position": [
                    118.5567,
                    31.7234
                ],
                "address": "马鞍山市雨山区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "马鞍山东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "mas_003",
                "name": "马鞍山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.5023,
                    31.6734
                ],
                "address": "马鞍山市花山区解放路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "马鞍山钢铁厂",
                "type": "factory",
                "position": [
                    118.5345,
                    31.6543
                ],
                "risk": "中"
            }
        ]
    },
    "huaibei": {
        "name": "淮北",
        "center": [
            116.795,
            33.972
        ],
        "shelters": [
            {
                "id": "hb_001",
                "name": "淮北站地下避难所",
                "type": "shelter",
                "position": [
                    116.795,
                    33.972
                ],
                "address": "淮北市相山区古城路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "淮北站地下通道",
                "description": "淮北铁路枢纽地下民防工程"
            },
            {
                "id": "hb_002",
                "name": "淮北市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.7901,
                    33.9698
                ],
                "address": "淮北市相山区孟山北路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "孟山北路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "hb_003",
                "name": "淮北煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    116.8234,
                    34.0123
                ],
                "address": "淮北市杜集区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "淮北煤矿",
                "type": "factory",
                "position": [
                    116.8234,
                    34.0123
                ],
                "risk": "中"
            }
        ]
    },
    "tongling": {
        "name": "铜陵",
        "center": [
            117.812,
            30.945
        ],
        "shelters": [
            {
                "id": "tl2_001",
                "name": "铜陵站地下避难所",
                "type": "shelter",
                "position": [
                    117.812,
                    30.945
                ],
                "address": "铜陵市铜官区北京西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "铜陵站地下通道",
                "description": "铜陵铁路枢纽地下民防工程"
            },
            {
                "id": "tl2_002",
                "name": "铜陵市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.8078,
                    30.9423
                ],
                "address": "铜陵市铜官区长江中路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "长江中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "tl2_003",
                "name": "铜陵有色地下指挥所",
                "type": "shelter",
                "position": [
                    117.8345,
                    30.9678
                ],
                "address": "铜陵市铜官区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "铜陵有色地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "铜陵有色",
                "type": "factory",
                "position": [
                    117.8345,
                    30.9678
                ],
                "risk": "中"
            }
        ]
    },
    "anqing": {
        "name": "安庆",
        "center": [
            117.064,
            30.543
        ],
        "shelters": [
            {
                "id": "aq_001",
                "name": "安庆站地下避难所",
                "type": "shelter",
                "position": [
                    117.064,
                    30.543
                ],
                "address": "安庆市宜秀区迎宾西路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "安庆站地下通道",
                "description": "安庆铁路枢纽地下民防工程"
            },
            {
                "id": "aq_002",
                "name": "安庆市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.0598,
                    30.5406
                ],
                "address": "安庆市迎江区人民路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "安庆火车站",
                "type": "transport",
                "position": [
                    117.064,
                    30.543
                ],
                "risk": "中"
            }
        ]
    },
    "huangshan": {
        "name": "黄山",
        "center": [
            118.317,
            29.714
        ],
        "shelters": [
            {
                "id": "hs2_001",
                "name": "黄山北站地下避难所",
                "type": "shelter",
                "position": [
                    118.2923,
                    29.8234
                ],
                "address": "黄山市屯溪区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "黄山北站地下",
                "description": "黄山高铁枢纽人防工程"
            },
            {
                "id": "hs2_002",
                "name": "黄山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.3123,
                    29.7112
                ],
                "address": "黄山市屯溪区黄山西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "黄山西路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "黄山北站",
                "type": "transport",
                "position": [
                    118.2923,
                    29.8234
                ],
                "risk": "低"
            }
        ]
    },
    "chuzhou": {
        "name": "滁州",
        "center": [
            118.316,
            32.303
        ],
        "shelters": [
            {
                "id": "cz2_001",
                "name": "滁州站地下避难所",
                "type": "shelter",
                "position": [
                    118.316,
                    32.303
                ],
                "address": "滁州市南谯区洪武西路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "滁州站地下通道",
                "description": "滁州铁路枢纽地下民防工程"
            },
            {
                "id": "cz2_002",
                "name": "滁州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.3112,
                    32.3006
                ],
                "address": "滁州市琅琊区南谯北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "南谯北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "滁州火车站",
                "type": "transport",
                "position": [
                    118.316,
                    32.303
                ],
                "risk": "中"
            }
        ]
    },
    "fuyang": {
        "name": "阜阳",
        "center": [
            115.82,
            32.896
        ],
        "shelters": [
            {
                "id": "fy_001",
                "name": "阜阳站地下避难所",
                "type": "shelter",
                "position": [
                    115.82,
                    32.896
                ],
                "address": "阜阳市颍东区北京东路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "阜阳站地下通道",
                "description": "阜阳铁路枢纽地下民防工程"
            },
            {
                "id": "fy_002",
                "name": "阜阳西站地下避难所",
                "type": "shelter",
                "position": [
                    115.7567,
                    32.9234
                ],
                "address": "阜阳市颍州区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "阜阳西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "fy_003",
                "name": "阜阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.8156,
                    32.8934
                ],
                "address": "阜阳市颍州区颍州中路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "颍州中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "阜阳火车站",
                "type": "transport",
                "position": [
                    115.82,
                    32.896
                ],
                "risk": "中"
            }
        ]
    },
    "suzhou": {
        "name": "宿州",
        "center": [
            116.984,
            33.636
        ],
        "shelters": [
            {
                "id": "sz2_001",
                "name": "宿州站地下避难所",
                "type": "shelter",
                "position": [
                    116.984,
                    33.636
                ],
                "address": "宿州市埇桥区工人路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "宿州站地下通道",
                "description": "宿州铁路枢纽地下民防工程"
            },
            {
                "id": "sz2_002",
                "name": "宿州东站地下避难所",
                "type": "shelter",
                "position": [
                    117.0234,
                    33.6789
                ],
                "address": "宿州市埇桥区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "宿州东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "sz2_003",
                "name": "宿州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.9798,
                    33.6334
                ],
                "address": "宿州市埇桥区汴河中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "汴河中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "宿州火车站",
                "type": "transport",
                "position": [
                    116.984,
                    33.636
                ],
                "risk": "中"
            }
        ]
    },
    "liuan": {
        "name": "六安",
        "center": [
            116.522,
            31.735
        ],
        "shelters": [
            {
                "id": "la_001",
                "name": "六安站地下避难所",
                "type": "shelter",
                "position": [
                    116.522,
                    31.735
                ],
                "address": "六安市裕安区站前路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "六安站地下通道",
                "description": "六安铁路枢纽地下民防工程"
            },
            {
                "id": "la_002",
                "name": "六安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.5178,
                    31.7323
                ],
                "address": "六安市金安区人民路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "六安火车站",
                "type": "transport",
                "position": [
                    116.522,
                    31.735
                ],
                "risk": "中"
            }
        ]
    },
    "bozhou": {
        "name": "亳州",
        "center": [
            115.779,
            33.846
        ],
        "shelters": [
            {
                "id": "bz_001",
                "name": "亳州站地下避难所",
                "type": "shelter",
                "position": [
                    115.779,
                    33.846
                ],
                "address": "亳州市谯城区芍花路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "亳州站地下通道",
                "description": "亳州铁路枢纽地下民防工程"
            },
            {
                "id": "bz_002",
                "name": "亳州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.7745,
                    33.8434
                ],
                "address": "亳州市谯城区魏武大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "魏武大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "亳州火车站",
                "type": "transport",
                "position": [
                    115.779,
                    33.846
                ],
                "risk": "低"
            }
        ]
    },
    "chizhou": {
        "name": "池州",
        "center": [
            117.489,
            30.656
        ],
        "shelters": [
            {
                "id": "cz3_001",
                "name": "池州站地下避难所",
                "type": "shelter",
                "position": [
                    117.489,
                    30.656
                ],
                "address": "池州市贵池区永明路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "池州站地下通道",
                "description": "池州铁路枢纽地下民防工程"
            },
            {
                "id": "cz3_002",
                "name": "池州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.4845,
                    30.6534
                ],
                "address": "池州市贵池区长江中路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "长江中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "池州火车站",
                "type": "transport",
                "position": [
                    117.489,
                    30.656
                ],
                "risk": "低"
            }
        ]
    },
    "putian": {
        "name": "莆田",
        "center": [
            119.008,
            25.454
        ],
        "shelters": [
            {
                "id": "pt_001",
                "name": "莆田站地下避难所",
                "type": "shelter",
                "position": [
                    119.008,
                    25.454
                ],
                "address": "莆田市秀屿区笏枫路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "莆田站地下通道",
                "description": "莆田铁路枢纽地下民防工程"
            },
            {
                "id": "pt_002",
                "name": "莆田市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.0034,
                    25.4512
                ],
                "address": "莆田市城厢区文献西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "文献西路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "pt_003",
                "name": "湄洲湾港地下指挥中心",
                "type": "shelter",
                "position": [
                    119.1234,
                    25.3567
                ],
                "address": "莆田市秀屿区",
                "capacity": "2000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "湄洲湾港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "湄洲湾港",
                "type": "port",
                "position": [
                    119.1234,
                    25.3567
                ],
                "risk": "中"
            }
        ]
    },
    "sanming": {
        "name": "三明",
        "center": [
            117.639,
            26.269
        ],
        "shelters": [
            {
                "id": "sm_001",
                "name": "三明站地下避难所",
                "type": "shelter",
                "position": [
                    117.639,
                    26.269
                ],
                "address": "三明市三元区工业南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "三明站地下通道",
                "description": "三明铁路枢纽地下民防工程"
            },
            {
                "id": "sm_002",
                "name": "三明市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.6345,
                    26.2667
                ],
                "address": "三明市三元区列东街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "列东街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "三明火车站",
                "type": "transport",
                "position": [
                    117.639,
                    26.269
                ],
                "risk": "低"
            }
        ]
    },
    "quanzhou": {
        "name": "泉州",
        "center": [
            118.675,
            24.874
        ],
        "shelters": [
            {
                "id": "qz_001",
                "name": "泉州站地下避难所",
                "type": "shelter",
                "position": [
                    118.675,
                    24.874
                ],
                "address": "泉州市丰泽区东西大道",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "泉州站地下通道",
                "description": "泉州铁路枢纽地下民防工程"
            },
            {
                "id": "qz_002",
                "name": "泉州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.6701,
                    24.8712
                ],
                "address": "泉州市鲤城区中山路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "中山路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "qz_003",
                "name": "泉州港地下指挥中心",
                "type": "shelter",
                "position": [
                    118.7234,
                    24.8734
                ],
                "address": "泉州市丰泽区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "泉州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "泉州港",
                "type": "port",
                "position": [
                    118.7234,
                    24.8734
                ],
                "risk": "中"
            },
            {
                "name": "泉州火车站",
                "type": "transport",
                "position": [
                    118.675,
                    24.874
                ],
                "risk": "中"
            }
        ]
    },
    "zhangzhou": {
        "name": "漳州",
        "center": [
            117.661,
            24.511
        ],
        "shelters": [
            {
                "id": "zz_001",
                "name": "漳州站地下避难所",
                "type": "shelter",
                "position": [
                    117.661,
                    24.511
                ],
                "address": "漳州市龙海区龙江南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "漳州站地下通道",
                "description": "漳州铁路枢纽地下民防工程"
            },
            {
                "id": "zz_002",
                "name": "漳州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.6567,
                    24.5089
                ],
                "address": "漳州市芗城区延安北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "延安北路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "zz_003",
                "name": "漳州港地下指挥中心",
                "type": "shelter",
                "position": [
                    117.789,
                    24.4567
                ],
                "address": "漳州市龙海区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "漳州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "漳州港",
                "type": "port",
                "position": [
                    117.789,
                    24.4567
                ],
                "risk": "中"
            }
        ]
    },
    "nanping": {
        "name": "南平",
        "center": [
            118.178,
            26.643
        ],
        "shelters": [
            {
                "id": "np_001",
                "name": "南平市站地下避难所",
                "type": "shelter",
                "position": [
                    118.178,
                    26.643
                ],
                "address": "南平市建阳区嘉禾北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "南平市站地下通道",
                "description": "南平铁路枢纽地下民防工程"
            },
            {
                "id": "np_002",
                "name": "南平市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.1734,
                    26.6406
                ],
                "address": "南平市延平区八一路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "八一路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "南平火车站",
                "type": "transport",
                "position": [
                    118.178,
                    26.643
                ],
                "risk": "低"
            }
        ]
    },
    "longyan": {
        "name": "龙岩",
        "center": [
            117.03,
            25.091
        ],
        "shelters": [
            {
                "id": "ly2_001",
                "name": "龙岩站地下避难所",
                "type": "shelter",
                "position": [
                    117.03,
                    25.091
                ],
                "address": "龙岩市新罗区罗龙东路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "龙岩站地下通道",
                "description": "龙岩铁路枢纽地下民防工程"
            },
            {
                "id": "ly2_002",
                "name": "龙岩市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.0256,
                    25.0889
                ],
                "address": "龙岩市新罗区中山路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中山路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "龙岩火车站",
                "type": "transport",
                "position": [
                    117.03,
                    25.091
                ],
                "risk": "中"
            }
        ]
    },
    "pingxiang": {
        "name": "萍乡",
        "center": [
            113.854,
            27.623
        ],
        "shelters": [
            {
                "id": "px_001",
                "name": "萍乡站地下避难所",
                "type": "shelter",
                "position": [
                    113.854,
                    27.623
                ],
                "address": "萍乡市安源区跃进北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "萍乡站地下通道",
                "description": "萍乡铁路枢纽地下民防工程"
            },
            {
                "id": "px_002",
                "name": "萍乡市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.8498,
                    27.6206
                ],
                "address": "萍乡市安源区跃进南路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "跃进南路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "px_003",
                "name": "萍乡煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    113.8823,
                    27.6456
                ],
                "address": "萍乡市安源区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "萍乡煤矿",
                "type": "factory",
                "position": [
                    113.8823,
                    27.6456
                ],
                "risk": "中"
            }
        ]
    },
    "jiujiang": {
        "name": "九江",
        "center": [
            115.953,
            29.703
        ],
        "shelters": [
            {
                "id": "jj_001",
                "name": "九江站地下避难所",
                "type": "shelter",
                "position": [
                    115.953,
                    29.703
                ],
                "address": "九江市濂溪区长虹大道",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "九江站地下通道",
                "description": "江西北部铁路枢纽地下民防工程"
            },
            {
                "id": "jj_002",
                "name": "九江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.9489,
                    29.7006
                ],
                "address": "九江市浔阳区浔阳路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "浔阳路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jj_003",
                "name": "九江港地下指挥中心",
                "type": "shelter",
                "position": [
                    115.9834,
                    29.7234
                ],
                "address": "九江市浔阳区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "九江港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "九江港",
                "type": "port",
                "position": [
                    115.9834,
                    29.7234
                ],
                "risk": "中"
            },
            {
                "name": "九江火车站",
                "type": "transport",
                "position": [
                    115.953,
                    29.703
                ],
                "risk": "中"
            }
        ]
    },
    "xinyu": {
        "name": "新余",
        "center": [
            114.939,
            27.805
        ],
        "shelters": [
            {
                "id": "xy3_001",
                "name": "新余站地下避难所",
                "type": "shelter",
                "position": [
                    114.939,
                    27.805
                ],
                "address": "新余市渝水区胜利北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "新余站地下通道",
                "description": "新余铁路枢纽地下民防工程"
            },
            {
                "id": "xy3_002",
                "name": "新余市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.9345,
                    27.8023
                ],
                "address": "新余市渝水区抱石大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "抱石大道地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "xy3_003",
                "name": "新余钢铁厂地下指挥所",
                "type": "shelter",
                "position": [
                    114.9678,
                    27.8345
                ],
                "address": "新余市渝水区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "新钢地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "新余钢铁",
                "type": "factory",
                "position": [
                    114.9678,
                    27.8345
                ],
                "risk": "中"
            }
        ]
    },
    "yingtan": {
        "name": "鹰潭",
        "center": [
            117.034,
            28.239
        ],
        "shelters": [
            {
                "id": "yt_001",
                "name": "鹰潭站地下避难所",
                "type": "shelter",
                "position": [
                    117.034,
                    28.239
                ],
                "address": "鹰潭市月湖区胜利东路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "鹰潭站地下通道",
                "description": "鹰潭铁路枢纽地下民防工程"
            },
            {
                "id": "yt_002",
                "name": "鹰潭北站地下避难所",
                "type": "shelter",
                "position": [
                    117.0234,
                    28.3234
                ],
                "address": "鹰潭市贵溪市",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "鹰潭北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yt_003",
                "name": "鹰潭市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.0298,
                    28.2367
                ],
                "address": "鹰潭市月湖区站江路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "站江路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "鹰潭火车站",
                "type": "transport",
                "position": [
                    117.034,
                    28.239
                ],
                "risk": "中"
            }
        ]
    },
    "ganzhou": {
        "name": "赣州",
        "center": [
            114.935,
            25.832
        ],
        "shelters": [
            {
                "id": "gz_001",
                "name": "赣州站地下避难所",
                "type": "shelter",
                "position": [
                    114.935,
                    25.832
                ],
                "address": "赣州市章贡区五洲大道",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "赣州站地下通道",
                "description": "赣南铁路枢纽地下民防工程"
            },
            {
                "id": "gz_002",
                "name": "赣州西站地下避难所",
                "type": "shelter",
                "position": [
                    114.9234,
                    25.8789
                ],
                "address": "赣州市南康区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "赣州西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "gz_003",
                "name": "赣州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.9301,
                    25.8298
                ],
                "address": "赣州市章贡区文清路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "文清路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "赣州火车站",
                "type": "transport",
                "position": [
                    114.935,
                    25.832
                ],
                "risk": "中"
            }
        ]
    },
    "jian": {
        "name": "吉安",
        "center": [
            114.993,
            27.118
        ],
        "shelters": [
            {
                "id": "ja_001",
                "name": "吉安站地下避难所",
                "type": "shelter",
                "position": [
                    114.993,
                    27.118
                ],
                "address": "吉安市青原区青原大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "吉安站地下通道",
                "description": "吉安铁路枢纽地下民防工程"
            },
            {
                "id": "ja_002",
                "name": "吉安西站地下避难所",
                "type": "shelter",
                "position": [
                    114.9567,
                    27.0567
                ],
                "address": "吉安市吉州区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "吉安西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ja_003",
                "name": "吉安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.9889,
                    27.1156
                ],
                "address": "吉安市吉州区阳明东路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "阳明东路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "吉安火车站",
                "type": "transport",
                "position": [
                    114.993,
                    27.118
                ],
                "risk": "中"
            }
        ]
    },
    "yichun2": {
        "name": "宜春",
        "center": [
            114.417,
            27.816
        ],
        "shelters": [
            {
                "id": "yc4_001",
                "name": "宜春站地下避难所",
                "type": "shelter",
                "position": [
                    114.417,
                    27.816
                ],
                "address": "宜春市袁州区宜浦路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "宜春站地下通道",
                "description": "宜春铁路枢纽地下民防工程"
            },
            {
                "id": "yc4_002",
                "name": "宜春市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.4123,
                    27.8134
                ],
                "address": "宜春市袁州区袁山中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "袁山中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "宜春火车站",
                "type": "transport",
                "position": [
                    114.417,
                    27.816
                ],
                "risk": "中"
            }
        ]
    },
    "fuzhou2": {
        "name": "抚州",
        "center": [
            116.358,
            27.949
        ],
        "shelters": [
            {
                "id": "fz2_001",
                "name": "抚州站地下避难所",
                "type": "shelter",
                "position": [
                    116.358,
                    27.949
                ],
                "address": "抚州市临川区站前大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "抚州站地下通道",
                "description": "抚州铁路枢纽地下民防工程"
            },
            {
                "id": "fz2_002",
                "name": "抚州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.3534,
                    27.9467
                ],
                "address": "抚州市临川区赣东大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "赣东大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "抚州火车站",
                "type": "transport",
                "position": [
                    116.358,
                    27.949
                ],
                "risk": "低"
            }
        ]
    },
    "dongying": {
        "name": "东营",
        "center": [
            118.675,
            37.434
        ],
        "shelters": [
            {
                "id": "dy_001",
                "name": "东营南站地下避难所",
                "type": "shelter",
                "position": [
                    118.5234,
                    37.3567
                ],
                "address": "东营市东营区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "东营南站地下",
                "description": "东营铁路枢纽地下民防工程"
            },
            {
                "id": "dy_002",
                "name": "东营市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.6701,
                    34.4312
                ],
                "address": "东营市东营区济南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "济南路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "dy_003",
                "name": "胜利油田地下指挥中心",
                "type": "shelter",
                "position": [
                    118.7234,
                    37.4234
                ],
                "address": "东营市东营区",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "胜利油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "胜利油田",
                "type": "factory",
                "position": [
                    118.7234,
                    37.4234
                ],
                "risk": "高"
            }
        ]
    },
    "yantai": {
        "name": "烟台",
        "center": [
            121.448,
            37.463
        ],
        "shelters": [
            {
                "id": "yt2_001",
                "name": "烟台站地下避难所",
                "type": "shelter",
                "position": [
                    121.448,
                    37.463
                ],
                "address": "烟台市芝罘区北马路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "烟台站地下通道",
                "description": "山东半岛铁路枢纽地下民防工程"
            },
            {
                "id": "yt2_002",
                "name": "烟台南站地下避难所",
                "type": "shelter",
                "position": [
                    121.2567,
                    37.3789
                ],
                "address": "烟台市莱山区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "烟台南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yt2_003",
                "name": "烟台市人防地下商城",
                "type": "underground_mall",
                "position": [
                    121.4434,
                    37.4601
                ],
                "address": "烟台市芝罘区南大街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点、通信设备",
                "access": "南大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yt2_004",
                "name": "烟台港地下指挥中心",
                "type": "shelter",
                "position": [
                    121.4567,
                    37.5567
                ],
                "address": "烟台市芝罘区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "烟台港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "烟台港",
                "type": "port",
                "position": [
                    121.4567,
                    37.5567
                ],
                "risk": "高"
            },
            {
                "name": "烟台火车站",
                "type": "transport",
                "position": [
                    121.448,
                    37.463
                ],
                "risk": "中"
            }
        ]
    },
    "weifang": {
        "name": "潍坊",
        "center": [
            119.161,
            36.707
        ],
        "shelters": [
            {
                "id": "wf_001",
                "name": "潍坊站地下避难所",
                "type": "shelter",
                "position": [
                    119.161,
                    36.707
                ],
                "address": "潍坊市潍城区和平路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "潍坊站地下通道",
                "description": "潍坊铁路枢纽地下民防工程"
            },
            {
                "id": "wf_002",
                "name": "潍坊北站地下避难所",
                "type": "shelter",
                "position": [
                    119.2234,
                    36.7789
                ],
                "address": "潍坊市寒亭区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "潍坊北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "wf_003",
                "name": "潍坊市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.1567,
                    36.7045
                ],
                "address": "潍坊市潍城区胜利西街",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "胜利西街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "wf_004",
                "name": "潍坊港地下指挥中心",
                "type": "shelter",
                "position": [
                    119.3567,
                    37.0234
                ],
                "address": "潍坊市滨海区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "潍坊港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "潍坊港",
                "type": "port",
                "position": [
                    119.3567,
                    37.0234
                ],
                "risk": "中"
            },
            {
                "name": "潍坊火车站",
                "type": "transport",
                "position": [
                    119.161,
                    36.707
                ],
                "risk": "中"
            }
        ]
    },
    "jining2": {
        "name": "济宁",
        "center": [
            116.349,
            35.415
        ],
        "shelters": [
            {
                "id": "jn2_001",
                "name": "济宁站地下避难所",
                "type": "shelter",
                "position": [
                    116.349,
                    35.415
                ],
                "address": "济宁市任城区建设路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "济宁站地下通道",
                "description": "济宁铁路枢纽地下民防工程"
            },
            {
                "id": "jn2_002",
                "name": "济宁北站地下避难所",
                "type": "shelter",
                "position": [
                    116.4234,
                    35.4567
                ],
                "address": "济宁市任城区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "济宁北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "jn2_003",
                "name": "济宁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.3445,
                    35.4123
                ],
                "address": "济宁市任城区太白楼中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "太白楼中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jn2_004",
                "name": "济宁煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    116.3789,
                    35.4567
                ],
                "address": "济宁市任城区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "济宁煤矿",
                "type": "factory",
                "position": [
                    116.3789,
                    35.4567
                ],
                "risk": "中"
            }
        ]
    },
    "taian": {
        "name": "泰安",
        "center": [
            117.089,
            36.201
        ],
        "shelters": [
            {
                "id": "ta_001",
                "name": "泰山站地下避难所",
                "type": "shelter",
                "position": [
                    117.089,
                    36.201
                ],
                "address": "泰安市泰山区龙潭路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "泰山站地下通道",
                "description": "泰安铁路枢纽地下民防工程"
            },
            {
                "id": "ta_002",
                "name": "泰安站地下避难所",
                "type": "shelter",
                "position": [
                    117.0234,
                    36.1789
                ],
                "address": "泰安市岱岳区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "泰安站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ta_003",
                "name": "泰安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.0845,
                    36.1989
                ],
                "address": "泰安市泰山区东岳大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "东岳大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "泰山站",
                "type": "transport",
                "position": [
                    117.089,
                    36.201
                ],
                "risk": "中"
            }
        ]
    },
    "weihai": {
        "name": "威海",
        "center": [
            122.12,
            37.513
        ],
        "shelters": [
            {
                "id": "wh_001",
                "name": "威海站地下避难所",
                "type": "shelter",
                "position": [
                    122.12,
                    37.513
                ],
                "address": "威海市环翠区上海路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "威海站地下通道",
                "description": "威海铁路枢纽地下民防工程"
            },
            {
                "id": "wh_002",
                "name": "威海市人防地下商城",
                "type": "underground_mall",
                "position": [
                    122.1156,
                    37.5106
                ],
                "address": "威海市环翠区新威路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "新威路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "wh_003",
                "name": "威海港地下指挥中心",
                "type": "shelter",
                "position": [
                    122.1789,
                    37.5123
                ],
                "address": "威海市环翠区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "威海港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "威海港",
                "type": "port",
                "position": [
                    122.1789,
                    37.5123
                ],
                "risk": "中"
            }
        ]
    },
    "rizhao": {
        "name": "日照",
        "center": [
            119.527,
            35.417
        ],
        "shelters": [
            {
                "id": "rz_001",
                "name": "日照站地下避难所",
                "type": "shelter",
                "position": [
                    119.527,
                    35.417
                ],
                "address": "日照市东港区海滨五路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "日照站地下通道",
                "description": "日照铁路枢纽地下民防工程"
            },
            {
                "id": "rz_002",
                "name": "日照西站地下避难所",
                "type": "shelter",
                "position": [
                    119.3567,
                    35.4567
                ],
                "address": "日照市东港区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "日照西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "rz_003",
                "name": "日照市人防地下商城",
                "type": "underground_mall",
                "position": [
                    119.5223,
                    35.4145
                ],
                "address": "日照市东港区海曲中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "海曲中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "rz_004",
                "name": "日照港地下指挥中心",
                "type": "shelter",
                "position": [
                    119.5567,
                    35.4234
                ],
                "address": "日照市东港区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "日照港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "日照港",
                "type": "port",
                "position": [
                    119.5567,
                    35.4234
                ],
                "risk": "中"
            }
        ]
    },
    "linyi2": {
        "name": "临沂",
        "center": [
            118.357,
            35.104
        ],
        "shelters": [
            {
                "id": "ly3_001",
                "name": "临沂站地下避难所",
                "type": "shelter",
                "position": [
                    118.357,
                    35.104
                ],
                "address": "临沂市兰山区沂蒙路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "临沂站地下通道",
                "description": "鲁南铁路枢纽地下民防工程"
            },
            {
                "id": "ly3_002",
                "name": "临沂北站地下避难所",
                "type": "shelter",
                "position": [
                    118.4234,
                    35.1567
                ],
                "address": "临沂市兰山区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "临沂北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ly3_003",
                "name": "临沂市人防地下商城",
                "type": "underground_mall",
                "position": [
                    118.3523,
                    35.1012
                ],
                "address": "临沂市兰山区解放路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "临沂火车站",
                "type": "transport",
                "position": [
                    118.357,
                    35.104
                ],
                "risk": "中"
            }
        ]
    },
    "dezhou": {
        "name": "德州",
        "center": [
            116.359,
            37.436
        ],
        "shelters": [
            {
                "id": "dz_001",
                "name": "德州站地下避难所",
                "type": "shelter",
                "position": [
                    116.359,
                    37.436
                ],
                "address": "德州市德城区迎宾大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "德州站地下通道",
                "description": "德州铁路枢纽地下民防工程"
            },
            {
                "id": "dz_002",
                "name": "德州东站地下避难所",
                "type": "shelter",
                "position": [
                    116.4567,
                    37.4234
                ],
                "address": "德州市陵城区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "德州东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "dz_003",
                "name": "德州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.3545,
                    37.4334
                ],
                "address": "德州市德城区东风中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "东风中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "德州火车站",
                "type": "transport",
                "position": [
                    116.359,
                    37.436
                ],
                "risk": "中"
            }
        ]
    },
    "liaocheng": {
        "name": "聊城",
        "center": [
            115.985,
            36.457
        ],
        "shelters": [
            {
                "id": "lc_001",
                "name": "聊城站地下避难所",
                "type": "shelter",
                "position": [
                    115.985,
                    36.457
                ],
                "address": "聊城市东昌府区站前街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "聊城站地下通道",
                "description": "聊城铁路枢纽地下民防工程"
            },
            {
                "id": "lc_002",
                "name": "聊城市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.9801,
                    36.4545
                ],
                "address": "聊城市东昌府区柳园路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "柳园路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "聊城火车站",
                "type": "transport",
                "position": [
                    115.985,
                    36.457
                ],
                "risk": "中"
            }
        ]
    },
    "binzhou": {
        "name": "滨州",
        "center": [
            117.972,
            37.383
        ],
        "shelters": [
            {
                "id": "bz2_001",
                "name": "滨州站地下避难所",
                "type": "shelter",
                "position": [
                    117.972,
                    37.383
                ],
                "address": "滨州市滨城区渤海二十路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "滨州站地下通道",
                "description": "滨州铁路枢纽地下民防工程"
            },
            {
                "id": "bz2_002",
                "name": "滨州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    117.9678,
                    37.3806
                ],
                "address": "滨州市滨城区渤海七路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "渤海七路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "滨州火车站",
                "type": "transport",
                "position": [
                    117.972,
                    37.383
                ],
                "risk": "低"
            }
        ]
    },
    "kaifeng": {
        "name": "开封",
        "center": [
            114.341,
            34.797
        ],
        "shelters": [
            {
                "id": "kf_001",
                "name": "开封站地下避难所",
                "type": "shelter",
                "position": [
                    114.341,
                    34.797
                ],
                "address": "开封市禹王台区中山路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "开封站地下通道",
                "description": "开封铁路枢纽地下民防工程"
            },
            {
                "id": "kf_002",
                "name": "开封北站地下避难所",
                "type": "shelter",
                "position": [
                    114.4234,
                    34.8567
                ],
                "address": "开封市龙亭区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "开封北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "kf_003",
                "name": "开封市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.3367,
                    34.7945
                ],
                "address": "开封市龙亭区中山路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中山路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "开封火车站",
                "type": "transport",
                "position": [
                    114.341,
                    34.797
                ],
                "risk": "中"
            }
        ]
    },
    "luoyang": {
        "name": "洛阳",
        "center": [
            112.453,
            34.619
        ],
        "shelters": [
            {
                "id": "ly4_001",
                "name": "洛阳站地下避难所",
                "type": "shelter",
                "position": [
                    112.453,
                    34.619
                ],
                "address": "洛阳市西工区道南路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "洛阳站地下通道",
                "description": "豫西铁路枢纽地下民防工程"
            },
            {
                "id": "ly4_002",
                "name": "洛阳龙门站地下避难所",
                "type": "shelter",
                "position": [
                    112.4567,
                    34.6234
                ],
                "address": "洛阳市洛龙区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "洛阳龙门站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ly4_003",
                "name": "洛阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.4489,
                    34.6167
                ],
                "address": "洛阳市西工区中州中路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中州中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "ly4_004",
                "name": "洛阳石化地下指挥所",
                "type": "shelter",
                "position": [
                    112.5234,
                    34.6789
                ],
                "address": "洛阳市吉利区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "洛阳石化地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "洛阳石化",
                "type": "factory",
                "position": [
                    112.5234,
                    34.6789
                ],
                "risk": "中"
            },
            {
                "name": "洛阳火车站",
                "type": "transport",
                "position": [
                    112.453,
                    34.619
                ],
                "risk": "中"
            }
        ]
    },
    "pingdingshan": {
        "name": "平顶山",
        "center": [
            113.192,
            33.767
        ],
        "shelters": [
            {
                "id": "pds_001",
                "name": "平顶山西站地下避难所",
                "type": "shelter",
                "position": [
                    113.0234,
                    33.8123
                ],
                "address": "平顶山市宝丰县",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "平顶山西站地下",
                "description": "平顶山铁路枢纽地下民防工程"
            },
            {
                "id": "pds_002",
                "name": "平顶山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.1878,
                    33.7645
                ],
                "address": "平顶山市新华区建设路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "建设路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "pds_003",
                "name": "平顶山煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    113.2567,
                    33.8345
                ],
                "address": "平顶山市卫东区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "平顶山煤矿",
                "type": "factory",
                "position": [
                    113.2567,
                    33.8345
                ],
                "risk": "中"
            }
        ]
    },
    "anyang": {
        "name": "安阳",
        "center": [
            114.392,
            36.099
        ],
        "shelters": [
            {
                "id": "ay_001",
                "name": "安阳站地下避难所",
                "type": "shelter",
                "position": [
                    114.392,
                    36.099
                ],
                "address": "安阳市北关区解放大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "安阳站地下通道",
                "description": "安阳铁路枢纽地下民防工程"
            },
            {
                "id": "ay_002",
                "name": "安阳东站地下避难所",
                "type": "shelter",
                "position": [
                    114.4567,
                    36.1234
                ],
                "address": "安阳市文峰区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "安阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ay_003",
                "name": "安阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.3878,
                    36.0967
                ],
                "address": "安阳市北关区人民大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "安阳火车站",
                "type": "transport",
                "position": [
                    114.392,
                    36.099
                ],
                "risk": "中"
            }
        ]
    },
    "hebi": {
        "name": "鹤壁",
        "center": [
            114.298,
            35.748
        ],
        "shelters": [
            {
                "id": "hb2_001",
                "name": "鹤壁东站地下避难所",
                "type": "shelter",
                "position": [
                    114.3567,
                    35.789
                ],
                "address": "鹤壁市淇滨区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "鹤壁东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hb2_002",
                "name": "鹤壁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.2934,
                    35.7456
                ],
                "address": "鹤壁市淇滨区兴鹤大街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "兴鹤大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "鹤壁东站",
                "type": "transport",
                "position": [
                    114.3567,
                    35.789
                ],
                "risk": "中"
            }
        ]
    },
    "xinxiang": {
        "name": "新乡",
        "center": [
            113.929,
            35.303
        ],
        "shelters": [
            {
                "id": "xx_001",
                "name": "新乡站地下避难所",
                "type": "shelter",
                "position": [
                    113.929,
                    35.303
                ],
                "address": "新乡市卫滨区平原路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "新乡站地下通道",
                "description": "新乡铁路枢纽地下民防工程"
            },
            {
                "id": "xx_002",
                "name": "新乡东站地下避难所",
                "type": "shelter",
                "position": [
                    113.9567,
                    35.3234
                ],
                "address": "新乡市牧野区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "新乡东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xx_003",
                "name": "新乡市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.9245,
                    35.3006
                ],
                "address": "新乡市红旗区平原路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "平原路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "新乡火车站",
                "type": "transport",
                "position": [
                    113.929,
                    35.303
                ],
                "risk": "中"
            }
        ]
    },
    "jiaozuo": {
        "name": "焦作",
        "center": [
            113.242,
            35.216
        ],
        "shelters": [
            {
                "id": "jz3_001",
                "name": "焦作站地下避难所",
                "type": "shelter",
                "position": [
                    113.242,
                    35.216
                ],
                "address": "焦作市解放区民主南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "焦作站地下通道",
                "description": "焦作铁路枢纽地下民防工程"
            },
            {
                "id": "jz3_002",
                "name": "焦作市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.2378,
                    35.2134
                ],
                "address": "焦作市解放区解放中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "jz3_003",
                "name": "焦作煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    113.2789,
                    35.2567
                ],
                "address": "焦作市中站区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "焦作煤矿",
                "type": "factory",
                "position": [
                    113.2789,
                    35.2567
                ],
                "risk": "中"
            }
        ]
    },
    "puyang": {
        "name": "濮阳",
        "center": [
            115.041,
            35.764
        ],
        "shelters": [
            {
                "id": "py_001",
                "name": "濮阳站地下避难所",
                "type": "shelter",
                "position": [
                    115.041,
                    35.764
                ],
                "address": "濮阳市华龙区站前路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "濮阳站地下通道",
                "description": "濮阳铁路枢纽地下民防工程"
            },
            {
                "id": "py_002",
                "name": "濮阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.0367,
                    35.7612
                ],
                "address": "濮阳市华龙区人民路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "py_003",
                "name": "中原油田地下指挥中心",
                "type": "shelter",
                "position": [
                    115.0789,
                    35.8234
                ],
                "address": "濮阳市华龙区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "中原油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "中原油田",
                "type": "factory",
                "position": [
                    115.0789,
                    35.8234
                ],
                "risk": "高"
            }
        ]
    },
    "xuchang": {
        "name": "许昌",
        "center": [
            113.852,
            34.036
        ],
        "shelters": [
            {
                "id": "xc2_001",
                "name": "许昌站地下避难所",
                "type": "shelter",
                "position": [
                    113.852,
                    34.036
                ],
                "address": "许昌市魏都区颖昌路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "许昌站地下通道",
                "description": "许昌铁路枢纽地下民防工程"
            },
            {
                "id": "xc2_002",
                "name": "许昌东站地下避难所",
                "type": "shelter",
                "position": [
                    113.9234,
                    34.0567
                ],
                "address": "许昌市建安区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "许昌东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xc2_003",
                "name": "许昌市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.8478,
                    34.0334
                ],
                "address": "许昌市魏都区七一路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "七一路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "许昌火车站",
                "type": "transport",
                "position": [
                    113.852,
                    34.036
                ],
                "risk": "中"
            }
        ]
    },
    "luohe": {
        "name": "漯河",
        "center": [
            114.016,
            33.586
        ],
        "shelters": [
            {
                "id": "lh_001",
                "name": "漯河站地下避难所",
                "type": "shelter",
                "position": [
                    114.016,
                    33.586
                ],
                "address": "漯河市源汇区老街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "漯河站地下通道",
                "description": "漯河铁路枢纽地下民防工程"
            },
            {
                "id": "lh_002",
                "name": "漯河西站地下避难所",
                "type": "shelter",
                "position": [
                    113.9567,
                    33.6123
                ],
                "address": "漯河市源汇区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "漯河西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "lh_003",
                "name": "漯河市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.0112,
                    33.5834
                ],
                "address": "漯河市郾城区黄河路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "黄河路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "漯河火车站",
                "type": "transport",
                "position": [
                    114.016,
                    33.586
                ],
                "risk": "中"
            }
        ]
    },
    "sanmenxia": {
        "name": "三门峡",
        "center": [
            111.2,
            34.772
        ],
        "shelters": [
            {
                "id": "smx_001",
                "name": "三门峡站地下避难所",
                "type": "shelter",
                "position": [
                    111.2,
                    34.772
                ],
                "address": "三门峡市湖滨区黄河东路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "三门峡站地下通道",
                "description": "三门峡铁路枢纽地下民防工程"
            },
            {
                "id": "smx_002",
                "name": "三门峡南站地下避难所",
                "type": "shelter",
                "position": [
                    111.1234,
                    34.7567
                ],
                "address": "三门峡市陕州区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "三门峡南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "smx_003",
                "name": "三门峡市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.1956,
                    34.7698
                ],
                "address": "三门峡市湖滨区六峰路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "六峰路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "三门峡火车站",
                "type": "transport",
                "position": [
                    111.2,
                    34.772
                ],
                "risk": "中"
            }
        ]
    },
    "nanyang": {
        "name": "南阳",
        "center": [
            112.528,
            33.005
        ],
        "shelters": [
            {
                "id": "ny_001",
                "name": "南阳站地下避难所",
                "type": "shelter",
                "position": [
                    112.528,
                    33.005
                ],
                "address": "南阳市卧龙区新华西路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "南阳站地下通道",
                "description": "南阳铁路枢纽地下民防工程"
            },
            {
                "id": "ny_002",
                "name": "南阳东站地下避难所",
                "type": "shelter",
                "position": [
                    112.6234,
                    33.0123
                ],
                "address": "南阳市宛城区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "南阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ny_003",
                "name": "南阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.5234,
                    33.0023
                ],
                "address": "南阳市卧龙区中州中路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中州中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "ny_004",
                "name": "南阳油田地下指挥中心",
                "type": "shelter",
                "position": [
                    112.6789,
                    33.0567
                ],
                "address": "南阳市宛城区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "油田应急指挥系统",
                "access": "南阳油田地下",
                "description": "重要能源设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "南阳火车站",
                "type": "transport",
                "position": [
                    112.528,
                    33.005
                ],
                "risk": "中"
            }
        ]
    },
    "shangqiu": {
        "name": "商丘",
        "center": [
            115.656,
            34.414
        ],
        "shelters": [
            {
                "id": "sq2_001",
                "name": "商丘站地下避难所",
                "type": "shelter",
                "position": [
                    115.656,
                    34.414
                ],
                "address": "商丘市梁园区站前路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "商丘站地下通道",
                "description": "商丘铁路枢纽地下民防工程"
            },
            {
                "id": "sq2_002",
                "name": "商丘东站地下避难所",
                "type": "shelter",
                "position": [
                    115.7567,
                    34.4234
                ],
                "address": "商丘市虞城县",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "商丘东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "sq2_003",
                "name": "商丘市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.6512,
                    34.4112
                ],
                "address": "商丘市梁园区神火大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "神火大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "商丘火车站",
                "type": "transport",
                "position": [
                    115.656,
                    34.414
                ],
                "risk": "中"
            }
        ]
    },
    "xinyang": {
        "name": "信阳",
        "center": [
            114.091,
            32.147
        ],
        "shelters": [
            {
                "id": "xy4_001",
                "name": "信阳站地下避难所",
                "type": "shelter",
                "position": [
                    114.091,
                    32.147
                ],
                "address": "信阳市浉河区新华东路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "信阳站地下通道",
                "description": "信阳铁路枢纽地下民防工程"
            },
            {
                "id": "xy4_002",
                "name": "信阳东站地下避难所",
                "type": "shelter",
                "position": [
                    114.1567,
                    32.1234
                ],
                "address": "信阳市平桥区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "信阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xy4_003",
                "name": "信阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.0867,
                    32.1445
                ],
                "address": "信阳市浉河区东方红大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "东方红大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "信阳火车站",
                "type": "transport",
                "position": [
                    114.091,
                    32.147
                ],
                "risk": "中"
            }
        ]
    },
    "zhoukou": {
        "name": "周口",
        "center": [
            114.697,
            33.626
        ],
        "shelters": [
            {
                "id": "zk_001",
                "name": "周口站地下避难所",
                "type": "shelter",
                "position": [
                    114.697,
                    33.626
                ],
                "address": "周口市川汇区交通大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "周口站地下通道",
                "description": "周口铁路枢纽地下民防工程"
            },
            {
                "id": "zk_002",
                "name": "周口东站地下避难所",
                "type": "shelter",
                "position": [
                    114.8234,
                    33.6789
                ],
                "address": "周口市川汇区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "周口东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "zk_003",
                "name": "周口市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.6923,
                    33.6234
                ],
                "address": "周口市川汇区七一路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "七一路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "周口火车站",
                "type": "transport",
                "position": [
                    114.697,
                    33.626
                ],
                "risk": "中"
            }
        ]
    },
    "shiyan": {
        "name": "十堰",
        "center": [
            110.787,
            32.65
        ],
        "shelters": [
            {
                "id": "sy2_001",
                "name": "十堰站地下避难所",
                "type": "shelter",
                "position": [
                    110.787,
                    32.65
                ],
                "address": "十堰市茅箭区车站路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "十堰站地下通道",
                "description": "十堰铁路枢纽地下民防工程"
            },
            {
                "id": "sy2_002",
                "name": "十堰东站地下避难所",
                "type": "shelter",
                "position": [
                    110.8567,
                    32.6123
                ],
                "address": "十堰市张湾区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "十堰东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "sy2_003",
                "name": "十堰市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.7823,
                    32.6478
                ],
                "address": "十堰市茅箭区人民北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "十堰火车站",
                "type": "transport",
                "position": [
                    110.787,
                    32.65
                ],
                "risk": "中"
            }
        ]
    },
    "yichang": {
        "name": "宜昌",
        "center": [
            111.291,
            30.697
        ],
        "shelters": [
            {
                "id": "yc5_001",
                "name": "宜昌东站地下避难所",
                "type": "shelter",
                "position": [
                    111.3567,
                    30.6789
                ],
                "address": "宜昌市伍家岗区",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施、发电设备",
                "access": "宜昌东站地下",
                "description": "宜昌高铁枢纽人防工程"
            },
            {
                "id": "yc5_002",
                "name": "宜昌站地下避难所",
                "type": "shelter",
                "position": [
                    111.2867,
                    30.6956
                ],
                "address": "宜昌市西陵区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "宜昌站地下",
                "description": "宜昌铁路枢纽人防工程"
            },
            {
                "id": "yc5_003",
                "name": "宜昌市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.2878,
                    30.6945
                ],
                "address": "宜昌市西陵区夷陵大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "夷陵大道地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yc5_004",
                "name": "葛洲坝地下指挥中心",
                "type": "shelter",
                "position": [
                    111.2567,
                    30.7456
                ],
                "address": "宜昌市西陵区",
                "capacity": "5000人",
                "level": "核5级",
                "facilities": "水利设施防护系统",
                "access": "葛洲坝地下",
                "description": "重要水利设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "葛洲坝水电站",
                "type": "dam",
                "position": [
                    111.2567,
                    30.7456
                ],
                "risk": "高"
            },
            {
                "name": "三峡大坝",
                "type": "dam",
                "position": [
                    111.0034,
                    30.8234
                ],
                "risk": "高"
            }
        ]
    },
    "xiangyang": {
        "name": "襄阳",
        "center": [
            112.122,
            32.009
        ],
        "shelters": [
            {
                "id": "xy5_001",
                "name": "襄阳站地下避难所",
                "type": "shelter",
                "position": [
                    112.122,
                    32.009
                ],
                "address": "襄阳市樊城区中原路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "襄阳站地下通道",
                "description": "襄阳铁路枢纽地下民防工程"
            },
            {
                "id": "xy5_002",
                "name": "襄阳东站地下避难所",
                "type": "shelter",
                "position": [
                    112.2234,
                    32.0567
                ],
                "address": "襄阳市襄州区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "襄阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xy5_003",
                "name": "襄阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.1178,
                    32.0067
                ],
                "address": "襄阳市樊城区人民路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "襄阳火车站",
                "type": "transport",
                "position": [
                    112.122,
                    32.009
                ],
                "risk": "中"
            }
        ]
    },
    "ezhou": {
        "name": "鄂州",
        "center": [
            114.89,
            30.396
        ],
        "shelters": [
            {
                "id": "ez_001",
                "name": "鄂州站地下避难所",
                "type": "shelter",
                "position": [
                    114.89,
                    30.396
                ],
                "address": "鄂州市鄂城区江碧路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "鄂州站地下通道",
                "description": "鄂州铁路枢纽地下民防工程"
            },
            {
                "id": "ez_002",
                "name": "鄂州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.8856,
                    30.3934
                ],
                "address": "鄂州市鄂城区南浦路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "南浦路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "ez_003",
                "name": "鄂州钢铁厂地下指挥所",
                "type": "shelter",
                "position": [
                    114.9234,
                    30.4234
                ],
                "address": "鄂州市鄂城区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "鄂钢地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "鄂州钢铁",
                "type": "factory",
                "position": [
                    114.9234,
                    30.4234
                ],
                "risk": "中"
            }
        ]
    },
    "jingmen": {
        "name": "荆门",
        "center": [
            112.204,
            31.035
        ],
        "shelters": [
            {
                "id": "jm_001",
                "name": "荆门站地下避难所",
                "type": "shelter",
                "position": [
                    112.204,
                    31.035
                ],
                "address": "荆门市东宝区月亮湖路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "荆门站地下通道",
                "description": "荆门铁路枢纽地下民防工程"
            },
            {
                "id": "jm_002",
                "name": "荆门市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.1998,
                    31.0323
                ],
                "address": "荆门市东宝区象山大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "象山大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "荆门火车站",
                "type": "transport",
                "position": [
                    112.204,
                    31.035
                ],
                "risk": "低"
            }
        ]
    },
    "xiaogan": {
        "name": "孝感",
        "center": [
            113.91,
            30.928
        ],
        "shelters": [
            {
                "id": "xg_001",
                "name": "孝感站地下避难所",
                "type": "shelter",
                "position": [
                    113.91,
                    30.928
                ],
                "address": "孝感市孝南区城站路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "孝感站地下通道",
                "description": "孝感铁路枢纽地下民防工程"
            },
            {
                "id": "xg_002",
                "name": "孝感东站地下避难所",
                "type": "shelter",
                "position": [
                    113.9567,
                    30.9789
                ],
                "address": "孝感市孝南区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "孝感东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xg_003",
                "name": "孝感市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.9056,
                    30.9256
                ],
                "address": "孝感市孝南区城站路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "城站路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "孝感火车站",
                "type": "transport",
                "position": [
                    113.91,
                    30.928
                ],
                "risk": "中"
            }
        ]
    },
    "jingzhou": {
        "name": "荆州",
        "center": [
            112.239,
            30.335
        ],
        "shelters": [
            {
                "id": "jz4_001",
                "name": "荆州站地下避难所",
                "type": "shelter",
                "position": [
                    112.239,
                    30.335
                ],
                "address": "荆州市荆州区荆楚大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "荆州站地下通道",
                "description": "荆州铁路枢纽地下民防工程"
            },
            {
                "id": "jz4_002",
                "name": "荆州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.2345,
                    30.3323
                ],
                "address": "荆州市沙市区北京路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "北京路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "荆州火车站",
                "type": "transport",
                "position": [
                    112.239,
                    30.335
                ],
                "risk": "中"
            }
        ]
    },
    "huanggang": {
        "name": "黄冈",
        "center": [
            114.879,
            30.447
        ],
        "shelters": [
            {
                "id": "hg2_001",
                "name": "黄冈站地下避难所",
                "type": "shelter",
                "position": [
                    114.879,
                    30.447
                ],
                "address": "黄冈市黄州区路口镇",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "黄冈站地下通道",
                "description": "黄冈铁路枢纽地下民防工程"
            },
            {
                "id": "hg2_002",
                "name": "黄冈东站地下避难所",
                "type": "shelter",
                "position": [
                    114.9234,
                    30.4789
                ],
                "address": "黄冈市黄州区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "黄冈东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hg2_003",
                "name": "黄冈市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.8745,
                    30.4445
                ],
                "address": "黄冈市黄州区东门路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "东门路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "黄冈火车站",
                "type": "transport",
                "position": [
                    114.879,
                    30.447
                ],
                "risk": "中"
            }
        ]
    },
    "xianning": {
        "name": "咸宁",
        "center": [
            114.322,
            29.833
        ],
        "shelters": [
            {
                "id": "xn_001",
                "name": "咸宁站地下避难所",
                "type": "shelter",
                "position": [
                    114.322,
                    29.833
                ],
                "address": "咸宁市咸安区怀德路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "咸宁站地下通道",
                "description": "咸宁铁路枢纽地下民防工程"
            },
            {
                "id": "xn_002",
                "name": "咸宁北站地下避难所",
                "type": "shelter",
                "position": [
                    114.3567,
                    29.8789
                ],
                "address": "咸宁市咸安区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "咸宁北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xn_003",
                "name": "咸宁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.3178,
                    29.8306
                ],
                "address": "咸宁市咸安区温泉路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "温泉路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "咸宁火车站",
                "type": "transport",
                "position": [
                    114.322,
                    29.833
                ],
                "risk": "中"
            }
        ]
    },
    "suizhou": {
        "name": "随州",
        "center": [
            113.373,
            31.692
        ],
        "shelters": [
            {
                "id": "sz3_001",
                "name": "随州站地下避难所",
                "type": "shelter",
                "position": [
                    113.373,
                    31.692
                ],
                "address": "随州市曾都区交通大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "随州站地下通道",
                "description": "随州铁路枢纽地下民防工程"
            },
            {
                "id": "sz3_002",
                "name": "随州南站地下避难所",
                "type": "shelter",
                "position": [
                    113.4567,
                    31.7234
                ],
                "address": "随州市曾都区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "随州南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "sz3_003",
                "name": "随州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.3689,
                    31.6898
                ],
                "address": "随州市曾都区解放路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "随州火车站",
                "type": "transport",
                "position": [
                    113.373,
                    31.692
                ],
                "risk": "中"
            }
        ]
    },
    "xiangtan": {
        "name": "湘潭",
        "center": [
            112.944,
            27.829
        ],
        "shelters": [
            {
                "id": "xt2_001",
                "name": "湘潭站地下避难所",
                "type": "shelter",
                "position": [
                    112.944,
                    27.829
                ],
                "address": "湘潭市雨湖区车站路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "湘潭站地下通道",
                "description": "湘潭铁路枢纽地下民防工程"
            },
            {
                "id": "xt2_002",
                "name": "湘潭北站地下避难所",
                "type": "shelter",
                "position": [
                    112.9567,
                    27.9234
                ],
                "address": "湘潭市九华示范区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "湘潭北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "xt2_003",
                "name": "湘潭市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.9398,
                    27.8267
                ],
                "address": "湘潭市雨湖区建设北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "建设北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "湘潭火车站",
                "type": "transport",
                "position": [
                    112.944,
                    27.829
                ],
                "risk": "中"
            }
        ]
    },
    "hengyang": {
        "name": "衡阳",
        "center": [
            112.572,
            26.894
        ],
        "shelters": [
            {
                "id": "hy_001",
                "name": "衡阳站地下避难所",
                "type": "shelter",
                "position": [
                    112.572,
                    26.894
                ],
                "address": "衡阳市珠晖区东风路",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "衡阳站地下通道",
                "description": "衡阳铁路枢纽地下民防工程"
            },
            {
                "id": "hy_002",
                "name": "衡阳东站地下避难所",
                "type": "shelter",
                "position": [
                    112.6789,
                    26.9234
                ],
                "address": "衡阳市珠晖区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "衡阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hy_003",
                "name": "衡阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.5678,
                    26.8912
                ],
                "address": "衡阳市蒸湘区解放大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "衡阳火车站",
                "type": "transport",
                "position": [
                    112.572,
                    26.894
                ],
                "risk": "中"
            }
        ]
    },
    "shaoyang": {
        "name": "邵阳",
        "center": [
            111.469,
            27.242
        ],
        "shelters": [
            {
                "id": "sy3_001",
                "name": "邵阳站地下避难所",
                "type": "shelter",
                "position": [
                    111.469,
                    27.242
                ],
                "address": "邵阳市大祥区双拥路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "邵阳站地下通道",
                "description": "邵阳铁路枢纽地下民防工程"
            },
            {
                "id": "sy3_002",
                "name": "邵阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.4645,
                    27.2398
                ],
                "address": "邵阳市大祥区红旗路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "红旗路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "邵阳火车站",
                "type": "transport",
                "position": [
                    111.469,
                    27.242
                ],
                "risk": "中"
            }
        ]
    },
    "yueyang": {
        "name": "岳阳",
        "center": [
            113.129,
            29.357
        ],
        "shelters": [
            {
                "id": "yy_001",
                "name": "岳阳站地下避难所",
                "type": "shelter",
                "position": [
                    113.129,
                    29.357
                ],
                "address": "岳阳市岳阳楼区站前路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "岳阳站地下通道",
                "description": "岳阳铁路枢纽地下民防工程"
            },
            {
                "id": "yy_002",
                "name": "岳阳东站地下避难所",
                "type": "shelter",
                "position": [
                    113.1567,
                    29.3789
                ],
                "address": "岳阳市岳阳楼区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "岳阳东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yy_003",
                "name": "岳阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.1245,
                    29.3545
                ],
                "address": "岳阳市岳阳楼区巴陵中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "巴陵中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yy_004",
                "name": "岳阳港地下指挥中心",
                "type": "shelter",
                "position": [
                    113.1789,
                    29.4234
                ],
                "address": "岳阳市岳阳楼区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "岳阳港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "岳阳港",
                "type": "port",
                "position": [
                    113.1789,
                    29.4234
                ],
                "risk": "中"
            },
            {
                "name": "岳阳火车站",
                "type": "transport",
                "position": [
                    113.129,
                    29.357
                ],
                "risk": "中"
            }
        ]
    },
    "changde": {
        "name": "常德",
        "center": [
            111.699,
            29.032
        ],
        "shelters": [
            {
                "id": "cd2_001",
                "name": "常德站地下避难所",
                "type": "shelter",
                "position": [
                    111.699,
                    29.032
                ],
                "address": "常德市武陵区常德大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "常德站地下通道",
                "description": "常德铁路枢纽地下民防工程"
            },
            {
                "id": "cd2_002",
                "name": "常德市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.6945,
                    29.0298
                ],
                "address": "常德市武陵区武陵大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "武陵大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "常德火车站",
                "type": "transport",
                "position": [
                    111.699,
                    29.032
                ],
                "risk": "中"
            }
        ]
    },
    "zhangjiajie": {
        "name": "张家界",
        "center": [
            110.479,
            29.117
        ],
        "shelters": [
            {
                "id": "zjj_001",
                "name": "张家界站地下避难所",
                "type": "shelter",
                "position": [
                    110.479,
                    29.117
                ],
                "address": "张家界市永定区迎宾路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "张家界站地下通道",
                "description": "张家界铁路枢纽地下民防工程"
            },
            {
                "id": "zjj_002",
                "name": "张家界西站地下避难所",
                "type": "shelter",
                "position": [
                    110.4234,
                    29.1567
                ],
                "address": "张家界市永定区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "张家界西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "zjj_003",
                "name": "张家界市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.4745,
                    29.1145
                ],
                "address": "张家界市永定区解放路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "张家界火车站",
                "type": "transport",
                "position": [
                    110.479,
                    29.117
                ],
                "risk": "中"
            }
        ]
    },
    "yiyang2": {
        "name": "益阳",
        "center": [
            112.356,
            28.57
        ],
        "shelters": [
            {
                "id": "yy2_001",
                "name": "益阳站地下避难所",
                "type": "shelter",
                "position": [
                    112.356,
                    28.57
                ],
                "address": "益阳市赫山区金山南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "益阳站地下通道",
                "description": "益阳铁路枢纽地下民防工程"
            },
            {
                "id": "yy2_002",
                "name": "益阳南站地下避难所",
                "type": "shelter",
                "position": [
                    112.4567,
                    28.6234
                ],
                "address": "益阳市赫山区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "益阳南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yy2_003",
                "name": "益阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.3512,
                    28.5678
                ],
                "address": "益阳市赫山区桃花仑西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "桃花仑西路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "益阳火车站",
                "type": "transport",
                "position": [
                    112.356,
                    28.57
                ],
                "risk": "中"
            }
        ]
    },
    "chenzhou": {
        "name": "郴州",
        "center": [
            113.015,
            25.77
        ],
        "shelters": [
            {
                "id": "cz4_001",
                "name": "郴州站地下避难所",
                "type": "shelter",
                "position": [
                    113.015,
                    25.77
                ],
                "address": "郴州市北湖区解放路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "郴州站地下通道",
                "description": "郴州铁路枢纽地下民防工程"
            },
            {
                "id": "cz4_002",
                "name": "郴州西站地下避难所",
                "type": "shelter",
                "position": [
                    112.9567,
                    25.8234
                ],
                "address": "郴州市北湖区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "郴州西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "cz4_003",
                "name": "郴州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.0101,
                    25.7678
                ],
                "address": "郴州市北湖区人民西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民西路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "郴州火车站",
                "type": "transport",
                "position": [
                    113.015,
                    25.77
                ],
                "risk": "中"
            }
        ]
    },
    "yongzhou": {
        "name": "永州",
        "center": [
            111.608,
            26.451
        ],
        "shelters": [
            {
                "id": "yz2_001",
                "name": "永州站地下避难所",
                "type": "shelter",
                "position": [
                    111.608,
                    26.451
                ],
                "address": "永州市冷水滩区潇湘大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "永州站地下通道",
                "description": "永州铁路枢纽地下民防工程"
            },
            {
                "id": "yz2_002",
                "name": "永州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.6034,
                    26.4489
                ],
                "address": "永州市冷水滩区清桥路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "清桥路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "永州火车站",
                "type": "transport",
                "position": [
                    111.608,
                    26.451
                ],
                "risk": "中"
            }
        ]
    },
    "huaihua": {
        "name": "怀化",
        "center": [
            109.978,
            27.55
        ],
        "shelters": [
            {
                "id": "hh2_001",
                "name": "怀化南站地下避难所",
                "type": "shelter",
                "position": [
                    109.978,
                    27.55
                ],
                "address": "怀化市鹤城区高堰路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施、发电设备",
                "access": "怀化南站地下",
                "description": "怀化高铁枢纽人防工程"
            },
            {
                "id": "hh2_002",
                "name": "怀化市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.9734,
                    27.5478
                ],
                "address": "怀化市鹤城区人民南路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "怀化南站",
                "type": "transport",
                "position": [
                    109.978,
                    27.55
                ],
                "risk": "中"
            }
        ]
    },
    "loudi": {
        "name": "娄底",
        "center": [
            111.993,
            27.701
        ],
        "shelters": [
            {
                "id": "ld_001",
                "name": "娄底站地下避难所",
                "type": "shelter",
                "position": [
                    111.993,
                    27.701
                ],
                "address": "娄底市娄星区氐星路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "娄底站地下通道",
                "description": "娄底铁路枢纽地下民防工程"
            },
            {
                "id": "ld_002",
                "name": "娄底南站地下避难所",
                "type": "shelter",
                "position": [
                    112.0567,
                    27.7234
                ],
                "address": "娄底市娄星区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "娄底南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "ld_003",
                "name": "娄底市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.9889,
                    27.6989
                ],
                "address": "娄底市娄星区氐星路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "氐星路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "娄底火车站",
                "type": "transport",
                "position": [
                    111.993,
                    27.701
                ],
                "risk": "中"
            }
        ]
    },
    "shaoguan": {
        "name": "韶关",
        "center": [
            113.597,
            24.81
        ],
        "shelters": [
            {
                "id": "sg_001",
                "name": "韶关站地下避难所",
                "type": "shelter",
                "position": [
                    113.597,
                    24.81
                ],
                "address": "韶关市浈江区北江北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "韶关站地下通道",
                "description": "韶关铁路枢纽地下民防工程"
            },
            {
                "id": "sg_002",
                "name": "韶关东站地下避难所",
                "type": "shelter",
                "position": [
                    113.5567,
                    24.8234
                ],
                "address": "韶关市浈江区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "韶关东站地下",
                "description": "铁路枢纽人防工程"
            },
            {
                "id": "sg_003",
                "name": "韶关市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.5923,
                    24.8078
                ],
                "address": "韶关市浈江区解放路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "韶关火车站",
                "type": "transport",
                "position": [
                    113.597,
                    24.81
                ],
                "risk": "中"
            }
        ]
    },
    "zhanjiang": {
        "name": "湛江",
        "center": [
            110.365,
            21.271
        ],
        "shelters": [
            {
                "id": "zj_001",
                "name": "湛江西站地下避难所",
                "type": "shelter",
                "position": [
                    110.2567,
                    21.1567
                ],
                "address": "湛江市麻章区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "湛江西站地下",
                "description": "湛江高铁枢纽人防工程"
            },
            {
                "id": "zj_002",
                "name": "湛江站地下避难所",
                "type": "shelter",
                "position": [
                    110.3567,
                    21.2734
                ],
                "address": "湛江市霞山区解放西路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "湛江站地下",
                "description": "湛江铁路枢纽人防工程"
            },
            {
                "id": "zj_003",
                "name": "湛江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.3601,
                    21.2689
                ],
                "address": "湛江市霞山区人民大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民大道地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "zj_004",
                "name": "湛江港地下指挥中心",
                "type": "shelter",
                "position": [
                    110.4234,
                    21.2567
                ],
                "address": "湛江市霞山区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "湛江港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "湛江港",
                "type": "port",
                "position": [
                    110.4234,
                    21.2567
                ],
                "risk": "中"
            }
        ]
    },
    "maoming": {
        "name": "茂名",
        "center": [
            110.919,
            21.662
        ],
        "shelters": [
            {
                "id": "mm_001",
                "name": "茂名站地下避难所",
                "type": "shelter",
                "position": [
                    110.919,
                    21.662
                ],
                "address": "茂名市茂南区站北一路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "茂名站地下通道",
                "description": "茂名铁路枢纽地下民防工程"
            },
            {
                "id": "mm_002",
                "name": "茂名市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.9145,
                    21.6598
                ],
                "address": "茂名市茂南区油城四路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "油城四路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "mm_003",
                "name": "茂名石化地下指挥中心",
                "type": "shelter",
                "position": [
                    110.9789,
                    21.7234
                ],
                "address": "茂名市茂南区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "石化应急系统",
                "access": "茂名石化地下",
                "description": "重要工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "茂名石化",
                "type": "factory",
                "position": [
                    110.9789,
                    21.7234
                ],
                "risk": "高"
            }
        ]
    },
    "zhaoqing": {
        "name": "肇庆",
        "center": [
            112.465,
            23.048
        ],
        "shelters": [
            {
                "id": "zq_001",
                "name": "肇庆站地下避难所",
                "type": "shelter",
                "position": [
                    112.465,
                    23.048
                ],
                "address": "肇庆市端州区西江北路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "肇庆站地下通道",
                "description": "肇庆铁路枢纽地下民防工程"
            },
            {
                "id": "zq_002",
                "name": "肇庆东站地下避难所",
                "type": "shelter",
                "position": [
                    112.6567,
                    23.1567
                ],
                "address": "肇庆市鼎湖区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "肇庆东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "zq_003",
                "name": "肇庆市人防地下商城",
                "type": "underground_mall",
                "position": [
                    112.4601,
                    23.0456
                ],
                "address": "肇庆市端州区天宁北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "天宁北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "肇庆火车站",
                "type": "transport",
                "position": [
                    112.465,
                    23.048
                ],
                "risk": "中"
            }
        ]
    },
    "huizhou": {
        "name": "惠州",
        "center": [
            114.416,
            23.112
        ],
        "shelters": [
            {
                "id": "hz3_001",
                "name": "惠州站地下避难所",
                "type": "shelter",
                "position": [
                    114.416,
                    23.112
                ],
                "address": "惠州市惠城区惠州大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "惠州站地下通道",
                "description": "惠州铁路枢纽地下民防工程"
            },
            {
                "id": "hz3_002",
                "name": "惠州南站地下避难所",
                "type": "shelter",
                "position": [
                    114.4234,
                    22.8234
                ],
                "address": "惠州市惠阳区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "惠州南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hz3_003",
                "name": "惠州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.4112,
                    23.1098
                ],
                "address": "惠州市惠城区下埔路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "下埔路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "hz3_004",
                "name": "惠州港地下指挥中心",
                "type": "shelter",
                "position": [
                    114.5567,
                    22.9789
                ],
                "address": "惠州市大亚湾区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "惠州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "惠州港",
                "type": "port",
                "position": [
                    114.5567,
                    22.9789
                ],
                "risk": "中"
            }
        ]
    },
    "meizhou": {
        "name": "梅州",
        "center": [
            116.123,
            24.288
        ],
        "shelters": [
            {
                "id": "mz_001",
                "name": "梅州站地下避难所",
                "type": "shelter",
                "position": [
                    116.123,
                    24.288
                ],
                "address": "梅州市梅江区彬芳大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "梅州站地下通道",
                "description": "梅州铁路枢纽地下民防工程"
            },
            {
                "id": "mz_002",
                "name": "梅州西站地下避难所",
                "type": "shelter",
                "position": [
                    116.0567,
                    24.3567
                ],
                "address": "梅州市梅县区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "梅州西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "mz_003",
                "name": "梅州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.1189,
                    24.2856
                ],
                "address": "梅州市梅江区江南路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "江南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "梅州火车站",
                "type": "transport",
                "position": [
                    116.123,
                    24.288
                ],
                "risk": "中"
            }
        ]
    },
    "shanwei": {
        "name": "汕尾",
        "center": [
            115.375,
            22.786
        ],
        "shelters": [
            {
                "id": "sw_001",
                "name": "汕尾站地下避难所",
                "type": "shelter",
                "position": [
                    115.375,
                    22.786
                ],
                "address": "汕尾市城区站前横路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "汕尾站地下通道",
                "description": "汕尾铁路枢纽地下民防工程"
            },
            {
                "id": "sw_002",
                "name": "汕尾市人防地下商城",
                "type": "underground_mall",
                "position": [
                    115.3701,
                    22.7834
                ],
                "address": "汕尾市城区汕尾大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "汕尾大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "汕尾火车站",
                "type": "transport",
                "position": [
                    115.375,
                    22.786
                ],
                "risk": "低"
            }
        ]
    },
    "heyuan": {
        "name": "河源",
        "center": [
            114.698,
            23.743
        ],
        "shelters": [
            {
                "id": "hy2_001",
                "name": "河源站地下避难所",
                "type": "shelter",
                "position": [
                    114.698,
                    23.743
                ],
                "address": "河源市源城区站前路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "河源站地下通道",
                "description": "河源铁路枢纽地下民防工程"
            },
            {
                "id": "hy2_002",
                "name": "河源东站地下避难所",
                "type": "shelter",
                "position": [
                    114.7567,
                    23.8234
                ],
                "address": "河源市江东新区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "河源东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hy2_003",
                "name": "河源市人防地下商城",
                "type": "underground_mall",
                "position": [
                    114.6934,
                    23.7406
                ],
                "address": "河源市源城区长塘路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "长塘路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "河源火车站",
                "type": "transport",
                "position": [
                    114.698,
                    23.743
                ],
                "risk": "中"
            }
        ]
    },
    "yangjiang": {
        "name": "阳江",
        "center": [
            111.982,
            21.859
        ],
        "shelters": [
            {
                "id": "yj_001",
                "name": "阳江站地下避难所",
                "type": "shelter",
                "position": [
                    111.982,
                    21.859
                ],
                "address": "阳江市江城区城南西路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "阳江站地下通道",
                "description": "阳江铁路枢纽地下民防工程"
            },
            {
                "id": "yj_002",
                "name": "阳江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.9778,
                    21.8567
                ],
                "address": "阳江市江城区东风一路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "东风一路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "阳江火车站",
                "type": "transport",
                "position": [
                    111.982,
                    21.859
                ],
                "risk": "中"
            }
        ]
    },
    "qingyuan": {
        "name": "清远",
        "center": [
            113.056,
            23.682
        ],
        "shelters": [
            {
                "id": "qy_001",
                "name": "清远站地下避难所",
                "type": "shelter",
                "position": [
                    113.056,
                    23.682
                ],
                "address": "清远市清城区站前路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "清远站地下通道",
                "description": "清远铁路枢纽地下民防工程"
            },
            {
                "id": "qy_002",
                "name": "清远市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.0512,
                    23.6798
                ],
                "address": "清远市清城区先锋中路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "先锋中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "清远火车站",
                "type": "transport",
                "position": [
                    113.056,
                    23.682
                ],
                "risk": "中"
            }
        ]
    },
    "dongguan": {
        "name": "东莞",
        "center": [
            113.752,
            23.048
        ],
        "shelters": [
            {
                "id": "dg_001",
                "name": "东莞站地下避难所",
                "type": "shelter",
                "position": [
                    113.752,
                    23.048
                ],
                "address": "东莞市石龙镇西湖社区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "东莞站地下通道",
                "description": "东莞铁路枢纽地下民防工程"
            },
            {
                "id": "dg_002",
                "name": "东莞南站地下避难所",
                "type": "shelter",
                "position": [
                    114.0567,
                    22.7234
                ],
                "address": "东莞市塘厦镇",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "东莞南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "dg_003",
                "name": "虎门站地下避难所",
                "type": "shelter",
                "position": [
                    113.6567,
                    22.8567
                ],
                "address": "东莞市虎门镇",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "虎门站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "dg_004",
                "name": "东莞市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.7478,
                    23.0456
                ],
                "address": "东莞市南城区鸿福路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "鸿福路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "东莞火车站",
                "type": "transport",
                "position": [
                    113.752,
                    23.048
                ],
                "risk": "中"
            }
        ]
    },
    "zhongshan": {
        "name": "中山",
        "center": [
            113.392,
            22.517
        ],
        "shelters": [
            {
                "id": "zs2_001",
                "name": "中山站地下避难所",
                "type": "shelter",
                "position": [
                    113.392,
                    22.517
                ],
                "address": "中山市火炬开发区濠头",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "中山站地下通道",
                "description": "中山铁路枢纽地下民防工程"
            },
            {
                "id": "zs2_002",
                "name": "中山北站地下避难所",
                "type": "shelter",
                "position": [
                    113.3567,
                    22.5789
                ],
                "address": "中山市石岐区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "中山北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "zs2_003",
                "name": "中山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    113.3878,
                    22.5145
                ],
                "address": "中山市石岐区孙文东路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "孙文东路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "中山火车站",
                "type": "transport",
                "position": [
                    113.392,
                    22.517
                ],
                "risk": "中"
            }
        ]
    },
    "chaozhou": {
        "name": "潮州",
        "center": [
            116.64,
            23.659
        ],
        "shelters": [
            {
                "id": "cz5_001",
                "name": "潮汕站地下避难所",
                "type": "shelter",
                "position": [
                    116.6234,
                    23.5567
                ],
                "address": "潮州市潮安区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "潮汕站地下",
                "description": "潮汕高铁枢纽人防工程"
            },
            {
                "id": "cz5_002",
                "name": "潮州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.6356,
                    23.6567
                ],
                "address": "潮州市湘桥区潮枫路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "潮枫路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "潮汕站",
                "type": "transport",
                "position": [
                    116.6234,
                    23.5567
                ],
                "risk": "中"
            }
        ]
    },
    "jieyang": {
        "name": "揭阳",
        "center": [
            116.373,
            23.55
        ],
        "shelters": [
            {
                "id": "jy_001",
                "name": "揭阳站地下避难所",
                "type": "shelter",
                "position": [
                    116.373,
                    23.55
                ],
                "address": "揭阳市榕城区黄岐山大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "揭阳站地下通道",
                "description": "揭阳铁路枢纽地下民防工程"
            },
            {
                "id": "jy_002",
                "name": "揭阳北站地下避难所",
                "type": "shelter",
                "position": [
                    116.4567,
                    23.6123
                ],
                "address": "揭阳市揭东区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "揭阳北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "jy_003",
                "name": "揭阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    116.3689,
                    23.5478
                ],
                "address": "揭阳市榕城区进贤门大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "进贤门大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "揭阳火车站",
                "type": "transport",
                "position": [
                    116.373,
                    23.55
                ],
                "risk": "中"
            }
        ]
    },
    "guilin": {
        "name": "桂林",
        "center": [
            110.179,
            25.234
        ],
        "shelters": [
            {
                "id": "gl_001",
                "name": "桂林站地下避难所",
                "type": "shelter",
                "position": [
                    110.279,
                    25.2689
                ],
                "address": "桂林市象山区上海路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "桂林站地下通道",
                "description": "桂林铁路枢纽地下民防工程"
            },
            {
                "id": "gl_002",
                "name": "桂林北站地下避难所",
                "type": "shelter",
                "position": [
                    110.3067,
                    25.3234
                ],
                "address": "桂林市叠彩区",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "桂林北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "gl_003",
                "name": "桂林市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.2745,
                    25.2656
                ],
                "address": "桂林市秀峰区中山中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中山中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "gl_004",
                "name": "两江国际机场地下避难所",
                "type": "shelter",
                "position": [
                    110.039,
                    25.2189
                ],
                "address": "桂林市临桂区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "机场应急系统",
                "access": "桂林机场地下",
                "description": "重要交通枢纽防护工程"
            }
        ],
        "targets": [
            {
                "name": "桂林机场",
                "type": "airport",
                "position": [
                    110.039,
                    25.2189
                ],
                "risk": "中"
            }
        ]
    },
    "wuzhou": {
        "name": "梧州",
        "center": [
            111.279,
            23.477
        ],
        "shelters": [
            {
                "id": "wz_001",
                "name": "梧州南站地下避难所",
                "type": "shelter",
                "position": [
                    111.3567,
                    23.4234
                ],
                "address": "梧州市龙圩区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "梧州南站地下",
                "description": "梧州高铁枢纽人防工程"
            },
            {
                "id": "wz_002",
                "name": "梧州站地下避难所",
                "type": "shelter",
                "position": [
                    111.2789,
                    23.4789
                ],
                "address": "梧州市长洲区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "梧州站地下",
                "description": "梧州铁路枢纽人防工程"
            },
            {
                "id": "wz_003",
                "name": "梧州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.2745,
                    23.4745
                ],
                "address": "梧州市万秀区中山路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "中山路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "wz_004",
                "name": "梧州港地下指挥中心",
                "type": "shelter",
                "position": [
                    111.3234,
                    23.5067
                ],
                "address": "梧州市长洲区",
                "capacity": "2500人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "梧州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "梧州港",
                "type": "port",
                "position": [
                    111.3234,
                    23.5067
                ],
                "risk": "中"
            }
        ]
    },
    "beihai": {
        "name": "北海",
        "center": [
            109.101,
            21.481
        ],
        "shelters": [
            {
                "id": "bh_001",
                "name": "北海站地下避难所",
                "type": "shelter",
                "position": [
                    109.101,
                    21.481
                ],
                "address": "北海市海城区北京路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "北海站地下通道",
                "description": "北海铁路枢纽地下民防工程"
            },
            {
                "id": "bh_002",
                "name": "北海市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.0967,
                    21.4789
                ],
                "address": "北海市海城区北部湾中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "北部湾中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "bh_003",
                "name": "北海港地下指挥中心",
                "type": "shelter",
                "position": [
                    109.1234,
                    21.4567
                ],
                "address": "北海市海城区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "北海港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "北海港",
                "type": "port",
                "position": [
                    109.1234,
                    21.4567
                ],
                "risk": "中"
            }
        ]
    },
    "fangchenggang": {
        "name": "防城港",
        "center": [
            108.355,
            21.687
        ],
        "shelters": [
            {
                "id": "fcg_001",
                "name": "防城港北站地下避难所",
                "type": "shelter",
                "position": [
                    108.3567,
                    21.7234
                ],
                "address": "防城港市港口区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "防城港北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "fcg_002",
                "name": "防城港市人防地下商城",
                "type": "underground_mall",
                "position": [
                    108.3501,
                    21.6845
                ],
                "address": "防城港市港口区兴港大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "兴港大道地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "fcg_003",
                "name": "防城港码头地下指挥中心",
                "type": "shelter",
                "position": [
                    108.4234,
                    21.6567
                ],
                "address": "防城港市港口区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "防城港码头地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "防城港码头",
                "type": "port",
                "position": [
                    108.4234,
                    21.6567
                ],
                "risk": "中"
            }
        ]
    },
    "qinzhou": {
        "name": "钦州",
        "center": [
            108.655,
            21.979
        ],
        "shelters": [
            {
                "id": "qz2_001",
                "name": "钦州东站地下避难所",
                "type": "shelter",
                "position": [
                    108.7567,
                    22.0234
                ],
                "address": "钦州市钦南区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "钦州东站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "qz2_002",
                "name": "钦州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    108.6501,
                    21.9767
                ],
                "address": "钦州市钦南区人民路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "qz2_003",
                "name": "钦州港地下指挥中心",
                "type": "shelter",
                "position": [
                    108.6234,
                    21.8567
                ],
                "address": "钦州市钦南区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "钦州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "钦州港",
                "type": "port",
                "position": [
                    108.6234,
                    21.8567
                ],
                "risk": "中"
            }
        ]
    },
    "guigang": {
        "name": "贵港",
        "center": [
            109.599,
            23.111
        ],
        "shelters": [
            {
                "id": "gg_001",
                "name": "贵港站地下避难所",
                "type": "shelter",
                "position": [
                    109.599,
                    23.111
                ],
                "address": "贵港市港北区江北大道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "贵港站地下通道",
                "description": "贵港铁路枢纽地下民防工程"
            },
            {
                "id": "gg_002",
                "name": "贵港市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.5945,
                    23.1089
                ],
                "address": "贵港市港北区解放路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "贵港火车站",
                "type": "transport",
                "position": [
                    109.599,
                    23.111
                ],
                "risk": "中"
            }
        ]
    },
    "yulin2": {
        "name": "玉林",
        "center": [
            110.154,
            22.631
        ],
        "shelters": [
            {
                "id": "yl2_001",
                "name": "玉林站地下避难所",
                "type": "shelter",
                "position": [
                    110.154,
                    22.631
                ],
                "address": "玉林市玉州区站前路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "玉林站地下通道",
                "description": "玉林铁路枢纽地下民防工程"
            },
            {
                "id": "yl2_002",
                "name": "玉林市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.1498,
                    22.6289
                ],
                "address": "玉林市玉州区人民中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "人民中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "玉林火车站",
                "type": "transport",
                "position": [
                    110.154,
                    22.631
                ],
                "risk": "中"
            }
        ]
    },
    "baise": {
        "name": "百色",
        "center": [
            106.617,
            23.897
        ],
        "shelters": [
            {
                "id": "bs2_001",
                "name": "百色站地下避难所",
                "type": "shelter",
                "position": [
                    106.617,
                    23.897
                ],
                "address": "百色市右江区站前大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "百色站地下通道",
                "description": "百色铁路枢纽地下民防工程"
            },
            {
                "id": "bs2_002",
                "name": "百色市人防地下商城",
                "type": "underground_mall",
                "position": [
                    106.6123,
                    23.8945
                ],
                "address": "百色市右江区中山一路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中山一路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "百色火车站",
                "type": "transport",
                "position": [
                    106.617,
                    23.897
                ],
                "risk": "中"
            }
        ]
    },
    "hezhou": {
        "name": "贺州",
        "center": [
            111.566,
            24.414
        ],
        "shelters": [
            {
                "id": "hz4_001",
                "name": "贺州站地下避难所",
                "type": "shelter",
                "position": [
                    111.566,
                    24.414
                ],
                "address": "贺州市平桂区站前大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "贺州站地下通道",
                "description": "贺州铁路枢纽地下民防工程"
            },
            {
                "id": "hz4_002",
                "name": "贺州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    111.5612,
                    24.4112
                ],
                "address": "贺州市八步区建设中路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "建设中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "贺州火车站",
                "type": "transport",
                "position": [
                    111.566,
                    24.414
                ],
                "risk": "中"
            }
        ]
    },
    "hechi": {
        "name": "河池",
        "center": [
            108.085,
            24.695
        ],
        "shelters": [
            {
                "id": "hc_001",
                "name": "河池西站地下避难所",
                "type": "shelter",
                "position": [
                    107.9567,
                    24.7234
                ],
                "address": "河池市金城江区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "河池西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "hc_002",
                "name": "河池市人防地下商城",
                "type": "underground_mall",
                "position": [
                    108.0801,
                    24.6923
                ],
                "address": "河池市金城江区新建路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新建路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "河池火车站",
                "type": "transport",
                "position": [
                    108.085,
                    24.695
                ],
                "risk": "低"
            }
        ]
    },
    "laibin": {
        "name": "来宾",
        "center": [
            109.229,
            23.734
        ],
        "shelters": [
            {
                "id": "lb_001",
                "name": "来宾站地下避难所",
                "type": "shelter",
                "position": [
                    109.229,
                    23.734
                ],
                "address": "来宾市兴宾区铁道北路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "来宾站地下通道",
                "description": "来宾铁路枢纽地下民防工程"
            },
            {
                "id": "lb_002",
                "name": "来宾市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.2245,
                    23.7312
                ],
                "address": "来宾市兴宾区中南路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "来宾火车站",
                "type": "transport",
                "position": [
                    109.229,
                    23.734
                ],
                "risk": "低"
            }
        ]
    },
    "sansha": {
        "name": "三沙",
        "center": [
            112.344,
            16.831
        ],
        "shelters": [
            {
                "id": "ss_001",
                "name": "三沙市人防地下指挥所",
                "type": "shelter",
                "position": [
                    112.344,
                    16.831
                ],
                "address": "三沙市西沙区永兴岛",
                "capacity": "1500人",
                "level": "核5级",
                "facilities": "海岛应急指挥系统",
                "access": "永兴岛地下",
                "description": "三沙市行政中心防护工程"
            }
        ],
        "targets": [
            {
                "name": "三沙市政府",
                "type": "landmark",
                "position": [
                    112.344,
                    16.831
                ],
                "risk": "高"
            }
        ]
    },
    "danzhou": {
        "name": "儋州",
        "center": [
            109.58,
            19.521
        ],
        "shelters": [
            {
                "id": "dz2_001",
                "name": "儋州站地下避难所",
                "type": "shelter",
                "position": [
                    109.5234,
                    19.6234
                ],
                "address": "儋州市那大镇",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "儋州站地下",
                "description": "儋州铁路枢纽人防工程"
            },
            {
                "id": "dz2_002",
                "name": "儋州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.5756,
                    19.5189
                ],
                "address": "儋州市那大镇中兴大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中兴大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "儋州火车站",
                "type": "transport",
                "position": [
                    109.5234,
                    19.6234
                ],
                "risk": "中"
            }
        ]
    },
    "wuzhishan": {
        "name": "五指山",
        "center": [
            109.517,
            18.776
        ],
        "shelters": [
            {
                "id": "wzs_001",
                "name": "五指山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.5123,
                    18.7734
                ],
                "address": "五指山市通什镇解放路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "解放路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "五指山市政府",
                "type": "landmark",
                "position": [
                    109.517,
                    18.776
                ],
                "risk": "低"
            }
        ]
    },
    "qionghai": {
        "name": "琼海",
        "center": [
            110.466,
            19.246
        ],
        "shelters": [
            {
                "id": "qh_001",
                "name": "琼海站地下避难所",
                "type": "shelter",
                "position": [
                    110.466,
                    19.246
                ],
                "address": "琼海市嘉积镇爱华东路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "琼海站地下通道",
                "description": "琼海铁路枢纽地下民防工程"
            },
            {
                "id": "qh_002",
                "name": "琼海市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.4612,
                    19.2434
                ],
                "address": "琼海市嘉积镇元亨街",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "元亨街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "琼海火车站",
                "type": "transport",
                "position": [
                    110.466,
                    19.246
                ],
                "risk": "低"
            }
        ]
    },
    "wenchang": {
        "name": "文昌",
        "center": [
            110.753,
            19.613
        ],
        "shelters": [
            {
                "id": "wc_001",
                "name": "文昌站地下避难所",
                "type": "shelter",
                "position": [
                    110.753,
                    19.613
                ],
                "address": "文昌市文城镇文建路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "文昌站地下通道",
                "description": "文昌铁路枢纽地下民防工程"
            },
            {
                "id": "wc_002",
                "name": "文昌市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.7489,
                    19.6106
                ],
                "address": "文昌市文城镇文建路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "文建路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "wc_003",
                "name": "文昌航天发射场地下指挥中心",
                "type": "shelter",
                "position": [
                    110.9567,
                    19.6234
                ],
                "address": "文昌市龙楼镇",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "航天基地防护系统",
                "access": "发射场地下",
                "description": "重要国防设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "文昌航天发射场",
                "type": "landmark",
                "position": [
                    110.9567,
                    19.6234
                ],
                "risk": "高"
            }
        ]
    },
    "wanning": {
        "name": "万宁",
        "center": [
            110.388,
            18.796
        ],
        "shelters": [
            {
                "id": "wn2_001",
                "name": "万宁站地下避难所",
                "type": "shelter",
                "position": [
                    110.388,
                    18.796
                ],
                "address": "万宁市万城镇环市一东路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "万宁站地下通道",
                "description": "万宁铁路枢纽地下民防工程"
            },
            {
                "id": "wn2_002",
                "name": "万宁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.3834,
                    18.7934
                ],
                "address": "万宁市万城镇红专中路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "红专中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "万宁火车站",
                "type": "transport",
                "position": [
                    110.388,
                    18.796
                ],
                "risk": "低"
            }
        ]
    },
    "dongfang": {
        "name": "东方",
        "center": [
            108.653,
            19.101
        ],
        "shelters": [
            {
                "id": "df_001",
                "name": "东方站地下避难所",
                "type": "shelter",
                "position": [
                    108.653,
                    19.101
                ],
                "address": "东方市八所镇东海路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "东方站地下通道",
                "description": "东方铁路枢纽地下民防工程"
            },
            {
                "id": "df_002",
                "name": "东方市人防地下商城",
                "type": "underground_mall",
                "position": [
                    108.6489,
                    19.0989
                ],
                "address": "东方市八所镇解放西路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "解放西路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "东方火车站",
                "type": "transport",
                "position": [
                    108.653,
                    19.101
                ],
                "risk": "低"
            }
        ]
    },
    "dingan": {
        "name": "定安",
        "center": [
            110.349,
            19.684
        ],
        "shelters": [
            {
                "id": "da2_001",
                "name": "定安站地下避难所",
                "type": "shelter",
                "position": [
                    110.349,
                    19.684
                ],
                "address": "定安县定城镇见龙大道",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "定安站地下通道",
                "description": "定安铁路枢纽地下民防工程"
            }
        ],
        "targets": [
            {
                "name": "定安火车站",
                "type": "transport",
                "position": [
                    110.349,
                    19.684
                ],
                "risk": "低"
            }
        ]
    },
    "tunchang": {
        "name": "屯昌",
        "center": [
            110.102,
            19.352
        ],
        "shelters": [
            {
                "id": "tc_001",
                "name": "屯昌县人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.0978,
                    19.3498
                ],
                "address": "屯昌县屯城镇昌盛路",
                "capacity": "800人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "昌盛路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "屯昌县政府",
                "type": "landmark",
                "position": [
                    110.102,
                    19.352
                ],
                "risk": "低"
            }
        ]
    },
    "chengmai": {
        "name": "澄迈",
        "center": [
            110.007,
            19.737
        ],
        "shelters": [
            {
                "id": "cm_001",
                "name": "澄迈县人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.0023,
                    19.7345
                ],
                "address": "澄迈县金江镇文化北路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "文化北路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "澄迈县政府",
                "type": "landmark",
                "position": [
                    110.007,
                    19.737
                ],
                "risk": "低"
            }
        ]
    },
    "lingao": {
        "name": "临高",
        "center": [
            109.687,
            19.908
        ],
        "shelters": [
            {
                "id": "lg2_001",
                "name": "临高县人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.6823,
                    19.9056
                ],
                "address": "临高县临城镇解放路",
                "capacity": "800人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "解放路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "临高县政府",
                "type": "landmark",
                "position": [
                    109.687,
                    19.908
                ],
                "risk": "低"
            }
        ]
    },
    "baisha": {
        "name": "白沙",
        "center": [
            109.45,
            19.224
        ],
        "shelters": [
            {
                "id": "bs3_001",
                "name": "白沙县人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.4456,
                    19.2212
                ],
                "address": "白沙县牙叉镇牙叉中路",
                "capacity": "600人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "牙叉中路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "白沙县政府",
                "type": "landmark",
                "position": [
                    109.45,
                    19.224
                ],
                "risk": "低"
            }
        ]
    },
    "changjiang": {
        "name": "昌江",
        "center": [
            109.053,
            19.26
        ],
        "shelters": [
            {
                "id": "cj_001",
                "name": "昌江县人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.0489,
                    19.2578
                ],
                "address": "昌江县石碌镇人民北路",
                "capacity": "800人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "人民北路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "昌江县政府",
                "type": "landmark",
                "position": [
                    109.053,
                    19.26
                ],
                "risk": "低"
            }
        ]
    },
    "ledong": {
        "name": "乐东",
        "center": [
            109.175,
            18.747
        ],
        "shelters": [
            {
                "id": "ld2_001",
                "name": "乐东站地下避难所",
                "type": "shelter",
                "position": [
                    109.175,
                    18.747
                ],
                "address": "乐东黎族自治县抱由镇",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "乐东站地下通道",
                "description": "乐东铁路枢纽地下民防工程"
            }
        ],
        "targets": [
            {
                "name": "乐东火车站",
                "type": "transport",
                "position": [
                    109.175,
                    18.747
                ],
                "risk": "低"
            }
        ]
    },
    "lingshui": {
        "name": "陵水",
        "center": [
            110.037,
            18.505
        ],
        "shelters": [
            {
                "id": "ls2_001",
                "name": "陵水站地下避难所",
                "type": "shelter",
                "position": [
                    110.037,
                    18.505
                ],
                "address": "陵水黎族自治县椰林镇",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "陵水站地下通道",
                "description": "陵水铁路枢纽地下民防工程"
            },
            {
                "id": "ls2_002",
                "name": "陵水县人防地下商城",
                "type": "underground_mall",
                "position": [
                    110.0323,
                    18.5023
                ],
                "address": "陵水黎族自治县椰林镇新建路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新建路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "陵水火车站",
                "type": "transport",
                "position": [
                    110.037,
                    18.505
                ],
                "risk": "低"
            }
        ]
    },
    "baoting": {
        "name": "保亭",
        "center": [
            109.702,
            18.636
        ],
        "shelters": [
            {
                "id": "bt_001",
                "name": "保亭县人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.6978,
                    18.6334
                ],
                "address": "保亭黎族苗族自治县保城镇新兴路",
                "capacity": "600人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "新兴路地下入口",
                "description": "县城中心区人防工程"
            }
        ],
        "targets": [
            {
                "name": "保亭县政府",
                "type": "landmark",
                "position": [
                    109.702,
                    18.636
                ],
                "risk": "低"
            }
        ]
    },
    "zigong": {
        "name": "自贡",
        "center": [
            104.778,
            29.339
        ],
        "shelters": [
            {
                "id": "zg_001",
                "name": "自贡站地下避难所",
                "type": "shelter",
                "position": [
                    104.778,
                    29.339
                ],
                "address": "自贡市自流井区丹桂大街",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "自贡站地下通道",
                "description": "自贡铁路枢纽地下民防工程"
            },
            {
                "id": "zg_002",
                "name": "自贡市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.7734,
                    29.3367
                ],
                "address": "自贡市自流井区五星街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "五星街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "自贡火车站",
                "type": "transport",
                "position": [
                    104.778,
                    29.339
                ],
                "risk": "中"
            }
        ]
    },
    "panzhihua": {
        "name": "攀枝花",
        "center": [
            101.716,
            26.58
        ],
        "shelters": [
            {
                "id": "pzh_001",
                "name": "攀枝花站地下避难所",
                "type": "shelter",
                "position": [
                    101.716,
                    26.58
                ],
                "address": "攀枝花市仁和区金江镇",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "攀枝花站地下通道",
                "description": "攀枝花铁路枢纽地下民防工程"
            },
            {
                "id": "pzh_002",
                "name": "攀枝花南站地下避难所",
                "type": "shelter",
                "position": [
                    101.6567,
                    26.5234
                ],
                "address": "攀枝花市仁和区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "攀枝花南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "pzh_003",
                "name": "攀枝花市人防地下商城",
                "type": "underground_mall",
                "position": [
                    101.7112,
                    26.5778
                ],
                "address": "攀枝花市东区炳草岗大街",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "炳草岗大街地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "pzh_004",
                "name": "攀钢地下指挥中心",
                "type": "shelter",
                "position": [
                    101.7789,
                    26.6234
                ],
                "address": "攀枝花市东区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "攀钢地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "攀钢",
                "type": "factory",
                "position": [
                    101.7789,
                    26.6234
                ],
                "risk": "中"
            }
        ]
    },
    "luzhou": {
        "name": "泸州",
        "center": [
            105.443,
            28.87
        ],
        "shelters": [
            {
                "id": "lz2_001",
                "name": "泸州站地下避难所",
                "type": "shelter",
                "position": [
                    105.443,
                    28.87
                ],
                "address": "泸州市龙马潭区安宁街道",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "泸州站地下通道",
                "description": "泸州铁路枢纽地下民防工程"
            },
            {
                "id": "lz2_002",
                "name": "泸州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.4389,
                    28.8678
                ],
                "address": "泸州市江阳区江阳中路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "江阳中路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "lz2_003",
                "name": "泸州港地下指挥中心",
                "type": "shelter",
                "position": [
                    105.4567,
                    28.9123
                ],
                "address": "泸州市龙马潭区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "泸州港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "泸州港",
                "type": "port",
                "position": [
                    105.4567,
                    28.9123
                ],
                "risk": "中"
            }
        ]
    },
    "deyang2": {
        "name": "德阳",
        "center": [
            104.398,
            31.127
        ],
        "shelters": [
            {
                "id": "dy2_001",
                "name": "德阳站地下避难所",
                "type": "shelter",
                "position": [
                    104.398,
                    31.127
                ],
                "address": "德阳市旌阳区黄山路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "德阳站地下通道",
                "description": "德阳铁路枢纽地下民防工程"
            },
            {
                "id": "dy2_002",
                "name": "德阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.3934,
                    31.1245
                ],
                "address": "德阳市旌阳区长江东路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "长江东路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "dy2_003",
                "name": "东汽地下指挥中心",
                "type": "shelter",
                "position": [
                    104.4567,
                    31.1789
                ],
                "address": "德阳市旌阳区",
                "capacity": "3500人",
                "level": "核5级",
                "facilities": "企业应急系统",
                "access": "东汽地下",
                "description": "重点工业企业防护工程"
            }
        ],
        "targets": [
            {
                "name": "东汽",
                "type": "factory",
                "position": [
                    104.4567,
                    31.1789
                ],
                "risk": "中"
            }
        ]
    },
    "mianyang": {
        "name": "绵阳",
        "center": [
            104.741,
            31.464
        ],
        "shelters": [
            {
                "id": "my_001",
                "name": "绵阳站地下避难所",
                "type": "shelter",
                "position": [
                    104.741,
                    31.464
                ],
                "address": "绵阳市涪城区临园路西段",
                "capacity": "3500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备、医疗站",
                "access": "绵阳站地下通道",
                "description": "川北铁路枢纽地下民防工程"
            },
            {
                "id": "my_002",
                "name": "绵阳北站地下避难所",
                "type": "shelter",
                "position": [
                    104.6234,
                    31.5567
                ],
                "address": "绵阳市游仙区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "铁路枢纽防护设施",
                "access": "绵阳北站地下",
                "description": "铁路枢纽人防工程"
            },
            {
                "id": "my_003",
                "name": "绵阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.7367,
                    31.4612
                ],
                "address": "绵阳市涪城区临园路东段",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "临园路东段地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "my_004",
                "name": "绵阳科研基地地下指挥中心",
                "type": "shelter",
                "position": [
                    104.8234,
                    31.4234
                ],
                "address": "绵阳市游仙区",
                "capacity": "4500人",
                "level": "核5级",
                "facilities": "科研基地防护系统",
                "access": "科研基地地下",
                "description": "重要科研设施防护工程"
            }
        ],
        "targets": [
            {
                "name": "绵阳科研基地",
                "type": "landmark",
                "position": [
                    104.8234,
                    31.4234
                ],
                "risk": "高"
            }
        ]
    },
    "guangyuan": {
        "name": "广元",
        "center": [
            105.83,
            32.433
        ],
        "shelters": [
            {
                "id": "gy_001",
                "name": "广元站地下避难所",
                "type": "shelter",
                "position": [
                    105.83,
                    32.433
                ],
                "address": "广元市利州区则天路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "广元站地下通道",
                "description": "川陕甘铁路枢纽地下民防工程"
            },
            {
                "id": "gy_002",
                "name": "广元市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.8256,
                    32.4306
                ],
                "address": "广元市利州区嘉陵路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "嘉陵路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "广元火车站",
                "type": "transport",
                "position": [
                    105.83,
                    32.433
                ],
                "risk": "中"
            }
        ]
    },
    "suining": {
        "name": "遂宁",
        "center": [
            105.593,
            30.532
        ],
        "shelters": [
            {
                "id": "sn_001",
                "name": "遂宁站地下避难所",
                "type": "shelter",
                "position": [
                    105.593,
                    30.532
                ],
                "address": "遂宁市船山区明月路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "遂宁站地下通道",
                "description": "遂宁铁路枢纽地下民防工程"
            },
            {
                "id": "sn_002",
                "name": "遂宁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.5889,
                    30.5298
                ],
                "address": "遂宁市船山区凯旋路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "凯旋路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "遂宁火车站",
                "type": "transport",
                "position": [
                    105.593,
                    30.532
                ],
                "risk": "中"
            }
        ]
    },
    "neijiang": {
        "name": "内江",
        "center": [
            105.066,
            29.587
        ],
        "shelters": [
            {
                "id": "nj_001",
                "name": "内江站地下避难所",
                "type": "shelter",
                "position": [
                    105.066,
                    29.587
                ],
                "address": "内江市市中区壕子口",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "内江站地下通道",
                "description": "内江铁路枢纽地下民防工程"
            },
            {
                "id": "nj_002",
                "name": "内江北站地下避难所",
                "type": "shelter",
                "position": [
                    105.0567,
                    29.6234
                ],
                "address": "内江市市中区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "内江北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "nj_003",
                "name": "内江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.0612,
                    29.5845
                ],
                "address": "内江市市中区玉溪路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "玉溪路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "内江火车站",
                "type": "transport",
                "position": [
                    105.066,
                    29.587
                ],
                "risk": "中"
            }
        ]
    },
    "leshan": {
        "name": "乐山",
        "center": [
            103.761,
            29.582
        ],
        "shelters": [
            {
                "id": "ls3_001",
                "name": "乐山站地下避难所",
                "type": "shelter",
                "position": [
                    103.761,
                    29.582
                ],
                "address": "乐山市市中区宝莲路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "乐山站地下通道",
                "description": "乐山铁路枢纽地下民防工程"
            },
            {
                "id": "ls3_002",
                "name": "乐山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    103.7567,
                    29.5798
                ],
                "address": "乐山市市中区嘉定南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "嘉定南路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "乐山火车站",
                "type": "transport",
                "position": [
                    103.761,
                    29.582
                ],
                "risk": "中"
            }
        ]
    },
    "nanchong": {
        "name": "南充",
        "center": [
            106.109,
            30.837
        ],
        "shelters": [
            {
                "id": "nc_001",
                "name": "南充站地下避难所",
                "type": "shelter",
                "position": [
                    106.109,
                    30.837
                ],
                "address": "南充市顺庆区铁欣路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "南充站地下通道",
                "description": "川东北铁路枢纽地下民防工程"
            },
            {
                "id": "nc_002",
                "name": "南充北站地下避难所",
                "type": "shelter",
                "position": [
                    106.1234,
                    30.8789
                ],
                "address": "南充市顺庆区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "南充北站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "nc_003",
                "name": "南充市人防地下商城",
                "type": "underground_mall",
                "position": [
                    106.1045,
                    30.8345
                ],
                "address": "南充市顺庆区人民中路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "南充火车站",
                "type": "transport",
                "position": [
                    106.109,
                    30.837
                ],
                "risk": "中"
            }
        ]
    },
    "meishan": {
        "name": "眉山",
        "center": [
            103.848,
            30.075
        ],
        "shelters": [
            {
                "id": "ms_001",
                "name": "眉山站地下避难所",
                "type": "shelter",
                "position": [
                    103.848,
                    30.075
                ],
                "address": "眉山市东坡区裴城路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "眉山站地下通道",
                "description": "眉山铁路枢纽地下民防工程"
            },
            {
                "id": "ms_002",
                "name": "眉山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    103.8434,
                    30.0723
                ],
                "address": "眉山市东坡区三苏路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "三苏路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "眉山火车站",
                "type": "transport",
                "position": [
                    103.848,
                    30.075
                ],
                "risk": "中"
            }
        ]
    },
    "yibin": {
        "name": "宜宾",
        "center": [
            104.562,
            29.773
        ],
        "shelters": [
            {
                "id": "yb_001",
                "name": "宜宾站地下避难所",
                "type": "shelter",
                "position": [
                    104.562,
                    29.773
                ],
                "address": "宜宾市叙州区蜀南大道",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "宜宾站地下通道",
                "description": "宜宾铁路枢纽地下民防工程"
            },
            {
                "id": "yb_002",
                "name": "宜宾西站地下避难所",
                "type": "shelter",
                "position": [
                    104.5234,
                    28.7234
                ],
                "address": "宜宾市叙州区",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "宜宾西站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "yb_003",
                "name": "宜宾市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.5578,
                    29.7706
                ],
                "address": "宜宾市翠屏区人民路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "人民路地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "yb_004",
                "name": "宜宾港地下指挥中心",
                "type": "shelter",
                "position": [
                    104.6123,
                    28.8567
                ],
                "address": "宜宾市翠屏区",
                "capacity": "3000人",
                "level": "核5级",
                "facilities": "港口应急系统",
                "access": "宜宾港地下",
                "description": "重要港口防护工程"
            }
        ],
        "targets": [
            {
                "name": "宜宾港",
                "type": "port",
                "position": [
                    104.6123,
                    28.8567
                ],
                "risk": "中"
            }
        ]
    },
    "guangan": {
        "name": "广安",
        "center": [
            106.633,
            30.456
        ],
        "shelters": [
            {
                "id": "ga_001",
                "name": "广安站地下避难所",
                "type": "shelter",
                "position": [
                    106.633,
                    30.456
                ],
                "address": "广安市前锋区前锋镇",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "广安站地下通道",
                "description": "广安铁路枢纽地下民防工程"
            },
            {
                "id": "ga_002",
                "name": "广安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    106.6289,
                    30.4534
                ],
                "address": "广安市广安区广宁路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "广宁路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "广安火车站",
                "type": "transport",
                "position": [
                    106.633,
                    30.456
                ],
                "risk": "中"
            }
        ]
    },
    "dazhou": {
        "name": "达州",
        "center": [
            107.503,
            31.209
        ],
        "shelters": [
            {
                "id": "dz3_001",
                "name": "达州站地下避难所",
                "type": "shelter",
                "position": [
                    107.503,
                    31.209
                ],
                "address": "达州市通川区朝阳西路",
                "capacity": "3000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "达州站地下通道",
                "description": "川东铁路枢纽地下民防工程"
            },
            {
                "id": "dz3_002",
                "name": "达州市人防地下商城",
                "type": "underground_mall",
                "position": [
                    107.4989,
                    31.2067
                ],
                "address": "达州市通川区来凤路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "来凤路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "达州火车站",
                "type": "transport",
                "position": [
                    107.503,
                    31.209
                ],
                "risk": "中"
            }
        ]
    },
    "yaan": {
        "name": "雅安",
        "center": [
            103.001,
            29.987
        ],
        "shelters": [
            {
                "id": "ya2_001",
                "name": "雅安站地下避难所",
                "type": "shelter",
                "position": [
                    103.001,
                    29.987
                ],
                "address": "雅安市雨城区姚桥路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "雅安站地下通道",
                "description": "雅安铁路枢纽地下民防工程"
            },
            {
                "id": "ya2_002",
                "name": "雅安市人防地下商城",
                "type": "underground_mall",
                "position": [
                    102.9967,
                    29.9845
                ],
                "address": "雅安市雨城区少年宫路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "少年宫路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "雅安火车站",
                "type": "transport",
                "position": [
                    103.001,
                    29.987
                ],
                "risk": "中"
            }
        ]
    },
    "bazhong": {
        "name": "巴中",
        "center": [
            106.743,
            31.869
        ],
        "shelters": [
            {
                "id": "bz3_001",
                "name": "巴中站地下避难所",
                "type": "shelter",
                "position": [
                    106.743,
                    31.869
                ],
                "address": "巴中市巴州区北龛大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "巴中站地下通道",
                "description": "巴中铁路枢纽地下民防工程"
            },
            {
                "id": "bz3_002",
                "name": "巴中市人防地下商城",
                "type": "underground_mall",
                "position": [
                    106.7389,
                    31.8667
                ],
                "address": "巴中市巴州区江北大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "江北大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "巴中火车站",
                "type": "transport",
                "position": [
                    106.743,
                    31.869
                ],
                "risk": "低"
            }
        ]
    },
    "ziyang": {
        "name": "资阳",
        "center": [
            104.627,
            30.131
        ],
        "shelters": [
            {
                "id": "zy_001",
                "name": "资阳站地下避难所",
                "type": "shelter",
                "position": [
                    104.627,
                    30.131
                ],
                "address": "资阳市雁江区松涛路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "资阳站地下通道",
                "description": "资阳铁路枢纽地下民防工程"
            },
            {
                "id": "zy_002",
                "name": "资阳市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.6223,
                    30.1289
                ],
                "address": "资阳市雁江区和平路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "和平路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "资阳火车站",
                "type": "transport",
                "position": [
                    104.627,
                    30.131
                ],
                "risk": "中"
            }
        ]
    },
    "aba": {
        "name": "阿坝",
        "center": [
            102.221,
            31.9
        ],
        "shelters": [
            {
                "id": "ab_001",
                "name": "阿坝州人防地下指挥所",
                "type": "shelter",
                "position": [
                    102.221,
                    31.9
                ],
                "address": "阿坝州马尔康市马尔康镇",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "马尔康镇地下",
                "description": "州行政中心人防工程"
            }
        ],
        "targets": [
            {
                "name": "阿坝州政府",
                "type": "landmark",
                "position": [
                    102.221,
                    31.9
                ],
                "risk": "低"
            }
        ]
    },
    "ganzi": {
        "name": "甘孜",
        "center": [
            101.964,
            30.05
        ],
        "shelters": [
            {
                "id": "gz2_001",
                "name": "甘孜州人防地下指挥所",
                "type": "shelter",
                "position": [
                    101.964,
                    30.05
                ],
                "address": "甘孜州康定市炉城街道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "康定市地下",
                "description": "州行政中心人防工程"
            }
        ],
        "targets": [
            {
                "name": "甘孜州政府",
                "type": "landmark",
                "position": [
                    101.964,
                    30.05
                ],
                "risk": "低"
            }
        ]
    },
    "liupanshui": {
        "name": "六盘水",
        "center": [
            104.832,
            26.593
        ],
        "shelters": [
            {
                "id": "lps_001",
                "name": "六盘水站地下避难所",
                "type": "shelter",
                "position": [
                    104.832,
                    26.593
                ],
                "address": "六盘水市钟山区水西路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "六盘水站地下通道",
                "description": "六盘水铁路枢纽地下民防工程"
            },
            {
                "id": "lps_002",
                "name": "六盘水市人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.8278,
                    26.5906
                ],
                "address": "六盘水市钟山区钟山大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "钟山大道地下入口",
                "description": "市中心商业区人防工程"
            },
            {
                "id": "lps_003",
                "name": "六盘水煤矿地下防空洞",
                "type": "shelter",
                "position": [
                    104.8789,
                    26.6567
                ],
                "address": "六盘水市钟山区",
                "capacity": "4000人",
                "level": "核5级",
                "facilities": "矿井通风系统",
                "access": "矿区地下入口",
                "description": "依托矿井建设的深层防空工程"
            }
        ],
        "targets": [
            {
                "name": "六盘水煤矿",
                "type": "factory",
                "position": [
                    104.8789,
                    26.6567
                ],
                "risk": "中"
            }
        ]
    },
    "anshun": {
        "name": "安顺",
        "center": [
            105.928,
            26.245
        ],
        "shelters": [
            {
                "id": "as2_001",
                "name": "安顺站地下避难所",
                "type": "shelter",
                "position": [
                    105.928,
                    26.245
                ],
                "address": "安顺市西秀区中华南路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "安顺站地下通道",
                "description": "安顺铁路枢纽地下民防工程"
            },
            {
                "id": "as2_002",
                "name": "安顺市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.9234,
                    26.2423
                ],
                "address": "安顺市西秀区塔山东路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "塔山东路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "安顺火车站",
                "type": "transport",
                "position": [
                    105.928,
                    26.245
                ],
                "risk": "中"
            }
        ]
    },
    "bijie": {
        "name": "毕节",
        "center": [
            105.285,
            27.302
        ],
        "shelters": [
            {
                "id": "bj2_001",
                "name": "毕节站地下避难所",
                "type": "shelter",
                "position": [
                    105.285,
                    27.302
                ],
                "address": "毕节市七星关区麻园路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "毕节站地下通道",
                "description": "毕节铁路枢纽地下民防工程"
            },
            {
                "id": "bj2_002",
                "name": "毕节市人防地下商城",
                "type": "underground_mall",
                "position": [
                    105.2801,
                    27.2998
                ],
                "address": "毕节市七星关区威宁路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "威宁路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "毕节火车站",
                "type": "transport",
                "position": [
                    105.285,
                    27.302
                ],
                "risk": "中"
            }
        ]
    },
    "tongren": {
        "name": "铜仁",
        "center": [
            109.189,
            27.719
        ],
        "shelters": [
            {
                "id": "tr_001",
                "name": "铜仁站地下避难所",
                "type": "shelter",
                "position": [
                    109.189,
                    27.719
                ],
                "address": "铜仁市碧江区清水大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "铜仁站地下通道",
                "description": "铜仁铁路枢纽地下民防工程"
            },
            {
                "id": "tr_002",
                "name": "铜仁南站地下避难所",
                "type": "shelter",
                "position": [
                    109.2567,
                    27.7567
                ],
                "address": "铜仁市玉屏县",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "高铁枢纽防护设施",
                "access": "铜仁南站地下",
                "description": "高铁枢纽人防工程"
            },
            {
                "id": "tr_003",
                "name": "铜仁市人防地下商城",
                "type": "underground_mall",
                "position": [
                    109.1845,
                    27.7167
                ],
                "address": "铜仁市碧江区中山路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "中山路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "铜仁火车站",
                "type": "transport",
                "position": [
                    109.189,
                    27.719
                ],
                "risk": "中"
            }
        ]
    },
    "qianxinan": {
        "name": "黔西南",
        "center": [
            104.894,
            25.092
        ],
        "shelters": [
            {
                "id": "qxn_001",
                "name": "兴义站地下避难所",
                "type": "shelter",
                "position": [
                    104.894,
                    25.092
                ],
                "address": "黔西南州兴义市兴义大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "兴义站地下通道",
                "description": "黔西南铁路枢纽地下民防工程"
            },
            {
                "id": "qxn_002",
                "name": "黔西南州人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.8898,
                    25.0898
                ],
                "address": "黔西南州兴义市沙井街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "沙井街地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "兴义火车站",
                "type": "transport",
                "position": [
                    104.894,
                    25.092
                ],
                "risk": "中"
            }
        ]
    },
    "qiandongnan": {
        "name": "黔东南",
        "center": [
            107.98,
            26.589
        ],
        "shelters": [
            {
                "id": "qdn_001",
                "name": "凯里站地下避难所",
                "type": "shelter",
                "position": [
                    107.98,
                    26.589
                ],
                "address": "黔东南州凯里市清江路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "凯里站地下通道",
                "description": "黔东南铁路枢纽地下民防工程"
            },
            {
                "id": "qdn_002",
                "name": "黔东南州人防地下商城",
                "type": "underground_mall",
                "position": [
                    107.9756,
                    26.5867
                ],
                "address": "黔东南州凯里市北京东路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "北京东路地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "凯里火车站",
                "type": "transport",
                "position": [
                    107.98,
                    26.589
                ],
                "risk": "中"
            }
        ]
    },
    "yuxi": {
        "name": "玉溪",
        "center": [
            102.544,
            24.351
        ],
        "shelters": [
            {
                "id": "yx_001",
                "name": "玉溪站地下避难所",
                "type": "shelter",
                "position": [
                    102.544,
                    24.351
                ],
                "address": "玉溪市红塔区珊瑚路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "玉溪站地下通道",
                "description": "玉溪铁路枢纽地下民防工程"
            },
            {
                "id": "yx_002",
                "name": "玉溪市人防地下商城",
                "type": "underground_mall",
                "position": [
                    102.5398,
                    24.3489
                ],
                "address": "玉溪市红塔区南北大街",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "南北大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "玉溪火车站",
                "type": "transport",
                "position": [
                    102.544,
                    24.351
                ],
                "risk": "中"
            }
        ]
    },
    "baoshan": {
        "name": "保山",
        "center": [
            99.168,
            25.112
        ],
        "shelters": [
            {
                "id": "bs4_001",
                "name": "保山站地下避难所",
                "type": "shelter",
                "position": [
                    99.168,
                    25.112
                ],
                "address": "保山市隆阳区永昌路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "保山站地下通道",
                "description": "保山铁路枢纽地下民防工程"
            },
            {
                "id": "bs4_002",
                "name": "保山市人防地下商城",
                "type": "underground_mall",
                "position": [
                    99.1634,
                    25.1098
                ],
                "address": "保山市隆阳区正阳北路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "正阳北路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "保山火车站",
                "type": "transport",
                "position": [
                    99.168,
                    25.112
                ],
                "risk": "中"
            }
        ]
    },
    "zhaotong": {
        "name": "昭通",
        "center": [
            103.717,
            27.338
        ],
        "shelters": [
            {
                "id": "zt_001",
                "name": "昭通站地下避难所",
                "type": "shelter",
                "position": [
                    103.717,
                    27.338
                ],
                "address": "昭通市昭阳区昭阳大道",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "昭通站地下通道",
                "description": "昭通铁路枢纽地下民防工程"
            },
            {
                "id": "zt_002",
                "name": "昭通市人防地下商城",
                "type": "underground_mall",
                "position": [
                    103.7123,
                    27.3356
                ],
                "address": "昭通市昭阳区凤霞路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "凤霞路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "昭通火车站",
                "type": "transport",
                "position": [
                    103.717,
                    27.338
                ],
                "risk": "中"
            }
        ]
    },
    "lijiang": {
        "name": "丽江",
        "center": [
            100.233,
            26.872
        ],
        "shelters": [
            {
                "id": "lj_001",
                "name": "丽江站地下避难所",
                "type": "shelter",
                "position": [
                    100.233,
                    26.872
                ],
                "address": "丽江市玉龙县黄山镇",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "丽江站地下通道",
                "description": "丽江铁路枢纽地下民防工程"
            },
            {
                "id": "lj_002",
                "name": "丽江市人防地下商城",
                "type": "underground_mall",
                "position": [
                    100.2289,
                    26.8698
                ],
                "address": "丽江市古城区民主路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "民主路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "丽江火车站",
                "type": "transport",
                "position": [
                    100.233,
                    26.872
                ],
                "risk": "中"
            }
        ]
    },
    "puer": {
        "name": "普洱",
        "center": [
            100.966,
            22.793
        ],
        "shelters": [
            {
                "id": "pe_001",
                "name": "普洱站地下避难所",
                "type": "shelter",
                "position": [
                    100.966,
                    22.793
                ],
                "address": "普洱市思茅区茶城大道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "普洱站地下通道",
                "description": "普洱铁路枢纽地下民防工程"
            },
            {
                "id": "pe_002",
                "name": "普洱市人防地下商城",
                "type": "underground_mall",
                "position": [
                    100.9612,
                    22.7906
                ],
                "address": "普洱市思茅区振兴大道",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "振兴大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "普洱火车站",
                "type": "transport",
                "position": [
                    100.966,
                    22.793
                ],
                "risk": "低"
            }
        ]
    },
    "lincang": {
        "name": "临沧",
        "center": [
            100.088,
            23.884
        ],
        "shelters": [
            {
                "id": "lc2_001",
                "name": "临沧站地下避难所",
                "type": "shelter",
                "position": [
                    100.088,
                    23.884
                ],
                "address": "临沧市临翔区忙畔街道",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "临沧站地下通道",
                "description": "临沧铁路枢纽地下民防工程"
            },
            {
                "id": "lc2_002",
                "name": "临沧市人防地下商城",
                "type": "underground_mall",
                "position": [
                    100.0834,
                    23.8812
                ],
                "address": "临沧市临翔区南塘街",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "南塘街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "临沧火车站",
                "type": "transport",
                "position": [
                    100.088,
                    23.884
                ],
                "risk": "低"
            }
        ]
    },
    "chuxiong": {
        "name": "楚雄",
        "center": [
            101.544,
            25.044
        ],
        "shelters": [
            {
                "id": "cx_001",
                "name": "楚雄站地下避难所",
                "type": "shelter",
                "position": [
                    101.544,
                    25.044
                ],
                "address": "楚雄州楚雄市鹿城南路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "楚雄站地下通道",
                "description": "楚雄铁路枢纽地下民防工程"
            },
            {
                "id": "cx_002",
                "name": "楚雄州人防地下商城",
                "type": "underground_mall",
                "position": [
                    101.5398,
                    25.0418
                ],
                "address": "楚雄州楚雄市鹿城东路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "鹿城东路地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "楚雄火车站",
                "type": "transport",
                "position": [
                    101.544,
                    25.044
                ],
                "risk": "中"
            }
        ]
    },
    "honghe": {
        "name": "红河",
        "center": [
            103.373,
            23.369
        ],
        "shelters": [
            {
                "id": "hh3_001",
                "name": "蒙自站地下避难所",
                "type": "shelter",
                "position": [
                    103.373,
                    23.369
                ],
                "address": "红河州蒙自市雨过铺镇",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "蒙自站地下通道",
                "description": "红河铁路枢纽地下民防工程"
            },
            {
                "id": "hh3_002",
                "name": "红河州人防地下商城",
                "type": "underground_mall",
                "position": [
                    103.3689,
                    23.3667
                ],
                "address": "红河州蒙自市天马路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "天马路地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "蒙自火车站",
                "type": "transport",
                "position": [
                    103.373,
                    23.369
                ],
                "risk": "中"
            }
        ]
    },
    "wenshan": {
        "name": "文山",
        "center": [
            104.233,
            23.371
        ],
        "shelters": [
            {
                "id": "ws_001",
                "name": "文山州人防地下商城",
                "type": "underground_mall",
                "position": [
                    104.2289,
                    23.3689
                ],
                "address": "文山州文山市开化中路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "开化中路地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "文山州政府",
                "type": "landmark",
                "position": [
                    104.233,
                    23.371
                ],
                "risk": "低"
            }
        ]
    },
    "xishuangbanna": {
        "name": "西双版纳",
        "center": [
            100.796,
            22.008
        ],
        "shelters": [
            {
                "id": "xsbn_001",
                "name": "西双版纳站地下避难所",
                "type": "shelter",
                "position": [
                    100.796,
                    22.008
                ],
                "address": "西双版纳州景洪市勐罕路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "西双版纳站地下通道",
                "description": "西双版纳铁路枢纽地下民防工程"
            },
            {
                "id": "xsbn_002",
                "name": "西双版纳州人防地下商城",
                "type": "underground_mall",
                "position": [
                    100.7912,
                    22.0056
                ],
                "address": "西双版纳州景洪市宣慰大道",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "宣慰大道地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "西双版纳火车站",
                "type": "transport",
                "position": [
                    100.796,
                    22.008
                ],
                "risk": "中"
            }
        ]
    },
    "dali": {
        "name": "大理",
        "center": [
            100.23,
            25.589
        ],
        "shelters": [
            {
                "id": "dl_001",
                "name": "大理站地下避难所",
                "type": "shelter",
                "position": [
                    100.23,
                    25.589
                ],
                "address": "大理州大理市巍山路",
                "capacity": "2500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水、发电设备",
                "access": "大理站地下通道",
                "description": "大理铁路枢纽地下民防工程"
            },
            {
                "id": "dl_002",
                "name": "大理市人防地下商城",
                "type": "underground_mall",
                "position": [
                    100.2256,
                    25.5867
                ],
                "address": "大理州大理市苍山路",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "物资储备、医疗点",
                "access": "苍山路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "大理火车站",
                "type": "transport",
                "position": [
                    100.23,
                    25.589
                ],
                "risk": "中"
            }
        ]
    },
    "dehong": {
        "name": "德宏",
        "center": [
            98.578,
            24.437
        ],
        "shelters": [
            {
                "id": "dh_001",
                "name": "德宏州人防地下商城",
                "type": "underground_mall",
                "position": [
                    98.5734,
                    24.4345
                ],
                "address": "德宏州芒市团结大街",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "团结大街地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "德宏州政府",
                "type": "landmark",
                "position": [
                    98.578,
                    24.437
                ],
                "risk": "低"
            }
        ]
    },
    "nujiang": {
        "name": "怒江",
        "center": [
            98.854,
            25.851
        ],
        "shelters": [
            {
                "id": "nj2_001",
                "name": "怒江州人防地下商城",
                "type": "underground_mall",
                "position": [
                    98.8498,
                    25.8489
                ],
                "address": "怒江州泸水市六库镇",
                "capacity": "800人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "六库镇地下入口",
                "description": "州府所在地人防工程"
            }
        ],
        "targets": [
            {
                "name": "怒江州政府",
                "type": "landmark",
                "position": [
                    98.854,
                    25.851
                ],
                "risk": "低"
            }
        ]
    },
    "rikaze": {
        "name": "日喀则",
        "center": [
            88.885,
            29.267
        ],
        "shelters": [
            {
                "id": "rkz_001",
                "name": "日喀则站地下避难所",
                "type": "shelter",
                "position": [
                    88.885,
                    29.267
                ],
                "address": "日喀则市桑珠孜区",
                "capacity": "2000人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "日喀则站地下通道",
                "description": "日喀则铁路枢纽地下民防工程"
            },
            {
                "id": "rkz_002",
                "name": "日喀则市人防地下商城",
                "type": "underground_mall",
                "position": [
                    88.8801,
                    29.2645
                ],
                "address": "日喀则市桑珠孜区山东路",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "山东路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "日喀则火车站",
                "type": "transport",
                "position": [
                    88.885,
                    29.267
                ],
                "risk": "中"
            }
        ]
    },
    "changdu": {
        "name": "昌都",
        "center": [
            97.173,
            31.143
        ],
        "shelters": [
            {
                "id": "cd3_001",
                "name": "昌都市人防地下商城",
                "type": "underground_mall",
                "position": [
                    97.1689,
                    31.1406
                ],
                "address": "昌都市卡若区茶马广场",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "茶马广场地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "昌都市政府",
                "type": "landmark",
                "position": [
                    97.173,
                    31.143
                ],
                "risk": "低"
            }
        ]
    },
    "linzhi": {
        "name": "林芝",
        "center": [
            94.362,
            29.648
        ],
        "shelters": [
            {
                "id": "lz3_001",
                "name": "林芝站地下避难所",
                "type": "shelter",
                "position": [
                    94.362,
                    29.648
                ],
                "address": "林芝市巴宜区",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "林芝站地下通道",
                "description": "林芝铁路枢纽地下民防工程"
            },
            {
                "id": "lz3_002",
                "name": "林芝市人防地下商城",
                "type": "underground_mall",
                "position": [
                    94.3578,
                    29.6456
                ],
                "address": "林芝市巴宜区八一大街",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "八一大街地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "林芝火车站",
                "type": "transport",
                "position": [
                    94.362,
                    29.648
                ],
                "risk": "低"
            }
        ]
    },
    "shannan": {
        "name": "山南",
        "center": [
            91.766,
            29.236
        ],
        "shelters": [
            {
                "id": "sn2_001",
                "name": "山南市人防地下商城",
                "type": "underground_mall",
                "position": [
                    91.7612,
                    29.2334
                ],
                "address": "山南市乃东区泽当大道",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "泽当大道地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "山南市政府",
                "type": "landmark",
                "position": [
                    91.766,
                    29.236
                ],
                "risk": "低"
            }
        ]
    },
    "naqu": {
        "name": "那曲",
        "center": [
            92.051,
            31.476
        ],
        "shelters": [
            {
                "id": "nq_001",
                "name": "那曲站地下避难所",
                "type": "shelter",
                "position": [
                    92.051,
                    31.476
                ],
                "address": "那曲市色尼区",
                "capacity": "1500人",
                "level": "核6级",
                "facilities": "通风系统、应急供水",
                "access": "那曲站地下通道",
                "description": "那曲铁路枢纽地下民防工程"
            },
            {
                "id": "nq_002",
                "name": "那曲市人防地下商城",
                "type": "underground_mall",
                "position": [
                    92.0467,
                    31.4734
                ],
                "address": "那曲市色尼区浙江中路",
                "capacity": "1000人",
                "level": "核6级",
                "facilities": "应急物资储备",
                "access": "浙江中路地下入口",
                "description": "市中心商业区人防工程"
            }
        ],
        "targets": [
            {
                "name": "那曲火车站",
                "type": "transport",
                "position": [
                    92.051,
                    31.476
                ],
                "risk": "低"
            }
        ]
    }
};

module.exports = { ADDITIONAL_CITIES };
