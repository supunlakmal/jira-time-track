import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UpdateNotification from '../../renderer/components/updates/UpdateNotification';

interface UpdateInfo {
  updateAvailable: boolean;
  updateDownloaded: boolean;
  version?: string;
  releaseNotes?: string;
  progress?: number;
  error?: string;
}

// Helper function to create mock IPC
const createMockIpc = (updateInfo: UpdateInfo, shouldFail = false) => ({
  on: (channel: string, listener: any) => {
    if (channel === 'update-status') {
      setTimeout(() => listener(updateInfo), 100);
    }
    return () => {};
  },
  update: {
    getUpdateInfo: async () => ({
      success: !shouldFail,
      updateInfo: shouldFail ? null : updateInfo,
    }),
    checkForUpdates: async () => ({ 
      success: !shouldFail, 
      error: shouldFail ? 'Network error' : undefined 
    }),
    downloadUpdate: async () => ({ 
      success: !shouldFail,
      error: shouldFail ? 'Download failed' : undefined 
    }),
    installUpdate: async () => ({ 
      success: !shouldFail,
      error: shouldFail ? 'Install failed' : undefined 
    }),
  },
});

const meta: Meta<typeof UpdateNotification> = {
  title: 'components/updates/UpdateNotification',
  component: UpdateNotification,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'onClose' },
  },
};

export default meta;
type Story = StoryObj<typeof UpdateNotification>;

export const NoUpdateAvailable: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = createMockIpc({
          updateAvailable: false,
          updateDownloaded: false,
        }) as any;
      }
      return <Story />;
    },
  ],
};

export const UpdateAvailable: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = createMockIpc({
          updateAvailable: true,
          updateDownloaded: false,
          version: '1.2.3',
          releaseNotes: 'New Features:\n• Improved performance\n• Bug fixes\n• Enhanced UI\n\nBreaking Changes:\n• None',
        }) as any;
      }
      return <Story />;
    },
  ],
};

export const UpdateDownloading: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        let progress = 0;
        const updateInfo = {
          updateAvailable: true,
          updateDownloaded: false,
          version: '1.2.3',
          releaseNotes: 'Downloading update...',
          progress: 0,
        };

        window.ipc = {
          on: (channel: string, listener: any) => {
            if (channel === 'update-status') {
              // Simulate download progress
              const interval = setInterval(() => {
                progress += 10;
                listener({ ...updateInfo, progress: Math.min(progress, 100) });
                if (progress >= 100) {
                  clearInterval(interval);
                }
              }, 500);
            }
            return () => {};
          },
          update: {
            getUpdateInfo: async () => ({
              success: true,
              updateInfo,
            }),
            checkForUpdates: async () => ({ success: true }),
            downloadUpdate: async () => ({ success: true }),
            installUpdate: async () => ({ success: true }),
          },
        } as any;
      }
      return <Story />;
    },
  ],
};

export const UpdateDownloaded: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = createMockIpc({
          updateAvailable: true,
          updateDownloaded: true,
          version: '1.2.3',
          releaseNotes: 'Update ready to install!',
        }) as any;
      }
      return <Story />;
    },
  ],
};

export const UpdateError: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = createMockIpc({
          updateAvailable: false,
          updateDownloaded: false,
          error: 'Failed to check for updates. Please check your internet connection.',
        }) as any;
      }
      return <Story />;
    },
  ],
};

export const NetworkError: Story = {
  args: {
    onClose: () => console.log('close'),
  },
  decorators: [
    (Story) => {
      if (typeof window !== 'undefined') {
        window.ipc = createMockIpc({
          updateAvailable: false,
          updateDownloaded: false,
        }, true) as any;
      }
      return <Story />;
    },
  ],
};

// Default story for backward compatibility
export const Default: Story = UpdateAvailable;
