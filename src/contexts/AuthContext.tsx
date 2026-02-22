import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  userPhone: string | null;
  login: (phone: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userPhone, setUserPhone] = useState<string | null>(() => {
    const saved = localStorage.getItem('userPhone');
    return saved ? saved.replace(/\s/g, '') : null;
  });

  const login = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '');
    localStorage.setItem('userPhone', cleanPhone);
    setUserPhone(cleanPhone);
  };

  const logout = () => {
    localStorage.removeItem('userPhone');
    setUserPhone(null);
  };

  const isLoggedIn = !!userPhone;

  return (
    <AuthContext.Provider value={{ userPhone, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
