import type { Meta, StoryObj } from '@storybook/react';
import TimerDetail from '../../renderer/components/TimerDetail';
import { TaskTimer } from '../../renderer/types/dashboard';

const meta: Meta<typeof TimerDetail> = {
  title: 'Components/TimerDetail',
  component: TimerDetail,
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
    getStatusColor: {
      control: false,
    },
    getStatusIcon: {
      control: false,
    },
    getStatusText: {
      control: false,
    },
    handleDeleteTimer: { action: 'deleteTimer' },
    handleTimerAction: { action: 'timerAction' },
    setSelectedTicketNumber: { action: 'setSelectedTicketNumber' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockFormatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const getStatusColor = (status: TaskTimer["status"], isRunning: boolean) => {
  if (isRunning && status === "running") return "text-green-600";
  if (status === "queue") return "text-purple-600";
  if (status === "paused") return "text-yellow-600";
  if (status === "hold") return "text-orange-600";
  if (status === "completed") return "text-blue-600";
  if (status === "stopped") return "text-gray-600";
  return "text-gray-500";
};

const getStatusIcon = (status: TaskTimer["status"], isRunning: boolean) => {
  if (isRunning && status === "running") return "●";
  if (status === "queue") return "⊕";
  if (status === "paused") return "⏸";
  if (status === "hold") return "⏳";
  if (status === "completed") return "✓";
  if (status === "stopped") return "⏹";
  return "○";
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
  ticketNumber: 'JIRA-101',
  ticketName: 'Develop new feature for user management system',
  startTime: Date.now() - 3600000, // 1 hour ago
  elapsedTime: 1800000, // 30 minutes current session
  isRunning: false,
  status: 'paused',
  totalElapsed: 5400000, // 1h 30m total
  sessions: [
    { startTime: Date.now() - 3600000, endTime: Date.now() - 1800000, duration: 1800000, status: 'completed' },
    { startTime: Date.now() - 1800000, duration: 1800000, status: 'paused' },
  ],
  storyPoints: 8,
};

export const Running: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: true,
      status: 'running',
      elapsedTime: 600000, // 10 minutes current session
      totalElapsed: baseTimer.totalElapsed + 600000,
      sessions: [
        ...baseTimer.sessions.slice(0, -1),
        { startTime: Date.now() - 600000, duration: 600000, status: 'running' },
      ],
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
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
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
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
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};

export const Completed: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: false,
      status: 'completed',
      sessions: [
        { startTime: Date.now() - 3600000, endTime: Date.now(), duration: 3600000, status: 'completed' },
      ],
      totalElapsed: 3600000,
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};

export const Stopped: Story = {
  args: {
    timer: {
      ...baseTimer,
      isRunning: false,
      status: 'stopped',
      sessions: [
        { startTime: Date.now() - 3600000, endTime: Date.now(), duration: 3600000, status: 'stopped' },
      ],
      totalElapsed: 3600000,
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};

export const InQueue: Story = {
  args: {
    timer: {
      ticketNumber: 'NEW-TASK-001',
      ticketName: 'New task waiting to be started',
      startTime: Date.now(),
      elapsedTime: 0,
      isRunning: false,
      status: 'queue',
      totalElapsed: 0,
      sessions: [
        { startTime: Date.now(), duration: 0, status: 'queue' },
      ],
      storyPoints: 2,
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};

export const NoStoryPoints: Story = {
  args: {
    timer: {
      ...baseTimer,
      storyPoints: undefined,
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};

export const OverBudget: Story = {
  args: {
    timer: {
      ...baseTimer,
      totalElapsed: 10 * 60 * 60 * 1000, // 10 hours
      storyPoints: 8, // 8 hours estimated
    },
    formatTime: mockFormatTime,
    getStatusColor: getStatusColor,
    getStatusIcon: getStatusIcon,
    getStatusText: getStatusText,
    handleDeleteTimer: (ticketNumber) => console.log('Delete:', ticketNumber),
    handleTimerAction: (action, ticketNumber) => console.log('Action:', action, ticketNumber),
    setSelectedTicketNumber: (ticketNumber) => console.log('Set selected:', ticketNumber),
  },
};
