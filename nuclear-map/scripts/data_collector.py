#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
核战争城市自救地图 - 人防工程数据收集脚本
数据来源：公开政府网站、新闻报道、官方发布信息
"""

import json
import os
from datetime import datetime

# 数据存储路径
DATA_DIR = "/root/.openclaw/workspace/nuclear-map/data"

def save_city_data(city_name, shelters):
    """保存城市避难所数据到JSON文件"""
    filepath = os.path.join(DATA_DIR, f"{city_name}.json")
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(shelters, f, ensure_ascii=False, indent=2)
    print(f"✓ 已保存 {city_name}: {len(shelters)} 个避难所")

def create_beijing_data():
    """北京地下城及人防工程数据"""
    shelters = [
        {
            "id": "bj_001",
            "name": "北京地下城（前门东区早期人防工程）",
            "address": "北京市东城区前门西兴隆街110号",
            "district": "东城区",
            "type": "人防工程",
            "subtype": "早期坑道式人防工程",
            "description": "始建于1969年，历时十年建成，最深处达十余米，全长30余公里，可容纳30余万人。设有2300个通风孔，包含电影院、理发室、医院等生活设施。",
            "coordinates": {"lat": 39.8892, "lng": 116.3974},
            "map_search": "北京地下城",
            "capacity": 300000,
            "status": "开放参观（微展厅）",
            "features": ["已开放微展厅", "可容纳30万人", "连通前门地区"],
            "source": "北京市人防办、北京日报",
            "contact": "大众点评可查询"
        },
        {
            "id": "bj_002",
            "name": "双清别墅防空洞",
            "address": "北京市海淀区香山公园双清别墅内",
            "district": "海淀区",
            "type": "防空洞",
            "subtype": "早期领导人防空洞",
            "description": "U字形结构，总长46.25米，通道宽1.4-1.9米，高2.4米。内部设有两间办公室，是中共中央进京后最早修筑的人防工事。",
            "coordinates": {"lat": 39.9912, "lng": 116.1884},
            "map_search": "香山公园双清别墅",
            "capacity": 50,
            "status": "文物保护参观",
            "features": ["历史文物", "中共中央早期防空洞"],
            "source": "香山公园管理处"
        },
        {
            "id": "bj_003",
            "name": "来青轩防空洞",
            "address": "北京市海淀区香山公园来青轩内",
            "district": "海淀区",
            "type": "防空洞",
            "subtype": "早期领导人防空洞",
            "description": "长35米，高1.8米，宽2米，内有两个房间。朱德、刘少奇、周恩来、任弼时等领导人曾在此居住。",
            "coordinates": {"lat": 39.9915, "lng": 116.1890},
            "map_search": "香山公园来青轩",
            "capacity": 30,
            "status": "文物保护参观",
            "features": ["历史文物", "领导人旧居防空洞"],
            "source": "香山公园管理处"
        },
        {
            "id": "bj_004",
            "name": "月坛公园地下靶场",
            "address": "北京市西城区月坛南街月坛公园内",
            "district": "西城区",
            "type": "人防工程",
            "subtype": "地下靶场",
            "description": "位于月坛公园地下，原为战备设施，现已改造为民防科普教育场所。",
            "coordinates": {"lat": 39.9158, "lng": 116.3436},
            "map_search": "月坛公园",
            "capacity": 200,
            "status": "部分开放",
            "features": ["民防科普", "地下靶场改造"],
            "source": "北京市人防办"
        },
        {
            "id": "bj_005",
            "name": "天坛大土山地下人防工程",
            "address": "北京市东城区天坛公园丹陛桥西侧",
            "district": "东城区",
            "type": "人防工程",
            "subtype": "地下防空洞",
            "description": "上世纪70年代修建前门地下城时，挖出的积土堆成土山，占地6公顷、高32米，地下有连通的人防工程。",
            "coordinates": {"lat": 39.8823, "lng": 116.4068},
            "map_search": "天坛公园",
            "capacity": 10000,
            "status": "土山已移除，地下工程保留",
            "features": ["历史遗迹", "已改造"],
            "source": "北京市人防办史料"
        },
        {
            "id": "bj_006",
            "name": "大兴区兴华大街三段15号人防工程",
            "address": "北京市大兴区兴华大街三段15号",
            "district": "大兴区",
            "type": "人防工程",
            "subtype": "地下停车场人防工程",
            "description": "建筑面积2575平方米，现用途为地下停车场，具备人防掩蔽功能。",
            "coordinates": {"lat": 39.7326, "lng": 116.3306},
            "map_search": "大兴区兴华大街三段15号",
            "capacity": 500,
            "status": "平时停车场/战时掩蔽",
            "features": ["平战结合", "地下停车场"],
            "source": "大兴区民防局招标公告"
        },
        {
            "id": "bj_007",
            "name": "西红门镇宏大北园7号楼人防工程",
            "address": "北京市大兴区西红门镇宏大北园7号楼",
            "district": "大兴区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "建筑面积1706平方米，目前未使用，为人防储备工程。",
            "coordinates": {"lat": 39.7898, "lng": 116.3302},
            "map_search": "宏大北园",
            "capacity": 300,
            "status": "储备状态",
            "features": ["住宅配建"],
            "source": "大兴区民防局"
        }
    ]
    return shelters

def create_shanghai_data():
    """上海市民防工程数据"""
    shelters = [
        {
            "id": "sh_001",
            "name": "上海市人民防空宣传教育中心",
            "address": "上海市黄浦区复兴中路593号",
            "district": "黄浦区",
            "type": "民防工程",
            "subtype": "民防教育场馆",
            "description": "上海市级人防科普教育基地，展示上海民防发展历程，可查询全市民防工程分布。",
            "coordinates": {"lat": 31.2165, "lng": 121.4690},
            "map_search": "上海民防科普教育馆",
            "capacity": 200,
            "status": "开放",
            "features": ["民防科普", "教育展示"],
            "source": "上海市民防办",
            "website": "https://zwdt.sh.gov.cn 随申办可查民防地图"
        },
        {
            "id": "sh_002",
            "name": "南桥书院人防工程",
            "address": "上海市奉贤区新建中路586号",
            "district": "奉贤区",
            "type": "人防工程",
            "subtype": "学校操场下人防工程",
            "description": "利用学校操场地下空间建设的人防工程，平时作为学校配套设施，战时为人员掩蔽所。",
            "coordinates": {"lat": 30.9179, "lng": 121.4741},
            "map_search": "南桥书院",
            "capacity": 1000,
            "status": "平战结合",
            "features": ["学校配建", "操场地下"],
            "source": "上海市人防办"
        },
        {
            "id": "sh_003",
            "name": "南桥塘民防遗址公园",
            "address": "上海市奉贤区南桥源城市更新区",
            "district": "奉贤区",
            "type": "人防工程",
            "subtype": "民防遗址公园",
            "description": "上海市第一个民防遗址公园，让沉寂地下的老旧人防工程得以重新被发现、挖掘、修缮及利用，打造地上地下一体化的居民活动公共空间。",
            "coordinates": {"lat": 30.9156, "lng": 121.4723},
            "map_search": "南桥塘民防遗址公园",
            "capacity": 500,
            "status": "开放",
            "features": ["民防遗址", "公园", "爱国主义教育"],
            "source": "上海市人防办"
        },
        {
            "id": "sh_004",
            "name": "赤三小区人防工程",
            "address": "上海市虹口区曲阳路街道赤三小区",
            "district": "虹口区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "将原有的十多个防空洞进行公益化改造，其中儿童友好活动室融合国内外先进科普展馆建设理念，为社区青少年打造综合性科普实验基地。",
            "coordinates": {"lat": 31.2789, "lng": 121.4845},
            "map_search": "赤三小区",
            "capacity": 300,
            "status": "改造为科普基地",
            "features": ["公益化改造", "儿童乐园", "科普教育"],
            "source": "虹口区民防办"
        },
        {
            "id": "sh_005",
            "name": "松江万达广场民防工程",
            "address": "上海市松江区广富林路658号",
            "district": "松江区",
            "type": "人防工程",
            "subtype": "商业综合体配建人防",
            "description": "工程面积15258平方米，战时为二等人员掩蔽部，设有7个防护单元，平时使用为汽车库。",
            "coordinates": {"lat": 31.0514, "lng": 121.2275},
            "map_search": "松江万达广场",
            "capacity": 8000,
            "status": "平战结合",
            "features": ["商业配建", "二等人员掩蔽部"],
            "source": "松江区民防办"
        },
        {
            "id": "sh_006",
            "name": "佘山玺樾民防工程",
            "address": "上海市松江区灵竹路99弄",
            "district": "松江区",
            "type": "人防工程",
            "subtype": "别墅区配建人防",
            "description": "工程面积43304平方米，战时为二等人员掩蔽部，设有20个防护单元，平时使用为汽车库。该工程与居民别墅地下室出入口联通，设有民防密闭通道474个。",
            "coordinates": {"lat": 31.0987, "lng": 121.1954},
            "map_search": "佘山玺樾",
            "capacity": 20000,
            "status": "平战结合",
            "features": ["别墅区配建", "连通地下室"],
            "source": "松江区民防办"
        },
        {
            "id": "sh_007",
            "name": "万科梦想派民防工程",
            "address": "上海市松江区中山街道淡家浜路88弄",
            "district": "松江区",
            "type": "人防工程",
            "subtype": "住宅小区配建人防",
            "description": "工程面积7036平方米，战时为二等人员掩蔽部，设有4个防护单元，平时使用为汽车库。",
            "coordinates": {"lat": 31.0423, "lng": 121.2356},
            "map_search": "万科梦想派",
            "capacity": 3500,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "松江区民防办"
        }
    ]
    return shelters

# 更多城市数据将在后续添加...

def main():
    """主函数：生成所有城市的人防工程数据"""
    print("=" * 60)
    print("核战争城市自救地图 - 人防工程数据收集")
    print(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # 确保数据目录存在
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # 生成各城市数据
    cities_data = {
        "beijing": create_beijing_data(),
        "shanghai": create_shanghai_data(),
        # 其他城市将通过更多函数添加
    }
    
    # 保存各城市数据
    for city, shelters in cities_data.items():
        save_city_data(city, shelters)
    
    # 生成汇总文件
    summary = {
        "project": "核战争城市自救地图",
        "version": "1.0",
        "generated_at": datetime.now().isoformat(),
        "cities": list(cities_data.keys()),
        "total_shelters": sum(len(s) for s in cities_data.values()),
        "data_format": {
            "id": "唯一标识符",
            "name": "工程名称",
            "address": "具体地址",
            "district": "所属区县",
            "type": "工程类型（人防工程/防空洞/地下避难所）",
            "subtype": "子类型",
            "description": "详细描述",
            "coordinates": {"lat": "纬度", "lng": "经度"},
            "map_search": "高德地图搜索关键词",
            "capacity": "容纳人数",
            "status": "当前状态",
            "features": "特色功能列表",
            "source": "数据来源"
        }
    }
    
    with open(os.path.join(DATA_DIR, "summary.json"), 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ 汇总文件已保存: summary.json")
    print(f"✓ 总计: {summary['total_shelters']} 个避难所")
    print("=" * 60)

if __name__ == "__main__":
    main()
