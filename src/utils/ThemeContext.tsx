import React, {createContext, useContext, useEffect, useState} from 'react';
import {loadTheme, saveTheme} from './themeStorage';
import {Colors} from './Colors';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: typeof Colors.light;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: Colors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const loadSavedTheme = async () => {
      const saved = await loadTheme();
      if (saved) setThemeState(saved);
    };
    loadSavedTheme();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await saveTheme(newTheme);
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  const colors = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <ThemeContext.Provider value={{theme, colors, toggleTheme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
