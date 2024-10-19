"use client";
import { BoradTool } from "@/components/board-tool";
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
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
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
  const {  isMobile , open } = useSidebar();

  const ref = useClickAway<HTMLDivElement>(() => {
    toggleToolbar(false);
    // savedSelectionRef.current = null;
    // quill?.setSelection(0, 0, "silent");
  });

  const methods = useForm<{ slides: ISlideItems[] }>({
    defaultValues: {
      slides: [
        {
          id: "1",
          contentItems: [
            {
              id: "1",
              values: [
                {
                  attrs: {
                    color: theme[getDefaultColor(TextContentHeadingType.Heading1) as keyof typeof theme],
                    size: TextContentHeadingType.Heading1,
                    font:"Poppins",
                  },
                  value: "Hello, this is a text slide 1!",
                },
              ],
            },
            {
              id: "2",
              values: [
                {
                  attrs: {
                    color: theme[getDefaultColor(TextContentHeadingType.Heading4) as keyof typeof theme],
                    size: TextContentHeadingType.Heading4,
                    font:"Poppins", 
                  },
                  value: "Hello, this is a text slide 1!",
                  
                },
              ],
            },
          ],
        },
        {
          id: "2",
          contentItems: [
            {
              id: "1",
              values: [
                {
                  attrs: {
                    color: theme[getDefaultColor(TextContentHeadingType.Heading1) as keyof typeof theme],
                    size: TextContentHeadingType.Heading1,
                    font:"Poppins", 
                  },
                  value: "Hello, this is a text slide 1!",
                },
              ],
            },
            {
              id: "2",
              values: [
                {
                  attrs: {
                    color: theme[getDefaultColor(TextContentHeadingType.Heading4) as keyof typeof theme],
                    size: TextContentHeadingType.Heading4,
                    font:"Poppins", 
                  },
                  value: "Hello, this is a text slide 1!",
                },
              ],
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

  console.log(methods.watch("slides"), "watch");

  return (
    <div className="h-screen bg-transparent w-full relative">
      <header className={cn("bg-gradient-to-tr from-primary to-purple-500", {
        "rounded-t-lg": !isMobile,
      })}>
        <div className="flex items-center w-full  [&>*]:border-white/10 ">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="pr-12">
            <h1 className="bg-transparent text-2xl font-bold text-white p-1 h-min">Board</h1>
          </div>
          <div className="px-1 ">
            <Button className="bg-transparent p-1 h-min hover:bg-transparent">Aquivo</Button>
          </div>
          <div className="px-1">
            <Button className="bg-transparent  p-1 h-min hover:bg-transparent">Redimensionar</Button>
          </div>
        </div>
      </header>
      <div
        className="flex mx-auto"
        style={{
          height: "calc(100vh - 60px)",
        }}
      >
        <div className="h-full flex  py-3 absolute left-4  z-10">
          <BoradTool />
        </div>

        {/* <div className="h-full relative  ">
          <div className="flex flex-col gap-1 top-1/2 -translate-y-1/2 p-2 h-full z-50  shadow-lg absolute  bg-background">
            <TypographyH2 className="text-lg">Tema</TypographyH2>
            <ColorThemePallette />
          </div>
        </div> */}

        <div
          ref={ref}
          className="flex w-full flex-col gap-1 overflow-hidden absolute h-[calc(100%-40px)]  pl-0"
          style={{
            width: isMobile? '100vw' : open ? "calc(100vw - 260px)" : "calc(100vw - 0px)",
          }}
        >
          <FormProvider {...methods}>
            <header
              className={cn("flex items-center w-full  pr-12 ml-auto absolute z-40 justify-between p-2 ", {
                "pl-24": !open,
              })}
            >
              <FloatingToolbar />
              <div className="flex items-center gap-3 justify-end  w-48">
                <Select options={optionsSize} value={`${size.w}x${size.h}`} onChange={handleSizeChange} />
              </div>
            </header>
            <div className="swiper  w-min">
              <SwiperCarousel size={size}  />
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
