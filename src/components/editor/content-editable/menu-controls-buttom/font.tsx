import Select from "@/components/select";
import { useContentControl } from "@/hooks/use-content-control";
import { fonts } from "@/lib/fonts";
import { memo } from "react";

export const FontSelector = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const font = useContentControl((state) => state.attrsPrev?.font);
  return (
    <Select
      className="w-40 h-8"
      value={font || "Inter"}
      onChange={(value) => setAttrs({ font: value })}
      options={fonts.map((font) => ({
        label: font,
        value: font,
      }))}
    />
  );
});
