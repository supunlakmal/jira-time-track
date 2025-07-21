import type { Meta, StoryObj } from '@storybook/react';
import { ProjectListItem } from '../../renderer/components/projects/ProjectListItem';
import { ProjectStatus } from '../../renderer/constants/projectStatus';

const meta: Meta<typeof ProjectListItem> = {
  title: 'Projects/ProjectListItem',
  component: ProjectListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectListItem>;

export const Default: Story = {
  args: {
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
    onClick: () => console.log('Project item clicked'),
  },
};

export const CompletedProject: Story = {
  args: {
    project: {
      id: '2',
      name: 'Mobile App Development',
      description: 'Develop a new mobile application for iOS and Android.',
      status: ProjectStatus.Completed,
      progress: 100,
      deadline: '2025-05-15',
      tasks: 20,
      activities: 45,
      client: 'Tech Solutions',
      budget: 50000,
      startDate: '2024-11-01',
    },
    onClick: () => console.log('Completed project item clicked'),
  },
};

export const OnHoldProject: Story = {
  args: {
    project: {
      id: '3',
      name: 'Internal Tool Refactor',
      description: 'Refactor the legacy internal tool for performance.',
      status: ProjectStatus.OnHold,
      progress: 10,
      deadline: '2025-12-31',
      tasks: 5,
      activities: 8,
      client: 'Internal',
      budget: 10000,
      startDate: '2025-03-01',
    },
    onClick: () => console.log('On Hold project item clicked'),
  },
};
