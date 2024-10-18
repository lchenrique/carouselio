import { interpolate, wcagContrast, type Oklch, type Color, rgb, formatHex } from "culori";

const isDark = (color: Color | string) => {
  try {
    if (wcagContrast(color, "black") < wcagContrast(color, "white")) {
      return true;
    }
    return false;
  } catch (e) {
    // colorIsInvalid(color)
    return false;
  }
};

export const generateForegroundColorFrom = (input: Color | string, percentage = 1) => {
  const result = interpolate([input, isDark(input) ? "white" : "black"], "oklch")(percentage);
  return colorObjToString(result);
};

const generateDarkenColorFrom = (input: string, percentage = 0.07) => {
  try {
    const result = interpolate([input, "black"], "oklch")(percentage);
    return colorObjToString(result);
  } catch (e) {
    // colorIsInvalid(input)
    return false;
  }
};

export const colorObjToString = (input: Oklch) => {
  const rbgColor = rgb(input);

  return `${formatHex(rbgColor)}`;
};
