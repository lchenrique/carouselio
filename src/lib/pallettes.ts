import { generateForegroundColorFrom } from "@/lib/theme-utils";
import themes, { type Theme } from "@/lib/theme";
import type { ColorSchema } from "@/lib/validation/theme-schema";
import { formatHex, parse } from "culori";

import type * as z from "zod";

export type Colors = z.infer<typeof ColorSchema>;

type Pallette = {
  [colorSchema: string]: {
    [colorName: string]: Colors;
  };
};
export const pallettes: Pallette = Object.entries(themes).reduce<Record<string, Record<string, Colors>>>(
  (acc, [themeName, theme]) => {
    const colorScheme = theme["color-scheme"];

    if (colorScheme) {
      // Inicializa o esquema de cor se não existir
      if (!acc[colorScheme]) {
        acc[colorScheme] = {};
      }

      // Adiciona o tema convertido para Colors
      acc[colorScheme][themeName] = ThemeToColors(theme);
    }

    return acc;
  },
  {}
);

export function ThemeToColors(theme: Theme): {
  primary: string;
  secondary: string;
  background: string;
  baseContent: string;
  pattern: string;
} {
  return {
    // Simplification of Daisy UI color scheme
    primary: (theme.primary && formatHex(parse(theme.primary))) || generateForegroundColorFrom(theme.primary),
    secondary: theme.secondary || generateForegroundColorFrom(theme["base-100"]),
    background: formatHex(parse(theme["base-100"])) || theme["base-100"],
    baseContent: formatHex(parse(theme["base-content"] || theme["base-100"])) || theme["base-100"],
    pattern: theme.pattern || theme["base-100"],
    // Add more properties if needed
  };
}
