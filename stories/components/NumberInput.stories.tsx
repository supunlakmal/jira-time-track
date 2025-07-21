import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import NumberInput from '../../renderer/components/ui/NumberInput';
import { AttachMoney } from '@mui/icons-material';

const meta: Meta<typeof NumberInput> = {
  title: 'components/ui/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    startIcon: { control: 'boolean' },
    endIcon: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
    showStepper: { control: 'boolean' },
    onIncrement: { action: 'onIncrement' },
    onDecrement: { action: 'onDecrement' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    placeholder: 'Enter a number',
  },
};

export const WithError: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
    error: 'Age must be a positive number',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Price',
    placeholder: 'Enter the price',
    helperText: 'Price must be in USD.',
  },
};

export const WithStartIcon: Story = {
  args: {
    label: 'Budget',
    placeholder: 'Enter your budget',
    startIcon: <AttachMoney />,
  },
};

export const WithStepper: Story = {
  args: {
    label: 'Items',
    placeholder: 'Number of items',
    showStepper: true,
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
    placeholder: 'You can\'t change this',
    disabled: true,
    value: 10,
  },
};
