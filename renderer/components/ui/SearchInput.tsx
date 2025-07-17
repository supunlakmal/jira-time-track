import React, { forwardRef } from 'react';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  showClearButton?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'filled';
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  onClear,
  showClearButton = true,
  fullWidth = false,
  variant = 'default',
  className = '',
  placeholder = 'Search...',
  value,
  ...props
}, ref) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  const baseClasses = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400';
  
  const variantClasses = {
    default: 'border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700',
    filled: 'border-none rounded-lg bg-gray-100 dark:bg-gray-800'
  };
  
  const inputClasses = [
    baseClasses,
    variantClasses[variant],
    'pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
    showClearButton && value && 'pr-10',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  const SearchIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const ClearIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <div className="text-gray-400 dark:text-gray-500">
          <SearchIcon />
        </div>
      </div>
      
      <input
        ref={ref}
        type="text"
        className={inputClasses}
        placeholder={placeholder}
        value={value}
        {...props}
      />
      
      {showClearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;