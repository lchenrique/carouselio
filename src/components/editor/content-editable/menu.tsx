"use client";
import { EmojiPicker } from "@/components/emoji-picker";
import Select from "@/components/select";
import { ColorSelector } from "@/components/text-color";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { AvailableFontSizeValues } from "@/lib/font-sizes";
import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useEditorContext } from "@/providers/editor-provider";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import {
  FontBoldIcon,
  FontItalicIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  UnderlineIcon,
} from "@radix-ui/react-icons";
import { Brush } from "lucide-react";
import { forwardRef, memo, useEffect, useImperativeHandle, useState } from "react";
import { BubbleButton, BubbleButtonGroup } from "./bubble-button";
import { useContentControl } from "@/hooks/use-content-control";
import { BoldButton } from "./menu-controls-buttom/bold";
import { ItalicButton } from "./menu-controls-buttom/italic";
import { UnderlineButton } from "./menu-controls-buttom/undeline";
import { HighlightButton } from "./menu-controls-buttom/highlight";
import { EmojiButton } from "./menu-controls-buttom/emoji";
import { FontSelector } from "./menu-controls-buttom/font";
import { SizeSelector } from "./menu-controls-buttom/size";
import { AlignButton } from "./menu-controls-buttom/align";
export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface EditoMenuHandles {
  showMenu: () => void; // Método para exibir o menu
  hideMenu: () => void; // Método para esconder o menu
  toggleMenu: () => void; // Método para alternar a visibilidade do menu
}

const EditoMenu = memo(
  forwardRef<EditoMenuHandles>((_, ref) => {
    const { theme } = useSlideThemeStore();
    const { isMobile } = useSidebar();
    const { activeEditor, showToolbar, setShowToolbar } = useEditorContext();
    const activeItemId = useContentControl((state) => state.activeItemId);
    const setAttrs = useContentControl((state) => state.setAttrs);
    const isEditing = useContentControl((state) => state.isEditing);

    useImperativeHandle(ref, () => ({
      showMenu: () => setShowToolbar(true),
      hideMenu: () => {
        setShowToolbar(false);
      },
      toggleMenu: () => setShowToolbar(!showToolbar),
    }));

    useEffect(() => {
      if (!showToolbar) {
        setAttrs(null);
      }
    }, [showToolbar, setAttrs]);

    useEffect(() => {
      setShowToolbar(isEditing)
      return () => {
        setShowToolbar(false);
      }
    }, [isEditing, setShowToolbar])
    

    const handleChange = (value: string) => {
      const newSize = value;
      activeItemId && activeEditor?.[activeItemId].chain().focus().setFontSize(newSize).run();
    };

    if (!showToolbar) return null;

    return (
      <div
        className={cn("hidden items-center gap-3  absolute top-1 z-[9999] left-1/2 -translate-x-1/2", {
          "w-[98%]": isMobile,
          flex: showToolbar,
        })}
      >
        <ScrollArea className=" shadow-black/10 bg-background  p-2 shadow-2xl overflow-x-auto border border-muted  rounded-lg">
          <div
            className={cn(" flex items-center gap-3 ", {
              "w-full ": isMobile,
            })}
          >
            <FontSelector />
            <SizeSelector />
            <BubbleButtonGroup type="multiple">
              <BoldButton />
              <ItalicButton />
              <UnderlineButton />
              <HighlightButton />
            </BubbleButtonGroup>
            <EmojiButton />
            <ColorSelector data-testid="setColor" />
            <AlignButton />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  })
);

export { EditoMenu };
