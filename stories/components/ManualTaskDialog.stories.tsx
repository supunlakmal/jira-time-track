import type { Meta, StoryObj } from '@storybook/react';
import { ManualTaskDialog } from '../../renderer/components/ManualTaskDialog';

const meta: Meta<typeof ManualTaskDialog> = {
  title: 'Components/ManualTaskDialog',
  component: ManualTaskDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
    onSave: { action: 'saved' },
    editingTask: {
      control: 'object',
    },
    existingTickets: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AddNewTask: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSave: (task) => console.log('Save new task:', task),
    editingTask: null,
    existingTickets: ['PROJECT-001', 'PROJECT-002'],
  },
};

export const EditExistingTask: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSave: (task) => console.log('Save updated task:', task),
    editingTask: {
      ticket_number: 'MANUAL-001',
      ticket_name: 'Existing Manual Task',
      story_points: 5,
    },
    existingTickets: ['PROJECT-001', 'PROJECT-002', 'MANUAL-001'],
  },
};

export const WithValidationErrors: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onSave: (task) => console.log('Save task (should not happen):', task),
    editingTask: null,
    existingTickets: ['PROJECT-001', 'PROJECT-002'],
  },
  
};


