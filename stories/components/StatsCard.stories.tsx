import type { Meta, StoryObj } from '@storybook/react';
import StatsCard from '../../renderer/components/dashboard/StatsCard';
import { mockStatsCards } from '../mocks/mockData';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/Dashboard/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Stats card data including title, value, change, and icon type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Earnings: Story = {
  args: {
    data: mockStatsCards[0], // Total earnings
  },
};

export const Spending: Story = {
  args: {
    data: mockStatsCards[1], // Total Spending with negative change
  },
};

export const Goals: Story = {
  args: {
    data: mockStatsCards[2], // Total Goals
  },
};

export const Monthly: Story = {
  args: {
    data: mockStatsCards[3], // Monthly Spending
  },
};

export const HighValue: Story = {
  args: {
    data: {
      id: 'high-1',
      title: 'Revenue',
      value: '$125,450.00',
      change: '+ 15.8%',
      changeType: 'positive' as const,
      icon: 'earnings',
      chartId: 'revenueChart'
    },
  },
};

export const NegativeChange: Story = {
  args: {
    data: {
      id: 'neg-1',
      title: 'Loss Prevention',
      value: '$2,340.00',
      change: '- 8.2%',
      changeType: 'negative' as const,
      icon: 'spending',
      chartId: 'lossChart'
    },
  },
};

export const SmallValue: Story = {
  args: {
    data: {
      id: 'small-1',
      title: 'Daily Expense',
      value: '$45.50',
      change: '+ 0.5%',
      changeType: 'positive' as const,
      icon: 'monthly',
      chartId: 'dailyChart'
    },
  },
};

export const ZeroChange: Story = {
  args: {
    data: {
      id: 'zero-1',
      title: 'Stable Metric',
      value: '$1,000.00',
      change: '0.0%',
      changeType: 'positive' as const,
      icon: 'goals',
      chartId: 'stableChart'
    },
  },
};