import React from "react";
import Button from "./Button";
import { IpcHandler } from "../types/electron";

interface FloatingWindowHeaderProps {
  selectedTicketNumber: string | null;
  timersLength: number;
  setIsDragging: (isDragging: boolean) => void;
  handleClose: () => void;
  ipc?: IpcHandler; // Add optional ipc prop
}

const FloatingWindowHeader: React.FC<FloatingWindowHeaderProps> = ({
  selectedTicketNumber,
  timersLength,
  setIsDragging,
  handleClose,
  ipc, // Destructure ipc prop
}) => {
  return (
    <div
      className="bg-gray-800 dark:bg-gray-900 text-white p-2 flex justify-between items-center cursor-move flex-shrink-0"
      onMouseDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
      <div className="text-sm font-semibold">
        <div>
          Time Tracker{" "}
          {selectedTicketNumber
            ? `(${selectedTicketNumber})`
            : timersLength > 0
            ? `(${timersLength} task${timersLength > 1 ? "s" : ""})`
            : ""}
        </div>
      </div>
      <div className="flex space-x-2">
        {/* REUSABLE COMPONENT: ZoomControls */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded px-1">
          <Button
            onClick={() => (ipc || window.ipc)?.zoom?.out()}
            variant="gray"
            size="icon"
            className="w-5 h-5 text-xs"
            title="Zoom out (Ctrl+-)"
          >
            -
          </Button>
          <Button
            onClick={() => (ipc || window.ipc)?.zoom?.reset()}
            variant="gray"
            size="icon"
            className="w-5 h-5 text-xs"
            title="Reset zoom (Ctrl+0)"
          >
            ⊙
          </Button>
          <Button
            onClick={() => (ipc || window.ipc)?.zoom?.in()}
            variant="gray"
            size="icon"
            className="w-5 h-5 text-xs"
            title="Zoom in (Ctrl+=)"
          >
            +
          </Button>
        </div>
        <Button
          onClick={handleClose}
          variant="danger"
          size="icon"
          className="w-6 h-6 text-xs hover:bg-red-500"
          title="Close"
        >
          ×
        </Button>
      </div>
    </div>
  );
};

export default FloatingWindowHeader;
