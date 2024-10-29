import { useBgControl } from "@/hooks/use-bg-control copy";
import { useContentControl } from "@/hooks/use-content-control";
import { ColorsPanel } from "@/panels/colors.panel";
import { useEditorContext } from "@/providers/editor-provider";
import { useSlideControl } from "@/store/slide-control";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export const BgColorControl = ({ index }: { index: number }) => {
  const setSlideCustomization = useSlideControl((state) => state.setSlideCustomization);
  const slideCustom = useSlideControl((state) => state.slideCustomization[index]);


  const handleChangeTextColor = (color: string, gradient?: boolean) => {
    setSlideCustomization(index, {
      backgroundColor: color,
    });
  };

  return <ColorsPanel value={slideCustom?.backgroundColor  || ""} onChange={handleChangeTextColor} />;
};
