import { memo } from "react";
import { BubbleButton } from "../bubble-button";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { useContentControl } from "@/hooks/use-content-control";

export const BoldButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const isBold = useContentControl((state) => state.attrsPrev?.bold);
  return (
    <BubbleButton
      data-state={isBold}
      value="bold"
      onClick={() => {
        setAttrs({ bold: !isBold });
      }}
    >
      <FontBoldIcon />
    </BubbleButton>
  );
});
