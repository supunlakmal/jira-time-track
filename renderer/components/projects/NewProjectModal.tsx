import React from "react";
import { ModalWrapper } from "../ui/ModalWrapper";
import { ProjectForm } from "./ProjectForm";
import { Project } from "../../types/projects";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const handleSubmit = async (projectData: Omit<Project, "tasks" | "activities">) => {
    const newProject: Project = {
      ...projectData,
      tasks: 0,
      activities: 0,
    };

    try {
      const result = await window.ipc.invoke("add-project", newProject);
      
      if (result.success && onSuccess) {
        onSuccess(result.project);
      }
      
      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper
      onClose={onClose}
      title="Create New Project"
      size="lg"
      closeOnBackdropClick={false}
    >
      <div className="p-6">
        <ProjectForm
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </ModalWrapper>
  );
};