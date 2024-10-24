"use client";
import Circle from "@uiw/react-color-circle";
import { useCallback, useEffect, useState } from "react";

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

export function TextColor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string, isGradient?: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState("solid");
  const [custom, setCustom] = useState(false);
  const { theme } = useSlideThemeStore();
  const [activeColor, setActiveColor] = useState(value);

  useEffect(() => {
    if (value.startsWith("linear")) {
      setActiveTab("gradient");
    }
  }, [value]);

  const handleColorChange = (newColor: string, isGradient?: boolean) => {
    setActiveColor(newColor);
    onChange(newColor, isGradient);
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild>
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
        >
        
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Card className="p-0">
          <div>
            <CardContent className="p-2 ">
              <Tabs defaultValue="gradient" className="min-w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="solid">Solid</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                </TabsList>
                <TabsContent value="solid">
                  <div className="w-full flex flex-col gap-2 items-center justify-center">
                    <ColorPicker value={activeColor} onChange={handleColorChange} />
                    <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                      {presetColors.map((color, index) => {
                        return (
                          <Button
                            key={String(index)}
                            className="size-7 rounded-md p-0"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              handleColorChange(color);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="gradient">
                  <div className="w-full flex flex-col gap-2 items-center justify-center">
                    {!custom && (
                      <GradientColorPicker
                        value={activeColor}
                        onChange={(color) => {
                          onChange(color, true);
                        }}
                      />
                    )}  
                    <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                      {!custom &&
                        gradientColors.map((color: string, index: number) => {
                          return (
                            <Button
                              key={String(index)}
                              className="size-7 rounded-md p-0"
                              style={{ background: color }}
                              onClick={() => {
                                handleColorChange(color, true);
                              }}
                            />
                          );
                        })}
                    </div>
                    <Button onClick={() => setCustom(!custom)} size="sm" variant="outline" className="w-full">
                      {custom ? "Presets" : "Custom"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
