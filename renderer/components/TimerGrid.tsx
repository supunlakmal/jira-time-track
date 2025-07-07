import React from "react";
import { TaskTimer } from "../types/dashboard";
import TimerGridItem from "./TimerGridItem";

interface TimerGridProps {
  timers: TaskTimer[];
  formatTime: (ms: number) => string;
  getMinimalStatusColorClass: (
    status: TaskTimer["status"],
    isRunning: boolean
  ) => string;
  getStatusText: (status: TaskTimer["status"], isRunning: boolean) => string;
  setSelectedTicketNumber: (ticketNumber: string | null) => void;
}

const TimerGrid: React.FC<TimerGridProps> = ({
  timers,
  formatTime,
  getMinimalStatusColorClass,
  getStatusText,
  setSelectedTicketNumber,
}) => {
  return (
    <div className="space-y-2">
      {timers.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          No active timers. Start one from the main app.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {timers.map((timer) => (
            <TimerGridItem
              key={timer.ticketNumber}
              timer={timer}
              formatTime={formatTime}
              getMinimalStatusColorClass={getMinimalStatusColorClass}
              getStatusText={getStatusText}
              setSelectedTicketNumber={setSelectedTicketNumber}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerGrid;
