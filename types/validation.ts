// types/validation.ts - Zod validation schemas
import { z } from 'zod';

// Core validation schemas
export const TaskSchema = z.object({
  ticket_number: z.string().min(1, "Ticket number is required").max(50, "Ticket number too long"),
  ticket_name: z.string().min(1, "Ticket name is required").max(200, "Ticket name too long"),
  story_points: z.number().min(0, "Story points must be positive").nullable().optional(),
  isImported: z.boolean().optional(),
  importedAt: z.string().optional(),
  isManual: z.boolean().optional(),
  createdAt: z.string().optional(),
});

export const SessionSchema = z.object({
  startTime: z.number(),
  endTime: z.number().optional(),
  duration: z.number().min(0),
  status: z.enum(['running', 'paused', 'completed', 'stopped']),
});

export const TimerSessionSchema = z.object({
  ticketNumber: z.string().min(1),
  ticketName: z.string().min(1),
  storyPoints: z.number().nullable().optional(),
  sessions: z.array(SessionSchema),
  totalElapsed: z.number().min(0),
});

// Form validation schemas
export const ManualTaskFormSchema = z.object({
  ticket_number: z.string().min(1, "Ticket number is required").max(50, "Ticket number too long"),
  ticket_name: z.string().min(1, "Ticket name is required").max(200, "Ticket name too long"),
  story_points: z.number().min(0, "Story points must be positive").nullable().optional(),
});

export const CsvRowSchema = z.object({
  ticket_number: z.string().min(1, "Ticket number is required"),
  ticket_name: z.string().min(1, "Ticket name is required"), 
  story_points: z.union([
    z.string().transform((val) => {
      if (val === '' || val === null || val === undefined) return null;
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error("Invalid story points value");
      return num;
    }),
    z.number(),
    z.null()
  ]).optional(),
});

export const ExportOptionsSchema = z.object({
  format: z.enum(['csv', 'json']),
  dateRange: z.object({
    start: z.string().optional(),
    end: z.string().optional(),
  }).optional(),
  filterProject: z.string().optional(),
});

// IPC parameter validation schemas
export const AddManualTaskParamsSchema = ManualTaskFormSchema;

export const UpdateManualTaskParamsSchema = z.object({
  taskId: z.string().min(1),
  updates: TaskSchema.partial(),
});

export const ImportCsvDataParamsSchema = z.array(CsvRowSchema);

export const GetCurrentBranchParamsSchema = z.object({
  projectName: z.string().min(1),
  projectPath: z.string().min(1),
});

export const StartTaskParamsSchema = z.object({
  ticket: z.string().min(1),
  name: z.string().min(1),
  storyPoints: z.number().nullable().optional(),
});

export const WindowControlParamsSchema = z.enum(['minimize', 'maximize', 'close', 'hide', 'show']);

export const WindowMoveParamsSchema = z.object({
  movementX: z.number(),
  movementY: z.number(),
});

export const WindowResizeParamsSchema = z.object({
  height: z.number().min(100),
});

// Validation helper functions
export function validateTask(data: unknown) {
  return TaskSchema.safeParse(data);
}

export function validateManualTaskForm(data: unknown) {
  return ManualTaskFormSchema.safeParse(data);
}

export function validateCsvData(data: unknown) {
  return ImportCsvDataParamsSchema.safeParse(data);
}

export function validateExportOptions(data: unknown) {
  return ExportOptionsSchema.safeParse(data);
}

// Type inference from schemas
export type ValidatedTask = z.infer<typeof TaskSchema>;
export type ValidatedSession = z.infer<typeof SessionSchema>;
export type ValidatedTimerSession = z.infer<typeof TimerSessionSchema>;
export type ValidatedManualTaskForm = z.infer<typeof ManualTaskFormSchema>;
export type ValidatedCsvRow = z.infer<typeof CsvRowSchema>;
export type ValidatedExportOptions = z.infer<typeof ExportOptionsSchema>;