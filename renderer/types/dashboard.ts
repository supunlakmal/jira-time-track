// C:\Users\hp\Documents\GitHub\jira-time-track\renderer\types\dashboard.ts
export interface ProjectSummary {
  name: string;
  ticketCount: number;
  location?: string;
  currentBranch?: string;
  totalStoryPoints: number;
  averageStoryPoints: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeSpent: number; // in milliseconds
}

export interface DashboardStats {
  totalTickets: number;
  totalStoryPoints: number;
  averageStoryPoints: number;
  totalProjects: number;
  completedTickets: number;
  inProgressTickets: number;
  totalTimeTracked: number;
  productivity: {
    ticketsPerDay: number;
    pointsPerDay: number;
    averageTimePerTicket: number;
    averageTimePerPoint: number;
  };
}

export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
  status: "running" | "paused" | "hold" | "completed" | "stopped" | "queue";
  totalElapsed: number;
  sessions: Array<{
    startTime: number;
    endTime?: number;
    duration: number;
    status: string;
  }>;
  storyPoints?: number;
}