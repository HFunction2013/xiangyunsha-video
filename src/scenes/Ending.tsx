import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto } from "../components/Photo";
import { SilkRibbon, Particles } from "../components/Decorations";
import { Slogan } from "../components/Slogan";
import { Subtitle } from "../components/Subtitle";

// 结尾 0-810帧 (27.0秒) — 第二遍背景音乐前27秒，显示"谢谢观看"
// 对应全局帧：3958-4768
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;
  const silkWave = Math.sin(lf * 0.08) * 20;
  const fadeOut = interpolate(lf, [720, 810], [1, 0.15], { extrapolateRight: "clamp" });

  // "谢谢观看"大字淡入
  const thankYouOpacity = interpolate(lf, [80, 160], [0, 1], { extrapolateRight: "clamp" });
  const thankYouScale = interpolate(lf, [80, 160], [0.85, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <FullscreenPhoto src="images/fabric_black.jpg" startFrame={0} endFrame={810} darkness={0.65} />

      <div style={{ opacity: fadeOut, position: "absolute", inset: 0 }}>
        <SilkRibbon delay={0} color="rgba(201, 169, 110, 0.18)" />
        <SilkRibbon delay={60} color="rgba(201, 169, 110, 0.12)" />
        <SilkRibbon delay={120} color="rgba(139, 105, 20, 0.14)" />
        <Particles count={40} />
      </div>

      {/* 飘扬丝绸SVG */}
      <svg style={{ position: "absolute", top: 120, left: "50%", transform: `translateX(-50%) translateY(${silkWave}px)`, opacity: interpolate(lf, [0, 40], [0, 0.4], { extrapolateRight: "clamp" }) * fadeOut }} width="700" height="350" viewBox="0 0 800 400">
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

      {/* 谢谢观看大字 */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${thankYouScale})`,
          opacity: thankYouOpacity * fadeOut,
          textAlign: "center",
          zIndex: 30,
        }}
      >
        <div
          style={{
            fontSize: 120,
            color: "#F5EDE0",
            fontFamily: "STSong, SimSun, serif",
            letterSpacing: 24,
            fontWeight: 700,
            textShadow: "0 0 60px rgba(201,169,110,0.5), 0 4px 20px rgba(0,0,0,0.8)",
            marginBottom: 24,
          }}
        >
          谢谢观看
        </div>
        <div style={{ width: 160, height: 2, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 24px" }} />
        <div style={{ fontSize: 22, color: "#8B7355", fontFamily: "Georgia, serif", letterSpacing: 10 }}>THANK YOU FOR WATCHING</div>
      </div>

      {/* 口号展示 */}
      <Slogan startFrame={300} endFrame={650} size={56} />

      {/* 底部非遗文字 */}
      <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [200, 260], [0, 1], { extrapolateRight: "clamp" }) * fadeOut }}>
        <div style={{ fontSize: 18, color: "#5a4a35", fontFamily: "STSong, serif", letterSpacing: 8, marginBottom: 10 }}>国家级非物质文化遗产 · 香云纱染整技艺</div>
        <div style={{ fontSize: 14, color: "#4a3a25", fontFamily: "Georgia, serif", letterSpacing: 4 }}>Intangible Cultural Heritage of China</div>
      </div>

      {/* 字幕与音频精确同帧（v19: 全局4320=组件362帧，v20: 全局4490=组件532帧） */}
      <Subtitle text="四百年草木浸染，四百年丝路传香。" startFrame={362} endFrame={527} />
      <Subtitle text="寻迹莨纱，非遗永续。" startFrame={532} endFrame={622} />
    </div>
  );
};
