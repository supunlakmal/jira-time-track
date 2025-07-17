import { MoreHoriz } from "@mui/icons-material";
import { FC } from "react";
import { projectStatusColors } from "../../constants/projectStatus";
import { ProjectHelper } from "../../helpers/ProjectHelper";
import { Project } from "../../store/projectsSlice";

interface ProjectListItemProps {
  project: Project;
}

export const ProjectListItem: FC<ProjectListItemProps> = ({ project }) => {
  return (
    <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center flex-1 space-x-4">
        <div
          className={`w-1.5 h-10 rounded-full ${ProjectHelper.getProgressBarColor(
            project
          )}`}
        ></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {project.name}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {project.description}
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4 w-1/2 justify-end">
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-nowrap ${
            projectStatusColors[project.status]
          }`}
        >
          {project.status}
        </div>

        <div className="w-32">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {project.progress}%
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-1.5">
            <div
              className={`h-full ${ProjectHelper.getProgressBarColor(project)}`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* <div className="flex -space-x-2">
          {project.team.slice(0, 3).map((member) => (
            <span
              key={member.name}
              className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6 border border-white dark:border-gray-800"
            >
              <Image
                className="aspect-square h-full w-full"
                alt={member.name}
                src={member.avatar}
                width={24}
                height={24}
              />
            </span>
          ))}
        </div> */}
      </div>

      <div className="flex items-center pl-4">
        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
          <MoreHoriz className="h-5 w-5" />
          <span className="sr-only">Project actions</span>
        </button>
      </div>
    </div>
  );
};
