import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";

const modules = [
  {
    icon: "🖥️",
    title: "中央监控系统",
    subtitle: "Central Monitoring",
    description: "平台的核心枢纽",
    features: ["实时查看所有透析机运行状态", "血流量、跨膜压、超滤量监控", "自动标记异常设备", "设备利用率分析"],
  },
  {
    icon: "📋",
    title: "数字化查房",
    subtitle: "Digital Rounds",
    description: "告别纸质记录",
    features: ["平板/手机完成查房", "自动关联透析数据", "语音输入和快捷模板", "实时同步电子病历"],
  },
  {
    icon: "🤖",
    title: "AI智能终端",
    subtitle: "AI Terminal",
    description: "边缘计算预警",
    features: ["实时采集透析数据", "边缘计算异常检测", "即时预警推送", "透析参数建议"],
  },
  {
    icon: "⚖️",
    title: "血压体重助手",
    subtitle: "BP & Weight",
    description: "精准测量管理",
    features: ["自动识别患者身份", "自动记录测量数据", "计算干体重偏差", "体重异常提醒"],
  },
  {
    icon: "🦶",
    title: "足部管理模块",
    subtitle: "Foot Care",
    description: "预防糖尿病足",
    features: ["足部照片智能分析", "早期识别病变风险", "完整足部健康档案", "预防治疗方案"],
  },
  {
    icon: "💊",
    title: "耗材管理系统",
    subtitle: "Supplies",
    description: "智能库存管理",
    features: ["出入库自动记录", "效期预警提醒", "批次追溯管理", "使用全程可追溯"],
  },
];

// Individual module showcase scene
const ModuleShowcase: React.FC<{ moduleIndex: number }> = ({ moduleIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const module = modules[moduleIndex];

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  
  return (
    <AbsoluteFill
      style={{
        background: moduleIndex % 2 === 0 ? "#ffffff" : "#f5f5f7",
        padding: 80,
      }}
    >
      <div style={{ display: "flex", height: "100%", alignItems: "center", gap: 80 }}>
        {/* Left - Module Info */}
        <div style={{ flex: 1, transform: `translateX(${(1 - titleSpring) * -50}px)`, opacity: titleSpring }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 20px",
              background: "rgba(0,125,115,0.1)",
              borderRadius: 50,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "#007d73", fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              模块 {moduleIndex + 1}/6
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            <span style={{ fontSize: 64 }}>{module.icon}</span>
            <div>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
                {module.title}
              </h2>
              <p style={{ fontSize: 20, color: "#007d73", fontFamily: "system-ui", margin: "4px 0 0" }}>
                {module.subtitle}
              </p>
            </div>
          </div>

          <p style={{ fontSize: 24, color: "#6e6e73", fontFamily: "system-ui", marginBottom: 32 }}>
            {module.description}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {module.features.map((feature, index) => {
              const featureDelay = 30 + index * 15;
              const featureOpacity = interpolate(frame - featureDelay, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const featureX = interpolate(frame - featureDelay, [0, 15], [-20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: featureOpacity,
                    transform: `translateX(${featureX}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#007d73",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 20, color: "#1d1d1f", fontFamily: "system-ui" }}>{feature}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Visual */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${titleSpring})`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              width: 500,
              height: 500,
              borderRadius: 40,
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 40px 80px rgba(0,125,115,0.25)",
            }}
          >
            <span style={{ fontSize: 140 }}>{module.icon}</span>
            <p style={{ fontSize: 28, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", marginTop: 24 }}>
              {module.title}
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Platform intro scene
const PlatformIntro: React.FC = () => {
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
            Platform
          </span>
        </div>
        <h1 style={{ fontSize: 72, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
          数字化透析平台
        </h1>
        <p style={{ fontSize: 32, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 20 }}>
          六大核心模块，覆盖透析全流程管理
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Main Platform Scene
export const PlatformDetailedScene: React.FC = () => {
  // Timing based on ~154 seconds audio (4620 frames at 30fps)
  // Intro: 0-8s (240 frames)
  // Each module: ~24s each (720 frames)
  const INTRO_DURATION = 240;
  const MODULE_DURATION = 720;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={INTRO_DURATION + 60}>
        <PlatformIntro />
      </Sequence>
      
      {modules.map((_, index) => (
        <Sequence
          key={index}
          from={INTRO_DURATION + index * MODULE_DURATION}
          durationInFrames={MODULE_DURATION + 60}
        >
          <ModuleShowcase moduleIndex={index} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
