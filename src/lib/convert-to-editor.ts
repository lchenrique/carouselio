import type { TextContentHeadingType, TextContent, ContentValues } from "@/types/text-content";
import type { JSONContent } from "@tiptap/react";
import type { Delta } from "quill/core";

export const convertToEditor = (values: ContentValues[]): JSONContent[] => {
  const editorContent: JSONContent[] = values?.map((value) => {
    const attrs = value.attrs;
    const valueString = value.value;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const attributes: any[] = [];
    if (attrs) {
      const initialAttrs = {fontFamily: "Inter", fontSize: "20px", color:  "black" };

      for (const [key, value] of Object.entries(attrs)) {
        if ("color, font, size".includes(key)) {
          console.log(key)
          if (key === "size") {
            Object.assign(initialAttrs, {
              fontSize: value,
            });
          }
          if (key === "font") {
            Object.assign(initialAttrs, {
              fontFamily: value,
            });
          }
          if (key === "color") {
            if (value.toString().startsWith("linear")) {
              Object.assign(initialAttrs, {
                colorG: value,
              });
            }
            else{
              Object.assign(initialAttrs, {
                color: value,
              }); 
            }
        
          }

          

          attributes.push({
            type: "textStyle",
            attrs: initialAttrs,
          });
        }
        if (!"color, font, size".includes(key))
          attributes.push({
            type: key,
          });
      }
    }

    return {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: valueString,
          marks: attributes,
        },
      ],
    };
  });
  return editorContent;
};
