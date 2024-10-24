"use client";

import type { TextContent } from "@/types/text-content";
import { Blend } from "lucide-react";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MyGrid } from "../grid-layout";
import { Toggle } from "../ui/toggle";


const DragableContainer = ({ itemsData, index }: { itemsData: TextContent[]; index: number }) => {
  const { control } = useFormContext();
  const [allowOverlap, setAllowOverlap] = useState(false);
  const contentItemsId = `slides.${index}.contentItems`;
  const { field: contentItems } = useController({ name: contentItemsId, control });

  return (
    <>
      <div className="-top-10 left-0 absolute">
        <div className="flex items-center gap-3"><span>Sobrepor</span><Toggle size="sm" className="size-8 p-2" onPressedChange={setAllowOverlap}> <Blend /></Toggle> </div>
      </div>
      <MyGrid allowOverlap={allowOverlap} items={contentItems.value || []} parentIndex={index} />
    </>
  );
};

export { DragableContainer };

