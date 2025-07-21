import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from '../../renderer/components/ui/SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'components/ui/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    onClear: { action: 'onClear' },
    showClearButton: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'filled'] },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search...',
    value: 'Some search query',
  },
};

export const NoClearButton: Story = {
  args: {
    placeholder: 'Search...',
    value: 'Some search query',
    showClearButton: false,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Search...',
    fullWidth: true,
  },
};

export const FilledVariant: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'filled',
  },
};
