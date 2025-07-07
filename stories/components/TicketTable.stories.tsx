import type { Meta, StoryObj } from '@storybook/react';
import TicketTable from '../../renderer/components/TicketTable';
import { TimerSession } from '../../renderer/store/sessionsSlice';

const meta: Meta<typeof TicketTable> = {
  title: 'Components/TicketTable',
  component: TicketTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ticketsToDisplay: {
      control: 'object',
    },
    sessions: {
      control: 'object',
    },
    selectedProject: {
      control: 'text',
    },
    searchTerm: {
      control: 'text',
    },
    formatTime: {
      control: false,
    },
    getProjectName: {
      control: false,
    },
    openEditDialog: { action: 'openEditDialog' },
    handleDeleteManualTask: { action: 'deleteManualTask' },
    data: {
      control: 'object',
    },
  },
  render: (args) => {
    // Mock window.ipc for Storybook environment
    if (typeof window !== 'undefined') {
      window.ipc = {
        ...window.ipc, // Keep existing ipc mocks if any
        send: (channel, ...sendArgs) => console.log(`IPC Send: ${channel}`, sendArgs),
        invoke: (channel, ...invokeArgs) => {
          console.log(`IPC Invoke: ${channel}`, invokeArgs);
          return Promise.resolve({});
        },
        on: (channel, listener) => {
          console.log(`IPC On: ${channel}`);
          return () => {};
        },
        window: {
          minimize: () => {},
          maximize: () => {},
          close: () => {},
          hide: () => {},
          show: () => {},
        },
      };
    }
    return <TicketTable {...args} />;
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockFormatTime = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const mockGetProjectName = (ticketNumber: string): string => {
  if (!ticketNumber || !ticketNumber.includes('-')) return 'N/A';
  return ticketNumber.split('-')[0];
};

const mockTickets = [
  {
    ticket_number: 'PROJ-001',
    ticket_name: 'Implement user authentication',
    story_points: 8,
    isManual: false,
  },
  {
    ticket_number: 'PROJ-002',
    ticket_name: 'Fix bug in payment gateway',
    story_points: 5,
    isManual: false,
  },
  {
    ticket_number: 'MANUAL-001',
    ticket_name: 'Manual task for documentation',
    story_points: 3,
    isManual: true,
  },
  {
    ticket_number: 'PROJ-003',
    ticket_name: 'Refactor database schema',
    story_points: 13,
    isManual: false,
  },
];

const mockSessions: { [key: string]: TimerSession } = {
  'PROJ-001': {
    ticketNumber: 'PROJ-001',
    ticketName: 'Implement user authentication',
    storyPoints: 8,
    sessions: [
      { startTime: Date.now() - 3600000, duration: 3600000, status: 'completed', endTime: Date.now() - 100000 },
      { startTime: Date.now() - 1800000, duration: 1800000, status: 'running' },
    ],
    totalElapsed: 5400000, // 1h 30m
  },
  'PROJ-002': {
    ticketNumber: 'PROJ-002',
    ticketName: 'Fix bug in payment gateway',
    storyPoints: 5,
    sessions: [
      { startTime: Date.now() - 7200000, duration: 7200000, status: 'paused', endTime: Date.now() - 3600000 },
    ],
    totalElapsed: 7200000, // 2h 0m
  },
  'MANUAL-001': {
    ticketNumber: 'MANUAL-001',
    ticketName: 'Manual task for documentation',
    storyPoints: 3,
    sessions: [
      { startTime: Date.now() - 10800000, duration: 10800000, status: 'completed', endTime: Date.now() - 7200000 },
    ],
    totalElapsed: 10800000, // 3h 0m
  },
};

export const Default: Story = {
  args: {
    ticketsToDisplay: mockTickets,
    sessions: mockSessions,
    selectedProject: null,
    searchTerm: '',
    formatTime: mockFormatTime,
    getProjectName: mockGetProjectName,
    openEditDialog: (task) => console.log('Open edit dialog for:', task),
    handleDeleteManualTask: (ticketNumber) => console.log('Delete manual task:', ticketNumber),
    data: mockTickets, // Full data for empty state logic
  },
};

export const EmptyTable: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: [],
    data: [],
  },
};

export const FilteredByProject: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: mockTickets.filter(t => t.ticket_number.startsWith('PROJ')),
    selectedProject: 'PROJ',
  },
};

export const FilteredBySearchTerm: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: mockTickets.filter(t => t.ticket_name.toLowerCase().includes('bug')),
    searchTerm: 'bug',
  },
};

export const WithActiveTimer: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: [mockTickets[0]],
    sessions: {
      'PROJ-001': {
        ticketNumber: 'PROJ-001',
        ticketName: 'Implement user authentication',
        storyPoints: 8,
        sessions: [
          { startTime: Date.now() - 1800000, duration: 1800000, status: 'running' },
        ],
        totalElapsed: 1800000,
      },
    },
  },
};

export const WithPausedTimer: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: [mockTickets[1]],
    sessions: {
      'PROJ-002': {
        ticketNumber: 'PROJ-002',
        ticketName: 'Fix bug in payment gateway',
        storyPoints: 5,
        sessions: [
          { startTime: Date.now() - 7200000, duration: 7200000, status: 'paused', endTime: Date.now() - 3600000 },
        ],
        totalElapsed: 7200000,
      },
    },
  },
};
