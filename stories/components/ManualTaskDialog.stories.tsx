import type { Meta, StoryObj } from '@storybook/react';
import { ManualTaskDialog } from '../../renderer/components/ManualTaskDialog';
import { ProjectTicket } from '../../renderer/types/electron';

const meta: Meta<typeof ManualTaskDialog> = {
  title: 'Components/ManualTaskDialog',
  component: ManualTaskDialog,
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
    onSave: {
      action: 'onSave',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockExistingTickets = ['PROJ-001', 'PROJ-002', 'MANUAL-001'];

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: (task) => console.log('Saving task:', task),
    existingTickets: mockExistingTickets,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onSave: (task) => console.log('Saving task:', task),
    existingTickets: mockExistingTickets,
  },
};

const mockEditingTask: ProjectTicket = {
  ticket_number: 'MANUAL-001',
  ticket_name: 'Fix login validation bug',
  story_points: 3,
};

export const EditingMode: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: (task) => console.log('Updating task:', task),
    editingTask: mockEditingTask,
    existingTickets: mockExistingTickets,
  },
};

export const WithLongTicketName: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: (task) => console.log('Saving task:', task),
    editingTask: {
      ticket_number: 'MANUAL-002',
      ticket_name: 'Implement comprehensive user authentication system with multi-factor authentication and session management',
      story_points: 13,
    },
    existingTickets: mockExistingTickets,
  },
};

export const EmptyState: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSave: (task) => console.log('Saving task:', task),
    existingTickets: [],
  },
};