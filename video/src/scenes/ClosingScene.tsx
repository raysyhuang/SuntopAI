import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main content animation
  const contentScale = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  const contentOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA button animation
  const buttonScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Website URL animation
  const urlOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const urlY = interpolate(frame, [40, 60], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow effect
  const glowIntensity = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 50%, #f0fdf9 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,125,115,${0.1 * glowIntensity}) 0%, transparent 60%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${contentScale})`,
          opacity: contentOpacity,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 20px 60px rgba(0,125,115,${0.3 * glowIntensity})`,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#1d1d1f",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Suntop
            <span style={{ color: "#007d73" }}>AI</span>
          </span>
        </div>

        {/* Tagline */}
        <h2
          style={{
            fontSize: 42,
            fontWeight: 600,
            color: "#1d1d1f",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            marginBottom: 16,
          }}
        >
          让透析更智能，更安全
        </h2>

        <p
          style={{
            fontSize: 24,
            color: "#6e6e73",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            marginBottom: 50,
          }}
        >
          AI赋能血液透析全流程管理
        </p>

        {/* CTA Button */}
        <div
          style={{
            transform: `scale(${buttonScale})`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "20px 48px",
              background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
              borderRadius: 50,
              boxShadow: `0 12px 40px rgba(0,125,115,${0.4 * glowIntensity})`,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              立即了解更多
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Website URL */}
        <div
          style={{
            marginTop: 50,
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: "#007d73",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            www.suntopai.com
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
