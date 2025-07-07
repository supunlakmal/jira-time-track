import type { Meta, StoryObj } from '@storybook/react';
import TicketTableActions from '../../renderer/components/tickets/TicketTableActions';

const meta: Meta<typeof TicketTableActions> = {
  title: 'Components/TicketTableActions',
  component: TicketTableActions,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    searchTerm: {
      control: 'text',
    },
    setSearchTerm: { action: 'setSearchTerm' },
    selectedProject: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    refreshData: { action: 'refreshData' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchTerm: '',
    setSearchTerm: (term) => console.log('Search term:', term),
    selectedProject: null,
    loading: false,
    refreshData: () => console.log('Refresh data'),
  },
};

export const WithSearchTerm: Story = {
  args: {
    ...Default.args,
    searchTerm: 'bug',
  },
};

export const WithSelectedProject: Story = {
  args: {
    ...Default.args,
    selectedProject: 'PROJ',
  },
};

export const LoadingState: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};
