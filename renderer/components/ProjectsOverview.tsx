// renderer/components/ProjectsOverview.tsx
import React from "react";
import Button from "./Button";
import { ProjectSummary } from "../types/dashboard";

interface ProjectsOverviewProps {
  projectSummaryData: ProjectSummary[];
  selectedProject: string | null;
  handleProjectSelect: (projectName: string | null) => void;
  handleChooseProjectPath: (projectName: string) => void;
  refreshBranch: (projectName: string, projectPath: string) => void;
  formatTime: (ms: number) => string;
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
  projectSummaryData,
  selectedProject,
  handleProjectSelect,
  handleChooseProjectPath,
  refreshBranch,
  formatTime,
}) => {
  if (projectSummaryData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-600 rounded-t-lg shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Projects Overview
        </h2>
        {selectedProject && (
          <Button
            onClick={() => handleProjectSelect(null)}
            variant="link"
            size="sm"
          >
            View All Projects
          </Button>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-b-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tickets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Story Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/5">
                  Local Path
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current Branch
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
              {projectSummaryData.map((proj) => (
                <tr
                  key={proj.name}
                  className={`${
                    selectedProject === proj.name
                      ? "bg-blue-50 dark:bg-blue-900"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                  } cursor-pointer`}
                  onClick={() => handleProjectSelect(proj.name)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {proj.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex flex-col">
                      <span className="font-medium">{proj.ticketCount}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Avg: {proj.averageStoryPoints.toFixed(1)} pts
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                    {proj.totalStoryPoints.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">
                    {formatTime(proj.totalTimeSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-between group">
                      <span
                        className={`truncate flex-grow ${
                          !proj.location ? "italic text-gray-400 dark:text-gray-500" : ""
                        }`}
                        title={proj.location || "Click 'Choose Path' to set"}
                      >
                        {proj.location || "Path not set"}
                      </span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChooseProjectPath(proj.name);
                        }}
                        variant="gray"
                        size="sm"
                        className="ml-2"
                        title="Choose project directory"
                      >
                        Choose Path
                      </Button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          proj.currentBranch === "main" ||
                          proj.currentBranch === "master"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : proj.currentBranch === "Error"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : proj.currentBranch === "Unknown"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            : proj.currentBranch
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        }`}
                        title={proj.currentBranch || "No branch information"}
                      >
                        {proj.currentBranch ||
                          (proj.location ? "..." : "No path")}
                      </span>
                      {proj.location && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            refreshBranch(proj.name, proj.location!);
                          }}
                          variant="gray"
                          size="sm"
                          className="ml-2"
                          title="Refresh branch information"
                        >
                          ↻
                        </Button>
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
  );
};

export default ProjectsOverview;
