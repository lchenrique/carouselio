import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Editor } from '@tiptap/react'; // Importe o tipo Editor do Tiptap

// Definir o tipo do contexto
interface EditorContextType {
  activeEditor: Editor | null;
  setActiveEditor: (editor: Editor | null) => void;
  showToolbar: boolean;
  setShowToolbar: (showToolbar: boolean) => void;
}

// Criar o contexto
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Prover o contexto
export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeEditor, setActiveEditor] = useState<Editor | null>(null);
   const [showToolbar, setShowToolbar] = useState(false);

  return (
    <EditorContext.Provider value={{ activeEditor, setActiveEditor , showToolbar, setShowToolbar}}>
      {children}
    </EditorContext.Provider>
  );
};

// Hook para usar o contexto
export const useEditorContext = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};
