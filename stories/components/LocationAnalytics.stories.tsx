import type { Meta, StoryObj } from '@storybook/react';
import LocationAnalytics from '../../renderer/components/dashboard/LocationAnalytics';
import { mockLocationData } from '../mocks/mockData';

const meta: Meta<typeof LocationAnalytics> = {
  title: 'Components/Dashboard/LocationAnalytics',
  component: LocationAnalytics,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of location data with countries, flags, and progress percentages',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockLocationData,
  },
};

export const HighPerformance: Story = {
  args: {
    data: [
      {
        id: '1',
        country: 'United States',
        flagImage: '/assets/images/flag/usa.png',
        percentage: 95,
        progressColor: 'success' as const,
      },
      {
        id: '2',
        country: 'Germany',
        flagImage: '/assets/images/flag/germany.png',
        percentage: 88,
        progressColor: 'success' as const,
      },
      {
        id: '3',
        country: 'Japan',
        flagImage: '/assets/images/flag/japan.png',
        percentage: 92,
        progressColor: 'success' as const,
      },
    ],
  },
};

export const MixedPerformance: Story = {
  args: {
    data: [
      {
        id: '1',
        country: 'Brazil',
        flagImage: '/assets/images/flag/bra.png',
        percentage: 45,
        progressColor: 'warning' as const,
      },
      {
        id: '2',
        country: 'France',
        flagImage: '/assets/images/flag/france.png',
        percentage: 78,
        progressColor: 'success' as const,
      },
      {
        id: '3',
        country: 'India',
        flagImage: '/assets/images/flag/india.png',
        percentage: 25,
        progressColor: 'orange' as const,
      },
    ],
  },
};

export const LowPerformance: Story = {
  args: {
    data: [
      {
        id: '1',
        country: 'Country A',
        flagImage: '/assets/images/flag/default.png',
        percentage: 15,
        progressColor: 'orange' as const,
      },
      {
        id: '2',
        country: 'Country B',
        flagImage: '/assets/images/flag/default.png',
        percentage: 8,
        progressColor: 'orange' as const,
      },
      {
        id: '3',
        country: 'Country C',
        flagImage: '/assets/images/flag/default.png',
        percentage: 22,
        progressColor: 'warning' as const,
      },
    ],
  },
};

export const SingleLocation: Story = {
  args: {
    data: [
      {
        id: '1',
        country: 'United Kingdom',
        flagImage: '/assets/images/flag/uk.png',
        percentage: 73,
        progressColor: 'success' as const,
      },
    ],
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};

export const ManyLocations: Story = {
  args: {
    data: [
      {
        id: '1',
        country: 'United States',
        flagImage: '/assets/images/flag/usa.png',
        percentage: 85,
        progressColor: 'success' as const,
      },
      {
        id: '2',
        country: 'Brazil',
        flagImage: '/assets/images/flag/bra.png',
        percentage: 65,
        progressColor: 'warning' as const,
      },
      {
        id: '3',
        country: 'Germany',
        flagImage: '/assets/images/flag/germany.png',
        percentage: 92,
        progressColor: 'success' as const,
      },
      {
        id: '4',
        country: 'Italy',
        flagImage: '/assets/images/flag/italy.png',
        percentage: 58,
        progressColor: 'warning' as const,
      },
      {
        id: '5',
        country: 'Japan',
        flagImage: '/assets/images/flag/japan.png',
        percentage: 78,
        progressColor: 'success' as const,
      },
      {
        id: '6',
        country: 'Australia',
        flagImage: '/assets/images/flag/australia.png',
        percentage: 35,
        progressColor: 'orange' as const,
      },
    ],
  },
};