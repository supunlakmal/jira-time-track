// renderer/hooks/useSharedData.ts - NEW FILE
import { useState, useEffect } from "react";
import { Task, TimerSession, UseSharedDataReturn } from "../../types";

export function useSharedData(): UseSharedDataReturn {
  const [projectData, setProjectData] = useState<Task[]>([]);
  const [sessions, setSessions] = useState<{ [ticketNumber: string]: TimerSession }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        const [allTasks, sessionData] = await Promise.all([
          window.ipc.invoke("get-all-tasks"),
          window.ipc.invoke("get-sessions"),
        ]);
        setProjectData(allTasks || []);
        setSessions(sessionData || {});
      } finally {
        setLoading(false);
      }
    };

    // Listen for updates
    const cleanupProject = window.ipc.on("project-data-updated", () => {
      // Reload all tasks when Project data changes
      window.ipc.invoke("get-all-tasks").then(setProjectData);
    });
    const cleanupManual = window.ipc.on("manual-tasks-updated", () => {
      // Reload all tasks when manual tasks change
      window.ipc.invoke("get-all-tasks").then(setProjectData);
    });
    const cleanupSessions = window.ipc.on("sessions-updated", setSessions);

    loadData();

    return () => {
      cleanupProject();
      cleanupManual();
      cleanupSessions();
    };
  }, []);

  const saveSession = (sessionData: TimerSession) => {
    window.ipc.send("save-session", sessionData);
  };

  return { projectData, sessions, loading, saveSession };
}
