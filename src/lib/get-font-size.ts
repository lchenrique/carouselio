import { AvailableFontSizeValues } from "./font-sizes";

export const getNextFontSize = (size: string, action: "increase" | "decrease") => {
  const fontSizes = AvailableFontSizeValues;
  const index = fontSizes.indexOf(size);
  if (action === "increase" && index < fontSizes.length - 1) {
    return fontSizes[index + 1];
  }
  if (action === "decrease" && index > 0) {
    return fontSizes[index - 1];
  }
  return size;
};
