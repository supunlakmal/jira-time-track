import { ReactElement } from "react";

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

// New Dashboard Section Types
export interface StatsCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
  chartId: string;
}

export interface EfficiencyData {
  arrival: number;
  spending: number;
  goal: number;
  goalPercentage: number;
  spendingPercentage: number;
  othersPercentage: number;
}

export interface LocationData {
  id: string;
  country: string;
  flagImage: string;
  percentage: number;
  progressColor: "success" | "warning" | "orange";
}

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  location: string;
  spent: string;
  avatar?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface DateRange {
  label: string;
  value: string;
}

export interface DashboardFilters {
  dateRange: string;
  location: string;
  amountSpent: string;
  transactionDate: string;
  transactionType: string;
  searchQuery: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
