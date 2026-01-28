import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, Img, staticFile } from "remotion";

// Clinical intro with outcomes
const ClinicalIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const outcomes = [
    { value: "↓40%", label: "不良事件" },
    { value: "↑35%", label: "临床效率" },
    { value: "95%", label: "预警准确" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${titleSpring})`, opacity: titleSpring, marginBottom: 48 }}>
        <div style={{ padding: "10px 28px", background: "rgba(255,255,255,0.2)", borderRadius: 50, display: "inline-block", marginBottom: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Clinical
          </span>
        </div>
        <h1 style={{ fontSize: 52, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
          临床应用·精细化管理
        </h1>
      </div>

      <div style={{ display: "flex", gap: 32 }}>
        {outcomes.map((outcome, index) => {
          const delay = 30 + index * 15;
          const outcomeSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                padding: "32px 48px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.2)",
                transform: `scale(${outcomeSpring})`,
                opacity: outcomeSpring,
              }}
            >
              <span style={{ fontSize: 44, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>{outcome.value}</span>
              <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", fontFamily: "system-ui", marginTop: 8 }}>{outcome.label}</p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Management areas with images
const ManagementAreas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const areas = [
    { title: "中心管理", desc: "治疗方案·质量控制", image: "monitoring-treatment-status.jpg" },
    { title: "患者管理", desc: "个性化治疗·健康档案", image: "consultation-template.png" },
    { title: "IT基础设施", desc: "设备互联·数据安全", image: "four-item-monitoring.jpg" },
  ];

  return (
    <AbsoluteFill style={{ background: "#ffffff", padding: 60 }}>
      <h2 style={{ fontSize: 36, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", textAlign: "center", marginBottom: 40 }}>
        三大管理方向
      </h2>
      
      <div style={{ display: "flex", gap: 24, height: "calc(100% - 100px)" }}>
        {areas.map((area, index) => {
          const delay = index * 12;
          const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 100 } });

          return (
            <div
              key={index}
              style={{
                flex: 1,
                background: "#f5f5f7",
                borderRadius: 24,
                overflow: "hidden",
                transform: `translateY(${(1 - cardSpring) * 30}px)`,
                opacity: cardSpring,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                <Img
                  src={staticFile(area.image)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 24, textAlign: "center" }}>
                <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
                  {area.title}
                </h3>
                <p style={{ fontSize: 16, color: "#6e6e73", fontFamily: "system-ui", marginTop: 8 }}>
                  {area.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const ClinicalShortScene: React.FC = () => {
  // ~30s audio = 900 frames
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={420}>
        <ClinicalIntro />
      </Sequence>
      <Sequence from={360} durationInFrames={600}>
        <ManagementAreas />
      </Sequence>
    </AbsoluteFill>
  );
};
