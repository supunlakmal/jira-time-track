import type { Meta, StoryObj } from '@storybook/react';
import { ExportDialog } from '../../renderer/components/ExportDialog';

const meta: Meta<typeof ExportDialog> = {
  title: 'Components/ExportDialog',
  component: ExportDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
    projects: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    projects: ['ProjectA', 'ProjectB', 'ProjectC'],
  },
};
