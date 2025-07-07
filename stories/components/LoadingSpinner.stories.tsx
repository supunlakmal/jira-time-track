import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../../renderer/components/LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomContainer: Story = {
  decorators: [
    (Story) => (
      <div className="w-64 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Story />
      </div>
    ),
  ],
};