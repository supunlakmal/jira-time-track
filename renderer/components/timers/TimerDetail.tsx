import React, { useEffect } from "react";
import Button from "../ui/Button";
import { TaskTimer } from "../../types/dashboard";
import { useGitOperations } from "../../hooks/useGitOperations";

interface TimerDetailProps {
  timer: TaskTimer;
  formatTime: (ms: number) => string;
  getStatusColor: (status: TaskTimer["status"], isRunning: boolean) => string;
  getStatusIcon: (status: TaskTimer["status"], isRunning: boolean) => string;
  getStatusText: (status: TaskTimer["status"], isRunning: boolean) => string;
  handleDeleteTimer: (ticketNumber: string) => void;
  handleTimerAction: (
    action: "start" | "pause" | "resume" | "hold" | "complete" | "stop",
    ticketNumber: string
  ) => void;
  setSelectedTicketNumber: (ticketNumber: string | null) => void;
}

const TimerDetail: React.FC<TimerDetailProps> = ({
  timer,
  formatTime,
  getStatusColor,
  getStatusIcon,
  getStatusText,
  handleDeleteTimer,
  handleTimerAction,
  setSelectedTicketNumber,
}) => {
  const {
    projectPaths,
    isCreatingBranch,
    branchMessage,
    branchExists,
    isCheckingBranch,
    checkBranchExists,
    createOrSwitchBranch,
  } = useGitOperations();

  // Check branch existence when project paths change or ticket changes
  useEffect(() => {
    checkBranchExists(timer.ticketNumber);
  }, [timer.ticketNumber, checkBranchExists]);

  // Handle git branch creation/switching
  const handleCreateGitBranch = async () => {
    await createOrSwitchBranch(timer.ticketNumber);
  };

  const estimatedTimeMs = (timer.storyPoints || 0) * 60 * 60 * 1000;
  let progressWidthPercentage = 0;
  let progressBarColorClass = "bg-blue-600";

  if (estimatedTimeMs > 0) {
    const rawPercentage = (timer.totalElapsed / estimatedTimeMs) * 100;
    if (rawPercentage > 100) {
      progressWidthPercentage = 100;
      progressBarColorClass = "bg-red-600";
    } else {
      progressWidthPercentage = rawPercentage;
    }
  }

  return (
    <div
      className={`p-3 rounded-lg border-l-4 ${
        timer.status === "running" && timer.isRunning
          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
          : timer.status === "paused"
          ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
          : timer.status === "hold"
          ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500"
          : timer.status === "completed"
          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
          : "bg-gray-50 dark:bg-gray-800 border-gray-500"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <Button
          onClick={() => setSelectedTicketNumber(null)}
          variant="link"
          size="sm"
          className="mr-2"
          title="Back to Grid"
        >
          ← Back
        </Button>
        <Button
          onClick={() => handleDeleteTimer(timer.ticketNumber)}
          variant="danger"
          size="icon"
          className="w-8 h-8 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Delete Timer"
        >
          🗑️
        </Button>
      </div>
      <div className="flex justify-between items-start mb-1">
        {" "}
        {/* Reduced mb */}
        <div className="flex-1 mr-3">
          <h3
            className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate"
            title={timer.ticketNumber}
          >
            {timer.ticketNumber}
          </h3>
          <p
            className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
            title={timer.ticketName}
          >
            {timer.ticketName}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-mono font-medium text-gray-900 dark:text-gray-100">
            {formatTime(timer.totalElapsed)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Session: {formatTime(timer.elapsedTime)}
          </div>
          {timer.storyPoints && timer.storyPoints > 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Est: {formatTime(estimatedTimeMs)}
            </div>
          )}
          <div
            className={`text-xs font-semibold ${getStatusColor(
              timer.status,
              timer.isRunning
            )}`}
          >
            {getStatusIcon(timer.status, timer.isRunning)}{" "}
            {getStatusText(timer.status, timer.isRunning)}
          </div>
        </div>
      </div>
      {/* START: Progress Bar */}{" "}
      {timer.storyPoints && timer.storyPoints > 0 && estimatedTimeMs > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 my-2 dark:bg-gray-700">
          <div
            className={`${progressBarColorClass} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
            style={{ width: `${progressWidthPercentage}%` }}
          ></div>
        </div>
      )}
      {/* END: Progress Bar */}{" "}
      <div className="grid grid-cols-2 gap-1 mt-3">
        {" "}
        {timer.status === "queue" ? (
          <>
            <Button
              onClick={() => handleTimerAction("start", timer.ticketNumber)}
              variant="primary"
              size="sm"
              className="col-span-2"
            >
              Start Timer
            </Button>
            {/* No Complete/Stop buttons for queued tasks */}
          </>
        ) : timer.isRunning && timer.status === "running" ? (
          <>
            <Button
              onClick={() => handleTimerAction("pause", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Pause
            </Button>
            <Button
              onClick={() => handleTimerAction("hold", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Hold
            </Button>
          </>
        ) : timer.status === "paused" ? (
          <>
            <Button
              onClick={() => handleTimerAction("resume", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleTimerAction("hold", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Hold
            </Button>
          </>
        ) : timer.status === "hold" ? (
          <>
            <Button
              onClick={() => handleTimerAction("resume", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Resume
            </Button>
            <Button
              onClick={() => handleTimerAction("start", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Start New Session
            </Button>
          </>
        ) : timer.status === "completed" || timer.status === "stopped" ? (
          <Button
            onClick={() => handleTimerAction("start", timer.ticketNumber)}
            variant="primary"
            size="sm"
            className="col-span-2"
          >
            Start New Session
          </Button>
        ) : null}{" "}
        {timer.status !== "completed" &&
          timer.status !== "stopped" &&
          timer.status !== "queue" && (
            <Button
              onClick={() => handleTimerAction("complete", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Complete
            </Button>
          )}
        {timer.status !== "completed" &&
          timer.status !== "stopped" &&
          timer.status !== "queue" && (
            <Button
              onClick={() => handleTimerAction("stop", timer.ticketNumber)}
              variant="primary"
              size="sm"
            >
              Stop
            </Button>
          )}
      </div>
      
      {/* Git Branch Creation Section */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleCreateGitBranch}
            disabled={isCreatingBranch || isCheckingBranch}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            {isCreatingBranch ? (
              <>
                <span className="animate-spin mr-1">⏳</span>
                {branchExists ? 'Switching...' : 'Creating...'}
              </>
            ) : isCheckingBranch ? (
              <>
                <span className="animate-spin mr-1">⏳</span>
                Checking...
              </>
            ) : (
              <>
                <span className="mr-1">🌿</span>
                {branchExists === true ? 'Switch to Branch' : 
                 branchExists === false ? 'Create Git Branch' : 
                 'Git Branch'}
              </>
            )}
          </Button>
        </div>
        {branchMessage && (
          <div className={`mt-2 text-xs px-2 py-1 rounded ${
            branchMessage.startsWith('✓') 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {branchMessage}
          </div>
        )}
      </div>

      {timer.sessions.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <details className="text-xs">
            <summary className="cursor-pointer text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
              {timer.sessions.length} Session
              {timer.sessions.length > 1 ? "s" : ""} | Total:{" "}
              {formatTime(timer.totalElapsed)}
            </summary>
            <ul className="mt-1 list-disc list-inside pl-2 text-gray-500 dark:text-gray-400 max-h-20 overflow-y-auto">
              {timer.sessions
                .slice()
                .reverse()
                .map((session, idx) => (
                  <li key={idx}>
                    Session {timer.sessions.length - idx}:{" "}
                    {formatTime(session.duration)} ({session.status})
                    {session.endTime &&
                      ` (Ended: ${new Date(
                        session.endTime
                      ).toLocaleTimeString()})`}
                  </li>
                ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  );
};

export default TimerDetail;
