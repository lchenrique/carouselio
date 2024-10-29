import type { ContentValues, TextContent } from "@/types/text-content";
import { create } from "zustand";

interface ContentControlState {
  activeItemId: string | null;
  setActiveItemId: (id: string | null) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  attrs: (ContentValues["attrs"] & { emoji?: string }) | null;
  setAttrs: (attr: (ContentValues["attrs"] & { emoji?: string }) | null) => void;
  attrsPrev: (ContentValues["attrs"] & { emoji?: string }) | null;
  setAttrsPrev: (attr: (ContentValues["attrs"] & { emoji?: string }) | null) => void;
}

const useContentControl = create<ContentControlState>((set) => ({
  activeItemId: null,
  setActiveItemId: (id) => set({ activeItemId: id }),
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing }),
  attrs: null,
  setAttrs: (attr) => set((old) => ({ attrs: attr, attrsPrev: { ...old.attrsPrev, ...attr } })),
  attrsPrev: null,
  setAttrsPrev: (attr) => set((old) => ({ attrsPrev: { ...old.attrsPrev, ...attr } })),
}));

export { useContentControl };
