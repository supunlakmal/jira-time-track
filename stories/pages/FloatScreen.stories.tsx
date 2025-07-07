import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';

import { mockTimers } from '../mocks/mockData';
import { createMockIpc } from '../mocks/mockHooks';
import FloatingWindowHeader from '../../renderer/components/layout/FloatingWindowHeader';
import TimerGrid from '../../renderer/components/timers/TimerGrid';
import { TaskTimer } from '../../renderer/types/dashboard';



const MockFloatScreen: React.FC<{ timers: TaskTimer[] }> = ({ timers: initialTimers }) => {
  const [timers, setTimers] = useState<TaskTimer[]>(initialTimers);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (timer.isRunning && timer.status === 'running') {
            return {
              ...timer,
              elapsedTime: timer.elapsedTime + 1000,
              totalElapsed: timer.totalElapsed + 1000,
            };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getMinimalStatusColorClass = (status: TaskTimer['status'], isRunning: boolean) => {
    if (isRunning) return 'bg-green-500';
    switch (status) {
      case 'paused':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'stopped':
        return 'bg-red-500';
      case 'queue':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: TaskTimer['status'], isRunning: boolean) => {
    if (isRunning) return 'Running';
    switch (status) {
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      case 'stopped':
        return 'Stopped';
      case 'queue':
        return 'Queued';
      default:
        return 'Unknown';
    }
  };

  const handleClose = () => {
    console.log('Close button clicked');
    // In a real app, this would close the window
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
      <FloatingWindowHeader
        selectedTicketNumber={selectedTicketNumber}
        timersLength={timers.length}
        setIsDragging={setIsDragging}
        handleClose={handleClose}
        ipc={createMockIpc()} // Pass mock ipc
      />

      <div className="p-4 space-y-4">
        <TimerGrid
          timers={timers}
          formatTime={formatTime}
          getMinimalStatusColorClass={getMinimalStatusColorClass}
          getStatusText={getStatusText}
          setSelectedTicketNumber={setSelectedTicketNumber}
        />
      </div>
    </div>
  );
};

const meta: Meta<typeof MockFloatScreen> = {
  title: 'Pages/FloatScreen',
  component: MockFloatScreen,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    timers: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timers: mockTimers,
  },
};

export const NoTimers: Story = {
  args: {
    timers: [],
  },
};

export const OnlyRunningTimer: Story = {
  args: {
    timers: [
      {
        ticketNumber: 'PROJ-001',
        ticketName: 'Implement user authentication system',
        startTime: Date.now() - 900000, // 15 minutes ago
        elapsedTime: 900000,
        isRunning: true,
        status: 'running',
        totalElapsed: 900000,
        storyPoints: 8,
        sessions: [],
      },
    ],
  },
};

export const OnlyPausedTimer: Story = {
  args: {
    timers: [
      {
        ticketNumber: 'API-101',
        ticketName: 'Design REST API for mobile integration',
        startTime: Date.now() - 600000,
        elapsedTime: 600000,
        isRunning: false,
        status: 'paused',
        totalElapsed: 600000,
        storyPoints: 21,
        sessions: [],
      },
    ],
  },
};

export const QueueOnly: Story = {
  args: {
    timers: [
      {
        ticketNumber: 'PROJ-003',
        ticketName: 'Fix memory leak in timer component',
        startTime: 0,
        elapsedTime: 0,
        isRunning: false,
        status: 'queue',
        totalElapsed: 0,
        storyPoints: 5,
        sessions: [],
      },
      {
        ticketNumber: 'DOCS-001',
        ticketName: 'Update API documentation',
        startTime: 0,
        elapsedTime: 0,
        isRunning: false,
        status: 'queue',
        totalElapsed: 0,
        storyPoints: 3,
        sessions: [],
      },
      {
        ticketNumber: 'TEST-001',
        ticketName: 'Write integration tests for payment flow',
        startTime: 0,
        elapsedTime: 0,
        isRunning: false,
        status: 'queue',
        totalElapsed: 0,
        storyPoints: 8,
        sessions: [],
      },
    ],
  },
};

export const LongTaskNames: Story = {
  args: {
    timers: [
      {
        ticketNumber: 'PROJ-999',
        ticketName: 'Implement comprehensive user authentication system with multi-factor authentication, role-based access control, and session management',
        startTime: Date.now() - 1200000, // 20 minutes ago
        elapsedTime: 1200000,
        isRunning: true,
        status: 'running',
        totalElapsed: 1200000,
        storyPoints: 34,
        sessions: [],
      },
    ],
  },
};

export const HighStoryPoints: Story = {
  args: {
    timers: [
      {
        ticketNumber: 'EPIC-001',
        ticketName: 'Complete system architecture overhaul',
        startTime: Date.now() - 7200000, // 2 hours ago
        elapsedTime: 7200000,
        isRunning: false,
        status: 'paused',
        totalElapsed: 7200000,
        storyPoints: 89,
        sessions: [],
      },
    ],
  },
};
