import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const features = [
  {
    icon: "📊",
    title: "中央监控系统",
    description: "实时监控所有透析设备状态",
    color: "#007d73",
  },
  {
    icon: "🤖",
    title: "AI 智能预警",
    description: "提前预测并预防不良事件",
    color: "#00a693",
  },
  {
    icon: "📱",
    title: "移动端管理",
    description: "随时随地掌握患者状况",
    color: "#007d73",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Calculate which feature is currently active
  const featureDuration = Math.floor(durationInFrames / features.length);
  const activeFeature = Math.min(
    Math.floor(frame / featureDuration),
    features.length - 1
  );

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,125,115,0.05) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1600,
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Left side - Feature cards */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <h2
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: "#1d1d1f",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginBottom: 20,
              opacity: titleOpacity,
            }}
          >
            核心功能
          </h2>

          {features.map((feature, index) => {
            const isActive = index === activeFeature;
            const featureFrame = frame - index * featureDuration;
            
            const cardScale = spring({
              frame: Math.max(0, featureFrame),
              fps,
              config: {
                damping: 20,
                stiffness: 100,
              },
            });

            const cardOpacity = interpolate(
              featureFrame,
              [-10, 10],
              [0.4, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: 28,
                  borderRadius: 20,
                  background: isActive ? "#f5f5f7" : "#ffffff",
                  border: isActive ? "2px solid rgba(0,125,115,0.2)" : "2px solid transparent",
                  transform: `scale(${0.95 + cardScale * 0.05})`,
                  opacity: cardOpacity,
                  transition: "background 0.3s",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}08 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                  }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: "#1d1d1f",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      margin: 0,
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 18,
                      color: "#6e6e73",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      margin: "8px 0 0 0",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side - Active feature highlight */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              boxShadow: "0 40px 100px rgba(0,125,115,0.3)",
            }}
          >
            <span style={{ fontSize: 120 }}>
              {features[activeFeature].icon}
            </span>
            <h3
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: "#ffffff",
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginTop: 30,
                textAlign: "center",
              }}
            >
              {features[activeFeature].title}
            </h3>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
