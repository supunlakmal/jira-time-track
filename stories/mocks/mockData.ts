
// stories/mocks/mockData.ts

export const mockProjectData = [
  {
    ticket_number: 'PROJ-1',
    ticket_name: 'Mock Project Task 1',
    project_name: 'Mock Project A',
    storyPoints: 5,
    sessions: [
      { startTime: Date.now() - 3600000, endTime: Date.now() - 1800000, duration: 1800000, status: 'completed' },
      { startTime: Date.now() - 120000, endTime: Date.now() - 60000, duration: 60000, status: 'completed' },
    ],
    totalElapsed: 1860000,
  },
  {
    ticket_number: 'PROJ-2',
    ticket_name: 'Mock Project Task 2',
    project_name: 'Mock Project A',
    storyPoints: 8,
    sessions: [
      { startTime: Date.now() - 7200000, endTime: Date.now() - 3600000, duration: 3600000, status: 'completed' },
    ],
    totalElapsed: 3600000,
  },
  {
    ticket_number: 'B-101',
    ticket_name: 'Bug Fix for Feature X',
    project_name: 'Mock Project B',
    storyPoints: 3,
    sessions: [
      { startTime: Date.now() - 900000, endTime: Date.now() - 300000, duration: 600000, status: 'completed' },
    ],
    totalElapsed: 600000,
  },
];

export const mockSessions = {
  'PROJ-1': {
    ticketNumber: 'PROJ-1',
    ticketName: 'Mock Project Task 1',
    storyPoints: 5,
    sessions: [
      { startTime: Date.now() - 3600000, endTime: Date.now() - 1800000, duration: 1800000, status: 'completed' },
      { startTime: Date.now() - 120000, endTime: Date.now() - 60000, duration: 60000, status: 'completed' },
    ],
    totalElapsed: 1860000,
  },
  'PROJ-2': {
    ticketNumber: 'PROJ-2',
    ticketName: 'Mock Project Task 2',
    storyPoints: 8,
    sessions: [
      { startTime: Date.now() - 7200000, endTime: Date.now() - 3600000, duration: 3600000, status: 'completed' },
    ],
    totalElapsed: 3600000,
  },
};

export const mockProjects = [
  {
    id: 'proj-a-123',
    name: 'Mock Project A',
    description: 'Description for Mock Project A',
    status: 'active',
    progress: 75,
    deadline: '2025-12-31T23:59:59Z',
    tasks: 2,
    activities: 10,
    client: 'Client Alpha',
    budget: 5000,
    startDate: '2024-01-01T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'proj-b-456',
    name: 'Mock Project B',
    description: 'Description for Mock Project B',
    status: 'completed',
    progress: 100,
    deadline: '2024-06-30T23:59:59Z',
    tasks: 1,
    activities: 5,
    client: 'Client Beta',
    budget: 2000,
    startDate: '2023-07-01T00:00:00Z',
    createdAt: '2023-07-01T00:00:00Z',
  },
];

export const mockCustomerData = [
  { id: '1', name: 'Customer A', email: 'a@example.com' },
  { id: '2', name: 'Customer B', email: 'b@example.com' },
];

export const mockDashboardFilters = {
  dateRange: 'last7days',
  project: 'all',
  status: 'all',
};

export const mockPaginationState = {
  pageIndex: 0,
  pageSize: 10,
};

export const mockFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const mockEfficiencyData = {
  totalTimeSpent: 12345678,
  averageDailyHours: 4.5,
  projectCompletionRate: 0.75,
  onTimeDeliveryRate: 0.90,
};









export const mockBillingData = {
  settings: {
    globalHourlyRate: 50,
    projectRates: {
      'Mock Project A': 60,
      'Mock Project B': 45,
    },
    currency: 'USD',
    taxRate: 0.08,
    companyName: 'Mock Company Inc.',
    companyAddress: '123 Mock Street, Mockville, MK 12345',
    invoicePrefix: 'MOCKINV',
  },
  invoices: [],
};

export const mockLocationData = [];

export const mockStatsCards = [];

export const mockProjectTickets = [];
export const mockTimers = [];
