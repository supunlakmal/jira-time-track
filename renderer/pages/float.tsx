// renderer/pages/float.tsx
import React, { useEffect, useRef, useState } from "react";
import { useSharedData } from "../hooks/useSharedData";
import { useFloatingWindowShortcuts } from "../hooks/useKeyboardShortcuts";

export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped" | "queue";
  totalElapsed: number;
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string;
  }>;
  storyPoints?: number;
}

const FloatingWindow: React.FC = () => {
  const { saveSession } = useSharedData();
  const [isDragging, setIsDragging] = useState(false);
  const [timers, setTimers] = useState<TaskTimer[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ticketData, setTicketData] = useState<{ [key: string]: string }>({});
  const [selectedTicketNumber, setSelectedTicketNumber] = useState<
    string | null
  >(null);

  // Keyboard shortcuts
  useFloatingWindowShortcuts({
    onToggleFloating: () => window.ipc?.send('toggle-float-window'),
    onStartTimer: () => {
      const runningTimer = timers.find(t => t.isRunning && t.status === 'running');
      if (runningTimer) {
        handleTimerAction('pause', runningTimer.ticketNumber);
      } else {
        const pausedTimer = timers.find(t => t.status === 'paused');
        if (pausedTimer) {
          handleTimerAction('resume', pausedTimer.ticketNumber);
        }
      }
    }
  });


  useEffect(() => {
    const loadTicketData = async () => {
      try {
        const data = (await window.ipc.send(
          "load-project-data",
          undefined
        )) as Array<{
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
          console.warn("load-project-data did not return valid data", data);
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

  // Update tray status when timers change
  useEffect(() => {
    const activeTimers = timers.filter(t => t.isRunning && t.status === 'running').length;
    if (window.ipc && typeof window.ipc.invoke === 'function') {
      window.ipc.invoke('update-tray-status', { activeTimers }).catch(console.error);
    }
  }, [timers]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.status === "running") {
            const newElapsedSegmentTime = timer.elapsedTime + 1000;
            const updatedTimer = {
              ...timer,
              elapsedTime: newElapsedSegmentTime,
              totalElapsed: timer.totalElapsed + 1000,
              sessions: timer.sessions.map((session, index) =>
                index === timer.sessions.length - 1 && !session.endTime
                  ? { ...session, duration: session.duration + 1000 }
                  : session
              ),
            };

            // Save to Redux

            saveSession({
              ticketNumber: timer.ticketNumber,
              ticketName: timer.ticketName,
              storyPoints: timer.storyPoints,
              sessions: updatedTimer.sessions,
              totalElapsed: updatedTimer.totalElapsed,
            });

            return updatedTimer;
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

  const handleDeleteTimer = (ticketNumber: string) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.ticketNumber !== ticketNumber)
    );
    if (selectedTicketNumber === ticketNumber) {
      setSelectedTicketNumber(null);
    }
    window.ipc.send("delete-task", { ticket: ticketNumber });
  };

  const handleTimerAction = (
    action: "start" | "pause" | "resume" | "hold" | "complete" | "stop",
    ticketNumber: string
  ) => {
    const actionTime = Date.now();
    let ticketNameForIPC = "";

    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.ticketNumber !== ticketNumber) return timer;

        ticketNameForIPC =
          timer.ticketName ||
          ticketData[timer.ticketNumber] ||
          timer.ticketNumber;

        let newSessions = [...timer.sessions];
        let newElapsedTime = timer.elapsedTime;
        let newIsRunning = timer.isRunning;
        let newStatus: TaskTimer["status"] = timer.status;
        const lastSessionIndex = newSessions.length - 1;

        if (lastSessionIndex >= 0 && !newSessions[lastSessionIndex].endTime) {
          if (
            timer.isRunning &&
            (action === "pause" ||
              action === "hold" ||
              action === "complete" ||
              action === "stop")
          ) {
            newSessions[lastSessionIndex] = {
              ...newSessions[lastSessionIndex],
              endTime: actionTime,
              duration: timer.elapsedTime,
              status: action === "complete" ? "completed" : action,
            };
          } else if (
            !timer.isRunning &&
            (action === "resume" ||
              (action === "start" &&
                (timer.status === "paused" || timer.status === "hold")))
          ) {
            newSessions[lastSessionIndex] = {
              ...newSessions[lastSessionIndex],
              endTime: actionTime,
            };
          }
        }
        switch (action) {
          case "start":
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0;
            // For tasks in queue, we want to start a fresh session
            if (timer.status === "queue") {
              newSessions = [
                {
                  startTime: actionTime,
                  duration: 0,
                  status: "running",
                },
              ];
            } else {
              newSessions.push({
                startTime: actionTime,
                duration: 0,
                status: "running",
              });
            }
            break;
          case "pause":
            newIsRunning = false;
            newStatus = "paused";
            break;
          case "resume":
            newIsRunning = true;
            newStatus = "running";
            newElapsedTime = 0;
            newSessions.push({
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
        const updatedTimer = {
          ...timer,
          isRunning: newIsRunning,
          status: newStatus,
          elapsedTime: newElapsedTime,
          sessions: newSessions,
        };

        // Save to Redux
        saveSession({
          ticketNumber: timer.ticketNumber,
          ticketName: timer.ticketName,
          storyPoints: timer.storyPoints,
          sessions: newSessions,
          totalElapsed: timer.totalElapsed,
        });

        return updatedTimer;
      })
    );

    const timerDetails = {
      ticket: ticketNumber,
      name: ticketNameForIPC,
      storyPoints: timers.find((t) => t.ticketNumber === ticketNumber)
        ?.storyPoints,
    };
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

  useEffect(() => {
    const handleTaskStarted = (data: {
      ticketNumber: string;
      ticketName: string;
      storyPoints?: number;
    }) => {
      const { ticketNumber, ticketName, storyPoints } = data;
      console.log(
        "Float: IPC task-started received:",
        ticketNumber,
        ticketName,
        `SP: ${storyPoints}`
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
              status: existingTimer.status,
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
            storyPoints: storyPoints || existingTimer.storyPoints,
            sessions: updatedSessions,
            startTime: eventTime,
          };
          return updatedTimers;
        } else {
          return [
            ...prevTimers,
            {
              ticketNumber: ticketNumber,
              ticketName:
                ticketName || ticketData[ticketNumber] || ticketNumber,
              storyPoints: storyPoints,
              startTime: eventTime,
              elapsedTime: 0,
              isRunning: false,
              status: "queue", // Initial status is queue
              totalElapsed: 0,
              sessions: [
                { startTime: eventTime, duration: 0, status: "queue" },
              ],
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

            if (
              lastSessionIdx >= 0 &&
              !updatedSessions[lastSessionIdx].endTime &&
              (updatedSessions[lastSessionIdx].status === "paused" ||
                updatedSessions[lastSessionIdx].status === "hold")
            ) {
              updatedSessions[lastSessionIdx] = {
                ...updatedSessions[lastSessionIdx],
                endTime: eventTime,
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
                  : updatedSessions[lastSessionIdx].duration,
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
  }, [ticketData]);

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
  const getStatusColor = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "text-green-600";
    if (status === "queue") return "text-purple-600";
    if (status === "paused") return "text-yellow-600";
    if (status === "hold") return "text-orange-600";
    if (status === "completed") return "text-blue-600";
    if (status === "stopped") return "text-gray-600";
    return "text-gray-500";
  };
  const getStatusIcon = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "●";
    if (status === "queue") return "⊕";
    if (status === "paused") return "⏸";
    if (status === "hold") return "⏳";
    if (status === "completed") return "✓";
    if (status === "stopped") return "⏹";
    return "○";
  };
  const getMinimalStatusColorClass = (
    status: TaskTimer["status"],
    isRunning: boolean
  ) => {
    if (isRunning && status === "running") return "bg-green-500";
    if (status === "queue") return "bg-purple-500";
    if (status === "paused") return "bg-yellow-500";
    if (status === "hold") return "bg-orange-500";
    if (status === "completed") return "bg-blue-500";
    if (status === "stopped") return "bg-gray-400";
    return "bg-gray-300";
  };
  const getStatusText = (status: TaskTimer["status"], isRunning: boolean) => {
    if (isRunning && status === "running") return "Running";
    if (status === "queue") return "In Queue";
    if (status === "paused") return "Paused";
    if (status === "hold") return "On Hold";
    if (status === "completed") return "Completed";
    if (status === "stopped") return "Stopped";
    return "Unknown";
  };

  const handleClose = () => window.ipc.window.hide();



  const renderTimerDetail = (timer: TaskTimer | undefined) => {
    if (!timer) {
      return (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          Timer details not available.
          <button
            onClick={() => setSelectedTicketNumber(null)}
            className="mt-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded text-sm"
          >
            Back to Grid
          </button>
        </div>
      );
    }


    const estimatedTimeMs = (timer.storyPoints || 0) * 60 * 60 * 1000;
    let progressWidthPercentage = 0;
    let progressBarColorClass = "bg-blue-600";

    if (estimatedTimeMs > 0) {
      // This also implies timer.storyPoints is > 0
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
          <button
            onClick={() => handleDeleteTimer(timer.ticketNumber)}
            className="text-red-500 hover:text-red-700 text-sm font-medium p-1 rounded hover:bg-red-50"
            title="Delete Timer"
          >
            🗑️
          </button>
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
              className="text-xs text-gray-500 line-clamp-2"
              title={timer.ticketName}
            >
              {timer.ticketName}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-lg font-mono font-medium text-gray-900 dark:text-gray-100">
              {formatTime(timer.totalElapsed)}
            </div>
            <div className="text-xs text-gray-400">
              Session: {formatTime(timer.elapsedTime)}
            </div>
            {timer.storyPoints && timer.storyPoints > 0 && (
              <div className="text-xs text-gray-500 mt-0.5">
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
        {/* START: Progress Bar */}
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
              <button
                onClick={() => handleTimerAction("start", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium col-span-2"
              >
                Start Timer
              </button>
              {/* No Complete/Stop buttons for queued tasks */}
            </>
          ) : timer.isRunning && timer.status === "running" ? (
            <>
              <button
                onClick={() => handleTimerAction("pause", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Pause
              </button>
              <button
                onClick={() => handleTimerAction("hold", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Hold
              </button>
            </>
          ) : timer.status === "paused" ? (
            <>
              <button
                onClick={() => handleTimerAction("resume", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Resume
              </button>
              <button
                onClick={() => handleTimerAction("hold", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Hold
              </button>
            </>
          ) : timer.status === "hold" ? (
            <>
              <button
                onClick={() => handleTimerAction("resume", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Resume
              </button>
              <button
                onClick={() => handleTimerAction("start", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Start New Session
              </button>
            </>
          ) : timer.status === "completed" || timer.status === "stopped" ? (
            <button
              onClick={() => handleTimerAction("start", timer.ticketNumber)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium col-span-2"
            >
              Start New Session
            </button>
          ) : null}{" "}
          {timer.status !== "completed" &&
            timer.status !== "stopped" &&
            timer.status !== "queue" && (
              <button
                onClick={() =>
                  handleTimerAction("complete", timer.ticketNumber)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Complete
              </button>
            )}
          {timer.status !== "completed" &&
            timer.status !== "stopped" &&
            timer.status !== "queue" && (
              <button
                onClick={() => handleTimerAction("stop", timer.ticketNumber)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium"
              >
                Stop
              </button>
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

  const currentTimerDetails = selectedTicketNumber
    ? timers.find((t) => t.ticketNumber === selectedTicketNumber)
    : null;

  return (
    <div className="h-screen bg-transparent select-none">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
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
                : timers.length > 0
                ? `(${timers.length} task${timers.length > 1 ? "s" : ""})`
                : ""}
            </div>
          </div>
          <div className="flex space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded px-1">
              <button
                onClick={() => window.ipc?.zoom?.out()}
                className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-xs w-5 h-5 flex items-center justify-center"
                title="Zoom out (Ctrl+-)"
              >
                -
              </button>
              <button
                onClick={() => window.ipc?.zoom?.reset()}
                className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-xs w-5 h-5 flex items-center justify-center"
                title="Reset zoom (Ctrl+0)"
              >
                ⊙
              </button>
              <button
                onClick={() => window.ipc?.zoom?.in()}
                className="p-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-xs w-5 h-5 flex items-center justify-center"
                title="Zoom in (Ctrl+=)"
              >
                +
              </button>
            </div>
            <button
              onClick={handleClose}
              className="hover:bg-red-500 p-1 rounded text-xs w-6 h-6 flex items-center justify-center"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-grow">
            {selectedTicketNumber && currentTimerDetails ? (
              renderTimerDetail(currentTimerDetails)
            ) : selectedTicketNumber && !currentTimerDetails ? (
              <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                <p>Timer '{selectedTicketNumber}' not found.</p>
                <button
                  onClick={() => setSelectedTicketNumber(null)}
                  className="mt-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1 px-3 rounded text-sm"
                >
                  Back to Grid
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {timers.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 p-4">
                    No active timers. Start one from the main app.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {timers.map((timer) => (
                      <button
                        key={timer.ticketNumber}
                        onClick={() =>
                          setSelectedTicketNumber(timer.ticketNumber)
                        }
                        className="p-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        title={`View details for ${timer.ticketNumber}\n${
                          timer.ticketName
                        }\nStatus: ${getStatusText(
                          timer.status,
                          timer.isRunning
                        )}${
                          timer.storyPoints
                            ? `\nEst: ${formatTime(
                                timer.storyPoints * 3600000
                              )}`
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
                              ? ` (Est: ${formatTime(
                                  timer.storyPoints * 3600000
                                )})`
                              : "")
                          }
                        >
                          {timer.ticketName.startsWith(timer.ticketNumber) &&
                          timer.ticketName !== timer.ticketNumber
                            ? timer.ticketName
                                .substring(timer.ticketNumber.length)
                                .trim()
                                .startsWith("-")
                              ? timer.ticketName
                                  .substring(timer.ticketNumber.length + 2)
                                  .trim()
                              : timer.ticketName
                            : timer.ticketName === timer.ticketNumber
                            ? ""
                            : timer.ticketName}
                          {timer.storyPoints
                            ? ` (${timer.storyPoints.toFixed(1)} SP)`
                            : ""}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default FloatingWindow;
