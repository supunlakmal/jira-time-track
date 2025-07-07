import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import HomePage from '../../renderer/pages/home';
import { createMockUseSharedData, createMockIpc } from '../mocks/mockHooks';
import { mockProjectTickets, mockSessions } from '../mocks/mockData';

// Create a wrapper component to provide mocked hooks and ipc
const MockedHomePage: React.FC<{
  loading?: boolean;
  projectData?: any[];
  sessions?: any;
}> = ({ loading, projectData, sessions }) => {
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

  // Render the actual HomePage component
  return <HomePage />;
};

const meta: Meta<typeof MockedHomePage> = {
  title: 'Pages/HomePage',
  component: MockedHomePage,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets,
    sessions: mockSessions,
  },
};

export const LoadingState: Story = {
  args: {
    loading: true,
    projectData: [],
    sessions: {},
  },
};

export const EmptyState: Story = {
  args: {
    loading: false,
    projectData: [],
    sessions: {},
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
  },
};

export const LargeDataset: Story = {
  args: {
    loading: false,
    projectData: [
      ...mockProjectTickets,
      ...Array.from({ length: 20 }, (_, i) => ({
        ticket_number: `BULK-${String(i + 1).padStart(3, '0')}`,
        ticket_name: `Generated ticket ${i + 1} for testing large datasets`,
        story_points: Math.floor(Math.random() * 13) + 1,
        isManual: i % 5 === 0,
      })),
    ],
    sessions: mockSessions,
  },
};

export const SingleProject: Story = {
  args: {
    loading: false,
    projectData: mockProjectTickets.filter(ticket => ticket.ticket_number.startsWith('PROJ-')),
    sessions: {
      'PROJ-001': mockSessions['PROJ-001'],
      'PROJ-002': mockSessions['PROJ-002'],
    },
  },
};

export const OnlyManualTasks: Story = {
  args: {
    loading: false,
    projectData: [
      {
        ticket_number: 'MANUAL-001',
        ticket_name: 'Manual task for code review',
        story_points: 2,
        isManual: true,
        createdAt: '2024-01-15',
      },
      {
        ticket_number: 'MANUAL-002',
        ticket_name: 'Manual task for documentation',
        story_points: 3,
        isManual: true,
        createdAt: '2024-01-16',
      },
      {
        ticket_number: 'MANUAL-003',
        ticket_name: 'Manual task for testing',
        story_points: 5,
        isManual: true,
        createdAt: '2024-01-17',
      },
    ],
    sessions: {},
  },
};

export const HighStoryPoints: Story = {
  args: {
    loading: false,
    projectData: [
      {
        ticket_number: 'EPIC-001',
        ticket_name: 'Complete system architecture overhaul',
        story_points: 89,
        isManual: false,
      },
      {
        ticket_number: 'EPIC-002',
        ticket_name: 'Implement real-time collaboration features',
        story_points: 55,
        isManual: false,
      },
      {
        ticket_number: 'EPIC-003',
        ticket_name: 'Migration to microservices architecture',
        story_points: 144,
        isManual: false,
      },
    ],
    sessions: {},
  },
};
