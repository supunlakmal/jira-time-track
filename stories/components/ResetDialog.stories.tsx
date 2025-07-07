import type { Meta, StoryObj } from '@storybook/react';
import { ResetDialog } from '../../renderer/components/ResetDialog';

const meta: Meta<typeof ResetDialog> = {
  title: 'Components/ResetDialog',
  component: ResetDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
  },
  render: (args) => {
    // Mock window.ipc for Storybook environment
    if (typeof window !== 'undefined') {
      window.ipc = {
        ...window.ipc, // Keep existing ipc mocks if any
        invoke: async (channel, ...invokeArgs) => {
          console.log(`IPC Invoke: ${channel}`, invokeArgs);
          if (channel === 'get-reset-preview') {
            return {
              totalSessions: 10,
              totalProjectData: 5,
              totalManualTasks: 3,
              totalProjectPaths: 2,
            };
          } else if (channel === 'reset-data') {
            console.log('Resetting data with options:', invokeArgs[0]);
            return { success: true };
          }
          return Promise.resolve({});
        },
      };
    }
    return <ResetDialog {...args} />;
  },
};
