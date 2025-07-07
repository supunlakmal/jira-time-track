import type { Meta, StoryObj } from '@storybook/react';
import { ExportDialog } from '../../renderer/components/ExportDialog';

// Mock the window.ipc for Storybook
const mockIpc = {
  invoke: (channel: string, ...args: any[]) => {
    if (channel === 'get-export-summary') {
      return Promise.resolve({
        totalSessions: 42,
        totalTime: 150000, // 150 seconds
        uniqueProjects: 5,
        dateRange: {
          start: '2024-01-01',
          end: '2024-12-31'
        }
      });
    }
    if (channel === 'export-time-data') {
      return Promise.resolve({
        success: true,
        recordCount: 42,
        filePath: '/Users/example/Downloads/time-export.csv'
      });
    }
    return Promise.resolve({});
  }
};

// Mock window.ipc for Storybook
(global as any).window = {
  ...global.window,
  ipc: mockIpc
};

const meta: Meta<typeof ExportDialog> = {
  title: 'Components/ExportDialog',
  component: ExportDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    onClose: {
      action: 'onClose',
    },
    projects: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProjects = [
  'jira-time-tracker',
  'mobile-app',
  'web-dashboard',
  'api-service',
  'admin-panel'
];

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    projects: mockProjects,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    projects: mockProjects,
  },
};

export const WithFewProjects: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    projects: ['single-project', 'another-project'],
  },
};

export const NoProjects: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    projects: [],
  },
};

export const ManyProjects: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    projects: [
      'project-alpha',
      'project-beta',
      'project-gamma',
      'project-delta',
      'project-epsilon',
      'project-zeta',
      'project-eta',
      'project-theta',
      'project-iota',
      'project-kappa'
    ],
  },
};