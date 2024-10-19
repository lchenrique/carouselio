import type { Theme } from "@/lib/theme";

export enum TextContentHeadingType {
  Heading1 = "44px",
  Heading2 = "36px",
  Heading3 = "32px",
  Heading4 = "28px",
  Heading5 = "24px",
  Heading6 = "20px",
  Heading7 = "18px",
  Heading8 = "16px",
}

export interface TextContent {
  id: string;
  values: ContentValues[];
}


export interface ContentValues {
  attrs?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    color?: string;
    font?: string;
    size?: string;
  };
  value: string;
}


export const getDefaultColor = (type: TextContentHeadingType): keyof Theme => {
  switch (type) {
    case TextContentHeadingType.Heading1:
    case TextContentHeadingType.Heading2:
    case TextContentHeadingType.Heading3:
      return "primary";
    case TextContentHeadingType.Heading4:
    case TextContentHeadingType.Heading5:
    case TextContentHeadingType.Heading6:
    case TextContentHeadingType.Heading7:
    case TextContentHeadingType.Heading8:
      return "secondary";
    default:
      return "secondary";
  }
};
