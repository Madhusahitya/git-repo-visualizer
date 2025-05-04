// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the Auth type
interface AuthState {
  isLoggedIn: boolean;
  user: { username: string; avatarUrl: string } | null;
  darkMode: boolean;
  login: (username: string, avatarUrl: string) => void;
  logout: () => void;
  toggleDarkMode: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  darkMode: false,
  login: () => {},
  logout: () => {},
  toggleDarkMode: () => {},
});

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from localStorage or default
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [user, setUser] = useState<{ username: string; avatarUrl: string } | null>(null);

  // Simulate loading stored session
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedDarkMode = localStorage.getItem('darkMode');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    if (storedDarkMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Login function
  const login = (username: string, avatarUrl: string) => {
    const userData = { username, avatarUrl };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        darkMode,
        login,
        logout,
        toggleDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};