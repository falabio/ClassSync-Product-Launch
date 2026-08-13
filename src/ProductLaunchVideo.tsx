import React from "react";
import {
  AbsoluteFill,
  Interpolate,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

// Premium Theme Colors
const COLORS = {
  bg: "#0B0F17",
  accentBlue: "#3B82F6",
  accentCyan: "#06B6D4",
  accentPurple: "#8B5CF6",
  textPrimary: "#F8FAFC",
  textMuted: "#94A3B8",
  cardBg: "rgba(15, 23, 42, 0.8)",
  cardBorder: "rgba(59, 130, 246, 0.3)",
};

interface FeatureOverlayProps {
  title: string;
  subtitle: string;
  badge?: string;
  position?: "left" | "right" | "center" | "bottom";
}

const FeatureCard: React.FC<FeatureOverlayProps> = ({ title, subtitle, badge, position = "left" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);

  let alignStyle: React.CSSProperties = {
    top: "12%",
    left: "6%",
  };

  if (position === "right") {
    alignStyle = { top: "12%", right: "6%" };
  } else if (position === "center") {
    alignStyle = { top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${scale})` };
  } else if (position === "bottom") {
    alignStyle = { bottom: "10%", left: "6%" };
  }

  if (position !== "center") {
    alignStyle.transform = `translateY(${translateY}px) scale(${scale})`;
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 20,
        opacity,
        maxWidth: "520px",
        padding: "24px 32px",
        borderRadius: "16px",
        background: "rgba(11, 15, 23, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.15)",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        ...alignStyle,
      }}
    >
      {badge && (
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            color: "#FFFFFF",
            marginBottom: "12px",
          }}
        >
          {badge}
        </span>
      )}
      <h3
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: 800,
          color: COLORS.textPrimary,
          letterSpacing: "-0.5px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "8px 0 0 0",
          fontSize: "16px",
          color: COLORS.textMuted,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

// Title Screen Component
const TitleScene: React.FC<{ title: string; subtitle: string; tag: string }> = ({ title, subtitle, tag }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12 },
  });

  const subtitleOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Background glowing gradient orb */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, rgba(6,182,212,0.1) 40%, rgba(11,15,23,0) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div style={{ transform: `scale(${interpolate(titleSpring, [0, 1], [0.85, 1])})`, zIndex: 10 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: "30px",
            background: "rgba(59, 130, 246, 0.15)",
            border: "1px solid rgba(59, 130, 246, 0.4)",
            color: "#60A5FA",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {tag}
        </div>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 900,
            margin: "0 0 16px 0",
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#94A3B8",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: subtitleOpacity,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Call To Action Scene
const OutroScene: React.FC<{ title: string; ctaText: string; url: string }> = ({ title, ctaText, url }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ transform: `scale(${scale})`, zIndex: 10 }}>
        <h2
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "#FFFFFF",
            margin: "0 0 12px 0",
            letterSpacing: "-1px",
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "20px", color: COLORS.accentCyan, margin: "0 0 32px 0", fontWeight: 600 }}>
          {url}
        </p>

        <button
          style={{
            padding: "16px 40px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#FFFFFF",
            background: "linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)",
            border: "none",
            borderRadius: "50px",
            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
            cursor: "pointer",
          }}
        >
          {ctaText}
        </button>
      </div>
    </AbsoluteFill>
  );
};

// 60-Second Full Product Launch Video Composition
export const MainLaunchVideo: React.FC = () => {
  const videoSrc = staticFile("dashboard_clean.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* 0s - 4s: Intro Hook */}
      <Sequence from={0} durationInFrames={120}>
        <TitleScene
          tag="Product Announcement"
          title="Peering Hub Dashboard"
          subtitle="Real-time analytics and peer-to-peer insights built for modern educators."
        />
      </Sequence>

      {/* 4s - 14s: Highlight 1 - Block 1 Overview */}
      <Sequence from={120} durationInFrames={300}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={15} endAt={315} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Feature 01"
            title="Block 1 Analytics Hub"
            subtitle="Instant visibility into teacher participation, core engagement, and activity metrics."
            position="left"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 14s - 26s: Highlight 2 - Block 2 Live Monitoring */}
      <Sequence from={420} durationInFrames={360}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={350} endAt={710} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Feature 02"
            title="Block 2 Peer-to-Peer Hub"
            subtitle="Track real-time collaboration clusters and monitor peer group milestones effortlessly."
            position="right"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 26s - 38s: Highlight 3 - Deep Dive Data */}
      <Sequence from={780} durationInFrames={360}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={800} endAt={1160} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Feature 03"
            title="Interactive Data Breakdown"
            subtitle="Drill down into individual block progress with clean visual indicators."
            position="bottom"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 38s - 48s: Highlight 4 - Full Workflow View */}
      <Sequence from={1140} durationInFrames={300}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={1200} endAt={1500} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Seamless Workflow"
            title="Designed for Speed & Scale"
            subtitle="Empower your team with clean intuitive dashboards that drive action."
            position="left"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 48s - 55s: Call To Action Outro */}
      <Sequence from={1440} durationInFrames={210}>
        <OutroScene
          title="Transform Your Dashboard Experience"
          ctaText="Explore Peering Hub Today"
          url="ashoka-competition.org/peering-hub"
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// 30-Second Fast-Paced Social Trailer Composition
export const SocialHypeTrailer: React.FC = () => {
  const videoSrc = staticFile("dashboard_clean.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* 0s - 3s: Fast Title Hook */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene
          tag="NEXT-GEN DASHBOARD"
          title="Peering Hub 2.0"
          subtitle="The future of educational analytics is here."
        />
      </Sequence>

      {/* 3s - 10s: Feature 1 Blitz */}
      <Sequence from={90} durationInFrames={210}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={20} endAt={230} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Block 1"
            title="Real-Time Analytics"
            subtitle="Instant insights across all activity blocks."
            position="left"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 10s - 18s: Feature 2 Blitz */}
      <Sequence from={300} durationInFrames={240}>
        <AbsoluteFill>
          <OffthreadVideo src={videoSrc} startFrom={400} endAt={640} style={{ objectFit: "cover" }} />
          <FeatureCard
            badge="Block 2"
            title="Peer Collaboration"
            subtitle="Track live engagement and team syncs."
            position="right"
          />
        </AbsoluteFill>
      </Sequence>

      {/* 18s - 25s: Outro Call to Action */}
      <Sequence from={540} durationInFrames={210}>
        <OutroScene
          title="Get Started Now"
          ctaText="Launch Dashboard"
          url="peeringhub.ashoka.org"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
