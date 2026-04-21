#!/bin/bash
# ============================================
# 自动化销售部署脚本
# 一键部署产品展示页面到本地服务器
# ============================================

PORT=8888
PRODUCT_DIR="/root/.openclaw/workspace/products"

echo "🚀 启动产品展示服务器..."
echo "   端口: $PORT"
echo "   目录: $PRODUCT_DIR"
echo ""

cd "$PRODUCT_DIR"

# 创建简单的HTTP服务器
python3 << 'PYEOF' &
code=$(cat <:<'PYTHON_CODE'
import http.server
import socketserver
import os

PORT = 8888
DIRECTORY = "/root/.openclaw/workspace/products"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🌐 服务器运行中: http://localhost:{PORT}")
    httpd.serve_forever()
PYTHON_CODE
echo "$code" | python3
PYEOF

SERVER_PID=$!
echo "   PID: $SERVER_PID"
echo ""
echo "📍 访问地址:"
echo "   本地: http://localhost:$PORT"
echo "   产品页: http://localhost:$PORT/index.html"
echo ""
echo "按 Ctrl+C 停止服务器"

wait $SERVER_PID
