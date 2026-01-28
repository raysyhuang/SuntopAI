import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { HomeShortScene } from "./scenes/HomeShortScene";
import { PlatformShortScene } from "./scenes/PlatformShortScene";
import { ClinicalShortScene } from "./scenes/ClinicalShortScene";
import { DeploymentShortScene } from "./scenes/DeploymentShortScene";
import { TransitionScene } from "./scenes/TransitionScene";

// Audio durations in seconds (short version)
const AUDIO_DURATIONS = {
  home: 27,
  platform: 35,
  clinical: 30,
  deployment: 31,
};

// Convert to frames (30fps) with small buffer
const FPS = 30;
const BUFFER = 30; // 1 second buffer

const SECTION_FRAMES = {
  home: Math.ceil(AUDIO_DURATIONS.home * FPS) + BUFFER,
  platform: Math.ceil(AUDIO_DURATIONS.platform * FPS) + BUFFER,
  clinical: Math.ceil(AUDIO_DURATIONS.clinical * FPS) + BUFFER,
  deployment: Math.ceil(AUDIO_DURATIONS.deployment * FPS) + BUFFER,
};

// Calculate start positions
const STARTS = {
  home: 0,
  platform: SECTION_FRAMES.home,
  clinical: SECTION_FRAMES.home + SECTION_FRAMES.platform,
  deployment: SECTION_FRAMES.home + SECTION_FRAMES.platform + SECTION_FRAMES.clinical,
};

// Total duration: ~2.5 minutes
export const TOTAL_DURATION = 
  SECTION_FRAMES.home + 
  SECTION_FRAMES.platform + 
  SECTION_FRAMES.clinical + 
  SECTION_FRAMES.deployment;

const TRANSITION_DURATION = 30; // 1 second transitions

export const FullVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {/* ===== AUDIO TRACKS ===== */}
      
      {/* Background music (low volume) */}
      <Audio
        src={staticFile("audio/background.mp3")}
        volume={0.1}
        startFrom={0}
      />

      {/* Voiceover - Home */}
      <Sequence from={STARTS.home + 15}>
        <Audio src={staticFile("audio/home.mp3")} volume={0.95} />
      </Sequence>

      {/* Voiceover - Platform */}
      <Sequence from={STARTS.platform + 15}>
        <Audio src={staticFile("audio/platform.mp3")} volume={0.95} />
      </Sequence>

      {/* Voiceover - Clinical */}
      <Sequence from={STARTS.clinical + 15}>
        <Audio src={staticFile("audio/clinical.mp3")} volume={0.95} />
      </Sequence>

      {/* Voiceover - Deployment */}
      <Sequence from={STARTS.deployment + 15}>
        <Audio src={staticFile("audio/deployment.mp3")} volume={0.95} />
      </Sequence>

      {/* ===== VIDEO SECTIONS ===== */}

      {/* HOME SECTION */}
      <Sequence from={STARTS.home} durationInFrames={SECTION_FRAMES.home}>
        <HomeShortScene />
      </Sequence>

      {/* Transition to Platform */}
      <Sequence from={STARTS.platform - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION * 2}>
        <TransitionScene title="平台介绍" subtitle="Digital Platform" />
      </Sequence>

      {/* PLATFORM SECTION */}
      <Sequence from={STARTS.platform} durationInFrames={SECTION_FRAMES.platform}>
        <PlatformShortScene />
      </Sequence>

      {/* Transition to Clinical */}
      <Sequence from={STARTS.clinical - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION * 2}>
        <TransitionScene title="临床应用" subtitle="Clinical Applications" />
      </Sequence>

      {/* CLINICAL SECTION */}
      <Sequence from={STARTS.clinical} durationInFrames={SECTION_FRAMES.clinical}>
        <ClinicalShortScene />
      </Sequence>

      {/* Transition to Deployment */}
      <Sequence from={STARTS.deployment - TRANSITION_DURATION} durationInFrames={TRANSITION_DURATION * 2}>
        <TransitionScene title="部署方案" subtitle="Deployment Solutions" />
      </Sequence>

      {/* DEPLOYMENT SECTION */}
      <Sequence from={STARTS.deployment} durationInFrames={SECTION_FRAMES.deployment}>
        <DeploymentShortScene />
      </Sequence>
    </AbsoluteFill>
  );
};
