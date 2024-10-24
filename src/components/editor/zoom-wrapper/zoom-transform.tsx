import type { ReactNode } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";

export const ZoomTransform = ({ children }: { children: ReactNode }) => {
  return (
    <TransformComponent
      contentStyle={{
        height: "100%",
        width: "100%",
        // cursor: pan ? "grab" : "inherit",
      }}
      wrapperStyle={{
        height: "100%",
        position: "relative",
        overflow: "visible",
        width: "100%",
      }}
    >
      {children}
    </TransformComponent>
  );
};
