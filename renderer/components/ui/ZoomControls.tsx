import React from 'react';
import Button from './Button';

export interface ZoomControlsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  className = '',
  size = 'md'
}) => {
  const buttonSize = size === 'sm' ? 'icon' : 'icon';
  const buttonClassName = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className={`flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white dark:bg-gray-800 dark:border-gray-600 ${className}`}>
      <Button
        onClick={() => window.ipc?.zoom?.out()}
        variant="gray"
        size={buttonSize}
        className={buttonClassName}
        title="Zoom out (Ctrl+-)"
      >
        <svg
          className={iconSize}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </Button>
      <Button
        onClick={() => window.ipc?.zoom?.reset()}
        variant="gray"
        size={buttonSize}
        className={buttonClassName}
        title="Reset zoom (Ctrl+0)"
      >
        <svg
          className={iconSize}
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
      </Button>
      <Button
        onClick={() => window.ipc?.zoom?.in()}
        variant="gray"
        size={buttonSize}
        className={buttonClassName}
        title="Zoom in (Ctrl+=)"
      >
        <svg
          className={iconSize}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Button>
    </div>
  );
};

export default ZoomControls;