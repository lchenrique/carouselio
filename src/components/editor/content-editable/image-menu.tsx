"use client";
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, memo } from "react";
import {
  FontBoldIcon,
  FontItalicIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { useEditorContext } from "@/providers/editor-provider";
import { Brush } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";
import { BubbleButtonGroup, BubbleButton } from "./bubble-button";
import Select from "@/components/select";
import { AvailableFontSizeValues, AvailableHeadingsValues } from "@/lib/font-sizes";
import { ColorSelector } from "@/components/text-color";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { fonts } from "@/lib/fonts";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface EditoMenuHandles {
  showMenu: () => void; // Método para exibir o menu
  hideMenu: () => void; // Método para esconder o menu
  toggleMenu: () => void; // Método para alternar a visibilidade do menu
}

const EditoMenu = memo(forwardRef<EditoMenuHandles>((_, ref) => {
  const { theme } = useSlideThemeStore();
  const { isMobile } = useSidebar();
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);

  useImperativeHandle(ref, () => ({
    showMenu: () =>  {},
    hideMenu: () => {
    },
    toggleMenu: () => setVisible((prev) => !prev),
  }));


  return (
    <div
      className={cn("flex items-center gap-3 d   menu absolute top-1 z-[9999] left-1/2 -translate-x-1/2  ", {
        "w-[98%]": isMobile,
      })}
    >
      <ScrollArea className=" shadow-black/10 bg-background  p-2  shadow-2xl overflow-x-auto border border-muted  rounded-lg">
      
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}));

export { EditoMenu };
