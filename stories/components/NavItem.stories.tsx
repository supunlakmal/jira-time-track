import type { Meta, StoryObj } from '@storybook/react';
import NavItem from '../../renderer/components/navigation/NavItem';
import { Home } from '@mui/icons-material';

const meta: Meta<typeof NavItem> = {
  title: 'Navigation/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    icon: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'Dashboard',
    icon: <Home />,
  },
};

export const Active: Story = {
  args: {
    href: '/',
    children: 'Dashboard',
    icon: <Home />,
  },
  parameters: {
    reactRouter: { 
      routePath: '/',
      // This is a workaround for storybook-addon-react-router-v6 not updating active state correctly
      // In a real app, Next.js router handles this automatically.
      // For Storybook, we simulate it by setting the active class manually if needed for visual testing.
    },
  },
};


