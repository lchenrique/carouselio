"use client";

import type Quill from "quill";
import { createContext, useContext, useState, type ReactNode, type RefObject } from "react";
import { useQuill } from "react-quilljs";

interface ToolbarContextType {
  toolbar: Quill | undefined;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  toolbarRef: RefObject<any>;
  addSelectionFormat: (format: SelectionFormat) => void;
  selectionFormat: SelectionFormat | null;
}

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

export const useToolbar = () => {
  const context = useContext(ToolbarContext);
  if (!context) {
    throw new Error("useToolbar must be used within a ToolbarProvider");
  }
  return context;
};

interface ToolbarProviderProps {
  children: ReactNode;
}

interface SelectionFormat {
  [key: string]: unknown;
}

export const ToolbarProvider: React.FC<ToolbarProviderProps> = ({ children }) => {
  const { quill: toolbar, quillRef: toolbarRef } = useQuill();
  const [selectionFormat, setSelectionFormat] = useState<SelectionFormat | null>(null);

  const addSelectionFormat = (format: SelectionFormat) => {
    setSelectionFormat((prevFormat) => ({ ...prevFormat, ...format }));
  };

  return (
    <ToolbarContext.Provider value={{ toolbar, toolbarRef, selectionFormat, addSelectionFormat }}>
      {children}
    </ToolbarContext.Provider>
  );
};
