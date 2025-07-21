import type { Meta, StoryObj } from '@storybook/react';
import { CreateProjectCard } from '../../renderer/components/projects/CreateProjectCard';

const meta: Meta<typeof CreateProjectCard> = {
  title: 'Projects/CreateProjectCard',
  component: CreateProjectCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CreateProjectCard>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Create project card clicked'),
  },
};
