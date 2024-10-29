"use client";
import { useEditorContext } from "@/providers/editor-provider";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useMemo } from "react";
import { FontSize } from "../extensions/font-size";
import { ColorG } from "../extensions/text-gradient";

import { useContentControl } from "@/hooks/use-content-control";
import { convertToEditor } from "@/lib/convert-to-editor";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { useController, useFormContext } from "react-hook-form";

export interface ContentEditableProps {
  index: number;
  parentIndex: number;
  onClikeOutside?: (index: number) => void;
}

const extensions = [
  StarterKit,
  Underline,
  FontSize,
  TextStyle,
  Color,
  ColorG,
  FontFamily,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const ContentEditable = ({ parentIndex, index, onClikeOutside: outSideClick }: ContentEditableProps) => {
  const { control } = useFormContext();
  const contentId = `slides.${parentIndex}.contentItems.${index}.values`;
  const { field } = useController({ name: contentId, control });
  const { setShowToolbar } = useEditorContext();
  const setAttrsPrev = useContentControl((state) => state.setAttrsPrev);
  const attrs = useContentControl((state) => state.attrs);
  const activeId = useContentControl((state) => state.activeItemId);
  const isEditing = useContentControl((state) => state.isEditing);

  const id = `${parentIndex}-${index}`;
  const editorIsEditing = activeId === id && isEditing;

  const valuesConverted = useMemo(() => {
    if (field.value) {
      return convertToEditor(field.value);
    }
  }, [field.value]);

  const editor = useEditor({
    editable: isEditing,
    extensions,
    content: {
      type: "doc",
      content: valuesConverted,
    },
    editorProps: {
      attributes: {
        id: id,
        class: "outline-none",
      },
    },
  });

  const getColorAttrs = useCallback(() => {
    if (editorIsEditing && attrs?.color && editor) {
      if (attrs?.color.startsWith("linear-gradient")) {
        editor
          .chain()
          .focus()
          .setColorG(attrs?.color || "")
          .run();
        return;
      }

      if (editor.getAttributes("textStyle")?.colorG) {
        editor.chain().focus().setColorG("").run();
      }

      if (editor.getAttributes("textStyle")?.color !== attrs?.color) {
        editor
          .chain()
          .focus()
          .setColor(attrs?.color || "")
          .run();
      }
    }
  }, [editor, editorIsEditing, attrs?.color]);

  const getFontAttrs = useCallback(() => {
    if (editorIsEditing && attrs?.font && editor) {
      if (editor.getAttributes("textStyle")?.fontFamily !== attrs?.font) {
        editor
          .chain()
          .focus()
          .setFontFamily(attrs?.font || "")
          .run();
      }
    }
  }, [editor, editorIsEditing, attrs?.font]);

  const getFontSizeAttrs = useCallback(() => {
    if (editorIsEditing && attrs?.size && editor) {
      if (editor.getAttributes("textStyle")?.fontSize !== attrs?.size) {
        editor
          .chain()
          .focus()
          .setFontSize(attrs?.size || "")
          .run();
      }
    }
  }, [editor, editorIsEditing, attrs?.size]);

  const getTextStyleAttrs = useCallback(() => {
    if (editorIsEditing && editor && attrs?.bold !== undefined) {
      editor.chain().focus().toggleBold().run();
    }
    if (editorIsEditing && editor && attrs?.italic !== undefined) {
      editor.chain().focus().toggleItalic().run();
    }
    if (editorIsEditing && editor && attrs?.underline !== undefined) {
      editor.chain().focus().toggleUnderline().run();
    }
    if (editorIsEditing && editor && attrs?.align) {
      editor.chain().focus().setTextAlign(attrs?.align).run();
    }
  }, [attrs?.bold, editor, editorIsEditing, attrs?.italic, attrs?.underline, attrs?.align]);

  const getEmojiAttrs = useCallback(() => {
    if (editorIsEditing && attrs?.emoji && editor) {
      editor.chain().focus().insertContent(attrs?.emoji).run();
    }
  }, [editor, editorIsEditing, attrs?.emoji]);

  const updateColorAttrsPrev = useCallback(() => {
    if (
      editor &&
      editorIsEditing &&
      (editor.getAttributes("textStyle")?.color || editor.getAttributes("textStyle")?.colorG)
    ) {
      setAttrsPrev({
        color: editor.getAttributes("textStyle")?.colorG || editor.getAttributes("textStyle")?.color,
      });
    }
  }, [editor, editorIsEditing, setAttrsPrev]);

  const updateFontStyleAttrsPrev = useCallback(() => {
    if (editor && editorIsEditing) {
      setAttrsPrev({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        align: editor.getAttributes("paragraph")?.textAlign,
      });
    }
  }, [editor, editorIsEditing, setAttrsPrev]);

  const updateFontFamilyStyleAttrsPrev = useCallback(() => {
    if (editor && editorIsEditing && editor.getAttributes("textStyle")?.fontFamily !== attrs?.font) {
      setAttrsPrev({
        font: editor.getAttributes("textStyle")?.fontFamily,
      });
    }
  }, [editor, editorIsEditing, setAttrsPrev, attrs?.font]);

  const updateFontSizeAttrsPrev = useCallback(() => {
    if (editor && editorIsEditing && editor.getAttributes("textStyle")?.fontSize !== attrs?.size) {
      setAttrsPrev({
        size: editor.getAttributes("textStyle")?.fontSize,
      });
    }
  }, [editor, editorIsEditing, setAttrsPrev, attrs?.size]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (editorIsEditing) {
      setShowToolbar(isEditing);
      editor?.setEditable(isEditing);
      editor?.commands.focus();
      editor?.commands.selectAll();
      updateColorAttrsPrev();
      updateFontStyleAttrsPrev();
      updateFontFamilyStyleAttrsPrev();
      updateFontSizeAttrsPrev();
    }
  }, [isEditing, setShowToolbar, editor, editorIsEditing, updateColorAttrsPrev, updateFontStyleAttrsPrev]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (editorIsEditing) {
      getColorAttrs();
      getTextStyleAttrs();
      getEmojiAttrs();
      getFontAttrs();
      getFontSizeAttrs();
    }
  }, [editor, editorIsEditing, attrs]);

  useEffect(() => {
    editor?.on("selectionUpdate", ({ editor }) => {
      updateColorAttrsPrev();
      updateFontStyleAttrsPrev();
      updateFontFamilyStyleAttrsPrev();
      updateFontSizeAttrsPrev();
    });

    return () => {
      editor?.off("selectionUpdate");
    };
  }, [editor, updateColorAttrsPrev, updateFontStyleAttrsPrev, updateFontFamilyStyleAttrsPrev, updateFontSizeAttrsPrev]);


  return (
    <div className="editor rounded-lg outline-none  w-full">
      <EditorContent id={id} editor={editor} className="w-full" />
    </div>
  );
};

export { ContentEditable };

