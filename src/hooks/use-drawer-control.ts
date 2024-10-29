  import { create } from 'zustand';

  interface DrawerState {
    isOpen: boolean;
    content: React.ReactNode | null;
    title: React.ReactNode | null;
    open: (title: React.ReactNode , content: React.ReactNode) => void;
    onClose: () => void;
    toggle: () => void;
  }

  export const useDrawerControl = create<DrawerState>((set) => ({
    isOpen: false,
    content: null,
    title: null,
    open: (title, content: React.ReactNode) => set({ isOpen: true, content , title}),
    onClose: () => set({ isOpen: false, content: null }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  }));
