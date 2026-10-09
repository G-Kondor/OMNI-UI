import { createContext, useContext } from 'react';

export interface LayoutContextType {
  isAssistOpen: boolean;
  setAssistOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) throw new Error('useLayoutContext must be used within Layout');
  return context;
}
