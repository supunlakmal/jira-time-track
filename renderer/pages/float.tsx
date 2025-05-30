import React, { useEffect, useState, useRef } from "react";

// TaskTimer interface remains the same
export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped";
  totalElapsed: number;
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string;
  }>;
}

const FloatingWindow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [timers, setTimers] = useState<TaskTimer[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ticketData, setTicketData] = useState<{ [key: string]: string }>({});

  // NEW: State to manage which ticket's details are shown, or null for grid view
  const [selectedTicketNumber, setSelectedTicketNumber] = useState<
    string | null
  >(null);

  // --- useEffects for data loading, ticket name updates, and interval (largely unchanged) ---
  useEffect(() => {
    const loadTicketData = async () => {
      try {
        const data = (await window.ipc.send("start-task", undefined)) as Array<{
          ticket_number: string;
          ticket_name: string;
        }>;
        if (data && Array.isArray(data)) {
          const ticketMap = data.reduce((acc, ticket) => {
            acc[ticket.ticket_number] = ticket.ticket_name;
            return acc;
          }, {} as { [key: string]: string });
          setTicketData(ticketMap);
        } else {
          console.warn("load-jira-data did not return valid data", data);
        }
      } catch (error) {
        console.error("Failed to load ticket data:", error);
      }
    };
    loadTicketData();
  }, []);

  useEffect(() => {
    if (Object.keys(ticketData).length > 0) {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (
            timer.ticketName === timer.ticketNumber &&
            ticketData[timer.ticketNumber]
          ) {
            return { ...timer, ticketName: ticketData[timer.ticketNumber] };
          }
          return timer;
        })
      );
    }
  }, [ticketData]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.status === "running") {
            const newElapsedSegmentTime = timer.elapsedTime + 1000;
            return {
              ...timer,
              elapsedTime: newElapsedSegmentTime,
              totalElapsed: timer.totalElapsed + 1000,
              sessions: timer.sessions.map((session, index) =>
                index === timer.sessions.length - 1 && !session.endTime
                  ? { ...session, duration: session.duration + 1000 }
                  : session
              ),
            };
          }
          return timer;
        })
      );
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  // --- End of largely unchanged useEffects ---

  // --- handleTimerAction remains largely the same ---
  const handleTimerAction = (
    action: "start" | "pause" | "resume" | "hold" | "complete" | "stop",
    ticketNumber: string
  ) => {
    const actionTime = Date.now();
    let ticketNameForIPC = "";

    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.ticketNumber !== ticketNumber) return timer;

        if (action === "start" && timer.ticketNumber === ticketNumber) {
          ticketNameForIPC =
            timer.ticketName ||
            ticketData[timer.ticketNumber] ||
            timer.ticketNumber;
        }

        let newSessions = [...timer.sessions];
        let newElapsedTime = timer.elapsedTime;
        let newIsRunning = timer.isRunning;
        let newStatus: TaskTimer["status"] = timer.status;

        if (
          timer.isRunning &&
          (action === "pause" ||
            action === "hold" ||
            action === "complete" ||
            action === "stop")
        ) {
          const lastSessionIndex = newSessions.length - 1;
          if (lastSessionIndex >= 0 && !newSessions[lastSessionIndex].endTime) {
            newSessions[lastSessionIndex] = {
              ...newSessions[lastSessionIndex],
              endTime: actionTime,
              duration: timer.elapsedTime,
              status: action,
            };
          }
        } else if (
          !timer.isRunning &&
          (action === "resume" ||
            (action === "start" &&
              (timer.status === "paused" || timer.status === "hold")))
        ) {
          // This block handles closing a non-running session before starting a new one
          const lastSessionIndex = newSessions.length - 1;
          if (
            lastSessionIndex >= 0 &&
            !newSessions[lastSessionIndex].endTime &&
            newSessions[lastSessionIndex].status !== "running" // Ensure it's not already a weirdly open running session
          ) {
            newSessions[lastSessionIndex] = {
              ...newSessions[lastSessionIndex],
              endTime: actionTime,
              status: timer.status, // Mark it with the status it had before this action
            };
          }
        }

        switch (action) {
          case "start":
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0; // Reset segment timer
            newSessions.push({
              // Start a new session
              startTime: actionTime,
              duration: 0,
              status: "running",
            });
            break;
          case "pause":
            newIsRunning = false;
            newStatus = "paused";
            break;
          case "resume":
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0; // Reset segment timer
            newSessions.push({
              // Start a new session
              startTime: actionTime,
              duration: 0,
              status: "running",
            });
            break;
          case "hold":
            newIsRunning = false;
            newStatus = "hold";
            break;
          case "complete":
            newIsRunning = false;
            newStatus = "completed";
            break;
          case "stop":
            newIsRunning = false;
            newStatus = "stopped";
            break;
        }
        return {
          ...timer,
          isRunning: newIsRunning,
          status: newStatus,
          elapsedTime: newElapsedTime,
          sessions: newSessions,
        };
      })
    );

    const timerDetails = { ticket: ticketNumber, name: ticketNameForIPC };
    switch (action) {
      case "start":
        window.ipc.send("start-task", timerDetails);
        break;
      case "pause":
        window.ipc.send("pause-task", { ticket: ticketNumber });
        break;
      case "resume":
        window.ipc.send("resume-task", { ticket: ticketNumber });
        break;
      case "stop":
      case "complete":
        window.ipc.send("stop-task", { ticket: ticketNumber });
        break;
    }
  };
  // --- End of handleTimerAction ---

  // --- IPC Event Handlers (handleTaskStarted, etc.) remain largely the same ---
  useEffect(() => {
    const handleTaskStarted = (data: {
      ticketNumber: string;
      ticketName: string;
    }) => {
      const { ticketNumber, ticketName } = data;
      console.log(
        "Float: IPC task-started received:",
        ticketNumber,
        ticketName
      );
      const eventTime = Date.now();
      setTimers((prevTimers) => {
        const existingTimerIndex = prevTimers.findIndex(
          (t) => t.ticketNumber === ticketNumber
        );

        if (existingTimerIndex !== -1) {
          const existingTimer = prevTimers[existingTimerIndex];
          const updatedTimers = [...prevTimers];
          let updatedSessions = [...existingTimer.sessions];
          const lastSessionIdx = updatedSessions.length - 1;

          if (lastSessionIdx >= 0 && !updatedSessions[lastSessionIdx].endTime) {
            updatedSessions[lastSessionIdx] = {
              ...updatedSessions[lastSessionIdx],
              endTime: eventTime,
              duration: existingTimer.elapsedTime,
              status: existingTimer.isRunning
                ? "restarted_by_ipc"
                : existingTimer.status,
            };
          }

          updatedSessions.push({
            startTime: eventTime,
            duration: 0,
            status: "running",
          });

          updatedTimers[existingTimerIndex] = {
            ...existingTimer,
            isRunning: true,
            status: "running",
            elapsedTime: 0,
            ticketName:
              ticketName ||
              existingTimer.ticketName ||
              ticketData[ticketNumber] ||
              ticketNumber,
            sessions: updatedSessions,
          };
          return updatedTimers;
        } else {
          return [
            ...prevTimers,
            {
              ticketNumber: ticketNumber,
              ticketName:
                ticketName || ticketData[ticketNumber] || ticketNumber,
              startTime: eventTime,
              elapsedTime: 0,
              isRunning: false, // Default for a newly added task, let start action make it run
              status: "stopped", // Default status
              totalElapsed: 0,
              sessions: [],
            },
          ];
        }
      });
    };

    const handleTaskPaused = (ticketNumber: string) => {
      const eventTime = Date.now();
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.ticketNumber === ticketNumber && timer.isRunning) {
            let updatedSessions = [...timer.sessions];
            const lastSessionIdx = updatedSessions.length - 1;
            if (
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
                duration: timer.elapsedTime,
                status: "paused",
              };
            }
            return {
              ...timer,
              isRunning: false,
              status: "paused",
              sessions: updatedSessions,
            };
          }
          return timer;
        })
      );
    };

    const handleTaskResumed = (ticketNumber: string) => {
      const eventTime = Date.now();
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.ticketNumber === ticketNumber && !timer.isRunning) {
            let updatedSessions = [...timer.sessions];
            const lastSessionIdx = updatedSessions.length - 1;

            // Close previous non-running session
            if (
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime &&
              (updatedSessions[lastSessionIdx].status === "paused" ||
                updatedSessions[lastSessionIdx].status === "hold")
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
                // status: timer.status, // Keep its original end status
              };
            }
            // Start new running session
            updatedSessions.push({
              startTime: eventTime,
              duration: 0,
              status: "running",
            });
            return {
              ...timer,
              isRunning: true,
              status: "running",
              elapsedTime: 0,
              sessions: updatedSessions,
            };
          }
          return timer;
        })
      );
    };

    const handleTaskStopped = (ticketNumber: string) => {
      const eventTime = Date.now();
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.ticketNumber === ticketNumber) {
            let updatedSessions = [...timer.sessions];
            const lastSessionIdx = updatedSessions.length - 1;
            if (
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
                duration: timer.isRunning
                  ? timer.elapsedTime
                  : updatedSessions[lastSessionIdx].duration, // If it was running, use current elapsedTime
                status: "stopped",
              };
            }
            return {
              ...timer,
              isRunning: false,
              status: "stopped",
              sessions: updatedSessions,
            };
          }
          return timer;
        })
      );
    };

    const cleanupTaskStarted = window.ipc.on("task-started", handleTaskStarted);
    const cleanupTaskPaused = window.ipc.on("task-paused", handleTaskPaused);
    const cleanupTaskResumed = window.ipc.on("task-resumed", handleTaskResumed);
    const cleanupTaskStopped = window.ipc.on("task-stopped", handleTaskStopped);

    return () => {
      cleanupTaskStarted();
      cleanupTaskPaused();
      cleanupTaskResumed();
      cleanupTaskStopped();
    };
  }, [ticketData]); // ticketData dependency is still relevant for initial name lookups
  // --- End of IPC Event Handlers ---

  // --- Mouse dragging logic remains the same ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const { movementX, movementY } = e;
      window.ipc.send("window-move", { movementX, movementY });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  // --- End of mouse dragging ---

  // --- Helper functions formatTime, getStatusColor, getStatusIcon, getStatusText remain the same ---
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const getStatusColor = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "text-green-600";
    if (status === "paused") return "text-yellow-600";
    if (status === "hold") return "text-orange-600";
    if (status === "completed") return "text-blue-600";
    if (status === "stopped") return "text-gray-600";
    return "text-gray-500";
  };

  const getStatusIcon = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "●"; // Filled circle
    if (status === "paused") return "⏸";
    if (status === "hold") return "⏳";
    if (status === "completed") return "✓";
    if (status === "stopped") return "⏹";
    return "○"; // Empty circle for unknown/default
  };
  const getMinimalStatusColorClass = (
    status: TaskTimer["status"],
    isRunning: boolean
  ) => {
    if (isRunning && status === "running") return "bg-green-500";
    if (status === "paused") return "bg-yellow-500";
    if (status === "hold") return "bg-orange-500";
    if (status === "completed") return "bg-blue-500";
    if (status === "stopped") return "bg-gray-400";
    return "bg-gray-300";
  };

  const getStatusText = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "Running";
    if (status === "paused") return "Paused";
    if (status === "hold") return "On Hold";
    if (status === "completed") return "Completed";
    if (status === "stopped") return "Stopped";
    return "Unknown";
  };
  // --- End of helper functions ---

  const handleClose = () => window.ipc.window.hide();

  const handleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    if (newMinimized) {
      window.ipc.send("window-resize", { height: 40 }); // Minimal height for header
    } else {
      // Adjust height based on whether we are in grid or detail view
      let calculatedHeight;
      if (selectedTicketNumber) {
        calculatedHeight = 350; // Approx height for a single detailed timer view
      } else {
        const numTimers = timers.length;
        const rows = Math.max(1, Math.ceil(numTimers / 3)); // Assuming 3 items per row in grid
        const gridBaseHeight = 60; // Padding and header
        const gridRowHeight = 70; // Approximate height per row of grid items
        calculatedHeight = gridBaseHeight + rows * gridRowHeight;
      }
      window.ipc.send("window-resize", {
        height: Math.min(Math.max(calculatedHeight, 150), 600), // Min/max bounds
      });
    }
  };

  // NEW: Function to render the detailed view for a single timer
  const renderTimerDetail = (timer: TaskTimer) => {
    if (!timer) {
      // Should ideally not happen if selectedTicketNumber is valid
      return (
        <div className="p-4 text-center text-gray-500">
          Timer not found.
          <button
            onClick={() => setSelectedTicketNumber(null)}
            className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
          >
            Back to Grid
          </button>
        </div>
      );
    }
    return (
      <div
        className={`p-3 rounded-lg border-l-4 ${
          timer.status === "running"
            ? "bg-green-50 border-green-500"
            : timer.status === "paused"
            ? "bg-yellow-50 border-yellow-500"
            : timer.status === "hold"
            ? "bg-orange-50 border-orange-500"
            : timer.status === "completed"
            ? "bg-blue-50 border-blue-500"
            : "bg-gray-50 border-gray-500"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={() => setSelectedTicketNumber(null)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-2"
            title="Back to Grid"
          >
            ← Back
          </button>
          <div className="flex-1 text-right">
            {" "}
            {/* Placeholder to push title center if needed or remove */}
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 mr-3">
            <h3
              className="font-medium text-gray-900 text-sm truncate"
              title={timer.ticketNumber}
            >
              {timer.ticketNumber}
            </h3>
            <p
              className="text-xs text-gray-500 line-clamp-2"
              title={timer.ticketName}
            >
              {timer.ticketName}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-mono font-medium text-gray-900">
              {formatTime(timer.totalElapsed)}
            </div>
            <div className="text-xs text-gray-400">
              Session: {formatTime(timer.elapsedTime)}
            </div>
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
        {/* Action Buttons - same logic as before */}
        <div className="grid grid-cols-2 gap-1 mt-3">
          {timer.isRunning && timer.status === "running" ? (
            <>
              <button
                onClick={() => handleTimerAction("pause", timer.ticketNumber)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Pause
              </button>
              <button
                onClick={() => handleTimerAction("hold", timer.ticketNumber)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Hold
              </button>
            </>
          ) : timer.status === "paused" ? (
            <>
              <button
                onClick={() => handleTimerAction("resume", timer.ticketNumber)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Resume
              </button>
              <button
                onClick={() => handleTimerAction("hold", timer.ticketNumber)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Hold
              </button>
            </>
          ) : timer.status === "hold" ? (
            <>
              <button
                onClick={() => handleTimerAction("resume", timer.ticketNumber)}
                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Resume
              </button>
              <button // Changed from "Restart" to "Start" to be consistent
                onClick={() => handleTimerAction("start", timer.ticketNumber)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Start New Session {/* Clarified button text */}
              </button>
            </>
          ) : timer.status === "completed" || timer.status === "stopped" ? (
            <button
              onClick={() => handleTimerAction("start", timer.ticketNumber)}
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium col-span-2"
            >
              Start New
            </button>
          ) : (
            <div className="text-xs text-gray-400 col-span-2">
              No actions available
            </div>
          )}
          {timer.status !== "completed" && timer.status !== "stopped" && (
            <button
              onClick={() => handleTimerAction("complete", timer.ticketNumber)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
            >
              Complete
            </button>
          )}
          {!(timer.status === "completed" || timer.status === "stopped") && (
            <button
              onClick={() => handleTimerAction("stop", timer.ticketNumber)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs font-medium"
            >
              Stop
            </button>
          )}
          {(timer.status === "completed" || timer.status === "stopped") && (
            <div className="col-span-2"></div> /* Keep layout consistent */
          )}
        </div>
        {/* Session History - same logic as before */}
        {timer.sessions.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <details className="text-xs">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                {timer.sessions.length} Session
                {timer.sessions.length > 1 ? "s" : ""} | Total:{" "}
                {formatTime(timer.totalElapsed)}
              </summary>
              <ul className="mt-1 list-disc list-inside pl-2 text-gray-500 max-h-20 overflow-y-auto">
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

  // Find the currently selected timer
  const currentTimerDetails = selectedTicketNumber
    ? timers.find((t) => t.ticketNumber === selectedTicketNumber)
    : null;

  return (
    <div className="h-screen bg-transparent select-none">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        {/* Header remains the same */}
        <div
          className="bg-gray-800 text-white p-2 flex justify-between items-center cursor-move flex-shrink-0"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        >
          <div className="text-sm font-semibold">
            Time Tracker{" "}
            {selectedTicketNumber
              ? `(${selectedTicketNumber})`
              : timers.length > 0
              ? `(${timers.length} tasks)`
              : ""}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-gray-700 p-1 rounded text-xs w-6 h-6 flex items-center justify-center"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? "□" : "−"}
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-red-500 p-1 rounded text-xs w-6 h-6 flex items-center justify-center"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Main content area: either grid or detail view */}
        {!isMinimized && (
          <div className="p-4 overflow-y-auto flex-grow">
            {selectedTicketNumber && currentTimerDetails ? (
              // Show detail view for the selected timer
              renderTimerDetail(currentTimerDetails)
            ) : selectedTicketNumber && !currentTimerDetails ? (
              // Handle case where selected timer might not exist (e.g., deleted)
              <div className="text-center text-gray-500 p-4">
                <p>Timer '{selectedTicketNumber}' not found.</p>
                <button
                  onClick={() => setSelectedTicketNumber(null)}
                  className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded text-sm"
                >
                  Back to Grid
                </button>
              </div>
            ) : (
              // Show grid view
              <div className="space-y-2">
                {timers.length === 0 ? (
                  <div className="text-center text-gray-500 p-4">
                    No active timers. Start one from the main app.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {/* // You might want to limit this to, say, 9 timers and add pagination or a "show all"
                    // For now, it renders all of them.
                    */}
                    {timers.map((timer) => (
                      <button
                        key={timer.ticketNumber}
                        onClick={() =>
                          setSelectedTicketNumber(timer.ticketNumber)
                        }
                        className="p-3 rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        title={`View details for ${timer.ticketNumber}\n${
                          timer.ticketName
                        }\nStatus: ${getStatusText(
                          timer.status,
                          timer.isRunning
                        )}`}
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
                        <h4 className="font-medium text-gray-800 text-sm truncate">
                          {timer.ticketNumber}
                        </h4>
                        <p
                          className="text-xs text-gray-500 truncate"
                          title={timer.ticketName}
                        >
                          {timer.ticketName.startsWith(timer.ticketNumber)
                            ? timer.ticketNumber
                            : timer.ticketName}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWindow;
