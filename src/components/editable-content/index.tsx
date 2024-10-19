"use client";
import React, { useRef, useState, useEffect, type LegacyRef, useCallback } from "react";
import "react-quill/dist/quill.bubble.css";
import "./style.css";

import { cn } from "@/lib/utils";
import { useSlideThemeStore } from "@/store/slide-theme-store";
import { Baseline, Bold, Brush, Italic, Underline } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import type { AttributeMap, Delta } from "quill/core";
import { useSlideControl } from "@/store/slide-control";
import type Quill from "quill/core";
import { Button } from "../ui/button";
import { useQuill } from "react-quilljs";
import { FloatingToolbar } from "../floting-toolbar";
import { useController, useFormContext } from "react-hook-form";
import { fonts } from "@/lib/fonts";
import { AvailableFontSizeValues } from "@/lib/font-sizes";
import type { ISlideItems } from "@/types/slide-content";
import { TextContentHeadingType, type ContentValues, type TextContent } from "@/types/text-content";
import { useToolbarControl, type SelectionFormat } from "@/store/toolbar-control";
import { convertDeltaOpsToTextContent } from "@/lib/convert-delta-ops-to-text-content";

interface Position {
  x: number;
  y: number;
}

interface SelectionPosition {
  relative: Position;
  absolute: Position;
}

const EditableContent = ({
  index,
  parentIndex,
}: {
  index: number;
  parentIndex: number;
}) => {
  const { theme } = useSlideThemeStore();
  const { selectionFormat, toChange, setSelectionFormat, toggleToolbar, setActiveContent, activeContent } =
    useToolbarControl();
    
  const {control} = useFormContext()
  const contentId = `slides.${parentIndex}.contentItems.${index}.values`;
  const { field: item } = useController({ name: contentId, control });

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const savedSelectionRef = useRef<any>(null);
  const previousThemeRef = useRef<string[]>([]);
  const secondaryThemeRef = useRef("");

  const {
    quill,
    quillRef,
    Quill: Quills,
  } = useQuill({
    modules: {
      toolbar: false,
      clipboard: {
        matchVisual: false,
      },
    },
    formats: [
      "header",
      "bold",
      "underline",
      "italic",
      "size",
      "font",
      "list",
      "link",
      "image",
      "color",
      "background",
      "align",
      "font",
    ],
    theme: "bubble",
    readOnly: false,
  });

  if (Quills) {
    const size = Quills.import("attributors/style/size");
    size.whitelist = AvailableFontSizeValues;
    Quills.register(size, true);

    const Font = Quills.import("formats/font");
    Font.whitelist = fonts;
    Quills.register(Font, true);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const savedContent = {
      ops: item.value ? [
        ...item.value.map((v : ContentValues) => {
          return {
            insert: v.value,
            attributes: {
             ...v.attrs
            },
          };
        }),
      ] : [],
    };
    previousThemeRef.current = [theme.secondary, theme.primary];
    secondaryThemeRef.current = theme.secondary;
    if (quill && savedContent.ops.length > 0) {
      const delta = quill.setContents(savedContent.ops);
      quill.setContents(delta);
    }
  }, [quill, theme.secondary, theme.primary]);

  const addSelectionFormat = useCallback(
    (format: SelectionFormat[string]) => {
      if (!quill) {
        return;
      }
      const range = quill.getSelection();

      if (!range) {
        return;
      }

      if (format.emoji) {
        quill.insertText(range.index, format.emoji as string);

        const textformat = quill.getFormat(range.index, range.length);

        setSelectionFormat(contentId, { ...textformat, ...format } as { [key: string]: string | boolean });
        return;
      }

      quill.format(Object.keys(format)[0], Object.values(format)[0], "user");

      const textformat = quill.getFormat(range.index, range.length);

      setSelectionFormat(contentId, { ...textformat, ...format } as { [key: string]: string | boolean });
    },
    [quill, setSelectionFormat, contentId]
  );

  useEffect(() => {
    if (!quill) return;

    if (selectionFormat[contentId] && toChange) {
      addSelectionFormat(selectionFormat[contentId]);
    }
  }, [quill, selectionFormat, contentId, addSelectionFormat, toChange]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (quill) {
      quill.on("selection-change", (range) => {
        if (range) {
          savedSelectionRef.current = range;
          const selectedText = quill.getText(range.index, range.length);

          const format = quill.getFormat(range.index, range.length);
          // toggleToolbar(selectedText.trim() !== "");
          toggleToolbar(true);
          setSelectionFormat(contentId, format as { [key: string]: string });
          setActiveContent(contentId);
        }
      });

      return () => {
        // quill.off("selection-change");
        // toggleToolbar(false);
      };
    }
  }, [quill, quillRef, setSelectionFormat, toggleToolbar, setActiveContent]);

  useEffect(() => {
    if (!quill) return;
    if (activeContent !== contentId) {
      savedSelectionRef.current = null;
      toggleToolbar(false);
    }
  }, [quill, activeContent, contentId, toggleToolbar]);

  useEffect(() => {
    // if (!quill) return;
    // if (previousThemeRef.current.includes(item.value.attrs.color)) {
    //   if (item.value.type === TextContentHeadingType.Heading1) {
    //     quill.formatText(0, quill.getLength(), {
    //       color: theme.primary,
    //     });
    //   } else if (item.value.type === TextContentHeadingType.Heading4) {
    //     const content = quill.getContents();
    //     const contentUpdated = content.ops.map((op) => {
    //       if (op.attributes?.color !== secondaryThemeRef.current) {
    //         return {
    //           ...op,
    //           attributes: {
    //             ...op.attributes,
    //             color: theme.primary,
    //           },
    //         };
    //       }
    //       return op;
    //     });
    //     quill.formatText(0, quill.getLength(), {
    //       color: theme.secondary,
    //     });
    //     quill.setContents(contentUpdated);
    //   }
    // }
  }, []);

  useEffect(() => {
    if (!quill) return;

    quill.on("text-change", (delta, oldDelta, source) => {
      const content = quill.getContents();
      const itemChanged: ContentValues[] = convertDeltaOpsToTextContent(content.ops);
      item.onChange(itemChanged);
    });
  }, [quill, item.onChange]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="w-full "
      onClick={() => {
        toggleToolbar(true);
      }}
    >
      <div
        ref={quillRef}
        style={{
          textAlign: "left",
        }}
      />
    </div>
  );
};
export { EditableContent };
