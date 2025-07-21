import type { Meta, StoryObj } from '@storybook/react';
import { NewProjectModal } from '../../renderer/components/projects/NewProjectModal';

const meta: Meta<typeof NewProjectModal> = {
  title: 'Projects/NewProjectModal',
  component: NewProjectModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    onSuccess: { action: 'success' },
  },
};

export default meta;
type Story = StoryObj<typeof NewProjectModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onSuccess: (project) => console.log('Project created:', project),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Modal closed'),
    onSuccess: (project) => console.log('Project created:', project),
  },
};
