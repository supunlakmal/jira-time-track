import type { Meta, StoryObj } from '@storybook/react';
import ReduxDataViewer from '../../renderer/components/debug/ReduxDataViewer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import sessionsReducer from '../../renderer/store/sessionsSlice';

// Mock Redux store for Storybook
const mockStore = configureStore({
  reducer: {
    sessions: sessionsReducer,
  },
  preloadedState: {
    sessions: {
      sessions: {
        'PROJ-1': {
          ticketNumber: 'PROJ-1',
          ticketName: 'Implement Login',
          storyPoints: 5,
          sessions: [
            { startTime: Date.now() - 3600000, endTime: Date.now() - 1800000, duration: 1800000, status: 'completed' },
            { startTime: Date.now() - 600000, duration: 600000, status: 'running' },
          ],
          totalElapsed: 2400000,
        },
        'PROJ-2': {
          ticketNumber: 'PROJ-2',
          ticketName: 'Fix Bug',
          storyPoints: 3,
          sessions: [
            { startTime: Date.now() - 7200000, endTime: Date.now() - 5400000, duration: 1800000, status: 'paused' },
          ],
          totalElapsed: 1800000,
        },
      },
    },
  },
});

const meta: Meta<typeof ReduxDataViewer> = {
  title: 'Debug/ReduxDataViewer',
  component: ReduxDataViewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReduxDataViewer>;

export const Default: Story = {
  args: {
    className: 'w-full',
  },
};
