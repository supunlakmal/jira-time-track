import type { Meta, StoryObj } from '@storybook/react';
import StoreDataViewer from '../../renderer/components/debug/StoreDataViewer';

const meta: Meta<typeof StoreDataViewer> = {
  title: 'Debug/StoreDataViewer',
  component: StoreDataViewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StoreDataViewer>;

export const Default: Story = {
  args: {
    className: 'w-full',
  },
  // Mock window.ipc for Storybook environment
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = {
          invoke: async (channel: string, ...args: any[]) => {
            if (channel === 'get-all-store-data') {
              return {
                sessions: {
                  session1: { ticketNumber: 'PROJ-1', totalElapsed: 3600000 },
                  session2: { ticketNumber: 'PROJ-2', totalElapsed: 1800000 },
                },
                projectPaths: {
                  'ProjectA': '/path/to/projectA',
                  'ProjectB': '/path/to/projectB',
                },
                zoomLevels: { main: 1.0, float: 0.9 },
                metadata: {
                  storeVersion: '1.0.0',
                  lastUpdated: new Date().toISOString(),
                },
                summary: {
                  totalSessions: 2,
                  activeSessions: 1,
                  totalProjects: 2,
                  totalProjectData: 10,
                  totalManualTasks: 5,
                  totalProjectPaths: 2,
                  storeSize: 10240,
                }
              };
            }
            return {};
          },
          on: (channel: string, listener: (...args: any[]) => void) => {
            // Mock event listeners if needed for specific stories
            return () => {}; // Return an unsubscribe function
          },
          send: () => {},
          window: { minimize: () => {}, maximize: () => {}, close: () => {}, hide: () => {}, show: () => {} },
          zoom: { in: () => {}, out: () => {}, reset: () => {} },
          git: { createBranch: async () => ({ success: true }), checkBranchExists: async () => ({ success: true }) },
          update: { checkForUpdates: async () => ({ success: true }), downloadUpdate: async () => ({ success: true }), installUpdate: async () => ({ success: true }), getUpdateInfo: async () => ({ success: true, updateInfo: { updateAvailable: false, updateDownloaded: false } }) }
        };
      }
      return <Story />;
    },
  ],
};
