import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = (): ThemeContextType => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize theme from localStorage after mounting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) {
        setTheme(saved);
      }
    }
    setMounted(true);
  }, []);

  // Function to get the resolved theme based on system preference
  const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      // Check if we're in the browser before accessing window.matchMedia
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light'; // Default to light on server
    }
    return currentTheme;
  };

  // Update resolved theme when theme changes or system preference changes
  useEffect(() => {
    const updateResolvedTheme = () => {
      const resolved = getResolvedTheme(theme);
      setResolvedTheme(resolved);
      
      // Update document class for Tailwind dark mode
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (resolved === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes (only in browser)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          updateResolvedTheme();
        }
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Listen for theme changes from other windows via IPC
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ipc?.on) {
      const cleanup = window.ipc.on('theme-changed', (newTheme: Theme) => {
        console.log('Received theme change from other window:', newTheme);
        // Only update if it's different from current theme to avoid loops
        if (newTheme !== theme) {
          setTheme(newTheme);
        }
      });

      return cleanup;
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    // Send theme change to main process to broadcast to all windows
    if (typeof window !== 'undefined' && window.ipc?.send) {
      window.ipc.send('theme-changed', newTheme);
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme: handleSetTheme,
    mounted
  };
};