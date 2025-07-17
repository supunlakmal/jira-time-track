import {
  BarChart,
  CalendarToday,
  Description,
  MoreHoriz,
} from "@mui/icons-material";
import { FC } from "react";
import { projectStatusColors } from "../../constants/projectStatus";
import { ProjectHelper } from "../../helpers/ProjectHelper";
import { Project } from "../../store/projectsSlice";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col space-y-1.5 p-3 sm:p-6 pb-2">
        <div className="flex flex-wrap gap-2 justify-between items-start">
          <div className="flex items-start space-x-3">
            <div
              className={`w-1 h-12 rounded-full ${ProjectHelper.getProgressBarColor(
                project
              )}`}
            ></div>
            <div>
              <div className="font-semibold tracking-tight text-lg flex items-center text-gray-900 dark:text-white">
                {project.name}
              </div>
              <div className="text-sm text-muted-foreground dark:text-gray-400">
                {project.description}
              </div>
            </div>
          </div>
          <div
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium text-nowrap ${
              projectStatusColors[project.status]
            }`}
          >
            {project.status}
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-6 pt-0">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <CalendarToday className="h-4 w-4 mr-1" />
            <span>Deadline: {project.deadline}</span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 dark:hover:bg-gray-700">
            <MoreHoriz className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Project actions</span>
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {project.progress}%
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-2">
            <div
              className={`h-full w-full flex-1 ${ProjectHelper.getProgressBarColor(
                project
              )} transition-all`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          {/* <div className="flex -space-x-2">
            {project.team.map((member) => (
              <span
                key={member.name}
                className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 border-2 border-white dark:border-gray-800"
              >
                <Image
                  className="aspect-square h-full w-full"
                  alt={member.name}
                  src={member.avatar}
                  width={32}
                  height={32}
                />
              </span>
            ))}
          </div> */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Description className="h-3.5 w-3.5 mr-1" />
              <span>{project.tasks} tasks</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-3.5 w-3.5 mr-1" />
              <span>{project.activities} activities</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Client</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.client}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Budget</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(project.budget)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">
                Start Date
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.startDate}
              </p>
            </div>
            {/* <div>
              <p className="text-gray-500 dark:text-gray-400 mb-1">Priority</p>
              <div
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent font-medium ${project.priorityColor}`}
              >
                {project.priority}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
