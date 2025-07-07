import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { ModalWrapper } from "../ui/ModalWrapper";
import { ProjectTicket } from "../../types/electron";

interface ManualTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { ticket_number: string; ticket_name: string; story_points?: number }) => void;
  editingTask?: ProjectTicket | null;
  existingTickets: string[];
}

export const ManualTaskDialog: React.FC<ManualTaskDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
  existingTickets,
}) => {
  const [formData, setFormData] = useState({
    ticket_number: "",
    ticket_name: "",
    story_points: "",
  });
  const [errors, setErrors] = useState<{
    ticket_number?: string;
    ticket_name?: string;
    story_points?: string;
  }>({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        ticket_number: editingTask.ticket_number,
        ticket_name: editingTask.ticket_name,
        story_points: editingTask.story_points?.toString() || "",
      });
    } else {
      setFormData({
        ticket_number: "",
        ticket_name: "",
        story_points: "",
      });
    }
    setErrors({});
  }, [editingTask, isOpen]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.ticket_number.trim()) {
      newErrors.ticket_number = "Ticket number is required";
    } else if (!/^[A-Z]+-\d+$/.test(formData.ticket_number.trim())) {
      newErrors.ticket_number = "Ticket number must follow format: PROJECT-123";
    } else if (
      !editingTask &&
      existingTickets.includes(formData.ticket_number.trim())
    ) {
      newErrors.ticket_number = "Ticket number already exists";
    }

    if (!formData.ticket_name.trim()) {
      newErrors.ticket_name = "Ticket name is required";
    } else if (formData.ticket_name.trim().length < 5) {
      newErrors.ticket_name = "Ticket name must be at least 5 characters";
    }

    if (formData.story_points) {
      const points = parseFloat(formData.story_points);
      if (isNaN(points) || points < 0 || points > 100) {
        newErrors.story_points = "Story points must be a number between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ticket_number: formData.ticket_number.trim(),
        ticket_name: formData.ticket_name.trim(),
        story_points: formData.story_points ? parseFloat(formData.story_points) : undefined,
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      ticket_number: "",
      ticket_name: "",
      story_points: "",
    });
    setErrors({});
    onClose();
  };

  const footerContent = (
    <div className="flex justify-end space-x-3">
      <Button
        type="button"
        onClick={handleClose}
        variant="gray"
        size="md"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="md"
        form="manual-task-form"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </Button>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={handleClose}
      title={editingTask ? "Edit Manual Task" : "Add Manual Task"}
      size="md"
      footer={footerContent}
    >
      <div className="p-6">

        <form id="manual-task-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ticket_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Number *
            </label>
            <input
              type="text"
              id="ticket_number"
              value={formData.ticket_number}
              onChange={(e) => setFormData({ ...formData, ticket_number: e.target.value })}
              placeholder="e.g., MANUAL-001"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.ticket_number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              disabled={!!editingTask}
            />
            {errors.ticket_number && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_number}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Format: PROJECT-NUMBER (e.g., MANUAL-001, TASK-123)
            </p>
          </div>

          <div>
            <label htmlFor="ticket_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Name *
            </label>
            <input
              type="text"
              id="ticket_name"
              value={formData.ticket_name}
              onChange={(e) => setFormData({ ...formData, ticket_name: e.target.value })}
              placeholder="e.g., Fix login validation bug"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.ticket_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.ticket_name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="story_points" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Story Points
            </label>
            <input
              type="number"
              id="story_points"
              value={formData.story_points}
              onChange={(e) => setFormData({ ...formData, story_points: e.target.value })}
              placeholder="e.g., 3"
              min="0"
              max="100"
              step="0.1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.story_points ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.story_points && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.story_points}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Optional. Enter estimated effort (0-100)
            </p>
          </div>

        </form>
      </div>
    </ModalWrapper>
  );
};