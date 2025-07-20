// renderer/hooks/useSharedData.ts - NEW FILE
import { useState, useEffect } from "react";

type LoadingState = 'initializing' | 'loading-data' | 'ready';

export function useSharedData() {
  const [projectData, setProjectData] = useState([]);
  const [sessions, setSessions] = useState({});
  const [billingData, setBillingData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState<LoadingState>('initializing');

  useEffect(() => {
    // Load initial data
    const loadData = async () => {
      try {
        setLoadingState('loading-data');
        
        const [allTasks, sessionData, billing, projectsData] = await Promise.all([
          window.ipc.invoke("get-all-tasks"),
          window.ipc.invoke("get-sessions"),
          window.ipc.invoke("get-billing-data").catch(error => {
            console.error("Failed to load billing data:", error);
            return null; // Return null as fallback
          }),
          window.ipc.invoke("get-projects").catch(error => {
            console.error("Failed to load projects data:", error);
            return []; // Return empty array as fallback
          }),
        ]);
        
        setProjectData(allTasks || []);
        setSessions(sessionData || {});
        setBillingData(billing || null);
        setProjects(projectsData || []);
        
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
    const cleanupBilling = window.ipc.on("billing-updated", (data) => {
      console.log("Billing data updated:", data);
      setBillingData(data);
    });
    const cleanupProjects = window.ipc.on("projects-updated", (data) => {
      console.log("Projects data updated:", data);
      setProjects(data);
    });

    loadData();

    return () => {
      cleanupProject();
      cleanupManual();
      cleanupSessions();
      cleanupBilling();
      cleanupProjects();
    };
  }, []);

  const saveSession = (sessionData: any) => {
    window.ipc.send("save-session", sessionData);
  };

  return { 
    projectData, 
    sessions, 
    billingData,
    projects,
    loading, 
    loadingState,
    isReady: loadingState === 'ready',
    saveSession 
  };
}
