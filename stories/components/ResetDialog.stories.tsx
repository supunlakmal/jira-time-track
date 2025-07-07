import type { Meta, StoryObj } from '@storybook/react';
import { ResetDialog } from '../../renderer/components/ResetDialog';

// Mock the window.ipc for Storybook
const mockIpc = {
  invoke: (channel: string, ...args: any[]) => {
    if (channel === 'get-reset-preview') {
      return Promise.resolve({
        totalSessions: 25,
        totalProjectData: 8,
        totalManualTasks: 3,
        totalProjectPaths: 2
      });
    }
    if (channel === 'reset-application-data') {
      return Promise.resolve({
        success: true,
        message: 'Application data reset successfully'
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

const meta: Meta<typeof ResetDialog> = {
  title: 'Components/ResetDialog',
  component: ResetDialog,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};