// renderer/pages/home.tsx
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ExportDialog } from "../components/ExportDialog";
import { ThemeToggle } from "../components/ThemeToggle";
import { TimeGoalsWidget } from "../components/TimeGoalsWidget";
import { useSharedData } from "../hooks/useSharedData";
import { useMainWindowShortcuts } from "../hooks/useKeyboardShortcuts";

interface ProjectSummary {
  name: string;
  ticketCount: number;
  location?: string;
  currentBranch?: string;
  totalStoryPoints: number;
  averageStoryPoints: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeSpent: number; // in milliseconds
}

interface DashboardStats {
  totalTickets: number;
  totalStoryPoints: number;
  averageStoryPoints: number;
  totalProjects: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeTracked: number;
  productivity: {
    ticketsPerDay: number;
    pointsPerDay: number;
    averageTimePerTicket: number;
    averageTimePerPoint: number;
  };
}

export default function HomePage() {
  const { jiraData: data, sessions, loading } = useSharedData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectPaths, setProjectPaths] = useState<Record<string, string>>({});
  const [projectBranches, setProjectBranches] = useState<
    Record<string, string>
  >({});
  const [showExportDialog, setShowExportDialog] = useState(false);


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
    const totalTimeTracked = Object.values(sessions).reduce(
      (sum, session) => sum + (session.totalElapsed || 0),
      0
    );

    const completedTickets = Object.values(sessions).filter((session) =>
      session.sessions.some((s) => s.status === "completed")
    ).length;

    const inProgressTickets = Object.values(sessions).filter((session) =>
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
    }
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

  return (
    <React.Fragment>
      <Head>
        <title>Jira Time Tracker</title>
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
              Jira Time Tracker Dashboard
            </h1>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={toggleFloatingWindow}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Toggle Floating Timer
              </button>
              <button
                onClick={() => {
                  // Minimize to tray
                  if (window.ipc?.send) {
                    window.close();
                  }
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors"
                title="Minimize to system tray"
              >
Minimize to Tray
              </button>
              <button
                onClick={() => setShowExportDialog(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-colors"
                title="Export time tracking data"
              >
Export Data
              </button>
              <ThemeToggle size="md" />
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Dashboard Stats Cards */}

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Total Tickets */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Tickets
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {dashboardStats.totalTickets}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <span className="text-green-600 font-medium">
                        {dashboardStats.completedTickets} completed
                      </span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-600 font-medium">
                        {dashboardStats.inProgressTickets} in progress
                      </span>
                    </div>
                  </div>

                  {/* Story Points */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Story Points
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {dashboardStats.totalStoryPoints.toFixed(1)}
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Avg: {dashboardStats.averageStoryPoints.toFixed(1)}{" "}
                      pts/ticket
                    </div>
                  </div>

                  {/* Time Tracked */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Time Tracked
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {formatTime(dashboardStats.totalTimeTracked)}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Avg:{" "}
                      {formatTime(
                        dashboardStats.productivity.averageTimePerTicket
                      )}
                      /ticket
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Projects
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {dashboardStats.totalProjects}
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {projectSummaryData.filter((p) => p.location).length} with
                      local paths
                    </div>
                  </div>
                </div>

                {/* Productivity Metrics */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Productivity Metrics (30 days)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {dashboardStats.productivity.ticketsPerDay.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-600">Tickets/Day</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {dashboardStats.productivity.pointsPerDay.toFixed(1)}
                      </p>
                      <p className="text-sm text-gray-600">Points/Day</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatTime(
                          dashboardStats.productivity.averageTimePerTicket
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Time/Ticket</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatTime(
                          dashboardStats.productivity.averageTimePerPoint
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Time/Point</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Goals Widget */}
              <TimeGoalsWidget sessions={sessions} className="mb-8" />

              {/* Enhanced Project Summary Table */}
              {projectSummaryData.length > 0 && (
                <div className="mb-8">
                  <div className="p-4 border-b bg-white rounded-t-lg shadow-sm flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Projects Overview
                    </h2>
                    {selectedProject && (
                      <button
                        onClick={() => handleProjectSelect(null)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View All Projects
                      </button>
                    )}
                  </div>
                  <div className="bg-white shadow-sm rounded-b-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Project
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tickets
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Story Points
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Progress
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time Spent
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                              Local Path
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Current Branch
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {projectSummaryData.map((proj) => (
                            <tr
                              key={proj.name}
                              className={`${
                                selectedProject === proj.name
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-50"
                              } cursor-pointer`}
                              onClick={() => handleProjectSelect(proj.name)}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {proj.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {proj.ticketCount}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    Avg: {proj.averageStoryPoints.toFixed(1)}{" "}
                                    pts
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                {proj.totalStoryPoints.toFixed(1)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex flex-col space-y-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs">
                                      {proj.completedTickets} completed
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-xs">
                                      {proj.inProgressTickets} in progress
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                                {formatTime(proj.totalTimeSpent)}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                <div className="flex items-center justify-between group">
                                  <span
                                    className={`truncate flex-grow ${
                                      !proj.location
                                        ? "italic text-gray-400"
                                        : ""
                                    }`}
                                    title={
                                      proj.location ||
                                      "Click 'Choose Path' to set"
                                    }
                                  >
                                    {proj.location || "Path not set"}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleChooseProjectPath(proj.name);
                                    }}
                                    className="ml-2 py-1 px-2 text-xs border border-gray-300 rounded hover:bg-gray-100 text-gray-700"
                                    title="Choose project directory"
                                  >
                                    Choose Path
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      proj.currentBranch === "main" ||
                                      proj.currentBranch === "master"
                                        ? "bg-green-100 text-green-800"
                                        : proj.currentBranch === "Error"
                                        ? "bg-red-100 text-red-800"
                                        : proj.currentBranch === "Unknown"
                                        ? "bg-gray-100 text-gray-800"
                                        : proj.currentBranch
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                                    title={
                                      proj.currentBranch ||
                                      "No branch information"
                                    }
                                  >
                                    {proj.currentBranch ||
                                      (proj.location ? "..." : "No path")}
                                  </span>
                                  {proj.location && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        refreshBranch(
                                          proj.name,
                                          proj.location!
                                        );
                                      }}
                                      className="ml-2 text-xs py-1 px-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-600"
                                      title="Refresh branch information"
                                    >
                                      ↻
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Search and Refresh for Main Ticket Table */}
              <div className="mb-6 flex gap-4 items-center">
                <input
                  type="text"
                  placeholder={`Search tickets in ${
                    selectedProject || "all projects"
                  }...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  // onClick={refreshData}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  ↻ Refresh All Data
                </button>
              </div>

              {/* Enhanced Main Ticket Table */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedProject
                      ? `${selectedProject} Tickets`
                      : "All Tickets"}
                    {searchTerm && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        (filtered by "{searchTerm}")
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{ticketsToDisplay.length} tickets</span>
                    <span>
                      {ticketsToDisplay
                        .reduce((sum, t) => sum + (t.story_points || 0), 0)
                        .toFixed(1)}{" "}
                      points
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Story Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time Spent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ticketsToDisplay.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-8 text-center text-gray-500"
                          >
                            <div className="flex flex-col items-center">
                              <svg
                                className="w-12 h-12 text-gray-300 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                              </svg>
                              <p className="text-lg font-medium mb-2">
                                {data.length === 0
                                  ? "No tickets available"
                                  : selectedProject && searchTerm
                                  ? "No matching tickets found"
                                  : selectedProject
                                  ? `No tickets found for ${selectedProject}`
                                  : searchTerm
                                  ? "No tickets match your search"
                                  : "No tickets in current filter"}
                              </p>
                              {data.length === 0 && (
                                <p className="text-sm text-gray-400">
                                  Load your Jira data to see tickets here
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      ) : (
                        ticketsToDisplay.map((ticket) => {
                          const ticketSession = sessions[ticket.ticket_number];
                          const isTracked = !!ticketSession;
                          const isActive = ticketSession?.sessions?.some(
                            (s) => s.status === "running"
                          );
                          const isCompleted = ticketSession?.sessions?.some(
                            (s) => s.status === "completed"
                          );
                          const isPaused = ticketSession?.sessions?.some(
                            (s) => s.status === "paused"
                          );

                          let statusColor = "bg-gray-100 text-gray-800";
                          let statusText = "Not Started";

                          if (isActive) {
                            statusColor = "bg-green-100 text-green-800";
                            statusText = "Active";
                          } else if (isPaused) {
                            statusColor = "bg-yellow-100 text-yellow-800";
                            statusText = "Paused";
                          } else if (isCompleted) {
                            statusColor = "bg-blue-100 text-blue-800";
                            statusText = "Completed";
                          } else if (isTracked) {
                            statusColor = "bg-purple-100 text-purple-800";
                            statusText = "Tracked";
                          }

                          return (
                            <tr
                              key={ticket.ticket_number}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    {isActive && (
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-blue-600">
                                      {ticket.ticket_number}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {getProjectName(ticket.ticket_number)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                <div
                                  className="max-w-xs truncate"
                                  title={ticket.ticket_name}
                                >
                                  {ticket.ticket_name}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 font-mono">
                                  {ticket.story_points?.toFixed(1) || "-"}
                                </div>
                                {ticket.story_points && (
                                  <div className="text-xs text-gray-500">
                                    {ticket.story_points <= 1
                                      ? "XS"
                                      : ticket.story_points <= 3
                                      ? "S"
                                      : ticket.story_points <= 5
                                      ? "M"
                                      : ticket.story_points <= 8
                                      ? "L"
                                      : "XL"}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}
                                >
                                  {statusText}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex flex-col">
                                  <span className="font-mono text-gray-900">
                                    {isTracked
                                      ? formatTime(
                                          ticketSession.totalElapsed || 0
                                        )
                                      : "-"}
                                  </span>
                                  {isTracked && ticketSession.sessions && (
                                    <span className="text-xs text-gray-500">
                                      {ticketSession.sessions.length} session
                                      {ticketSession.sessions.length !== 1
                                        ? "s"
                                        : ""}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => {
                                      window.ipc?.send("start-task", {
                                        ticket: ticket.ticket_number,
                                        name: ticket.ticket_name,
                                        storyPoints: ticket.story_points,
                                      });
                                    }}
                                    className="text-blue-600 hover:text-blue-900 font-medium transition-colors"
                                    title="Start tracking time for this ticket"
                                  >
                                    {isActive ? "Resume" : "Start Timer"}
                                  </button>
                                  {isTracked && (
                                    <button
                                      onClick={() => {
                                        // View session details - could open a modal or expand row
                                        console.log(
                                          "View sessions for:",
                                          ticket.ticket_number,
                                          ticketSession
                                        );
                                      }}
                                      className="text-gray-600 hover:text-gray-900 text-xs transition-colors"
                                      title="View time tracking details"
                                    >
                                      Details
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer with Summary */}
                {ticketsToDisplay.length > 0 && (
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex space-x-6">
                        <span>
                          <strong>{ticketsToDisplay.length}</strong> tickets
                          shown
                        </span>
                        <span>
                          <strong>
                            {ticketsToDisplay
                              .reduce(
                                (sum, t) => sum + (t.story_points || 0),
                                0
                              )
                              .toFixed(1)}
                          </strong>{" "}
                          total story points
                        </span>
                      </div>
                      <div className="flex space-x-6">
                        <span>
                          <strong>
                            {
                              ticketsToDisplay.filter((t) =>
                                sessions[t.ticket_number]?.sessions?.some(
                                  (s) => s.status === "completed"
                                )
                              ).length
                            }
                          </strong>{" "}
                          completed
                        </span>
                        <span>
                          <strong>
                            {
                              ticketsToDisplay.filter((t) =>
                                sessions[t.ticket_number]?.sessions?.some(
                                  (s) => s.status === "running"
                                )
                              ).length
                            }
                          </strong>{" "}
                          active
                        </span>
                        <span>
                          <strong>
                            {formatTime(
                              ticketsToDisplay.reduce(
                                (sum, t) =>
                                  sum +
                                  (sessions[t.ticket_number]?.totalElapsed ||
                                    0),
                                0
                              )
                            )}
                          </strong>{" "}
                          total time
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Export Dialog */}
        <ExportDialog
          isOpen={showExportDialog}
          onClose={() => setShowExportDialog(false)}
          projects={projectSummaryData.map(p => p.name)}
        />
      </div>
    </React.Fragment>
  );
}
