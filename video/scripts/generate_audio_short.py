import asyncio
import edge_tts
import os

# Chinese female voice
VOICE = "zh-CN-XiaoxiaoNeural"
OUTPUT_DIR = "../public/audio"

# Condensed scripts for 2-2.5 minute video (~30s per section)
scripts = {
    "home": """SuntopAI，智能血液透析管理平台。
中国有超过120万血液透析患者，我们致力于让每一次透析都更安全。
目前已连接超过3000台透析设备，服务55家以上合作医院，实现5秒级数据采集，AI预警准确率达95%。
SuntopAI，让透析更智能，更安全。""",

    "platform": """数字化透析平台，六大核心模块。
中央监控系统，实时监控所有透析设备状态。
数字化查房，移动端高效完成查房记录。
AI智能终端，边缘计算实现实时预警。
血压体重助手，精准管理患者数据。
足部管理模块，预防糖尿病足并发症。
智慧供应链，耗材全程可追溯管理。
六大模块协同，构建完整的数字化透析管理体系。""",

    "clinical": """临床应用，精细化管理。
通过AI赋能，不良事件减少40%，临床效率提升35%。
三大管理方向：中心管理，优化治疗方案和质量控制。
患者管理，提供个性化治疗和健康档案。
IT基础设施，确保设备互联和数据安全。
精细化管理，让每位透析患者得到更好的照护。""",

    "deployment": """灵活部署，专业护航。
四步完成部署：需求评估、系统配置、设备对接、培训上线。
已支持50多种透析机型号，对接成功率超过99%。
全方位安全保障：数据加密、访问控制、审计追踪、云端备份。
SuntopAI，让透析更智能，更安全。
访问 able to www.suntopai.com 了解更多。"""
}

async def generate_audio(name: str, text: str):
    output_file = os.path.join(OUTPUT_DIR, f"{name}.mp3")
    communicate = edge_tts.Communicate(text, VOICE, rate="-3%")
    await communicate.save(output_file)
    print(f"Generated: {output_file}")

async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for name, text in scripts.items():
        await generate_audio(name, text)
    print("\nAll short audio files generated!")

if __name__ == "__main__":
    asyncio.run(main())
