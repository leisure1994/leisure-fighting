// 地下避难所/人防工程数据
// 基于公开信息收集 - 地铁站、地下商场、人防工程等

const SHELTERS_DATA = {
    // 北京 - 主要地铁站及人防工程
    beijing: [
        // 地铁站 (深埋站台具备防护能力)
        { name: '西直门地铁站', type: 'metro', lat: 39.9408, lng: 116.3563, address: '西城区西直门外大街', gaodeName: '西直门地铁站', capacity: '5000+' },
        { name: '东直门地铁站', type: 'metro', lat: 39.9425, lng: 116.4321, address: '东城区东直门外大街', gaodeName: '东直门地铁站', capacity: '5000+' },
        { name: '国贸地铁站', type: 'metro', lat: 39.9093, lng: 116.4580, address: '朝阳区建国门外大街', gaodeName: '国贸地铁站', capacity: '5000+' },
        { name: '复兴门地铁站', type: 'metro', lat: 39.9073, lng: 116.3569, address: '西城区复兴门内大街', gaodeName: '复兴门地铁站', capacity: '5000+' },
        { name: '建国门地铁站', type: 'metro', lat: 39.9085, lng: 116.4355, address: '东城区建国门内大街', gaodeName: '建国门地铁站', capacity: '5000+' },
        { name: '天安门西地铁站', type: 'metro', lat: 39.9078, lng: 116.3913, address: '西城区天安门西侧', gaodeName: '天安门西地铁站', capacity: '3000+' },
        { name: '天安门东地铁站', type: 'metro', lat: 39.9078, lng: 116.4033, address: '东城区天安门东侧', gaodeName: '天安门东地铁站', capacity: '3000+' },
        { name: '王府井地铁站', type: 'metro', lat: 39.9109, lng: 116.4114, address: '东城区王府井大街', gaodeName: '王府井地铁站', capacity: '4000+' },
        { name: '西单地铁站', type: 'metro', lat: 39.9076, lng: 116.3739, address: '西城区西单北大街', gaodeName: '西单地铁站', capacity: '5000+' },
        { name: '北京站地铁站', type: 'metro', lat: 39.9045, lng: 116.4212, address: '东城区北京站前街', gaodeName: '北京站地铁站', capacity: '5000+' },
        { name: '北京西站地铁站', type: 'metro', lat: 39.8945, lng: 116.3220, address: '丰台区北京西站', gaodeName: '北京西站地铁站', capacity: '8000+' },
        { name: '北京南站地铁站', type: 'metro', lat: 39.8658, lng: 116.3787, address: '丰台区北京南站', gaodeName: '北京南站地铁站', capacity: '8000+' },
        { name: '西二旗地铁站', type: 'metro', lat: 40.0529, lng: 116.3066, address: '海淀区西二旗大街', gaodeName: '西二旗地铁站', capacity: '3000+' },
        { name: '三元桥地铁站', type: 'metro', lat: 39.9603, lng: 116.4495, address: '朝阳区三元桥', gaodeName: '三元桥地铁站', capacity: '3000+' },
        { name: '呼家楼地铁站', type: 'metro', lat: 39.9235, lng: 116.4604, address: '朝阳区呼家楼', gaodeName: '呼家楼地铁站', capacity: '3000+' },
        { name: '望京西地铁站', type: 'metro', lat: 39.9978, lng: 116.4468, address: '朝阳区望京西路', gaodeName: '望京西地铁站', capacity: '3000+' },
        { name: '五棵松地铁站', type: 'metro', lat: 39.9074, lng: 116.2742, address: '海淀区复兴路五棵松', gaodeName: '五棵松地铁站', capacity: '3000+' },
        { name: '军事博物馆地铁站', type: 'metro', lat: 39.9076, lng: 116.3212, address: '海淀区复兴路军事博物馆', gaodeName: '军事博物馆地铁站', capacity: '3000+' },
        { name: '中关村地铁站', type: 'metro', lat: 39.9845, lng: 116.3155, address: '海淀区中关村大街', gaodeName: '中关村地铁站', capacity: '3000+' },
        { name: '奥林匹克公园地铁站', type: 'metro', lat: 40.0005, lng: 116.3912, address: '朝阳区奥林匹克公园', gaodeName: '奥林匹克公园地铁站', capacity: '4000+' },
        
        // 地下商场
        { name: '西单大悦城地下', type: 'mall', lat: 39.9108, lng: 116.3735, address: '西城区西单北大街131号', gaodeName: '西单大悦城', capacity: '3000' },
        { name: '国贸商城地下', type: 'mall', lat: 39.9096, lng: 116.4590, address: '朝阳区建国门外大街1号', gaodeName: '国贸商城', capacity: '5000' },
        { name: '东方新天地地下', type: 'mall', lat: 39.9105, lng: 116.4125, address: '东城区东长安街1号', gaodeName: '东方新天地', capacity: '4000' },
        { name: '王府井百货地下', type: 'mall', lat: 39.9112, lng: 116.4105, address: '东城区王府井大街255号', gaodeName: '王府井百货大楼', capacity: '2000' },
        { name: '三里屯太古里地下', type: 'mall', lat: 39.9350, lng: 116.4550, address: '朝阳区三里屯路19号', gaodeName: '三里屯太古里', capacity: '2000' },
        { name: '朝阳大悦城地下', type: 'mall', lat: 39.9245, lng: 116.5180, address: '朝阳区朝阳北路101号', gaodeName: '朝阳大悦城', capacity: '4000' },
        { name: '万达广场CBD地下', type: 'mall', lat: 39.9140, lng: 116.4730, address: '朝阳区建国路88号', gaodeName: '万达广场', capacity: '3000' },
        { name: '金融街购物中心地下', type: 'mall', lat: 39.9150, lng: 116.3610, address: '西城区金城坊街2号', gaodeName: '金融街购物中心', capacity: '2500' },
        { name: 'APM地下商场', type: 'mall', lat: 39.9110, lng: 116.4120, address: '东城区王府井大街138号', gaodeName: '北京apm', capacity: '2500' },
        
        // 人防工程/防空洞
        { name: '复兴门人防工程', type: 'bunker', lat: 39.9075, lng: 116.3575, address: '西城区复兴门桥区', gaodeName: '复兴门桥', capacity: '2000' },
        { name: '建国门人防工程', type: 'bunker', lat: 39.9085, lng: 116.4350, address: '东城区建国门桥区', gaodeName: '建国门桥', capacity: '2000' },
        { name: '和平里人防工程', type: 'bunker', lat: 39.9500, lng: 116.4180, address: '东城区和平里地区', gaodeName: '和平里', capacity: '1500' },
        { name: '中关村地下人防', type: 'bunker', lat: 39.9850, lng: 116.3150, address: '海淀区中关村核心区', gaodeName: '中关村广场', capacity: '3000' },
        { name: '亚运村地下人防', type: 'bunker', lat: 39.9850, lng: 116.3950, address: '朝阳区亚运村地区', gaodeName: '亚运村', capacity: '2500' },
        { name: '公主坟人防工程', type: 'bunker', lat: 39.9075, lng: 116.3050, address: '海淀区公主坟桥区', gaodeName: '公主坟', capacity: '1500' },
        
        // 大型地下车库 (具备一定防护能力)
        { name: '北京站地下车库', type: 'parking', lat: 39.9048, lng: 116.4215, address: '东城区北京站', gaodeName: '北京站', capacity: '500' },
        { name: '北京西站南广场车库', type: 'parking', lat: 39.8935, lng: 116.3230, address: '丰台区北京西站', gaodeName: '北京西站南广场', capacity: '800' },
        { name: '首都机场T3车库', type: 'parking', lat: 40.0520, lng: 116.6100, address: '顺义区首都机场T3', gaodeName: '首都机场T3航站楼', capacity: '1000' },
        { name: '国贸地下停车场', type: 'parking', lat: 39.9095, lng: 116.4595, address: '朝阳区国贸商城', gaodeName: '国贸商城地下停车场', capacity: '600' },
        { name: '西单地下停车场', type: 'parking', lat: 39.9080, lng: 116.3740, address: '西城区西单', gaodeName: '西单地下停车场', capacity: '400' },
        { name: '中关村广场车库', type: 'parking', lat: 39.9840, lng: 116.3140, address: '海淀区中关村广场', gaodeName: '中关村广场购物中心', capacity: '500' }
    ],

    // 上海
    shanghai: [
        { name: '人民广场地铁站', type: 'metro', lat: 31.2317, lng: 121.4690, address: '黄浦区人民广场', gaodeName: '人民广场地铁站', capacity: '10000+' },
        { name: '陆家嘴地铁站', type: 'metro', lat: 31.2397, lng: 121.4998, address: '浦东新区陆家嘴', gaodeName: '陆家嘴地铁站', capacity: '6000+' },
        { name: '南京东路地铁站', type: 'metro', lat: 31.2373, lng: 121.4815, address: '黄浦区南京东路', gaodeName: '南京东路地铁站', capacity: '5000+' },
        { name: '静安寺地铁站', type: 'metro', lat: 31.2235, lng: 121.4465, address: '静安区静安寺', gaodeName: '静安寺地铁站', capacity: '5000+' },
        { name: '徐家汇地铁站', type: 'metro', lat: 31.1955, lng: 121.4375, address: '徐汇区徐家汇', gaodeName: '徐家汇地铁站', capacity: '6000+' },
        { name: '虹桥火车站地铁站', type: 'metro', lat: 31.1955, lng: 121.3225, address: '闵行区虹桥火车站', gaodeName: '虹桥火车站地铁站', capacity: '10000+' },
        { name: '上海火车站地铁站', type: 'metro', lat: 31.2490, lng: 121.4560, address: '静安区上海火车站', gaodeName: '上海火车站地铁站', capacity: '8000+' },
        { name: '世纪大道地铁站', type: 'metro', lat: 31.2285, lng: 121.5265, address: '浦东新区世纪大道', gaodeName: '世纪大道地铁站', capacity: '6000+' },
        { name: '龙阳路地铁站', type: 'metro', lat: 31.2035, lng: 121.5575, address: '浦东新区龙阳路', gaodeName: '龙阳路地铁站', capacity: '5000+' },
        { name: '中山公园地铁站', type: 'metro', lat: 31.2185, lng: 121.4075, address: '长宁区中山公园', gaodeName: '中山公园地铁站', capacity: '5000+' },
        { name: '陕西南路地铁站', type: 'metro', lat: 31.2165, lng: 121.4575, address: '黄浦区陕西南路', gaodeName: '陕西南路地铁站', capacity: '5000+' },
        { name: '黄陂南路地铁站', type: 'metro', lat: 31.2235, lng: 121.4725, address: '黄浦区黄陂南路', gaodeName: '黄陂南路地铁站', capacity: '4000+' },
        { name: '南京西路地铁站', type: 'metro', lat: 31.2295, lng: 121.4575, address: '静安区南京西路', gaodeName: '南京西路地铁站', capacity: '4000+' },
        { name: '常熟路地铁站', type: 'metro', lat: 31.2165, lng: 121.4475, address: '徐汇区常熟路', gaodeName: '常熟路地铁站', capacity: '3000+' },
        { name: '打浦桥地铁站', type: 'metro', lat: 31.2085, lng: 121.4675, address: '黄浦区打浦桥', gaodeName: '打浦桥地铁站', capacity: '3000+' },
        
        { name: '正大广场地下', type: 'mall', lat: 31.2390, lng: 121.4980, address: '浦东新区陆家嘴西路168号', gaodeName: '正大广场', capacity: '5000' },
        { name: '环球港地下商场', type: 'mall', lat: 31.2310, lng: 121.4120, address: '普陀区中山北路3300号', gaodeName: '月星环球港', capacity: '6000' },
        { name: '港汇恒隆广场地下', type: 'mall', lat: 31.1960, lng: 121.4370, address: '徐汇区虹桥路1号', gaodeName: '港汇恒隆广场', capacity: '4000' },
        { name: '来福士广场地下', type: 'mall', lat: 31.2230, lng: 121.4720, address: '黄浦区西藏中路268号', gaodeName: '上海来福士广场', capacity: '3000' },
        { name: '新世界城地下', type: 'mall', lat: 31.2340, lng: 121.4750, address: '黄浦区南京西路2-68号', gaodeName: '新世界城', capacity: '4000' },
        { name: '恒隆广场地下', type: 'mall', lat: 31.2280, lng: 121.4560, address: '静安区南京西路1266号', gaodeName: '上海恒隆广场', capacity: '3000' },
        { name: 'IFC国金中心地下', type: 'mall', lat: 31.2380, lng: 121.5010, address: '浦东新区世纪大道8号', gaodeName: '上海国金中心商场', capacity: '4000' },
        
        { name: '人民广场地下通道人防', type: 'bunker', lat: 31.2320, lng: 121.4700, address: '黄浦区人民广场地下', gaodeName: '人民广场', capacity: '5000' },
        { name: '外滩地下通道人防', type: 'bunker', lat: 31.2370, lng: 121.4850, address: '黄浦区外滩', gaodeName: '外滩', capacity: '3000' },
        { name: '陆家嘴地下人防', type: 'bunker', lat: 31.2400, lng: 121.5000, address: '浦东新区陆家嘴核心区', gaodeName: '陆家嘴', capacity: '4000' }
    ],

    // 广州
    guangzhou: [
        { name: '体育西路地铁站', type: 'metro', lat: 23.1350, lng: 113.3180, address: '天河区体育西路', gaodeName: '体育西路地铁站', capacity: '6000+' },
        { name: '珠江新城地铁站', type: 'metro', lat: 23.1200, lng: 113.3250, address: '天河区珠江新城', gaodeName: '珠江新城地铁站', capacity: '6000+' },
        { name: '广州火车站地铁站', type: 'metro', lat: 23.1480, lng: 113.2570, address: '越秀区广州火车站', gaodeName: '广州火车站地铁站', capacity: '8000+' },
        { name: '广州南站地铁站', type: 'metro', lat: 22.9910, lng: 113.2700, address: '番禺区广州南站', gaodeName: '广州南站地铁站', capacity: '10000+' },
        { name: '公园前地铁站', type: 'metro', lat: 23.1250, lng: 113.2650, address: '越秀区公园前', gaodeName: '公园前地铁站', capacity: '6000+' },
        { name: '天河客运站地铁站', type: 'metro', lat: 23.1750, lng: 113.3450, address: '天河区天河客运站', gaodeName: '天河客运站地铁站', capacity: '5000+' },
        { name: '客村地铁站', type: 'metro', lat: 23.0950, lng: 113.3200, address: '海珠区客村', gaodeName: '客村地铁站', capacity: '4000+' },
        { name: '车陂南地铁站', type: 'metro', lat: 23.1150, lng: 113.3850, address: '天河区车陂南', gaodeName: '车陂南地铁站', capacity: '4000+' },
        { name: '万胜围地铁站', type: 'metro', lat: 23.0950, lng: 113.3850, address: '海珠区万胜围', gaodeName: '万胜围地铁站', capacity: '4000+' },
        { name: '琶洲地铁站', type: 'metro', lat: 23.1000, lng: 113.3650, address: '海珠区琶洲', gaodeName: '琶洲地铁站', capacity: '3000+' },
        
        { name: '天河城地下', type: 'mall', lat: 23.1350, lng: 113.3200, address: '天河区天河路208号', gaodeName: '天河城', capacity: '5000' },
        { name: '正佳广场地下', type: 'mall', lat: 23.1355, lng: 113.3220, address: '天河区天河路228号', gaodeName: '正佳广场', capacity: '6000' },
        { name: '太古汇地下', type: 'mall', lat: 23.1330, lng: 113.3280, address: '天河区天河路383号', gaodeName: '太古汇', capacity: '4000' },
        { name: '花城汇地下商场', type: 'mall', lat: 23.1200, lng: 113.3250, address: '天河区珠江新城花城广场', gaodeName: '花城汇', capacity: '3000' },
        { name: '中华广场地下', type: 'mall', lat: 23.1250, lng: 113.2800, address: '越秀区中山三路33号', gaodeName: '中华广场', capacity: '4000' },
        { name: '北京路天河城地下', type: 'mall', lat: 23.1200, lng: 113.2700, address: '越秀区北京路168号', gaodeName: '北京路天河城', capacity: '3000' },
        
        { name: '英雄广场地下人防', type: 'bunker', lat: 23.1350, lng: 113.2850, address: '越秀区英雄广场地下', gaodeName: '英雄广场', capacity: '2000' },
        { name: '海珠广场地下人防', type: 'bunker', lat: 23.1150, lng: 113.2650, address: '越秀区海珠广场', gaodeName: '海珠广场', capacity: '2500' }
    ],

    // 深圳
    shenzhen: [
        { name: '罗湖地铁站', type: 'metro', lat: 22.5310, lng: 114.1180, address: '罗湖区罗湖火车站', gaodeName: '罗湖地铁站', capacity: '8000+' },
        { name: '福田地铁站', type: 'metro', lat: 22.5430, lng: 114.0570, address: '福田区福田中心区', gaodeName: '福田地铁站', capacity: '6000+' },
        { name: '深圳北站地铁站', type: 'metro', lat: 22.6090, lng: 114.0320, address: '龙华区深圳北站', gaodeName: '深圳北站地铁站', capacity: '10000+' },
        { name: '会展中心地铁站', type: 'metro', lat: 22.5400, lng: 114.0570, address: '福田区会展中心', gaodeName: '会展中心地铁站', capacity: '5000+' },
        { name: '购物公园地铁站', type: 'metro', lat: 22.5380, lng: 114.0550, address: '福田区购物公园', gaodeName: '购物公园地铁站', capacity: '5000+' },
        { name: '车公庙地铁站', type: 'metro', lat: 22.5400, lng: 114.0250, address: '福田区车公庙', gaodeName: '车公庙地铁站', capacity: '6000+' },
        { name: '世界之窗地铁站', type: 'metro', lat: 22.5400, lng: 113.9750, address: '南山区世界之窗', gaodeName: '世界之窗地铁站', capacity: '4000+' },
        { name: '桃园地铁站', type: 'metro', lat: 22.5320, lng: 113.9300, address: '南山区桃园', gaodeName: '桃园地铁站', capacity: '3000+' },
        { name: '宝安中心地铁站', type: 'metro', lat: 22.5550, lng: 113.8880, address: '宝安区宝安中心', gaodeName: '宝安中心地铁站', capacity: '4000+' },
        
        { name: '万象城地下', type: 'mall', lat: 22.5400, lng: 114.1100, address: '罗湖区宝安南路1881号', gaodeName: '深圳万象城', capacity: '5000' },
        { name: 'COCO Park地下', type: 'mall', lat: 22.5380, lng: 114.0550, address: '福田区福华三路269号', gaodeName: '星河COCO Park', capacity: '4000' },
        { name: '壹方城地下', type: 'mall', lat: 22.5550, lng: 113.8880, address: '宝安区新湖路99号', gaodeName: '壹方城', capacity: '6000' },
        { name: '海岸城地下', type: 'mall', lat: 22.5150, lng: 113.9400, address: '南山区文心五路33号', gaodeName: '海岸城', capacity: '4000' },
        { name: '益田假日广场地下', type: 'mall', lat: 22.5350, lng: 113.9750, address: '南山区深南大道9028号', gaodeName: '益田假日广场', capacity: '3000' }
    ],

    // 成都
    chengdu: [
        { name: '天府广场地铁站', type: 'metro', lat: 30.6570, lng: 104.0650, address: '青羊区天府广场', gaodeName: '天府广场地铁站', capacity: '8000+' },
        { name: '春熙路地铁站', type: 'metro', lat: 30.6560, lng: 104.0800, address: '锦江区春熙路', gaodeName: '春熙路地铁站', capacity: '5000+' },
        { name: '成都东站地铁站', type: 'metro', lat: 30.6300, lng: 104.1450, address: '成华区成都东站', gaodeName: '成都东站地铁站', capacity: '8000+' },
        { name: '火车南站地铁站', type: 'metro', lat: 30.6030, lng: 104.0650, address: '武侯区火车南站', gaodeName: '火车南站地铁站', capacity: '6000+' },
        { name: '犀浦地铁站', type: 'metro', lat: 30.7350, lng: 103.9780, address: '郫都区犀浦', gaodeName: '犀浦地铁站', capacity: '4000+' },
        { name: '中医大省医院地铁站', type: 'metro', lat: 30.6700, lng: 104.0500, address: '青羊区中医大省医院', gaodeName: '中医大省医院地铁站', capacity: '4000+' },
        { name: '市二医院地铁站', type: 'metro', lat: 30.6680, lng: 104.0850, address: '锦江区市二医院', gaodeName: '市二医院地铁站', capacity: '3000+' },
        
        { name: 'IFS国际金融中心地下', type: 'mall', lat: 30.6560, lng: 104.0820, address: '锦江区红星路三段1号', gaodeName: '成都IFS', capacity: '5000' },
        { name: '太古里地下商场', type: 'mall', lat: 30.6550, lng: 104.0800, address: '锦江区中纱帽街8号', gaodeName: '成都远洋太古里', capacity: '4000' },
        { name: '王府井百货地下', type: 'mall', lat: 30.6550, lng: 104.0780, address: '锦江区总府路15号', gaodeName: '王府井百货', capacity: '3000' },
        { name: '群光广场地下', type: 'mall', lat: 30.6570, lng: 104.0820, address: '锦江区春熙路南段8号', gaodeName: '群光广场', capacity: '3000' }
    ],

    // 重庆
    chongqing: [
        { name: '解放碑地铁站', type: 'metro', lat: 29.5620, lng: 106.5730, address: '渝中区解放碑', gaodeName: '解放碑地铁站', capacity: '5000+' },
        { name: '较场口地铁站', type: 'metro', lat: 29.5550, lng: 106.5700, address: '渝中区较场口', gaodeName: '较场口地铁站', capacity: '5000+' },
        { name: '小什字地铁站', type: 'metro', lat: 29.5600, lng: 106.5850, address: '渝中区小什字', gaodeName: '小什字地铁站', capacity: '4000+' },
        { name: '观音桥地铁站', type: 'metro', lat: 29.5750, lng: 106.5350, address: '江北区观音桥', gaodeName: '观音桥地铁站', capacity: '6000+' },
        { name: '沙坪坝地铁站', type: 'metro', lat: 29.5600, lng: 106.4550, address: '沙坪坝区沙坪坝', gaodeName: '沙坪坝地铁站', capacity: '5000+' },
        { name: '重庆北站地铁站', type: 'metro', lat: 29.6050, lng: 106.5550, address: '渝北区重庆北站', gaodeName: '重庆北站地铁站', capacity: '8000+' },
        { name: '两路口地铁站', type: 'metro', lat: 29.5550, lng: 106.5450, address: '渝中区两路口', gaodeName: '两路口地铁站', capacity: '4000+' },
        { name: '牛角沱地铁站', type: 'metro', lat: 29.5650, lng: 106.5450, address: '渝中区牛角沱', gaodeName: '牛角沱地铁站', capacity: '3000+' },
        
        { name: '解放碑地下商场', type: 'mall', lat: 29.5620, lng: 106.5730, address: '渝中区解放碑商圈', gaodeName: '解放碑步行街', capacity: '3000' },
        { name: '观音桥步行街地下', type: 'mall', lat: 29.5750, lng: 106.5350, address: '江北区观音桥商圈', gaodeName: '观音桥步行街', capacity: '4000' },
        { name: '三峡广场地下', type: 'mall', lat: 29.5600, lng: 106.4550, address: '沙坪坝区三峡广场', gaodeName: '三峡广场', capacity: '3000' },
        
        { name: '重庆地下防空洞群(山城步道)', type: 'bunker', lat: 29.5600, lng: 106.5750, address: '渝中区山城步道沿线', gaodeName: '山城步道', capacity: '5000' }
    ],

    // 杭州
    hangzhou: [
        { name: '龙翔桥地铁站', type: 'metro', lat: 30.2570, lng: 120.1650, address: '上城区龙翔桥', gaodeName: '龙翔桥地铁站', capacity: '5000+' },
        { name: '凤起路地铁站', type: 'metro', lat: 30.2700, lng: 120.1650, address: '下城区凤起路', gaodeName: '凤起路地铁站', capacity: '4000+' },
        { name: '龙安地铁站', type: 'metro', lat: 30.3300, lng: 120.3000, address: '余杭区龙安', gaodeName: '龙安地铁站', capacity: '3000+' },
        { name: '杭州东站地铁站', type: 'metro', lat: 30.2900, lng: 120.2150, address: '江干区杭州东站', gaodeName: '火车东站地铁站', capacity: '8000+' },
        { name: '钱江路地铁站', type: 'metro', lat: 30.2500, lng: 120.2150, address: '江干区钱江路', gaodeName: '钱江路地铁站', capacity: '4000+' },
        { name: '近江地铁站', type: 'metro', lat: 30.2300, lng: 120.2050, address: '上城区近江', gaodeName: '近江地铁站', capacity: '3000+' },
        { name: '西湖文化广场地铁站', type: 'metro', lat: 30.2800, lng: 120.1650, address: '下城区西湖文化广场', gaodeName: '西湖文化广场地铁站', capacity: '4000+' },
        
        { name: '湖滨银泰in77地下', type: 'mall', lat: 30.2570, lng: 120.1650, address: '上城区延安路258号', gaodeName: '湖滨银泰in77', capacity: '4000' },
        { name: '杭州大厦地下', type: 'mall', lat: 30.2700, lng: 120.1650, address: '下城区武林广场1号', gaodeName: '杭州大厦', capacity: '3000' },
        { name: '万象城地下', type: 'mall', lat: 30.2500, lng: 120.2150, address: '江干区富春路701号', gaodeName: '杭州万象城', capacity: '4000' },
        { name: '嘉里中心地下', type: 'mall', lat: 30.2600, lng: 120.1650, address: '下城区延安路385号', gaodeName: '杭州嘉里中心', capacity: '3000' }
    ],

    // 武汉
    wuhan: [
        { name: '汉口火车站地铁站', type: 'metro', lat: 30.6100, lng: 114.2550, address: '江汉区汉口火车站', gaodeName: '汉口火车站地铁站', capacity: '8000+' },
        { name: '武汉火车站地铁站', type: 'metro', lat: 30.6050, lng: 114.4200, address: '洪山区武汉火车站', gaodeName: '武汉火车站地铁站', capacity: '8000+' },
        { name: '江汉路地铁站', type: 'metro', lat: 30.5900, lng: 114.2900, address: '江汉区江汉路', gaodeName: '江汉路地铁站', capacity: '5000+' },
        { name: '洪山广场地铁站', type: 'metro', lat: 30.5450, lng: 114.3350, address: '武昌区洪山广场', gaodeName: '洪山广场地铁站', capacity: '5000+' },
        { name: '中南路地铁站', type: 'metro', lat: 30.5350, lng: 114.3300, address: '武昌区中南路', gaodeName: '中南路地铁站', capacity: '4000+' },
        { name: '街道口地铁站', type: 'metro', lat: 30.5250, lng: 114.3500, address: '洪山区街道口', gaodeName: '街道口地铁站', capacity: '4000+' },
        { name: '光谷广场地铁站', type: 'metro', lat: 30.5050, lng: 114.4000, address: '洪山区光谷广场', gaodeName: '光谷广场地铁站', capacity: '5000+' },
        
        { name: '武商MALL地下', type: 'mall', lat: 30.5900, lng: 114.2700, address: '江汉区解放大道688号', gaodeName: '武商MALL', capacity: '5000' },
        { name: '江汉路步行街地下', type: 'mall', lat: 30.5900, lng: 114.2900, address: '江汉区江汉路', gaodeName: '江汉路步行街', capacity: '3000' },
        { name: '楚河汉街地下', type: 'mall', lat: 30.5550, lng: 114.3450, address: '武昌区楚河汉街', gaodeName: '楚河汉街', capacity: '3000' },
        { name: '武汉天地地下', type: 'mall', lat: 30.6050, lng: 114.3050, address: '江岸区中山大道1622号', gaodeName: '武汉天地', capacity: '2500' }
    ],

    // 西安
    xian: [
        { name: '北客站地铁站', type: 'metro', lat: 34.3800, lng: 108.9350, address: '未央区北客站', gaodeName: '北客站地铁站', capacity: '8000+' },
        { name: '钟楼地铁站', type: 'metro', lat: 34.2650, lng: 108.9450, address: '碑林区钟楼', gaodeName: '钟楼地铁站', capacity: '5000+' },
        { name: '北大街地铁站', type: 'metro', lat: 34.2750, lng: 108.9450, address: '新城区北大街', gaodeName: '北大街地铁站', capacity: '4000+' },
        { name: '小寨地铁站', type: 'metro', lat: 34.2250, lng: 108.9450, address: '雁塔区小寨', gaodeName: '小寨地铁站', capacity: '6000+' },
        { name: '五路口地铁站', type: 'metro', lat: 34.2750, lng: 108.9700, address: '新城区五路口', gaodeName: '五路口地铁站', capacity: '4000+' },
        { name: '大雁塔地铁站', type: 'metro', lat: 34.2200, lng: 108.9650, address: '雁塔区大雁塔', gaodeName: '大雁塔地铁站', capacity: '4000+' },
        { name: '通化门地铁站', type: 'metro', lat: 34.2800, lng: 109.0100, address: '新城区通化门', gaodeName: '通化门地铁站', capacity: '3000+' },
        
        { name: '开元商城地下', type: 'mall', lat: 34.2650, lng: 108.9450, address: '碑林区钟楼', gaodeName: '开元商城', capacity: '3000' },
        { name: '赛格国际购物中心地下', type: 'mall', lat: 34.2250, lng: 108.9450, address: '雁塔区长安中路123号', gaodeName: '赛格国际购物中心', capacity: '5000' },
        { name: '大悦城地下', type: 'mall', lat: 34.2200, lng: 108.9650, address: '雁塔区慈恩西路67号', gaodeName: '西安大悦城', capacity: '3000' },
        { name: '老城根G park地下', type: 'mall', lat: 34.2900, lng: 108.8900, address: '莲湖区星火路22号', gaodeName: '老城根G park', capacity: '2500' }
    ],

    // 南京
    nanjing: [
        { name: '新街口地铁站', type: 'metro', lat: 32.0450, lng: 118.7850, address: '秦淮区新街口', gaodeName: '新街口地铁站', capacity: '6000+' },
        { name: '南京站地铁站', type: 'metro', lat: 32.0900, lng: 118.7950, address: '玄武区南京站', gaodeName: '南京站地铁站', capacity: '8000+' },
        { name: '南京南站地铁站', type: 'metro', lat: 31.9700, lng: 118.8000, address: '雨花台区南京南站', gaodeName: '南京南站地铁站', capacity: '8000+' },
        { name: '大行宫地铁站', type: 'metro', lat: 32.0450, lng: 118.7950, address: '秦淮区大行宫', gaodeName: '大行宫地铁站', capacity: '4000+' },
        { name: '鼓楼地铁站', type: 'metro', lat: 32.0600, lng: 118.7850, address: '鼓楼区鼓楼', gaodeName: '鼓楼地铁站', capacity: '4000+' },
        { name: '鸡鸣寺地铁站', type: 'metro', lat: 32.0550, lng: 118.7450, address: '玄武区鸡鸣寺', gaodeName: '鸡鸣寺地铁站', capacity: '3000+' },
        
        { name: '德基广场地下', type: 'mall', lat: 32.0450, lng: 118.7850, address: '玄武区中山路18号', gaodeName: '德基广场', capacity: '4000' },
        { name: '新百中心地下', type: 'mall', lat: 32.0450, lng: 118.7850, address: '秦淮区中山南路1号', gaodeName: '南京新百', capacity: '3000' },
        { name: '中央商场地下', type: 'mall', lat: 32.0450, lng: 118.7850, address: '秦淮区中山南路79号', gaodeName: '中央商场', capacity: '3000' },
        { name: '金鹰国际地下', type: 'mall', lat: 32.0400, lng: 118.7800, address: '秦淮区汉中路89号', gaodeName: '金鹰国际购物中心', capacity: '2500' }
    ],

    // 其他城市基础数据结构 (待补充完整)
    tianjin: [
        { name: '天津站地铁站', type: 'metro', lat: 39.1350, lng: 117.2050, address: '河东区天津站', gaodeName: '天津站地铁站', capacity: '8000+' },
        { name: '天津西站地铁站', type: 'metro', lat: 39.1550, lng: 117.1650, address: '红桥区天津西站', gaodeName: '天津西站地铁站', capacity: '6000+' },
        { name: '滨江道地下商场', type: 'mall', lat: 39.1200, lng: 117.1850, address: '和平区滨江道', gaodeName: '滨江道商业街', capacity: '3000' }
    ],

    suzhou: [
        { name: '苏州火车站地铁站', type: 'metro', lat: 31.3300, lng: 120.6100, address: '姑苏区苏州火车站', gaodeName: '苏州火车站地铁站', capacity: '6000+' },
        { name: '东方之门地铁站', type: 'metro', lat: 31.3200, lng: 120.6850, address: '工业园区东方之门', gaodeName: '东方之门地铁站', capacity: '4000+' },
        { name: '观前街地下', type: 'mall', lat: 31.3100, lng: 120.6300, address: '姑苏区观前街', gaodeName: '观前街', capacity: '2000' }
    ],

    changsha: [
        { name: '五一广场地铁站', type: 'metro', lat: 28.1950, lng: 112.9750, address: '芙蓉区五一广场', gaodeName: '五一广场地铁站', capacity: '6000+' },
        { name: '长沙南站地铁站', type: 'metro', lat: 28.1500, lng: 113.0650, address: '雨花区长沙南站', gaodeName: '长沙火车南站地铁站', capacity: '8000+' },
        { name: '黄兴广场地下', type: 'mall', lat: 28.1900, lng: 112.9800, address: '天心区黄兴广场', gaodeName: '黄兴广场', capacity: '3000' }
    ],

    zhengzhou: [
        { name: '郑州东站地铁站', type: 'metro', lat: 34.7550, lng: 113.7700, address: '郑东新区郑州东站', gaodeName: '郑州东站地铁站', capacity: '8000+' },
        { name: '二七广场地铁站', type: 'metro', lat: 34.7550, lng: 113.6650, address: '二七区二七广场', gaodeName: '二七广场地铁站', capacity: '5000+' },
        { name: '大卫城地下', type: 'mall', lat: 34.7550, lng: 113.6650, address: '二七区西太康路', gaodeName: '丹尼斯大卫城', capacity: '4000' }
    ],

    shenyang: [
        { name: '沈阳站地铁站', type: 'metro', lat: 41.8050, lng: 123.4300, address: '和平区沈阳站', gaodeName: '沈阳站地铁站', capacity: '6000+' },
        { name: '中街地铁站', type: 'metro', lat: 41.7950, lng: 123.4600, address: '沈河区中街', gaodeName: '中街地铁站', capacity: '4000+' },
        { name: '太原街地下', type: 'mall', lat: 41.7900, lng: 123.4000, address: '和平区太原街', gaodeName: '太原街', capacity: '2500' }
    ],

    qingdao: [
        { name: '青岛站地铁站', type: 'metro', lat: 36.0650, lng: 120.3050, address: '市南区青岛站', gaodeName: '青岛站地铁站', capacity: '5000+' },
        { name: '五四广场地铁站', type: 'metro', lat: 36.0650, lng: 120.3850, address: '市南区五四广场', gaodeName: '五四广场地铁站', capacity: '4000+' },
        { name: '台东地下商场', type: 'mall', lat: 36.0850, lng: 120.3550, address: '市北区台东', gaodeName: '台东步行街', capacity: '2000' }
    ],

    ningbo: [
        { name: '鼓楼地铁站', type: 'metro', lat: 29.8700, lng: 121.5500, address: '海曙区鼓楼', gaodeName: '鼓楼地铁站', capacity: '4000+' },
        { name: '东门口地铁站', type: 'metro', lat: 29.8700, lng: 121.5600, address: '海曙区东门口', gaodeName: '东门口地铁站', capacity: '3000+' },
        { name: '天一广场地下', type: 'mall', lat: 29.8650, lng: 121.5550, address: '海曙区天一广场', gaodeName: '天一广场', capacity: '3000' }
    ],

    dongguan: [
        { name: '鸿福路地铁站', type: 'metro', lat: 22.9950, lng: 113.7500, address: '南城区鸿福路', gaodeName: '鸿福路地铁站', capacity: '4000+' },
        { name: '东莞火车站地铁站', type: 'metro', lat: 23.0850, lng: 113.6800, address: '石龙镇东莞火车站', gaodeName: '东莞火车站地铁站', capacity: '5000+' },
        { name: '第一国际地下', type: 'mall', lat: 22.9950, lng: 113.7450, address: '南城区第一国际', gaodeName: '第一国际', capacity: '2000' }
    ],

    wuxi: [
        { name: '三阳广场地铁站', type: 'metro', lat: 31.5800, lng: 120.3000, address: '梁溪区三阳广场', gaodeName: '三阳广场地铁站', capacity: '5000+' },
        { name: '无锡火车站地铁站', type: 'metro', lat: 31.5850, lng: 120.2950, address: '梁溪区无锡火车站', gaodeName: '无锡火车站地铁站', capacity: '4000+' },
        { name: '恒隆广场地下', type: 'mall', lat: 31.5800, lng: 120.2950, address: '梁溪区人民中路139号', gaodeName: '无锡恒隆广场', capacity: '2500' }
    ],

    foshan: [
        { name: '祖庙地铁站', type: 'metro', lat: 23.0250, lng: 113.1150, address: '禅城区祖庙', gaodeName: '祖庙地铁站', capacity: '4000+' },
        { name: '千灯湖地铁站', type: 'metro', lat: 23.0450, lng: 113.1350, address: '南海区千灯湖', gaodeName: '千灯湖地铁站', capacity: '3000+' },
        { name: '岭南天地地下', type: 'mall', lat: 23.0250, lng: 113.1150, address: '禅城区岭南天地', gaodeName: '岭南天地', capacity: '2000' }
    ]
};
