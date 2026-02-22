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
    return localStorage.getItem('userPhone');
  });

  const login = (phone: string) => {
    localStorage.setItem('userPhone', phone);
    setUserPhone(phone);
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
