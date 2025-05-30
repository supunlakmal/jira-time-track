import React, { useEffect, useState } from "react";
import type { TaskTimer } from "../types/electron";

const FloatingWindow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [timers, setTimers] = useState<TaskTimer[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update timers every second
    const id = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.isRunning) {
            return {
              ...timer,
              elapsedTime: timer.elapsedTime + 1000,
            };
          }
          return timer;
        })
      );
    }, 1000);
    setIntervalId(id);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleTaskStarted = (_, ticket: string) => {
      setTimers((prev) => {
        // Check if timer already exists
        if (prev.find((t) => t.ticketNumber === ticket)) {
          return prev;
        }
        return [
          ...prev,
          {
            ticketNumber: ticket,
            ticketName: ticket, // You might want to fetch the name from somewhere
            startTime: Date.now(),
            elapsedTime: 0,
            isRunning: true,
          },
        ];
      });
    };

    const handleTaskPaused = (_, ticket: string) => {
      setTimers((prev) =>
        prev.map((timer) =>
          timer.ticketNumber === ticket ? { ...timer, isRunning: false } : timer
        )
      );
    };

    const handleTaskResumed = (_, ticket: string) => {
      setTimers((prev) =>
        prev.map((timer) =>
          timer.ticketNumber === ticket ? { ...timer, isRunning: true } : timer
        )
      );
    };

    const handleTaskStopped = (_, ticket: string) => {
      setTimers((prev) =>
        prev.filter((timer) => timer.ticketNumber !== ticket)
      );
    };

    // Add listeners
    window.ipc.on("task-started", handleTaskStarted);
    window.ipc.on("task-paused", handleTaskPaused);
    window.ipc.on("task-resumed", handleTaskResumed);
    window.ipc.on("task-stopped", handleTaskStopped);

    return () => {
      // Clean up listeners
      window.ipc.on("task-started", handleTaskStarted);
      window.ipc.on("task-paused", handleTaskPaused);
      window.ipc.on("task-resumed", handleTaskResumed);
      window.ipc.on("task-stopped", handleTaskStopped);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const { movementX, movementY } = e;
      window.ipc.send("window-move", { movementX, movementY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => setIsDragging(false));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", () => setIsDragging(false));
    };
  }, [isDragging]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleClose = () => {
    window.ipc.window.hide();
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      window.ipc.send("window-resize", { height: 40 });
    } else {
      window.ipc.send("window-resize", { height: 400 });
    }
  };

  return (
    <div className="h-screen bg-transparent select-none">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Title bar */}
        <div
          className="bg-gray-800 text-white p-2 flex justify-between items-center cursor-move"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="text-sm font-semibold">Time Tracker</div>
          <div className="flex space-x-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-gray-700 p-1 rounded"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? "□" : "−"}
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-red-500 p-1 rounded"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content area */}
        {!isMinimized && (
          <div className="p-4">
            <div className="space-y-4">
              {timers.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No active timers
                </div>
              ) : (
                timers.map((timer) => (
                  <div
                    key={timer.ticketNumber}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {timer.ticketNumber}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {timer.ticketName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium text-gray-900">
                          {formatTime(timer.elapsedTime)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {timer.isRunning ? "Running" : "Paused"}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      {timer.isRunning ? (
                        <button
                          onClick={() =>
                            window.ipc.send("pause-task", {
                              ticket: timer.ticketNumber,
                            })
                          }
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm"
                        >
                          Pause
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            window.ipc.send("resume-task", {
                              ticket: timer.ticketNumber,
                            })
                          }
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                        >
                          Resume
                        </button>
                      )}
                      <button
                        onClick={() =>
                          window.ipc.send("stop-task", {
                            ticket: timer.ticketNumber,
                          })
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                      >
                        Stop
                      </button>
                    </div>
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
