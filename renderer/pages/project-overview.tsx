import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import TicketTable from "../components/tickets/TicketTable";
import TicketTableActions from "../components/tickets/TicketTableActions";
import { DeleteProjectModal } from "../components/projects";
import { useSharedData } from "../hooks/useSharedData";
import { ProjectCost } from "../types/projects";

export default function ProjectOverviewPage() {
  const router = useRouter();
  const { name } = router.query;
  const { projectData, sessions, billingData, projects, loading } =
    useSharedData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);

  // Project path and GitHub integration state
  const [projectPath, setProjectPath] = useState<string>("");
  const [currentBranch, setCurrentBranch] = useState<string>("");
  const [projectCost, setProjectCost] = useState<ProjectCost | null>(null);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  // Helper functions
  const getProjectName = (ticketNumber: string): string => {
    if (!ticketNumber || !ticketNumber.includes("-")) return "N/A";
    return ticketNumber.split("-")[0];
  };

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
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
  };

  const handleDeleteProject = () => {
    // Redirect to projects page after successful deletion
    router.push("/project-dashboard");
  };

  // Project path and GitHub integration functions
  const handleChooseProjectPath = async () => {
    if (!project || !window.ipc || typeof window.ipc.invoke !== "function") {
      alert("Directory picker not available (IPC error).");
      return;
    }

    try {
      const result = await window.ipc.invoke(
        "select-project-directory",
        project.name
      );
      if (result && result.filePath) {
        setProjectPath(result.filePath);
        // Save to project paths store
        const allPaths = (await window.ipc.invoke("get-project-paths")) || {};
        const newPaths = { ...allPaths, [project.name]: result.filePath };
        
        console.log('=== PROJECT OVERVIEW SAVE DEBUG ===');
        console.log('Project name:', project.name);
        console.log('Selected path:', result.filePath);
        console.log('All existing paths:', allPaths);
        console.log('New paths being saved:', newPaths);
        
        window.ipc.send("save-project-paths", newPaths);
        
        // Broadcast that project paths have been updated
        window.ipc.send("project-paths-updated");

        // Load branch info for the new path
        loadCurrentBranch(result.filePath);
      } else if (result && result.error) {
        console.error("Error selecting directory:", result.error);
        alert("Failed to select directory. Please try again.");
      }
    } catch (e) {
      console.error("Error invoking select-project-directory:", e);
      alert("Failed to open directory picker.");
    }
  };

  const loadCurrentBranch = async (path: string) => {
    if (!project || !window.ipc || typeof window.ipc.invoke !== "function") {
      return;
    }

    try {
      const branchResult = await window.ipc.invoke("get-current-branch", {
        projectName: project.name,
        projectPath: path,
      });
      if (branchResult && branchResult.branch) {
        setCurrentBranch(branchResult.branch);
      } else if (branchResult && branchResult.error) {
        setCurrentBranch("Error");
        console.warn(
          `Failed to get branch for ${project.name}:`,
          branchResult.error
        );
      }
    } catch (e) {
      console.error(`Error getting branch for ${project.name}:`, e);
      setCurrentBranch("Unknown");
    }
  };

  const refreshBranch = async () => {
    if (!project || !projectPath) {
      return;
    }
    loadCurrentBranch(projectPath);
  };

  // Project cost calculation and billing integration
  const calculateProjectCost = () => {
    if (!billingData?.settings || !sessions || !project) return null;

    let totalCost = 0;
    let totalTime = 0;

    Object.keys(sessions).forEach((ticketNumber) => {
      if (
        ticketNumber.startsWith(project.name + "-") ||
        ticketNumber.split("-")[0] === project.name
      ) {
        const session = sessions[ticketNumber];
        if (session?.totalElapsed) {
          const hourlyRate =
            billingData.settings.projectRates?.[project.name] ||
            billingData.settings.globalHourlyRate;
          if (hourlyRate) {
            const timeSpentHours = session.totalElapsed / (1000 * 60 * 60);
            totalCost += timeSpentHours * hourlyRate;
            totalTime += session.totalElapsed;
          }
        }
      }
    });

    return totalCost > 0
      ? {
          cost: totalCost,
          currency: billingData.settings.currency || "USD",
          rate:
            billingData.settings.projectRates?.[project.name] ||
            billingData.settings.globalHourlyRate,
        }
      : null;
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Find project by name
  const project = projects.find((p) => p.name === name);

  // Load project-specific data on component mount and project change
  useEffect(() => {
    const loadProjectPath = async () => {
      if (!project || !window.ipc || typeof window.ipc.invoke !== "function") {
        return;
      }

      try {
        const storedPaths = await window.ipc.invoke("get-project-paths");
        if (
          storedPaths &&
          typeof storedPaths === "object" &&
          storedPaths[project.name]
        ) {
          const path = storedPaths[project.name];
          setProjectPath(path);

          // Load branch info for this path
          loadCurrentBranch(path);
        } else {
          setProjectPath("");
          setCurrentBranch("");
        }
      } catch (e) {
        console.error("Failed to load project path via IPC:", e);
        setProjectPath("");
        setCurrentBranch("");
      }
    };

    if (project) {
      loadProjectPath();
    }
  }, [project]);

  // Calculate and update project cost when billing data or sessions change
  useEffect(() => {
    if (project && billingData && sessions) {
      const costData = calculateProjectCost();
      setProjectCost(costData);
    }
  }, [project, billingData, sessions]);

  // Filter tickets for current project with search functionality
  const projectTickets = useMemo(() => {
    if (!project) return [];

    // Filter by project association (either by projectId or ticket number prefix)
    let filteredTickets = projectData.filter((ticket: any) => {
      // Check if ticket is directly associated with this project via projectId
      if (ticket.projectId === project.id) {
        return true;
      }

      // Fallback: Check project name from ticket number prefix (for legacy tickets)
      const ticketProjectName = getProjectName(ticket.ticket_number);
      return (
        ticketProjectName.toLowerCase() === project.name.toLowerCase() ||
        ticket.ticket_number.toLowerCase().includes(project.name.toLowerCase())
      );
    });

    // Apply search filter if searchTerm is provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredTickets = filteredTickets.filter(
        (ticket: any) =>
          ticket.ticket_number.toLowerCase().includes(searchLower) ||
          ticket.ticket_name.toLowerCase().includes(searchLower)
      );
    }

    return filteredTickets;
  }, [projectData, project, searchTerm]);

  if (!project && name) {
    return (
      <Layout toggleFloatingWindow={toggleFloatingWindow}>
        <Head>
          <title>Project Not Found - Project Time Tracker</title>
        </Head>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The project "{name}" could not be found.
            </p>
            <button
              onClick={() => router.push("/home")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>
          {project?.name || "Project Overview"} - Project Time Tracker
        </title>
      </Head>
      <div className="p-6">
        <div className="">
          <div className="mb-6">
            <button
              onClick={() => router.push("/home")}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Projects
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Project Overview
                </h1>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Delete Project</span>
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Create Ticket</span>
                  </button>
                </div>
              </div>

              {project && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    {/* Basic Project Info */}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Status:
                      </span>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Progress:
                      </span>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        {project.progress}%
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Deadline:
                      </span>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        {new Date(project.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Repository Information */}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Repository Path:
                      </span>
                      <div className="mt-1 flex items-center justify-between">
                        <span
                          className={`truncate flex-grow text-xs ${
                            !projectPath
                              ? "italic text-gray-400 dark:text-gray-500"
                              : "text-gray-900 dark:text-white"
                          }`}
                          title={projectPath || "Click 'Choose Path' to set"}
                        >
                          {projectPath || "Path not set"}
                        </span>
                        <button
                          onClick={handleChooseProjectPath}
                          className="ml-2 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded transition-colors"
                          title="Choose project directory"
                        >
                          Choose
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Current Branch:
                      </span>
                      <div className="mt-1 flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            currentBranch === "main" ||
                            currentBranch === "master"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : currentBranch === "Error"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : currentBranch === "Unknown"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              : currentBranch
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                          }`}
                          title={currentBranch || "No branch information"}
                        >
                          {currentBranch || (projectPath ? "..." : "No path")}
                        </span>
                        {projectPath && (
                          <button
                            onClick={refreshBranch}
                            className="ml-2 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded transition-colors"
                            title="Refresh branch information"
                          >
                            ↻
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Billing Information */}
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Project Cost:
                      </span>
                      <div className="mt-1">
                        {projectCost ? (
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(
                                projectCost.cost,
                                projectCost.currency
                              )}
                            </span>
                            {projectCost.rate && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatCurrency(
                                  projectCost.rate,
                                  projectCost.currency
                                )}
                                /h
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 italic text-xs">
                            No billing rate
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Tickets Section */}
              <div className="mb-8">
                <TicketTableActions
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedProject={project?.name || null}
                  loading={loading}
                  refreshData={() => window.location.reload()}
                />

                <TicketTable
                  ticketsToDisplay={projectTickets}
                  sessions={sessions}
                  selectedProject={project?.name || null}
                  searchTerm={searchTerm}
                  formatTime={formatTime}
                  getProjectName={getProjectName}
                  openEditDialog={openEditDialog}
                  handleDeleteManualTask={handleDeleteManualTask}
                  data={projectData}
                  billingData={billingData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        projectName={project?.name}
        projectId={project?.id}
        onSuccess={() => {
          // Modal will close automatically, data will refresh via shared data hook
        }}
      />

      {/* Delete Project Modal */}
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        project={project}
        onDeleteSuccess={handleDeleteProject}
      />
    </Layout>
  );
}
