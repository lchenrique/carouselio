import type { TextContentHeadingType, TextContent, ContentValues } from "@/types/text-content";
import type { Delta } from "quill/core";

export const convertDeltaOpsToTextContent = (
  ops: Delta["ops"],
): ContentValues[] => {
  const textContent: ContentValues[] = [];
  for (const op of ops) {
    if (typeof op.insert === "string" && op.insert.length > 0) {
      textContent.push({
        attrs: op.attributes,
        value: op.insert,
      });
    }
  }
  return textContent;
  

};
