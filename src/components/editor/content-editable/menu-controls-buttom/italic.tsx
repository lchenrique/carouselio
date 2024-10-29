import { memo } from "react";
import { BubbleButton } from "../bubble-button";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";
import { useContentControl } from "@/hooks/use-content-control";

export const ItalicButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const isItalic = useContentControl((state) => state.attrsPrev?.italic);
  return (
    <BubbleButton
      data-state={isItalic}
      value="italic"
      onClick={() => {
        setAttrs({ italic: !isItalic });
      }}
    >
      <FontItalicIcon />
    </BubbleButton>
  );
});
