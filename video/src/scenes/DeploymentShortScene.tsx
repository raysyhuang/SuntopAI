import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img, staticFile } from "remotion";

// Deployment steps
const DeploymentSteps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { step: "01", title: "需求评估" },
    { step: "02", title: "系统配置" },
    { step: "03", title: "设备对接" },
    { step: "04", title: "培训上线" },
  ];

  const lineProgress = interpolate(frame, [20, 150], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", padding: 60, justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ fontSize: 42, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
          灵活部署·专业护航
        </h2>
        <p style={{ fontSize: 20, color: "#6e6e73", fontFamily: "system-ui", marginTop: 12 }}>
          支持50+透析机型号，对接成功率99%
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", justifyContent: "center" }}>
        {/* Progress line */}
        <div style={{ position: "absolute", top: 40, left: 120, right: 120, height: 4, background: "#e5e5e5", borderRadius: 2 }}>
          <div style={{ width: `${lineProgress}%`, height: "100%", background: "linear-gradient(90deg, #007d73 0%, #00a693 100%)", borderRadius: 2 }} />
        </div>

        {steps.map((step, index) => {
          const delay = 20 + index * 30;
          const stepSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });
          const isActive = lineProgress >= (index / (steps.length - 1)) * 100;

          return (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 180, transform: `scale(${stepSpring})`, opacity: stepSpring, zIndex: 1 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: isActive ? "linear-gradient(135deg, #007d73 0%, #00a693 100%)" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isActive ? "0 8px 24px rgba(0,125,115,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
                  border: isActive ? "none" : "2px solid #e5e5e5",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 24, fontWeight: 700, color: isActive ? "#ffffff" : "#6e6e73", fontFamily: "system-ui" }}>{step.step}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>{step.title}</h3>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Final closing
const FinalClosing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const glowIntensity = Math.sin(frame * 0.12) * 0.3 + 0.7;

  const security = ["🔒 数据加密", "🛡️ 访问控制", "📋 审计追踪", "☁️ 云端备份"];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f0fdf9 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(0,125,115,${0.08 * glowIntensity}) 0%, transparent 60%)` }} />

      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        {/* Security badges */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 32 }}>
          {security.map((item, index) => {
            const delay = 15 + index * 8;
            const badgeOpacity = interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={index} style={{ padding: "8px 16px", background: "#ffffff", borderRadius: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", opacity: badgeOpacity }}>
                <span style={{ fontSize: 14, color: "#6e6e73", fontFamily: "system-ui" }}>{item}</span>
              </div>
            );
          })}
        </div>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 12px 36px rgba(0,125,115,${0.3 * glowIntensity})`,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span style={{ fontSize: 42, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui" }}>
            Suntop<span style={{ color: "#007d73" }}>AI</span>
          </span>
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
          让透析更智能，更安全
        </h2>

        <div
          style={{
            marginTop: 32,
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 36px",
            background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
            borderRadius: 50,
            boxShadow: `0 10px 30px rgba(0,125,115,${0.35 * glowIntensity})`,
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui" }}>了解更多</span>
        </div>

        <p style={{ fontSize: 24, color: "#007d73", fontFamily: "system-ui", fontWeight: 600, marginTop: 24 }}>
          www.suntopai.com
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const DeploymentShortScene: React.FC = () => {
  // ~31s audio = 930 frames
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={450}>
        <DeploymentSteps />
      </Sequence>
      <Sequence from={390} durationInFrames={600}>
        <FinalClosing />
      </Sequence>
    </AbsoluteFill>
  );
};
