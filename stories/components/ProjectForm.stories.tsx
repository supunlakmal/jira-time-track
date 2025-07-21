import type { Meta, StoryObj } from '@storybook/react';
import { ProjectForm } from '../../renderer/components/projects/ProjectForm';
import { ProjectStatus } from '../../renderer/constants/projectStatus';

const meta: Meta<typeof ProjectForm> = {
  title: 'Projects/ProjectForm',
  component: ProjectForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    initialValues: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof ProjectForm>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
  },
};

export const WithInitialValues: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
    initialValues: {
      name: 'Existing Project',
      description: 'This is a pre-filled project description.',
      client: 'Acme Corp',
      budget: 15000,
      startDate: '2025-01-01',
      deadline: '2025-06-30',
      status: ProjectStatus.InProgress,
      progress: 50,
    },
  },
};

export const EmptyForm: Story = {
  args: {
    onSubmit: (data) => console.log('Form submitted:', data),
    onCancel: () => console.log('Form cancelled'),
    initialValues: {},
  },
};
