import React from "react";
import { useCurrentFrame, interpolate, staticFile } from "remotion";

interface PhotoProps {
  src: string;
  startFrame: number;
  endFrame: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scaleStart?: number;
  scaleEnd?: number;
  panX?: number;
  panY?: number;
  borderRadius?: number;
  border?: boolean;
  overlay?: boolean;
}

// 带 Ken Burns 效果（缓慢缩放+平移）和淡入淡出的图片组件
export const Photo: React.FC<PhotoProps> = ({
  src,
  startFrame,
  endFrame,
  x = 0,
  y = 0,
  width = 800,
  height = 500,
  scaleStart = 1.0,
  scaleEnd = 1.12,
  panX = 0,
  panY = 0,
  borderRadius = 8,
  border = true,
  overlay = true,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > endFrame) return null;

  const localFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  const opacity = interpolate(
    localFrame,
    [0, 30, duration - 30, duration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const progress = localFrame / duration;
  const scale = scaleStart + (scaleEnd - scaleStart) * progress;
  const translateX = panX * progress;
  const translateY = panY * progress;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        overflow: "hidden",
        borderRadius,
        border: border ? "2px solid rgba(201, 169, 110, 0.4)" : "none",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        zIndex: 10,
      }}
    >
      <img
        src={staticFile(src)}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
        }}
      />
      {overlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      )}
    </div>
  );
};

// 全屏背景图片（带暗化遮罩）
interface FullscreenPhotoProps {
  src: string;
  startFrame: number;
  endFrame: number;
  darkness?: number;
}

export const FullscreenPhoto: React.FC<FullscreenPhotoProps> = ({
  src,
  startFrame,
  endFrame,
  darkness = 0.55,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > endFrame) return null;

  const localFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  const opacity = interpolate(
    localFrame,
    [0, 35, duration - 35, duration],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const scale = interpolate(localFrame, [0, duration], [1.05, 1.18], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <img
        src={staticFile(src)}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, rgba(10,6,3,${darkness + 0.15}) 0%, rgba(10,6,3,${darkness}) 50%, rgba(10,6,3,${darkness + 0.2}) 100%)`,
        }}
      />
    </div>
  );
};
