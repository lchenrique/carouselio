import Select from "@/components/select";
import { useContentControl } from "@/hooks/use-content-control";
import { AvailableFontSizeValues } from "@/lib/font-sizes";
import { fonts } from "@/lib/fonts";
import { memo } from "react";

export const SizeSelector = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const size = useContentControl((state) => state.attrsPrev?.size);
  return (
    <Select
      className="w-40 h-8"
      value={size || "16"}
      onChange={(value) => setAttrs({ size: value })}
      options={AvailableFontSizeValues.map((size) => ({
        label: `${size} px`,
        value: size,
      }))}
    />
  );
});
