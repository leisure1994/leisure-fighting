const fs = require('fs');

// 读取缺少targets的城市列表
const citiesWithoutTargets = JSON.parse(fs.readFileSync('cities_without_targets.json', 'utf8'));

// 核打击目标数据生成器
function generateTargets(city) {
  const [lng, lat] = city.center;
  const targets = [];
  let idCounter = 1;
  
  // 根据城市名称判断类型和特征，生成相应目标
  const name = city.name;
  const key = city.key;
  
  // 1. 机场目标 - 大多数城市都有机场或邻近机场
  const airports = {
    'akesu': { name: '阿克苏红旗坡机场', lat: 41.26, lng: 80.29, risk: '中' },
    'alaer': { name: '阿拉尔塔里木机场', lat: 40.43, lng: 81.30, risk: '中' },
    'aletai': { name: '阿勒泰雪都机场', lat: 47.75, lng: 88.09, risk: '中' },
    'ali': { name: '阿里昆莎机场', lat: 32.10, lng: 80.06, risk: '中' },
    'anqing': { name: '安庆天柱山机场', lat: 30.52, lng: 117.05, risk: '中' },
    'anshan': { name: '鞍山腾鳌机场', lat: 41.11, lng: 122.86, risk: '中' },
    'anshun': { name: '安顺黄果树机场', lat: 26.26, lng: 105.87, risk: '中' },
    'baicheng': { name: '白城长安机场', lat: 45.62, lng: 122.85, risk: '中' },
    'baise': { name: '百色巴马机场', lat: 23.72, lng: 106.64, risk: '中' },
    'baishan': { name: '长白山机场', lat: 41.93, lng: 126.43, risk: '中' },
    'bayannaoer': { name: '巴彦淖尔天吉泰机场', lat: 40.77, lng: 107.40, risk: '中' },
    'bayinguoleng': { name: '库尔勒机场', lat: 41.73, lng: 86.13, risk: '中' },
    'bazhou': { name: '库尔勒机场', lat: 41.73, lng: 86.13, risk: '中' },
    'beitun': { name: '北屯丰庆机场', lat: 47.35, lng: 87.81, risk: '中' },
    'bengbu': { name: '蚌埠滕湖机场', lat: 33.15, lng: 117.40, risk: '中' },
    'benxi': { name: '本溪桓仁机场', lat: 41.30, lng: 123.77, risk: '中' },
    'bijie': { name: '毕节飞雄机场', lat: 27.30, lng: 105.30, risk: '中' },
    'boertala': { name: '博乐阿拉山口机场', lat: 44.91, lng: 82.07, risk: '中' },
    'bozhou': { name: '亳州机场', lat: 33.85, lng: 115.78, risk: '中' },
    'changchun': { name: '长春龙嘉国际机场', lat: 43.99, lng: 125.68, risk: '高' },
    'changdu': { name: '昌都邦达机场', lat: 30.06, lng: 97.11, risk: '中' },
    'changji': { name: '昌吉准东机场', lat: 44.01, lng: 87.30, risk: '中' },
    'changzhi': { name: '长治王村机场', lat: 36.18, lng: 113.13, risk: '中' },
    'chengde': { name: '承德普宁机场', lat: 41.12, lng: 118.08, risk: '中' },
    'dali': { name: '大理荒草坝机场', lat: 25.65, lng: 100.32, risk: '中' },
    'daqing': { name: '大庆萨尔图机场', lat: 46.75, lng: 125.13, risk: '中' },
    'datong': { name: '大同云冈机场', lat: 40.06, lng: 113.48, risk: '中' },
    'daxinganling': { name: '漠河古莲机场', lat: 52.92, lng: 122.42, risk: '中' },
    'dazhou': { name: '达州金垭机场', lat: 31.05, lng: 107.45, risk: '中' },
    'dehong': { name: '德宏芒市机场', lat: 24.40, lng: 98.53, risk: '中' },
    'deyang': { name: '广汉机场', lat: 30.95, lng: 104.28, risk: '中' },
    'dezhou': { name: '德州机场', lat: 37.45, lng: 116.38, risk: '中' },
    'dingxi': { name: '定西机场', lat: 35.60, lng: 104.63, risk: '中' },
    'dongguan': { name: '深圳宝安机场', lat: 22.63, lng: 113.81, risk: '高' },
    'dongying': { name: '东营胜利机场', lat: 37.51, lng: 118.79, risk: '中' },
    'eerduosi': { name: '鄂尔多斯伊金霍洛机场', lat: 39.49, lng: 109.86, risk: '高' },
    'enshi': { name: '恩施许家坪机场', lat: 30.32, lng: 109.49, risk: '中' },
    'ezhou': { name: '鄂州花湖机场', lat: 30.34, lng: 115.03, risk: '高' },
    'fangchenggang': { name: '防城港机场', lat: 21.65, lng: 108.35, risk: '中' },
    'foshan': { name: '佛山沙堤机场', lat: 23.07, lng: 113.07, risk: '中' },
    'fushun': { name: '沈阳桃仙机场', lat: 41.63, lng: 123.48, risk: '高' },
    'fuxin': { name: '阜新机场', lat: 42.02, lng: 121.65, risk: '中' },
    'fuyang': { name: '阜阳西关机场', lat: 32.88, lng: 115.73, risk: '中' },
    'fuzhou2': { name: '抚州机场', lat: 27.55, lng: 116.36, risk: '中' },
    'gannan': { name: '甘南夏河机场', lat: 34.82, lng: 102.62, risk: '中' },
    'ganzi': { name: '甘孜康定机场', lat: 30.16, lng: 101.74, risk: '中' },
    'guangan': { name: '广安机场', lat: 30.47, lng: 106.64, risk: '中' },
    'guangyuan': { name: '广元盘龙机场', lat: 32.39, lng: 105.70, risk: '中' },
    'guigang': { name: '贵港机场', lat: 23.10, lng: 109.60, risk: '中' },
    'guilin': { name: '桂林两江国际机场', lat: 25.22, lng: 110.04, risk: '高' },
    'guoluo': { name: '果洛玛沁机场', lat: 34.42, lng: 100.30, risk: '中' },
    'guyuan': { name: '固原六盘山机场', lat: 36.08, lng: 106.22, risk: '中' },
    'haibei': { name: '海北祁连机场', lat: 38.00, lng: 100.65, risk: '中' },
    'haidong': { name: '西宁曹家堡机场', lat: 36.53, lng: 102.04, risk: '高' },
    'haixi': { name: '德令哈机场', lat: 37.12, lng: 97.27, risk: '中' },
    'hami': { name: '哈密伊州机场', lat: 42.92, lng: 93.67, risk: '中' },
    'hanzhong': { name: '汉中城固机场', lat: 33.13, lng: 107.20, risk: '中' },
    'hebi': { name: '鹤壁机场', lat: 35.75, lng: 114.30, risk: '中' },
    'hechi': { name: '河池金城江机场', lat: 24.80, lng: 108.06, risk: '中' },
    'hegang': { name: '鹤岗机场', lat: 47.35, lng: 130.28, risk: '中' },
    'heihe': { name: '黑河瑷珲机场', lat: 50.17, lng: 127.30, risk: '中' },
    'hengshui': { name: '衡水机场', lat: 37.74, lng: 115.69, risk: '中' },
    'hengyang': { name: '衡阳南岳机场', lat: 26.72, lng: 112.62, risk: '中' },
    'hetian': { name: '和田昆冈机场', lat: 37.04, lng: 79.86, risk: '中' },
    'heyuan': { name: '河源机场', lat: 23.75, lng: 114.70, risk: '中' },
    'heze': { name: '菏泽牡丹机场', lat: 35.21, lng: 115.60, risk: '中' },
    'hezhou': { name: '贺州机场', lat: 24.41, lng: 111.55, risk: '中' },
    'honghe': { name: '红河蒙自机场', lat: 23.40, lng: 103.40, risk: '中' },
    'huaibei': { name: '淮北机场', lat: 33.97, lng: 116.80, risk: '中' },
    'huaihua': { name: '怀化芷江机场', lat: 27.45, lng: 109.70, risk: '中' },
    'huainan': { name: '淮南机场', lat: 32.63, lng: 116.98, risk: '中' },
    'huanggang': { name: '黄冈机场', lat: 30.45, lng: 114.88, risk: '中' },
    'huangnan': { name: '黄南机场', lat: 35.52, lng: 102.02, risk: '中' },
    'huangshan': { name: '黄山屯溪国际机场', lat: 29.73, lng: 118.26, risk: '中' },
    'huludao': { name: '葫芦岛机场', lat: 40.75, lng: 120.83, risk: '中' },
    'hulunbeier': { name: '呼伦贝尔海拉尔机场', lat: 49.20, lng: 119.83, risk: '中' },
    'huzhou': { name: '湖州机场', lat: 30.87, lng: 120.12, risk: '中' },
    'jiamusi': { name: '佳木斯东郊机场', lat: 46.85, lng: 130.46, risk: '中' },
    'jiayuguan': { name: '嘉峪关酒泉机场', lat: 39.86, lng: 98.34, risk: '高' },
    'jilin': { name: '吉林二台子机场', lat: 44.00, lng: 126.40, risk: '中' },
    'jincheng': { name: '晋城机场', lat: 35.50, lng: 112.85, risk: '中' },
    'jingdezhen': { name: '景德镇罗家机场', lat: 29.34, lng: 117.21, risk: '中' },
    'jingmen': { name: '荆门机场', lat: 30.98, lng: 112.20, risk: '中' },
    'jingzhou': { name: '荆州沙市机场', lat: 30.32, lng: 112.28, risk: '中' },
    'jinhua': { name: '金华义乌机场', lat: 29.34, lng: 120.03, risk: '中' },
    'jinzhong': { name: '晋中机场', lat: 37.69, lng: 112.73, risk: '中' },
    'jinzhou': { name: '锦州锦州湾机场', lat: 41.10, lng: 121.07, risk: '中' },
    'jixi': { name: '鸡西兴凯湖机场', lat: 45.30, lng: 131.15, risk: '中' },
    'jiujiang': { name: '九江庐山机场', lat: 29.48, lng: 115.80, risk: '中' },
    'kezilesu': { name: '克孜勒苏机场', lat: 39.72, lng: 76.17, risk: '中' },
    'lasa': { name: '拉萨贡嘎国际机场', lat: 29.30, lng: 90.91, risk: '高' },
    'laibin': { name: '来宾机场', lat: 23.73, lng: 109.23, risk: '中' },
    'laiwu': { name: '济南遥墙机场', lat: 36.86, lng: 117.22, risk: '高' },
    'lamp': { name: '来宾机场', lat: 23.73, lng: 109.23, risk: '中' },
    'lasa': { name: '拉萨贡嘎国际机场', lat: 29.30, lng: 90.91, risk: '高' },
    'leshan': { name: '乐山机场', lat: 29.55, lng: 103.75, risk: '中' },
    'liangshan': { name: '西昌青山机场', lat: 27.99, lng: 102.18, risk: '中' },
    'lianyungang': { name: '连云港花果山机场', lat: 34.43, lng: 119.18, risk: '中' },
    'liaocheng': { name: '聊城机场', lat: 36.46, lng: 115.98, risk: '中' },
    'liaoyang': { name: '辽阳机场', lat: 41.28, lng: 123.18, risk: '中' },
    'linxia': { name: '临夏机场', lat: 35.60, lng: 103.21, risk: '中' },
    'linyi2': { name: '临沂启阳机场', lat: 35.05, lng: 118.41, risk: '中' },
    'linzhi': { name: '林芝米林机场', lat: 29.30, lng: 94.34, risk: '中' },
    'lishui': { name: '丽水机场', lat: 28.45, lng: 119.92, risk: '中' },
    'liupanshui': { name: '六盘水月照机场', lat: 26.60, lng: 104.98, risk: '中' },
    'longnan': { name: '陇南成县机场', lat: 33.79, lng: 105.80, risk: '中' },
    'loudi': { name: '娄底机场', lat: 27.70, lng: 112.00, risk: '中' },
    'luohe': { name: '漯河机场', lat: 33.58, lng: 114.02, risk: '中' },
    'luoyang': { name: '洛阳北郊机场', lat: 34.74, lng: 112.39, risk: '中' },
    'maanshan': { name: '马鞍山机场', lat: 31.70, lng: 118.51, risk: '中' },
    'maoming': { name: '湛江吴川机场', lat: 21.48, lng: 110.35, risk: '高' },
    'meishan': { name: '眉山机场', lat: 30.08, lng: 103.85, risk: '中' },
    'meizhou': { name: '梅州梅县机场', lat: 24.27, lng: 116.10, risk: '中' },
    'mianyang': { name: '绵阳南郊机场', lat: 31.43, lng: 104.75, risk: '中' },
    'mudanjiang': { name: '牡丹江海浪机场', lat: 44.52, lng: 129.57, risk: '中' },
    'nanchong': { name: '南充高坪机场', lat: 30.80, lng: 106.17, risk: '中' },
    'nanping': { name: '武夷山机场', lat: 27.70, lng: 118.00, risk: '中' },
    'nanyang': { name: '南阳姜营机场', lat: 32.98, lng: 112.62, risk: '中' },
    'naqu': { name: '那曲机场', lat: 31.44, lng: 92.05, risk: '中' },
    'neijiang': { name: '内江机场', lat: 29.58, lng: 105.06, risk: '中' },
    'ningde': { name: '宁德机场', lat: 26.67, lng: 119.55, risk: '中' },
    'nujiang': { name: '怒江保山机场', lat: 25.05, lng: 98.48, risk: '中' },
    'panjin': { name: '盘锦机场', lat: 41.12, lng: 122.07, risk: '中' },
    'panzhihua': { name: '攀枝花保安营机场', lat: 26.54, lng: 101.88, risk: '中' },
    'pingdingshan': { name: '平顶山机场', lat: 33.77, lng: 113.30, risk: '中' },
    'pingliang': { name: '平凉机场', lat: 35.55, lng: 106.67, risk: '中' },
    'puer': { name: '普洱思茅机场', lat: 22.79, lng: 100.96, risk: '中' },
    'puyang': { name: '濮阳机场', lat: 35.76, lng: 115.03, risk: '中' },
    'qingyang': { name: '庆阳机场', lat: 36.28, lng: 107.60, risk: '中' },
    'qujing': { name: '曲靖麒麟机场', lat: 25.50, lng: 103.80, risk: '中' },
    'rizhao': { name: '日照山字河机场', lat: 35.40, lng: 119.32, risk: '中' },
    'sanming': { name: '三明沙县机场', lat: 26.42, lng: 117.84, risk: '中' },
    'sanya': { name: '三亚凤凰国际机场', lat: 18.30, lng: 109.41, risk: '高' },
    'shantou': { name: '揭阳潮汕国际机场', lat: 23.55, lng: 116.50, risk: '高' },
    'shaoguan': { name: '韶关丹霞机场', lat: 24.97, lng: 113.42, risk: '中' },
    'shaoyang': { name: '邵阳武冈机场', lat: 26.80, lng: 110.65, risk: '中' },
    'shennongjia': { name: '神农架红坪机场', lat: 31.63, lng: 110.34, risk: '中' },
    'shiyan': { name: '十堰武当山机场', lat: 32.59, lng: 110.91, risk: '中' },
    'songyuan': { name: '松原查干湖机场', lat: 45.03, lng: 124.09, risk: '中' },
    'suining': { name: '遂宁安居机场', lat: 30.52, lng: 105.59, risk: '中' },
    'suizhou': { name: '随州机场', lat: 31.72, lng: 113.39, risk: '中' },
    'tacheng': { name: '塔城千泉机场', lat: 46.67, lng: 83.34, risk: '中' },
    'taiyuan': { name: '太原武宿国际机场', lat: 37.75, lng: 112.63, risk: '高' },
    'taizhou2': { name: '台州路桥机场', lat: 28.56, lng: 121.43, risk: '中' },
    'tianshui': { name: '天水麦积山机场', lat: 34.56, lng: 105.86, risk: '中' },
    'tieling': { name: '铁岭机场', lat: 42.22, lng: 123.84, risk: '中' },
    'tongchuan': { name: '铜川机场', lat: 35.08, lng: 109.08, risk: '中' },
    'tongliao': { name: '通辽机场', lat: 43.56, lng: 122.20, risk: '中' },
    'tongling': { name: '铜陵机场', lat: 30.95, lng: 117.82, risk: '中' },
    'tongren': { name: '铜仁凤凰机场', lat: 27.88, lng: 109.31, risk: '中' },
    'tulufan': { name: '吐鲁番交河机场', lat: 43.03, lng: 89.10, risk: '中' },
    'weihai': { name: '威海大水泊国际机场', lat: 37.19, lng: 122.23, risk: '中' },
    'weinan': { name: '渭南机场', lat: 34.50, lng: 109.50, risk: '中' },
    'wenshan': { name: '文山砚山机场', lat: 23.56, lng: 104.33, risk: '中' },
    'wenzhou': { name: '温州龙湾国际机场', lat: 27.91, lng: 120.85, risk: '高' },
    'wuhai': { name: '乌海机场', lat: 39.80, lng: 106.80, risk: '中' },
    'wuwei': { name: '武威机场', lat: 38.50, lng: 102.63, risk: '中' },
    'xiangxi': { name: '湘西边城机场', lat: 28.50, lng: 109.45, risk: '中' },
    'xiangyang': { name: '襄阳刘集机场', lat: 32.15, lng: 112.29, risk: '中' },
    'xianning': { name: '咸宁机场', lat: 29.84, lng: 114.32, risk: '中' },
    'xiaogan': { name: '孝感机场', lat: 30.93, lng: 113.96, risk: '中' },
    'xingtai': { name: '邢台褡裢机场', lat: 37.18, lng: 114.43, risk: '中' },
    'xinxiang': { name: '新乡机场', lat: 35.32, lng: 113.93, risk: '中' },
    'xinyang': { name: '信阳明港机场', lat: 32.54, lng: 114.08, risk: '中' },
    'xinganmeng': { name: '乌兰浩特机场', lat: 46.08, lng: 122.02, risk: '中' },
    'xingtai': { name: '邢台褡裢机场', lat: 37.18, lng: 114.43, risk: '中' },
    'xining': { name: '西宁曹家堡国际机场', lat: 36.53, lng: 102.04, risk: '高' },
    'xuancheng': { name: '宣城机场', lat: 30.95, lng: 118.76, risk: '中' },
    'xuzhou': { name: '徐州观音国际机场', lat: 34.06, lng: 117.56, risk: '中' },
    'yaan': { name: '雅安机场', lat: 30.00, lng: 103.00, risk: '中' },
    'yanan': { name: '延安南泥湾机场', lat: 36.54, lng: 109.55, risk: '中' },
    'yancheng': { name: '盐城南洋国际机场', lat: 33.39, lng: 120.20, risk: '中' },
    'yangjiang': { name: '阳江合山机场', lat: 21.96, lng: 112.10, risk: '中' },
    'yangquan': { name: '阳泉机场', lat: 37.86, lng: 113.63, risk: '中' },
    'yangzhou': { name: '扬州泰州国际机场', lat: 32.56, lng: 119.72, risk: '中' },
    'yibin': { name: '宜宾五粮液机场', lat: 28.85, lng: 104.55, risk: '中' },
    'yichang': { name: '宜昌三峡机场', lat: 30.56, lng: 111.48, risk: '中' },
    'yichun': { name: '伊春林都机场', lat: 47.75, lng: 128.83, risk: '中' },
    'yili': { name: '伊宁机场', lat: 43.95, lng: 81.33, risk: '中' },
    'yingkou': { name: '营口兰旗机场', lat: 40.54, lng: 122.36, risk: '中' },
    'yingtan': { name: '鹰潭机场', lat: 28.24, lng: 117.00, risk: '中' },
    'yongzhou': { name: '永州零陵机场', lat: 26.34, lng: 111.60, risk: '中' },
    'yueyang': { name: '岳阳三荷机场', lat: 29.19, lng: 113.28, risk: '中' },
    'yulin': { name: '榆林榆阳机场', lat: 38.36, lng: 109.60, risk: '中' },
    'yuncheng': { name: '运城张孝机场', lat: 35.12, lng: 111.04, risk: '中' },
    'yuxi': { name: '玉溪机场', lat: 24.35, lng: 102.55, risk: '中' },
    'yuzhong': { name: '渝中机场', lat: 29.56, lng: 106.55, risk: '高' },
    'zhangjiakou': { name: '张家口宁远机场', lat: 40.74, lng: 114.93, risk: '中' },
    'zhangye': { name: '张掖甘州机场', lat: 38.80, lng: 100.67, risk: '中' },
    'zhanjiang': { name: '湛江吴川机场', lat: 21.48, lng: 110.35, risk: '高' },
    'zhaoqing': { name: '肇庆机场', lat: 23.05, lng: 112.47, risk: '中' },
    'zhaotong': { name: '昭通机场', lat: 27.32, lng: 103.75, risk: '中' },
    'zhenjiang': { name: '镇江机场', lat: 32.19, lng: 119.43, risk: '中' },
    'zhongwei': { name: '中卫沙坡头机场', lat: 37.57, lng: 105.25, risk: '中' },
    'zhoushan': { name: '舟山普陀山机场', lat: 29.93, lng: 122.36, risk: '中' },
    'zhumadian': { name: '驻马店机场', lat: 33.00, lng: 114.02, risk: '中' },
    'zhuzhou': { name: '株洲机场', lat: 27.83, lng: 113.13, risk: '中' },
    'ziyang': { name: '资阳机场', lat: 30.13, lng: 104.65, risk: '中' },
    'zunyi': { name: '遵义新舟机场', lat: 27.80, lng: 107.25, risk: '中' }
  };
  
  // 为城市添加机场目标
  if (airports[key]) {
    const ap = airports[key];
    targets.push({
      name: ap.name,
      type: 'airport',
      position: [ap.lng, ap.lat],
      risk: ap.risk
    });
  }
  
  // 2. 发电厂目标 - 每个城市都有
  const powerPlants = [
    { name: `${name}热电厂`, lat: lat + 0.08, lng: lng + 0.05, risk: '高' },
    { name: `${name}第一发电厂`, lat: lat - 0.06, lng: lng - 0.04, risk: '高' },
    { name: `${name}变电站`, lat: lat + 0.04, lng: lng - 0.06, risk: '中' }
  ];
  
  // 添加1-2个电厂
  targets.push(powerPlants[0]);
  if (Math.random() > 0.5) {
    targets.push(powerPlants[1]);
  }
  
  // 3. 自来水厂 - 每个城市都有
  targets.push({
    name: `${name}自来水厂`,
    type: 'water',
    position: [lng - 0.03, lat + 0.05],
    risk: '高'
  });
  
  // 4. 工厂/化工厂
  const factories = [
    { suffix: '化工厂', risk: '高' },
    { suffix: '炼油厂', risk: '极高' },
    { suffix: '钢铁厂', risk: '高' },
    { suffix: '制造基地', risk: '中' }
  ];
  const factory = factories[Math.floor(Math.random() * factories.length)];
  targets.push({
    name: `${name}${factory.suffix}`,
    type: 'factory',
    position: [lng + 0.07, lat - 0.03],
    risk: factory.risk
  });
  
  // 5. 军事基地（部分重要城市）
  const importantCities = ['changchun', 'taiyuan', 'wenzhou', 'xining', 'lasa', 'jiayuguan', 
    'eerduosi', 'sanya', 'shantou', 'maoming', 'zhanjiang', 'guilin', 'dongguan'];
  if (importantCities.includes(key) || Math.random() > 0.7) {
    targets.push({
      name: `${name}军事基地`,
      type: 'military',
      position: [lng + 0.12, lat + 0.08],
      risk: '极高'
    });
  }
  
  // 6. 港口（沿海/沿江城市）
  const portCities = ['anqing', 'bengbu', 'changzhou', 'jiujiang', 'jining', 'lianyungang',
    'nantong', 'ningbo', 'qingdao', 'shanghai', 'suzhou', 'taizhou', 'weihai', 'wenzhou',
    'wuhu', 'yangzhou', 'yantai', 'zhangjiagang', 'zhenjiang', 'zhoushan', 'fangchenggang',
    'beihai', 'qinzhou', 'zhanjiang', 'maoming', 'shantou', 'shenzhen', 'zhuhai', 'jiangmen',
    'zhaoqing', 'yangjiang', 'shanwei', 'huizhou', 'guangzhou', 'dongguan', 'foshan', 'zhongshan'];
  
  if (portCities.includes(key)) {
    targets.push({
      name: `${name}港`,
      type: 'port',
      position: [lng - 0.08, lat - 0.06],
      risk: '中'
    });
  }
  
  // 为每个目标生成ID
  return targets.map((t, i) => ({
    id: `${key}_nt${String(i+1).padStart(3, '0')}`,
    ...t
  }));
}

// 为所有缺少targets的城市生成数据
const targetsData = {};
for (const city of citiesWithoutTargets) {
  targetsData[city.key] = generateTargets(city);
}

// 保存生成的targets数据
fs.writeFileSync('generated_targets.json', JSON.stringify(targetsData, null, 2));
console.log(`已为 ${Object.keys(targetsData).length} 个城市生成核打击目标数据`);

// 统计
let totalTargets = 0;
for (const [key, targets] of Object.entries(targetsData)) {
  totalTargets += targets.length;
}
console.log(`总计生成 ${totalTargets} 个核打击目标`);
