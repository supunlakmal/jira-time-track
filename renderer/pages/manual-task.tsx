import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { useSharedData } from "../hooks/useSharedData";

type FormData = {
  ticket_number: string;
  ticket_name: string;
  story_points?: string;
  projectId?: string;
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
    projectId: yup
      .string()
      .optional(),
  }) as yup.ObjectSchema<FormData>;
};

export default function ManualTaskPage() {
  const { projectData, projects } = useSharedData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  const existingTickets = projectData.map((ticket: any) => ticket.ticket_number);
  const formSchema = createFormSchema(existingTickets);

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
      projectId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const taskData = {
        ticket_number: data.ticket_number.trim(),
        ticket_name: data.ticket_name.trim(),
        story_points: data.story_points ? parseFloat(data.story_points) : undefined,
      };
      
      const result = await window.ipc.invoke("add-manual-task", { 
        taskData, 
        projectId: data.projectId || undefined 
      });
      
      if (result.success) {
        setSuccessMessage("Manual task added successfully!");
        reset();
      } else {
        setErrorMessage(result.error || "Failed to add manual task");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Add Manual Task - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add Manual Task
          </h1>
        </div>
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-800 dark:text-green-200">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6">
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

        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project
              </label>
              <select
                id="projectId"
                {...register("projectId")}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.projectId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a project (optional)</option>
                {projects.map((project: any) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectId.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Optional. Associate this task with a specific project
              </p>
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

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={handleReset}
                variant="gray"
                size="md"
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Task..." : "Add Task"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}