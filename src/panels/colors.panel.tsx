import { ColorPicker } from "@/components/color-picker";
import { GradientColorPicker } from "@/components/color-picker/gradient";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import  { useContentControl } from "@/hooks/use-content-control";
import { presetColors, gradientColors } from "@/lib/colors";
import { useEditorContext } from "@/providers/editor-provider";
import { useEffect, useState } from "react";

export interface IColorsPanel {
  onChange: (color: string, gradient?: boolean) => void;
  value: string;
}

const ColorsPanel = ({onChange, value}: IColorsPanel) => {
  const [activeTab, setActiveTab] = useState("solid");
  const [gradient, setGradient] = useState(value);

  useEffect(() => {
    if (value?.startsWith("linear")) {
      setActiveTab("gradient");
    }

  }, [value]);


  return (
    <Card className="p-0 border-none">
      <div>
        <CardContent className="p-2  ">
          <Tabs defaultValue="gradient" className="min-w-full " value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="solid">Solid</TabsTrigger>
              <TabsTrigger value="gradient">Gradient</TabsTrigger>
            </TabsList>
            <TabsContent value="solid" className="">
              <div className="w-full flex flex-col gap-2 items-center justify-center">
                <ColorPicker value={value||""} onChange={onChange} />
                <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                  {presetColors.map((color, index) => {
                    return (
                      <Button
                        key={String(index)}
                        className="size-7 rounded-md p-0"
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                      />
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gradient">
              <div className="w-full flex flex-col gap-2 items-center justify-center">
                 <GradientColorPicker value={gradient||""} onChange={(color) => {
                    onChange(color, true);
                }} />
                <div className="flex gap-1  items-center justify-center" style={{ flexWrap: "wrap" }}>
                  {
                    gradientColors.map((color: string, index: number) => {
                      return (
                        <Button
                          key={String(index)}
                          className="size-7 rounded-md p-0"
                          style={{ background: color }}
                          onClick={() => 
                            setGradient(color)
                          }
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
  );
};

export { ColorsPanel };
