import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface TransitionSceneProps {
  title: string;
  subtitle: string;
}

export const TransitionScene: React.FC<TransitionSceneProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Fade in then fade out
  const midpoint = durationInFrames / 2;
  
  const opacity = interpolate(
    frame,
    [0, midpoint * 0.5, midpoint * 1.5, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const scale = interpolate(
    frame,
    [0, midpoint * 0.5, midpoint * 1.5, durationInFrames],
    [0.8, 1, 1, 1.1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Line animation
  const lineWidth = interpolate(
    frame,
    [midpoint * 0.3, midpoint],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #007d73 0%, #00a693 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)
          `,
        }}
      />

      <div
        style={{
          textAlign: "center",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        <h2
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>

        {/* Animated line */}
        <div
          style={{
            width: 120,
            height: 4,
            background: "rgba(255,255,255,0.3)",
            borderRadius: 2,
            margin: "24px auto",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${lineWidth}%`,
              height: "100%",
              background: "#ffffff",
              borderRadius: 2,
            }}
          />
        </div>

        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};
