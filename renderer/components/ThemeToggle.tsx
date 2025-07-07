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
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };

  const themes = [
    { key: 'light', icon: '☀️', label: 'Light' },
    { key: 'dark', icon: '🌙', label: 'Dark' },
    { key: 'system', icon: '⚙️', label: 'System' }
  ] as const;

  const activeTheme = mounted ? theme : 'system';

  return (
    <div 
      className={`inline-flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1 transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      role="tablist"
      aria-label="Theme selection"
    >
      {themes.map(({ key, icon, label }) => (
        <button
          key={key}
          onClick={() => mounted && setTheme(key)}
          className={`
            flex items-center justify-center px-2 py-1 rounded-md transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${activeTheme === key
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }
          `}
          title={`Switch to ${label} theme`}
          role="tab"
          aria-selected={activeTheme === key}
          disabled={!mounted}
        >
          <span className="mr-1">{icon}</span>
          {size !== 'sm' && <span>{label}</span>}
        </button>
      ))}
    </div>
  );
};