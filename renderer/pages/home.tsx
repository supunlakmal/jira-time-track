// renderer/pages/home.tsx
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useJiraData } from "../hooks/useJiraData";

interface ProjectSummary {
  name: string;
  ticketCount: number;
  location?: string; // Local file system path to the project's repository
}

export default function HomePage() {
  const { data, loading, error, refreshData } = useJiraData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projectPaths, setProjectPaths] = useState<Record<string, string>>({});

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

  // Function to save paths to the main process
  const saveProjectPaths = (newPaths: Record<string, string>) => {
    if (window.ipc && typeof window.ipc.send === "function") {
      window.ipc.send("save-project-paths", newPaths);
      setProjectPaths(newPaths); // Optimistic update
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

  const projectSummaryData = useMemo((): ProjectSummary[] => {
    if (!data || data.length === 0) return [];
    const summary: Record<string, { count: number }> = {};
    data.forEach((ticket) => {
      const projectName = getProjectName(ticket.ticket_number);
      if (projectName === "N/A") return;
      if (!summary[projectName]) summary[projectName] = { count: 0 };
      summary[projectName].count++;
    });

    return Object.entries(summary)
      .map(([name, projectData]) => ({
        name,
        ticketCount: projectData.count,
        location: projectPaths[name] || undefined,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data, projectPaths]);

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
          // Optionally show an alert to the user
        }
        // If result.canceled is true or filePath is null, do nothing (user cancelled)
      } catch (e) {
        console.error("Error invoking select-project-directory:", e);
        alert("Failed to open directory picker.");
      }
    } else {
      alert("Directory picker not available (IPC error).");
    }
  };

  const handleRunGithubAction = (
    projectName: string,
    projectLocation?: string
  ) => {
    if (!projectLocation) {
      alert(
        `Project location for ${projectName} is not set. Please set it first using the "Choose Path" button.`
      );
      return;
    }
    if (window.ipc && typeof window.ipc.send === "function") {
      window.ipc.send("run-github-action", {
        projectName,
        projectPath: projectLocation,
      });
      alert(
        `Attempting to trigger GitHub Action for ${projectName} at ${projectLocation}.\nCheck main process console for details.`
      );
    } else {
      alert("IPC not available. Cannot run GitHub Action.");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Jira Time Tracker</title>
      </Head>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Jira Time Tracker
            </h1>
            <button
              onClick={toggleFloatingWindow}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Toggle Floating Timer
            </button>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={refreshData}
                className="text-blue-500 hover:text-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Project Summary Table */}
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                              Local Path
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Trigger Action
                            </th>{" "}
                            {/* New column for action button */}
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
                              onClick={() => handleProjectSelect(proj.name)} // Click row to filter tickets
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {proj.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {proj.ticketCount}
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
                                      e.stopPropagation(); // Prevent row click from filtering
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
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRunGithubAction(
                                      proj.name,
                                      proj.location
                                    );
                                  }}
                                  className="text-xs py-1 px-2 rounded border border-purple-500 hover:bg-purple-100 text-purple-600 hover:text-purple-800 disabled:text-gray-400 disabled:border-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                  disabled={!proj.location}
                                  title={
                                    !proj.location
                                      ? "Set project local path first"
                                      : "Run GitHub Action"
                                  }
                                >
                                  🚀 Run Action
                                </button>
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
                  onClick={refreshData}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                >
                  ↻ Refresh All Data
                </button>
              </div>

              {/* Main Ticket Table */}
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                {/* ... (rest of the main ticket table remains the same) ... */}
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ticketsToDisplay.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            {data.length === 0
                              ? "No tickets available"
                              : selectedProject && searchTerm
                              ? `No tickets match your search in project ${selectedProject}`
                              : selectedProject
                              ? `No tickets found for project ${selectedProject}`
                              : searchTerm
                              ? "No tickets match your search"
                              : "No tickets in current filter"}
                          </td>
                        </tr>
                      ) : (
                        ticketsToDisplay.map((ticket) => (
                          <tr
                            key={ticket.ticket_number}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                              {ticket.ticket_number}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {ticket.ticket_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                              {ticket.story_points?.toFixed(1) || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => {
                                  window.ipc?.send("start-task", {
                                    ticket: ticket.ticket_number,
                                    name: ticket.ticket_name,
                                    storyPoints: ticket.story_points,
                                  });
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Add to queue
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
