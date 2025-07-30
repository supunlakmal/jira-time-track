import { PROJECTS_OVERVIEW_TITLE } from "../../constants/config";
import React from "react";
import Button from "../ui/Button";
import { ProjectSummary } from "../../types/dashboard";
import ProjectRow from "./ProjectRow";

interface ProjectsOverviewProps {
  projectSummaryData: ProjectSummary[];
  selectedProject: string | null;
  handleProjectSelect: (projectName: string | null) => void;
  handleChooseProjectPath: (projectName: string) => void;
  refreshBranch: (projectName: string, projectPath: string) => void;
  formatTime: (ms: number) => string;
  billingData?: any;
  sessions?: any;
}

const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
  projectSummaryData,
  selectedProject,
  handleProjectSelect,
  handleChooseProjectPath,
  refreshBranch,
  formatTime,
  billingData,
  sessions,
}) => {
  
  const calculateProjectCost = (projectName: string) => {
    if (!billingData?.settings || !sessions) return null;
    
    let totalCost = 0;
    
    Object.keys(sessions).forEach(ticketNumber => {
      if (ticketNumber.startsWith(projectName + '-') || ticketNumber.split('-')[0] === projectName) {
        const session = sessions[ticketNumber];
        if (session?.totalElapsed) {
          const hourlyRate = billingData.settings.projectRates?.[projectName] || billingData.settings.globalHourlyRate;
          if (hourlyRate) {
            const timeSpentHours = session.totalElapsed / (1000 * 60 * 60);
            totalCost += timeSpentHours * hourlyRate;
          }
        }
      }
    });
    
    return totalCost > 0 ? {
      cost: totalCost,
      currency: billingData.settings.currency || 'USD',
      rate: billingData.settings.projectRates?.[projectName] || billingData.settings.globalHourlyRate
    } : null;
  };
  
  if (projectSummaryData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="p-4 border-b bg-white dark:bg-gray-800 dark:border-gray-600 rounded-t-lg shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {PROJECTS_OVERVIEW_TITLE}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Project Cost
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
                <ProjectRow
                  key={proj.name}
                  proj={proj}
                  selectedProject={selectedProject}
                  handleProjectSelect={handleProjectSelect}
                  handleChooseProjectPath={handleChooseProjectPath}
                  refreshBranch={refreshBranch}
                  formatTime={formatTime}
                  calculateProjectCost={calculateProjectCost}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverview;
