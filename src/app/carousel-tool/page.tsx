"use client";
import SlideContent from "@/components/carousel/content";
import { FloatingToolbar } from "@/components/floting-toolbar";
import { ToolbarProvider } from "@/components/providers/toolbar-provider";
import Select from "@/components/select";
import { SwiperCarousel } from "@/components/swiper";
import { ColorThemeDisplay } from "@/components/theme/color-display";
import { ColorThemePallette } from "@/components/theme/color-theme-pallette";
import { TypographyH2 } from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { pallettes } from "@/lib/pallettes";
import { cn } from "@/lib/utils";
import { useSideBarControl } from "@/store/side-bar-control";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { useToolbarControl } from "@/store/toolbar-control";
import type { ISlideItems } from "@/types/slide-content";
import { getDefaultColor, TextContentHeadingType } from "@/types/text-content";
import { useClickAway } from "@uidotdev/usehooks";
import {
  ArrowRight,
  CaseSensitive,
  GalleryHorizontal,
  GalleryHorizontalEnd,
  Grid3X3,
  HomeIcon,
  Linkedin,
  Palette,
  PanelsTopLeft,
  Sparkles,
  SwatchBook,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const optionsSize = [
  {
    label: (
      <>
        <Linkedin className="size-4 text-sky-600" /> <span>Linkedin</span> <span>{"(1:1)"}</span>
      </>
    ),
    value: "486x486",
  },
  {
    label: (
      <>
        <Linkedin className="size-4 text-sky-600" /> <span>Linkedin</span> <span>{"(4:5)"}</span>
      </>
    ),
    value: "486x608",
  },
];
export default function CrouselToolPage() {
  const { toggleToolbar } = useToolbarControl();
  const [size, setSize] = useState({ w: 486, h: 486 });
  const { theme } = useSlideThemeStore();
  const { open } = useSideBarControl();

  const ref = useClickAway<HTMLDivElement>(() => {
    toggleToolbar(false);
    // savedSelectionRef.current = null;
    // quill?.setSelection(0, 0, "silent");
  });

  const methods = useForm<{ slide: ISlideItems[] }>({
    defaultValues: {
      slide: [
        {
          id: "1",
          content: [
            {
              id: "1",
              type: TextContentHeadingType.Heading1,
              attrs: {
                color: theme[getDefaultColor(TextContentHeadingType.Heading1) as keyof typeof theme],
                size: TextContentHeadingType.Heading1,
              },
              value: "Hello, this is a text slide 1!",
            },
            {
              id: "2",
              type: TextContentHeadingType.Heading4,
              attrs: {
                color: theme[getDefaultColor(TextContentHeadingType.Heading4) as keyof typeof theme],
                size: TextContentHeadingType.Heading4,
              },
              value: "Hello, this is a text slide 1!",
            },
          ],
        },
        {
          id: "2",
          content: [
            {
              id: "1",
              type: TextContentHeadingType.Heading1,
              attrs: {
                color: theme[getDefaultColor(TextContentHeadingType.Heading1) as keyof typeof theme],
                size: TextContentHeadingType.Heading1,
              },
              value: "Hello, this is a text slide 1!",
            },
            {
              id: "2",
              type: TextContentHeadingType.Heading4,
              attrs: {
                color: theme[getDefaultColor(TextContentHeadingType.Heading4) as keyof typeof theme],
                size: TextContentHeadingType.Heading4,
              },
              value: "Hello, this is a text slide 1!",
            },
          ],
        },
      ],
    },
  });

  const handleSizeChange = (value: string) => {
    const [width, height] = value.split("x");
    setSize({ w: Number.parseInt(width), h: Number.parseInt(height) });
  };

  return (
    <div className="h-screen bg-transparent w-full">
      <div
        className="flex mx-auto"
        style={{
          height: "calc(100vh - 60px)",
        }}
      >
        <div className="h-full flex  py-3 absolute z-10">
          <div className="flex flex-col gap-1 p-2  my-auto">
            <Button size="icon" variant="ghost">
              <Sparkles />
            </Button>
            <Button size="icon" variant="ghost">
              <CaseSensitive />
            </Button>
            <Button size="icon" variant="ghost">
              <SwatchBook />
            </Button>
            <Button size="icon" variant="ghost">
              <PanelsTopLeft />
            </Button>
            <Button size="icon" variant="ghost">
              <Grid3X3 />
            </Button>
            <Button size="icon" variant="ghost">
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* <div className="h-full relative  ">
          <div className="flex flex-col gap-1 top-1/2 -translate-y-1/2 p-2 h-full z-50  shadow-lg absolute  bg-background">
            <TypographyH2 className="text-lg">Tema</TypographyH2>
            <ColorThemePallette />
          </div>
        </div> */}

        <div
          ref={ref}
          className="flex w-full flex-col gap-1 overflow-hidden  pl-0"
          style={{
            width: open ? "calc(100vw - 260px)" : "calc(100vw - 0px)",
          }}
        >
          <FormProvider {...methods}>
            <header
              className={cn("flex items-center w-full  pr-12 ml-auto relative  justify-between p-2 ", {
                "pl-24": !open,
              })}
            >
              <span className="text-2xl font-semibold">Board</span>
              <FloatingToolbar />
              <div className="flex items-center gap-3 justify-end  w-48">
                <Select options={optionsSize} value="Tesete" onChange={handleSizeChange} />
              </div>
            </header>
            <div className="swiper  w-min">
              <SwiperCarousel size={size} control={methods.control} />
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
