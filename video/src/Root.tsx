import { Composition } from "remotion";
import { IntroVideo } from "./IntroVideo";
import { FullVideo, TOTAL_DURATION } from "./FullVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full video with all pages and audio (~2 min) */}
      <Composition
        id="FullVideo"
        component={FullVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      
      {/* Original 15-second intro (no audio) */}
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      
      {/* 10-second short intro (no audio) */}
      <Composition
        id="IntroVideoShort"
        component={IntroVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          short: true,
        }}
      />
    </>
  );
};
