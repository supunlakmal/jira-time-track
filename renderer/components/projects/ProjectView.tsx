
import React, { FC } from "react";
import { Project } from "../../store/projectsSlice";
import { ProjectCard } from "./ProjectCard";
import { ProjectListItem } from "./ProjectListItem";

interface ProjectViewProps {
  projects: Project[];
  viewMode: "grid" | "list";
}

export const ProjectView: FC<ProjectViewProps> = ({ projects, viewMode }) => {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {projects.map((project) => (
          <ProjectListItem key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
};
