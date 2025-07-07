import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { setupMockWindow } from '../mocks/mockHooks';
import { mockTimers } from '../mocks/mockData';

// Setup window mocks
setupMockWindow();

interface TimerData {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped" | "queue";
  totalElapsed: number;
  storyPoints?: number;
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string;
  }>;
}

// Create a simplified version of FloatScreen for Storybook
const MockFloatScreen: React.FC<{ timers: TimerData[] }> = ({ timers: initialTimers }) => {
  const [timers, setTimers] = useState<TimerData[]>(initialTimers);
  const [selectedTicketNumber, setSelectedTicketNumber] = useState<string | null>(null);

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

  const handleTimerAction = (action: string, ticketNumber: string) => {
    setTimers(prevTimers => 
      prevTimers.map(timer => {
        if (timer.ticketNumber === ticketNumber) {
          switch (action) {
            case 'start':
              return { ...timer, isRunning: true, status: 'running' as const, startTime: Date.now() };
            case 'pause':
              return { ...timer, isRunning: false, status: 'paused' as const };
            case 'resume':
              return { ...timer, isRunning: true, status: 'running' as const, startTime: Date.now() };
            case 'stop':
              return { ...timer, isRunning: false, status: 'stopped' as const };
            case 'complete':
              return { ...timer, isRunning: false, status: 'completed' as const };
            default:
              return timer;
          }
        }
        return timer;
      })
    );
  };

  const runningTimer = timers.find(t => t.isRunning && t.status === 'running');
  const pausedTimer = timers.find(t => t.status === 'paused');
  const queuedTimers = timers.filter(t => t.status === 'queue');

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-blue-500 dark:bg-blue-600 text-white p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold">Time Tracker</h2>
          <div className="flex space-x-1">
            <button className="text-white hover:text-gray-200 text-xs">
              _
            </button>
            <button className="text-white hover:text-gray-200 text-xs">
              ×
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Active Timer Display */}
        {runningTimer ? (
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
              {formatTime(runningTimer.elapsedTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate" title={runningTimer.ticketName}>
              {runningTimer.ticketNumber}: {runningTimer.ticketName}
            </div>
            {runningTimer.storyPoints && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {runningTimer.storyPoints} points
              </div>
            )}
            <div className="flex justify-center space-x-2 mt-3">
              <button
                onClick={() => handleTimerAction('pause', runningTimer.ticketNumber)}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Pause
              </button>
              <button
                onClick={() => handleTimerAction('complete', runningTimer.ticketNumber)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Complete
              </button>
              <button
                onClick={() => handleTimerAction('stop', runningTimer.ticketNumber)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Stop
              </button>
            </div>
          </div>
        ) : pausedTimer ? (
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-yellow-600 dark:text-yellow-400">
              {formatTime(pausedTimer.totalElapsed)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate" title={pausedTimer.ticketName}>
              {pausedTimer.ticketNumber}: {pausedTimer.ticketName}
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">
              PAUSED
            </div>
            <div className="flex justify-center space-x-2 mt-3">
              <button
                onClick={() => handleTimerAction('resume', pausedTimer.ticketNumber)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Resume
              </button>
              <button
                onClick={() => handleTimerAction('complete', pausedTimer.ticketNumber)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Complete
              </button>
              <button
                onClick={() => handleTimerAction('stop', pausedTimer.ticketNumber)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Stop
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-gray-400 dark:text-gray-500">
              00:00:00
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No active timer
            </div>
          </div>
        )}

        {/* Timer Queue */}
        {queuedTimers.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Queue ({queuedTimers.length})
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {queuedTimers.map((timer) => (
                <div
                  key={timer.ticketNumber}
                  className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {timer.ticketNumber}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate" title={timer.ticketName}>
                        {timer.ticketName}
                      </div>
                      {timer.storyPoints && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {timer.storyPoints} pts
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleTimerAction('start', timer.ticketNumber)}
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 flex-shrink-0"
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Timer */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
            + Add Task to Queue
          </button>
        </div>

        {/* Stats */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {timers.length} task{timers.length !== 1 ? 's' : ''} • 
          Total: {formatTime(timers.reduce((sum, timer) => sum + timer.totalElapsed, 0))}
        </div>
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