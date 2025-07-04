import { useState, useEffect, useRef, useCallback } from 'react';

interface BreakTimerSettings {
  workDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  longBreakInterval: number; // after how many work sessions
  enabled: boolean;
}

interface BreakTimerState {
  isOnBreak: boolean;
  breakType: 'short' | 'long' | null;
  timeUntilBreak: number; // milliseconds
  breakTimeRemaining: number; // milliseconds
  workSessionsCompleted: number;
  showBreakReminder: boolean;
}

const DEFAULT_SETTINGS: BreakTimerSettings = {
  workDuration: 25, // 25 minutes
  shortBreakDuration: 5, // 5 minutes
  longBreakDuration: 15, // 15 minutes
  longBreakInterval: 4, // after 4 work sessions
  enabled: true
};

export const useBreakTimer = (isActivelyWorking: boolean) => {
  const [settings, setSettings] = useState<BreakTimerSettings>(() => {
    // Load settings from localStorage (only in browser)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breakTimerSettings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  const [state, setState] = useState<BreakTimerState>({
    isOnBreak: false,
    breakType: null,
    timeUntilBreak: settings.workDuration * 60 * 1000,
    breakTimeRemaining: 0,
    workSessionsCompleted: 0,
    showBreakReminder: false
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastWorkTimeRef = useRef<number>(0);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('breakTimerSettings', JSON.stringify(settings));
    }
  }, [settings]);

  const showNotification = useCallback((title: string, body: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/images/logo.png'
      });
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }, []);

  const startBreak = useCallback((type: 'short' | 'long') => {
    const duration = type === 'short' ? settings.shortBreakDuration : settings.longBreakDuration;
    
    setState(prev => ({
      ...prev,
      isOnBreak: true,
      breakType: type,
      breakTimeRemaining: duration * 60 * 1000,
      showBreakReminder: false
    }));

    showNotification(
      `${type === 'short' ? 'Short' : 'Long'} Break Started!`,
      `Take a ${duration} minute break. You've earned it!`
    );
  }, [settings, showNotification]);

  const skipBreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      showBreakReminder: false,
      timeUntilBreak: settings.workDuration * 60 * 1000
    }));
  }, [settings]);

  const endBreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOnBreak: false,
      breakType: null,
      breakTimeRemaining: 0,
      timeUntilBreak: settings.workDuration * 60 * 1000,
      workSessionsCompleted: prev.workSessionsCompleted + 1
    }));

    showNotification(
      'Break Over!',
      'Time to get back to work. Stay productive!'
    );
  }, [settings, showNotification]);

  const suggestBreak = useCallback(() => {
    const sessionsCompleted = state.workSessionsCompleted;
    const shouldBeLongBreak = (sessionsCompleted + 1) % settings.longBreakInterval === 0;
    
    setState(prev => ({
      ...prev,
      showBreakReminder: true,
      breakType: shouldBeLongBreak ? 'long' : 'short'
    }));

    showNotification(
      'Time for a Break!',
      `You've been working for ${settings.workDuration} minutes. Take a ${shouldBeLongBreak ? 'long' : 'short'} break!`
    );
  }, [state.workSessionsCompleted, settings, showNotification]);

  // Main timer logic
  useEffect(() => {
    if (!settings.enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.isOnBreak) {
          // On break countdown
          const newBreakTime = prev.breakTimeRemaining - 1000;
          if (newBreakTime <= 0) {
            endBreak();
            return {
              ...prev,
              isOnBreak: false,
              breakType: null,
              breakTimeRemaining: 0,
              timeUntilBreak: settings.workDuration * 60 * 1000,
              workSessionsCompleted: prev.workSessionsCompleted + 1
            };
          }
          return { ...prev, breakTimeRemaining: newBreakTime };
        } else if (isActivelyWorking && !prev.showBreakReminder) {
          // Working countdown
          const newWorkTime = prev.timeUntilBreak - 1000;
          if (newWorkTime <= 0) {
            suggestBreak();
            return { ...prev, timeUntilBreak: 0 };
          }
          return { ...prev, timeUntilBreak: newWorkTime };
        }
        return prev;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [settings.enabled, isActivelyWorking, endBreak, suggestBreak]);

  // Request notification permission on first load
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    settings,
    setSettings,
    state,
    actions: {
      startBreak,
      skipBreak,
      endBreak,
      suggestBreak
    },
    formatTime
  };
};