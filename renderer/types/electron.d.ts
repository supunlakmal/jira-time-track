// renderer/types/electron.d.ts

export interface ProjectTicket {
  ticket_number: string;
  ticket_name: string;
  story_points: number;
  isManual?: boolean;
  createdAt?: string;
  // Jira-specific fields
  isJiraImported?: boolean;
  jiraId?: string;
  status?: string;
  issueType?: string;
  priority?: string;
  project?: string;
  assignee?: string;
  created?: string;
  updated?: string;
  importedAt?: string;
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

  // Billing integration methods
  invoke(channel: "get-billing-data"): Promise<{
    settings: {
      globalHourlyRate?: number;
      projectRates: Record<string, number>;
      currency: string;
      taxRate?: number;
      companyName?: string;
      companyAddress?: string;
      invoicePrefix: string;
    };
    invoices: any[];
  }>;
  invoke(channel: "get-billing-settings"): Promise<{
    globalHourlyRate?: number;
    projectRates: Record<string, number>;
    currency: string;
    taxRate?: number;
    companyName?: string;
    companyAddress?: string;
    invoicePrefix: string;
  }>;
  invoke(
    channel: "save-billing-settings",
    settings: {
      globalHourlyRate?: number;
      projectRates: Record<string, number>;
      currency: string;
      taxRate?: number;
      companyName?: string;
      companyAddress?: string;
      invoicePrefix: string;
    }
  ): Promise<{
    success: boolean;
    error?: string;
  }>;
  invoke(
    channel: "calculate-ticket-cost",
    ticketNumber: string
  ): Promise<{
    success: boolean;
    cost?: {
      ticketNumber: string;
      ticketName: string;
      projectName: string;
      timeSpent: number;
      timeSpentHours: number;
      hourlyRate: number;
      totalCost: number;
      currency: string;
    };
    error?: string;
  }>;
  invoke(channel: "calculate-project-costs"): Promise<{
    success: boolean;
    costs?: Array<{
      projectName: string;
      totalTimeSpent: number;
      totalCost: number;
      ticketCount: number;
      averageHourlyRate: number;
      currency: string;
    }>;
    error?: string;
  }>;
  invoke(
    channel: "add-invoice",
    invoiceData: {
      id: string;
      invoiceNumber: string;
      projectName?: string;
      clientName?: string;
      dateRange: { start: Date; end: Date };
      items: any[];
      subtotal: number;
      taxAmount: number;
      totalCost: number;
      totalHours: number;
      currency: string;
      generatedAt: Date;
    }
  ): Promise<{
    success: boolean;
    invoice?: any;
    error?: string;
  }>;
  invoke(channel: "get-invoices"): Promise<{
    success: boolean;
    invoices?: any[];
    error?: string;
  }>;
  invoke(
    channel: "delete-invoice",
    invoiceId: string
  ): Promise<{
    success: boolean;
    error?: string;
  }>;
  invoke(channel: "get-sessions"): Promise<Record<string, any>>;

  // Jira integration methods
  invoke(channel: "jira-check-secure-storage"): Promise<{
    success: boolean;
    isAvailable: boolean;
    hasCredentials: boolean;
    error?: string;
  }>;
  invoke(
    channel: "jira-store-credentials",
    credentials: {
      domain: string;
      email: string;
      apiToken: string;
    }
  ): Promise<{
    success: boolean;
    error?: string;
  }>;
  invoke(channel: "jira-get-credentials-status"): Promise<{
    success: boolean;
    hasCredentials: boolean;
    isAvailable: boolean;
    error?: string;
  }>;
  invoke(
    channel: "jira-test-connection",
    credentials?: {
      domain: string;
      email: string;
      apiToken: string;
    }
  ): Promise<{
    success: boolean;
    error?: string;
  }>;
  invoke(
    channel: "jira-fetch-issues",
    options?: {
      jql?: string;
      maxResults?: number;
      startAt?: number;
      fetchAll?: boolean;
    }
  ): Promise<{
    success: boolean;
    data?: {
      issues: Array<{
        id: string;
        key: string;
        summary: string;
        description?: string;
        status: string;
        assignee?: {
          displayName: string;
          emailAddress: string;
        };
        created: string;
        updated: string;
        storyPoints?: number;
        issueType: string;
        priority: string;
        project: {
          key: string;
          name: string;
        };
      }>;
      total: number;
      maxResults: number;
      startAt: number;
    };
    error?: string;
  }>;
  invoke(
    channel: "jira-convert-to-tickets",
    issues: any[]
  ): Promise<{
    success: boolean;
    tickets?: ProjectTicket[];
    error?: string;
  }>;
  invoke(channel: "jira-clear-credentials"): Promise<{
    success: boolean;
    error?: string;
  }>;
  invoke(channel: "jira-get-projects"): Promise<{
    success: boolean;
    projects?: Array<{
      key: string;
      name: string;
      id: string;
    }>;
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
  on(
    channel: "billing-updated",
    listener: (billingData: {
      settings: {
        globalHourlyRate?: number;
        projectRates: Record<string, number>;
        currency: string;
        taxRate?: number;
        companyName?: string;
        companyAddress?: string;
        invoicePrefix: string;
      };
      invoices: any[];
    }) => void
  ): () => void;
  on(
    channel: "sessions-updated",
    listener: (sessions: Record<string, any>) => void
  ): () => void;
  on(
    channel: "project-data-updated", 
    listener: (data: any[]) => void
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
  git: {
    createBranch(branchName: string, projectPath: string): Promise<{
      success: boolean;
      message?: string;
      error?: string;
      action?: string;
    }>;
    checkBranchExists(branchName: string, projectPath: string): Promise<{
      success: boolean;
      exists?: boolean;
      error?: string;
    }>;
  };
}

declare global {
  interface Window {
    ipc: IpcHandler;
  }
}

export {};
