import { createContext, useContext, useState, ReactNode } from 'react';

type Page = 'landing' | 'individual-form' | 'team-form' | 'listings' | 'edit';

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  editData: { type: 'individual' | 'team'; data: any } | null;
  setEditData: (data: { type: 'individual' | 'team'; data: any } | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [editData, setEditData] = useState<{ type: 'individual' | 'team'; data: any } | null>(null);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, editData, setEditData }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
