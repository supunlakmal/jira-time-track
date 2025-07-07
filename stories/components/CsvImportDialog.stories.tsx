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
      control: 'boolean',
    },
    onClose: { action: 'closed' },
    onImport: { action: 'imported' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close clicked'),
    onImport: (data) => console.log('Import data:', data),
  },
};
