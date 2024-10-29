import { create } from "zustand";

export interface ISlideCustomization {
  backgroundColor?: string;
  transition?: string;
  duration?: number;
  opacity?: number;
}

export interface IUseSlideControltore {
  swipe: boolean;
  setSwipe: (value: boolean) => void;
  slideCustomization: { [key: number]: ISlideCustomization };
  setSlideCustomization: (slideIndex: number, customization: ISlideCustomization) => void;
}

export const useSlideControl = create<IUseSlideControltore>((set) => ({
  swipe: true,
  setSwipe: (value: boolean) => set({ swipe: value }),
  slideCustomization: {},
  setSlideCustomization: (slideIndex: number, customization: ISlideCustomization) =>
    set((state) => ({
      slideCustomization: {
        ...state.slideCustomization,
        [slideIndex]: {
          ...state.slideCustomization[slideIndex],
          ...customization,
        },
      },
    })),
}));