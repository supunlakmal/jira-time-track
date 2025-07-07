
import React from 'react';
import Image from 'next/image';
import Button from './Button';
import { ThemeToggle } from './ThemeToggle';

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
    <div className="text-center mb-8">
      <Image
        className="mx-auto mb-4"
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
      />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Project Time Tracker Dashboard
      </h1>
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={toggleFloatingWindow} variant="primary" size="lg">
          Toggle Floating Timer
        </Button>
        <Button
          onClick={() => setShowManualTaskDialog(true)}
          variant="secondary"
          size="lg"
          title="Add a manual task"
        >
          Add Manual Task
        </Button>
        <Button
          onClick={() => setShowCsvImportDialog(true)}
          variant="warning"
          size="lg"
          title="Import tasks from CSV file"
        >
          Import CSV
        </Button>
        <Button
          onClick={() => setShowExportDialog(true)}
          variant="success"
          size="lg"
          title="Export time tracking data"
        >
          Export Data
        </Button>
        <Button
          onClick={() => setShowResetDialog(true)}
          variant="danger"
          size="lg"
          title="Reset application data"
        >
          Reset Data
        </Button>
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
  );
};

export default Header;
