// renderer/hooks/useSharedData.ts - NEW FILE
import { useState, useEffect } from "react";

type LoadingState = 'initializing' | 'loading-data' | 'ready';

export function useSharedData() {
  const [projectData, setProjectData] = useState([]);
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>('initializing');

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        setLoadingState('loading-data');
        
        const [allTasks, sessionData] = await Promise.all([
          window.ipc.invoke("get-all-tasks"),
          window.ipc.invoke("get-sessions"),
        ]);
        
        setProjectData(allTasks || []);
        setSessions(sessionData || {});
        
        // Add a small delay to ensure smooth transitions
        await new Promise(resolve => setTimeout(resolve, 200));
        
        setLoadingState('ready');
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

  const saveSession = (sessionData: any) => {
    window.ipc.send("save-session", sessionData);
  };

  return { 
    projectData, 
    sessions, 
    loading, 
    loadingState,
    isReady: loadingState === 'ready',
    saveSession 
  };
}
