import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";

const modules = [
  { icon: "🖥️", title: "中央监控系统", desc: "实时监控所有透析设备" },
  { icon: "📋", title: "数字化查房", desc: "移动端高效完成查房" },
  { icon: "🤖", title: "AI 智能终端", desc: "智能辅助临床决策" },
  { icon: "⚖️", title: "血压体重助手", desc: "精准管理患者数据" },
  { icon: "🦶", title: "足部管理模块", desc: "预防糖尿病足并发症" },
  { icon: "💊", title: "耗材管理系统", desc: "智能库存与追溯" },
];

export const PlatformScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title animation
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,125,115,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          right: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,125,115,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: 80,
        }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 24px",
              background: "rgba(0,125,115,0.1)",
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#007d73",
                fontFamily: "system-ui, -apple-system, sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Platform
            </span>
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1d1d1f",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            数字化透析平台
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#6e6e73",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 16,
              opacity: subtitleOpacity,
            }}
          >
            六大核心模块，全流程智能管理
          </p>
        </div>

        {/* Modules Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 30,
            maxWidth: 1400,
          }}
        >
          {modules.map((module, index) => {
            const delay = 30 + index * 12;
            const moduleSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 15, stiffness: 100 },
            });

            const moduleOpacity = interpolate(
              frame - delay,
              [0, 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: 28,
                  background: "#ffffff",
                  borderRadius: 20,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,125,115,0.08)",
                  transform: `translateY(${(1 - moduleSpring) * 30}px)`,
                  opacity: moduleOpacity,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(0,125,115,0.1) 0%, rgba(0,125,115,0.05) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    flexShrink: 0,
                  }}
                >
                  {module.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: "#1d1d1f",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      margin: 0,
                    }}
                  >
                    {module.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 16,
                      color: "#6e6e73",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {module.desc}
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
