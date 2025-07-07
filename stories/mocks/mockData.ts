// Mock data for Storybook stories
import { ProjectTicket } from '../../renderer/types/electron';

export const mockProjectTickets: ProjectTicket[] = [
  {
    ticket_number: 'PROJ-001',
    ticket_name: 'Implement user authentication system',
    story_points: 8,
    isManual: false,
  },
  {
    ticket_number: 'PROJ-002', 
    ticket_name: 'Create dashboard with real-time analytics',
    story_points: 13,
    isManual: false,
  },
  {
    ticket_number: 'PROJ-003',
    ticket_name: 'Fix memory leak in timer component',
    story_points: 5,
    isManual: false,
  },
  {
    ticket_number: 'API-101',
    ticket_name: 'Design REST API for mobile integration',
    story_points: 21,
    isManual: false,
  },
  {
    ticket_number: 'API-102',
    ticket_name: 'Implement rate limiting middleware',
    story_points: 3,
    isManual: false,
  },
  {
    ticket_number: 'MANUAL-001',
    ticket_name: 'Manual task for code review',
    story_points: 2,
    isManual: true,
    createdAt: '2024-01-15',
  },
  {
    ticket_number: 'DOCS-001',
    ticket_name: 'Update API documentation',
    story_points: 5,
    isManual: false,
  },
  {
    ticket_number: 'TEST-001',
    ticket_name: 'Write integration tests for payment flow',
    story_points: 8,
    isManual: false,
  },
];

export const mockSessions = {
  'PROJ-001': [
    {
      id: '1',
      ticketNumber: 'PROJ-001',
      startTime: Date.now() - 3600000, // 1 hour ago
      endTime: Date.now() - 1800000, // 30 minutes ago
      duration: 1800000, // 30 minutes
      status: 'completed',
    },
    {
      id: '2', 
      ticketNumber: 'PROJ-001',
      startTime: Date.now() - 900000, // 15 minutes ago
      duration: 900000, // 15 minutes (ongoing)
      status: 'running',
    },
  ],
  'PROJ-002': [
    {
      id: '3',
      ticketNumber: 'PROJ-002',
      startTime: Date.now() - 7200000, // 2 hours ago
      endTime: Date.now() - 5400000, // 1.5 hours ago
      duration: 1800000, // 30 minutes
      status: 'completed',
    },
  ],
  'API-101': [
    {
      id: '4',
      ticketNumber: 'API-101',
      startTime: Date.now() - 600000, // 10 minutes ago
      duration: 600000, // 10 minutes (paused)
      status: 'paused',
    },
  ],
};

export const mockProjectPaths = {
  'jira-time-tracker': '/Users/dev/projects/jira-time-tracker',
  'mobile-app': '/Users/dev/projects/mobile-app',
  'api-service': '/Users/dev/projects/api-service',
};

export const mockProjectBranches = {
  'jira-time-tracker': 'feature/storybook-setup',
  'mobile-app': 'main',
  'api-service': 'develop',
};

export const mockTimers = [
  {
    ticketNumber: 'PROJ-001',
    ticketName: 'Implement user authentication system',
    startTime: Date.now() - 900000, // 15 minutes ago
    elapsedTime: 900000,
    isRunning: true,
    status: 'running' as const,
    totalElapsed: 2700000, // 45 minutes total
    storyPoints: 8,
    sessions: [
      {
        startTime: Date.now() - 3600000,
        endTime: Date.now() - 1800000,
        duration: 1800000,
        status: 'completed',
      },
      {
        startTime: Date.now() - 900000,
        duration: 900000,
        status: 'running',
      },
    ],
  },
  {
    ticketNumber: 'API-101',
    ticketName: 'Design REST API for mobile integration',
    startTime: Date.now() - 600000,
    elapsedTime: 600000,
    isRunning: false,
    status: 'paused' as const,
    totalElapsed: 600000,
    storyPoints: 21,
    sessions: [
      {
        startTime: Date.now() - 600000,
        duration: 600000,
        status: 'paused',
      },
    ],
  },
  {
    ticketNumber: 'PROJ-003',
    ticketName: 'Fix memory leak in timer component',
    startTime: 0,
    elapsedTime: 0,
    isRunning: false,
    status: 'queue' as const,
    totalElapsed: 0,
    storyPoints: 5,
    sessions: [],
  },
];