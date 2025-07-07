import type { Meta, StoryObj } from '@storybook/react';
import Header from '../../renderer/components/layout/Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    toggleFloatingWindow: { action: 'toggleFloatingWindow' },
    setShowManualTaskDialog: { action: 'setShowManualTaskDialog' },
    setShowCsvImportDialog: { action: 'setShowCsvImportDialog' },
    setShowExportDialog: { action: 'setShowExportDialog' },
    setShowResetDialog: { action: 'setShowResetDialog' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    toggleFloatingWindow: () => console.log('Toggle Floating Window'),
    setShowManualTaskDialog: (show) => console.log('Set Show Manual Task Dialog:', show),
    setShowCsvImportDialog: (show) => console.log('Set Show CSV Import Dialog:', show),
    setShowExportDialog: (show) => console.log('Set Show Export Dialog:', show),
    setShowResetDialog: (show) => console.log('Set Show Reset Dialog:', show),
  },
  render: (args) => {
    // Mock window.ipc for Storybook environment
    if (typeof window !== 'undefined') {
      window.ipc = {
        zoom: {
          in: () => { console.log('Zoom In'); return Promise.resolve(); },
          out: () => { console.log('Zoom Out'); return Promise.resolve(); },
          reset: () => { console.log('Reset Zoom'); return Promise.resolve(); },
          getLevel: () => { console.log('Get Zoom Level'); return Promise.resolve(1); },
        },
        send: (channel, ...args) => console.log(`IPC Send: ${channel}`, args),
        invoke: (channel, ...args) => {
          console.log(`IPC Invoke: ${channel}`, args);
          return Promise.resolve({});
        },
        on: (channel, listener) => {
          console.log(`IPC On: ${channel}`);
          return () => {};
        },
        window: {
          minimize: () => {},
          maximize: () => {},
          close: () => {},
          hide: () => {},
          show: () => {},
        },
      };
    }
    return <Header {...args} />;
  },
};
