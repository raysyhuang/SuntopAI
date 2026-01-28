import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";

// Clinical intro with outcomes
const ClinicalIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const outcomes = [
    { value: "↓40%", label: "不良事件减少" },
    { value: "↑35%", label: "临床效率提升" },
    { value: "95%", label: "预警准确率" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 80,
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring, marginBottom: 60 }}>
        <div
          style={{
            display: "inline-block",
            padding: "12px 32px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: 50,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Clinical
          </span>
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
          临床应用
        </h1>
        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 16 }}>
          精细化管理，全面提升透析质量
        </p>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {outcomes.map((outcome, index) => {
          const delay = 40 + index * 20;
          const outcomeSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 24,
                padding: "40px 60px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.2)",
                transform: `scale(${outcomeSpring}) translateY(${(1 - outcomeSpring) * 30}px)`,
                opacity: outcomeSpring,
              }}
            >
              <span style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>
                {outcome.value}
              </span>
              <p style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 12 }}>
                {outcome.label}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Management area detailed scene
const ManagementAreaScene: React.FC<{ areaIndex: number }> = ({ areaIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const areas = [
    {
      icon: "🏥",
      title: "中心管理",
      subtitle: "面向透析中心管理者",
      sections: [
        {
          name: "患者信息管理",
          desc: "建立完整患者档案，包括基本信息、透析处方、过敏史、合并症，支持患者分组管理",
        },
        {
          name: "治疗方案优化",
          desc: "AI分析每位患者透析效果，提出处方调整建议，帮助医生优化透析方案",
        },
        {
          name: "质量控制分析",
          desc: "自动生成质控报表，Kt/V达标率、血红蛋白控制率等指标，支持与国家标准对比",
        },
      ],
    },
    {
      icon: "👤",
      title: "患者管理",
      subtitle: "面向患者全病程管理",
      sections: [
        {
          name: "个性化治疗",
          desc: "为每位患者定制透析处方，根据透析反应动态调整，满足个体差异需求",
        },
        {
          name: "健康档案",
          desc: "整合透析记录、检验结果、影像资料，形成完整健康档案，随时查阅病史",
        },
        {
          name: "随访管理",
          desc: "支持远程随访，患者通过小程序上传健康数据，医生远程指导",
        },
      ],
    },
    {
      icon: "💻",
      title: "IT基础设施",
      subtitle: "平台稳定运行的技术保障",
      sections: [
        {
          name: "设备互联",
          desc: "支持对接主流透析机品牌：费森尤斯、贝朗、日机装等，统一数据采集管理",
        },
        {
          name: "数据安全",
          desc: "医疗级数据加密标准，支持私有化部署，确保患者数据安全和隐私保护",
        },
        {
          name: "系统集成",
          desc: "支持与医院HIS、LIS、PACS系统对接，实现数据互通，避免信息孤岛",
        },
      ],
    },
  ];

  const area = areas[areaIndex];
  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: areaIndex % 2 === 0 ? "#ffffff" : "#f5f5f7",
        padding: 80,
      }}
    >
      <div style={{ maxWidth: 1600, margin: "0 auto", height: "100%" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 48,
            transform: `translateY(${(1 - titleSpring) * -30}px)`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(0,125,115,0.1) 0%, rgba(0,125,115,0.05) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            {area.icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
                {area.title}
              </h2>
              <span
                style={{
                  padding: "6px 16px",
                  background: "rgba(0,125,115,0.1)",
                  borderRadius: 20,
                  fontSize: 14,
                  color: "#007d73",
                  fontFamily: "system-ui",
                }}
              >
                Part {areaIndex + 1}/3
              </span>
            </div>
            <p style={{ fontSize: 20, color: "#6e6e73", fontFamily: "system-ui", marginTop: 8 }}>
              {area.subtitle}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {area.sections.map((section, index) => {
            const sectionDelay = 30 + index * 30;
            const sectionSpring = spring({ frame: frame - sectionDelay, fps, config: { damping: 15, stiffness: 100 } });

            return (
              <div
                key={index}
                style={{
                  background: areaIndex % 2 === 0 ? "#f5f5f7" : "#ffffff",
                  borderRadius: 24,
                  padding: 40,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 32,
                  transform: `translateX(${(1 - sectionSpring) * 50}px)`,
                  opacity: sectionSpring,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 24, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: 28, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
                    {section.name}
                  </h3>
                  <p style={{ fontSize: 18, color: "#6e6e73", fontFamily: "system-ui", marginTop: 12, lineHeight: 1.6 }}>
                    {section.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Clinical Scene
export const ClinicalDetailedScene: React.FC = () => {
  // Timing based on ~166 seconds audio (4980 frames at 30fps)
  // Intro: 0-20s (600 frames)
  // Each area: ~48s each (1440 frames)
  const INTRO_DURATION = 600;
  const AREA_DURATION = 1440;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={INTRO_DURATION + 60}>
        <ClinicalIntro />
      </Sequence>

      {[0, 1, 2].map((index) => (
        <Sequence
          key={index}
          from={INTRO_DURATION + index * AREA_DURATION}
          durationInFrames={AREA_DURATION + 60}
        >
          <ManagementAreaScene areaIndex={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
