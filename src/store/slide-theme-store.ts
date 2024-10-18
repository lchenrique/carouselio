import { pallettes, ThemeToColors, type Colors } from "@/lib/pallettes";
import { create } from "zustand";

export interface IUseSlideThemeStore {
  theme: Colors;
  setTheme: (theme: Colors) => void;
}

export const useSlideThemeStore = create<IUseSlideThemeStore>((set) => ({
  theme: {
    primary: pallettes.vibrant.cosmicBlaze.primary,
    secondary: pallettes.vibrant.cosmicBlaze.secondary,
    background: pallettes.vibrant.cosmicBlaze.background,
    baseContent: pallettes.vibrant.cosmicBlaze.baseContent,
    pattern: pallettes.vibrant.cosmicBlaze.pattern,
  },
  setTheme: (theme) => set({ theme }),
}));
