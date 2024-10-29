import { useContentControl } from "@/hooks/use-content-control";
import { ColorsPanel } from "@/panels/colors.panel";
import { useEditorContext } from "@/providers/editor-provider";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

export const TextColorControl = () => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const attrs = useContentControl((state) => state.attrsPrev);

  const handleChangeTextColor = (color: string, gradient?: boolean) => {
    setAttrs({
      color: color,
    });
  };

  return <ColorsPanel value={attrs?.color ||""}  onChange={handleChangeTextColor} />;
};
