import React from "react";
import { useDispatch } from "react-redux";
import { ModalWrapper } from "../ui/ModalWrapper";
import { ProjectForm } from "./ProjectForm";
import { addProject, Project } from "../../store/projectsSlice";

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
  const dispatch = useDispatch();

  const handleSubmit = (projectData: Omit<Project, "tasks" | "activities">) => {
    const newProject: Project = {
      ...projectData,
      tasks: 0,
      activities: 0,
    };

    dispatch(addProject(newProject));
    
    if (onSuccess) {
      onSuccess(newProject);
    }
    
    onClose();
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