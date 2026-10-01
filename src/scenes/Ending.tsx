import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto } from "../components/Photo";
import { SilkRibbon, Particles } from "../components/Decorations";
import { Slogan } from "../components/Slogan";
import { Subtitle } from "../components/Subtitle";

// 结尾 0-360帧 (12.0秒) — v19-v20
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;
  const silkWave = Math.sin(lf * 0.08) * 20;
  const fadeOut = interpolate(lf, [280, 360], [1, 0.2], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <FullscreenPhoto src="images/fabric_black.jpg" startFrame={0} endFrame={360} darkness={0.6} />

      <div style={{ opacity: fadeOut, position: "absolute", inset: 0 }}>
        <SilkRibbon delay={0} color="rgba(201, 169, 110, 0.18)" />
        <SilkRibbon delay={60} color="rgba(201, 169, 110, 0.12)" />
        <SilkRibbon delay={120} color="rgba(139, 105, 20, 0.14)" />
        <Particles count={40} />
      </div>

      {/* 飘扬丝绸SVG */}
      <svg style={{ position: "absolute", top: 160, left: "50%", transform: `translateX(-50%) translateY(${silkWave}px)`, opacity: interpolate(lf, [0, 40], [0, 0.5], { extrapolateRight: "clamp" }) * fadeOut }} width="700" height="350" viewBox="0 0 800 400">
        <defs>
          <linearGradient id="silkGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1410" />
            <stop offset="50%" stopColor="#3d2b1a" />
            <stop offset="100%" stopColor="#1a1410" />
          </linearGradient>
        </defs>
        <path d={`M 100 ${150 + silkWave * 0.5} Q 250 ${100 - silkWave} 400 ${160 + silkWave * 0.3} T 700 ${140 - silkWave * 0.5} L 720 ${260 + silkWave * 0.3} Q 550 ${310 - silkWave * 0.5} 400 ${250 + silkWave} T 80 ${280 - silkWave * 0.3} Z`} fill="url(#silkGrad2)" opacity="0.7" />
        <path d={`M 200 ${170 + silkWave * 0.3} Q 350 ${140 - silkWave * 0.5} 500 ${180 + silkWave * 0.2}`} stroke="rgba(201,169,110,0.35)" strokeWidth="3" fill="none" />
      </svg>

      {/* "四百年"视觉文字 */}
      <div style={{ position: "absolute", top: 280, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [20, 80], [0, 1], { extrapolateRight: "clamp" }) * fadeOut }}>
        <div style={{ fontSize: 36, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 8, marginBottom: 12 }}>四百年草木浸染 · 四百年丝路传香</div>
      </div>

      <Slogan startFrame={100} endFrame={340} size={80} />

      <div style={{ position: "absolute", bottom: 80, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [180, 240], [0, 1], { extrapolateRight: "clamp" }) * fadeOut }}>
        <div style={{ fontSize: 18, color: "#5a4a35", fontFamily: "STSong, serif", letterSpacing: 8, marginBottom: 10 }}>国家级非物质文化遗产 · 香云纱染整技艺</div>
        <div style={{ fontSize: 14, color: "#4a3a25", fontFamily: "Georgia, serif", letterSpacing: 4 }}>Intangible Cultural Heritage of China</div>
      </div>

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="四百年草木浸染，四百年丝路传香。" startFrame={0} endFrame={165} />
      <Subtitle text="寻迹莨纱，非遗永续。" startFrame={170} endFrame={260} />
    </div>
  );
};
