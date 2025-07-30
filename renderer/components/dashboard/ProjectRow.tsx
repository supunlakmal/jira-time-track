
import React from "react";
import Button from "../ui/Button";
import ProjectCost from "./ProjectCost";
import { ProjectSummary } from "../../types/dashboard";

interface ProjectRowProps {
  proj: ProjectSummary;
  selectedProject: string | null;
  handleProjectSelect: (projectName: string | null) => void;
  handleChooseProjectPath: (projectName: string) => void;
  refreshBranch: (projectName: string, projectPath: string) => void;
  formatTime: (ms: number) => string;
  calculateProjectCost: (projectName: string) => { cost: number; currency: string; rate: number } | null;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  proj,
  selectedProject,
  handleProjectSelect,
  handleChooseProjectPath,
  refreshBranch,
  formatTime,
  calculateProjectCost,
}) => {
  const costData = calculateProjectCost(proj.name);

  return (
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
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {costData ? (
          <ProjectCost cost={costData.cost} currency={costData.currency} rate={costData.rate} />
        ) : (
          <span className="text-gray-400 dark:text-gray-500 italic">No billing rate</span>
        )}
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
  );
};

export default ProjectRow;
