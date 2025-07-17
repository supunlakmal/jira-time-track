import React, { forwardRef } from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  variant = 'default',
  resize = 'vertical',
  className = '',
  disabled,
  required,
  id,
  rows = 3,
  ...props
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseTextareaClasses = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400';
  
  const variantClasses = {
    default: 'border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700',
    outlined: 'border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-transparent',
    filled: 'border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-t-md bg-gray-50 dark:bg-gray-800'
  };
  
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };
  
  const textareaClasses = [
    baseTextareaClasses,
    variantClasses[variant],
    resizeClasses[resize],
    'px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400',
    fullWidth ? 'w-full' : '',
    error && 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
    disabled && 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}
        >
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={textareaClasses}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;