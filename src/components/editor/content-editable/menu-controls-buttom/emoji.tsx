import { memo } from "react";
import { BubbleButton } from "../bubble-button";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { useContentControl } from "@/hooks/use-content-control";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { Brush } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";

export const EmojiButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);

  return (
    <EmojiPicker
      onChange={(emoji: string) => {
        setAttrs({ emoji });
      }}
    />
  );
});
