#!/bin/bash
# ============================================
# 核战争城市自救地球仪 - 阿里云OSS部署脚本
# ============================================

# 配置
OSS_BUCKET="a-art-top"
OSS_ENDPOINT="oss-cn-hangzhou.aliyuncs.com"
LOCAL_DIR="/root/.openclaw/workspace/a-art-top/nuclear-globe"
REMOTE_DIR="nuclear-globe"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}===========================================${NC}"
echo -e "${GREEN}  核战争城市自救地球仪 - 部署工具${NC}"
echo -e "${GREEN}===========================================${NC}"

# 检查ossutil
echo -e "${YELLOW}[1/4] 检查OSS工具...${NC}"
if ! command -v ossutil &> /dev/null; then
    echo -e "${YELLOW}正在安装ossutil...${NC}"
    wget -q https://gosspublic.alicdn.com/ossutil/1.7.14/ossutil64 -O /usr/local/bin/ossutil
    chmod 755 /usr/local/bin/ossutil
fi

# 检查环境变量
echo -e "${YELLOW}[2/4] 检查阿里云凭证...${NC}"
if [ -z "$OSS_ACCESS_KEY_ID" ] || [ -z "$OSS_ACCESS_KEY_SECRET" ]; then
    echo -e "${RED}错误: 请设置环境变量 OSS_ACCESS_KEY_ID 和 OSS_ACCESS_KEY_SECRET${NC}"
    echo "例如: export OSS_ACCESS_KEY_ID=LTAI..."
    echo "      export OSS_ACCESS_KEY_SECRET=iNzb..."
    exit 1
fi

# 配置ossutil
echo -e "${YELLOW}[3/4] 配置OSS连接...${NC}"
ossutil config -e $OSS_ENDPOINT -i $OSS_ACCESS_KEY_ID -k $OSS_ACCESS_KEY_SECRET

# 创建Bucket (如果不存在)
echo -e "${YELLOW}[3.5/4] 确保Bucket存在...${NC}"
ossutil mb oss://$OSS_BUCKET 2>/dev/null || echo "Bucket已存在或无法创建"

# 上传文件
echo -e "${YELLOW}[4/4] 上传文件到OSS...${NC}"

echo "  - 上传 index.html..."
ossutil cp $LOCAL_DIR/index.html oss://$OSS_BUCKET/$REMOTE_DIR/index.html -f --acl public-read

echo "  - 上传 data_merged.js..."
ossutil cp $LOCAL_DIR/data_merged.js oss://$OSS_BUCKET/$REMOTE_DIR/data_merged.js -f --acl public-read

# 如果合并前的数据文件需要保留，也上传它们
for f in data.js data_part2.js data_part3.js data_part4.js data_part5.js data_part6.js data_part7.js data_part8.js batch3_data.js; do
    if [ -f "$LOCAL_DIR/$f" ]; then
        echo "  - 上传 $f..."
        ossutil cp $LOCAL_DIR/$f oss://$OSS_BUCKET/$REMOTE_DIR/$f -f --acl public-read 2>/dev/null || true
    fi
done

# 设置首页
echo -e "${YELLOW}[额外] 配置静态网站...${NC}"
ossutil website --oss-api-version V2 oss://$OSS_BUCKET --index index.html 2>/dev/null || true

echo ""
echo -e "${GREEN}===========================================${NC}"
echo -e "${GREEN}  部署完成!${NC}"
echo -e "${GREEN}===========================================${NC}"
echo ""
echo "访问地址:"
echo "  - 主页面: http://$OSS_BUCKET.oss-cn-hangzhou.aliyuncs.com/$REMOTE_DIR/"
echo "  - 自定义域名: http://a-art.top/$REMOTE_DIR/"
echo ""
echo -e "${YELLOW}注意: 首次访问可能需要等待CDN刷新${NC}"
