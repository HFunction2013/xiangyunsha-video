import React from "react";
import { Composition } from "remotion";
import { XiangyunShaVideo } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="XiangyunSha"
        component={XiangyunShaVideo}
        durationInFrames={4680}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
