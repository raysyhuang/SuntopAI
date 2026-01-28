import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const stats = [
  { value: "3000+", label: "连接设备", delay: 0 },
  { value: "25+", label: "合作医院", delay: 10 },
  { value: "5s", label: "数据采集", delay: 20 },
  { value: "95%", label: "预警准确率", delay: 30 },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 80,
      }}
    >
      {/* Section Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          marginBottom: 80,
        }}
      >
        <h2
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "#1d1d1f",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            margin: 0,
          }}
        >
          平台数据
        </h2>
        <p
          style={{
            fontSize: 24,
            color: "#6e6e73",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          实时监控，智能预警
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "flex",
          gap: 60,
          justifyContent: "center",
        }}
      >
        {stats.map((stat, index) => {
          const statSpring = spring({
            frame: frame - stat.delay,
            fps,
            config: {
              damping: 15,
              stiffness: 80,
            },
          });

          const numberProgress = interpolate(
            frame - stat.delay - 10,
            [0, 30],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={index}
              style={{
                textAlign: "center",
                transform: `scale(${statSpring}) translateY(${(1 - statSpring) * 50}px)`,
                opacity: statSpring,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 32,
                  background: "#ffffff",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(0,125,115,0.1)",
                }}
              >
                <span
                  style={{
                    fontSize: 56,
                    fontWeight: 700,
                    color: "#007d73",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    color: "#6e6e73",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
