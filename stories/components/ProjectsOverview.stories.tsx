import type { Meta, StoryObj } from '@storybook/react';
import ProjectsOverview from '../../renderer/components/dashboard/ProjectsOverview';

const meta: Meta<typeof ProjectsOverview> = {
  title: 'Components/ProjectsOverview',
  component: ProjectsOverview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    projectSummaryData: {
      control: 'object',
    },
    selectedProject: {
      control: 'text',
    },
    handleProjectSelect: { action: 'projectSelected' },
    handleChooseProjectPath: { action: 'chooseProjectPath' },
    refreshBranch: { action: 'refreshBranch' },
    formatTime: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockProjectSummaryData = [
  {
    name: 'ProjectA',
    ticketCount: 50,
    location: '/path/to/projectA',
    currentBranch: 'main',
    totalStoryPoints: 100,
    averageStoryPoints: 2,
    completedTickets: 30,
    inProgressTickets: 10,
    totalTimeSpent: 36000000, // 10 hours
  },
  {
    name: 'ProjectB',
    ticketCount: 30,
    location: undefined,
    currentBranch: 'Unknown',
    totalStoryPoints: 60,
    averageStoryPoints: 2,
    completedTickets: 20,
    inProgressTickets: 5,
    totalTimeSpent: 18000000, // 5 hours
  },
  {
    name: 'ProjectC',
    ticketCount: 20,
    location: '/path/to/projectC',
    currentBranch: 'feature/xyz',
    totalStoryPoints: 40,
    averageStoryPoints: 2,
    completedTickets: 10,
    inProgressTickets: 8,
    totalTimeSpent: 10800000, // 3 hours
  },
];

const formatTime = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export const Default: Story = {
  args: {
    projectSummaryData: mockProjectSummaryData,
    selectedProject: null,
    handleProjectSelect: (name) => console.log('Selected project:', name),
    handleChooseProjectPath: (name) => console.log('Choose path for:', name),
    refreshBranch: (name, path) => console.log('Refresh branch for:', name, path),
    formatTime: formatTime,
  },
};

export const SelectedProject: Story = {
  args: {
    ...Default.args,
    selectedProject: 'ProjectA',
  },
};

export const NoProjects: Story = {
  args: {
    ...Default.args,
    projectSummaryData: [],
  },
};
