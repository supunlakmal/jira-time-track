import React from "react";
import Image from "next/image";
import Button from "./Button";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  toggleFloatingWindow: () => void;
  setShowManualTaskDialog: (show: boolean) => void;
  setShowCsvImportDialog: (show: boolean) => void;
  setShowExportDialog: (show: boolean) => void;
  setShowResetDialog: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleFloatingWindow,
  setShowManualTaskDialog,
  setShowCsvImportDialog,
  setShowExportDialog,
  setShowResetDialog,
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
            width={80}
            height={80}
            className="flex-shrink-0"
          />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
        </div>

        {/* Right Side - Actions */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              onClick={toggleFloatingWindow}
              variant="primary"
              size="sm"
              className="w-full sm:w-auto"
            >
              Toggle Floating Timer
            </Button>
            <Button
              onClick={() => setShowManualTaskDialog(true)}
              variant="secondary"
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
              onClick={() => setShowCsvImportDialog(true)}
              variant="warning"
              size="sm"
              title="Import tasks from CSV file"
              className="w-full sm:w-auto"
            >
              Import CSV
            </Button>
            <Button
              onClick={() => setShowExportDialog(true)}
              variant="success"
              size="sm"
              title="Export time tracking data"
              className="w-full sm:w-auto"
            >
              Export Data
            </Button>
            <Button
              onClick={() => setShowResetDialog(true)}
              variant="danger"
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
