import React, { useState } from 'react';

interface BreakSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;
  enabled: boolean;
}

interface BreakSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: BreakSettings;
  onSave: (settings: BreakSettings) => void;
}

export const BreakSettingsDialog: React.FC<BreakSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleCancel = () => {
    setLocalSettings(settings); // Reset to original settings
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Break Timer Settings</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Enable/Disable */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="font-medium text-gray-700">Enable Break Reminders</label>
              <p className="text-sm text-gray-500">Get notified when it's time to take a break</p>
            </div>
            <input
              type="checkbox"
              checked={localSettings.enabled}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, enabled: e.target.checked }))}
              className="w-5 h-5 text-blue-600 rounded"
            />
          </div>

          {/* Work Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Duration: {localSettings.workDuration} minutes
            </label>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={localSettings.workDuration}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, workDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={!localSettings.enabled}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15 min</span>
              <span>90 min</span>
            </div>
          </div>

          {/* Short Break Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Break Duration: {localSettings.shortBreakDuration} minutes
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={localSettings.shortBreakDuration}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, shortBreakDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={!localSettings.enabled}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>3 min</span>
              <span>15 min</span>
            </div>
          </div>

          {/* Long Break Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Duration: {localSettings.longBreakDuration} minutes
            </label>
            <input
              type="range"
              min="10"
              max="30"
              step="5"
              value={localSettings.longBreakDuration}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, longBreakDuration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={!localSettings.enabled}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10 min</span>
              <span>30 min</span>
            </div>
          </div>

          {/* Long Break Interval */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Interval: Every {localSettings.longBreakInterval} work sessions
            </label>
            <input
              type="range"
              min="2"
              max="8"
              step="1"
              value={localSettings.longBreakInterval}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, longBreakInterval: parseInt(e.target.value) }))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={!localSettings.enabled}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Every 2</span>
              <span>Every 8</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Regular breaks help maintain focus and prevent burnout. 
              The Pomodoro Technique suggests 25-minute work sessions with 5-minute breaks.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};