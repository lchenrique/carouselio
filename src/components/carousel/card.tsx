import { useEffect, useState, type HtmlHTMLAttributes } from "react";
import { Card } from "../ui/card";
import SlideContent from "./content";
import { cn } from "@/lib/utils";
import { ColorSelector } from "../color-selector";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { KeepScale } from "react-zoom-pan-pinch";
import type { Control } from "react-hook-form";
import type { ISlideItems } from "@/types/slide-content";

interface CardContentProps extends HtmlHTMLAttributes<HTMLDivElement> {
  index: number;
  item: ISlideItems;
  size: { w: number; h: number };
  scale: number;
}

function CardContent({ index, item, size, onMouseEnter, onMouseLeave, scale, className }: CardContentProps) {
  const { theme } = useSlideThemeStore();

  const [bg, setBg] = useState(theme.background);

  useEffect(() => {
    setBg(theme.background);
  }, [theme.background]);

  return (
    <>
      <KeepScale>
        {/* <ColorSelector
          onChange={(bg) => {
            setBg(bg);
          }}
          value={theme.background}
        /> */}
      </KeepScale>

      <Card
        key={String(index)}
        className={cn("p-4 relative border-0  transition-all duration-700 ", className)}
        style={{
          background: bg || theme.background,
          width: size.w,
          height: size.h,
          minWidth: size.w,
        }}
      >
        <div
          className={cn("h-full w-full absolute left-0 top-0 opacity-45 transition-all duration-700", theme.pattern)}
        />
        <div className="relative h-full  w-full flex items-center justify-center">
          <div className="bg-white/0  rounded-xl h-full  w-full">
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <SlideContent scale={scale} values={item.content} index={index} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
export default CardContent;
