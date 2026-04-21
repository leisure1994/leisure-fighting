// ============================================
// 核战争城市自救地图 - 中国城市数据
// ============================================

const CHINA_CITIES = [
    // 直辖市
    { name: '北京', province: '北京', lat: 39.9042, lng: 116.4074, pinyin: 'Beijing', tier: 1 },
    { name: '上海', province: '上海', lat: 31.2304, lng: 121.4737, pinyin: 'Shanghai', tier: 1 },
    { name: '天津', province: '天津', lat: 39.3434, lng: 117.3616, pinyin: 'Tianjin', tier: 1 },
    { name: '重庆', province: '重庆', lat: 29.5630, lng: 106.5516, pinyin: 'Chongqing', tier: 1 },
    
    // 河北省
    { name: '石家庄', province: '河北', lat: 38.0428, lng: 114.5149, pinyin: 'Shijiazhuang', tier: 2 },
    { name: '唐山', province: '河北', lat: 39.6292, lng: 118.1802, pinyin: 'Tangshan', tier: 3 },
    { name: '秦皇岛', province: '河北', lat: 39.9354, lng: 119.5995, pinyin: 'Qinhuangdao', tier: 3 },
    { name: '邯郸', province: '河北', lat: 36.6093, lng: 114.4905, pinyin: 'Handan', tier: 3 },
    { name: '保定', province: '河北', lat: 38.8739, lng: 115.4646, pinyin: 'Baoding', tier: 2 },
    { name: '张家口', province: '河北', lat: 40.7676, lng: 114.8863, pinyin: 'Zhangjiakou', tier: 3 },
    { name: '承德', province: '河北', lat: 40.9510, lng: 117.9328, pinyin: 'Chengde', tier: 3 },
    { name: '廊坊', province: '河北', lat: 39.5380, lng: 116.6837, pinyin: 'Langfang', tier: 3 },
    
    // 山西省
    { name: '太原', province: '山西', lat: 37.8706, lng: 112.5489, pinyin: 'Taiyuan', tier: 2 },
    { name: '大同', province: '山西', lat: 40.0764, lng: 113.3000, pinyin: 'Datong', tier: 3 },
    { name: '长治', province: '山西', lat: 36.1954, lng: 113.1163, pinyin: 'Changzhi', tier: 3 },
    { name: '晋城', province: '山西', lat: 35.4907, lng: 112.8510, pinyin: 'Jincheng', tier: 3 },
    { name: '运城', province: '山西', lat: 35.0263, lng: 111.0070, pinyin: 'Yuncheng', tier: 3 },
    
    // 内蒙古自治区
    { name: '呼和浩特', province: '内蒙古', lat: 40.8414, lng: 111.7519, pinyin: 'Hohhot', tier: 2 },
    { name: '包头', province: '内蒙古', lat: 40.6582, lng: 109.8403, pinyin: 'Baotou', tier: 3 },
    { name: '乌海', province: '内蒙古', lat: 39.6550, lng: 106.7950, pinyin: 'Wuhai', tier: 3 },
    { name: '赤峰', province: '内蒙古', lat: 42.2578, lng: 118.8860, pinyin: 'Chifeng', tier: 3 },
    { name: '通辽', province: '内蒙古', lat: 43.6525, lng: 122.2443, pinyin: 'Tongliao', tier: 3 },
    
    // 辽宁省
    { name: '沈阳', province: '辽宁', lat: 41.8057, lng: 123.4315, pinyin: 'Shenyang', tier: 2 },
    { name: '大连', province: '辽宁', lat: 38.9140, lng: 121.6147, pinyin: 'Dalian', tier: 2 },
    { name: '鞍山', province: '辽宁', lat: 41.1086, lng: 122.9948, pinyin: 'Anshan', tier: 3 },
    { name: '抚顺', province: '辽宁', lat: 41.8809, lng: 123.9572, pinyin: 'Fushun', tier: 3 },
    { name: '本溪', province: '辽宁', lat: 41.4870, lng: 123.7655, pinyin: 'Benxi', tier: 3 },
    { name: '丹东', province: '辽宁', lat: 40.0000, lng: 124.3500, pinyin: 'Dandong', tier: 3 },
    { name: '锦州', province: '辽宁', lat: 41.0951, lng: 121.1266, pinyin: 'Jinzhou', tier: 3 },
    
    // 吉林省
    { name: '长春', province: '吉林', lat: 43.8171, lng: 125.3235, pinyin: 'Changchun', tier: 2 },
    { name: '吉林', province: '吉林', lat: 43.8436, lng: 126.5530, pinyin: 'Jilin', tier: 3 },
    { name: '四平', province: '吉林', lat: 43.1664, lng: 124.3504, pinyin: 'Siping', tier: 3 },
    { name: '通化', province: '吉林', lat: 41.7283, lng: 125.9398, pinyin: 'Tonghua', tier: 3 },
    { name: '白城', province: '吉林', lat: 45.6200, lng: 122.8400, pinyin: 'Baicheng', tier: 3 },
    
    // 黑龙江省
    { name: '哈尔滨', province: '黑龙江', lat: 45.8038, lng: 126.5350, pinyin: 'Harbin', tier: 2 },
    { name: '齐齐哈尔', province: '黑龙江', lat: 47.3543, lng: 123.9182, pinyin: 'Qiqihar', tier: 3 },
    { name: '鸡西', province: '黑龙江', lat: 45.3000, lng: 130.9667, pinyin: 'Jixi', tier: 3 },
    { name: '大庆', province: '黑龙江', lat: 46.5893, lng: 125.1036, pinyin: 'Daqing', tier: 3 },
    { name: '牡丹江', province: '黑龙江', lat: 44.5513, lng: 129.6332, pinyin: 'Mudanjiang', tier: 3 },
    
    // 江苏省
    { name: '南京', province: '江苏', lat: 32.0603, lng: 118.7969, pinyin: 'Nanjing', tier: 1 },
    { name: '苏州', province: '江苏', lat: 31.2990, lng: 120.5853, pinyin: 'Suzhou', tier: 1 },
    { name: '无锡', province: '江苏', lat: 31.4912, lng: 120.3119, pinyin: 'Wuxi', tier: 2 },
    { name: '常州', province: '江苏', lat: 31.8112, lng: 119.9740, pinyin: 'Changzhou', tier: 2 },
    { name: '南通', province: '江苏', lat: 32.0146, lng: 120.8943, pinyin: 'Nantong', tier: 2 },
    { name: '徐州', province: '江苏', lat: 34.2058, lng: 117.2841, pinyin: 'Xuzhou', tier: 2 },
    { name: '扬州', province: '江苏', lat: 32.3942, lng: 119.4129, pinyin: 'Yangzhou', tier: 3 },
    { name: '镇江', province: '江苏', lat: 32.1877, lng: 119.4258, pinyin: 'Zhenjiang', tier: 3 },
    { name: '泰州', province: '江苏', lat: 32.4558, lng: 119.9255, pinyin: 'Taizhou', tier: 3 },
    
    // 浙江省
    { name: '杭州', province: '浙江', lat: 30.2741, lng: 120.1551, pinyin: 'Hangzhou', tier: 1 },
    { name: '宁波', province: '浙江', lat: 29.8683, lng: 121.5440, pinyin: 'Ningbo', tier: 1 },
    { name: '温州', province: '浙江', lat: 28.0008, lng: 120.7010, pinyin: 'Wenzhou', tier: 2 },
    { name: '嘉兴', province: '浙江', lat: 30.7470, lng: 120.7555, pinyin: 'Jiaxing', tier: 2 },
    { name: '湖州', province: '浙江', lat: 30.8931, lng: 120.0881, pinyin: 'Huzhou', tier: 3 },
    { name: '绍兴', province: '浙江', lat: 30.0022, lng: 120.5790, pinyin: 'Shaoxing', tier: 2 },
    { name: '金华', province: '浙江', lat: 29.0791, lng: 119.6420, pinyin: 'Jinhua', tier: 2 },
    { name: '台州', province: '浙江', lat: 28.6564, lng: 121.4206, pinyin: 'Taizhou', tier: 2 },
    
    // 安徽省
    { name: '合肥', province: '安徽', lat: 31.8206, lng: 117.2272, pinyin: 'Hefei', tier: 1 },
    { name: '芜湖', province: '安徽', lat: 31.3531, lng: 118.4331, pinyin: 'Wuhu', tier: 2 },
    { name: '蚌埠', province: '安徽', lat: 32.9163, lng: 117.3893, pinyin: 'Bengbu', tier: 3 },
    { name: '淮南', province: '安徽', lat: 32.6255, lng: 116.9998, pinyin: 'Huainan', tier: 3 },
    { name: '马鞍山', province: '安徽', lat: 31.6756, lng: 118.5063, pinyin: 'Maanshan', tier: 3 },
    { name: '淮北', province: '安徽', lat: 33.9703, lng: 116.7983, pinyin: 'Huaibei', tier: 3 },
    { name: '黄山', province: '安徽', lat: 29.7147, lng: 118.3375, pinyin: 'Huangshan', tier: 3 },
    { name: '滁州', province: '安徽', lat: 32.3016, lng: 118.3110, pinyin: 'Chuzhou', tier: 3 },
    
    // 福建省
    { name: '福州', province: '福建', lat: 26.0745, lng: 119.2965, pinyin: 'Fuzhou', tier: 2 },
    { name: '厦门', province: '福建', lat: 24.4798, lng: 118.0894, pinyin: 'Xiamen', tier: 1 },
    { name: '莆田', province: '福建', lat: 25.4541, lng: 119.0077, pinyin: 'Putian', tier: 3 },
    { name: '三明', province: '福建', lat: 26.2697, lng: 117.6395, pinyin: 'Sanming', tier: 3 },
    { name: '泉州', province: '福建', lat: 24.8744, lng: 118.6757, pinyin: 'Quanzhou', tier: 2 },
    { name: '漳州', province: '福建', lat: 24.5130, lng: 117.6471, pinyin: 'Zhangzhou', tier: 3 },
    { name: '龙岩', province: '福建', lat: 25.0751, lng: 117.0175, pinyin: 'Longyan', tier: 3 },
    
    // 江西省
    { name: '南昌', province: '江西', lat: 28.6820, lng: 115.8579, pinyin: 'Nanchang', tier: 2 },
    { name: '景德镇', province: '江西', lat: 29.2690, lng: 117.2088, pinyin: 'Jingdezhen', tier: 3 },
    { name: '萍乡', province: '江西', lat: 27.6229, lng: 113.8543, pinyin: 'Pingxiang', tier: 3 },
    { name: '九江', province: '江西', lat: 29.7051, lng: 116.0019, pinyin: 'Jiujiang', tier: 3 },
    { name: '赣州', province: '江西', lat: 25.8314, lng: 114.9348, pinyin: 'Ganzhou', tier: 3 },
    { name: '吉安', province: '江西', lat: 27.1138, lng: 114.9938, pinyin: 'Jian', tier: 3 },
    
    // 山东省
    { name: '济南', province: '山东', lat: 36.6512, lng: 117.1201, pinyin: 'Jinan', tier: 2 },
    { name: '青岛', province: '山东', lat: 36.0671, lng: 120.3826, pinyin: 'Qingdao', tier: 1 },
    { name: '淄博', province: '山东', lat: 36.8149, lng: 118.0551, pinyin: 'Zibo', tier: 3 },
    { name: '枣庄', province: '山东', lat: 34.8107, lng: 117.3237, pinyin: 'Zaozhuang', tier: 3 },
    { name: '东营', province: '山东', lat: 37.4341, lng: 118.6747, pinyin: 'Dongying', tier: 3 },
    { name: '烟台', province: '山东', lat: 37.4638, lng: 121.4481, pinyin: 'Yantai', tier: 2 },
    { name: '潍坊', province: '山东', lat: 36.7089, lng: 119.1619, pinyin: 'Weifang', tier: 2 },
    { name: '济宁', province: '山东', lat: 35.4154, lng: 116.5873, pinyin: 'Jining', tier: 3 },
    { name: '泰安', province: '山东', lat: 36.2003, lng: 117.0876, pinyin: 'Taian', tier: 3 },
    { name: '威海', province: '山东', lat: 37.5091, lng: 122.1206, pinyin: 'Weihai', tier: 3 },
    { name: '日照', province: '山东', lat: 35.4164, lng: 119.5269, pinyin: 'Rizhao', tier: 3 },
    { name: '临沂', province: '山东', lat: 35.1047, lng: 118.3564, pinyin: 'Linyi', tier: 3 },
    
    // 河南省
    { name: '郑州', province: '河南', lat: 34.7466, lng: 113.6253, pinyin: 'Zhengzhou', tier: 1 },
    { name: '开封', province: '河南', lat: 34.7973, lng: 114.3077, pinyin: 'Kaifeng', tier: 3 },
    { name: '洛阳', province: '河南', lat: 34.6197, lng: 112.4543, pinyin: 'Luoyang', tier: 2 },
    { name: '平顶山', province: '河南', lat: 33.7661, lng: 113.1928, pinyin: 'Pingdingshan', tier: 3 },
    { name: '安阳', province: '河南', lat: 36.0957, lng: 114.3931, pinyin: 'Anyang', tier: 3 },
    { name: '新乡', province: '河南', lat: 35.3030, lng: 113.9268, pinyin: 'Xinxiang', tier: 3 },
    { name: '焦作', province: '河南', lat: 35.2159, lng: 113.2420, pinyin: 'Jiaozuo', tier: 3 },
    { name: '许昌', province: '河南', lat: 34.0357, lng: 113.8523, pinyin: 'Xuchang', tier: 3 },
    { name: '南阳', province: '河南', lat: 32.9908, lng: 112.5285, pinyin: 'Nanyang', tier: 3 },
    { name: '商丘', province: '河南', lat: 34.4144, lng: 115.6564, pinyin: 'Shangqiu', tier: 3 },
    
    // 湖北省
    { name: '武汉', province: '湖北', lat: 30.5928, lng: 114.3055, pinyin: 'Wuhan', tier: 1 },
    { name: '黄石', province: '湖北', lat: 30.2007, lng: 115.0388, pinyin: 'Huangshi', tier: 3 },
    { name: '十堰', province: '湖北', lat: 32.6292, lng: 110.7988, pinyin: 'Shiyan', tier: 3 },
    { name: '宜昌', province: '湖北', lat: 30.6920, lng: 111.2865, pinyin: 'Yichang', tier: 2 },
    { name: '襄阳', province: '湖北', lat: 32.0090, lng: 112.1226, pinyin: 'Xiangyang', tier: 2 },
    { name: '鄂州', province: '湖北', lat: 30.4000, lng: 114.8900, pinyin: 'Ezhou', tier: 3 },
    { name: '荆门', province: '湖北', lat: 31.0355, lng: 112.1994, pinyin: 'Jingmen', tier: 3 },
    { name: '孝感', province: '湖北', lat: 30.9279, lng: 113.9109, pinyin: 'Xiaogan', tier: 3 },
    { name: '荆州', province: '湖北', lat: 30.3326, lng: 112.2417, pinyin: 'Jingzhou', tier: 3 },
    { name: '黄冈', province: '湖北', lat: 30.4539, lng: 114.8723, pinyin: 'Huanggang', tier: 3 },
    { name: '咸宁', province: '湖北', lat: 29.8417, lng: 114.3225, pinyin: 'Xianning', tier: 3 },
    
    // 湖南省
    { name: '长沙', province: '湖南', lat: 28.2280, lng: 112.9388, pinyin: 'Changsha', tier: 1 },
    { name: '株洲', province: '湖南', lat: 27.8278, lng: 113.1330, pinyin: 'Zhuzhou', tier: 3 },
    { name: '湘潭', province: '湖南', lat: 27.8297, lng: 112.9445, pinyin: 'Xiangtan', tier: 3 },
    { name: '衡阳', province: '湖南', lat: 26.8932, lng: 112.5720, pinyin: 'Hengyang', tier: 3 },
    { name: '邵阳', province: '湖南', lat: 27.2389, lng: 111.4678, pinyin: 'Shaoyang', tier: 3 },
    { name: '岳阳', province: '湖南', lat: 29.3573, lng: 113.1289, pinyin: 'Yueyang', tier: 3 },
    { name: '常德', province: '湖南', lat: 29.0391, lng: 111.6985, pinyin: 'Changde', tier: 3 },
    { name: '张家界', province: '湖南', lat: 29.1171, lng: 110.4792, pinyin: 'Zhangjiajie', tier: 3 },
    { name: '郴州', province: '湖南', lat: 25.7703, lng: 113.0149, pinyin: 'Chenzhou', tier: 3 },
    
    // 广东省
    { name: '广州', province: '广东', lat: 23.1291, lng: 113.2644, pinyin: 'Guangzhou', tier: 1 },
    { name: '深圳', province: '广东', lat: 22.5431, lng: 114.0579, pinyin: 'Shenzhen', tier: 1 },
    { name: '珠海', province: '广东', lat: 22.2710, lng: 113.5670, pinyin: 'Zhuhai', tier: 2 },
    { name: '汕头', province: '广东', lat: 23.3535, lng: 116.7138, pinyin: 'Shantou', tier: 3 },
    { name: '佛山', province: '广东', lat: 23.0218, lng: 113.1214, pinyin: 'Foshan', tier: 2 },
    { name: '韶关', province: '广东', lat: 24.8104, lng: 113.5972, pinyin: 'Shaoguan', tier: 3 },
    { name: '湛江', province: '广东', lat: 21.2707, lng: 110.3594, pinyin: 'Zhanjiang', tier: 3 },
    { name: '肇庆', province: '广东', lat: 23.0462, lng: 112.4653, pinyin: 'Zhaoqing', tier: 3 },
    { name: '江门', province: '广东', lat: 22.5791, lng: 113.0815, pinyin: 'Jiangmen', tier: 3 },
    { name: '茂名', province: '广东', lat: 21.6603, lng: 110.9255, pinyin: 'Maoming', tier: 3 },
    { name: '惠州', province: '广东', lat: 23.1118, lng: 114.4158, pinyin: 'Huizhou', tier: 2 },
    { name: '东莞', province: '广东', lat: 23.0207, lng: 113.7518, pinyin: 'Dongguan', tier: 1 },
    { name: '中山', province: '广东', lat: 22.5176, lng: 113.3927, pinyin: 'Zhongshan', tier: 2 },
    
    // 广西壮族自治区
    { name: '南宁', province: '广西', lat: 22.8170, lng: 108.3665, pinyin: 'Nanning', tier: 2 },
    { name: '柳州', province: '广西', lat: 24.3250, lng: 109.4155, pinyin: 'Liuzhou', tier: 3 },
    { name: '桂林', province: '广西', lat: 25.2740, lng: 110.2993, pinyin: 'Guilin', tier: 3 },
    { name: '梧州', province: '广西', lat: 23.4769, lng: 111.2791, pinyin: 'Wuzhou', tier: 3 },
    { name: '北海', province: '广西', lat: 21.4813, lng: 109.1202, pinyin: 'Beihai', tier: 3 },
    { name: '玉林', province: '广西', lat: 22.6314, lng: 110.1544, pinyin: 'Yulin', tier: 3 },
    
    // 海南省
    { name: '海口', province: '海南', lat: 20.0440, lng: 110.1999, pinyin: 'Haikou', tier: 2 },
    { name: '三亚', province: '海南', lat: 18.2528, lng: 109.5120, pinyin: 'Sanya', tier: 3 },
    { name: '三沙', province: '海南', lat: 16.8310, lng: 112.3400, pinyin: 'Sansha', tier: 3 },
    
    // 四川省
    { name: '成都', province: '四川', lat: 30.5728, lng: 104.0668, pinyin: 'Chengdu', tier: 1 },
    { name: '自贡', province: '四川', lat: 29.3390, lng: 104.7784, pinyin: 'Zigong', tier: 3 },
    { name: '攀枝花', province: '四川', lat: 26.5823, lng: 101.7186, pinyin: 'Panzhihua', tier: 3 },
    { name: '泸州', province: '四川', lat: 28.8713, lng: 105.4423, pinyin: 'Luzhou', tier: 3 },
    { name: '德阳', province: '四川', lat: 31.1269, lng: 104.3980, pinyin: 'Deyang', tier: 3 },
    { name: '绵阳', province: '四川', lat: 31.4677, lng: 104.6796, pinyin: 'Mianyang', tier: 2 },
    { name: '广元', province: '四川', lat: 32.4355, lng: 105.8436, pinyin: 'Guangyuan', tier: 3 },
    { name: '遂宁', province: '四川', lat: 30.5329, lng: 105.5927, pinyin: 'Suining', tier: 3 },
    { name: '内江', province: '四川', lat: 29.5832, lng: 105.0593, pinyin: 'Neijiang', tier: 3 },
    { name: '乐山', province: '四川', lat: 29.5823, lng: 103.7665, pinyin: 'Leshan', tier: 3 },
    { name: '南充', province: '四川', lat: 30.8373, lng: 106.1107, pinyin: 'Nanchong', tier: 3 },
    { name: '眉山', province: '四川', lat: 30.0759, lng: 103.8485, pinyin: 'Meishan', tier: 3 },
    { name: '宜宾', province: '四川', lat: 28.7513, lng: 104.6417, pinyin: 'Yibin', tier: 3 },
    { name: '广安', province: '四川', lat: 30.4562, lng: 106.6346, pinyin: 'Guangan', tier: 3 },
    { name: '达州', province: '四川', lat: 31.2097, lng: 107.4676, pinyin: 'Dazhou', tier: 3 },
    { name: '雅安', province: '四川', lat: 29.9806, lng: 103.0132, pinyin: 'Yaan', tier: 3 },
    { name: '巴中', province: '四川', lat: 31.8682, lng: 106.7475, pinyin: 'Bazhong', tier: 3 },
    { name: '资阳', province: '四川', lat: 30.1292, lng: 104.6276, pinyin: 'Ziyang', tier: 3 },
    
    // 贵州省
    { name: '贵阳', province: '贵州', lat: 26.6470, lng: 106.6302, pinyin: 'Guiyang', tier: 2 },
    { name: '遵义', province: '贵州', lat: 27.7255, lng: 106.9274, pinyin: 'Zunyi', tier: 3 },
    { name: '六盘水', province: '贵州', lat: 26.5927, lng: 104.8303, pinyin: 'Liupanshui', tier: 3 },
    { name: '安顺', province: '贵州', lat: 26.2530, lng: 105.9476, pinyin: 'Anshun', tier: 3 },
    { name: '铜仁', province: '贵州', lat: 27.7317, lng: 109.1892, pinyin: 'Tongren', tier: 3 },
    
    // 云南省
    { name: '昆明', province: '云南', lat: 25.0389, lng: 102.7183, pinyin: 'Kunming', tier: 2 },
    { name: '曲靖', province: '云南', lat: 25.4900, lng: 103.7968, pinyin: 'Qujing', tier: 3 },
    { name: '玉溪', province: '云南', lat: 24.3505, lng: 102.5471, pinyin: 'Yuxi', tier: 3 },
    { name: '保山', province: '云南', lat: 25.1121, lng: 99.1619, pinyin: 'Baoshan', tier: 3 },
    { name: '昭通', province: '云南', lat: 27.3382, lng: 103.7173, pinyin: 'Zhaotong', tier: 3 },
    { name: '丽江', province: '云南', lat: 26.8721, lng: 100.2210, pinyin: 'Lijiang', tier: 3 },
    { name: '普洱', province: '云南', lat: 22.8252, lng: 100.9665, pinyin: 'Puer', tier: 3 },
    { name: '临沧', province: '云南', lat: 23.8850, lng: 100.0882, pinyin: 'Lincang', tier: 3 },
    
    // 西藏自治区
    { name: '拉萨', province: '西藏', lat: 29.6500, lng: 91.1000, pinyin: 'Lhasa', tier: 3 },
    { name: '日喀则', province: '西藏', lat: 29.2669, lng: 88.8806, pinyin: 'Shigatse', tier: 3 },
    { name: '昌都', province: '西藏', lat: 31.1406, lng: 97.1722, pinyin: 'Qamdo', tier: 3 },
    { name: '林芝', province: '西藏', lat: 29.6490, lng: 94.3615, pinyin: 'Nyingchi', tier: 3 },
    
    // 陕西省
    { name: '西安', province: '陕西', lat: 34.3416, lng: 108.9398, pinyin: 'Xi'an', tier: 1 },
    { name: '铜川', province: '陕西', lat: 34.8967, lng: 108.9452, pinyin: 'Tongchuan', tier: 3 },
    { name: '宝鸡', province: '陕西', lat: 34.3617, lng: 107.2377, pinyin: 'Baoji', tier: 3 },
    { name: '咸阳', province: '陕西', lat: 34.3296, lng: 108.7089, pinyin: 'Xianyang', tier: 3 },
    { name: '渭南', province: '陕西', lat: 34.4994, lng: 109.5093, pinyin: 'Weinan', tier: 3 },
    { name: '延安', province: '陕西', lat: 36.5853, lng: 109.4898, pinyin: 'Yanan', tier: 3 },
    { name: '汉中', province: '陕西', lat: 33.0675, lng: 107.0280, pinyin: 'Hanzhong', tier: 3 },
    { name: '榆林', province: '陕西', lat: 38.2852, lng: 109.7346, pinyin: 'Yulin', tier: 3 },
    { name: '安康', province: '陕西', lat: 32.6903, lng: 109.0291, pinyin: 'Ankang', tier: 3 },
    { name: '商洛', province: '陕西', lat: 33.8704, lng: 109.9404, pinyin: 'Shangluo', tier: 3 },
    
    // 甘肃省
    { name: '兰州', province: '甘肃', lat: 36.0611, lng: 103.8343, pinyin: 'Lanzhou', tier: 2 },
    { name: '嘉峪关', province: '甘肃', lat: 39.7720, lng: 98.2882, pinyin: 'Jiayuguan', tier: 3 },
    { name: '金昌', province: '甘肃', lat: 38.5208, lng: 102.1877, pinyin: 'Jinchang', tier: 3 },
    { name: '白银', province: '甘肃', lat: 36.5448, lng: 104.1370, pinyin: 'Baiyin', tier: 3 },
    { name: '天水', province: '甘肃', lat: 34.5809, lng: 105.7249, pinyin: 'Tianshui', tier: 3 },
    { name: '武威', province: '甘肃', lat: 37.9283, lng: 102.6411, pinyin: 'Wuwei', tier: 3 },
    { name: '张掖', province: '甘肃', lat: 38.9329, lng: 100.4499, pinyin: 'Zhangye', tier: 3 },
    { name: '平凉', province: '甘肃', lat: 35.5424, lng: 106.6653, pinyin: 'Pingliang', tier: 3 },
    { name: '酒泉', province: '甘肃', lat: 39.7448, lng: 98.4933, pinyin: 'Jiuquan', tier: 3 },
    { name: '庆阳', province: '甘肃', lat: 35.7098, lng: 107.6445, pinyin: 'Qingyang', tier: 3 },
    { name: '定西', province: '甘肃', lat: 35.5807, lng: 104.6263, pinyin: 'Dingxi', tier: 3 },
    { name: '陇南', province: '甘肃', lat: 33.4061, lng: 104.9217, pinyin: 'Longnan', tier: 3 },
    
    // 青海省
    { name: '西宁', province: '青海', lat: 36.6171, lng: 101.7782, pinyin: 'Xining', tier: 3 },
    { name: '海东', province: '青海', lat: 36.5020, lng: 102.1033, pinyin: 'Haidong', tier: 3 },
    
    // 宁夏回族自治区
    { name: '银川', province: '宁夏', lat: 38.4872, lng: 106.2309, pinyin: 'Yinchuan', tier: 3 },
    { name: '石嘴山', province: '宁夏', lat: 39.0150, lng: 106.3769, pinyin: 'Shizuishan', tier: 3 },
    { name: '吴忠', province: '宁夏', lat: 37.9847, lng: 106.1990, pinyin: 'Wuzhong', tier: 3 },
    { name: '固原', province: '宁夏', lat: 36.0056, lng: 106.2791, pinyin: 'Guyuan', tier: 3 },
    
    // 新疆维吾尔自治区
    { name: '乌鲁木齐', province: '新疆', lat: 43.8256, lng: 87.6168, pinyin: 'Urumqi', tier: 2 },
    { name: '克拉玛依', province: '新疆', lat: 45.5792, lng: 84.8892, pinyin: 'Karamay', tier: 3 },
    { name: '吐鲁番', province: '新疆', lat: 42.9513, lng: 89.1895, pinyin: 'Turpan', tier: 3 },
    { name: '哈密', province: '新疆', lat: 42.8259, lng: 93.5140, pinyin: 'Hami', tier: 3 },
    { name: '喀什', province: '新疆', lat: 39.4677, lng: 75.9938, pinyin: 'Kashgar', tier: 3 },
    { name: '阿克苏', province: '新疆', lat: 41.1685, lng: 80.2639, pinyin: 'Aksu', tier: 3 },
    { name: '和田', province: '新疆', lat: 37.1103, lng: 79.9155, pinyin: 'Hotan', tier: 3 },
    { name: '伊犁', province: '新疆', lat: 43.9169, lng: 81.3242, pinyin: 'Ili', tier: 3 }
];

// 暴露到全局
window.CHINA_CITIES = CHINA_CITIES;
