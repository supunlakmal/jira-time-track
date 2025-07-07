import type { Meta, StoryObj } from '@storybook/react';
import Overview from '../../renderer/components/Overview';

const meta: Meta<typeof Overview> = {
  title: 'Components/Overview',
  component: Overview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dashboardStats: {
      control: 'object',
    },
    projectSummaryData: {
      control: 'object',
    },
    formatTime: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockDashboardStats = {
  totalTickets: 150,
  totalStoryPoints: 300.5,
  averageStoryPoints: 2.0,
  totalProjects: 5,
  completedTickets: 100,
  inProgressTickets: 30,
  totalTimeTracked: 72000000, // 20 hours
  productivity: {
    ticketsPerDay: 5,
    pointsPerDay: 10,
    averageTimePerTicket: 480000, // 8 minutes
    averageTimePerPoint: 240000, // 4 minutes
  },
};

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
];

const formatTime = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

export const Default: Story = {
  args: {
    dashboardStats: mockDashboardStats,
    projectSummaryData: mockProjectSummaryData,
    formatTime: formatTime,
  },
};
