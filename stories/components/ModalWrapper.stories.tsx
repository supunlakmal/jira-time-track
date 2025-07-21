import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalWrapper } from '../../renderer/components/ui/ModalWrapper';
import Button from '../../renderer/components/ui/Button';

const meta: Meta<typeof ModalWrapper> = {
  title: 'components/ui/ModalWrapper',
  component: ModalWrapper,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'onClose' },
    title: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    showCloseButton: { control: 'boolean' },
    closeOnBackdropClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    footer: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ModalWrapper>;

export const Default: Story = {
  args: {
    title: 'Default Modal',
    children: 'This is the content of the modal.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Modal With Footer',
    children: 'This modal has a custom footer.',
    footer: (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="gray" onClick={() => alert('Cancel clicked')}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => alert('Submit clicked')}
          style={{ marginLeft: '8px' }}
        >
          Submit
        </Button>
      </div>
    ),
  },
};

export const LargeModal: Story = {
  args: {
    title: 'Large Modal',
    children: 'This is a large modal.',
    size: 'lg',
  },
};

export const NoBackdropClose: Story = {
  args: {
    title: 'No Backdrop Close',
    children: 'You cannot close this modal by clicking the backdrop.',
    closeOnBackdropClick: false,
  },
};
