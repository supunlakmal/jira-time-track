import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/Button";
import { ModalWrapper } from "../ui/ModalWrapper";
import { useSharedData } from "../../hooks/useSharedData";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  projectId?: string;
  onSuccess?: () => void;
}

type FormData = {
  ticket_number: string;
  ticket_name: string;
  story_points?: string;
};

const createFormSchema = (existingTickets: string[]) => {
  return yup.object().shape({
    ticket_number: yup
      .string()
      .required("Ticket number is required")
      .matches(/^[A-Z]+-\d+$/, "Ticket number must follow format: PROJECT-123")
      .test(
        "unique-ticket",
        "Ticket number already exists",
        (value) => {
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

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  projectName,
  projectId,
  onSuccess,
}) => {
  const { projectData } = useSharedData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const existingTickets = projectData.map((ticket: any) => ticket.ticket_number);
  const formSchema = createFormSchema(existingTickets);

  // Generate suggested ticket number based on project name
  const generateTicketNumber = () => {
    if (!projectName) return "";
    
    const prefix = projectName.toUpperCase().replace(/\s+/g, "").substring(0, 6);
    const existingProjectTickets = existingTickets.filter(ticket => 
      ticket.startsWith(prefix + "-")
    );
    
    let nextNumber = 1;
    if (existingProjectTickets.length > 0) {
      const numbers = existingProjectTickets
        .map(ticket => parseInt(ticket.split("-")[1]))
        .filter(num => !isNaN(num))
        .sort((a, b) => b - a);
      nextNumber = numbers[0] + 1;
    }
    
    return `${prefix}-${nextNumber.toString().padStart(3, '0')}`;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      ticket_number: generateTicketNumber(),
      ticket_name: "",
      story_points: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const taskData = {
        ticket_number: data.ticket_number.trim(),
        ticket_name: data.ticket_name.trim(),
        story_points: data.story_points ? parseFloat(data.story_points) : undefined,
      };
      
      const result = await window.ipc.invoke("add-manual-task", { 
        taskData, 
        projectId 
      });
      
      if (result.success) {
        reset();
        onSuccess?.();
        onClose();
      } else {
        setErrorMessage(result.error || "Failed to add ticket");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={handleClose} title="Create New Ticket">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ticket Number */}
        <div>
          <label htmlFor="ticket_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ticket Number *
          </label>
          <input
            type="text"
            id="ticket_number"
            {...register("ticket_number")}
            placeholder="e.g., FIGMA-001"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.ticket_number ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.ticket_number && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_number.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Format: PROJECT-NUMBER (e.g., FIGMA-001, REACT-123)
          </p>
        </div>

        {/* Ticket Name */}
        <div>
          <label htmlFor="ticket_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ticket Name *
          </label>
          <input
            type="text"
            id="ticket_name"
            {...register("ticket_name")}
            placeholder="e.g., Implement user authentication"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.ticket_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.ticket_name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ticket_name.message}</p>
          )}
        </div>

        {/* Story Points */}
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="gray"
            size="md"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Ticket"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default CreateTicketModal;