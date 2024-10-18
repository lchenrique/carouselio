"use client";
import Circle from "@uiw/react-color-circle";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Highlighter } from "lucide-react";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { useToolbarControl } from "@/store/toolbar-control";
import { SketchPicker } from "react-color";
import { ColorPicker } from "@/components/color-picker";
import { presetColors } from "@/lib/colors";

export function TextColor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [hex, setHex] = useState("#F44E3B");

  const { theme } = useSlideThemeStore();

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <div
            className="size-4 rounded-full"
            style={{
              background: value,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Card className="p-0">
          <div>
            <CardContent className="p-2 ">
              <Tabs defaultValue="gradient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="solid">Solid</TabsTrigger>
                  <TabsTrigger value="solid2">Gradient</TabsTrigger>
                </TabsList>
                <TabsContent value="solid">
                  <div className="w-full flex flex-col gap-2 items-center justify-center">
                    <ColorPicker value={value} onChange={onChange} />
                    <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                      {presetColors.map((color, index) => {
                        return (
                          <Button
                            key={String(index)}
                            className="size-5 rounded-full p-0"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              onChange(color);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="solid2">
                  <div className="w-full flex flex-col gap-2 items-center justify-center">
                    <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                      {presetColors.map((color, index) => {
                        return (
                          <Button
                            key={String(index)}
                            className="size-5 rounded-full p-0"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              onChange(color);
                            }}
                          />
                        );
                      })}
                    </div>
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
