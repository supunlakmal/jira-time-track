import React from 'react';

interface BreakReminderProps {
  isVisible: boolean;
  breakType: 'short' | 'long' | null;
  onStartBreak: () => void;
  onSkipBreak: () => void;
  onSettings: () => void;
}

export const BreakReminder: React.FC<BreakReminderProps> = ({
  isVisible,
  breakType,
  onStartBreak,
  onSkipBreak,
  onSettings
}) => {
  if (!isVisible) return null;

  const breakDuration = breakType === 'long' ? '15' : '5';
  const breakTitle = breakType === 'long' ? 'Long Break Time!' : 'Short Break Time!';
  const breakIcon = breakType === 'long' ? '\uD83D\uDECB\uFE0F' : '\u2615';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="text-4xl mb-4">{breakIcon}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{breakTitle}</h2>
          <p className="text-gray-600 mb-4">
            You've been working hard! Time for a {breakDuration}-minute break to recharge.
          </p>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>Break Tips:</strong>
              {breakType === 'long' ? (
                <span> Take a walk, stretch, or grab a healthy snack. Step away from your screen!</span>
              ) : (
                <span> Stand up, stretch your neck and shoulders, or do some deep breathing.</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onStartBreak}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
          >
            Start {breakDuration}min Break
          </button>
          <button
            onClick={onSkipBreak}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
          >
            Skip Break
          </button>
        </div>
        
        <button
          onClick={onSettings}
          className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Settings
        </button>
      </div>
    </div>
  );
};