import { create } from "zustand";

interface BgControlState {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  bgAttrs?: {
    color?: string;
    image?: string;
    size?: string;
    position?: string;
    repeat?: string;
    attachment?: string;
    origin?: string;
    clip?: string;
    blendMode?: string;
  } | null;
  setBgAttrs: (attrs: BgControlState["bgAttrs"]) => void;
}

const useBgControl = create<BgControlState>((set) => ({
  activeId: null,
  bgAttrs: null,
  setBgAttrs: (attrs) => set({ bgAttrs: attrs }),
  setActiveId: (id) => set({ activeId: id }),
}));

export { useBgControl };
