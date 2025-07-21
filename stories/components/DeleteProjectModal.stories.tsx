import type { Meta, StoryObj } from '@storybook/react';
import { DeleteProjectModal } from '../../renderer/components/projects/DeleteProjectModal';
import { ProjectStatus } from '../../renderer/constants/projectStatus';

const meta: Meta<typeof DeleteProjectModal> = {
  title: 'Projects/DeleteProjectModal',
  component: DeleteProjectModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'closed' },
    onDeleteSuccess: { action: 'deleted' },
    project: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteProjectModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    onDeleteSuccess: () => console.log('Project deleted'),
    project: {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website for better UX.',
      status: ProjectStatus.InProgress,
      progress: 75,
      deadline: '2025-08-31',
      tasks: 15,
      activities: 30,
      client: 'Global Innovations',
      budget: 25000,
      startDate: '2025-06-01',
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => console.log('Modal closed'),
    onDeleteSuccess: () => console.log('Project deleted'),
    project: {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website for better UX.',
      status: ProjectStatus.InProgress,
      progress: 75,
      deadline: '2025-08-31',
      tasks: 15,
      activities: 30,
      client: 'Global Innovations',
      budget: 25000,
      startDate: '2025-06-01',
    },
  },
};
