import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

// 丝绸飘带动画
export const SilkRibbon: React.FC<{ delay?: number; color?: string }> = ({ delay = 0, color = "rgba(201, 169, 110, 0.15)" }) => {
  const frame = useCurrentFrame();
  const offset = (frame + delay) % 300;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0.6,
      }}
      viewBox="0 0 1920 1080"
    >
      <path
        d={`M ${-200 + offset * 2} ${200 + Math.sin(offset * 0.05) * 50}
            Q ${400 + offset * 2} ${100 + Math.sin(offset * 0.03) * 80},
              ${800 + offset * 2} ${300 + Math.cos(offset * 0.04) * 60}
            T ${1600 + offset * 2} ${250 + Math.sin(offset * 0.06) * 70}
            T ${2400 + offset * 2} ${350}`}
        stroke={color}
        strokeWidth="80"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d={`M ${-300 + offset * 1.5} ${700 + Math.cos(offset * 0.04) * 60}
            Q ${500 + offset * 1.5} ${850 + Math.sin(offset * 0.05) * 50},
              ${1100 + offset * 1.5} ${750 + Math.cos(offset * 0.03) * 70}
            T ${2300 + offset * 1.5} ${800 + Math.sin(offset * 0.04) * 60}`}
        stroke={color}
        strokeWidth="60"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
};

// 粒子光点
export const Particles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: count }, (_, i) => {
    const baseX = (i * 137.5) % 1920;
    const baseY = (i * 89.3) % 1080;
    const speed = 0.3 + (i % 5) * 0.1;
    const x = (baseX + frame * speed) % 1920;
    const y = (baseY + Math.sin((frame + i * 30) * 0.02) * 30 + 1080) % 1080;
    const opacity = 0.2 + Math.sin((frame + i * 20) * 0.03) * 0.15;
    const size = 2 + (i % 3);
    return { x, y, opacity, size, key: i };
  });

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.key}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#C9A96E",
            opacity: p.opacity,
            boxShadow: "0 0 6px rgba(201, 169, 110, 0.6)",
          }}
        />
      ))}
    </>
  );
};

// 章节标题
interface ChapterTitleProps {
  chapter: string;
  title: string;
  startFrame: number;
  endFrame: number;
}

export const ChapterTitle: React.FC<ChapterTitleProps> = ({ chapter, title, startFrame, endFrame }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 25, endFrame - 25, endFrame],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const x = interpolate(
    frame,
    [startFrame, startFrame + 25],
    [-60, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  if (frame < startFrame || frame > endFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 120,
        opacity,
        transform: `translateX(${x}px)`,
        zIndex: 40,
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#8B6914",
          fontFamily: "STSong, SimSun, serif",
          letterSpacing: 8,
          marginBottom: 12,
        }}
      >
        {chapter}
      </div>
      <div
        style={{
          fontSize: 56,
          color: "#F5EDE0",
          fontFamily: "STSong, SimSun, serif",
          letterSpacing: 6,
          fontWeight: 600,
          textShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          width: 80,
          height: 3,
          background: "#C9A96E",
          marginTop: 16,
        }}
      />
    </div>
  );
};

// 渐变背景
export const GradientBackground: React.FC<{ from: string; to: string }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  const shift = Math.sin(frame * 0.005) * 5;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(${135 + shift}deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
};

// 关键词卡片
interface KeywordCardProps {
  text: string;
  x: number;
  y: number;
  startFrame: number;
  delay?: number;
}

export const KeywordCard: React.FC<KeywordCardProps> = ({ text, x, y, startFrame, delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveStart = startFrame + delay;

  const opacity = interpolate(
    frame,
    [effectiveStart, effectiveStart + 20],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const scale = interpolate(
    frame,
    [effectiveStart, effectiveStart + 20],
    [0.8, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        padding: "14px 32px",
        background: "rgba(201, 169, 110, 0.12)",
        border: "1px solid rgba(201, 169, 110, 0.4)",
        borderRadius: 6,
        fontSize: 28,
        color: "#E8D5A8",
        fontFamily: "STSong, SimSun, serif",
        letterSpacing: 4,
      }}
    >
      {text}
    </div>
  );
};
