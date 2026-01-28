import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img, staticFile } from "remotion";

const modules = [
  { title: "中央监控系统", image: "central-monitoring.jpg" },
  { title: "数字化查房", image: "digital-rounds.jpg" },
  { title: "AI智能终端", image: "smart-terminal.jpg" },
  { title: "血压体重助手", image: "bp-weight-assistant.jpg" },
  { title: "足部管理模块", image: "foot-management.jpg" },
  { title: "智慧供应链", image: "lab-evaluation.jpg" },
];

// Platform intro
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
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring }}>
        <div style={{ padding: "10px 28px", background: "rgba(255,255,255,0.2)", borderRadius: 50, display: "inline-block", marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Platform
          </span>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
          数字化透析平台
        </h1>
        <p style={{ fontSize: 24, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 16 }}>
          六大核心模块
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Modules grid with real images
const ModulesGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "#f5f5f7", padding: 60 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, height: "100%" }}>
        {modules.map((module, index) => {
          const delay = index * 8;
          const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

          return (
            <div
              key={index}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 20}px)`,
                opacity: cardSpring,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                <Img
                  src={staticFile(module.image)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ padding: 20, textAlign: "center", background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)" }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
                  {module.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const PlatformShortScene: React.FC = () => {
  // ~34s audio = 1020 frames
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={150}>
        <PlatformIntro />
      </Sequence>
      <Sequence from={120} durationInFrames={950}>
        <ModulesGrid />
      </Sequence>
    </AbsoluteFill>
  );
};
