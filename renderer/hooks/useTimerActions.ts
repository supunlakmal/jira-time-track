// renderer/hooks/useTimerActions.ts
import { useState, useEffect, useRef } from "react";
import { useSharedData } from "./useSharedData";
import { TaskTimer } from "../types/dashboard";
import { TimerSession } from "../store/sessionsSlice";

export type TimerActionType = "start" | "pause" | "resume" | "hold" | "complete" | "stop";

export interface TimerActionPayload {
  ticketName?: string;
  storyPoints?: number;
}

export interface UseTimerActionsReturn {
  // State
  timers: TaskTimer[];
  ticketData: { [key: string]: string };
  
  // Actions
  handleTimerAction: (action: TimerActionType, ticketNumber: string, payload?: TimerActionPayload) => void;
  handleDeleteTimer: (ticketNumber: string) => void;
  
  // Utilities
  formatTime: (ms: number) => string;
  getStatusColor: (status: TaskTimer["status"], isRunning: boolean) => string;
  getStatusIcon: (status: TaskTimer["status"], isRunning: boolean) => string;
  getStatusText: (status: TaskTimer["status"], isRunning: boolean) => string;
  getMinimalStatusColorClass: (status: TaskTimer["status"], isRunning: boolean) => string;
}

export function useTimerActions(targetTicketId?: string): UseTimerActionsReturn {
  const { saveSession, sessions } = useSharedData();
  const [timers, setTimers] = useState<TaskTimer[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [ticketData, setTicketData] = useState<{ [key: string]: string }>({});

  // Load existing timers from Redux sessions on mount
  useEffect(() => {
    if (sessions && Object.keys(sessions).length > 0) {
      const sessionsRecord = sessions as { [key: string]: TimerSession };
      const existingTimers: TaskTimer[] = Object.values(sessionsRecord).map(sessionData => {
        // Find the last session to determine current status
        const lastSession = sessionData.sessions[sessionData.sessions.length - 1];
        let currentStatus: TaskTimer["status"] = "stopped";
        let isRunning = false;
        
        if (lastSession) {
          // If the last session has no end time, it's active
          if (!lastSession.endTime) {
            isRunning = true;
            currentStatus = lastSession.status === "running" ? "running" : 
                          lastSession.status === "paused" ? "paused" :
                          lastSession.status === "hold" ? "hold" : "running";
          } else {
            // Session has ended, use the session status
            currentStatus = lastSession.status === "completed" ? "completed" : "stopped";
          }
        }
        
        return {
          ticketNumber: sessionData.ticketNumber,
          ticketName: sessionData.ticketName,
          startTime: sessionData.sessions[0]?.startTime || Date.now(),
          elapsedTime: 0, // Reset elapsed time as it will be calculated by the interval
          isRunning,
          status: currentStatus,
          totalElapsed: sessionData.totalElapsed,
          sessions: sessionData.sessions,
          storyPoints: sessionData.storyPoints,
        };
      }).filter(timer => 
        // Only include timers that have active sessions (running, paused, or on hold)
        timer.status === "running" || timer.status === "paused" || timer.status === "hold"
      );
      
      if (existingTimers.length > 0) {
        console.log("useTimerActions: Loading existing timers:", existingTimers);
        setTimers(existingTimers);
      }
    }
  }, []); // Only run once on mount

  // Load ticket data on mount
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

  // Update timer names when ticket data loads
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

  // Timer interval for elapsed time updates
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
  }, [saveSession]);

  // Delete timer function
  const handleDeleteTimer = (ticketNumber: string) => {
    setTimers((prevTimers) =>
      prevTimers.filter((timer) => timer.ticketNumber !== ticketNumber)
    );
    window.ipc.send("delete-task", { ticket: ticketNumber });
  };

  // Main timer action handler
  const handleTimerAction = (
    action: TimerActionType,
    ticketNumber: string,
    payload?: TimerActionPayload
  ) => {
    const actionTime = Date.now();
    const existingTimer = timers.find((t) => t.ticketNumber === ticketNumber);

    // Handle starting a timer that doesn't exist in the active list
    if (action === "start" && !existingTimer) {
      const ticketName = payload?.ticketName || ticketData[ticketNumber] || ticketNumber;
      const storyPoints = payload?.storyPoints;

      // Check if there's a previous session in Redux store to get totalElapsed from
      const previousSession = sessions && sessions[ticketNumber];
      const totalElapsed = previousSession ? previousSession.totalElapsed : 0;
      const existingSessions = previousSession ? previousSession.sessions : [];

      const newTimer: TaskTimer = {
        ticketNumber,
        ticketName,
        storyPoints,
        startTime: actionTime,
        elapsedTime: 0,
        isRunning: true,
        status: "running",
        totalElapsed: totalElapsed, // Carry over total elapsed time
        sessions: [
          ...existingSessions,
          { startTime: actionTime, duration: 0, status: "running" },
        ],
      };

      setTimers((prevTimers) => [...prevTimers, newTimer]);

      saveSession({
        ticketNumber: newTimer.ticketNumber,
        ticketName: newTimer.ticketName,
        storyPoints: newTimer.storyPoints,
        sessions: newTimer.sessions,
        totalElapsed: newTimer.totalElapsed,
      });

      window.ipc.send("start-task", {
        ticket: ticketNumber,
        name: ticketName,
        storyPoints: storyPoints,
      });
      return;
    }
    
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

  // IPC Event Handlers
  useEffect(() => {
    const handleTaskStarted = (data: {
      ticketNumber: string;
      ticketName: string;
      storyPoints?: number;
    }) => {
      const { ticketNumber, ticketName, storyPoints } = data;
      console.log(
        "useTimerActions: IPC task-started received:",
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
              isRunning: true,
              status: "running", // Initial status is queue
              totalElapsed: 0,
              sessions: [
                { startTime: eventTime, duration: 0, status: "running" },
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
  }, [ticketData, timers, saveSession]);

  // Utility functions
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

  // Filter timers by target ticket ID if provided
  const filteredTimers = targetTicketId 
    ? timers.filter(timer => timer.ticketNumber === targetTicketId)
    : timers;

  return {
    timers: filteredTimers,
    ticketData,
    handleTimerAction,
    handleDeleteTimer,
    formatTime,
    getStatusColor,
    getStatusIcon,
    getStatusText,
    getMinimalStatusColorClass,
  };
}