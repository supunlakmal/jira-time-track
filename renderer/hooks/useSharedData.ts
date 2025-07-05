// renderer/hooks/useSharedData.ts - NEW FILE
import { useState, useEffect } from "react";

export function useSharedData() {
  const [jiraData, setJiraData] = useState([]);
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        const [allTasks, sessionData] = await Promise.all([
          window.ipc.invoke("get-all-tasks"),
          window.ipc.invoke("get-sessions"),
        ]);
        setJiraData(allTasks || []);
        setSessions(sessionData || {});
      } finally {
        setLoading(false);
      }
    };

    // Listen for updates
    const cleanupJira = window.ipc.on("jira-data-updated", () => {
      // Reload all tasks when Jira data changes
      window.ipc.invoke("get-all-tasks").then(setJiraData);
    });
    const cleanupManual = window.ipc.on("manual-tasks-updated", () => {
      // Reload all tasks when manual tasks change
      window.ipc.invoke("get-all-tasks").then(setJiraData);
    });
    const cleanupSessions = window.ipc.on("sessions-updated", setSessions);

    loadData();

    return () => {
      cleanupJira();
      cleanupManual();
      cleanupSessions();
    };
  }, []);

  const saveSession = (sessionData: any) => {
    window.ipc.send("save-session", sessionData);
  };

  return { jiraData, sessions, loading, saveSession };
}
