import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { LogoScene } from "./scenes/LogoScene";
import { StatsScene } from "./scenes/StatsScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { ClosingScene } from "./scenes/ClosingScene";

interface IntroVideoProps {
  short?: boolean;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ short = false }) => {
  const { durationInFrames } = useVideoConfig();
  
  // Scene durations (in frames at 30fps)
  const logoEnd = short ? 60 : 90;        // 2-3 seconds
  const statsEnd = short ? 150 : 210;     // 5-7 seconds total
  const featuresEnd = short ? 240 : 360;  // 8-12 seconds total
  // Closing fills the rest

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      {/* Scene 1: Logo Animation */}
      <Sequence from={0} durationInFrames={logoEnd}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Stats Showcase */}
      <Sequence from={logoEnd} durationInFrames={statsEnd - logoEnd}>
        <StatsScene />
      </Sequence>

      {/* Scene 3: Platform Features */}
      <Sequence from={statsEnd} durationInFrames={featuresEnd - statsEnd}>
        <FeaturesScene />
      </Sequence>

      {/* Scene 4: Closing CTA */}
      <Sequence from={featuresEnd} durationInFrames={durationInFrames - featuresEnd}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
