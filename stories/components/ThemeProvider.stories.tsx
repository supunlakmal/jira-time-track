import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../renderer/components/theme/ThemeProvider';
import { ThemeToggle } from '../../renderer/components/theme/ThemeToggle';

const meta: Meta<typeof ThemeProvider> = {
  title: 'components/theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="p-4 bg-white dark:bg-gray-800">
        <h1 className="text-xl text-black dark:text-white">Theme Provider</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This component provides theme context to its children.
        </p>
        <div className="mt-4">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  ),
};
