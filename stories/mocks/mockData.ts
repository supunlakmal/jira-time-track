
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
  { id: '1', name: 'Customer A', email: 'a@example.com', location: 'New York', spent: '$1,234.50' },
  { id: '2', name: 'Customer B', email: 'b@example.com', location: 'Los Angeles', spent: '$2,456.75' },
  { id: '3', name: 'Customer C', email: 'c@example.com', location: 'Chicago', spent: '$3,678.90' },
  { id: '4', name: 'Customer D', email: 'd@example.com', location: 'Houston', spent: '$4,901.25' },
  { id: '5', name: 'Customer E', email: 'e@example.com', location: 'Phoenix', spent: '$5,123.60' },
];

export const mockDashboardFilters = {
  dateRange: 'last7days',
  location: 'all',
  amountSpent: 'all',
  transactionDate: 'all',
  transactionType: 'all',
  searchQuery: '',
};

export const mockPaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 100,
};

export const mockFilterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export const mockEfficiencyData = {
  arrival: 85,
  spending: 65,
  goal: 90,
  goalPercentage: 85,
  spendingPercentage: 65,
  othersPercentage: 15,
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
