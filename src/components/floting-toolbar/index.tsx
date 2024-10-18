"use client";
import { cn } from "@/lib/utils";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import "react-quill/dist/quill.bubble.css";
import { useToolbar } from "../providers/toolbar-provider";
import { Button } from "../ui/button";
import { ColorSelector } from "../color-selector";
import { KeepScale } from "react-zoom-pan-pinch";
import {
  Bold,
  Italic,
  Underline,
  Link2,
  Smile,
  Image,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Brush,
} from "lucide-react";
import { Content } from "@/assests/icons/toolbar/Content";
import { TextColor } from "@/components/text-color/index";
import Select from "../select";
import { fonts } from "@/lib/fonts";
import { getNextFontSize } from "@/lib/get-font-size";
import { AvailableFontSizeValues } from "@/lib/font-sizes";
import type { TextContent } from "@/types/text-content";
import { useToolbarControl } from "@/store/toolbar-control";
import { EmojiPicker } from "../emoji-picker";

const FloatingToolbar = () => {
  const { theme, setTheme } = useSlideThemeStore();
  const { selectionFormat, setSelectionFormat, activeContent, showToolbar } = useToolbarControl();

  const handleFormat = (format: string, value: string | boolean) => {
    setSelectionFormat(activeContent, { [format]: value }, true);
  };

  const handleBackgroundChange = (background: string) => {
    setTheme({ ...theme, background });
  };

  const brushIsActive = selectionFormat[activeContent]?.color === theme.primary;

  return (
    <div
      style={{
        visibility: showToolbar ? "visible" : "hidden",
      }}
    >
      <div className="absolute  mx-auto flex gap-1 p-1 top-14 border w-min left-0 right-0  bg-white  z-50 rounded-xl shadow-xl shadow-slate-900/5">
        <Select
          className="w-40 h-8"
          value={selectionFormat[activeContent]?.font as unknown as string}
          onChange={(value) => handleFormat("font", value)}
          options={fonts.map((font) => ({
            label: font,
            value: font,
          }))}
        />
        <div className=" flex space-x-2">
          <Select
            className="h-8"
            value={selectionFormat[activeContent]?.size as unknown as string}
            onChange={(value) => handleFormat("size", value)}
            options={AvailableFontSizeValues.map((font) => ({
              label: font,
              value: font,
            }))}
          />
        </div>
        <Button
          size="icon"
          variant={selectionFormat[activeContent]?.bold ? "secondary" : "ghost"}
          className={cn(
            "text-base size-8",
            selectionFormat[activeContent]?.bold ? "text-indigo-500" : "text-muted-foreground"
          )}
          onClick={() => handleFormat("bold", !selectionFormat[activeContent]?.bold)}
        >
          <Bold className="size-4 " />
        </Button>
        <Button
          size="icon"
          variant={selectionFormat[activeContent]?.italic ? "secondary" : "ghost"}
          className={cn(
            "text-base size-8",
            selectionFormat[activeContent]?.italic ? "text-indigo-500" : "text-muted-foreground"
          )}
          onClick={() => handleFormat("italic", !selectionFormat[activeContent]?.italic)}
        >
          <Italic className="size-4" />
        </Button>
        <Button
          size="icon"
          variant={selectionFormat[activeContent]?.underline ? "secondary" : "ghost"}
          className={cn(
            "text-base size-8",
            selectionFormat[activeContent]?.underline ? "text-indigo-500" : "text-muted-foreground"
          )}
          onClick={() => handleFormat("underline", !selectionFormat[activeContent]?.underline)}
        >
          <Underline className="size-4" />
        </Button>
        <Button
          size="icon"
          variant={brushIsActive ? "secondary" : "ghost"}
          className={cn("text-base size-8", brushIsActive ? "text-indigo-500" : "text-muted-foreground")}
          onClick={() => {
            if (selectionFormat[activeContent]?.color === theme.primary) {
              handleFormat("color", theme.secondary);
              return;
            }
            handleFormat("color", theme.primary);
          }}
        >
          <Brush className="size-4" />
        </Button>
        <TextColor
          value={
            Array.isArray(selectionFormat[activeContent]?.color)
              ? selectionFormat[activeContent]?.color[0]
              : selectionFormat[activeContent]?.color || theme.primary
          }
          onChange={(color) => {
            handleFormat("color", color);
          }}
        />
        <EmojiPicker onChange={(emoji: string | boolean) => handleFormat("emoji", emoji)} />

        {/* <ColorSelector onChange={handleBackgroundChange} value={theme.background} /> */}
        <Button onClick={() => handleFormat("align", "")} size="icon" variant="ghost" className="text-base size-8">
          <AlignLeft className="size-4" />
        </Button>
        <Button
          onClick={() => handleFormat("align", "center")}
          size="icon"
          variant="ghost"
          className="text-base size-8"
        >
          <AlignCenter className="size-4" />
        </Button>
        <Button onClick={() => handleFormat("align", "right")} size="icon" variant="ghost" className="text-base size-8">
          <AlignRight className="size-4" />
        </Button>

        {/* <Button
        size="icon"
        variant={selectionFormat?.background ? "secondary" : "ghost"}
        className={cn("text-base", selectionFormat?.background ? "text-indigo-500" : "text-muted-foreground")}
        onClick={() => {
          handleFormat(
            "background",
            selectionFormat?.background ? "" : type === "sub" ? theme.secondary : theme.primary
          );

          handleFormat("color", selectionFormat?.background ? "" : theme.background);
        }}
      >
        <Paintbrush className="size-4" />
      </Button> */}
      </div>
    </div>
  );
};
export { FloatingToolbar };
