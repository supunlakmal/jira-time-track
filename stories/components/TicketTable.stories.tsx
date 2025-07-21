import type { Meta, StoryObj } from '@storybook/react';
import TicketTable from '../../renderer/components/tickets/TicketTable';
import { TimerSession } from '../../renderer/store/sessionsSlice';

const mockTickets = [
  {
    ticket_number: 'PROJ-101',
    ticket_name: 'Implement user authentication flow',
    story_points: 8,
    isManual: false,
  },
  {
    ticket_number: 'BUG-005',
    ticket_name: 'Fix broken login button on mobile',
    story_points: 2,
    isManual: false,
  },
  {
    ticket_number: 'MANUAL-001',
    ticket_name: 'Client meeting preparation',
    story_points: 3.5,
    isManual: true,
  },
  {
    ticket_number: 'FEAT-010',
    ticket_name: 'Develop new dashboard analytics widget',
    story_points: 13,
    isManual: false,
  },
  {
    ticket_number: 'PROJ-102',
    ticket_name: 'Database schema refactoring',
    story_points: 5,
    isManual: false,
  },
];

const mockSessions: { [key: string]: TimerSession } = {
  'PROJ-101': {
    ticketNumber: 'PROJ-101',
    ticketName: 'Implement user authentication flow',
    storyPoints: 8,
    sessions: [
      { startTime: Date.now() - 7200000, endTime: Date.now() - 3600000, duration: 3600000, status: 'completed' },
      { startTime: Date.now() - 1800000, duration: 1800000, status: 'running' },
    ],
    totalElapsed: 5400000, // 1h 30m
  },
  'BUG-005': {
    ticketNumber: 'BUG-005',
    ticketName: 'Fix broken login button on mobile',
    storyPoints: 2,
    sessions: [
      { startTime: Date.now() - 3600000, endTime: Date.now() - 2700000, duration: 900000, status: 'paused' },
    ],
    totalElapsed: 900000, // 15m
  },
  'MANUAL-001': {
    ticketNumber: 'MANUAL-001',
    ticketName: 'Client meeting preparation',
    storyPoints: 3.5,
    sessions: [
      { startTime: Date.now() - 10800000, endTime: Date.now() - 7200000, duration: 3600000, status: 'completed' },
    ],
    totalElapsed: 3600000, // 1h
  },
};

const mockBillingData = {
  settings: {
    globalHourlyRate: 50,
    currency: 'USD',
    projectRates: {
      'PROJ': 60,
      'BUG': 45,
    },
  },
};

const meta: Meta<typeof TicketTable> = {
  title: 'Tickets/TicketTable',
  component: TicketTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    ticketsToDisplay: { control: 'object' },
    sessions: { control: 'object' },
    selectedProject: { control: 'text' },
    searchTerm: { control: 'text' },
    formatTime: { action: 'formatTime' },
    getProjectName: { action: 'getProjectName' },
    openEditDialog: { action: 'openEditDialog' },
    handleDeleteManualTask: { action: 'handleDeleteManualTask' },
    data: { control: 'object' },
    billingData: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof TicketTable>;

export const Default: Story = {
  args: {
    ticketsToDisplay: mockTickets,
    sessions: mockSessions,
    selectedProject: null,
    searchTerm: '',
    formatTime: (ms: number) => {
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    },
    getProjectName: (ticketNumber: string) => ticketNumber.split('-')[0],
    openEditDialog: (task) => console.log('Edit task:', task),
    handleDeleteManualTask: (ticketNumber) => console.log('Delete task:', ticketNumber),
    data: mockTickets,
    billingData: mockBillingData,
  },
};

export const FilteredByProject: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: mockTickets.filter(t => t.ticket_number.startsWith('PROJ')),
    selectedProject: 'PROJ',
  },
};

export const WithSearchTerm: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: mockTickets.filter(t => t.ticket_name.toLowerCase().includes('login')),
    searchTerm: 'login',
  },
};

export const NoTickets: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: [],
    sessions: {},
    data: [],
  },
};

export const NoMatchingTickets: Story = {
  args: {
    ...Default.args,
    ticketsToDisplay: [],
    searchTerm: 'nonexistent',
  },
};