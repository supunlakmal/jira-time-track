import type { Meta, StoryObj } from '@storybook/react';
import FloatingWindowHeader from '../../renderer/components/FloatingWindowHeader';

const meta: Meta<typeof FloatingWindowHeader> = {
  title: 'Components/FloatingWindowHeader',
  component: FloatingWindowHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedTicketNumber: {
      control: 'text',
    },
    timersLength: {
      control: 'number',
    },
    setIsDragging: { action: 'setIsDragging' },
    handleClose: { action: 'handleClose' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTicketNumber: null,
    timersLength: 0,
    setIsDragging: (isDragging) => console.log('Set is dragging:', isDragging),
    handleClose: () => console.log('Close clicked'),
  },
};

export const WithSelectedTicket: Story = {
  args: {
    selectedTicketNumber: 'JIRA-123',
    timersLength: 1,
    setIsDragging: (isDragging) => console.log('Set is dragging:', isDragging),
    handleClose: () => console.log('Close clicked'),
  },
};

export const WithMultipleTimers: Story = {
  args: {
    selectedTicketNumber: null,
    timersLength: 3,
    setIsDragging: (isDragging) => console.log('Set is dragging:', isDragging),
    handleClose: () => console.log('Close clicked'),
  },
};
