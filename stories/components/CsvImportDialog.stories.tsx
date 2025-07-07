import type { Meta, StoryObj } from '@storybook/react';
import { CsvImportDialog } from '../../renderer/components/CsvImportDialog';

const meta: Meta<typeof CsvImportDialog> = {
  title: 'Components/CsvImportDialog',
  component: CsvImportDialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    onClose: {
      action: 'onClose',
    },
    onImport: {
      action: 'onImport',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onImport: (data) => console.log('Importing CSV data:', data),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onImport: (data) => console.log('Importing CSV data:', data),
  },
};