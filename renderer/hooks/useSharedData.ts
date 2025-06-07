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
        const [jira, sessionData] = await Promise.all([
          window.ipc.invoke("load-jira-data"),
          window.ipc.invoke("get-sessions"),
        ]);
        setJiraData(jira || []);
        setSessions(sessionData || {});
      } finally {
        setLoading(false);
      }
    };

    // Listen for updates
    const cleanupJira = window.ipc.on("jira-data-updated", setJiraData);
    const cleanupSessions = window.ipc.on("sessions-updated", setSessions);

    loadData();

    return () => {
      cleanupJira();
      cleanupSessions();
    };
  }, []);

  const saveSession = (sessionData: any) => {
    window.ipc.send("save-session", sessionData);
  };

  return { jiraData, sessions, loading, saveSession };
}
