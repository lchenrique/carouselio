"use client";
import { useState, type ComponentProps, type ReactNode } from "react";
import { TransformWrapper, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

export interface IZoomWrapper {
  children: (ref: ReactZoomPanPinchContentRef, zoomLevel: number) => ReactNode;
}

export const ZoomWrapper = ({ children }: IZoomWrapper) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  return (
    <>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        centerOnInit
        doubleClick={{
          mode: "toggle",
          step: 0.0,
        }}
        panning={{
          disabled: true,
          excluded: ["title", "sub", "drag-ghost", "editor"],
        }}
        onZoom={(e) => {
          setZoomLevel(e.state.scale);
        }}
      >
        {(ref) => children(ref, zoomLevel)}
      </TransformWrapper>
    </>
  );
};
