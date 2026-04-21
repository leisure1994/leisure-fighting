#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
核战争城市自救地图 - 数据合并与最终汇总
合并所有城市数据并生成统一的数据库文件
"""

import json
import os
from datetime import datetime

DATA_DIR = "/root/.openclaw/workspace/nuclear-map/data"

def merge_all_data():
    """合并所有城市数据"""
    cities = ["beijing", "shanghai", "chongqing", "wuhan", "chengdu", "hangzhou", "nanjing", "xian", "guangzhou", "shenzhen"]
    
    all_shelters = []
    city_stats = {}
    
    for city in cities:
        filepath = os.path.join(DATA_DIR, f"{city}.json")
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                city_stats[city] = len(data)
                # 添加城市标识
                for shelter in data:
                    shelter['city'] = city
                all_shelters.extend(data)
                print(f"✓ 加载 {city}: {len(data)} 条记录")
    
    return all_shelters, city_stats

def create_master_database():
    """创建主数据库文件"""
    all_shelters, city_stats = merge_all_data()
    
    database = {
        "meta": {
            "project": "核战争城市自救地图",
            "version": "1.0.0",
            "description": "中国主要城市人防工程、地下避难所、防空洞数据",
            "generated_at": datetime.now().isoformat(),
            "total_records": len(all_shelters),
            "cities_covered": list(city_stats.keys()),
            "city_stats": city_stats,
            "data_format": {
                "id": "唯一标识符 (城市代码_序号)",
                "name": "工程名称",
                "address": "具体地址",
                "district": "所属区县",
                "city": "所属城市",
                "type": "工程类型 (人防工程/防空洞/地下避难所)",
                "subtype": "子类型",
                "description": "详细描述",
                "coordinates": {"lat": "纬度(WGS84)", "lng": "经度(WGS84)"},
                "map_search": "高德地图搜索关键词",
                "capacity": "容纳人数",
                "status": "当前状态",
                "features": "特色功能列表",
                "source": "数据来源",
                "contact": "联系方式",
                "website": "网站链接",
                "note": "备注信息"
            },
            "disclaimer": "本数据来源于政府公开信息、新闻报道、官方公告等公开渠道，仅供参考。实际避难时请遵循当地政府和专业部门的指引。",
            "license": "数据仅供核战争城市自救地图项目使用"
        },
        "shelters": all_shelters
    }
    
    # 保存主数据库
    master_path = os.path.join(DATA_DIR, "master_database.json")
    with open(master_path, 'w', encoding='utf-8') as f:
        json.dump(database, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ 主数据库已保存: master_database.json")
    print(f"✓ 总记录数: {len(all_shelters)}")
    
    return database

def create_city_summary():
    """创建城市汇总统计"""
    cities_data = {
        "beijing": {"name": "北京", "count": 7, "note": "前门地下城可容纳30万人"},
        "shanghai": {"name": "上海", "count": 7, "note": "可通过'随申办'APP查询民防地图"},
        "chongqing": {"name": "重庆", "count": 40, "note": "拥有全国最丰富的防空洞资源，山城特色"},
        "wuhan": {"name": "武汉", "count": 12, "note": "蛇山防空洞为著名纳凉点"},
        "chengdu": {"name": "成都", "count": 8, "note": "一号防空洞为唯一开放人防纳凉点"},
        "hangzhou": {"name": "杭州", "count": 5, "note": "四牌楼纳凉点可同时容纳300人"},
        "nanjing": {"name": "南京", "count": 12, "note": "22个纳凉点分布于各城区"},
        "xian": {"name": "西安", "count": 2, "note": "雁塔西路和安东街两处纳凉中心"},
        "guangzhou": {"name": "广州", "count": 2, "note": "市人防教育馆仅接受团体预约"},
        "shenzhen": {"name": "深圳", "count": 2, "note": "民防工程主要作为停车场使用"},
    }
    
    summary_path = os.path.join(DATA_DIR, "city_summary.json")
    with open(summary_path, 'w', encoding='utf-8') as f:
        json.dump(cities_data, f, ensure_ascii=False, indent=2)
    
    print(f"✓ 城市汇总已保存: city_summary.json")
    return cities_data

def create_geojson_export():
    """创建GeoJSON格式的地理数据（便于地图可视化）"""
    all_shelters, _ = merge_all_data()
    
    features = []
    for shelter in all_shelters:
        if 'coordinates' in shelter and shelter['coordinates']:
            feature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [shelter['coordinates']['lng'], shelter['coordinates']['lat']]
                },
                "properties": {
                    "id": shelter.get('id', ''),
                    "name": shelter.get('name', ''),
                    "address": shelter.get('address', ''),
                    "city": shelter.get('city', ''),
                    "district": shelter.get('district', ''),
                    "type": shelter.get('type', ''),
                    "capacity": shelter.get('capacity', 0),
                    "status": shelter.get('status', ''),
                    "map_search": shelter.get('map_search', '')
                }
            }
            features.append(feature)
    
    geojson = {
        "type": "FeatureCollection",
        "meta": {
            "generated_at": datetime.now().isoformat(),
            "total_features": len(features),
            "description": "核战争城市自救地图 - 人防工程地理数据"
        },
        "features": features
    }
    
    geojson_path = os.path.join(DATA_DIR, "shelters.geojson")
    with open(geojson_path, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)
    
    print(f"✓ GeoJSON已保存: shelters.geojson ({len(features)} 个地理坐标点)")

def main():
    """主函数"""
    print("=" * 70)
    print("核战争城市自救地图 - 数据合并与最终汇总")
    print(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    
    # 创建主数据库
    database = create_master_database()
    
    # 创建城市汇总
    cities_data = create_city_summary()
    
    # 创建GeoJSON
    create_geojson_export()
    
    # 打印统计信息
    print("\n" + "=" * 70)
    print("数据统计")
    print("=" * 70)
    print(f"总城市数: {len(cities_data)}")
    print(f"总避难所数: {database['meta']['total_records']}")
    print("\n各城市分布:")
    for city_code, info in cities_data.items():
        print(f"  • {info['name']}: {info['count']}个 - {info['note']}")
    
    print("\n" + "=" * 70)
    print("输出文件列表:")
    print("=" * 70)
    for f in sorted(os.listdir(DATA_DIR)):
        filepath = os.path.join(DATA_DIR, f)
        size = os.path.getsize(filepath)
        print(f"  {f} ({size:,} bytes)")
    
    print("\n✓ 所有数据文件生成完成!")
    print("=" * 70)

if __name__ == "__main__":
    main()
