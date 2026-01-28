import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const clinicalAreas = [
  {
    icon: "🏥",
    title: "中心管理",
    subtitle: "Center Management",
    items: ["患者信息管理", "治疗方案优化", "质量控制分析"],
  },
  {
    icon: "👤",
    title: "患者管理",
    subtitle: "Patient Management", 
    items: ["个性化治疗", "健康档案", "随访管理"],
  },
  {
    icon: "💻",
    title: "IT 基础设施",
    subtitle: "IT Infrastructure",
    items: ["设备互联", "数据安全", "系统集成"],
  },
];

const outcomes = [
  { value: "↓40%", label: "不良事件减少" },
  { value: "↑35%", label: "临床效率提升" },
  { value: "95%", label: "预警准确率" },
];

export const ClinicalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "#ffffff",
      }}
    >
      {/* Background gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "linear-gradient(90deg, #007d73 0%, #00a693 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          height: "100%",
          padding: 80,
          gap: 60,
        }}
      >
        {/* Left side - Title and Outcomes */}
        <div
          style={{
            flex: "0 0 400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              transform: `scale(${titleSpring})`,
              opacity: titleSpring,
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
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#007d73",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Clinical
              </span>
            </div>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#1d1d1f",
                fontFamily: "system-ui, -apple-system, sans-serif",
                margin: 0,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              临床应用
            </h1>
            <p
              style={{
                fontSize: 24,
                color: "#6e6e73",
                fontFamily: "system-ui, -apple-system, sans-serif",
                marginTop: 16,
                lineHeight: 1.5,
              }}
            >
              精细化管理
              <br />
              提升透析质量
            </p>
          </div>

          {/* Outcomes */}
          <div
            style={{
              marginTop: 50,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {outcomes.map((outcome, index) => {
              const delay = 40 + index * 15;
              const outcomeOpacity = interpolate(
                frame - delay,
                [0, 20],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              const outcomeX = interpolate(
                frame - delay,
                [0, 20],
                [-30, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: outcomeOpacity,
                    transform: `translateX(${outcomeX}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: "#007d73",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      width: 120,
                    }}
                  >
                    {outcome.value}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      color: "#6e6e73",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {outcome.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right side - Clinical Areas */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {clinicalAreas.map((area, index) => {
            const delay = 20 + index * 20;
            const cardSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 15, stiffness: 100 },
            });

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 24,
                  padding: 32,
                  background: "#f5f5f7",
                  borderRadius: 24,
                  transform: `translateX(${(1 - cardSpring) * 50}px)`,
                  opacity: cardSpring,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    flexShrink: 0,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  }}
                >
                  {area.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <h3
                      style={{
                        fontSize: 26,
                        fontWeight: 600,
                        color: "#1d1d1f",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        margin: 0,
                      }}
                    >
                      {area.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#007d73",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {area.subtitle}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    {area.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        style={{
                          padding: "6px 14px",
                          background: "#ffffff",
                          borderRadius: 20,
                          fontSize: 14,
                          color: "#6e6e73",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
