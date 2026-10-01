import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto, Photo } from "../components/Photo";
import { SilkRibbon, Particles, ChapterTitle } from "../components/Decorations";
import { Subtitle } from "../components/Subtitle";

// 传承 0-849帧 (28.3秒) — v16-v18
export const Heritage: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;

  const designers = [
    { name: "梁子", brand: "天意TANGY", feat: "带上巴黎时装周" },
    { name: "邢莉莉", brand: "德玺见萩", feat: "非遗保护与推广" },
    { name: "新锐设计师", brand: "数字创新", feat: "AI重构传统纹样" },
    { name: "年轻一代", brand: "日常穿搭", feat: "让香云纱走进生活" },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0f1a0f" }}>
      <FullscreenPhoto src="images/fashion_runway.jpg" startFrame={0} endFrame={450} darkness={0.55} />
      <FullscreenPhoto src="images/fashion_show.jpg" startFrame={420} endFrame={849} darkness={0.55} />

      <SilkRibbon delay={40} color="rgba(100, 180, 120, 0.1)" />
      <SilkRibbon delay={120} color="rgba(201, 169, 110, 0.08)" />
      <Particles count={22} />
      <ChapterTitle chapter="第四章" title="传承 · 古老面料的新生" startFrame={10} endFrame={200} />

      {/* 凋零→重生 对比 */}
      <div style={{ position: "absolute", top: 200, left: 100, opacity: interpolate(lf, [20, 80], [0, 1], { extrapolateRight: "clamp" }) }}>
        <div style={{ fontSize: 20, color: "#6a5a4a", fontFamily: "STSong, serif", letterSpacing: 4, textDecoration: "line-through", marginBottom: 8 }}>机器轰鸣 · 手工凋零</div>
        <div style={{ fontSize: 16, color: "#4a3a2a", fontFamily: "STSong, serif", letterSpacing: 3 }}>一度消失的晒莨场</div>
      </div>

      {/* 2008非遗认证 - 中上部 */}
      <div style={{ position: "absolute", top: 200, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [100, 160], [0, 1], { extrapolateRight: "clamp" }) }}>
        <div style={{ display: "inline-block", padding: "18px 48px", background: "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.05))", border: "2px solid #C9A96E", borderRadius: 8 }}>
          <div style={{ fontSize: 52, color: "#E8C872", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: 3 }}>2008</div>
          <div style={{ fontSize: 22, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 4, marginTop: 4 }}>国家级非物质文化遗产</div>
        </div>
      </div>

      {/* 传承者卡片 - 中部 */}
      <div style={{ position: "absolute", top: 420, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 18, width: 1500, justifyContent: "center" }}>
        {designers.map((d, i) => {
          const o = interpolate(lf, [330 + i * 70, 380 + i * 70], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const y = interpolate(lf, [330 + i * 70, 380 + i * 70], [25, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          return (
            <div key={i} style={{ width: 330, padding: "22px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,169,110,0.25)", borderRadius: 10, opacity: o, transform: `translateY(${y}px)` }}>
              <div style={{ fontSize: 28, color: "#E8D5A8", fontFamily: "STSong, serif", fontWeight: 600, marginBottom: 6 }}>{d.name}</div>
              <div style={{ fontSize: 18, color: "#C9A96E", fontFamily: "STSong, serif", letterSpacing: 2, marginBottom: 10 }}>{d.brand}</div>
              <div style={{ width: 36, height: 2, background: "#C9A96E", marginBottom: 10 }} />
              <div style={{ fontSize: 16, color: "#8B9a8B", fontFamily: "STSong, serif", lineHeight: 1.6 }}>{d.feat}</div>
            </div>
          );
        })}
      </div>

      {/* T台路径 - 下部 */}
      <div style={{ position: "absolute", top: 720, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [660, 720], [0, 1], { extrapolateRight: "clamp" }) }}>
        <div style={{ height: 3, width: 600, background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "0 auto 14px" }} />
        <span style={{ fontSize: 24, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 6 }}>顺德晒场 → 国际T台 → 日常衣橱</span>
      </div>

      {/* 小前景图 - 右下角 */}
      <Photo src="images/fashion_tangy1.jpg" startFrame={500} endFrame={780} x={1520} y={250} width={280} height={200} />

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="然而机器轰鸣中，手工晒莨场一度凋零。2008年，香云纱染整技艺入选国家级非物质文化遗产。" startFrame={0} endFrame={306} />
      <Subtitle text="今天，梁子将它带上巴黎时装周，邢莉莉创立德玺见萩，新锐设计师用AI重构纹样，年轻人让香云纱走进日常。" startFrame={311} endFrame={635} />
      <Subtitle text="从顺德的晒场到国际T台，古老的面料正在被重新看见。" startFrame={640} endFrame={829} />
    </div>
  );
};
