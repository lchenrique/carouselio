import { create } from "zustand";

export interface SelectionFormat {
  [contentId: string]: {
    [key: string]: string | boolean;
  };
}

export interface IUseToolbarControl {
  selectionFormat: SelectionFormat;
  showToolbar: boolean;
  toggleToolbar: (show: boolean) => void;
  setSelectionFormat: (contentId: string, format: { [key: string]: string | boolean }, toChange?: boolean) => void;
  activeContent: string;
  setActiveContent: (contentId: string) => void;
  toChange: boolean;
}

export const useToolbarControl = create<IUseToolbarControl>((set) => ({
  selectionFormat: {} as SelectionFormat,
  prevSelectedFormat: {} as SelectionFormat,
  showToolbar: false,
  toggleToolbar: (show: boolean) => set({ showToolbar: show }),
  setSelectionFormat: (contentId: string, format: { [key: string]: string | boolean }, toChange?: boolean) =>
    set((prev) => ({
      toChange: toChange ?? false,
      selectionFormat: {
        [contentId]: format,
      },
    })),
  setActiveContent: (contentId: string) => set({ activeContent: contentId }),
  activeContent: "",
  toChange: false,
}));
