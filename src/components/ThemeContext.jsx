
// Import necessary hooks and functions from React
import React, { createContext, useEffect, useState } from 'react';

// Create a context for theme-related data and functionality
export const ThemeContext = createContext();

// ThemeProvider component to wrap parts of the app that need access to theme state
export const ThemeProvider = ({ children }) => {
  // Initialize theme state using localStorage value if available, otherwise default to 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Effect to apply the theme class to the document body and store the current theme in localStorage
  useEffect(() => {
    // Adds or removes 'dark' class on the <body> based on the current theme
    document.body.classList.toggle('dark', theme === 'dark');

    // Persist the theme in localStorage for future visits
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme between 'light' and 'dark'
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  // Provide theme state and toggle function to children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
