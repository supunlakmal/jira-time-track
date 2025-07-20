import { useRouter } from "next/router";
import { FC } from "react";
import { Project } from "../../types/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectListItem } from "./ProjectListItem";

interface ProjectViewProps {
  projects: Project[];
  viewMode: "grid" | "list";
  onCreateProject?: () => void;
}

export const ProjectView: FC<ProjectViewProps> = ({
  projects,
  viewMode,
  onCreateProject,
}) => {
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    router.push(`/project-overview?name=${encodeURIComponent(project.name)}`);
  };
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 xl:gap-6">
        {/* {onCreateProject && (
          <CreateProjectCard onClick={onCreateProject} />
        )} */}
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* {onCreateProject && <CreateProjectListItem onClick={onCreateProject} />} */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <ProjectListItem
              key={project.name}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
