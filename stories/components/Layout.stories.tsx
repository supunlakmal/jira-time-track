import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Layout from '../../renderer/components/layout/Layout';

const meta: Meta<typeof Layout> = {
  title: 'components/layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    toggleFloatingWindow: { action: 'toggleFloatingWindow' },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {
    children: 'Main content goes here',
  },
};
