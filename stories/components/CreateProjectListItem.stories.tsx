import type { Meta, StoryObj } from '@storybook/react';
import { CreateProjectListItem } from '../../renderer/components/projects/CreateProjectListItem';

const meta: Meta<typeof CreateProjectListItem> = {
  title: 'Projects/CreateProjectListItem',
  component: CreateProjectListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof CreateProjectListItem>;

export const Default: Story = {
  args: {
    onClick: () => console.log('Create project list item clicked'),
  },
};
