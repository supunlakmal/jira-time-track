// renderer/types/electron.d.ts

export interface ProjectTicket {
  ticket_number: string;
  ticket_name: string;
  story_points: number;
  isManual?: boolean;
  createdAt?: string;
}

export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped";
  totalElapsed: number;
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string;
  }>;
  storyPoints?: number;
}

export interface IpcHandler {
  send(channel: "toggle-float-window", value: boolean): void;
  send(
    channel: "window-move",
    value: { movementX: number; movementY: number }
  ): void;
  send(channel: "window-resize", value: { height: number }): void;
  send(
    channel: "start-task",
    value: { ticket: string; name: string; storyPoints?: number }
  ): void;
  send(channel: "pause-task", value: { ticket: string }): void;
  send(channel: "resume-task", value: { ticket: string }): void;
  send(channel: "stop-task", value: { ticket: string }): void;
  send(channel: "load-project-data", value?: undefined): Promise<ProjectTicket[]>;
  send(channel: "delete-task", value: { ticket: string }): void;
  send(channel: "save-project-paths", value: Record<string, string>): void;
  send(
    channel: "run-github-action",
    value: { projectName: string; projectPath: string }
  ): void;
  send(channel: "show-main-window"): void;
  send(channel: "theme-changed", value: string): void;

  // Add invoke method
  invoke(channel: "load-project-data", value?: undefined): Promise<ProjectTicket[]>;
  invoke(channel: "get-project-paths"): Promise<Record<string, string>>;
  invoke(
    channel: "select-project-directory",
    projectName: string
  ): Promise<{
    canceled?: boolean;
    filePath?: string;
    error?: string;
  }>;
  invoke(
    channel: "get-current-branch",
    data: { projectName: string; projectPath: string }
  ): Promise<{
    branch?: string;
    error?: string;
  }>;
  invoke(
    channel: "update-tray-status",
    data: { activeTimers: number }
  ): Promise<{ success: boolean }>;
  invoke(
    channel: "export-time-data",
    data: {
      format: 'csv' | 'json';
      dateRange?: { start?: string; end?: string };
      filterProject?: string;
    }
  ): Promise<{
    success?: boolean;
    canceled?: boolean;
    error?: string;
    filePath?: string;
    recordCount?: number;
  }>;
  invoke(channel: "get-export-summary"): Promise<{
    totalSessions: number;
    totalTime: number;
    totalProjects: number;
    totalTickets: number;
    error?: string;
  }>;
  invoke(channel: "get-manual-tasks"): Promise<ProjectTicket[]>;
  invoke(channel: "get-all-tasks"): Promise<ProjectTicket[]>;
  invoke(
    channel: "add-manual-task",
    data: { ticket_number: string; ticket_name: string; story_points?: number }
  ): Promise<{
    success: boolean;
    task?: ProjectTicket;
    error?: string;
  }>;
  invoke(
    channel: "update-manual-task",
    data: { taskId: string; updates: Partial<ProjectTicket> }
  ): Promise<{
    success: boolean;
    task?: ProjectTicket;
    error?: string;
  }>;
  invoke(
    channel: "delete-manual-task",
    taskId: string
  ): Promise<{
    success: boolean;
    error?: string;
  }>;

  on(
    channel: "task-started",
    listener: (data: {
      ticketNumber: string;
      ticketName: string;
      storyPoints?: number;
    }) => void
  ): () => void;
  on(
    channel: "task-paused",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(
    channel: "task-resumed",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(
    channel: "task-stopped",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(
    channel: "manual-tasks-updated",
    listener: (manualTasks: ProjectTicket[]) => void
  ): () => void;
  on(
    channel: "theme-changed",
    listener: (theme: string) => void
  ): () => void;
  on(channel: string, listener: (...args: any[]) => void): () => void;

  window: {
    minimize(): void;
    maximize(): void;
    close(): void;
    hide(): void;
    show(): void;
  };
  zoom: {
    in(): void;
    out(): void;
    reset(): void;
  };
}

declare global {
  interface Window {
    ipc: IpcHandler;
  }
}

export {};
