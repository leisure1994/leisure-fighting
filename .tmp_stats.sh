tao-world-engine 详细代码统计：

scripts/network/tao/ 目录：
- AgentCore.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/AgentCore.lua) 行
- EventLog.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/EventLog.lua) 行
- InkRuntime.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/InkRuntime.lua) 行
- Mempalace.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/Mempalace.lua) 行
- RegionGen.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/RegionGen.lua) 行
- Router.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/Router.lua) 行
- Tracery.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/Tracery.lua) 行
- Validator.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/network/tao/Validator.lua) 行

scripts/ 根目录：
- main.lua: $(wc -l < /root/.openclaw/workspace/tao-world-engine/scripts/main.lua) 行

total: $(find /root/.openclaw/workspace/tao-world-engine/scripts -name '*.lua' -exec wc -l {} + | tail -1)
