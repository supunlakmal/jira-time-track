import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ZoomControls } from '../../renderer/components/ui/ZoomControls';

const meta: Meta<typeof ZoomControls> = {
  title: 'components/ui/ZoomControls',
  component: ZoomControls,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => {
      // Mock window.ipc for Storybook
      if (typeof window !== 'undefined') {
        window.ipc = {
          zoom: {
            in: () => console.log('zoom in'),
            out: () => console.log('zoom out'),
            reset: () => console.log('zoom reset'),
          },
        } as any;
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ZoomControls>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
