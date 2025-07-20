import Head from "next/head";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";

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

export default function ResetDataPage() {
  const [step, setStep] = useState(1);
  const [resetOptions, setResetOptions] = useState<ResetOptions>({
    sessions: false,
    projectData: false,
    manualTasks: false,
    projectPaths: false,
  });
  const [resetPreview, setResetPreview] = useState<ResetPreview | null>(null);
  const [confirmationText, setConfirmationText] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    loadResetPreview();
  }, []);

  const loadResetPreview = async () => {
    try {
      const preview = await window.ipc.invoke("get-reset-preview");
      setResetPreview(preview);
    } catch (error) {
      console.error("Failed to load reset preview:", error);
    }
  };

  const handleOptionChange = (option: keyof ResetOptions) => {
    setResetOptions((prev) => ({ ...prev, [option]: !prev[option] }));
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
    if (confirmationText !== "RESET") {
      return;
    }

    setIsResetting(true);
    try {
      const result = await window.ipc.invoke("reset-data", resetOptions);

      if (result.success) {
        alert("Application data has been successfully reset!");
        // Reset form state
        setStep(1);
        setResetOptions({
          sessions: false,
          projectData: false,
          manualTasks: false,
          projectPaths: false,
        });
        setConfirmationText("");
        loadResetPreview();
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

    const counts: Array<{ label: string; count: number; selected: boolean }> =
      [];

    if (resetOptions.sessions) {
      counts.push({
        label: "Timer Sessions",
        count: resetPreview.totalSessions,
        selected: true,
      });
    }
    if (resetOptions.projectData) {
      counts.push({
        label: "Project Data (CSV)",
        count: resetPreview.totalProjectData,
        selected: true,
      });
    }
    if (resetOptions.manualTasks) {
      counts.push({
        label: "Manual Tasks",
        count: resetPreview.totalManualTasks,
        selected: true,
      });
    }
    if (resetOptions.projectPaths) {
      counts.push({
        label: "Project Paths",
        count: resetPreview.totalProjectPaths,
        selected: true,
      });
    }

    return counts;
  };

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const borderClass = isDarkMode ? "border-gray-600" : "border-gray-300";
  const inputBgClass = isDarkMode ? "bg-gray-700" : "bg-white";

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Reset Data - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reset Application Data
          </h1>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Select Options</span>
              </div>
              <div className={`w-8 h-0.5 ${
                step >= 2 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'
              }`}></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Preview</span>
              </div>
              <div className={`w-8 h-0.5 ${
                step >= 3 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-200 dark:bg-gray-600'
              }`}></div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {/* Step 1: Select Reset Options */}
            {step === 1 && (
              <div className="space-y-4">
                <div
                  className={`p-4 bg-red-50 ${
                    isDarkMode ? "bg-red-900" : ""
                  } rounded-lg border border-red-200`}
                >
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">⚠️</span>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-red-200" : "text-red-800"
                      }`}
                    >
                      Warning: This action cannot be undone
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${textSecondaryClass} mb-3`}
                  >
                    Select data to reset:
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={resetOptions.sessions}
                        onChange={() => handleOptionChange("sessions")}
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
                        onChange={() => handleOptionChange("projectData")}
                        className="mr-3"
                      />
                      <span className={textSecondaryClass}>
                        Project Data from CSV ({resetPreview?.totalProjectData || 0}
                        )
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={resetOptions.manualTasks}
                        onChange={() => handleOptionChange("manualTasks")}
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
                        onChange={() => handleOptionChange("projectPaths")}
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
                <div
                  className={`p-4 bg-yellow-50 ${
                    isDarkMode ? "bg-yellow-900" : ""
                  } rounded-lg border border-yellow-200`}
                >
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-2">⚠️</span>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-yellow-200" : "text-yellow-800"
                      }`}
                    >
                      The following data will be permanently deleted:
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {getDataCounts()?.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between p-3 rounded border ${borderClass}`}
                    >
                      <span className={textSecondaryClass}>{item.label}</span>
                      <span className={`font-medium ${textClass}`}>
                        {item.count} items
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Final Confirmation */}
            {step === 3 && (
              <div className="space-y-4">
                <div
                  className={`p-4 bg-red-50 ${
                    isDarkMode ? "bg-red-900" : ""
                  } rounded-lg border border-red-200`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-red-500 mr-2">🚨</span>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-red-200" : "text-red-800"
                      }`}
                    >
                      Final Confirmation Required
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-red-300" : "text-red-700"
                    }`}
                  >
                    This action cannot be undone. All selected data will be
                    permanently deleted.
                  </p>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${textSecondaryClass} mb-2`}
                  >
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
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {step > 1 && (
                <Button
                  onClick={handleBack}
                  variant="gray"
                  size="md"
                  disabled={isResetting}
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex space-x-3">
              {step < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={step === 1 && getSelectedOptionsCount() === 0}
                  variant="primary"
                  size="md"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleReset}
                  disabled={confirmationText !== "RESET" || isResetting}
                  variant="danger"
                  size="md"
                  loading={isResetting}
                >
                  {isResetting ? "Resetting..." : "Reset Data"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}