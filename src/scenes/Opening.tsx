import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto } from "../components/Photo";
import { SilkRibbon, Particles } from "../components/Decorations";
import { Slogan } from "../components/Slogan";
import { Subtitle } from "../components/Subtitle";

// 开篇 0-528帧 (17.6秒) — v01-v03
export const Opening: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [30, 90], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [30, 90], [40, 0], { extrapolateRight: "clamp" });
  const goldLabelOpacity = interpolate(frame, [310, 360], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <FullscreenPhoto src="images/drying_aerial2.jpg" startFrame={0} endFrame={528} darkness={0.55} />
      <SilkRibbon delay={0} color="rgba(201, 169, 110, 0.15)" />
      <Particles count={30} />

      {/* 顶部标签 */}
      <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(-50%)", opacity: titleOpacity, textAlign: "center" }}>
        <div style={{ width: 160, height: 1, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 16px" }} />
        <div style={{ fontSize: 20, color: "#C9A96E", fontFamily: "STSong, serif", letterSpacing: 10 }}>国家级非物质文化遗产</div>
        <div style={{ fontSize: 14, color: "#8B7355", fontFamily: "Georgia, serif", letterSpacing: 6, marginTop: 8 }}>NATIONAL INTANGIBLE CULTURAL HERITAGE</div>
      </div>

      {/* 主标题 */}
      <div style={{ position: "absolute", top: 220, left: "50%", transform: `translateX(-50%) translateY(${titleY}px)`, opacity: titleOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 130, color: "#F5EDE0", fontFamily: "STSong, serif", letterSpacing: 36, fontWeight: 700, textShadow: "0 0 80px rgba(201,169,110,0.4), 0 4px 30px rgba(0,0,0,0.8)" }}>香云纱</div>
        <div style={{ fontSize: 16, color: "#8B7355", fontFamily: "Georgia, serif", letterSpacing: 10, marginTop: 16 }}>XIANGYUNSHA · THE SILK OF TIME</div>
      </div>

      {/* "软黄金"视觉标签 */}
      <div style={{ position: "absolute", top: 480, left: "50%", transform: "translateX(-50%)", opacity: goldLabelOpacity, textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "12px 40px", border: "1px solid rgba(201,169,110,0.5)", borderRadius: 4, background: "rgba(201,169,110,0.08)" }}>
          <span style={{ fontSize: 28, color: "#E8C872", fontFamily: "STSong, serif", letterSpacing: 8 }}>岭南「软黄金」</span>
        </div>
        <div style={{ fontSize: 15, color: "#8B7355", fontFamily: "Georgia, serif", letterSpacing: 4, marginTop: 12 }}>FOUR HUNDRED YEARS · PLANT-DYED SILK</div>
      </div>

      <Slogan startFrame={350} endFrame={520} size={56} />

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="珠江口的清晨，水汽未散。" startFrame={0} endFrame={108} />
      <Subtitle text="一匹素白丝绸，正等待与草木、河泥和阳光的相遇。" startFrame={113} endFrame={293} />
      <Subtitle text="这，就是香云纱——岭南人用四百年时光织就的「软黄金」。" startFrame={298} endFrame={508} />
    </div>
  );
};
