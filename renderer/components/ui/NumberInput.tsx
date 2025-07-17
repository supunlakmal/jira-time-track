import React, { forwardRef } from 'react';

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  showStepper?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  fullWidth = false,
  variant = 'default',
  showStepper = false,
  onIncrement,
  onDecrement,
  className = '',
  disabled,
  required,
  id,
  min,
  max,
  step = 1,
  ...props
}, ref) => {
  const inputId = id || `number-input-${Math.random().toString(36).substr(2, 9)}`;
  
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
    (endIcon || showStepper) && 'pr-10',
    fullWidth ? 'w-full' : '',
    error && 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
    disabled && 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  const ChevronUpIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

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
          type="number"
          className={inputClasses}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        
        {showStepper && (
          <div className="absolute inset-y-0 right-0 flex flex-col">
            <button
              type="button"
              onClick={onIncrement}
              disabled={disabled}
              className="px-2 py-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center border-l border-gray-300 dark:border-gray-600 rounded-tr-md"
              aria-label="Increment"
            >
              <ChevronUpIcon />
            </button>
            <button
              type="button"
              onClick={onDecrement}
              disabled={disabled}
              className="px-2 py-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center border-l border-t border-gray-300 dark:border-gray-600 rounded-br-md"
              aria-label="Decrement"
            >
              <ChevronDownIcon />
            </button>
          </div>
        )}
        
        {endIcon && !showStepper && (
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

NumberInput.displayName = 'NumberInput';

export default NumberInput;