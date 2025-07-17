import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import EfficiencyPanel from '../../renderer/components/dashboard/EfficiencyPanel';
import { mockEfficiencyData } from '../mocks/mockData';

const meta: Meta<typeof EfficiencyPanel> = {
  title: 'Components/Dashboard/EfficiencyPanel',
  component: EfficiencyPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Efficiency data including arrival, spending, and percentage metrics',
    },
    activeDropdown: {
      control: 'text',
      description: 'Currently active dropdown ID',
    },
    onFilterChange: {
      action: 'filterChanged',
      description: 'Callback when filter value changes',
    },
    onDropdownToggle: {
      action: 'dropdownToggled',
      description: 'Callback when dropdown is toggled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockEfficiencyData,
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};

export const WithDropdownOpen: Story = {
  args: {
    data: mockEfficiencyData,
    activeDropdown: 'month-filter',
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};

export const HighEfficiency: Story = {
  args: {
    data: {
      arrival: 8500,
      spending: 4200,
      goal: 25,
      goalPercentage: 45,
      spendingPercentage: 35,
      othersPercentage: 20,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};

export const LowEfficiency: Story = {
  args: {
    data: {
      arrival: 2100,
      spending: 7800,
      goal: 8,
      goalPercentage: 5,
      spendingPercentage: 60,
      othersPercentage: 35,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};

export const BalancedMetrics: Story = {
  args: {
    data: {
      arrival: 5000,
      spending: 5000,
      goal: 15,
      goalPercentage: 33,
      spendingPercentage: 33,
      othersPercentage: 34,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};

export const ExtremeValues: Story = {
  args: {
    data: {
      arrival: 15000,
      spending: 500,
      goal: 50,
      goalPercentage: 80,
      spendingPercentage: 15,
      othersPercentage: 5,
    },
    activeDropdown: null,
    onFilterChange: action('onFilterChange'),
    onDropdownToggle: action('onDropdownToggle'),
  },
};