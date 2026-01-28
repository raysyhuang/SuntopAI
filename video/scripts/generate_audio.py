import asyncio
import edge_tts
import json
import os

# Chinese female voice (professional, clear)
VOICE = "zh-CN-XiaoxiaoNeural"
OUTPUT_DIR = "../public/audio"

scripts = {
    "home": """SuntopAI，智能血液透析管理平台。
我们已连接超过3000台透析设备，服务25家以上合作医院，实现5秒级数据采集，预警准确率高达95%。
平台提供中央监控系统、AI智能预警、移动端管理三大核心功能，让透析治疗更安全、更高效。""",
    
    "platform": """数字化透析平台，六大核心模块，全流程智能管理。
中央监控系统，实时监控所有透析设备。
数字化查房，移动端高效完成查房。
AI智能终端，智能辅助临床决策。
血压体重助手，精准管理患者数据。
足部管理模块，预防糖尿病足并发症。
耗材管理系统，智能库存与追溯。""",
    
    "clinical": """临床应用，精细化管理，提升透析质量。
通过AI赋能，实现不良事件减少40%，临床效率提升35%，预警准确率95%。
三大管理方向：
中心管理，优化患者信息、治疗方案和质量控制。
患者管理，提供个性化治疗、健康档案和随访服务。
IT基础设施，确保设备互联、数据安全和系统集成。""",
    
    "deployment": """灵活部署方案，专业团队全程护航。
四步完成部署：
需求评估，深入了解医院需求。
系统配置，定制化平台部署。
设备对接，无缝集成透析设备。
培训上线，专业支持确保顺利运行。
全方位安全保障，包括数据加密、访问控制、审计追踪和云端备份。
SuntopAI，让透析更智能，更安全。
访问 www.suntopai.com 了解更多。"""
}

async def generate_audio(name: str, text: str):
    """Generate audio file from text using edge-tts"""
    output_file = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    
    communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
    await communicate.save(output_file)
    print(f"Generated: {output_file}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    tasks = [generate_audio(name, text) for name, text in scripts.items()]
    await asyncio.gather(*tasks)
    print("\nAll audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
