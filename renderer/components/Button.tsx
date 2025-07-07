import React, { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    warning: 'bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 focus:ring-gray-500',
    link: 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-transparent hover:bg-transparent focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2 text-base',
    icon: 'p-1 w-5 h-5 text-xs'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  const finalClassName = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={finalClassName}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;