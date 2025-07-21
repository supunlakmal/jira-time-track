import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SplashScreen } from '../../renderer/components/ui/SplashScreen';

const meta: Meta<typeof SplashScreen> = {
  title: 'components/ui/SplashScreen',
  component: SplashScreen,
  tags: ['autodocs'],
  argTypes: {
    onComplete: { action: 'onComplete' },
    minDisplayTime: { control: 'number' },
    loadingState: { control: 'select', options: ['initializing', 'loading-data', 'ready'] },
  },
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  args: {
    minDisplayTime: 3000,
  },
};

export const Initializing: Story = {
  args: {
    minDisplayTime: 3000,
    loadingState: 'initializing',
  },
};

export const LoadingData: Story = {
  args: {
    minDisplayTime: 3000,
    loadingState: 'loading-data',
  },
};

export const Ready: Story = {
  args: {
    minDisplayTime: 3000,
    loadingState: 'ready',
  },
};
