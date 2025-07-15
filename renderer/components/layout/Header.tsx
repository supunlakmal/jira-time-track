import React from "react";
import { ZoomControls } from "../ui/ZoomControls";

interface HeaderProps {
  toggleFloatingWindow: () => void;
  setShowManualTaskDialog: (show: boolean) => void;
  setShowCsvImportDialog: (show: boolean) => void;
  setShowExportDialog: (show: boolean) => void;
  setShowResetDialog: (show: boolean) => void;
  setShowJiraSettingsDialog: (show: boolean) => void;
  setShowBillingDialog: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <ZoomControls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
