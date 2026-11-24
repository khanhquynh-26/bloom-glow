
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode
} from 'react';

import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bloom_user');

      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
    } catch {
      localStorage.removeItem('bloom_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData: User, accessToken: string) => {
    localStorage.setItem('bloom_user', JSON.stringify(userData));
    localStorage.setItem('bloom_token', accessToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('bloom_user');
    localStorage.removeItem('bloom_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
