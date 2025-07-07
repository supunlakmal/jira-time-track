// Mock implementations for hooks used in page stories
import { useState, useEffect } from 'react';
import { mockProjectTickets, mockSessions, mockTimers } from './mockData';

// Mock useSharedData hook
export const createMockUseSharedData = (options: {
  loading?: boolean;
  projectData?: any[];
  sessions?: any;
  hasActiveSessions?: boolean;
} = {}) => {
  return () => {
    const [loading, setLoading] = useState(options.loading ?? false);
    const [projectData] = useState(options.projectData ?? mockProjectTickets);
    const [sessions] = useState(options.sessions ?? mockSessions);

    useEffect(() => {
      if (options.loading) {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
      }
    }, []);

    return {
      projectData,
      sessions,
      loading,
      saveSession: (sessionData: any) => {
        console.log('Mock saveSession called:', sessionData);
        return Promise.resolve({ success: true });
      },
      deleteSession: (sessionId: string) => {
        console.log('Mock deleteSession called:', sessionId);
        return Promise.resolve({ success: true });
      },
      updateSession: (sessionId: string, updates: any) => {
        console.log('Mock updateSession called:', sessionId, updates);
        return Promise.resolve({ success: true });
      },
    };
  };
};

// Mock keyboard shortcuts hooks
export const mockUseMainWindowShortcuts = (handlers: any = {}) => {
  useEffect(() => {
    console.log('Mock main window shortcuts registered:', Object.keys(handlers));
  }, []);
};

export const mockUseFloatingWindowShortcuts = (handlers: any = {}) => {
  useEffect(() => {
    console.log('Mock floating window shortcuts registered:', Object.keys(handlers));
  }, []);
};

// Mock IPC implementation
export const createMockIpc = (overrides: any = {}) => {
  const defaultIpc = {
    invoke: (channel: string, ...args: any[]) => {
      console.log(`Mock IPC invoke: ${channel}`, args);
      
      switch (channel) {
        case 'get-all-tasks':
          return Promise.resolve(mockProjectTickets);
        case 'get-sessions':
          return Promise.resolve(mockSessions);
        case 'get-project-paths':
          return Promise.resolve({
            'jira-time-tracker': '/Users/dev/projects/jira-time-tracker',
            'mobile-app': '/Users/dev/projects/mobile-app',
          });
        case 'get-current-branch':
          return Promise.resolve({ branch: 'feature/storybook-setup' });
        case 'get-export-summary':
          return Promise.resolve({
            totalSessions: 25,
            totalTime: 150000,
            totalProjects: 3,
            totalTickets: 8,
          });
        case 'export-time-data':
          return Promise.resolve({
            success: true,
            recordCount: 25,
            filePath: '/Users/dev/Downloads/time-export.csv',
          });
        case 'select-project-directory':
          return Promise.resolve({
            filePath: '/Users/dev/projects/selected-project',
          });
        case 'add-manual-task':
          return Promise.resolve({
            success: true,
            task: { ...args[0], isManual: true },
          });
        case 'update-manual-task':
          return Promise.resolve({
            success: true,
            task: { ...args[0] },
          });
        case 'delete-manual-task':
          return Promise.resolve({ success: true });
        default:
          return Promise.resolve({ success: true });
      }
    },
    send: (channel: string, ...args: any[]) => {
      console.log(`Mock IPC send: ${channel}`, args);
    },
    on: (channel: string, listener: any) => {
      console.log(`Mock IPC listener registered: ${channel}`);
      return () => console.log(`Mock IPC listener removed: ${channel}`);
    },
    window: {
      minimize: () => console.log('Mock window minimize'),
      maximize: () => console.log('Mock window maximize'),
      close: () => console.log('Mock window close'),
      hide: () => console.log('Mock window hide'),
      show: () => console.log('Mock window show'),
    },
    ...overrides,
  };

  return defaultIpc;
};

