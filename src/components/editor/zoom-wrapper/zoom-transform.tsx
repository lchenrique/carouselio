import type { ReactNode } from "react";
import { TransformComponent } from "react-zoom-pan-pinch";

export const ZoomTransform = ({ children }: { children: ReactNode }) => {
  return (
    <TransformComponent

      contentStyle={{
        height: "min-content",
        width: "min-content",
        // cursor: pan ? "grab" : "inherit",
      }}
      wrapperStyle={{
        height: "100%",
        position: "static",
        overflow: "visible",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {children}
    </TransformComponent>
  );
};
