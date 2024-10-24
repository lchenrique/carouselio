"use client";
import { EditorContent, FloatingMenu, BubbleMenu, useEditor } from "@tiptap/react";
import BubbleMenuExt from "@tiptap/extension-bubble-menu";
import StarterKit from "@tiptap/starter-kit";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { BubbleButton, BubbleButtonGroup } from "./bubble-button";
import { EditoMenu } from "./menu";
import { useEditorContext } from "@/providers/editor-provider";
import { useEffect, useState } from "react";
import Underline from "@tiptap/extension-underline";
import { FontSize } from "../extensions/font-size";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { ColorG } from "../extensions/text-gradient";

import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from '@tiptap/extension-text-align'
import { useController, useFormContext } from "react-hook-form";
import { convertToEditor } from "@/lib/convert-to-editor";
import FontFamily from '@tiptap/extension-font-family'

export interface ContentEditableProps {
  index: number;
  parentIndex: number;
}

const extensions = [
  StarterKit,
  Underline,
  FontSize,
  TextStyle,
  Color,
  ColorG,
  Paragraph,
  Document,
  Text,
  FontFamily,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
];

export const ContentEditable = ({ parentIndex, index }: ContentEditableProps) => {
  const { control } = useFormContext();
  const contentId = `slides.${parentIndex}.contentItems.${index}.values`;
  const { field } = useController({ name: contentId, control });

  const { setActiveEditor, activeEditor, setShowToolbar } = useEditorContext(); 
  const [isSelected, setIsSelected] = useState(false);
  
  const editor = useEditor({
    extensions,
    content: {
      type: "doc",
      content:convertToEditor(field.value),
    },
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });
  useEffect(() => {
    if (editor) {
      setActiveEditor(editor); 
    }
  }, [editor, setActiveEditor]);

  function handleEditorClick() {
    setActiveEditor(editor); 
    setShowToolbar(true);
    setIsSelected(true);
  }

  useEffect(() => {
    if (editor) {
      editor.on("blur", () => {
        setIsSelected(false);
      });
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  activeEditor?.on("selectionUpdate", ({ editor }) => {
    // if (activeEditor.state.doc.content.size === 0) {
    //   activeEditor.commands.setContent("<span></span>");
    // }
    // console.log(activeEditor.getJSON());
    setShowToolbar(activeEditor.state.selection.empty === false);
  });

  return (
    <div data-active={isSelected} className="editor   rounded-lg outline-none  w-full">
      <EditorContent
        editor={editor}
        className="w-full"
        onFocus={() => {
          handleEditorClick();
          editor?.commands.focus();
        }}
      />
    </div>
  );
};
