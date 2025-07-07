import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/Button";
import { ModalWrapper } from "../ui/ModalWrapper";
import { ProjectTicket } from "../../types/electron";

interface ManualTaskDialogProps {
  onClose: () => void;
  onSave: (task: { ticket_number: string; ticket_name: string; story_points?: number }) => void;
  editingTask?: ProjectTicket | null;
  existingTickets: string[];
}

type FormData = {
  ticket_number: string;
  ticket_name: string;
  story_points?: string;
};

const createFormSchema = (editingTask: ProjectTicket | null | undefined, existingTickets: string[]) => {
  return yup.object().shape({
    ticket_number: yup
      .string()
      .required("Ticket number is required")
      .matches(/^[A-Z]+-\d+$/, "Ticket number must follow format: PROJECT-123")
      .test(
        "unique-ticket",
        "Ticket number already exists",
        (value) => {
          if (editingTask) return true;
          return !existingTickets.includes(value || "");
        }
      ),
    ticket_name: yup
      .string()
      .required("Ticket name is required")
      .min(5, "Ticket name must be at least 5 characters"),
    story_points: yup
      .string()
      .optional()
      .test(
        "valid-points",
        "Story points must be a number between 0 and 100",
        (value) => {
          if (!value || value === "") return true;
          const points = parseFloat(value);
          return !isNaN(points) && points >= 0 && points <= 100;
        }
      ),
  }) as yup.ObjectSchema<FormData>;
};

export const ManualTaskDialog: React.FC<ManualTaskDialogProps> = ({
  onClose,
  onSave,
  editingTask,
  existingTickets,
}) => {
  const formSchema = createFormSchema(editingTask, existingTickets);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ticket_number: "",
      ticket_name: "",
      story_points: "",
    },
  });

  useEffect(() => {
    if (editingTask) {
      reset({
        ticket_number: editingTask.ticket_number,
        ticket_name: editingTask.ticket_name,
        story_points: editingTask.story_points?.toString() || "",
      });
    } else {
      reset({
        ticket_number: "",
        ticket_name: "",
        story_points: "",
      });
    }
  }, [editingTask, reset]);

  const onSubmit = (data: FormData) => {
    onSave({
      ticket_number: data.ticket_number.trim(),
      ticket_name: data.ticket_name.trim(),
      story_points: data.story_points ? parseFloat(data.story_points) : undefined,
    });
    onClose();
  };

  const handleClose = () => {
    reset();
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
      onClose={handleClose}
      title={editingTask ? "Edit Manual Task" : "Add Manual Task"}
      size="md"
      footer={footerContent}
    >
      <div className="p-6">

        <form id="manual-task-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="ticket_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Number *
            </label>
            <input
              type="text"
              id="ticket_number"
              {...register("ticket_number")}
              placeholder="e.g., MANUAL-001"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.ticket_number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              disabled={!!editingTask}
            />
            {errors.ticket_number && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_number.message}</p>
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
              {...register("ticket_name")}
              placeholder="e.g., Fix login validation bug"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.ticket_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.ticket_name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="story_points" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Story Points
            </label>
            <input
              type="number"
              id="story_points"
              {...register("story_points")}
              placeholder="e.g., 3"
              min="0"
              max="100"
              step="0.1"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                errors.story_points ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.story_points && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.story_points.message}</p>
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