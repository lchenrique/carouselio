import { memo } from "react";
import { BubbleButton } from "../bubble-button";
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from "@radix-ui/react-icons";
import { useContentControl } from "@/hooks/use-content-control";

export const UnderlineButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const isUnderline = useContentControl((state) => state.attrsPrev?.underline);

  return (
    <BubbleButton
      data-state={isUnderline}
      value="underline"
      onClick={() => {
        setAttrs({ underline: !isUnderline });
      }}
    >
      <UnderlineIcon />
    </BubbleButton>
  );
});
