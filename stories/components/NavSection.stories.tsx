import type { Meta, StoryObj } from '@storybook/react';
import NavSection from '../../renderer/components/navigation/NavSection';
import { Home, Settings } from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof NavSection> = {
  title: 'Navigation/NavSection',
  component: NavSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    items: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '250px', border: '1px solid #ccc', padding: '10px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavSection>;

export const Default: Story = {
  args: {
    title: 'Main Navigation',
    items: [
      {
        label: 'Dashboard',
        href: '/',
        icon: <Home />,
      },
      {
        label: 'Projects',
        href: '/projects',
        icon: <Settings />,
      },
    ],
  },
};

export const WithSubMenuAndExtras: Story = {
  args: {
    title: 'Advanced Options',
    items: [
      {
        label: 'User Settings',
        href: '/settings',
        icon: <Settings />,
        subMenu: (
          <ul style={{ paddingLeft: '20px', fontSize: '0.9em' }}>
            <li>Profile</li>
            <li>Privacy</li>
          </ul>
        ),
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: <Home />,
        extras: <span style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '12px', background: '#ff784b', color: 'white', fontSize: '0.7em' }}>7</span>,
      },
    ],
  },
};
