import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { FullscreenPhoto, Photo } from "../components/Photo";
import { SilkRibbon, Particles, ChapterTitle } from "../components/Decorations";
import { Subtitle } from "../components/Subtitle";

// 起源 0-941帧 (31.4秒) — v04-v07
export const Origin: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#1a1208" }}>
      {/* 全屏背景图轮播 */}
      <FullscreenPhoto src="images/shuliang_fresh.jpg" startFrame={0} endFrame={400} darkness={0.55} />
      <FullscreenPhoto src="images/drying_aerial1.jpg" startFrame={370} endFrame={720} darkness={0.55} />
      <FullscreenPhoto src="images/fabric_scarf.jpg" startFrame={690} endFrame={941} darkness={0.5} />

      <SilkRibbon delay={30} color="rgba(139, 105, 20, 0.1)" />
      <Particles count={15} />
      <ChapterTitle chapter="第一章" title="起源 · 草木与河泥的相遇" startFrame={10} endFrame={250} />

      {/* 时间线视觉文字 - 左侧中上部，不被前景图遮挡 */}
      <div style={{ position: "absolute", top: 200, left: 100, opacity: interpolate(lf, [60, 120], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 56, color: "#C9A96E", fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: 2 }}>宋代</div>
        <div style={{ width: 2, height: 50, background: "linear-gradient(180deg, #C9A96E, transparent)", margin: "8px 0 8px 28px" }} />
        <div style={{ fontSize: 20, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 3 }}>先民发现薯莨染丝之法</div>
      </div>

      {/* 名词解释卡片 - 薯莨 */}
      <div style={{ position: "absolute", top: 420, left: 100, padding: "16px 28px", background: "rgba(101,67,33,0.4)", borderLeft: "3px solid #C9A96E", opacity: interpolate(lf, [150, 210], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 24, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 3, marginBottom: 4 }}>薯莨</div>
        <div style={{ fontSize: 15, color: "#8B7355", fontFamily: "STSong, serif" }}>山间野生植物 · 汁液含单宁酸</div>
      </div>

      {/* 名词解释卡片 - 河泥 */}
      <div style={{ position: "absolute", top: 560, left: 100, padding: "16px 28px", background: "rgba(60,80,100,0.35)", borderLeft: "3px solid #7BA7C9", opacity: interpolate(lf, [280, 340], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 24, color: "#A8C8E0", fontFamily: "STSong, serif", letterSpacing: 3, marginBottom: 4 }}>河涌铁泥</div>
        <div style={{ fontSize: 15, color: "#7A9AB5", fontFamily: "STSong, serif" }}>河底淤泥 · 富含氧化铁</div>
      </div>

      {/* 核心结论 - 唯一纯植物矿物染 */}
      <div style={{ position: "absolute", top: 350, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [500, 560], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 22, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 6, marginBottom: 12 }}>世间唯一</div>
        <div style={{ fontSize: 42, color: "#E8C872", fontFamily: "STSong, serif", letterSpacing: 8, textShadow: "0 0 30px rgba(201,169,110,0.3)" }}>纯植物与矿物染制真丝</div>
      </div>

      {/* 海上丝路时间节点 */}
      <div style={{ position: "absolute", top: 560, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [770, 830], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 18, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 5, marginBottom: 8 }}>明永乐年间</div>
        <div style={{ fontSize: 32, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 6 }}>循海上丝绸之路 · 远销海外</div>
      </div>

      {/* 小尺寸前景插图 - 右下角，不挡左侧文字 */}
      <Photo src="images/shuliang_raw.jpg" startFrame={300} endFrame={650} x={1460} y={200} width={300} height={230} />
      <Photo src="images/shuliang_juice.jpg" startFrame={550} endFrame={880} x={1480} y={520} width={280} height={210} />

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="故事始于宋代。珠三角的先民发现，山间野生的薯莨，榨出的汁液能染丝；" startFrame={0} endFrame={252} />
      <Subtitle text="而河涌底部富含铁质的淤泥，竟能让丝面泛起幽亮的光泽。" startFrame={257} endFrame={467} />
      <Subtitle text="一草一泥，一染一晒，偶然间成就了世间唯一用纯植物与矿物染制的真丝织物。" startFrame={472} endFrame={751} />
      <Subtitle text="明代永乐年间，它已循着海上丝绸之路，远销海外。" startFrame={756} endFrame={921} />
    </div>
  );
};
