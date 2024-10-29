"use client";

import type { TextContent } from "@/types/text-content";
import { Blend } from "lucide-react";
import { memo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MyGrid } from "../grid-layout";
import { Toggle } from "../ui/toggle";
import { Button } from "../ui";
import { TransparencyGridIcon } from "@radix-ui/react-icons";
import { useDrawerControl } from "@/hooks/use-drawer-control";
import { BgColorControl } from "../menu-controls/bg-color.control";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { useBgControl } from "@/hooks/use-bg-control copy";
import { useSlideControl } from "@/store/slide-control";

const CardMenu = memo(({ onOverlapChange, index }: { onOverlapChange: (allowOverlap: boolean) => void, index:number }) => {
  const { open } = useDrawerControl();
  const handleOpenBgColorPanel = () => {
    open("", <BgColorControl index={index} />);
  };

  return (
    <div className="-top-10 left-0 absolute">
      <div className="flex items-center gap-3">
        <Toggle size="sm" className="p-2  gap-2" onPressedChange={onOverlapChange}>
          <Blend /> <span>Sobrepor</span>
        </Toggle>
        <Button size="sm" variant="ghost" className="p-2 gap-2" onClick={handleOpenBgColorPanel}>
          <TransparencyGridIcon /> <span>Fundo</span>
        </Button>
      </div>
    </div>
  );
});

const DragableContainer = ({ itemsData, index }: { itemsData: TextContent[]; index: number }) => {
  const { control } = useFormContext();
  const theme = useSlideThemeStore((state) => state.theme);
  const [allowOverlap, setAllowOverlap] = useState(false);
  const contentItemsId = `slides.${index}.contentItems`;
  const { field: contentItems } = useController({ name: contentItemsId, control });
  const slideCustom = useSlideControl((state) => state.slideCustomization[index]);

  return (
    <div
      className="w-full h-full p-3 rounded-lg border"
      style={{
        background: slideCustom?.backgroundColor || theme.background,
      }}
    >
       <CardMenu onOverlapChange={setAllowOverlap} index={index}/>
      <MyGrid allowOverlap={allowOverlap} items={contentItems.value || []} parentIndex={index} />
    </div>
  );
};

export { DragableContainer };
