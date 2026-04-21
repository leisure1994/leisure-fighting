# 🚀 销售启动执行脚本
# 运行此脚本开始实际销售推广

import os
import time

SALES_DIR = "/root/.openclaw/workspace/sales"

def show_header():
    print("=" * 50)
    print("🎯 销售启动 - 立即开始赚钱")
    print("=" * 50)
    print()

def show_products():
    print("📦 可销售产品:")
    print("  1. 天道引擎完整版 - ¥299")
    print("  2. 完整套装 - ¥499 (推荐)")
    print("  3. 批量生成工具 - ¥99")
    print()

def show_actions():
    print("🎯 立即执行动作:")
    print()
    print("【动作1】朋友圈推广")
    print("  复制以下内容到朋友圈:")
    print("  " + "-" * 40)
    with open(f"{SALES_DIR}/promo-card.txt", "r") as f:
        for line in f.readlines()[:10]:
            print(f"  {line.rstrip()}")
    print("  " + "-" * 40)
    print()
    
    print("【动作2】技术社区推广")
    print(f"  文件: {SALES_DIR}/v2ex-post.md")
    print("  复制内容到V2EX发布")
    print()
    
    print("【动作3】知乎引流")
    print(f"  文件: {SALES_DIR}/zhihu-answers.md")
    print("  回答相关问题")
    print()

def show_status():
    print("📊 当前状态:")
    print("  ✅ 产品已就绪")
    print("  ✅ 销售素材已备齐")
    print("  ✅ 话术模板已准备")
    print("  🔄 等待客户咨询")
    print()

def main():
    show_header()
    show_products()
    show_actions()
    show_status()
    
    print("=" * 50)
    print("💰 目标: 本周完成第一笔销售")
    print("⏰ 进度鞭: 每20分钟自检推进")
    print("=" * 50)

if __name__ == "__main__":
    main()
