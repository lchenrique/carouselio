"use client";
import Circle from "@uiw/react-color-circle";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Highlighter } from "lucide-react";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { useToolbarControl } from "@/store/toolbar-control";
import { SketchPicker } from "react-color";
import { ColorPicker } from "@/components/color-picker";
import { gradientColors, presetColors } from "@/lib/colors";
import { GradientColorPicker } from "../color-picker/gradient";
import { ColorsPanel } from "@/panels/colors.panel";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { useDrawerControl } from "@/hooks/use-drawer-control";
import { Panel } from "react-resizable-panels";
import { TextColorControl } from "../menu-controls/text-color.control";
import { useContentControl } from "@/hooks/use-content-control";

const ColorButton = memo(() => {
  const value = useContentControl((state) => state.attrsPrev?.color);
  return (
    <Button
      variant="ghost"
      className="p-[10px]"
      style={{
        minWidth: 15,
        minHeight: 15,
        width: 15,
        height: 15,
        background: value,
      }}
    />
  );
});

const ColorButtonPreset = memo(({ color }: { color: string }) => {
  const setAttrs = useContentControl((state) => state.setAttrs);
  return (
    <Button className="rounded-md p-0 size-7 " style={{ backgroundColor: color }} onClick={() => setAttrs({ color })} />
  );
});

export function ColorSelector() {
  const { open } = useDrawerControl();

  const handleOpenMoreColors = () => {
    open("Cor do texto  ", <TextColorControl />);
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <ColorButton />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <ScrollArea className=" rounded-md border px-3">
          <div className="flex p-3 items-center gap-2">
            <div className="flex-1 h-min">
              <Button
                className="rounded-md p-0 size-7 "
                style={{ background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet, red)" }}
                onClick={handleOpenMoreColors}
              />
            </div>
            {presetColors.map((color, index) => {
              return (
                <div key={String(index)} className="flex-1 h-min">
                 <ColorButtonPreset color={color} />
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
