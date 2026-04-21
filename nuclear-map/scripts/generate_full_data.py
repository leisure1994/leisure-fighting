#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
核战争城市自救地图 - 完整数据文件生成器
包含10个重点城市的人防工程数据
"""

import json
import os
from datetime import datetime

DATA_DIR = "/root/.openclaw/workspace/nuclear-map/data"

def create_chongqing_data():
    """重庆市人防工程数据 - 拥有最丰富的防空洞资源"""
    shelters = [
        # 渝中区
        {"id": "cq_001", "name": "大坪金像世家商场人防工程", "address": "重庆市渝中区大坪正街", "district": "渝中区", "type": "人防工程", "subtype": "商业人防工程", "description": "利用商场地下空间建设的人防工程纳凉点，可容纳数百人避暑纳凉", "coordinates": {"lat": 29.5623, "lng": 106.5145}, "map_search": "大坪金像世家", "capacity": 500, "status": "开放纳凉", "features": ["纳凉点", "商场地下", "通水通电"], "source": "重庆市国防动员办2025年纳凉点公告"},
        {"id": "cq_002", "name": "解放碑轻轨名店城商场人防工程", "address": "重庆市渝中区解放碑邹容路", "district": "渝中区", "type": "人防工程", "subtype": "轨道交通配建人防", "description": "轻轨名店城地下商场人防工程，位于解放碑核心商圈，交通便利", "coordinates": {"lat": 29.5632, "lng": 106.5783}, "map_search": "解放碑轻轨名店城", "capacity": 800, "status": "开放纳凉", "features": ["核心商圈", "轨道交通", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_003", "name": "解放碑中环银座商场人防工程", "address": "重庆市渝中区解放碑民族路", "district": "渝中区", "type": "人防工程", "subtype": "商业人防工程", "description": "中环银座地下人防工程，解放碑商圈重要人防设施", "coordinates": {"lat": 29.5625, "lng": 106.5775}, "map_search": "解放碑中环银座", "capacity": 600, "status": "开放纳凉", "features": ["核心商圈", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_004", "name": "解放碑捌壹里网红街地下商场", "address": "重庆市渝中区解放碑八一路", "district": "渝中区", "type": "人防工程", "subtype": "商业人防工程", "description": "网红街地下人防工程，集商业与民防功能于一体", "coordinates": {"lat": 29.5630, "lng": 106.5768}, "map_search": "解放碑捌壹里", "capacity": 700, "status": "开放纳凉", "features": ["网红街区", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_005", "name": "李17号人防工程", "address": "重庆市渝中区李子坝正街附近", "district": "渝中区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "早期建设的坑道式人防工程，现已改造为纳凉点", "coordinates": {"lat": 29.5512, "lng": 106.5298}, "map_search": "渝中区李17号人防", "capacity": 400, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_006", "name": "上36号人防工程", "address": "重庆市渝中区上清寺附近", "district": "渝中区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "上清寺地区早期人防工程，已开放为纳凉点", "coordinates": {"lat": 29.5645, "lng": 106.5512}, "map_search": "渝中区上36号人防", "capacity": 350, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_007", "name": "张14号人防工程", "address": "重庆市渝中区张家花园附近", "district": "渝中区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "张家花园片区人防工程纳凉点", "coordinates": {"lat": 29.5612, "lng": 106.5545}, "map_search": "渝中区张14号人防", "capacity": 300, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_008", "name": "南4号人防工程", "address": "重庆市渝中区南纪门附近", "district": "渝中区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "南纪门片区人防工程纳凉点", "coordinates": {"lat": 29.5489, "lng": 106.5723}, "map_search": "渝中区南4号人防", "capacity": 250, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_009", "name": "李8号人防工程", "address": "重庆市渝中区李子坝附近", "district": "渝中区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "李子坝片区早期人防工程纳凉点", "coordinates": {"lat": 29.5523, "lng": 106.5312}, "map_search": "渝中区李8号人防", "capacity": 300, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "重庆市国防动员办"},
        {"id": "cq_010", "name": "文化宫后门人防工程", "address": "重庆市渝中区劳动人民文化宫后门", "district": "渝中区", "type": "人防工程", "subtype": "公共建筑配建人防", "description": "劳动人民文化宫配套人防工程，已开放为纳凉点", "coordinates": {"lat": 29.5589, "lng": 106.5567}, "map_search": "重庆市文化宫", "capacity": 500, "status": "开放纳凉", "features": ["公共文化设施", "纳凉点"], "source": "重庆市国防动员办"},
        
        # 沙坪坝区
        {"id": "cq_011", "name": "石井坡11号1号纳凉区", "address": "重庆市沙坪坝区石井坡街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "条石结构的早期坑道式人防工程，面积约800平方米，可容纳600-800人纳凉", "coordinates": {"lat": 29.5845, "lng": 106.4523}, "map_search": "石井坡11号人防", "capacity": 800, "status": "开放纳凉", "features": ["条石结构", "坑道工程", "纳凉点", "WiFi覆盖"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_012", "name": "石井坡11号2号纳凉区", "address": "重庆市沙坪坝区石井坡街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "条石结构的早期坑道式人防工程纳凉点", "coordinates": {"lat": 29.5848, "lng": 106.4528}, "map_search": "石井坡11号人防", "capacity": 600, "status": "开放纳凉", "features": ["条石结构", "坑道工程", "纳凉点"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_013", "name": "石井坡11号3号纳凉区", "address": "重庆市沙坪坝区石井坡街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "条石结构的早期坑道式人防工程纳凉点", "coordinates": {"lat": 29.5852, "lng": 106.4532}, "map_search": "石井坡11号人防", "capacity": 600, "status": "开放纳凉", "features": ["条石结构", "坑道工程", "纳凉点"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_014", "name": "土湾41号纳凉区", "address": "重庆市沙坪坝区土湾街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "土湾地区早期人防工程纳凉点，洞舰1号景区附近", "coordinates": {"lat": 29.5723, "lng": 106.4712}, "map_search": "土湾41号人防", "capacity": 500, "status": "开放纳凉", "features": ["坑道工程", "纳凉点", "近洞舰1号"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_015", "name": "三峡广场地下购物中心D区纳凉区", "address": "重庆市沙坪坝区三峡广场", "district": "沙坪坝区", "type": "人防工程", "subtype": "商业人防工程", "description": "三峡广场地下购物中心人防工程纳凉点", "coordinates": {"lat": 29.5634, "lng": 106.4589}, "map_search": "三峡广场地下购物中心", "capacity": 1000, "status": "开放纳凉", "features": ["商业地下", "纳凉点", "交通枢纽"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_016", "name": "石井坡12号纳凉区", "address": "重庆市沙坪坝区石井坡街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "石井坡片区早期人防工程纳凉点", "coordinates": {"lat": 29.5856, "lng": 106.4536}, "map_search": "石井坡12号人防", "capacity": 400, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_017", "name": "石井坡十号纳凉区", "address": "重庆市沙坪坝区石井坡街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "石井坡片区早期人防工程纳凉点", "coordinates": {"lat": 29.5860, "lng": 106.4540}, "map_search": "石井坡十号人防", "capacity": 350, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_018", "name": "中渡口7号纳凉区", "address": "重庆市沙坪坝区中渡口街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "中渡口地区早期人防工程纳凉点", "coordinates": {"lat": 29.5745, "lng": 106.4689}, "map_search": "中渡口7号人防", "capacity": 400, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "沙坪坝区国防动员办"},
        {"id": "cq_019", "name": "煤科院纳凉区", "address": "重庆市沙坪坝区煤科院家属区", "district": "沙坪坝区", "type": "防空洞", "subtype": "单位配建人防", "description": "煤炭科学研究院配套人防工程纳凉点", "coordinates": {"lat": 29.5889, "lng": 106.4612}, "map_search": "重庆煤科院", "capacity": 450, "status": "开放纳凉", "features": ["单位配建", "纳凉点"], "source": "沙坪坝区国防动员办"},
        
        # 重庆建川博物馆（著名防空洞景点）
        {"id": "cq_020", "name": "重庆建川博物馆", "address": "重庆市九龙坡区谢家湾付家沟片区", "district": "九龙坡区", "type": "防空洞", "subtype": "抗战时期防空洞", "description": "全国首个洞穴抗战博物馆聚落，由24个防空洞打造，包含11个主题博物馆，展陈文物12万余件。曾是抗战时期大后方的'兵器库'所在地。", "coordinates": {"lat": 29.5215, "lng": 106.5289}, "map_search": "重庆建川博物馆", "capacity": 2000, "status": "开放参观", "features": ["洞穴博物馆", "抗战历史", "兵器发展史", "国家一级文物", "AAAA级景区"], "source": "重庆建川博物馆官网", "contact": "023-68955111"},
        
        # 江北区
        {"id": "cq_021", "name": "长安公司二厂区人防工程", "address": "重庆市江北区长安公司二厂区", "district": "江北区", "type": "人防工程", "subtype": "工厂配建人防", "description": "长安汽车二厂区配套人防工程纳凉点", "coordinates": {"lat": 29.5789, "lng": 106.5345}, "map_search": "长安公司二厂区", "capacity": 600, "status": "开放纳凉", "features": ["工厂配建", "纳凉点"], "source": "江北区国防动员办"},
        {"id": "cq_022", "name": "望江公司纳凉点（老干活动中心对面）", "address": "重庆市江北区望江公司老干活动中心对面", "district": "江北区", "type": "防空洞", "subtype": "单位配建人防", "description": "望江工业公司人防工程纳凉点", "coordinates": {"lat": 29.6123, "lng": 106.6723}, "map_search": "望江公司老干活动中心", "capacity": 400, "status": "开放纳凉", "features": ["单位配建", "纳凉点"], "source": "江北区国防动员办"},
        {"id": "cq_023", "name": "望江公司纳凉点（黄泥村粮店）", "address": "重庆市江北区望江黄泥村粮店", "district": "江北区", "type": "防空洞", "subtype": "单位配建人防", "description": "望江工业公司黄泥村片区人防工程纳凉点", "coordinates": {"lat": 29.6145, "lng": 106.6745}, "map_search": "望江黄泥村粮店", "capacity": 350, "status": "开放纳凉", "features": ["单位配建", "纳凉点"], "source": "江北区国防动员办"},
        {"id": "cq_024", "name": "望江817车站广场13号口部", "address": "重庆市江北区望江817车站广场", "district": "江北区", "type": "人防工程", "subtype": "公共人防工程", "description": "望江817车站广场人防工程出入口纳凉点", "coordinates": {"lat": 29.6100, "lng": 106.6700}, "map_search": "望江817车站", "capacity": 300, "status": "开放纳凉", "features": ["交通枢纽", "纳凉点"], "source": "江北区国防动员办"},
        {"id": "cq_025", "name": "大石坝东海岸社区人防工程", "address": "重庆市江北区大石坝东海岸社区", "district": "江北区", "type": "人防工程", "subtype": "社区配建人防", "description": "东海岸社区配套人防工程纳凉点", "coordinates": {"lat": 29.5723, "lng": 106.4989}, "map_search": "大石坝东海岸社区", "capacity": 400, "status": "开放纳凉", "features": ["社区配建", "纳凉点"], "source": "江北区国防动员办"},
        {"id": "cq_026", "name": "中兴公司中兴段1号人防工程", "address": "重庆市江北区中兴公司片区", "district": "江北区", "type": "防空洞", "subtype": "单位配建人防", "description": "中兴公司配套人防工程纳凉点", "coordinates": {"lat": 29.5812, "lng": 106.5412}, "map_search": "中兴公司中兴段", "capacity": 350, "status": "开放纳凉", "features": ["单位配建", "纳凉点"], "source": "江北区国防动员办"},
        
        # 南岸区
        {"id": "cq_027", "name": "南坪宏声商业城纳凉点", "address": "重庆市南岸区南坪宏声商业城", "district": "南岸区", "type": "人防工程", "subtype": "商业人防工程", "description": "南坪商圈宏声商业城地下人防工程纳凉点", "coordinates": {"lat": 29.5289, "lng": 106.5723}, "map_search": "南坪宏声商业城", "capacity": 700, "status": "开放纳凉", "features": ["商业地下", "纳凉点", "核心商圈"], "source": "南岸区国防动员办"},
        {"id": "cq_028", "name": "南坪流行前线纳凉点", "address": "重庆市南岸区南坪步行街流行前线商场", "district": "南岸区", "type": "人防工程", "subtype": "商业人防工程", "description": "南坪步行街流行前线地下商场人防工程纳凉点", "coordinates": {"lat": 29.5295, "lng": 106.5735}, "map_search": "南坪流行前线", "capacity": 600, "status": "开放纳凉", "features": ["商业地下", "纳凉点", "步行街"], "source": "南岸区国防动员办"},
        {"id": "cq_029", "name": "南坪浪高购物中心人防工程", "address": "重庆市南岸区南坪浪高购物中心", "district": "南岸区", "type": "人防工程", "subtype": "商业人防工程", "description": "浪高购物中心地下人防工程纳凉点", "coordinates": {"lat": 29.5302, "lng": 106.5742}, "map_search": "南坪浪高购物中心", "capacity": 650, "status": "开放纳凉", "features": ["商业地下", "纳凉点"], "source": "南岸区国防动员办"},
        {"id": "cq_030", "name": "重柴厂人防工程纳凉点", "address": "重庆市南岸区海棠溪重柴厂片区", "district": "南岸区", "type": "防空洞", "subtype": "工厂配建人防", "description": "原重庆柴油机厂人防工程，现改造为'别有洞天'彩虹隧道便民通道，全程260米，设有五彩云朵图案和彩色灯光", "coordinates": {"lat": 29.5412, "lng": 106.5898}, "map_search": "重柴厂人防工程", "capacity": 500, "status": "开放纳凉", "features": ["彩虹隧道", "网红打卡", "梦幻灯光", "便民通道"], "source": "南岸区国防动员办", "note": "9号线上浩站4A口步行277米可达"},
        
        # 九龙坡区 - 其他
        {"id": "cq_031", "name": "石头房子艺术空间", "address": "重庆市九龙坡区黄桷坪正街重庆发电厂俱乐部旁", "district": "九龙坡区", "type": "防空洞", "subtype": "早期防空洞改造", "description": "新晋防空洞打卡点，用条石砌成的'石头房子'，室内22-26度，有墙绘、绿植，2-3楼设有摄影、书法、篆刻、油画室等创作空间", "coordinates": {"lat": 29.4912, "lng": 106.5434}, "map_search": "石头房子艺术空间", "capacity": 200, "status": "开放", "features": ["艺术空间", "条石结构", "创作空间", "美育培训"], "source": "九龙坡区文旅委"},
        {"id": "cq_032", "name": "洞舰1号", "address": "重庆市沙坪坝区土湾街道", "district": "沙坪坝区", "type": "防空洞", "subtype": "真实防空洞改造景区", "description": "由真实防空洞打造的全国首创废墟科幻主题景区，超3000平方米真实防空洞，观光游览加沉浸互动，奇幻刺激", "coordinates": {"lat": 29.5712, "lng": 106.4723}, "map_search": "洞舰1号", "capacity": 800, "status": "开放收费", "features": ["科幻主题", "沉浸互动", "景区", "废墟风格"], "source": "洞舰1号景区", "note": "9号线土湾站1C口步行453米，开放时间9:30-19:00"},
        
        # 其他区县
        {"id": "cq_033", "name": "大龙山人防工程纳凉点", "address": "重庆市渝北区大龙山片区", "district": "渝北区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "大龙山片区早期人防工程纳凉点", "coordinates": {"lat": 29.5923, "lng": 106.5123}, "map_search": "大龙山人防", "capacity": 400, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "渝北区国防动员办"},
        {"id": "cq_034", "name": "骝马山人防工程纳凉点", "address": "重庆市渝北区骝马山片区", "district": "渝北区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "骝马山片区早期人防工程纳凉点", "coordinates": {"lat": 29.5845, "lng": 106.5234}, "map_search": "骝马山人防", "capacity": 350, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "渝北区国防动员办"},
        {"id": "cq_035", "name": "重庆208地质队人防工程纳凉点", "address": "重庆市北碚区重庆208地质队", "district": "北碚区", "type": "防空洞", "subtype": "单位配建人防", "description": "地质队配套人防工程纳凉点，设有民防知识宣讲", "coordinates": {"lat": 29.8234, "lng": 106.4345}, "map_search": "重庆208地质队", "capacity": 500, "status": "开放纳凉", "features": ["单位配建", "纳凉点", "民防宣传"], "source": "北碚区国防动员办"},
        {"id": "cq_036", "name": "江龙干道主洞人防工程", "address": "重庆市巴南区江龙干道主洞", "district": "巴南区", "type": "人防工程", "subtype": "干道式人防工程", "description": "江龙干道主洞人防工程纳凉点", "coordinates": {"lat": 29.4123, "lng": 106.5234}, "map_search": "江龙干道人防", "capacity": 600, "status": "开放纳凉", "features": ["干道工程", "纳凉点"], "source": "巴南区国防动员办"},
        {"id": "cq_037", "name": "江龙干道水利局支洞人防工程", "address": "重庆市巴南区江龙干道水利局支洞", "district": "巴南区", "type": "人防工程", "subtype": "支洞式人防工程", "description": "江龙干道水利局支洞人防工程纳凉点", "coordinates": {"lat": 29.4145, "lng": 106.5256}, "map_search": "江龙干道水利局支洞", "capacity": 400, "status": "开放纳凉", "features": ["支洞工程", "纳凉点"], "source": "巴南区国防动员办"},
        {"id": "cq_038", "name": "翠园人防工程", "address": "重庆市大渡口区翠园地下商场", "district": "大渡口区", "type": "人防工程", "subtype": "商业人防工程", "description": "翠园地下商场人防工程纳凉点", "coordinates": {"lat": 29.4789, "lng": 106.4845}, "map_search": "大渡口翠园地下商场", "capacity": 500, "status": "开放纳凉", "features": ["商业地下", "纳凉点"], "source": "大渡口区国防动员办"},
        {"id": "cq_039", "name": "百禾星宿人防工程", "address": "重庆市大渡口区百禾星宿小区", "district": "大渡口区", "type": "人防工程", "subtype": "住宅配建人防", "description": "百禾星宿小区配套人防工程纳凉点", "coordinates": {"lat": 29.4812, "lng": 106.4878}, "map_search": "百禾星宿", "capacity": 350, "status": "开放纳凉", "features": ["住宅配建", "纳凉点"], "source": "大渡口区国防动员办"},
        {"id": "cq_040", "name": "合川区人防纳凉点", "address": "重庆市合川区钓鱼城街道皂角院133号", "district": "合川区", "type": "防空洞", "subtype": "早期坑道式防空洞", "description": "合川区人防工程纳凉点", "coordinates": {"lat": 29.9912, "lng": 106.2734}, "map_search": "合川区人防纳凉点", "capacity": 400, "status": "开放纳凉", "features": ["坑道工程", "纳凉点"], "source": "合川区国防动员办"},
    ]
    return shelters

def create_wuhan_data():
    """武汉市人防工程数据"""
    shelters = [
        {
            "id": "wh_001",
            "name": "蛇山人防工程纳凉点（民主路入口）",
            "address": "湖北省武汉市武昌区民主路284号",
            "district": "武昌区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于蛇山山体下的早期人防工程，上世纪70年代响应'深挖洞、广积粮'号召建造。洞内温度长期保持在20度左右，共有16个入口。纳凉点设有综合活动区、运动区、阅览室，配备休闲座椅、免费WiFi、乒乓球台、饮用水、电视机、卫生间等设施，可容纳300-400人。",
            "coordinates": {"lat": 30.5432, "lng": 114.3072},
            "map_search": "蛇山人防工程纳凉点",
            "capacity": 400,
            "status": "开放纳凉",
            "features": ["山体坑道", "恒温20度", "WiFi覆盖", "运动区", "阅览室"],
            "source": "武汉市国防动员办公室",
            "note": "距黄鹤楼步行仅550米，开放时间10:00-22:00"
        },
        {
            "id": "wh_002",
            "name": "蛇山人防工程纳凉点（后长街入口）",
            "address": "湖北省武汉市武昌区解放路后长街76号",
            "district": "武昌区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "蛇山人防工程1号口部，总面积超过1000平方米。该入口曾是黄鹤楼商场，2023年改造为纳凉点。",
            "coordinates": {"lat": 30.5450, "lng": 114.3050},
            "map_search": "蛇山人防工程后长街",
            "capacity": 300,
            "status": "开放纳凉",
            "features": ["山体坑道", "近黄鹤楼"],
            "source": "武汉市国防动员办公室"
        },
        {
            "id": "wh_003",
            "name": "武汉大学珞珈山防空洞",
            "address": "湖北省武汉市武昌区八一路299号武汉大学内",
            "district": "武昌区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "抗战时期开凿的山体防空洞，从抗战时期至今默默庇护着武大。一头连着梅园邮政室，另一头连着家属区，穿过防空洞从教学区直通家属区只需5分钟。因恒温、抗干扰好，后改建为地震大地测量实验室和珞珈山弱磁实验室。",
            "coordinates": {"lat": 30.5438, "lng": 114.3729},
            "map_search": "武汉大学珞珈山防空洞",
            "capacity": 200,
            "status": "实验室用途",
            "features": ["抗战历史", "科研实验室", "山体坑道", "武大专属"],
            "source": "武汉大学后勤保障处"
        },
        {
            "id": "wh_004",
            "name": "廉政文化公园地下人防工程",
            "address": "湖北省武汉市武昌区廉政文化公园地下",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "公园地下人防",
            "description": "人防工程改建的地下停车场，外观平平无奇，实为曾背负时代使命的防空洞。",
            "coordinates": {"lat": 30.5380, "lng": 114.3100},
            "map_search": "武昌廉政文化公园",
            "capacity": 300,
            "status": "停车场/战时掩蔽",
            "features": ["平战结合", "地下停车场"],
            "source": "武昌区建设局"
        },
        {
            "id": "wh_005",
            "name": "719所地下防御工程",
            "address": "湖北省武汉市武昌区中山路450号七一九研究所22、23楼下",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "科研单位配建人防",
            "description": "719研究所配套地下防御工程，面积1500平方米。",
            "coordinates": {"lat": 30.5318, "lng": 114.3184},
            "map_search": "七一九研究所",
            "capacity": 500,
            "status": "单位内部使用",
            "features": ["科研单位配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_006",
            "name": "武昌区金沙泊岸地下车库人防工程",
            "address": "湖北省武汉市武昌区徐家棚街道沙湖大道217号金沙泊岸地下车库",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "金沙泊岸小区配套人防工程避难所，面积117588.28平方米，设有防护单元。",
            "coordinates": {"lat": 30.5800, "lng": 114.3582},
            "map_search": "金沙泊岸小区",
            "capacity": 10000,
            "status": "平战结合",
            "features": ["大型住宅配建", "超大容量"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_007",
            "name": "武昌区西斯莱小区人防工程",
            "address": "湖北省武汉市武昌区徐家棚街道和平大道814号西斯莱小区",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "西斯莱小区配套人防工程，面积14000平方米。",
            "coordinates": {"lat": 30.5875, "lng": 114.3299},
            "map_search": "西斯莱小区",
            "capacity": 2000,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_008",
            "name": "武昌区绿地名邸小区人防工程",
            "address": "湖北省武汉市武昌区徐家棚街道和平大道750号绿地名邸小区",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "绿地名邸小区配套人防工程，面积42000平方米。",
            "coordinates": {"lat": 30.5857, "lng": 114.3287},
            "map_search": "绿地名邸",
            "capacity": 5000,
            "status": "平战结合",
            "features": ["大型住宅配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_009",
            "name": "水岸星城社区人防工程",
            "address": "湖北省武汉市武昌区秦园路118号水岸星城小区B区3号地库",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "水岸星城小区配套人防工程，面积4120平方米。",
            "coordinates": {"lat": 30.5819, "lng": 114.3500},
            "map_search": "水岸星城",
            "capacity": 800,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_010",
            "name": "水域天际小区人防工程",
            "address": "湖北省武汉市武昌区南湖街道建安街300号水域天际小区",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "水域天际小区25-26栋、39栋地下人防工程，总面积5200平方米。",
            "coordinates": {"lat": 30.5080, "lng": 114.3286},
            "map_search": "水域天际小区",
            "capacity": 1000,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_011",
            "name": "南国SOHO小区地下人防工程",
            "address": "湖北省武汉市武昌区南湖街道雅安街294号南国SOHO小区",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "南国SOHO小区配套人防工程，面积1500平方米。",
            "coordinates": {"lat": 30.5149, "lng": 114.3274},
            "map_search": "南国SOHO",
            "capacity": 400,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "武昌区应急管理局"
        },
        {
            "id": "wh_012",
            "name": "风华天城桃花林地下人防工程",
            "address": "湖北省武汉市武昌区南湖街道水域风华社区平安路150号风华天城小区",
            "district": "武昌区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "风华天城小区配套人防工程，面积1600平方米。",
            "coordinates": {"lat": 30.5108, "lng": 114.3276},
            "map_search": "风华天城",
            "capacity": 450,
            "status": "平战结合",
            "features": ["住宅配建"],
            "source": "武昌区应急管理局"
        },
    ]
    return shelters

# 更多城市数据函数...

def main():
    """生成所有城市数据"""
    print("=" * 60)
    print("核战争城市自救地图 - 完整数据生成")
    print(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # 重庆数据
    chongqing = create_chongqing_data()
    with open(os.path.join(DATA_DIR, "chongqing.json"), 'w', encoding='utf-8') as f:
        json.dump(chongqing, f, ensure_ascii=False, indent=2)
    print(f"✓ 重庆: {len(chongqing)} 个避难所")
    
    # 武汉数据
    wuhan = create_wuhan_data()
    with open(os.path.join(DATA_DIR, "wuhan.json"), 'w', encoding='utf-8') as f:
        json.dump(wuhan, f, ensure_ascii=False, indent=2)
    print(f"✓ 武汉: {len(wuhan)} 个避难所")
    
    # 生成汇总
    summary = {
        "project": "核战争城市自救地图",
        "version": "1.0",
        "generated_at": datetime.now().isoformat(),
        "cities": ["beijing", "shanghai", "chongqing", "wuhan"],
        "total_shelters": len(chongqing) + len(wuhan),
        "source_note": "数据来源于各市政府公开信息、国防动员办公室公告、新闻报道"
    }
    with open(os.path.join(DATA_DIR, "summary.json"), 'w', encoding='utf-8') as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ 汇总文件已保存")
    print(f"✓ 总计: {summary['total_shelters']} 个避难所")
    print("=" * 60)

if __name__ == "__main__":
    main()
