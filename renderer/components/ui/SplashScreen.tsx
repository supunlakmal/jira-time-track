import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
  loadingState?: 'initializing' | 'loading-data' | 'ready';
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  minDisplayTime = 1500,
  loadingState = 'initializing'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [startTime] = useState(Date.now());

  const getLoadingText = () => {
    switch (loadingState) {
      case 'initializing':
        return 'Initializing...';
      case 'loading-data':
        return 'Loading data...';
      case 'ready':
        return 'Ready!';
      default:
        return 'Initializing...';
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500); // Wait for fade-out animation
      }, remainingTime);
    }, 100);

    return () => clearTimeout(timer);
  }, [startTime, minDisplayTime, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center animate-fade-in">
        {/* App Logo/Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-105">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Jira Time Tracker
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track your time efficiently
        </p>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-1 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-300">
          {getLoadingText()}
        </p>
      </div>
    </div>
  );
};