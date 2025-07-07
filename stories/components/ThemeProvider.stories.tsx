import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../renderer/components/ThemeProvider';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Theme Provider Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This component provides theme context to its children. 
          The theme can be toggled between light, dark, and system modes.
        </p>
        <div className="flex space-x-4">
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white">Light Content</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This content adapts to the current theme
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white">Dark Content</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Notice how colors change based on theme
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithNestedComponents: Story = {
  args: {
    children: (
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nested Components Example
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Form Elements</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Text input"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Button
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Status Indicators</h3>
            <div className="flex space-x-2">
              <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-800 rounded">
                Active
              </span>
              <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-800 rounded">
                Pending
              </span>
              <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-800 rounded">
                Error
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};