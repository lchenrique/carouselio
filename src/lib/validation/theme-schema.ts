import * as z from "zod";

export const ColorSchema = z.object({
  primary: z.string().min(7).max(7).regex(/^#/),
  secondary: z.string(),
  background: z.string(),
  baseContent: z.string(),
  pattern: z.string(),
});

export const ThemeSchema = ColorSchema.extend({
  isCustom: z.boolean(),
  pallette: z.string(),
});
