import { memo } from "react";
import { BubbleButton } from "../bubble-button";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { useContentControl } from "@/hooks/use-content-control";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { Brush } from "lucide-react";

export const HighlightButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const primaryColor = useSlideThemeStore((state) => state.theme.primary);

  return (
    <BubbleButton
      value="highlight"
      onClick={() => {
        setAttrs({ color: primaryColor });
      }}
    >
    <Brush strokeWidth={1} size={15} />
    </BubbleButton>
  );
});
