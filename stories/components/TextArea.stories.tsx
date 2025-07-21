import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextArea from '../../renderer/components/ui/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'components/ui/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    fullWidth: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'outlined', 'filled'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
  },
};

export const WithError: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Enter your feedback',
    error: 'Feedback cannot be empty',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Enter your comment',
    helperText: 'Please be respectful in your comments.',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Text Area',
    placeholder: 'This text area takes up the full width',
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
    label: 'Disabled Text Area',
    placeholder: 'You can\'t type here',
    disabled: true,
  },
};

export const NoResize: Story = {
  args: {
    label: 'No Resize',
    placeholder: 'This text area cannot be resized',
    resize: 'none',
  },
};
