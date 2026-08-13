import "./index.css";
import { Composition } from "remotion";
import { ClassSync45sLaunch } from "./ClassSync45sLaunch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master 45-Second ClassSync Product Launch Video (1350 frames @ 30fps) */}
      <Composition
        id="ClassSync45sLaunch"
        component={ClassSync45sLaunch}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
