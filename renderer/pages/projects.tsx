// renderer/pages/projects.tsx
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";

import ProjectsOverview from "../components/dashboard/ProjectsOverview";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useSharedData } from "../hooks/useSharedData";
import { ProjectSummary } from "../types/dashboard";
import Dashboard from "./dashboard";

export default function ProjectsPage() {
  const { projectData: data, sessions, billingData, loading } = useSharedData();
  const [projectPaths, setProjectPaths] = useState<Record<string, string>>({});
  const [projectBranches, setProjectBranches] = useState<
    Record<string, string>
  >({});

  // Load project paths from main process on component mount
  useEffect(() => {
    const loadPaths = async () => {
      try {
        if (window.ipc && typeof window.ipc.invoke === "function") {
          const storedPaths = await window.ipc.invoke("get-project-paths");
          setProjectPaths(
            storedPaths && typeof storedPaths === "object" ? storedPaths : {}
          );
        } else {
          console.warn(
            "window.ipc.invoke not available. Project paths won't be loaded/saved."
          );
          setProjectPaths({});
        }
      } catch (e) {
        console.error("Failed to load project paths via IPC:", e);
        setProjectPaths({});
      }
    };
    loadPaths();
  }, []);

  // Load current branches for projects with paths
  useEffect(() => {
    const loadBranches = async () => {
      const branches: Record<string, string> = {};
      for (const [projectName, projectPath] of Object.entries(projectPaths)) {
        if (
          projectPath &&
          window.ipc &&
          typeof window.ipc.invoke === "function"
        ) {
          try {
            const branchResult = await window.ipc.invoke("get-current-branch", {
              projectName,
              projectPath,
            });
            if (branchResult && branchResult.branch) {
              branches[projectName] = branchResult.branch;
            } else if (branchResult && branchResult.error) {
              branches[projectName] = "Error";
              console.warn(
                `Failed to get branch for ${projectName}:`,
                branchResult.error
              );
            }
          } catch (e) {
            console.error(`Error getting branch for ${projectName}:`, e);
            branches[projectName] = "Unknown";
          }
        }
      }
      setProjectBranches(branches);
    };

    if (Object.keys(projectPaths).length > 0) {
      loadBranches();
    }
  }, [projectPaths]);

  // Function to save paths to the main process
  const saveProjectPaths = (newPaths: Record<string, string>) => {
    if (window.ipc && typeof window.ipc.send === "function") {
      window.ipc.send("save-project-paths", newPaths);
      setProjectPaths(newPaths);
    } else {
      console.warn(
        "window.ipc.send not available. Project paths cannot be saved."
      );
      setProjectPaths(newPaths);
    }
  };

  const getProjectName = (ticketNumber: string): string => {
    if (!ticketNumber || !ticketNumber.includes("-")) return "N/A";
    return ticketNumber.split("-")[0];
  };

  // Helper function to format time
  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  // Enhanced project summary with time tracking data
  const projectSummaryData = useMemo((): ProjectSummary[] => {
    if (!data || data.length === 0) return [];

    const summary: Record<
      string,
      {
        count: number;
        totalStoryPoints: number;
        completedTickets: number;
        inProgressTickets: number;
        totalTimeSpent: number;
      }
    > = {};

    data.forEach((ticket) => {
      const projectName = getProjectName(ticket.ticket_number);
      if (projectName === "N/A") return;

      if (!summary[projectName]) {
        summary[projectName] = {
          count: 0,
          totalStoryPoints: 0,
          completedTickets: 0,
          inProgressTickets: 0,
          totalTimeSpent: 0,
        };
      }

      summary[projectName].count++;
      summary[projectName].totalStoryPoints += ticket.story_points || 0;

      // Check if ticket has time tracking data
      const ticketSession = sessions[ticket.ticket_number];
      if (ticketSession) {
        summary[projectName].totalTimeSpent += ticketSession.totalElapsed || 0;

        if (ticketSession.sessions.some((s) => s.status === "completed")) {
          summary[projectName].completedTickets++;
        } else if (
          ticketSession.sessions.some(
            (s) => s.status === "running" || s.status === "paused"
          )
        ) {
          summary[projectName].inProgressTickets++;
        }
      }
    });

    return Object.entries(summary)
      .map(([name, projectData]) => ({
        name,
        ticketCount: projectData.count,
        location: projectPaths[name] || undefined,
        currentBranch: projectBranches[name] || undefined,
        totalStoryPoints: projectData.totalStoryPoints,
        averageStoryPoints:
          projectData.count > 0
            ? projectData.totalStoryPoints / projectData.count
            : 0,
        completedTickets: projectData.completedTickets,
        inProgressTickets: projectData.inProgressTickets,
        totalTimeSpent: projectData.totalTimeSpent,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, projectPaths, projectBranches, sessions]);


  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  const handleProjectSelect = (projectName: string | null) => {
    // Project selection handled by navigation to project overview page
  };

  const handleChooseProjectPath = async (projectName: string) => {
    if (window.ipc && typeof window.ipc.invoke === "function") {
      try {
        const result = await window.ipc.invoke(
          "select-project-directory",
          projectName
        );
        if (result && result.filePath) {
          const newPaths = { ...projectPaths, [projectName]: result.filePath };
          saveProjectPaths(newPaths);
        } else if (result && result.error) {
          console.error("Error selecting directory:", result.error);
        }
      } catch (e) {
        console.error("Error invoking select-project-directory:", e);
        alert("Failed to open directory picker.");
      }
    } else {
      alert("Directory picker not available (IPC error).");
    }
  };

  const refreshBranch = async (projectName: string, projectPath: string) => {
    if (window.ipc && typeof window.ipc.invoke === "function") {
      try {
        const branchResult = await window.ipc.invoke("get-current-branch", {
          projectName,
          projectPath,
        });
        if (branchResult && branchResult.branch) {
          setProjectBranches((prev) => ({
            ...prev,
            [projectName]: branchResult.branch,
          }));
        } else if (branchResult && branchResult.error) {
          setProjectBranches((prev) => ({
            ...prev,
            [projectName]: "Error",
          }));
          console.warn(
            `Failed to refresh branch for ${projectName}:`,
            branchResult.error
          );
        }
      } catch (e) {
        console.error(`Error refreshing branch for ${projectName}:`, e);
        setProjectBranches((prev) => ({
          ...prev,
          [projectName]: "Unknown",
        }));
      }
    }
  };


  return (
    <React.Fragment>
      <Dashboard toggleFloatingWindow={toggleFloatingWindow}>
        <Head>
          <title>Projects - Project Time Tracker</title>
        </Head>
        <div className="">
          <div className="">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ProjectsOverview
                  projectSummaryData={projectSummaryData}
                  selectedProject={null}
                  handleProjectSelect={handleProjectSelect}
                  handleChooseProjectPath={handleChooseProjectPath}
                  refreshBranch={refreshBranch}
                  formatTime={formatTime}
                  billingData={billingData}
                  sessions={sessions}
                />
              </>
            )}
          </div>
        </div>
      </Dashboard>
    </React.Fragment>
  );
}
