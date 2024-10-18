import { pallettes } from "@/lib/pallettes";
import { ColorThemeDisplay } from "./color-display";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

function ColorThemePallette() {
  const { setTheme } = useSlideThemeStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setTheme(pallettes.vibrant.cosmicBlaze);
  }, []);
  return (
    <RadioGroup
      onValueChange={(value) => {
        const schema = value.split(".")[0];
        const theme = value.split(".")[1];
        const colors = pallettes[schema][theme];
        setTheme(colors);
      }}
    >
      {Object.entries(pallettes).map(([palletteName, themes]) => {
        return (
          <Card key={palletteName}>
            <CardHeader className="flex  py-3  justify-between w-full capitalize font-semibold">
              {palletteName}
            </CardHeader>
            <CardContent className="flex items-center gap-3 w-full pb-3">
              {Object.entries(themes).map(([themeName, colors]) => {
                return (
                  <div key={themeName}>
                    <RadioGroupItem value={`${palletteName}.${themeName}`}>
                      <ColorThemeDisplay key={themeName} colors={colors} />
                    </RadioGroupItem>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </RadioGroup>
  );
}

export { ColorThemePallette };
