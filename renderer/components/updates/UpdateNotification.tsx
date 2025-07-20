import React, { useState, useEffect } from 'react';

interface UpdateInfo {
  updateAvailable: boolean;
  updateDownloaded: boolean;
  version?: string;
  releaseNotes?: string;
  progress?: number;
  error?: string;
}

interface UpdateNotificationProps {
  onClose: () => void;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({ onClose }) => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Listen for update status changes
    const cleanup = window.ipc.on('update-status', (info: UpdateInfo) => {
      setUpdateInfo(info);
      setIsDownloading(false);
      setIsChecking(false);
    });

    // Get initial update info
    getUpdateInfo();

    return cleanup;
  }, []);

  const getUpdateInfo = async () => {
    try {
      const result = await window.ipc.update.getUpdateInfo();
      if (result.success) {
        setUpdateInfo(result.updateInfo);
      }
    } catch (error) {
      console.error('Failed to get update info:', error);
    }
  };

  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      const result = await window.ipc.update.checkForUpdates();
      if (!result.success) {
        console.error('Update check failed:', result.error);
      }
    } catch (error) {
      console.error('Update check error:', error);
    }
  };

  const downloadUpdate = async () => {
    setIsDownloading(true);
    try {
      const result = await window.ipc.update.downloadUpdate();
      if (!result.success) {
        console.error('Update download failed:', result.error);
        setIsDownloading(false);
      }
    } catch (error) {
      console.error('Update download error:', error);
      setIsDownloading(false);
    }
  };

  const installUpdate = async () => {
    try {
      await window.ipc.update.installUpdate();
    } catch (error) {
      console.error('Update install error:', error);
    }
  };

  if (!updateInfo) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            App Update
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          ×
        </button>
      </div>

      {updateInfo.error && (
        <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-400">
          {updateInfo.error}
        </div>
      )}

      {!updateInfo.updateAvailable && !updateInfo.error && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            You're running the latest version.
          </p>
          <button
            onClick={checkForUpdates}
            disabled={isChecking}
            className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isChecking ? 'Checking...' : 'Check for Updates'}
          </button>
        </div>
      )}

      {updateInfo.updateAvailable && !updateInfo.updateDownloaded && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Version {updateInfo.version} is available.
          </p>
          {updateInfo.releaseNotes && (
            <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 max-h-20 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{updateInfo.releaseNotes}</pre>
            </div>
          )}
          
          {isDownloading && updateInfo.progress !== undefined && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                <span>Downloading...</span>
                <span>{updateInfo.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${updateInfo.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <button
            onClick={downloadUpdate}
            disabled={isDownloading}
            className="w-full px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? 'Downloading...' : 'Download Update'}
          </button>
        </div>
      )}

      {updateInfo.updateDownloaded && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Update downloaded! Restart to install version {updateInfo.version}.
          </p>
          <button
            onClick={installUpdate}
            className="w-full px-3 py-2 text-sm bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Restart & Install
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateNotification;