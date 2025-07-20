import React, { useState } from "react";
import { Project } from "../../types/projects";
import { ProjectStatus } from "../../constants/projectStatus";
import { TextInput, TextArea, NumberInput, Button } from "../ui";

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, "tasks" | "activities">) => void;
  onCancel: () => void;
  initialValues?: Partial<Project>;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = {},
}) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    client: initialValues.client || "",
    budget: initialValues.budget || 0,
    startDate: initialValues.startDate || "",
    deadline: initialValues.deadline || "",
    status: initialValues.status || ProjectStatus.Planning,
    progress: initialValues.progress || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }

    if (!formData.client.trim()) {
      newErrors.client = "Client name is required";
    }

    if (formData.budget <= 0) {
      newErrors.budget = "Budget must be greater than 0";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    }

    if (
      formData.startDate &&
      formData.deadline &&
      formData.startDate > formData.deadline
    ) {
      newErrors.deadline = "Deadline must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const projectData = {
        ...formData,
        tasks: 0,
        activities: 0,
        isStarred: false,
      };
      onSubmit(projectData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextInput
            label="Project Name"
            placeholder="Enter project name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            required
          />
        </div>

        <div className="md:col-span-2">
          <TextArea
            label="Description"
            placeholder="Enter project description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            error={errors.description}
            required
            rows={3}
          />
        </div>

        <div>
          <TextInput
            label="Client"
            placeholder="Enter client name"
            value={formData.client}
            onChange={(e) => handleInputChange("client", e.target.value)}
            error={errors.client}
            required
          />
        </div>

        <div>
          <NumberInput
            label="Budget"
            placeholder="Enter budget"
            value={formData.budget}
            onChange={(e) =>
              handleInputChange("budget", Number(e.target.value))
            }
            error={errors.budget}
            min={0}
            required
          />
        </div>

        <div>
          <TextInput
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            error={errors.startDate}
            required
          />
        </div>

        <div>
          <TextInput
            label="Deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange("deadline", e.target.value)}
            error={errors.deadline}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) =>
              handleInputChange("status", e.target.value as ProjectStatus)
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <NumberInput
            label="Progress (%)"
            placeholder="Enter progress"
            value={formData.progress}
            onChange={(e) =>
              handleInputChange("progress", Number(e.target.value))
            }
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Create Project
        </Button>
      </div>
    </form>
  );
};
