# 核战争城市自救地图 - 部署说明

## 📦 部署包信息

**文件**: `nuclear-map-final-deploy.tar.gz`  
**大小**: 92KB  
**位置**: `/root/.openclaw/workspace/nuclear-map/`

## 🌐 部署目标

- **域名**: a-art.top
- **路径**: /nuclear-map/
- **完整URL**: https://a-art.top/nuclear-map/

---

## 部署方式一：SSH自动部署（推荐）

**前提**: 你有 a-art.top 服务器的SSH访问权限

```bash
# 1. 进入项目目录
cd /root/.openclaw/workspace/nuclear-map

# 2. 运行部署脚本
bash deploy-to-a-art.sh
```

如果SSH需要密码，可以使用以下命令：

```bash
# 方式A: 使用sshpass自动输入密码（需安装sshpass）
sshpass -p '你的密码' scp -r deployment/* root@a-art.top:/var/www/html/nuclear-map/

# 方式B: 使用SSH密钥
scp -i ~/.ssh/your_key -r deployment/* root@a-art.top:/var/www/html/nuclear-map/
```

---

## 部署方式二：手动部署

### 步骤1: 下载部署包到本地

```bash
# 从服务器下载到本地电脑
scp root@your-server:/root/.openclaw/workspace/nuclear-map/nuclear-map-final-deploy.tar.gz ./
```

### 步骤2: 上传到 a-art.top 服务器

```bash
# 上传部署包
scp nuclear-map-final-deploy.tar.gz root@a-art.top:/tmp/

# SSH登录服务器
ssh root@a-art.top
```

### 步骤3: 在服务器上解压部署

```bash
# 进入服务器后执行
mkdir -p /var/www/html/nuclear-map
cd /var/www/html/nuclear-map
tar -xzf /tmp/nuclear-map-final-deploy.tar.gz --strip-components=1

# 设置权限
chown -R www-data:www-data /var/www/html/nuclear-map
chmod -R 755 /var/www/html/nuclear-map

# 重载Nginx
nginx -t && systemctl reload nginx
```

---

## 部署方式三：通过面板/FileZilla手动上传

如果你有宝塔面板、cPanel或其他Web管理面板：

1. 下载 `nuclear-map-final-deploy.tar.gz` 到本地
2. 解压得到 `deployment` 文件夹
3. 登录服务器面板或FTP
4. 在网站根目录创建 `nuclear-map` 文件夹
5. 上传 deployment 文件夹内的所有内容到 `nuclear-map/`

---

## Nginx配置参考

如果部署后访问遇到404问题，添加以下Nginx配置：

```nginx
server {
    listen 80;
    server_name a-art.top;
    
    # 核战争城市自救地图
    location /nuclear-map/ {
        alias /var/www/html/nuclear-map/;
        index index.html;
        try_files $uri $uri/ =404;
    }
    
    # ... 其他配置
}
```

---

## ✅ 部署验证清单

部署完成后，检查以下功能是否正常：

- [ ] 访问 https://a-art.top/nuclear-map/ 显示地图
- [ ] 左上角城市选择器显示30个城市
- [ ] 点击地图上的标记显示避难所信息
- [ ] 右侧筛选面板可以按类型筛选
- [ ] 生存指南页面可以正常阅读
- [ ] 移动端访问页面正常显示

---

## 📊 部署内容统计

| 项目 | 数量 |
|------|------|
| 覆盖城市 | 30个 |
| 避难所记录 | 218条 |
| 代码行数 | ~6,900行 |
| 总文件大小 | ~92KB |

### 覆盖城市列表

**直辖市**: 北京、上海、天津、重庆  
**东北**: 沈阳、大连、哈尔滨、长春  
**华北**: 郑州、济南、青岛  
**华东**: 南京、杭州、苏州、宁波、厦门、福州、南昌、合肥  
**华中**: 武汉、长沙  
**华南**: 广州、深圳、南宁  
**西南**: 成都、昆明、贵阳  
**西北**: 西安、兰州、乌鲁木齐

---

## 🆘 故障排除

### 问题1: 页面空白
**解决**: 检查CSS/JS文件路径是否正确，确保在 `/nuclear-map/` 路径下

### 问题2: 地图不显示
**解决**: 检查网络是否能访问 Leaflet CDN (unpkg.com)

### 问题3: 数据加载失败
**解决**: 检查 `data/` 目录下的JSON文件是否存在且权限正确

### 问题4: 403 Forbidden
**解决**: 检查文件权限，运行 `chmod -R 755 /var/www/html/nuclear-map`

---

**准备就绪，等待部署到 a-art.top/nuclear-map/**
