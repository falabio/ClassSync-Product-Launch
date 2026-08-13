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
  primary: "#1A1C1E", // Deep ink; headings, titles, core text
  secondary: "#6C7278", // Slate; borders, captions, layouts
  tertiary: "#B8422E", // Boston Clay; accents, focal callouts
  neutral: "#F7F5F2", // Warm limestone; foundations, slide panels
  cardBg: "rgba(247, 245, 242, 0.95)",
  cardBorder: "rgba(108, 114, 120, 0.25)",
};

// Typography styles using Public Sans & Space Grotesk fallback
const fontHeading = "'Public Sans', 'Inter', -apple-system, sans-serif";
const fontLabel = "'Space Grotesk', 'Courier New', monospace";

// Scene 1: Kinetic Opening Hook with Cinematic Scale Transition
const SceneOpeningHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy entrance spring
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const badgeSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  
  // Cut zoom transition out
  const scaleOut = interpolate(frame, [70, 90], [1, 1.15], { extrapolateRight: "clamp" });
  const opacityOut = interpolate(frame, [75, 90], [1, 0], { extrapolateRight: "clamp" });

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
      {/* Background Subtle Heritage Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${HERITAGE.secondary}20 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />

      <div style={{ zIndex: 10, maxWidth: "1000px" }}>
        {/* Label Tag */}
        <div
          style={{
            transform: `scale(${badgeSpring})`,
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: "4px",
            background: HERITAGE.tertiary,
            color: HERITAGE.neutral,
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: fontLabel,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(184, 66, 46, 0.3)",
          }}
        >
          INTRODUCING ACCELERATED TUTOR PEERING
        </div>

        {/* Big Bold Product Title */}
        <h1
          style={{
            fontSize: "96px",
            fontWeight: 900,
            color: HERITAGE.primary,
            margin: "0 0 16px 0",
            letterSpacing: "-3px",
            lineHeight: 1.0,
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.8, 1])})`,
          }}
        >
          ClassSync
        </h1>

        {/* Function Hook */}
        <p
          style={{
            fontSize: "28px",
            color: HERITAGE.secondary,
            fontWeight: 600,
            margin: "0 auto",
            opacity: subtitleOpacity,
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          Peering high-performing tutors with peer educators for 1-on-1 support so everyone grows together.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Reusable Dynamic Feature Overlay Card
interface FeatureOverlayProps {
  label: string;
  title: string;
  description: string;
  position?: "left" | "right" | "bottom";
}

const FeatureCard: React.FC<FeatureOverlayProps> = ({ label, title, description, position = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 10, 110, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = position === "left" 
    ? interpolate(entrance, [0, 1], [-50, 0])
    : position === "right" 
    ? interpolate(entrance, [0, 1], [50, 0])
    : 0;

  const translateY = position === "bottom" ? interpolate(entrance, [0, 1], [40, 0]) : 0;

  let posStyle: React.CSSProperties = { top: "10%", left: "5%" };
  if (position === "right") posStyle = { top: "10%", right: "5%" };
  if (position === "bottom") posStyle = { bottom: "8%", left: "5%" };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 30,
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        maxWidth: "480px",
        padding: "28px 36px",
        borderRadius: "12px",
        backgroundColor: HERITAGE.cardBg,
        border: `2px solid ${HERITAGE.cardBorder}`,
        boxShadow: "0 24px 60px rgba(26, 28, 30, 0.18)",
        fontFamily: fontHeading,
        ...posStyle,
      }}
    >
      <div
        style={{
          fontFamily: fontLabel,
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: HERITAGE.tertiary,
          marginBottom: "8px",
        }}
      >
        {label}
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
  );
};

// Scene: Call To Action Outro
const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const buttonSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

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
      {/* Background Accent Lines */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${HERITAGE.tertiary}33 0%, transparent 65%)`,
          filter: "blur(60px)",
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
            fontSize: "80px",
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
            maxWidth: "600px",
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

// Master ClassSync Social Hype Video (30-Seconds / 900 Frames @ 30fps)
export const ClassSyncSocialHype: React.FC = () => {
  const videoSrc = staticFile("dashboard_clean.mp4");
  const audioSrc = staticFile("custom_epic.mp3");

  return (
    <AbsoluteFill style={{ backgroundColor: HERITAGE.primary }}>
      {/* Epic Background Soundtrack */}
      <Audio src={audioSrc} volume={1.0} />

      {/* 0s - 3.5s (Frames 0 - 105): Hook Scene */}
      <Sequence from={0} durationInFrames={105}>
        <SceneOpeningHook />
      </Sequence>

      {/* 3.5s - 10.5s (Frames 105 - 315): Feature 1 - Intelligent Tutor Matching */}
      <Sequence from={105} durationInFrames={210}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} muted startFrom={0} endAt={210} style={{ objectFit: "cover" }} />
          <FeatureCard
            label="FEATURE 01"
            title="Smart Peer Pairing"
            description="Algorithmic matching links high-performing tutors with peers who need targeted 1-on-1 growth."
            position="left"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 10.5s - 17.5s (Frames 315 - 525): Feature 2 - 1-on-1 Growth Dashboard */}
      <Sequence from={315} durationInFrames={210}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} muted startFrom={250} endAt={460} style={{ objectFit: "cover" }} />
          <FeatureCard
            label="FEATURE 02"
            title="1-on-1 Support Tracking"
            description="Monitor live support sessions, skill gains, and mutual performance milestones in real-time."
            position="right"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 17.5s - 24s (Frames 525 - 720): Feature 3 - Block Progress Analytics */}
      <Sequence from={525} durationInFrames={195}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} muted startFrom={500} endAt={695} style={{ objectFit: "cover" }} />
          <FeatureCard
            label="FEATURE 03"
            title="Collective Impact Hub"
            description="Empower both tutors to learn from each other and elevate overall teaching outcomes."
            position="bottom"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 24s - 30s (Frames 720 - 900): Outro Call To Action */}
      <Sequence from={720} durationInFrames={180}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
