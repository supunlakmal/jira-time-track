import type { Meta, StoryObj } from '@storybook/react';
import TimerGridItem from '../../renderer/components/TimerGridItem';
import { TaskTimer } from '../../renderer/types/dashboard';

const meta: Meta<typeof TimerGridItem> = {
  title: 'Components/TimerGridItem',
  component: TimerGridItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    timer: {
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

const baseTimer: TaskTimer = {
  ticketNumber: 'JIRA-001',
  ticketName: 'Implement login feature for new user module',
  startTime: Date.now() - 3600000, // 1 hour ago
  elapsedTime: 1800000, // 30 minutes current session
  isRunning: false,
  status: 'paused',
  totalElapsed: 5400000, // 1h 30m total
  sessions: [],
  storyPoints: 5,
};

export const Running: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: true,
      status: 'running',
      elapsedTime: 600000, // 10 minutes current session
      totalElapsed: baseTimer.totalElapsed + 600000,
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const Paused: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: false,
      status: 'paused',
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const Completed: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: false,
      status: 'completed',
      totalElapsed: 7200000,
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const OnHold: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: false,
      status: 'hold',
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const InQueue: Story = {
  args: {
    timer: {
      ...baseTimer,
      ticketNumber: 'NEW-TASK-001',
      ticketName: 'New task waiting to be started',
      status: 'queue',
      totalElapsed: 0,
      storyPoints: 2,
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};

export const NoStoryPoints: Story = {
  args: {
    timer: {
      ...baseTimer,
      storyPoints: undefined,
    },
    formatTime: mockFormatTime,
    getMinimalStatusColorClass: getMinimalStatusColorClass,
    getStatusText: getStatusText,
    setSelectedTicketNumber: (ticketNumber) => console.log('Selected ticket:', ticketNumber),
  },
};
