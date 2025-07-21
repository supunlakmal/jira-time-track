import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CreateTicketModal from '../../renderer/components/tickets/CreateTicketModal';
import { Provider } from 'react-redux';
import { store } from '../../renderer/store/store';

const meta: Meta<typeof CreateTicketModal> = {
  title: 'components/tickets/CreateTicketModal',
  component: CreateTicketModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    projectName: { control: 'text' },
    projectId: { control: 'text' },
    onSuccess: { action: 'onSuccess' },
  },
  decorators: [
    (Story) => {
      // Mock window.ipc for Storybook
      if (typeof window !== 'undefined') {
        window.ipc = {
          invoke: async (channel, data) => {
            if (channel === 'add-manual-task') {
              console.log('add-manual-task invoked with:', data);
              return { success: true };
            }
            return { success: true };
          },
        } as any;
      }
      return (
        <Provider store={store}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CreateTicketModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    projectName: 'TEST',
  },
};

export const WithProjectId: Story = {
  args: {
    isOpen: true,
    projectName: 'ANOTHER',
    projectId: '12345',
  },
};
