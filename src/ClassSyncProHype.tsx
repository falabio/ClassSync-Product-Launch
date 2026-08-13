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
  cardBg: "rgba(247, 245, 242, 0.95)",
  cardBorder: "rgba(108, 114, 120, 0.25)",
};

const fontHeading = "'Public Sans', 'Inter', -apple-system, sans-serif";
const fontLabel = "'Space Grotesk', 'Courier New', monospace";

// Scene 1: High Impact Opening Kinetic Hook
const OpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12, stiffness: 140 } });
  const badgeSpring = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 160 } });

  const opacityOut = interpolate(frame, [80, 90], [1, 0], { extrapolateRight: "clamp" });
  const scaleOut = interpolate(frame, [75, 90], [1, 1.12], { extrapolateRight: "clamp" });

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
            padding: "8px 22px",
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
          RECIPROCAL NUMERACY NETWORK
        </div>

        <h1
          style={{
            fontSize: "100px",
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
          Pairing high-performing tutors with peer educators for 1-on-1 support and accelerated growth.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Pro Feature Zoom Container
interface FeatureZoomProps {
  startFrom: number;
  endAt: number;
  zoomScale: number;
  originX: string;
  originY: string;
  badge: string;
  title: string;
  description: string;
  position?: "left" | "right" | "bottom";
}

const FeatureZoomScene: React.FC<FeatureZoomProps> = ({
  startFrom,
  endAt,
  zoomScale,
  originX,
  originY,
  badge,
  title,
  description,
  position = "left",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const videoSrc = staticFile("dashboard_live_fps30.mp4");

  // Smooth Pro Zoom-in interpolation
  const zoomProgress = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const scale = interpolate(zoomProgress, [0, 1], [1, zoomScale]);

  // Card slide-in
  const cardEntrance = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 120 } });
  const cardOpacity = interpolate(frame, [0, 10, 190, 200], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX =
    position === "left"
      ? interpolate(cardEntrance, [0, 1], [-60, 0])
      : position === "right"
      ? interpolate(cardEntrance, [0, 1], [60, 0])
      : 0;

  const translateY = position === "bottom" ? interpolate(cardEntrance, [0, 1], [50, 0]) : 0;

  let posStyle: React.CSSProperties = { top: "10%", left: "5%" };
  if (position === "right") posStyle = { top: "10%", right: "5%" };
  if (position === "bottom") posStyle = { bottom: "8%", left: "5%" };

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: HERITAGE.primary }}>
      {/* Video with Smooth Pro Camera Zoom & Pan */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: `${originX} ${originY}`,
          transform: `scale(${scale})`,
          transition: "transform 0.1s linear",
        }}
      >
        <OffthreadVideo src={videoSrc} muted startFrom={startFrom} endAt={endAt} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      </div>

      {/* Feature Glass Card Overlay */}
      <div
        style={{
          position: "absolute",
          zIndex: 30,
          opacity: cardOpacity,
          transform: `translate(${translateX}px, ${translateY}px)`,
          maxWidth: "480px",
          padding: "28px 36px",
          borderRadius: "12px",
          backgroundColor: HERITAGE.cardBg,
          border: `2px solid ${HERITAGE.cardBorder}`,
          boxShadow: "0 24px 60px rgba(26, 28, 30, 0.25)",
          fontFamily: fontHeading,
          ...posStyle,
        }}
      >
        <div
          style={{
            fontFamily: fontLabel,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: HERITAGE.tertiary,
            marginBottom: "8px",
          }}
        >
          {badge}
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: 800,
            color: HERITAGE.primary,
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "10px 0 0 0",
            fontSize: "16px",
            color: HERITAGE.secondary,
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          {description}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Scene: Call To Action Outro
const OutroScene: React.FC = () => {
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
          ELEVATE TEACHER PERFORMANCE TOGETHER
        </div>

        <h2
          style={{
            fontSize: "84px",
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

// Pro ClassSync Social Hype Video (30-Seconds / 900 Frames @ 30fps)
export const ClassSyncProHype: React.FC = () => {
  const audioSrc = staticFile("custom_epic.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: HERITAGE.primary }}>
      {/* Sync Cut Custom Epic Music Track */}
      <Audio src={audioSrc} volume={1.0} />

      {/* 0s - 3s (Frames 0 - 90): Kinetic Title Hook */}
      <Sequence from={0} durationInFrames={90}>
        <OpeningHook />
      </Sequence>

      {/* 3s - 9.5s (Frames 90 - 285): Feature 01 - Cohort Metrics & Attendance Warning */}
      <Sequence from={90} durationInFrames={195}>
        <FeatureZoomScene
          startFrom={0}
          endAt={195}
          zoomScale={1.35}
          originX="25%"
          originY="25%"
          badge="FEATURE 01"
          title="Live Cohort Diagnostics"
          description="Real-time monitoring of registered learners, session logs, and flashing attendance warnings."
          position="right"
        />
      </Sequence>

      {/* 9.5s - 16s (Frames 285 - 480): Feature 02 - Score Entry & ZPD Tutor Pairing */}
      <Sequence from={285} durationInFrames={195}>
        <FeatureZoomScene
          startFrom={100}
          endAt={295}
          zoomScale={1.45}
          originX="15%"
          originY="60%"
          badge="FEATURE 02"
          title="1-on-1 Score Registry"
          description="Instant assessment logging triggers Vygotsky Zone of Proximal Development tutor pairing."
          position="right"
        />
      </Sequence>

      {/* 16s - 23s (Frames 480 - 690): Feature 03 - Reciprocal Pairing Matrix */}
      <Sequence from={480} durationInFrames={210}>
        <FeatureZoomScene
          startFrom={350}
          endAt={560}
          zoomScale={1.4}
          originX="65%"
          originY="70%"
          badge="FEATURE 03"
          title="Dynamic Pairing Matrix"
          description="High-performing tutors are paired with peer educators to maximize mutual growth & support."
          position="left"
        />
      </Sequence>

      {/* 23s - 30s (Frames 690 - 900): Outro CTA */}
      <Sequence from={690} durationInFrames={210}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
