import type { Meta, StoryObj, StoryContext } from '@storybook/react';
import { ThemeToggle } from '../../renderer/components/ThemeToggle';
import { useTheme } from '../../renderer/hooks/useTheme';

interface ThemeToggleStoryArgs extends React.ComponentProps<typeof ThemeToggle> {
  initialTheme?: 'light' | 'dark' | 'system';
  initialResolvedTheme?: 'light' | 'dark';
}

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    className: {
      control: 'text',
    },
  },
  decorators: [
    (Story, context: StoryContext<ThemeToggleStoryArgs>) => {
      // Mock the useTheme hook for each story
      (useTheme as any).mockReturnValue({
        theme: context.args.initialTheme || 'system',
        resolvedTheme: context.args.initialResolvedTheme || 'light',
        setTheme: (newTheme: any) => console.log('Set theme:', newTheme),
        mounted: true,
      });
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<ThemeToggleStoryArgs>;

export const LightTheme: Story = {
  args: {
    initialTheme: 'light',
    initialResolvedTheme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    initialTheme: 'dark',
    initialResolvedTheme: 'dark',
  },
};

export const SystemThemeLight: Story = {
  args: {
    initialTheme: 'system',
    initialResolvedTheme: 'light',
  },
};

export const SystemThemeDark: Story = {
  args: {
    initialTheme: 'system',
    initialResolvedTheme: 'dark',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    initialTheme: 'light',
    initialResolvedTheme: 'light',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    initialTheme: 'dark',
    initialResolvedTheme: 'dark',
  },
};
