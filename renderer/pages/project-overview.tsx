import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import TicketTable from "../components/tickets/TicketTable";
import TicketTableActions from "../components/tickets/TicketTableActions";
import { useSharedData } from "../hooks/useSharedData";

export default function ProjectOverviewPage() {
  const router = useRouter();
  const { name } = router.query;
  const { projectData, sessions, billingData, projects, loading } = useSharedData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState<any>(null);

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

  // Find project by name
  const project = projects.find((p) => p.name === name);

  // Filter tickets for current project with search functionality
  const projectTickets = useMemo(() => {
    if (!project) return [];
    
    // Filter by project name from ticket number
    let filteredTickets = projectData.filter((ticket: any) => {
      const ticketProjectName = getProjectName(ticket.ticket_number);
      return ticketProjectName.toLowerCase() === project.name.toLowerCase() ||
             ticket.ticket_number.toLowerCase().includes(project.name.toLowerCase());
    });

    // Apply search filter if searchTerm is provided
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredTickets = filteredTickets.filter((ticket: any) =>
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
              onClick={() => router.push("/project-dashboard")}
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
              onClick={() => router.push("/project-dashboard")}
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

              {project && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                        {project.deadline}
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
        onSuccess={() => {
          // Modal will close automatically, data will refresh via shared data hook
        }}
      />
    </Layout>
  );
}
