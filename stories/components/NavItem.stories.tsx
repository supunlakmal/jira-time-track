import type { Meta, StoryObj } from '@storybook/react';
import NavItem from '../../renderer/components/navigation/NavItem';
import { Home } from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NavItem> = {
  title: 'Navigation/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    label: { control: 'text' },
    icon: { control: 'object' },
    subMenu: { control: 'object' },
    extras: { control: 'object' },
    visibleOnPaths: { control: 'object' },
    hiddenOnPaths: { control: 'object' },
    visibilityCondition: { action: 'visibilityCondition' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ width: '200px', border: '1px solid #ccc', padding: '10px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: '/',
    label: 'Dashboard',
    icon: <Home />,
  },
};

export const Active: Story = {
  args: {
    href: '/',
    label: 'Dashboard',
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

export const WithSubMenu: Story = {
  args: {
    href: '/',
    label: 'Settings',
    icon: <Home />,
    subMenu: (
      <ul style={{ paddingLeft: '20px', fontSize: '0.9em' }}>
        <li>Sub Item 1</li>
        <li>Sub Item 2</li>
      </ul>
    ),
  },
};

export const WithExtras: Story = {
  args: {
    href: '/',
    label: 'Notifications',
    icon: <Home />,
    extras: <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '12px', background: '#ff784b', color: 'white', fontSize: '0.7em' }}>5</span>,
  },
};
