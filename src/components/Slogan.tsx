import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

interface SloganProps {
  startFrame: number;
  endFrame: number;
  size?: number;
}

export const Slogan: React.FC<SloganProps> = ({ startFrame, endFrame, size = 72 }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 30, endFrame - 30, endFrame],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const scale = interpolate(
    frame,
    [startFrame, startFrame + 30],
    [0.9, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  if (frame < startFrame || frame > endFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        textAlign: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontSize: size,
          color: "#C9A96E",
          fontFamily: "STSong, SimSun, serif",
          letterSpacing: 12,
          fontWeight: 600,
          textShadow: "0 0 40px rgba(201, 169, 110, 0.4), 0 4px 12px rgba(0,0,0,0.6)",
          marginBottom: 20,
        }}
      >
        寻迹莨纱
      </div>
      <div
        style={{
          width: 120,
          height: 2,
          background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          margin: "0 auto 20px",
        }}
      />
      <div
        style={{
          fontSize: size,
          color: "#C9A96E",
          fontFamily: "STSong, SimSun, serif",
          letterSpacing: 12,
          fontWeight: 600,
          textShadow: "0 0 40px rgba(201, 169, 110, 0.4), 0 4px 12px rgba(0,0,0,0.6)",
        }}
      >
        非遗永续
      </div>
    </div>
  );
};
