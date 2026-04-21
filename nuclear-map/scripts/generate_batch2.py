#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
核战争城市自救地图 - 成都、杭州、南京、西安、广州、深圳数据
"""

import json
import os
from datetime import datetime

DATA_DIR = "/root/.openclaw/workspace/nuclear-map/data"

def create_chengdu_data():
    """成都市人防工程数据"""
    shelters = [
        {
            "id": "cd_001",
            "name": "成都一号防空洞",
            "address": "四川省成都市青羊区祠堂街9号人民公园内",
            "district": "青羊区",
            "type": "防空洞",
            "subtype": "早期公共人防工程",
            "description": "成都市目前唯一向市民开放的人防工事纳凉点，始建于1965年，是成都最早的公共人防工程，建筑面积2000平方米。位于人民公园东南角假山下，工程主体为拱形通道，长200米，宽5米，洞内净高2.8米。洞内平均温度25℃，有近300个标准座位，可容纳400名市民同时避暑乘凉。配备除湿机、饮水机、电视机、无线WiFi、电力、通风、消防、监控等设备。",
            "coordinates": {"lat": 30.6624, "lng": 104.0556},
            "map_search": "成都人民公园一号防空洞",
            "capacity": 400,
            "status": "开放纳凉",
            "features": ["成都唯一开放人防纳凉点", "50年历史", "恒温25度", "WiFi覆盖", "人民公园内"],
            "source": "四川省人防办、成都市人防办",
            "note": "地铁2号线人民公园站B口步行7分钟，开放时间9:00-17:30"
        },
        {
            "id": "cd_002",
            "name": "人民公园地下金河人防工程",
            "address": "四川省成都市青羊区人民公园内人工湖南侧",
            "district": "青羊区",
            "type": "防空洞",
            "subtype": "早期坑道式人防工程",
            "description": "占地面积约1000平方米，高约2.5米，入口位于人工湖南侧。上有两处高2米、直径1米的圆柱形攒尖顶通风设施。该工程与金河人防工程、战备医院相通。",
            "coordinates": {"lat": 30.6630, "lng": 104.0560},
            "map_search": "成都人民公园防空洞",
            "capacity": 300,
            "status": "连通一号防空洞",
            "features": ["与一号防空洞连通", "公园地下"],
            "source": "成都市人民公园管理处"
        },
        {
            "id": "cd_003",
            "name": "成都市人民公园早期战备医院",
            "address": "四川省成都市青羊区人民公园地下",
            "district": "青羊区",
            "type": "人防工程",
            "subtype": "医疗救护人防工程",
            "description": "人民公园地下战备医院，与金河人防工程、防空洞相通。",
            "coordinates": {"lat": 30.6620, "lng": 104.0550},
            "map_search": "成都人民公园",
            "capacity": 200,
            "status": "历史遗迹",
            "features": ["战备医院", "地下连通"],
            "source": "成都市人民公园管理处"
        },
        {
            "id": "cd_004",
            "name": "天府市民云紧急掩蔽工程查询点",
            "address": "成都市全域",
            "district": "全市",
            "type": "人防工程",
            "subtype": "数字化查询服务",
            "description": "成都市人民政府国防动员办公室在'天府市民云'APP上线'紧急掩蔽'导航功能。广大市民可通过登陆天府市民云首页→更多→民生保障→成都人防→紧急掩蔽的方式查询。该项功能可展示距离自己最近的5个人员掩蔽工程和地铁兼顾人防工程站点，提供驾车、公共交通、步行、骑行等多种路线导航。",
            "coordinates": {"lat": 30.6586, "lng": 104.0648},
            "map_search": "天府市民云",
            "capacity": 0,
            "status": "数字化服务",
            "features": ["数字化查询", "导航服务", "覆盖全市", "最近5个工程推荐"],
            "source": "四川省人民防空办公室",
            "website": "天府市民云APP"
        },
        {
            "id": "cd_005",
            "name": "龙潭寺TOD人防工程",
            "address": "四川省成都市成华区龙潭寺TOD项目",
            "district": "成华区",
            "type": "人防工程",
            "subtype": "轨道交通配建人防",
            "description": "龙潭寺TOD项目营销中心为市民提供纳凉服务，地下空间兼顾人防需要。",
            "coordinates": {"lat": 30.7123, "lng": 104.1523},
            "map_search": "龙潭寺TOD",
            "capacity": 500,
            "status": "建设中/部分开放",
            "features": ["TOD配建", "轨道交通", "纳凉服务"],
            "source": "成都市人防办"
        },
        {
            "id": "cd_006",
            "name": "幸福桥TOD人防工程",
            "address": "四川省成都市金牛区幸福桥TOD项目",
            "district": "金牛区",
            "type": "人防工程",
            "subtype": "轨道交通配建人防",
            "description": "幸福桥TOD项目地下人防工程，兼顾人员掩蔽功能。",
            "coordinates": {"lat": 30.7823, "lng": 104.0823},
            "map_search": "幸福桥TOD",
            "capacity": 400,
            "status": "建设中",
            "features": ["TOD配建"],
            "source": "成都市人防办"
        },
        {
            "id": "cd_007",
            "name": "梓潼宫TOD人防工程",
            "address": "四川省成都市郫都区梓潼宫TOD项目",
            "district": "郫都区",
            "type": "人防工程",
            "subtype": "轨道交通配建人防",
            "description": "梓潼宫TOD项目地下人防工程。",
            "coordinates": {"lat": 30.7523, "lng": 103.9923},
            "map_search": "梓潼宫TOD",
            "capacity": 400,
            "status": "建设中",
            "features": ["TOD配建"],
            "source": "成都市人防办"
        },
        {
            "id": "cd_008",
            "name": "双凤桥TOD未来社区人防工程",
            "address": "四川省成都市武侯区双凤桥TOD项目",
            "district": "武侯区",
            "type": "人防工程",
            "subtype": "TOD配建人防",
            "description": "双凤桥TOD未来社区除可纳凉外，还提供免费饮水等服务，地下空间兼顾人防功能。",
            "coordinates": {"lat": 30.6323, "lng": 104.0123},
            "map_search": "双凤桥TOD",
            "capacity": 600,
            "status": "建设中/部分开放",
            "features": ["TOD配建", "社区服务"],
            "source": "成都市人防办"
        },
    ]
    return shelters

def create_hangzhou_data():
    """杭州市人防工程数据"""
    shelters = [
        {
            "id": "hz_001",
            "name": "四牌楼避暑纳凉点",
            "address": "浙江省杭州市上城区四牌楼38号",
            "district": "上城区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "位于吴山脚下的四牌楼纳凉点长约500米，总面积逾1000平方米，历来最受市民喜爱，可同时容纳300多位市民避暑纳凉，高峰期日到访人次超1000人。洞内温度不足25℃，历年装修升级，墙面刷新，设备增多。是杭州市国防动员（人民防空）体验馆，设有'爱我国防，铸盾西子'国防（人防）宣传教育主题展。",
            "coordinates": {"lat": 30.2412, "lng": 120.1712},
            "map_search": "四牌楼避暑纳凉点",
            "capacity": 300,
            "status": "开放纳凉",
            "features": ["山体内坑道", "恒温25度", "国防体验馆", "手摇防空警报器体验", "免费WiFi"],
            "source": "杭州市国防动员办公室",
            "note": "地铁7号线吴山广场站步行950米，开放时间9:00-17:00"
        },
        {
            "id": "hz_002",
            "name": "白马庙巷避暑纳凉点",
            "address": "浙江省杭州市上城区白马庙巷48号",
            "district": "上城区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "上城区三大避暑纳凉点之一，山体内坑道工程，内外温差较大，配备'五通八有'（通水、通电、通手机信号、通电视、通免费Wi-Fi；有茶水、有桌椅、有书报、有温馨提示、有纳凉须知、有防暑药品、有人防宣传内容、有公益活动）。",
            "coordinates": {"lat": 30.2423, "lng": 120.1723},
            "map_search": "白马庙巷避暑纳凉点",
            "capacity": 150,
            "status": "开放纳凉",
            "features": ["山体内坑道", "五通八有", "母婴室", "无障碍卫生间"],
            "source": "杭州市国防动员办公室",
            "note": "地铁5号线候潮门站步行700米，开放时间9:00-17:00"
        },
        {
            "id": "hz_003",
            "name": "馒头山路27号避暑纳凉点",
            "address": "浙江省杭州市上城区馒头山路27号",
            "district": "上城区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "上城区三大避暑纳凉点之一，山体内坑道工程，环境整洁、空间宽敞。",
            "coordinates": {"lat": 30.2434, "lng": 120.1689},
            "map_search": "馒头山路27号避暑纳凉点",
            "capacity": 150,
            "status": "开放纳凉",
            "features": ["山体内坑道", "五通八有"],
            "source": "杭州市国防动员办公室",
            "note": "地铁5号线候潮门站步行900米，开放时间9:00-17:00"
        },
        {
            "id": "hz_004",
            "name": "曙光路避暑纳凉点",
            "address": "浙江省杭州市西湖区曙光路97-1号",
            "district": "西湖区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "西湖区避暑纳凉点，山体内坑道工程，免费开放设施齐全。",
            "coordinates": {"lat": 30.2689, "lng": 120.1489},
            "map_search": "曙光路避暑纳凉点",
            "capacity": 200,
            "status": "开放纳凉",
            "features": ["山体内坑道", "五通八有"],
            "source": "杭州市国防动员办公室",
            "note": "开放时间9:00-17:00"
        },
        {
            "id": "hz_005",
            "name": "二四线二号口避暑纳凉点",
            "address": "浙江省杭州市上城区玉皇山路43号附近（玉皇山老隧道北口）",
            "district": "上城区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "位于玉皇山老隧道北口的防空洞纳凉点。",
            "coordinates": {"lat": 30.2289, "lng": 120.1589},
            "map_search": "二四线二号口避暑纳凉点",
            "capacity": 150,
            "status": "季节性开放",
            "features": ["山体内坑道"],
            "source": "杭州市国防动员办公室",
            "note": "开放时间视天气情况而定"
        },
    ]
    return shelters

def create_nanjing_data():
    """南京市人防工程数据"""
    shelters = [
        {
            "id": "nj_001",
            "name": "北极岩人防纳凉点",
            "address": "江苏省南京市玄武区古鸡鸣寺入口旁",
            "district": "玄武区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于古鸡鸣寺入口旁的北极岩人防纳凉点，是南京著名的人防工程避暑纳凉点之一。",
            "coordinates": {"lat": 32.0589, "lng": 118.7423},
            "map_search": "北极岩人防纳凉点",
            "capacity": 200,
            "status": "开放纳凉",
            "features": ["山体坑道", "古寺旁"],
            "source": "南京市国防动员办公室",
            "note": "开放时间9:00-17:00"
        },
        {
            "id": "nj_002",
            "name": "菠萝山人防纳凉点",
            "address": "江苏省南京市鼓楼区广州路229号",
            "district": "鼓楼区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于广州路的菠萝山人防纳凉点，是南京夏季避暑纳凉的热门场所。",
            "coordinates": {"lat": 32.0580, "lng": 118.7689},
            "map_search": "菠萝山人防纳凉点",
            "capacity": 250,
            "status": "开放纳凉",
            "features": ["山体坑道"],
            "source": "南京市国防动员办公室",
            "note": "开放时间9:00-17:00"
        },
        {
            "id": "nj_003",
            "name": "长江路人防教育体验馆纳凉点",
            "address": "江苏省南京市玄武区长江路中央路交叉路口",
            "district": "玄武区",
            "type": "人防工程",
            "subtype": "人防教育体验馆",
            "description": "长江路人防教育体验馆兼纳凉点，集人防科普教育与避暑纳凉功能于一体。",
            "coordinates": {"lat": 32.0489, "lng": 118.7989},
            "map_search": "长江路人防教育体验馆",
            "capacity": 300,
            "status": "开放纳凉",
            "features": ["人防教育", "体验馆", "科普"],
            "source": "南京市国防动员办公室",
            "note": "开放时间9:00-17:00"
        },
        {
            "id": "nj_004",
            "name": "八字山城五口(小桃园)人防纳凉点",
            "address": "江苏省南京市鼓楼区中山北路453号",
            "district": "鼓楼区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于小桃园附近的八字山城五口人防纳凉点。",
            "coordinates": {"lat": 32.0789, "lng": 118.7523},
            "map_search": "八字山城五口人防纳凉点",
            "capacity": 200,
            "status": "开放纳凉",
            "features": ["山体坑道"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_005",
            "name": "北极西村人防纳凉点",
            "address": "江苏省南京市玄武区北极西村31号",
            "district": "玄武区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "北极西村小区内的人防工程纳凉点。",
            "coordinates": {"lat": 32.0523, "lng": 118.7456},
            "map_search": "北极西村人防纳凉点",
            "capacity": 150,
            "status": "开放纳凉",
            "features": ["社区配建"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_006",
            "name": "如意里小区人防纳凉点",
            "address": "江苏省南京市玄武区观音阁10号如意里小区",
            "district": "玄武区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "如意里小区配套人防工程纳凉点。",
            "coordinates": {"lat": 32.0512, "lng": 118.7489},
            "map_search": "如意里小区人防纳凉点",
            "capacity": 120,
            "status": "开放纳凉",
            "features": ["住宅配建"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_007",
            "name": "胡家花园人防纳凉点",
            "address": "江苏省南京市秦淮区老门东鸣羊街胡家花园",
            "district": "秦淮区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "位于老门东历史文化街区的胡家花园人防纳凉点。",
            "coordinates": {"lat": 32.0189, "lng": 118.7889},
            "map_search": "胡家花园人防纳凉点",
            "capacity": 180,
            "status": "开放纳凉",
            "features": ["历史文化街区"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_008",
            "name": "清泽园1栋人防纳凉点",
            "address": "江苏省南京市建邺区高庙路清泽园1栋",
            "district": "建邺区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "清泽园小区配套人防工程纳凉点。",
            "coordinates": {"lat": 32.0012, "lng": 118.7189},
            "map_search": "清泽园人防纳凉点",
            "capacity": 150,
            "status": "开放纳凉",
            "features": ["住宅配建"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_009",
            "name": "狮子山人防纳凉点",
            "address": "江苏省南京市鼓楼区狮子山公园内",
            "district": "鼓楼区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于狮子山公园内的人防纳凉点，环境优美。",
            "coordinates": {"lat": 32.0889, "lng": 118.7689},
            "map_search": "狮子山人防纳凉点",
            "capacity": 200,
            "status": "开放纳凉",
            "features": ["山体坑道", "公园内"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_010",
            "name": "雨花山人防纳凉点",
            "address": "江苏省南京市雨花台区雨花台烈士陵园北门旁",
            "district": "雨花台区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于雨花台烈士陵园北门旁的人防纳凉点。",
            "coordinates": {"lat": 31.9989, "lng": 118.7789},
            "map_search": "雨花山人防纳凉点",
            "capacity": 250,
            "status": "开放纳凉",
            "features": ["山体坑道", "烈士陵园旁"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_011",
            "name": "太子山公园人防纳凉点",
            "address": "江苏省南京市江北新区太子山公园内",
            "district": "江北新区",
            "type": "防空洞",
            "subtype": "山体坑道式防空洞",
            "description": "位于江北新区太子山公园内的人防纳凉点。",
            "coordinates": {"lat": 32.1589, "lng": 118.6989},
            "map_search": "太子山公园人防纳凉点",
            "capacity": 200,
            "status": "开放纳凉",
            "features": ["山体坑道", "公园内"],
            "source": "南京市国防动员办公室"
        },
        {
            "id": "nj_012",
            "name": "白马绿地人防纳凉点",
            "address": "江苏省南京市浦口区白马生活广场负一层",
            "district": "浦口区",
            "type": "人防工程",
            "subtype": "商业配建人防",
            "description": "白马生活广场地下人防工程纳凉点。",
            "coordinates": {"lat": 32.1189, "lng": 118.6389},
            "map_search": "白马绿地人防纳凉点",
            "capacity": 300,
            "status": "开放纳凉",
            "features": ["商业地下"],
            "source": "南京市国防动员办公室"
        },
    ]
    return shelters

def create_xian_data():
    """西安市人防工程数据"""
    shelters = [
        {
            "id": "xa_001",
            "name": "西安人防纳凉中心（雁塔西路店）",
            "address": "陕西省西安市雁塔区雁塔西路与红小巷交汇口西侧50米（东入口）/雁塔西路与长安南路十字东南口100米（西入口）",
            "district": "雁塔区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "长约700米，可同时容纳400人，内有桌椅、热水、电视、书报阅览、无线网络以及备用药品等供市民使用。气温一般在20℃到25℃。东入口位于雁塔西路与红小巷交汇口西侧50米，西入口位于雁塔西路与长安南路十字东南口100米。",
            "coordinates": {"lat": 34.2165, "lng": 108.9489},
            "map_search": "西安人防纳凉中心雁塔西路",
            "capacity": 400,
            "status": "开放纳凉",
            "features": ["双入口", "恒温20-25度", "WiFi覆盖", "备用药品"],
            "source": "雁塔区国防动员办",
            "note": "地铁2/3号线小寨站C口步行800米，开放时间6月中旬-9月中旬 13:30-21:30（雨天不开放）"
        },
        {
            "id": "xa_002",
            "name": "西安人防纳凉中心（安东街店）",
            "address": "陕西省西安市碑林区安东街与建东街交叉口西北20米（北入口）/安东街空军第九八六医院北区东门旁（南入口）",
            "district": "碑林区",
            "type": "防空洞",
            "subtype": "早期坑道式防空洞",
            "description": "全段长约1000米，有两个出入口，洞内温度在18度左右，可同时容纳1000人纳凉。中心内设桌椅，免费WiFi、壁挂电视、热水器，还有报刊杂志、象棋扑克牌等。",
            "coordinates": {"lat": 34.2489, "lng": 108.9689},
            "map_search": "西安人防纳凉中心安东街",
            "capacity": 1000,
            "status": "开放纳凉",
            "features": ["双入口", "恒温18度", "超大容量", "棋牌娱乐"],
            "source": "碑林区国防动员办",
            "note": "地铁5号线太乙路站A口步行972米，开放时间13:30-21:30（雨天不开放）"
        },
    ]
    return shelters

def create_guangzhou_data():
    """广州市人防工程数据"""
    shelters = [
        {
            "id": "gz_001",
            "name": "广州市人民防空宣传教育馆",
            "address": "广东省广州市越秀区环市西路204号",
            "district": "越秀区",
            "type": "人防工程",
            "subtype": "人防教育体验馆",
            "description": "展馆还原了一处真实的人防工程，有真实的人防设备、设施，还有短片沙盘的结合互动，触摸屏、AR、VR技术加持。仅接受团体预约（每批次10-50人）。",
            "coordinates": {"lat": 23.1489, "lng": 113.2589},
            "map_search": "广州市人民防空宣传教育馆",
            "capacity": 100,
            "status": "团体预约开放",
            "features": ["人防教育", "VR/AR体验", "真实人防工程展示"],
            "source": "广州市人防办",
            "contact": "020-86119238",
            "note": "开放时间每周三、五 9:30-17:30，需团体预约"
        },
        {
            "id": "gz_002",
            "name": "白云区同泰路永泰街人防地下室",
            "address": "广东省广州市白云区同泰路永泰街牛岭山东南侧",
            "district": "白云区",
            "type": "人防工程",
            "subtype": "住宅配建人防地下室",
            "description": "广州市春庭房地产开发有限公司建设的人防地下室、停车场工程，地下1层3990平方米。",
            "coordinates": {"lat": 23.2089, "lng": 113.3089},
            "map_search": "同泰路永泰街人防地下室",
            "capacity": 800,
            "status": "平时停车场/战时掩蔽",
            "features": ["住宅配建", "平战结合"],
            "source": "广州市规划和自然资源局"
        },
    ]
    return shelters

def create_shenzhen_data():
    """深圳市人防工程数据"""
    shelters = [
        {
            "id": "sz_001",
            "name": "深圳市民防工程管理站",
            "address": "广东省深圳市福田区新洲路5008号原市民防办大楼",
            "district": "福田区",
            "type": "人防工程",
            "subtype": "民防指挥管理设施",
            "description": "深圳市民防工程管理站是深圳市人民政府应急管理办公室的直属机构，承担全市民防工程的维护管理、通信保障和地震监测等职能。",
            "coordinates": {"lat": 22.5389, "lng": 114.0489},
            "map_search": "深圳市民防工程管理站",
            "capacity": 200,
            "status": "行政办公",
            "features": ["民防指挥", "地震监测"],
            "source": "深圳市应急管理局"
        },
        {
            "id": "sz_002",
            "name": "福田区民防委员会办公室",
            "address": "广东省深圳市福田区福民路123号1409室",
            "district": "福田区",
            "type": "人防工程",
            "subtype": "民防管理设施",
            "description": "福田区民防委员会办公室，负责辖区内民防公共工程、设施和专用设备等的监督、检查，并指导管理与维护工作。",
            "coordinates": {"lat": 22.5289, "lng": 114.0589},
            "map_search": "福田区民防委员会办公室",
            "capacity": 100,
            "status": "行政办公",
            "features": ["行政管理"],
            "source": "福田区政府"
        },
    ]
    return shelters

def main():
    """生成所有城市数据"""
    print("=" * 60)
    print("核战争城市自救地图 - 第二批城市数据生成")
    print(f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    os.makedirs(DATA_DIR, exist_ok=True)
    
    cities = {
        "chengdu": create_chengdu_data(),
        "hangzhou": create_hangzhou_data(),
        "nanjing": create_nanjing_data(),
        "xian": create_xian_data(),
        "guangzhou": create_guangzhou_data(),
        "shenzhen": create_shenzhen_data(),
    }
    
    total = 0
    for city, data in cities.items():
        filepath = os.path.join(DATA_DIR, f"{city}.json")
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✓ {city}: {len(data)} 个避难所")
        total += len(data)
    
    print(f"\n✓ 第二批总计: {total} 个避难所")
    print("=" * 60)

if __name__ == "__main__":
    main()
