#!/bin/bash
# Seedance 2.0 视频生成服务部署脚本

SERVICE_NAME="seedance-video-service"
SERVICE_DIR="/opt/seedance-video"
API_KEY="${ARK_API_KEY:-YOUR_ARK_API_KEY}"

echo "🎬 部署 Seedance 2.0 视频生成服务..."

# 创建服务目录
sudo mkdir -p $SERVICE_DIR
cd $SERVICE_DIR

# 创建 HTTP API 服务
cat > video_server.py << 'PYTHON_EOF'
#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import os
import time

API_KEY = os.getenv("ARK_API_KEY", "")

def create_video_task(prompt, duration=5, ratio="16:9"):
    url = "https://ark.cn-beijing.volces.com/api/v3/content_generation/tasks"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": "doubao-seedance-2-0-260128",
        "content": [{"type": "text", "text": prompt}],
        "generate_audio": True,
        "ratio": ratio,
        "duration": duration,
        "watermark": True
    }
    req = urllib.request.Request(url, json.dumps(data).encode(), headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode())
            return result.get("id"), result.get("message")
    except Exception as e:
        return None, str(e)

def check_task_status(task_id):
    url = f"https://ark.cn-beijing.volces.com/api/v3/content_generation/tasks/{task_id}"
    headers = {"Authorization": f"Bearer {API_KEY}"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return {"error": str(e)}

class VideoHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/video":
            content_length = int(self.headers['Content-Length'])
            post_data = json.loads(self.rfile.read(content_length))
            
            prompt = post_data.get("prompt", "")
            duration = post_data.get("duration", 5)
            ratio = post_data.get("ratio", "16:9")
            
            task_id, error = create_video_task(prompt, duration, ratio)
            
            self.send_response(200 if task_id else 500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": task_id is not None,
                "task_id": task_id,
                "error": error
            }).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        if self.path.startswith("/status/"):
            task_id = self.path.split("/")[-1]
            status = check_task_status(task_id)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(status).encode())
        else:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "service": "Seedance 2.0 Video API",
                "status": "running",
                "endpoints": ["/video (POST)", "/status/{task_id} (GET)"]
            }).encode())
    
    def log_message(self, format, *args):
        pass

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8081))
    print(f"🚀 Seedance服务启动在端口 {port}")
    HTTPServer(("0.0.0.0", port), VideoHandler).serve_forever()
PYTHON_EOF

chmod +x video_server.py

# 创建 systemd 服务
cat > /tmp/seedance-video.service << 'SYSTEMD_EOF'
[Unit]
Description=Seedance 2.0 Video Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/seedance-video
Environment="ARK_API_KEY=API_KEY_PLACEHOLDER"
Environment="PORT=8081"
ExecStart=/usr/bin/python3 /opt/seedance-video/video_server.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SYSTEMD_EOF

sed -i "s/API_KEY_PLACEHOLDER/$API_KEY/g" /tmp/seedance-video.service
sudo mv /tmp/seedance-video.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable seedance-video

echo "✅ Seedance 2.0 服务部署完成"
echo "📍 服务地址: http://localhost:8081"
echo "🔧 启动命令: sudo systemctl start seedance-video"
echo "⚠️  注意: 需要先在火山引擎充值≥200元开通服务"
