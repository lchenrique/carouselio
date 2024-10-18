import { create } from "zustand";

export interface IUseSideBarControl {
  open: boolean;
  toggle: (value: boolean) => void;
}

export const useSideBarControl = create<IUseSideBarControl>((set) => ({
  open: true,
  toggle: (value: boolean) => set({ open: value }), // Toggle the sidebar open/closed state
}));
