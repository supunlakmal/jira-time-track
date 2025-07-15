import React, { forwardRef } from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  fullWidth = false,
  variant = 'default',
  className = '',
  disabled,
  required,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputClasses = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400';
  
  const variantClasses = {
    default: 'border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent',
    filled: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-t-md bg-gray-50 dark:bg-gray-800'
  };
  
  const inputClasses = [
    baseInputClasses,
    variantClasses[variant],
    'px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
    startIcon && 'pl-10',
    endIcon && 'pr-10',
    fullWidth ? 'w-full' : '',
    error && 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
    disabled && 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400 dark:text-gray-500">
              {startIcon}
            </div>
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400 dark:text-gray-500">
              {endIcon}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;