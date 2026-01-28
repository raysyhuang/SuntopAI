import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const deploymentSteps = [
  { step: "01", title: "需求评估", desc: "深入了解医院需求" },
  { step: "02", title: "系统配置", desc: "定制化平台部署" },
  { step: "03", title: "设备对接", desc: "无缝集成透析设备" },
  { step: "04", title: "培训上线", desc: "专业团队全程支持" },
];

const securityFeatures = [
  { icon: "🔒", label: "数据加密" },
  { icon: "🛡️", label: "访问控制" },
  { icon: "📊", label: "审计追踪" },
  { icon: "☁️", label: "云端备份" },
];

export const DeploymentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Progress line animation
  const lineProgress = interpolate(frame, [30, 180], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f0fdf9 100%)",
      }}
    >
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
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
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
              Deployment
            </span>
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#1d1d1f",
              fontFamily: "system-ui, -apple-system, sans-serif",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            灵活部署方案
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#6e6e73",
              fontFamily: "system-ui, -apple-system, sans-serif",
              marginTop: 16,
            }}
          >
            专业团队，全程护航
          </p>
        </div>

        {/* Deployment Steps */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            marginBottom: 60,
            position: "relative",
          }}
        >
          {/* Progress Line */}
          <div
            style={{
              position: "absolute",
              top: 45,
              left: 90,
              right: 90,
              height: 4,
              background: "#e5e5e5",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                width: `${lineProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #007d73 0%, #00a693 100%)",
                borderRadius: 2,
              }}
            />
          </div>

          {deploymentSteps.map((step, index) => {
            const delay = 30 + index * 35;
            const stepSpring = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12, stiffness: 100 },
            });

            const isActive = lineProgress >= (index / (deploymentSteps.length - 1)) * 100;

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 220,
                  transform: `scale(${stepSpring})`,
                  opacity: stepSpring,
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: isActive
                      ? "linear-gradient(135deg, #007d73 0%, #00a693 100%)"
                      : "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isActive
                      ? "0 8px 32px rgba(0,125,115,0.3)"
                      : "0 4px 16px rgba(0,0,0,0.08)",
                    border: isActive ? "none" : "2px solid #e5e5e5",
                    marginBottom: 20,
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: isActive ? "#ffffff" : "#6e6e73",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#1d1d1f",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#6e6e73",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    margin: "8px 0 0 0",
                    textAlign: "center",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Features */}
        <div
          style={{
            display: "flex",
            gap: 24,
            padding: 32,
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingRight: 24,
              borderRight: "1px solid #e5e5e5",
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#1d1d1f",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              安全保障
            </span>
          </div>
          {securityFeatures.map((feature, index) => {
            const delay = 120 + index * 15;
            const featureOpacity = interpolate(
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
                  gap: 10,
                  opacity: featureOpacity,
                }}
              >
                <span style={{ fontSize: 24 }}>{feature.icon}</span>
                <span
                  style={{
                    fontSize: 16,
                    color: "#6e6e73",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                >
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
