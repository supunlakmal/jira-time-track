import { IpcHandler } from '../../main/preload';
import { mockSessions, mockProjectData, mockProjects, mockBillingData } from './mockData';

// Mock implementation of the IpcHandler for Storybook
const mockIpc: IpcHandler = {
  send: (channel: string, ...args: any[]) => {
    console.log(`[MOCK IPC] send: Channel "${channel}", Args:`, args);
    // Add specific mock behaviors for 'send' channels if needed
    if (channel === 'save-session') {
      console.log('[MOCK IPC] Mocking save-session. Session data:', args[0]);
      // In a real scenario, you might update a local mock store here
    }
  },
  invoke: async (channel: string, ...args: any[]) => {
    console.log(`[MOCK IPC] invoke: Channel "${channel}", Args:`, args);
    switch (channel) {
      case 'get-all-tasks':
        return mockProjectData;
      case 'get-sessions':
        return mockSessions;
      case 'get-billing-data':
        return mockBillingData;
      case 'get-projects':
        return mockProjects;
      case 'get-manual-tasks':
        return []; // Return empty for now, can be expanded
      case 'get-manual-tasks-by-project':
        return { success: true, tasks: [] }; // Return empty for now
      case 'get-manual-tasks-grouped-by-project':
        return { success: true, groupedTasks: {} }; // Return empty for now
      case 'get-reset-preview':
        return { totalSessions: 0, totalProjectData: 0, totalManualTasks: 0, totalProjectPaths: 0 };
      case 'get-billing-settings':
        return mockBillingData.settings;
      case 'calculate-ticket-cost':
        return { success: true, cost: { totalCost: 0, currency: 'USD' } };
      case 'calculate-project-costs':
        return { success: true, costs: [] };
      case 'get-invoices':
        return { success: true, invoices: [] };
      case 'get-project-paths':
        return {};
      case 'get-current-branch':
        return { branch: 'mock-branch' };
      case 'create-git-branch':
        return { success: true, message: 'Mock branch created', action: 'created' };
      case 'check-git-branch-exists':
        return { success: true, exists: false };
      case 'run-github-action':
        return { success: true, output: 'Mock GitHub action run' };
      case 'get-update-info':
        return { success: true, updateInfo: { updateAvailable: false, updateDownloaded: false } };
      case 'check-for-updates':
        return { success: true, updateAvailable: false };
      case 'download-update':
        return { success: true, downloaded: true };
      case 'install-update':
        return { success: true, installed: true };
      case 'get-all-store-data':
        return {
          mainStore: {
            sessions: mockSessions,
            projectData: mockProjectData,
            projects: mockProjects,
            manualTasks: [],
            billing: mockBillingData,
          },
          projectPaths: {},
          zoomLevels: { main: 0, float: 0 },
          summary: {
            totalSessions: Object.keys(mockSessions).length,
            totalProjectData: mockProjectData.length,
            totalProjects: mockProjects.length,
            totalManualTasks: 0,
            totalProjectPaths: 0,
            activeSessions: 0,
            storeSize: 0,
          },
          metadata: {
            lastUpdated: new Date().toISOString(),
            storeVersion: "1.0.0",
          },
        };
      default:
        console.warn(`[MOCK IPC] Unhandled invoke channel: "${channel}"`);
        return undefined;
    }
  },
  on: (channel: string, callback: (...args: any[]) => void) => {
    console.log(`[MOCK IPC] on: Registering listener for channel "${channel}"`);
    // For 'on' channels, you might want to simulate events for testing
    // For now, just return a no-op cleanup function
    return () => {
      console.log(`[MOCK IPC] on: Removing listener for channel "${channel}"`);
    };
  },
  window: {
    minimize: () => console.log('[MOCK IPC] window.minimize'),
    maximize: () => console.log('[MOCK IPC] window.maximize'),
    close: () => console.log('[MOCK IPC] window.close'),
    hide: () => console.log('[MOCK IPC] window.hide'),
    show: () => console.log('[MOCK IPC] window.show'),
  },
  zoom: {
    in: async () => { console.log('[MOCK IPC] zoom.in'); return { success: true }; },
    out: async () => { console.log('[MOCK IPC] zoom.out'); return { success: true }; },
    reset: async () => { console.log('[MOCK IPC] zoom.reset'); return { success: true }; },
    getLevel: async () => { console.log('[MOCK IPC] zoom.getLevel'); return 0; },
  },
  git: {
    createBranch: async (branchName: string, projectPath: string) => {
      console.log(`[MOCK IPC] git.createBranch: ${branchName} in ${projectPath}`);
      return { success: true, message: `Mock branch ${branchName} created` };
    },
    checkBranchExists: async (branchName: string, projectPath: string) => {
      console.log(`[MOCK IPC] git.checkBranchExists: ${branchName} in ${projectPath}`);
      return { success: true, exists: false }; // Assume it doesn't exist for mocking purposes
    },
  },
  update: {
    checkForUpdates: async () => {
      console.log('[MOCK IPC] update.checkForUpdates');
      return { success: true, updateAvailable: false };
    },
    downloadUpdate: async () => {
      console.log('[MOCK IPC] update.downloadUpdate');
      return { success: true, downloaded: true };
    },
    installUpdate: async () => {
      console.log('[MOCK IPC] update.installUpdate');
      return { success: true, installed: true };
    },
    getUpdateInfo: async () => {
      console.log('[MOCK IPC] update.getUpdateInfo');
      return { success: true, updateInfo: { updateAvailable: false, updateDownloaded: false } };
    },
  },
};

// Declare the window.ipc property
declare global {
  interface Window {
    ipc: IpcHandler;
  }
}

// Only expose mockIpc if window.ipc is not already defined (i.e., not in Electron)
if (typeof window !== 'undefined' && !window.ipc) {
  window.ipc = mockIpc;
  console.log('[MOCK IPC] window.ipc has been mocked for Storybook environment.');
}

export default mockIpc;