import { create } from "zustand";

export interface IUseSlideControltore {
  swipe: boolean;
  setSwipe: (value: boolean) => void;
}

export const useSlideControl = create<IUseSlideControltore>((set) => ({
  swipe: true,
  setSwipe: (value: boolean) => set({ swipe: value }),
}));
