import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto, Photo } from "../components/Photo";
import { SilkRibbon, Particles, ChapterTitle } from "../components/Decorations";
import { Subtitle } from "../components/Subtitle";

// 外销 0-771帧 (25.7秒) — v13-v15
export const Export: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;
  const shipX = interpolate(lf, [60, 550], [-300, 2200], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a1520" }}>
      <FullscreenPhoto src="images/old_photo1.jpg" startFrame={0} endFrame={400} darkness={0.5} />
      <FullscreenPhoto src="images/fabric_bamboo.jpg" startFrame={370} endFrame={771} darkness={0.55} />

      <SilkRibbon delay={50} color="rgba(100, 150, 200, 0.1)" />
      <Particles count={18} />
      <ChapterTitle chapter="第三章" title="外销 · 海上丝绸之路" startFrame={10} endFrame={200} />

      {/* 时间标签 */}
      <div style={{ position: "absolute", top: 200, left: 100, opacity: interpolate(lf, [30, 90], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 52, color: "#C9A96E", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: 2 }}>1920s</div>
        <div style={{ fontSize: 22, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 4, marginTop: 4 }}>顺德 · 鼎盛时期</div>
      </div>

      {/* 商船动画 */}
      <div style={{ position: "absolute", bottom: 340, left: shipX, transform: `rotate(${Math.sin(lf * 0.08) * 3}deg)`, opacity: 0.6 }}>
        <svg width="160" height="120" viewBox="0 0 200 160">
          <path d="M10 100 L190 100 L170 140 L30 140 Z" fill="#5a3a1a" stroke="#8B6914" strokeWidth="2" />
          <rect x="95" y="20" width="6" height="85" fill="#4a3015" />
          <path d="M100 25 L160 50 L100 95 Z" fill="#E8D5A8" opacity="0.9" />
          <path d="M96 30 L50 55 L96 90 Z" fill="#D4C090" opacity="0.85" />
        </svg>
      </div>

      {/* 鼎盛数据 - 中上部 */}
      <div style={{ position: "absolute", top: 340, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 40, opacity: interpolate(lf, [120, 180], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        {[{ num: "500+", label: "晒莨工场" }, { num: "10000+", label: "从业工人" }, { num: "4000m", label: "日产量" }].map((item, i) => (
          <div key={i} style={{ textAlign: "center", padding: "18px 32px", background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: 8 }}>
            <div style={{ fontSize: 48, color: "#C9A96E", fontFamily: "Georgia, serif", fontWeight: 700 }}>{item.num}</div>
            <div style={{ fontSize: 18, color: "#8B7355", fontFamily: "STSong, serif", marginTop: 6, letterSpacing: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 海外美誉 */}
      <div style={{ position: "absolute", top: 560, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [330, 390], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 20, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 6, marginBottom: 10 }}>南洋 · 欧美 誉为</div>
        <div style={{ fontSize: 52, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 10, textShadow: "0 0 30px rgba(201,169,110,0.3)" }}>「黑色闪光珍珠」</div>
        <div style={{ fontSize: 16, color: "#5a7a9a", fontFamily: "Georgia, serif", marginTop: 10, letterSpacing: 4 }}>Black Shining Pearl</div>
      </div>

      {/* 价格数据 */}
      <div style={{ position: "absolute", top: 760, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [530, 590], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ display: "inline-block", padding: "14px 40px", background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.4)", borderRadius: 8 }}>
          <span style={{ fontSize: 20, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 3 }}>每匹值 </span>
          <span style={{ fontSize: 36, color: "#E8C872", fontFamily: "Georgia, serif", fontWeight: 700 }}>十二两白银</span>
        </div>
        <div style={{ fontSize: 16, color: "#6B5344", fontFamily: "STSong, serif", letterSpacing: 3, marginTop: 10 }}>京沪上流社会以穿香云纱为荣</div>
      </div>

      {/* 小前景图 - 右下角 */}
      <Photo src="images/old_photo2.jpg" startFrame={350} endFrame={650} x={1520} y={200} width={280} height={200} />

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="清末民初，香云纱迎来鼎盛。1920年代的顺德，五百多家晒莨厂、上万名工人，日产香云纱四千多米。" startFrame={0} endFrame={306} />
      <Subtitle text="它顺着季风漂洋过海，在南洋、欧美被称作「黑色闪光珍珠」。" startFrame={311} endFrame={506} />
      <Subtitle text="最贵时，一匹香云纱值十二两白银，北京、上海的上流社会以穿香云纱为荣。" startFrame={511} endFrame={751} />
    </div>
  );
};
