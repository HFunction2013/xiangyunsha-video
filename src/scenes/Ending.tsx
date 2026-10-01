import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto } from "../components/Photo";
import { SilkRibbon, Particles } from "../components/Decorations";
import { Slogan } from "../components/Slogan";
import { Subtitle } from "../components/Subtitle";

// 结尾 0-807帧 (26.9秒) — 对应全局3958-4765
// 所有元素消失后，"谢谢观看"出现且永不消失
export const Ending: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;
  const silkWave = Math.sin(lf * 0.08) * 20;

  // 装饰元素淡出：600帧开始淡出，660帧完全消失
  const decorFadeOut = interpolate(lf, [600, 660], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // 谢谢观看：680帧开始淡入，740帧完全显示，之后永不消失
  const thankYouOpacity = interpolate(lf, [680, 740], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const thankYouScale = interpolate(lf, [680, 740], [0.85, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* 背景图全程显示 */}
      <FullscreenPhoto src="images/fabric_black.jpg" startFrame={0} endFrame={807} darkness={0.65} />

      {/* 装饰元素层：飘带、粒子，660帧后完全消失 */}
      <div style={{ opacity: decorFadeOut, position: "absolute", inset: 0 }}>
        <SilkRibbon delay={0} color="rgba(201, 169, 110, 0.18)" />
        <SilkRibbon delay={60} color="rgba(201, 169, 110, 0.12)" />
        <SilkRibbon delay={120} color="rgba(139, 105, 20, 0.14)" />
        <Particles count={40} />
      </div>

      {/* 飘扬丝绸SVG：660帧后消失 */}
      <svg style={{ position: "absolute", top: 120, left: "50%", transform: `translateX(-50%) translateY(${silkWave}px)`, opacity: interpolate(lf, [0, 40], [0, 0.4], { extrapolateRight: "clamp" }) * decorFadeOut }} width="700" height="350" viewBox="0 0 800 400">
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

      {/* 口号展示：300-580帧，之后消失 */}
      <Slogan startFrame={320} endFrame={600} size={56} />

      {/* 底部非遗文字：200帧淡入，660帧后消失 */}
      <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [200, 260], [0, 1], { extrapolateRight: "clamp" }) * decorFadeOut }}>
        <div style={{ fontSize: 18, color: "#5a4a35", fontFamily: "STSong, serif", letterSpacing: 8, marginBottom: 10 }}>国家级非物质文化遗产 · 香云纱染整技艺</div>
        <div style={{ fontSize: 14, color: "#4a3a25", fontFamily: "Georgia, serif", letterSpacing: 4 }}>Intangible Cultural Heritage of China</div>
      </div>

      {/* 字幕与音频精确同帧（v19: 全局4320=组件362帧，v20: 全局4490=组件532帧） */}
      <Subtitle text="四百年草木浸染，四百年丝路传香。" startFrame={362} endFrame={527} />
      <Subtitle text="寻迹莨纱，非遗永续。" startFrame={532} endFrame={622} />

      {/* 谢谢观看：所有元素消失后出现，且永不消失 */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${thankYouScale})`,
          opacity: thankYouOpacity,
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
    </div>
  );
};
