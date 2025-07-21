import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from '../../renderer/components/navigation/Sidebar';
import { sidebarSections } from '../../renderer/components/navigation/sidebarConfig';
import { Dashboard } from '@mui/icons-material';

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    sections: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    sections: sidebarSections,
  },
};

export const CustomSections: Story = {
  args: {
    sections: [
      {
        title: 'Custom Section',
        items: [
          {
            label: 'Custom Item 1',
            href: '#',
            icon: <Dashboard className="text-bgray-600 dark:text-bgray-300" />,
          },
          {
            label: 'Custom Item 2',
            href: '#',
            icon: <Dashboard className="text-bgray-600 dark:text-bgray-300" />,
          },
        ],
      },
    ],
  },
};
