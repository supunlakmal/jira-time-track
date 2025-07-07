import type { Meta, StoryObj } from '@storybook/react';
import TimerGrid from '../../renderer/components/timers/TimerGrid';
import { TaskTimer } from '../../renderer/types/dashboard';

const meta: Meta<typeof TimerGrid> = {
  title: 'Components/TimerGrid',
  component: TimerGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    timers: {
      control: 'object',
    },
    formatTime: {
      control: false,
    },
    getMinimalStatusColorClass: {
      control: false,
    },
    getStatusText: {
      control: false,
    },
    setSelectedTicketNumber: { action: 'setSelectedTicketNumber' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockFormatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${totalSeconds}s`;
};

const getMinimalStatusColorClass = (status: TaskTimer["status"], isRunning: boolean) => {
  if (isRunning && status === "running") return "bg-green-500";
  if (status === "queue") return "bg-purple-500";
  if (status === "paused") return "bg-yellow-500";
  if (status === "hold") return "bg-orange-500";
  if (status === "completed") return "bg-blue-500";
  if (status === "stopped") return "bg-gray-400";
  return "bg-gray-300";
};

const getStatusText = (status: TaskTimer["status"], isRunning: boolean) => {
  if (isRunning && status === "running") return "Running";
  if (status === "queue") return "In Queue";
  if (status === "paused") return "Paused";
  if (status === "hold") return "On Hold";
  if (status === "completed") return "Completed";
  if (status === "stopped") return "Stopped";
  return "Unknown";
};

const mockTimers: TaskTimer[] = [
  {
    ticketNumber: 'JIRA-001',
    ticketName: 'Implement login feature',
    startTime: Date.now() - 3600000,
    elapsedTime: 1800000,
    isRunning: true,
    status: 'running',
    totalElapsed: 5400000,
    sessions: [],
    storyPoints: 5,
  },
  {
    ticketNumber: 'JIRA-002',
    ticketName: 'Fix styling bug on dashboard',
    startTime: Date.now() - 7200000,
    elapsedTime: 0,
    isRunning: false,
    status: 'paused',
    totalElapsed: 10800000,
    sessions: [],
    storyPoints: 3,
  },
  {
    ticketNumber: 'JIRA-003',
    ticketName: 'Write unit tests for API endpoints',
    startTime: Date.now() - 1800000,
    elapsedTime: 0,
    isRunning: false,
    status: 'completed',
    totalElapsed: 7200000,
    sessions: [],
    storyPoints: 8,
  },
  {
    ticketNumber: 'JIRA-004',
    ticketName: 'Research new database solution',
    startTime: Date.now() - 900000,
    elapsedTime: 0,
    isRunning: false,
    status: 'hold',
    totalElapsed: 1800000,
    sessions: [],
    storyPoints: 2,
  },
  {
    ticketNumber: 'JIRA-005',
    ticketName: 'Prepare presentation for client',
    startTime: Date.now() - 120000,
    elapsedTime: 0,
    isRunning: false,
    status: 'queue',
    totalElapsed: 0,
    sessions: [],
    storyPoints: 1,
  },
];

export const Default: Story = {
  args: {
    timers: mockTimers,
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const EmptyGrid: Story = {
  args: {
    timers: [],
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};
