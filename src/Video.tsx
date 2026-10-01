import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Opening } from "./scenes/Opening";
import { Origin } from "./scenes/Origin";
import { Craft } from "./scenes/Craft";
import { Export } from "./scenes/Export";
import { Heritage } from "./scenes/Heritage";
import { Ending } from "./scenes/Ending";

// 20段配音，每段对应一句字幕，精确同帧
// 场景内段间隔5帧，场景间间隔20帧
const VOICE_SEGMENTS = [
  { file: "v01.wav", start: 0,    dur: 108 },
  { file: "v02.wav", start: 113,  dur: 180 },
  { file: "v03.wav", start: 298,  dur: 210 },
  { file: "v04.wav", start: 528,  dur: 252 },
  { file: "v05.wav", start: 785,  dur: 210 },
  { file: "v06.wav", start: 1000, dur: 279 },
  { file: "v07.wav", start: 1284, dur: 165 },
  { file: "v08.wav", start: 1469, dur: 240 },
  { file: "v09.wav", start: 1714, dur: 261 },
  { file: "v10.wav", start: 1980, dur: 264 },
  { file: "v11.wav", start: 2249, dur: 186 },
  { file: "v12.wav", start: 2440, dur: 240 },
  { file: "v13.wav", start: 2700, dur: 306 },
  { file: "v14.wav", start: 3011, dur: 195 },
  { file: "v15.wav", start: 3211, dur: 240 },
  { file: "v16.wav", start: 3471, dur: 306 },
  { file: "v17.wav", start: 3782, dur: 324 },
  { file: "v18.wav", start: 4111, dur: 189 },
  { file: "v19.wav", start: 4320, dur: 165 },
  { file: "v20.wav", start: 4490, dur: 90  },
];

export const XiangyunShaVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0805" }}>
      {/* 背景音乐：全程循环播放，音量为原来的90%（0.18），不盖过人声 */}
      <Sequence from={0} durationInFrames={4765}>
        <Audio src={staticFile("background.mp3")} volume={0.18} loop />
      </Sequence>

      {/* 20段配音按精确帧排列，每段与对应字幕完全同帧 */}
      {VOICE_SEGMENTS.map((seg, i) => (
        <Sequence key={i} from={seg.start} durationInFrames={seg.dur}>
          <Audio src={staticFile(seg.file)} volume={1} />
        </Sequence>
      ))}

      {/* 开篇 0-528 (17.6s) */}
      <Sequence from={0} durationInFrames={528}>
        <Opening />
      </Sequence>

      {/* 起源 528-1469 (31.4s) */}
      <Sequence from={528} durationInFrames={941}>
        <Origin />
      </Sequence>

      {/* 技艺 1469-2700 (41.0s) */}
      <Sequence from={1469} durationInFrames={1231}>
        <Craft />
      </Sequence>

      {/* 外销 2700-3471 (25.7s) */}
      <Sequence from={2700} durationInFrames={771}>
        <Export />
      </Sequence>

      {/* 传承 3471-4320 (28.3s) */}
      <Sequence from={3471} durationInFrames={849}>
        <Heritage />
      </Sequence>

      {/* 结尾 3958-4765 (26.9s) — 第二遍背景音乐前27秒，所有元素消失后显示"谢谢观看" */}
      <Sequence from={3958} durationInFrames={807}>
        <Ending />
      </Sequence>

      {/* 全程暗角 */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)", zIndex: 250 }} />
    </AbsoluteFill>
  );
};
