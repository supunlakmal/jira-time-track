import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import Dashboard from '../../renderer/pages/dashbord';
import { createMockUseSharedData, createMockIpc } from '../mocks/mockHooks';
import { mockProjectTickets, mockSessions } from '../mocks/mockData';

// Create a wrapper component to provide mocked hooks and ipc
const MockedDashboardPage: React.FC<{
  loading?: boolean;
  projectData?: any[];
  sessions?: any;
  children?: React.ReactNode;
}> = ({ loading, projectData, sessions, children }) => {
  // Mock useSharedData hook
  const useSharedData = createMockUseSharedData({
    loading,
    projectData,
    sessions,
  });

  // Mock window.ipc
  useEffect(() => {
    const originalIpc = (window as any).ipc;
    (window as any).ipc = createMockIpc();

    return () => {
      (window as any).ipc = originalIpc;
    };
  }, []);

  // Render the actual Dashboard component
  return <Dashboard>{children}</Dashboard>;
};

const meta: Meta<typeof MockedDashboardPage> = {
  title: 'Pages/DashboardPage',
  component: MockedDashboardPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Simulate loading state',
    },
    projectData: {
      control: { type: 'object' },
      description: 'Mock project data',
    },
    sessions: {
      control: { type: 'object' },
      description: 'Mock session data',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to display in the dashboard main area',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets,
    sessions: mockSessions,
    children: (
      <div className="space-y-6">
        <div className="bg-white dark:bg-darkblack-600 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
            Welcome to your Dashboard
          </h2>
          <p className="text-bgray-600 dark:text-bgray-300">
            This is the main dashboard content area. Your project data and timers will be displayed here.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-bgray-900 dark:text-white">Active Projects</h3>
            <p className="text-2xl font-bold text-success-300 mt-2">{mockProjectTickets.length}</p>
          </div>
          <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-bgray-900 dark:text-white">Active Sessions</h3>
            <p className="text-2xl font-bold text-warning-300 mt-2">{Object.keys(mockSessions).length}</p>
          </div>
          <div className="bg-white dark:bg-darkblack-600 rounded-lg p-4 shadow-sm">
            <h3 className="font-medium text-bgray-900 dark:text-white">Story Points</h3>
            <p className="text-2xl font-bold text-bgray-900 dark:text-white mt-2">
              {mockProjectTickets.reduce((sum, ticket) => sum + (ticket.story_points || 0), 0)}
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    projectData: [],
    sessions: {},
    children: (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-success-300 mx-auto mb-4"></div>
          <p className="text-bgray-600 dark:text-bgray-300">Loading dashboard data...</p>
        </div>
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    loading: false,
    projectData: [],
    sessions: {},
    children: (
      <div className="text-center py-12">
        <div className="bg-white dark:bg-darkblack-600 rounded-lg p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
            No Projects Found
          </h2>
          <p className="text-bgray-600 dark:text-bgray-300 mb-6">
            Get started by importing your first project or creating a manual task.
          </p>
          <div className="space-x-4">
            <button className="bg-success-300 text-white px-4 py-2 rounded-lg hover:bg-success-400">
              Import CSV
            </button>
            <button className="bg-bgray-100 dark:bg-darkblack-500 text-bgray-900 dark:text-white px-4 py-2 rounded-lg hover:bg-bgray-200 dark:hover:bg-darkblack-400">
              Add Manual Task
            </button>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithActiveSessions: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets,
    sessions: {
      ...mockSessions,
      'PROJ-004': [
        {
          id: '5',
          ticketNumber: 'PROJ-004',
          startTime: Date.now() - 300000, // 5 minutes ago
          duration: 300000,
          status: 'running',
        },
      ],
      'API-102': [
        {
          id: '6',
          ticketNumber: 'API-102',
          startTime: Date.now() - 1200000, // 20 minutes ago
          duration: 1200000,
          status: 'paused',
        },
      ],
    },
    children: (
      <div className="space-y-6">
        <div className="bg-white dark:bg-darkblack-600 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
            Active Timers
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
              <div>
                <span className="font-medium text-success-700 dark:text-success-300">PROJ-004</span>
                <span className="ml-2 text-sm text-success-600 dark:text-success-400">Running</span>
              </div>
              <span className="text-sm font-mono text-success-700 dark:text-success-300">05:00</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
              <div>
                <span className="font-medium text-warning-700 dark:text-warning-300">API-102</span>
                <span className="ml-2 text-sm text-warning-600 dark:text-warning-400">Paused</span>
              </div>
              <span className="text-sm font-mono text-warning-700 dark:text-warning-300">20:00</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

export const LargeDataset: Story = {
  args: {
    loading: false,
    projectData: [
      ...mockProjectTickets,
      ...Array.from({ length: 25 }, (_, i) => ({
        ticket_number: `BULK-${String(i + 1).padStart(3, '0')}`,
        ticket_name: `Generated ticket ${i + 1} for testing large datasets and performance`,
        story_points: Math.floor(Math.random() * 13) + 1,
        isManual: i % 7 === 0,
      })),
    ],
    sessions: mockSessions,
    children: (
      <div className="space-y-6">
        <div className="bg-white dark:bg-darkblack-600 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
            Large Dataset View
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-success-400 to-success-500 rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Total Projects</h3>
              <p className="text-2xl font-bold mt-1">30+</p>
            </div>
            <div className="bg-gradient-to-r from-bgray-900 to-darkblack-600 rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Story Points</h3>
              <p className="text-2xl font-bold mt-1">200+</p>
            </div>
            <div className="bg-gradient-to-r from-warning-400 to-warning-500 rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Manual Tasks</h3>
              <p className="text-2xl font-bold mt-1">4</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <h3 className="text-sm font-medium opacity-90">Active Sessions</h3>
              <p className="text-2xl font-bold mt-1">{Object.keys(mockSessions).length}</p>
            </div>
          </div>
          <p className="text-bgray-600 dark:text-bgray-300 mt-4">
            Testing dashboard performance with a large number of projects and data points.
          </p>
        </div>
      </div>
    ),
  },
};

export const SidebarFocused: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets.slice(0, 3),
    sessions: {},
    children: (
      <div className="bg-white dark:bg-darkblack-600 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-bgray-900 dark:text-white mb-4">
          Sidebar Navigation Demo
        </h2>
        <p className="text-bgray-600 dark:text-bgray-300 mb-4">
          This story focuses on testing the sidebar navigation and its various menu items:
        </p>
        <ul className="space-y-2 text-bgray-700 dark:text-bgray-300">
          <li>• Toggle Floating Timer</li>
          <li>• Add Manual Task</li>
          <li>• Billing Management</li>
          <li>• Jira Settings</li>
          <li>• Import/Export Data</li>
          <li>• Reset Data</li>
        </ul>
        <p className="text-sm text-bgray-500 dark:text-bgray-400 mt-4">
          Click on any sidebar item to test navigation behavior.
        </p>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets,
    sessions: mockSessions,
    children: (
      <div className="text-center py-8">
        <h2 className="text-lg font-medium text-bgray-900 dark:text-white">
          Minimal Dashboard Content
        </h2>
        <p className="text-bgray-600 dark:text-bgray-300 mt-2">
          Testing dashboard layout with minimal content.
        </p>
      </div>
    ),
  },
};