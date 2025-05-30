import React, { useEffect, useState, useRef } from "react";

// Assuming window.ipc structure is defined elsewhere (e.g., in a preload script)
declare global {
  interface Window {
    ipc: {
      send: (channel: string, ...args: any[]) => Promise<any> | void; // Adjusted to allow Promise for load-jira-data
      on: (channel: string, listener: (...args: any[]) => void) => () => void; // Returns a cleanup function
      window: {
        hide: () => void;
      };
    };
  }
}

export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number; // Overall start time of the task, not necessarily the current session
  elapsedTime: number; // Time elapsed in the current active segment/session
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped";
  totalElapsed: number; // Total time spent on task across all sessions
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string; // Status of this specific session when it ended (e.g., 'paused', 'completed')
  }>;
}

const FloatingWindow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [timers, setTimers] = useState<TaskTimer[]>([
    {
      ticketNumber: "MA-292",
      ticketName:
        "[FUNC][MA-39] User session not automatically logged out After 1 Hour of Inactivity",
      startTime: Date.now() - 125000,
      elapsedTime: 125000, // Current segment has run for 125s
      isRunning: true,
      status: "running",
      totalElapsed: 125000,
      sessions: [
        {
          startTime: Date.now() - 125000,
          duration: 125000, // This session's duration
          status: "running", // This session is currently running
        },
      ],
    },
    {
      ticketNumber: "CBAT-1897",
      ticketName:
        "[FUNC] Mobile | Incorrect retake assessment count displayed on the mobile app homepage",
      startTime: Date.now() - 300000,
      elapsedTime: 280000, // Last segment ran for 280s before pause
      isRunning: false,
      status: "paused",
      totalElapsed: 280000,
      sessions: [
        {
          startTime: Date.now() - 300000,
          endTime: Date.now() - (300000 - 280000), // Ended 20s ago relative to its start
          duration: 280000,
          status: "paused",
        },
      ],
    },
    {
      ticketNumber: "MA-270",
      ticketName:
        "Skeleton Development - As a supervisor I must be able to see tiles on dashboard",
      startTime: Date.now() - 1800000,
      elapsedTime: 1200000, // Last segment ran for 1.2Ms before hold
      isRunning: false,
      status: "hold",
      totalElapsed: 1200000,
      sessions: [
        {
          startTime: Date.now() - 1800000,
          endTime: Date.now() - (1800000 - 1200000),
          duration: 1200000,
          status: "hold",
        },
      ],
    },
  ]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ticketData, setTicketData] = useState<{ [key: string]: string }>({});

  // Load ticket data for name resolution
  useEffect(() => {
    const loadTicketData = async () => {
      try {
        // Ensure your window.ipc.send for "load-jira-data" can return a Promise
        const data = (await window.ipc.send(
          "load-jira-data",
          undefined
        )) as Array<{ ticket_number: string; ticket_name: string }>;
        if (data && Array.isArray(data)) {
          const ticketMap = data.reduce((acc, ticket) => {
            acc[ticket.ticket_number] = ticket.ticket_name;
            return acc;
          }, {});
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

  // Update timer names if ticketData loads after timers are created
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
  }, [ticketData]); // Runs when ticketData is populated

  // Timer update effect
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
                index === timer.sessions.length - 1 && !session.endTime // Last, open session
                  ? { ...session, duration: session.duration + 1000 } // Update its duration
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
  }, []); // No dependencies needed as setTimers uses functional updates

  const handleTimerAction = (
    action: "start" | "pause" | "resume" | "hold" | "complete" | "stop",
    ticket: string
  ) => {
    const actionTime = Date.now();
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.ticketNumber !== ticket) return timer;

        let newSessions = [...timer.sessions];
        let newElapsedTime = timer.elapsedTime;
        let newIsRunning = timer.isRunning;
        let newStatus: TaskTimer["status"] = timer.status;

        // Finalize the current session if it's running and the action stops it
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
              duration: timer.elapsedTime, // Current segment's time is its duration
              status: action, // Mark session with the action that ended it
            };
          }
        }
        // Or finalize if it was paused/held and now we resume/start (effectively closing previous)
        else if (
          !timer.isRunning &&
          (action === "resume" ||
            (action === "start" &&
              (timer.status === "paused" || timer.status === "hold")))
        ) {
          const lastSessionIndex = newSessions.length - 1;
          if (
            lastSessionIndex >= 0 &&
            !newSessions[lastSessionIndex].endTime &&
            newSessions[lastSessionIndex].status !== "running"
          ) {
            newSessions[lastSessionIndex] = {
              ...newSessions[lastSessionIndex],
              endTime: actionTime,
              // duration is already set from when it was paused/held
              status: timer.status, // original status
            };
          }
        }

        switch (action) {
          case "start": // Can start a new task, or restart a stopped/completed/on-hold one
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0; // Reset for new segment
            newSessions.push({
              startTime: actionTime,
              duration: 0,
              status: "running",
            });
            // Note: totalElapsed and overall startTime are preserved for history
            break;

          case "pause":
            newIsRunning = false;
            newStatus = "paused";
            // newElapsedTime remains to show duration of segment just paused
            break;

          case "resume": // From paused or hold
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0; // Reset for new segment
            newSessions.push({
              startTime: actionTime,
              duration: 0,
              status: "running",
            });
            break;

          case "hold":
            newIsRunning = false;
            newStatus = "hold";
            // newElapsedTime remains
            break;

          case "complete":
            newIsRunning = false;
            newStatus = "completed";
            // newElapsedTime remains
            break;

          case "stop":
            newIsRunning = false;
            newStatus = "stopped";
            // newElapsedTime remains
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

    // Send IPC messages for external actions
    switch (action) {
      case "pause":
        window.ipc.send("pause-task", { ticket });
        break;
      case "resume":
      case "start": // If starting from UI, it might imply a resume for backend
        if (timers.find((t) => t.ticketNumber === ticket && !t.isRunning)) {
          window.ipc.send("resume-task", { ticket });
        } else if (!timers.find((t) => t.ticketNumber === ticket)) {
          // This case is less likely if timer is already in UI
          // but if 'start' is for a brand new timer, this would be 'start-task'
        }
        break;
      case "stop":
      case "complete": // Completing often implies stopping
        window.ipc.send("stop-task", { ticket }); // Or specific complete-task
        break;
      // 'hold' might be internal state or map to pause/stop on backend
    }
  };

  // IPC event listeners
  useEffect(() => {
    const handleTaskStarted = (_: any, ticketNumber: string) => {
      console.log("Floating window received task-started:", ticketNumber);
      const eventTime = Date.now();
      setTimers((prevTimers) => {
        const existingTimer = prevTimers.find(
          (t) => t.ticketNumber === ticketNumber
        );
        if (existingTimer) {
          if (existingTimer.isRunning) return prevTimers; // Already running, no change

          // Timer exists but is not running (paused, hold, stopped, completed)
          // Effectively resume/restart it
          let updatedSessions = [...existingTimer.sessions];
          const lastSessionIdx = updatedSessions.length - 1;
          if (lastSessionIdx >= 0 && !updatedSessions[lastSessionIdx].endTime) {
            updatedSessions[lastSessionIdx] = {
              ...updatedSessions[lastSessionIdx],
              endTime: eventTime,
              duration: existingTimer.elapsedTime, // Use current elapsedTime
              status: existingTimer.status, // Mark with its previous status
            };
          }
          updatedSessions.push({
            startTime: eventTime,
            duration: 0,
            status: "running",
          });

          return prevTimers.map((timer) =>
            timer.ticketNumber === ticketNumber
              ? {
                  ...timer,
                  isRunning: true,
                  status: "running",
                  elapsedTime: 0, // Reset for new segment
                  // totalElapsed and startTime are preserved
                  sessions: updatedSessions,
                }
              : timer
          );
        } else {
          // Add new timer
          console.log("Adding new timer via IPC for:", ticketNumber);
          return [
            ...prevTimers,
            {
              ticketNumber: ticketNumber,
              ticketName: ticketData[ticketNumber] || ticketNumber,
              startTime: eventTime,
              elapsedTime: 0,
              isRunning: true,
              status: "running",
              totalElapsed: 0,
              sessions: [
                { startTime: eventTime, duration: 0, status: "running" },
              ],
            },
          ];
        }
      });
    };

    const handleTaskPaused = (_: any, ticketNumber: string) => {
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
              // elapsedTime remains to show duration of segment just paused
              sessions: updatedSessions,
            };
          }
          return timer;
        })
      );
    };

    const handleTaskResumed = (_: any, ticketNumber: string) => {
      const eventTime = Date.now();
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.ticketNumber === ticketNumber && !timer.isRunning) {
            let updatedSessions = [...timer.sessions];
            const lastSessionIdx = updatedSessions.length - 1;
            // Finalize previous session if it was open
            if (
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
                // duration would already be set from when it was paused/held
                // or use timer.elapsedTime if it was still reflecting that segment.
                // For safety, let's assume duration was correctly captured previously.
                // If not, use timer.elapsedTime here.
                status: timer.status,
              };
            }
            updatedSessions.push({
              startTime: eventTime,
              duration: 0,
              status: "running",
            });
            return {
              ...timer,
              isRunning: true,
              status: "running",
              elapsedTime: 0, // Reset for new segment
              sessions: updatedSessions,
            };
          }
          return timer;
        })
      );
    };

    const handleTaskStopped = (_: any, ticketNumber: string) => {
      const eventTime = Date.now();
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.ticketNumber === ticketNumber) {
            // Stop it even if it wasn't running (e.g. from paused to stopped)
            let updatedSessions = [...timer.sessions];
            const lastSessionIdx = updatedSessions.length - 1;
            if (
              timer.isRunning &&
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
                duration: timer.elapsedTime,
                status: "stopped",
              };
            } else if (
              !timer.isRunning &&
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime
            ) {
              // If it was paused/held and then stopped, update that session's status
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime, // Update end time
                status: "stopped", // Mark explicitly as stopped
              };
            }
            return {
              ...timer,
              isRunning: false,
              status: "stopped",
              // elapsedTime remains
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
  }, [ticketData]); // Re-run if ticketData changes, so new timers get correct names

  // Mouse event handlers for dragging
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

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const handleClose = () => window.ipc.window.hide();

  const handleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    if (newMinimized) {
      window.ipc.send("window-resize", { height: 40 });
    } else {
      const baseHeight = 80;
      const timerHeight = 130; // Adjusted for potentially more button space
      const minHeight = 200;
      const calculatedHeight = Math.max(
        minHeight,
        baseHeight + timers.length * timerHeight
      );
      window.ipc.send("window-resize", {
        height: Math.min(calculatedHeight, 600),
      }); // Max height cap
    }
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
    if (isRunning && status === "running") return "●"; // U+25CF Black Circle
    if (status === "paused") return "⏸"; // U+23F8 Pause Button
    if (status === "hold") return "⏳"; // U+23F3 Hourglass Not Done
    if (status === "completed") return "✓"; // U+2713 Check Mark
    if (status === "stopped") return "⏹"; // U+23F9 Stop Button
    return "○"; // U+25CB White Circle
  };

  const getStatusText = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "Running";
    if (status === "paused") return "Paused";
    if (status === "hold") return "On Hold";
    if (status === "completed") return "Completed";
    if (status === "stopped") return "Stopped";
    return "Unknown";
  };

  return (
    <div className="h-screen bg-transparent select-none">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
        {/* Title bar */}
        <div
          className="bg-gray-800 text-white p-2 flex justify-between items-center cursor-move flex-shrink-0"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        >
          <div className="text-sm font-semibold">
            Time Tracker {timers.length > 0 && `(${timers.length})`}
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

        {/* Content area */}
        {!isMinimized && (
          <div className="p-4 overflow-y-auto flex-grow">
            {" "}
            {/* Use flex-grow for scrolling */}
            <div className="space-y-4">
              {timers.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No active timers
                </div>
              ) : (
                timers.map((timer) => (
                  <div
                    key={timer.ticketNumber}
                    className={`p-3 rounded-lg border-l-4 ${
                      timer.status === "running"
                        ? "bg-green-50 border-green-500"
                        : timer.status === "paused"
                        ? "bg-yellow-50 border-yellow-500"
                        : timer.status === "hold"
                        ? "bg-orange-50 border-orange-500"
                        : timer.status === "completed"
                        ? "bg-blue-50 border-blue-500"
                        : "bg-gray-50 border-gray-500" // for 'stopped'
                    }`}
                  >
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

                    <div className="grid grid-cols-2 gap-1 mt-3">
                      {timer.isRunning && timer.status === "running" ? (
                        <>
                          <button
                            onClick={() =>
                              handleTimerAction("pause", timer.ticketNumber)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Pause
                          </button>
                          <button
                            onClick={() =>
                              handleTimerAction("hold", timer.ticketNumber)
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Hold
                          </button>
                        </>
                      ) : timer.status === "paused" ? (
                        <>
                          <button
                            onClick={() =>
                              handleTimerAction("resume", timer.ticketNumber)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Resume
                          </button>
                          <button
                            onClick={() =>
                              handleTimerAction("hold", timer.ticketNumber)
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Hold
                          </button>
                        </>
                      ) : timer.status === "hold" ? (
                        <>
                          <button
                            onClick={() =>
                              handleTimerAction("resume", timer.ticketNumber)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Resume
                          </button>
                          <button
                            onClick={() =>
                              handleTimerAction("start", timer.ticketNumber)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Restart
                          </button>
                        </>
                      ) : timer.status === "completed" ||
                        timer.status === "stopped" ? (
                        <>
                          <button
                            onClick={() =>
                              handleTimerAction("start", timer.ticketNumber)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs font-medium col-span-2"
                          >
                            Start New
                          </button>
                        </>
                      ) : (
                        // Should not be reached if all statuses handled
                        <div className="text-xs text-gray-400 col-span-2">
                          No actions available
                        </div>
                      )}

                      {/* Common Actions: Complete and Stop - always available unless already completed/stopped */}
                      {timer.status !== "completed" &&
                        timer.status !== "stopped" && (
                          <button
                            onClick={() =>
                              handleTimerAction("complete", timer.ticketNumber)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
                          >
                            Complete
                          </button>
                        )}
                      {/* Make sure "Start New" for completed/stopped doesn't overlap these if they are also present */}
                      {!(
                        timer.status === "completed" ||
                        timer.status === "stopped"
                      ) && (
                        <button
                          onClick={() =>
                            handleTimerAction("stop", timer.ticketNumber)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs font-medium"
                        >
                          Stop
                        </button>
                      )}
                      {
                        (timer.status === "completed" ||
                          timer.status === "stopped") && (
                          <div className="col-span-2"></div>
                        ) /* Placeholder for grid */
                      }
                    </div>
                    {timer.sessions.length > 0 && ( // Show session summary if there's at least one session, even if not many
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
                                  {formatTime(session.duration)} (
                                  {session.status})
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
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWindow;
