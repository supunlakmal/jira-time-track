import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataTable from '../../renderer/components/dashboard/DataTable';
import { 
  mockCustomerData, 
  mockDashboardFilters, 
  mockPaginationState 
} from '../mocks/mockData';

const meta: Meta<typeof DataTable> = {
  title: 'Components/Dashboard/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of customer data to display in the table',
    },
    filters: {
      control: 'object',
      description: 'Current filter state for search and filtering',
    },
    pagination: {
      control: 'object',
      description: 'Pagination state with current page and items per page',
    },
    activeDropdown: {
      control: 'text',
      description: 'Currently active dropdown ID',
    },
    onFilterChange: {
      action: 'filterChanged',
      description: 'Callback when filter values change',
    },
    onDropdownToggle: {
      action: 'dropdownToggled',
      description: 'Callback when dropdown is toggled',
    },
    onPaginationChange: {
      action: 'paginationChanged',
      description: 'Callback when pagination state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockCustomerData,
    filters: mockDashboardFilters,
    pagination: mockPaginationState,
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const WithSearchQuery: Story = {
  args: {
    data: mockCustomerData,
    filters: {
      ...mockDashboardFilters,
      searchQuery: 'Devon',
    },
    pagination: mockPaginationState,
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const WithFiltersApplied: Story = {
  args: {
    data: mockCustomerData,
    filters: {
      ...mockDashboardFilters,
      location: 'usa',
      amountSpent: '>1000',
      transactionType: 'income',
    },
    pagination: mockPaginationState,
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const WithDropdownOpen: Story = {
  args: {
    data: mockCustomerData,
    filters: mockDashboardFilters,
    pagination: mockPaginationState,
    activeDropdown: 'province-filter',
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const LargeDataset: Story = {
  args: {
    data: [
      ...mockCustomerData,
      {
        id: '6',
        name: 'Jane Smith',
        email: 'jane@example.com',
        location: 'Seattle, USA',
        spent: '$234.50',
      },
      {
        id: '7',
        name: 'John Doe',
        email: 'john@example.com',
        location: 'Austin, USA',
        spent: '$567.25',
      },
      {
        id: '8',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        location: 'Denver, USA',
        spent: '$123.75',
      },
      {
        id: '9',
        name: 'Mike Wilson',
        email: 'mike@example.com',
        location: 'Portland, USA',
        spent: '$456.00',
      },
      {
        id: '10',
        name: 'Lisa Brown',
        email: 'lisa@example.com',
        location: 'San Diego, USA',
        spent: '$789.30',
      },
    ],
    filters: mockDashboardFilters,
    pagination: {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 10,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
    filters: mockDashboardFilters,
    pagination: {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 0,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const SingleItem: Story = {
  args: {
    data: [mockCustomerData[0]],
    filters: mockDashboardFilters,
    pagination: {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const LastPage: Story = {
  args: {
    data: mockCustomerData.slice(3, 5), // Show last 2 items
    filters: mockDashboardFilters,
    pagination: {
      currentPage: 2,
      itemsPerPage: 3,
      totalItems: 5,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};

export const HighSpendingCustomers: Story = {
  args: {
    data: [
      {
        id: '1',
        name: 'Premium Customer',
        email: 'premium@company.com',
        location: 'New York, USA',
        spent: '$15,450.00',
      },
      {
        id: '2',
        name: 'Enterprise Client',
        email: 'enterprise@business.com',
        location: 'San Francisco, USA',
        spent: '$28,750.50',
      },
      {
        id: '3',
        name: 'VIP Member',
        email: 'vip@luxury.com',
        location: 'Los Angeles, USA',
        spent: '$45,820.25',
      },
    ],
    filters: mockDashboardFilters,
    pagination: {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 3,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
    onPaginationChange: action('onPaginationChange'),
  },
};