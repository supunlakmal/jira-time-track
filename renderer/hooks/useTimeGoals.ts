import { useState, useEffect, useCallback } from 'react';

interface TimeGoal {
  id: string;
  type: 'daily' | 'weekly' | 'project' | 'ticket';
  target: number; // milliseconds
  targetEntity?: string; // project name or ticket number
  description: string;
  enabled: boolean;
}

interface TimeGoalProgress {
  goalId: string;
  current: number; // milliseconds
  target: number; // milliseconds
  percentage: number;
  isOvertime: boolean;
  remainingTime: number; // milliseconds (negative if overtime)
}

interface TimeGoalsState {
  goals: TimeGoal[];
  progress: TimeGoalProgress[];
  alerts: {
    id: string;
    type: 'warning' | 'overtime' | 'achieved';
    goalId: string;
    message: string;
    timestamp: number;
  }[];
}

const DEFAULT_GOALS: TimeGoal[] = [
  {
    id: 'daily-8h',
    type: 'daily',
    target: 8 * 60 * 60 * 1000, // 8 hours
    description: 'Daily work target: 8 hours',
    enabled: true
  },
  {
    id: 'weekly-40h',
    type: 'weekly', 
    target: 40 * 60 * 60 * 1000, // 40 hours
    description: 'Weekly work target: 40 hours',
    enabled: true
  }
];

export const useTimeGoals = (sessions: any) => {
  const [state, setState] = useState<TimeGoalsState>(() => {
    const saved = localStorage.getItem('timeGoals');
    return saved ? JSON.parse(saved) : {
      goals: DEFAULT_GOALS,
      progress: [],
      alerts: []
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timeGoals', JSON.stringify(state));
  }, [state]);

  const addGoal = useCallback((goal: Omit<TimeGoal, 'id'>) => {
    const newGoal: TimeGoal = {
      ...goal,
      id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  }, []);

  const updateGoal = useCallback((goalId: string, updates: Partial<TimeGoal>) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === goalId ? { ...goal, ...updates } : goal
      )
    }));
  }, []);

  const removeGoal = useCallback((goalId: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== goalId),
      progress: prev.progress.filter(p => p.goalId !== goalId),
      alerts: prev.alerts.filter(a => a.goalId !== goalId)
    }));
  }, []);

  const addAlert = useCallback((alert: Omit<TimeGoalsState['alerts'][0], 'id' | 'timestamp'>) => {
    const newAlert = {
      ...alert,
      id: `alert-${Date.now()}`,
      timestamp: Date.now()
    };
    
    setState(prev => ({
      ...prev,
      alerts: [newAlert, ...prev.alerts.slice(0, 9)] // Keep only 10 most recent alerts
    }));

    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const title = alert.type === 'overtime' ? 'Overtime Alert' : 
                   alert.type === 'warning' ? 'Time Goal Warning' : 
                   'Goal Achieved';
      new Notification(title, {
        body: alert.message,
        icon: '/images/logo.png'
      });
    }
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setState(prev => ({
      ...prev,
      alerts: prev.alerts.filter(alert => alert.id !== alertId)
    }));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setState(prev => ({
      ...prev,
      alerts: []
    }));
  }, []);

  const formatTime = (ms: number): string => {
    const hours = Math.floor(Math.abs(ms) / (1000 * 60 * 60));
    const minutes = Math.floor((Math.abs(ms) % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return {
    goals: state.goals,
    progress: state.progress,
    alerts: state.alerts,
    actions: {
      addGoal,
      updateGoal,
      removeGoal,
      addAlert,
      dismissAlert,
      clearAllAlerts
    },
    formatTime
  };
};