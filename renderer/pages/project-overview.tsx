import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { selectProjects } from "../store/projectsSlice";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import { useSharedData } from "../hooks/useSharedData";

export default function ProjectOverviewPage() {
  const router = useRouter();
  const projects = useSelector(selectProjects);
  const { name } = router.query;
  const { projectData } = useSharedData();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  // Find project by name
  const project = projects.find(p => p.name === name);
  
  // Filter tickets for current project
  const projectTickets = projectData.filter((ticket: any) => {
    if (!project) return false;
    const projectPrefix = project.name.toUpperCase().replace(/\s+/g, "").substring(0, 6);
    return ticket.ticket_number.startsWith(projectPrefix + "-");
  });

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
        <title>{project?.name || "Project Overview"} - Project Time Tracker</title>
      </Head>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.push("/project-dashboard")}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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
                      <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                      <div className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Progress:</span>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        {project.progress}%
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">Deadline:</span>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        {project.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Tickets Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Project Tickets ({projectTickets.length})
                </h3>
                {projectTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-500 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">No tickets created yet for this project</p>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create First Ticket
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projectTickets.map((ticket: any) => (
                      <div key={ticket.ticket_number} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {ticket.ticket_number}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {ticket.ticket_name}
                              </p>
                              {ticket.story_points && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {ticket.story_points} story points
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                window.ipc?.send('start-task', {
                                  ticket: ticket.ticket_number,
                                  name: ticket.ticket_name,
                                  storyPoints: ticket.story_points,
                                });
                              }}
                              className="px-3 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                            >
                              Start Timer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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