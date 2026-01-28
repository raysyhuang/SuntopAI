import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";

// Deployment intro
const DeploymentIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring }}>
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
            Deployment
          </span>
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
          灵活部署方案
        </h1>
        <p style={{ fontSize: 28, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 16 }}>
          专业团队，全程护航
        </p>
        <div style={{ marginTop: 40, display: "flex", gap: 24, justifyContent: "center" }}>
          <div style={{ padding: "16px 32px", background: "rgba(255,255,255,0.2)", borderRadius: 16 }}>
            <span style={{ fontSize: 18, color: "#ffffff", fontFamily: "system-ui" }}>☁️ 云端部署</span>
          </div>
          <div style={{ padding: "16px 32px", background: "rgba(255,255,255,0.2)", borderRadius: 16 }}>
            <span style={{ fontSize: 18, color: "#ffffff", fontFamily: "system-ui" }}>🏢 本地私有化</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Deployment step detailed scene
const DeploymentStepScene: React.FC<{ stepIndex: number }> = ({ stepIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    {
      step: "01",
      title: "需求评估",
      subtitle: "深入了解，精准定位",
      description: "我们的技术顾问会深入医院，了解透析中心的规模、现有设备、信息化现状和管理痛点。根据评估结果，制定个性化的实施方案和项目计划。",
      points: ["透析中心规模评估", "现有设备盘点", "信息化现状分析", "管理痛点调研", "个性化方案制定"],
    },
    {
      step: "02",
      title: "系统配置",
      subtitle: "定制化部署",
      description: "根据医院需求，进行平台的定制化配置，包括科室设置、人员权限、透析班次、预警规则等。同时完成服务器部署和网络环境搭建。",
      points: ["科室架构配置", "人员权限设置", "透析班次规划", "预警规则定制", "服务器网络部署"],
    },
    {
      step: "03",
      title: "设备对接",
      subtitle: "核心技术实施",
      description: "技术实施的核心环节。我们的工程师到现场完成透析机数据采集对接。已支持50多种型号透析设备，对接成功率超过99%。",
      points: ["现场设备对接", "50+透析机型号支持", "99%对接成功率", "数据准确性验证", "采集数据核对"],
    },
    {
      step: "04",
      title: "培训上线",
      subtitle: "专业支持保障",
      description: "为医护人员提供全面系统培训，包括操作培训、预警处理流程、数据分析方法等。上线初期驻场支持，上线后7×24小时远程技术支持。",
      points: ["系统操作培训", "预警处理流程", "数据分析方法", "驻场工程师支持", "7×24远程支持"],
    },
  ];

  const step = steps[stepIndex];
  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: stepIndex % 2 === 0 ? "#ffffff" : "#f5f5f7",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", height: "100%", alignItems: "center", gap: 80 }}>
        {/* Left - Step visual */}
        <div
          style={{
            flex: "0 0 400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${titleSpring})`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 30px 60px rgba(0,125,115,0.3)",
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: 72, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>
              {step.step}
            </span>
          </div>
          
          {/* Progress indicator */}
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: i === stepIndex ? 40 : 12,
                  height: 12,
                  borderRadius: 6,
                  background: i === stepIndex ? "#007d73" : "#e5e5e5",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right - Content */}
        <div style={{ flex: 1, transform: `translateX(${(1 - titleSpring) * 50}px)`, opacity: titleSpring }}>
          <h2 style={{ fontSize: 56, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
            {step.title}
          </h2>
          <p style={{ fontSize: 24, color: "#007d73", fontFamily: "system-ui", marginTop: 8 }}>
            {step.subtitle}
          </p>
          <p style={{ fontSize: 20, color: "#6e6e73", fontFamily: "system-ui", marginTop: 24, lineHeight: 1.7 }}>
            {step.description}
          </p>

          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
            {step.points.map((point, index) => {
              const pointDelay = 40 + index * 12;
              const pointOpacity = interpolate(frame - pointDelay, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 20px",
                    background: stepIndex % 2 === 0 ? "#f5f5f7" : "#ffffff",
                    borderRadius: 12,
                    opacity: pointOpacity,
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#007d73" }} />
                  <span style={{ fontSize: 16, color: "#1d1d1f", fontFamily: "system-ui" }}>{point}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Security features scene
const SecurityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const features = [
    { icon: "🔒", title: "数据加密", desc: "所有数据传输和存储均采用医疗级加密标准" },
    { icon: "🛡️", title: "访问控制", desc: "支持细粒度权限管理，确保数据访问合规" },
    { icon: "📋", title: "审计追踪", desc: "所有操作完整日志记录，支持追溯审计" },
    { icon: "☁️", title: "云端备份", desc: "数据定期自动备份，支持快速恢复" },
  ];

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", padding: 80, justifyContent: "center" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60, transform: `scale(${titleSpring})`, opacity: titleSpring }}>
          <h2 style={{ fontSize: 48, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
            全方位安全保障
          </h2>
          <p style={{ fontSize: 24, color: "#6e6e73", fontFamily: "system-ui", marginTop: 16 }}>
            医疗级数据安全标准
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {features.map((feature, index) => {
            const delay = 30 + index * 15;
            const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

            return (
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  borderRadius: 24,
                  padding: 32,
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 20}px)`,
                  opacity: cardSpring,
                }}
              >
                <span style={{ fontSize: 48 }}>{feature.icon}</span>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", marginTop: 16 }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: "#6e6e73", fontFamily: "system-ui", marginTop: 12, lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Final closing scene
const FinalClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f0fdf9 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,125,115,${0.1 * glowIntensity}) 0%, transparent 60%)`,
        }}
      />

      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 32 }}>
          <div
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 20px 50px rgba(0,125,115,${0.3 * glowIntensity})`,
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui" }}>
            Suntop<span style={{ color: "#007d73" }}>AI</span>
          </span>
        </div>

        <h2 style={{ fontSize: 42, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
          让透析更智能，更安全
        </h2>
        <p style={{ fontSize: 22, color: "#6e6e73", fontFamily: "system-ui", marginTop: 16 }}>
          AI赋能血液透析全流程管理
        </p>

        <div
          style={{
            marginTop: 48,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "20px 48px",
            background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
            borderRadius: 50,
            boxShadow: `0 16px 40px rgba(0,125,115,${0.35 * glowIntensity})`,
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui" }}>
            了解更多
          </span>
        </div>

        <p style={{ fontSize: 32, color: "#007d73", fontFamily: "system-ui", fontWeight: 600, marginTop: 40, letterSpacing: "0.03em" }}>
          www.suntopai.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Main Deployment Scene
export const DeploymentDetailedScene: React.FC = () => {
  // Timing based on ~157 seconds audio (4710 frames at 30fps)
  // Intro: 0-12s (360 frames)
  // Each step: ~28s (840 frames)
  // Security: 20s (600 frames)
  // Closing: 17s (510 frames)
  const INTRO_DURATION = 360;
  const STEP_DURATION = 750;
  const SECURITY_DURATION = 600;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={INTRO_DURATION + 60}>
        <DeploymentIntro />
      </Sequence>

      {[0, 1, 2, 3].map((index) => (
        <Sequence
          key={index}
          from={INTRO_DURATION + index * STEP_DURATION}
          durationInFrames={STEP_DURATION + 60}
        >
          <DeploymentStepScene stepIndex={index} />
        </Sequence>
      ))}

      <Sequence from={INTRO_DURATION + 4 * STEP_DURATION} durationInFrames={SECURITY_DURATION + 60}>
        <SecurityScene />
      </Sequence>

      <Sequence from={INTRO_DURATION + 4 * STEP_DURATION + SECURITY_DURATION} durationInFrames={600}>
        <FinalClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
