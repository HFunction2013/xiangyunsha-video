# 寻迹莨纱，非遗永续 — 香云纱非遗视频 Remotion 项目

基于 Remotion 4.0 + React 的程序化视频渲染项目，主题为国家级非物质文化遗产"香云纱染整技艺"。

## 视频规格

- 分辨率：1920×1080（1080p）
- 帧率：30fps
- 时长：2分36秒（156秒 / 4680帧）
- 编码：H.264 + AAC
- 配音：中文男声，分6段精确对齐
- 字幕：全程中文字幕

## 快速开始

```bash
# 安装依赖
npm install

# 启动预览（Remotion Studio）
npm start

# 渲染视频
npm run build
# 输出：out/xiangyunsha.mp4
```

## 项目结构

```
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── src/
│   ├── index.ts              # 入口
│   ├── Root.tsx              # Composition 注册（4680帧）
│   ├── Video.tsx             # 主组件：6段音频 + 6场景编排 + 转场
│   ├── components/
│   │   ├── Subtitle.tsx      # 字幕组件（淡入淡出）
│   │   ├── Slogan.tsx        # 口号"寻迹莨纱，非遗永续"
│   │   ├── Photo.tsx         # 图片组件（Ken Burns 运镜）
│   │   └── Decorations.tsx   # 丝绸飘带/粒子/章节标题/关键词卡片
│   └── scenes/
│       ├── Opening.tsx       # 开篇（0-540帧）
│       ├── Origin.tsx        # 起源（540-1755帧）
│       ├── Craft.tsx         # 技艺（1755-2727帧）
│       ├── Export.tsx        # 外销（2727-3477帧）
│       ├── Heritage.tsx      # 传承（3477-4377帧）
│       └── Ending.tsx        # 结尾（4377-4680帧）
├── public/
│   ├── narr_01~06.wav        # 6段配音（精确时长）
│   └── images/               # 19张真实图片素材
└── out/
    └── xiangyunsha.mp4       # 渲染成品
```

## 音画对齐方案

旁白按6个场景分别生成独立音频，用 ffprobe 获取精确时长后，在 Remotion 中用 `<Sequence>` 精确控制每段起始帧，字幕时间轴逐句校准。

| 段 | 场景 | 时长 | 帧范围 |
|----|------|------|--------|
| 01 | 开篇 | 18.0s | 0–540 |
| 02 | 起源 | 40.5s | 540–1755 |
| 03 | 技艺 | 32.4s | 1755–2727 |
| 04 | 外销 | 25.0s | 2727–3477 |
| 05 | 传承 | 30.0s | 3477–4377 |
| 06 | 结尾 | 8.8s | 4377–4680 |

## 图片素材

19张真实图片，涵盖：晒莨场航拍、工匠晾晒、薯莨原料/切片/染液、香云纱面料特写、民国老照片、时装周走秀等。全屏背景图带暗化遮罩，插图带 Ken Burns 缓慢运镜。

## 技术栈

- Remotion 4.0.240
- React 18.3
- TypeScript 5.4
- Node.js 22+
