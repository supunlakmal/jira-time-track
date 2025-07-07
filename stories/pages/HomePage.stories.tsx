import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { setupMockWindow } from '../mocks/mockHooks';
import { mockProjectTickets, mockSessions } from '../mocks/mockData';

// Setup window mocks
setupMockWindow();

// Create a simplified version of HomePage for Storybook
const MockHomePage: React.FC<{ mockData: any }> = ({ mockData }) => {
  const { projectData = [], sessions = {}, loading = false } = mockData;

  // Calculate dashboard stats
  const dashboardStats = {
    totalTickets: projectData.length,
    totalStoryPoints: projectData.reduce((sum: number, ticket: any) => sum + (ticket.story_points || 0), 0),
    averageStoryPoints: projectData.length > 0 
      ? projectData.reduce((sum: number, ticket: any) => sum + (ticket.story_points || 0), 0) / projectData.length 
      : 0,
    totalProjects: new Set(projectData.map((ticket: any) => ticket.ticket_number.split('-')[0])).size,
    completedTickets: Object.keys(sessions).length,
    inProgressTickets: Object.values(sessions).filter((sessionArray: any) => 
      sessionArray.some((session: any) => session.status === 'running')
    ).length,
    totalTimeTracked: Object.values(sessions).reduce((total: number, sessionArray: any) => {
      return total + sessionArray.reduce((sessionTotal: number, session: any) => sessionTotal + session.duration, 0);
    }, 0),
  };

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Time Tracker</h1>
            <p className="text-gray-600 dark:text-gray-400">Track time across your Jira tickets and projects</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Import CSV
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Add Manual Task
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalTickets}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Story Points</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalStoryPoints.toFixed(1)}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Avg: {dashboardStats.averageStoryPoints.toFixed(1)} pts/ticket
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Tracked</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatTime(dashboardStats.totalTimeTracked as number)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalProjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Tickets</h2>
          </div>
          
          {projectData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tickets found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Import a CSV file or add manual tasks to get started</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Import CSV
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Story Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {projectData.map((ticket: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {ticket.ticket_number}
                        {ticket.isManual && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                            Manual
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        <div className="max-w-xs truncate" title={ticket.ticket_name}>
                          {ticket.ticket_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {ticket.story_points || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sessions[ticket.ticket_number] ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200">
                            Has Sessions
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            No Sessions
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          Start Timer
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockHomePage> = {
  title: 'Pages/HomePage',
  component: MockHomePage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mockData: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mockData: {
      loading: false,
      projectData: mockProjectTickets,
      sessions: mockSessions,
    },
  },
};

export const LoadingState: Story = {
  args: {
    mockData: {
      loading: true,
      projectData: [],
      sessions: {},
    },
  },
};

export const EmptyState: Story = {
  args: {
    mockData: {
      loading: false,
      projectData: [],
      sessions: {},
    },
  },
};

export const WithActiveSessions: Story = {
  args: {
    mockData: {
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
  },
};

export const LargeDataset: Story = {
  args: {
    mockData: {
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
  },
};

export const SingleProject: Story = {
  args: {
    mockData: {
      loading: false,
      projectData: mockProjectTickets.filter(ticket => ticket.ticket_number.startsWith('PROJ-')),
      sessions: {
        'PROJ-001': mockSessions['PROJ-001'],
        'PROJ-002': mockSessions['PROJ-002'],
      },
    },
  },
};

export const OnlyManualTasks: Story = {
  args: {
    mockData: {
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
  },
};

export const HighStoryPoints: Story = {
  args: {
    mockData: {
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
  },
};