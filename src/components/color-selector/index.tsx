"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Highlighter, Paintbrush } from "lucide-react";

export interface ColorSelectorProps {
  onChange: (value: string) => void;
  value: string;
}

const gradients = [
  { name: "Sunset", value: "linear-gradient(45deg, #FF512F, #DD2476)" },
  { name: "Ocean", value: "linear-gradient(to bottom right, #1A2980, #26D0CE)" },
  { name: "Forest", value: "linear-gradient(to top left, #134E5E, #71B280)" },
  { name: "Candy", value: "linear-gradient(to right, #FC466B, #3F5EFB)" },
  { name: "Autumn", value: "linear-gradient(135deg, #FF9A9E, #FAD0C4)" },
  { name: "Neon", value: "linear-gradient(to left, #00DBDE, #FC00FF)" },
  { name: "Sunrise", value: "linear-gradient(to top, #FDC830, #F37335)" },
  { name: "Twilight", value: "linear-gradient(225deg, #141E30, #243B55)" },
  { name: "Skyline", value: "linear-gradient(to right, #1FA2FF, #12D8FA, #A6FFCB)" },
  { name: "Lavender", value: "linear-gradient(to bottom, #B6CEE8, #F3E5F5)" },
  { name: "Midnight", value: "linear-gradient(90deg, #2C3E50, #4CA1AF)" },
  { name: "Peach", value: "linear-gradient(to top right, #FF7E5F, #FEB47B)" },
  { name: "Ice", value: "linear-gradient(135deg, #74EBD5, #9FACE6)" },
  { name: "Flamingo", value: "linear-gradient(to right, #FAD961, #F76B1C)" },
  { name: "Berry", value: "linear-gradient(to top right, #FF416C, #FF4B2B)" },
  { name: "Mint", value: "linear-gradient(120deg, #76B852, #8DC26F)" },
  { name: "Galaxy", value: "linear-gradient(to bottom right,#AC32E4,#7918F2,#4801FF)" },
  { name: "Coral", value: "linear-gradient(to bottom, #FF9966, #FF5E62)" },
  { name: "Royal", value: "linear-gradient(to top, #141E30, #243B55)" },
  { name: "Sunshine", value: "linear-gradient(135deg, #FDC830, #F37335)" },
  { name: "Aqua", value: "linear-gradient(to bottom right,#FDFC47,#24FE41)" },
];

const solidColors = [
  { name: "Sunset", value: "#FF512F" },
  { name: "Ocean", value: "#1A2980" },
  { name: "Forest", value: "#134E5E" },
  { name: "Candy", value: "#FC466B" },
  { name: "Autumn", value: "#FF9A9E" },
  { name: "Neon", value: "#00DBDE" },
  { name: "Sunrise", value: "#FDC830" },
  { name: "Twilight", value: "#141E30" },
  { name: "Skyline", value: "#1FA2FF" },
  { name: "Lavender", value: "#B6CEE8" },
  { name: "Midnight", value: "#2C3E50" },
  { name: "Peach", value: "#FF7E5F" },
  { name: "Ice", value: "#74EBD5" },
  { name: "Flamingo", value: "#FAD961" },
  { name: "Berry", value: "#FF416C" },
  { name: "Mint", value: "#76B852" },
  { name: "Galaxy", value: "#AC32E4" },
  { name: "Coral", value: "#FF9966" },
  { name: "Royal", value: "#141E30" },
  { name: "Sunshine", value: "#FDC830" },
  { name: "Aqua", value: "#FDFC47" },
];

export function ColorSelector({ onChange, value }: ColorSelectorProps) {
  const [selectedBackground, setSelectedBackground] = useState(gradients[0].value || value);
  const [isOpen, setIsOpen] = useState(true);

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    // onChange?.(background);
    // setIsOpen(false);
  };

  return (
    <div>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <Highlighter className="size-4" />
            <span className="sr-only">Open color selector</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <Card>
            <CardContent className="p-2">
              <Tabs defaultValue="gradient" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                  <TabsTrigger value="solid">Solid</TabsTrigger>
                  <TabsTrigger value="gradient">Gradient</TabsTrigger>
                </TabsList>
                <TabsContent value="solid">
                  <div className="grid grid-cols-4 gap-2">
                    {solidColors.map((color) => (
                      <button
                        type="button"
                        key={color.name}
                        className="w-full aspect-square rounded-md shadow-sm hover:shadow-md transition-shadow"
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleBackgroundSelect(color.value)}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="gradient">
                  <div className="grid grid-cols-7  gap-2">
                    {gradients.map((gradient) => (
                      <button
                        type="button"
                        key={gradient.name}
                        className="size-8 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        style={{ background: gradient.value }}
                        onClick={() => handleBackgroundSelect(gradient.value)}
                        aria-label={`Select ${gradient.name} gradient`}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
