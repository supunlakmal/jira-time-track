import { useEffect, useRef, useState, useCallback } from 'react';

interface IdleDetectionOptions {
  idleTime: number; // Time in milliseconds before considering user idle
  onIdle: () => void;
  onActive: () => void;
  enabled: boolean;
}

export const useIdleDetection = ({
  idleTime = 5 * 60 * 1000, // Default 5 minutes
  onIdle,
  onActive,
  enabled = true
}: IdleDetectionOptions) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetIdleTimer = useCallback(() => {
    if (!enabled) return;

    const wasIdle = isIdle;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If user was idle and now active, trigger onActive
    if (wasIdle) {
      setIsIdle(false);
      onActive();
    }

    lastActivityRef.current = Date.now();

    // Set new idle timeout
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdle();
    }, idleTime);
  }, [idleTime, onIdle, onActive, enabled, isIdle]);

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (isIdle) {
        setIsIdle(false);
      }
      return;
    }

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    // Initialize timer
    resetIdleTimer();

    return () => {
      // Cleanup
      events.forEach(event => {
        document.removeEventListener(event, resetIdleTimer, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetIdleTimer, enabled]);

  return {
    isIdle,
    lastActivity: lastActivityRef.current,
    resetTimer: resetIdleTimer
  };
};