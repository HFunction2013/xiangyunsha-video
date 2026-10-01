import React from "react";
import { useCurrentFrame, interpolate, interpolateColors } from "remotion";
import { FullscreenPhoto, Photo } from "../components/Photo";
import { SilkRibbon, Particles, ChapterTitle } from "../components/Decorations";
import { Subtitle } from "../components/Subtitle";

const CRAFT_STEPS = [
  { name: "榨莨", desc: "薯莨榨汁" }, { name: "浸莨", desc: "坯绸浸泡" },
  { name: "晒莨", desc: "日光晾晒" }, { name: "洒莨", desc: "均匀涂布" },
  { name: "封莨", desc: "反复浸染" }, { name: "煮绸", desc: "铜锅温煮" },
  { name: "卷绸", desc: "卷绸整理" }, { name: "过泥", desc: "河泥涂布" },
  { name: "洗涤", desc: "清水洗净" }, { name: "晒干", desc: "草地晒干" },
  { name: "摊雾", desc: "雾气回潮" }, { name: "拉幅", desc: "拉幅整装" },
];

// 技艺 0-1231帧 (41.0秒) — v08-v12
export const Craft: React.FC = () => {
  const frame = useCurrentFrame();
  const lf = frame;
  const activeStep = Math.floor(lf / 90);
  const progress = interpolate(lf, [0, 1100], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#15100a" }}>
      <FullscreenPhoto src="images/drying_workers.jpg" startFrame={0} endFrame={450} darkness={0.55} />
      <FullscreenPhoto src="images/drying_spread.jpg" startFrame={420} endFrame={850} darkness={0.55} />
      <FullscreenPhoto src="images/drying_closeup.jpg" startFrame={820} endFrame={1231} darkness={0.5} />

      <SilkRibbon delay={20} color="rgba(201, 169, 110, 0.1)" />
      <Particles count={15} />
      <ChapterTitle chapter="第二章" title="技艺 · 三蒸九煮十八晒" startFrame={10} endFrame={220} />

      {/* 核心数据 - 中上部 */}
      <div style={{ position: "absolute", top: 200, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 100, opacity: interpolate(lf, [30, 90], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        {[{ num: "14", label: "种工艺" }, { num: "36", label: "道工序" }, { num: "数十次", label: "反复浸染" }].map((item, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 72, color: "#C9A96E", fontFamily: "Georgia, serif", fontWeight: 700, textShadow: "0 0 30px rgba(201,169,110,0.3)" }}>{item.num}</div>
            <div style={{ fontSize: 20, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 4, marginTop: 6 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* 工艺流程网格 - 中部 */}
      <div style={{ position: "absolute", top: 380, left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, width: 1200, opacity: interpolate(lf, [260, 320], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        {CRAFT_STEPS.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={i} style={{ padding: "12px 8px", background: isCurrent ? "rgba(201,169,110,0.22)" : isActive ? "rgba(201,169,110,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${isCurrent ? "#C9A96E" : isActive ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, textAlign: "center" }}>
              <div style={{ fontSize: 20, color: isActive ? "#E8D5A8" : "#5a4a35", fontFamily: "STSong, serif", letterSpacing: 2, marginBottom: 3 }}>{step.name}</div>
              <div style={{ fontSize: 12, color: isActive ? "#8B7355" : "#3a3025", fontFamily: "STSong, serif" }}>{step.desc}</div>
            </div>
          );
        })}
      </div>

      {/* 化学反应公式 - 中下部 */}
      <div style={{ position: "absolute", top: 620, left: "50%", transform: "translateX(-50%)", padding: "14px 36px", background: "rgba(101,67,33,0.4)", border: "1px solid rgba(201,169,110,0.35)", borderRadius: 6, opacity: interpolate(lf, [530, 590], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <span style={{ fontSize: 24, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 3 }}>单宁酸 + 氧化铁 → 鞣酸亚铁（乌黑发亮）</span>
      </div>

      {/* "看天吃饭"三要素 */}
      <div style={{ position: "absolute", top: 740, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 60, opacity: interpolate(lf, [800, 860], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        {[{ icon: "☀", text: "阳光" }, { icon: "🌡", text: "温度" }, { icon: "💧", text: "湿度" }].map((item, i) => (
          <div key={i} style={{ textAlign: "center", padding: "12px 28px", border: "1px solid rgba(201,169,110,0.3)", borderRadius: 8, background: "rgba(201,169,110,0.06)" }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{item.icon}</div>
            <div style={{ fontSize: 20, color: "#E8D5A8", fontFamily: "STSong, serif", letterSpacing: 4 }}>{item.text}</div>
          </div>
        ))}
        <div style={{ alignSelf: "center", fontSize: 18, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 3 }}>差一分都不行</div>
      </div>

      {/* 耗时数据 */}
      <div style={{ position: "absolute", top: 880, left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: interpolate(lf, [990, 1050], [0, 1], { extrapolateRight: "clamp" }), zIndex: 20 }}>
        <div style={{ fontSize: 18, color: "#8B7355", fontFamily: "STSong, serif", letterSpacing: 5, marginBottom: 8 }}>从白坯到成品</div>
        <div style={{ fontSize: 38, color: "#E8C872", fontFamily: "STSong, serif", letterSpacing: 6 }}>耗时数月乃至数年</div>
      </div>

      {/* 小尺寸前景图 - 右下角 */}
      <Photo src="images/fabric_black.jpg" startFrame={700} endFrame={1100} x={1500} y={350} width={280} height={200} />

      {/* 字幕与音频精确同帧 */}
      <Subtitle text="「三蒸九煮十八晒」——十四种工艺，三十六道工序。" startFrame={0} endFrame={240} />
      <Subtitle text="榨莨、浸莨、晒莨、洒莨、封莨、煮绸、卷绸……每一步都凭匠人手感。" startFrame={245} endFrame={506} />
      <Subtitle text="薯莨汁中的单宁酸，与河泥中的氧化铁相遇，生成黑色的鞣酸亚铁，让绸面乌黑发亮。" startFrame={511} endFrame={775} />
      <Subtitle text="而这一切，必须看天吃饭——阳光、温度、湿度，差一分都不行。" startFrame={780} endFrame={966} />
      <Subtitle text="一匹布，从白坯到成品，要经历数十次反复浸染晾晒，耗时数月乃至数年。" startFrame={971} endFrame={1211} />
    </div>
  );
};
