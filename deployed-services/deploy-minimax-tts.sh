#!/bin/bash
# MiniMax TTS 服务部署脚本
# 一键部署 MiniMax 语音合成 API 服务

SERVICE_NAME="minimax-tts-service"
SERVICE_DIR="/opt/minimax-tts"
API_KEY="${MINIMAX_API_KEY:-sk-api-CLG80bOIloZIHtXBdpGIn7n4NpN7dB8j7ecaKLYMfWautN6iQOuk_r8TwHoRLisF-3hExLkuHuHtK6HJsu60Xxf1luEkxBRBNKkhIm8jhudXs4fHrI1QVSA}"

echo "🎙️ 部署 MiniMax TTS 服务..."

# 创建服务目录
sudo mkdir -p $SERVICE_DIR
cd $SERVICE_DIR

# 创建简单的 HTTP API 服务
cat > tts_server.py << 'PYTHON_EOF'
#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import urllib.parse
import os

API_KEY = os.getenv("MINIMAX_API_KEY", "")

def minimax_tts(text, voice="male-qn-qingse", model="speech-2.8-turbo"):
    url = "https://api.minimaxi.com/v1/t2a_v2"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": model,
        "text": text,
        "voice_id": voice,
        "response_format": "mp3"
    }
    req = urllib.request.Request(url, json.dumps(data).encode(), headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            result = json.loads(resp.read().decode())
            if "data" in result and "audio" in result["data"]:
                return {"success": True, "audio_base64": result["data"]["audio"]}
            return {"success": False, "error": result.get("message", "Unknown error")}
    except Exception as e:
        return {"success": False, "error": str(e)}

class TTSHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/tts":
            content_length = int(self.headers['Content-Length'])
            post_data = json.loads(self.rfile.read(content_length))
            
            text = post_data.get("text", "")
            voice = post_data.get("voice", "male-qn-qingse")
            
            result = minimax_tts(text, voice)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({
            "service": "MiniMax TTS API",
            "status": "running",
            "endpoints": ["/tts"]
        }).encode())
    
    def log_message(self, format, *args):
        pass  # 静默日志

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    print(f"🚀 TTS服务启动在端口 {port}")
    HTTPServer(("0.0.0.0", port), TTSHandler).serve_forever()
PYTHON_EOF

chmod +x tts_server.py

# 创建 systemd 服务
cat > /tmp/minimax-tts.service << 'SYSTEMD_EOF'
[Unit]
Description=MiniMax TTS Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/minimax-tts
Environment="MINIMAX_API_KEY=API_KEY_PLACEHOLDER"
Environment="PORT=8080"
ExecStart=/usr/bin/python3 /opt/minimax-tts/tts_server.py
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SYSTEMD_EOF

sed -i "s/API_KEY_PLACEHOLDER/$API_KEY/g" /tmp/minimax-tts.service
sudo mv /tmp/minimax-tts.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable minimax-tts

echo "✅ MiniMax TTS 服务部署完成"
echo "📍 服务地址: http://localhost:8080"
echo "🔧 启动命令: sudo systemctl start minimax-tts"
