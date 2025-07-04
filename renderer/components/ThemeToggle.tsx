import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '',
  size = 'md'
}) => {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();

  const sizeClasses = {
    sm: 'p-1 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg'
  };

  const getIcon = () => {
    if (!mounted) {
      return 'SYS'; // Default to system during hydration
    }
    if (theme === 'system') {
      return 'SYS';
    }
    return resolvedTheme === 'dark' ? 'DARK' : 'LIGHT';
  };

  const getLabel = () => {
    if (!mounted) {
      return 'System'; // Default to system during hydration
    }
    if (theme === 'system') {
      return 'System';
    }
    return resolvedTheme === 'dark' ? 'Dark' : 'Light';
  };

  const cycleTheme = () => {
    if (!mounted) return; // Prevent cycling until mounted
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className={`
        inline-flex items-center space-x-2 rounded-lg border border-gray-300 
        bg-white dark:bg-gray-800 dark:border-gray-600 
        text-gray-700 dark:text-gray-200 
        hover:bg-gray-50 dark:hover:bg-gray-700 
        transition-colors duration-200
        ${sizeClasses[size]} 
        ${className}
      `}
      title={`Current theme: ${getLabel()}. Click to cycle through themes.`}
    >
      <span className="text-xs font-mono">{getIcon()}</span>
      <span className="text-xs">{getLabel()}</span>
    </button>
  );
};