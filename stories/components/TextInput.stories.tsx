import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextInput from '../../renderer/components/ui/TextInput';
import { Email, Lock } from '@mui/icons-material';

const meta: Meta<typeof TextInput> = {
  title: 'components/ui/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    startIcon: { control: 'boolean' },
    endIcon: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Invalid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters long.',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    startIcon: <Email />,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes up the full width',
    fullWidth: true,
  },
};

export const OutlinedVariant: Story = {
  args: {
    label: 'Outlined',
    placeholder: 'Outlined variant',
    variant: 'outlined',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled',
    placeholder: 'Filled variant',
    variant: 'filled',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You can\'t type here',
    disabled: true,
  },
};

