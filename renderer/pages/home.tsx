// renderer/pages/home.tsx
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Button from "../components/Button";
import { ExportDialog } from "../components/ExportDialog";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ManualTaskDialog } from "../components/ManualTaskDialog";
import { ResetDialog } from "../components/ResetDialog";
import { ThemeToggle } from "../components/ThemeToggle";
import CsvImportDialog from "../components/CsvImportDialog";
import { useMainWindowShortcuts } from "../hooks/useKeyboardShortcuts";
import { useSharedData } from "../hooks/useSharedData";
import { TimerSession } from "../store/sessionsSlice";
import Overview from "../components/Overview";
import { DashboardStats, ProjectSummary } from "../types/dashboard";
import ProjectsOverview from "../components/ProjectsOverview";
import TicketTableActions from "../components/TicketTableActions";
import TicketTable from "../components/TicketTable";

export default function HomePage() {
  const { projectData: data, sessions, loading } = useSharedData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectPaths, setProjectPaths] = useState<Record<string, string>>({});
  const [projectBranches, setProjectBranches] = useState<
    Record<string, string>
  >({});
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showManualTaskDialog, setShowManualTaskDialog] = useState(false);
  const [showCsvImportDialog, setShowCsvImportDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

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

  // Calculate dashboard statistics
  const dashboardStats = useMemo((): DashboardStats => {
    if (!data || data.length === 0) {
      return {
        totalTickets: 0,
        totalStoryPoints: 0,
        averageStoryPoints: 0,
        totalProjects: 0,
        completedTickets: 0,
        inProgressTickets: 0,
        totalTimeTracked: 0,
        productivity: {
          ticketsPerDay: 0,
          pointsPerDay: 0,
          averageTimePerTicket: 0,
          averageTimePerPoint: 0,
        },
      };
    }

    const totalStoryPoints = data.reduce(
      (sum, ticket) => sum + (ticket.story_points || 0),
      0
    );
    const totalTimeTracked: number = Object.values(
      sessions as { [key: string]: TimerSession }
    ).reduce((sum, session) => sum + (session.totalElapsed || 0), 0);

    const completedTickets = Object.values(
      sessions as { [key: string]: TimerSession }
    ).filter((session) =>
      session.sessions.some((s) => s.status === "completed")
    ).length;

    const inProgressTickets = Object.values(
      sessions as { [key: string]: TimerSession }
    ).filter((session) =>
      session.sessions.some(
        (s) => s.status === "running" || s.status === "paused"
      )
    ).length;

    const uniqueProjects = new Set(
      data.map((ticket) => getProjectName(ticket.ticket_number))
    ).size;

    // Calculate productivity metrics (assuming 30 days)
    const days = 30;
    const ticketsPerDay = data.length / days;
    const pointsPerDay = totalStoryPoints / days;
    const averageTimePerTicket =
      data.length > 0 ? totalTimeTracked / data.length : 0;
    const averageTimePerPoint =
      totalStoryPoints > 0 ? totalTimeTracked / totalStoryPoints : 0;

    return {
      totalTickets: data.length,
      totalStoryPoints,
      averageStoryPoints: data.length > 0 ? totalStoryPoints / data.length : 0,
      totalProjects: uniqueProjects,
      completedTickets,
      inProgressTickets,
      totalTimeTracked,
      productivity: {
        ticketsPerDay,
        pointsPerDay,
        averageTimePerTicket,
        averageTimePerPoint,
      },
    };
  }, [data, sessions]);

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

  const ticketsToDisplay = useMemo(() => {
    let currentTickets = data;
    if (selectedProject) {
      currentTickets = currentTickets.filter(
        (ticket) => getProjectName(ticket.ticket_number) === selectedProject
      );
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      currentTickets = currentTickets.filter(
        (ticket) =>
          ticket.ticket_number.toLowerCase().includes(searchLower) ||
          ticket.ticket_name.toLowerCase().includes(searchLower)
      );
    }
    return currentTickets;
  }, [data, selectedProject, searchTerm]);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  // Keyboard shortcuts
  useMainWindowShortcuts({
    onToggleFloating: toggleFloatingWindow,
    onShowExport: () => setShowExportDialog(true),
    onRefreshData: () => {
      // Refresh data functionality
      window.location.reload();
    },
  });

  const handleProjectSelect = (projectName: string | null) => {
    setSelectedProject(projectName);
    setSearchTerm("");
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

  // Manual task handlers
  const handleAddManualTask = async (taskData: {
    ticket_number: string;
    ticket_name: string;
    story_points?: number;
  }) => {
    try {
      const result = await window.ipc.invoke("add-manual-task", taskData);
      if (result.success) {
        console.log("Manual task added successfully:", result.task);
      } else {
        alert(`Error adding task: ${result.error}`);
      }
    } catch (error) {
      console.error("Error adding manual task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  const handleEditManualTask = async (taskData: {
    ticket_number: string;
    ticket_name: string;
    story_points?: number;
  }) => {
    if (!editingTask) return;

    try {
      const result = await window.ipc.invoke("update-manual-task", {
        taskId: editingTask.ticket_number,
        updates: taskData,
      });
      if (result.success) {
        console.log("Manual task updated successfully:", result.task);
        setEditingTask(null);
      } else {
        alert(`Error updating task: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating manual task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const handleDeleteManualTask = async (ticketNumber: string) => {
    if (!confirm("Are you sure you want to delete this manual task?")) {
      return;
    }

    try {
      const result = await window.ipc.invoke(
        "delete-manual-task",
        ticketNumber
      );
      if (result.success) {
        console.log("Manual task deleted successfully");
      } else {
        alert(`Error deleting task: ${result.error}`);
      }
    } catch (error) {
      console.error("Error deleting manual task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const openEditDialog = (task: any) => {
    setEditingTask(task);
    setShowManualTaskDialog(true);
  };

  const closeManualTaskDialog = () => {
    setShowManualTaskDialog(false);
    setEditingTask(null);
  };

  // CSV import handler
  const handleCsvImport = async (csvData: any[]) => {
    try {
      const result = await window.ipc.invoke("import-csv-data", csvData);
      if (result.success) {
        console.log(
          `Successfully imported ${result.importedCount} tasks from CSV`
        );
        // Data will be automatically refreshed via the shared data hook
      } else {
        alert(`Error importing CSV: ${result.error}`);
      }
    } catch (error) {
      console.error("Error importing CSV:", error);
      alert("Failed to import CSV. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Project Time Tracker</title>
      </Head>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Image
              className="mx-auto mb-4"
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Project Time Tracker Dashboard
            </h1>
            <div className="flex justify-center gap-4 mb-4">
              <Button
                onClick={toggleFloatingWindow}
                variant="primary"
                size="lg"
              >
                Toggle Floating Timer
              </Button>
              <Button
                onClick={() => setShowManualTaskDialog(true)}
                variant="secondary"
                size="lg"
                title="Add a manual task"
              >
                Add Manual Task
              </Button>
              <Button
                onClick={() => setShowCsvImportDialog(true)}
                variant="warning"
                size="lg"
                title="Import tasks from CSV file"
              >
                Import CSV
              </Button>
              <Button
                onClick={() => setShowExportDialog(true)}
                variant="success"
                size="lg"
                title="Export time tracking data"
              >
                Export Data
              </Button>
              <Button
                onClick={() => setShowResetDialog(true)}
                variant="danger"
                size="lg"
                title="Reset application data"
              >
                Reset Data
              </Button>
              <ThemeToggle size="md" />

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1 bg-white dark:bg-gray-800 dark:border-gray-600">
                <Button
                  onClick={() => window.ipc?.zoom?.out()}
                  variant="gray"
                  size="icon"
                  className="w-10 h-10"
                  title="Zoom out (Ctrl+-)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={() => window.ipc?.zoom?.reset()}
                  variant="gray"
                  size="icon"
                  className="w-10 h-10"
                  title="Reset zoom (Ctrl+0)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </Button>
                <Button
                  onClick={() => window.ipc?.zoom?.in()}
                  variant="gray"
                  size="icon"
                  className="w-10 h-10"
                  title="Zoom in (Ctrl+=)"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Dashboard Stats Cards */}
              <Overview
                dashboardStats={dashboardStats}
                projectSummaryData={projectSummaryData}
                formatTime={formatTime}
              />

              <ProjectsOverview
                projectSummaryData={projectSummaryData}
                selectedProject={selectedProject}
                handleProjectSelect={handleProjectSelect}
                handleChooseProjectPath={handleChooseProjectPath}
                refreshBranch={refreshBranch}
                formatTime={formatTime}
              />

              <TicketTableActions
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedProject={selectedProject}
                loading={loading}
                refreshData={() => window.location.reload()}
              />

              <TicketTable
                ticketsToDisplay={ticketsToDisplay}
                sessions={sessions}
                selectedProject={selectedProject}
                searchTerm={searchTerm}
                formatTime={formatTime}
                getProjectName={getProjectName}
                openEditDialog={openEditDialog}
                handleDeleteManualTask={handleDeleteManualTask}
                data={data}
              />
            </>
          )}
        </div>

        {/* Export Dialog */}
        <ExportDialog
          isOpen={showExportDialog}
          onClose={() => setShowExportDialog(false)}
          projects={projectSummaryData.map((p) => p.name)}
        />

        {/* Reset Dialog */}
        <ResetDialog
          isOpen={showResetDialog}
          onClose={() => setShowResetDialog(false)}
        />

        {/* CSV Import Dialog */}
        <CsvImportDialog
          isOpen={showCsvImportDialog}
          onClose={() => setShowCsvImportDialog(false)}
          onImport={handleCsvImport}
        />

        {/* Manual Task Dialog */}
        <ManualTaskDialog
          isOpen={showManualTaskDialog}
          onClose={closeManualTaskDialog}
          onSave={editingTask ? handleEditManualTask : handleAddManualTask}
          editingTask={editingTask}
          existingTickets={data.map((ticket) => ticket.ticket_number)}
        />
      </div>
    </React.Fragment>
  );
}
