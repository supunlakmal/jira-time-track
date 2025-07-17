import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import FilterDropdown from '../../renderer/components/dashboard/FilterDropdown';
import { mockFilterOptions } from '../mocks/mockData';

const meta: Meta<typeof FilterDropdown> = {
  title: 'Components/Dashboard/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the dropdown',
    },
    label: {
      control: 'text',
      description: 'Display label for the dropdown button',
    },
    options: {
      control: 'object',
      description: 'Array of options with value and label properties',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is currently open',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback when dropdown is toggled',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when an option is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    id: 'demo-dropdown',
    label: 'Select Month',
    options: mockFilterOptions,
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const Open: Story = {
  args: {
    id: 'demo-dropdown-open',
    label: 'Select Month',
    options: mockFilterOptions,
    isOpen: true,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const DateRange: Story = {
  args: {
    id: 'date-range-dropdown',
    label: 'Jan 10 - Jan 16',
    options: [
      { value: 'jan-10-16', label: 'Jan 10 - Jan 16' },
      { value: 'jan-17-23', label: 'Jan 17 - Jan 23' },
      { value: 'jan-24-30', label: 'Jan 24 - Jan 30' },
      { value: 'feb-1-7', label: 'Feb 1 - Feb 7' },
    ],
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const StatusFilter: Story = {
  args: {
    id: 'status-filter',
    label: 'All Status',
    options: [
      { value: 'all', label: 'All Status' },
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const LongLabels: Story = {
  args: {
    id: 'long-labels-dropdown',
    label: 'Very Long Category Name',
    options: [
      { value: 'category1', label: 'Very Long Category Name That Might Overflow' },
      { value: 'category2', label: 'Another Extremely Long Category Name' },
      { value: 'category3', label: 'Short' },
      { value: 'category4', label: 'Medium Length Category' },
    ],
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const SingleOption: Story = {
  args: {
    id: 'single-option',
    label: 'Only Option',
    options: [
      { value: 'only', label: 'Only Available Option' },
    ],
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const ManyOptions: Story = {
  args: {
    id: 'many-options',
    label: 'Select Year',
    options: Array.from({ length: 10 }, (_, i) => ({
      value: `year-${2024 - i}`,
      label: `${2024 - i}`,
    })),
    isOpen: false,
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};

export const WithCustomClass: Story = {
  args: {
    id: 'custom-class-dropdown',
    label: 'Custom Styled',
    options: mockFilterOptions,
    isOpen: false,
    className: 'border-2 border-blue-500',
    onToggle: action('onToggle'),
    onSelect: action('onSelect'),
  },
};