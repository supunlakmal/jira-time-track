import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ProjectView } from '../../renderer/components/projects/ProjectView';
import { ProjectStatus } from '../../renderer/constants/projectStatus';
import { fn } from '@storybook/test';

const mockProjects = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'This is the first project.',
    status: ProjectStatus.InProgress,
    progress: 75,
    deadline: '2025-12-31',
    tasks: 10,
    activities: 25,
    client: 'Client A',
    budget: 50000,
    startDate: '2025-01-01',
  },
  {
    id: '2',
    name: 'Project Beta',
    description: 'This is the second project.',
    status: ProjectStatus.Completed,
    progress: 100,
    deadline: '2025-10-31',
    tasks: 15,
    activities: 40,
    client: 'Client B',
    budget: 75000,
    startDate: '2025-02-01',
  },
  {
    id: '3',
    name: 'Project Gamma',
    description: 'This is the third project.',
    status: ProjectStatus.Planning,
    progress: 10,
    deadline: '2026-03-15',
    tasks: 5,
    activities: 10,
    client: 'Client C',
    budget: 30000,
    startDate: '2025-06-01',
  },
];

const meta: Meta<typeof ProjectView> = {
  title: 'components/projects/ProjectView',
  component: ProjectView,
  tags: ['autodocs'],
  argTypes: {
    projects: { control: 'object' },
    viewMode: { control: 'select', options: ['grid', 'list'] },
    onCreateProject: { action: 'onCreateProject' },
  },
  parameters: {
    nextjs: {
      router: {
        push: (path) => action('router.push')(path),
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectView>;

export const GridView: Story = {
  args: {
    projects: mockProjects,
    viewMode: 'grid',
  },
};

export const ListView: Story = {
  args: {
    projects: mockProjects,
    viewMode: 'list',
  },
};

export const EmptyView: Story = {
  args: {
    projects: [],
    viewMode: 'grid',
  },
};
