#!/usr/bin/env python3
"""
MiniMax TTS Service - 生产级语音合成API
端口: 8080
"""
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import urllib.request
import os
import base64

API_KEY = os.getenv("MINIMAX_API_KEY", "")
GROUP_ID = API_KEY.split("-")[2] if "-" in API_KEY and len(API_KEY.split("-")) > 2 else ""

def minimax_tts(text, voice="male-qn-qingse", model="speech-2.8-turbo"):
    """调用MiniMax TTS API"""
    url = "https://api.minimaxi.com/v1/t2a_v2"
    
    # MiniMax使用group_id + api_key的认证方式
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    data = {
        "model": model,
        "text": text,
        "voice_id": voice,
        "response_format": "mp3",
        "sample_rate": 32000,
        "group_id": GROUP_ID
    }
    
    req = urllib.request.Request(
        url, 
        json.dumps(data).encode('utf-8'), 
        headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode('utf-8'))
            
            # MiniMax返回的是hex编码的音频数据
            if result.get("base_resp", {}).get("status_code") == 0:
                audio_hex = result.get("data", {}).get("audio")
                if audio_hex:
                    # hex转base64便于传输
                    audio_bytes = bytes.fromhex(audio_hex)
                    audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
                    return {
                        "success": True, 
                        "audio_base64": audio_b64,
                        "format": "mp3",
                        "duration": result.get("data", {}).get("extra_info", {}).get("duration", 0)
                    }
            
            return {
                "success": False, 
                "error": result.get("base_resp", {}).get("status_msg", "API返回异常")
            }
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {"success": False, "error": f"HTTP {e.code}: {error_body}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

class TTSHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/tts":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = json.loads(self.rfile.read(content_length))
                
                text = post_data.get("text", "")
                voice = post_data.get("voice", "male-qn-qingse")
                model = post_data.get("model", "speech-2.8-turbo")
                
                if not text:
                    self.send_json({"success": False, "error": "text is required"}, 400)
                    return
                
                result = minimax_tts(text, voice, model)
                self.send_json(result, 200 if result["success"] else 500)
                
            except json.JSONDecodeError:
                self.send_json({"success": False, "error": "Invalid JSON"}, 400)
            except Exception as e:
                self.send_json({"success": False, "error": str(e)}, 500)
                
        else:
            self.send_json({"success": False, "error": "Not found"}, 404)
    
    def do_GET(self):
        if self.path == "/":
            self.send_json({
                "service": "MiniMax TTS API",
                "version": "1.0.0",
                "status": "running",
                "endpoints": {
                    "POST /tts": "语音合成",
                    "GET /": "服务状态"
                },
                "voices": ["male-qn-qingse", "male-qn-jingying", "female-shaonv", "female-yujie"]
            })
        elif self.path == "/health":
            self.send_json({"status": "healthy", "api_key_configured": bool(API_KEY)})
        else:
            self.send_json({"success": False, "error": "Not found"}, 404)
    
    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
    
    def log_message(self, format, *args):
        # 简化日志
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    print(f"🚀 MiniMax TTS服务启动")
    print(f"   端口: {port}")
    print(f"   API Key: {'已配置' if API_KEY else '未配置'}")
    print(f"   测试: curl http://localhost:{port}/")
    HTTPServer(("0.0.0.0", port), TTSHandler).serve_forever()
