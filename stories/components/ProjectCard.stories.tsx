import type { Meta, StoryObj } from '@storybook/react';
import { ProjectCard } from '../../renderer/components/projects/ProjectCard';
import { ProjectStatus } from '../../renderer/constants/projectStatus';

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: {
      id: '1',
      name: 'Website Redesign',
      description: 'Redesign the company website for better UX and performance.',
      status: ProjectStatus.InProgress,
      progress: 75,
      deadline: '2025-08-31',
      tasks: 15,
      activities: 30,
      client: 'Global Innovations',
      budget: 25000,
      startDate: '2025-06-01',
    },
    onClick: () => console.log('Project card clicked'),
  },
};

export const CompletedProject: Story = {
  args: {
    project: {
      id: '2',
      name: 'Mobile App Launch',
      description: 'Successfully launched the new mobile application on app stores.',
      status: ProjectStatus.Completed,
      progress: 100,
      deadline: '2025-05-15',
      tasks: 20,
      activities: 45,
      client: 'Tech Solutions',
      budget: 50000,
      startDate: '2024-11-01',
    },
    onClick: () => console.log('Completed project card clicked'),
  },
};

export const PlanningProject: Story = {
  args: {
    project: {
      id: '3',
      name: 'New Feature Research',
      description: 'Conducting research and planning for the next major feature set.',
      status: ProjectStatus.Planning,
      progress: 20,
      deadline: '2025-10-31',
      tasks: 5,
      activities: 8,
      client: 'Internal',
      budget: 10000,
      startDate: '2025-07-01',
    },
    onClick: () => console.log('Planning project card clicked'),
  },
};

export const OnHoldProject: Story = {
  args: {
    project: {
      id: '4',
      name: 'Legacy System Migration',
      description: 'Migration of old system to new cloud infrastructure, currently on hold.',
      status: ProjectStatus.OnHold,
      progress: 10,
      deadline: '2026-01-31',
      tasks: 8,
      activities: 12,
      client: 'Enterprise Solutions',
      budget: 75000,
      startDate: '2025-02-01',
    },
    onClick: () => console.log('On Hold project card clicked'),
  },
};
