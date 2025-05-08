
import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Export ThemeContext to be used in other components
export const ThemeContext = createContext();



export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
  }, [colorScheme]);

  const lightTheme = {
    isDark: false,
    backgroundColor: '#f5f5f5',
    textColor: '#1a1a1a',
    secondaryTextColor: '#666',
    placeholderTextColor: '#999',
    overlayBackground: 'rgba(255, 255, 255, 0.95)',
    searchBackground: '#fff',
    buttonBackground: 'rgba(0, 0, 0, 0.05)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    accentColor: '#E50914',
    buttonOverlayBackground: 'rgba(255, 255, 255, 0.3)',

  };

  const darkTheme = {
    isDark: true,
    backgroundColor: '#121212',
    textColor: '#fff',
    secondaryTextColor: '#aaa',
    placeholderTextColor: '#888',
    overlayBackground: 'rgba(30, 30, 30, 0.95)',
    searchBackground: 'rgba(30, 30, 30, 0.95)',
    buttonBackground: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    accentColor: '#E50914',
    buttonOverlayBackground: 'rgba(255, 255, 255, 0.3)',

  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};