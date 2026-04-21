#!/bin/bash
# 启动核战争城市自救地图并创建 Cloudflare Tunnel

cd /root/.openclaw/workspace/nuclear-survival-map

# 杀死已有的 Python HTTP 服务器
pkill -f "python3 -m http.server" 2>/dev/null

# 启动 HTTP 服务器
python3 -m http.server 8789 &
SERVER_PID=$!

echo "HTTP 服务器已启动 (PID: $SERVER_PID)"
echo "正在创建 Cloudflare Tunnel..."

# 创建 tunnel (临时)
cloudflared tunnel --url http://localhost:8789 2>&1 | tee /tmp/tunnel.log &
TUNNEL_PID=$!

echo "Tunnel PID: $TUNNEL_PID"
echo "等待 tunnel 建立..."
sleep 5

# 提取 URL
grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' /tmp/tunnel.log | head -1
