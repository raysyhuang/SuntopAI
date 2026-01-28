import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";

// Sub-scenes for Home section
const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const textOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });

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
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,125,115,0.08) 0%, transparent 70%)",
          transform: `scale(${logoScale * 1.5})`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `scale(${logoScale})` }}>
        <div
          style={{
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,125,115,0.3)",
          }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <div style={{ opacity: textOpacity }}>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#1d1d1f", fontFamily: "system-ui" }}>
            Suntop
          </span>
          <span style={{ fontSize: 72, fontWeight: 700, color: "#007d73", fontFamily: "system-ui" }}>
            AI
          </span>
        </div>
      </div>

      <div style={{ marginTop: 40, opacity: taglineOpacity }}>
        <p style={{ fontSize: 32, color: "#6e6e73", fontFamily: "system-ui" }}>
          智能血液透析管理平台
        </p>
      </div>
    </AbsoluteFill>
  );
};

const ChallengesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const challenges = [
    { icon: "📊", text: "设备监控分散" },
    { icon: "⏱️", text: "数据采集延迟" },
    { icon: "⚠️", text: "预警不及时" },
    { icon: "🧠", text: "决策依赖经验" },
  ];

  return (
    <AbsoluteFill style={{ background: "#ffffff", padding: 80, justifyContent: "center" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 48, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
            传统透析管理面临的挑战
          </h2>
          <p style={{ fontSize: 24, color: "#6e6e73", fontFamily: "system-ui", marginTop: 16 }}>
            超过80万血液透析患者，每年超过一亿次透析治疗
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 30 }}>
          {challenges.map((challenge, index) => {
            const delay = 20 + index * 20;
            const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });

            return (
              <div
                key={index}
                style={{
                  background: "#f5f5f7",
                  borderRadius: 24,
                  padding: 40,
                  textAlign: "center",
                  transform: `scale(${cardSpring}) translateY(${(1 - cardSpring) * 30}px)`,
                  opacity: cardSpring,
                }}
              >
                <span style={{ fontSize: 64 }}>{challenge.icon}</span>
                <p style={{ fontSize: 22, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", marginTop: 20 }}>
                  {challenge.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const StatsDetailedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "3000+", label: "透析设备", sub: "已连接" },
    { value: "25+", label: "合作医院", sub: "公立5+ 私立20+" },
    { value: "5s", label: "数据采集", sub: "实时频率" },
    { value: "95%", label: "预警准确率", sub: "AI驱动" },
  ];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)", padding: 80, justifyContent: "center" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 48, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", margin: 0 }}>
            平台成果
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 30 }}>
          {stats.map((stat, index) => {
            const delay = 15 + index * 15;
            const statSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });

            return (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 24,
                  padding: 40,
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                  transform: `scale(${statSpring})`,
                  opacity: statSpring,
                }}
              >
                <span style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", fontFamily: "system-ui" }}>
                  {stat.value}
                </span>
                <p style={{ fontSize: 22, fontWeight: 600, color: "#ffffff", fontFamily: "system-ui", marginTop: 12 }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", fontFamily: "system-ui", marginTop: 8 }}>
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CoreCapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const capabilities = [
    {
      icon: "🖥️",
      title: "中央监控系统",
      desc: "一个界面实时掌握所有透析设备和患者状态",
    },
    {
      icon: "🤖",
      title: "AI智能预警",
      desc: "提前15分钟预测低血压等不良事件",
    },
    {
      icon: "📱",
      title: "移动端管理",
      desc: "随时随地通过手机查看患者情况",
    },
  ];

  return (
    <AbsoluteFill style={{ background: "#ffffff", padding: 80, justifyContent: "center" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <h2 style={{ fontSize: 48, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
            三大核心能力
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {capabilities.map((cap, index) => {
            const delay = 20 + index * 25;
            const cardSpring = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 100 } });

            return (
              <div
                key={index}
                style={{
                  background: "#f5f5f7",
                  borderRadius: 32,
                  padding: 48,
                  textAlign: "center",
                  transform: `translateY(${(1 - cardSpring) * 40}px)`,
                  opacity: cardSpring,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 28,
                    background: "linear-gradient(135deg, rgba(0,125,115,0.1) 0%, rgba(0,125,115,0.05) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    margin: "0 auto 24px",
                  }}
                >
                  {cap.icon}
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 600, color: "#1d1d1f", fontFamily: "system-ui", margin: 0 }}>
                  {cap.title}
                </h3>
                <p style={{ fontSize: 18, color: "#6e6e73", fontFamily: "system-ui", marginTop: 16, lineHeight: 1.6 }}>
                  {cap.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Home Scene
export const HomeDetailedScene: React.FC = () => {
  // Timing based on ~89 seconds audio (2670 frames at 30fps)
  // Logo: 0-8s, Challenges: 8-28s, Stats: 28-50s, Capabilities: 50-89s
  
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={300}>
        <LogoIntro />
      </Sequence>
      <Sequence from={240} durationInFrames={600}>
        <ChallengesScene />
      </Sequence>
      <Sequence from={840} durationInFrames={660}>
        <StatsDetailedScene />
      </Sequence>
      <Sequence from={1500} durationInFrames={1200}>
        <CoreCapabilitiesScene />
      </Sequence>
    </AbsoluteFill>
  );
};
