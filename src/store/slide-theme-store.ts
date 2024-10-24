import { pallettes, ThemeToColors, type Colors } from "@/lib/pallettes";
import { create } from "zustand";

export interface IUseSlideThemeStore {
  theme: Colors;
  setTheme: (theme: Colors) => void;
}

export const useSlideThemeStore = create<IUseSlideThemeStore>((set) => ({
  theme: {
    primary: pallettes.vibrant.daylightBreeze.primary,
    secondary: pallettes.vibrant.daylightBreeze.secondary,
    background: pallettes.vibrant.daylightBreeze.background,
    baseContent: pallettes.vibrant.daylightBreeze.baseContent,
    pattern: pallettes.vibrant.daylightBreeze.pattern,
  },
  setTheme: (theme) => set({ theme }),
}));
