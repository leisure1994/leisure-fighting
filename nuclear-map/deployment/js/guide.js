// ============================================
// 核战争城市自救地图 - 生存指南模块
// ============================================

class GuideModule {
    constructor() {
        this.currentSection = 'warning';
        this.guideData = this.initializeGuideData();
        
        this.init();
    }
    
    init() {
        this.renderGuide();
        this.bindEvents();
        console.log('📖 生存指南模块初始化完成');
    }
    
    initializeGuideData() {
        return {
            warning: {
                title: '核爆预警识别',
                icon: 'fa-radiation',
                content: this.getWarningContent()
            },
            evacuate: {
                title: '紧急撤离指南',
                icon: 'fa-running',
                content: this.getEvacuateContent()
            },
            shelter: {
                title: '避难所选择',
                icon: 'fa-house-damage',
                content: this.getShelterContent()
            },
            supplies: {
                title: '必备物资清单',
                icon: 'fa-box-open',
                content: this.getSuppliesContent()
            },
            skills: {
                title: '生存技能教程',
                icon: 'fa-hands-helping',
                content: this.getSkillsContent()
            },
            health: {
                title: '医疗急救知识',
                icon: 'fa-heartbeat',
                content: this.getHealthContent()
            }
        };
    }
    
    getWarningContent() {
        return `
            <div class="guide-card">
                <h4><i class="fas fa-bell"></i> 预警信号识别</h4>
                <p>核战争预警通常通过以下方式发布：</p>
                <ul>
                    <li><strong>防空警报：</strong>持续长鸣声表示核攻击预警</li>
                    <li><strong>手机短信：</strong>国家应急广播系统推送</li>
                    <li><strong>电视/广播：</strong>紧急插播新闻</li>
                    <li><strong>社交媒体：</strong>官方账号发布紧急通知</li>
                </ul>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-eye"></i> 核爆闪光特征</h4>
                <p>核爆炸会产生极其明亮的闪光，特征包括：</p>
                <ul>
                    <li>比太阳亮数倍的白色或蓝白色闪光</li>
                    <li>持续时间数秒</li>
                    <li>伴随强烈的热辐射</li>
                    <li>切勿直视闪光，会致失明</li>
                </ul>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-clock"></i> 预警响应时间</h4>
                <ul>
                    <li><strong>早期预警：</strong>导弹发射后15-30分钟</li>
                    <li><strong>紧急预警：</strong>核爆前5-10分钟</li>
                    <li><strong>立即行动：</strong>看到闪光后立即防护</li>
                </ul>
            </div>
            
            <div class="guide-card" style="border-left-color: var(--color-danger);">
                <h4><i class="fas fa-exclamation-triangle"></i> 重要提醒</h4>
                <p>核爆闪光后，<strong style="color: var(--color-danger);">立即寻找掩体</strong>，因为：</p>
                <ul>
                    <li>冲击波将在闪光后<strong>数秒至数分钟</strong>到达</li>
                    <li>早期核辐射随后出现</li>
                    <li>放射性沉降将在<strong>1小时内</strong>开始</li>
                </ul>
            </div>
        `;
    }
    
    getEvacuateContent() {
        return `
            <div class="guide-card">
                <h4><i class="fas fa-route"></i> 撤离路线规划</h4>
                <p>核爆发生后，撤离路线应考虑：</p>
                <ol>
                    <li><strong>避开爆心方向：</strong>远离核爆中心</li>
                    <li><strong>选择硬化道路：</strong>避免易塌方的土质道路</li>
                    <li><strong>利用地下通道：</strong>地铁、地下隧道是最佳选择</li>
                    <li><strong>逆风撤离：</strong>避免处于放射性烟云下方</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-car"></i> 交通工具选择</h4>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <tr style="background: var(--color-surface-light);">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">交通工具</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">推荐度</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">注意事项</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">地铁</td>
                        <td style="padding: 10px; text-align: center; color: var(--color-success);">★★★★★</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">最佳防护，直接到达地下</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">私家车</td>
                        <td style="padding: 10px; text-align: center; color: var(--color-warning);">★★★☆☆</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">关闭车窗，开启内循环</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">公交车</td>
                        <td style="padding: 10px; text-align: center; color: var(--color-warning);">★★☆☆☆</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">人员密集，尽量避免</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">步行</td>
                        <td style="padding: 10px; text-align: center; color: var(--color-danger);">★☆☆☆☆</td>
                        <td style="padding: 10px;">最后选择，尽量靠近建筑</td>
                    </tr>
                </table>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-running"></i> 撤离行动原则</h4>
                <ul>
                    <li><strong>保持冷静：</strong>快速但有序地行动</li>
                    <li><strong>携带必需品：</strong>72小时应急包</li>
                    <li><strong>穿着防护：</strong>长袖长裤，减少皮肤暴露</li>
                    <li><strong>佩戴口罩：</strong>减少放射性尘埃吸入</li>
                    <li><strong>避免接触：</strong>不要触摸可疑物体</li>
                    <li><strong>保持距离：</strong>与他人保持2米以上距离</li>
                </ul>
            </div>
        `;
    }
    
    getShelterContent() {
        return `
            <div class="guide-card">
                <h4><i class="fas fa-building"></i> 避难所类型优先级</h4>
                <ol>
                    <li><strong style="color: var(--color-metro);">地铁站</strong> - 深度大，防护最好</li>
                    <li><strong style="color: var(--color-government);">政府避难所</strong> - 专门设计，设施齐全</li>
                    <li><strong style="color: var(--color-air-raid);">人防工程</strong> - 专业防护结构</li>
                    <li><strong style="color: var(--color-underground);">地下停车场</strong> - 混凝土结构，防护较好</li>
                    <li><strong style="color: var(--color-shopping);">地下商场</strong> - 空间较大，但人员多</li>
                    <li><strong style="color: var(--color-hospital);">医院防空设施</strong> - 有医疗条件</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-shield-alt"></i> 进入避难所流程</h4>
                <ol>
                    <li><strong>快速进入：</strong>不要在外停留</li>
                    <li><strong>脱除外衣：</strong>在门口去除可能沾染的衣物</li>
                    <li><strong>清洗暴露部位：</strong>用湿巾擦拭皮肤</li>
                    <li><strong>更换衣物：</strong>穿干净衣物或防护服</li>
                    <li><strong>登记信息：</strong>配合管理人员登记</li>
                    <li><strong>寻找指定区域：</strong>前往分配的避难区域</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-ruler-vertical"></i> 深度与防护效果</h4>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: var(--color-surface-light);">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">地下深度</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">辐射衰减</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">推荐程度</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">地面建筑</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">50%</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">不推荐</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">地下1层</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">75%</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">一般</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">地下2层</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">90%</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">推荐</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">地下3层+</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">99%+</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">最佳</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">地铁隧道</td>
                        <td style="padding: 10px; text-align: center;">99.9%</td>
                        <td style="padding: 10px;">最佳</td>
                    </tr>
                </table>
            </div>
            
            <div class="guide-card" style="border-left-color: var(--color-warning);">
                <h4><i class="fas fa-clock"></i> 避难持续时间</h4>
                <ul>
                    <li><strong>最少48小时：</strong>放射性尘埃初期沉降</li>
                    <li><strong>建议7-14天：</strong>外部辐射水平降至安全</li>
                    <li><strong>关注官方通知：</strong>等待撤离指令</li>
                </ul>
            </div>
        `;
    }
    
    getSuppliesContent() {
        return `
            <div class="guide-card">
                <h4><i class="fas fa-list-check"></i> 72小时应急包清单</h4>
                <div class="guide-checklist">
                    <div class="checklist-item">
                        <input type="checkbox" id="water" checked>
                        <label for="water"><strong>饮用水</strong> - 每人每天至少4升，准备3天量</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="food">
                        <label for="food"><strong>食物</strong> - 压缩饼干、罐头、能量棒等耐储食品</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="radio">
                        <label for="radio"><strong>收音机</strong> - 手摇或电池供电，接收应急广播</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="flashlight">
                        <label for="flashlight"><strong>手电筒</strong> - 带备用电池</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="medkit">
                        <label for="medkit"><strong>急救包</strong> - 绷带、消毒液、常用药品</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="mask">
                        <label for="mask"><strong>防护口罩</strong> - N95或更高级别</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="whistle">
                        <label for="whistle"><strong>哨子</strong> - 求救信号</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="cash">
                        <label for="cash"><strong>现金</strong> - 停电时无法使用电子支付</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="clothes">
                        <label for="clothes"><strong>备用衣物</strong> - 保暖、舒适</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="documents">
                        <label for="documents"><strong>重要证件</strong> - 身份证、医保卡复印件</label>
                    </div>
                </div>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-pills"></i> 常备药品</h4>
                <ul>
                    <li><strong>碘化钾片：</strong>核爆前或后服用，保护甲状腺</li>
                    <li><strong>止泻药：</strong>防止腹泻脱水</li>
                    <li><strong>止痛药：</strong>布洛芬或对乙酰氨基酚</li>
                    <li><strong>抗生素：</strong>处方药，咨询医生</li>
                    <li><strong>抗过敏药：</strong>氯雷他定等</li>
                    <li><strong>个人常用药：</strong>慢性病药物至少7天量</li>
                </ul>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-tint"></i> 水源处理</h4>
                <p>核污染水源处理方法：</p>
                <ol>
                    <li><strong>过滤：</strong>使用活性炭或专业滤水器</li>
                    <li><strong>静置沉淀：</strong>让放射性颗粒沉降</li>
                    <li><strong>煮沸：</strong>虽然不能完全去除放射性，但可杀菌</li>
                    <li><strong>专业检测：</strong>有条件时使用盖革计数器检测</li>
                </ol>
                <p style="margin-top: 10px; color: var(--color-danger);">
                    <i class="fas fa-exclamation-triangle"></i> 
                    不确定污染情况时，宁可缺水也不要饮用可疑水源
                </p>
            </div>
        `;
    }
    
    getSkillsContent() {
        return `
            <div class="guide-card">
                <h4><i class="fas fa-mask"></i> 防护装备穿戴</h4>
                <ol>
                    <li><strong>N95口罩：</strong>金属条朝上，覆盖口鼻下巴</li>
                    <li><strong>护目镜：</strong>防止放射性尘埃进入眼睛</li>
                    <li><strong>雨衣/防护服：</strong>长袖长裤，减少皮肤暴露</li>
                    <li><strong>手套：</strong>一次性或橡胶手套</li>
                    <li><strong>胶鞋：</strong>避免皮鞋或布鞋</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-shower"></i> 去污处理</h4>
                <p>疑似沾染放射性物质后：</p>
                <ol>
                    <li><strong>立即脱衣：</strong>小心脱下外层衣物，放入密封袋</li>
                    <li><strong>淋浴清洗：</strong>用温水和肥皂彻底清洗</li>
                    <li><strong>清洗顺序：</strong>从上到下，耳朵、头发特别注意</li>
                    <li><strong>伤口处理：</strong>如有伤口，先清洗周围皮肤</li>
                    <li><strong>更换干净衣物：</strong>避免二次污染</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-broadcast-tower"></i> 信息获取技巧</h4>
                <ul>
                    <li><strong>广播频率：</strong>记住当地应急广播频率</li>
                    <li><strong>短波电台：</strong>国家级应急广播覆盖广</li>
                    <li><strong>官方APP：</strong>提前下载应急管理部APP</li>
                    <li><strong>短信服务：</strong>保持手机电量，接收紧急通知</li>
                    <li><strong>谣言辨别：</strong>只信官方渠道，不传谣</li>
                </ul>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-users"></i> 互助与心理</h4>
                <ul>
                    <li><strong>互相帮助：</strong>协助老人、儿童、残障人士</li>
                    <li><strong>保持秩序：</strong>避免恐慌性踩踏</li>
                    <li><strong>心理安抚：</strong>安慰情绪不稳定的同伴</li>
                    <li><strong>分享资源：</strong>在能力范围内帮助他人</li>
                    <li><strong>保持希望：</strong>相信救援终将到来</li>
                </ul>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-radiation-alt"></i> 简易辐射检测</h4>
                <p>没有专业设备时的判断方法：</p>
                <ul>
                    <li><strong>静电干扰：</strong>收音机出现严重噪音</li>
                    <li><strong>植物观察：</strong>植物叶片出现异常变色</li>
                    <li><strong>金属反应：</strong>金属表面出现异常锈蚀</li>
                    <li><strong>身体感觉：</strong>皮肤刺痛、恶心（严重暴露时）</li>
                </ul>
                <p style="margin-top: 10px; color: var(--color-warning);">
                    <i class="fas fa-info-circle"></i> 
                    有条件时建议配备便携式盖革计数器
                </p>
            </div>
        `;
    }
    
    getHealthContent() {
        return `
            <div class="guide-card" style="border-left-color: var(--color-danger);">
                <h4><i class="fas fa-procedures"></i> 急性辐射病症状</h4>
                <p>按严重程度分级：</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: var(--color-surface-light);">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">程度</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">症状</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">轻度 (1-2 Gy)</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">恶心、乏力、白细胞减少</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">中度 (2-4 Gy)</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">呕吐、腹泻、脱发</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">重度 (4-6 Gy)</td>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">严重呕吐、出血、感染风险</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">极重度 (>6 Gy)</td>
                        <td style="padding: 10px;">休克、意识障碍、生命危险</td>
                    </tr>
                </table>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-first-aid"></i> 急救基本原则</h4>
                <ol>
                    <li><strong>去污优先：</strong>先去除放射性污染</li>
                    <li><strong>生命体征：</strong>检查呼吸、心跳、意识</li>
                    <li><strong>止血包扎：</strong>处理外伤</li>
                    <li><strong>补液：</strong>呕吐腹泻者补充水分</li>
                    <li><strong>保暖：</strong>防止体温过低</li>
                    <li><strong>隔离标记：</strong>标记辐射伤员以便后续处理</li>
                </ol>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-heartbeat"></i> 心肺复苏 (CPR)</h4>
                <p>辐射伤员CPR注意事项：</p>
                <ol>
                    <li><strong>防护用品：</strong>戴手套、口罩进行CPR</li>
                    <li><strong>胸外按压：</strong>每分钟100-120次，深度5-6厘米</li>
                    <li><strong>人工呼吸：</strong>30次按压后2次呼吸</li>
                    <li><strong>持续进行：</strong>直到专业救援到达</li>
                </ol>
                <p style="margin-top: 10px; color: var(--color-info);">
                    <i class="fas fa-info-circle"></i> 
                    使用呼吸膜可降低直接接触风险
                </p>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-pills"></i> 碘化钾服用指南</h4>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="background: var(--color-surface-light);">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid var(--color-border);">年龄组</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">剂量</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">成人 (>18岁)</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">130 mg</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">青少年 (12-18岁)</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">130 mg</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">儿童 (3-12岁)</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">65 mg</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid var(--color-border);">婴儿 (1个月-3岁)</td>
                        <td style="padding: 10px; text-align: center; border-bottom: 1px solid var(--color-border);">32 mg</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px;">新生儿 (<1个月)</td>
                        <td style="padding: 10px; text-align: center;">16 mg</td>
                    </tr>
                </table>
                <p style="margin-top: 10px; color: var(--color-warning);">
                    <i class="fas fa-exclamation-triangle"></i> 
                    仅在有明确指示时服用，不可作为预防长期服用
                </p>
            </div>
            
            <div class="guide-card">
                <h4><i class="fas fa-hospital"></i> 何时寻求医疗帮助</h4>
                <p>出现以下情况需紧急就医：</p>
                <ul>
                    <li>持续呕吐超过24小时</li>
                    <li>严重腹泻或血便</li>
                    <li>皮肤出现不明原因烧伤或溃烂</li>
                    <li>持续发热超过38.5°C</li>
                    <li>出血不止</li>
                    <li>呼吸困难</li>
                    <li>意识模糊或昏迷</li>
                </ul>
            </div>
        `;
    }
    
    renderGuide() {
        const container = document.getElementById('guide-sections');
        if (!container) return;
        
        let html = '';
        for (const [key, section] of Object.entries(this.guideData)) {
            html += `
                <div class="guide-section ${key === this.currentSection ? 'active' : ''}" data-section="${key}">
                    ${section.content}
                </div>
            `;
        }
        
        container.innerHTML = html;
    }
    
    bindEvents() {
        // 导航点击事件
        const navItems = document.querySelectorAll('.guide-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });
    }
    
    switchSection(section) {
        this.currentSection = section;
        
        // 更新导航状态
        document.querySelectorAll('.guide-nav-item').forEach(item => {
            if (item.dataset.section === section) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // 更新内容显示
        document.querySelectorAll('.guide-section').forEach(sec => {
            if (sec.dataset.section === section) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });
    }
    
    // 导出指南为PDF（简化版，实际需要使用库如jsPDF）
    exportGuide() {
        const guideText = Object.entries(this.guideData)
            .map(([key, section]) => {
                return `# ${section.title}\n\n${this.stripHtml(section.content)}\n\n`;
            })
            .join('---\n\n');
        
        const blob = new Blob([guideText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '核战争生存指南.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}

// 初始化时暴露到全局
window.GuideModule = GuideModule;
