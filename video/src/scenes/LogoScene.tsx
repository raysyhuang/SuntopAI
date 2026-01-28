import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const LogoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Text fade in
  const textOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline slide up
  const taglineY = interpolate(frame, [35, 55], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Background gradient animation
  const gradientPosition = interpolate(frame, [0, 90], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #f5f5f7 0%, #ffffff ${50 + gradientPosition * 0.2}%, #f0fdf9 100%)`,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Decorative circles */}
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

      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Logo Icon */}
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
          <svg
            width="60"
            height="60"
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

        {/* Logo Text */}
        <div
          style={{
            opacity: textOpacity,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#1d1d1f",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Suntop
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#007d73",
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            AI
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 40,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        <p
          style={{
            fontSize: 32,
            color: "#6e6e73",
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          智能血液透析管理平台
        </p>
      </div>
    </AbsoluteFill>
  );
};
