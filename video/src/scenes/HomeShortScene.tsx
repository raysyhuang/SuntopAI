import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img, staticFile } from "remotion";

// Logo intro
const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const textOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });

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
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,125,115,0.08) 0%, transparent 70%)",
          transform: `scale(${logoScale * 1.5})`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 16, transform: `scale(${logoScale})` }}>
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 16px 48px rgba(0,125,115,0.3)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div style={{ opacity: textOpacity }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui" }}>Suntop</span>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#007d73", fontFamily: "system-ui" }}>AI</span>
        </div>
      </div>

      <p style={{ fontSize: 24, color: "#6e6e73", fontFamily: "system-ui", marginTop: 24, opacity: textOpacity }}>
        智能血液透析管理平台
      </p>
    </AbsoluteFill>
  );
};

// Stats scene with real data
const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "3000+", label: "连接设备" },
    { value: "55+", label: "合作医院" },
    { value: "5s", label: "数据采集" },
    { value: "95%", label: "预警准确率" },
  ];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)", padding: 60, justifyContent: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 22, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", margin: 0 }}>
          服务全国超过120万透析患者
        </p>
      </div>
      
      <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
        {stats.map((stat, index) => {
          const delay = 10 + index * 10;
          const statSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 20,
                padding: "32px 48px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.2)",
                transform: `scale(${statSpring})`,
                opacity: statSpring,
              }}
            >
              <span style={{ fontSize: 48, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>{stat.value}</span>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 8 }}>{stat.label}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const HomeShortScene: React.FC = () => {
  // ~27s audio = 810 frames
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={300}>
        <LogoIntro />
      </Sequence>
      <Sequence from={240} durationInFrames={600}>
        <StatsScene />
      </Sequence>
    </AbsoluteFill>
  );
};
