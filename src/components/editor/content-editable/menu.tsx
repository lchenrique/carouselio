"use client";
import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from "react";
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
import { TextColor } from "@/components/text-color";
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

const EditoMenu = forwardRef<EditoMenuHandles>((_, ref) => {
  const { theme } = useSlideThemeStore();
  const { isMobile } = useSidebar();
  const [fontSize, setFontSize] = useState(16);
  const [visible, setVisible] = useState(false);
  const { activeEditor, showToolbar, setShowToolbar, setActiveEditor } = useEditorContext();
  const [update, setUpdate] = useState(false);

  useImperativeHandle(ref, () => ({
    showMenu: () => setShowToolbar(true),
    hideMenu: () => {
      setShowToolbar(false);
    },
    toggleMenu: () => setVisible((prev) => !prev),
  }));

  activeEditor?.on("selectionUpdate", ({ editor }) => {
    setShowToolbar(activeEditor.state.selection.empty === false);
  });

  activeEditor?.on("update", ({ editor }) => {
    activeEditor.isActive("fontSize");
    setUpdate(!update);
  });

  useEffect(() => {
    setVisible(showToolbar);
  }, [showToolbar]);

  if (!activeEditor || !visible) {
    return null;
  }

  const handleChange = (value: string) => {
    const newSize = value;
    setFontSize(Number(newSize));
    activeEditor.chain().focus().setFontSize(newSize).run();
  };

  return (
    <div
      className={cn("flex items-center gap-3 d   menu absolute top-1 z-[9999] left-1/2 -translate-x-1/2  ", {
        "w-[98%]": isMobile,
      })}
    >
      <ScrollArea className=" shadow-black/10 bg-background  p-2  shadow-2xl overflow-x-auto border border-muted  rounded-lg">
        <div
          className={cn(" flex items-center gap-3 ", {
            "w-full ": isMobile,
          })}
        >
          <Select
            className="w-40 h-8"
            value={String(activeEditor.getAttributes("textStyle").fontFamily)}
            onChange={(value) => activeEditor?.chain().focus().setFontFamily(value).run()}
            options={fonts.map((font) => ({
              label: font,
              value: font,
            }))}
          />
          <Select
            className="h-8  w-12"
            value={String(activeEditor.getAttributes("textStyle").fontSize)}
            onChange={(value) => handleChange(value)}
            options={AvailableFontSizeValues.map((font) => ({
              label: `${font}px`,
              value: font,
            }))}
          />
          <BubbleButtonGroup type="multiple">
            <BubbleButton
              data-state={activeEditor?.isActive("bold")}
              value="bold"
              onClick={() => activeEditor.chain().focus().toggleBold().run()}
            >
              <FontBoldIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor.isActive("italic")}
              value="italic"
              onClick={() => activeEditor.chain().focus().toggleItalic().run()}
            >
              <FontItalicIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor.isActive("underline")}
              value="underline"
              onClick={() => activeEditor.commands.toggleUnderline()} // implement underline toggle
            >
              <UnderlineIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor?.getAttributes("textStyle").color === theme.primary}
              value="highlight"
              onClick={() => activeEditor.chain().focus().setColor(theme.primary).run()}
            >
              <Brush strokeWidth={1} size={15} />
            </BubbleButton>
          </BubbleButtonGroup>
          <EmojiPicker
            onChange={(emoji: string) => {
              activeEditor.chain().focus().insertContent(emoji).run();
            }}
          />
          <TextColor
            onChange={(color, gradient) => {
              if (gradient) {
                activeEditor?.chain().focus().setColorG(color).run();
                return;
              }
              if (activeEditor?.getAttributes("textStyle").colorG) {
                activeEditor?.chain().focus().setColorG("").run();
              }
              activeEditor?.chain().focus().setColor(color).run();
            }}
            value={
              activeEditor?.getAttributes("textStyle").colorG || activeEditor?.getAttributes("textStyle").color || ""
            }
            data-testid="setColor"
          />
          <BubbleButtonGroup
            type="single"
            onValueChange={(value) => {
              activeEditor?.chain().focus().setTextAlign(value).run();
            }}
          >
            <BubbleButton
              data-state={activeEditor?.isActive({ textAlign: "left" })}
              value="left"
              onClick={() => activeEditor.chain().focus().setColor(theme.primary).run()}
            >
              <TextAlignLeftIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor?.isActive({ textAlign: "center" })}
              value="center"
              onClick={() => activeEditor.chain().focus().setColor(theme.primary).run()}
            >
              <TextAlignCenterIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor?.isActive({ textAlign: "right" })}
              value="right"
              onClick={() => activeEditor.chain().focus().setColor(theme.primary).run()}
            >
              <TextAlignRightIcon />
            </BubbleButton>
            <BubbleButton
              data-state={activeEditor?.isActive({ textAlign: "justify" })}
              value="justify"
              onClick={() => activeEditor.chain().focus().setColor(theme.primary).run()}
            >
              <TextAlignJustifyIcon />
            </BubbleButton>
          </BubbleButtonGroup>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
});

export { EditoMenu };
