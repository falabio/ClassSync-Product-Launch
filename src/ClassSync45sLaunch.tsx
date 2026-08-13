import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

// Global Heritage Design System Specifications
const HERITAGE = {
  primary: "#1A1C1E", // Deep ink
  secondary: "#6C7278", // Slate
  tertiary: "#B8422E", // Boston Clay
  neutral: "#F7F5F2", // Limestone
  cardBg: "rgba(247, 245, 242, 0.96)",
  cardBorder: "rgba(108, 114, 120, 0.25)",
};

const fontHeading = "'Public Sans', 'Inter', -apple-system, sans-serif";
const fontLabel = "'Space Grotesk', 'Courier New', monospace";

// Scene 1 (00s - 1.5s / Frames 0 - 45): Title Hook
const SceneTitleHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 140 } });
  const badgeSpring = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 160 } });

  const opacityOut = interpolate(frame, [35, 45], [1, 0], { extrapolateRight: "clamp" });
  const scaleOut = interpolate(frame, [30, 45], [1, 1.12], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: HERITAGE.neutral,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "60px",
        fontFamily: fontHeading,
        opacity: opacityOut,
        transform: `scale(${scaleOut})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${HERITAGE.secondary}25 1.5px, transparent 1.5px)`,
          backgroundSize: "32px 32px",
          opacity: 0.5,
        }}
      />

      <div style={{ zIndex: 10, maxWidth: "1000px" }}>
        <div
          style={{
            transform: `scale(${badgeSpring})`,
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: "4px",
            background: HERITAGE.tertiary,
            color: HERITAGE.neutral,
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: fontLabel,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "24px",
            boxShadow: "0 6px 24px rgba(184, 66, 46, 0.35)",
          }}
        >
          THE FUTURE OF TUTOR PEERING IS HERE
        </div>

        <h1
          style={{
            fontSize: "104px",
            fontWeight: 900,
            color: HERITAGE.primary,
            margin: "0 0 16px 0",
            letterSpacing: "-4px",
            lineHeight: 0.95,
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          ClassSync
        </h1>

        <p
          style={{
            fontSize: "26px",
            color: HERITAGE.secondary,
            fontWeight: 600,
            margin: "0 auto",
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Reciprocal Numeracy Dashboard for 1-on-1 Peer Tutor Support & Cohort Analytics.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7 (39s - 45s / Frames 1170 - 1350): Outro Call to Action
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10, stiffness: 100 } });
  const buttonSpring = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: HERITAGE.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: fontHeading,
        color: HERITAGE.neutral,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${HERITAGE.tertiary}44 0%, transparent 65%)`,
          filter: "blur(70px)",
        }}
      />

      <div style={{ transform: `scale(${logoScale})`, zIndex: 10 }}>
        <div
          style={{
            fontFamily: fontLabel,
            fontSize: "14px",
            letterSpacing: "4px",
            color: HERITAGE.tertiary,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: "16px",
          }}
        >
          ELEVATE CLASSROOM PERFORMANCE
        </div>

        <h2
          style={{
            fontSize: "88px",
            fontWeight: 900,
            color: HERITAGE.neutral,
            margin: "0 0 12px 0",
            letterSpacing: "-2px",
          }}
        >
          ClassSync
        </h2>

        <p
          style={{
            fontSize: "22px",
            color: HERITAGE.secondary,
            margin: "0 0 36px 0",
            maxWidth: "640px",
          }}
        >
          Connect high performers with peer tutors. Build stronger classrooms today.
        </p>

        <div style={{ transform: `scale(${buttonSpring})` }}>
          <button
            style={{
              padding: "18px 48px",
              fontSize: "20px",
              fontWeight: 800,
              color: HERITAGE.neutral,
              backgroundColor: HERITAGE.tertiary,
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 12px 35px rgba(184, 66, 46, 0.4)",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Start Peering with ClassSync
          </button>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Feature Checkpoints Configuration
const FEATURES = [
  {
    startFrame: 45,
    endFrame: 240,
    title: "Monitor Cohort Health",
    description: "View registered learner metrics and checklist alerts.",
    zoomScale: 1.35,
    originX: "25%",
    originY: "25%",
  },
  {
    startFrame: 240,
    endFrame: 465,
    title: "Import Student Scores",
    description: "Upload CSV score files directly to populate student profiles.",
    zoomScale: 1.35,
    originX: "65%",
    originY: "65%",
  },
  {
    startFrame: 465,
    endFrame: 720,
    title: "Generate Peer Matching",
    description: "Algorithmic matching pairs high performers with peer tutors automatically.",
    zoomScale: 1.4,
    originX: "65%",
    originY: "70%",
  },
  {
    startFrame: 720,
    endFrame: 945,
    title: "Track Session Attendance",
    description: "Check in present learners to instantly recalculate class statistics.",
    zoomScale: 1.4,
    originX: "15%",
    originY: "80%",
  },
  {
    startFrame: 945,
    endFrame: 1170,
    title: "Analyze Progress Reports",
    description: "Review cohort progress charts and student growth explorer lists.",
    zoomScale: 1.35,
    originX: "65%",
    originY: "45%",
  },
];

// Master 45-Second ClassSync Launch Video (1350 Frames @ 30fps)
export const ClassSync45sLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const videoSrc = staticFile("dashboard_live_fps30.mp4");
  const audioSrc = staticFile("custom_epic_45s.mp3");

  // Determine active feature checkpoint
  const activeFeature = FEATURES.find((f) => frame >= f.startFrame && frame < f.endFrame);

  // Dynamic Camera Zoom & Origin calculation
  const zoomScale = activeFeature ? activeFeature.zoomScale : 1.0;
  const originX = activeFeature ? activeFeature.originX : "50%";
  const originY = activeFeature ? activeFeature.originY : "50%";

  // Camera Zoom spring interpolation
  const featureLocalFrame = activeFeature ? frame - activeFeature.startFrame : 0;
  const cameraSpring = spring({ frame: featureLocalFrame - 25, fps, config: { damping: 16, stiffness: 90 } });
  const currentScale = activeFeature ? interpolate(cameraSpring, [0, 1], [1, zoomScale]) : 1.0;

  // Callout Card & Frosted Glass Overlay Interpolations (Hold card visible for 55 frames / ~2.0 seconds)
  const cardOpacity = activeFeature
    ? interpolate(featureLocalFrame, [0, 8, 55, 70], [0, 1, 1, 0], { extrapolateRight: "clamp" })
    : 0;
  const cardScale = activeFeature
    ? interpolate(featureLocalFrame, [0, 70], [1, 1.03], { extrapolateRight: "clamp" })
    : 1;

  const backdropBlur = activeFeature
    ? interpolate(featureLocalFrame, [0, 55, 70], [16, 16, 0], { extrapolateRight: "clamp" })
    : 0;
  const backdropOpacity = activeFeature
    ? interpolate(featureLocalFrame, [0, 55, 70], [1, 1, 0], { extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: HERITAGE.primary }}>
      {/* Sync 45s Epic Background Music */}
      <Audio src={audioSrc} volume={1.0} />

      {/* Single Continuous Recording Layer (Frames 45 - 1170) - Omitted endAt=900 to play full 1125 frames cleanly! */}
      {frame >= 45 && frame < 1170 && (
        <Sequence from={45} durationInFrames={1125}>
          <div
            style={{
              width: "100%",
              height: "100%",
              transformOrigin: `${originX} ${originY}`,
              transform: `scale(${currentScale})`,
              transition: "transform-origin 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            <OffthreadVideo
              src={videoSrc}
              muted
              startFrom={0}
              endAt={1125}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </Sequence>
      )}

      {/* Fullscreen Frosted Glass Overlay */}
      {backdropOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255, 255, 255, 0.35)",
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
            opacity: backdropOpacity,
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Centered Large Focus Feature Callout Card */}
      {activeFeature && cardOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 30,
            opacity: cardOpacity,
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${cardScale})`,
            width: "700px",
            padding: "45px 60px",
            borderRadius: "16px",
            backgroundColor: HERITAGE.cardBg,
            border: `3px solid ${HERITAGE.cardBorder}`,
            boxShadow: "0 30px 80px rgba(26, 28, 30, 0.25)",
            fontFamily: fontHeading,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "44px",
              fontWeight: 900,
              color: HERITAGE.primary,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            {activeFeature.title}
          </h3>
          <p
            style={{
              margin: "16px 0 0 0",
              fontSize: "22px",
              color: HERITAGE.secondary,
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            {activeFeature.description}
          </p>
        </div>
      )}

      {/* 00s - 1.5s (Frames 0 - 45): Title Hook */}
      <Sequence from={0} durationInFrames={45}>
        <SceneTitleHook />
      </Sequence>

      {/* 39s - 45s (Frames 1170 - 1350): Outro CTA */}
      <Sequence from={1170} durationInFrames={180}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
