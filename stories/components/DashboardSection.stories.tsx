import type { Meta, StoryObj } from '@storybook/react';
import DashboardSection from '../../renderer/components/dashboard/DashboardSection';

const meta: Meta<typeof DashboardSection> = {
  title: 'Components/Dashboard/DashboardSection',
  component: DashboardSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // DashboardSection has no props - it manages its own state
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullDashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete dashboard section showing all components: stats cards, efficiency panel, location analytics, and data table with full functionality.',
      },
    },
  },
};

export const ResponsiveView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Dashboard section viewed on tablet to demonstrate responsive design. Some panels may be hidden on smaller screens.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Dashboard section on mobile devices. The layout adapts to smaller screens with components stacking vertically.',
      },
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
    docs: {
      description: {
        story: 'Dashboard section with dark theme applied. All components support dark mode styling.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-darkblack-700 min-h-screen p-4">
        <Story />
      </div>
    ),
  ],
};

export const InteractiveDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo of the complete dashboard. Try clicking on dropdowns, filters, pagination, and other interactive elements to see how they work together.',
      },
    },
  },
};

export const CompactLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'laptop',
    },
    docs: {
      description: {
        story: 'Dashboard on laptop screens showing the compact layout with all panels visible side by side.',
      },
    },
  },
};