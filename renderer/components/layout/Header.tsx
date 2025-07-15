import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { ThemeToggle } from "../theme/ThemeToggle";

interface HeaderProps {
  toggleFloatingWindow: () => void;
  setShowManualTaskDialog: (show: boolean) => void;
  setShowCsvImportDialog: (show: boolean) => void;
  setShowExportDialog: (show: boolean) => void;
  setShowResetDialog: (show: boolean) => void;
  setShowJiraSettingsDialog: (show: boolean) => void;
  setShowBillingDialog: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleFloatingWindow,
  setShowManualTaskDialog,
  setShowCsvImportDialog,
  setShowExportDialog,
  setShowResetDialog,
  setShowJiraSettingsDialog,
  setShowBillingDialog,
}) => {
  return (
    <div className="mb-8">
      {/* Header Container */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Side - Logo and Title */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="flex-shrink-0"
          />
          <h1 className="text-sm font-bold text-gray-900 dark:text-white">
            Project Time Tracker
          </h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* <Button
              onClick={toggleFloatingWindow}
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              Toggle Floating Timer
            </Button>*/}
            <Button
              onClick={() => setShowManualTaskDialog(true)}
              variant="primary"
              size="sm"
              title="Add a manual task"
              className="w-full sm:w-auto"
            >
              Add Manual Task
            </Button>
          </div>

          {/* Data Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={() => setShowBillingDialog(true)}
              variant="primary"
              size="sm"
              title="Manage billing, rates, and invoices"
              className="w-full sm:w-auto"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Billing
            </Button>
            <Button
              onClick={() => setShowJiraSettingsDialog(true)}
              variant="primary"
              size="sm"
              title="Configure Jira integration and import issues"
              className="w-full sm:w-auto"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Jira Settings
            </Button>
            <Button
              onClick={() => setShowCsvImportDialog(true)}
              variant="primary"
              size="sm"
              title="Import tasks from CSV file"
              className="w-full sm:w-auto"
            >
              Import CSV
            </Button>
            <Button
              onClick={() => setShowExportDialog(true)}
              variant="primary"
              size="sm"
              title="Export time tracking data"
              className="w-full sm:w-auto"
            >
              Export Data
            </Button>
            <Button
              onClick={() => setShowResetDialog(true)}
              variant="primary"
              size="sm"
              title="Reset application data"
              className="w-full sm:w-auto"
            >
              Reset Data
            </Button>
          </div>

          {/* Settings Controls */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ThemeToggle size="md" />

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white dark:bg-gray-800 dark:border-gray-600">
              <Button
                onClick={() => window.ipc?.zoom?.out()}
                variant="gray"
                size="icon"
                className="w-10 h-10"
                title="Zoom out (Ctrl+-)"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => window.ipc?.zoom?.reset()}
                variant="gray"
                size="icon"
                className="w-10 h-10"
                title="Reset zoom (Ctrl+0)"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => window.ipc?.zoom?.in()}
                variant="gray"
                size="icon"
                className="w-10 h-10"
                title="Zoom in (Ctrl+=)"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
