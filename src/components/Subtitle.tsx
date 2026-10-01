import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface SubtitleProps {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15, endFrame - 15, endFrame],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const y = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [20, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  if (frame < startFrame || frame > endFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px)`,
        opacity,
        maxWidth: 1400,
        textAlign: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "16px 40px",
          background: "rgba(20, 14, 8, 0.72)",
          borderRadius: 8,
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(201, 169, 110, 0.3)",
        }}
      >
        <span
          style={{
            fontSize: 38,
            color: "#F5EDE0",
            fontFamily: "STSong, SimSun, serif",
            letterSpacing: 2,
            lineHeight: 1.5,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
