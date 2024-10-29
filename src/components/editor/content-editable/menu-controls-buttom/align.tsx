import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { memo } from "react";
import { useContentControl } from "@/hooks/use-content-control";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BubbleButton, BubbleButtonGroup } from "../bubble-button";
import {
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import type { ContentValues } from "@/types/text-content";

export const AlignButton = memo(() => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  const align = useContentControl((state) => state.attrsPrev?.align);

  const alignItems = {
    left: <TextAlignLeftIcon />,
    center: <TextAlignCenterIcon />,
    right: <TextAlignRightIcon />,
    justify: <TextAlignJustifyIcon />,
  } as const;

   type Align = keyof typeof alignItems | undefined;

  return (
    <Popover>
      <PopoverTrigger>{alignItems[align || "left"]}</PopoverTrigger>
      <PopoverContent className="p-2 w-min">
        <BubbleButtonGroup
          value={align}
          type="single"
          onValueChange={(value) => {
            setAttrs({ align: value as Align } );
          }}
        >
          <BubbleButton value="left">
            <TextAlignLeftIcon />
          </BubbleButton>
          <BubbleButton value="center">
            <TextAlignCenterIcon />
          </BubbleButton>
          <BubbleButton value="right">
            <TextAlignRightIcon />
          </BubbleButton>
          <BubbleButton value="justify">
            <TextAlignJustifyIcon />
          </BubbleButton>
        </BubbleButtonGroup>
      </PopoverContent>
    </Popover>
  );
});
