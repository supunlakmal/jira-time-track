import { useState, useEffect } from 'react';

interface UpdateInfo {
  updateAvailable: boolean;
  updateDownloaded: boolean;
  version?: string;
  releaseNotes?: string;
  progress?: number;
  error?: string;
}

export const useUpdates = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>({
    updateAvailable: false,
    updateDownloaded: false,
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Listen for update status changes
    const cleanup = window.ipc.on('update-status', (info: UpdateInfo) => {
      setUpdateInfo(info);
      
      // Show notification when update becomes available or is downloaded
      if (info.updateAvailable && !updateInfo.updateAvailable) {
        setShowNotification(true);
      }
      if (info.updateDownloaded && !updateInfo.updateDownloaded) {
        setShowNotification(true);
      }
    });

    // Get initial update info
    getUpdateInfo();

    return cleanup;
  }, [updateInfo.updateAvailable, updateInfo.updateDownloaded]);

  const getUpdateInfo = async () => {
    try {
      const result = await window.ipc.update.getUpdateInfo();
      if (result.success) {
        setUpdateInfo(result.updateInfo);
        
        // Show notification if there's an available or downloaded update
        if (result.updateInfo.updateAvailable) {
          setShowNotification(true);
        }
      }
    } catch (error) {
      console.error('Failed to get update info:', error);
    }
  };

  const checkForUpdates = async () => {
    try {
      const result = await window.ipc.update.checkForUpdates();
      return result;
    } catch (error) {
      console.error('Update check error:', error);
      return { success: false, error: error.message };
    }
  };

  const downloadUpdate = async () => {
    try {
      const result = await window.ipc.update.downloadUpdate();
      return result;
    } catch (error) {
      console.error('Update download error:', error);
      return { success: false, error: error.message };
    }
  };

  const installUpdate = async () => {
    try {
      const result = await window.ipc.update.installUpdate();
      return result;
    } catch (error) {
      console.error('Update install error:', error);
      return { success: false, error: error.message };
    }
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };

  const showUpdateNotification = () => {
    setShowNotification(true);
  };

  return {
    updateInfo,
    showNotification,
    checkForUpdates,
    downloadUpdate,
    installUpdate,
    dismissNotification,
    showUpdateNotification,
  };
};

export default useUpdates;