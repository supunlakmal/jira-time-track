import React, { useState, useEffect } from 'react';

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResetPreview {
  totalSessions: number;
  totalProjectData: number;
  totalManualTasks: number;
  totalProjectPaths: number;
}

interface ResetOptions {
  sessions: boolean;
  projectData: boolean;
  manualTasks: boolean;
  projectPaths: boolean;
}

export const ResetDialog: React.FC<ResetDialogProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [resetOptions, setResetOptions] = useState<ResetOptions>({
    sessions: false,
    projectData: false,
    manualTasks: false,
    projectPaths: false
  });
  const [resetPreview, setResetPreview] = useState<ResetPreview | null>(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      loadResetPreview();
      setStep(1);
      setResetOptions({
        sessions: false,
        projectData: false,
        manualTasks: false,
        projectPaths: false
      });
      setConfirmationText('');
    }
  }, [isOpen]);

  const loadResetPreview = async () => {
    try {
      const preview = await window.ipc.invoke('get-reset-preview');
      setResetPreview(preview);
    } catch (error) {
      console.error('Failed to load reset preview:', error);
    }
  };

  const handleOptionChange = (option: keyof ResetOptions) => {
    setResetOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const getSelectedOptionsCount = () => {
    return Object.values(resetOptions).filter(Boolean).length;
  };

  const handleNext = () => {
    if (step === 1 && getSelectedOptionsCount() > 0) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = async () => {
    if (confirmationText !== 'RESET') {
      return;
    }

    setIsResetting(true);
    try {
      const result = await window.ipc.invoke('reset-data', resetOptions);
      
      if (result.success) {
        alert('Application data has been successfully reset!');
        onClose();
      } else {
        alert(`Reset failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Reset failed: ${error.message}`);
    } finally {
      setIsResetting(false);
    }
  };

  const getDataCounts = () => {
    if (!resetPreview) return null;
    
    const counts: Array<{ label: string; count: number; selected: boolean }> = [];
    
    if (resetOptions.sessions) {
      counts.push({ label: 'Timer Sessions', count: resetPreview.totalSessions, selected: true });
    }
    if (resetOptions.projectData) {
      counts.push({ label: 'Project Data (CSV)', count: resetPreview.totalProjectData, selected: true });
    }
    if (resetOptions.manualTasks) {
      counts.push({ label: 'Manual Tasks', count: resetPreview.totalManualTasks, selected: true });
    }
    if (resetOptions.projectPaths) {
      counts.push({ label: 'Project Paths', count: resetPreview.totalProjectPaths, selected: true });
    }
    
    return counts;
  };

  if (!isOpen) return null;

  const bgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderClass = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  const inputBgClass = isDarkMode ? 'bg-gray-700' : 'bg-white';
  const buttonSecondaryClass = isDarkMode 
    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
    : 'bg-gray-200 hover:bg-gray-300 text-gray-700';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${bgClass} rounded-lg p-6 max-w-md w-full mx-4`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${textClass}`}>
            Reset Application Data
          </h2>
          <button
            onClick={onClose}
            className={`${textSecondaryClass} hover:${textClass} text-xl`}
          >
            ×
          </button>
        </div>

        {/* Step 1: Select Reset Options */}
        {step === 1 && (
          <div className="space-y-4">
            <div className={`p-4 bg-red-50 ${isDarkMode ? 'bg-red-900' : ''} rounded-lg border border-red-200`}>
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                  Warning: This action cannot be undone
                </span>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textSecondaryClass} mb-3`}>
                Select data to reset:
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resetOptions.sessions}
                    onChange={() => handleOptionChange('sessions')}
                    className="mr-3"
                  />
                  <span className={textSecondaryClass}>
                    Timer Sessions ({resetPreview?.totalSessions || 0})
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resetOptions.projectData}
                    onChange={() => handleOptionChange('projectData')}
                    className="mr-3"
                  />
                  <span className={textSecondaryClass}>
                    Project Data from CSV ({resetPreview?.totalProjectData || 0})
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resetOptions.manualTasks}
                    onChange={() => handleOptionChange('manualTasks')}
                    className="mr-3"
                  />
                  <span className={textSecondaryClass}>
                    Manual Tasks ({resetPreview?.totalManualTasks || 0})
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={resetOptions.projectPaths}
                    onChange={() => handleOptionChange('projectPaths')}
                    className="mr-3"
                  />
                  <span className={textSecondaryClass}>
                    Project Paths ({resetPreview?.totalProjectPaths || 0})
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Preview */}
        {step === 2 && (
          <div className="space-y-4">
            <div className={`p-4 bg-yellow-50 ${isDarkMode ? 'bg-yellow-900' : ''} rounded-lg border border-yellow-200`}>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">⚠️</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                  The following data will be permanently deleted:
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {getDataCounts()?.map((item, index) => (
                <div key={index} className={`flex justify-between p-3 rounded border ${borderClass}`}>
                  <span className={textSecondaryClass}>{item.label}</span>
                  <span className={`font-medium ${textClass}`}>{item.count} items</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <div className={`p-4 bg-red-50 ${isDarkMode ? 'bg-red-900' : ''} rounded-lg border border-red-200`}>
              <div className="flex items-center mb-2">
                <span className="text-red-500 mr-2">🚨</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-red-200' : 'text-red-800'}`}>
                  Final Confirmation Required
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                This action cannot be undone. All selected data will be permanently deleted.
              </p>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textSecondaryClass} mb-2`}>
                Type "RESET" to confirm (case-sensitive):
              </label>
              <input
                type="text"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className={`w-full border ${borderClass} rounded px-3 py-2 ${inputBgClass} ${textClass}`}
                placeholder="RESET"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <div>
            {step > 1 && (
              <button
                onClick={handleBack}
                className={`px-4 py-2 ${buttonSecondaryClass} rounded transition-colors`}
                disabled={isResetting}
              >
                Back
              </button>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className={`px-4 py-2 ${buttonSecondaryClass} rounded transition-colors`}
              disabled={isResetting}
            >
              Cancel
            </button>
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && getSelectedOptionsCount() === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleReset}
                disabled={confirmationText !== 'RESET' || isResetting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isResetting ? 'Resetting...' : 'Reset Data'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};