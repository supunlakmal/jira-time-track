import React from "react";
import Button from "./Button";
import { TaskTimer } from "../types/dashboard";

interface TimerGridItemProps {
  timer: TaskTimer;
  formatTime: (ms: number) => string;
  getMinimalStatusColorClass: (
    status: TaskTimer["status"],
    isRunning: boolean
  ) => string;
  getStatusText: (status: TaskTimer["status"], isRunning: boolean) => string;
  setSelectedTicketNumber: (ticketNumber: string | null) => void;
}

const TimerGridItem: React.FC<TimerGridItemProps> = ({
  timer,
  formatTime,
  getMinimalStatusColorClass,
  getStatusText,
  setSelectedTicketNumber,
}) => {
  return (
    <Button
      key={timer.ticketNumber}
      onClick={() => setSelectedTicketNumber(timer.ticketNumber)}
      variant="gray"
      className="p-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors h-auto flex flex-col items-start justify-start"
      title={`View details for ${timer.ticketNumber}\n${
        timer.ticketName
      }\nStatus: ${getStatusText(timer.status, timer.isRunning)}${
        timer.storyPoints
          ? `\nEst: ${formatTime(timer.storyPoints * 3600000)}`
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className={`w-3 h-3 rounded-full ${getMinimalStatusColorClass(
            timer.status,
            timer.isRunning
          )}`}
        ></span>
        <span className="text-xs text-gray-500">
          {formatTime(timer.totalElapsed)}
        </span>
      </div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm truncate">
        {timer.ticketNumber}
      </h4>
      <p
        className="text-xs text-gray-500 truncate"
        title={
          timer.ticketName +
          (timer.storyPoints
            ? ` (Est: ${formatTime(timer.storyPoints * 3600000)})`
            : "")
        }
      >
        {/* {timer.ticketName.startsWith(timer.ticketNumber) &&
        timer.ticketName !== timer.ticketNumber
          ? timer.ticketName
              .substring(timer.ticketNumber.length)
              .trim()
              .startsWith("-")
            ? timer.ticketName.substring(timer.ticketNumber.length + 2).trim()
            : timer.ticketName
          : timer.ticketName === timer.ticketNumber
          ? ""
          : timer.ticketName} */}
        {timer.storyPoints ? ` (${timer.storyPoints.toFixed(1)} SP)` : ""}
      </p>
    </Button>
  );
};

export default TimerGridItem;
