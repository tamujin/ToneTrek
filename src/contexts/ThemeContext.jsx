import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Standard Light Theme
const lightTheme = createTheme({
  name: 'light',
  displayName: 'Light',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Standard Dark Theme
const darkTheme = createTheme({
  name: 'dark',
  displayName: 'Dark',
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      container: '#2d2d2d',
    },
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Cyberpunk Theme
const cyberpunkTheme = createTheme({
  name: 'cyberpunk',
  displayName: 'Cyberpunk',
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f0ff', // Neon cyan
    },
    secondary: {
      main: '#ff00a0', // Neon pink
    },
    background: {
      default: '#0a0a16', // Dark blue-black
      paper: '#14142b', // Dark purple-black
      container: '#1a1a35', // Slightly lighter purple-black
    },
    text: {
      primary: '#ffffff',
      secondary: '#00f0ff', // Neon cyan
    },
    action: {
      hover: 'rgba(0, 240, 255, 0.15)',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", sans-serif',
  },
});

// Snow White Theme
const snowWhiteTheme = createTheme({
  name: 'snowWhite',
  displayName: 'Snow White',
  palette: {
    mode: 'light',
    primary: {
      main: '#5b8af5', // Light blue
    },
    secondary: {
      main: '#b794f6', // Light purple
    },
    background: {
      default: '#ffffff',
      paper: '#f5f9ff', // Very light blue
      container: '#edf2fa', // Light blue-gray
    },
    text: {
      primary: '#2c3e50',
      secondary: '#5b8af5',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Roboto", sans-serif',
  },
});

// Simple Theme (Minimal)
const simpleTheme = createTheme({
  name: 'simple',
  displayName: 'Simple',
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50', // Dark blue-gray
    },
    secondary: {
      main: '#7f8c8d', // Gray
    },
    background: {
      default: '#ecf0f1', // Light gray
      paper: '#ffffff',
      container: '#f9f9f9', // Almost white
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});

// Collection of all available themes
const themes = {
  light: lightTheme,
  dark: darkTheme,
  cyberpunk: cyberpunkTheme,
  snowWhite: snowWhiteTheme,
  simple: simpleTheme,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Try to load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme-preference') || 'light';
    return savedTheme;
  });
  
  const theme = themes[currentTheme] || themes.light;

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme-preference', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      changeTheme,
      availableThemes: Object.keys(themes).map(key => ({
        name: key,
        displayName: themes[key].displayName
      })),
      isDark: theme.palette.mode === 'dark' // Keep for backward compatibility
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};